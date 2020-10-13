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

const joinApproval = ({query}) => {
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

            <div className="mypage-admin-title auction-membership-condition">
              <div className="sub-tit-wrap">
                <p>경매회원 신청 진행 상황입니다.</p>
              </div>
            </div>
            <Steps
              className="auction-membership-progress"
              type={1}
              contents={['서류심사 중', '가입승인 중', '가입완료']}
              subContents={[
                '필요 서류를 제출하시면\n자격심사가 이루어지고,\n결과는 24시간 이내에 유선으로\n통보하여 드립니다.',
                '보증금과 연회비를\n입금하시면 회원번호를\n부여해 드립니다.',
                '가입승인이 완료된 이후\n경매장 이용 교육 수료 이후\n스마트옥션에 참여하실 수\n있습니다.'
              ]}
              active={2}
            />
            <div className="auction-membership-approval">
              <h2 className="h2-tit">
                <strong className="tx-blue80">가입 승인</strong>이 <strong className="tx-blue80">진행 중</strong> 입니다.
              </h2>
              <p>[회원번호 : {query.mbNo}]</p>
            </div>
            <div className="auction-payment-guidance">
              <h4>
                <i className="ico-dot mid"></i> 보증금 및 연회비 납부
              </h4>
              <ul>
                <li>
                  - 보증금 : <strong>300만원</strong>
                </li>
                <li>
                  - 연회비 : <strong>25만원(부가세포함)</strong>
                </li>
                <li>
                  - 납부계좌 : <strong className="tx-blue80">903-548385-566</strong> <strong>KEB하나은행 현대글로비스(주)</strong>
                </li>
              </ul>
              <h4>
                <i className="ico-dot mid"></i> 방문 시 서류 제출 및 현장 교육 수료
              </h4>
              <ul>
                <li>
                  - 지참서류 : <strong className="tx-blue80">인감증명서, 주민등록등본</strong>
                </li>
                <li>- 가입자와 신청자가 다른 경우 신청인의 인감증명서, 주민등록등본, 사업자 인감날인한 위임장(서식다운로드)을 반드시 지참하여 주시기 바랍니다.</li>
                <li>- 현장교육 일정은 유선상으로 안내 드리겠습니다.</li>
              </ul>
            </div>
            <Buttons align="center" marginTop={40}>
              <Button size="big" background="blue80" title="확인" width={127} height={60} href="/mypage/dealer/autoauction/memberGuide" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

joinApproval.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper

  //회원정보 검색 후 옥션가입 회원이 아니면  /mypage/dealer/autoauction/memberGuide 페이지로 이동

  return {
    query
  };
};

export default joinApproval;
