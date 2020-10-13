import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import DatePicker from '@src/components/common/calendar/DatePicker';
import InputNumber from '@lib/share/items/InputNumber';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import SelectBox from '@lib/share/items/SelectBox';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import RadioGroup from '@lib/share/items/RadioGroup';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import PricingCheckColors from './pricingCheckColors';
import PricingCarOptions from './pricingCarOptions';
import PricingCarInfoitem from './pricingCarInfoItem';
import PricingCarGradePopUp from './pricingCarGradePopUp';

const PricingCarInfo = ({
  canUseAccd,
  dataContext,
  type,
  withoutGrade,
  hasMobile,
  hasCarInfo,
  hasPricing,
  hasSuccYmd,
  isLoading,
  onValueChange,
  onGetPricingCarInfo,
  onSearchResult,
  carCondOptions
}) => {
  const [colorPopupShow, setColorPopupShow, openColorPopup, closeColorPopup] = useRodal(false, true);
  const [gradePopupShow, setGradePopupShow, openGradePopup, closeGradePopup] = useRodal(false, true);

  const colorList = useSelector((state) => state.pricing.searchCarColors);
  const [carInfo, setCarInfo] = useState(dataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [historyData, setHistoryData] = useState({});
  const [accidentValue, setAccidentValue] = useState(2);
  const [isHistoryPopUp, setIsHistoryPopUp] = useRodal(false);
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

  useEffect(() => {
    // console.log("PricingCarInfo dataContext", dataContext)
    // console.log("PricingCarInfo carInfo", carInfo)
    // console.log("PricingCarInfo carCond", carCond)
    setCarInfo({ ...dataContext });
    setCarCond({ ...dataContext });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataContext]);

  const handleGetCarInfo = useCallback(
    (e) => {
      e.preventDefault();
      if (onGetPricingCarInfo) {
        onGetPricingCarInfo(e, carInfo);
      }
      setIsEditing(false);
    },
    [carInfo, onGetPricingCarInfo]
  );

  const handleGetPricing = useCallback(
    (e) => {
      e.preventDefault();
      if (onSearchResult) {
        onSearchResult(e);
      }
      setIsEditing(false);
    },
    [onSearchResult]
  );

  const handleValueChange = useCallback(
    (e, deps) => {
      if (isEditing === false) {
        setIsEditing(true);
      }
      const newCarInfo = Object.assign({ ...carInfo }, { [deps.name]: deps.value });
      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, isEditing, onValueChange]
  );

  const handleOpenCarInfoPopUp = useCallback(
    (e) => {
      e.preventDefault();
      openColorPopup(e, 'fade');
      preventScroll(false);
    },
    [openColorPopup]
  );

  const handleClickColor = useCallback(() => {
    setColorPopupShow(false);
    preventScroll(false);
  }, [setColorPopupShow]);

  const handleDrvDistChanged = useCallback(
    (e) => {
      const newCarInfo = Object.assign({ ...carInfo }, { drvDist: e.target.value });

      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, onValueChange]
  );

  const handleOptionChanged = useCallback(
    (e, arg) => {
      const newCarInfo = Object.assign({ ...carInfo }, { carOptions: arg.carOptions });
      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange(e, newCarInfo);
      }
    },
    [carInfo, onValueChange]
  );

  const handleSuccYmdChanged = useCallback(
    (e) => {
      const newCarInfo = Object.assign({ ...carInfo }, { succYmd: e.format('YYYYMMDD') });
      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange(e, newCarInfo);
      }
    },
    [carInfo, onValueChange]
  );

  const handleColorChange = useCallback(
    (e, deps) => {
      let newColor = e.target.name;

      if (typeof deps === 'object') {
        newColor = deps.selectColor;
      } else if (deps) {
        newColor = deps;
      }

      const newCarInfo = { ...carInfo, clr: newColor };
      setCarInfo(newCarInfo);

      handleClickColor(e);

      if (onValueChange) {
        onValueChange(e, newCarInfo);
      }
    },
    [carInfo, handleClickColor, onValueChange]
  );

  const handleOpenGradePopUp = useCallback(
    (e) => {
      openGradePopup(e, 'fade');
    },
    [openGradePopup]
  );

  const handleSelectGrade = useCallback(
    (e, deps) => {
      const newCarInfo = Object.assign({ ...carInfo }, { seriesNo: deps.seriesNo, seriesNm: deps.seriesNm, rlsPrc: deps.seriesPrice });
      setCarInfo(newCarInfo);
      setGradePopupShow(false);
      onGetPricingCarInfo(newCarInfo.crNo, newCarInfo);
      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, onGetPricingCarInfo, onValueChange, setGradePopupShow]
  );

  const handleCarOptionChange = useCallback(
    (e, deps) => {
      let newCarInfo = null;
      if (deps.carOptions) {
        if (e.preventDefault) {
          e.preventDefault();
        }
      } else if (!objIsEmpty(e)) {
        const newSelectedOptions = [...e].map((item) => {
          return Object.assign({ ...item }, { yn: 'Y' });
        });
        newCarInfo = Object.assign({ ...carCond }, { carOptions: newSelectedOptions });
      } else if (objIsEmpty(e)) {
        newCarInfo = Object.assign({ ...carCond }, { carOptions: [] });
      }

      if (newCarInfo) {
        setCarCond(newCarInfo);
        setCarInfo(newCarInfo);
        if (onValueChange) {
          onValueChange({}, newCarInfo);
        }
      }
    },
    [carCond, onValueChange]
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
        setIsHistoryPopUp(true);
      }
    },
    [accidentValue, carCond, setIsHistoryPopUp]
  );

  const handleCloseHistory = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const historyData = carInfo?.historyData;

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
    },
    [carInfo, setIsHistoryPopUp]
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
    (e) => {
      e.preventDefault();

      setIsHistoryPopUp(false);

      let isAccident = false;
      for (const prop in historyData) {
        if (isAccident === false && historyData[prop]) {
          isAccident = true;
        }
      }

      const newCarInfo = Object.assign({ ...carInfo }, { historyData });
      if (isAccident === false) {
        setAccidentValue(2);
      }
      setCarInfo(newCarInfo);
      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, historyData, onValueChange, setIsHistoryPopUp]
  );

  const handleInputSkinChange = useCallback(
    (v, target, n) => {
      const newHistory = Object.assign({ ...historyData }, { [n]: v });
      setHistoryData(newHistory);
    },
    [historyData]
  );

  if (hasCarInfo === false) {
    return null;
  }

  if (hasMobile === true) {
    return (
      <>
        <div className="tit-wrap">
          <h4 className="fl">차량 정보</h4>
        </div>
        <table summary="차량 정보에 대한 내용" className="table-tp1">
          <caption className="away">차량 정보</caption>
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량명</th>
              <td colSpan="4">{carInfo.crNm}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  if (type === 'marketPrice') {
    return (
      <form className="register-form">
        <fieldset>
          <legend className="away">차량 정보 조회</legend>
          <div className="market-car-info">
            <div className="img-wrap">
              <img src={carInfo.defaultImg || '/images/dummy/market-car-no-img.jpg'} alt="내 차량 이미지" />
            </div>
            <table summary="차량 정보에 대한 내용" className="table-tp1 input" style={{ border: objIsEmpty(carInfo.noy) ? 'none' : null, borderCollapse: objIsEmpty(carInfo.noy) ? 'initial' : null }}>
              <caption className="away">차량 정보</caption>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                {carInfo.noy ? (
                  <tr>
                    <th>차량번호</th>
                    <td>{carInfo.crNo}</td>
                    <th>차량연식</th>
                    <td>{`${carInfo.noy}년`}</td>
                  </tr>
                ) : (
                  <tr>
                    <th>차량번호</th>
                    <td colSpan="3" style={{ border: '1px solid #e7e7e7' }}>
                      {carInfo.crNo}
                    </td>
                  </tr>
                )}
                {withoutGrade === false ? (
                  <>
                    <tr>
                      <th>배기량</th>
                      <td>{carInfo.dspl}cc</td>
                      <th>신차출고가</th>
                      <td>
                        <PricingCarInfoitem
                          type="number"
                          name="rlsPrc"
                          value={carInfo.rlsPrc}
                          maxLength={9}
                          isEditingState={isEditing}
                          hasNumberWithComma={true}
                          isEdit={true}
                          onValueChange={handleValueChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>연료</th>
                      <td>{carInfo.fuel}</td>
                      <th>최초등록일</th>
                      <td>
                        <PricingCarInfoitem name="frstRegDt" value={carInfo.frstRegDt} isEditingState={isEditing} isEdit={true} type={'date'} onValueChange={handleValueChange} />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '1' ? (
                      <>
                        <tr>
                          <th>배기량</th>
                          <td>{carInfo.dspl}</td>
                          <th>신차출고가</th>
                          <td>
                            <PricingCarInfoitem
                              type="number"
                              name="rlsPrc"
                              value={carInfo.rlsPrc}
                              isEditingState={isEditing}
                              hasNumberWithComma={true}
                              isEdit={true}
                              onValueChange={handleValueChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>연료</th>
                          <td>{carInfo.fuel}</td>
                          <th>최초등록일</th>
                          <td>
                            <PricingCarInfoitem name="frstRegDt" value={carInfo.frstRegDt} isEditingState={isEditing} isEdit={true} type={'date'} onValueChange={handleValueChange} />
                          </td>
                        </tr>
                      </>
                    ) : null}
                  </>
                )}
              </tbody>
            </table>
            {!objIsEmpty(carInfo.grades) && withoutGrade === true && (
              <Buttons align="center">
                <Button size="mid" background="blue80" radius={true} title="해당 등급을 선택하세요" width={160} marginTop={40} onClick={handleOpenGradePopUp} />
              </Buttons>
            )}
          </div>

          {carInfo.carOptions && <PricingCarOptions defaultOptions={carInfo.carOptions} onChange={handleOptionChanged} />}

          {hasCarInfo === true && carInfo?.resStatus?.rstCode === '1' ? (
            <div className="market-add-info">
              <ul className="distance">
                <li>주행거리를 입력해주세요</li>
                <li className="distance-input">
                  <InputNumber type="number" width={200} maxLength={6} height={30} value={(carInfo.drvDist || '').toString()} onChange={handleDrvDistChanged} />
                  <em className="ml8">km</em>
                </li>
                {hasSuccYmd === true ? (
                  <>
                    <li className="newPrice">판매일</li>
                    <li className="distance-input">
                      <DatePicker defaultValue={carInfo.succYmd ? carInfo.succYmd : ''} inputWidth="100" inputMeasure="%" onChange={handleSuccYmdChanged} />
                    </li>
                  </>
                ) : null}
              </ul>
              <ul className="color">
                <li>차량 색상을 선택해주세요</li>
                {colorList
                  .filter((x) => x.mainYn === 'Y')
                  .map((item, index) => {
                    return (
                      <li key={index}>
                        <CheckBox
                          id={item.id}
                          title={item.label}
                          name={item.label}
                          checked={carInfo.clr === item.value}
                          isSelf={false}
                          onChange={handleColorChange}
                          isColor={true}
                          bgColor1={item.bgColor}
                          chkColor={item.chkColor}
                        />
                      </li>
                    );
                  })}
              </ul>
              <Button color="blue80" title="색상더보기 +" onClick={handleOpenCarInfoPopUp} />
            </div>
          ) : null}
        </fieldset>
        <RodalPopup show={colorPopupShow} type={'fade'} closedHandler={closeColorPopup} title="주요색상" mode="normal" width={894}>
          <div className="con-wrap">
            <PricingCheckColors isTitle={false} selectedColor={carInfo.clr} mode="radio" onClick={handleColorChange} onClose={handleClickColor} />
          </div>
        </RodalPopup>
        <RodalPopup show={gradePopupShow} type={'fade'} closedHandler={closeGradePopup} mode="normal" width={440}>
          <PricingCarGradePopUp dataContext={carInfo.grades} modelNo={carInfo.modelNo} onGradeSelect={handleSelectGrade} />
        </RodalPopup>
      </form>
    );
  }

  return (
    <React.Fragment>
      {hasCarInfo === true && carInfo.resStatus.rstCode === '1' && (
        <form className="register-form mt23">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <table summary="차량 기본 정보에 대한 내용" className="table-tp1 input">
              <caption className="away">차량 기본 정보</caption>
              <colgroup>
                <col width="17%" />
                <col width="33%" />
                <col width="17%" />
                <col width="33%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>
                    <PricingCarInfoitem name="carNo" value={carInfo.crNo} onValueChange={handleValueChange} />
                  </td>
                  <th>차량연식</th>
                  <td>
                    <PricingCarInfoitem name="noy" value={carInfo.noy} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>
                    <PricingCarInfoitem name="dspl" value={carInfo.dspl} onValueChange={handleValueChange} />
                  </td>
                  <th>신차출고가</th>
                  <td>
                    <PricingCarInfoitem
                      type="number"
                      name="rlsPrc"
                      value={carInfo.rlsPrc}
                      isEditingState={isEditing}
                      maxLength={9}
                      hasNumberWithComma={true}
                      isEdit={true}
                      onValueChange={handleValueChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>
                    <PricingCarInfoitem name="fuel" value={carInfo.fuel} onValueChange={handleValueChange} />
                  </td>
                  <th>최초등록일</th>
                  <td>
                    <PricingCarInfoitem name="frstRegDt" value={carInfo.frstRegDt} isEditingState={isEditing} isEdit={true} type={'date'} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>
                    <PricingCarInfoitem
                      type="number"
                      name="drvDist"
                      value={carInfo.drvDist || ''}
                      isEditingState={isEditing}
                      isEdit={true}
                      maxLength={6}
                      unit={'Km'}
                      onValueChange={handleValueChange}
                    />
                  </td>
                  <th>색상</th>
                  <td>
                    <PricingCarInfoitem name="clr" value={carInfo.clr} onOpenPopUp={handleOpenCarInfoPopUp} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>옵션</th>
                  <td colSpan="4">
                    <SelectBox
                      id="carCondOption"
                      name="option"
                      className="items-sbox multi"
                      placeHolder="옵션"
                      hasSelectedItemValue={true}
                      selectedItemValue={(carInfo.carOptions || []).filter((x) => x.displayYn === 'Y' && x.yn === 'Y')}
                      options={(carCondOptions || []).filter((x) => x.displayYn === 'Y')}
                      multi={true}
                      width="100%"
                      closeMenuOnSelect={false}
                      height={48}
                      onChange={handleCarOptionChange}
                    />
                  </td>
                </tr>
                {canUseAccd === true ? (
                  <tr>
                    <th>사고여부</th>
                    <td colSpan="4">
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
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            {/*  */}
          </fieldset>
        </form>
      )}
      {!objIsEmpty(carInfo.grades) &&
      withoutGrade === true && ( // 상세등급 정보가 노출이 안되는 경우
          <div className="grade">
            <p>해당 등급을 선택하세요</p>
            <PricingCarGradePopUp isPopUpMode={false} dataContext={carInfo.grades} modelNo={carInfo.modelNo} onGradeSelect={handleSelectGrade} />
          </div>
        )}

      {hasCarInfo && carInfo.resStatus.rstCode === '1' ? (
        <Buttons align="center" marginTop={40} marginBottom={20}>
          {isLoading ? null : <Button size="big" background="blue80" title={hasPricing === true ? '재조회' : '확인'} width={180} height={60} onClick={handleGetPricing} />}
        </Buttons>
      ) : (
        <Buttons align="center" marginTop={40} marginBottom={20}>
          <Button size="big" background="blue80" title={`확인`} width={180} height={60} onClick={handleGetCarInfo} />
        </Buttons>
      )}

      <RodalPopup show={colorPopupShow} type={'fade'} closedHandler={closeColorPopup} title="주요색상" mode="normal" width={894}>
        <div className="con-wrap">
          <PricingCheckColors isTitle={false} mode="radio" selectedColor={carInfo.clr} onClick={handleColorChange} onClose={handleClickColor} />
        </div>
      </RodalPopup>

      <RodalPopup show={isHistoryPopUp} type={'fade'} closedHandler={handleCloseHistory} title="사고정보 입력" mode="normal" size="large">
        <div className="con-wrap popup-perform-record">
          <form className="register-form history-form">
            <DealerCarHistory type="pricing" historyData={historyData} onChange={handleInputSkinChange} useProp={true} isScratch={false} />
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} onClick={handleCloseHistory} />
            <Button size="big" background="blue80" title="확인" width={172} onClick={handleConfirmHistory} />
          </Buttons>
        </div>
      </RodalPopup>
    </React.Fragment>
  );
};

PricingCarInfo.propTypes = {
  canUseAccd: PropTypes.bool,
  dataContext: PropTypes.object,
  hasMobile: PropTypes.bool,
  hasCarInfo: PropTypes.bool,
  hasPricing: PropTypes.bool,
  hasSuccYmd: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  withoutGrade: PropTypes.bool,
  onGetPricingCarInfo: PropTypes.func,
  onSearchResult: PropTypes.func,
  onValueChange: PropTypes.func,
  carCondOptions: PropTypes.array
};

PricingCarInfo.defaultProps = {
  canUseAccd: false,
  hasMobile: false,
  hasCarInfo: false,
  hasSuccYmd: false,
  isAutoSelectCarGrade: false
};

export default PricingCarInfo;
