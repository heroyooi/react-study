/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import ImgCover from '@lib/share/items/ImgCover';
import { imgUrl } from '@src/utils/HttpUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';

// eslint-disable-next-line camelcase
const MypageSlideGallery = memo(({ car_gallery = [], isLike = false, onClickInter }) => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
    // eslint-disable-next-line camelcase
  }, [car_gallery]);

  // eslint-disable-next-line react/prop-types
  const NextArrow = ({ onClick }) => {
    return (
      <button type="button" className="btn-next" onClick={onClick}>
        <span className="hide">다음</span>
      </button>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <button type="button" className="btn-prev" onClick={onClick}>
        <span className="hide">이전</span>
      </button>
    );
  };

  const NextSlide = () => {
    slider2.current.slickNext();
  };
  const PrevSlide = () => {
    slider2.current.slickPrev();
  };

  const onClickInterCar = useCallback(
    (index) => () => {
      onClickInter(index);
    },
    [onClickInter]
  );

  return (
    <div className="car-img-area mypage">
      <div className="img-wrap">
        {objIsEmpty(car_gallery) ? null : (
          <Slider ref={slider1} asNavFor={nav2} initialSlide={0} slidesToShow={1} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {car_gallery.map((v, i) => (
              <>
                <ImgCover key={i} src={imgUrl + v.phtUrl} alt="차량사진" />
                <div className="img-hover">
                  <p className="scrap-wrap">
                    <span className={classNames('heart', { on: isLike === true })} onClick={onClickInterCar(i)}>
                      <i className="ico-heart" />
                      <em>관심차량</em>
                    </span>
                  </p>
                </div>
              </>
            ))}
          </Slider>
        )}
      </div>
      <div className="slider-wrap">
        {objIsEmpty(car_gallery) ? null : (
          <>
            <button className="btn-prev-xs" onClick={PrevSlide} />
            <button className="btn-next-xs" onClick={NextSlide} />
            <Slider ref={slider2} asNavFor={nav1} initialSlide={0} slidesToShow={5} swipeToSlide={true} focusOnSelect={true}>
              {car_gallery.map((v, i) => (
                <ImgCover key={i} src={imgUrl + v.phtUrl} alt="차량사진" />
              ))}
            </Slider>
          </>
        )}
      </div>
    </div>
  );
});

MypageSlideGallery.propTypes = {
  car_gallery: PropTypes.array,
  isLike: PropTypes.bool,
  onClickInter: PropTypes.func
};

MypageSlideGallery.displayName = 'MypageSlideGallery';

export default MypageSlideGallery;
