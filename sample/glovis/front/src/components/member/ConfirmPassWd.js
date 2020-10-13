/**
 * 설명 : 개인정보 수정을 위한 비밀번호 확인
 * @fileoverview 비밀번호 확인 화면
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { gInfoLive } from '@src/utils/LoginUtils';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import { getMemberInfoPwd } from '@src/actions/mypage/member/memberMngAction';

//mobile
import { SECTION_MYPAGE } from '@src/actions/types';

/**
 * 비밀번호 확인 화면
 * @param {object} 신청정보
 * @param {Number} activeNo 현재 처리된 스탭의 번호
 * @return {ConfirmPassWd}
 */
const ConfirmPassWd = () => {
  const dispatch = useDispatch();

  const mbId = gInfoLive().id;
  const memberInfoPwd = useSelector((state) => state.memberMng.memberInfoPwd);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [mbPwdEnc, setMbPwdEnc] = useState('');
  const [chkMsg, setChkMsg] = useState('');

  const onChangeMbPwdEnc = (e) => {
    setMbPwdEnc(e.target.value);
  };

  const handleChkPwd = useCallback(
    (e) => {
      e.preventDefault();
      if (isEmpty(mbPwdEnc)) {
        setChkMsg('비밀번호를 입력해주세요.');
        return;
      }
      dispatch(getMemberInfoPwd({ mbId, mbPwdEnc }));
    },
    [dispatch, mbId, mbPwdEnc]
  );

  //엔터
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleChkPwd(e);
    }
  };

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  useEffect(() => {
    if (memberInfoPwd === null) {
      setChkMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [memberInfoPwd]);

  if (hasMobile) {
    return (
      <div className="mypage-state-sec member-info-pw mt20">
        <div className="mypage-admin-title">
          <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
          <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 회원정보를 수정하실 수 있습니다.</p>
        </div>
        <div className="member-pw-wrap">
          <div className="member-pw">
            <label htmlFor="m-member-id">아이디</label>
            <Input type="text" id="m-member-id" height={40} value={mbId} disabled={true} />
            <label htmlFor="m-member-pw">비밀번호</label>
            <Input type="password" id="m-member-pw" height={40} onChange={onChangeMbPwdEnc} onKeyPress={handleKeyPress} />
            <p className="tx-exp-tp4 tx-red80">{chkMsg}</p>
          </div>
        </div>
        <Button size="full" className="fixed" background="blue80" title="확인" onClick={handleChkPwd} />
      </div>
    );
  }
  return (
    <div className="mypage-state-sec member-info-pw">
      <div className="mypage-admin-title tp2">
        <h3>회원정보 수정</h3>
        <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
        <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 회원정보를 수정하실 수 있습니다.</p>
      </div>

      <div className="member-pw-wrap">
        <div className="member-pw">
          <p>아이디</p>
          <p>{mbId}</p>
          <label htmlFor="member-pw">비밀번호</label>
          <Input type="password" id="member-pw" width={150} height={40} onChange={onChangeMbPwdEnc} onKeyPress={handleKeyPress} />
          <p className="tx-exp-tp4">{chkMsg}</p>
        </div>
      </div>

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="gray" title="취소" width={127} height={48} href={gInfoLive().membertype === '0010' ? '/mypage/personal/personalMain' : '/mypage/dealer/sellcar/carManagement'} />
        <Button size="big" background="blue80" title="확인" width={127} height={48} onClick={handleChkPwd} />
      </Buttons>
    </div>
  );
};

export default ConfirmPassWd;
