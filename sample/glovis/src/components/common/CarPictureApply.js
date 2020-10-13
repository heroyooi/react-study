import { useSelector } from 'react-redux';
import InputPic from '@lib/share/items/InputPic';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

/*
html 변경이력
03.13 :[모바일] isButton, fileDisabled props 추가
*/
const CarPictureApply = ({ mode = "normal", popOpen, isButton=true, fileDisabled=false, callback }) => { // mode -> normal(일반), dealer(딜러)
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [alertPop2, setAlertPop2, openAlertPop2, closeAlertPop2] = useRodal(false, true);
  const [alertPop4, setAlertPop4, openAlertPop4, closeAlertPop4] = useRodal(false, true);
  const [alertPop6, setAlertPop6, openAlertPop6, closeAlertPop6] = useRodal(false, true);
  const handleApply = (e) => {
    e.preventDefault();
    if (callback) callback(e);
  }
  return (
    <div className="img-upload-wrap">
      {mode === "normal" && (
        <>
          <div className="img-upload main mt0">
            <h4 className="mb33">대표 사진</h4>
            {!hasMobile && (
              <div className="app-down">
                <i className="ico-app-blue"></i>
                <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => popOpen(e, "fade")} />
              </div>
            )}
            <ul>
              <li><InputPic disabled={fileDisabled} title="차량 전면" applyImg="/images/dummy/list-product-img-01.png" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 후면" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 좌측" applyImg="/images/dummy/list-auction-img-1.png" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 우측" applyImg="/images/dummy/list-auction-img-2.png" /></li>
              <li><InputPic disabled={fileDisabled} title="계기판" /></li>
            </ul>
          </div>
          <div className="img-upload detail">
            <h4 className="mb33">상세 사진</h4>
            {!hasMobile ? (
              <p>옵션, 하자 부분이 잘 나오게 등록하시면 더 정확한 견적을 받으실 수 있습니다.</p>
            ) : (
                <p>(최대 10개)</p>
              )}
            <ul>
              <li><InputPic disabled={fileDisabled} title="휠&amp;타이어" applyImg="/images/dummy/view-info-img-05.jpg" /></li>
              <li><InputPic disabled={fileDisabled} title="엔진룸" /></li>
              <li><InputPic disabled={fileDisabled} title="내부(앞) 전경" /></li>
              <li><InputPic disabled={fileDisabled} title="센터페시아전경" /></li>
              <li><InputPic disabled={fileDisabled} title="룸미러 전경" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 상단" /></li>
              <li><InputPic disabled={fileDisabled} title="트렁크" /></li>
              <li><InputPic disabled={fileDisabled} title="기어 박스" /></li>
              <li><InputPic disabled={fileDisabled} title="후방 카메라" /></li>
              <li><InputPic disabled={fileDisabled} title="스크래치" /></li>
            </ul>
          </div>
          {!hasMobile ? (
            <Buttons marginTop={48}>
              <span className="step-btn-l">
                <Button size="big" background="gray" title="이전 단계(차량 정보 등록)" width={249} height={60} onClick={(e) => openAlertPop2(e, "fade")} />
              </span>
              <span className="step-btn-r">
                <Button size="big" background="gray" title="임시 저장" width={125} height={60} onClick={(e) => openAlertPop6(e, "fade")} />
                <Button size="big" background="blue80" title="다음 단계(신청 내용 확인)" width={239} height={60} onClick={(e) => openAlertPop4(e, "fade")} />
              </span>
            </Buttons>
          ) : (
              isButton &&
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="이전" width={48} measure={'%'} />
                <Button size="big" background="blue80" radius={true} title="등록" width={48} measure={'%'} marginLeft={4} mgMeasure={'%'} onClick={handleApply} />
              </Buttons>
            )}

        </>
      )}

      {mode === "dealer" && (
        <>
          <div className="img-upload main mt0">
            <h4 className="mb33">대표 사진</h4>
            <div className="app-down">
              <i className="ico-app-blue"></i>
              <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => rodalPopupHandler(e, "fade")} />
            </div>
            <ul>
              <li><InputPic disabled={fileDisabled} title="차량 전면" applyImg="/images/dummy/list-product-img-01.png" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 후면" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 좌측" applyImg="/images/dummy/list-auction-img-1.png" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 우측" applyImg="/images/dummy/list-auction-img-2.png" /></li>
              <li><InputPic disabled={fileDisabled} title="계기판" /></li>
            </ul>
            <p className="sub">* 첫번째 사진은 판매차량 상세페이지의 첫 이미지로 보여집니다.</p>
          </div>
          <div className="img-upload detail">
            <h4 className="mb33">상세 사진</h4>
            <p>(최대 15개)</p>
            <ul>
              <li><InputPic disabled={fileDisabled} title="휠&amp;타이어" applyImg="/images/dummy/view-info-img-05.jpg" /></li>
              <li><InputPic disabled={fileDisabled} title="엔진룸" /></li>
              <li><InputPic disabled={fileDisabled} title="내부(앞) 전경" /></li>
              <li><InputPic disabled={fileDisabled} title="센터페시아전경" /></li>
              <li><InputPic disabled={fileDisabled} title="룸미러 전경" /></li>
              <li><InputPic disabled={fileDisabled} title="차량 상단" /></li>
              <li><InputPic disabled={fileDisabled} title="트렁크" /></li>
              <li><InputPic disabled={fileDisabled} title="기어 박스" /></li>
              <li><InputPic disabled={fileDisabled} title="후방 카메라" /></li>
              <li><InputPic disabled={fileDisabled} title="스크래치" /></li>
              <li><InputPic disabled={fileDisabled} /></li>
              <li><InputPic disabled={fileDisabled} /></li>
              <li><InputPic disabled={fileDisabled} /></li>
              <li><InputPic disabled={fileDisabled} /></li>
              <li><InputPic disabled={fileDisabled} /></li>
            </ul>
          </div>
        </>
      )}

      <RodalPopup show={alertPop2} type={'fade'} closedHandler={closeAlertPop2} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>저장 후, 차량 정보 등록 페이지로 이동하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} closedHandler={closeAlertPop2} />
            <Button size="big" background="blue80" title="확인" width={130} href="/sell/selfStep02" />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={alertPop4} type={'fade'} closedHandler={closeAlertPop4} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>입력하신 내용으로<br />셀프 등록 판매를 신청하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} closedHandler={closeAlertPop2} />
            <Button size="big" background="blue80" title="확인" width={130} href="/sell/selfStep04" />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={alertPop6} type={'fade'} closedHandler={closeAlertPop6} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </div>
  )
}

export default CarPictureApply;