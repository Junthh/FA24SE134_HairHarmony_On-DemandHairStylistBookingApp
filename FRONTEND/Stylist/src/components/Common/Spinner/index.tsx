import { PropsWithChildren } from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { selectLoading } from 'redux/Reducer';

interface ISpinner {
  loading?: boolean;
}

export const LoadingOverlay = (props: PropsWithChildren<ISpinner>) => {
  const { loading = false } = props;
  const loadingStore = useSelector(selectLoading);

  return (
    <>
      {(loading || loadingStore) && (
        <div className="loader-container">
          <div className="loader">
            <div className="wBall" id="wBall_1">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_2">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_3">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_4">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_5">
              <div className="wInnerBall"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
