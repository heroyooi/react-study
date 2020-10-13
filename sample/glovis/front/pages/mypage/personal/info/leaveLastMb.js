/**
 * 설명 : 회원탈퇴
 * @fileoverview 마이페이지(개인)>회원정보관리>회원탈퇴 최종
 * @requires leaveLastMb
 * @author 김지현
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTermsView from '@src/components/common/MobTermsView';
import { axiosPost } from '@src/utils/HttpUtils';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { setCommaString } from '@src/utils/StringUtil';
import { gInfoLive } from '@src/utils/LoginUtils';

const leaveLastMb = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useRodal('');
  const [leaveReason, setLeaveReason] = useState('');
  const [inputs, setInputs] = useState({
    idChk1: '',
    idChk2: '',
    idChk3: '',
    idChk4: '',
    idChk5: '',
    idChk6: ''
  });

  // const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, false);
  // const [rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8] = useRodal(false, false);
  const [askPop, setAskPop, openAskPop, closeDimmAskPop] = useRodal(false);
  const [confirmPop, setConfirmPop, openConfirmPop, closeDimmConfirmPop] = useRodal(false);

  const { idChk1, idChk2, idChk3, idChk4, idChk5, idChk6 } = inputs;

  const closeAlertPopup = (e) => {
    e.preventDefault();
    setConfirmPop(false);
    if (msg === '탈퇴가 완료되었습니다.') {
      Router.push('/main');
    }
  };

  const closeAskPop = (e) => {
    e.preventDefault();
    setAskPop(false);
  };

  const onHandlerChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'leaveReason') {
      setLeaveReason(e.target.value);
    }
  };

  const onChangeCheckBox = (e, target) => {
    e.preventDefault();
    const tmp = e.target.id.substring(3, 7);
    if (e.target.checked) {
      setInputs({
        ...inputs,
        [target]: tmp
      });
    } else {
      setInputs({
        ...inputs,
        [target]: ''
      });
    }
  };

  const openConfirm = (e) => {
    e.preventDefault();
    openConfirmPop(true);
    setAskPop(false);
    // 바로 탈퇴
    const rsnCd = idChk1 + idChk2 + idChk3 + idChk4 + idChk5 + idChk6;

    const data = {
      mbId: userId,
      mbWthdRsnCd: setCommaString(rsnCd), // 탈퇴 사유코드
      mbWthdRsnCntn: leaveReason // 탈퇴 사유 내용
    };

    if (isEmpty(rsnCd)) {
      setMsg('탈퇴사유를 선택하세요.');
      setConfirmPop(true);
      return;
    }
    if (isEmpty(leaveReason)) {
      setMsg('탈퇴이유를 적어주세요.');
      setConfirmPop(true);
      return;
    }

    axiosPost('/api/member/updateWthd.do', data)
      .then(({ data }) => {
        if (data.result.returncd === '000') {
          // 바로 탈퇴
          setMsg('탈퇴가 완료되었습니다.');
          setConfirmPop(true);
          Router.push('/main');
        } else {
          // update 오류
          setMsg('탈퇴중 오류가 발생했습니다.');
          setConfirmPop(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg('탈퇴중 오류가 발생했습니다.');
        setConfirmPop(true);
      });
  };

  useEffect(() => {
    console.log('gInfoLive().id=%o', gInfoLive().id);
    setUserId(gInfoLive().id);
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원탈퇴',
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

  const policyOpen = (e) => {
    handleFullpagePopup(e);
  };
  const [fpPolicy, setFpPolicy] = useState(false);
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '개인정보처리방침',
          options: ['close']
        }
      });
      setFpPolicy(true);
    },
    [dispatch]
  );
  const closeFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      setFpPolicy(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap pd0">
          <div className="mypage-state-sec member-info-pw withdrawal">
            <div className="mypage-admin-title v-2 bg-gray20 pd20">
              <p className="b-tit">
                그동안 현대 글로비스 오토벨을 이용해주신
                <br />
                고객님께 감사드립니다.
              </p>
              <p className="s-tit mt8">
                탈퇴 사유를 알려주시면
                <br /> 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.
              </p>
            </div>

            <div className="withdrawal-reason pdside20 mt24">
              <p>
                탈퇴 사유 선택<span>(중복 선택 가능)</span>
              </p>
              <ul className="mt8">
                <li>
                  <CheckBox id="chk0010" title="서비스 기능 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk1')} />
                </li>
                <li>
                  <CheckBox id="chk0020" title="서비스 정책 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk2')} />
                </li>
                <li>
                  <CheckBox id="chk0030" title="개인정보 및 보안우려" onChange={(e) => onChangeCheckBox(e, 'idChk3')} />
                </li>
                <li>
                  <CheckBox id="chk0040" title="고객 응대에 대한 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk4')} />
                </li>
                <li>
                  <CheckBox id="chk0050" title="타사 서비스 이용" onChange={(e) => onChangeCheckBox(e, 'idChk5')} />
                </li>
                <li>
                  <CheckBox id="chk0060" title="이용 빈도 낮음" onChange={(e) => onChangeCheckBox(e, 'idChk6')} />
                </li>
              </ul>
              <p className="mt24">기타사유</p>
              <div className="mt8">
                <Textarea height={133} countLimit={200} type="tp1" name="leaveReason" data={leaveReason} onBlur={onHandlerChange} placeHolder="기타 의견을 자유롭게 작성해주세요." />
              </div>
            </div>
            <Buttons align="center" className="fixed full">
              <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/mypage/personal/personalMain" nextLink={true} />
              <Button size="big" background="blue80" title="탈퇴" height={56} onClick={(e) => openAskPop(e, 'fade')} />
            </Buttons>
          </div>
        </div>

        {/* 일반회원 탈퇴 시 */}
        <RodalPopup show={askPop} type={'fade'} width={380} closedHandler={closeDimmAskPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>정말 탈퇴하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeAskPop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={openConfirm} />
            </Buttons>
          </div>
        </RodalPopup>
        <RodalPopup show={confirmPop} type={'fade'} width={380} closedHandler={closeDimmConfirmPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>{msg}</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>

        {/* 딜러회원 탈퇴 시
        <RodalPopup show={askPop} type={'fade'} width={380} closedHandler={closeDimmAskPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap popup-withdrawal">
            <p className="exp">
              회원 탈퇴 시 <span className="tx-red80">30일 이내 재가입 불가</span>하며, 이용내역은 일정기간 보관 이후 삭제됩니다.<br />
              <span className="tx-gray" onClick={policyOpen}>개인정보처리방침 자세히보기</span>
            </p>
            <p className="exp mt8">
              본인 인증 후 탈퇴신청이 완료되며, <span className="tx-blue80">관리자 확인 후 탈퇴처리가 완료</span>됩니다.
            </p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeAskPop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={openConfirm} />
            </Buttons>
          </div>
        </RodalPopup>
        <RodalPopup show={confirmPop} type={'fade'} width={380} closedHandler={closeDimmConfirmPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">탈퇴신청이 접수되었습니다.<br />관리자 확인 후 탈퇴처리가 진행됩니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>
        */}
        
        <MobFullpagePopup active={mFullpagePopup}>
          {fpPolicy && <MobTermsView callback={closeFullpagePopup}/>}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-info-pw withdrawal">
          <div className="mypage-admin-title">
            <h3>회원탈퇴</h3>
            <p className="tx-exp-tp5">&#8251; 그동안 현대 글로비스 오토벨을 이용해주신 고객님께 감사드립니다.</p>
            <p className="tx-exp-tp5">&#8251; 탈퇴 사유를 알려주시면 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.</p>
          </div>

          <div className="withdrawal-reason">
            <p>
              탈퇴 사유 선택
              <br />
              (중복 선택 가능)
            </p>
            <ul>
              <li>
                <CheckBox id="chk0010" title="서비스 기능 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk1')} />
              </li>
              <li>
                <CheckBox id="chk0020" title="서비스 정책 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk2')} />
              </li>
              <li>
                <CheckBox id="chk0030" title="개인정보 및 보안우려" onChange={(e) => onChangeCheckBox(e, 'idChk3')} />
              </li>
              <li>
                <CheckBox id="chk0040" title="고객 응대에 대한 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk4')} />
              </li>
              <li>
                <CheckBox id="chk0050" title="타사 서비스 이용" onChange={(e) => onChangeCheckBox(e, 'idChk5')} />
              </li>
              <li>
                <CheckBox id="chk0060" title="이용 빈도 낮음" onChange={(e) => onChangeCheckBox(e, 'idChk6')} />
              </li>
            </ul>
            <Textarea countLimit={500} type="tp2" onChange={onHandlerChange} data={leaveReason} name="leaveReason" />
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="탈퇴취소" width={127} height={48} href="/mypage/personal/personalMain" />
            <Button size="big" background="blue80" title="탈퇴하기" width={127} height={48} onClick={(e) => openAskPop(e, 'fade')} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={askPop} type={'fade'} width={375} closedHandler={closeDimmAskPop} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
        <div className="con-wrap compact">
          <p>정말 탈퇴하시겠습니까?</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={closeAskPop} />
            <Button size="sml" background="blue80" radius={true} title="확인" width={68} onClick={openConfirm} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={confirmPop} type={'fade'} width={375} closedHandler={closeDimmConfirmPop} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>{msg}</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default leaveLastMb;
