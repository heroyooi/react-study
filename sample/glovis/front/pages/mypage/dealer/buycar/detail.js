import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import { setComma, getLabelFromArray } from '@src/utils/StringUtil';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageSlideGallery from '@src/components/common/MypageSlideGallery';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';
import { getCarHistory } from '@src/actions/homeservice/homeserviceAction';
import { CMCDTPID } from '@src/constant/cdMstLib';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectSellcar } from '@src/api/sellcar/AllSellcarSearchApi';
import { toggleInterestAction } from '@src/actions/sellcar/compareEstmAction';
import { getLimitTime } from '@src/utils/sellcar/CmprEstmUtil';
import BiddPopup from '@src/components/mypage/dealer/buycar/popup/biddPop';
import { preventScroll } from '@src/utils/CommonUtil';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

const dateFormat = (date) => {
  if (date != undefined) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const date = date.substring(6, 8);
    return `${year}.${month}.${date}`;
  }
  return '';
};

const Detail = memo(({ router }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { slReqId } = router.query;
  const [isAuction, setIsAuction] = useState(true);
  const [isBidding, setIsBidding] = useState(true);
  const [seller, setSeller] = useState({});
  const [car, setCar] = useState({});
  const [optionList, setOptionList] = useState([]);
  const [cmprEstm, setCmprEstm] = useState({});
  const [spExchYnList, setSpExchYnList] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [carMssList, setCarMssList] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [time, setTime] = useState();

  const [isDimm, setIsDimm] = useState(false);
  const [isTender, setIsTender] = useState(false);
  const [carh, setCarh] = useState({});
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // 팝업
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
  const [historyPop, setHistoryPop, handleOpenHistoryPop, handleCloseHistoryPop] = useRodal(false);
  const [canclePop, setCanclePop, openCanclePop, closeDimmCanclePop] = useRodal(false);
  const { carHistory } = useSelector((state) => state.home);
  const getLabel = useCallback(getLabelFromArray, [seller]);
  const [changeHistory, setChangeHistory] = useState([]);
  const [fpViewAccidentHistory, setFpViewAccidentHistory] = useState(false);

  const interestHandler = (hh24AuctId) => {
    dispatch(
      toggleInterestAction({
        hh24AuctId
      })
    );
    // debugger;
    let itrtYn = cmprEstm.itrtYn;
    if (itrtYn === undefined || itrtYn === 'N') {
      itrtYn = 'Y';
    } else {
      itrtYn = 'N';
    }
    setCmprEstm({ ...cmprEstm, itrtYn });
  };

  const handleFullpagePopup = (name, seq) => (e) => {
    e && e.preventDefault();
    if (name === 'view_accident_history') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '중고차 사고이력 정보 보고서',
          options: ['close']
        }
      });
    }
    setFpViewAccidentHistory(true);
  };

  // 보험처리 이력 조회
  const fetchcarHistory = (crNo) => {
    dispatch(getCarHistory({ crNo: crNo }));
  };

  const handleOpenTenderPop = useCallback((e) => {
    e.preventDefault();
    setIsTender(true);
    setIsDimm(true);
    preventScroll(true);
  }, []);

  const handleClose = useCallback((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsDimm(false);
    setIsTender(false);
    preventScroll(false);
  }, []);

  const closeCanclePop = useCallback((e) => {
    e.preventDefault();
    setCanclePop(false);
  }, []);

  const fetchData = () => {
    selectSellcar({ slReqId })
      .then((res) => {
        console.log(res);
        const {
          data: _seller,
          data: { car: _car, cmprEstm: _cmprEstm }
        } = res.data;
        setSeller(_seller ? _seller : {});
        setCar(_car ? _car : {});
        setCmprEstm(_cmprEstm ? _cmprEstm : {});
        setOptionList(_car?.optionList ? _car.optionList : []);
        fetchcarHistory(_car.crNo);
        if (_cmprEstm.hh24AuctSttDvcd === '02' && _cmprEstm.hh24AuctSttDtlDvcd === '002') {
          // 비교견적 진행중
          setIsAuction(true);
          if (_cmprEstm?.myBidd?.updtCnt === undefined || _cmprEstm?.myBidd?.updtCnt === 0) {
            setIsBidding(false);
          } else {
            setIsBidding(true);
          }
        } else {
          // 비교견적 취소,종료,낙찰,유찰 등..
          setIsAuction(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비교견적 차량보기',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
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

    fetchData();

    getCommonCodeAsync(CMCDTPID.spExchYn).then(setSpExchYnList);
    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    getCommonCodeAsync('AM104').then(setCarColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // 차량보험
  }, []);

  useEffect(() => {
    const timer = setInterval(function() {
      setTime(getLimitTime(cmprEstm.hh24AuctEndDt));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [cmprEstm]);

  const dateFormat = (data) => {
    if (data) {
      let dt = data.replace(/\s/gi, '');
      dt = dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      return dt;
    }
    return '';
  };

  useEffect(() => {
    let changeHistoryData = [
      {
        changeDate: dateFormat(carHistory?.firstRegistrationDate),
        changeType: carHistory?.firstRegistrationChangeType,
        carNumberChangeNo: carHistory?.firstRegistrationCarNumber,
        carNumberChangePlug: carHistory?.firstRegistrationCarPlug
      }
    ];
    if (carHistory?.ownerChange !== '0' || carHistory?.carNumberChange !== '0') {
      if (carHistory?.ownerChangeList) {
        for (const data of carHistory.ownerChangeList) {
          changeHistoryData.push({
            changeDate: dateFormat(data.ownerChangeDate),
            changeType: data.changeType,
            carNumberChangeNo: '',
            carNumberChangePlug: ''
          });
        }
      }
      if (carHistory?.carNumberChangeList) {
        for (const data of carHistory.carNumberChangeList) {
          changeHistoryData.push({
            changeDate: dateFormat(data.carNumberChangeDate),
            changeType: data.changeType,
            carNumberChangeNo: data.carNumberChangeNo,
            carNumberChangePlug: data.carNumberChangePlug
          });
        }
      }
    }
    setChangeHistory(changeHistoryData);
  }, [carHistory]);

  const onClickCallback = useCallback((index) => {
    console.log(`${index}번째 좋아요 누름`);
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="dealer-tender-sec pd20">
          <div className="car-img-info">
            <MypageSlideGallery car_gallery={car.photoList} isLike={cmprEstm.itrtYn === 'Y' ? true : false} onClickInter={onClickCallback} />
            <div className="car-info-area">
              <div className="info-wrap">
                <h3>{`${car.crMnfcCdNm || ''} ${car.crDtlMdlCdNm || ''} ${car.crClsCdNm || ''} ${car.crDtlClsCdNm || ''}`}</h3>
                <p>
                  <span>{car.frmYyyy}년식</span>
                  <span>{setComma(car.drvDist)}km</span>
                  <span>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</span>
                  <span>{seller.rgstRsdcAddrCdNm}</span>
                </p>
              </div>
              {isAuction ? (
                // 입찰중
                <>
                  {cmprEstm.itrtYn === 'Y' ? (
                    <Button
                      size="big"
                      background="blue80"
                      title="관심차량 ON"
                      width={138}
                      height={60}
                      onClick={(e) => {
                        e.preventDefault();
                        interestHandler(cmprEstm.hh24AuctId);
                      }}
                    />
                  ) : (
                    <Button
                      size="big"
                      background="gray"
                      title="관심차량 OFF"
                      width={138}
                      height={60}
                      onClick={(e) => {
                        e.preventDefault();
                        interestHandler(cmprEstm.hh24AuctId);
                      }}
                    />
                  )}
                </>
              ) : (
                // 입찰종료
                <div className="bidding-inquiry">
                  <ul>
                    <li>
                      선택가
                      <p className="price-tp7">
                        {setComma(cmprEstm.sbidAmt)}
                        <span className="won">만원</span>
                      </p>
                    </li>
                    <li>
                      최고가
                      <p className="price-tp7">
                        {setComma(cmprEstm.maxAmt)}
                        <span className="won">만원</span>
                      </p>
                    </li>
                    <li>
                      나의 입찰가
                      <p className="price-tp7">
                        {setComma(cmprEstm?.myBidd?.biddAmt)}
                        <span className="won">만원</span>
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="car-basic-info">
            <table summary="차량 기본정보에 대한 내용" className="table-tp1 mt24">
              <caption>차량 기본정보</caption>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td colSpan="3">{car.crNo}</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td colSpan="3">{car.frstRegDt ? car.frstRegDt.split(' ')[0] : ''}</td>
                </tr>
                <tr>
                  <th>형식년도</th>
                  <td>{car.frmYyyy}</td>
                  <th>연료</th>
                  <td>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>{getLabelFromArray(carColors, car.crClrCd)}</td>
                  <th>배기량</th>
                  <td>{setComma(car.dspl)} cc</td>
                </tr>
                <tr>
                  <th>차종</th>
                  <td colSpan="3">{car.crTypeCdNm}</td>
                </tr>
                <tr>
                  <th>출고가격</th>
                  <td colSpan="3">{setComma(car.crRlsPrc)}만원</td>
                </tr>
                <tr>
                  <th>주행거리(현재기준)</th>
                  <td>{setComma(car.drvDist)}km</td>
                </tr>
                <tr>
                  <th>추가옵션</th>
                  <td colSpan="3">{car.addOptCntn}</td>
                </tr>
                <tr>
                  <th>차량설명</th>
                  <td colSpan="3">{car.crCmnt}</td>
                </tr>
                <tr>
                  <th>
                    판금
                    <br />
                    /교환여부
                  </th>
                  <td colSpan="3">
                    [{getLabel(spExchYnList, car?.spExchYn)}] {car?.spExchCntn || ''}
                  </td>
                </tr>
              </tbody>
            </table>

            <CarOptionsEditor items={optionList} isEditing={false} className="mt32" selectOptFlag={true} />
            {/* 
            <table summary="선택 옵션에 대한 내용" className="table-tp1 mt32">
              <caption>선택 옵션</caption>
              <colgroup>
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>선택옵션</th>
                  <td>스노우 화이트 펄, 전자식 룸미러</td>
                </tr>
                <tr>
                  <th>직접입력</th>
                  <td>사용자가 직접 입력한 텍스트</td>
                </tr>
              </tbody>
            </table> 
            */}

            <div className="float-wrap btn-s">
              <h3 className="tit2">보험처리 이력</h3>
              <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} onClick={handleFullpagePopup('view_accident_history')} buttonMarkup={true} />
            </div>
            <table summary="보험처리 이력에 대한 내용" className="table-tp1 mt32">
              <caption className="away">보험처리 이력</caption>
              <colgroup>
                <col width="50%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>보험처리이력 등록기준일</th>
                  <td>{carHistory ? dateFormat(carHistory.recentCheckHistoryDate) : ''}</td>
                </tr>
                <tr>
                  <th>자동차 용도변경</th>
                  <td>
                    {carHistory ? (carHistory.rentalUse === 'N' ? '' : '대용용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.salesUse === 'N' ? '' : '영업용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.officeUse === 'N' ? '' : '관용용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.officeUse === 'N' && carHistory.rentalUse === 'N' && carHistory.salesUse === 'N' ? '이력없음' : '') : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="보험처리 이력에 대한 내용" className="table-tp1 mt8">
              <caption className="away">보험처리 이력</caption>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan="4" className="tx-c">
                    자동차 특수사고 이력
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>전손</th>
                  <td>{carHistory ? (carHistory.carTotalLess === '0' ? '없음' : carHistory.carTotalLess) : ''}</td>
                  <th>도난</th>
                  <td>{carHistory ? (carHistory.carTheft === '0' ? '없음' : carHistory.carTheft) : ''}</td>
                </tr>
                <tr>
                  <th>침수전손</th>
                  <td>{carHistory ? (carHistory.carFloodingTotalLess === '0' ? '없음' : carHistory.carFloodingTotalLess) : ''}</td>
                  <th>침수분손</th>
                  <td>{carHistory ? (carHistory.carFloodingTotalLess === '0' ? '없음' : carHistory.carFloodingTotalLess) : ''}</td>
                </tr>
              </tbody>
            </table>
            <div className="essential-point tp2 fs12 mt8">
              <ul>
                <li>
                  &#8251; 본 차량의 보험처리 이력정보는 <em className="tx-black">{carHistory ? dateFormat(carHistory.recentCheckHistoryDate) : ''}</em>에 조회한 내용입니다.
                </li>
                <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조ㅚ서비스에서 확인 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>
        {isAuction && (
          <>
            {isBidding ? (
              <Button className="fixed" size="full" background="blue80" title="입찰가격 수정" onClick={handleOpenTenderPop} />
            ) : (
              <Button className="fixed" size="full" background="blue80" title="입찰하기" onClick={handleOpenTenderPop} />
            )}
          </>
        )}

        <div className={isDimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleClose} />
        <MobBottomArea active={isTender} isFixButton={true} zid={101}>
          <BiddPopup isMobile={true} cmprEstm={cmprEstm} closedHandler={handleClose} type={'02'} refresh={fetchData} mobIsBidding={isBidding} />
        </MobBottomArea>

        <RodalPopup show={canclePop} type={'fade'} closedHandler={closeDimmCanclePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>입찰을 취소하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeCanclePop} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} />
            </Buttons>
          </div>
        </RodalPopup>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpViewAccidentHistory && <CarAccidentHistory accidData={carHistory} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-tender-sec">
          <div className="car-img-info">
            <MypageSlideGallery car_gallery={car.photoList} />
            <div className="car-info-area">
              <div className="info-wrap">
                <h3>{`${car.crMnfcCdNm || ''} ${car.crDtlMdlCdNm || ''} ${car.crClsCdNm || ''} ${car.crDtlClsCdNm || ''}`}</h3>
                <p>
                  <span>{car.frmYyyy}</span>
                  <span>{setComma(car.drvDist)}km</span>
                  <span>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</span>
                  <span>{seller.rgstRsdcAddrCdNm}</span>
                </p>
              </div>
              {isAuction ? (
                // 입찰중
                <>
                  <p className="time">{time}</p>
                  <p className="num">[ {cmprEstm.biddDrlCnt}명 입찰중 ]</p>
                  <div className="btn-wrap">
                    {cmprEstm.itrtYn === 'Y' ? (
                      <Button
                        size="big"
                        background="blue80"
                        title="관심차량 ON"
                        width={138}
                        height={60}
                        onClick={(e) => {
                          e.preventDefault();
                          interestHandler(cmprEstm.hh24AuctId);
                        }}
                      />
                    ) : (
                      <Button
                        size="big"
                        background="gray"
                        title="관심차량 등록"
                        width={138}
                        height={60}
                        onClick={(e) => {
                          e.preventDefault();
                          interestHandler(cmprEstm.hh24AuctId);
                        }}
                      />
                    )}
                    {isBidding ? (
                      <>
                        <Button size="big" background="blue80" title="입찰가격 수정" width={244} height={60} onClick={(e) => openTenderPop(e, 'fade')} />
                      </>
                    ) : (
                      <>
                        <Button size="big" background="blue80" title="입찰하기" width={244} height={60} onClick={(e) => openTenderPop(e, 'fade')} />
                      </>
                    )}
                  </div>
                </>
              ) : (
                // 입찰종료
                <>
                  <p className="time over">경매종료 : {cmprEstm.hh24AuctEndDt}</p>
                  <ul className="num over">
                    <li>관심 {cmprEstm.itrtDrlCnt}명</li>
                    <li>입찰자 {cmprEstm.biddDrlCnt}명</li>
                  </ul>
                  <ul className="price-wrap">
                    <li>
                      선택가 <span className="tx-blue80">{setComma(cmprEstm.sbidAmt)}만원</span>
                    </li>
                    <li>
                      최고가 <span>{setComma(cmprEstm.maxAmt)}만원</span>
                    </li>
                    <li>
                      내견적 <span>{setComma(cmprEstm?.myBidd?.biddAmt)}만원</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="car-basic-info">
            <table summary="차량 기본정보에 대한 내용" className="table-tp1">
              <caption>차량 기본정보</caption>
              <colgroup>
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>{car.crNo}</td>
                  <th>최초등록일</th>
                  <td>{car.frstRegDt ? car.frstRegDt.split(' ')[0] : ''}</td>
                  <th>형식년도</th>
                  <td>{car.frmYyyy}</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>{getLabelFromArray(carColors, car.crClrCd)}</td>
                  <th>연료</th>
                  <td>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</td>
                  <th>배기량</th>
                  <td>{setComma(car.dspl)}</td>
                </tr>
                <tr>
                  <th>차종</th>
                  <td>{car.crTypeCdNm}</td>
                  <th>출고가격</th>
                  <td>{setComma(car.crRlsPrc)}만원</td>
                  <th>주행거리(현재기준)</th>
                  <td>{setComma(car.drvDist)}km</td>
                </tr>
              </tbody>
            </table>
            <CarOptionsEditor items={optionList} isEditing={false} />
            <table summary="차량 옵션정보에 대한 내용" className="table-tp1 mt64">
              <caption className="away">차량 옵션정보</caption>
              <colgroup>
                <col width="20%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>추가옵션</th>
                  <td>{car.addOptCntn}</td>
                </tr>
                <tr>
                  <th>차량설명</th>
                  <td>
                    <pre>{car.crCmnt}</pre>
                  </td>
                </tr>
                <tr>
                  <th>판금/교환여부</th>
                  <td>
                    [{getLabel(spExchYnList, car?.spExchYn)}]<pre>{car?.spExchCntn || ''}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul className="float-wrap mt64">
              <li>
                <h4 className="mb33">보험처리 이력</h4>
              </li>
              <li>
                <Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={139} onClick={handleOpenHistoryPop} />
              </li>
            </ul>
            <table summary="보험처리 이력에 대한 내용" className="table-tp1 td-c">
              <caption className="away">보험처리 이력</caption>
              <colgroup>
                <col width="28%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>보험처리이력 등록기준일</th>
                  <td colSpan="4">{carHistory ? dateFormat(carHistory.recentCheckHistoryDate) : ''}</td>
                </tr>
                <tr>
                  <th>자동차 용도 변경</th>
                  <td colSpan="4">
                    {carHistory ? (carHistory.rentalUse === 'N' ? '' : '대용용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.salesUse === 'N' ? '' : '영업용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.officeUse === 'N' ? '' : '관용용도 사용이력있음<br/>') : ''}
                    {carHistory ? (carHistory.officeUse === 'N' && carHistory.rentalUse === 'N' && carHistory.salesUse === 'N' ? '이력없음' : '') : ''}
                  </td>
                </tr>
                <tr>
                  <th rowSpan="2">자동차 특수사고 이력</th>
                  <th>전손</th>
                  <td>{carHistory ? (carHistory.carTotalLess === '0' ? '없음' : carHistory.carTotalLess) : ''}</td>
                  <th>도난</th>
                  <td>{carHistory ? (carHistory.carTheft === '0' ? '없음' : carHistory.carTheft) : ''}</td>
                </tr>
                <tr>
                  <th>침수전손</th>
                  <td>{carHistory ? (carHistory.carFloodingTotalLess === '0' ? '없음' : carHistory.carFloodingTotalLess) : ''}</td>
                  <th>침수분순</th>
                  <td>{carHistory ? (carHistory.carFloodingTotalLess === '0' ? '없음' : carHistory.carFloodingTotalLess) : ''}</td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <p className="essential">
                      <i className="ico-dot mid" /> 본 차량의 보험처리 이력정보는 {carHistory ? dateFormat(carHistory.recentCheckHistoryDate) : ''}에 조회한 내용입니다.
                      <br />
                      <i className="ico-dot mid" /> 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 추가 START */}
            <h4 className="h3-tit mt64 mb33">관리자 메모</h4>
            <table summary="관리자 메모 내용" className="table-tp1 td-c">
              <caption className="away">관리자 메모 내용</caption>
              <colgroup>
                <col width="28%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>메모 내용</th>
                  <td>
                    <pre>
                      {seller.memoCntn}
                      {/* <Textarea countLimit={200} type="tp1" height={140} disabled={true} data={seller.memoCntn} /> */}
                    </pre>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* 추가 END */}
          </div>
        </div>
      </div>

      <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding === false ? '입찰하기' : '입찰가격 수정'} mode="normal" size="small">
        <BiddPopup cmprEstm={cmprEstm} closedHandler={closeTenderPop} type={'02'} refresh={fetchData} />
      </RodalPopup>

      <RodalPopup show={historyPop} type={'fade'} closedHandler={handleCloseHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory accidData={carHistory} />
      </RodalPopup>
    </AppLayout>
  );
});

Detail.propTypes = {
  router: PropTypes.object
};
Detail.displayName = 'Detail';
export default withRouter(Detail);
