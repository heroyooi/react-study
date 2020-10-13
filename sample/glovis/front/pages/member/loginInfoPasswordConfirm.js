/**
 * 비밀번호 찾기 후 비밀번호 재설정
 * @fileOverview 비밀번호 재설정
 * @requires memberAction, memberReducer
 * @author 김지현
 */

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter} from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import pwasWdSchema from '@lib/share/validator/member/PassWd';
import { createValidator } from '@lib/share/validator';
import { axiosPost } from '@src/utils/HttpUtils';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const loginInfoPasswordConfirm = (data) => {
  const response = JSON.parse(data.router.query.memInfo);
  const mbCi = data.router.query.mbCi;
  console.log(response);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  const [inputs, setInputs] = useState({
    mbPwdEncNew: '',
    mbPwdEncChk: ''
  });
  const { mbPwdEncNew, mbPwdEncChk } = inputs;

  const [errorMsg1, setErrorMsg1] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');

  const onChangeAll = (e) => {
    const { value, name } = e.target; 

    if (name == 'mbPwdEncNew') {
      const valid = passWdValidator1.validate(value);

      if (valid.error) {
        let msg = '새 비밀번호를 입력하세요.';
        setErrorMsg1(msg);
      } else {
        setErrorMsg1('');
      }
    } else if (name == 'mbPwdEncChk') {
      const valid = passWdValidator2.validate(value);
      if (valid.error){
        let msg = '새 비밀번호를 재입력하세요.';
        setErrorMsg2(msg);
      } else {
        setErrorMsg2('');
      }
    }

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onChangePwd = (e) => {
    e.preventDefault();

    const paramObj = {
      mbId: response[0].mbid,
      mbPwdEncNew: mbPwdEncNew,
      mbCi: mbCi
    };

    axiosPost('/api/member/updatePwdByNoLgn.do', paramObj)
        .then(({ data }) => {
            if(data.result.returncd === "000") {
              setMpop(true)
            } else {
              setErrorMsg2('저장중 오류가 발생하였습니다.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
  }

  // 모바일
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    useEffect(() => {
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
    }, []);
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-tit-area v-2">
            <h4>아이디 : {response[0].mbid}</h4>
            <p>비밀번호를 재설정 해주세요.</p>
          </div>          
          <div className="login-wrap mt16">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
                <ul>
                  <li>
                    <label htmlFor="new-pw" className="hide" >새 비밀번호</label>
                    <Input type="password" placeHolder="새 비밀번호" id="m-new-pw" height={40} name="mbPwdEncNew" value={mbPwdEncNew} onChange={onChangeAll}/>
                    <p className="tx-sub tx-red80">{errorMsg1}</p>
                  </li>
                  <li>
                    <label htmlFor="m-new-pw-chk" className="hide" >새 비밀번호 확인</label>
                    <Input type="password" placeHolder="새 비밀번호 확인" id="m-new-pw-chk" height={40} name="mbPwdEncChk" value={mbPwdEncChk} onChange={onChangeAll}/>
                    <p className="tx-sub tx-red80">{errorMsg2}</p>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
          <div className="tx-wrap">
            <p className="tit">[안내]</p>
            <dl className="con">
              <dd>비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</dd>
              <dd>아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</dd>
              <dd>연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가  (ex. 123kbcha, aaa, 111 등)</dd>
              <dd>타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</dd>
            </dl>
            <p className="b-tit">비밀번호 변경 후, 새로운 비밀번호로 로그인해주세요.</p>
          </div>          
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={onChangePwd} />
        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>
            <p>정상적으로 비밀번호가 변경되었습니다.<br />확인을 누르시면 로그인 페이지로 이동합니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold"  href="/login" nextLink={true} />
            </Buttons>
          </div>
        </RodalPopup>   
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.        
    </AppLayout>
  )
}

const passWdValidator1 = createValidator(pwasWdSchema, {
  required: ['mbPwdEncNew'],
  additionalProperties : true,
})
const passWdValidator2 = createValidator(pwasWdSchema, {
  required: ['mbPwdEncChk'],
  additionalProperties : true,
})

export default withRouter(loginInfoPasswordConfirm);