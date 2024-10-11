import { Box, styled } from '@mui/material';
import * as colors from 'constants/colors';
export const SettingBoardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    height: '100px',
    background: colors.white,
    boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.14)',
    '& .setting-board-item': {
        fontSize: 18,
        padding: '15px 20px 15px 20px',

        '&:hover': {
            background: colors.b5,
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px'
        }
    }
});
