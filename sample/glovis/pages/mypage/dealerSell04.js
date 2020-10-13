import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import DatePicker from '@src/components/common/calendar/DatePicker';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list } from '@src/dummy';

const DealerSell04 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const now = moment();
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);


  // Event Handler (Only Mobile)
  const handleAgreeChange = useCallback((e) => console.log(+e.target.value), []);
  // Event Handler (Only Mobile) End

  // bottom sheet button select
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const handleOpenPop = useCallback((e) => {
     e.preventDefault();
     setActive(true);
     setDimm(true);
     document.getElementsByTagName('html')[0].style.overflow = "hidden";
   }, []);
   const handleCloseDimm = useCallback(() => {
     setActive(false);
     setDimm(false);
     document.getElementsByTagName('html')[0].style.overflow = "auto";
   }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스 예약/판매 현황',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="dealer-service-sec pt0">
          <div className="content-wrap">
            <div className="essential-point tp2 fs12 mt20">
              <ul>
                <li>&#8251; 구매자가 구매확정 시 차량대금이 정산 및 입금됩니다.<br />(구매확정일로부터 3영업일 이내)</li>
                <li>&#8251; 홈서비스 구매신청이 접수된 경우 판매자분께 유선으로 홈서비스 진행여부를 확인한 뒤, 홈서비스 고객 상담이 진행됩니다.<br />홈서비스 담당자의 전화를 꼭 받아주세요.</li>
              </ul>
            </div>
            <ul className="m-toggle-list search">
              <MenuItem>
                <MenuTitle><p className="tit2">홈서비스 현황</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">진행상태</p>
                    <MobSelectBox placeHolder="전체"  options={select1_list} width='70%'/>
                  </div>
                  <MobButtonFilter checkList={[
                    {title: "15일", checked: true}, 
                    {title: "1개월", checked: false}, 
                    {title: "3개월", checked: false},
                    {title: "6개월", checked: false}
                  ]} onClick={handleBtnFilterClick1} />
                  {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                  {/* <MobButtonFilter checkList={[
                    {title: "11", checked: true}, 
                    {title: "222", checked: false}, 
                    {title: "333", checked: false},
                    {title: "444", checked: false}
                  ]} onClick={handleBtnFilterClick2} /> */}
                  <div className="mt8">
                    <DatePicker defaultValue={now} width='46%'/>
                    <em className="from">~</em>
                    <DatePicker defaultValue={now} width='46%'/>
                  </div>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>2019.08.17 ~ 2019.09.16</p>
                  <p>총 <span className="tx-blue80">123</span>건</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border">

            <div className="goods-list admin-list tp5 pd20 bg-white">
              <ul>
                <li>
                  <div className="img-cover">
                    <div className="img-wrap">
                      <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                    </div>
                    <span className="state">예약완료</span>
                  </div>
                  <div className="summary">
                    <ul className="date">
                      <li>등록일 : 2019.09.16<span className="time">18:04</span></li>
                    </ul>
                    <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                    <div className="info-wrap">
                      <div className="info">
                        <span>00가 0000</span>
                        <span>오토벨EW Lv 1</span>
                      </div>
                      <div className="price-wrap">
                        <div className="price-left">
                          <p className="price-tp2">7,760<span className="won">만원</span></p>
                        </div>
                      </div>
                      <p className="t-underline tx-blue80 fs12 mt8" onClick={handleOpenPop}>상세보기</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="img-cover">
                    <div className="img-wrap">
                      <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                    </div>
                    <span className="state">예약완료</span>
                  </div>
                  <div className="summary">
                    <ul className="date">
                      <li>등록일 : 2019.09.16<span className="time">18:04</span></li>
                    </ul>
                    <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                    <div className="info-wrap">
                      <div className="info">
                        <span>00가 0000</span>
                        <span>오토벨EW Lv 1</span>
                      </div>
                      <div className="price-wrap">
                        <div className="price-left">
                          <p className="price-tp2">7,760<span className="won">만원</span></p>
                        </div>
                      </div>
                      <p className="t-underline tx-blue80 fs12 mt8" onClick={handleOpenPop}>상세보기</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* 리스트 없을때 */}
            {/* <div className="search-none pd0" style={{ height: '176px' }}>
              <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
            </div> */}

            <div className={dimm ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm}></div>
            <MobBottomArea active={active} isFixButton={true} zid={101}>
              <div className="inner search-cover">
                <h3 className="tit1 mb0">신청 내역 상세</h3>
                <form className="auction-form step4">
                  <fieldset>
                    <legend className="away">신청 내역 상세</legend>
                    <table className="table-tp1 mt24" summary="계약자 정보에 대한 내용">
                      <caption className="fs14 tx-n">계약자 정보</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>계약자</th>
                          <td>김현대</td>
                        </tr>
                        <tr>
                          <th>휴대폰 번호</th>
                          <td>010-0000-0125</td>
                        </tr>
                        <tr>
                          <th className="ver-t">배송주소</th>
                          <td>서울 강남구 테헤란로 301 삼정개발빌딩</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table-tp1 mt24" summary="결제내역에 대한 내용">
                      <caption className="fs14 tx-n">결제내역</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>차량가격</th>
                          <td>12,234,000원</td>
                        </tr>
                        <tr>
                          <th>이전관리비</th>
                          <td>12,234,000원</td>
                        </tr>
                        <tr>
                          <th>현대 오토벨 보증비</th>
                          <td>12,234,000원</td>
                        </tr>
                        <tr>
                          <th>홈서비스 이용료</th>
                          <td>12,234,000원</td>
                        </tr>
                        <tr>
                          <th>탁송비</th>
                          <td>12,234,000원</td>
                        </tr>
                        <tr>
                          <th className="tx-b tx-black">총 결제 금액</th>
                          <td className="tx-b tx-black">12,234,000원</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table-tp1 mt8" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>결제방식</th>
                          <td>할부+계좌이체</td>
                        </tr>
                        <tr>
                          <th>이체금액</th>
                          <td>1,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>
              </div>
              <Button className="fixed" size="full" background="blue80" title="확인" height={56} href="" />
            </MobBottomArea>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-service-sec">
          <div className="mypage-admin-title">
            <h3>홈서비스 예약/판매 현황</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>진행상태</th>
                  <td>
                    <CheckBox id='chk-all' title='전체' />
                    <CheckBox id='chk-reserve' title='예약완료' />
                    <CheckBox id='chk-payment' title='결제완료' />
                    <CheckBox id='chk-on-deliver' title='탁송중' />
                    <CheckBox id='chk-off-deliver' title='탁송완료' />
                    <CheckBox id='chk-buy' title='구매확정' />
                    <CheckBox id='chk-cancle' title='취소' />
                  </td>
                </tr>
                <tr>
                  <th>판매완료일</th>
                  <td>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <Button size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                    <Button className="on" size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td><p className="tx-exp-tp6">(* 최대 [6개월] 까지 조회 가능합니다.)</p></td>
                </tr>
              </tbody>
            </table>

            <p className="inquire-num mb16">차량 수 : 총 2대</p>
            {
              withoutList === false
                ? (
                  <>
                  <table className="table-tp1" summary="차량정보에 대한 내용">
                    <caption className="away">차량정보</caption>
                    <colgroup>
                      <col width="31.5%" />
                      <col width="12.5%" />
                      <col width="16%" />
                      <col width="20%" />
                      <col width="20%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td rowSpan="6" className="img-cover">
                          <div className="img-wrap">
                            <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                          </div>
                          <Button size="full" line="blue80" color="blue80" title="예약 완료" height={48} marginTop={12} />
                        </td>
                        <th>차량정보</th>
                        <td colSpan="3" className="car-info">
                          현대 투싼 ix 디젤 2WD LX20 럭셔리
                          <Button color="blue80" title="바로가기" width={100} />
                        </td>
                      </tr>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="3">34구0912</td>
                      </tr>
                      <tr>
                        <th>계약자</th>
                        <td>김현대</td>
                        <th>등록일</th>
                        <td>2019-09-11 13:56</td>
                      </tr>
                      <tr>
                        <th>휴대폰 번호</th>
                        <td>010-0000-0125</td>
                        <th>EW상품</th>
                        <td>오토벨 EW Lv1</td>
                      </tr>
                      <tr>
                        <th>배송주소</th>
                        <td colSpan="3">서울 강남구 테헤란로 301 삼정개발빌딩</td>
                      </tr>
                      <tr>
                        <th>차량금액</th>
                        <td>10,000,000원</td>
                        <th>
                          총 결제금액
                           <Tooltip placement="bottom" event="click" width={394}>
                            <TooltipItem>
                              <i className="ico-question"></i>
                            </TooltipItem>
                            <TooltipCont>
                              <table className="table-tp1 total-pay" summary="총 결제금액에 대한 내용">
                                <caption className="away">총 결제금액</caption>
                                <colgroup>
                                  <col width="50%" />
                                  <col width="50%" />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th>차량가격</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>이전 관리비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>현대오토벨 보증비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>홈서비스 이용료</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>탁송비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>총 결제금액</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>결제방식</th>
                                    <td>할부+계좌이체</td>
                                  </tr>
                                  <tr>
                                    <th>이체금액</th>
                                    <td>1,000원</td>
                                  </tr>
                                </tbody>
                              </table>
                            </TooltipCont>
                          </Tooltip>
                        </th>
                        <td>12,123,000원</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table-tp1" summary="차량정보에 대한 내용">
                    <caption className="away">차량정보</caption>
                    <colgroup>
                      <col width="31.5%" />
                      <col width="12.5%" />
                      <col width="16%" />
                      <col width="20%" />
                      <col width="20%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td rowSpan="6" className="img-cover">
                          <div className="img-wrap">
                            <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                          </div>
                          <Button size="full" line="blue80" color="blue80" title="예약 완료" height={48} marginTop={12} />
                        </td>
                        <th>차량정보</th>
                        <td colSpan="3" className="car-info">
                          현대 투싼 ix 디젤 2WD LX20 럭셔리
                          <Button color="blue80" title="바로가기" width={100} />
                        </td>
                      </tr>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="3">34구0912</td>
                      </tr>
                      <tr>
                        <th>계약자</th>
                        <td>김현대</td>
                        <th>등록일</th>
                        <td>2019-09-11 13:56</td>
                      </tr>
                      <tr>
                        <th>휴대폰 번호</th>
                        <td>010-0000-0125</td>
                        <th>EW상품</th>
                        <td>오토벨 EW Lv1</td>
                      </tr>
                      <tr>
                        <th>배송주소</th>
                        <td colSpan="3">서울 강남구 테헤란로 301 삼정개발빌딩</td>
                      </tr>
                      <tr>
                        <th>차량금액</th>
                        <td>10,000,000원</td>
                        <th>
                          총 결제금액
                          <Tooltip placement="bottom" event="click" width={394}>
                            <TooltipItem>
                              <i className="ico-question"></i>
                            </TooltipItem>
                            <TooltipCont>
                              <table className="table-tp1 total-pay" summary="총 결제금액에 대한 내용">
                                <caption className="away">총 결제금액</caption>
                                <colgroup>
                                  <col width="50%" />
                                  <col width="50%" />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th>차량가격</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>이전 관리비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>현대오토벨 보증비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>홈서비스 이용료</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>탁송비</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>총 결제금액</th>
                                    <td>12,234,000원</td>
                                  </tr>
                                  <tr>
                                    <th>결제방식</th>
                                    <td>할부+계좌이체</td>
                                  </tr>
                                  <tr>
                                    <th>이체금액</th>
                                    <td>1,000원</td>
                                  </tr>
                                </tbody>
                              </table>
                            </TooltipCont>
                          </Tooltip>
                        </th>
                        <td>12,123,000원</td>
                      </tr>
                    </tbody>
                  </table>
                  </>
                ) : (
                  <div className="list-none">
                    <p><i className="ico-notify-big"></i>예약이 없습니다.</p>
                  </div>
              )
            }
            <div className="essential-point">
              <ul>
                <li><i className="ico-dot mid"></i> 구매자가 구매확정 시 차량대금이 정산 및 입금됩니다. (구매확정일로부터 3영업일 이내)</li>
                <li><i className="ico-dot mid"></i> 홈서비스 구매신청이 접수된 경우 판매자분께 유선으로 홈서비스 진행여부를 확인한 뒤, 홈서비스 고객 상담이 진행됩니다.<br />홈서비스 담당자의 전화를 꼭 받아주세요.</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  )
}

export default withRouter(DealerSell04);