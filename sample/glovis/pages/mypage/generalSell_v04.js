import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import MenuItem from '@lib/share/menu/MenuItem'
import MenuTitle from '@lib/share/menu/MenuTitle'
import MenuCont from '@lib/share/menu/MenuCont'

const GeneralSell_v04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '방문평가 신청 내역',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 8,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="general-sell-sec">
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
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <div className="table-area content-border">
            <ul className="m-toggle-list up-blue fs16">
              <MenuItem>
                <MenuTitle>진행현황<span>판매완료</span></MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li>
                      <span className="title">1.신청완료</span>
                      <span className="sub">방문평가 신청이<br />완료되었습니다.</span>
                    </li>
                    <li >
                      <span className="title">2.평가사 배정</span>
                      <span className="sub">담당 평가사가<br />배정되었습니다.</span>
                    </li>
                    <li>
                      <span className="title">3.방문 및 견적안내</span>
                      <span className="sub">고객님께 방문하여 차량 확인 후<br />견적 안내를 도와드립니다.</span>
                    </li>
                    <li className="tx-blue80">
                      <span className="title">4.견적 완료 및 판매결정</span>
                      <span className="sub">차량 판매 여부를<br />결정해주세요.</span>
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul>
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2 fl">차량 정보</h4>
                </div>
                <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="24%" />
                    <col width="23.5%" />
                    <col width="25.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>최초등록일</th>
                      <td colSpan="3">2017-05-07</td>
                    </tr>
                    <tr>
                      <th>형식년도</th>
                      <td>2018</td>
                      <th>색상</th>
                      <td>검정</td>
                    </tr>
                    <tr>
                      <th>연료</th>
                      <td>가솔린</td>
                      <th>배기량</th>
                      <td>1,591 cc</td>
                    </tr>
                    <tr>
                      <th>차종</th>
                      <td>대형차</td>
                      <th>용도</th>
                      <td>일반</td>
                    </tr>
                    <tr>
                      <th>출고가격</th>
                      <td colSpan="3">20,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">차량 견적</h4>
                <table summary="차량 견적에 대한 내용" className="table-tp1">
                  <caption className="away">차량 견적</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>견적</th>
                      <td><p className="price-tp5">1,950<span className="won">만원</span></p>(판매완료)</td>
                    </tr>
                    <tr>
                      <th>계좌번호</th>
                      <td>국민 101010-10-101010<br />(예금주: 김현대)</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">담당 평가사</h4>
                <table summary="담당 평가사 정보에 대한 내용" className="table-tp1">
                  <caption className="away">담당 평가사</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>홍길동</td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>010-1234-1234</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">계약자 정보</h4>
                <table summary="계약자 정보에 대한 내용" className="table-tp1">
                  <caption className="away">계약자 정보</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>명의자</th>
                      <td>김현대</td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td>010-1234-1234</td>
                    </tr>
                    <tr>
                      <th>거주지역</th>
                      <td>서울시 강남구</td>
                    </tr>
                    <tr>
                      <th>고객방문 주소</th>
                      <td className="tx-lg">등록되지 않았습니다</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td className="tx-lg">등록되지 않았습니다</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default GeneralSell_v04;