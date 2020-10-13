import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { select_day_list, select_month_list, select_year_list, mobile_select_year, mobile_select_month, mobile_select_day } from '@src/dummy';
import MobSelectList from '@lib/share/items/MobSelectList';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';
import moment from 'moment';

const today = new Date();
const yearOption = [];
for (let start = 2015, end = 2030; start <= end; start++) {
  yearOption.push({
    value: start.toString(),
    id: start.toString(),
    name: 'signYear',
    label: `${start}년`
  });
}

const monthOption = [];
for (let start = 1, end = 12; start <= end; start++) {
  monthOption.push({
    value: start.toString().padStart(2, '0'),
    id: start.toString().padStart(2, '0'),
    name: 'signMonth',
    label: `${start}월`
  });
}

let dayOption = [];
const setDay = (year, month) => {
  const newDayOption = [];
  const end = new Date(year, month, 0).getDate();

  for (let start = 1; start <= end; start++) {
    newDayOption.push({
      value: start.toString().padStart(2, '0'),
      id: start.toString().padStart(2, '0'),
      name: 'signDay',
      label: `${start}일`
    });
  }
  dayOption = newDayOption;
};

/*
  html 변경이력
  03.16 : datetime -> dateTime  속성값 대소문자 변경
*/
/**
 * 수정: D191379
 * PC viewer 부분만 변경
 * @param {perfData} perfData 성능점검 조회 데이터
 */
