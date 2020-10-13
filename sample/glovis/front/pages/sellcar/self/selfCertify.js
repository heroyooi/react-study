/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import * as http from '@src/utils/HttpUtils';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL } from '@src/actions/types';
import { createValidator } from '@lib/share/validator';
import { SystemContext } from '@src/provider/SystemProvider';
import tsAuthScheme from '@lib/share/validator/sellcar/tsAuth';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import RadioGroup from '@lib/share/items/RadioGroup';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
import { getCarMartInfoAction, carHistoryAuthSucc, carHistoryAuthFail } from '@src/actions/sellcar/sellCarAction';

import CarSeriesSelection from '@src/components/car/CarSeriesSelection';
import { async, console } from 'globalthis/implementation';

const TS_URL = `https://testautobell.glovis.net`;
const NEXT_PAGE = '/sellcar/self/selfSellCarSearch';

const tsValidator = createValidator(tsAuthScheme, {
  required: ['crNo', 'name', 'hashValue', 'timeStamp', 'svcCodeArr']
});

const tsInfoValidator = createValidator(tsAuthScheme, {
  required: ['crNo', 'name']
});

const SelfCertify = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  let tsPopup = '';
  // TS 인증관련
  const [availBtn, setAvailBtn] = useState(false);
  const [tsData, setTsData] = useState({ name: gInfoLive().name ? gInfoLive().name : '', crNo: '' });
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);
  const { car } = useSelector((rootStore) => rootStore.sellCarStore);
  const [ displaySeriesPop, setDisplaySeriesPop, showSeriesPop, hideSeriesPop] = useRodal(false, true);
  const [ selectedSeries, setSelectedSeries] = useState();

  const goNext = () => {
    Router.push(`${NEXT_PAGE}?crNo=${tsData.crNo}`).then(() => {
      window.scrollTo(0, 0);
    });
  };

  const pathWithTsAuth = async () => {
    showLoader();
    http.axiosGet(`${TS_URL}/api/ts/data/getAuthResult.do?hashvalue=${tsData.hashValue}`)
      .then(async (res) => {
        console.log("pathWithTsAuth::",res.data);
        if (res.data.data === 1) {
          await dispatch(
            carHistoryAuthSucc({
              crNo: tsData.crNo,
              hashCode: tsData.hashValue,
              authorized: true
            })
          );
          const params = { crNo: tsData?.crNo };
          const { car: resCar } = await dispatch(getCarMartInfoAction(params));
          if (resCar?.seriesList) {
            showSeriesPop(true);
          } else {
            goNext();
          }
        } else {
          dispatch(carHistoryAuthFail());
          showAlert('인증에 실패했습니다.', () => {
            location.reload();
          });
        }
      })
      .finally(() => {
        hideLoader();
      });
  }

  const pathWithoutTsAuth = async () => {
    const params = { crNo: tsData?.crNo };
    showLoader();
    const { car: resCar } = await dispatch(getCarMartInfoAction(params));
    await dispatch(
      carHistoryAuthSucc({
        crNo: tsData.crNo,
        hashCode: tsData.hashValue,
        authorized: true
      })
    );
    if (resCar?.seriesList) {
      hideLoader();
      showSeriesPop(true);
    } else {
      hideLoader();
      goNext();
    }
  };

  // '인증 진행' 버튼 이벤트
  const authBtn = async (e) => {
    const isIE = false || !!document.documentMode;
    if (isIE === true && window.navigator && window.navigator.userAgent.includes('Windows NT 6.1') === true) {
      // eslint-disable-next-line no-alert
      alert('Window7 운영체제 상 Internet Explorer는 이용이 불가합니다.\n크롬브라우저로 접속하시거나, 차량정보 입력 조회를 이용해주세요.');
      return;
    }

    e.preventDefault();
    const valid = tsValidator.validate({ ...tsData });
    if (!valid.success) {
      showAlert(valid.error[0].label);
      return false;
    }
    const form = document.querySelector('#provideHashFromUnifixed');
    if (tsPopup) {
      return false;
    }
    // 그 외의 경우 팝업을 띄움
    tsPopup = window.open('', 'privde', 'height=0, width=0');

    const timer = setInterval(async function() {
      if (tsPopup.closed) {
        clearInterval(timer);
        //pathWithoutTsAuth();
        pathWithTsAuth();
      }
    }, 1000);

    form.target = 'privde';
    form.submit();
  };

  const onSeriesSubmit = () => {
    hideSeriesPop(false);
    const { tsKey, seriesno } = selectedSeries ?? {};
    const params = {
      crNo: tsData.crNo,
      tsKey,
      seriesno
    };
    showLoader();
    Router.push(`${NEXT_PAGE}?${qs.stringify(params)}`).then(() => {
      window.scrollTo(0, 0);
    });
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
          setAvailBtn(true);
        })
        .catch((err) => {
          setAvailBtn(false);
          console.error(err);
          return {};
        });
    } else {
      setAvailBtn(false);
    }
  }, [tsData.crNo, tsData.name]);

  useEffect(() => {
    if (isLogin()) {
      if (!isAllowedUserType()) {
        showAlert('일반 회원만 이용 가능합니다.');
        location.href = '/main';
      }
    }
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
        <h3>비교견적으로 내 차 팔기</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap pb48 sell-step-wrap">
          <p className="ment">
            <i className="ico-notify-white" />
            본인 차량 정보를 가져오기 위해 본인 인증절차가 필요합니다.
          </p>
        </div>
      </div>
      <div className="content-wrap co-wrap">
        <p className="tit">본인 인증을 해주세요.</p>
        <p className="exp">
          본인 차량만 비교견적 판매가 가능하며, <br />
          본인확인을 위한 인증절차가 필요합니다.
        </p>
        <ul className="register-tp2">
          <li>
            <label htmlFor="name">이름</label>
            <Input type="text" placeHolder="이름을 입력해 주세요." width={320} height={48} name="name" value={tsData.name} onChange={(e) => setTsData({ ...tsData, name: e.target.value })} />
          </li>
          <li>
            <label htmlFor="crNo">차량번호</label>
            <Input
              type="text"
              placeHolder="차량번호를 입력해 주세요.(예: 12가1234)"
              width={320}
              height={48}
              name="crNo"
              value={tsData.crNo}
              onChange={(e) => setTsData({ ...tsData, crNo: e.target.value })}
            />
          </li>
        </ul>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background={availBtn ? 'blue80' : 'gray'} title="인증 진행" disabled={!availBtn ? true : false} width={172} height={60} onClick={authBtn} buttonMarkup={true} />
          {/* blue80, gray */}
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

export default SelfCertify;
