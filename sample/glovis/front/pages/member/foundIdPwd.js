/**
 * 아이디 찾기/ 비밀번호 찾기 기능
 * @fileOverview 아이디/비밀번호 찾기
 * @requires memberAction, memberReducer
 * @author 김지현
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { isEmpty } from 'lodash';
import { isStrCnt } from '@src/utils/CommonUtil';
import { getSchIdList, getSchId, savePwd } from '@src/actions/member/memberAction';
import Certification from '@src/components/common/Certification';
import CertificationMod from '@src/components/common/CertificationMod';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
/**
 * 설명 : 아이디 찾기/ 비밀번호 찾기 기능
 * @param { mbCi } 아이디 찾기
 * @param { mbCi, mbId, mbNm } 비밀번호 찾기
 * @returns { schList } 결과
 */
const foundIdPwd = (props) => {
  const tmp = isEmpty(props.router.query) ? 0 : Number(props.router.query.data);

  // 본인인증(아이디찾기)
  const [certShow, setCertShow] = useState(false);
  // 본인인증(비밀번호찾기)
  const [certShowPasswd, setCertShowPasswd] = useState(false);
  // 모바일 본인인증(아이디찾기)
  const [certModShow, setCertModShow] = useState(false);

  const [mbCi, setMbCi] = useState('');

  const dispatch = useDispatch();

  const [isIdCert, setIsIdCert] = useState(false);
  const [isPwCert, setIsPwCert] = useState(false);
  const [findMode, setFindMode] = useState('id');
  const [tabActive, setTabActive] = useState(tmp);
  const [chkPwdMsg, setChkPwdMsg] = useState('');
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);

  const schList = useSelector((state) => state.member.schList);
  const [inputs, setInputs] = useState({
    mbId: '',
    mbNm: '',
    mbPwdEnc: '',
    mbPwdEncChk: ''
  });
  const { mbId, mbNm, mbPwdEnc, mbPwdEncChk } = inputs;
  const onChangeAll = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  //ID 본인인증
  const handleIdCert = useCallback((e) => {
    e.preventDefault();
    setCertShow(true);
    /*
    if(onHandleCertify) {
      dispatch(getSchIdList(mbCi))
      setIsIdCert(true);
    } */
  }, []);
  const tabClick = (e, idx) => {
    setIsIdCert(false);
    setIsPwCert(false);
    setFindMode(idx === 0 ? 'id' : 'password');
  };

  //비밀번호 찾기 버튼
  const onHandleActivePwd = useCallback((e) => {
    e.preventDefault();
    setTabActive(1);
    setFindMode('password');
  }, []);

  /*
  const handleCertPassword = useCallback((e) => {
    console.log("handleCertPassword ????????????")
    e.preventDefault();
    setIsPwCert(true);
  }, []);
*/

  //비밀번호 본인인증
  const onConfirm = useCallback((e) => {
    if (isEmpty(inputs.mbId)) {
      alert('아이디를 입력해주세요.');
    } else if (isEmpty(inputs.mbNm)) {
      alert('이름을 입력해주세요.');
    } else {
      if (onHandleCertify) {
        const paramObj = {
          ...inputs,
          mbCi: mbCi
        };

        setCertShowPasswd(true);
        //dispatch(getSchId(paramObj))
        //setIsPwCert(true);
      } else {
        alert('본인인증을 진행해주세요.');
        setCertShowPasswd(true);
      }
    }
  });

  //비밀번호 변경하기
  const onChangePwd = useCallback((e) => {
    if (!mbPwdEnc || !mbPwdEncChk) {
      setChkPwdMsg('비밀번호(비밀번호 확인)를 입력해주세요');
      return false;
    } else if (mbPwdEnc !== mbPwdEncChk) {
      setChkPwdMsg('비밀번호가 일치하지 않습니다');
      return false;
    } else if (mbPwdEnc.indexOf(mbId) > -1) {
      setChkPwdMsg('비밀번호에 아이디를 포함할 수 없습니다');
      return false;
    } else if (chkValidatePwd(mbPwdEnc, null)) {
      const paramObj = {
        mbId: mbId,
        mbPwdEncNew: mbPwdEnc,
        mbCi: mbCi
      };
      dispatch(savePwd(paramObj));
      setRodalShow(true);
      return false;
    }
  });

  //본인인증 공통
  const onHandleCertify = useCallback((e) => {
    return true;
  }, []);

  //password 규칙체크
  const chkValidatePwd = (mbPwdEnc, type) => {
    const regexPwCnt = /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regexPwCnt.test(mbPwdEnc)) {
      setChkPwdMsg('비밀번호는 영문, 숫자, 특수 문자 혼합하여 8~15자 이내로 입력해 주세요');
      return false;
    } else {
      //연속된 숫자 테스트
      var regexNo = /(\w)\1\1/;
      if (regexNo.test(mbPwdEnc)) {
        setChkPwdMsg('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.');
        return false;
      } else if (!isStrCnt(mbPwdEnc, 3)) {
        setChkPwdMsg('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.');
        return false;
      } else {
        return true;
      }
    }
  };

  const certCallback = (e) => {
    console.log(e);
    if (e.RETURN_CD == '0000') {
      setCertShow(false);
      setMbCi(e.LGD_AUTHSUB_CI);
      dispatch(getSchIdList({ mbCi: e.LGD_AUTHSUB_CI }));
      setIsIdCert(true);
    }
  };

  const certCallbackPwd = (e) => {
    console.log(e);
    if (e.RETURN_CD == '0000') {
      setCertShowPasswd(false);
      const paramObj = {
        ...inputs,
        mbCi: e.LGD_AUTHSUB_CI
      };
      dispatch(getSchId(paramObj));
      setIsPwCert(true);
      setFindMode('password');
    }
  };

  console.log('tabActive:', tabActive);
  console.log('findMode:', findMode);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '아이디 찾기',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 84,
          color: '#f6f7f8'
        }
      });
    }, []);

    useEffect(() => {
      if (!isEmpty(schList)) {
        console.log(schList);
        //const data = JSON.stringify(schList);
        Router.push({ pathname: '/member/loginInfoIdConfirm', query: { memInfo: JSON.stringify(schList) } }, '/member/loginInfoIdConfirm');
      }
    }, [schList]);

    const onClickModCert = useCallback((e) => {
      e.preventDefault();
      setCertModShow(true);
    }, []);

    const certIdModCallback = (e) => {
      if (e.RETURN_CD === '0000') {
        setCertModShow(false);
        setMbCi(e.LGD_AUTHSUB_CI);
        dispatch(getSchIdList({ mbCi: e.LGD_AUTHSUB_CI }));
        //Router.push('/member/loginInfoIdConfirm');
      }
    };

    const onFindPassWd = (e) => {
      e.preventDefault();
      Router.push('/member/loginInfoPassword');
    };

    return (
      <AppLayout>
        <div className="content-wrap login-contents pd20">
          <div className="login-wrap">
            <div className="certify-wrap bg-white">
              <span className="ico-wrap">
                <i className="ico-certify"></i>
              </span>
              <p className="tit">휴대폰 본인인증 진행해 주세요.</p>
              <p className="tx-sub">
                입력하신 회원님의 개인 정보는
                <br />
                본인인증 이외의 목적으로 활용하지 않습니다.
              </p>
              <Buttons align="center" marginTop={20}>
                <Button size="mid" background="blue80" radius={true} title="휴대폰 본인인증" width={126} height={40} fontWeight={500} onClick={onClickModCert} nextLink={true} />
                {certModShow ? <CertificationMod show={certModShow} callback={certIdModCallback}></CertificationMod> : null}
                <Button size="mid" line="gray" color="darkgray" radius={true} title="비밀번호찾기" width={126} height={40} fontWeight={500} onClick={onFindPassWd} nextLink={true} />
              </Buttons>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h3>아이디/비밀번호 찾기</h3>
          </div>

          <div className="login-wrap">
            <TabMenu type="type7" callBack={tabClick} defaultTab={tabActive}>
              <TabCont tabTitle="아이디 찾기" id="tab7-1" index={0}>
                {isIdCert === false ? (
                  <div className="certify-wrap">
                    <p className="tit">
                      <span>휴대폰 본인인증</span>을<br />
                      진행해 주세요.
                    </p>
                    <span className="ico-wrap">
                      <i className="ico-certify"></i>
                    </span>
                    <p className="tx-sub">
                      입력하신 회원님의 개인 정보는
                      <br />
                      <span>본인인증 이외의 목적으로 활용하지 않습니다.</span>
                    </p>
                    <Button size="big" background="blue80" title="휴대폰 본인인증" width={160} marginTop={40} onClick={handleIdCert} />
                    <Certification show={certShow} callback={certCallback}></Certification>
                  </div>
                ) : (
                  <>
                    {isEmpty(schList) ? (
                      <div className="tx-bg">
                        <p>회원님의 정보와 일치하는 아이디가 존재하지 않습니다.</p>
                      </div>
                    ) : (
                      <>
                        <div className="tx-bg">
                          <p>회원님의 정보와 일치하는 아이디입니다.</p>
                        </div>
                        <dl>
                          <dt>· 이름</dt>
                          <dd>{schList[0].mbnm}</dd>
                          <dt>· 아이디</dt>
                          {schList.map((board, index) => {
                            return (
                              <dd key={index}>
                                <em>[{board.mbtpnm}]</em> {board.mbid} [{board.mbaprvkncdnm}]
                              </dd>
                            );
                          })}
                        </dl>
                        <p className="tx-sub ml10">* 단체계정 ID 찾기를 원하시면, 고객센터로 문의해주세요.</p>
                      </>
                    )}
                  </>
                )}
              </TabCont>
              <TabCont tabTitle="비밀번호 찾기" id="tab7-2" index={1}>
                {isPwCert === false ? (
                  <form className="login-form">
                    <fieldset>
                      <legend className="away">비밀번호 찾기</legend>
                    </fieldset>
                    <ul className="vert-step">
                      <li>
                        <span className="step">1</span>
                        <div className="con">
                          <p className="tit">아이디/이름 입력</p>
                          <span>
                            비밀번호를 찾고자 하는 아이디, 이름을 <br />
                            입력해주세요.
                          </span>
                          <ul>
                            <li>
                              <label htmlFor="user-id" className="hide">
                                아이디
                              </label>
                              <Input type="text" placeHolder="아이디" id="user-id" width={308} name="mbId" onChange={onChangeAll} value={mbId} />
                            </li>
                            <li>
                              <label htmlFor="user-name" className="hide">
                                이름
                              </label>
                              <Input type="text" placeHolder="이름" id="user-name" width={308} name="mbNm" onChange={onChangeAll} value={mbNm} />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <span className="step">2</span>
                        <div className="con">
                          <p className="tit">본인인증</p>
                          <span>휴대폰 본인인증을 진행해 주세요.</span>
                          <Button size="mid" background="blue80" title="휴대폰 본인인증" width={160} height={48} buttonMarkup={true} onClick={onConfirm} />
                          <Certification show={certShowPasswd} callback={certCallbackPwd}></Certification>
                          <p className="tx-sub">
                            입력하신 회원님의 개인 정보는{' '}
                            <span>
                              본인인증 이외의
                              <br />
                              목적으로 활용하지 않습니다.
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <form className="login-form">
                    <fieldset>
                      <legend className="away">비밀번호 재설정</legend>
                    </fieldset>
                    {isEmpty(schList) ? (
                      <div className="tx-bg">
                        <p>회원님의 정보와 일치하는 아이디가 존재하지 않습니다.</p>
                      </div>
                    ) : (
                      <>
                        <div className="tx-bg">
                          <dl>
                            <dt>· 아이디</dt>
                            <dd>
                              <em>{schList[0].mbid}</em>
                            </dd>
                          </dl>
                        </div>
                      {schList[0].mbaprvkncd === '0010' ?
                      <p className="tx-tit">딜러회원 승인 심사중인 계정입니다.</p>
                       :
                       <>
                        <p className="tx-tit">비밀번호를 재설정해주세요.</p>
                        <ul>
                          <li>
                            <label htmlFor="new-pw" className="hide">
                              새 비밀번호
                            </label>
                            <Input type="password" placeHolder="새 비밀번호" id="new-pw" width={368} name="mbPwdEnc" onChange={onChangeAll} value={mbPwdEnc} />
                          </li>
                          <li>
                            <label htmlFor="new-pw-chk" className="hide">
                              새 비밀번호 확인
                            </label>
                            <Input type="password" placeHolder="새 비밀번호 확인" id="new-pw-chk" width={368} name="mbPwdEncChk" onChange={onChangeAll} value={mbPwdEncChk} />
                          </li>
                        </ul>
                        <p className="tx-not">{chkPwdMsg}</p>
                        </>
                      }
                      </>
                    )}
                  </form>
                )}
              </TabCont>
            </TabMenu>
          </div>

          {findMode === 'id' && isIdCert === true && (
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" line="black" color="black" title="비밀번호 찾기" width={180} height={60} buttonMarkup={true} onClick={onHandleActivePwd} />
              <Button size="big" background="blue80" title="로그인" width={180} height={60} href="/login" />
            </Buttons>
          )}

          {/*
            (findMode === "password") && (
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="확인" width={180} height={60} width={180} buttonMarkup={true}  
              onClick={onConfirm} />
            </Buttons>
            )*/}

          {isPwCert === true && findMode === 'password' && !isEmpty(schList) ? (
            <>
              <div className="tx-wrap">
                <p className="tit">안내</p>
                <p className="con">
                  · 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.
                  <br />
                  · 아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.
                  <br />
                  · 연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가 (ex. 123kbcha, aaa, 111 등)
                  <br />· 타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.
                </p>
              </div>
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="blue80" title="변경하기" width={180} height={60} buttonMarkup={true} onClick={onChangePwd} />
              </Buttons>
              <p>* 비밀번호 변경 후, 새로운 비밀번호로 로그인해주세요.</p>
            </>
          ) : null}
        </div>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} width={375} closedHandler={modalCloseHandler} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>
            정상적으로 비밀번호가 변경되었습니다.
            <br />
            확인을 누르시면 로그인 페이지로 이동합니다.
          </p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="확인" width={68} href="/login" />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default withRouter(foundIdPwd);
