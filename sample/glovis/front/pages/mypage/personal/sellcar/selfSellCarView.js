/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/**
 * 회원 마이페이지 내차팔기 신청정보 디테일
 * @fileOverview 회원 마이페이지 내차팔기 신청정보 디테일
 * @requires VisitDetail
 * @requires SelfDetail
 * @requires NonevalDetail
 * @Author 김민철
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Slider from 'react-slick';
import Router, { useRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import SelfDetail from '@src/components/mypage/sellcar/SelfDetail';
import BidderInfo from '@src/components/common/popup/BidderInfo';
import CarAddOption from '@src/components/common/CarAddOption';
import CarImageUpload from '@src/components/common/CarImageUpload';
import CarPictureApply from '@src/components/common/CarPictureApply';
import CarOptions from '@src/components/common/CarOptions';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import StarScore from '@lib/share/items/StarScore';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import ImgCover from '@lib/share/items/ImgCover';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { getReqAction, updateReqSttTpcd } from '@src/actions/sellcar/sellCarAction';
import { selfCancelAction, updateBiddChoiceAction, updateRestartAction, addReviewAction } from '@src/actions/sellcar/SelfSellCarAction';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

//24시간 입찰에서 사용할 selectBiddStatus
import { selectSellcarAction, selectBiddStatusByAuctIdAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';

// 정보출력을 위해 가져온 데이터들
import { setComma, getLabelFromArray } from '@src/utils/StringUtil';
import { selectCarColorList, selectFuelTypeList, selectAllCarTypeList, selectCarUsagesList, selectFrmYyyyList } from '@src/api/common/CarInfoApi';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { carFrmYyyyList, carFuelList, carUseDvcdList } from '@src/constant/carTypeCd';
import { CMCDTPID } from '@src/constant/cdMstLib';
import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';

//신청취소 팝업에서 사용할 것들.
import { SystemContext } from '@src/provider/SystemProvider';
import { REQ_TPCD, REQ_TPCD_NM, REQ_STT } from '@src/constant/mbSlReqStt';

//판매취소 팝업에서 사용할 것들
import { updateForSaleCancel } from '@src/api/sellcar/SelfSellcarApi';

//24시간 비교견적에서 사용할것들
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
// import { progressState } from '@src/utils/sellcar/CmprEstmUtil';

//딜러검색
import { selectDealerDetail, selectBiddDealerList, selectSellcar } from '@src/api/sellcar/AllSellcarSearchApi';
import SlideBanner from '@src/components/common/banner/SlideBanner';

import * as saleCarUtil from '@src/utils/sellcar/SaleCarUtil';
import { getLimitTime, getTimeData } from '@src/utils/sellcar/CmprEstmUtil';
import CarOptionsEditor from '../../../../src/components/sellcar/self/CarOptionsEditor';
import { preventScroll } from '@src/utils/CommonUtil';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';
import { isLogin, gInfoLive, UserType } from '@src/utils/LoginUtils';

/**
 * 마이페이지 내차팔기 신청정보 디테일
 * @param {Object} props
 * @param {Object} props - props object
 * @param {String} props.slReqId - 판매 신청서 아이디
 * @returns {SellCarView}
 */

