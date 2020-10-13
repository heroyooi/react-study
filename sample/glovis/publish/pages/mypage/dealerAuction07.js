import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import { select1_list, color } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';
/*
  html 변경이력
  03.12 : #a1 background props 변경
 
*/
const DealerAuction06 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };
  return (
    <AppLayout>
      <div className="content-wrap auction-membership-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              <div className="mypage-admin-title auction-membership-condition">
                <div className="sub-tit-wrap">
                  <p>경매회원 신청 진행 상황입니다.</p>
                </div>
              </div>
              <Steps className="auction-membership-progress" type={1} contents={['서류심사 중', '가입승인 중', '가입완료']} subContents={['필요 서류를 제출하시면\n자격심사가 이루어지고,\n결과는 24시간 이내에 유선으로\n통보하여 드립니다.', '보증금과 연회비를\n입금하시면 회원번호를\n부여해 드립니다.', '가입승인이 완료된 이후\n경매장 이용 교육 수료 이후\n오토옥션에 참여하실 수\n있습니다.']} active={1} />
              <h4 className="h4-tit mt40">서류 업로드</h4>
              <div className="auction-document-form">
                <p className="tx-exp-tp2" style={{lineHeight:"140%"}}>
                  아래의 서류를 업로드 하셔야 원활한 회원가입이 진행됩니다. (파일확장자는 JPG만 가능합니다.)
                </p>
                <div className="btn-set">
                  <Button radius={true} size="mid" line="gray" color="darkgray" title="위임장 다운로드" width={121} />
                  <Button radius={true} size="mid" line="gray" color="darkgray" title="회원가입서약서 다운로드" width={169} />
                </div>
              </div>
              <table summary="서류 업로드" className="table-tp1 input">
                <caption className="away">서류 업로드</caption>
                <colgroup>
                  <col width="240px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>사업자등록증 사본</th>
                    <td><InputFile uploadList={uploadList1} /></td>
                  </tr>
                  <tr>
                    <th>자동차관리사업등록증</th>
                    <td><InputFile uploadList={uploadList1} /></td>
                  </tr>
                  <tr>
                    <th>신청인 사진<em>(선택)</em></th>
                    <td><InputFile uploadList={uploadList1} /></td>
                  </tr>
                  <tr>
                    <th>회원가입 서약서<em>(선택)</em></th>
                    <td><InputFile uploadList={uploadList1} /></td>
                  </tr>
                </tbody>
              </table>
              <h4 className="h4-tit mt40">방문 시 제출서류</h4>
              <p className="tx-exp-tp2">
                아래의 필수서류는 미제출시 최종가입이 불가하오니 이점 양해 부탁드립니다.
              </p>
              <table summary="서류 업로드" className="table-tp1">
                <caption className="away">서류 업로드</caption>
                <colgroup>
                  <col width="240px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>일반사업자</th>
                    <td>인감증명서(개인), 주민등록등본(개인)</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp2">
                * 가입자와 신청자가 다른 경우 신청인의 인감증명서, 주민등록등본, 위임장(사업자 인감날인)을 반드시 지참하여 주시기 바랍니다.<br />
                사진은 최근 3개월 이내 촬영본, 서류는 최근 1개월 이내 발급분으로 준비하시기 바랍니다.
              </p>
              <h4 className="h4-tit mt40">기본정보</h4>
              <table summary="경매회원 기본정보 입력" className="table-tp1 input mt16">
                <caption className="away">경매회원 기본정보</caption>
                <colgroup>
                  <col width="140px" />
                  <col width="*" />
                  <col width="140px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>김현대</td>
                    <th>생년월일</th>
                    <td>1983년 12월 3일 (남자)</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <Input type="text" id="da-post-number" width={110} height={40} /><em className="mg4"></em><Button size="big" background="gray" title="우편번호" width={140} height={40} /> {/* #a1 */}
                      </span><br />
                      <span className="bridge2">
                        <Input type="text" id="da-address1" width={258} height={40} /><em className="mg4"></em><Input type="text" id="da-address2" width={438} height={40} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>휴대전화</th>
                    <td colSpan="3">
                      <SelectBox id="da-phone-number1" className="items-sbox" options={select1_list} placeHolder="010" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-phone-number2" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-phone-number3" width={125} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <SelectBox id="da-account-number1" className="items-sbox" options={select1_list} placeHolder="은행선택" width={168} height={40} />
                        <em className="mg8"></em>
                        <Input type="text" id="da-account-number2" width={224} height={40} placeHolder="계좌번호입력" />
                      </span><br />
                      <span className="bridge2">
                        해당 계좌의 예금주는 가입자 본인이어야 합니다.<em className="mg8"></em><CheckBox id='da-chk-me' title='확인' size="small" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Buttons align="right" marginTop={48}>
                <Button size="big" background="blue80" title="등록" width={127} height={60} href="dealerAuction08" />
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

export default DealerAuction06
