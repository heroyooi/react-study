import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarOptions from '@src/components/common/CarOptions';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell05_02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량등록',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap pt20">
          <h3 className="tit2 mb16">차량 기본 정보</h3>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="23%" />
              <col width="23%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td colSpan="3">47러0383</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td colSpan="3">현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2016</td>
                <th>형식년도</th>
                <td>2018</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>검정</td>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>1,591 cc</td>
                <th>차종</th>
                <td>대형차</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>일반</td>
                <th>출고가격</th>
                <td>20,700만원</td>
              </tr>
            </tbody>
          </table>
          <CarOptions className="mt32" />
        </div>
        <p className="ask-tx mt16">
          해당 정보는 실제 정보와 상이할 수 있습니다.<br />
          다음 단계에서 차량정보를 수정하세요.<br />
          해당 차량을 판매 차량으로 신청하시겠습니까?
        </p>
        <Button className="fixed" size="full" background="blue80" title="신청하기" href="/mypage/dealerSell05_03" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>보증차량 판매정보 등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', 'EW정보입력', '등록완료']} active={1} />
          </div>

          <form className="register-form">
            <fieldset>
              <legend className="away">차량 정보 조회</legend>
              <table summary="차량 기본 정보에 대한 내용" className="table-tp1 mt80">
                <caption>차량 기본 정보</caption>
                <colgroup>
                  <col width="13%" />
                  <col width="27%" />
                  <col width="13%" />
                  <col width="47%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>01가1234</td>
                    <th>차량명</th>
                    <td>
                      <span className="car-name">기아 K3 쿱 1.6 터보 GDI 프레스티지<span>K3 2DR 1.6T / GDI 프레스티지 M/T</span></span>
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>2017-05-07</td>
                    <th>형식년도</th>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>검정</td>
                    <th>연료</th>
                    <td>가솔린</td>
                  </tr>
                  <tr>
                    <th>배기량</th>
                    <td>1,591cc</td>
                    <th>차종</th>
                    <td>준중형차</td>
                  </tr>
                  <tr>
                    <th>용도</th>
                    <td>일반</td>
                    <th>출고가격</th>
                    <td>20,700,000원</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CarOptions title="기본 옵션" type={2} more={true} />
          </form>
          <p className="ask-tx">
            해당 정보는 실제 정보와 상이할 수 있습니다. 다음 단계에서 차량정보를 수정하세요.<br />
            해당 차량을 판매 차량으로 신청하시겠습니까?
          </p>
          <Buttons align="center">
            <Button size="big" background="gray" title="취소" width={200} height={60} />
            <Button size="big" background="blue80" title="확인" width={200} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
          </Buttons>
        </div>
      </div>

      {/* <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>해당 차량번호로 조회된 차량정보가 없습니다.<br />차량정보를 직접 등록하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="직접등록" width={130} />
          </Buttons>
        </div>
      </RodalPopup> */}
    </AppLayout>
  )
}

export default DealerSell05_02