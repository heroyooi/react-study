import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import InputFile from '@lib/share/items/InputFile';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';
import { car_list4, mCarList, mCarList2, m_radio_guaranteed, m_radio_contractor, m_mobile_number_list, mobile_select_area, textDummy } from '@src/dummy';

const ysTest = () => {
  const dispatch = useDispatch();
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: 'Test',
      options: ['back']
    }
  });
  return (
    <AppLayout>
      <div className="general-sell-sec">
        <p className="ask-tx">평가사 배정 후에 차량 정보를<br />확인하실 수 있습니다.</p>

        <div className="table-area">
          <ul className="m-toggle-list up-blue fs16">
            <MenuItem>
              <MenuTitle>진행현황<span>신청완료</span></MenuTitle>
              <MenuCont>
                <ul className="pay-detail">
                  <li className="tx-blue80">
                    <span className="title">1.신청완료</span>
                    <span className="sub">방문평가 신청이<br />완료되었습니다.</span>
                  </li>
                  <li>
                    <span className="title">2.평가사 배정</span>
                    <span className="sub">담당 평가사가<br />배정되었습니다.</span>
                  </li>
                  <li>
                    <span className="title">3.방문 및 견적안내</span>
                    <span className="sub">고객님께 방문하여 차량 확인 후<br />견적 안내를 도와드립니다.</span>
                  </li>
                  <li>
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
                <h4 className="tit2">차량 정보</h4>
                <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} />
              </div>
              <p className="list-none">평가사가 배정 후에 확인 가능합니다.</p>
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
                    <td className="tx-lg">평가사 방문 후에 확인 가능합니다.</td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td>
                      <span className="bridge2">
                        <MobSelectBox options={[
                          { id: 'bank1', value: 1, checked: true, disabled: false, label: '신한은행' },
                          { id: 'bank2', value: 2, checked: false, disabled: false, label: '기업은행' },
                          { id: 'bank3', value: 3, checked: false, disabled: false, label: '국민은행' },
                          { id: 'bank4', value: 4, checked: false, disabled: false, label: '농협은행' }
                        ]} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} placeHolder="계좌번호 (‘-‘없이 숫자만)" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} placeHolder="예금주" width='63%' />
                        <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={34.5} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <h4 className="tit2 mb16">담당 평가사</h4>
              <p className="list-none">평가사 배정 후에 확인 가능합니다.</p>
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

export default ysTest;