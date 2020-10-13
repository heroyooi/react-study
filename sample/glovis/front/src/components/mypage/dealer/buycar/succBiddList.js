import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import { imgUrl } from '@src/utils/HttpUtils';
import * as searchApi from '@src/api/sellcar/AllSellcarSearchApi';
import * as selfSellcarApi from '@src/api/sellcar/SelfSellcarApi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import PageNavigator from '@src/components/common/PageNavigator';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import CustomPop from './popup/CustomPop';
import DealCoPop from './popup/DealCoPop';
import DealDelayPop1 from './popup/DealDelayPop1';
import DealDelayPop2 from './popup/DealDelayPop2';
import DealNofityPop1 from './popup/DealNofityPop1';
import DealNofityPop2 from './popup/DealNofityPop2';
import DealNofityPop3 from './popup/DealNofityPop3';
import DealNofityPop4 from './popup/DealNofityPop4';
import VisitPop1 from './popup/VisitPop1';
import DealFeePop from './popup/DealFeePop';
import { preventScroll } from '@src/utils/CommonUtil';
import { StereoPannerNode } from 'globalthis/implementation';


const getDiffDay = (_end) => {
  var now = moment();
  var end = moment(_end, 'YYYY-MM-DD HH:mm');
  var duration = moment.duration(end.diff(now));
  var days = duration.days();
  return days;
}

const showVistDay = (_vstDt) => {
  const vstDt = _vstDt.split(' ');
  return vstDt;
}

