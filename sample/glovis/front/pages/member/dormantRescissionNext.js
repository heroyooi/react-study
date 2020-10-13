/**
* 모바일 휴면해제
**/
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import Certification from '@src/components/common/CertificationMod';
import { login } from '@src/utils/LoginUtils';
import { axiosPost } from '@src/utils/HttpUtils';

const dormantRescissionNext = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const handleMemberMode = useCallback((mode) => () => {
    setMemMode(mode);
  }, []);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  const [isCert, setIsCert] = useState('휴대폰 본인인증'); //본인인증 title 변경
  const [certShow, setCertShow] = useState(false);
  const [mbCi, setMbCi] = useState('');
  const [msg, setMsg] = useState('');
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

  //본인인증 공통
  const onHandleCertify = useCallback((e) => {
    e.preventDefault();
    setCertShow(true);
  }, []);

  const certCallback = (e) => {
    console.log(e);
    // eslint-disable-next-line eqeqeq
    if (e.RETURN_CD == '0000') {
      setCertShow(false);
      setMbCi(e.LGD_AUTHSUB_CI);
      setIsCert('본인인증 완료');
    }
  }

  //휴면해제
  const onChangeDormant = useCallback((e) => {
    e.preventDefault();
    if (!mbId) {
      setMsg('아이디를 입력해주세요.');
      setMpop(true);
      return false;
    } else if (!mbNm) {
      setMsg('이름을 입력해주세요.');
      setMpop(true);
      return false;
    } else if (isCert === '휴대폰 본인인증') {
      setMsg('본인인증을 완료해 주세요.');
      setMpop(true);
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
            setMpop(true);
          }else{
            setMsg('정확한 내용을 입력해주세요.');
            setMpop(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        //dispatch(updateQscnClear(paramObj));
        //login(mbId,mbCi, "1" );
        //setMsg('휴면상태가 해제되었습니다.');
        //setMpop(true);
          
        } else {
          alert("본인인증을 진행해주세요.");
        }   
      }
  });

  const goBack = (e) => {
    e.preventDefault();
    //Router.push('/login');
    window.location.href = '/member/dormantRescission';
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '휴면해제',
        options: ['back'],
        events: [(e) => goBack(e)]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fffff'
      }
    });
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-wrap">
            <div className="nomember-wrap bg-white">
              <form className="login-form">
                <fieldset>
                  <legend className="away">휴면 해제</legend>
                  <ul className="vert-step">
                    <li>
                      <div className="con">
                        <p className="tit"><span className="step">1</span>아이디/이름 입력</p>
                        <span>휴면해제를 원하시는 아이디, 이름을 입력해주세요.</span>
                        <ul className="mt16">
                          <li>
                            <label htmlFor="m-user-id" className="hide" >아이디</label>
                            <Input type="text" value="hyundai" placeHolder="아이디" id="m-user-id" height={40} name="mbId" onChange={onChangeAll} value={mbId} />
                          </li>
                          <li>
                            <label htmlFor="m-user-name" className="hide" >이름</label>
                            <Input type="text" value="김현대" placeHolder="이름" id="m-user-name" height={40} name="mbNm" onChange={onChangeAll} value={mbNm} />
                            {/*<p className="tx-sub tx-red80">이름을 진행해주세요.</p>*/}
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="active">{/*진행해야하는 단계 active클래스 추가 -> 완료되면 active제거*/}
                      <div className="con">
                        <p className="tit"><span className="step">2</span>본인인증</p>
                        <span>휴대폰 본인인증을 진행해 주세요.</span>
                        <p className="tx-sub">입력하신 회원님의 개인 정보는 본인인증 이외의목적으로 활용하지 않습니다.</p>
                        <Button size="full" background="blue80" disabled={false} radius={true} title={isCert}  height={40} fontSize={14} marginTop={16} onClick={onHandleCertify} />
                        <Certification show={certShow} callback={certCallback} />
                        {/*
                        <p className="tx-sub tx-red80">본인인증을 진행해주세요.</p>
                        */}
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="완료" onClick={onChangeDormant} />
        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>
            <p>{msg}</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <AppLayout>모바일 전용 페이지 입니다.</AppLayout>;
}

export default dormantRescissionNext;