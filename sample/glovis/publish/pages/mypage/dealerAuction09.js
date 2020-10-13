import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction09 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              <div className="mypage-admin-title auction-membership-condition">
                <div className="sub-tit-wrap">
                  <p>경매회원 신청 진행 상황입니다.</p>
                </div>
              </div>
              <Steps className="auction-membership-progress" type={1} contents={['서류심사 중', '가입승인 중', '가입완료']} subContents={['필요 서류를 제출하시면\n자격심사가 이루어지고,\n결과는 24시간 이내에 유선으로\n통보하여 드립니다.', '보증금과 연회비를\n입금하시면 회원번호를\n부여해 드립니다.', '가입승인이 완료된 이후\n경매장 이용 교육 수료 이후\n오토옥션에 참여하실 수\n있습니다.']} active={3} />
              <p className="tx-c mt80" style={{lineHeight:"140%", fontSize:"20px"}}>
                참여방법, 응찰기 사용 요령, 수수료, 클레임, 명의이전, 세금계산서, 회원탈퇴 등<br />
                경매장 이용에 대한 전반적인 안내를 해드립니다.
              </p>
              <Buttons align="center" marginTop={80}>
                <Button size="big" background="blue80" title="확인" width={127} height={60} href="dealerAuction10" />
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

export default DealerAuction09