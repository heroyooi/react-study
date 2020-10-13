import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import Fullscreen from 'react-full-screen';
import Iframe from 'react-iframe';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { imgUrls } from '@src/utils/HttpUtils';
import CheckBox from '@lib/share/items/CheckBox';
import Magnifier from '@lib/share/items/Magnifier';
import ImgCover from '@lib/share/items/ImgCover';

// 내부,외부 360 이미지 버튼 활성/비활성
function is360(src, setState) {
  const img = new Image();
  img.src = src;
  img.onerror = () => {
    setState(false);
  };
  img.onload = () => {
    setState(true);
  };
}

const LiveStudio = memo(({ crId, carGallery, isMobile }) => {
  // carGallery = [...sample];
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [liveStNav1, setLiveStNav1] = useState(null);
  const [liveStNav2, setLiveStNav2] = useState(null);
  const [slideActive, setSlideActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [liveStMode, setLiveStMode] = useState('car'); // car, outside, inside
  const [isFull, setIsFull] = useState(false);
  const [imgSrc, setImgSrc] = useState(Array.isArray(carGallery) && carGallery.length > 0 ? `${imgUrls}${carGallery[0].bImg}` : '');
  const liveStSlider1 = useRef(null);
  const liveStSlider2 = useRef(null);
  const [guideDim, setGuideDim] = useState(true);
  const Innerview = `${imgUrls}/picture/sellcar/prd/carImg/inner.html?crId=${crId}`; // inner.html - new pano2vrPlayer("container").setBasePath(`${crId}/live360/tiles`)
  const Outerview = `${imgUrls}/picture/sellcar/prd/carImg/outer.html?crId=${crId}`; // outer.html - new object2vrPlayer("container").setBasePath(`${crId}/live360/images`)
  const cookieName = 'guide-show-up-today';
  const [is360pic, setId360pic] = useState(false);
  const init360url = `${imgUrls}/picture/sellcar/prd/carImg/${crId}/live360/images/img_0_0_0.jpg`;
  useEffect(() => {
    is360(init360url, setId360pic);
  }, []);

  const settings = {
    infinite: true,
    draggable: false,
    touchMove: false
  };

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

  const handleLiveMode = useCallback((e) => {
    setLiveStMode(e.target.dataset.livemode);
  }, []);

  const goFull = useCallback(() => {
    setIsFull(true);
  }, []);

  useEffect(() => {
    setLiveStNav1(liveStSlider1.current);
    setLiveStNav2(liveStSlider2.current);
  }, [liveStMode]);

  const guideDimClose = useCallback(() => {
    setGuideDim(false);
  }, []);

  const handleChangeToday = useCallback(() => {}, []);

  return (
    <div className={slideActive ? 'live-studio active' : 'live-studio'}>
      <div className="ls-visual">
        {liveStMode === 'car' && !isEmpty(carGallery) && (
          <Slider ref={liveStSlider1} asNavFor={liveStNav2} prevArrow={<PrevArrow />} nextArrow={<NextArrow />} slidesToShow={1} fade={true} {...settings} onInit={() => setSlideActive(true)}>
            {carGallery.map((v, i) =>
              !hasMobile ? <Magnifier key={i} imgUrl={`${imgUrls}${v.bImg}`} alt={v.bAlt} mode="live-studio" /> : <ImgCover key={i} src={`${imgUrls}${v.bImg}`} alt={v.bAlt} />
            )}
          </Slider>
        )}

        {liveStMode !== 'car' && (
          <>
            {guideDim && (
              <div className="live-guide">
                <div className="dim" />
                <div className="dim-cont">
                  <a href="#" className="layer-close" onClick={guideDimClose} />
                  <div className="one-day">
                    <CheckBox id="chk-guide-check" title="1일간 다시보지 않기" onChange={handleChangeToday} />
                  </div>
                  {!hasMobile ? (
                    <>
                      <div className="mouse-icon">
                        <img src="/images/contents/drag-guide.svg" alt="마우스 아이콘" />
                      </div>
                      <p className="text">
                        <span>마우스를 드래그</span>하여 차량 외부를 확인할 수 있습니다.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mouse-icon">
                        <img src="/images/contents/fill-1.svg" alt="드래그 아이콘" />
                      </div>
                      <p className="text">
                        손가락으로 터치해서
                        <br />
                        차량 외부를 확인할 수 있습니다.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
            <Iframe
              url={liveStMode === 'outside' ? Outerview : Innerview}
              width={!hasMobile ? '1200' : '100%'}
              height={!hasMobile ? '675' : '100%'}
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              allowFullScreen="true"
              scrolling="no"
            />
          </>
        )}
      </div>
      <div className="ls-control">
        <div className="lsc-left">
          <button className={liveStMode === 'car' ? 'on' : null} data-livemode={'car'} onClick={handleLiveMode}>
            차량사진
          </button>
          {is360pic && (
            <>
              <button className={liveStMode === 'outside' ? 'on' : null} data-livemode={'outside'} onClick={handleLiveMode}>
                외부 360°
              </button>
              <button className={liveStMode === 'inside' ? 'on' : null} data-livemode={'inside'} onClick={handleLiveMode}>
                내부 360°
              </button>
            </>
          )}
        </div>
        {!hasMobile && <div className="lsc-center">{/* <button className="btn-fullscreen" onClick={goFull}>
              전체화면
            </button> */}</div>}
        {liveStMode === 'car' && !isEmpty(carGallery) && !hasMobile && (
          <div className={carGallery.length > 5 ? 'lsc-thumb' : 'lsc-thumb static'}>
            <Slider
              ref={liveStSlider2}
              asNavFor={liveStNav1}
              slidesToShow={5}
              swipeToSlide={true}
              focusOnSelect={true}
              variableWidth={true}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
              className="slick-sthumb"
              {...settings}
              afterChange={() => setUpdateCount((prev) => prev + 1)}
              beforeChange={(current, next) => {
                setSlideIndex(next);
                setImgSrc(`${imgUrls}${carGallery[next].bImg}`);
              }}
            >
              {carGallery.map((v, i) => (
                <div key={i} style={{ width: 68 }}>
                  <ImgCover src={`${imgUrls}${v.bImg}`} alt={v.bAlt} />
                </div>
              ))}
            </Slider>
            <div className="ls-thumb-range">
              <span className="gage" style={{ width: ((slideIndex + 1) / (carGallery?.length || 1)) * 100 + '%' }} />
            </div>
          </div>
        )}
      </div>
      <Fullscreen enabled={isFull} onChange={(isFull) => setIsFull(isFull)}>
        <div
          className="ls-fullscreen"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </Fullscreen>
    </div>
  );
});

LiveStudio.propTypes = {
  crId: PropTypes.string,
  carGallery: PropTypes.array,
  isMobile: PropTypes.bool
};

LiveStudio.displayName = 'LiveStudio';
export default LiveStudio;
