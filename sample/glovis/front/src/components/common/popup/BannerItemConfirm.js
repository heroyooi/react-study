import { useContext } from 'react';
import { useSelector } from 'react-redux';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
//import { BannerItemContext } from '@src/components/common/banner/BannerItem';

const BannerItemConfirm = ({ rodalShow1, rodalShow2, modalCloseHandler2, handleCloseConfirm }) => {
  const { isLogin, hasMobile } = useSelector((state) => state.common);
  //const {rodalShow1, rodalShow2, modalCloseHandler2, handleCloseConfirm } = useContext(BannerItemContext);

  if (hasMobile) {
    return (
      <>
        {rodalShow1 === false && (
          <RodalPopup show={rodalShow2} type="fade" closedHandler={modalCloseHandler2} isButton={false}>
            <div className="con-wrap">
              {isLogin === false ? (
                <>
                  <p className="tit1">로그인이 필요한 서비스입니다.</p>
                  <p>로그인 하시겠습니까?</p>
                </>
              ) : (
                <>
                  <p className="tit1">관심차량으로 등록되었습니다.</p>
                  <p>마이페이지에서 확인가능합니다.</p>
                </>
              )}
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="취소" color="blue80" onClick={handleCloseConfirm} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleCloseConfirm} />
              </Buttons>
            </div>
          </RodalPopup>
        )}
      </>
    );
  }

  return (
    <>
      {rodalShow1 === false && (
        <RodalPopup show={rodalShow2} type="fade" closedHandler={modalCloseHandler2} mode="normal" size="xs">
          <div className="con-wrap">
            {isLogin === false ? (
              <p>
                로그인이 필요한 서비스입니다.
                <br />
                로그인 하시겠습니까?
              </p>
            ) : (
              <p>
                관심차량으로 등록되었습니다.
                <br />
                마이페이지에서 확인가능합니다.
              </p>
            )}

            <Buttons align="center" marginTop={56}>
              <Button size="big" background="gray" title="취소" width={130} onClick={handleCloseConfirm} />
              <Button size="big" background="blue80" title="확인" width={130} />
            </Buttons>
          </div>
        </RodalPopup>
      )}
    </>
  );
};

export default BannerItemConfirm;