const CarSignature = ({ perfData, isAllow = false, onSignatureChange, mode = 'apply' }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer

  const [perfInsertDate, setPerfInsertDate] = useState(() => {
    const date = perfData?.perfInsDt || moment(today).format('YYYYMMDD');

    console.log('CarSignature -> perfData?.perfInsDt ', perfData?.perfInsDt);
    console.log('CarSignature -> today ', today);

    const YYYY = date.substring(0, 4);
    const MM = date.substring(4, 6);
    const DD = date.substring(6, 8);

    setDay(YYYY, MM);
    return {
      signYear: YYYY,
      signMonth: MM,
      signDay: DD
    };
  });
  /* 모바일, PC 둘다 오류로 주석처리합니다. */
  // const handleDateChanged = useCallback(
  //   (e, deps) => {
  //     const { name, value } = deps;
  //     console.log('deps', deps);
  //     if (name !== 'signDay') {
  //       const newData = {
  //         ...perfInsertDate,
  //         signDay: '01',
  //         [name]: value
  //       }
  //       setPerfInsertDate(newData);
  //       onSignatureChange({
  //         target: {
  //           name: 'perfInsDt',
  //           value: newData['signYear'] + newData['signMonth'] + newData['signDay'],
  //         }
  //       })
  //     } else {
  //       const newData = {
  //         ...perfInsertDate,
  //         [name]: value
  //       }
  //       setPerfInsertDate(newData);
  //       onSignatureChange({
  //         target: {
  //           name: 'perfInsDt',
  //           value: newData['signYear'] + newData['signMonth'] + newData['signDay'],
  //         }
  //       })
  //     }
  //   },
  //   // [carCond]
  //   [perfInsertDate]
  // );

  const handleDateChanged = useCallback(
    (e, deps) => {
      const { name, value } = deps;
      console.log('deps', deps);
      if (name !== 'signDay') {
        const newData = {
          ...perfInsertDate,
          signDay: '01',
          [name]: value
        };
        setPerfInsertDate(newData);
        if (onSignatureChange) {
          onSignatureChange({
            target: {
              name: 'perfInsDt',
              value: newData['signYear'] + newData['signMonth'] + newData['signDay']
            }
          });
        }
      } else {
        const newData = {
          ...perfInsertDate,
          [name]: value
        };
        setPerfInsertDate(newData);
        if (onSignatureChange) {
          onSignatureChange({
            target: {
              name: 'perfInsDt',
              value: newData['signYear'] + newData['signMonth'] + newData['signDay']
            }
          });
        }
      }
    },
    // [carCond]
    [perfInsertDate]
  );

  const onChangeDate = (option, target) => {
    const { value } = option;
    const { name } = target;

    if (name !== 'signDay') {
      const newData = {
        ...perfInsertDate,
        signDay: '01',
        [name]: value
      };
      setPerfInsertDate(newData);
      onSignatureChange({
        target: {
          name: 'perfInsDt',
          value: newData['signYear'] + newData['signMonth'] + newData['signDay']
        }
      });
    } else {
      const newData = {
        ...perfInsertDate,
        [name]: value
      };
      setPerfInsertDate(newData);
      onSignatureChange({
        target: {
          name: 'perfInsDt',
          value: newData['signYear'] + newData['signMonth'] + newData['signDay']
        }
      });
    }
  };

  useEffect(() => {
    setDay(perfInsertDate.signYear, perfInsertDate.signMonth);

    const dateText = Object.keys(perfInsertDate).reduce((text, date, i) => {
      if (i !== 0) text += '';
      return (text += perfInsertDate[date]);
    }, '');
    /* 모바일, PC 오류로 주석처리합니다. */
    //onChange(dateText, target, 'perfInsDt');
    // onSignatureChange({
    //   target: {
    //     name: 'perfInsDt',
    //     value: dateText
    //   }
    // });
  }, [perfInsertDate]);

  useEffect(() => {
    setPerfInsertDate(() => {
      const date = perfData?.perfInsDt || moment(today).format('YYYYMMDD');
      const YYYY = date.substring(0, 4);
      const MM = date.substring(4, 6);
      const DD = date.substring(6, 8);

      setDay(YYYY, MM);
      return {
        signYear: YYYY,
        signMonth: MM,
        signDay: DD
      };
    });
  }, [perfData]);

  const dateFormat = (data) => {
    if (data) {
      let dt = data.replace(/\s/gi, '');
      dt = dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');
      return dt;
    }
    return '';
  };

  console.log(perfInsertDate.signYear);

  return (
    <>
      {isMode === 'apply' &&
        (!hasMobile ? (
          <fieldset>
            <div className="signature">
              <h4>서명</h4>
              <div className="management-law-agree">
                <p>
                  자동차관리법 제 58조 및 같은 법 시행규칙 제 120조에 따라 ( <CheckBox id="chk-register3" checked={isAllow} name="isAllow" />
                  중고자동차성능 상태를 점검 )하였음을 확인합니다.
                </p>
                <SelectBox id="vin-number2-1" className="items-sbox" options={select_year_list} placeHolder="2019년" width={157} height={40} />
                <SelectBox id="vin-number2-2" className="items-sbox" options={select_month_list} placeHolder="7월" width={157} height={40} />
                <SelectBox id="vin-number2-3" className="items-sbox" options={select_day_list} placeHolder="25일" width={157} height={40} />
              </div>
              <div className="management-law-sign">
                <p>
                  중고자동차 성능 · 상태 점검자
                  <Input type="text" id="calculated23" disabled={true} placeHolder="오토벨자동차정비" width={334} height={40} />
                  (인)
                </p>
                <p>
                  중고자동차 성능 · 상태 고지자
                  <Input type="text" id="calculated24" disabled={true} placeHolder="(주)현대오토" width={334} height={40} />
                  자동차 매매업소 (인)
                </p>
              </div>

              <div className="agree-terms-wrap mt40">
                <CheckBox id="chk-agree" title="매물등록 규정 확인" />
                <div className="terms-wrap">내용</div>
              </div>
            </div>
          </fieldset>
        ) : (
          <div className="inspection-confirm-apply">
            <table className="table-tp2 th-none">
              <caption className="away">서명</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tit2 mb16">서명</p>
                    <p className="tx-tp2 mb16">
                      자동차관리법 제 58조 및 같은 법 시행규칙 제 120조에 따라 ( <CheckBox id="chk-register3" checked={isAllow} onChange={onSignatureChange} name="isAllow" />{' '}
                      <span className="tx-black">중고자동차성능 · 상태를 점검</span> ) 하였음을 확인합니다.
                    </p>
                    <MobSelectList
                      width="30%"
                      itemsSource={yearOption}
                      selectedItem={findLabelValue(yearOption, perfInsertDate.signYear)}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      subPop={true}
                      onClick={handleDateChanged}
                    />
                    <span className="ml8">
                      <MobSelectList
                        width="20%"
                        itemsSource={monthOption}
                        selectedItem={findLabelValue(monthOption, perfInsertDate.signMonth)}
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        subPop={true}
                        onClick={handleDateChanged}
                      />
                    </span>
                    <span className="ml8">
                      <MobSelectList
                        width="20%"
                        itemsSource={dayOption}
                        selectedItem={findLabelValue(dayOption, perfInsertDate.signDay)}
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        subPop={true}
                        onClick={handleDateChanged}
                      />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tit2 mb16">중고자동차 성능 · 상태 고지자</p>
                    <Input type="text" name="sttChckr" placeHolder="오토벨자동차정비" value={perfData?.sttChckr} id="input-tp2-1" width="85%" onBlur={onSignatureChange} />
                    <span className="bridge">(인)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tit2 mb16">중고자동차 성능 · 상태 고지자</p>
                    <Input type="text" name="sttNtc" placeHolder="(주)현대오토" value={perfData?.sttNtc} id="input-tp2-2" width="60%" onBlur={onSignatureChange} />
                    <span className="bridge">자동차 매매업소(인)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      {isMode === 'viewer' &&
        (!hasMobile ? (
          <fieldset>
            <div className="signature viewer">
              <p className="tx-tit">
                「자동차관리법」제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 <span>중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</span>
              </p>
              <span className="tx-sub">{dateFormat(perfData?.perfInsDt)}</span>
              <div className="sign">
                <p>
                  중고자동차 성능 · 상태 점검자<span>{perfData?.sttChckr}</span>(인)
                </p>
                <p>
                  중고자동차 성능 · 상태 고지자<span>{perfData?.sttNtc}</span>(인)
                </p>
              </div>
            </div>
          </fieldset>
        ) : (
          <div className="inspection-confirm">
            <p>
              자동차관리법」 제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 <strong>중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</strong>
            </p>
            <time dateTime="2019-08-02">{dateFormat(perfData?.perfInsDt)}</time>
            <table className="signature">
              <caption>서명</caption>
              <tbody>
                <tr>
                  <th scope="row">중고자동차 성능 · 상태 점검자</th>
                  <td>
                    <strong>{perfData?.sttChckr}</strong> (인)
                  </td>
                </tr>
                <tr>
                  <th scope="row">중고자동차 성능 · 상태 고지자</th>
                  <td>
                    <strong>{perfData?.sttNtc}</strong> (인)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
};

export default CarSignature;
