import type { SystemStyleObject } from "@styled-system/css";
import type { Poll } from "./types";
import { Flex } from "../../components";

export const RoomState = ({ sx, ...poll }: Poll & { sx?: SystemStyleObject }): JSX.Element => (
  <Flex bg="#eee" sx={sx}>
    <pre>{poll.results.public ? JSON.stringify(poll, null, 2) : "waiting..."}</pre>
  </Flex>
);
