import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { signup_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const memberStep01 = () => {
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

    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
    const [seq, setSeq] = useState(0);
    
    const handleFullpagePopup = useCallback((name,seq) => e => {
      e.preventDefault();
      if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: signup_check_list[seq].title,
            options: ['close']
          }
        });
        setSeq(seq);
        setFpTerms(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpTerms]);
    
    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);

    let checkArr = [];
    const onCheck = (e, val) => {
      checkArr = val;
      console.log('checkArr:', checkArr);
    };

    return (
      <AppLayout>        
        <Steps type={1} contents={['약관동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} mode="stick" />
        <div className="member-sec">        
          <div className="content-wrap member-contents">                        
            <form className="register-form">
              <SignUpCheckBoxGroup
                sub_title="필수약관만 동의합니다."
                sub_id="chk-agree-essential"
                title="전체동의 합니다."
                id="chk-agree-all"
                agree_list={signup_check_list}
                agree_term={auction_check_term}
                onChange={onCheck}
                events={[handleFullpagePopup("terms", 0), handleFullpagePopup("terms", 1), handleFullpagePopup("terms", 2), handleFullpagePopup("terms", 3), handleFullpagePopup("terms", 4)]}
              />              
            </form>
            <Button className="fixed" size="full" background="blue80" title="다음" href="memberStep02" nextLink={true} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">{auction_check_term[seq]}</div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>          
          </div>)}
        </MobFullpagePopup>            
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
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>이용약관  및 개인정보수집 및 이용에 관한 동의</h4>
            </div>
            <form className="register-form">
              <SignUpCheckBoxGroup
                sub_title="필수 약관 동의"
                sub_id="chk-agree-essential"
                title="약관 전체 동의"
                id="chk-agree-all"
                agree_list={signup_check_list}
                agree_term={auction_check_term}
              />
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="blue80" title="다음으로" width={180} height={60} href="memberStep02" />
              </Buttons>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default memberStep01;