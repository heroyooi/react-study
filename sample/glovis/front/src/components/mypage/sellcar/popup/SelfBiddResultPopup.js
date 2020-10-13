/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * 내차팔기 셀프평가 입찰결과 팝업 정보
 * @fileoverview 내차팔기 셀프평가 입찰결과 팝업 정보
 * @author 김민철
 */

import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
// import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import SelectBox from '@lib/share/items/SelectBox';
import StarScore from '@lib/share/items/StarScore';
import { SystemContext } from '@src/provider/SystemProvider';
import SellCarInfo from '../sub/SellCarInfo';
import { updateBiddChoiceAction, updateRestartAction } from '../../../../actions/sellcar/SelfSellCarAction';
import SelfDealerInfoPopup from './SelfDealerInfoPopup';
import * as api from '../../../../api/sellcar/AllSellcarSearchApi';
import { progressState } from '@src/utils/sellcar/CmprEstmUtil';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import { setComma } from '@src/utils/StringUtil';
import { imgUrl } from '@src/utils/HttpUtils';

/**
 * 내차팔기 셀프평가 입찰결과 팝업 정보
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {Object} req 신청서 정보
 * @Param {callback} cancelHandler 취소버튼 처리 핸들러
 * @Param {callback} procSaleHandler 판매진행 처리 핸들러
 * @Param {callback} dealerInfoHandler 딜러 정보 보기 핸들러
 * @Param {bool} availSaleProcBtn 판매진행버튼 사용유무
 * @Param {bool} availBiddRestartBtn 다시 견적 받기사용유무
 * @returns {SelfBiddResultPopup}
 */
