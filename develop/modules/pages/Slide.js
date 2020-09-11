import React from 'react';
import styled from 'styled-components';

import Swiper from '../components/slide/Swiper';
import SwiperVirtual from '../components/slide/SwiperVirtual';
import SwiperThumbs from '../components/slide/SwiperThumbs';

const Section = ({ children }) => {
  const SectionWrapper = styled.div`
    padding: 10px;
    background: #eee;
    border-radius: 3px;
    border: 1px solid #ddd;
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  `
  return <SectionWrapper>{children}</SectionWrapper>;
}

const Slide = () => {
  const Title = styled.h1`
    font-size: 24px;
    margin-top: 50px;
    &:first-child {
      margin-top: 0;
    }
  `;
  const SubTitle = styled.h2`
    padidng: 10px 0;
    margin: 30px 0 10px;
  `;

  const dataList = [
    { id: 1, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_color_inspiration_full_option_front_side_intense_blue.png' },
    { id: 2, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_back_side.png' },
    { id: 3, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_front_side_intense_blue.png' },
    { id: 4, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_interior_modern_grey.png' },
    { id: 5, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_panorama_display.png' },
    { id: 6, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_embient_mood_lamp.png' },
    { id: 7, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_modern_grey_back_seat_woman.png' },
    { id: 8, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_interior_space.png' },
    { id: 9, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_design_inspiration_full_option_back_seat_air_vent.png' },
    { id: 10, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_interior_color_modern_full_option_black.png' },
    { id: 11, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_interior_color_modern_full_option_black.png' },
    { id: 12, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_convenience_voice_recognition.png' },
    { id: 13, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_convenience_individualization_profile.png' },
    { id: 14, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_convenience_dual_full_auto_air_conditional.png' },
    { id: 15, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_convenience_bluetooth_multi_connection.png' },
    { id: 16, image: 'https://www.hyundai.com/static/images/model/avante/model_avante_cn7_convenience_navigation_update.png' },
  ];

  return (
    <>
      <Section>
        <Title>Swiper Example</Title>

        <SubTitle>Swiper - Basic</SubTitle>
        <Swiper dataContext={dataList} />

        <SubTitle>Swiper - Virtual Slides</SubTitle>
        <SwiperVirtual />

        <SubTitle>Swiper - Thumbs</SubTitle>
        <SwiperThumbs dataContext={dataList} />
      </Section>
    </>
  );
};

export default Slide;