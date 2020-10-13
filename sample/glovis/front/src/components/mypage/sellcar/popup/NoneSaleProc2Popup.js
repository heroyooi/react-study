/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/**
 * 내차팔기 무평가 '판매진행(판매완료)' 처리 팝업
 * @fileoverview 내차팔기 무평가 '판매진행(판매완료)' 처리 팝업
 * @author 김민철
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import * as api from '@src/api/sellcar/NonevalSellcarApi';
import { getReqAction, updateReqSttTpcd } from '../../../../actions/sellcar/sellCarAction';
/**
 * 내차팔기 무평가 '판매진행(판매완료)' 처리 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {String} slReqId 신청서 번호
 * @returns {NoneSaleProc2Popup}
 */
const NoneSaleProc2Popup = ({ slReqId, closedHandler }) => {
  const dispatch = useDispatch();
  const confirmHandler = (e) => {
    e.preventDefault();
    const param = { slReqId };
    api.updateSaleProcDecide(param)
       .then( res => {
         dispatch(getReqAction(param.slReqId));
         closedHandler(false);
       })
       .catch( err => console.log(err));
    closedHandler(false);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
  };

  return (
    <>
      <div className="con-wrap compact">
        <p>판매 진행을 하시겠습니까?</p>
        <Buttons align="center" marginTop={30}>
          <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={confirmHandler} />
          <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={cancelHandler} />
        </Buttons>
      </div>
    </>
  );
};

NoneSaleProc2Popup.propTypes = {
  popupOpen: PropTypes.bool,
  slReqId: PropTypes.string
};

export default NoneSaleProc2Popup;
