/* eslint-disable react/react-in-jsx-scope */
/**
 * 설명 : 공통 로그인 페이지
 * @fileoverview 내차사기 > 공통 > 판매자정보
 * @requires []
 * @author 한관영
 */
import moment from 'moment';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { imgUrl } from '@src/utils/HttpUtils';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import RenderHelper from '@lib/share/render/helper';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import ServiceLabel from '@src/components/common/ServiceLabel';
import Button from '@lib/share/items/Button';
import DatePicker from '@src/components/common/calendar/DatePicker';
import KakaoMap from '@src/components/common/KakaoMap';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import TabCont from '@lib/share/tab/TabCont';
import TabMenu from '@lib/share/tab/TabMenu';
import { SystemContext } from '@src/provider/SystemProvider';
import { ITEMS_PER_PAGE, getSellerInfo, getOnSaleCarList, getSoldOutCarList, getCarModelList } from '@src/actions/buycar/common/sellerInfoActions';

// 모바일 추가분
import { setLoadingImageMobile } from '@src/actions/buycar/buyCarListAction';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
// import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLogin from '@src/components/common/MobLogin';
import MobSelectList from '@lib/share/items/MobSelectList';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';

const DATE_FORMAT = 'YYYYMMDD';
const STT_ON_SALE = '0010'; //  판매중 상태코드(AM032)
const STT_SOLD_OUT = '0060'; // 판매완료 상태코드(AM032)
const CHO_LIST = [
  { value: '', id: '0', label: '전체' },
  { value: '1', id: '1', label: '국산' },
  { value: '2', id: '2', label: '수입' }
];

const MONTH_LIST = [
  { value: '3', id: '3', label: '3개월' },
  { value: '6', id: '6', label: '6개월' },
  { value: '12', id: '12', label: '12개월' }
];

