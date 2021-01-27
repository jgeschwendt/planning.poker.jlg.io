import styled from "@emotion/styled";
import type { SystemStyleObject } from "@styled-system/css";
import css from "@styled-system/css";
import shouldForwardProp from "@styled-system/should-forward-prop";
import type { ReactNode } from "react";
import type { BordersProps, ColorProps, SpaceProps, TypographyProps } from "styled-system";
import { borders, color, space, typography, variant } from "styled-system";

const variants: Record<string, [string, SystemStyleObject]> = {
  body1: ["p", {
    fontFamily: "Tahoma",
  }],
  body2: ["p", {
    fontFamily: "Tahoma",
  }],
  headline1: ["h1", {
    fontFamily: "Tahoma",
  }],
  headline2: ["h2", {
    fontFamily: "Tahoma",
  }],
};

type TextProps =
  BordersProps &
  ColorProps &
  SpaceProps &
  TypographyProps &
  {
    children?: ReactNode;
    sx?: SystemStyleObject;
    use?: keyof typeof variants;
  };

const TextBase = styled("span" as "view", { shouldForwardProp })(
  {
    fontFamily: "monospace",
  },
  borders,
  color,
  space,
  typography,
  variant({
    prop: "use",
    variants: Object.keys(variants).reduce((object, tag: keyof typeof variants) => (
      ({ ...object, [tag]: variants[tag][1] })
    ), {}),
  }),
  ({ sx }) => css(sx),
);

const Text = (props: TextProps): JSX.Element => {
  let tag: string | null = null;

  if (typeof props.use === "string" && props.use in variants) {
    [tag] = variants[props.use];
  }

  return <TextBase as={tag} {...props} />;
};

export {
  Text,
};

export type {
  TextProps,
};