const SelfSellCarView = ({ slReqId, reqTpcd }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, [dispatch]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  // 팝업
  //입찰결과 핸들러
  const [rodalBiddResult, setRodalBiddResult, biddBiddResultHandler, biddBiddResultCloseHandler] = useRodal(false, true);
  //입찰현황 핸들러
  const [biddingShow, setBiddingShow, biddingPopupHandler, biddingCloseHandler] = useRodal(false, true);
  //입찰자 정보 핸들러 (딜러)
  const [bidderInfoShow, setBiddersInfoShow, bidderInfoPopupHandler, bidderInfoCloseHandler] = useRodal(false, true);
  //결제 진행 핸들러
  const [proceedShow, setProceedShow, proceedPopupHandler, proceedCloseHandler] = useRodal(false, true);
  const [proceedShow2, setProceedShow2, proceedPopupHandler2, proceedCloseHandler2] = useRodal(false, true);
  //취소신청 완료 핸들러
  const [cancelChkShow, setCancelChkShow, cancelChkPopupHandler, cancelChkCloseHandler] = useRodal(false, true);
  //취소확인 핸들러
  const [cancelShow2, setCancelShow2, cancelPopupHandler2, cancelCloseHandler2] = useRodal(false, true);
  //재등록 핸들러
  const [againShow, setAgainlChkShow, againPopupHandler, againCloseHandler] = useRodal(false, true);
  const [againShow2, setAgainlChkShow2, againPopupHandler2, againCloseHandler2] = useRodal(false, true);
  //딜러 후기 핸들러
  const [bidderInfoShow2, setBiddersInfoShow2, bidderInfoPopupHandler2, bidderInfoCloseHandler2] = useRodal(false, true);
  //리뷰등록 핸들러
  const [reviewWriteShow, seteviewWriteShow, reviewWritePopupHandler, reviewWriteCloseHandler] = useRodal(false, true);
  //딜러 정보
  const [dealer, setDealer] = useState({});
  const [biddList, setBiddList] = useState([]);

  //입찰자 라디오 선택
  const [selectedBiddId, setSelectedBiddId] = useState(1);

  // 팝업의 라디오 버튼(안쓰는듯)
  // const [isValue, setIsValue] = useState(1);
  // const handleChange = useCallback((e) => {
  //   e.preventDefault();
  //   setIsValue(Number(e.target.value));
  // }, []);

  //모바일 감지
  if (hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '셀프평가 신청 내역',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#fff'
        }
      });
    }, [dispatch]);

    //뿌려줄 차량 정보의 데이터를 가져옴
    const { seller, car, cmprEstm } = useSelector((state) => state.sellCarStore, []);
    const [carColors, setCarColors] = useState([]);
    const [callReq, setCallReq] = useState(false);
    const [isValue, setIsValue] = useState(false);

    const setCommaCallback = useCallback(setComma, [car?.drvDist]);

    const [state, setState] = useState(saleCarUtil.defaultState);

    //차량의 기본정보에 뿌려줄정보들의 타입데이터
    const [carTypes, setCarTypes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [carMssList, setCarMssList] = useState([]);

    //carBasicInfoEditor에서 가져옴
    const parseResults = (result) => {
      const { data } = result?.data;
      if (data?.every((res) => !!res)) {
        return data?.map(({ id, name, bsno }) => ({
          value: id.toString(),
          label: name,
          bsno
        }));
      }
    };

    useEffect(() => {
      if (!isLogin()) {
        location.href = '/login';
      }
      //dispatch(getReqAction(slReqId));
      selectSellcar({ slReqId })
        .then((res) => {
          const {
            data: seller,
            statusinfo: { returncd }
          } = res.data;
          if (returncd === '000') {
            const car = seller?.car;
            dispatch({
              type: sellCarTypes.INIT_CAR_STATE,
              payload: { seller, car } || {}
            });
          } else if (returncd === '999') {
            showAlert('진입 불가', () => {
              Router.back();
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      Promise.all([selectAllCarTypeList()]).then((results) => {
        const [carTypes] = results;
        if (carTypes) setCarTypes(parseResults(carTypes));
      });
      getCommonCodeAsync('FM047').then(setCarMssList);
      getCommonCodeAsync('FM048').then(setFuelTypes);
      getCommonCodeAsync('AM104').then(setCarColors);
    }, []);

    //판금교환여부에서 사용할 라벨
    const getLabel = useCallback(getLabelFromArray, [car]);

    const [spExchYnList, setSpExchYnList] = useState([]);

    useEffect(() => {
      getCommonCodeAsync(CMCDTPID.spExchYn).then(setSpExchYnList);
    }, []);

    //판금교환여부
    const exchangeOptions = [
      { value: '0', label: '있음' },
      { value: '1', label: '없음' },
      { value: '2', label: '모르겠음' }
    ];

    //날짜 폼 변경함수
    const getDate = (dateTime) => {
      if (dateTime === undefined || dateTime === null) {
        return '';
      }
      return dateTime.split(' ')[0];
    };

    //현재 신청현황의 step정보
    const [activeNo, setActiveNo] = useState(0);

    //신청서 정보로 req(판매신청) 정보가져옴
    useEffect(() => {
      dispatch(getReqAction(slReqId));
    }, [dispatch, slReqId]);

    /**
     * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
     */
    useEffect(() => {
      if (!callReq) {
        setCallReq(true);
        const params = {
          slReqId
        };

        dispatch(selectSellcarAction(params));
      }
    }, [callReq, dispatch, slReqId]);

    /**
     * req(판매신청)정보도 변경이 되었을 경우 activeNo(진행상태 값)도 변경이 되었을 수 있기 때문에 처리
     */
    useEffect(() => {
      if (!isEmpty(seller)) {
        setActiveNo(REQ_STT[seller.reqTpcd]?.STATE[seller.reqSttTpcd]?.STEPNO);
      }
      console.log('activeNo : ', activeNo);
    }, [activeNo, seller]);

    // 신청서 정보 변화 감지
    useEffect(() => {
      if (!isEmpty(seller)) {
        setState(saleCarUtil.getState(seller, cmprEstm));
      }
    }, [seller]);

    //전체보기 리스트 오픈
    const handleOpenList = useCallback((e) => {
      e.preventDefault();
      setIsValue(true);
    }, []);
    //전체 항목보기 리스트 닫기
    const handleCloseList = useCallback((e) => {
      e.preventDefault();
      setIsValue(false);
    }, []);

    // 판매취소 bottom 팝업부
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);

    const { showAlert, showConfirm } = useContext(SystemContext);

    //취소버튼을 눌렀을때 bottom부분 팝업이 열리는 부분
    const handleCancelOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      preventScroll(true);
    }, []);

    //bottom 부분 판매취소팝업닫기
    const handleCloseDimm = useCallback((e) => {
      e.preventDefault();
      setActive(false);
      setDimm(false);
      preventScroll(false);
    }, []);

    //신청취소 팝업 띄우기
    const cancelHandlePop = useCallback(
      (e) => {
        e.preventDefault();
        setCancelShow2(true);
      },
      [setCancelShow2]
    );

    // 판매취소 라디오 정보입력
    const [isValue1, setIsValue1] = useState(1);
    const [isTextArea, setIsTextArea] = useState(isValue1 === 4 ? true : false);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
      setIsTextArea(Number(e.target.value) === 4 ? true : false);
      console.log('saleCancel : ', e.target.label, e.target.value);
    }, []);

    //판매취소 기타 사유 저장
    const [cnclRsnTpcdNm, setCnclRsnTpcdNm] = useState('');

    //신청서 취소 actionMap - commonReqCancelHandler에서 옴
    const actionMap = {};

    //판매취소 확인 처리 핸들러
    const confirmHandler = async (e) => {
      actionMap[REQ_TPCD.SELF] = updateForSaleCancel;

      e.preventDefault();
      const apiMethod = actionMap[seller.reqTpcd];
      // console.log('apiMethod', seller, apiMethod);
      if (apiMethod) {
        const params = {
          //신청서, 취로 라디오 버튼값, 취소사유 가져감
          slReqId: seller.slReqId,
          cnclRsnTpcd: isValue1,
          cnclRsnTpcdNm
        };
        apiMethod(params)
          //api에서 판매취소부 params를 가져가서 실행함
          .then((res) => {
            console.log('cancel res : ', res, params, apiMethod);
            if (res.data.statusinfo.returncd === '000') {
              //판매취소 신청이 완료되면 신청서아이디로 신청서 정보 다시 조회
              dispatch(getReqAction(params.slReqId));
              // dispatch(
              //   updateReqSttTpcd({
              //     slReqId: seller.slReqId,
              //     reqSttTpcd: res.data.data.reqSttTpcd,
              //     reqSttTpcdNm: res.data.data.reqSttTpcdNm
              //   })
              // );
              setDimm(false);
              setActive(false);
              setCancelChkShow(true);
            } else {
              showAlert('취소처리가 실패했습니다.');
            }
          })
          .catch((err) => console.log(err));
      }
    };

    // 신청취소
    // 차량정보등록 미완료시 취소신청 핸들러
    const SelfReqCancelHandler = async (e) => {
      actionMap[REQ_TPCD.SELF] = selfCancelAction;
      cancelCloseHandler2(false);

      e.preventDefault();
      if (seller.slReqId !== undefined) {
        console.log('reqcancel : ', seller.slReqId);
        const action = actionMap[seller.reqTpcd];
        console.log(action);
        if (action) {
          const success = await dispatch(action(seller.slReqId));
          if (success) {
            // showAlert('취소신청이 완료되었습니다.');
            //취소신청 완료 팝업 출력
            setCancelChkShow(true);
          } else {
            showAlert('취소처리가 실패했습니다.');
          }
        } else {
          showAlert('해당서비스는 취소 서비스를 제공하지 않습니다.');
        }
      }
    };

    // BLUEPOP
    //현재 신청현황에 따라 bluePop띄워주도록 하는 객체
    const [bluePop, setBluePop] = useState(true);

    //bluepop 팝업닫기
    const closeBluePop = (e) => {
      e.preventDefault();
      setBluePop(false);
    };

    // 24시간 입찰
    // 입찰현황 팝업 핸들러
    const biddCurrentStatPopupHandler = (e) => {
      e.preventDefault();
      //우선 팝업띄울수있게 하기
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '차량견적확인',
          options: ['back', 'close']
        }
      });
      setBiddingShow(true);
      // 24시간 현황 정보 있으면
      // if (cmprEstm?.hh24AuctId) {
      //   const success = dispatch(selectBiddStatusByAuctIdAction({ hh24AuctId: cmprEstm.hh24AuctId }));
      //   if (success) {
      //     setBiddingShow(true);
      //   }
      // }
    };

    // 모바일 풀페이지 팝업 닫기 핸들러
    const handleFpClose = useCallback(
      (e) => {
        e.preventDefault();
        dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
        setBiddingShow(false);
        setRodalBiddResult(false);
        seteviewWriteShow(false);
        setSuspensionPop(false);
        preventScroll(false);
      },
      [dispatch, setBiddingShow, setRodalBiddResult]
    );

    const suspensionPopHandler = (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '보류사유',
          options: ['close']
        }
      });
      setSuspensionPop(true);
    };

    // 입찰결과 팝업 핸들러
    const biddResultPopupHandler = (e) => {
      e.preventDefault();
      console.log('biddResultPopupHandler', cmprEstm);
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '입찰결과',
          options: ['back', 'close']
        }
      });
      // 우선 팝업 띄우기
      setRodalBiddResult(true);
      //24시간 현황 정보 있으면
      // if (cmprEstm?.hh24AuctId) {
      //   const success = await dispatch(selectBiddStatusByAuctIdAction({ hh24AuctId: cmprEstm.hh24AuctId }));
      //   if (success) {
      //     setRodalBiddResult(true);
      //   }
      // }
    };

    //24시간 비교견적 경매 타이머
    const [limitTime, setLimitTime] = useState();

    useEffect(() => {
      const timer = setInterval(function() {
        const td = getTimeData(cmprEstm.hh24AuctEndDt);
        if (td.isTerminate) {
          clearInterval(timer);
        } else {
          setLimitTime(td.timeText);
        }
        if (td.underTwoHours) {
          //setTimeCls('tx-red80');
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, [cmprEstm]);

    // 입찰결과페이지 딜러 보기 버튼 핸들러
    // 딜러 정보 보기 버튼 핸들러 (딜러 아이디로 딜러 정보 출력)
    const _dealerInfoPopupHandler = async (dlrId) => {
      selectDealerDetail({ dlrId })
        .then((res) => {
          if (res.data.statusinfo.returncd === '000') {
            setDealer(res.data.data);
            //딜러정보 팝업 출력
            setBiddersInfoShow(true);
          }
        })
        .catch((err) => console.log(err));
    };

    // 딜러 목록 조회
    useEffect(() => {
      // 딜러 목록 조회
      selectBiddDealerList({ slReqId: seller.slReqId }).then((res) => {
        const { data, statusinfo } = res.data;
        console.log('biddlist : ', data, statusinfo);
        const newData = [];
        data.map((v, i) => {
          newData.push({ ...v, id: v.mbId, value: v.dlrBiddNo, checked: false, disabled: false, title: v.mbNm, label: v.mbNm });
        });
        if (statusinfo.returncd === '000') {
          setBiddList(newData);
        }
      });
    }, [cmprEstm]);

    // 상위입찰가 3명의 딜러 출력 함수
    // 각 입찰가가 큰 순서대로 정렬을 한번 진행, 정렬된 입찰가대로 biddlist정렬
    let sortedDealer = biddList;
    if (!isEmpty(biddList)) {
      sortedDealer = biddList.sort(biddList.biddAmt).slice(3);
    }

    //다시 판매 핸들러
    const cmprRestartPopupHandler = async (e) => {
      e.preventDefault();
      // biddBiddResultCloseHandler(false);
      setAgainlChkShow(true);
    };

    //다시 판매 진행 함수
    const cmprRestartHandler = async (e) => {
      e.preventDefault();
      againCloseHandler(false);
      const params = {
        slReqId: seller.slReqId
      };
      const success = await dispatch(updateRestartAction(params));
      if (success) {
        // againCloseHandler(false);
        setAgainlChkShow2(true);
      } else {
        // againCloseHandler(false);
        showAlert('에러가 발생했습니다.');
      }
    };

    //딜러 라디오 선택 온클릭 핸들러
    const _biddSelectHandler = (value) => {
      console.log('selectedbiddId : ', value);
      setSelectedBiddId(Number(value));
    };

    // 판매진행 버튼 핸들러
    const _saleProcHandler = (e) => {
      e.preventDefault();
      if (selectedBiddId === 0) {
        showAlert('딜러를 선택해주세요.');
      } else {
        showConfirm('판매를 진행하시겠습니까?', () => {
          // 확인버튼 이벤트
          procSaleHandler(selectedBiddId);
        });
      }
    };

    const [selectedDealer, setSelectedDealer] = useState(false);

    //판매 진행 확인 핸들러
    const procSaleHandler = async (selectedBiddId) => {
      const params = {
        slReqId: seller.slReqId,
        hh24AuctId: cmprEstm.hh24AuctId,
        dlrBiddNo: selectedBiddId
      };
      const success = await dispatch(updateBiddChoiceAction(params));
      if (success) {
        // 이후 닫기
        await dispatch(getReqAction(params.slReqId));
        showAlert('완료되었습니다.', () => {
          //딜러선택 변수 설정
          setSelectedDealer(true);
          setProceedShow2(true);
          // 내용리로딩
          //팝업 닫기
          proceedCloseHandler(false);
        });
      } else {
        showAlert('판매진행에 문제가 생겼습니다.');
      }
    };

    //딜러 후기 리뷰정보
    const [dReview, setdReview] = useState({});

    //딜러 후기 팝업 핸들러
    const handleBidderInfoShow2 = (dealerReviewId) => {
      console.log('reviewId : ', dealerReviewId);
      dealer.dealerReviewList.forEach((r) => {
        if (r.reviewId === dealerReviewId) {
          setdReview(r);
        }
      });
      setBiddersInfoShow2(true);
    };

    //판매완료시 이용후기 팝업 핸들러
    const ReviewWritePopup = async (e) => {
      e.preventDefault();
      console.log('reviewPopupHandler', cmprEstm);
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '이용후기',
          options: ['back', 'close']
        }
      });
      // if (cmprEstm?.hh24AuctId) {
      //   const success = await dispatch(selectBiddStatusByAuctIdAction({ hh24AuctId: cmprEstm.hh24AuctId }));
      //   if (success) {
      //     seteviewWriteShow(true);
      //   }
      // }
      seteviewWriteShow(true);
    };

    //이용후기 데이터 저장
    const [grade, setGrade] = useState([0, 0, 0]);
    const [usePur4Cntn, setUsePur4Cntn] = useState('');

    //등록버튼 활성화용 데이터 감지
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    //이용후기 점수저장 함수
    const gradeChange = (e, idx, value) => {
      console.log(idx, value);
      const temp = [...grade];
      temp[idx] = value;
      setGrade(temp);
    };

    // 이용후기 등록버튼 활성화 여부 감지
    useEffect(() => {
      if (grade[0] && grade[1] && grade[2]) setReviewSubmitted(true);
    }, [grade]);

    // 리뷰 내용저장 함수
    const reviewTextareaHandler = (e) => {
      e.preventDefault();
      setUsePur4Cntn(e.target.value);
      // 이용후기를 등록할 타이밍에 별점데이터가 다 있으면 등록버튼 활성화
      // if (grade[0] && grade[1] && grade[2]) setReviewSubmitted(true);
    };

    // 리뷰 등록 핸들러
    const reviewSumbitHandler = async (e) => {
      e.preventDefault();
      // reviewWriteCloseHandler(false);
      console.log(usePur4Cntn, grade);
      const params = {
        slReqId: seller.slReqId,
        usePs1Cntn: grade[0],
        usePs2Cntn: grade[1],
        usePs3Cntn: grade[2],
        usePs4Cntn: usePur4Cntn
      };
      const success = await dispatch(addReviewAction(params));
      if (success) {
        showAlert('등록되었습니다.');
        reviewWriteCloseHandler(false);
        handleFpClose();
      } else {
        showAlert('실패했습니다.');
      }
    };
    // 보류사유
    const refuseType = {
      dn01: '고객요청',
      dn02: '차량정보오류',
      dn03: '사진정보오류',
      dn04: ''
    };
    //보류사유 팝업
    const [suspensionPop, setSuspensionPop] = useState(false);
    const [suspensionChecked, setSuspensionChecked] = useState(1);
    const onChangeSuspension = useCallback((e) => {
      setSuspensionChecked(+e.target.value);
    }, []);
    const onConfirmSuspension = useCallback((e) => {
      e.preventDefault();
      setSuspensionPop(false);
      dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
    }, []);

    useEffect(() => {
      setSuspensionChecked(refuseType[seller.cnclRsnTpcd]);
    }, [seller.cnclRsnTpcd]);
    return (
      <AppLayout>
        <div className="general-sell-sec">
          <ul className="admin-list-wrap">
            <li>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].phtUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                      <div className="summary">
                        <h5 className="subject">
                          {car?.crMnfcCdNm} {car?.crDtlMdlCdNm} {car?.crClsCdNm} {car?.crDtlClsCdNm}
                        </h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{car?.crNo}</span>
                            <span>{car?.frmYyyy}</span>
                            <span>
                              {setCommaCallback(car?.drvDist)} <em>km</em>
                            </span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <div className="table-area content-border">
            <ul className="m-toggle-list up-blue fs16">
              <MenuItem>
                <MenuTitle>
                  진행현황<span>{seller.reqSttTpcdNm}</span>
                </MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li className={state.activeNo === 1 ? 'tx-blue80' : ''}>
                      <span className="title">1.차량정보등록</span>
                      <span className="sub">
                        차량정보를
                        <br />
                        등록해주세요.
                      </span>
                    </li>
                    <li className={state.activeNo === 2 ? 'tx-blue80' : ''}>
                      <span className="title">2. 신청완료</span>
                      <span className="sub">
                        신청이 완료되었습니다.
                        <br />
                        관리자 확인 후 비교견적이 시작됩니다.
                      </span>
                    </li>
                    <li className={state.activeNo === 3 ? 'tx-blue80' : ''}>
                      <span className="title">3. 비교견적 진행 중</span>
                      <span className="sub">
                        24시간 실시간 비교견적 진행 중입니다.
                        <br />
                        입찰 현황을 확인해보세요.
                      </span>
                    </li>
                    <li className={state.activeNo === 4 ? 'tx-blue80' : ''}>
                      <span className="title">4. 비교견적 완료</span>
                      <span className="sub">
                        24시간 실시간 비교견적이 완료되었습니다.
                        <br />
                        입찰현황을 확인하시고,
                        <br />
                        차량 판매 여부를 결정해주세요.
                      </span>
                    </li>
                    {/* 추가 START */}
                    <li className={state.activeNo === 5 ? 'tx-blue80' : ''}>
                      <span className="title">5. 거래 진행중</span>
                      <span className="sub">
                        현재 선택하신 딜러와 거래가 진행중입니다.
                        <br />
                        잠시만 기다려주세요.
                      </span>
                    </li>
                    {/* 추가 END */}
                    <li className={state.activeNo === 6 ? 'tx-blue80' : ''}>
                      {/* 수정 */}
                      <span className="title">6. 거래완료</span>
                      {state.btn.writerReview ? (
                        <span className="sub">
                          딜러와의 거래는 어떠셨나요?
                          <br />
                          이용후기를 남겨주세요.
                        </span>
                      ) : (
                        <span className="sub">취소 또는 다시판매 상태차량입니다.</span>
                      )}
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
              <li className="pt20 pb8">
                <div className="float-wrap btn-s">
                  {/* 펼처보기 버튼 활성화 여부  */}
                  {isValue === true ? (
                    <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목닫기" width={85} onClick={handleCloseList} />
                  ) : (
                    <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목보기" width={85} onClick={handleOpenList} />
                  )}

                  {/* 추가 START - 진행보류 상태일 경우 */}
                  {state.displayPriceType === saleCarUtil.DisplayPrice.REFUSE && (
                    <Button size="sml" line="gray" color="gray" radius={true} title="보류사유" width={61} onClick={suspensionPopHandler} className="b-suspension" />
                  )}
                  {/* 추가 END - 진행보류 상태일 경우 */}

                  {/* 신청취소버튼 -> 신청완료이전 단계일때만 */}
                  {state.activeNo <= 2 && <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} onClick={cancelHandlePop} />}

                  {/* 판매취소버튼 */}
                  {/* {state.activeNo <= 2 && <Button size="sml" line="gray" color="gray" radius={true} title="판매취소" width={61} onClick={handleCancelOpenPop} />} */}
                  {/* 입찰현황버튼 -> 거래완료시 */}
                  {state.activeNo === 6 && <Button size="sml" line="gray" color="gray" radius={true} title="입찰현황" width={61} onClick={biddResultPopupHandler} />}
                </div>
              </li>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 기본 정보</MenuTitle>
                <MenuCont>
                  <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 기본 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>최종등록일</th>
                        <td>{getDate(car.frstRegDt)}</td>
                        {/* <td>{car.frstRegDt}</td> */}
                      </tr>
                      <tr>
                        <th>형식년도</th>
                        <td>{car.frmYyyy}</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>{getLabelFromArray(carColors, car.crClrCd) || car.crClrCdNm}</td>
                      </tr>
                      <tr>
                        <th>연료</th>
                        <td>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>{car.dspl} cc</td>
                      </tr>
                      <tr>
                        <th>차종</th>
                        <td>{getLabelFromArray(carTypes, car.crTypeCd)}</td>
                      </tr>
                      <tr>
                        <th>용도</th>
                        <td>{getLabelFromArray(carUseDvcdList, car.crUseDvcd)}</td>
                      </tr>
                      <tr>
                        <th>출고가격</th>
                        <td>{setComma(car.crRlsPrc) + ' 원'}</td>
                      </tr>
                      <tr>
                        <th>변속기</th>
                        <td>{getLabelFromArray(carMssList, car.mssDvcd)}</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>{setComma(car.drvDist) + 'km'}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>옵션정보</MenuTitle>
                <MenuCont>
                  {/* <CarOptions optionList={car?.optionList} addOption={true} isMore={false} defaultTab={optionIsTab} callback={onCarOptionClick} /> */}
                  <CarOptionsEditor items={car?.optionList} addOptions={true} isEditing={false} selectOptFlag={true} />
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>추가 상세 정보</MenuTitle>
                <MenuCont>
                  <table summary="추가 상세 정보에 대한 내용" className="table-tp1">
                    <caption className="away">추가 상세 정보</caption>
                    <colgroup>
                      <col width="42%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>주행거리(현재기준)</th>
                        <td>
                          {setCommaCallback(car?.drvDist)} <em>km</em>
                        </td>
                      </tr>
                      <tr>
                        <th>차량설명</th>
                        <td>{car.crCmnt}</td>
                      </tr>
                      <tr>
                        <th>판금/교환여부</th>
                        <td>
                          {getLabel(spExchYnList, car?.spExchYn)} {car?.spExchCntn || ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>판매자 정보</MenuTitle>
                <MenuCont>
                  <table summary="추가 상세 정보에 대한 내용" className="table-tp1">
                    <caption className="away">추가 상세 정보</caption>
                    <colgroup>
                      <col width="32%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>{seller.nmbNm}</td>
                      </tr>
                      <tr>
                        <th>휴대전화번호</th>
                        <td>{seller.hpPn}</td>
                      </tr>
                      <tr>
                        <th>거주지역</th>
                        <td>
                          {seller.rgstRsdcAddrCdNm} {seller.rgstRsdcDtlAddrCdNm} {seller.applcntRsdcAddAddr}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 사진</MenuTitle>
                <MenuCont>
                  {/* 차량정보에 있는 사진들 리스트 띄우기 */}
                  <CarPictureApply mainSlotOptions={mainPhotoList} subSlotOptions={subPhotoList} photoList={car.photoList} isButton={false} fileDisabled={true} mode="sellcar" />
                  {/* 어두운부분은 차량등록이 안됐을때만 나오도록 */}
                  {state.activeNo === 1 && (
                    <div className="dim-wrap">
                      <p>
                        입력이 완료되지 않았습니다.
                        <br /> [이어하기]를 통해 정보를 입력해주세요.
                      </p>
                    </div>
                  )}
                </MenuCont>
              </MenuItem>
            </ul>
          </div>
        </div>
        {/* =============================본문 끝=========================== */}
        {/* 처음 페이지 로딩됐을때 작업 감지해서 이어하기 나오게 */}
        {/* 1. 차량등록 미완료시 출력 */}
        {state.activeNo === 1 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              등록이 완료되지 않았습니다.
              <br />
              계속 등록하시겠습니까?
            </p>
            <Buttons align="center" marginTop={12}>
              {/* 이어하기 누르면 selfStep으로 넘어갈때 slReqId가져가도록 지정하기 */}
              <Button
                size="sml"
                line="gray"
                radius={true}
                title="이어하기"
                width={88}
                height={30}
                href={'/sell/selfStep01?slReqId=' + seller.slReqId}
                // nextLink={true}
              />
              {/* <Button size="sml" line="gray" radius={true} title="입찰현황" width={88} height={30} onClick={biddCurrentStatPopupHandler} />
              <Button size="sml" line="gray" radius={true} title="입찰결과" width={88} height={30} onClick={biddResultPopupHandler} />
              <Button size="sml" line="gray" radius={true} title="이용후기" width={88} height={30} onClick={ReviewWritePopup} /> */}
            </Buttons>
          </div>
        )}

        {/* 2. 신청이 완료되었을때 나오는 팝업*/}
        {state.activeNo === 2 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              신청이 완료되었습니다.
              <br />
              관리자 확인 후 비교견적이 시작됩니다.
            </p>
          </div>
        )}
        {/* 3. 취소 팝업부 */}
        {/* 판매취소 bottom팝업 */}
        <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
        <MobBottomArea active={active}>
          <div className="inner">
            <p className="tit1 mb24">판매취소</p>
            <p className="tx-tit">취소사유</p>
            <ul className="radio-block tp3">
              <li>
                <Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
              </li>
              <li>
                <Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} />
              </li>
              <li>
                <Radio className="txt" id="cancel3" label="견적 불만 / 입찰자 없음" value={3} checked={isValue1} onChange={handleChange1} />
              </li>
              <li>
                <Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} />
              </li>
            </ul>
            {isTextArea && (
              <>
                <p className="tx-tit mt24 mb8">
                  기타사유<em>(선택)</em>
                </p>
                <Textarea
                  countLimit={200}
                  type="tp1"
                  //focusOut이 될 경우 텍스트박스의 내용을 저장
                  onBlur={(e) => {
                    console.log('cancelResnNm : ', e.target.value);
                    setCnclRsnTpcdNm(e.target.value);
                  }}
                  height={133}
                  placeHolder="기타 사유를 작성해주세요."
                />
              </>
            )}
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCloseDimm} />
            <Button size="big" background="blue80" title="확인" onClick={confirmHandler} />
          </Buttons>
        </MobBottomArea>
        {/* 판매취소 확인 팝업 */}
        <RodalPopup show={cancelChkShow} type={'fade'} closedHandler={cancelChkCloseHandler} mode="normal" size="xs">
          <div className="con-wrap">
            <p>취소 신청이 완료되었습니다.</p>
            <Buttons align="center" marginTop={56}>
              <Button
                fontSize={14}
                title="확인"
                color="blue80"
                fontWeight="bold"
                //확인버튼 누르면 팝업창 닫음
                onClick={(e) => {
                  e.preventDefault();
                  cancelChkCloseHandler(false);
                  handleFpClose();
                }}
              />
            </Buttons>
          </div>
        </RodalPopup>
        {/* 신청취소 확인 팝업 */}
        <RodalPopup show={cancelShow2} type={'fade'} closedHandler={cancelCloseHandler2} mode="normal" size="xs">
          <div className="con-wrap popup-cancel">
            <p>셀프평가 신청을 취소하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button
                fontSize={14}
                title="취소"
                color="blue80"
                width={100}
                //팝업창 닫음
                onClick={(e) => {
                  e.preventDefault();
                  cancelCloseHandler2(false);
                }}
              />
              <Button
                fontSize={14}
                marginLeft={16}
                title="확인"
                color="blue80"
                fontWeight="bold"
                onClick={(e) => {
                  e.preventDefault();
                  SelfReqCancelHandler(e);
                }}
              />
            </Buttons>
          </div>
        </RodalPopup>

        {/* 추가 START - 진행보류 상태일 경우 나오는 팝업 */}
        {state.displayPriceType === saleCarUtil.DisplayPrice.REFUSE && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>관리자에 의해 진행이 보류되었습니다.</p>
          </div>
        )}
        {/* 추가 END - 5. 진행보류 상태일 경우 나오는 팝업 */}

        {/* 3. 24시간 비교견적 */}
        {/* 24시간 입찰하는 부분띄우기 */}
        {state.activeNo === 3 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>입찰 현황을 확인해보세요.</p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="입찰현황" width={88} height={30} onClick={biddCurrentStatPopupHandler} />
            </Buttons>
          </div>
        )}

        {/* 4. 24시간 비교견적 결과 */}
        {/* 비교견적 완료시 출력할 bluepop */}
        {state.activeNo === 4 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              입찰 현황을 확인해 보시고,
              <br />
              판매여부를 결정해주세요
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="입찰현황" width={88} height={30} onClick={biddResultPopupHandler} />
            </Buttons>
          </div>
        )}

        {/* 추가 START - 5. 거래진행 상태일때 나오는 팝업 */}
        {state.activeNo === 5 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>선택하신 딜러와 거래가 진행중입니다.</p>
          </div>
        )}
        {/* 추가 END - 5. 거래진행 상태일때 나오는 팝업 */}

        {/* 추가 START - 7일후 거래지연 팝업 */}
        {state.displayPriceType === saleCarUtil.DisplayPrice.DELAY && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>현재 딜러선택 후 7일이 지나 거래 지연중입니다. 선택 딜러와 연락을 취해주세요.</p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="입찰현황" width={88} height={30} onClick={biddResultPopupHandler} />
            </Buttons>
          </div>
        )}
        {/* 추가 END - 7일후 거래지연 팝업 */}

        {/* 6. 거래완료시 */}
        {/* 거래완료시 출력할 bluepop */}
        {state.activeNo === 6 && state.btn.writerReview && bluePop && (
          // {state.displayPriceType === saleCarUtil.DisplayPrice.SHOW_PRICE && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              딜러와의 거래는 어떠셨나요?
              <br />
              이용후기를 남겨주세요.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="이용후기" width={88} height={30} onClick={ReviewWritePopup} />
            </Buttons>
          </div>
        )}

        {/* 24시간 경매현황 팝업하는 부분 전체 시작 */}
        {/* 시간 지나가게 해야되고 딜러 출력하는 부분은 비교견적이 완료되고나서 출력 */}
        {/* {/* <RodalPopup show={biddingShow} type={'slideUp'} closedHandler={biddingCloseHandler} mode="normal" title="24시간 실시간 비교견적 입찰현황"> */}
        <MobFullpagePopup active={mFullpageCPopup} paddingBottom={80} cPop={true} subPop={true} onClose={handleFpClose}>
          {biddingShow && (
            <>
              <div className="general-sell-sec">
                <ul className="admin-list-wrap">
                  <li>
                    <div className="goods-list admin-list tp4">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                            <div className="summary">
                              <h5 className="subject">
                                {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
                              </h5>
                              <div className="info-wrap">
                                <div className="info">
                                  <span>{car.crNo}</span>
                                  <span>{car.frmYyyy}</span>
                                  <span>
                                    {setCommaCallback(car?.drvDist)} <em>km</em>
                                  </span>
                                </div>
                                {/* <div className="prev">
                                <span>조회수: {seller.count}회</span>
                              </div> */}
                              </div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <div className="bidding-inquiry content-border">
                  <ul>
                    <li>
                      남은시간
                      {/* <p className="time tx-blue80">{time}</p> */}
                      <p className="price-tp7">{limitTime}</p>
                    </li>
                    <li>
                      입찰자수
                      <p className="price-tp7">
                        {cmprEstm.biddDrlCnt}
                        <span className="won">명</span>
                      </p>
                    </li>
                    <li>
                      현재 최고가
                      <p className="price-tp7">
                        {setComma(cmprEstm.maxAmt)}
                        <span className="won">만원</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="content-wrap">
                  <h4 className="tit2 mt32">차량 견적</h4>
                  <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.</p>
                  <div className="list-none-wrap tp2">
                    <p className="list-none">
                      24시간 비교견적 종료 후<br />
                      최고 입찰자 상위 3명의 딜러정보가 제공됩니다.
                    </p>
                  </div>
                </div>
              </div>
              {/* <Buttons align="center" className="full">
              //   <Button size="full" background="blue80" title="판매취소" onClick={handleCancelOpenPop} />
              // </Buttons> */}
              <Button className="fixed" size="full" background="blue80" title="판매취소" onClick={handleCancelOpenPop} />
              {/* 판매취소 */}
              <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
              <MobBottomArea active={active}>
                <div className="inner">
                  <p className="tit1 mb24">판매취소</p>
                  <p className="tx-tit">취소사유</p>
                  <ul className="radio-block tp3">
                    <li>
                      <Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel3" label="견적 불만 / 입찰자 없음" value={3} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} />
                    </li>
                  </ul>
                  {isTextArea && (
                    <>
                      <p className="tx-tit mt24 mb8">
                        기타사유<em>(선택)</em>
                      </p>
                      <Textarea
                        countLimit={200}
                        type="tp1"
                        //focusOut이 될 경우 텍스트박스의 내용을 저장
                        onBlur={(e) => {
                          console.log('cancelResnNm : ', e.target.value);
                          setCnclRsnTpcdNm(e.target.value);
                        }}
                        height={133}
                        placeHolder="기타 사유를 작성해주세요."
                      />
                    </>
                  )}
                </div>
                <Buttons align="center" className="full">
                  <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCloseDimm} />
                  <Button size="big" background="blue80" title="확인" onClick={confirmHandler} />
                </Buttons>
              </MobBottomArea>
            </>
          )}
          {/* </MobFullpagePopup> */}
          {/* </RodalPopup> */}

          {/* 24시간 비교견적 완료부분 팝업 */}
          {/* 이부분에서는 입찰자가 있을때랑 아닐때랑 나눠서 해야됨 */}
          {/* <MobFullpagePopup active={mFullpageCPopup} paddingBottom={80} cPop={true} subPop={true} onClose={handleFpClose}> */}
          {/* <RodalPopup show={rodalBiddResult} type={'slideUp'} closedHandler={biddBiddResultCloseHandler} mode="normal" title="24시간 실시간 비교견적 입찰현황"> */}
          {rodalBiddResult && (
            <>
              <div className="general-sell-sec">
                <ul className="admin-list-wrap">
                  <li>
                    <div className="goods-list admin-list tp4">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                            <div className="summary">
                              <h5 className="subject">
                                {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
                              </h5>
                              <div className="info-wrap">
                                <div className="info">
                                  <span>{car.crNo}</span>
                                  <span>{car.frmYyyy}</span>
                                  <span>
                                    {setCommaCallback(car?.drvDist)} <em>km</em>
                                  </span>
                                </div>
                                {/* <div className="prev">
                              <span>조회수: {seller.count}회</span>
                            </div> */}
                              </div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                {(state.displayPriceType === saleCarUtil.DisplayPrice.END_BIDD && cmprEstm.biddDrlCnt === 0) || state.displayPriceType === saleCarUtil.DisplayPrice.FAIL_BIDD ? (
                  <>
                    <div className="bidding-inquiry content-border">
                      <ul>
                        <li>
                          남은시간
                          <p className="time tx-blue80 none">
                            입찰종료
                            <br />
                            되었습니다.
                          </p>
                        </li>
                        <li>
                          입찰자수
                          <p className="price-tp7">
                            0<span className="won">명</span>
                          </p>
                        </li>
                        <li>
                          현재 최고가
                          <p className="price-tp7">
                            -<span className="won">만원</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content-wrap">
                      <h4 className="tit2 mt32">차량 견적</h4>
                      <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.</p>
                      <div className="list-none-wrap tp2">
                        <p className="list-none">
                          아쉽게도 입찰한 딜러가 없습니다.
                          <br />
                          다시한번 비교견적 신청해보세요.
                        </p>
                      </div>
                    </div>
                    <Buttons align="center" className="fixed full">
                      <Button size="big" background="blue20" color="blue80" title="판매취소" onClick={handleCancelOpenPop} />
                      <Button size="big" background="blue80" title="다시 견적받기" onClick={cmprRestartPopupHandler} />
                    </Buttons>
                  </>
                ) : (
                  // 입찰자가 존재할경우
                  <>
                    <div className="bidding-inquiry content-border">
                      <ul>
                        <li>
                          남은시간
                          <p className="time tx-blue80 none">
                            입찰종료
                            <br />
                            되었습니다.
                          </p>
                        </li>
                        <li>
                          입찰자수
                          <p className="price-tp7">
                            {cmprEstm.biddDrlCnt}
                            <span className="won">명</span>
                          </p>
                        </li>
                        <li>
                          현재 최고가
                          <p className="price-tp7">
                            {setComma(cmprEstm.maxAmt)}
                            <span className="won">만원</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content-wrap">
                      <h4 className="tit2 mt32">차량 견적</h4>
                      <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.</p>
                      {/* sort 진행한 딜러의 리스트를 가지고 와서 리스트 출력 */}
                      {/* 기존 데이터 리스트 cmprEstm.biddList */}
                      <RadioGroup
                        // dataList={[{ id: `dlrBiddNo-${cmprEstm.biddList?.dlrBiddNo}`, value: cmprEstm.biddList?.dlrBiddNo, checked: selectedBiddId }]}
                        dataList={biddList}
                        defaultValue={1}
                        mode="vertical"
                        className="m-radio-list mt16"
                        onChange={_biddSelectHandler}
                        selfTrigger={true}
                      >
                        {/* 입찰자 리스트 매핑해서 RadioItem 제작 */}
                        {biddList &&
                          biddList?.map((bidd, idx) => (
                            <RadioItem key={idx}>
                              {/* // <div key={idx}>
                              //   <Radio className="simple" id={`dlrBiddNo-${bidd.dlrBiddNo}`} value={bidd.dlrBiddNo} title="" checked={selectedBiddId} disabled={false} onChange={_biddSelectHandler} /> */}
                              <div className="img-cover">
                                <img src={bidd.phtUrl ? bidd.phtUrl : '/images/ico/ico-dealer-none.svg'} alt="프로필 없음 이미지" />
                              </div>
                              <div className="tx-wrap">
                                <ul className="dealer">
                                  <li>{bidd.mbNm} 딜러</li>
                                  <li>{bidd.dlrAddr}</li>
                                </ul>
                                <p className="price-tp5">
                                  {bidd.biddAmt}
                                  <span className="won">만원</span>
                                </p>
                                <Link href="#">
                                  <a
                                    //딜러정보 출력하는 onclick
                                    onClick={(e) => {
                                      e.preventDefault();
                                      _dealerInfoPopupHandler(bidd.mbId);
                                    }}
                                  >
                                    딜러소개
                                  </a>
                                </Link>
                                <p className="star">
                                  <i className="ico-fill-star black" /> {bidd.psAvg}
                                </p>
                              </div>
                              {/* // </div> */}
                            </RadioItem>
                          ))}
                      </RadioGroup>
                    </div>
                    {/* 딜러가 선택됐는지 감지 */}
                    {selectedDealer === false && state.activeNo !== 6 ? (
                      // 딜러 선택 전
                      <Buttons align="center" className="fixed full">
                        <Button size="big" background="gray" title="판매취소" onClick={handleCancelOpenPop} />
                        <Button size="big" background="blue80" title="판매진행" onClick={_saleProcHandler} />
                      </Buttons>
                    ) : state.activeNo === 6 ? (
                      // 거래완료시
                      <Button className="fixed" size="full" background="blue20" color="blue80" radius={true} title="거래가 종료되었습니다." />
                    ) : (
                      //딜러 선택 후
                      <Button className="fixed" size="full" background="blue20" color="blue80" radius={true} title="딜러 선택이 완료되었습니다." />
                    )}
                  </>
                )}
              </div>
              {/* 판매 진행 팝업 */}
              <RodalPopup show={proceedShow} type={'fade'} closedHandler={proceedCloseHandler} mode="normal" size="xs">
                <div className="con-wrap">
                  <p>판매를 진행하시겠습니까?</p>
                  <Buttons align="center" marginTop={24}>
                    <Button
                      fontSize={14}
                      title="취소"
                      color="blue80"
                      onClick={(e) => {
                        e.preventDefault();
                        proceedCloseHandler(false);
                      }}
                    />
                    <Button
                      fontSize={14}
                      marginLeft={16}
                      title="확인"
                      color="blue80"
                      fontWeight="bold"
                      onClick={(e) => {
                        e.preventDefault();
                        procSaleHandler(selectedBiddId);
                      }}
                    />
                  </Buttons>
                </div>
              </RodalPopup>
              {/* 판매결정이후 연락 안내문 팝업 */}
              <RodalPopup show={proceedShow2} type={'fade'} closedHandler={proceedCloseHandler2} mode="normal" size="xs">
                <div className="con-wrap">
                  <p>
                    고객님께 판매진행을 돕기 위해
                    <br />
                    휴대폰으로 연락드리겠습니다.
                    <br />
                    감사합니다.
                  </p>
                  <Button
                    fontSize={14}
                    title="확인"
                    color="blue80"
                    fontWeight="bold"
                    onClick={(e) => {
                      e.preventDefault();
                      proceedCloseHandler2(false);
                      handleFpClose();
                    }}
                  />
                </div>
              </RodalPopup>
              {/* 다시판매 신청하기 */}
              <RodalPopup show={againShow} type={'fade'} closedHandler={againCloseHandler} mode="normal" size="xs">
                <div className="con-wrap">
                  <p>
                    다시 24시간 실시간 비교견적을
                    <br />
                    진행하시겠습니까?
                  </p>
                  <Buttons align="center" marginTop={24}>
                    <Button
                      fontSize={14}
                      title="취소"
                      color="blue80"
                      onClick={(e) => {
                        e.preventDefault();
                        againCloseHandler(false);
                      }}
                    />
                    <Button fontSize={14} marginLeft={16} title="확인" color="blue80" fontWeight="bold" onClick={cmprRestartHandler} />
                  </Buttons>
                </div>
              </RodalPopup>
              {/* 다시판매 신청 완료 */}
              <RodalPopup show={againShow2} type={'fade'} closedHandler={againCloseHandler2} mode="normal" size="xs">
                <div className="con-wrap">
                  <p>신청이 완료되었습니다.</p>
                  <Buttons align="center" marginTop={24}>
                    <Button
                      fontSize={14}
                      title="확인"
                      color="blue80"
                      fontWeight="bold"
                      onClick={(e) => {
                        e.preventDefault();
                        //다시 견적 신청완료하면 24시 비교견적 결과창도 닫음.
                        biddBiddResultCloseHandler(false);
                        againCloseHandler2(false);
                        handleFpClose();
                      }}
                    />
                  </Buttons>
                </div>
              </RodalPopup>
              {/* 딜러 정보 팝업창 딜러정보 {dealer} 가져감*/}
              <RodalPopup show={bidderInfoShow} type={'slideUp'} closedHandler={bidderInfoCloseHandler} mode="normal" title="입찰자 정보">
                <div className="general-sell-sec">
                  <div className="seller-wrap">
                    <div className="profile">
                      <div className="img-wrap">
                        <img src={dealer.profUrl} alt="딜러 이미지" />
                      </div>
                      <div className="tx-wrap">
                        <h2>{dealer.name}</h2>
                        <p>
                          {/* 딜러 핸드폰번호 암호화 */}
                          {dealer.tel}
                          {/* <span className="tx-blue80">연락처는 딜러 선택 후 공개됩니다.</span> */}
                          {/* 010-****-***<em>(연락처는 딜러 선택 후 공개)</em> */}
                        </p>
                        <ul className="employee-card">
                          <li>{dealer.addr}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="introduce-wrap mt16">
                      {/* 주력정보 출력이 어떤식인지를 확인해봐야 알거같음*/}
                      {dealer.tags}
                      <p>
                        <span>{dealer.tags}</span>
                        {dealer.intro}
                      </p>
                    </div>
                  </div>

                  {/* <TabMenu type="type2" defaultTab={0} mount={false}>
                    <TabCont tabTitle="참여 현황" id="tab2-1" index={0}>
                      <div className="list-none-wrap tp2">
                        <p className="list-none">셀프평가 참여 이력이 없습니다.</p>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="이용 후기" id="tab2-2" index={1}>
                      <div className="list-none-wrap tp2">
                        <p className="list-none">등록된 후기가 없습니다.</p>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="거래 후기" id="tab2-3" index={2}>
                      <div className="list-none-wrap tp2">
                        <p className="list-none">등록된 후기가 없습니다.</p>
                      </div>
                    </TabCont>
                  </TabMenu> */}
                  <TabMenu type="type2" defaultTab={0} mount={false}>
                    <TabCont tabTitle="참여 현황" id="tab2-1" index={0}>
                      {dealer.totalBiddsCnt === 0 ? (
                        <div className="list-none-wrap tp2">
                          <p className="list-none">셀프평가 참여 이력이 없습니다.</p>
                        </div>
                      ) : (
                        <>
                          <table summary="셀프평가 이용현황에 관한 내용" className="table-tp1 th-c td-c">
                            <caption className="away">셀프평가 이용현황</caption>
                            <colgroup>
                              <col width="35%" />
                              <col width="65%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th colSpan="2">평가등급</th>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <ul className="star-wrap">
                                    <li>
                                      <span className="start-group">
                                        <StarScore grade={parseInt(dealer.pointRate)} />
                                      </span>
                                      <span className="score-txt">{dealer.pointRate}</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <th colSpan="2">만족도</th>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <ul className="star-wrap">
                                    <li>
                                      <span className="score-tit">가격</span>
                                      <span className="start-group">
                                        <StarScore grade={parseInt(dealer.pricePointRate)} />
                                      </span>
                                      <span className="score-txt">{dealer.pricePointRate}</span>
                                    </li>
                                    <li>
                                      <span className="score-tit">서비스</span>
                                      <span className="start-group">
                                        <StarScore grade={parseInt(dealer.servicePointRate)} />
                                      </span>
                                      <span className="score-txt">{dealer.servicePointRate}</span>
                                    </li>
                                    <li>
                                      <span className="score-tit">추천의향</span>
                                      <span className="start-group">
                                        <StarScore grade={parseInt(dealer.recommPointRate)} />
                                      </span>
                                      <span className="score-txt">{dealer.recommPointRate}</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="bidding-inquiry">
                            <ul>
                              <li>
                                총 입찰 대수
                                <p className="price-tp7">
                                  {dealer.totalBiddsCnt}
                                  <span className="won">대</span>
                                </p>
                              </li>
                              <li>
                                총 낙찰 대수
                                <p className="price-tp7">
                                  {dealer.totalSuccBiddsCnt}
                                  <span className="won">대</span>
                                </p>
                              </li>
                              <li>
                                성사율(%)<p className="price-tp7">{dealer.succRate}%</p>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </TabCont>
                    <TabCont tabTitle="이용 후기" id="tab2-2" index={1}>
                      <div className="review-wrap">
                        {!isEmpty(dealer.userReviewList) ? (
                          <>
                            <p className="inquire-num">
                              {/* 총 리뷰 건수 출력 */} 총<span>{dealer.userReviewList.length}</span>건
                            </p>
                            {dealer.userReviewList.map((v, i) => {
                              return (
                                <>
                                  <div className="inner" key={i}>
                                    {/* 차량이름? 리뷰제목? */}
                                    <p>{v.crNm}</p>
                                    <div className="float-wrap">
                                      <ul>
                                        <li>{v.regDt}</li>
                                        <li>{v.customerNm} 고객님</li>
                                      </ul>
                                      <p className="star">
                                        <i className="ico-fill-star" /> {v.point}
                                      </p>
                                    </div>
                                    <span>{v.desc}</span>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <div className="inner">
                            <p>등록된 후기가 없습니다.</p>
                          </div>
                        )}
                      </div>
                    </TabCont>
                    <TabCont tabTitle="거래 후기" id="tab2-3" index={2}>
                      <div className="review-wrap">
                        {!isEmpty(dealer.dealerReviewList) ? (
                          <>
                            {/* 총 리뷰 출력 */}
                            <p className="inquire-num">
                              {/* 총 리뷰 건수 출력 */}총<span>{dealer.dealerReviewList.length}</span>건
                            </p>
                            {dealer.dealerReviewList.map((v, i) => {
                              return (
                                <>
                                  <div className="inner">
                                    <div className="img-cover" key={i}>
                                      <img src={v.phtUrl} alt="차량 이미지" />
                                    </div>
                                    <div className="summary">
                                      <span className="date">{v.regDt}</span>
                                      <h5 className="subject">{v.crNm}</h5>
                                      <div className="info">{v.title}</div>
                                      {/* 이부분 딜러 후기 팝업으로 연결하기 */}
                                      <Link href="#">
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleBidderInfoShow2(v.reviewId);
                                          }}
                                        >
                                          더 보기
                                        </a>
                                      </Link>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <div className="inner">
                            <p>등록된 후기가 없습니다.</p>
                          </div>
                        )}
                      </div>
                    </TabCont>
                  </TabMenu>
                </div>
                {/* 딜러 후기 상세보기 팝업창 {dReaview가져감}*/}
                <RodalPopup show={bidderInfoShow2} type={'slideUp'} closedHandler={bidderInfoCloseHandler2} mode="normal" title="딜러거래 후기" subPop={true}>
                  <div className="general-sell-sec review">
                    <ul className="date">
                      <li>{dReview.regDt}</li>
                      {/* 현재 상태 */}
                      <li className="product">{dReview.reivewDesc}</li>
                    </ul>
                    {/* 후기제목 */}
                    <h3 className="tit2" dangerouslySetInnerHTML={{ __html: dReview.title }} />
                    <div className="steps-frame slide-steps-wrap">
                      {/* screenInfo에 차량 후기 사진 데이터 삽입. */}
                      <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={dReview.phtList} dots={true}>
                        {(dReview.phtList || []).map((v, i) => {
                          <div className="steps-slide" key={i} />;
                        })}
                        {/* <div className="steps-slide"></div> */}
                      </SlideBanner>
                    </div>
                    <Textarea readonly countLimit={200} type="tp1" height={133} placeHolder="내용" disabledEnter={true}>
                      {dReview.desc}
                    </Textarea>
                  </div>
                </RodalPopup>
              </RodalPopup>
              {/* 판매취소 */}
              <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
              <MobBottomArea active={active}>
                <div className="inner">
                  <p className="tit1 mb24">판매취소</p>
                  <p className="tx-tit">취소사유</p>
                  <ul className="radio-block tp3">
                    <li>
                      <Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel3" label="견적 불만 / 입찰자 없음" value={3} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} />
                    </li>
                  </ul>
                  {isTextArea && (
                    <>
                      <p className="tx-tit mt24 mb8">
                        기타사유<em>(선택)</em>
                      </p>
                      <Textarea
                        countLimit={200}
                        type="tp1"
                        //focusOut이 될 경우 텍스트박스의 내용을 저장
                        onBlur={(e) => {
                          console.log('cancelResnNm : ', e.target.value);
                          setCnclRsnTpcdNm(e.target.value);
                        }}
                        height={133}
                        placeHolder="기타 사유를 작성해주세요."
                      />
                    </>
                  )}
                </div>
                <Buttons align="center" className="full">
                  <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCloseDimm} />
                  <Button size="big" background="blue80" title="확인" onClick={confirmHandler} />
                </Buttons>
              </MobBottomArea>
            </>
          )}
          {/* </MobFullpagePopup> */}

          {/* </RodalPopup> */}
          {/* 이용후기 팝업 */}
          {/* <RodalPopup show={reviewWriteShow} type={'slideUp'} closedHandler={reviewWriteCloseHandler} mode="normal" title="이용후기 작성"> */}
          {reviewWriteShow && (
            <>
              <div className="con-wrap general-sell-sec review">
                <h3 className="tit2 mb16">{cmprEstm?.dealerInfo?.name} 딜러님과의 거래는 어떠셨나요?</h3>
                <ul className="goods-list list-type">
                  <li>
                    <span>
                      <div className="img-cover-wrap">
                        <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                      </div>
                      <div className="summary">
                        <h5 className="subject">
                          {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
                        </h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{car.crNo}</span>
                            <span>{car.frmYyyy}</span>
                            <span>
                              {setCommaCallback(car?.drvDist)} <em>km</em>
                            </span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              {/* 최종 매입 금액 */}
                              <p className="price-tp2">
                                {setComma(cmprEstm?.myBidd?.biddAmt)}
                                <span className="won">만원</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
                <ul className="m-toggle-list up-blue fs16">
                  <MenuItem>
                    <MenuTitle>입찰 결과 조회</MenuTitle>
                    <MenuCont>
                      <div className="bidding-inquiry">
                        <ul>
                          <li>
                            입찰자수
                            <p className="price-tp7">
                              {cmprEstm.biddDlrCnt}
                              <span className="won">명</span>
                            </p>
                          </li>
                          <li>
                            입찰 최고가
                            <p className="price-tp7">
                              {cmprEstm.maxAmt}
                              <span className="won">만원</span>
                            </p>
                          </li>
                        </ul>
                        <div className="dealer-wrap">
                          <div className="img-cover">
                            <img src={cmprEstm?.dealerInfo?.profUrl} alt="프로필 없음 이미지" />
                          </div>
                          <ul className="tx-wrap">
                            <li className="dealer">{cmprEstm?.dealerInfo?.name} 딜러</li>
                            <li className="num">{cmprEstm?.dealerInfo?.tel}</li>
                            <li>{cmprEstm?.dealerInfo?.mrktCmplxNm}</li>
                            <li>{cmprEstm?.dealerInfo?.entrCorpNm}</li>
                          </ul>
                          {/* 전화걸기 토글 */}
                          <Button
                            size="mid"
                            background="blue20"
                            color="blue80"
                            radius={true}
                            title="전화하기"
                            width={53}
                            height={24}
                            fontSize={10}
                            fontWeight={500}
                            href={'tel:' + cmprEstm?.dealerInfo?.tel}
                          />
                        </div>
                      </div>
                    </MenuCont>
                  </MenuItem>
                </ul>
                <div className="review-input-wrap">
                  <ul>
                    <li>
                      최종 판매 금액에 만족하시나요?
                      <span>
                        <StarScore type="click" grade={grade[0]} idx={0} gradeChange={gradeChange} />
                      </span>
                    </li>
                    <li>
                      구매 딜러의 서비스에 만족하시나요?
                      <span>
                        <StarScore type="click" grade={grade[1]} idx={1} gradeChange={gradeChange} />
                      </span>
                    </li>
                    <li>
                      주변분들에게 구매 딜러를 추천 의향은 어느 정도 되시나요?
                      <span>
                        <StarScore type="click" grade={grade[2]} idx={2} gradeChange={gradeChange} />
                      </span>
                    </li>
                    <li>
                      이용후기를 간단하게 한 줄로 남겨주세요.
                      <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onBlur={reviewTextareaHandler} />
                    </li>
                  </ul>
                </div>
              </div>
              {/* 모든정보 입력하지 않을시 버튼 비활성화 */}
              <Button disabled={reviewSubmitted === false ? true : false} className="fixed" size="full" background="blue80" title="등록" onClick={reviewSumbitHandler} />
              {/* </RodalPopup> */}
            </>
          )}
          {/* 추가 START */}
          {suspensionPop && (
            <div className="content-wrap inquire-wrap">
              <form>
                <fieldset>
                  <legend className="away">보류사유</legend>
                  <table summary="보류사유에 대한 내용" className="table-tp2">
                    <caption className="away">보류사유</caption>
                    <colgroup>
                      <col width="20%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>
                          보류사유 <span className="tx-blue80">*</span>
                        </th>
                        <td>
                          <ul className="radio-block small exception">
                            <li>
                              <Radio className="txt" id={'suspension-reason1'} label={'차량정보오류'} value={'dn01'} checked={suspensionChecked} onChange={onChangeSuspension} />
                            </li>
                            <li>
                              <Radio className="txt" id={'suspension-reason2'} label={'사진정보오류'} value={'dn02'} checked={suspensionChecked} onChange={onChangeSuspension} />
                            </li>
                            <li>
                              <Radio className="txt" id={'suspension-reason3'} label={'기타'} value={'dn03'} checked={suspensionChecked} onChange={onChangeSuspension} />
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td>
                          <Textarea
                            type="tp1"
                            height={133}
                            placeHolder="보류 사유를 작성해주세요."
                            value={seller.cnclRsnCntn}
                            // onClick
                            disabled={true}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>
              </form>
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={onConfirmSuspension} />
            </div>
          )}
          {/* 추가 END */}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  //==================================모바일 끝================================

  const { seller } = useSelector((state) => state.sellCarStore, []);
  const [callReq, setCallReq] = useState(false);
  const [activeNo, setActiveNo] = useState(0);

  useEffect(() => {
    dispatch(getReqAction(slReqId));
  }, [dispatch, slReqId]);

  /**
   * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
   */
  useEffect(() => {
    // if (isEmpty(reqList)) {
    //   Router.back();
    // }

    if (!callReq) {
      setCallReq(true);
      const params = {
        slReqId
      };

      dispatch(selectSellcarAction(params));
    }
  }, [callReq, dispatch, slReqId]);

  /**
   * req(판매신청)정보도 변경이 되었을 경우 activeNo(진행상태 값)도 변경이 되었을 수 있기 때문에 처리
   */
  useEffect(() => {
    if (!isEmpty(seller)) {
      setActiveNo(REQ_STT[seller.reqTpcd]?.STATE[seller.reqSttTpcd]?.STEPNO);
    }
  }, [seller]);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title">
            <h3 className="border-none">내차 팔기 현황 상세 {seller.reqSttTpcd}</h3>
            <div className="sub-tit-wrap">
              <p>{seller.reqTpcdNm} 판매로 신청하신 내역입니다.</p>
            </div>
          </div>
          <SelfDetail req={seller} activeNo={activeNo} />
        </div>
      </div>
    </AppLayout>
  );
};

/**
 * 설명 : 페이지 렌더링 하기전에 url query로 넘어오는 값을 추출
 * @return {String} slReqId : 판매 신청서 아이디
 */
SelfSellCarView.getInitialProps = async (http) => {
  const { req, query } = http;
  const slReqId = req ? req.query.slReqId : query.slReqId;
  const reqTpcd = req ? req.query.reqtpcd : query.reqtpcd;
  return {
    slReqId,
    reqTpcd
  };
  // return {};
};

SelfSellCarView.propTypes = {
  slReqId: PropTypes.string,
  reqTpcd: PropTypes.string
};

export default SelfSellCarView;
