import React, { memo, useState, useContext, useCallback, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import qs from 'qs';
import moment from 'moment';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import AppLayout from '@src/components/layouts/AppLayout';
import MyPageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import ProdFilterTab from '@src/components/mypage/dealer/DealerProdList/ProdFilterTab';
import ProdFilterSelector from '@src/components/mypage/dealer/DealerProdList/ProdFilterSelector';
import ProdList from '@src/components/mypage/dealer/DealerProdList/ProdList';
import ProdSelectedItemEmitter from '@src/components/mypage/dealer/DealerProdList/ProdSelectedItemEmitter';
import ProdWaitingCarFilter from '@src/components/mypage/dealer/DealerProdList/ProdWaitingCarFilter';
import DealerAdManagement from '@src/components/mypage/dealer/DealerAdManagement/DealerAdManagement';
import MobDealerAdManagement from '@src/components/mypage/dealer/DealerAdManagement/MobDealerAdManagement';
import FilterTable from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/FilterTable';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RenderHelper from '@lib/share/render/helper';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobCarModify from '@src/components/common/MobCarModify';
import MobTimeChange from '@src/components/common/MobTimeChange';
import MobUpdateManage from '@src/components/common/MobUpdateManage';
import MypageManageList1 from '@src/components/common/MypageManageList1';
import MypageManageList2 from '@src/components/common/MypageManageList2';
import MypageManageList3 from '@src/components/common/MypageManageList3';
import MypageManageList4 from '@src/components/common/MypageManageList4';
import MypageManageList5 from '@src/components/common/MypageManageList5';
import MypageManageList6 from '@src/components/common/MypageManageList6';
import MypageManageList7 from '@src/components/common/MypageManageList7';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobDealerSellAd from '@src/components/common/MobDealerSellAd';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobPayment from '@src/components/common/MobPayment';
import MobPaymentGoods from '@src/components/common/MobPaymentGoods';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import DatePicker from '@src/components/common/calendar/DatePicker';

import { deleteProdCar, updateSendByStandByCar } from '@src/api/mypage/dealer/dealerProdApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import {
  SECTION_MYPAGE,
  MOBILE_HEADER_TYPE_SUB,
  MOBILE_CONTENT_STYLE,
  MOBILE_FULLPAGE_POPUP_CLOSE,
  MOBILE_FULLPAGE_CPOPUP,
  MOBILE_FULLPAGE_CPOPUP_CLOSE,
  MOBILE_QUICK_EXIST,
  MOBILE_FOOTER_EXIST
} from '@src/actions/types';
import * as listActions from '@src/actions/mypage/dealer/dealerProdListAction';
import * as advActions from '@src/actions/mypage/dealer/dealerAdverAction';
import * as memberApi from '@src/api/common/memberApi';
import * as effectAction from '@src/actions/mypage/dealer/dealerProdEffectAction';
import { getFreeTicketHtml, getOneTimeTicketHtml, getUpdateFreeTicketHtml, getUpdateOneTimeTicketHtml } from '@src/utils/MyPageUtils';
import { gInfoLive } from '@src/utils/LoginUtils';
import { setComma } from '@src/utils/StringUtil';
import { preventScroll } from '@src/utils/CommonUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

export const DealerContext = createContext();

