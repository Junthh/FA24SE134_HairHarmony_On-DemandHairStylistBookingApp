import styled from '@emotion/styled';
import * as colors from 'constants/colors';

export const FormContainer = styled(`div`)({
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    background: colors.white,
    boxShadow: '0px 6px 26px 6px rgba(66, 66, 66, 0.10)',
    borderRadius: '12px'
});

export const FormContent = styled(`div`)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
});

export const FormTitle = styled(`div`)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const FormItem = styled(`div`)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});