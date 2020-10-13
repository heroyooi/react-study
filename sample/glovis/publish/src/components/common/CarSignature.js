import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input'
import CheckBox from '@lib/share/items/CheckBox'
import SelectBox from '@lib/share/items/SelectBox'
import { select_day_list, select_month_list, select_year_list } from '@src/dummy'
/*
  html 변경이력
  03.16 : datetime -> dateTime  속성값 대소문자 변경
*/

const CarSignature = ({ mode = "apply" }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer

  return (
    <>
      {
        isMode === "apply" &&
        <fieldset>
          <div className="signature">
            <h4>서명</h4>
            <div className="management-law-agree">
              <p>
                자동차관리법 제 58조 및 같은 법 시행규칙 제 120조에 따라
                ( <CheckBox id='chk-register3' checked={true} />중고자동차성능 상태를 점검 )하였음을 확인합니다.
              </p>
              <SelectBox id="vin-number2-1" className="items-sbox" options={select_year_list} placeHolder="2019년" width={157} height={40} />
              <SelectBox id="vin-number2-2" className="items-sbox" options={select_month_list} placeHolder="7월" width={157} height={40} />
              <SelectBox id="vin-number2-3" className="items-sbox" options={select_day_list} placeHolder="25일" width={157} height={40} />
            </div>
            <div className="management-law-sign">
              <p>
                중고자동차 성능 · 상태 점검자
                <Input type="text" id="calculated23" disabled={true} placeHolder="오토벨자동차정비" width={334} height={40} />(인)
              </p>
              <p>
                중고자동차 성능 · 상태 고지자
                <Input type="text" id="calculated24" disabled={true} placeHolder="(주)현대오토" width={334} height={40} />자동차 매매업소(인)
              </p>
            </div>

            <div className="agree-terms-wrap mt40">
              <CheckBox id='chk-agree' title='매물등록 규정 확인' />
              <div className="terms-wrap">
                내용
              </div>
            </div>
          </div>
        </fieldset>
      }
      {
        isMode === "viewer" && (
          !hasMobile
            ? (
            <fieldset>
            <div className="signature viewer">
              <p className="tx-tit">「자동차관리법」제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 <span>중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</span></p>
              <span className="tx-sub">2019년 12월 17일</span>
              <div className="sign">
                <p>중고자동차 성능 · 상태 점검자<span>유대영</span>(인)</p>
                <p>중고자동차 성능 · 상태 고지자<span>명문자동차</span>(인)</p>
              </div>
            </div>
          </fieldset>
            ) : (  
              <div className="inspection-confirm">
                <p>자동차관리법」 제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 <strong>중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</strong></p>
                <time dateTime="2019-08-02">2019년 08월 02일</time>
                <table className="signature">
                  <caption>서명</caption>
                  <tbody>
                    <tr>
                      <th scope="row">중고자동차 성능 · 상태 점검자</th>
                      <td><strong>유대영</strong> (인)</td>
                    </tr>
                    <tr>
                      <th scope="row">중고자동차 성능 · 상태 고지자</th>
                      <td><strong>명문자동차</strong> (인)</td>
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

export default CarSignature