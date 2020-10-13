/**
 * 설명 : 보증상품 선택
 * @fileoverview 홈서비스>홈서비스>보증상품 선택
 * @requires [choiceGuaranteeAction]
 * @author 추호진
 * @author 박진하(수정)
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Router, { withRouter } from 'next/router';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Steps from '@lib/share/items/Steps';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import AppLayout from '@src/components/layouts/AppLayout';
import { SystemContext } from '@src/provider/SystemProvider';
import { setInputInfo, getEwList } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

const globalThis = require('globalthis')();

/**
 * 설명 : 홈서비스 신청 중 2단계인 보증상품 선택을 수행한다.
 * @param {radioGuaranteed} 홈서비스 보증상품들
 * @returns {radioGuaranteed} 보증상품들
 */
const ChoiceGuarantee = ({ query }) => {
  const { dlrPrdId } = query;
  const nf = Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('홈서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  const { homeServiceOnGoing } = useSelector((state) => state.home);
  useDetectPageRefresh(homeServiceOnGoing, '/homeService/homeService');

  const { showAlert, initAlert } = useContext(SystemContext);
  const { inputInfo, ewList } = useSelector((state) => state.home);
  const [formData, setFormData] = useState({ ...inputInfo, dlrPrdId: dlrPrdId });
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const closeMPop = useCallback(
    (e) => {
      e.preventDefault();
      setMPop(false);
    },
    [setMPop]
  );

  const onChangeRadio = (e, value) => {
    if (value === '99') {
      if (hasMobile) {
        openMPop(e);
      } else {
        const msg = '무보증을 선택하시면 구매차량의 <br /> 이전 대행 서비스만 제공되며, <br /> 당사가 제공하는 어떠한 보증서비스도 <br /> 제공되지 않습니다. (성능보증 제외)';
        showAlert(msg, 'ok');
      }
    }

    ewList.map((data) => {
      if (value === data.value) {
        setFormData(
          produce((draft) => {
            draft.atbWrntNo = value;
            draft.atbWrntAmt = data.basicPrc;
          })
        );
      }
    });
  };

  const prevStep = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Router.push(`/homeService/homeServiceCarInfo?dlrPrdId=${dlrPrdId}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setInputInfo(formData));
    Router.push(`/homeService/choiceContractor?dlrPrdId=${dlrPrdId}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  useEffect(() => {
    if (formData.atbWrntNo === '') {
      setFormData(
        produce((draft) => {
          draft.atbWrntNo = ewList[0].value;
          draft.atbWrntAmt = ewList[0].basicPrc;
        })
      );
    }
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={2} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">
              보증상품 선택
              <p>A/S까지 안심하고 구입하세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap text list3">
              <RadioGroup
                dataList={ewList ? ewList : []}
                defaultValue={formData?.atbWrntNo}
                boxType={true}
                className="text"
                uuid={true} // key에러는 uuid를 true로 설정해놓으면 RadioGroup 컴포넌트 내부에서 동적으로 key값을 생성해주기 때문에 해결되어집니다.
                onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
              >
                {ewList.map((ew, i) => {
                  return (
                    <div key={i}>
                      <RadioItem>
                        {i !== ewList.length - 1 ? (
                          <>
                            <span className="sub-title">
                              {ew.wrntMnthNm} / {nf.format(ew.wrntDist)} km
                            </span>
                            <p className="price-tp3">
                              {nf.format(ew.basicPrc)}
                              <span className="won">원</span>
                            </p>
                          </>
                        ) : (
                          <p className="as-none">
                            {ew.theOther}
                            <br />
                            {ew.theOther2}
                          </p>
                        )}
                      </RadioItem>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <p className="tx-exp-tp5">
              &#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>
        <Buttons align="center" className="fixed full">
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(차량정보 확인)" className="ws1" onClick={(e) => prevStep(e)} />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 선택)" className="ws1" onClick={(e) => nextStep(e)} />
        </Buttons>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">무보증을 선택하시면 구매차량의 이전대행 서비스만 제공되며, 당사가 제공하는 어떠한 보증서비스도 제공되지 않습니다. (성능보증 제외)</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="확인" color="blue80" onClick={closeMPop} />
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
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{ paddingTop: 103 }}>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={2} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>보증상품 선택</h4>
          <p>A/S까지 안심하고 구입하세요.</p>
        </div>
        <div className="service-detail">
          <RadioGroup
            dataList={ewList ? ewList : []}
            defaultValue={formData?.atbWrntNo}
            boxType={true}
            className="text"
            onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
          >
            {ewList.map((ew, i) => {
              return (
                <div key={i}>
                  <RadioItem>
                    {i !== ewList.length - 1 ? (
                      <>
                        <span className="sub-title">
                          {ew.wrntMnthCd ? ew.wrntMnthCd + '개월' : ''} / {nf.format(ew.wrntDist)} km
                        </span>
                        <p className="price-tp3">
                          {nf.format(ew.basicPrc)}
                          <span className="won">원</span>
                        </p>
                      </>
                    ) : (
                      <p className="as-none">
                        {ew.theOther}
                        <br />
                        {ew.theOther2}
                      </p>
                    )}
                  </RadioItem>
                </div>
              );
            })}
          </RadioGroup>
          <div className="service-notify">
            <p className="tx-exp-tp5">&#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 STEP4 단계에서 확인하실 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 차량 구매방법이 &#39;리스&#39;상품일 경우, 보증상품은 무상지원됩니다. (최대 100만원 한도 내)</p>
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <span className="fl">
            <Button size="big" background="gray" title="이전 단계로" sub="(차량정보 확인)" className="ws1" width={240} height={72} onClick={(e) => prevStep(e)} />
          </span>
          <span className="fr">
            <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" width={240} height={72} onClick={(e) => nextStep(e)} />
          </span>
        </Buttons>
      </div>
    </AppLayout>
  );
};

ChoiceGuarantee.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getEwList());

  return {
    query
  };
};

export default withRouter(ChoiceGuarantee);
