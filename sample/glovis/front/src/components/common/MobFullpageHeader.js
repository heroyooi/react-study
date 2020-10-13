import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';
import { preventScroll } from '@src/utils/CommonUtil';

const MobFullpageHeader = memo(({ cPop, subPop, onClose, onReset }) => {
  const dispatch = useDispatch();
  const { mFullpagePopupTitle, mFullpagePopupOptions, mFullpageCPopupTitle, mFullpageCPopupOptions } = useSelector((state) => state.common);

  const popTitle = !cPop ? mFullpagePopupTitle : mFullpageCPopupTitle;
  const popOptions = !cPop ? mFullpagePopupOptions : mFullpageCPopupOptions;

  const handleClosePopup = useCallback(
    (e) => {
      if (onClose) {
        onClose(e);
      }

      if (!cPop) {
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      } else {
        dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
      }

      if (!subPop) preventScroll(false);
    },
    [cPop, dispatch, onClose, subPop]
  );

  const handleReset = useCallback(
    (e) => {
      if (onReset) {
        onReset(e);
      }
    },
    [onReset]
  );

  return (
    <header className="header fp-header">
      <h1 className={popOptions.includes('back') ? null : 'first'}>{popTitle}</h1>
      {popOptions.includes('back') && (
        <button type="button" className="btn-back" onClick={handleClosePopup}>
          뒤로
        </button>
      )}
      {popOptions.includes('close') && (
        <button type="button" className="btn-close" onClick={handleClosePopup}>
          닫기
        </button>
      )}
      {popOptions.includes('reset') && (
        <button type="button" className="btn-reset" onClick={handleReset}>
          초기화
        </button>
      )}
    </header>
  );
});

MobFullpageHeader.propTypes = {
  cPop: PropTypes.bool,
  subPop: PropTypes.bool,
  onClose: PropTypes.func,
  onReset: PropTypes.func
};

MobFullpageHeader.displayName = 'MobFullpageHeader';
export default MobFullpageHeader;
