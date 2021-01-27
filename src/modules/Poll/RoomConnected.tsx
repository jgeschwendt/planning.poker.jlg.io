import type { PresenceChannel } from "pusher-js";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";
import { Results } from "./Results";
import { Voters } from "./Voters";
import { pollDefault } from "./reducer";
import type { Poll } from "./types";
import { Box, Button, Flex } from "../../components";
import { getPollChannel, sendMessage } from "../../platforms/client/api";

const CHOICES = ["1", "2", "3", "5", "8", "13", "?", "pass", "☕"];

const usePoll = (channelName: string): Readonly<[Poll, {
  reload: () => void;
  setPoll: Dispatch<SetStateAction<Poll>>;
}]> => {
  const [poll, setPoll] = useState<Poll>(pollDefault);

  const load = useCallback(async () => {
    setPoll(await getPollChannel(channelName));
  }, [channelName]);

  useEffect(() => void load(), [load]);

  return [poll, {
    reload: load,
    setPoll,
  }];
};

// eslint-disable-next-line max-lines-per-function -- todo
export const RoomConnected = ({ channel }: { channel: PresenceChannel }): JSX.Element => {
  const [poll, { setPoll }] = usePoll(channel.name);

  const sendChannelMessage = useCallback((event: string, data: unknown) => {
    void sendMessage(channel.name, event, data);
  }, [channel.name]);

  const sendVote = useCallback((vote: string) => {
    if (channel.members.me !== null) {
      sendChannelMessage("vote", {
        data: {
          socketID: (channel.members.me as { id: string }).id,
          vote,
        },
        from: (channel.members.me as { info: { name: string } }).info.name,
      });
    }
  }, [channel.members.me, sendChannelMessage]);

  useEffect(() => {
    const update = (pollUpdate: Poll): void => {
      setPoll(pollUpdate);
    };

    channel.bind("update", update);

    return (): void => {
      channel.unbind("update", update);
    };
  }, [channel, setPoll]);

  useEffect(() => {
    if (channel.members.me !== null) {
      sendChannelMessage("vote", {
        data: {
          socketID: (channel.members.me as { id: string }).id,
        },
        from: (channel.members.me as { info: { name: string } }).info.name,
      });
    }
  }, [channel.members.me, sendChannelMessage]);

  const myChoice: string | undefined =
    channel.members.me !== null && typeof poll.votes[(channel.members.me as { info: string }).info] !== "undefined"
      ? poll.votes[(channel.members.me as { info: { name: string } }).info.name].vote
      : void 0;

  return (
    <Flex flex="1" flexDirection="column" height="100%">
      <Flex flex="1">
        <Box width={`${2 / 3 * 100}%`}>
          <Flex flexDirection="column" justifyContent="space-between" height="100%">
            <Results {...poll} sx={{ flex: 1 }} />
            <Flex flexDirection="row" justifyContent="center" my={5}>
              {CHOICES.map((choice) => (
                <Box key={choice} m={1}>
                  <Button
                    borderRadius={0}
                    onClick={(): void => {
                      sendVote(choice);
                    }}
                    size="lg"
                    variant={choice === myChoice ? "primary" : "secondary"}
                  >{choice}
                  </Button>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          width={`${1 / 3 * 100}%`}
        >
          <Box>
            <Voters poll={poll} />
          </Box>
          <Box>
            <Button
              borderRadius="0"
              onClick={(): void => {
                sendChannelMessage("results.public.set", true);
              }}
              variant="primary"
              width="50%"
            >Show</Button>
            <Button
              borderRadius="0"
              onClick={(): void => {
                sendChannelMessage("reset", void 0);
              }}
              variant="secondary"
              width="50%"
            >Restart</Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
