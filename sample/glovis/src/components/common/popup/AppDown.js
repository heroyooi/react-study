import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const AppDown = () => {
  return (
    <div className="popup-app-down">
      <div className="img-wrap">
        <img src="/images/contents/photo-popup-app.png" alt="" />
      </div>
      <p>현대 오토벨 차량사진등록 앱으로<br />편리하게 차량 사진을 등록하세요.</p>
      <Buttons align="center" marginTop={36}>
        <Button size="big" background="blue80" title="앱 다운로드" width={136} />
      </Buttons>
    </div>
  )
}

export default AppDown;