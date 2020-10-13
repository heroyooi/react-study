import { useSelector, useDispatch } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Link from 'next/link';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MypageNavi = ({mode="normal", memberType="normal"}) => { // mode -> normal(일반), dealer(딜러), guest(비회원)
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);

  if (hasMobile) {
    return (
      <div className="mypage-nav-sec">
      {
        mode === "normal" && (
          <>
            <div className="mypage-menu">
              <ul>
                <li className="none">내차사기</li>
                <li><Link href=""><a>관심차량</a></Link></li>
                <li><Link href=""><a>최근 본 차량</a></Link></li>
                <li><Link href=""><a>쪽지상담 내역</a></Link></li>
                <li><Link href=""><a>홈서비스 내역</a></Link></li>
              </ul>
              <ul>
                <li className="none">내차팔기</li>
                <li><Link href=""><a>현황 조회</a></Link></li>
                <li><Link href=""><a>오토옥션 출품내역</a></Link></li>
              </ul>
              {/* <ul className="straight">
                <li><Link href=""><a>금융 서비스</a></Link></li>
              </ul> */}
              <ul>
                <li className="none">회원정보 관리</li>
                <li><Link href=""><a>회원정보 수정</a></Link></li>
                <li><Link href=""><a>비밀번호 변경</a></Link></li>
                <li><Link href=""><a>나의 문의내역</a></Link></li>
                <li><Link href=""><a>회원탈퇴</a></Link></li>
              </ul>
            </div>
          </>
        )
      }
      {
        mode === "dealer" && (
          <>
            <div className="mypage-menu">
              <ul>
                <li className="none">내차팔기</li>
                <li><Link href=""><a>등록차량 및 광고관리</a></Link></li>
                {
                  memberType === "stop"
                    ? <li><Link href=""><a onClick={(e) => rodalPopupHandler1(e, "fade")}>차량등록</a></Link></li>
                    : <li><Link href=""><a>차량등록</a></Link></li>
                }
                <li><Link href=""><a>나의 설명글 관리</a></Link></li>
                <li><Link href=""><a>홈서비스 예약/판매 현황</a></Link></li>
                <li><Link href=""><a>보증 차량 판매 현황</a></Link></li>
                {
                  memberType === "stop"
                    ? <li><Link href=""><a onClick={(e) => rodalPopupHandler1(e, "fade")}>오토벨 Live Service 예약</a></Link></li>
                    : <li><Link href=""><a>오토벨 Live Service 예약</a></Link></li>
                }
                <li><Link href=""><a>재고관리</a></Link></li>
              </ul>
              <ul>
                <li className="none">내차사기</li>
                <li><Link href=""><a>24시간 실시간 비교견적</a></Link></li>
              </ul>
              <ul>
                <li className="none">오토옥션 이용현황</li>
                <li><Link href=""><a>경매회원 안내</a></Link></li>
                <li><Link href=""><a>경매장 이용현황</a></Link></li>
              </ul>
              {/* <ul className="straight">
                <li><Link href=""><a>프라이싱센터 바로가기</a></Link></li>
              </ul> */}
              <ul>
                <li className="none">회원정보 관리</li>
                <li><Link href=""><a>회원정보/소개 관리</a></Link></li>
                <li><Link href=""><a>차량 판매 후기 관리</a></Link></li>
                <li><Link href=""><a>딜러정보 관리</a></Link></li>
                {/* <li><Link href=""><a>지점 관리</a></Link></li> */}
              </ul>
              {/* <ul className="straight">
                <li><Link href=""><a>Live shot 배정 리스트</a></Link></li>
              </ul> */}
            </div>
          </>
        )
      }
      </div>
  )
}
      
  return (
    <div className="mypage-nav-sec">
      {
        mode === "normal" && (
          <>
            <ul className="mypage-profile">
              <li className="tit">마이페이지</li>
              <li className="name">김현대님, 환영합니다.</li>
              <li className="user-info">
                휴대폰 010 - 1234 -5678<br />
                이메일 autobeluser@naver.com
                <Button size="full" background="blue80" title="회원정보 수정" height={48} marginTop={11} href="/mypage/dealerMember01_01" />
              </li>
            </ul>
            <div className="mypage-menu">
              <ul>
                <li className="none">내차사기</li>
                <li><Link href=""><a>관심차량</a></Link></li>
                <li><Link href=""><a>최근 본 차량</a></Link></li>
                <li><Link href=""><a>쪽지상담 내역</a></Link></li>
                <li><Link href=""><a>홈서비스 내역</a></Link></li>
              </ul>
              <ul>
                <li className="none">내차팔기</li>
                <li><Link href=""><a>현황 조회</a></Link></li>
                <li><Link href=""><a>오토옥션 출품내역</a></Link></li>
              </ul>
              <ul className="straight">
                <li><Link href=""><a>금융 서비스</a></Link></li>
              </ul>
              <ul>
                <li className="none">회원정보 관리</li>
                <li><Link href=""><a>회원정보 수정</a></Link></li>
                <li><Link href=""><a>비밀번호 변경</a></Link></li>
                <li><Link href=""><a>나의 문의내역</a></Link></li>
                <li><Link href=""><a>회원탈퇴</a></Link></li>
              </ul>
            </div>
          </>
        )
      }
      {
        mode === "dealer" && (
          <>
            <ul className="mypage-profile dealer">
              <li className="name">
                <p>
                  <span>[딜러]</span>최딜러님
                  <span className="day tx-blue80">98일</span>
                  {/* 30일 이내 */}{/* <span className="day tx-red80">10일</span> */} 
                </p>
              </li>
              <li className="tag">
                <ul>
                  <li className="homeservice on">
                    <i className="ico-dot big"></i>홈서비스<em>활성</em>
                    <span className="ex">[홈서비스] 서비스 이용 가능 회원입니다.</span>
                  </li>

                  <li className="pricing on">
                    <i className="ico-dot big"></i>프라이싱<em>활성</em>
                    <span className="ex">[프라이싱시스템] 이용 회원입니다.</span>
                  </li>

                  <li className="autoauction">
                    <i className="ico-dot big"></i>오토옥션<em>비활성</em>
                    <span className="ex">[홈서비스] 서비스 이용 가능 회원입니다.</span>
                  </li>
                  
                  <li className="franchise">
                    <i className="ico-dot big"></i>프랜차이즈<em>비활성</em>
                    <span className="ex">[프랜차이즈] 서비스 이용 가능 회원입니다.</span>
                  </li>
                </ul>
              </li>
              <li className="notice">
                <ul>
                  <li>
                    <Link href="#">
                      <a>
                        <em>3</em>
                        <i className="ico-heart-line"></i>
                        <p>홈 서비스<br />예약</p>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>
                        <em>3</em>
                        <i className="ico-note"></i>
                        <p>쪽지</p>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Tooltip placement="bottom" width={394} event="click">
                      <TooltipItem>
                        <Link href="#">
                          <a>
                            <em>3</em>
                            <i className="ico-notice"></i>
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
                              <td>1 건</td>
                            </tr>
                            <tr>
                              <th>비교견적 입찰건수</th>
                              <td>2 건</td>
                            </tr>
                          </tbody>
                        </table>
                      </TooltipCont>
                    </Tooltip>
                  </li>
                </ul>
              </li>
              <li className="save">
                <p className="point">포인트 : <span>3,000</span></p>
                <p className="coupon">쿠폰 : <span>3</span>개</p>
              </li>
            </ul>
            <div className="mypage-menu">
              <ul>
                <li className="none">내차팔기</li>
                <li><Link href=""><a>등록차량 및 광고관리</a></Link></li>
                {
                  memberType === "stop"
                    ? <li><Link href=""><a onClick={(e) => rodalPopupHandler1(e, "fade")}>차량등록</a></Link></li>
                    : <li><Link href=""><a>차량등록</a></Link></li>
                }
                <li><Link href=""><a>나의 설명글 관리</a></Link></li>
                <li><Link href=""><a>홈서비스 예약/판매 현황</a></Link></li>
                <li><Link href=""><a>보증 차량 판매 현황</a></Link></li>
                {
                  memberType === "stop"
                    ? <li><Link href=""><a onClick={(e) => rodalPopupHandler1(e, "fade")}>오토벨 Live Service 예약</a></Link></li>
                    : <li><Link href=""><a>오토벨 Live Service 예약</a></Link></li>
                }
                <li><Link href=""><a>재고관리</a></Link></li>
              </ul>
              <ul>
                <li className="none">내차사기</li>
                <li><Link href=""><a>24시간 실시간 비교견적</a></Link></li>
              </ul>
              <ul>
                <li className="none">오토옥션 이용현황</li>
                <li><Link href=""><a>경매회원 안내</a></Link></li>
                <li><Link href=""><a>경매장 이용현황</a></Link></li>
              </ul>
              <ul className="straight">
                <li><Link href=""><a>프라이싱센터 바로가기</a></Link></li>
              </ul>
              <ul>
                <li className="none">회원정보 관리</li>
                <li><Link href=""><a>회원정보/소개 관리</a></Link></li>
                <li><Link href=""><a>차량 판매 후기 관리</a></Link></li>
                <li><Link href=""><a>딜러정보 관리</a></Link></li>
                <li><Link href=""><a>지점 관리</a></Link></li>
              </ul>
              <ul className="straight">
                <li><Link href=""><a>Live shot 배정 리스트</a></Link></li>
              </ul>
            </div>
          </>
          )
      }
      {
        mode === "guest" && (
          <ul className="mypage-profile guest">
            <li className="visit">
              <Link href="/sell/visitApply">
                <a>
                  <p>방문평가 판매</p>
                  <span>클릭 한 번이면 끝!<br />견적부터 판매까지<br />내 집 앞에서 편하게!</span>
                </a>
              </Link>
            </li>
            <li className="self">
              <Link href="/sell/selfHome">
                <a>
                  <p>셀프등록 판매</p>
                  <span>불편한 흥정은 이제 그만!<br />직접 등록하고 쉽게 견적<br />받으세요!</span>
                </a>
              </Link>
            </li>
            <li className="unassessed">
              <Link href="/sell/freeHome">
                <a>
                  <p>무평가 판매</p>
                  <span>신청완료와 동시에<br />차량 대금 먼저 지급!<br />이제 대금 먼저 받고<br />차량 판매하세요!</span>
                </a>
              </Link>
            </li>
            <li className="join">
              <Link href="/member/memberHome">
                <a>
                  <p>회원가입하기</p>
                  <span>중고차의 모든 것!<br />현대 오토벨에서<br />내차 사고 팔기<br />편리하게 이용하세요!</span>
                </a>
              </Link>
            </li>
          </ul>
        )
      }
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" isMask={true} size="xs" subPop={false}>
        <div className="con-wrap">
          <p>차량광고제한 중에는<br /> 본 서비스를 이용하실 수 없습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </div>
  )
}

export default MypageNavi;