import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from "classnames/bind";
import Button from './Button';
import PropTypes from 'prop-types';

/*
  html 변경이력
  03.12 : placeHolder -> placeholder 수정(대소문자)
 
*/

const InputFile = ({uploadList, buttonW=160, height=40, marginLeft=8, resVertical=false, inputW, type="normal", placeHolder}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [filePath, setFilePath] = useState(resVertical === false ? null : []);
  //console.log(inputW)
  let input_style = { width: inputW === undefined ? `calc(100% - ${buttonW+10}px)` : `${inputW}px`, height: `${height}px` };

  const inputFileUpload = useCallback((e) => {
    const files = e.target.files;
    const _files = Object.values(files);
    let filesPath = '';
    const filesArray = [];
    if(_files.length > 5) {
      alert('5개 이하로만 등록 가능합니다.');
      return;
    }
    _files.map((v, i) => {
      if (resVertical === false) {
        filesPath += i < _files.length-1 ? `${v.name}, ` : `${v.name}`;
      } else {
        filesArray.push(v);
      }
    });
    setFilePath(resVertical === false ? filesPath : filesArray);
    uploadList(files);    
  }, []);

  const handleClickDelete = useCallback((num) => () => {
    const filesArray = [...filePath];
    filesArray.splice(num, 1);
    setFilePath(filesArray);
  }, [filePath]);

  const createFileButton = () => {
    return (
      <span className="file-btn-wrap">
        {
          !hasMobile ? (
            <Button size="big" background="gray" title="찾아보기" width={buttonW} height={height} marginLeft={marginLeft} />
          ) : (
            type === "normal"
              ? <Button size="full" background="blue80" fontWeight={500} radius={true} title="업로드" measure={'%'} height={40} fontSize={14} />
              : <Button size="full" line="gray" color="darkgray" radius={true} title="이미지 첨부하기" height={50} fontSize={14} />
          )
        }
        <input type="file" multiple onChange={inputFileUpload} />
      </span>
    )
  }

  const inputFileWrap = classNames(
    "input-file-wrap",
    { "res-vertical": resVertical },
    { "customize": inputW !== undefined },
    { "normal": type === "normal" },
    { "special": type === "special" }
  )

  return (
    <div className={inputFileWrap}>
      {hasMobile && createFileButton()}
      {
        resVertical === false
        ? (
          <span className="input-base" style={(type === "normal" && hasMobile) ? {width: 'calc(75.5% - 10px)'} : null}>
            <input type="text" defaultValue={filePath} style={hasMobile ? {width: '100%'} : input_style} disabled placeholder={placeHolder} />
          </span>
        ) : (
          <ul className="file-list-multi">
            {filePath.map((v, i) => <li key={i}><span className="btn-delete" onClick={handleClickDelete(i)}></span><span>{v.name}</span></li>)}
          </ul>
        )
      }
      {!hasMobile && createFileButton()}
    </div>
  )
}

InputFile.propTypes = {
  uploadList: PropTypes.func,
  buttonW: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number
}

export default InputFile;