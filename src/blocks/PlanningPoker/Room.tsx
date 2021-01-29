import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";
import { RoomMembers } from "./RoomMembers";
import { RoomState } from "./RoomState";
import type { pollSlice } from "./reducer";
import { pollDefault } from "./reducer";
import type { Poll } from "./types";
import { Box, Button, Flex } from "../../components";
import { usePresenceChannel } from "../../hooks";
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

type Me = {
  id: string;
  info: {
    name: string;
  };
};

// eslint-disable-next-line max-lines-per-function -- todo
export const Room = ({ channelName }: { channelName: string }): JSX.Element => {
  const [channel] = usePresenceChannel(channelName);
  const [poll, { setPoll }] = usePoll(channel.name);

  const sendChannelMessage = useCallback((event: keyof typeof pollSlice, data: unknown) => {
    void sendMessage(channel.name, event, data);
  }, [channel.name]);

  const sendVote = useCallback((vote: string) => {
    if (channel.members.me !== null) {
      const me = channel.members.me as Me;

      sendChannelMessage("vote", [me.info.name, { socketID: me.id, vote }]);
    }
  }, [channel.members.me, sendChannelMessage]);

  // Bind to channel updates
  useEffect(() => {
    const update = (pollUpdate: Poll): void => {
      setPoll(pollUpdate);
    };

    channel.bind("update", update);

    return (): void => {
      channel.unbind("update", update);
    };
  }, [channel, setPoll]);

  // Trigger an empty vote when component mounts
  useEffect(() => {
    if (channel.members.me !== null) {
      const me = channel.members.me as Me;

      sendChannelMessage("vote", [me.info.name, { socketID: me.id }]);
    }
  }, [channel.members.me, sendChannelMessage]);

  const me = channel.members.me as { info: { name: string } } | null;

  const myChoice: string | false | undefined = (
    me !== null && typeof poll.votes[me.info.name] !== "undefined"
  ) && poll.votes[me.info.name].vote;

  return (
    <Flex flex="1" flexDirection="column" height="100%">
      <Flex flex="1">
        <Box width={`${2 / 3 * 100}%`}>
          <Flex flexDirection="column" justifyContent="space-between" height="100%">
            <RoomState {...poll} sx={{ flex: 1 }} />
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
            <RoomMembers poll={poll} />
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
