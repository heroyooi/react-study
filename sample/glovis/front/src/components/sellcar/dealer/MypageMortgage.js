import Button from '@lib/share/items/Button'
import RadioGroup from '@lib/share/items/RadioGroup'
import SelectBox from '@lib/share/items/SelectBox'
import React, { useState, useCallback } from 'react';
import { select1_list } from '@src/dummy'
import Router from 'next/router'
import {useEffect} from "react";

const MypageMortgage = ({userData, onInput}) =>{

  const [options , setOptions] = useState([]);
  const [isSelect, setIsSelect] = useState(true);

  useEffect(()=>{
    let optionList =[];
    for(let i =0; i<=50 ; i++) {
      if (i == 0) {
        optionList.push({ value: 0, label: `없음` });
      } else {
        optionList.push({ value: i, label: `${i}회` });
      }
    }
    setOptions(optionList);
  },[]);

  const onChangeRadioGroup =(e) =>{
    if(e.target.value == 1) {
      onInput({target:{value: 0}}, 'mortgage');
      setIsSelect(true);
    }else{
      setIsSelect(false);
    }
    onInput({target:{value:e.target.value}}, 'mortgageOption')
  }

  const onMortgageChange=  (data, event)  =>{
    onInput({target:{...data,...event}}, 'mortgage')
  }



  return(
    <div className="mortgage">
      <h4>압류/저당 입력</h4>
      <div className="mortgage-state">
        <RadioGroup
          dataList={[
            {id:'mortgage1', value:1, checked:true, disabled:false, title:'없음'},
            {id:'mortgage2', value:2, checked:false, disabled:false, title:'있음'}
          ]}
          onChange ={onChangeRadioGroup}
          mode="vertical"
        />
        <SelectBox id="mortgage3"
                   className="items-sbox"
                   options={options}
                   disabled ={isSelect}
                   placeHolder ='없음'
                   value ={ typeof userData ==='undefined' ? null :  userData.mortgage}
                   onChange={onMortgageChange}
                   width={240}
                   height={40} />
      </div>
      <div className="align-wrap mt20">
        <p>판매차량의 자동차등록원부에 기재되어 있는 압류/저당 정보를 입력해 주세요.</p>
        <Button size="big"
                background="blue80"
                title="자동차등록원부
                      열람하기"
                href="https://www.minwon.go.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A12005009&CappBizCD=15000000334" w
                idth={256} />
      </div>
    </div>
  )
}

export default MypageMortgage;

