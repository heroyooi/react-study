import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobLogin from '@src/components/common/MobLogin';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import AppLayout from '@src/components/layouts/AppLayout';
import LoginPopup from '@src/components/common/popup/LoginPop';

import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { preventScroll } from '@src/utils/CommonUtil';
const globalThis = require('globalthis')();

const AuctionGate = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_AUTO_AUCTION });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '',
          options: ['back', 'gnb', 'transparent', 't-black']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [loginPopup, setLoginPopup, openLoginPopup, closeLoginPopup] = useRodal(false);
  const { showAlert, initAlert } = useContext(SystemContext);

  const [fpLogin, setFpLogin] = useState(!isLoginLiveCheck());
  const handleRouter = (href) => (e) => {
    e.preventDefault();
    if (href.includes('Aggrement')) {
      if (isLoginLiveCheck()) {
        if (gInfoLive().type !== 'member') {
          showAlert('스마트옥션 출품 서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
            // Router.push('/login').then(() => {
            //   window.scrollTo(0, 0);
            // });
            globalThis.window.location.href = '/login'
          });
        }
        Router.push(href);
      } else {
        if (hasMobile) {
          handleFullpagePopup(e);
        } else {
          setLoginPopup(true);
        }
      }
    } else {
      Router.push(href);
    }
    //Router.push(href);
  };
  const handleFullpagePopup = useCallback((e) => {
    e.preventDefault();
    setFpLogin(true);
    dispatch({
      type: MOBILE_FULLPAGE_POPUP,
      data: {
        isPopup: true,
        title: '로그인',
        options: ['close']
      }
    });
  });
  const handleFpLoginClose = useCallback(
    (e) => {
      e?.preventDefault(); // MobLogin에서 useEffect로부터 호출되면 event 객체가 없음
      setFpLogin(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      if (isLoginLiveCheck()) {
        Router.push('/autoAuction/autoAuctionPolicyAggrement');
      }
    },
    [setFpLogin]
  );

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-sec auction-wrap">
          <div className="content-wrap member-contents">
            <div className="member-tit-area auction">
              <h4>
                <img src="/images/common/autobell-logo.png" alt="오토벨 로고" />
                <span className="option-wrap">
                  <em className="option-tp bg-indigo70">스마트</em>
                  <em className="option-tp bg-indigo40">옥션</em>
                </span>
              </h4>
            </div>
            <div className="member-co-wrap auction">
              <p className="ment">
                현대 글로비스의 <span>스마트한</span> 경매서비스를 경험해보세요
              </p>
              <ul>
                <li>
                  <span>경쟁 할수록 내차의 가격이 상승한다</span>
                  <p>내차 출품하기</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/autoAuctionPolicyAggrement')}>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>언제 어디서나 실시간 경매참여</span>
                  <p>온라인경매 참여</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>경매를 이용하는 입문자를 위한 안내서</span>
                  <p>이용안내 보기</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/auctionInfo?seq=3')}>바로가기</a>
                  </Link>
                </li>
              </ul>
            </div>
            <Button className="fixed" size="full" background="blue80" title="메인으로" onClick={handleRouter('/autoAuction/autoAuctionMain')} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin mode="popup" errorPw={false} noMemArea={false} callback={handleFpLoginClose} url="/autoAuction/autoAuctionPolicyAggrement" />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>
                <img src="/images/common/autobell-logo-big.png" alt="오토벨 로고" />
                <span className="option-wrap">
                  <em className="option-tp bg-indigo70">스마트</em>
                  <em className="option-tp bg-indigo40">옥션</em>
                </span>
              </h4>
            </div>
            <div className="member-co-wrap auction">
              <p className="ment">
                현대 글로비스의 <span>스마트한</span> 경매서비스를 경험해보세요
              </p>
              <ul>
                <li>
                  <span>
                    경쟁 할수록
                    <br />
                    내차의 가격이 상승한다
                  </span>
                  <p>내차 출품하기</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/autoAuctionPolicyAggrement')}>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>
                    언제 어디서나
                    <br />
                    실시간 경매참여
                  </span>
                  <p>온라인경매 참여</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>
                    경매를 이용하는
                    <br />
                    입문자를 위한 안내서
                  </span>
                  <p>이용안내 보기</p>
                  <Link href="#">
                    <a onClick={handleRouter('/autoAuction/auctionInfo?seq=3')}>바로가기</a>
                  </Link>
                </li>
              </ul>
            </div>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="메인으로" width={180} height={60} onClick={handleRouter('/autoAuction/autoAuctionMain')} />
            </Buttons>
          </div>
        </div>
        <RodalPopup show={loginPopup} type={'slideUp'} closedHandler={closeLoginPopup} title="로그인" mode="normal" size="small">
          <LoginPopup url={`/autoAuction/autoAuctionPolicyAggrement`} />
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

export default AuctionGate;
