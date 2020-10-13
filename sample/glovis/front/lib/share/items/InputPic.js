import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { imgUrl } from '@src/utils/HttpUtils';

/*
html 변경이력
03.13 : [모바일] 사진삭제 기능 추가, #a1 부분 참고

200327 김상진 통합완료 InputPic.js
hasMobile
*/
const InputPic = memo(({ title, item, applyImg, onChange, name, disabled = false, itemType = 'normal', fileDeleteCb }) => {
  const [image, setImage] = useState(applyImg?.phtUrl ? [imgUrl + applyImg?.phtUrl] : []);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [fdatas, setFdatas] = useState([]);

  const fileMerge = useCallback(
    (e, fileData) => {
      const tempI = [];
      const tempF = [];
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = 0; i < fileData.length; i++) {
        tempF.push(fileData[i]);
        tempI.push(URL.createObjectURL(fileData[i]));
      }
      setImage(tempI);
      setFdatas(tempF);
      onChange && onChange(e, tempF, tempI, item);
    },
    [item, onChange]
  );

  const inputFileUpload = useCallback(
    (e) => {
      const files = e.target.files;
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.search(/image/) < 0) {
          alert('이미지만 등록 가능합니다.');
          return false;
        }
      }
      fileMerge(e, files);
    },
    [fileMerge]
  );

  const fileDelete = useCallback(() => {
    if (itemType === 'list') {
      if (fileDeleteCb) fileDeleteCb(item);
    }
    setImage([]);
    setFdatas([]);
  }, [fileDeleteCb, item, itemType]);

  useEffect(() => {
    setImage(applyImg?.phtUrl ? [imgUrl + applyImg?.phtUrl] : []);
  }, [applyImg]);

  return (
    <>
      <div
        className="img-item"
        style={{
          background: image.length > 0 ? `center / cover no-repeat url(${image[0]})` : null
        }}
      />
      {/* <span>{item?.title || ''}</span> */}
      {title && <span>{title}</span>}
      {disabled === false ? (
        image.length > 0 ? (
          <div className="img-dim">
            {/* #a1 Start */}
            {!hasMobile && <a href="#">사진 변경하기</a>}
            <input type="file" name={name} accept="image/*" onChange={inputFileUpload} data-sort-no={item?.sortNo} />
            <i className="ico-app-close" onClick={fileDelete} />
            {/* #a1 End */}
          </div>
        ) : (
          <div className="img-hover">
            <span>사진 등록하기</span>
            <input type="file" name={name} accept="image/*" onChange={inputFileUpload} data-sort-no={item?.sortNo} />
          </div>
        )
      ) : null}
    </>
  );
});

InputPic.propTypes = {
  applyImg: PropTypes.any,
  disabled: PropTypes.bool,
  itemType: PropTypes.string,
  item: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  fileDeleteCb: PropTypes.func,
  onChange: PropTypes.func
};
InputPic.displayName = 'InputPic';
export default InputPic;
