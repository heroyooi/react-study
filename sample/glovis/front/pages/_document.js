import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Document, { Main, NextScript } from 'next/document';
import getConfig from 'next/config';
import { getIsMobile } from '@src/utils/CommonUtil';

const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const hyundaiUri = ['marketpricehyundai', 'marketsearch?hyundai=Y'];
    const hasMobile = getIsMobile(ctx.req);
    const hasHyundai = hyundaiUri.some((uri) => {
      if ((ctx.req.originalUrl || '').includes(uri)) {
        return true;
      }
    });
    return Object.assign({ ...initialProps }, { hasMobile, hasHyundai });
  }


  render() {
    if (this.props.hasMobile === true) {
      return (
        <html lang="ko">
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Cache-Control" content="no-cache" />
            <meta httpEquiv="Pragma" content="no-cache" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <meta name="description" content="중고차" />
            <meta name="keywords" content="현대자동차그룹, 현대글로비스, 스마트옥션, 중고차매매, 중고차경매, 입찰대행, 홈페이지" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Hyundai GLOVIS" />
            <meta property="og:title" content="Hyundai GLOVIS" />
            <meta property="og:description" content="중고차" />
            <meta property="og:image" content="" />
            <meta name="format-detection" content="telephone=no, address=no, email=no" />
            <title>메인 | Hyundai GLOVIS - 모바일</title>
            {/*google 운영일때만 쓰고 아니면 주석처리*/}
            {/* <script src="https://www.googletagmanager.com/gtag/js?id=UA-163217058-4" async={true} /> */}
            {/*google 운영일때만 쓰고 아니면 주석처리*/}
            {/* <script src="/js/googleAnalysis.js" async={true} /> */}
            {/*google 운영일때만 쓰고 아니면 주석처리*/}
            {/* <script src="/js/goolgTagMgmt.js" async={true} /> */}

            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/reset.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-common.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-layout.css`} />

            {/* 플러그인 css */}
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/slick.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/slick-theme.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/calendar.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/rodal.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/input-range.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-tabs.css`} />

            {/* 가이드 css, 배포대상 아님 */}
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/prism.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-style.css`} />

            {/* 섹션별 css */}
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-main.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-buy.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-sell.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-marketPrice.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-pricingSystem.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-member.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-help.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-event.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-homeService.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-mypageDealer.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-autoAuction.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-mypage.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-dealing.css`} />
            <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/m-financeService.css`} />
            {this.props.hasHyundai === true ? <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/hyundai.css`} /> : null}
          </head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `function rtnShootingComplete(params) {
                  this.dispatchEvent(new CustomEvent('onLiveShootingComplete', { bubbles: true, detail: { params: params } }));
                }
              `
            }}
          />
          <body id="docBody">
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
    return (
      <html lang="ko">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Cache-Control" content="no-cache" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <meta name="description" content="중고차" />
          <meta name="keywords" content="현대자동차그룹, 현대글로비스, 스마트옥션, 중고차매매, 중고차경매, 입찰대행, 홈페이지" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Hyundai GLOVIS" />
          <meta property="og:title" content="Hyundai GLOVIS" />
          <meta property="og:description" content="중고차" />
          <meta property="og:image" content="" />
          <meta name="format-detection" content="telephone=no, address=no, email=no" />
          {/*google, 네이버 클롤링 검색 방지 태그 */}
          <meta name="ROBOTS" content="NOINDEX,NOFOLLOW" />


          <title>메인 | Hyundai GLOVIS</title>
          {/* <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charSet="utf-8" /> */}
          {/*google 운영일때만 쓰고 아니면 주석처리*/}
          {/* <script src="https://www.googletagmanager.com/gtag/js?id=UA-163217058-4" async={true} /> */}
          {/*google 운영일때만 쓰고 아니면 주석처리*/}
          {/* <script src="/js/googleAnalysis.js" async={true} /> */}
          {/*google 운영일때만 쓰고 아니면 주석처리*/}
          {/* <script src="/js/goolgTagMgmt.js" async={true} /> */}

          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/reset.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/common.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/layout.css`} />

          {/* 플러그인 css */}
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/slick.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/slick-theme.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/calendar.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/rodal.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/input-range.css`} />

          {/* 가이드 css, 배포대상 아님 */}
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/prism.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/style.css`} />

          {/* 섹션별 css */}
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/main.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/buy.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/sell.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/marketPrice.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/homeService.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/mypageDealer.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/mypage.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/autoAuction.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/pricingSystem.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/member.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/event.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/help.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/report.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/dealing.css`} />
          <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/financeService.css`} />
          {this.props.hasHyundai === true ? <link rel="stylesheet" href={`${publicRuntimeConfig.staticFolder}/css/hyundai.css`} /> : null}
        </head>
        <body id="docBody">
          {/* 운영에만 배포해주시고, 개발은 주석처리 */}
          <noscript>{/* <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MXRQWBL" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe> */}</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  hasMobile: PropTypes.bool
};

export default MyDocument;
