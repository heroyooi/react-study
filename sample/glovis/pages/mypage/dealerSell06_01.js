import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarNameMod from '@src/components/common/CarNameMod';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import PageNavigator from '@src/components/common/PageNavigator';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
/*
html 변경이력
  03.17 : 증빙선택 추가  #a1 참고 부분       
*/


const DealerSell06_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [studioReservePopupShow, setStudioReservePopupShow, openStudioReservePopup, closeStudioReservePopup] = useRodal(false);
  const [shotReservePopupShow, setShotReservePopupShow, openShotReservePopup, closeShotReservePopup] = useRodal(false);
  const [liveStudioStep, setLiveStudioStep] = useState(1);
  const [liveShotStep, setLiveShotStep] = useState(1);
  const handleStep = useCallback((num, kind) => (e) => {
    e.preventDefault();
    kind === "studio" ? setLiveStudioStep(num) : setLiveShotStep(num);
  }, []);

  const [carData, setCarData] = useState(true);
  const handleResult = (result) => (e) => {
    e.preventDefault();
    setCarData(result);
  }

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Studio 안내',
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
    return (
      <AppLayout>
        <div className="mypage-state-sec dealer-live-sec info">

          <div className="top-banner">
            <p>고객의 선택,<br />라이브 스튜디오<br />왜 이용해야 할까요?</p>
          </div>
          
          <div className="info-wrap">
            <div className="info-cont">
              <p className="tit3 mt0">WEB, MOBILE, APP 서비스의 최상단 프리미엄 Zone 노출을 통해 광고 효과를 극대화 합니다.</p>
              <div className="img-wrap"></div>
              <div className="img-wrap"></div>

              <p className="tit3">기본 진단 외 66가지 추가 기능 진단을 통해 차량에 대한 고객의 만족도 및 신뢰도를 얻을 수 있습니다.</p>
              <div className="img-wrap"></div>

              <p className="tit4">EW보증 상품을 통해 주요 22가지 기능에 대한 품질 신뢰 및 판매 효율성 향상</p>
              <table className="table-tp1 th-c" summary="세부 점검 에 대한 내용">
                <caption className="away">세부 점검 </caption>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>세부 점검 항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tx-c">기능</td>
                    <td>외부 라이트, 계기판 등, 메모리 시트, 전동 시트조절, 열선 스티어링, 창문 개폐, 썬루프, 경적, 시트 열선, 통풍, 마사지, 12v 충전 단자/USB, 안전벨트, 에어컨/히터, 네비게이션, 후방 카메라, 360 어라운드 뷰, 주차 보조 시스템, 컨버터블, 스피커, 라디오/DMB, 블루투스, 헤드업 디스플레이, 뒷좌석 엔터테이먼트</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="info-cont content-border">
              <h4 className="tit3 mb16">진단 등록 이용 절차</h4>
              <ul className="info-use-step">
                <li>
                  <span className="ico"></span>
                  <span className="tit">
                    <em>1. 온라인 예약</em>
                    원하는 날짜와 시간을 예약하세요
                  </span>
                </li>
                <li>
                  <span className="ico"></span>
                  <span className="tit">
                    <em>2. 결제</em>
                    예약시 선결제로 진행됩니다.
                  </span>
                </li>
                <li>
                  <span className="ico"></span>
                  <span className="tit">
                    <em>3. 촬영 및 진단</em>
                    예약지점 방문 시 평가사가 차량을 진단합니다.
                  </span>
                </li>
                <li>
                  <span className="ico"></span>
                  <span className="tit">
                    <em>4. 광고 등록</em>
                    판매가격 상담 후 등록되어 판매가 진행됩니다.
                  </span>
                </li>
              </ul>
            </div>

            <div className="info-cont content-border">
              <h4 className="tit3 mb16">서비스 이용권 안내</h4>
              <table className="table-tp1 th-c td-c" summary="서비스 이용권 안내에 대한 내용">
                <caption className="away">서비스 이용권 안내</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="32%" />
                  <col width="35%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>기본 가격</th>
                    <th>제공 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tl">Live Studio</td>
                    <td>165,000</td>
                    <td rowSpan="2">3개월</td>
                  </tr>
                  <tr>
                    <td className="tl">Live Shot</td>
                    <td>110,000</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="tl">
                      <ul className="tb-essential">
                        <li>
                          <span className="tit"><i className="ico-dot"></i> 기본서비스</span>
                          <span>차량 최상위 노출66가지 추가 진단<br />EW보험 무료 가입</span>
                        </li>
                        <li>
                          <span className="tit"><i className="ico-dot"></i> 부가서비스</span>
                          <span>업데이트 24회 / 1일당</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point border mt16">
                <ul>
                  <li>
                    <h3><i className="ico-dot bg-black"></i>Live studio</h3>
                    <em>라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스가 제공되며 등록된 차량은 프리미엄 존에 노출됩니다.</em>
                  </li>
                  <li>
                    <h3><i className="ico-dot bg-black"></i>Live Shot</h3>
                    <em>전문 차량 평가사가 직접 방문하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 라이브 스튜디오와 동일하게 프리미엄 존에 노출됩니다.</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Buttons align="center" marginTop={8}>
            <Button size="big" className="ws2" background="blue20" color="blue80" radius={true} title="Live Studio" sub="예약하기" width={160} />
            <Button size="big" className="ws2" background="blue80" radius={true} title="Live Studio" sub="예약하기" width={160} />
          </Buttons>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-live-sec info">
          <div className="top-banner">
            <p className="sub-tit">고객의 선택,<br />라이브 스튜디오 왜 이용해야 할까요?</p>
          </div>

          <div className="info-wrap">
            <p className="sub-tit">WEB, MOBILE, APP 서비스의 최상단 프리미엄 Zone 노출을 통해 광고 효과를 극대화 합니다.</p>
            <div className="img-wrap"></div>

            <p className="sub-tit">기본 진단 외 66가지 추가 기능 진단을 통해 차량에 대한 고객의 만족도 및 신뢰도를 얻을 수 있습니다.</p>
            <table className="table-tp1 th-c" summary="66가지 차량진단에 대한 내용">
              <caption className="away">66가지 차량진단</caption>
              <colgroup>
                <col width="13%" />
                <col width="13%" />
                <col width="74%" />
              </colgroup>
              <tbody>
                <tr>
                  <th rowSpan="3">66가지<br />차량진단</th>
                  <th>외장</th>
                  <td>앞유리 상태, 뒷유리 상태, 창문상태, 스티커 제거, 광택상태,  와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태, 휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 12가지 항목</td>
                </tr>
                <tr>
                  <th>실내</th>
                  <td>실내상태, 실내세정 확인, 금연차량여부, 글로스 박스 상태, 대시보도, 실내장식, 룸미러, 거울, 유리창 내면, 트렁크, 모든 시트, 모든 매트, 안전벨트 청결 상태, 악취, 
루프 라이닝, 보조키, 매뉴얼, 스페어타이어, 도어및 내장 트림, 스티커 제거 상태 총 19가지 항목</td>
                </tr>
                <tr>
                  <th>기능</th>
                  <td>모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링, 창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동, 안전벨트, 에어컨, 히터, 네비게이션, 후방카메라, 360 어라운드뷰, 주차 보조 시스템 총 35가지 항목</td>
                </tr>
              </tbody>
            </table>

            <p className="sub-tit">EW보증 상품을 통해 주요 22가지 기능에 대한 차량 품질 신뢰도가 향상되어 더욱 효율적인 차량 판매가 가능합니다.</p>
            <table className="table-tp1 th-c" summary="세부 점검 에 대한 내용">
              <caption className="away">세부 점검 </caption>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>세부 점검 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tx-c">기능</td>
                  <td>외부 라이트, 계기판 등, 메모리 시트, 전동 시트조절, 열선 스티어링, 창문 개폐, 썬루프, 경적, 시트 열선, 통풍, 마사지, 12v 충전 단자/USB, 안전벨트, 에어컨/히터, 네비게이션, 후방 카메라, 360 어라운드 뷰, 주차 보조 시스템, 컨버터블, 스피커, 라디오/DMB, 블루투스, 헤드업 디스플레이, 뒷좌석 엔터테이먼트</td>
                  </tr>
              </tbody>
            </table>
            
            <h4>진단 등록 이용 절차</h4>
            <ul>
              <li>
                <span className="ico"></span>
                <span className="tit">
                  <em>1. 온라인 예약</em>
                  원하는 날짜와<br />시간을 예약하세요
                </span>
              </li>
              <li>
                <span className="ico"></span>
                <span className="tit">
                  <em>2. 결제</em>
                  예약시 선결제로<br />진행됩니다.
                </span>
              </li>
              <li>
                <span className="ico"></span>
                <span className="tit">
                  <em>3. 촬영 및 진단</em>
                  예약지점 방문 시<br />평가사가 차량을<br />진단합니다.
                </span>
              </li>
              <li>
                <span className="ico"></span>
                <span className="tit">
                  <em>4. 광고 등록</em>
                  판매가격 상담 후<br />등록되어 판매가<br />진행됩니다.
                </span>
              </li>
            </ul>

            <h4>서비스 이용권 안내</h4>
            <table className="table-tp1 th-c td-c" summary="서비스 이용권 안내에 대한 내용">
              <caption className="away">서비스 이용권 안내</caption>
              <colgroup>
                <col width="13%" />
                <col width="13%" />
                <col width="13%" />
                <col width="29.5%" />
                <col width="29.5%" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>기본 가격</th>
                  <th>제공 기간</th>
                  <th>기본 서비스</th>
                  <th>부가 서비스</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Live Studio</td>
                  <td>165,000</td>
                  <td>3개월</td>
                  <td rowSpan="2">차량 최상위 노출<br />66가지 추가 진단<br />EW보험 무료 가입</td>
                  <td rowSpan="2">업데이트 24회 / 1일당</td>
                </tr>
                <tr>
                  <td>Live Shot</td>
                  <td>110,000</td>
                  <td>3개월</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="essential-point tp2">
            <ul>
              <li><b>Live Studio</b><em>라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스가 제공되며 등록된 차량은 프리미엄 존에 노출됩니다.</em></li>
              <li><b>Live Shot</b><em>전문 차량 평가사가 직접 방문하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 라이브 스튜디오와 동일하게 프리미엄 존에 노출됩니다.</em></li>
            </ul>
          </div>
          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="예약조회 바로가기" width={200} onClick={(e) => openStudioReservePopup(e, "fade")} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="Live Studio 예약하기" width={200} onClick={(e) => openStudioReservePopup(e, "fade")} />
              <Button size="big" background="blue80" title="Live Shot 예약하기" width={200} onClick={(e) => openShotReservePopup(e, "fade")} />
            </span>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={studioReservePopupShow} type={'fade'} closedHandler={closeStudioReservePopup} title="Live Studio 촬영 예약" mode="normal" size="medium">
        <div className="popup-reserve">
          <div className="reserve-step">
            <Steps type={2} contents={['지점/예약시간 선택', '결제하기', '예약완료']} active={liveStudioStep} />
          </div>
          {liveStudioStep === 1 && (
            <div className="reserve-wrap">
              <table className="table-tp1 input search" summary="조회 영역">
                <caption className="away">조회 영역</caption>
                <tbody>
                  <tr>
                    <th>지점선택</th>
                    <td>
                      <SelectBox id="state" className="items-sbox" options={select1_list} placeHolder="서울" width={176} />
                      <em></em>
                      <SelectBox id="city" className="items-sbox" options={select1_list} placeHolder="강남" width={176} />
                    </td>
                  </tr>
                  <tr>
                    <th>날짜선택</th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'date1', value: 1, checked: true, disabled: false, title: '2019년 10월 04일(금)' },
                        { id: 'date2', value: 2, checked: false, disabled: false, title: '2019년 10월 07일(월)' }
                      ]} />
                    </td>
                  </tr>
                  <tr>
                    <th className="ver-t">시간선택</th>
                    <td>
                      <table className="table-tp1 th-c td-c" summary="시간선택 영역">
                        <caption className="away">시간선택</caption>
                        <colgroup>
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                          <col width="25%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th colSpan="2">오전</th>
                            <th colSpan="2">오후</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>09:00</td>
                            <td>예약마감</td>
                            <td className="tx-blue80"><CheckBox id='chk-time1' title='13:30' /></td>
                            <td className="tx-blue80">예약가능</td>
                          </tr>
                          <tr>
                            <td>09:30</td>
                            <td>예약마감</td>
                            <td>14:00</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td>10:00</td>
                            <td>예약마감</td>
                            <td>14:30</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td>10:30</td>
                            <td>예약마감</td>
                            <td>15:00</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td className="tx-blue80"><CheckBox id='chk-time2' title='11:30' /></td>
                            <td className="tx-blue80">예약가능</td>
                            <td>15:30</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td>12:00</td>
                            <td>예약마감</td>
                            <td>16:00</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td>12:30</td>
                            <td>예약마감</td>
                            <td>16:30</td>
                            <td>예약마감</td>
                          </tr>
                          <tr>
                            <td>13:00</td>
                            <td>예약마감</td>
                            <td>17:00</td>
                            <td>예약마감</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point">
                <ul>
                  <li>- 토·일요일 및 공휴일은 예약 불가</li>
                  <li>- 전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                  <li>- 진단지점 : 서울시 강서구 신월동 단지</li>
                </ul>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree' title='라이브 스튜디오 이용약관 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree2' title='환불규정 안내 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="essential-point tp2">
                <ul>
                  <li>지점 이용은 <b>당일/전일 예약제로 운영</b>되며, 당일 방문은 받지 않습니다.</li>
                  <li>예약시 <b>10분이내 결제가 이루어지지 않으면 예약은 취소</b>되고, 선택한 시간은 무효가 됩니다.</li>
                  <li>예약 <b>취소요구시 위약금이 발생</b>될 수 있습니다.</li>
                  <li>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                  <li>오토벨보증 이용권 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                </ul>
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(2, "studio")} />
              </Buttons>
            </div>
          )}
          {liveStudioStep === 2 && (
            <div className="reserve-wrap payment-sec method">
              <h3 className="sub-tit">이용권 정보</h3>
              <div className="point-area">
                <div className="pay-detail">
                  <div className="pick-list">
                    <ul>
                      <li>Live studio 이용권</li>
                    </ul>
                    <div className="sum">
                      <p className="price">150,000<span>원</span></p>
                    </div>
                  </div>
                </div>
                <div className="coupon-wrap">
                  <div className="coupon">
                    <CheckBox id='chk3' title='쿠폰 적용' />
                    <p>적용 가능한 보유쿠폰<span>3</span>장</p>
                  </div>
                  <RadioGroup
                    dataList={[
                      { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                      { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                      { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                    ]} defaultValue={1} size="small" mode="vertical"
                  ></RadioGroup>
                  <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
                </div>
              </div>
              <div className="last-sum">
                <ul>
                  <li>이용권금액<span>890,000<em>원</em></span></li>
                  <li>할인금액<span>12,000<em>원</em></span></li>
                  <li>최종결제금액<span>878,000<em>원 (VAT 포함)</em></span></li>
                </ul>
              </div>

              <div className="method-wrap">
                <p>결제 수단</p>
                <RadioGroup
                  dataList={[
                    { id: 'radio4', value: 1, checked: true, disabled: false, title: '신용카드' },
                    { id: 'radio5', value: 2, checked: false, disabled: false, title: '휴대전화' },
                    { id: 'radio6', value: 3, checked: false, disabled: false, title: '무통장입급' },
                    { id: 'radio7', value: 4, checked: false, disabled: false, title: '카카오페이' },
                    { id: 'radio8', value: 5, checked: false, disabled: false, title: '네이버페이' }
                  ]} defaultValue={1}
                ></RadioGroup>
              </div>

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음단계" width={172} height={60} mode="normal" onClick={handleStep(3, "studio")} />
              </Buttons>
            </div>
          )}
          {liveStudioStep === 3 && (
            <div className="reserve-wrap co-wrap">
              <p className="tit">예약이 완료되었습니다.</p>
              <p className="exp">예약 현황은 마이페이지  Live Service 촬영예약에서 확인 가능합니다.</p>
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" href="/mypage/dealerSell01" />
                <Button size="big" background="gray" title="예약조회로 이동" width={172} height={60} href="/mypage/dealerSell06" />
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>

      <RodalPopup show={shotReservePopupShow} type={'fade'} closedHandler={closeShotReservePopup} title="Live Shot 촬영 예약" mode="normal" size="medium">
        <div className="popup-reserve">
          <div className="reserve-step">
            <Steps type={2} contents={['차량정보 입력', '주소/예약시간 선택', '결제하기', '예약완료']} active={liveShotStep} />
          </div>
          {/* step01 */}
          {liveShotStep === 1 && (
            <div className="reserve-wrap">
              <table className="table-tp1 input search pd" summary="조회 영역">
                <caption className="away">조회 영역</caption>
                <tbody>
                  <tr>
                    <th>차량번호 입력</th>
                    <td>
                      <Input type="text" width={256} />
                      <Button size="big" background="gray" title="조회" width={127} marginLeft={16} onClick={handleResult(false)} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <form className="register-form">
                <fieldset>
                  <legend className="away">차량 기본 정보</legend>
                  <table className="table-tp1" summary="차량 기본 정보에 대한 내용">
                    {carData
                      ? <caption>차량 기본 정보</caption>
                      : <caption>조회되는 차량정보가 없습니다. 직접입력해주세요.</caption>}
                    <colgroup>
                      <col width="17%" />
                      <col width="23%" />
                      <col width="17%" />
                      <col width="43%" />
                    </colgroup>
                    <tbody>
                      {
                        carData
                          ? (
                            <>
                              <tr>
                                <th>차량 번호</th>
                                <td>03라4567</td>
                                <th>차량명</th>
                                <td>기아 K3 쿱 1.6 터보 GDI 프레스티지
                                <i className="ico-pencil" onClick={(e) => rodalPopupHandler(e, "fade")}></i>
                                </td>
                              </tr>
                              <tr>
                                <th>최초등록일</th>
                                <td>2017-05-07</td>
                                <th>형식 년도</th>
                                <td>2018</td>
                              </tr>
                              <tr>
                                <th>색상</th>
                                <td>검정</td>
                                <th>연료</th>
                                <td>가솔린</td>
                              </tr>
                              <tr>
                                <th>배기량</th>
                                <td>1,591 cc</td>
                                <th>차종</th>
                                <td>준중형차</td>
                              </tr>
                            </>
                          ) : (
                            <tr>
                              <th>차량번호</th>
                              <td>
                                <label htmlFor="car-num" className="hide">차량번호</label>
                                <Input type="text" value="47러0383" id="car-num" width={160} height={40} />
                              </td>
                              <th>차량명</th>
                              <td>
                                <SelectBox id="car-name" className="items-sbox" options={select1_list} width={180} height={40} placeHolder="제조사 / 모델 / 등급" />
                              </td>
                            </tr>
                          )
                      }
                    </tbody>
                  </table>
                </fieldset>
              </form>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(2, "shot")} />
              </Buttons>
              <div className="essential-point">
                <ul>
                  <li>- 토·일요일 및 공휴일은 예약 불가</li>
                  <li>- 전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                  <li>- 수입차 진단지점 :강남,강서,부천상동,북천안,대전,광주,장한평,인천,서부산,광명,SAG성능제휴장,수원,김포,대구동구,<br />부천,서운,유량,양천로,남대구지점,북대구</li>
                </ul>
              </div>
            </div>
          )}
          {liveShotStep === 2 && (
            <div className="reserve-wrap">
              <table className="table-tp1 input search" summary="조회 영역">
                <caption className="away">조회 영역</caption>
                <colgroup>
                  <col width="13.1%" />
                  <col width="86.9%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>방문주소 입력</th>
                    <td>
                      <span className="bridge2">
                        <Input type="text" width={387} />
                        <Button size="big" background="gray" title="주소검색" width={160} marginLeft={16} />
                      </span>
                      <Input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>방문일자 선텍</th>
                    <td>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date1', value: 1, checked: true, disabled: false, title: '2019년 10월 04일(금) 오전' },
                          { id: 'date2', value: 2, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date3', value: 3, checked: true, disabled: false, title: '2019년 10월 07일(월) 오전' },
                          { id: 'date4', value: 4, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date5', value: 5, checked: true, disabled: false, title: '2019년 10월 04일(월) 오전' },
                          { id: 'date6', value: 6, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point">
                <ul>
                  <li>- 예약일자 다음날부터 3일후까지 예약이 가능합니다.</li>
                  <li>- 토·일요일 및 공휴일은 예약 불가</li>
                </ul>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree3' title='라이브샷 이용약관 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree4' title='환불규정 안내 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="essential-point tp2">
                <ul>
                  <li>지점 이용은 <b>당일/전일 예약제로 운영</b>되며, 당일 방문은 받지 않습니다.</li>
                  <li>예약시 <b>10분이내 결제가 이루어지지 않으면 예약은 취소</b>되고, 선택한 시간은 무효가 됩니다.</li>
                  <li>예약 <b>취소요구시 위약금이 발생</b>될 수 있습니다.</li>
                  <li>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                  <li>오토벨보증 이용권 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                </ul>
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(3, "shot")} />
              </Buttons>
            </div>
          )}
          {liveShotStep === 3 && (
            <div className="reserve-wrap payment-sec method">
              <h3 className="sub-tit">이용권 정보</h3>
              <div className="point-area">
                <div className="pay-detail">
                  <div className="pick-list">
                    <ul>
                      <li>Live shot 이용권</li>
                    </ul>
                    <div className="sum">
                      <p className="price">150,000<span>원</span></p>
                    </div>
                  </div>
                </div>
                <div className="coupon-wrap">
                  <div className="coupon">
                    <CheckBox id='chk4' title='쿠폰 적용' />
                    <p>적용 가능한 보유쿠폰<span>3</span>장</p>
                  </div>
                  <RadioGroup
                    dataList={[
                      { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                      { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                      { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                    ]} defaultValue={1} size="small" mode="vertical"
                  ></RadioGroup>
                  <p className="ex">
                    신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.
                  </p>
                </div>
              </div>
              <div className="last-sum">
                <ul>
                  <li>이용권금액<span>24,000<em>원</em></span></li>
                  <li>할인금액<span>0<em>원</em></span></li>
                  <li>최종결제금액<span>24,000<em>원 (VAT 포함)</em></span></li>
                </ul>
              </div>

              <div className="method-wrap">
                <p>결제 수단</p>
                <RadioGroup
                  dataList={[
                    { id: 'radio4', value: 1, checked: true, disabled: false, title: '신용카드' },
                    { id: 'radio5', value: 2, checked: false, disabled: false, title: '휴대전화' },
                    { id: 'radio6', value: 3, checked: false, disabled: false, title: '무통장입급' },
                    { id: 'radio7', value: 4, checked: false, disabled: false, title: '카카오페이' },
                    { id: 'radio8', value: 5, checked: false, disabled: false, title: '네이버페이' }
                  ]} defaultValue={1}
                ></RadioGroup>
              </div>

              {/* #a1 증빙선택 추가 start */}   
              <div className="method-wrap col2  mt40">
                <p>증빙 선택</p>
                <RadioGroup
                  dataList={[
                    { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                    { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }                                  
                  ]} defaultValue={1}
                ></RadioGroup>
                <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
              </div>
               {/* #a1 증빙선택 추가 end */}  

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음단계" width={172} height={60} mode="normal" onClick={handleStep(4, "shot")} />
              </Buttons>
            </div>
          )}
          {liveShotStep === 4 && (
            <div className="reserve-wrap co-wrap">
              <p className="tit">예약이 완료되었습니다.</p>
              <p className="exp">예약 현황은 마이페이지  Live Service 촬영예약에서 확인 가능합니다.</p>
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" href="/mypage/dealerSell01" />
                <Button size="big" background="gray" title="예약조회로 이동" width={172} height={60} href="/mypage/dealerSell06" />
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerSell06_01