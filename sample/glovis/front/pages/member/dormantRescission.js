/**
 * 설명 : 휴면계정 회원 상태 내용 및 휴면 해제 기능 제공
 * @fileoverview 휴면상태 화면
 * @requires [memberAction, memberReducer]
 * @author 김지현
 */
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

import Certification from '@src/components/common/Certification';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { login } from '@src/utils/LoginUtils';
import { axiosPost } from '@src/utils/HttpUtils';
/**
 * 설명 : 휴면계정 회원 상태 내용
 * @param {} 
 * @returns {}
 */
const DormantRescission = () => {
  const [mbCi, setMbCi] = useState('');
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const result = useSelector((state) => state.member.updateQscnClear);
  // 본인인증
  const [certShow, setCertShow] = useState(false);

  const [isCert, setIsCert] = useState('휴대폰 본인인증'); //본인인증 title 변경
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [inputs, setInputs] = useState({
    mbId: '',
    mbNm: ''
  });
  const { mbId, mbNm } = inputs;
  const onChangeAll = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  /*
  useEffect(() => {    
    if (!isEmpty(result)) {
      if(result.returncd === '000'){
        setMsg('휴면상태가 해제되었습니다.');
      } else {
        setMsg(result.returnmsg);
      }

      setRodalShow(true);
    }
  }, [result])
*/
  //휴면해제
  const onChangeDormant = useCallback((e) => {
    if (!mbId) {
      setMsg('아이디를 입력해주세요.');
      setRodalShow(true);
      return false;
    } else if (!mbNm) {
      setMsg('이름을 입력해주세요.');
      setRodalShow(true);
      return false;
    } else if (isCert === '휴대폰 본인인증') {
      setMsg('본인인증을 완료해 주세요.');
      setRodalShow(true);
      return false;
    } else {
      if(onHandleCertify) {
        const paramObj =  {
          ...inputs,
          "mbCi" : mbCi
        }
  
        axiosPost('/api/member/updateQscnClear.do', paramObj)
        .then(({ data }) => {
          console.log("=========================================");
          console.log('memberAction>data=' + JSON.stringify(data));
          if(data.result.returncd === "000") {
            login(mbId,mbCi, "1" );
            setMsg('휴면상태가 해제되었습니다.');
            setRodalShow(true);
          }else{
            setMsg('정확한 내용을 입력해주세요.');
            setRodalShow(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        //dispatch(updateQscnClear(paramObj));
        //login(mbId,mbCi, "1" );
        //setMsg('휴면상태가 해제되었습니다.');
        //setRodalShow(true);
          
        } else {
          alert("본인인증을 진행해주세요.");
        }   
      }
  });

  //본인인증 공통
  const onHandleCertify = useCallback((e) => {
    setCertShow(true);
    //setIsCert('본인인증 완료')
  }, []);

  const certCallback = (e) => {
    console.log(e);
    // eslint-disable-next-line eqeqeq
    if (e.RETURN_CD == '0000') {
      setCertShow(false);
      //setMbCi(e.LGD_AUTHSUB_CI);
      setMbCi(e.LGD_AUTHSUB_CI);
      //dispatch(getSchIdList({mbCi:mbCi}))
      setIsCert('본인인증 완료');
    }
  }

  const onConfirm = (e) => {
    e.preventDefault();
    if (msg === '휴면상태가 해제되었습니다.') {
      Router.push('/main');
    }
    setRodalShow(false);
  }
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const goBack = (e) => {
    e.preventDefault();
    //Router.push('/login');
    window.location.href = '/login';
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '로그인',
        options: ['back'],
        events: [(e) => goBack(e)]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 60,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <span className="ico-wrap">
              <i className="ico-resting" />
            </span>
            <h4>
              고객님의 계정은 1년 이상 로그인하지 않아
              <br />
              현재 <span>휴면 상태</span>입니다.
            </h4>
            <p>원활한 서비스를 위하여 휴면 해제를 해주세요.</p>
          </div>

          <div className="ico-tx-wrap">
            <p>
              현대 오토벨에서는 고객님의 정보를 안전하게
              <br />
              보호하기 위하여 이용 내역이 없는 경우
              <br />
              휴면 상태로 전환하는 정책을 실시하고 있습니다.
              <br />
              휴면 회원은 서비스 이용이 제한될 수 있으며,
              <br />
              아래의 본인인증 절차에 따라 휴면 해제를 할 수 있습니다.
            </p>
          </div>
        </div>
        <MobBottomArea isFix={true} isSimple={true}>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/main" nextLink={true} />
            <Button size="big" background="blue80" title="휴면 해제" height={56} href="dormantRescissionNext" nextLink={true} />
          </Buttons>
        </MobBottomArea>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h4>
              고객님의 계정은 1년 이상 로그인하지 않아
              <br />
              현재 <span>휴면 상태</span>입니다.
            </h4>
            <p>원활한 서비스를 위하여 휴면 해제를 해주세요.</p>
          </div>

          <div className="ico-tx-wrap">
            <span className="ico-wrap">
              <i className="ico-resting" />
            </span>
            <p>
              현대 오토벨에서는 고객님의 정보를 안전하게 보호하기 위하여 이용 내역이 없는 경우
              <br />
              휴면 상태로 전환하는 정책을 실시하고 있습니다.
              <br />
              휴면 회원은 서비스 이용이 제한될 수 있으며, 아래의 본인인증 절차에 따라 휴면 해제를 할 수 있습니다.
            </p>
          </div>

          <div className="login-wrap">
            <form className="login-form">
              <fieldset>
                <legend className="away">휴면계정 해제</legend>
              </fieldset>
              <ul className="vert-step">
                <li>
                  <span className="step">1</span>
                  <div className="con">
                    <p className="tit">아이디/이름 입력</p>
                    <span>
                      휴면해제를 원하시는 아이디, 이름을
                      <br />
                      입력해주세요.
                    </span>
                    <ul>
                      <li>
                        <label htmlFor="user-id_dom" className="hide">
                          아이디
                        </label>
                        <Input type="text" placeHolder="아이디" id="user-id_dom" width={308} name="mbId" onChange={onChangeAll} value={mbId} />
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
                    <Button size="mid" background="blue80" title={isCert} width={160} height={48} buttonMarkup={true} onClick={onHandleCertify} />
                    <Certification show={certShow} callback={certCallback} />
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
          </div>

          <Buttons align="center" marginTop={60} className="w-line">
            <Button size="big" background="gray" title="취소" width={180} height={60} href="/login" />
            <Button size="big" background="blue80" title="휴면 해제" width={180} height={60} buttonMarkup={true} onClick={onChangeDormant} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} width={375} closedHandler={modalCloseHandler} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>{msg}</p>

          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="확인" width={68} onClick={onConfirm} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default DormantRescission;