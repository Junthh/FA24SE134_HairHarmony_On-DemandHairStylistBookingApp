import React, { memo } from 'react';
import { SettingBoardContainer } from './styles';

interface SettingBoardProps {
  onLogout: () => void;
}

function SettingBoard(props: SettingBoardProps) {
  const { onLogout } = props;

  return (
    <SettingBoardContainer>
      <div className="setting-board-item">Quản lý tài khoản</div>
      <div className="setting-board-item" onClick={onLogout}>
        Đăng xuất
      </div>
    </SettingBoardContainer>
  );
}

export default memo(SettingBoard);
