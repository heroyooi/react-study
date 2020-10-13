import React from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';

/**
 * 마이페이지 내차팔기 차량 사진 정보
 * @param {string} slReqId 신청서 아이디
 * @param {Array} photoList 사진 목록
 * @param {string} href 사진 수정 링크
 */
const CarPhotoList = ({ slReqId, photoList, href, availEditBtn }) => {
  return (
    <div className="car-img-upload slide">
      <div className="tit-wrap">
        <h5>차량 정보</h5>
      </div>
      <div className="car-img-area">
        <div className="img-wrap">
          <img src="/images/dummy/list-auction-img-1.png" alt="홈서비스 차량 이미지" />
        </div>
        <ul>
          <li className="arrow">
            <button className="btn-arrow-prev-mid"></button>
          </li>
          <li>
            <div className="img-item">
              <a href="#">
                <img src="" alt="" />
              </a>
            </div>
            <span>차량 전면</span>
          </li>
          <li>
            <div className="img-item">
              <a href="#">
                <img src="" alt="" />
              </a>
            </div>
            <span>차량 후면</span>
          </li>
          <li>
            <div className="img-item">
              <a href="#">
                <img src="" alt="" />
              </a>
            </div>
            <span>차량 좌측</span>
          </li>
          <li>
            <div className="img-item">
              <a href="#">
                <img src="" alt="" />
              </a>
            </div>
            <span>차량 우측</span>
          </li>
          <li>
            <div className="img-item">
              <a href="#">
                <img src="" alt="" />
              </a>
            </div>
            <span>내부 계기판</span>
          </li>
          <li className="arrow">
            <button className="btn-arrow-next-mid"></button>
          </li>
        </ul>
      </div>
      <p className="tx-exp-tp2">* 차량 사진은 20개까지 등록가능합니다.</p>
      {availEditBtn && <Button className="fr" size="big" background="blue80" title="차량 사진 수정" width={180} nextLink={true} href={`${href}?slReqId=${slReqId}`} />}
    </div>
  );
};

CarPhotoList.propTypes = {
  slReqId: PropTypes.string,
  photoList: PropTypes.array,
  href: PropTypes.string
};

export default CarPhotoList;