const SelfBiddResultPopup = ({ seller = {}, car = {}, cmprEstm = {}, cancelHandler, closedHandler }) => {
  const dispatch = useDispatch();
  const cmprEstmState = progressState(cmprEstm);
  const [selectedBiddId, setSelectedBiddId] = useState(0);
  const [biddList, setBiddList] = useState([]);
  const [dlrId, setDlrId] = useState(undefined);
  const [dealer, setDealer] = useState({});
  const [rodalRestartConfirm, setRodalRestartConfirm, restartConfirmPopupHandler, restartConfirmModalCloseHandler] = useRodal(false, true);
  const [rodalDealerInfo, setRodalDealerInfo, dealerInfoPopupHandler, dealerInfoModalCloseHandler] = useRodal(false, true);
  const { showAlert, showConfirm } = useContext(SystemContext);
  const [updateComplete, setUpdateComplete] = useState(false);

  const _cancelHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
    if (cancelHandler) {
      cancelHandler(e);
    }
  };

  const _biddSelectHandler = (e) => {
    console.log(e.target.value);
    setSelectedBiddId(parseInt(e.target.value));
  };

  // 판매진행 버튼 핸들러
  const _saleProcHandler = (e) => {
    e.preventDefault();
    if (selectedBiddId === 0) {
      showAlert("딜러를 선택해주세요.");
    } else {
      showConfirm("판매를 진행하시겠습니까?",
      ()=>{
        // 확인버튼 이벤트
        procSaleHandler(selectedBiddId);
      });
    }
  };

  // 판매진행
  const procSaleHandler = async (selectedBiddId) => {
    const params = {
      slReqId: seller.slReqId,
      hh24AuctId: cmprEstm.hh24AuctId,
      dlrBiddNo: selectedBiddId
    };
    const success = await dispatch(updateBiddChoiceAction(params));
    if (success) {
      // 이후 닫기
      await dispatch(getReqAction(params.slReqId));
      showAlert('완료되었습니다.', () => {
        // 내용리로딩
        closedHandler(false);
      });
    } else {
      showAlert('판매진행에 문제가 생겼습니다.');
    }
  };

  const cmprRestartPopupHandler = async (e) => {
    e.preventDefault();
    setRodalRestartConfirm(true);
  };

  const cmprRestartHandler = async (e) => {
    e.preventDefault();
    restartConfirmModalCloseHandler(false);
    const params = {
      slReqId: seller.slReqId
    };
    const success = await dispatch(updateRestartAction(params));
    if (success) {
      restartConfirmModalCloseHandler(false);
      closedHandler(false);
      showAlert('완료되었습니다.');
    } else {
      restartConfirmModalCloseHandler(false);
      // showAlert('에러가 발생햇습니다..');
    }
  };

  // 딜러 정보 보기 버튼 핸들러
  const _dealerInfoPopupHandler = async (dlrId) => {
    api
      .selectDealerDetail({ dlrId })
      .then((res) => {
        console.log(res);
        if (res.data.statusinfo.returncd === '000') {
          setDealer(res.data.data);
          setRodalDealerInfo(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect( () => {
    // 딜러 목록 조회
    api.selectBiddDealerList({ slReqId: seller.slReqId })
       .then( res => {
         const { data, statusinfo } = res.data;
         if(statusinfo.returncd === '000'){
          setBiddList(data);
         }
       });
  }, [cmprEstm]);

  return (
    <>
      <div className="con-wrap popup-bidding-inquiry">
        <SellCarInfo car={car} photoList={car.photoList} />
        <div className="bidding-inquiry">
          <ul>
            <li>
              { cmprEstmState.code === 'progress' && <p className="time none">진행중입니다.</p> }
              { cmprEstmState.code === 'end' && <p className="time none">종료되었습니다.</p> }
              { cmprEstmState.code === 'succBidd' && <p className="time none">낙찰되었습니다.</p> }
            </li>
            <li>
              입찰자수
              <p className="price-tp7">
                {cmprEstm.biddDrlCnt} <span className="won">명</span>
              </p>
            </li>
            <li>
              현재 최고가
              <p className="price-tp7">
                {setComma(cmprEstm.maxAmt)} <span className="won"> 만원</span>
              </p>
            </li>
          </ul>
        </div>
        {!isEmpty(biddList) && (
          <div className="list-wrap">
            <div className="list-tit">
              <h4>
                딜러선택<span>판매를 원하는 입찰자를 선택해주세요.</span>
              </h4>
            </div>
            <div className="admin-list tp6">
              <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                <caption className="away">결제내역</caption>
                <colgroup>
                  <col width="10%" />
                  <col width="15%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="25%" />
                  <col width="20%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>사진</th>
                    <th>딜러명</th>
                    <th>지역</th>
                    <th>평점/평가 등급</th>
                    <th>입찰가격</th>
                  </tr>
                </thead>
                <tbody>
                  {biddList.map((bidd, idx) => (
                      <tr key={idx}>
                        <td>
                          <Radio className="simple" id={`dlrBiddNo-${bidd.dlrBiddNo}`} value={bidd.dlrBiddNo} title="" checked={selectedBiddId} disabled={false} onChange={_biddSelectHandler} />
                        </td>
                        <td>
                          <div className="img-cover">
                            <img src={(bidd.phtUrl)?imgUrl+bidd.phtUrl:'/images/ico/ico-dealer-none.svg'} alt="프로필 없음 이미지" />
                          </div>
                        </td>
                        <td>
                          {/* <Link href="#"> */}
                            <a onClick={(e) => { e.preventDefault(); _dealerInfoPopupHandler(bidd.mbId);}}>
                              {bidd.mbNm} 딜러
                            </a>
                          {/* </Link> */}
                        </td>
                        <td>{bidd.locNm}</td>
                        <td>
                          {bidd.psAvg}
                          <br />
                          <StarScore grade={bidd.psAvg} />
                        </td>
                        <td className="price">
                          {setComma(bidd.biddAmt)}
                          <span>만원</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p className="tx-exp-tp5">
                &#8251; 입찰자 이름과 연락처는 공정한 거래를 위해 일부만 공개되며,
                <br />
                입찰자를 선택하신 후 판매를 진행하시면 이름과 연락처를 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        )}
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="판매취소" width={172} height={60} onClick={_cancelHandler} />
          { isEmpty(biddList)
            ?
            <Button size="big" background="blue80" title="다시 견적 받기" width={172} height={60} marginTop={8} onClick={cmprRestartPopupHandler} />
            :
            <Button size="big" background="blue80" title="판매진행" width={172} height={60} onClick={_saleProcHandler} />
          }
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
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={cmprRestartHandler} />
            <Button
              size="sml"
              background="gray"
              radius={true}
              title="취소"
              width={68}
              onClick={(e) => {
                e.preventDefault();
                restartConfirmModalCloseHandler(false);
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>

      {/* 딜러 정보 팝업 */}
      <RodalPopup show={rodalDealerInfo} type={'slideUp'} title="입찰자 정보" closedHandler={dealerInfoModalCloseHandler} mode="normal" size="large">
        <SelfDealerInfoPopup dealer={dealer} />
      </RodalPopup>
    </>
  );
};

SelfBiddResultPopup.propTypes = {
  seller: PropTypes.object,
  car: PropTypes.object,
  cmprEstm: PropTypes.object,
  cancelHandler: PropTypes.func,
  closedHandler: PropTypes.func
};

export default SelfBiddResultPopup;
