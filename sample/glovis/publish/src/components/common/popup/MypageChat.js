import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';

const MypageChat = ({onClose}) => {
  // Textarea
  const textareaChange = (e) => console.log('textareaChange: ', e);
  const textareaBlur = (e) => console.log('textareaBlur: ', e);
  const textareaFocus = (e) => console.log('textareaFocus: ', e);
  const handleMsg = (e) => {
    e.preventDefault();
  }

  return (
    <div className="popup-chat">
      <div className="chat-tit">
        <i className="ico-chat"></i>
        <p>현대 투싼ix 디젤 2WD LX20 럭셔리<span>20 노 7777</span></p>
        <button className="ico-close-white" onClick={onClose}></button>
      </div>
      <ColoredScrollbars autoHeightMax={560}>
        <div className="chat-list-wrap">
          <div className="left">
            <span>11월 19일 오후 4:30</span>
            <p>가격 할인이 되나요?</p>
          </div>
          <div className="right">
            <span>11월 19일 오후 4:30</span>
            <p>현재 가격에서 일부 할인<br />해 드릴 수 있긴 합니다.<br />자세한 사항은 전화 문의 <br />부탁 드리겠습니다.</p>
          </div>
          <div className="left">
            <span>11월 19일 오후 4:30</span>
            <p>이 차량 말고 다른 차량도 볼 수 있나요?</p>
          </div>
          <div className="right">
            <span>11월 19일 오후 4:30</span>
            <p>현재 가격에서 일부 할인<br />해 드릴 수 있긴 합니다.<br />자세한 사항은 전화 문의 <br />부탁 드리겠습니다.</p>
          </div>
          <div className="right">
            <p>현재 가격에서 일부 할인<br />해 드릴 수 있긴 합니다.<br />자세한 사항은 전화 문의 <br />부탁 드리겠습니다.</p>
          </div>
          <div className="left">
            <span>11월 19일 오후 4:30</span>
            <p>이 차량 말고 다른 차량도 볼 수 있나요?</p>
          </div>
          <div className="right">
            <span>11월 19일 오후 4:30</span>
            <p>현재 가격에서 일부 할인<br />해 드릴 수 있긴 합니다.<br />자세한 사항은 전화 문의 <br />부탁 드리겠습니다.</p>
          </div>
          <div className="right">
            <p>현재 가격에서 일부 할인<br />해 드릴 수 있긴 합니다.<br />자세한 사항은 전화 문의 <br />부탁 드리겠습니다.</p>
          </div>
        </div>
      </ColoredScrollbars>
      <div className="chat-input">
        <Textarea type="tp2" height={96} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
        <Button size="big" background="blue80" radius={true} title="전송" width={68} height={68} onClick={handleMsg} />
      </div>
    </div>
  )
}

export default MypageChat;