const SuccBiddList = memo(() => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [page] = useState(1);
  const [pageQtt] = useState(10);

  const { succBiddList, recordCount } = useSelector((store) => store.compareEstm);
  const [customPop, setCustomPop, openCustomPop, closeCustomPop] = useRodal(false);
  const [visitPop1, setVisitPop1, openVisitPop1, closeVisitPop1] = useRodal(false);
  const [dealFeePop, setDealFeePop, openDealFeePop, closeDealFeePop] = useRodal(false);
  const [dealDelayPop1, setDealDelayPop1, openDealDelayPop1, closeDealDelayPop1] = useRodal(false);
  const [dealDelayPop2, setDealDelayPop2, openDealDelayPop2, closeDealDelayPop2] = useRodal(false);
  const [dealCoPop, setDealCoPop, openDealCoPop, closeDealCoPop] = useRodal(false);
  const [dealNotifyPop1, setDealNotifyPop1, openDealNotifyPop1, closeDealNotifyPop1] = useRodal(false);
  const [dealNotifyPop2, setDealNotifyPop2, openDealNotifyPop2, closeDealNotifyPop2] = useRodal(false);
  const [dealNotifyPop3, setDealNotifyPop3, openDealNotifyPop3, closeDealNotifyPop3] = useRodal(false);
  const [dealNotifyPop4, setDealNotifyPop4, openDealNotifyPop4, closeDealNotifyPop4] = useRodal(false);

  const [visitPopupTitle, setVisitPopupTitle] = useState('방문일자 입력');
  const [succBidd, setSuccBidd] = useState({});
  const [customerDetail, setCustomerDetail] = useState({});

  const showCustomerInfoHandler = (e, { slReqId }) => {
    e.preventDefault();
    console.log('slReqId::', slReqId);
    const param = {
      slReqId: slReqId
    };
    searchApi
      .selectSellcar(param)
      .then((res) => {
        if (res.data.statusinfo.returncd === '000') {
          setCustomerDetail(res.data.data);
          openCustomPop(e, 'fade');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const visitDatePopupHandler = (e, o) => {
    setSuccBidd(o);
    if (o.bsSttDvcd === '01') {
      setVisitPopupTitle('방문일자 입력');
    } else if (o.bsSttDvcd === '02') {
      setVisitPopupTitle('방문일자 수정');
    }
    if (hasMobile) {
      setActive1(true);
      setDimm1(true);
    }
    openVisitPop1(e, 'fade');
  };

  const succBiddPopupHandler = (e, o, popup) => {
    setSuccBidd(o);
    popup(e, 'fade');
  };

  const goDetail = (o) => {
    Router.push(`/mypage/dealer/buycar/detail?slReqId=${o.slReqId}`).then(() => {
      window.scrollTo(0, 0);
    });
  };
  // 모바일
  // bottom
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [dimm3, setDimm3] = useState(false);
  const [dimm4, setDimm4] = useState(false);
  const [dimm5, setDimm5] = useState(false);
  const [dimm6, setDimm6] = useState(false);
  const [dimm7, setDimm7] = useState(false);
  const [dimm8, setDimm8] = useState(false);
  const [dimm9, setDimm9] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);
  const [active7, setActive7] = useState(false);
  const [active8, setActive8] = useState(false);
  console.log('succbidd :', succBidd);
  const [active9, setActive9] = useState(false);
  const handleOpenVisit = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    if (o.bsSttDvcd === '01') {
      setVisitPopupTitle('방문일자 입력');
    } else if (o.bsSttDvcd === '02') {
      setVisitPopupTitle('방문일자 수정');
    }
    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, []);
  const handleOpenDealDelay1 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);
  const handleOpenDealDelay2 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive3(true);
    setDimm3(true);
    preventScroll(true);
  }, []);
  const handleOpenDealNotify1 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive4(true);
    setDimm4(true);
    preventScroll(true);
  }, []);
  const handleOpenDealNotify2 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive5(true);
    setDimm5(true);
    preventScroll(true);
  }, []);
  const handleOpenDealNotify3 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive6(true);
    setDimm6(true);
    preventScroll(true);
  }, []);
  const handleOpenDealNotify4 = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive9(true);
    setDimm9(true);
    preventScroll(true);
  }, []);
  const handleOpenDealFee = useCallback((e, o) => {
    e.preventDefault();
    setSuccBidd(o);
    setActive7(true);
    setDimm7(true);
    preventScroll(true);
  }, []);
  const handleOpenCustom = useCallback((e, { slReqId }) => {
    e.preventDefault();
    const param = {
      slReqId: slReqId
    };
    searchApi
      .selectSellcar(param)
      .then((res) => {
        if (res.data.statusinfo.returncd === '000') {
          setCustomerDetail(res.data.data);
          setActive8(true);
          setDimm8(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    preventScroll(true);
  }, []);

  const handleOpenDealCo = (e, o) => {
    setSuccBidd(o);
    handleFullpagePopup(e, o);
  };

  // 모바일 bottom팝업 닫기
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm3 = useCallback(() => {
    setActive3(false);
    setDimm3(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm4 = useCallback(() => {
    setActive4(false);
    setDimm4(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm5 = useCallback(() => {
    setActive5(false);
    setDimm5(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm6 = useCallback(() => {
    setActive6(false);
    setDimm6(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm7 = useCallback(() => {
    setActive7(false);
    setDimm7(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm8 = useCallback(() => {
    setActive8(false);
    setDimm8(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm9 = useCallback(() => {
    setActive9(false);
    setDimm9(false);
    preventScroll(false);
  }, []);
  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseDimm1();
      handleCloseDimm2();
      handleCloseDimm3();
      handleCloseDimm4();
      handleCloseDimm5();
      handleCloseDimm6();
      handleCloseDimm7();
      handleCloseDimm8();
      handleCloseDimm9();
    },
    [handleCloseDimm1, handleCloseDimm2, handleCloseDimm3, handleCloseDimm4, handleCloseDimm5, handleCloseDimm6, handleCloseDimm7, handleCloseDimm8, handleCloseDimm9]
  );

  const [fpDealCo, setFpDealCo] = useState(false);
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '거래 성사 완료 신고',
          options: ['close']
        }
      });
      setFpDealCo(true);
    },
    [dispatch]
  );

  const CloseFpPop = useCallback(
    (e) => {
      e.preventDefault();
      setFpDealCo(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  if (hasMobile) {
    return (
      <>
        {isEmpty(succBiddList) === true ? (
          <div className="list-none-wrap">
            <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
          </div>
        ) : (
          <>
            <ul className="admin-list-wrap">
              <li>
                <div className="goods-list admin-list tp4">
                  <ul>
                    {succBiddList.map((o, idx) => {
                      return (
                        <li key={idx}>
                          <span>
                            <div className="img-cover">
                              {(o.bsSttDvcd === '01' || o.bsSttDvcd === '02' || o.bsSttDvcd === '06' || o.bsSttDvcd === '09') ? (
                                <p className="state normal">
                                  {/* 진행상태 */}
                                  {o.bsSttDvcd === '01' && <>낙찰완료</>}
                                  {o.bsSttDvcd === '02' && (
                                    <>
                                      방문예정
                                      <br />
                                      {showVistDay(o.vstDt)[0]}
                                      <br />
                                      {showVistDay(o.vstDt)[1].substring(0, 5)}
                                    </>
                                  )}
                                  {/* 거래 완료 */}
                                  {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '006') && (
                                    <>
                                      거래완료
                                      <br />[ 입금일 -{o.remainDayForDpsFee} ]
                                    </>
                                  )}
                                  {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '007') && (
                                    <>
                                      거래완료
                                      <br />[ 입금일 초과 ]
                                    </>
                                  )}
                                  {o.bsSttDvcd === '09' && (
                                    <>
                                      거래완료
                                      <br />({o.lastBsYmd})
                                    </>
                                  )}
                                </p>
                              ) : (
                                <p className="state need">
                                  {/* 거래 지연 */}
                                  {o.bsSttDvcd === '03' && <>거래지연</>}
                                  {/* 거래불발 */}
                                  {o.bsSttDvcd === '08' && <>거래실패</>}
                                  {/* 거래불발 (완료/소명필요없음)*/}
                                  {o.bsSttDvcd === '11' && <>거래실패</>}
                                  {/* 거래불발 (소명필요) */}
                                  {o.bsSttDvcd === '04' && <>거래실패</>}
                                  {/* 거래불발 (소명확인요청)*/}
                                  {o.bsSttDvcd === '10' && <>거래실패</>}
                                  {/* 거래불발 (소명확인완료) */}
                                  {o.bsSttDvcd === '05' && <>거래실패</>}
                                  {/* 소명불가 사유확인 */}
                                  {o.bsSttDvcd === '07' && <>거래실패</>}
                                </p>
                              )}
                              <img src={`${imgUrl}${o.phtUrl}`} alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <ul className="date">
                                <li>낙찰일 : {o.sbidDt.split(' ')[0]}</li>
                                {/* <li>13:56</li> */}
                              </ul>
                              <Link href={`/mypage/dealer/buycar/detail?slReqId=${o.slReqId}`}>
                                <a>
                                  <h5 className="subject">
                                    {o.crMnfcCdNm} {o.crMdlCdNm} {o.crClsCdNm} {o.crDtlClsCdNm}
                                  </h5>
                                </a>
                              </Link>
                              <div className="info-wrap">
                                <div className="info">
                                  <li>{o.crNo}</li>
                                  <li>{o.frmYyyy}식</li>
                                  <li>{o.drvDist}km</li>
                                  <li>{o.fuel}</li>
                                </div>
                              </div>
                            </div>
                          </span>
                          <Buttons align="center" marginTop={8}>
                            {/* 낙찰 완료 */}
                            {(o.bsSttDvcd === '01' && o.bsSttDtlDvcd === '001') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => handleOpenCustom(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 등록" width={129} marginBottom={8} onClick={(e) => handleOpenVisit(e, o)} />
                              </>
                            )}
                            {/* 낙찰 완료-방문일자 등록이 지연된 상태 */}
                            {(o.bsSttDvcd === '01' && o.bsSttDtlDvcd === '002') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => handleOpenCustom(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 등록" width={129} marginBottom={8} onClick={(e) => handleOpenVisit(e, o)} />
                              </>
                            )}
                            {/* 방문 예정 */}
                            {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '003') && (
                              <>
                                {/* 방문예정일은 1일 전까지 수정가능*/}
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 수정" width={129} marginBottom={8} onClick={(e) => handleOpenVisit(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => handleOpenDealDelay1(e, o)} />
                              </>
                            )}
                            {/* 방문 예정일 이후 7일 이내*/}
                            {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '004') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 실패 신고" width={129} marginBottom={8} onClick={(e) => handleOpenDealNotify1(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 완료 신고" width={129} onClick={(e) => handleOpenDealCo(e, o)} />
                              </>
                            )}
                            {/* 방문 예정 이후 7일 이후*/}
                            {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '005') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => handleOpenDealDelay1(e, o)} />
                              </>
                            )}
                            {/* 거래 지연 */}
                            {o.bsSttDvcd === '03' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연 내용확인" width={129} onClick={(e) => handleOpenDealDelay2(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래실패 사유 입력" width={129} marginBottom={8} onClick={(e) => handleOpenDealNotify1(e, o)} />
                              </>
                            )}
                            {/* 거래불발 */}
                            {o.bsSttDvcd === '08' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래실패 내용확인" width={129} marginBottom={8} onClick={(e) => handleOpenDealNotify2(e, o)} />
                              </>
                            )}
                            {/* 거래불발 (완료/소명필요없음)*/}
                            {o.bsSttDvcd === '11' && (
                              <>
                                <span>거래실패</span>
                                <span>&nbsp;</span>
                              </>
                            )}
                            {/* 거래불발 (소명필요) */}
                            {o.bsSttDvcd === '04' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래실패 내용확인" width={129} marginBottom={8} onClick={(e) => handleOpenDealNotify2(e, o)} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 소명" width={129} onClick={(e) => handleOpenDealNotify3(e, o)} />
                              </>
                            )}
                            {/* 거래불발 (소명확인요청)*/}
                            {o.bsSttDvcd === '10' && (
                              <>
                                <td>거래실패</td>
                                <td>&nbsp;</td>
                              </>
                            )}
                            {/* 거래불발 (소명확인완료) */}
                            {o.bsSttDvcd === '05' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래실패 내용확인" width={129} marginBottom={8} onClick={(e) => handleOpenDealNotify2(e, o)} />
                              </>
                            )}
                            {/* 소명불가 사유확인 */}
                            {o.bsSttDvcd === '07' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="소명 불가 사유 확인" width={129} onClick={(e) => handleOpenDealNotify4(e, o)} />
                              </>
                            )}

                            {/* 거래 완료 */}
                            {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '006') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="딜러 수수료 입금" width={129} onClick={(e) => handleOpenDealFee(e, o)} />
                              </>
                            )}
                            {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '007') && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="딜러 수수료 입금" width={129} onClick={(e) => handleOpenDealFee(e, o)} />
                              </>
                            )}
                            {/* 거래 완료 */}
                            {o.bsSttDvcd === '09' && (
                              <>
                                <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />
                              </>
                            )}
                            {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" fontWeight="500" measure="%" width={49} onClick={handleOpenDealDelay1} /> */}
                            {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => showCustomerInfoHandler(e, o)} />
                            <Button
                              size="mid"
                              line="blue80"
                              color="blue80"
                              radius={true}
                              title="방문일자 입력"
                              fontWeight="500"
                              measure="%"
                              width={49}
                              mgMeasure="%"
                              marginLeft={2}
                              onClick={(e) => handleOpenVisit(e, '01')}
                            /> */}
                          </Buttons>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>

            <div className={dimm1 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
            <MobBottomArea active={active1} isFixButton={true} zid={101}>
              <VisitPop1 data={succBidd} closedHandler={handleClose} title={visitPopupTitle} />
            </MobBottomArea>

            {/* 거래지연 사유 입력 */}
            <div className={dimm2 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm2} />
            <MobBottomArea active={active2} isFixButton={true} zid={101}>
              <DealDelayPop1 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 거래지연 내용 확인 */}
            <div className={dimm3 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm3} />
            <MobBottomArea active={active3} isFixButton={true} zid={101}>
              <DealDelayPop2 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 거래실패 사유 입력 */}
            <div className={dimm4 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm4} />
            <MobBottomArea active={active4} isFixButton={true} zid={101}>
              <DealNofityPop1 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 거래실패 내용 확인 */}
            <div className={dimm5 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm5} />
            <MobBottomArea active={active5} isFixButton={true} zid={101}>
              <DealNofityPop2 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 거래 소명 */}
            <div className={dimm6 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm6} />
            <MobBottomArea active={active6} isFixButton={true} zid={101}>
              <DealNofityPop3 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 딜러 수수료 입금 */}
            <div className={dimm7 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm7} />
            <MobBottomArea active={active7} isFixButton={true} zid={101}>
              <DealFeePop data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 고객 연락처 확인 */}
            <div className={dimm8 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm8} />
            <MobBottomArea active={active8} isFixButton={true} zid={101}>
              <CustomPop customerInfo={customerDetail} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 소명 불가 사유 확인 */}
            <div className={dimm9 ? 'modal-bg active v-2' : 'modal-bg v-2'} onClick={handleCloseDimm9} />
            <MobBottomArea active={active9} isFixButton={true} zid={101}>
              <DealNofityPop4 data={succBidd} closedHandler={handleClose} />
            </MobBottomArea>

            {/* 거래 성사 완료 신고 */}
            <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
              {fpDealCo && <DealCoPop data={succBidd} closedHandler={CloseFpPop} />}
            </MobFullpagePopup>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
        <caption className="away">결제내역</caption>
        <colgroup>
          <col width="13%" />
          <col width="57%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>낙찰일</th>
            <th>차량정보</th>
            <th>진행상태</th>
            <th>수정/확인</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(succBiddList) &&
            succBiddList.map((o, idx) => (
              <tr key={idx}>
                <td>{o.sbidDt.split(" ")[0]}</td>
                <td>
                  <div className="img-cover">
                    <img src={`${imgUrl}${o.phtUrl}`} alt="차량 이미지" />
                  </div>
                  <div className="summary" onClick={() => goDetail(o)}>
                    <h4 className="subject">
                      {o.crMnfcCdNm} {o.crMdlCdNm} {o.crClsCdNm} {o.crDtlClsCdNm}
                    </h4>
                    <ul className="info">
                      <li>{o.crNo}</li>
                      <li>{o.frmYyyy}식</li>
                      <li>{o.drvDist}km</li>
                      <li>{o.fuel}</li>
                    </ul>
                  </div>
                </td>
                {/* 낙찰 완료 */}
                {(o.bsSttDvcd === '01' && o.bsSttDtlDvcd === '001') && (
                  <>
                    <td>낙찰완료</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => showCustomerInfoHandler(e, o)} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 등록" width={129} marginBottom={8} onClick={(e) => visitDatePopupHandler(e, o)} />
                      {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealDelayPop1)} /> */}
                    </td>
                  </>
                )}
                {/* 낙찰 완료-방문일자 등록이 지연된 상태 */}
                {(o.bsSttDvcd === '01' && o.bsSttDtlDvcd === '002') && (
                  <>
                    <td>낙찰완료</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => showCustomerInfoHandler(e, o)} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 등록" width={129} marginBottom={8} onClick={(e) => visitDatePopupHandler(e, o)} />
                      {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealDelayPop1)} /> */}
                    </td>
                  </>
                )}
                {/* 방문 예정 */}
                {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '003') && (
                  <>
                    <td>방문예정<br/>{showVistDay(o.vstDt)[0]}<br/>{showVistDay(o.vstDt)[1].substring(0,5)}</td>
                    <td>
                      {/* 방문예정일은 1일 전까지 수정가능*/}
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 수정" width={129} marginBottom={8} onClick={(e) => visitDatePopupHandler(e, o)} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealDelayPop1)} />
                      {/* 방문예정일 이후에만 나옴 */}
                      {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 완료 신고" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealCoPop)} /> */}
                    </td>
                  </>
                )}
                {/* 방문 예정일 이후 7일 이내*/}
                {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '004') && (
                  <>
                    <td>방문예정<br/>{showVistDay(o.vstDt)[0]}<br/>{showVistDay(o.vstDt)[1].substring(0,5)}</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 실패 신고" width={129} marginBottom={8} onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop1)} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 완료 신고" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealCoPop)} />
                    </td>
                  </>
                )}
                {/* 방문 예정 이후 7일 이후*/}
                {(o.bsSttDvcd === '02' && o.bsSttDtlDvcd === '005') && (
                  <>
                    <td>방문예정<br/>{showVistDay(o.vstDt)[0]}<br/>{showVistDay(o.vstDt)[1].substring(0,5)}</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealDelayPop1)} />
                    </td>
                  </>
                )}
                {/* 거래 지연 */}
                {o.bsSttDvcd === '03' && (
                  <>
                    <td>거래지연</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연 내용확인" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealDelayPop2)} />
                      <Button
                        size="mid"
                        line="blue80"
                        color="blue80"
                        radius={true}
                        title="거래실패 사유 입력"
                        width={129}
                        marginBottom={8}
                        onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop1)}
                      />
                    </td>
                  </>
                )}
                {/* 거래불발 */}
                {o.bsSttDvcd === '08' && (
                  <>
                    <td>거래실패</td>
                    <td>
                      <Button
                        size="mid"
                        line="blue80"
                        color="blue80"
                        radius={true}
                        title="거래실패 내용확인"
                        width={129}
                        marginBottom={8}
                        onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop2)}
                      />
                    </td>
                  </>
                )}
                {/* 거래불발 (완료/소명필요없음)*/}
                {o.bsSttDvcd === '11' && (
                  <>
                    <td>거래실패</td>
                    <td>&nbsp;</td>
                  </>
                )}
                {/* 거래불발 (소명필요) */}
                {o.bsSttDvcd === '04' && (
                  <>
                    <td>거래실패</td>
                    <td>
                      <Button
                        size="mid"
                        line="blue80"
                        color="blue80"
                        radius={true}
                        title="거래실패 내용확인"
                        width={129}
                        marginBottom={8}
                        onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop2)}
                      />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 소명" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop3)} />
                    </td>
                  </>
                )}
                {/* 거래불발 (소명확인요청)*/}
                {o.bsSttDvcd === '10' && (
                  <>
                    <td>거래실패</td>
                    <td>&nbsp;</td>
                  </>
                )}
                {/* 거래불발 (소명확인완료) */}
                {o.bsSttDvcd === '05' && (
                  <>
                    <td>거래실패</td>
                    <td>
                      <Button
                        size="mid"
                        line="blue80"
                        color="blue80"
                        radius={true}
                        title="거래실패 내용확인"
                        width={129}
                        marginBottom={8}
                        onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop2)}
                      />
                      {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 소명" width={129} onClick={(e) => openDealNotifyPop3(e, 'fade')} /> */}
                    </td>
                  </>
                )}
                {/* 소명불가 사유확인 */}
                {o.bsSttDvcd === '07' && (
                  <>
                    <td>거래실패</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="소명 불가 사유 확인" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealNotifyPop4)} />
                    </td>
                  </>
                )}
                
                {/* 거래 완료 */}
                {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '006') && (
                  <>
                    <td>
                      거래완료<br/>[ 입금일 -{o.remainDayForDpsFee} ]
                    
                    </td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="딜러 수수료 입금" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealFeePop)} />                      
                    </td>
                  </>
                )}
                {(o.bsSttDvcd === '06' && o.bsSttDtlDvcd === '007') && (
                  <>
                    <td>거래완료<br/>[ 입금일 초과 ]</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="딜러 수수료 입금" width={129} onClick={(e) => succBiddPopupHandler(e, o, openDealFeePop)} />                      
                    </td>
                  </>
                )}
                {/* 거래 완료 */}
                {o.bsSttDvcd === '09' && (
                  <>
                    <td>거래완료<br/>({o.lastBsYmd})</td>
                    <td>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href={`detail?slReqId=${o.slReqId}`} />                      
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <PageNavigator recordCount={recordCount} currentPage={page} recordSize={pageQtt} className="mt32" />
      <RodalPopup show={dealNotifyPop1} type={'fade'} closedHandler={closeDealNotifyPop1} title="거래실패 사유 입력" mode="normal" size="small">
        <DealNofityPop1 data={succBidd} closedHandler={closeDealNotifyPop1} />
      </RodalPopup>
      <RodalPopup show={dealNotifyPop2} type={'fade'} closedHandler={closeDealNotifyPop2} title="거래실패 내용확인" mode="normal" size="small">
        <DealNofityPop2 data={succBidd} closedHandler={closeDealNotifyPop2} />
      </RodalPopup>
      <RodalPopup show={dealNotifyPop3} type={'fade'} closedHandler={closeDealNotifyPop3} title="거래 소명" mode="normal" size="medium">
        <DealNofityPop3 data={succBidd} closedHandler={closeDealNotifyPop3} />
      </RodalPopup>
      <RodalPopup show={dealNotifyPop4} type={'fade'} closedHandler={closeDealNotifyPop4} title="소명 불가 사유 확인" mode="normal" size="medium">
        <DealNofityPop4 data={succBidd} closedHandler={closeDealNotifyPop4} />
      </RodalPopup>
      <RodalPopup show={customPop} type={'fade'} closedHandler={closeCustomPop} title="고객연락처 확인" mode="normal" size="small">
        <CustomPop customerInfo={customerDetail} closedHandler={closeCustomPop} />
      </RodalPopup>
      <RodalPopup show={visitPop1} type={'fade'} closedHandler={closeVisitPop1} title={visitPopupTitle} mode="normal" size="small">
        <VisitPop1 data={succBidd} closedHandler={closeVisitPop1} />
      </RodalPopup>
      <RodalPopup show={dealDelayPop1} type={'fade'} closedHandler={closeDealDelayPop1} title="거래지연 사유 입력" mode="normal" size="small">
        <DealDelayPop1 data={succBidd} closedHandler={closeDealDelayPop1} />
      </RodalPopup>
      <RodalPopup show={dealDelayPop2} type={'fade'} closedHandler={closeDealDelayPop2} title="거래지연 내용 확인" mode="normal" size="small">
        <DealDelayPop2 data={succBidd} closedHandler={closeDealDelayPop2} />
      </RodalPopup>
      <RodalPopup show={dealFeePop} type={'fade'} closedHandler={closeDealFeePop} title="딜러 수수료 입금" mode="normal" size="small">
        <DealFeePop data={succBidd} closedHandler={closeDealFeePop} />
      </RodalPopup>
      <RodalPopup show={dealCoPop} type={'fade'} closedHandler={closeDealCoPop} title="거래 성사 완료 신고" mode="normal" size="medium">
        <DealCoPop data={succBidd} closedHandler={closeDealCoPop} />
      </RodalPopup>
    </>
  );
});

SuccBiddList.displayName = 'SuccBiddList';
export default withRouter(SuccBiddList);
