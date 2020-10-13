import { useState, useEffect } from 'react'

import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox'
import RadioGroup from '@src/components/common/car/carRadioGroups'
import CheckBox from '@lib/share/items/CheckBox'
import { setComma, removeComma } from '@src/utils/StringUtil'

import { getCommonCodeAsync } from '@src/utils/DataUtils'

const DealerCarTotalStatus = ({item={}, onChange, onChangeValues}) => {
  const {
    drvdistInsbrdStt,
    drvDistStt,
    illglStrcChng,
    acdtYn,
    fludYn,
    ehstGas1,
    ehstGas2,
    strcChngYn,
    deviceChngYn,
    rentChngYn,
    leaseChngYn,
    commercialChngYn,
    clrType,
    fullPaintYn,
    clrChngYn,
    optEtcYn,
    optSunroofYn,
    optNavigationYn,
    vinSttCd,
    prsnDrvDist,
  } = item

  useEffect(()=>{
    getCommonCodeAsync('AM110').then(setCrNoSttOptions)
  },[])

  useEffect(()=>{
    setCommaDrvDist(setComma(prsnDrvDist))
    setCommaGas1(setComma(ehstGas1))
    setCommaGas2(setComma(ehstGas2))
  }, [ prsnDrvDist, ehstGas1, ehstGas2 ])

  const [ commaDrvDist, setCommaDrvDist] = useState(setComma(prsnDrvDist))
  const [ commaGas1, setCommaGas1] = useState(setComma(ehstGas1))
  const [ commaGas2, setCommaGas2] = useState(setComma(ehstGas2))
  const [ vinSttOptions, setCrNoSttOptions] = useState([])

  const setEditingWith = () => {
    return {
      ehstGas1 : ehstGas1 !== 0,
      ehstGas2 : ehstGas2 !== 0,
      ill : !!illglStrcChng || [ strcChngYn, deviceChngYn ].some(item => item === 'Y'),
      special : [ acdtYn, fludYn ].some(item => item === 'Y'),
      commercial : [ rentChngYn, leaseChngYn, commercialChngYn ].some(item => item === 'Y'),
      option : [ optEtcYn, optSunroofYn, optNavigationYn ].some(item => item === 'Y'),
    }
  }

  const [ editing, setEditing ] = useState(setEditingWith)

  // useEffect(() => {
  //   setEditing(setEditingWith)
  // },[ item ])
  
  const inputCommaNumber = e => {
    const { value, name } = e.target
    const pureNumber = removeComma(value)//parseInt(value.replace(/\,/gi,""))
    const commaNumber = setComma(pureNumber)

    onChange({
      ...e,
      target : {
        ...e.target,
        name,
        value : pureNumber || 0
      }
    })

    switch(name){
      case 'prsnDrvDist' :
        setCommaDrvDist(commaNumber)
        break;
      case 'ehstGas1' :
        setCommaGas1(commaNumber)
        break;
      case 'ehstGas2' :
        setCommaGas2(commaNumber)
        break;
    }
  }

  const checkEdit = e => {
    const { name, checked } = e.target
    
    setEditing({
      ...editing,
      [name] : checked,
    })

    switch(name){
      case 'ehstGas1' :
        if(!checked) setCommaGas1(0)
        break;
      case 'ehstGas2' :
        if(!checked) setCommaGas2(0)
        break;
    }

    onChange({
      ...e,
      target : {
        ...e.target,
        name,
        value : 0,
      }
    })
  }

  const checkEditRadio = e => {
    const { name, value, checked } = e.target
    const newValue = value === 'true'
    const names = []

    console.log('newValue : ', newValue)
    
    setEditing({
      ...editing,
      [name] : newValue,
    })

    switch(name){
      case 'ill' :
        if(!newValue){
          names.push(
            {name: 'illglStrcChng', value:null},
            {name: 'strcChngYn', value:'N'},
            {name: 'deviceChngYn', value:'N'},
          )
        }
        break;
      case 'special' :
        if(!newValue){
          names.push(
            {name : 'fludYn', value : 'N',},
            {name : 'acdtYn', value : 'N',},
          )
        }
        break;
      case 'commercial' :
        if(!newValue){
          names.push(
            {name : 'rentChngYn', value : 'N',},
            {name : 'leaseChngYn', value : 'N',},
            {name : 'commercialChngYn', value : 'N',},
          )
        }
        break;
      case 'option' :
        if(!newValue){
          names.push(
            {name : 'optEtcYn', value : 'N',},
            {name : 'optSunroofYn', value : 'N',},
            {name : 'optNavigationYn', value : 'N',},
          )
        }
        break;
    }

    if(!newValue){
      onChangeValues(names)
    }
  }

  const onCheck = e => {
    const { name, checked } = e.target

    onChange({
      target : {
        name,
        value : checked ? 'Y' : 'N',
      }
    })
  }

  const onSelect = (data,e) => {
    const { value } = data
    const { name } = e

    onChange({
      target : {
        name, value
      }
    })
  }

  const parseIntValue = (e) => {
    const { target, target:{name,value} } = e

    onChange({
      ...e,
      target : {
        ...target,
        name,
        value : parseInt(value)
      }
    })
  }

  return (
    <fieldset>
      <legend className="away">자동차 종합상태</legend>
      <table summary="자동차 종합상태에 대한 내용" className="table-tp1 input fs14 th-c">
        <caption>자동차 종합상태</caption>
        <colgroup>
          <col width="14%" />
          <col width="24%" />
          <col width="32%" />
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
                vertical={false}
                name="drvdistInsbrdStt"
                selectedValue={drvdistInsbrdStt}
                onChange={parseIntValue}
                options={[
                  {value: 1, label: '양호' },
                  {value: 2, label: '불량' }
                ]}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <th>주행거리 상태</th>
            <td>
              <RadioGroup
                vertical={false}
                name="drvDistStt"
                selectedValue={drvDistStt}
                onChange={parseIntValue}
                // disabled={true}
                options={[
                  {value: 1, label: '많음' },
                  {value: 2, label: '보통' },
                  {value: 3, label: '적음' },
                ]}
              />
            </td>
            <td>
              <em className="mr8">현재 주행거리</em>
              <Input
                type="text"
                id="note3"
                width={122}
                height={40}
                name="prsnDrvDist"
                value={commaDrvDist}
                onChange={inputCommaNumber}
              />
              <em>km</em>
            </td>
          </tr>
          <tr>
            <th>차대번호 표기</th>
            <td>
              <SelectBox
                id="vin-number2"
                className="items-sbox"
                options={vinSttOptions}
                onChange={onSelect}
                name="vinSttCd"
                valueBy="value"
                value={vinSttCd}
                placeHolder="선택하세요"
                width={160}
                height={40}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <th>배출가스</th>
            <td className="chk-y-wrap">
              <CheckBox
                id='chk-gas-co1'
                title='일산화탄소'
                name="ehstGas1"
                onChange={checkEdit}
                checked={editing.ehstGas1}
              />
              <CheckBox
                id='chk-gas-hc1'
                title='탄화수소'
                name="ehstGas2"
                onChange={checkEdit}
                checked={editing.ehstGas2}
              />
            </td>
            <td>
              <span className="bridge2 gas">
                <span>일산화탄소(CO)</span>
                <Input
                  type="text"
                  id="gas-co2"
                  width={122}
                  height={40}
                  name="ehstGas1"
                  value={commaGas1}
                  disabled={!editing.ehstGas1}
                  onChange={inputCommaNumber}
                />
                <em>%</em>
              </span>
              <span className="bridge2 gas">
                <span>탄화수소(HC)</span>
                <Input
                  type="text"
                  id="gas-hc2"
                  width={122}
                  height={40}
                  name="ehstGas2"
                  value={commaGas2}
                  disabled={!editing.ehstGas2}
                  onChange={inputCommaNumber}
                />
                <em>ppm</em>
              </span>
            </td>
          </tr>
          <tr>
            <th rowSpan="2">튜닝</th>
            <td rowSpan="2">
              <RadioGroup
                vertical={false}
                name="ill"
                selectedValue={editing.ill}
                onChange={checkEditRadio}
                options={[
                  {value: false, label: '없음' },
                  {value: true, label: '있음' },
                ]}
              />
            </td>
            <td className="chk-w-wrap">
              <RadioGroup
                vertical={false}
                name="illglStrcChng"
                selectedValue={illglStrcChng}
                onChange={parseIntValue}
                disabled={!editing.ill}
                options={[
                  {value: 1, label: '적법' },
                  {value: 2, label: '불법' },
                ]}
              />
            </td>
          </tr>
          <tr>
            <td className="chk-w-wrap">
              <CheckBox
                id='chk-structure'
                title='구조'
                name="strcChngYn"
                checked={strcChngYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.ill || !illglStrcChng}
              />
              <CheckBox
                id='chk-device'
                title='장치'
                name="deviceChngYn"
                checked={deviceChngYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.ill || !illglStrcChng}
              />
            </td>
          </tr>
          <tr>
            <th>특별이력</th>
            <td>
              {editing?.special}
              <RadioGroup
                vertical={false}
                name="special"
                selectedValue={editing?.special}
                onChange={checkEditRadio}
                options={[
                  {value: false, label: '없음' },
                  {value: true, label: '있음' },
                ]}
              />
            </td>
            <td className="chk-w-wrap">
              <CheckBox
                id='chk-waterlogging'
                title='침수'
                name="fludYn"
                checked={fludYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.special}
              />
              <CheckBox
                id='chk-fire'
                title='화재'
                name="acdtYn"
                checked={acdtYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.special}
              />
            </td>
          </tr>
          <tr>
            <th>용도변경</th>
            <td>
              <RadioGroup
                vertical={false}
                name="commercial"
                selectedValue={editing.commercial}
                onChange={checkEditRadio}
                options={[
                  {value: false, label: '없음' },
                  {value: true, label: '있음' },
                ]}
              />
            </td>
            <td className="chk-w-wrap">
              <CheckBox
                id='chk-rent'
                title='렌트'
                name="rentChngYn"
                checked={rentChngYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.commercial}
              />
              <CheckBox
                id='chk-lease'
                title='리스'
                name="leaseChngYn"
                checked={leaseChngYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.commercial}
              />
              <CheckBox
                id='chk-business'
                title='영업용'
                name="commercialChngYn"
                checked={commercialChngYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.commercial}
              />
            </td>
          </tr>
          <tr>
            <th>색상</th>
            <td>
              <RadioGroup
                vertical={false}
                name="clrType"
                selectedValue={clrType}
                onChange={parseIntValue}
                options={[
                  {value: 1, label: '무채색' },
                  {value: 2, label: '유채색' },
                ]}
              />
            </td>
            <td className="chk-w-wrap">
              <CheckBox
                id='chk-color1'
                title='전체도색'
                name="fullPaintYn"
                checked={fullPaintYn === 'Y'}
                onChange={onCheck}
              />
              <CheckBox
                id='chk-color2'
                title='색상변경'
                name="clrChngYn"
                checked={clrChngYn === 'Y'}
                onChange={onCheck}
              />
            </td>
          </tr>
          <tr>
            <th>주요옵션</th>
            <td>
              <RadioGroup
                vertical={false}
                name="option"
                selectedValue={editing.option}
                onChange={checkEditRadio}
                options={[
                  {value: false, label: '없음' },
                  {value: true, label: '있음' },
                ]}
              />
            </td>
            <td className="chk-w-wrap">
              <CheckBox
                id='chk-option-other'
                title='기타'
                name="optEtcYn"
                checked={optEtcYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.option}
              />
              <CheckBox
                id='chk-option-sunroof'
                title='선루프'
                name="optSunroofYn"
                checked={optSunroofYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.option}
              />
              <CheckBox
                id='chk-option-nav'
                title='네비게이션'
                name="optNavigationYn"
                checked={optNavigationYn === 'Y'}
                onChange={onCheck}
                disabled={!editing.option}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  )
}

export default DealerCarTotalStatus