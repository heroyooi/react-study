import { useCallback } from 'react';
import Slider from 'react-slick';
import Button from '@lib/share/items/Button';
import InputPic from '@lib/share/items/InputPic';
import ImgCover from '@lib/share/items/ImgCover';
import { imgUrl } from '@src/utils/HttpUtils';

const carImage = {};

const CarImageUpload = ({ modifyHref = '/sell/selfStep03', photoList = [], modify = true }) => {
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
  };

  const applyImg = (sortNo) => photoList.find((item) => item.sortNo === sortNo);

  return (
    <div className="car-img-upload slide">
      <div className="tit-wrap">
        <h5>차량 정보</h5>
      </div>
      <div className="car-img-area">
        <div className="img-wrap">
          {/* <ImgCover src={photoList[0] ? `${imgUrl}${photoList[0].phtUrl}` : undefined} alt="홈서비스 차량 이미지" /> */}
          <ImgCover src={photoList ? `${imgUrl}${applyImg(1).phtUrl}` : undefined} alt="홈서비스 차량 이미지" />
        </div>
        <div className="slider-wrap">
          <Slider {...settings}>
            <div className="inner">
              <InputPic title="차량 전면" applyImg={photoList ? applyImg(1) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 후면" applyImg={photoList ? applyImg(2) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 좌측" applyImg={photoList ? applyImg(3) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량 우측" applyImg={photoList ? applyImg(4) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="계기판" applyImg={photoList ? applyImg(5) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="휠타이어" applyImg={photoList ? applyImg(6) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="엔진룸" applyImg={photoList ? applyImg(7) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="내부(앞) 전경" applyImg={photoList ? applyImg(12) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="센터페시아 전경" applyImg={photoList ? applyImg(13) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="룸미러 전경" applyImg={photoList ? applyImg(14) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="차량상단" applyImg={photoList ? applyImg(15) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="트렁크" applyImg={photoList ? applyImg(16) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="기어 박스" applyImg={photoList ? applyImg(17) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="후방 카메라" applyImg={photoList ? applyImg(18) : undefined} disabled={true} />
            </div>
            <div className="inner">
              <InputPic title="스크래치" applyImg={photoList ? applyImg(19) : undefined} disabled={true} />
            </div>
          </Slider>
        </div>
      </div>
      <p className="tx-exp-tp2">* 차량 사진은 15개까지 등록가능합니다.</p>
      {modify && <Button className="fr" size="big" background="blue80" title="차량 사진 수정" width={180} href={modifyHref} />}
    </div>
  );
};

export default CarImageUpload;
