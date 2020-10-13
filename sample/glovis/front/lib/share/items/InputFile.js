import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from './Button';
import PropTypes from 'prop-types';
/*
  html 변경이력
  03.12 : placeHolder -> placeholder 수정(대소문자)
 
  200327 김상진 통합완료 InputFile.js
  inputFileWrap, createFileButton, hasMobil 통합완료
*/

const InputFile = ({
  uploadList,
  buttonW = 160,
  height = 40,
  marginLeft = 8,
  resVertical = false,
  inputW,
  type = 'normal',
  placeHolder,
  name = '',
  buttonBackground = 'gray',
  isMultiple = true,
  accept = '*.*',
  max=5,
  defaultFilePath = null,
  disabled = false
}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [filePath, setFilePath] = useState(resVertical === false ? null : []);
  const inputRef = useRef();

  useEffect(() => {
    if(defaultFilePath) {
      setFilePath([defaultFilePath]);
    }
  }, [defaultFilePath]);

  useEffect(() => {
    uploadList(filePath, inputRef.current);
  }, [filePath]);

  let input_style = { width: inputW === undefined ? `calc(100% - ${buttonW + 10}px)` : `${inputW}px`, height: `${height}px` };

  const inputFileUpload = useCallback((e) => {
    if (disabled) return false;
    const files = e.target.files;
    //const _files = Object.values(files); //ie 작동안함 -> 변경
    const _files = Object.keys(files).map(function(e) {
      return files[e];
    });
    let filesPath = '';
    const filesArray = [];
    const filesUploads = []; // 혹시 몰라서 그냥 따로 만들었음.

    if(_files.length > max) {
      alert(max + '개 이하로만 등록 가능합니다.');
      return;
    }

    let excludeCount = 0;

    _files.map((v, i) => {
      //해당파일이 적용범위 확장자가 맞는지 검사
      const isCheckExt = checkFileExt(v);

      if (!isCheckExt) {
        excludeCount++;
      } else {
        filesUploads.push(v);
        if (resVertical === false) {
          filesPath += i < _files.length - 1 ? `${v.name}, ` : `${v.name}`;
        } else {
          filesArray.push(v);
        }
      }
    });

    if (excludeCount > 0 && (excludeCount === _files.length)) {
      alert('허용되지 않는 형식입니다.');
    } else if (excludeCount > 0 ) {
      alert('허용되지 않는 형식은 제외 되었습니다.');
    }

    setFilePath(resVertical === false ? filesPath : filesArray);
    uploadList(filesUploads);
  }, []);

  const checkFileExt = (file) => {
    let result = false;

    if(accept !== '*.*') {
      const pathpoint = file.name.lastIndexOf('.');
      const filepoint = file.name.substring(pathpoint + 1, file.length);
      const filetype = filepoint.toLowerCase();

      if (accept.includes(',')) {
        const exts = accept.split(',');
        exts.map((ext, i) => {
          console.log(ext);
          let compareExt = '';

          if (ext.indexOf('image') > -1 ) {
            compareExt = ext.replace('image/', '');
          } else {
            compareExt = ext.replace(/\./, '').replace(/(\s*)/g, '');
          }
          console.log(compareExt);
          if (filetype === compareExt.trim()) {
            result = true;
          }
        });
      } else {
        const ext = accept;
        let compareExt = '';

        if (ext.indexOf('image') > -1) {
          compareExt = ext.replace('image/', '');
        } else {
          compareExt = ext.replace(/\./, '').replace(/(\s*)/g, '');
        }

        if (filetype === compareExt) {
          result = true;
        }
      }
    } else {
      //전체니까 그냥 패스
      result = true;
    }
    return result;
  }

  const handleClickDelete = useCallback((num) => () => {
      const filesArray = [...filePath];
      filesArray.splice(num, 1);
      setFilePath(filesArray);
  }, [filePath]);

  const onClickButton = useCallback((e) => {
    e.preventDefault();
  }, []);

  const createFileButton = () => {
    return (
      <span className="file-btn-wrap">
        {
          !hasMobile ? (
            <span className="file-btn-wrap">
        <Button size="big" background={buttonBackground} title="찾아보기" width={buttonW} height={height} marginLeft={marginLeft} onClick={onClickButton} />
        { isMultiple == true ? <input type="file" multiple onChange={inputFileUpload} accept={accept} ref={inputRef} name={name}/> : <input type="file"  onChange={inputFileUpload} accept={accept} ref={inputRef} name={name} /> }
      </span>
          ) : (
            type === "normal"
              ? <Button size="full" background={!disabled ? "blue80" : "gray"} fontWeight={500} radius={true} title="찾아보기" measure={'%'} height={40} fontSize={14} onClick={onClickButton} />
              : <Button size="full" line="gray" color="darkgray" radius={true} title="이미지 첨부하기" height={50} fontSize={14} onClick={onClickButton} />
          )
        }
        <input type="file" multiple={isMultiple} onChange={inputFileUpload} ref={inputRef} name={name} accept={accept} />
      </span>
    );
  };

  const inputFileWrap = classNames('input-file-wrap', { 'res-vertical': resVertical }, { customize: inputW !== undefined }, { normal: type === 'normal' }, { special: type === 'special' }, { disabled: disabled });

  return (
    <div className={inputFileWrap}>
      {hasMobile && createFileButton()}
      {
        resVertical === false
        ? (
          <span className="input-base" style={(type === "normal" && hasMobile) ? {width: 'calc(75.5% - 10px)'} : null}>
            <input type="text" defaultValue={filePath} style={hasMobile ? {width: '100%'} : input_style} disabled placeholder={placeHolder} name={name}/>
          </span>
        ) : (
          <ul className="file-list-multi">
            {filePath.map((v, i) => <li key={i}><span className="btn-delete" onClick={handleClickDelete(i)}></span><span>{v.name}</span></li>)}
          </ul>
        )
      }
      {!hasMobile && createFileButton()}
    </div>
  );
};

InputFile.propTypes = {
  uploadList: PropTypes.func,
  buttonW: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number
};

export default InputFile;
