import { useState } from 'react';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import MobBottomArea from '@lib/share/items/MobBottomArea';

const MobCounsel = () => {
  const [calcH, setCalcH] = useState(60);
  return (
    <>
      <div className="content-sec dealer-chat-wrap">
        <div className="bg-blue80">
          <p>현대 투싼 IX 디젤 2WD LX20 럭셔리<span>20노 7384</span></p>
        </div>
        <div className="chat-list-wrap time">
          <div className="center">
            <span>2019년 2월 9일 화요일</span>
          </div>
          <div className="left">
            <p>판매하시려는 차량이 <b>현대 그랜저 IG  2.4 프리미엄</b> 맞으세요?
              <span className="time">오후 4:40</span></p>
          </div>
          <div className="right">
            <p>네 프리미엄 맞습니다.
              <span className="time">오후 4:42</span></p>
          </div>
          <div className="center">
            <span>2019년 2월 15일 월요일</span>
          </div>
          <div className="left">
            <p>이 차량 맞으세요?
              <span className="time">오후 4:40</span></p>
          </div>
          <div className="left">
            <p>정말로 맞으세요?
              <span className="time">오후 4:40</span></p>
          </div>
          <div className="right">
            <p>네 프리미엄 맞습니다. 맞고말고요.
              <span className="time">오후 4:42</span></p>
          </div>
          <div className="left">
            <p>판매하시려는 차량이 <b>현대 그랜저 IG  2.4 프리미엄</b> 맞으세요? 맞는거죠?
              <span className="time">오후 4:44</span></p>
          </div>
        </div>
      </div>
      <MobBottomArea isFix={true} isSimple={true}>
        <div className="chat">
          <Textarea type="tp1" placeHolder="답변을 입력해주세요." height={calcH} mode="chat" />
          <Buttons align="right">
            <Button size="sml" background="blue80" radius={true} title="입력" width={88} height={30} />
          </Buttons>
        </div>
      </MobBottomArea>
    </>
  )
}

export default MobCounsel;