/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/**
 * 설명 : 포인트/쿠폰
 * @fileoverview 내차팔기>딜러마이페이지>포인트/쿠폰
 * @requires [pointCuponHistoryAction,registerCupon]
 * @author 박진하
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy } from 'lodash';
import { withRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import qs from 'qs';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import { getPointHistoryList, getCouponHistoryList } from '@src/actions/mypage/dealer/pointCuponHistoryAction';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { car_list4, mCarList, mCarList2, m_radio_guaranteed, m_radio_contractor, m_mobile_number_list, mobile_select_area, textDummy } from '@src/dummy';

import RegisterCupon from './registerCupon';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * 설명 : 포인트/쿠폰 내역을 조회하고 쿠폰등록 페이지를 호출한다.
 * @param {state.pointCupon.pointHistoryList} 포인트 내역 목록
 * @param {state.pointCupon.usePoint} 사용 포인트
 * @param {state.pointCupon.expirationPoint} 7일내 만료 포인트
 * @param {state.pointCupon.useList} 쿠폰 목록
 * @param {state.pointCupon.useCoupon} 보유쿠폰
 * @param {state.pointCupon.expirationCoupon} 7일내 만료 쿠폰
 */
const PointCuponHistory = ({ router }) => {
  const tabIndex = router?.query?.tabIndex;
  console.log('router idx, tabIndex=%o', tabIndex);
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '포인트 · 쿠폰',
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
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
    setDefaultTabIndex(Number(tabIndex));
  }, []);

  const AM082 = 'AM082';
  const searchCoupTypeList = [
    { value: '', label: '전체' },
    { value: '01', label: '미사용' },
    { value: '02', label: '사용' },
    { value: '03', label: '만료' }
  ];

  const AM082List = useSelector((state) => state.commonCode.commonCodeList[AM082]);
  const pointHistoryList = useSelector((state) => orderBy(state.pointCupon.pointHistoryList, []));
  const usePoint = useSelector((state) => state.pointCupon.usePoint);
  const expirationPoint = useSelector((state) => state.pointCupon.expirationPoint);

  const couponList = useSelector((state) => state.pointCupon.couponHisoryList);
  const useCoupon = useSelector((state) => state.pointCupon.useCoupon);
  const expirationCoupon = useSelector((state) => state.pointCupon.expirationCoupon);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [currentPage, setCurrentPage] = useState(1); // 포인트
  const [recordSize, setRecordSize] = useState(10); // 포인트
  const [currentPageCupon, setCurrentPageCupon] = useState(1); // 쿠폰
  const [recordSizeCupon, setRecordSizeCupon] = useState(15); // 쿠폰

  const [startDt, setStartDt] = useState(moment()); //useState(moment().subtract(1, 'y'));
  const [endDt, setEndDt] = useState(moment());
  const [searchType, setSearchType] = useState('0000');

  const [startCoupDt, setStartCoupDt] = useState(moment().subtract(1, 'y'));
  const [endCoupDt, setEndCoupDt] = useState(moment());
  const [searchCoupType, setSearchCoupType] = useState('');
  const [defaultTabIndex, setDefaultTabIndex] = useState(isEmpty(tabIndex) ? 0 : tabIndex); //기본탭
  useEffect(() => {
    if (isEmpty(pointHistoryList)) {
      const searchInfo = {
        startDt: startDt.format('YYYY-MM-DD'),
        endDt: endDt.format('YYYY-MM-DD'),
        searchType: searchType,
        currentPage: currentPage,
        recordSize: recordSize
      };
      console.log('133 getPointHistoryList>pointHistoryList=%o', pointHistoryList);
      dispatch(getPointHistoryList(searchInfo));
    }
  }, []);

  useEffect(() => {
    dispatch(getCommonCodeList(AM082));
  }, [dispatch, AM082]);

  const pageChangeHandler = (e, pageNo) => {
    setCurrentPage(pageNo);
    const searchInfo = {
      startDt: startDt.format('YYYY-MM-DD'),
      endDt: endDt.format('YYYY-MM-DD'),
      searchType: searchType,
      currentPage: pageNo,
      recordSize: recordSize
    };
    console.log('151 getPointHistoryList>pageNo=%o', pageNo);

    dispatch(getPointHistoryList(searchInfo));
  };

  const pageChangeHandler2 = (e, pageNo) => {
    setCurrentPageCupon(pageNo);
    const searchInfo = {
      startDt: startCoupDt.format('YYYY-MM-DD'),
      endDt: endCoupDt.format('YYYY-MM-DD'),
      searchType: searchCoupType,
      currentPage: pageNo,
      recordSize: recordSizeCupon
    };
    dispatch(getCouponHistoryList(searchInfo));
  };

  const pageChangeHandlerCupon1 = (e, pageNo) => {
    setCurrentPageCupon1(pageNo);
  };

  const pageChangeHandlerCupon2 = (e, pageNo) => {
    setCurrentPageCupon2(pageNo);
  };

  const searchList = useCallback(
    (e) => {
      e.preventDefault();
      const searchInfo = {
        startDt: startDt.format('YYYY-MM-DD'),
        endDt: endDt.format('YYYY-MM-DD'),
        searchType: searchType,
        currentPage: currentPage,
        recordSize: recordSize
      };
      console.log('186 getPointHistoryList>searchInfo=%o', searchInfo);

      dispatch(getPointHistoryList(searchInfo));
    },
    [dispatch]
  );

  useEffect(() => {
    setDefaultTabIndex(Number(tabIndex));

    setStartDt(moment().subtract(1, 'y')); //초기 조회시작일은 1년전 날짜...
    setStartCoupDt(moment().subtract(1, 'y')); //초기 조회시작일은 1년전 날짜...
    console.log('197 useEffect 초기화 defaultTabIndex=%o, startDt=%o', defaultTabIndex, startDt);
    onListSearch(Number(defaultTabIndex));
  }, [tabIndex]);

  const tabClick = (e, idx) => {
    e.preventDefault();
    console.log('204 - tabClick idx=%o, e=%o', idx, e);

    setStartDt(moment().subtract(1, 'y')); //초기 조회시작일은 1년전 날짜...
    setStartCoupDt(moment().subtract(1, 'y')); //초기 조회시작일은 1년전 날짜...

    onListSearch(idx);
  };

  const onListSearch = (idx) => {
    console.log('213 - onListSearch> idx=%o', idx);
    if (idx === 1) {
      if (isEmpty(couponList)) {
        const searchInfo = {
          startDt: startCoupDt.format('YYYY-MM-DD'),
          endDt: endCoupDt.format('YYYY-MM-DD'),
          searchType: searchCoupType,
          currentPage: currentPageCupon,
          recordSize: recordSizeCupon
        };
        console.log(searchInfo);
        dispatch(getCouponHistoryList(searchInfo));
      }
    } else {
      const searchInfo = {
        startDt: startDt.format('YYYY-MM-DD'),
        endDt: endDt.format('YYYY-MM-DD'),
        searchType: searchType,
        currentPage: currentPage,
        recordSize: recordSize
      };
      console.log('224 getPointHistoryList>idx=%o', idx);

      dispatch(getPointHistoryList(searchInfo));
    }
  };

  const changList = (e, target) => {
    //e.preventDefault();

    if (target == 'point') {
      setSearchType(e.cdId);
      const searchInfo = {
        startDt: startDt.format('YYYY-MM-DD'),
        endDt: endDt.format('YYYY-MM-DD'),
        searchType: e.cdId,
        currentPage: currentPage,
        recordSize: recordSize
      };
      console.log('242 getPointHistoryList>target=%o', target);

      dispatch(getPointHistoryList(searchInfo));
    } else if (target == 'coupon') {
      setSearchCoupType(e.value);
      const searchInfo = {
        startDt: startCoupDt.format('YYYY-MM-DD'),
        endDt: endCoupDt.format('YYYY-MM-DD'),
        searchType: e.value,
        currentPage: currentPageCupon,
        recordSize: recordSizeCupon
      };
      dispatch(getCouponHistoryList(searchInfo));
    }
  };

  const searchList2 = (e) => {
    e.preventDefault();
    const searchInfo = {
      startDt: startCoupDt.format('YYYY-MM-DD'),
      endDt: endCoupDt.format('YYYY-MM-DD'),
      searchType: searchCoupType,
      currentPage: currentPageCupon,
      recordSize: recordSizeCupon
    };
    dispatch(getCouponHistoryList(searchInfo));
  };

  const modalShow = useCallback(
    (e) => {
      e.preventDefault();
      setRodalShow(!rodalShow);
    },
    [rodalShow, setRodalShow]
  );
  if (hasMobile) {
    const { result } = router.query;
    const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

    // 달력 기간 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
    };

    // 차량 기본정보 - 달력
    const [calPop1, setCalPop1] = useState(false);
    const [calPop2, setCalPop2] = useState(false);
    const [isDate1, setIsDate1] = useState(moment());
    const [isDate2, setIsDate2] = useState(moment());
    const handleCalendarPop1 = (e) => {
      e.preventDefault();
      setCalPop1(true);
      preventScroll(true);
    };
    const handleCalendarPop2 = (e) => {
      e.preventDefault();
      setCalPop2(true);
      preventScroll(true);
    };
    const calendarCallback1 = (e, date) => {
      e.preventDefault();
      setIsDate1(date);
      setCalPop1(false);
      preventScroll(false);
    };
    const calendarCallback2 = (e, date) => {
      e.preventDefault();
      setIsDate2(date);
      setCalPop2(false);
      preventScroll(false);
    };
    const calendarClose = (e) => {
      e.preventDefault();
      setCalPop1(false);
      setCalPop2(false);
      preventScroll(false);
    };

    // bottom
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenCoupon = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      preventScroll(true);
    }, []);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      preventScroll(false);
    }, []);
    const handleClose = useCallback((e) => {
      e.preventDefault();
      handleCloseDimm();
    }, []);

    // 팝업
    const [couponPop, setCouponPop, openCouponPop, closeDimmCouponPop] = useRodal(false);
    const closeCouponPop = useCallback((e) => {
      e.preventDefault();
      handleCloseDimm();
      setCouponPop(false);
    }, []);
    const openCoupon = useCallback((e) => {
      e.preventDefault();
      setDimm(false);
      openCouponPop(true);
    }, []);
    const pointArr = [
      {
        date: '2019.08.17',
        validity: '2019.09.16',
        state: '지급',
        cond: (
          <>
            31~60일 이내 판매 신고 시 <span>1,000p</span>
          </>
        ),
        point: 12000
      },
      {
        date: '2019.08.17',
        validity: '2019.09.16',
        state: '만료',
        cond: (
          <>
            31~60일 이내 판매 신고 시 <span>1,000p</span>
          </>
        ),
        point: -1000
      },
      {
        date: '2019.08.17',
        validity: '2019.09.16',
        state: '사용',
        cond: '대당 이용권 결제',
        point: -1000
      },
      {
        date: '2019.08.17',
        validity: '2019.09.16',
        state: '회수',
        cond: (
          <>
            31~60일 이내 판매 신고 시 <span>1,000p</span>
          </>
        ),
        point: -1000
      }
    ];
    const pointObj = {
      date: '2019.08.17',
      validity: '2019.09.16',
      state: '지급',
      cond: '새로 불러온 데이터',
      point: 1000
    };
    const [pointList, setPointList] = useState(pointHistoryList);
    const onMorePoint = useCallback((e) => {
      e.preventDefault();
      setPointList((prev) => [...prev, pointObj, pointObj, pointObj]);
    }, []);
    return (
      <AppLayout>
        <div>
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="포인트" id="tab1-1" index={0}>
              <div className="point-coupon-current">
                <p className="tit">보유포인트</p>
                <div className="float-wrap mt8">
                  <p>
                    12,000<span>p</span>
                  </p>
                  <p className="tx-exp-tp4">
                    7일 내 만료예정<span>12,000p</span>
                  </p>
                </div>
              </div>
              <ul className="m-toggle-list search">
                <MenuItem>
                  <MenuTitle>
                    적립/사용내역<span>상세조회</span>
                  </MenuTitle>
                  <MenuCont>
                    <ul className="float-wrap mb16">
                      <li>판매상태</li>
                      <li>
                        <MobSelectBox
                          options={[
                            { id: 'sell_state_1', value: 1, checked: true, disabled: false, label: '전체' },
                            { id: 'sell_state_2', value: 2, checked: false, disabled: false, label: '지급' },
                            { id: 'sell_state_3', value: 3, checked: false, disabled: false, label: '사용' },
                            { id: 'sell_state_4', value: 4, checked: false, disabled: false, label: '회수' },
                            { id: 'sell_state_5', value: 5, checked: false, disabled: false, label: '만료' }
                          ]}
                          width="100%"
                        />
                      </li>
                    </ul>
                    <MobButtonFilter
                      checkList={[
                        { title: '1개월', checked: true },
                        { title: '3개월', checked: false },
                        { title: '6개월', checked: false },
                        { title: '1년', checked: false }
                      ]}
                      onClick={handleBtnFilterClick1}
                    />
                    <div className="mt8">
                      <DatePicker defaultValue={isDate1} width="46%" onClick={handleCalendarPop1} />
                      <em className="from">~</em>
                      <DatePicker defaultValue={isDate2} width="46%" onClick={handleCalendarPop2} />
                    </div>
                    <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} />
                  </MenuCont>
                </MenuItem>
                <li>
                  <div className="float-wrap">
                    <p>2019.08.17 ~ 2019.09.16</p>
                    <p>
                      총 <span className="tx-blue80">123</span>건
                    </p>
                  </div>
                </li>
              </ul>
              {withoutList === true ? (
                <div className="list-none-wrap content-border">
                  <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                </div>
              ) : (
                <>
                  <ul className="point-tx-list content-border">
                    {pointList.map((v, i) => {
                      return (
                        <li key={i}>
                          <ul className="float-wrap">
                            <li>
                              {v.date} (유효기간 : {v.validity})
                            </li>
                            <li className="state">{v.state}</li>
                          </ul>
                          <ul className="float-wrap">
                            <li className="tit">{v.cond}</li>
                            <li className="point on">
                              {v.point}
                              <span>p</span>
                            </li>
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                  <Buttons align="center" marginTop={4} className="pdside20">
                    <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={onMorePoint} />
                  </Buttons>
                </>
              )}
            </TabCont>
            <TabCont tabTitle="쿠폰" id="tab1-2" index={1}>
              <div className="point-coupon-current">
                <p className="tit">보유쿠폰</p>
                <div className="float-wrap mt8">
                  <p>
                    10<span>개</span>
                  </p>
                  <p className="tx-exp-tp4">
                    7일 내 만료예정<span>1개</span>
                  </p>
                </div>
              </div>
              <TabMenu type="type1" mount={false}>
                <TabCont tabTitle="사용 가능한 쿠폰" id="tab1-1" index={0}>
                  <div className="popup-coupon">
                    <label htmlFor="coupon-num">쿠폰번호</label>
                    <span className="bridge">
                      <Input type="text" placeHolder="예) 030480293-2348" id="coupon-num" width="70%" height={48} />
                    </span>
                    <Button size="mid" background="blue80" radius={true} title="조회" measure="%" width={28} height={48} mgMeasure="%" marginLeft={2} onClick={handleOpenCoupon} />
                  </div>
                  <div className="coupon-area mypage">
                    {withoutList === true ? (
                      <div className="list-none-wrap">
                        <p className="list-none">사용 가능한 쿠폰이 없습니다.</p>
                      </div>
                    ) : (
                      <ul className="coupon-wrap">
                        <li>
                          <div className="coupon-img">
                            <span>무료 이용권</span>
                            <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                          </div>
                          <div className="con-wrap">
                            <p>무료 이용권</p>
                            <span>2019.12.23 등록</span>
                            <span className="float-wrap tx-black">
                              <em>2020.12.09 까지</em>
                              <em>36일 남음</em>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="coupon-img">
                            <span>무료 이용권</span>
                            <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                          </div>
                          <div className="con-wrap">
                            <p>무료 이용권</p>
                            <span>2019.12.23 등록</span>
                            <span className="float-wrap tx-black">
                              <em>2020.12.09 까지</em>
                              <em className="tx-red80">3일 남음</em>
                            </span>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </TabCont>
                <TabCont tabTitle="사용/만료된 쿠폰" id="tab1-2" index={1}>
                  {withoutList === true ? (
                    <div className="list-none-wrap tp2">
                      <p className="list-none">쿠폰 내역이 없습니다.</p>
                    </div>
                  ) : (
                    <>
                      <div className="coupon-area mypage">
                        <ul className="coupon-wrap">
                          <li>
                            <div className="coupon-img">
                              <span>무료 이용권</span>
                              <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                            </div>
                            <div className="con-wrap">
                              <p>무료 이용권</p>
                              <span>2019.12.23 등록</span>
                              <span className="tx-black">
                                <em>
                                  2020.12.09 <em className="tx-red80">사용</em>
                                </em>
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="coupon-img">
                              <span>무료 이용권</span>
                              <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                            </div>
                            <div className="con-wrap">
                              <p>무료 이용권</p>
                              <span>2019.12.23 등록</span>
                              <span className="tx-black">
                                <em>
                                  2020.12.09 <em className="tx-red80">만료</em>
                                </em>
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </TabCont>
              </TabMenu>
            </TabCont>
          </TabMenu>
          {
            <>
              <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
              <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
                <MobCalendar date={isDate1} callback={calendarCallback1} />
              </MobBottomArea>
              <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
                <MobCalendar date={isDate2} callback={calendarCallback2} />
              </MobBottomArea>
            </>
          }
        </div>

        <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm}></div>
        <MobBottomArea active={active} isFixButton={true} zid={101}>
          <div className="inner coupon-area mypage">
            <p className="tit1 mb24">쿠폰등록</p>
            <div className="popup-coupon pd0">
              <label htmlFor="coupon-num-2">쿠폰번호</label>
              <span className="bridge">
                <Input type="text" value="030480293-2348" id="coupon-num-2" width="100%" height={48} disabled={true} />
              </span>
            </div>

            {/* 조회 내역 없을 시 */}
            {/* <div className="list-none-wrap">
                <p className="list-none">
                  조회되는 쿠폰이 없습니다.
                  // 이미 등록된 쿠폰입니다.
                </p>
              </div> */}

            {/* 조회 내역 있을 시 */}
            <ul className="coupon-wrap">
              <li>
                <div className="coupon-img">
                  <span>무료 이용권</span>
                  <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                </div>
                <div className="con-wrap">
                  <p>무료 이용권</p>
                  <span className="tx-black">2019.12.09 까지</span>
                  <span className="float-wrap tx-black">
                    <em>93일 남음</em>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* 조회 내역 없을 시 */}
          {/* <Button className="fixed" size="full" background="blue80" title="취소" onClick={handleClose} /> */}

          {/* 조회 내역 있을 시 */}
          <Buttons align="center" className="fixed full">
            <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleClose} />
            <Button size="big" background="blue80" title="등록" onClick={openCoupon} />
          </Buttons>
        </MobBottomArea>

        <RodalPopup show={couponPop} type={'fade'} closedHandler={closeDimmCouponPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">쿠폰이 등록되었습니다.</p>
            <p>
              등록하신 쿠폰의 사용 기한은 2020.12.09까지
              <br />
              입니다.
            </p>

            {/* 쿠폰 등록 오류 시 */}
            {/* <p className="tit1">쿠폰 등록이 되지않았습니다.</p>
            <p>쿠폰 등록중 오류가 발생했습니다.<br />다시 등록해 주시기바랍니다.</p> */}
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeCouponPop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  //MOBILE END

  //PC BEGIN
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec">
          <TabMenu type="type1" callBack={tabClick} defaultTab={defaultTabIndex}>
            <TabCont tabTitle="Point" id="tab1-1" index={0}>
              <div className="point-current">
                <p className="tit">보유포인트</p>
                <span className="exp">
                  P {nf.format(usePoint)}
                  <p className="tx-exp-tp4">7일 내 만료예정 포인트: {nf.format(expirationPoint)}</p>
                </span>
              </div>
              <div className="point-tx-list">
                <ul className="inquire-filter">
                  <li style={{ float: 'left' }}>
                    <DatePicker defaultValue={startDt} inputWidth={160} inputHeight={40} onChange={(e) => setStartDt(e)} />
                    &nbsp;~&nbsp;
                    <DatePicker defaultValue={endDt} inputWidth={160} inputHeight={40} onChange={(e) => setEndDt(e)} />
                    &nbsp;&nbsp;
                    <Button size="mid" background="blue80" title="조회" width="114" height="40" onClick={searchList} />
                  </li>
                  <li style={{ float: 'right', marginBottom: '15px' }}>
                    <SelectBox id="select1" className="items-sbox" options={AM082List} value={'AM082' + searchType} width={176} height={40} onChange={(e) => changList(e, 'point')} />
                  </li>
                </ul>

                <table className="table-tp1 th-c td-c" summary="보유포인트에 대한 내용">
                  <caption className="away">보유포인트</caption>
                  <colgroup>
                    <col width="8%" />
                    <col width="13%" />
                    <col width="32%" />
                    <col width="13%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="13%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowSpan="2">구분</th>
                      <th rowSpan="2">일자</th>
                      <th rowSpan="2">내역</th>
                      <th rowSpan="2">유효기간</th>
                      <th colSpan="2">포인트</th>
                    </tr>
                    <tr>
                      <th>내역</th>
                      <th>잔여</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(pointHistoryList) &&
                      pointHistoryList.map((lists, index) => {
                        return (
                          <tr key={index}>
                            <td>{lists.gpntDivNm}</td>
                            <td>{lists.gpntDt}</td>
                            <td>{lists.gpntLst}</td>
                            <td>{lists.gpntExpireYmd}</td>
                            <td>{lists.gpnt}</td>
                            <td></td>
                          </tr>
                        );
                      })}
                    {isEmpty(pointHistoryList) && (
                      <tr>
                        <td colSpan="6">포인트 내역이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <PageNavigator
                  className="mt32"
                  currentPage={currentPage}
                  recordCount={isEmpty(pointHistoryList) ? 0 : pointHistoryList[0].totcnt}
                  recordSize={recordSize}
                  changed={pageChangeHandler}
                />
              </div>
            </TabCont>
            <TabCont tabTitle="쿠폰" id="tab1-2" index={1}>
              <div className="point-current">
                <p className="tit">보유쿠폰</p>
                <span className="exp">
                  {useCoupon} 장<p className="tx-exp-tp4">30일 내 만료 쿠폰: {nf.format(expirationCoupon)} 장</p>
                  <span className="inquire-num">
                    <Button size="mid" background="blue80" radius={true} title="+ 쿠폰등록" width="131" onClick={modalShow /* (e) => rodalPopupHandler(e, "fade") */} />
                  </span>
                </span>
              </div>
              <div className="point-tx-list">
                <ul className="inquire-filter">
                  <li style={{ float: 'left' }}>
                    <DatePicker defaultValue={startCoupDt} inputWidth={160} inputHeight={40} onChange={(e) => setStartCoupDt(e)} />
                    &nbsp;~&nbsp;
                    <DatePicker defaultValue={endCoupDt} inputWidth={160} inputHeight={40} onChange={(e) => setEndCoupDt(e)} />
                    &nbsp;&nbsp;
                    <Button size="mid" background="blue80" title="조회" width="114" height="40" onClick={searchList2} />
                  </li>
                  <li style={{ float: 'right', marginBottom: '15px' }}>
                    <SelectBox id="select1" className="items-sbox" options={searchCoupTypeList} value={searchCoupType} width={176} height={40} onChange={(e) => changList(e, 'coupon')} />
                  </li>
                </ul>

                <table className="table-tp1 th-c td-c" summary="쿠폰에 대한 내용">
                  <caption className="away">쿠폰</caption>
                  <colgroup>
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>구분</th>
                      <th>일시</th>
                      <th>쿠폰명</th>
                      <th>쿠폰번호</th>
                      <th>만료기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(couponList) &&
                      couponList.map((use, index) => {
                        return (
                          <tr key={index}>
                            <td>{use.gubun}</td>
                            <td>{use.regDt}</td>
                            <td>{use.coupNm}</td>
                            <td>{use.coupId}</td>
                            <td>{use.coupExpireYmd}</td>
                          </tr>
                        );
                      })}
                    {isEmpty(couponList) && (
                      <tr>
                        <td colSpan="5">사용 가능한 쿠폰이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <PageNavigator className="mt32" currentPage={currentPageCupon} recordCount={isEmpty(couponList) ? 0 : couponList[0].totcnt} recordSize={recordSizeCupon} changed={pageChangeHandler2} />
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </div>
      <RegisterCupon show={rodalShow} onChange={modalCloseHandler} />
    </AppLayout>
  );
};

PointCuponHistory.getInitialProps = async (http) => {
  const { reduxStore, req } = http;
  const query = req?.query || http?.query || '';
  console.log('query : ', query);

  /*
  await Promise.all([
    reduxStore.dispatch(getPostsAction({
      boardId,
      pageNo,
      categoryId,
    })),
  ])*/

  /*
  await Promise.all([
    reduxStore.dispatch(getPointHistoryList({
      boardId,
      pageNo,
      categoryId
    })),
  ])*/

  return {
    query
  };
};

export default withRouter(PointCuponHistory);
