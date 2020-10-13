import { useState, useEffect } from 'react';
import moment from 'moment';

import Input from '@lib/share/items/Input'
import CheckBox from '@lib/share/items/CheckBox'
import SelectBox from '@lib/share/items/SelectBox'

const today = new Date();
const yearOption = [];
for (let start = 2015, end = 2030; start <= end; start++) {
  yearOption.push({
    value: start.toString(),
    label: `${start}년`
  });
}

const monthOption = [];
for (let start = 1, end = 12; start <= end; start++) {
  monthOption.push({
    value: start.toString().padStart(2, '0'),
    label: `${start}월`
  });
}

let dayOption = [];
const setDay = (year, month) => {
  const newDayOption = [];
  const end = new Date(year, month, 0).getDate();

  for (let start = 1; start <= end; start++) {
    newDayOption.push({
      value: start.toString().padStart(2, '0'),
      label: `${start}일`
    });
  }
  dayOption = newDayOption;
};

const DealerCarSignature = ({mode = "apply", onChange, signData, target, isAllow = false, isEditing = true }) => {

  const [isMode, setIsMode] = useState(mode); // apply, viewer
  // const onCheckChange = (e) => {
  //   const n = e.target.name;
  //   const c = e.target.checked;
  //   onChange(c, target, n);
  // };

  const [perfInsertDate, setPerfInsertDate] = useState(() => {
    const date = (signData?.perfInsDt || moment(today).format('YYYYMMDD'))

    console.log("CarSignature -> signData?.perfInsDt ", signData?.perfInsDt )
    console.log("CarSignature -> today ", today )


    const YYYY = date.substring(0,4)
    const MM = date.substring(4,6)
    const DD = date.substring(6,8)

    setDay(YYYY, MM);
    return {
      signYear: YYYY,
      signMonth: MM,
      signDay: DD
    };
  });

  const onChangeDate = (option, target) => {
    const { value } = option;
    const { name } = target;

    if (name !== 'signDay') {
      const newData = {
        ...perfInsertDate,
        signDay: '01',
        [name]: value
      }
      setPerfInsertDate(newData);
      onChange({
        target : {
          name : 'perfInsDt',
          value : newData['signYear'] + newData['signMonth'] + newData['signDay'],
        }
      })
    } else {
      const newData = {
        ...perfInsertDate,
        [name]: value
      }
      setPerfInsertDate(newData);
      onChange({
        target : {
          name : 'perfInsDt',
          value : newData['signYear'] + newData['signMonth'] + newData['signDay'],
        }
      })
    }
  };

  useEffect(() => {
    setDay(perfInsertDate.signYear, perfInsertDate.signMonth);

    const dateText = Object.keys(perfInsertDate).reduce((text, date, i) => {
      if (i !== 0) text += '';
      return (text += perfInsertDate[date]);
    }, '');
    // onChange(dateText, target, 'perfInsDt');
    onChange({
      target : {
        name : 'perfInsDt',
        value : dateText
      }
    });
  }, [perfInsertDate]);

  useEffect(() => {
    setPerfInsertDate(() => {
      const date = (signData?.perfInsDt || moment(today).format('YYYYMMDD'))
      const YYYY = date.substring(0,4)
      const MM = date.substring(4,6)
      const DD = date.substring(6,8)
  
      setDay(YYYY, MM);
      return {
        signYear: YYYY,
        signMonth: MM,
        signDay: DD
      };
    });
  },[ signData ])

  return (
    <>
      {
        isMode === "apply" &&
        <fieldset>
          <div className="signature">
            <h4>서명</h4>
            <div className="management-law-agree">
              <p>
                자동차관리법 제 58조 및 같은 법 시행규칙 제 120조에 따라 ( <CheckBox id="chk-register3" isSelf={false} name="isAllow" checked={isAllow} onChange={onChange} />
                중고자동차성능 상태를 점검 )하였음을 확인합니다.
              </p>
              <SelectBox
                id="vin-number2-1"
                className="items-sbox"
                options={yearOption}
                placeholder="2019년"
                width={160}
                height={40}
                onChange={onChangeDate}
                name="signYear"
                value={perfInsertDate.signYear}
              />
              <SelectBox
                id="vin-number2-2"
                className="items-sbox"
                options={monthOption}
                placeholder="7월"
                width={157}
                height={40}
                onChange={onChangeDate}
                name="signMonth"
                value={perfInsertDate.signMonth}
              />
              <SelectBox id="vin-number2-3" className="items-sbox" options={dayOption} placeholder="25일" width={157} height={40} onChange={onChangeDate} name="signDay" value={perfInsertDate.signDay} />
            </div>
            <div className="management-law-sign">
              <p>
                중고자동차 성능 <i className="ico-dot mid"></i> 상태 점검자 <span style={{color:'red'}}>*</span>
                <Input type="text" id="calculated23" placeholder="오토벨자동차정비" width={334} height={40} onBlur={onChange} name="sttChckr" value={signData?.sttChckr} disabled={!isEditing} />
                (인)
              </p>
              <p>
                중고자동차 성능 <i className="ico-dot mid"></i> 상태 고지자 <span style={{color:'red'}}>*</span>
                <Input type="text" id="calculated24" placeholder="(주)현대오토" width={334} height={40} onBlur={onChange} name="sttNtc" value={signData?.sttNtc} disabled={!isEditing} />
                자동차 매매업소 (인)
              </p>
            </div>
          </div>
        </fieldset>
      }
      {
        isMode === "viewer" &&
        <fieldset>
          <div className="signature viewer">
            <p className="tx-tit">「자동차관리법」제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 <span>중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</span></p>
            <span className="tx-sub">2019년 12월 17일</span>
            <div className="sign">
              <p>중고자동차 성능 · 상태 점검자<span>유대영</span>(인)</p>
              <p>중고자동차 성능 · 상태 고지자<span>명문자동차</span>(인)</p>
            </div>
          </div>
        </fieldset>
      }
    </>

  )
}

export default DealerCarSignature