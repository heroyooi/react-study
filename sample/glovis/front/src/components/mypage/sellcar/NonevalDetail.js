/**
 * 마이페이지 내차팔기 무평가 신청정보 디테일
 * @filreOverView 마이페이지 내차팔기 무평가 신청정보 디테일
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 * @requires CarAddOptionsEditor
 * @requires CarDetailInfoEditor
 * @requires CarSellerInfoEditor
 * @requires sellCarAction
 * @author 김민철
 */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { setComma } from '@src/utils/StringUtil';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';

import { SystemContext } from '@src/provider/SystemProvider';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
// import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
// import CarDetailInfoEditor from '@src/components/sellcar/self/CarDetailInfoEditor.js';
import CarSellerInfoEditor from '@src/components/sellcar/self/CarSellerInfoEditor.js';
import CarSpecificsEditor from '@src/components/sellcar/self/CarSpecificsEditor.js';
//import CarPhotoList from '@src/components/mypage/sellcar/sub/CarPhotoList';
import CarImageUpload from '@src/components/common/CarImageUpload';
//import * as nonevalUtil from '@src/utils/sellcar/NonevalUtil';
//import { NONEVAL_STT } from '@src/constant/mbSlReqStt';
import { updateCancel, insertAbleRequestConsign, updateSaleProcDecide, selectNonevalCnsg, selectNonevalCnclCnsg } from '@src/actions/sellcar/NonevalSellCarAction';
import { selectSellcar } from '@src/api/sellcar/AllSellcarSearchApi';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';

// import CommonReqCancelPopup from './popup/CommonReqCancelPopup';
// import CommonSaleCancelPopup from './popup/CommonSaleCancelPopup';
// import NoneConsignPopup from './popup/NoneConsignPopup';
// import NoneDepositPopup from './popup/NoneDepositPopup';
// import NoneSaleProc1Popup from './popup/NoneSaleProc1Popup';
// import NoneSaleProc2Popup from './popup/NoneSaleProc2Popup';

/**
 * 설명 : 회원, 비회원의 셀프평가 신청 진행 처리
 * @param {Object} req 신청서 정보
 * @param {Number} activeNo 현재 처리된 스탭의 번호
 * @return {NonevalDetail}
 */
