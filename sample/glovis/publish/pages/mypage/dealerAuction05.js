import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
             <div className="auction-membership-steps bg-blue80">
                <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={4} />
              </div>
              <div className="auction-membership-complete">
                <h2 className="h2-tit">회원가입 신청이 완료되었습니다.<br /><strong className="tx-blue80">회원 승인</strong>이 완료된 후에 이용이 가능합니다.</h2>
                <h4 className="h4-tit">현대글로비스 오토옥션은 항상 최선의 서비스를 위해 노력하겠습니다.</h4>
                <table summary="가입한 정보" className="table-tp1 th-c td-c">
                  <caption className="away">가입한 정보</caption>
                  <colgroup>
                    <col width="140px" />
                    <col width="200px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>김현대</td>
                    </tr>
                    <tr>
                      <th>아이디</th>
                      <td>pp1234</td>
                    </tr>
                    <tr>
                      <th>임시 패스워드</th>
                      <td>Kwq*1^79</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tx-exp-tp2">* 해당 패스워드는 가입하신 휴대폰번호로 문자 발송했습니다.</p>
              </div>
              <Buttons align="center" marginTop={32}>
                <Button size="small" radius={true} background="blue80" title="첨부서류등록" width={106} height={32} href="/mypage/dealerAuction07"/>
              </Buttons>
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={127} height={60} href="dealerAuction06" />
              </Buttons>
            </TabCont>
            <TabCont tabTitle="경매장 이용 현황" id="tab1-2" index={1}>
              Content2
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerAuction05