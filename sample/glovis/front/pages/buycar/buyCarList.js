/* eslint-disable react-hooks/rules-of-hooks */
/**
 * 설명 : 차량 목록(전체, 라이브스튜디오, 경매낙찰차량) 조회
 * @fileoverview 내차사기 > 전체차량 > 목록 화면(전체, 라이브스튜디오, 경매낙찰차량)
 * @module buyCarList
 * @requires buyCarListAction
 * @author 김지훈
 */

import React, { memo, useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { isEmpty, isEqual, isUndefined, union, take, find, cloneDeep } from 'lodash';
import { withRouter } from 'next/router';
import SearchArea from '@src/components/common/SearchArea';
import {
  getCarListStudio,
  getCarListGeneral,
  setLoadingImageMobile,
  setListLoadingMobile,
  getRecomendWordList,
  setSuggestWord,
  setSearchCrNo,
  setSearchOption
} from '@src/actions/buycar/buyCarListAction';
import { fetchRecommendItems, fetchSmartItems } from '@src/actions/buycar/recommendItemActions';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import CarFilter from '@src/components/common/car/buyCar/CarFilter';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RadioGroup from '@lib/share/items/RadioGroup';
import BuyCarNav from '@src/components/buycar/BuyCarNav';
import PagingBannerItem from '@src/components/common/banner/PagingBannerItem';
import MobSelectList from '@lib/share/items/MobSelectList';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';

///모바일 import
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import Button from '@lib/share/items/Button';
import MobSearchPopUp from '@src/components/common/MobSearchPopUp';
import { getCarDefaultFilter } from '@src/utils/CarFilterUtil';
import { setComma } from '@src/utils/StringUtil';
import { gInfoLive } from '@src/utils/LoginUtils';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLogin from '@src/components/common/MobLogin';

//상수 ========
//시작 페이지
const countPerPage = 20; // 첫번째페이지 레코드 수
const countPerMore = 10; // More 레코드 수
const pageInit = 1;
const pageMin = 1; //최소 페이지 수
const studioItemsMaxPerPage = 6; //최대 페이지 수

const selectOrder = [
  { id: 'sortUpload', value: 'upd_dt', checked: true, title: '최신 등록순' },
  { id: 'sortPrice', value: 'sl_amt', checked: false, title: '낮은 가격순' }
];
const orderSelectData = [
  { id: 'sortUpddtAsc', value: 'upd_dt', label: '최신 등록 순' },
  { id: 'sortSlamtAsc', value: 'sl_amt', label: '가격 낮은 순' },
  { id: 'sortSlamtDesc', value: 'sl_amt_desc', label: '가격 높은 순' },
  // { id: 'sortYearDesc', value: 'year_desc', label: '연식 낮은 순' },
  { id: 'sortYearDesc', value: 'year_desc', label: '최신 연식 순' },
  // { id: 'sortYearAsc', value: 'year_asc', label: '연식 높은 순' },
  { id: 'sortYearAsc', value: 'year_asc', label: '연식 오래된 순' },
  { id: 'sortDistAsc', value: 'dist_asc', label: '주행거리 낮은 순' },
  { id: 'sortDistDesc', value: 'dist_desc', label: '주행거리 높은 순' }
];

/**
 * 설명 : 차량 목록(전체, 라이브스튜디오, 경매낙찰차량) 조회, 관심상품, 비교하기
 * @returns {buyCarList} 전체 차량 목록화면
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const BuyCarList = memo(() => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const studioCarList = useSelector((state) => state.buyCarList.studioCarList);
  const preferCarList = useSelector((state) => state.buyCarList.preferCarList);
  const auctionCarList = useSelector((state) => state.buyCarList.auctionCarList);
  const totalCount = useSelector((state) => state.buyCarList.totalCount);
  const isLoadingImage = useSelector((state) => state.buyCarList.isLoadingImage); // 모바일용 로딩이미지
  const isListLoading = useSelector((state) => state.buyCarList.isListLoading); // 모바일용 로딩
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const smartCarList = useSelector((state) => state.recommentItems.smartList, []);
  const equivalentCarList = useSelector((state) => state.recommentItems.equivalentList, []);
  const generalCarList = useSelector((state) => state.buyCarList.generalCarList);
  const recommandWordsList = useSelector((state) => state.buyCarList.recommandWordsList);
  const selectedWord = useSelector((state) => state.buyCarList.selectedWord);
  const searchCrNo = useSelector((state) => state.buyCarList.searchCrNo);
  const reduxSrchOption = useSelector((state) => state.buyCarList.srchOption);
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);

  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const prevCurrentPage = usePrevious(currentPage);
  const pageSize = Math.ceil(studioCarList.length / 6);

  const [formData, setFormData] = useState(getCarDefaultFilter());
  const prevFormData = usePrevious(formData);

  const [srchOption, setSrchOption] = useState(reduxSrchOption || getCarDefaultFilter());
  const prevSrchOption = usePrevious(srchOption);

  const [isListMode, setIsListMode] = useState(true);
  const [selected, setSelected] = useState({});
  const [srchOrder, setSrchOrder] = useState('upd_dt');
  const prevSrchOrder = usePrevious(srchOrder);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지

  const [carSearchData, setCarSearchData] = useState({}); // 모바일용 스크롤 호출 중복방지
  const [carSearchMode, setCarSearchMode] = useState(false); // 모바일용 스크롤 호출 중복방지

  const [clearTrigger, setClearTrigger] = useState(false); //검색필터 초기화 props ( trigger )

  // 검색필터 변경 데이터 포맷 설정
  const handleSelect = useCallback(
    (e, deps) => {
      const data = Object.assign(getCarDefaultFilter(), deps);
      data.selectedModels = [
        {
          id: deps.crDtlMdlCd || deps.crMdlCd || deps.crMnfcCd || null,
          name: deps.crDtlMdlNm || deps.crMdlNm || deps.crMnfcNm || null,
          orgName: null,
          catNm: null,
          bsno: null,
          price: 0,
          nationId: null,
          manufactureId: deps.crMnfcCd || '',
          manufactureNm: deps.crMnfcNm || '',
          modelId: deps.crMdlCd || null,
          modelNm: deps.crMdlNm || null,
          detailModelId: deps.crDtlMdlCd || null,
          detailModelNm: deps.crDtlMdlNm || null,
          children: [],
          isLeaf: true,
          checked: true
        }
      ];
      setIsListMode(true);
      setSrchOption(data);
      // dispatch(setSearchOption(deps));
      dispatch(setSearchOption(data));
      dispatch(setListLoadingMobile(false));
      // handleOnSearchSelect(e, data);
    },
    [dispatch]
  );

  // 모바일, 검색필터 초기화
  const handleReset = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSrchOption(getCarDefaultFilter());
    setClearTrigger(true);
  }, []);

  // 초기화 작업을 한 ClearTrigger를 감지해서 false로 재 렌더링
  useEffect(() => {
    setClearTrigger(false);
  }, [clearTrigger]);

  const handleLayoutToggle = useCallback(
    (e) => {
      e.preventDefault();
      setIsListMode(!isListMode);
    },
    [isListMode]
  );

  // PC, 검색 필터 변경
  const filterChange = (form) => {
    if (!isEqual(formData, form)) {
      setFormData(form);
    }
  };

  // 상위 컴포넌트에서 reducer로 보낸 검색어를 받아서 실행
  const onSearchClick = useCallback(
    (e, suggestion) => {
      setCarSearchMode(false);
      setSelected(suggestion);
      // 모바일 검색기능 삽입
      if (hasMobile) {
        handleSelect(e, suggestion);
      }
    },
    [handleSelect, hasMobile]
  );

  const onHandleListMore = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (totalCount <= (generalCarList?.length || 0)) return;
      setCurrentPage(currentPage + 1);
    },
    [currentPage, generalCarList, totalCount]
  );

  const onHandleOrder = (e) => {
    setSrchOrder(e.target.value);
  };

  // Mobile, 검색 필터 변경
  const handleOnSearchSelect = useCallback(
    (e, deps) => {
      setIsListMode(!isListMode);
      if (!isEqual(srchOption, deps)) {
        setSrchOption(deps);
        // reducer에 searchOption 저장해놓기
        dispatch(setSearchOption(deps));
        dispatch(setListLoadingMobile(false));
      }
    },
    [dispatch, isListMode, srchOption]
  );

  // 모바일 리스트 정렬변경
  const handleSrchOrder = useCallback((e, deps) => {
    setSrchOrder(deps.value);
  }, []);

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if (totalCount <= (generalCarList?.length || 0)) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      setCurrentPage(currentPage + 1);
    }
  }, [loadingFlag, totalCount, generalCarList, dispatch, currentPage]);

  useEffect(() => {
    dispatch({ type: SECTION_BUY });
    if (hasMobile) {
      if (isListMode === true) {
        dispatch({
          type: MOBILE_HEADER_TYPE_SUB,
          data: {
            title: `검색 결과 ${totalCount ? setComma(totalCount) : '0'} 대`,
            options: ['back', 'search', 'gnb'],
            events: [null, handleLayoutToggle, null]
          }
        });
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 24,
            color: '#fff'
          }
        });
      } else {
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
      }
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, [dispatch, handleLayoutToggle, handleReset, hasMobile, isListMode, totalCount]);

  useEffect(() => {
    if (isEmpty(studioCarList) && isEmpty(preferCarList) && isEmpty(auctionCarList) && isEmpty(generalCarList)) {
      dispatch(fetchSmartItems());
      dispatch(fetchRecommendItems());
    }
  }, [dispatch, studioCarList, preferCarList, auctionCarList, generalCarList]);

  useEffect(() => {
    const dispatchAsync = async () => {
      if (hasMobile) {
        if ((!isUndefined(prevSrchOption) && !isEqual(prevSrchOption, srchOption)) || !isEqual(prevSrchOrder, srchOrder)) {
          dispatch(getCarListStudio(srchOption));
          dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore, srchOrder));
          setCurrentPage(1);
        } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
          dispatch(getCarListGeneral(srchOption, currentPage, countPerPage, countPerMore, srchOrder));
        }
      } else {
        if (!isUndefined(formData) && (!isEqual(prevFormData, formData) || !isEqual(prevSrchOrder, srchOrder))) {
          showLoader();
          dispatch(getCarListStudio(formData));
          await dispatch(getCarListGeneral(formData, 1, countPerPage, countPerMore, srchOrder));
          hideLoader();
          setCurrentPage(1);
        } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
          showLoader();
          await dispatch(getCarListGeneral(formData, currentPage, countPerPage, countPerMore, srchOrder));
          hideLoader();
        }
      }
    };
    dispatchAsync();
  }, [currentPage, dispatch, formData, hasMobile, hideLoader, prevCurrentPage, prevFormData, prevSrchOption, prevSrchOrder, showLoader, srchOption, srchOrder]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) {
        document.querySelector('#wrap').removeEventListener('scroll', onScroll);
        // document.querySelector('#wrap').scrollTo(0, 0);
      }
    };
  }, [hasMobile, onScroll, generalCarList, isListMode]);

  // 검색창 진입시 scroll 상단으로 포커싱
  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLayoutToggle]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [generalCarList]);

  useEffect(() => {
    dispatch(getRecomendWordList());
    return () => {
      dispatch(setSuggestWord({}));
      dispatch(setSearchCrNo(''));
    };
  }, [dispatch]);

  // 상위 컴포넌트에서 온 검색어를 가지고 검색기능 핸들러 실행
  useEffect(() => {
    if (!isEmpty(selectedWord)) {
      onSearchClick(null, selectedWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWord]);

  // 상위 컴포넌트에서 온 검색 차량번호가 있으면 차량 검색
  useEffect(() => {
    setSelected({});
    if (searchCrNo !== '' && !isUndefined(searchCrNo)) {
      axiosGet(`/api/buycar/selectSearchPrdbyCrNo.do?crNo=${searchCrNo}&userId=${gInfoLive.id}`).then((payload) => {
        if (payload.data.statusinfo.returncd === '000' && !isEmpty(payload.data.data.carlist)) {
          setCarSearchMode(true);
          setCarSearchData(payload.data.data.carlist);
        } else {
          showAlert('검색된 차량이 없습니다.');
          //setCarSearchMode(false);
        }
      });
    }
  }, [searchCrNo, showAlert]);

  const onClickRecWord = (recWord) => {
    axiosPost('/api/buycar/selectSearchCode.do', { searchText: recWord }).then((res) => {
      if (isEmpty(res.data.data.code)) {
        showAlert('검색 차량을 정확히 입력해주세요.');
      } else {
        const { code } = res.data.data;
        const tempMdlCd = cloneDeep(code.crMdlCd);
        const tempMdlNm = cloneDeep(code.crMdlNm);
        const tempDtlMdlCd = cloneDeep(code.crDtlMdlCd);
        const tempDtlMdlNm = cloneDeep(code.crDtlMdlNm);
        const sug = cloneDeep(code);
        sug.crMdlCd = isUndefined(tempMdlCd) ? '' : tempMdlCd;
        sug.crMdlNm = tempMdlNm ? '' : tempMdlNm;
        sug.crDtlMdlCd = [];
        if (tempDtlMdlCd) {
          sug.crDtlMdlCd.push(tempDtlMdlCd);
          sug.crDtlMdlNm = [];
          sug.crDtlMdlNm.push(tempDtlMdlNm);
        }
        sug.searchTerm = `${code.crMnfcNm} ${tempDtlMdlNm || ''}`;
        dispatch(setSearchCrNo(''));
        dispatch(setSuggestWord(sug));
      }
    });
  };

  if (hasMobile) {
    return (
      <AppLayout>
        {isListMode ? (
          isListLoading && isEmpty(generalCarList) ? (
            <>
              <div className="search-none bg">
                <h3>검색결과가 없습니다.</h3>
                <p>
                  1. 검색 옵션을 변경해서 다시 검색해 보세요.
                  <br />
                  2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                </p>
                <p className="tx-disabled">* 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.</p>
              </div>
              <div className="content-wrap">
                <div className="list-wrap">
                  {!isEmpty(smartCarList) && <h3 className="tit1 mt32 mb16">오토벨스마트 추천</h3>}
                  <ul className="goods-list list-type">
                    {!isEmpty(smartCarList) &&
                      take(smartCarList, 4).map((car) => {
                        return <BannerItem key={`msmart-${car?.dlrPrdId}`} data={car} />;
                      })}
                  </ul>
                </div>
                <div className="list-wrap">
                  {!isEmpty(equivalentCarList) && <h3 className="tit1 mt32 mb16">동급차량</h3>}
                  <ul className="goods-list list-type">
                    {!isEmpty(equivalentCarList) &&
                      take(equivalentCarList, 4).map((car) => {
                        return <BannerItem key={`mequi-${car?.dlrPrdId}`} data={car} />;
                      })}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            isListLoading && (
              <>
                <div className="list-slick search-result">
                  <h2>
                    라이브 스튜디오 차량
                    <Button className="fr" size="sml" line="gray" radius={true} title="전체보기" width={61} height={30} href={'/buycar/livestudio/buyCarList'} nextLink={true} />
                  </h2>
                  <ul className="goods-list">
                    <SlideBanner carList={take(studioCarList, 5)} touch={true} dots={true} autoplay={false} customArrow={true} multiNum={1} centerMode={true} infinite={false} />
                  </ul>
                </div>
                <div className="list-slick search-result">
                  <h2>
                    우대등록 / 스마트옥션 인증 차량
                    <Button className="fr" size="sml" line="gray" radius={true} title="전체보기" width={61} height={30} href={'/buycar/auction/buyCarList'} nextLink={true} />
                  </h2>
                  <ul className="goods-list">
                    <SlideBanner
                      carList={union(take(preferCarList, 2), take(auctionCarList, 2))}
                      touch={true}
                      dots={true}
                      autoplay={false}
                      customArrow={true}
                      multiNum={1}
                      centerMode={true}
                      infinite={false}
                    />
                  </ul>
                </div>
                <div className="content-wrap list-wrap general">
                  <div className="list-filter">
                    <MobSelectList
                      itemsSource={orderSelectData}
                      selectedItem={find(orderSelectData, ['value', srchOrder])}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      onClick={handleSrchOrder}
                      subPop={true}
                      width={136}
                    />
                  </div>
                  <TabMenu type="type8" defaultTab={1}>
                    <TabCont id="tab8-1" index={0}>
                      <ul className="goods-list card-type">
                        {!isEmpty(generalCarList) &&
                          generalCarList.map((car) => {
                            return <BannerItem key={`mgen1-${car?.dlrPrdId}`} data={car} />;
                          })}
                      </ul>
                      {isLoadingImage && (
                        <div className="more-loading">
                          <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                        </div>
                      )}
                    </TabCont>
                    <TabCont id="tab8-2" index={1}>
                      <ul className="goods-list list-type">
                        {!isEmpty(generalCarList) &&
                          generalCarList.map((car) => {
                            return <BannerItem key={`mgen2-${car?.dlrPrdId}`} data={car} />;
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
              </>
            )
          )
        ) : (
          <MobSearchPopUp
            dataContext={srchOption}
            onClose={handleLayoutToggle}
            onSelect={handleOnSearchSelect}
            isKeyword={true}
            recommandWordsList={recommandWordsList}
            onClickRecWord={onClickRecWord}
            selectAll={true}
            clearTrigger={clearTrigger}
          />
        )}
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          <div className="content-wrap">
            <div className="login-wrap">
              <MobLogin errorPw={false} noneCallBack={true} />
            </div>
          </div>
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <BuyCarNav nowPage={'allcar'} />
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter onChange={filterChange} selected={selected} />
        </div>
        <div className="list-sec">
          <div className="search-form">
            <SearchArea section="buy" wrapperClass="search-tp1" onClick={onSearchClick} searchTerm={selectedWord?.searchTerm || searchCrNo} />
            <ul className="list-recom-word">
              <li>
                <span>추천검색</span>
                <i className="recom-c" />
              </li>
              {!isEmpty(recommandWordsList) &&
                recommandWordsList.map((word, idx) => (
                  <>
                    <li key={`recom-${idx}`} onClick={() => onClickRecWord(word.srchWord)}>
                      <a title={word.srchWord}>{word.srchWord}</a>
                    </li>
                  </>
                ))}
            </ul>
          </div>
          {/* 검색결과 없을 경우 Default 화면 */}
          {isEmpty(studioCarList) && isEmpty(preferCarList) && isEmpty(auctionCarList) && isEmpty(generalCarList) && !carSearchMode ? (
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
                <ul className={'goods-list col3'}>
                  {smartCarList.map((car) => {
                    return <BannerItemBuyCar key={`smart-${car?.dlrPrdId}`} data={car} />;
                  })}
                </ul>
              </div>
              <div className="list-wrap">
                <div className="list-tit">
                  <h4>동급 차량 추천</h4>
                </div>
                <ul className={'goods-list col3'}>
                  {equivalentCarList.map((car) => {
                    return <BannerItemBuyCar key={`equi-${car?.dlrPrdId}`} data={car} />;
                  })}
                </ul>
              </div>
            </>
          ) : (
            <>
              {/*AutoBell Studio 차량*/}
              {!isEmpty(studioCarList) && !carSearchMode && (
                <PagingBannerItem
                  bannerType={'horizon'}
                  ulClass={'goods-list col3'}
                  min={pageMin}
                  max={pageSize}
                  initNum={pageInit}
                  maxItemsPerPage={studioItemsMaxPerPage}
                  pageSize={pageSize}
                  dataList={studioCarList}
                >
                  <h4>라이브 스튜디오 차량</h4>
                </PagingBannerItem>
                // <SlideBanner carList={studioCarList} touch={true} dots={true} autoplay={true} customArrow={true} multiNum={1} centerMode={true} infinite={false} />
                // <SlideBanner carList={studioCarList} touch={true} dots={true} autoplay={true} customArrow={true} />
              )}

              {/*우대등록 차량*/}
              {!isEmpty(preferCarList) && !carSearchMode && (
                <div className="list-wrap">
                  <div className="list-tit">
                    <h4>우대등록 차량</h4>
                  </div>
                  <ul className={'goods-list col3'}>
                    {preferCarList.map((car) => {
                      return <BannerItemBuyCar key={`prefer-${car?.dlrPrdId}`} data={car} />;
                    })}
                  </ul>
                </div>
              )}

              {/*경매낙찰 차량*/}
              {!isEmpty(auctionCarList) && !carSearchMode && (
                <div className="list-wrap">
                  <div className="list-tit">
                    <h4>스마트옥션 인증 차량</h4>
                  </div>
                  <ul className={'goods-list col3'}>
                    {auctionCarList.map((car) => {
                      return <BannerItemBuyCar key={`auct-${car?.dlrPrdId}`} data={car} />;
                    })}
                  </ul>
                </div>
              )}

              {/*일반등록 차량*/}
              {!isEmpty(generalCarList) && !carSearchMode && (
                <div className="list-wrap general">
                  <div className="list-tit">
                    <h4>일반등록 차량</h4>
                    <RadioGroup className="sort-radio" dataList={selectOrder} defaultValue={srchOrder} onChange={(e) => onHandleOrder(e)} />
                  </div>
                  <TabMenu type="type8" defaultTab={1}>
                    {/*카드 형태*/}
                    <TabCont id="tab8-1" index={0}>
                      <ul className={'goods-list col3'}>
                        {generalCarList.map((car) => {
                          return <BannerItemBuyCar bannerType={'horizon'} key={`genh-${car?.dlrPrdId}`} data={car} />;
                        })}
                      </ul>
                      {totalCount > (generalCarList?.length || 0) && (
                        <div className="cate-list-btn2">
                          <button onClick={onHandleListMore}>
                            더보기( {generalCarList?.length} / {totalCount} )
                          </button>
                        </div>
                      )}
                    </TabCont>
                    {/*목록 형태*/}
                    <TabCont id="tab8-2" index={1}>
                      {/* <ul className={'goods-list-ver'}> */}
                      <table summary="일반등록 차량 리스트" className="table-tp1 goods-list">
                        <caption className="away">일반등록 차량</caption>
                        <colgroup>
                          <col width="20.5%" />
                          <col width="47%" />
                          <col width="32.5%" />
                        </colgroup>
                        <tbody>
                          {generalCarList.map((car) => {
                            return <BannerItemBuyCar bannerType={'vertical'} key={`genv-${car?.dlrPrdId}`} data={car} />;
                          })}
                        </tbody>
                      </table>
                      {/* </ul> */}
                      {totalCount > (generalCarList?.length || 0) && (
                        <div className="cate-list-btn2">
                          <button onClick={onHandleListMore}>
                            더보기 ( {generalCarList?.length} / {totalCount} )
                          </button>
                        </div>
                      )}
                    </TabCont>
                  </TabMenu>
                </div>
              )}
              {carSearchMode && (
                <div className="list-wrap">
                  <div className="list-tit">
                    <h4>차량 번호 검색</h4>
                  </div>
                  <ul className={'goods-list col3'}>
                    <BannerItemBuyCar bannerType={'horizon'} data={carSearchData} />
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
});

BuyCarList.displayName = 'BuyCarList';
export default withRouter(BuyCarList);
