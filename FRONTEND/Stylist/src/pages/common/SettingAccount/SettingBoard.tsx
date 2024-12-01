import { STYLIST_PATH } from 'configurations/paths/paths';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCredentialInfo } from 'redux/Reducer';
import { SettingBoardContainer } from './styles';

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
          navigate(`${STYLIST_PATH.PROFILE}/${credentialInfo.Id}`);
        }}
      >
        Quản lý tài khoản
      </div>
      <div className="setting-board-item" onClick={onLogout}>
        Đăng xuất
      </div>
    </SettingBoardContainer>
  );
}

export default memo(SettingBoard);
