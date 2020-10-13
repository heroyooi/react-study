/**
 * 설명 : onchange함수 추가
 * @param {Type} 
 * @returns [{type}] [description] files[0] 항목 넘겨줌
 * 
 * 200328 김상진 통합완료 InputPicture.js
 *  onChange, initImg 기능 통합
 */
import { useState, useCallback } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const InputPicture = ({buttonW=70, buttonH=40, thumbW=70, thumbH=70, margin=8, onChange, initImg}) => {

  console.log(initImg);
  const [imgs, setImgs] = useState([]);
  const [fdatas, setFdatas] = useState([]);

  const inputFileUpload = useCallback((e) => {
    const files = e.target.files;
    for (let i=0; i<files.length; i++) {
      if(files[i].type.search(/image/) < 0) {
        alert("이미지만 등록 가능합니다.");
        return false;
      }
    }
    fileMerge(files);
    //console.log(files[0])
    if(onChange) onChange(files[0]);;
  }, []);

  const fileMerge = useCallback((fileData) => {
    let temp_i = [];
    let temp_f = [];
    for (let i=0; i<fileData.length; i++) {
      temp_f.push(fileData[i]);
      temp_i.push(URL.createObjectURL(fileData[i]));
    }
    setImgs(temp_i);
    setFdatas(temp_f);
  }, []); 

  const handleRemove = useCallback((e) => {
    e.preventDefault();
    setImgs([]);
    setFdatas([]);
  }, []);
  
  const thumbStyle = {
    width: thumbW,
    height: thumbH,
    background:
      imgs.length > 0
        ? `center / cover no-repeat url(${imgs[0]}) #f6f7f8`
        : `#f6f7f8`
  }

  const initthumbStyle = {
    width: thumbW,
    height: thumbH,
    background:
      `center / cover no-repeat url(${initImg}) #f6f7f8`
  }

  return (
    <>
      <span className="file-img-wrap">
        <span className="thumb" style={imgs.length > 0 ?thumbStyle : initthumbStyle} ></span>
        {
          imgs.length === 0
          ? <span className="file-btn-wrap" style={{marginTop: `${margin}px`}} >
              <Button size="big" background="blue80" title="찾아보기" width={buttonW} size="sml" />
              <input type="file" accept="image/*" onChange={inputFileUpload} />
            </span>
          : <>
            <span className="file-btn-wrap" style={{marginTop: `${margin}px`}}>
              <Button background="blue80" title="수정" width={buttonW/2-4} marginRight={margin} size="sml" />
              <input type="file" accept="image/*" onChange={inputFileUpload} />
            </span>
            <Button background="blue80" title="삭제" width={buttonW/2-4} size="sml" onClick={handleRemove} />
          </>
        }
      </span>
   </>
  )
}

InputPicture.propTypes = {
  buttonW: PropTypes.number,
  buttonH: PropTypes.number,
  margin: PropTypes.number,
  initImg : PropTypes.String
}

export default InputPicture;