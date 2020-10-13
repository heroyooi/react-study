import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ImgCover from '@lib/share/items/ImgCover';

/*
html 변경이력
03.17 : [모바일] 슬라이드 작업, #a1 부분 참고
*/
const SlideAuction = ({car_list}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [slideActive, setSlideActive] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [updateCount, setUpdateCount] = useState(0)

  const NextArrow = ({ onClick }) => {
    return (<button type="button" className="btn-next" onClick={onClick}><span className="hide">다음</span></button>)
  }
  const PrevArrow = ({ onClick }) => {
    return (<button type="button" className="btn-prev" onClick={onClick}><span className="hide">이전</span></button>)
  }

  const settings = {
    slidesToShow: 1,
    dots: false,
    infinite: hasMobile ? false : true, // #a1
    speed: 500,
    variableWidth: true,    
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: hasMobile ? true : false, // #a1
    touchMove: hasMobile ? true : false, // #a1
    onInit: () => {
      setSlideActive(true)
    },
    afterChange: () => {
      setUpdateCount(prevCount => prevCount + 1)
    },
    beforeChange: (current, next) => {
      setSlideIndex(next)
    }
  }

  let slider_style = '';
  if (slideActive) {
    slider_style = "auction-slider active"
  } else {
    slider_style = "auction-slider"
  }

  return (
    <>
      <div className={slider_style}>
        <Slider {...settings}>
          {car_list.map((v, i) => <ImgCover key={i} src={v.bImg} alt={v.bAlt} />)}
        </Slider>
        {/* <div className="auction-range"><span className="gage" style={{width: (slideIndex+1)/car_list.length*100+'%'}}></span></div> */}
      </div>
      {!hasMobile && <div className="auction-exp">
        <p className="tx-exp-tp2">* 현대 글로비스 오토옥션을 통한 믿을 수 있는 경매 낙찰 차량 입니다.</p>
        <p className="pagination-num"><span>{slideIndex+1}</span>/{car_list.length}</p>
      </div>}
    </>
  )  
}

SlideAuction.propTypes = {
  car_list: PropTypes.array
}

export default SlideAuction