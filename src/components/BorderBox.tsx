import styled from "@emotion/styled";
import type { BordersProps } from "styled-system";
import { borders } from "styled-system";
import { Box } from "./Box";

export const BorderBox = styled(Box)<BordersProps>(
  {
    borderColor: "transparent",
    borderWidth: 1,
  },
  borders,
);
