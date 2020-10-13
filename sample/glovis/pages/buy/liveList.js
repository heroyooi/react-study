import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import CarFilter from '@src/components/common/CarFilter';
import BannerItem from '@src/components/common/banner/BannerItem';
import Button from '@lib/share/items/Button';
import { PulseLoader } from "react-spinners";
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, mCarList } from '@src/dummy';

const LiveList = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_BUY });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '라이브스튜디오 123,456대',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#fff'
        }
      });
    }
  }, []);

  const [listData, setListData] = useState(!hasMobile ? car_list : mCarList);
  const dummyData = {
    id: 1,
    name: "새로운데이터",
    price: "20,909",
    image: "/images/dummy/product-img-01.png",
    alt: "차량 이미지",
    discount: 20,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' }
    ],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [
      { color: 'red', value: '라이브' }
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

  const [isLoadingM, setIsLoadingM] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(true);
  if (hasMobile) {
    const onScroll = useCallback(() => {
      if ((window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) && loadingFlag) {
        setLoadingFlag(false); //스크롤중에 호출 중복 방지
        setIsLoadingM(true); // 로딩이미지 on
        setListData(listData => [...listData, dummyData, dummyData, dummyData]); // dummy data append

        // 데이터 삽입 이후
        // setLoadingFlag(true);
        // setIsLoadingM(false);
      }
    }, [listData.length]);
  

    useEffect(() => {
      window.addEventListener("scroll",onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, [listData.length]);
    
    return (
      <AppLayout>
        <div className="list-sec">
          <div className="list-banner live">
            <p className="tit">오토벨 <span className="tx-red60">라이브 스튜디오</span>는?</p>
            <p className="exp">
              사고 유무 확인부터 성능까지!<br />
              차의 모든 것을 진단하여 알려드립니다!<br />
              차량 정보에서 <em className="option-tp2 bg-red">라이브</em> 뱃지를<br />
              확인하세요!
            </p>
            <Button size="mid" line="gray" color="black" color="gray" radius={true} title="오토벨 라이브 스튜디오 차량이란?" marginTop={16} width={238} href="liveGuide" />
          </div>
          <div className="content-wrap list-wrap mt20">
            <ul className="goods-list list-type vertical">
              {listData.map((v, i) => {
                return (
                  <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                )
              })}
            </ul>
            {isLoadingM &&
              <div className="more-loading">
                <PulseLoader
                  size={15}
                  color={"#ddd"}
                  loading={isLoadingM}
                />
              </div>
            }
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
          <li className="on"><Link href="liveList"><a><i className="ico-livestudio"></i><span>라이브스튜디오</span></a></Link></li>
          <li><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter section="liveList" />
        </div>
        <div className="list-sec">
          <div className="list-banner live">
            <p className="tit">오토벨 <span className="tx-red60">라이브 스튜디오</span>는?</p>
            <p className="exp">
              사고 유무 확인부터 성능까지!<br />
              차의 모든 것을 진단하여 알려드립니다!<br />
              차량 정보에서 <em className="option-tp2 bg-red">라이브</em> 뱃지를 확인하세요!
            </p>
            <Button size="mid" line="gray" color="black" radius={true} title="오토벨 라이브 스튜디오 차량이란?" marginTop={20} width={244} href="liveGuide" />
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

export default LiveList
