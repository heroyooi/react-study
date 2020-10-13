/**
 * 설명 : 딜러 회원가입 시 가입정보입력 화면
 * @fileoverview 가입정보
 * @requires [memberAction, memberReducer]
 * @author D191364
 */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import moment from 'moment';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';

import JoinBaseInfo from '@src/components/member/JoinBaseInfo';
import JoinDealerInfo from '@src/components/member/JoinDealerInfo';
import { chkEmlAddrAll, chkId, chkPwd, chkMbBrn, checkDupFileNm } from '@src/utils/MemberUtil';
import { getEmlDup } from '@src/actions/member/memberAction';

//mobile
// eslint-disable-next-line no-unused-vars
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/**
 * 설명 : 딜러 회원가입 시 가입정보 처리하는 기능
 * @param {}
 * @returns {}
 */
const DealerMemberInfo = () => {
  const { showAlert, showConfirm, showLoader, hideLoader, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const dispatch = useDispatch();
  const [chkIdDup, setChkIdDup] = useState(false); //ID 입력체크
  const [resetFlag, setResetFlag] = useState(false); //비밀번호 reset
  const [tagInfo, setTagInfo] = useState('')
  const [onFocus, setOnFocus] =useState(false);

  const { chkIdFlag, mbTpcd, chkEmlFlag, mbInfo, mbJoinPathKncd, agrList, agrNList } = useSelector((state) => ({
    chkIdFlag: state.member.rtnVal,
    chkEmlFlag: state.member.rtnEmlVal,
    mbTpcd: state.member.mbTpcd,
    mbInfo: state.member.myMbInfoData,
    mbJoinPathKncd: state.member.mbJoinPathKncd,
    agrList: state.member.agrList,
    agrNList: state.member.agrNList
  }));

  const [msgs, setMsgs] = useState({
    chkPwdMsg: '',
    chkIdMsg: '',
    chkEmlMsg: '',
    chkAddrMsg: ''
  });

  const [msgs2, setMsgs2] = useState({
    chkCmplxMsg: '',
    chkEntrMsg: '',
    chkMbBrnMsg: '',
    chkMbEnMsg: '',
    chkMbEnFileMsg: '',
    chkMbProFileMsg: '',
    chkMbCertFileMsg: ''
  });
  const { chkEntrMsg, chkMbBrnMsg, chkMbEnMsg, chkCmplxMsg, chkMbEnFileMsg, chkMbProFileMsg, chkMbCertFileMsg } = msgs2;

  const [inputs, setInputs] = useState({
    mbId: '',
    mbPwdEnc: '',
    mbPwdEncChk: '',
    mbEmlAddrEnc: '',
    mbEmlAddr: '',
    mbEmlAddrDomain: '',
    mbZcd: '', //우편번호
    mbAddrEnc: '', //주소
    mbDtlAddrEnc: '', //상세주소
    entrCorpNm: '', //상사명
    reprNm: '', //대표명
    mbBrn: '', //사업자등록번호
    mbEn: '', //종사원번호
    enVldStrtDt: moment().format('YYYYMMDD'), //종사원번호 유효기간
    mbEnEprYmd: moment().format('YYYYMMDD'), //종사원번호 유효기간
    mbProfFileOpYn: 'Y', //프로필 공개여부
    mbJoinDvcd: '0010', //가입구분
    seqNo: '' //소속단지
  });
  const { mbId, mbPwdEnc, mbPwdEncChk, mbZcd, mbAddrEnc, mbDtlAddrEnc, mbEmlAddr, mbEmlAddrDomain, entrCorpNm, reprNm, mbBrn, mbEn, enVldStrtDt, mbEnEprYmd, seqNo } = inputs;

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
    if (e.target.name === 'mbId') idValidation(e);

    if (e.target.name === 'mbPwdEnc' || e.target.name === 'mbPwdEncChk') pwdValidation(e);

    if (e.target.name === 'mbEmlAddr' || e.target.name === 'mbEmlAddrDomain') emlValidation(e);

    if (e.target.name === 'reprNm' && !isNaN(e.target.value)) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkEntrMsg, ['chkEntrMsg']: '대표자명에 숫자는 입력될 수 없습니다.' });
      setTagInfo('agency-name');
    } else {
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkEntrMsg, ['chkEntrMsg']: '' });
      setTagInfo('');
    }

    if (e.target.name === 'mbBrn') {
      const mbBrnMsg = chkMbBrn(e.target.value);
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkMbBrnMsg, ['chkMbBrnMsg']: mbBrnMsg });
      setTagInfo('employee-num');
    }
  };

  //id Validation
  const idValidation = () => {
    const rtnIdMsg = chkId(mbId);
    if (!isEmpty(rtnIdMsg)) {
      setMsgs({ ...msgs, ['chkIdMsg']: rtnIdMsg });
      setTagInfo('user-id-join');
      return false;
    } else if (chkIdFlag !== 0 || chkIdDup === false) {
      setMsgs({ ...msgs, ['chkIdMsg']: '아이디 중복확인을 해주세요' });
      setTagInfo('user-id-join');
      return false;
    } else {
      setTagInfo('');
      return true;
    }
  };

  //password Validation
  const pwdValidation = () => {
    const rtnPwdMsg = chkPwd(mbPwdEnc, mbPwdEncChk, mbId);
    if (!isEmpty(rtnPwdMsg)) {
      setMsgs({ ...msgs, ['chkPwdMsg']: rtnPwdMsg });
      setTagInfo('user-pw');
    }
    if (isEmpty(rtnPwdMsg)) {
      setMsgs({ ...msgs, ['chkPwdMsg']: '비밀번호가 일치합니다' });
      setTagInfo('');
      return true;
    }
  };

  //email Validation
  const emlValidation = () => {
    const rtnEmlMsg = chkEmlAddrAll(mbEmlAddr, mbEmlAddrDomain);
    if (!isEmpty(rtnEmlMsg)) {
      setMsgs({ ...msgs, ['chkEmlMsg']: rtnEmlMsg });
      setTagInfo('user-email');
    }
    if (isEmpty(rtnEmlMsg)) {
      setMsgs({ ...msgs, ['chkEmlMsg']: '' });
      setTagInfo('');
      dispatch(getEmlDup(mbEmlAddr + '@' + mbEmlAddrDomain));
      return true;
    }
  };

  //ID 중복확인
  const onIdDup = useCallback(() => {
    const rtnIdMsg = chkId(mbId);
    if (!isEmpty(rtnIdMsg)) {
      setMsgs({ ...msgs, ['chkIdMsg']: rtnIdMsg });
      setTagInfo('user-id-join');
    } else if (mbId.length > 15 || mbId.length < 5) {
      setMsgs({ ...msgs, ['chkIdMsg']: '아이디는 영문 5~15자 이내로 입력해주세요' });
      setTagInfo('user-id-join');
    }else {
      setChkIdDup(true);
      const url = `/api/member/selectIdDup.do?mbId=${mbId}`;
      axiosGet(url, null).then((payload) => {
        console.log('selectIdDup payload :', payload.data.data);
        if (payload.data.sdata > 0) {
          setMsgs({ ...msgs, ['chkIdMsg']: '사용금지된 아이디입니다.' });
          setTagInfo('user-id-join');
        } else if (payload.data.data > 0) {
          setMsgs({ ...msgs, ['chkIdMsg']: '이미 등록된 아이디입니다.' });
          setTagInfo('user-id-join');
        } else {
          setMsgs({ ...msgs, ['chkIdMsg']: '사용 가능한 아이디입니다.' });
          setTagInfo('');
        }
      });
    }
  });

  const chkValidation = (e) => {
    /*
    const fileObj = [
      { name: 'mbEnFrnFileIdList', value: inputs.mbEnFrnFileIdList, id: '종사원증 이미지(앞면)' },
      { name: 'mbEnBckFileIdList', value: inputs.mbEnBckFileIdList, id: '종사원증 이미지(뒷면)' },
      { name: 'mbCertFileIdList', value: inputs.mbCertFileIdList, id: '소속 사업자등록증' },
      { name: 'mbProfFileIdList', value: inputs.mbProfFileIdList, id: '프로필 파일' }
    ];

    if (inputs.mbEnFrnFileIdList === undefined) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '종사원증 이미지(앞면)를 등록해주세요.' });
    } else if (inputs.mbEnBckFileIdList === undefined) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '종사원증 이미지(뒷면)를 등록해주세요.' });
    } else {
      const rtnFlag = checkDupFileNm(fileObj, { name: 'mbEnBckFileIdList', value: inputs.mbEnBckFileIdList });
      if (rtnFlag) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: rtnFlag.id + '파일 이름과 종사원증 이미지(뒷면)파일 이름이 동일할 수 없습니다.' });
      } else if (inputs.mbCertFileIdList === undefined) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkMbCertFileMsg, ['chkMbCertFileMsg']: '소속 사업자등록증을 등록해주세요.' });
      } else {
        const rtnFlag = checkDupFileNm(fileObj, { name: 'mbCertFileIdList', value: inputs.mbCertFileIdList });
        if (rtnFlag) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbCertFileMsg, ['chkMbCertFileMsg']: rtnFlag.id + '파일 이름과 소속 사업자등록증 파일 이름이 동일할 수 없습니다.' });
        }
      }
    }*/

    if (idValidation(e) && pwdValidation(e) && emlValidation(e) && chkEmlFlag.cnt === 0) {
      if (!mbZcd || !mbAddrEnc || !mbDtlAddrEnc) {
        setMsgs({ ...msgs, ['chkAddrMsg']: '주소를 입력해주세요' });
        setTagInfo('address2');
      } else {
        setMsgs({ ...msgs, ['chkAddrMsg']: '' });
        setTagInfo('');
        const mbBrnMsg = chkMbBrn(mbBrn);
        if (!seqNo) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkCmplxMsg, ['chkCmplxMsg']: '매매단지를 선택해주세요' });
          setTagInfo('member-area3');
        } else if (!entrCorpNm) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkEntrMsg, ['chkEntrMsg']: '소속상사명을 입력하세요' });
          setTagInfo('agency-name');
        } else if (!reprNm) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkEntrMsg, ['chkEntrMsg']: '소속상사 대표자명을 입력하세요' });
          setTagInfo('agency-ceo');
        } else if (!isEmpty(mbBrnMsg)) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbBrnMsg, ['chkMbBrnMsg']: mbBrnMsg });
          setTagInfo('agency-num');
        } else if (!mbEn) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호를 입력하세요' });
          setTagInfo('employee-num');
        } else if (!enVldStrtDt) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호 유효기간을 입력하세요' });
          setTagInfo('employee-num');
        } else if (!mbEnEprYmd) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호 유효기간을 입력하세요' });
          setTagInfo('employee-num');
        } else if (inputs.mbEnFrnFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '종사원증 이미지(앞면)를 등록해주세요.' });
          setTagInfo('employee-img-front');
        } else if (inputs.mbEnBckFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '종사원증 이미지(뒷면)를 등록해주세요.' });
          setTagInfo('employee-img-back');
        } else if (inputs.mbEnFrnFileIdList.name === inputs.mbEnBckFileIdList.name) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '종사원증 이미지(앞면) 파일 이름과 (뒷면)파일 이름이 동일할 수 없습니다.' });
          setTagInfo('employee-img-back');
        } else if (inputs.mbCertFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbCertFileMsg, ['chkMbCertFileMsg']: '소속 사업자등록증을 등록해주세요.' });
          setTagInfo('agency-Registration');
        } else if (inputs.mbEnFrnFileIdList.name === inputs.mbCertFileIdList.name) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbCertFileMsg, ['chkMbCertFileMsg']: '종사원증 이미지(앞면) 파일 이름과  소속 사업자등록증 파일 이름이 동일할 수 없습니다.' });
          setTagInfo('employee-img-back');
        } else if (inputs.mbEnBckFileIdList.name === inputs.mbCertFileIdList.name) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbCertFileMsg, ['chkMbCertFileMsg']: '종사원증 이미지(뒷면) 파일 이름과  소속 사업자등록증 파일 이름이 동일할 수 없습니다.' });
          setTagInfo('employee-img-back');
        } else if (inputs.mbProfFileIdList !== undefined) {
          if (inputs.mbEnFrnFileIdList.name === inputs.mbProfFileIdList.name) {
            // eslint-disable-next-line no-dupe-keys
            setMsgs2({ chkMbProFileMsg, ['chkMbProFileMsg']: '종사원증 이미지(앞면) 파일 이름과 프로필 파일 이름이 동일할 수 없습니다.' });
            setTagInfo('employee-profile-img');
          } else if (inputs.mbEnBckFileIdList.name === inputs.mbProfFileIdList.name) {
            // eslint-disable-next-line no-dupe-keys
            setMsgs2({ chkMbProFileMsg, ['chkMbProFileMsg']: '종사원증 이미지(뒷면) 파일 이름과 프로필 파일 이름이 동일할 수 없습니다.' });
            setTagInfo('employee-profile-img');
          } else if (inputs.mbCertFileIdList.name === inputs.mbProfFileIdList.name) {
            // eslint-disable-next-line no-dupe-keys
            setMsgs2({ chkMbProFileMsg, ['chkMbProFileMsg']: ' 소속 사업자등록증 파일 이름과 프로필 파일 이름이 동일할 수 없습니다.' });
            setTagInfo('employee-profile-img');
          } else {
            // eslint-disable-next-line no-dupe-keys
            setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '' });
            setTagInfo('');
            return true;
          }
        } else {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbEnFileMsg, ['chkMbEnFileMsg']: '' });
          setTagInfo('');
          return true;
        }
      }
    }
  };

  const moveScroll = (id) => {
    const moveId = '#' + id;
    const location = document.querySelector(moveId).offsetTop;
    window.scrollTo({top:location + 450, behavior:'smooth'})
    document.getElementById(id).focus();

    // document.getElementById(id).scrollIntoView();
    // //window.scrollTo({top:location + 450, behavior:'smooth'})
    // document.getElementById(id).focus();
  }

  //가입완료
  const onSave = useCallback((e) => {
    console.log('onSave: ', inputs);
    if (chkValidation(e)) {
      const paramObj = {
        ...inputs,
        ...mbInfo,
        agrList: agrList,
        agrNList: agrNList,
        mbJoinPathKncd: mbJoinPathKncd,
        mbEmlAddrEnc: mbEmlAddr + '@' + mbEmlAddrDomain,
        mbTpcd: mbTpcd
      };
      console.log('paramObj:', paramObj);
      const fileData = new FormData();
      for (const key in paramObj) {
        if (paramObj[key] !== undefined && paramObj[key] instanceof File) fileData.append(key, paramObj[key]);
      }
      //fileupload
      axiosPost('/api/member/insertMemberFile.do', fileData).then(({ data }) => {
        console.log('insertMbFile data:', data);
        if (data.statusinfo.returncd === 'SUCCESS') {
          delete paramObj.mbEnFrnFileIdList;
          delete paramObj.mbEnBckFileIdList;
          delete paramObj.mbCertFileIdList;
          delete paramObj.mbProfFileIdList;

          const fileObj = data.data;
          for (const key in fileObj) {
            if (!isEmpty(fileObj[key])) paramObj[key] = fileObj[key];
          }

          axiosPost('/api/member/insertMemberInfo.do', paramObj, false).then(({ data }) => {
            console.log('data:', data);
            if (data.statusinfo.returncd === 'SUCCESS') {
              /*
              Router.push(`/member/memberRegistrationComplete?mbTpcd=0020`).then(() => {
                window.scrollTo(0, 0);
              });*/
              window.location.href = '/member/memberRegistrationComplete?mbTpcd=0020';
              window.scrollTo(0, 0);
            } else {
              alert(data.statusinfo.returnmsg);
              //  console.log(data.statusinfo.returnmsg);
            }
          });
        } else {
          //alert(data.statusinfo.returnmsg);
          console.log(data.statusinfo.returnmsg);
        }
      });
    }
    if (tagInfo !== '') {
      moveScroll(tagInfo);
    }
  });

  useEffect(() => {
    //본인인증 안한경우
    if (mbTpcd === '' || mbInfo === '') {
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
      setTagInfo('user-email');
    }
  }, [chkEmlFlag]);

  useEffect(() => {
    if (!isEmpty(mbId)) {
      setResetFlag(false);
      if (chkIdDup) {
        setResetFlag(true);
      }
      setChkIdDup(false); //중복체크 false
    }
  }, [mbId]);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '딜러회원 가입',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 60,
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
                <JoinBaseInfo mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={mbTpcd} onClick={onIdDup} />

                {/* 딜러 기본 */}
                <JoinDealerInfo mbInfo={mbInfo} mbTpcd={mbTpcd} onChange={onChange} msgObj={msgs2} onBlur={onBlur} />

                <p className="tx-exp-tp6 tx-black mt10">※마이페이지 &gt; 회원정보 수정에서 판매점 주소와 영업시간 등을 추가할 수 있습니다. </p>
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
              <h3>딜러회원 가입</h3>
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
                <JoinBaseInfo mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={mbTpcd} onClick={onIdDup} resetFlag={resetFlag} />
                {/* 딜러 기본 */}
                <JoinDealerInfo mbInfo={mbInfo} mbTpcd={mbTpcd} onChange={onChange} msgObj={msgs2} onBlur={onBlur} />
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

export default DealerMemberInfo;
