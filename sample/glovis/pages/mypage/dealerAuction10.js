import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction10 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              <h2 className="auction-expiry-date">김현대님의 연회비 만기일이 <strong className="tx-red80">92일</strong> 남았습니다.</h2>
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
                    <th>오토옥션 이용기간</th>
                    <td className="tx-blue80">2018-10-29 ~ 2019-10.30</td>
                  </tr>
                  <tr>
                    <th>회원명</th>
                    <td>김현대</td>
                    <th>업체명</th>
                    <td>현대글로비스(주)</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>010-2837-2928</td>
                    <th>전화번호</th>
                    <td>02-1234-1234</td>
                  </tr>
                  <tr>
                    <th>보증금 지급계좌</th>
                    <td>23824720392</td>
                    <th>은행명</th>
                    <td>현대은행</td>
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
                    <td colspan="3"><strong className="tx-blue80">903-548385-566</strong> KEB하나은행 현대글로비스(주)</td>
                  </tr>
                  <tr>
                    <th>연회비</th>
                    <td colspan="3"><strong className="tx-blue80">250,000</strong>원 (부가세포함)</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp2 mt20">* 갱신일은 만기일 이후를 기준으로합니다. (단, 만기일 이후 입금시 입금일을 갱신일로 합니다.)</p>
              <p className="tx-exp-tp2 mt10">* 연회비 미납시 모든 경매장의 <span className="tx-red80">경매참여가 제한</span>되오니 이점 양해 부탁드립니다.</p>
              <p className="tx-exp-tp2 mt10">* 연회비 문의전화 (오토벨 분당센터 : 031-760-5300)</p>
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

export default DealerAuction10