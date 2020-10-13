/**
 * 마이페이지 공통 내차팔기 방문평가 신청정보 디테일
 * @fileOverview 마이페이지 공통 내차팔기 방문평가 신청정보 디테일
 * @requires sellCarAction
 * @Author 김민철
 */
import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';

import { SystemContext } from '@src/provider/SystemProvider';
import { setComma } from '@src/utils/StringUtil';
import { updateAbleVisitSellcarAction } from '@src/api/sellcar/VisitSellcarApi';

/**
 * 마이페이지 공통 내차팔기 방문평가 신청정보 디테일
 * @param {object} 신청정보
 * @param {Number} activeNo 현재 처리된 스탭의 번호
 * @return {VisitDetail}
 */
const VisitDetail = ({ req, activeNo }) => {
  const { showAlert, initAlert, showConfirm, initConfirm } = useContext(SystemContext);
  const { visitDetail } = useSelector((state) => state.sellCarStore, []);

  const reqCancelPopupHandler = (e) => {
    e.preventDefault();
    showConfirm('신청을 취소하시겠습니까?', () => {
      const params = { deciproc: '06', wgoodsno: visitDetail.wgoodsno };
      updateAbleVisitSellcarAction(params).then(({ data }) => {
        if (data.statusinfo.returncd === '000') {
          showAlert('취소 되었습니다.');
          Router.push('/mypage/personal/sellcar/sellCar');
        } else {
          showAlert('취소 실패 되었습니다.');
        }
      });
    });
  };

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    []
  );

  return (
    <>
      <Steps
        type={1}
        contents={['신청완료', '평가사 배정', '평가완료', '판매결정 및 매입진행']}
        subContents={['방문평가 신청이\n완료되었습니다.', '담당 평가사가\n배정되었습니다.', '고객님께 방문하여\n차량 확인 후 견적안내를\n도와드립니다.', '차량 판매 여부를\n결정해주세요.']}
        active={activeNo}
        marginBottom={193}
      />
      <div className="car-info">
        {/* <div className="img-wrap">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="홈서비스 차량 이미지" /> : <i className="ico-car" />}</div> */}
        <table summary="차량 정보에 대한 내용" className="table-tp1 th-c td-c">
          <caption className="sml">
            차량명
            {isEmpty(visitDetail) ? <span>평가사가 방문 후에 확인 가능합니다.</span> : <span>{visitDetail.carnm}</span>}
          </caption>
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량번호</th>
              <td>{visitDetail?.carno ? visitDetail.carno : '차량번호 불명'}</td>
              <th>연료</th>
              <td>{visitDetail?.fuelcdnm}</td>
            </tr>
            <tr>
              <th>연식</th>
              <td>{visitDetail?.year}</td>
              <th>배기량</th>
              <td>{visitDetail?.exha ? setComma(visitDetail?.exha) + 'cc' : ''}</td>
            </tr>
            <tr>
              <th>주행거리</th>
              <td>{visitDetail?.carregitravdist ? setComma(visitDetail?.carregitravdist) + 'km' : ''}</td>
              <th>차종</th>
              <td>{visitDetail?.cartypenm}</td>
            </tr>
            <tr>
              <th>변속기</th>
              <td>{visitDetail?.misscdnm}</td>
              <th>색상</th>
              <td>{visitDetail?.coloupcdnm}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-wrapper">
        <div className="table-wrap-left">
          <table summary="차량 견적에 대한 내용" className="table-tp1 th-c">
            <caption>차량 매입 가격</caption>
            <colgroup>
              <col width="22%" />
              <col width="78%" />
            </colgroup>
            <tbody>
              <tr>
                <th>매입금액</th>
                <td>
                  {visitDetail.deciproc === '06'
                    ? `매입 취소`
                    : activeNo < 3 && visitDetail.evalproc !== '03'
                    ? `평가사가 방문 후에 확인 가능합니다.`
                    : activeNo > 3 && visitDetail.deciproc === '03'
                    ? '매입진행'
                    : `평가완료 (평가일 : ${moment(visitDetail?.delihopedth1).format('YYYY-MM-DD')})`}
                </td>
                {/* <td>{activeNo >= 3 ? `${setComma(visitDetail?.starpric)} 만원` : `평가사가 방문 후에 확인 가능합니다.`}</td> */}
              </tr>
            </tbody>
          </table>
          <p className="tx-exp-tp4" style={{ fontSize: '15px', marginTop: '15px', marginBottom: '30px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;※ 평가사에게 받은 견적은 일주일 이내에만 유효합니다.
          </p>

          <table summary="담당 평가사에 대한 내용" className="table-tp1 th-c">
            <caption>담당 평가사</caption>
            <colgroup>
              <col width="22%" />
              <col width="78%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{activeNo >= 2 ? visitDetail?.entrinformannm : '평가사 배정 후에 확인 가능합니다.'}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{activeNo >= 2 ? visitDetail?.entrinformanhpno : '평가사 배정 후에 확인 가능합니다.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap-right">
          <table summary="계약자 정보에 대한 내용" className="table-tp1 th-c" style={{ height: 'auto' }}>
            <caption>계약자 정보</caption>
            <colgroup>
              <col width="30%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>명의자</th>
                <td className="tx-black">{visitDetail?.nm}</td>
              </tr>
              <tr>
                <th>휴대폰 번호</th>
                <td className="tx-black">{visitDetail?.hpno}</td>
              </tr>
              <tr>
                <th>거주 지역</th>
                <td className="tx-black">
                  {visitDetail?.accoAddr1}&nbsp;{visitDetail?.accoAddr2}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Buttons align="right" marginTop={30}>
        {visitDetail.counselcode !== '40' && visitDetail.deciproc !== '06' && (
          <Button size="big" background="gray" title="신청취소" width={180} marginTop={8} onClick={reqCancelPopupHandler} className="step-btn-c" />
        )}
        <Button size="big" background="blue80" title="목록으로" width={180} marginTop={8} href={'sellCar'} />
      </Buttons>
      {/* 신청서 취소
      <RodalPopup show={rodalCancelConfirm} type={'fade'} width={380} closedHandler={cancelConfirmModalCloseHandler} mode="normal" size="xs" isMask={false} showCloseButton={false} isButton={false}>
        <CommonReqCancelPopup popupOpen={reqCancelPopup} seller={visitDetail} visit={true} closedHandler={cancelConfirmModalCloseHandler} />
      </RodalPopup> */}
    </>
  );
};

VisitDetail.propTypes = {
  activeNo: PropTypes.number
};

export default VisitDetail;
