import styled from '@emotion/styled';
import type { SystemStyleObject } from '@styled-system/css';
import css from '@styled-system/css';
import shouldForwardProp from '@styled-system/should-forward-prop';
import type { ReactNode } from 'react';
import type { BordersProps, ColorProps, SpaceProps, TypographyProps } from 'styled-system';
import { borders, color, compose, space, typography, variant } from 'styled-system';

const media = { breakpoint: { lg: { up: '@media (min-width: 1200px)' } } };

const variants: Record<string, [string, SystemStyleObject]> = {
  body1: ['p', {
    fontFamily: 'Tahoma',
  }],
  body2: ['p', {
    fontFamily: 'Tahoma',
  }],
  headline1: ['h1', {
    fontFamily: 'Tahoma',
    margin: 'calc(1.375rem + 1.5vw)',
    [media.breakpoint.lg.up]: {
      margin: '2.5rem',
    },
  }],
  headline2: ['h2', {
    fontFamily: 'Tahoma',
    margin: 'calc(1.325rem + 0.9vw)',
    [media.breakpoint.lg.up]: {
      margin: '2rem',
    },
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

const TextBase = styled('span' as 'view', { shouldForwardProp })(
  {
    fontFamily: 'monospace',
  },
  compose(
    borders,
    color,
    space,
    typography,
  ),
  variant({
    prop: 'use',
    variants: Object.keys(variants).reduce((object, tag: keyof typeof variants) => (
      ({ ...object, [tag]: variants[tag][1] })
    ), {}),
  }),
  ({ sx }) => css(sx),
);

const Text = (props: TextProps): JSX.Element => {
  let tag: string | null = null;

  // eslint-disable-next-line react/destructuring-assignment -- props forwarded
  if (typeof props.use === 'string' && props.use in variants) {
    [tag] = variants[props.use];
  }

  return <TextBase as={tag} {...props} />;
};

Text.defaultProps = {
  children: void 0,
  sx: void 0,
  use: '',
};

export {
  Text,
};

export type {
  TextProps,
};
