import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const MobFullpageHeader = ({ onClose }) => {
  const dispatch = useDispatch();
  const { mFullpagePopupTitle, mFullpagePopupOptions } = useSelector(state => state.common);

  const handleClosePopup = useCallback(() => {
    if (onClose) {
      // console.log(1);
    } else {
      // console.log(2);
    }
    dispatch({
      type: MOBILE_FULLPAGE_POPUP_CLOSE,
    });
    
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);

  return (
    <header className="header fp-header">    
      <h1 className={mFullpagePopupOptions.includes('back') ? null : 'first'}>{mFullpagePopupTitle}</h1>
      {mFullpagePopupOptions.includes('back') && <button type="button" className="btn-back" onClick={handleClosePopup}>뒤로</button>}
      {mFullpagePopupOptions.includes('close') && <button type="button" className="btn-close" onClick={handleClosePopup}>닫기</button>}
      {mFullpagePopupOptions.includes('reset') && <button type="button" className="btn-reset">초기화</button>}
    </header>
  )
}

export default MobFullpageHeader;