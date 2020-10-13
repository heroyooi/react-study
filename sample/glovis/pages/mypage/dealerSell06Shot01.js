import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell06Shot01 = ({ router }) => {
  const { result } = router.query;
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Shot 촬영 예약',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

    return (
      <AppLayout>
        <div className="live-reserve-sec">
          <Steps type={1} contents={['차량정보 입력', '예약정보 입력', '결제하기', '예약완료']} active={1} mode="stick" />
          <div className="popup-reserve">
            <div className="reserve-wrap">
              <p className="tit4 mb8">차량번호 입력</p>
              <Input type="text" placeHolder="차량번호를 입력해주세요.(예: 12가1234)" />
              <Button size="full" background="blue80" title="조회" radius={true} height={38} marginTop={8} />
            </div>
          </div>

          <div className="content-wrap pt24">
            <p className="tit4 mb16">차량 기본정보</p>
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap">
                    <p className="list-none">차량조회 후 진행하실 수 있습니다.</p>
                  </div>
                ) : (
                  <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 기본 정보</caption>
                    <colgroup>
                      <col width="27%" />
                      <col width="23%" />
                      <col width="23%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="3">08라 4567</td>
                      </tr>
                      <tr>
                        <th>차량명</th>
                        <td colSpan="3">기아 K3 쿱 1.6 터보 GDI 프레스티지 K3 2DR 1.6 T / GDI 프레스티지 M/T</td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td colSpan="3">2016</td>
                      </tr>
                      <tr>
                        <th>형식년도</th>
                        <td>2016</td>
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
                        <td colSpan="3">준중형차</td>
                      </tr>
                    </tbody>
                  </table>
                )
            }
          </div>
        </div >
        <Buttons align="center" className="full fixed">
          <Button size="full" background="blue20" color="blue80" title="취소" height={56} />
          <Button size="full" background="blue80" title="다음" height={56} href="/mypage/dealerSell06Shot02" />
        </Buttons>
      </AppLayout >
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(DealerSell06Shot01);