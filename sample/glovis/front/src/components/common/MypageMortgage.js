import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button'
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup'
import MobSelectBox from '@lib/share/items/MobSelectBox';
import SelectBox from '@lib/share/items/SelectBox'
import { select1_list } from '@src/dummy'
import { mobile_select_area } from '@src/dummy';

/*
  html 변경이력
  03.12 : 자동차등록원부 열람하기 버튼에 target 추가
 
*/


const MypageMortgage = () =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [activeMortgage, setActiveMortgage] = useState(false);
  const handleChange = (e) => setActiveMortgage(+e.target.value === 1 ? false : true);
  if(hasMobile) {

    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    return (
      <fieldset>
        <legend className="away">압류/저당 입력</legend>
        <div className="mortgage">
          <p className="tx-exp-tp5 tx-gray">&#8251; 판매차량의 자동차등록원부에 기재되어 있는 압류/저당 정보를 입력해 주세요.</p>
          <Button className="t-underline" size="sml" title="자동차등록원부 열람하기" target="_blank" href="https://www.minwon.go.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A12005009&CappBizCD=15000000334" width={145} fontSize={12} />
          <div className="mortgage-state">
            <h4>압류/저당 여부</h4>
            <ul className="radio-block small">
              <li><Radio className="txt" id="mortgage1" label="없음" value={1} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="mortgage2" label="있음" value={2} checked={isValue1} onChange={handleChange1} /></li>
            </ul>
          </div>
          <MobSelectBox options={mobile_select_area} disabled={true} />
        </div>
      </fieldset>
    )
  }
  return(
    <fieldset>
      <legend className="away">압류/저당 입력</legend>
      <div className="mortgage">
        <h4>압류/저당 입력</h4>
        <div className="mortgage-state">
          <RadioGroup dataList={[
            {id:'mortgage1', value:1, checked:true, disabled:false, title:'없음'},
            {id:'mortgage2', value:2, checked:false, disabled:false, title:'있음'}
          ]} mode="vertical" onChange={handleChange} />
        </div>
        {
          activeMortgage && (
            <>
              <SelectBox id="mortgage3" className="items-sbox" options={select1_list} width={121} height={40} />
              <div className="align-wrap mt20">
                <p>판매차량의 자동차등록원부에 기재되어 있는 압류/저당 정보를 입력해 주세요.</p>
                <Button size="big" background="blue80" title="자동차등록원부 열람하기" target="_blank" href="https://www.minwon.go.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A12005009&CappBizCD=15000000334" width={256} />
              </div>
            </>
          )
        }
      </div>
    </fieldset>
  )
}

export default MypageMortgage;

