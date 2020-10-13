import { useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classNames from "classnames/bind";
import { CommonContext } from './TopWrapper';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

const SiteMap = ({active}) => {  
  const { hasMobile } = useSelector(state => state.common);
  const { siteMapActive, setSiteMapActive, headerFix } = useContext(CommonContext);
  const handleMenuClose = useCallback(() => {
    setSiteMapActive(false);
    if (hasMobile) document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);
  const siteMapClass = classNames(
    {"active": siteMapActive},
    {"fixed": headerFix}
  );

  if (hasMobile) {
    return (
      <section id="m-site-map" className={siteMapClass}>
        <div className="inner">
          <div className="float-wrap">
            <span className="ico-wrap">
              <i className="ico-home"></i>
              <i className="ico-setting"></i>
            </span>
            <button onClick={handleMenuClose} className="btn-close">닫기</button>
          </div>

          {/* 로그인 전 */}
          {/* <div className="profile-wrap">
            <p className="tx-login">로그인해주세요.</p>
            <Buttons align="center" marginTop={40}>
              <Button size="sml" background="blue20" color="blue80" radius={true} title="로그인" measure='%' width={49} height={30} fontWeight={500} />
              <Button size="sml" background="blue20" color="blue80" radius={true} title="회원가입" measure='%' width={49} height={30}  mgMeasure = '%' marginLeft={2} fontWeight={500} />
            </Buttons>
          </div> */}

          {/* 딜러 회원 */}
          {/* <div className="profile-wrap">
            <div className="img-cover">
              <img src="/images/mobile/dummy/chat-img.png" alt="딜러 이미지"/>
            </div>
            <p>김딜러</p>
            <Buttons align="center" marginTop={24}>
              <Button size="sml" background="blue20" color="blue80" radius={true} title="마이페이지" measure='%' width={49} height={30} fontWeight={500} />
              <Button size="sml" background="blue20" color="blue80" radius={true} title="프라이싱" measure='%' width={49} height={30}  mgMeasure = '%' marginLeft={2} fontWeight={500} />
            </Buttons>
            <Button size="full" background="blue80" radius={true} title="Live  Shot 배정" measure='%' width={100} height={30} fontSize={12} fontWeight={500} marginTop={8} />
          </div> */}

          {/* 일반 회원 */}
          <div className="profile-wrap">
            <div className="img-cover">
              <img src="/images/mobile/dummy/chat-img.png" alt="딜러 이미지"/>
            </div>
            <p>김일반</p>
            <Buttons align="center" marginTop={24}>
              <Button size="sml" background="blue20" color="blue80" radius={true} title="마이페이지" width={101} height={30} fontWeight={500} />
            </Buttons>
          </div>

          <ul className="m-toggle-list">
            <MenuItem>
              <MenuTitle>내차사기</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>내차팔기</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>시세조회</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>제휴서비스</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>오토옥션</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>고객센터</MenuTitle>
              <MenuCont>
                <ul>
                  <li><Link href="#"><a>전체차량</a></Link></li>
                  <li><Link href="#"><a>라이브스튜디오</a></Link></li>
                  <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                  <li><Link href="#"><a>인증몰</a></Link></li>
                </ul>
              </MenuCont>
            </MenuItem>
          </ul>
          <ul className="notice-wrap">
            <li><Link href="#"><a>매매가이드</a></Link></li>
            <li><Link href="#"><a>공지사항</a></Link></li>
            <li><Link href="#"><a>이벤트</a></Link></li>
          </ul>
        </div>
        <Button className="fixed" size="full" background="blue80" title="오토벨앱 다운로드" height={50} fontSize={14} fontWeight={500} iconType="autobell" iconReverse={true} />
      </section>
    )
  }

  return (
    <section id="site-map" className={siteMapClass}>
      <h2 className="away">사이트 전체메뉴</h2>
      <div className="inner">
        <div className="main_menu">
          <h3 className="away">주요메뉴</h3>
          <ul>
            <li><Link href="#"><a>내차사기</a></Link>
              <ul>
                <li><Link href="#"><a>전체차량</a></Link></li>
                <li><Link href="#"><a>오토벨라이브</a></Link></li>
                <li><Link href="#"><a>경매낙찰차량</a></Link></li>
                <li><Link href="#"><a>인증몰</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>내차팔기</a></Link>
              <ul>
                <li><Link href="#"><a>방문평가 판매</a></Link></li>
                <li><Link href="#"><a>셀프등록 판매</a></Link></li>
                <li><Link href="#"><a>무평가 판매</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>시세조회</a></Link>
              <ul>
                <li><Link href="#"><a>프라이싱시스템</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>제휴서비스</a></Link>
              <ul>
                <li><Link href="#"><a>홈서비스</a></Link></li>
                <li><Link href="#"><a>금융서비스</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>오토옥션</a></Link></li>
            <li><Link href="#"><a>이용가이드</a></Link>
              <ul>
                <li><Link href="#"><a>EW 상품</a></Link></li>
                <li><Link href="#"><a>서비스가이드</a></Link></li>
                <li><Link href="#"><a>매매가이드</a></Link></li>
                <li><Link href="#"><a>이용권안내</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>이벤트</a></Link>
              <ul>
                <li><Link href="#"><a>진행중 이벤트</a></Link></li>
                <li><Link href="#"><a>포인트제휴몰</a></Link></li>
              </ul>
            </li>
            <li><Link href="#"><a>고객센터</a></Link>
              <ul>
                <li><Link href="#"><a>공지사항</a></Link></li>
                <li><Link href="#"><a>1:1 상담</a></Link></li>
                <li><Link href="#"><a>FAQ</a></Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="member_menu">
          <h3 className="away">회원메뉴</h3>
          <ul>
            <li><Link href="#"><a>회원가입</a></Link></li>
            <li><Link href="#"><a>로그인</a></Link></li>
            <li><Link href="#"><a>마이페이지</a></Link></li>
          </ul>
        </div>
        <div className="etc_menu">
          <h3 className="away">기타메뉴</h3>
          <ul>
            <li><Link href="#"><a>회사소개</a></Link></li>
            <li><Link href="#"><a>제휴문의</a></Link></li>
            <li><Link href="#"><a>이용약관</a></Link></li>
            <li><Link href="#"><a>개인정보처리방침</a></Link></li>
            <li><Link href="#"><a>영상정보처리방침</a></Link></li>
          </ul>
        </div>
        <button type="button" className="btn-close" onClick={handleMenuClose}><img src="/images/contents/btn-qm-close.png" alt="닫기"/></button>
      </div>
    </section>
  )
}

export default SiteMap;