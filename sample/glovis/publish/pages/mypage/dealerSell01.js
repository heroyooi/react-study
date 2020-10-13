import { useState, useCallback, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
import moment from 'moment';
import animateScrollTo from 'animated-scroll-to';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MypageFilterTab from '@src/components/common/MypageFilterTab';
import MypageManageList1 from '@src/components/common/MypageManageList1';
import MypageManageList2 from '@src/components/common/MypageManageList2';
import MypageManageList3 from '@src/components/common/MypageManageList3';
import MypageManageList4 from '@src/components/common/MypageManageList4';
import MypageManageList5 from '@src/components/common/MypageManageList5';
import MypageManageList6 from '@src/components/common/MypageManageList6';
import MypageManageList7 from '@src/components/common/MypageManageList7';
import MypageManagePopup from '@src/components/common/popup/MypageManagePopup';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobDealerSellAd from '@src/components/common/MobDealerSellAd';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobPayment from '@src/components/common/MobPayment';
import MobEffect from '@src/components/common/MobEffect';
import useToggle from '@lib/share/custom/useToggle';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem'; //#a6 
import Radio from '@lib/share/items/Radio';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { CSSTransition } from 'react-transition-group';
export const DealerContext = createContext();
/*
html 변경이력
03.12 : 기간연장 -> 광고연장 버튼명 변경, 자동결제신청, 자동결제취소 버튼 추가 
      : 테이블 1대열 삭제 및 금액수정 
      : 테이블 전체 수정, 타이틀 및 금액부분 수정 #a2 부분 참고
      : Bestpick 삭제 #a3 부분 참고
      : 증빙선택 항목 추가 #a4 부분 참고
      : 자동결제 팝업 #a5 부분 참고
      : 경매낙찰 이용권 행삭제,  #a6 참고
      : 경매낙찰 전용권 부분 추가 #a7 참고
03.16 : 결제내역에 결제수단, 서비스 삭제 #a8 참고
      : 취소 및 환불안내 전체 내용추가 및 수정 #a9 참고       
      : 업데이트 자유권 관리 팝업 추가 #a10 참고
        
*/

const DealerSell01 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const now = moment();

  // 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false, true);
  const [rodalShow5, setRodalShow5, rodalPopupHandler5, modalCloseHandler5] = useRodal(false, true);
  const [rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6] = useRodal(false, true);
  const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, true);
  const [rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8] = useRodal(false, true);
  const [rodalShow9, setRodalShow9, rodalPopupHandler9, modalCloseHandler9] = useRodal(false, true);
  const [rodalShow9_1, setRodalShow9_1, rodalPopupHandler9_1, modalCloseHandler9_1] = useRodal(false, true);
  const [rodalShow10, setRodalShow10, rodalPopupHandler10, modalCloseHandler10] = useRodal(false, true);
  const [rodalShow11, setRodalShow11, rodalPopupHandler11, modalCloseHandler11] = useRodal(false, true);
  const [rodalShow11_1, setRodalShow11_1, rodalPopupHandler11_1, modalCloseHandler11_1] = useRodal(false, true);
  const [rodalShow12, setRodalShow12, rodalPopupHandler12, modalCloseHandler12] = useRodal(false, true);
  const [rodalShow13, setRodalShow13, rodalPopupHandler13, modalCloseHandler13] = useRodal(false, true);
  const [rodalShow13_1, setRodalShow13_1, rodalPopupHandler13_1, modalCloseHandler13_1] = useRodal(false, true);
  const [rodalShow14, setRodalShow14, rodalPopupHandler14, modalCloseHandler14] = useRodal(false, true);
  const [rodalShow15, setRodalShow15, rodalPopupHandler15, modalCloseHandler15] = useRodal(false, true);
  const [rodalShow16, setRodalShow16, rodalPopupHandler16, modalCloseHandler16] = useRodal(false); // #a5 행추가
  const [rodalShow17, setRodalShow17, rodalPopupHandler17, modalCloseHandler17] = useRodal(false); // #a10 행추가
  const [rodalShow18, setRodalShow18, rodalPopupHandler18, modalCloseHandler18] = useRodal(false); // #a9 행추가
  const [depositPop, setDepositPop, openDepositPop, closeDepositPop] = useRodal(false, true);
  const [noGroupIdPop, setNoGroupIdPop, openNoGroupIdPop, closeNoGroupIdPop] = useRodal(false, true);
  const [noGroupIdPop1, setNoGroupIdPop1, openNoGroupIdPop1, closeNoGroupIdPop1] = useRodal(false, true);
  const [noGroupIdPop2, setNoGroupIdPop2, openNoGroupIdPop2, closeNoGroupIdPop2] = useRodal(false, true);
  const [adeffectPop, setAdeffectPop, openAdeffectPop, closeAdeffectPop] = useRodal(false, true);

  const [manageSection, setManageSection] = useState(1);

  const [usageDetailMore1, handleUsageDetail1] = useToggle(false);
  const [usageDetailMore2, handleUsageDetail2] = useToggle(false);
  const [usageDetailMore3, handleUsageDetail3] = useToggle(false);
  const [usageDetailMore4, handleUsageDetail4] = useToggle(false);

  const { result, member, seq } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
  const [memberType, setMemberType] = useState(member);
  // stop(이용 정지 회원), no-group-id(단체회원ID를 발급받지 않은 개인딜러)

  const [parentFilterMode, setParentFilterMode] = useState(1); // 부모탭
  const [childFilterMode, setChildFilterMode] = useState(1); // 자식탭
  const [carManageSelValue, setCarManageSelValue] = useState(0); // 등록관리 차량 셀렉트박스 값

  const [isValue1, setIsValue1] = useState(0);
  const [isValue2, setIsValue2] = useState(0);
  const [isValue3, setIsValue3] = useState(0);

  const [step, setStep] = useState(1);

  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);
  const handleChange2 = useCallback((e) => {
    e.preventDefault();
    setIsValue2(Number(e.target.value));
  }, [isValue2]);
  const handleChange3 = useCallback((e) => {
    e.preventDefault();
    setIsValue3(Number(e.target.value));
  }, [isValue3]);

  const handleStep = useCallback((step) => (e) => {
    e.preventDefault();
    setStep(step);
    animateScrollTo(document.querySelector('.dealer-advertise-sec'));
  }, [step]);

  const handleMember = useCallback((e) => {
    e.preventDefault();
    setMemberType("normal")
  }, [memberType]);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '등록차량 및 광고관리',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 8,
        color: '#fff'
      }
    });

    const [tabKey, setTabKey] = useState(1);
    const tabCallback = useCallback(key => {
      if (+key < 2) {
        setTabKey('first');
      } else if (+key >= 2 && +key < 5) {
        setTabKey(key);
      } else {
        setTabKey('last');
      }
    }, []);

    // 달력 기간 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
    }

    const [canclePop, setCanclePop, openCanclePop, closeDimmCanclePop] = useRodal(false);
    const [confirmPop, setConfirmPop, openConfirmPop, closeDimmConfirmPop] = useRodal(false);
    const closeCanclePop = useCallback(
      (e) => {
        e.preventDefault();
        setCanclePop(false);
      },
      [canclePop]
    );
    const closeConfirmPop = useCallback(
      (e) => {
        e.preventDefault();
        setConfirmPop(false);
        setCanclePop(false);
      },
      [confirmPop]
    );

    // 풀페이지 팝업
    const [fpFilter01, setFpFilter01] = useState(false); // 제조사,모델,등급 팝업
    const [fpAd, setFpAd] = useState(false); // 광고관리 > 상품안내 > 자세히 보기 팝업
    const [fpAdBuy, setFpAdBuy] = useState(false); // 광고관리 > 구입하기 > 이용권 구매 팝업
    const [fpPayment, setFpPayment] = useState(false); // 광고관리 > 결제내역 > 결제내역상세
    const [fpEffect, setFpEffect] = useState(false); // 광고관리 > 
    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "f1") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 선택',
            options: ['close'],
          }
        });
        setFpAd(false);
        setFpAdBuy(false);
        setFpPayment(false);
        setFpEffect(false);
        setFpFilter01(true);
      } else if (name === "ad") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '상품상세안내',
            options: ['close']
          }
        });
        setFpFilter01(false);
        setFpAdBuy(false);
        setFpPayment(false);
        setFpEffect(false);
        setFpAd(true);
      } else if (name === "adBuy") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '이용권 구매',
            options: ['close']
          }
        });
        setFpFilter01(false);
        setFpAd(false);
        setFpPayment(false);
        setFpEffect(false);
        setFpAdBuy(true);
      } else if (name === "payment") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '결제내역 상세',
            options: ['close']
          }
        });
        setFpFilter01(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpEffect(false);
        setFpPayment(true);
      } else if (name === "effect") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '등록차량 및 광고관리',
            options: ['close']
          }
        });
        setFpFilter01(false);
        setFpAd(false);
        setFpAdBuy(false);
        setFpPayment(false);
        setFpEffect(true);
      }
      setTimeout(() => {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }, 10);
    }, [fpFilter01, fpAd, fpAdBuy, fpPayment]);

    const [isTab, setIsTab] = useState(+seq === 2 ? 1 : 0);

    return (
      <AppLayout>
        <DealerContext.Provider value={{ withoutList, fpFilter01, handleFullpagePopup }}>
          <TabMenu type="type2" defaultTab={isTab} mount={true} fixTab={true}>
            <TabCont tabTitle="등록차량 관리(50)" id="tab2-1" index={0}>
              <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
                <Tabs
                  renderTabBar={() => <SwipeableInkTabBar pageSize={3} />}
                  renderTabContent={() => <TabContent />}
                  defaultActiveKey="1"
                  onChange={tabCallback}
                >
                  <TabPane tab="판매중(15)" data-extra="tabpane" key="1">
                    <MypageManageList1 />
                  </TabPane>
                  <TabPane tab="관리필요(2)" data-extra="tabpane" key="2">

                  </TabPane>
                  <TabPane tab="판단보류(1)" data-extra="tabpane" key="3">

                  </TabPane>
                  <TabPane tab="대기차량(7)" data-extra="tabpane" key="4">

                  </TabPane>
                  <TabPane tab="판매완료(10)" data-extra="tabpane" key="5">
                    <MypageManageList5 />
                  </TabPane>
                  <TabPane tab="삭제차량(10)" data-extra="tabpane" key="6">

                  </TabPane>
                  <TabPane tab="보류차량(3)" data-extra="tabpane" key="7">

                  </TabPane>
                </Tabs>
              </div>
            </TabCont>
            <TabCont tabTitle="광고 관리" id="tab2-2" index={1}>
              <div className={`tabmenu-swipe tp2 o-length-2 active-${tabKey}`}>
                <Tabs
                  renderTabBar={() => <SwipeableInkTabBar pageSize={3} />}
                  renderTabContent={() => <TabContent />}
                  defaultActiveKey="1"
                  onChange={tabCallback}
                >
                  <TabPane tab="광고이용권안내" data-extra="tabpane" key="1">
                    <div className="content-wrap content-border">
                      <ul className="payment-sec">
                        <li>
                          <table className="table-tp1 use" summary="사용중인 이용권에 대한 내용">
                            <caption>사용중인 이용권</caption>
                            <colgroup>
                              <col width="40%" />
                              <col width="60%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>자유이용권</th>
                                <td>
                                  <span><span className="tx-blue80">5</span>대 이용 중(10/10) <span className="date">D-78</span></span>
                                  <Button size="sml" line="gray" color="gray" radius={true} title="기간연장/대수추가하기" width={112} height={24} fontSize={10} marginTop={8} />
                                </td>
                              </tr>
                              <tr>
                                <th>대당이용권</th>
                                <td><span className="tx-blue80">5</span>대 이용 중</td>
                              </tr>
                              <tr>
                                <th>업데이트20</th>
                                <td><span className="tx-blue80">4</span>대 이용 중</td>
                              </tr>
                            </tbody>
                          </table>
                        </li>

                        <li>
                          <div className="float-wrap btn-s">
                            <h3 className="tit2">상품안내</h3>
                            <Button size="sml" line="gray" color="gray" radius={true} title="자세히보기" width={88} fontSize={12} fontWeight={500} onClick={handleFullpagePopup("ad")} />
                          </div>
                        </li>

                        <li>
                          <h3 className="tit2 mb16">기본상품</h3>
                          <ul className="tx-list">
                            <li>
                              <h5>경매 낙찰 이용권</h5>
                              <p>오토벨 경매장에서 낙찰받은 차량을 광고로 등록하실 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">최대 2개월</span>
                                <span className="price">50,000<span className="won">원</span></span>
                              </div>
                            </li>
                            <li>
                              <h5>대당 이용권</h5>
                              <p>차량 1대를 등록할 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">최대 2개월</span>
                                <span className="price">50,000<span className="won">원</span></span>
                              </div>
                            </li>
                            <li>
                              <div className="float-wrap btn-xs">
                                <h5>자유 이용권</h5>
                                <Button size="sml" background="blue80" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup("adBuy")} />
                              </div>
                              <p>선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.</p>
                              <ul>
                                <li>* 일반등록차량 리스트에 노출됩니다.</li>
                                <li>* 등록차량이 판매완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.</li>
                              </ul>
                              <div>
                                <span className="period">1개월 ~ 12개월</span>
                                <span className="price">27,000<span className="won">원~</span></span>
                              </div>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <h3 className="tit2 mb16">부가상품</h3>
                          <ul className="tx-list">
                            <li>
                              <h5>업데이트 20 (대당)</h5>
                              <p>차량 업데이트를 추가로 20회 할 수 있는 이용권입니다. 무료 4회 포함 24회 업데이트 할 수 있습니다.</p>
                              <div>
                                <span className="period">1대</span>
                                <span className="price">10,000<span className="won">원</span></span>
                              </div>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <h3 className="tit2 mb16">프라이싱 상품</h3>
                          <ul className="tx-list">
                            <li>
                              <div className="float-wrap btn-xs">
                                <h5>프라이싱 조회권</h5>
                                <Button size="sml" background="blue80" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup("adBuy")} />
                              </div>
                              <p>오토옥션에서 실제 거래되었던 차량의 낙찰가를 확인할 수 있는 이용권입니다.</p>
                              <div>
                                <span className="period">1~1,000회</span>
                                <span className="price">1,000<span className="won">원</span></span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tab="결제내역" data-extra="tabpane" key="2">
                    <div className="payment-tx-list content-border pt4">
                      <ul className="m-toggle-list search">
                        <MenuItem>
                          <MenuTitle>결제내역<span>상세조회</span></MenuTitle>
                          <MenuCont>
                            <div className="float-wrap mb16">
                              <p className="movie-link-wrap">결제수단</p>
                              <MobSelectBox placeHolder="전체" options={[
                                { id: 'payment1', value: 1, checked: true, disabled: false, label: '신용카드' },
                                { id: 'payment2', value: 2, checked: false, disabled: false, label: '휴대전화' },
                                { id: 'payment3', value: 3, checked: false, disabled: false, label: '무통장입금' },
                                { id: 'payment4', value: 4, checked: false, disabled: false, label: '쿠폰/포인트' },
                                { id: 'payment5', value: 5, checked: false, disabled: false, label: '간편결제' }
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
                        <li>
                          <div className="float-wrap">
                            <p>2019.08.17 ~ 2019.09.16</p>
                            <p>총 <span className="tx-blue80">2</span>건</p>
                          </div>
                        </li>
                      </ul>
                      <div className="eposit-tx-list content-border">
                        <ul className="m-toggle-list up-blue">
                          <MenuItem>
                            <MenuTitle>꼭 알아두세요!</MenuTitle>
                            <MenuCont>
                              <div className="essential-point tx-black">
                                <ul>
                                  <li><i className="ico-dot"></i>신용카드로 결제 시 카드매출전표가 발급되며, 세금계산서 대용으로 매입세액공제를 받으실 수 있습니다.</li>
                                  <li><i className="ico-dot"></i>휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.</li>
                                  <li className="chk"><i className="ico-check-gray"></i>단, 휴대전화 결제금액을 신용카드로 납부 시에는 발행되지 않습니다.</li>
                                  <li><i className="ico-dot"></i>무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)</li>
                                  <li><i className="ico-dot"></i>현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.</li>
                                  <li><i className="ico-dot"></i>세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)</li>
                                  <li><i className="ico-dot"></i>세금계산서 문의 : 고객센터 0000-0000)</li>
                                </ul>
                              </div>
                            </MenuCont>
                          </MenuItem>
                        </ul>
                        <ul className="pay-tx-list arrow">
                          <li>
                            <a onClick={handleFullpagePopup("payment")}>
                              <p className="mb16">대당 이용권 1개월</p>
                              <ul>
                                <li><span>결제일</span>2019.08.16</li>
                                <li><span>결제 번호</span>12373404</li>
                                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                                <li><span>결제 수단</span>무통장입금</li>
                              </ul>
                            </a>
                          </li>
                          <li>
                            <a onClick={handleFullpagePopup("payment")}>
                              <p className="mb16">대당 이용권 1개월</p>
                              <ul>
                                <li><span>결제일</span>2019.08.16</li>
                                <li><span>결제 번호</span>12373404</li>
                                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                                <li><span>결제 수단</span>휴대전화</li>
                              </ul>
                            </a>
                          </li>
                          <li>
                            <a onClick={handleFullpagePopup("payment")}>
                              <p className="mb16">대당 이용권 1개월</p>
                              <ul>
                                <li><span>결제일</span>2019.08.16</li>
                                <li><span>결제 번호</span>12373404</li>
                                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                                <li><span>결제 수단</span>휴대전화</li>
                              </ul>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="입금대기" data-extra="tabpane" key="3">
                    <div className="payment-tx-list content-border">
                      <div className="eposit-tx-list pt20">
                        <div className="float-wrap">
                          <h5 className="tit2">입금대기</h5>
                          <span>총 <span className="tx-blue80">123</span>건 (입금액 1,230,000원)</span>
                        </div>

                        <ul className="m-toggle-list up-blue">
                          <MenuItem>
                            <MenuTitle>꼭 알아두세요!</MenuTitle>
                            <MenuCont>
                              <div className="essential-point tx-black">
                                <ul>
                                  <li><i className="ico-dot"></i>입금대기 내역은 무통장 결제 시 입금확인이 되지 않은 내역입니다.</li>
                                  <li><i className="ico-dot"></i>입금확인이 되면 바로 결제내역으로 자동 이동되며, 입금예정일이 지난 내역은 자동 삭제됩니다.</li>
                                </ul>
                              </div>
                            </MenuCont>
                          </MenuItem>
                        </ul>
                        <ul className="pay-tx-list">
                          <li>
                            <div className="float-wrap">
                              <p className="fl">대당 이용권 1개월</p>
                              <Button size="sml" line="gray" color="gray" radius={true} title="취소" width={39} height={30} fontSize={12} fontWeight={500} onClick={(e) => openCanclePop(e, 'fade')} />
                            </div>
                            <ul>
                              <li><span>거래 일시</span>2019.08.16</li>
                              <li className="tx-blue80"><span>입금 상태</span>입금 대기</li>
                              <li><span>결제 계좌</span>우리은행 123-12-123456</li>
                              <li className="tx-b"><span>입금 금액</span>220,000원</li>
                            </ul>
                          </li>
                          <li>
                            <div className="float-wrap">
                              <p className="fl">대당 이용권 1개월</p>
                            </div>
                            <ul>
                              <li><span>거래 일시</span>2019.08.16</li>
                              <li className="tx-blue80"><span>입금 상태</span>취소요청중</li>
                              <li><span>결제 계좌</span>우리은행 123-12-123456</li>
                              <li className="tx-b"><span>입금 금액</span>220,000원</li>
                            </ul>
                          </li>
                          <li>
                            <div className="float-wrap">
                              <p className="fl">대당 이용권 1개월</p>
                              <Button size="sml" line="gray" color="gray" radius={true} title="취소" width={39} height={30} fontSize={12} fontWeight={500} onClick={(e) => openCanclePop(e, 'fade')} />
                            </div>
                            <ul>
                              <li><span>거래 일시</span>2019.08.16</li>
                              <li className="tx-blue80"><span>입금 상태</span>취소처리완료</li>
                              <li><span>결제 계좌</span>우리은행 123-12-123456</li>
                              <li className="tx-b"><span>입금 금액</span>220,000원</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="광고효과분석" data-extra="tabpane" key="4">
                    <div className="dealer-adeffect-sec content-border">
                      {
                        withoutList === true
                          ? (
                            <div className="list-none-wrap">
                              <p className="list-none">광고중인 차량이 없습니다.
                                <span>광고효과 분석은 차량 등록 후<br />48시간 이후 확인 하실 수 있습니다.</span>
                              </p>
                            </div>
                          ) : (
                            <ul className="admin-list-wrap">
                              <li>
                                <div className="goods-list admin-list tp4">
                                  <ul>
                                    <li>
                                      <span>
                                        <div className="img-cover">
                                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                        </div>
                                        <div className="summary">
                                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                          <div className="info-wrap">
                                            <div className="info">
                                              <span>00가 0000</span>
                                              <span>09/12식 (10년형)</span>
                                              <span>84,761km</span>
                                            </div>
                                            <div className="price-wrap float-wrap">
                                              <div className="price-left">
                                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                                              </div>
                                              <a onClick={handleFullpagePopup("effect")}>효과분석</a>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </li>
                                    <li>
                                      <span>
                                        <div className="img-cover">
                                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                        </div>
                                        <div className="summary">
                                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                          <div className="info-wrap">
                                            <div className="info">
                                              <span>00가 0000</span>
                                              <span>09/12식 (10년형)</span>
                                              <span>84,761km</span>
                                            </div>
                                            <div className="price-wrap float-wrap">
                                              <div className="price-left">
                                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                                              </div>
                                              <a onClick={handleFullpagePopup("effect")}>효과분석</a>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          )
                      }
                    </div>
                  </TabPane>
                  <TabPane tab="취소 및 환불안내" data-extra="tabpane" key="5">

                  </TabPane>
                </Tabs>
              </div>
            </TabCont>
          </TabMenu>
        </DealerContext.Provider>

        <RodalPopup show={canclePop} type={'fade'} width={380} closedHandler={closeDimmCanclePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>선택하신 입금대기 내역을 취소하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeCanclePop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={(e) => openConfirmPop(e, 'fade')} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={confirmPop} type={'fade'} width={380} closedHandler={closeDimmConfirmPop} isMask={false} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>취소신청이 완료되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={closeConfirmPop} />
            </Buttons>
          </div>
        </RodalPopup>

        <MobFullpagePopup active={mFullpagePopup}>
          {fpAd && <MobDealerSellAd mode="viewer" />}
          {fpAdBuy && <MobDealerSellAd />}
          {fpPayment && <MobPayment />}
          {fpEffect && <MobEffect withoutList={withoutList} />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <DealerContext.Provider value={{
        rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler,
        rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1,
        rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2,
        rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3,
        rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4,
        rodalShow5, setRodalShow5, rodalPopupHandler5, modalCloseHandler5,
        rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6,
        rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7,
        rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8,
        rodalShow9, setRodalShow9, rodalPopupHandler9, modalCloseHandler9,
        rodalShow9_1, setRodalShow9_1, rodalPopupHandler9_1, modalCloseHandler9_1,
        rodalShow10, setRodalShow10, rodalPopupHandler10, modalCloseHandler10,
        rodalShow11, setRodalShow11, rodalPopupHandler11, modalCloseHandler11,
        rodalShow11_1, setRodalShow11_1, rodalPopupHandler11_1, modalCloseHandler11_1,
        rodalShow12, setRodalShow12, rodalPopupHandler12, modalCloseHandler12,
        rodalShow13, setRodalShow13, rodalPopupHandler13, modalCloseHandler13,
        rodalShow13_1, setRodalShow13_1, rodalPopupHandler13_1, modalCloseHandler13_1,
        rodalShow14, setRodalShow14, rodalPopupHandler14, modalCloseHandler14,
        rodalShow15, setRodalShow15, rodalPopupHandler15, modalCloseHandler15,
        rodalShow16, setRodalShow16, rodalPopupHandler16, modalCloseHandler16,
        rodalShow17, setRodalShow17, rodalPopupHandler17, modalCloseHandler17,
        rodalShow18, setRodalShow18, rodalPopupHandler18, modalCloseHandler18,
        parentFilterMode, setParentFilterMode, childFilterMode, setChildFilterMode,
        depositPop, setDepositPop, openDepositPop, closeDepositPop,
        noGroupIdPop, setNoGroupIdPop, openNoGroupIdPop, closeNoGroupIdPop,
        noGroupIdPop1, setNoGroupIdPop1, openNoGroupIdPop1, closeNoGroupIdPop1,
        noGroupIdPop2, setNoGroupIdPop2, openNoGroupIdPop2, closeNoGroupIdPop2,
        manageSection, setManageSection, carManageSelValue, setCarManageSelValue,
        adeffectPop, setAdeffectPop, openAdeffectPop, closeAdeffectPop,
        withoutList
      }}>{/* #a5 rodalShow16 행 추가, #a9 rodalShow18 행 추가, #a10 rodalShow17 행 추가 */}
        <div className="content-wrap">
          <MypageNavi mode="dealer" memberType={memberType} />
          <div className="mypage-state-sec">
            <TabMenu type="type1" mount={false} defaultTab={0}>
              <TabCont tabTitle="등록차량 관리(전체:50)" id="tab1-1" index={0}>
                {(memberType !== "stop" && memberType !== "no-group-id") && <MypageFilterTab />}
                {
                  memberType === "stop" && (
                    <div className="stop-cover">
                      <a href="#" className="popup-close" onClick={handleMember} />
                      <p>
                        회원님은 현재 차량제한 중입니다.
                        <span>광고제한기간은 2020.01.26까지 입니다.</span>
                        <span className="ex">* 사유 - 광고 게시글에 욕설/비속어 사용</span>
                      </p>
                      <CheckBox id='chk-close' title='닫기' size="small" onChange={handleMember} />
                    </div>
                  )
                }
                {
                  // memberType === "no-group-id" && (
                    <div className="no-group-id-cover">
                      <a href="#" className="popup-close" onClick={handleMember} />
                      <p>
                        소속상사 대표 회원이시군요?
                        <span>편하게 소속 딜러와 소속 차량을 관리할 수 있는 단체회원 / 제휴법인회원 ID를 신청해보세요.</span>
                      </p>
                      <Buttons align="center" marginTop={23}>
                        <Button size="mid" line="black" title="자세히 보기" width={160} onClick={(e) => openNoGroupIdPop(e, "fade")} />
                      </Buttons>
                      <CheckBox id='chk-close2' className="nolook" title='하루동안 보지 않기' size="small" onChange={handleMember} />
                      <CheckBox id='chk-close3' title='다시 보지 않기' size="small" onChange={handleMember} />
                    </div>
                  // )
                }
                {
                  parentFilterMode === 1 &&
                  <>
                    {/* 등록차량 관리 : 정상 판매중 */}
                    {manageSection === 1 && <MypageManageList1 />}

                    {/* 등록차량 관리 : 관리필요 */}
                    {manageSection === 2 && <MypageManageList2 />}

                    {/* 등록차량 관리 : 판단보류 */}
                    {manageSection === 3 && <MypageManageList3 />}

                    {/* 등록차량 관리 : 대기차량 */}
                    {manageSection === 4 && <MypageManageList4 />}
                  </>

                }
                {parentFilterMode === 2 && <MypageManageList5 />}
                {parentFilterMode === 3 && <MypageManageList6 />}
                {parentFilterMode === 4 && <MypageManageList7 />}
              </TabCont>
              <TabCont tabTitle="광고 관리" id="tab1-2" index={1}>
                <div className="dealer-advertise-sec">
                  <TabMenu type="type5" defaultTab={0} mount={false}>
                    <TabCont tabTitle="광고이용권 안내" id="tab5-1" index={0}>
                      <div className="payment-sec">
                        <h3 className="sub-tit">사용중인 이용권</h3>
                        <table className="table-tp1" summary="결제내역에 대한 내용">
                          <caption className="away">결제내역</caption>
                          <colgroup>
                            <col width="24%" />
                            <col width="76%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>자유이용권</th>
                              <td className="td-btn-fr">
                                <span className="tx">10대 이용 중(10/10) <span className="tx-gray">남은기간 78일(01/18 만료)</span></span>
                                <span className="btn-base">
                                  <Button size="sml" line="gray" color="black" radius={true} title="광고연장" width={64} marginRight={4} />
                                  {/* #a1 버튼 타이틀 변경  */}
                                  <Button size="sml" line="gray" color="black" radius={true} title="자동결제신청" width={84} onClick={(e) => rodalPopupHandler16(e, "fade")} /> {/* #a1 버튼 타이틀 변경  */}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th>대당이용권</th>
                              <td>5대 이용 중</td>
                            </tr>
                            <tr>
                              <th>업데이트20</th>
                              <td>4대 이용 중</td>
                            </tr>
                            <tr>
                              <th>Bestpick 이용권</th>
                              <td>1대 이용 중</td>
                            </tr>
                          </tbody>
                        </table>

                        <h3 className="sub-tit">상품 안내</h3>
                        <div className="usage-wrap">
                          <p className="tag-tp5">차량등록상품</p>
                          <div className="tx-list">
                            <ul>
                              <li>
                                <h5>경매 낙찰 이용권</h5>
                                <p>오토벨 경매장에서 낙찰받은 차량을 광고로 등록하실 수 있는 이용권입니다.</p>
                                <span className="period">최대 2개월</span>
                                <span className="price">50,000원</span>
                              </li>
                              <li>
                                <h5>대당 이용권</h5>
                                <p>차량 1대를 등록할 수 있는 이용권입니다.
                                  <span>* 일반등록차량 리스트에 노출됩니다.</span>
                                </p>
                                <span className="period">최대 2개월</span>
                                <span className="price">50,000원</span>
                              </li>
                              <li>
                                <h5>자유 이용권
                                <Button size="sml" background="blue80" radius={true} title="구입하기" width={64} marginLeft={16} /></h5>
                                <p>선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.
                                  <span>
                                    * 일반등록차량 리스트에 노출됩니다.<br />
                                    * 등록차량이 판매완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.
                                  </span>
                                </p>
                                <span className="period">1개월 ~ 12개월</span>
                                <span className="price">27,000원~</span>

                                <CSSTransition
                                  in={usageDetailMore1}
                                  timeout={300}
                                  classNames={'fade'}
                                  unmountOnExit
                                >
                                  {/* #a1 1대 열삭제 및 금액 수정 start */}
                                  <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                    <caption className="away">자유 이용권 상품 상세 내역</caption>
                                    <colgroup>
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="auto" />
                                    </colgroup>
                                    <thead>
                                      <tr>
                                        <th>할인율</th>
                                        <th>5대</th>
                                        <th>10대</th>
                                        <th>15대</th>
                                        <th>20대</th>
                                        <th>30대</th>
                                        <th>50대</th>
                                        <th>70대</th>
                                        <th>100대</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th>1개월</th>
                                        <td>165,000</td>
                                        <td>330,000</td>
                                        <td>495,000</td>
                                        <td>660,000</td>
                                        <td>990,000</td>
                                        <td>1,650,000</td>
                                        <td>2,310,000</td>
                                        <td>3,300,000</td>
                                      </tr>
                                      <tr>
                                        <th>3개월<br />(5%)</th>
                                        <td>407,250</td>
                                        <td>940,500</td>
                                        <td>1,410,750</td>
                                        <td>1,881,000</td>
                                        <td>2,821,500</td>
                                        <td>4,702,500</td>
                                        <td>6,583,500</td>
                                        <td>9,405,000</td>
                                      </tr>
                                      <tr>
                                        <th>6개월<br />(5%)</th>
                                        <td>940,500</td>
                                        <td>1,881,000</td>
                                        <td>2,821,500</td>
                                        <td>3,762,000</td>
                                        <td>5,643,000</td>
                                        <td>9,405,000</td>
                                        <td>13,167,000</td>
                                        <td>18,810,000</td>
                                      </tr>
                                      <tr>
                                        <th>12개월<br />(5%)</th>
                                        <td>1,881,000</td>
                                        <td>3,762,000</td>
                                        <td>5,643,000</td>
                                        <td>7,524,000</td>
                                        <td>11,286,000</td>
                                        <td>18,810,000</td>
                                        <td>26,334,000</td>
                                        <td>37,620,000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* #a1 1대 열삭제 및 금액 수정 end*/}
                                </CSSTransition>
                                <button className={usageDetailMore1 ? "tx-btn active" : "tx-btn"} onClick={handleUsageDetail1}>{usageDetailMore1 ? "접기" : "상세보기"}</button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="usage-wrap">
                          <p className="tag-tp5">부가상품</p>
                          <div className="tx-list">
                            <ul>
                              <li>
                                <h5>Bestpick 이용권</h5>
                                <p>사이트 메인 ‘Bestpick’영역에 차량 한 대를 등록/노출 할 수 있는 이용권입니다.</p>
                                <span className="period">12시간 ~ 72시간</span>
                                <span className="price">100,000원~</span>
                                {/* 
                                <CSSTransition
                                  in={usageDetailMore2}
                                  timeout={300}
                                  classNames={'fade'}
                                  unmountOnExit
                                >
                                  <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                    <caption className="away">자유 이용권 상품 상세 내역</caption>
                                    <colgroup>
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                      <col width="12.5%" />
                                    </colgroup>
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>12시간</th>
                                        <th>24시간</th>
                                        <th>48시간</th>
                                        <th>72시간</th>
                                        <th>1주일</th>
                                        <th></th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th>1대</th>
                                        <td>27,000</td>
                                        <td>138,000</td>
                                        <td>276,000</td>
                                        <td>414,000</td>
                                        <td>552,000</td>
                                        <td>828,000</td>
                                        <td>1,380,000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </CSSTransition>
                                <button className={usageDetailMore2 ? "tx-btn active" : "tx-btn"} onClick={handleUsageDetail2}>{usageDetailMore2 ? "접기" : "상세보기"}</button> */}
                              </li>
                              <li>
                                <h5>업데이트 20 (대당)</h5>
                                <p>차량 업데이트를 추가로 20회 할 수 있는 이용권입니다.<br />
                                  무료 4회 포함 24회 업데이트 할 수 있습니다.</p>
                                <span className="period">한 대당</span>
                                <span className="price">10,000원</span>
                              </li>
                              <li>
                                <h5>업데이트 20 (자유)
                                <Button size="sml" background="blue80" radius={true} title="구입하기" width={64} marginLeft={16} /></h5>
                                <p>선택 기간 동안 선택한 차량 대 수 만큼 추가로 20회 업데이트할 수 있는<br />이용권입니다.</p>
                                <span className="period">1개월 ~ 12개월</span>

                                <CSSTransition
                                  in={usageDetailMore3}
                                  timeout={300}
                                  classNames={'fade'}
                                  unmountOnExit
                                >
                                  {/* #a1 1대 열삭제 및 금액 수정 start */}
                                  <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                    <caption className="away">자유 이용권 상품 상세 내역</caption>
                                    <colgroup>
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="11.1%" />
                                      <col width="auto" />
                                    </colgroup>
                                    <thead>
                                      <tr>
                                        <th>할인율</th>
                                        <th>5대</th>
                                        <th>10대</th>
                                        <th>15대</th>
                                        <th>20대</th>
                                        <th>30대</th>
                                        <th>50대</th>
                                        <th>70대</th>
                                        <th>100대</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th>1개월</th>
                                        <td>55,000</td>
                                        <td>110,000</td>
                                        <td>165,000</td>
                                        <td>220,000</td>
                                        <td>330,000</td>
                                        <td>550,000</td>
                                        <td>770,000</td>
                                        <td>1,100,000</td>
                                      </tr>
                                      <tr>
                                        <th>3개월<br />(5%)</th>
                                        <td>156,750</td>
                                        <td>313,500</td>
                                        <td>470,250</td>
                                        <td>627,000</td>
                                        <td>940,500</td>
                                        <td>1,567,500</td>
                                        <td>2,194,500</td>
                                        <td>3,135,000</td>
                                      </tr>
                                      <tr>
                                        <th>6개월<br />(5%)</th>
                                        <td>313,500</td>
                                        <td>627,000</td>
                                        <td>940,500</td>
                                        <td>1,254,000</td>
                                        <td>1,881,000</td>
                                        <td>3,135,000</td>
                                        <td>4,389,000</td>
                                        <td>6,270,000</td>
                                      </tr>
                                      <tr>
                                        <th>12개월<br />(5%)</th>
                                        <td>627,000</td>
                                        <td>1,254,000</td>
                                        <td>1,881,000</td>
                                        <td>2,508,000</td>
                                        <td>3,762,000</td>
                                        <td>6,270,000</td>
                                        <td>8,778,000</td>
                                        <td>12,540,000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* #a1 1대 열삭제 및 금액 수정 end */}
                                </CSSTransition>
                                <button className={usageDetailMore3 ? "tx-btn active" : "tx-btn"} onClick={handleUsageDetail3}>{usageDetailMore3 ? "접기" : "상세보기"}</button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="usage-wrap">
                          <p className="tag-tp5">프라이싱상품</p>
                          <div className="tx-list">
                            <ul>
                              <li>
                                <h5>프라이싱 조회권
                                <Button size="sml" background="blue80" radius={true} title="구입하기" width={64} marginLeft={16} /></h5>
                                <p>오토옥션에서 실제 거래되었던 차량의 낙찰가를 확인할 수 있는 이용권입니다.</p>
                                <span className="period">12시간 ~ 72시간</span>
                                <span className="price">100,000원~</span>

                                <CSSTransition
                                  in={usageDetailMore4}
                                  timeout={300}
                                  classNames={'fade'}
                                  unmountOnExit
                                >
                                  {/* #a1 금액 수정 start */}
                                  <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                    <caption className="away">자유 이용권 상품 상세 내역</caption>
                                    <colgroup>
                                      <col width="*" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                      <col width="9.3%" />
                                    </colgroup>
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>1회</th>
                                        <th>3회</th>
                                        <th>5회</th>
                                        <th>10회</th>
                                        <th>22회<span className="sub-tit">(2회추가제공)</span></th>
                                        <th>55회<span className="sub-tit">(5회추가제공)</span></th>
                                        <th>100회<span className="sub-tit">(10회추가제공)</span></th>
                                        <th>330회<span className="sub-tit">(30회추가제공)</span></th>
                                        <th>550회<span className="sub-tit">(50회추가제공)</span></th>
                                        <th>1,100회<span className="sub-tit">(100회추가제공)</span></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th>금액</th>
                                        <td>1,100</td>
                                        <td>3,300</td>
                                        <td>5,500</td>
                                        <td>11,000</td>
                                        <td>22,000</td>
                                        <td>55,000</td>
                                        <td>110,000</td>
                                        <td>330,000</td>
                                        <td>550,000</td>
                                        <td>1,100,000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* #a1 금액 수정 end */}
                                </CSSTransition>
                                <button className={usageDetailMore4 ? "tx-btn active" : "tx-btn"} onClick={handleUsageDetail4}>{usageDetailMore4 ? "접기" : "상세보기"}</button>
                              </li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </TabCont>
                    <TabCont tabTitle="이용권 구매" id="tab5-2" index={1}>
                      {
                        step === 1 && (
                          <div className="payment-sec radio">
                            <div className="usage-wrap">
                              <p className="tag-tp5">차량등록상품</p>
                              <div className="tx-list">
                                <ul>
                                  {/* #a6 경매 낙찰 이용권 삭제 start */}
                                  {/* <li>
                                    <h5>경매 낙찰 이용권</h5>
                                    <p>경매장에서 낙찰받은 차량만 이용 가능하고, 차량 등록 진행 시 구입 가능합니다.</p>
                                    <span className="price">55,000원</span> 
                                  </li> */}
                                  {/* #a6 경매 낙찰 이용권 삭제 end */}
                                  <li>
                                    <h5>대당 이용권</h5>
                                    <p>차종 제한없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                                    <span className="price">15,000원</span> {/* #a2 금액수정 */}
                                  </li>
                                  <li>
                                    <h5>자유 이용권</h5>
                                    <p>모든 차량 등록 가능합니다. 아래 표에서 원하는 이용권을 선택해주세요.</p>
                                    {/* #a2 table이 전체 수정(금액 및 id) start */}
                                    <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                      <caption className="away">자유 이용권 상품 상세 내역</caption>
                                      <colgroup>
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="auto" />
                                      </colgroup>
                                      <thead>
                                        <tr>
                                          <th>할인율</th>
                                          <th>5대</th>
                                          <th>10대</th>
                                          <th>15대</th>
                                          <th>20대</th>
                                          <th>30대</th>
                                          <th>50대</th>
                                          <th>70대</th>
                                          <th>100대</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th>1개월</th>
                                          <td><Radio className="txt" id="car-usage1-1" title="165,000" value={1} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-2" title="330,000" value={2} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-3" title="495,000" value={3} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-4" title="660,000" value={4} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-5" title="990,000" value={5} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-6" title="1,650,000" value={6} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-7" title="2,310,000" value={7} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-8" title="3,300,000" value={8} checked={isValue1} onChange={handleChange1} /></td>
                                        </tr>
                                        <tr>
                                          <th>3개월<br />(10%)</th>
                                          <td><Radio className="txt" id="car-usage1-9" title="470,250" value={9} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-10" title="940,500" value={10} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-11" title="1,410,750" value={11} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-12" title="1,881,000" value={12} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-13" title="2,821,500" value={13} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-14" title="4,702,500" value={14} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-15" title="6,583,500" value={15} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-16" title="9,405,000" value={16} checked={isValue1} onChange={handleChange1} /></td>
                                        </tr>
                                        <tr>
                                          <th>6개월<br />(15%)</th>
                                          <td><Radio className="txt" id="car-usage1-17" title="940,500" value={17} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-18" title="1,881,000" value={18} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-19" title="2,821,500" value={19} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-20" title="3,762,000" value={20} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-21" title="5,643,000" value={21} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-22" title="9,405,000" value={22} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-23" title="13,167,000" value={22} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-24" title="18,810,000" value={22} checked={isValue1} onChange={handleChange1} /></td>
                                        </tr>
                                        <tr>
                                          <th>12개월<br />(20%)</th>
                                          <td><Radio className="txt" id="car-usage1-25" title="1,881,000" value={21} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-26" title="3,762,000" value={22} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-27" title="5,643,000" value={23} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-28" title="7,524,000" value={24} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-29" title="11,286,000" value={25} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-30" title="18,810,000" value={26} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-31" title="26,334,000" value={26} checked={isValue1} onChange={handleChange1} /></td>
                                          <td><Radio className="txt" id="car-usage1-32" title="37,620,000" value={26} checked={isValue1} onChange={handleChange1} /></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    {/* #a2 table이 전체 수정(금액 및 id) end */}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* #a7 경매 낙찰 전용권 추가부분 start */}
                            <div className="usage-wrap tp2">
                              <div className="tx-list add-radio">
                                <ul>
                                  <li>
                                    <h5>경매 낙찰 전용권</h5>
                                    <p>경매장에서 낙찰받은 차량만 이용 가능하고, 차량 등록 진행 시 구입 가능합니다.</p>
                                  </li>
                                </ul>
                                <RadioGroup
                                  dataList={[
                                    { id: 'radio1', value: 1, checked: true, disabled: false, title: '우량업체 30 : 330,000원' },
                                    { id: 'radio2', value: 2, checked: false, disabled: false, title: '우량업체 50 : 550,000원' },
                                    { id: 'radio3', value: 3, checked: false, disabled: false, title: '수입인증 전용1 : 550,000원' },
                                    { id: 'radio4', value: 4, checked: false, disabled: false, title: '수입인증 전용2 : 1,100,000원' },
                                    { id: 'radio5', value: 5, checked: false, disabled: false, title: '금융사 전용 : 3,300,000원' }
                                  ]} defaultValue={1} className="radio-list" mode="vertical"
                                >
                                  <RadioItem>
                                    <p>오토벨과 제휴된 우량업체가 차량광고&amp;프라이싱 시스템을 각각 30대, 300회 이용할 수 있는 상품권</p>
                                  </RadioItem>
                                  <RadioItem>
                                    <p>오토벨과 제휴된 우량업체가 차량광고&amp;프라이싱 시스템을 각각 50대, 500회 이용할 수 있는 상품권</p>
                                  </RadioItem>
                                  <RadioItem>
                                    <p>오토벨과 제휴된 수입인증중고차 법인 업체가 차량광고&amp;프라이싱 시스템을 각각 50대, 50회 이용할 수 있으며, 인증몰에 차량을 노출하는 상품권</p>
                                  </RadioItem>
                                  <RadioItem>
                                    <p>오토벨과 제휴된 수입인증중고차 법인 업체가 차량광고&amp;프라이싱 시스템을 각각 100대, 100회 이용할 수 있으며, 인증몰에 차량을 노출하는 상품권</p>
                                  </RadioItem>
                                  <RadioItem>
                                    <p>오토벨과 제휴된 금융사가 차량광고&amp;프라이싱 시스템을 각각 300대, 300회 이용할 수 있으며, 인증몰에 차량을 노출하는 상품권</p>
                                  </RadioItem>
                                </RadioGroup>
                              </div>
                            </div>
                            {/* #a7 경매 낙찰 전용권 추가부분 end */}

                            <div className="usage-wrap">
                              <p className="tag-tp5">부가상품</p>
                              <div className="tx-list">
                                <ul>
                                  {/* #a3 삭제 start */}
                                  {/* <li>
                                    <h5>Bestpick 이용권</h5>
                                    <p>차종 제한 없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                                    <span className="price">100,000원~</span>
                                  </li> */}
                                  {/* #a3 삭제 end */}
                                  <li>
                                    <h5>업데이트 대당권</h5> {/* #a3 타이틀 수정 */}
                                    <p>차종 제한 없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                                    <span className="price">11,000원</span>{/* #a3 금액 수정 */}
                                  </li>
                                  <li>
                                    <h5>업데이트 자유권</h5>{/* #a3 타이틀 수정 */}
                                    {/* #a3 전체 수정(금액 및 id) start */}
                                    <table className="table-tp1 th-c" summary="업데이트 자유 상품 상세 내역에 대한 내용">
                                      <caption className="away">업데이트 자유 상품 상세 내역</caption>
                                      <colgroup>
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="11.1%" />
                                        <col width="auto" />
                                      </colgroup>
                                      <thead>
                                        <tr>
                                          <th>할인율</th>
                                          <th>5대</th>
                                          <th>10대</th>
                                          <th>15대</th>
                                          <th>20대</th>
                                          <th>30대</th>
                                          <th>50대</th>
                                          <th>70대</th>
                                          <th>100대</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th>1개월</th>
                                          <td><Radio className="txt" id="car-usage2-1" title="55,000" value={1} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-2" title="110,000" value={2} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-3" title="165,000" value={3} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-4" title="220,000" value={4} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-5" title="330,000" value={5} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-6" title="550,000" value={6} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-7" title="770,000" value={7} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-8" title="1,100,000" value={8} checked={isValue2} onChange={handleChange2} /></td>
                                        </tr>
                                        <tr>
                                          <th>3개월<br />(10%)</th>
                                          <td><Radio className="txt" id="car-usage2-9" title="156,750" value={9} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-10" title="313,500" value={10} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-11" title="470,250" value={11} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-12" title="627,000" value={12} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-13" title="940,500" value={13} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-14" title="1,567,500" value={14} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-14" title="2,194,500" value={15} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-14" title="3,135,000" value={16} checked={isValue2} onChange={handleChange2} /></td>
                                        </tr>
                                        <tr>
                                          <th>6개월<br />(15%)</th>
                                          <td><Radio className="txt" id="car-usage2-15" title="313,500" value={15} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-16" title="627,000" value={16} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-17" title="940,500" value={17} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-18" title="1,254,000" value={18} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-19" title="1,881,000" value={19} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-20" title="3,135,000" value={20} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-21" title="4,389,000" value={21} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-22" title="6,270,000" value={22} checked={isValue2} onChange={handleChange2} /></td>
                                        </tr>
                                        <tr>
                                          <th>12개월<br />(20%)</th>
                                          <td><Radio className="txt" id="car-usage2-23" title="627,000" value={23} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-24" title="1,254,000" value={24} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-25" title="1,881,000" value={25} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-26" title="2,508,000" value={26} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-27" title="3,762,000" value={27} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-28" title="6,270,000" value={28} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-29" title="8,778,000" value={29} checked={isValue2} onChange={handleChange2} /></td>
                                          <td><Radio className="txt" id="car-usage2-30" title="12,540,000" value={30} checked={isValue2} onChange={handleChange2} /></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    {/* #a3 전체 수정(금액 및 id) end */}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="usage-wrap">
                              <p className="tag-tp5">프라이싱상품</p>
                              <div className="tx-list">
                                <ul>
                                  <li>
                                    <h5>프라이싱 조회권</h5>
                                    {/* #a3 전체 수정(금액 및 id) start */}
                                    <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                                      <caption className="away">자유 이용권 상품 상세 내역</caption>
                                      <colgroup>
                                        <col width="*" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                        <col width="9.3%" />
                                      </colgroup>
                                      <thead>
                                        <tr>
                                          <th></th>
                                          <th>1회</th>
                                          <th>3회</th>
                                          <th>5회</th>
                                          <th>10회</th>
                                          <th>22회<span className="sub-tit">(2회추가제공)</span></th>
                                          <th>55회<span className="sub-tit">(5회추가제공)</span></th>
                                          <th>100회<span className="sub-tit">(10회추가제공)</span></th>
                                          <th>330회<span className="sub-tit">(30회추가제공)</span></th>
                                          <th>550회<span className="sub-tit">(50회추가제공)</span></th>
                                          <th>1,100회<span className="sub-tit">(100회추가제공)</span></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th>금액</th>
                                          <td><Radio className="txt" id="car-usage3-1" title="1,100" value={1} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-2" title="3,300" value={2} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-3" title="5,500" value={3} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-4" title="11,000" value={4} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-5" title="22,000" value={5} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-6" title="55,000" value={6} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-7" title="110,000" value={7} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-8" title="330,000" value={8} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-9" title="550,000" value={9} checked={isValue3} onChange={handleChange3} /></td>
                                          <td><Radio className="txt" id="car-usage3-10" title="1,100,000" value={10} checked={isValue3} onChange={handleChange3} /></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    {/* #a3 전체 수정(금액 및 id) end */}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="pick-list">
                              <ul>
                                <li>자유이용권</li>
                                <li>1개월 5대</li>
                                <li>138,000원</li>
                              </ul>
                              <ul>
                                <li>업데이트 20 자유</li>
                                <li>3개월 10대</li>
                                <li>742,000원</li>
                              </ul>
                              <ul>
                                <li>프라이싱 10회</li>
                                <li>10회</li>
                                <li>10,000원</li>
                              </ul>
                            </div>
                            <div className="sum">
                              <p>합계 금액</p>
                              <p className="price">890,000<span>원</span></p>
                            </div>
                            <Buttons align="center" marginTop={56}>
                              <Button size="big" background="gray" title="취소" width={130} />
                              <Button size="big" background="blue80" title="다음단계" width={130} onClick={handleStep(2)} />
                            </Buttons>
                          </div>
                        )
                      }
                      {
                        step === 2 && (
                          <div className="payment-sec method">
                            <h3 className="sub-tit">이용권 결제</h3>
                            <div className="point-area">
                              <div className="pay-detail">
                                <h4>구매내역</h4>
                                <div className="pick-list">
                                  <ul>
                                    <li>자유이용권</li>
                                    <li>1개월 5대</li>
                                    <li>138,000원</li>
                                  </ul>
                                  <ul>
                                    <li>업데이트 20 자유</li>
                                    <li>3개월 10대</li>
                                    <li>742,000원</li>
                                  </ul>
                                  <ul>
                                    <li>프라이싱 10회</li>
                                    <li>10회</li>
                                    <li>10,000원</li>
                                  </ul>
                                  <div className="sum">
                                    <p>합계 금액</p>
                                    <p className="price">890,000<span>원</span></p>
                                  </div>
                                </div>
                              </div>
                              <div className="coupon-wrap">
                                <div className="coupon">
                                  <CheckBox id='chk3' title='쿠폰 적용' />
                                  <p>적용 가능한 보유쿠폰<span>3</span>장</p>
                                </div>
                                <RadioGroup
                                  dataList={[
                                    { id: 'coupon1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                                    { id: 'coupon2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                                    { id: 'coupon3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                                  ]} defaultValue={1} size="small" mode="vertical"
                                ></RadioGroup>
                                <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
                              </div>
                            </div>
                            <div className="last-sum">
                              <ul>
                                <li>이용권금액<span>890,000<em>원</em></span></li>
                                <li>할인금액<span>12,000<em>원</em></span></li>
                                <li>최종결제금액<span>878,000<em>원</em></span></li>
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
                            {/* #a4 증빙선택 추가 start */}
                            <div className="method-wrap col2 mt40">
                              <p>증빙 선택</p>
                              <RadioGroup
                                dataList={[
                                  { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                                  { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }
                                ]} defaultValue={1}
                              ></RadioGroup>

                              <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
                            </div>
                            {/* #a4 증빙선택 추가 end */}

                            <div className="method-wrap mt40">
                              <CheckBox id='chk-agree' title='상품약관 확인' />
                              <div className="terms-wrap">
                                내용
                              </div>
                            </div>

                            <Buttons align="center" marginTop={56}>
                              <Button size="big" background="gray" title="취소" width={130} />
                              <Button size="big" background="blue80" title="다음단계" width={130} onClick={handleStep(3)} />
                            </Buttons>
                          </div>
                        )
                      }
                      {
                        step === 3 && (
                          <div className="co-wrap">
                            <p className="tit">이용권 구매가 완료되었습니다.</p>
                            <p className="exp">구매해주셔서 감사합니다.<br />구매하신 이용권은 마이페이지 > 광고이용권 안내 > 사용중인 이용권에서 확인 가능합니다.<br />감사합니다.</p>
                            <Buttons align="center" marginTop={80}>
                              <Button size="big" line="blue80" color="blue80" title="광고 등록하러 가기" width={200} height={60} href="/mypage/dealerSell02_01" />
                              <Button size="big" background="blue80" title="확인" width={200} height={60} href="/mypage/dealerSell01" />
                            </Buttons>
                          </div>
                        )
                      }
                    </TabCont>
                    <TabCont tabTitle="결제내역" id="tab5-3" index={2}>
                      <table className="table-tp1 input search" summary="조회 영역">
                        <caption className="away">조회 영역</caption>
                        <tbody>
                          {/* #a8 결제수단, 서비스 삭제 start */}
                          {/* <tr>
                            <th>결제수단</th>
                            <td>
                              <CheckBox id='chk-card' title='신용카드' />
                              <CheckBox id='chk-phone' title='휴대전화' />
                              <CheckBox id='chk-bank' title='무통장입금' />
                              <CheckBox id='chk-coupon' title='쿠폰/포인트' />
                              <CheckBox id='chk-paypal' title='간편결제' />
                            </td>
                          </tr>
                          <tr>
                            <th>서비스</th>
                            <td>
                              <CheckBox id='chk-service1' title='서비스' />
                              <CheckBox id='chk-service2' title='서비스' />
                              <CheckBox id='chk-service3' title='서비스' />
                              <CheckBox id='chk-service4' title='서비스' />
                            </td>
                          </tr> */}
                          {/* #a8 결제수단, 서비스 삭제 end */}
                          <tr>
                            <th>기간</th>
                            <td>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <em className="mg8">~</em>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                            </td>
                          </tr>
                          <tr>
                            <th></th>
                            <td><p className="tx-exp-tp6">(* 최대 1년까지 조회 가능합니다.)</p></td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="payment-tx-list">
                        <p className="inquire-num">결제완료건 수 : 총00건</p>
                        <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                          <caption className="away">결제내역</caption>
                          <colgroup>
                            <col width="12%" />
                            <col width="12%" />
                            <col width="34%" />
                            <col width="16%" />
                            <col width="13%" />
                            <col width="13%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>결제일</th>
                              <th>결제번호</th>
                              <th>결제내용</th>
                              <th>결제금액</th>
                              <th>결제수단</th>
                              <th>영수증/증빙</th>
                            </tr>
                          </thead>
                          {
                            withoutList === false
                              ? (
                                <tbody>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler14(e, "fade")}>현금영수증</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>12373404</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler13(e, "fade")}>파워팩 대당이용권 1대 외 1건</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler15(e, "fade")}>세금계산서</span>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  <tr className="list-none">
                                    <td colSpan="6">결제내역이 없습니다.</td>
                                  </tr>
                                </tbody>
                              )
                          }
                        </table>
                        {
                          withoutList === false &&
                          (
                            <PageNavigator recordCount={50} className="mt32" />
                          )
                        }
                      </div>

                      <div className="essential-point">
                        <p>꼭 알아두세요!</p>
                        <ul>
                          <li><i className="ico-dot mid"></i> 신용카드로 결제 시 카드매출전표가 발급되며, 세금계산서 대용으로 매입세액공제를 받으실 수 있습니다.</li>
                          <li><i className="ico-dot mid"></i> 휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.<span className="add-exp">- 단, 휴대전화 결제금액을 신용카드로 납부 시에는 발행되지 않습니다.</span></li>
                          <li><i className="ico-dot mid"></i> 무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)</li>
                          <li><i className="ico-dot mid"></i> 현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.</li>
                          <li><i className="ico-dot mid"></i> 세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)</li>
                          <li><i className="ico-dot mid"></i> 세금계산서 문의 : 고객센터 ()</li>
                        </ul>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="입금대기 내역" id="tab5-4" index={3}>
                      <div className="deposit-tx-list">
                        <p className="inquire-num">입금대기건 수 : 총00건 (입금액 00원)</p>
                        <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                          <caption className="away">결제내역</caption>
                          <colgroup>
                            <col width="12%" />
                            <col width="12%" />
                            <col width="20%" />
                            <col width="21%" />
                            <col width="21%" />
                            <col width="14%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>결제일</th>
                              <th>입금액</th>
                              <th>은행명</th>
                              <th>계좌번호</th>
                              <th>결제내용</th>
                              <th>상태</th>
                            </tr>
                          </thead>
                          {
                            withoutList === false
                              ? (
                                <tbody>
                                  <tr>
                                    <td>2019-08-16</td>
                                    <td>220,000</td>
                                    <td>우리은행</td>
                                    <td>137-81-412322</td>
                                    <td>대당 이용권 1개월 외 2건</td>
                                    <td className="td-btn-fr"><span className="tx">입금대기</span><Button size="sml" line="gray" color="black" radius={true} title="취소" width={44} marginLeft={6} onClick={(e) => openDepositPop(e, "fade")} /></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  <tr className="list-none">
                                    <td colSpan="6">입금대기 내역이 없습니다.</td>
                                  </tr>
                                </tbody>
                              )
                          }
                        </table>
                        {
                          withoutList === false &&
                          (
                            <PageNavigator recordCount={50} className="mt32" />
                          )
                        }
                      </div>

                      <div className="essential-point">
                        <p>꼭 알아두세요!</p>
                        <ul>
                          <li><i className="ico-dot mid"></i> 입금대기 내역은 무통장 결제 시 입금확인이 되지 않은 내역입니다.</li>
                          <li><i className="ico-dot mid"></i> 입금확인이 되면 바로 결제내역으로 자동 이동되며, 입금예정일이 지난 내역은 자동 삭제됩니다.</li>
                        </ul>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="광고효과 분석" id="tab5-5" index={4}>
                      <div className="dealer-adeffect-sec">
                        <div className="admin-list tp1">
                          <div className="content-top">
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                              <ul className="info">
                                <li>00가0000</li>
                                <li>09/12식(10년형)</li>
                                <li>84,761km</li>
                                <li>오토</li>
                                <li>디젤</li>
                              </ul>
                              <p className="price-tp6">7760<span className="won">만원</span></p>
                            </div>
                            <ul className="numerical">
                              <li><i className="ico-dot sml"></i>판매기간<span>53일</span></li>
                              <li><i className="ico-dot sml"></i>조회수(일평균)<span>20회</span></li>
                              <li><i className="ico-dot sml"></i>관심고객(최근2주)<span>13명</span></li>
                              <li><i className="ico-dot sml"></i>동급매물(최근4주)<span><i className="ico-triangle-top"></i>4주</span></li>
                            </ul>
                          </div>
                          <div className="content-bottom">
                            <ul>
                              <li className="product-name">대당이용권, 자동업데이트</li>
                              <li><span>등록일</span>2019-08-01</li>
                              <li><span>최종수정일</span> 2019-09-01</li>
                              <li><span>최종업데이트 </span> 2019-09-30 23:10 (6/15회)</li>
                            </ul>
                            <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" onClick={(e) => rodalPopupHandler7(e, "slideUp")} width={129} />
                          </div>
                        </div>
                        <Buttons align="right" marginTop={16}>
                          <Button size="sml" background="blue80" radius={true} title="다른 차량 불러오기" width={109} onClick={(e) => openAdeffectPop(e, "fade")} />
                        </Buttons>

                        <h3 className="sub-tit">비교하고 싶은 대상을 선택하세요.</h3>
                        <TabMenu type="type9">
                          <TabCont id="tab9-1" tabTitle="전체차량" index={0}>
                            <table className="table-tp1 th-c td-c" summary="비교하고 싶은 대상에 대한 내용">
                              <caption className="away">비교하고 싶은 대상</caption>
                              <colgroup>
                                <col width="20%" />
                                <col width="16%" />
                                <col width="16%" />
                                <col width="16%" />
                                <col width="16%" />
                                <col width="16%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>일평균 클릭 수</th>
                                  <th>관심 고객 수(찜수)</th>
                                  <th>주간 콜 수</th>
                                  <th>재고일 수</th>
                                  <th>(평균)광고가</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>내 차량 수치</th>
                                  <td>20회</td>
                                  <td>25회</td>
                                  <td>10회</td>
                                  <td>25회</td>
                                  <td>2,300만원</td>
                                </tr>
                                <tr>
                                  <th>전체 차량 평균 수치</th>
                                  <td>15회</td>
                                  <td>23회</td>
                                  <td>11회</td>
                                  <td>25회</td>
                                  <td>2,200만원</td>
                                </tr>
                                <tr>
                                  <th>전체 차량 대비 비교</th>
                                  <td><i className="ico-triangle-top"></i><span>10%</span></td>
                                  <td><i className="ico-triangle-top"></i><span>3%</span></td>
                                  <td><i className="ico-triangle-bottom"></i><span>8%</span></td>
                                  <td>-</td>
                                  <td><i className="ico-triangle-bottom"></i><span>5%</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </TabCont>
                          <TabCont id="tab9-2" tabTitle="동일 모델" index={1}>
                          </TabCont>
                          <TabCont id="tab9-3" tabTitle="동일 동급" index={2}>
                          </TabCont>
                          <TabCont id="tab9-4" tabTitle="동일 세그먼트" index={3}>
                          </TabCont>
                          <TabCont id="tab9-5" tabTitle="Live Service 차량" index={4}>
                          </TabCont>
                          <TabCont id="tab9-6" tabTitle="동일 지역 차량" index={5}>
                          </TabCont>
                        </TabMenu>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="취소 및 환불안내" id="tab5-6" index={5}>
                      {/* #a9 전체 내용수정 및 추가 start  */}
                      <table className="table-tp1 input search" summary="조회 영역">
                        <caption className="away">조회 영역</caption>
                        <tbody>
                          <tr>
                            <th>결제수단</th>
                            <td>
                              <CheckBox id='chk-card' title='신용카드' />
                              <CheckBox id='chk-bank' title='무통장입금' />
                              <CheckBox id='chk-paypal' title='간편결제' />
                            </td>
                          </tr>
                          <tr>
                            <th>서비스</th>
                            <td>
                              <CheckBox id='chk-service1' title='전체' />
                              <CheckBox id='chk-service2' title='접수중' />
                              <CheckBox id='chk-service3' title='환불완료' />
                              <CheckBox id='chk-service4' title='요청반려' />
                            </td>
                          </tr>
                          <tr>
                            <th>기간</th>
                            <td>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <em className="mg8">~</em>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                            </td>
                          </tr>
                          <tr>
                            <th></th>
                            <td><p className="tx-exp-tp6">(* 최대 00기간까지 조회 가능합니다.)</p></td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="payment-tx-list">
                        <p className="inquire-num">환불내역 수 : 총00건</p>
                        <table className="table-tp1 th-c td-c" summary="환불내역에 대한 내용">
                          <caption className="away">환불내역</caption>
                          <colgroup>
                            <col width="12%" />
                            <col width="12%" />
                            <col width="34%" />
                            <col width="16%" />
                            <col width="13%" />
                            <col width="13%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>결제일</th>
                              <th>환불일</th>
                              <th>이용권명</th>
                              <th>환불금액</th>
                              <th>결제수단</th>
                              <th>상태</th>
                            </tr>
                          </thead>
                          {
                            withoutList === false
                              ? (
                                <tbody>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td>2019/08/16</td>
                                    <td>
                                      <span onClick={(e) => rodalPopupHandler18(e, "fade")}>대당이용권</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>환불완료</td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td></td>
                                    <td>
                                      <span>자유이용권 1개월/5대</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>신용카드</td>
                                    <td>접수중</td>
                                  </tr>
                                  <tr>
                                    <td>2019/08/16</td>
                                    <td></td>
                                    <td>
                                      <span>업데이트 자유권 3개월/10대</span>
                                    </td>
                                    <td>230,000원</td>
                                    <td>무통장입금</td>
                                    <td>요청반려</td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  <tr className="list-none">
                                    <td colSpan="6">환불내역이 없습니다.</td>
                                  </tr>
                                </tbody>
                              )
                          }
                        </table>
                        {
                          withoutList === false &&
                          (
                            <PageNavigator recordCount={50} className="mt32" />
                          )
                        }
                      </div>

                      <div className="payment-sec tp2">
                        <h3>환불규정</h3>
                        <p>환불 신청은 사업자 휴/폐업 확인서를 제출하는 경우에만 가능합니다.</p>

                        <table className="table-tp1 th-c td-c" summary="환불규정에 대한 내용">
                          <caption className="away">환불내역</caption>
                          <colgroup>
                            <col width="12%" />
                            <col width="16%" />
                            <col width="12%" />
                            <col width="16%" />
                            <col width="auto" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th>구분</th>
                              <th>서비스<br />제공 기간</th>
                              <th>기본가격/대당</th>
                              <th>환불정책</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th rowSpan="2">기본상품</th>
                              <td>대당 이용권</td>
                              <td>1개월</td>
                              <td>15,000</td>
                              <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산 </td>
                            </tr>
                            <tr>
                              <td>자유 이용권</td>
                              <td>1개월부터</td>
                              <td>33,000</td>
                              <td> 결제금액 - (결제 금액 X 수수료 10%)+일할계산<br />
                              단, 구매 후 7일 이내에 사용 내역이 없을 경우 전액 환불</td>
                            </tr>
                            <tr>
                              <th rowSpan="3">프리미엄상품</th>
                              <td>Live Studio</td>
                              <td>3개월</td>
                              <td>165,000</td>
                              <td>환불 불가 / 촬영, 진단에 대한 용역 서비스 제공(기간은 무료 제공) </td>
                            </tr>
                            <tr>
                              <td>Live Shot</td>
                              <td>3개월</td>
                              <td>110,000</td>
                              <td>환불 불가 / 촬영, 진단에 대한 용역 서비스 제공(기간은 무료 제공)</td>
                            </tr>
                            <tr>
                              <td>경매낙찰 이용권</td>
                              <td>1개월</td>
                              <td>55,000</td>
                              <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산 </td>
                            </tr>
                            <tr>
                              <th rowSpan="3">부가상품</th>
                              <td>프라이싱 조회권</td>
                              <td>1회</td>
                              <td>1,100</td>
                              <td> 미사용시 : 결제 금액-(결제 금액 X 10% or 1,100원 중 높은금액)<br />사용시 : 결제금액-(사용건수X1,100원)-(잔여금액X10% or 1,100원 중 높은금액)</td>
                            </tr>
                            <tr>
                              <td>업데이트권 대당</td>
                              <td>1개월</td>
                              <td>11,000</td>
                              <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산</td>
                            </tr>
                            <tr>
                              <td>업데이트권 자유</td>
                              <td>1개월부터</td>
                              <td>11,000</td>
                              <td>결제금액 - (결제 금액 X 수수료 10%)+일할계산<br />
                              단, 구매 후 7일 이내에 사용 내역이 없을 경우 전액 환불 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="essential-point">
                        <p>환불신청</p>
                        <ul>
                          <li><i className="ico-dot mid"></i> 환불 신청은 사업자 휴/폐업 확인서를 제출하는 경우에만 가능합니다.</li>
                          <li><i className="ico-dot mid"></i> 증빙서류가 정확하지 않을 시, 환불 및 취소 처리가 불가능할 수 있습니다. </li>
                          <li><i className="ico-dot mid"></i> 환불 완료 시, 취소가 되지 않으니 신중하게 신청하시기 바랍니다.</li>
                        </ul>
                        <Button size="mid" line="gray" color="darkgray" radius={true} title="환불신청하기" width={106} />
                      </div>
                      {/* #a9 전체 내용수정 및 추가 end  */}


                      {/* <div className="essential-point">
                        <p>꼭 알아두세요!</p>
                        <ul>
                          <li><i className="ico-dot mid"></i> 오토벨에서 제공하는 서비스는 타인에게 양도가 불가능합니다.</li>
                          <li><i className="ico-dot mid"></i> 정확한 환불금액은 오토벨 본사 고객센터를 통해 확인하실 수 있습니다. (고객센터 1000-000)</li>
                          <li><i className="ico-dot mid"></i> 부당한 광고(타 사이트 광고), 부적절한 이용 등으로 자유이용권 자격 정지 시 환불되지 않습니다.</li>
                          <li><i className="ico-dot mid"></i> 블랙회원(정지) 상태가 아니고, 허위 매물 신고 누적 횟수가 4회 이상인 경우에는 환불 요청이 가능하지만, 해당 ID는 사이트 영구 이용정지 조치 후 환불 규정에 따라 환불 처리합니다.</li>
                        </ul>
                      </div> */}

                    </TabCont>
                  </TabMenu>
                </div>
              </TabCont>
            </TabMenu>
          </div>
        </div>
        <MypageManagePopup />
      </DealerContext.Provider>
    </AppLayout>
  )
}

export default withRouter(DealerSell01);
