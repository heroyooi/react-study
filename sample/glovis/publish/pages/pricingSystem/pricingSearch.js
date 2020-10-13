import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobSearchFilter from '@src/components/common/MobSearchFilter';
import Button from '@lib/share/items/Button'
import Buttons from '@lib/share/items/Buttons'
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingSearch = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량검색',
        options: ['back', 'voucher', 'gnb'],
        events: [null, ()=>{alert('이용 구매 페이지로 이동합니다.')}, null]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
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
        <MobSearchFilter />
        <Button className="fixed" size="full" background="blue80" title="조회" height={56} onClick={(e) => openErrorPop(e, "fade")} />

        <RodalPopup show={errorPop} type={'fade'} width={380} closedHandler={closeDimmErrorPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">주행거리 미입력</p>
            <p>주행거리를 입력해주세요.</p>
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

export default PricingSearch;
