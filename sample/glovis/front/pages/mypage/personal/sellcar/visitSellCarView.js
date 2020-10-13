/**
 * 회원 마이페이지 내차팔기 신청정보 디테일
 * @fileOverview 회원 마이페이지 내차팔기 신청정보 디테일
 * @requires VisitDetail
 * @requires SelfDetail
 * @requires NonevalDetail
 * @Author 김민철
 */

import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import VisitDetail from '@src/components/mypage/sellcar/VisitDetail';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { REQ_STT, REQ_TPCD, VISIT_STT } from '@src/constant/mbSlReqStt';
import { selectSellcarAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateAccountAction, visitCancelAction } from '@src/actions/sellcar/VisitSellCarAction';
import { setComma } from '@src/utils/StringUtil';
import { isLogin } from '@src/utils/LoginUtils';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';
import { selectVisitDetail, updateAbleVisitSellcarAction } from '@src/api/sellcar/VisitSellcarApi';

/**
 * 마이페이지 내차팔기 신청정보 디테일
 * @param {Object} props
 * @param {Object} props - props object
 * @param {String} props.slReqId - 판매 신청서 아이디
 * @returns {SellCarView}
 */

const VisitSellCarView = ({ slReqId, reqTpcd, wgoodsno }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert, showConfirm, initConfirm } = useContext(SystemContext);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '방문평가 신청 내역',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 8,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isLogin()) {
      location.href = '/login';
    }
    //dispatch(getReqAction(slReqId));
    if (reqTpcd === '00001') {
      selectVisitDetail({ wgoodsno: wgoodsno }).then(({ data }) => {
        console.log('visitDetail >>>', data);

        if (data.statusinfo.returncd === '000') {
          const visitDetail = data.data[0];
          dispatch({
            type: sellCarTypes.INIT_VISIT_DETAIL,
            payload: visitDetail
          });
        } else {
          dispatch({
            type: sellCarTypes.INIT_VISIT_DETAIL,
            payload: {}
          });
        }
      });
    }
  }, []);

  const { visitDetail } = useSelector((state) => state.sellCarStore, []);
  const [callReq, setCallReq] = useState(false);
  const [activeNo, setActiveNo] = useState(0);

  //신청서 번호에 따른 판매자 정보와 판매차량정보를 가져올수있도록 하는 dispatch
  useEffect(() => {
    dispatch(getReqAction(slReqId));
  }, []);

  /**
   * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
   */
  useEffect(() => {
    if (!callReq) {
      setCallReq(true);
      dispatch(getReqAction(slReqId));
    }
  }, [callReq, dispatch, slReqId]);

  // 신청취소
  const actionMap = {};
  actionMap[REQ_TPCD.VISIT] = visitCancelAction;

  //신청취소 팝업창 확인 누르면 취소하는 핸들러
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

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  console.log('방문평가 : ', visitDetail);
  console.log('activeNo : ', activeNo);

  useEffect(() => {
    if (!isEmpty(visitDetail) && reqTpcd === '00001') {
      let active = 0;
      if (visitDetail.counselcode !== '40') active = 1;
      else if (visitDetail.counselcode === '40' && visitDetail.evalproc === '01') active = 2;
      else if (visitDetail.evalproc !== '01' && (visitDetail.deciproc === '01' || visitDetail.deciproc === '02')) active = 3;
      else active = 4;
      setActiveNo(active);
    }
  }, [reqTpcd, visitDetail]);

  // 신청현황 출력
  const [sttTitle, setSttTitle] = useState('신청완료');
  useEffect(() => {
    if (activeNo === 1) setSttTitle('1. 신청완료');
    if (activeNo === 2) setSttTitle('2. 평가사 배정');
    if (activeNo === 3) setSttTitle('3. 평가완료');
    if (activeNo === 4) setSttTitle('4. 판매결정 및 매입진행');
  }, [activeNo]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="general-sell-sec">
          {isEmpty(visitDetail) ? (
            <p className="ask-tx">
              평가사 배정 후에 차량 정보를
              <br />
              확인하실 수 있습니다.
            </p>
          ) : (
            <ul className="admin-list-wrap">
              <li style={{ padding: '10px 0' }}>
                {visitDetail.carnm}
                {/* 방문평가 SB 수정사항 반영 */}
                {/* <div className="goods-list admin-list tp4">
                  <ul>
                    <li>
                      <span>
                        <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                        <div className="summary">
                          <h5 className="subject">
                            {car?.crMnfcCdNm} {car?.crDtlMdlCdNm} {car?.crClsCdNm} {car?.crDtlClsCdNm}
                          </h5>
                          <div className="info-wrap">
                            <div className="info">
                              <span>{car?.crNo}</span>
                              <span>{car?.frmYyyy}</span>
                              <span>{car?.drvDist}</span>
                            </div>
                          </div>
                        </div>
                      </span>
                    </li>
                  </ul>
                </div> */}
              </li>
            </ul>
          )}

          <div className="table-area">
            <ul className="m-toggle-list up-blue fs16">
              <MenuItem>
                <MenuTitle>
                  진행현황<span>{sttTitle}</span>
                </MenuTitle>
                <MenuCont>
                  {/* 현재 상태 코드를 불러와서 각각의 리스트 출력하도록 작업 */}
                  <ul className="pay-detail">
                    <li className={activeNo === 1 ? 'tx-blue80' : ''}>
                      <span className="title">1.신청완료</span>
                      <span className="sub">
                        방문평가 신청이
                        <br />
                        완료되었습니다.
                      </span>
                    </li>
                    <li className={activeNo === 2 ? 'tx-blue80' : ''}>
                      <span className="title">2.평가사 배정</span>
                      <span className="sub">
                        담당 평가사가
                        <br />
                        배정되었습니다.
                      </span>
                    </li>
                    <li className={activeNo === 3 ? 'tx-blue80' : ''}>
                      <span className="title">3.평가 완료</span>
                      <span className="sub">
                        고객님께 방문하여
                        <br />
                        차량 확인 후 견적안내를 도와드립니다.
                      </span>
                    </li>
                    <li className={activeNo === 4 ? 'tx-blue80' : ''}>
                      <span className="title">4. 판매결정 및 매입진행</span>
                      <span className="sub">차량 판매 여부를 결정해주세요.</span>
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul>
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2 fl">차량 정보</h4>
                  {visitDetail.counselcode !== '40' && visitDetail.deciproc !== '06' && (
                    <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} onClick={reqCancelPopupHandler} />
                  )}
                </div>
                {/* 평가사 배정정보에 따른 정보 출력부분 */}
                {isEmpty(visitDetail) ? (
                  <p className="list-none">평가사가 배정 후에 확인 가능합니다.</p>
                ) : (
                  <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 기본정보</caption>
                    <colgroup>
                      <col width="27%" />
                      <col width="24%" />
                      <col width="23.5%" />
                      <col width="25.5%" />
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
                )}
              </li>
              <li>
                <h4 className="tit2 mb16">차량 매입 가격</h4>
                <table summary="차량 견적에 대한 내용" className="table-tp1">
                  <caption className="away">차량 매입 가격</caption>
                  <colgroup>
                    <col width="32%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>매입 금액</th>
                      {/* <td className={activeNo >= 3 ? 'tx-blue80' : 'tx-lg'}>
                        {visitDetail.deciproc === '04' ? '매입 취소' : activeNo >= 3 ? `${setComma(visitDetail?.starpric)} 만원` : `평가사가 방문 후에 확인 가능합니다.`}
                      </td> */}
                      <td>
                        {visitDetail.deciproc === '06'
                          ? `매입 취소`
                          : activeNo < 3 && visitDetail.evalproc !== '03'
                          ? `평가사가 방문 후에 확인 가능합니다.`
                          : activeNo > 3 && visitDetail.deciproc === '03'
                          ? '매입진행'
                          : `평가완료 (평가일 : ${moment(visitDetail?.delihopedth1).format('YYYY-MM-DD')})`}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="tx-red80 mt10">* 평가사에게 받은 견적은 일주일 이내에만 유효합니다.</p>
              </li>
              <li>
                <h4 className="tit2 mb16">담당 평가사</h4>
                {activeNo < 2 ? (
                  <p className="list-none">평가사 배정 후에 확인 가능합니다.</p>
                ) : (
                  <table summary="담당 평가사 정보에 대한 내용" className="table-tp1">
                    <caption className="away">담당 평가사</caption>
                    <colgroup>
                      <col width="32%" />
                      <col width="*" />
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
                )}
              </li>
              <li>
                <h4 className="tit2 mb16">계약자 정보</h4>
                <table summary="계약자 정보에 대한 내용" className="table-tp1">
                  <caption className="away">계약자 정보</caption>
                  <colgroup>
                    <col width="32%" />
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
              </li>
            </ul>
          </div>
        </div>
      </AppLayout>
    );
  }

  //============================================= 모바일 끝 =================================

  const { seller } = useSelector((state) => state.sellCarStore, []);
  // const [callReq, setCallReq] = useState(false);
  // const [activeNo, setActiveNo] = useState(0);

  useEffect(() => {
    dispatch(getReqAction(slReqId));
  }, []);

  /**
   * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
   */
  useEffect(() => {
    // if (isEmpty(reqList)) {
    //   Router.back();
    // }

    if (!callReq) {
      setCallReq(true);
      const params = {
        slReqId
      };

      dispatch(selectSellcarAction(params));
    }
  }, [callReq, dispatch, slReqId]);

  /**
   * req(판매신청)정보도 변경이 되었을 경우 activeNo(진행상태 값)도 변경이 되었을 수 있기 때문에 처리
   */
  useEffect(() => {
    if (!isEmpty(seller)) {
      setActiveNo(REQ_STT[seller.reqTpcd]?.STATE[seller.reqSttTpcd]?.STEPNO);
    }
  }, [seller]);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title">
            <h3 className="border-none">내차 팔기 현황 상세 {seller.reqSttTpcd}</h3>
            <div className="sub-tit-wrap">
              <p>{seller.reqTpcdNm} 판매로 신청하신 내역입니다.</p>
            </div>
          </div>
          <VisitDetail req={seller} activeNo={activeNo} />
        </div>
      </div>
    </AppLayout>
  );
};

/**
 * 설명 : 페이지 렌더링 하기전에 url query로 넘어오는 값을 추출
 * @return {String} slReqId : 판매 신청서 아이디
 */
VisitSellCarView.getInitialProps = async (http) => {
  const { req, query } = http;
  const slReqId = req ? req.query.slReqId : query.slReqId;
  const reqTpcd = req ? req.query.reqTpcd : query.reqTpcd;
  const wgoodsno = req ? req.query.wgoodsno : query.wgoodsno;
  return {
    slReqId,
    reqTpcd,
    wgoodsno
  };
  // return {};
};

VisitSellCarView.propTypes = {
  slReqId: PropTypes.string,
  reqTpcd: PropTypes.string,
  wgoodsno: PropTypes.string
};

export default VisitSellCarView;
