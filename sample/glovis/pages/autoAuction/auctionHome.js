import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const AuctionHome = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const processList = [
    {
      step: '01',
      title: '출품신청',
      className: 'step1',
    },
    {
      step: '02',
      title: '탁송/입고',
      className: 'step2',
    },
    {
      step: '03',
      title: '차량평가',
      className: 'step3',
    },
    {
      step: '04',
      title: '경매진행',
      className: 'step4',
    },
    {
      step: '05',
      title: '대금입금',
      className: 'step5',
    },
    {
      step: '06',
      title: '사후확인',
      className: 'step6',
    }
  ];
  const [activeProcess, setActiveProcess] = useState(1);
  const handleProcessClick = useCallback((index) => () => {
    setActiveProcess(index+1)
  }, []);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  }

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '',
        options: ['back', 'gnb', 'transparent']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>
        <div className="auction-wrap">

          <div className="auction-home auction-top-banner">
            <div className="content-wrap">
              <h3>오토벨 스마트옥션 안내</h3>
              <p>공개 경쟁 입찰의 오토옥션으로<br />내 차를 최고가로 판매하세요.</p>
              <div className="content-box">
                <ul>
                  <li>
                    <span className="tit">출품 수수료</span>
                    <span className="price"><em>22,000</em>원</span>
                  </li>
                  <li>
                    <span className="tit">낙찰 수수료</span>
                    <span className="price">낙찰가의 <em>2.2%</em></span>
                    <span className="etc">(최소 110,000원/최대 440,000원)</span>
                  </li>
                </ul>
                <p className="info"><span>* 탁송료 등 부가적인 수수료가 별도로 발생할 수 있습니다.</span></p>
                <i className="top-banner-bg"></i>
              </div>
              <Button className="btn-base shadow" size="full" radius={true} line="white" color="white" marginTop={24} title="내 차 출품하기" fontSize={16} href="exhibitStep01" />
            </div>
          </div>

          <div className="content-wrap auction-process-wrap">
            <h3 className="tit2">출품 절차</h3>
            <div className="code-box auction-process-list" id="buttons">
              <ul className="m-toggle-list">
                <MenuItem>
                  <MenuTitle><em>01</em> 출품신청</MenuTitle>
                  <MenuCont>
                    <p className="con">출품을 원하실 때에는 <em>구비서류를 준비하여 아래 두가지 방법으로 출품신청</em>이 가능합니다.</p>
                    <div className="essential-point">
                      <ul>
                        <li><i className="ico-dot"></i>홈페이지신청 : 로그인 후 경매출품 신청</li>
                        <li><i className="ico-dot"></i>직접접수 : 경매장에 차량을 가지고 직접 방문</li>
                      </ul>
                    </div>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle><em>02</em> 탁송/입고</MenuTitle>
                  <MenuCont>
                    <p className="con">출품을 위해서는 <em>고객님이 직접 입고하시거나 탁송서비스를 이용</em>하실 수 있습니다. 탁송서비스는 홈페이지 에서 경매출품하기를 통해 신청 가능합니다.</p>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle><em>03</em> 차량평가</MenuTitle>
                  <MenuCont>
                    <p className="con">입고된 차량은 <em>전문화된 시스템을 통해 성능점검</em>이 진행되며, 그 결과는 성능점검표로 홈페이지를 통해 확인하실 수 있습니다.</p>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle><em>04</em> 경매진행</MenuTitle>
                  <MenuCont>
                    <p className="con"><em>경매는 시작 부터 출품번호 순으로 전국 회원사를 대상으로 진행되며 희망가 이상에서 낙찰됩니다.</em><br />경매결과(낙,유찰)는 경매종료 후 SMS 또는 홈페이지를 통해 알려드리며 유찰된 차량은 경매당일 후상담을 통해서 진행됩니다.<br />최종 유찰확정 시에는 재출품(22,000원 부과), 오토벨 매각의뢰, 반출(직접탁송, 위탁대행)을 선택하실 수 있습니다.</p>
                    <p className="tx-exp-tp3 mt10">*후상담 : 출품자의 동의를 얻어 희망가격을 조정해 낙찰 받는 방식</p>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle><em>05</em> 대금입금</MenuTitle>
                  <MenuCont>
                    <p className="con"><em>낙찰된 차량은 출품서류완비 및 기타하자(클레임, 저당)가 없을 시 지정된 계좌로 3일 이내 입금</em>되며,  <br />낙찰대금 입금 시에는 수수료공제(출품수수료, 낙찰수수료, 기타비용)후 입금 됩니다.  <br />계좌변경신청이 필요한 경우 대표전화로 문의 부탁드립니다.</p>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle><em>06</em> 사후확인</MenuTitle>
                  <MenuCont>
                    <p className="con"><em>명의이전은 법정기한인 15일 이내 명의이전 처리결과를 SMS를 통해 통보</em>해 드리며 <br />홈페이지를 통해 실시간 확인 가능합니다.<br />기타 낙찰자 과실(각종과태료)로 인해 발생한 문제는 글로비스 오토벨옥션에서 처리해 드리고 있습니다.</p>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </div>

          <div className="auction-program-wrap">
            <div className="content-wrap">
              <div className="auction-program-con essential-point">
                <h3 className="tit2">경매 프로그램</h3>
                <p className="con">경매 프로그램 설치 이후 경매 참여 및 관전 하실 수 있습니다.</p>
                <ul>
                  <li><i className="ico-dot"></i>경매 프로그램 설치 이후 경매 참여 및 관전 하실 수 있습니다.</li>
                  <li><i className="ico-dot"></i>일반회원은 '관전' 기능만 지원합니다.</li>
                </ul>
                <Buttons align="center" marginTop={24}>
                  <Button size="big" background="blue80" radius={true} title="경매 프로그램 다운로드" width={168} height={38} fontWeight={500} fontSize={14} onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}  />
                </Buttons>
              </div>
            </div>
          </div>

          <div className="auction-faq-wrap">
            <div className="content-wrap">
              <FaqList section="autoAuction" />
            </div>
          </div>

        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="auction-home auction-top-banner">
        <div className="content-wrap">
          <h3>오토옥션 안내</h3>
          <p>공개 경쟁 입찰의 오토옥션으로 내 차를 최고가로 판매하세요.</p>
          <div className="content-box">
            <ul>
              <li>
                <span className="tit">출품 수수료</span>
                <span className="price"><em>22,000</em>원</span>
              </li>
              <li>
                <span className="tit">낙찰 수수료</span>
                <span className="price">낙찰가의 <em>2.2%</em></span>
                <span className="etc">(최소 110,000원/최대 440,000원)</span>
              </li>
            </ul>
            <p className="info"><span>* 탁송료 등 부가적인 수수료가 별도로 발생할 수 있습니다.</span></p>
            <Button size="big" line="white" color="white" title="내 차 출품하기" marginTop={28} width={180} height={60} fontSize={19} href="exhibitStep01" />
          </div>
        </div>
      </div>
      <div className="content-wrap auction-process-wrap">
        <h3>오토벨 스마트옥션 <b>출품 절차</b></h3>
        <ul className="process-list">
          {
            processList.map((v, i) => {
              return (
              <li key={v.step} className={activeProcess === (i+1) ? `${v.className} on` : v.className} onClick={handleProcessClick(i)}>
                <span className="ico"></span>
                <span className="tit"><em>{v.step}</em>{v.title}</span>
              </li>
              )
            })
          }
        </ul>
      </div>
      <div className="auction-process-detail">
        <div className="content-wrap">
          <h4><span>STEP {processList[activeProcess-1].step}</span>{processList[activeProcess-1].title}</h4>
          {
            activeProcess === 1 && 
            <>
              <p className="con">출품을 원하실 때에는 <em>구비서류를 준비하여 아래 두가지 방법으로 출품신청</em>이 가능합니다.</p>
              <ul className="list">
                <li><em>· 홈페이지신청 :</em> 로그인 후 경매출품 신청</li>
                <li><em>· 직접접수 :</em> 경매장에 차량을 가지고 직접 방문</li>
              </ul>
            </>
          }
          {
            activeProcess === 2 && 
            <p className="con">출품을 위해서는 <em>고객님이 직접 입고하시거나 탁송서비스를 이용</em>하실 수 있습니다.<br />탁송서비스는 홈페이지 에서 경매출품하기를 통해 신청 가능합니다.</p>
          }
          {
            activeProcess === 3 && 
            <p className="con">입고된 차량은 <em>전문화된 시스템을 통해 성능점검</em>이 진행되며, <br />그 결과는 성능점검표로 홈페이지를 통해 확인하실 수 있습니다.</p>
          }
          {
            activeProcess === 4 && 
            <>
              <p className="con"><em>경매는 시작 부터 출품번호 순으로 전국 회원사를 대상으로 진행되며 희망가 이상에서 낙찰됩니다.</em><br />경매결과(낙,유찰)는 경매종료 후 SMS 또는 홈페이지를 통해 알려드리며 유찰된 차량은 경매당일 후상담을 통해서 진행됩니다.<br />최종 유찰확정 시에는 재출품(22,000원 부과), 오토벨 매각의뢰, 반출(직접탁송, 위탁대행)을 선택하실 수 있습니다.</p>
              <span className="tip">*후상담 : 출품자의 동의를 얻어 희망가격을 조정해 낙찰 받는 방식</span>
            </>
          }
          {
            activeProcess === 5 && 
            <p className="con"><em>낙찰된 차량은 출품서류완비 및 기타하자(클레임, 저당)가 없을 시 지정된 계좌로 3일 이내 입금</em>되며,  <br />낙찰대금 입금 시에는 수수료공제(출품수수료, 낙찰수수료, 기타비용)후 입금 됩니다.  <br />계좌변경신청이 필요한 경우 대표전화로 문의 부탁드립니다.</p>
          }
          {
            activeProcess === 6 && 
            <p className="con"><em>명의이전은 법정기한인 15일 이내 명의이전 처리결과를 SMS를 통해 통보</em>해 드리며 <br />홈페이지를 통해 실시간 확인 가능합니다.<br />기타 낙찰자 과실(각종과태료)로 인해 발생한 문제는 글로비스 오토벨옥션에서 처리해 드리고 있습니다.</p>
          }
        </div>
      </div>
      <div className="auction-program-wrap">
        <div className="content-wrap">
          <div className="auction-program-pic"></div>
          <div className="auction-program-con">
            <h3>경매 프로그램</h3>
            <p className="con">경매 프로그램 설치 이후 경매 참여 및 관전 하실 수 있습니다.</p>
            <ul className="list">
              <li>· 경매 프로그램 설치 이후 경매 참여 및 관전 하실 수 있습니다.</li>
              <li>· 일반회원은 '관전' 기능만 지원합니다.</li>
            </ul>
            <Button size="big" line="black" color="black" title="경매 프로그램 다운로드" width={300} height={60} fontSize={21} marginTop={59} onClick={handleRouter('/autoAuction/auctionInfo?seq=2')} />
          </div>
        </div>
      </div>
      <div className="auction-faq-wrap">
        <div className="content-wrap">
          <FaqList section="autoAuction" />
        </div>
      </div>
    </AppLayout>
  )
}

export default AuctionHome;