const CarManagement = memo(({ hasMobileDealerMain, memberInfo, params = {}, router }) => {
  const dispatch = useDispatch();
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);

  const dealerProdStore = useSelector((rootStore) => rootStore.dealerProd);
  const dealerProdList = useSelector((rootStore) => rootStore.dealerProdList);

  const dealerAdverStore = useSelector((rootStore) => rootStore.dealerAdver);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);

  const [currentPage, setCurrentPage] = useState(1);
  // const prevCurrentPage = usePrevious(currentPage);
  const [listCntPerPage, setListCntPerPage] = useState(4);

  const [fpBottom, setFpBottom] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);

  const createBodyPortal = useCreatePortalInBody(null, 'wrap');

  //const { depositWaitingList = [], free = [], paymentList = [], pricing = [], update = [], usingTicketList = {} } = dealerAdverStore;
  const { usingTicketList = {}, totalCount } = dealerAdverStore;
  const { freepassinfo, updatefreepassinfo, perupdatepasscnt, perpasscnt } = usingTicketList;
  console.log('usingTicketList : ', usingTicketList, perpasscnt, 'totalCount : ', totalCount);

  const {
    list,
    normalsaleprodcnt,
    managementsaleprodcnt,
    judgmentsaleprodcnt,
    waitingsaleprodcnt,
    totalsaleprodcnt,
    sortValue,
    by,
    selectedItems,
    member,
    adProdList = [],
    salescompletedprodcnt,
    deletecompletedprodcnt,
    holdingprodcnt,
    totalcnt = 0
  } = dealerProdList;
  console.log('carManagement -> dealerProdList', dealerProdList);

  const [statusList, setStatusList] = useState([]);
  const [selectedProdItem, setSelectedProdItem] = useState('');

  const [ isRestrained, setIsRestrained ] = useState(() => {
    const { siMbId, periodDt } = member ?? {}

    console.log("ProdFilterTab -> siMbId", siMbId)
    console.log("ProdFilterTab -> periodDt", periodDt)
    
    const periodDay = moment(periodDt)
    const toDay = moment(new Date())


    return siMbId?.toLowerCase() !== 'n' && (periodDay.diff(toDay, 'day') >= 0)
  });


  useEffect(() => {
    getCommonCodeAsync('AM032').then((codeList) => setStatusList(codeList.slice(1)));
    // showLoginForm('/mypage/dealer/sellcar/carManagement' + '?' + qs.stringify(params))
  }, []);

  const { result, seq, tabA, tabB, itemId, optA, returnCd } = router.query;
  const [withoutList] = useState(result === 'no' ? true : false);
  const [fpFilter01, setFpFilter01] = useState(false); // 등록차량관리 > 상세조회 > 제조사,모델,등급 팝업
  const [fpModify, setFpModify] = useState(false); // 등록차량관리 > 차량 정보수정 팝업
  const [fpTimeChange, setFpTimeChange] = useState(false); // 시간변경 팝업
  const [fpFreeTicket, setFpFreeTicket] = useState(false); // 업데이트 자유권 관리 팝업
  const [fpAd, setFpAd] = useState(false); // 광고관리 > 상품안내 > 자세히 보기 팝업
  const [fpAdBuy, setFpAdBuy] = useState(false); // 광고관리 > 구입하기 > 이용권 구매 팝업
  const [fpPaymentInfo, setFpPaymentInfo] = useState(false); // 광고관리 > 구입하기 > 이용권 결제 팝업
  const [fpGoodsType, setFpGoodsType] = useState('free');
  const [fpPayment, setFpPayment] = useState(false); // 광고관리 > 결제내역 > 결제내역상세

  const [isTab] = useState(+Number(seq) === 2 ? 1 : 0);
  const [tabKey, setTabKey] = useState(1);
  // const [calPop1, setCalPop1] = useState(false);
  // const [calPop2, setCalPop2] = useState(false);
  // const [isDate1, setIsDate1] = useState(
  //   moment()
  //     .subtract(1, 'week')
  //     .format('YYYY-MM-DD')
  // );
  // const [isDate2, setIsDate2] = useState(moment().format('YYYY-MM-DD'));
  const [paymentItem, setPaymentItem] = useState();
  const [mobScrollList, setMobScrollList] = useState([]);
  const [mobPage, setMobPage] = useState(1);
  //모바일 더보기 버튼 출력관리
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  // 결제성공여부 확인
  useEffect(() => {
    if (hasMobile && returnCd === 'fail') {
      showAlert('결제에 실패하였습니다. 다시 시도해주세요.');
      return;
    } else if (hasMobile && returnCd === 'success') {
      showAlert('성공적으로 구입하였습니다.');
      return;
    }
  }, [hasMobile, returnCd, showAlert]);

  // 광고관리에서 모바일 onScroll방지 로직
  const [callBackNo, setCallBackNo] = useState(tabA === '1' ? 1 : 0);

  const { paymentList = [] } = dealerAdverStore;

  console.log('callbackNO  : ', callBackNo, 'tabA :::', tabA);

  const callBackHandler = (e, idx) => {
    setCallBackNo(Number(idx));
    setQueryTabA(idx);
    history.replaceState({}, '', `/mypage/dealer/sellcar/carManagement?tabA=${idx || '0'}`);
  };

  // History용 router query 매개변수
  const [queryTabA, setQueryTabA] = useState(tabA);
  const [queryTabB, setQueryTabB] = useState(tabB);
  const [queryDlrPrdId, setQueryDlrPrdId] = useState(itemId);
  const [queryOptA, setQueryOptA] = useState(optA);

  const [updatePass, setUpdatePass] = useState();

  const goPageWithNewParam = async (payload) => {
    console.info('goPageWithNewParam -> payload', payload);
    showLoader();
    dispatch(
      listActions.initStateAction({
        name: 'selectedItems',
        value: []
      })
    );

    const newParam = {
      ...params,
      ...payload
    };
    await Router.push(`/mypage/dealer/sellcar/carManagement?${qs.stringify(newParam, { indices: false })}`);
    hideLoader();
  };

  // 첫 페이지 로딩때 결제내역 가져옴
  useEffect(() => {
    const newParam = {
      ...params,
      currentPage: 1,
      viewPageCnt: 8
    };
    console.log(newParam);
    dispatch(advActions.getPaymentListAction(newParam));
  }, []);

  //더보기 감지
  useEffect(() => {
    if (paymentList) {
      if (totalCount <= mobPage * 8) {
        setShowMoreBtn(false);
      }
    }
  }, [paymentList]);

  // 모바일 검색
  const mobSearch = async (payload) => {
    showLoader();
    // e.preventDefault();
    setIsDate3(payload.startDt);
    setIsDate4(payload.endDt);
    setMobPage(1);
    setShowMoreBtn(true);
    const newParam = {
      ...params,
      ...payload,
      viewPageCnt: 8
    };
    console.log(newParam);
    await dispatch(advActions.getPaymentListAction(newParam, false));
    hideLoader();
  };

  // 모바일 더보기 버튼클릭
  const listMoreHandler = (e) => {
    e.preventDefault();
    console.log('newParam : ', params);
    const nextPage = mobPage + 1;
    setMobPage(nextPage);
    const nextViewCnt = 8;
    const newParam = {
      ...params,
      // period: params.period,
      startDt: isDate3,
      endDt: isDate4,
      currentPage: nextPage,
      viewPageCnt: nextViewCnt
    };
    console.log('list more : newParam', newParam);
    dispatch(advActions.getPaymentListAction(newParam, true));
    // Router.push(`/mypage/dealer/sellcar/carManagement?${qs.stringify(newParam, { indices: false })}`);
  };

  const checkItem = (e, checkedItem) => {
    console.info('checkItem -> checkedItem', checkedItem);
    const { checked } = e.target;
    if (checked) {
      dispatch(
        listActions.addItemsToListAction({
          name: 'selectedItems',
          value: checkedItem
        })
      );
    } else {
      dispatch(
        listActions.removeItemsToListAction({
          name: 'selectedItems',
          key: 'dlrPrdId',
          value: checkedItem
        })
      );
    }
  };

  const changingEvent = async (item, event) => {
    console.info('changingEvent item : ', item);
    console.info('changingEvent list : ', list);
    showLoader();
    // eslint-disable-next-line import/namespace
    const action = listActions[`${event}Action`];
    if (action) {
      const statusinfo = await dispatch(
        action({
          name: 'list',
          values: item
        })
      );
      hideLoader();
      if (statusinfo && statusinfo.returncd !== '000' && statusinfo.returncd !== 'SUCCESS') {
        showAlert('에러가 발생했습니다');
        return false;
      }
      if (!hasMobile) {
        showAlert('처리되었습니다');
      }
      return true;
    }
    await dispatch(
      listActions.getDealerProdListAction({
        name: 'list',
        values: params
      })
    );
    hideLoader();
  };

  const popEventHandler = async (payload) => {
    showLoader();
    const { action, data } = payload;
    console.log('popEventHandler -> payload', payload);

    const afterAction = () => {
      if (hasMobile) {
        reloadList(params.sttDvcd);
      } else {
        globalThis.window.location.reload();
      }
    };

    if (action === 'delete') {
      const result = await deleteProdCar(data).then((res) => res?.data);
      console.info('popEventHandler -> result', result);
      showAlert('삭제되었습니다');
      afterAction();
    } else if (action === 'waiting') {
      console.log('payload ::::::::::::: ', payload);
      const result = await updateSendByStandByCar(data).then((res) => res?.data);
      console.info('popEventHandler -> result', result);
      showAlert('처리되었습니다');
      afterAction();
    }
    hideLoader();
  };

  const checkAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(
        listActions.initStateAction({
          name: 'selectedItems',
          value: [...list]
        })
      );
    } else {
      dispatch(
        listActions.initStateAction({
          name: 'selectedItems',
          value: []
        })
      );
    }
  };

  const handleFullpagePopup = useCallback(
    (name, opts) => (e) => {
      e.preventDefault();

      if(isRestrained){
        showAlert('회원님은 현재 제한 중입니다')
        return
      }

      setQueryOptA(name);
      if (name === 'f1') {
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 선택',
            options: ['close']
          }
        });
        setFpModify(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpFilter01(true);
      } else if (name === 'modify') {
        setSelectedProdItem(opts);
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '정보수정',
            options: ['close']
          }
        });
        setFpBottom(56);
        setFpFilter01(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpModify(true);
      } else if (name === 'time') {
        // type.dlrPrdId
        setSelectedProdItem(opts);
        setQueryDlrPrdId(opts.dlrPrdId);
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '업데이트 시간변경',
            options: ['close']
          }
        });
        setFpBottom(56);
        setFpFilter01(false);
        setFpModify(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpTimeChange(true);
      } else if (name === 'ticket') {
        setUpdatePass(opts);
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '업데이트 자유권 관리',
            options: ['close']
          }
        });
        setFpBottom(56);
        setFpFilter01(false);
        setFpModify(false);
        setFpTimeChange(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpFreeTicket(true);
      } else if (name === 'ad') {
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '상품상세안내',
            options: ['close']
          }
        });
        setFpBottom(20);
        setFpFilter01(false);
        setFpModify(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpAd(true);
      } else if (name === 'adBuy') {
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '이용권 구매',
            options: ['close']
          }
        });
        setFpGoodsType(opts);
        setFpBottom(72);
        setFpFilter01(false);
        setFpModify(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpPaymentInfo(false);
        setFpPayment(false);
        setFpAdBuy(true);
      } else if (name === 'paymentInfo') {
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '이용권 결제',
            options: ['close']
          }
        });
        setFpBottom(72);
        setFpFilter01(false);
        setFpModify(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPayment(false);
        setFpPaymentInfo(true);
      } else if (name === 'payment') {
        dispatch({
          type: MOBILE_FULLPAGE_CPOPUP,
          data: {
            isPopup: true,
            title: '결제내역 상세',
            options: ['close']
          }
        });
        // 결제내역 상세에서 가져간 payment 데이터를 type으로 받아서 state에 저장
        setPaymentItem(opts);
        setFpBottom(20);
        setFpFilter01(false);
        setFpModify(false);
        setFpTimeChange(false);
        setFpFreeTicket(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPaymentInfo(false);
        setFpPayment(true);
      }
    },
    [dispatch]
  );

  // 모바일 FULL 페이지 팝업을 실질적으로 UNMOUNT 시키기 위해 플래그 값을 false 처리함.
  useEffect(() => {
    if (!mFullpageCPopup) {
      setFpFilter01(false);
      setFpModify(false);
      setFpTimeChange(false);
      setFpAd(false);
      setFpAdBuy(false);
      setFpPaymentInfo(false);
      setFpPayment(false);
      setFpFreeTicket(false);
    }
  }, [mFullpageCPopup]);

  const onCloseFilter = useCallback(
    (e) => {
      e.preventDefault();
      setFpFilter01(false);
      dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
    },
    [dispatch]
  );

  const goodsClose = () => {
    setFpAdBuy(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };
  const goodsCallback = (e) => {
    e.preventDefault();
    if (fpGoodsType === 'free') {
      console.log('===> 이용권 구매, 자유이용권 콜백처리');
    } else if (fpGoodsType === 'update') {
      console.log('===> 이용권 구매, 업데이트 자유권 콜백처리');
    } else if (fpGoodsType === 'pricing') {
      console.log('===> 이용권 구매, 프라이싱 조회권 콜백처리');
    }
    setFpAdBuy(false);
    dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
  };

  const onClosePayment = (e) => {
    e.preventDefault();
    setFpPayment(false);
    dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
  };
  const paymentCallback = (e) => {
    e.preventDefault();
    console.log('===> 이용권 결제, 콜백처리');
    onClosePayment(e);
  };

  const onClickAll = useCallback(
    (e) => {
      params.crMnfcCd = '';
      params.crMdlCd = '';
      onCloseFilter(e);
    },
    [onCloseFilter, params.crMdlCd, params.crMnfcCd]
  );

  const onClickSel = useCallback(
    (e) => {
      console.log('제조사/모델 내부 제조사, 등급 탭의 "선택" 클릭 콜백');
      onCloseFilter(e);
    },
    [onCloseFilter]
  );

  const onClickModel = useCallback(
    (e, selectedModels) => {
      params.crMdlCd = selectedModels.id;
      params.crMnfcCd = selectedModels.manufactureId;
      console.log('제조사/모델 내부 최종 "선택" 클릭 콜백');
      onCloseFilter(e);
    },
    [onCloseFilter, params.crMdlCd, params.crMnfcCd]
  );

  const timeChangeCallback = (e) => {
    e.preventDefault();
    setFpTimeChange(false);
    dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
  };

  const modifyCallback = (e) => {
    if (e) e.preventDefault();
    setFpModify(false);
    dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
  };
  const updateManageCallback = (e) => {
    e.preventDefault();
    setFpFreeTicket(false);
    dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
  };

  const reloadList = useCallback(
    async (sttDvcd) => {
      console.log('reloadList : ', sttDvcd);
      if (sttDvcd) {
        params.sttDvcd = sttDvcd;
      }

      setMobScrollList([]);
      showLoader();
      await dispatch(
        listActions.getDealerProdListAction({
          name: 'list',
          values: params
        })
      );
      setMobScrollList([...list]);
      hideLoader();
    },
    [dispatch, hideLoader, list, params, showLoader]
  );

  const tabCallbackAdvMng = useCallback((key) => {
    setQueryTabA('1');
    setQueryTabB(key);
    history.replaceState({}, '', `/mypage/dealer/sellcar/carManagement?tabA=1&tabB=${key}`);
  }, []);

  const tabCallback = useCallback(
    async (key) => {

      // 탭변경없이 목록을 갱신하려면 key가 0 으로 들어오면 된다.
      if (key === 'REG_DT' || key === 'UPD_DT') {
        params.sortValue = key;
      } else {
        setQueryTabA('0');
        setQueryTabB(key);
        if (key === '1') params.sttDvcd = '0010';
        //판매중
        else if (key === '2') params.sttDvcd = '0020';
        //관리필요
        else if (key === '3') params.sttDvcd = '0030';
        //판단보류
        else if (key === '4') params.sttDvcd = '0050';
        //대기
        else if (key === '5') params.sttDvcd = '0060';
        //판매완료
        else if (key === '6') params.sttDvcd = '0070';
        //삭제
        else if (key === '7') params.sttDvcd = '0090';
        //보류

        // 모바일 Back 버튼으로 뒤로 돌아갈때 상태유지를 위해 설정
        history.replaceState({}, '', `/mypage/dealer/sellcar/carManagement?tabA=0&tabB=${key}`);

        // 그외 조건 초기화 when 0 : (상세조회 검색) // 유저가 탭을 눌렀을때를 상정함.
        if (key !== '0') {
          params.sortValue = 'UPD_DT';
          params.crMdlCd = '';
          params.crMnfcCd = '';
          params.currentPage = 1;
          params.viewPageCnt = 4; // mobile
          params.management = 'prodCar';
          params.watingSortType = '';
          params.by = 'DESC';
          params.sub = '0';
          params.startDt = moment(new Date())
            .subtract(1, 'month')
            .format('YYYY-MM-DD');
          params.endDt = moment(new Date()).format('YYYY-MM-DD');
          params.period = '1month';
          params.effectCategory = '00';
        }

        setMobScrollList([]);
        showLoader();
        await dispatch(
          listActions.getDealerProdListAction({
            name: 'list',
            values: params
          })
        );
        hideLoader();
      }
    },
    [dispatch, hideLoader, params, showLoader]
  );

  // 모바일 최초 목록 로딩
  useEffect(() => {
    if (tabA === '0' && optA === 'time' && itemId) {
      setSelectedProdItem({ dlrPrdId: itemId });
      setQueryDlrPrdId(itemId);
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '업데이트 시간변경',
          options: ['close']
        }
      });
      setFpBottom(56);
      setFpFilter01(false);
      setFpModify(false);
      setFpFreeTicket(false);
      setFpAd(false);
      setFpAdBuy(false);
      setFpPaymentInfo(false);
      setFpPayment(false);
      setFpTimeChange(true);
    }

    if (list.length === 0 && firstLoading && hasMobile) {
      params.sortValue = 'UPD_DT';
      params.crMdlCd = '';
      params.crMnfcCd = '';
      params.currentPage = 1;
      params.viewPageCnt = 8; // mobile
      params.management = 'prodCar';
      params.watingSortType = '';
      params.by = 'DESC';
      params.sub = '0';
      params.startDt = moment(new Date())
        .subtract(1, 'month')
        .format('YYYY-MM-DD');
      params.endDt = moment(new Date()).format('YYYY-MM-DD');
      params.period = '1month';
      params.effectCategory = '00';

      if ((tabA ? Number(tabA) : 0) === 0) {
        switch (tabB ? tabB : '1') {
          case '1':
            params.sttDvcd = '0010';
            break;
          case '2':
            params.sttDvcd = '0020';
            break;
          case '3':
            params.sttDvcd = '0030';
            break;
          case '4':
            params.sttDvcd = '0050';
            break;
          case '5':
            params.sttDvcd = '0060';
            break;
          case '6':
            params.sttDvcd = '0070';
            break;
          case '7':
            params.sttDvcd = '0090';
            break;
        }
      }

      setFirstLoading(false);
      setMobScrollList([]);
      showLoader();
      dispatch(
        listActions.getDealerProdListAction({
          name: 'list',
          values: params
        })
      );
      hideLoader();
    }
  }, []);

  const historySearchCallback = useCallback(
    async ({ startDt, endDt, sortValue }) => {
      params.startDt = startDt;
      params.endDt = endDt;
      params.sortValue = sortValue;
      console.log('historySearchCallback params : ', params);
      showLoader();
      await dispatch(
        listActions.getDealerProdListAction({
          name: 'list',
          values: params
        })
      );
      if (hasMobile) {
        setMobScrollList([...list]);
      }
      hideLoader();
    },
    [dispatch, hasMobile, hideLoader, list, params, showLoader]
  );

  const standbySearchCallback = useCallback(
    async ({ sttDvcd, watingSortType, currentPage }) => {
      params.sttDvcd = sttDvcd;
      params.watingSortType = watingSortType;
      params.currentPage = currentPage;

      showLoader();
      await dispatch(
        listActions.getDealerProdListAction({
          name: 'list',
          values: params
        })
      );
      if (hasMobile) {
        setMobScrollList([...list]);
      }
      hideLoader();
    },
    [dispatch, hasMobile, hideLoader, list, params, showLoader]
  );

  const getSelectedProdItem = () => {
    return selectedProdItem;
  };

  const [canclePop, setCanclePop] = useRodal(false);
  const [confirmPop, setConfirmPop] = useRodal(false);

  const closeCanclePop = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      setCanclePop(false);
    },
    [setCanclePop]
  );

  const closeConfirmPop = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      setConfirmPop(false);
      setCanclePop(false);
    },
    [setCanclePop, setConfirmPop]
  );

  const openConfirmPop = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      setConfirmPop(true);
    },
    [setConfirmPop]
  );

  // 검색후 현재 검색된 날짜 출력용
  const [isDate3, setIsDate3] = useState(
    moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
  );
  const [isDate4, setIsDate4] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: gInfoLive().membertype === '0010' ? '등록차량 및 광고관리' : '마이페이지',
          options: gInfoLive().membertype === '0010' ? ['back', 'gnb'] : ['back', 'alarm', 'gnb']
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

    getCommonCodeAsync('AM032').then((codeList) => setStatusList(codeList.slice(1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*모바일 리스트용 변수에 설정*/
  useEffect(() => {
    if (hasMobile) {
      if (nowLoading > 0) {
        setMobScrollList([...mobScrollList, ...list]);
      } else {
        setMobScrollList([...list]);
      }
      setNowLoading(0);
    }
  }, [list]);

  const onClickCarManage = useCallback(() => {}, []);

  const onClickAdvManage = useCallback(() => {}, []);

  const [nowLoading, setNowLoading] = useState(0);
  // Mobile, 더보기
  const onScroll = useCallback(async () => {
    console.log('scrolling getDealerProdListAction nowLoading : ', nowLoading);
    if (callBackNo === 0) {
      const target = document.querySelector('#wrap');
      if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && nowLoading === 0) {
        if (totalcnt <= list?.length || totalcnt <= params.viewPageCnt * currentPage) {
          // do nothing
        } else {
          console.log('scrolling getDealerProdListAction currentPage : ', currentPage);
          params.currentPage = currentPage + 1;
          params.viewPageCnt = listCntPerPage;
          setCurrentPage(params.currentPage);

          showLoader();
          setNowLoading(nowLoading + 1);
          console.log('scrolling getDealerProdListAction params : ', params);
          await dispatch(
            listActions.getDealerProdListAction({
              name: 'list',
              values: params
            })
          ).then((res) => {});
          hideLoader();
        }
      }
    }
  }, [nowLoading, callBackNo, totalcnt, list, params, currentPage, listCntPerPage, showLoader, dispatch, hideLoader]);

  useEffect(() => {
    if (callBackNo === 0 && hasMobileDealerMain !== true) {
      if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
      return () => {
        if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
      };
    }
  }, [callBackNo, hasMobile, onScroll]);

  if (hasMobile) {
    if (hasMobileDealerMain === true) {
      return (
        <AppLayout>
          <MyPageNavi dealerProdList={dealerProdList} isMyPage={true} sttDvcd={params.sttDvcd} params={params} />
        </AppLayout>
      );
    }
    return (
      <AppLayout>
        <DealerContext.Provider value={{ withoutList, fpFilter01, fpModify, fpTimeChange, fpFreeTicket, handleFullpagePopup }}>
          <TabMenu type="type2" defaultTab={tabA ? Number(tabA) : 0} mount={false} fixTab={true} callBack={callBackHandler}>
            <TabCont tabTitle={`등록차량 관리(${totalsaleprodcnt})`} id="tab2-1" index={0} onClick={onClickCarManage}>
              <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
                <Tabs
                  defaultActiveKey={tabB ? tabB : '1'}
                  // activeKey={tabKey}
                  renderTabBar={() => <SwipeableInkTabBar pageSize={3} />}
                  renderTabContent={() => <TabContent />}
                  onChange={tabCallback}
                >
                  <TabPane tab={`판매중(${normalsaleprodcnt})`} data-extra="tabpane" key="1">
                    {/* <MypageManageList1 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={tabCallback} popupHandler={handleFullpagePopup} type="progressing" />
                      <ul className="admin-list-wrap">
                        <li>
                          <ProdSelectedItemEmitter
                            params={params}
                            checkAll={checkAll}
                            updatePass={usingTicketList?.updatefreepassinfo}
                            // updatePass={{
                            //   regMm: '2',
                            //   crSlot: '5',
                            //   retentionperiod: '15',
                            //   prdUseCnt: '2'
                            // }}
                            eventHandler={popEventHandler}
                            items={selectedItems}
                            popupHandler={handleFullpagePopup}
                          />
                        </li>
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                          isRestrained={isRestrained}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`관리필요(${managementsaleprodcnt})`} data-extra="tabpane" key="2">
                    {/* <MypageManageList2 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={tabCallback} popupHandler={handleFullpagePopup} type="progressing" />
                      <ul className="admin-list-wrap">
                        <li>
                          <ProdSelectedItemEmitter
                            params={params}
                            checkAll={checkAll}
                            updatePass={usingTicketList?.updatefreepassinfo}
                            eventHandler={popEventHandler}
                            items={selectedItems}
                            popupHandler={handleFullpagePopup}
                          />
                        </li>
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                          isRestrained={isRestrained}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`판단보류(${judgmentsaleprodcnt})`} data-extra="tabpane" key="3">
                    {/* <MypageManageList3 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={tabCallback} popupHandler={handleFullpagePopup} type="progressing" />
                      <ul className="admin-list-wrap">
                        <li>
                          <ProdSelectedItemEmitter
                            params={params}
                            checkAll={checkAll}
                            updatePass={usingTicketList?.updatefreepassinfo}
                            eventHandler={popEventHandler}
                            items={selectedItems}
                            popupHandler={handleFullpagePopup}
                          />
                        </li>
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`대기차량(${waitingsaleprodcnt})`} data-extra="tabpane" key="4">
                    {/* <MypageManageList4 /> */}
                    <div className="register-admin-sec">
                      <ProdWaitingCarFilter params={params} eventHandler={standbySearchCallback} popupHandler={handleFullpagePopup} type="progressing" />
                      <ul className="admin-list-wrap">
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`판매완료(${salescompletedprodcnt})`} data-extra="tabpane" key="5">
                    {/* <MypageManageList5 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={historySearchCallback} popupHandler={handleFullpagePopup} type="history" />
                      <ul className="admin-list-wrap">
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`삭제차량(${deletecompletedprodcnt})`} data-extra="tabpane" key="6">
                    {/* <MypageManageList6 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={historySearchCallback} popupHandler={handleFullpagePopup} type="history" />
                      <ul className="admin-list-wrap">
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                        />
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab={`보류차량(${holdingprodcnt})`} data-extra="tabpane" key="7">
                    {/* <MypageManageList7 /> */}
                    <div className="register-admin-sec">
                      <ProdFilterSelector params={params} eventHandler={historySearchCallback} popupHandler={handleFullpagePopup} type="history" />
                      <ul className="admin-list-wrap">
                        <ProdList
                          items={mobScrollList}
                          changingEvent={changingEvent}
                          checkItem={checkItem}
                          selectedItems={selectedItems}
                          params={params}
                          statusList={statusList}
                          memberInfo={memberInfo}
                          popupHandler={handleFullpagePopup}
                          reloadListHandler={reloadList}
                        />
                      </ul>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </TabCont>
            <TabCont tabTitle="광고 관리" id="tab2-2" index={1} onClick={onClickAdvManage}>
              <div className={`tabmenu-swipe tp2 o-length-2 active-${tabKey}`}>
                <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={3} />} renderTabContent={() => <TabContent />} defaultActiveKey={tabB ? tabB : '1'} onChange={tabCallbackAdvMng}>
                  <TabPane tab="광고이용권안내" data-extra="tabpane" key="1">
                    <div className="content-wrap content-border">
                      <div className="payment-admin-wrap pd0">
                        <div className="float-wrap btn-s mt12">
                          <h3 className="tit2 fl">사용중인 이용권</h3>
                          {/* <div className="btn-wrap">
                            <Button size="sml" line="gray" color="gray" radius={true} title="자동결제 취소" width={85} />
                            <Button size="sml" line="gray" color="gray" radius={true} title="자동결제 신청" width={85} marginLeft={9} />
                          </div> */}
                        </div>

                        {/* <UsingTicketList item={usingTicketList} /> */}
                        <div className="voucher-slide-wrap mt12">
                          {freepassinfo && (
                            <div className="voucher-area">
                              <div className="float-wrap">
                                <p>자유이용권</p>
                                {parseInt(freepassinfo?.retentionperiod ?? 0) < 15 && (
                                  <Button
                                    size="sml"
                                    line="gray"
                                    color="gray"
                                    radius={true}
                                    title="광고연장"
                                    width={53}
                                    height={24}
                                    fontSize={10}
                                    fontWeight={500}
                                    onClick={handleFullpagePopup('adBuy', 'free')}
                                  />
                                )}
                              </div>
                              {/* 자유이용권 (이용대수, 남은기간) */}
                              {getFreeTicketHtml(freepassinfo?.prodCnt ?? 0, freepassinfo?.retentionperiod ?? 0)}
                            </div>
                          )}

                          {/* 대당이용권 */}
                          {perpasscnt && getOneTimeTicketHtml(perpasscnt?.perCnt ?? 0)}

                          {updatefreepassinfo && (
                            <div className="voucher-area">
                              <div className="float-wrap">
                                <p>업데이트 자유권</p>
                                {parseInt(updatefreepassinfo?.retentionperiod ?? 0) < 14 && (
                                  <Button
                                    size="sml"
                                    line="gray"
                                    color="gray"
                                    radius={true}
                                    title="광고연장"
                                    width={53}
                                    height={24}
                                    fontSize={10}
                                    fontWeight={500}
                                    onClick={handleFullpagePopup('adBuy', 'update')}
                                  />
                                )}
                              </div>
                              {/* 업데이트 자유권(이용대수/가능대수, 남은기간) */}
                              {getUpdateFreeTicketHtml(updatefreepassinfo?.prodCnt ?? 0, updatefreepassinfo?.crSlot, updatefreepassinfo?.retentionperiod ?? 0)}
                            </div>
                          )}

                          {/* 업데이트 대당권 */}
                          {perupdatepasscnt && getUpdateOneTimeTicketHtml(perupdatepasscnt?.perCnt ?? 0)}
                        </div>
                      </div>

                      <div className="float-wrap btn-s mt32">
                        <h3 className="tit2">상품안내</h3>
                        <Button size="sml" line="gray" color="gray" radius={true} title="자세히보기" width={88} fontSize={12} fontWeight={500} onClick={handleFullpagePopup('ad')} />
                      </div>

                      <ul className="payment-sec">
                        <li>
                          <h4 className="tit3 mb16">기본상품</h4>
                          <ul className="tx-list mb24">
                            <li>
                              <div className="btn-wrap">
                                <h5>경매 낙찰 이용권</h5>
                                {/* <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('paymentInfo')}
                                /> */}
                              </div>
                              <p>오토벨 경매장에서 낙찰받은 차량을 광고로 등록하실 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">최대 1개월</span>
                                <span className="price">
                                  50,000<span className="won">원</span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="btn-wrap">
                                <h5>대당 이용권</h5>
                                {/* <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('paymentInfo')}
                                /> */}
                              </div>
                              <p>차량 1대를 등록할 수 있는 이용권입니다.</p>
                              <ul>
                                <li>* 일반등록차량 리스트에 노출됩니다.</li>
                              </ul>
                              <div>
                                <span className="period">최대 1개월</span>
                                <span className="price">
                                  24,000<span className="won">원</span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="btn-wrap">
                                <h5>자유 이용권</h5>
                                <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('adBuy', 'free')}
                                />
                              </div>
                              <p>선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.</p>
                              <ul>
                                <li>* 일반등록차량 리스트에 노출됩니다.</li>
                                <li>* 등록차량이 판매완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.</li>
                              </ul>
                              <div>
                                <span className="period">1 ~ 12개월</span>
                                <span className="price">
                                  165,000<span className="won">원~</span>
                                </span>
                              </div>
                            </li>
                          </ul>

                          <h4 className="tit3 mb16">부가상품</h4>
                          <ul className="tx-list mb24">
                            <li>
                              <div className="btn-wrap">
                                <h5>업데이트 대당권</h5>
                                {/* <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('paymentInfo')}
                                /> */}
                              </div>
                              <p>차량 업데이트를 추가로 20회 할 수 있는 이용권입니다. 무료 4회 포함 24회 업데이트 할 수 있습니다.</p>
                              <ul>
                                <li>* Live Service 이용 고객에게는 업데이트 20회가 무료로 제공됩니다.</li>
                              </ul>
                              <div>
                                <span className="period">1대</span>
                                <span className="price">
                                  11,000<span className="won">원</span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="btn-wrap">
                                <h5>업데이트 자유권</h5>
                                <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('adBuy', 'update')}
                                />
                              </div>
                              <p>선택기간 동안 선택한 차량대수 만큼 추가로 20회 업데이트 할 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">1 ~ 12개월</span>
                                <span className="price">
                                  55,000<span className="won">원~</span>
                                </span>
                              </div>
                            </li>
                          </ul>

                          <h4 className="tit3 mb16">프라이싱 상품</h4>
                          <ul className="tx-list">
                            <li>
                              <div className="btn-wrap">
                                <h5>프라이싱 조회권</h5>
                                <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="구입하기"
                                  width={67}
                                  height={24}
                                  fontSize={10}
                                  fontWeight={500}
                                  onClick={handleFullpagePopup('adBuy', 'pricing')}
                                />
                              </div>
                              <p>스마트옥션에서 실제 거래되었던 차량의 낙찰가를 확인할 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">1~1,000회</span>
                                <span className="price">
                                  1,100<span className="won">원~</span>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab="결제내역" data-extra="tabpane" key="2">
                    <div className="payment-tx-list content-border pt4">
                      <ul className="m-toggle-list search">
                        <FilterTable params={params} onSubmit={mobSearch} />
                        <li>
                          <div className="float-wrap">
                            <p>
                              {isDate3} ~ {isDate4}
                            </p>
                            <p>
                              총 <span className="tx-blue80">{totalCount}</span>건
                            </p>
                          </div>
                        </li>
                      </ul>
                      <div className="eposit-tx-list content-border">
                        <ul className="m-toggle-list up-blue">
                          <MenuItem>
                            <MenuTitle>꼭 알아두세요!</MenuTitle>
                            <MenuCont>
                              <div className="essential-point tx-black">
                                <ul>
                                  <li>
                                    <i className="ico-dot" />
                                    신용카드로 결제 시 카드매출전표가 발급되며, 세금계산서 대용으로 매입세액공제를 받으실 수 있습니다.
                                  </li>
                                  <li>
                                    <i className="ico-dot" />
                                    휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.
                                  </li>
                                  <li className="chk">
                                    <i className="ico-check-gray" />
                                    단, 휴대전화 결제금액을 신용카드로 납부 시에는 발행되지 않습니다.
                                  </li>
                                  <li>
                                    <i className="ico-dot" />
                                    무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)
                                  </li>
                                  <li>
                                    <i className="ico-dot" />
                                    현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.
                                  </li>
                                  <li>
                                    <i className="ico-dot" />
                                    세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)
                                  </li>
                                  <li>
                                    <i className="ico-dot" />
                                    세금계산서 문의 : 고객센터 0000-0000)
                                  </li>
                                </ul>
                              </div>
                            </MenuCont>
                          </MenuItem>
                        </ul>

                        <ul className={paymentList?.length ? 'pay-tx-list arrow' : 'pay-tx-list'}>
                          {paymentList?.length ? (
                            paymentList.map((payment, i) => (
                              <li key={i}>
                                <a onClick={handleFullpagePopup('payment', payment)}>
                                  <p className="mb16">{payment.prdNm}</p>
                                  <ul>
                                    <li>
                                      <span>결제일</span> {payment.payDt}
                                    </li>
                                    <li>
                                      <span>결제 번호</span> {payment.odrNum}
                                    </li>
                                    <li className="tx-b">
                                      <span>결제 금액</span> {setComma(payment.payAmt)}원
                                    </li>
                                    <li>
                                      <span>결제 수단</span> {payment.cdNm}
                                    </li>
                                  </ul>
                                </a>
                              </li>
                            ))
                          ) : (
                            <li>
                              <p className="mb16">결제내역이 없습니다.</p>
                            </li>
                          )}
                        </ul>
                        {showMoreBtn && (
                          <Buttons align="center" marginTop={8}>
                            <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={listMoreHandler} />
                          </Buttons>
                        )}
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="입금대기" data-extra="tabpane" key="3">
                    <MobDealerAdManagement params={params} management={'adver'} sub={'3'} />
                  </TabPane>
                  {/* <TabPane tab="광고효과분석" data-extra="tabpane" key="4">
                    <div className="dealer-adeffect-sec content-border">
                      {
                        withoutList === true
                          ? (
                            <div className="list-none-wrap">
                              <p className="list-none">광고중인 차량이 없습니다.
                                <span>광고효과 분석은 차량 등록 후<br />48시간 이후 확인 하실 수 있습니다.</span>
                              </p>
                            </div>
                          ) : (
                            <ul className="admin-list-wrap">
                              <li>
                                <div className="goods-list admin-list tp4">
                                  <ul>
                                    <li>
                                      <span>
                                        <div className="img-cover">
                                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                        </div>
                                        <div className="summary">
                                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                          <div className="info-wrap">
                                            <div className="info">
                                              <span>00가 0000</span>
                                              <span>09/12식 (10년형)</span>
                                              <span>84,761km</span>
                                            </div>
                                            <div className="price-wrap float-wrap">
                                              <div className="price-left">
                                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                                              </div>
                                              <Link href="/mypage/dealerSell01Effect"><a>효과분석</a></Link>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </li>
                                    <li>
                                      <span>
                                        <div className="img-cover">
                                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                        </div>
                                        <div className="summary">
                                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                          <div className="info-wrap">
                                            <div className="info">
                                              <span>00가 0000</span>
                                              <span>09/12식 (10년형)</span>
                                              <span>84,761km</span>
                                            </div>
                                            <div className="price-wrap float-wrap">
                                              <div className="price-left">
                                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                                              </div>
                                              <Link href="/mypage/dealerSell01Effect"><a>효과분석</a></Link>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          )
                      }
                    </div>
                  </TabPane> */}
                  <TabPane tab="취소 및 환불안내" data-extra="tabpane" key="5">
                    <MobDealerAdManagement params={params} management={'adver'} sub={'5'} />
                  </TabPane>
                </Tabs>
              </div>
            </TabCont>
          </TabMenu>
          {/* {
            <>
              <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
              <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
                <MobCalendar date={isDate1} callback={calendarCallback1} />
              </MobBottomArea>
              <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
                <MobCalendar date={isDate2} callback={calendarCallback2} />
              </MobBottomArea>
            </>
          } */}
        </DealerContext.Provider>

        <RodalPopup show={canclePop} type={'fade'} width={380} closedHandler={closeCanclePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>선택하신 입금대기 내역을 취소하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeCanclePop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={openConfirmPop} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={confirmPop} type={'fade'} width={380} closedHandler={closeConfirmPop} isMask={false} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>취소신청이 완료되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={closeConfirmPop} />
            </Buttons>
          </div>
        </RodalPopup>

        {createBodyPortal(
          <MobFullpagePopup active={mFullpageCPopup} paddingBottom={fpBottom} cPop={true}>
            {fpFilter01 && (
              <>
                <MobFilterModel hiddenTab={[2]} onCarModelSelect={onClickModel} selectedDepth={2} />
                <Buttons align="center" className="full fixed">
                  <Button size="big" background="blue20" color="blue80" title="전체선택" onClick={onClickAll} />
                  <Button size="big" background="blue80" title="선택" onClick={onClickSel} />
                </Buttons>
              </>
            )}
            {fpModify && <MobCarModify callback={modifyCallback} prodItemFun={getSelectedProdItem} changingEvent={changingEvent} firstStep={true} reloadEvent={tabCallback} />}
            {fpTimeChange && (
              <MobTimeChange
                callback={timeChangeCallback}
                prodItemFun={getSelectedProdItem}
                dlrPrdId={queryDlrPrdId}
                returnQueryInfo={`tabA=0&tabB=${queryTabB || '1'}&itemId=${queryDlrPrdId}&optA=${queryOptA}&`}
              />
            )}
            {fpFreeTicket && <MobUpdateManage callback={updateManageCallback} updatePass={updatePass} />} {/* 업데이트 자유권 관리 */}
            {fpAd && <MobDealerSellAd mode="viewer" />}
            {fpAdBuy && <MobPaymentGoods type={fpGoodsType} callback={goodsCallback} onClose={goodsClose} params={params} />}
            {fpPaymentInfo && (
              <>
                <h3 className="tit2 pd20">결제정보</h3>
                <MobPaymentInfo title={'경매 낙찰 이용권'} />
                <Buttons align="center" className="full fixed">
                  <Button size="big" background="blue20" color="blue80" title="취소" onClick={onClosePayment} />
                  <Button size="big" background="blue80" title="결제" onClick={paymentCallback} />
                </Buttons>
              </>
            )}
            {fpPayment && <MobPayment paymentItem={paymentItem} />}
          </MobFullpagePopup>
        )}
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MyPageNavi mode="dealer" memberType={'normal'} />
        <div className="mypage-state-sec">
          <TabMenu
            type={'type1'}
            mount={false}
            defaultTab={params.management === 'adver' ? 1 : 0}
            tabLink={[
              { index: 0, url: '/mypage/dealer/sellcar/carManagement?management=prodCar' },
              { index: 1, url: '/mypage/dealer/sellcar/carManagement?management=adver' }
            ]}
          >
            <TabCont tabTitle={`등록차량 관리(전체:${totalsaleprodcnt})`} id="tab1-1" index={0}>
              {
                <>
                  <ProdFilterTab
                    memberInfo={member}
                    active={params.sttDvcd}
                    items={[normalsaleprodcnt, managementsaleprodcnt, judgmentsaleprodcnt, waitingsaleprodcnt]}
                    eventHandler={goPageWithNewParam}
                    isRestrained={isRestrained}
                  />
                  <div className={`register-admin-sec ${!['0010', '0020', '0030'].includes(params.sttDvcd) && 'standby-car-sec'}`}>
                    <ProdFilterSelector params={params} eventHandler={goPageWithNewParam} />
                    {['0010', '0020', '0030', '0050'].includes(params.sttDvcd) && (
                      <ProdSelectedItemEmitter params={params} checkAll={checkAll} updatePass={usingTicketList?.updatefreepassinfo} eventHandler={popEventHandler} items={selectedItems} />
                    )}
                    {['0060', '0070', '0090'].includes(params.sttDvcd) && <FilterTable onSubmit={goPageWithNewParam} params={params} text="(* 최대 1년까지 조회 가능합니다.)" />}
                    {params.sttDvcd === '0050' && <ProdWaitingCarFilter eventHandler={goPageWithNewParam} params={params} />}

                    <ProdList
                      items={list}
                      changingEvent={changingEvent}
                      checkItem={checkItem}
                      selectedItems={selectedItems}
                      params={params}
                      statusList={statusList}
                      memberInfo={memberInfo}
                      isRestrained={isRestrained}
                    />

                    <PageNavigator
                      recordCount={totalcnt}
                      recordSize={parseInt(params?.viewPageCnt)}
                      className="mt32"
                      currentPage={parseInt(params?.currentPage)}
                      changed={(e, currentPage) =>
                        goPageWithNewParam({
                          currentPage
                        })
                      }
                    />
                  </div>
                </>
              }
            </TabCont>
            <TabCont tabTitle="광고 관리" id="tab1-2" index={1}>
              {params.management === 'adver' && (
                <div className="dealer-advertise-sec">
                  <DealerAdManagement params={params} eventHandler={goPageWithNewParam} advStore={dealerAdverStore} prodStore={dealerProdStore} memberInfo={memberInfo} />
                </div>
              )}
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  );
});

