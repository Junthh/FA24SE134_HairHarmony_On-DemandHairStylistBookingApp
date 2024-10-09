import styled from '@emotion/styled';
import Button from 'components/Common/Button';
import * as colors from 'constants/colors';
export const ButtonPrimary = styled(Button)<{
  texttransform?;
  fontWeight?;
  padding;
  severity: 'primary' | 'transparent' | 'cancel';
  margin?;
  borderradius?;
  border?;
  color?;
  fontSize?;
  lineHeight?;
}>(
  ({
    texttransform,
    fontWeight,
    padding,
    severity,
    margin,
    borderradius,
    border,
    color,
    fontSize,
    lineHeight
  }) => ({
    display: 'flex',
    alignItems: 'center',
    textTransform: texttransform ? texttransform : 'none',
    color:
      severity === 'primary'
        ? colors.primary1
        : severity === 'cancel'
          ? colors.grey2
          : colors.primary,
    background: severity === 'primary' ? colors.primary : colors.white,
    borderColor: severity === 'cancel' ? colors.grey2 : colors.primary,
    fontWeight: fontWeight ? fontWeight : 700,
    fontSize: fontSize ? fontSize : '18px',
    lineHeight: lineHeight ? lineHeight : '21px',
    padding: padding ? padding : '16px 32px',
    margin: margin,
    borderRadius: borderradius ? borderradius : '8px',
    border: border,
    '&:hover': {
      color: colors.white,
      background: colors.primary,
    },
  }),
);
