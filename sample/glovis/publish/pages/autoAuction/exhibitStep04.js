import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import DatePicker from '@src/components/common/calendar/DatePicker';
import FindAddress from '@src/components/common/popup/FindAddress';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list, radio_consign, mobile_number_list, m_radio_consign, m_mobile_number_list } from '@src/dummy';


const ExhibitStep04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  const now = moment();
  const [consignMode, setConsignMode] = useState(1);
  const handleConsignChange = useCallback((e) => {
    setConsignMode(Number(e.target.value));
  }, []);
  
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);

  
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '내 차 출품하기',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 96,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={5} mode="stick" />
        </div>
        <div className="content-wrap ">
          <div className="auction-tit">
            <h4 className="tit2">출품 차량 목록</h4>
          </div>
          <div className="auction-sec mt16">
            <ul className="chk-list-wrap">
              <CheckBoxItem>
                <div className="info">
                  <span>01가1234</span>
                  <span>김현대</span>
                </div>
                <p className="tit4 mt8">[현대] HOT_Hatch_i30 가솔린 1.4 터보튜너<br />패키지</p>
                <div className="price-wrap mt16">
                  <div className="price-left fl">
                    <p className="price-tp1">시작가 1,000만원</p>
                  </div>
                  <div className="price-right fr">
                    <p className="price-tit">낙찰희망가</p>
                    <p className="price-tp2">1,050<span className="won">만원</span></p>
                  </div>
                </div>
              </CheckBoxItem>
              <CheckBoxItem>
                <div className="info">
                  <span>01가1234</span>
                  <span>김현대</span>
                </div>
                <p className="tit4 mt8">[현대] HOT_Hatch_i30 가솔린 1.4 터보튜너 패키지</p>
                <div className="price-wrap mt16">
                  <div className="price-left fl">
                    <p className="price-tp1">시작가 1,000만원</p>
                  </div>
                  <div className="price-right fr">
                    <p className="price-tit">낙찰희망가</p>
                    <p className="price-tp2">1,050<span className="won">만원</span></p>
                  </div>
                </div>
              </CheckBoxItem>
            </ul>
            <form className="auction-form step4">
              <fieldset>
              <legend className="away">회원정보 등록</legend>
              <table summary="개인 계약자정보에 대한 내용" className="table-tp2 th-none">
                <caption className="away">개인 계약자정보 입력</caption>
                <tbody>
                  <tr>
                    <td>
                      <p className={consignMode === 1 ? 'tx-tit' : 'tx-tit set-size'}>탁송 신청<em className="tx-blue80">*</em></p>
                      <RadioGroup dataList={m_radio_consign} onChange={handleConsignChange} />
                    </td>
                  </tr>
                  {
                    consignMode === 1 &&
                    <>
                      <tr>
                        <td>
                          <p className="tx-tit">탁송 희망일<em className="tx-blue80">*</em></p>
                          <DatePicker defaultValue={now} width='100%'/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="tx-tit">주소<em className="tx-blue80">*</em></p>
                          <span className="bridge2">
                            <Input type="text" height={40} value="우편번호" width='73%' />
                            <Button size="mid" background="gray" radius={true} title="우편번호" measure={'%'} width={24.5} />
                          </span>
                          <span className="bridge2">
                            <Input type="text" height={40} value="주소" />
                          </span>
                          <span className="bridge2">
                            <Input type="text" height={40} value="상세주소" />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="tx-tit">탁송 인계자명<em className="tx-blue80">*</em></p>
                          <Input type="text" value="김현대" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="tx-tit">휴대폰번호<em className="tx-blue80">*</em></p>
                          <span className="bridge2">
                            <MobSelectBox options={m_mobile_number_list} width='30%' />
                            <Input type="text" height={40} value="- 제외입력" width='67.5%' />
                          </span>
                          <p className="tx-sub tx-red80">휴대폰 번호를 입력해주세요</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="tx-tit">탁송업체<em className="tx-blue80">*</em></p>
                          <Input type="text" value="코리포스트랜스포트(주)" disabled={true} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="tx-tit">남기실 말씀</p>
                          <Textarea countLimit={50} type="tp1" height={96} placeHolder="" />
                        </td>
                      </tr>
                    </>
                  }
                </tbody>
              </table>
              </fieldset>
            </form>
          </div>
          <Button className="fixed" size="full" background="blue80" title="출품신청" href="exhibitStep05" /> 
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 오토옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={4} />
      </div>
      <div className="content-sec auction-sec">
        <div className="auction-consign-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h4>탁송신청</h4>
              <h5>출품 차량 목록</h5>
            </div>
            <table summary="출품 차량 목록" className="table-tp1 th-c td-c mt32">
              <caption className="away">출품 차량 목록</caption>
              <colgroup>
                <col width="60px" />
                <col width="*" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>모델명</th>
                  <th>차량번호</th>
                  <th>차주명</th>
                  <th>시작가</th>
                  <th>낙찰 희망가</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><CheckBox id="chk-car-1" checked={true} className="single" /></td>
                  <td className="tl">ALL_NEW_크루즈 1.4 터보 LS</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,200만원</td>
                  <td>1,250만원</td>
                </tr>
                <tr>
                  <td><CheckBox id="chk-car-2" className="single" /></td>
                  <td className="tl">[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                </tr>
                <tr>
                  <td><CheckBox id="chk-car-3" className="single" /></td>
                  <td className="tl">[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                </tr>
                <tr>
                  <td><CheckBox id="chk-car-4" className="single" /></td>
                  <td className="tl">[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                </tr>
                <tr>
                  <td><CheckBox id="chk-car-5" className="single" /></td>
                  <td className="tl">[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="content-wrap">
          <div className="auction-tit">
            <h5>탁송 신청</h5>
          </div>
          <form className="auction-form">
            <fieldset>
              <legend className="away">회원정보 등록</legend>
              <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                <caption className="away">회원정보 등록</caption>
                <colgroup>
                  <col width="13%" />
                  <col width="39%" />
                  <col width="13%" />
                  <col width="35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>탁송 방법</th>
                    <td colSpan={consignMode === 1 ? null : 3} className={consignMode === 1 ? '' : 'set-size'}>
                      <RadioGroup dataList={radio_consign} onChange={handleConsignChange} />
                    </td>
                    {
                      consignMode === 1 &&
                      <>
                        <th>탁송 희망일</th>
                        <td>
                          <span className="bridge">
                            <DatePicker defaultValue={now} inputWidth={172} />
                          </span>
                          <span className="bridge">
                            <SelectBox id="consign-hour" className="items-sbox" options={select1_list} placeHolder="08시" width={100} height={48} />
                          </span>
                          <span className="bridge">
                            <SelectBox id="consign-minute" className="items-sbox" options={select1_list} placeHolder="00분" width={100} height={48} />
                          </span>
                        </td>
                      </>
                    }
                  </tr>
                  {
                    consignMode === 1 &&
                    <>
                      <tr>
                        <th>주소</th>
                        <td colSpan="3">
                          <span className="bridge2">
                            <span className="bridge">
                              <Input type="text" placeHolder="우편번호" disabled={true} id="consign-address-number" width={258} />
                            </span>
                            <Button size="mid" background="gray" title="우편번호" width={124} height={48} onClick={(e) => openAddressPopup(e, 0)} />
                          </span>
                          <span className="bridge2">
                            <span className="bridge">
                              <Input type="text" placeHolder="주소" disabled={true} id="consign-address" width={392} />
                            </span>
                            <span className="bridge">
                              <Input type="text" placeHolder="상세 주소" id="consign-address-detail" width={572} />
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>탁송 인계자명</th>
                        <td>
                          <Input type="text" id="consign-handover-people" width={392} />
                        </td>
                        <th>휴대폰 번호</th>
                        <td>
                          <span className="bridge">
                            <SelectBox id="consign-mobile-1st" className="items-sbox" options={mobile_number_list} width={124} height={48} isValue={0} />
                          </span>
                          <span className="bridge">
                            <Input type="number" value="1234" id="consign-mobile-2nd" width={124} />
                          </span>
                          <span className="bridge">
                            <Input type="number" value="5678" id="consign-mobile-3rd" width={124} />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>남기실 말씀<em>(선택)</em></th>
                        <td colSpan="3">
                          <Textarea type="tp1" height={140} />
                        </td>
                      </tr>
                    </>
                  }
                </tbody>
              </table>
            </fieldset>
          </form>
          <Buttons align="center" marginTop={60} className="w-line">
            <Button size="big" background="blue80" title="출품 완료" width={240} height={72} href="exhibitStep05" />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress />
      </RodalPopup>
    </AppLayout>
  )
}

export default ExhibitStep04;
