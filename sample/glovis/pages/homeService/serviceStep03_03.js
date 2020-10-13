import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxGroup from '@lib/share/items/CheckBoxGroup';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import { select1_list, mobile_number_list, radio_group_tax, radio_group_sign, m_mobile_number_list, signup_check_list2 } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const ServiceStep03_03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });

    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
    const [seq, setSeq] = useState(0);
    
    const handleFullpagePopup = useCallback((name,seq) => e => {
      e.preventDefault();
      if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: signup_check_list2[seq].title,
            options: ['close']
          }
        });
        setSeq(seq);
        setFpTerms(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpTerms]);
    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);

    return (
      <AppLayout>
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={3} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">법인사업자 계약자정보 입력</h4>
          </div>
          <form className="service-form">
            <fieldset>
              <legend className="away">법인사업자 계약자 정보</legend>
              <table summary="법인사업자 계약자정보에 대한 내용" className="table-tp2 th-none">
                <caption className="away">법인사업자 계약자정보 입력</caption>
                <tbody>
                  <tr>
                    <td>
                      <p className="tx-tit">법인명</p>
                      <Input type="text" placeHolder="실명입력" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">법인등록번호</p>
                      <Input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">사업장등록번호</p>
                      <span className="bridge2">
                        <Input type="text" width='63%' />
                        <Button size="mid" background="blue80" radius={true} title="사업장확인" measure={true} width={34.5} />
                      </span>
                      <p className="tx-sub tx-red80">유효하지않은 사업장등록번호입니다.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">법인주소</p>
                      <span className="bridge2">
                        <Input type="text" placeHolder="우편번호" width='73%' />
                        <Button size="mid" background="blue80" radius={true} title="우편번호" measure={true} width={24.5} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="주소" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="상세주소" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">휴대폰번호</p>
                      <span className="bridge2">
                        <MobSelectBox options={m_mobile_number_list} width='20%' />
                        <Input type="text" width='42%' />
                        <Button size="mid" background="blue80" radius={true} title="인증번호받기" measure={true} width={33} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="인증번호를 입력해주세요." width='73%' />
                        <Button size="mid" background="gray60" radius={true} title="인증확인" measure={true} width={24.5} />
                      </span>
                      <p className="tx-sub tx-red80">휴대폰 번호를 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">계좌번호</p>
                      <span className="bridge2">
                        <MobSelectBox options={[
                          { id: 'bank1', value: 1, checked: true, disabled: false, label: '기업은행' },
                          { id: 'bank2', value: 2, checked: false, disabled: false, label: '수협은행' },
                          { id: 'bank3', value: 3, checked: false, disabled: false, label: '국민은행' },
                          { id: 'bank4', value: 4, checked: false, disabled: false, label: '신한은행' }
                        ]} width='30%' />
                        <Input type="text" placeHolder="계좌번호(‘-’제외입력)" width='67.5%' />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="예금주" width='63%' />
                        <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={true} width={34.5} />
                      </span>
                      <p className="tx-sub">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      세금계산서
                      <RadioGroup dataList={[
                        { id: 'm-radio-1', value: 1, checked: false, disabled: false, label: '발행' },
                        { id: 'm-radio-2', value: 2, checked: false, disabled: false, label: '미발행' }
                      ]} className="fr" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">
                        배송지주소
                        <CheckBox className="fr" id='chk-address' title='법인주소와 동일' />
                      </p>
                      <span className="bridge2">
                        <Input type="text" placeHolder="우편번호" width='73%' />
                        <Button size="mid" background="blue80" radius={true} title="우편번호" measure={true} width={24.5} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="주소" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="상세주소" />
                      </span>
                      <p className="tx-sub tx-red80">상세주소를 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">이메일</p>
                      <Input type="text" placeHolder="example@hyundaiautobell.com" />
                      <p className="tx-sub mt8">차량 계약시 계약서 수신 이메일주소를 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      차량양도계약서 서명방식
                      <RadioGroup dataList={[
                        { id: 'm-radio-1', value: 1, checked: false, disabled: false, label: '직접서명' }
                      ]} className="fr" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table summary="법인사업자 계약자 정보에 대한 내용" className="table-tp2 th-none bt10">
                <caption className="away">법인사업자 계약자 정보</caption>
                <colgroup>
                  <col width="100%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <SignUpCheckBoxGroup
                        sub_title="필수약관만 동의합니다."
                        sub_id="chk-agree-essential"
                        title="전체동의 합니다."
                        id="chk-agree-all"
                        agree_list={signup_check_list2}
                        agree_term={auction_check_term}
                        events={[handleFullpagePopup("terms", 0), handleFullpagePopup("terms", 1), handleFullpagePopup("terms", 2), handleFullpagePopup("terms", 3), handleFullpagePopup("terms", 4)]}
                        links={['/member/termsView?seq=0', '/member/termsView?seq=1', '/member/termsView?seq=2', '/member/termsView?seq=3']}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </div>
        <Buttons align="center" className="full">
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(계약자 유형 선택)" className="ws1" href="serviceStep03" />
          <Button size="big" background="blue80" title="다음 단계로" sub="(예상 결제 금액 확인)" className="ws1" href="serviceStep04" />
        </Buttons>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">{auction_check_term[seq]}</div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>          
          </div>)}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg"></i>
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={3} />
      </div>
      <div className="content-sec">
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4><em>법인사업자</em> 계약자정보 입력</h4>
          </div>
          <form className="service-form">
            <fieldset>
              <legend className="away">법인사업자 계약자 정보</legend>
              <table summary="법인사업자 계약자 정보에 대한 내용" className="table-tp2">
                <caption className="away">법인사업자 계약자 정보</caption>
                <colgroup>
                  <col width="12.68%" />
                  <col width="37.77%" />
                  <col width="12.68%" />
                  <col width="37.77%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>법인명</th>
                    <td colSpan="3">
                      <label htmlFor="coper-name" className="hide">법인명</label>
                      <Input type="text" placeHolder="" id="coper-name" width={272} />
                    </td>
                  </tr>
                  <tr>
                    <th>법인등록번호</th>
                    <td>
                      <label htmlFor="regist-num" className="hide">법인등록번호</label>
                      <span className="bridge">
                        <Input type="text" placeHolder="" id="regist-num" width={131} />
                      </span>
                      <Input type="text" placeHolder="" id="regist-num2" width={131} />
                    </td>
                    <th>사업장등록번호</th>
                    <td>
                      <label htmlFor="coper-num" className="hide">사업장등록번호</label>
                      <span className="bridge">
                        <Input type="text" placeHolder="" id="coper-num" width={131} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="" id="coper-num2" width={131} />
                      </span>
                      <Input type="text" placeHolder="" id="coper-num3" width={131} />
                    </td>
                  </tr>
                  <tr>
                    <th>법인주소</th>
                    <td colSpan="3">
                      <span className="bridge2">
                        <label htmlFor="coper-post" className="hide">우편번호</label>
                        <Input type="text" placeHolder="우편번호" id="coper-post" disabled={true} width={272} />
                        <Button size="mid" background="gray" title="우편번호" width={131} height={48} marginLeft={10} />
                      </span>
                      <span className="bridge2">
                        <span className="bridge">
                          <Input type="text" placeHolder="주소" id="coper-address" disabled={true} width={413} />
                        </span>
                        <Input type="text" placeHolder="상세주소" id="coper-address2" width={555} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td colSpan="3">
                      <label htmlFor="user-phone" className="hide">휴대전화번호</label>
                      <span className="bridge">
                        <SelectBox id="user-phone" className="items-sbox" options={mobile_number_list} width={131} height={48} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="" id="user-phone2" width={131} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="" id="user-phone3" width={131} />
                      </span>
                      <span className="bridge">
                        <Button size="mid" background="gray" title="인증번호 받기" width={131} height={48} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="인증번호 입력" id="verification-num" width={272} />
                      </span>
                      <Button size="mid" background="gray" title="인증확인" width={131} height={48} />
                    </td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td colSpan="3">
                      <p className="tx-tit">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                      <label htmlFor="account-num" className="hide">계좌 번호</label>
                      <span className="bridge">
                        <SelectBox id="bank-name" placeHolder="은행명" className="items-sbox" options={select1_list} width={272} height={48} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="계좌번호( ‘ - ‘ 제외 입력)" id="account-num" width={273} />
                      </span>
                      <span className="bridge">
                        <Input type="text" placeHolder="예금주" id="account-holder" width={272} />
                      </span>
                      <Button size="mid" background="gray" title="계좌인증" width={131} height={48} />
                    </td>
                  </tr>
                  <tr>
                    <th>세금계산서</th>
                    <td colSpan="3" className="radio-tax">
                      <RadioGroup dataList={radio_group_tax} />
                    </td>
                  </tr>
                  <tr>
                    <th>배송지 주소</th>
                    <td colSpan="3">
                      <span className="chk-mb"><CheckBox id='chk-coper-address' title='법인 주소와 동일' /></span>
                      <span className="bridge2">
                        <label htmlFor="deliver-post" className="hide">우편번호</label>
                        <Input type="text" placeHolder="우편번호" id="deliver-post" disabled={true} width={272} />
                        <Button size="mid" background="gray" title="우편번호" width={131} height={48} marginLeft={10} />
                      </span>
                      <span className="bridge2">
                        <span className="bridge">
                          <Input type="text" placeHolder="주소" id="deliver-address" disabled={true} width={413} />
                        </span>
                        <Input type="text" placeHolder="상세주소" id="deliver-address2" width={555} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td colSpan="3">
                      <p className="tx-tit">차량 계약시 계약서 수신 이메일 주소를 입력해주세요.</p>
                      <label htmlFor="email" className="hide">계좌 번호</label>
                      <Input type="text" placeHolder="example@hyundaiautobell.com" id="email" width={413} />
                      <p className="tx-sub ml0">이메일을 입력해주세요.</p>
                    </td>
                  </tr>
                  <tr>
                    <th>차량양도 계약서<br />서면방식</th>
                    <td colSpan="3" className="radio-sign">
                      <RadioGroup dataList={radio_group_sign} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table summary="법인사업자 계약자 정보에 대한 내용" className="table-tp2">
                <caption className="away">법인사업자 계약자 정보</caption>
                <colgroup>
                  <col width="100%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <CheckBoxGroup
                        title="전체 동의"
                        id="chk-agree-all"
                        type="terms"
                        agree_list={[
                          { id: 'chk-agree-1', title: '홈서비스 이용약관 (필수)', checked: false },
                          { id: 'chk-agree-2', title: '홈서비스 환불규정 (필수)', checked: false },
                          { id: 'chk-agree-3', title: '고유식별정보 수집/이용 동의(필수)', checked: false },
                          // { id: 'chk-agree-1', title: '개인정보 수집/이용 동의', checked: true },
                          // { id: 'chk-agree-2', title: '고유식별정보 수집/이용 동의', checked: false },
                          // { id: 'chk-agree-3', title: '개인정보처리의 위탁에 관한 사항', checked: false },
                          // { id: 'chk-agree-4', title: '마케팅 활용동의(선택)', checked: false },
                          // { id: 'chk-agree-5', title: '개인정보 제3자 제공에 관한 사항(선택)', checked: false }
                        ]} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
          <Buttons align="center" marginTop={60}>
            <Button size="big" background="gray" title="이전 단계로" sub="(계약자 유형 선택)" className="ws1" width={240} height={72} href="serviceStep03" />
            <Button size="big" background="blue80" title="다음 단계로" sub="(예상결제금액 확인)" className="ws1" width={240} height={72} href="serviceStep04" />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default ServiceStep03_03