import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import ImgCover from '@lib/share/items/ImgCover';

const MypageSlideGallery = ({car_gallery}) => {

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const NextArrow = ({ onClick }) => {
    return (<button type="button" className="btn-next" onClick={onClick}><span className="hide">다음</span></button>)
  }
  const PrevArrow = ({ onClick }) => {
    return (<button type="button" className="btn-prev" onClick={onClick}><span className="hide">이전</span></button>)
  }

  const NextSlide = () => {
    slider2.current.slickNext();
  }
  const PrevSlide = () => {
    slider2.current.slickPrev();
  }

  return (
    <div className="car-img-area mypage">
      <div className="img-wrap">
        <Slider
          ref={slider1}
          asNavFor={nav2}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >{car_gallery.map((v, i) => <ImgCover src={v.bImg} alt={v.bAlt} />)}</Slider>
      </div>      
      <div className="slider-wrap">
        <button className="btn-prev-xs" onClick={PrevSlide}></button>
        <button className="btn-next-xs" onClick={NextSlide}></button>
        <Slider
          ref={slider2}
          asNavFor={nav1}
          slidesToShow={5}
          focusOnSelect={true}
        >{car_gallery.map((v, i) => <ImgCover src={v.bImg} alt={v.bAlt} />)}</Slider>
      </div>
    </div>
  )
}

export default MypageSlideGallery;