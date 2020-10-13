import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

export default function BuyCarNav({ nowPage }) {
  const handleOnClick = (e, url) => {
    e.preventDefault();
    Router.push(url);
  };
  return (
    <div className={nowPage !== 'certificationmall' ? "list-nav-sec" : "list-nav-sec cert"}>
      <ul className="content-wrap">
        <li className={nowPage === 'allcar' ? 'on' : ''}>
          <a href="#" tilte="전체차량 리스트 보기" onClick={(e) => handleOnClick(e, '/buycar/buyCarList')}>
            <i className="ico-allcar" />
            <span>전체차량</span>
          </a>
        </li>
        <li className={nowPage === 'livestudio' ? 'on' : ''}>
          <a href="#" title="라이브스튜디오 리스트 보기" onClick={(e) => handleOnClick(e, '/buycar/livestudio/buyCarList')}>
            <i className="ico-livestudio" />
            <span>라이브스튜디오</span>
          </a>
        </li>
        <li className={nowPage === 'auction' ? 'on' : ''}>
          <a href="#" title="경매낙찰차량 리스트 보기" onClick={(e) => handleOnClick(e, '/buycar/auction/buyCarList')}>
            <i className="ico-bid" />
            <span>스마트옥션 인증</span>
          </a>
        </li>
        <li className={(nowPage === 'certificationmall') || (nowPage === 'certificationview') ? 'on' : ''}>
          <a href="#" title="인증몰 리스트 보기" onClick={(e) => handleOnClick(e, '/buycar/certificationmall/buyCarCertiMall')}>
            <i className="ico-income" />
            <span>인증중고차몰</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

BuyCarNav.propTypes = {
  nowPage: PropTypes.string
};
