import { useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import PageNavigator from '@src/components/common/PageNavigator'
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction15 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const now = moment();
  return (
    <AppLayout>
      <div className="content-wrap auction-info-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" defaultTab={1} mount={false} tabLink={[{ index: 0, url: '/mypage/dealerAuction01' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              Content1
            </TabCont>
            <TabCont tabTitle="경매장 이용 현황" id="tab1-2" index={1}>
              <TabMenu type="type6" className="mt64" defaultTab={2} mount={false} tabLink={[{ index: 0, url: '/mypage/dealerAuction12' },{ index: 1, url: '/mypage/dealerAuction13' },{ index: 2, url: '/mypage/dealerAuction14' },{ index: 3, url: '/mypage/dealerAuction15' }]}>
                <TabCont tabTitle="낙찰정보 조회" id="tab6-1" index={0}>
                  Content1
                </TabCont>
                <TabCont tabTitle="입찰정보 조회" id="tab6-2" index={1}>
                  Content2
                </TabCont>
                <TabCont tabTitle="클레임 신청 현황" id="tab6-3" index={2}>
                  <div className="admin-list tp7 auto mt40">
                    <table className="table-tp1 th-c td-c" summary="오토옥션 출품내역에 대한 내용">
                      <caption className="away">오토옥션 출품내역</caption>
                      <colgroup>
                        <col width="10%"/>
                        <col width="12%"/>
                        <col width="*"/>
                        <col width="16%"/>
                        <col width="12%"/>
                      </colgroup>
                      <thead>
                        <tr>
                          <th>경매일</th>
                          <th>출품번호</th>
                          <th>차량정보</th>
                          <th>차량번호</th>
                          <th>진행상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>12가1234</td>
                          <td>접수<br />(19.11.26)</td>
                        </tr>
                        <tr>
                          <td>954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>12가1234</td>
                          <td>접수<br />(19.11.26)</td>
                        </tr>
                        <tr>
                          <td>954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>12가1234</td>
                          <td>접수<br />(19.11.26)</td>
                        </tr>
                        <tr>
                          <td>954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>12가1234</td>
                          <td>접수<br />(19.11.26)</td>
                        </tr>
                        <tr>
                          <td>954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>12가1234</td>
                          <td>접수<br />(19.11.26)</td>
                        </tr>
                        <tr>
                          <td colspan="5" className="tx-disabled">조회된 클레임 신청 정보가 없습니다.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <PageNavigator recordCount={50} className="mt32" />
                </TabCont>
                <TabCont tabTitle="내 차 팔기 현황" id="tab6-4" index={3}>
                  Content4
                </TabCont>
              </TabMenu>
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerAuction15