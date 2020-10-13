import React, { memo, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ImgCover from '@lib/share/items/ImgCover';

const SlideCarDetail = memo(({ car_gallery }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [slideIndex, setSlideIndex] = useState(0);

  const carDetailSlider = useRef(null);

  const NextArrow = useCallback(({ onClick }) => {
    return (
      <button type="button" className="btn-next" onClick={onClick}>
        <span className="hide">다음</span>
      </button>
    );
  }, []);
  const PrevArrow = useCallback(({ onClick }) => {
    return (
      <button type="button" className="btn-prev" onClick={onClick}>
        <span className="hide">이전</span>
      </button>
    );
  }, []);
  const handleClick = useCallback((e) => {
    carDetailSlider.current.slickGoTo(e.currentTarget.dataset.id);
  }, []);

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    }
  };
  if (hasMobile) {
    settings.dots = true;
  }

  return (
    <div className="car-img-wrap">
      <div className="car-slide">
        <Slider {...settings} ref={carDetailSlider}>
          {car_gallery.map((v) => (
            <div key={v.id}>
              <ImgCover src={v.image} alt={v.alt} />
            </div>
          ))}
        </Slider>
      </div>
      {!hasMobile && (
        <ul className="thumb">
          {car_gallery.map((v, i) => (
            <li data-id={i} key={v.id} onClick={handleClick} className={slideIndex === i ? 'on' : null}>
              <ImgCover src={v.image} alt={v.alt} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

SlideCarDetail.propTypes = {
  car_gallery: PropTypes.array
};

SlideCarDetail.displayName = 'SlideCarDetail';
export default SlideCarDetail;
