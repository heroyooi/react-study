/* eslint-disable no-alert */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
import CarSelection from '@src/components/common/car/CarSelection';
import CarSelectionDummy from '@src/components/common/car/CarSelectionDummy';
import withSearchCar from '@src/hoc/pricing/withSearchCar';

const PricingSearchCar = ({
  clrOptions,
  carCondOptions,
  dsplOptions,
  fuelOptions,
  mssOptions,
  noyOptions,
  isCarSelectionPopUp,
  isIdentityVerify,
  type,
  onSetPricingCarInfoName,
  onSearchCarNoClick,
  onSearchCarCondClick,
  onTabCanged,
  onSetToggleCarSelectionPopUp
}) => {
  const [namePopupShow, setNamePopupShow] = useRodal(false, true);
  
  const [uiWidth] = useState(type === 'marketPrice' ? 268.9 : 191);
  const [uiWidth2] = useState(type === 'marketPrice' ? 694 : 596);
  const [defaultOpton] = useState([{ value: '', label: '' }]);
  const [active, setActive] = useState(false);
  const [certify, setCertify] = useState(isIdentityVerify);
  const [crNo, setCrNo] = useState('');
  const [carCond, setCarCond] = useState({
    clr: null,
    dspl: null,
    fuel: null,
    mss: null,
    noy: null,
    frstRegDt: null,
    drvDist: null
  });
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, false);
  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow1(false);
  }, []);

  React.useEffect(() => {
    setNamePopupShow(isCarSelectionPopUp);
  }, [isCarSelectionPopUp, setNamePopupShow]);

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
      setCarCond(Object.assign(carCond, { carOptions: e }));
    },
    [carCond]
  );

  const handleCarNoChanged = useCallback((e) => {
    setCrNo(e.target.value);
    setActive(e.target.value !== '' ? true : false);
  }, []);

  const handleNameMod = useCallback(() => {
    onSetToggleCarSelectionPopUp();
  }, [onSetToggleCarSelectionPopUp]);

  const handleSearchCarNo = useCallback(
    (e) => {
      e.preventDefault();
      rodalPopupHandler1(e, 'fade'); //alert layer
      if (objIsEmpty(crNo)) {
        //alert('차량번호를 입력해주세요.');
        return;
      }
      if (onSearchCarNoClick) {
        onSearchCarNoClick(e, {
          crNo
        });
      }
    },
    [crNo, onSearchCarNoClick]
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
    (deps) => {
      let crNm = '';
      if (deps && deps.length === 5) {
        crNm = `${deps[2].text} ${deps[3].text} ${deps[4].text}`;
      }
      const newCarCond = Object.assign({ ...carCond }, { crNm: crNm });
      setCarCond(newCarCond);
      onSetPricingCarInfoName(crNm);
      onSetToggleCarSelectionPopUp();
    },
    [carCond, onSetPricingCarInfoName, onSetToggleCarSelectionPopUp]
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

  const SearchCarCondition = () => {
    console.log(dsplOptions);
    return (
      <>
        <ul className="search-car-terms">
          <li className="full">
            <Input type="text" id="carTerms1" isSelf={false} data={carCond.crNm} placeHolder="차량을 선택하세요." height={48} onClick={handleNameMod} />
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
          <Button size="big" background="blue80" title="인증진행" width={uiWidth} onClick={handleSearchCarCond} />
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
      <>
        <p className="searchCarMsg">정확한 시세조회를 위해 차량 소유자 인증철차가 필요합니다.<br />인증을 위해 차량 소유자 성명과 차량번호를 기입하여 주시기 바랍니다.</p>
        <div className="search-car-num">
          <div className="search-tp2">
            <span className="search-area">
              <label htmlFor="car-num" className="hide">
                차량번호
              </label>
              <span style={{marginRight:'8px'}}><Input placeHolder="이름을 입력해 주세요." id="user-name" width={343} height={48} onChange={handleCarNoChanged} /></span>
              <Input placeHolder="본인 차량의 차량번호를 입력해주세요. (예: 12가1234)" id="car-num" width={343} height={48} value={crNo} onChange={handleCarNoChanged} />
            </span>
            <Button size="big" background="blue80" title="조회" width={210} height={48} onClick={handleSearchCarNo} marginLeft={14} />
          </div>
          <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
        </div>
      </>
    );
  };

  return (
    <>
      {type === 'marketPrice' && (
        <TabMenu type="type1 border" callBack={handleTabChanged}>
          <TabCont tabTitle="차량번호로 조회" id="SearchCarFilter2" index={0}>
            {SearchCarNumber(0)}
          </TabCont>
          <TabCont tabTitle="차량 검색" id="SearchCarFilter1" index={1}>
            {SearchCarCondition(1)}
          </TabCont>
        </TabMenu>
      )}
      {type === 'pricingSystem' && (
        <TabMenu type="type1 border" callBack={handleTabChanged}>
          <TabCont tabTitle="차량번호로 조회" id="SearchCarFilter2" index={0}>
            {SearchCarNumber(0)}
          </TabCont>
          <TabCont tabTitle="차량 조건검색" id="SearchCarFilter1" index={1}>
            {SearchCarCondition(1)}
          </TabCont>
        </TabMenu>
      )}

      <RodalPopup show={namePopupShow} type={'fade'} closedHandler={handleCarSelectionClosed} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          {process.env.systemEnv === 'publisher' ? (
            <CarSelectionDummy saveCallback={handleSaveCallback} cancleEmitter={handleCancleEmitter} />
          ) : (
            <CarSelection saveCallback={handleSaveCallback} cancleEmitter={handleCancleEmitter} />
          )}
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow1} type={'fade'} width={380} closedHandler={modalCloseHandler1} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>본인 차량만 조회할 수 있습니다.<br />본인 소유 차량의 차량번호로 다시 조회해 주세요.</p>
          {/* <p>차량번호를 입력해 주세요</p> */}
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="확인" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

PricingSearchCar.propTypes = {
  clrOptions: PropTypes.array,
  carCondOptions: PropTypes.array,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  isCarSelectionPopUp: PropTypes.bool,
  isIdentityVerify: PropTypes.bool,
  type: PropTypes.string,
  onSearchCarNoClick: PropTypes.func,
  onSearchCarCondClick: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onTabCanged: PropTypes.func,
  onSetToggleCarSelectionPopUp: PropTypes.func
};

export default withSearchCar(PricingSearchCar);
