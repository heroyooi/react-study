/**
 * 설명 : 일반 회원가입 시 가입정보입력 화면
 * @fileoverview 가입정보
 * @requires :
 * @author D191364
 */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { produce } from 'immer';
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';

import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';

import JoinBaseInfoU from '@src/components/member/JoinBaseInfoU';
import { chkEmlAddrAll, chkId, chkPwd } from '@src/utils/MemberUtil';
import { getEmlDup } from '@src/actions/member/memberAction';
import { login } from '@src/utils/LoginUtils';

// eslint-disable-next-line no-unused-vars
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types'; //모바일 삭제시 문제있는지 확인 불가

/**
 * 설명 : 일반 회원가입 시 가입정보 처리하는 기능
 * @param {}
 * @returns {}
 */
const PersonalMemberInfoU = () => {
  const dispatch = useDispatch();
  const [chkIdDup, setChkIdDup] = useState(false); //ID 입력체크
  const [resetFlag, setResetFlag] = useState(false); //비밀번호 reset
  const { chkIdFlag, mbTpcd, chkEmlFlag, mbInfo, mbJoinPathKncd, agrList, agrNList, snsData } = useSelector((state) => ({
    chkIdFlag: state.member.rtnVal,
    chkEmlFlag: state.member.rtnEmlVal,
    mbTpcd: state.member.mbTpcd,
    mbInfo: state.member.myMbInfoData,
    mbJoinPathKncd: state.member.mbJoinPathKncd,
    agrList: state.member.agrList,
    agrNList: state.member.agrNList,
    snsData: state.member.snsData
  }));

  const [inputs, setInputs] = useState({
    mbId: '',
    mbPwdEnc: '',
    mbPwdEncChk: '',
    mbZcd: '',
    mbAddrEnc: '',
    mbDtlAddrEnc: '',
    mbEmlAddr: '',
    mbEmlAddrDomain: '',
    mbNm: '',
    mbHpPnEnc: ''
  });
  const { mbId, mbPwdEnc, mbPwdEncChk, mbEmlAddr, mbEmlAddrDomain, mbNm, mbHpPnEnc } = inputs;

  //msgs
  const [msgs, setMsgs] = useState({
    chkNmMsg: '', //NmMsg
    chkHpMsg: '', //HpMsg
    chkEmlMsg: '', //EmlMsg
    chkPwdMsg: '', //passwordMsg
    chkIdMsg: '' //IDMsg
  });

  //onchange
  const onChange = (e) => {
    if (e.target) {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInputs(
        produce((draft) => {
          draft[name] = value;
        })
      );
    } else {
      for (const [key, value] of Object.entries(e)) {
        setInputs(
          produce((draft) => {
            draft[key] = value;
          })
        );
      }
    }
  };

  //포커스아웃 처리
  const onBlur = (e) => {
    if (e.target.name === 'mbId') {
      setResetFlag(false);
      if (chkIdDup) {
        setResetFlag(true);
      }
      setChkIdDup(false); //중복체크 false
      idValidation(e);
    }
    if (e.target.name === 'mbPwdEnc' || e.target.name === 'mbPwdEncChk') pwdValidation(e);

    if (e.target.name === 'mbEmlAddr' || e.target.name === 'mbEmlAddrDomain') emlValidation(e);
  };

  //id Validation
  const idValidation = () => {
    console.log('chkIdFlagL:', chkIdFlag);
    console.log('chkIdDup:', chkIdDup);
    const rtnIdMsg = chkId(mbId);
    if (!isEmpty(rtnIdMsg)) {
      setMsgs({ ...msgs, ['chkIdMsg']: rtnIdMsg });
      return false;
    } else if (chkIdFlag !== 0 || chkIdDup === false) {
      setMsgs({ ...msgs, ['chkIdMsg']: '아이디 중복확인을 해주세요' });
      return false;
    } else {
      return true;
    }
  };

  //password Validation
  const pwdValidation = () => {
    const rtnPwdMsg = chkPwd(mbPwdEnc, mbPwdEncChk, mbId);
    setMsgs({ ...msgs, ['chkPwdMsg']: rtnPwdMsg });
    if (isEmpty(rtnPwdMsg)) {
      return true;
    }
  };

  //email Validation
  const emlValidation = () => {
    const rtnEmlMsg = chkEmlAddrAll(mbEmlAddr, mbEmlAddrDomain);
    setMsgs({ ...msgs, ['chkEmlMsg']: rtnEmlMsg });
    if (isEmpty(rtnEmlMsg)) {
      dispatch(getEmlDup(mbEmlAddr + '@' + mbEmlAddrDomain));
      return true;
    }
  };

  //ID 중복확인
  const onIdDup = useCallback(() => {
    const rtnIdMsg = chkId(mbId);
    if (!isEmpty(rtnIdMsg)) {
      setMsgs({ ...msgs, ['chkIdMsg']: rtnIdMsg });
    } else {
      setChkIdDup(true);
      const url = `/api/member/selectIdDup.do?mbId=${mbId}`;
      axiosGet(url, null).then((payload) => {
        console.log('selectIdDup payload :', payload.data.data);
        if (payload.data.sdata > 0) {
          setMsgs({ ...msgs, ['chkIdMsg']: '사용금지된 아이디입니다.' });
        } else if (payload.data.data > 0) {
          setMsgs({ ...msgs, ['chkIdMsg']: '이미 등록된 아이디입니다.' });
        } else {
          setMsgs({ ...msgs, ['chkIdMsg']: '사용 가능한 아이디입니다.' });
        }
      });
    }
  });

  //이름, 핸드폰번호
  const validation = (e) => {
    if (isEmpty(mbNm)) {
      setMsgs({ ...msgs, ['chkNmMsg']: '이름을 입력하세요.' });
      return false;
    } else if (isEmpty(mbHpPnEnc)) {
      setMsgs({ ...msgs, ['chkHpMsg']: '핸드폰 번호를 입력하세요.', ['chkNmMsg']: '' });
      return false;
    } else if (!isEmpty(mbNm) && !isEmpty(mbHpPnEnc)) {
      setMsgs({ ['chkHpMsg']: '', ['chkNmMsg']: '' });
      return true;
    }
  };

  //가입완료
  const onSave = useCallback((e) => {
    console.log('onSave: ', inputs);
    console.log('mbTpcd: ', mbTpcd);
    if (idValidation(e) && pwdValidation(e) && validation(e) && emlValidation(e) && chkEmlFlag.cnt === 0) {
      if (validation(e)) setMsgs({ ['chkHpMsg']: '', ['chkNmMsg']: '' });
      const paramObj = {
        ...inputs,
        ...mbInfo,
        ...snsData,
        agrList: agrList,
        agrNList: agrNList,
        mbJoinPathKncd: mbJoinPathKncd,
        mbEmlAddrEnc: mbEmlAddr + '@' + mbEmlAddrDomain,
        mbTpcd: mbTpcd
      };
      console.log('paramObj:', paramObj);
      /*
      const formData = new FormData();
      for (const key in paramObj) {
        formData.append(key, paramObj[key]);
      }*/
      axiosPost('/api/member/insertMemberExcptCi.do', paramObj, false).then(({ data }) => {
        console.log('data:', data);
        if (data.statusinfo.returncd === 'SUCCESS') {
          window.location.href = '/member/memberRegistrationComplete?mbTpcd=0010';
          window.scrollTo(0, 0);
          login(mbId, mbPwdEnc);
          /*
          const rtnCd = login(mbId, mbPwdEnc);
          if (rtnCd === 'SUCCESS') {
            window.location.href = '/member/memberRegistrationComplete';
            window.onbeforeunload = function() {
              window.scrollTo(0, 0);
            };
          }*/
        } else {
          alert(data.statusinfo.returnmsg);
          console.log(data.statusinfo.returnmsg);
        }
      });
    }
  });

  useEffect(() => {
    if (mbTpcd === '') {
      //alert('잘못된 접근입니다.');
      Router.push('/member/choiceMemberType').then(() => {
        window.scrollTo(0, 0);
      });
    }
    dispatch({ type: SECTION_MEMBER });
  }, []);

  useEffect(() => {
    if (chkEmlFlag.cnt > 0) {
      setMsgs({ ...msgs, ['chkEmlMsg']: '이미 등록된 이메일입니다' });
    }
  }, [chkEmlFlag]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  if (hasMobile) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원가입 신청',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#ffffff'
        }
      });
    }, []);
    return (
      <AppLayout>
        <Steps type={1} contents={['약관동의', '본인인증', '회원가입 신청', '회원가입완료']} active={3} reverse={true} mode="stick" />
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                {/* 회원 기본 */}
                <JoinBaseInfoU mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={mbTpcd} onClick={onIdDup} />
              </fieldset>
            </form>
            <Button className="fixed" size="full" background="blue80" title="가입완료" buttonMarkup={true} onClick={onSave} />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>일반회원 가입</h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={3} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>가입정보입력</h4>
            </div>
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                {/* 회원 기본 */}
                <JoinBaseInfoU mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={mbTpcd} onClick={onIdDup} resetFlag={resetFlag} />
              </fieldset>
            </form>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="가입완료" width={180} height={60} buttonMarkup={true} onClick={onSave} />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PersonalMemberInfoU;
