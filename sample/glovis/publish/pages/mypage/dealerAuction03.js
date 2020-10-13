import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction03 = () => {
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
                <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={2} />
              </div>
              <div className="auction-membership-certified">
                <h5 className="h5-tit">휴대폰 본인 인증을 진행해주세요.</h5>
                <div className="ico-amc"><i className="ico-certify"></i></div>
                <p className="tx-exp-tp5 tx-red80">* 입력하신 회원님의 개인정보는 본인인증 이외의 목적으로 활용하지 않습니다.</p>
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="휴대폰 본인인증" width={223} height={60} href="dealerAuction04" />
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

export default DealerAuction03