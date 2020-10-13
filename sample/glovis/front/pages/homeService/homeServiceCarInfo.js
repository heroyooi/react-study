/**
 * 설명 : 홈서비스 차량정보
 * @fileoverview 홈서비스>홈서비스 차량정보
 * @requires [homeserviceAction,Perfomance]
 * @author 김지훈
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';

import AppLayout from '@src/components/layouts/AppLayout';
import CarPerformance from '@src/components/common/popup/CarPerformanceCheck';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import DetailDiagnosis from '@src/components/common/popup/DetailDiagnosis';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCarInfo, getPerfomence, getPolicy, getAtbInsp, getCarHistory, setInputInfo, setHomeServiceOngoing } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

import { imgUrl } from '@src/utils/HttpUtils';

const globalThis = require('globalthis')();

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

/**
 * 설명 : 차량의 정보를 조회한다.
 * @param {res} 성능점검 정보
 * @returns {CarInfo} 홈서비스 차량정보 조회 화면
 */
const HomeServiceCarInfo = ({ query }) => {
  const { dlrPrdId } = query;
  const nf = Intl.NumberFormat();
  const dispatch = useDispatch();

  const [policy, setPolicy] = useState();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('홈서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
    }
    dispatch(setHomeServiceOngoing(true)); //입력 프로세스의 시작을 정의
  }, []);

  const { showAlert, initAlert } = useContext(SystemContext);
  const { inputInfo, carInfo, policyList, perfomence, autobellInsp, carHistory } = useSelector((state) => state.home);
  const [performancePop, setPerformancePop, handleOpenPerformancePop, handleClosePerformancePop] = useRodal(false, true);
  const [chkPop2, setChkPop2, handleOpenChkPop2, handleCloseChkPop2] = useRodal(false, true);
  const [chkPop3, setChkPop3, handleOpenChkPop3, handleCloseChkPop3] = useRodal(false, true);
  const [chkPop4, setChkPop4, handleOpenChkPop4, handleCloseChkPop4] = useRodal(false, true);
  const [checkArr, setCheckArr] = useState([false, false, false, false]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const onClosePerformance = (e) => {
    handleClosePerformancePop();
  };

  const onChangeCheckBox = (e, name, checked) => {
    let checkArray = checkArr;
    if (name === 'perfomence') {
      checkArray[0] = !checkArray[0];
      if (checked) {
        if (perfomence) handleOpenPerformancePop();
        else showAlert('등록된 성능점검 기록부가 없습니다.', 'error');
      }
    }
    if (name === 'carHistory') {
      checkArray[1] = !checkArray[1];
      if (checked) {
        if (carHistory) handleOpenChkPop2();
        else showAlert('조회 가능한 보험이력이 없습니다.', 'error');
      }
    }
    if (name === 'autobellInsp') {
      checkArray[2] = !checkArray[2];
      if (checked) {
        if (autobellInsp) handleOpenChkPop3();
        else showAlert('등록된 오토벨 진단결과가 없습니다.', 'error');
      }
    }
    if (name === 'hsvcPolicy') {
      checkArray[3] = !checkArray[3];
      if (checked) {
        handleOpenChkPop4();
      }
    }
    setCheckArr(checkArray);
  };

  const nextStep = (e, target) => {
    e.preventDefault();

    if (!hasMobile) {
      for (const [i, v] of checkArr.entries()) {
        let msg = '';
        if (i === 0) msg = '성능점검기록부';
        if (i === 1) msg = '보험이력';
        if (i === 2) msg = '오토벨 진단결과';
        if (i === 3) msg = '홈서비스 환불약관';
        if (!v) {
          if (i === 2) if (carInfo?.lvstdCrYn === 'Y') return showAlert(msg + '을(를) 확인해주세요.', 'error');
          if (i !== 2) return showAlert(msg + '을(를) 확인해주세요.', 'error');
        }
      }
    }
    setIsLoading(true);
    dispatch(setInputInfo({ ...inputInfo, crAmt: carInfo.slAmt }));
    setTimeout(() => {}, 1000);
    Router.push(`/homeService/${target}?dlrPrdId=${dlrPrdId}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  useEffect(() => {
    if (policyList) {
      policyList.map((v) => {
        if (v.tmsDiv === '0420') {
          // let html = '';
          // v.tmsCntn.split('\n').map((item) => {
          //   html += (
          //     <span>
          //       {item}
          //       <br />
          //     </span>
          //   );
          // });
          // setPolicy(html);
          setPolicy(v.tmsCntn);
        }
      });
    }
  }, [policyList]);

  useEffect(() => {
    if (carInfo === null) {
      dispatch(getCarInfo(dlrPrdId));
      dispatch(getCarHistory({ crNo: carInfo.crNo })); // 보험이력
      dispatch(getPerfomence(carInfo.perfInspId)); // 성능점검기록부
      dispatch(getAtbInsp(carInfo.atbInspNo)); // 오토벨진단결과
    }
  }, [carInfo]);

  if (hasMobile) {
    //닫기, 더보기
    const [isActive, setIsActive] = useState(false);
    const handleActive = useCallback(
      (e) => {
        e.preventDefault();
        setIsActive((prevActive) => !prevActive);
      },
      [isActive]
    );

    // 풀페이지 팝업 Start
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpPop01, setFpPop01] = useState(false); //  팝업
    const [fpPop02, setFpPop02] = useState(false); //  팝업
    const [fpPop03, setFpPop03] = useState(false); //  팝업
    const [fpTerms, setFpTerms] = useState(false); //  팝업
    const [fpBottom, setFpBottom] = useState(24);

    //(모바일) 다음단계 버튼 활성화
    const [isNextAble, setIsNextAble] = useState(false);
    useEffect(() => {
      // 4개의 팝업이 체크되면 다음으로 이동이 활성화됨 : 기획 추가될 가능성이 높지만 일단 보류
      // 오토벨 진단결과 존재 유무에 대해 로직이 엇갈리고 있으므로 확인필요함.
      // 1. 화면표시 : carInfo?.lvstdCrYn === 'Y'
      // 2. 데이터연결 : autobellInsp
      if (performancePop && chkPop2 && chkPop3 && chkPop4) setIsNextAble(true);
      else if (!(carInfo?.lvstdCrYn === 'Y') && performancePop && chkPop2 && chkPop4) setIsNextAble(true);
      else {
        setIsNextAble(false);
      }
    }, [performancePop, chkPop2, chkPop3, chkPop4]);

    const handleNextStepPage = useCallback((checkAble) => (e) => {
      if (checkAble) nextStep(e, 'choiceGuarantee');
      else e.preventDefault();
    });

    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'f1') {
          if (!perfomence) {
            showAlert('등록된 성능점검 기록부가 없습니다.', 'error');
            setPerformancePop(true); // 기록은 없지만 고객이 보았다고 간주한다.
            return;
          }
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '성능점검기록부',
              options: ['close']
            }
          });
          setFpBottom(0);
          setFpPop01(true);
          setFpPop02(false);
          setFpPop03(false);
          setFpTerms(false);
          setPerformancePop(true);
        } else if (name === 'f2') {
          if (!carHistory) {
            showAlert('조회 가능한 보험이력이 없습니다.', 'error');
            setChkPop2(true); // 기록은 없지만 고객이 보았다고 간주한다.
            return;
          }
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '중고차 사고이력 정보 보고서',
              options: ['close']
            }
          });
          setFpBottom(24);
          setFpPop01(false);
          setFpPop02(true);
          setFpPop03(false);
          setFpTerms(false);
          setChkPop2(true);
        } else if (name === 'f3') {
          if (!autobellInsp) {
            showAlert('등록된 오토벨 진단결과가 없습니다.', 'error');
            setChkPop3(true); // 기록은 없지만 고객이 보았다고 간주한다.
            return;
          }
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '오토벨 상세진단서',
              options: ['close']
            }
          });
          setFpBottom(24);
          setFpPop01(false);
          setFpPop02(false);
          setFpPop03(true);
          setFpTerms(false);
          setChkPop3(true);
        } else if (name === 'terms') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '홈서비스 환불약관',
              options: ['close']
            }
          });
          setFpBottom(24);
          setFpPop01(false);
          setFpPop02(false);
          setFpPop03(false);
          setFpTerms(true);
          setChkPop4(true);
        }
      },
      [dispatch]
    );

    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);

    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={1} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-detail">
            <div className="service-car-info">
              <div className="img-wrap">
                <img src={carInfo.crPhtURL ? `${imgUrl}${carInfo.crPhtURL}` : ''} alt="홈서비스 차량 이미지" />
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="22.5%" />
                  <col width="27.5%" />
                  <col width="22.5%" />
                  <col width="27.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량명</th>
                    <td colSpan="4">{carInfo?.crNm}</td>
                  </tr>
                  {isActive && (
                    <>
                      <tr>
                        <th>금액</th>
                        <td colSpan="4">{nf.format(carInfo?.slAmt / 10000)}만원</td>
                      </tr>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="4">{carInfo?.crNo}</td>
                      </tr>
                      <tr>
                        <th>차량연식</th>
                        <td>{carInfo?.frmYyyy}</td>
                        <th>연료</th>
                        <td>{carInfo?.fuelNm}</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>{nf.format(carInfo?.drvDist)}km</td>
                        <th>배기량</th>
                        <td>{nf.format(carInfo?.dspl)}cc</td>
                      </tr>
                      <tr>
                        <th>변속기</th>
                        <td>{carInfo?.mssNm}</td>
                        <th>차종</th>
                        <td>{carInfo?.crTypeNm}</td>
                      </tr>
                      <tr>
                        <th>사고유무</th>
                        <td>{carInfo?.crAcdtYn}</td>
                        <th>색상</th>
                        <td>{carInfo?.crClrNm}</td>
                      </tr>
                      <tr>
                        <th>압류저당</th>
                        <td>{carInfo?.szrMorCnt ? carInfo?.szrMorCnt : 0}</td>
                        <th>제시번호</th>
                        <td>{carInfo?.crPrsnNum}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <Button
                size="full"
                line="gray"
                radius={true}
                title={isActive ? '닫기' : '더보기'}
                height={38}
                fontSize={14}
                marginTop={8}
                iconType={isActive ? 'arrow-top-gray' : 'arrow-bottom-gray'}
                onClick={handleActive}
              />
            </div>
            <ul className="chk-info-wrap">
              <CheckBoxItem id="chk-performance" onClick={handleFullpagePopup('f1')}>
                <p className="ico">
                  <i className="ico-checking" />
                </p>
                <p>차량성능, 상태점검기록부를 확인하셨습니까?</p>
              </CheckBoxItem>
              <CheckBoxItem id="chk-insurance" onClick={handleFullpagePopup('f2')}>
                <p className="ico">
                  <i className="ico-insurance" />
                </p>
                <p>보험이력을 확인하셨습니까?</p>
              </CheckBoxItem>
              {carInfo?.lvstdCrYn === 'Y' ? (
                <CheckBoxItem id="chk-autobel" onClick={handleFullpagePopup('f3')}>
                  <p className="ico">
                    <i className="ico-result" />
                  </p>
                  <p>현대 오토벨 진단결과를 확인하셨습니까?</p>
                </CheckBoxItem>
              ) : (
                <></>
              )}
              <CheckBoxItem id="chk-refundterms" onClick={handleFullpagePopup('terms')}>
                <p className="ico">
                  <i className="ico-refund" />
                </p>
                <p>홈서비스 환불약관을 확인하셨습니까?</p>
              </CheckBoxItem>
            </ul>
          </div>
        </div>
        <Button
          className="fixed"
          size="full"
          background="blue80"
          title="다음 단계로 (보증상품 선택)"
          background={isNextAble ? 'blue80' : 'gray'}
          title={isNextAble ? '다음 단계로 (보증상품 선택)' : '위 항목을 확인해주세요.'}
          onClick={handleNextStepPage(isNextAble)}
        />
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpBottom}>
          {fpPop01 && (
            <CarPerformance
              perfData={perfomence}
              onChange={() => {}}
              callback={(e) => {
                CloseFpPop(e);
              }}
            />
          )}
          {fpPop02 && <CarAccidentHistory accidData={carHistory} />}
          {fpPop03 && <DetailDiagnosis inspData={autobellInsp} />}
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{policyList.length > 0 ? ReactHtmlParser(policyList[0].tmsCntn) : ''}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{ paddingTop: 103 }}>홈서비스 신청</h3>
          <p>구매할 차량정보를 확인하고, EW상품과 예상결제금액을 확인하세요.</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={1} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-detail">
          <div className="service-car-info">
            <div className="service-car-img" style={{ float: 'left', lineHeight: '330px', maxWidth: '410px' }}>
              <img src={carInfo?.crPhtURL ? `${imgUrl}${carInfo?.crPhtURL}` : ''} alt="홈서비스 차량 이미지" style={{ verticalAlign: 'middle', maxWidth: 'inherit' }} />
            </div>
            <div style={{ float: 'right' }}>
              <div className="service-car-tit" style={{ marginBottom: '35px' }}>
                <span className="fl" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {carInfo?.crNm}
                </span>
                <span className="price-tp2 fr" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                  {nf.format(carInfo?.slAmt / 10000)}
                  <span className="won" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    만원
                  </span>
                </span>
              </div>

              <table summary="홈서비스 차량 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">홈서비스 차량 정보</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>{carInfo?.crNo}</td>
                    <th>연료</th>
                    <td>{carInfo?.fuelNm}</td>
                  </tr>
                  <tr>
                    <th>연식</th>
                    <td>{carInfo?.frmYyyy} 년식</td>
                    <th>배기량</th>
                    <td>{nf.format(carInfo?.dspl)} cc</td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td>{nf.format(carInfo?.drvDist)} km</td>
                    <th>차종</th>
                    <td>{carInfo?.crTypeNm}</td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td>{carInfo?.mssNm}</td>
                    <th>색상</th>
                    <td>{carInfo?.crClrNm}</td>
                  </tr>
                  <tr>
                    <th>사고유무</th>
                    <td>{carInfo?.crAcdtYn}</td>
                    <th>압류/저당</th>
                    <td>{carInfo?.szrMorCnt ? carInfo?.szrMorCnt : 0}</td>
                  </tr>
                  <tr>
                    <th>제시번호</th>
                    <td style={{ borderRight: 'solid 1px #e7e7e7' }}>{carInfo?.crPrsnNum}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <ul className="chk-info-wrap">
            <CheckBoxItem id="chk-performance" name="perfomence" checked={checkArr ? checkArr[0] : false} onChange={onChangeCheckBox}>
              <p>
                차량성능, 상태점검기록부를
                <br />
                확인하셨습니까?
              </p>
              <p className="ico">
                <i className="ico-checking" />
              </p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-insurance" name="carHistory" checked={checkArr ? checkArr[1] : false} onChange={onChangeCheckBox}>
              <p>
                보험이력을
                <br />
                확인하셨습니까?
              </p>
              <p className="ico">
                <i className="ico-insurance" />
              </p>
            </CheckBoxItem>
            {carInfo?.lvstdCrYn === 'Y' ? (
              <CheckBoxItem id="chk-autobel" name="autobellInsp" checked={checkArr ? checkArr[2] : false} onChange={onChangeCheckBox}>
                <p>
                  현대 오토벨 진단결과를
                  <br />
                  확인하셨습니까?
                </p>
                <p className="ico">
                  <i className="ico-result" />
                </p>
              </CheckBoxItem>
            ) : (
              <></>
            )}
            <CheckBoxItem id="chk-refundterms" name="hsvcPolicy" checked={checkArr ? checkArr[3] : false} onChange={onChangeCheckBox}>
              <p>
                홈서비스 환불약관을
                <br />
                확인하셨습니까?
              </p>
              <p className="ico">
                <i className="ico-refund" />
              </p>
            </CheckBoxItem>
          </ul>
        </div>
        <Buttons align="right" marginTop={60}>
          <Button size="big" background="blue80" title="다음 단계로" sub="(보증상품선택)" className="ws1" width={240} height={72} onClick={(e) => nextStep(e, 'choiceGuarantee')} />
        </Buttons>
      </div>
      <RodalPopup show={performancePop} type={'fade'} closedHandler={handleClosePerformancePop} title="성능점검기록부" mode="normal" size="large">
        <CarPerformance perfData={perfomence} onChange={onClosePerformance} />
      </RodalPopup>
      <RodalPopup show={chkPop2} type={'fade'} closedHandler={handleCloseChkPop2} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory accidData={carHistory} />
      </RodalPopup>
      <RodalPopup show={chkPop3} type={'fade'} closedHandler={handleCloseChkPop3} title="오토벨 진단결과" mode="normal" size="large">
        <DetailDiagnosis inspData={autobellInsp} />
      </RodalPopup>
      <RodalPopup show={chkPop4} type={'fade'} closedHandler={handleCloseChkPop4} title="홈서비스 환불약관" mode="normal" size="large">
        <div className="con-wrap frminbox">
          <Editor value={policy ? policy : ''} editing={false} />
        </div>
        {/* <div className="con-wrap frminbox">{policy ? ReactHtmlParser(policy) : ''}</div> */}
        {/* {policyList &&
          policyList.map((v) => {
            if (v.tmsDiv === '0420') {
              return (
                <div className="con-wrap">
                  {v.tmsCntn.split('\n').map((item, index) => {
                    return (
                      <span key={index} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all' }}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </div>
              );
            }
          })} */}
      </RodalPopup>
    </AppLayout>
  );
};

HomeServiceCarInfo.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getCarInfo(query.dlrPrdId));
  await reduxStore.dispatch(getPolicy({ tmsTp: '0400', tmsSbj: '0020', tmsDiv: '0420' }));

  const carInfo = reduxStore.getState().home.carInfo;
  await reduxStore.dispatch(getCarHistory({ crNo: carInfo.crNo })); // 보험이력
  await reduxStore.dispatch(getPerfomence(carInfo.perfInspId)); // 성능점검기록부
  await reduxStore.dispatch(getAtbInsp(carInfo.atbInspNo)); // 오토벨진단결과

  return {
    query
  };
};

export default withRouter(HomeServiceCarInfo);
