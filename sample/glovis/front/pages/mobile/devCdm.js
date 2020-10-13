import { useState, useCallback } from 'react';
import Link from 'next/link';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

// prettier-ignore
const Index = () => {
  const createProgress = (num) => {
    let progress_style = '';
    if (num >= 10 && num <= 49) {
      progress_style = 'grade10';
    } else if (num >= 50 && num <= 59) {
      progress_style = 'grade50';
    } else if (num >= 60 && num <= 69) {
      progress_style = 'grade60';
    } else if (num >= 70 && num <= 79) {
      progress_style = 'grade70';
    } else if (num >= 80 && num <= 89) {
      progress_style = 'grade80';
    } else if (num >= 90 && num <= 99) {
      progress_style = 'grade90';
    } else if (num === 100) {
      progress_style = 'grade100';
    }
    return (
      <div className={progress_style}>
        <p>{num}%</p>
        <span>
          <em style={{ width: `${num}%` }}></em>
        </span>
      </div>
    );
  };

  const toggleMenu = (initValue = false) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(
      (e) => {
        setter(!value);
      },
      [value]
    );
    return [value, setter, handler];
  };

  const initToggleValue = false; // npm run build & export시 true로 설정
  const [toggle1, setToggle1, handleToggle1] = toggleMenu(initToggleValue); // 내차사기
  const [toggle2, setToggle2, handleToggle2] = toggleMenu(initToggleValue); // 내차팔기
  const [toggle3, setToggle3, handleToggle3] = toggleMenu(initToggleValue); // 시세조회
  const [toggle4, setToggle4, handleToggle4] = toggleMenu(initToggleValue); // 홈서비스
  const [toggle5, setToggle5, handleToggle5] = toggleMenu(initToggleValue); // 스마트옥션
  const [toggle6, setToggle6, handleToggle6] = toggleMenu(initToggleValue); // 프라이싱 시스템
  const [toggle7, setToggle7, handleToggle7] = toggleMenu(initToggleValue); // 마이페이지(일반)
  const [toggle8, setToggle8, handleToggle8] = toggleMenu(initToggleValue); // 마이페이지(딜러)
  const [toggle9, setToggle9, handleToggle9] = toggleMenu(initToggleValue); // 매매가이드
  const [toggle10, setToggle10, handleToggle10] = toggleMenu(initToggleValue); // 이벤트
  const [toggle11, setToggle11, handleToggle11] = toggleMenu(initToggleValue); // 고객센터
  const [toggle12, setToggle12, handleToggle12] = toggleMenu(initToggleValue); // 로그인/회원가입
  const [showMenu, setShowMenu] = useState(initToggleValue);
  const hadleShowMenu = useCallback(
    (e) => {
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
    },
    [showMenu]
  );

  return (
    <div className="coding-wrap">
      <div className="map-header">
        <h3>
          GLOVIS MOBILE <b>CODING MAP</b>{' '}
          <Link href="/">
            <a className="btn">PC 코딩맵 바로가기</a>
          </Link>
        </h3>
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
        <li>
          {' '}
          {/* 스타일 가이드 */}
          <ul className="row main-sec">
            <li>
              <span>스타일 가이드</span>
            </li>
            <li>
              <span>스타일 가이드</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li className="file">
              <span>commonStyle</span>
            </li>
            <li className="progress">{createProgress(0)}</li>
            <li className="link">
              <Link href="/commonStyle">
                <a className="link-btn before" target="_blank">
                  작업전
                </a>
              </Link>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </li>
        <li>
          {/* error */}
          <ul className="row main-sec">
            <li>
              <span>error</span>
            </li>
            <li>
              <span>error</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li className="file">
              <span>error</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/error">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </li>
        <li>
          {/* authFail */}
          <ul className="row main-sec">
            <li>
              <span>authFail</span>
            </li>
            <li>
              <span>authFail</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li className="file">
              <span>authFail</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/authFail">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </li>
        <li>
          {/* lmsConfirm */}
          <ul className="row main-sec">
            <li>
              <span>lmsConfirm</span>
            </li>
            <li>
              <span>lmsConfirm</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li className="file">
              <span>lmsConfirm</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/lmsConfirm">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </li>
        {/* 메인 */}
        {/* <li>
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
        </li> */}
        {/* 내차사기 */}
        <li>
          <ul className="row main-sec">
            <li className="nbd">
              <span className="toggle-btn" onClick={handleToggle1}>
                {toggle1 ? '-' : '+'}
              </span>
              <span>내차사기</span>
            </li>
            <li>
              <span>차량 리스트 O</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-BC-MA-001</span>
            </li>
            <li className="file">
              <span>buycar/buyCarList</span>
            </li>
            <li className="progress">{createProgress(0)}</li>
            <li className="link">
              <Link href="/buycar/buyCarList">
                <a className="link-btn before" target="_blank">
                  작업전
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle1 === true && (
          <>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span>경매낙찰차량</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-AU-001</span>
                </li>
                <li className="file">
                  <span>buycar/auction/buyCarList</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/buycar/auction/buyCarList">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span>인증몰</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-CM-001</span>
                </li>
                <li className="file">
                  <span>buycar/certificationmall/buyCarCertiMall</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/buycar/certificationmall/buyCarCertiMall">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>인증브랜드 리스트</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-CM-002</span>
                </li>
                <li className="file">
                  <span>buycar/certificationmall/buyCarCertiView</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/buycar/certificationmall/buyCarCertiView">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span>오토벨라이브스튜디오</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-LS-001</span>
                </li>
                <li className="file">
                  <span>buycar/livestudio/buyCarList</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/buycar/livestudio/buyCarList">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>라이브스튜디오</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-LS-003</span>
                </li>
                <li className="file">
                  <span>buycar/livestudio/buyCarliveStudioGuide</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/buycar/livestudio/buyCarliveStudioGuide">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span>상세</span>
                </li>
                <li>
                  <span>일반/수입/금융사 상세</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-DT-008</span>
                </li>
                <li className="file">
                  <span>buycar/buyCarDetailTypeA</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/buycar/buyCarDetailTypeA">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 성능점검기록부 팝업 내부 자동차 상태표시 작업중</p>
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
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>경매낙찰차량 상세</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-AU-001</span>
                </li>
                <li className="file">
                  <span>buycar/buyCarDetailTypeB</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/buycar/buyCarDetailTypeB">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 성능점검기록부 팝업 내부 자동차 상태표시 작업중</p>
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
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>라이브스튜디오 상세</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-BC-LS-002</span>
                </li>
                <li className="file">
                  <span>buycar/buyCarDetailTypeC</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/buycar/buyCarDetailTypeC">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 성능점검기록부 팝업 내부 자동차 상태표시 작업중</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
          </>
        )}
        {/* 
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
            <li>
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
            </li>
            <li>
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
            <li>
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
            </li>
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
            <li>
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
            </li>
            
            
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>오토벨상세진단서 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-LS-002</span></li>
                <li className="file"><span>buy/viewDetailDiagnosis</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewDetailDiagnosis"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>공통</span></li>
                <li><span>사진상세 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-001</span></li>
                <li className="file"><span>buy/viewImgList</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/viewImgList"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쪽지상담 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-005</span></li>
                <li className="file"><span>buy/viewInquire</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewInquire"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
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
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>총비용계산 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-004</span></li>
                <li className="file"><span>buy/totalCostCalculation</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/totalCostCalculation"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>허위매물신고 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-003</span></li>
                <li className="file"><span>buy/falseSaleReport</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/falseSaleReport"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사고이력조회 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-BC-DT-010</span></li>
                <li className="file"><span>buy/viewAccidentHistory</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewAccidentHistory"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
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
        */}

        {/* 내차팔기 */}
        <li>
          <ul className="row main-sec">
            <li className="nbd">
              <span className="toggle-btn" onClick={handleToggle2}>
                {toggle2 ? '-' : '+'}
              </span>
              <span>내차팔기</span>
            </li>
            <li>
              <span>서브메인</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-SC-MA-001</span>
            </li>
            <li className="file">
              <span>sellCar/sellCar</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/sellCar/sellCar">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle2 === true && (
          <>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>방문평가 판매</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-VS-006</span>
                </li>
                <li className="file">
                  <span>sell/visitApply</span>
                </li>
                <li className="progress">{createProgress(50)}</li>
                <li className="link">
                  <Link href="/sell/visitApply">
                    <a className="link-btn before" target="_blank">
                      작업전
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 현대차 시세조회 부분 매매플랫폼으로 이동 후 퍼블 검수 예정</p>
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
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-VS-007</span>
                </li>
                <li className="file">
                  <span>sell/visitComplete</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/visitComplete">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>셀프등록 판매</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-SS-001</span>
                </li>
                <li className="file">
                  <span>sell/selfHome</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/selfHome">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>셀프등록 판매 신청</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-SS-005</span>
                </li>
                <li className="file">
                  <span>sell/selfStep01</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/selfStep01">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
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
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-SS-015</span>
                </li>
                <li className="file">
                  <span>sell/selfStep05</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/selfStep05">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>무평가 판매</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-NS-001</span>
                </li>
                <li className="file">
                  <span>sell/freeHome</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/freeHome">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>무평가 판매 신청</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-NS-001</span>
                </li>
                <li className="file">
                  <span>sell/freeStep01</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/freeStep01">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
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
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-SC-NS-014</span>
                </li>
                <li className="file">
                  <span>sell/freeStep05</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/sell/freeStep05">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
          </>
        )}
        {/* 시세조회 */}
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
        
        {/* 시세조회 */}
        {/* <li>
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
            <li>
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
            </li>
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
            </li>
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
        } */}
        {/* 홈서비스 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span className="toggle-btn" onClick={handleToggle4}>
                {toggle4 ? '-' : '+'}
              </span>
              <span>홈서비스</span>
            </li>
            <li>
              <span>홈서비스 안내</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-HS-GS-001</span>
            </li>
            <li className="file">
              <span>homeService/homeServiceGuide</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/homeService/homeServiceGuide">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle4 === true && (
          <>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>서브메인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-CS-001</span>
                </li>
                <li className="file">
                  <span>homeService/homeService</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/homeService">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>차량조건 검색</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-CS-002</span>
                </li>
                <li className="file">
                  <span>homeService/serviceSearch</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/homeService/serviceSearch">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 페이지 정리 중</p>
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
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>차량정보 확인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-001</span>
                </li>
                <li className="file">
                  <span>homeService/homeServiceCarInfo</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/homeService/homeServiceCarInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
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
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>보증상품 선택</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-002</span>
                </li>
                <li className="file">
                  <span>homeService/choiceGuarantee</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/choiceGuarantee">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>계약자정보선택</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-003</span>
                </li>
                <li className="file">
                  <span>homeService/choiceContractor</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/homeService/choiceContractor">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
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
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>개인정보입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-004</span>
                </li>
                <li className="file">
                  <span>homeService/contractorInfo_1</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/contractorInfo_1">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>개인사업자정보입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-005</span>
                </li>
                <li className="file">
                  <span>homeService/contractorInfo_2</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/contractorInfo_2">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>법인사업자정보입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-006</span>
                </li>
                <li className="file">
                  <span>homeService/contractorInfo_3</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/contractorInfo_3">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>예상결제금액확인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-007</span>
                </li>
                <li className="file">
                  <span>homeService/estimatedAmount</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/homeService/estimatedAmount">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
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
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-HS-GA-008</span>
                </li>
                <li className="file">
                  <span>homeService/homeServiceComplete</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/homeService/homeServiceComplete">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
          </>
        )}
        {/* 스마트옥션 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span className="toggle-btn" onClick={handleToggle5}>
                {toggle5 ? '-' : '+'}
              </span>
              <span>스마트옥션</span>
            </li>
            <li>
              <span>게이트</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-AA-GS-002</span>
            </li>
            <li className="file">
              <span>autoAuction/auctionGate</span>
            </li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link">
              <Link href="/autoAuction/auctionGate">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
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
        {toggle5 === true && (
          <>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>오토벨 스마트옥션 안내</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-GS-001</span>
                </li>
                <li className="file">
                  <span>autoAuction/autoAuctionMain</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/autoAuction/autoAuctionMain">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>이용안내</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-GS-003</span>
                </li>
                <li className="file">
                  <span>autoAuction/auctionInfo</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/autoAuction/auctionInfo">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- '이용안내'탭 경매 수수료 계산 기능 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검기록부 샘플</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-GS-006</span></li>
                <li className="file"><span>autoAuction/auctionInfoSample</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/auctionInfoSample"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>출품하기</span>
                </li>
                <li>
                  <span>약관동의</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-001</span>
                </li>
                <li className="file">
                  <span>autoAuction/autoAuctionPolicyAggrement</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/autoAuction/autoAuctionPolicyAggrement">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 약관 팝업 확인 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>약관동의 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-010</span></li>
                <li className="file"><span>autoAuction/termsView?seq=0</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/termsView?seq=0"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>경매장선택</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-015</span>
                </li>
                <li className="file">
                  <span>autoAuction/autoAuctionHouseInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/autoAuction/autoAuctionHouseInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매장 위치 안내 팝업</span></li>
                <li><span></span></li>
                <li><span>IA-M-AA-EA-006</span></li>
                <li className="file"><span>autoAuction/viewMap</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/viewMap"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.7</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>회원정보</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-002</span>
                </li>
                <li className="file">
                  <span>autoAuction/exhibitorInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/autoAuction/exhibitorInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            {/* <li>
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
            </li> */}
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>차량정보</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-003</span>
                </li>
                <li className="file">
                  <span>autoAuction/autoAuctionCarInfo</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/autoAuction/autoAuctionCarInfo">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- '차량정보 저장' 팝업에 '확인' 버튼 클릭 시 '출품차량목록' 리스트 생성 및 '등록 필드' 리셋 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>탁송신청</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-004</span>
                </li>
                <li className="file">
                  <span>autoAuction/consignmentRequest</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/autoAuction/consignmentRequest">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>출품완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-AA-EA-005</span>
                </li>
                <li className="file">
                  <span>autoAuction/autoAuctionComplete</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/autoAuction/autoAuctionComplete">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 출품내역확인 버튼 경로 설정 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.7</span>
                </li>
              </ul>
            </li>
          </>
        )}
        {/* 프라이싱시스템 */}
        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle6}>{toggle6 ? "-" : "+"}</span><span>프라이싱시스템</span></li>
            <li><span>메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-PS-AD-001</span></li>
            <li className="file"><span>pricingSystem/pricing</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/pricingSystem/pricing"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>

        {/* 프라이싱시스템 */}
        {/* <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle6}>{toggle6 ? "-" : "+"}</span><span>프라이싱시스템</span></li>
            <li><span>메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-PS-AD-001</span></li>
            <li className="file"><span>pricingSystem/pricing</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/pricingSystem/pricing"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.6</span></li>
          </ul>
        </li>

        {
          toggle6 === true &&
          <>
            <li>
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
            </li>
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
            <li>
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
            </li>
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
            <li>
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
            </li>
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
        } */}
        {/* 마이페이지(일반) */}
        <li>
          <ul className="row main-sec">
            <li>
              <span>
                <span className="toggle-btn" onClick={handleToggle7}>
                  {toggle7 ? '-' : '+'}
                </span>
                마이페이지(일반)
              </span>
            </li>
            <li>
              <span>서브메인</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-MU-MA-001</span>
            </li>
            <li className="file">
              <span>mypage/personal/personalMain</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/mypage/personal/personalMain">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.61</span>
            </li>
          </ul>
        </li>
        {toggle7 === true && (
          <>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>내차사기</span>
                </li>
                <li>
                  <span>최근 본 차량</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-009</span>
                </li>
                <li className="file">
                  <span>mypage/personal/buycar/interestCar</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/buycar/interestCar">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>쪽지상담 내역</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-009</span>
                </li>
                <li className="file">
                  <span>mypage/personal/buycar/counselCar</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/buycar/counselCar">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>홈서비스 내역</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/personal/buycar/homeService</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/buycar/homeService">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>홈서비스 신청 내역</span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_01</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_01">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>결제대기</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_02</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_02">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>배송준비</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_03</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_03">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>배송중</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_04</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_04">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>배송완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_05</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_05">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>취소신청</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-BC-005</span>
                </li>
                <li className="file">
                  <span>mypage/generalBuy04_06</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalBuy04_06">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>내차팔기</span>
                </li>
                <li>
                  <span>현황조회</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-001</span>
                </li>
                <li className="file">
                  <span>mypage/personal/sellcar/sellcar</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/sellcar/sellcar">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>방문평가 신청 내역</span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-002</span>
                </li>
                <li className="file">
                  <span>mypage/personal/sellcar/visitSellCarView</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/sellcar/visitSellCarView">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>평가사배정</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-002</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_v02</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_v02">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>방문 및 견적안내</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-002</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_v03</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_v03">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>판매완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-002</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_v04</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_v04">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>셀프평가 신청 내역</span>
                </li>
                <li>
                  <span>차량정보 등록</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-003</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_s01</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_s01">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-003</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_s02</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_s02">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>비교견적 진행 중</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-003</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_s03</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_s03">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>비교견적 완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-003</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_s04</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_s04">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>거래완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-003</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_s05</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_s05">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>무평가 신청 내역</span>
                </li>
                <li>
                  <span>차량정보 등록</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-007</span>
                </li>
                <li className="file">
                  <span>mypage/personal/sellcar/nonevalSellCarView</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/sellcar/nonevalSellCarView">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>신청완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-007</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_n02</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_n02">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>예상견적 확인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-007</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_n03</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_n03">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>차량 상태 점검</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-011</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_n04</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_n04">
                    <a className="link-btn" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>견적 완료 및 판매결정</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-010</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_n05</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_n05">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>취소신청</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-SC-010</span>
                </li>
                <li className="file">
                  <span>mypage/generalSell_n06</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/generalSell_n06">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>스마트옥션 출품내역</span>
                </li>
                <li>
                  <span>- 결과 X</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-AA-001</span>
                </li>
                <li className="file">
                  <span>mypage/personal/sellcar/autoAuction?result=no</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/sellcar/autoAuction?result=no">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>- 결과 O</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-MU-AA-001</span>
                </li>
                <li className="file">
                  <span>mypage/personal/sellcar/autoAuction</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/sellcar/autoAuction">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>회원정보 관리</span>
                </li>
                <li>
                  <span>회원정보 수정</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-001</span>
                </li>
                <li className="file">
                  <span>mypage/personal/info/changeInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/info/changeInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>비밀번호 변경</span>
                </li>
                <li>
                  <span>STEP1. 본인확인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-003</span>
                </li>
                <li className="file">
                  <span>mypage/dealer/info/confirmPwd</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/dealer/info/confirmPwd">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>STEP2. 비밀번호 변경</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-004</span>
                </li>
                <li className="file">
                  <span>mypage/dealer/info/changePwd</span>
                </li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link">
                  <Link href="/mypage/dealer/info/changePwd">
                    <a className="link-btn on" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>나의 문의내역</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-005</span>
                </li>
                <li className="file">
                  <span>mypage/personal/info/inquire</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/info/inquire">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.61</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>회원탈퇴</span>
                </li>
                <li>
                  <span>STEP1. 본인확인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-006</span>
                </li>
                <li className="file">
                  <span>mypage/personal/info/leaveMb</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/info/leaveMb">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span></span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>STEP2. 탈퇴사유 입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-UM-007</span>
                </li>
                <li className="file">
                  <span>mypage/personal/info/leaveLastMb</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/mypage/personal/info/leaveLastMb">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span></span>
                </li>
              </ul>
            </li>
          </>
        )}
        <li>
          <ul className="row main-sec">
            <li><span><span className="toggle-btn" onClick={handleToggle8}>{toggle8 ? '-' : '+'}</span>마이페이지(딜러)</span></li>
            <li><span>서브메인</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-M-MD-MA-001</span></li>
            <li className="file"><span>mypage/dealer/dealerMain</span></li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="/mypage/dealer/dealerMain"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <span>v1.65</span>
            </li>
          </ul>
        </li>

        {toggle8 === true && (
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용 정지 회원일 경우</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-001</span></li>
                <li className="file"><span>mypage/dealer/dealerMain?member=stop</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/dealerMain?member=stop"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li className="file"><span>mypage/dealer/dealerMain?member=no-group-id</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/dealerMain?member=no-group-id"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>쪽지상담 내역</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-003</span></li>
                <li className="file"><span>mypage/dealer/common/counselCar</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/common/counselCar"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>포인트/쿠폰</span></li>
                <li><span>결과O</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-005</span></li>
                <li className="file"><span>mypage/dealer/common/pointCuponHistory</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/common/pointCuponHistory"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.65</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결과X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-MA-005</span></li>
                <li className="file"><span>mypage/dealer/common/pointCuponHistory?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/c ommon/pointCuponHistory?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span>등록차량및광고관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealer/sellcar/carManagement</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/carManagement"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 등록차량관리 > 정보수정 > 차량정보 > 차량이름 수정 시 마지막 탭만 활성화 필요</p>
                          <p>- 등록차량관리 > 정보수정 > 차량정보 > 옵션정보 개발 후 확인 필요</p>
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
                <li><span>차량등록</span></li>
                <li><span>차량조회</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-200</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarSearch</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarSearch"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 차량옵션 데이터 확인 필요</p>
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
                <li><span>차량정보입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-202</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarInfo</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarInfo"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 기본정보 색상 데이터 확인 필요</p>
                          <p>- 옵션정보 데이터 확인 필요</p>
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
                <li><span>성능점검</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-205</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarPerformance</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarPerformance"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가격및차량소개</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-208</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarIntroducing</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarIntroducing"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량설명글입력</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-204</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarIntroducingNext</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarIntroducingNext"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-204</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarPhoto</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarPhoto"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 아이콘 변경 확인 필요</p>
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
                <li><span>결제</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-209</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarProdSelection</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarProdSelection"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등록완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-210</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarComplete</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarComplete"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의 설명글 관리</span></li>
                <li><span>설명글목록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-300</span></li>
                <li className="file"><span>mypage/dealer/sellcar/carDescription</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/carDescription"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.65</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>설명글등록</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-301</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarDescription</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarDescription"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>설명글수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-302</span></li>
                <li className="file"><span>mypage/dealer/sellcar/registerCarDescription</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/registerCarDescription"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 예약/판매 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-400</span></li>
                <li className="file"><span>mypage/dealer/sellcar/homeServiceStatus</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/homeServiceStatus"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보증차량 판매현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-SC-500</span></li>
                <li className="file"><span>mypage/dealer/sellcar/guarantCarSell</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/guarantCarSell"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Info</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Info"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li className="file"><span>mypage/dealer/sellcar/photographAppointment</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/photographAppointment"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li className="file"><span>mypage/dealer/sellcar/photographAppointmentIndex</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/photographAppointmentIndex"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                <li><span>차량정보 입력(내역O)</span></li>
                <li><span>IA-M-MD-SC-602</span></li>
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Studio01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Studio01"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li><span>IA-M-MD-SC-602</span></li>
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Studio01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Studio01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>지점/예약시간 선택</span></li>
                <li><span>IA-M-MD-SC-603</span></li>
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Studio02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Studio02"><a className="link-btn" target="_blank">완료</a></Link></li>
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
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제하기</span></li>
                <li><span>IA-M-MD-SC-605</span></li>
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Studio03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Studio03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
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
                <li className="file"><span>mypage/dealer/sellcar/dealerSell06Studio04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/dealerSell06Studio04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Shot 촬영 예약</span></li>
                <li><span>차량정보 입력(내역O)</span></li>
                <li><span>IA-M-MD-SC-608</span></li>
                <li className="file"><span>mypage/dealer/sellcar/liveShotAppointment</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/liveShotAppointment"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li className="file"><span>mypage/dealer/inventoryManagement</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/inventoryManagement"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차사기</span></li>
                <li><span>셀프평가 차량</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-001</span></li>
                <li className="file"><span>mypage/dealer/buycar/list</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/buycar/list"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 차량정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-BC-002</span></li>
                <li className="file"><span>mypage/dealer/buycar/detail</span></li>
                <li className="progress">{createProgress(80)}</li>
                <li className="link"><Link href="/mypage/dealer/buycar/detail"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 사진 클릭시 상세 팝업 호출 필요</p>
                          <p>- 관심 체크 기능 필요</p>
                          <p>- 입찰취소 버튼 클릭 후 생성된 팝업 스테이트 처리 필요</p>
                          <p>- 차량옵션 개발 후 확인 필요</p>
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
                <li><span>Live Shot 배정리스트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-LS-001</span></li>
                <li className="file"><span>mypage/dealer/sellcar/liveAssignList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/liveAssignList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Shot 광고 등록</span></li>
                <li><span>성능점검</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-LS-003</span></li>
                <li className="file"><span>mypage/dealer/sellcar/liveShotRegister01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/liveShotRegister01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등록완료</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-LS-005</span></li>
                <li className="file"><span>mypage/dealer/sellcar/liveShotRegister03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/sellcar/liveShotRegister03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>

            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>스마트옥션 이용현황</span></li>
                <li><span>경매회원 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-001</span></li>
                <li className="file"><span>mypage/dealer/autoauction/memberGuide</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/autoauction/memberGuide"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>경매장 이용 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-AA-100</span></li>
                <li className="file"><span>mypage/dealer/autoauction/currentState</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/autoauction/currentState"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>

            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보 관리</span></li>
                <li><span>회원정보/소개 관리_매매회원(딜러)</span></li>
                <li><span>판매점 정보</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-001</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>셀프평가 이용현황</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-002</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo?seq=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo?seq=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>주요정보/소개글 수정</span></li>
                <li><span>IA-M-MD-UM-003</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo?popup=true</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo?popup=true"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보/소개 관리_매매회원(단체)</span></li>
                <li><span>판매점 정보</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-004</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo?member=organization</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo?member=organization"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>사업자 등록증</span></li>
                <li><span>IA-M-MD-UM-005</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo?fs_popup=1</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo?fs_popup=1"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>관리사업자 등록증</span></li>
                <li><span>IA-M-MD-UM-006</span></li>
                <li className="file"><span>mypage/dealer/info/memberInfo?fs_popup=2</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/memberInfo?fs_popup=2"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보/소개 관리</span></li>
                <li><span>회원정보 수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-100</span></li>
                <li className="file"><span>mypage/dealer/info/changeMember</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/info/changeMember"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 판매 후기 관리</span></li>
                <li><span>후기내역(O)</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-400</span></li>
                <li className="file"><span>mypage/dealer/selfsell/sellcarEpilogue</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/selfsell/sellcarEpilogue"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 판매 후기 관리</span></li>
                <li><span>후기내역(X)</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-400</span></li>
                <li className="file"><span>mypage/dealer/selfsell/sellcarEpilogue?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/selfsell/sellcarEpilogue?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 판매 후기_등록/수정</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-401</span></li>
                <li className="file"><span>mypage/dealer/selfsell/sellcarEpilogueInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealer/selfsell/sellcarEpilogueInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러정보 관리</span></li>
                <li><span></span></li>
                <li><span>IA-M-MD-UM-500</span></li>
                <li className="file"><span>mypage/party/dealerManagement</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/party/dealerManagement"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.65</span></li>
              </ul>
            </li>
          </>
        )}
        {/* 매매가이드 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span>매매가이드</span>
            </li>
            <li>
              <span>EW상품</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-CM-UG-001</span>
            </li>
            <li className="file">
              <span>dealingguide/dealingGuides</span>
            </li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link">
              <Link href="/dealingguide/dealingGuides">
                <a className="link-btn on" target="_blank">
                  작업중
                </a>
              </Link>
            </li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 이미지 수급 필요</p>
                      <p>- 경로 설정 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>1.6</span>
            </li>
          </ul>
        </li>
        {/* 금융서비스 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span>금융서비스</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-FS-MA-001</span>
            </li>
            <li className="file">
              <span>financeservice/financeservice</span>
            </li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link">
              <Link href="/financeservice/financeservice">
                <a className="link-btn on" target="_blank">
                  작업중
                </a>
              </Link>
            </li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 이미지 수급 필요</p>
                      <p>- 경로 설정 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>1.6</span>
            </li>
          </ul>
        </li>
        {/* 이벤트 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span className="toggle-btn" onClick={handleToggle10}>
                {toggle10 ? '-' : '+'}
              </span>
              <span>이벤트</span>
            </li>
            <li>
              <span>진행중인 이벤트</span>
            </li>
            <li>
              <span>이벤트</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-CM-ET-001</span>
            </li>
            <li className="file">
              <span>event/eventList</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/event/eventList">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle10 === true && (
          <>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>이벤트 상세</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-CM-ET-002</span>
                </li>
                <li className="file">
                  <span>event/eventView</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/event/eventView">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            {/* <li>
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
            </li> */}
          </>
        )}
        {/* 고객센터 */}
        <li>
          <ul className="row main-sec">
            <li>
              <span className="toggle-btn" onClick={handleToggle11}>
                {toggle11 ? '-' : '+'}
              </span>
              <span>고객센터</span>
            </li>
            <li>
              <span>공지사항</span>
            </li>
            <li>
              <span>목록</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-CC-001</span>
            </li>
            <li className="file">
              <span>cscenter/noticeList</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/cscenter/noticeList">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle11 === true && (
          <>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>상세</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-CC-002</span>
                </li>
                <li className="file">
                  <span>cscenter/noticeView</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/cscenter/noticeView">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>1:1 상담</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-CC-003</span>
                </li>
                <li className="file">
                  <span>cscenter/directConsultGuide</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/cscenter/directConsultGuide">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>1:1 상담 작성</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-CC-003</span>
                </li>
                <li className="file">
                  <span>cscenter/directConsult</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/cscenter/directConsult">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li>
                  <span></span>
                </li>
                <li>
                  <span>FAQ</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>
                    IA-M-CC-005, <br />
                    IA-M-CC-006
                  </span>
                </li>
                <li className="file">
                  <span>cscenter/faq</span>
                </li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link">
                  <Link href="/cscenter/faq">
                    <a className="link-btn" target="_blank">
                      작업중
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 스와이프 탭 우측 영역 조정 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
          </>
        )}
        {/* 로그인/회원가입 */}
        <li>
          <ul className="row main-sec">
            <li className="nbd">
              <span className="toggle-btn" onClick={handleToggle12}>
                {toggle12 ? '-' : '+'}
              </span>
              <span>로그인/회원가입</span>
            </li>
            <li>
              <span>회원가입</span>
            </li>
            <li>
              <span>회원선택</span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span>IA-M-US-SI-001</span>
            </li>
            <li className="file">
              <span>member/choiceMemberType</span>
            </li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link">
              <Link href="/member/choiceMemberType">
                <a className="link-btn" target="_blank">
                  완료
                </a>
              </Link>
            </li>
            <li>
              <span>v1.6</span>
            </li>
          </ul>
        </li>
        {toggle12 === true && (
          <>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>일반회원 약관동의</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-001</span>
                </li>
                <li className="file">
                  <span>member/memberPolicyAgreement</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/memberPolicyAgreement">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>본인인증</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-003</span>
                </li>
                <li className="file">
                  <span>member/memberOneselfCertify</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/memberOneselfCertify">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>일반회원</span>
                </li>
                <li>
                  <span>가입정보 입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-004</span>
                </li>
                <li className="file">
                  <span>member/personalMemberInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/personalMemberInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>딜러회원</span>
                </li>
                <li>
                  <span>가입정보 입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-004</span>
                </li>
                <li className="file">
                  <span>member/dealerMemberInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/dealerMemberInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>단체회원</span>
                </li>
                <li>
                  <span>가입정보 입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-013</span>
                </li>
                <li className="file">
                  <span>member/organizationInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/organizationInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>제휴회원</span>
                </li>
                <li>
                  <span>가입정보 입력</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-016</span>
                </li>
                <li className="file">
                  <span>member/allianceInfo</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/allianceInfo">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>가입완료</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-SI-006</span>
                </li>
                <li className="file">
                  <span>member/memberRegistrationComplete</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/memberRegistrationComplete">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
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
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span>로그인</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-001</span>
                </li>
                <li className="file">
                  <span>pages/login</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/login">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>휴면해제</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-001</span>
                </li>
                <li className="file">
                  <span>member/dormantRescission</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/dormantRescission">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>비밀번호 변경</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-004</span>
                </li>
                <li className="file">
                  <span>member/changePassword</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/changePassword">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>종사원증 만료 안내</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-005</span>
                </li>
                <li className="file">
                  <span>member/expirationGuide</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/expirationGuide">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>아이디 찾기</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-010</span>
                </li>
                <li className="file">
                  <span>member/foundIdPwd</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/foundIdPwd">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>비밀번호 찾기</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-010</span>
                </li>
                <li className="file">
                  <span>member/loginInfoPassword</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/loginInfoPassword">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>새비밀번호 설정</span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span>IA-M-US-LI-014</span>
                </li>
                <li className="file">
                  <span>member/loginInfoPasswordConfirm</span>
                </li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link">
                  <Link href="/member/loginInfoPasswordConfirm">
                    <a className="link-btn" target="_blank">
                      완료
                    </a>
                  </Link>
                </li>
                <li>
                  <span>v1.6</span>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>

      <span className="all-toggle-btn" onClick={hadleShowMenu}>
        {showMenu ? '-' : '+'}
      </span>
    </div>
  );
};

export default Index;
