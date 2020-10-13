/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

/**
 * 내차팔기 무평가 '판매진행' 처리 팝업
 * @fileoverview 내차팔기 무평가 '판매진행' 처리 팝업
 * @author 김민철
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
// import { noneSaleProc1 } from '@src/actions/mypage/sellcar/mySellCarAction';
/**
 * 내차팔기 무평가 '판매진행' 처리 팝업
 * @fileoverview 내차팔기 무평가 '판매진행' 처리 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {String} slReqId 신청서 번호
 * @returns {SelfReqCancel}
 */
const NoneSaleProc1Popup = ({ slReqId, closedHandler }) => {
  const dispatch = useDispatch();

  const confirmlHandler = (e) => {
    e.preventDefault();
    if (slReqId !== undefined) {
      closedHandler(false);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
  };

  return (
    <>
      <div className="con-wrap compact">
        <p>
          차량 탁송 이후 더운 자세한
          <br />
          견적 산정이 진행됩니다.?
          <br />
          탁송 진행 이후 취소하시면 발생되는
          <br />
          탁송비는 고객부담으로 처리됩니다.
          <br />
          계속 진행하시겠습니까?
        </p>
        <Buttons align="center" marginTop={30}>
          <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={confirmlHandler} />
          <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={cancelHandler} />
        </Buttons>
      </div>
    </>
  );
};

NoneSaleProc1Popup.propTypes = {
  popupOpen: PropTypes.bool,
  slReqId: PropTypes.string
};

export default NoneSaleProc1Popup;
