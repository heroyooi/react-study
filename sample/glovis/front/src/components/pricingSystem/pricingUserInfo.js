import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import { gInfoLive, getMemberPhoto } from '@src/utils/LoginUtils';
import { imgUrl as baseURL } from '@src/utils/HttpUtils';

const PricingUserInfo = ({ userName, viewableCnt, pricingTicketInfo, isEavluator }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');

  const imgOnError = useCallback(() => {
    setImgUrl('/images/contents/dealer-basic-img-big.png');
  }, []);

  useEffect(() => {
    const gInfo = gInfoLive();
    if (gInfo.id) {
      getMemberPhoto(gInfo.id).then((url) => {
        if (url) {
          setImgUrl(baseURL + url);
          setOriginalUrl(baseURL + url);
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="pricing-nav">
        <div className="pricing-aside">
          <div className="mem-profile">
            <p className="name">{userName}님</p>
            <div className="img-wrap" data-attr={originalUrl}>
              <img src={imgUrl ? `${imgUrl}` : '/images/contents/dealer-basic-img-big.png'} onError={imgOnError} alt="판매자 이미지" />
            </div>

            {!isEavluator && <Button size="mid" line="gray" color="darkgray" radius={true} title="마이페이지" width={98} href={'/mypage/dealer/sellcar/carManagement'} />}
          </div>
          <ul className="mem-used">
            <li>
              {isEavluator ? (
                ''
              ) : (
                <>
                  조회 가능 횟수
                  {pricingTicketInfo?.availableAdCnt === 0 ? (
                    <span className="tx-blue80">무료 {viewableCnt || 0}회</span>
                  ) : (
                    <span className="tx-blue80">{pricingTicketInfo?.availableAdCnt || 0}회</span>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
        <Button href="/mypage/dealer/sellcar/carManagement?management=adver&sub=1" size="full" background="blue80" title="이용권 구매하기" height={60} />
      </div>
    </React.Fragment>
  );
};

PricingUserInfo.propTypes = {
  pricingTicketInfo: PropTypes.object,
  userName: PropTypes.string,
  viewableCnt: PropTypes.number,
  isEavluator: PropTypes.bool
};

export default PricingUserInfo;
