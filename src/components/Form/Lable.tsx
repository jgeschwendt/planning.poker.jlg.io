import styled from '@emotion/styled';
import type { SystemStyleObject } from '@styled-system/css';
import css from '@styled-system/css';
import shouldForwardProp from '@styled-system/should-forward-prop';
import type { LabelHTMLAttributes } from 'react';
import type {
  ColorProps,
  SpaceProps,
  TextStyleProps,
  TypographyProps,
} from 'styled-system';
import {
  color,
  compose,
  space,
  typography,
} from 'styled-system';

type LabelProps =
  ColorProps &
  LabelHTMLAttributes<void> &
  SpaceProps &
  TextStyleProps &
  TypographyProps &
  { sx?: SystemStyleObject };

const Label = styled('label', { shouldForwardProp })<LabelProps>(
  compose(
    color,
    space,
    typography,
  ),
  ({ sx }) => css(sx),
);

Label.defaultProps = {
  className: 'form-label',
};

export {
  Label,
};
