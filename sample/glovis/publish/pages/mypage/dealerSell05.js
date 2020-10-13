import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
/*
  html 변경이력
  03.12 : #a1 추가
        : + 행삭제 ->  - 행삭제로 변경
*/
const DealerSell05 = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  const now = moment();
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

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
        title: '보증차량 판매현황',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="dealer-assure-sec pt0">
          <div className="content-wrap">
            <div className="mt20">
              <p className="tx-exp-tp5 tx-gray mt0">&#8251; PC 에서는 EXCEL 문서로 등록이 가능하며, 모바일에서는 직접입력을 통해 등록하실 수 있습니다.</p>
              <Buttons align="right" marginBottom={12}>
                <Button size="sml" line="gray" radius={true} title="판매정보 입력" width={84} height={24} href="/mypage/dealerSell05" />
              </Buttons>
            </div>
            <ul className={withoutList ? "m-toggle-list search mb0 none" : "m-toggle-list search mb0"}>
              <MenuItem>
                <MenuTitle><p className="tit2">보증차량 판매현황</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">판매유형</p>
                    <MobSelectBox placeHolder="전체" options={[
                      { id: 'sell-type1', value: 1, checked: true, disabled: false, label: '전체' },
                      { id: 'sell-type2', value: 2, checked: false, disabled: false, label: '홈서비스판매' },
                      { id: 'sell-type3', value: 3, checked: false, disabled: false, label: '오프라인판매' }
                    ]} width='70%' />
                  </div>
                  <MobButtonFilter checkList={[
                    { title: "15일", checked: false },
                    { title: "1개월", checked: true },
                    { title: "3개월", checked: false },
                    { title: "6개월", checked: false }
                  ]} onClick={handleBtnFilterClick1} />
                  <div className="mt8">
                    <DatePicker defaultValue={now} width='46%' />
                    <em className="from">~</em>
                    <DatePicker defaultValue={now} width='46%' />
                  </div>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                </MenuCont>
              </MenuItem>
              {
                withoutList === true
                  ? (
                    <></>
                  ) : (
                    <li>
                      <div className="float-wrap">
                        <p>2019.08.17 ~ 2019.09.16</p>
                        <p>총 <span className="tx-blue80">2</span>건</p>
                      </div>
                    </li>
                  )}
            </ul>
          </div>
          <div className="list-wrap content-border">
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap">
                    <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                  </div>
                ) : (
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
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
            }


            <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
            <MobBottomArea active={active} isFixButton={true}>
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

        <div className="mypage-state-sec dealer-assure-sec">
          <div className="mypage-admin-title">
            <h3>보증차량 판매현황</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>판매일자</th>
                  <td>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <span className="wrap fr">
                      <span className="title">판매유형</span>
                      <SelectBox id="select1" className="items-sbox" options={select1_list} width={176} />
                      <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                    </span>
                  </td>
                </tr>
                {/* #a1 start */}
                <tr>
                  <th></th>
                  <td><p className="tx-exp-tp6">(* 최대 1년까지 조회 가능합니다.)</p></td>
                </tr>
                {/* #a1 end */}
              </tbody>
            </table>

            <table className="table-tp1 th-c td-c" summary="보증차량 판매현황에 대한 내용">
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="6%" />
                <col width="14%" />
                <col width="14%" />
                <col width="*" />
                <col width="10%" />
                <col width="10%" />
                <col width="12%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>판매일자</th>
                  <th>차량번호</th>
                  <th>차량명</th>
                  <th>고객명</th>
                  <th>보증상품명</th>
                  <th>상품금액</th>
                  <th>판매유형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2019.12.23</td>
                  <td>12노1234</td>
                  <td>현대 LF쏘나타 2.4 익스클루비스</td>
                  <td>남현대</td>
                  <td>오토벨 EW Lv.2</td>
                  <td>220,000</td>
                  <td>홈서비스</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2019.12.23</td>
                  <td>12노1234</td>
                  <td>현대 LF쏘나타 2.4 익스클루비스</td>
                  <td>남현대</td>
                  <td>오토벨 EW Lv.1</td>
                  <td>110,000</td>
                  <td>오프라인</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <Buttons align="right" marginTop={32}>
              <Button size="big" background="blue80" title="판매정보입력" width={150} href="/mypage/dealerSell05_01" />
            </Buttons>
            <PageNavigator recordCount={50} className="mt32" />
          </div>
        </div>
      </div>

      {/* <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" width={974}>
        <div className="popup-inventory">
          <Buttons align="right">
            <Button size="big" background="blue80" title="Excel로 등록" width={150} height={48} />
          </Buttons>
          <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
            <caption className="away">딜러정보 관리</caption>
            <colgroup>
              <col width="6%" />
              <col width="13%" />
              <col width="14%" />
              <col width="28%" />
              <col width="10%" />
              <col width="10%" />
              <col width="13%" />
              <col width="6%" />
            </colgroup>
            <thead>
              <tr>
                <th>NO.</th>
                <th>판매일자</th>
                <th>차량번호</th>
                <th>차량명</th>
                <th>고객명</th>
                <th>보증상품명</th>
                <th>상품금액</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i className="ico-delete"></i></td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i className="ico-delete"></i></td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i className="ico-delete"></i></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i className="ico-delete"></i></td>
              </tr>
              <tr>
                <td>5</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i className="ico-delete"></i></td>
              </tr>
            </tbody>
          </table>
          <Buttons align="left">
            <Button size="mid" line="gray" radius={true} title="+ 행추가" width={100} height={32} />
            <Button size="mid" line="gray" radius={true} title="- 행삭제" width={100} height={32} />
          </Buttons>
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="등록" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup> */}

    </AppLayout>
  )
}

export default withRouter(DealerSell05);