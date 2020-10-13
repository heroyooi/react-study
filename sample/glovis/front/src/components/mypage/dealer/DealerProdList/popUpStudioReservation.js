import React, { memo, useState, useCallback, useEffect, useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, cloneDeep, isUndefined } from 'lodash';
import { produce } from 'immer';
import moment from 'moment';
import qs from 'qs';
import Steps from '@lib/share/items/Steps';
import SelectBox from '@lib/share/items/SelectBox';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import { CMCDTPID } from '@src/constant/cdMstLib';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import { getCommonCodeAsync, getCommonCodeAsyncNoSelect, getCommonCodeList } from '@src/utils/DataUtils';
import { axiosPost, axiosGet, frontUrl } from '@src/utils/HttpUtils';
import Input from '@lib/share/items/Input';
import IniPayButton from '@lib/share/inipay/IniPayButton';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';
import EvidenceSelector from '@src/components/common/couponSelector/EvidenceSelector';
import CarSeriesSelection from '@src/components/car/CarSeriesSelection';

import MobSelectList from '@lib/share/items/MobSelectList';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import { SystemContext } from '@src/provider/SystemProvider';
import { commonPaymentMethodList } from '@src/constant/payment';
import { numberFormat, preventScroll } from '@src/utils/CommonUtil';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import * as carInfoApi from '@src/api/common/CarInfoApi';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import { setComma } from '@src/utils/StringUtil';
import { console } from 'globalthis/implementation';

