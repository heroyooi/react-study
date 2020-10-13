import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from './Button';
import PropTypes from 'prop-types';

const MobInputFile = ({
  uploadList,
  resVertical = false,
  inputW,
  placeHolder,
  name = '',
  isMultiple = false,
  accept = '*.*',
  max=5,
  defaultFilePath = null,
  disabled = false
}) => {
  const [filePath, setFilePath] = useState([]);
  const inputRef = useRef();
  const [fileNames, setFileNames] = useState('');

  useEffect(() => {
    if(defaultFilePath) {
      setFilePath([defaultFilePath]);
    }
  }, [defaultFilePath]);

  useEffect(() => {
    uploadList(filePath, inputRef.current);
  }, [filePath]);

  const inputFileUpload = useCallback((e) => {
    if (disabled) return false;
    const files = e.target.files;
    const _files = Object.keys(files).map(function(e) {
      // console.log('===> loop', files);
      return files[e];
    });
    let tmpFileNames = '';
    const filesArray = [];
    const filesUploads = [];

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
          tmpFileNames += i < _files.length - 1 ? `${v.name}, ` : `${v.name}`;
          setFileNames(tmpFileNames);
          //filesPath += i < _files.length - 1 ? `${v.name}, ` : `${v.name}`;
        }
        filesArray.push(v);
      }
    });

    if (excludeCount > 0 && (excludeCount === _files.length)) {
      alert('허용되지 않는 형식입니다.');
    } else if (excludeCount > 0 ) {
      alert('허용되지 않는 형식은 제외 되었습니다.');
    }

    setFilePath(filesArray);
    uploadList(filesUploads);
    // console.log("filesUploads ===> ", filesUploads);
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
        <Button size="full" background={!disabled ? "blue80" : "gray"} fontWeight={500} radius={true} title="찾아보기" measure={'%'} height={40} fontSize={14} onClick={onClickButton} />
        <input type="file" ref={inputRef} multiple={isMultiple} onChange={inputFileUpload} name={name} accept={accept} />
      </span>
    );
  };

  const inputFileWrap = classNames('input-file-wrap', { 'res-vertical': resVertical }, { customize: inputW !== undefined }, 'normal', { disabled: disabled });

  return (
    <div className={inputFileWrap}>
      {createFileButton()}
      {
        resVertical === false
        ? (
          <span className="input-base" style={{width: 'calc(75.5% - 10px)'}}>
            <input type="text" defaultValue={fileNames} style={{width: '100%'}} disabled placeholder={placeHolder} name={name}/>
          </span>
        ) : (
          <ul className="file-list-multi">
            {filePath.map((v, i) => <li key={i}><span className="btn-delete" onClick={handleClickDelete(i)}></span><span>{v.name}</span></li>)}
          </ul>
        )
      }
    </div>
  );
};

MobInputFile.propTypes = {
  uploadList: PropTypes.func,
  buttonW: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number
};

export default MobInputFile;
