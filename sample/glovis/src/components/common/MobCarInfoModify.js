import { useState, useCallback } from 'react';
import moment from 'moment';
import MobFilterModel from "@src/components/common/MobFilterModel";
import CarOptions from '@src/components/common/CarOptions';
import CheckColors from '@src/components/common/CheckColors';
import Button from '@lib/share/items/Button'
import Input from '@lib/share/items/Input';
import MobBottomArea from "@lib/share/items/MobBottomArea";
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCalendar from "@lib/share/items/MobCalendar";

const MobCarInfoModify = ({callback}) => {

  const [isDate, setIsDate] = useState(moment());
  const [fpFilterModel, setFpFilterModel] = useState(false);
  const [fpCalendar01, setFpCalendar01] = useState(false); // 달력 팝업 (최초등록일)

  const handleFullModelPopup = useCallback((e) => {
    e.preventDefault();
    setFpFilterModel(true);
    // document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);

  const handleCarModelSelect = useCallback(
    (e, deps) => {
      // const newCarCond = Object.assign(
      //   { ...carCond },
      //   {
      //     crNm: `${deps.detailModelNm || ''} ${deps.classNm || ''} ${deps.name || ''}`,
      //     modelInfo: {
      //       crMnfcCd: deps.manufactureId,
      //       crMdlCd: deps.modelId,
      //       crDtlMdlCd: deps.detailModelId,
      //       crClsCd: deps.classId || deps.id,
      //       crDtlClsCd: deps.classId ? deps.id : '',
      //       crMnfcCdNm: deps.manufactureNm,
      //       crMdlCdNm: deps.modelNm,
      //       crDtlMdlCdNm: deps.detailModelNm,
      //       crClsCdNm: deps.classNm || deps.name,
      //       crDtlClsCdNm: deps.classNm ? deps.name : ''
      //     }
      //   }
      // );
      // setCarCond(newCarCond);
      e.preventDefault();
      setFpFilterModel(false);
    },
    []
    // [carCond]
  );
  const calendarCallback = useCallback(
    (e, selectedDate) => {
      e.preventDefault();
      setFpCalendar01(false);
      // const newCarCond = Object.assign({ ...carCond }, { frstRegDt: selectedDate.format('YYYYMMDD') });
      // setCarCond(newCarCond);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    // [carCond]
    []
  );
  const handleCloseFilterModel = useCallback(() => {
    setFpFilterModel(false);
  }, []);
  const handleCloseCalendar = useCallback(() => {
    setFpCalendar01(false);
  }, []);

  const handleClick = (e) => {
    if (callback) callback(e);
  }

  return (
    <>
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
              <td onClick={handleFullModelPopup}>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              {/* <td onClick={handleFullModelPopup}>{carCond.crNm}</td> */}
            </tr>
            <tr>
              <th>차량번호</th>
              <td>12가 3456</td>
            </tr>
            <tr>
              <th>차량연식</th>
              <td>
                <MobSelectBox options={[
                  { id: 'radio1', value: 1, checked: true, disabled: false, label: '2016년' },
                  { id: 'radio2', value: 2, checked: false, disabled: false, label: '2017년' }
                ]} subPop={true} />
              </td>
            </tr>
            <tr>
              <th>배기량</th>
              <td><Input type="text" placeHolder="1,999 cc" id="input-tp1" height={40} /></td>
            </tr>
            <tr>
              <th>신차출고가</th>
              <td><Input type="text" placeHolder="3,851,000원" id="input-tp1" height={40} /></td>
            </tr>
            <tr>
              <th>연료</th>
              <td>
                <MobSelectBox options={[
                  { id: 'radio3', value: 1, checked: true, disabled: false, label: '가솔린+전기' },
                  { id: 'radio4', value: 2, checked: false, disabled: false, label: '가솔린' }
                ]} subPop={true} />
              </td>
            </tr>
            <tr>
              <th>최초등록일</th>
              <td><Input type="text" placeHolder="2019년 4월 19일" id="input-tp1" height={40} /></td>
            </tr>
            <tr>
              <th>주행거리</th>
              <td><Input type="text" placeHolder="3,851,000 km" id="input-tp1" height={40} /></td>
            </tr>
            <tr>
              <th>색상</th>
              <td>
                <MobSelectBox customMode={true} customName="색상" subPop={true}>
                  <div className="inner filter-list-wrap pt0">
                    <CheckColors mode="radio" />
                  </div>
                </MobSelectBox>
              </td>
            </tr>
            <tr>
              <th>옵션</th>
              <td>
                <MobSelectBox customMode={true} isFixButton={false} customName="옵션" subPop={true}>
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

      <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleClick} />
      <div className={fpFilterModel ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCloseFilterModel} />
        <MobBottomArea active={fpFilterModel} className="v-fp" isFixButton={true} zid={101}>
          <MobFilterModel
            result={'yes'}
            kind={'rating'}
            research={'no'}
            callback={handleCarModelSelect}
            // onCarModelSelect={handleCarModelSelect}
            // dataContext={{
            //   manufactureId: carCond.modelInfo.crMnfcCd,
            //   manufactureNm: carCond.modelInfo.crMnfcCdNm,
            //   modelId: carCond.modelInfo.crMdlCd,
            //   modelNm: carCond.modelInfo.crMdlCdNm
            // }}
          />
        </MobBottomArea>
        <div className={fpCalendar01 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCloseCalendar} />
        <MobBottomArea active={fpCalendar01} isFixButton={true} zid={101}>
          {/* <MobCalendar date={getCarFirstRegDate(carCond)} callback={calendarCallback} /> */}
          <MobCalendar date={new Date()} callback={calendarCallback} />
        </MobBottomArea>
    </>
  )
}

export default MobCarInfoModify;