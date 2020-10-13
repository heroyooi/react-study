import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { useState, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import TopWrapper from './TopWrapper';
import Footer from './Footer';
import QuickMenu from './QuickMenu';
import MobQuickMenu from './MobQuickMenu';
import { preventScroll } from '@src/utils/CommonUtil';

export const DimmContext = createContext();

const AppLayout = ({ children }) => {
  const { hasMobile, mPdBottom, mBgColor, isSection, mFooterExist, mQuickExist, mFullpagePopup } = useSelector((state) => state.common);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasMobile) preventScroll(mFullpagePopup);
  }, [mFullpagePopup]);

  if (hasMobile) {
    return (
      <div id="wrap">
        <TopWrapper />
        <section id="container" style={{ paddingBottom: mPdBottom, backgroundColor: mBgColor }}>
          {children}
        </section>
        {// 푸터 나오는 섹션 - 메인, 매매가이드, 고객센터
        (isSection === 'main' || isSection === 'guide' || isSection === 'customer' || mFooterExist) && // 푸터 예외 처리 섹션 - 내차팔기, 시세조회, 프라이싱 시스템, 스마트옥션, 마이페이지(일반·딜러)
          // 푸터 안나오는 섹션 - 내차사기, 홈서비스
          isSection !== 'buy' &&
          isSection !== 'homeService' && <Footer />}
        {(isSection === 'main' ||
        isSection === 'guide' || // 플로팅 나오는 섹션 - 메인,  매매가이드
          mQuickExist) && // 플로팅 예외 처리 섹션 - 내차사기, 시세조회, 홈서비스, 마이페이지(일반·딜러)
          // 플로팅 안나오는 섹션 - 내차팔기, 스마트옥션, 프라이싱, 이벤트, 고객센터
          isSection !== 'sell' &&
          isSection !== 'autoAuction' &&
          isSection !== 'pricingSystem' &&
          isSection !== 'event' &&
          isSection !== 'customer' && <MobQuickMenu />}
      </div>
    );
  }

  return (
    <div id="wrap">
      <TopWrapper />

      <section id="container">{children}</section>
      <QuickMenu />
      {/**
       *
       */}
      <Footer />
      {isLoading && (
        <div className="page-loading">
          <span className="dim"></span>
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
