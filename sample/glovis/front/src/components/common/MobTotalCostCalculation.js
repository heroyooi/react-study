import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectList from '@lib/share/items/MobSelectList';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import { getMobLocCodeList, getMonthlyInstallList, getTotalCostCalData, getCarTaxCalData } from '@src/actions/buycar/totalCost/totalCostAction';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';
import { objIsEmpty } from '@src/utils/CommonUtil';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import { preventScroll } from '@src/utils/CommonUtil';

const MobTotalCostCalculation = (pBuyViewInfo) => {
  const BuyViewInfo = pBuyViewInfo.BuyViewInfo;
  const dispatch = useDispatch();
  // const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { locList, LocCalData, monthlyList, carTaxCalData } = useSelector((state) => state.totalCost);
  const numberFormat = (val) => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const [carPrice, setCarPrice] = useState(BuyViewInfo.carPrice); // 차량 가격@@@@@@
  const [advancePay, setAdvancePay] = useState(''); // 선수금
  const [transRegistFee, setTransRegistFee] = useState(''); // 이전등록비
  const [registTax, setRegistTax] = useState(''); // 등록세
  const [acquTax, setAcquTax] = useState(''); // 취득세
  const [pbndByg, setPbndByg] = useState(''); // 공채매입비
  const [regRt, setRegRt] = useState('5'); // 등록세율
  const [acqRt, setAcqRt] = useState('2'); // 취득세율
  const [pbndBygCost, setPbndBygCost] = useState(null); // 공채매입고정비
  const [pbndBygRt, setPbndBygRt] = useState('5'); // 공채매입비율

  const [A, setA] = useState(''); // 할부원금
  const [B, setB] = useState(''); // 대출이자율
  const [F, setF] = useState(''); // 분자
  const [G, setG] = useState(''); // 분모
  const [H, setH] = useState(''); // 월할부금
  const [interest, setInterest] = useState(''); // 할부이자
  const [totalCost, setTotalCost] = useState(''); // 총 할부 금액

  const [usage, setUsage] = useState('2'); // 용도 라디오 체크
  const [enroll, setEnroll] = useState('1'); // 등록구분 라디오 체크
  const [enrollChk, setEnrollChk] = useState(true);
  const [calculateChk, setCalculateChk] = useState('1'); // 일할계산여부 라디오 체크
  const [assignChk, setAssignChk] = useState('1'); // 양도/양수인 라디오 체크
  const [assignChkCal, setAssignChkCal] = useState(false);
  const [carAssignDt, setCarAssignDt] = useState(moment());
  const [dspl, setDspl] = useState(BuyViewInfo.dspl); // 차량 배기량@@@@@@
  const [yy, setYy] = useState(BuyViewInfo.yy === undefined ? '선택' : BuyViewInfo.yy); // 차량 연식@@@@@@

  const [ccAmt, setCcAmt] = useState('200'); // 배기량별 세액
  const [alleviateRt, setAlleviateRt] = useState(); // 1년분, 1기분 경감율
  const [alleviateRt12, setAlleviateRt12] = useState(); // 2기분, 일할계산 경감율

  const [CarP6, setCarP6] = useState(); // 1기분 자동차세
  const [AduP6, setAduP6] = useState(); // 1기분 교육세

  const [CarP12, setCarP12] = useState(); // 2기분 자동차세
  const [AduP12, setAduP12] = useState(); // 2기분 교육세

  const [finalCarP, setFinalCarP] = useState(); // 일할계산 자동차세
  const [finalAduP, setFinalAduP] = useState(); // 일할계산 교육세

  const [calculate, setCalculate] = useState(true); // 자동차세 계산하기 버튼 (계산결과 테이블 disable기능)

  const [transmitterDt, setTransmitterDt] = useState(); // 양도자 보유 기간
  const [assigneeDt, setAssigneeDt] = useState(); // 양수자 보유 기간

  const [carOld6, setCarOld6] = useState(); // 1년분, 1기분 차령
  const [carOld12, setCarOld12] = useState(); // 2기분, 일할계산 차령

  const [periodDate, setPeriodDate] = useState('24'); // 할부기간 값
  const [period, setPeriod] = useState('13'); // 연이자율 값
  const [percent, setPercent] = useState('20'); // 선수율 값

  const [locCd, setLocCd] = useState('11'); // 거주지 선택
  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const [hiddenTab, setHiddenTab] = useState([]);

  const TotalCostData = {
    commercialYn: BuyViewInfo.commercialYn, // 차량사용용도(일반, 영업)
    crTypeCd: BuyViewInfo.crTypeCd, // 차종코드@@@@@@
    dspl: BuyViewInfo.dspl, // 배기량@@@@@@
    locCd: locCd, // 지역코드
    seatingCapacity: BuyViewInfo.seatingCapacity, // 인승@@@@@@
    maxTon: BuyViewInfo.maxTon // 톤@@@@@@
  };

  const [calPop, setCalPop] = useState(false);
  const [locState, setLocState] = useState({ label: '서울', value: '11', id: '11' });
  const [errorText, setRodalErrorText] = useState('');
  const [errPop, openErrorPopup, closeDimmMPop] = useRodal(false);

  // 연식 리스트
  const yearList = [
    { value: '선택', id: '선택', label: '선택' },
    { value: '2021', id: '2021', label: '2021년' },
    { value: '2020', id: '2020', label: '2020년' },
    { value: '2019', id: '2019', label: '2019년' },
    { value: '2018', id: '2018', label: '2018년' },
    { value: '2017', id: '2017', label: '2017년' },
    { value: '2016', id: '2016', label: '2016년' },
    { value: '2015', id: '2015', label: '2015년' },
    { value: '2014', id: '2014', label: '2014년' },
    { value: '2013', id: '2013', label: '2013년' },
    { value: '2012', id: '2012', label: '2012년' },
    { value: '2011', id: '2011', label: '2011년' },
    { value: '2010', id: '2010', label: '2010년' },
    { value: '2009', id: '2009', label: '2009년' },
    { value: '2008', id: '2008', label: '2008년' },
    { value: '2007', id: '2007', label: '2007년' },
    { value: '2006', id: '2006', label: '2006년' },
    { value: '2005', id: '2005', label: '2005년' },
    { value: '2004', id: '2004', label: '2004년' },
    { value: '2003', id: '2003', label: '2003년' },
    { value: '2002', id: '2002', label: '2002년' },
    { value: '2001', id: '2001', label: '2001년' },
    { value: '2000', id: '2000', label: '2000년' },
    { value: '1999', id: '1999', label: '1999년' },
    { value: '1998', id: '1998', label: '1998년' },
    { value: '1997', id: '1997', label: '1997년' },
    { value: '1996', id: '1996', label: '1996년' }
  ];

  // 선수율 리스트
  const percentList = [
    { value: '0', id: '0', label: '0%' },
    { value: '20', id: '20', label: '20%' },
    { value: '40', id: '40', label: '40%' },
    { value: '60', id: '60', label: '60%' },
    { value: '80', id: '80', label: '80%' },
    { value: '100', id: '100', label: '100%' }
  ];

  // 용도 라디오 리스트
  const usageList = [
    { id: 'non-business', value: '2', checked: true, disabled: false, label: '비영업용' },
    { id: 'business', value: '1', checked: false, disabled: false, label: '영업용' }
  ];

  // 등록구분 라디오 리스트
  const enrollList = [
    { id: 'first-half', value: '1', checked: true, disabled: false, label: '1/1~6/30등록차량' },
    { id: 'second-half', value: '2', checked: false, disabled: false, label: '7/1~12/31등록차량' }
  ];

  // 일할계산여부 라디오 리스트
  const calculateChkList = [
    { id: 'yes', value: '1', checked: true, disabled: false, label: '예' },
    { id: 'no', value: '2', checked: false, disabled: false, label: '아니오' }
  ];

  // 양도/양수인 리스트
  const assignChkList = [
    { id: 'transferor', value: '1', checked: true, disabled: false, label: '양도인' },
    { id: 'grantee', value: '2', checked: false, disabled: false, label: '양수인' }
  ];

  // 총비용 -- 등록세, 취득세 계산
  useEffect(() => {
    setRegistTax((carPrice * regRt) / 100); // 등록세 계산
    setAcquTax((carPrice * acqRt) / 100); // 취득세 계산
    if (pbndBygCost !== 0) {
      setPbndByg(pbndBygCost * 0.08);
    } else {
      setPbndByg(carPrice * (Number(pbndBygRt) / 100) * 0.08);
    }
  }, [carPrice, regRt, acqRt, pbndBygCost, pbndBygRt]);

  // 총비용 -- 이전등록비 합계
  useEffect(() => {
    setTransRegistFee(Number(registTax) + Number(acquTax) + Number(pbndByg) + 1000 + 3000);
  }, [registTax, acquTax, pbndByg]);

  // 할부내역 -- 기본금액 계산
  useEffect(() => {
    const Bform = (period / 100 / 12).toFixed(6);
    setAdvancePay((carPrice * percent) / 100);
    setA(carPrice - advancePay); // 할부원금 계산
    setB(Bform); // 대출이자율 계산
  }, [carPrice, percent, advancePay, period]);

  //  할부내역 -- 분모,분자 계산
  useEffect(() => {
    const Fform = A * B * Math.pow(Number(1 + Number(B)), Number(periodDate));
    const Gform = Math.pow(Number(1 + Number(B)), Number(periodDate)) - 1;
    setF(Fform);
    setG(Gform);
  }, [A, B, periodDate]);

  //  할부내역 -- 월 할부금 계산
  useEffect(() => {
    setH(Number((F / G).toFixed(0)));
  }, [F, G]);

  //  할부내역 -- 할부이자 계산
  useEffect(() => {
    setInterest(H * periodDate - A);
  }, [A, H, periodDate]);

  //  할부내역 -- 총 할부 금액 계산
  useEffect(() => {
    setTotalCost(A + interest);
  }, [A, interest]);

  useEffect(() => {
    const Fday = moment('06-30', 'MM-DD');
    const Sday = moment('12-31', 'MM-DD');
    const formDt = moment(carAssignDt, 'MM-DD');
    if (enroll === '1') {
      const basicP = Number(dspl) * Number(ccAmt);
      const allP = basicP * (1 - Number(alleviateRt12) / 100);
      // 1년분, 1기분, 2기분 계산
      setCarP6(Number(allP) / 2);
      setAduP6((Number(allP) / 2) * 0.3);
      setCarP12(Number(allP) / 2);
      setAduP12((Number(allP) / 2) * 0.3);
      if (assignChk === '1' || assignChkCal === true) {
        // 일할계산
        const A = 1 - Number(alleviateRt12) / 100;
        const B = (Number(transmitterDt) / 181).toFixed(2);
        const carP = Math.ceil(((basicP * A) / 2) * B);
        const aduP = Math.ceil(carP * 0.3);
        setFinalCarP(carP);
        setFinalAduP(aduP);
      } else if (assignChk === '2' || assignChkCal === false) {
        // 일할계산
        const basicP = Number(dspl) * Number(ccAmt);
        const A = 1 - Number(alleviateRt12) / 100;
        const B = (Number(assigneeDt) / 181).toFixed(2);
        const carP = Math.ceil(((basicP * A) / 2) * B);
        const aduP = Math.ceil(carP * 0.3);
        setFinalCarP(carP);
        setFinalAduP(aduP);
      }
    }
    if (enroll === '2') {
      const basicP = Number(dspl) * Number(ccAmt);
      const allP = basicP * (1 - Number(alleviateRt) / 100);
      const Car12 = basicP * (1 - Number(alleviateRt12) / 100);
      const A = (Number(transmitterDt) / 181).toFixed(2); // 양도자
      const A2 = (Number(transmitterDt) / 184).toFixed(2); // 양도자
      const B = ((Number(assigneeDt) - 184) / 181).toFixed(2); // 양수인
      const B2 = (Number(assigneeDt) / 184).toFixed(2); // 양수인
      // 1년분, 1기분, 2기분 계산
      setCarP6(Number(allP) / 2);
      setAduP6((Number(allP) / 2) * 0.3);
      setCarP12(Number(Car12) / 2);
      setAduP12((Number(Car12) / 2) * 0.3);
      if (assignChk === '1' || assignChkCal === true) {
        if (formDt < Fday) {
          // 일할계산
          const calculate = Math.ceil((allP / 2) * A);
          setFinalCarP(Math.ceil(calculate));
          setFinalAduP(Math.ceil(calculate * 0.3));
        } else if (formDt > Fday) {
          const calculate = Math.ceil((Car12 / 2) * A2);
          setFinalCarP(Math.ceil(calculate));
          setFinalAduP(Math.ceil(calculate * 0.3));
        }
      } else if (assignChk === '2' || assignChkCal === false) {
        if (formDt < Fday) {
          const calculate = (allP / 2) * B + (Car12 / 2) * 1;
          setFinalCarP(calculate);
          setFinalAduP(calculate * 0.3);
        } else if (formDt > Fday) {
          const calculate = Math.ceil((Car12 / 2) * B2);
          setFinalCarP(calculate);
          setFinalAduP(calculate * 0.3);
        }
      }
    }
  }, [transmitterDt, assigneeDt, dspl, ccAmt, alleviateRt, alleviateRt12, assignChk, enroll, carAssignDt, assignChkCal]);

  useEffect(() => {
    if (!isEmpty(LocCalData)) {
      setRegRt(LocCalData.regRt);
      setAcqRt(LocCalData.acqRt);
      setPbndBygRt(LocCalData.pbndBygRt);
      setPbndBygCost(LocCalData.pbndBygCost);
    }
  }, [LocCalData]);

  useEffect(() => {
    if (!isEmpty(carTaxCalData)) {
      setAlleviateRt(carTaxCalData.alleviateRt);
      setAlleviateRt12(carTaxCalData.alleviateRt + 5);
      setCcAmt(carTaxCalData.intRt);
    }
  }, [carTaxCalData]);

  const handleLocChanged = useCallback((e, deps) => {
    const newLocState = Object.assign({ ...locState }, { value: deps.value.toString(), label: deps.label });
    setLocState(newLocState);
    setLocCd(deps.toString());

    const ApiData = {
      commercialYn: BuyViewInfo.commercialYn,
      crTypeCd: BuyViewInfo.dspl,
      locCd: deps.value.toString(),
      seatingCapacity: BuyViewInfo.seatingCapacity,
      maxTon: BuyViewInfo.maxTon
    };

    dispatch(getTotalCostCalData(ApiData));
  },
    [locState]
  );

  const handlePeriodChanged = useCallback((e, deps) => {
    if (deps.value === '13') {
      setPeriod(deps.value);
      setPeriodDate(deps.origin);
    }
    if (deps.value === '15') {
      setPeriod(deps.value);
      setPeriodDate(deps.origin);
    }
    if (deps.value === '17') {
      setPeriod(deps.value);
      setPeriodDate(deps.origin);
    }
    if (deps.value === '19') {
      setPeriod(deps.value);
      setPeriodDate(deps.origin);
    }
  });

  const handleUsageChanged = useCallback(e => {
    setUsage(e.target.value);
  });

  const handleEnrollChanged = useCallback(e => {
    setEnroll(e.target.value);
  });

  const handleCalcChkChanged = useCallback(e => {
    setCalculateChk(e.target.value);
  });

  const handlePercentChanged = useCallback((e, deps) => {
    setPercent(deps.value);
  });

  const ClickCalculate = useCallback((e) => {
    e.preventDefault();
    if (yy === undefined || yy === '선택') {
      setRodalErrorText('연식을 선택하세요.')
      return openErrorPopup(e, 'fade');
    }
    setIsCal(true);
    setHiddenTab([0, 1, 2]);

    const Fday = moment('06-30', 'MM-DD');
    const Sday = moment('12-31', 'MM-DD');
    const formDt = moment(carAssignDt, 'MM-DD');
    const formYY = moment(carAssignDt).format('YYYY');
    const sumYear = Number(formYY) - Number(yy);

    if (enroll === '1') {
      if (formDt < Fday) {
        setCarOld6(sumYear + 1);
        setCarOld12(sumYear + 1);
      }
      const DateForm = moment.duration(Fday.diff(moment(carAssignDt, 'MM-DD'))).asDays();
      const tranDt = 181 - Math.ceil(DateForm);
      // const tranDtTest = 181 - DateForm;
      const assignDt = Math.ceil(DateForm);
      // const assignDtTest = DateForm;
      setTransmitterDt(tranDt);
      if (assignDt === 0) {
        setAssigneeDt(0);
      } else {
        setAssigneeDt(assignDt);
      }
      setEnrollChk(true);
    }
    if (enroll === '2') {
      if (formDt < Fday) {
        setCarOld6(sumYear);
        setCarOld12(sumYear + 1);
        const DateForm = moment.duration(Fday.diff(moment(carAssignDt, 'MM-DD'))).asDays();
        setTransmitterDt(181 - Math.ceil(DateForm) - 181);
        setAssigneeDt(Math.ceil(DateForm) + 184);
      } else if (formDt > Fday) {
        setCarOld6(sumYear);
        setCarOld12(sumYear + 1);
        const DateForm = moment.duration(Sday.diff(moment(carAssignDt, 'MM-DD'))).asDays();
        setTransmitterDt(183 - Math.ceil(DateForm));
        setAssigneeDt(Math.ceil(DateForm));
      }
      const basicP = Number(dspl) * Number(ccAmt);
      const allP = basicP * (1 - Number(alleviateRt) / 100);
      const Car12 = basicP * (1 - Number(alleviateRt12) / 100);
      // 1년분, 1기분, 2기분 계산
      setCarP6(Number(allP) / 2);
      setAduP6((Number(allP) / 2) * 0.3);
      setCarP12(Number(Car12) / 2);
      setAduP12((Number(Car12) / 2) * 0.3);
      setEnrollChk(false);
    }
    if (assignChk === '1') {
      setAssignChkCal(true);
    }
    if (assignChk === '2') {
      setAssignChkCal(false);
    }
    if (calculateChk === '2') {
      setCalculate(true);
      return;
    } else if (calculateChk === '1') {
      setCalculate(false);
    }

    const sendData = {
      commercialYn: usage,
      dspl: dspl,
      yy: sumYear
    };
    dispatch(getCarTaxCalData(sendData));
  },
    [yy, transmitterDt, assigneeDt, assignChk, enroll, dspl, ccAmt, alleviateRt, alleviateRt12, carAssignDt]);

  const handleYearChanged = useCallback((e, deps) => {
    setYy(deps.value);
  });

  const handleCalRe = useCallback((e) => {
    e.preventDefault();
    setIsCal(false);
    setHiddenTab([]);
  }, []);

  useEffect(() => {
    preventScroll(true);
  }, []);

  const handleCalendarPop = (e) => {
    e.preventDefault();
    setCalPop(true);
    preventScroll(true);
  }
  const calendarCallback = (e, date) => {
    e.preventDefault();
    setCarAssignDt(date);
    setCalPop(false);
    preventScroll(false);
  }
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop(false);
    preventScroll(false);
  }

  const handleErrorClick = (e) => {
    e.preventDefault();
    openErrorPopup(false);
  }

  useEffect(() => {
    // dispatch(getLocCodeList());
    dispatch(getMobLocCodeList());
    dispatch(getMonthlyInstallList());
    dispatch(getTotalCostCalData(TotalCostData));
  }, []);

  return (
    <>
      <TabMenu type="type2" mount={false} isFix={true} defaultTab={0}>
        <TabCont tabTitle="총비용" id="tab1-1" index={0}>
          <div className="content-wrap">
            <fieldset className="write-form">
              <legend>거주지 선택 폼</legend>
              <div className="field-group">
                <div className="category"><label htmlFor="local-select">거주지 선택</label></div>
                <div className="field">
                  {!objIsEmpty(locList) && <MobSelectList
                    itemsSource={locList}
                    selectedItem={findLabelValue(locList, locState.value)}
                    displayMemberPath={'label'}
                    selectedValuePath={'value'}
                    subPop={true}
                    onClick={handleLocChanged}
                  />}
                </div>
              </div>
            </fieldset>
            <div className="calculation-table">
              <table summary="차량가격에 대한 내용" className="table-tp1 td-r">
                <caption className="away">차량가격</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td><strong className="result">{!isNaN(carPrice) && numberFormat(carPrice)}</strong>원</td>
                  </tr>
                </tbody>
              </table>
              <div className="ico-symbol">
                <i>+</i>
              </div>
              <table summary="이전등록비 합계에 대한 내용" className="table-tp1 td-r">
                <caption className="away">이전등록비 합계</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이전등록비 합계</th>
                    <td><strong className="result">{numberFormat(transRegistFee)}</strong>원</td>
                  </tr>
                  <tr>
                    <th>등록세({regRt}%)</th>
                    <td>{numberFormat(registTax) + '원'}</td>
                  </tr>
                  <tr>
                    <th>취득세({acqRt}%)</th>
                    <td>{numberFormat(acquTax) + '원'}</td>
                  </tr>
                  <tr>
                    <th>공채매입비</th>
                    <td>{numberFormat(pbndByg) + '원'}</td>
                  </tr>
                  <tr>
                    <th>증지대</th>
                    <td>1,000원</td>
                  </tr>
                  <tr>
                    <th>인지대</th>
                    <td>3,000원</td>
                  </tr>
                </tbody>
              </table>
              <div className="ico-symbol">
                <i>=</i>
              </div>
              <table summary="총 구매 예상 비용에 대한 내용" className="table-tp1 td-r">
                <caption className="away">총 구매 예상 비용</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>총 구매 예상 비용</th>
                    <td><strong className="result">{numberFormat(carPrice + transRegistFee)}</strong>원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="desc-list">
              <li>위 금액은 예상비용으로 실제 금액과 상이할 수 있으며, 경우에 따라 매도비용, 알선수수료가 발생할 수 있습니다.</li>
              <li>실제 거래신고 금액이 과세표준금액보다 적으면, 과세표준금액 기준으로 이전등록비가 부과됩니다.</li>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="할부내역" id="tab1-2" index={1}>
          <div className="content-wrap">
            <fieldset className="write-form col2">
              <legend>할부계산</legend>
              <div className="field-group">
                <div className="category"><label htmlFor="local-select">할부기간</label></div>
                <div className="field">
                  {!objIsEmpty(monthlyList) && <MobSelectList
                    itemsSource={monthlyList}
                    selectedItem={findLabelValue(monthlyList, period)}
                    displayMemberPath={'label'}
                    selectedValuePath={'value'}
                    subPop={true}
                    onClick={handlePeriodChanged}
                  />}
                </div>
              </div>
              <div className="field-group">
                <div className="category"><label htmlFor="local-select">선수율</label></div>
                <div className="field">
                  {!objIsEmpty(percentList) && <MobSelectList
                    itemsSource={percentList}
                    selectedItem={findLabelValue(percentList, percent)}
                    displayMemberPath={'label'}
                    selectedValuePath={'value'}
                    subPop={true}
                    onClick={handlePercentChanged}
                  />}
                </div>
              </div>
            </fieldset>
            <div className="calculation-table">
              <table summary="차량가격" className="table-tp1 td-r">
                <caption className="away">차량가격</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td><strong className="result">{numberFormat(carPrice)}</strong>원</td>
                  </tr>
                  <tr>
                    <th>선수금({percent}%)</th>
                    <td>{numberFormat(advancePay)}원</td>
                  </tr>
                </tbody>
              </table>
              <table summary="총 할부 금액" className="table-tp1 td-r">
                <caption className="away">총 할부 금액</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>총 할부 금액</th>
                    <td><strong className="result">{numberFormat(totalCost)}</strong>원</td>
                  </tr>
                  <tr>
                    <th>할부원금</th>
                    <td>{numberFormat(A) + '원'}</td>
                  </tr>
                  <tr>
                    <th>할부이자</th>
                    <td>{numberFormat(interest) + '원'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="desc-list">
              <li>기준이율 : 13% (할부기간, 할부업체, 개인 신용상태 등에 따라 변동 가능)</li>
            </ul>
            <div className="calculation-table">
              <table summary="월 할부 예상 금액(24개월)" className="table-tp1 td-r">
                <caption className="away">월 할부 예상 금액(24개월)</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>월 할부 예상 금액<br />({periodDate}개월)</th>
                    <td><strong className="result">{numberFormat((totalCost / periodDate).toFixed(0))}</strong>원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="desc-list">
              <li>대출 이용 시 또는 할부 판매 가능 차량의 경우에 대략적인 월 할부금을 확인하실 수 있습니다.</li>
              <li>위 금액은 참고자료이며, 정확한 금액은 대출/할부 업체에 문의하세요.</li>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="자동차세" id="tab1-3" index={2}>
          <div className="content-wrap">
            <TabMenu type="type1" mount={false} isFix={false} hiddenTab={hiddenTab}>
              <TabCont tabTitle="일반승용차" id="tab2-1" index={0} className="w-fix-btn">
                {
                  !isCal
                    ? (
                      <>
                        <table summary="일반승용차 자동차세 정보에 대한 내용" className="table-tp2 input th-c th-l">
                          <caption className="away">일반승용차 자동차세</caption>
                          <colgroup>
                            <col width="33.1%" />
                            <col width="66.9%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>용도</th>
                              <td>
                                <RadioGroup className="full-radio-group col2" dataList={usageList} defaultValue={usage} onChange={handleUsageChanged} />
                              </td>
                            </tr>
                            <tr>
                              <th>등록구분</th>
                              <td>
                                <RadioGroup className="full-radio-group col2" dataList={enrollList} defaultValue={enroll} onChange={handleEnrollChanged} />
                              </td>
                            </tr>
                            <tr>
                              <th><label htmlFor="year">연식</label></th>
                              <td>
                                {!objIsEmpty(yearList) && <MobSelectList
                                  itemsSource={yearList}
                                  selectedItem={findLabelValue(yearList, yy)}
                                  displayMemberPath={'label'}
                                  selectedValuePath={'value'}
                                  subPop={true}
                                  onClick={handleYearChanged}
                                />}
                              </td>
                            </tr>
                            <tr>
                              <th><label htmlFor="exhaust-volume">배기량(cc)</label></th>
                              <td>
                                <Input type="text" id="engine-cc" placeHolder="1951" height={38} value={dspl} onChange={(e) => setDspl(e.target.value)} />
                              </td>
                            </tr>
                            <tr>
                              <th>일할계산여부</th>
                              <td>
                                <RadioGroup className="full-radio-group col2" dataList={calculateChkList} defaultValue={calculateChk} onChange={handleCalcChkChanged} />
                              </td>
                            </tr>
                            {calculateChk === '1' && (
                              <tr>
                                <th>차량양도일</th>
                                <td>
                                  <DatePicker defaultValue={carAssignDt} inputWidth={100} inputHeight={38} onClick={handleCalendarPop} />
                                </td>
                              </tr>)
                            }
                            {calculateChk === '1' && (
                              <tr>
                                <th>양수/양도인</th>
                                <td>
                                  <RadioGroup className="full-radio-group col2" dataList={assignChkList} defaultValue={assignChk} onChange={(e) => setAssignChk(e.target.value)} />
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Button size="full" background="blue80" className="fixed" title="계산하기" onClick={ClickCalculate} />
                      </>
                    ) : (calculateChk === 1 ? (
                      <>
                        <div className="calculation-table">
                          <h3>계산결과<span className="desc">(과세년도 : {moment().format('YYYY')}년 / cc당 세액 : {ccAmt}원)</span></h3>
                          <table summary="1년분" className="table-tp1 td-r">
                            <caption className="away">1년분</caption>
                            <colgroup>
                              <col width="50%" />
                              <col width="50%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>1년분<p className="criteria">차령: {carOld6}년, 경감률: {!enrollChk ? alleviateRt : alleviateRt12}%</p></th>
                                <td><strong className="result">{numberFormat(CarP6 + CarP12 + AduP6 + AduP12)}</strong>원</td>
                              </tr>
                              <tr>
                                <th>자동차세</th>
                                <td>{numberFormat(CarP6 + CarP12)}원</td>
                              </tr>
                              <tr>
                                <th>교육세</th>
                                <td>{numberFormat(AduP6 + AduP12)}원</td>
                              </tr>
                            </tbody>
                          </table>
                          <table summary="1기분(6월)" className="table-tp1 td-r">
                            <caption className="away">1기분(6월)</caption>
                            <colgroup>
                              <col width="50%" />
                              <col width="50%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>1기분(6월)<p className="criteria">차령: {carOld6}년, 경감률: {!enrollChk ? alleviateRt : alleviateRt12}%</p></th>
                                <td><strong className="result">{numberFormat(CarP6 + AduP6)}</strong>원</td>
                              </tr>
                              <tr>
                                <th>자동차세</th>
                                <td>{numberFormat(CarP6)}원</td>
                              </tr>
                              <tr>
                                <th>교육세</th>
                                <td>{numberFormat(AduP6)}원</td>
                              </tr>
                            </tbody>
                          </table>
                          <table summary="2기분(12월)" className="table-tp1 td-r">
                            <caption className="away">2기분(12월)</caption>
                            <colgroup>
                              <col width="50%" />
                              <col width="50%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>2기분(12월)<p className="criteria">차령: {carOld12}년, 경감률: {alleviateRt12}%</p></th>
                                <td><strong className="result">{numberFormat(CarP12 + AduP12)}</strong>원</td>
                              </tr>
                              <tr>
                                <th>자동차세</th>
                                <td>{numberFormat(CarP12)}원</td>
                              </tr>
                              <tr>
                                <th>교육세</th>
                                <td>{numberFormat(AduP12)}원</td>
                              </tr>
                            </tbody>
                          </table>
                          <table summary="일할계산" className="table-tp1 td-r">
                            <caption className="away">일할계산</caption>
                            <colgroup>
                              <col width="50%" />
                              <col width="50%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>일할계산<p className="criteria">차령: {carOld12}년, 경감률: {alleviateRt12}%, 기준일 : {assignChkCal ? transmitterDt : assigneeDt}일</p></th>
                                <td><strong className="result">{numberFormat(finalCarP + finalAduP)}</strong>원</td>
                              </tr>
                              <tr>
                                <th>자동차세</th>
                                <td>{numberFormat(finalCarP)}원</td>
                              </tr>
                              <tr>
                                <th>교육세</th>
                                <td>{numberFormat(finalAduP)}원</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <ul className="desc-list">
                          <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </li>
                        </ul>
                      </>) : (
                        <>
                          <div className="calculation-table">
                            <h3>계산결과<span className="desc">(과세년도 : {moment().format('YYYY')}년 / cc당 세액 : {ccAmt}원)</span></h3>
                            <table summary="1년분" className="table-tp1 td-r">
                              <caption className="away">1년분</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>1년분<p className="criteria">차령: {carOld6}년, 경감률: {!enrollChk ? alleviateRt : alleviateRt12}%</p></th>
                                  <td><strong className="result">{numberFormat(CarP6 + CarP12 + AduP6 + AduP12)}</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>{numberFormat(CarP6 + CarP12)}원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>{numberFormat(AduP6 + AduP12)}원</td>
                                </tr>
                              </tbody>
                            </table>
                            <table summary="1기분(6월)" className="table-tp1 td-r">
                              <caption className="away">1기분(6월)</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>1기분(6월)<p className="criteria">차령: {carOld6}년, 경감률: {!enrollChk ? alleviateRt : alleviateRt12}%</p></th>
                                  <td><strong className="result">{numberFormat(CarP6 + AduP6)}</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>{numberFormat(CarP6)}원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>{numberFormat(AduP6)}원</td>
                                </tr>
                              </tbody>
                            </table>
                            <table summary="2기분(12월)" className="table-tp1 td-r">
                              <caption className="away">2기분(12월)</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>2기분(12월)<p className="criteria">차령: {carOld12}년, 경감률: {alleviateRt12}%</p></th>
                                  <td><strong className="result">{numberFormat(CarP12 + AduP12)}</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>{numberFormat(CarP12)}원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>{numberFormat(AduP12)}원</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <ul className="desc-list">
                            <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </li>
                          </ul>
                        </>
                      )
                    )
                }
                {isCal && <Button size="full" background="blue80" className="fixed" title="다시 계산하기" onClick={handleCalRe} />}
              </TabCont>
              <TabCont tabTitle="승합차/버스" id="tab2-2" index={1}>
                <div className="calculation-table mt16">
                  <h3>1년분 자동차세</h3>
                  <table summary="승합차/버스 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">승합차/버스 자동차세</caption>
                    <colgroup>
                      <col width="33.33%" />
                      <col width="33.33%" />
                      <col width="33.33%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>영업용</th>
                        <th>비영업용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>고속버스</td>
                        <td>100,000원</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>대형전세버스</td>
                        <td>70,000원</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>소형전세버스</td>
                        <td>50,000원</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>대형일반버스</td>
                        <td>42,000원</td>
                        <td>115,000원</td>
                      </tr>
                      <tr>
                        <td>소형일반버스</td>
                        <td>25,000원</td>
                        <td>65,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="desc-list">
                  <li>단, 10인승 이하의 승합차는 일반승용차의 세율이 적용됩니다.</li>
                  <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요.</li>
                </ul>
              </TabCont>
              <TabCont tabTitle="화물/특장" id="tab2-3" index={2}>
                <div className="calculation-table mt16">
                  <h3>화물차 1년분 자동차세</h3>
                  <table summary="화물/특장 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">화물/특장 자동차세</caption>
                    <colgroup>
                      <col width="33.33%" />
                      <col width="33.33%" />
                      <col width="33.33%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>영업용</th>
                        <th>비영업용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1톤 이하</td>
                        <td>6,600원</td>
                        <td>28,500원</td>
                      </tr>
                      <tr>
                        <td>2톤 이하</td>
                        <td>9,600원</td>
                        <td>34,500원</td>
                      </tr>
                      <tr>
                        <td>3톤 이하</td>
                        <td>13,500원</td>
                        <td>48,000원</td>
                      </tr>
                      <tr>
                        <td>4톤 이하</td>
                        <td>18,000원</td>
                        <td>63,000원</td>
                      </tr>
                      <tr>
                        <td>5톤 이하</td>
                        <td>22,500원</td>
                        <td>79,500원</td>
                      </tr>
                      <tr>
                        <td>8톤 이하</td>
                        <td>36,000원</td>
                        <td>130,000원</td>
                      </tr>
                      <tr>
                        <td>10톤 이하</td>
                        <td>45,000원</td>
                        <td>157,500원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="calculation-table mt32">
                  <h3>특장차 1년분 자동차세</h3>
                  <table summary="화물/특장 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">화물/특장 자동차세</caption>
                    <colgroup>
                      <col width="33.33%" />
                      <col width="33.33%" />
                      <col width="33.33%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>영업용</th>
                        <th>비영업용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>4톤 초과(대형)</td>
                        <td>36,000원</td>
                        <td>157,500원</td>
                      </tr>
                      <tr>
                        <td>4톤 이하(소형)</td>
                        <td>13,500원</td>
                        <td>58,500원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="desc-list">
                  <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </li>
                </ul>
              </TabCont>
            </TabMenu>
          </div>
        </TabCont>
      </TabMenu>
      {
        <>
          <div className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
          <MobBottomArea active={calPop} isFixButton={true} zid={102}>
            <MobCalendar date={carAssignDt} callback={calendarCallback} />
          </MobBottomArea>
        </>
      }
      <RodalPopup show={errPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={true}>
        <div className="con-wrap">
          <p className="tit1">항목선택.</p>
          <p>{errorText}</p>
          <Buttons align="right" marginTop={16}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight={500} onClick={handleErrorClick} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )
}

export default MobTotalCostCalculation;