import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Button from '@lib/share/items/Button';
import { setComma } from '@src/utils/StringUtil';
import { PHOTO_TYPE, setImages } from '@src/components/buycar/CarDetail';

const BuyCarDetailCarInfoTab = memo(({ carBaseInfo, carContent, carInfo, isMobile, onForceToggle, setImageType, callBack }) => {
  const [expMore1, setExpMore1] = useState(false);
  const [expMore2, setExpMore2] = useState(false);
  const [expMore3, setExpMore3] = useState(false);

  const tabCarContent = useSelector((state) => state.buyCarDetail.carContent, {});

  const handleExpMore1 = useCallback(
    (e) => {
      e.preventDefault();
      setExpMore1((prev) => !prev);
      onForceToggle(e);
    },
    [onForceToggle]
  );

  const handleExpMore2 = useCallback(
    (e) => {
      e.preventDefault();
      setExpMore2((prev) => !prev);
      onForceToggle(e);
    },
    [onForceToggle]
  );

  const handleExpMore3 = useCallback(
    (e) => {
      e.preventDefault();
      setExpMore3((prev) => !prev);
      onForceToggle(e);
    },
    [onForceToggle]
  );

  const imageType = useCallback((value) => {
    // e.preventDefault();
    console.log('buycarDetailCarInfo TAB: ', value);
    setImageType(value);
    MobFPhandler();
  }, []);

  const MobFPhandler = useCallback(() => {
    // console.log('이미지 타입 설정 이후 팝업 핸들러');
    callBack();
  },[]);

  if (isMobile) {
    return (
      <>
        <div className="info-wrap car-exp">
          {carContent && carContent.crMvUrl && (
            <div className="video">
              <div className="player-wrapper">
                <ReactPlayer className="react-player" url={carContent.crMvUrl} playing={true} loop={true} controls={true} muted={true} width={'100%'} height={'100%'} />
              </div>
            </div>
          )}
          {carContent && carContent?.kpntYn === 'Y' && (
            <div className="pb20">
              <h4>Key Point</h4>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  imageType(carContent.photos.filter((e) => e.pstnDvcd === PHOTO_TYPE.KEY));
                }}
              >
                {setImages(carContent.photos, PHOTO_TYPE.KEY)}
              </a>
              <dl>
                <dd dangerouslySetInnerHTML={{ __html: carContent.kpntCntn }} />
              </dl>
            </div>
          )}

          {carContent && carContent?.scrcYn === 'Y' && (
            <div>
              <h4>Wear&amp;Tear</h4>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  imageType(carContent.photos.filter((e) => e.pstnDvcd === PHOTO_TYPE.SCRT));
                }}
              >
                {setImages(carContent.photos, PHOTO_TYPE.SCRT)}
              </a>
              <div className={!expMore1 ? 'exp-more close' : 'exp-more'}>
                <dl>
                  <dd dangerouslySetInnerHTML={{ __html: carContent.scrcCntn }} />
                </dl>
              </div>
              <Button
                size="full"
                color="black"
                title={!expMore1 ? '설명 더보기' : '설명 숨기기'}
                fontSize={14}
                fontWeight={500}
                iconType={!expMore1 ? 'arrow-bottom-gray' : 'arrow-top-gray'}
                onClick={handleExpMore1}
              />
            </div>
          )}

          {carContent && carContent?.hstYn === 'Y' && (
            <div>
              <h4>이 차의 History</h4>
              <div className={!expMore2 ? 'exp-more close' : 'exp-more'}>
                <dl>
                  <dd dangerouslySetInnerHTML={{ __html: carContent.hstCntn }} />
                </dl>
              </div>
              <Button
                size="full"
                color="black"
                title={!expMore2 ? '설명 더보기' : '설명 숨기기'}
                fontSize={14}
                fontWeight={500}
                iconType={!expMore2 ? 'arrow-bottom-gray' : 'arrow-top-gray'}
                onClick={handleExpMore2}
              />
            </div>
          )}

          {carContent && carContent?.opnYn === 'Y' && (
            <div>
              <h4>진단소견</h4>
              <div className={!expMore3 ? 'exp-more close' : 'exp-more'}>
                <dl>
                  <dt>본 차량상태</dt>
                  <dd>- 사고여부: {carBaseInfo.acdtYn === 'Y' ? '사고' : '무사고'}</dd>
                  <dd>- 차량모델: {carInfo.mdlNm}</dd>
                  <dd>- 차량연식: {carBaseInfo.frmYyyy === null ? `2020(년형)` : `${carBaseInfo.frmYyyy}(년형)`}</dd>
                  <dd>- 차량색상: {carBaseInfo.crClrNm}</dd>
                  <dd>- 주행거리: {`${setComma(carBaseInfo.drvDist)}KM`}</dd>
                  <dt className="mt16">관리상태</dt>
                  <dd className="mt16" dangerouslySetInnerHTML={{ __html: carContent.opnCntn }} />
                </dl>
              </div>
              <Button
                size="full"
                color="black"
                title={!expMore3 ? '설명 더보기' : '설명 숨기기'}
                fontSize={14}
                fontWeight={500}
                iconType={!expMore3 ? 'arrow-bottom-gray' : 'arrow-top-gray'}
                onClick={handleExpMore3}
              />
            </div>
          )}

          {carContent && carContent?.etcYn === 'Y' && (
            <div className="pb20">
              <h4>기타</h4>
              <p dangerouslySetInnerHTML={{ __html: carContent.etcCntn }} />
            </div>
          )}
        </div>
      </>
    );
  }

  return null;
});

BuyCarDetailCarInfoTab.propTypes = {
  carBaseInfo: PropTypes.object,
  carContent: PropTypes.object,
  carInfo: PropTypes.object,
  isMobile: PropTypes.bool,
  onForceToggle: PropTypes.func,
  setImageType: PropTypes.func,
  callBack: PropTypes.func
};
BuyCarDetailCarInfoTab.displayName = 'BuyCarDetailCarInfoTab';
export default BuyCarDetailCarInfoTab;
