import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell05_04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment();

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '판매정보입력',
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
    return (
      <AppLayout>
        <Steps mode="stick" type={1} contents={['차량정보 입력', 'EW 정보 입력', '등록완료']} active={2} />
        <div className="content-wrap">
          <table summary="EW 정보 입력에 대한 내용" className="table-tp1 ew">
            <caption className="away">EW 정보 입력</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>47러0383</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>판매일</th>
                <td><DatePicker defaultValue={now} width='100%' /></td>
              </tr>
              <tr>
                <th>고객명</th>
                <td><Input type="text" placeHolder="고객명을 입력해주세요" id="input-tp4" width='100%' /></td>
              </tr>
              <tr>
                <th>보증상품명</th>
                <td><MobSelectBox options={[
                  { id: 'radio1', value: 1, checked: true, disabled: false, label: '오토벨 EW Lv. 1' },
                  { id: 'radio2', value: 2, checked: false, disabled: false, label: '오토벨 EW Lv. 2' },
                  { id: 'radio3', value: 2, checked: false, disabled: false, label: '보증없음' }
                ]} width='100%' /></td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>
                  {/* lv.1 선택시 */}
                  <span className="price">110,000</span>원

                  {/* lv.2 선택시 */}
                  {/* <span className="price">220,000</span>원 */}

                  {/* lv.3 선택시 - 없음 */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="full" background="blue20" color="blue80" title="이전" height={56} href="/mypage/dealerSell05_03" />
          <Button size="full" background="blue80" title="다음" height={56} href="/mypage/dealerSell05_05" />
        </Buttons>
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
            <Steps type={2} contents={['차량정보조회/입력', 'EW정보입력', '등록완료']} active={2} />
          </div>

          <form className="register-form">
            <fieldset>
              <legend className="away">EW 판매 정보</legend>
              <table summary="EW 판매 정보에 대한 내용" className="table-tp1 input mt80">
                <caption>EW 판매 정보</caption>
                <colgroup>
                  <col width="13%" />
                  <col width="37%" />
                  <col width="13%" />
                  <col width="37%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>
                      <label htmlFor="car-num" className="hide">차량번호</label>
                      <Input type="text" value="47러0383" id="car-num" width={160} height={40} />
                    </td>
                    <th>차량명</th>
                    <td>기아 K3 쿱 터보 GDI 프레스티지</td>
                  </tr>
                  <tr>
                    <th>판매일</th>
                    <td>
                      <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    </td>
                    <th>고객명</th>
                    <td>
                      <label htmlFor="customer-name" className="hide">고객명</label>
                      <Input type="text" value="한기아" id="customer-name" width={160} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>보증상품명</th>
                    <td>
                      <SelectBox id="product-name" className="items-sbox" options={select1_list} width={160} height={40} placeHolder="오토벨 EW Lv.1" />
                    </td>
                    <th>상품금액</th>
                    <td>110,000원</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell05_04