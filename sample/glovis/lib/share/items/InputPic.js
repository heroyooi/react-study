import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/*
html 변경이력
03.13 : [모바일] 사진삭제 기능 추가, #a1 부분 참고
*/
const InputPic = ({ title, applyImg, disabled = false }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const [image, setImage] = useState(applyImg !== undefined ? [applyImg] : []);
  const [fdatas, setFdatas] = useState([]);

  const inputFileUpload = useCallback((e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.search(/image/) < 0) {
        alert("이미지만 등록 가능합니다.");
        return false;
      }
    }
    fileMerge(files);
  }, []);

  // #a1 Start
  const fileDelete = useCallback(() => {
    setImage([]);
    setFdatas([]);
  }, []);
  // #a1 End

  const fileMerge = useCallback((fileData) => {
    let temp_i = [];
    let temp_f = [];
    for (let i = 0; i < fileData.length; i++) {
      temp_f.push(fileData[i]);
      temp_i.push(URL.createObjectURL(fileData[i]));
    }
    setImage(temp_i);
    setFdatas(temp_f);
  }, []);
  return (
    <>
      <div
        className="img-item"
        style={{
          background: image.length > 0
            ? `center / cover no-repeat url(${image[0]})` : null
        }}
      ></div>
      {title && <span>{title}</span>}
      {
        disabled === false
          ? image.length > 0
            ? (
              <div className="img-dim">
                {/* #a1 Start */}
                {!hasMobile && <a href="#">사진 변경하기</a>}
                <input type="file" accept="image/*" onChange={inputFileUpload} />
                {hasMobile && <i className="ico-app-close" onClick={fileDelete}></i>}
                {/* #a1 End */}
              </div>
            ) : (
              <div className="img-hover">
                <a href="#">사진 등록하기</a>
                <input type="file" accept="image/*" onChange={inputFileUpload} />
              </div>
            )
          : null
      }
    </>
  )
}

InputPic.propTypes = {
  title: PropTypes.string,
  applyImg: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputPic;