import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction11_01 = () => {
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
                <Steps type={2} contents={['심사 중', '최종 승인 중', '보증금 반환 처리 중', '탈퇴완료']} active={4} />
              </div>
              <div className="auction-membership-complete">
                <h2 className="h2-tit">경매회원 <span className="tx-blue80">탈퇴</span>가 <span className="tx-blue80">완료</span>되었습니다.</h2>
                <h4 className="h4-tit">경매회원을 탈퇴하시더라도<br />오토벨 서비스는 계속 이용하실 수 있습니다.</h4>
                <table summary="가입했었던 정보" className="table-tp1 input">
                  <caption className="away">가입했었던 정보</caption>
                  <colgroup>
                    <col width="140px" />
                    <col width="200px" />
                    <col width="140px" />
                    <col width="200px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>회원번호</th>
                      <td>1234</td>
                      <th>보증금 지금계좌</th>
                      <td>198342408</td>
                    </tr>
                    <tr>
                      <th>회원명</th>
                      <td>김현대</td>
                      <th>예금주</th>
                      <td>김현대</td>
                    </tr>
                    <tr>
                      <th>업체명</th>
                      <td>현대글로비스(주)</td>
                      <th>은행명</th>
                      <td>현대캐피탈</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Buttons align="center" marginTop={65}>
                <Button size="big" background="blue80" title="확인" width={127} height={60} href="/mypage/dealerAuction01" />
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

export default DealerAuction11_01