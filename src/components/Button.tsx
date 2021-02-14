import styled from "@emotion/styled";
import type { SystemStyleObject } from "@styled-system/css";
import css from "@styled-system/css";
import shouldForwardProp from "@styled-system/should-forward-prop";
import type { ReactNode } from "react";
import type {
  BordersProps,
  ColorProps,
  DisplayProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";
import {
  borders,
  color,
  compose,
  display,
  layout,
  space,
  typography,
} from "styled-system";

type ButtonProps =
  BordersProps &
  ColorProps &
  DisplayProps &
  LayoutProps &
  Record<string, unknown> &
  SpaceProps &
  TypographyProps &
  {
    id?: string;
    children?: ReactNode;
    size?: "lg";
    type?: "button" | "reset" | "submit";
    variant?: "outline-primary" | "outline-secondary" | "primary" | "secondary";
  };

const ButtonBase = styled("button", { shouldForwardProp })(
  compose(
    borders,
    color,
    display,
    layout,
    space,
    typography,
  ),
  ({ sx }: { sx?: SystemStyleObject }) => css(sx),
);

const Button = ({
  children,
  color: colorProp,
  variant = "primary",
  size,
  type = "button",
  ...props
}: ButtonProps): JSX.Element => {
  const classNames = ["btn", `btn-${variant}`];

  if (typeof size === "string") {
    classNames.push(`btn-${size}`);
  }

  return (
    <ButtonBase
      // eslint-disable-next-line react/forbid-component-props -- todo
      className={classNames.join(" ")}
      color={colorProp as string}
      type={type}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

Button.defaultProps = {
  children: void 0,
  color: void 0,
  id: void 0,
  size: void 0,
  type: "button",
  variant: "primary",
};

export {
  Button,
};
