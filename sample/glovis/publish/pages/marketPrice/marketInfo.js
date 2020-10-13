import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarOptions from '@src/components/common/CarOptions';
import Button from '@lib/share/items/Button';
import CheckColors from '@src/components/common/CheckColors';
import Input from '@lib/share/items/Input';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';
import { SECTION_MARKET_PRICE, MOBILE_CONTENT_STYLE } from '@src/actions/types';

// Components (Only Mobile)
import MobSelectBox from '@lib/share/items/MobSelectBox';

const MarketInfo = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량 정보 수정',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap market-view-sec pt14 pb76">
          <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
            <caption>차량 기본 정보</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량명</th>
                <td>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>12가 3456</td>
              </tr>
              <tr>
                <th>차량연식</th>
                <td>
                  <MobSelectBox
                    options={[
                      { id: 'radio1', value: 1, checked: true, disabled: false, label: '2016년' },
                      { id: 'radio2', value: 2, checked: false, disabled: false, label: '2017년' }
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>
                  <Input type="text" placeHolder="1,999 cc" id="input-tp1" height={40} />
                </td>
              </tr>
              <tr>
                <th>신차출고가</th>
                <td>
                  <Input type="text" placeHolder="3,851,000원" id="input-tp1" height={40} />
                </td>
              </tr>
              <tr>
                <th>연료</th>
                <td>
                  <MobSelectBox
                    options={[
                      { id: 'radio3', value: 1, checked: true, disabled: false, label: '가솔린+전기' },
                      { id: 'radio4', value: 2, checked: false, disabled: false, label: '가솔린' }
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>
                  <Input type="text" placeHolder="2019년 4월 19일" id="input-tp1" height={40} />
                </td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>
                  <Input type="text" placeHolder="3,851,000 km" id="input-tp1" height={40} />
                </td>
              </tr>
              <tr>
                <th>색상</th>
                <td>
                  <MobSelectBox customMode={true} customName="색상">
                    <div className="inner filter-list-wrap pt0">
                      <CheckColors mode="radio" />
                    </div>
                  </MobSelectBox>
                </td>
              </tr>
              <tr>
                <th>옵션</th>
                <td>
                  <MobSelectBox customMode={true} isFixButton={false} customName="옵션">
                    <div className="inner car-option pb0">
                      <div className="float-wrap">
                        <h3 className="tit1">옵션</h3>
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="초기화" width={50} />
                      </div>
                      <CarOptions type={1} addOption={true} mode="check" toggle={true} isValue={false} defaultClass="m-toggle-list option" />
                    </div>
                    <Button size="full" background="blue80" title="선택" height={56} />
                  </MobSelectBox>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button className="fixed" size="full" background="blue80" title="확인" />
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

export default MarketInfo;
