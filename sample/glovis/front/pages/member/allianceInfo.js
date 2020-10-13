/**
 * 설명 : 제휴 회원가입 시 가입정보입력 화면
 * @fileoverview 가입정보
 * @requires [memberAction, memberReducer]
 * @author D191364
 */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

import AppLayout from '@src/components/layouts/AppLayout';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import JoinBaseInfo from '@src/components/member/JoinBaseInfo';
import JoinSocietyInfo from '@src/components/member/JoinSocietyInfo';
import { chkEmlAddr, chkId, chkPwd, getTmsObj, chkTmsAgrNAgrObj } from '@src/utils/MemberUtil';
import { saveMember, getEmlDup } from '@src/actions/member/memberAction';

//mobile
import Steps from '@lib/share/items/Steps';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { signup_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

let checkArr = [];
const AllianceInfo = (response) => {
  const dispatch = useDispatch();

  const [chkIdDup, setChkIdDup] = useState(false); //ID 입력체크
  const tmsListT = getTmsObj(response.data.data, '');
  const [policyCheckList] = useState(tmsListT[0]);
  const [policyCntn] = useState(tmsListT[1]);
  const mbInfo = response.mbData.data;

  const { chkIdFlag, chkEmlFlag, mbJoinPathKncd } = useSelector((state) => ({
    chkIdFlag: state.member.rtnVal,
    chkEmlFlag: state.member.rtnEmlVal,
    mbJoinPathKncd: state.member.mbJoinPathKncd
  }));

  const [msgs, setMsgs] = useState({
    altMsg: '',
    chkPwdMsg: '',
    chkIdMsg: ''
  });

  const [msgs2, setMsgs2] = useState({
    chkNmMsg: '',
    chkEmlMsg: '',
    chkBlFileMsg: '',
    chkMgmtBlFileMsg: '',
    chkCorpcertFileMsg: '',
    chkMbWrkPrtnCntrFileMsg: '',
    chkEntrAddrMsg: '',
    chkAdmnEntrMsg: '',
    chkSctrsNmMsg: ''
  });
  const { chkNmMsg, chkEmlMsg, chkBlFileMsg, chkMgmtBlFileMsg, chkCorpcertFileMsg, chkMbWrkPrtnCntrFileMsg, chkEntrAddrMsg, chkAdmnEntrMsg, chkSctrsNmMsg } = msgs2;

  const [inputs, setInputs] = useState({
    mbId: '',
    mbPwdEnc: '',
    mbPwdEncChk: '',
    mbEmlAddrEnc: '',
    entrTpCd: '0010',
    admnEntrRegNo: '', //관리자 사업자번호
    sctrsNm: '', //업종
    mbPrtnDvcd: '0010', //제휴구분
    entrZcd: '', //사업자 우편번호
    entrAddrEnc: '', //사업자 주소
    entrDtlAddrEnc: '', //사업자 주소
    mbProfFileOpYn: 'Y', //프로필 공개여부
    mbNm: '' //이름
  });

  const { mbId, mbPwdEnc, mbPwdEncChk, mbEmlAddrEnc, entrTpCd, admnEntrRegNo, sctrsNm, entrZcd, entrAddrEnc, entrDtlAddrEnc, mbNm } = inputs;

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
      setChkIdDup(false);
      idValidation(e);
    }
    if (e.target.name === 'mbPwdEnc' || e.target.name === 'mbPwdEncChk') pwdValidation(e);

    if (e.target.name === 'mbEmlAddrEnc') emlValidation(e);
  };

  //id Validation
  const idValidation = () => {
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
    const rtnEmlMsg = chkEmlAddr(mbEmlAddrEnc);
    // eslint-disable-next-line no-dupe-keys
    setMsgs2({ chkEmlMsg, ['chkEmlMsg']: rtnEmlMsg });
    if (isEmpty(rtnEmlMsg)) {
      dispatch(getEmlDup(mbEmlAddrEnc));
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
        console.log('selectIdDup payload :', payload.data);
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

  //validation
  const chkValidation = (e) => {
    //debugger;
    if (idValidation(e) && pwdValidation(e)) {
      if (entrTpCd === '0010' && isEmpty(admnEntrRegNo)) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkAdmnEntrMsg, ['chkAdmnEntrMsg']: '관리자 사업자번호를 입력해주세요' });
      } else if (isEmpty(sctrsNm)) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkSctrsNmMsg, ['chkSctrsNmMsg']: '업종을 입력해주세요' });
      } else if (isEmpty(entrZcd) || isEmpty(entrAddrEnc) || isEmpty(entrDtlAddrEnc)) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkEntrAddrMsg, ['chkEntrAddrMsg']: '사업자 주소를 입력해주세요' });
        //소속단지 추가 필요
      } else if (isEmpty(mbNm)) {
        // eslint-disable-next-line no-dupe-keys
        setMsgs2({ chkNmMsg, ['chkNmMsg']: '이름(담당자명)을 입력하세요' });
      } else if (emlValidation(e) && chkEmlFlag.cnt === 0) {
        if (inputs.blFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkBlFileMsg, ['chkBlFileMsg']: '사업자등록증 이미지를 등록해주세요.' });
        } else if (inputs.mgmtBlFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMgmtBlFileMsg, ['chkMgmtBlFileMsg']: '관리사업자등록증 이미지를 등록해주세요.' });
        } else if (inputs.corpcertFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkCorpcertFileMsg, ['chkCorpcertFileMsg']: '법인인감증명서 이미지를 등록해주세요.' });
        } else if (inputs.mbWrkPrtnCntrFileIdList === undefined) {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbWrkPrtnCntrFileMsg, ['chkMbWrkPrtnCntrFileMsg']: '업무제휴계약서 등록해주세요.' });
        } else {
          // eslint-disable-next-line no-dupe-keys
          setMsgs2({ chkMbWrkPrtnCntrFileMsg, ['chkMbWrkPrtnCntrFileMsg']: '' });
          return true;
        }
      }
    }
  };

  //가입완료
  const onSave = useCallback((e) => {
    console.log('onSave:', inputs);
    if (chkValidation(e)) {
      const chkTmsAgrNAgrList = chkTmsAgrNAgrObj(policyCheckList, checkArr);
      if (!isEmpty(chkTmsAgrNAgrList)) {
        const agrObj = chkTmsAgrNAgrList[0];
        const agrNObj = chkTmsAgrNAgrList[1];

        const paramObj = {
          ...inputs,
          ...response.param,
          mbTpcd: response.param.userTpcd,
          agrList: agrObj,
          agrNList: agrNObj,
          mbJoinPathKncd: mbJoinPathKncd
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
            delete paramObj.blFileIdList;
            delete paramObj.mgmtBlFileIdList;
            delete paramObj.corpcertFileIdList;
            delete paramObj.mbWrkPrtnCntrFileIdList;
            delete paramObj.mbPoaFileIdList;
            delete paramObj.mbProfFileIdList;

            const fileObj = data.data;
            for (const key in fileObj) {
              if (!isEmpty(fileObj[key])) paramObj[key] = fileObj[key];
            }

            axiosPost('/api/member/insertMemberInfo.do', paramObj, false).then(({ data }) => {
              console.log('data:', data);
              if (data.statusinfo.returncd === 'SUCCESS') {
                /*
                Router.push(`/member/memberRegistrationComplete?mbTpcd=0040`).then(() => {
                  window.scrollTo(0, 0);
                });*/
                window.location.href = '/member/memberRegistrationComplete?mbTpcd=0040';
                window.scrollTo(0, 0);
              } else {
                alert(data.statusinfo.returnmsg);
                console.log(data.statusinfo.returnmsg);
              }
            });
          } else {
            //alert(data.statusinfo.returnmsg);
            console.log(data.statusinfo.returnmsg);
          }
        });

        /*
        dispatch(saveMember(formData));
        Router.push('/member/memberRegistrationComplete').then(() => {
          window.scrollTo(0, 0);
        });*/
      }
    }
  });

  //약관
  const onCheck = (e, val) => {
    checkArr = val;
  };

  useEffect(() => {
    if (isEmpty(mbInfo.rtnMbInfo)) {
      alert('접근권한이 없습니다.'); //정상적이지 않은 접근 이거나 신청내역이 없을 경우
      Router.push('/member/choiceMemberType').then(() => {
        window.scrollTo(0, 0);
      });
    }
    dispatch({ type: SECTION_MEMBER });
  }, []);

  useEffect(() => {
    if (chkEmlFlag.cnt > 0) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs2({ chkEmlMsg, ['chkEmlMsg']: '이미 등록된 이메일입니다' });
    }
  }, [chkEmlFlag]);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    useEffect(() => {
      alert('현재는 PC웹에서만 단체/제휴 회원가입이 가능합니다.');
      Router.push('/main').then(() => {
        window.scrollTo(0, 0);
      });
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '제휴회원 가입',
          options: ['back','gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#ffffff'
        }
      });
    }, []);   

    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
    const [seq, setSeq] = useState(0);

    const handleFullpagePopup = useCallback((name,seq) => e => {
      e.preventDefault();
      if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: signup_check_list[seq].title,
            options: ['close']
          }
        });
        setSeq(seq);
        setFpAddress(false);
        setFpTerms(true);
      }
    }, [fpTerms]);

    
    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      setFpTerms(false);
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, [])  
    
