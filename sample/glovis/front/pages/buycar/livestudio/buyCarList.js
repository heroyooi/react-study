/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
/**
 * 설명 : 라이브스튜디오 차량 목록 조회
 * @fileoverview 내차사기 > 라이브스튜디오 > 메인
 * @module buyCarList
 * @requires liveStudioAction
 * @author 한관영
 */

import React, { useCallback, useEffect, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual, isUndefined } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { getCarListGeneral, setLoadingImageMobile, setListLoadingMobile } from '@src/actions/buycar/buyCarListAction';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import CarFilter from '@src/components/common/car/buyCar/CarFilter';
import BuyCarNav from '@src/components/buycar/BuyCarNav';
import MobSearchPopUp from '@src/components/common/MobSearchPopUp';
import Button from '@lib/share/items/Button';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLogin from '@src/components/common/MobLogin';
import { getCarDefaultFilter } from '@src/utils/CarFilterUtil';
import { setComma } from '@src/utils/StringUtil';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
// import SelectBox from '@lib/share/items/SelectBox';
import { SystemContext } from '@src/provider/SystemProvider';


/**
 * 설명 : 라이브스튜디오 차량 목록 조회, 관심상품, 비교하기
 * @returns {buyCarList} 라이브스튜디오 차량 목록화면
 */

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const buyCarListLiveStduio = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const studioCarList = useSelector((state) => state.buyCarList.generalCarList);
  const totalCount = useSelector((state) => state.buyCarList.totalCount);
  const isLoadingImage = useSelector((state) => state.buyCarList.isLoadingImage); // 모바일용 로딩이미지
  const isListLoading = useSelector((state) => state.buyCarList.isListLoading); // 모바일용 로딩
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const prevCurrentPage = usePrevious(currentPage);
  const countPerPage = 12; // 첫번째페이지 레코드 수
  const countPerMore = 12; // More 레코드 수

  const [formData, setFormData] = useState({});
  const prevFormData = usePrevious(formData);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지

  const [isListMode, setIsListMode] = useState(true);
  const [srchOption, setSrchOption] = useState(getCarDefaultFilter('live'));
  const prevSrchOption = usePrevious(srchOption);
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);

  const handleReset = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setSrchOption(getCarDefaultFilter('live'));
      dispatch(setListLoadingMobile(false));
    },
    [dispatch]
  );

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

  // Mobile, 검색 필터 변경
  const handleOnSearchSelect = useCallback(
    (e, deps) => {
      if (!isEqual(srchOption, deps)) {
        setSrchOption(deps);
        dispatch(setListLoadingMobile(false));
      }
      setIsListMode(!isListMode);
    },
    [dispatch, isListMode, srchOption]
  );

  // PC, 더보기
  const onHandleListMore = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (totalCount <= (studioCarList?.length || 0)) return;
      setCurrentPage(currentPage + 1);
    },
    [currentPage, studioCarList, totalCount]
  );

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    if (document.querySelector('#wrap').scrollTop + document.documentElement.clientHeight > document.querySelector('#wrap').scrollHeight - 100 && loadingFlag) {
      if (totalCount <= (studioCarList?.length || 0)) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      setCurrentPage(currentPage + 1);
    }
  }, [loadingFlag, totalCount, studioCarList, dispatch, currentPage]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [studioCarList]);

  useEffect(() => {
    dispatch({ type: SECTION_BUY });
    if (hasMobile) {
      if (isListMode === true) {
        dispatch({
          type: MOBILE_HEADER_TYPE_SUB,
          data: {
            title: `라이브스튜디오 ${totalCount ? setComma(totalCount) : '0'} 대`,
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
      }
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, [dispatch, handleLayoutToggle, handleReset, hasMobile, isListMode, totalCount]);

  // Initial 목록조회
  useEffect(() => {
    if (!hasMobile && !isUndefined(prevFormData)) dispatch(getCarListGeneral(formData, 1, countPerPage, countPerMore));
  }, []);

  useEffect(() => {
    const dispatchAsync = async () => {
      if (hasMobile) {
        if (!isEqual(prevSrchOption, srchOption)) {
          await dispatch(getCarListGeneral(srchOption, 1, countPerPage, countPerMore));
          setCurrentPage(1);
        } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
          await dispatch(getCarListGeneral(srchOption, currentPage, countPerPage, countPerMore));
        }
      } else {
        showLoader()
        console.log('loader show')
        if (!isUndefined(prevFormData) && !isEqual(prevFormData, formData)) {
          await dispatch(getCarListGeneral(formData, 1, countPerPage, countPerMore));
          setCurrentPage(1);
        } else if (currentPage > 1 && !isEqual(prevCurrentPage, currentPage)) {
          await dispatch(getCarListGeneral(formData, currentPage, countPerPage, countPerMore));
        }
        console.log('loader hide')
        hideLoader()
      }
    }
    dispatchAsync()
  }, [hasMobile, formData, srchOption, currentPage, dispatch, prevFormData, prevCurrentPage, prevSrchOption]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, studioCarList]);

  if (hasMobile) {
    return (
      <AppLayout>
        {isListMode ? (
          <div className="list-sec">
            <div className="list-banner live">
              <p className="tit">
                오토벨 <span className="tx-red60">라이브 스튜디오</span>는?
              </p>
              <p className="exp">
                내·외부 360˚ LIVE 이미지로 생생하게 확인하고, 오토벨 차량 진단으로 믿고 구매하실 수 있습니다. <br />
                차량 정보에서 <em className="option-tp2 bg-red">라이브</em> 뱃지를 확인하세요!
              </p>
              <Button className="cross-browsing" size="mid" line="gray" color="black" radius={true} title="오토벨 라이브 스튜디오 차량이란?" marginTop={16} width={238} href="buyCarliveStudioGuide" />
            </div>
            <div className="content-wrap list-wrap mt20">
              <ul className="goods-list list-type vertical">
                {isListLoading &&
                  !isEmpty(studioCarList) &&
                  studioCarList.map((car) => {
                    return <BannerItemBuyCar key={car?.dlrPrdId} data={car} />;
                  })}
              </ul>
              {isLoadingImage && (
                <div className="more-loading">
                  <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <MobSearchPopUp dataContext={srchOption} onClose={handleLayoutToggle} onSelect={handleOnSearchSelect} selectAll={true} />
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
      <BuyCarNav nowPage={'livestudio'} />
      <div className="content-wrap buy-wrap">
        <div className="search-sec">
          <CarFilter onChange={filterChange} selected={{}} type={'live'} />
        </div>
        <div className="list-sec">
          <div className="list-banner live">
            <p className="tit">
              오토벨 <span className="tx-red60">라이브 스튜디오</span>는?
            </p>
            <p className="exp">
              내·외부 360˚ LIVE 이미지로 생생하게 확인하고, <br />
              오토벨 차량 진단으로 믿고 구매하실 수 있습니다. <br />
              차량 정보에서 <em className="option-tp2 bg-red">라이브</em> 뱃지를 확인하세요!
            </p>
            <Button size="mid" line="gray" color="black" radius={true} title="오토벨 라이브 스튜디오 차량이란?" marginTop={20} width={244} href="buyCarliveStudioGuide" />
          </div>

          {/*라이브스튜디오 차량*/}
          {!isEmpty(studioCarList) && (
            <div className="list-wrap">
              {/* <div className="list-tit">
                <h4>라이브스튜디오 차량</h4>
                <SelectBox id="select1" className="items-sbox" onChange={onHandleOrderBySelected} options={selectOrder} width={148} height={36} placeHolder="최신 등록순" />
              </div> */}
              <ul className={'goods-list col3'}>
                {studioCarList.map((car) => {
                  return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                })}
              </ul>
              {totalCount > (studioCarList?.length || 0) && (
                <div className="cate-list-btn2">
                  <button onClick={onHandleListMore}>
                    더보기( {studioCarList?.length} / {totalCount} )
                  </button>
                </div>
              )}
            </div>
          )}
          {isEmpty(studioCarList) && (
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
          )}
        </div>
      </div>
    </AppLayout>
  );
};
export default buyCarListLiveStduio;
// buyCarListLiveStduio.getInitialProps = async (http) => {
//   // console.table(Object.keys(http));
//   // ┌─────────┬──────────────┐
//   // │ (index) │    Values    │
//   // ├─────────┼──────────────┤
//   // │    0    │    'err'     │
//   // │    1    │    'req'     │
//   // │    2    │    'res'     │
//   // │    3    │  'pathname'  │
//   // │    4    │   'query'    │
//   // │    5    │   'asPath'   │
//   // │    6    │  'AppTree'   │
//   // │    7    │ 'reduxStore' │
//   // └─────────┴──────────────┘
//   const { reduxStore, req } = http;
//   const query = req?.query || http?.query || '';
//   const fullUrl = req ? `${req.protocol}://${req.get('host')}${req.originalUrl}` : 'http://localhost';

//   //await reduxStore.dispatch(getCarListGeneral({ svc: ['0100'] }));
//   return { fullUrl };
// };
