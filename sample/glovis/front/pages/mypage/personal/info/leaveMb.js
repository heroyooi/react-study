/**
 * 회원탈퇴 비밀번호 확인
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
import Input from '@lib/share/items/Input';

import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTermsView from '@src/components/common/MobTermsView';
import { axiosPost } from '@src/utils/HttpUtils';

import { gInfoLive } from '@src/utils/LoginUtils';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

import MobBottomArea from '@lib/share/items/MobBottomArea';

const leaveMb = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [userId, setUserId] = useState(''); //
  const [rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6] = useRodal(false, true); //  사용중인 서비스가 있는 경우
  const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, false);
  const [msg, setMsg] = useRodal('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState({});

  // bottom : 이용중인 서비스 없을 시 아래 state 2개 false로 변경 필요
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const closeAlertPopup = (e) => {
    e.preventDefault();
    setRodalShow7(false);
  };

  const onCloseHandler = (e) => {
    e.preventDefault();
    if (hasMobile) {
      setDimm(false);
      setActive(false);
    } else {
      setRodalShow6(false);
    }
  };

  const validForm = () => {
    if (isEmpty(password)) {
      setMsg('비밀번호를 입력해주세요.');
      setRodalShow7(true);
      return false;
    }
    return true;
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!validForm) return false;

    const paramObj = {
      mbId: userId,
      mbPwdEnc: password
    };

    axiosPost('/api/member/selectChkPwd.do', paramObj)
      .then(({ data }) => {
        if (data.statusinfo.returncd === '000') {
          console.log('탈퇴가능여부 확인 == 이용중인 서비스 조회');
          axiosPost('/api/member/selectChkWthdAvail.do', { mbId: userId, mbTpcd: '0010' }) // DD112233
            .then(({ data }) => {
              console.log('=========================================');
              console.log(data);
              setService(data.data);
              if (data.statusinfo.returncd === '000') {
                // 이용중인 서비스가 있는 경우
                if (data.data.mycar === 'N' && data.data.hsvcusage === 'N' && data.data.ewprdusage === 'N') {
                  Router.push({ pathname: '/mypage/personal/info/leaveLastMb', query: { data: 0 } }, '/mypage/personal/info/leaveLastMb');
                } else {
                  if (hasMobile) {
                    setDimm(true);
                    setActive(true);
                  } else {
                    setRodalShow6(true);
                  }
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setMsg('비밀번호가 일치하지않습니다.');
          setRodalShow7(true);
        }
      })
      .catch((err) => {
        console.log(err);
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

  const termsOpen = (e) => {
    handleFullpagePopup(e);
  };
  const [fpTerms, setFpTerms] = useState(false);
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '환불약관',
          options: ['close']
        }
      });
      setFpTerms(true);
    },
    [dispatch]
  );
  const closeFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-state-sec member-info-pw withdrawal mt20">
            <div className="mypage-admin-title">
              <p className="tx-exp-tp5">&#8251; 고객님의 개인정보 보호를 위해 비밀번호 인증 후 회원탈퇴를 하실 수 있으며, 아래의 안내사항을 확인해주시기 바랍니다.</p>
            </div>
            <div className="withdrawal-ex mt24">
              <p className="mb16">
                <em>1. 30일간 회원가입 불가능</em>
                회원탈퇴 후 30일 동안은 회원가입이 불가능합니다.
                <br />
                탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.
              </p>
              <p>
                <em>2. 차량 정보와 이용 중인 서비스 </em>
                차량정보와 이용 중인 유료 광고 상품 및 프리미엄 서비스 등 유료서비스 등에 대한 정보와 데이터는 모두 삭제됩니다.
                <br />
                <small>* 이용 중인 서비스가 있으신 경우 관리자 확인 후 탈퇴가 진행 됩니다.</small>
              </p>
            </div>
            <div className="member-pw-wrap">
              <div className="member-pw">
                <label htmlFor="member-id">아이디</label>
                <Input type="text" id="m-member-id" height={40} value={userId} disabled={true} />
                <label htmlFor="member-pw">비밀번호</label>
                <Input type="password" id="m-member-pw" height={40} value={password} onChange={handlePasswordChange} />
              </div>
            </div>
            <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleClick} />
          </div>
        </div>
        <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} />
        <RodalPopup show={rodalShow7} type={'fade'} width={380} closedHandler={modalCloseHandler7} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1" />
            <p>{msg}</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>
        <MobBottomArea active={active} isFixButton={true} zid={101}>
          <div className="inner pb0">
            <p className="tit1 mb8">이용중인 서비스</p>
            <p className="tx-tit tx-gray">고객님의 서비스 이용 현황입니다.</p>
            {/* 일반회원 탈퇴 시 */}
            <ul className="notice">
              {!isEmpty(service.mycar) && service.mycar === 'Y' && (
                <li>
                  <p>
                    내차 팔기 신청중
                    <span><i className="ico-dot"></i>진행 중인 내차팔기 신청내역이 있습니다. 신청 완료 혹은 취소 이후 탈퇴하실 수 있습니다.</span>
                  </p>
                </li>
              )}
              {!isEmpty(service.hsvcusage) && service.hsvcusage === 'Y' && (
                <li>
                  <p>
                    홈서비스 신청중
                    <span><i className="ico-dot"></i>진행 중인 홈서비스 신청내역이 있습니다. 완료 혹은 취소 이후 탈퇴하실 수 있습니다.</span>
                  </p>
                </li>
              )}
              {!isEmpty(service.ewprdusage) && service.ewprdusage === 'Y' && (
                <li>
                  <p>
                    이용중인 상품
                    <span><i className="ico-dot"></i>고객님께서는 EW상품을 이용하고 계십니다. EW보증기간 동안에는 탈퇴하실 수 없습니다.</span>
                  </p>
                </li>
              )}
            </ul>

            {/* 딜러회원 탈퇴 시
            <ul className="notice">
              <li>
                <p>
                  경매회원
                  <span><i className="ico-dot"></i>오토벨을 탈퇴하시더라도 경매장은 계속 이용하실 수 있습니다.</span>
                  <span className="tx-red80"><i className="ico-dot bg-red80"></i>경매회원 탈퇴는 경매장에 문의해주세요.</span>
                </p>
              </li>
              <li>
                <p>
                  경매낙찰 차량 보내기
                  <span><i className="ico-dot"></i>광고대기 상태의 경매장 낙찰 차량은 발송자의 경우 대표자 딜러계정으로 변경되며, 수신인의 경우 발송자의 ID로 변경됩니다.</span>
                </p>
              </li>
              <li>
                <p>
                  이용중인 광고 상품
                  <span><i className="ico-dot"></i>환불 정책에 의거하여 환불가능 상품에 한해 환불처리를 진행합니다.</span>
                  <span><i className="ico-dot"></i>자세한 사항은 환불정책을 확이하여 주시기 바랍니다.<span className="tx-gray" onClick={termsOpen}>환불정책 자세히보기</span></span>
                </p>
              </li>
              <li>
                <p>
                  포인트
                  <span><i className="ico-dot"></i>보유 포인트는 <em className="tx-blue80">3,000</em>P 이며, 회원탈퇴시 보유 포인트는 소멸됩니다.</span>
                </p>
              </li>
              <li>
                <p>
                  셀프평가 진행 및 수수료 안내
                  <span><i className="ico-dot"></i>고객과 셀프평가 거래가 진행 중입니다. 완료 후 탈퇴가 가능합니다.</span>
                  <span><i className="ico-dot"></i>셀프평가 미정산 수수료는 <em className="tx-blue80">100,000</em>원 이며, 납부 이후 탈퇴처리가 완료됩니다.</span>
                </p>
              </li>
            </ul>
            */}
          </div>

          <Button className="fixed" size="full" background="blue80" title="확인" onClick={onCloseHandler} />
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup}>{fpTerms && <MobTermsView callback={closeFullpagePopup} />}</MobFullpagePopup>
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
            <p className="tx-exp-tp5">&#8251; 고객님의 개인정보 보호를 위해 비밀번호 인증 후 회원탈퇴를 하실 수 있으며, 아래의 안내사항을 확인해주시기 바랍니다.</p>
          </div>
          <div className="withdrawal-ex">
            <p className="mb20">
              <b>1. 30일간 회원가입 불가능</b>
              <br />
              회원탈퇴 후 30일 동안은 회원가입이 불가능합니다.
              <br />
              탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.
            </p>
            <p>
              <b>2. 차량 정보와 이용 중인 서비스 </b>
              <br />
              차량정보와 이용 중인 유료 광고 상품 및 프리미엄 서비스 등 유료서비스 등에 대한 정보와 데이터는 모두 삭제됩니다.
              <br />* 미정산 금액이 있는 경우, 정산 후 탈퇴가 가능합니다.
            </p>
          </div>
          <div className="member-pw-wrap">
            <div className="member-pw">
              <p>아이디</p>
              <p>{userId}</p>
              <label htmlFor="member-pw">비밀번호</label>
              <Input type="password" id="member-pw" width={150} height={40} placeholder="Password" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} height={48} onClick={(e) => handleClick(e)} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow7} type={'fade'} width={375} closedHandler={modalCloseHandler7} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>{msg}</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow6} type={'slideUp'} closedHandler={modalCloseHandler6} title="이용중인 서비스" mode="normal" size="small">
        <div className="con-wrap popup-use-service">
          <p className="service-tit">고객님의 서비스 이용 현황입니다.</p>
          {!isEmpty(service.mycar) && service.mycar === 'Y' && (
            <>
              <p className="name">내차 팔기 신청중</p>
              <div className="cont">
                진행 중인 내차팔기 신청내역이 있습니다.
                <br />
                신청 완료 혹은 취소 이후 탈퇴하실 수 있습니다.
              </div>
            </>
          )}
          {!isEmpty(service.hsvcusage) && service.hsvcusage === 'Y' && (
            <>
              <p className="name">홈서비스 신청중</p>
              <div className="cont">
                진행 중인 홈서비스 신청내역이 있습니다
                <br />
                신청 완료 혹은 취소 이후 탈퇴하실 수 있습니다.
              </div>
            </>
          )}
          {!isEmpty(service.ewprdusage) && service.ewprdusage === 'Y' && (
            <>
              <p className="name">이용중인 싱픔</p>
              <div className="cont">
                고객님께서는 EW상품을 이용하고 계십니다.
                <br />
                EW 보증기간 동안에는 탈퇴하실 수 없습니다.
              </div>
            </>
          )}
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={onCloseHandler} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default leaveMb;
