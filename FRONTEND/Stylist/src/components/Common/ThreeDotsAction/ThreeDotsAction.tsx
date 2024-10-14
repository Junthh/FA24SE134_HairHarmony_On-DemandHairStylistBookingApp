import { ReactComponent as ActionsIcon } from 'assets/pics/icons/action-dots.svg';
import { ReactComponent as VerticalActionsIcon } from 'assets/pics/icons/three-dots-vertical.svg';
import React from 'react';

import { Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ActionItemWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 2px',
});

export interface IActionItem<TItems> {
  type: TItems;
  label: string;
  left: React.ReactElement;
}

interface ThreeDotsActionPropsType<TItems> {
  selected?: string;
  items: IActionItem<TItems>[];
  direction?: 'vertical' | 'portrait';
  onClick: (item: TItems) => void;
}

const ThreeDotsAction = <TItems extends string>({
  items,
  direction,
  onClick,
}: ThreeDotsActionPropsType<TItems>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickItem = (item: TItems) => {
    setAnchorEl(null);
    onClick(item);
  };

  const onClose = (item: string) => {
    setAnchorEl(null);
  };

  const actionIconProps = {
    style: { width: 20, height: 20 },
    cursor: 'pointer',
    onClick: handleClick,
  };
  return (
    <>
      {direction === 'vertical' ? (
        <VerticalActionsIcon {...actionIconProps} />
      ) : (
        <ActionsIcon {...actionIconProps} />
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            minWidth: 200,
            borderRadius: 16,
          },
        }}
      >
        {items.map((action) => {
          return (
            <MenuItem key={action.type} onClick={() => handleClickItem(action.type)}>
              <ActionItemWrapper key={action.type}>
                {action.left}
                <Typography>{action.label}</Typography>
              </ActionItemWrapper>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ThreeDotsAction;
