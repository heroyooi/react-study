import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button'
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { numberFormat } from '@src/utils/CommonUtil';

const PricingBidInfo01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '동급차량 낙찰정보',
        options: ['back', 'voucher', 'gnb'],
        events: [null, ()=>{alert('이용 구매 페이지로 이동합니다.')}, null]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 20,
        color: '#fff'
      }
    });
    const dummyCarList = [
      {
        name: "그랜저(IG) IG220 디젤 프리미엄1",
        link: "/pricingsystem/PricingAuctionInfo",
        distance: 42330,
        year: "2016",
        grade: 'A6',
        price: 2240,
        auctionDate: "2019.11.23",
        local: "분당",
        initialRegist: "2018-03-30",
        fuel: "디젤",
        mission: 'A/T',
        options: ["ABS", "VDC", "스마트키", "내비(일반)"],
        color: 'NU9)그랑블루',
        volume: 2199,
        purpose: '법인/법인상품',
        carNumber: 'KMHF14RBJA160647',
        bid: 2240,
      },
      {
        name: "그랜저(IG) IG220 디젤 프리미엄2",
        link: "/pricingsystem/PricingAuctionInfo",
        distance: 42330,
        year: "2016",
        grade: 'A6',
        price: 2240,
        auctionDate: "2019.11.23",
        local: "분당",
        initialRegist: "2018-03-30",
        fuel: "디젤",
        mission: 'A/T',
        options: ["ABS", "VDC", "스마트키", "내비(일반)"],
        color: 'NU9)그랑블루',
        volume: 2199,
        purpose: '법인/법인상품',
        carNumber: 'KMHF14RBJA160647',
        bid: 2240,
      },
      {
        name: "그랜저(IG) IG220 디젤 프리미엄3",
        link: "/pricingsystem/PricingAuctionInfo",
        distance: 42330,
        year: "2016",
        grade: 'A6',
        price: 2240,
        auctionDate: "2019.11.23",
        local: "분당",
        initialRegist: "2018-03-30",
        fuel: "디젤",
        mission: 'A/T',
        options: ["ABS", "VDC", "스마트키", "내비(일반)"],
        color: 'NU9)그랑블루',
        volume: 2199,
        purpose: '법인/법인상품',
        carNumber: 'KMHF14RBJA160647',
        bid: 2240,
      },
      {
        name: "그랜저(IG) IG220 디젤 프리미엄4",
        link: "/pricingsystem/PricingAuctionInfo",
        distance: 42330,
        year: "2016",
        grade: 'A6',
        price: 2240,
        auctionDate: "2019.11.23",
        local: "분당",
        initialRegist: "2018-03-30",
        fuel: "디젤",
        mission: 'A/T',
        options: ["ABS", "VDC", "스마트키", "내비(일반)"],
        color: 'NU9)그랑블루',
        volume: 2199,
        purpose: '법인/법인상품',
        carNumber: 'KMHF14RBJA160647',
        bid: 2240,
      },
      {
        name: "그랜저(IG) IG220 디젤 프리미엄5",
        link: "/pricingsystem/PricingAuctionInfo",
        distance: 42330,
        year: "2016",
        grade: 'A6',
        price: 2240,
        auctionDate: "2019.11.23",
        local: "분당",
        initialRegist: "2018-03-30",
        fuel: "디젤",
        mission: 'A/T',
        options: ["ABS", "VDC", "스마트키", "내비(일반)"],
        color: 'NU9)그랑블루',
        volume: 2199,
        purpose: '법인/법인상품',
        carNumber: 'KMHF14RBJA160647',
        bid: 2240,
      }
    ];
    const handleRouter = (link) => (e) => {
      e.preventDefault();
      Router.push(link);
    }
    const [carList, setCarList] = useState(dummyCarList);
    const dummyData = {
      name: "새로운 데이터",
      link: "/pricingsystem/PricingAuctionInfo",
      distance: 42330,
      year: "2016",
      grade: 'A6',
      price: 2240,
      auctionDate: "2019.11.23",
      local: "분당",
      initialRegist: "2018-03-30",
      fuel: "디젤",
      mission: 'A/T',
      options: ["ABS", "VDC", "스마트키", "내비(일반)"],
      color: 'NU9)그랑블루',
      volume: 2199,
      purpose: '법인/법인상품',
      carNumber: 'KMHF14RBJA160647',
      bid: 2240,
    }
    const handleMoreList = (e) => {
      e.preventDefault();
      setCarList([...carList, dummyData, dummyData, dummyData, dummyData]);
    }
    return (
      <AppLayout>
        <div className="content-wrap pricing-view-sec">
          {/* <div className="tit-wrap">
            <h4 className="fl">차량 기본 정보</h4>
            <div className="btn-wrap fr">
              <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} href="pricingSearchFilter03" />
            </div>
          </div> */}
          <ul className="tit-wrap mt20">
            <h4 className="fl">차량 기본 정보</h4>
            <div className="fr">
              <MobSelectBox width={152} options={[
                { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최근 경매일순' },
                { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '높은 낙찰가순' },
                { id: 'list-align_3', value: 3, checked: false, disabled: false, label: '높은 평가순' },
                { id: 'list-align_4', value: 4, checked: false, disabled: false, label: '최소 등록순' }
              ]} />
            </div>
          </ul>
          <ul className="m-toggle-list up-blue table">
            {carList.map((v, i) => {
              return (
                <MenuItem key={i}>
                  <MenuTitle>
                    <div className="float-wrap">
                      <h4>{v.name}</h4>
                      <Button className="fl" size="sml" line="gray" radius={true} title="상세보기" width={58} height={24} fontSize={10} marginLeft={5} buttonMarkup={true} onClick={handleRouter(v.link)} />
                    </div>
                    <div className="summary">
                      <div className="info">
                        <span>{v.year}</span>
                        <span>{numberFormat(v.distance)}km</span>
                      </div>
                      <ul className="float-wrap">
                        <li>평가 : <span className="tx-blue80">{v.grade}</span></li>
                        <li><p className="price-tp4">{numberFormat(v.price)}<span className="won">만원</span></p></li>
                      </ul>
                    </div>
                  </MenuTitle>
                  <MenuCont>
                    <table summary="낙찰정보에 대한 내용" className="table-tp1">
                      <caption className="away">낙찰정보 상세입니다.</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>경매일</th>
                          <td>{v.auctionDate}</td>
                        </tr>
                        <tr>
                          <th>거점</th>
                          <td>{v.local}</td>
                        </tr>
                        <tr>
                          <th>연식</th>
                          <td>{v.year}년</td>
                        </tr>
                        <tr>
                          <th>최초등록일</th>
                          <td>{v.initialRegist}</td>
                        </tr>
                        <tr>
                          <th>연료</th>
                          <td>{v.fuel}</td>
                        </tr>
                        <tr>
                          <th>미션</th>
                          <td>{v.mission}</td>
                        </tr>
                        <tr>
                          <th>주행거리</th>
                          <td>{numberFormat(v.distance)} km</td>
                        </tr>
                        <tr>
                          <th>옵션</th>
                          <td>{v.options.map((v, i) => <span key={i}>{v}</span>)}</td>
                        </tr>
                        <tr>
                          <th>색상</th>
                          <td>{v.color}</td>
                        </tr>
                        <tr>
                          <th>배기량</th>
                          <td>{numberFormat(v.volume)} cc</td>
                        </tr>
                        <tr>
                          <th>용도/소유</th>
                          <td>법인/법인상품</td>
                        </tr>
                        <tr>
                          <th>차대번호</th>
                          <td>{v.carNumber}</td>
                        </tr>
                        <tr>
                          <th>평가</th>
                          <td className="tx-blue80 tx-b">{v.grade}</td>
                        </tr>
                        <tr>
                          <th>낙찰가</th>
                          <td className="tx-blue80 tx-b">{numberFormat(v.bid)} 만원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              )
            })}
          </ul>
          <Button size="full" line="gray" radius={true} title="더보기" height={38} fontSize={12} marginTop={8} iconType="arrow-bottom-gray" onClick={handleMoreList} />
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
  </AppLayout>
  )
}

export default PricingBidInfo01;
