import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Button from '@lib/share/items/Button';

const PricingUserInfo = ({ userName, viewableCnt, pricingTicketInfo }) => {
  return (
    <React.Fragment>
      <div className="pricing-nav">
        <div className="pricing-aside">
          <div className="mem-profile">
            <p className="name">{userName}님</p>
            <div className="img-wrap">
              <img src="/images/dummy/dealer-img-big.png" alt="판매자 이미지" />
            </div>
            <Button size="mid" line="gray" color="darkgray" radius={true} title="마이페이지" width={98} />
          </div>
          <ul className="mem-used">
            <li>
              오늘 조회가능 횟수
              <span className="tx-blue80">무료 {viewableCnt}회</span>
            </li>
            {!isEmpty(pricingTicketInfo) && (
              <li>
                사용중인 이용권
                <span className="tx-blue80">
                  {pricingTicketInfo.usePeriod}
                  <span>(사용기간 {moment(pricingTicketInfo.expiredDate).format('YYYY.MM.DD')}까지)</span>
                </span>
              </li>
            )}
          </ul>
        </div>
        <Button href="/marketPrice/marketPrice" size="full" background="blue80" title="이용권 구매하기" height={60} />
        <div className="bn-item">
          <p>시세조회</p>
          <span>
            현대 오토벨이 제공하는
            <br />
            내차 팔 때 가격!
            <br />
            시세리포트
            <Link href="/marketPrice/marketPrice">
              <a>바로가기</a>
            </Link>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

PricingUserInfo.propTypes = {
  pricingTicketInfo: PropTypes.object,
  userName: PropTypes.string,
  viewableCnt: PropTypes.number
};

export default PricingUserInfo;
