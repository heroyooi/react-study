import React, { memo, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import PropTypes from 'prop-types';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import AppleLogin from 'react-apple-login';
import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { setMemberType, setMemberSns } from '@src/actions/member/memberAction';
import { axiosGet, frontUrl, apiUrl } from '@src/utils/HttpUtils';
import { postLogin } from '@src/actions/member/loginAction';
import { SystemContext } from '@src/provider/SystemProvider';

import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { accessTokenValidMinute, refreshTokenValidMinute } from '@src/utils/LoginUtils';

const ChoiceMemberType = memo(() => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const isIE = useSelector((state) => state.common.isIE);
  const nClientId = apiUrl === 'https://testautobell.glovis.net' ? 'eV7K8uK23kDzWzRxG35f' : apiUrl === 'http://10.6.58.32' ? 'eefNRm__jfJDOLyUGDO5' : 'RaiI6i_RbnfK9HVXcJ7g';
  const { showAlert } = useContext(SystemContext);

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']); //cookes, removeCookie 삭제 시 오류 남;;;

  const { isLogin, loginReturnCd, id, name, loginType, membertype, accessToken, refreshToken, menuAuthruleCd, mbLiveshotYn, mbAuthCd } = useSelector((state) => ({
    isLogin: state.login.isLogin, //isEmpty(cookies.accessToken) ? state.login.isLogin : true,
    loginReturnCd: state.login.loginReturnCd,
    id: state.login.id,
    name: state.login.name,
    loginType: state.login.type,
    membertype: state.login.membertype,
    accessToken: state.login.accessToken,
    refreshToken: state.login.refreshToken,
    menuAuthruleCd: state.login.menuAuthruleCd,
    mbLiveshotYn: state.login.mbLiveshotYn,
    mbAuthCd: state.login.mbAuthCd
  }));

  const onUrlClick = (e, mbTpcd) => {
    if (mbTpcd !== null) {
      dispatch(setMemberType(mbTpcd));
      Router.push(`/member/memberPolicyAgreement?mbTpcd=${mbTpcd}`);
    }
  };

  const createCookie = useCallback(
    (cookieName, cookieValue, validTime) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + validTime);
      setCookie(cookieName, cookieValue, { path: '/', expires });
      console.log('createCookie > cookieName, cookieValue, expires=', cookieName, cookieValue, expires);
    },
    [setCookie]
  );

  useEffect(() => {
    if (isLogin) {
      console.log('tttttttttttttttttttttttttttttttttt');
      if (!isEmpty(accessToken)) {
        createCookie('accessToken', accessToken, accessTokenValidMinute);
        createCookie('type', loginType, accessTokenValidMinute);
        createCookie('membertype', membertype, accessTokenValidMinute);
        createCookie('id', id, accessTokenValidMinute);
        createCookie('name', name, accessTokenValidMinute);
        createCookie('menuAuthruleCd', menuAuthruleCd, accessTokenValidMinute);
        createCookie('mbLiveshotYn', mbLiveshotYn, accessTokenValidMinute);
        createCookie('mbAuthCd', mbAuthCd, accessTokenValidMinute);
      }
      if (!isEmpty(refreshToken)) {
        createCookie('refreshToken', refreshToken, refreshTokenValidMinute);
      }

      // 회원상태에 따라 정상적으로 로그인후 비밀번호 재설정/ 종사원증유효기간 알림
      if (loginReturnCd === 'MBR5001') {
        // 비밀번호 변경안내
        if (membertype === '0010') {
          // 일반회원
          Router.push('/member/changePassword');
          return;
        } else if (membertype === '0020' || membertype === '0030' || membertype === '0040') {
          alert('일반회원만 가능합니다.');
          return;
        }
      }
      Router.push({ pathname: '/main', query: {} }, '/main');
    } else {
      console.log('_login>useEffect>loginReturnCd=' + loginReturnCd);
    }
  }, [isLogin, loginType]);

  const onNaverCallback = (data) => {
    console.log(data);

    const id = data ? data.id : '';
    checkSns(id, '0010');
    /*
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0010`, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0010'
        };
        dispatch(postLogin(param));
      } else {
        checkSns(id, '0010');
    
        dispatch(setMemberType('0010'));
        Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement').then(() => {
          window.scrollTo(0, 0);
        });
      }
    });*/
  };

  const onLoginKakao = (data) => {
    console.log('onKakao');
    const id = data ? data.profile?.id : '';
    checkSns(id, '0020');
    /*
    const id = data ? data.profile?.id : '';
    checkSns(id, '0020');

    dispatch(setMemberType('0010'));
    Router.push({ pathname: `/member/memberPolicyAgreement`, query: { snsData: id } }, '/member/memberPolicyAgreement');
    */
    /*
    const id = data ? data.profile?.id : '';
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0020`, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0020'
        };
        dispatch(postLogin(param));
      } else {
        checkSns(id, '0020');
        
        dispatch(setMemberType('0010'));
        Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement').then(() => {
          window.scrollTo(0, 0);
        });
      }
    });*/
  };
  const onAppleCallback = (data) => {
    console.log('onApple');
    const id = data ? data.profile?.id : '';
    checkSns(id, '0030');
    // const id = data ? data.profile?.id : '';

    // axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0020`, false, null, false).then((payload) => {
    //   console.log(' selectMbSnsCnt payload :', payload);
    //   if (payload.data.data > 0) {
    //     //console.log(payload.data.data);
    //     //alert(`이미 가입된 SNS 계정입니다.`)
    //     //Router.push("/login");
    //     const param = {
    //       mbSnsId: id,
    //       mbSnsKncd: '0020'
    //     };
    //     dispatch(postLogin(param));
    //   } else {
    //     Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement');
    //   }
    // });
  };

  const checkSns = (snsId, snsKncd) => {
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${snsId}&mbSnsKncd=${snsKncd}`, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`);
        const param = {
          mbSnsId: snsId,
          mbSnsKncd: snsKncd
        };
        dispatch(postLogin(param));
      } else {
        dispatch(setMemberSns({ mbSnsId: String(snsId), mbSnsKncd: snsKncd }));
        showAlert('오토벨에 가입되어 있지 않은 계정입니다.<br/>회원가입 화면으로 이동합니다', () => {
          onUrlClick(null, '0010');
        });
      }
    });

    return;
  };

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원가입',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#f6f7f8'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap member-contents">
          <div className="member-sec-w">
            <h3>가입 유형을 선택해주세요.</h3>
            <p className="ment">만 14세 이상만 가입이 가능합니다.</p>
          </div>

          <div className="choose-wrap">
            <div className="choose-box normal">
              <div className="choose-box-in">
                <h4>일반 회원</h4>
                <p>차량을 사거나 팔려는 회원</p>
                <Button
                  size="full"
                  background="blue80"
                  radius={true}
                  title="회원가입"
                  height={40}
                  nextLink={true}
                  fontSize={14}
                  fontWeight={500}
                  onClick={(e) => onUrlClick(e, '0010')}
                  buttonMarkup={true}
                />
              </div>
              <div className="other-join">
                <h5>다른 계정으로 회원가입</h5>
                <Buttons align="center" marginTop={16}>
                  {isIE === false && (
                    <NaverLogin
                      //clientId="eV7K8uK23kDzWzRxG35f"
                      //callbackUrl="https://testautobell.glovis.net/member/choiceMemberType"
                      //clientId="eefNRm__jfJDOLyUGDO5"
                      //callbackUrl="http://10.6.58.32/member/choiceMemberType"
                      clientId={nClientId}
                      callbackUrl={`${frontUrl}/member/choiceMemberType`}
                      render={(props) => <BtnNaver onClick={props.onClick} />}
                      onSuccess={(naverUser) => onNaverCallback(naverUser)}
                      onFailure={(result) => console.error(result)}
                    />
                  )}
                  {isIE === false && (
                    <KakaoLogin
                      jsKey="4a7be481fb849c9e5bfc5a9c4436ac3b"
                      onSuccess={(result) => onLoginKakao(result)}
                      render={(props) => <BtnKakao onClick={props.onClick} style={{ float: 'right' }} />}
                      getProfile={true}
                    />
                  )}
                  {isIE === false && (
                    <AppleLogin
                      clientId="autobell.glovisaa.glovis"
                      //redirectURI="http://aaa.autobell.com/appleCallback"
                      redirectURI="https://testautobell.glovis.net/appleCallback"
                      responseType={'code'}
                      responseMode={'query'}
                      usePopup={true}
                //      callback={(appUsr) => onAppleCallback(appUsr)}
                      render={(props) => <BtnApple onClick={props.onClick} style={{ float: 'right' }} />}
                    />
                  )}
                </Buttons>
              </div>
            </div>

            <div className="choose-box dealer mt16">
              <div className="choose-box-in">
                <h4>딜러 회원</h4>
                <p>차량 매매업을 하시는 사업자 회원</p>
                <Button
                  size="full"
                  background="blue80"
                  radius={true}
                  title="회원가입"
                  height={40}
                  nextLink={true}
                  fontSize={14}
                  fontWeight={500}
                  onClick={(e) => onUrlClick(e, '0020')}
                  buttonMarkup={true}
                />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap member-contents">
          <div className="member-tit-area">
            <h3>회원가입</h3>
            <p>
              가입 유형을 선택해주세요.
              <br />만 14세 이상만 가입이 가능합니다.
            </p>
          </div>

          <div className="choose-wrap">
            <div className="choose-box normal">
              <h4>일반 회원</h4>
              <p>차량을 사거나 팔려는 회원</p>
              <Button size="big" background="blue80" title="회원가입" width={160} onClick={(e) => onUrlClick(e, '0010')} buttonMarkup={true} />
              {isIE === false && (
                <div className="other-join">
                  <h5>다른 계정으로 회원가입</h5>
                  <Buttons marginTop={31}>
                    <NaverLogin
                      //  clientId="eV7K8uK23kDzWzRxG35f"
                      //  callbackUrl="https://testautobell.glovis.net/member/choiceMemberType"
                      clientId={nClientId}
                      callbackUrl={`${frontUrl}/member/choiceMemberType`}
                      render={(props) => <BtnNaver onClick={props.onClick} style={{ float: 'left' }} />}
                      onSuccess={(naverUser) => onNaverCallback(naverUser)}
                      onFailure={(result) => console.error(result)}
                    />
                    <KakaoLogin
                      jsKey="4a7be481fb849c9e5bfc5a9c4436ac3b"
                      onSuccess={(result) => onLoginKakao(result)}
                      render={(props) => <BtnKakao onClick={props.onClick} style={{ float: 'right' }} />}
                      getProfile={true}
                    />
                    <AppleLogin
                      clientId="autobell.glovisaa.glovis"
                      //redirectURI="http://aaa.autobell.com/appleCallback"
                      redirectURI="https://testautobell.glovis.net/appleCallback"
                      responseType={'code'}
                      responseMode={'query'}
                      usePopup={true}
                      callback={(appUsr) => onAppleCallback(appUsr)}
                      render={(props) => <BtnApple onClick={props.onClick} style={{ float: 'right' }} />}
                    />
                  </Buttons>
                </div>
              )}
            </div>
            <div className="choose-box dealer">
              <h4>딜러 회원</h4>
              <p>차량 매매업을 하시는 사업자 회원</p>
              <Button size="big" background="blue80" title="회원가입" width={160} onClick={(e) => onUrlClick(e, '0020')} buttonMarkup={true} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
});

ChoiceMemberType.propTypes = {
  onClick: PropTypes.func
};
ChoiceMemberType.displayName = 'ChoiceMemberType';
export default ChoiceMemberType;
