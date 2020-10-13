import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import SearchArea from '@src/components/common/SearchArea';
import CarFilter from '@src/components/common/CarFilter';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { PulseLoader } from "react-spinners";
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, car_list3, car_list4, mCarList } from '@src/dummy';

const List = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_BUY });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '검색 결과 123,456 대',
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
    }
  }, []);

  // 차량 목록 더보기
  const [listData1, setListData1] = useState(hasMobile ? mCarList : car_list4)
  const [listData2, setListData2] = useState(car_list3)
  const dummyData = {
    name: "새로 추가된 차 이름",
    price: "3,100",
    image: "/images/dummy/product-img-01.png",
    alt: "차량 이미지",
    discount: 20,
    isButton: true,
    tags: [
      { color: 'blue60', value: 'EW' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [
      { color: 'red', value: '라이브' }
    ],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: "48",
    id: '새로 추가된 데이터 id'
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingM, setIsLoadingM] = useState(false);
  const handleListMore1 = (e) => {
    e.preventDefault()
    setListData1(listData1 => [...listData1, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData])
  };
  const handleListMore2 = (e) => {
    e.preventDefault()
    setIsLoading(true)
    //setListData2(listData2 => [...listData2, dummyData, dummyData, dummyData, dummyData, dummyData])
  };
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  };

  const [loadingFlag, setLoadingFlag] = useState(true);
  if (hasMobile) {
    const onScroll = useCallback(() => {
      if ((window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) && loadingFlag) {
        setLoadingFlag(false); //스크롤중에 호출 중복 방지
        setIsLoadingM(true); // 로딩이미지 on
        setListData1(listData1 => [...listData1, dummyData, dummyData, dummyData]); // dummy data append

        // 데이터 삽입 이후
        // setLoadingFlag(true);
        // setIsLoadingM(false);
      }
    }, [listData1.length]);
  

    useEffect(() => {
      window.addEventListener("scroll",onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, [listData1.length]);
  
    return (
      <AppLayout>
        {
          withoutList === true
            ? (
              <>
                <div className="search-none bg">
                  <h3>검색결과가 없습니다.</h3>
                  <p>
                    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                  </p>
                  <p className="tx-disabled">
                    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                  </p>
                </div>
                <div className="content-wrap">
                  <div className="list-wrap">
                    <h3 className="tit1 mt32 mb16">오토벨스마트 추천</h3>
                    <ul className="goods-list list-type">
                      {mCarList.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>
                  </div>
                  <div className="list-wrap">
                    <h3 className="tit1 mt32 mb16">동급차량</h3>
                    <ul className="goods-list list-type">
                      {mCarList.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="list-slick search-result">
                  <h2>
                    라이브 스튜디오 차량
                    <Button className="fr" size="sml" line="gray" radius={true} title="전체보기" width={61} height={30} href={"/buy/liveList"} nextLink={true} />
                  </h2>
                  <ul className="goods-list">
                    <SlideBanner car_list={mCarList} touch={true} dots={true} autoplay={false} customArrow={true} multiNum={1} centerMode={true} infinite={false}></SlideBanner>
                  </ul>
                </div>
                <div className="list-slick search-result">
                  <h2>
                    우대등록 / 경매 낙찰 차량
                    <Button className="fr" size="sml" line="gray" radius={true} title="전체보기" width={61} height={30} href={"/buy/auctionList"} nextLink={true} />
                  </h2>
                  <ul className="goods-list">
                    <SlideBanner car_list={mCarList} touch={true} dots={true} autoplay={false} customArrow={true} multiNum={1} centerMode={true} infinite={false}></SlideBanner>
                  </ul>
                </div>
                <div className="content-wrap list-wrap general">
                  <div className="list-filter">
                    <MobSelectBox width={136} options={[
                      { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                      { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                    ]} />
                  </div>
                  <TabMenu type="type8" defaultTab={1} mount={false}>
                    <TabCont id="tab8-1" index={0}>
                      <ul className="goods-list card-type">
                        {listData1.map((v, i) => {
                          return (
                            <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        })}
                      </ul>
                    </TabCont>
                    <TabCont id="tab8-2" index={1}>
                      <>
                      <ul className="goods-list list-type">
                        {listData1.map((v, i) => {
                          return (
                            <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
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
                      </>
                    </TabCont>
                  </TabMenu>
                </div>
              </>
            )
        }
      </AppLayout>
    )
  }
  return (
    // <Loading isLoading={isLoading}>
    <AppLayout>
      <div className="list-nav-sec">
        <ul className="content-wrap">
          <li className="on"><Link href="list"><a><i className="ico-allcar"></i><span>전체차량</span></a></Link></li>
          <li><Link href="liveList"><a><i className="ico-livestudio"></i><span>라이브스튜디오</span></a></Link></li>
          <li><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter />
        </div>
        <div className="list-sec">
          <div className="search-form">
            <SearchArea section="buy" wrapperClass="search-tp1" />
            <ul className="list-recom-word">
              <li>
                <span>추천검색</span>
                <i className="recom-c"></i>
              </li>
              <li>
                <a href="#" title="싼타페">싼타페</a>
              </li>
              <li>
                <a href="#" title="그랜저">그랜저</a>
              </li>
              <li>
                <a href="#" title="카니발">카니발</a>
              </li>
              <li>
                <a href="#" title="K7">K7</a>
              </li>
            </ul>
          </div>
          {
            withoutList === true
              ? (
                <>
                  <div className="search-none">
                    <p>
                      검색결과가 없습니다.
                    <span>
                        1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                        2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                    </span>
                      <span className="tx-disabled">
                        * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                    </span>
                    </p>
                  </div>
                  <div className="list-wrap">
                    <div className="list-tit">
                      <h4>오토벨스마트 추천</h4>
                    </div>

                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>

                  </div>
                  <div className="list-wrap">
                    <div className="list-tit">
                      <h4>동급차량</h4>
                    </div>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-wrap">
                    <div className="list-tit">
                      <h4>Autobell Live Studio</h4>
                    </div>
                    <SlideBanner slideType="banner-single" car_list={car_list} touch={false} autoplay={true} pagination={true} withCounter={true}>
                      <div>
                        <ul className="goods-list col3">
                          {car_list.map((v, i) => {
                            if (i < 6) {
                              return (
                                <BannerItem key={v.id} name={`테스트 1 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                              )
                            }
                          })}
                        </ul>
                      </div>
                      <div>
                        <ul className="goods-list col3">
                          {car_list.map((v, i) => {
                            if (i < 6) {
                              return (
                                <BannerItem key={v.id} name={`테스트 1 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                              )
                            }
                          })}
                        </ul>
                      </div>
                      <div>
                        <ul className="goods-list col3">
                          {car_list.map((v, i) => {
                            if (i < 6) {
                              return (
                                <BannerItem key={v.id} name={`테스트 1 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                              )
                            }
                          })}
                        </ul>
                      </div>
                    </SlideBanner>
                  </div>
                  <div className="list-wrap">
                    <div className="list-tit">
                      <h4>우대 등록 차량</h4>
                    </div>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>
                  </div>
                  <div className="list-wrap">
                    <div className="list-tit">
                      <h4>경매 낙찰 차량</h4>
                    </div>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 3) {
                          return (
                            <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                          )
                        }
                      })}
                    </ul>
                  </div>
                  <div className="list-wrap general">
                    <div className="list-tit">
                      <h4>일반 등록 차량</h4>
                      <RadioGroup className="sort-radio" dataList={[{ id: 'sortUpload', value: 1, checked: true, disabled: false, title: '최신 등록순' }, { id: 'sortPrice', value: 2, checked: false, disabled: false, title: '낮은 가격순' }]} defaultValue={1} />

                      {/* <SelectBox id="select1" className="items-sbox" options={[
                        { value: '1', label: '최신 등록순' },
                        { value: '2', label: '낮은 가격순' }
                      ]} width={148} height={36} placeHolder="최신 등록순" /> */}
                    </div>
                    <TabMenu type="type8" defaultTab={1}>
                      <TabCont id="tab8-1" index={0}>
                        <ul className="goods-list col3">
                          {listData1.map((v, i) => {
                            return (
                              <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                            )
                          })}
                        </ul>
                        <div className="cate-list-btn2">
                          <button onClick={handleListMore1}>더보기</button>
                        </div>
                      </TabCont>
                      <TabCont id="tab8-2" index={1}>
                        <table summary="일반등록 차량 리스트" className="table-tp1 goods-list">
                          <caption className="away">일반등록 차량</caption>
                          <colgroup>
                            <col width="20.5%" />
                            <col width="47%" />
                            <col width="32.5%" />
                          </colgroup>
                          <tbody>
                            {listData1.map((v, i) => {
                              return (
                                <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} buttonName={v.buttonName} tags={v.tags} infos={v.infos} bannerType={"vertical"} verticalMode={1} btnClick={handleBtnClick} btnId={v.id} options={v.options} />
                              )
                            })}
                          </tbody>
                        </table>

                        {isLoading ?
                          <div className="more-loading">
                            <PulseLoader
                              size={15}
                              color={"#ddd"}
                              loading={isLoading}
                            />
                          </div>
                          :
                          <div className="cate-list-btn2">
                            <button onClick={handleListMore2}>더보기</button>
                          </div>
                        }

                      </TabCont>
                    </TabMenu>
                  </div>
                </>
              )
          }
        </div>
      </div>
    </AppLayout>
    // </Loading>
  )
}

export default withRouter(List);