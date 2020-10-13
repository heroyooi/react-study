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

import { inputAuctionObjectProp, putAuctionMemberPropsAction, getMyAuctionMemberStateAction, getMbInfoAction, postImageAction } from '@src/actions/mypage/dealer/auction/auctionMemberAction';
import { insertMyAuctionMemberInfo, downloadFile } from '@src/api/mypage/dealer/AuctionApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { setHpPnFormat } from '@src/utils/MemberUtil';

const joinComplete = () => {
  const dispatch = useDispatch();
  const auctionMember = useSelector((RootStore) => RootStore.auctionMember);
  const { showAlert, showConfirm, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { auctMbInfo, auctMbCorpInfo, memberState } = auctionMember;
  const [ agreeUsingAccount, setAgreeUsingAccount ] = useState(false);

  console.log('auctMbInfo :::::::::::::: > ', auctMbInfo)
  console.log('auctMbCorpInfo :::::::::::::: > ', auctMbCorpInfo)
  console.log('memberState :::::::::::::: > ', memberState)

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

            <h2 className="auction-expiry-date">{memberState?.MBNM}님의 연회비 만기일이 <strong className="tx-red80">{memberState?.REMAINEXPIYMD}일</strong> 남았습니다.</h2>
              <h4 className="h4-tit mt40 mb16">가입정보</h4>
              <table summary="가입정보" className="table-tp1 th-c td-c">
                <caption className="away">가입정보</caption>
                <colgroup>
                  <col width="150px" />
                  <col width="296px" />
                  <col width="150px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>회원번호</th>
                    <td>{memberState?.MEMBCUSTNO}</td>
                    <th>오토옥션 이용기간</th>
                    <td className="tx-blue80">{memberState?.RENEDT} ~ {memberState?.YEARFEEEXPIYMD}</td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>{memberState?.MBNM}</td>
                    <th>업체명</th>
                    <td>{memberState?.ENTRCORPNM}</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>{setHpPnFormat(memberState?.MBHPPNENC)}</td>
                    <th>전화번호</th>
                    <td>{memberState?.a}</td>
                  </tr>
                  <tr>
                    <th>보증금 지급계좌</th>
                    <td>{memberState?.MBACNTNOENC}</td>
                    <th>은행명</th>
                    <td>{memberState?.MBBANK}</td>
                  </tr>
                </tbody>
              </table>
              <h4 className="h4-tit mt40 mb16">연회비 납입안내</h4>
              <table summary="연회비 납입안내" className="table-tp1 th-c">
                <caption className="away">연회비 납입안내</caption>
                <colgroup>
                  <col width="150px" />
                  <col width="296px" />
                  <col width="150px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>연회비 만기일</th>
                    <td>{memberState?.YEARFEEEXPIYMD}</td>
                    <th>연회비 연장기간</th>
                    <td className="tx-blue80">갱신일로부터 1년</td>
                  </tr>
                  <tr>
                    <th>입금계좌</th>
                    <td colSpan="3"><strong className="tx-blue80">903-548385-566</strong> KEB하나은행 현대글로비스(주)</td>
                  </tr>
                  <tr>
                    <th>연회비</th>
                    <td colSpan="3"><strong className="tx-blue80">250,000</strong>원 (부가세포함)</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp2 mt20">* 갱신일은 만기일 이후를 기준으로합니다. (단, 만기일 이후 입금시 입금일을 갱신일로 합니다.)</p>
              <p className="tx-exp-tp2 mt10">* 연회비 미납시 모든 경매장의 <span className="tx-red80">경매참여가 제한</span>되오니 이점 양해 부탁드립니다.</p>
              <p className="tx-exp-tp2 mt10">* 연회비 문의전화 (오토벨 분당센터 : 031-760-5300)</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

joinComplete.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);

  await 
    helper
    .accessControl()
    .dispatch(getMyAuctionMemberStateAction(), getMbInfoAction())

  return {};
};

export default joinComplete;
