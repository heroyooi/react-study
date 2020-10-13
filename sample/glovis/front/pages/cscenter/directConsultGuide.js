/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';
import AppLayout from '@src/components/layouts/AppLayout';
import LoginPopup from '@src/components/common/popup/LoginPop';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobLogin from '@src/components/common/MobLogin';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const directConsultGuide = () => {
  const dispatch = useDispatch();

  const tabLink = [
    { index: 0, url: '/cscenter/noticeList' },
    { index: 1, url: '/cscenter/directConsultGuide' },
    { index: 2, url: '/cscenter/faq' }
  ];

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [fpLogin, setFpLogin] = useState(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);

  const onLoginClick = (e) => {
    e.preventDefault();

    const userId = Cookies.get('id');
    if (typeof userId === 'undefined' || userId.length === 0) {
      if (hasMobile) {
        handleFullpagePopup('login')(e);
      } else {
        rodalPopupHandler1(e, 'fade');
      }
    } else {
      Router.push('/cscenter/directConsult');
    }
  };

  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (name === 'login') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '로그인',
            options: ['close']
          }
        });
        setFpLogin(true);
      }
    },
    []
  );

  const handleFpLoginClose = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setFpLogin(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: SECTION_CUSTOMER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '1:1 상담',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#f6f7f8'
        }
      });
    }
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-sec f-h2">
          <div className="help-inquiry-wrap pd20">
            <div className="inquiry-cont bg-white tx-c">
              <div className="ico-wrap">
                <i className="ico-inquiry" />
              </div>
              <div className="tit">
                <h4>궁금한 점이나, 불편한 점이 있으신가요?</h4>
                <p>
                  오토벨 서비스 이용중, 궁금하시거나
                  <br />
                  불편한 사항을 1:1 문의로 남겨주세요.
                </p>
              </div>
              <div className="center-wrap">
                {/*고객센터 버튼 click 시 전화 자동 연결기능 요청*/}
                <Button size="mid" background="blue80" radius={true} title="오토벨 고객센터 1600-0080" width={198} height={40} href={'tel:1600-0080'} />
                <ul>
                  <li>평일 08:00~18:00</li>
                  <li>주말/공휴일 OFF</li>
                </ul>
              </div>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="1:1 문의하기" onClick={onLoginClick} />
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin errorPw={false} url={'/cscenter/directConsult'} callback={handleFpLoginClose} />
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
        <div className="content-wrap help-inquiry-wrap">
          <h3>고객센터</h3>

          <TabMenu type="type1" defaultTab={1} tabLink={tabLink}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0} />
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}>
              <div className="tit">
                <h4>궁금한 점이나, 불편한 점이 있으신가요?</h4>
                <p>오토벨 서비스 이용중, 궁금하시거나 불편한 사항을 1:1 문의로 남겨주세요.</p>
              </div>
              <div className="ico-wrap">
                <i className="ico-inquiry" />
              </div>
              <div className="center-wrap">
                <p>
                  오토벨 고객센터<span className="num">1600-0080</span>
                </p>
                <ul>
                  <li>평일 08:00~18:00</li>
                  <li>주말/공휴일 OFF</li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2} />
          </TabMenu>
          <Buttons align="center">
            <Button size="big" background="blue80" title="1:1 문의하기" width={180} height={60} onClick={onLoginClick} buttonMarkup={true} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
        <LoginPopup url={'/cscenter/directConsult'} type={'guide'} />
      </RodalPopup>
    </AppLayout>
  );
};

export default directConsultGuide;
