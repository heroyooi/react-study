import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import CarPictureApply from '@src/components/common/CarPictureApply';
import MobPhotoInfo from '@src/components/common/MobPhotoInfo';
import MobPhotoList from '@src/components/common/MobPhotoList';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
// import useRodal from '@lib/share/custom/useRodal';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';
// import { isAndroid, isIOS } from '@src/utils/CommonUtil';
import { getMemberType } from '@src/utils/LoginUtils';
import MobLiveShot from '@src/components/common/MobLiveShot';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getLiveShotCarImgList } from '@src/utils/LiveShotUtil';
import { inputPropAction } from '@src/actions/sellcar/sellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { selectSaleCarPic, insertSaleCarPic } from '@src/api/mypage/dealer/dealerProdApi';
import { getShootingPartList } from '@src/actions/sellcar/sellCarAction';
import { console, setTimeout } from 'globalthis/implementation';

// 모바일 차량사진 등록 팝업
const MobSellRegister = ({
  mode,
  onPrev,
  callback,
  photoList,
  mainSlotOptions = [],
  subSlotOptions = [],
  carObj = {},
  shottingComplete,
  userType = 0,
  trigger = false,
  reloadProcess = 'callback'
}) => {
  // const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, false);
  const [fpPhotoInfo, setFpPhotoInfo] = useState(false);
  const [fpPhotoList, setFpPhotoList] = useState(false);
  const [isAppCalled, setIsAppCalled] = useState(false); // 앱(카메라)가 호출 됬는지
  const [isApp, setIsApp] = useState(false); // 앱으로 접속했는지
  const [isAndroidApp, setIsAndroidApp] = useState(false); // 안드로이드 환경
  const [isIosApp, setIsIosApp] = useState(false); // IOS 환경
  const [appDownloadUrl, setAppDownloadUrl] = useState('');

  const [pictureCount, setPictureCount] = useState(0);
  const dispatch = useDispatch();

  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [carPhotoList, setCarPhotoList] = useState([]);
  const [crType, setCrType] = useState(carObj?.crTypeCd);

  useEffect(() => {
    // console.log('TEST503 MobSellRegister photoList change');
    if (!objIsEmpty(photoList)) {
      setPictureCount(photoList?.length);
    }
  }, [photoList]);

  useEffect(() => {
    // console.log('TEST503 MobSellRegister carObj change');
    setCrType(carObj.crTypeCd);
  }, [carObj]);

  // 최초 사진 로딩( 딜러 페이지 )
  useEffect(() => {
    // console.log('TEST503 MobSellRegister carObj photoList change');
    if (photoList && photoList?.length > 0) {
      showLoader();
      const { crId } = carObj; // prodItemFun
      Promise.all([selectSaleCarPic(crId).then((res) => res?.data), dispatch(getShootingPartList('dealer'))])
        .then(([res]) => {
          const { data, statusinfo } = res;
          // console.log('registerCarPhoto -> data ', data);
          if (statusinfo?.returncd === '000') {
            setCarPhotoList(data);
            setPictureCount(data?.length);
          }
        })
        .finally(() => {
          hideLoader();
        });
    }
  }, [dispatch, hideLoader, photoList, showLoader]);

  // 유저타입 : 사용자 (0) / 딜러 (1) / 평가사 (2)
  // 차량고유넘버 : 차량구분위한 id number
  // 차종 : 경차 (0) / 세단 (1) / SUV (2) / RV (3)
  // 차량번호 : 차량 번호판 번호
  // 촬영종류 : detail (0) / 360 (3)

  useEffect(() => {
    // console.log('TEST503 MobSellRegister navigator check');
    const UA = navigator.userAgent;
    console.log('MobSellRegister >>> USER-AGENT >>>>', UA);
    if (UA.includes('AUTOBELL_Android')) {
      setIsAndroidApp(true);
    } else if (UA.includes('AUTOBELL_iOS')) {
      setIsIosApp(true);
    }
  }, []);

  useEffect(() => {
    // console.log('TEST503 MobSellRegister app change');
    setAppDownloadUrl(getAppDownloadUrl());
    setIsApp(isAndroidApp || isIosApp);
  }, [isAndroidApp, isIosApp]);

  useEffect(() => {
    // console.log('TEST503 MobSellRegister trigger');
    if (trigger) {
      callback(null, changedPhotos.addedPhotos, changedPhotos.deletedPhotos);
    }
  }, [trigger]);

  // 촬영 기능 안내
  const handleOpenPhotoInfo = (e) => {
    e.preventDefault();
    setFpPhotoInfo(true);
  };
  const handleClosePhotoInfo = (e) => {
    e.preventDefault();
    setFpPhotoInfo(false);
  };

  // 시잔촬영 내역
  const handleOpenPhotoPopup = (e) => {
    e.preventDefault();
    setFpPhotoList(true);
  };
  const handleClosePhotoList = (e) => {
    e.preventDefault();
    setFpPhotoList(false);
  };

  // 촬영 기능 후 콜백 (업로드 된 목록 재조회)
  const handleShottingComplete = useCallback(
    (e, params) => {
      if (shottingComplete) {
        if (reloadProcess === 'callback') {
          shottingComplete(e, params);
        } else {
          if (e) e.preventDefault();
          // reloadProcess === 'self'   // 차량등록관리 정보수정
          showLoader();
          setCarPhotoList([]);
          setPictureCount(0);
          setTimeout(() => {
            const { crId } = carObj; // prodItemFun
            Promise.all([selectSaleCarPic(crId).then((res) => res?.data), dispatch(getShootingPartList('dealer'))])
              .then(([res]) => {
                const { data, statusinfo } = res;
                // console.log('registerCarPhoto -> data ', data);
                if (statusinfo?.returncd === '000') {
                  setCarPhotoList(data);
                  setPictureCount(data?.length);
                }
              })
              .finally(() => {
                hideLoader();
              });
          }, 1500);
        }
      }
      setIsAppCalled(true);
    },
    [carObj, dispatch, hideLoader, reloadProcess, shottingComplete, showLoader]
  );

  // TEST 사진 모두 클리어
  const handlePhotoClear = useCallback((e) => {
    e.preventDefault();
    setCarPhotoList([]);
  }, []);

  // 사진 수정 ,삭제 된 항목 처리용 - 이미 업로드 또는 로드만 된 사진은 교체 X
  const [changedPhotos, setChangedPhotos] = useState({ addedPhotos: [], deletedPhotos: [] });
  const handlePhotoChangeList = useCallback((type, sortNo) => {
    const { addedPhotos, deletedPhotos } = changedPhotos;
    let _addList = [];
    let _delList = [];
    if (type === 'add') {
      _addList = addedPhotos;
      if (!_addList.includes(sortNo)) {
        _addList.push(sortNo);
      }
      if (deletedPhotos.includes(sortNo)) {
        _delList = deletedPhotos.filter((x) => {
          return x !== sortNo;
        });
      }
    }
    if (type === 'del') {
      _delList = deletedPhotos;
      if (!_delList.includes(sortNo)) {
        _delList.push(sortNo);
      }
      if (addedPhotos.includes(sortNo)) {
        _addList = addedPhotos.filter((x) => {
          return x !== sortNo;
        });
      }
    }
    setChangedPhotos(Object.assign(changedPhotos, { addedPhotos: _addList.sort(), deletedPhotos: _delList.sort() }));
  });

  // 삭제 버튼 누른 사진
  const handleDeletePhoto = (checked) => {
    const { sortNo } = checked;
    handlePhotoChangeList('del', sortNo);
  };

  // 추가/수정한 사진
  const onChangePhoto = (e, temp1, temp2, item) => {
    const { sortNo } = item;
    handlePhotoChangeList('add', sortNo);
  };

  // 등록 버튼
  const handleCallback = (e) => {
    if (callback) {
      callback(e, changedPhotos.addedPhotos, changedPhotos.deletedPhotos);
    }
  };

  return (
    <div className="sell-register-wrap">
      {/* 모바일 웹 */}
      {!isApp && (
        <div className="info-wrap">
          <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
          <p className="exp">
            이제 쉽고 간편하게
            <br />
            오토벨에서 제공하는 촬영기능을 사용해 보세요!
          </p>
          <Buttons align="center" marginTop={16}>
            <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} onClick={handleOpenPhotoInfo} />
            <Button size="sml" background="blue80" radius={true} title="오토벨 App 다운받기" width={122} href={appDownloadUrl} />

            {/* 사진 리로드 테스트 */}
            <Button size="sml" line="gray" radius={true} title="사진 다시 로드" width={88} onClick={handleShottingComplete} />
            {/* <Button size="sml" background="blue80" radius={true} title="오토벨 App 다운받기" width={122} onClick={handlePhotoClear} /> */}
          </Buttons>
        </div>
      )}

      {isApp && (
        <div className="info-wrap">
          {/* 모바일 앱_촬영 기능 호출 전 / 후 */}
          {!isAppCalled ? (
            <MobLiveShot
              crId={carObj.crId}
              crNo={carObj.crNo}
              crType={crType}
              memberType={userType} //멤버 타입으로 딜러, 평가사 판단X, 호출하는 서비스에서 유져타입 보내게
              shotType={0}
              onLiveShotClose={handleShottingComplete}
              handleOuterPopup={handleOpenPhotoInfo} // handleOpenPhotoPopup <- 이건 모지?
              mode={mode}
              pictureCount={pictureCount}
              // isPreview={isPreview}
              // onPreViewClose={handlePreviewToggle}
            />
          ) : (
            <MobLiveShot
              crId={carObj.crId}
              crNo={carObj.crNo}
              crType={crType}
              isReShot={true}
              memberType={userType} //멤버 타입으로 딜러, 평가사 판단X, 호출하는 서비스에서 유져타입 보내게
              shotType={0}
              onLiveShotClose={handleShottingComplete}
              mode={mode}
              pictureCount={pictureCount}
              // isPreview={isPreview}
              // onPreViewClose={handlePreviewToggle}
            />
          )}
        </div>
      )}

      {/* 모바일 차량사진 등록 - 촬영기능 안내 클릭시 안내 팝업 */}
      <div className={fpPhotoInfo ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleClosePhotoInfo} />
      <MobBottomArea active={fpPhotoInfo} className="v-fp" isFixButton={true} zid={101}>
        <MobPhotoInfo callback={handleClosePhotoInfo} mode={mode} />
      </MobBottomArea>

      {/* 모바일 차량사진 등록 - 촬영본 미리보기 팝업 */}
      <div className={fpPhotoList ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleClosePhotoList} />
      <MobBottomArea active={fpPhotoList} className="v-fp" isFixButton={true} zid={101}>
        <MobPhotoList callback={handleClosePhotoList} />
      </MobBottomArea>

      {/* 사진 리스트*/}
      {/* <CarPictureApply popOpen={rodalPopupHandler} callback={callback} /> */}
      <CarPictureApply
        photoList={carPhotoList}
        mode={mode}
        onPrev={onPrev}
        callback={handleCallback}
        onChange={onChangePhoto}
        mainSlotOptions={mainSlotOptions}
        subSlotOptions={subSlotOptions}
        handleDeletePhotoOfList={handleDeletePhoto}
        dealer={userType === 1 ? true : false}
      />
    </div>
  );
};

export default MobSellRegister;
