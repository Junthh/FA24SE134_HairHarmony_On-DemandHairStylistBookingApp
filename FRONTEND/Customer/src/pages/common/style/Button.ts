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
  width?;
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
    lineHeight,
    width,
  }) => ({
    display: 'flex',
    alignItems: 'center',
    textTransform: texttransform ? texttransform : 'none',
    color:
      severity === 'primary' ? colors.white : severity === 'cancel' ? colors.grey2 : colors.primary,
    background: severity === 'primary' ? colors.dark : colors.white,
    borderColor: severity === 'cancel' ? colors.grey2 : colors.primary,
    fontWeight: fontWeight ? fontWeight : 400,
    fontSize: fontSize ? fontSize : '18px',
    lineHeight: lineHeight ? lineHeight : '21px',
    padding: padding ? padding : '16px 32px',
    margin: margin,
    borderRadius: borderradius ? borderradius : '8px',
    width: width,
    border: border
      ? border
      : severity === 'cancel'
      ? `1px solid ${colors.grey2}`
      : '1px solid black',
    '&:hover': {
      color: colors.dark,
      background: colors.white,
      border: '1px solid black',
    },
    '&.active': {
      background: colors.dark,
      color: `${colors.white} !important`,
    },
    '&.Mui-disabled': {
      background: '#e5e5e5',
      borderColor: '#e5e5e5',
      color: `${colors.white} !important`,
    },
  }),
);
