import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './ImgCover.scss';

const ImgCover = memo(({ src, alt }) => {
  return (
    <div className="img-cover">
      <img src={src} alt={alt} />
    </div>
  );
});

ImgCover.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default ImgCover;