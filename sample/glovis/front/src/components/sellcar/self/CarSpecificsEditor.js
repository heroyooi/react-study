import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Textarea from '@lib/share/items/Textarea';

import { inputPropAction } from '@src/actions/sellcar/sellCarAction';

const CarSpecificsEditor = ({ item, isEditing, isMobile = false }) => {
  const dispatch = useDispatch();

  const _onInput = (e) => {
    let { name, value } = e.target;
    const numberTypeColumns = ['crRlsPrc', 'drvDist', 'dspl'];
    if (numberTypeColumns.some((n) => n === name)) {
      value = parseInt(value);
    }
    dispatch(
      inputPropAction({
        state: 'car',
        prop: name,
        value
      })
    );
  };

  if (isMobile) {
    return (
      <table summary="특이사항" className="table-tp1">
        <caption className="away">차량 특이사항</caption>
        <colgroup>
          <col width="40%" />
          <col width="80%" />
        </colgroup>
        <tbody>
          <tr>
            <th>차량 특이사항</th>
            <td>
              {isEditing ? (
                <>
                  <Textarea
                    countLimit={1000}
                    type="tp1"
                    name="crCmnt"
                    data={item?.crCmnt === null ? undefined : item?.crCmnt}
                    onChange={_onInput}
                    placeHolder="차량설명, 판금/교환 수리정보, 추가옵션정보 를 입력해 주세요."
                  />
                </>
              ) : (
                <pre>{item?.crCmnt}</pre>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <div className={`option-add mt64`}>
      <h4 className="mb33">특이사항</h4>
      <table summary="차량 특이사항에 대한 내용" className="table-tp1 input mt0">
        <caption className="away">차량 특이사항</caption>
        <colgroup>
          <col width="16%" />
          <col width="84%" />
        </colgroup>
        <tbody>
          <tr>
            <th>차량 특이사항</th>
            <td>
              {isEditing ? (
                <>
                  <Textarea
                    countLimit={1000}
                    type="tp1"
                    name="crCmnt"
                    data={item.crCmnt === null ? undefined : item.crCmnt}
                    onChange={_onInput}
                    placeHolder="차량설명, 판금/교환 수리정보, 추가옵션정보 를 입력해 주세요."
                  />
                </>
              ) : (
                <pre>{item?.crCmnt}</pre>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarSpecificsEditor;
