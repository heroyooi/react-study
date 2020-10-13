import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { gInfoLive } from '@src/utils/LoginUtils';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import KakaoMap from '@src/components/common/KakaoMap';
import { ITEMS_PER_PAGE, getSellerInfo, getOnSaleCarList, getSoldOutCarList } from '@src/actions/buycar/common/sellerInfoActions';
import { setLoadingImageMobile } from '@src/actions/buycar/buyCarListAction';
import MobSelectList from '@lib/share/items/MobSelectList';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';
import { imgUrl } from '@src/utils/HttpUtils';
import { ITEM_TYPE_BUYCAR } from '@src/constant/buyCarConstant';

const DATE_FORMAT = 'YYYYMMDD';
const STT_ON_SALE = '0010'; //  판매중 상태코드
const STT_SOLD_OUT = '0060'; // 판매완료 상태코드
const CHO_LIST = [
  { value: '0', id: '0', label: '전체' },
  { value: '1', id: '1', label: '국산' },
  { value: '2', id: '2', label: '수입' }
];

const MONTH_LIST = [
  { value: '3', id: '3', label: '3개월' },
  { value: '6', id: '6', label: '6개월' },
  { value: '12', id: '12', label: '12개월' }
];

const MobSellerInfo = ({ dlrId, seq, onClickLogin }) => {
  const dispatch = useDispatch();
  // const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
  const sellerInfo = useSelector((state) => state.commonSellerInfo.sellerInfo, {}); //판매점 정보 포함
  const onSaleCarList = useSelector((state) => state.commonSellerInfo.onSaleCarList, []);
  const onSaleTotalCnt = useSelector((state) => state.commonSellerInfo.onSaleTotalCnt, 0);
  const soldOutCarList = useSelector((state) => state.commonSellerInfo.soldOutCarList, []);
  const soldOutTotalCnt = useSelector((state) => state.commonSellerInfo.soldOutTotalCnt, 0);
  const [onSaleCurrentPage, setOnSaleCurrentPage] = useState(1);
  const [onSoldoutCurrentPage, setOnSoldoutCurrentPage] = useState(1);
  const [isLoadingImage, setIsLoadingImage] = useState(false); // 모바일용 로딩이미지

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
  const [firstDate, setFirstDate] = useState(now1.add(-12, 'month')); // 디폴트 과거 12개월
  const [secondDate, setSecondDate] = useState(now2); // 현재까지
  const [cho1, setcho1] = useState('0');
  const [cho2, setcho2] = useState('0');
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
    const target = document.querySelector('.fp-content');
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
  }, [loadingFlag, onSaleTotalCnt, soldOutTotalCnt, onSaleCarList, soldOutCarList, dispatch, onSaleCurrentPage, onSoldoutCurrentPage, currentTab, sellerInfo]);

  useEffect(() => {
    const target = document.querySelector('.fp-content');
    target.addEventListener('scroll', onScroll);
    return () => {
      target.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, onSaleCarList, soldOutCarList]);

  useEffect(() => {
    dispatch(getSellerInfo(dlrId));
  }, []);

  useEffect(() => {
    setLoadingFlag(true);
  }, [onSaleCarList, soldOutCarList]);

  //화면 진입시 하단 탭 초기값 설정 [판매중, 판매완료]
  useEffect(() => {
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
    setIsLoadingImage(true);
    const condition1 = { dlrId, mId: gInfoLive().id, sttDvcd: STT_ON_SALE, cho: cho1, currentPage: onSaleCurrentPage, pageSize: ITEMS_PER_PAGE };
    dispatch(getOnSaleCarList(condition1)).then(() => {
      setIsLoadingImage(false);
    });
  }, [onSaleCurrentPage, cho1, dispatch, currentTab, dlrId]);

  useEffect(() => {
    setIsLoadingImage(true);
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

    dispatch(getSoldOutCarList(condition2)).then(() => {
      setIsLoadingImage(false);
    });
  }, [onSoldoutCurrentPage, firstDate, secondDate, cho2, dispatch, currentTab, dlrId, crMdlCd]);

  // 모바일 로그인팝업
  const handleFpLoginOpen = (e) => {
    e.preventDefault();
    if (onClickLogin) onClickLogin(e);
  };

  return (
    <>
      <div className="content-wrap seller-wrap">
        <div className="profile">
          <div className="img-wrap">
            <img src={sellerInfo.dlrProfFileUrl ? `${imgUrl}${sellerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-mid.png'} alt="딜러 이미지" />
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
                {/* <ul className="goods-list card-type">
                  {!isEmpty(onSaleCarList) &&
                    onSaleCarList.map((car, i) => {
                      return <BannerItem itemMode={ITEM_TYPE_BUYCAR} key={`onsale${i}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                    })}
                </ul>
                {isLoadingImage && (
                  <div className="more-loading">
                    <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                  </div>
                )} */}
              </TabCont>
              <TabCont id="tab8-2" index={1}>
                <ul className="goods-list list-type">
                  {!isEmpty(onSaleCarList) &&
                    onSaleCarList.map((car, i) => {
                      return <BannerItem itemMode={ITEM_TYPE_BUYCAR} key={`onsale${i}`} data={car} openMLoginPop={handleFpLoginOpen} />;
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
                {/* <ul className="goods-list card-type">
                  {!isEmpty(soldOutCarList) &&
                    soldOutCarList.map((car, idx) => {
                      return <BannerItem itemMode={ITEM_TYPE_BUYCAR} key={`soldout${idx}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                    })}
                  {isLoadingImage && (
                    <div className="more-loading">
                      <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                    </div>
                  )}
                </ul> */}
              </TabCont>
              <TabCont id="tab8-2" index={1}>
                <ul className="goods-list list-type">
                  {!isEmpty(soldOutCarList) &&
                    soldOutCarList.map((car, idx) => {
                      return <BannerItem itemMode={ITEM_TYPE_BUYCAR} key={`soldout${idx}`} data={car} openMLoginPop={handleFpLoginOpen} />;
                    })}
                  {isLoadingImage && (
                    <div className="more-loading">
                      <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                    </div>
                  )}
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
                  {/* <td>{sellerInfo.dlrStrAddr}</td> */}
                  <td>
                    <a href={`https://map.kakao.com/link/search/${sellerInfo.dlrStrAddr}`}>{sellerInfo.dlrStrAddr}</a>
                  </td>
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
            <div className="map-wrap">
              <KakaoMap id="map-seller" style={{ width: '100%', height: '150px', frameBorder: '0' }} mode="mobile" addr={sellerInfo.dlrStrAddr} />
            </div>
          </div>
        </TabCont>
      </TabMenu>
    </>
  );
};

export default MobSellerInfo;
