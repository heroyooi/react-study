import { useCallback } from 'react';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MobInquire = ({ callback }) => {
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const closeMPop = useCallback((e) => {
    e.preventDefault();
    setMPop(false);
  }, [setMPop]);
  const handleClick = (e) => {
    e.preventDefault();
    if (callback) callback(e);
  }
  return (
    <>
      <div className="content-wrap inquire-wrap">
        <p className="tit2">
          받는사람
          <span>김현대</span>
        </p>
        <p className="tit2 mt24 mb16">문의사항</p>
        <Textarea countLimit={400} type="tp1" height={349} placeHolder="문의사항을 입력해주세요." />
      </div>
      <Button className="fixed" size="full" background="blue80" title="보내기" onClick={(e) => openMPop(e, 'fade')} />

      <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={true}>
        <div className="con-wrap">
          <p className="tit1">쪽지가 성공적으로 발송되었습니다.</p>
          <p>답변은 마이페이지 &gt; 쪽지상담 내역에서 확인하실 수 있습니다.</p>
          <Buttons align="right" marginTop={16}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight={500} onClick={handleClick} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )  
}

export default MobInquire;