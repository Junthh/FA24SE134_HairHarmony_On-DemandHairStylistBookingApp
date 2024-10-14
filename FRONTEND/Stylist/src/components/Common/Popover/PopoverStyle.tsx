import { Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PopoverContainer = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 9px !important;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.18);
    padding: 0 4px;
    min-width: 168px;
    margin-left: 20px;
    li {
      padding: 6px;
    }
  }
`;
