import React, { useState, useEffect, useCallback, useContext, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import StudioReservationPopup from '@src/components/mypage/common/studioReservationPopup';
import { setComma } from '@src/utils/StringUtil';

import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

import ProdListItemA from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemA';
import ProdListItemB from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemB';
import ProdListItemC from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemC';
import { SystemContext } from '@src/provider/SystemProvider';

import { getCommonCodeAsync } from '@src/utils/DataUtils';
import popComplete from './popComplete';
import popModifyCarInfo from './popModifyCarInfo';
import popModifyCarPhoto from './popModifyCarPhoto';
import popModifyPerfInsp from './popModifyPerfInsp';
import popModifyPrice from './popModifyPrice';
import popUpdateTimePicker from './popUpdateTimePicker';
import popUpStudioReservation from './popUpStudioReservation';
import popUpShotReservation from './popUpShotReservation';
import popSendProd from './popSendProd';

import { DeleteReasonList } from '@src/constant/dealer/dealerProd';

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Link from 'next/link';

const basicRodalProps = {
  popComplete: {
    title: '판매완료 신고',
    size: 'medium',
    component: popComplete
  },
  popModifyCarInfo: {
    title: '차량정보 수정',
    size: 'large',
    component: popModifyCarInfo
  },
  popModifyCarPhoto: {
    title: '차량사진 수정',
    size: 'large',
    component: popModifyCarPhoto
  },
  popModifyPerfInsp: {
    title: '성능기록부 수정',
    size: 'large',
    component: popModifyPerfInsp
  },
  popModifyPrice: {
    title: '가격 수정',
    size: 'medium',
    component: popModifyPrice
  },
  popUpdateTimePicker: {
    title: '업데이트 시간 변경',
    size: 'large',
    component: popUpdateTimePicker
  },
  popUpStudioReservation: {
    title: 'Live Studio 촬영 예약',
    size: 'medium',
    component: popUpStudioReservation
  },
  popUpShotReservation: {
    title: 'Live Studio 촬영 예약',
    size: 'medium',
    component: popUpShotReservation
  },
  popSendProd: {
    title: '낙찰차량 보내기',
    size: 'medium',
    component: popSendProd
  },
};

const ProdList = ({ onClick, changingEvent, checkItem, statusList, items = [], selectedItems = [], params, popupHandler, reloadListHandler, memberInfo, isRestrained}) => {
  // console.log('selectedItems : ', selectedItems)
  console.log("ProdList -> memberInfo", memberInfo)
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);
  const [displayPop, setDisplayPop, showPop, closePop] = useRodal(false, true);
  const [componentName, setComponentName] = useState('popComplete');
  const [title, setTitle] = useState('판매완료 신고');
  const [size, setSize] = useState('large');
  const [prodItem, setProdItem] = useState(null);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [mssTypes, setMssTypes] = useState([]);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { sttDvcd = '0010' } = params;

  const showComponentPop = (e, name, item) => {
    console.log("ProdFilterTab showComponentPop -> isRestrained", isRestrained)
    if(isRestrained){
      showAlert('회원님은 현재 제한 중입니다')
      return
    }

    setComponentName(name);
    setTitle(basicRodalProps[name]?.title);
    setSize(basicRodalProps[name]?.size);
    setProdItem(item);
    console.log("ProdFilterTab showComponentPop -> item", item)
    showPop(e, 'slideUp');
  };

  const onClose = (e) => {
    console.log('onClose e : ', e);
    closePop(false);
  };

  const extendPeriod = (e, item) => {
    console.log('e : ', e);
    console.log('item : ', item);

    //Router
  };

  const goRegister = (item) => {
    console.log('goRegister : ', item);
    const { dlrPrdId } = item;

    Router.push(`/mypage/dealer/sellcar/registerCarInfo?${qs.stringify({ dlrPrdId })}`)
  };

  const mss = useCallback((mssDvcd) => mssTypes.find((carMss) => carMss.value == mssDvcd)?.label, [mssTypes]);
  const fuel = useCallback((fuelDvcd) => fuelTypes.find((carFuel) => carFuel.value == fuelDvcd)?.label, [fuelTypes]);
  const delRsn = useCallback((slDelRsnCd) => DeleteReasonList.find((reason) => reason.value == slDelRsnCd)?.title, [DeleteReasonList]);

  useEffect(() => {
    getCommonCodeAsync('FM047').then(setMssTypes);
    getCommonCodeAsync('FM048').then(setFuelTypes);
  }, []);

  // 전체선택 - 차량 목록
  const checkData = [
    { id: 'banner-item1-chk-1', checked: true },
    { id: 'banner-item1-chk-2', checked: true },
    { id: 'banner-item1-chk-3', checked: false }
  ];
  const [chkCar, setChkCar] = useState(checkData);
  const [chkCarAll, setChkCarAll] = useState(checkData.every((v) => v.checked === true));
  const handleChkCar = (id) => (e) => {
    const copyCar = [...chkCar];
    copyCar.map((v) => {
      if (v.id === e.target.id) {
        v.checked = !v.checked;
      }
    });
    setChkCar(copyCar);
    setChkCarAll(copyCar.every((v) => v.checked === true));
  };
  const handleChkCarAll = (e) => {
    const copyCar = [...chkCar];
    copyCar.map((v) => (v.checked = e.target.checked === true ? true : false));
    setChkCar(copyCar);
    setChkCarAll((prevCheck) => !prevCheck);
  };

  const reloadEvent = useCallback(() => {
    reloadListHandler(sttDvcd);
  }, [reloadListHandler, sttDvcd]);

  return (
    <>
      {!hasMobile ? (
        <>
          <ul className="register-img-list">
            {items.length ? (
              items?.map((item, i) => (
                <li key={i}>
                  {['0010', '0020', '0030'].includes(item.sttDvcd) ? (
                    // 상태코드 : 정상판매, 관리필요, 판단보류
                    <ProdListItemA
                      item={item}
                      idx={i}
                      checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                      mss={mss(item?.car?.mssDvcd)}
                      fuel={fuel(item?.car?.fuelDvcd)}
                      showPopEventHandler={showComponentPop}
                      checkItem={checkItem}
                    />
                  ) : ['0050'].includes(item.sttDvcd) ? (
                    // 상태코드 : 대기차량
                    <ProdListItemB
                      idx={i}
                      item={item}
                      checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                      mss={mss(item?.car?.mssDvcd)}
                      fuel={fuel(item?.car?.fuelDvcd)}
                      showPopEventHandler={showComponentPop}
                      checkItem={checkItem}
                      memberInfo={memberInfo}
                    />
                  ) : (
                    // 상태코드 : 판매완료, 삭제완료, 보류차량
                    <ProdListItemC
                      item={item}
                      idx={i}
                      checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                      mss={mss(item?.car?.mssDvcd)}
                      fuel={fuel(item?.car?.fuelDvcd)}
                      reason={item?.slDelRsn ?? delRsn(item?.slDelRsnCd)}
                      showPopEventHandler={showComponentPop}
                      checkItem={checkItem}
                    />
                  )}
                </li>
              ))
            ) : (
              <div className="list-none-wrap">
                <p className="list-none">
                  차량 목록이 없습니다.
                  <span>
                    광고효과 분석은 차량 등록 후<br />
                    48시간 이후 확인 하실 수 있습니다.
                  </span>
                </p>
              </div>
            )}
          </ul>

          {displayPop && (
            <RodalPopup show={displayPop} type={'fade'} closedHandler={closePop} title={title} size={size} mode="normal">
              {React.createElement(basicRodalProps[componentName]?.component, { changingEvent, onClose, prodItem, memberInfo })}
            </RodalPopup>
          )}
        </>
      ) : (
        <>
          {/* 이미 탭에 표기된 수치가 있는데 필요한가? */}
          {/* {items?.length > 0 && !['0010', '0020', '0030', '0050'].includes(items[0].sttDvcd) ? (
            <>
              <div>
                <ul className="date tx-black mb20">
                  <li>
                    총 <span className="tx-blue80">123</span>건 &nbsp;(2017.02.08 ~ 2017.05.07)
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )} */}
          {items.length ? (
            <>
              <div className="goods-list admin-list tp4">
                <ul>
                  {items?.map((item, i) => (
                    <li key={i}>
                      {['0010', '0020', '0030'].includes(item.sttDvcd) ? (
                        // 상태코드 : 정상판매, 관리필요, 판단보류
                        <ProdListItemA
                          item={item}
                          idx={i}
                          checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                          mss={mss(item?.car?.mssDvcd)}
                          fuel={fuel(item?.car?.fuelDvcd)}
                          showPopEventHandler={popupHandler}
                          checkItem={checkItem}
                          reloadListHandler={reloadEvent}
                          isRestrained={isRestrained}
                        />
                      ) : ['0050'].includes(item.sttDvcd) ? (
                        // 상태코드 : 대기차량
                        <ProdListItemB
                          idx={i}
                          item={item}
                          //checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                          mss={mss(item?.car?.mssDvcd)}
                          fuel={fuel(item?.car?.fuelDvcd)}
                          showPopEventHandler={popupHandler}
                          checkItem={checkItem}
                          reloadListHandler={reloadEvent}
                          memberInfo={memberInfo}
                          isRestrained={isRestrained}
                        />
                      ) : (
                        //상태코드 : 판매완료, 삭제완료, 보류차량
                        <ProdListItemC
                          item={item}
                          idx={i}
                          checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId === item?.dlrPrdId) >= 0}
                          mss={mss(item?.car?.mssDvcd)}
                          fuel={fuel(item?.car?.fuelDvcd)}
                          showPopEventHandler={popupHandler}
                          checkItem={checkItem}
                          reloadListHandler={reloadEvent}
                          isRestrained={isRestrained}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="list-none-wrap">
              <p className="list-none">
                조회조건에 해당하는 내역이 없습니다.
                <br />
                <br />
                광고효과 분석은 차량 등록 후<br />
                48시간 이후 확인 하실 수 있습니다.
              </p>
            </div>
          )}{' '}
        </>
      )}{' '}
    </>
  );
};

export default memo(ProdList);
