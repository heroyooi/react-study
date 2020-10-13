import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import CheckBox from '@lib/share/items/CheckBox';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectFreePassMgmtList } from '@src/api/mypage/dealer/dealerProdApi';
import { setComma, removeComma } from '@src/utils/StringUtil';
import { updateFreePassMgmt } from '@src/api/mypage/dealer/dealerAdverApi';

const MobUpdateManage = ({ updatePass, callback }) => {
  const dispatch = useDispatch();

  const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);

  const [isAllApplyChecked, setAllApplyChecked] = useState(false);
  const [isAllUnApplyChecked, setAllUnApplyChecked] = useState(false);

  const [applyCarList, setApplyCarList] = useState([]);
  const [unApplyCarList, setUnApplyCarList] = useState([]);

  const [selectedApplyIdList, setSelectedApplyIdList] = useState([]);
  const [selectedUnApplyIdList, setSelectedUnApplyIdList] = useState([]);

  const [originApplyIdLIst, setOriginApplyIdLIst] = useState([]);
  const [originUnApplyIdLIst, setOriginUnApplyIdLIst] = useState([]);

  const [fuelTypes, setFuelTypes] = useState([]);
  const [mssTypes, setMssTypes] = useState([]);

  useEffect(() => {
    showLoader();
    getCommonCodeAsync('FM047').then(setMssTypes);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    selectFreePassMgmtList()
      .then((res) => {
        console.log('res : ', res);
        const { data = {}, statusinfo } = res.data;

        if (statusinfo?.returncd === '000') {
          const { updateapplylist = [], updateunapplylist = [] } = data;
          setApplyCarList(updateapplylist);
          setUnApplyCarList(updateunapplylist);

          setOriginApplyIdLIst(updateapplylist.map((updateapply) => updateapply?.dlrPrdId));
          setOriginUnApplyIdLIst(updateunapplylist.map((updateunapply) => updateunapply?.dlrPrdId));
        }
      })
      .finally(() => hideLoader());
  }, []);

  useEffect(() => {
    if (selectedApplyIdList?.length) {
      setAllApplyChecked(applyCarList.every((applyCar) => !!selectedApplyIdList.includes(applyCar?.dlrPrdId)));
    } else {
      setAllApplyChecked(false);
    }
  }, [selectedApplyIdList, applyCarList]);

  useEffect(() => {
    if (selectedUnApplyIdList?.length) {
      setAllUnApplyChecked(unApplyCarList.every((unApplyCar) => !!selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)));
    } else {
      setAllUnApplyChecked(false);
    }
  }, [selectedUnApplyIdList, unApplyCarList]);

  /* 적용박스의 차량 클릭시 */
  const liClick = (e) => {
    const {
      target,
      target: { tagName }
    } = e;
    console.log('liClick -> tagName', tagName);
    if (tagName !== 'INPUT' && tagName !== 'LABEL') {
      // e.preventDefault()
      const li = findLi(target);
      console.log('liClick -> li', li);
      li.querySelector('input[type=checkbox]').click();
    }
  };

  const findLi = (target) => {
    const { tagName } = target;
    return tagName === 'LI' ? target : findLi(target.parentElement);
  };

  const isApplyChecked = useCallback(
    (applyCar) => {
      return selectedApplyIdList.includes(applyCar?.dlrPrdId);
    },
    [selectedApplyIdList]
  );

  const isUnApplyChecked = useCallback(
    (applyCar) => {
      return selectedUnApplyIdList.includes(applyCar?.dlrPrdId);
    },
    [selectedUnApplyIdList]
  );

  const onHandleChange = (e, item) => {
    const { name, checked } = e.target;
    console.log('e : ', e);
    console.log('item : ', item);
    if (name === 'apply') {
      setSelectedApplyIdList(checked ? [...selectedApplyIdList, item.dlrPrdId] : selectedApplyIdList.filter((id) => id !== item.dlrPrdId));
    } else {
      setSelectedUnApplyIdList(checked ? [...selectedUnApplyIdList, item.dlrPrdId] : selectedUnApplyIdList.filter((id) => id !== item.dlrPrdId));
    }
  };

  const allCheck = (e) => {
    const { name, checked } = e?.target;
    console.log('allCheck -> name', name);
    console.log('allCheck -> checked', checked);

    if (name === 'apply') {
      console.log('check all applyCarList');
      setSelectedApplyIdList(checked ? applyCarList.map((car) => car?.dlrPrdId) : []);
    } else {
      console.log('check all unApplyCarList');
      setSelectedUnApplyIdList(checked ? unApplyCarList.map((car) => car?.dlrPrdId) : []);
    }
  };

  const handleCancle = (e) => {
    if (callback) callback(e);
  };
  const handleConfirm = async (e) => {
    e.preventDefault();

    const newAppyCarList = applyCarList
      .filter((applyCar) => !originApplyIdLIst.includes(applyCar.dlrPrdId))
      .map(({ dlrPrdId }) => ({
        dlrPrdId,
        applyStt: 'Y'
      }));

    const newUnAppyCarList = unApplyCarList
      .filter((unApplyCar) => !originUnApplyIdLIst.includes(unApplyCar.dlrPrdId))
      .map(({ dlrPrdId }) => ({
        dlrPrdId,
        applyStt: 'N'
      }));
    const params = {
      updatePass,
      list: [...newAppyCarList, ...newUnAppyCarList]
    };

    if (params.list.length) {
      showLoader();
      const { data, statusinfo } = await updateFreePassMgmt(params).then((res) => res?.data);
      hideLoader();
      debugger;
      if (statusinfo.returncd === '000') {
        handleCancle(e);
        showAlert('저장되었습니다');
      } else {
        showAlert('오류가 발생했습니다. 관리자에게 문의해주세요.');
      }
    } else {
      showAlert('변경사항이 없습니다');
    }
    handleCancle(e);
  };

  const moveToUnApply = useCallback(
    (e) => {
      e.preventDefault();
      setUnApplyCarList([...applyCarList.filter((applyCar) => selectedApplyIdList.includes(applyCar?.dlrPrdId)).map((item) => ({ ...item })), ...unApplyCarList.map((item) => ({ ...item }))]);
      setApplyCarList(applyCarList.filter((applyCar) => !selectedApplyIdList.includes(applyCar?.dlrPrdId)).map((item) => ({ ...item })));
      setSelectedApplyIdList([]);
    },
    [applyCarList, selectedApplyIdList]
  );

  const moveToApply = useCallback(
    (e) => {
      e.preventDefault();
      if (parseInt(updatePass?.crSlot) < applyCarList.length + selectedUnApplyIdList.length) {
        showAlert('등록가능 대수를 초과하였습니다');
      } else {
        console.log('<====== 이동');

        console.log('moveToApply -> unApplyCarList', unApplyCarList);
        console.log('moveToApply -> selectedUnApplyIdList', selectedUnApplyIdList);

        setApplyCarList([...unApplyCarList.filter((unApplyCar) => selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)).map((item) => ({ ...item })), ...applyCarList.map((item) => ({ ...item }))]);
        setUnApplyCarList(unApplyCarList.filter((unApplyCar) => !selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)).map((item) => ({ ...item })));
        // setSelectedApplyIdList(checked ? applyCarList.map(car => car?.dlrPrdId) : [])
        setSelectedUnApplyIdList([]);
      }
    },
    [updatePass, unApplyCarList, selectedUnApplyIdList]
  );

  // 전체선택 - 차량 목록
  // const checkData = [
  //   { id: 'banner-item1-chk-1', checked: true },
  //   { id: 'banner-item1-chk-2', checked: false }
  // ];
  // const [chkCar, setChkCar] = useState(checkData);
  // const [chkCarAll, setChkCarAll] = useState(checkData.every((v) => v.checked === true));
  // const handleChkCar = (id) => (e) => {
  //   const copyCar = [...chkCar];
  //   copyCar.map((v) => {
  //     if (v.id === e.target.id) {
  //       v.checked = !v.checked;
  //     }
  //   });
  //   setChkCar(copyCar);
  //   setChkCarAll(copyCar.every((v) => v.checked === true));
  // };
  // const handleChkCarAll = (e) => {
  //   const copyCar = [...chkCar];
  //   copyCar.map(v => v.checked = (e.target.checked === true) ? true : false);
  //   setChkCar(copyCar);
  //   setChkCarAll((prevCheck) => !prevCheck);
  // };

  // 모바일 팝업
  const [selectPop, setSelectPop, openSelectPop, closeDimmSelectPop] = useRodal(false);
  const closeSelectPop = useCallback((e) => {
    e.preventDefault();
    setSelectPop(false);
  }, []);

  return (
    <>
      <div className="update-manage-sec">
        <div className="float-wrap">
          <p>{`이용권 정보: ${updatePass?.regMm}개월 ${updatePass?.crSlot}대`}</p>
          <ul>
            <li className="day">{`D-${updatePass?.retentionperiod ?? 0}`}</li>
            <li className="state">{`${updatePass?.prdUseCnt}대/${updatePass?.crSlot}대`}</li>
          </ul>
        </div>
        <TabMenu type="type1" mount={false}>
          <TabCont tabTitle="적용 차량" id="tab1-1" index={0}>
            <div className="float-wrap btn-xs mb20">
              <CheckBox id="chk-update-all01" title="전체선택" name="apply" isSelf={false} checked={isAllApplyChecked} onChange={allCheck} />
              <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 삭제" width={74} height={24} fontSize={10} fontWeight={500} onClick={moveToUnApply} />
            </div>
            <div className="goods-list admin-list tp4">
              <ul>
                {/* 차량정보 시작 */}
                {applyCarList.map((applyCar, i) => (
                  <li key={i} onClick={liClick}>
                    <CheckBox id={`chk-update01-${i}`} name="apply" checked={isApplyChecked(applyCar)} onChange={(e) => onHandleChange(e, applyCar)} />
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <Link href="/buycar/buyCarDetailType">
                          <a>
                            <h5 className="subject">{applyCar?.crNm}</h5>
                          </a>
                        </Link>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{applyCar?.crNo}</span>
                            <span>{applyCar?.frmYyyy}년형</span>
                            <span>{setComma(applyCar?.drvDist)}km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">
                                {setComma(applyCar?.slAmt / 10000)}
                                <span className="won">만원</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                ))}
                {/* 차량정보 끝 */}
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="미적용 차량" id="tab1-2" index={1}>
            <div className="float-wrap btn-xs mb20">
              <CheckBox id="chk-update-all02" title="전체선택" name="unApply" isSelf={false} checked={isAllUnApplyChecked} onChange={allCheck} />
              <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 추가" width={74} height={24} fontSize={10} fontWeight={500} onClick={moveToApply} />
            </div>
            <div className="goods-list admin-list tp4">
              <ul>
                {/* 차량 기본 정보 */}
                {unApplyCarList.map((applyCar, i) => (
                  <li key={i} onClick={liClick}>
                    <CheckBox id={`chk-update02-${i}`} name="unApply" checked={isUnApplyChecked(applyCar)} isSelf={false} onChange={(e) => onHandleChange(e, applyCar)} />
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <Link href="/buycar/buyCarDetailType">
                          <a>
                            <h5 className="subject">{applyCar?.crNm}</h5>
                          </a>
                        </Link>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{applyCar?.crNo}</span>
                            <span>{applyCar?.frmYyyy}년형</span>
                            <span>{setComma(applyCar?.drvDist)}km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">
                                {setComma(applyCar?.slAmt)}
                                <span className="won">만원</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                ))}
                {/* 차량 기본 정보 */}
              </ul>
            </div>
          </TabCont>
        </TabMenu>
      </div>
      <Buttons align="center" className="full fixed">
        <Button size="big" background="blue20" color="blue80" title="취소" measure="%" width={50} height={56} onClick={handleCancle} />
        <Button size="big" background="blue80" title="확인" measure="%" width={50} height={56} onClick={handleConfirm} />
      </Buttons>

      <RodalPopup show={selectPop} type={'fade'} closedHandler={closeDimmSelectPop} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          <p>미적용 차량을 선택해주세요.</p>
          <Buttons align="right" marginTop={24}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeSelectPop} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

export default MobUpdateManage;
