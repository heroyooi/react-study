import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarNameMod from '@src/components/common/CarNameMod';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import PopUpStudioReservation from '@src/components/mypage/dealer/DealerProdList/popUpStudioReservation';
import PopUpShotReservation from '@src/components/mypage/dealer/DealerProdList/popUpShotReservation';

import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const PhotographAppointmentIndex = memo(() => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [shotReservePopupShow, setShotReservePopupShow, openShotReservePopup, closeShotReservePopup] = useRodal(false);
  const [studioReservePopupShow, setStudioReservePopupShow, openStudioReservePopup, closeStudioReservePopup] = useRodal(false, true);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="mypage-state-sec dealer-live-sec info">
          <div className="top-banner">
            <p>
              고객의 선택,
              <br />
              라이브 스튜디오
              <br />왜 이용해야 할까요?
            </p>
          </div>

          <div className="info-wrap">
            <div className="info-cont">
              <p className="tit3 mt0">WEB, MOBILE, APP 서비스의 최상단 프리미엄 Zone 노출을 통해 광고 효과를 극대화 합니다.</p>
              <div className="img-wrap" />
              <div className="img-wrap" />

              <p className="tit3">기본 진단 외 66가지 추가 기능 진단을 통해 차량에 대한 고객의 만족도 및 신뢰도를 얻을 수 있습니다.</p>
              <div className="img-wrap" />

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
                    <td>
                      외부 라이트, 계기판 등, 메모리 시트, 전동 시트조절, 열선 스티어링, 창문 개폐, 썬루프, 경적, 시트 열선, 통풍, 마사지, 12v 충전 단자/USB, 안전벨트, 에어컨/히터, 네비게이션, 후방
                      카메라, 360 어라운드 뷰, 주차 보조 시스템, 컨버터블, 스피커, 라디오/DMB, 블루투스, 헤드업 디스플레이, 뒷좌석 엔터테이먼트
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="info-cont content-border">
              <h4 className="tit3 mb16">진단 등록 이용 절차</h4>
              <ul className="info-use-step">
                <li>
                  <span className="ico" />
                  <span className="tit">
                    <em>1. 온라인 예약</em>
                    원하는 날짜와 시간을 예약하세요
                  </span>
                </li>
                <li>
                  <span className="ico" />
                  <span className="tit">
                    <em>2. 결제</em>
                    예약시 선결제로 진행됩니다.
                  </span>
                </li>
                <li>
                  <span className="ico" />
                  <span className="tit">
                    <em>3. 촬영 및 진단</em>
                    예약지점 방문 시 평가사가 차량을 진단합니다.
                  </span>
                </li>
                <li>
                  <span className="ico" />
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
                          <span className="tit">
                            <i className="ico-dot" /> 기본서비스
                          </span>
                          <span>
                            차량 최상위 노출66가지 추가 진단
                            <br />
                            EW보험 무료 가입
                          </span>
                        </li>
                        <li>
                          <span className="tit">
                            <i className="ico-dot" /> 부가서비스
                          </span>
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
                    <h3>
                      <i className="ico-dot bg-black" />
                      Live studio
                    </h3>
                    <em>라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스가 제공되며 등록된 차량은 프리미엄 존에 노출됩니다.</em>
                  </li>
                  <li>
                    <h3>
                      <i className="ico-dot bg-black" />
                      Live Shot
                    </h3>
                    <em>전문 차량 평가사가 직접 방문하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 라이브 스튜디오와 동일하게 프리미엄 존에 노출됩니다.</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Buttons align="center" marginTop={8}>
            <Button
              size="big"
              className="ws2"
              background="blue20"
              color="blue80"
              radius={true}
              title="Live Studio"
              sub="예약하기"
              width={160}
              href="/mypage/dealer/sellcar/photographAppointment?type=reg"
              nextLink={true}
            />
            <Button
              size="big"
              className="ws2"
              background="blue80"
              radius={true}
              title="Live Shot"
              sub="예약하기"
              width={160}
              href="/mypage/dealer/sellcar/liveShotAppointment?type=reg"
              nextLink={true}
            />
          </Buttons>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-live-sec info">
          <div className="top-banner">
            <p className="sub-tit">
              고객의 선택,
              <br />
              라이브 스튜디오 왜 이용해야 할까요?
            </p>
          </div>

          <div className="info-wrap">
            <p className="sub-tit">WEB, MOBILE, APP 서비스의 최상단 프리미엄 Zone 노출을 통해 광고 효과를 극대화 합니다.</p>
            <div className="img-wrap" />

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
                  <th rowSpan="3">
                    66가지
                    <br />
                    차량진단
                  </th>
                  <th>외장</th>
                  <td>
                    앞유리 상태, 뒷유리 상태, 창문상태, 스티커 제거, 광택상태, 와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태, 휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 12가지 항목
                  </td>
                </tr>
                <tr>
                  <th>실내</th>
                  <td>
                    실내상태, 실내세정 확인, 금연차량여부, 글로스 박스 상태, 대시보도, 실내장식, 룸미러, 거울, 유리창 내면, 트렁크, 모든 시트, 모든 매트, 안전벨트 청결 상태, 악취, 루프 라이닝,
                    보조키, 매뉴얼, 스페어타이어, 도어및 내장 트림, 스티커 제거 상태 총 19가지 항목
                  </td>
                </tr>
                <tr>
                  <th>기능</th>
                  <td>
                    모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링, 창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동,
                    안전벨트, 에어컨, 히터, 네비게이션, 후방카메라, 360 어라운드뷰, 주차 보조 시스템 총 35가지 항목
                  </td>
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
                  <td>
                    외부 라이트, 계기판 등, 메모리 시트, 전동 시트조절, 열선 스티어링, 창문 개폐, 썬루프, 경적, 시트 열선, 통풍, 마사지, 12v 충전 단자/USB, 안전벨트, 에어컨/히터, 네비게이션, 후방
                    카메라, 360 어라운드 뷰, 주차 보조 시스템, 컨버터블, 스피커, 라디오/DMB, 블루투스, 헤드업 디스플레이, 뒷좌석 엔터테이먼트
                  </td>
                </tr>
              </tbody>
            </table>

            <h4>진단 등록 이용 절차</h4>
            <ul>
              <li>
                <span className="ico" />
                <span className="tit">
                  <em>1. 온라인 예약</em>
                  원하는 날짜와
                  <br />
                  시간을 예약하세요
                </span>
              </li>
              <li>
                <span className="ico" />
                <span className="tit">
                  <em>2. 결제</em>
                  예약시 선결제로
                  <br />
                  진행됩니다.
                </span>
              </li>
              <li>
                <span className="ico" />
                <span className="tit">
                  <em>3. 촬영 및 진단</em>
                  예약지점 방문 시<br />
                  평가사가 차량을
                  <br />
                  진단합니다.
                </span>
              </li>
              <li>
                <span className="ico" />
                <span className="tit">
                  <em>4. 광고 등록</em>
                  판매가격 상담 후<br />
                  등록되어 판매가
                  <br />
                  진행됩니다.
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
                  <td rowSpan="2">
                    차량 최상위 노출
                    <br />
                    66가지 추가 진단
                    <br />
                    EW보험 무료 가입
                  </td>
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
              <li>
                <b>Live Studio</b>
                <em>라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스가 제공되며 등록된 차량은 프리미엄 존에 노출됩니다.</em>
              </li>
              <li>
                <b>Live Shot</b>
                <em>전문 차량 평가사가 직접 방문하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 라이브 스튜디오와 동일하게 프리미엄 존에 노출됩니다.</em>
              </li>
            </ul>
          </div>
          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="예약조회 바로가기" width={200} href="/mypage/dealer/sellcar/photographAppointment" />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="Live Studio 예약하기" width={200} onClick={(e) => openStudioReservePopup(e, 'fade')} />
              <Button size="big" background="blue80" title="Live Shot 예약하기" width={200} onClick={(e) => openShotReservePopup(e, 'fade')} />
            </span>
          </Buttons>
        </div>
      </div>
      <RodalPopup show={studioReservePopupShow} type={'fade'} closedHandler={closeStudioReservePopup} isMaskAction={false} title={'라이브 스튜디오 예약'} size={'medium'} mode="normal">
        <PopUpStudioReservation onChange={closeStudioReservePopup} onClose={() => closeStudioReservePopup(false)} />
      </RodalPopup>
      <RodalPopup show={shotReservePopupShow} type={'fade'} closedHandler={closeShotReservePopup} title="Live Shot 촬영 예약" mode="normal" size="medium">
        <PopUpShotReservation onChange={closeShotReservePopup} />
      </RodalPopup>
    </AppLayout>
  );
});

PhotographAppointmentIndex.displayName = 'PhotographAppointmentIndex';
export default PhotographAppointmentIndex;
