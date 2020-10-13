import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes, { number } from 'prop-types';
import moment from 'moment';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import DatePicker from '@src/components/common/calendar/DatePicker';
import InputNumber from '@lib/share/items/InputNumber';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobSelectList from '@lib/share/items/MobSelectList';
import PricingCheckColors from '@src/components/pricingSystem/pricingCheckColors';
import SellcarCheckColors from '@src/components/sellcar/self/SellcarCheckColors';
import { getCommonCodeAsyncNoSelect } from '@src/utils/DataUtils';
import { selectAllCarTypeList } from '@src/api/common/CarInfoApi';
import { inputPropAction, getSearchCarSpecInfo } from '@src/actions/sellcar/sellCarAction';
import { carUseDvcdList } from '@src/constant/carTypeCd';
import { getChkFontColor } from '@src/components/sellcar/self/MobSellcarUtil';
import Input from '@lib/share/items/Input';
import { setComma, removeComma } from '@src/utils/StringUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

const parseResults = (result) => {
  const { data } = result?.data;
  if (data?.every((res) => !!res)) {
    return data?.map(({ id, name, bsno }) => ({
      id: id.toString(),
      value: id.toString(),
      label: name,
      bsno
    }));
  }
};

const yearOptionMaker = () => {
  const _startYear = 1989;
  const _nextYear = new Date().getFullYear() + 1;
  const _yearArr = [];
  for (let i = _startYear; i <= _nextYear; i++) {
    _yearArr.push({
      id: `${i}`,
      value: `${i}`,
      label: `${i}년식`,
      checked: false
    });
  }
  return _yearArr;
};

const findCodeNameItem = (options, val) => {
  let findItem = null;
  if (options && val) {
    findItem = options.find((x) => x.cdId?.toString() === val.toString());
  }
  return findItem;
};

const findLabelValue = (options, val) => {
  if (options && val) {
    return options.find((x) => x.id === val.toString());
  }
  return null;
};

const findLabelTextValue = (options, val) => {
  let findItem = null;
  if (options && val) {
    findItem = options.find((x) => x.id === val.toString());
  }
  return findItem?.label;
};

const findItemById = (options, val) => {
  let findItem = null;
  if (options && val) {
    findItem = options.find((x) => x.cdId === val.toString());
  }
  return findItem;
};

