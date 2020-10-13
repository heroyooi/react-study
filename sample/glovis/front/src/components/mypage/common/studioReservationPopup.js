/**
 * 설명 : 라이브 스튜디오 예약
 * @fileoverview 딜러마이페이지>등록차량관리>라이브스튜디오 예약
 * @requires
 * @author 김지훈
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import { select1_list } from '@src/dummy';
import { isEmpty } from 'lodash';

/**
 * 설명 : 라이브 스튜디오 예약한다.
 * @param
 * @returns {NotePopup} 쪽지 상담내용 조회/등록
 */
const StudioReservationPopup = ({ show = false, onChange, value = {} }) => {
  const dispatch = useDispatch();
  const [popupShow, setPopupShow] = useRodal(show);

  const modalClose = useCallback(
    (e) => {
      if (onChange) onChange(e);
    },
    [onChange]
  );
  const [liveStudioStep, setLiveStudioStep] = useState(1);
  useEffect(() => {
    setPopupShow(show);
  }, [setPopupShow, show]);

  const handleStep = useCallback(
    (num, kind) => (e) => {
      e.preventDefault();
      setLiveStudioStep(num);
    },
    []
  );

  return (
    <RodalPopup show={popupShow} type={'fade'} closedHandler={modalClose} title="Live Studio 촬영 예약" mode="normal" size="medium">
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
                    <RadioGroup
                      dataList={[
                        { id: 'date1', value: 1, checked: true, disabled: false, title: '2019년 10월 04일(금)' },
                        { id: 'date2', value: 2, checked: false, disabled: false, title: '2019년 10월 07일(월)' }
                      ]}
                    />
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
                          <td className="tx-blue80">
                            <CheckBox id="chk-time1" title="13:30" />
                          </td>
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
                          <td className="tx-blue80">
                            <CheckBox id="chk-time2" title="11:30" />
                          </td>
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
              <CheckBox id="chk-agree" title="라이브 스튜디오 이용약관 (필수)" />
              <div className="terms-wrap"></div>
            </div>

            <div className="agree-terms-wrap">
              <CheckBox id="chk-agree2" title="환불규정 안내 (필수)" />
              <div className="terms-wrap"></div>
            </div>

            <div className="essential-point tp2">
              <ul>
                <li>
                  지점 이용은 <b>당일/전일 예약제로 운영</b>되며, 당일 방문은 받지 않습니다.
                </li>
                <li>
                  예약시 <b>10분이내 결제가 이루어지지 않으면 예약은 취소</b>되고, 선택한 시간은 무효가 됩니다.
                </li>
                <li>
                  예약 <b>취소요구시 위약금이 발생</b>될 수 있습니다.
                </li>
                <li>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                <li>오토벨보증 이용권 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
              </ul>
            </div>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} height={60} />
              <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(2, 'studio')} />
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
                    <p className="price">
                      150,000<span>원</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="coupon-wrap">
                <div className="coupon">
                  <CheckBox id="chk3" title="쿠폰 적용" />
                  <p>
                    적용 가능한 보유쿠폰<span>3</span>장
                  </p>
                </div>
                <RadioGroup
                  dataList={[
                    { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                    { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                    { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                  ]}
                  defaultValue={1}
                  size="small"
                  mode="vertical"
                ></RadioGroup>
                <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
              </div>
            </div>
            <div className="last-sum">
              <ul>
                <li>
                  이용권금액
                  <span>
                    890,000<em>원</em>
                  </span>
                </li>
                <li>
                  할인금액
                  <span>
                    12,000<em>원</em>
                  </span>
                </li>
                <li>
                  최종결제금액
                  <span>
                    878,000<em>원 (VAT 포함)</em>
                  </span>
                </li>
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
                ]}
                defaultValue={1}
              ></RadioGroup>
            </div>

            {/* #a1 증빙선택 추가 start */}
            <div className="method-wrap col2  mt40">
              <p>증빙 선택</p>
              <RadioGroup
                dataList={[
                  { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                  { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }
                ]}
                defaultValue={1}
              ></RadioGroup>
              <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
            </div>
            {/* #a1 증빙선택 추가 end */}

            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} height={60} />
              <Button size="big" background="blue80" title="다음단계" width={172} height={60} mode="normal" onClick={handleStep(3, 'studio')} />
            </Buttons>
          </div>
        )}
        {liveStudioStep === 3 && (
          <div className="reserve-wrap co-wrap">
            <p className="tit">예약이 완료되었습니다.</p>
            <p className="exp">예약 현황은 마이페이지 Live Service 촬영예약에서 확인 가능합니다.</p>
            <Buttons align="center" marginTop={64}>
              <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" href="/mypage/dealerSell01" />
              <Button size="big" background="gray" title="예약조회로 이동" width={172} height={60} href="/mypage/dealerSell06" />
            </Buttons>
          </div>
        )}
      </div>
    </RodalPopup>
  );
};

export default StudioReservationPopup;
