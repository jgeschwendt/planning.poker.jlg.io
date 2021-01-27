import styled from "@emotion/styled";
import type { SystemStyleObject } from "@styled-system/css";
import css from "@styled-system/css";
import shouldForwardProp from "@styled-system/should-forward-prop";
import type { HTMLAttributes } from "react";
import type { ColorProps, FlexboxProps, LayoutProps, SpaceProps } from "styled-system";
import { borders, color, flexbox, layout, space } from "styled-system";

export type BoxProps =
  ColorProps &
  FlexboxProps &
  HTMLAttributes<Element> &
  LayoutProps &
  SpaceProps &
  { sx?: SystemStyleObject };

export const Box = styled("div", { shouldForwardProp })<BoxProps>(
  {
    boxSizing: "border-box",
  },
  borders,
  color,
  flexbox,
  layout,
  space,
  ({ sx }) => css(sx),
);