// eslint-disable-next-line react/prop-types
const MobCarBasicInfoEditor = ({ item, isEditing = true, type = '', handleCalendarPop, onChange, onChangeValues }) => {
  const dispatch = useDispatch();

  const dsplOptions = useSelector((state) => state.sellCarStore.searchCarDsplOptions);
  const fuelOptions = useSelector((state) => state.sellCarStore.searchCarFuelOptions);
  const mssOptions = useSelector((state) => state.sellCarStore.searchCarMssOptions);
  const noyOptions = useSelector((state) => state.sellCarStore.searchCarNoyOptions);

  const [prevModel, setPrevModel] = useState('');
  const [carTypes, setCarTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [carMssList, setCarMssList] = useState([]);
  const [isColorPopUp, setIsColorPopUp] = useState(false);
  const [calPop, setCalPop] = useState(false);
  const [colorList, setColorList] = useState([]);
  const { crNm, dspl, crNo, crMnfcCdNm, mssDvcd, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm, frstRegDt, frmYyyy, crClrCdNm, crClrCd, crSpClrCd, fuelDvcd, crTypeCd, crUseDvcd, crRlsPrc, drvDist } =
    item || {};
  const createBodyPortal = useCreatePortalInBody(null, 'wrap');
  const [frstRegDtState, setFrstRegDtState] = useState(moment(frstRegDt).toDate());
  const [reduxColorList, setReduxColorList] = useState([]);

  useEffect(() => {
    Promise.all([selectAllCarTypeList()]).then((results) => {
      const [carTypes] = results;
      if (carTypes) setCarTypes(parseResults(carTypes));
    });
    getCommonCodeAsyncNoSelect('FM047').then(setCarMssList);
    getCommonCodeAsyncNoSelect('FM048').then(setFuelTypes);
    getCommonCodeAsyncNoSelect('AM104').then(setReduxColorList); // Color ( from pricing system )
  }, []);

  // useEffect(() => {
  //   console.log('TEST503 options carUseDvcdList ', carUseDvcdList);
  //   console.log('TEST503 options fuelOptions ', fuelOptions);
  //   console.log('TEST503 options fuelTypes', fuelTypes);
  //   console.log('TEST503 options mssOptions', mssOptions);
  //   console.log('TEST503 options carMssList', carMssList);
  // }, [carUseDvcdList, fuelOptions, fuelTypes, mssOptions, carMssList]);

  useEffect(() => {
    if (type === 'sellcar') {
      const _crSpClrCdList = [];
      getCommonCodeAsyncNoSelect('AM104').then((originalList) => {
        originalList.forEach((element) => {
          if (!objIsEmpty(element) && !objIsEmpty(element)) {
            const _newStr = element.label.replace('(', '<br>('); // 하늘색(민트)
            _crSpClrCdList.push({
              cdId: element.cdId, //매매 색상 AM104
              id: `chk-${element.cdId}`,
              bgColor: element.attr2, //색상 미리보기 색
              chkColor: getChkFontColor(element.cdId), //체크 했을시 글자색
              value: element.value,
              title: _newStr, //UI에 맞는 화면 표시 색상명
              label: element.label, //가지고 있는 색상명
              mainYn: element.attr1, //주요 5색 여부
              crClrCd: element.attr3 //원부 색상 AM105
            });
          }
        });
        setColorList(_crSpClrCdList);
      });
    }
  }, [type]);

  useEffect(() => {
    if (item?.crDtlMdlCd !== undefined && item?.crDtlMdlCd !== prevModel) {
      setPrevModel(item.crDtlMdlCd);
      dispatch(getSearchCarSpecInfo(item.crDtlMdlCd));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const frstRegDtMoment = useMemo(() => {
    if (typeof frstRegDt === 'string') {
      const frstRegDtMt = moment(frstRegDt);
      setFrstRegDtState(frstRegDtMt);
      return frstRegDtMt.toDate();
    }
  }, [frstRegDt]);

  // 연식
  const handleFrmYyyy = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'frmYyyy',
              value: deps.value.toString()
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'frmYyyy',
            value: deps.value.toString()
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 연료
  const handleFuelDvcd = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'fuelDvcd',
              value: deps.value
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'fuelDvcd',
            value: deps.value
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 차종
  const handleCrTypeCd = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'crTypeCd',
              value: deps.value
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'crTypeCd',
            value: deps.value
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 사용 용도
  const handleCrUseDvcd = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'crUseDvcd',
              value: deps.value
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'crUseDvcd',
            value: deps.value
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 변속기
  const handleMssDvcd = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'mssDvcd',
              value: deps.value
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'mssDvcd',
            value: deps.value
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 배기량
  const handleDspl = useCallback(
    (e, deps) => {
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChange({
            target: {
              ...e.target,
              name: 'dspl',
              value: Number((deps.value || '').toLowerCase().replace(/cc/g, ''))
            }
          });
          return;
        }
        dispatch(
          inputPropAction({
            state: 'car',
            prop: 'dspl',
            value: deps.value
          })
        );
      }
    },
    [dispatch, onChange]
  );

  // 색상 crClrCd (AM105 10개) / crSpClrCd (AM104 15개)
  const handleClrChanged = useCallback(
    (e, deps) => {
      setIsColorPopUp(false);
      if (!objIsEmpty(deps)) {
        if (onChange) {
          onChangeValues &&
            onChangeValues({
              crClrCdNm: deps.selectColor,
              crClrCd: deps.selectColorCode,
              crSpClrCd: deps.selectSubColorCode
            });
          return;
        }
        if (type === 'sellcar') {
          const _chkColor = findItemById(colorList, deps);
          dispatch(
            inputPropAction({
              state: 'car',
              prop: 'crClrCd',
              value: _chkColor.crClrCd
            })
          );
          dispatch(
            inputPropAction({
              state: 'car',
              prop: 'crSpClrCd',
              value: _chkColor.cdId
            })
          );
          dispatch(
            inputPropAction({
              state: 'car',
              prop: 'crClrCdNm',
              value: _chkColor.label
            })
          );
        } else {
          dispatch(
            inputPropAction({
              state: 'car',
              prop: 'crClrCdNm',
              value: deps
            })
          );
        }
      }
    },
    [onChange, type, colorList, dispatch]
  );

  const handleFrstRegDtChanged = (e, date) => {
    e.preventDefault();
    if (date) {
      if (onChange) {
        onChange({
          target: {
            ...e.target,
            name: 'frstRegDt',
            value: date.format('YYYY-MM-DD')
          }
        });
      }
    }

    setFrstRegDtState(date);

    setCalPop(false);
    preventScroll(false);
  };

  const handleCalendarPopup = (e) => {
    e.preventDefault();
    if (handleCalendarPop) {
      handleCalendarPop(e);
      return;
    }
    setCalPop(true);
    preventScroll(true);
  };

  const handleColorPopUpToggle = useCallback(() => {
    setIsColorPopUp(!isColorPopUp);
  }, [isColorPopUp]);

  const handleCalendarPopUpToggle = (e) => {
    e.preventDefault();
    const next = !calPop;
    setCalPop(next);
    preventScroll(next);
  };

  // 주행거리 blur
  const _onInput = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    const numberTypeColumns = ['crRlsPrc', 'drvDist', 'dspl'];

    if (numberTypeColumns.some((n) => n === name)) {
      value = removeComma(value);
    }
    if (onChange) {
      onChange({
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

  // 주행거리 keypress
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      _onInput(e);
    }
  };

  const getValueByCdId = (cdId) => {
    const target = reduxColorList.find((obj) => obj.cdId === cdId);
    return target?.cdNm || null;
  };

  if (type === 'modifyCar') {
    return (
      <>
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
                <DatePicker defaultValue={frstRegDtState} inputWidth={100} inputMeasure={'%'} onClick={handleCalendarPopup} />
              </td>
            </tr>
            <tr>
              <th>형식년도</th>
              <td>
                <MobSelectList
                  itemsSource={noyOptions || yearOptionMaker()}
                  selectedItem={findLabelValue(noyOptions || yearOptionMaker(), frmYyyy)}
                  displayMemberPath={'label'}
                  selectedValuePath={'value'}
                  onClick={handleFrmYyyy}
                />
              </td>
            </tr>
            <tr>
              <th>색상</th>
              <td>
                <MobSelectBox customMode={true} customName={getValueByCdId(crClrCd) || crClrCdNm || '색상'} isOpen={isColorPopUp} onOpen={handleColorPopUpToggle} subPop={true}>
                  <div className="inner filter-list-wrap pt0">
                    {/* <SellcarCheckColors mode="radio" selectedColor={crSpClrCd || ''} onClick={handleClrChanged} colorList={colorList} /> */}
                    <PricingCheckColors mode="radio" selectedColor={crClrCd || ''} selectedSubColor={crSpClrCd || ''} onClick={handleClrChanged} useClrCdId={true}/>
                  </div>
                </MobSelectBox>
              </td>
            </tr>
            <tr>
              <th>연료</th>
              <td>
                <MobSelectList
                  itemsSource={fuelOptions || fuelTypes}
                  selectedItem={findCodeNameItem(fuelOptions || fuelTypes, fuelDvcd)}
                  displayMemberPath={'cdNm'}
                  selectedValuePath={fuelOptions ? 'id' : 'cdId'}
                  onClick={handleFuelDvcd}
                />
              </td>
            </tr>
            <tr>
              <th>배기량</th>
              <td>
                {/* <Input type="text" placeHolder="배기량을 입력해주세요" id="input-tp1" width="100%" disabled={true} /> */}
                <MobSelectList
                  itemsSource={dsplOptions || []}
                  selectedItem={findLabelValue(dsplOptions || [], dspl)}
                  displayMemberPath={'cdNm'}
                  selectedValuePath={dsplOptions ? 'id' : 'cdId'}
                  onClick={handleDspl}
                />
              </td>
            </tr>
            <tr>
              <th>차종</th>
              <td>
                <MobSelectList itemsSource={carTypes} selectedItem={findLabelValue(carTypes, crTypeCd)} displayMemberPath={'label'} selectedValuePath={'value'} onClick={handleCrTypeCd} />
              </td>
            </tr>
            <tr>
              <th>용도</th>
              <td>
                <MobSelectList
                  itemsSource={carUseDvcdList}
                  selectedItem={findLabelValue(carUseDvcdList, crUseDvcd)}
                  displayMemberPath={'label'}
                  selectedValuePath={'value'}
                  onClick={handleCrUseDvcd}
                />
              </td>
            </tr>
            <tr>
              <th>출고가격</th>
              <td>
                <InputNumber height={40} name="crRlsPrc" value={crRlsPrc} onChange={_onInput} onBlur={_onInput} />
              </td>
            </tr>
            <tr>
              <th>
                주행거리
                <br />
                (현재기준)
              </th>
              <td>
                {/* <Input type="text" placeHolder="주행거리를 입력해주세요" id="input-tp3" width="100%" /> */}
                <InputNumber value={drvDist} height={40} onBlur={_onInput} onChange={_onInput} onKeyPress={onKeyPress} name="drvDist" />
              </td>
            </tr>
          </tbody>
        </table>
        {/* // modifyCar */}
        {calPop
          ? createBodyPortal(
              <>
                <div className={calPop ? `modal-bg v-3 black active` : `modal-bg v-3 black`} onClick={handleCalendarPopUpToggle} />
                <MobBottomArea active={calPop} isFixButton={true} zid={102}>
                  <MobCalendar date={frstRegDtMoment || moment()} callback={handleFrstRegDtChanged} />
                </MobBottomArea>
              </>
            )
          : null}
      </>
    );
  }

  if (type === 'table') {
    return (
      <>
        {isEditing ? (
          <table summary="차량 기본정보에 대한 내용" className="table-tp1 pb80">
            <caption className="away">차량 기본 정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>{crNo}</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td>{crNm ?? `${crMnfcCdNm ?? ''} ${crDtlMdlCdNm ?? ''} ${crClsCdNm ?? ''} ${crDtlClsCdNm ?? ''}`}</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>
                  <DatePicker defaultValue={frstRegDtMoment} inputWidth={100} inputMeasure={'%'} onClick={handleCalendarPopup} />
                </td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td>
                  <MobSelectList
                    itemsSource={noyOptions || yearOptionMaker()}
                    selectedItem={findLabelValue(noyOptions || yearOptionMaker(), frmYyyy)}
                    displayMemberPath={'label'}
                    selectedValuePath={'value'}
                    onClick={handleFrmYyyy}
                  />
                </td>
              </tr>
              <tr>
                <th>색상</th>
                <td>
                  <MobSelectBox customMode={true} customName={crClrCdNm || getValueByCdId(crClrCd) || '색상'} isOpen={isColorPopUp} onOpen={handleColorPopUpToggle} subPop={true}>
                    <div className="inner filter-list-wrap pt0">
                      <PricingCheckColors mode="radio" selectedColor={crClrCdNm || ''} onClick={handleClrChanged} />
                    </div>
                  </MobSelectBox>
                </td>
              </tr>
              <tr>
                <th>연료</th>
                <td>
                  <MobSelectList
                    itemsSource={fuelOptions || fuelTypes}
                    selectedItem={findCodeNameItem(fuelOptions || fuelTypes, fuelDvcd)}
                    displayMemberPath={'cdNm'}
                    selectedValuePath={fuelOptions ? 'id' : 'cdId'}
                    onClick={handleFuelDvcd}
                  />
                </td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>
                  <>
                    <label htmlFor="engineCc" className="hide">
                      배기량
                    </label>
                    <MobSelectList
                      itemsSource={dsplOptions || []}
                      selectedItem={findLabelValue(dsplOptions || [], dspl)}
                      displayMemberPath={'cdNm'}
                      selectedValuePath={dsplOptions ? 'id' : 'cdId'}
                      onClick={handleDspl}
                    />
                  </>
                </td>
              </tr>
              <tr>
                <th>차종</th>
                <td>
                  <MobSelectList itemsSource={carTypes} selectedItem={findLabelValue(carTypes, crTypeCd)} displayMemberPath={'label'} selectedValuePath={'value'} onClick={handleCrTypeCd} />
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table summary="차량 기본정보에 대한 내용" className="table-tp1 pb80">
            <caption className="away">차량 기본 정보</caption>
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
                <td colSpan="3">{frstRegDt ? moment(frstRegDtMoment).format('YYYY.MM.DD') : ''}</td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td>{findLabelTextValue(noyOptions || yearOptionMaker(), frmYyyy)}</td>
                <th>색상</th>
                <td>{crClrCdNm}</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>{findCodeNameItem(fuelOptions || fuelTypes, fuelDvcd)?.cdNm}</td>
                <th>배기량</th>
                <td>
                  <>
                    <label htmlFor="engineCc" className="hide">
                      배기량
                    </label>
                    {findLabelTextValue(dsplOptions || [], dspl)}
                  </>
                </td>
              </tr>
              <tr>
                <th>차종</th>
                <td colSpan="3">{findLabelTextValue(carTypes, crTypeCd)}</td>
              </tr>
            </tbody>
          </table>
        )}
        {calPop
          ? createBodyPortal(
              <>
                <div className={calPop ? `modal-bg v-3 active` : `modal-bg v-3`} onClick={handleCalendarPopUpToggle} />
                <MobBottomArea active={calPop} isFixButton={true} zid={102}>
                  <MobCalendar date={frstRegDtMoment || moment()} callback={handleFrstRegDtChanged} />
                </MobBottomArea>
              </>
            )
          : null}
      </>
    );
  }

  return (
    <>
      <div className="inner bottom-write-area pb0">
        <form>
          <fieldset>
            <legend className="away">차량 기본정보 확인</legend>
            <table summary="차량 기본정보에 대한 내용" className="table-tp2">
              <caption>차량 기본정보 확인</caption>
              <colgroup>
                <col width="34%" />
                <col width="66%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>최초등록일</th>
                  <td>
                    <DatePicker defaultValue={frstRegDtState} inputWidth={100} inputMeasure={'%'} onClick={handleCalendarPopup} />
                    {/* <DatePicker defaultValue={frstRegDtMoment} inputWidth={100} inputMeasure={'%'} onClick={handleCalendarPopup} /> */}
                  </td>
                </tr>
                <tr>
                  <th>형식년도</th>
                  <td>
                    <MobSelectList
                      itemsSource={noyOptions || yearOptionMaker()}
                      selectedItem={findLabelValue(noyOptions || yearOptionMaker(), frmYyyy)}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      onClick={handleFrmYyyy}
                    />
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>
                    <MobSelectBox customMode={true} customName={crClrCdNm || getValueByCdId(crClrCd) || '색상'} isOpen={isColorPopUp} onOpen={handleColorPopUpToggle} subPop={true}>
                      <div className="inner filter-list-wrap pt0">
                        {type === 'sellcar' && <SellcarCheckColors mode="radio" selectedColor={crSpClrCd || ''} onClick={handleClrChanged} colorList={colorList} />}
                        {type !== 'sellcar' && <PricingCheckColors mode="radio" selectedColor={crClrCdNm || ''} onClick={handleClrChanged} />}
                      </div>
                    </MobSelectBox>
                  </td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>
                    <MobSelectList
                      itemsSource={fuelOptions || fuelTypes}
                      selectedItem={findCodeNameItem(fuelOptions || fuelTypes, fuelDvcd)}
                      displayMemberPath={'cdNm'}
                      selectedValuePath={fuelOptions ? 'id' : 'cdId'}
                      onClick={handleFuelDvcd}
                    />
                  </td>
                </tr>
                <tr>
                  <th>배기량(cc)</th>
                  <td>
                    <>
                      <label htmlFor="engineCc" className="hide">
                        배기량
                      </label>
                      <MobSelectList
                        itemsSource={dsplOptions || []}
                        selectedItem={findLabelValue(dsplOptions || [], dspl)}
                        displayMemberPath={'cdNm'}
                        selectedValuePath={dsplOptions ? 'id' : 'cdId'}
                        onClick={handleDspl}
                      />
                    </>
                  </td>
                </tr>
                <tr>
                  <th>차종</th>
                  <td>
                    <MobSelectList itemsSource={carTypes} selectedItem={findLabelValue(carTypes, crTypeCd)} displayMemberPath={'label'} selectedValuePath={'value'} onClick={handleCrTypeCd} />
                  </td>
                </tr>
                <tr>
                  <th>용도</th>
                  <td>
                    <MobSelectList
                      itemsSource={carUseDvcdList}
                      selectedItem={findLabelValue(carUseDvcdList, crUseDvcd)}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      onClick={handleCrUseDvcd}
                    />
                  </td>
                </tr>
                <tr>
                  <th>출고가격(만원)</th>
                  <td>
                    <label htmlFor="fac-price" className="hide">
                      출고가격
                    </label>
                    <InputNumber height={40} name="crRlsPrc" value={crRlsPrc} onChange={_onInput} onBlur={_onInput} maxLength={4} />
                  </td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>
                    <span>
                      <MobSelectList
                        itemsSource={mssOptions || carMssList}
                        selectedItem={findCodeNameItem(mssOptions || carMssList, mssDvcd)}
                        displayMemberPath={'cdNm'}
                        selectedValuePath={'cdId'}
                        onClick={handleMssDvcd}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>
        {calPop
          ? createBodyPortal(
              <>
                <div className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCalendarPopUpToggle} />
                <MobBottomArea active={calPop} isFixButton={true} zid={102}>
                  <MobCalendar date={frstRegDtMoment || moment()} callback={handleFrstRegDtChanged} />
                </MobBottomArea>
              </>
            )
          : null}
      </div>
    </>
  );
};

MobCarBasicInfoEditor.propTypes = {
  item: PropTypes.object,
  isEditing: PropTypes.bool,
  type: PropTypes.string,
  handleCalendarPop: PropTypes.func,
  onChange: PropTypes.func
};
MobCarBasicInfoEditor.displayName = 'MobCarBasicInfoEditor';
export default memo(MobCarBasicInfoEditor);
