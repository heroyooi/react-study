import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, mCarList } from '@src/dummy';

const visitComplete = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const [listData1, setListData1] = useState(mCarList)

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '방문평가 판매',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="co-wrap bg">
          <p className="tit">방문평가 판매 신청이 완료되었습니다.</p>
          <p className="exp">
            신청 현황은 마이페이지에서 확인이 가능하며,<br />
            고객님의 연락처로 상담원이 안내를 드립니다.<br />
            감사합니다.
        </p>
          <div className="co-result">
            <p className="num">신청번호 : <span>XXXXXXXNNNXXX</span></p>
            <p className="sub">(마이페이지 현황 조회하시려면 신청번호가 필요합니다.)</p>
          </div>
          <Buttons align="center" marginTop={16}>
            <Button size="sml" background="blue80" radius={true} title="마이페이지로 이동" width={108} href="#" />
          </Buttons>
        </div>
        <div className="content-wrap">
          <div className="goods-wrap">
            <h4>오토벨스마트추천</h4>
            <ul className="goods-list list-type">
              {listData1.map((v, i) => {
                if (i < 4) {
                  return (
                    <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                  )
                }
              })}
            </ul>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" href="/main" />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-wrap co-wrap visit">
        <p className="tit">방문평가 판매 신청이 완료되었습니다.</p>
        <p className="exp">
          신청 현황은 마이페이지에서 확인이 가능하며,<br />
          고객님의 연락처로 상담원이 안내를 드립니다.<br />
          감사합니다.
        </p>
        <div className="co-result">
          <p className="num">신청번호 : <span>1928375GHS293</span></p>
          <p className="sub">마이페이지에서 현황을 확인하시려면 신청번호가 필요합니다.</p>
        </div>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="확인" width={172} height={60} href="/main" />
          <Button size="big" background="blue80" title="마이페이지" width={172} height={60} />
        </Buttons>
      </div>
      <div className="content-sec">
        <div className="content-wrap goods-wrap pb140">
          <h4 className="mb40">오토벨스마트추천</h4>
          <ul className="goods-list">
            {car_list.map((v, i) => {
              if (i < 4) {
                return (
                  <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                )
              }
            })}
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}

export default visitComplete