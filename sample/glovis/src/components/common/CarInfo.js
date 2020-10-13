import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import DatePicker from '@src/components/common/calendar/DatePicker';//#a2
import moment from 'moment';//#a2
import { select_day_list } from '@src/dummy';

/*
html 변경이력
03.12 : 출고가격 -> 원동기 형식, 가격산정 기준가격 행이 삭제  #a1 부분 참고
03.12 : DataPicker로 변경 #a2 부분 참고
*/
const CarInfo = ({ mode = "apply" }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer
  const now = moment(); //#a2

  return (
    <>
      {
        isMode === "apply" &&
        <fieldset>
          <legend className="away">자동차 기본 정보</legend>
          <table summary="자동차 기본 정보에 대한 내용" className="table-tp1 input">
            <caption>자동차 기본 정보</caption>
            <colgroup>
              <col width="15%" />
              <col width="27%" />
              <col width="15%" />
              <col width="43%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차명</th>
                <td>기아 더 뉴 K7 3.0 GDI 프레스티지</td>
                <th>차량등록번호</th>
                <td>60가4397</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>2015년 </td>
                <th>검사유효년도</th>
                <td>
                  {/* #a2 DataPicker로변경start */}
                  <DatePicker defaultValue={now} inputWidth={150} inputHeight={48} disabled={true} />
                  <em className="mg8">~</em>
                  <DatePicker defaultValue={now} inputWidth={150} inputHeight={48} disabled={true} />
                   {/* #a2 DataPicker로변경end */}

                  {/* <Input type="text" id="note1" placeHolder="20180504" width={123} height={40} />
                  <em className="mg8">-</em>
                  <Input type="text" id="valid-year-until" placeHolder="20180504" width={123} height={40} /> */}
                </td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>
                  <em className="mr8">2015년 05월</em>                   
                  <SelectBox id="register-date" className="items-sbox" options={select_day_list} width={100} height={40} />
                </td>
                <th>변속기종류</th>
                <td>오토</td>
              </tr>
              <tr>
                <th>사용연료</th>
                <td>가솔린</td>
                <th>차대번호</th>
                <td><Input type="text" id="vin-number" height={40} /></td>
              </tr>
              <tr>
                <th>보증유형</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'assure1', value: 1, checked: true, disabled: false, title: '자가보증' },
                    { id: 'assure2', value: 2, checked: false, disabled: false, title: '보험사보증' }
                  ]} />
                </td>
                <th>원동기 형식</th>{/* #a1 타이틀 수정 */}
                <td><Input type="text" id="release-price" height={40} /></td>
              </tr>
              {/* #a1 행삭제 start */}
              {/* <tr>
                <th>가격산정 기준가격</th>
                <td>
                  <Input type="text" id="criteria-price1" width={160} height={40} />
                  <em>만원</em>
                </td>
                <th></th>
                <td></td>
              </tr> */}
              {/* #a1 행삭제 end */}
            </tbody>
          </table>
        </fieldset>
      }
      {
        isMode === "viewer" && (
          !hasMobile
            ? (
              <fieldset>
                <table summary="자동차 기본정보에 대한 내용" className="table-tp1">
                  <caption>제 1519006659호</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="27%" />
                    <col width="15%" />
                    <col width="43%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차명</th>
                      <td>기아 더 뉴 K7 (12년~16년) 3.0 GDI<br />프레스티지</td>
                      <th>차량등록번호</th>
                      <td>60가 4397</td>
                    </tr>
                    <tr>
                      <th>연식</th>
                      <td>2015년</td>
                      <th>검사유효기간</th>
                      <td>20180504 ~ 20200503</td>
                    </tr>
                    <tr>
                      <th>최초등록일</th>
                      <td>2015년 05월04일</td>
                      <th>변속기종류</th>
                      <td>자동</td>
                    </tr>
                    <tr>
                      <th>사용연료</th>
                      <td>가솔린</td>
                      <th>차대번호</th>
                      <td>KNAME81ABGS169872</td>
                    </tr>
                    <tr>
                      <th>보증유형</th>
                      <td>자가보증</td>
                      <th>원동기형식</th>
                      <td>D4HB</td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            ) : (  
              <div className="accident-history-cont">
                <table summary="자동차 기본정보" className="table-tp1">
                  <caption className="away">자동차 기본정보</caption>
                  <colgroup>
                    <col width="35%" />
                    <col width="65%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차명</th>
                      <td>기아 더 뉴 K7 3.0 GDI 프레스티지</td>
                    </tr>
                    <tr>
                      <th>차량등록번호</th>
                      <td>23다 4567</td>
                    </tr>
                    <tr>
                      <th>연식</th>
                      <td>2019</td>
                    </tr>
                    <tr>
                      <th>검사유효기간</th>
                      <td>2019.01.24 ~ 2033.01.23</td>
                    </tr>
                    <tr>
                      <th>최초등록일</th>
                      <td>2019.01.24</td>
                    </tr>
                    <tr>
                      <th>차대번호</th>
                      <td>KMTG341ABKU123456</td>
                    </tr>
                    <tr>
                      <th>변속기종류</th>
                      <td>자동</td>
                    </tr>
                    <tr>
                      <th>사용연료</th>
                      <td>가솔린</td>
                    </tr>
                    <tr>
                      <th>보증유형</th>
                      <td>자가보증</td>
                    </tr>
                    <tr>
                      <th>원동기형식</th>
                      <td>D4HB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
        )
      }
    </>
  )
}

export default CarInfo;