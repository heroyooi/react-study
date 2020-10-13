/**
 * 설명 : 예상결제 금액 확인
 * @fileoverview 홈서비스>홈서비스>예약결제금액 확인
 * @requires [estimatedAmountAction]
 * @author 추호진
 */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';
import { isUndefined } from 'lodash';
import { ClipLoader } from 'react-spinners';

import RadioItem from '@lib/share/items/RadioItem';
import RadioGroup from '@lib/share/items/RadioGroup';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import MobBottomArea from '@lib/share/items/MobBottomArea';

import AppLayout from '@src/components/layouts/AppLayout';
import { axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCarInfo, getCommonCodeList, setInputInfo, getConsignFee, getTransFee, getTransRate } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

const globalThis = require('globalthis')();

/**
 * 설명 : 홈서비스 신청 중 4단계인 예상결제 금액 확인을 수행한다.
 * @param {estimatedInfo,radio_pay} 결재 정보 내용, 결재방식
 * @returns {estimatedInfo, radio_pay} 결재 정보 내용, 결재방식
 */
const EstimatedAmount = ({ query }) => {
  const { dlrPrdId, cntrctrTp } = query;
  const nf = Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
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
      showAlert('홈서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
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
          bottom: 0,
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
  const { inputInfo, paymentList, transRate } = useSelector((state) => state.home);
  const [formData, setFormData] = useState({ ...inputInfo, dlrPrdId: dlrPrdId });
  const [paymentMode, setPaymentMode] = useState('default'); // default, edit, result
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const [paymentModeBtn, setPaymentModeBtn] = useState(true); // true = 확인, false = 수정
  const [accountInstall, setAccountInstall] = useState(false);

  const onChangeRadio = (e, value) => {
    e.preventDefault();
    if (value === '0010') {
      showAlert('할부는 차량가격에 대해서만 진행되며<br/>이전관리비 + EW상품비 + 배송비 합계금액은<br/>계좌이체로 결제됩니다.');
    }
    if (value !== '0030') {
      setPaymentMode('default');
      setPaymentModeBtn(true);
    } else {
      if (paymentMode === 'result') {
        setPaymentModeBtn(false);
      }
      setAccountInstall(true);
      setPaymentMode('edit');
    }

    setFormData(
      produce((draft) => {
        draft.athMthdDvcd = value;
        if (value === '0010') {
          draft.installAmt = formData.crAmt;
          draft.trnsAmt = 0;
        } else if (value === '0020') {
          draft.installAmt = 0;
          draft.trnsAmt = formData.hsvcUseAmt;
        }
      })
    );
  };

  const handleClickButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMobile) {
      setAccountInstall(false);
    }

    let res = true;
    if (Number(formData.hsvcUseAmt) < Number(formData.inputAmt)) {
      showAlert('총 결제 금액보다 많습니다.', 'error');
      res = false;
    } else if (Number(formData.hsvcUseAmt) - Number(formData.inputAmt) < 50000) {
      showAlert('최소 할부 가능 금액은 5만원 입니다.', 'error');
      res = false;
    } else if (Number(formData.minTransAmt) > Number(formData.inputAmt)) {
      showAlert('최소 이체금액은<br/>이전관리비, EW상품비, 배송비를<br/>합한 금액(' + nf.format(formData.minTransAmt) + '원)보다 커야 합니다.', 'error');
      res = false;
    }

    if (!res) {
      setFormData(
        produce((draft) => {
          draft.inputAmt = 0;
        })
      );
      return;
    }

    setFormData(
      produce((draft) => {
        draft.installAmt = Number(formData.hsvcUseAmt) - Number(formData.inputAmt);
        draft.inputAmt = Number(formData.inputAmt);
      })
    );
    setPaymentMode('result');
  };

  const inputChange = (e) => {
    const { id, value } = e.target;
    setFormData(
      produce((draft) => {
        draft[id] = value;
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      handleClickButton(e);
    }
    if (e.target.value.length + 1 > 10) {
      e.preventDefault();
    }

    if (e.target.value === '0') {
      e.preventDefault();
      setFormData(
        produce((draft) => {
          draft.inputAmt = e.key;
        })
      );
    }
  };

  const validationChk = (e) => {
    if (formData.athMthdDvcd === '') {
      showAlert('결제 방식을 선택해주세요.', 'error');
      return;
    }

    return true;
  };

  const prevStep = (e, target) => {
    e.preventDefault();
    if (hasMobile) {
      if (cntrctrTp === '0010') target = 'contractorInfo_1';
      else if (cntrctrTp === '0020') target = 'contractorInfo_2';
      else if (cntrctrTp === '0030') target = 'contractorInfo_3';
    }
    setIsLoading(true);
    Router.push(`/homeService/${target}?dlrPrdId=${dlrPrdId}&cntrctrTp=${cntrctrTp}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  const nextStep = (e, target) => {
    e.preventDefault();
    console.log('[UNDEFINED CHECK!!] Next Step Delivery Amount : ,', formData.deliAmt);
    if (validationChk(e)) {
      setIsLoading(true);
      axiosPost('/api/api/homeservice/insertHsvcRequest.do', formData).then(({ data }) => {
        setIsLoading(false);
        if (data.statusinfo.returncd === '000') {
          dispatch(setInputInfo(formData));
          Router.push(`/homeService/${target}?hsvcId=${data.data.hsvcId}`).then(() => {
            window.scrollTo(0, 0);
          });
        } else {
          showAlert(data.statusinfo.returnmsg, 'error');
        }
      });
    }
  };

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  useEffect(() => {
    if (isUndefined(transRate?.regRt)) return;
    const regAmt = (Number(formData.crAmt) / 100) * Number(transRate.regRt); // 등록세
    const acqAmt = (Number(formData.crAmt) / 100) * Number(transRate.acqRt); // 취득세
    const pbpAmt = Number(transRate.pbndBygRt) > 0 ? (Number(formData.crAmt) / 100) * Number(transRate.pbndBygRt) : Number(transRate.pbndBygCost); // 공채매입비
    const regAcqAmt = regAmt + acqAmt + 1000 + 3000 + pbpAmt * 0.08;
    // 등록세 + 취득세 + 증지대 (고정비) + 인지대 (고정비) + 공채매입비 - 공채할인
    setFormData(
      produce((draft) => {
        draft.inputAmt = draft.athMthdDvcd === '0030' ? draft.trnsAmt : 0;
        draft.regAcqAmt = regAcqAmt;
        draft.rdpmMgmtAmt = regAcqAmt + Number(formData.crMgmtAmt) + Number(formData.rdpmAgcyFeeAmt);
        draft.hsvcUseAmt = regAcqAmt + Number(formData.crMgmtAmt) + Number(formData.rdpmAgcyFeeAmt) + Number(formData.atbWrntAmt) + Number(formData.deliAmt) + Number(formData.crAmt);
        draft.minTransAmt = regAcqAmt + Number(formData.crMgmtAmt) + Number(formData.rdpmAgcyFeeAmt) + Number(formData.atbWrntAmt) + Number(formData.deliAmt); // 최소 입금 금액(이전관리비+EW상품비+배송비)
      })
    );
  }, [transRate, inputInfo.crMgmtAmt, inputInfo.rdpmAgcyFeeAmt, inputInfo.deliAmt]);

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
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={4} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-detail calculation-table">
            <table summary="차량가격에 대한 내용" className="table-tp1 td-r">
              <caption>예상 결제 금액 확인</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">차량가격</th>
                  <td>
                    <span className="price">{formData?.crAmt ? nf.format(formData?.crAmt) : 0}</span>원
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="ico-symbol">
              <i>+</i>
            </div>
            <table summary="이전관리비 합계에 대한 내용" className="table-tp1 td-r">
              <caption className="away">이전관리비 합계</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">이전관리비 합계</th>
                  <td>
                    <span className="price">
                      {nf.format(
                        Number(formData?.regAcqAmt ? formData?.regAcqAmt : 0) + Number(formData?.crMgmtAmt ? formData?.crMgmtAmt : 0) + Number(formData?.rdpmAgcyFeeAmt ? formData?.rdpmAgcyFeeAmt : 0)
                      )}
                    </span>
                    원
                  </td>
                </tr>
                <tr>
                  <th>취등록세</th>
                  <td>{formData?.regAcqAmt ? nf.format(formData?.regAcqAmt) : 0}원</td>
                </tr>
                <tr>
                  <th>차량관리비</th>
                  <td>{formData?.crMgmtAmt ? nf.format(formData?.crMgmtAmt) : 0}원</td>
                </tr>
                <tr>
                  <th>이전대행료</th>
                  <td>{formData?.rdpmAgcyFeeAmt ? nf.format(formData?.rdpmAgcyFeeAmt) : 0}원</td>
                </tr>
                <tr>
                  <th>EW상품비</th>
                  <td>{formData?.atbWrntAmt ? nf.format(formData?.atbWrntAmt) : 0}원</td>
                </tr>
                <tr>
                  <th>배송비</th>
                  <td>{formData?.deliAmt ? nf.format(formData?.deliAmt) : 0}원</td>
                </tr>
              </tbody>
            </table>
            <div className="ico-symbol">
              <i>=</i>
            </div>
            <table summary="총 결제 금액에 대한 내용" className="table-tp1 td-r mb20">
              <caption className="away">총 결제 금액</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">총 결제 금액</th>
                  <td>
                    <span className="price">{formData?.hsvcUseAmt ? nf.format(formData?.hsvcUseAmt) : 0}</span>원
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="essential-point fs12">
              <ul>
                <li>중고차 이전비는 아래와 같은 항목으로 구성됩니다.</li>
                <li>
                  <i className="ico-dot"></i>
                  <span className="tx-black">취등록세 : </span>차량 취득에 부과되는 취득세와 등록을 위해 부과되는 등록세, 공채매입을 위한 공채매입비 로 이루어집니다.
                </li>
                <li>
                  <i className="ico-dot"></i>
                  <span className="tx-black">차량관리비 : </span>차량을 보관한 중고차 상사에게 납부하는 비용입니다.
                </li>
                <li>
                  <i className="ico-dot"></i>
                  <span className="tx-black">이전대행료 : </span>등록신청대행에 소요되는 실제비용입니다.
                </li>
              </ul>
            </div>
            <div className="tit-wrap">
              <h4>예상 결제 금액 확인</h4>
            </div>
            <div className="radio-chk-wrap icon list3">
              <RadioGroup
                dataList={paymentList}
                defaultValue={formData.athMthdDvcd ? formData.athMthdDvcd : '0000'}
                boxType={true}
                className="icon"
                onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
              >
                {paymentList.map((pay, i) => {
                  return (
                    <div key={i}>
                      {pay.value !== '0030' && (
                        <RadioItem>
                          <p>
                            <i className={pay.value === '0010' ? 'ico-clock' : 'ico-smartphone'} />
                          </p>
                        </RadioItem>
                      )}
                      {pay.value === '0030' && (
                        <RadioItem>
                          {paymentMode === 'default' && (
                            <p>
                              <i className="ico-pay-setting" />
                            </p>
                          )}
                          {paymentMode === 'edit' && (
                            <div className="account-install-dim">
                              <label htmlFor="account-price">계좌이체 희망금액</label>
                              <Input
                                type="number"
                                placeHolder="계좌이체 금액을 입력해주세요."
                                value={formData.inputAmt ? formData.inputAmt : 0}
                                id="inputAmt"
                                width={284}
                                height={48}
                                onChange={inputChange}
                                onKeyPress={handleKeyPress}
                              />
                              <em>원</em>
                              <Button size="big" line="white" color="white" title="확인" width={284} height={48} marginTop={10} onClick={handleClickButton} />
                            </div>
                          )}
                          {paymentMode === 'result' && (
                            <div className="account-install">
                              <p className="price">
                                {nf.format(formData.installAmt)}
                                <span className="won">원</span>
                              </p>
                              <span>
                                나머지는 할부로
                                <br />
                                결제합니다.
                              </span>
                            </div>
                          )}
                        </RadioItem>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
        <Buttons align="center" className="full" marginTop={24}>
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(계약자정보 입력)" className="ws1" onClick={(e) => prevStep(e, 'contractorInfo')} />
          <Button size="big" background="blue80" title="신청완료" onClick={(e) => nextStep(e, 'homeServiceComplete')} />
        </Buttons>

        <MobBottomArea active={accountInstall} mode="fade" isFixButton={true}>
          <div className="inner account-install-dim">
            {/* 공통 UI */}
            <label htmlFor="m-account-price">계좌이체 희망금액</label>

            <Input
              type="number"
              placeHolder="계좌이체금액 입력(숫자만)"
              isSelf={false}
              data={formData.inputAmt || formData.inputAmt !== '' ? Number(formData.inputAmt) : 0}
              id="inputAmt"
              height={40}
              onChange={inputChange}
              onKeyPress={handleKeyPress}
            />
            {/* input값 입력 전 */}
            {paymentModeBtn ? (
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleClickButton} />
            ) : (
              //<p className="tx-exp-tp5">나머지는 할부로 결제합니다.</p>
              <Button className="fixed" size="full" background="blue80" title="수정" onClick={handleClickButton} />
            )}
          </div>
        </MobBottomArea>
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
          <h3 style={{paddingTop: 103}}>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={4} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>예상결제 금액 확인</h4>
        </div>
        <div className="service-detail">
          <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c service-payment">
            <caption>결제 정보</caption>
            <colgroup>
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan="2">차량가격</th>
                <th colSpan="3">
                  이전관리비
                  <Tooltip placement="bottom" width={514} event="click">
                    <TooltipItem>
                      <i className="ico-question" />
                    </TooltipItem>
                    <TooltipCont>
                      <div className="transfer-cost">
                        <p>중고차 이전비는 아래와 같은 항목으로 구성됩니다.</p>
                        <div className="service-notify">
                          <p>
                            <i className="ico-dot sml" /> 취등록세: 차량 취득에 부과되는 취득세와 등록을 위해 부과되는 등록세로 이루어집니다.
                          </p>
                          <p>
                            <i className="ico-dot sml" /> 차량관리비: 차량을 보관한 중고차 상사에게 납부하는 비용입니다.
                          </p>
                          <p>
                            <i className="ico-dot sml" /> 이전대행료: 등록신청대행에 소요되는 실제비용입니다.
                          </p>
                        </div>
                      </div>
                    </TooltipCont>
                  </Tooltip>
                </th>
                <th rowSpan="2">EW 상품비</th>
                <th rowSpan="2">배송비</th>
                <th rowSpan="2">총 결제 금액</th>
              </tr>
              <tr>
                <th>취등록세</th>
                <th>차량관리비</th>
                <th>이전대행료</th>
              </tr>
              <tr>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.crAmt ? nf.format(formData?.crAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.regAcqAmt ? nf.format(formData?.regAcqAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.crMgmtAmt ? nf.format(formData?.crMgmtAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.rdpmAgcyFeeAmt ? nf.format(formData?.rdpmAgcyFeeAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.atbWrntAmt ? nf.format(formData?.atbWrntAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{formData?.deliAmt ? nf.format(formData?.deliAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4">
                    <span className="won">{formData?.hsvcUseAmt ? nf.format(formData?.hsvcUseAmt) : 0} 원</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <div className="service-tit">
            <h4>결제 방식 선택</h4>
          </div>
          <div className="radio-chk-wrap icon list3">
            <RadioGroup
              dataList={paymentList}
              defaultValue={formData.athMthdDvcd ? formData.athMthdDvcd : '0000'}
              boxType={true}
              className="icon"
              onChange={(e) => onChangeRadio(e, e.currentTarget.getElementsByTagName('input')[0].value)}
            >
              {paymentList.map((pay, i) => {
                return (
                  <div key={i}>
                    {pay.value !== '0030' && (
                      <RadioItem>
                        <p>
                          <i className={pay.value === '0010' ? 'ico-clock' : 'ico-smartphone'} />
                        </p>
                      </RadioItem>
                    )}
                    {pay.value === '0030' && (
                      <RadioItem>
                        {paymentMode === 'default' && (
                          <p>
                            <i className="ico-setting" />
                          </p>
                        )}
                        {paymentMode === 'edit' && (
                          <div className="account-install-dim">
                            <label htmlFor="account-price">계좌이체 희망금액</label>
                            <Input
                              type="number"
                              placeHolder="계좌이체 금액을 입력해주세요."
                              value={formData.inputAmt ? formData.inputAmt : 0}
                              id="inputAmt"
                              width={284}
                              height={48}
                              onChange={inputChange}
                              onKeyPress={handleKeyPress}
                            />
                            <em>원</em>
                            <Button size="big" line="white" color="white" title="확인" width={284} height={48} marginTop={10} onClick={(e) => handleClickButton(e)} />
                          </div>
                        )}
                        {paymentMode === 'result' && (
                          <div className="account-install">
                            <p className="price-tp3">
                              <span className="p-label">계좌이체 금액 :</span>
                              {nf.format(formData.inputAmt)}
                              <span className="won">원</span>
                            </p>
                            <span>{nf.format(formData.installAmt)}원은 할부로 결제합니다.</span>
                          </div>
                        )}
                      </RadioItem>
                    )}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          <br />
          <span>※ 이전관리비 + EW상품비 + 배송비는 결제 방식과 관계없이 계좌이체로 결제됩니다.</span>
          <br />
          <span>※ 할부는 차량가격에 대해서만 진행됩니다.</span>
        </div>
        <Buttons align="center" marginTop={60}>
          <span className="fl">
            <Button size="big" background="gray" title="이전 단계로" sub="(계약자정보 입력)" className="ws1" width={240} height={72} onClick={(e) => prevStep(e, 'contractorInfo')} />
          </span>
          <span className="fr">
            <Button size="big" background="blue80" title="신청 완료" width={240} height={72} onClick={(e) => nextStep(e, 'homeServiceComplete')} />
          </span>
        </Buttons>
      </div>
    </AppLayout>
  );
};

EstimatedAmount.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  if (!reduxStore.getState().home.carInfo) {
    await reduxStore.dispatch(getCarInfo(query.dlrPrdId));
  }
  const crInfo = reduxStore.getState().home.carInfo;
  const inputInfo = reduxStore.getState().home.inputInfo;
  const reqData = {
    crTypeCd: crInfo.crTypeCd,
    commercialYn: crInfo.commercialYn === 'Y' ? 1 : 2,
    dspl: crInfo.dspl,
    locCd: inputInfo.locCd,
    seatingCapacity: crInfo.crTypeCd === '9' ? (crInfo.crTkcarPsncpa < 1 ? 7 : crInfo.crTkcarPsncpa) : crInfo.crTkcarPsncpa,
    maxTon: crInfo.crMaxton
  };
  await reduxStore.dispatch(getTransRate(reqData)); // 취등록세 비율 (취득세율, 등록세율, 공채매입비)
  await reduxStore.dispatch(getCommonCodeList('AM062'));
  await reduxStore.dispatch(getConsignFee(inputInfo)); // 탁송료 조회
  await reduxStore.dispatch(getTransFee()); // 차량관리비, 이전대행료 관련 테이블 및 화면설계 없음

  return {
    query
  };
};

export default withRouter(EstimatedAmount);
