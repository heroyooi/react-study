import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, select1_list, select_area, mCarList, mobile_select_area } from '@src/dummy';

const BrandList = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [listData1, setListData1] = useState(mCarList)
  const [listData2, setListData2] = useState(mCarList)
  const dummyData = {
    name: "새로 추가된 차 이름",
    price: "3,100",
    image: "/images/dummy/product-img-01.png",
    alt: "차량 이미지",
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
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

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'BMW 인증몰 80대',
        options: ['back', 'search', 'gnb'],
        events: [null, handleRouter('/buy/brandSearch'), null]
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
          <div className="list-banner brand">
            <p className="tit">BMW Premium<br />Selection</p>
            <p className="exp">BMW 인증 중고차</p>
          </div>
          <div className="list-wrap brand">
            <TabMenu type="type2" mount={false}>
              <TabCont tabTitle="중고차 검색" id="tab2-1" index={0}>
                <div className="list-filter">
                  <MobSelectBox width={136} options={[
                    { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                    { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                  ]} />
                </div>
                <TabMenu type="type8" defaultTab={1}>
                  <TabCont id="tab8-1" index={0}>
                    <ul className="goods-list card-type">
                      {listData1.map((v, i) => {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      })}
                    </ul>
                  </TabCont>
                  <TabCont id="tab8-2" index={1}>
                    <ul className="goods-list list-type">
                      {listData1.map((v, i) => {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      })}
                    </ul>
                  </TabCont>
                </TabMenu>
              </TabCont>
              <TabCont tabTitle="전시장 안내" id="tab2-2" index={1}>
                <div className="float-wrap mb20">
                  <MobSelectBox options={mobile_select_area} width='35%' />
                  <MobSelectBox options={[
                    { id: 'office1', value: 1, checked: true, disabled: false, label: '가양(태안 모터스)' },
                    { id: 'office2', value: 2, checked: false, disabled: false, label: '대전(태안 모터스)' }
                  ]} width='60%' />
                </div>
                <div className="map-sec">
                  <table summary="판매자 기본정보에 대한 내용" className="table-tp1">
                    <caption className="away">판매자 정보</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="75%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>주소</th>
                        <td>서울특별시 서초구 신반포로 311</td>
                      </tr>
                      <tr>
                        <th>전화</th>
                        <td>050-0000-0000</td>
                      </tr>
                      <tr>
                        <th>영업시간</th>
                        <td>
                          월~토요일 09:00 ~ 18:00<br />
                          일요일/공휴일 휴무<br />
                          (점심시간 12:00 ~ 13:00)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="map-wrap">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen></iframe>
                  </div>
                </div>
              </TabCont>
            </TabMenu>
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
          <li><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li className="on"><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="list-sec">
          <div className="list-banner brand">
            <p className="tit">브랜드 이미지 배너영역</p>
            <p className="exp">
              브랜드 이미지 배너 서브 텍스트가 노출됩니다.<br />
              브랜드 이미지 배너 서브 텍스트가 노출됩니다.
            </p>
          </div>
          <div className="list-wrap brand">
            <TabMenu type="type7">
              <TabCont tabTitle="중고차 검색" id="tab7-1" index={0}>
                <div className="list-tit">
                  <ul>
                    <li>
                      <SelectBox id="select1" className="items-sbox" options={select_area} width={148} height={36} placeHolder="지역" />
                    </li>
                    <li>
                      <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="제조사" />
                    </li>
                    <li>
                      <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="모델" />
                    </li>
                    <li>
                      <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="연료" />
                    </li>
                  </ul>
                </div>
                <ul className="goods-list">
                  {car_list.map((v, i) => {
                    if (i < 8) {
                      return (
                        <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                      )
                    }
                  })}
                </ul>
              </TabCont>
              <TabCont tabTitle="전시장 안내" id="tab7-2" index={1}>
                <div className="list-tit">
                  <ul>
                    <li>
                      <SelectBox id="select1" className="items-sbox" options={select1_list} width={282} height={36} placeHolder="대구(인타이어 모터스)" />
                    </li>
                  </ul>
                </div>
                <div className="map-sec">
                  <h4>대구(인타이어 모터스)</h4>
                  <div className="map-wrap">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen></iframe>
                  </div>
                  <table summary="판매자 기본정보에 대한 내용" className="table-tp3">
                    <caption className="away">판매자 정보</caption>
                    <colgroup>
                      <col width="10%" />
                      <col width="40%" />
                      <col width="10%" />
                      <col width="40%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>주소</th>
                        <td><Link href="#"><a>서울특별시 서초구 신반포로 311</a></Link></td>
                        <th rowSpan="2">영업시간</th>
                        <td rowSpan="2">
                          월~토요일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
                          일요일/공휴일 휴무
                        </td>
                      </tr>
                      <tr>
                        <th>전화</th>
                        <td>050-0000-0000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabCont>
            </TabMenu>
          </div>
        </div>
      </div>

    </AppLayout>
  )
}

export default BrandList
