/* eslint-disable react-hooks/rules-of-hooks */
import { find, findIndex, isEmpty, isEqual, isUndefined } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { imgUrl } from '@src/utils/HttpUtils';
import RenderHelper from '@lib/share/render/helper';
import MobSelectList from '@lib/share/items/MobSelectList';
import SelectBox from '@lib/share/items/SelectBox';
import TabCont from '@lib/share/tab/TabCont';
import TabMenu from '@lib/share/tab/TabMenu';
import {
  getCarList,
  getCmllDetail,
  getCmllShopList,
  getAreaList,
  getMnfcList,
  getFuelList,
  getModelList,
  // getCmllShopDetail,
  setLoadingImageMobile
} from '@src/actions/buycar/certificationmall/certiMallViewAction';
import { MOBILE_CONTENT_STYLE, MOBILE_HEADER_TYPE_SUB, SECTION_BUY, MOBILE_QUICK_EXIST } from '@src/actions/types';
import BuyCarNav from '@src/components/buycar/BuyCarNav';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import KakaoMap from '@src/components/common/KakaoMap';
import MobSearchPopUp from '@src/components/common/MobSearchPopUp';
import AppLayout from '@src/components/layouts/AppLayout';
import { getCarDefaultFilter } from '@src/utils/CarFilterUtil';
import { setComma } from '@src/utils/StringUtil';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLogin from '@src/components/common/MobLogin';

