import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import { select1_list, color } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
03.12 : class="pd-s" 추가 / #a1 부분 참고

*/

const DealerAuction04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [agreeReply, setAgreeReply] = useState(true);
  const [data, setData] = useState("과거 탈퇴 사유가 들어갑니다.");
  const handleData = useCallback((e) => {
    setData(e.target.value);
  }, [data]);
  const handleAgreeChange = useCallback((e) => {
    setAgreeReply(Number(e.target.value) == 1 ? true : false);
    setData("");
  }, []);
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} tabLink={[{ index: 1, url: '/mypage/dealerAuction12' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              <div className="auction-membership-steps bg-blue80">
                <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={3} />
              </div>
              <h4 className="h4-tit mb16">기본정보</h4>
              <table summary="경매회원 기본정보 입력" className="table-tp1 input">
                <caption className="away">경매회원 기본정보</caption>
                <colgroup>
                  <col width="15%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름<em>(선택)</em></th>
                    <td>김현대</td>
                    <th>생년월일</th>
                    <td>1983년 12월 3일 (남자)</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <Input type="text" id="da-post-number" width={110} height={40} /><em className="mg4"></em><Button size="big" background="gray" title="우편번호" width={140} height={40} />
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
                        입력하신 계좌는 환급계좌로 활용되며, 예금주는 가입자 본인이여야 합니다.<em className="mg8"></em><CheckBox id='da-chk-me' title='확인' size="small" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4 className="h4-tit mt40 mb10">업체정보</h4>
              <p className="tx-exp-tp2 mb16" style={{ lineHeight: "140%" }}>
                가입자가 업체 대표자가 아닌 경우 대표자의 위임장(인감 직인 날인)이 필요하며, 최종가입승인을 위해 현장가입 시 가입자와 대표자의 인감증명서 각 1장씩 지참<br />
                또는 발송하셔야합니다.
              </p>
              <table summary="경매회원 업체정보 입력" className="table-tp1 input">
                <caption className="away">경매회원 업체정보</caption>
                <colgroup>
                  <col width="15%" />
                  <col width="35%" />
                  <col width="15%" />
                  <col width="35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>가입자, 대표자 동일<br /><em>(선택)</em></th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'da-member-ceo1', value: 1, checked: true, disabled: false, title: '예' },
                        { id: 'da-member-ceo2', value: 2, checked: false, disabled: false, title: '아니오' }
                      ]} size="small" />
                    </td>
                    <th>방문거점</th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'da-visit-base1', value: 1, checked: true, disabled: false, title: '분당' },
                        { id: 'da-visit-base2', value: 2, checked: false, disabled: false, title: '시화' },
                        { id: 'da-visit-base3', value: 3, checked: false, disabled: false, title: '양산' }
                      ]} size="small" />
                    </td>
                  </tr>
                  <tr>
                    <th>업체명</th>
                    <td>
                      <Input type="text" id="da-company-name" width={260} height={40} />
                    </td>
                    <th>업체 대표자</th>
                    <td>
                      <Input type="text" id="da-company-ceo" width={170} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>사업자 구분</th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'da-company-type1', value: 1, checked: true, disabled: false, title: '법인' },
                        { id: 'da-company-type2', value: 2, checked: false, disabled: false, title: '일반' }
                      ]} size="small" />
                    </td>
                    <th>거래유형</th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'da-deal-type1', value: 1, checked: true, disabled: false, title: '내수' },
                        { id: 'da-deal-type2', value: 2, checked: false, disabled: false, title: '수출' },
                        { id: 'da-deal-type3', value: 3, checked: false, disabled: false, title: '내수+수출' }
                      ]} size="small" />
                    </td>
                  </tr>
                  <tr>
                    <th>사업자 번호</th>
                    {/* #a1 start */}
                    <td className="pd-s">
                    {/* #a1 end */}
                      <Input type="text" id="da-business-license1" width={56} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-business-license2" width={44} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-business-license3" width={118} height={40} />
                    </td>
                    <th>법인 등록 번호<br /><em>(선택)</em></th>
                    <td>
                      <Input type="text" id="da-corporate-number1" width={98} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-corporate-number2" width={98} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>업체 계좌 번호</th>
                    <td>
                      <SelectBox id="da-company-account1" className="items-sbox" options={select1_list} placeHolder="은행선택" width={113} height={40} />
                      <em className="mg8"></em>
                      <Input type="text" id="da-company-account2" width={135} height={40} placeHolder="계좌번호입력" />
                    </td>
                    <th>예금주</th>
                    <td>
                      <Input type="text" id="da-depositary-stock" width={162} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>업체 주소</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <Input type="text" id="da-company-post" width={110} height={40} /><em className="mg4"></em><Button size="big" background="gray" title="우편번호" width={140} height={40} />
                      </span><br />
                      <span className="bridge2">
                        <Input type="text" id="da-company-address1" width={258} height={40} /><em className="mg4"></em><Input type="text" id="da-company-address2" width={438} height={40} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>업체 전화</th>
                    <td>
                      <SelectBox id="da-company-tel1" className="items-sbox" options={select1_list} placeHolder="010" width={80} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-company-tel2" width={75} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-company-tel3" width={75} height={40} />
                    </td>
                    <th>업체 팩스</th>
                    <td>
                      <SelectBox id="da-company-fax1" className="items-sbox" options={select1_list} placeHolder="010" width={80} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-company-fax2" width={75} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="da-company-fax3" width={75} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <Input type="text" id="da-company-email1" width={168} height={40} />
                        <em className="mg8">@</em>
                        <Input type="text" id="da-company-email2" width={224} height={40} />
                        <em className="mg8"></em>
                        <SelectBox id="da-company-email3" className="items-sbox" options={select1_list} placeHolder="직접입력" width={168} height={40} />
                      </span><br />
                      <span className="bridge2">
                        메일링 서비스<em className="mg8"></em>
                        <div style={{ display: "inline-block" }}>
                          <RadioGroup dataList={[
                            { id: 'da-mailing-service1', value: 1, checked: true, disabled: false, title: '수신' },
                            { id: 'da-mailing-service2', value: 2, checked: false, disabled: false, title: '비수신' }
                          ]} size="small" />
                        </div>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp2 mt40 mb16">과거에 가입했던 사실이 있는 경우에만 체크해주세요.</p>
              <table summary="경매회원 업체정보 입력" className="table-tp1 input">
                <caption className="away">과거 가입 유무 확인</caption>
                <colgroup>
                  <col width="140px" />
                  <col width="180px" />
                  <col width="140px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>과거 가입 유무</th>
                    <td>
                      <RadioGroup dataList={[
                        { id: 'da-past-join1', value: 1, checked: true, disabled: false, title: '예' },
                        { id: 'da-past-join2', value: 2, checked: false, disabled: false, title: '아니오' }
                      ]} size="small" onChange={handleAgreeChange} />
                    </td>
                    <th>과거 탈퇴 사유</th>
                    <td>
                      {
                        agreeReply === false
                          ? (
                            <>
                              <Input type="text" id="da-out-reason-none" disabled={true} width={380} height={40} data={data} onChange={handleData} isSelf={false} />
                            </>
                          ) : (
                            <>
                              <Input type="text" id="da-out-reason" width={380} height={40} data={data} onChange={handleData} isSelf={false} />
                            </>
                          )
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
              <Buttons align="right" marginTop={48}>
                <Button size="big" background="blue80" title="다음" width={127} height={60} href="dealerAuction05" />
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

export default DealerAuction04
