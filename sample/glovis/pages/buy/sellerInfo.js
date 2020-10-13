import moment from 'moment'
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from "next/link"
import AppLayout from '@src/components/layouts/AppLayout';
import DatePicker from '@src/components/common/calendar/DatePicker';
import BannerItem from '@src/components/common/banner/BannerItem';
import ServiceLabel from '@src/components/common/ServiceLabel';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { select1_list, car_list, car_list3, car_list4, mCarList } from '@src/dummy';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const SellerInfo = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { seq } = router.query;

  const now = moment();

  useEffect(() => {
    if (seq !== undefined) window.scrollTo(0, 630);
  }, [])

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
  const handleListMore2 = (e) => {
    e.preventDefault()
    setListData2(listData2 => [...listData2, dummyData, dummyData, dummyData, dummyData, dummyData])
  };
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '판매자 정보',
        options: ['close']
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
        <div className="content-wrap seller-wrap">
          <div className="profile">
            <div className="img-wrap">
              <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="전화걸기" fontSize={10} width={53} height={24} href="tel:01012341234" />
              <h2>김현대</h2>
              <p>010-1234-1234</p>
              <ul className="employee-card">
                <li>종사원증 : 오토벨모터스</li>
                <li>종사원증번호: A1240B56</li>
              </ul>
            </div>
          </div>

          <table summary="판매자 정보에 대한 내용" className="table-tp1">
            <caption className="away">판매자 정보</caption>
            <colgroup>
              <col width="36%" />
              <col width="64%" />
            </colgroup>
            <tbody>
              <tr>
                <th>판매중 차량</th>
                <td><span className="tx-blue80">21</span></td>
              </tr>
              <tr>
                <th>판매완료 차량</th>
                <td><span className="tx-blue80">1,000</span> (최근 12개월 : 1,000)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <TabMenu type="type2" mount={false} isFix={false} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
          <TabCont tabTitle="판매중 차량" id="tab2-1" index={0}>
            <div className="list-wrap general">
              <div className="list-filter">
                <MobSelectBox width={90} options={[
                  { id: 'sell_ing_type_1', value: 1, checked: true, disabled: false, label: '전체' },
                  { id: 'sell_ing_type_2', value: 2, checked: false, disabled: false, label: '국산' },
                  { id: 'sell_ing_type_3', value: 3, checked: false, disabled: false, label: '수입' },
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
            </div>
          </TabCont>
          <TabCont tabTitle="판매완료 차량" id="tab2-2" index={1}>
            <div className="list-wrap general">
              <div className="list-filter">
                <MobSelectBox width={90} options={[
                  { id: 'sell_complete_type_1', value: 1, checked: true, disabled: false, label: '전체' },
                  { id: 'sell_complete_type_2', value: 2, checked: false, disabled: false, label: '국산' },
                  { id: 'sell_complete_type_3', value: 3, checked: false, disabled: false, label: '수입' },
                ]} />
                <MobSelectBox width={90} options={[
                  { id: 'sell_month_1', value: 1, checked: true, disabled: false, label: '3개월' },
                  { id: 'sell_month_2', value: 2, checked: false, disabled: false, label: '6개월' },
                  { id: 'sell_month_3', value: 3, checked: false, disabled: false, label: '12개월' },
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
            </div>
          </TabCont>
          <TabCont tabTitle="판매점 정보" id="tab2-3" index={2}>
            <div className="map-sec">
              <table summary="판매자 기본정보에 대한 내용" className="table-tp3">
                <caption className="away">판매자 정보</caption>
                <colgroup>
                  <col width="26.5%" />
                  <col width="73.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>판매점</th>
                    <td>현대 글로비스 경인직영점</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>서울특별시 서초구 신반포로 311</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td>050-0000-0000</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
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
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap view-wrap seller">
          <ul className="tit-wrap">
            <li className="tit"><h3>판매자 정보</h3></li>
          </ul>

          <div className="info-wrap">
            <div className="img-wrap">
              <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              <h4>김현대</h4>
              <ServiceLabel />
              <table summary="판매자 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">판매자 정보</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>종사원증</th>
                    <td>a1240b56</td>
                  </tr>
                  <tr>
                    <th>매매상사</th>
                    <td>오토벨모터스</td>
                  </tr>
                </tbody>
              </table>
              <ul className="sell-info">
                <li>
                  판매중 차량
                  <span>21</span>
                </li>
                <li>
                  판매완료 차량
                  <span>21</span>
                  <em>(최근12개월: 28대)</em>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrap sell-info-wrap">
        <TabMenu type="type1" mount={false} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
          <TabCont tabTitle="판매중 차량" id="tab1-1" index={0}>
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>차량</th>
                  <td>
                    <SelectBox id="made" className="items-sbox" options={[
                      { value: 'made-all', label: '전체' },
                      { value: 'made-home', label: '국산' },
                      { value: 'made-foreign', label: '수입' }
                    ]} placeHolder="전체" width={282} height={48} />
                    <em></em>

                    <Button size="big" background="blue80" title="조회" width={130} className="fr" />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="inquire-num">차량 수 : 총 21대</p>
            <table summary="판매중 차량 리스트" className="table-tp1 goods-list th-c">
              <caption className="away">판매중 차량</caption>
              <colgroup>
                <col width="15.3%" />
                <col width="40.5%" />
                <col width="20%" />
                <col width="24.2%" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan="2">차량정보</th>
                  <th>부가서비스</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {listData2.map((v, i) => {
                  return (
                    <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} buttonName={v.buttonName} options={v.options} tags={v.tags} infos={v.infos} bannerType={"vertical"} verticalMode={2} btnClick={handleBtnClick} btnId={v.id} />
                  )
                })}
              </tbody>
            </table>
            <div className="cate-list-btn2">
              <button onClick={handleListMore2}>더보기</button>
            </div>
          </TabCont>
          <TabCont tabTitle="판매완료 차량" id="tab1-2" index={1}>
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>차량</th>
                  <td>
                    <SelectBox id="made" className="items-sbox" options={[
                      { value: 'made-mix', label: '국산+수입' },
                      { value: 'made-home', label: '국산' },
                      { value: 'made-foreign', label: '수입' }
                    ]} placeHolder="국산+수입" width={282} height={48} />
                    <em></em>
                    <SelectBox id="model" className="items-sbox" options={select1_list} placeHolder="제조사/모델/등급" width={282} height={48} />
                  </td>
                </tr>
                <tr>
                  <th>판매일</th>
                  <td>
                    <DatePicker defaultValue={now} inputHeight={48} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={now} inputHeight={48} />
                    <RadioGroup dataList={[
                      { id: 'month1', value: 1, checked: false, disabled: false, title: '1개월' },
                      { id: 'month3', value: 2, checked: false, disabled: false, title: '3개월' },
                      { id: 'month6', value: 3, checked: false, disabled: false, title: '6개월' },
                      { id: 'month12', value: 4, checked: true, disabled: false, title: '12개월' }
                    ]} />
                    <Button size="big" background="blue80" title="조회" width={130} className="fr" />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td><p className="tx-exp-tp6">&#8251; 판매완료일 기준 12개월 이내의 차량만 조회 가능합니다.</p></td>
                </tr>
              </tbody>
            </table>
            <p className="inquire-num">차량 수 : 총 21대</p>
            <table summary="판매중 차량 리스트" className="table-tp1 goods-list th-c">
              <caption className="away">판매중 차량</caption>
              <colgroup>
                <col width="15.3%" />
                <col width="40.5%" />
                <col width="20%" />
                <col width="24.2%" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan="2">차량정보</th>
                  <th>부가서비스</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {listData2.map((v, i) => {
                  return (
                    <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} buttonName={v.buttonName} options={v.options} tags={v.tags} infos={v.infos} bannerType={"vertical"} verticalMode={2} btnClick={handleBtnClick} btnId={v.id} />
                  )
                })}
              </tbody>
            </table>
            <div className="cate-list-btn2">
              <button onClick={handleListMore2}>더보기</button>
            </div>
          </TabCont>
          <TabCont tabTitle="판매점 정보" id="tab1-3" index={2}>
            <div className="map-sec">
              <h4>오토벨모터스</h4>
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
                    <th>전화</th>
                    <td>050-0000-0000</td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td>
                      월~토요일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
                      일요일/공휴일 휴무
                    </td>
                    <th>팩스</th>
                    <td>050-0000-0000</td>
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
    </AppLayout>
  )
}

export default withRouter(SellerInfo);