import {colors, gradients} from './colors';
import {fonts, fontSize, letterSpacing, lineHeight, textStyles} from './typography';
import {layout, radius, shadows, sizes, spacing} from './spacing';

const theme = {
  colors,
  gradients,
  fonts,
  fontSize,
  lineHeight,
  letterSpacing,
  textStyles,
  spacing,
  radius,
  sizes,
  layout,
  shadows,
};

export type Theme = typeof theme;
export default theme;
