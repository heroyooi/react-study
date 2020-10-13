/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/**
 * 마이페이지 내차팔기 방문평가 신청정보 디테일
 * @filreOverView 마이페이지 내차팔기 방문평가 신청정보 디테일
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 * @requires CarAddOptionsEditor
 * @requires CarDetailInfoEditor
 * @requires CarSellerInfoEditor
 * @requires sellCarAction
 * @author 김민철
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
import CarDetailInfoEditor from '@src/components/sellcar/self/CarDetailInfoEditor.js';
import CarSellerInfoEditor from '@src/components/sellcar/self/CarSellerInfoEditor.js';

import CarImageUpload from '@src/components/common/CarImageUpload';
import { SELF_STT, AUCT_STT_DVCD } from '@src/constant/mbSlReqStt';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import * as saleCarUtil from '@src/utils/sellcar/SaleCarUtil';
import * as action from '../../../actions/sellcar/allSellcarSearchAction';
import CommonReqCancelPopup from './popup/CommonReqCancelPopup';
import CommonSaleCancelPopup from './popup/CommonSaleCancelPopup';
import SelfBiddCurrentStatPopup from './popup/SelfBiddCurrentStatPopup';
import SelfBiddResultPopup from './popup/SelfBiddResultPopup';
import SelfReviewFormPopup from './popup/SelfReviewFormPopup';
import { setComma } from '@src/utils/StringUtil';

const refuseType = {
  dn01: '고객요청',
  dn02: '차량정보오류',
  dn03: '사진정보오류',
  dn04: ''
};

/**
 * 설명 : 회원, 비회원의 셀프평가 신청 진행 처리
 * @param {Object} req 신청서 정보
 * @param {Number} activeNo 현재 처리된 스탭의 번호
 * @return {selfDetail}
 */
