
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Link from 'next/link'
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MemberHome = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원가입',
        options: ['back','gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>        
        <div className="content-wrap member-contents">
          <div className="member-sec-w">              
            <h3>가입 유형을 선택해주세요.</h3>
            <p className="ment">만 14세 이상만 가입이 가능합니다.</p>
          </div>
          
          <div className="choose-wrap">
            <div className="choose-box normal">
              <div className="choose-box-in">
                <h4>일반 회원</h4>
                <p>차량을 사거나 팔려는 회원</p>
                <Button size="full" background="blue80" radius={true} title="회원가입" height={40} href="/member/memberStep01" nextLink={true} fontSize={14} fontWeight={500} />
              </div>
              <div className="other-join">
                <h5>다른 계정으로 회원가입</h5>
                <Buttons align="center" marginTop={16}>
                  <BtnNaver/>
                  <BtnKakao/>
                  <BtnApple />
                </Buttons>
              </div>
            </div>
            <div className="choose-box dealer mt16">
              <div className="choose-box-in">
                <h4>딜러 회원</h4>
                <p>차량 매매업을 하시는 사업자 회원</p>
                <Button size="full" background="blue80" radius={true} title="회원가입" height={40} href="/member/memberStep01" nextLink={true} fontSize={14} fontWeight={500} />
              </div>
            </div>
          </div>
        </div>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap member-contents">
          <div className="member-tit-area">
            <h3>회원가입</h3>
            <p>가입 유형을 선택해주세요.<br />만 14세 이상만 가입이 가능합니다.</p>
          </div>
          
          <div className="choose-wrap">
            <div className="choose-box normal">
              <h4>일반 회원</h4>
              <p>차량을 사거나 팔려는 회원</p>
              <Button size="big" background="blue80" title="회원가입" width={160} href="/member/memberStep01" nextLink={true} />

              <div className="other-join">
                <h5>다른 계정으로 회원가입</h5>
                <Buttons marginTop={31}>
                  <BtnNaver style={{float:"left"}} />
                  <BtnKakao style={{float:"right"}} />
                </Buttons>
              </div>
            </div>
            <div className="choose-box dealer">
              <h4>딜러 회원</h4>
              <p>차량 매매업을 하시는 사업자 회원</p>
              <Button size="big" background="blue80" title="회원가입" width={160} href="/member/memberStep01" nextLink={true} />
            </div>
          </div>

          <div className="member-etc-area">
            <p className="member-etc-msg">
              기존 오토옥션 ID를 가지고 계신가요?<br />새로워진 현대 오토벨에서 기존 아이디를 계속해서 사용하실 수 있습니다.<br />
              <Link href="login"><a className="btn">로그인</a></Link>
            </p>
          </div>
          
        </div>
      </div>
    </AppLayout>
  )
}

export default MemberHome;