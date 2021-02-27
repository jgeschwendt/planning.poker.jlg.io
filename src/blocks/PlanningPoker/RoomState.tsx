import type { SystemStyleObject } from '@styled-system/css';
import type { SocketState } from './types';
import { Flex, Text } from '../../components';

const RoomState = ({ sx, ...socketState }: SocketState & { sx?: SystemStyleObject }): JSX.Element => (
  <Flex bg="#eee" flexDirection="column" sx={sx}>
    <Text use="headline1">
      Results
    </Text>

    <pre>
      {socketState.results.public
        ? JSON.stringify(socketState, null, 2)
        : 'waiting...'}
    </pre>
  </Flex>
);

RoomState.defaultProps = {
  sx: {},
};

export {
  RoomState,
};
