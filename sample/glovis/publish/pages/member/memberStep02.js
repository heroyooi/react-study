import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MemberStep02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원가입 신청',
        options: ['back','gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>       
        <Steps type={1} contents={['약관동의', '본인인증', '가입정보입력', '회원가입완료']} active={2} reverse={true} mode="stick"/>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="certify-wrap member">
              <span className="ico-wrap"><i className="ico-certify"></i></span>
              <p className="tx-sub">안전한 회원가입을 위해<br />휴대폰 본인인증을 진행해 주세요.</p>              
              <Button size="mid" background="blue80" radius={true} title="휴대폰 본인인증" width={126} height={40} marginTop={16} />
            </div>
            <p className="tx-small">
              입력하신 회원님의 개인 정보는 본인인증 이외의 목적으로<br />활용하지 않습니다.
            </p>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="다음" href="memberStep03" nextLink={true} />      
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>일반회원 가입</h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={2} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>본인인증</h4>
              <p>안전한 회원가입을 위해 휴대폰 본인인증을 진행해 주세요.</p>
            </div>
            <div className="certify-wrap member">
              <span className="ico-wrap"><i className="ico-certify"></i></span>
              <p className="tx-sub">
                입력하신 회원님의 개인 정보는<br /><span>본인인증 이외의 목적으로 활용하지 않습니다.</span>
              </p>
              <Button size="big" background="blue80" title="휴대폰 본인인증" width={160} marginTop={40} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MemberStep02;