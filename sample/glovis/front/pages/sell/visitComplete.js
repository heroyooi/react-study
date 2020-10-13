import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from 'next/router';
import FrameLayout from '@src/components/layouts/FrameLayout';
import AppLayout from '@src/components/layouts/AppLayout';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobLogin from '@src/components/common/MobLogin';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { gInfoLive, isLoginLiveCheck } from '@src/utils/LoginUtils';
import { console } from 'globalthis/implementation';

const visitComplete = memo(({ router }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { slReqId } = useSelector((store) => store.sellCarStore.seller, []);
  const [fpLogin, setFpLogin] = useState(false);

  useEffect(() => {
    dispatch({ type: SECTION_SELL });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '방문평가 판매',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMypageButton = (e) => {
    if (e !== undefined) e.preventDefault();
    if (isLoginLiveCheck()) {
      Router.replace('/mypage/personal/sellcar/sellCar');
    } else {
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
  };

  const { name, mobile, location } = router.query;
  
  if (hasMobile) {
    return (
      <AppLayout>
        <div className="co-wrap bg pb0">
          <p className="tit complete">방문평가 판매 신청이 완료되었습니다.</p>
          <p className="exp">
            판매 신청 현황은 마이페이지에서 확인 가능하며,
            <br />
            고객님의 연락처로 오토벨 상담원이 안내 드릴 예정입니다.
          </p>
          <div className="co-result">
            <p className="num">
              신청번호 : <span>{slReqId || ''}</span>
            </p>
            <p className="sub">(고객님의 연락처로 오토벨 상담원이 안내 드릴 예정입니다.)</p>
          </div>
          <div className="applicant-info">
            <h4 className="tit">신청자 정보</h4>
            <table summary="신청자 정보" className="table-tp1">
              <colgroup>
                <col width="111" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>휴대전화번호</th>
                  <td>{mobile}</td>
                </tr>
                <tr>
                  <th>고객방문 지역</th>
                  <td>{location}</td>
                </tr>
              </tbody>
            </table>
            <p className="info">구체적인 장소는 전화 상담 이후 배정된 차량 평가사와 정하실 예정입니다.</p>
          </div>
          <Button className="fixed" size="full" background="blue80" radius={true} title="확인" href="/main" />
          <MobFullpagePopup active={fpLogin} paddingBottom={80}>
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin mode="popup" errorPw={false} noMemArea={true} url={'/mypage/personal/sellcar/sellCar'} />
              </div>
            </div>
          </MobFullpagePopup>
        </div>
      </AppLayout>
    );
  }

  return (
    <FrameLayout>
      <div className="content-wrap co-wrap visit">
        <p className="tit">방문평가 판매 신청이 완료되었습니다.</p>
        <p className="exp">
          신청 현황은 마이페이지에서 확인이 가능하며,
          <br />
          고객님의 연락처로 상담원이 안내를 드립니다.
          <br />
          감사합니다.
        </p>
      </div>
    </FrameLayout>
  );
});

visitComplete.displayName = 'visitComplete';
export default withRouter(visitComplete);
