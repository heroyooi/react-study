import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ViewInquire = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '1:1 쪽지 상담',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    // 팝업
    const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
    const closeMPop = useCallback(
      (e) => {
        e.preventDefault();
        setMPop(false);
      },
      [setMPop]
    );
    return (
      <AppLayout>
        <div className="content-wrap inquire-wrap">
          <p className="tit2">
            받는사람
            <span>김현대</span>
          </p>
          <p className="tit2 mt24 mb16">문의사항</p>
          <Textarea countLimit={400} type="tp1" height={349} placeHolder="문의사항을 입력해주세요." />
        </div>
        <Button className="fixed" size="full" background="blue80" title="보내기" onClick={(e) => openMPop(e, 'fade')} />

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">쪽지가 성공적으로 발송되었습니다.</p>
            <p>답변은 마이페이지 > 쪽지상담 내역에서<br />확인하실 수 있습니다.</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight={500} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default ViewInquire;