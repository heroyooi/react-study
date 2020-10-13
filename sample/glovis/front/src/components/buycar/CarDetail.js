/**
 * 차량 상세 정보
 * @author 한관영
 */
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { imgUrl } from '@src/utils/HttpUtils';

export const PHOTO_TYPE = {
  KEY: '0010', // 키포인트
  SCRT: '0020' // 스크래치
};

export function setImages(photos = [], type) {
  return Array.isArray(photos) && photos.length > 0 ? (
    <ul className="img-wrap">
      {photos
        .filter((e) => e.pstnDvcd === type)
        .map((photo, i) => (
          <li key={photo.phtUrl}>
            <img src={`${imgUrl}${photo.phtUrl}`} alt={`이미지 ${i}`} />
          </li>
        ))}
    </ul>
  ) : (
    ''
  );
}

/**
 * 차량 상세 정보
 * @param {Object} content
 * @param {String} content.kpntCntn 키 포인트
 * @param {String} content.scrcCntn 스크래치
 * @param {String} content.hstCntn 히스토리
 * @param {String} content.opnCntn 진단소견
 * @param {String} content.etcCntn 기타
 * @param {String} content.photos 키포인트 이미지, 스크래치 이미지
 */
const CarDetail = ({ content }) => {
  return (
    <>
      {content.crMvUrl && (
        <div className="video">
          <div className="player-wrapper">
            <ReactPlayer className="react-player" url={content.crMvUrl} playing={true} loop={true} controls={true} muted={true} width={'100%'} height={'100%'} />
          </div>
        </div>
      )}
      {content.kpntYn === 'Y' && (
        <div className="info-car-tit">
          <h4>Key Point</h4>
          {setImages(content.photos, PHOTO_TYPE.KEY)}
          <div className="info-car-wrap" dangerouslySetInnerHTML={{ __html: content.kpntCntn }} style={{ whiteSpace: 'pre' }} />
        </div>
      )}
      {content.scrcYn === 'Y' && (
        <div className="info-car-tit">
          <h4>Wear&amp;Tear</h4>
          {setImages(content.photos, PHOTO_TYPE.SCRT)}
          <div className="info-car-wrap" dangerouslySetInnerHTML={{ __html: content.scrcCntn }} style={{ whiteSpace: 'pre' }} />
        </div>
      )}
      {content.hstYn === 'Y' && (
        <div className="info-car-tit">
          <h4>이 차의 History</h4>
          <div className="info-car-wrap" dangerouslySetInnerHTML={{ __html: content.hstCntn }} style={{ whiteSpace: 'pre' }} />
        </div>
      )}
      {content.opnYn === 'Y' && (
        <div className="info-car-tit">
          <h4>진단소견</h4>
          <div className="info-car-wrap" dangerouslySetInnerHTML={{ __html: content.opnCntn }} style={{ whiteSpace: 'pre' }} />
        </div>
      )}
      {content.etcYn === 'Y' && (
        <div className="info-car-tit">
          <h4>기타</h4>
          <div className="info-car-wrap" dangerouslySetInnerHTML={{ __html: content.etcCntn }} style={{ whiteSpace: 'pre' }} />
        </div>
      )}
    </>
  );
};

CarDetail.propTypes = {
  content: PropTypes.object
};

export default CarDetail;
