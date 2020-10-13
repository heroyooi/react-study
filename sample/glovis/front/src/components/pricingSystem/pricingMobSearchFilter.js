import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Radio from '@lib/share/items/Radio';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFilterModel from '@src/components/common/MobFilterModel';
import DatePicker from '@src/components/common/calendar/DatePicker';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import MobCalendar from '@lib/share/items/MobCalendar';
import InputNumber from '@lib/share/items/InputNumber';
import MobSelectList from '@lib/share/items/MobSelectList';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getCarDefaultImage } from './pricingUtil';
import PricingCheckColors from './pricingCheckColors';
import PricingMobFilterPopUp from './filter/pricingMobFilterPopUp';
import PricingMobFilterOption from './filter/pricingMobFilterOption';

const PricingMobSearchFilter = memo(({ casUseAccd, carCondOptions, dsplOptions, fuelOptions, mssOptions, noyOptions, selectionMode, onUpdateCarInfo, onSelectOptions }) => {
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const dispatch = useDispatch();

  const [carCond, setCarCond] = useState({
    clr: null,
    dspl: null,
    fuel: null,
    mss: null,
    noy: null,
    frstRegDt: null,
    drvDist: null,
    carOptions: carCondOptions || []
  });

  const [selectedCarModel, setSelectedCarModel] = useState(null);

  const [fpFilter01, setFpFilter01] = useState(false);
  const [fpFilter01Result, setFpFilter01Result] = useState('yes');
  const [fpFilter01Kind, setFpFilter01Kind] = useState(null);
  const [fpFilter01Research, setFpFilter01Research] = useState('no');
  const [fpFilter02, setFpFilter02] = useState(false);
  const [fpFilter03, setFpFilter03] = useState(false);
  const [fpFilter04, setFpFilter04] = useState(false);
  const [fpFilter05, setFpFilter05] = useState(false);
  const [fpFilter06, setFpFilter06] = useState(false);
  const [fpCalendar01, setFpCalendar01] = useState(false);
  const [fpCarAccd, setFpCarAccd] = useState(false);
  const [accidentValue, setAccidentValue] = useState(2);

  React.useEffect(() => {
    setCarCond(Object.assign({ ...carCond }, { carOptions: carCondOptions }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carCondOptions]);

  React.useEffect(() => {
    dispatch({
      type: MOBILE_FULLPAGE_POPUP_CLOSE
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFindSelectItem = (options, propertyName, value) => {
    if (options && propertyName && value) {
      return options.find((x) => x[propertyName] === value);
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
            title: '제조사',
            options: ['back']
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
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter01(true);
      } else if (name === 'f2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '옵션',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter02(true);
      } else if (name === 'f3') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '색상',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter03(true);
      } else if (name === 'f4') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '연료',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter04(true);
      } else if (name === 'f5') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '변속기',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter05(true);
      } else if (name === 'f6') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '배기량',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpCalendar01(false);
        setFpCarAccd(false);
        setFpFilter06(true);
      } else if (name === 'calendar1') {
        // eslint-disable-next-line no-extra-boolean-cast
        if (objIsEmpty(carCond.noy)) {
          alert('연식을 먼저 선택해 주세요.');
          return;
        }
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '최초등록일',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCarAccd(false);
        setFpCalendar01(true);
      }
    },
    [carCond, dispatch]
  );

  const handleFullPageClose = useCallback(() => {
    if (fpCarAccd === true) {
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
    }
    setFpFilter01(false);
    setFpFilter02(false);
    setFpFilter03(false);
    setFpFilter04(false);
    setFpFilter05(false);
    setFpFilter06(false);
    setFpCalendar01(false);
    setFpCarAccd(false);
  }, [carCond, fpCarAccd]);

  const optionCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      const newCarCond = Object.assign({ ...carCond }, { carOptions: deps });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      setFpFilter02(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const noyCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      const newCarCond = Object.assign({ ...carCond }, { noy: deps?.value || null });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      setFpFilter03(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const colorCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      const newCarCond = Object.assign({ ...carCond }, { clr: deps.selectColor });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      setFpFilter03(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const fuelCallback = useCallback(
    (e, fuel) => {
      e.preventDefault();
      setFpFilter04(false);
      const newCarCond = Object.assign({ ...carCond }, { fuel: fuel.label });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const gearboxCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      setFpFilter05(false);
      const newCarCond = Object.assign({ ...carCond }, { mss: deps.label });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const engineCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      setFpFilter06(false);
      const newCarCond = Object.assign({ ...carCond }, { dspl: deps.label });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const calendarCallback = useCallback(
    (e, selectedDate) => {
      e.preventDefault();
      setFpCalendar01(false);

      const newCarCond = Object.assign({ ...carCond }, { frstRegDt: selectedDate.format('YYYYMMDD') });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  const handleDrvDistChanged = useCallback(
    (e, deps) => {
      let drvDist = parseInt(e && e.target && e.target.value ? e.target.value : carCond.drvDist || 0);
      if (deps) {
        drvDist += deps.value;
      } else if (e.target.value === '') {
        drvDist = '';
      }
      const newCarCond = Object.assign({ ...carCond }, { drvDist: drvDist });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
    },
    [carCond, onUpdateCarInfo]
  );

  const handleRlsPrcChanged = useCallback(
    (e) => {
      const newCarCond = Object.assign({ ...carCond }, { rlsPrc: e.target.value });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
    },
    [carCond, onUpdateCarInfo]
  );

  const handleCarModelSelect = useCallback(
    (e, deps) => {
      getCarDefaultImage(deps.detailModelId).then((imgUrl) => {
        const newOptions = carCond.carOptions.map((item) => {
          return Object.assign({ ...item }, { yn: 'N' });
        });

        const newCarCond = Object.assign(
          { ...carCond },
          {
            crNm: `${deps.manufactureNm || ''} ${deps.detailModelNm || ''} ${deps.classNm || ''} ${deps.name || ''}`,
            rlsPrc: deps.price,
            defaultImg: imgUrl,
            seriesNo: '',
            frstRegDt: null,
            drvDist: '',
            clr: '',
            dspl: '',
            fuel: '',
            mss: '',
            noy: '',
            carOptions: newOptions,
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
        onUpdateCarInfo(e, newCarCond);
      });

      setSelectedCarModel(deps);
      setFpFilter01(false);
      onSelectOptions(e, deps);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onSelectOptions, onUpdateCarInfo]
  );

  const onChangeAccident = useCallback(
    (e, val) => {
      e.preventDefault();
      if (accidentValue !== val) {
        setAccidentValue(val);

        if (val === 2) {
          setCarCond(Object.assign({ ...carCond }, { historyData: {} }));
        }
      }
      if (val === 1) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 사고 입력',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCarAccd(true);
      }
    },
    [accidentValue, carCond, dispatch]
  );

  const handleCarHistoryConfirm = useCallback(
    (e, deps) => {
      e.preventDefault();
      setFpCarAccd(false);
      let isAccident = false;
      for (const prop in deps) {
        if (isAccident === false && deps[prop]) {
          isAccident = true;
        }
      }
      if (isAccident === false) {
        setAccidentValue(2);
      }
      const newCarCond = Object.assign({ ...carCond }, { historyData: deps });
      setCarCond(newCarCond);
      onUpdateCarInfo(e, newCarCond);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carCond, dispatch, onUpdateCarInfo]
  );

  return (
    <>
      <div className="content-wrap">
        <ul className="m-menu-list tp1">
          {objIsEmpty(selectedCarModel) && (
            <li onClick={handleFullpagePopup('f1', 'result=no')}>
              <span className="tit">제조사/모델/등급</span>
            </li>
          )}

          {!objIsEmpty(selectedCarModel) && (
            <li className="model">
              <div className="sel-wrap">
                <span className="tit">제조사/모델/등급</span>
                <ul className="select1">
                  <li onClick={handleFullpagePopup('f1', 'result=yes&kind=manufacturer')}>{selectedCarModel.manufactureNm}</li>
                  <li onClick={handleFullpagePopup('f1', 'result=yes&kind=model')}>{selectedCarModel.modelNm || selectedCarModel.name}</li>
                </ul>
              </div>
              {selectionMode !== 'model' ? (
                <ul className="select2">
                  <li onClick={handleFullpagePopup('f1', 'result=yes&kind=class')}>
                    <span>
                      <span>
                        {selectedCarModel.detailModelNm} {selectedCarModel.classNm} {selectedCarModel.name}
                      </span>
                    </span>
                  </li>
                </ul>
              ) : null}
            </li>
          )}

          <li className="arrow-none">
            <span className="tit mb10">연식</span>
            <MobSelectList
              itemsSource={noyOptions}
              selectedItem={getFindSelectItem(noyOptions, 'value', carCond.noy)}
              displayMemberPath={'label'}
              selectedValuePath={'value'}
              width="100%"
              placeHolder="선택"
              onClick={noyCallback}
            />
          </li>
          <li onClick={handleFullpagePopup('f3')}>
            <div className="sel-wrap">
              <span className="tit">색상</span>
              {!objIsEmpty(carCond.clr) && (
                <ul className="select1">
                  <li>{carCond.clr}</li>
                </ul>
              )}
            </div>
          </li>
          <li onClick={handleFullpagePopup('f5')}>
            <div className="sel-wrap">
              <span className="tit">변속기</span>
              {!objIsEmpty(carCond.mss) && (
                <ul className="select1">
                  <li>{carCond.mss}</li>
                </ul>
              )}
            </div>
          </li>
          <li className="arrow-none" onClick={handleFullpagePopup('calendar1')}>
            <span className="tit mb16">최초등록일</span>
            <DatePicker defaultValue={carCond.frstRegDt ? moment(carCond.frstRegDt, 'YYYYMMDD') : null} inputWidth="100" inputMeasure="%" disabled={true} />
          </li>
          <li onClick={handleFullpagePopup('f6')}>
            <div className="sel-wrap">
              <span className="tit">배기량</span>
              {!objIsEmpty(carCond.dspl) && (
                <ul className="select1">
                  <li>{carCond.dspl}</li>
                </ul>
              )}
            </div>
          </li>
          <li onClick={handleFullpagePopup('f4')}>
            <div className="sel-wrap">
              <span className="tit">연료</span>
              {!objIsEmpty(carCond.fuel) && (
                <ul className="select1">
                  <li>{carCond.fuel}</li>
                </ul>
              )}
            </div>
          </li>
          <li className="arrow-none">
            <span className="tit mb16">주행거리</span>
            <MobButtonFilter
              checkList={[
                { title: '+ 1천', checked: true, value: 1000 },
                { title: '+ 5천', checked: false, value: 5000 },
                { title: '+ 1만', checked: false, value: 10000 },
                { title: '+ 5만', checked: false, value: 50000 }
              ]}
              onClick={handleDrvDistChanged}
            />
            <span className="search-wrap">
              <InputNumber maxlength={6} value={(carCond.drvDist || '').toString()} height={38} placeHolder="주행거리를 입력하세요." onChange={handleDrvDistChanged} />
            </span>
          </li>
          <li className="arrow-none">
            <span className={'tit'}>신차가격</span>
            <span className="search-wrap">
              <InputNumber value={(carCond.rlsPrc || '').toString()} height={38} placeHolder="신차가격을 입력하세요." onChange={handleRlsPrcChanged} />
            </span>
          </li>
          <li onClick={handleFullpagePopup('f2')}>
            <div className="sel-wrap">
              <span className="tit">옵션</span>
              {carCond.carOptions && carCond.carOptions.filter((x) => x.displayYn === 'Y' && x.yn === 'Y').length > 0 ? (
                <ul className="select1">
                  <li>{carCond.carOptions.filter((x) => x.displayYn === 'Y' && x.yn === 'Y').length}개</li>
                </ul>
              ) : null}
            </div>
          </li>
          {casUseAccd === true ? (
            <li className="arrow-none">
              <div className="sel-wrap">
                <span className="tit">사고여부</span>
                <ul className="radio-block tp4 mid">
                  <li>
                    <Radio className="txt" id="accident-2" label="사고" value={1} checked={accidentValue} onClick={(e) => onChangeAccident(e, 1)} />
                  </li>
                  <li>
                    <Radio className="txt" id="accident-1" label="무사고" value={2} checked={accidentValue} onClick={(e) => onChangeAccident(e, 2)} />
                  </li>
                </ul>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
      <MobFullpagePopup active={mFullpagePopup} paddingBottom={56} onClose={handleFullPageClose}>
        {fpFilter01 && (
          <MobFilterModel
            selectedDepth={5}
            isMultiSelect={false}
            result={fpFilter01Result}
            kind={fpFilter01Kind}
            research={fpFilter01Research}
            onCarModelSelect={handleCarModelSelect}
            dataContext={selectedCarModel}
          />
        )}
        {fpFilter02 && <PricingMobFilterOption options={carCond.carOptions} callback={optionCallback} />}
        {fpFilter03 && (
          <div className="filter-list-wrap">
            <div className="content-wrap">
              <PricingCheckColors mode="radio" selectedColor={carCond.clr || ''} onClick={colorCallback} />
            </div>
          </div>
        )}
        {fpFilter04 && <PricingMobFilterPopUp col={2} options={fuelOptions} selectedLabel={carCond.fuel || ''} mode="radio" callback={fuelCallback} />}
        {fpFilter05 && <PricingMobFilterPopUp options={mssOptions} selectedLabel={carCond.mss || ''} mode="radio" callback={gearboxCallback} />}
        {fpFilter06 && <PricingMobFilterPopUp options={dsplOptions} selectedLabel={carCond.dspl || ''} mode="radio" callback={engineCallback} />}
        {fpCalendar01 && <MobCalendar date={carCond.frstRegDt ? carCond.frstRegDt : carCond.noy ? new Date(parseInt(carCond.noy), 0, 1) : null} callback={calendarCallback} />}
        {fpCarAccd && (
          <>
            <div className="con-wrap popup-perform-record">
              <form className="register-form history-form">
                <DealerCarHistory type="pricing" historyData={carCond.historyData || {}} isScratch={false} onComfirm={handleCarHistoryConfirm} />
              </form>
            </div>
          </>
        )}
      </MobFullpagePopup>
    </>
  );
});

PricingMobSearchFilter.propTypes = {
  casUseAccd: PropTypes.bool,
  carCondOptions: PropTypes.array,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  selectionMode: PropTypes.string,
  onUpdateCarInfo: PropTypes.func,
  onSelectOptions: PropTypes.func
};

PricingMobSearchFilter.defaultProps = {
  casUseAccd: false,
  selectionMode: ''
};

PricingMobSearchFilter.displayName = 'PricingMobSearchFilter';
export default PricingMobSearchFilter;
