import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import CarFilter from '@src/components/common/CarFilter';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import { car_list2, car_list4, mCarList2 } from '@src/dummy';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceHome = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 필터
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked4, setIsChecked4] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [isChecked6, setIsChecked6] = useState(false)
  const [filterCheck1, setFilterCheck1] = useState(false)
  const [filterCheck2, setFilterCheck2] = useState(false)
  const [filterCheck3, setFilterCheck3] = useState(false)
  const [yearRange, setYearRange] = useState({ min: 2011, max: 2015 })
  const [distanceRange, setDistanceRange] = useState({ min: 20000, max: 60000 })
  const [priceRange, setPriceRange] = useState({ min: 2750, max: 3000 })

  const handleCheck1 = useCallback(() => setIsChecked1(!isChecked1), [isChecked1])
  const handleCheck2 = useCallback(() => setIsChecked2(!isChecked2), [isChecked2])
  const handleCheck3 = useCallback(() => setIsChecked3(!isChecked3), [isChecked3])
  const handleCheck4 = useCallback(() => setIsChecked4(!isChecked4), [isChecked4])
  const handleCheck5 = useCallback(() => setIsChecked5(!isChecked5), [isChecked5])
  const handleCheck6 = useCallback(() => setIsChecked6(!isChecked6), [isChecked6])
  const handleChangeFilter1 = useCallback(() => setFilterCheck1(!filterCheck1), [filterCheck1])
  const handleChangeFilter2 = useCallback(() => setFilterCheck2(!filterCheck2), [filterCheck2])
  const handleChangeFilter3 = useCallback(() => setFilterCheck3(!filterCheck3), [filterCheck3])

  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)
  const [value3, setValue3] = useState(null)
  const [value4, setValue4] = useState(null)
  const [value5, setValue5] = useState(null)
  const [value6, setValue6] = useState(null)
  const handleSelect1 = useCallback((value) => {
    setValue1(value)
  }, [value1])
  const handleSelect2 = useCallback((value) => {
    setValue2(value)
  }, [value2])
  const handleSelect3 = useCallback((value) => {
    setValue3(value)
  }, [value3])
  const handleSelect4 = useCallback((value) => {
    setValue4(value)
  }, [value4])
  const handleSelect5 = useCallback((value) => {
    setValue5(value)
  }, [value5])
  const handleSelect6 = useCallback((value) => {
    setValue6(value)
  }, [value6])
  // 옵션 더보기
  const [listData, setListData] = useState(car_list2)
  const dummyData = {
    name: "새로 추가된 차 이름",
    price: "3,100",
    image: "/images/dummy/product-img-01.png",
    alt: "차량 이미지",
    discount: 20,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    id: '새로 추가된 데이터 id'
  };
  const handleListMore = (e) => {
    e.preventDefault()
    setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData])
  };
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스',
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

    const [listData1] = useState(car_list4)
    const [listData2] = useState(mCarList2)

    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    const handleSearchInput = (e) => {
      e.preventDefault();
      Router.push('/homeService/serviceSearch');
    }

    return (
      <AppLayout>
        <div className="content-wrap home-service-wrap">
          <div className="list-sec">
            <div className="float-wrap mt20">
              <Input type="text" placeHolder="모델,차량번호,판매자명 검색" id="input-tp3" uiType={3} width={'62%'} height={40} onClick={handleSearchInput} />
              <MobSelectBox width={'36%'} options={[
                { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '주행 거리순' },
                { id: 'list-align_3', value: 3, checked: false, disabled: false, label: '높은 가격순' },
                { id: 'list-align_4', value: 4, checked: false, disabled: false, label: '낮은 가격순' }
              ]} />
            </div>

            {/* 검색결과 있을 시 */}
            <h3 className="tit2 mt20">제네시스 G80(연식) 프리미엄 럭셔리</h3>

            {
              withoutList === true
                ? (
                  <div className="search-none">
                    <h3>검색결과가 없습니다.</h3>
                    <p>
                      1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                      2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                    </p>
                    <p className="tx-disabled">
                      * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                    </p>
                  </div>
                ) : (
                  <div className="list-wrap mt16">
                    <div className="list-filter">
                      <p className="inquire-num">총 1,023대</p>
                    </div>
                    <TabMenu type="type8" defaultTab={1}>
                      <TabCont id="tab8-1" index={0}>
                        <ul className="goods-list card-type">
                          {listData2.map((v, i) => {
                            if (v.isMarkup === undefined) {
                              return (
                                <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} btnClick={handleBtnClick} btnId={v.id} />
                              )
                            } else {
                              if (v.isNumber === 1) {
                                return (
                                  <BannerItem key={i} isMarkup={true}>
                                    <div className="faq-bn">
                                      <Link href="/customer/faq"><a>
                                        <i className="ico-qna">Q</i>
                                        <p className="tit">현대 오토벨 홈서비스는 전국 어디든지 배송이<br />가능한가요?</p>
                                        <p className="exp">네, 고객님 전국 어디든 배송이 가능합니다. 배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
                                        <Button size="sml" line="gray" radius={true} title="FAQ 자세히보기" width={86} height={24} marginTop={23} buttonMarkup={true} />
                                      </a></Link>
                                    </div>
                                  </BannerItem>
                                )
                              } else if (v.isNumber === 2) {
                                return (
                                  <BannerItem key={i} isMarkup={true}>
                                    <div className="review-bn">
                                      <Link href=""><a>
                                        <div className="img-wrap">
                                          <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                                        </div>
                                        <p className="tit">쇼핑몰처럼<br />편리해요!</p>
                                        <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                                      </a></Link>
                                    </div>
                                  </BannerItem>
                                )
                              } else if (v.isNumber === 3) {
                                return (
                                  <BannerItem key={i} isMarkup={true}>
                                    <div className="autobell-bn">
                                      <Link href="/homeService/serviceInfo"><a>
                                        <span><i className="ico-autobell-gray"></i></span>
                                        <p className="tit">현대 오토벨<br />홈서비스 차량이란</p>
                                        <p className="exp">
                                          · 년식 9년 이하<br />
                                          · 주행거리 14만 키로 이하<br />
                                          · 오토벨에서 인증한 차량
                                         </p>
                                      </a></Link>
                                    </div>
                                  </BannerItem>
                                )
                              }
                            }
                          })}
                        </ul>
                      </TabCont>
                      <TabCont id="tab8-2" index={1}>
                        <ul className="goods-list list-type vertical">
                          {listData1.map((v, i) => {
                            return (
                              <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                            )
                          })}
                        </ul>
                      </TabCont>
                    </TabMenu>
                  </div>
                )
            }
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <Button size="big" line="white" color="white" title="자세히 보기" marginTop={32} width={140} href="serviceInfo" />
          <ul className="service-ico">
            <li>
              <i className="ico-confirm-white"></i>
              <p className="tit">안심차량</p>
              <p className="exp">현대 오토벨이 인증한 차량</p>
            </li>
            <li>
              <i className="ico-deliver-white"></i>
              <p className="tit">배송 서비스</p>
              <p className="exp">편리하게 우리집까지</p>
            </li>
            <li>
              <i className="ico-refund-white"></i>
              <p className="tit">환불 가능</p>
              <p className="exp">3일 동안 타보고 결정</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrap home-service-wrap">
        <div className="search-sec">
          <CarFilter title="홈서비스 차량 검색" type="homeService" />
        </div>
        <div className="list-sec">
          <ul className="float-wrap">
            <li><p className="num-tx">총 <span className="ea">1,023</span> 대</p></li>
            <li>
              <SelectBox id="select1" className="items-sbox" isValue={0} options={[
                { value: '1', label: '최근등록일순' },
                { value: '2', label: '주행거리순' },
                { value: '3', label: '높은가격순' },
                { value: '4', label: '낮은가격순' }
              ]} width={148} height={36} />
            </li>
          </ul>
          <ul className="goods-list col3">
            {listData.map((v, i) => {
              if (v.isMarkup === undefined) {
                return (
                  <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                )
              } else {
                if (v.isNumber === 1) {
                  return (
                    <BannerItem key={i} isMarkup={true}>

                      <div className="faq-bn">
                        <Link href="/customer/faq"><a>
                          <i className="ico-qna">Q</i>
                          <p className="tit">현대 오토벨 홈서비스는 전국 어디든지 배송이 가능한가요?</p>
                          <p className="exp">네, 고객님 전국 어디든 배송이 가능합니다.<br />배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
                          <p>FAQ 자세히 보기</p>
                        </a></Link>
                      </div>
                    </BannerItem>
                  )
                } else if (v.isNumber === 2) {
                  return (
                    <BannerItem key={i} isMarkup={true}>
                      <div className="review-bn">
                        <Link href=""><a>
                          <div className="img-wrap">
                            <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                          </div>
                          <p className="tit">쇼핑몰처럼<br />편리해요!</p>
                          <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                        </a></Link>
                      </div>
                    </BannerItem>
                  )
                } else if (v.isNumber === 3) {
                  return (
                    <BannerItem key={i} isMarkup={true}>
                      <div className="autobell-bn">
                        <Link href="/homeService/serviceInfo"><a>
                          <span><i className="ico-autobell-gray"></i></span>
                          <p className="tit">현대 오토벨<br />홈서비스 차량이란</p>
                          <p className="exp">
                            · 년식 9년 이하<br />
                            · 주행거리 14만 키로 이하<br />
                            · 오토벨에서 인증한 차량
                          </p>
                        </a></Link>
                      </div>
                    </BannerItem>
                  )
                } else if (v.isNumber === 4) {
                  return (
                    <BannerItem key={i} isMarkup={true}>
                      <div className="img-bn">
                        <Link href=""><a>
                          <p>현대 Autobell<br />기획특가전</p>
                          <span>바로가기</span>
                        </a></Link>
                      </div>
                    </BannerItem>
                  )
                }

              }
            })}
          </ul>
          <div className="cate-list-btn2">
            <button onClick={handleListMore}>더보기</button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default withRouter(ServiceHome);