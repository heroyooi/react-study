import { useState, useCallback, useEffect, createElement, memo } from 'react';
import classNames from 'classnames/bind';
import { useDropzone } from 'react-dropzone';

const globalThis = require('globalthis')();

/**
 * @module CarPhotoList
 * @desc 차량 이미지 업로드 리스트
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {String} props.className - 최상위 DOM에 부여할 커스텀 className
 * @param  {JSX} props.children - 커스텀 JSX 코드.
 * @param  {Array} props.options - 나열할 이미지 업로드 아이템 리스트
 * @param  {Array} props.items - 업로드되어서 보여줄 아이템 리스트
 * @param  {Function} props.onUploadImage - 이미지를 업로드 했을때 콜백함수
 * @param  {String} props.name="sortNo" - 업로드 input의 name값 설정
 */
const CarPhotoList = memo(({ className, children, options, items, onUploadImage, name = 'sortNo' }) => {
  const getPicture = useCallback(
    (key) => {
      if (Array.isArray(items)) {
        return items.find((carPhoto) => carPhoto[name] == key);
      }
    },
    [items]
  );

  return (
    <div className={className}>
      {children}
      <ul>{options && options.map((item, i) => <CarPictureItem item={item} key={i} onUploadImage={onUploadImage} carPhoto={getPicture(item[name])} name={name} tagName="li" />)}</ul>
    </div>
  );
});

/**
 * @category components
 * @module CarPictureItem
 * @desc 차량 이미지 업로드 아이템
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Object} props.item - 나열할 이미지 업로드 아이템
 * @param  {Object} props.carPhoto - 업로드되어서 보여줄 아이템
 * @param  {Function} props.onUploadImage - 이미지를 업로드 했을때 콜백함수
 * @param  {String} props.name="sortNo" - 업로드 input의 name값 설정
 * @param  {String} props.tagName="div" - 이미지 업로드 아이템의 태그를 결정
 */
export const CarPictureItem = ({ item, carPhoto, onUploadImage, name = 'sortNo', tagName = 'div' }) => {
  const [image, setImage] = useState(carPhoto ? carPhoto.phtUrl : '');
  const isClient = !!globalThis.window;
  const reader = isClient ? new FileReader() : null;

  const onDrop = useCallback((files) => {
    files.forEach((file) => {
      if (isClient) {
        reader.readAsDataURL(file);
        onUploadImage(inputRef.current, file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, rootRef, inputRef } = useDropzone({ onDrop });

  useEffect(() => {
    reader.onload = () => {
      setImage(reader.result);
    };
  }, []);

  return (
    <>
      {createElement(
        tagName,
        {
          className: classNames({ on: image }),
          ...getRootProps()
        },
        <>
          <div className="img-item">
            <img src={image} alt="" style={{ width: '100%' }} />
          </div>
          <span>{item.title}</span>
          <div className="img-hover">
            <label
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                fontSize: '16px',
                color: '#3f64c3',
                cursor: 'pointer',
                fontFamily: '"Roboto","Noto Sans KR","AppleSDGothicNeo","Malgun Gothic","맑은 고딕","돋움","Arial",sans-serif'
              }}
            >
              사진 등록하기
            </label>
          </div>
          <div className="img-dim">
            <label
              style={{
                display: 'block',
                height: '100%',
                fontSize: '16px',
                color: '#fff',
                letterSpacing: '-.5px',
                fontWeight: '400',
                cursor: 'pointer',
                fontFamily: '"Roboto","Noto Sans KR","AppleSDGothicNeo","Malgun Gothic","맑은 고딕","돋움","Arial",sans-serif'
              }}
            >
              사진 변경하기
            </label>
          </div>
          <input
            id={`${name}-${item[name]}`}
            name={name}
            type="file"
            data-value={item[name]}
            style={{ display: 'none' }}
            accept="image/*"
            {...getInputProps({
              multiple: false
            })}
          />
        </>
      )}
    </>
  );
};

export default memo(CarPhotoList);