// 페이지 당 차량 수
const ITEMS_PER_PAGE = 8;
const SEL_TYPE = { AREA: 'locCd', MNFC: 'crMnfcCd', MODEL: 'crMdlCd', FUEL: 'fuelDvCd' };
const orderSelectData = [
  { id: 'order-data', label: '최신 등록순', value: 'upd_dt' },
  { id: 'order-price', label: '낮은 가격순', value: 'sl_amt' }
];

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const buyCarCertiView = ({ amllId }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 현재 페이지
  const curPage = useRef(1);
  const cmllDetail = useSelector((state) => state.certiMallView.cmllDetail);
  const selAreaList = useSelector((state) => state.certiMallView.selAreaList);
  // const selManufactureValue = cmllDetail?.crMnfcCd || '';
  // const selManufactureList = [{ value: cmllDetail?.crMnfcCd || '', label: cmllDetail?.crMnfcNm || '없음' }];
  const selManufactureList = useSelector((state) => state.certiMallView.selMnfcList);
  const selModelList = useSelector((state) => state.certiMallView.selModelList);
  const selFuelList = useSelector((state) => state.certiMallView.selFuelList);
  const selShopList = useSelector((state) => state.certiMallView.selShopList);
  const carList = useSelector((state) => state.certiMallView.carList);
  const totalCount = useSelector((state) => state.certiMallView.totalCount);
  const isLoadingImage = useSelector((state) => state.certiMallView.isLoadingImage); // 모바일용 로딩이미지
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  let initShopDetail = {};
  if (!isEmpty(selShopList)) {
    initShopDetail = cmllDetail.deleShopId ? selShopList[findIndex(selShopList, ['value', cmllDetail.deleShopId])] : selShopList[0];
  }
  const [selAreaValue, setSelAreaValue] = useState(isEmpty(selAreaList) ? '' : selAreaList[0]?.value || '');
  const [selManufactureValue, setSelManufactureValue] = useState(isEmpty(selManufactureList) ? '' : selManufactureList[0]?.value || '');
  const [selModelValue, setSelModelValue] = useState(isEmpty(selModelList) ? '' : selModelList[0]?.value || '');
  const [selFuelValue, setSelFuelValue] = useState(isEmpty(selFuelList) ? '' : selFuelList[0]?.value || '');
  const [selShopValue, setSelShopValue] = useState(initShopDetail?.value || '');
  const [shopDetail, setShopDetail] = useState(initShopDetail);

  // 모바일
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [srchOption, setSrchOption] = useState(getCarDefaultFilter('certi', cmllDetail?.prtnKncd || '', cmllDetail?.crMnfcCd || '', cmllDetail?.crMnfcNm || ''));
  const prevSrchOption = usePrevious(srchOption);
  const [srchOrder, setSrchOrder] = useState('upd_dt');
  const prevSrchOrder = usePrevious(srchOrder);
  const [isListMode, setIsListMode] = useState(true);

  const handleReset = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setSrchOption(getCarDefaultFilter('certi', cmllDetail?.prtnKncd || '', cmllDetail?.crMnfcCd || '', cmllDetail?.crMnfcNm || ''));
    },
    [cmllDetail]
  );

  //  모바일 리스트보기 형태
  const handleLayoutToggle = useCallback(
    (e) => {
      e.preventDefault();
      setIsListMode(!isListMode);
    },
    [isListMode]
  );

  const onChangeShopList = useCallback((e) => {
    setSelShopValue(e.value);
    setShopDetail(e);
  }, []);

  const onChangeShopListM = useCallback((e, deps) => {
    setSelShopValue(deps.value);
    setShopDetail(find(selShopList, ['value', deps.value]));
  }, []);

  const onHandleListMore = useCallback(
    (e, isMore = true, locCd = '', crMnfcCd = '', crMdlCd = '', fuelDvCd = '') => {
      if (e) e.preventDefault();
      if ((curPage.current - 1) * ITEMS_PER_PAGE > (carList?.length || 0)) return;
      curPage.current = isMore ? curPage.current + 1 : 1;
      dispatch(getCarList(amllId, curPage.current, locCd, crMnfcCd, crMdlCd, fuelDvCd));
    },
    [dispatch, selAreaValue, selManufactureValue, selModelValue, selFuelValue]
  );

  //=================================================================================
  // 셀렉트 박스 의존관계 : 지역 > 제조사 > 모델 > 연료
  //=================================================================================
  const onChangeSelect = (e, type) => {
    switch (type) {
      case SEL_TYPE.AREA:
        setSelAreaValue(e.value);
        setSelManufactureValue('');
        setSelModelValue('');
        setSelFuelValue('');
        break;
      case SEL_TYPE.MNFC:
        setSelManufactureValue(e.value);
        setSelModelValue('');
        setSelFuelValue('');
        break;
      case SEL_TYPE.MODEL:
        setSelModelValue(e.value);
        setSelFuelValue('');
        break;
      case SEL_TYPE.FUEL:
        setSelFuelValue(e.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getMnfcList(amllId, selAreaValue));
  }, [amllId, dispatch, selAreaValue]);
  useEffect(() => {
    dispatch(getModelList(amllId, selAreaValue, selManufactureValue));
  }, [amllId, dispatch, selAreaValue, selManufactureValue]);
  useEffect(() => {
    dispatch(getFuelList(amllId, selAreaValue, selManufactureValue, selModelValue));
  }, [amllId, dispatch, selAreaValue, selManufactureValue, selModelValue]);
  useEffect(() => {
    onHandleListMore(null, false, selAreaValue, selManufactureValue, selModelValue, selFuelValue);
  }, [amllId, dispatch, selAreaValue, selManufactureValue, selModelValue, selFuelValue, onHandleListMore]);

  // 모바일 검색 필터 변경
  const handleOnSearchSelect = useCallback(
    (e, deps) => {
      if (!isEqual(srchOption, deps)) {
        setSrchOption(deps);
      }
      setIsListMode(!isListMode);
    },
    [isListMode, srchOption]
  );

  // 모바일, 리스트 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if (curPage.current * ITEMS_PER_PAGE > (carList?.length || 0)) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      curPage.current = curPage.current + 1;
      const locCd = srchOption?.loc.toString() || '';
      const crMnfcCd = srchOption?.crMnfcCd || '';
      const crMdlCd = srchOption?.crMdlCd || '';
      const fuelDvCd = srchOption?.fuel.toString() || '';
      dispatch(getCarList(amllId, curPage.current, locCd, crMnfcCd, crMdlCd, fuelDvCd, srchOrder));
    }
  }, [loadingFlag, dispatch, srchOption, amllId, srchOrder]);

  // 모바일 리스트 정렬변경
  const handleSrchOrder = useCallback((e, deps) => {
    setSrchOrder(deps.value);
  }, []);

  useEffect(() => {
    if (!hasMobile) {
      dispatch(getCarList(amllId, 1));
    } else {
      dispatch(getCarList(amllId, 1, '', '', '', '', srchOrder));
    }
  }, []);

  useEffect(() => {
    if (hasMobile) {
      dispatch({ type: SECTION_BUY });
      if (isListMode) {
        dispatch({
          type: MOBILE_HEADER_TYPE_SUB,
          data: {
            title: `${cmllDetail?.amllNm || ''} 인증몰 ${totalCount ? setComma(totalCount) : '0'} 대`,
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
            title: `${cmllDetail?.amllNm || ''} 인증중고차 차량검색`,
            options: ['back', 'reset'],
            events: [handleLayoutToggle, handleReset]
          }
        });
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 56,
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
  }, [dispatch, handleLayoutToggle, handleReset, hasMobile, isListMode, cmllDetail, carList, totalCount]);

  useEffect(() => {
    if (hasMobile) {
      if (!isUndefined(prevSrchOption) && (!isEqual(prevSrchOption, srchOption) || !isEqual(prevSrchOrder, srchOrder))) {
        curPage.current = 1;
        const locCd = srchOption?.loc.toString() || '';
        const crMnfcCd = srchOption?.crMnfcCd || '';
        const crMdlCd = srchOption?.crMdlCd || '';
        const fuelDvCd = srchOption?.fuel.toString() || '';
        dispatch(getCarList(amllId, curPage.current, locCd, crMnfcCd, crMdlCd, fuelDvCd, srchOrder));
      }
    }
  }, [dispatch, amllId, hasMobile, srchOrder, prevSrchOption, srchOption, prevSrchOrder]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, carList]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [carList]);
  console.log('cmllDetail -=-=-=-=-=', cmllDetail);
  if (hasMobile) {
    return (
      <AppLayout>
        {isListMode ? (
          <div className="list-sec">
            <div className="list-banner brand" style={{ background: `url(${imgUrl}${cmllDetail.bnrImgUrl}) no-repeat center`, backgroundSize: '100%' }}>
              <p className="tit">{cmllDetail?.bnrTtlNm || ''}</p>
              <p className="exp">{cmllDetail?.subTtlNm || ''} 인증 중고차</p>
            </div>
            <div className="list-wrap brand">
              <TabMenu type="type2">
                <TabCont tabTitle="중고차 검색" id="tab2-1" index={0}>
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
                        {!isEmpty(carList) &&
                          carList.map((car) => {
                            return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
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
                        {!isEmpty(carList) &&
                          carList.map((car) => {
                            return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                          })}
                      </ul>
                      {isLoadingImage && (
                        <div className="more-loading">
                          <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                        </div>
                      )}
                    </TabCont>
                  </TabMenu>
                </TabCont>
                <TabCont tabTitle="전시장 안내" id="tab2-2" index={1}>
                  <div className="float-wrap mb20">
                    <MobSelectList
                      itemsSource={selShopList}
                      selectedItem={find(selShopList, ['value', selShopValue])}
                      displayMemberPath={'shopNm'}
                      selectedValuePath={'value'}
                      onClick={onChangeShopListM}
                      subPop={true}
                      width={'100%'}
                    />
                  </div>
                  {shopDetail?.amllShopId && (
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
                            <a href={`https://map.kakao.com/link/search/${shopDetail.shopAddr}`}>{shopDetail.shopAddr}</a>
                          </tr>
                          <tr>
                            <th>전화</th>
                            <td>{shopDetail.shopPn}</td>
                          </tr>
                          <tr>
                            <th>영업시간</th>
                            <td dangerouslySetInnerHTML={{ __html: shopDetail.shopOptmCntn }} />
                          </tr>
                        </tbody>
                      </table>
                      {shopDetail?.shopAddr && (
                        <div className="map-wrap">
                          <KakaoMap id="map-certi-mob" style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={shopDetail.shopAddr} />
                        </div>
                      )}
                    </div>
                  )}
                </TabCont>
              </TabMenu>
            </div>
          </div>
        ) : (
          <MobSearchPopUp
            canUseCho={false}
            canUseCarType={false}
            canUseDrvDist={false}
            canUseYear={false}
            canUsePrice={false}
            canUseAutoBellSvc={false}
            canUseOption={false}
            canUseColor={false}
            canUseMission={false}
            canUseDspl={false}
            canUseRecently={false}
            selectionMode={'model'}
            dataContext={{ ...srchOption, crMnfcNm: cmllDetail.crMnfcNm, crMnfcCd: cmllDetail.crMnfcCd }}
            isMultiSelect={false}
            onClose={handleLayoutToggle}
            onSelect={handleOnSearchSelect}
            selectAll={true}
          />
        )}
        {/* <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          <div className="content-wrap">
            <div className="login-wrap">
              <MobLogin errorPw={false} noneCallBack={true} />
            </div>
          </div>
        </MobFullpagePopup> */}
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <BuyCarNav nowPage={'certificationview'} />
      <div className="content-wrap buy-wrap">
        <div className="list-sec">
          <div className="list-banner brand" style={{ backgroundImage: `url(${imgUrl}${cmllDetail.bnrImgUrl})` }}>
            {/* style={{ background: 'URL(/images/contents/brand-banner-bg.png) no-repeat 0 0' }}> bmw*/}
            {/* style={{ background: 'URL(/images/contents/brand-banner-bg2.png) no-repeat 0 0' }}> benz*/}
            <p className="tit">{cmllDetail?.bnrTtlNm || ''}</p>
            <p className="exp">{cmllDetail?.subTtlNm || ''}</p>
          </div>
          <div className="list-wrap brand">
            <TabMenu type="type7">
              <TabCont tabTitle="중고차 검색" id="tab7-1" index={0}>
                <div className="list-tit">
                  <ul>
                    <li>
                      <SelectBox
                        id="sel-area"
                        className="items-sbox"
                        onChange={(e) => onChangeSelect(e, SEL_TYPE.AREA)}
                        options={selAreaList}
                        value={selAreaValue}
                        width={148}
                        height={36}
                        placeHolder="지역"
                      />
                    </li>
                    <li>
                      <SelectBox
                        id="sel-manufacturer"
                        className="items-sbox"
                        onChange={(e) => onChangeSelect(e, SEL_TYPE.MNFC)}
                        options={selManufactureList}
                        value={selManufactureValue}
                        width={148}
                        height={36}
                        placeHolder="제조사"
                      />
                    </li>
                    <li>
                      <SelectBox
                        id="sel-model"
                        className="items-sbox"
                        onChange={(e) => onChangeSelect(e, SEL_TYPE.MODEL)}
                        options={selModelList}
                        value={selModelValue}
                        width={148}
                        height={36}
                        placeHolder="모델"
                      />
                    </li>
                    <li>
                      <SelectBox
                        id="sel-fuel"
                        className="items-sbox"
                        onChange={(e) => onChangeSelect(e, SEL_TYPE.FUEL)}
                        options={selFuelList}
                        value={selFuelValue}
                        width={148}
                        height={36}
                        placeHolder="연료"
                      />
                    </li>
                  </ul>
                </div>
                <ul className="goods-list">
                  {!isEmpty(carList) &&
                    carList.map((car) => {
                      return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                    })}
                </ul>
                {curPage.current * ITEMS_PER_PAGE <= (carList?.length || 0) && (
                  <div className="cate-list-btn2">
                    <button onClick={onHandleListMore}>더보기</button>
                  </div>
                )}
              </TabCont>
              <TabCont tabTitle="전시장 안내" id="tab7-2" index={1}>
                <div className="list-tit">
                  <ul>
                    <li>
                      <SelectBox
                        id="select1"
                        className="items-sbox"
                        value={selShopValue}
                        options={selShopList}
                        onChange={onChangeShopList}
                        width={282}
                        height={36}
                        placeHolder="대구(인타이어 모터스)"
                      />
                    </li>
                  </ul>
                </div>
                {shopDetail?.amllShopId && (
                  <div className="map-sec">
                    <h4>{shopDetail.shopNm}</h4>
                    <div className="map-wrap">
                      <KakaoMap id="map-certi-pc" style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={shopDetail.shopAddr} />
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
                          <td>
                            <a href={`https://map.kakao.com/link/search/${shopDetail.shopAddr}`}>{shopDetail.shopAddr}</a>
                          </td>
                          <th rowSpan="2">영업시간</th>
                          <td rowSpan="2">{shopDetail.shopOptmCntn}</td>
                        </tr>
                        <tr>
                          <th>전화</th>
                          <td>{shopDetail.shopPn}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </TabCont>
            </TabMenu>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

buyCarCertiView.getInitialProps = async (http) => {
  const { dispatch } = http.reduxStore;
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { amllId } = query;
  await helper.setRedirectUrl('/buycar/certificationmall/buyCarCertiMall').requiredQuery('amllId');

  const actionArr = [getCmllDetail, getMnfcList, getAreaList, getModelList, getFuelList, getCmllShopList];
  await Promise.all(
    actionArr.map(async (action) => {
      return await dispatch(action(amllId));
    })
  );

  return { amllId };
};

export default buyCarCertiView;

buyCarCertiView.propTypes = {
  amllId: PropTypes.string
};
