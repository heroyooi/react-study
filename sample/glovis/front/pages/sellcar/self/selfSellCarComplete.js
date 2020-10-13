/**
 * 설명 : 셀프 판매 서비스 신청 완료
 * @fileoverview 셀프 판매 서비스 신청 완료 화면
 * @author 최승희
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';

import AppLayout from '@src/components/layouts/AppLayout';
import { isLogin } from '@src/utils/LoginUtils';
import { isAllowedUserType } from "@src/utils/sellcar/AuthUtil";
import {} from '@src/actions/sellcar/sellCarAction';

/**
 * 셀프 판매 서비스 신청 완료 안내
 * @returns {selfSellCarComplete}
 */
const selfSellCarComplete = ({ query }) => {
  const dispatch = useDispatch();
  const { seller, car } = useSelector((rootStore) => rootStore.sellCarStore);

  useEffect( ()=>{
    
  },[]);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3><span className="stp"><b>비교견적</b>으로 내 차 팔기</span>Step 5</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={5} />
        </div>
      </div>
      <div className="content-wrap">
        <div className="co-wrap">
          <p className="tit">비교견적 판매 신청이 완료되었습니다.</p>
          <p className="exp">
            판매 신청 현황은 마이페이지에서 확인 가능하며,<br />
            신청이 승인되면 고객님의 SMS로 견적 시작을 알려드립니다.
          </p>
          {!isLogin() && (
            <div className="co-result">
              <p className="num">
                신청 번호 : <span>{seller.slReqId}</span>
              </p>
              <p className="sub">마이페이지 현황 조회하시려면 신청번호가 필요합니다.</p>
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

export default selfSellCarComplete;
