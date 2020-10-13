import { useState, useRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import Fullscreen from "react-full-screen";
import Magnifier from '@lib/share/items/Magnifier';
import ImgCover from '@lib/share/items/ImgCover';

const LiveStudio = ({car_gallery}) => {
  const [liveStNav1, setLiveStNav1] = useState(null);
  const [liveStNav2, setLiveStNav2] = useState(null);
  const [slideActive, setSlideActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [liveStMode, setLiveStMode] = useState('car'); // car, outside, inside
  const [isFull, setIsFull] = useState(false);
  const [imgSrc, setImgSrc] = useState(car_gallery[0].bImg);
  const liveStSlider1 = useRef(null);
  const liveStSlider2 = useRef(null);
  useEffect(() => {
    setLiveStNav1(liveStSlider1.current);
    setLiveStNav2(liveStSlider2.current);
  }, [liveStMode]);
  const NextArrow = useCallback(({ onClick }) => {
    return (<button type="button" className="btn-next" onClick={onClick}><span className="hide">다음</span></button>)
  }, []);
  const PrevArrow = useCallback(({ onClick }) => {
    return (<button type="button" className="btn-prev" onClick={onClick}><span className="hide">이전</span></button>)
  }, []);
  let settings = {
    infinite: true,
    draggable: false,
    touchMove: false,
  }
  let liveStudioClass = '';
  liveStudioClass = slideActive ? "live-studio active" : "live-studio";
  const handleLiveMode = (mode) => () => {
    setLiveStMode(mode);
  }
  const goFull = useCallback(() => {
    setIsFull(true);
  }, []);
  const fullScreenStyle = {
    backgroundImage: `url(${imgSrc})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
  } 

  return (
    <div className={liveStudioClass}>
      <div className="ls-visual">
        {
          liveStMode === 'car' &&
          <Slider
            ref={liveStSlider1}
            asNavFor={liveStNav2}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            slidesToShow={1}
            fade={true}
            {...settings}
            onInit={() => setSlideActive(true)}
          >
            {car_gallery.map((v, i) => <Magnifier key={i} imgUrl={v.bImg} alt={v.bAlt} mode="live-studio" />)}
          </Slider>
        }
        
      </div>
      <div className="ls-control">
        <div className="lsc-left">
          <button className={liveStMode === 'car' ? "on" : null} onClick={handleLiveMode('car')}>차량사진</button>
          <button className={liveStMode === 'outside' ? "on" : null} onClick={handleLiveMode('outside')}>외부 360°</button>
          <button className={liveStMode === 'inside' ? "on" : null} onClick={handleLiveMode('inside')}>내부 360°</button>
        </div>
        <div className="lsc-center">
          {/* <button className="btn-start">시작</button> */}
          <button className="btn-fullscreen" onClick={goFull}>전체화면</button>
        </div>
        {
          liveStMode === "car" && // 차량사진일 경우
          <div className={car_gallery.length > 5 ? "lsc-thumb" : "lsc-thumb static"}>
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
              afterChange={() => setUpdateCount(prev => prev + 1)}
              beforeChange={
                (current, next) => {
                  setSlideIndex(next);
                  setImgSrc(car_gallery[next].bImg);
                }
              }
            >
              {car_gallery.map((v, i) => <div key={i} style={{ width: 68 }}><ImgCover src={v.bImg} alt={v.bAlt} /></div>)}
            </Slider>
            <div className="ls-thumb-range"><span className="gage" style={{width: (slideIndex+1)/car_gallery.length*100+'%'}}></span></div>
          </div>
        }
        
      </div>
      <Fullscreen
        enabled={isFull}
        onChange={isFull => setIsFull(isFull)}
      >
        <div className="ls-fullscreen" style={fullScreenStyle}></div>
      </Fullscreen>
    </div>
  )
}

export default LiveStudio;