import { useCallback } from 'react';
import Slider from 'react-slick';
import Button from '@lib/share/items/Button';
import InputPic from '@lib/share/items/InputPic';
import ImgCover from '@lib/share/items/ImgCover';

const CarImageUpload = () => {
  const PrevArrow = useCallback(({ onClick }) => <button className="btn-arrow-prev-mid" onClick={onClick}></button>, []);
  const NextArrow = useCallback(({ onClick }) => <button className="btn-arrow-next-mid" onClick={onClick}></button>, []);
  const settings = {
      dots: false,
      infinite: true,
      draggable: false,
      touchMove: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />
  }
  return (
    <div className="car-img-upload slide">
      <div className="tit-wrap">
        <h5>차량 정보</h5>
      </div>
      <div className="car-img-area">
        <div className="img-wrap">
          <ImgCover src="/images/dummy/list-auction-img-1.png" alt="홈서비스 차량 이미지" />
        </div>
        <div className="slider-wrap">

          <Slider {...settings}>
            <div className="inner">
              <InputPic title="차량 전면" applyImg="/images/dummy/list-product-img-01.png" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 후면" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 좌측" applyImg="/images/dummy/list-auction-img-1.png" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 우측" applyImg="/images/dummy/list-auction-img-2.png" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="계기판" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 전면" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 후면" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 좌측" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 우측" disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="내부 계기판" disabled={true} />
            </div>
          </Slider>

        </div>
      </div>
      <p className="tx-exp-tp2">* 차량 사진은 15개까지 등록가능합니다.</p>
      <Button className="fr" size="big" background="blue80" title="차량 사진 수정" width={180} href="/sell/selfStep03" />
    </div>
  )
}

export default CarImageUpload;