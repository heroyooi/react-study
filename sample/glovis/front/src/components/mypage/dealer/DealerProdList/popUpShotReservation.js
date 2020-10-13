import React, { memo, useContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, isUndefined, cloneDeep } from 'lodash';
import { produce } from 'immer';
import moment from 'moment';
import qs from 'qs';

import Steps from '@lib/share/items/Steps';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';

import IniPayButton from '@lib/share/inipay/IniPayButton';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import EvidenceSelector from '@src/components/common/couponSelector/EvidenceSelector';
import FindAddress from '@src/components/common/popup/FindAddress';
import CarSeriesSelection from '@src/components/car/CarSeriesSelection';

import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost, axiosGet, frontUrl } from '@src/utils/HttpUtils';
import { commonPaymentMethodList } from '@src/constant/payment';
import { gInfoLive } from '@src/utils/LoginUtils';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import * as carInfoApi from '@src/api/common/CarInfoApi';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import { getCommonCodeList } from '@src/utils/DataUtils';
import { setComma } from '@src/utils/StringUtil';

const PopUpShotReservation = memo(({ hasMobile, onClose, onChange = null, paymentInfo, prodItem = { car: {} }, memberInfo = {} }) => {
  const dispatch = useDispatch();
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [isOpenSearchAddr, setIsOpenSearchAddr] = useRodal(false, true);
  const [day, setDay] = useState();
  const [livePoint, setLivePoint] = useState('0010');
  const [timeList, setTimeList] = useState([]);
  const [reserveList, setReserveList] = useState([]);
  const [reserveTime, setReserveTime] = useState('');
  const [usingPoint, setUsingPoint] = useState(0);
  const [selectedCoupon, selectCoupon] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState({ id: 'Card' });
  const [selectedEvidence, setSelectedEvidence] = useState();
  const [liveShotStep, setLiveShotStep] = useState(1);
  const [addrTarget, setAddrTarget] = useState('');
  const [address, setAddress] = useState({});
  const [VBankInfo, setVBankInfo] = useState({});
  const [crNm, setCrNm] = useState(prodItem?.car?.crNo ?? '');
  const [prod, setProd] = useState(prodItem);
  const [useTmsCnsnYn, setUseTmsCnsnYn] = useState('N');
  const [rfdRuleCnsnYn, setRfdRuleCnsnYn] = useState('N');
  const [prdInfo, setPrdInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [withoutList, setWithoutList] = useState(true);
  const [fpTerms1, setFpTerms1] = useState(false);
  const [fpTerms2, setFpTerms2] = useState(false);
  const [fpAddrPopUp, setFpAddrPopUp] = useState(false);
  const [mobVBank, setMobVBank] = useState(false);
  const [vBankName, setVBankName] = useState();
  const [isPaymentTermsAgree, setIsPaymentTermsAgree] = useState(false);

  const { showAlert, showLoader, hideLoader, showLoginForm } = useContext(SystemContext);

  const [displaySeriesPop, setDisplaySeriesPop, showSeriesPop, hideSeriesPop] = useRodal(false, true);
  const [carSeriesList, setCarSeriesList] = useState();
  const [selectedSeries, setSelectedSeries] = useState();

  const crNmInputBlur = (e) => {
    setCrNm(e.target.value);
  };

  const onSearchAddr = (e, target) => {
    e.preventDefault();
    setAddrTarget(target);
    setIsOpenSearchAddr(true);
  };

  const inputCarProp = (e) => {
    const { name, value } = e.target;

    setProd(
      produce(prod, (draft) => {
        draft.car[name] = value;
      })
    );
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
    const amTime = moment('09:00', 'hh:mm')
      .add(i * 30, 'minute')
      .format('hh:mm');
    amTimeList.push(amTime);
  }

  for (let i = 0; i < 8; i++) {
    const pmTime = moment('13:30', 'hh:mm')
      .add(i * 30, 'minute')
      .format('hh:mm');
    pmTimeList.push(pmTime);
  }

  const inicisCallback = (message) => {
    console.log('inicisCallback message : ', message);
    // eslint-disable-next-line no-unused-expressions
    globalThis?.window?.INIStdPay?.viewOff();
    console.log(selectedPayment);
    setVBankInfo(message?.data.vbankinfo);

    if (message?.data.statusinfo.returncd === '0000') {
      doAfterPay(message?.data.merchantData);
    } else {
      showAlert('결제 실패하였습니다. \n 다시 시도 해주세요.');
    }
  };

  const doInit = () => {
    setCrNm(prodItem?.car?.crNo ?? '');
    setProd({});
    setAddress({});
    setDay({});
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

  const doAfterPay = async (res) => {
    console.log('doAfterPay', selectedPayment);
    console.log("doAfterPay -> res", res)
    let payTpCd;
    let payYn;
    if (res.paytype === 'Card') {
      payTpCd = '0020';
      payYn = 'Y';
    } else {
      payTpCd = '0010';
      payYn = 'N';
    }
    const param = {
      useServiceType: res.useServiceType,
      rsvtDt: res.rsvtDt,
      useTmsCnsnYn: 'Y',
      zipCd: res.zipCd,
      addr1: res.addr1,
      addr2: res.addr2,
      locCd: res.locCd,
      ctyCd: res.ctyCd,
      dlrPrdId: res.dlrPrdId[0],
      mbId: res.dlrMbId,
      payAmt: res.payAmt,
      rfdRuleCnsnYn: 'Y',
      payTpCd,
      payYn
    };

    console.log("doAfterPay -> param", param)
    const { statusinfo } = await dealerProdApi.insertLiveShotRsvt(param).then((res) => res?.data);
    hideLoader();
    if (statusinfo?.returncd === '000') {
      setLiveShotStep(4);
    } else {
      console.log(statusinfo?.returncd, statusinfo?.returnc);
      showAlert('결제 실패하였습니다')
    }
  };

  const doAfterMobPay = async (paymentInfo) => {
    console.log('doAfterMobPay PaymentInfo', paymentInfo);

    let payTpCd;
    let payYn;
    if (paymentInfo.payMethod === 'CARD') {
      payTpCd = '0020';
      payYn = 'Y';
    } else {
      payTpCd = '0010';
      payYn = 'N';
      const vBankList = getCommonCodeList('FM053');

      vBankList.forEach(function(item) {
        if (item.cdId === paymentInfo.vBankCode) {
          setVBankName(item.label);
        }
      });
    }
    console.log('paymentInfo.mobPayDataKey: ', paymentInfo.mobPayDataKey);
    const mobData = JSON.parse(sessionStorage.getItem(paymentInfo.mobPayDataKey));
    if (mobData !== null && mobData !== undefined) {
      const param = {
        useServiceType: mobData.useServiceType,
        rsvtDt: mobData.rsvtDt,
        useTmsCnsnYn: 'Y',
        zipCd: mobData.zipCd,
        addr1: mobData.addr1,
        addr2: mobData.addr2,
        locCd: mobData.locCd,
        ctyCd: mobData.ctyCd,
        dlrPrdId: mobData.dlrPrdId[0],
        mbId: mobData.dlrMbId,
        payAmt: mobData.payAmt,
        rfdRuleCnsnYn: 'Y',
        payTpCd,
        payYn
      };
      const { statusinfo } = await dealerProdApi.insertLiveShotRsvt(param).then((res) => res?.data);
      if (statusinfo?.returncd === '000') {
        sessionStorage.removeItem(paymentInfo.mobPayDataKey);
        setLiveShotStep(4);
      } else {
        console.log(statusinfo?.returncd, statusinfo?.returnc);
      }
    }
    hideLoader();
  };

  const checkPayment = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedPayment(commonPaymentMethodList.find((tempPaymentMethod) => tempPaymentMethod.id === value));
    }
  };

  const addrEvent = (e) => {
    setAddress(e);
    if (hasMobile) {
      setFpAddrPopUp(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    } else {
      setAddress(e);
      setIsOpenSearchAddr(false);
    }
  };

  const searchCar = async (e) => {
    e && e.preventDefault();
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
        showAlert('등록된 차량이 없어 신규 등록이 진행됩니다.');
        setProd(
          produce(prod, (draft) => {
            draft.car = data;
          })
        );
        setEditMode(true);
      }
    } else if (statusinfo?.returncd === '001') {
      showAlert('이미 판매등록 중인 차량입니다.<br/>다른 차량을 조회해 주세요.');
    } else {
      showAlert(result);
    }
  };

  const onClickStep2 = (e) => {
    e && e.preventDefault();
    if (isEmpty(prod?.car)) {
      showAlert('차량 정보가 입력되지 않았습니다.');
      return;
    }
    setLiveShotStep(2);
  };

  const onClickStpe3 = (e) => {
    e.preventDefault();
    if (isEmpty(address)) {
      showAlert('주소 정보가 입력되지 않았습니다.');
      return;
    }
    if (isEmpty(day)) {
      showAlert('시간이 입력되지 않았습니다.');
      return;
    }

    if (useTmsCnsnYn !== 'Y') {
      showAlert('Live shot 이용약관은 필수 항목 입니다.');
      return;
    }

    if (rfdRuleCnsnYn !== 'Y') {
      showAlert('환불 규정 안내는 필수 항목 입니다.');
      return;
    }
    setLiveShotStep(3);
  };

  const onChangeVisitDate = (e) => {
    setDay(e.currentTarget.value);
  };

  const onPayRequestValid = useCallback(() => {
    if (isPaymentTermsAgree !== true) {
      alert('약관동의는 필수 입니다.');
      return false;
    }

    return true;
  }, [isPaymentTermsAgree]);

  const onSubmit = async () => {
    console.log('신청');
    showLoader();

    const mobDataKey = 'mobLiveShotData';
    if (isUndefined(prod?.dlrPrdId)) {
      const car = cloneDeep(prod?.car);
      const { crMnfcCdNm, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm } = car;
      car.crNm = `${crMnfcCdNm} ${crDtlMdlCdNm} ${crClsCdNm} ${crDtlClsCdNm}`;
      console.log('onSubmit -> car', car);
      const { data, statusinfo } = await dealerProdApi.insertDealerProd({ car, lvshotCrYn : 'Y' }).then((res) => res?.data);
      console.log('onSubmit -> data', data);
      console.log('onSubmit -> statusinfo', statusinfo);

      if (statusinfo?.returncd === '000') {
        hideLoader();
        const { dlrPrdId } = data;
        setProd(data)

        const addrBasicInfo = {
          useServiceType: '0020',
          rsvtDt: day,
          useTmsCnsnYn,
          rfdRuleCnsnYn,
          dlrPrdId,
          zipCd: address.postCode,
          addr1: address.addData,
          addr2: address.detailText,
          locCd: address.locCd,
          ctyCd: address.ctyCd,
          mbId: gInfoLive.id,
          paytype: selectedPayment.id,
          payAmt: prdInfo.prdSlAmt,
          mobPayDataKey: mobDataKey
        };

        if (hasMobile) {
          sessionStorage.setItem(mobDataKey, JSON.stringify(addrBasicInfo));
        }

        return addrBasicInfo;
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
      hideLoader();
      const addrBasicInfo2 = {
        useServiceType: '0020',
        rsvtDt: day,
        useTmsCnsnYn,
        rfdRuleCnsnYn,
        dlrPrdId: prod?.dlrPrdId,
        zipCd: address.postCode,
        addr1: address.addData,
        addr2: address.detailText,
        locCd: address.locCd,
        ctyCd: address.ctyCd,
        mbId: gInfoLive.id,
        paytype: selectedPayment.id,
        payAmt: prdInfo.prdSlAmt,
        mobPayDataKey: mobDataKey
      };

      if (hasMobile) {
        sessionStorage.setItem(mobDataKey, JSON.stringify(addrBasicInfo2));
      }
      return addrBasicInfo2;
    }

    hideLoader();
  };

  const onChangeUseTmsCnsnYn = (e) => {
    const val = e.target.checked ? 'Y' : 'N';
    setUseTmsCnsnYn(val);
  };
  const onChangeRfdRuleCnsnYn = (e) => {
    const val = e.target.checked ? 'Y' : 'N';
    setRfdRuleCnsnYn(val);
  };

  const handleCloseSearchAddr = useCallback(
    (e) => {
      e && e.preventDefault();
      setIsOpenSearchAddr(false);
    },
    [setIsOpenSearchAddr]
  );

  const openFpTerms = useCallback(
    (e, v) => {
      e.preventDefault();
      if (v.name === 'terms1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: 'Live shot 이용약관',
            options: ['close']
          }
        });
        setFpTerms1(true);
        setFpTerms2(false);
        setFpAddrPopUp(false);
      } else if (v.name === 'terms2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '환불 규정 안내',
            options: ['close']
          }
        });
        setFpTerms1(false);
        setFpTerms2(true);
        setFpAddrPopUp(false);
      }
    },
    [dispatch]
  );

  const openSearchAddr = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '주소 찾기',
          options: ['close']
        }
      });
      setFpTerms1(false);
      setFpTerms2(false);
      setFpAddrPopUp(true);
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
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  useEffect(() => {
    const params = {
      rsvtBrncCd: livePoint,
      salesDay: day
    };
    axiosGet('/api/mypage/dealer/selectLiveStudioRsvtCmplRtInq.do?' + qs.stringify(params)).then((payload) => {
      const data = payload.data.data;
      console.log(data);
      setReserveList(data);
    });
  }, [day, livePoint]);

  useEffect(() => {
    const date = moment()
      .add(1, 'days')
      .format('YYYYMMDD');
    axiosPost('/api/mypage/dealer/selectPrdInfo.do', { prdDvCd: 'AA02' }).then((payload) => {
      console.log('AA01', payload.data);
      setPrdInfo(payload.data.data);
    });

    axiosGet('/api/mypage/dealer/selectBusinessDays.do?outputCnt=3&bussDt=' + date).then((payload) => {
      const data = payload.data.data;
      const radioArray = [];
      for (const [i, v] of data.entries()) {
        radioArray.push({
          id: 'time' + i + 'am',
          value: v.bussDt + '000000',
          checked: i === 0 ? true : false,
          disabled: false,
          title: moment(v.bussDt, 'YYYYMMDD').format('YYYY년 MM월 DD일') + ' (' + v.bussDay + ') 오전'
        });
        radioArray.push({
          id: 'time' + i + 'fm',
          value: v.bussDt + '120000',
          checked: i === 0 ? true : false,
          disabled: false,
          title: moment(v.bussDt, 'YYYYMMDD').format('YYYY년 MM월 DD일') + ' (' + v.bussDay + ') 오후'
        });
      }
      setTimeList(radioArray);
      setDay(radioArray[0].value);

      if (prodItem?.car?.crNo) {
        console.log('차량넘버가 있으면 바로 검색');
        searchCar();
      }
    });

    window.addEventListener('message', inicisCallback);
    return () => {
      window.removeEventListener('message', inicisCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof paymentInfo !== 'undefined' && JSON.stringify(paymentInfo) !== JSON.stringify({})) {
      console.log('paymentInfo : ', paymentInfo);
      if (paymentInfo.returnCd === 'success') {
        if (paymentInfo.payMethod === 'VBANK') {
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
  }, [paymentInfo]);

  if (hasMobile === true) {
    return (
      <>
        <div className="live-reserve-sec">
          <Steps type={1} contents={['차량정보 입력', '주소/예약시간 선택', '결제하기', '예약완료']} active={liveShotStep} mode="stick" />
          {liveShotStep === 1 && (
            <>
              <div className="popup-reserve">
                <div className="reserve-wrap">
                  <p className="tit4 mb8">차량번호 입력</p>
                  <Input type="text" placeHolder="차량번호를 입력해주세요.(예: 12가1234)" isSelf={true} data={crNm} onBlur={(e) => crNmInputBlur(e)} />
                  <Button size="full" background="blue80" title="조회" radius={true} height={38} marginTop={8} onClick={searchCar} />
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
          {liveShotStep === 2 && (
            <div className="content-wrap">
              <table summary="예약정보 입력에 대한 내용" className="table-tp2 th-none">
                <tbody>
                  <tr>
                    <td>
                      <p className="tx-tit">방문주소</p>
                      <span className="bridge2">
                        <Input type="text" height={40} value={address?.addData} disabled={true} width="73%" />
                        <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={openSearchAddr} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} value={address?.detailText} disabled={true} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} value="현대글로비스(주)" disabled={true} />
                      </span>
                      <p className="tx-sub tx-blue80">* 입력해주신 주소에서 LiveShot 촬영이 진행됩니다. 정확한 주소를 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">날짜선택</p>
                      <ul className="radio-block tp3">
                        {(timeList || []).map((item, idx) => {
                          return (
                            <li key={idx}>
                              <Radio className="txt" id={item.id} label={item.title} value={item.value} checked={day} onChange={onChangeVisitDate} />
                            </li>
                          );
                        })}
                      </ul>
                      <MobSelectTerms
                        termsData={[
                          { id: 'chk-agree3', title: 'Live shot 이용약관(필수)', checked: false, name: 'terms1' },
                          { id: 'chk-agree4', title: '환불 규정 안내(필수)', checked: false, name: 'terms2' }
                        ]}
                        onTermsClick={openFpTerms}
                        onChange={handleFpTermsChange}
                      />
                      <div className="essential-point fs12 lh-none mt10">
                        <ul>
                          <li>
                            <i className="ico-dot" />
                            토·일요일 및 공휴일은 예약 불가
                          </li>
                          <li>
                            <i className="ico-dot" />
                            전일 예약 시 월요일 예약은 금요일에 가능합니다.
                          </li>
                        </ul>
                      </div>
                      <div className="essential-point fs12 tx-lg mt20">
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {liveShotStep === 3 && (
            <>
              <MobPaymentInfo
                title={'Live Shot 촬영예약'}
                payment={prdInfo}
                onTermsChange={handlePaymentTermsChange}
                paymentMethodList={commonPaymentMethodList}
                selectedPayment={selectedPayment}
                onPaymentMethodChanged={setSelectedPayment}
              />
              <Buttons align="center" className="full fixed">
                <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
                <IniPayButton
                  //directUrl={encodeURIComponent('http://58.87.52.197/mypage/dealer/sellcar/liveShotAppointment?type=reg&')}
                  directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/liveShotAppointment?type=reg&`)}
                  isMobile={true}
                  size="big"
                  background="blue80"
                  title="결제"
                  width={172}
                  height={60}
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
          {liveShotStep === 4 && (
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
        {liveShotStep === 1 && (
          <Buttons align="center" className="full fixed">
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
            <Button size="full" background="blue80" title="다음" height={56} onClick={(e) => onClickStep2(e)} />
          </Buttons>
        )}
        {liveShotStep === 2 && (
          <Buttons align="center" className="full fixed">
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={cancelPopup} />
            <Button size="full" background="blue80" title="다음" height={56} onClick={(e) => onClickStpe3(e)} />
          </Buttons>
        )}
        {liveShotStep === 4 && <Button className="fixed" size="full" background="blue80" title="확인" height={56} href="/mypage/dealer/sellcar/liveShotAppointment" />}

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">라이브샷 이용약관</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFpTerms} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">환불규정 안내</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFpTerms} />
              </div>
            </div>
          )}
          {fpAddrPopUp && <FindAddress AddressEvent={addrEvent} target={addrTarget} mode={'detail'} />}
        </MobFullpagePopup>
      </>
    );
  }

  return (
    <div className="popup-reserve">
      <div className="reserve-step">
        <Steps type={2} contents={['차량정보 입력', '주소/예약시간 선택', '결제하기', '예약완료']} active={liveShotStep} />
      </div>
      {/* step01 */}
      {liveShotStep === 1 && (
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
      {liveShotStep === 2 && (
        <div className="reserve-wrap">
          <table className="table-tp1 input search" summary="조회 영역">
            <caption className="away">조회 영역</caption>
            <colgroup>
              <col width="13.1%" />
              <col width="86.9%" />
            </colgroup>
            <tbody>
              <tr>
                <th>방문주소 입력</th>
                <td>
                  <span className="bridge2">
                    <Input type="text" width={387} value={address?.addData} disabled={true} />
                    <Button size="big" background="gray" title="주소검색" width={160} marginLeft={16} buttonMarkup={true} onClick={(e) => onSearchAddr(e, 'addr')} />
                  </span>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <Input type="text" value={address?.detailText} disabled={true} />
                </td>
              </tr>
              <tr>
                <th>방문일자 선택</th>
                <td>
                  <span className="bridge2">
                    <RadioGroup dataList={timeList} defaultValue={day} onChnage={(e) => onChangeVisitDate(e)} />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point">
            <ul>
              <li>- 예약일자 다음날부터 3일후까지 예약이 가능합니다.</li>
              <li>- 토·일요일 및 공휴일은 예약 불가</li>
            </ul>
          </div>

          <div className="agree-terms-wrap">
            <CheckBox id="chk-agree3" title="라이브샷 이용약관 (필수)" isSelf={false} checked={useTmsCnsnYn === 'Y'} onChange={(e) => onChangeUseTmsCnsnYn(e)} />
            <div className="terms-wrap">라이브샷 이용약관</div>
          </div>

          <div className="agree-terms-wrap">
            <CheckBox id="chk-agree4" title="환불규정 안내 (필수)" isSelf={false} checked={rfdRuleCnsnYn === 'Y'} onChange={(e) => onChangeRfdRuleCnsnYn(e)} />
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
            </ul>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={cancelPopup} />
            <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" buttonMarkup={true} onClick={(e) => onClickStpe3(e)} />
          </Buttons>
        </div>
      )}
      {liveShotStep === 3 && (
        <div className="reserve-wrap payment-sec method">
          <h3 className="sub-tit">이용권 정보</h3>
          <div className="point-area">
            <div className="pay-detail">
              <div className="pick-list">
                <ul>
                  <li>Live shot 이용권</li>
                </ul>
                <div className="sum">
                  <p className="price">
                    {prdInfo.prdSlAmt}
                    <span>원</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="coupon-wrap">
              <div className="coupon">
                <CheckBox id="chk4" title="쿠폰 적용" />
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
              ></RadioGroup>
              <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
            </div> */}
          </div>
          <div className="last-sum">
            <ul>
              <li>
                이용권금액
                <span>
                  {prdInfo.prdSlAmt}
                  <em>원</em>
                </span>
              </li>
              <li>
                할인금액
                <span>
                  0<em>원</em>
                </span>
              </li>
              <li>
                최종결제금액
                <span>
                  {prdInfo.prdSlAmt}
                  <em>원 (VAT 포함)</em>
                </span>
              </li>
            </ul>
          </div>

          <div className="method-wrap">
            <p>결제 수단</p>
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
            ></RadioGroup>
            <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
          </div> */}
          {/* #a1 증빙선택 추가 end */}

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={cancelPopup} />
            {/* <Button size="big" background="blue80" title="결제" width={172} height={60} mode="normal" buttonMarkup={true} onClick={onSubmit} /> */}
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
          </Buttons>
        </div>
      )}
      {liveShotStep === 4 && (
        <div className="reserve-wrap co-wrap">
          <p className="tit">예약이 완료되었습니다.</p>
          <p className="exp">예약 현황은 마이페이지 Live Service 촬영예약에서 확인 가능합니다.</p>
          {!isEmpty(VBankInfo) && (
            <table summary="라이브 샷 예약" className="table-tp1 mt32">
              <caption className="away">라이브 샷 예약</caption>
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
      <RodalPopup show={isOpenSearchAddr} type={'fade'} closedHandler={handleCloseSearchAddr} title="주소 검색" mode="normal" size="large">
        <FindAddress AddressEvent={addrEvent} target={addrTarget} />
      </RodalPopup>

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
          onClose={() => hideSeriesPop(false)}
        />
      </RodalPopup>
    </div>
  );
});

PopUpShotReservation.propTypes = {
  hasMobile: PropTypes.bool,
  onChange: PropTypes.func,
  paymentInfo: PropTypes.object
};
PopUpShotReservation.displayName = 'PopUpShotReservation';
export default PopUpShotReservation;
