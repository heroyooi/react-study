import { useState } from 'react';
import CarPictureApply from '@src/components/common/CarPictureApply';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';

const MobSellRegister = ({ ver=1, callback }) => {
  const [mobileVer, setMobileVer] = useState(ver);
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, false);

  return (
    <div className="sell-register-wrap"> 
      {mobileVer === 1 && <div className="info-wrap">
        <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
        <p className="exp">이제 쉽고 간편하게<br />오토벨에서 제공하는 촬영기능을 사용해 보세요!</p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} />
          <Button size="sml" background="blue80" radius={true} title="오토벨 App 다운받기" width={122} />
        </Buttons>
      </div>}

      {mobileVer === 2 && <div className="info-wrap">
        <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
        <p className="exp">이제 쉽고 간편하게<br />오토벨에서 제공하는 촬영기능을 사용해 보세요!</p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} />
          <Button size="sml" background="blue80" radius={true} title="촬영하기" width={61} />
        </Buttons>
      </div>}

      {mobileVer === 3 && <div className="info-wrap">
        <p className="tit">촬영하신 사진을 업로드 해주세요.</p>
        <p className="exp">업로드 된 이미지는 [미리보기]를 통해 확인하실 수 있습니다.<br />
          업로드 완료 이후 언제 어디에서나 등록을 진행하실 수 있습니다.<br />사진촬영(10/20)</p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="gray" radius={true} title="미리보기" width={61} />
          <Button size="sml" line="gray" radius={true} title="다시 촬영" width={63} />
          <Button size="sml" background="blue80" radius={true} title="업로드" width={50} />
        </Buttons>
      </div>}
      
      <CarPictureApply popOpen={rodalPopupHandler} callback={callback} />
    </div>
  )
}

export default MobSellRegister;