import styled from "@emotion/styled";
import type { SystemStyleObject } from "@styled-system/css";
import css from "@styled-system/css";
import shouldForwardProp from "@styled-system/should-forward-prop";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { BordersProps, ColorProps, LayoutProps, SpaceProps, TypographyProps } from "styled-system";
import { borders, color, layout, space, typography } from "styled-system";

type InputProps =
  BordersProps &
  ColorProps &
  InputHTMLAttributes<Element> &
  LayoutProps &
  SpaceProps &
  TypographyProps &
  {
    ref?: ForwardedRef<HTMLInputElement>;
    sx?: SystemStyleObject;
  };

const InputBase = styled("input", { shouldForwardProp })(
  borders,
  color,
  layout,
  space,
  typography,
  ({ sx }) => css(sx),
);

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref): JSX.Element => {
  const classNames = ["form-control", className];

  return (
    <InputBase className={classNames.join(" ")} ref={ref} {...props} />
  );
});

Input.displayName = "Input";

export {
  Input,
};
