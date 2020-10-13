import RadioGroup from '@lib/share/items/RadioGroup'
import Input from '@lib/share/items/Input'
import React from 'react';

const MypageMovieUrl = ({data, userData, onInput}) =>{

  const onChangeMovies = (e) => {
    const value = Number(e.target.value);

    onInput({target:{value: value}}, 'videoExist');

    if(value == 1) {
      onInput({target:{value:  ""}}, 'videoUrl');
    }
  }

  const onChangeMovieUrl =(e) =>{
    const value = e.target.value;
    onInput({target:{value:  value}}, 'videoUrl');
  }


  return(
    <div className="register-movie">
      <h4>동영상</h4>
      <div className="movie-state">
        <RadioGroup
          dataList={[
            {id:'movie1', value:1, checked:true, disabled:false, title:'없음'},
            {id:'movie2', value:2, checked:false, disabled:false, title:'있음'}

          ]}
          defaultValue ={ typeof userData ==='undefined' ? 1 :  userData.videoExist}
          onChange={onChangeMovies}
          mode="vertical"
        />

      </div>
      <div className="movie-link-wrap">
        <p className="input-name">동영상주소 (URL)</p>
        <Input type="text" id="movie3" width='100%' height={48} value={ typeof userData ==='undefined' ? '' :  userData.videoUrl} onChange ={onChangeMovieUrl}/>
        <p className="tx-exp-tp5">* 차량상세 > 차량정보 상단에 노출됩니다.</p>
      </div>
    </div>
  )
}

export default MypageMovieUrl;

