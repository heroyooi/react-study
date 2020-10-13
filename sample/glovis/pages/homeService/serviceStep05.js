import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import Steps from '@lib/share/items/Steps';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceStep05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={5} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2"> 
              홈서비스 신청완료
              <p>이용해주셔서 감사합니다.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="service-car-info">
              <div className="img-wrap">
                <img src="/images/mobile/dummy/service-car-img.png" alt="홈서비스 차량 이미지" />
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1 mb24">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="22.5%" />
                  <col width="27.5%" />
                  <col width="22.5%" />
                  <col width="27.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량명</th>
                    <td colSpan="4">벤츠 E-클래스 W213 E200 아방가르드</td>
                  </tr>
                  <tr>
                    <th>금액</th>
                    <td colSpan="4">1,234만원</td>
                  </tr>
                  <tr>
                    <th>차량번호</th>
                    <td colSpan="4">12가 3456</td>
                  </tr>
                  <tr>
                    <th>차량연식</th>
                    <td>2016</td>
                    <th>연료</th>
                    <td>디젤</td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td>4,380km</td>
                    <th>배기량</th>
                    <td>1,999cc</td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td>오토</td>
                    <th>차종</th>
                    <td>RV</td>
                  </tr>
                  <tr>
                    <th>사고유무</th>
                    <td>무사고</td>
                    <th>색상</th>
                    <td>검정</td>
                  </tr>
                  <tr>
                    <th>압류저당</th>
                    <td>무</td>
                    <th>제시번호</th>
                    <td>21363842</td>
                  </tr>
                </tbody>
              </table>
              <table summary="결제정보에 대한 내용" className="table-tp1 td-r mb16">
                <caption>결제정보</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td>1,000,000원</td>
                  </tr>
                  <tr>
                    <th>이전 관리비</th>
                    <td>198,000원</td>
                  </tr>
                  <tr>
                    <th>EW 상품비</th>
                    <td>22,000원</td>
                  </tr>
                  <tr>
                    <th>배송비</th>
                    <td>2,000,000원</td>
                  </tr>
                  <tr>
                    <th className="tx-b">총 결제 금액</th>
                    <td><span className="price">1,325,000</span>원</td>
                  </tr>
                </tbody>
              </table>
              <table summary="결제방식에 대한 내용" className="table-tp1">
                <caption className="away">결제방식</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="67%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>결제방식</th>
                    <td>할부+계좌이체 (이체 금액 1,000원)</td>
                  </tr>
                  <tr>
                    <th>신청일</th>
                    <td>2019.09.04</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp5 fs14">신청현황은 마이페이지에서 확인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
        <Buttons align="center" className="full" marginTop={32}>
          <Button size="big" background="blue20" color="blue80" title="마이페이지" />
          <Button size="big" background="blue80" title="확인" />
        </Buttons>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg"></i>
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={5} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>홈서비스 신청완료</h4>
          <p>이용해주셔서 감사합니다.</p>
        </div>
        <div className="service-detail">
          <div className="tit-wrap">
            <h5>벤츠 E-클래스 W213 E200 아방가르드</h5>
          </div>
          <div className="service-car-info">
            <div className="img-wrap">
              <img src="/images/dummy/service-car-img.png" alt="홈서비스 차량 이미지" />
            </div>
            <table summary="홈서비스 차량 정보에 대한 내용" className="table-tp1">
              <caption className="away">홈서비스 차량 정보</caption>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>00아0000</td>
                  <th>연료</th>
                  <td>디젤</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>2019년 03월</td>
                  <th>배기량</th>
                  <td>2500cc</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>9,652 km</td>
                  <th>차종</th>
                  <td>RV</td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>오토</td>
                  <th>색상</th>
                  <td>검정</td>
                </tr>
                <tr>
                  <th>사고유무</th>
                  <td>무사고</td>
                  <th>압류/저당</th>
                  <td>무</td>
                </tr>
                <tr>
                  <th>제시번호</th>
                  <td>21363842937</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c service-payment mt64">
            <caption>결제 정보</caption>
            <colgroup>
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan="2">차량가격</th>
                <th colSpan="3">이전관리비
                  <Tooltip placement="bottom" width={514} event="click">
                    <TooltipItem>
                      <i className="ico-question"></i>
                    </TooltipItem>
                    <TooltipCont>
                      <div className="transfer-cost">
                        <p>중고차 이전비는 아래와 같은 항목으로 구성됩니다.</p>
                        <div className="service-notify">
                          <p><i className="ico-dot sml"></i> 취등록세: 차량 취득에 부과되는 취득세와 등록을 위해 부과되는 등록세, 공채매입을 위한 공채매입비로 이루어집니다.</p>
                          <p><i className="ico-dot sml"></i> 차량관리비: 차량을 보관한 중고차 상사에게 납부하는 비용입니다.</p>
                          <p><i className="ico-dot sml"></i> 이전대행료: 등록신청대행에 소요되는 실제비용입니다.</p>
                        </div>
                      </div>
                    </TooltipCont>
                  </Tooltip>
                </th>
                <th rowSpan="2">EW 상품비</th>
                <th rowSpan="2">배송비</th>
                <th rowSpan="2">총 결제 금액</th>
              </tr>
              <tr>
                <th>취등록세</th>
                <th>차량관리비</th>
                <th>이전대행료</th>
              </tr>
              <tr>
                <td>
                  <p className="price-tp4 tx-gray">37,500,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">2,970,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">198,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">22,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">110,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">150,000<span className="won">원</span></p>
                </td>
                <td>
                  <p className="price-tp4">41,206,500<span className="won">원</span></p>
                </td>
              </tr>
            </tbody>
          </table>
          <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c">
            <caption className="away">결제 정보</caption>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제 방식</th>
                <th>신청일</th>
              </tr>
              <tr>
                <td>할부 + 계좌이체 (이체금액 1,000원)</td>
                <td>2019.09.04</td>
              </tr>
            </tbody>
          </table>
          <div className="service-notify">
            <p className="tx-exp-tp5">* 신청현황은 마이페이지에서 확인하실 수 있습니다.</p>
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <Button size="big" line="black" title="마이페이지" width={180} height={60} href="/mypage/generalBuy04" />
          <Button size="big" background="blue80" title="확인" width={180} height={60} href="/main" />
        </Buttons>
        <div className="service-banner">

        </div>
      </div>
    </AppLayout>
  )
}

export default ServiceStep05