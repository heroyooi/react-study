import { useState, useCallback } from 'react';
import Link from 'next/link'
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

const Index = () => {
  const createProgress = (num) => {
    let progress_style = ''
    if (num >= 10 && num <= 49) {
      progress_style = 'grade10'
    } else if (num >= 50 && num <= 59) {
      progress_style = 'grade50'
    } else if (num >= 60 && num <= 69) {
      progress_style = 'grade60'
    } else if (num >= 70 && num <= 79) {
      progress_style = 'grade70'
    } else if (num >= 80 && num <= 89) {
      progress_style = 'grade80'
    } else if (num >= 90 && num <= 99) {
      progress_style = 'grade90'
    } else if (num === 100) {
      progress_style = 'grade100'
    }
    return (
      <div className={progress_style}>
        <p>{num}%</p>
        <span><em style={{ width: `${num}%` }}></em></span>
      </div>
    )
  }

  const toggleMenu = (initValue = false) => {
    const [value, setter] = useState(initValue)
    const handler = useCallback((e) => {
      setter(!value)
    }, [value])
    return [value, setter, handler]
  }

  const initToggleValue = false; // npm run build & export시 true로 설정
  const [toggle1, setToggle1, handleToggle1] = toggleMenu(initToggleValue); // 내차사기
  const [toggle2, setToggle2, handleToggle2] = toggleMenu(initToggleValue); // 내차팔기
  const [toggle3, setToggle3, handleToggle3] = toggleMenu(initToggleValue); // 시세조회
  const [toggle4, setToggle4, handleToggle4] = toggleMenu(initToggleValue); // 홈서비스
  const [toggle5, setToggle5, handleToggle5] = toggleMenu(initToggleValue); // 오토옥션
  const [toggle6, setToggle6, handleToggle6] = toggleMenu(initToggleValue); // 프라이싱 시스템
  const [toggle7, setToggle7, handleToggle7] = toggleMenu(initToggleValue); // 마이페이지(일반)
  const [toggle8, setToggle8, handleToggle8] = toggleMenu(initToggleValue); // 마이페이지(딜러)
  const [toggle9, setToggle9, handleToggle9] = toggleMenu(initToggleValue); // 매매가이드
  const [toggle10, setToggle10, handleToggle10] = toggleMenu(initToggleValue); // 이벤트
  const [toggle11, setToggle11, handleToggle11] = toggleMenu(initToggleValue); // 고객센터
  const [toggle12, setToggle12, handleToggle12] = toggleMenu(initToggleValue); // 로그인/회원가입
  const [showMenu, setShowMenu] = useState(true);
  const hadleShowMenu = useCallback((e) => {
    e.preventDefault();
    if (showMenu === false) {
      setShowMenu(true);
      setToggle1(true);
      setToggle2(true);
      setToggle3(true);
      setToggle4(true);
      setToggle5(true);
      setToggle6(true);
      setToggle7(true);
      setToggle8(true);
      setToggle9(true);
      setToggle10(true);
      setToggle11(true);
      setToggle12(true);
    } else {
      setShowMenu(false);
      setToggle1(false);
      setToggle2(false);
      setToggle3(false);
      setToggle4(false);
      setToggle5(false);
      setToggle6(false);
      setToggle7(false);
      setToggle8(false);
      setToggle9(false);
      setToggle10(false);
      setToggle11(false);
      setToggle12(false);
    }
  }, [showMenu]);

  return (
    <div className="coding-wrap">
      <div className="map-header">
        <h3>GLOVIS MOBILE <b>CODING MAP</b> <Link href="/"><a className="btn">PC 코딩맵 바로가기</a></Link></h3>
        <ul className="map-tit">
          <li>Depth1</li>
          <li>Depth2</li>
          <li>Depth3</li>
          <li>Depth4</li>
          <li>Depth5</li>
          <li>Screen ID</li>
          <li className="file">File</li>
          <li className="progress">Progress</li>
          <li className="link">Link</li>
          <li>Description</li>
        </ul>
      </div>

      <ul className="coding-map">
        <li> {/* 스타일 가이드 */}
          <ul className="row main-sec">
            <li><span>스타일 가이드</span></li>
            <li><span>스타일 가이드</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li className="file"><span>commonStyle</span></li>
            <li className="progress">{createProgress(0)}</li>
            <li className="link"><Link href="/commonStyle"><a className="link-btn before" target="_blank">작업전</a></Link></li>
            <li><span></span></li>
          </ul>
        </li>
        <li> {/* 메인 */}
          <ul className="row main-sec">
            <li className="nbd"><span>메인</span></li>
            <li><span>메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li className="file"><span>main</span></li>
            <li className="progress">{createProgress(70)}</li>
            <li className="link"><Link href="main"><a className="link-btn on" target="_blank">작업중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 방푼평가 내 자세히보기 클릭시 약관팝업 노출요청</p>
                      <p>- BEST PICK, 인기차량 모아보기 swipe요청</p>
                      <p>- 일부 디자인 바뀔 가능성 있음</p>                      
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>v1.71</span>
            </li>
          </ul>
        </li>

        <li> {/* 내차사기 */}
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle1}>{toggle1 ? "-" : "+"}</span><span>내차사기</span></li>
            <li><span>차량 리스트 O</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-BC-MA-001</span></li>
            <li className="file"><span>buy/list</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/buy/list"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>
        {
          toggle1 === true &&
          <>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>차량 리스트 X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/list?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/list?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>차량조건 검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/listSearchFilter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 기능 작업 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>지역 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearchFilter02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>옵션 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearchFilter03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>색상 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearchFilter04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>연료 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearchFilter05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>변속기 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/listSearchFilter06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/listSearchFilter06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            {/* <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>키워드 검색</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-001</span></li>
                <li className="file"><span>buy/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/buy/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>오토벨라이브스튜디오</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-LS-001</span></li>
                <li className="file"><span>buy/liveList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/liveList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>라이브스튜디오</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-LS-003</span></li>
                <li className="file"><span>buy/liveGuide</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/liveGuide"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>경매낙찰차량</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AU-001</span></li>
                <li className="file"><span>buy/auctionList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/auctionList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>인증몰</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/certifyMall</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/certifyMall"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>인증몰 입점 문의</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-CM-003</span></li>
                <li className="file"><span>buy/certifyMallInquire</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/certifyMallInquire"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>인증브랜드 리스트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-CM-002</span></li>
                <li className="file"><span>buy/brandList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/brandList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>수입인증 차량조건 검색</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/brandSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/brandSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/brandSearchFilter01</span></li>
                <li className="progress">{createProgress(50)}</li>
                <li className="link"><Link href="/buy/brandSearchFilter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>지역 선택</span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/brandSearchFilter02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/brandSearchFilter02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>연료 선택</span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/brandSearchFilter03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/brandSearchFilter03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>금융사/프랜차이즈 인증 차량조건 검색</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/financeSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/financeSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span>IA-M-BC-CM-001</span></li>
                <li className="file"><span>buy/financeSearchFilter01</span></li>
                <li className="progress">{createProgress(50)}</li>
                <li className="link"><Link href="/buy/financeSearch"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>상세</span></li>
                <li><span>일반/수입/금융사 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-008</span></li>
                <li className="file"><span>buy/viewA</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/viewA"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량옵션 정보제공 디자인 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>경매낙찰차량 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AU-001</span></li>
                <li className="file"><span>buy/viewB</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/viewB"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량옵션 정보제공 디자인 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>라이브스튜디오 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-LS-002</span></li>
                <li className="file"><span>buy/viewC</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/viewC"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량옵션 정보제공 디자인 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매자 연락처</span></li>
                <li><span>IA-M-BC-DT-006</span></li>
                <li className="file"><span>buy/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/buy/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검기록부 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-011</span></li>
                <li className="file"><span>buy/viewPerformance</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/viewPerformance"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 자동차 상태표시 라벨 위치 적용 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>판매자정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-007</span></li>
                <li className="file"><span>buy/sellerInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/sellerInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>퀵뷰</span></li>
                <li><span>최근 본 차량, 관심 차량, 차량비교</span></li>
                <li><span>결과O</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-002</span></li>
                <li className="file"><span>buy/quickMenu</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/quickMenu"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-002</span></li>
                <li className="file"><span>buy/quickMenu?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/quickMenu?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle2}>{toggle2 ? "-" : "+"}</span><span>내차팔기</span></li>
            <li><span>서브메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-SC-MA-001</span></li>
            <li className="file"><span>sell/sellHome</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/sell/sellHome"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {
          toggle2 === true &&
          <>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>방문평가 판매</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-VS-006</span></li>
                <li className="file"><span>sell/visitApply</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/visitApply"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문평가 신청 완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-VS-007</span></li>
                <li className="file"><span>sell/visitComplete</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/visitComplete"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>셀프등록 판매</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-001</span></li>
                <li className="file"><span>sell/selfHome</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfHome"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>셀프등록 판매 신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(비로그인 상태에서 진행하는 경우)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(차량명 확인)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량소유자 정보 확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-003</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보제공 동의</span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-004</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>셀프등록 판매 신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-005</span></li>
                <li className="file"><span>sell/selfStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량검색 풀페이지 팝업으로 변경 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-006</span></li>
                <li className="file"><span>sell/selfStep01Filter01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/selfStep01Filter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 기능 작업 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 기본 정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-007</span></li>
                <li className="file"><span>sell/selfStep02</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/selfStep02"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 옵션 정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-008</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(주행거리 입력)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(판금/교환 부위 입력)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(차량설명 입력)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문지역 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-VS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(서비스 이용동의)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-002</span></li>
                <li className="file"><span>sell/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/sell/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록(모바일 웹)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-009</span></li>
                <li className="file"><span>sell/selfStep03</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/selfStep03"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- PC와 기획 상이 확인 필요</p>
                          <p>- 변경 아이콘 적용 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록(모바일 앱_촬영 기능 호출 전)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-009</span></li>
                <li className="file"><span>sell/selfStep03?ver=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep03?ver=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록(모바일 앱_촬영 기능 호출 후)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-009</span></li>
                <li className="file"><span>sell/selfStep03?ver=3</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep03?ver=3"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사진촬영 내역</span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-010</span></li>
                <li className="file"><span>sell/selfStep03_01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/selfStep03_01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 촬영내역 리스트 수급 필요</p>
                          <p>- 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>촬영 기능안내</span></li>
                <li><span>촬영가이드, 360 촬영,<br />차량 외부, 차량 내부</span></li>
                <li><span>IA-M-SC-SS-011~4</span></li>
                <li className="file"><span>sell/selfStep03_02</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/selfStep03_02"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-SS-015</span></li>
                <li className="file"><span>sell/selfStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>무평가 판매</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-NS-001</span></li>
                <li className="file"><span>sell/freeHome</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeHome"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>무평가 판매 신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-NS-001</span></li>
                <li className="file"><span>sell/freeStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량검색 풀페이지 팝업으로 변경 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>주소입력(선택 정보)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-NS-001</span></li>
                <li className="file"><span>sell/freeStep01Filter01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep01Filter01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SC-NS-014</span></li>
                <li className="file"><span>sell/freeStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle3}>{toggle3 ? "-" : "+"}</span><span>시세조회</span></li>
            <li><span>서브메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-SP-MA-001</span></li>
            <li className="file"><span>marketPrice/marketPrice</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/marketPrice/marketPrice"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>
        {
          toggle3 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량조건 검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-007</span></li>
                <li className="file"><span>marketPrice/marketSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 기능 작업 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>옵션 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>색상 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>연료 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>변속기 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배기량 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-AC-007</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSearchFilter06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조건검색</span></li>
                <li><span>결과 O</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-004</span></li>
                <li className="file"><span>marketPrice/marketView?search=condition</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketView?search=condition"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량번호 검색</span></li>
                <li><span>번호검색</span></li>
                <li><span>결과 O</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-008</span></li>
                <li className="file"><span>marketPrice/marketView?search=number</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketView?search=number"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과O(등급 미포함)</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-NS-001</span></li>
                <li className="file"><span>marketPrice/marketViewGrade</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketViewGrade"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/*
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차명 재선택</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-005</span></li>
                <li className="file"><span>marketPrice/marketSearchFilter01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="marketPrice/marketSearchFilter01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-006</span></li>
                <li className="file"><span>marketPrice/marketInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상세사양</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-NS-002</span></li>
                <li className="file"><span>marketPrice/marketSpecify</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketSpecify"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>시세리포트출력</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-NS-003</span></li>
                <li className="file"><span>marketPrice/marketViewNum?report=true</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketViewNum?report=true"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>공통</span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-004</span></li>
                <li className="file"><span>marketPrice/marketView?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/marketPrice/marketView?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle4}>{toggle4 ? "-" : "+"}</span><span>홈서비스</span></li>
            <li><span>홈서비스 안내</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-HS-GS-001</span></li>
            <li className="file"><span>homeService/serviceInfo</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/homeService/serviceInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 약관 팝업 수급 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {
          toggle4 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>서브메인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-001</span></li>
                <li className="file"><span>homeService/serviceHome</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceHome"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량조건 검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-002</span></li>
                <li className="file"><span>homeService/serviceSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-002</span></li>
                <li className="file"><span>homeService/serviceSearchFilter01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/homeService/serviceSearchFilter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 기능 작업 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>지역 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-002</span></li>
                <li className="file"><span>homeService/serviceSearchFilter02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceSearchFilter02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>색상 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-002</span></li>
                <li className="file"><span>homeService/serviceSearchFilter03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceSearchFilter03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>연료 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-CS-002</span></li>
                <li className="file"><span>homeService/serviceSearchFilter04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceSearchFilter04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회결과</span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-001</span></li>
                <li className="file"><span>homeService/serviceHome?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceHome?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(조회 차량 결과 없음)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-001</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량정보 확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-001</span></li>
                <li className="file"><span>homeService/serviceStep01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/homeService/serviceStep01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검기록부 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-009</span></li>
                <li className="file"><span>homeService/servicePerformance</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/homeService/servicePerformance"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 자동차 상태표시 라벨 위치 적용 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사고이력조회 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-010</span></li>
                <li className="file"><span>homeService/serviceAccidentHistory</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceAccidentHistory"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>오토벨상세진단서 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-011</span></li>
                <li className="file"><span>homeService/serviceDetailDiagnosis</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceDetailDiagnosis"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>보증상품 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-002</span></li>
                <li className="file"><span>homeService/serviceStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>계약자정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-003</span></li>
                <li className="file"><span>homeService/serviceStep03</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/homeService/serviceStep03"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-004</span></li>
                <li className="file"><span>homeService/serviceStep03_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep03_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인사업자정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-005</span></li>
                <li className="file"><span>homeService/serviceStep03_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep03_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>법인사업자정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-006</span></li>
                <li className="file"><span>homeService/serviceStep03_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep03_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량보기</span></li>
                <li><span>홈서비스 신청</span></li>
                <li><span>온라인구매 전 <br />필수 로그인 호출</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-001</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>환불약관</span></li>
                <li><span>IA-M-HS-GA-012</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용/동의 화면</span></li>
                <li><span>개인정보 수집/이용 동의(필수)</span></li>
                <li><span>IA-M-HS-GA-013</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>고유식별정보 수집/이용 동의(필수)</span></li>
                <li><span>IA-M-HS-GA-014</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보처리의 위탁에 관한 사항(필수)</span></li>
                <li><span>IA-M-HS-GA-015</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>마케팅 활용동의(선택)</span></li>
                <li><span>IA-M-HS-GA-016</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보 제3자 제공에 관한 사항(선택)</span></li>
                <li><span>IA-M-HS-GA-017</span></li>
                <li className="file"><span>homeService/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/homeService/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>예상결제금액확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-007</span></li>
                <li className="file"><span>homeService/serviceStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-HS-GA-008</span></li>
                <li className="file"><span>homeService/serviceStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle5}>{toggle5 ? "-" : "+"}</span><span>오토옥션</span></li>
            <li><span>서비스 안내</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-AA-GS-002</span></li>
            <li className="file"><span>autoAuction/auctionGate</span></li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="/autoAuction/auctionGate"><a className="link-btn on" target="_blank">작업중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 배너이미지 수급 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>v1.7</span>
            </li>
          </ul>
        </li>
        {
          toggle5 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>오토벨 스마트옥션 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-GS-001</span></li>
                <li className="file"><span>autoAuction/auctionHome</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/autoAuction/auctionHome"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>이용안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-GS-003</span></li>
                <li className="file"><span>autoAuction/auctionInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/auctionInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검기록부 샘플</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-GS-006</span></li>
                <li className="file"><span>autoAuction/auctionInfoSample</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/autoAuction/auctionInfoSample"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>출품하기</span></li>
                <li><span>약관동의</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-001</span></li>
                <li className="file"><span>autoAuction/exhibitStep01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>오토옥션 경매약관 및 주의사항</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-010</span></li>
                <li className="file"><span>autoAuction/termsView?seq=0</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=0"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>세금계산서 발행의무</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-011</span></li>
                <li className="file"><span>autoAuction/termsView?seq=1</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=1"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보 활용동의</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-012</span></li>
                <li className="file"><span>autoAuction/termsView?seq=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>자동차매매(경매)행위에 대한 위/수임 확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-013</span></li>
                <li className="file"><span>autoAuction/termsView?seq=3</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=3"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>현금영수증 발행 동의 확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-014</span></li>
                <li className="file"><span>autoAuction/termsView?seq=4</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=4"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매장 선택</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-015</span></li>
                <li className="file"><span>autoAuction/exhibitStep01_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep01_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매장 위치 안내 팝업</span></li>
                <li><span>IA-M-AA-EA-006</span></li>
                <li className="file"><span>autoAuction/viewMap</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/viewMap"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 등록</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-002</span></li>
                <li className="file"><span>autoAuction/exhibitStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>최근계좌 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-007</span></li>
                <li className="file"><span>autoAuction/accountNum</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/accountNum"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보</span></li>
                <li><span>목록x</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-003</span></li>
                <li className="file"><span>autoAuction/exhibitStep03?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep03?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>목록o</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-003</span></li>
                <li className="file"><span>autoAuction/exhibitStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매 희망가</span></li>
                <li><span>예상 낙찰가 조회-결과X</span></li>
                <li><span>IA-M-AA-EA-008</span></li>
                <li className="file"><span>autoAuction/searchBid?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/searchBid?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예상 낙찰가 조회-결과o</span></li>
                <li><span>IA-M-AA-EA-008</span></li>
                <li className="file"><span>autoAuction/searchBid</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/searchBid"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탁송료 안내</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-009</span></li>
                <li className="file"><span>autoAuction/consignInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/consignInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탁송신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-004</span></li>
                <li className="file"><span>autoAuction/exhibitStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>출품완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-005</span></li>
                <li className="file"><span>autoAuction/exhibitStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle6}>{toggle6 ? "-" : "+"}</span><span>프라이싱시스템</span></li>
            <li><span>메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-PS-AD-001</span></li>
            <li className="file"><span>pricingsystem/pricing01</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/pricingSystem/pricing01"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>

        {
          toggle6 === true &&
          <>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>프라이싱 이용권 구매 안내 화면</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-010</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량조건 검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearch</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearch"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 기능 작업 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>기본옵션 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>컬러 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>연료 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>변속기 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배기량 선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchFilter06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchFilter06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조건검색</span></li>
                <li><span>결과 O</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-004</span></li>
                <li className="file"><span>pricingsystem/pricingView</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingView"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량번호 검색</span></li>
                <li><span>번호검색</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-001</span></li>
                <li className="file"><span>pricingsystem/pricingSearchNum</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingSearchNum"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과O</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-008</span></li>
                <li className="file"><span>pricingsystem/pricingViewNum</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingViewNum"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과O(등급 미포함)</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-NS-001</span></li>
                <li className="file"><span>pricingsystem/pricingViewGrade</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingViewGrade"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 조회</span></li>
                <li><span>검색결과가 없는 화면</span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-005</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회 결과</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-005</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>동급차량 실제 낙찰정보 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-013</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회결과</span></li>
                <li><span>차량정보 수정</span></li>
                <li><span>IA-M-PS-MA-006</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>동급차량 실제 낙찰정보</span></li>
                <li><span>IA-M-PS-MA-007</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>모델 재선택</span></li>
                <li><span>IA-M-PS-MA-014</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회결과 (등급미포함)</span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-008</span></li>
                <li className="file"><span>pricingsystem/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/pricingsystem/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보 수정</span></li>
                <li><span>IA-M-PS-MA-009</span></li>
                <li className="file"><span>pricingsystem/pricingInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등급상세사양</span></li>
                <li><span>IA-M-PS-MA-012</span></li>
                <li className="file"><span>pricingsystem/pricingSpecify</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingSystem/pricingSpecify"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>동급차량 실제 낙찰정보</span></li>
                <li><span>IA-M-PS-MA-007</span></li>
                <li className="file"><span>pricingsystem/PricingBidInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/PricingBidInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매낙찰 차량 상세보기</span></li>
                <li><span>IA-M-PS-MA-002</span></li>
                <li className="file"><span>pricingsystem/PricingAuctionInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/PricingAuctionInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검기록부 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-003</span></li>
                <li className="file"><span>pricingsystem/pricingPerformance</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/pricingsystem/pricingPerformance"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 자동차 상태표시 라벨 위치 적용 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사고이력조회 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-PS-MA-004</span></li>
                <li className="file"><span>pricingsystem/pricingAccidentHistory</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingsystem/pricingAccidentHistory"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>공통</span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span>IA-M-SP-CS-004</span></li>
                <li className="file"><span>pricingSystem/pricingView?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/pricingSystem/pricingView?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span><span className="toggle-btn" onClick={handleToggle7}>{toggle7 ? "-" : "+"}</span>마이페이지(일반)</span></li>
            <li><span>서브메인</span></li>
            <li><span></span></li>
            <li><span>서비스 이용내역 O<br />최근본차량 O</span></li>
            <li><span></span></li>
            <li><span>IA-M-MU-MA-001</span></li>
            <li className="file"><span>mypage/generalMain</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/mypage/generalMain"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <span>v1.61</span>
            </li>
          </ul>
        </li>
        {
          toggle7 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>서비스 이용내역 X<br />최근본차량 X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-MA-001</span></li>
                <li className="file"><span>mypage/generalMain?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMain?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차사기</span></li>
                <li><span>최근본차량 / 관심차량 / 비교하기</span></li>
                <li><span>해당차량O</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-002</span></li>
                <li className="file"><span>mypage/generalBuy01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>해당차량X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-002</span></li>
                <li className="file"><span>mypage/generalBuy01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쪽지상담 내역</span></li>
                <li><span>상담내역O</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-009</span></li>
                <li className="file"><span>mypage/generalBuy03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상담내역X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-009</span></li>
                <li className="file"><span>mypage/generalBuy03?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy03?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 내역</span></li>
                <li><span>홈서비스 내역O</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-005</span></li>
                <li className="file"><span>mypage/generalBuy04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 내역X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-005</span></li>
                <li className="file"><span>mypage/generalBuy04?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy04?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 신청 내역</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(진행 현황 별 처리)</span></li>
                <li><span>신청 완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제대기 중</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배송준비 중</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배송 중</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배송완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>취소 관련 프로세스 진행 중</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>배송지 변경</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-007</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>구매취소</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-BC-008</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span>현황조회</span></li>
                <li><span>조회내역O</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-001</span></li>
                <li className="file"><span>mypage/generalSell01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회내역X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-001</span></li>
                <li className="file"><span>mypage/generalSell01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문평가 신청 내역</span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>평가사배정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문 및 견적안내</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>셀프평가 신청 내역</span></li>
                <li><span>차량정보 등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 진행 중</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>24시간 실시간 비교견적 입찰현황</span></li>
                <li><span>IA-M-MU-SC-004</span></li>
                <li className="file"><span>mypage/generalSell_s03Bid</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s03Bid"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>24시간 실시간 비교견적 입찰 현황<br />(비교견적 진행 중)</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-004</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>24시간 실시간 비교견적 입찰 현황(딜러O)</span></li>
                <li><span>IA-M-MU-SC-005</span></li>
                <li className="file"><span>mypage/generalSell_s04Bid</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04Bid"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>24시간 실시간 비교견적 입찰 현황(딜러X)</span></li>
                <li><span>IA-M-MU-SC-005</span></li>
                <li className="file"><span>mypage/generalSell_s04Bid?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04Bid?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러소개</span></li>
                <li><span>IA-M-MU-SC-008</span></li>
                <li className="file"><span>mypage/generalSell_s04Intro</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04Intro"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러소개</span></li>
                <li><span>IA-M-MU-SC-008</span></li>
                <li className="file"><span>mypage/generalSell_s04Intro?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04Intro?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러거래후기</span></li>
                <li><span>IA-M-MU-SC-009</span></li>
                <li className="file"><span>mypage/generalSell_s04Review</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04Review"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거래완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용후기 작성</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-010</span></li>
                <li className="file"><span>mypage/generalSell_s05Review</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s05Review"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>무평가 신청 내역</span></li>
                <li><span>차량정보 등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예상견적 확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적확인</span></li>
                <li><span>IA-M-MU-SC-010</span></li>
                <li className="file"><span>mypage/generalSell_n03Check</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n03Check"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 상태 점검</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-011</span></li>
                <li className="file"><span>mypage/generalSell_n04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n04"><a className="link-btn" target="_blank">작업중</a></Link></li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적확인</span></li>
                <li><span>IA-M-MU-SC-011</span></li>
                <li className="file"><span>mypage/generalSell_n04Check</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n04Check"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적 완료 및 판매결정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-010</span></li>
                <li className="file"><span>mypage/generalSell_n05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적확인</span></li>
                <li><span>IA-M-MU-SC-014</span></li>
                <li className="file"><span>mypage/generalSell_n05Check</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n05Check"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>취소신청</span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-SC-010</span></li>
                <li className="file"><span>mypage/generalSell_n06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적확인</span></li>
                <li><span>IA-M-MU-SC-010</span></li>
                <li className="file"><span>mypage/generalSell_n06Check</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n06Check"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>오토옥션 출품내역</span></li>
                <li><span>- 결과 X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-AA-001</span></li>
                <li className="file"><span>mypage/generalSell02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>- 결과 O</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MU-AA-001</span></li>
                <li className="file"><span>mypage/generalSell02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보 관리</span></li>
                <li><span>회원정보 수정</span></li>
                <li><span>STEP1. 본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-001</span></li>
                <li className="file"><span>mypage/dealerMember01_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP2. 회원정보 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-002</span></li>
                <li className="file"><span>mypage/generalMember01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span>STEP1. 본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-003</span></li>
                <li className="file"><span>mypage/dealerMember01_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.61</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP2. 비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-004</span></li>
                <li className="file"><span>mypage/dealerMember01_04</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_04"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의 문의내역</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-005</span></li>
                <li className="file"><span>mypage/generalMember03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의 문의내역 상세</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-008</span></li>
                <li className="file"><span>mypage/generalMember03_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember03_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴</span></li>
                <li><span>STEP1. 본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-006</span></li>
                <li className="file"><span>mypage/dealerMember01_05</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_05"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP2. 탈퇴사유 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-UM-007</span></li>
                <li className="file"><span>mypage/dealerMember01_06</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_06"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용중인 서비스</span></li>
                <li><span>IA-M-US-UM-013</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span>마이페이지(비회원)</span></li>
            <li><span>내차팔기</span></li>
            <li><span>현황조회</span></li>
            <li><span>현황조회 리스트</span></li>
            <li><span></span></li>
            <li><span>IA-M-MN-SC-001</span></li>
            <li className="file"><span>mypage/guestMain</span></li>
            <li className="progress">{createProgress(0)}</li>
            <li className="link"><Link href="/mypage/guestMain"><a className="link-btn before" target="_blank">작업전</a></Link></li>
            <li><span></span></li>
          </ul>
        </li>

        <li>
          <ul className="row main-sec">
            <li><span><span className="toggle-btn" onClick={handleToggle8}>{toggle8 ? "-" : "+"}</span>마이페이지(딜러)</span></li>
            <li><span>서브메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-MD-MA-001</span></li>
            <li className="file"><span>mypage/dealerMain</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/mypage/dealerMain"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.62</span></li>
          </ul>
        </li>

        {
          toggle8 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용 정지 회원일 경우</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealerMain?member=stop</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMain?member=stop"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>단체회원ID를 발급받지 않은 개인딜러</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealerMain?member=no-group-id</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMain?member=no-group-id"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>쪽지상담 내역</span></li>
                <li><span>상담내역O</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-003</span></li>
                <li className="file"><span>mypage/dealerNote</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerNote"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상담내역X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-003</span></li>
                <li className="file"><span>mypage/dealerNote?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerNote?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span>포인트/쿠폰</span></li>
                <li><span>포인트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-005</span></li>
                <li className="file"><span>mypage/dealerPoint?page=point</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>쿠폰</span></li>
                <li><span>사용 가능한 쿠폰</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-006</span></li>
                <li className="file"><span>mypage/dealerPoint?page=coupon</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쿠폰등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-008</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사용 및 만료 쿠폰</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-009</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealerSell01</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell01"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(이용정지 접속 시)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealerSell01?member=stop</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell01?member=stop"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>(단체회원ID를 발급받지 않은 개인딜러)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealerSell01?member=no-group-id</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell01?member=no-group-id"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span>등록차량및광고관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealerSell01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>광고효과분석 상세</span></li>
                <li><span>상세내역O</span></li>
                <li><span>IA-M-MD-SC-111</span></li>
                <li className="file"><span>mypage/dealerSell01Effect</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell01Effect"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 세부 내용 기획 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상세내역X</span></li>
                <li><span>IA-M-MD-SC-111</span></li>
                <li className="file"><span>mypage/dealerSell01Effect?result=no</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell01Effect?result=no"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 세부 내용 기획 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회 구분</span></li>
                <li><span>IA-M-MD-SC-001</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량삭제</span></li>
                <li><span>IA-M-MD-SC-002</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />가격수정</span></li>
                <li><span>IA-M-MD-SC-003</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />차량정보수정</span></li>
                <li><span>IA-M-MD-SC-004</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />차량사진수정</span></li>
                <li><span>IA-M-MD-SC-005</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />성능기록부 수정</span></li>
                <li><span>IA-M-MD-SC-006</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매완료신고</span></li>
                <li><span>IA-M-MD-SC-007</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />업데이트 시간 변경</span></li>
                <li><span>IA-M-MD-SC-008</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />업데이트 시간 변경<br />업데이트 보관함</span></li>
                <li><span>IA-M-MD-SC-009</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />업데이트 시간 변경<br />업데이트 시간 보관함</span></li>
                <li><span>IA-M-MD-SC-010</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>정보수정<br />업데이트 시간 변경<br />추가 업데이트 구매</span></li>
                <li><span>IA-M-MD-SC-011</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>관리필요</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-012</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판단보류</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-013</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>대기차량</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-014</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매 낙찰차량 보내기</span></li>
                <li><span>IA-M-MD-SC-015</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-016</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>삭제차량</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-017</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보류차량</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-018</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>광고 관리</span></li>
                <li><span>광고이용권 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-100</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>구입하기</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-101</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상품상세 안내</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-101</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-102</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세</span></li>
                <li><span>IA-M-MD-SC-103</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세_무통장<br />증빙자료</span></li>
                <li><span>IA-M-MD-SC-104</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세_무통장<br />입금내역</span></li>
                <li><span>IA-M-MD-SC-105</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세_무통장<br />증빙자료_현금영수증<br />현금영수증</span></li>
                <li><span>IA-M-MD-SC-106</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세_무통장<br />증빙자료_세금계산서</span></li>
                <li><span>IA-M-MD-SC-107</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제내역상세_신용카드<br />카드전표</span></li>
                <li><span>IA-M-MD-SC-108</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입금대기</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-109</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>광고효과 분석</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-110</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>다른차량 선택</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-111</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>취소 및 환불안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-112</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량등록</span></li>
                <li><span>차량조회</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-200</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 기본정보 확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-201</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP1. 차량정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-202</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP2. 가격 및 차량소개</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-203</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP3. 차량 설명글 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-204</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP4. 성능점검</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-205</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사고·교환·수리 등 이력</span></li>
                <li><span>IA-M-MD-SC-206</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>자동차 세부사항</span></li>
                <li><span>IA-M-MD-SC-207</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP5. 차량사진등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-208</span></li>
                <li className="file"><span>mypage/dealerSell02_06</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_06"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP6. 결제</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-209</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>STEP7. 등록완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-210</span></li>
                <li className="file"><span>mypage/dealerSell02_09</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_09"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의 설명글 관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-300</span></li>
                <li className="file"><span>mypage/dealerSell03</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell03"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>설명글 등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-301</span></li>
                <li className="file"><span>mypage/dealerSell03_01</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell03_01"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>설명글 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-302</span></li>
                <li className="file"><span>mypage/dealerSell03_02</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerSell03_02"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 예약/판매 현황</span></li>
                <li><span>검색결과x</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-400</span></li>
                <li className="file"><span>mypage/dealerSell04</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell04"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 검색결과x</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>검색결과o</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-400</span></li>
                <li className="file"><span>mypage/dealerSell04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청내역 상세</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-401</span></li>
                <li className="file"><span>mypage/dealerSell04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보증차량 판매현황</span></li>
                <li><span>판매현황 리스트O</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-500</span></li>
                <li className="file"><span>mypage/dealerSell05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>판매현황 리스트X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-500</span></li>
                <li className="file"><span>mypage/dealerSell05?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보증차량등록</span></li>
                <li><span>차량조회</span></li>
                <li><span>IA-M-MD-SC-501</span></li>
                <li className="file"><span>mypage/dealerSell05_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보확인</span></li>
                <li><span>IA-M-MD-SC-502</span></li>
                <li className="file"><span>mypage/dealerSell05_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보입력</span></li>
                <li><span>IA-M-MD-SC-503</span></li>
                <li className="file"><span>mypage/dealerSell05_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>EW정보입력</span></li>
                <li><span>IA-M-MD-SC-504</span></li>
                <li className="file"><span>mypage/dealerSell05_04</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_04"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 보증상품명 선택시 상품금액 결과값 변경 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등록완료</span></li>
                <li><span>IA-M-MD-SC-505</span></li>
                <li className="file"><span>mypage/dealerSell05_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Studio</span></li>
                <li><span>메인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-600</span></li>
                <li className="file"><span>mypage/dealerSell06Info</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Info"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>촬영 예약 현황</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-613</span></li>
                <li className="file"><span>mypage/dealerSell06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live 서비스 안내</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-601</span></li>
                <li className="file"><span>mypage/dealerSell06_01</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell06_01"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Studio 촬영 예약</span></li>
                <li><span>지점/예약시간 선택</span></li>
                <li><span>IA-M-MD-SC-603</span></li>
                <li className="file"><span>mypage/dealerSell06Studio01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Studio01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 판매 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Studio 판매약관</span></li>
                <li><span>IA-M-MD-SC-604</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제하기</span></li>
                <li><span>IA-M-MD-SC-605</span></li>
                <li className="file"><span>mypage/dealerSell06Studio02</span></li>
                <li className="progress">{createProgress(80)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Studio02"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 디자인 필요</p>
                          <p>- 라디오 인풋 활성화 기능 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예약완료</span></li>
                <li><span>IA-M-MD-SC-607</span></li>
                <li className="file"><span>mypage/dealerSell06Studio03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Studio03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>취소/환불 안내</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-614</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Shot 촬영 예약</span></li>
                <li><span>차량정보 입력(내역O)</span></li>
                <li><span>IA-M-MD-SC-608</span></li>
                <li className="file"><span>mypage/dealerSell06Shot01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Shot01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보 입력(내역X)</span></li>
                <li><span>IA-M-MD-SC-608</span></li>
                <li className="file"><span>mypage/dealerSell06Shot01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Shot01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예약정보 입력</span></li>
                <li><span>IA-M-MD-SC-609</span></li>
                <li className="file"><span>mypage/dealerSell06Shot02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Shot02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 이용 약관 팝업 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Shot 판매약관</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-610</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제하기</span></li>
                <li><span>IA-M-MD-SC-611</span></li>
                <li className="file"><span>mypage/dealerSell06Shot03</span></li>
                <li className="progress">{createProgress(80)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Shot03"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 변경 기획으로 디자인 필요</p>
                          <p>- 라디오 인풋 활성화 기능 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예약완료</span></li>
                <li><span>IA-M-MD-SC-612</span></li>
                <li className="file"><span>mypage/dealerSell06Shot04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06Shot04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>재고관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-700</span></li>
                <li className="file"><span>mypage/dealerSell07</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerSell07"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 스크롤 오류 해결 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span>내차 사기</span></li>
                <li><span>24시간 실시간 비교견적</span></li>
                <li><span>셀프평가 차량</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-001</span></li>
                <li className="file"><span>mypage/dealerBuy01</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerBuy01"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 차량정보</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-002</span></li>
                <li className="file"><span>mypage/dealerBuy01_01?auction=true</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerBuy01_01?auction=true"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰하기</span></li>
                <li><span>IA-M-MD-BC-003</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰하기_수정</span></li>
                <li><span>IA-M-MD-BC-004</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>낙찰 및 입찰차량 관리</span></li>
                <li><span>낙찰차량 구매관리</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-100</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰완료 내역</span></li>
                <li><span>검색결과x</span></li>
                <li><span>IA-M-MD-BC-100</span></li>
                <li className="file"><span>mypage/dealerBuy01?seq=2</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerBuy01?seq=2"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 검색결과x</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>검색결과o</span></li>
                <li><span>IA-M-MD-BC-100</span></li>
                <li className="file"><span>mypage/dealerBuy01?seq=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerBuy01?seq=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문일자 입력/수정</span></li>
                <li><span>IA-M-MD-BC-101</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거래지연 사유 입력/확인</span></li>
                <li><span>IA-M-MD-BC-102</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거리불발 사유 입력/확인</span></li>
                <li><span>IA-M-MD-BC-103</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거래소명</span></li>
                <li><span>IA-M-MD-BC-104</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거래 성사 완료 신고</span></li>
                <li><span>IA-M-MD-BC-105</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러 수수료 입금</span></li>
                <li><span>IA-M-MD-BC-106</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰완료 내역</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-107</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span>오토옥션 이용현황</span></li>
                <li><span>경매회원 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-001</span></li>
                <li className="file"><span>mypage/dealerAuction01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>경매장 이용 현황</span></li>
                <li><span>낙찰정보 조회</span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-100</span></li>
                <li className="file"><span>mypage/dealerAuction12</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealerAuction12"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 검색결과x</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과o</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-100</span></li>
                <li className="file"><span>mypage/dealerAuction12</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerAuction12"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰정보 조회</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-101</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>클레임 신청 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-102</span></li>
                <li className="file"><span>mypage/dealerAuction14</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerAuction14"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>내 차 팔기 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-103</span></li>
                <li className="file"><span>mypage/dealerAuction15</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="mypage/dealerAuction15"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span>회원정보 관리</span></li>
                <li><span>회원정보/소개 관리_매매회원(딜러)</span></li>
                <li><span>판매점 정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-001</span></li>
                <li className="file"><span>mypage/dealerMember01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>셀프평가 이용현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-002</span></li>
                <li className="file"><span>mypage/dealerMember01?seq=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?seq=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>주요정보/소개글 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-003</span></li>
                <li className="file"><span>mypage/dealerMember01?popup=true</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?popup=true"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보/소개 관리_매매회원(단체)</span></li>
                <li><span>판매점 정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-004</span></li>
                <li className="file"><span>mypage/dealerMember01?member=organization</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?member=organization"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사업자 등록증</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-005</span></li>
                <li className="file"><span>mypage/dealerMember01?fs_popup=1</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?fs_popup=1"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>관리사업자 등록증</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-006</span></li>
                <li className="file"><span>mypage/dealerMember01?fs_popup=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?fs_popup=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보/소개 관리</span></li>
                <li><span>회원정보 수정_매매회원(개인,단체)</span></li>
                <li><span>본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-100</span></li>
                <li className="file"><span>mmypage/dealerMember01_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-101</span></li>
                <li className="file"><span>mypage/dealerMember01_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 수정_매매회원(단체)</span></li>
                <li><span>회원정보 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-103</span></li>
                <li className="file"><span>mypage/dealerMember01_02?member=organization</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_02?member=organization"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span>본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-200</span></li>
                <li className="file"><span>mypage/dealerMember01_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-201</span></li>
                <li className="file"><span>mypage/dealerMember01_04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴</span></li>
                <li><span>본인확인</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-300</span></li>
                <li className="file"><span>mypage/dealerMember01_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탈퇴사유 선택</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-301</span></li>
                <li className="file"><span>mypage/dealerMember01_06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>차량 판매 후기 관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-400</span></li>
                <li className="file"><span>mypage/dealerMember02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 판매 후기_등록/수정</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-401</span></li>
                <li className="file"><span>mypage/dealerMember02_01</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember02_01"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러정보 관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-500</span></li>
                <li className="file"><span>mypage/dealerMember03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember03"><a className="link-btn before" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>광고 등록 현황_매매회원(단체)</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-501</span></li>
                <li className="file"><span>mypage/adRegistration</span></li>
                <li className="progress">{createProgress(50)}</li>
                <li className="link"><Link href="/mypage/adRegistration"><a className="link-btn before" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 팝업부분 코딩필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>             
                  <span>v1.65</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>연락처 변경</span></li>
                <li><span>IA-M-MD-UM-502</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>광고 등록 현황_매매회원(개인)</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-503</span></li>
                <li className="file"><span>mypage/dealerMember03_02</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember03_02"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>지점 관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-600</span></li>
                <li className="file"><span>mypage/dealerMember04</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/dealerMember04"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>지점등록</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-601</span></li>
                <li className="file"><span>mypage/</span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href="/mypage/"><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span>매매가이드</span></li>
            <li><span>EW상품</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-CM-UG-001</span></li>
            <li className="file"><span>dealing/dealingHome</span></li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="/dealing/dealingHome"><a className="link-btn on" target="_blank">작엄중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 서비스 가이드 이미지 수급 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>1.6</span>
            </li>
          </ul>
        </li>
        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle10}>{toggle10 ? "-" : "+"}</span><span>이벤트</span></li>
            <li><span>진행중인 이벤트</span></li>
            <li><span>종료 이벤트</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-CM-ET-001</span></li>
            <li className="file"><span>event/eventList</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/event/eventList"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>
        {
          toggle10 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>종료 이벤트 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-ET-002</span></li>
                <li className="file"><span>event/eventView</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/event/eventView"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>포인트 제휴몰</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-ET-003</span></li>
                <li className="file"><span></span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href=""><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle11}>{toggle11 ? "-" : "+"}</span><span>고객센터</span></li>
            <li><span>공지사항</span></li>
            <li><span>목록</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-CC-001</span></li>
            <li className="file"><span>customer/noticeList</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/customer/noticeList"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>
        {
          toggle11 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-CC-002</span></li>
                <li className="file"><span>customer/noticeView</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/noticeView"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>1:1 상담</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-CC-003</span></li>
                <li className="file"><span>customer/inquiry</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/inquiry"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>1:1 문의</span></li>
                <li><span>로그인 팝업</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-004</span></li>
                <li className="file"><span>member/loginPopup</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/loginPopup"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>1:1 상담 작성</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-CC-003</span></li>
                <li className="file"><span>customer/inquiryWrite</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/inquiryWrite"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>문의 완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-CC-004</span></li>
                <li className="file"><span>customer/inquiryWriteComplete</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/inquiryWriteComplete"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>FAQ</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-CC-005, <br />IA-M-CC-006</span></li>
                <li className="file"><span>customer/faq</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/faq"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }

        <li> {/* 로그인/회원가입 */}
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle12}>{toggle12 ? "-" : "+"}</span><span>로그인/회원가입</span></li>
            <li><span>회원가입</span></li>
            <li><span>회원선택</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-US-SI-001</span></li>
            <li className="file"><span>member/memberHome</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/member/memberHome"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>
        {
          toggle12 === true &&
          <>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>일반회원 약관동의</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-001</span></li>
                <li className="file"><span>member/memberStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/memberStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-003</span></li>
                <li className="file"><span>member/memberStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/memberStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>일반회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-004</span></li>
                <li className="file"><span>member/memberStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/memberStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-006</span></li>
                <li className="file"><span>member/memberStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/memberStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>딜러회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-008</span></li>
                <li className="file"><span>member/dealerStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/dealerStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-012</span></li>
                <li className="file"><span>member/dealerStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/dealerStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>단체회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-013</span></li>
                <li className="file"><span>member/groupStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/groupStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-015</span></li>
                <li className="file"><span>member/groupStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/groupStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>제휴회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-016</span></li>
                <li className="file"><span>member/allyStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/allyStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-SI-018</span></li>
                <li className="file"><span>member/allyStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/allyStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>로그인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-001</span></li>
                <li className="file"><span>member/login</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/login"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>휴면해제</span></li>
                <li><span>휴면해제</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-003</span></li>
                <li className="file"><span>member/loginState01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-003</span></li>
                <li className="file"><span>member/loginState01_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState01_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-004</span></li>
                <li className="file"><span>member/loginState02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>증사원증 만료 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-005</span></li>
                <li className="file"><span>member/loginState03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>아이디 찾기</span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-010</span></li>
                <li className="file"><span>member/loginInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이름/아이디출력</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-011</span></li>
                <li className="file"><span>member/loginInfoIdConfirm</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginInfoIdConfirm"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 찾기</span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-012</span></li>
                <li className="file"><span>member/loginInfoPassword</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginInfoPassword"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>새비밀번호 설정</span></li>
                <li><span></span></li>
                <li><span>IA-M-US-LI-014</span></li>
                <li className="file"><span>member/loginInfoPasswordConfirm</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginInfoPasswordConfirm"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
          </>
        }
      </ul>

      <span className="all-toggle-btn" onClick={hadleShowMenu}>{showMenu ? "-" : "+"}</span>
    </div>
  )
}

export default Index
