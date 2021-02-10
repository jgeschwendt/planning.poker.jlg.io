import type { SystemStyleObject } from "@styled-system/css";
import type { Poll } from "./types";
import { Flex, Text } from "../../components";

const RoomState = ({
  sx,
  ...poll
}: Poll & {
  sx?: SystemStyleObject;
}): JSX.Element => (
  <Flex bg="#eee" flexDirection="column" sx={sx}>
    <Text use="headline1">
      Results
    </Text>

    <pre>
      {poll.results.public ? JSON.stringify(poll, null, 2) : "waiting..."}
    </pre>
  </Flex>
);

RoomState.defaultProps = {
  sx: {},
};

export {
  RoomState,
};
