import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './Swiper.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwiperBasic = ({ dataContext }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {dataContext.map((v) => <SwiperSlide key={v.id}><img src={v.image} alt="" /></SwiperSlide>)}
    </Swiper>
  );
};

export default SwiperBasic;