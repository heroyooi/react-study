import React from 'react';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Virtual]);

const SwiperVirtual = () => {
  const slides = Array.from({ length: 1000 }).map((el, index) => `Slide ${index + 1}`);

  return (
    <Swiper spaceBetween={10} slidesPerView={3} virtual>
      {slides.map((slideContent) => {
        return (<SwiperSlide key={slideContent}>{slideContent}</SwiperSlide>);
      })}
  </Swiper>
  );
};

export default SwiperVirtual;