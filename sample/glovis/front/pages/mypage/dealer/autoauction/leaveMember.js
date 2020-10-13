import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import AuctionMemberInfo from '@src/components/mypage/dealer/DealerAuction/AuctionMemberInfo';
import AuctionDocumentUploader from '@src/components/mypage/dealer/DealerAuction/AuctionDocumentUploader';

import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import RenderHelper from '@lib/share/render/helper';

import { inputAuctionObjectProp, getMyAuctionMemberStateAction, postImageAction } from '@src/actions/mypage/dealer/auction/auctionMemberAction';
import { insertMyAuctionMemberInfo, downloadFile } from '@src/api/mypage/dealer/AuctionApi';
import { SystemContext } from '@src/provider/SystemProvider';

const leaveMember = () => {
  const dispatch = useDispatch();
  const auctionMember = useSelector((RootStore) => RootStore.auctionMember);
  const { showAlert, showConfirm, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { auctMbInfo, auctMbCorpInfo } = auctionMember;
  const [agreeUsingAccount, setAgreeUsingAccount] = useState(false);

  return (
    <AppLayout>
      <div className="content-wrap auction-membership-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="tabmenu tp1">
            <ul className="ui-tab col-2">
              <li className="on tabTitle1">
                <Link href="/mypage/dealer/autoauction/documentEvaluation">
                  <a>경매회원안내</a>
                </Link>
              </li>
              <li className="tabTitle2">
                <Link href="/mypage/dealer/autoauction/currentState">
                  <a>경매장 이용 현황</a>
                </Link>
              </li>
            </ul>

            <div className="auction-membership-steps bg-blue80">
              <Steps type={2} contents={['심사 중', '최종 승인 중', '보증금 반환 처리 중', '탈퇴완료']} active={1} />
            </div>
            <div className="auction-membership-complete">
              <h2 className="h2-tit">
                경매회원 <sapn className="tx-blue80">탈퇴 요청</sapn>을 <span className="tx-blue80">처리 중</span> 입니다.
              </h2>
              <h4 className="h4-tit">
                경매회원을 탈퇴하시더라도
                <br />
                오토벨 서비스는 계속 이용하실 수 있습니다.
              </h4>
            </div>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="blue80" title="확인" width={180} height={60} href="/mypage/dealerAuction01" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

leaveMember.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);

  //회원정보 검색 후 옥션가입 회원이 아니면  /mypage/dealer/autoauction/memberGuide 페이지로 이동

  return {};
};

export default leaveMember;
