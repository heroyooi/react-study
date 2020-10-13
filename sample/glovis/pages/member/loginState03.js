import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const LoginState03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
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
          <div className="login-tit-area v-3">
            <span className="ico-wrap"><i className="ico-date"></i></span>
            {/*종사원증 만료일 D-30일 부터 D Day 까지 문구*/}
            <h4>고객님의 <span>종사원증 유효기간</span>이 곧 <span>만료</span>됩니다.</h4>             
            <p>
              고객님의 종사원증 번호가 곧 만료예정입니다.<br />
              <span>만료 시, 광고 중인 차량의 게시가 중단됩니다.</span><br />
              원활한 서비스 이용을 위하여<br />
              종사원증 정보를 업데이트해주세요.
            </p>
            {/*종사원증 만료기간이 지났을 경우 문구
            <h4>고객님의 <span>종사원증 유효기간</span>이 <span>만료</span>되었습니다.</h4>
            <p>
              고객님의 종사원증 유효기간이 만료되었습니다.<br />
              <span>광고 중인 차량의 게시가 중단됩니다.</span><br />
              원활한 서비스 이용을 위하여<br />
              종사원증 정보를 업데이트해주세요.
            </p>*/}
          </div>

          <div className="ico-tx-wrap">
            <dl>
              <dt>· 차이름</dt>
              <dd>김현대</dd>
            </dl>
            <dl>
              <dt>· 아이디</dt>
              <dd>hyundai</dd>
            </dl>
            <dl>
              <dt>· 종사원증번호</dt>
              <dd>1234 - 56487</dd>
            </dl>
            <dl>
              <dt>· 유효기간</dt>
              <dd>2018.09.01 ~ 2019.08.31</dd>
            </dl>
          </div>

          <MobBottomArea isFix={true} isSimple={true}>
            <Buttons align="center" className="full">
              <Button size="big" background="blue20" color="blue80" title="다음에 변경하기" height={56} href="/mypage/dealerMember01_01" nextLink={true} />
              <Button size="big" background="blue80" title="변경하기" height={56} />
            </Buttons>
          </MobBottomArea> 
        </div>      
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h4>고객님의 <span>종사원증 유효기간</span>이 곧 <span>만료</span>됩니다.</h4>
          </div>

          <div className="ico-tx-wrap">
            <span className="ico-wrap"><i className="ico-date"></i></span>
            <p>
              고객님의 종사원증 번호가 곧 만료예정입니다.<br />
              <span>만료 시, 광고 중인 차량의 게시가 중단됩니다.</span><br />
              원활한 서비스 이용을 위하여 종사원증 정보를 업데이트해주세요.
            </p>
          </div>

          <div className="login-wrap">
            <dl>
              <dt>· 차이름</dt>
              <dd>김현대</dd>
              <dt>· 아이디</dt>
              <dd>hyundai</dd>
              <dt>· 종사원증번호</dt>
              <dd>1234 - 56487</dd>
              <dt>· 유효기간</dt>
              <dd>2018.09.01 ~ 2019.08.31</dd>
            </dl>
          </div>

          <Buttons align="center" marginTop={60} className="w-line">
            <Button size="big" background="gray" title="다음에 변경하기" width={180} height={60} href="/mypage/dealerMember01_01" />
            <Button size="big" background="blue80" title="변경하기" width={180} height={60} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default LoginState03;