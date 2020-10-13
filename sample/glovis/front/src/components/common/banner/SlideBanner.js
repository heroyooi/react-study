import React, { useState, useRef, useCallback, memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ImgCover from '@lib/share/items/ImgCover';
import BannerItemBuyCar from './BannerItemBuyCar';

const SlideBanner = memo(
  ({
    carList = [],
    touch = false,
    slideType = 'banner-multiple',
    screen = false,
    screenInfo = [],
    buttonType = 'arrow',
    children,
    pagination = false,
    dots = false,
    autoplay = false,
    hasMarkup = null,
    customArrow = false,
    multiNum = 4,
    withCounter = false,
    infinite = true,
    centerMode = false,
    markupAll = false,
    variableWidth = false
  }) => {
    const hasMobile = useSelector((state) => state.common.hasMobile);
    let settings = null;
    const [slideIndex, setSlideIndex] = useState(0);
    const [playButton, setPlayButton] = useState(false);
    const [pauseButton, setPauseButton] = useState(true);
    const rootSlider = useRef(null);
    const imgSlider = useRef(null);
    const NextArrow = useCallback(({ onClick }) => {
      if (buttonType === 'arrow') {
        return <button className="btn-arrow-next-mid" onClick={onClick} />;
      } else if (buttonType === 'circle') {
        return <button className="btn-circle-next" onClick={onClick} />;
      }
    }, []);
    const PrevArrow = useCallback(({ onClick }) => {
      if (buttonType === 'arrow') {
        return <button className="btn-arrow-prev-mid" onClick={onClick} />;
      } else if (buttonType === 'circle') {
        return <button className="btn-circle-prev" onClick={onClick} />;
      }
    }, []);

    const playSlick = useCallback(() => {
      rootSlider.current.slickPlay();
      setPlayButton(false);
      setPauseButton(true);
    }, []);
    const pauseSlick = useCallback(() => {
      rootSlider.current.slickPause();
      setPlayButton(true);
      setPauseButton(false);
    }, []);

    settings = {
      dots: dots,
      infinite: infinite,
      speed: 500,
      draggable: touch,
      touchMove: touch,
      initialSlide: 0,
      slidesToShow: slideType === 'banner-multiple' ? multiNum : 1,
      slidesToScroll: slideType === 'banner-multiple' ? multiNum : 1,
      autoplay: autoplay,
      className: dots ? 'w-dots' : null,
      appendDots: (dots) => (
        <div>
          <ul className="dots">{dots}</ul>
          {autoplay && (
            <>
              {playButton && (
                <button className="btn-play" onClick={playSlick}>
                  Play
                </button>
              )}
              {pauseButton && (
                <button className="btn-pause" onClick={pauseSlick}>
                  Pause
                </button>
              )}
            </>
          )}
        </div>
      )
    };
    if (variableWidth) settings.variableWidth = true;
    if (hasMobile && centerMode) {
      settings.centerMode = true;
      settings.centerPadding = '20px';
    }
    if (customArrow) {
      settings.prevArrow = <PrevArrow />;
      settings.nextArrow = <NextArrow />;
    }
    if (slideType === 'banner-multiple') {
      if (markupAll) {
        return (
          <Slider ref={rootSlider} {...settings}>
            {children}
          </Slider>
        );
      }
      return (
        <Slider ref={rootSlider} {...settings}>
          {carList.map((data, i) => {
            if (hasMarkup !== null) {
              if (hasMarkup.includes(i)) {
                if ((hasMarkup?.length || 0) > 1) {
                  return children[hasMarkup.indexOf(i)];
                }
                return children;
              }
              return <BannerItemBuyCar key={i} data={data} />;
            }
            return <BannerItemBuyCar key={i} data={data} />;
          })}
        </Slider>
      );
    } else if (slideType === 'banner-single') {
      const NextSlide = () => {
        imgSlider.current.slickNext();
        hasMobile && rootSlider.current.slickNext();
      };
      const PrevSlide = () => {
        imgSlider.current.slickPrev();
        hasMobile && rootSlider.current.slickPrev();
      };
      if (hasMobile) settings.arrows = false;
      settings.beforeChange = (current, next) => {
        setSlideIndex(next);
        screen && imgSlider.current.slickGoTo(next);
      };
      if (withCounter) {
        const CounterNextSlide = useCallback(() => {
          rootSlider.current.slickNext();
        }, []);
        const CounterPrevSlide = useCallback(() => {
          rootSlider.current.slickPrev();
        }, []);
        return (
          <div className="slick-with-counter">
            <ul className="pagination">
              <li>
                <button className="btn-prev-xs" onClick={CounterPrevSlide} />
              </li>
              <li className="pagination-num">
                <span className="tx-black">{slideIndex + 1}</span>/{(children && children?.length) || 0}
              </li>
              <li>
                <button className="btn-next-xs" onClick={CounterNextSlide} />
              </li>
            </ul>
            <Slider ref={rootSlider} {...settings}>
              {children}
            </Slider>
          </div>
        );
      }

      return (
        <Fragment>
          {screen && (
            <div className="steps-img-wrap">
              <div className="steps-img">
                <Slider
                  ref={imgSlider}
                  arrows={false}
                  fade={true}
                  beforeChange={(current, next) => {
                    hasMobile && rootSlider.current.slickGoTo(next);
                  }}
                >
                  {screenInfo.map((v, i) => (
                    <ImgCover key={i} src={v.img} alt={v.alt} />
                  ))}
                </Slider>
              </div>
              {!hasMobile && (
                <div className="steps-cover">
                  <img src="https://static.glovis.net/picture/public/images/contents/step-mobile-bg.png" alt="" />
                </div>
              )}
              {hasMobile && (
                <>
                  <button className="btn-prev-xs" onClick={PrevSlide} />
                  <button className="btn-next-xs" onClick={NextSlide} />
                </>
              )}
            </div>
          )}
          <Slider ref={rootSlider} {...settings}>
            {children}
          </Slider>
          {pagination === true && (
            <p className="pagination-num">
              {slideIndex + 1} / {children?.length || 1}
            </p>
          )}
        </Fragment>
      );
    }
  }
);

SlideBanner.propTypes = {
  children: PropTypes.node,
  carList: PropTypes.array,
  touch: PropTypes.bool,
  type: PropTypes.string,
  dots: PropTypes.bool,
  autoplay: PropTypes.bool,
  hasMarkup: PropTypes.array,
  customArrow: PropTypes.bool,
  screen: PropTypes.bool,
  screenInfo: PropTypes.array,
  multiNum: PropTypes.number,
  withCounter: PropTypes.bool,
  centerMode: PropTypes.bool
};

SlideBanner.displayName = 'SlideBanner';
export default SlideBanner;
