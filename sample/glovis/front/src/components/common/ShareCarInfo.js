import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import { clipboardCopy } from '@src/utils/CommonUtil';

import KakaoShareButton from '@src/components/common/share/KakaoShareButton';

const ShareCarInfo = memo(({ appUrl, image, description, mUrl, title, url }) => {
  const [clipboardText, setClipBoardText] = useState(null);

  const sendCallback = () => {
    // eslint-disable-next-line no-alert
    alert('전송이 완료되었습니다.');
  };

  const handleCopyUrl = useCallback(
    (e) => {
      e.preventDefault();
      clipboardCopy(url);
      // eslint-disable-next-line no-alert
      alert('URL이 복사되었습니다.');
    },
    [url]
  );

  useEffect(() => {
    setClipBoardText(mUrl || url);
  }, [mUrl, url]);

  return (
    <>
      <ul className="ico-list ico-sns-wrap info-fore-tooltip">
        <li>
          <KakaoShareButton appUrl={appUrl} imageUrl={image} mUrl={mUrl} url={url} title={title || '현대 글로비스 - 시세조회'} description={description} sendCallback={sendCallback}>
            <i className="ico-talk" />
            <span className="ico-class">카카오톡</span>
          </KakaoShareButton>
        </li>
        <li>
          <FacebookShareButton url={mUrl || url}>
            <i className="ico-facebook" />
            <span className="ico-class">페이스북</span>
          </FacebookShareButton>
        </li>
        <li>
          <button className="clip" data-clipboard-action="copy" data-clipboard-text={clipboardText} onClick={handleCopyUrl}>
            <i className="ico-url" />
            <span className="ico-class">URL</span>
          </button>
        </li>
      </ul>
    </>
  );
});

ShareCarInfo.propTypes = {
  appUrl: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  mUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

ShareCarInfo.defaultProps = {
  description: 'Hyudai Glovis',
  image: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/customer-service/car-management-service/usedcar/autobell-logo-pc.jpg',
  title: 'Autobell'
};
ShareCarInfo.displayName = 'ShareCarInfo';
export default ShareCarInfo;
