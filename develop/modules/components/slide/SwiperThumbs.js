import React, { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Thumbs]);

const SwiperThumbs = ({ dataContext }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div style={{width: 300}}>
      <Swiper slidesPerView={1} thumbs={{ swiper: thumbsSwiper }} loop={true}>
        {dataContext.map((v) => <SwiperSlide key={v.id}><img src={v.image} alt="" /></SwiperSlide>)}
      </Swiper>

      <Swiper slidesPerView={3} onSwiper={setThumbsSwiper} centeredSlides={true} centeredSlidesBounds={true}>
        {dataContext.map((v) => <SwiperSlide key={v.id}><img src={v.image} alt="" /></SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default SwiperThumbs;