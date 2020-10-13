import { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import qs from 'qs';
import { produce } from 'immer';

import * as http from '@src/utils/HttpUtils';
import { setComma, removeComma, getLabelFromArray } from '@src/utils/StringUtil';

import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';

import CarSelection from '@src/components/common/car/CarSelection';
import CheckColors from '@src/components/common/CheckColors';
import MobSelectList from '@lib/share/items/MobSelectList';
import { find, findIndex, isEmpty, isEqual, isUndefined, isNaN } from 'lodash';

import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectCarColorList, selectFuelTypeList, selectAllCarTypeList, selectCarUsagesList, selectFrmYyyyList } from '@src/api/common/CarInfoApi';
import { carFrmYyyyList, carUseDvcdList } from '@src/constant/carTypeCd';
import { getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, pushObjectAction, removeObjectByKeyAction } from '@src/actions/sellcar/sellCarAction';

const now = moment();
/**
 * @desc 차량 기본 정보 표시/입력
 * @module CarBasicInfoEditor
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Object} props.car - 차량정보를 담은 객체
 * @param  {boolean} props.isEditing - 차량정보를 수정가능여부
 * @param  {Function} props.onInput - 차량정보를 수정했을때 콜백함수
 */

const parseResults = (result) => {
  const { data } = result?.data;
  if (data?.every((res) => !!res)) {
    return data?.map(({ id, name, bsno }) => ({
      value: id.toString(),
      label: name,
      bsno
    }));
  }
};

