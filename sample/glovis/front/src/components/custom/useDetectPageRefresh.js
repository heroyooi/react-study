import { useEffect, useCallback, useContext } from 'react';
import Router from 'next/router';
import { SystemContext } from '@src/provider/SystemProvider';

const useDetectPageRefresh = (onGoing = false, initUrl) => {
  const { showConfirm, showAlert } = useContext(SystemContext);

  // Refresh 체크 함수
  const pageRefreshListener = useCallback((e) => {
    // F5 클릭된 경우
    if (e.keyCode === 116) {
      e.preventDefault();
      showConfirm('새로고침 시 입력중인 값이 초기화됩니다.<br/>새로고침 하시겠습니까?', async () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    // 진행상태가 false로 초기화되었다면, 최초단계로 포워딩한다.
    if (!onGoing && initUrl) {
      showAlert('입력중인 값이 초기화되었습니다.<br/>첫 페이지로 이동합니다.', () => {
        Router.push(initUrl).then(() => {
          window.scrollTo(0, 0);
        });
      });

      return;
    }
    window.addEventListener('keydown', pageRefreshListener);
    return () => {
      window.removeEventListener('keydown', pageRefreshListener);
    };
  }, []);
};

export default useDetectPageRefresh;
