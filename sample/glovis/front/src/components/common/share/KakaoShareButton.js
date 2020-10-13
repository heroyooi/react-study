/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const globalThis = require('globalthis')();
const isClient = !!globalThis.window;

const KakaoShareButton = ({
  appUrl,
  mUrl,
  url,
  imageUrl = 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/customer-service/car-management-service/usedcar/autobell-logo-pc.jpg',
  children,
  installTalk = false,
  title = 'Autobell',
  description = 'Hyudai Glovis'
}) => {
  const btnRef = useRef();
  const init = () => {
    if (!globalThis?.window?.Kakao?.isInitialized()) {
      globalThis?.window?.Kakao?.init('4a7be481fb849c9e5bfc5a9c4436ac3b');
    }
    globalThis?.window?.Kakao?.Link.createDefaultButton({
      container: btnRef.current,
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: mUrl || url,
          webUrl: url
        }
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: mUrl || url,
            webUrl: url
          }
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: appUrl || mUrl || url,
            webUrl: appUrl || url || mUrl
          }
        }
      ],
      installTalk,
      fail(err) {
        console.error('에러 확인 : ', err);
      }
    });
  };

  useEffect(() => {
    if (isClient) {
      if (!globalThis.window.document.getElementById('KakaoJSSDK')) {
        const scriptKakaoJS = globalThis.window.document.createElement('script');
        scriptKakaoJS.id = 'KakaoJSSDK';
        scriptKakaoJS.src = '//developers.kakao.com/sdk/js/kakao.min.js';
        globalThis.window.document.body.appendChild(scriptKakaoJS);

        scriptKakaoJS.onload = () => {
          init();
        };
      } else {
        init();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button id={`kakaoShareBtn`} ref={btnRef}>
        {children}
      </button>
    </>
  );
};

KakaoShareButton.propTypes = {
  appUrl: PropTypes.string,
  mUrl: PropTypes.string,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  children: PropTypes.any,
  installTalk: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

KakaoShareButton.displayName = 'KakaoShareButton';
export default memo(KakaoShareButton);
