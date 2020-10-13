/**
 * 설명 : 홈서비스 메인
 * @fileoverview 홈서비스>홈서비스 메인
 * @requires [homeserviceAction,CarFilter]
 * @author 김지훈
 */
import React, { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual, isUndefined } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';

import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RadioGroup from '@lib/share/items/RadioGroup';

import AppLayout from '@src/components/layouts/AppLayout';
import MobSearchPopUp from '@src/components/common/MobSearchPopUp';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import CarFilter from '@src/components/common/car/buyCar/CarFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLogin from '@src/components/common/MobLogin';
import { getCarListGeneral, setLoadingImageMobile, setListLoadingMobile } from '@src/actions/buycar/buyCarListAction';
import { getCarDefaultFilter } from '@src/utils/CarFilterUtil';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';

/**
 * 설명 : 홈서비스 메인, 홈서비스 차량들을 조회한다.
 * @returns {homeService} 홈서비스 메인
 */

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const HomeService = () => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // 옵션 더보기
  const [carListData, SetCarListData] = useState([]);
  const dispatch = useDispatch();
  let myCarlist;

  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const prevCurrentPage = usePrevious(currentPage);
  const countPerPage = 5; // 첫번째페이지 레코드 수
  const countPerMore = currentPage < 4 ? 5 : 6; // More 레코드 수

  const homeServiceCarList = useSelector((state) => state.buyCarList.generalCarList);
  const totalCount = useSelector((state) => state.buyCarList.totalCount);
  const isLoadingImage = useSelector((state) => state.buyCarList.isLoadingImage); // 모바일용 로딩이미지
  const isListLoading = useSelector((state) => state.buyCarList.isListLoading); // 모바일용 로딩

  const [formData, setFormData] = useState({});
  const prevFormData = usePrevious(formData);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지

  const [isListMode, setIsListMode] = useState(true);
  const [srchOption, setSrchOption] = useState(getCarDefaultFilter('home'));
  const prevSrchOption = usePrevious(srchOption);

  const [clearTrigger, setClearTrigger] = useState(false);
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);

  const homeMarkup1 = {
    isMarkup: true,
    isNumber: 1
  };
  const homeMarkup2 = {
    isMarkup: true,
    isNumber: 2
  };
  const homeMarkup3 = {
    isMarkup: true,
    isNumber: 3
  };
  const [selectValue, setSelectValue] = useState('upd_dt');
  const prevSelectValue = usePrevious(selectValue);
  const selectOrder = [
    { id: 'regOrderDesc', value: 'upd_dt', checked: true, title: '최신등록순' },
    { id: 'priceOrderAsc', value: 'sl_amt', checked: false, title: '낮은가격순' },
    { id: 'priceOrderDesc', value: 'sl_amt_desc', checked: false, title: '높은가격순' },
    { id: 'distOrderAsc', value: 'dist_asc', checked: false, title: '주행거리순' }
  ];
  // only for mobile( MobSelectBox )
  const [selectOrderOpt, setSelectOrderOpt] = useState([]);

  const onHandleOrder = (e) => {
    setSelectValue(e.target.value);
  };
  const handleReset = useCallback(() => {
    //검색 필터 초기화
    setSrchOption(getCarDefaultFilter('home'));
    dispatch(setListLoadingMobile(false));
    setClearTrigger(true);
    setTimeout(() => {
      setClearTrigger(false);
    }, 1000);
  }, []);

  const onClickSelectOrder = (value, target) => {
    if (selectOrderOpt[value - 1] && selectOrderOpt[value - 1].cdId) setSelectValue(selectOrderOpt[value - 1].cdId);
  };

  const initMobSelectBoxValue = () => {
    const arrTemp = [];
    selectOrder.map((cdItem, key) => {
      arrTemp.push(
        produce(cdItem, (draft) => {
          draft.cdValue = cdItem.value;
          draft.cdId = cdItem.value;
          draft.value = key + 1;
          draft.label = cdItem.title;
          //draft.checked = false;
          if (key === 0) draft.checked = true;
        })
      );
    });
    setSelectOrderOpt(arrTemp);
  };

  const [currentDisplayType, setCurrentDisplayType] = useState(1); // 0: list , 1: card
  const onTabIconClick = useCallback((e, idx) => {
    // setCurrentDisplayType(idx);
    // if (currentPage === 1 && idx === 0) setCurrentPage(currentPage + 1);
  });

  useEffect(() => {
    // initialization
    if (hasMobile) {
      initMobSelectBoxValue();
      srchOption.svc[0] = '0040';
    } else {
      srchOption.svc[0] = '0040';
    }
  }, []);

  // Initial 목록조회
  useEffect(() => {
    if (hasMobile) {
      //dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore, selectValue));
    } else {
      //if (!isUndefined(prevFormData)) dispatch(getCarListGeneral(formData, 1, countPerPage, countPerMore, selectValue));
    }
  }, [dispatch, formData, hasMobile, prevFormData, srchOption]);

  useEffect(() => {
    console.log('loader HomeService -> homeServiceCarList', homeServiceCarList);
    myCarlist = makeBannerMarkup(homeServiceCarList || []);
    console.log('loader HomeService -> myCarlist', myCarlist);
    SetCarListData(myCarlist);
  }, [homeServiceCarList]);

  const onClickBtn = (e, url) => {
    e.preventDefault();
    Router.push(url).then(() => {
      window.scrollTo(0, 0);
    });
  };

  // PC, 검색 필터 변경
  const filterChange = (form) => {
    if (!isEqual(formData, form)) {
      setFormData(form);
    }
  };

  // Mobile, 검색 필터 변경
  const handleOnSearchSelect = useCallback(
    (e, deps) => {
      if (!isEqual(srchOption, deps)) {
        setSrchOption(deps);
        SetCarListData([]);
        setUserSearch(true);
        dispatch(setListLoadingMobile(false));
      }
      setIsListMode(!isListMode);
    },
    [isListMode, srchOption]
  );

  // PC, 더보기
  const onHandleListMore = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (totalCount <= homeServiceCarList.length) return;
      setCurrentPage(currentPage + 1);
    },
    [currentPage, homeServiceCarList, totalCount]
  );

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if (isUndefined(homeServiceCarList) || totalCount <= homeServiceCarList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      setCurrentPage(currentPage + 1);
    }
  }, [loadingFlag, totalCount, homeServiceCarList, dispatch, currentPage]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, homeServiceCarList]);

  useEffect(() => {
    if (!hasMobile) {
      console.log('formData change' + JSON.stringify(formData));
      //if (!isEmpty(formData)) dispatch(getCarListGeneral(formData, currentPage, countPerPage, countPerMore, selectValue));
    }
  }, [dispatch, formData]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [homeServiceCarList]);

  // useEffect(() => {
  //   //셀렉트 박스 선택 후 자동 조회
  //   console.log('getCarListGeneral : [selectValue]');
  //   console.log('formData : ', formData);
  //   if (hasMobile) {
  //     dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore, selectValue));
  //     setCurrentPage(1);
  //   } else {
  //     dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore, selectValue));
  //     setCurrentPage(1);
  //   }

  //   //onHandleListMore(null, false);
  // }, [selectValue]);

  const makeBannerMarkup = (carlist) => {
    if (carlist.length < 5) return carlist;

    let bannerlist;
    let lastFixIdx = 0;
    if (carlist.length >= 5) {
      bannerlist = carlist.slice(0, 5);
      bannerlist.push(homeMarkup1);
      lastFixIdx = 5;
    }
    if (carlist.length >= 10) {
      bannerlist = bannerlist.concat(carlist.slice(5, 10));
      bannerlist.push(homeMarkup2);
      lastFixIdx = 10;
    }
    if (carlist.length >= 15) {
      bannerlist = bannerlist.concat(carlist.slice(10, 15));
      bannerlist.push(homeMarkup3);
      lastFixIdx = 15;
    }

    bannerlist = bannerlist.concat(carlist.slice(lastFixIdx, carlist.length));

    return bannerlist;
  };

  const [bUserSearch, setUserSearch] = useState(false);
  const preUserSearch = usePrevious(bUserSearch);

  useEffect(() => {
    const dispatchAsync = async () => {
      if (hasMobile) {
        if (!isEqual(prevSrchOption, srchOption) || !isEqual(prevSelectValue, selectValue)) {
          console.log('getCarListGeneral : [normalSearch] : Page1 FIX');
          console.log('formData : ', formData);
          await dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore, selectValue));
          setCurrentPage(1);
        } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
          const countChk = totalCount - homeServiceCarList.length;
          console.log('getCarListGeneral : [normalSearch]');
          console.log('formData : ', formData);
          dispatch(getCarListGeneral(srchOption, currentPage, countPerPage, countChk > 5 ? countPerMore : countChk, selectValue));
        }
      } else {
        console.log('loader show');
        if (!isUndefined(formData.yearRange)) {
          if ((!isUndefined(prevFormData) && !isEqual(prevFormData, formData)) || !isEqual(prevSelectValue, selectValue)) {
            showLoader();
            await dispatch(getCarListGeneral(formData, 1, countPerPage, countPerMore, selectValue));
            setCurrentPage(1);
            hideLoader();
          } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
            const countChk = totalCount - homeServiceCarList.length;
            showLoader();
            await dispatch(getCarListGeneral(formData, currentPage, countPerPage, countChk > 5 ? countPerMore : countChk, selectValue));
            hideLoader();
          }
        }
        console.log('loader hide');
      }
    };
    dispatchAsync();
  }, [hasMobile, formData, srchOption, currentPage, dispatch, prevFormData, prevCurrentPage, prevSrchOption, selectValue]);

  const handleOrderChange = (e) => {
    console.log(e.value);
  };

  const handleLayoutToggle = useCallback(
    (e) => {
      e.preventDefault();
      setIsListMode(!isListMode);
    },
    [isListMode]
  );

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  useEffect(() => {
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      if (isListMode === true) {
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
        dispatch({
          type: MOBILE_QUICK_EXIST,
          data: {
            exist: true
          }
        });
      } else if (isListMode === false) {
        dispatch({
          type: MOBILE_HEADER_TYPE_SUB,
          data: {
            title: '차량검색',
            options: ['back', 'reset'],
            events: [handleLayoutToggle, handleReset]
          }
        });
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 80,
            color: '#fff'
          }
        });
        dispatch({
          type: MOBILE_QUICK_EXIST,
          data: {
            exist: false
          }
        });
      }
    }
  }, [dispatch, handleLayoutToggle, handleReset, hasMobile, isListMode]);

  // 모바일 로그인팝업
  const handleFpLoginOpen = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: MOBILE_FULLPAGE_POPUP,
      data: {
        isPopup: true,
        title: '로그인',
        options: ['close']
      }
    });
  }, []);

  const handleFpLoginClose = useCallback((e) => {
    //dispatch({ type: LOGIN_SUCCESS });
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, []);
  console.log('!@#!@#!@#!@# >>>>', totalCount, homeServiceCarList?.length);
  if (hasMobile) {
    return (
      <AppLayout>
        {isListMode ? (
          <>
            <div className="content-wrap home-service-wrap">
              <div className="list-sec">
                <div className="float-wrap mt20">
                  <Input type="text" placeHolder="모델,차량번호,판매자명 검색" id="input-tp3" uiType={3} width={'62%'} height={40} onClick={handleLayoutToggle} />
                  <MobSelectBox width={'36%'} options={selectOrderOpt ? selectOrderOpt : []} onClick={(e) => onClickSelectOrder(e, 'selectValue')} />
                </div>

                {/* 검색결과 있을 시 */}
                {/* <h3 className="tit2 mt20">{!isUndefined(carListData) && carListData.length > 0 ? carListData[0].mnfcNm + ' ' + carListData[0].mdlNm + ' ' + carListData[0].clsNm : ''}</h3> */}

                {isListLoading === true && (isUndefined(carListData) || carListData.length === 0) ? (
                  <div className="search-none">
                    <h3>검색결과가 없습니다.</h3>
                    <p>
                      1. 검색 옵션을 변경해서 다시 검색해 보세요.
                      <br />
                      2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                    </p>
                    <p className="tx-disabled">* 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.</p>
                  </div>
                ) : (
                  <div className="list-wrap mt16">
                    <div className="list-filter">
                      <p className="inquire-num">총 {totalCount}대</p>
                    </div>
                    <TabMenu type="type8" defaultTab={1} callBack={onTabIconClick}>
                      <TabCont id="tab8-1" index={0}>
                        <ul className="goods-list card-type">
                          {isListLoading &&
                            !isEmpty(carListData) &&
                            carListData.map((v, i) => {
                              if (v.isMarkup === undefined) {
                                return <BannerItemBuyCar key={v?.dlrPrdId} data={v} />;
                              }
                              if (v.isNumber === 1) {
                                return (
                                  <BannerItemBuyCar key={i} isMarkup={true}>
                                    <div className="faq-bn">
                                      <Link href="/cscenter/faq">
                                        <a>
                                          <i className="ico-qna">Q</i>
                                          <p className="tit">
                                            현대 오토벨 홈서비스는 전국 어디든지 배송이
                                            <br />
                                            가능한가요?
                                          </p>
                                          <p className="exp">네, 고객님 전국 어디든 배송이 가능합니다. 배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
                                          <Button
                                            size="sml"
                                            line="gray"
                                            radius={true}
                                            title="FAQ 자세히보기"
                                            width={86}
                                            height={24}
                                            marginTop={23}
                                            buttonMarkup={true}
                                            href="/cscenter/faq"
                                            nextLink={true}
                                          />
                                        </a>
                                      </Link>
                                    </div>
                                  </BannerItemBuyCar>
                                );
                              } else if (v.isNumber === 2) {
                                return (
                                  <BannerItemBuyCar key={i} isMarkup={true}>
                                    <div className="review-bn">
                                      <Link href="">
                                        <a>
                                          <div className="img-wrap">
                                            <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                                          </div>
                                          <p className="tit">
                                            쇼핑몰처럼
                                            <br />
                                            편리해요!
                                          </p>
                                          <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                                        </a>
                                      </Link>
                                    </div>
                                  </BannerItemBuyCar>
                                );
                              } else if (v.isNumber === 3) {
                                return (
                                  <BannerItemBuyCar key={i} isMarkup={true}>
                                    <div className="autobell-bn">
                                      <Link href="/homeService/serviceGuide">
                                        <a>
                                          <span>
                                            <i className="ico-autobell-gray" />
                                          </span>
                                          <p className="tit">
                                            현대 오토벨
                                            <br />
                                            홈서비스 차량이란
                                          </p>
                                          <p className="exp">
                                            · 년식 9년 이하
                                            <br />
                                            · 주행거리 14만 키로 이하
                                            <br />· 오토벨에서 인증한 차량
                                          </p>
                                        </a>
                                      </Link>
                                    </div>
                                  </BannerItemBuyCar>
                                );
                              }
                            })}
                        </ul>
                      </TabCont>
                      <TabCont id="tab8-2" index={1}>
                        <ul className="goods-list list-type vertical">
                          {!isEmpty(carListData) &&
                            carListData.map((v, i) => {
                              if (!isUndefined(v?.dlrPrdId)) return <BannerItemBuyCar key={v?.dlrPrdId} data={v} openMLoginPop={handleFpLoginOpen} />;
                            })}
                        </ul>
                        {isLoadingImage && (
                          <div className="more-loading">
                            <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                          </div>
                        )}
                      </TabCont>
                    </TabMenu>
                  </div>
                )}
              </div>
            </div>
            <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
              <div className="content-wrap">
                <div className="login-wrap">
                  <MobLogin errorPw={false} callback={handleFpLoginClose} />
                  {/* mode="popup" errorPw={false} noMemArea={false} callback={handleFpLoginClose */}
                </div>
              </div>
            </MobFullpagePopup>
          </>
        ) : (
          <MobSearchPopUp
            dataContext={srchOption}
            onClose={handleLayoutToggle}
            onSelect={handleOnSearchSelect}
            isKeyword={true}
            canUseYear={false}
            canUseOption={false}
            canUseMission={false}
            canUseDspl={false}
            canUseAutoBellSvc={false}
            clearTrigger={clearTrigger}
          />
        )}
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{ paddingTop: 55 }}>홈서비스</h3>
          <p>
            집에서 배송 받고 3일간 타보고 결정하는 <b>중고차 비대면 구매 서비스</b>입니다. <br />
            전체 차량 중 <b>#홈서비스</b> 마크가 붙은 차량을 구매 신청하세요!
          </p>
          <Button size="big" line="white" color="white" title="자세히 보기" marginTop={32} width={140} onClick={(e) => onClickBtn(e, '/homeService/homeServiceGuide')} />
          <ul className="service-ico">
            <li>
              <i className="ico-confirm-white" />
              <p className="tit">안심차량</p>
              <p className="exp">오토벨이 인증한 차량</p>
            </li>
            <li>
              <i className="ico-deliver-white" />
              <p className="tit">배송 서비스</p>
              <p className="exp">편리하게 우리집까지</p>
            </li>
            <li>
              <i className="ico-refund-white" />
              <p className="tit">환불 가능</p>
              <p className="exp">3일 동안 타보고 결정</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrap home-service-wrap">
        <div className="search-sec">
          <CarFilter title="홈서비스 차량 검색" type={'home'} onChange={filterChange} selected={{}} />
        </div>
        <div className="list-sec">
          <ul className="float-wrap">
            <li>
              <p className="num-tx">
                총 <span className="ea">{totalCount}</span> 대
              </p>
            </li>
            <li>
              <RadioGroup className="sort-radio" dataList={selectOrder} defaultValue={selectValue} onChange={(e) => onHandleOrder(e)} />
            </li>
          </ul>
          <ul className="goods-list col3">
            {carListData.map((v, i) => {
              if (v.isMarkup === undefined) {
                return <BannerItemBuyCar key={v?.dlrPrdId} data={v} />;
              }
              if (v.isNumber === 1) {
                return (
                  <BannerItemBuyCar key={i} isMarkup={true}>
                    <Link href="/cscenter/faq">
                      <div className="faq-bn">
                        <i className="ico-qna">Q</i>
                        <p className="tit">현대 오토벨 홈서비스는 전국 어디든지 배송이 가능한가요?</p>
                        <p className="exp">
                          네, 고객님 전국 어디든 배송이 가능합니다.
                          <br />
                          배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.
                        </p>
                        <Link href="/cscenter/faq">
                          <p>FAQ 자세히 보기</p>
                        </Link>
                      </div>
                    </Link>
                  </BannerItemBuyCar>
                );
              } else if (v.isNumber === 2) {
                return (
                  <BannerItemBuyCar key={i} isMarkup={true}>
                    <div className="review-bn">
                      <div className="img-wrap">
                        <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                      </div>
                      <p className="tit">
                        쇼핑몰처럼
                        <br />
                        편리해요!
                      </p>
                      <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                    </div>
                  </BannerItemBuyCar>
                );
              } else if (v.isNumber === 3) {
                return (
                  <BannerItemBuyCar key={i} isMarkup={true}>
                    <Link href="/homeService/homeServiceGuide">
                      <div className="autobell-bn">
                        <span>
                          <i className="ico-autobell-gray" />
                        </span>
                        <p className="tit">
                          현대 오토벨
                          <br />
                          홈서비스 차량이란
                        </p>
                        <p className="exp">
                          · 년식 9년 이하
                          <br />
                          · 주행거리 14만 키로 이하
                          <br />· 오토벨에서 인증한 차량
                        </p>
                      </div>
                    </Link>
                  </BannerItemBuyCar>
                );
              } else if (v.isNumber === 4) {
                return (
                  <BannerItemBuyCar key={i} isMarkup={true}>
                    <div className="img-bn">
                      <p>
                        현대 Autobell
                        <br />
                        기획특가전
                      </p>
                      <Link href="">
                        <a>바로가기</a>
                      </Link>
                    </div>
                  </BannerItemBuyCar>
                );
              }
            })}
          </ul>
          {totalCount > homeServiceCarList?.length && (
            <div className="cate-list-btn2">
              <button onClick={onHandleListMore}>
                더보기 ( {homeServiceCarList?.length} / {totalCount} )
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default withRouter(HomeService);
