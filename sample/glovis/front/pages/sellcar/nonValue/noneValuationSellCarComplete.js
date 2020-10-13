/**
 * 설명 : 셀프 판매 서비스 신청 완료
 * @fileoverview 셀프 판매 서비스 신청 완료 화면
 * @author 최승희
 */
import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import { SystemContext } from '@src/provider/SystemProvider';
import { isLogin, gInfo, UserType } from '@src/utils/LoginUtils';
import { isAllowedUserType } from "@src/utils/sellcar/AuthUtil";
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL } from '@src/actions/types';

/**
 * 셀프 판매 서비스 신청 완료 안내
 * @returns {selfSellCarComplete}
 */
const noneValudationSellCarComplete = ({ query }) => {  
  const dispatch = useDispatch();
  const { seller, car } = useSelector((rootStore) => rootStore.sellCarStore);
  const { showAlert } = useContext(SystemContext);

  useEffect(() => {

    if (!isLogin()) Router.back(); // 로그인되어있지 않으면 이전 페이지로 돌아감
    if (!isAllowedUserType()) {
      showAlert("일반 회원만 이용 가능합니다.",() => {
        location.href = "/main";
      });
    } 

    dispatch({ type: SECTION_SELL });
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
        <p>무평가, 비대면 서비스를 통해 내 차를 빠르게 판매할 수 있는 서비스입니다.</p>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={5} />
        </div>
      </div>
      <div className="content-wrap">
        <div className="co-wrap">
          <p className="tit">무평가 판매 신청이 완료되었습니다.</p>
          <p className="exp">
          신청하신 정보는 마이페이지에서 확인이 가능하며, <br />등록해주신 연락처로 견적안내를 드립니다. <br />감사합니다.
          </p>
          {!isLogin() && (
            <div className="co-result">
              <p className="num">
                신청 번호 : <span>{seller.slReqId}</span>
              </p>
              <p className="sub">(마이페이지 현황 조회하시려면 신청번호가 필요합니다.)</p>
            </div>
          )}
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="확인" width={172} height={60} href="/main" />
            <Button size="big" background="blue80" title="마이페이지" width={172} height={60} href="/mypage/personal/sellcar/sellCar" />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

export default noneValudationSellCarComplete;
