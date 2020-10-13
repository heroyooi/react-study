import React from 'react';
import PropTypes from 'prop-types';
import { imgUrl } from '@src/utils/HttpUtils';

const MobViewGallery = ({ carInfoImage, carPhoto, isBasicPhoto }) => {
  if (carInfoImage && !isBasicPhoto) {
    return (
      <div className="content-wrap buy-wrap">
        <ul className="img-list">
          {carInfoImage.map((photo, i) => (
            <li key={photo.phtUrl}>
              <img src={`${imgUrl}${photo.phtUrl}`} alt={`이미지 ${i}`} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (isBasicPhoto && carPhoto) {
    return (
      <div className="content-wrap buy-wrap">
        <ul className="img-list">
          {carPhoto?.map((photo, i) => (
            <li key={photo.phtUrl}>
              <img src={`${imgUrl}${photo.phtUrl}`} alt={`이미지 ${i}`} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // return (
  //   <div className="content-wrap buy-wrap">
  //     <ul className="img-list">
  //       <li>
  //         <img src="/images/dummy/list-auction-img-1.png" alt="" />
  //       </li>
  //       <li>
  //         <img src="/images/dummy/list-auction-img-2.png" alt="" />
  //       </li>
  //       <li>
  //         <img src="/images/dummy/list-auction-img-3.png" alt="" />
  //       </li>
  //     </ul>
  //   </div>
  // );
};

MobViewGallery.propTypes = {
  carInfoImage: PropTypes.array,
  carPhoto: PropTypes.array,
  isBasicPhoto: PropTypes.bool
};

export default MobViewGallery;
