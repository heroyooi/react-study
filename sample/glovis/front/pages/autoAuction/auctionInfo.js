import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPerformanceSample from '@src/components/common/MobPerformanceSample';
import MobConsignInfo from '@src/components/common/MobConsignInfo';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';

import SlideBanner from '@src/components/common/banner/SlideBanner';
import { getNextAuctionInfo } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { mAuctionInfo } from '@src/dummy';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

import ConsignmentCost from './consignmentCost';
import AuctionJoin from './auctionJoin';

const AuctionInfo = ({ router }) => {
  const nf = Intl.NumberFormat();
  const dispatch = useDispatch();

  const { nextAuctionInfo } = useSelector((state) => state.autoAuction);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    if (isLoginLiveCheck()) {
      console.log('gInfoLive >>>>', gInfoLive());
    }
    dispatch({ type: SECTION_AUTO_AUCTION });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '스마트옥션',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const { seq } = router.query;
  const [crPrice, setCrPrice] = useState(0);
  const [feePrice, setFeePrice] = useState(0);
  const [consignPopup, setConsignPopup, openConsignPopup, closeConsignPopup] = useRodal(false, true); // 탁송료 안내 팝업
  const [auctionJoinPopup, setAuctionJoinPopup, openAuctionJoinPopup, closeAuctionJoinPopup] = useRodal(false, true); // 스마트옥션 가입 팝업

  const processList = [
    { step: '01', title: '회원가입', className: 'step1' },
    { step: '02', title: '실차확인', className: 'step2' },
    { step: '03', title: '입찰참여', className: 'step3' },
    { step: '04', title: '정산반출', className: 'step4' },
    { step: '05', title: '사후확인', className: 'step5' }
  ];
  const [activeProcess, setActiveProcess] = useState(1);
  const handleProcessClick = useCallback(
    (index) => () => {
      setActiveProcess(index + 1);
    },
    []
  );

  const [samplePop, setSamplePop, openSamplePop, closeSamplePop] = useRodal(false);

  useEffect(() => {
    if (seq !== undefined) window.scrollTo(0, 0);
  }, []);

  const [tabNum, setTabNum] = useState(0);
  const handleConsignFee = (e) => {
    e.preventDefault();
    setTabNum(3);
    setSamplePop(true);
  };

  const handleOnKeyUp = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const onlyNumber = /[0-9\b]+$/;
    for (const val of value) {
      if (val !== '' && !onlyNumber.test(val)) {
        setCrPrice('');
        e.target.value = '';
        return;
      }
    }
  };

  const onChangeInput = (e) => {
    const { value } = e.target;
    setCrPrice(value);
    if (value > 0) setFeePrice(value * 10000 * 0.022 < 110000 ? 110000 : value * 10000 * 0.022 > 440000 ? 440000 : value * 10000 * 0.022);
  };

  const onClickBtn = (e) => {
    document.location.href = `https://www.glovisaa.com/cm/fileDownMan.do?menuCd=PDF&filename=CD%2F9EdFVldkmj4UP5X2THKWVWm5GuDn6NSNfn3sr7c8%3D`;
  };

  const onClickManFileDown = () => {
    alert('메뉴얼 준비중입니다.');
    //document.location.href = `${baseUrl}/api/cm/fileDownMan.do?menuCd=PDF&amp;filename=CD%2F9EdFVldkmj4UP5X2THKWVWm5GuDn6NSNfn3sr7c8%3D`;
  };

  const installFileDown = (e) => {
    e.preventDefault();
    window.open('https://auction.autobell.co.kr/FileUpDown/setup/pc/AuctionPcApplicationSetup.exe');
  };

  const auctionJoin = (e) => {
    console.log('Auction Join :: => ');
    openAuctionJoinPopup(true);
  };

  const auctionJoinClose = (e) => {
    closeAuctionJoinPopup();
  };

  useEffect(() => {
    dispatch(getNextAuctionInfo());
  }, []);

  if (hasMobile) {
    const [fpPerformance, setFpPerformance] = useState(false);
    const [fpConsign, setFpConsign] = useState(false);
    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'performance') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '성능점검기록부 샘플',
              options: ['close']
            }
          });
          setFpConsign(false);
          setFpPerformance(true);
        } else if (name === 'consign') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '탁송료 안내',
              options: ['close']
            }
          });
          setFpPerformance(false);
          setFpConsign(true);
        }
      },
      [fpPerformance, fpConsign]
    );
    return (
      <AppLayout>
        <div className="auctionInfo auction-top-banner">
          <div className="content-wrap">
            <h3>다가오는 경매</h3>
            {nextAuctionInfo ? (
              <p className="text-box">
                <span className="date">
                  {nextAuctionInfo?.auctMonth}&nbsp;{nextAuctionInfo?.auctDay}일&nbsp;({nextAuctionInfo?.auctDate})&nbsp;{nextAuctionInfo?.auctTime}
                  <em>{nextAuctionInfo?.auctType === '20' ? '실시간' : ''}</em>
                </span>
                <span className="bnr-tit">{nextAuctionInfo?.auctTitle}</span>
                <span className="num">출품차량 {nf.format(nextAuctionInfo?.exhibitCount)}대</span>
              </p>
            ) : (
              <p className="text-box">다가오는 경매 정보가 없습니다.</p>
            )}
          </div>
        </div>

        <div className="auction-info-wrap">
          <h3 className="tit1">
            <em className="tx-blue80 tx-b">'오토벨 스마트옥션'</em>으로
            <br />
            언제 어디서나 편리한 경매참여
          </h3>
          <TabMenu type="type2" mount={false} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
            <TabCont tabTitle="오토벨 스마트옥션" id="tab1-1" index={0}>
              <div className="content-wrap">
                <p className="tx-tp1">분당,시화,양산 모든 경매센터의 출품차량을 입찰 할 수 있는 국내 최대 규모의 온라인 실시간 통합 경매서비스 입니다.</p>
                <ul className="num-list">
                  <li>
                    <p className="tit2">
                      <em>1</em>
                      <span>On-Line 실시간 입찰과 One-Stop 경매서비스</span>를 제공합니다.
                    </p>
                    <p className="exp">이젠 경매장에 직접 방문하지 않아도 온라인으로 경매참여를 할 수 있으며, PC프로그램과 모바일앱만 있으면 경매입찰부터 정산, 탁송신청 까지 모두 가능합니다.</p>
                  </li>
                  <li>
                    <p className="tit2">
                      <em>2</em>
                      <span>모바일 앱은 iOS와 ANDROID</span> 모두를 제공합니다.
                    </p>
                    <p className="exp">
                      애플 앱스토어와 구글 플레이스토어에서 ‘오토벨 스마트옥션’을 검색해주세요.
                      <br />
                      설치하는 순간 편리한 경매서비스를 누릴 수 있습니다.
                      <br />
                      <span className="tx-exp-tp5 mt8">&#8251; 단, OS의 버전은 원활한 사용을 위해 최신버전으로 유지하는 것을 권장합니다.</span>
                    </p>
                  </li>
                  <li>
                    <p className="tit2">
                      <em>3</em>
                      <span>증강현실 및 가상현실</span>의 3차원 정보를 제공합니다.
                    </p>
                    <p className="exp">
                      ‘오토벨 증강현실’ 앱을 통해 증강현실 기반 3D 성능점검표 차량위치정보를 제공합니다.
                      <br />
                      또한, ‘오토벨스마트옥션’ 앱은 차량실내사진을 360도 VR 이미지로 제공합니다.
                    </p>
                  </li>
                  <li>
                    <p className="tit2">
                      <em>4</em>
                      <span>4-Lane 경매 시스템을</span> 제공합니다.
                    </p>
                    <p className="exp">
                      멀티레인 경매시스템 도입으로 레인의 수를 자유롭게 조정 할 수 있으며, <br />
                      원활한 경매진행을 위해 출품대수에 따라 1~4레인까지 운영합니다.
                    </p>
                  </li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="경매프로그램 설치" id="tab1-2" index={1}>
              <div className="content-wrap">
                <p className="tx-tp1">
                  온라인 경매는 오토벨 스마트옥션 회원만 참여 가능합니다.
                  <br />
                  일반회원은 ‘관전’ 기능만 제공 됩니다.
                  <br />
                  프로그램 자동설치가 안될 경우 수동설치를 이용해주세요.
                </p>
                <ul className="text-list">
                  <li>
                    <p className="tit2">실시간 인터넷 경매응찰(일반회원 ‘관전’모드)</p>
                    <ul className="exp mt16 essential-point">
                      <li>
                        <i className="ico-dot"></i>PC응찰프로그램 설치를 위하여 “PC응찰프로그램설치” 를 클릭하여 설치하여 주십시오.
                      </li>
                      <li>
                        <i className="ico-dot"></i>PC에 JAVA프로그램이 설치되어 있지 않는 경우 최신 JAVA버전(1.8이상)을 먼저 설치하여 주십시오.
                      </li>
                    </ul>
                    <p className="tx-tp3 mt8 ml8">&#8251; 프로그램 다운로드는 PC에서 이용하실 수 있습니다.</p>
                    <div className="bg-box">
                      <ul className="exp">
                        <li>
                          <p className="tit4">1. PC응찰프로그램이 정상적으로 다운로드 되지 않는 경우</p>
                          <p className="con">
                            인터넷 익스플로러 > 도구 > 인터넷옵션 > 보안 > 신뢰할 수 있는 사이트 > 사이트 버튼 클릭 > 영역에 웹 사이트 추가 > www.glovisaa.com을 추가하신 후 다시 다운로드를 실행
                          </p>
                        </li>
                        <li>
                          <p className="tit4">2. PC응찰프로그램 설치 시 Windows7 이상 PC에서 Windows의 PC보호(Windows Defender Smart Screen)에 의해 설치 차단 되신 경우</p>
                          <p className="con">Defender Smart Screen 필터 해제 또는 차단 화면에서 추가정보 링크를 클릭 후 실행 버튼을 클릭 해주시기 바랍니다.</p>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <p className="tit2">현대글로비스 오토벨 스마트옥션 앱 다운로드</p>
                    <ul className="exp mt16 essential-point">
                      <li>
                        <i className="ico-dot"></i>경매응찰 앱은 안드로이드 5.0(롤리팝) 이상, iOS 버전 11.0 이상에서 지원됩니다.
                      </li>
                      <li>
                        <i className="ico-dot"></i>경매회원은 경매참가 및 마이페이지 기능을 사용 가능하며, 일반회원은 관전모드가 지원됩니다.
                      </li>
                      <li>
                        <i className="ico-dot"></i>안드로이드 폰은 <i className="googleplay"></i> , 아이폰은 <i className="appstore"></i>에서 다운받아 설치 가능합니다.
                      </li>
                    </ul>
                    <p className="tx-tp3 mt8 ml8">&#8251; 주의사항: 모바일 응찰 시 스마트폰 기종 및 통신사의 사정으로 경매참여에 장애가 발생 될 수 있습니다.</p>
                  </li>
                  <li>
                    <p className="tit2">최신 JAVA버전 설치하기</p>
                    <ul className="exp mt16">
                      <li>PC에 JAVA 프로그램이 설치되어 있지 않는 경우 최신 JAVA 프로그램(1.8이상)을 설치하여야 합니다.</li>
                    </ul>
                    <p className="tx-tp3 mt8">&#8251; 프로그램 다운로드는 PC에서 이용하실 수 있습니다.</p>
                  </li>
                  <li>
                    <p className="tit2">관전모드 실행하기</p>
                    <ul className="exp mt16">
                      <li>관전모드는 일반회원과 경매회원 중 경매제한 상태에서 가능하며, 설치 프로그램은 동일합니다. </li>
                    </ul>
                  </li>
                  <li>
                    <p className="tit2">현대글로비스 오토벨 스마트옥션 앱 다운로드</p>
                    <div className="bg-box slide">
                      <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={mAuctionInfo} dots={true}>
                        <div className="steps-slide">
                          <div className="steps-exp">
                            <ul className="exp essential-point">
                              <li>
                                <i className="ico-dot"></i>경매회원 마이페이지 제공
                              </li>
                              <li>
                                <i className="ico-dot"></i>당일 및 최근 경매일정 정보 제공
                              </li>
                              <li>
                                <i className="ico-dot"></i>모의경매, 튜토리얼 기능 제공
                              </li>
                              <li>
                                <i className="ico-dot"></i>부재자응찰, 관심차량 등록
                              </li>
                              <li>
                                <i className="ico-dot"></i>지정시간 경매 입찰
                              </li>
                              <li>
                                <i className="ico-dot"></i>실시간 경매, Spot 경매 참여
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="steps-slide">
                          <div className="steps-exp">
                            <ul className="exp essential-point">
                              <li>
                                <i className="ico-dot"></i>마이페이지 : 나의경매, 낙찰현황 등{' '}
                              </li>
                              <li>
                                <i className="ico-dot"></i>출품리스트 : 현재 경매참여 중인 Lane의 출품리스트
                              </li>
                              <li>
                                <i className="ico-dot"></i>관심차량 : 관심 차량으로 등록 한 차량에 대하여 표시
                              </li>
                              <li>
                                <i className="ico-dot"></i>부재자 응찰 : 부재자 응찰 한 차량에 대하여 표시
                              </li>
                              <li>
                                <i className="ico-dot"></i>권리 : 자신이 최고 응찰자인 경우 표시
                              </li>
                              <li>
                                <i className="ico-dot"></i>낙찰 : 자신이 차량을 낙찰 받은 경우 표시
                              </li>
                              <li>
                                <i className="ico-dot"></i>경매선택 : 멀티 Lane에 대하여 경매 참여 Lane 선택
                              </li>
                            </ul>
                            <Buttons align="center" marginTop={16} marginBottom={16}>
                              <Button
                                size="big"
                                background="blue80"
                                radius={true}
                                title="응찰 프로그램 매뉴얼"
                                width={155}
                                height={38}
                                fontWeight={500}
                                fontSize={14}
                                buttonMarkup={true}
                                onClick={onClickManFileDown}
                              />
                            </Buttons>
                          </div>
                        </div>
                      </SlideBanner>
                    </div>
                  </li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="이용안내(회원사)" id="tab1-3" index={2}>
              <div className="auction-process-detail info">
                <div className="content-wrap auction-info">
                  <h3 className="tit2 tx-c">입찰 절차</h3>
                  <div className="auction-step">
                    <Steps type={2} contents={['회원가입', '실차확인', '경매참여', '정산반출', '사후처리']} />
                  </div>
                  <ul>
                    <li>
                      <p className="tit4">
                        <em className="tx-blue80 tx-b">01</em> 회원가입
                      </p>
                      <p className="tx-tp2 mt8">
                        회원가입은 서류를 구비하여 경매장에 내방하시어 담당자와 상담 후 <em>절차에 따라 가입할 수 있습니다.</em>
                        <br />
                        가입비용은 보증금(300만원) / 연회비(25만원)입니다.
                      </p>
                      <Buttons align="center" marginTop={16}>
                        {!isLoginLiveCheck() && (
                          <Button
                            size="mid"
                            background="blue80"
                            radius={true}
                            title="스마트옥션 가입"
                            width={150}
                            height={38}
                            fontWeight={500}
                            fontSize={16}
                            buttonMarkup={true}
                            onClick={auctionJoin}
                          />
                        )}
                        {isLoginLiveCheck() && gInfoLive().membertype === '0020' && gInfoLive().auctPrstlsMbCustno === '' && (
                          <Button
                            size="mid"
                            background="blue80"
                            radius={true}
                            title="스마트옥션 가입"
                            width={150}
                            height={38}
                            fontWeight={500}
                            fontSize={16}
                            buttonMarkup={true}
                            onClick={auctionJoin}
                          />
                        )}
                      </Buttons>
                    </li>
                    <li>
                      <p className="tit4">
                        <em className="tx-blue80 tx-b">02</em> 실차확인
                      </p>
                      <p className="tx-tp2 mt8">
                        출품되는 차량은 홈페이지를 통해 실시간으로 사전확인 할 수 있고, 반드시 경매 당일 내방하시어
                        <br />
                        출품리스트 및 차량에 비치된 성능점검표를 참고하여 실제 차량상태를 확인하시기 바랍니다.
                      </p>
                      <p className="tx-tp3 mt8">&#8251; 스마트옥션에 참여하시기 전에 반드시 변경리스트를 참조하시고 차량을 재 확인하시기 바랍니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button
                          size="mid"
                          color="blue80"
                          background="blue20"
                          radius={true}
                          title="성능점검 절차보기"
                          width={139}
                          height={38}
                          fontWeight={500}
                          fontSize={14}
                          onClick={handleFullpagePopup('performance')}
                        />
                      </Buttons>
                    </li>
                    <li>
                      <p className="tit4">
                        <em className="tx-blue80 tx-b">03</em> 입찰참여
                      </p>
                      <p className="tx-tp2 mt8">입찰 참여 시 회원카드를 반드시 체크하시고, 회원 본인이 직접 참여 하셔야 합니다.</p>
                    </li>
                    <li>
                      <p className="tit4">
                        <em className="tx-blue80 tx-b">04</em> 정산/반출
                      </p>
                      <p className="tx-tp2 mt8">낙찰을 받으신 후 전용계좌로 해당대금을 정산하시면 입금표와 출고증을 교부해 드립니다.</p>
                      <table summary="낙찰대금 및 탁송료 입금계좌에 대한 내용" className="table-tp1 th-c td-c mt16">
                        <caption className="tit4">낙찰대금 및 탁송료 입금계좌</caption>
                        <colgroup>
                          <col width="16%" />
                          <col width="42%" />
                          <col width="42%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th></th>
                            <th>회원</th>
                            <th>CM, 일반인</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>내용</th>
                            <td>회원사별 전용계좌 입금</td>
                            <td>
                              경매장 공통계좌 입금
                              <br />
                              (KEB 하나은행)
                            </td>
                          </tr>
                          <tr>
                            <th rowSpan="3">
                              계좌
                              <br />
                              번호
                            </th>
                            <td rowSpan="3">
                              회원별 SMS발송
                              <br />
                              (최초 가입 시 전송)
                            </td>
                            <td>
                              분당
                              <br />
                              611-026740-316
                            </td>
                          </tr>
                          <tr>
                            <td>
                              시화
                              <br />
                              611-026740-241
                            </td>
                          </tr>
                          <tr>
                            <td>
                              양산
                              <br />
                              611-026740-266
                            </td>
                          </tr>
                          <tr>
                            <th>비고</th>
                            <td>낙찰대금, 탁송료 등</td>
                            <td>
                              (재)출품수수료,
                              <br />
                              탁송료
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                    <li>
                      <p className="tit4">
                        <em className="tx-blue80 tx-b">05</em> 사후처리
                      </p>
                      <p className="tx-tp2 mt8">
                        책임보험은 바로 가입하여 주시고 법정기한인 15일 이내에 명의이전을 해주시기 바랍니다.
                        <br />
                        만약 명의이전 기한이 경과되어 각종 과태료가 발생 시, 회원부담으로 과태료 정산이 이루어지니 유의하시기 바랍니다.
                        <br />
                        또한 차량의 중대한 결함이 발견되어 클레임을 신청할 경우에는 주어진 기한 내에 이의제기를 해주셔야 하며,
                        <br />
                        기한 경과 시에는 클레임 신청이 불가합니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="content-wrap auction-info">
                  <h3 className="tit2 tx-c">경매 수수료 계산</h3>
                  <p className="tx-tp2 tx-c mt16">
                    경매 수수료를 자동으로 계산해보는 예시입니다.
                    <br />
                    차량가격을 입력하시면 수수료를 포함한 입금액을
                    <br />
                    확인하실 수 있습니다.
                  </p>
                  <table summary="경매 수수료 계산에 대한 내용" className="table-tp1 input td-r mt16">
                    <caption className="away">경매 수수료 계산</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>차량가격</th>
                        <td>
                          <span className="bridge2">
                            <label className="hide" htmlFor="price">
                              차량가격
                            </label>
                            <Input type="text" id="price" className="w-price manwon" height={40} value={crPrice ? crPrice : ''} onChange={onChangeInput} onKeyUp={handleOnKeyUp} placeType={4} />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>낙찰 수수료</th>
                        <td>
                          <span>{crPrice > 0 ? nf.format(feePrice) : 0}</span>원
                        </td>
                      </tr>
                      <tr>
                        <th>총 입금액</th>
                        <td>
                          <span className="tx-blue80">
                            {crPrice > 0 ? nf.format(Number(crPrice * 10000) + Number(feePrice)) : 0}
                            <em>원</em>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-tp3 mt8">&#8251; 낙찰(상담)수수료 : 낙찰가의 2.2% (최소 110,000원 / 최대 440,000원)</p>
                  <p className="tx-tp3">&#8251; 탁송료 등 부가적인 수수료가 별도로 발생할 수 있습니다.</p>
                  <Buttons align="center" marginTop={16}>
                    <Button
                      size="mid"
                      color="blue80"
                      background="blue20"
                      radius={true}
                      title="탁송료 안내"
                      width={100}
                      height={38}
                      fontWeight={500}
                      fontSize={14}
                      onClick={handleFullpagePopup('consign')}
                    />
                  </Buttons>
                </div>
                <div className="content-wrap auction-info">
                  <h3 className="tit2 tx-c">교통편 안내</h3>
                  <p className="tx-tp2 tx-c mt16">
                    회원님들의 원활한 경매참여를 위해
                    <br />
                    경매 당일 1대의 버스를 운영하고 있습니다.
                  </p>
                  <table summary="분당 / 시화" className="table-tp1 input td-l mt16">
                    <caption className="tit4">분당 / 시화</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>출발지</th>
                        <td>KTX 동대구역(06:30)</td>
                      </tr>
                      <tr>
                        <th>경유지</th>
                        <td>대전IC(08:30), 천안IC(09:40)</td>
                      </tr>
                      <tr>
                        <th>버스운행</th>
                        <td>한양관광(협)</td>
                      </tr>
                    </tbody>
                  </table>
                  <table summary="양산" className="table-tp1 input td-l mt16">
                    <caption className="tit4">양산</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>출발지</th>
                        <td>KTX 동대구역(09:00)</td>
                      </tr>
                      <tr>
                        <th>경유지</th>
                        <td>용계시외버스터미널(09:10)</td>
                      </tr>
                      <tr>
                        <th>버스운행</th>
                        <td>한양관광(협)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabCont>
          </TabMenu>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={0}>
          {fpPerformance && <MobPerformanceSample />}
          {fpConsign && <MobConsignInfo />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>다가오는 경매</h3>
          {nextAuctionInfo ? (
            <p className="text-box">
              <span className="date">
                {nextAuctionInfo?.auctMonth}&nbsp;{nextAuctionInfo?.auctDay}일&nbsp;({nextAuctionInfo?.auctDate})&nbsp;{nextAuctionInfo?.auctTime}
              </span>
              {nextAuctionInfo?.auctType === '20' ? '실시간' : ''}
              <em>{nextAuctionInfo?.auctTitle}</em>
              <span className="num">출품차량 {nf.format(nextAuctionInfo?.exhibitCount)}대</span>
            </p>
          ) : (
            <p className="text-box none">다가오는 경매 정보가 없습니다.</p>
          )}
        </div>
      </div>

      <div className="auction-info-wrap">
        <h3>
          <span>'오토벨 스마트옥션'</span>으로 언제 어디서나 편리한 경매참여
        </h3>
        <TabMenu type="type1" mount={false} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
          <TabCont tabTitle="오토벨 스마트옥션은" id="tab1-1" index={0}>
            <div className="content-wrap">
              <div className="bg-box">
                <p>
                  분당, 시화, 양산 모든 경매센터의 출품차량을 입찰 할 수 있는
                  <br />
                  국내 최대 규모의 온라인 실시간 통합 경매서비스 입니다.
                </p>
              </div>
              <ul className="num-list">
                <li>
                  <p className="tit">
                    <em>1</em>
                    <span>On-Line 실시간 입찰과 One-Stop 경매서비스를 제공합니다.</span>
                  </p>
                  <p className="exp">
                    이젠 경매장에 직접 방문하지 않아도 온라인으로 경매참여를 할 수 있으며,
                    <br />
                    PC프로그램과 모바일앱만 있으면 경매입찰부터 정산, 탁송신청 까지 모두 가능합니다.
                  </p>
                </li>
                <li>
                  <p className="tit">
                    <em>2</em>
                    <span>모바일 앱은 iOS와 ANDROID</span> 모두를 제공합니다.
                  </p>
                  <p className="exp">
                    애플 앱스토어와 구글 플레이스토어에서 ‘오토벨 스마트옥션’을 검색해주세요
                    <br />
                    설치하는 순간 편리한 경매서비스를 누릴 수 있습니다.
                    <br />
                    <span>&#8251; 단, OS의 버전은 원활한 사용을 위해 최신버전으로 유지하는 것을 권장합니다.</span>
                  </p>
                </li>
                <li>
                  <p className="tit">
                    <em>3</em>
                    <span>증강현실 및 가상현실</span>의 3차원 정보를 제공합니다.
                  </p>
                  <p className="exp">
                    ‘오토벨 증강현실’ 앱을 통해 증강현실 기반 3D 성능점검표 차량위치정보를 제공합니다.
                    <br />
                    또한, ‘오토벨스마트옥션’ 앱은 차량실내사진을 360도 VR 이미지로 제공합니다.
                  </p>
                </li>
                <li>
                  <p className="tit">
                    <em>4</em>
                    <span>4-Lane 경매 시스템을</span> 제공합니다.
                  </p>
                  <p className="exp">
                    멀티레인 경매시스템 도입으로 레인의 수를 자유롭게 조정 할 수 있으며,
                    <br />
                    원활한 경매진행을 위해 출품대수에 따라 1~4레인까지 운영합니다.
                  </p>
                </li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="경매프로그램 설치하기" id="tab1-2" index={1}>
            <div className="content-wrap">
              <div className="bg-box install">
                <p>
                  <i className="ico-dot big"></i>온라인 경매는 오토벨 스마트옥션 회원만 참여 가능합니다.
                  <br />
                  <i className="ico-dot big"></i>일반회원은 ‘관전’ 기능만 제공 됩니다.
                  <br />
                  <i className="ico-dot big"></i>프로그램 자동설치가 안될 경우 수동설치를 이용해주세요.
                </p>
              </div>
              <ul className="text-list">
                <li>
                  <p className="tit">실시간 인터넷 경매응찰(일반회원 ‘관전’모드)</p>
                  <ul className="exp">
                    <li>PC응찰프로그램 설치를 위하여 “PC응찰프로그램설치” 를 클릭하여 설치하여 주십시오.</li>
                    <li>PC에 JAVA프로그램이 설치되어 있지 않는 경우 최신 JAVA버전(1.8이상)을 먼저 설치하여 주십시오.</li>
                  </ul>
                  <Buttons align="center" marginTop={31}>
                    <Button size="big" background="blue80" title="PC 응찰프로그램 설치" width={248} onClick={installFileDown} />
                  </Buttons>
                  <div className="line-box">
                    <p>
                      1. PC응찰프로그램이 정상적으로 다운로드 되지 않는 경우
                      <span>인터넷 익스플로러 > 도구 > 인터넷옵션 > 보안 > 신뢰할 수 있는 사이트 > 사이트 버튼 클릭 > 영역에 웹 사이트 추가 > www.glovisaa.com을 추가하신 후 다시 다운로드를 실행</span>
                    </p>
                    <p>
                      2. PC응찰프로그램 설치 시 Windows7 이상 PC에서 Windows의 PC보호(Windows Defender Smart Screen)에 의해 설치 차단 되신 경우
                      <span>Defender Smart Screen 필터 해제 또는 차단 화면에서 추가정보 링크를 클릭 후 실행 버튼을 클릭 해주시기 바랍니다.</span>
                    </p>
                  </div>
                </li>
                <li>
                  <p className="tit">현대글로비스 오토벨 스마트옥션 앱 다운로드</p>
                  <ul className="exp">
                    <li>경매응찰 앱은 안드로이드 5.0(롤리팝) 이상, iOS 버전 11.0 이상에서 지원됩니다.</li>
                    <li>경매회원은 경매참가 및 마이페이지 기능을 사용 가능하며, 일반회원은 관전모드가 지원됩니다.</li>
                    <li>
                      안드로이드 폰은 <i className="googleplay"></i>, 아이폰은 <i className="appstore"></i>에서 다운받아 설치 가능합니다.
                      <span>&#8251; 주의사항: 모바일 응찰 시 스마트폰 기종 및 통신사의 사정으로 경매참여에 장애가 발생 될 수 있습니다.</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="tit">최신 JAVA버전 설치하기</p>
                  <ul className="exp">
                    <li>PC에 JAVA 프로그램이 설치되어 있지 않는 경우 최신 JAVA 프로그램(1.8이상)을 설치하여야 합니다.</li>
                  </ul>
                  <Buttons align="center" marginTop={31}>
                    <Button size="big" background="blue80" title="최신 JAVA설치" width={248} href="https://www.java.com/ko" target="_blank" />
                  </Buttons>
                </li>
                <li>
                  <p className="tit">관전모드 실행하기</p>
                  <ul className="exp">
                    <li>관전모드는 일반회원과 경매회원 중 경매제한 상태에서 가능하며, 설치 프로그램은 동일합니다. </li>
                  </ul>
                </li>
                <li>
                  <p className="tit">현대글로비스 오토벨 스마트옥션 이용안내</p>
                  <div className="fl">
                    <div className="img-wrap"></div>
                    <ul className="exp">
                      <li>경매회원 마이페이지 제공</li>
                      <li>당일 및 최근 경매일정 정보 제공</li>
                      <li>모의경매, 튜토리얼 기능 제공</li>
                      <li>부재자응찰, 관심차량 등록</li>
                      <li>지정시간 경매 입찰</li>
                      <li>실시간 경매, Spot 경매 참여</li>
                    </ul>
                  </div>
                  <div className="fr">
                    <div className="img-wrap"></div>
                    <ul className="exp">
                      <li>마이페이지 : 나의경매, 낙찰현황 등 </li>
                      <li>출품리스트 : 현재 경매참여 중인 Lane의 출품리스트</li>
                      <li>관심차량 : 관심 차량으로 등록 한 차량에 대하여 표시</li>
                      <li>부재자 응찰 : 부재자 응찰 한 차량에 대하여 표시</li>
                      <li>권리 : 자신이 최고 응찰자인 경우 표시</li>
                      <li>낙찰 : 자신이 차량을 낙찰 받은 경우 표시</li>
                      <li>경매선택 : 멀티 Lane에 대하여 경매 참여 Lane 선택</li>
                    </ul>
                  </div>
                  <Buttons align="center" marginTop={59}>
                    <Button size="big" background="blue80" title="응찰 프로그램 매뉴얼" width={248} buttonMarkup={true} onClick={onClickManFileDown} />
                  </Buttons>
                </li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="이용안내(회원사)" id="tab1-3" index={2}>
            <div className="auction-process-wrap info">
              <h3>입찰절차</h3>
              <ul className="process-list">
                {processList.map((v, i) => {
                  return (
                    <li key={v.step} className={activeProcess === i + 1 ? `${v.className} on` : v.className} onClick={handleProcessClick(i)}>
                      <span className="ico"></span>
                      <span className="tit">
                        <em>{v.step}</em>
                        {v.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="auction-process-detail info">
              <div className="content-wrap">
                <h4>
                  <span>STEP {processList[activeProcess - 1].step}</span>
                  {processList[activeProcess - 1].title}
                </h4>
                {activeProcess === 1 && (
                  <>
                    <p className="con">
                      회원가입은 서류를 구비하여 경매장에 내방하시어 담당자와 상담 후 <em>절차에 따라 가입할 수 있습니다.</em>
                      <br />
                      가입비용은 보증금(300만원) / 연회비(25만원)입니다.
                    </p>
                    <Buttons align="center" marginTop={16}>
                      {!isLoginLiveCheck() && (
                        <Button size="mid" background="blue80" radius={true} title="스마트옥션 가입" width={150} height={38} fontWeight={500} fontSize={16} buttonMarkup={true} onClick={auctionJoin} />
                      )}
                      {isLoginLiveCheck() && gInfoLive().membertype === '0020' && gInfoLive().auctPrstlsMbCustno === '' && (
                        <Button size="mid" background="blue80" radius={true} title="스마트옥션 가입" width={150} height={38} fontWeight={500} fontSize={16} buttonMarkup={true} onClick={auctionJoin} />
                      )}
                    </Buttons>
                  </>
                )}
                {activeProcess === 2 && (
                  <>
                    <p className="con">
                      출품되는 차량은 홈페이지를 통해 실시간으로 사전확인 할 수 있고, 반드시 경매 당일 내방하시어
                      <br />
                      출품리스트 및 차량에 비치된 성능점검표를 참고하여 실제 차량상태를 확인하시기 바랍니다.
                    </p>
                    <span className="tip">&#8251; 스마트옥션에 참여하시기 전에 반드시 변경리스트를 참조하시고 차량을 재 확인하시기 바랍니다.</span>
                    <Buttons align="center" marginTop={32}>
                      <Button size="mid" line="gray" radius={true} title="성능점검 절차보기" width={174} onClick={(e) => openSamplePop(e, 'fade')} />
                    </Buttons>
                  </>
                )}
                {activeProcess === 3 && <p className="con">입찰 참여 시 회원카드를 반드시 체크하시고, 회원 본인이 직접 참여 하셔야 합니다.</p>}
                {activeProcess === 4 && (
                  <>
                    <p className="con">
                      <em>낙찰을 받으신 후 전용계좌로 해당대금을 정산하시면 입금표와 출고증을 교부해 드립니다.</em>
                    </p>
                    <table summary="낙찰대금 및 탁송료 입금계좌에 대한 내용" className="table-tp1 th-c td-c">
                      <caption>낙찰대금 및 탁송료 입금계좌</caption>
                      <colgroup>
                        <col width="16%" />
                        <col width="30%" />
                        <col width="34%" />
                        <col width="20%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>내용</th>
                          <th>계좌번호</th>
                          <th>비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>회원</td>
                          <td>회원사별 전용계좌 입금</td>
                          <td>회원별 SMS발송 (최초 가입 시 전송)</td>
                          <td>낙찰대금, 탁송료 등</td>
                        </tr>
                        <tr>
                          <td rowSpan="3">Cm, 일반인</td>
                          <td rowSpan="3">
                            경매장 공통계좌 입금
                            <br />
                            (KEB 하나은행)
                          </td>
                          <td>분당 611-026740-316</td>
                          <td rowSpan="3">
                            (재)출품수수료,
                            <br />
                            탁송료
                          </td>
                        </tr>
                        <tr>
                          <td>분당 611-026740-316</td>
                        </tr>
                        <tr>
                          <td>분당 611-026740-316</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
                {activeProcess === 5 && (
                  <p className="con">
                    책임보험은 바로 가입하여 주시고 법정기한인 15일 이내에 명의이전을 해주시기 바랍니다.
                    <br />
                    만약 명의이전 기한이 경과되어 각종 과태료가 발생 시, 회원부담으로 과태료 정산이 이루어지니 유의하시기 바랍니다.
                    <br />
                    또한 차량의 중대한 결함이 발견되어 클레임을 신청할 경우에는 주어진 기한 내에 이의제기를 해주셔야 하며,
                    <br />
                    기한 경과 시에는 클레임 신청이 불가합니다.
                  </p>
                )}
              </div>
            </div>
            <div className="content-wrap auction-info">
              <h3>경매 수수료 계산</h3>
              <p>
                경매 수수료를 자동으로 계산해보는 예시입니다.
                <br />
                차량가격을 입력하시면 수수료를 포함한 입금액을 확인하실 수 있습니다.
              </p>
              <table summary="경매 수수료 계산에 대한 내용" className="table-tp1 input td-r">
                <caption className="away">경매 수수료 계산</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td>
                      <label className="hide" htmlFor="price">
                        차량가격
                      </label>
                      <Input type="text" id="price" width={200} height={40} value={crPrice ? crPrice : ''} onChange={onChangeInput} onKeyUp={handleOnKeyUp} placeType={4} />
                      <em>만원</em>
                    </td>
                  </tr>
                  <tr>
                    <th>낙찰 수수료</th>
                    <td>
                      <span>{crPrice > 0 ? nf.format(feePrice) : 0}</span>원
                    </td>
                  </tr>
                  <tr>
                    <th>총 입금액</th>
                    <td>
                      <span className="tx-blue80">{crPrice > 0 ? nf.format(Number(crPrice * 10000) + Number(feePrice)) : 0}</span>원
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="sub">
                &#8251; 낙찰(상담)수수료 : 낙찰가의 2.2% (최소 110,000원 / 최대 440,000원)
                <br />
                &#8251; 탁송료 등 부가적인 수수료가 별도로 발생할 수 있습니다.
              </p>
              <Buttons align="right" marginTop={15}>
                <Button size="big" background="blue80" title="탁송료 안내" width={200} onClick={(e) => openConsignPopup(e, 'fade')} />
              </Buttons>

              <h3>교통편 안내</h3>
              <p>회원님들의 원활한 경매참여를 위해 경매 당일 1대의 버스를 운영하고 있습니다.</p>
              <ul>
                <li>
                  <em>분당 / 시화</em>
                  <p>
                    출발지: KTX 동대구역(06:30)
                    <br />
                    경유지: 대전IC(08:30), 천안IC(09:40)
                    <span>버스운행 : 한양관광(협)</span>
                  </p>
                </li>
                <li>
                  <em>양산</em>
                  <p>
                    출발지: KTX 동대구역(09:00)
                    <br />
                    경유지: 용계시외버스터미널(09:10)
                    <span>버스운행 : 한양관광(협)</span>
                  </p>
                </li>
              </ul>
            </div>
          </TabCont>
        </TabMenu>
      </div>

      <RodalPopup show={samplePop} type={'fade'} closedHandler={closeSamplePop} title="성능점검기록부 샘플" mode="normal" size="large">
        <div className="con-wrap popup-auction">
          <TabMenu type="type1" mount={false} defaultTab={tabNum} isSelf={false}>
            <TabCont tabTitle="성능점검절차" id="tab1-1" index={0}>
              <ul className="process-list">
                <li>
                  <span>01</span>전체평가
                </li>
                <li>
                  <span>02</span>실내평가
                </li>
                <li>
                  <span>03</span>외관평가
                </li>
                <li>
                  <span>04</span>엔진룸/하체평가
                </li>
                <li>
                  <span>05</span>주행평가
                </li>
              </ul>
              <ul className="process-detail">
                <li>
                  <h4>
                    <span>STEP 01</span>전체평가
                  </h4>
                  <p>자동차의 전체적인 인상 및 자세 확인(표준사양과의 차이점, 개조유무 등 도장색 상태 등)</p>
                </li>
                <li>
                  <h4>
                    <span>STEP 02</span>실내평가
                  </h4>
                  <p>실내옵션유무 / 작동성 및 상태확인</p>
                </li>
                <li>
                  <h4>
                    <span>STEP 03</span>외관평가
                  </h4>
                  <p>외관상태 및 사고유무 확인 (등화장치, 유리, 휠, 타이어 등)</p>
                </li>
                <li>
                  <h4>
                    <span>STEP 04</span>엔진룸/하체평가
                  </h4>
                  <p>엔진, 미션 기타장비의 성능 및 상태점검 (사고흔적, 누수, 누유 각 부의 상태점검)</p>
                </li>
                <li>
                  <h4>
                    <span>STEP 05</span>주행평가
                  </h4>
                  <p>엔진, 미션 조향, 현가, 제동장치 등의 종합적인 성능상태 확인</p>
                </li>
              </ul>
            </TabCont>
            <TabCont tabTitle="성능점검표" id="tab1-2" index={1}>
              <div className="performace-wrap">
                <table summary="기능상태점검에 대한 내용" className="table-tp1 th-c td-c">
                  <caption className="away">기능상태점검</caption>
                  <colgroup>
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="8.5%" />
                    <col width="32%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="8">기능상태점검</th>
                      <td rowSpan="3">
                        평가점
                        <span className="grade">
                          A <em>8</em>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>기관</th>
                      <td>보통</td>
                      <th>조향</th>
                      <td className="tx-blue80">정비요</td>
                      <th>기관</th>
                      <td>보통</td>
                      <th>동력전달</th>
                      <td>보통</td>
                    </tr>
                    <tr>
                      <th>제동</th>
                      <td>보통</td>
                      <th>전기</th>
                      <td>보통</td>
                      <th>제동</th>
                      <td>보통</td>
                      <th>실내</th>
                      <td>보통</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="기능상태점검에 대한 내용" className="table-tp1 th-c">
                  <caption className="away">기능상태점검</caption>
                  <colgroup>
                    <col width="26%" />
                    <col width="74%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>점검의견</th>
                      <th>차량상태점검</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PS이음 / 유격</td>
                      <td>
                        <img src="/images/contents/car-img-top2.png" alt="차량상태점검 이미지" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabCont>
            <TabCont tabTitle="평가점기준" id="tab1-3" index={2}>
              <div className="estimate-wrap">
                <p className="exp">
                  &#8251; 평가결과는 경매장 자체 평가기준에 의해 결정됩니다.
                  <br />
                  &#8251; 상품(중고차)의 특성으로 인해 평가기관에 따라 그 평가가 달라질 수 있습니다.
                </p>
                <table summary="사고평가점에 대한 내용" className="table-tp1 th-c">
                  <caption>1. 사고평가점</caption>
                  <colgroup>
                    <col width="26%" />
                    <col width="74%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>평점</th>
                      <th>평가기준</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A</td>
                      <td>주요골격 교환이력 없음</td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>앞/뒤 패널, 패널 1곳 이내, 주요골격 1곳 이내</td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>인사이드 패널, 트렁크플로어 패널 사고, 휠하우스 기준 주요골격 사고차량, B등급 사고 2곳 이상</td>
                    </tr>
                    <tr>
                      <td>D</td>
                      <td>휠하우스 1곳 이내, C등급 사고 2곳 이상</td>
                    </tr>
                    <tr>
                      <td>E</td>
                      <td>플로어패털/프레임 교환 시, 루프/탑 교환, D등급 사고 2곳 이상</td>
                    </tr>
                  </tbody>
                </table>
                <p className="sub">* 주요골격의 교환(xx)유무로만 평가 (주요골격은 사고평가부위 참조)</p>
                <table summary="종합평가점에 대한 내용" className="table-tp1 th-c">
                  <caption>2. 종합평가점</caption>
                  <colgroup>
                    <col width="26%" />
                    <col width="74%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>평점</th>
                      <th>점수구간ㄴ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>9</td>
                      <td>감점의 합 : 0 ~ 10점</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>감점의 합 : 11 ~ 25점</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>감점의 합 : 26 ~ 40점</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>감점의 합 : 41 ~ 55점</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>감점의 합 : 56 ~ 70점</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>감점의 합 : 71 ~ 85점</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>감점의 합 : 86 ~ 100점</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>감점의 합 : 101 ~ 115점</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>감점의 합 : 116점 이상</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="표기방법에 대한 내용" className="table-tp1 th-c">
                  <caption>3. 표기방법</caption>
                  <colgroup>
                    <col width="26%" />
                    <col width="74%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>평가종류</th>
                      <th>점수구간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>사고평점</td>
                      <td>A, B, C, D, F</td>
                    </tr>
                    <tr>
                      <td>종합평점</td>
                      <td>9, 8, 7, 6, 5, 4, 3, 2, 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabCont>
            <TabCont tabTitle="외관표시기준" id="tab1-4" index={3}>
              <p className="exp">&#8251; 출품차량에 대한 평가점(사고평가/종합평가)은 내, 외관 및 주행거리에 한합니다.</p>
              <table summary="외관표시기준에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">외관표시기준</caption>
                <colgroup>
                  <col width="18%" />
                  <col width="18%" />
                  <col width="64%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>약어</th>
                    <th>약어 표기</th>
                    <th>상세설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xx</td>
                    <td>교환</td>
                    <td>
                      볼트체결 : 모든 볼트가 풀린 흔적이 있는 경우
                      <br />
                      (단.앞판넬 : 펜더나 본넷중 하나만이라도 조정작업이거나 교환이면 교환)
                    </td>
                  </tr>
                  <tr>
                    <td>pp</td>
                    <td>도장/판금</td>
                    <td>육안으로 확인해서 도장이 들어간 것으로 판단한 경우</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">f</td>
                    <td rowSpan="2">꺾임</td>
                    <td>골격부위가 꺾여 있거나, 꺾인 흔적이 있다고 판단한 경우</td>
                  </tr>
                  <tr>
                    <td>골격부위 교환이 없으나 다른 여파로 인한 골격의 꺾임이 확인되는 경우</td>
                  </tr>
                  <tr>
                    <td>w</td>
                    <td>용접</td>
                    <td>골격부위의 교환수리가 아닌 본래 차량의 부위를 판금 후 용접해서 작업한 경우</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">m</td>
                    <td rowSpan="2">조정작업</td>
                    <td>볼트체결부위 중 단 1개라도 풀리지 않은 폴드가 있는 경우</td>
                  </tr>
                  <tr>
                    <td>볼트체결앞판넬 : 팬더나 본넷의 교환이 없고 조정작업도 없을 시 기재</td>
                  </tr>
                  <tr>
                    <td>x</td>
                    <td>교환필요</td>
                    <td>외관의 찌그러짐이나 부식이 심해서 판넬이 찢어져있거나 떨어진 경우</td>
                  </tr>
                  <tr>
                    <td>P</td>
                    <td>도장필요</td>
                    <td>외관의 찌그러짐은 없으나 페인트가 긁혀서 도장을 필요하다고 판단 또는 문콕 개수가 3개 이하</td>
                  </tr>
                  <tr>
                    <td>Q</td>
                    <td>판금필요</td>
                    <td>외관의 찌그러짐이 있을 때나 부식으로 인해 판금이 필요하다고 판단 또는 문콕 개수가 3개 이상</td>
                  </tr>
                  <tr>
                    <td>A</td>
                    <td>상처</td>
                    <td>외관의 상처가 없고 잔기스(광택으로 제거가능)가 있을 시 기재 또는 문콕 개수가 1~2개 이하</td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>부식</td>
                    <td>외관의 부식이 진행되고 있거나, 부식으로 인한 구멍이 발생한 경우</td>
                  </tr>
                </tbody>
              </table>
            </TabCont>
            <TabCont tabTitle="기능상태점검 항목" id="tab1-5" index={4}>
              <Buttons align="center" marginTop={16} marginBottom={16}>
                <Button
                  size="big"
                  background="blue80"
                  radius={true}
                  title="기능상태점검 항목 다운로드"
                  width={190}
                  height={38}
                  fontWeight={500}
                  fontSize={14}
                  buttonMarkup={true}
                  onClick={onClickBtn}
                />
              </Buttons>
            </TabCont>
          </TabMenu>
        </div>
      </RodalPopup>
      <ConsignmentCost show={consignPopup} onChange={closeConsignPopup} />

      <RodalPopup show={auctionJoinPopup} type={'fade'} closedHandler={auctionJoinClose} title="스마트옥션 가입 신청" mode="normal" size="large">
        <div className="con-wrap popup-auction">
          <AuctionJoin />
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default withRouter(AuctionInfo);