CarManagement.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  console.log('CarManagement.getInitialProps ::::::::::::::::::::::: -> http', http);
  const { query, reduxStore } = helper;
  const { hasMobile } = reduxStore.getState().common;
  console.log('hasMobile ::::::::::::::::::::::: ', hasMobile);
  console.log('CarManagement.getInitialProps -> query', query);

  const today = new Date();
  const defaultEndDt = moment(today).format('YYYY-MM-DD');
  const defaultStartDt = moment(today)
    .subtract(1, 'month')
    // .subtract(3, 'months')
    .format('YYYY-MM-DD');

  //로그인이 필요한 페이지일 경우
  helper.accessControl();

  const { data: memberInfo } = await memberApi.selectMbInfo().then((res) => res?.data);
  const hasMobileDealerMain = (query.management || '').toLowerCase() === 'dealermain';
  const {
    management = 'prodCar',
    currentPage = 1,
    viewPageCnt = 10,
    sttDvcd = '0010',
    watingSortType,
    crMnfcCd = '',
    crMdlCd = '',
    sortValue = 'UPD_DT',
    by = 'DESC',
    sub = '0',
    startDt = defaultStartDt,
    endDt = defaultEndDt,
    period = '1month',
    // period = '3month',
    effectCategory = '00',
    dlrPrdId,
    prdDvcd,
    crSlot
  } = query;

  if (hasMobileDealerMain) {
    query.viewPageCnt = 8;
  }

  let usingQuery = {
    management: (query.management || '').toLowerCase() === 'dealermain' ? 'prodCar' : management,
    sub
  };

  try {
    if (management === 'prodCar' || hasMobileDealerMain === true) {
      console.info('등록차량 관리');
      usingQuery = {
        ...usingQuery,
        sttDvcd,
        watingSortType,
        currentPage,
        viewPageCnt,
        crMnfcCd,
        crMdlCd,
        sortValue,
        by,
        startDt,
        endDt,
        period,
        prdDvcd,
        crSlot
      };

      console.log('First getDealerProdListAction param : ', usingQuery);

      if (hasMobile) {
        await helper.dispatch(advActions.getAdverProductListAction(), advActions.getAdverPassInfoAction(), listActions.getDealerConditionAction(), listActions.getDealerProdCntAction(usingQuery));
      } else {
        await helper.dispatch(
          // listActions.getMyAdProdListAction(),
          advActions.getAdverProductListAction(),
          advActions.getAdverPassInfoAction(),
          listActions.getDealerConditionAction(),
          listActions.getDealerProdCntAction(usingQuery),
          listActions.getDealerProdListAction({
            name: 'list',
            values: usingQuery
          })
        );
      }
    } else if (management === 'adver') {
      if (sub === '0') {
        console.info('광고효과분석');
        usingQuery = {
          ...usingQuery,
          effectCategory,
          dlrPrdId
        };
        await helper.dispatch(effectAction.getAdverBaseInfoAction(usingQuery), effectAction.getAnalysisDataAction(usingQuery));
      } else if (sub === '1') {
        console.info('광고이용권안내');
        usingQuery = {
          ...usingQuery
        };
        await helper.dispatch(listActions.getDealerProdCntAction(usingQuery), advActions.getAdverPassInfoAction(), advActions.getAdverProductListAction());
      } else if (sub === '2') {
        console.info('이용권구매');
        usingQuery = {
          ...usingQuery,
          prdDvcd,
          crSlot,
          dlrPrdId
        };
        await helper.dispatch(listActions.getDealerProdCntAction(usingQuery), advActions.getAdverPassInfoAction(), advActions.getAdverProductListAction());
      } else if (sub === '3') {
        console.info('결제내역');
        usingQuery = {
          ...usingQuery,
          currentPage,
          viewPageCnt,
          sortValue,
          by,
          startDt,
          endDt,
          period
        };
        await helper.dispatch(listActions.getDealerProdCntAction(usingQuery), advActions.getPaymentListAction(usingQuery));
      } else if (sub === '4') {
        console.info('입금대기내역');
        usingQuery = {
          ...usingQuery,
          currentPage,
          viewPageCnt,
          sortValue,
          by
        };
        await helper.dispatch(listActions.getDealerProdCntAction(usingQuery), advActions.getDepositWaitingListAction(usingQuery));
      } else if (sub === '5') {
        console.info('취소 및 환불안내');
        usingQuery = {
          ...usingQuery,
          currentPage,
          viewPageCnt,
          sortValue,
          by,
          startDt,
          endDt,
          period
        };
        await helper.dispatch(listActions.getDealerProdCntAction(usingQuery), advActions.getCancellationNRefundListAction(usingQuery));
      }
    }
  } catch (err) {
    console.error(err);
  }
  return {
    hasMobileDealerMain,
    memberInfo,
    params: usingQuery
  };
};

CarManagement.propTypes = {
  hasMobileDealerMain: PropTypes.bool,
  memberInfo: PropTypes.object,
  params: PropTypes.object,
  router: PropTypes.object
};

CarManagement.displayName = 'CarManagement';
export default withRouter(CarManagement);
