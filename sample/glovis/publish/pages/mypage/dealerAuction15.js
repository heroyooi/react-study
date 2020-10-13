import { useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import PageNavigator from '@src/components/common/PageNavigator'
import { SECTION_MYPAGE } from '@src/actions/types';
import { select1_list } from '@src/dummy';

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
              <TabMenu type="type6" className="mt64" defaultTab={3} mount={false} tabLink={[{ index: 0, url: '/mypage/dealerAuction12' },{ index: 1, url: '/mypage/dealerAuction13' },{ index: 2, url: '/mypage/dealerAuction14' },{ index: 3, url: '/mypage/dealerAuction15' }]}>
                <TabCont tabTitle="낙찰정보 조회" id="tab6-1" index={0}>
                  Content1
                </TabCont>
                <TabCont tabTitle="입찰정보 조회" id="tab6-2" index={1}>
                  Content2
                </TabCont>
                <TabCont tabTitle="클레임 신청 현황" id="tab6-3" index={2}>
                  Content3
                </TabCont>
                <TabCont tabTitle="내 차 팔기 현황" id="tab6-4" index={3}>
                <table className="table-tp1 input search th-c mt40" summary="조회 영역">
                    <caption className="away">조회 영역</caption>
                    <colgroup>
                      <col width="74px" />
                      <col width="230px" />
                      <col width="74px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>구분</th>
                        <td>
                          <SelectBox id="select4" className="items-sbox" options={select1_list} width='200px' placeHolder="전체"/>
                        </td>
                        <th>회차</th>
                        <td>
                          <SelectBox id="select4" className="items-sbox" options={select1_list} width='200px' />
                        </td>
                      </tr>
                      <tr>
                        <th>기간</th>
                        <td colSpan="3">
                          <DatePicker defaultValue={now} inputHeight={40} />
                          <em className="mg8">~</em>
                          <DatePicker defaultValue={now} inputHeight={40} />
                          <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                          <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                          <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                          <Button size="mid" background="blue80" title="조회" width={114} height={40 } marginLeft={16} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-exp-tp5 mt40">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>
                  <div className="admin-list tp7 auto mt10">
                    <table className="table-tp1 th-c td-c dashed" summary="오토옥션 출품내역에 대한 내용">
                      <caption className="away">오토옥션 출품내역</caption>
                      <colgroup>
                        <col width="13%"/>
                        <col width="12%"/>
                        <col width="*"/>
                        <col width="13%"/>
                        <col width="13%"/>
                        <col width="13%"/>
                      </colgroup>
                      <thead>
                        <tr>
                          <th>경매일</th>
                          <th>출품번호</th>
                          <th>차량정보</th>
                          <th>입금금액</th>
                          <th>진행상태</th>
                          <th>탁송</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>A/1</td>
                          <td>경매대기</td>
                          <td>본인</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td colSpan="4" className="tx-l tx-disabled">시작가: <span className="tx-blue80">1,700</span>만원 ㅣ 희망가: <span className="tx-blue80">1,800</span>만원</td>
                        </tr>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>-/-</td>
                          <td>경매진행</td>
                          <td>신청</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td colSpan="4" className="tx-l tx-disabled">시작가: <span className="tx-blue80">1,700</span>만원 ㅣ 희망가: <span className="tx-blue80">1,800</span>만원</td>
                        </tr>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-gray">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td>A/1</td>
                          <td>낙찰</td>
                          <td>완료</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td colSpan="4" className="tx-l tx-disabled">시작가: <span className="tx-blue80">1,700</span>만원 ㅣ 희망가: <span className="tx-blue80">1,800</span>만원</td>
                        </tr>
                        <tr>
                          <td colspan="6" className="tx-disabled">조회된 출품 차량 정보가 없습니다.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <PageNavigator recordCount={50} className="mt32" />
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