import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import { auction_check_list2 } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction02 = () => {
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
                <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={1} />
              </div>
              <div className="auction-membership-agree">
                <SignUpCheckBoxGroup
                  sub_title="필수 약관 동의"
                  sub_id="chk-agree-essential"
                  title="약관 전체 동의"
                  id="chk-agree-all"
                  agree_list={auction_check_list2}
                  agree_term={auction_check_term}
                />
              </div>
              <p className="tx-exp-tp5">* 제 3자 제공에 동의하지 않으실 경우 오토옥션 서비스를 이용하는데 제약이 따를 수 있습니다.</p>
              <Buttons align="right" marginTop={48}>
                <Button size="big" background="blue80" title="다음" width={127} height={60} href="dealerAuction03" />
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

export default DealerAuction02