return (
      <AppLayout>
        <Steps type={1} contents={['회원가입 신청', '회원가입완료']} active={1} reverse={true} mode="stick"/>        
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                                    
                  {/* 회원 기본 */}
                  <JoinBaseInfo  mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={'0040'}
                  onClick={onIdDup}/>     

                  {/* 단체/제휴 기본 */}
                  { mbInfo.rtnMbInfo && (
                  <JoinSocietyInfo  mbInfo={mbInfo} onChange={onChange} msgObj={msgs2} onBlur={onBlur} mbTpcd={'0040'}
                  />    
                  ) }
                  
              </fieldset>
              <div className="select-wrap">
                <SignUpCheckBoxGroup
                  sub_title="필수약관만 동의합니다."
                  sub_id="chk-agree-essential"
                  title="전체동의 합니다."
                  id="chk-agree-all"
                  agree_list={signup_check_list}
                  agree_term={auction_check_term}
                  events={[handleFullpagePopup("terms", 0), handleFullpagePopup("terms", 1), handleFullpagePopup("terms", 2), handleFullpagePopup("terms", 3), handleFullpagePopup("terms", 4)]}
                  links={['/member/termsView?seq=0', '/member/termsView?seq=1', '/member/termsView?seq=2', '/member/termsView?seq=3']}
                /> 
              </div>
            </form>            
            <Button className="fixed" size="full" background="blue80" title="가입완료"href="/member/memberRegistrationComplete" onClick={CloseFpPop}/>
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup}>          
          {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">{auction_check_term[seq]}</div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>          
          </div>)}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>제휴회원가입</h4>
            </div>
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                {/* 회원 기본 */}
                <JoinBaseInfo mbInfo={mbInfo} onChange={onChange} msgObj={msgs} onBlur={onBlur} mbTpcd={'0040'} onClick={onIdDup} />

                {/* 단체/제휴 기본 */}
                {mbInfo.rtnMbInfo && <JoinSocietyInfo mbInfo={mbInfo} onChange={onChange} msgObj={msgs2} onBlur={onBlur} mbTpcd={'0040'} />}
              </fieldset>
              <SignUpCheckBoxGroup
                sub_title="필수 약관 동의"
                sub_id="chk-agree-essential"
                title="약관 전체 동의"
                id="chk-agree-all"
                agree_list={policyCheckList}
                agree_term={policyCntn}
                onChange={onCheck}
              />
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

AllianceInfo.getInitialProps = async (http) => {
  const { req } = http;
  const data = req.query;

  console.log('req:', req);
  const url2 = `/api/member/selectRepresentativeId.do?userId=${data.userId}&userTpcd=${data.userTpcd}`;
  const resMb = await axiosGet(url2, null, false);

  //약관 불러 오기
  const url = `/api/member/selectTmsList.do?tpcd=0030`;
  const res = await axiosGet(url, null, false);

  return {
    mbData: resMb.data,
    data: res.data,
    param: req.query
  };
};

export default AllianceInfo;