const CarBasicInfoEditor = ({ item, onInput, onSelectCar, isEditing, className, pagetype = '', noneValuaction = false, dpDrvDist = true, priceUnit = 1 }) => {
  const dispatch = useDispatch();
  const [displayCarSelectionPop, setDisplayCarSelectionPop, showCarSelectionPop, hideCarSelectionPop] = useRodal(false, true);
  const { validation } = useSelector((rootStore) => rootStore.sellCarValid);
  const [carColors, setCarColors] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [frmYyyyList, setFrmYyyyList] = useState([]);
  const [carMssList, setCarMssList] = useState([]);
  const [drvDistErr, setDrvDistErr] = useState(false);
  const {
    crNm,
    crMdlCd,
    dspl,
    crNo,
    drvDist,
    crMnfcCdNm,
    crMdlCdNm,
    mssDvcd,
    crDtlMdlCdNm,
    crClsCdNm,
    crDtlClsCdNm,
    frstRegDt,
    frmYyyy,
    crClrCdNm,
    crClrCd,
    fuelDvcd,
    crTypeCd,
    crUseDvcd,
    crRlsPrc,
    fuelNm,
    tsDrvDist
  } = item || {};

  const _onInput = (e) => {
    let { name, value } = e.target;
    const numberTypeColumns = ['crRlsPrc', 'drvDist', 'dspl'];
    if (numberTypeColumns.some((n) => n === name)) {
      value = removeComma(value);
    }

    if (onInput) {
      console.log('onInput pass parameter e.target', e.target, 'name', name, 'value', value);
      onInput({
        target: {
          ...e.target,
          name,
          value
        }
      });
    } else {
      dispatch(
        inputPropAction({
          state: 'car',
          prop: name,
          value
        })
      );
    }
  };

  const _onSelectCar = (dataList, price) => {
    if (onSelectCar) {
      onSelectCar(dataList, price);
    } else {
      const value = produce(item, (draft) => {
        dataList.forEach((data) => {
          draft[data.column] = data.code;
          draft[data.column + 'Nm'] = data.text;
        });
      });
      dispatch(
        inputStateAction({
          state: 'car',
          value
        })
      );
    }
  };

  useEffect(() => {
    Promise.all([selectAllCarTypeList()]).then((results) => {
      const [carTypes] = results;
      if (carTypes) setCarTypes(parseResults(carTypes));
    });
    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    getCommonCodeAsync('AM104').then(setCarColors);
  }, []);

  useEffect(() => {
    if (crMdlCd) {
      Promise.all([
        // getSelectColors(),
        getSelectFrmYyyy()
      ]);
    }
  }, [crMdlCd]);

  const frstRegDtMoment = useMemo(() => {
    if (typeof frstRegDt === 'string') {
      const frstRegDtMt = moment(frstRegDt);
      return frstRegDtMt.toDate();
    }
  }, [frstRegDt]);

  const setCommaCallback = useCallback(setComma, [dspl, crRlsPrc, drvDist]);

  const getSelectColors = (event) => {
    const data = selectCarColorList(crMdlCd)
      .then(parseResults)
      .then((res) => {
        setCarColors(res);
        // if (event) setEditingCarColor(true);
        return res;
      });
    return data;
  };

  const getSelectFrmYyyy = (event) => {
    const data = selectFrmYyyyList(crMdlCd)
      .then(parseResults)
      .then((res) => {
        setFrmYyyyList(res);
        return res;
      });
    return data;
  };

  const onKeyPress = (e) => {
    const {
      key,
      target: { value }
    } = e;

    if (e.key === 'Enter') {
      _onInput(e);
    }
  };

  const selectMobValue = (e, deps) => {
    console.log('selectMobValue e', e, 'deps', deps.value);
    // _onInput({ target: { ...} })
  };

  const selectValue = (data, e) => {
    console.log('data', data);
    _onInput({ target: { ...data, ...e } });
  };

  const saveCallback = (data, price) => {
    _onSelectCar(data, price);
    hideCarSelectionPop && hideCarSelectionPop(false);
  };

  const datePick = (date) => {
    _onInput({
      target: {
        name: 'frstRegDt',
        value: date.format('YYYY-MM-DD')
      }
    });
  };

  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 차량 기본정보 - 달력
  const [calPop, setCalPop] = useState(false);
  // const [isDate, setIsDate] = useState(moment());
  const handleCalendarPop = (e) => {
    e.preventDefault();
    setCalPop(true);
    preventScroll(true);
  };
  const calendarCallback = (e, date) => {
    e.preventDefault();

    _onInput({
      target: {
        name: 'frstRegDt',
        value: date.format('YYYY-MM-DD')
      }
    });

    // setIsDate(date);
    setCalPop(false);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop(false);
    preventScroll(false);
  };

  console.log('item', item);

  if (hasMobile) {
    return (
      <>
        {isEditing ? (
          <table summary="차량 기본정보에 대한 내용" className="table-tp3">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="32%" />
              <col width="68%" />
            </colgroup>
            <tbody>
              <tr>
                <th>최초등록일</th>
                <td>
                  <DatePicker max={moment(new Date()).format('YYYY-MM-DD')} defaultValue={frstRegDtMoment} width="100%" onClick={handleCalendarPop} />
                </td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td>
                  {/* <MobSelectBox options={[
                    { id: 'radio1', value: 1, checked: true, disabled: false, label: '2016년' },
                    { id: 'radio2', value: 2, checked: false, disabled: false, label: '2017년' }
                  ]} width='100%' /> */}
                  <MobSelectList
                    itemsSource={carFrmYyyyList}
                    selectedItem={find(carFrmYyyyList, ['value', frmYyyy])}
                    displayMemberPath={'label'}
                    selectedValuePath={'value'}
                    // onClick={handleSrchOrder}
                    onClick={selectMobValue}
                    subPop={true}
                    width={136}
                  />
                </td>
              </tr>
              <tr>
                <th>색상</th>
                <td>
                  <MobSelectBox customMode={true} customName="색상" width="100%">
                    <div className="inner filter-list-wrap pt0">{/* <CheckColors /> 컴포넌트 삽입해주세요 */}</div>
                  </MobSelectBox>
                </td>
              </tr>
              <tr>
                <th>연료</th>
                <td>
                  <MobSelectBox
                    options={[
                      { id: 'radio3', value: 1, checked: true, disabled: false, label: '가솔린+전기' },
                      { id: 'radio4', value: 2, checked: false, disabled: false, label: '가솔린' }
                    ]}
                    width="100%"
                  />
                </td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>
                  <Input type="text" placeHolder="배기량을 입력해주세요" id="input-tp1" width="100%" />
                </td>
              </tr>
              <tr>
                <th>차종</th>
                <td>
                  <MobSelectBox
                    options={[
                      { id: 'radio5', value: 1, checked: true, disabled: false, label: '준중형차' },
                      { id: 'radio6', value: 2, checked: false, disabled: false, label: '중형차' },
                      { id: 'radio7', value: 3, checked: false, disabled: false, label: '소형차' },
                      { id: 'radio8', value: 4, checked: false, disabled: false, label: '경차' }
                    ]}
                    width="100%"
                  />
                </td>
              </tr>
              <tr>
                <th>용도</th>
                <td>
                  <MobSelectBox
                    options={[
                      { id: 'radio9', value: 1, checked: true, disabled: false, label: '일반' },
                      { id: 'radio10', value: 2, checked: false, disabled: false, label: '장애인' },
                      { id: 'radio11', value: 3, checked: false, disabled: false, label: '택시' },
                      { id: 'radio12', value: 4, checked: false, disabled: false, label: '렌트카' },
                      { id: 'radio13', value: 5, checked: false, disabled: false, label: '운전교습용' }
                    ]}
                    width="100%"
                  />
                </td>
              </tr>
              <tr>
                <th>출고가격</th>
                <td>
                  <Input type="text" placeHolder="출고가격을 입력해주세요" id="input-tp2" width="100%" />
                </td>
              </tr>
              <tr>
                <th>
                  주행거리
                  <br />
                  (현재기준)
                </th>
                <td>
                  <Input type="text" placeHolder="주행거리를 입력해주세요" id="input-tp3" width="100%" />
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption>차량 기본정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="23%" />
              <col width="23%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td colSpan="3">{crNo}</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td colSpan="3">{crNm ?? `${crMnfcCdNm ?? ''} ${crDtlMdlCdNm ?? ''} ${crClsCdNm ?? ''} ${crDtlClsCdNm ?? ''}`}</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>{frstRegDt}</td>
                <th>형식년도</th>
                <td>{getLabelFromArray(carFrmYyyyList, frmYyyy)}</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>{getLabelFromArray(carColors, crClrCd) || crClrCdNm}</td>
                <th>연료</th>
                <td>{fuelNm}</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>{setCommaCallback(dspl) + 'cc'}</td>
                <th>차종</th>
                <td>{getLabelFromArray(carTypes, crTypeCd)}</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>{getLabelFromArray(carUseDvcdList, crUseDvcd) || crUseDvcd}</td>
                <th>출고가격</th>
                <td>{setCommaCallback(crRlsPrc) + '만원'}</td>
              </tr>
            </tbody>
          </table>
        )}
        {
          <>
            <div className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
            <MobBottomArea active={calPop} isFixButton={true} zid={102}>
              <MobCalendar date={frstRegDtMoment} callback={calendarCallback} />
            </MobBottomArea>
          </>
        }
      </>
    );
  }
  return (
    <>
      <table summary="차량 기본 정보에 대한 내용" className={`table-tp1 ${className}`}>
        {pagetype !== 'live' && <caption>차량 기본 정보</caption>}

        <colgroup>
          <col width="14%" />
          <col width="27%" />
          <col width="14%" />
          <col width="45%" />
        </colgroup>
        <tbody>
          <tr>
            <th>차량번호</th>
            <td>{crNo}</td>
            <th>차량명 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span className="car-name">
                <span>{crNm ?? `${crMnfcCdNm ?? ''} ${crDtlMdlCdNm ?? ''} ${crClsCdNm ?? ''} ${crDtlClsCdNm ?? ''}`}</span>
                {isEditing && <i className="ico-pencil" onClick={showCarSelectionPop}></i>}
              </span>
            </td>
          </tr>
          <tr>
            <th>최초등록일 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  <DatePicker max={moment(new Date()).format('YYYY-MM-DD')} defaultValue={frstRegDtMoment} inputWidth={160} inputHeight={40} onChange={datePick} />
                ) : (
                  frstRegDt?.substring(0, 10)
                )}
              </span>
              {(validation.frstRegDt || validation.frstRegDt) && <p className="tx-exp-tp4">{validation.frstRegDt}</p>}
            </td>
            <th>형식년도 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  // <SelectBox id="formDate" className="items-sbox" options={frmYyyyList} width={160} height={40} onChange={selectValue} name="frmYyyy" valueBy="value" value={frmYyyy} />
                  <SelectBox id="formDate" className="items-sbox" options={carFrmYyyyList} width={160} height={40} onChange={selectValue} name="frmYyyy" value={frmYyyy} />
                ) : (
                  // getLabelFromArray(frmYyyyList, frmYyyy)
                  getLabelFromArray(carFrmYyyyList, frmYyyy)
                )}
              </span>
              {(validation.frmYyyy || validation.frmYyyy) && <p className="tx-exp-tp4">{validation.frmYyyy}</p>}
            </td>
          </tr>
          <tr>
            <th>색상 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  <SelectBox id="crClrCd" className="items-sbox" options={carColors} width={160} height={40} onChange={selectValue} name="crClrCd" value={crClrCd} />
                ) : (
                  getLabelFromArray(carColors, crClrCd) || crClrCdNm
                )}
              </span>
              {validation.crClrCd && <p className="tx-exp-tp4">{validation.crClrCd}</p>}
            </td>
            <th>연료 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  <SelectBox id="fuelDvcd" className="items-sbox" options={fuelTypes} width={160} height={40} onChange={selectValue} name="fuelDvcd" value={fuelDvcd} />
                ) : (
                  getLabelFromArray(fuelTypes, fuelDvcd)
                )}
              </span>
              {validation.fuelDvcd && <p className="tx-exp-tp4">{validation.fuelDvcd}</p>}
            </td>
          </tr>
          <tr>
            <th>배기량 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  <>
                    <label htmlFor="engineCc" className="hide">
                      배기량
                    </label>
                    <Input type="text" placeHolder="" id="engineCc" width={160} height={40} onKeyPress={onKeyPress} onBlur={_onInput} name="dspl" value={setCommaCallback(dspl)} />
                    <em>cc</em>
                  </>
                ) : (
                  setCommaCallback(dspl) + 'cc'
                )}
                {validation.dspl && <p className="tx-exp-tp4">{validation.dspl}</p>}
              </span>
            </td>

            <th>차종 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
            <td>
              <span>
                {isEditing ? (
                  <SelectBox id="carType" className="items-sbox" options={carTypes} width={160} height={40} onChange={selectValue} name="crTypeCd" value={crTypeCd} />
                ) : (
                  getLabelFromArray(carTypes, crTypeCd)
                )}
              </span>
              {validation.crTypeCd && <p className="tx-exp-tp4">{validation.crTypeCd}</p>}
            </td>
          </tr>
          {pagetype !== 'live' && (
            <>
              <tr>
                <th>용도 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
                <td>
                  <span>
                    {isEditing ? (
                      <SelectBox id="crUseDvcd" className="items-sbox" options={carUseDvcdList} width={160} height={40} onChange={selectValue} name="crUseDvcd" valueBy="value" value={crUseDvcd} />
                    ) : (
                      getLabelFromArray(carUseDvcdList, crUseDvcd) || crUseDvcd
                    )}
                  </span>
                  {validation.crUseDvcd && <p className="tx-exp-tp4">{validation.crUseDvcd}</p>}
                </td>
                <th>출고가격 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
                <td>
                  <span>
                    {isEditing ? (
                      <>
                        <label htmlFor="facPrice" className="hide">
                          출고가격
                        </label>
                        <Input
                          type="text"
                          placeHolder=""
                          value=""
                          id="facPrice"
                          width={160}
                          height={40}
                          onBlur={_onInput}
                          onKeyPress={onKeyPress}
                          name="crRlsPrc"
                          value={setCommaCallback(crRlsPrc / priceUnit)}
                        />
                        <em>만원</em>
                      </>
                    ) : (
                      setCommaCallback(crRlsPrc / priceUnit) + '만원'
                    )}
                    {validation.crRlsPrc && <p className="tx-exp-tp4">{validation.crRlsPrc}</p>}
                  </span>
                </td>
              </tr>
              {dpDrvDist && !noneValuaction /* 추가 */ && (
                <tr>
                  <th>변속기 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
                  <td>
                    <span>
                      {isEditing ? (
                        <SelectBox id="mssDvcd" className="items-sbox" options={carMssList} width={160} height={40} onChange={selectValue} name="mssDvcd" valueBy="value" value={mssDvcd} />
                      ) : (
                        getLabelFromArray(carMssList, mssDvcd)
                      )}
                    </span>
                    {validation.mssDvcd && <p className="tx-exp-tp4">{validation.mssDvcd}</p>}
                  </td>
                  <th>주행거리 {isEditing && <span style={{ color: 'red' }}>*</span>}</th>
                  <td>
                    <span>
                      {isEditing ? (
                        <>
                          <label htmlFor="drvDist" className="hide">
                            주행거리
                          </label>
                          <Input
                            type="text"
                            placeHolder=""
                            value=""
                            id="drvDist"
                            width={160}
                            height={40}
                            onBlur={_onInput}
                            onKeyPress={onKeyPress}
                            onChange={ (e) => {
                              if(!isNaN(e.target.value) && e.target.value < tsDrvDist){
                                !drvDistErr && setDrvDistErr(true);
                              }else{
                                drvDistErr && setDrvDistErr(false);
                              }
                            }}
                            name="drvDist"
                            value={setCommaCallback(drvDist)}
                            className={drvDistErr && 'tx-red80'}
                          />
                          <em>km</em> 
                          <span>({setComma(tsDrvDist)}km, 출처: 교통안전공단)</span>
                        </>
                      ) : drvDist ? (
                        <>{setCommaCallback(drvDist)} km </>
                      ) : (
                        ''
                      )}
                      {validation.drvDist && <p className="tx-exp-tp4">{validation.drvDist}</p>}
                    </span>
                  </td>
                </tr>
              )}
              {dpDrvDist && noneValuaction /* 추가 */ && (
                <tr>
                  <th>
                    주행거리 <br />
                    (현재기준) {isEditing && <span style={{ color: 'red' }}>*</span>}
                  </th>
                  <td colSpan="3">
                    <span>
                      {isEditing ? (
                        <>
                          <label htmlFor="drvDist" className="hide">
                            주행거리
                          </label>
                          <Input type="text" placeHolder="" value="" id="drvDist" width={160} height={40} onBlur={_onInput} onKeyPress={onKeyPress} name="drvDist" value={setCommaCallback(drvDist)} />
                          <em>km</em>
                        </>
                      ) : drvDist ? (
                        setCommaCallback(drvDist) + 'km'
                      ) : (
                        ''
                      )}
                      {validation.drvDist && <p className="tx-exp-tp4">{validation.drvDist}</p>}
                    </span>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
      {displayCarSelectionPop && (
        <RodalPopup show={displayCarSelectionPop} type={'fade'} closedHandler={hideCarSelectionPop} mode="normal" className="pop-car-name-mod" width={894}>
          <div className="con-wrap">
            <CarSelection item={item} saveCallback={saveCallback} cancleEmitter={(e) => hideCarSelectionPop(false)} />
          </div>
        </RodalPopup>
      )}
    </>
  );
};

export default memo(CarBasicInfoEditor);
