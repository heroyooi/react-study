import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { objIsEmpty, preventScroll, stringToDate } from '@src/utils/CommonUtil';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobCalendar from '@lib/share/items/MobCalendar';
import Input from '@lib/share/items/Input';
import InputNumber from '@lib/share/items/InputNumber';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobSelectList from '@lib/share/items/MobSelectList';
import useRodal from '@lib/share/custom/useRodal';
import Radio from '@lib/share/items/Radio';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import DatePicker from '@src/components/common/calendar/DatePicker';
import CarSelection from '@src/components/common/car/CarSelection';
import withSearchCar from '@src/hoc/pricing/withSearchCar';
import { MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';
import { findCodeNameItem, findLabelValue, getCarDefaultImage, getCarFirstRegDate, getCarOptionText, validationCarCond } from '@src/components/pricingSystem/pricingUtil';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import PricingCheckColors from './pricingCheckColors';
import PricingTsConfirm from './pricingTsConfirm';
import PricingCarOptions from './pricingCarOptions';

const PricingSearchCar = memo(
  ({
    canUseOwnerName,
    clrOptions,
    carCondOptions,
    dataContext,
    dsplOptions,
    fuelOptions,
    mssOptions,
    noyOptions,
    hasMobile,
    hasMobileEdit,
    hasMobileOnlyCarNumberInput,
    isCarSelectionPopUp,
    router,
    type,
    onSetPricingCarInfoName,
    onSearchCarNoClick,
    onSearchCarCondClick,
    onTabCanged,
    onTsCancel,
    onSelectOptions,
    onSetToggleCarSelectionPopUp,
    onCarInfoUpdated
  }) => {
    const dispatch = useDispatch();

    const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);

    const query = router.query || {};

    const [namePopupShow, setNamePopupShow] = useRodal(false, true);
    const [uiWidth] = useState(type === 'marketPrice' ? 268.9 : 191);
    const [uiWidth2] = useState(type === 'marketPrice' ? 242 : 164);
    const [defaultOpton] = useState([{ value: '', label: '' }]);
    const [crNo, setCrNo] = useState(query.crNo ? query.crNo : '');
    const [ownerName, setOwnerName] = useState(query.owner ? query.owner : '');
    const [mobCarOptions, setMobCarOptions] = useState(null);
    const [fpFilterModel, setFpFilterModel] = useState(false);
    const [fpCalendar01, setFpCalendar01] = useState(false);
    const [isColorPopUp, setIsColorPopUp] = useState(false);
    const [isOptionPopUp, setIsOptionPopUp] = useState(false);
    const [accidentValue, setAccidentValue] = useState(objIsEmpty(dataContext?.historyData) ? 2 : 1);
    const [historyData, setHistoryData] = useState({});
    const [carCond, setCarCond] = useState(
      dataContext || {
        clr: null,
        dspl: null,
        fuel: null,
        mss: null,
        noy: null,
        frstRegDt: null,
        drvDist: null,
        modelInfo: {}
      }
    );
    const [isAlertPopUp, setIsAlertPopUp] = useRodal(false, false);
    const [isHistoryPopUp, setIsHistoryPopUp] = useRodal(false);
    const [fpCarHistory, setFpCarHistory] = useState(false);

    const handleFullpagePopup = useCallback(
      (e) => {
        e.preventDefault();
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '사고여부 체크',
            options: ['close']
          }
        });
        setFpCarHistory(true);
      },
      [dispatch]
    );

    const closeAlertPopup = useCallback(
      (e) => {
        e.preventDefault();
        setIsAlertPopUp(false);
      },
      [setIsAlertPopUp]
    );

    const handleClrChanged = useCallback(
      (e, deps) => {
        if (hasMobile && hasMobileEdit) {
          setIsColorPopUp(false);
        }
        setCarCond(Object.assign({ ...carCond }, { clr: e.value || deps.selectColor }));
      },
      [carCond, hasMobile, hasMobileEdit]
    );

    const handleDrvDistChanged = useCallback(
      (e) => {
        if (!isNaN(e.target.value)) {
          setCarCond(Object.assign({ ...carCond }, { drvDist: e.target.value }));
        }
      },
      [carCond]
    );

    const handleDsplChanged = useCallback(
      (e, deps) => {
        setCarCond(Object.assign({ ...carCond }, { dspl: e.value || deps.cdNm }));
      },
      [carCond]
    );

    const handleFuelChanged = useCallback(
      (e, deps) => {
        setCarCond(Object.assign({ ...carCond }, { fuel: e.cdNm || deps.cdNm }));
      },
      [carCond]
    );

    const handleMssChanged = useCallback(
      (e, deps) => {
        const newCarCond = Object.assign({ ...carCond }, { mss: e.cdNm || deps.cdNm });
        setCarCond(newCarCond);
      },
      [carCond]
    );

    const handleNoyChanged = useCallback(
      (e, deps) => {
        const newCarCond = Object.assign({ ...carCond }, { noy: e.value || deps.value });
        setCarCond(newCarCond);
      },
      [carCond]
    );

    const handleRlsPrc = useCallback(
      (e) => {
        if (e.target) {
          const newCarCond = Object.assign({ ...carCond }, { rlsPrc: e.target.value });
          setCarCond(newCarCond);
        }
      },
      [carCond]
    );

    const handleFrstRegDt = useCallback(
      (e) => {
        const newCarCond = Object.assign({ ...carCond }, { frstRegDt: e.format('YYYYMMDD') });
        setCarCond(newCarCond);
      },
      [carCond]
    );

    const handleCarOptionChange = useCallback(
      (e, deps) => {
        if (deps.carOptions) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          setMobCarOptions([...deps.carOptions]);
        } else if (!objIsEmpty(e)) {
          const newSelectedOptions = [...e].map((item) => {
            return Object.assign({ ...item }, { yn: 'Y' });
          });
          setCarCond(Object.assign({ ...carCond }, { carOptions: newSelectedOptions }));
        } else if (objIsEmpty(e)) {
          setCarCond(Object.assign({ ...carCond }, { carOptions: [] }));
        }
      },
      [carCond]
    );

    const handleCarOptionSelectConfirm = useCallback(
      (e) => {
        e.preventDefault();
        if (!objIsEmpty(mobCarOptions)) {
          setCarCond(Object.assign({ ...carCond }, { carOptions: mobCarOptions }));
        }
        setIsOptionPopUp(false);
      },
      [carCond, mobCarOptions]
    );

    const handleCarNoChanged = useCallback((e) => {
      setCrNo(e.target.value);
    }, []);

    const handleOwnerNameChange = useCallback((e) => {
      setOwnerName(e.target.value);
    }, []);

    const handleNameMod = useCallback(() => {
      onSetToggleCarSelectionPopUp();
    }, [onSetToggleCarSelectionPopUp]);

    const handleSearchCarNo = useCallback(
      (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }

        setIsAlertPopUp(false);

        if (objIsEmpty(crNo)) {
          alert('차량번호를 입력해주세요.');
          return;
        }
        if (onSearchCarNoClick) {
          onSearchCarNoClick(e, {
            crNo
          });
        }
      },
      [crNo, onSearchCarNoClick, setIsAlertPopUp]
    );

    const handleFullCalendarPopup = useCallback(
      (e) => {
        e.preventDefault();
        if (objIsEmpty(carCond.noy)) {
          alert('연식을 먼저 선택해 주세요.');
          return;
        }
        setFpFilterModel(false);
        setFpCalendar01(true);
        preventScroll(true);
      },
      [carCond]
    );

    const handleFullModelPopup = useCallback((e) => {
      e.preventDefault();
      return false;
    }, []);

    const calendarCallback = useCallback(
      (e, selectedDate) => {
        e.preventDefault();
        setFpCalendar01(false);
        const newCarCond = Object.assign({ ...carCond }, { frstRegDt: selectedDate.format('YYYYMMDD') });
        setCarCond(newCarCond);
        preventScroll(false);
      },
      [carCond]
    );

    const handleCloseFilterModel = useCallback(() => {
      setFpFilterModel(false);
    }, []);

    const handleCloseCalendar = useCallback(() => {
      setFpCalendar01(false);
    }, []);

    const handleSearchCarCond = useCallback(
      (e) => {
        e.preventDefault();
        if (validationCarCond(carCond) !== true) {
          return;
        }
        if (onSearchCarCondClick) {
          onSearchCarCondClick(e, carCond);
        }
      },
      [carCond, onSearchCarCondClick]
    );

    const handleSaveCallback = useCallback(
      (deps, deps2) => {
        let crNm = '';
        if (deps && deps.length === 5) {
          crNm = `${deps[0].text || ''} ${deps[2].text || ''} ${deps[3].text || ''} ${deps[4].text || ''}`;
        }
        onSelectOptions(
          {},
          {
            name: deps[4].text || '',
            manufactureNm: deps[0].text,
            manufactureId: deps[0].code,
            modelNm: deps[1].text,
            modelId: deps[1].code,
            detailModelNm: deps[2].text,
            detailModelId: deps[2].code,
            classNm: deps[3].text,
            classId: deps[3].code,
            isLeaf: true,
            title: null,
            checked: false,
            price: deps2
          }
        );

        getCarDefaultImage(deps[2].code).then((imgUrl) => {
          const newCarCond = Object.assign(
            { ...carCond },
            {
              crNm: crNm,
              rlsPrc: deps2 || 0,
              defaultImg: imgUrl,
              seriesNo: '',
              frstRegDt: null,
              drvDist: '',
              clr: '',
              dspl: '',
              fuel: '',
              mss: '',
              noy: '',
              carOptions: null,
              modelInfo: {
                crMnfcCd: deps.length > 0 ? deps[0].code : '',
                crMdlCd: deps.length > 1 ? deps[1].code : '',
                crDtlMdlCd: deps.length > 2 ? deps[2].code : '',
                crClsCd: deps.length > 3 ? deps[3].code : '',
                crDtlClsCd: deps.length > 4 ? deps[4].code : '',
                crMnfcCdNm: deps.length > 0 ? deps[0].text : '',
                crMdlCdNm: deps.length > 1 ? deps[1].text : '',
                crDtlMdlCdNm: deps.length > 2 ? deps[2].text : '',
                crClsCdNm: deps.length > 3 ? deps[3].text : '',
                crDtlClsCdNm: deps.length > 4 ? deps[4].text : ''
              }
            }
          );
          setCarCond(newCarCond);
          if (carCond.crNo) {
            onSetPricingCarInfoName(null, { crNm, rlsPrc: deps2 });
          } else {
            onSetPricingCarInfoName(null, newCarCond);
          }
          onSetToggleCarSelectionPopUp();
        });
      },
      [carCond, onSelectOptions, onSetPricingCarInfoName, onSetToggleCarSelectionPopUp]
    );

    const handleCancleEmitter = useCallback(
      (data) => {
        console.log(data);
        onSetToggleCarSelectionPopUp();
      },
      [onSetToggleCarSelectionPopUp]
    );

    const handleTabChanged = useCallback(
      (e, deps) => {
        const tabName = deps === 0 ? 'CarNumber' : 'CarCondition';

        if (onTabCanged) {
          onTabCanged(e, { tabName });
        }
      },
      [onTabCanged]
    );

    const handleCarSelectionClosed = useCallback(() => {
      onSetToggleCarSelectionPopUp();
    }, [onSetToggleCarSelectionPopUp]);

    const handleColorPopUpToggle = useCallback(() => {
      setIsColorPopUp(!isColorPopUp);
    }, [isColorPopUp]);

    const handleOptionPopUpToggle = useCallback(() => {
      setIsOptionPopUp(!isOptionPopUp);
    }, [isOptionPopUp]);

    const handleCarModelSelect = useCallback(
      (e, deps) => {
        const newCarCond = Object.assign(
          { ...carCond },
          {
            crNm: `${deps.detailModelNm || ''} ${deps.classNm || ''} ${deps.name || ''}`,
            modelInfo: {
              crMnfcCd: deps.manufactureId,
              crMdlCd: deps.modelId,
              crDtlMdlCd: deps.detailModelId,
              crClsCd: deps.classId || deps.id,
              crDtlClsCd: deps.classId ? deps.id : '',
              crMnfcCdNm: deps.manufactureNm,
              crMdlCdNm: deps.modelNm,
              crDtlMdlCdNm: deps.detailModelNm,
              crClsCdNm: deps.classNm || deps.name,
              crDtlClsCdNm: deps.classNm ? deps.name : ''
            }
          }
        );
        setCarCond(newCarCond);
        setFpFilterModel(false);
      },
      [carCond]
    );

    const handleCloseHistory = useCallback(
      (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }

        if (hasMobile) {
          setFpCarHistory(false);
          let isAccident = false;
          const tmpData = carCond?.historyData;
          if (tmpData) {
            for (const prop in tmpData) {
              if (isAccident === false && tmpData[prop]) {
                isAccident = true;
              }
            }
          }
          if (isAccident === false) {
            setAccidentValue(2);
          }
        } else {
          const historyData = carCond?.historyData;

          let isAccident = false;
          for (const prop in historyData) {
            if (isAccident === false && historyData[prop]) {
              isAccident = true;
            }
          }

          setHistoryData(historyData);

          if (isAccident === false) {
            setAccidentValue(2);
          }

          setIsHistoryPopUp(false);
        }
      },
      [carCond, hasMobile, setIsHistoryPopUp]
    );

    const handleHistoryPopUpToggle = useCallback(
      (e) => {
        e.preventDefault();
        const next = !isHistoryPopUp;

        setIsHistoryPopUp(next);
      },
      [isHistoryPopUp, setIsHistoryPopUp]
    );

    const handleConfirmHistory = useCallback(
      (e, deps) => {
        e.preventDefault();
        debugger;
        if (hasMobile) {
          let isAccident = false;
          for (const prop in deps) {
            if (isAccident === false && deps[prop]) {
              isAccident = true;
            }
          }
          if (isAccident === false) {
            setAccidentValue(2);
          }
          setFpCarHistory(false);
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP_CLOSE
          });
          setCarCond(Object.assign({ ...carCond }, { historyData: deps }));
        } else {
          let isAccident = false;
          for (const prop in historyData) {
            if (isAccident === false && historyData[prop]) {
              isAccident = true;
            }
          }
          setIsHistoryPopUp(false);
          if (isAccident === false) {
            setAccidentValue(2);
          }
          setCarCond(Object.assign({ ...carCond }, { historyData }));
        }
      },
      [carCond, dispatch, hasMobile, historyData, setIsHistoryPopUp]
    );

    const handoeInputSkinChange = useCallback(
      (v, target, n) => {
        const newHistory = Object.assign({ ...historyData }, { [n]: v });
        setHistoryData(newHistory);
      },
      [historyData]
    );

    const onChangeAccident = useCallback(
      (e, val) => {
        e.preventDefault();
        if (accidentValue !== val) {
          setAccidentValue(val);

          if (val === 2) {
            setHistoryData({});
            setCarCond(Object.assign({ ...carCond }, { historyData: {} }));
          }
        }

        if (val === 1) {
          if (hasMobile === true) {
            handleFullpagePopup(e);
          } else {
            setIsHistoryPopUp(true);
          }
        }
      },
      [accidentValue, carCond, handleFullpagePopup, hasMobile, setIsHistoryPopUp]
    );

    useEffect(() => {
      setCarCond({ ...dataContext });
      if (!objIsEmpty(dataContext?.historyData)) {
        setAccidentValue(1);
      }
    }, [dataContext]);

    useEffect(() => {
      if (hasMobile) {
        window.scrollTo(0, 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setNamePopupShow(isCarSelectionPopUp);
    }, [isCarSelectionPopUp, setNamePopupShow]);

    const HandleCarInfoUpdated = (e) => {
      e.preventDefault();
      if (objIsEmpty(carCond.drvDist) || parseInt(carCond.drvDist) < 1) {
        setTimeout(() => {
          alert('주행거리를 입력해주세요');
        });
        return;
      }

      if (objIsEmpty(carCond.clr)) {
        setTimeout(() => {
          alert('색상을 선택해주세요.');
        });
        return;
      }

      if (onCarInfoUpdated) {
        onCarInfoUpdated(e, carCond);
      }
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    };

    if (hasMobile && hasMobileOnlyCarNumberInput) {
      return (
        <PricingTsConfirm
          canUseOwnerName={canUseOwnerName}
          hasMobile={true}
          hasTsCert={type !== 'pricingSystem'}
          crNo={crNo}
          ownerName={ownerName}
          onNameChanged={handleOwnerNameChange}
          onCrNoChanged={handleCarNoChanged}
          onCertComplete={handleSearchCarNo}
          onCancel={onTsCancel}
        />
      );
    }

    if (hasMobile === true && hasMobileEdit === true) {
      return (
        <>
          <div className="content-wrap market-view-sec pt14 pb120">
            <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
              <caption>차량 기본 정보</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량명</th>
                  <td onClick={handleFullModelPopup}>{carCond.crNm}</td>
                </tr>
                {!objIsEmpty(carCond.crNo) && (
                  <tr>
                    <th>차량번호</th>
                    <td>{carCond.crNo}</td>
                  </tr>
                )}
                <tr>
                  <th>차량연식</th>
                  <td>
                    {!objIsEmpty(noyOptions) ? (
                      <MobSelectList
                        itemsSource={noyOptions}
                        selectedItem={findLabelValue(noyOptions, carCond.noy)}
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        onClick={handleNoyChanged}
                        subPop={true}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>
                    <MobSelectBox customMode={true} customName={carCond.clr || '색상'} isOpen={isColorPopUp} onOpen={handleColorPopUpToggle} subPop={true}>
                      <div className="inner filter-list-wrap pt0">
                        <PricingCheckColors mode="radio" selectedColor={carCond.clr || ''} onClick={handleClrChanged} />
                      </div>
                    </MobSelectBox>
                  </td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>
                    <MobSelectList
                      itemsSource={mssOptions}
                      selectedItem={findCodeNameItem(mssOptions, carCond.mss)}
                      displayMemberPath={'cdNm'}
                      selectedValuePath={'cdId'}
                      onClick={handleMssChanged}
                      subPop={true}
                    />
                  </td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>
                    <div onClick={handleFullCalendarPopup}>
                      <DatePicker defaultValue={carCond.frstRegDt ? carCond.frstRegDt : ''} inputWidth="100" inputMeasure="%" disabled={true} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>
                    {!objIsEmpty(noyOptions) ? (
                      <MobSelectList
                        itemsSource={dsplOptions}
                        selectedItem={findCodeNameItem(dsplOptions, carCond.dspl)}
                        displayMemberPath={'label'}
                        selectedValuePath={'cdId'}
                        onClick={handleDsplChanged}
                        subPop={true}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>
                    <MobSelectList
                      itemsSource={fuelOptions}
                      selectedItem={findCodeNameItem(fuelOptions, carCond.fuel)}
                      displayMemberPath={'cdNm'}
                      selectedValuePath={'cdId'}
                      onClick={handleFuelChanged}
                      subPop={true}
                    />
                  </td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>
                    <InputNumber placeHolder="예)10000" id="input-tp-drvdist" height={40} value={(carCond.drvDist || '').toString()} onChange={handleDrvDistChanged} />
                  </td>
                </tr>
                <tr>
                  <th>신차출고가</th>
                  <td>
                    <InputNumber placeHolder="0원" id="input-tp-price" maxLength={9} height={40} value={(carCond.rlsPrc || '').toString()} onChange={handleRlsPrc} />
                  </td>
                </tr>
                <tr>
                  <th>옵션</th>
                  <td>
                    <MobSelectBox
                      customMode={true}
                      isFixButton={false}
                      customName={getCarOptionText(mobCarOptions || carCond.carOptions)}
                      isOpen={isOptionPopUp}
                      onOpen={handleOptionPopUpToggle}
                      subPop={true}
                    >
                      <div className="inner car-option pb0">
                        <PricingCarOptions hasMobile={true} title="기본옵션" defaultOptions={mobCarOptions || carCond.carOptions} onChange={handleCarOptionChange} />
                      </div>
                      <Button size="full" background="blue80" title="선택" height={56} onClick={handleCarOptionSelectConfirm} />
                    </MobSelectBox>
                  </td>
                </tr>
                {type !== 'marketPrice' && (
                  <tr>
                    <th>사고여부</th>
                    <td>
                      <ul className="radio-block tp4 mid">
                        <li>
                          <Radio className="txt" id="accident-2" label="사고" value={1} checked={accidentValue} onClick={(e) => onChangeAccident(e, 1)} />
                        </li>
                        <li>
                          <Radio className="txt" id="accident-1" label="무사고" value={2} checked={accidentValue} onClick={(e) => onChangeAccident(e, 2)} />
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Button className="fixed" size="full" background="blue80" title="확인" onClick={HandleCarInfoUpdated} />
          {<div className={fpFilterModel ? `modal-bg active` : `modal-bg`} onClick={handleCloseFilterModel} />}
          {
            <MobBottomArea active={fpFilterModel} className="v-fp" isFixButton={true}>
              <MobFilterModel
                result={'yes'}
                kind={'class'}
                research={'no'}
                onCarModelSelect={handleCarModelSelect}
                dataContext={{
                  manufactureId: carCond.modelInfo.crMnfcCd,
                  manufactureNm: carCond.modelInfo.crMnfcCdNm,
                  modelId: carCond.modelInfo.crMdlCd,
                  modelNm: carCond.modelInfo.crMdlCdNm
                }}
              />
            </MobBottomArea>
          }
          {<div className={fpCalendar01 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCloseCalendar} />}
          {
            <MobBottomArea active={fpCalendar01} isFixButton={true} zid={102}>
              {fpCalendar01 && <MobCalendar date={getCarFirstRegDate(carCond)} callback={calendarCallback} />}
            </MobBottomArea>
          }

          <MobFullpagePopup active={mFullpageCPopup} paddingBottom={56} cPop={true} subPop={true} onClose={handleCloseHistory}>
            {fpCarHistory && (
              <>
                <form className="register-form history-form">
                  <DealerCarHistory type="pricing" historyData={carCond.historyData || {}} isScratch={false} onComfirm={handleConfirmHistory} />
                </form>
              </>
            )}
          </MobFullpagePopup>
        </>
      );
    }

    return (
      <>
        <TabMenu type="type1 border" callBack={handleTabChanged}>
          <TabCont tabTitle="차량 번호로 조회" id="SearchCarFilter2" index={0}>
            <PricingTsConfirm
              isPrivacyPolicy={type === 'marketPrice' ? true : false}
              canUseOwnerName={canUseOwnerName}
              crNo={crNo}
              hasTsCert={type !== 'pricingSystem'}
              ownerName={ownerName}
              onNameChanged={handleOwnerNameChange}
              onCrNoChanged={handleCarNoChanged}
              onCertComplete={handleSearchCarNo}
              onCancel={onTsCancel}
            />
          </TabCont>
          <TabCont tabTitle="차량정보 입력 조회" id="SearchCarFilter1" index={1}>
            <ul className="search-car-terms">
              <li className="full">
                <Input type="text" id="carTerms1" isSelf={false} data={carCond.crNm || ''} placeHolder="차량을 선택하세요." height={48} onClick={handleNameMod} />
              </li>
              <li>
                <SelectBox
                  id="carCondNoy"
                  className="items-sbox"
                  placeHolder="연식"
                  options={noyOptions || defaultOpton}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.noy}
                  disabled={carCond.crNm ? false : true}
                  width={uiWidth}
                  height={48}
                  onChange={handleNoyChanged}
                />
              </li>
              <li>
                <SelectBox
                  id="carCondClr"
                  className="items-sbox"
                  placeHolder="색상"
                  options={clrOptions || defaultOpton}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.clr}
                  disabled={carCond.crNm ? false : true}
                  width={uiWidth}
                  height={48}
                  onChange={handleClrChanged}
                />
              </li>
              <li>
                <SelectBox
                  id="carCondMss"
                  className="items-sbox"
                  placeHolder="변속기"
                  options={mssOptions || defaultOpton}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.mss}
                  disabled={carCond.crNm ? false : true}
                  width={uiWidth}
                  height={48}
                  onChange={handleMssChanged}
                />
              </li>
              <li>
                <DatePicker
                  inputPlaceholder="최초등록일"
                  displayDate={carCond.frstRegDt ? stringToDate(carCond.frstRegDt) : carCond.noy ? new Date(carCond.noy, 0, 1) : null}
                  disableDayAfter={new Date()}
                  disabled={carCond.noy ? false : true}
                  inputWidth={uiWidth}
                  inputHeight={48}
                  datepickerCustomClass="date-market"
                  onChange={handleFrstRegDt}
                />
              </li>
              <li>
                <SelectBox
                  id="carCondDspl"
                  className="items-sbox"
                  placeHolder="배기량"
                  options={dsplOptions || defaultOpton}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.dspl}
                  disabled={carCond.crNm ? false : true}
                  width={uiWidth}
                  height={48}
                  onChange={handleDsplChanged}
                />
              </li>
              <li>
                <SelectBox
                  id="carCondFuel"
                  className="items-sbox"
                  placeHolder="연료"
                  options={fuelOptions || defaultOpton}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.fuel}
                  disabled={carCond.crNm ? false : true}
                  width={uiWidth}
                  height={48}
                  onChange={handleFuelChanged}
                />
              </li>
              <li className="drvDist">
                <InputNumber width={uiWidth2} disabled={carCond.crNm ? false : true} value={carCond.drvDist || ''} height={48} placeHolder="주행거리" maxLength={6} onChange={handleDrvDistChanged} />{' '}
                <span style={{ marginLeft: '8px' }}>km</span>
              </li>
              <li className="rlsPrc">
                <InputNumber
                  width={uiWidth2}
                  disabled={carCond.crNm ? false : true}
                  value={(carCond.rlsPrc || '').toString()}
                  height={48}
                  maxLength={9}
                  placeHolder="신차출고가"
                  onChange={handleRlsPrc}
                />{' '}
                <span style={{ marginLeft: '8px' }}>원</span>
              </li>
              <li className="full">
                <SelectBox
                  id="carCondOption"
                  name="option"
                  className="items-sbox multi"
                  placeHolder="옵션"
                  disabled={carCond.crNm ? false : true}
                  hasSelectedItemValue={true}
                  selectedItemValue={carCond.carOptions || null}
                  options={carCondOptions}
                  multi={true}
                  width="100%"
                  closeMenuOnSelect={false}
                  height={48}
                  onChange={handleCarOptionChange}
                />
                <Button size="mid" background="blue80" title="선택" width={100} onClick={(e) => e.preventDefault()} />
              </li>
            </ul>
            {type !== 'marketPrice' && (
              <div className="radio-switch">
                <RadioGroup
                  dataList={[
                    { id: 'radio-1', value: 1, checked: false, disabled: false, title: '사고' },
                    { id: 'radio-2', value: 2, checked: false, disabled: false, title: '무사고' }
                  ]}
                  defaultValue={accidentValue}
                  onChange={(e) => onChangeAccident(e, Number(e.target.value))}
                  onClickArr={[(e) => handleHistoryPopUpToggle(e), null]}
                  onAccdClick={(e) => onChangeAccident(e, 1)}
                />
              </div>
            )}
            <Button className="fr" size="big" background="blue80" title="조회" width={uiWidth} onClick={handleSearchCarCond} />
          </TabCont>
        </TabMenu>
        <RodalPopup show={namePopupShow} type={'fade'} closedHandler={handleCarSelectionClosed} mode="normal" className="pop-car-name-mod" width={894}>
          <div className="con-wrap">
            {namePopupShow === true ? (
              <CarSelection
                item={carCond && carCond.modelInfo ? carCond.modelInfo : {}}
                saveCallback={handleSaveCallback}
                cancleEmitter={handleCancleEmitter}
                disabledTabIndex={carCond.crNo ? [0, 1, 2, 3] : []}
              />
            ) : null}
          </div>
        </RodalPopup>

        <RodalPopup show={isAlertPopUp} type={'fade'} width={380} closedHandler={closeAlertPopup} mode="normal" isMask={false} isButton={false}>
          <div className="con-wrap compact">
            <p>
              본인 차량만 조회할 수 있습니다.
              <br />
              본인 소유 차량의 차량번호로 다시 조회해 주세요.
            </p>
            <Buttons align="center" marginTop={30}>
              <Button size="sml" background="gray" radius={true} title="확인" width={68} onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={isHistoryPopUp} type={'fade'} closedHandler={handleCloseHistory} title="사고정보 입력" mode="normal" size="large">
          <div className="con-wrap popup-perform-record">
            <form className="register-form history-form">
              <DealerCarHistory type="pricing" historyData={historyData} isScratch={false} onChange={handoeInputSkinChange} />
            </form>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} onClick={handleCloseHistory} />
              <Button size="big" background="blue80" title="확인" width={172} onClick={handleConfirmHistory} />
            </Buttons>
          </div>
        </RodalPopup>
      </>
    );
  }
);

PricingSearchCar.propTypes = {
  canUseOwnerName: PropTypes.bool,
  clrOptions: PropTypes.array,
  carCondOptions: PropTypes.array,
  dataContext: PropTypes.object,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  hasMobile: PropTypes.bool,
  hasMobileEdit: PropTypes.bool,
  hasMobileOnlyCarNumberInput: PropTypes.bool,
  isCarSelectionPopUp: PropTypes.bool,
  router: PropTypes.object,
  type: PropTypes.string,
  onSearchCarNoClick: PropTypes.func,
  onSearchCarCondClick: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onTabCanged: PropTypes.func,
  onTsCancel: PropTypes.func,
  onSelectOptions: PropTypes.func,
  onSetToggleCarSelectionPopUp: PropTypes.func,
  onCarInfoUpdated: PropTypes.func
};

PricingSearchCar.defaultProps = {
  canUseOwnerName: true,
  hasMobileEdit: false,
  hasMobileOnlyCarNumberInput: false
};

PricingSearchCar.displayName = 'PricingSearchCar';
export default withSearchCar(withRouter(PricingSearchCar));
