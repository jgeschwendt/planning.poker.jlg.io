import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RoomMembers } from './RoomMembers';
import { RoomState } from './RoomState';
import type { socketStateSlice } from './reducer';
import { socketStateDefault } from './reducer';
import type { Me, SocketState } from './types';
import { Box, Button, Flex } from '../../components';
import { usePresenceChannel } from '../../hooks';
import { getSocketState, sendMessage } from '../../platforms/client/api';

const CHOICES = ['1', '2', '3', '5', '8', '13', '?', 'pass', '☕'];

const useSocketState = (channelName: string): Readonly<[SocketState, {
  reloadSocketState: () => void;
  mutateSocketState: Dispatch<SetStateAction<SocketState>>;
}]> => {
  const [socketState, mutateSocketState] = useState<SocketState>(socketStateDefault);

  const load = useCallback(async () => {
    mutateSocketState(await getSocketState(channelName));
  }, [channelName]);

  useEffect(() => void load(), [load]);

  return [socketState, {
    mutateSocketState,
    reloadSocketState: load,
  }];
};

// eslint-disable-next-line max-lines-per-function -- todo
export const Room = ({ channelName }: { channelName: string }): JSX.Element => {
  const [channel] = usePresenceChannel(channelName);
  const [socketState, { mutateSocketState }] = useSocketState(channel.name);

  const sendChannelMessage = useCallback((event: keyof typeof socketStateSlice, data: unknown) => (): void => {
    void sendMessage(channel.name, event, data);
  }, [channel.name]);

  const sendVote = useCallback((vote: string) => (): void => {
    if (channel.members.me !== null) {
      const me = channel.members.me as Me;

      sendChannelMessage('vote', [me.info.name, { socketID: me.id, vote }])();
    }
  }, [channel.members.me, sendChannelMessage]);

  // Bind to channel updates
  useEffect(() => {
    const update = (socketStateUpdate: SocketState): void => {
      mutateSocketState(socketStateUpdate);
    };

    channel.bind('update', update);

    return (): void => {
      channel.unbind('update', update);
    };
  }, [channel, mutateSocketState]);

  // Trigger an empty vote when component mounts
  useEffect(() => {
    if (channel.members.me !== null) {
      const me = channel.members.me as Me;

      sendChannelMessage('vote', [me.info.name, { socketID: me.id }])();
    }
  }, [channel.members.me, sendChannelMessage]);

  const me = channel.members.me as { info: { name: string } } | null;

  const myChoice: string | false | undefined = (
    me !== null && typeof socketState.votes[me.info.name] !== 'undefined'
  ) && socketState.votes[me.info.name].vote;

  return (
    <Flex flex="1" flexDirection="column" height="100%">
      <Flex flex="1">
        <Box width={`${2 / 3 * 100}%`}>
          <Flex flexDirection="column" height="100%" justifyContent="space-between">
            <RoomState {...socketState} sx={{ flex: 1 }} />

            <Flex flexDirection="row" justifyContent="center" my={5}>
              {CHOICES.map((choice) => (
                <Box key={choice} m={1}>
                  <Button
                    borderRadius={0}
                    onClick={sendVote(choice)}
                    size="lg"
                    variant={choice === myChoice ? 'primary' : 'secondary'}
                  >
                    {choice}
                  </Button>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>

        <Flex flexDirection="column" justifyContent="space-between" width={`${1 / 3 * 100}%`}>
          <Box>
            <RoomMembers socket={socketState} />
          </Box>

          <Box>
            <Button
              borderRadius="0"
              onClick={sendChannelMessage('results.public.set', true)}
              variant="primary"
              width="50%"
            >
              Show
            </Button>

            <Button
              borderRadius="0"
              onClick={sendChannelMessage('reset', void 0)}
              variant="secondary"
              width="50%"
            >
              Restart
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
