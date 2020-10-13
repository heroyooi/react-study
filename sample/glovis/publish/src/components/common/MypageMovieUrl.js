import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import RadioGroup from '@lib/share/items/RadioGroup'
import Input from '@lib/share/items/Input'
import Radio from '@lib/share/items/Radio';

const MypageMovieUrl = () => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [activeMovie, setActiveMovie] = useState(false);
  const handleChange = (e) => setActiveMovie(+e.target.value === 1 ? false : true);
  if(hasMobile) {

    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    return (
      <fieldset>
        <legend className="away">동영상</legend>
        <div className="register-movie">
          <h4>노출유형</h4>
          <ul className="radio-block small">
            <li><Radio className="txt" id="movie1" label="없음" value={1} checked={isValue1} onChange={handleChange1} /></li>
            <li><Radio className="txt" id="movie2" label="있음" value={2} checked={isValue1} onChange={handleChange1} /></li>
          </ul>
        </div>
        <div className="movie-link-wrap">
          <p className="input-name">Link (URL)</p> 
          <Input type="text" id="movie3" width='68%' height={40} />
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
          <RadioGroup dataList={[
            {id:'movie1', value:1, checked:true, disabled:false, title:'없음'},
            {id:'movie2', value:2, checked:false, disabled:false, title:'있음'}
          ]} mode="vertical" onChange={handleChange} />
        </div>
        {
          activeMovie && (
            <div className="movie-link-wrap">
              <p className="input-name">동영상주소(URL)</p> 
              <Input type="text" id="movie3" width='100%' height={48} />
              <p className="tx-exp-tp5">* 차량상세 > 차량정보 상단에 노출됩니다.</p>
            </div>
          )
        }
        
      </div>
    </fieldset>
  )
}

export default MypageMovieUrl;

