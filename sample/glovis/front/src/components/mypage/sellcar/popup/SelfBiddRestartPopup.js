/**
 * 입찰 재요청 팝업
 * @fileoverview 입찰결과 팝업
 * @author 김민철
 */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProtoTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
// import { biddRestart } from '@src/actions/mypage/sellcar/mySelfSellCarAction';
import SellCarInfo from '../sub/SellCarInfo';

/**
 * 입찰 재요청 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {obj}  req 신청정보
 * @param {obj}  biddResult 입찰결과
 * @param {callback} cancelHandler 취소처리 콜백
 * @returns {SelfBiddRestartPopup}
 */
const SelfBiddRestartPopup = ({ popupOpen = false, seller, cmprEstm, cancelHandler }) => {
  const dispatch = useDispatch();
  const [firstOpen, setFirstOpen] = useState(true);

  const _cancelHandler = (e) => {
    e.preventDefault();
    if (cancelHandler) {
      cancelHandler(e);
    }
  };

  const openConfirmHandler = (e) => {
    e.preventDefault();
    setRodalRestartConfirm(true);
  };

  // 다시견적받기 요청 핸들러
  const confirmOkHandler = (e) => {
    e.preventDefault();
    // dispatch(biddRestart(req.reqInfo.slReqId));
  };

  const confirmCancelHandler = (e) => {
    e.preventDefault();
    setRodalRestartConfirm(false);
  };

  useEffect(() => {
    if (firstOpen && popupOpen) {
      setFirstOpen(false);
      setRodalBidd(true);
    } else if (!firstOpen) {
      setRodalBidd(true);
    }
  }, [popupOpen]);

  return (
    <>
      <div className="pd15">
        <SellCarInfo car={req.car} photoList={req.photoList} />
        <div className="bidding-inquiry">
          <h5>입찰 결과 조회</h5>
          <ul>
            <li>
              입찰자수
              <p className="price-tp7">
                {biddResult.biddDlrCnt}
                <span className="won">명</span>
              </p>
            </li>
            <li>
              최종 판매가
              <p className="price-tp7">
                {biddResult.maxAmt}
                <span className="won">만원</span>
              </p>
            </li>
          </ul>
        </div>

        <Buttons align="center" marginTop={20} marginBottom={20}>
          <Button size="big" background="blue80" title="판매 취소" width={180} marginTop={8} onClick={_cancelHandler} />
          <Button size="big" background="blue80" title="다시 견적 받기" width={180} marginTop={8} onClick={openConfirmHandler} />
        </Buttons>
      </div>

      <RodalPopup show={rodalRestartConfirm} type={'fade'} width={380} closedHandler={restartConfirmModalCloseHandler} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
        <div className="con-wrap compact">
          <p>
            다시 24시간 실시간 비교 견적을
            <br />
            진행하시겠습니까?
          </p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={confirmOkHandler} />
            <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={confirmCancelHandler} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

SelfBiddRestartPopup.propTypes = {
  popupOpen: ProtoTypes.bool,
  req: ProtoTypes.object,
  biddResult: ProtoTypes.object,
  cancelHandler: ProtoTypes.func
};

export default SelfBiddRestartPopup;
