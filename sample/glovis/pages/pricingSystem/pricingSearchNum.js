import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button'
import Buttons from '@lib/share/items/Buttons'
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const pricingSearchNum = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량조회',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    // 모바일 팝업
    const [errorPop, setErrorPop, openErrorPop, closeDimmErrorPop] = useRodal(false);
    const closeErrorPop = useCallback((e) => {
      e.preventDefault();
      setErrorPop(false);
    }, []);

    return (
      <AppLayout>
        <div className="pricing-num-wrap">
          <div className="search-car-num">
            <h3 className="tit2 mb16">차량번호</h3>
            <Input placeHolder="차량번호를 입력해주세요. (예: 12가1234)" id="car-num" height={38} />
            <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
          </div>
          <div className="search-none">
            <p>
              차량 번호로 조회가 되지 않을 경우,<br />
              차량 조건 검색을 이용해보세요.
            </p>
            <Buttons align="center" marginTop={16}>
              <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건으로 조회" width={189} fontWeight={500} href="pricingSearch" />
            </Buttons>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="조회" onClick={(e) => openErrorPop(e, "fade")} />

        <RodalPopup show={errorPop} type={'fade'} width={380} closedHandler={closeDimmErrorPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">차량번호 오류</p>
            <p>올바른 차량번호를 입력해주세요.<br />(예 : 12가 1234)</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} onClick={closeErrorPop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
  </AppLayout>
  )
}

export default pricingSearchNum;