const NonevalDetail = ({ activeNo }) => {
  const dispatch = useDispatch();
  const { seller, car, nonevalCnsgInfo, nonevalCnclCnsgInfo } = useSelector((state) => state.sellCarStore, []);
  //const availEditBtn = seller.reqSttTpcd === NONEVAL_STT.PUBLIC_TEMP || seller.reqSttTpcd === NONEVAL_STT.PUBLIC_FORM_COMPLETE ? true : false;
  //const [state, setState] = useState(nonevalUtil.defaultState);
  // const [rodalCancelConfirm, setRodalCancelConfirm, cancelConfirmPopupHandler, cancelConfirmModalCloseHandler] = useRodal(false, true);
  // const [rodalSaleCancel, setRodalSaleCancel, popupSaleCancelHandler, popupSaleCancelCloseHandler] = useRodal(false, true);
  // const [rodal1, setRodal1, popupHandler1, modalCloseHandler1] = useRodal(false, true);
  // const [rodal2, setRodal2, popupHandler2, modalCloseHandler2] = useRodal(false, true);
  // const [rodal3, setRodal3, popupHandler3, modalCloseHandler3] = useRodal(false, true);
  // const [rodal4, setRodal4, popupHandler4, modalCloseHandler4] = useRodal(false, true);
  // const [dealNotifyPop4, setDealNotifyPop4, openDealNotifyPop4, closeDealNotifyPop4] = useRodal(false);
  //const [stt, setStt] = useState(seller.reqSttTpcd);
  const [stepState, setStepState] = useState({ code: '0001', stepNo: 1, stepNm: '차령정보등록', codeNm: '임시저장' });

  const { showAlert, showConfirm } = useContext(SystemContext);

  const [detailStatus, setDetailStatus] = useState([
    '임시저장', // 차량정보등록 단계
    '신청완료', // 신청완료 단계 (1차견적완료, 고객매각신청, 탁송배차, 고객취소)
    '예상견적 확인', // 예상견적 확인 단계 (입고완료, 고객취소)
    '점검완료', // 차량상태점검 단계 (점검완료)
    '최종견적완료', // 견적 완료 및 판매결정 단계 (최종견적완료, 판매결정완료)
    '매입완료' // 매입완료 및 명의이전 단계 (매입완료, 명의이전완료)
  ]);

  const nonevalCancel = () => {
    updateCancel({ reqTpcd: seller.reqTpcd, slReqId: seller.slReqId }).then((res) => {
      if (res.data.statusinfo.returncd === '000') {
        showAlert('취소처리 되었습니다.');
        Router.push('/mypage/personal/sellcar/sellCar?tabNo=2');
      } else {
        showAlert(res.data.statusinfo.returnmsg);
      }
    });
  };

  // const reqCancelPopupHandler = (e) => {
  //   e.preventDefault();
  //   setRodalCancelConfirm(true);
  // };

  // const saleCancelPopupHandler = (e) => {
  //   e.preventDefault();
  //   setRodalSaleCancel(true);
  // };

  // const consignPopupHandler = (e) => {
  //   e.preventDefault();
  //   setRodal1(true);
  // };

  // const saleProc1PopupHandler = (e) => {
  //   e.preventDefault();
  //   setRodal3(true);
  // };

  // const saleProc2PopupHandler = (e) => {
  //   e.preventDefault();
  //   // setRodal4(true);
  //   setRodal3(true);
  // };

  // const depositPopupHandler = (e) => {
  //   e.preventDefault();
  //   setRodal4(true);
  // };

  // 신청서 정보 변화 감지
  useEffect(() => {
    if (!isEmpty(seller)) {
      //setState(nonevalUtil.getState(seller));
      dispatch(selectNonevalCnsg(seller)); // 탁송 정보
      dispatch(selectNonevalCnclCnsg(seller)); // 취소 탁송 정보
      setStepState(
        produce((draft) => {
          draft.code = seller.detailcd;
          draft.stepNo = seller.detailcdStep;
          draft.stepNm = seller.detailcdNm;
          draft.codeNm = seller.detailcdNm2;
        })
      );
    }
  }, [seller]);

  const [rodalConsign, setRodalConsign, popupConsignHandler, modalCloseConsign] = useRodal(false);
  const [rodalConsignCancel, setRodalConsignCancel, popupConsignCancelHandler, modalCloseConsignCancel] = useRodal(false);

  const openConsign = useCallback((e) => {
    e.preventDefault();
    if (nonevalCnsgInfo !== null) setRodalConsign(true);
    else showAlert('현재 탁송 진행상태가 아닙니다.');
  });
  const confirmConsign = useCallback((e) => {
    e.preventDefault();
    setRodalConsign(false);
  }, []);
  const openConsignCancel = useCallback((e) => {
    e.preventDefault();
    if (nonevalCnclCnsgInfo !== null) setRodalConsignCancel(true);
    else showAlert('현재 취소 탁송 진행상태가 아닙니다.');
  });
  const confirmConsignCancel = useCallback((e) => {
    e.preventDefault();
    setRodalConsignCancel(false);
  }, []);

  console.log('seller >>>>>>>>>', seller);

  useEffect(() => {
    if (stepState) {
      const num = stepState.stepNo;
      const idx = num - 1;
      setDetailStatus(
        produce((draft) => {
          draft[idx] = stepState.codeNm;
        })
      );
    }
  }, [stepState]);

  return (
    <>
      <Steps
        type={1}
        contents={['차량정보등록', '신청완료', '예상견적 확인', '차량 상태 점검', '견적 완료 및 판매결정', '매입완료 및 명의이전']}
        statusBoxes={detailStatus}
        subContents={[
          '차량정보를 등록해주세요',
          '신청이 완료되었습니다.\n현대 글로비스 오토벨 의  예상 \n견적이  곧 제공됩니다.',
          '현대 글로비스 오토벨의 예상 견적\n산정이 완료되었습니다.\n차량 판매여부를 결정해주세요.',
          '차량상태확인/입고 후\n이상여부를 확인합니다',
          '최종 견적 산정이 완료되었습니다.\n차량 판매 여부를 결정해주세요.',
          '매입 완료로 명의이전 진행 중입니다.\n명의이전 완료 후 MMS로 등록증 발급'
        ]}
        active={stepState.stepNo}
        marginBottom={193}
      />
      <CarImageUpload modifyHref={`/sellcar/nonValue/noneValuationSellCarPicture?slReqId=${seller.slReqId}`} photoList={car.photoList} modify={stepState.stepNo === 1} />

      <CarBasicInfoEditor item={seller.car} isEditing={false} noneValuaction={true} />
      {/* 수정 */}
      {stepState.stepNo === 1 && (
        <Button
          className="fr"
          size="big"
          background="blue80"
          title="차량 정보 수정"
          width={180}
          marginTop={33}
          nextLink={true}
          href={`/sellcar/nonValue/noneValuationSellCarInfo?slReqId=${seller.slReqId}`}
        />
      )}

      <CarOptionsEditor items={seller.car.optionList} isEditing={false} addOptions={false} />
      {/* <CarAddOptionsEditor items={seller.car.optionList} item={seller.car} isEditing={false} /> */}
      {/* 삭제 */}
      <CarSpecificsEditor item={seller.car} isEditing={false} />
      <p className="tx-exp-tp3 tx-red80 fr mt16">* 실제 차량 정보와 상이할 경우 추후 견적이 달라질 수 있습니다.</p>

      {/* <CarDetailInfo /> */}
      {/* <div className="mb20">
        <CarDetailInfoEditor item={seller.car} isEditing={false} viewIsExchanged={false} />
      </div> */}
      {/* <SellerInfo /> */}
      <CarSellerInfoEditor item={seller} isEditing={false} viewResidence={false} viewAddress={true} viewAccountNo={true} viewApplyDate={true} prvBizYn={true} />
      {/* 수정 */}
      {stepState.stepNo === 1 && (
        <Button
          className="fr"
          size="big"
          background="blue80"
          title="판매자 정보 수정"
          width={180}
          marginTop={33}
          nextLink={true}
          href={`/sellcar/nonValue/noneValuationSellCarInfo?slReqId=${seller.slReqId}`}
        />
      )}

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
              {stepState.code === '0001' && <>등록이 완료되지 않았습니다.</>}
              {stepState.code === '0002' && <>신청이 완료되었습니다. 전문 평가사의 예상 견적이 곧 제공됩니다.</>}
              {stepState.stepNo > 1 && stepState.code !== '0002' && (
                <>
                  <span>
                    1차 견적 <strong>{setComma(seller.evlnPurcpric > 0 ? seller.evlnPurcpric / 10000 : 0)}</strong> 만원
                  </span>
                  {stepState.stepNo > 4 && (
                    <span>
                      2차 견적 <strong>{setComma(seller.purcpric > 0 ? seller.purcpric / 10000 : 0)}</strong> 만원
                      {/* {state.btn.estmRsn && (
                        <Button size="mid" line="gray" color="black" radius={true} title="견적 산정 사유 확인" width={150} height={40} marginLeft={32} onClick={(e) => openDealNotifyPop4(e, 'fade')} />
                      )} */}
                    </span>
                  )}
                </>
              )}
              {/* <p>DPTYPE :: {state.displayPriceType}/ {seller.reqSttTpcd}</p> */}
              {/* {state.displayPriceType === nonevalUtil.DisplayPrice.NONE && <>등록이 완료되지 않았습니다.</>}
              {state.displayPriceType === nonevalUtil.DisplayPrice.BEFORE_ESTM && <>신청이 완료되었습니다. 전문 평가사의 예상 견적이 곧 제공됩니다.</>}
              {state.displayPriceType === nonevalUtil.DisplayPrice.FRST_ESTM && (
                <span>
                  1차 견적 <strong>{setComma(seller.saleMethod.prmrEstmAmt)}</strong> 만원
                </span>
              )}
              {state.displayPriceType === nonevalUtil.DisplayPrice.SCND_ESTM && (
                <>
                  <span>
                    1차 견적 <strong>{setComma(seller.saleMethod.prmrEstmAmt)}</strong> 만원
                  </span>
                  <span>
                    2차 견적 <strong>{setComma(seller.saleMethod.scdrEstmAmt)}</strong> 만원
                    {state.btn.estmRsn && (
                      <Button size="mid" line="gray" color="black" radius={true} title="견적 산정 사유 확인" width={150} height={40} marginLeft={32} onClick={(e) => openDealNotifyPop4(e, 'fade')} />
                    )}
                  </span>
                </>
              )} */}
            </td>
          </tr>

          {/* 추가 */}
          {stepState.stepNo > 4 && (
            <tr>
              <th>산정 사유</th>
              <td>
                {seller.mathdeta !== undefined ? (
                  seller.mathdeta
                ) : (
                  <>
                    경매장 담당자가 입력한 점검내용
                    <br />* Ex) 앞 유리 깨짐 및 운전석 앞 도어 교환
                  </>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {stepState.stepNo === 6 && (
        <div className="status-wrap">
          <p>거래완료</p>
        </div>
      )}

      {stepState.stepNo === 5 && (
        <div className="status-wrap">
          {stepState.code !== '0014' && stepState.code !== '0015' && <p>신청 취소시에는 콜센터(1600-0080)으로 연락 부탁 드립니다.</p>}
          {(stepState.code === '0014' || stepState.code === '0015') && (
            <p>
              거래취소 신청
              <span>반송 탁송비 입금이후 차량 반출이 완료됩니다.</span>
            </p>
          )}
          {stepState.code === '0015' && (
            <Buttons align="center" marginTop={30}>
              <Button size="big" background="blue80" title="취소 탁송정보" width={180} marginTop={8} onClick={openConsignCancel} />
            </Buttons>
          )}
        </div>
      )}

      <Buttons align="center" marginTop={30}>
        {stepState.stepNo === 2 && stepState.code === '0002' && (
          <Button
            size="big"
            background="gray"
            title="신청취소"
            width={180}
            marginTop={8}
            buttonMarkup={true}
            onClick={() =>
              showConfirm('신청을 취소 하시겠습니까?', () => {
                nonevalCancel();
              })
            }
            // onClick={reqCancelPopupHandler}
          />
        )}
        {stepState.stepNo === 1 && (
          <Button size="big" background="blue80" title="신청정보 수정" width={180} marginTop={8} nextLink={true} href={`/sellcar/nonValue/noneValuationSellCarInfo?slReqId=${seller.slReqId}`} />
        )}
        {stepState.stepNo === 2 && (stepState.code === '0003' || stepState.code === '0004') && (
          <>
            {/* <Button size="big" background="gray" title="판매 취소" width={180} marginTop={8} onClick={saleCancelPopupHandler} /> */}
            <Button
              size="big"
              background="gray"
              title="판매 취소"
              width={180}
              marginTop={8}
              buttonMarkup={true}
              onClick={() =>
                showConfirm('판매를 취소 하시겠습니까?', () => {
                  nonevalCancel();
                })
              }
            />
            <Button
              size="big"
              background="blue80"
              title="판매 진행(탁송 신청)"
              width={180}
              marginTop={8}
              buttonMarkup={true}
              onClick={() =>
                showConfirm('차량 탁송 이후 더욱 자세한<br/>견적 산정이 진행됩니다.<br/>탁송 진행 이후 취소하시면 발생되는<br/>탁송비는 고객부담으로 처리됩니다.<br/>계속 진행하시겠습니까?', () => {
                  insertAbleRequestConsign(seller).then((res) => {
                    if (res.data.statusinfo.returncd === '000') {
                      showAlert('판매진행 신청이 완료 되었습니다.');
                      selectSellcar({ slReqId: seller.slReqId }).then((res) => {
                        if (res.data.statusinfo.returncd === '000') {
                          const data = res.data.data;
                          const car = res.data.data.car;
                          dispatch({
                            type: sellCarTypes.INIT_CAR_STATE,
                            payload: { seller: data, car } || {}
                          });
                        }
                      });
                    } else {
                      showAlert(res.data.statusinfo.returnmsg);
                    }
                  });
                })
              }
            />
          </>
        )}
        {stepState.stepNo === 2 && stepState.code === '0005' && <Button size="big" background="blue80" title="탁송 정보" width={180} marginTop={8} onClick={openConsign} />}
        {stepState.stepNo === 5 && stepState.code === '0011' && (
          <Button
            size="big"
            background="blue80"
            title="판매 진행"
            width={180}
            marginTop={8}
            buttonMarkup={true}
            onClick={() =>
              showConfirm('판매를 진행하시겠습니까?', () => {
                updateSaleProcDecide(seller).then((res) => {
                  if (res.data.statusinfo.returncd === '000') {
                    showAlert('판매진행 신청이 완료 되었습니다.');
                    selectSellcar({ slReqId: seller.slReqId }).then((res) => {
                      if (res.data.statusinfo.returncd === '000') {
                        const data = res.data.data;
                        const car = res.data.data.car;
                        dispatch({
                          type: sellCarTypes.INIT_CAR_STATE,
                          payload: { seller: data, car } || {}
                        });
                      }
                    });
                  } else {
                    showAlert(res.data.statusinfo.returnmsg);
                  }
                });
              })
            }
          />
        )}
        {/* {state.btn.nomalCancel && <Button size="big" background="gray" title="신청취소" width={180} marginTop={8} onClick={reqCancelPopupHandler} />}
        {state.btn.modify && (
          <Button size="big" background="blue80" title="신청정보 수정" width={180} marginTop={8} nextLink={true} href={`/sellcar/nonValue/noneValuationSellCarInfo?slReqId=${seller.slReqId}`} />
        )}
        {state.btn.saleCancel && <Button size="big" background="gray" title="판매 취소" width={180} marginTop={8} onClick={saleCancelPopupHandler} />}
        {state.btn.saleProccess && (
          <Button
            size="big"
            background="blue80"
            title="판매 진행(탁송 신청)"
            width={180}
            marginTop={8}
            onClick={() =>
              showConfirm('차량 탁송 이후 더욱 자세한<br/>견적 산정이 진행됩니다.<br/>탁송 진행 이후 취소하시면 발생되는<br/>탁송비는 고객부담으로 처리됩니다.<br/>계속 진행하시겠습니까?', () => {
                console.log('차량 탁송 및 점검 진행 Process');
              })
            }
          />
        )} */}
        {/* {state.btn.consignment && <Button size="big" background="blue80" title="탁송 정보" width={180} marginTop={8} onClick={openConsign} />} */}
        {/* 수정 */}
        {/* {state.btn.cancelDecide && <Button size="big" background="gray" title="판매 취소" width={180} marginTop={8} onClick={saleCancelPopupHandler} />}
        {state.btn.saleDecide && (
          <Button
            size="big"
            background="blue80"
            title="판매 진행"
            width={180}
            marginTop={8}
            onClick={() =>
              showConfirm('판매를 진행하시겠습니까?', () => {
                console.log('차량 판매 진행 Process');
              })
            }
          />
        )} */}
      </Buttons>

      {/* {seller.reqSttTpcd === NONEVAL_STT.PUBLIC_FINAL && (
        <div className="status-wrap">
          <p>
            거래 완료
            <span>차량 대금 입금내역을 확인해 보세요.</span>
            <Button size="mid" line="gray" color="black" radius={true} title="입금확인" width={114} height={40} onClick={(e) => depositPopupHandler(e, 'fade')} />
          </p>
        </div>
      )} */}

      {/* 신청서 취소 */}
      {/* <RodalPopup show={rodalCancelConfirm} type={'fade'} width={380} closedHandler={cancelConfirmModalCloseHandler} mode="normal" size="xs" isMask={false} showCloseButton={false} isButton={false}>
        <CommonReqCancelPopup self={true} seller={seller} closedHandler={cancelConfirmModalCloseHandler} />
      </RodalPopup> */}
      {/* 판매취소 처리 팝업 */}
      {/* <RodalPopup show={rodalSaleCancel} type={'slideUp'} maxWidth={800} title="판매를 취소하시겠습니까?" closedHandler={popupSaleCancelCloseHandler} size="medium" mode="normal">
        <CommonSaleCancelPopup seller={seller} closedHandler={popupSaleCancelCloseHandler} />
      </RodalPopup>
      <RodalPopup show={rodal1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="medium" title="탁송정보">
        <NoneConsignPopup consign={seller} closedHandler={modalCloseHandler1} />
      </RodalPopup>
      <RodalPopup show={rodal2} type={'fade'} width={380} closedHandler={modalCloseHandler2} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
        <NoneSaleProc1Popup slReqId={seller.slReqId} closedHandler={modalCloseHandler2} />
      </RodalPopup>
      <RodalPopup show={rodal3} type={'fade'} width={380} closedHandler={modalCloseHandler3} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
        <NoneSaleProc2Popup slReqId={seller.slReqId} closedHandler={modalCloseHandler3} />
      </RodalPopup>
      <RodalPopup show={rodal4} type={'slideUp'} closedHandler={modalCloseHandler4} mode="normal" size="small" title="입금확인">
        <NoneDepositPopup reqInfo={seller} closedHandler={modalCloseHandler4} />
      </RodalPopup>
      <RodalPopup show={dealNotifyPop4} type={'fade'} closedHandler={closeDealNotifyPop4} title="견적 산정 사유 확인" mode="normal" size="medium">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list">
                <li className="w">
                  사유
                  <Input type="tp1" disabled={true} value={seller?.saleMethod?.estmCalcRsnCdNm} />
                </li>
                <li className="w">
                  상세내용
                  <Textarea countLimit={500} type="tp1" disabled={true} height={128} data={seller?.saleMethod?.estmCalcDtlCntn} />
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button
                  size="big"
                  background="blue80"
                  title="확인"
                  width={245}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDealNotifyPop4(false);
                  }}
                />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup> */}

      {/* 추가 */}
      <RodalPopup show={rodalConsign} type={'fade'} width={380} closedHandler={modalCloseConsign} mode="normal" showCloseButton={true} isButton={true} className="rodal-consign">
        <div className="con-wrap compact">
          <h3>탁송정보</h3>
          <table summary="탁송정보 요약 정보" className="table-pi">
            <caption className="away hide">탁송정보 시간, 지역, 탁송기사, 연락처에 대한 테이블</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  시간
                  <br />
                  (탁송일시)
                </th>
                <th scope="col">지역</th>
                <th scope="col">탁송기사</th>
                <th scope="col">연락처</th>
              </tr>
            </thead>
            <tbody>
              {nonevalCnsgInfo !== null ? (
                <tr>
                  <td>{nonevalCnsgInfo?.delidt}</td>
                  <td>{nonevalCnsgInfo?.areadomanm}</td>
                  <td>{nonevalCnsgInfo?.ridenm}</td>
                  <td>010-1234-1234</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">조회가능한 탁송정보가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={confirmConsign} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalConsignCancel} type={'fade'} width={380} closedHandler={modalCloseConsignCancel} mode="normal" showCloseButton={true} isButton={true} className="rodal-consign">
        <div className="con-wrap compact">
          <h3>취소 탁송정보</h3>
          <table summary="취소 탁송정보 요약 정보" className="table-pi">
            <caption className="away hide">취소 탁송정보 시간, 지역, 탁송기사, 연락처에 대한 테이블</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  시간
                  <br />
                  (탁송일시)
                </th>
                <th scope="col">지역</th>
                <th scope="col">탁송기사</th>
                <th scope="col">연락처</th>
              </tr>
            </thead>
            <tbody>
              {nonevalCnclCnsgInfo !== null ? (
                <tr>
                  <td>{nonevalCnclCnsgInfo?.delidt}</td>
                  <td>{nonevalCnclCnsgInfo?.areadomanm}</td>
                  <td>{nonevalCnclCnsgInfo?.ridenm}</td>
                  <td>010-1234-1234</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">조회가능한 탁송정보가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={confirmConsignCancel} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

NonevalDetail.propTypes = {
  req: PropTypes.object,
  activeNo: PropTypes.number
};

export default NonevalDetail;
