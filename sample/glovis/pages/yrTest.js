import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import SlideCarDetail from '@src/components/common/SlideCarDetail';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Steps from '@lib/share/items/Steps';
import BannerItem from '@src/components/common/banner/BannerItem';
import SlideBanner from '@src/components/common/banner/SlideBanner'
import DatePicker from '@src/components/common/calendar/DatePicker'
import Tooltip from '@lib/share/items/Tooltip'
import TooltipItem from '@lib/share/items/TooltipItem'
import TooltipCont from '@lib/share/items/TooltipCont'
import moment from 'moment'
import Link from 'next/link';
import { car_list4, mCarList, mCarList2, m_radio_guaranteed, m_radio_contractor, m_mobile_number_list, textDummy } from '@src/dummy';

const yrTest = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: 'Yul Test : p',
      options: ['back']
    }
  });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const mobileOptions = [
    { id: 'radio_phone_1', value: 1, checked: true, disabled: false, label: '010' },
    { id: 'radio_phone_2', value: 2, checked: false, disabled: false, label: '011' }
  ];

  const now = moment()

  const { result } = router.query;

  const [listData1] = useState(car_list4)
  const [listData2] = useState(mCarList2)

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() =>{
    setTimeout(()=>{
      setIsLoading(false);
    },2000)
  },[])

  // 채팅창
  let textareaRow = 1;
  const [textareaH, setTextareaH] = useState(1);
  const handleChat = useCallback((e) => {
    if (e.key === 'Enter') {
      if (textareaRow === 1) {
        setTextareaH(2);
        textareaRow = 2;
      } else if (textareaRow === 2) {
        setTextareaH(3);
        textareaRow = 3;
      }
    }
  }, [textareaH]);

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  //닫기, 더보기
  const [isActive, setIsActive] = useState(false);
    const handleActive = useCallback((e) => {
      e.preventDefault();
      setIsActive(prevActive => !prevActive)
    }, [isActive]);

  if (hasMobile) {
    return (
      <AppLayout>
        {/* 홈서비스 */}

        <div className="btn-tooltip">
          <Tooltip placement="rightTop" width={234} event="click">
            <TooltipItem>
              <span>Click me</span>
            </TooltipItem>
            <TooltipCont>
              <p>차량 조회를 위해 소유자 정보를 확인합니다. 차량번호와 소유자가 일치해야 진행하실 수 있어요.</p>
            </TooltipCont>
          </Tooltip>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <Steps type={1} contents={['Title1', 'Title2', 'Title3', 'Title4', 'Title5']} active={2} />
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <ul className="autobell-chk-list">
            <li className="live"><CheckBox id='autobell-chk1' title='라이브 스튜디오 차량' /></li>
            <li className="auc"><CheckBox id='autobell-chk2' title='경매낙찰 차량' /></li>
            <li className="fran"><CheckBox id='autobell-chk3' title='프랜차이즈 차량' /></li>
            <li className="home"><CheckBox id='autobell-chk4' title='홈서비스 차량' /></li>
          </ul>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <h4 className="tit2">
            개인 계약자정보 입력
            <p>명의자2 정보입력</p>
          </h4>
          <table summary="개인 계약자정보에 대한 내용" className="table-tp2 th-none">
            <caption className="away">개인 계약자정보 입력</caption>
            <tbody>
              <tr>
                <td>
                  공동명의 여부
                  <CheckBox className="fr" id='chk-basic' title='공동명의' />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">명의자</p>
                  <Input type="text" height={40} value="실명입력" />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">휴대폰번호</p>
                  <span className="bridge2">
                    <MobSelectBox options={m_mobile_number_list} width='20%' disabled={true} />
                    <Input type="text" height={40} value="" width='42%' />
                    <Button size="mid" background="blue80" radius={true} title="인증번호받기" measure={'%'} width={33} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="인증번호를 입력해주세요." width='73%' />
                    <Button size="mid" background="gray60" radius={true} title="인증확인" measure={'%'} width={24.5} />
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">배송지주소</p>
                  <span className="bridge2">
                    <Input type="text" height={40} value="우편번호" width='73%' />
                    <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
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
                  <p className="tx-tit">계좌번호</p>
                  <span className="bridge2">
                    <MobSelectBox options={m_mobile_number_list} width='30%' />
                    <Input type="text" height={40} value="" width='67.5%' />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="인증번호를 입력해주세요." width='63%' />
                    <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={34.5} />
                  </span>
                  <p className="tx-sub">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">명의자2</p>
                  <Input type="text" height={40} value="실명입력" width='63%' />
                  <span className="bridge">
                    <MobSelectBox options={m_mobile_number_list} width='34.5%' />
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">사업자등록번호</p>
                  <span className="bridge2">
                    <Input type="text" height={40} value="실명입력" width='63%' />
                    <Button size="mid" background="blue80" radius={true} title="사업장확인" measure={'%'} width={34.5} />
                  </span>
                  <p className="tx-sub tx-red80">유효하지않은 사업장등록번호입니다.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">
                    사업장주소
                    <CheckBox className="fr" id='chk-address' title='개인주소와 동일' />
                  </p>
                  <span className="bridge2">
                    <Input type="text" height={40} value="우편번호" width='73%' />
                    <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
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
                  <p className="tx-tit">이메일</p>
                  <Input type="text" height={40} value="example@hyundaiautobell.com" />
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
              <tr>
                <td>
                  <p className="tx-tit">Input from</p>
                  <Input type="number" height={40} width='46%' placeHolder="0만원" />
                  <em className="from">~</em>
                  <Input type="number" height={40} width='46%' placeHolder="0만원" />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">MobSelectBox from</p>
                  <MobSelectBox options={[
                    { id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '선택' },
                    { id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '거리' }
                  ]} width='46%' />
                  <em className="from">~</em>
                  <MobSelectBox options={[
                    { id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '선택' },
                    { id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '거리' }
                  ]} width='46%' />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">DatePicker from</p>
                  <DatePicker defaultValue={now} width='46%'/>
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width='46%'/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">취소사유</p>
                  <ul className="radio-block tp3">
                    <li><Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} /></li>
                    <li><Radio className="txt" id="cancel2" label="차량 이상" value={2} checked={isValue1} onChange={handleChange1} /></li>
                    <li><Radio className="txt" id="cancel3" label="차량 정보 오류" value={3} checked={isValue1} onChange={handleChange1} /></li>
                    <li><Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} /></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">상세사유<em>(선택)</em></p>
                  <Textarea countLimit={200} type="tp1" height={144} placeHolder="기타 사유를 작성해주세요." />
                  <p className="tx-sub tx-exp-tp5 mt16">&#8251; 환불 시, 반송에 따른 탁송비 및 인수 당시 상태와 다를 경우 추가금액이 발생할 수 있습니다.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="calculation-table">
            <table summary="차량가격에 대한 내용" className="table-tp1 td-r">
              <caption>예상 결제 금액 확인</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">차량가격</th>
                  <td><span className="price">42,200,000</span>원</td>
                </tr>
              </tbody>
            </table>
            <div className="ico-symbol">
              <i>+</i>
            </div>
            <table summary="이전등록비 합계에 대한 내용" className="table-tp1 td-r">
              <caption className="away">이전등록비 합계</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">이전등록비 합계</th>
                  <td><span className="price">3,633,200</span>원</td>
                </tr>
                <tr>
                  <th>등록세(5%)</th>
                  <td>2,110,000원</td>
                </tr>
                <tr>
                  <th>취득세(2%)</th>
                  <td>844,000원</td>
                </tr>
                <tr>
                  <th>공채매입비</th>
                  <td>675,200원</td>
                </tr>
                <tr>
                  <th>증지대</th>
                  <td>1,000원</td>
                </tr>
                <tr>
                  <th>인지대</th>
                  <td>3,000원</td>
                </tr>
              </tbody>
            </table>
            <div className="ico-symbol">
              <i>=</i>
            </div>
            <table summary="총 구매 예상 비용에 대한 내용" className="table-tp1 td-r">
              <caption className="away">총 구매 예상 비용</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tx-b">총 구매 예상 비용</th>
                  <td><span className="price">45,833,200</span>원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}} className="service-wrap">
          <div className="service-tit tx-l">
            <h4 className="tit2">
              계약자 선택
              <p>명의자 정보를 위해 선택해주세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap icon list3">
              <RadioGroup
                dataList={m_radio_contractor}
                defaultValue={0}
                boxType={true}
                className="icon"
              >
                <RadioItem>
                  <p><i className="ico-individual"></i></p>
                </RadioItem>
                <RadioItem>
                  <p><i className="ico-business"></i></p>
                </RadioItem>
                <RadioItem>
                  <p><i className="ico-corporation"></i></p>
                </RadioItem>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}} className="service-wrap">
          <div className="service-tit tx-l">
            <h4 className="tit2">
              보증상품 선택
              <p>A/S까지 안심하고 구입하세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap text list3">
              <RadioGroup
                dataList={m_radio_guaranteed}
                defaultValue={1}
                boxType={true}
                className="text"
              >
                <RadioItem>
                  <div>
                    <span className="sub-title">6개월 / 10,000KM 보증</span>
                    <p className="price-tp3">110,000<span className="won">원</span></p>
                  </div>
                </RadioItem>
                <RadioItem>
                  <div>
                    <span className="sub-title">12개월 / 20,000KM 보증</span>
                    <p className="price-tp3">220,000<span className="won">원</span></p>
                  </div>
                </RadioItem>
                <RadioItem>
                  <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
                </RadioItem>
              </RadioGroup>
            </div>
            <p className="tx-exp-tp5">&#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</p>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <ul className="chk-info-wrap">
            <CheckBoxItem id="chk-performance">
              <p className="ico"><i className="ico-checking"></i></p>
              <p>차량성능,<br />상태점검기록부를<br />확인하셨습니까?</p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-insurance">
              <p className="ico"><i className="ico-insurance"></i></p>
              <p>보험이력을<br />확인하셨습니까?</p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-autobel">
              <p className="ico"><i className="ico-result"></i></p>
              <p>현대 오토벨 진단결과를<br />확인하셨습니까?</p>
            </CheckBoxItem>
            <CheckBoxItem id="chk-refundterms">
              <p className="ico"><i className="ico-refund"></i></p>
              <p>홈서비스 환불약관을<br />확인하셨습니까?</p>
            </CheckBoxItem>
          </ul>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}} className="service-wrap">
          <table summary="차량 정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="25%" />
              <col width="22.5%" />
              <col width="25.5%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량명</th>
                <td colSpan="4">현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              {
                isActive && (
                  <>
                    <tr>
                      <th>금액</th>
                      <td colSpan="4">1,234만원</td>
                    </tr>
                    <tr>
                      <th>차량번호</th>
                      <td colSpan="4">12가 3456</td>
                    </tr>
                    <tr>
                      <th>차량연식</th>
                      <td>2016</td>
                      <th>연료</th>
                      <td>디젤</td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td>4,380km</td>
                      <th>배기량</th>
                      <td>1,999cc</td>
                    </tr>
                    <tr>
                      <th>변속기</th>
                      <td>오토</td>
                      <th>차종</th>
                      <td>RV</td>
                    </tr>
                    <tr>
                      <th>사고유무</th>
                      <td>무사고</td>
                      <th>색상</th>
                      <td>검정</td>
                    </tr>
                    <tr>
                      <th>압류저당</th>
                      <td>무</td>
                      <th>제시번호</th>
                      <td>21363842</td>
                    </tr>
                  </>
                )
              }

            </tbody>
          </table>
          <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} fontSize={14} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} />
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <p className="tit2 mb6">추천검색어</p>
          <ul className="m-list basic">
            <li>1. 싼타페</li>
            <li>2. 쏘렌토</li>
            <li>3. 그랜저</li>
            <li>4. 카니발</li>
            <li>5. K7</li>
          </ul>
        </div>

        <div className="content-wrap list-wrap mt20">
          <div className="list-filter">
            <p className="inquire-num">총 1,023대</p>
          </div>
          <TabMenu type="type8" defaultTab={0}>
            <TabCont id="tab8-1" index={0}>
              <ul className="goods-list card-type">
                {listData2.map((v, i) => {
                  if (v.isMarkup === undefined) {
                    return (
                      <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} btnClick={handleBtnClick} btnId={v.id} />
                    ) 
                  } else {
                    if (v.isNumber === 1) {
                      return (
                        <BannerItem key={i} isMarkup={true}>
    
                          <div className="faq-bn">
                            <Link href="/customer/faq"><a>
                              <i className="ico-qna">Q</i>
                              <p className="tit">현대 오토벨 홈서비스는 전국 어디든지 배송이<br />가능한가요?</p>
                              <p className="exp">네, 고객님 전국 어디든 배송이 가능합니다. 배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
                              <Button size="sml" line="gray" radius={true} title="FAQ 자세히보기" width={86} height={24} marginTop={23} />
                            </a></Link>
                          </div>
                        </BannerItem>
                      )
                    } else if (v.isNumber === 2) {
                      return (
                        <BannerItem key={i} isMarkup={true}>
                          <div className="review-bn">
                            <Link href=""><a>
                              <div className="img-wrap">
                                <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                              </div>
                              <p className="tit">쇼핑몰처럼<br />편리해요!</p>
                              <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                            </a></Link>
                          </div>
                        </BannerItem>
                      )
                    } else if (v.isNumber === 3) {
                      return (
                        <BannerItem key={i} isMarkup={true}>
                          <div className="autobell-bn">
                            <Link href="/homeService/serviceInfo"><a>
                              <span><i className="ico-autobell-gray"></i></span>
                              <p className="tit">현대 오토벨<br />홈서비스 차량이란</p>
                              <p className="exp">
                                · 년식 9년 이하<br />
                                · 주행거리 14만 키로 이하<br />
                                · 오토벨에서 인증한 차량
                              </p>
                            </a></Link>
                          </div>
                        </BannerItem>
                      )
                    }
                  }
                })}
              </ul>
            </TabCont>
            <TabCont id="tab8-2" index={1}>
              <ul className="goods-list list-type vertical">
                {listData1.map((v, i) => {
                  return (
                    <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                  )
                })}
              </ul>
            </TabCont>
          </TabMenu>
        </div>
        
        <div className="service-top-banner sml">
          <div className="content-wrap">
            <h3>홈서비스</h3>
            <p>집으로 배송 받고 3일간 타보고<br />결정하는 현대 오토벨의 홈서비스</p>
          </div>
        </div>
        <div className="content-wrap">
          <h4 className="service-tit">현대 오토벨 홈서비스란?</h4>
          <p className="service-exp">
            현대 오토벨 홈서비스 광고중인 차량에서 마음에 드시는 차량을 선택하여 접수하시면,
            오토벨 전문 어드바이저가 고객님께 전화를 드려 구매 상담이 진행됩니다.
            구매결정 후 결제와 차량 보험가입이 모두 완료되면 전문기사를 통해 안전하게 고객님께서 원하시는 장소로 보내드리는 구매 방식입니다.
          </p>
          <ul className="service-point">
            <li>
              <i className="ico-confirm-big"></i>
              <p>안심차량</p>
              <span>현대 오토벨이<br />인증한 차량</span>
            </li>
            <li>
              <i className="ico-deliver-big"></i>
              <p>배송 서비스</p>
              <span>편리하게<br />우리집까지</span>
            </li>
            <li>
              <i className="ico-refund-big"></i>
              <p>환불 가능</p>
              <span>3일 동안<br />타보고 결정</span>
            </li>
          </ul>
        </div>
        <div className="content-sec">
          <div className="content-wrap service-use">
            <h4 className="service-tit">홈서비스 이용 방법</h4>
            <ul className="use-step">
              <li></li>
              <li>
                <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP1</span>
                  <span className="tit">구매 차량 결정</span>
                  <span className="exp">마음에 드는 차량을 찾으셨나요?<em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP2</span>
                  <span className="tit">온라인 구매 신청</span>
                  <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
              </li>
              <li>
                <img src="/images/contents/home-info-03.png" alt="결제" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP3</span>
                  <span className="tit">상담</span>
                  <span className="exp">전문 상담원이 차량 및 구매에 대한 상담을 진행합니다.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP4</span>
                  <span className="tit">결제</span>
                  <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-04.png" alt="상담" />
              </li>
              <li>
                <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP5</span>
                  <span className="tit">차량 배송</span>
                  <span className="exp">고객님께서 지정하신<br />시간 장소로 차량을 안전하게 배송해 드립니다.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP6</span>
                  <span className="tit">구매확정</span>
                  <span className="exp">3일 동안 차량을 이용해보시고,최종 구매 결정을 하실 수 있어요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-06.png" alt="구매확정" />
              </li>
              <li></li>
            </ul>
            <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="환불규정 안내" width={85} height={24} />
            </Buttons>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <h4 className="tit2">동급차량 실제 낙찰 정보</h4>
          <ul className="goods-list tx-list">
            <SlideBanner touch={true} dots={false} autoplay={false} customArrow={true} multiNum={1} centerMode={true} infinite={false} markupAll={true}>
              <li>
                <p className="tit">그랜저(IG) IG220 디젤 프리미엄</p>
                <div className="cont">
                  <ul>
                    <li>연식:17/01식</li>
                    <li>주행거리 : 42,330km</li>
                    <li>경매일 : 2019.11</li>
                  </ul>
                  <div className="float-wrap">
                    <p className="fl">평가 : <span className="tx-blue80">A6</span></p>
                    <p className="price-tp8 fr">2,240<span className="won">만원</span></p>
                  </div>
                </div>
              </li>
              <li>
                <p className="tit">그랜저(IG) IG220 디젤 프리미엄</p>
                <div className="cont">
                  <ul>
                    <li>연식:17/01식</li>
                    <li>주행거리 : 42,330km</li>
                    <li>경매일 : 2019.11</li>
                  </ul>
                  <div className="float-wrap">
                    <p className="fl">평가 : <span className="tx-blue80">A6</span></p>
                    <p className="price-tp8 fr">2,240<span>만원</span></p>
                  </div>
                </div>
              </li>
            </SlideBanner>
          </ul>
        </div>
        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner search-cover">
            <p className="tit1">
              김현대님,
              <span>
                현대 오토벨만의 특별한 진짜 시세를 확인해보세요.<br />
                1일 1회 무료조회 가능하며,<br />
                이용권을 구매하시면 더 이용하실 수 있습니다.
              </span>
            </p>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="search-car-num">
            <h3 className="tit2 mb16">차량번호</h3>
            <Input placeHolder="차량번호를 입력해주세요. (예: 12가1234)" id="car-num" height={38} />
            <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
          </div>
        </div>

        <div style={{borderBottom: '1px solid #ddd'}}>
          <div className="search-none">
            <p>
              차량 번호로 조회가 되지 않을 경우,<br />
              차량 조건 검색을 이용해보세요.
            </p>
            <Buttons align="center" marginTop={16}>
              <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건으로 조회" width={189} fontWeight={500} />
            </Buttons>
          </div>
        </div>

        <div style={{borderBottom: '1px solid #ddd'}}>
          <div className="used-car-summary">
            <h2>투싼(TUCSAN) 66부00**</h2>
            <p className="info">정보조회일자: 2019-09-27</p>
          </div>
        </div>

        <div style={{borderBottom: '1px solid #ddd'}}>
          <SlideCarDetail car_gallery={mCarList} />
          <div className="content-wrap">
            <Buttons align="center" marginTop={20}>
              <Button size="big" line="gray" radius={true} title="성능점검표" fontWeight={500} width={48} measure={'%'} />
              <Button size="big" line="red60" color="red60" radius={true} title="사고이력조회" fontWeight={500} width={48} measure={'%'} marginLeft={4} mgMeasure={'%'} />
            </Buttons>
            <table summary="경매정보 상세에 대한 내용" className="table-tp1 mt32">
              <caption className="away">경매정보 상세입니다.</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>거점</th>
                  <td>분당</td>
                </tr>
                <tr>
                  <th>판매일</th>
                  <td>2019-11-05</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>2016년</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>2018-03-30</td>
                </tr>
                <tr>
                  <th>미션</th>
                  <td>A/T</td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>디젤</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>NU9)그랑블루</td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>2,199 cc</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>52,333 km</td>
                </tr>
                <tr>
                  <th>소유</th>
                  <td>법인상품</td>
                </tr>
                <tr>
                  <th>용도</th>
                  <td>법인</td>
                </tr>
                <tr>
                  <th>평가</th>
                  <td>A6</td>
                </tr>
                <tr>
                  <th>수출항목</th>
                  <td>X</td>
                </tr>
                <tr>
                  <th>시작가</th>
                  <td>2,240 만원</td>
                </tr>
                <tr>
                  <th>낙찰가</th>
                  <td>2,240 만원</td>
                </tr>
                <tr>
                  <th>옵션</th>
                  <td>ABS VDC 스마트키 내비(일반)</td>
                </tr>
                <tr>
                  <th>특이사항</th>
                  <td>스탭몰딩블랑, 실내오염, 엔진오일누유/이음, 터브/ps이음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="float-wrap btn-s mb20">
            <h3 className="tit1 fl">그랜저(IG) IG220 디젤 프리미엄</h3>
            <Button className="fr" size="sml" line="gray" radius={true} title="상세보기" width={58} />
          </div>
          <table summary="낙찰정보에 대한 내용" className="table-tp1">
            <caption className="away">낙찰정보 상세입니다.</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>경매일</th>
                <td>2019.11.23</td>
              </tr>
              <tr>
                <th>거점</th>
                <td>분당</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>2016년</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2018-03-30</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>디젤</td>
              </tr>
              <tr>
                <th>미션</th>
                <td>A/T</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>52,333 km</td>
              </tr>
              <tr>
                <th>옵션</th>
                <td>ABS VDC 스마트키 내비(일반)</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>NU9)그랑블루</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>2,199 cc</td>
              </tr>
              <tr>
                <th>용도/소유</th>
                <td>법인/법인상품</td>
              </tr>
              <tr>
                <th>차대번호</th>
                <td>KMHF14RBJA160647</td>
              </tr>
              <tr>
                <th>평가</th>
                <td className="tx-blue80 tx-b">A6</td>
              </tr>
              <tr>
                <th>낙찰가</th>
                <td className="tx-blue80 tx-b">2,240 만원</td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* 내차팔기 */}
        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area">
            <p className="tit1">차량정보 조회<br /><span>차량 정보는 실제 정보와 다를 수 있으나, 수정하실 수 있습니다.</span></p>
            <table className="table-tp1" summary="차량정보 조회에 대한 내용">
              <caption className="away">차량정보 조회</caption>
              <colgroup>
                <col width="34%" />
                <col width="66%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>03라4567</td>
                </tr>
                <tr>
                  <th>차량명</th>
                  <td>기아 K3 쿱 1.6 터보 GDI 프레스티지 K3 2DR 1.6 T / GDI 프레스티지 M/T</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>2017-04-14</td>
                </tr>
                <tr>
                  <th>형식년도</th>
                  <td>2018</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner">
            <Buttons align="center">
              <Button size="big" background="blue20" color="blue80" radius={true} title="비회원으로 신청" width={160} />
              <Button size="big" background="blue80" radius={true} title="로그인" width={160} />
            </Buttons>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area">
            <div className="float-wrap">
              <label htmlFor="user-name" className="hide">이름</label>
              <Input type="text" placeHolder="이름" id="user-name" uiType={2} width={160} height={32} />
              <em className="input-tx">입니다.</em>
              <Button className="fr" size="mid" color="blue80" title="전송"/>
            </div>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area">
            <div className="float-wrap">
              <MobSelectBox options={mobileOptions} uiType={2} width={74} height={32} />
              <label htmlFor="user-phone" className="hide">번호</label>
              <Input type="number" placeHolder="번호" id="user-phone" uiType={2} width={124} height={32} />
              <em className="input-tx">입니다.</em>
              <Button className="fr" color="blue80" title="전송" />
            </div>
          </div>
        </div>

        <div style={{borderBottom: '1px solid #ddd'}}>
          <div className="chat">
            <Textarea type="tp1" placeHolder="입력해주세요." height={20*textareaH} mode="chat" onKeypress={handleChat} />
            <Buttons>
              <span className="step-btn-l">
                <Button size="sml" background="blue20" color="blue80" radius={true} title="특이사항 없음" width={85} height={30} />
              </span>
              <span className="step-btn-r">
                <Button size="sml" background="blue80" radius={true} title="입력" width={88} height={30} />
              </span>
            </Buttons>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area app-down-wrap">
            <div className="float-wrap">
              <p className="fl">등록된 사진 (0/15)</p>
              <div className="app-down fr">
                <i className="ico-app"></i>
                <Button color="blue80" title="오토벨앱 다운로드" href="#" />
              </div>
            </div>
            <Button size="full" background="blue80" radius={true} title="차량 사진 등록" marginTop={27} />
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area bank-wrap">
            <MobSelectBox customMode={true} customName="은행명" height={48}>
              <div className="inner">  
                은행선택
              </div>
            </MobSelectBox>
            <label htmlFor="user-name" className="hide">계좌번호</label>

            <Input type="text" placeHolder="계좌번호 ( ' - ' 없이 숫자만 입력)" id="user-name" uiType={2} width={271} height={32} /><em className="input-tx">입니다.</em>
            
            <div className="float-wrap">
              <p className="tx-blue80">나중에 입력할게요</p>
              <Button size="mid" background="blue80" radius={true} title="입력" width={100} height={38} />
            </div>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <div className="inner bottom-write-area">
            <h3 className="tit2">은행선택</h3>
            <ul className="radio-block tp2">
              <li><Radio className="txt" id="zone1" label="Block" value={1} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="zone2" label="Block" value={2} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="zone3" label="Block" value={3} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="zone4" label="Block" value={4} checked={isValue1} onChange={handleChange1} /></li>
            </ul>
          </div>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <DatePicker defaultValue={now}/>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}} className="address-wrap">
          <Input type="text" placeHolder="Search Input" id="input-tp3" uiType={3}/>
          <ul className="bottom">
            <li>
              <div className="float-wrap">
                <p className="num fl">12323</p>
                <ul className="fr">
                  <li>영문보기</li>
                  <li>지도</li>
                </ul>
              </div>
              <p className="address">
                경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                <span className="num">경기 성남시 분당구 판삼평동 681</span>
              </p> 
            </li>
            <li>
              <div className="float-wrap">
                <p className="num fl">12323</p>
                <ul className="fr">
                  <li>영문보기</li>
                  <li>지도</li>
                </ul>
              </div>
              <p className="address">
                경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                <span className="num">경기 성남시 분당구 판삼평동 681</span>
              </p> 
            </li>
          </ul>
        </div>

        <div style={{padding: 20, borderBottom: '1px solid #ddd'}}>
          <MobSelectBox options={[
            { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '스마트', hasDetail: '/marketPrice/MarketSpecify'},
            { id: 'm-radio2', value: 2, checked: false, disabled: false, label: '모던', hasDetail: '/marketPrice/MarketSpecify', price: 10000000 },
            { id: 'm-radio3', value: 2, checked: false, disabled: false, label: '모던', num: 904 },
          ]} customButton={true} customButtonName="Button - Select" customButtonHeight={56} areaClass="btn-v" />
        </div>
      
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      모바일 전용 페이지입니다.  
    </AppLayout>
  )
}

export default withRouter(yrTest);