import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import CarFilter from '@src/components/common/car/buyCar/CarFilter';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import PageItem from '@lib/share/items/PageItem';
import Pagination from '@lib/share/items/Pagination';
import PageCont from '@lib/share/items/PageCont';
import { SECTION_BUY } from '@src/actions/types';
import { car_list, car_list3, car_list4, select1_list } from '@src/dummy';

const List = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });

  // 차량 목록 더보기
  const [listData1, setListData1] = useState(car_list4);
  const [listData2, setListData2] = useState(car_list3);
  const dummyData = {
    name: '새로 추가된 차 이름',
    price: '3,100',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48',
    id: '새로 추가된 데이터 id'
  };
  const handleListMore1 = (e) => {
    e.preventDefault();
    setListData1((listData1) => [...listData1, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData]);
  };
  const handleListMore2 = (e) => {
    e.preventDefault();
    setListData2((listData2) => [...listData2, dummyData, dummyData, dummyData, dummyData, dummyData]);
  };
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  return (
    <AppLayout>
      <div className="list-nav-sec">
        <ul className="content-wrap">
          <li className="on">
            <Link href="list">
              <a>
                <i className="ico-allcar"></i>
                <span>전체차량</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="liveList">
              <a>
                <i className="ico-livestudio"></i>
                <span>라이브스튜디오</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="auctionList">
              <a>
                <i className="ico-bid"></i>
                <span>경매낙찰차량</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="certifyMall">
              <a>
                <i className="ico-income"></i>
                <span>인증몰</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter />
        </div>
        <div className="list-sec">
          <div className="search-form">
            <div className="search-tp1">
              <span className="search-area">
                <Input placeHolder="브랜드, 모델명으로 검색해 보세요." width="100%" height={60} />
              </span>
              <Button size="full" background="blue80" title="검색" />
            </div>
            <ul className="list-recom-word">
              <li>
                <span>추천검색</span>
                <i className="recom-c"></i>
              </li>
              <li>
                <a href="#" title="싼타페">
                  싼타페
                </a>
              </li>
              <li>
                <a href="#" title="그랜저">
                  그랜저
                </a>
              </li>
              <li>
                <a href="#" title="카니발">
                  카니발
                </a>
              </li>
              <li>
                <a href="#" title="K7">
                  K7
                </a>
              </li>
            </ul>
          </div>
          {withoutList === true ? (
            <>
              <div className="search-none">
                <p>
                  검색결과가 없습니다.
                  <span>
                    1. 검색 옵션을 변경해서 다시 검색해 보세요.
                    <br />
                    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                  </span>
                  <span className="tx-disabled">* 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.</span>
                </p>
              </div>
              <div className="list-wrap">
                <div className="list-tit">
                  <h4>오토벨스마트추천</h4>
                </div>
                <ul className="goods-list col3">
                  {car_list.map((v, i) => {
                    if (i < 3) {
                      return (
                        <BannerItem
                          key={v.id}
                          name={v.name}
                          price={v.price}
                          image={v.image}
                          alt={v.alt}
                          isButton={v.isButton}
                          buttonName={v.buttonName}
                          tags={v.tags}
                          infos={v.infos}
                          options={v.options}
                          btnClick={handleBtnClick}
                          btnId={v.id}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="list-wrap">
                <div className="list-tit">
                  <h4>동급 차량 추천</h4>
                </div>
                <ul className="goods-list col3">
                  {car_list.map((v, i) => {
                    if (i < 3) {
                      return (
                        <BannerItem
                          key={v.id}
                          name={v.name}
                          price={v.price}
                          image={v.image}
                          alt={v.alt}
                          isButton={v.isButton}
                          buttonName={v.buttonName}
                          tags={v.tags}
                          infos={v.infos}
                          options={v.options}
                          btnClick={handleBtnClick}
                          btnId={v.id}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="list-wrap">
                <PageItem min={1} max={3} initNum={2}>
                  <div className="list-tit">
                    <h4>Autobell Live Studio</h4>
                    <Pagination />
                  </div>
                  <PageCont id={1}>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 6) {
                          return (
                            <BannerItem
                              key={v.id}
                              name={`테스트 1 - ${v.name}`}
                              price={v.price}
                              image={v.image}
                              alt={v.alt}
                              isButton={v.isButton}
                              buttonName={v.buttonName}
                              tags={v.tags}
                              infos={v.infos}
                              options={v.options}
                              btnClick={handleBtnClick}
                              btnId={v.id}
                            />
                          );
                        }
                      })}
                    </ul>
                  </PageCont>
                  <PageCont id={2}>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 6) {
                          return (
                            <BannerItem
                              key={v.id}
                              name={`테스트 2 - ${v.name}`}
                              price={v.price}
                              image={v.image}
                              alt={v.alt}
                              isButton={v.isButton}
                              buttonName={v.buttonName}
                              tags={v.tags}
                              infos={v.infos}
                              options={v.options}
                              btnClick={handleBtnClick}
                              btnId={v.id}
                            />
                          );
                        }
                      })}
                    </ul>
                  </PageCont>
                  <PageCont id={3}>
                    <ul className="goods-list col3">
                      {car_list.map((v, i) => {
                        if (i < 6) {
                          return (
                            <BannerItem
                              key={v.id}
                              name={`테스트 3 - ${v.name}`}
                              price={v.price}
                              image={v.image}
                              alt={v.alt}
                              isButton={v.isButton}
                              buttonName={v.buttonName}
                              tags={v.tags}
                              infos={v.infos}
                              options={v.options}
                              btnClick={handleBtnClick}
                              btnId={v.id}
                            />
                          );
                        }
                      })}
                    </ul>
                  </PageCont>
                </PageItem>
              </div>
              <div className="list-wrap">
                <div className="list-tit">
                  <h4>우대 등록 차량</h4>
                </div>
                <ul className="goods-list col3">
                  {car_list.map((v, i) => {
                    if (i < 3) {
                      return (
                        <BannerItem
                          key={v.id}
                          name={v.name}
                          price={v.price}
                          image={v.image}
                          alt={v.alt}
                          isButton={v.isButton}
                          buttonName={v.buttonName}
                          tags={v.tags}
                          infos={v.infos}
                          options={v.options}
                          btnClick={handleBtnClick}
                          btnId={v.id}
                        />
                      );
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
                        <BannerItem
                          key={v.id}
                          name={v.name}
                          price={v.price}
                          image={v.image}
                          alt={v.alt}
                          isButton={v.isButton}
                          buttonName={v.buttonName}
                          tags={v.tags}
                          infos={v.infos}
                          options={v.options}
                          btnClick={handleBtnClick}
                          btnId={v.id}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="list-wrap general">
                <div className="list-tit">
                  <h4>일반 등록 차량</h4>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="최신 등록순" />
                </div>
                <TabMenu type="type8" defaultTab={1}>
                  <TabCont id="tab8-1" index={0}>
                    <ul className="goods-list col3">
                      {listData1.map((v, i) => {
                        return (
                          <BannerItem
                            key={v.id}
                            name={v.name}
                            price={v.price}
                            image={v.image}
                            alt={v.alt}
                            isButton={v.isButton}
                            buttonName={v.buttonName}
                            tags={v.tags}
                            infos={v.infos}
                            options={v.options}
                            btnClick={handleBtnClick}
                            btnId={v.id}
                          />
                        );
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
                        {listData2.map((v, i) => {
                          return (
                            <BannerItem
                              key={v.id}
                              name={v.name}
                              price={v.price}
                              image={v.image}
                              alt={v.alt}
                              buttonName={v.buttonName}
                              tags={v.tags}
                              infos={v.infos}
                              bannerType={'vertical'}
                              verticalMode={1}
                              btnClick={handleBtnClick}
                              btnId={v.id}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="cate-list-btn2">
                      <button onClick={handleListMore2}>더보기</button>
                    </div>
                  </TabCont>
                </TabMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default withRouter(List);
