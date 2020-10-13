/**
 * 설명 : 계약자 선택
 * @fileoverview 홈서비스>홈서비스>계약자정보입력
 * @author 추호진
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { produce } from 'immer';
import { ClipLoader } from 'react-spinners';

import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RadioItem from '@lib/share/items/RadioItem';
import RadioGroup from '@lib/share/items/RadioGroup';
import Steps from '@lib/share/items/Steps';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import AppLayout from '@src/components/layouts/AppLayout';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCommonCodeList, setInputInfo } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

const globalThis = require('globalthis')();

/**
 * 설명 : 홈서비스 신청 중 3단계인 계약자 선택을 수행한다.
 */
const ChoiceContractor = ({ query }) => {
  const { dlrPrdId } = query;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const dispatch = useDispatch();
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
          bottom: 56,
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
  const { inputInfo, contCdList } = useSelector((state) => state.home);
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, false);
  const [formData, setFormData] = useState({ ...inputInfo, dlrPrdId: dlrPrdId });
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow(false);
  }, []);

  const onChangeRadio = (e, value) => {
    setFormData(
      produce((draft) => {
        draft.cntrctrTp1 = value;
      })
    );
  };

  const prevStep = (e, target) => {
    e.preventDefault();
    setIsLoading(true);
    Router.push(`/homeService/${target}?dlrPrdId=${dlrPrdId}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  const nextStep = (e, target) => {
    e.preventDefault();
    if (formData.cntrctrTp1 === '9999' || formData.cntrctrTp1 === '') {
      showAlert('계약자 유형을 선택하세요.', 'error');
      return;
    }

    let flag = '';
    if (hasMobile) {
      if (formData.cntrctrTp1 === '0010') flag = '_1';
      if (formData.cntrctrTp1 === '0020') flag = '_2';
      if (formData.cntrctrTp1 === '0030') flag = '_3';
    }

    setIsLoading(true);
    dispatch(setInputInfo(formData));
    Router.push(`/homeService/${target + flag}?dlrPrdId=${dlrPrdId}&cntrctrTp=${formData.cntrctrTp1}`).then(() => {
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
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={3} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">
              계약자선택
              <p>신청정보 입력을 위해 명의자 구분을 선택해주세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap icon list3">
              <RadioGroup
                dataList={contCdList ? contCdList : []}
                defaultValue={formData.cntrctrTp1 ? formData.cntrctrTp1 : '9999'}
                boxType={true}
                className="icon"
                onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
              >
                {contCdList.map((cont, i) => {
                  return (
                    <div key={i}>
                      <RadioItem>
                        <p>
                          <i className={cont.title === '개인' ? 'ico-individual' : cont.title === '개인사업자' ? 'ico-business' : 'ico-corporation'} />
                        </p>
                      </RadioItem>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
        <Buttons align="center" className="fixed full">
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(보증상품 선택)" className="ws1" onClick={(e) => prevStep(e, 'choiceGuarantee')} />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" onClick={(e) => nextStep(e, 'contractorInfo')} />
        </Buttons>
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
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={3} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>계약자 선택</h4>
          <p>명의자 정보를 위해 선택해주세요.</p>
        </div>
        <div className="service-detail">
          <div className="radio-chk-wrap icon list3">
            <RadioGroup
              dataList={contCdList ? contCdList : []}
              defaultValue={formData.cntrctrTp1 ? formData.cntrctrTp1 : '9999'}
              boxType={true}
              className="icon"
              onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
            >
              {contCdList.map((cont, i) => {
                return (
                  <div key={i}>
                    <RadioItem>
                      <p>
                        <i className={cont.title === '개인' ? 'ico-individual' : cont.title === '개인사업자' ? 'ico-business' : 'ico-corporation'} />
                      </p>
                    </RadioItem>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <span className="fl">
            <Button size="big" background="gray" title="이전 단계로" sub="(보증상품 선택)" className="ws1" width={240} height={72} onClick={(e) => prevStep(e, 'choiceGuarantee')} />
          </span>
          <span className="fr">
            <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" width={240} height={72} onClick={(e) => nextStep(e, 'contractorInfo')} />
          </span>
        </Buttons>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} width={375} closedHandler={modalCloseHandler} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>계약자 유형을 선택해주세요.</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

ChoiceContractor.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getCommonCodeList('AM065'));
  return {
    query
  };
};

export default withRouter(ChoiceContractor);
