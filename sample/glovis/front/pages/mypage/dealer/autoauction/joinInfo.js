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

const joinComplete = () => {
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

            <h2 className="auction-expiry-date">
              김현대님의 연회비 만기일이 <strong className="tx-red80">92일</strong> 남았습니다.
            </h2>
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
                  <td>1234</td>
                  <th>스마트옥션 이용기간</th>
                  <td className="tx-blue80">2018-10-29 ~ 2019-10.30</td>
                </tr>
                <tr>
                  <th>회원명</th>
                  <td>{auctMbInfo?.mbNm}</td>
                  <th>업체명</th>
                  <td>{auctMbCorpInfo?.corpNm}</td>
                </tr>
                <tr>
                  <th>휴대폰 번호</th>
                  <td>{auctMbInfo?.mbHpPnEnc}</td>
                  <th>전화번호</th>
                  <td>{auctMbCorpInfo?.corpTelNo}</td>
                </tr>
                <tr>
                  <th>보증금 지급계좌</th>
                  <td>{auctMbCorpInfo?.corpAccNoEnc}</td>
                  <th>은행명</th>
                  <td>{auctMbCorpInfo?.bankCd}</td>
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
                  <td>2019-12-12</td>
                  <th>연회비 연장기간</th>
                  <td className="tx-blue80">갱신일로부터 1년</td>
                </tr>
                <tr>
                  <th>입금계좌</th>
                  <td colSpan="3">
                    <strong className="tx-blue80">903-548385-566</strong> KEB하나은행 현대글로비스(주)
                  </td>
                </tr>
                <tr>
                  <th>연회비</th>
                  <td colSpan="3">
                    <strong className="tx-blue80">250,000</strong>원 (부가세포함)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="tx-exp-tp2 mt20">* 갱신일은 만기일 이후를 기준으로합니다. (단, 만기일 이후 입금시 입금일을 갱신일로 합니다.)</p>
            <p className="tx-exp-tp2 mt10">
              * 연회비 미납시 모든 경매장의 <span className="tx-red80">경매참여가 제한</span>되오니 이점 양해 부탁드립니다.
            </p>
            <p className="tx-exp-tp2 mt10">* 연회비 문의전화 (오토벨 분당센터 : 031-760-5300)</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

joinComplete.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);

  //회원정보 검색 후 옥션가입 회원이 아니면  /mypage/dealer/autoauction/memberGuide 페이지로 이동

  return {};
};

export default joinComplete;
