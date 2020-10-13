import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLiveRefund from '@src/components/common/MobLiveRefund';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import PageNavigator from '@src/components/common/PageNavigator';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Link from 'next/link';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

/*
html 변경이력
  03.17 : 증빙선택 추가  #a1 참고 부분       
*/

const DealerSell06 = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [refundPopupShow, setRefundPopupShow, openRefundPopup, closeRefundPopup] = useRodal(false, true);
  const [shotReservePopupShow, setShotReservePopupShow, openShotReservePopup, closeShotReservePopup] = useRodal(false);
  const [cancelPop, setCancelPopShow, openCancelPop, closeCancelPop] = useRodal(false, true);

  const [liveShotStep, setLiveShotStep] = useState(1);
  const handleStep = useCallback((num, kind) => (e) => {
    e.preventDefault();
    kind === "studio" ? setLiveStudioStep(num) : setLiveShotStep(num);
  }, []);
  const [carData, setCarData] = useState(true);
  const handleResult = (result) => (e) => {
    e.preventDefault();
    setCarData(result);
  }
  
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Studio 촬영 예약 현황',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    const now = moment();

    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

    // 이용서비스 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
    }
    // 달력 선택
    const handleBtnFilterClick2 = (label, e) => {
      console.log(label);
    }

    // 취소/환불안내 팝업
    const [fpRefund, setFpRefund] = useState(false);
    const handleFullpagePopup = useCallback((name) => (e) => {
      e.preventDefault();
      if (name === "refund") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '취소/환불 안내',
            options: ['close']
          }
        });
        setFpRefund(true)
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [fpRefund]);
    return (
      <AppLayout>
        <div className="mypage-state-sec dealer-live-sec pt20">
          <div className="mypage-admin-title pdside20">
            <p className="tx-exp-tp5">&#8251; 접수가 완료된 예약은 변경이 불가합니다.</p>
            <p className="tx-exp-tp5">&#8251; 차량 광고가는 예약시 광고가이며, 차량 광고 후 변경되는 금액는 반영되지 않습니다.</p>
            <p className="tx-exp-tp5">&#8251; 예약 취소는 웹사이트 및 지점에서 가능하며, 취소요구시 위약금이 발생될 수 있습니다.
            <Button size="sml" color="gray" title="자세히보기" marginLeft={20} onClick={handleFullpagePopup("refund")} /></p>
            <Buttons align="center" marginTop={24} marginBottom={16}>
              <Button size="mid" background="blue20" color="blue80" radius={true} title="Live Studio 예약" fontWeight={500} width={48} height={38} measure={'%'} href="/mypage/dealerSell06Studio01" />
              <Button size="mid" background="blue80" radius={true} title="Live Shot 예약" background="blue80" fontWeight={500} width={48} height={38} measure={'%'} marginLeft={4} mgMeasure={'%'} href="/mypage/dealerSell06Shot01" />
            </Buttons>
          </div>

          <ul className={withoutList ? "m-toggle-list search pdside20 none" : "m-toggle-list search pdside20"}>
            <MenuItem>
              <MenuTitle>내차팔기 현황<span>상세조회</span></MenuTitle>
              <MenuCont>
                <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="72%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이용서비스</th>
                      <td>
                        <MobButtonFilter checkList={[
                          { title: "전체", checked: true },
                          { title: "Live Studio", checked: false },
                          { title: "Live Shot", checked: false }
                        ]} onClick={handleBtnFilterClick1} />
                      </td>
                    </tr>
                    <tr>
                      <th>결제수단</th>
                      <td>
                        <MobSelectBox options={[
                          { id: 'radio1', value: 1, checked: true, disabled: false, label: '전체' },
                          { id: 'radio2', value: 2, checked: false, disabled: false, label: '무통장(입금완료)' },
                          { id: 'radio3', value: 3, checked: false, disabled: false, label: '무통장(미입금)' },
                          { id: 'radio4', value: 4, checked: false, disabled: false, label: '카드결제' }
                        ]} width='100%' />
                      </td>
                    </tr>
                    <tr>
                      <th>진행상태</th>
                      <td>
                        <MobSelectBox options={[
                          { id: 'radio5', value: 1, checked: true, disabled: false, label: '전체' },
                          { id: 'radio6', value: 2, checked: false, disabled: false, label: '예약완료' },
                          { id: 'radio7', value: 3, checked: false, disabled: false, label: '촬영완료' },
                          { id: 'radio8', value: 4, checked: false, disabled: false, label: '취소' }
                        ]} width='100%' />
                      </td>
                    </tr>
                    <tr>
                      <th>차량번호</th>
                      <td><Input type="text" placeHolder="" id="input-tp1" width='100%' /></td>
                    </tr>
                  </tbody>
                </table>
                <MobButtonFilter checkList={[
                  { title: "15일", checked: true },
                  { title: "1개월", checked: false },
                  { title: "3개월", checked: false },
                  { title: "6개월", checked: false }
                ]} onClick={handleBtnFilterClick2} />
                <div className="mt8">
                  <DatePicker defaultValue={now} width='46%' />
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width='46%' />
                </div>
                <Input type="number" height={40} placeHolder="차량명을 검색하세요" marginTop={8} />
                <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} />
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
        <div className="content-wrap content-border pt8">
          {
            withoutList === true
              ? (
                <div className="list-none-wrap">
                  <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="goods-list admin-list tp6">
                  <ul>
                    <li>
                      <div className="summary">
                        <ul className="date">
                          <li>2019.09.16<span className="time">18:04</span></li>
                          <li className="state">결제완료</li>
                        </ul>
                        <div className="float-wrap mt10">
                          <h5 className="subject mt0">Live Studio</h5>
                          <p className="price-tp9">260,000<span className="won tx-black">만원</span></p>
                        </div>
                        <div className="info-wrap mt16">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="summary">
                        <ul className="date">
                          <li>2019.09.16<span className="time">18:04</span></li>
                          <li className="state">결제완료</li>
                        </ul>
                        <div className="float-wrap mt10">
                          <h5 className="subject mt0">Live Shot</h5>
                          <p className="price-tp9">260,000<span className="won tx-black">만원</span></p>
                        </div>
                        <div className="info-wrap mt16">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )
          }
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={24}>
          {fpRefund && <MobLiveRefund />}
        </MobFullpagePopup>
      </AppLayout >
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-live-sec">
          <div className="top-banner">
            <p>Live Shot 촬영을<br />예약하세요.</p>
            <div className="btn-wrap">
              {/* <Button size="full" line="white" color="white" radius={true} title="Live Studio란?" marginTop={19} href="/mypage/dealerSell06_01" /> */}
              <Button size="full" line="white" color="white" radius={true} title="예약하기" marginTop={81} onClick={(e) => openShotReservePopup(e, "fade")} />
            </div>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th>이용서비스</th>
                  <td>
                    <SelectBox id="select1" className="items-sbox" options={[
                      { value: '1', label: '서비스 전체' },
                      { value: '2', label: 'Live studio' },
                      { value: '2', label: 'Live shot' }
                    ]} width={246} placeHolder="서비스 전체" />
                    <span className="title">결제수단</span>
                    <SelectBox id="select1" className="items-sbox" options={[
                      { value: '1', label: '전체' },
                      { value: '2', label: '무통장(입금완료)' },
                      { value: '2', label: '무통장(미입금)' },
                      { value: '2', label: '카드결제' }
                    ]} width={176} placeHolder="전체" />
                  </td>
                </tr>
                <tr>
                  <th>차량번호</th>
                  <td>
                    <Input type="text" width={246} height={40} />
                    <span className="title">상태</span>
                    <SelectBox id="select1" className="items-sbox" options={[
                      { value: '1', label: '전체' },
                      { value: '2', label: '예약완료' },
                      { value: '2', label: '촬영완료' },
                      { value: '2', label: '입금대기' },
                      { value: '2', label: '취소완료' }
                    ]} width={176} />
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} className="fr" />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table-tp1 th-c td-c" summary="예약리스트에 대한 내용">
              <caption className="away">예약리스트</caption>
              <colgroup>
                <col width="6%" />
                <col width="17%" />
                <col width="12%" />
                <col width="19%" />
                <col width="19%" />
                <col width="17%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>예약 일시</th>
                  <th>신청장소</th>
                  <th>차량번호</th>
                  <th>결제금액</th>
                  <th>결제수단</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2019-09-16<br />11:00</td>
                  <td>강남</td>
                  <td>11가 3456</td>
                  <td>230,000원</td>
                  <td>무통장<br />(입금완료)</td>
                  <td>
                    예약완료
                    <Button size="sml" line="gray" radius={true} title="예약취소" width={62} marginTop={3} onClick={(e) => openCancelPop(e, "fade")} />
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2019-09-16<br />11:00</td>
                  <td>강남</td>
                  <td>11가 3456</td>
                  <td>230,000원</td>
                  <td>카드결제</td>
                  <td>촬영완료</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2019-09-16<br />11:00</td>
                  <td>강남</td>
                  <td>11가 3456</td>
                  <td>230,000원</td>
                  <td>카드결제</td>
                  <td>촬영완료</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2019-09-16<br />11:00</td>
                  <td>강남</td>
                  <td>11가 3456</td>
                  <td>230,000원</td>
                  <td>무통장<br />(입금완료)</td>
                  <td>
                    입금대기
                    <Button size="sml" line="gray" radius={true} title="예약취소" width={62} marginTop={3} onClick={(e) => openCancelPop(e, "fade")} />
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2019-09-16<br />11:00</td>
                  <td>강남</td>
                  <td>11가 3456</td>
                  <td>230,000원</td>
                  <td>무통장<br />(미입금)</td>
                  <td>취소</td>
                </tr>
              </tbody>
            </table>
            <PageNavigator recordCount={50} />
            <div className="essential-point tp2">
              <ul>
                <li>접수가 완료된 예약은 변경이 불가합니다.</li>
                <li>차량 광고가는 예약시 광고가이며, 차량 광고 후 변경되는 금액는 반영되지 않습니다.</li>
                <li>예약 취소는 웹사이트 및 지점에서 가능하며, 취소요구시 위약금이 발생될 수 있습니다.<Button size="mid" line="gray" color="black" radius={true} title="자세히보기" width={100} marginLeft={10} onClick={(e) => openRefundPopup(e, "fade")} /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={refundPopupShow} type={'fade'} closedHandler={closeRefundPopup} title="취소/환불 안내" mode="normal" size="large">
        <div className="con-wrap popup-refund">
          <div className="essential-point tp2">
            <ul>
              <li>카드결제 취소는 위약금을 제외 후 부분취소 됩니다.</li>
              <li>무통장입금 환불요청 시 입금자의 통장사본이 필요하며, 통장사본 접수 이후 최대 7일(영업일 기준) 이내 환불 완료됩니다.</li>
            </ul>
          </div>
          <table className="table-tp1 th-c td-c" summary="Live studio 취소/환불에 대한 내용">
            <caption>Live studio</caption>
            <colgroup>
              <col width="18%" />
              <col width="54%" />
              <col width="28%" />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>취소위약금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="4">전일예약</td>
                <td>결제당일 영업시간(18:00) 이전까지</td>
                <td>전액환불</td>
              </tr>
              <tr>
                <td>결제당일 영업시간(18:00) 이후부터 - 예약시간 1시간까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
              <tr>
                <td rowSpan="3">당일예약</td>
                <td>예약시간 1시간 전까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
            <tbody>
            </tbody>
          </table>
          <table className="table-tp1 th-c td-c" summary="Live studio 취소/환불에 대한 내용">
            <caption>Live shot</caption>
            <colgroup>
              <col width="18%" />
              <col width="54%" />
              <col width="28%" />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>취소위약금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="4">전일예약</td>
                <td>결제당일 영업시간(18:00) 이전까지</td>
                <td>전액환불</td>
              </tr>
              <tr>
                <td>결제당일 영업시간(18:00) 이후부터 - 예약시간 1시간까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
              <tr>
                <td rowSpan="3">당일예약</td>
                <td>예약시간 1시간 전까지</td>
                <td>위약금 10% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 1시간 전 - 예약시간 30분 전까지</td>
                <td>위약금 50% 공제 후 환불</td>
              </tr>
              <tr>
                <td>예약시간 30분전 - 예약시간 경과 후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
            <tbody>
            </tbody>
          </table>
        </div>
      </RodalPopup>

      <RodalPopup show={shotReservePopupShow} type={'fade'} closedHandler={closeShotReservePopup} title="Live Shot 촬영 예약" mode="normal" size="medium">
        <div className="popup-reserve">
          <div className="reserve-step">
            <Steps type={2} contents={['차량정보 입력', '주소/예약시간 선택', '결제하기', '예약완료']} active={liveShotStep} />
          </div>
          {/* step01 */}
          {liveShotStep === 1 && (
            <div className="reserve-wrap">
              <table className="table-tp1 input search pd" summary="조회 영역">
                <caption className="away">조회 영역</caption>
                <tbody>
                  <tr>
                    <th>차량번호 입력</th>
                    <td>
                      <Input type="text" width={256} />
                      <Button size="big" background="gray" title="조회" width={127} marginLeft={16} onClick={handleResult(false)} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <form className="register-form">
                <fieldset>
                  <legend className="away">차량 기본 정보</legend>
                  <table className="table-tp1" summary="차량 기본 정보에 대한 내용">
                    {carData
                      ? <caption>차량 기본 정보</caption>
                      : <caption>조회되는 차량정보가 없습니다. 직접입력해주세요.</caption>}
                    <colgroup>
                      <col width="17%" />
                      <col width="23%" />
                      <col width="17%" />
                      <col width="43%" />
                    </colgroup>
                    <tbody>
                      {
                        carData
                          ? (
                            <>
                              <tr>
                                <th>차량 번호</th>
                                <td>03라4567</td>
                                <th>차량명</th>
                                <td>기아 K3 쿱 1.6 터보 GDI 프레스티지
                                <i className="ico-pencil" onClick={(e) => rodalPopupHandler(e, "fade")}></i>
                                </td>
                              </tr>
                              <tr>
                                <th>최초등록일</th>
                                <td>2017-05-07</td>
                                <th>형식 년도</th>
                                <td>2018</td>
                              </tr>
                              <tr>
                                <th>색상</th>
                                <td>검정</td>
                                <th>연료</th>
                                <td>가솔린</td>
                              </tr>
                              <tr>
                                <th>배기량</th>
                                <td>1,591 cc</td>
                                <th>차종</th>
                                <td>준중형차</td>
                              </tr>
                            </>
                          ) : (
                            <tr>
                              <th>차량번호</th>
                              <td>
                                <label htmlFor="car-num" className="hide">차량번호</label>
                                <Input type="text" value="47러0383" id="car-num" width={160} height={40} />
                              </td>
                              <th>차량명</th>
                              <td>
                                <SelectBox id="car-name" className="items-sbox" options={select1_list} width={180} height={40} placeHolder="제조사 / 모델 / 등급" />
                              </td>
                            </tr>
                          )
                      }
                    </tbody>
                  </table>
                </fieldset>
              </form>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(2, "shot")} />
              </Buttons>
              <div className="essential-point">
                <ul>
                  <li>- 토·일요일 및 공휴일은 예약 불가</li>
                  <li>- 전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                  <li>- 수입차 진단지점 :강남,강서,부천상동,북천안,대전,광주,장한평,인천,서부산,광명,SAG성능제휴장,수원,김포,대구동구,<br />부천,서운,유량,양천로,남대구지점,북대구</li>
                </ul>
              </div>
            </div>
          )}
          {liveShotStep === 2 && (
            <div className="reserve-wrap">
              <table className="table-tp1 input search" summary="조회 영역">
                <caption className="away">조회 영역</caption>
                <colgroup>
                  <col width="13.1%" />
                  <col width="86.9%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>방문주소 입력</th>
                    <td>
                      <span className="bridge2">
                        <Input type="text" width={387} />
                        <Button size="big" background="gray" title="주소검색" width={160} marginLeft={16} />
                      </span>
                      <Input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>방문일자 선텍</th>
                    <td>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date1', value: 1, checked: true, disabled: false, title: '2019년 10월 04일(금) 오전' },
                          { id: 'date2', value: 2, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date3', value: 3, checked: true, disabled: false, title: '2019년 10월 07일(월) 오전' },
                          { id: 'date4', value: 4, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                      <span className="bridge2">
                        <RadioGroup dataList={[
                          { id: 'date5', value: 5, checked: true, disabled: false, title: '2019년 10월 04일(월) 오전' },
                          { id: 'date6', value: 6, checked: false, disabled: false, title: '2019년 10월 04일(금) 오후' }
                        ]} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point">
                <ul>
                  <li>- 예약일자 다음날부터 3일후까지 예약이 가능합니다.</li>
                  <li>- 토·일요일 및 공휴일은 예약 불가</li>
                </ul>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree3' title='라이브샷 이용약관 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="agree-terms-wrap">
                <CheckBox id='chk-agree4' title='환불규정 안내 (필수)' />
                <div className="terms-wrap">

                </div>
              </div>

              <div className="essential-point tp2">
                <ul>
                  <li>지점 이용은 <b>당일/전일 예약제로 운영</b>되며, 당일 방문은 받지 않습니다.</li>
                  <li>예약시 <b>10분이내 결제가 이루어지지 않으면 예약은 취소</b>되고, 선택한 시간은 무효가 됩니다.</li>
                  <li>예약 <b>취소요구시 위약금이 발생</b>될 수 있습니다.</li>
                  <li>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                  <li>오토벨보증 이용권 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                </ul>
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(3, "shot")} />
              </Buttons>
            </div>
          )}
          {liveShotStep === 3 && (
            <div className="reserve-wrap payment-sec method">
              <h3 className="sub-tit">이용권 정보</h3>
              <div className="point-area">
                <div className="pay-detail">
                  <div className="pick-list">
                    <ul>
                      <li>Live shot 이용권</li>
                    </ul>
                    <div className="sum">
                      <p className="price">150,000<span>원</span></p>
                    </div>
                  </div>
                </div>
                <div className="coupon-wrap">
                  <div className="coupon">
                    <CheckBox id='chk4' title='쿠폰 적용' />
                    <p>적용 가능한 보유쿠폰<span>3</span>장</p>
                  </div>
                  <RadioGroup
                    dataList={[
                      { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                      { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                      { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                    ]} defaultValue={1} size="small" mode="vertical"
                  ></RadioGroup>
                  <p className="ex">
                    신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.
                  </p>
                </div>
              </div>
              <div className="last-sum">
                <ul>
                  <li>이용권금액<span>24,000<em>원</em></span></li>
                  <li>할인금액<span>0<em>원</em></span></li>
                  <li>최종결제금액<span>24,000<em>원 (VAT 포함)</em></span></li>
                </ul>
              </div>

              <div className="method-wrap">
                <p>결제 수단</p>
                <RadioGroup
                  dataList={[
                    { id: 'radio4', value: 1, checked: true, disabled: false, title: '신용카드' },
                    { id: 'radio5', value: 2, checked: false, disabled: false, title: '휴대전화' },
                    { id: 'radio6', value: 3, checked: false, disabled: false, title: '무통장입급' },
                    { id: 'radio7', value: 4, checked: false, disabled: false, title: '카카오페이' },
                    { id: 'radio8', value: 5, checked: false, disabled: false, title: '네이버페이' }
                  ]} defaultValue={1}
                ></RadioGroup>
              </div>

              {/* #a1 증빙선택 추가 start */}   
              <div className="method-wrap col2  mt40">
                <p>증빙 선택</p>
                <RadioGroup
                  dataList={[
                    { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                    { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }                                  
                  ]} defaultValue={1}
                ></RadioGroup>
                <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
              </div>
               {/* #a1 증빙선택 추가 end */}  

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음단계" width={172} height={60} mode="normal" onClick={handleStep(4, "shot")} />
              </Buttons>
            </div>
          )}
          {liveShotStep === 4 && (
            <div className="reserve-wrap co-wrap">
              <p className="tit">예약이 완료되었습니다.</p>
              <p className="exp">예약 현황은 마이페이지  Live Service 촬영예약에서 확인 가능합니다.</p>
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" href="/mypage/dealerSell01" />
                <Button size="big" background="gray" title="예약조회로 이동" width={172} height={60} href="/mypage/dealerSell06" />
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>

      <RodalPopup show={cancelPop} type={'fade'} closedHandler={closeCancelPop} mode="normal" size="xs">
        <div className="con-wrap">
          <p>예약취소 하시겠습니까?</p>
          <Buttons align="center" marginTop={64}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout >
  )
}

export default withRouter(DealerSell06);