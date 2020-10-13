import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { mobile_select_area } from '@src/dummy';

const DealerSell06Studio02 = () => {
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
          <Steps type={1} contents={['지점/예약시간 선택', '결제하기', '예약완료']} active={2} mode="stick" />
          <div className="reserve-wrap payment-sec method">
            <div className="pick-list">
              <p>Live studio 촬영예약</p>
              <p className="price">150,000<span>원</span></p>
            </div>
            <div className="coupon-wrap">
              <p>
                쿠폰/포인트 할인
                <span>쿠폰, 포인트 중복할인은 불가합니다.</span>
              </p>

              {/* 포인트 활성화 */}
              <ul>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-coupon', value: 1, checked: true, disabled: true, label: '쿠폰' }]} />
                  <p>(적용가능 쿠폰 : <span>4</span>장)</p>
                  <Input type="text" id="coupon" width='70%' height={40} disabled={true} />
                  <Button size="mid" background="gray60" radius={true} title="쿠폰적용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-point', value: 1, checked: true, label: '포인트' }]} />
                  <p>(사용가능 금액 : <span>123,456</span>원)</p>
                  <Input type="text" id="point" width='70%' height={40} />
                  <Button size="mid" background="blue80" radius={true} title="전액사용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
              </ul>

              {/* 쿠폰 활성화 */}
              {/* <ul>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-coupon', value: 1, checked: true, label: '쿠폰' }]} />
                  <p>(적용가능 쿠폰 : <span>4</span>장)</p>
                  <Input type="text" id="coupon" width='70%' height={40} />
                  <Button size="mid" background="blue80" radius={true} title="쿠폰적용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-point', value: 1, checked: true, disabled: true, label: '포인트' }]} />
                  <p>(사용가능 금액 : <span>123,456</span>원)</p>
                  <Input type="text" id="point" width='70%' height={40} disabled={true} />
                  <Button size="mid" background="gray60" radius={true} title="전액사용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
              </ul> */}

              <p className="ex">&#8251; 적립된 포인트는 3,000원부터 사용이 가능합니다</p>
            </div>
            <div className="last-sum">
              <p>최종결제금액<span> (VAT포함)</span></p>
              <p className="price">120,000<span>원</span></p>
            </div>
            <div className="exp">
              적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.
              <span>쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
            </div>
          </div>
          <Buttons align="center" className="full" marginTop={48}>
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} />
            <Button size="full" background="blue80" title="결제" height={56} />
          </Buttons>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default DealerSell06Studio02;
