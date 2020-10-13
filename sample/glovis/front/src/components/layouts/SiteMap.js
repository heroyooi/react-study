import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { produce } from 'immer';
import { useCookies } from 'react-cookie';
import { isEmpty, isUndefined } from 'lodash';
import Cookies from 'js-cookie';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea.js';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { createValidator } from '@lib/share/validator';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import partnerQuestSchema from '@lib/share/validator/main/partnerQuest';
import { SystemContext } from '@src/provider/SystemProvider';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@src/actions/types';
import { insertPartnerQuest } from '@src/actions/main/mainAction';
import { postLogout } from '@src/actions/member/loginAction';
import { getMyPageUrl, getDomainUrl, getAppDownloadUrl } from '@src/utils/SitemapUtil';
import { getMemberPhoto, isLogin, isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { SET_PC_PARTNER_REQUEST_POPUP } from '@src/actions/main/mainTypes';
import { imgUrl } from '@src/utils/HttpUtils';
import { preventScroll } from '@src/utils/CommonUtil';
import SiteMapItem from './SiteMapItem';
import { CommonContext } from './TopWrapper';
// import React, { memo, useState, useCallback, useEffect, useContext } from 'react';

const SiteMap = memo(({ active, menuTreeData }) => {
  const dispatch = useDispatch();
  const { hasMobile } = useSelector((state) => state.common);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  const { siteMapActive, setSiteMapActive, headerFix } = useContext(CommonContext);
  const handleMenuClose = useCallback(() => {
    setSiteMapActive(false);
    if (hasMobile) preventScroll(false);
  }, [hasMobile, setSiteMapActive]);
  const [siteMapRealActive, setSiteMapRealActive] = useState(false);
  const siteMapClass = classNames({ active: siteMapRealActive }, { fixed: headerFix });
  const gnbMenu = menuTreeData;
  const [isLoginScreen, setIsLoginScreen] = useState(); // 화면단 사용
  const [isPersonal, setIsPersonal] = useState(false); // 일반회원여부
  // let isPersonal = false; // 일반회원여부

  const mobileLogin = useSelector((state) => state.login.isLogin);
  const [cookieMemberType, setCookieMemberType] = useState('');
  const [mbTpcdNm, setMbTpcdNm] = useState('');
  useEffect(() => {
    let sTimeout = null;
    sTimeout = setTimeout(() => {
      setSiteMapRealActive(true);
    }, 10);
    return () => {
      clearTimeout(sTimeout);
    };
  }, [siteMapActive]);

  const { isLoginPC, membertype, loginReturnCheckCd } = useSelector((state) => ({
    membertype: state.login.membertype,
    loginReturnCheckCd: state.login.loginReturnCd,
    // isLoginPC: isEmpty(cookies.accessToken) ? state.login.isLogin : true //state.login.isLogin
    isLoginPC: state.login.isLogine //state.login.isLogin
  }));

  // console.log('sitema[', isLoginPC, membertype, loginReturnCheckCd);
  // console.log('isLoginPC >>>> ' + isLoginPC);

  // console.log('useEffect>SiteMap [menuTreeData]=%o', menuTreeData);
  // console.log('useEffect>SiteMap [gnbMenu]=%o', gnbMenu);
  const validator = createValidator(partnerQuestSchema);
  // const [storePopupShow, setStorePopupShow, openStorePopup, closeStorePopup] = useRodal(false, true);
  const [isCertify, setIsCertify] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const isPartnerQuestInsert = useSelector((state) => state.main.isPartnerQuestInsert);
  const { showAlert, showConfirm, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [memberInfo, setMemberInfo] = useState({});
  const [isEvaluator, setEvaluator] = useState(false); // 화면단 사용
  //제휴문의 팝업 오픈
  const openStorePopup = useCallback((e) => {
    e && typeof e.preventDefault === 'function' && e.preventDefault();
    dispatch({
      type: SET_PC_PARTNER_REQUEST_POPUP,
      data: { isPopup: true }
    });
  }, []);

  //제휴문의 팝업 닫기
  const closeStorePopup = useCallback((flag) => {
    dispatch({
      type: SET_PC_PARTNER_REQUEST_POPUP,
      data: { isPopup: false }
    });
  }, []);

  const [inputs, setInputs] = useState({
    cmpyNm: '',
    mngrNm: '',
    telNo: '',
    telNo1: '',
    telNo2: '',
    telNo3: '',
    emlAddr: '',
    emlAddr1: '',
    emlAddr2: '',
    ttl: '',
    quesCntn: ''
  });

  const { cmpyNm, mngrNm, telNo, telNo1, telNo2, telNo3, emlAddr, emlAddr1, emlAddr2, ttl, quesCntn } = inputs;

  const handleLogOut = useCallback(
    (e) => {
      e.preventDefault();
      console.log('logout');
      removeCookie('accessTokenSession');
      removeCookie('accessToken');
      removeCookie('id');
      removeCookie('name');
      removeCookie('type');
      removeCookie('membertype');
      removeCookie('refreshToken');
      removeCookie('menuAuthruleCd');
      removeCookie('mbLiveshotYn');
      removeCookie('mbAuthCd');
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(postLogout());
      //Router.push(getDomainUrl('login'));
      setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLoginPC : true);
      window.location.href = '/login';
    },
    [dispatch, removeCookie]
  );

  const handleLogIn = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: LOGIN_SUCCESS });
      //Router.push(getDomainUrl('login'));
      window.location.href = '/login';
    },
    [dispatch]
  );

  const handleJoin = useCallback((e) => {
    e.preventDefault();
    Router.push(getDomainUrl('memberJoin'));
  }, []);

  const handleMoveMyPage = useCallback(
    (e) => {
      e.preventDefault();
      Router.push(getMyPageUrl(membertype, hasMobile));
    },
    [membertype]
  );

  const handleMovePricing = useCallback((e) => {
    e.preventDefault();
    Router.push(getDomainUrl('pricingSystem'));
  }, []);

  const handleLiveShotAssign = useCallback((e) => {
    e.preventDefault();
    Router.push(getDomainUrl('liveShotAssign'));
  }, []);

  const handleMoveHome = useCallback((e) => {
    e.preventDefault();
    Router.push(getDomainUrl('home'));
  }, []);

  const handleImgOnError = useCallback((e) => {
    e.target.src = '/images/mobile/dummy/chat-img.png';
  }, []);

  const handleCertify = useCallback(
    (e) => {
      e.preventDefault();
      console.log('보내기(handleCertify) inputs=%o', inputs);

      const valid = validator.validate(inputs);
      const { error } = valid;
      console.log('onPostInsert -> valid : ', valid);

      if (error) {
        showAlert(error?.details[0]?.message ?? '에러가 발생했습니다');
      } else {
        setIsCertify(true);
        dispatch(insertPartnerQuest(inputs));
      }
    },
    [dispatch, inputs, showAlert, validator]
  );

  //텍스트값 변경시
  const onChangeText = useCallback(
    (e, target) => {
      e.preventDefault();
      const value = e.target.value;

      setInputs(
        produce((draft) => {
          draft[target] = value;
        })
      );
      console.log('onChangeText target = %s, value = %s , inputs = %o ', target, value, inputs);
    },
    [inputs]
  );

  // useEffect(() => {
  //   console.log('useEffect>storePopupShow=%', storePopupShow);
  //   if (!storePopupShow) {
  //     setInputs({
  //       cmpyNm: '',
  //       mngrNm: '',
  //       telNo: '',
  //       telNo1: '',
  //       telNo2: '',
  //       telNo3: '',
  //       emlAddr: '',
  //       emlAddr1: '',
  //       emlAddr2: '',
  //       ttl: '',
  //       quesCntn: ''
  //     });
  //   }
  // }, [storePopupShow]);

  useEffect(() => {
    if (isLoginLiveCheck()) {
      getMemberPhoto(gInfoLive().id).then((url) => {
        const member = Object.assign({ ...gInfoLive() }, { photoUrl: url || '', isLoginPC: isLoginLiveCheck(), appUrl: getAppDownloadUrl() });
        setMemberInfo(member);
      });
    }
    setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLoginLiveCheck() : true);

    setIsPersonal(Cookies.get('membertype') === '0010' ? true : false);
    setEvaluator(Cookies.get('membertype') === '0110' ? true : false);
    console.log('SiteMap> isPersonal=%o', isPersonal);
  }, []);

  // 앱, 웹 브라우저에 따른 버튼 출력 여부 확인 객체
  const [appCheck, setAppCheck] = useState(false);

  useEffect(() => {
    console.log('앱설치여부 확인중');
    console.log(window.navigator.userAgent);
    const MobUA = window.navigator.userAgent;
    // 앱일경우
    if (MobUA.includes('AUTOBELL_Android') || MobUA.includes('AUTOBELL_iOS')) {
      setAppCheck(false);
    } else {
      setAppCheck(true);
    }
    console.log('Cookies membertype=%o', Cookies.get('membertype'));
    setCookieMemberType(Cookies.get('membertype'));
    setMbTpcdNm(Cookies.get('membertype') === '0020' ? '딜러' : Cookies.get('membertype') === '0030' ? '단체' : Cookies.get('membertype') === '0040' ? '제휴' : '');
  }, []);

  if (hasMobile) {
    return (
      <section id="m-site-map" className={siteMapClass}>
        <div className="inner">
          <div className="float-wrap">
            <span className="ico-wrap">
              <span className="b-home" onClick={handleMoveHome}>
                Home
              </span>
              {/* <i className="ico-home" onClick={handleMoveHome} /> */}
            </span>
            <button onClick={handleMenuClose} className="btn-close">
              닫기
            </button>
          </div>
          {console.log('SiteMap>isLoginScreen=%o', isLoginScreen)}
          {/* {memberInfo?.isLoginPC !== true ? ( */}
          {isLoginScreen === false ? (
            <div className="profile-wrap">
              <p className="tx-login">로그인해주세요.</p>
              <Buttons align="center" marginTop={40}>
                <Button size="sml" background="blue20" color="blue80" radius={true} title="로그인" measure="%" width={49} height={30} fontWeight={500} onClick={handleLogIn} />
                <Button
                  size="sml"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="회원가입"
                  measure="%"
                  width={49}
                  height={30}
                  mgMeasure="%"
                  marginLeft={2}
                  fontWeight={500}
                  onClick={handleJoin}
                />
              </Buttons>
            </div>
          ) : (
            <>
              {isPersonal ? (
                <div className="profile-wrap">
                  {/* 일반 회원 */}
                  <div className="img-cover">
                    <img src={imgUrl + memberInfo?.photoUrl} onError={handleImgOnError} alt="회원 이미지" />
                  </div>
                  <p className="u-name personal">
                    <span>일반</span>
                    {memberInfo?.name}
                  </p>
                  <Buttons align="center" marginTop={24}>
                    {isEvaluator ? (
                      ''
                    ) : (
                      <Button size="sml" background="blue20" color="blue80" radius={true} title="마이페이지" measure="%" width={49} height={30} fontWeight={500} onClick={handleMoveMyPage} />
                    )}
                    <Button
                      size="sml"
                      background="blue20"
                      color="blue80"
                      radius={true}
                      title="로그아웃"
                      measure="%"
                      width={49}
                      height={30}
                      mgMeasure="%"
                      marginLeft={2}
                      fontWeight={500}
                      onClick={handleLogOut}
                    />
                  </Buttons>
                </div>
              ) : (
                /* 딜러 회원 */
                <div className="profile-wrap">
                  <div className="img-cover">
                    <img src={imgUrl + memberInfo?.photoUrl} onError={handleImgOnError} data-img-url={imgUrl + memberInfo?.photoUrl} alt="딜러 이미지" />
                  </div>
                  <p className="u-name dealer">
                    <span>{mbTpcdNm}</span>
                    {memberInfo?.name}
                  </p>
                  <Buttons align="center" marginTop={24}>
                    {isEvaluator ? (
                      ''
                    ) : (
                      <Button size="sml" background="blue20" color="blue80" radius={true} title="마이페이지" measure="%" width={49} height={30} fontWeight={500} onClick={handleMoveMyPage} />
                    )}
                    <Button
                      size="sml"
                      background="blue20"
                      color="blue80"
                      radius={true}
                      title="로그아웃"
                      measure="%"
                      width={49}
                      height={30}
                      mgMeasure="%"
                      marginLeft={2}
                      fontWeight={500}
                      onClick={handleLogOut}
                    />
                  </Buttons>
                  {isEvaluator ? (
                    ''
                  ) : (
                    <>
                      <Button
                        size="full"
                        background="blue80"
                        radius={true}
                        title="프라이싱"
                        measure="%"
                        width={100}
                        height={30}
                        fontSize={12}
                        fontWeight={500}
                        marginTop={8}
                        onClick={handleMovePricing}
                      />
                      <Button
                        size="full"
                        background="blue80"
                        radius={true}
                        title="Live Shot 배정"
                        measure="%"
                        width={100}
                        height={30}
                        fontSize={12}
                        fontWeight={500}
                        marginTop={8}
                        onClick={handleLiveShotAssign}
                      />
                    </>
                  )}
                </div>
              )}
            </>
          )}

          <ul className="m-toggle-list">
            {(gnbMenu || [])
              .filter((x) => x.menuYn === 'Y')
              .map((item, idx) => {
                return (
                  <MenuItem
                    key={idx}
                    fragment={item.children && item.children.length > 0 ? false : true}
                    className={item.title === '내차사기' || item.title === '내차팔기' || item.title === '시세조회' ? 'major' : null}
                  >
                    <MenuTitle tagName={'span'}>
                      {item.children && item.children.length > 0 ? (
                        item.title
                      ) : (
                        <Link href={item.tranSrc}>
                          <a>{item.title}</a>
                        </Link>
                      )}
                    </MenuTitle>
                    {item.children && item.children.length > 0 && (
                      <MenuCont>
                        <ul>
                          {(item.children || [])
                            .filter((x) => x.menuYn === 'Y')
                            .map((subItem, subIdx) => {
                              return (
                                <li key={subIdx}>
                                  <Link href={subItem.tranSrc}>
                                    <a>{subItem.title}</a>
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </MenuCont>
                    )}
                  </MenuItem>
                );
              })}
          </ul>
        </div>
        {appCheck && (
          <Button
            className="fixed"
            size="full"
            background="blue80"
            title="오토벨앱 다운로드"
            height={50}
            fontSize={14}
            fontWeight={500}
            iconType="autobell"
            iconReverse={true}
            href={memberInfo?.appUrl}
          />
        )}
      </section>
    );
  }

  return (
    <section id="site-map" className={siteMapClass}>
      <h2 className="away">사이트 전체메뉴</h2>
      <div className="inner">
        <div className="main_menu">
          <h3 className="away">주요메뉴</h3>
          <ul>{typeof gnbMenu !== 'undefined' && gnbMenu.map((item, index) => (item.menuYn === 'Y' ? <SiteMapItem key={index} title={item.title} sub={item.children} link={item.tranSrc} /> : ''))}</ul>
        </div>
        <div className="member_menu">
          <h3 className="away">회원메뉴</h3>
          <ul>
            {isLoginScreen === true ? (
              <>
                <li>
                  <a href="#" onClick={handleLogOut}>
                    로그아웃
                  </a>
                </li>
                {isEvaluator ? (
                  ''
                ) : (
                  <li>
                    <Link href={getMyPageUrl(membertype, hasMobile)}>
                      <a>마이페이지</a>
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link href={getDomainUrl('memberJoin')}>
                    <a>회원가입</a>
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={handleLogIn}>
                    로그인
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="etc_menu">
          <h3 className="away">기타메뉴</h3>
          <ul>
            <li>
              <Link href="#">
                <a href="https://www.glovis.net/Kor/company/contentsid/228/index.do" target="_blank" rel="noopener noreferrer">
                  회사소개
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a onClick={(e) => openStorePopup(e, 'fade')}>제휴문의</a>
              </Link>
              {/* <RodalPopup show={storePopupShow} type={'fade'} closedHandler={closeStorePopup} mode="normal" title="제휴문의" size="medium">
                <div className="popup-inquire">
                  <div className="inquire-wrap">
                    {isCertify === false && (
                      <>
                        <p className="tx-tit">
                          제휴문의에 관하여 궁금한 사항을 보내주시면
                          <br />
                          담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.
                        </p>
                        <form>
                          <fieldset>
                            <legend className="away">인증몰 입점문의</legend>
                            <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                              <caption className="away">인증몰 입점문의</caption>
                              <colgroup>
                                <col width="20%" />
                                <col width="80%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>
                                    <label htmlFor="q-agency-name">회사명</label>
                                  </th>
                                  <td>
                                    <Input type="text" name="cmpyNm" value={cmpyNm} maxLength={50} id="q-agency-name" onBlur={(e) => onChangeText(e, 'cmpyNm')} />
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <label htmlFor="q-user-name">담당자 성함</label>
                                  </th>
                                  <td>
                                    <Input type="text" name="mngrNm" value={mngrNm} maxLength={50} id="q-user-name" onBlur={(e) => onChangeText(e, 'mngrNm')} />
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <label htmlFor="q-user-phone">전화번호</label>
                                  </th>
                                  <td>
                                    <span className="bridge">
                                      <Input type="text" name="telNo1" value={telNo1} maxLength={4} id="q-user-phone" width={119} onBlur={(e) => onChangeText(e, 'telNo1')} />
                                    </span>
                                    <span className="bridge">
                                      <Input type="text" name="telNo2" value={telNo2} maxLength={4} id="q-user-phone2" width={119} onBlur={(e) => onChangeText(e, 'telNo2')} />
                                    </span>
                                    <Input type="text" name="telNo3" value={telNo3} maxLength={4} id="q-user-phone3" width={108} onBlur={(e) => onChangeText(e, 'telNo3')} />
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <label htmlFor="q-email_sitemap">이메일 주소</label>
                                  </th>
                                  <td>
                                    <span className="bridge2">
                                      <Input type="text" name="emlAddr1" value={emlAddr1} maxLength={50} id="q-email_sitemap" onBlur={(e) => onChangeText(e, 'emlAddr1')} width={168} />
                                      <em className="mg8">@</em>
                                      <Input type="text" name="emlAddr2" value={emlAddr2} maxLength={50} id="q-email2_sitemap" onBlur={(e) => onChangeText(e, 'emlAddr2')} width={169} />
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>제목</th>
                                  <td>
                                    <Input type="text" name="ttl" value={ttl} maxLength={50} id="q-title2_sitemap" onBlur={(e) => onChangeText(e, 'ttl')} />
                                  </td>
                                </tr>
                                <tr>
                                  <th>문의내용</th>
                                  <td>
                                    <Textarea name="quesCntn" data={quesCntn} maxLength={200} countLimit={400} type="tp1" height={218} onBlur={(e) => onChangeText(e, 'quesCntn')} />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </fieldset>
                        </form>
                        <Buttons align="center" marginTop={20} className="w-line">
                          <Button size="big" background="gray" title="취소" width={180} height={60} />
                          <Button size="big" background="blue80" title="보내기" width={180} height={60} onClick={(e) => handleCertify(e)} />
                        </Buttons>
                      </>
                    )}
                    {isCertify === true && (
                      <>
                        <div className="co-wrap">
                          <p>
                            <span className="ico-wrap">
                              <i className="ico-document" />
                            </span>
                            제휴문의가
                            <br />
                            접수되었습니다.
                          </p>
                        </div>
                        <p className="tx-sub">* 빠른 시일안에 담당자가 연락드리겠습니다.</p>
                        <Buttons align="center" marginTop={40} className="w-line">
                          <Button size="big" background="blue80" title="확인" width={180} height={60} />
                        </Buttons>
                      </>
                    )}
                  </div>
                </div>
              </RodalPopup> */}
            </li>
            <li>
              <Link href="/common/policy?tmsTp=0100">
                <a>이용약관</a>
              </Link>
            </li>
            <li>
              <Link href="/common/policy?tmsTp=0800">
                <a>개인정보처리방침</a>
              </Link>
            </li>
          </ul>
        </div>
        <button type="button" className="btn-close" onClick={handleMenuClose}>
          <img src="/images/contents/btn-qm-close.png" alt="닫기" />
        </button>
      </div>
    </section>
  );
});

SiteMap.propTypes = {
  active: PropTypes.bool,
  menuTreeData: PropTypes.any
};
SiteMap.displayName = 'SiteMap';
export default SiteMap;
