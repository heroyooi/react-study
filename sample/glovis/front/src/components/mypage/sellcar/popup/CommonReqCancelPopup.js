/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/**
 * 내차팔기 공통 신청 취소 처리 팝업
 * @fileoverview 내차팔기 공통 신청 취소 처리
 * @author 김민철
 */
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { selfCancelAction } from '@src/actions/sellcar/SelfSellCarAction';
import { visitCancelAction } from '@src/actions/sellcar/VisitSellCarAction';
import { nonevalCancelAction } from '@src/actions/sellcar/NonevalSellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { REQ_TPCD, REQ_TPCD_NM } from '../../../../constant/mbSlReqStt';
/**
 * 내차팔기 공통 신청 취소 처리 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {Object}} req 신청서 정보
 * @returns {CommonReqCancel}
 */
const actionMap = {};
actionMap[REQ_TPCD.VISIT] = visitCancelAction;
actionMap[REQ_TPCD.SELF] = selfCancelAction;
actionMap[REQ_TPCD.NONEVAL] = nonevalCancelAction;

const CommonReqCancel = ({ seller, closedHandler }) => {
  const dispatch = useDispatch();
  const { showAlert } = useContext(SystemContext);

  // 취소 확인 처리 버튼 핸들러
  const confirmHandler = async (e) => {
    e.preventDefault();
    closedHandler(false);
    if (seller.slReqId !== undefined) {
      const action = actionMap[seller.reqTpcd];
      if (action) {
        const success = await dispatch(action(seller.slReqId));
        if ( success ) {
          closedHandler(false);
        } else {
          showAlert('취소처리가 실패했습니다.', () => {
            closedHandler(false);
          });
        } 
      } else {
        showAlert('해당서비스는 취소 서비스를 제공하지 않습니다.', () => {
          closedHandler(false);
        });
      }
    }
  };

  // 취소 철회 처리 버튼 핸들러
  const cancelHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
  };

  return (
    <>
      <div className="con-wrap popup-cancel">
        <p> {REQ_TPCD_NM[seller.reqTpcd]} 신청을 취소하시겠습니까?</p>
        <Buttons align="center" marginTop={30}>
          <Button size="big" background="blue80" title="확인" width={130} onClick={confirmHandler} />
          <Button size="big" background="gray" title="취소" width={130} onClick={cancelHandler} />
        </Buttons>
      </div>
    </>
  );
};

CommonReqCancel.propTypes = {
  seller: PropTypes.object,
  closedHandler: PropTypes.func
};

export default CommonReqCancel;
