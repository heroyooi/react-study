import { useDispatch } from 'react-redux';
import AppLayoutTemp from '@src/components/layouts/AppLayoutTemp';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerAuction01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayoutTemp>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              <div className="auction-membership-intro">
                <h4 className="h4-tit">경매회원</h4>
                <p>현대글로비스 스마트옥션은 심사에 의해 선정된 회원으로 운영되고 있습니다.</p>
                <Button className="btn-auto-auction" size="sml" line="gray" color="darkgray" radius={true} title="스마트옥션안내" width={84} />
                <Buttons align="center">
                  <Button size="big" background="blue80" title="경매회원 등록 신청" width={180} href="dealerAuction02" />
                </Buttons>
              </div>
              <div className="auction-membership-list">
                <h5 className="h5-tit"><i className="ico-dot mid"></i> 자격요건</h5>
                <ul>
                  <li>자동차관리법 상 중고차매매업 소지한 업체 대표 및 상사의 중고차 딜러 회원으로서 현대글로비스 스마트옥션의 경매 참여를<br />희망하는 회원<br />
                    <strong>* 자동차관리법 시행규칙 제123조에 규정된 매매사원도 가입 가능</strong>
                  </li>
                </ul>
              </div>
              <div className="auction-membership-list">
                <h5 className="h5-tit"><i className="ico-dot mid"></i> 신청방법</h5>
                <ul>
                  <li>- 가입신청서 작성 → 자격 심사 → 보증금 납입 → 이용 교육 → 카드 발급</li>
                  <li>- 보증금 : 300만원 (회원탈퇴 시 반환)</li>
                  <li>- 연회비 : 25만원 (부가세포함)</li>
                </ul>
              </div>
              <div className="auction-membership-list">
                <h5 className="h5-tit"><i className="ico-dot mid"></i> 담당 연락처</h5>
                <table summary="content" className="table-tp1 area th-c td-c">
                  <caption className="away">지역 선택</caption>
                  <colgroup>
                    <col width="145px" />
                    <col width="130px" />
                    <col width="130px" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>센터명</th>
                      <th>전화번호</th>
                      <th>팩스번호</th>
                      <th>주소</th>
                    </tr>
                    <tr>
                      <td>오토벨분당센터</td>
                      <td>031-760-5309</td>
                      <td>031-768-4671</td>
                      <td>(12773) 경기도 광주시 능평로 167</td>
                    </tr>
                    <tr>
                      <td>오토벨양산센터</td>
                      <td>055-370-2803</td>
                      <td>055-367-5775</td>
                      <td>(50567) 경남 양산시 산막공단북9길 33</td>
                    </tr>
                    <tr>
                      <td>오토벨시화센터</td>
                      <td>031-496-5007</td>
                      <td>031-434-8601</td>
                      <td>(15073) 경기도 시흥시 정왕천로 271</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabCont>
            <TabCont tabTitle="경매장 이용 현황" id="tab1-2" index={1}>
              Content2
            </TabCont>
          </TabMenu>
          
        </div>
      </div>
    </AppLayoutTemp>
  )
}

export default DealerAuction01
