import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import Slider from 'react-slick';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMain = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '마이페이지',
        options: ['back', 'alarm', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });

    const { result, member } = router.query;
    const [memberType, setMemberType] = useState(member);

    const handleMember = useCallback((e) => {
      e.preventDefault();
      setMemberType("normal")
    }, [memberType]);

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

    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    // 모바일 팝업
    const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
    const [todayCheck, setTodayCheck] = useState(false);
    const [bluePop1, setBluePop1] = useState(true);
    const [bluePop2, setBluePop2] = useState(true);

    const closeMPop = useCallback(
      (e) => {
        e.preventDefault();
        setMPop(false);
        setTodayCheck(false);
      },
      [setMPop, todayCheck]
    );
    const handleMPop = (e) => {
      e.preventDefault();
      setTodayCheck(true);
      setMPop(true);
    }
    const confirmMPop = (e) => {
      e.preventDefault();
      setMPop(false);
    }

    // 모바일 - 사용중인 이용권 슬라이드
    const [slideActive, setSlideActive] = useState(false)

    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      variableWidth: true,    
      draggable: true,
      touchMove: true,
      onInit: () => setSlideActive(true)
    }

    
    const closeBluePop1 = (e) => {
      e.preventDefault();
      setBluePop1(false);
    }
    const closeBluePop2 = (e) => {
      e.preventDefault();
      setBluePop2(false);
    }

    return (
      <AppLayout>
        {
          memberType === "stop" && (
            bluePop1 && <div className="stop-cover">
              <a href="#" className="popup-close" onClick={closeBluePop1} />
              <p>
                회원님은 현재 차량제한 중입니다.<br />
                광고제한기간은 2020.01.26까지 입니다.
                <span className="ex">&#8251; 제한사유 - 광고 게시글에 욕설/비속어 사용</span>
              </p>
            </div>
          )
        }
        {
          memberType === "no-group-id" && (
            bluePop2 && <div className="stop-cover">
              <a href="#" className="popup-close" onClick={closeBluePop2} />
              <p>
                소속상사 대표 회원이시군요.<br />
                편하게 소속 딜러와 소속 차량을 관리할 수 있는<br />
                단쳬회원/ 제휴법인회원 ID를 신청해보세요.
              </p>
              <Buttons align="center" marginTop={12}>
                <Button size="sml" line="gray" radius={true} title="신청하기" width={61} height={30} onClick={handleOpenPop} />
              </Buttons>
              <CheckBox id='chk-close' title='다시보지않기' size="small" checked={todayCheck} isSelf={false} onChange={handleMPop} />
            </div>
          )
        }

        <div className="mypage-profile pd20">
          <div className="float-wrap">
            <div className="name">
              <Button size="sml" background="gray" title="딜러회원" width={49} height={20} fontSize={10} fontWeight={500} />
              <p>김현대님, 환영합니다.</p>
            </div>
            <span className="day tx-blue80">-195일</span>
          </div>
          <div className="float-wrap mt16">
            <div className="notice">
              <Button size="sml" line="gray" title="포인트 : 3,000P" fontSize={12} fontWeight={500} />
              <Button size="sml" line="gray" title="쿠폰 : 3개" fontSize={12} fontWeight={500} marginLeft={8} />
            </div>
            <ul className="tag">
              <li className="bg-purple">홈</li>
              <li className="bg-mint">프</li>
              <li className="bg-red-brown">오</li>
              <li className="bg-brown">fc</li>
            </ul>
          </div>
        </div>

        <div className="register-admin-wrap">
          <div className="float-wrap btn-s">
            <h3 className="tit2">등록 차량 관리<span>60건</span></h3>
            <Button size="sml" line="gray" radius={true} title="전체보기" width={61} fontSize={12} fontWeight={500} href="/mypage/dealerSell01" />
          </div>
          <ul className="register-admin-tab">
            <li className="state-green on"><span>1</span>정상판매중</li>
            <li className="state-blue"><span>3</span>대기차량</li>
            <li className="state-gray"><span>2</span>판매완료</li>
          </ul>
        </div>

        <div className="payment-admin-wrap">
          <div className="float-wrap btn-s">
            <h3 className="tit2">사용중인 이용권</h3>
            <Button size="sml" line="gray" radius={true} title="전체보기" width={61} fontSize={12} fontWeight={500} href="/mypage/dealerSell01?seq=2" nextLink={true} />
          </div>
          <div className="voucher-slide-wrap">
            <div className={!slideActive ? "voucher-slide" : "voucher-slide active"}>
              <Slider {...settings}>
                <div className="voucher-area">
                  <p>자유이용권</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span><em>5</em>대 이용중</span>
                      <em>5/10</em>
                      <Button size="sml" line="gray" color="gray" radius={true} title="연장 및 추가" width={67} height={24} fontSize={10} fontWeight={500} />
                    </div>
                  </div>
                  <span className="date">D-78</span>
                </div>
                <div className="voucher-area">
                  <p>대당이용권</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span><em>5</em>대 이용중</span>
                    </div>
                  </div>
                </div>
                <div className="voucher-area">
                  <p>업데이트 20</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span>미사용중</span>
                    </div>
                  </div>
                </div>
                <div className="voucher-area">
                  <p>자유이용권</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span><em>5</em>대 이용중</span>
                      <em>5/10</em>
                      <Button size="sml" line="gray" color="gray" radius={true} title="연장 및 추가" width={67} height={24} fontSize={10} fontWeight={500} />
                    </div>
                  </div>
                  <span className="date">D-78</span>
                </div>
                <div className="voucher-area">
                  <p>대당이용권</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span><em>5</em>대 이용중</span>
                    </div>
                  </div>
                </div>
                <div className="voucher-area">
                  <p>업데이트 20</p>
                  <div className="cont-wrap">
                    <div className="cont">
                      <span>미사용중</span>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>

        <MypageNavi mode="dealer" memberType={memberType} />

        <Buttons marginTop={12} >
          <Button size="full" background="blue20" color="blue80" radius={true} title="프라이싱센터 바로가기" />
          <Button size="full" background="blue80" radius={true} title="Live Shot 배정 리스트" marginTop={16} />
        </Buttons>

        <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
        <MobBottomArea active={active} isFixButton={true}>
          <div className="inner">
            <p className="tit1 mb24">단체회원/제휴법인 신청</p>
            <ul className="radio-group vertical">
              <li><Radio id="member1" label="단체회원" value={1} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio id="member2" label="금융사제휴회원" value={2} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio id="member3" label="수입인증제휴회원" value={3} checked={isValue1} onChange={handleChange1} /></li>
            </ul>
            <div className="mypage-admin-title mt24">
              <p className="tx-exp-tp5">&#8251; 회원유형 선택 후 신청을 하시면 회원님의 휴대폰 카카오톡 메세지로 신청양식 URL이 발송됩니다.</p>
              <p className="tx-exp-tp5">&#8251; 최종 승인까지는 영업일 기준 1~2일 소요됩니다.</p>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="신청하기" />
        </MobBottomArea>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              다시 보지 않기를 클릭 시 단체회원/제휴법인회원 ID를 발급받으실 수 없습니다.<br />
              그래도 진행하시겠습니까?
            </p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeMPop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={confirmMPop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(DealerMain);
