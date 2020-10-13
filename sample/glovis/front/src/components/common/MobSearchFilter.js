import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { cloneDeep } from 'lodash';
import { ClipLoader } from 'react-spinners';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobFilterOption from '@src/components/common/MobFilterOption';
import MobFilterArea from '@src/components/common/MobFilterArea';
import MobFilterColor from '@src/components/common/MobFilterColor';
import MobFilterFuel from '@src/components/common/MobFilterFuel';
import MobFilterGearbox from '@src/components/common/MobFilterGearbox';
import MobFilterEngine from '@src/components/common/MobFilterEngine';
import Button from '@lib/share/items/Button';
import InputNumber from '@lib/share/items/InputNumber';
import Radio from '@lib/share/items/Radio';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import FilterRange from '@lib/share/items/FilterRange';
import DynamicCategory from '@lib/share/items/DynamicCategory';
import CategoryItem from '@lib/share/items/CategoryItem';
import MobSelectList from '@lib/share/items/MobSelectList';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { createCate, getCarDefaultFilter, getCarDistance, getCarNumberOfYears } from '@src/utils/CarFilterUtil';
import { getPricingCarColors } from '@src/components/pricingSystem/pricingUtil';

const MobSearchFilter = memo(
  ({
    canUseCho,
    canUseCarType,
    canUseCarModel,
    canUseYear,
    canUseDrvDist,
    canUsePrice,
    canUseAutoBellSvc,
    canUseLoc,
    canUseOption,
    canUseColor,
    canUseFull,
    canUseMission,
    canUseDspl,
    canUseRecently,
    dataContext,
    isMultiSelect,
    isReset,
    isSelectButton,
    selectionMode,
    onReset,
    onSelect,
    selectAll,
    clearTrigger
  }) => {
    const { isSection, mFullpagePopup } = useSelector((state) => state.common);
    const dispatch = useDispatch();

    const [cookies, setCookie] = useCookies(['item']);
    const [popupOption, setPopUpOption] = useState(['back', 'reset']);
    const [filterData, setFilterData] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [yearMode, setYearMode] = useState(1);
    const [distanceMode, setDistanceMode] = useState(1);
    const [priceMode, setPirceMode] = useState(1);

    const [fpFilter01, setFpFilter01] = useState(false);
    const [fpFilter01Result, setFpFilter01Result] = useState('yes');
    const [fpFilter01Kind, setFpFilter01Kind] = useState(null);
    const [fpFilter01Research, setFpFilter01Research] = useState('no');
    const [fpFilter02, setFpFilter02] = useState(false);
    const [fpFilter03, setFpFilter03] = useState(false);
    const [fpFilter04, setFpFilter04] = useState(false);
    const [fpFilter05, setFpFilter05] = useState(false);
    const [fpFilter06, setFpFilter06] = useState(false);
    const [fpFilter07, setFpFilter07] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getNationId = () => {
      if (objIsEmpty(selectedItem.cho) || selectedItem.cho.length === 2) {
        return 0;
      }

      return selectedItem.cho[0];
    };

    const getFirstItem = (filterSourcePath, sourcePath, valuePropertyPath, labelPropertyPath) => {
      if (objIsEmpty(filterData) || objIsEmpty(selectedItem) || objIsEmpty(selectedItem[sourcePath])) {
        return null;
      }

      const firstItemCd = selectedItem[sourcePath][0];
      const findItem = filterData[filterSourcePath].find((x) => x[valuePropertyPath] === firstItemCd);

      if (findItem) {
        if (selectedItem[sourcePath].length === 1) {
          return (
            <ul className="select1">
              <li>{findItem[labelPropertyPath]}</li>
            </ul>
          );
        }

        return (
          <ul className="select1">
            <li>{`${findItem[labelPropertyPath]} 외 ${selectedItem[sourcePath].length - 1}`}</li>
          </ul>
        );
      }

      return null;
    };

    const handleFullpagePopup = useCallback(
      (name, query) => (e) => {
        e.preventDefault();
        if (name === 'f1') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: selectionMode === 'class' ? '모델/등급' : `제조사/모델${selectionMode === 'model' ? '' : '/등급'}`,
              options: popupOption
            }
          });
          query.split('&').map((v) => {
            const val = v.split('=');
            if (val[0] === 'result') {
              setFpFilter01Result(val[1]);
              if (val[1] === 'no') setFpFilter01Kind(null);
            } else if (val[0] === 'kind') {
              setFpFilter01Kind(val[1]);
            } else if (val[0] === 'research') {
              setFpFilter01Research(val[1]);
            }
          });
          setFpFilter02(false);
          setFpFilter03(false);
          setFpFilter04(false);
          setFpFilter05(false);
          setFpFilter06(false);
          setFpFilter07(false);
          setFpFilter01(true);
        } else if (name === 'f2') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '옵션',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter03(false);
          setFpFilter04(false);
          setFpFilter05(false);
          setFpFilter06(false);
          setFpFilter07(false);
          setFpFilter02(true);
        } else if (name === 'f3') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '색상',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter02(false);
          setFpFilter04(false);
          setFpFilter05(false);
          setFpFilter06(false);
          setFpFilter07(false);
          setFpFilter03(true);
        } else if (name === 'f4') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '연료',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter02(false);
          setFpFilter03(false);
          setFpFilter05(false);
          setFpFilter06(false);
          setFpFilter07(false);
          setFpFilter04(true);
        } else if (name === 'f5') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '변속기',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter02(false);
          setFpFilter03(false);
          setFpFilter04(false);
          setFpFilter06(false);
          setFpFilter07(false);
          setFpFilter05(true);
        } else if (name === 'f6') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '배기량',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter02(false);
          setFpFilter03(false);
          setFpFilter04(false);
          setFpFilter05(false);
          setFpFilter07(false);
          setFpFilter06(true);
        } else if (name === 'f7') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '지역',
              options: popupOption
            }
          });
          setFpFilter01(false);
          setFpFilter02(false);
          setFpFilter03(false);
          setFpFilter04(false);
          setFpFilter05(false);
          setFpFilter06(false);
          setFpFilter07(true);
        }
      },
      [dispatch, popupOption, selectionMode]
    );

    const handlePopUpClose = useCallback(() => {
      setFpFilter01(false);
      setFpFilter02(false);
      setFpFilter03(false);
      setFpFilter04(false);
      setFpFilter05(false);
      setFpFilter06(false);
      setFpFilter07(false);
    }, []);

    const handlePopUpReset = useCallback(
      (e) => {
        if (onReset) {
          onReset(e);
        }
      },
      [onReset]
    );

    const onHandleModeChanged = (mode) => (e) => {
      e.preventDefault();
      if (mode === 'year') {
        setYearMode(yearMode === 1 ? 2 : 1);
      } else if (mode === 'distance') {
        setDistanceMode(distanceMode === 1 ? 2 : 1);
      } else if (mode === 'price') {
        setPirceMode(priceMode === 1 ? 2 : 1);
      }
    };

    const onHandleChoChanged = useCallback(
      (e, deps) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        const tmp = { ...selectedItem };

        if (isMultiSelect === true) {
          if (tmp.cho.includes(String(deps.id))) {
            tmp.cho.splice(tmp.cho.indexOf(String(deps.id)), 1);
          } else {
            tmp.cho.push(String(deps.id));
          }
        } else {
          tmp.cho = [String(deps.id)];
        }

        setSelectedItem(tmp);
      },
      [isMultiSelect, selectedItem]
    );

    const onHandleCarTypeChanged = useCallback(
      (e, deps) => {
        const tmp = { ...selectedItem };

        if (isMultiSelect === true) {
          if (tmp.carType.includes(deps.id)) {
            tmp.carType.splice(tmp.carType.indexOf(deps.id), 1);
          } else {
            tmp.carType.push(deps.id);
          }
        } else {
          tmp.carType = [deps.id];
        }

        setSelectedItem(tmp);
      },
      [isMultiSelect, selectedItem]
    );

    const onHandleYearRangeChanged = useCallback(
      (value) => {
        const tmp = Object.assign({ ...selectedItem }, { yearRange: value });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandleYearMinChanged = useCallback(
      (e, deps) => {
        const tmp = Object.assign({ ...selectedItem }, { yearRange: { min: deps.min, max: selectedItem.yearRange.max } });

        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandleYearMaxChanged = useCallback(
      (e, deps) => {
        const tmp = Object.assign({ ...selectedItem }, { yearRange: { min: selectedItem.yearRange.min, max: deps.max } });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandleDistanceRangeChanged = useCallback(
      (value) => {
        const tmp = Object.assign({ ...selectedItem }, { distanceRange: value });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandleDistanceMinChanged = useCallback(
      (e, deps) => {
        const tmp = Object.assign({ ...selectedItem }, { distanceRange: { min: deps.min, max: selectedItem.distanceRange.max } });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandleDistanceMaxChanged = useCallback(
      (e, deps) => {
        const tmp = Object.assign({ ...selectedItem }, { distanceRange: { min: selectedItem.distanceRange.min, max: deps.max } });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const onHandlePriceRangeChanged = useCallback(
      (value) => {
        const tmp = Object.assign({ ...selectedItem }, { priceRange: value });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const handlePriceMinChanged = useCallback(
      (e) => {
        const tmp = Object.assign({ ...selectedItem }, { priceRange: { min: Number(e.target.value), max: selectedItem.priceRange.max } });

        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const handlePriceMaxChanged = useCallback(
      (e) => {
        const tmp = Object.assign({ ...selectedItem }, { priceRange: { min: selectedItem.priceRange.min, max: Number(e.target.value) } });
        setSelectedItem(tmp);
      },
      [selectedItem]
    );

    const handleSvcChanged = useCallback(
      (e, deps) => {
        const tmp = { ...selectedItem };

        if (isMultiSelect === true) {
          if (tmp.svc.includes(deps.cdId)) {
            tmp.svc.splice(tmp.svc.indexOf(deps.cdId), 1);
          } else {
            tmp.svc.push(deps.cdId);
          }
        } else {
          tmp.carType = [deps.id];
        }

        setSelectedItem(tmp);
      },
      [isMultiSelect, selectedItem]
    );

    const handleOptionChanged = useCallback(
      (e, deps) => {
        setFpFilter02(false);
        const tmp = Object.assign({ ...selectedItem }, { carOption: deps });
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleColorChanged = useCallback(
      (e, deps) => {
        setFpFilter03(false);
        const tmp = Object.assign({ ...selectedItem }, { color: deps });
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleFuelChanged = useCallback(
      (e, deps) => {
        e.preventDefault();
        setFpFilter04(false);
        const tmp = Object.assign({ ...selectedItem }, { fuel: deps });
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleMssChanged = useCallback(
      (e, deps) => {
        e.preventDefault();
        setFpFilter05(false);
        const tmp = Object.assign({ ...selectedItem }, { mss: deps });
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleEngineCallback = useCallback(
      (e, deps) => {
        e.preventDefault();
        setFpFilter06(false);
        const tmp = Object.assign({ ...selectedItem }, { engine: deps });
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleAreaChanged = useCallback(
      (e, deps) => {
        e.preventDefault();
        setFpFilter07(false);
        const tmp = { ...selectedItem };
        tmp.loc = deps;
        setSelectedItem(tmp);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleModelSelect = useCallback(
      (e, deps) => {
        if (objIsEmpty(deps)) {
          return;
        }

        let selectModels = deps;
        if (!Array.isArray(deps)) {
          selectModels = [deps];
        }

        const targetProp = {
          crMnfcCd: selectModels.length > 0 ? selectModels[0].manufactureId : null,
          crMnfcNm: selectModels.length > 0 ? selectModels[0].manufactureNm : null,
          crMdlCd: selectModels.length > 0 ? selectModels[0].modelId || selectModels[0].id : null,
          crMdlNm: selectModels.length > 0 ? selectModels[0].modelNm || selectModels[0].name : null,
          crDtlMdlCd: selectModels.length > 0 && selectModels[0].detailModelId ? [selectModels[0].detailModelId || selectModels[0].id] : [],
          crDtlMdlNm: selectModels.length > 0 && selectModels[0].detailModelNm ? [selectModels[0].detailModelNm || selectModels[0].name] : [],
          crClsCd: [],
          crClsNm: [],
          crDtlClsCd: [],
          crDtlClsNm: [],
          selectedModels: deps
        };

        selectModels.forEach((item) => {
          if (!objIsEmpty(item.classId)) {
            targetProp.crClsCd.push(item.classId);
            targetProp.crClsNm.push(item.classNm);
            targetProp.crDtlClsCd.push(item.id);
            targetProp.crDtlClsNm.push(item.name);
          } else if (!objIsEmpty(item.detailModelId)) {
            targetProp.crClsCd.push(item.id);
            targetProp.crClsNm.push(item.name);
          }
        });

        const tmp = Object.assign({ ...selectedItem }, targetProp);
        setSelectedItem(tmp);

        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      },
      [dispatch, selectedItem]
    );

    const handleRecentlySearchRemove = useCallback(() => {
      // eslint-disable-next-line no-debugger
      debugger;
    }, []);

    const handleSelect = useCallback(
      (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        if (onSelect) {
          onSelect(e, selectedItem);
        }
      },
      [onSelect, selectedItem]
    );

    // 초기화 버튼 작동시 내부 필터 초기화
    useEffect(() => {
      if (clearTrigger) setSelectedItem(dataContext);
    }, [clearTrigger]);

    useEffect(() => {
      if (isReset === true) {
        setPopUpOption(['back', 'reset']);
      } else {
        setPopUpOption(['back']);
      }
    }, [isReset]);

    useEffect(() => {
      setSelectedItem(objIsEmpty(dataContext) ? getCarDefaultFilter(isSection) : cloneDeep(dataContext));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const initData = getCarDefaultFilter(isSection);
      setIsLoading(true);
      axiosPost('/api/buycar/selectFilterTreedata.do', initData).then((res) => {
        axiosGet('/api/commonCode/selectCommonCodeList.do?cmCdTpId=CR002').then((encineRes) => {
          const payload = res.data?.data || [];
          const colorList = getPricingCarColors();

          payload.noyOptions = getCarNumberOfYears();
          payload.distOptions = getCarDistance();
          payload.dsplOptions = encineRes.data.data;
          payload.clr = payload.clr.map((item) => {
            const findColorItem = colorList.find((x) => x.cdId === item.sno);
            item.clr2Cd = null;
            if (findColorItem) {
              return Object.assign({ ...findColorItem }, { ...item });
            }

            return item;
          });

          setFilterData(payload);
          setSelectedItem(objIsEmpty(dataContext) ? initData : cloneDeep(dataContext));
          setIsLoading(false);
        });
      });

      if (cookies.item === undefined || cookies.item === null) {
        setCookie('item', []);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <div className="content-wrap">
          <ul className="m-menu-list tp1">
            {canUseCho && (
              <li className="arrow-none make-wrap">
                <span className="tit">
                  국산/수입
                  <span className="fr">
                    <ul className="radio-block small">
                      {!objIsEmpty(filterData) &&
                        filterData.cho.map((data, idx) => {
                          return (
                            <li key={idx}>
                              <Radio
                                className="txt"
                                id={`make-cho-${data.id}`}
                                isSelf={false}
                                label={data.dispnm}
                                value={String(data.id)}
                                checked={selectedItem?.cho.includes(String(data.id)) ? String(data.id) : null}
                                dataContext={data}
                                onClick={onHandleChoChanged}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </span>
                </span>
              </li>
            )}
            {canUseCarType && (
              <li className="arrow-none">
                <span className="tit mb16">차종</span>
                <ul className="cate-ico tp2">
                  {!objIsEmpty(filterData) &&
                    filterData.carType.map((data, idx) => {
                      return (
                        <CheckBoxItem
                          key={idx}
                          checked={selectedItem?.carType && selectedItem.carType.includes(data.id)}
                          dataContext={data}
                          id={`chk-cartype-${data.id}`}
                          name={data.id.toString()}
                          size="small"
                          onSelect={onHandleCarTypeChanged}
                        >
                          <i className="ico-light-car" />
                          <span className="ico-exp">{data.dispnm}</span>
                        </CheckBoxItem>
                      );
                    })}
                </ul>
              </li>
            )}
            {canUseCarModel && objIsEmpty(selectedItem?.selectedModels) && (
              <li onClick={handleFullpagePopup('f1', 'result=no')}>
                <span className="tit">{selectionMode === 'class' ? '모델/등급' : `제조사/모델${selectionMode === 'model' ? '' : '/등급'}`}</span>
              </li>
            )}
            {canUseCarModel && !objIsEmpty(selectedItem?.selectedModels) && (
              <li className="model">
                <div className="sel-wrap">
                  <span onClick={handleFullpagePopup('f1', 'result=no')} className="tit">
                    {selectionMode === 'class' ? '모델/등급' : `제조사/모델${selectionMode === 'model' ? '' : '/등급'}`}
                  </span>
                  <ul className="select1">
                    {selectedItem.crMnfcNm && <li onClick={handleFullpagePopup('f1', 'result=yes&kind=manufacturer')}>{selectedItem.crMnfcNm}</li>}
                    {selectedItem.crMdlNm && <li onClick={handleFullpagePopup('f1', 'result=yes&kind=model')}>{selectedItem.crMdlNm}</li>}
                  </ul>
                </div>
                {selectionMode !== 'model' && !objIsEmpty(selectedItem?.crDtlMdlNm) ? (
                  <ul className="select2">
                    <li onClick={handleFullpagePopup('f1', 'result=yes&kind=rating')}>
                      <span>
                        <span>{selectedItem.crDtlMdlNm[0]} </span>
                      </span>
                    </li>
                  </ul>
                ) : null}
              </li>
            )}
            {canUseYear && (
              <li className="arrow-none">
                <span className={yearMode === 1 ? 'tit' : 'tit mb10'}>
                  연식
                  <Button
                    className="fr"
                    size="sml"
                    background={yearMode === 1 ? 'blue20' : 'blue80'}
                    color={yearMode === 1 ? 'blue80' : null}
                    radius={true}
                    title="직접입력"
                    width={61}
                    height={30}
                    onClick={onHandleModeChanged('year')}
                  />
                </span>
                {yearMode === 1 ? (
                  <FilterRange rangeUnit="연식" initMin={1990} initMax={new Date().getFullYear() + 1} defaultValue={selectedItem?.yearRange} onChange={onHandleYearRangeChanged} />
                ) : (
                  <>
                    <MobSelectList
                      selectedItem={selectedItem?.yearRange}
                      itemsSource={filterData?.noyOptions || []}
                      displayMemberPath={'min'}
                      selectedValuePath={'min'}
                      width="46%"
                      placeHolder="선택"
                      onClick={onHandleYearMinChanged}
                    />
                    <em className="from">~</em>
                    <MobSelectList
                      selectedItem={selectedItem?.yearRange}
                      itemsSource={filterData?.noyOptions || []}
                      displayMemberPath={'max'}
                      selectedValuePath={'max'}
                      width="46%"
                      placeHolder="선택"
                      onClick={onHandleYearMaxChanged}
                    />
                  </>
                )}
              </li>
            )}
            {canUseDrvDist && (
              <li className="arrow-none">
                <span className={distanceMode === 1 ? 'tit' : 'tit mb10'}>
                  주행거리
                  <Button
                    className="fr"
                    size="sml"
                    background={distanceMode === 1 ? 'blue20' : 'blue80'}
                    color={distanceMode === 1 ? 'blue80' : null}
                    radius={true}
                    title="직접입력"
                    width={61}
                    height={30}
                    onClick={onHandleModeChanged('distance')}
                  />
                </span>
                {distanceMode === 1 ? (
                  <FilterRange rangeUnit="주행거리" initMin={0} initMax={200000} defaultValue={selectedItem?.distanceRange} step={1000} onChange={onHandleDistanceRangeChanged} />
                ) : (
                  <>
                    <MobSelectList
                      selectedItem={selectedItem?.distanceRange}
                      itemsSource={filterData?.distOptions || []}
                      displayMemberPath={'min'}
                      selectedValuePath={'min'}
                      width="46%"
                      onClick={onHandleDistanceMinChanged}
                    />
                    <em className="from">~</em>
                    <MobSelectList
                      selectedItem={selectedItem?.distanceRange}
                      itemsSource={filterData?.distOptions || []}
                      displayMemberPath={'max'}
                      selectedValuePath={'max'}
                      width="46%"
                      onClick={onHandleDistanceMaxChanged}
                    />
                  </>
                )}
              </li>
            )}
            {canUsePrice && (
              <li className="arrow-none">
                <span className={priceMode === 1 ? 'tit' : 'tit mb10'}>
                  가격
                  <Button
                    className="fr"
                    size="sml"
                    background={priceMode === 1 ? 'blue20' : 'blue80'}
                    color={priceMode === 1 ? 'blue80' : null}
                    radius={true}
                    title="직접입력"
                    width={61}
                    height={30}
                    onClick={onHandleModeChanged('price')}
                  />
                </span>
                {priceMode === 1 ? (
                  <FilterRange rangeUnit="가격" initMin={0} initMax={10000} defaultValue={selectedItem?.priceRange} step={100} onChange={onHandlePriceRangeChanged} />
                ) : (
                  <>
                    <InputNumber height={40} maxLength={9} width="46%" placeHolder="0만원" value={(selectedItem.priceRange.min || '').toString()} onChange={handlePriceMinChanged} />
                    <em className="from">~</em>
                    <InputNumber height={40} maxLength={9} width="46%" placeHolder="0만원" value={(selectedItem.priceRange.max || '').toString()} onChange={handlePriceMaxChanged} />
                  </>
                )}
              </li>
            )}
            {canUseAutoBellSvc && (
              <li className="arrow-none">
                <span className="tit mb16">오토벨 서비스</span>
                <ul className="autobell-chk-list">
                  {!objIsEmpty(filterData) &&
                    filterData.svc.map((data, idx) => {
                      return (
                        <li key={idx} className="live">
                          <CheckBox
                            id={`autobell-svc-${data.cdId}`}
                            isSelf={false}
                            title={data.cdNm}
                            sub={data.cdCmnt}
                            dataContext={data}
                            checked={selectedItem?.svc.includes(data.cdId)}
                            onChange={handleSvcChanged}
                          />
                        </li>
                      );
                    })}
                </ul>
              </li>
            )}
            {canUseLoc && (
              <li onClick={handleFullpagePopup('f7')}>
                <div className="sel-wrap">
                  <span className="tit">지역</span>
                  {getFirstItem('loc', 'loc', 'locCd', 'shortNm')}
                </div>
              </li>
            )}
            {canUseOption && (
              <li onClick={handleFullpagePopup('f2')}>
                <div className="sel-wrap">
                  <span className="tit">옵션</span>
                  {getFirstItem('carOpt', 'carOption', 'optCode', 'optName')}
                </div>
              </li>
            )}
            {canUseColor && (
              <li onClick={handleFullpagePopup('f3')}>
                <div className="sel-wrap">
                  <span className="tit">색상</span>
                  {getFirstItem('clr', 'color', 'sno', 'tby010ClrSnm')}
                </div>
              </li>
            )}
            {canUseFull && (
              <li onClick={handleFullpagePopup('f4')}>
                <div className="sel-wrap">
                  <span className="tit">연료</span>
                  {getFirstItem('fuel', 'fuel', 'cdId', 'cdNm')}
                </div>
              </li>
            )}
            {canUseMission && (
              <li onClick={handleFullpagePopup('f5')}>
                <div className="sel-wrap">
                  <span className="tit">변속기</span>
                  {getFirstItem('mss', 'mss', 'cdId', 'cdNm')}
                </div>
              </li>
            )}
            {canUseDspl && (
              <li onClick={handleFullpagePopup('f6')}>
                <div className="sel-wrap">
                  <span className="tit">배기량</span>
                  {getFirstItem('dsplOptions', 'engine', 'cdId', 'cdNm')}
                </div>
              </li>
            )}
            {canUseRecently && (
              <li className="arrow-none">
                <span className="tit">최근 검색 조건</span>
                <div className="search-filter-tooltip">
                  <p className="tx-exp-tp5 mb16">&#8251; 최근 검색조건은 모델 기준으로 최대 5개까지 자동 저장됩니다.</p>
                  <DynamicCategory>
                    {cookies?.item?.map((cateItem, idx) => {
                      const cateContents = createCate(cateItem);
                      return <CategoryItem category={cateContents} onClickRemove={handleRecentlySearchRemove} CateIdx={idx} key={idx} />;
                    })}
                  </DynamicCategory>
                </div>
              </li>
            )}
          </ul>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56} onClose={handlePopUpClose} onReset={handlePopUpReset}>
          {filterData && fpFilter01 && (
            <MobFilterModel
              hiddenTab={selectionMode === 'model' ? [2] : selectionMode === 'class' ? [0] : []}
              isMultiSelect={isMultiSelect}
              nationId={getNationId()}
              result={selectionMode === 'model' || selectionMode === 'class' ? 'yes' : fpFilter01Result}
              kind={selectionMode === 'model' ? 'model' : selectionMode === 'class' ? 'class' : fpFilter01Kind}
              selectedDepth={selectionMode === 'model' ? 2 : selectionMode === 'class' ? 3 : 5}
              research={fpFilter01Research}
              onCarModelSelect={handleModelSelect}
              dataContext={{ ...selectedItem.selectedModels, crMnfcNm: dataContext.crMnfcNm, crMnfcCd: dataContext.crMnfcCd }}
              selectAll={selectAll}
            />
          )}
          {filterData && fpFilter02 && (
            <MobFilterOption
              type="options"
              isMultiSelect={isMultiSelect}
              displayMemberPath={'optName'}
              selectedValuePath={'optCode'}
              itemsSource={filterData.carOpt || []}
              selectedItems={selectedItem.carOption}
              callback={handleOptionChanged}
            />
          )}
          {filterData && fpFilter03 && (
            <MobFilterColor
              isMultiSelect={isMultiSelect}
              displayMemberPath={'tby010ClrSnm'}
              selectedValuePath={'sno'}
              itemsSource={filterData.clr}
              selectedItems={selectedItem.color}
              callback={handleColorChanged}
            />
          )}
          {filterData && fpFilter04 && (
            <MobFilterFuel
              isMultiSelect={isMultiSelect}
              displayMemberPath={'cdNm'}
              selectedValuePath={'cdId'}
              itemsSource={filterData.fuel}
              selectedItems={selectedItem.fuel}
              callback={handleFuelChanged}
            />
          )}
          {filterData && fpFilter05 && (
            <MobFilterGearbox
              isMultiSelect={isMultiSelect}
              displayMemberPath={'cdNm'}
              selectedValuePath={'cdId'}
              itemsSource={filterData.mss}
              selectedItems={selectedItem.mss}
              callback={handleMssChanged}
            />
          )}
          {filterData && fpFilter06 && (
            <MobFilterEngine
              isMultiSelect={isMultiSelect}
              displayMemberPath={'cdNm'}
              selectedValuePath={'cdId'}
              itemsSource={filterData.dsplOptions}
              selectedItems={selectedItem.engine}
              callback={handleEngineCallback}
            />
          )}
          {filterData && fpFilter07 && (
            <MobFilterArea
              isMultiSelect={isMultiSelect}
              displayMemberPath={'shortNm'}
              selectedValuePath={'locCd'}
              itemsSource={filterData.loc}
              selectedItems={selectedItem.loc}
              callback={handleAreaChanged}
            />
          )}
        </MobFullpagePopup>
        {isSelectButton === true ? <Button className="fixed" size="full" background="blue80" title="검색" height={56} onClick={handleSelect} /> : null}
        {isLoading === true ? (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={true} />
          </div>
        ) : null}
      </>
    );
  }
);

MobSearchFilter.propTypes = {
  canUseCho: PropTypes.bool,
  canUseCarType: PropTypes.bool,
  canUseCarModel: PropTypes.bool,
  canUseYear: PropTypes.bool,
  canUseDrvDist: PropTypes.bool,
  canUsePrice: PropTypes.bool,
  canUseAutoBellSvc: PropTypes.bool,
  canUseLoc: PropTypes.bool,
  canUseOption: PropTypes.bool,
  canUseColor: PropTypes.bool,
  canUseFull: PropTypes.bool,
  canUseMission: PropTypes.bool,
  canUseDspl: PropTypes.bool,
  canUseRecently: PropTypes.bool,
  dataContext: PropTypes.object,
  isMultiSelect: PropTypes.bool,
  isReset: PropTypes.bool,
  isSelectButton: PropTypes.bool,
  selectionMode: PropTypes.string,
  onReset: PropTypes.func,
  onSelect: PropTypes.func,
  selectAll: PropTypes.bool,
  clearTrigger: PropTypes.bool
};

MobSearchFilter.defaultProps = {
  canUseCho: true,
  canUseCarType: true,
  canUseCarModel: true,
  canUseDrvDist: true,
  canUseYear: true,
  canUsePrice: true,
  canUseAutoBellSvc: true,
  canUseLoc: true,
  canUseOption: true,
  canUseColor: true,
  canUseFull: true,
  canUseMission: true,
  canUseDspl: true,
  canUseRecently: true,
  isMultiSelect: true,
  isReset: false,
  clearTrigger: false
};

export default MobSearchFilter;
