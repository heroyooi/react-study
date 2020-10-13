import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import CarFilter from '@src/components/common/CarFilter';
import BannerItem from '@src/components/common/banner/BannerItem';
import Button from '@lib/share/items/Button';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, mCarList } from '@src/dummy';

const AuctionList = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [listData, setListData] = useState(!hasMobile ? car_list : mCarList);
  const dummyData = {
    id: 1,
    name: "소나타소나타소나타소나타소나타소나타소나타",
    price: "20,909",
		image: "/images/dummy/product-img-01.png",
		alt: "차량 이미지",
		discount: 20,
		buttonName: '온라인구매',
		tags: [
			{color: 'blue60', value: 'EW'}
		],
		infos: ['17년식', '26,530km', '가솔린', '대구'],
		options: [
			{color: 'red', value: '라이브'}
		],
		problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
		likes: 48
  };

  const handleListMore = (e) => {
    e.preventDefault();
    setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData])
  };

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매낙찰차량 123,456대',
        options: ['back', 'search', 'gnb'],
        events: [null, handleRouter('/buy/listSearch'), null]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="list-sec">
          <div className="list-banner auction">
            <p className="tit tx-blue80">경매낙찰차량</p>
            <p className="exp">
              현대 오토벨 경매장에서만<br />
              낙찰된 믿을 수 있는 낙찰 차량만<br />
              모았습니다!
            </p>
          </div>
          <div className="content-wrap list-wrap mt20">
            <ul className="goods-list list-type vertical">
              {mCarList.map((v, i) => {
                return (
                  <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                )
              })}
            </ul>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="list-nav-sec">
        <ul className="content-wrap">
          <li><Link href="list"><a><i className="ico-allcar"></i><span>전체차량</span></a></Link></li>
          <li><Link href="liveList"><a><i className="ico-livestudio"></i><span>라이브스튜디오</span></a></Link></li>
          <li className="on"><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter section="auctionList" />
        </div>
        <div className="list-sec">
          <div className="list-banner auction">
            <p className="tit tx-blue80">경매낙찰차량</p>
            <p className="exp">
              현대 오토벨 경매장에서만 낙찰된<br />
              믿을 수 있는 낙찰 차량만 모았습니다!
            </p>
          </div>
          <div className="list-wrap">
            <ul className="goods-list col3">
              {listData.map((v, i) => {
                return (
                  <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                )
              })}
            </ul>
            <div className="cate-list-btn2">
              <button onClick={handleListMore}>더보기</button>
            </div>
          </div>
        </div>
      </div>

    </AppLayout>
  )
}

export default AuctionList
