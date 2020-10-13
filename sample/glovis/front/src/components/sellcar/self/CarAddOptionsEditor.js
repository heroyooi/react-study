import { useState, memo, useMemo, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import { getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, pushObjectAction, removeObjectByKeyAction } from '@src/actions/sellcar/sellCarAction';
/**
 * @module CarAddOptionsEditor
 * @desc 차량 정보 입력 components
 * @author 최승희
 * @param {Object} props - props object
 * @param {Array} props.items - 입력받을 차량 옵션 data
 * @param {function} props.onInput - input 이벤트
 * @param {string} props.addOptCntn - 직접입력 textarea칸에 받을 data
 * @param {boolean} props.isEditing - 편집모드 on/off
 * @param {function} props.onCheck - check 이벤트
 */


const CarAddOptionsEditor = ({ items, item, isEditing, className, popup = false, onCheck, onInput }) => {
  const dispatch = useDispatch();
  const isExist = (optCd) => (items?.find((option) => option.optCd == optCd) ? true : false);

  const _onInput = (e) => {
    let { name, value } = e.target;
    const numberTypeColumns = ['crRlsPrc','drvDist', 'dspl'];
    if( numberTypeColumns.some( n => n === name ) ){
      value = parseInt(value);
    }    
    dispatch(
      inputPropAction({
        state: 'car',
        prop: name,
        value
      })
    );
  };

  const _onCheck = (e, value) => {
    const newValue = {
      optCd: value.optCd
    };

    const isExist = items.find((option) => option.optCd === value.optCd);

    isExist
      ? dispatch(
          removeObjectByKeyAction({
            state: 'car',
            prop: 'optionList',
            key: 'optCd',
            value: value.optCd
          })
        )
      : dispatch(
          pushObjectAction({
            state: 'car',
            prop: 'optionList',
            key: 'optCd',
            value: newValue
          })
        );
  };


  const check = (e, option) => {
    const { optCd } = option;
    if(onCheck){
      onCheck(e, { optCd });
    }else{
      _onCheck(e, { optCd });
    }
  };

  return (
    <div className={`option-add mt64 ${className}`}>
      <h4 className="mb33">추가 옵션</h4>
      <div className="car-option-add">
        <ul>
          {carAddOptions.map((option, i) => (
            <li className={classNames({ on: isExist(option.optCd) })} key={i}>
              <CheckBox
                id={`chk-${i}-${option.optCd}`}
                checked={isExist(option.optCd)}
                onChange={(e) => check(e, option)}
                name={option.optCd}
                isSelf={false}
                title={option.optNm}
                disabled={!isEditing}
              />
            </li>
          ))}
        </ul>
        <label htmlFor="direct-input">직접입력</label>
        <Input
          type="text"
          placeHolder="표시되지 않은 추가 옵션, 패키지 옵션은 직접 입력해주세요."
          id="direct-input"
          width="100%"
          height={48}
          disabled={!isEditing}
          value={item?.addOptCntn || ''}
          onBlur={e=>{
            if(onInput){
              onInput(e);
            }else{
              _onInput(e);
            }
          }}
          name="addOptCntn"
        />
      </div>
    </div>
  );
};

export default CarAddOptionsEditor;



export const carAddOptions = [
  {
      "optCd": "052700",
      "optNm": "스티어링휠 리모컨",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "052600",
      "optNm": "자동주차보조시스템",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "063364",
      "optNm": "USB",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "063363",
      "optNm": "AUX",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "052061",
      "optNm": "공기청정기",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "063362",
      "optNm": "블루투스",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  },
  {
      "optCd": "052059",
      "optNm": "오토에어컨",
      "desc": "스마트키를 몸에 지니는 것만으로도<br />도어 잠금장치를 해제할 수 있거나 버튼을 눌러<br />시동을 껄 수 있는 편의 장치입니다.",
      "imgUrl": "/images/contents/car-option-img-01.png"
  }
]