import React, { memo } from 'react';
import { SettingBoardContainer } from './styles';
import { STAFF_PATH } from 'configurations/paths/paths';
import { useSelector } from 'react-redux';
import { selectCredentialInfo } from 'redux/Reducer';
import { useNavigate } from 'react-router-dom';

interface SettingBoardProps {
  onLogout: () => void;
}

function SettingBoard(props: SettingBoardProps) {
  const { onLogout } = props;
  const credentialInfo = useSelector(selectCredentialInfo);
  const navigate = useNavigate();
  return (
    <SettingBoardContainer>
      <div
        className="setting-board-item"
        onClick={() => {
          navigate(`${STAFF_PATH.PROFILE}/${credentialInfo.Id}`);
        }}
      >
        Manage Account
      </div>
      <div className="setting-board-item" onClick={onLogout}>
        Log out
      </div>
    </SettingBoardContainer>
  );
}

export default memo(SettingBoard);