const SelfDetail = ({ activeNo }) => {
  const dispatch = useDispatch();
  const { seller, car, cmprEstm } = useSelector((state) => state.sellCarStore, []);
  const availEditBtn = seller.reqSttTpcd === SELF_STT.PUBLIC_TEMP || seller.reqSttTpcd === SELF_STT.PUBLIC_FORM_COMPLETE ? true : false;
  const [state, setState] = useState(saleCarUtil.defaultState);

  /** 팝업 */
  // const [cmpr, setCmpr] = useState({});
  const [biddResult, setBiddResult] = useState({});
  const [availReviewBtn, setAvailReviewBtn] = useState(false);

  // const [stt, setStt] = useState(seller.reqSttTpcd);
  const [biddRestartPopup, setBiddRestartPopup] = useState(false);
  const [reviewPopup, setReviewPopup] = useState(false);

  const [rodalCancelConfirm, setRodalCancelConfirm, cancelConfirmPopupHandler, cancelConfirmModalCloseHandler] = useRodal(false, true);
  const [rodalSaleCancel, setRodalSaleCancel, popupSaleCancelHandler, popupSaleCancelCloseHandler] = useRodal(false, true);
  const [rodalCrntBiddStat, setRodalCrntBiddStat, popupCrntBiddStatHandler, popupCrntBiddStatCloseHandler] = useRodal(false, true);
  const [rodalBiddResult, setRodalBiddResult, biddBiddResultHandler, biddBiddResultCloseHandler] = useRodal(false, true);
  const [rodalReviewForm, setRodalReviewForm, reviewFormPopupHandler, reviewFormModalCloseHandler] = useRodal(false, true);

  const [rodalSuspension, setRodalSuspension, suspensionPopupHandler, suspensionModalCloseHandler] = useRodal(false);
  const onOpenSuspensionRodal = (e) => {
    e.preventDefault();
    setRodalSuspension(true);
  };

  // 신청취소 팝업 핸들러
  const reqCancelPopupHandler = (e) => {
    e.preventDefault();
    console.log('reqCancelPopupHandler');
    setRodalCancelConfirm(true);
  };

  // 판매취소 팝업 핸들러
  const saleCancelPopupHandler = (e) => {
    e.preventDefault();
    console.log('saleCancelPopupHandler');
    setRodalSaleCancel(true);
  };

  // 입찰현황 팝업 핸들러
  const biddCurrentStatPopupHandler = (e) => {
    e.preventDefault();
    if (cmprEstm?.hh24AuctId) {
      setRodalCrntBiddStat(true);
    }
  };

  // 입찰결과 팝업 핸들러
  const biddResultPopupHandler = async (e) => {
    e.preventDefault();
    console.log('biddResultPopupHandler', cmprEstm);
    if (cmprEstm?.hh24AuctId) {
      setRodalBiddResult(true);
    }
  };

  // 판매진행 버튼 핸들러
  const saleProcHandler = (selectedBiddId) => {
    setBiddResult({ ...biddResult, selectedDlrBiddNo: selectedBiddId, auctStt: AUCT_STT_DVCD.SUCCEED_BIDDING });
  };

  // 다시견적받기 버튼 핸들러
  const biddRestartPopupHandler = (e) => {
    e.preventDefault();
    setBiddRestartPopup(!biddRestartPopup);
  };

  // 이용후기 작성 버튼 핸들러
  const reviewPopupHandler = async (e) => {
    e.preventDefault();
    if (cmprEstm?.hh24AuctId) {
      // const success = await dispatch(action.selectBiddStatusByAuctIdAction({ hh24AuctId: cmprEstm.hh24AuctId }));
      // if (success) {
      setRodalReviewForm(true);
      // }
    }
  };

  // 신청서 정보 변화 감지
  useEffect(() => {
    if (isEmpty(seller.review)) {
      setAvailReviewBtn(true);
    } else {
      setAvailReviewBtn(false);
    }
    if (!isEmpty(seller)) {
      setState(saleCarUtil.getState(seller, cmprEstm));
    }
  }, [seller]);

  return (
    <>
      <Steps
        type={1}
        contents={['차량정보등록', '신청완료', '입찰가/견적확인', '비교견적 완료', '거래 진행중', '거래완료']}
        subContents={[
          '차량정보를\n등록해주세요.',
          '신청이 완료되었습니다.\n관리자 확인 후 비교견적이\n시작됩니다.',
          '비교견적 진행 중 입니다.\n입찰현황을 확인해 보세요.',
          '비교견적이 완료되었습니다.\n입찰현황을 확인하시고\n차량 판매 여부를 결정해주세요',
          '현재 선택하신 딜러와 거래가 진행중입니다.\n잠시만 기다려주세요.',
          '딜러와의 거래는 어떠셨나요?\n이용후기를 남겨주세요.'
        ]}
        active={state.activeNo}
        marginBottom={193}
      />
      <CarImageUpload modifyHref={`/sellcar/self/selfSellCarPicture?slReqId=${seller.slReqId}`} photoList={car.photoList} modify={availEditBtn} />
      {/* <CarPhotoList slReqId={seller.slReqId} photoList={seller.photoList} href="/sellcar/self/selfSellCarPicture" availEditBtn={availEditBtn} /> */}
      <div className="car-basic-info">
        <CarBasicInfoEditor item={car} isEditing={false} />
      </div>

      {availEditBtn && (
        <Button className="fr" size="big" background="blue80" title="차량 정보 수정" width={180} marginTop={33} nextLink={true} href={`/sellcar/self/selfSellCarInfo?slReqId=${seller.slReqId}`} />
      )}

      <CarOptionsEditor items={car.optionList} isEditing={false} addOptions={false} />
      <div className="option-add-wrap">
        <CarAddOptionsEditor items={car.optionList} item={car} isEditing={false} />
        <p className="tx-exp-tp3 tx-red80 fr mt16">* 실제 차량 정보와 상이할 경우 추후 견적이 달라질 수 있습니다.</p>
      </div>
      <div className="mb20">
        <CarDetailInfoEditor item={car} isEditing={false} viewIsExchanged={true} />
      </div>
      <div className="sell-info">
        <CarSellerInfoEditor item={seller} isEditing={false} viewAddress={false} viewAccountNo={false} />
        {availEditBtn && (
          <Button className="fr" size="big" background="blue80" title="판매자 정보 수정" width={180} marginTop={33} nextLink={true} href={`/sellcar/self/selfSellCarInfo?slReqId=${seller.slReqId}`} />
        )}
      </div>
      <table summary="차량 견적" className="table-tp1 mt80 car-estimate">
        <caption>차량 견적</caption>
        <colgroup>
          <col width="16%" />
          <col width="84%" />
        </colgroup>
        <tbody>
          <tr>
            <th>금액</th>
            <td>
              {state.displayPriceType === saleCarUtil.DisplayPrice.NONE && (
                <>
                  <strong>--</strong> 만원
                </>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.REFUSE && (
                <>
                  *관리자에 의해 진행이 보류되었습니다.
                  <Button size="mid" line="gray" color="black" radius={true} title="보류사유" width={114} height={40} marginLeft={32} onClick={onOpenSuspensionRodal} />
                </>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.BEFORE_BIDD && <>관리자 확인 후 비교 견적이 시작됩니다.</>}
              {state.displayPriceType === saleCarUtil.DisplayPrice.BIDDING && (
                <>
                  비교견적 진행 중입니다. 입찰 현황을 확인해 보세요. &nbsp;&nbsp;
                  <Button size="mid" line="gray" color="black" radius={true} title="입찰현황" width={114} height={40} marginLeft={32} onClick={biddCurrentStatPopupHandler} />
                </>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.END_BIDD && (
                <>
                  {/* 내차팔기 최고금액  */}
                  <p className="price-tp4 tx-blue80">
                    {setComma(cmprEstm.maxAmt)}
                    <span className="won"> 만원</span>
                  </p>
                  입찰 현황을 확인해 보시고, 판매여부를 결정해주세요 &nbsp;&nbsp;
                  <Button size="mid" line="gray" color="black" radius={true} title="입찰현황" width={114} height={40} marginLeft={32} onClick={biddResultPopupHandler} />
                </>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.FAIL_BIDD && (
                <>
                  {/* 내차팔기 최고금액  */}
                  <p className="price-tp4 tx-blue80">
                    -<span className="won"> 만원</span>
                  </p>
                  아쉽게도 입찰한 딜러가 없습니다. 다시한번 비교견적을 신청해보세요. &nbsp;&nbsp;
                  <Button size="mid" line="gray" color="black" radius={true} title="입찰현황" width={114} height={40} marginLeft={32} onClick={biddRestartPopupHandler} />
                </>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.SHOW_PRICE && (
                <p className="price-tp4 tx-blue80">
                  {setComma(cmprEstm?.myBidd?.biddAmt)}
                  <span className="won"> 만원</span>
                </p>
              )}
              {state.displayPriceType === saleCarUtil.DisplayPrice.DELAY && (
                <>
                  <p className="price-tp4 tx-blue80">
                    {setComma(2100)}
                    <span className="won"> 만원</span>
                  </p>
                  현재 딜러선택 후 7일이 지나 거래 지연중입니다. 선택 딜러와 연락을 취해주세요.
                  <Button size="mid" line="gray" color="black" radius={true} title="입찰현황" width={114} height={40} marginLeft={32} onClick={biddResultPopupHandler} />
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <Buttons align="center" marginTop={30}>
        {state.btn.nomalCancel && <Button size="big" background="gray" title="신청취소" width={180} marginTop={8} onClick={reqCancelPopupHandler} />}
        {state.btn.modify && (
          <Button size="big" background="blue80" title="신청정보 수정" width={180} marginTop={8} nextLink={false} href={`/sellcar/self/selfSellCarInfo?slReqId=${seller.slReqId}`} />
        )}
        {state.btn.saleCancel && <Button size="big" background="gray" title="판매 취소" width={180} marginTop={8} onClick={saleCancelPopupHandler} />}
        {state.btn.saleProccess && <Button size="big" background="blue80" title="판매 진행" width={180} marginTop={8} onClick={biddResultPopupHandler} />}
        {state.btn.restart && <Button size="big" background="blue80" title="다시 견적 받기" width={180} marginTop={8} onClick={biddResultPopupHandler} />}
        {state.btn.writerReview && isEmpty(seller.usePs4Cntn) && (
          <>
            <Button size="big" background="blue80" title="이용후기 작성" width={180} marginTop={8} onClick={reviewPopupHandler} />
          </>
        )}
        {state.btn.writerReview && !isEmpty(seller.usePs4Cntn) && (
          <>
            <Button size="big" background="gray" title="이용후기 작성 완료" width={180} marginTop={8} onClick={(e) => e.preventDefault()} />
          </>
        )}
      </Buttons>
      {/* 신청서 취소 */}
      <RodalPopup show={rodalCancelConfirm} type={'fade'} width={380} closedHandler={cancelConfirmModalCloseHandler} mode="normal" size="xs" isMask={false} showCloseButton={false} isButton={false}>
        <CommonReqCancelPopup self={true} seller={seller} closedHandler={cancelConfirmModalCloseHandler} />
      </RodalPopup>
      {/* 판매취소 처리 팝업 */}
      <RodalPopup show={rodalSaleCancel} type={'slideUp'} maxWidth={800} title="판매를 취소하시겠습니까?" closedHandler={popupSaleCancelCloseHandler} size="medium" mode="normal">
        <CommonSaleCancelPopup seller={seller} closedHandler={popupSaleCancelCloseHandler} />
      </RodalPopup>
      {/* 입찰 현황 팝업 */}
      <RodalPopup show={rodalCrntBiddStat} type={'slideUp'} width={1200} title="24시간 실시간 비교견적 입찰 현황" closedHandler={popupCrntBiddStatCloseHandler} mode="normal">
        <SelfBiddCurrentStatPopup car={car} cmprEstm={cmprEstm} cancelHandler={saleCancelPopupHandler} closedHandler={popupCrntBiddStatCloseHandler} />
      </RodalPopup>
      {/* 입찰 완료 팝업 */}
      <RodalPopup show={rodalBiddResult} type={'slideUp'} maxWidth={1200} title="24시간 실시간 비교견적 입찰 결과" closedHandler={biddBiddResultCloseHandler} mode="normal">
        <SelfBiddResultPopup seller={seller} car={car} cmprEstm={cmprEstm} cancelHandler={saleCancelPopupHandler} restartHandler={biddRestartPopupHandler} closedHandler={biddBiddResultCloseHandler} />
      </RodalPopup>
      {/* 후기 */}
      <RodalPopup show={rodalReviewForm} title="이용후기 작성" type={'fade'} closedHandler={reviewFormModalCloseHandler} mode="normal" showCloseButton={false} size="large">
        <SelfReviewFormPopup seller={seller} cmprEstm={cmprEstm} closedHandler={reviewFormModalCloseHandler} />
      </RodalPopup>

      {/* 추가 START */}
      {/* 보류사유 */}
      <RodalPopup show={rodalSuspension} type={'fade'} closedHandler={suspensionModalCloseHandler} showCloseButton={false} mode="normal" size="small">
        <div className="con-wrap compact">
          <h4>보류사유</h4>
          <p className="tx-l mt20">
            <b>{refuseType[seller.cnclRsnTpcd]}</b>
            <br />
            <pre>{seller.cnclRsnCntn}</pre>
          </p>
          <Buttons marginTop={30}>
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={140}
              onClick={(e) => {
                e.preventDefault();
                setRodalSuspension(false);
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>
      {/* 추가 END */}
    </>
  );
};

SelfDetail.propTypes = {
  activeNo: PropTypes.number
};

export default SelfDetail;
