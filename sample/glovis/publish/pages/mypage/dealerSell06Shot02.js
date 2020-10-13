import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import Radio from '@lib/share/items/Radio';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell06Shot04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Shot 촬영 예약',
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
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    const [isValue2, setIsValue2] = useState(0);
    const handleChange2 = useCallback((e) => {
      e.preventDefault();
      setIsValue2(Number(e.target.value));
    }, [isValue2]);
    return (
      <AppLayout>
        <div className="live-reserve-sec">
          <Steps type={1} contents={['차량정보 입력', '예약정보 입력', '결제하기', '예약완료']} active={2} mode="stick" />
          <div className="content-wrap">
            <table summary="예약정보 입력에 대한 내용" className="table-tp2 th-none">
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">방문주소</p>
                    <span className="bridge2">
                      <Input type="text" height={40} value="12345" disabled={true} width='73%' />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                    </span>
                    <span className="bridge2">
                      <Input type="text" height={40} value="서울특별시 강남구 테헤란로 301" disabled={true} />
                    </span>
                    <span className="bridge2">
                      <Input type="text" height={40} value="현대글로비스(주)" disabled={true} />
                    </span>
                    <p className="tx-sub tx-blue80">* 입력해주신 주소에서 LiveShot 촬영이 진행됩니다. 정확한 주소를 입력해주세요.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">날짜선택</p>
                    <ul className="radio-block tp3">
                      <li><Radio className="txt" id="date1" label="2019.10.04 (금)" value={1} checked={isValue1} onChange={handleChange1} /></li>
                      <li><Radio className="txt" id="date2" label="2019.10.07 (월)" value={2} checked={isValue1} onChange={handleChange1} /></li>
                      <li><Radio className="txt" id="date3" label="2019.10.08 (화)" value={3} checked={isValue1} onChange={handleChange1} /></li>
                    </ul>
                    <div className="essential-point fs12 lh-none">
                      <ul>
                        <li><i className="ico-dot"></i>토·일요일 및 공휴일은 예약 불가</li>
                        <li><i className="ico-dot"></i>전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">시간선택</p>
                    <ul className="radio-block tp3">
                      <li><Radio className="txt" id="time1" label="오전" value={1} checked={isValue2} onChange={handleChange2} /></li>
                      <li><Radio className="txt" id="time2" label="오후" value={2} checked={isValue2} onChange={handleChange2} /></li>
                    </ul>
                    {/* <ul className="check-select-list mt20">
                      <li> */}
                        <MobSelectTerms termsData={
                          [
                            { id: 'chk1', title: 'Live shot 이용약관(필수)', checked: true },
                            { id: 'chk2', title: '환불 규정 안내(필수)', checked: true }
                          ]
                        } />
                      {/* </li>
                    </ul> */}
                    <div className="essential-point fs12 tx-lg mt20">
                      <ul>
                        <li><i className="ico-dot"></i>지점 이용은 당일/전일 예약제로 운영되며, 당일 방문은 받지 않습니다.</li>
                        <li><i className="ico-dot"></i>예약시 10분이내 결제가 이루어지지 않으면 예약은 취소되고, 선택한 시간은 무효가 됩니다.</li>
                        <li><i className="ico-dot"></i>예약 취소요구시 위약금이 발생될 수 있습니다.</li>
                        <li><i className="ico-dot"></i>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                        <li><i className="ico-dot"></i>Live Studio 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Buttons align="center" className="full" marginTop={40}>
          <Button size="full" background="blue20" color="blue80" title="취소" height={56} href="/mypage/dealerSell06Shot01" />
          <Button size="full" background="blue80" title="다음" height={56} href="/mypage/dealerSell06Shot03" />
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

export default DealerSell06Shot04;