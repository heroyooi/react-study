import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import DetailDiagnosis from '@src/components/common/popup/DetailDiagnosis';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const ServiceStep01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [performancePop, setPerformancePop, openPerformancePop, closePerformancePop] = useRodal(false, true);
  const [historyPop, setHistoryPop, openHistoryPop, closeHistoryPop] = useRodal(false, true);
  const [autobellPop, setAutobellPop, openAutobellPop, closeAutobellPop] = useRodal(false, true);
  const [refundPop, setRefundPop, openRefundPop, closeRefundPop] = useRodal(false, true);
  
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

    //닫기, 더보기
    const [isActive, setIsActive] = useState(false);
    const handleActive = useCallback((e) => {
      e.preventDefault();
      setIsActive(prevActive => !prevActive)
    }, [isActive]);

    // 풀페이지 팝업 Start
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpPop01, setFpPop01] = useState(false); //  팝업
    const [fpPop02, setFpPop02] = useState(false); //  팝업
    const [fpPop03, setFpPop03] = useState(false); //  팝업
    const [fpTerms, setFpTerms] = useState(false); //  팝업

    const handleFullpagePopup = useCallback((name) => e => {
      e.preventDefault();
      if (name === 'f1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '성능점검기록부',
            options: ['close']
          }
        });
        setFpPop01(true);
        setFpPop02(false);
        setFpPop03(false);
        setFpTerms(false);
      }
      else if (name === 'f2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '중고차 사고이력 정보 보고서',
            options: ['close']
          }
        });
        setFpPop01(false);
        setFpPop02(true);
        setFpPop03(false);
        setFpTerms(false);
      } else if (name === 'f3') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '오토벨 상세진단서',
            options: ['close']
          }
        });
        setFpPop01(false);
        setFpPop02(false);
        setFpPop03(true);
        setFpTerms(false);
      }
      else if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '홈서비스 환불약관',
            options: ['close']
          }
        });
        setFpPop01(false);
        setFpPop02(false);
        setFpPop03(false);
        setFpTerms(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [dispatch]);

    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);
    
    return (
      <AppLayout>
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={1} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-detail">
            <div className="service-car-info">
              <div className="img-wrap">
                <img src="/images/mobile/dummy/service-car-img.png" alt="홈서비스 차량 이미지" />
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
                    <td colSpan="4">벤츠 E-클래스 W213 E200 아방가르드</td>
                  </tr>
                  {
                    isActive && (
                      <>
                        <tr>
                          <th>금액</th>
                          <td colSpan="4">1,234만원</td>
                        </tr>
                        <tr>
                          <th>차량번호</th>
                          <td colSpan="4">12가 3456</td>
                        </tr>
                        <tr>
                          <th>차량연식</th>
                          <td>2016</td>
                          <th>연료</th>
                          <td>디젤</td>
                        </tr>
                        <tr>
                          <th>주행거리</th>
                          <td>4,380km</td>
                          <th>배기량</th>
                          <td>1,999cc</td>
                        </tr>
                        <tr>
                          <th>변속기</th>
                          <td>오토</td>
                          <th>차종</th>
                          <td>RV</td>
                        </tr>
                        <tr>
                          <th>사고유무</th>
                          <td>무사고</td>
                          <th>색상</th>
                          <td>검정</td>
                        </tr>
                        <tr>
                          <th>압류저당</th>
                          <td>무</td>
                          <th>제시번호</th>
                          <td>21363842</td>
                        </tr>
                      </>
                    )
                  }

                </tbody>
              </table>
              <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} fontSize={14} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} />
            </div>
            <ul className="chk-info-wrap">
              <CheckBoxItem id="chk-performance" onClick={handleFullpagePopup('f1')} >
                <p className="ico"><i className="ico-checking"></i></p>
                <p>차량성능, 상태점검기록부를 확인하셨습니까?</p>
              </CheckBoxItem>
              <CheckBoxItem id="chk-insurance" onClick={handleFullpagePopup('f2')}>
                <p className="ico"><i className="ico-insurance"></i></p>
                <p>보험이력을 확인하셨습니까?</p>
              </CheckBoxItem>
              <CheckBoxItem id="chk-autobel" onClick={handleFullpagePopup('f3')}>
                <p className="ico"><i className="ico-result"></i></p>
                <p>현대 오토벨 진단결과를 확인하셨습니까?</p>
              </CheckBoxItem>
              <CheckBoxItem id="chk-refundterms" onClick={handleFullpagePopup('terms')}>
                <p className="ico"><i className="ico-refund"></i></p>
                <p>홈서비스 환불약관을 확인하셨습니까?</p>
              </CheckBoxItem>
            </ul>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="다음 단계로 (보증상품 선택)" href="serviceStep02" />
        <MobFullpagePopup active={mFullpagePopup}>
          {fpPop01 && <CarPerformanceCheck />}
          {fpPop02 && <CarAccidentHistory />}
          {fpPop03 && <DetailDiagnosis />}
          {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">내용</div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>          
          </div>)}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg"></i>
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={1} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>차량정보 확인</h4>
        </div>
        <div className="service-detail">
          <ul className="tit-wrap float-wrap">
            <li><h5>벤츠 E-클래스 W213 E200 아방가르드</h5></li>
            <li><p className="price-tp2">4,080<span className="won">만원</span></p></li>
          </ul>
          <div className="service-car-info">
            <div className="img-wrap">
              <img src="/images/dummy/service-car-img.png" alt="홈서비스 차량 이미지" />
            </div>
            <table summary="홈서비스 차량 정보에 대한 내용" className="table-tp1">
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
                  <td>00아0000</td>
                  <th>연료</th>
                  <td>디젤</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>11/16식(17년형)</td>
                  <th>배기량</th>
                  <td>2500cc</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>9,652 km</td>
                  <th>차종</th>
                  <td>RV</td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>오토</td>
                  <th>색상</th>
                  <td>검정</td>
                </tr>
                <tr>
                  <th>사고유무</th>
                  <td>무사고</td>
                  <th>압류/저당</th>
                  <td>무</td>
                </tr>
                <tr>
                  <th>제시번호</th>
                  <td>21363842937</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="chk-info-wrap">
            <CheckBoxItem id="chk-performance" checked={performancePop} onClick={openPerformancePop}>
              <p>차량성능, 상태점검기록부를<br />확인하셨습니까?</p>
              <p className="ico"><i className="ico-checking"></i></p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-insurance" checked={historyPop} onClick={openHistoryPop}>
              <p>보험이력을<br />확인하셨습니까?</p>
              <p className="ico"><i className="ico-insurance"></i></p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-autobel" checked={autobellPop} onClick={openAutobellPop}>
              <p>현대 오토벨 진단결과를<br />확인하셨습니까?</p>
              <p className="ico"><i className="ico-result"></i></p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-refundterms" checked={refundPop} onClick={openRefundPop}>
              <p>홈서비스 환불약관을<br />확인하셨습니까?</p>
              <p className="ico"><i className="ico-refund"></i></p>
            </CheckBoxItem>
          </ul>
        </div>
        <Buttons align="center" marginTop={60}>
          <Button size="big" background="blue80" title="다음 단계로" sub="(보증상품선택)" className="ws1" width={240} height={72} href="serviceStep02" />
        </Buttons>
      </div>
      <RodalPopup show={performancePop} type={'fade'} closedHandler={closePerformancePop} title="성능점검기록부" mode="normal" size="large">
        <CarPerformanceCheck />
      </RodalPopup>
      <RodalPopup show={historyPop} type={'fade'} closedHandler={closeHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory />
      </RodalPopup>
      <RodalPopup show={autobellPop} type={'fade'} closedHandler={closeAutobellPop} mode="normal" title="오토벨 상세진단서" size="large">
        <DetailDiagnosis />
      </RodalPopup>
      <RodalPopup show={refundPop} type={'fade'} closedHandler={closeRefundPop} title="환불약관" mode="normal" size="large">
        <div className="con-wrap">
          <p className="con">수급 후 적용 예정</p>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default ServiceStep01