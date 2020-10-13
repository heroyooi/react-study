/**
 * 설명 : 스마트옥션 출품 차량정보 입력
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction,estimatedWinningBid,consignmentCost,consignmentRequest]
 * @author 박진하
 */
import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import FilterRange from '@lib/share/items/FilterRange';

import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobSearchBid from '@src/components/common/MobSearchBid';
import MobConsignInfo from '@src/components/common/MobConsignInfo';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';
import { getMbInfo, getExhibitCarList, getCommonCodeList, getMnfcCdList, getCashReceiptCodeList, fetchMarketPriceAction } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { numberFormat } from '@src/utils/CommonUtil';

// import EstimatedWinningBid from './estimatedWinningBid';
import ConsignmentCost from './consignmentCost';
const globalThis = require('globalthis')();

/**
 * 설명 : 출품 차량정보를 입력/조회/삭제 하고 탁송신청 페이지를 호출한다.
 * @param {state.autoAuction.exhibitCarList} 출품 차량 목록
 * @returns {carInfo} 차량정보 입력/조회/삭제
 */
const AutoAuctionCarInfo = () => {
  //console.log('*** autoAuctionCarInfo > isLoginLiveCheck', isLoginLiveCheck());
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert, showConfirm, Confirm, initConfirm } = useContext(SystemContext);

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('스마트옥션 출품 서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내 차 출품하기',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
      // 소유구분: 개인은 Default값으로 formData에 업데이트 한다.
      setFormData(
        produce((draft) => {
          draft.ownerTypeCd = mobOwnerTypeCdList[0].codeValue;
        })
      );
    }
  }, []);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    []
  );

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const {
    inputInfo,
    exhibitCarList,
    ownerTypeCdList,
    mobOwnerTypeCdList,
    mnfcCdList,
    mobMnfcCdList,
    cashReceiptCdList,
    mobCashReceiptCdList,
    auctionOngoing,
    mssDvcdList,
    mobMssDvcdList,
    marketPrice
  } = useSelector((state) => state.autoAuction);
  const [formData, setFormData] = useState(inputInfo);
  const [delCarActuId, setDelCarActuId] = useState('');
  const [flag, setFlag] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.
  // const [bidPopup, setBidPopup, openBidPopup, closeBidPopup] = useRodal(false, true); // 예상 낙찰가 조회
  const [consignPopup, setConsignPopup, openConsignPopup, closeConsignPopup] = useRodal(false, true); // 탁송료 안내 팝업
  const [alertPopup, setAlertPopup, openAlertPopup, closeAlertPopup] = useRodal(false, false);
  const [confirmPopup, setConfirmPopup, openConfirmPopup, closeConfirmPopup] = useRodal(false, false); // 차량정보 저장
  const [crInfo, setCrInfo] = useState();

  const [crDtlMdlCdList, setCrDtlMdlCdList] = useState([]); // 세부모델
  const [carCodeList, setCarCodeList] = useState([]); // 차량코드

  const [mobMnfcCdListByCar, setMobMnfcCdListByCar] = useState(mobMnfcCdList); //모델 (모바일)
  const [mobCrDtlMdlCdList, setMobCrDtlMdlCdList] = useState([]); // 세부모델 (모바일)
  const [mobCarCodeList, setMobCarCodeList] = useState([]); // 차량코드 (모바일)

  // 모바일 팝업
  const [filterId, setFilterId] = useState();
  const [addPop, setAddPop, openAddPop, closeDimmAddPop] = useRodal(false);
  const [canclePop, setCanclePop, openCanclePop, closeDimmCanclePop] = useRodal(false);
  const [deletePop, setDeletePop, openDeletePop, closeDimmDeletePop] = useRodal(false);

  // MobSelectBox 선택시 index(value)에 해당하는 code데이터 조회를 위한 선언
  const mobCodeGroup = {
    crMnfcCd: mobMnfcCdListByCar,
    crDtlMdlCd: mobCrDtlMdlCdList,
    carCd: mobCarCodeList,
    ownerTypeCd: mobOwnerTypeCdList,
    cashReceiptCd: mobCashReceiptCdList,
    mssDvcd: mobMssDvcdList
  };

  // 화면 Refresh 여부 감지 (진행상태, Refresh 이후 Redirect URL)
  useDetectPageRefresh(auctionOngoing, '/autoAuction/autoAuctionMain');

  console.log('mobCashReceiptCdList', mobCashReceiptCdList);
  const handleOpenPopup = useCallback(
    (e) => {
      e.preventDefault();
      setConfirmPopup(false);
      setAlertPopup(true);
    },
    [setAlertPopup, setConfirmPopup]
  );
  const handleClosePopup = useCallback(
    (e) => {
      e.preventDefault();
      setConfirmPopup(false);
      setAlertPopup(false);
    },
    [setAlertPopup, setConfirmPopup]
  );

  const floodingRadio = [
    { id: 'flooding_yes', value: 'Y', checked: false, disabled: false, title: '예', label: '예' },
    { id: 'flooding_no', value: 'N', checked: false, disabled: false, title: '아니오', label: '아니오' }
  ];
  const joinRadio = [
    { id: 'join_yes', value: 'Y', checked: false, disabled: false, title: '예', label: '예' },
    { id: 'join_no', value: 'N', checked: false, disabled: false, title: '아니오', label: '아니오' }
  ];
  const operationRadio = [
    { id: 'operation_yes', value: 'Y', checked: false, disabled: false, title: '예', label: '예' },
    { id: 'operation_no', value: 'N', checked: false, disabled: false, title: '아니오', label: '아니오' }
  ];
  const commercialRadio = [
    { id: 'commercial_yes', value: 'Y', checked: false, disabled: false, title: '예', label: '예' },
    { id: 'commercial_no', value: 'N', checked: false, disabled: false, title: '아니오', label: '아니오' }
  ];

  const numberCheck = /^[0-9\b]+$/;
  const korCheck = /[ㄱ-ㅎㅏ-ㅣ가-힣\b]+$/;
  const crNoPattern = /^([가-힣]{2})?[0-9]{2,3}[가-힣]{1}[0-9]{4}$/;

  const handleOnKeyUp = (e) => {
    e.preventDefault();
    for (const val of e.target.value) {
      if (korCheck.test(val)) {
        e.target.value = '';
      }
    }
  };

  const inNumber = (e) => {
    if (!numberCheck.test(e.key)) {
      e.preventDefault();
    }
  };

  const hopePriceCheck = (e) => {
    console.log('hopePriceCheck');
    if (Number(formData.hopePrice) !== 0 && Number(formData.hopePrice) !== 0) {
      if (Number(formData.hopePrice) < Number(formData.starPrice) + 30 || Number(formData.hopePrice) > Number(formData.starPrice) + 80) {
        showAlert('낙찰 희망가는 시작가 보다 30만원 이상 80만원 이하로 등록 가능합니다.', 'error');
        setFormData(
          produce((draft) => {
            draft.hopePrice = 0;
          })
        );
      } else {
        const hopePriceFee = Number(formData.hopePrice) * 0.022;
        setFormData(
          produce((draft) => {
            draft.estimatedPrice = Number(formData.hopePrice) - hopePriceFee;
          })
        );
      }
    }
  };

  const onChangeSelect = (e, target) => {
    const { label, value, subValue, clsCd, dtlClsCd } = hasMobile
      ? {
          label: e.target.dataset.label,
          value: mobCodeGroup[target][e.target.value - 1].codeValue,
          subValue: mobCodeGroup[target][e.target.value - 1].subValue,
          clsCd: mobCodeGroup[target][e.target.value - 1].clsCd,
          dtlClsCd: mobCodeGroup[target][e.target.value - 1].dtlClsCd
        }
      : e;

    setFormData(
      produce((draft) => {
        if (target === 'crMnfcCd') {
          draft.crMnfcCd = value;
          draft.crMdlCd = '';
          draft.crDtlMdlCd = '';
          draft.carCd = '';
          if (value === '') {
            setCrDtlMdlCdList([{ value: '', subValue: '', label: '선택' }]);
            setCarCodeList([{ value: '', subValue: '', clsCd: '', dtlClsCd: '', label: '선택' }]);
            setMobCrDtlMdlCdList([{ codeValue: '', subValue: '', id: 'crDtlMdlCd_1', label: '선택', value: 1, checked: true }]);
            setMobCarCodeList([{ codeValue: '', subValue: '', clsCd: '', dtlClsCd: '', id: 'carCode_1', label: '선택', value: 1, checked: true }]);
          }
        } else if (target === 'crDtlMdlCd') {
          draft.crMdlCd = subValue;
          draft.crDtlMdlCd = value;
          if (value === '') {
            setCarCodeList([{ value: '', subValue: '', clsCd: '', dtlClsCd: '', label: '선택' }]);
            setMobCarCodeList([{ codeValue: '', subValue: '', clsCd: '', dtlClsCd: '', id: 'carCode_1', label: '선택', value: 1, checked: true }]);
          }
        } else if (target === 'carCd') {
          draft.crNm = label;
          draft.carCd = value;
          draft.crClsCd = clsCd;
          draft.crDtlClsCd = dtlClsCd;
        } else if (target === 'cashReceiptCd') {
          console.log('cashReceiptCd 1');
          if (hasMobile) draft[target] = value === '0010' ? 'Y' : value === '0020' ? 'N' : '';
          else draft[target] = value;
          console.log('cashReceiptCd 2');
        } else {
          draft[target] = value;
        }
      })
    );
  };

  const onChangeRadio = (e, target) => {
    const { value } = e.target;

    console.log('onChangeRadio', value, target);
    setFormData(
      produce((draft) => {
        draft[target] = value;
      })
    );
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    console.log('onChangeInput', id, value);
    setFormData(
      produce((draft) => {
        draft[id] = value;
      })
    );
  };

  const carNoFocusOut = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (value === '') return;
    if (!crNoPattern.test(value)) return showAlert('차량번호 형식이 올바르지 않습니다.<br/>차량번호를 확인해주세요.');

    setIsLoading(true);
    axiosPost('/api/autoauction/selectCarmart.do', { crNo: value }).then((data) => {
      setIsLoading(false);
      console.log('carmart result >>>>>', data.data);
      if (data.data.statusinfo.returncd === '000') {
        const carInfo = data.data.data;
        setCrInfo(carInfo);
        setFormData(
          produce((draft) => {
            draft.crNm = carInfo.crMnfcCd !== null ? carInfo.crMnfcCdNm + ' ' + carInfo.crDtlMdlCdNm + ' ' + carInfo.crClsCdNm + ' ' + carInfo.crDtlClsCdNm : '';
            draft.crTypeCd = carInfo.crTypeCd !== null ? carInfo.crTypeCd : '';
            draft.crMnfcCd = carInfo.crMnfcCd !== null ? carInfo.crMnfcCd : '';
            draft.crMdlCd = carInfo.crMdlCd !== null ? carInfo.crMdlCd : '';
            draft.crDtlMdlCd = carInfo.crDtlMdlCd !== null ? carInfo.crDtlMdlCd : '';
            draft.crClsCd = carInfo.crClsCd !== null ? carInfo.crClsCd : '';
            draft.crDtlClsCd = carInfo.crDtlClsCd !== null ? carInfo.crDtlClsCd : '';
            draft.mssDvcd = carInfo.mssDvcd !== null ? carInfo.mssDvcd : '';
            draft.fuelDvcd = carInfo.fuelDvcd !== null ? carInfo.fuelDvcd : '';
            draft.dspl = carInfo.dspl !== null ? carInfo.dspl : '';
          })
        );

        if (hasMobile) {
          // 차량번호에 해당하는 제조사
          setMobMnfcCdListByCar(
            mobMnfcCdListByCar.map((code) => {
              const newCode = Object.assign({}, code);
              if (code.codeValue === Number(carInfo.crMnfcCd)) {
                newCode.checked = true;
              } else {
                newCode.checked = false;
              }
              return newCode;
            })
          );
        }
      } else {
        setCrInfo('');
        setFormData(
          produce((draft) => {
            draft.crNm = '';
            draft.crTypeCd = '';
            draft.crMnfcCd = '';
            draft.crMdlCd = '';
            draft.crDtlMdlCd = '';
            draft.crClsCd = '';
            draft.crDtlClsCd = '';
            draft.mssDvcd = '';
            draft.fuelDvcd = '';
            draft.dspl = '';
          })
        );

        if (hasMobile) {
          // 차량번호에 해당하는 제조사
          setMobMnfcCdListByCar(
            mobMnfcCdListByCar.map((code) => {
              const newCode = Object.assign({}, code);
              if (code.codeValue === '') {
                newCode.checked = true;
              } else {
                newCode.checked = false;
              }
              return newCode;
            })
          );
        }
        showAlert(data.data.statusinfo.returnmsg);
      }
    });
  };

  const onSearchPrice = (e) => {
    e.preventDefault();
    if (formData?.crNo === null || formData?.crNo === '' || formData?.crNo === undefined) {
      return showAlert('차량번호를 먼저 입력해주세요.');
    }
    if (crInfo === undefined || crInfo === null) {
      return showAlert('차량정보가 존재하지 않습니다.');
    }
    setIsLoading(true);
    dispatch(fetchMarketPriceAction(crInfo)).then(() => setIsLoading(false)); //시세조회
  };

  const carInfoSave = (e) => {
    e.preventDefault();
    setFlag(1);
    if (formData.ownerNm === '') {
      showAlert('차주명을 입력하세요.');
      return;
    } else if (formData.crNo === '') {
      showAlert('차량번호를 입력하세요.');
      return;
    } else if (formData.crMnfcCd === '') {
      showAlert('제조사를 선택하세요.');
      return;
    } else if (formData.crMdlCd === '') {
      showAlert('모델을 선택하세요.');
      return;
    } else if (formData.crDtlMdlCd === '') {
      showAlert('세부모델을 선택하세요.');
      return;
    } else if (formData.drvDist === '') {
      showAlert('주행거리를 입력하세요.');
      return;
    } else if (formData.mssDvcd === '') {
      showAlert('미션을 선택하세요.');
      return;
    } else if (formData.ownerTypeCd === '') {
      showAlert('소유구분을 선택하세요.');
      return;
    } else if (formData.floodingYn === '') {
      showAlert('침수 이력 여부를 선택하세요.');
      return;
    } else if (formData.joinYn === '') {
      showAlert('접합 수리 이력 여부를 선택하세요.');
      return;
    } else if (formData.operationYn === '') {
      showAlert('주행거리 기록장치 변경/수리 여부를 선택하세요.');
      return;
    } else if (formData.commercialYn === '') {
      showAlert('영업용 사용 이력 여부를 선택하세요.');
      return;
    } else if (formData.starPrice === '' || formData.starPrice === 0) {
      showAlert('경매 시작가를 입력하세요.');
      return;
    } else if (formData.hopePrice === '' || formData.starPrice === 0) {
      showAlert('낙찰 희망가를 입력하세요.');
      return;
    } else if (formData.cashReceiptCd === '') {
      showAlert('현금영수증을 선택하세요.');
      return;
    }

    if (!crNoPattern.test(formData.crNo)) {
      showAlert('차량번호 형식에 맞게 입력해 주세요. \n예) 12가3456 또는 서울12나3456');
      return;
    }

    if (formData.floodingYn === 'Y' || formData.joinYn === 'Y') {
      showAlert('침수 또는 접합수리 이력이 있는 차량은 출품이 불가능합니다.');
      return;
    }
    setFlag(2);

    setIsLoading(true);
    axiosPost('/api/autoauction/insertCarInfo.do', formData).then(({ data }) => {
      setIsLoading(false);
      if (data.statusinfo.returncd === '000') {
        setIsLoading(true);
        dispatch(getExhibitCarList(formData.auctId)).then(() => setIsLoading(false));
        if (hasMobile) {
          setAddPop(true);
        } else {
          openConfirmPopup(e, 'fade');
        }
      } else if (data.statusinfo.returncd === '001') {
        showAlert('차량정보 저장 실패\n관리자에게 문의 바랍니다.', 'error');
      } else {
        console.log('errorCd >>', data.statusinfo.returncd);
        console.log('errorMsg >>', data.statusinfo.returnmsg);
        showAlert(data.statusinfo.returnmsg, 'error');
      }
    });
  };

  const onClickDelete = (e, actuId) => {
    e.preventDefault();
    setDelCarActuId(actuId);
    showConfirm('차량을 삭제하시겠습니까?', 'delete');
  };

  const nextStep = (e, url) => {
    e.preventDefault();
    if (exhibitCarList?.length > 0) {
      console.log(url);
      setIsLoading(true);
      Router.push(url).then(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      });
    } else {
      showAlert("먼저 '차량 정보 저장하기'를 통해 출품 목록에 차량 정보를 추가한 후, 다음 단계에서 탁송 신청을 진행해주세요.");
      return;
    }
  };

  useEffect(() => {
    if (Confirm.state === 'success') {
      if (Confirm.callback === 'delete') {
        setIsLoading(true);
        axiosPost('/api/autoauction/deleteExhibitCar.do', { actuId: delCarActuId }).then(({ data }) => {
          setIsLoading(false);
          if (data.statusinfo.returncd === '000') {
            showAlert('삭제 되었습니다.', 'ok');
            setDelCarActuId('');
            setIsLoading(true);
            dispatch(getExhibitCarList(formData.auctId)).then(() => setIsLoading(false));
          } else {
            console.log('errorCd >>', data.statusinfo.returncd);
            console.log('errorMsg >>', data.statusinfo.returnmsg);
            showAlert(data.statusinfo.returnmsg, 'error');
          }
        });
      }
    }
  }, [Confirm]);

  useEffect(() => {
    /* 제조사 선택으로 인한 모델 조회 */
    setIsLoading(true);
    axiosPost('/api/autoauction/selectModelList.do', { mnfcCd: formData.crMnfcCd }).then(({ data }) => {
      setIsLoading(false);
      if (hasMobile) {
        const mobModelList = [{ codeValue: '', subValue: '', id: 'crDtlMdlCd_1', label: '선택', value: 1, checked: formData.crDtlMdlCd ? false : true }];
        if (data.statusinfo.returncd === '000') {
          data.data.map((list, i) => {
            mobModelList.push({
              codeValue: list.DELMDLCD,
              subValue: list.MDLCD,
              id: `crMdlCd_${i + 2}`,
              label: list.DTLMDLNM,
              value: i + 2,
              checked: formData.crDtlMdlCd && Number(formData.crDtlMdlCd) === list.DTLMDLCD ? true : false
            });
          });
        }
        setMobCrDtlMdlCdList(mobModelList);
        if (formData.crDtlMdlCd === undefined || formData.crDtlMdlCd === null || formData.crDtlMdlCd === '') {
          setMobCrDtlMdlCdList([{ codeValue: '', subValue: '', id: 'crDtlMdlCd_1', label: '선택', value: 1, checked: true }]);
        }
      } else {
        if (data.statusinfo.returncd === '000') {
          const dtlModelList = [{ value: '', subValue: '', label: '선택' }];
          data.data.map((list) => {
            dtlModelList.push({ value: list.DTLMDLCD, label: list.DTLMDLNM, subValue: list.MDLCD });
          });
          setCrDtlMdlCdList(dtlModelList);
        }
      }
    });
  }, [formData?.crMnfcCd]);

  useEffect(() => {
    /* 모델 선택으로 인한 세부모델 조회 */
    setIsLoading(true);
    axiosPost(`/api/autoauction/selectCarCodeList.do?`, { mnfcCd: formData.crMnfcCd, dtlMdlCd: formData.crDtlMdlCd }).then(({ data }) => {
      setIsLoading(false);
      if (hasMobile) {
        const mobCarCodeList = [{ codeValue: '', subValue: '', clsCd: '', dtlClsCd: '', id: 'carCode_1', label: '선택', value: 1, checked: formData.crDtlMdlCd ? false : true }];
        if (data.statusinfo.returncd === '000') {
          data.data.map((list, i) => {
            mobCarCodeList.push({
              codeValue: list.CARCD,
              subValue: list.CRSUBVALUE,
              clsCd: list.CRCLSCD,
              dtlClsCd: list.CRDTLCLSCD,
              id: `carCode_${i + 2}`,
              label: list.CRNM,
              value: i + 2,
              checked: formData.carCd === list.CARCD ? true : false
            });
          });
        }
        setMobCarCodeList(mobCarCodeList);
      } else {
        if (data.statusinfo.returncd === '000') {
          const carCodeList = [{ value: '', subValue: '', clsCd: '', dtlClsCd: '', label: '선택' }];
          data.data.map((list) => {
            carCodeList.push({ value: list.CARCD, subValue: list.CRSUBVALUE, clsCd: list.CRCLSCD, dtlClsCd: list.CRDTLCLSCD, label: list.CRNM });
          });
          setCarCodeList(carCodeList);
        }
      }
    });
  }, [formData?.crDtlMdlCd]);

  useEffect(() => {
    if (carCodeList && formData.crMnfcCd && formData.crMdlCd && formData.crDtlMdlCd && formData.crClsCd && formData.crDtlClsCd) {
      const subVal = String(formData.crMnfcCd) + String(formData.crMdlCd) + String(formData.crDtlMdlCd) + String(formData.crClsCd) + String(formData.crDtlClsCd);
      setFormData(
        produce((draft) => {
          carCodeList.map((v) => {
            if (v.subValue === subVal) draft.carCd = v.value;
          });
        })
      );
    }
  }, [carCodeList, formData]);

  if (hasMobile) {
    const handleDeleteBefore = (actuId) => (e) => {
      e.preventDefault();
      setFilterId(actuId);
      setDeletePop(true);
    };
    const handleDelete = (id) => (e) => {
      e.preventDefault();
      //const copyList = [...carList].filter((list) => list.id !== id);
      //setCarList(copyList);
      setDeletePop(false);

      // PC와 분리하여 별도 실행 (PC용 호출시 component refresh 되는 현상 있음)
      setIsLoading(true);
      axiosPost('/api/autoauction/deleteExhibitCar.do', { actuId: id }).then(({ data }) => {
        setIsLoading(false);
        if (data.statusinfo.returncd === '000') {
          showAlert('삭제 되었습니다.', 'ok');
          setIsLoading(true);
          dispatch(getExhibitCarList(formData.auctId)).then(() => setIsLoading(false));
        } else {
          console.log('errorCd >>', data.statusinfo.returncd);
          console.log('errorMsg >>', data.statusinfo.returnmsg);
          showAlert(data.statusinfo.returnmsg, 'error');
        }
      });
      //onClickDelete(e, id);
    };

    const [fpBid, setFpBid] = useState(false);
    const [fpConsign, setFpConsign] = useState(false);
    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'bid') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '경매 낙찰가 조회',
              options: ['close']
            }
          });
          setFpConsign(false);
          setFpBid(true);
        } else if (name === 'consign') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '탁송료 안내',
              options: ['close']
            }
          });
          setFpBid(false);
          setFpConsign(true);
        }
      },
      [fpBid, fpConsign]
    );

    // 모바일 팝업
    const closeCanclePop = useCallback((e) => {
      e.preventDefault();
      setAddPop(false);
      setCanclePop(false);
    }, []);
    const closeDeletePop = useCallback((e) => {
      e.preventDefault();
      setDeletePop(false);
    }, []);
    const [bidTooltip, steBidTooltip] = useState(false);
    const onOpenBidTooltip = useCallback((e) => {
      e.preventDefault();
      onSearchPrice(e);
      steBidTooltip(true);
    }, []);
    const onCloseBidTooltip = useCallback((e) => {
      e.preventDefault();
      steBidTooltip(false);
    }, []);
    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={4} mode="stick" />
        </div>
        <div className="auction-sec">
          <div className="content-wrap auction-tb-wrap">
            <div className="auction-tit">
              <h4 className="tit2">차량정보</h4>
            </div>
            <form className="auction-form step4">
              <fieldset>
                <legend className="away">회원정보 등록</legend>
                <table summary="회원정보 등록에 대한 내용" className="table-tp3">
                  <caption className="away">회원정보 등록</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차주명</th>
                      <td>
                        <Input id="ownerNm" type="text" value={formData?.ownerNm} onChange={onChangeInput} />
                        {flag === 1 && isEmpty(formData.ownerNm) && <p className="tx-sub tx-red80">차주명을 입력해주세요.</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>차량번호</th>
                      <td>
                        <Input id="crNo" type="text" value={formData?.crNo} onChange={onChangeInput} onBlur={carNoFocusOut} />
                        {flag === 1 && isEmpty(formData.crNo) && <p className="tx-sub tx-red80">차량번호를 입력해주세요.</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>차종</th>
                      <td>
                        <span className="bridge2">
                          <MobSelectBox placeHolder="선택" id="car-manufacturer" options={mobMnfcCdListByCar} onChange={(e) => onChangeSelect(e, 'crMnfcCd')} />
                        </span>
                        <span className="bridge2">
                          <MobSelectBox placeHolder="선택" id="car-model-detail" options={mobCrDtlMdlCdList} onChange={(e) => onChangeSelect(e, 'crDtlMdlCd')} />
                        </span>
                        <span className="bridge2">
                          <MobSelectBox placeHolder="선택" id="car-code" options={mobCarCodeList} onChange={(e) => onChangeSelect(e, 'carCd')} />
                        </span>
                        {/*<span className="bridge2">
                          <MobSelectBox placeHolder="제조사" id="car-manufacturer" options={mobMnfcCdList} onChange={(e) => onChangeSelect(e, 'crMnfcCd')} />
                        </span>
                        <span className="bridge2">
                          <MobSelectBox placeHolder="모델" id="car-model" options={mobCrMdlCdList} onChange={(e) => onChangeSelect(e, 'crMdlCd')} />
                        </span>
                        <span className="bridge2">
                          <MobSelectBox placeHolder="세부모델" id="car-model-detail" options={mobCrDtlMdlCdList} onChange={(e) => onChangeSelect(e, 'crDtlMdlCd')} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" placeHolder="모델이 없는 경우 직접 입력하세요" />
                        </span>*/}
                        {flag === 1 && (formData.crMnfcCd === '' || formData.crDtlMdlCd === '' || formData.carCd === '') && <p className="tx-sub tx-red80">차종을 선택해주세요.</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        주행거리<em>(선택)</em>
                      </th>
                      <td>
                        <Input type="text" id="drvDist" placeHolder="" value={formData?.drvDist} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} maxLength={8} onChange={onChangeInput} />
                        {flag === 1 && isEmpty(formData.drvDist) && <p className="tx-sub tx-red80">주행거리를 입력해주세요.</p>}
                      </td>
                    </tr>
                    {/* 차량 변속기 추가 : 20.04.24 */}
                    <tr>
                      <th>변속기</th>
                      <td>
                        <MobSelectBox placeHolder="선택" options={mobMssDvcdList} value={formData?.mssDvcd} onChange={(e) => onChangeSelect(e, 'mssDvcd')} />
                        {flag === 1 && isEmpty(formData.mssDvcd) && <p className="tx-sub tx-red80">변속기를 선택해주세요.</p>}
                      </td>
                    </tr>
                    {/* 차량 변속기 */}
                    <tr>
                      <th>소유구분</th>
                      <td>
                        <MobSelectBox placeHolder="선택" options={mobOwnerTypeCdList} value={formData?.ownerTypeCd} onChange={(e) => onChangeSelect(e, 'ownerTypeCd')} />
                        {flag === 1 && isEmpty(formData.ownerTypeCd) && <p className="tx-sub tx-red80">소유구분을 선택해주세요.</p>}
                      </td>
                    </tr>
                    <tr>
                      <th className="ver-t">확인사항</th>
                      <td>
                        <p className="tx-tp3 tx-blue80">※ 침수나 접합 수리 이력이 있을 경우 경매에 출품할 수 없습니다.</p>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">침수 이력이 있습니까?</p>
                          <RadioGroup dataList={floodingRadio} defaultValue={0} className="fl mt8" value={formData?.floodingYn} onChange={(e) => onChangeRadio(e, 'floodingYn')} />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">접합 수리 이력이 있습니까?</p>
                          <RadioGroup dataList={joinRadio} defaultValue={0} className="fl mt8" value={formData?.joinYn} onChange={(e) => onChangeRadio(e, 'joinYn')} />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">주행거리 기록장치의 변경, 수리 경험이 있습니까?</p>
                          <RadioGroup dataList={operationRadio} defaultValue={0} className="fl mt8" value={formData?.operationYn} onChange={(e) => onChangeRadio(e, 'operationYn')} />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">영업용(텐트, 택시 등) 으로 사용된 적이 있습니까?</p>
                          <RadioGroup dataList={commercialRadio} defaultValue={0} className="fl mt8" value={formData?.commercialYn} onChange={(e) => onChangeRadio(e, 'commercialYn')} />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="auction-tit mt48 float-wrap btn-s">
                  <h4 className="tit2 fl">판매 희망가</h4>
                  <span className="bridge2 fr tx-r">
                    {/* <Button size="sml" line="gray" radius={true} title="경매 낙찰가 조회" measure={true} width={50} height={30} onClick={handleFullpagePopup('bid')} /> */}
                    <Button size="sml" line="gray" radius={true} title="현재 시세 조회" measure={true} width={50} height={30} onClick={onOpenBidTooltip} />
                    <div className="caroption-exp" style={bidTooltip ? { display: 'block' } : { display: 'none' }}>
                      <i className="edge center" />
                      <span className="close" onClick={onCloseBidTooltip} />
                      <div className="market-price-graph v-auction">
                        <div className="market-graph-box">
                          <div className="market-graph-view">
                            <img className="graph-bg" src="/images/contents/market-price-range.png" alt="" />
                            <p className="price-tit">
                              적정시세범위
                              <br />
                              (단위:만원)
                            </p>
                            <dl className="price-box price-current">
                              <dt>현재내차시세</dt>
                              <dd>{marketPrice?.appPrice ? numberFormat(Math.floor(marketPrice?.appPrice)) : 0}</dd>
                            </dl>
                            <dl className="price-box price-min">
                              <dt>최저적정시세</dt>
                              <dd>{marketPrice?.minPrice ? numberFormat(Math.floor(marketPrice?.minPrice)) : 0}</dd>
                            </dl>
                            <dl className="price-box price-max">
                              <dt>최고적정시세</dt>
                              <dd>{marketPrice?.maxPrice ? numberFormat(Math.floor(marketPrice?.maxPrice)) : 1}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sml" line="gray" radius={true} title="탁송료 안내" measure={true} width={37} height={30} marginLeft={8} onClick={handleFullpagePopup('consign')} />
                  </span>
                  <p className="tx-tp3 mt16">
                    ※ 희망 판매가가 너무 높으면 구매자의 관심을 끌기 어려우며 판매가 지연될 수 있습니다. 현재 시세를 참고하시어 가격을 결정하시면 보다 원활한 거래가 이뤄질 수 있습니다.
                  </p>
                </div>
                <legend className="away">판매 희망가</legend>
                <table summary="판매 희망가에 대한 내용" className="table-tp3">
                  <caption className="away">판매 희망가</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>시작가</th>
                      <td>
                        <Input
                          type="text"
                          id="starPrice"
                          className="w-price manwon"
                          value={formData?.starPrice}
                          onKeyPress={inNumber}
                          onKeyUp={handleOnKeyUp}
                          placeType={4}
                          onChange={onChangeInput}
                          onFocus={(e) => {
                            e.target.select();
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="ver-t">낙찰 희망가</th>
                      <td>
                        <span className="bridge2">
                          <Input
                            type="text"
                            id="hopePrice"
                            className="w-price manwon"
                            value={formData?.hopePrice}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            onBlur={hopePriceCheck}
                            placeType={4}
                            onChange={onChangeInput}
                            onFocus={(e) => {
                              e.target.select();
                            }}
                          />
                        </span>
                        <p className="tx-sub tx-blue80">※ 낙찰 희망가는 시작가 보다 30만원 이상 80만원 이하로 등록 가능합니다.</p>
                        <p className="tx-tp3 tx-blue80">
                          ※ 출품 수수료 : 22,000원
                          <br />
                          낙찰 수수료 : 낙찰임금의 2.2% (110,000원~440,000원)
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>예상 판매가</th>
                      <td>
                        <Input type="text" id="estimatedPrice" disabled={true} className="w-price manwon" value={formData?.estimatedPrice} />
                        {/*}<p className="tx-sub tx-red80 mt10">예상 판매가를 입력해주세요.</p>{*/}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="auction-tit mt48">
                  <h4 className="tit2">현금영수증</h4>
                  <p className="tx-tp3 mt16">
                    ※ 여러 대의 차량을 등록 후 함께 출품할 수 있습니다. ‘차량 정보 저장’을 통해 출품 목록에 차량 정보를 추가한 후 탁송 신청까지 완료하셔야 출품 신청이 완료됩니다.
                  </p>
                </div>
                <legend className="away">현금영수증</legend>
                <table summary="현금영수증에 대한 내용" className="table-tp3">
                  <caption className="away">현금영수증</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>발급대상</th>
                      <td>
                        <MobSelectBox id="cashReceiptCd" placeHolder="선택" options={mobCashReceiptCdList} onChange={(e) => onChangeSelect(e, 'cashReceiptCd')} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </form>
            <Buttons align="center" marginTop={48}>
              <Button size="full" background="blue20" color="blue80" radius={true} title="차량정보 저장" onClick={carInfoSave} />
            </Buttons>
            <p className="tx-tp3 tx-blue80 mt16">※ 먼저 ‘차량 정보 저장하기’를 통해 출품 목록에 차량 정보를 추가 한 후, 다음 단계에서 탁송 신청을 진행해주세요.</p>
          </div>

          {/* 출품차량목록 */}
          {exhibitCarList?.length > 0 && (
            <div className="auction-exhibit-wrap">
              <div className="content-wrap">
                <div className="auction-tit">
                  <h4 className="tit2">출품 차량 목록</h4>
                </div>
                <ul className="exhibit-list mt16">
                  {exhibitCarList.map((v, i) => {
                    return (
                      <li className="select-car" key={i}>
                        <div className="info">
                          <span>{v.crNo}</span>
                          <span>{v.ownerNm}</span>
                        </div>
                        <h4 className="subject mt8">{v.crNm}</h4>
                        <div className="price-wrap mt8">
                          <div className="price-left fl">
                            <p className="price-tp1">{nf.format(v.starPrice / 10000)}</p>
                          </div>
                          <div className="price-right fr">
                            <p className="price-tit">낙찰 희망가</p>
                            <p className="price-tp2">
                              {nf.format(v.hopePrice / 10000)}
                              <span className="won">만원</span>
                            </p>
                          </div>
                        </div>
                        <a href="#" className="popup-close" onClick={handleDeleteBefore(v.actuId)} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <Button className="fixed" size="full" background="blue80" title="다음" onClick={(e) => nextStep(e, '/autoAuction/consignmentRequest')} />
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={0}>
          {fpBid && <MobSearchBid />}
          {fpConsign && <MobConsignInfo />}
        </MobFullpagePopup>

        <RodalPopup show={addPop} type={'fade'} closedHandler={closeDimmAddPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              입력하신 차량이 저장되었습니다.
              <br />
              출품차량을 추가하사겠습니까?
            </p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={(e) => openCanclePop(e, 'fade')} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={closeCanclePop} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={canclePop} type={'fade'} closedHandler={closeDimmCanclePop} isMask={false} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">다음단계에서 탁송 신청을 진행해주세요.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeCanclePop} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={deletePop} type={'fade'} closedHandler={closeDimmDeletePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">차량을 삭제하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeDeletePop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleDelete(filterId)} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 스마트옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={3} />
      </div>
      <div className="content-sec auction-sec">
        <div className="content-wrap">
          <div className="auction-tit">
            <h4>차량정보</h4>
            <h5>차량정보 등록</h5>
          </div>
          <form className="auction-form">
            <fieldset>
              <legend className="away">회원정보 등록</legend>
              <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                <caption className="away">회원정보 등록</caption>
                <colgroup>
                  <col width="12.67%" />
                  <col width="37.77%" />
                  <col width="12.68%" />
                  <col width="37.78%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차주명</th>
                    <td>
                      <Input id="ownerNm" type="text" width={258} value={formData?.ownerNm} onChange={onChangeInput} />
                      {flag === 1 && formData.ownerNm === '' && <p className="p-feedback">차주명을 입력해주세요.</p>}
                    </td>
                    <th>차량번호</th>
                    <td>
                      <Input id="crNo" type="text" width={258} value={formData?.crNo} onChange={onChangeInput} onBlur={carNoFocusOut} />
                      {flag === 1 && formData.crNo === '' && <p className="p-feedback">차량번호를 입력해주세요.</p>}
                    </td>
                  </tr>
                  <tr>
                    <th>차종</th>
                    <td colSpan="3">
                      <span className="bridge">
                        <SelectBox id="crMnfcCd" className="items-sbox" options={mnfcCdList} width={253} height={48} value={formData?.crMnfcCd} onChange={(e) => onChangeSelect(e, 'crMnfcCd')} />
                      </span>
                      <span className="bridge">
                        <SelectBox
                          id="crDtlMdlCd"
                          className="items-sbox"
                          options={crDtlMdlCdList}
                          width={315}
                          height={48}
                          value={formData?.crDtlMdlCd}
                          onChange={(e) => onChangeSelect(e, 'crDtlMdlCd')}
                        />
                      </span>
                      <span className="bridge">
                        <SelectBox id="carCd" className="items-sbox" options={carCodeList} width={380} height={48} value={formData?.carCd} onChange={(e) => onChangeSelect(e, 'carCd')} />
                      </span>
                      {flag === 1 && (formData.crMnfcCd === '' || formData.crDtlMdlCd === '' || formData.carCd === '') && <p className="p-feedback">차종을 선택해주세요.</p>}
                    </td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td colSpan="3">
                      <label htmlFor="drvDist" className="hide">
                        주행거리
                      </label>
                      <Input id="drvDist" type="text" width={258} value={formData?.drvDist} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} maxLength={8} onChange={onChangeInput} />
                      <em>km</em>
                      {flag === 1 && formData.drvDist === '' && <p className="p-feedback">주행거리를 입력해주세요.</p>}
                    </td>
                  </tr>
                  {/* 차량 변속기 추가 : 20.04.24 */}
                  <tr>
                    <th>변속기</th>
                    <td colSpan="3">
                      <RadioGroup dataList={mssDvcdList} defaultValue={'0000'} value={formData?.mssDvcd} onChange={(e) => onChangeRadio(e, 'mssDvcd')} />
                      {flag === 1 && formData.mssDvcd === '' && <p className="p-feedback">변속기를 선택해주세요.</p>}
                    </td>
                  </tr>
                  {/* 차량 변속기 */}
                  <tr>
                    <th>소유구분</th>
                    <td colSpan="3">
                      <RadioGroup dataList={ownerTypeCdList} defaultValue={'0000'} value={formData?.ownerTypeCd} onChange={(e) => onChangeRadio(e, 'ownerTypeCd')} />
                      {flag === 1 && formData.ownerTypeCd === '' && <p className="p-feedback">소유구분을 선택해주세요.</p>}
                    </td>
                  </tr>
                  <tr>
                    <th>확인사항</th>
                    <td colSpan="3">
                      <table summary="차량등록정보 확인사항" className="table-tp1" style={{ border: '0px' }}>
                        <caption className="away">차량등록정보 확인사항</caption>
                        <colgroup>
                          <col width="40%" />
                          <col width="60%" />
                        </colgroup>
                        <tbody>
                          <tr style={{ border: '0px' }}>
                            <td style={{ border: '0px', paddingLeft: '20px' }}>
                              <ul>
                                <li style={{ listStyleType: 'disc', padding: '5px', fontWeight: 'bold' }}>
                                  <p className="tx-blue80">침수 이력이 있습니까?</p>
                                </li>
                                <li style={{ listStyleType: 'disc', padding: '5px', fontWeight: 'bold' }}>
                                  <p className="tx-blue80">접합 수리 이력이 있습니까?</p>
                                </li>
                                <li style={{ listStyleType: 'disc', padding: '5px' }}>주행거리 기록장치의 변경, 수리 경험이 있습니까?</li>
                                <li style={{ listStyleType: 'disc', padding: '5px' }}>영업용(렌트, 택시 등)으로 사용된 적이 있습니까?</li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                <li style={{ padding: '5px' }}>
                                  <RadioGroup dataList={floodingRadio} defaultValue={'0'} value={formData?.floodingYn} onChange={(e) => onChangeRadio(e, 'floodingYn')} />
                                </li>
                                <li style={{ padding: '5px' }}>
                                  <RadioGroup dataList={joinRadio} defaultValue={'0'} value={formData?.joinYn} onChange={(e) => onChangeRadio(e, 'joinYn')} />
                                </li>
                                <li style={{ padding: '5px' }}>
                                  <RadioGroup dataList={operationRadio} defaultValue={'0'} value={formData?.operationYn} onChange={(e) => onChangeRadio(e, 'operationYn')} />
                                </li>
                                <li style={{ padding: '5px' }}>
                                  <RadioGroup dataList={commercialRadio} defaultValue={'0'} value={formData?.commercialYn} onChange={(e) => onChangeRadio(e, 'commercialYn')} />
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="tb-sinfo">
                        <span>※</span>침수나 접합 수리 이력이 있을 경우 경매에 출품할 수 없습니다.
                      </p>
                      {flag === 1 && (formData.floodingYn === '' || formData.joinYn === '' || formData.operationYn === '' || formData.commercialYn === '') && (
                        <p className="p-feedback">확인사항을 모두 선택해주세요.</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>판매 희망가</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <span className="bridge w-price">
                          <Input
                            type="text"
                            id="starPrice"
                            width={494}
                            paddingLeft={105}
                            paddingRight={55}
                            value={formData?.starPrice}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                          />
                          <span className="unit unit-s">시작가</span>
                          <span className="unit unit-e">만원</span>
                        </span>
                        <Tooltip placement="right" event="click" exception="tooltip-price-grade">
                          <TooltipItem>
                            <Button size="mid" background="gray" title="현재 시세 조회" width={160} height={48} onClick={onSearchPrice} />
                          </TooltipItem>
                          <TooltipCont>
                            <div className="price-grade-tp2">
                              <div className="cur-price">
                                <p className="veiw-point-tit">
                                  이 차량의 현재 시세<span> (단위:만원)</span>
                                </p>
                                <div className="proper-price">
                                  <FilterRange
                                    rangeUnit="적정시세"
                                    initMin={Math.floor(marketPrice?.minPrice) || 0}
                                    initMax={Math.floor(marketPrice?.maxPrice) || 1}
                                    appPrice={Math.floor(marketPrice?.appPrice) || 0}
                                    priceSolo={true}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </TooltipCont>
                        </Tooltip>
                        {/* <Button size="mid" background="gray" title="예상 낙찰가 조회" width={160} height={48} onClick={openBidPopup} /> */}
                      </span>
                      <span className="bridge2">
                        <span className="bridge w-price">
                          <Input
                            type="text"
                            id="hopePrice"
                            width={494}
                            paddingLeft={105}
                            paddingRight={55}
                            value={formData?.hopePrice}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            onBlur={hopePriceCheck}
                            placeType={4}
                            onChange={onChangeInput}
                          />
                          <span className="unit unit-s">낙찰 희망가</span>
                          <span className="unit unit-e">만원</span>
                        </span>
                        <span className="tip">
                          · 낙찰 희망가는 시작가 보다 30만원 이상 80만원 이하로 등록 가능합니다.
                          <br />· 출품수수료 : 22,000원 / 낙찰수수료 : 낙찰대금의 2.2% (110,000원 ~ 440,000원)
                        </span>
                      </span>
                      <span className="bridge2">
                        <span className="bridge w-price">
                          <Input type="text" id="estimatedPrice" width={494} paddingLeft={105} paddingRight={55} disabled={true} value={formData?.estimatedPrice} />
                          <span className="unit unit-s">예상 판매가</span>
                          <span className="unit unit-e">만원</span>
                        </span>
                        <Button size="mid" background="gray" title="(별도) 탁송료 안내" width={160} height={48} onClick={(e) => openConsignPopup(e, 'fade')} />
                      </span>
                      <p className="tb-sinfo">
                        <span>※</span>희망 판매가가 너무 높으면 구매자의 관심을 끌기 어려우며 판매가 지연될 수 있습니다. <br />
                        현재 시세를 참고하시어 가격을 결정하시면 보다 원활한 거래가 이뤄질 수 있습니다.
                      </p>
                      {flag === 1 &&
                        (formData.starPrice < 1 ? <p className="p-feedback">시작가를 입력해주세요.</p> : formData.hopePrice < 1 ? <p className="p-feedback">낙찰 희망가를 입력해주세요.</p> : '')}
                    </td>
                  </tr>
                  <tr>
                    <th>현금 영수증</th>
                    <td colSpan="3">
                      <SelectBox
                        id="cashReceiptCd"
                        className="items-sbox"
                        options={cashReceiptCdList}
                        width={253}
                        height={48}
                        value={formData?.cashReceiptCd}
                        onChange={(e) => onChangeSelect(e, 'cashReceiptCd')}
                      />
                      <p className="tb-sinfo">
                        <span>※</span>출품/낙찰수수료 및 탁송료 거래 발생시 현금영수증 발급대상을 선택하여 주십시오. (법인인 경우 세금계산서 발행)
                      </p>
                      {flag === 1 && formData.cashReceiptCd === '' && <p className="p-feedback">현금 영수증을 선택해주세요.</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="tail-info">
                <span>※</span>여러 대의 차량을 등록 후 함께 출품할 수 있습니다. &apos;차량 정보 저장하기&apos;를 통해 출품 목록에 차량 정보를 추가한 후, 탁송 신청까지 완료하셔야 출품 신청이
                완료됩니다.
              </p>
              <Buttons align="center" marginTop={60}>
                <Button size="big" line="black" color="darkgray" title="차량정보 저장하기" width={220} height={60} onClick={carInfoSave} />
              </Buttons>
            </fieldset>
          </form>
        </div>
        <div className="auction-exhibit-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h5>출품 차량 목록</h5>
            </div>
            <table summary="출품 차량 목록" className="table-tp1 th-c td-c mt32">
              <caption className="away">출품 차량 목록</caption>
              <colgroup>
                <col width="*" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="60px" />
              </colgroup>
              <thead>
                <tr>
                  <th>모델명</th>
                  <th>차량번호</th>
                  <th>차주명</th>
                  <th>시작가</th>
                  <th>낙찰 희망가</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {exhibitCarList ? (
                  exhibitCarList.map((lists, index) => {
                    return (
                      <tr key={index}>
                        <td className="tl">{lists.crNm}</td>
                        <td>{lists.crNo}</td>
                        <td>{lists.ownerNm}</td>
                        <td>{nf.format(lists.starPrice / 10000)}만원</td>
                        <td>{nf.format(lists.hopePrice / 10000)}만원</td>
                        <td>
                          <i className="ico-delete" onClick={(e) => onClickDelete(e, lists.actuId)} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">출품중인 차량이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="tail-info-wrap w-line">
              <p className="tail-info">
                <span>※</span>먼저 &apos;차량 정보 저장하기&apos;를 통해 출품 목록에 차량 정보를 추가한 후, 다음 단계에서 탁송 신청을 진행해주세요.
              </p>
            </div>
            <Buttons align="center" marginTop={60}>
              <Button size="big" background="blue80" title="다음 단계로" width={240} height={72} onClick={(e) => nextStep(e, '/autoAuction/consignmentRequest')} />
            </Buttons>
          </div>
        </div>
      </div>
      <RodalPopup show={confirmPopup} type={'fade'} width={380} closedHandler={closeConfirmPopup} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
        <div className="con-wrap compact">
          <p>
            입력하신 차량이 저장되었습니다.
            <br /> 출품 차량을 추가하시겠습니까?
          </p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={handleOpenPopup} />
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={handleClosePopup} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={alertPopup} type={'fade'} width={380} closedHandler={closeAlertPopup} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>다음단계에서 탁송 신청을 진행해주세요.</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={handleClosePopup} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* <EstimatedWinningBid show={bidPopup} onChange={closeBidPopup} /> */}
      <ConsignmentCost show={consignPopup} onChange={closeConsignPopup} />
    </AppLayout>
  );
};

AutoAuctionCarInfo.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const userId = Cookies.get('id');
  // Is not defined 현상으로 주석처리
  /*if (userId === undefined || userId === '') {    
    alert('로그인이 필요합니다.');
    Router.push('/login');
  }*/
  const auctId = reduxStore.getState().autoAuction.inputInfo.auctId;
  await reduxStore.dispatch(getMbInfo(userId)); // 회원정보
  await reduxStore.dispatch(getCommonCodeList('FM015')); // 소유구분
  await reduxStore.dispatch(getCommonCodeList('FM020')); // 현금영수증
  await reduxStore.dispatch(getCashReceiptCodeList()); // 현금영수증(경매)
  await reduxStore.dispatch(getCommonCodeList('FM047')); // 차량 변속기
  await reduxStore.dispatch(getMnfcCdList()); // 차종 : 제조사 목록
  await reduxStore.dispatch(getExhibitCarList(auctId)); // 출품대기 차량 목록

  return { query };
};

export default withRouter(AutoAuctionCarInfo);
