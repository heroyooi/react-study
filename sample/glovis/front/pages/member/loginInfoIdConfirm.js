/**
 * 모바일 전용 아이디 찾기후 확인 페이지
 * @author 김지현
 */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from "@src/components/common/MobFullpagePopup";
import MobLogin from "@src/components/common/MobLogin";
import Button from '@lib/share/items/Button';
import {withRouter} from 'next/router';
import { isEmpty } from 'lodash';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const loginInfoIdConfirm = (data) => {

  const response = JSON.parse(data.router.query.memInfo);
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector(state => state.common.mFullpagePopup);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '아이디 찾기',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 84,
        color: '#f6f7f8'
      }
    });
    const [fpLogin, setFpLogin] = useState(false);
    const handleFullpagePopup = useCallback((name) => (e) => {
        e.preventDefault();
        if (name === "login") {
          dispatch({
              type: MOBILE_FULLPAGE_POPUP,
              data: {
                isPopup: true,
                title: "로그인",
                options: ["close"]
              }
          });
          setFpLogin(true);
        }
    }, []);
    const handleFpLoginClose = useCallback(
      e => {
        //e.preventDefault();
        setFpLogin(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      },
      [setFpLogin]
    );
    return (
      <AppLayout>
        <div className="content-wrap login-contents pd20">
          <div className="login-wrap">
            <div className="ico-tx-wrap v-2">
            {!isEmpty(response) ?
              <>
                  <p>회원님의 정보와 일치하는 아이디입니다.</p>
                  <dl className="mt16">
                    <dt>· 이름</dt>
                    <dd>{response[0].mbnm}</dd>
                  </dl>
                  <dl>
                    <dt>· 아이디</dt>
                    <dd>
                        {response.map((board, index) => {
                          return (
                          <span key={index}>
                            <em>[{board.mbtpnm}]</em> {board.mbid}
                          </span>
                          );})
                          }
                    </dd>
                  </dl>
                  <Button size="full" background="blue20" color="blue80" radius={true} title="비밀번호찾기" height={40} fontWeight={500} marginTop={22} href="loginInfoPassword" nextLink={true} />
              </>
              : 
              <p>회원님의 정보와 일치하는 아이디가 존재하지 않습니다.</p> }
            </div>
            {/* <Button className="fixed" size="full" background="blue80" title="로그인" href="login" nextLink={true} /> */}
            <Button className="fixed" size="full" background="blue80" title="로그인" onClick={handleFullpagePopup("login")} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin
                  mode="popup"
                  errorPw={false}
                  noMemArea={false}
                  callback={handleFpLoginClose}
                />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return <AppLayout>모바일 전용 페이지입니다.</AppLayout>;
};

export default withRouter(loginInfoIdConfirm);