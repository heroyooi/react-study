import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import uuid from "uuid";
import Link from "next/link";//#a2 참고
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import Radio from '@lib/share/items/Radio'; //#a1 참고
import Textarea from '@lib/share/items/Textarea';//#a1 참고
import RadioGroup from '@lib/share/items/RadioGroup';//#a2 참고
import ImgCover from '@lib/share/items/ImgCover';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list, serviceCarList, car_list } from '@src/dummy';

/*
  html 변경이력
  03.18 : 구매취소 팝업추가 #a1 참고
        : 영수증/증빙(현금영수증/세금계산서) 팝업추가 #a2 참고
  03.19 : 스텝 활성화 추가(스텝 li에 class on 삽입 시 활성화), 기타 수정처리  #a3전체 참고
*/

const generalBuy04 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [payDetailShow, setPayDetailShow, payDetailPopupHandler, payDetailCloseHandler] = useRodal(false, true);
  const [payDetailShow2, setPayDetailShow2, payDetailPopupHandler2, payDetailCloseHandler2] = useRodal(false, true);
  const [payDetailShow3, setPayDetailShow3, payDetailPopupHandler3, payDetailCloseHandler3] = useRodal(false, true);
  const [payDetailShow4, setPayDetailShow4, payDetailPopupHandler4, payDetailCloseHandler4] = useRodal(false, true);
  const [shippingShow, setShippingShow, shippingPopupHandler, shippingCloseHandler] = useRodal(false, true);
  const [cancelShow, setCancelShow, cancelPopupHandler, cancelCloseHandler] = useRodal(false, true);
  const [cancelChkShow, setCancelChkShow, cancelChkPopupHandler, cancelChkCloseHandler] = useRodal(false);//#a1 참고
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);//#a2 참고
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);//#a2 참고

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  // 목록 더보기
  const [listData, setListData] = useState(serviceCarList);
  const createDummy = (num) => {
    const dummyArr = [];
    for (let i = 0; i < num; i++) {
      dummyArr.push({
        id: uuid.v4(),
        date: "2019-09-19",
        imgSrc: "/images/dummy/product-img-06.png",
        imgAlt: "차량 이미지",
        subject: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
        info1: ["00가0000", "09/12식(10년형)"],
        info2: ["84,761km", "오토", "디젤"],
        price: 7760,
        sellerName: "박현대",
        sellerMobile: "010-3333-7777",
        status: "결제완료"
      });
    }
    return dummyArr;
  }
  const handleListMore = useCallback((e) => {
    e.preventDefault();
    const dummyData = createDummy(5);
    setListData(listData => [...listData, ...dummyData]);
  }, []);

  // #a1 start 
  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  // Textarea
    const textareaChange = (e) => {
        console.log('textareaChange');
        console.log(e);
      }
      const textareaBlur = (e) => {
        console.log('textareaBlur');
        console.log(e);
      }
      const textareaFocus = (e) => {
        console.log('textareaFocus');
        console.log(e);
      }
  // #a1 end

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스 내역',
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
    return (
      <AppLayout>
        <div className="general-buy-sec">
          <div className="mypage-admin-title pd20">
            <p className="tx-exp-tp5">&#8251; 최근 1년 이내 홈서비스를 신청하신 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 홈서비스로 구매하신 차량정보는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap tp2">
                    <div className="list-none">
                      <p>홈서비스로 신청하신 차량이 없습니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/homeservice/serviceHome" />
                      </Buttons>
                    </div>
                  </div>
                ) : (
                  <div className="content-wrap">
                    <div className="goods-list admin-list tp2">
                      <ul>
                        <li>
                          <div className="img-cover">
                            <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>2019.09.16<span className="time">18:04</span></li>
                              <li className="state tx-blue80">결제완료</li>
                            </ul>
                            <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                            <div className="info-wrap">
                              <p className="name">장현대 (현대오토오토)</p>
                              <div className="price-wrap">
                                <div className="price-left">
                                  <p className="price-tp2">7,760<span className="won">만원</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="img-cover">
                            <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>2019.09.16<span className="time">18:04</span></li>
                              <li className="state tx-red80">취소처리중</li>
                            </ul>
                            <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                            <div className="info-wrap">
                              <p className="name">장현대 (현대오토오토)</p>
                              <div className="price-wrap">
                                <div className="price-left">
                                  <p className="price-tp2">7,760<span className="won">만원</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>홈서비스 내역</h3>
            <p className="tx-exp-tp5">&#8251; 최근 1년이내 홈서비스를 신청하신 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 홈서비스로 구매하신 차량정보는 1년까지 조회하실 수 있으며 1년이 지나면 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            {
              withoutList === false &&
              <div className="list-tit">
                <Button className="fr" size="big" background="blue80" title="홈서비스 대상차량보기" width={204} height={48} href="/homeService/serviceHome" />
              </div>
            }
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="12%" />
                    <col width="52%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>신청차량</th>
                      <th>가격</th>
                      <th>판매자</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  {
                    withoutList === false
                      ? (
                        <tbody>
                          {listData.map(v => {
                            return (
                              <tr key={v.id}>
                                <td>{v.date}</td>
                                <td>
                                  <ImgCover src={v.imgSrc} alt={v.imgAlt} />
                                  <div className="summary">
                                    <h4 className="subject">{v.subject}</h4>
                                    <ul className="info">{v.info1.map((v, i) => <li key={i}>{v}</li>)}</ul>
                                    <ul className="info">{v.info2.map((v, i) => <li key={i}>{v}</li>)}</ul>
                                  </div>
                                </td>
                                <td><p className="price-tp6">{v.price}<span className="won">만원</span></p></td>
                                <td className="seller">{v.sellerName}<br />{v.sellerMobile}</td>
                                <td>
                                  {v.status}<br />
                                  <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} onClick={(e) => payDetailPopupHandler(e, "fade")} />
                                </td>
                              </tr>
                            )
                          })}
                          <tr className="more">
                            <td colSpan="6" className="more">
                              <div className="cate-list-btn2">
                                <button onClick={handleListMore}>더보기</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="list-none">
                            <td colSpan="6">
                              홈서비스로 신청하신 차량이 없습니다.<br />
                              <Button size="big" background="blue80" title="홈서비스 대상 차량보기" width={245} height={60} marginTop={16} href="/homeService/serviceHome" />
                            </td>
                          </tr>
                        </tbody>
                      )
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={payDetailShow} type={'slideUp'} closedHandler={payDetailCloseHandler} mode="normal" width={894}>
        <div className="popup-pay-detail">
          <ul>
            <li className="on">{/* #a3 */}
              <span className="title">1. 신청완료</span>
              <span className="sub">접수가 완료되었습니다.<br />상담사가 곧 연락드릴<br />예정입니다.</span>
            </li>
            <li>
              <span className="title">2. 결제대기중</span>
              <span className="sub">접수가 완료되었습니다.<br />상담사가 곧 연락드릴<br />예정입니다.</span>
            </li>
            <li>
              <span className="title">3. 결제완료&amp;배송준비중</span>
              <span className="sub">결제완료 후 고객님에게 배송하기<br />위해 준비중입니다.</span>
            </li>
            <li>
              <span className="title">4. 배송 중</span>
              <span className="sub">고객님이 원하는 시간,<br />장소로 배송이 출발되며<br />진행상황이 안내됩니다.</span>
            </li>
            <li>
              <span className="title">5. 배송 완료</span>
              <span className="sub">차량 인수 후, 3일 이내<br />최종 구매 확정해주세요.<br />(3일 이후 자동확정)</span>
            </li>
          </ul>

          <div className="table-area">
            <div className="table-wrap-left">
              <ul className="float-wrap">
                <li><h4 className="mb33">결제 정보</h4></li>
                <li><Button size="mid" line="gray" color="black" radius={true} title="취소신청" width={100} height={32} onClick={(e) => cancelPopupHandler(e, "fade")} /></li>
              </ul>
              <table summary="결제정보에 대한 내용" className="table-tp1">
                <caption className="away">결제 정보</caption>
                <colgroup>
                  <col width="15%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td>10,234,000원</td>
                  </tr>
                  <tr>
                    <th>이전관리비</th>
                    <td>1,000,000원</td>
                  </tr>
                  <tr>
                    <th>BW가입비</th>
                    <td>2,000,000원</td>
                  </tr>
                  <tr>
                    <th>탁송비</th>
                    <td>34,000원</td>
                  </tr>
                  <tr>
                    <th>총 결제금액</th>
                    <td>12,123,000</td>
                  </tr>
                  <tr>
                    <th>결제방식</th>
                    <td>
                      할부 + 계좌이체<br />
                      (이체금액 1,000원)<br />
                      <span className="tx-blue80">
                        입금계좌 : 하나은행<br />
                        454564456123<br />
                        (예금주 : 현대오토벨)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Buttons align="right" marginTop={17}>
                <Button size="mid" line="gray" radius={true} title="증빙요청" width={91} height={32} onClick={(e) => rodalPopupHandler1(e, "fade")} />
              </Buttons>
            </div>

            <div className="table-wrap-right">
              <ul className="float-wrap">
                <li><h4 className="mb33">계약자/배송 정보</h4></li>
                <li>
                  <Button size="mid" line="gray" color="black" radius={true} title="구매확정" width={100} height={32} onClick={(e) => payDetailPopupHandler3(e, "fade")} />
                  <Button size="mid" line="gray" color="black" radius={true} title="배송지 변경" width={100} height={32} marginLeft={8} onClick={(e) => shippingPopupHandler(e, "fade")} />
                </li>
              </ul>
              <table summary="계약자/배송 정보에 대한 내용" className="table-tp1">
                <caption className="away">계약자/배송 정보</caption>
                <colgroup>
                  <col width="15%" />
                  <col width="37.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>명의자</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>010-1234-5678</td>
                  </tr>
                  <tr>
                    <th>주민등록상 주소</th>
                    <td>서울시 중구 소파로 1230 5층 123123</td>
                  </tr>
                  <tr>
                    <th>환불 계좌번호</th>
                    <td>국민은행 김현대 221112254789</td>
                  </tr>
                  <tr>
                    <th>배송지 주소</th>
                    <td>서울시 중구 소파로 1230 5층 123123</td>
                  </tr>
                  <tr>
                    <th>수령인</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>배송지 연락처</th>
                    <td>010-1234-5678</td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>auto@naver.com</td>
                  </tr>
                  <tr>
                    <th>보험증서</th>
                    <td>미첨부 <Button size="mid" line="gray" color="black" radius={true} title="보험증서 첨부" width={113} height={28} marginLeft={32} onClick={(e) => payDetailPopupHandler2(e, "fade")} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </RodalPopup>

      <RodalPopup show={payDetailShow2} type={'slideUp'} closedHandler={payDetailCloseHandler2} mode="normal" title="보험증서" size="medium" subPop={true}>{/* #a3 */}
        <div className="con-wrap popup-insurance">
          <p>보험 가입 및 첨부를 해주셔야 차량 배송이 진행됩니다.</p>
          <InputFile uploadList={uploadList1} resVertical={true} height={40} />{/* #a3 */}
          <Buttons align="center" marginTop={49}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="등록" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={payDetailShow3} type={'slideUp'} closedHandler={payDetailCloseHandler3} mode="normal" size="xs" subPop={true}>{/* #a3 */}
        <div className="con-wrap">
          <p>해당 차량을 구매확정 하시겠습니까?<br />(구매확정 시, 차량 명의이전이 진행됩니다.)</p>{/* #a3 */}
          <Buttons align="center" marginTop={55}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={(e) => payDetailPopupHandler4(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={payDetailShow4} type={'slideUp'} closedHandler={payDetailCloseHandler4} mode="normal" size="xs" subPop={true}>{/* #a3 */}
        <div className="con-wrap">
          <p>구매확정이 완료되었습니다.<br />오토벨 홈서비스를 이용해주셔서 감사합니다.</p>
          <Buttons align="center" marginTop={55}>
            <Button size="big" background="blue80" title="확인" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={cancelShow} type={'slideUp'} closedHandler={cancelCloseHandler} mode="normal" size="small" subPop={true}>{/* #a3 */}
        {/* #a1 stert */}
        <div className="con-wrap popup-cancel">
          <p>취소사유</p>
          <ul>
            <li><Radio className="txt" id="cancel1" title="단순 변심" value={1} checked={isValue1} onChange={handleChange1} /></li>
            <li><Radio className="txt" id="cancel2" title={`차량 이상`} value={2} checked={isValue1} onChange={handleChange1} /></li>
            <li><Radio className="txt" id="cancel3" title="차량 정보 오류" value={3} checked={isValue1} onChange={handleChange1} /></li>
            <li><Radio className="txt" id="cancel4" title="기타" value={4} checked={isValue1} onChange={handleChange1} /></li>
          </ul>
          <Textarea countLimit={200} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 사유를 작성해주세요." />
          <p className="tx-sinfo">※ 환불 시, 반송에 따른 탁송비 및 인수 당시 상태와 다를 경우 추가 금액이 발생할 수 있습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={180} height={60} onClick={(e) => {e.preventDefault();setCancelShow(false)}} />
            <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={(e) => cancelChkPopupHandler(e, "fade")}/>
          </Buttons>
        </div>
        {/* <div className="con-wrap">
          <p>홈서비스 신청을 취소하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} />
          </Buttons>
        </div> */}
        {/* #a1 end */}
        {/* <div className="con-wrap">
          <p>해당차량은 배차가 완료되어<br />취소 시 편도 탁송비가 수수료로 발생합니다.<br />그래도 취소 신청하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48}/>
            <Button size="big" background="blue80" title="확인" width={130} height={48}/>
          </Buttons>
        </div> */}

        {/* <div className="con-wrap">
          <p>해당차량은 배차가 완료되어<br />취소신청이 불가합니다.<br />고객센터(0000-0000)로 문의주세요.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} height={48}/>
          </Buttons>
        </div> */}

        {/* <div className="con-wrap">
          <p>취소시 취소수수료가 발생합니다.<br />그래도 취소하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} height={48}/>
          </Buttons>
        </div> */}
      </RodalPopup>

      <RodalPopup show={shippingShow} type={'slideUp'} closedHandler={shippingCloseHandler} mode="normal" size="medium" title="배송지 변경하기" subPop={true}>{/* #a3 */}
        {/* <div className="con-wrap">
          <p>해당차량을 배차가 완료되어<br />배송지 변경이 불가합니다.<br />고객센터(0000-0000)로 문의주세요.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} height={48}/>
          </Buttons>
        </div> */}

        <div className="con-wrap">
          <table summary="배송지 변경에 대한 내용" className="table-tp1 input">
            <caption className="away">배송지 변경하기</caption>
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th>수령인</th>
                <td><Input type="text" width={200} height={40} placeHolder="수령인을 입력해주세요." /></td>
              </tr>
              <tr>
                <th>배송지 주소</th>
                <td>
                  <span className="bridge2">
                    <Input type="text" width={200} height={40} />
                    <Button size="mid" background="gray" title="우편번호" width={100} height={40} marginLeft={8} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" width={200} height={40} />
                    <em></em>
                    <Input type="text" width={200} height={40} placeHolder="상세주소를 입력해주세요." />
                  </span>
                </td>
              </tr>
              <tr>
                <th>배송지 연락처</th>
                <td>
                  <span className="bridge2">
                    <SelectBox id="from-year" className="items-sbox" options={select1_list} width={91} height={40} placeHolder="010" />
                    <em className="mg8">-</em>
                    <Input type="text" width={90} height={40} />
                    <em className="mg8">-</em>
                    <Input type="text" width={90} height={40} />
                    <Button size="mid" background="gray" title="인증번호받기" width={120} height={40} marginLeft={8} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" width={200} height={40} placeHolder="인증번호를 입력해주세요." />
                    <Button size="mid" background="gray" title="확인" width={100} height={40} marginLeft={8} />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={49}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="변경완료" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup>

      {/* #a1 구매취소 start  */}
      <RodalPopup show={cancelChkShow} type={'slideUp'} closedHandler={cancelChkCloseHandler} mode="normal" size="xs" subPop={true}>
        <div className="con-wrap">
          <p>홈서비스 구매 취소신청이 완료되었습니다.</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => {e.preventDefault();setCancelShow(false);setCancelChkShow(false)}} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* #a1 구매취소 end  */}

      {/* #a2 영수증/증빙(현금영수증) start  */}
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="영수증/증빙" mode="normal" size="small" subPop={true}>
        <div className="con-wrap popup-payment">
          <h4>결제정보</h4>
          <table summary="결제정보에 대한 내용" className="table-tp1">
            <caption className="away">결재정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>상품명</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>무통장</td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                {/* <td>현금영수중{isReceipt }</td> */}
                <td>현금영수중</td>
              </tr>
            </tbody>
          </table>
          <p>
            발급영수증 선택(결제후 다음달 5일까지)<br />
            * 현금영수증/세금계산서 중 <b>1개</b>만 증빙자료로 신청이 가능합니다.
          </p>
          <div className="receipt-apply">
            <RadioGroup dataList={[
              { id: 'cash-receipt1', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
              { id: 'tax-invoice1', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }
            ]} defaultValue={1} />
          </div>
          <p>현금영수증 신청내역(신청일: 2019-09-09)</p>
          <table summary="현금영수증 신청내역에 대한 내용" className="table-tp1">
            <caption className="away">현금영수증 신청내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>구분</th>
                <td>지출증빙용</td>
              </tr>
              <tr>
                <th>발급내역</th>
                <td><Link href="#"><a>현금영수증 보기</a></Link></td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} onClick={(e) =>{e.preventDefault();setRodalShow1(false)}} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* #a2 영수증/증빙(현금영수증) end  */}

      {/* #a2 영수증/증빙(세금계산서) start  */}
      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="영수증/증빙" mode="normal" size="small" subPop={true}>
        <div className="con-wrap popup-payment">
          <h4>결제정보</h4>
          <table summary="결제정보에 대한 내용" className="table-tp1">
            <caption className="away">결재정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>상품명</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>무통장</td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                <td>세금계산서</td>
              </tr>
            </tbody>
          </table>
          <p>
            발급영수증 선택(결제후 다음달 5일까지)<br />
            * 현금영수증/세금계산서 중 <b>1개</b>만 증빙자료로 신청이 가능합니다.
          </p>
          <div className="receipt-apply">
            <RadioGroup dataList={[
              { id: 'cash-receipt2', value: 1, checked: false, disabled: false, title: '현금영수증 신청' },
              { id: 'tax-invoice2', value: 2, checked: true, disabled: false, title: '세금계산서 신청' }
            ]} defaultValue={2} />
          </div>
          <p>세금계산서 신청내역(신청일: 2019-09-09)</p>
          <table summary="세금계산서 신청내역에 대한 내용" className="table-tp1">
            <caption className="away">세금계산서 신청내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발급번호</th>
                <td>2019092103233428</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>(주)글로비스</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>김대표</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>김직원</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>도매 및 소매업</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>중고자동차판매</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>0123456</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-0000-0000</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td>00112233@glovis.com</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울 강남구 논현동 1234</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>  
      {/* #a2 영수증/증빙(세금계산서) end  */}    


    </AppLayout>
  )
}

export default withRouter(generalBuy04);