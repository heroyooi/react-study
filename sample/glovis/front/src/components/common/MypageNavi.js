import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Radio from '@lib/share/items/Radio';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MypageNaviLnb from '@src/components/common/MypageNaviLnb';
import ProdFilterTab from '@src/components/mypage/dealer/DealerProdList/ProdFilterTab';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentGoods from '@src/components/common/MobPaymentGoods';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { getTreeFromFlatData } from '@lib/share/tree/tree-data-utils';
import { selectMemberMypage } from '@src/actions/layout/layoutAction';
import { getFreeTicketHtml, getOneTimeTicketHtml, getUpdateFreeTicketHtml, getUpdateOneTimeTicketHtml } from '@src/utils/MyPageUtils';
import { preventScroll } from '@src/utils/CommonUtil';
import { setComma } from '@src/utils/StringUtil';
import { console } from 'globalthis/implementation';

const globalThis = require('globalthis')();

const MyPageNavi = memo(({ dealerProdList, isMyPage, memberType, mode, sttDvcd, params }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['userInfo']);
  const { isLoginPC } = useSelector((state) => ({
    isLoginPC: isEmpty(cookies.accessToken) ? state.login.isLogin : true
  }));

  const gnbMenuList = useSelector((state) => state.layout.gnbMenuList);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const dealerMypageInfo = useSelector((state) => state.layout.dealerMypageInfo);
  const dealerAdverStore = useSelector((rootStore) => rootStore.dealerAdver);

  const [isRodalShow, setIsRodalShow] = useRodal(false);
  const [treeData] = useState(isEmpty(gnbMenuList) ? [] : gnbMenuList);
  const [lnbData, setLnbData] = useState([]);
  const [cookieMemberType, setCookieMemberType] = useState('');
  const [cookieType, setCookieType] = useState('');
  const [active, setActive] = useState(false);
  const [mPop, setMPop] = useRodal(false);
  const [selectedMemberType, setSelectMemberType] = useState(0);

  const [fpAdBuy, setFpAdBuy] = useState(false); // 구입하기 > 이용권 구매 팝업
  const [fpPaymentInfo, setFpPaymentInfo] = useState(false); // 구입하기 > 이용권 결제 팝업
  const [fpGoodsType, setFpGoodsType] = useState('free');

  const { usingTicketList = {} } = dealerAdverStore;
  const { freepassinfo, updatefreepassinfo, perupdatepasscnt, perpasscnt } = usingTicketList;

  const handleFullpagePopup = useCallback(
    (name, type) => (e) => {
      e.preventDefault();
      if (name === 'adBuy') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '이용권 구매',
            options: ['close']
          }
        });
        setFpGoodsType(type);
        setFpPaymentInfo(false);
        setFpAdBuy(true);
      } else if (name === 'paymentInfo') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '이용권 결제',
            options: ['close']
          }
        });
        setFpAdBuy(false);
        setFpPaymentInfo(true);
      }
    },
    [dispatch]
  );

  const goodsClose = () => {
    setFpAdBuy(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };
  const goodsCallback = (e) => {
    e.preventDefault();
    if (fpGoodsType === 'free') {
      console.log('===> 이용권 구매, 자유이용권 콜백처리');
    } else if (fpGoodsType === 'update') {
      console.log('===> 이용권 구매, 업데이트 자유권 콜백처리');
    } else if (fpGoodsType === 'pricing') {
      console.log('===> 이용권 구매, 프라이싱 조회권 콜백처리');
    }
    setFpAdBuy(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };

  const onClosePayment = (e) => {
    e.preventDefault();
    setFpPayment(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };
  const paymentCallback = (e) => {
    e.preventDefault();
    console.log('===> 이용권 결제, 콜백처리');
    onClosePayment(e);
  };

  const handleIsRodalShowToggle = useCallback(
    (e) => {
      e.preventDefault();
      const next = !isRodalShow;
      setIsRodalShow(next);
    },
    [isRodalShow, setIsRodalShow]
  );

  const handleActiveToggle = useCallback(
    (e) => {
      e.preventDefault();
      const next = !active;
      setActive(next);
      preventScroll(next);
    },
    [active]
  );

  const handleSelectedMemberTypeChanged = useCallback((e) => {
    e.preventDefault();
    setSelectMemberType(Number(e.target.value));
  }, []);

  const onSetTodayCheck = (e, state) => {
    e.preventDefault();
    setTodayCheck(state);
    setMPop(state);
  };

  const confirmMPop = (e) => {
    e.preventDefault();
    setMPop(false);
  };

  const onButtonClick = (e, url) => {
    e.preventDefault();
    if (url.trim().length > 0) Router.push(url);
  };

  useEffect(() => {
    if (!isEmpty(gnbMenuList)) {
      const treeFromFlatData = getTreeFromFlatData({
        flatData: gnbMenuList,
        getKey: (node) => node.menuId,
        getParentKey: (node) => node.upMenuId,
        rootKey: null
      });

      let gnbMenuTemp = [];
      gnbMenuTemp = treeFromFlatData.length > 0 && isEmpty(treeFromFlatData[0].children) ? [] : treeFromFlatData[0].children;
      let mypageIndex = -1;
      if (treeFromFlatData.length > 0) {
        if (cookies.membertype === '0010') mypageIndex = gnbMenuTemp.findIndex((menu) => menu.title === '마이페이지(개인)');
        else if (cookies.membertype === '0020' || cookies.membertype === '0030' || cookies.membertype === '0040') mypageIndex = gnbMenuTemp.findIndex((menu) => menu.title === '마이페이지(딜러)');
      }

      if (treeFromFlatData.length > 0 && mypageIndex > -1) {
        if (!isEmpty(gnbMenuTemp[mypageIndex].children)) {
          setLnbData(gnbMenuTemp[mypageIndex].children);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gnbMenuList]);

  useEffect(() => {
    setCookieMemberType(cookies.membertype);
    setCookieType(cookies.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  useEffect(() => {
    if (!isLoginPC) {
      // Router.push('/login');
      globalThis.window.location.href = '/login'
    }

    dispatch(selectMemberMypage({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCouponPage = useCallback((e, tabIndex) => {
    e.preventDefault();
    console.log('handleCouponPage> tabIndex=%o', tabIndex);
    Router.push(`/mypage/dealer/common/pointCuponHistory?tabIndex=${tabIndex}`);
  }, []);

  if (hasMobile) {
    if (isMyPage === true) {
      return (
        <>
          <ProdFilterTab
            active={sttDvcd}
            isMobile={true}
            items={[dealerProdList?.normalsaleprodcnt, dealerProdList?.managementsaleprodcnt, dealerProdList?.judgmentsaleprodcnt, dealerProdList?.waitingsaleprodcnt]}
            memberInfo={dealerProdList?.member}
          />

          <div className="mypage-profile pd20">
            <div className="float-wrap">
              <div className="s-name">
                <Button size="sml" background="blue80" title="딜러" width={31} height={20} fontSize={10} fontWeight={500} />
                <p className="u-name">{dealerMypageInfo?.mbNm}님, <span>환영합니다.</span></p>
                {!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.auctPrstlsMb) ? <div className="mt8">경매회원번호 : {dealerMypageInfo.auctPrstlsMb}</div> : ''}
                {!isEmpty(dealerMypageInfo) && isEmpty(dealerMypageInfo.auctPrstlsMb) && !isEmpty(dealerMypageInfo.auctPrstlsNrmlMb) ? <div className="mt8">오토옥션 계정 : {dealerMypageInfo.auctPrstlsNrmlMb}</div> : ''}
              </div>
              {/* {!isEmpty(dealerMypageInfo) && Number(dealerMypageInfo.mbEnEprDday) > 30 ? <span className="day tx-blue80"> [ {dealerMypageInfo.mbEnEprDday}일 ] </span> : ''}
              {!isEmpty(dealerMypageInfo) && Number(dealerMypageInfo.mbEnEprDday) > 0 && Number(dealerMypageInfo.mbEnEprDday) <= 30 ? (
                <span className="day tx-red80"> [ {dealerMypageInfo.mbEnEprDday}일 ]</span>
              ) : (
                ''
              )} */}
            </div>
            <div className="float-wrap mt16">
              <div className="notice">
                <Button size="sml" line="gray" title={'Point : ' + setComma(dealerMypageInfo?.pointsAvailable) + 'P'} onClick={(e) => handleCouponPage(e, 0)} fontSize={12} fontWeight={500} />
                <Button
                  size="sml"
                  line="gray"
                  title={'쿠폰 : ' + setComma(dealerMypageInfo?.couponAvailable) + '개'}
                  onClick={(e) => handleCouponPage(e, 0)}
                  fontSize={12}
                  fontWeight={500}
                  marginLeft={8}
                />
              </div>
              <ul className="tag">
                <li className={dealerMypageInfo?.homeServiceYn === 'Y' ? 'bg-purple' : 'bg-gray'}>홈</li>
                <li className={dealerMypageInfo?.pricingYn === 'Y' ? 'bg-mint' : 'bg-gray'}>프</li>
                <li className={dealerMypageInfo?.autoauctionMemberYn === 'Y' ? 'bg-red-brown' : 'bg-gray'}>오</li>
                <li className={dealerMypageInfo?.franchiseYn === 'Y' ? 'bg-brown' : 'bg-gray'}>fc</li>
              </ul>
            </div>
          </div>

          <div className="register-admin-wrap">
            <div className="float-wrap btn-s">
              <h3 className="tit2">
                등록 차량 관리<span>{dealerProdList?.totalsaleprodcnt}건</span>
              </h3>
              <Button size="sml" line="gray" radius={true} title="전체보기" width={61} fontSize={12} fontWeight={500} href="/mypage/dealer/sellcar/carManagement" />
            </div>
            <ul className="register-admin-tab">
              <li className="state-green on">
                <span>{dealerProdList?.normalsaleprodcnt}</span>정상판매중
              </li>
              <li className="state-blue">
                <span>{dealerProdList?.waitingsaleprodcnt}</span>대기차량
              </li>
              <li className="state-gray">
                <span>{dealerProdList?.managementsaleprodcnt}</span>관리필요
              </li>
              <li className="state-gray">
                <span>{dealerProdList?.judgmentsaleprodcnt}</span>판단보류
              </li>
            </ul>
          </div>

          <div className="payment-admin-wrap">
            <div className="float-wrap btn-s">
              <h3 className="tit2 fl">사용중인 이용권</h3>
            </div>
            <div className="voucher-slide-wrap mt12 mb12">
              {freepassinfo && (
                <div className="voucher-area">
                  <div className="float-wrap">
                    <p>자유이용권</p>
                    <Button size="sml" line="gray" color="gray" radius={true} title="광고연장" width={53} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup('adBuy', 'free')} />
                  </div>
                  {/* 자유이용권 (이용대수, 남은기간) */}
                  {getFreeTicketHtml(freepassinfo?.prodCnt ?? 0, freepassinfo?.retentionperiod ?? 0)}
                </div>
              )}

              {/* 대당이용권 */}
              {perpasscnt && getOneTimeTicketHtml(perpasscnt?.perCnt ?? 0)}

              {updatefreepassinfo && (
                <div className="voucher-area">
                  <div className="float-wrap">
                    <p>업데이트 자유권</p>
                    <Button size="sml" line="gray" color="gray" radius={true} title="광고연장" width={53} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup('adBuy', 'update')} />
                  </div>
                  {/* 업데이트 자유권(이용대수/가능대수, 남은기간) */}
                  {getUpdateFreeTicketHtml(updatefreepassinfo?.prodCnt ?? 0, updatefreepassinfo?.crSlot, updatefreepassinfo?.retentionperiod ?? 0)}
                </div>
              )}

              {/* 업데이트 대당권 */}
              {perupdatepasscnt && getUpdateOneTimeTicketHtml(perupdatepasscnt?.perCnt ?? 0)}
            </div>
          </div>

          {!isEmpty(lnbData) && (
            <div className="mypage-nav-renew pb24">
              <MypageNaviLnb lnbData={lnbData} />
            </div>
          )}

          <Buttons marginTop={12}>
            <Button size="full" background="blue20" color="blue80" radius={true} title="프라이싱센터 바로가기" href="/pricingSystem/pricing" nextLink={true} />
            <Button size="full" background="blue80" radius={true} title="Live Shot 배정 리스트" marginTop={16} href="/mypage/dealer/sellcar/liveAssignList" nextLink={true} />
          </Buttons>

          <div className={active ? 'modal-bg active' : 'modal-bg'} onClick={handleActiveToggle} />
          <MobBottomArea active={active} isFixButton={true}>
            <div className="inner">
              <p className="tit1 mb24">단체회원/제휴법인 신청</p>
              <ul className="radio-group vertical">
                <li>
                  <Radio id="member1" label="단체회원" value={1} checked={selectedMemberType} onChange={handleSelectedMemberTypeChanged} />
                </li>
                <li>
                  <Radio id="member2" label="금융사제휴회원" value={2} checked={selectedMemberType} onChange={handleSelectedMemberTypeChanged} />
                </li>
                <li>
                  <Radio id="member3" label="수입인증제휴회원" value={3} checked={selectedMemberType} onChange={handleSelectedMemberTypeChanged} />
                </li>
              </ul>
              <div className="mypage-admin-title mt24">
                <p className="tx-exp-tp5">&#8251; 회원유형 선택 후 신청을 하시면 회원님의 휴대폰 카카오톡 메세지로 신청양식 URL이 발송됩니다.</p>
                <p className="tx-exp-tp5">&#8251; 최종 승인까지는 영업일 기준 1~2일 소요됩니다.</p>
              </div>
            </div>
            <Button className="fixed" size="full" background="blue80" title="신청하기" />
          </MobBottomArea>

          <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={confirmMPop} isMask={true} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="exp">
                다시 보지 않기를 클릭 시 단체회원/제휴법인회원 ID를 발급받으실 수 없습니다.
                <br />
                그래도 진행하시겠습니까?
              </p>
              <Buttons align="right" marginTop={16}>
                <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={(e) => onSetTodayCheck(e, false)} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={confirmMPop} />
              </Buttons>
            </div>
          </RodalPopup>

          <MobFullpagePopup active={mFullpagePopup} paddingBottom={72}>
            {fpAdBuy && <MobPaymentGoods type={fpGoodsType} callback={goodsCallback} onClose={goodsClose} params={params} />}
            {fpPaymentInfo && (
              <>
                <h3 className="tit2 pd20">결제정보</h3>
                <MobPaymentInfo title={'경매 낙찰 이용권'} />
                <Buttons align="center" className="full fixed">
                  <Button size="big" background="blue20" color="blue80" title="취소" onClick={onClosePayment} />
                  <Button size="big" background="blue80" title="결제" onClick={paymentCallback} />
                </Buttons>
              </>
            )}
          </MobFullpagePopup>
        </>
      );
    }

    return isEmpty(lnbData) ? '' : <MypageNaviLnb lnbData={lnbData} />;
  }

  return (
    <div className="mypage-nav-sec">
      {cookieMemberType === '0010' ? (
        <div>
          <ul className="mypage-profile">
            <li className="tit">마이페이지</li>
            <li className="name">{dealerMypageInfo?.mbNm || ''}님, 환영합니다.</li>
            <li className="user-info">
              휴대폰 {!isEmpty(dealerMypageInfo) && dealerMypageInfo.mbHpPnDec}
              <br />
              이메일 {!isEmpty(dealerMypageInfo) && dealerMypageInfo.mbEmlAddrEncDec}
              {!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.auctPrstlsNrmlMb) ? (
                <>
                  <br /> 오토옥션 계정 {dealerMypageInfo.auctPrstlsNrmlMb}{' '}
                </>
              ) : (
                ''
              )}
              <Button size="full" onClick={(e) => onButtonClick(e, '/mypage/personal/info/changeInfo')} background="blue80" title="회원정보 수정" height={48} marginTop={11} />
            </li>
          </ul>
          {isEmpty(lnbData) ? '' : <MypageNaviLnb lnbData={lnbData} />}
        </div>
      ) : (
        ''
      )}
      {(cookieMemberType === '0020' || cookieMemberType === '0030' || cookieMemberType === '0040') && (
        <>
          <ul className="mypage-profile dealer">
            <li className="name">
              <div>
                <span>[{cookieMemberType === '0020' ? '딜러' : cookieMemberType === '0030' ? '단체' : cookieMemberType === '0040' ? '제휴' : ''}] </span>
                {!isEmpty(dealerMypageInfo) && dealerMypageInfo.mbNm} 님
                {!isEmpty(dealerMypageInfo) && Number(dealerMypageInfo.mbEnEprDday) > 30 ? <span className="day tx-blue80"> [ {dealerMypageInfo.mbEnEprDday}일 ] </span> : ''}
                {!isEmpty(dealerMypageInfo) && Number(dealerMypageInfo.mbEnEprDday) > 0 && Number(dealerMypageInfo.mbEnEprDday) <= 30 ? (
                  <span className="day tx-red80"> [ {dealerMypageInfo.mbEnEprDday}일 ]</span>
                ) : (
                  ''
                )}
                {!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.auctPrstlsMb) ? <div className="mt8">경매회원번호 : {dealerMypageInfo.auctPrstlsMb}</div> : ''}
                {!isEmpty(dealerMypageInfo) && isEmpty(dealerMypageInfo.auctPrstlsMb) && !isEmpty(dealerMypageInfo.auctPrstlsNrmlMb) ? <div className="mt8">오토옥션 계정 : {dealerMypageInfo.auctPrstlsNrmlMb}</div> : ''}
                {cookieMemberType === '0020' && (isEmpty(dealerMypageInfo) || Number(dealerMypageInfo.mbEnEprDday) < 0) ? (
                  <>
                    &nbsp;&nbsp;&nbsp; <p className="tx-exp-tp1"> </p>
                    <Tooltip simple={true} placement="bottom">
                      <TooltipItem>
                        <i className="ico-question" />
                      </TooltipItem>
                      <TooltipCont>
                        <p>종사원증을 갱신해주세요</p>
                      </TooltipCont>
                    </Tooltip>
                  </>
                ) : (
                  ''
                )}
              </div>
            </li>
            <li className="tag">
              <ul>
                <li className="homeservice on">
                  <i className="ico-dot big" />
                  홈서비스<em>{dealerMypageInfo?.homeServiceYn === 'Y' ? '활성' : '비활성'}</em>
                  <span className="ex">[홈서비스] 서비스 이용 {dealerMypageInfo?.homeServiceYn === 'Y' ? '가능' : '불가능'} 회원입니다.</span>
                </li>

                <li className="pricing on">
                  <i className="ico-dot big" />
                  프라이싱<em>{dealerMypageInfo?.pricingYn === 'Y' ? '활성' : '비활성'}</em>
                  <span className="ex">[프라이싱시스템] 이용 {dealerMypageInfo?.pricingYn === 'Y' ? '가능' : '불가능'} 회원입니다.</span>
                </li>

                <li className="autoauction">
                  <i className="ico-dot big" />
                  스마트옥션<em>{dealerMypageInfo?.autoauctionMemberYn === 'Y' ? '활성' : '비활성'}</em>
                  <span className="ex">[스마트옥션] 서비스 이용 {dealerMypageInfo?.autoauctionMemberYn === 'Y' ? '가능' : '불가능'} 회원입니다.</span>
                </li>

                <li className="franchise">
                  <i className="ico-dot big" />
                  프랜차이즈<em>{dealerMypageInfo?.franchiseYn === 'Y' ? '활성' : '비활성'}</em>
                  <span className="ex">[프랜차이즈] 서비스 이용 {dealerMypageInfo?.franchiseYn === 'Y' ? '가능' : '불가능'} 회원입니다.</span>
                </li>
              </ul>
            </li>
            <li className="notice">
              <ul>
                <li>
                  <Link href="/mypage/dealer/sellcar/homeServiceStatus">
                    <a>
                      <em>{!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.homeServiceResCount) ? dealerMypageInfo.homeServiceResCount : '0'}</em>
                      <i className="ico-heart-line" />
                      <p>
                        홈 서비스
                        <br />
                        예약
                      </p>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/mypage/dealer/common/counselCar">
                    <a>
                      <em>{!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.noteSentBoxCount) ? dealerMypageInfo.noteSentBoxCount : '0'}</em>
                      <i className="ico-note" />
                      <p>쪽지</p>
                    </a>
                  </Link>
                </li>
                <li>
                  <Tooltip placement="bottom" width={394} event="click">
                    <TooltipItem>
                      <Link href="#">
                        <a>
                          <em>
                            {!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.noticeCount) && !isEmpty(dealerMypageInfo.compareEstimateCount)
                              ? Number(dealerMypageInfo.noticeCount) + Number(dealerMypageInfo.compareEstimateCount)
                              : '0'}
                          </em>
                          <i className="ico-notice" />
                          <p>알림</p>
                        </a>
                      </Link>
                    </TooltipItem>
                    <TooltipCont>
                      <table summary="알림에 대한 내용" className="table-tp1 td-r">
                        <caption className="away">알림</caption>
                        <colgroup>
                          <col width="60%" />
                          <col width="40%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>공지사항</th>
                            <td>
                              <Link href="/cscenter/noticeList">
                                <a>
                                  <u>{!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.noticeCount) ? Number(dealerMypageInfo.noticeCount) : '0'}</u>
                                </a>
                              </Link>
                              건
                            </td>
                          </tr>
                          <tr>
                            <th>비교견적 입찰건수</th>
                            <td>
                              <Link href="/mypage/dealer/buycar/list">
                                <a>
                                  <u>{!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo.compareEstimateCount) ? Number(dealerMypageInfo.compareEstimateCount) : '0'}</u>
                                </a>
                              </Link>
                              건
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TooltipCont>
                  </Tooltip>
                </li>
              </ul>
            </li>
            <li className="save">
              <p className="point">
                포인트 :
                <Link href="#">
                  <a onClick={(e) => handleCouponPage(e, 0)}>
                    <span>
                      <u>{setComma(dealerMypageInfo?.pointsAvailable)}</u>
                    </span>
                  </a>
                </Link>
              </p>
              <p className="coupon">
                쿠폰 :
                <Link href="#">
                  <a onClick={(e) => handleCouponPage(e, 1)}>
                    <span>
                      <u>{setComma(dealerMypageInfo?.couponAvailable)}</u>
                    </span>
                  </a>
                </Link>{' '}
                개
              </p>
            </li>
          </ul>
          {console.log('MypageNavi> lnbData=%o', lnbData)}

          {isEmpty(lnbData) ? '' : <MypageNaviLnb lnbData={lnbData} />}
        </>
      )}
      {isEmpty(cookieMemberType) && cookieType === 'nonmember' && (
        <ul className="mypage-profile guest">
          <li className="visit">
            <Link href="/sellcar/visit/visitValuationRequest">
              <a>
                <p>방문평가 판매</p>
                <span>
                  클릭 한 번이면 끝!
                  <br />
                  견적부터 판매까지
                  <br />내 집 앞에서 편하게!
                </span>
              </a>
            </Link>
          </li>
          <li className="self">
            <Link href="/sellcar/self/selfSellCarGuide">
              <a>
                <p>셀프등록 판매</p>
                <span>
                  불편한 흥정은 이제 그만!
                  <br />
                  직접 등록하고 쉽게 견적
                  <br />
                  받으세요!
                </span>
              </a>
            </Link>
          </li>
          <li className="unassessed">
            <Link href="/sellcar/nonValue/noneValuationGuide">
              <a>
                <p>무평가 판매</p>
                <span>
                  신청완료와 동시에
                  <br />
                  차량 대금 먼저 지급!
                  <br />
                  이제 대금 먼저 받고
                  <br />
                  차량 판매하세요!
                </span>
              </a>
            </Link>
          </li>
          <li className="join">
            <Link href="/member/choiceMemberType">
              <a>
                <p>회원가입하기</p>
                <span>
                  중고차의 모든 것!
                  <br />
                  현대 오토벨에서
                  <br />
                  내차 사고 팔기
                  <br />
                  편리하게 이용하세요!
                </span>
              </a>
            </Link>
          </li>
        </ul>
      )}
      <RodalPopup show={isRodalShow} type={'fade'} closedHandler={handleIsRodalShowToggle} mode="normal" isMask={true} size="xs" subPop={false}>
        <div className="con-wrap">
          <p>
            차량광고제한 중에는
            <br /> 본 서비스를 이용하실 수 없습니다.
          </p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </div>
  );
});

MyPageNavi.propTypes = {
  dealerProdList: PropTypes.object,
  isMyPage: PropTypes.bool,
  memberType: PropTypes.string,
  mode: PropTypes.string,
  sttDvcd: PropTypes.any,
  params: PropTypes.object,
  usingTicketList: PropTypes.object
};
MyPageNavi.displayName = 'MyPageNavi';
export default MyPageNavi;
