import React, { memo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPhotoList from '@src/components/common/MobPhotoList';
import { isAndroid, isIOS, objIsEmpty } from '@src/utils/CommonUtil';
/*
 * 유저타입 : 사용자 (0) / 딜러 (1) / 평가사 (2)
 * 차량고유넘버 : 차량구분위한 id number
 * 차종 : 경차 (0) / 세단 (1) / SUV (2) / RV (3)
 * 차량번호 : 차량 번호판 번호
 * 촬영종류 : detail (0) / 360 (3)
 */
const MobLiveShot = memo(({ crId, crNo, crType, isPreview, isReShot, livePhotos, memberType, shotType, onLiveShotClose, onPreViewClose, mode = 'liveshot', handleOuterPopup, pictureCount = 0 }) => {
  // mode = sellcar 내차팔기
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [isAppMovePopUp, setIsAppMovePopUp] = useState(false);
  const [visitedAt, setVisitedAt] = useState(new Date().getTime());

  // 렌더링 후 넘어오는 데이터를 APP에 맞게 변환
  const [userType, setUserType] = useState(memberType);
  useEffect(() => {
    // 넘어오는 유저 타입 = 일반 - 0010 / 딜러 - 0020 / 평가사 - 0110
    // liveShot 사진촬영은 평가사회원이 작업하는 부분이므로 유저타입은 모두 2번으로 통일하도록 수정
    if (memberType === '0010') {
      // setUserType('0');
      setUserType('2');
    } else if (memberType === '0020') {
      // setUserType('1');
      setUserType('2');
    } else if (memberType === '0110') {
      setUserType('2');
    }
  }, [memberType]);

  const [crTypeCd, setTypeCd] = useState('');
  // 넘어오는 차량코드 = 경차(1) / 소형(2), 준중형(3), 중형(4), 대형(5), 스포츠카(6), 하이브리드(24), 전기차(25) / SUV(8) / RV(7)
  // 변환할 차량 코드 = 경차(0) / 세단 (1) / SUV (2) / RV (3)
  useEffect(() => {
    if (crType === '1') {
      setTypeCd('0');
    } else if (crType === '2' || crType === '3' || crType === '4' || crType === '5' || crType === '6' || crType === '24' || crType === '25') {
      setTypeCd('1');
    } else if (crType === '8' || crType === '9') {
      setTypeCd('2');
    } else if (crType === '7') {
      setTypeCd('3');
    }
  }, [crType]);

  const handleShottingComplete = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (onLiveShotClose) {
        onLiveShotClose(e, e.detail.params);
      }
    },
    [onLiveShotClose]
  );

  const handleLiveShot = useCallback(
    (e) => {
      console.log(`TEST503 ::: AutoBell://openShootingAssistant?url=${userType}&${crId}&${crTypeCd}&${crNo}&${shotType}`);
      e.preventDefault();
      if (objIsEmpty(memberType) || objIsEmpty(crId) || objIsEmpty(crNo) || objIsEmpty(crType)) {
        alert('유효하지 않은 데이타 입니다.');
        let _path = '/mypage/dealer/sellcar/liveAssignList';
        if (mode === 'sellcar') _path = '/sellcar/sellCar';
        Router.push(_path);
        return;
      }

      setVisitedAt(new Date().getTime());

      const ua = navigator.userAgent;

      if (!(ua.includes('AUTOBELL_Android') || ua.includes('AUTOBELL_iOS'))) {
        setIsAppMovePopUp(true);
        return;
      }

      if (
        typeof window !== 'undefined' &&
        isIOS() === true &&
        typeof webkit !== 'undefined' &&
        webkit.messageHandlers &&
        webkit.messageHandlers.observe &&
        webkit.messageHandlers.observe.postMessage
      ) {
        console.log(`TEST503 ::: AutoBell://openShootingAssistant?url=${userType}&${crId}&${crTypeCd}&${crNo}&${shotType}`);
        webkit.messageHandlers.observe.postMessage(`AutoBell://openShootingAssistant?url=${userType}&${crId}&${crTypeCd}&${crNo}&${shotType}`);
      } else if (typeof window !== 'undefined' && isAndroid() === true && window.JSInterface && window.JSInterface.openShootingAssistant) {
        console.log(`TEST503 ::: ${userType}`, `${crId}`, `${crTypeCd}`, `${crNo}`, `${shotType}`);
        window.JSInterface.openShootingAssistant(`${userType}`, `${crId}`, `${crTypeCd}`, `${crNo}`, `${shotType}`);
      } else {
        alert('지원되지 않는 디바이스 입니다.');
      }
    },
    [crId, crNo, crTypeCd, userType, shotType]
  );

  const handlePreviewClose = useCallback(
    (e) => {
      if (onPreViewClose) {
        onPreViewClose(e);
      }
    },
    [onPreViewClose]
  );

  const handleAppMovePopUpToggle = useCallback(
    (e) => {
      e.preventDefault();

      setVisitedAt(new Date().getTime());
      if (isAppMovePopUp) {
        if (isIOS() === true) {
          setTimeout(() => {
            if (new Date().getTime() - visitedAt < 2000) {
              location.href = 'https://apps.apple.com/kr/app/id1492011865?mt=8';
            }
          }, 500);
          setTimeout(() => {
            location.href = '{autobell}';
          }, 0);
        } else if (isAndroid()) {
          setTimeout(() => {
            location.href = 'intent://autobell_main_web#Intent; scheme=autobell; action=..;category=..; package=glovis.glovisaa.autobell; end;';
          }, 1000);
        }
      }
      setIsAppMovePopUp(!isAppMovePopUp);
    },
    [isAppMovePopUp, visitedAt]
  );

  useEffect(() => {
    window.addEventListener('onLiveShootingComplete', handleShottingComplete);

    return () => {
      window.removeEventListener('onLiveShootingComplete', handleShottingComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((mode === 'sellcar' || mode === 'dealer') && isReShot) {
    return (
      <>
        <p className="tit">촬영하신 사진을 업로드 해주세요.</p>
        <p className="exp">
          업로드 된 이미지는 [미리보기]를 통해 확인하실 수 있습니다.
          <br />
          업로드 완료 이후 언제 어디에서나 등록을 진행하실 수 있습니다.
          <br />
          사진촬영({pictureCount}/{memberType === 0 ? '15' : '20'})
        </p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="gray" radius={true} title="다시 촬영" width={63} onClick={handleLiveShot} />
          <Button size="sml" line="gray" radius={true} title="사진 리로드" width={63} onClick={onLiveShotClose} />
          {/* <Button size="sml" line="gray" radius={true} title="미리보기" width={61} onClick={handleOpenPhotoList} /> */}
          {/* <Button size="sml" background="blue80" radius={true} title="업로드" width={50} /> 앱에서 업로드, 미리보기 처리*/}
        </Buttons>
      </>
    );
  }

  if (mode === 'sellcar' || mode === 'dealer') {
    return (
      <>
        <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
        <p className="exp">
          이제 쉽고 간편하게
          <br />
          오토벨에서 제공하는 촬영기능을 사용해 보세요!
        </p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} onClick={handleOuterPopup} />
          <Button size="sml" background="blue80" radius={true} title="촬영하기" width={61} onClick={handleLiveShot} />
          <Button size="sml" background="blue80" radius={true} title="사진 리로드" width={61} onClick={onLiveShotClose} />
        </Buttons>
      </>
    );
  }

  if (isReShot) {
    return (
      <>
        <Buttons align="center" marginTop={20}>
          <Button size="mid" background="blue80" radius={true} title="재촬영" width={84} height={38} fontWeight={500} onClick={handleLiveShot} />
          <Button size="mid" background="blue80" radius={true} title="사진 리로드" width={84} height={38} fontWeight={500} onClick={onLiveShotClose} />
        </Buttons>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={0} onClose={handlePreviewClose}>
          {isPreview && <MobPhotoList photoList={livePhotos} callback={handleLiveShot} />}
        </MobFullpagePopup>
        <RodalPopup show={isAppMovePopUp} type={'fade'} closedHandler={handleAppMovePopUpToggle} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>오토벨APP으로 이동합니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={handleAppMovePopUpToggle} />
            </Buttons>
          </div>
        </RodalPopup>
      </>
    );
  }
  return (
    <>
      <div className="photo-area">
        <p className="tit2">가이드에 맞춰 사진 촬영을 진행해 주세요</p>
        <div className="photo-wrap" />
        <Buttons align="center" marginTop={20}>
          <Button size="mid" background="blue80" radius={true} title="촬영하기" width={84} height={38} fontWeight={500} onClick={handleLiveShot} />
          <Button size="mid" background="blue80" radius={true} title="사진 리로드" width={84} height={38} fontWeight={500} onClick={onLiveShotClose} />
        </Buttons>
      </div>
      <MobFullpagePopup active={mFullpagePopup} paddingBottom={0} onClose={handlePreviewClose}>
        {isPreview && <MobPhotoList photoList={livePhotos} callback={handleLiveShot} />}
      </MobFullpagePopup>
      <RodalPopup show={isAppMovePopUp} type={'fade'} closedHandler={handleAppMovePopUpToggle} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          <p>오토벨APP으로 이동합니다.</p>
          <Buttons align="right" marginTop={24}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={handleAppMovePopUpToggle} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
});

MobLiveShot.propTypes = {
  crId: PropTypes.string.isRequired,
  crNo: PropTypes.string.isRequired,
  crType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isPreview: PropTypes.bool,
  isReShot: PropTypes.bool,
  livePhotos: PropTypes.array,
  memberType: PropTypes.string,
  shotType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onLiveShotClose: PropTypes.func,
  onPreViewClose: PropTypes.func,
  mode: PropTypes.string,
  handleOuterPopup: PropTypes.func,
  pictureCount: PropTypes.number
};

MobLiveShot.defaultProps = {
  isReShot: false
};

MobLiveShot.displayName = 'MobLiveShot';

export default MobLiveShot;
