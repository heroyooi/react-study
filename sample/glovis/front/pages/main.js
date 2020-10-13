import React, { memo, useState, useCallback, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import AppLayout from '@src/components/layouts/AppLayout';
import SearchArea from '@src/components/common/SearchArea';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import BannerItem from '@src/components/common/banner/BannerItemBuyCar';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobSelectList from '@lib/share/items/MobSelectList';
import { SECTION_MAIN, MOBILE_HEADER_TYPE_MAIN, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { getPopularByCategoryList, selectMainBannerInfo, getTodayPopCarInfo } from '@src/actions/main/mainAction';
import { getBestPickMainList } from '@src/actions/main/bestPickAction';
import { getCarListStudio, getSuggestWordList } from '@src/actions/buycar/buyCarListAction';
import { setComma } from '@src/utils/StringUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { getLocationList, getDetailLocationList } from '@src/actions/sellcar/locationAction';
import { insertSellcarAction } from '@src/actions/sellcar/VisitSellCarAction';
import { selectSellcarTerms } from '@src/api/sellcar/AllSellcarSearchApi';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import { AUCTION_TYPE, COMMON_TYPE, LIVESTD_TYPE } from '@src/constant/buyCarConstant';
import { mCarList } from '@src/dummy';
import { imgUrl } from '@src/utils/HttpUtils';
import classNames from 'classnames/bind';
import { stringify } from 'qs';
import { preventScroll } from '@src/utils/CommonUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { console } from 'globalthis/implementation';

const Main = memo(() => {
  console.log('imgUrl=%o', `${imgUrl}`);
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { showAlert } = useContext(SystemContext);
  const [isVisitEvalTermPopUp, setIsVisitEvalTermPopUp] = useRodal(false, true); //방문평가 약관(이용약관)
  const [isPrivacyEvalTermPopUp, setIsPrivacyEvalTermPopUp] = useRodal(false, true); //방문평가 약관(개인정보처리방침)

  const popularCertifiedMallProdByCategoryList = useSelector((state) => state.main.popularByCategoryList);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const bestLargeList = useSelector((state) => state.bestPick.bestLargeMainList);
  // const marketPrice = useSelector((state) => state.main.carPriceChartData);//오늘의 인기차량 조회로 통합
  const [marketPrice, setMarketPrice] = useState({ currentPrice: { price: '', marketMinPrice: '', marketMaxPrice: '' } }); //currentPrice: {}
  const bestSmallList = useSelector((state) => state.bestPick.bestSmallMainList);
  const todayPopCarInfo = useSelector((state) => state.main.todayPopCarInfo); //오늘의 인기차량
  const isStudioCarListQuery = useSelector((state) => state.buyCarList.isStudioCarListQuery); //라이브스튜디오 조회여부
  const isAuctionCarListQuery = useSelector((state) => state.buyCarList.isAuctionCarListQuery); //경매 조회여부
  const isCertifiedMallProdListQuery = useSelector((state) => state.main.isCertifiedMallProdListQuery); //인증몰 조회여부
  const studioCarList = useSelector((state) => state.buyCarList.studioCarList); //라이브스튜디오 차량목록 (bestpick)
  const auctionCarList = useSelector((state) => state.buyCarList.auctionCarList); //라이브스튜디오 차량목록 (bestpick)
  const mainBannerInfoMovie = useSelector((state) => state.main.mainBannerInfo.AM0540230); //동영상
  const mainBannerInfoBelt = useSelector((state) => state.main.mainBannerInfo.AM0540220); //띠배너
  const mainBannerInfoSpread = useSelector((state) => state.main.mainBannerInfo.AM0540210); //스프레드 배너
  const locationList = useSelector((state) => state.sellcarLocation.locationList, []);
  const detailLocationList = useSelector((state) => state.sellcarLocation.detailLocationList, []);

  const [sellCarNo, setSellCarNo] = useState(''); // 내차팔기신청 차량번호
  const [terms, setTerms] = useState(''); //내차팔기 약관조회(이용약관)
  const [privacyTerms, setPrivacyTerms] = useState(''); //내차팔기 약관조회(개인정보처리방침)
  const [applyConfirm, setApplyConfirm] = useState(false);
  const [bestSmallListTemp, setBestSmallListTemp] = useState([]); //best pick 작은이미지
  const [popularProd, setPopularProd] = useState([]); //카테고리별 인기매물
  const [bestLargeInfo, setBestLargeInfo] = useState({}); //best pick 큰이미지
  const [isGetCarListStudio, setIsGetCarListStudio] = useState(false); //라이브스튜디오 조회여부
  const [dimm1, setDimm1] = useState(false);
  const [mainVisual, setMainVisual] = useState(0);
  const [beltImageUrl, setBeltImageUrl] = useState(''); //하위띠배너
  const [phtUrl, setPhtUrl] = useState(''); //인기차량 이미지
  const [crNo, setCrNo] = useState(''); //내차시세 > 차량번호
  // const [isPricingSearch, setIsPricingSearch] = useState(false); //시세조회 여부
  const [visitTermAgree, setVisitTermAgree] = useState(false);
  const [privacyTermAgree, setPrivacyTermAgree] = useState(false);
  const [topBanner, setTopBanner] = useState(true);
  const [outEvent, setOutEvent] = useState(false);
  const [systemAlaram, setSystemAlaram] = useState(false); //시스템 내부점검 알림
  //내차팔기
  const [inputs, setInputs] = useState({
    userName: '',
    hpPn01: '',
    rgstRsdcAddrCd: '',
    rgstRsdcAddrNm: '',
    rgstRsdcDtlAddrCd: '',
    rgstRsdcDtlAddrNm: ''
  });

  const { userName, hpPn01, rgstRsdcAddrCd, rgstRsdcAddrNm, rgstRsdcDtlAddrCd, rgstRsdcDtlAddrNm } = inputs;

  const mainBarWrap = classNames('main-bar-wrap', { active: outEvent });

  const visualChange = useCallback((e, num) => {
    e.preventDefault();
    setMainVisual(num);
  }, []);
  const handleSmartFinder = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  const makeCategory = (list) => {
    //카테고리(라이브스튜디오)별 설명1개+상품3개로 구성
    const emptyRow = {
      dlrPrdId: '',
      delePhtUrl: '',
      mnfcNm: '',
      mdlNm: '',
      clsNm: '',
      frstRegDt: '',
      frmYyyy: '',
      drvDist: 0,
      mss: ' ',
      fuelNm: ' ',
      slAmt: 0,
      itrtProdYn: '',
      lvstdYn: '',
      hsvcYn: '',
      ewYn: '',
      auctSbidYn: ''
    };

    let listTemp = [];
    console.log('카테고리 별 인기매물 list=%o', list);

    if (list.length > 3) {
      listTemp = list.slice(0, 3); //3개만 노출
    } else if (list.length === 3) {
      listTemp = list; //3개만 노출
    } else {
      for (let i = 0; i < list.length; i++) {
        listTemp = listTemp.concat(list[i]); //조회된 결과
      }
      for (let i = 0; i < 3 - list.length; i++) {
        listTemp = listTemp.concat(emptyRow); //3개가 안되면 빈데이터로 채움
      }
    }
    return listTemp;
  };

  //bestpick상세페이지 이동
  const moveBuyCarDetailPage = (e, bestPickInfo) => {
    e.preventDefault(); //
    const url = '/buycar/buyCarDetailType';
    let detailType = '';
    const dlrPrdId = bestPickInfo.dlrPrdId;
    const lvstdYn = bestPickInfo.lvstdYn;
    const auctSbidYn = bestPickInfo.auctSbidYn;
    switch ('Y') {
      case lvstdYn:
        detailType = LIVESTD_TYPE;
        break;
      case auctSbidYn:
        detailType = AUCTION_TYPE;
        break;
      default:
        detailType = COMMON_TYPE;
        break;
    }

    const param = detailType !== '' ? `&detailType=${detailType}` : '';
    const href = `${url}?dlrPrdId=${dlrPrdId}${param}`;
    console.log('상품상세 이동  href=%o', href);

    Router.push(href);
  };

  const handleApplyConfirmToggle = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const nextState = !applyConfirm;
      setApplyConfirm(nextState);
      if (hasMobile) {
        setDimm1(nextState);
        preventScroll(nextState);
      }
    },
    [applyConfirm, hasMobile]
  );

  const handleApplyConfirmClose = useCallback(() => {
    setApplyConfirm(false);
  }, []);

  const handleTermToggle = useCallback(() => {
    console.log('방문평가 약관 체크박스  visitTermAgree=%o,isVisitEvalTermPopUp=%o', visitTermAgree, isVisitEvalTermPopUp);
    setVisitTermAgree((prevTerm) => !prevTerm);
    if (!visitTermAgree) {
      setIsVisitEvalTermPopUp(true);
    }
  }, [isVisitEvalTermPopUp, setIsVisitEvalTermPopUp, visitTermAgree]);

  const handlePrivacyToggle = useCallback(() => {
    setPrivacyTermAgree((prevTerm) => !prevTerm);
    if (!privacyTermAgree) {
      setIsPrivacyEvalTermPopUp(true);
    }
  }, [privacyTermAgree, setIsPrivacyEvalTermPopUp]);

  // 내차팔기 신청 차량번호
  const onChangeSellCarNo = (e) => {
    const { value } = e.target;
    setSellCarNo(value);
  };

  // Fullpage 약관 닫기 핸들러
  const handleTermsClose = useCallback(() => {
    console.log('약관 닫기');
    setIsVisitEvalTermPopUp(false);
    setIsPrivacyEvalTermPopUp(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, [dispatch, setIsPrivacyEvalTermPopUp, setIsVisitEvalTermPopUp]);

  const handleVisitEvalPopUpToggle = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const nextState = !isVisitEvalTermPopUp;

      setIsVisitEvalTermPopUp(nextState);

      if (hasMobile) {
        // if (nextState === false) {
        //   dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        // } else {
        //   dispatch({
        //     type: MOBILE_FULLPAGE_POPUP,
        //     data: {
        //       isPopup: true,
        //       title: '방문평가 이용약관',
        //       options: ['close']
        //     }
        //   });
        // }
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '방문평가 이용약관',
            options: ['close']
          }
        });
        preventScroll(visitTermAgree);
      } else {
        console.log('방문평가 약관 닫기 handleTermToggle isVisitEvalTermPopUp=%o', isVisitEvalTermPopUp);
        setIsVisitEvalTermPopUp(!isVisitEvalTermPopUp);
      }
    },
    [dispatch, hasMobile, isVisitEvalTermPopUp, setIsVisitEvalTermPopUp, visitTermAgree]
  );

  const handlePrivacyEvalPopUpToggle = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const nextState = !isPrivacyEvalTermPopUp;

      setIsPrivacyEvalTermPopUp(nextState);

      if (hasMobile) {
        // if (nextState === false) {
        //   dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        // } else {
        //   dispatch({
        //     type: MOBILE_FULLPAGE_POPUP,
        //     data: {
        //       isPopup: true,
        //       title: '개인정보처리방침',
        //       options: ['close']
        //     }
        //   });
        // }
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '개인정보처리방침',
            options: ['close']
          }
        });
        preventScroll(privacyTermAgree);
      } else {
        setIsPrivacyEvalTermPopUp(!isPrivacyEvalTermPopUp);
      }
    },
    [dispatch, hasMobile, isPrivacyEvalTermPopUp, setIsPrivacyEvalTermPopUp, privacyTermAgree]
  );

  const handleVisitEvalPopUpClose = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      setIsVisitEvalTermPopUp(false);
    },
    [setIsVisitEvalTermPopUp]
  );

  const handlePrivacyEvalPopUpClose = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      setIsPrivacyEvalTermPopUp(false);
    },
    [setIsPrivacyEvalTermPopUp]
  );

  const onSubmitHandler = useCallback(
    (e) => {
      //내차팔기 신청
      e.preventDefault();

      // 이름 체크
      if (isEmpty(userName)) {
        showAlert('이름을 입력하세요');
        return;
      }
      const nameCheck = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/; //한글과-영문-숫자만을-허용하는-함수정규표현식-사용 [L A I L O N G]; //이름은 한글,영문만 허용
      console.log('이름 포맷 체크 userName=%o,test=%o', userName, nameCheck.test(userName));

      if (!nameCheck.test(userName)) {
        showAlert('이름은 한글,영문만 입력 가능합니다.');
        return;
      }
      // 휴대전화번호 체크
      if (isEmpty(hpPn01)) {
        showAlert('휴대전화번호를 입력하세요');
        return;
      }

      const hpPatternCheck = /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/;
      console.log('휴대전화 포맷 체크 hpPn01=%o,test=%o', hpPn01, hpPatternCheck.test(hpPn01));

      if (!hpPatternCheck.test(hpPn01)) {
        showAlert('휴대전화 포맷이 잘못되었습니다.(예시:010-0000-0000)');
        return;
      }

      // 거주지역 체크
      if (isEmpty(rgstRsdcAddrCd) || isEmpty(rgstRsdcDtlAddrCd)) {
        //예외사항 => 세종시는 시군구 정보 없음( 공백 허용)
        console.log('거주지역 체크 > rgstRsdcAddrNm=%o,rgstRsdcAddrCd=%o, rgstRsdcDtlAddrCd=%o', rgstRsdcAddrNm, rgstRsdcAddrCd, rgstRsdcDtlAddrCd);
        if (rgstRsdcAddrCd === '36' && isEmpty(rgstRsdcDtlAddrCd)) {
          console.log('거주지역 체크 > 세종시.. 시군구 공백허용  rgstRsdcAddrNm=%o,rgstRsdcAddrCd=%o, rgstRsdcDtlAddrCd=%o', rgstRsdcAddrNm, rgstRsdcAddrCd, rgstRsdcDtlAddrCd);
        } else {
          showAlert('거주 지역을 선택해주세요');
          return;
        }
      }

      if (hasMobile === true) {
        setApplyConfirm(true);
        setDimm1(true);
        preventScroll(true);
      } else {
        handleApplyConfirmToggle();
      }
    },
    [handleApplyConfirmToggle, hasMobile, hpPn01, rgstRsdcAddrNm, rgstRsdcDtlAddrNm, showAlert, userName]
  );

  const onConfirmHandler = async (e) => {
    //내차팔기신청>확인
    e.preventDefault();
    if (!visitTermAgree) {
      showAlert('방문평가 이용약관에 대한 동의를 해주세요');
      return false;
    }

    if (!privacyTermAgree) {
      showAlert('개인정보처리방침 대한 동의를 해주세요');
      return false;
    }

    //차량번호 체크
    if (inputCarNumber === false) {
      if (isEmpty(sellCarNo) || sellCarNo === '') {
        return showAlert('차량번호를 입력해주세요.');
      }
      const crNoPattern = /^([가-힣]{2})?[0-9]{2,3}[가-힣]{1}[0-9]{4}$/;
      if (!crNoPattern.test(sellCarNo)) {
        return showAlert('차량번호를 형식에 맞게 입력해주세요.', () => {
          setSellCarNo('');
        });
      }
    }

    const params = {
      hasMobile: hasMobile,
      nmbNm: userName,
      hpPn: `${hpPn01}`,
      rgstRsdcAddrCd: rgstRsdcAddrCd,
      rgstRsdcAddrCdNm: rgstRsdcAddrNm,
      rgstRsdcDtlAddrCd: rgstRsdcDtlAddrCd,
      rgstRsdcDtlAddrCdNm: rgstRsdcDtlAddrNm,
      car: {
        crNo: sellCarNo
      }
    };
    const success = await dispatch(insertSellcarAction(params));
    if (success) {
      handleVisitEvalPopUpClose(e);
      Router.push('/sellcar/visit/visitValuationComplete');
    } else {
      showAlert('신청에 실패했음');
    }
  };

  const onMarketPrice = useCallback(
    (e) => {
      console.log('Main -> crNo', crNo);
      //시세페이지 이동
      e.preventDefault();
      if (!/^\d{2,3}\D\d{4}$/.test(crNo)) {
        showAlert('올바른 차량번호를 입력하세요.');
        return;
      }
      if (isEmpty(crNo)) {
        showAlert('차량번호를 입력하세요.');
        return false;
      }
      Router.push(`/marketPrice/marketprice?crNo=${crNo}`);
    },
    [crNo, showAlert]
  );

  //엔터입력시 처리추가
  const handleKeyPress = useCallback(
    (e) => {
      console.log('e :::::::', e.charCode, e)
      if (e.charCode === 13) {
        if (isEmpty(crNo)) {
          showAlert('차량번호를 입력하세요.');
          return false;
        }
        if (!/^\d{2,3}\D\d{4}$/.test(crNo)) {
          showAlert('올바른 차량번호를 입력하세요.');
          return;
        }
        Router.push(`/marketPrice/marketprice?crNo=${crNo}`);
      }
    },
    [crNo, showAlert]
  );

  const handleClickCarNum = useCallback(
    (e) => {
      e.preventDefault();
      if (isEmpty(crNo)) {
        showAlert('차량번호를 입력하세요.');
        return false;
      }
      if (!/^\d{2,3}\D\d{4}$/.test(crNo)) {
        showAlert('올바른 차량번호를 입력하세요.');
        return;
      }
      Router.push(`/marketPrice/marketprice?crNo=${crNo}`);
    },
    [crNo, showAlert]
  );

  const onChangeValue = useCallback((e, target) => {
    e.preventDefault();
    const value = e.target.value;

    setInputs(
      produce((draft) => {
        draft[target] = value;
      })
    );
  }, []);

  const onChangeSelect = (e, target) => {
    console.log('rgstRsdcDtlAddrCd 시도 선택 target=%o, e.label=%o, e.value=%o', target, e.label, e.value);
    if (target === 'RgstRsdcAddrNm') {
      setInputs(
        produce((draft) => {
          draft.rgstRsdcAddrNm = e.label;
          draft.rgstRsdcAddrCd = e.value;
          draft.rgstRsdcDtlAddrNm = '';
          draft.rgstRsdcDtlAddrCd = '';
        })
      );
    } else if (target === 'RgstRsdcDtlAddrNm') {
      setInputs(
        produce((draft) => {
          draft.rgstRsdcDtlAddrNm = e.label;
          draft.rgstRsdcDtlAddrCd = e.value;
        })
      );
    }
  };

  const handleLocationChange = useCallback((e, deps) => {
    if (isEmpty(deps)) {
      showAlert('시/도 를 선택해주세요.');
    } else {
      setInputs(
        produce((draft) => {
          draft.rgstRsdcAddrNm = deps.label;
          draft.rgstRsdcAddrCd = deps.value;
        })
      );
    }
  }, []);

  const handleLocation2Change = useCallback((e, deps) => {
    if (isEmpty(deps)) {
      showAlert('시/군/구 를 선택해주세요.');
    } else {
      setInputs(
        produce((draft) => {
          draft.rgstRsdcDtlAddrNm = deps.label;
          draft.rgstRsdcDtlAddrCd = deps.value;
        })
      );
    }
  }, []);

  const topBannerClose = useCallback((e) => {
    e.preventDefault();
    setOutEvent(true);
  }, []);

  const [mainBarHeight, setMainBarHeight] = useState(0);

  useEffect(() => {
    let timer = null;
    const topEl = document.getElementById('top-area');
    if (hasMobile && topBanner) {
      setMainBarHeight(60);
    }
    if (outEvent) {
      setMainBarHeight(0);
      timer = setTimeout(() => {
        setTopBanner(false);
        if (hasMobile) topEl.classList.remove('active');
      }, 300);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [outEvent, mainBarHeight, topBanner]);

  useEffect(() => {
    console.log('베스트픽 360 large=%o', bestLargeList);
    if (!isEmpty(bestLargeList)) {
      setBestLargeInfo(bestLargeList[0]);
    } else {
      // if (isGetCarListStudio === false) dispatch(getCarListStudio()); //라이브스튜디오 차량 조회
    }
  }, [bestLargeInfo, bestLargeList]); //bestPick large 조회 결과

  useEffect(() => {
    const msg = (
      <>
        시스템 내부 점검 중입니다.
        <br />
        시간(금일18:00 ~ 익일 07:00)
      </>
    );
    // if (systemAlaram) showAlert(stringify.toString(msg));
    if (systemAlaram) showAlert(msg);
    console.log('라이브스튜디오 isGetCarListStudio=%o isGetCarListStudio=%o', isGetCarListStudio);

    dispatch(getCarListStudio()); //라이브스튜디오 차량 조회
  }, []); //라이브스튜디오

  useEffect(() => {
    //best pick 데이터 없으면 라이브스튜디오 데이터 조회
    let beginIndex = 0;
    console.log('라이브스튜디오[베스트픽] studioCarList 확인 studioCarList=%o', studioCarList);

    if (bestLargeList && bestLargeList.length === 0) {
      beginIndex = bestLargeList.length;
      if (studioCarList?.length > 0) {
        const row = { phtUrl: studioCarList[0].delePhtUrl, crNm: studioCarList[0].mnfcNm + ' ' + studioCarList[0].mdlNm + ' ' + studioCarList[0].clsNm, slAmt: studioCarList[0].slAmt };
        console.log('베스트픽 bestLargeList 없어 라이브스튜디오 데이터로 설정 377 large=%o', bestLargeList);
        setBestLargeInfo(row);
      }
    }
    console.log('베스트픽 부족한지 확인 bestSmallList=%o', bestSmallList);
    if (bestSmallList && bestSmallList.length < 4) {
      console.log('베스트픽 부족하면 라이브스튜디오 추가 bestSmallList.length =%o', bestSmallList?.length);
      const smallCnt = bestSmallList.length;
      let listTemp = [];
      for (let i = 0; i < bestSmallList.length; i++) {
        listTemp = listTemp.concat(bestSmallList[i]); //조회된 결과
      }
      const toIndex = 4 - smallCnt;
      if (studioCarList?.length > 0) {
        for (let i = 0; i < toIndex; i++) {
          const row = { phtUrl: studioCarList[i]?.delePhtUrl, crNm: studioCarList[i]?.mnfcNm + ' ' + studioCarList[i]?.mdlNm + ' ' + studioCarList[i]?.clsNm, slAmt: studioCarList[i]?.slAmt };
          listTemp = listTemp.concat(row);
        }
      }
      setBestSmallListTemp(listTemp);
    } else {
      console.log('베스트픽 충분 bestSmallList=%o', bestSmallList);
      setBestSmallListTemp(bestSmallList);
    }

    if (bestSmallList && bestSmallList.length < 5 && isGetCarListStudio === false) {
      //dispatch(getCarListStudio()); //라이브스튜디오 차량 조회
    }
  }, [bestLargeList, bestSmallList, isGetCarListStudio, studioCarList]); //라이브스튜디오 조회결과

  useEffect(() => {
    if (isStudioCarListQuery && isAuctionCarListQuery && isCertifiedMallProdListQuery) {
      let popular = [];
      popular = popular.concat({}); //타이틀
      popular = popular.concat(makeCategory(studioCarList)); //라이브스튜디오
      popular = popular.concat({}); //타이틀
      popular = popular.concat(makeCategory(auctionCarList)); //경매차량
      popular = popular.concat({}); //타이틀
      popular = popular.concat(makeCategory(popularCertifiedMallProdByCategoryList)); //인증몰
      setPopularProd(popular);
      console.log('카테고리 별 인기매물 popular=%o', popular);
    }
  }, [auctionCarList, isAuctionCarListQuery, isCertifiedMallProdListQuery, isStudioCarListQuery, popularCertifiedMallProdByCategoryList, studioCarList]);

  // 거주지역 시도 선택
  useEffect(() => {
    const { rgstRsdcAddrCd } = inputs;
    if (!isEmpty(rgstRsdcAddrCd)) {
      dispatch(getDetailLocationList(rgstRsdcAddrCd));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  // useEffect(() => {
  //   //프라이싱 조회 여부
  //   if (!isEmpty(todayPopCarInfo) && !isEmpty(todayPopCarInfo.carBaseInfo) && !isPricingSearch) {
  //     dispatch(fetchMarketPriceAction(todayPopCarInfo?.carBaseInfo, todayPopCarInfo?.carOption));
  //     setIsPricingSearch(true);
  //   }
  // }, [dispatch, isPricingSearch, todayPopCarInfo]);

  useEffect(() => {
    //메인배너 > 하단 띠배너
    if (!isEmpty(mainBannerInfoBelt)) {
      if (hasMobile) {
        setBeltImageUrl(process.env.IMGURL + mainBannerInfoBelt.mblFileUrl);
      } else {
        setBeltImageUrl(process.env.IMGURL + mainBannerInfoBelt.pcImgUrl);
      }
    }
  }, [mainBannerInfoBelt]);

  useEffect(() => {
    //오늘의 인기차량
    if (!isEmpty(todayPopCarInfo)) {
      console.log('오늘의 인기차량>todayPopCarInfo=%o', todayPopCarInfo);
      setPhtUrl(todayPopCarInfo?.carBaseInfo?.phtUrl);
      const param = { currentPrice: { price: todayPopCarInfo?.carBaseInfo.appPrice, marketMinPrice: todayPopCarInfo?.carBaseInfo.minPrice, marketMaxPrice: todayPopCarInfo?.carBaseInfo.maxPrice } }; //minPrice, appPrice, maxPrice
      setMarketPrice(param);
    }
  }, [todayPopCarInfo]);

  useEffect(() => {
    dispatch({ type: SECTION_MAIN });
    dispatch({ type: MOBILE_HEADER_TYPE_MAIN });

    if (hasMobile) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#f6f7f8'
        }
      });
    }

    dispatch(getTodayPopCarInfo()); //오늘의 인기차량 조회
    dispatch(getBestPickMainList()); //bestPick조회
    dispatch(getCarListStudio()); //인기매물(라이브스튜디오,경매차량)
    dispatch(getPopularByCategoryList()); //인기매물(인증몰)

    /* banGrpCd AM052 배너그룹,  0010:메인,0020:메인하위,0030:상세,0040:이벤트*/

    /* banGbnCd AM054 배너구분 0210:스프레드, 0220:띠배너, 0230:동영상*/
    /* banExpRangeList AM053 노출범위 0010:전체, 0020:PC, 0030:MOBILE*/
    const banExpRangeParam = hasMobile ? '0010,0030' : '0010,0020'; // (전체, MOBILE) or (전체, PC)
    dispatch(selectMainBannerInfo({ banGrpCd: '0020', banGbnCd: '0210', banExpRange: banExpRangeParam })); //스프레드 배너 (상단)
    dispatch(selectMainBannerInfo({ banGrpCd: '0020', banGbnCd: '0220', banExpRange: banExpRangeParam })); //띠배너 (하단 동영상 아래)
    dispatch(selectMainBannerInfo({ banGrpCd: '0020', banGbnCd: '0230', banExpRange: '0010,0020' })); //동영상 (유튜브)
    dispatch(getSuggestWordList()); //내차사기>자동완성 미리 조회

    // 약관 조회
    selectSellcarTerms({ tmsTp: '0500', tmsDiv: '0510' })
      .then((res) => {
        const { data: _terms } = res.data;
        setTerms(_terms ? _terms : {});
      })
      .catch((err) => console.error(err));

    selectSellcarTerms({ tmsTp: '0800', tmsDiv: '0820', tmsSbj: '0010' })
      .then((res) => {
        const { data: _terms } = res.data;
        setPrivacyTerms(_terms ? _terms : {});
      })
      .catch((err) => console.error(err));

    //거주지역 시도 초기화
    if (isEmpty(locationList)) {
      dispatch(getLocationList());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //상단(스프레드)배너
    if (!isEmpty(mainBannerInfoSpread)) {
      console.log('상단(스프레드)배너 >mainBannerInfoSpread=%o', mainBannerInfoSpread);
      setTopBanner(true);
    } else {
      setTopBanner(false);
    }
  }, [mainBannerInfoSpread]);

  const [inputCarNumber, setInputCarNumber] = useState(false);
  const onChangeInputCarNumber = useCallback(() => {
    setInputCarNumber((prev) => !prev);
  }, []);

  if (hasMobile) {
    const topAreaPortal = useCreatePortalInBody(null, 'top-area');

    return (
      <>
        {topBanner &&
          topAreaPortal(
            <div className={mainBarWrap}>
              <div className="main-bar">
                {isEmpty(mainBannerInfoSpread?.pcLinkAddr) ? (
                  <img src={`https://static.glovis.net/picture/banner/3ee31cd1322147e09388e4d7bdfdd533`} alt={mainBannerInfoSpread?.banTtl} />
                ) : (
                  <a href={mainBannerInfoSpread?.pcLinkAddr} target={mainBannerInfoSpread?.pcNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                    <img src={`${imgUrl}${mainBannerInfoSpread?.pcImgUrl}`} alt={mainBannerInfoSpread?.banTtl} />
                  </a>
                )}
                <a href="#" className="close" onClick={topBannerClose}></a>
              </div>
            </div>
          )}
        <AppLayout>
          <div className="main-visual">
            {mainVisual === 0 && (
              <div className="mv-item buy">
                <div className="mvi-cont">
                  <h3>
                    Live로 확인하는 <strong>내 차 사기!</strong>
                  </h3>
                  <p className="intro">내·외부 360° VR로 보는 실매물</p>
                </div>
              </div>
            )}
            {mainVisual === 1 && (
              <div className="mv-item sell">
                <div className="mvi-cont">
                  <h3>
                    Autobell에 다 있는 <strong>내 차 팔기!</strong>
                  </h3>
                  <p className="intro">나에게 맞춘 중고차 판매 방법</p>
                </div>
              </div>
            )}
            {mainVisual === 2 && (
              <div className="mv-item price">
                <div className="mvi-cont">
                  <h3>
                    Big Data 분석 기반 <strong>시세 조회!</strong>
                  </h3>
                  <p className="intro">실제 경매장 낙찰 가격 기반 진짜 시세</p>
                </div>
              </div>
            )}
            <div className="pdside20">
              <div className="indicator-wrap">
                <ul className="indicator">
                  <li className="buy">
                    <span onClick={(e) => visualChange(e, 0)} className={mainVisual === 0 ? 'on' : ''}>
                      <strong>Buy</strong>
                      <span>내차사기</span>
                    </span>
                  </li>
                  <li className="sell">
                    <span onClick={(e) => visualChange(e, 1)} className={mainVisual === 1 ? 'on' : ''}>
                      <strong>Sell</strong>
                      <span>내차팔기</span>
                    </span>
                  </li>
                  <li className="price">
                    <span onClick={(e) => visualChange(e, 2)} className={mainVisual === 2 ? 'on' : ''}>
                      <strong>Price</strong>
                      <span>내차시세</span>
                    </span>
                  </li>
                </ul>
                {mainVisual === 0 && (
                  <fieldset>
                    <legend className="away">Smart Finder</legend>
                    <SearchArea section="main" wrapperClass="search_field" onChange={handleSmartFinder} />
                  </fieldset>
                )}
                {mainVisual === 1 && (
                  <>
                    <fieldset>
                      <legend className="away">내 정보입력</legend>
                      <div className="search_field v-2">
                        <Input type="text" id="mv-sell-username" placeHolder="이름" height={40} isSelf={true} value={userName} onBlur={(e) => onChangeValue(e, 'userName')} />
                        <Input
                          type="tel"
                          id="mv-sell-phone"
                          placeHolder="휴대폰번호(-제외)"
                          height={40}
                          marginTop={8}
                          isSelf={true}
                          numberOnly={true}
                          maxLength={11}
                          value={hpPn01}
                          onBlur={(e) => onChangeValue(e, 'hpPn01')}
                        />
                        <div className="halfselec-wrap mt8">
                          <span className="halfselect">
                            <MobSelectList
                              itemsSource={locationList}
                              selectedItem={(locationList || []).find((x) => x.value === (inputs || {}).rgstRsdcAddrCd)}
                              displayMemberPath={'label'}
                              selectedValuePath={'value'}
                              placeHolder={'시/도 선택'}
                              onClick={handleLocationChange}
                            />
                          </span>
                          <span className="halfselect">
                            <MobSelectList
                              itemsSource={detailLocationList}
                              selectedItem={(detailLocationList || []).find((x) => x.value === (inputs || {}).rgstRsdcDtlAddrCd)}
                              displayMemberPath={'label'}
                              selectedValuePath={'value'}
                              placeHolder="시/군/구 선택"
                              onClick={handleLocation2Change}
                            />
                          </span>
                        </div>
                      </div>
                    </fieldset>
                    <Button size="full" background="red40" title="내차팔기 신청" height={48} onClick={onSubmitHandler} />
                  </>
                )}
                {mainVisual === 2 && (
                  <fieldset>
                    <legend className="away">차량번호 입력</legend>
                    <div className="search_field v-3">
                      <Input
                        type="text"
                        id="mv-car-number"
                        placeHolder="차량번호를 입력하세요."
                        isSelf={false}
                        value={crNo}
                        onKeyPress={(e) => handleKeyPress(e)}
                        onChange={(e) => setCrNo(e.target.value)}
                      />
                      <Button size="big" title="Search" className="mv-btn search" buttonMarkup={true} onClick={handleClickCarNum} />
                    </div>
                  </fieldset>
                )}
              </div>
            </div>
          </div>

          <div className="content-wrap main-best-sec mt0">
            <h3>
              Today&apos;s <b>Best Pick</b>
            </h3>
            <p>오토벨이 엄선한 오늘의 매물</p>
            <div className="best-pick-wrap pdside20">
              <ul className="best-pick-01">
                <SlideBanner car_list={bestSmallListTemp} touch={true} infinite={false} autoplay={false} slideType="banner-single">
                  {(bestSmallListTemp || []).map((item, idx) => {
                    return (
                      <BannerItem isMarkup={true} key={idx}>
                        <div className="car-img" onClick={(e) => moveBuyCarDetailPage(e, item)}>
                          <img src={`${imgUrl}${item.phtUrl}`} alt="" />
                        </div>
                        <div className="info" onClick={(e) => moveBuyCarDetailPage(e, item)}>
                          <p className="name">{item.crNm || ''}</p>
                          <p className="price-tp5">
                            {setComma(item.slAmt)}
                            <span className="won">만원</span>
                          </p>
                        </div>
                      </BannerItem>
                    );
                  })}
                </SlideBanner>
              </ul>
            </div>
          </div>
          {/* <div className="content-sec mt10">
            <div className="content-wrap main-popular-sec">
              <h3>
                오토벨 <b>인기차량 모아보기</b>
              </h3>
              <div className="list-slick">
                <ul className="goods-list">
                  <li>
                    <div className="car-img">
                      <img src="https://static.glovis.net/picture/public/images/mobile/dummy/live-studio-car.png" alt="" />
                      <i className="ico-touch" />
                    </div>
                    <div className="info">
                      <p className="name">오토벨 라이브스튜디오 차량</p>
                      <p className="info-txt">
                        오토벨에서 직접 진단한
                        <br />
                        무사고/무결점 차량
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="content-wrap main-sell-sec">
            <h3>
              오토벨에서
              <br /> <b>내 차를 파는 3가지 방법</b>
            </h3>
            <p>나에게 맞는 판매 방법을 선택하세요!</p>
            <ul className="sell-ico-wrap2 mt24">
              <SlideBanner car_list={mCarList} touch={true} infinite={true} dots={true} autoplay={false} slideType="banner-single">
                <BannerItem isMarkup={true}>
                  <i className="sell-service-img-01">
                    <img src="https://static.glovis.net/picture/public/images/mobile/contents/visit-service-img-01.png" alt="방문평가 이미지" />
                  </i>
                  <p className="exp">
                    어렵고 복잡하신가요?
                    <br />
                    간편하게 전문가에게 맡기는
                  </p>
                  <p className="tit">
                    <Link href="/sellcar/visit/visitValuationRequest">
                      <a>방문평가판매</a>
                    </Link>
                  </p>
                </BannerItem>
                <BannerItem isMarkup={true}>
                  <i className="sell-service-img-02">
                    <img src="https://static.glovis.net/picture/public/images/mobile/contents/sell-service-img-01.png" alt="셀프등록판매 이미지" />
                  </i>
                  <p className="exp">
                    최고가로 팔고 싶다면?
                    <br />
                    내가 직접 올리고 견적도 선택하는
                  </p>
                  <p className="tit">
                    <Link href="/sellcar/self/selfSellCarGuide">
                      <a>비교견적판매</a>
                    </Link>
                  </p>
                </BannerItem>
                <BannerItem isMarkup={true}>
                  <i className="sell-service-img-03">
                    <img src="https://static.glovis.net/picture/public/images/mobile/contents/none-service-img-03.png" alt="무평가판매 이미지" />
                  </i>
                  <p className="exp">
                    내 차 상태 자신있는데?
                    <br />
                    복잡한 과정없이 비대면으로 판매하는
                  </p>
                  <p className="tit">
                    <Link href="/sellcar/nonValue/noneValuationGuide">
                      <a>무평가판매</a>
                    </Link>
                  </p>
                </BannerItem>
              </SlideBanner>
            </ul>
          </div>
          <div className="content-sec mt10">
            <div className="content-wrap main-price-sec">
              <h3>
                Today’s <b>Market Price</b>
              </h3>
              <p>오토벨이 분석한 오늘의 실시간 시세</p>
              <ul className="today-price">
                <li className="price-car">
                  <div className="price-car-img">
                    <img src={phtUrl} alt={todayPopCarInfo?.carBaseInfo?.crNm} />
                  </div>
                  <div className="pdside20">
                    <p className="price-car-name">{todayPopCarInfo?.carBaseInfo?.crNm}</p>
                    <ul className="price-car-state">
                      <li>{todayPopCarInfo?.carBaseInfo?.frmYyyy}년</li>
                      <li>{todayPopCarInfo?.carBaseInfo?.fuelNm}</li>
                      <li>{setComma(todayPopCarInfo?.carBaseInfo?.crRlsPrc)} 만원</li>
                      <li>{setComma(todayPopCarInfo?.carBaseInfo?.drvDist)}km</li>
                    </ul>
                  </div>
                </li>
                <li className="price-graph">
                  <div className="price-graph-in" style={{ height: 370 }}>
                    {marketPrice ? <PriceChart containerClassName={'report-price'} marketPrice={marketPrice} hasMobile={true} /> : ''}
                    <Button size="full" background="blue20" color="blue80" radius={true} title="시세정보 더 확인하기" height={56} href="/marketPrice/marketprice" nextLink={true} />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {!isEmpty(mainBannerInfoBelt) ? (
            <div className="content-sec main-banner-wrap">
              <div className="main-banner">
                <a href={mainBannerInfoBelt?.mblLinkAddr} target={mainBannerInfoBelt?.mblNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                  <img src={beltImageUrl} alt={mainBannerInfoBelt?.mblAlt} />
                </a>
              </div>
            </div>
          ) : (
            ''
          )}

          <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleApplyConfirmToggle} />
          <MobBottomArea isFixButton={true} active={applyConfirm} zid={102}>
            <div className="inner bottom-write-area">
              <p className="tit1">
                입력하신 내용으로
                <br />
                방문평가 판매를 신청하시겠습니까?
              </p>
              <table className="table-tp1" summary="방문평가 판매 신청에 대한 내용">
                <caption className="away">방문평가 판매 신청</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="67%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>{userName}</td>
                  </tr>
                  <tr>
                    <th>휴대전화번호</th>
                    <td>{hpPn01}</td>
                  </tr>
                  <tr>
                    <th>거주지역</th>
                    <td>
                      {rgstRsdcAddrNm} {rgstRsdcDtlAddrNm}
                    </td>
                  </tr>
                  <tr>
                    <th>차량번호</th>
                    <td>
                      <Input id="sellCarNo" type="text" value={sellCarNo} onChange={onChangeSellCarNo} disabled={inputCarNumber} />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mp-chk-sec" style={{ textAlign: 'right', marginTop: '5px' }}>
                <CheckBox id="chk-car-number" title="차량번호 불명" isSelf={false} checked={inputCarNumber} onChange={onChangeInputCarNumber} />
              </div>

              <div className="mt16 terms-check">
                <CheckBox
                  id="chk-useGuide"
                  title="방문평가 이용약관 (필수)"
                  termPop={true}
                  isSelf={false}
                  checked={visitTermAgree}
                  onChange={handleTermToggle}
                  termPopHandle={handleVisitEvalPopUpToggle}
                />
              </div>

              <div className="mt16 terms-check">
                <CheckBox
                  id="chk-collect-2"
                  title="개인정보처리방침 (필수)"
                  termPop={true}
                  isSelf={false}
                  checked={privacyTermAgree}
                  onChange={handlePrivacyToggle}
                  termPopHandle={handlePrivacyEvalPopUpToggle}
                />
              </div>
            </div>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleApplyConfirmToggle} />
              <Button size="big" background="blue80" title="확인" onClick={onConfirmHandler} />
            </Buttons>
          </MobBottomArea>

          <MobFullpagePopup active={mFullpagePopup} onClose={handleTermsClose}>
            {isVisitEvalTermPopUp && (
              <div className="member-terms-wrap">
                <div className="view-wrap" dangerouslySetInnerHTML={{ __html: terms.tmsCntn }} />
              </div>
            )}
            {isPrivacyEvalTermPopUp && (
              <div className="member-terms-wrap">
                <div className="view-wrap" dangerouslySetInnerHTML={{ __html: privacyTerms.tmsCntn }} />
              </div>
            )}
          </MobFullpagePopup>
        </AppLayout>
      </>
    );
  }
  //모바일 끝

  //PC 시작
  return (
    <>
      {topBanner && !isEmpty(mainBannerInfoSpread) && (
        <div className={mainBarWrap} style={{ backgroundColor: mainBannerInfoSpread?.bgColor }}>
          <div className="main-bar">
            {isEmpty(mainBannerInfoSpread?.pcLinkAddr) ? (
              <img src={`${imgUrl}${mainBannerInfoSpread?.pcImgUrl}`} alt={mainBannerInfoSpread?.banTtl} />
            ) : (
              <a href={mainBannerInfoSpread?.pcLinkAddr} target={mainBannerInfoSpread?.pcNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={`${imgUrl}${mainBannerInfoSpread?.pcImgUrl}`} alt={mainBannerInfoSpread?.banTtl} />
              </a>
            )}
          </div>
          <a href="#" className="close" onClick={topBannerClose}></a>
        </div>
      )}
      <AppLayout>
        <div className="main-visual">
          {mainVisual === 0 && (
            <div className="mv-item buy" style={{ backgroundImage: 'url(https://static.glovis.net/picture/public/images/contents/bg-mv-buy.jpg)' }}>
              <div className="mvi-cont">
                <h3>
                  Live로 확인하는 <strong>내 차 사기!</strong>
                </h3>
                <p className="intro">내·외부 360° VR로 보는 실매물</p>
                <fieldset>
                  <legend className="away">Smart Finder</legend>
                  <SearchArea section="main" wrapperClass="search_field" onChange={handleSmartFinder} />
                </fieldset>
              </div>
            </div>
          )}
          {mainVisual === 1 && (
            <div className="mv-item sell" style={{ backgroundImage: 'url(https://static.glovis.net/picture/public/images/contents/bg-mv-sell.jpg)' }}>
              <div className="mvi-cont">
                <h3>
                  Autobell에 다 있는 <strong>내 차 팔기!</strong>
                </h3>
                <p className="intro">나에게 맞춘 중고차 판매 방법</p>
                <fieldset>
                  <legend className="away">내 정보입력</legend>
                  <div className="search_field">
                    <Input type="text" value={userName} id="userName" onBlur={(e) => onChangeValue(e, 'userName')} placeHolder="이름" maxLength={10} width={255} height={44} />

                    <Input
                      type="text"
                      id="mv-sell-phone"
                      name="hpPn01"
                      value={hpPn01}
                      numberOnly={true}
                      // patternString={'^[0-9 -]+$'}
                      onBlur={(e) => onChangeValue(e, 'hpPn01')}
                      placeHolder="휴대폰번호(-제외)"
                      maxLength={11}
                      width={255}
                      height={44}
                    />
                    <SelectBox
                      id="mv-sell-address1"
                      name="RgstRsdcAddrNm"
                      className="items-sbox"
                      options={locationList}
                      onChange={(e) => onChangeSelect(e, 'RgstRsdcAddrNm')}
                      placeHolder="시/도 선택"
                      width={255}
                      height={44}
                    />
                    {console.log('rgstRsdcDtlAddrCd=%o, detailLocationList=%o', rgstRsdcDtlAddrCd, detailLocationList)}
                    <SelectBox
                      id="mv-sell-address2"
                      name="RgstRsdcDtlAddrNm"
                      className="items-sbox"
                      options={detailLocationList?.concat({ value: '', label: '시군구 선택' })}
                      onChange={(e) => onChangeSelect(e, 'RgstRsdcDtlAddrNm')}
                      placeHolder="시군구 선택"
                      value={rgstRsdcDtlAddrCd}
                      width={255}
                      height={44}
                    />
                    <Button size="big" title="내차팔기 신청" className="mv-btn" onClick={onSubmitHandler} />
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          {mainVisual === 2 && (
            <div className="mv-item price" style={{ backgroundImage: 'url(https://static.glovis.net/picture/public/images/contents/bg-mv-price.jpg)' }}>
              <div className="mvi-cont">
                <h3>
                  Big Data 분석 기반 <strong>시세 조회!</strong>
                </h3>
                <p className="intro">실제 경매장 낙찰 가격 기반 진짜 시세</p>
                <fieldset>
                  <legend className="away">차량번호 입력</legend>
                  <div className="search_field">
                    <Input
                      type="text"
                      value={crNo}
                      onKeyPress={(e) => handleKeyPress(e)}
                      onChange={(e) => setCrNo(e.target.value)}
                      id="mv-car-number"
                      placeHolder="차량번호를 입력하세요."
                      width={414}
                      height={44}
                    />
                    <Button size="big" title="Search" className="mv-btn search" onClick={(e) => onMarketPrice(e)} />
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          <ul className="indicator">
            <li className="buy">
              <span onClick={(e) => visualChange(e, 0)} className={mainVisual === 0 ? 'on' : ''}>
                <strong>Buy</strong>
                <span>내차사기</span>
              </span>
            </li>
            <li className="sell">
              <span onClick={(e) => visualChange(e, 1)} className={mainVisual === 1 ? 'on' : ''}>
                <strong>Sell</strong>
                <span>내차팔기</span>
              </span>
            </li>
            <li className="price">
              <span onClick={(e) => visualChange(e, 2)} className={mainVisual === 2 ? 'on' : ''}>
                <strong>Price</strong>
                <span>내차시세</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="content-wrap main-best-sec">
          <h3>
            Today&apos;s <b>Best Pick</b>
          </h3>
          <p>오토벨이 엄선한 오늘의 매물</p>
          <div className="best-pick-wrap">
            <ul className="best-pick-01">
              <li onClick={(e) => moveBuyCarDetailPage(e, bestLargeInfo)}>
                <img src={`${imgUrl}${bestLargeInfo?.phtUrl}`} alt="" />
                <div className="info">
                  <p className="name">{bestLargeInfo?.crNm}</p>
                  <p className="price-tp5">
                    {setComma(bestLargeInfo?.slAmt)}
                    <span className="won">만원</span>
                  </p>
                </div>
              </li>
              <li className="info">
                <p className="name">{bestSmallListTemp && bestSmallListTemp.length > 0 && bestSmallListTemp[0].crNm}</p>
                <p className="price-tp5">
                  {setComma(bestSmallListTemp && bestSmallListTemp.length > 0 && bestSmallListTemp[0].slAmt)}
                  <span className="won">만원</span>
                </p>
              </li>
              <li onClick={(e) => moveBuyCarDetailPage(e, bestSmallListTemp.length > 0 && bestSmallListTemp[0])}>
                <img src={bestSmallListTemp && bestSmallListTemp.length > 0 ? imgUrl + bestSmallListTemp[0].phtUrl : ''} alt="" />
              </li>
            </ul>
            <ul className="best-pick-02">
              <li className="info">
                <p className="name">{bestSmallListTemp && bestSmallListTemp.length > 1 && bestSmallListTemp[1].crNm}</p>
                <p className="price-tp5">
                  {setComma(bestSmallListTemp && bestSmallListTemp.length > 1 ? bestSmallListTemp[1].slAmt : '')}
                  <span className="won">만원</span>
                </p>
              </li>
              <li onClick={(e) => moveBuyCarDetailPage(e, bestSmallListTemp && bestSmallListTemp.length > 1 && bestSmallListTemp[1])}>
                <img src={imgUrl + bestSmallListTemp?.[1]?.phtUrl} alt="" />
              </li>
              <li onClick={(e) => moveBuyCarDetailPage(e, bestSmallListTemp && bestSmallListTemp.length > 2 && bestSmallListTemp[2])}>
                <img src={bestSmallListTemp && bestSmallListTemp.length > 2 ? imgUrl + bestSmallListTemp[2].phtUrl : ''} alt="" />
              </li>
              <li className="info">
                <p className="name">{bestSmallListTemp && bestSmallListTemp.length > 2 && bestSmallListTemp[2].crNm}</p>
                <p className="price-tp5">
                  {setComma(bestSmallListTemp && bestSmallListTemp.length > 2 ? bestSmallListTemp[2].slAmt : '')}
                  <span className="won">만원</span>
                </p>
              </li>
              <li className="info">
                <p className="name">{bestSmallListTemp && bestSmallListTemp.length > 3 && bestSmallListTemp[3].crNm}</p>
                <p className="price-tp5">
                  {setComma(bestSmallListTemp && bestSmallListTemp.length > 3 ? bestSmallListTemp[3].slAmt : '')}
                  <span className="won">만원</span>
                </p>
              </li>
              <li onClick={(e) => moveBuyCarDetailPage(e, bestSmallListTemp && bestSmallListTemp.length > 3 && bestSmallListTemp[3])}>
                <img src={bestSmallListTemp && bestSmallListTemp.length > 3 ? imgUrl + bestSmallListTemp[3].phtUrl : ''} alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="content-sec">
          <div className="content-wrap main-popular-sec">
            <h3>
              카테고리별 <b>인기 매물</b>
            </h3>
            <div className="list-slick">
              <ul className="goods-list">
                {!isEmpty(popularProd) ? (
                  <SlideBanner carList={popularProd} touch={true} dots={true} autoplay={true} customArrow={true} hasMarkup={[0, 4, 8]}>
                    <BannerItem isMarkup={true}>
                      <div className="main-advertise">
                        <p className="ad-tit">오토벨 LIVE STUDIO</p>
                        <p className="ad-exp">
                          오토벨 전문가가
                          <br />
                          직접 진단하고 100% 책임지는
                          <br />
                          신뢰도 높은 차량들입니다.
                        </p>
                        <div className="ad-photo" style={{ right: '0px' }}>
                          <img src="https://static.glovis.net/picture/public/images/contents/photo-main-popular1.png" alt="" />
                        </div>
                      </div>
                    </BannerItem>
                    <BannerItem isMarkup={true}>
                      <div className="main-advertise">
                        <p className="ad-tit">스마트옥션 인증 차량</p>
                        <p className="ad-exp">
                          전국 오토벨 경매장에서
                          <br />
                          인증한 실매물만 모았습니다.
                        </p>
                        <div className="ad-photo">
                          <img src="https://static.glovis.net/picture/public/images/contents/photo-main-popular2.png" alt="" />
                        </div>
                      </div>
                    </BannerItem>
                    <BannerItem isMarkup={true}>
                      <div className="main-advertise">
                        <p className="ad-tit">제휴사 인증 차량</p>
                        <p className="ad-exp">
                          오토벨과 함께하는 제휴사에서 <br />
                          인증하고 판매하는 차량입니다.
                        </p>
                        <div className="ad-photo">
                          <img src="https://static.glovis.net/picture/public/images/contents/photo-main-popular3.png" alt="" />
                        </div>
                      </div>
                    </BannerItem>
                  </SlideBanner>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="content-wrap main-sell-sec">
          <h3>
            오토벨에서 <b>내 차를 파는 </b>
            <em>3가지 방법</em>
          </h3>
          <p>나에게 맞는 판매 방법을 선택하세요!</p>
          <ul className="sell-ico-wrap">
            <li>
              <Link href="/sellcar/visit/visitValuationRequest">
                <a>
                  <i className="sell-service-img-01"></i>
                  <p className="exp">
                    어렵고 복잡하신가요?
                    <br />
                    간편하게 전문가에게 맡기는
                  </p>
                  <p className="tit">방문평가판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sellcar/self/selfSellCarGuide">
                <a>
                  <i className="sell-service-img-02"></i>
                  <p className="exp">
                    최고가로 팔고 싶다면?
                    <br />
                    내가 직접 올리고 견적도 선택하는
                  </p>
                  <p className="tit">비교견적판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sellcar/nonValue/noneValuationGuide">
                <a>
                  <i className="sell-service-img-03"></i>
                  <p className="exp">
                    내 차 상태 자신있는데?
                    <br />
                    복잡한 과정없이 비대면으로 판매하는
                  </p>
                  <p className="tit">무평가판매</p>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="content-sec">
          <div className="content-wrap main-price-sec">
            <h3>
              Today’s <b>Market Price</b>
            </h3>
            <p>오토벨이 분석한 오늘의 실시간 시세</p>
            <ul className="today-price">
              <li className="price-car">
                <p className="price-car-name">{todayPopCarInfo?.carBaseInfo?.crNm}</p>
                <div className="price-car-img">
                  <img src={phtUrl} alt={todayPopCarInfo?.carBaseInfo?.crNm} />
                </div>
                <ul className="price-car-state">
                  <li>
                    <p>연식</p>
                    {todayPopCarInfo?.carBaseInfo?.frmYyyy}
                    <span className="ko">년</span>
                  </li>
                  <li>
                    <p>연료</p>
                    {todayPopCarInfo?.carBaseInfo?.fuelNm}
                  </li>
                  <li>
                    <p>신차가</p>
                    {setComma(todayPopCarInfo?.carBaseInfo?.crRlsPrc)} <span className="ko">만원</span>
                  </li>
                  <li>
                    <p>주행거리</p>
                    {setComma(todayPopCarInfo?.carBaseInfo?.drvDist)} <span className="en">km</span>
                  </li>
                </ul>
              </li>
              <li className="price-graph">
                {marketPrice ? <PriceChart containerClassName={'report-price'} marketPrice={marketPrice} /> : ''}
                <Button size="big" background="white" color="black" title="시세정보 더 확인하기" width={200} fontSize={19} href="/marketPrice/marketprice" nextLink={true} />
              </li>
            </ul>
          </div>
        </div>
        <div className="content-wrap main-video-sec">
          <div className="video">
            <div className="player-wrapper">
              <ReactPlayer className="react-player" url={mainBannerInfoMovie?.pcLinkAddr} playing={true} loop={false} controls={true} muted={true} width={'100%'} height={'100%'} />
            </div>
          </div>
        </div>

        {!isEmpty(mainBannerInfoBelt) ? (
          <div className="content-sec main-banner-wrap" style={{ backgroundColor: mainBannerInfoBelt?.bgColor }}>
            <div className="main-banner">
              <a href={mainBannerInfoBelt?.pcLinkAddr} target={mainBannerInfoBelt?.pcNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={beltImageUrl} alt={mainBannerInfoBelt?.pcAlt} />
              </a>
            </div>
          </div>
        ) : (
          ''
        )}

        {/* #a 내차팔기신청 팝업추가 PC화면 start */}
        <RodalPopup show={applyConfirm} type={'fade'} closedHandler={handleApplyConfirmClose} mode="normal" size="xs">
          <div className="con-wrap">
            <p className="mb33">입력하신 내용으로 방문평가 판매를 신청하시겠습니까?</p>
            <table summary="방문평가 신청에 대한 내용" className="table-tp1">
              <caption className="away">방문평가</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <th>휴대전화번호</th>
                  <td>{`${hpPn01.substring(0, 3)}-${hpPn01.substring(3, 7)}-${hpPn01.substring(7, 11)}`}</td>
                </tr>
                <tr>
                  <th>거주지역</th>
                  <td>
                    {rgstRsdcAddrNm} {rgstRsdcDtlAddrNm}
                  </td>
                </tr>
                <tr>
                  <th>차량번호</th>
                  <td>
                    <Input id="sellCarNo" type="text" value={sellCarNo} onChange={onChangeSellCarNo} disabled={inputCarNumber} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mp-chk-sec">
              <CheckBox id="chk-car-number" title="차량번호 불명" isSelf={false} checked={inputCarNumber} onChange={onChangeInputCarNumber} />
            </div>

            <div className="mp-terms-sec">
              <ul>
                <li>
                  <CheckBox id="chk-collect-1" title="방문평가 이용약관" sub="(필수)" isSelf={false} checked={visitTermAgree} onChange={handleTermToggle} />
                </li>
                <li>
                  <CheckBox id="chk-collect-2" title="개인정보처리방침" sub="(필수)" isSelf={false} checked={privacyTermAgree} onChange={handlePrivacyToggle} />
                </li>
              </ul>
            </div>

            <Buttons align="center" marginTop={40}>
              <Button size="big" background="gray" title="취소" width={130} onClick={handleApplyConfirmToggle} />
              <Button size="big" background="blue80" title="확인" width={130} onClick={onConfirmHandler} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={isVisitEvalTermPopUp} type={'fade'} closedHandler={handleVisitEvalPopUpToggle} title="방문평가 이용약관(필수)" mode="normal" size="medium">
          <div className="con-wrap" dangerouslySetInnerHTML={{ __html: terms.tmsCntn }} />
        </RodalPopup>

        <RodalPopup show={isPrivacyEvalTermPopUp} type={'fade'} closedHandler={handlePrivacyEvalPopUpToggle} title="개인정보처리방침(필수)" mode="normal" size="medium">
          <div className="con-wrap" dangerouslySetInnerHTML={{ __html: privacyTerms.tmsCntn }} />
        </RodalPopup>
      </AppLayout>
    </>
  );
});

Main.displayName = 'Main';
export default Main;
