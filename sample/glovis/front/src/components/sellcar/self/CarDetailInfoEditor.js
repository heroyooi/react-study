import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { setComma, getLabelFromArray } from '@src/utils/StringUtil';

import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import SelectBox from '@lib/share/items/SelectBox';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';
import { CMCDTPID } from '@src/constant/cdMstLib';
import { convertForSelectBox } from '@src/utils/CommonCodeUtil';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, pushObjectAction, removeObjectByKeyAction } from '@src/actions/sellcar/sellCarAction';
/**
 * @module CarDetailInfoEditor
 * @desc 차량 추가 상세 정보 표시/입력
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Object} props.item - 차량정보를 담은 객체
 * @param  {Function} props.onInput - 차량정보를 수정했을때 콜백함수
 * @param  {boolean} props.isEditing - 차량정보를 수정가능여부
 * @param  {boolean} props.viewIsExchanged=true - 판금/교환 여부를 보여줄지 여부
 */
const CarDetailInfoEditor = ({ item, isEditing, className, viewIsExchanged = true, onInput }) => {
  const dispatch = useDispatch();
  const { validation } = useSelector((rootStore) => rootStore.sellCarValid);
  const { commonCodeList } = useSelector((rootStore) => rootStore.commonCode);
  const [ spExchYnList, setSpExchYnList ] = useState([]);
  const exchangeOptions = [
    { value: '0', label: '있음' },
    { value: '1', label: '없음' },
    { value: '2', label: '모르겠음' }
  ];

  const _onInput = (e) => {
    if(onInput){
      onInput(e);
    } else {
      let { name, value } = e.target;
      const numberTypeColumns = ['crRlsPrc','drvDist', 'dspl'];
      if( numberTypeColumns.some( n => n === name ) ){
        value = parseInt(value);
      }
      dispatch(
        inputPropAction({
          state: 'car',
          prop: name,
          value
        })
      );
    }
  };

  const selectValue = (data, event) => {
    if(onInput){
      onInput({ target: { ...data, ...event } });
    }else{
      _onInput({ target: { ...data, ...event } });
    }
  };

  const setCommaCallback = useCallback(setComma, [item?.drvDist]);

  const getLabel = useCallback(getLabelFromArray, [item]);

  useEffect(() => {
    getCommonCodeAsync(CMCDTPID.spExchYn).then(setSpExchYnList);
  }, []);

  useEffect(() => {
    console.log('commonCodeList', convertForSelectBox(commonCodeList[CMCDTPID.spExchYn]));
  }, [commonCodeList]);

  return (
    <>
      <ul className={`float-wrap mt64 ${className}`}>
        <li style={{ float: 'left' }}>
          <h4 className="mb33">추가 상세 정보</h4>
        </li>
        {isEditing && (
          <li>
            <p>실제 차량 정보를 정확하게 입력해주세요. 실제 차량 정보와 상이할 경우 추후 견적이 달라질 수 있습니다.</p>
          </li>
        )}
      </ul>
      <table summary="추가 상세 정보에 대한 내용" className="table-tp1 input mt0">
        <caption className="away">추가 상세 정보</caption>
        <colgroup>
          <col width="16%" />
          <col width="84%" />
        </colgroup>
        <tbody>
          {/* <tr>
            <th>주행 거리(현재기준)</th>
            <td>
              {isEditing ? (
                <>
                  <label htmlFor="mileage" className="hide">
                    주행거리
                  </label>
                  <Input type="number" placeHolder="" value={item.drvDist} id="mileage" width={190} height={40} onChange={_onInput} name="drvDist" placeHolder="주행거리를 입력해주세요." />
                </>
              ) : (
                setCommaCallback(item?.drvDist)
              )}
              <em>km</em>
              {(validation.drvDist) && <p className="tx-exp-tp4">{validation.drvDist}</p>}
            </td>
          </tr> */}
          <tr>
            <th>
              차량 설명
              {isEditing && <em>(선택)</em>}
            </th>
            <td>
              {isEditing ? (
                <>
                  <Textarea countLimit={1000} type="tp1" name="crCmnt" data={(item.crCmnt===null) ? undefined : item.crCmnt} onChange={_onInput} placeHolder="차량에 관한 기타 설명 및 사고 정보를 입력해주세요." />
                </>
              ) : (
                <pre>{item?.crCmnt}</pre>
              )}
            </td>
          </tr>
          {viewIsExchanged && (
            <tr>
              <th>
                판금/교환 여부
                {/* {isEditing && <em>(선택)</em>} */}
              </th>
              <td>
                {isEditing ? (
                  <>
                    <label htmlFor="metalPlate" className="hide">
                      판금/교환 여부
                    </label>
                    <span className="bridge">
                      <SelectBox
                        id="metalPlate"
                        className="items-sbox"
                        options={spExchYnList}
                        width={105}
                        height={40}
                        name="spExchYn"
                        valueBy="value"
                        value={item?.spExchYn}
                        onChange={selectValue}
                      />
                    </span>
                    <Input
                      type="text"
                      placeHolder="어느 부위 몇 판 판금/교환하였는지 입력해주세요."
                      value={item?.spExchCntn || ''}
                      id="metalPlate2"
                      width={626}
                      height={40}
                      name="spExchCntn"
                      onChange={_onInput}
                    />
                  </>
                ) : (
                  `${getLabel(spExchYnList, item?.spExchYn)} ${item?.spExchCntn || ''}`
                )}
                {(validation.spExchYn) && <p className="tx-exp-tp4">{validation.spExchYn}</p>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default memo(CarDetailInfoEditor);
