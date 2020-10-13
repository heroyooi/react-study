
/**
 * 비밀번호 찾기 기능 
 * @fileOverview 비밀번호 찾기
 * @requires memberAction, memberReducer
 * @author 김지현
 */

import { useState, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import useRodal from '@lib/share/custom/useRodal';
import CertificationMod from '@src/components/common/CertificationMod';
import { getSchIdList, getSchId, savePwd } from '@src/actions/member/memberAction';
import { SystemContext } from '@src/provider/SystemProvider';

import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const loginInfoPassword = () => {
  const { showAlert } = useContext(SystemContext);
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });
  //const { showAlert, initAlert } = useContext(SystemContext);
  const memberschList = useSelector((state) => state.member.schList);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  // 본인인증
  const [certTitle, setCertTitle] = useState('휴대폰 본인인증');
  const [certPassShow,setCertPassShow] = useState(false);

  if(hasMobile){
    // validate check
    const [ errorMsg1, setErrorMsg1 ] = useState('');
    const [ errorMsg2, setErrorMsg2 ] = useState('');

  // 데이타 가져오기
  //const schList = useSelector((state) => state.member.schList );

  const [mbCi, setMbCi] = useState('');
  const [inputs, setInputs] = useState({
    mbId: '',
    mbNm: ''
  });
  const {mbId, mbNm } = inputs;
  const onChangeAll = (e) => {
    e.preventDefault();
    const { value, name } = e.target; 
    setInputs({
      ...inputs, 
      [name]: value 
    });
  };

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  const certCallback = (e) => {
    console.log(e);
    if(e.RETURN_CD == '0000'){
      setCertPassShow(false);   
      setMbCi(e.LGD_AUTHSUB_CI);
      const paramObj =  {
        ...inputs,
        "mbCi" : e.LGD_AUTHSUB_CI
      } 
      console.log(paramObj);
      dispatch(getSchId(paramObj))
      setCertTitle("본인인증 완료");
    } 
  }




  const onFindPwd = (e) => {
    e.preventDefault();

    if(certTitle == '본인인증 완료') {

      if(memberschList == undefined) {
        showAlert('존재하는 회원정보가 없습니다.');
        return;
      }
      
      console.log(memberschList);
      if(!isEmpty(memberschList)) {
        Router.push({ pathname: '/member/loginInfoPasswordConfirm', query:{memInfo : JSON.stringify(memberschList), mbCi : mbCi} }, '/member/loginInfoPasswordConfirm');
      } else {
        showAlert('존재하는 회원정보가 없습니다.');
      }
      //
      //Router.push('/member/loginInfoPasswordConfirm');
    } else{
      if(isEmpty(inputs.mbId)) {
        setErrorMsg1("아이디를 입력해주세요.");
      } else if(isEmpty(inputs.mbNm)) {
        setErrorMsg2("이름을 입력해주세요.");
      } else {
        setErrorMsg1("");
        setErrorMsg2("");
        if(isEmpty(mbCi)) {
          showAlert("본인인증을 진행해 주세요.");
          return;
        }
      }
    }

  }

    const onCertHandler = useCallback((e) => {
      e.preventDefault();
      setCertPassShow(true);
    }, []);

    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '비밀번호 찾기',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 84,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-wrap">
            <div className="nomember-wrap bg-white">            
              <form className="login-form">
                <fieldset>
                  <legend className="away">비밀번호 찾기</legend>
                  <ul className="vert-step">
                    <li className="active">{/*진행해야하는 단계 active클래스 추가 -> 완료되면 active제거*/}
                      <div className="con">
                        <p className="tit"><span className="step">1</span>아이디/이름 입력</p>
                        <span>비밀번호를 찾고자 하는 아이디, 이름을 입력해주세요.</span>
                        <ul className="mt16">
                          <li>
                            <label htmlFor="m-user-id" className="hide" >아이디</label>
                            <Input type="text" placeHolder="아이디" id="m-user-id" height={40} 
                              name="mbId" onChange={onChangeAll} value={mbId} />
                              <p className="tx-sub tx-red80">{errorMsg1}</p>
                          </li>
                          <li>
                            <label htmlFor="m-user-name" className="hide" >이름</label>
                            <Input type="text" placeHolder="이름" id="m-user-name" height={40} 
                              name="mbNm" onChange={onChangeAll} value={mbNm} />
                            <p className="tx-sub tx-red80">{errorMsg2}</p>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="con">
                        <p className="tit"><span className="step">2</span>본인인증</p>
                        <span>휴대폰 본인인증을 진행해 주세요.</span>
                        <p className="tx-sub">입력하신 회원님의 개인 정보는 본인인증 이외의목적으로 활용하지 않습니다.</p>                      
                        <Button size="full" background="blue80" disabled={false} radius={true} title={certTitle}  height={40} fontSize={14} marginTop={16} onClick={onCertHandler} />
                        <CertificationMod show={certPassShow} callback={certCallback} ></CertificationMod>
                      </div>
                      <div className="l-btn-wrap">
                        <Button size="full" background="blue20" color="blue80" radius={true} title="아이디찾기"  height={40} fontSize={14} href="/member/foundIdPwd" nextLink={true}/> 
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={onFindPwd} nextLink={true} />
      </AppLayout>
    )
  }
  return <AppLayout>모바일 전용 페이지입니다.</AppLayout>;
}

export default loginInfoPassword;