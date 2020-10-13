import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Radio from '@lib/share/items/Radio';
import Button from '@lib/share/items/Button';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { mobile_select_area } from '@src/dummy';
import Input from '@lib/share/items/Input';

const MypageSeizure = ({ value = '', onChange }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [szrMorYn, setSzrMorYn] = useState(value === '' || value === 0 ? 'N' : 'Y');

  useEffect(() => {
    setSzrMorYn(value === 0 || value === '' ? 'N' : 'Y');
  }, [value]);

  const checkSzr = (e) => {
    const { value } = e.target;
    if (value === 'N') {
      onChange({
        target: {
          value: 0,   // Y or N
          name: 'szrMorCnt'
        }
      });
    }
    setSzrMorYn(value);
  };

  const onChangeValue = (e) => {
    const { value } = e.target;
    onChange({
      target: {
        value: parseInt(value),
        name: 'szrMorCnt'
      }
    });
  };

  // useEffect(() => {
  //   setSzrMorYn(value ? 'Y' : 'N')
  // }, [ value ])

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  if (hasMobile) {
    return (
      <fieldset>
        <legend className="away">압류/저당 입력</legend>
        <div className="mortgage">
          <p className="tx-exp-tp5 tx-gray mt0">&#8251; 판매차량의 자동차등록원부에 기재되어 있는 압류/저당 정보를 입력해 주세요.</p>
          <Button className="t-underline" size="sml" title="자동차등록원부 열람하기" target="_blank" href="https://www.minwon.go.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A12005009&CappBizCD=15000000334" width={145} fontSize={12} />
          <div className="mortgage-state mb8">
            <h4>압류/저당 여부</h4>
            <ul className="radio-block small">
              <li><Radio className="txt" id="szrMorYn-1" value={'N'} checked={szrMorYn} label="없음" onChange={checkSzr} name="szrMorYn" /></li>
              <li><Radio className="txt" id="szrMorYn-2" value={'Y'} checked={szrMorYn} label="있음" onChange={checkSzr} name="szrMorYn" /></li>
            </ul>
          </div>
          <div className="mortgage-input">
            <Input type="number" width='30%' height={40} value={value} name="szrMorCnt" onChange={onChangeValue} disabled={szrMorYn == 'N'} />
            <p className="input-name">건</p>
          </div>
          
          {/* <Input type="text" id="record01" width="15%" onBlur={handleSeperateChange} name="perfInspId" value={seperatedPerfInspId?.[0] ?? ''} /> */}
        </div>
      </fieldset>
    )
  }
  return (
    <fieldset>
      <legend className="away">압류/저당 입력</legend>
      <div className="mortgage">
        <h4>압류/저당 입력</h4>
        <div className="mortgage-state">
          <div className="radio-group">
            <ul className="vertical">
              <li>
                <Radio id="szrMorYn-1" value={'N'} checked={szrMorYn} title="없음" size="large" onChange={checkSzr} name="szrMorYn" />
              </li>
              <li>
                <Radio id="szrMorYn-2" value={'Y'} checked={szrMorYn} title="있음" size="large" onChange={checkSzr} name="szrMorYn" />
              </li>
            </ul>
          </div>
          <div className="items-sbox css-2b097c-container">
            <span className="input-base type-1">
              <input type="number" value={value} name="szrMorCnt" onChange={onChangeValue} disabled={szrMorYn == 'N'} style={{ width: '126px', height: '40px' }} /> 건
            </span>
          </div>
        </div>
        <div className="align-wrap mt20">
          <p>판매차량의 자동차등록원부에 기재되어 있는 압류/저당 정보를 입력해 주세요.</p>
          <Button
            size="big"
            background="blue80"
            title="자동차등록원부 열람하기"
            href="https://www.minwon.go.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A12005009&CappBizCD=15000000334"
            width={256}
            target="_blank"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default MypageSeizure;