const PopUpStudioReservation = memo(({ hasMobile = false, onClose, onChange = null, paymentInfo, prodItem = { car: {} }, memberInfo = {} }) => {
  console.log('PopUpStudioReservation -> prodItem', prodItem);
  const dispatch = useDispatch();
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [liveStudioStep, setLiveStudioStep] = useState(1);
  const [livePointList, setLivePointList] = useState();
  const [livePoint, setLivePoint] = useState('0010');
  const [timeList, setTimeList] = useState([]);
  const [day, setDay] = useState();
  const [reserveList, setReserveList] = useState([]);
  const [reserveTime, setReserveTime] = useState('');
  const [usingPoint, setUsingPoint] = useState(0);
  const [selectedCoupon, selectCoupon] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState({ id: 'Card' });
  const [crNm, setCrNm] = useState(prodItem?.car?.crNo ?? '');
  const [editMode, setEditMode] = useState(false);
  const [useTmsCnsnYn, setUseTmsCnsnYn] = useState('N');
  const [rfdRuleCnsnYn, setRfdRuleCnsnYn] = useState('N');
  const [prdInfo, setPrdInfo] = useState({});
  const [selectedEvidence, setSelectedEvidence] = useState();

  const [prod, setProd] = useState(prodItem);
  const [VBankInfo, setVBankInfo] = useState({});
  const [withoutList, setWithoutList] = useState(true);
  const [fpTerms1, setFpTerms1] = useState(false);
  const [fpTerms2, setFpTerms2] = useState(false);
  const [mobVBank, setMobVBank] = useState(false);
  const [vBankName, setVBankName] = useState();
  const [isPaymentTermsAgree, setIsPaymentTermsAgree] = useState(false);

  const { showAlert, showLoader, hideLoader, showLoginForm } = useContext(SystemContext);

  const [displaySeriesPop, setDisplaySeriesPop, showSeriesPop, hideSeriesPop] = useRodal(false, true);
  const [carSeriesList, setCarSeriesList] = useState();
  const [selectedSeries, setSelectedSeries] = useState();

  const inputCarProp = (e) => {
    const { name, value } = e.target;

    setProd(
      produce(prod, (draft) => {
        draft.car[name] = value;
      })
    );
  };

  const searchCar = async (e) => {
    e && e.preventDefault();
    if (!/[0-9]{1,3}[가-힣]{1}[0-9]{4}/.test(crNm)) {
      showAlert('올바른 차량번호를 입력하세요');
      return;
    }
    setWithoutList(false);
    showLoader();
    const resultcarinfo = await dealerProdApi.selectCarInfoByCrNo(crNm);
    hideLoader();
    if (resultcarinfo?.data?.statusinfo?.returncd === '000') {
      setProd(resultcarinfo.data.data.prod);
      setEditMode(false);
    } else {
      getCarmartApi();
    }
  };

  const getCarmartApi = async () => {
    const { tsKey, seriesno } = selectedSeries ?? {};
    let params = {
      crNo: crNm,
      tsKey,
      seriesno
    };

    showLoader();
    const result = await carInfoApi.selectCarMart(params).then((res) => res?.data);
    hideLoader();
    const { data, statusinfo } = result;

    if (statusinfo?.returncd === '000') {
      const { seriesList = null } = data;
      setCarSeriesList(seriesList);

      if (seriesList) {
        showSeriesPop(true);
      } else {
        if (data.crDtlMdlCdNm === null || data.crDtlMdlCdNm.length === 0) {
          showAlert('조회되는 차량정보가 없습니다. 직접 입력해 주세요.');
        }
        setProd(
          produce(prod, (draft) => {
            draft.car = data;
          })
        );
        setEditMode(true);
      }
    } else if (statusinfo?.returncd === '001') {
      showAlert('이미 판매등록 중인 차량입니다.<br/>다른 차량을 조회해 주세요.');
      return false;
    } else {
      showAlert(statusinfo?.returncd);
      return false;
    }
  };

  const doAfterPay = async (res) => {
    console.log('doAfterPayrsvtId', res.id);
    let payTpCd;
    let payYn;
    if (res.paytype === 'Card') {
      payTpCd = '0020';
      payYn = 'Y';
    } else {
      payTpCd = '0010';
      payYn = 'N';
    }

    const param = { useServiceType: '0010', rsvtId: res.id, payAmt: res.payAmt, payTpCd, payYn };
    console.log('param', param);
    const { statusinfo } = await dealerProdApi.insertLiveStudioAfterPay(param).then((res) => res?.data);
    if (statusinfo?.returncd === '000') {
      hideLoader();
      setLiveStudioStep(4);
    } else {
      console.log(statusinfo?.returncd);
      console.log(statusinfo?.returnmsg);
    }
  };

  const doAfterMobPay = async (paymentInfo) => {
    let payTpCd;
    let payYn;
    if (paymentInfo.payMethod === 'CARD') {
      payTpCd = '0020';
      payYn = 'Y';
    } else {
      payTpCd = '0010';
      payYn = 'N';
      console.log('getCommonCodeList => ', getCommonCodeList('FM053'));
      const vBankList = getCommonCodeList('FM053');

      // vBankList.forEach(function(item) {
      //   if (item.cdId === paymentInfo.vBankCode) {
      //     setVBankName(item.label);
      //   }
      // });
    }

    console.log('paymentInfo.mobPayDataKey: ', paymentInfo.mobPayDataKey);
    const mobData = JSON.parse(sessionStorage.getItem(paymentInfo.mobPayDataKey));
    if (mobData !== null && mobData !== undefined) {
      const param = { useServiceType: '0010', rsvtId: mobData.rsvtId, payAmt: mobData.payAmt, payTpCd, payYn };
      console.log('param', param);
      //debugger;
      const { statusinfo } = await dealerProdApi.insertLiveStudioAfterPay(param).then((res) => res?.data);
      //debugger;
      if (statusinfo?.returncd === '000') {
        sessionStorage.removeItem(paymentInfo.mobPayDataKey);
        setLiveStudioStep(4);
        hideLoader();
      } else {
        console.log(statusinfo?.returncd);
        console.log(statusinfo?.returnmsg);
      }
    }
  };

  const doBeforePay = async (dlrPrdId) => {
    const param = { useServiceType: '0010', rsvtDt: day + reserveTime.replace(':', ''), useTmsCnsnYn, rfdRuleCnsnYn, dlrPrdId, rsvtBrncCd: livePoint };
    const { data, statusinfo } = await dealerProdApi.insertLiveStudioBeforePay(param).then((res) => res?.data);
    const mobDataKey = 'mobLiveStudioData';

    if (statusinfo?.returncd === '000') {
      hideLoader();
      console.log('결제창오픈' + data.rsvtId);
      const { rsvtId } = data;
      const basicInfo = {
        dlrPrdId: dlrPrdId,
        rsvtId,
        paytype: selectedPayment.id,
        payAmt: prdInfo.prdSlAmt,
        mobPayDataKey: mobDataKey
      };

      if (hasMobile) {
        sessionStorage.setItem(mobDataKey, JSON.stringify(basicInfo));
      }
      return basicInfo;
    }
    hideLoader();
    showAlert(statusinfo?.returnmsg);
    return false;
  };

  const onPayRequestValid = useCallback(() => {
    if (isPaymentTermsAgree !== true) {
      alert('약관동의는 필수 입니다.');
      return false;
    }

    return true;
  }, [isPaymentTermsAgree]);

  const onSubmit = async () => {
    showLoader();

    if (isUndefined(prod?.dlrPrdId)) {
      const car = cloneDeep(prod?.car);
      console.log("onSubmit -> prod", prod)
      const { crMnfcCdNm, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm } = car;
      car.crNm = `${crMnfcCdNm} ${crDtlMdlCdNm} ${crClsCdNm} ${crDtlClsCdNm}`;
      console.log('onSubmit -> car', car);

      const { data, statusinfo } = await dealerProdApi.insertDealerProd({ car,  lvstdCrYn : 'Y' }).then((res) => res?.data);
      console.log('onSubmit -> data', data);
      console.log('onSubmit -> statusinfo', statusinfo);

      if (statusinfo?.returncd === '000') {
        const { dlrPrdId } = data;
        console.log("onSubmit -> data", data)
        // setProd
        setProd(data)
        return doBeforePay(dlrPrdId);
      } else if (statusinfo?.returncd === '001') {
        hideLoader();
        showAlert('실패하였습니다.');
        return false;
      } else if (statusinfo?.returncd === 'MBR4005') {
        showLoginForm(Router.router.asPath, (data) => {
          console.log('loginCallback data ::::: ', data);
          if (data?.isLogin) {
            onSubmit();
          } else {
            hideLoader();
            showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
            return false;
          }
        });
      } else {
        hideLoader();
        showAlert(statusinfo?.returnmsg);
        return false;
      }
    } else {
      return doBeforePay(prod.dlrPrdId);
    }
    hideLoader();
  };
  const selectCar = (items, price) => {
    console.log('items : ', items);
    console.log('price : ', price);

    setProd(
      produce(prod, (draft) => {
        let crNm = '';
        items.forEach((item) => {
          const { column, code, text } = item;
          draft.car[column] = code;
          draft.car[`${column}Nm`] = text;
          if (item?.column !== 'crMdlCd' && text) {
            crNm += `${text} `;
          }
        });
        draft.car.crNm = crNm;
      })
    );
  };
  const amTimeList = [];
  const pmTimeList = [];

  for (let i = 0; i < 8; i++) {
    const amTime = moment('09:00', 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm');
    amTimeList.push(amTime);
  }

  for (let i = 0; i < 8; i++) {
    const pmTime = moment('13:30', 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm');
    pmTimeList.push(pmTime);
  }

  const inicisCallback = (message) => {
    console.log("inicisCallback -> message", message)
    // eslint-disable-next-line no-unused-expressions
    globalThis?.window?.INIStdPay?.viewOff();
    const { resultCode, statusinfo } = message?.data;

    if(statusinfo){
      if (statusinfo.returncd === '0000') {
        setVBankInfo(statusinfo?.vbankinfo);
        doAfterPay({ id: message?.data.merchantData.rsvtId, paytype: message?.data.merchantData.paytype });
      } else {
        showAlert('결제 실패하였습니다. \n 다시 시도 해주세요.');
      }
    }
  };

  const livePointChange = (e) => {
    setLivePoint(e.cdId);
  };

  const onChangeDay = (e) => {
    setDay(e.currentTarget.value);
  };

  const isReservated = (time) => {
    const now = moment().format('YYYYMMDDHHmm');
    const daytime = day + time;

    const idx = reserveList.findIndex((item) => item.rsvtTime === time);
    if (idx > -1) {
      return idx > -1;
    }
    if (now > daytime) {
      console.log(now > daytime);
      return now > daytime;
    }
    return false;
  };

  const onChangeTime = (e) => {
    setReserveTime(e.target.name);
  };

  const doInit = () => {
    setCrNm(prodItem?.car?.crNo ?? '');
    setProd({});
    setDay({});
    setEditMode(false);
    setSelectedPayment({ id: 'Card' });
  };

  const cancelPopup = (e) => {
    // e.preventDefault();
    // doInit();
    // if (onChange) {
    //   onChange();
    // }
    onClose && onClose();
    globalThis.window.document.documentElement.style.overflow = 'auto';
    globalThis.window.document.body.style.overflow = 'auto';
  };

  const checkPayment = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      const checkedItem = commonPaymentMethodList.find((tempPaymentMethod) => tempPaymentMethod.id == value);
      setSelectedPayment(checkedItem);

      if (checkedItem?.id !== 'VBank') {
        setSelectedEvidence(null);
      }
    }
  };

  const checkEvidence = (e, item) => {
    setSelectedEvidence(item);
  };

  const onClickStep2 = (e) => {
    e && e.preventDefault();

    if (isEmpty(prod?.car)) {
      showAlert('차량 정보가 입력되지 않았습니다.');
      return;
    }

    // 원래 등록된 차량이라면 crNm 이 없을 수 있으나..데이터가 있다면 crDtlMdlCdNm은 있다.
    if (isEmpty(prod.car.crNm)) {
      if (isEmpty(prod.car.crDtlMdlCdNm)) {
        showAlert('차량 명이 입력되지 않았습니다.');
        return;
      }
    }

    if (isEmpty(prod.car.frstRegDt)) {
      showAlert('최초등록일이 입력되지 않았습니다.');
      return;
    }

    if (isEmpty(prod.car.frmYyyy)) {
      showAlert('형식연도가 입력되지 않았습니다.');
      return;
    }

    if (isEmpty(prod.car.crClrCd)) {
      showAlert('색상이 입력되지 않았습니다.');
      return;
    }

    if (isEmpty(prod.car.fuelDvcd)) {
      showAlert('연료가 입력되지 않았습니다.');
      return;
    }

    if (prod.car.dspl === null || prod.car.dspl === 0) {
      showAlert('배기량이 입력되지 않았습니다.');
      return;
    }

    if (isEmpty(prod.car.crTypeCd)) {
      showAlert('차종이 입력되지 않았습니다.');
      return;
    }

    setLiveStudioStep(2);
  };

  const onClickStpe3 = (e) => {
    e.preventDefault();
    if (isEmpty(livePoint)) {
      showAlert('지점 정보가 입력되지 않았습니다.');
      return;
    }

    if (isEmpty(reserveTime)) {
      showAlert('시간이 입력되지 않았습니다.');
      return;
    }

    if (useTmsCnsnYn !== 'Y') {
      showAlert('라이브 스튜디오 이용약관 필수 항목 입니다.');
      return;
    }

    if (rfdRuleCnsnYn !== 'Y') {
      showAlert('환불 규정 안내는 필수 항목 입니다.');
      return;
    }
    setLiveStudioStep(3);
  };

  const onChangeUseTmsCnsnYn = (e) => {
    const val = e.target.checked ? 'Y' : 'N';
    setUseTmsCnsnYn(val);
  };
  const onChangeRfdRuleCnsnYn = (e) => {
    const val = e.target.checked ? 'Y' : 'N';
    setRfdRuleCnsnYn(val);
  };

  const crNmInputBlur = (e) => {
    setCrNm(e.target.value);
  };

  const openFpTerms = useCallback((e, v) => {
    e.preventDefault();
    if (v.id === 'chk1') {
      handleFullpagePopup('terms1')(e);
    } else if (v.id === 'chk2') {
      handleFullpagePopup('terms2')(e);
    }
  }, []);

  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      e.preventDefault();
      if (name === 'terms1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '라이브 스튜디오 이용약관 (필수)',
            options: ['close']
          }
        });
        setFpTerms1(true);
        setFpTerms2(false);
      } else if (name === 'terms2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '환환불규정 안내 (필수)',
            options: ['close']
          }
        });
        setFpTerms1(false);
        setFpTerms2(true);
      }
    },
    [dispatch]
  );

  const handlePaymentTermsChange = useCallback((terms) => {
    const isAllNotAgree = terms.some((item) => {
      return item.checked === false;
    });
    setIsPaymentTermsAgree(!isAllNotAgree);
  }, []);

  const handleFpTermsChange = useCallback((e, deps) => {
    setUseTmsCnsnYn(deps[0].checked === true ? 'Y' : 'N');
    setRfdRuleCnsnYn(deps[1].checked === true ? 'Y' : 'N');
  }, []);

  const closeFpTerms = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms1(false);
      setFpTerms2(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  useEffect(() => {
    const params = {
      rsvtBrncCd: livePoint,
      salesDay: day
    };

    console.log(params);

    axiosGet('/api/mypage/dealer/selectLiveStudioRsvtCmplRtInq.do?' + qs.stringify(params)).then((payload) => {
      const data = payload.data.data;
      setReserveList(data);
    });
  }, [day, livePoint]);

  useEffect(() => {
    if (hasMobile) {
      getCommonCodeAsyncNoSelect(CMCDTPID.livePoint).then((codeList) => setLivePointList(codeList));
    } else {
      getCommonCodeAsync(CMCDTPID.livePoint).then((codeList) => setLivePointList(codeList));
    }

    const date = moment()
      .add(1, 'days')
      .format('YYYYMMDD');

    axiosPost('/api/mypage/dealer/selectPrdInfo.do', { prdDvCd: 'AA01' }).then((payload) => {
      console.log('AA01', payload.data);
      setPrdInfo(payload.data.data);
    });
    axiosGet('/api/mypage/dealer/selectBusinessDays.do?outputCnt=2&bussDt=' + date).then((payload) => {
      const data = payload.data.data;
      let radioArray = [];
      for (const [i, v] of data.entries()) {
        radioArray = [
          ...radioArray,
          { id: 'time' + i, value: v.bussDt, checked: i === 0 ? true : false, disabled: false, title: moment(v.bussDt, 'YYYYMMDD').format('YYYY.MM.DD ') + ' ' + v.bussDay }
        ];
      }
      setTimeList(radioArray);
      console.log('여기는 타나');
      setDay(radioArray[0].value);
    });

    // eslint-disable-next-line no-unused-expressions
    console.log('inicisCallback added...')
    globalThis?.window.addEventListener('message', inicisCallback);
    return () => {
      // eslint-disable-next-line no-unused-expressions
      globalThis?.window.removeEventListener('message', inicisCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //debugger;
    if (typeof paymentInfo !== 'undefined' && JSON.stringify(paymentInfo) !== JSON.stringify({})) {
      console.log('paymentInfo : ', paymentInfo);
      if (paymentInfo?.returnCd === 'success') {
        if (paymentInfo?.payMethod === 'VBANK') {
          setMobVBank(true);
        }
        doAfterMobPay(paymentInfo);
      } else {
        console.log('paymentInfo : ', paymentInfo);
        showAlert('결제 실패하였습니다. \n 다시 시도 해주세요.');
        onClose && onClose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });

    if (prodItem?.car?.crNo) {
      console.log('차량넘버가 있으면 바로 검색');
      searchCar();
    }
  }, []);
  if (hasMobile === true) {
    return (
      <>
        <div className="live-reserve-sec">
          <Steps type={1} contents={['차량정보 입력', '지점/예약시간 선택', '결제하기', '예약완료']} active={liveStudioStep} mode="stick" />
          {liveStudioStep === 1 && (
            <>
              <div className="popup-reserve">
                <div className="reserve-wrap">
                  <p className="tit4 mb8">차량번호 입력</p>
                  <Input type="text" placeHolder="차량번호를 입력해주세요.(예: 12가1234)" onBlur={(e) => crNmInputBlur(e)} />
                  <Button size="full" background="blue80" title="조회" radius={true} height={38} marginTop={8} buttonMarkup={true} onClick={searchCar} />
                </div>
              </div>

              <div className="content-wrap pt24">
                <p className="tit4 mb16">차량 기본정보</p>
                {withoutList === true ? (
                  <div className="list-none-wrap">
                    <p className="list-none">차량조회 후 진행하실 수 있습니다.</p>
                  </div>
                ) : (
                  <MobCarBasicInfoEditor item={prod?.car} type={'table'} isEditing={editMode} onChange={inputCarProp} />
                )}
              </div>
            </>
          )}
          {liveStudioStep === 2 && (
            <>
              <div className="reserve-wrap">
                <div className="branch">
                  <p className="tit4 mb16">지점선택</p>
                  <div className="float-wrap">
                    <MobSelectList
                      displayMemberPath={'label'}
                      itemsSource={livePointList}
                      selectedItem={(livePointList || []).find((x) => x.value === livePoint)}
                      selectedValuePath={'value'}
                      width="100%"
                      onClick={(e, deps) => livePointChange(deps)}
                    />
                  </div>
                  <div className="float-wrap mt8">
                    <MobSelectList
                      displayMemberPath={'title'}
                      itemsSource={timeList}
                      selectedItem={(timeList || []).find((x) => x.value === day)}
                      selectedValuePath={'value'}
                      width="100%"
                      onClick={(e, deps) => setDay(deps.value)}
                    />
                  </div>
                  <div className="essential-point fs12">
                    <ul>
                      <li>
                        <i className="ico-dot" />
                        토·일요일 및 공휴일은 예약 불가
                      </li>
                      <li>
                        <i className="ico-dot" />
                        전일 예약 시 월요일 예약은 금요일에 가능합니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        진단지점 : 서울시 강서구 신월동 단지{' '}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="content-wrap">
                  <p className="tit4 mb16 mt24">시간선택</p>
                  <table summary="조회 영역" className="table-tp1 th-c td-c td-min">
                    <caption className="away">조회 영역</caption>
                    <colgroup>
                      <col width="27%" />
                      <col width="23%" />
                      <col width="27%" />
                      <col width="23%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan="2">오전</th>
                        <th colSpan="2">오후</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amTimeList.map((data, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            <tr>
                              {isReservated(data.replace(':', '')) ? (
                                <>
                                  <td>{data}</td>
                                  <td>예약마감</td>
                                </>
                              ) : (
                                <>
                                  <td className="tx-blue80">
                                    <CheckBox id={'chk-time' + data} checked={data === reserveTime} name={data} title={data} onChange={(e) => onChangeTime(e)} isSelf={false} />
                                  </td>
                                  <td className="tx-blue80">예약가능</td>
                                </>
                              )}

                              {isReservated(pmTimeList[idx].replace(':', '')) ? (
                                <>
                                  <td>{pmTimeList[idx]}</td>
                                  <td>예약마감</td>
                                </>
                              ) : (
                                <>
                                  <td className="tx-blue80">
                                    <CheckBox
                                      id={'chk-time' + pmTimeList[idx]}
                                      checked={pmTimeList[idx] === reserveTime}
                                      name={pmTimeList[idx]}
                                      title={pmTimeList[idx]}
                                      isSelf={false}
                                      onChange={(e) => onChangeTime(e)}
                                    />
                                  </td>
                                  <td className="tx-blue80">예약가능</td>
                                </>
                              )}
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>

                  <MobSelectTerms
                    termsData={[
                      { id: 'chk1', title: '라이브 스튜디오 이용약관 (필수)', checked: false, name: 'terms1' },
                      { id: 'chk2', title: '환불 규정 안내(필수)', checked: false, name: 'terms2' }
                    ]}
                    onTermsClick={openFpTerms}
                    onChange={handleFpTermsChange}
                  />

                  <div className="essential-point fs12">
                    <ul>
                      <li>
                        <i className="ico-dot" />
                        지점 이용은 당일/전일 예약제로 운영되며, 당일 방문은 받지 않습니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        예약시 10분이내 결제가 이루어지지 않으면 예약은 취소되고, 선택한 시간은 무효가 됩니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        예약 취소요구시 위약금이 발생될 수 있습니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        Live Studio 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          {liveStudioStep === 3 && (
            <>
              <MobPaymentInfo
                title={'Live Studio 촬영 예약'}
                payment={prdInfo}
                paymentMethodList={commonPaymentMethodList}
                selectedPayment={selectedPayment}
                onPaymentMethodChanged={setSelectedPayment}
                onTermsChange={handlePaymentTermsChange}
              />
              <Buttons align="center" className="full fixed">
                <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
                <IniPayButton
                  // directUrl={encodeURIComponent('http://58.87.52.197/mypage/dealer/sellcar/photographAppointment?type=reg&')}
                  directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/photographAppointment?type=reg&`)}
                  isMobile={true}
                  size="big"
                  background="blue80"
                  title="결제"
                  height={56}
                  mode="normal"
                  onValidation={onPayRequestValid}
                  beforeRequestAsync={onSubmit}
                  paymethod={selectedPayment?.id}
                  point={usingPoint}
                  coupon={selectedCoupon?.id}
                  items={[prdInfo]}
                  prodType="pass"
                  type={selectedEvidence?.id}
                  mobPayMethod={selectedPayment?.id}
                />
              </Buttons>
            </>
          )}
          {liveStudioStep === 4 && (
            <div className="co-sec">
              <div className="co-wrap">
                <p className="tit">예약이 완료되었습니다.</p>
                <p className="exp">
                  예약 현황은 마이페이지 Live Service 촬영예약에서
                  <br />
                  확인 가능합니다.
                </p>
                {mobVBank && (
                  <table summary="예약정보" className="table-tp1 mt32">
                    <caption className="away">예약정보</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>금액</th>
                        <td>{setComma(paymentInfo.vBankAmt)}</td>
                      </tr>
                      <tr>
                        <th>납부계좌</th>
                        <td>
                          <p className="essential">{paymentInfo.vBankNum}</p>
                          {/* KEB하나은행, 현대글로비스(주) */}
                          {`${paymentInfo.vBankCode}, ${paymentInfo.vBankOwnerName}`}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
        {liveStudioStep === 1 && (
          <Buttons align="center" className="full fixed">
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
            <Button size="full" background="blue80" title="다음" height={56} buttonMarkup={true} onClick={(e) => onClickStep2(e)} />
          </Buttons>
        )}
        {liveStudioStep === 2 && (
          <Buttons align="center" className="full fixed">
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
            <Button size="full" background="blue80" title="다음" height={56} onClick={(e) => onClickStpe3(e)} />
          </Buttons>
        )}
        {liveStudioStep === 4 && <Button className="fixed" size="full" background="blue80" title="확인" height={56} href="/mypage/dealer/sellcar/photographAppointment" />}

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: '<p>라이브 스튜디오 이용약관</p>' }} />
                {/* <div className="content">라이브 스튜디오 이용약관</div> */}
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFpTerms} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: '<p>환불규정 안내</p>' }} />
                {/* <div className="content"></div> */}
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFpTerms} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </>
    );
  }

  return (
    <div className="popup-reserve">
      <div className="reserve-step">
        <Steps type={2} contents={['차량정보 입력', '지점/예약시간 선택', '결제하기', '예약완료']} active={liveStudioStep} />
      </div>
      {liveStudioStep === 1 && (
        <div className="reserve-wrap">
          <table className="table-tp1 input search pd" summary="조회 영역">
            <caption className="away">조회 영역</caption>
            <tbody>
              <tr>
                <th>차량번호 입력</th>
                <td>
                  <Input type="text" width={256} value={crNm} onBlur={(e) => crNmInputBlur(e)} />
                  <Button size="big" background="gray" title="조회" width={127} marginLeft={16} buttonMarkup={true} onClick={searchCar} />
                </td>
              </tr>
            </tbody>
          </table>
          <form className="register-form">
            <CarBasicInfoEditor item={prod?.car} isEditing={editMode} onInput={inputCarProp} onSelectCar={selectCar} className="mt80" showDrvDist={true} pagetype="live" />
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={cancelPopup} />
            <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" buttonMarkup={true} onClick={(e) => onClickStep2(e)} />
          </Buttons>
          <div className="essential-point">
            <ul>
              <li>- 토·일요일 및 공휴일은 예약 불가</li>
              <li>- 전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
              <li>
                - 수입차 진단지점 :강남,강서,부천상동,북천안,대전,광주,장한평,인천,서부산,광명,SAG성능제휴장,수원,김포,대구동구,
                <br />
                부천,서운,유량,양천로,남대구지점,북대구
              </li>
            </ul>
          </div>
        </div>
      )}
      {liveStudioStep === 2 && (
        <div className="reserve-wrap">
          <table className="table-tp1 input search" summary="조회 영역">
            <caption className="away">조회 영역</caption>
            <tbody>
              <tr>
                <th>지점선택</th>
                <td>
                  <SelectBox id="state" className="items-sbox" options={livePointList} width={306} value={livePoint} onChange={(e) => livePointChange(e)} />
                </td>
              </tr>
              <tr>
                <th>날짜선택</th>
                <td>
                  <RadioGroup dataList={timeList} defaultValue={day} onChange={(e) => onChangeDay(e)} />
                </td>
              </tr>
              <tr>
                <th className="ver-t">시간선택</th>
                <td>
                  <table className="table-tp1 th-c td-c" summary="시간선택 영역">
                    <caption className="away">시간선택</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan="2">오전</th>
                        <th colSpan="2">오후</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amTimeList.map((data, idx) => {
                        return (
                          <tr key={idx}>
                            {isReservated(data.replace(':', '')) ? (
                              <>
                                <td>{data}</td>
                                <td>예약마감</td>
                              </>
                            ) : (
                              <>
                                <td className="tx-blue80">
                                  <CheckBox id={'chk-time' + data} checked={data === reserveTime} name={data} title={data} onChange={(e) => onChangeTime(e)} isSelf={false} />
                                </td>
                                <td className="tx-blue80">예약가능</td>
                              </>
                            )}

                            {isReservated(pmTimeList[idx].replace(':', '')) ? (
                              <>
                                <td>{pmTimeList[idx]}</td>
                                <td>예약마감</td>
                              </>
                            ) : (
                              <>
                                <td className="tx-blue80">
                                  <CheckBox
                                    id={'chk-time' + pmTimeList[idx]}
                                    checked={pmTimeList[idx] === reserveTime}
                                    name={pmTimeList[idx]}
                                    title={pmTimeList[idx]}
                                    isSelf={false}
                                    onChange={(e) => onChangeTime(e)}
                                  />
                                </td>
                                <td className="tx-blue80">예약가능</td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point">
            <ul>
              <li>- 토·일요일 및 공휴일은 예약 불가</li>
              <li>- 전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
              <li>- 진단지점 : 서울시 강서구 신월동 단지</li>
            </ul>
          </div>

          <div className="agree-terms-wrap">
            <CheckBox id="chk-agree" title="라이브 스튜디오 이용약관 (필수)" isSelf={false} checked={useTmsCnsnYn === 'Y'} onChange={(e) => onChangeUseTmsCnsnYn(e)} />
            <div className="terms-wrap">라이브 스튜디오 이용약관</div>
          </div>

          <div className="agree-terms-wrap">
            <CheckBox id="chk-agree2" title="환불규정 안내 (필수)" isSelf={false} checked={rfdRuleCnsnYn === 'Y'} onChange={(e) => onChangeRfdRuleCnsnYn(e)} />
            <div className="terms-wrap">환불규정 안내</div>
          </div>

          <div className="essential-point tp2">
            <ul>
              <li>
                지점 이용은 <b>당일/전일 예약제로 운영</b>되며, 당일 방문은 받지 않습니다.
              </li>
              <li>
                예약시 <b>10분이내 결제가 이루어지지 않으면 예약은 취소</b>되고, 선택한 시간은 무효가 됩니다.
              </li>
              <li>
                예약 <b>취소요구시 위약금이 발생</b>될 수 있습니다.
              </li>
              <li>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
              <li>오토벨보증 이용권 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
            </ul>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={cancelPopup} />
            <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" buttonMarkup={true} onClick={(e) => onClickStpe3(e)} />
          </Buttons>
        </div>
      )}
      {liveStudioStep === 3 && (
        <div className="reserve-wrap payment-sec method">
          <h3 className="sub-tit">이용권 정보</h3>
          <div className="point-area">
            <div className="pay-detail">
              <div className="pick-list">
                <ul>
                  <li>Live studio 이용권</li>
                </ul>
                <div className="sum">
                  <p className="price">
                    {numberFormat(prdInfo.prdSlAmt)}
                    <span> 원</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="coupon-wrap">
              <div className="coupon">
                <CheckBox id="chk3" title="쿠폰 적용" />
                <p>
                  적용 가능한 보유쿠폰<span>3</span>장
                </p>
              </div>
              <RadioGroup
                dataList={[
                  { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                  { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                  { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                ]}
                defaultValue={1}
                size="small"
                mode="vertical"
              />
              <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
            </div> */}
          </div>
          <div className="last-sum">
            <ul>
              <li>
                이용권금액
                <span>
                  {numberFormat(prdInfo.prdSlAmt)} <em>원</em>
                </span>
              </li>
              {/* <li>
                할인금액
                <span>
                  12,000<em>원</em>
                </span>
              </li>
              <li>
                최종결제금액
                <span>
                  878,000<em>원 (VAT 포함)</em>
                </span>
              </li> */}
            </ul>
          </div>

          <div className="method-wrap">
            <p>결제 수단</p>
            <div className="radio-group">
              {commonPaymentMethodList.map((tempPaymentMethod, i) => (
                <Radio
                  key={i}
                  id={`payment-${tempPaymentMethod?.id}`}
                  title={tempPaymentMethod?.title}
                  checked={selectedPayment?.id}
                  value={tempPaymentMethod?.id}
                  name="payment"
                  onChange={checkPayment}
                />
              ))}
            </div>
            {/* <RadioGroup dataList={commonPaymentMethodList} defaultValue={1} /> */}
          </div>

          {/* #a1 증빙선택 추가, 약관추가 start */}
          {selectedPayment?.id === 'VBank' && <EvidenceSelector item={selectedEvidence} onChange={(e,item) => setSelectedEvidence(item)} />}

          {/* #a1 증빙선택 추가 start */}
          {/* <div className="method-wrap col2  mt40">
            <p>증빙 선택</p>
            <RadioGroup
              dataList={[
                { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }
              ]}
              defaultValue={1}
            />
            <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
          </div> */}
          {/* #a1 증빙선택 추가 end */}

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={cancelPopup} />
            {/* <Button size="big" background="blue80" title="결제" width={172} height={60} mode="normal" buttonMarkup={true} onClick={onSubmit} /> */}
            {/* <span className="step-btn-r"> */}
            <IniPayButton
              size="big"
              background="blue80"
              title="결제"
              width={172}
              height={60}
              mode="normal"
              beforeRequestAsync={onSubmit}
              paymethod={selectedPayment?.id}
              point={usingPoint}
              coupon={selectedCoupon?.id}
              items={[prdInfo]}
              prodType="pass"
              type={selectedEvidence?.id}
            />
            {/* </span> */}
          </Buttons>
        </div>
      )}
      {liveStudioStep === 4 && (
        <div className="reserve-wrap co-wrap">
          <p className="tit">예약이 완료되었습니다.</p>
          <p className="exp">예약 현황은 마이페이지 Live Service 촬영예약에서 확인 가능합니다.</p>
          {!isEmpty(VBankInfo) && (
            <table summary="라이브 스튜디오 예약" className="table-tp1 mt32">
              <caption className="away">라이브 스튜디오 예약</caption>
              <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="30%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>은행명</th>
                  <td>{VBankInfo.vactBankName}</td>
                  <th>결제금액</th>
                  <td>
                    <span className="price-tp">{VBankInfo.totprice}</span> 원
                  </td>
                </tr>
                <tr>
                  <th>예금주</th>
                  <td>{VBankInfo.vactName}</td>
                  <th>계좌번호</th>
                  <td>{VBankInfo.vactNum}</td>
                </tr>
              </tbody>
            </table>
          )}
          <Buttons align="center" marginTop={49}>
            <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" buttonMarkup={true} onClick={cancelPopup} />
            <Button size="big" background="gray" title="예약조회로 이동" width={172} height={60} href="/mypage/dealer/sellcar/liveShotAppointment" nextLink={true} />
            <Button size="big" background="gray" title="결제조회로 이동" width={172} height={60} href="/mypage/dealer/sellcar/liveShotAppointment" nextLink={true} />
          </Buttons>
        </div>
      )}
      <RodalPopup show={displaySeriesPop} type={'fade'} closedHandler={hideSeriesPop} title="상세모델을 선택하세요" mode="normal" width={750} size="small">
        <CarSeriesSelection
          items={carSeriesList}
          onSelect={setSelectedSeries}
          selectedSeries={selectedSeries}
          onClose={hideSeriesPop}
          onSubmit={() => {
            hideSeriesPop(false);
            searchCar();
          }}
        />
      </RodalPopup>
    </div>
  );
});

PopUpStudioReservation.propTypes = {
  hasMobile: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  paymentInfo: PropTypes.object
};

PopUpStudioReservation.displayName = 'PopUpStudioReservation';
export default PopUpStudioReservation;
