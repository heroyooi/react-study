import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';

const MypageCarMovie = ({ value = '', onChange }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [crMvUrlYn, setCrMvUrlYn] = useState('');

  useEffect(() => {
    setCrMvUrlYn(value === null || value === '' ? 'N' : 'Y');
  }, [value]);

  const checkCrMvUrl = (e) => {
    const { value } = e.target;
    if (value === 'N') {
      onChange({
        target: {
          value: '',
          name: 'crMvUrl'
        }
      });
    }
    setCrMvUrlYn(value);
  };

  // useEffect(() => {
  //   setCrMvUrlYn(value ? 'Y' : 'N')
  // },[ value ])

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  if(hasMobile) {
    return (
      <fieldset>
        <legend className="away">동영상</legend>
        <div className="register-movie">
          <h4>노출유형</h4>
          <ul className="radio-block small">
            <li><Radio className="txt" id="crMvUrlYn-1" value={'N'} checked={crMvUrlYn} label="없음" size="large" onChange={checkCrMvUrl} name="crMvUrlYn" /></li>
            <li><Radio className="txt" id="crMvUrlYn-2" value={'Y'} checked={crMvUrlYn} label="있음" size="large" onChange={checkCrMvUrl} name="crMvUrlYn" /></li>
          </ul>
        </div>
        <div className="movie-link-wrap">
          <p className="input-name">Link (URL)</p> 
          <Input type="text" id="movie3" width='68%' height={40} value={value ?? ''} onChange={onChange} disabled={crMvUrlYn === 'N'} name="crMvUrl" />
        </div>
        <p className="tx-exp-tp5">&#8251; 차량상세 > 차량정보 상단에 노출됩니다.</p>
      </fieldset>
      )
  }
  return (
    <fieldset>
      <legend className="away">동영상</legend>
      <div className="register-movie">
        <h4>동영상</h4>
        <div className="movie-state">
          <div className="radio-group">
            <ul className="vertical">
              <li>
                <Radio id="crMvUrlYn-1" value={'N'} checked={crMvUrlYn} title="없음" size="large" onChange={checkCrMvUrl} name="crMvUrlYn" />
              </li>
              <li>
                <Radio id="crMvUrlYn-2" value={'Y'} checked={crMvUrlYn} title="있음" size="large" onChange={checkCrMvUrl} name="crMvUrlYn" />
              </li>
            </ul>
          </div>
        </div>
        <div className="movie-link-wrap">
          <p className="input-name">동영상주소(URL)</p>
          <Input type="text" id="movie3" width="100%" height={48} value={value ?? ''} onChange={onChange} disabled={crMvUrlYn === 'N'} name="crMvUrl" />
          <p className="tx-exp-tp5">* 차량상세 > 차량정보 상단에 노출됩니다.</p>
        </div>
      </div>
    </fieldset>
  );
};

export default MypageCarMovie;