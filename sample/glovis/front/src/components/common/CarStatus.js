import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import { setComma, removeComma } from '@src/utils/StringUtil';
import MobSelectList from '@lib/share/items/MobSelectList';
import { getCommonCodeAsync } from '@src/utils/DataUtils';

const CarStatus = memo(({ mode = 'apply', perfData, onChange, onInputChangeValues }) => {
  // const {
  //   drvdistInsbrdStt,
  //   drvDistStt,
  //   illglStrcChng,
  //   acdtYn,
  //   fludYn,
  //   ehstGas1,
  //   ehstGas2,
  //   strcChngYn,
  //   deviceChngYn,
  //   rentChngYn,
  //   leaseChngYn,
  //   commercialChngYn,
  //   clrType,
  //   fullPaintYn,
  //   clrChngYn,
  //   optEtcYn,
  //   optSunroofYn,
  //   optNavigationYn,
  //   vinSttCd,
  //   prsnDrvDist
  // } = item;

  const nf = Intl.NumberFormat();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const numberToStt = (number, target) => {
    const num = Number(number);
    if (num === 1) return target === 'drv' || target === 'vin' ? '양호' : '많음';
    if (num === 2) return target === 'drv' ? '불량' : target === 'vin' ? '부식' : '보통';
    if (num === 3) return target === 'vin' ? '훼손' : '적음';
    if (num === 4) return '상이';
    if (num === 5) return '변조';
    if (num === 6) return '도말';
  };

  // 버튼식 라디오
  const setEditingWith = () => {
    return {
      ehstGas1: perfData?.ehstGas1 !== 0,
      ehstGas2: perfData?.ehstGas2 !== 0,
      ill: !!perfData?.illglStrcChng || [perfData?.strcChngYn, perfData?.deviceChngYn].some((item) => item === 'Y'),
      special: [perfData?.acdtYn, perfData?.fludYn].some((item) => item === 'Y'),
      commercial: [perfData?.rentChngYn, perfData?.leaseChngYn, perfData?.commercialChngYn].some((item) => item === 'Y'),
      option: [perfData?.optEtcYn, perfData?.optSunroofYn, perfData?.optNavigationYn].some((item) => item === 'Y')
    };
  };

  const [commaDrvDist, setCommaDrvDist] = useState(setComma(perfData?.prsnDrvDist));
  const [commaGas1, setCommaGas1] = useState(setComma(perfData?.ehstGas1));
  const [commaGas2, setCommaGas2] = useState(setComma(perfData?.ehstGas2));
  const [vinSttOptions, setCrNoSttOptions] = useState([]);
  const [editing, setEditing] = useState(setEditingWith);

  useEffect(() => {
    setCommaDrvDist(setComma(perfData?.prsnDrvDist));
    setCommaGas1(setComma(perfData?.ehstGas1));
    setCommaGas2(setComma(perfData?.ehstGas2));
    setEditing(setEditingWith());
  }, [perfData]);

  useEffect(() => {
    getCommonCodeAsync('AM110').then(setCrNoSttOptions);
  }, []);

  const handleOnSelect = (e, deps) => {
    const { value } = deps.value;
    const { name } = 'vinSttCd';

    onChange({
      target: {
        name,
        value
      }
    });
  };

  const onCheck = (e) => {
    const { name, checked } = e.target;

    onChange({
      target: {
        name,
        value: checked ? 'Y' : 'N'
      }
    });
  };

  const checkEdit = (e) => {
    const { name, checked } = e.target;

    setEditing({
      ...editing,
      [name]: checked
    });

    switch (name) {
      case 'ehstGas1':
        if (!checked) setCommaGas1(0);
        break;
      case 'ehstGas2':
        if (!checked) setCommaGas2(0);
        break;
    }

    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: 0
      }
    });
  };

  const checkEditRadio = (e) => {
    const { name, value } = e.target;
    const newValue = value === 'true';
    const names = [];

    console.log('newValue : ', newValue);
    console.log('name', name);

    setEditing({
      ...editing,
      [name]: newValue
    });

    switch (name) {
      case 'ill':
        if (!newValue) {
          names.push({ name: 'illglStrcChng', value: null }, { name: 'strcChngYn', value: 'N' }, { name: 'deviceChngYn', value: 'N' });
        }
        break;
      case 'special':
        if (!newValue) {
          names.push({ name: 'fludYn', value: 'N' }, { name: 'acdtYn', value: 'N' });
        }
        break;
      case 'commercial':
        if (!newValue) {
          names.push({ name: 'rentChngYn', value: 'N' }, { name: 'leaseChngYn', value: 'N' }, { name: 'commercialChngYn', value: 'N' });
        }
        break;
      case 'option':
        if (!newValue) {
          names.push({ name: 'optEtcYn', value: 'N' }, { name: 'optSunroofYn', value: 'N' }, { name: 'optNavigationYn', value: 'N' });
        }
        break;
    }

    if (!newValue) {
      onInputChangeValues(names);
    }
  };

  const inputCommaNumber = (e) => {
    const { value, name } = e.target;
    const pureNumber = removeComma(value);
    const commaNumber = setComma(pureNumber);

    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: pureNumber || 0
      }
    });

    switch (name) {
      case 'prsnDrvDist':
        setCommaDrvDist(commaNumber);
        break;
      case 'ehstGas1':
        setCommaGas1(commaNumber);
        break;
      case 'ehstGas2':
        setCommaGas2(commaNumber);
        break;
    }
  };

  const parseIntValue = (e) => {
    const {
      target,
      target: { name, value }
    } = e;

    onChange({
      ...e,
      target: {
        ...target,
        name,
        value: parseInt(value)
      }
    });
  };

  return (
    <>
      {mode === 'apply' &&
        (!hasMobile ? (
          <fieldset>
            <legend className="away">자동차 종합상태</legend>
            <table summary="자동차 종합상태에 대한 내용" className="table-tp1 input fs14 th-c">
              <caption>자동차 종합상태</caption>
              <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>사용이력</th>
                  <th>상태</th>
                  <th>항목/해당부품</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>주행거리 계기상태</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'state1', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state2', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                  <td />
                </tr>
                <tr>
                  <th>주행거리 상태</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'state3', value: 1, checked: true, disabled: false, title: '많음' },
                        { id: 'state4', value: 2, checked: false, disabled: false, title: '보통' },
                        { id: 'state5', value: 2, checked: false, disabled: false, title: '적음' }
                      ]}
                    />
                  </td>
                  <td>
                    <em className="mr8">현재 주행거리</em>
                    <Input type="text" id="note3" width={122} height={40} />
                    <em>km</em>
                  </td>
                </tr>
                <tr>
                  <th>차대번호 표기</th>
                  <td>
                    <SelectBox
                      id="vin-number2"
                      className="items-sbox"
                      options={[
                        { value: 1, label: '양호' },
                        { value: 2, label: '부식' },
                        { value: 3, label: '훼손' },
                        { value: 4, label: '상이' },
                        { value: 5, label: '변조' },
                        { value: 6, label: '도말' }
                      ]}
                      placeHolder="양호"
                      width={160}
                      height={40}
                    />
                  </td>
                  <td />
                </tr>
                <tr>
                  <th>배출가스</th>
                  <td className="chk-y-wrap">
                    <CheckBox id="chk-gas-co1" title="일산화탄소" />
                    <CheckBox id="chk-gas-hc1" title="탄화수소" />
                  </td>
                  <td>
                    <span className="bridge2 gas">
                      <span>일산화탄소(CO)</span>
                      <Input type="text" id="gas-co2" width={122} height={40} />
                      <em>%</em>
                    </span>
                    <span className="bridge2 gas">
                      <span>탄화수소(HC)</span>
                      <Input type="text" id="gas-hc2" width={122} height={40} />
                      <em>ppm</em>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th rowSpan="2">튜닝</th>
                  <td rowSpan="2">
                    <RadioGroup
                      dataList={[
                        { id: 'none1', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'exist1', value: 2, checked: false, disabled: false, title: '있음' }
                      ]}
                    />
                  </td>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-legality" title="적법" />
                    <CheckBox id="chk-illegality" title="불법" />
                  </td>
                </tr>
                <tr>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-structure" title="구조" />
                    <CheckBox id="chk-device" title="장치" />
                  </td>
                </tr>
                <tr>
                  <th>특별이력</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'none2', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'exist2', value: 2, checked: false, disabled: false, title: '있음' }
                      ]}
                    />
                  </td>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-waterlogging" title="침수" />
                    <CheckBox id="chk-fire" title="화재" />
                  </td>
                </tr>
                <tr>
                  <th>용도변경</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'none3', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'exist3', value: 2, checked: false, disabled: false, title: '있음' }
                      ]}
                    />
                  </td>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-rent" title="렌트" />
                    <CheckBox id="chk-lease" title="리스" />
                    <CheckBox id="chk-business" title="영업용" />
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'none_color', value: 1, checked: true, disabled: false, title: '무채색' },
                        { id: 'exist_color', value: 2, checked: false, disabled: false, title: '유채색' }
                      ]}
                    />
                  </td>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-all-painting" title="전체도색" />
                    <CheckBox id="chk-painting" title="색상변경" />
                  </td>
                </tr>
                <tr>
                  <th>주요옵션</th>
                  <td>
                    <RadioGroup
                      dataList={[
                        { id: 'none4', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'exist4', value: 2, checked: false, disabled: false, title: '있음' }
                      ]}
                    />
                  </td>
                  <td className="chk-w-wrap">
                    <CheckBox id="chk-option-other" title="기타" />
                    <CheckBox id="chk-option-sunroof" title="선루프" />
                    <CheckBox id="chk-option-nav" title="네비게이션" />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ) : (
          <div className="accident-history-cont">
            <table summary="자동차 종합상태에 대한 내용" className="table-tp3">
              <colgroup>
                <col width="37%" />
                <col width="31.5%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>주행거리 계기상태</th>
                  <td />
                  <td className="td-right">
                    <ul className="radio-block tp2 mid short">
                      <li>
                        <Radio className="txt" id="state1" label="양호" name="drvdistInsbrdStt" value={1} checked={perfData?.drvdistInsbrdStt} onChange={parseIntValue} />
                      </li>
                      <li>
                        <Radio className="txt" id="state2" label="불량" name="drvdistInsbrdStt" value={2} checked={perfData?.drvdistInsbrdStt} onChange={parseIntValue} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>주행거리 상태</th>
                  <td colSpan="2" className="td-right">
                    <ul className="radio-block tp2 mid short">
                      <li>
                        <Radio className="txt" id="drvDistStt1" label="많음" name="drvDistStt" value={1} checked={perfData?.drvDistStt} onChange={parseIntValue} />
                      </li>
                      <li>
                        <Radio className="txt" id="drvDistStt2" label="보통" name="drvDistStt" value={2} checked={perfData?.drvDistStt} onChange={parseIntValue} />
                      </li>
                      <li>
                        <Radio className="txt" id="drvDistStt3" label="적음" name="drvDistStt" value={3} checked={perfData?.drvDistStt} onChange={parseIntValue} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>현재 주행거리</th>
                  <td colSpan="2">
                    <Input type="text" id="note3" width="100%" height={40} name="prsnDrvDist" value={commaDrvDist} onChange={inputCommaNumber} />
                  </td>
                </tr>
                <tr>
                  <th>차대번호 표기</th>
                  <td colSpan="2">
                    <MobSelectList
                      name="vinSttCd"
                      id="vinSttCd"
                      itemsSource={vinSttOptions}
                      selectedItem={find(vinSttOptions, ['value', perfData?.vinSttCd])}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      onClick={handleOnSelect}
                      subPop={true}
                      width={136}
                    />
                  </td>
                </tr>
                <tr>
                  <th>배출가스</th>
                  <td>
                    <CheckBox id="chk-gas-co1" title="일산화탄소" name="ehstGas1" onChange={checkEdit} checked={editing.ehstGas1} />
                  </td>
                  <td>
                    <CheckBox id="chk-gas-hc1" title="탄화수소" name="ehstGas2" onChange={checkEdit} checked={editing.ehstGas2} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>일산화탄소(CO)</td>
                  <td>
                    <Input type="text" id="gas-co2" width="100%" name="ehstGas1" value={commaGas1} disabled={!editing.ehstGas1} onChange={inputCommaNumber} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>탄화수소(HC)</td>
                  <td>
                    <Input type="text" id="gas-hc2" width="100%" name="ehstGas2" value={commaGas2} disabled={!editing.ehstGas2} onChange={inputCommaNumber} />
                  </td>
                </tr>
                <tr>
                  <th>튜닝</th>
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" name="ill" id="none1" label="없음" value={false} checked={editing.ill} onChange={checkEditRadio} />
                      </li>
                      <li>
                        <Radio className="txt" name="ill" id="exist1" label="있음" value={true} checked={editing.ill} onChange={checkEditRadio} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" name="illglStrcChng" id="illglStrcChng1" label="적법" value={1} disabled={!editing.ill} checked={perfData?.illglStrcChng} onChange={parseIntValue} />
                      </li>
                      <li>
                        <Radio className="txt" name="illglStrcChng" id="illglStrcChng2" label="불법" value={2} disabled={!editing.ill} checked={perfData?.illglStrcChng} onChange={parseIntValue} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-structure" title="구조" name="strcChngYn" checked={perfData?.strcChngYn === 'Y'} onChange={onCheck} disabled={!editing.ill} />
                  </td>
                  <td>
                    <CheckBox id="chk-device" title="장치" name="deviceChngYn" checked={perfData?.deviceChngYn === 'Y'} onChange={onCheck} disabled={!editing.ill} />
                  </td>
                </tr>
                <tr>
                  <th>특별이력</th>
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" id="special1" name="special" label="없음" value={false} checked={editing?.special} onChange={checkEditRadio} />
                      </li>
                      <li>
                        <Radio className="txt" id="special2" name="special" label="있음" value={true} checked={editing?.special} onChange={checkEditRadio} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-waterlogging" title="침수" name="fludYn" checked={perfData?.fludYn === 'Y'} onChange={onCheck} disabled={!editing.special} />
                  </td>
                  <td>
                    <CheckBox id="chk-fire" title="화재" name="acdtYn" checked={perfData?.acdtYn === 'Y'} onChange={onCheck} disabled={!editing.special} />
                  </td>
                </tr>
                <tr>
                  <th>용도변경</th>
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" id="none3" name="commercial" label="없음" value={false} checked={editing.commercial} onChange={checkEditRadio} />
                      </li>
                      <li>
                        <Radio className="txt" id="exist3" name="commercial" label="있음" value={true} checked={editing.commercial} onChange={checkEditRadio} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-rent" title="렌트" name="rentChngYn" checked={perfData?.rentChngYn === 'Y'} onChange={onCheck} disabled={!editing.commercial} />
                  </td>
                  <td>
                    <CheckBox id="chk-lease" title="리스" name="leaseChngYn" checked={perfData?.leaseChngYn === 'Y'} onChange={onCheck} disabled={!editing.commercial} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-business" title="영업용" name="commercialChngYn" checked={perfData?.commercialChngYn === 'Y'} onChange={onCheck} disabled={!editing.commercial} />
                  </td>
                  <td />
                </tr>
                <tr>
                  <th>색상</th>
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" id="block1-9" name="clrType" label="무채색" value={1} checked={perfData?.clrType} onChange={parseIntValue} />
                      </li>
                      <li>
                        <Radio className="txt" id="block1-10" name="clrType" label="유채색" value={2} checked={perfData?.clrType} onChange={parseIntValue} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-color1" title="전체도색" name="fullPaintYn" checked={perfData?.fullPaintYn === 'Y'} onChange={onCheck} />
                  </td>
                  <td>
                    <CheckBox id="chk-color2" title="색상변경" name="clrChngYn" checked={perfData?.clrChngYn === 'Y'} onChange={onCheck} />
                  </td>
                </tr>
                <tr>
                  <th>주요옵션</th>
                  <td colSpan="2">
                    <ul className="radio-block tp2 mid">
                      <li>
                        <Radio className="txt" id="option1" name="option" label="없음" value={false} checked={editing.option} onChange={checkEditRadio} />
                      </li>
                      <li>
                        <Radio className="txt" id="option2" name="option" label="있음" value={true} checked={editing.option} onChange={checkEditRadio} />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-option-other" title="기타" name="optEtcYn" checked={perfData?.optEtcYn === 'Y'} onChange={onCheck} disabled={!editing.option} />
                  </td>
                  <td>
                    <CheckBox id="chk-option-sunroof" title="선루프" name="optSunroofYn" checked={perfData?.optSunroofYn === 'Y'} onChange={onCheck} disabled={!editing.option} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <CheckBox id="chk-option-nav" title="네비게이션" name="optNavigationYn" checked={perfData?.optNavigationYn === 'Y'} onChange={onCheck} disabled={!editing.option} />
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      {mode === 'viewer' &&
        (!hasMobile ? (
          <fieldset className="car-status">
            <table summary="자동차 종합상태에 대한 내용" className="table-tp1">
              <caption>자동차 종합상태</caption>
              <colgroup>
                <col width="25%" />
                <col width="37.5%" />
                <col width="37.5%" />
              </colgroup>
              <thead>
                <tr>
                  <th>사용이력</th>
                  <th>상태</th>
                  <th>항목 / 해당부품</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>주행거리 계기상태</th>
                  <td>{numberToStt(perfData?.drvdistInsbrd, 'drv')}</td>
                  <td />
                </tr>
                <tr>
                  <th>주행거리 상태</th>
                  <td>{numberToStt(perfData?.drvDistStt, 'drv2')}</td>
                  <td>
                    <em className="mr8">현재 주행거리</em>
                    <span>{perfData?.prsnDrvDist ? nf.format(perfData?.prsnDrvDist) : 0}</span>
                    <em>km</em>
                  </td>
                </tr>
                <tr>
                  <th>차대번호 표기</th>
                  <td>{numberToStt(perfData?.vinSttCd, 'vin')}</td>
                  <td />
                </tr>
                <tr>
                  <th rowSpan="2">배출가스</th>
                  <td>일산화탄소</td>
                  <td>
                    <em className="mr8">일산화탄소(CO)</em>
                    <span>{perfData?.ehstGas1 ? nf.format(perfData?.ehstGas1) : 0}</span>
                    <em>%</em>
                  </td>
                </tr>
                <tr>
                  <td>탄화수소</td>
                  <td>
                    <em className="mr8">탄화수소(HC)</em>
                    <span>{perfData?.ehstGas2 ? nf.format(perfData?.ehstGas2) : 0}</span>
                    <em>ppm</em>
                  </td>
                </tr>
                <tr>
                  <th rowSpan="2">튜닝</th>
                  <td rowSpan="2">{perfData?.illglStrcChng > 0 && (perfData?.strcChngYn === 'Y' || perfData?.deviceChngYn === 'Y') ? '있음' : '없음'}</td>
                  <td>
                    {perfData?.illglStrcChng === 1 && '적법'}
                    {perfData?.illglStrcChng === 2 && '불법'}
                  </td>
                </tr>
                <tr>
                  <td>
                    {perfData?.strcChngYn === 'Y' ? '구조 ' : ''}
                    {perfData?.deviceChngYn === 'Y' ? '장치' : ''}
                  </td>
                </tr>
                <tr>
                  <th>특별이력</th>
                  <td>{perfData?.fludYn === 'Y' || perfData?.acdtYn === 'Y' ? '있음' : '없음'}</td>
                  <td>
                    {perfData?.fludYn === 'Y' ? '침수 ' : ''}
                    {perfData?.acdtYn === 'Y' ? '화재' : ''}
                  </td>
                </tr>
                <tr>
                  <th>용도변경</th>
                  <td>{perfData?.rentChngYn === 'Y' || perfData?.leaseChngYn === 'Y' || perfData?.commercialChngYn === 'Y' ? '있음' : '없음'}</td>
                  <td>
                    {perfData?.rentChngYn === 'Y' ? '렌트 ' : ''}
                    {perfData?.leaseChngYn === 'Y' ? '리스 ' : ''}
                    {perfData?.commercialChngYn === 'Y' ? '영업용' : ''}
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>{perfData?.clrType === 1 ? '무채색' : '유채색'}</td>
                  <td>
                    {perfData?.fullPaintYn === 'Y' ? '전체도색 ' : ''}
                    {perfData?.clrChngYn === 'Y' ? '색상변경' : ''}
                  </td>
                </tr>
                <tr>
                  <th>주요옵션</th>
                  <td>{perfData?.optEtcYn === 'Y' || perfData?.optSunroofYn === 'Y' || perfData?.optNavigationYn === 'Y' ? '있음' : '없음'}</td>
                  <td>
                    {perfData?.optEtcYn === 'Y' ? '기타 ' : ''}
                    {perfData?.optSunroofYn === 'Y' ? '선루프 ' : ''}
                    {perfData?.optNavigationYn === 'Y' ? '네비게이션' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ) : (
          <div className="accident-history-cont">
            <table summary="주행거리 및 계기상태" className="table-tp1">
              <caption className="away">주행거리 및 계기상태</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    주행거리 및 계기상태
                  </th>
                </tr>
                <tr>
                  <th>계기상태</th>
                  <td>{numberToStt(perfData?.drvdistInsbrd, 'drv')}</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>{numberToStt(perfData?.drvDistStt, 'drv2')}</td>
                </tr>
                <tr>
                  <th>현재주행거리</th>
                  <td>{isNaN(perfData?.prsnDrvDist) || Number(perfData?.prsnDrvDist) === 0 ? 'N/A' : `${nf.format(perfData?.prsnDrvDist || 0)}km`}</td>
                </tr>
              </tbody>
            </table>
            <table summary="차대번호 표기" className="table-tp1">
              <caption className="away">차대번호 표기</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    차대번호 표기
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToStt(perfData?.vinSttCd, 'vin')}</td>
                </tr>
              </tbody>
            </table>
            <table summary="배출가스" className="table-tp1">
              <caption className="away">배출가스</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    배출가스
                  </th>
                </tr>
                <tr>
                  <th>일산화탄소(CO)</th>
                  <td>{perfData?.ehstGas1 ? `${nf.format(perfData?.ehstGas1)}%` : 'N/A'}</td>
                </tr>
                <tr>
                  <th>탄화수소(HC)</th>
                  <td>{perfData?.ehstGas2 ? `${nf.format(perfData?.ehstGas2)}ppm` : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
            <table summary="튜닝" className="table-tp1">
              <caption className="away">튜닝</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    튜닝
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{perfData?.strcChngYn === 'Y' || perfData?.deviceChngYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th rowSpan="2">항목</th>
                  <td>{perfData?.illglStrcChng === 1 ? '적법' : '불법'}</td>
                </tr>
                <tr>
                  <td>
                    {perfData?.strcChngYn === 'Y' ? '구조 ' : ''}
                    {perfData?.deviceChngYn === 'Y' ? '장치' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="특별이력" className="table-tp1">
              <caption className="away">특별이력</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    특별이력
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{perfData?.fludYn === 'Y' || perfData?.acdtYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th>항목</th>
                  <td>
                    {perfData?.fludYn === 'Y' ? '침수' : ''}
                    {perfData?.acdtYn === 'Y' ? '화재' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="용도변경" className="table-tp1">
              <caption className="away">용도변경</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    용도변경
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{perfData?.rentChngYn === 'Y' || perfData?.leaseChngYn === 'Y' || perfData?.commercialChngYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th>항목</th>
                  <td>
                    {perfData?.rentChngYn === 'Y' ? '렌트 ' : ''}
                    {perfData?.leaseChngYn === 'Y' ? '리스 ' : ''}
                    {perfData?.commercialChngYn === 'Y' ? '영업용' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="색상" className="table-tp1">
              <caption className="away">색상</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    색상
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{perfData?.clrType === 1 ? '무채색' : '유채색'}</td>
                </tr>
                <tr>
                  <th>항목</th>
                  <td>
                    {perfData?.fullPaintYn === 'Y' ? '전체도색 ' : ''}
                    {perfData?.clrChngYn === 'Y' ? '색상변경' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="주요옵션" className="table-tp1">
              <caption className="away">주요옵션</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2" className="tx-c">
                    주요옵션
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{perfData?.optEtcYn === 'Y' || perfData?.optSunroofYn === 'Y' || perfData?.optNavigationYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th>항목</th>
                  <td>
                    {perfData?.optEtcYn === 'Y' ? '기타 ' : ''}
                    {perfData?.optSunroofYn === 'Y' ? '선루프 ' : ''}
                    {perfData?.optNavigationYn === 'Y' ? '네비게이션' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
});

CarStatus.propTypes = {
  mode: PropTypes.string,
  perfData: PropTypes.object,
  onChange: PropTypes.bool,
  onInputChangeValues: PropTypes.string
};

CarStatus.displayName = 'CarStatus';
export default CarStatus;