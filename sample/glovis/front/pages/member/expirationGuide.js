/**
 * 설명 : 종사원증 유효기간 정보 제공 및 변경가능 제공
 * @fileoverview 종사원증 만료 안내
 * @requires [memberAction, memberReducer]
 * @author 김지현
 */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';

import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Link from 'next/link';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

import { getEnEprInfo, updatePwdNext } from '@src/actions/member/memberAction';
import { gInfoLive } from '@src/utils/LoginUtils';

/**
 * 설명 : 종사원증 유효기간 정보 제공
 * @param {}
 * @returns {}
 */
const ExpirationGuide = () => {
  console.log(gInfoLive().id);
  const userId = gInfoLive().id;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const myMbInfo = useSelector((state) => state.member.myMbInfoData);

  console.log('myMbInfo:', myMbInfo);

  useEffect(() => {
    if (isEmpty(myMbInfo)) {
      dispatch(getEnEprInfo(userId));
    }
  }, [myMbInfo]);

  const handleChkPwdNext = useCallback((e) => {
    e.preventDefault();
    const paramObj = {
      mbId: userId
    };

    dispatch(updatePwdNext(paramObj));
    Router.push('/main');
  });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '종사원증 정보',
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
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          {myMbInfo.mbEnEprDday > -1 ? (
            <>
              <div className="login-tit-area v-3">
                <span className="ico-wrap">
                  <i className="ico-date" />
                </span>
                <h4>
                  고객님의 <span>종사원증 유효기간</span>이 곧 <span>만료</span>됩니다.
                </h4>
                <p>
                  고객님의 종사원증 번호가 곧 만료예정입니다.
                  <br />
                  <span>만료 시, 광고 중인 차량의 게시가 중단됩니다.</span>
                  <br />
                  원활한 서비스 이용을 위하여
                  <br />
                  종사원증 정보를 업데이트해주세요.
                </p>
              </div>

              <div className="ico-tx-wrap">
                <dl>
                  <dt>· 이름</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbNm}</dd>
                </dl>
                <dl>
                  <dt>· 아이디</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbId}</dd>
                </dl>
                <dl>
                  <dt>· 종사원증번호</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbEn}</dd>
                </dl>
                <dl>
                  <dt>· 유효기간</dt>
                  <dd>
                    {isEmpty(myMbInfo) ? '' : myMbInfo.enVldStrtDt} ~ {isEmpty(myMbInfo) ? '' : myMbInfo.mbEnEprYmd}
                  </dd>
                </dl>
              </div>
            </>
          ) : (
            <>
              <div className="login-tit-area v-3">
                <span className="ico-wrap">
                  <i className="ico-date" />
                </span>
                <h4>
                  고객님의 <span>종사원증 유효기간</span>이 <span>만료</span>되었습니다.
                </h4>
                <p>
                  고객님의 종사원증 유효기간이 만료되었습니다.
                  <br />
                  <span>광고 중인 차량의 게시가 중단됩니다.</span>
                  <br />
                  원활한 서비스 이용을 위하여
                  <br />
                  종사원증 정보를 업데이트해주세요.
                </p>
              </div>
            </>
          )}

          <MobBottomArea isFix={true} isSimple={true}>
            <Buttons align="center" className="full">
              {myMbInfo.mbEnEprDday > -1 && <Button size="big" background="blue20" color="blue80" title="다음에 변경하기" height={56} onClick={handleChkPwdNext} nextLink={true} />}
              <Button size="big" background="blue80" title="변경하기" height={56} href="/mypage/dealer/info/changeMember" />
            </Buttons>
          </MobBottomArea>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          {myMbInfo.mbEnEprDday > -1 ? (
            <>
              <div className="login-tit-area">
                <h4>
                  고객님의 <span>종사원증 유효기간</span>이 곧 <span>만료</span>됩니다.
                </h4>
              </div>

              <div className="ico-tx-wrap">
                <span className="ico-wrap">
                  <i className="ico-date" />
                </span>
                <p>
                  고객님의 종사원증 번호가 곧 만료예정입니다.
                  <br />
                  <span>만료 시, 광고 중인 차량의 게시가 중단됩니다.</span>
                  <br />
                  원활한 서비스 이용을 위하여 종사원증 정보를 업데이트해주세요.
                </p>
              </div>

              <div className="login-wrap">
                <dl>
                  <dt>· 이름</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbNm}</dd>
                  <dt>· 아이디</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbId}</dd>
                  <dt>· 종사원증번호</dt>
                  <dd>{isEmpty(myMbInfo) ? '' : myMbInfo.mbEn}</dd>
                  <dt>· 유효기간</dt>
                  <dd>
                    {isEmpty(myMbInfo) ? '' : myMbInfo.enVldStrtDt} ~ {isEmpty(myMbInfo) ? '' : myMbInfo.mbEnEprYmd}
                  </dd>
                </dl>
              </div>
            </>
          ) : (
            <>
              <div className="login-tit-area">
                <h4>
                  고객님의 <span>종사원증 유효기간</span>이 <span>만료</span>되었습니다.
                </h4>
              </div>

              <div className="ico-tx-wrap">
                <span className="ico-wrap">
                  <i className="ico-date" />
                </span>
                <p>
                  고객님의 종사원증 번호 유효기간이 만료되었습니다.
                  <br />
                  <span>광고 중인 차량의 게시가 중단됩니다.</span>
                  <br />
                  원활한 서비스 이용을 위하여 종사원증 정보를 업데이트해주세요.
                </p>
              </div>
            </>
          )}

          <Buttons align="center" marginTop={60} className="w-line">
            {myMbInfo.mbEnEprDday > -1 && <Button size="big" background="gray" title="다음에 변경하기" width={180} height={60} onClick={handleChkPwdNext} />}
            <Button size="big" background="blue80" title="변경하기" width={180} height={60} href="/mypage/dealer/info/changeMember" />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};
export default ExpirationGuide;
