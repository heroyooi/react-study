import { useState, useEffect, useCallback } from 'react';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { mCarList } from '@src/dummy';

const MobSellerInfo = ({ seq }) => {

  // 차량 목록 더보기
  const [listData1, setListData1] = useState(mCarList);
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  return (
    <>
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
              ]} zid={103} subPop={true} />
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
              ]} zid={103} subPop={true} />
              <MobSelectBox width={90} options={[
                { id: 'sell_month_1', value: 1, checked: true, disabled: false, label: '3개월' },
                { id: 'sell_month_2', value: 2, checked: false, disabled: false, label: '6개월' },
                { id: 'sell_month_3', value: 3, checked: false, disabled: false, label: '12개월' },
              ]} zid={103} subPop={true} />
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
    </>
  )
}

export default MobSellerInfo;