import {useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMember01_05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원탈퇴',
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
          <div className="mypage-state-sec member-info-pw withdrawal mt20">
            <div className="mypage-admin-title">              
              <p className="tx-exp-tp5">&#8251; 고객님의 개인정보 보호를 위해 비밀번호 인증 후 회원탈퇴를 하실 수 있으며, 아래의 안내사항을 확인해주시기 바랍니다.</p>
            </div>
            <div className="withdrawal-ex mt24">
              <p className="mb16">
                <em>1. 30일간 회원가입 불가능</em>
                회원탈퇴 후 30일 동안은 회원가입이 불가능합니다.<br />
                탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.
              </p>
              <p>
                <em>2. 차량 정보와 이용 중인 서비스 </em>
                차량정보와 이용 중인 유료 광고 상품 및 프리미엄 서비스 등 유료서비스 등에 대한 정보와 데이터는 모두 삭제됩니다.<br />
                <small>* 이용 중인 서비스가 있으신 경우 관리자 확인 후 탈퇴가 진행 됩니다.</small> 
              </p>
            </div>
            <div className="member-pw-wrap">
              <div className="member-pw">
                <label htmlFor="member-id">아이디</label>
                <Input type="text" id="m-member-id" height={40} value="autobleuser" disabled={true}/>
                <label htmlFor="member-pw">비밀번호</label>
                <Input type="password" id="m-member-pw" height={40} />
              </div>
            </div>
            <Button size="big" className="fixed" size="full" background="blue80" title="확인"  href="/mypage/dealerMember01_06" />
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec member-info-pw withdrawal">
          <div className="mypage-admin-title">
            <h3>회원탈퇴</h3>
            <p className="tx-exp-tp5">&#8251; 고객님의 개인정보 보호를 위해 비밀번호 인증 후 회원탈퇴를 하실 수 있으며, 아래의 안내사항을 확인해주시기 바랍니다.</p>
          </div>

          <div className="withdrawal-ex">
            <p className="mb20">
              <b>1. 30일간 회원가입 불가능</b><br />
              회원탈퇴 후 30일 동안은 회원가입이 불가능합니다.<br />
              탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.
            </p>
            <p>
              <b>2. 차량 정보와 이용 중인 서비스 </b><br />
              차량정보와 이용 중인 유료 광고 상품 및 프리미엄 서비스 등 유료서비스 등에 대한 정보와 데이터는 모두 삭제됩니다.<br />
              * 미정산 금액이 있는 경우, 정산 후 탈퇴가 가능합니다. 
            </p>
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
            <Button size="big" background="blue80" title="확인" width={245} height={48} href="/mypage/dealerMember01_06" />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerMember01_05