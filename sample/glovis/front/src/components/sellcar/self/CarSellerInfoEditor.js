import React, { memo, useCallback, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabelFromArray } from '@src/utils/StringUtil';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import { axiosPost, apiUrl } from '@src/utils/HttpUtils';
import FindAddress from '@src/components/common/popup/FindAddress';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { getDetailLocationList, getLocationList } from '@src/actions/sellcar/locationAction';
import { inputPropAction } from '@src/actions/sellcar/sellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
// import { bankOptions } from '@src/dummy/sellcar/bankOptions';
import { combineValues, getCommonCodeAsync } from '@src/utils/DataUtils';
import * as sellcarApi from '@src/api/sellcar/CommonSellcarApi';
import { gInfoLive } from '@src/utils/LoginUtils';
import { setHpPnFormat } from '@src/utils/MemberUtil';

/**
 * @desc 차량 옵션 표시/입력
 * @module CarSellerInfoEditor
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Object} props.form - 판매자 정보를 담은 객체
 * @param  {Function} props.onInput - 수정모드에서 input을 수정했을때 콜백함수
 * @param  {Boolean} props.isEditing - 판매자 정보 수정가능여부
 * @param  {Boolean} props.viewResidence=true - 거주지 view on/off
 * @param  {Boolean} props.viewAddress=true - 주소 view on/off
 * @param  {Boolean} props.viewAccountNo=true - 계좌번호 view on/off
 */
