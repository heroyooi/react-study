import {useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMember01_03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '비밀번호 변경',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    }); 
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-state-sec member-info-pw mt20">
            <div className="mypage-admin-title">            
              <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
              <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 비밀번호를 변경하실 수 있습니다.</p>
            </div>

            <div className="member-pw-wrap">
              <div className="member-pw">
                <label htmlFor="member-id">아이디</label>
                <Input type="text" id="m-member-id" height={40} value="autobleuser" disabled={true}/>
                <label htmlFor="member-pw">비밀번호</label>
                <Input type="password" id="m-member-pw" height={40} />
              </div>
            </div>
            
            <Button size="big" className="fixed" size="full" background="blue80" title="확인" href="/mypage/dealerMember01_04" />
           
          </div>
        </div>
      </AppLayout>
    )
  } 

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec member-info-pw">
          <div className="mypage-admin-title">
            <h3>비밀번호 변경</h3>
            <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
            <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 비밀번호를 변경하실 수 있습니다.</p>
          </div>

          <div className="member-pw-wrap">
            <div className="member-pw">
              <p>아이디</p>
              <p>autobleuser</p>
              <label htmlFor="member-pw">비밀번호</label>
              <Input type="text" id="member-pw" width={150} height={40} />
            </div>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} height={48} href="/mypage/dealerMember01_04" />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerMember01_03