/* eslint-disable no-alert */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchCarColors,
  getSearchCarDefaultOptions,
  getSearchCarDisplacement,
  getSearchCarFuels,
  getSearchCarNumberOfYears,
  getSearchCarTranmission,
  setToggleCarSelectionPopUp
} from '@src/actions/pricing/pricingSystemActions';
import { objIsEmpty } from '@src/utils/CommonUtil';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import DatePicker from '@src/components/common/calendar/DatePicker';
//import CarSelection from '@src/components/common/car/CarSelection';
import CarSelection from '@src/components/common/CarNameMod';

const SearchCar = ({ isIdentityVerify, type, onSearchCarNoClick, onSearchCarCondClick }) => {
  const dispatch = useDispatch();
  const [namePopupShow, setNamePopupShow] = useRodal(false, true);
  const clrOptions = useSelector((state) => state.pricing.searchCarColors);
  const carCondOptions = useSelector((state) => state.pricing.searchCarDefaultOptions);
  const dsplOptions = useSelector((state) => state.pricing.searchCarDsplOptions);
  const fuelOptions = useSelector((state) => state.pricing.searchCarFuelOptions);
  const mssOptions = useSelector((state) => state.pricing.searchCarMssOptions);
  const noyOptions = useSelector((state) => state.pricing.searchCarNoyOptions);
  const isCarSelectionPopUp = useSelector((state) => state.pricing.isCarSelectionPopUp);

  React.useEffect(() => {
    dispatch(getSearchCarColors());
    dispatch(getSearchCarDefaultOptions());
    dispatch(getSearchCarDisplacement());
    dispatch(getSearchCarFuels());
    dispatch(getSearchCarNumberOfYears());
    dispatch(getSearchCarTranmission());
  }, [dispatch]);

  React.useEffect(() => {
    setNamePopupShow(isCarSelectionPopUp);
  }, [isCarSelectionPopUp, setNamePopupShow]);

  const [uiWidth] = useState(type === 'marketPrice' ? 268.9 : 191);
  const [uiWidth2] = useState(type === 'marketPrice' ? 694 : 596);
  const [defaultOpton] = useState([{ value: '', label: '' }]);
  const [active, setActive] = useState(false);
  const [certify, setCertify] = useState(isIdentityVerify);
  const [carNo, setCarNo] = useState('');
  const [carCond, setCarCond] = useState({
    clr: null,
    dspl: null,
    fuel: null,
    mss: null,
    noy: null,
    frstRegDt: null,
    options: [],
    drvDist: null
  });

  const handleCertify = useCallback((e) => {
    e.preventDefault();
    setCertify(true);
  }, []);

  const handleClrChanged = useCallback(
    (e) => {
      setCarCond(Object.assign({ ...carCond }, { clr: e.value }));
    },
    [carCond]
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
    (e) => {
      setCarCond(Object.assign({ ...carCond }, { dspl: e.value }));
    },
    [carCond]
  );

  const handleFuelChanged = useCallback(
    (e) => {
      setCarCond(Object.assign({ ...carCond }, { fuel: e.value }));
    },
    [carCond]
  );

  const handleMssChanged = useCallback(
    (e) => {
      const newCarCond = Object.assign({ ...carCond }, { mss: e.value });
      setCarCond(newCarCond);
    },
    [carCond]
  );

  const handleNoyChanged = useCallback(
    (e) => {
      const newCarCond = Object.assign({ ...carCond }, { noy: e.value });
      setCarCond(newCarCond);
    },
    [carCond]
  );

  const handleFrstRegDt = useCallback(
    (val) => {
      const newCarCond = Object.assign({ ...carCond }, { frstRegDt: val.format('YYYYMMDD') });
      setCarCond(newCarCond);
    },
    [carCond]
  );

  const handleCarOptionChange = useCallback(
    (e) => {
      setCarCond(Object.assign(carCond, { options: e }));
    },
    [carCond]
  );

  const handleCarNoChanged = useCallback((e) => {
    setCarNo(e.target.value);
    setActive(e.target.value !== '' ? true : false);
  }, []);

  const handleNameMod = useCallback(() => {
    dispatch(setToggleCarSelectionPopUp());
  }, [dispatch]);

  const handleSearchCarNo = useCallback(
    (e) => {
      e.preventDefault();
      if (objIsEmpty(carNo)) {
        alert('차량번호를 입력해주세요.');
        return;
      }
      if (onSearchCarNoClick) {
        onSearchCarNoClick(e, {
          carNo: carNo
        });
      }
    },
    [carNo, onSearchCarNoClick]
  );

  const handleSearchCarCond = useCallback(
    (e) => {
      e.preventDefault();
      if (
        objIsEmpty(carCond.clr) ||
        objIsEmpty(carCond.dspl) ||
        objIsEmpty(carCond.fuel) ||
        objIsEmpty(carCond.frstRegDt) ||
        objIsEmpty(carCond.drvDist) ||
        objIsEmpty(carCond.mss) ||
        objIsEmpty(carCond.noy)
      ) {
        alert('차량옵션을 선택해주세요.');
        return;
      }

      if (onSearchCarCondClick) {
        onSearchCarCondClick(e, carCond);
      }
    },
    [carCond, onSearchCarCondClick]
  );

  const handleSaveCallback = useCallback(
    (data) => {
      //onSelectCar(data);
      //hideCarSelectionPop(false);
      console.log(data);
      dispatch(setToggleCarSelectionPopUp());
    },
    [dispatch]
  );

  const handleCancleEmitter = useCallback(
    (data) => {
      console.log(data);
      dispatch(setToggleCarSelectionPopUp());
      //() => hideCarSelectionPop(false);
    },
    [dispatch]
  );

  const handleCarSelectionClosed = useCallback(() => {
    dispatch(setToggleCarSelectionPopUp());
  }, [dispatch]);

  const SearchCarCondition = () => {
    return (
      <>
        <ul className="search-car-terms">
          <li className="full">
            <Input type="text" id="carTerms1" placeHolder="차량을 선택하세요." height={48} onClick={handleNameMod} />
          </li>
          <li>
            <SelectBox id="carCondNoy" className="items-sbox" placeHolder="연식" options={noyOptions || defaultOpton} width={uiWidth} height={48} onChange={handleNoyChanged} />
          </li>
          <li>
            <SelectBox id="carCondClr" className="items-sbox" placeHolder="색상" options={clrOptions || defaultOpton} width={uiWidth} height={48} onChange={handleClrChanged} />
          </li>
          <li>
            <SelectBox id="carCondMss" className="items-sbox" placeHolder="변속기" options={mssOptions || defaultOpton} width={uiWidth} height={48} onChange={handleMssChanged} />
          </li>
          <li>
            <DatePicker inputPlaceholder="최초등록일" inputWidth={uiWidth} inputHeight={48} datepickerCustomClass="date-market" onChange={handleFrstRegDt} />
          </li>
          <li>
            <SelectBox id="carCondDspl" className="items-sbox" placeHolder="배기량" options={dsplOptions || defaultOpton} width={uiWidth} height={48} onChange={handleDsplChanged} />
          </li>
          <li>
            <SelectBox id="carCondFuel" className="items-sbox" placeHolder="연료" options={fuelOptions || defaultOpton} width={uiWidth} height={48} onChange={handleFuelChanged} />
          </li>
          <li>
            <Input type="number" isSelf={false} width={uiWidth} data={carCond.drvDist || ''} height={48} placeHolder="주행거리" onChange={handleDrvDistChanged} />{' '}
            <span style={{ marginLeft: '8px' }}>km</span>
          </li>
          <li className="full">
            <SelectBox
              id="carCondOption"
              name="option"
              className="items-sbox multi"
              placeHolder="옵션"
              options={carCondOptions}
              multi={true}
              width="100%"
              closeMenuOnSelect={false}
              height={48}
              onChange={handleCarOptionChange}
            />
          </li>
        </ul>
        <Buttons align="right">
          <Button size="big" background="blue80" title="조회" width={uiWidth} onClick={handleSearchCarCond} />
        </Buttons>
      </>
    );
  };

  const SearchCarNumber = () => {
    return type === 'marketPrice' ? (
      <>
        {certify === false ? (
          <div className="search-car-certify">
            <p>
              본인 차량만 시세조회가 가능하며,
              <br />
              본인확인을 위한 인증절차가 필요합니다.
            </p>
            <Buttons align="center" marginTop={20}>
              <Button size="big" background="blue80" title="인증진행" width={210} onClick={handleCertify} />
            </Buttons>
          </div>
        ) : (
          CreateSearchCar()
        )}
      </>
    ) : (
      CreateSearchCar()
    );
  };

  const CreateSearchCar = () => {
    return (
      <div className="search-car-num">
        <div className="search-tp2">
          <span className="search-area">
            <label htmlFor="car-num" className="hide">
              차량번호
            </label>
            <Input placeHolder="본인 차량의 차량번호를 입력해주세요. (예: 12가1234)" id="car-num" width={uiWidth2} height={48} value={carNo} onChange={handleCarNoChanged} />
          </span>
          <Button size="big" background="blue80" title="조회" width={210} height={48} onClick={handleSearchCarNo} marginLeft={14} />
        </div>
        <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
      </div>
    );
  };

  return (
    <>
      {type === 'marketPrice' && (
        <TabMenu type="type1 border">
          <TabCont tabTitle="차량번호로 조회" id="SearchCarFilter2" index={0}>
            {SearchCarNumber(0)}
          </TabCont>
          <TabCont tabTitle="차량 검색" id="SearchCarFilter1" index={1}>
            {SearchCarCondition(1)}
          </TabCont>
        </TabMenu>
      )}
      {type === 'pricingSystem' && (
        <TabMenu type="type1 border">
          <TabCont tabTitle="차량번호로 조회" id="SearchCarFilter2" index={0}>
            {SearchCarNumber(0)}
          </TabCont>
          <TabCont tabTitle="차량 조건검색" id="SearchCarFilter1" index={1}>
            {SearchCarCondition(1)}
          </TabCont>
        </TabMenu>
      )}
      {/* <RodalPopup show={namePopupShow} type={'fade'} closedHandler={closeNamePopup} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup> */}
      <RodalPopup show={namePopupShow} type={'fade'} closedHandler={handleCarSelectionClosed} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarSelection saveCallback={handleSaveCallback} cancleEmitter={handleCancleEmitter} />
        </div>
      </RodalPopup>
    </>
  );
};

SearchCar.propTypes = {
  isIdentityVerify: PropTypes.bool,
  type: PropTypes.string,
  onSearchCarNoClick: PropTypes.func,
  onSearchCarCondClick: PropTypes.func
};
export default SearchCar;
