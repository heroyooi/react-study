import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideCarDetail from '@src/components/common/SlideCarDetail';
import Button from '@lib/share/items/Button'
import Buttons from '@lib/share/items/Buttons';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { mCarList } from '@src/dummy';

const PricingAuctionInfo = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매정보 상세',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
       <SlideCarDetail car_gallery={mCarList} />
        <div className="content-wrap">
          <Buttons align="center" marginTop={20}>
            <Button size="big" line="gray" radius={true} title="성능점검표" fontWeight={500} width={48} measure={'%'} href="/pricingSystem/pricingPerformance" />
            <Button size="big" line="red60" color="red60" radius={true} title="사고이력조회" fontWeight={500} width={48} measure={'%'} marginLeft={4} mgMeasure={'%'} href="/pricingSystem/pricingAccidentHistory" />
          </Buttons>
          <table summary="경매정보 상세에 대한 내용" className="table-tp1 mt32">
            <caption className="away">경매정보 상세입니다.</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>거점</th>
                <td>분당</td>
              </tr>
              <tr>
                <th>판매일</th>
                <td>2019-11-05</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>2016년</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2018-03-30</td>
              </tr>
              <tr>
                <th>미션</th>
                <td>A/T</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>디젤</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>NU9)그랑블루</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>2,199 cc</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>52,333 km</td>
              </tr>
              <tr>
                <th>소유</th>
                <td>법인상품</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>법인</td>
              </tr>
              <tr>
                <th>평가</th>
                <td>A6</td>
              </tr>
              <tr>
                <th>수출항목</th>
                <td>X</td>
              </tr>
              <tr>
                <th>시작가</th>
                <td>2,240 만원</td>
              </tr>
              <tr>
                <th>낙찰가</th>
                <td>2,240 만원</td>
              </tr>
              <tr>
                <th>옵션</th>
                <td>ABS VDC 스마트키 내비(일반)</td>
              </tr>
              <tr>
                <th>특이사항</th>
                <td>스탭몰딩블랑, 실내오염, 엔진오일누유/이음, 터브/ps이음</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default PricingAuctionInfo;
