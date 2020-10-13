import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link'
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import useToggle from '@lib/share/custom/useToggle';

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

  const initToggleValue = false; // npm run build & export 시 true 로 설정
  const [toggle1, setToggle1, handleToggle1] = toggleMenu(initToggleValue);
  const [toggle2, setToggle2, handleToggle2] = toggleMenu(initToggleValue);
  const [toggle3, setToggle3, handleToggle3] = toggleMenu(initToggleValue);
  const [toggle4, setToggle4, handleToggle4] = toggleMenu(initToggleValue);
  const [toggle5, setToggle5, handleToggle5] = toggleMenu(initToggleValue);
  const [toggle6, setToggle6, handleToggle6] = toggleMenu(initToggleValue);
  const [toggle7, setToggle7, handleToggle7] = toggleMenu(initToggleValue);
  const [toggle8, setToggle8, handleToggle8] = toggleMenu(initToggleValue);
  const [toggle9, setToggle9, handleToggle9] = toggleMenu(initToggleValue);
  const [toggle10, setToggle10, handleToggle10] = toggleMenu(initToggleValue);
  const [toggle11, setToggle11, handleToggle11] = toggleMenu(initToggleValue);
  const [toggle12, setToggle12, handleToggle12] = toggleMenu(initToggleValue);
  const [toggle13, setToggle13, handleToggle13] = toggleMenu(initToggleValue);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [showMenu, setShowMenu] = useState(initToggleValue);
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
      setToggle13(true);
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
      setToggle13(false);
    }
  }, [showMenu]);

  return (
    <div className="coding-wrap">
      <div className="map-header">
        <h3>GLOVIS <b>CODING MAP</b> <Link href="/mobile"><a className="btn">MOBILE 코딩맵 바로가기</a></Link></h3>
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
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="/commonStyle"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="main"><a className="link-btn on" target="_blank">작업중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 인기매물 플레이 이미지 수급 필요</p>
                      <p>- 제휴문의 팝업 디자인 필요</p>
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
            <li><span>IA-BC-MA-001</span></li>
            <li className="file"><span>buy/list</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/buy/list"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <span>v1.62</span>
            </li>
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
                <li><span>IA-BC-MA-001</span></li>
                <li className="file"><span>buy/list?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/list?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>일반/수입/금융사 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-AC-001</span></li>
                <li className="file"><span>buy/viewA</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewA"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>오토벨라이브스튜디오</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-MA-001</span></li>
                <li className="file"><span>buy/liveList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/liveList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>라이브스튜디오</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-LS-003</span></li>
                <li className="file"><span>buy/liveGuide</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/liveGuide"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>라이브스튜디오 상세</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-LS-001</span></li>
                <li className="file"><span>buy/viewC</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewC"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>경매낙찰차량</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-MA-001</span></li>
                <li className="file"><span>buy/auctionList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/auctionList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
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
                <li><span>IA-BC-AU-001</span></li>
                <li className="file"><span>buy/viewB</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/viewB"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>인증몰</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-CM-001</span></li>
                <li className="file"><span>buy/certifyMall</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/buy/certifyMall"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>인증브랜드 리스트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-BC-CM-002</span></li>
                <li className="file"><span>buy/brandList</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/brandList"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>공통</span></li>
                <li><span></span></li>
                <li><span>판매자 정보</span></li>
                <li><span></span></li>
                <li><span>IA-BC-DT-007</span></li>
                <li className="file"><span>buy/sellerInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/buy/sellerInfo"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle2}>{toggle2 ? "-" : "+"}</span><span>내차팔기</span></li>
            <li><span>내차팔기</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-SC-MA-001</span></li>
            <li className="file"><span>sell/sellHome</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/sell/sellHome"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.71</span></li>
          </ul>
        </li>
        {
          toggle2 === true &&
          <>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>방문평가판매</span></li>
                <li><span>방문평가신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-VS-001</span></li>
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
                  <span>v1.71</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문평가완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-VS-006</span></li>
                <li className="file"><span>sell/visitComplete</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/visitComplete"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>셀프등록판매</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-008</span></li>
                <li className="file"><span>sell/selfHome</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/selfHome"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 슬라이드 배너 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.71</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-009</span></li>
                <li className="file"><span>sell/selfCertify</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfCertify"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보조회</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-001</span></li>
                <li className="file"><span>sell/selfStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-002</span></li>
                <li className="file"><span>sell/selfStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                  <span>v1.71</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-004</span></li>
                <li className="file"><span>sell/selfStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청내용확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-005</span></li>
                <li className="file"><span>sell/selfStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-SS-007</span></li>
                <li className="file"><span>sell/selfStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/selfStep05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>무평가판매</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-006</span></li>
                <li className="file"><span>sell/freeHome</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/sell/freeHome"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 슬라이드 배너 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.71</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-001</span></li>
                <li className="file"><span>sell/freeCertify</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeCertify"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보조회</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-002</span></li>
                <li className="file"><span>sell/freeStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-003</span></li>
                <li className="file"><span>sell/freeStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                  <span>v1.71</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-003</span></li>
                <li className="file"><span>sell/freeStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청내용확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-004</span></li>
                <li className="file"><span>sell/freeStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-SC-NS-005</span></li>
                <li className="file"><span>sell/freeStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/sell/freeStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle3}>{toggle3 ? "-" : "+"}</span><span>시세조회</span></li>
            <li><span>시세조회</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-SP-MA-001</span></li>
            <li className="file"><span>marketPrice/marketPrice</span></li>
            <li className="progress">{createProgress(90)}</li>
            <li className="link"><Link href="/marketPrice/marketPrice"><a className="link-btn on" target="_blank">작업중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 검색 영역 디자인 변경</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span>v1.64</span>
            </li>
          </ul>
        </li>
        {
          toggle3 === true &&
          <li>
            <ul className="row">
              <li><span></span></li>
              <li><span></span></li>
              <li><span>리포트</span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span>IA-SP-MA-001</span></li>
              <li className="file"><span>marketPrice/report</span></li>
              <li className="progress">{createProgress(100)}</li>
              <li className="link"><Link href="/marketPrice/report"><a className="link-btn" target="_blank">완료</a></Link></li>
              <li><span>v1.64</span></li>
            </ul>
          </li>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle4}>{toggle4 ? "-" : "+"}</span><span>홈서비스</span></li>
            <li><span>홈서비스</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-HS-CS-001</span></li>
            <li className="file"><span>homeService/serviceHome</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/homeService/serviceHome"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.62</span></li>
          </ul>
        </li>
        {
          toggle4 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>서비스안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GS-001</span></li>
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
                          <p>- 환불 규정 팝업 수급 필요</p>
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
                <li><span>차량정보확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-001</span></li>
                <li className="file"><span>homeService/serviceStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 환불 규정 팝업 수급 필요</p>
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
                <li><span>보증상품선택</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-002</span></li>
                <li className="file"><span>homeService/serviceStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>계약자정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-003</span></li>
                <li className="file"><span>homeService/serviceStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.62</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-004</span></li>
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
                  <span>v1.62</span>
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
                <li><span>IA-HS-GA-005</span></li>
                <li className="file"><span>homeService/serviceStep03_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep03_02"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                  <span>v1.62</span>
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
                <li><span>IA-HS-GA-006</span></li>
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
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예상결제금액확인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-007</span></li>
                <li className="file"><span>homeService/serviceStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/homeService/serviceStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-HS-GA-008</span></li>
                <li className="file"><span>homeService/serviceStep05</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/homeService/serviceStep05"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 하단 배너 이미지 수급 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.62</span>
                </li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle5}>{toggle5 ? "-" : "+"}</span><span>오토옥션</span></li>
            <li><span>게이트</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-AA-GS-002</span></li>
            <li className="file"><span>autoAuction/auctionGate</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/autoAuction/auctionGate"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.82</span></li>
          </ul>
        </li>
        {
          toggle5 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>메인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-GS-001</span></li>
                <li className="file"><span>autoAuction/auctionHome</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/auctionHome"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>오토옥션 이용안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-GS-003</span></li>
                <li className="file"><span>autoAuction/auctionInfo</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/autoAuction/auctionInfo"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                  <span>v1.82</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>출품하기</span></li>
                <li><span>경매약관 및 주의사항</span></li>
                <li><span></span></li>
                <li><span>IA-AA-EA-001</span></li>
                <li className="file"><span>autoAuction/exhibitStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-EA-002</span></li>
                <li className="file"><span>autoAuction/exhibitStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-EA-003</span></li>
                <li className="file"><span>autoAuction/exhibitStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탁송신청</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-EA-004</span></li>
                <li className="file"><span>autoAuction/exhibitStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>출품완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-AA-EA-005</span></li>
                <li className="file"><span>autoAuction/exhibitStep05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/autoAuction/exhibitStep05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.82</span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span>프라이싱시스템</span></li>
            <li><span>프라이싱시스템</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-PS-MA-001</span></li>
            <li className="file"><span>pricingsystem/pricing01</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/pricingSystem/pricing01"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span></span></li>
          </ul>
        </li>
        <li>
          <ul className="row main-sec">
            <li><span><span className="toggle-btn" onClick={handleToggle6}>{toggle6 ? "-" : "+"}</span>마이페이지(일반)</span></li>
            <li><span>마이페이지(일반)</span></li>
            <li><span></span></li>
            <li><span>서비스 이용내역 O<br />최근본차량 O</span></li>
            <li><span></span></li>
            <li><span>IA-MU-MA-001</span></li>
            <li className="file"><span>mypage/generalMain</span></li>
            <li className="progress">{createProgress(99)}</li>
            <li className="link"><Link href="/mypage/generalMain"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
              <span>v1.63</span>
            </li>
          </ul>
        </li>
        {
          toggle6 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>서비스 이용내역 X<br />최근본차량 X</span></li>
                <li><span></span></li>
                <li><span>IA-MU-MA-001</span></li>
                <li className="file"><span>mypage/generalMain?result1=no&result2=no</span></li>
                <li className="progress">{createProgress(99)}</li>
                <li className="link"><Link href="/mypage/generalMain?result1=no&result2=no"><a className="link-btn on" target="_blank">작업중</a></Link></li>
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
                  <span>v1.63</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차사기</span></li>
                <li><span>관심차량</span></li>
                <li><span>관심차량 O</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-002</span></li>
                <li className="file"><span>mypage/generalBuy01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>관심차량 X</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-002</span></li>
                <li className="file"><span>mypage/generalBuy01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>최근본차량</span></li>
                <li><span>최근본차량 O</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-003</span></li>
                <li className="file"><span>mypage/generalBuy02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>최근본차량 X</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-003</span></li>
                <li className="file"><span>mypage/generalBuy02?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy02?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쪽지상담 내역</span></li>
                <li><span>상담내역 O</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-008</span></li>
                <li className="file"><span>mypage/generalBuy03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상담내역 X</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-008</span></li>
                <li className="file"><span>mypage/generalBuy03?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy03?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 내역</span></li>
                <li><span>홈서비스 내역 O</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-005</span></li>
                <li className="file"><span>mypage/generalBuy04</span></li>
                <li className="progress">{createProgress(90)}</li>
                <li className="link"><Link href="/mypage/generalBuy04"><a className="link-btn on" target="_blank">작업중</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 팝업 위치 / 상세 보기&amp;닫기 여부</p>
                          <p>- 결제상세 팝업 구매취소 디자인 업데이트 필요</p>
                          <p>- 결제상세 팝업 증빙요청 디자인 업데이트 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                  <span>v1.63</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 내역 X</span></li>
                <li><span></span></li>
                <li><span>IA-MU-BC-005</span></li>
                <li className="file"><span>mypage/generalBuy04?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalBuy04?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span>현황조회</span></li>
                <li><span>현황조회 리스트</span></li>
                <li><span>목록 O</span></li>
                <li><span>IA-MU-SC-001</span></li>
                <li className="file"><span>mypage/generalSell01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>목록 X</span></li>
                <li><span>IA-MU-SC-001</span></li>
                <li className="file"><span>mypage/generalSell01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문평가 상세</span></li>
                <li><span>신청완료</span></li>
                <li><span>IA-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>평가사배정</span></li>
                <li><span>IA-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>방문 및 견적안내</span></li>
                <li><span>IA-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적 완료 및 판매결정</span></li>
                <li><span>IA-MU-SC-002</span></li>
                <li className="file"><span>mypage/generalSell_v03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_v03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>셀프평가 상세</span></li>
                <li><span>차량정보 등록</span></li>
                <li><span>IA-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span>IA-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 진행중</span></li>
                <li><span>IA-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 완료</span></li>
                <li><span>IA-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>거래완료</span></li>
                <li><span>IA-MU-SC-003</span></li>
                <li className="file"><span>mypage/generalSell_s05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_s05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            {/* <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용후기</span></li>
                <li><span>IA-MU-SC-004</span></li>
                <li className="file"><span>mypage/generalSell_s02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalsell_s02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li> */}
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>무평가 상세</span></li>
                <li><span>차량정보 등록</span></li>
                <li><span>IA-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>신청완료</span></li>
                <li><span>IA-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>예상견적 확인</span></li>
                <li><span>IA-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량상태점검</span></li>
                <li><span>IA-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>견적완료 및 판매결정</span></li>
                <li><span>IA-MU-SC-007</span></li>
                <li className="file"><span>mypage/generalSell_n05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell_n05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>오토옥션 출품내역</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MU-AA-001</span></li>
                <li className="file"><span>mypage/generalSell02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalSell02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>금융서비스</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li className="file"><span></span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href=""><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li>
                  <div className="btn-tooltip">
                    <Tooltip placement="bottom" width={250} event="click">
                      <TooltipItem>
                        <i className="ico-pencil"></i>
                      </TooltipItem>
                      <TooltipCont half={true}>
                        <div className="work-exp">
                          <p>- 기획&amp;디자인 업로드 필요</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보 관리</span></li>
                <li><span>회원정보 수정</span></li>
                <li><span>회원정보 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-001</span></li>
                <li className="file"><span>mypage/dealerMember01_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-002</span></li>
                <li className="file"><span>mypage/generalMember01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span>비밀번호 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-005</span></li>
                <li className="file"><span>mypage/dealerMember01_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_03"><a className="link-btn" target="_blank">작업중</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-006</span></li>
                <li className="file"><span>mypage/dealerMember01_04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_04"><a className="link-btn" target="_blank">작업중</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의 문의내역</span></li>
                <li><span>나의 문의내역</span></li>
                <li><span>목록 O</span></li>
                <li><span>IA-US-UM-007</span></li>
                <li className="file"><span>mypage/generalMember03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>목록 X</span></li>
                <li><span>IA-US-UM-007</span></li>
                <li className="file"><span>mypage/generalMember03?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/generalMember03?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
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
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴</span></li>
                <li><span>회원탈퇴 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-009</span></li>
                <li className="file"><span>mypage/dealerMember01_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-010</span></li>
                <li className="file"><span>mypage/dealerMember01_06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.63</span></li>
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
            <li><span>IA-MN-SC-001</span></li>
            <li className="file"><span>mypage/guestMain</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/mypage/guestMain"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.63</span></li>
          </ul>
        </li>
        <li>
          <ul className="row main-sec">
            <li><span><span className="toggle-btn" onClick={handleToggle8}>{toggle8 ? "-" : "+"}</span>마이페이지(딜러)</span></li>
            <li><span>쪽지상담 내역</span></li>
            <li><span>상담내역 O</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-MD-NC-001</span></li>
            <li className="file"><span>mypage/dealerNote</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/mypage/dealerNote"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li>
              <span>v1.77</span>
            </li>
          </ul>
        </li>
        {
          toggle8 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>상담내역 X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-NC-001</span></li>
                <li className="file"><span>mypage/dealerNote?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerNote?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>포인트/쿠폰</span></li>
                <li><span>포인트 내역 O</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=point</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회되는 쿠폰</span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=point&coupon_search=success</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point&coupon_search=success"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>조회 안되는 쿠폰</span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=point&coupon_search=failure</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point&coupon_search=failure"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>포인트 내역 X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=point&result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=point&result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쿠폰 내역 O</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=coupon</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=coupon"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>쿠폰 내역 X</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-PO-001</span></li>
                <li className="file"><span>mypage/dealerPoint?page=coupon&result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerPoint?page=coupon&result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차팔기</span></li>
                <li><span>등록차량및광고관리</span></li>
                <li><span>일반 회원일 경우</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealerSell01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>목록 없을 경우</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealerSell01?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell01?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.77</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>이용 정지 회원일 경우</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealerSell01?member=stop</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell01?member=stop"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>단체회원ID를 발급받지 않은 개인딜러</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-001</span></li>
                <li className="file"><span>mypage/dealerSell01?member=no-group-id</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell01?member=no-group-id"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량등록</span></li>
                <li><span>차량조회</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-200</span></li>
                <li className="file"><span>mypage/dealerSell02_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보조회</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-201</span></li>
                <li className="file"><span>mypage/dealerSell02_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보입력</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-201</span></li>
                <li className="file"><span>mypage/dealerSell02_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>성능점검</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-203</span></li>
                <li className="file"><span>mypage/dealerSell02_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가격및차량소개</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-202</span></li>
                <li className="file"><span>mypage/dealerSell02_04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량사진등록</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-204</span></li>
                <li className="file"><span>mypage/dealerSell02_06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제상품선택</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-205</span></li>
                <li className="file"><span>mypage/dealerSell02_07</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_07"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>결제방식선택</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-205</span></li>
                <li className="file"><span>mypage/dealerSell02_08</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_08"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등록완료</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-206</span></li>
                <li className="file"><span>mypage/dealerSell02_09</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell02_09"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의설명글관리</span></li>
                <li><span>나의설명글관리</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-300</span></li>
                <li className="file"><span>mypage/dealerSell03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의설명글등록</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-302</span></li>
                <li className="file"><span>mypage/dealerSell03_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell03_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>나의설명글수정</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-302</span></li>
                <li className="file"><span>mypage/dealerSell03_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell03_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>홈서비스 예약/판매 현황</span></li>
                <li><span>목록 O</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-400</span></li>
                <li className="file"><span>mypage/dealerSell04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>목록 X</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-400</span></li>
                <li className="file"><span>mypage/dealerSell04?result=no</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell04?result=no"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보증차량 판매현황</span></li>
                <li><span>판매현황 리스트</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-401</span></li>
                <li className="file"><span>mypage/dealerSell05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>보증차량등록</span></li>
                <li><span>차량조회</span></li>
                <li><span>IA-MD-SC-402</span></li>
                <li className="file"><span>mypage/dealerSell05_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보조회</span></li>
                <li><span>IA-MD-SC-402</span></li>
                <li className="file"><span>mypage/dealerSell05_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량정보입력</span></li>
                <li><span>IA-MD-SC-402</span></li>
                <li className="file"><span>mypage/dealerSell05_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>EW정보입력</span></li>
                <li><span>IA-MD-SC-402</span></li>
                <li className="file"><span>mypage/dealerSell05_04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>등록완료</span></li>
                <li><span>IA-MD-SC-402</span></li>
                <li className="file"><span>mypage/dealerSell05_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell05_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live Studio촬영예약</span></li>
                <li><span>메인</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-500</span></li>
                <li className="file"><span>mypage/dealerSell06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>Live 서비스 안내</span></li>
                <li><span></span></li>
                <li><span>IA-MD-SC-502</span></li>
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
                  <span>v1.77</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>재고관리</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>A-MD-FS-001</span></li>
                <li className="file"><span>mypage/dealerSell07</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerSell07"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>내차 사기</span></li>
                <li><span>24시간 실시간 비교견적</span></li>
                <li><span>비교견적 리스트</span></li>
                <li><span></span></li>
                <li><span>IA-MD-BC-001</span></li>
                <li className="file"><span>mypage/dealerBuy01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerBuy01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비교견적 상세</span></li>
                <li><span>입찰중 - 입찰가 입력 전</span></li>
                <li><span>IA-MD-BC-003</span></li>
                <li className="file"><span>mypage/dealerBuy01_01?auction=true</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerBuy01_01?auction=true"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰중 - 입찰가 입력 후</span></li>
                <li><span>IA-MD-BC-003</span></li>
                <li className="file"><span>mypage/dealerBuy01_01?auction=true&bidding=true</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerBuy01_01?auction=true&bidding=true"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰종료</span></li>
                <li><span>IA-MD-BC-002</span></li>
                <li className="file"><span>mypage/dealerBuy01_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerBuy01_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>경매회원 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-001</span></li>
                <li className="file"><span>mypage/dealerAuction01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>약관동의</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-002</span></li>
                <li className="file"><span>mypage/dealerAuction02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-003</span></li>
                <li className="file"><span>mypage/dealerAuction03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>개인정보입력</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-004</span></li>
                <li className="file"><span>mypage/dealerAuction04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원가입 완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-005</span></li>
                <li className="file"><span>mypage/dealerAuction05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>서류심사중</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-006</span></li>
                <li className="file"><span>mypage/dealerAuction06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>서류심사중(법인 사업자)</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-007</span></li>
                <li className="file"><span>mypage/dealerAuction07</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction07"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입 승인중</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-008</span></li>
                <li className="file"><span>mypage/dealerAuction08</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction08"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-009</span></li>
                <li className="file"><span>mypage/dealerAuction09</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction09"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입정보</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-010</span></li>
                <li className="file"><span>mypage/dealerAuction10</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction10"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탈퇴처리중</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-011</span></li>
                <li className="file"><span>mypage/dealerAuction11</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction11"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탈퇴완료</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-011-01</span></li>
                <li className="file"><span>mypage/dealerAuction11_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction11_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>경매장 이용 현황</span></li>
                <li><span>낙찰정보 조회</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-012</span></li>
                <li className="file"><span>mypage/dealerAuction12</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction12"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>입찰정보 조회</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-013</span></li>
                <li className="file"><span>mypage/dealerAuction13</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction13"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>클레임 신청 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-014</span></li>
                <li className="file"><span>mypage/dealerAuction14</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction14"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>내 차 팔기 현황</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-AU-015</span></li>
                <li className="file"><span>mypage/dealerAuction15</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="mypage/dealerAuction15"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>회원정보 관리</span></li>
                <li><span>회원정보/소개 관리</span></li>
                <li><span>회원정보</span></li>
                <li><span>개인딜러</span></li>
                <li><span>IA-US-UM-001</span></li>
                <li className="file"><span>mypage/dealerMember01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>단체, 제휴 회원</span></li>
                <li><span>IA-US-UM-001</span></li>
                <li className="file"><span>mypage/dealerMember01?member=organization</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01?member=organization"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-003</span></li>
                <li className="file"><span>mypage/dealerMember01_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 수정</span></li>
                <li><span>개인 딜러 회원</span></li>
                <li><span>IA-US-UM-004</span></li>
                <li className="file"><span>mypage/dealerMember01_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원정보 수정</span></li>
                <li><span>단체, 제휴 회원</span></li>
                <li><span>IA-US-UM-004</span></li>
                <li className="file"><span>mypage/dealerMember01_02?member=organization</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_02?member=organization"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-005</span></li>
                <li className="file"><span>mypage/dealerMember01_03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-006</span></li>
                <li className="file"><span>mypage/dealerMember01_04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴 PW</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-009</span></li>
                <li className="file"><span>mypage/dealerMember01_05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>회원탈퇴</span></li>
                <li><span></span></li>
                <li><span>IA-US-UM-010</span></li>
                <li className="file"><span>mypage/dealerMember01_06</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember01_06"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>차량 판매 후기 관리</span></li>
                <li><span>후기 리스트</span></li>
                <li><span></span></li>
                <li><span>IA-MD-UM-005</span></li>
                <li className="file"><span>mypage/dealerMember02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>후기 등록</span></li>
                <li><span></span></li>
                <li><span>IA-MD-UM-006</span></li>
                <li className="file"><span>mypage/dealerMember02_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember02_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러정보 관리</span></li>
                <li><span>딜러 리스트</span></li>
                <li><span></span></li>
                <li><span>IA-MD-DI-001</span></li>
                <li className="file"><span>mypage/dealerMember03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>딜러 상세</span></li>
                <li><span>상세수정</span></li>
                <li><span>IA-MD-DI-002</span></li>
                <li className="file"><span>mypage/dealerMember03_01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember03_01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>미승인 상태</span></li>
                <li><span>IA-MD-DI-004</span></li>
                <li className="file"><span>mypage/dealerMember03_02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember03_02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>탈퇴 상태</span></li>
                <li><span>IA-MD-DI-004</span></li>
                <li className="file"><span>mypage/dealerMember03_02?apply=yes</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember03_02?apply=yes"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>지점 관리</span></li>
                <li><span>지점 리스트</span></li>
                <li><span></span></li>
                <li><span>IA-MD-TM-001</span></li>
                <li className="file"><span>mypage/dealerMember04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>Live shot 배정 리스트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-MD-LS-001</span></li>
                <li className="file"><span>mypage/dealerMember05</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/mypage/dealerMember05"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.77</span></li>
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
            <li className="link"><Link href="/dealing/dealingHome"><a className="link-btn on" target="_blank">작업중</a></Link></li>
            <li>
              <div className="btn-tooltip">
                <Tooltip placement="bottom" width={250} event="click">
                  <TooltipItem>
                    <i className="ico-pencil"></i>
                  </TooltipItem>
                  <TooltipCont half={true}>
                    <div className="work-exp">
                      <p>- 서비스가이드 이미지 수급 필요</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </div>
              <span></span>
            </li>
          </ul>
        </li>
        {
          toggle9 === true &&
          <>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>구매가이드</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-UG-002</span></li>
                <li className="file"><span></span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href=""><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>판매가이드</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-UG-003</span></li>
                <li className="file"><span></span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href=""><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span>이용권 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-UG-004</span></li>
                <li className="file"><span></span></li>
                <li className="progress">{createProgress(0)}</li>
                <li className="link"><Link href=""><a className="link-btn before" target="_blank">작업전</a></Link></li>
                <li><span></span></li>
              </ul>
            </li>
          </>
        }

        <li>
          <ul className="row main-sec">
            <li><span className="toggle-btn" onClick={handleToggle10}>{toggle10 ? "-" : "+"}</span><span>이벤트</span></li>
            <li><span>진행중인 이벤트</span></li>
            <li><span></span></li>
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
                <li><span>종료 이벤트</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-ET-001</span></li>
                <li className="file"><span>event/eventList?eventType=end</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/event/eventList?eventType=end"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
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
                <li><span>IA-CM-ET-003</span></li>
                <li className="file"><span>event/pointMall</span></li>
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
            <li><span>IA-CM-CC-001</span></li>
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
                <li><span>IA-CM-CC-002</span></li>
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
                <li><span>메인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-CC-003</span></li>
                <li className="file"><span>customer/inquiry</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/inquiry"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.6</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li><span></span></li>
                <li><span></span></li>
                <li><span>1:1 상담 작성</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-CC-003</span></li>
                <li className="file"><span>customer/inquiryWrite</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/customer/inquiryWrite"><a className="link-btn" target="_blank">완료</a></Link></li>
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
                <li><span>IA-CM-CC-005</span></li>
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
            <li><span>IA-US-SI-001</span></li>
            <li className="file"><span>member/memberHome</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/member/memberHome"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.64</span></li>
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
                <li><span>IA-US-SI-002</span></li>
                <li className="file"><span>member/memberStep01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/memberStep01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>본인인증</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-003</span></li>
                <li className="file"><span>member/memberStep02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/memberStep02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>일반회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-004</span></li>
                <li className="file"><span>member/memberStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/memberStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-005</span></li>
                <li className="file"><span>member/memberStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/memberStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>딜러회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-008</span></li>
                <li className="file"><span>member/dealerStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/dealerStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-010</span></li>
                <li className="file"><span>member/dealerStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/dealerStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>단체회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-011</span></li>
                <li className="file"><span>member/groupStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/groupStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-012</span></li>
                <li className="file"><span>member/groupStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/groupStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>제휴회원</span></li>
                <li><span>가입정보 입력</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-013</span></li>
                <li className="file"><span>member/allyStep03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/allyStep03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>가입완료</span></li>
                <li><span></span></li>
                <li><span>IA-US-SI-014</span></li>
                <li className="file"><span>member/allyStep04</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/allyStep04"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span>로그인</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-LI-001</span></li>
                <li className="file"><span>member/login</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/member/login"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li>
                  <span>v1.64</span>
                </li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>휴면해제</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-LI-003</span></li>
                <li className="file"><span>member/loginState01</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState01"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>비밀번호 변경</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-LI-004</span></li>
                <li className="file"><span>member/loginState02</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState02"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>증사원증 만료 안내</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-LI-006</span></li>
                <li className="file"><span>member/loginState03</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginState03"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>아이디/비밀번호 찾기</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-US-LI-010</span></li>
                <li className="file"><span>member/loginInfo</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="member/loginInfo"><a className="link-btn" target="_blank on">완료</a></Link></li>
                <li><span>v1.64</span></li>
              </ul>
            </li>
          </>
        }
         <li> {/* 푸터(약관) */}
          <ul className="row main-sec">
            <li className="nbd"><span className="toggle-btn" onClick={handleToggle13}>{toggle13 ? "-" : "+"}</span><span>푸터(약관)</span></li>
            <li><span>이용/환불약관</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span>IA-CM-FT-003</span></li>
            <li className="file"><span>common/terms</span></li>
            <li className="progress">{createProgress(100)}</li>
            <li className="link"><Link href="/common/terms"><a className="link-btn" target="_blank">완료</a></Link></li>
            <li><span>v1.71</span></li>
          </ul>
        </li>
        {
          toggle13 === true &&
          <>
            <li>
              <ul className="row">
                <li className="nbd"><span></span></li>
                <li><span></span></li>
                <li><span>개인정보처리방침</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span>IA-CM-FT-005</span></li>
                <li className="file"><span>/common/policy</span></li>
                <li className="progress">{createProgress(100)}</li>
                <li className="link"><Link href="/common/policy"><a className="link-btn" target="_blank">완료</a></Link></li>
                <li><span>v1.71</span></li>
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
