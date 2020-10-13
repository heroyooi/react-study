import {useState, useEffect, useMemo, useCallback, useRef} from 'react'
import classNames from "classnames/bind"
import PropTypes from 'prop-types'
import Button from './Button'
import axios from 'axios'

const ImgUploadItem = ({maxLength = 1, apiUrl=undefined, uploadList, type}) =>{
  const [files, setFiles] = useState([])
  const [imgs, setImgs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDrag, setIsDrag] = useState(false)
  const [isDrop, setIsDrop] = useState(false)
  const [dropComplete, setDropComplete] = useState(false)
  const [multiDesign, setMultiDesign] = useState(maxLength > 1)
  const multi = maxLength > 1;
  const inputFile = useRef(null);
  let dragCounter = 0;
  //const multi = maxLength > 1 ;

  useEffect(() => {
    if(apiUrl !== undefined){
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(apiUrl,{responseType: 'blob'});
          let temp_i = [];
          [res.data].map(item => temp_i.push(URL.createObjectURL(item)))
          setFiles([res.data]);
          setImgs(temp_i);
          setDropComplete(true);
          setMultiDesign(false);
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, []);

  const drow = () =>{
    let arr = [];
    arr = imgs.map((item,index) =>{
      if(index > maxLength-1){return false}
      return (
        <div key={index} className={wrapper_style} onClick={inputTrigger} onDragEnter={handleDragIn} onDragLeave={handleDragOut}  onDragOver={handleDragOver} onDrop={handleDrop} onMouseLeave={handleLeave}>
          <input ref={inputFile} type="file" accept="image/*" className="file-input" multiple onChange={inputFileUpload} />
          <div className="drop-complete">
            <div className="img-item">
              <img src={item} />
              <span className="init-btn">
                <i className="ico-del" onClick={(e) => deleteItem(e, index)}></i>
              </span>
              <div className="hover-dimm"></div>
              <p className="hover-msg">사진 변경하기</p>
            </div>
          </div>
        </div>
      )
    })
    return arr
  }

  const handleDragIn = useCallback((e) =>{
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
      setIsDrag(true);
    }
  },[isDrag])

  const handleDragOut = useCallback((e) =>{
    e.preventDefault();
    e.stopPropagation();
    if(dragCounter === 0){
      setIsDrag(false);
    }
    dragCounter--;
  },[isDrag])

  const handleDragOver = useCallback((e) =>{
    e.preventDefault();
    e.stopPropagation();
  },[])
  
  let fileLength = useMemo(() => files.length, [files]);
  
  const handleDrop = useCallback((e) =>{
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
    if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileMerge(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
    setDropComplete(true);
    setIsDrop(true);
    setMultiDesign(false);
  },[isDrag,files,imgs,dropComplete])

  const inputTrigger = useCallback((e) =>{
    inputFile.current.click();
  },[])

  const inputFileUpload = useCallback((e) =>{
    if(e.target.files.length > 0){
      fileMerge(e.target.files);
    }
    setDropComplete(true);
    setIsDrop(true);
    setMultiDesign(false);
  },[files,imgs,dropComplete,isDrop])

  const fileMerge = useCallback((fileData) =>{
    let temp_f = [];
    let temp_i = [];
    for (let i = 0; i<fileData.length;i++){
      if(multiDesign){
        if(fileLength + i >= maxLength){ break; }
      }
      else{
        if(i == 1){ break; }
      }
      if(fileData[i].type.search(/image/) < 0){
        alert("이미지만 등록 가능합니다.")
        return false;
      }
      temp_f.push(fileData[i]);
      temp_i.push(URL.createObjectURL(fileData[i]));
    }
    if(multi){
      setFiles([...files,...temp_f]);  
      setImgs([...imgs,...temp_i]);
    }
    else{
      setFiles(temp_f);
      setImgs(temp_i);
    }
    uploadList(files);
  },[files, imgs])

  const deleteItem = useCallback((e, idx) =>{
    e.stopPropagation();
    setFiles(files.filter((item,i) => i !== idx));
    setImgs(imgs.filter((item,i) => i !== idx));
    //setDropComplete(false);
  },[files,imgs])

  const deleteAllItem = useCallback((e) =>{
    e.stopPropagation();
    setFiles([]);
    setImgs([]);
    setDropComplete(false);
  },[files,imgs,dropComplete])

  const handleLeave = useCallback(() =>{
    setIsDrop(false);
  },[isDrop])

  const wrapper_style = classNames(
    'img-upload-item',
    {'multi': multiDesign},
    {'is-drag': isDrag },
    {'dropComp' : dropComplete},
    {'isDrop' : isDrop}
  )
  
  return(
    <div className="img-upload-area">
    {dropComplete?
      <div className={multi ? 'multi-item' : null}>
        {drow()}
      </div>
    :
      <div className={wrapper_style} onClick={inputTrigger} onDragEnter={handleDragIn} onDragLeave={handleDragOut}  onDragOver={handleDragOver} onDrop={handleDrop} onMouseLeave={handleLeave}>
        <input ref={inputFile} type="file" accept="image/*" className="file-input" multiple onChange={inputFileUpload} />
        {multi?
          <>
            <p className="init-msg">차량 상세 사진을 여기에 끌어 놓으세요<br />최대 10개 까지 등록할 수 있습니다</p>
            <Button size="big" line="black" color="black" title="사진 선택" />
          </> :
          <p className="init-msg">사진 등록하기</p>
        }
      </div>
    }
    </div>
  )
}

ImgUploadItem.propTypes = {
  maxLength: PropTypes.number,
  apiUrl: PropTypes.string,
  uploadList: PropTypes.func
}

export default ImgUploadItem
