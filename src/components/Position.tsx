import styled from "@emotion/styled";
// eslint-disable-next-line import/no-namespace -- external api
import type * as CSS from "csstype";
import type { PositionProps, ResponsiveValue } from "styled-system";
import { position } from "styled-system";
import { Box } from "./Box";

const capitalize = (string: string): string => (
  string[0].toUpperCase() + string.slice(1)
);

const Position = styled(Box)<PositionProps>(position);

const withPosition = (positionProp: ResponsiveValue<CSS.Property.Position>): typeof Position => {
  const WithPosition = (props: Record<string, unknown>): JSX.Element => (
    <Position {...props} position={positionProp} />
  );

  WithPosition.displayName = `Position.${capitalize(positionProp as string)}`;
  return WithPosition as typeof Position;
};

const Absolute = withPosition("absolute");

const Fixed = withPosition("fixed");

const Relative = withPosition("relative");

const Sticky = withPosition("sticky");
Sticky.defaultProps = {
  top: 0,
  zIndex: 1,
};

export {
  Absolute,
  Fixed,
  Relative,
  Sticky,
};
