import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Radio from '@lib/share/items/Radio';
import Steps from '@lib/share/items/Steps';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { mobile_select_area } from '@src/dummy';

const DealerSell06Studio01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Studio 촬영 예약',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    return (
      <AppLayout>
        <div className="live-reserve-sec">
          <Steps type={1} contents={['지점/예약시간 선택', '결제하기', '예약완료']} active={1} mode="stick" />
          <div className="reserve-wrap">
            <div className="branch">
              <p className="tit4 mb16">지점선택</p>
              <div className="float-wrap">
                <MobSelectBox options={mobile_select_area} width='42%' />
                <MobSelectBox options={mobile_select_area} width='56%' />
              </div>
              <div className="essential-point fs12">
                <ul>
                  <li><i className="ico-dot"></i>토·일요일 및 공휴일은 예약 불가</li>
                  <li><i className="ico-dot"></i>전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                  <li><i className="ico-dot"></i>진단지점 : 서울시 강서구 신월동 단지 </li>
                </ul>
              </div>
            </div>

            <div className="content-wrap">
              <p className="tit4 mb16 mt24">시간선택</p>
              <table summary="조회 영역" className="table-tp1 th-c td-c" >
                <caption className="away">조회 영역</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="35%" />
                  <col width="35%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>시간</th>
                    <th>2019.10.04(금)</th>
                    <th>2019.10.07(월)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>09:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>10:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>10:30</td>
                    <td><Radio className="txt" id="reserve1" label="예약" value={1} checked={isValue1} onChange={handleChange1} /></td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>11:00</td>
                    <td><Radio className="txt" id="reserve2" label="예약" value={2} checked={isValue1} onChange={handleChange1} /></td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>11:30</td>
                    <td><Radio className="txt" id="reserve3" label="예약" value={3} checked={isValue1} onChange={handleChange1} /></td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>12:00</td>
                    <td><Radio className="txt" id="reserve4" label="예약" value={4} checked={isValue1} onChange={handleChange1} /></td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>12:30</td>
                    <td><Radio className="txt" id="reserve5" label="예약" value={5} checked={isValue1} onChange={handleChange1} /></td>
                    <td><Radio className="txt" id="reserve6" label="예약" value={6} checked={isValue1} onChange={handleChange1} /></td>
                  </tr>
                  <tr>
                    <td>13:00</td>
                    <td><Radio className="txt" id="reserve7" label="예약" value={7} checked={isValue1} onChange={handleChange1} /></td>
                    <td><Radio className="txt" id="reserve8" label="예약" value={8} checked={isValue1} onChange={handleChange1} /></td>
                  </tr>
                  <tr>
                    <td>13:30</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>14:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>14:30</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>15:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>15:30</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>16:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>16:30</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                  <tr>
                    <td>17:00</td>
                    <td>예약마감</td>
                    <td>예약마감</td>
                  </tr>
                </tbody>
              </table>

              <MobSelectTerms termsData={
                [
                  { id: 'chk1', title: '판매 약관에 동의합니다.', checked: true }
                ]
              } />

              <div className="essential-point fs12">
                <ul>
                  <li><i className="ico-dot"></i>지점 이용은 당일/전일 예약제로 운영되며, 당일 방문은 받지 않습니다.</li>
                  <li><i className="ico-dot"></i>예약시 10분이내 결제가 이루어지지 않으면 예약은 취소되고, 선택한 시간은 무효가 됩니다.</li>
                  <li><i className="ico-dot"></i>예약 취소요구시 위약금이 발생될 수 있습니다.</li>
                  <li><i className="ico-dot"></i>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                  <li><i className="ico-dot"></i>Live Studio 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Buttons align="center" className="full" marginTop={24}>
          <Button size="full" background="blue20" color="blue80" title="취소" height={56} />
          <Button size="full" background="blue80" title="다음" height={56} href="/mypage/dealerSell06Studio02" />
        </Buttons>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default DealerSell06Studio01;
