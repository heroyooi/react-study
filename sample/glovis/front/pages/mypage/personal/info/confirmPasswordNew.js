import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import { gInfoLive } from '@src/utils/LoginUtils';
import { getMemberInfoPwd } from '@src/actions/mypage/member/memberMngAction';

const confirmPasswordNew = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const memberInfoPwd = useSelector((state) => state.memberMng.memberInfoPwd);
  const mbId = gInfoLive().id;

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

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비밀번호 변경',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(() => {
    if (memberInfoPwd === null) {
      setChkMsg('비밀번호가 일치하지 않습니다.');
    } else if (memberInfoPwd.mbId === mbId) {
      //Router.push('/mypage/personal/info/changePasswordNew');
      window.location.href = '/mypage/personal/info/changePasswordNew';
    }
  }, [memberInfoPwd]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-state-sec member-info-pw mt20">
            <div className="mypage-admin-title">
              <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
              <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 비밀번호를 변경하실 수 있습니다.</p>
            </div>

            <div className="member-pw-wrap">
              <div className="member-pw">
                <label htmlFor="member-id">아이디</label>
                <Input type="text" id="m-member-id" height={40} value={mbId} disabled={true} />
                <label htmlFor="member-pw">비밀번호</label>
                <Input type="password" id="m-member-pw" height={40} onChange={onChangeMbPwdEnc} />
                <p className="tx-exp-tp4 tx-red80">{chkMsg}</p>
              </div>
            </div>
            <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleChkPwd} />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec member-info-pw">
          <div className="mypage-admin-title">
            <h3>비밀번호 변경</h3>
            <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
            <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 비밀번호를 변경하실 수 있습니다.</p>
          </div>

          <div className="member-pw-wrap">
            <div className="member-pw">
              <p>아이디</p>
              <p>{mbId}</p>
              <label htmlFor="member-pw">비밀번호</label>
              <Input type="password" id="member-pw" width={150} height={40} onChange={onChangeMbPwdEnc} />
              <p className="tx-exp-tp4">{chkMsg}</p>
            </div>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} height={48} onClick={handleChkPwd} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

export default confirmPasswordNew;
