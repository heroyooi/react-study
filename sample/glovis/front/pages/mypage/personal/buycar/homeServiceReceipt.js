import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import uuid from 'uuid';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import ImgCover from '@lib/share/items/ImgCover';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';
import { select1_list } from '@src/dummy';
import { serviceCarList } from '@src/dummy';

//마이페이지(개인) > 내차사기 > 홈서비스 내역 - 증빙요청
const HomeServiceReceipt = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [payDetailShow, setPayDetailShow, payDetailPopupHandler, payDetailCloseHandler] = useRodal(false, true);
  const [shippingShow, setShippingShow, shippingPopupHandler, shippingCloseHandler] = useRodal(false, true);

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  // 목록 더보기
  const [listData, setListData] = useState(serviceCarList);
  const createDummy = (num) => {
    const dummyArr = [];
    for (let i = 0; i < num; i++) {
      dummyArr.push({
        id: uuid.v4(),
        date: '2019-09-19',
        imgSrc: '/images/dummy/product-img-06.png',
        imgAlt: '차량 이미지',
        subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
        info1: ['00가0000', '09/12식(10년형)'],
        info2: ['84,761km', '오토', '디젤'],
        price: 7760,
        sellerName: '박현대',
        sellerMobile: '010-3333-7777',
        status: '결제완료'
      });
    }
    return dummyArr;
  };
  const handleListMore = useCallback((e) => {
    e.preventDefault();
    const dummyData = createDummy(5);
    setListData((listData) => [...listData, ...dummyData]);
  }, []);

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

          <div className="list-wrap ex">
            {withoutList === false && (
              <div className="list-tit">
                <Button className="fr" size="big" background="blue80" title="홈서비스 대상차량보기" width={204} height={48} marginBottom={23} href="/homeService/homeService" />
              </div>
            )}
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="11%" />
                    <col width="52%" />
                    <col width="12%" />
                    <col width="13%" />
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
                  {withoutList === false ? (
                    <tbody>
                      {listData.map((v) => {
                        return (
                          <tr key={v.id}>
                            <td>{v.date}</td>
                            <td>
                              <ImgCover src={v.imgSrc} alt={v.imgAlt} />
                              <div className="summary">
                                <h4 className="subject">{v.subject}</h4>
                                <ul className="info">
                                  {v.info1.map((v, i) => (
                                    <li key={i}>{v}</li>
                                  ))}
                                </ul>
                                <ul className="info">
                                  {v.info2.map((v, i) => (
                                    <li key={i}>{v}</li>
                                  ))}
                                </ul>
                              </div>
                            </td>
                            <td>
                              <p className="price-tp6">
                                {v.price}
                                <span className="won">만원</span>
                              </p>
                            </td>
                            <td className="seller">
                              {v.sellerName}
                              <br />
                              {v.sellerMobile}
                            </td>
                            <td>
                              {v.status}
                              <br />
                              <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} onClick={(e) => payDetailPopupHandler(e, 'fade')} />
                            </td>
                          </tr>
                        );
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
                          홈서비스로 신청하신 차량이 없습니다.
                          <br />
                          <Button size="big" background="blue80" title="홈서비스 대상 차량보기" width={245} height={60} marginTop={16} href="/homeService/homeService" />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={payDetailShow} type={'slideUp'} closedHandler={payDetailCloseHandler} mode="normal" width={894}>
        <div className="popup-pay-detail">
          <ul>
            <li>
              <span className="title">1. 신청완료</span>
              <span className="sub">
                접수가 완료되었습니다.
                <br />
                상담사가 곧 연락드릴
                <br />
                예정입니다.
              </span>
            </li>
            <li>
              <span className="title">2. 결제대기중</span>
              <span className="sub">
                접수가 완료되었습니다.
                <br />
                상담사가 곧 연락드릴
                <br />
                예정입니다.
              </span>
            </li>
            <li>
              <span className="title">3. 결제완료&amp;배송준비중</span>
              <span className="sub">
                결제완료 후 고객님에게 배송하기
                <br />
                위해 준비중입니다.
              </span>
            </li>
            <li>
              <span className="title">4. 배송 중</span>
              <span className="sub">
                고객님이 원하는 시간,
                <br />
                장소로 배송이 출발되며
                <br />
                진행상황이 안내됩니다.
              </span>
            </li>
            <li>
              <span className="title">5. 배송 완료</span>
              <span className="sub">
                차량 인수 후, 3일 이내
                <br />
                최종 구매 확정해주세요.
                <br />
                (3일 이후 자동확정)
              </span>
            </li>
          </ul>

          <div className="table-area">
            <div className="table-wrap-left">
              <ul className="float-wrap">
                <li>
                  <h4 className="mb33">결제 정보</h4>
                </li>
                <li>
                  <Button size="mid" line="gray" color="black" radius={true} title="취소신청" width={100} height={32} />
                </li>
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
                    <td className="pd8-12">
                      할부 + 계좌이체
                      <br />
                      (이체금액 1,000원)
                      <br />
                      <span className="tx-blue80">
                        입금계좌 : 하나은행
                        <br />
                        454564456123
                        <br />
                        (예금주 : 현대 글로비스 오토벨)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-wrap-right">
              <ul className="float-wrap">
                <li>
                  <h4 className="mb33">계약자/배송 정보</h4>
                </li>
                <li>
                  <Button size="mid" line="gray" color="black" radius={true} title="배송지 변경" width={100} height={32} onClick={(e) => shippingPopupHandler(e, 'fade')} />
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </RodalPopup>
      <RodalPopup show={shippingShow} type={'slideUp'} closedHandler={shippingCloseHandler} mode="normal" size="medium" title="배송지 변경하기">
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
                <td>
                  <Input type="text" width={200} height={40} placeHolder="수령인을 입력해주세요." />
                </td>
              </tr>
              <tr>
                <th>배송지 주소</th>
                <td className="pd8-12">
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
                <td className="pd8-12">
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
    </AppLayout>
  );
};

export default withRouter(HomeServiceReceipt);
