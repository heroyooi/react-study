import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { imgUrl } from '@src/utils/HttpUtils';

const CarPicture = memo(({ perfData, mode = 'apply' }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [imagePath, setImagePath] = useState('');
  const [files, setFiles] = useState([]);
  const [imgs, setImgs] = useState([]);

  const fileMerge = useCallback(
    (fileData) => {
      const tempf = [];
      const tempi = [];
      for (const element of fileData) {
        tempf.push(element);
        tempi.push(URL.createObjectURL(element));
      }
      setFiles([...files, ...tempf]);
      setImgs([...imgs, ...tempi]);
    },
    [files, imgs]
  );

  const inputFileUpload = useCallback(
    (e) => {
      const files = e.target.files;
      for (const element of files) {
        if (element.type.search(/image/) < 0) {
          alert('이미지만 등록 가능합니다.');
          return false;
        }
      }
      files.length > 0 && files.length <= 2 ? fileMerge(files) : alert('사진을 2개 이하로 선택해주세요.');
      files.length > 1 ? setImagePath(files[0].name + ', ' + files[1].name) : setImagePath(files[0].name);
    },
    [files]
  );

  const handleRemove = useCallback((e) => {
    e.preventDefault();
    setImagePath('');
    setImgs([]);
  }, []);

  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map((v) => console.log(v));
  };

  return (
    <>
      {mode === 'apply' &&
        (!hasMobile ? (
          <fieldset>
            <div className="inspection-photo">
              <h4>
                점검 장면 촬영 사진<span>(견본 이미지를 참고하여, 자동차 점검 장면을 촬영한 후 업로드 해 주세요.)</span>
              </h4>
              <ul>
                <li
                  className="car-img-front"
                  style={imgs.length > 0 ? { background: `center / cover no-repeat url(${imgs[0]}) #ececec` } : { background: `center / 100% no-repeat url(/images/dummy/car-img-front.png) #ececec` }}
                >
                  {imgs.length > 0 ? null : <span>자동차 정면 가이드 이미지</span>}
                </li>
                <li
                  className="car-img-back"
                  style={imgs.length > 1 ? { background: `center / cover no-repeat url(${imgs[1]}) #ececec` } : { background: `center / 100% no-repeat url(/images/dummy/car-img-back.png) #ececec` }}
                >
                  {imgs.length > 1 ? null : <span>자동차 후면 가이드 이미지</span>}
                </li>
              </ul>
              <p className="tx-exp-tp5">*점검사진은 성능점검장을 확인할 수 있는 점검장 일부(상호 또는 건물 등)를 배경으로 자도차 번호판 및 차량 전체가 식별할 수 있는 사진이 등록되어야 합니다.</p>
              {/* 
              <div className="photo-scan-file">
                <p>사진/스캔본 첨부(선택)</p>
                <InputFile uploadList={uploadList1} />
                
                <span className="file-input input-base"><input type="text" id="calculated22" defaultValue={imagePath} readOnly={true} /></span>
                {
                  imagePath === ''
                    ? (
                      <span className="file-btn-wrap">
                        <Button background="blue80" title="찾아보기" width={140} height={40} />
                        <input type="file" accept="image/*" multiple onChange={inputFileUpload} />
                      </span>
                    )
                    : (
                      <>
                        <span className="file-btn-wrap">
                          <Button background="blue80" title="수정" width={70} height={40} marginRight={8} />
                          <input type="file" accept="image/*" multiple onChange={inputFileUpload} />
                        </span>
                        <Button background="blue80" title="삭제" width={70} height={40} onClick={handleRemove} />
                      </>
                    ) 
                }
              </div> 
              */}
            </div>
          </fieldset>
        ) : (
          <div className="accident-history-cont">
            <ul className="car-photo">
              <li>
                <div className="img-wrap">
                  <img src="\images\dummy\product-img-01.png" />
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src="\images\dummy\product-img-01.png" />
                </div>
              </li>
            </ul>
            <p className="tx-tp3 mt16">&#8251; 견본 이미지를 참고하여, 자동차 점검 장면을 촬영한 후 업로드해 주세요.</p>
            <p className="tx-tp3">&#8251; 점검사진은 성능점검장을 확인할 수 있는 점검장 일부(상호 또는 건물 등)를 배경으로 자동차 번호판 및 차량 전체가 식별할 수 있는 사진이 등록되어야 합니다.</p>
          </div>
        ))}
      {mode === 'viewer' &&
        (!hasMobile ? (
          <fieldset>
            <div className="inspection-photo viewer">
              <h4>점검 장면 촬영 사진</h4>
              <ul>
                {perfData?.insShotPhtUrl1 ? (
                  <li>
                    <div className="img-wrap">
                      <img src={`${imgUrl}${perfData?.insShotPhtUrl1}`} />
                    </div>
                  </li>
                ) : null}
                {perfData?.insShotPhtUrl2 ? (
                  <li>
                    <div className="img-wrap">
                      <img src={`${imgUrl}${perfData?.insShotPhtUrl2}`} />
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>
          </fieldset>
        ) : (
          <div className="accident-history-cont">
            <ul className="car-check-photo">
              {perfData?.insShotPhtUrl1 ? (
                <li>
                  <img src={`${imgUrl}${perfData?.insShotPhtUrl1}`} />
                </li>
              ) : null}
              {perfData?.insShotPhtUrl2 ? (
                <li>
                  <img src={`${imgUrl}${perfData?.insShotPhtUrl2}`} />
                </li>
              ) : null}
            </ul>
          </div>
        ))}
    </>
  );
});

CarPicture.propTypes = {
  mode: PropTypes.string,
  perfData: PropTypes.object
};

CarPicture.displayName = 'CarPicture';
export default CarPicture;
