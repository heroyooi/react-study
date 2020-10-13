import { useSelector } from 'react-redux';
import Link from 'next/link';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SECTION_MYPAGE } from '@src/actions/types';

import RenderHelper from '@lib/share/render/helper';

const registrationComplete = ({query}) => {
  const { auctMbInfo, auctMbCorpInfo, auctMbResult } = useSelector(RootStore => RootStore.auctionMember)
  console.log('query : ', query)
  console.log('auctMbInfo : ', auctMbInfo)
  console.log('auctMbResult : ', auctMbResult)

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
            <div className="tabmenu tp1">
                <ul className="ui-tab col-2">
                  <li className="on tabTitle1">
                    <Link href="/mypage/dealer/autoauction/memberGuide">
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
                  <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={4} />
                </div>

                <div className="auction-membership-complete">
                  <h2 className="h2-tit">회원가입 신청이 완료되었습니다.<br /><strong className="tx-blue80">회원 승인이</strong> 완료된 후에 이용이 가능합니다.</h2>
                  <h4 className="h4-tit">현대글로비스 스마트옥션은 항상 최선의 서비스를 위해 노력하겠습니다.</h4>
                  <table summary="가입한 정보" className="table-tp1 input">
                    <caption className="away">가입한 정보</caption>
                    <colgroup>
                      <col width="140px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>{auctMbResult?.mbNm || query?.mbNm}</td>
                      </tr>
                      <tr>
                        <th>아이디</th>
                        <td>{auctMbResult?.membCustNo || query?.membCustNo}</td>
                      </tr>
                      <tr>
                        <th>임시 패스워드</th>
                        <td>{auctMbResult?.tmpPw || query?.tmpPw}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-exp-tp2">* 해당 패스워드는 가입하신 휴대폰번호로 문자 발송했습니다.</p>
                </div>
                
            </div>
        </div>
      </div>
    </AppLayout>
  )
}

registrationComplete.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper

  return {
    query
  }
}

export default registrationComplete