const CarSellerInfoEditor = ({
  item,
  isEditing,
  className,
  viewResidence = true,
  viewAddress = true,
  viewAccountNo = true,
  viewApplyDate = false,
  nameEdit = false,
  hpPnEdit = false,
  showChngPh = false,
  onInput,
  prvBizYn = false
}) => {
  // const [seperatedHpPn, seperateHpPn] = useSeperator(item?.hpPn);
  const dispatch = useDispatch();
  const [valid, setValid] = useState({});
  const [bankForm, setBankForm] = useState({});
  const [hpPn01List, setHpPn01List] = useState([]);
  const [accountChk, setAccountChk] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [bizTypeDisabled, setBizTypeDisabled] = useState(item.bizYn === 'Y' ? false : true);
  const { validation } = useSelector((rootStore) => rootStore.sellCarValid);
  const { locationList, detailLocationList } = useSelector((store) => store.sellcarLocation);
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);
  const { showAlert } = useContext(SystemContext);

  const getLabel = useCallback(getLabelFromArray, []);

  const _onInput = (e) => {
    const { name, value } = e.target;
    if (name === 'accountNo' || name === 'accountNm') {
      setBankForm(
        produce((draft) => {
          draft[name] = value;
        })
      );
    }
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: name,
        value
      })
    );

    // 시,도가 변경되면 시,군구 리셋해줌
    if (name === 'rgstRsdcAddrCd') {
      dispatch(
        inputPropAction({
          state: 'seller',
          prop: 'rgstRsdcDtlAddrCd',
          value: undefined
        })
      );
    }
  };

  const onChange = (data, name) => {
    if (name === 'bankCd' || name === 'accountNm') {
      setBankForm(
        produce((draft) => {
          draft[name] = data.value;
        })
      );
    }
    if (onInput) {
      onInput({ target: { value: data.value, name } });
    } else {
      _onInput({ target: { value: data.value, name } });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log('bizTypeYn::', name, value);
    if (onInput) {
      onInput({ target: { value, name } });
    } else {
      _onInput({ target: { value, name } });
    }
    if (name === 'bizYn') {
      if (value === 'N') {
        console.log('bizTypeYn::', value);
        setBizTypeDisabled(true);
        if (onInput) {
          onInput({ target: { value: '', name: 'bizTpcd' } });
        } else {
          _onInput({ target: { value: '', name: 'bizTpcd' } });
        }
      } else {
        setBizTypeDisabled(false);
      }
    }
  };

  // const phoneNumState = () => {
  //   const phone = item?.hpPn?.split('-') || '';
  //   return {
  //     _first: phone[0] || '',
  //     _center: phone[1] || '',
  //     _last: phone[2] || ''
  //   };
  // };

  // const [phoneNum, setPhoneNum] = useState(phoneNumState);

  // useEffect(() => {
  //   setPhoneNum(phoneNumState);
  // }, [item.hpPn]);

  const handerlAddressEvent = (result, target) => {
    closeAddressPopup(false);
    const { postCode: zcd, addData: addr, detailText: dtlAddr, locCd: rgstRsdcAddrCd, ctyCd: rgstRsdcDtlAddrCd } = result;
    if (onInput) {
      onInput({ target: { value: zcd, name: 'zcd' } });
      onInput({ target: { value: addr, name: 'addr' } });
      onInput({ target: { value: dtlAddr, name: 'dtlAddr' } });
      onInput({ target: { value: rgstRsdcAddrCd, name: 'rgstRsdcAddrCd' } });
      onInput({ target: { value: rgstRsdcDtlAddrCd, name: 'rgstRsdcDtlAddrCd' } });
    } else {
      _onInput({ target: { value: zcd, name: 'zcd' } });
      _onInput({ target: { value: addr, name: 'addr' } });
      _onInput({ target: { value: dtlAddr, name: 'dtlAddr' } });
      _onInput({ target: { value: rgstRsdcAddrCd, name: 'rgstRsdcAddrCd' } });
      _onInput({ target: { value: rgstRsdcDtlAddrCd, name: 'rgstRsdcDtlAddrCd' } });
    }
  };

  // const inputPhoneValue = (data) => {
  //   const hpFirst = item?.hpPn.split('-')[0];
  //   const { value, name } = data;
  //   console.log(value, name);
  //   const phone = name === '_center' ? `${hpFirst}-${value}-${phoneNum._last}` : `${hpFirst}-${phoneNum._center}-${value}`;
  //   if (onInput) {
  //     onInput({
  //       target: {
  //         value: phone,
  //         name: 'hpPn'
  //       }
  //     });
  //   } else {
  //     _onInput({
  //       target: {
  //         value: phone,
  //         name: 'hpPn'
  //       }
  //     });
  //   }
  // };

  // const selectPhoneValue = (data) => {
  //   const hpPn = `${data.value}-${phoneNum._center}-${phoneNum._last}`;
  //   if (onInput) {
  //     onInput({
  //       target: {
  //         value: hpPn,
  //         name: 'hpPn'
  //       }
  //     });
  //   } else {
  //     _onInput({
  //       target: {
  //         value: hpPn,
  //         name: 'hpPn'
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  useEffect(() => {
    dispatch(getDetailLocationList(item?.rgstRsdcAddrCd));
  }, [item?.rgstRsdcAddrCd]);

  const selectLocation = (data, e) => {
    if (onInput) {
      onInput({
        target: { ...data, ...e }
      });
    } else {
      _onInput({
        target: { ...data, ...e }
      });
    }
  };

  /**
   * 휴대전화번호 가져오기
   */
  // const changeHpPn = (e) => {
  //   e.preventDefault();
  //   const id = gInfoLive().id;
  //   const param = {
  //     mbId: id
  //   };
  //   sellcarApi
  //     .getHpPn(param)
  //     .then((res) => {
  //       const { statusinfo, hpPn: newHpPn } = res.data;
  //       if (statusinfo.returncd === '000') {
  //         if (item.hpPn !== newHpPn) {
  //           if (onInput) {
  //             onInput({
  //               target: {
  //                 value: setHpPnFormat(newHpPn),
  //                 name: 'hpPn'
  //               }
  //             });
  //           } else {
  //             _onInput({
  //               target: {
  //                 value: setHpPnFormat(newHpPn),
  //                 name: 'hpPn'
  //               }
  //             });
  //           }
  //         }
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  /**
   * 계좌인증
   */
  const authAccount = (e) => {
    e.preventDefault();
    if (bankForm.bankCd === '' || bankForm.bankCd === undefined) {
      showAlert('은행을 선택해주세요.');
      return;
    }
    if (bankForm.accountNo === '' || bankForm.accountNo === undefined) {
      showAlert('계좌번호를 입력해주세요.');
      return;
    }
    if (bankForm.accountNm === '' || bankForm.accountNm === undefined) {
      showAlert('예금주명을 입력해주세요.');
      return;
    }
    if (bankForm?.bankCd && bankForm?.accountNo && bankForm?.accountNm) {
      const accountChkData = {
        banksett: bankForm.bankCd,
        noacct: bankForm.accountNo,
        nmcomp: bankForm.accountNm,
        rltURL: `${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`
      };
      console.log('accountChkData >>>', accountChkData);
      axiosPost('/api/admin/homeservice/callUrlConnection.do', accountChkData).then(({ data }) => {
        console.log(`accountChk Return URL >>> ${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`);
        console.log('accountChk Request >>>>', data);
        if (data?.statusinfo?.returncd !== undefined && data?.statusinfo?.returncd === 'SYS9999') {
          showAlert('서버와 접속이 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.<br/>테스트를 위해 인증처리합니다.');
          _onInput({
            target: {
              value: true,
              name: 'accountChk'
            }
          });
          // _onInput({
          //   target: {
          //     value: false,
          //     name: 'accountChk'
          //   }
          // });
          return;
        }
        if (data.statusinfo.returncd === '000') {
          showAlert('인증 되었습니다.');
          _onInput({
            target: {
              value: true,
              name: 'accountChk'
            }
          });
        } else {
          showAlert(data?.statusinfo?.returnmsg + '<br/>테스트를 위해 인증처리합니다.');
          _onInput({
            target: {
              value: true,
              name: 'accountChk'
            }
          });
          // _onInput({
          //   target: {
          //     value: false,
          //     name: 'accountChk'
          //   }
          // });
        }
      });
    }
  };

  useEffect(() => {
    getCommonCodeAsync('FM005').then((codeList) => setHpPn01List(codeList));
    getCommonCodeAsync('FM053').then((codeList) => setBankOptions(codeList));
  }, []);

  useEffect(() => {
    if (!isEmpty(item.bankCd) && !isEmpty(item.accountNo) && !isEmpty(item.accountNm)) {
      setBankForm(
        produce((draft) => {
          draft.bankCd = item.bankCd;
          draft.accountNo = item.accountNo;
          draft.accountNm = item.accountNm;
        })
      );
      if (onInput) {
        onInput({ target: { value: item.bankCd, name: 'bankCd' } });
        onInput({ target: { value: item.accountNo, name: 'accountNo' } });
        onInput({ target: { value: item.accountNm, name: 'accountNm' } });
      } else {
        _onInput({ target: { value: item.bankCd, name: 'bankCd' } });
        _onInput({ target: { value: item.accountNo, name: 'accountNo' } });
        _onInput({ target: { value: item.accountNm, name: 'accountNm' } });
      }
    } else {
      setBankForm(
        produce((draft) => {
          draft.accountNm = item.nmbNm;
        })
      );
      if (onInput) {
        onInput({ target: { value: item.nmbNm, name: 'accountNm' } });
      } else {
        _onInput({ target: { value: item.nmbNm, name: 'accountNm' } });
      }
    }
  }, [item]);

  return (
    <>
      <table summary="판매자 정보에 대한 내용" className={`table-tp1 mt80 input ${className}`}>
        <caption>판매자 정보</caption>
        <colgroup>
          <col width="16%" />
          <col width="84%" />
        </colgroup>
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              {!isEditing && item?.nmbNm}
              {/* {!nameEdit && 
                <>
                  <Input type="text" placeHolder="" value="" id="nmbNm" width={160} height={40} name="nmbNm" value={item?.nmbNm} onBlur={onInput} readOnly={true} disabled={true} />
                </>
              } */}
              {isEditing && !nameEdit && (
                <>
                  {/* <label htmlFor="nmbNm" className="hide">
                    이름
                  </label> */}
                  <Input type="text" placeHolder="" id="nmbNm" width={160} height={40} name="nmbNm" value={item?.nmbNm} onBlur={_onInput} disabled={true} />
                </>
              )}
            </td>
          </tr>
          <tr>
            <th>휴대전화번호</th>
            <td>
              {!hpPnEdit && !isEditing && item?.hpPn}
              {!hpPnEdit && isEditing && (
                <>
                  <label htmlFor="user-phone" className="hide">
                    휴대전화번호
                  </label>
                  <Input type="text" placeHolder={item?.hpPn} value={item?.hpPn} width={315} height={40} disabled={true} />
                  {/* <span className="bridge">                    
                    <SelectBox                                                                                                                                                                                                                                                                                      
                      id="_first"
                      className="items-sbox"
                      options={hpPn01List}
                      width={105}
                      height={40}
                      name="_first"
                      valueBy="value"
                      value={phoneNum._first}
                      defaultValue={phoneNum._first}
                      onChange={selectPhoneValue}
                      disabled={true}
                    />
                  </span>
                  <span className="bridge">
                    <Input id="_center" type="number" placeHolder="" value={phoneNum._center} width={105} height={40} name="_center" onBlur={inputPhoneValue} readOnly={true} disabled={true} />
                  </span>
                  <span className="mr20">
                    <Input id="_last" type="number" placeHolder="" value={phoneNum._last} width={105} height={40} name="_last" onBlur={inputPhoneValue} readOnly={true} disabled={true} />
                  </span> */}
                  {/* <CheckBox
                    id='chk-infoUpdate'
                    title='개인 정보 업데이트'
                    checked={item?.infoUpdate}
                    name="infoUpdate"
                    onChange={e => checkValue(e)}
                    isSelf={false}
                  /> */}
                  {showChngPh && <Button color="blue80" title="휴대전화번호 변경" iconType="next-blue" onClick={changeHpPn} />}
                </>
              )}
            </td>
          </tr>
          {viewResidence && (
            <tr>
              <th>거주지역</th>
              <td>
                {isEditing ? (
                  <>
                    <span className="bridge">
                      <SelectBox
                        id="address1"
                        className="items-sbox"
                        placeHolder="시/도 선택"
                        options={locationList}
                        width={245}
                        height={40}
                        onChange={selectLocation}
                        value={item?.rgstRsdcAddrCd}
                        valueBy="value"
                        name="rgstRsdcAddrCd"
                      />
                    </span>
                    <span className="bridge">
                      <SelectBox
                        id="address2"
                        className="items-sbox"
                        placeHolder="시군구 선택"
                        options={detailLocationList}
                        width={245}
                        height={40}
                        onChange={selectLocation}
                        value={item?.rgstRsdcDtlAddrCd}
                        valueBy="value"
                        name="rgstRsdcDtlAddrCd"
                      />
                    </span>
                  </>
                ) : (
                  `${getLabel(locationList, item?.rgstRsdcAddrCd)} ${getLabel(detailLocationList, item?.rgstRsdcDtlAddrCd)}`
                )}
                {validation.rgstRsdcAddrCd && <p className="tx-exp-tp4">{validation.rgstRsdcAddrCd}</p>}
                {validation.rgstRsdcDtlAddrCd && <p className="tx-exp-tp4">{validation.rgstRsdcDtlAddrCd}</p>}
              </td>
            </tr>
          )}
          {viewAddress && (
            <tr>
              <th>주소</th>
              <td className="pd8-12">
                {isEditing ? (
                  <>
                    <label htmlFor="zcd" className="hide">
                      주소
                    </label>
                    <span className="bridge bridge2 ver-a">
                      <Input type="text" placeHolder="" value={item?.zcd} id="zcd" width={145} height={40} name="zcd" onClick={(e) => openAddressPopup(e, 0)} />
                    </span>

                    <Button size="sml" background="blue80" radius={true} title="우편번호" width={80} height={29} onClick={(e) => openAddressPopup(e, 0)} />
                    <br />

                    <label htmlFor="address" className="hide">
                      주소
                    </label>
                    <span className="bridge">
                      <Input type="text" placeHolder="" value={item?.addr} id="addr" width={270} height={40} name="addr" onClick={(e) => openAddressPopup(e, 0)} />
                    </span>
                    <Input type="text" placeHolder="" value={item?.dtlAddr} id="dtlAddr" width={270} height={40} name="dtlAddr" onClick={(e) => openAddressPopup(e, 0)} />
                  </>
                ) : (
                  `${item?.zcd || ''} ${item?.addr || ''} ${item?.dtlAddr || ''}`
                )}
                {(validation.zcd || validation.addr || validation.dtlAddr) && <p className="tx-exp-tp4">주소를 입력해주세요.</p>}
              </td>
            </tr>
          )}
          {viewApplyDate && ( // 추가
            <tr>
              <th>접수일시</th>
              <td>{item?.requestDt}</td>
            </tr>
          )}
          {viewAccountNo && (
            <tr>
              <th>계좌 번호</th>
              <td>
                {isEditing ? (
                  <>
                    <label htmlFor="account-num" className="hide">
                      계좌 번호
                    </label>
                    <span className="bridge">
                      <SelectBox
                        id="bankCd"
                        className="items-sbox"
                        options={bankOptions}
                        width={145}
                        height={40}
                        value={item?.bankCd}
                        valueBy="value"
                        name="bankCd"
                        onChange={(e) => {
                          onChange(e, 'bankCd');
                        }}
                      />
                    </span>
                    <span className="bridge">
                      <Input type="text" placeHolder="계좌번호(' - ‘없이 숫자만 입력)" id="accountNo" name="accountNo" width={245} height={40} value={item?.accountNo} onBlur={_onInput} />
                    </span>
                    <span className="bridge">
                      <Input type="text" placeHolder="예금주" id="accountNm" name="accountNm" width={100} height={40} value={item?.accountNm ? item?.accountNm : item?.nmbNm} disabled={true} />
                    </span>
                    <Button size="sml" background="blue80" radius={true} title="계좌인증" width={80} height={29} onClick={authAccount} />
                  </>
                ) : (
                  `${getLabel(bankOptions, item?.bankCd)} ${item?.accountNo} (예금주:${item?.accountNm})`
                )}
                {validation.bankCd && <p className="tx-exp-tp4">은행코드 입력해주세요.</p>}
                {validation.accountNo && <p className="tx-exp-tp4">계좌번호를 입력해주세요.</p>}
                {validation.accountNm && <p className="tx-exp-tp4">예금주를 입력해주세요.</p>}
                {/* {(validation.bankCd || validation.accountNo || validation.accountNm) && <p className="tx-exp-tp4">계좌번호를 입력해주세요.</p>} */}
              </td>
            </tr>
          )}
          {prvBizYn && (
            <tr>
              <th>개인사업자 유무</th>
              <td>
                {isEditing ? (
                  <>
                    {/* <Radio id="deal-notify-1" title="매입단가 불일치" value={1} checked={isValue} onChange={handleChange} /> */}
                    <Radio id="deal-yn-1" title="없음" name="bizYn" value="N" checked={item.bizYn ? item.bizYn : 'N'} onChange={handleChange} />
                    &nbsp;&nbsp;
                    <Radio id="deal-yn-2" title="있음" name="bizYn" value="Y" checked={item.bizYn} onChange={handleChange} />
                    &nbsp;&nbsp; (&nbsp;
                    <Radio id="deal-bizType-1" name="bizTpcd" title="일반 사업자" value="1001" onChange={handleChange} checked={item.bizTpcd} disabled={bizTypeDisabled} />
                    &nbsp;&nbsp;
                    <Radio id="deal-bizType-2" name="bizTpcd" title="면세 사업자" value="1002" onChange={handleChange} checked={item.bizTpcd} disabled={bizTypeDisabled} />
                    &nbsp;&nbsp;
                    <Radio id="deal-bizType-3" name="bizTpcd" title="간이 사업자" value="1003" onChange={handleChange} checked={item.bizTpcd} disabled={bizTypeDisabled} />
                    &nbsp;)
                  </>
                ) : (
                  <>{item.bizYn === 'N' || item.bizYn === null ? '-' : item.bizTpcd === '1001' ? '일반 사업자' : item.bizTpcd === '1002' ? '면세 사업자' : '간이 사업자'}</>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress AddressEvent={handerlAddressEvent} />
      </RodalPopup>
    </>
  );
};

export default memo(CarSellerInfoEditor);
