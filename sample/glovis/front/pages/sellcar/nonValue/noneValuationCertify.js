import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import qs from 'qs';
import moment from 'moment';
import * as http from '@src/utils/HttpUtils';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL } from '@src/actions/types';
import { createValidator } from '@lib/share/validator';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCarMartInfoAction, resetCarAction } from '@src/actions/sellcar/sellCarAction';
import tsAuthScheme from '@lib/share/validator/sellcar/tsAuth';
import RadioGroup from '@lib/share/items/RadioGroup';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
import CarSeriesSelection from '@src/components/car/CarSeriesSelection';
import next from 'next';

const TS_URL = 'https://testautobell.glovis.net';

const nextPage = `/sellcar/nonValue/noneValuationSellCarSearch`;

const tsValidator = createValidator(tsAuthScheme, {
  required: ['crNo', 'name', 'hashValue', 'timeStamp', 'svcCodeArr']
});

const tsInfoValidator = createValidator(tsAuthScheme, {
  required: ['crNo', 'name']
});



const NoneValuationCertify = () => {
  let tsPopup = '';
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });

  // TS 인증관련
  const [availBtn, setAvailBtn] = useState(false);
  const [tsData, setTsData] = useState({ name: gInfoLive().name ? gInfoLive().name : '', crNo: '' });
  const [tsAuth, setTsAuth] = useState(false);
  const { showAlert, showConfirm } = useContext(SystemContext);
  const { car, carSise } = useSelector((rootStore) => rootStore.sellCarStore);
  const [displaySeriesPop, setDisplaySeriesPop, showSeriesPop, hideSeriesPop] = useRodal(false, true);
  const [selectedSeries, setSelectedSeries] = useState();
  
  
  const checkAvailForSale = () => {
    return true;
    if (car.drvDist === 0) {
      return undefined;
    }
    if (isEmpty(car.frstRegDt)) {
      return undefined;
    }
    const now = moment();
    const frstRegDt = moment(car.frstRegDt, 'YYYY-MM-DD');
    const diff = now.diff(frstRegDt, 'months', true);    
    if (car.drvDist > 30000 || diff > 33) {
      return false;
    }
    return true;
  }

  const authBtnHandler = async (e) => {
    e.preventDefault();

    const isIE = false || !!document.documentMode;
    if (isIE === true && window.navigator && window.navigator.userAgent.includes('Windows NT 6.1') === true) {
      // eslint-disable-next-line no-alert
      alert('Window7 운영체제 상 Internet Explorer는 이용이 불가합니다.\n크롬브라우저로 접속하시거나, 차량정보 입력 조회를 이용해주세요.');
      return;
    }

    const valid = tsValidator.validate({ ...tsData });
    if (!valid.success) {
      // console.log(valid.error);
      showAlert(valid.error[0].label);
      return false;
    }
    // TS 인증 팝업을 띄우기
    const form = document.querySelector('#provideHashFromUnifixed');
    if (tsPopup) {
      return false;
    }
    // 그 외의 경우 팝업을 띄움
    tsPopup = window.open('', 'privde', 'height=0, width=0');

    const timer = setInterval(function() {
      if (tsPopup.closed) {
        clearInterval(timer);

        // dispatch(getCarMartInfoAction({ crNo: tsData.crNo }));
        // setTsAuth(true);

        http.axiosGet(`${TS_URL}/api/ts/data/getAuthResult.do?hashvalue=${tsData.hashValue}`).then(async (res) => {
          if (res.data.data === 1) {
            dispatch(getCarMartInfoAction({ crNo: tsData.crNo }));
            setTsAuth(true);
          } else {
            showAlert('인증에 실패했습니다.', () => {
              location.reload();
            });
          }
        });
      }
    }, 1000);

    form.target = 'privde';
    form.submit();
  };

  // 무평가 가능 차량인지 체크
  const checkAvail = useCallback(() => {
    if (car.drvDist === 0) {
      showAlert('주행거리가 되지 않아 무평가 판매 서비스를 신청할 수 없습니다.', () => {
        location.href = '/sellcar/nonValue/noneValuationGuide';
      });
    }
    if (isEmpty(car.frstRegDt)) {
      showAlert('출시년도 가 되지 않아 무평가 판매 서비스를 신청할 수 없습니다.', () => {
        location.href = '/sellcar/nonValue/noneValuationGuide';
      });
    }
    const now = moment();
    const frstRegDt = moment(car.frstRegDt, 'YYYY-MM-DD');
    const diff = now.diff(frstRegDt, 'months', true);
    if (car.drvDist > 30000 || diff > 33) {
      showConfirm(
        '연식 또는 주행거리가 무평가 판매 조건(33개월 미만, 3만Km 미만) 맞지 않습니다.<br/>방문평가 판매를 진행 하시겠습니까?<br/><br/>* 확인: 방문평가 판매 화면으로 이동<br/>* 취소: 내차팔기 소개 화면으로 이동',
        () => {
          Router.push(`/sellcar/visit/visitValuationRequest?crNo=${tsData.crNo}&name=${tsData.name}`);
        },
        () => {
          location.href = '/sellcar/sellCar';
        }
      );
    } else {
      const { tsKey, seriesno } = selectedSeries ?? {};
      const params = { crNo: tsData.crNo, tsKey, seriesno };
      Router.push(nextPage + '?' + qs.stringify(params));
    }
  }, [car]);

  const onSeriesSubmit = () => {
    hideSeriesPop(false);
    const { tsKey, seriesno } = selectedSeries ?? {};
    const params = { crNo: tsData.crNo, tsKey, seriesno };
    dispatch(getCarMartInfoAction(params));
  };

  useEffect(() => {
    const valid = tsInfoValidator.validate(tsData);
    if (valid.success) {
      http
        .axiosGet(`${TS_URL}/api/ts/data/getTsConfirmValue.do?carNo=${tsData.crNo}&userNm=${tsData.name}`)
        .then((res) => {
          const { hashValue, timeStamp, svcCodeArr } = res.data.data;
          setTsData({
            ...tsData,
            hashValue,
            timeStamp,
            svcCodeArr
          });
        })
        .catch((err) => {
          return {};
        });
    }
  }, [tsData.crNo, tsData.name]);

  useEffect(() => {
    const valid = tsValidator.validate(tsData);
    if (valid.success) {
      setAvailBtn(true);
    } else {
      setAvailBtn(false);
    }
  }, [tsData]);

  useEffect(() => {    
    if (car?.seriesList) {
      showSeriesPop(true);
    } else if (!isEmpty(car) && tsAuth) {
      checkAvail();
    }
  }, [car, tsAuth]);

  useEffect(() => {
    dispatch(resetCarAction());
  }, []);

  const [gradePopupShow, setGradePopupShow, openGradePopup, closeGradePopup] = useRodal(false);
  const handleOpenGradePopUp = useCallback(
    (e) => {
      openGradePopup(e, 'fade');
    },
    [openGradePopup]
  );

  useEffect(() => {
    if (gInfoLive().name) setTsData({ name: gInfoLive().name, crNo: '' });
  }, [gInfoLive]);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
        <div>
          <Tooltip placement="top" width={370}>
            <TooltipItem>
              <p>
                <i className="ico-notify"></i>무평가 판매 가능 차량이란?
              </p>
            </TooltipItem>
            <TooltipCont>
              <p className="free-certify-ment">차량 출시 기준 33개월 이하, 주행거리 3만km 이하의 차량이라면 무평가 판매 신청이 가능합니다.</p>
            </TooltipCont>
          </Tooltip>
        </div>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap pb48 sell-step-wrap">
          <p className="ment">
            <i className="ico-notify-white"></i>본인 차량 정보를 가져오기 위해 본인 인증절차가 필요합니다.
          </p>
        </div>
      </div>
      <div className="content-wrap co-wrap">
        <p className="tit">본인 인증을 해주세요.</p>
        <p className="exp">
          본인 차량만 무평가 판매가 가능하며,
          <br />
          본인확인을 위한 인증절차가 필요합니다.
        </p>
        <ul className="register-tp2">
          <li>
            <label htmlFor="name">이름</label>
            <Input type="text" placeHolder="이름을 입력해 주세요." width={320} height={48} name="name" value={tsData.name} onBlur={(e) => setTsData({ ...tsData, name: e.target.value })} />
          </li>
          <li>
            <label htmlFor="crNo">차량번호</label>
            <Input type="text" placeHolder="차량번호를 입력해 주세요." width={320} height={48} name="crNo" value={tsData.crNo} onChange={(e) => setTsData({ ...tsData, crNo: e.target.value })} />
          </li>
        </ul>

        <Buttons align="center" marginTop={48}>
          <Button size="big" background={availBtn ? 'blue80' : 'gray'} title="인증 진행" width={172} height={60} onClick={authBtnHandler} buttonMarkup={true} />
        </Buttons>
       
      </div>
      {/* TS 인증 관련 */}
      <form method="post" action="https://car365.go.kr/aio365/provide/ProvideContent.do" id="provideHashFromUnifixed" name="provideHashFromUnifixed" acceptCharset="euc-kr">
        <input type="hidden" id="hashValue" name="hashValue" value={tsData.hashValue} />
        <input type="hidden" id="timeStamp" name="timeStamp" value={tsData.timeStamp} />
        <input type="hidden" id="svcCodeArr" name="svcCodeArr" value={tsData.svcCodeArr} />
        <input type="hidden" id="svcType" name="svcType" value="Y" />
        <input type="hidden" id="carOwner" name="carOwner" value={tsData.name} />
        <input type="hidden" id="carRegNo" name="carRegNo" value={tsData.crNo} />
        <input type="hidden" id="returnURLA" name="returnURLA" value={`${TS_URL}/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${tsData.hashValue}&recCode=A`} />
        <input type="hidden" id="returnURLD" name="returnURLD" value={`${TS_URL}/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${tsData.hashValue}&recCode=D`} />
      </form>
      <RodalPopup
        show={displaySeriesPop}
        type={'fade'}
        closedHandler={hideSeriesPop}
        title="상세모델을 선택하세요"
        mode="normal"
        width={750}
        size="small"
      > 
        <CarSeriesSelection
          items={car?.seriesList}
          onSelect={setSelectedSeries}
          selectedSeries={selectedSeries}
          onClose={hideSeriesPop}
          onSubmit={onSeriesSubmit}
        />
      </RodalPopup>
    </AppLayout>
  );
};

export default NoneValuationCertify;
