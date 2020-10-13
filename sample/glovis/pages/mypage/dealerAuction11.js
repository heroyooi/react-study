import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction11 = () => {
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
                <Steps type={2} contents={['심사 중', '최종 승인 중', '보증금 반환 처리 중', '탈퇴완료']} active={1} />
              </div>
              <div className="auction-membership-complete">
                <h2 className="h2-tit">경매회원 <sapn className="tx-blue80">탈퇴 요청</sapn>을 <span className="tx-blue80">처리 중</span> 입니다.</h2>
                <h4 className="h4-tit">경매회원을 탈퇴하시더라도<br />오토벨 서비스는 계속 이용하실 수 있습니다.</h4>
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="확인" width={180} height={60} href="/mypage/dealerAuction01" />
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

export default DealerAuction11