const SellerInfo = ({ dlrId, seq }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { showAlert, initAlert } = useContext(SystemContext);
  const sellerInfo = useSelector((state) => state.commonSellerInfo.sellerInfo, {}); //판매점 정보 포함
  const onSaleCarList = useSelector((state) => state.commonSellerInfo.onSaleCarList, []);
  const onSaleTotalCnt = useSelector((state) => state.commonSellerInfo.onSaleTotalCnt, 0);
  const soldOutCarList = useSelector((state) => state.commonSellerInfo.soldOutCarList, []);
  const soldOutTotalCnt = useSelector((state) => state.commonSellerInfo.soldOutTotalCnt, 0);
  const crMdlList = useSelector((state) => state.commonSellerInfo.crMdlList, [{ value: '', label: '전체' }]);

  const currentPage1 = useRef(1);
  const currentPage2 = useRef(1);
  const [onSaleCurrentPage, setOnSaleCurrentPage] = useState(1);
  const [onSoldoutCurrentPage, setOnSoldoutCurrentPage] = useState(1);

  const minDate1 = moment()
    .add(-12, 'months')
    .add(-2, 'd')
    .toDate();
  const minDate2 = moment()
    .add(-12, 'months')
    .add(-1, 'd')
    .toDate();
  const maxDate1 = moment().toDate();
  const maxDate2 = moment()
    .add(1, 'd')
    .toDate();
  const now1 = moment();
  const now2 = moment();

  const [pastMonth, setPastMonth] = useState('12'); // 디폴트 과거 12개월(selection box)
  const [monthVal, setMonthVal] = useState('12');
  const [firstDate, setFirstDate] = useState(now1.add(-12, 'month')); // 디폴트 과거 12개월
  const [secondDate, setSecondDate] = useState(now2); // 현재까지
  const [cho1, setcho1] = useState('');
  const [cho2, setcho2] = useState('');
  const [currentTab, setCurrentTab] = useState('onsale');
  // const [crMdlList, setCrMdlList] = useState([{ value: '', label: '전체' }]);
  const [crMdlCd, setCrMdlCd] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지

  const handleTabChanged = useCallback(
    (e, deps) => {
      let tabName = 'onetc';
      if (deps === 0) tabName = 'onsale';
      if (deps === 1) tabName = 'soldout';

      setCurrentTab(tabName);
    },
    [currentTab]
  );

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if (currentTab === 'onetc') return;

      setLoadingFlag(false);
      dispatch(setLoadingImageMobile(true));

      if (currentTab === 'onsale') {
        if (onSaleTotalCnt <= (onSaleCarList?.length || 0)) return;

        setOnSaleCurrentPage(onSaleCurrentPage + 1);
      }
      if (currentTab === 'soldout') {
        if (soldOutTotalCnt <= (soldOutCarList?.length || 0)) return;

        setOnSoldoutCurrentPage(onSoldoutCurrentPage + 1);
      }

      console.log('onScroll >>> onSaleCurrentPage', onSaleCurrentPage, 'onSoldoutCurrentPage', onSoldoutCurrentPage);
    }
  }, [loadingFlag, onSaleTotalCnt, soldOutTotalCnt, onSaleCarList, soldOutCarList, dispatch, onSaleCurrentPage, onSoldoutCurrentPage]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [onSaleCarList, soldOutCarList]);

  useEffect(() => {
    if (hasMobile) {
      document.querySelector('#wrap').addEventListener('scroll', onScroll);
    }
    return () => {
      if (hasMobile) {
        document.querySelector('#wrap').removeEventListener('scroll', onScroll);
      }
    };
  }, [hasMobile, onScroll, onSaleCarList, soldOutCarList]);

  //화면 진입시 하단 탭 초기값 설정 [판매중, 판매완료]
  useEffect(() => {
    initAlert();
    if (seq !== undefined) window.scrollTo(0, 630);
  }, []);

  const handleMobCho1Changed = useCallback(
    (e, deps) => {
      setcho1(deps.value);
    },
    [cho1]
  );

  const handleMobCho2Changed = useCallback(
    (e, deps) => {
      setcho2(deps.value);
    },
    [cho2]
  );

  const handleMobMonthChanged = useCallback(
    (e, deps) => {
      const nowMonth = moment();
      setPastMonth(deps.value);
      setFirstDate(nowMonth.add(-1 * deps.value, 'month'));
    },
    [pastMonth, firstDate]
  );

  useEffect(() => {
    const condition1 = { dlrId, mId: gInfoLive()?.id || '', sttDvcd: STT_ON_SALE, cho: cho1, currentPage: onSaleCurrentPage, pageSize: ITEMS_PER_PAGE };

    dispatch(getOnSaleCarList(condition1));
  }, [onSaleCurrentPage, cho1, dispatch, hasMobile, currentTab, dlrId]);

  useEffect(() => {
    const condition2 = {
      dlrId,
      sttDvcd: STT_SOLD_OUT,
      cho: cho2,
      crMdlCd: String(crMdlCd),
      currentPage: onSoldoutCurrentPage,
      pageSize: ITEMS_PER_PAGE,
      slCmplDtFrom: firstDate.format(DATE_FORMAT),
      slCmplDtTo: secondDate.format(DATE_FORMAT)
    };

    dispatch(getSoldOutCarList(condition2));
  }, [onSoldoutCurrentPage, firstDate, secondDate, cho2, dispatch, hasMobile, currentTab, dlrId, crMdlCd]);

  //판매중 차량 : 제조국 셀렉트박스 change
  const handleCho1 = useCallback((e) => {
    setcho1(e.value);
  }, []);

  //판매완료 차량 : 1.제조국 셀렉트박스 change
  const handleCho2 = useCallback(async (e) => {
    const cho = e.value;
    setcho2(cho);
    const carModelList = await dispatch(getCarModelList(dlrId, cho, STT_SOLD_OUT));
    const cdVal = carModelList.length === 1 ? 'empty' : '';
    setCrMdlCd(cdVal);
  }, []);

  //판매완료 차량 : 2.제조사/모델 셀렉트박스 change
  const handleCrMdlCd = useCallback((e) => {
    const cdVal = e.value;
    setCrMdlCd(cdVal);
  }, []);

  const onPickFirstDate = (momentObj) => {
    const diffDate = moment.duration(momentObj.diff(secondDate)).asDays();
    if (diffDate > 0) setSecondDate(momentObj.clone().add(1, 'd'));
    setFirstDate(momentObj);
  };

  const onPickSecondDate = (momentObj) => {
    const diffDate = moment.duration(momentObj.diff(firstDate)).asDays();
    if (diffDate < 0) setFirstDate(momentObj.clone().add(-1, 'd'));
    setSecondDate(momentObj);
  };

  const handleRadioMonth = (e) => {
    // console.log(e.target);
    const month = Number(e.target.value) * -1;
    const nowDate1 = moment().add(month, 'month');
    const nowDate2 = moment();
    setMonthVal(e.target.value);
    setFirstDate(nowDate1);
    setSecondDate(nowDate2);
  };

  const handleSearch1 = useCallback(
    (e) => {
      if (e) e.preventDefault();
      const condition = { dlrId, sttDvcd: STT_ON_SALE, cho: cho1, currentPage: currentPage1.current, pageSize: ITEMS_PER_PAGE };
      (async () => {
        const { totalCnt } = await dispatch(getOnSaleCarList(condition));
        totalCnt === 0 && showAlert('현재 조건을 만족하는 차량이 존재하지 않습니다.');
      })();
    },
    [dlrId, cho1, dispatch, showAlert]
  );

  const handleSearch2 = useCallback(
    (e) => {
      if (e) e.preventDefault();
      const condition = {
        dlrId,
        sttDvcd: STT_SOLD_OUT,
        cho: cho2,
        crMdlCd: String(crMdlCd),
        currentPage: currentPage2.current,
        pageSize: ITEMS_PER_PAGE,
        slCmplDtFrom: firstDate.format(DATE_FORMAT),
        slCmplDtTo: secondDate.format(DATE_FORMAT)
      };
      (async () => {
        const { totalCnt } = await dispatch(getSoldOutCarList(condition));
        totalCnt === 0 && showAlert('현재 조건을 만족하는 차량이 존재하지 않습니다.');
      })();
    },
    [dlrId, cho2, crMdlCd, firstDate, secondDate, dispatch, showAlert]
  );

  const handleMore1 = useCallback(
    (e, isMore = true) => {
      if (e) e.preventDefault();
      if ((currentPage1.current - 1) * ITEMS_PER_PAGE > onSaleCarList.length) return;
      currentPage1.current = isMore ? currentPage1.current + 1 : 1;
      const condition = { dlrId, sttDvcd: STT_ON_SALE, cho: cho1, currentPage: currentPage1.current, pageSize: ITEMS_PER_PAGE };
      dispatch(getOnSaleCarList(condition));
    },
    [onSaleCarList.length, dlrId, cho1, dispatch]
  );

  const handleMore2 = useCallback(
    (e, isMore = true) => {
      if (e) e.preventDefault();
      if ((currentPage2.current - 1) * ITEMS_PER_PAGE > soldOutCarList.length) return;
      currentPage2.current = isMore ? currentPage2.current + 1 : 1;
      const condition = {
        dlrId,
        sttDvcd: STT_SOLD_OUT,
        cho: cho2,
        crMdlCd: String(crMdlCd),
        currentPage: currentPage2.current,
        pageSize: ITEMS_PER_PAGE,
        slCmplDtFrom: firstDate.format(DATE_FORMAT),
        slCmplDtTo: secondDate.format(DATE_FORMAT)
      };
      dispatch(getSoldOutCarList(condition));
    },
    [soldOutCarList.length, dlrId, cho2, crMdlCd, firstDate, secondDate, dispatch]
  );

  // 모바일 로그인팝업
  const [fpLogin, setFpLogin] = useState(!isLoginLiveCheck());
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
    setFpLogin(true);
  }, []);

  const handleFpLoginClose = useCallback((e) => {
    setFpLogin(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    window.location.reload();
  }, []);

  // ================================================================================
  //        모바일 시작
  // ================================================================================
  useEffect(() => {
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
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);

  if (hasMobile) {
    // console.log('sellerInfo', sellerInfo);
    return (
      <AppLayout>
        <div className="content-wrap seller-wrap">
          <div className="profile">
            <div className="img-wrap">
              <img src={sellerInfo.dlrProfFileUrl ? `${imgUrl}${sellerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-mid.png'} alt="판매자 이미지" />
            </div>
            <div className="tx-wrap">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="전화걸기" fontSize={10} width={53} height={24} href={`tel:${sellerInfo.dlrStrPn}`} />
              <h2 className="mt8">{sellerInfo.dlrNm}</h2>
              <p>{sellerInfo.dlrStrPn}</p>
              <ul className="employee-card">
                <li>종사원증: {sellerInfo.dlrEn}</li>
                <li>매매상사: {sellerInfo.dlrEntrCorpNm}</li>
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
                <td>
                  <span className="tx-blue80">{sellerInfo.onSaleCarCnt} 대</span>
                </td>
              </tr>
              <tr>
                <th>판매완료 차량</th>
                <td>
                  <span className="tx-blue80">{sellerInfo.cmplSaleCarCnt} 대</span> (최근 12개월 : {sellerInfo.cmpl12MonthSaleCarCnt} 대)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <TabMenu type="type2" mount={false} isFix={false} defaultTab={seq !== undefined ? Number(seq) - 1 : 0} callBack={handleTabChanged}>
          <TabCont tabTitle="판매중 차량" id="tab2-1" index={0}>
            <div className="list-wrap general">
              <div className="list-filter">
                <MobSelectList
                  width={90}
                  itemsSource={CHO_LIST}
                  selectedItem={findLabelValue(CHO_LIST, cho1)}
                  displayMemberPath={'label'}
                  selectedValuePath={'value'}
                  subPop={true}
                  onClick={handleMobCho1Changed}
                />
              </div>
              <TabMenu type="type8" defaultTab={1}>
                <TabCont id="tab8-1" index={0}>
                  <ul className="goods-list card-type">
                    {!isEmpty(onSaleCarList) &&
                      onSaleCarList.map((car, i) => {
                        return <BannerItem key={`onsale${i}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                      })}
                  </ul>
                </TabCont>
                <TabCont id="tab8-2" index={1}>
                  <ul className="goods-list list-type">
                    {!isEmpty(onSaleCarList) &&
                      onSaleCarList.map((car, i) => {
                        return <BannerItem key={`onsale${i}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                      })}
                  </ul>
                </TabCont>
              </TabMenu>
            </div>
          </TabCont>
          <TabCont tabTitle="판매완료 차량" id="tab2-2" index={1}>
            <div className="list-wrap general">
              <div className="list-filter">
                <MobSelectList
                  width={90}
                  itemsSource={CHO_LIST}
                  selectedItem={findLabelValue(CHO_LIST, cho2)}
                  displayMemberPath={'label'}
                  selectedValuePath={'value'}
                  subPop={true}
                  onClick={handleMobCho2Changed}
                />
                <MobSelectList
                  width={90}
                  itemsSource={MONTH_LIST}
                  selectedItem={findLabelValue(MONTH_LIST, pastMonth)}
                  displayMemberPath={'label'}
                  selectedValuePath={'value'}
                  subPop={true}
                  onClick={handleMobMonthChanged}
                />
              </div>
              <TabMenu type="type8" defaultTab={1}>
                <TabCont id="tab8-1" index={0}>
                  <ul className="goods-list card-type">
                    {!isEmpty(soldOutCarList) &&
                      soldOutCarList.map((car, idx) => {
                        return <BannerItem key={`soldout${idx}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                      })}
                  </ul>
                </TabCont>
                <TabCont id="tab8-2" index={1}>
                  <ul className="goods-list list-type">
                    {!isEmpty(soldOutCarList) &&
                      soldOutCarList.map((car, idx) => {
                        return <BannerItem key={`soldout${idx}`} data={car} openMLoginPop={handleFpLoginOpen} />;
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
                    <td>{sellerInfo.dlrEntrCorpNm}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>{sellerInfo.dlrStrAddr}</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td>{sellerInfo.dlrStrPn}</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>{sellerInfo.dlrStrFaxno}</td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td>{sellerInfo.dlrStrSlHmCntn}</td>
                  </tr>
                </tbody>
              </table>
              <KakaoMap id="map-seller-mob" style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={sellerInfo.dlrStrAddr} />
            </div>
          </TabCont>
        </TabMenu>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin errorPw={false} callback={handleFpLoginClose} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  } // 모바일 끝

  // ================================================================================
  //        PC 시작
  // ================================================================================

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap view-wrap seller">
          <ul className="tit-wrap">
            <li className="tit">
              <h3>판매자 정보</h3>
            </li>
          </ul>

          <div className="info-wrap">
            <div className="img-wrap">
              {/* <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" /> */}
              <img src={`${imgUrl}${sellerInfo.dlrProfFileUrl}`} alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              {/* <h4>김현대</h4> */}
              <h4>{sellerInfo.dlrNm}</h4>
              {/* <ServiceLabel {...sellerInfo} /> */}
              <ServiceLabel hSvcUseCnt={sellerInfo.hSvcUseCnt} aSvcUseCnt={sellerInfo.aSvcUseCnt} pSvcUseCnt={sellerInfo.pSvcUseCnt} />
              <table summary="판매자 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">판매자 정보</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>종사원증</th>
                    <td>{sellerInfo.dlrEn}</td>
                  </tr>
                  <tr>
                    <th>매매상사</th>
                    <td>{sellerInfo.dlrEntrCorpNm}</td>
                  </tr>
                </tbody>
              </table>
              <ul className="sell-info">
                <li>
                  판매중 차량
                  <span>{sellerInfo.onSaleCarCnt} 대</span>
                </li>
                <li>
                  판매완료 차량
                  <span>{sellerInfo.cmplSaleCarCnt} 대</span>
                  <em>(최근12개월: {sellerInfo.cmpl12MonthSaleCarCnt} 대)</em>
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
                    <SelectBox id="made1" className="items-sbox" options={CHO_LIST} onChange={handleCho1} value={cho1} placeHolder="전체" width={282} height={48} />
                    <em />

                    <Button size="big" background="blue80" title="조회" onClick={(e) => handleSearch1(e)} width={130} className="fr" />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="inquire-num">차량 수 : 총 {onSaleTotalCnt}대</p>
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
                {!isEmpty(onSaleCarList) &&
                  onSaleCarList.map((car, i) => {
                    return <BannerItemBuyCar key={`onsale${i}`} data={car} bannerType={'vertical'} verticalMode={2} />;
                  })}
              </tbody>
            </table>
            {currentPage1.current * ITEMS_PER_PAGE <= (onSaleCarList?.length || 0) && (
              <div className="cate-list-btn2">
                <button onClick={handleMore1}>더보기</button>
              </div>
            )}
          </TabCont>
          <TabCont tabTitle="판매완료 차량" id="tab1-2" index={1}>
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>차량</th>
                  <td>
                    <SelectBox id="made2" className="items-sbox" options={CHO_LIST} onChange={handleCho2} value={cho2} placeHolder="전체" width={282} height={48} />
                    <em />
                    <SelectBox id="model" className="items-sbox" options={crMdlList} onChange={handleCrMdlCd} value={crMdlCd} placeHolder="제조사/모델/등급" width={282} height={48} />
                  </td>
                </tr>
                <tr>
                  <th>판매일</th>
                  <td>
                    <DatePicker defaultValue={firstDate} inputHeight={48} onChange={onPickFirstDate} min={minDate1} max={maxDate1} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={secondDate} inputHeight={48} onChange={onPickSecondDate} min={minDate2} max={maxDate2} />
                    <RadioGroup
                      dataList={[
                        { id: 'month1', value: '1', checked: false, disabled: false, title: '1개월' },
                        { id: 'month3', value: '3', checked: false, disabled: false, title: '3개월' },
                        { id: 'month6', value: '6', checked: false, disabled: false, title: '6개월' },
                        { id: 'month12', value: '12', checked: true, disabled: false, title: '12개월' }
                      ]}
                      defaultValue={monthVal}
                      onChange={handleRadioMonth}
                    />
                    <Button size="big" background="blue80" title="조회" onClick={(e) => handleSearch2(e)} width={130} className="fr" />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <p className="tx-exp-tp6">&#8251; 판매완료일 기준 12개월 이내의 차량만 조회 가능합니다.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="inquire-num">차량 수 : 총 {soldOutTotalCnt}대</p>
            <table summary="판매중 차량 리스트" className="table-tp1 goods-list th-c">
              <caption className="away">판매완료 차량</caption>
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
                {!isEmpty(soldOutCarList) &&
                  soldOutCarList.map((car, i) => {
                    return <BannerItemBuyCar key={`soldout${i}`} data={car} bannerType={'vertical'} verticalMode={2} />;
                  })}
              </tbody>
            </table>
            {currentPage2.current * ITEMS_PER_PAGE <= (soldOutCarList?.length || 0) && (
              <div className="cate-list-btn2">
                <button onClick={handleMore2}>더보기</button>
              </div>
            )}
          </TabCont>
          <TabCont tabTitle="판매점 정보" id="tab1-3" index={2}>
            <div className="map-sec">
              <h4>오토벨모터스</h4>
              <KakaoMap id="map-seller-pc" style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={sellerInfo.dlrStrAddr} />
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
                      <a href={`https://map.kakao.com/link/search/${sellerInfo.dlrStrAddr}`}>{sellerInfo.dlrStrAddr}</a>
                    </td>
                    <th>전화</th>
                    <td>{sellerInfo.dlrStrPn}</td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td className="time">{sellerInfo.dlrStrSlHmCntn}</td>
                    <th>팩스</th>
                    <td className="time">{sellerInfo.dlrStrFaxno}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabCont>
        </TabMenu>
      </div>
    </AppLayout>
  );
};

SellerInfo.getInitialProps = async (http) => {
  const { dispatch } = http.reduxStore;
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { dlrId, seq = 1 } = query;

  await helper.setRedirectUrl('/main').requiredQuery('dlrId');

  const sellerInfo = await dispatch(getSellerInfo(dlrId));
  if (isEmpty(sellerInfo)) return helper.redirect('/main');

  await dispatch(getCarModelList(dlrId));
  await dispatch({ type: SECTION_BUY });

  return { dlrId, seq };
};

SellerInfo.propTypes = {
  dlrId: PropTypes.string,
  seq: PropTypes.string
};

export default SellerInfo;
