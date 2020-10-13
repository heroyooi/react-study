import React, { memo, useState, useCallback, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { console } from 'globalthis/implementation';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLiveRefund from '@src/components/common/MobLiveRefund';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectList from '@lib/share/items/MobSelectList';
import PageNavigator from '@src/components/common/PageNavigator';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import PopUpShotReservation from '@src/components/mypage/dealer/DealerProdList/popUpShotReservation';
import { CMCDTPID } from '@src/constant/cdMstLib';
import { numberFormat, objIsEmpty } from '@src/utils/CommonUtil';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { getLiveRsvtList } from '@src/actions/mypage/dealer/photographAppointmentAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import * as listActions from '@src/actions/mypage/dealer/dealerProdListAction';
import RenderHelper from '@lib/share/render/helper';

const LiveShotAppointment = memo(({ isReserve, paymentInfo,memberInfo }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);
  const liveRsvtList = useSelector((state) => state.lvRsvt.liveRsvtList);
  const pageSize = useSelector((state) => state?.lvRsvt?.pageinfo?.pageSize);
  const currentPage = useSelector((state) => state?.lvRsvt?.pageinfo?.currentPageNo);
  const recordCountPerPage = useSelector((state) => state?.lvRsvt?.pageinfo?.recordCountPerPage);
  const totalRecordCount = useSelector((state) => state?.lvRsvt?.pageinfo?.totalRecordCount);

  const [refundPopupShow, setRefundPopupShow, openRefundPopup, closeRefundPopup] = useRodal(false, true);
  const [shotReservePopupShow, setShotReservePopupShow, openShotReservePopup, closeShotReservePopup] = useRodal(false);
  const [cancelPop, setCancelPopShow, openCancelPop, closeCancelPop] = useRodal(false, true);
  const [selectId, setSelectId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStudioStt, setSelectedStudioStt] = useState(null);
  const [payment, setPayment] = useState([]);
  const [studioStt, setStudioStt] = useState([]);
  const [payTpcd, setPayTpcd] = useState('');
  const [liveStt, setLiveStt] = useState('');
  const [fpRefund, setFpRefund] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [mobLiveRsvtList, setMobLiveRsvtList] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const mobCurrentPage = useRef(1);
  const dealerProdList = useSelector((rootStore) => rootStore.dealerProdList);
  const { member } = dealerProdList
  const { siMbId, periodDt } = member ?? {}

  const [ isRestrained, setIsRestrained ] = useState(() => {

    console.log("ProdFilterTab -> siMbId", siMbId)
    console.log("ProdFilterTab -> periodDt", periodDt)
    
    const periodDay = moment(periodDt)
    const toDay = moment(new Date())

    return siMbId?.toLowerCase() !== 'n' && (periodDay.diff(toDay, 'day') >= 0)
  });

  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '취소/환불 안내',
          options: ['close']
        }
      });
      setFpRefund(true);
    },
    [dispatch]
  );

  const handlePayChange = (e) => {
    setPayTpcd(e.cdId);
  };

  const handleStuditoSttChange = (e) => {
    setLiveStt(e.value);
  };

  const handlePaymentChanged = useCallback((e, deps) => {
    setSelectedPayment(deps);
    setPayTpcd(deps.cdId);
  }, []);

  const handleStudioSttChanged = useCallback((e, deps) => {
    setSelectedStudioStt(deps);
    setLiveStt(deps.cdId);
  }, []);

  const onSearchClick = (e) => {
    e.preventDefault();
    dispatch(getLiveRsvtList({ useServiceType: '0020', payTpcd, liveStt, pageNo: 1 }));
  };

  const pageChangeHandler = (e, page) => {
    dispatch(getLiveRsvtList({ useServiceType: '0020', payTpcd, liveStt, pageNo: page }));
  };

  const onCancel = (e, val) => {
    e.preventDefault();
    setSelectId(val);
    openCancelPop(e, 'fade');
  };

  const onClickCancel = async () => {
    const rsvtId = selectId;
    showLoader();
    const { statusinfo } = await dealerProdApi.cancelLiveRsvtInfo({ rsvtId, useServiceType: '0020' }).then((res) => res?.data);
    if (statusinfo?.returncd === '000') {
      hideLoader();
      showAlert('취소 처리 되었습니다.');
      dispatch(getLiveRsvtList({ useServiceType: '0020', payTpcd, liveStt, pageNo: 1 }));
      closeCancelPop();
    } else {
      hideLoader();
      showAlert(statusinfo?.returnmsg);
    }
  };

  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      console.log('liveShotAppointment.onScroll', pageSize, totalRecordCount, mobLiveRsvtList.length);
      if (totalRecordCount <= (mobLiveRsvtList?.length || 0)) return;

      setLoadingFlag(false);
      setIsLoadingImage(true);
      mobCurrentPage.current++;
      pageChangeHandler(null, mobCurrentPage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag, mobLiveRsvtList, dispatch, mobCurrentPage]);

  useEffect(() => {
    setLoadingFlag(true);
    if (liveRsvtList) {
      setMobLiveRsvtList(mobLiveRsvtList.concat(liveRsvtList));
    }
    setIsLoadingImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveRsvtList]);

  useEffect(() => {
    if (hasMobile && !isReserve) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile && !isReserve) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMobile, onScroll, mobLiveRsvtList]);

  useEffect(() => {
    if(isRestrained){
      showAlert(`현재 ${periodDt}까지 이용제한된 회원입니다`)
    }
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: isReserve ? 'Live Shot 촬영 예약' : 'Live Shot 촬영 예약 현황',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: isReserve ? 80 : 24,
          color: '#fff'
        }
      });

      if (isReserve) {
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
    }

    if (!isReserve) {
      getCommonCodeAsync(CMCDTPID.payment).then((codeList) => setPayment(codeList));
      getCommonCodeAsync(CMCDTPID.liveShotStt).then((liveShotStt) => {
        setStudioStt(liveShotStt);
      });

      // axiosGet(`/api/commonCodeEnum/selectList.do?cmCdTpId=lvshotSttcd`, null).then((payload) => {
      //   setStudioStt(payload.data.data);

      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    if (isReserve) {
      return (
        <AppLayout>
          <PopUpShotReservation hasMobile={true} paymentInfo={paymentInfo} />
        </AppLayout>
      );
    }
    return (
      <AppLayout>
        <div className="mypage-state-sec dealer-live-sec pt20">
          <div className="mypage-admin-title pdside20">
            <p className="tx-exp-tp5">&#8251; 접수가 완료된 예약은 변경이 불가합니다.</p>
            <p className="tx-exp-tp5">&#8251; 차량 광고가는 예약시 광고가이며, 차량 광고 후 변경되는 금액는 반영되지 않습니다.</p>
            <p className="tx-exp-tp5">
              &#8251; 예약 취소는 웹사이트 및 지점에서 가능하며, 취소요구시 위약금이 발생될 수 있습니다.
              <Button size="sml" color="gray" title="자세히보기" marginLeft={20} onClick={handleFullpagePopup} />
            </p>
            <Buttons align="center" marginTop={24} marginBottom={16}>
              <Button
                size="mid"
                background="blue20"
                color="blue80"
                radius={true}
                title="Live Studio 예약"
                fontWeight={500}
                width={48}
                height={38}
                measure={'%'}
                href="/mypage/dealer/sellcar/photographAppointment?type=reg"
                nextLink={true}
              />
              <Button
                size="mid"
                background="blue80"
                radius={true}
                title="Live Shot 예약"
                fontWeight={500}
                width={48}
                height={38}
                measure={'%'}
                marginLeft={4}
                mgMeasure={'%'}
                href="/mypage/dealer/sellcar/liveShotAppointment?type=reg"
              />
            </Buttons>
          </div>

          <ul className={objIsEmpty(liveRsvtList) === true ? 'm-toggle-list search pdside20' : 'm-toggle-list search pdside20'}>
            <MenuItem>
              <MenuTitle>
                Live Shot 촬영 예약 현황<span>상세조회</span>
              </MenuTitle>
              <MenuCont>
                <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="72%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>결제수단</th>
                      <td>
                        <MobSelectList
                          selectedItem={selectedPayment}
                          itemsSource={payment}
                          displayMemberPath={'label'}
                          selectedValuePath={'value'}
                          placeHolder="선택"
                          onClick={handlePaymentChanged}
                          width="100%"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>진행상태</th>
                      <td>
                        <MobSelectList
                          selectedItem={selectedStudioStt}
                          itemsSource={studioStt}
                          displayMemberPath={'label'}
                          selectedValuePath={'value'}
                          placeHolder="선택"
                          onClick={handleStudioSttChanged}
                          width="100%"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} onClick={onSearchClick} />
              </MenuCont>
            </MenuItem>
          </ul>
        </div>
        <div className="content-wrap content-border pt8">
          {objIsEmpty(mobLiveRsvtList) === true ? (
            <div className="list-none-wrap">
              <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="goods-list admin-list tp6">
              <ul>
                {(mobLiveRsvtList || []).map((data, idx) => (
                  <React.Fragment key={idx}>
                    <li>
                      <div className="summary">
                        <ul className="date">
                          <li>
                            {moment(data.reqDt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}
                            <span className="time">{moment(data.reqDt, 'YYYY-MM-DD HH:mm:ss').format('HHmm') === '0000' ? '오전' : '오후'}</span>
                          </li>
                          <li className="state">{data.lvShotSttCdNm}</li>
                        </ul>
                        <div className="float-wrap mt10">
                          <h5 className="subject mt0">{data.crNo}</h5>
                          <p className="price-tp9">
                            {numberFormat(data.payAmt === 'null' ? 0 : Math.ceil(data.payAmt / 10000))}
                            <span className="won tx-black">만원</span>
                          </p>
                        </div>
                        <div className="info-wrap mt16">
                          <div className="info">
                            <span>{data.locNm}</span>
                            {data.payYn === 'Y' ? <span>(입금완료)</span> : null}
                            {data.lvShotSttCd === '0010' ? (
                              <span>
                                <Button size="sml" line="gray" radius={true} title="예약취소" width={62} marginTop={3} buttonMarkup={true} onClick={(e) => onCancel(e, data.rsvtId)} />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              {isLoadingImage === true ? (
                <div className="more-loading">
                  <PulseLoader size={15} color={'#ddd'} loading={true} />
                </div>
              ) : null}
            </div>
          )}
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={24}>
          {fpRefund && <MobLiveRefund />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-live-sec">
          <div className="top-banner">
            <p>
              Live Shot 촬영을
              <br />
              예약하세요.
            </p>
            <div className="btn-wrap">
              <Button size="full" line="white" color="white" radius={true} title="Live Shot란?" marginTop={19} href="/mypage/dealer/sellcar/photographAppointmentIndex" />
              <Button size="full" line="white" color="white" radius={true} title="예약하기" marginTop={16} buttonMarkup={true} onClick={(e) => {
                console.log("LiveShotAppointment -> isRestrained", isRestrained)
                if(isRestrained){
                  showAlert(`현재 ${periodDt}까지 이용제한된 회원입니다`)
                } else {
                  openShotReservePopup(e, 'fade')
                }
              }} />
            </div>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>결제수단</th>
                  <td>
                    <SelectBox id="select1" className="items-sbox" options={payment} width={176} value={payTpcd} onChange={(e) => handlePayChange(e)} />
                    <span className="title">상태</span>
                    <SelectBox id="select1" className="items-sbox" options={studioStt} width={176} value={liveStt} onChange={(e) => handleStuditoSttChange(e)} />
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} className="fr" buttonMarkup={true} onClick={onSearchClick} />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-tp1 th-c td-c" summary="예약리스트에 대한 내용">
              <caption className="away">예약리스트</caption>
              <colgroup>
                <col width="6%" />
                <col width="17%" />
                <col width="12%" />
                <col width="19%" />
                <col width="19%" />
                <col width="17%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>예약 일시</th>
                  <th>신청장소</th>
                  <th>차량번호</th>
                  <th>결제금액</th>
                  <th>결제수단</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(liveRsvtList) &&
                  liveRsvtList.map((data, idx) => (
                    <>
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          {moment(data.reqDt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}
                          <br />
                          {moment(data.reqDt, 'YYYY-MM-DD HH:mm:ss').format('HHmm') === '0000' ? '오전' : '오후'}
                        </td>
                        <td>{data.locNm}</td>
                        <td>{data.crNo}</td>
                        <td>{numberFormat(data.payAmt === 'null' ? 0 : data.payAmt)}</td>
                        <td>
                          {data.payTpNm}
                          <br />
                          {data.payYn === 'Y' ? '(입금완료)' : ''}
                        </td>
                        <td>
                          {data.lvShotSttCdNm}
                          {data.lvShotSttCd === 'SAVE_BEFORE_PAYMENT' && (
                            <Button size="sml" line="gray" radius={true} title="예약취소" width={62} marginTop={3} buttonMarkup={true} onClick={(e) => onCancel(e, data.rsvtId)} />
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
            <PageNavigator className="mt40" blockSize={10} currentPage={currentPage} recordCount={pageSize * recordCountPerPage} recordSize={10} changed={pageChangeHandler} />
            {/* <PageNavigator
              className="mt40"
              blockSize={10}
              currentPage={isEmpty(liveRsvtList) ? 0 : liveRsvtList[0].currentPageNo}
              recordCount={isEmpty(liveRsvtList) ? 0 : liveRsvtList[0].totalPageCount}
              recordSize={10}
              changed={pageChangeHandler}
            /> */}
            <div className="essential-point tp2">
              <ul>
                <li>접수가 완료된 예약은 변경이 불가합니다.</li>
                <li>차량 광고가는 예약시 광고가이며, 차량 광고 후 변경되는 금액는 반영되지 않습니다.</li>
                <li>
                  예약 취소는 웹사이트 및 지점에서 가능하며, 취소요구시 위약금이 발생될 수 있습니다.
                  <Button size="mid" line="gray" color="black" radius={true} title="자세히보기" width={100} marginLeft={10} onClick={(e) => openRefundPopup(e, 'fade')} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={refundPopupShow} type={'fade'} closedHandler={closeRefundPopup} title="취소/환불 안내" mode="normal" size="large">
        <div className="con-wrap popup-refund">
          <div className="essential-point tp2">
            <ul>
              <li>카드결제 취소는 위약금을 제외 후 부분취소 됩니다.</li>
              <li>무통장입금 환불요청 시 입금자의 통장사본이 필요하며, 통장사본 접수 이후 최대 7일(영업일 기준) 이내 환불 완료됩니다.</li>
            </ul>
          </div>
          <table className="table-tp1 th-c td-c" summary="Live studio 취소/환불에 대한 내용">
            <caption>Live studio</caption>
            <colgroup>
              <col width="18%" />
              <col width="54%" />
              <col width="28%" />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>취소위약금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="4">전일예약</td>
                <td>결제당일 영업시간(18:00) 이전까지</td>
                <td>전액환불</td>
              </tr>
              <tr>
                <td>결제당일 영업시간(18:00) 이후부터 - 예약시간 1시간까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
              <tr>
                <td rowSpan="3">당일예약</td>
                <td>예약시간 1시간 전까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
          <table className="table-tp1 th-c td-c" summary="Live studio 취소/환불에 대한 내용">
            <caption>Live shot</caption>
            <colgroup>
              <col width="18%" />
              <col width="54%" />
              <col width="28%" />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>취소위약금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="4">전일예약</td>
                <td>결제당일 영업시간(18:00) 이전까지</td>
                <td>전액환불</td>
              </tr>
              <tr>
                <td>결제당일 영업시간(18:00) 이후부터 - 예약시간 1시간까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
              <tr>
                <td rowSpan="3">당일예약</td>
                <td>예약시간 1시간 전까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
            <tbody />
          </table>
        </div>
      </RodalPopup>

      <RodalPopup show={shotReservePopupShow} type={'fade'} closedHandler={closeShotReservePopup} title="Live Shot 촬영 예약" mode="normal" size="medium">
        <PopUpShotReservation onChange={closeShotReservePopup} onClose={() => closeShotReservePopup(false)} />
      </RodalPopup>

      <RodalPopup show={cancelPop} type={'fade'} closedHandler={closeCancelPop} mode="normal" size="xs">
        <div className="con-wrap">
          <p>예약취소 하시겠습니까?</p>
          <Buttons align="center" marginTop={64}>
            <Button size="big" background="gray" title="취소" buttonMarkup={true} width={130} onClick={() => closeCancelPop()} />
            <Button size="big" background="blue80" title="확인" buttonMarkup={true} width={130} onClick={() => onClickCancel()} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
});

LiveShotAppointment.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);

  const { query } = helper;
  await helper.dispatch(
    getLiveRsvtList({ useServiceType: '0020', pageNo: 1 }),
    listActions.getDealerConditionAction(),
  );

  return {
    query,
    isReserve: query.type === 'reg',
    paymentInfo: {
      returnCd: query.returnCd,
      payMethod: query.payMethod,
      vBankNum: query.vBankNum,
      vBankCode: query.vBankCode,
      vBankOwnerName: query.vBankOwnerName,
      vBankDate: query.vBankDate,
      vBankTime: query.vBankTime,
      vBankAmt: query.vBankAmt,
      mobPayDataKey: query.mobPayDataKey
    }
  };
};

LiveShotAppointment.displayName = 'LiveShotAppointment';

LiveShotAppointment.propTypes = {
  isReserve: PropTypes.bool,
  paymentInfo: PropTypes.object
};

export default withRouter(LiveShotAppointment);
