import React, { memo } from 'react';
import { SettingBoardContainer } from './styles';

interface SettingBoardProps {
  onLogout: () => void;
}

function SettingBoard(props: SettingBoardProps) {
  const { onLogout } = props;

  return (
    <SettingBoardContainer>
      <div className="setting-board-item">Manage Account</div>
      <div className="setting-board-item" onClick={onLogout}>
        Log out
      </div>
    </SettingBoardContainer>
  );
}

export default memo(SettingBoard);
