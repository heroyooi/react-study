import React, { useState, useEffect } from 'react';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import useSeperator from '@lib/share/custom/useSeperator';
import useRodal from '@lib/share/custom/useRodal'; //#a
import RodalPopup from '@lib/share/popup/RodalPopup';

import FindAddress from '@src/components/common/popup/FindAddress';

import { combineValues, getCommonCodeAsync } from '@src/utils/DataUtils';
import { setHpPnFormat } from '@src/utils/MemberUtil';

const parseBirth = (YYMMDD) => {
  if (YYMMDD?.length === 6) {
    const YY = YYMMDD.substring(0, 2);
    const MM = YYMMDD.substring(2, 4);
    const DD = YYMMDD.substring(4, 6);

    return `${parseInt(YY) < 21 ? '20' : '19'}${YY}년 ${MM}월 ${DD}일`;
  }
  return YYMMDD;
};

const AuctionMemberInfo = ({ item, onChange, getAddress, agree }) => {
  const [seperatedHpPn, seperateHpPn] = useSeperator(item?.mbHpPnEnc);
  const [bankOptions, setBankOptions] = useState([]);
  const [phoneNumOptions, setPhoneNumOptions] = useState([]);
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);
  const [parsedBirth, setParsedBirth] = useState('');

  useEffect(() => {
    console.log('AuctionMemberInfo -> item?.mbHpPnEnc', item?.mbHpPnEnc);
    seperateHpPn(item?.mbHpPnEnc);
  }, [item?.mbHpPnEnc]);

  useEffect(() => {
    setParsedBirth(parseBirth(item?.mbBirth));
  }, [item?.mbBirth]);

  const selectItem = (data, e) => {
    const { value } = data;
    const { name } = e;

    onChange({
      target: {
        name,
        value
      }
    });
  };

  const handleSeperateChange = (e, i) => {
    const { name } = e.target ?? i;
    const value = combineValues(e, i);

    onChange({
      target: {
        value,
        name
      }
    });
  };

  const handerlAddressEvent = (result, target) => {
    closeAddressPopup(false);
    getAddress({
      name: 'auctMbInfo',
      values: result
    });
  };

  useEffect(() => {
    getCommonCodeAsync('FM053').then(setBankOptions);
    getCommonCodeAsync('FM005').then(setPhoneNumOptions);
  }, []);

  return (
    <>
      <table summary="경매회원 기본정보 입력" className="table-tp1 input">
        <caption className="away">경매회원 기본정보</caption>
        <colgroup>
          <col width="15%" />
          <col width="30%" />
          <col width="20%" />
          <col width="35%" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              이름<em>(선택)</em>
            </th>
            <td>{item?.mbNm}</td>
            <th>생년월일</th>
            <td>{parsedBirth}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td colSpan="3">
              <span className="bridge2">
                <Input type="text" id="da-post-number" width={110} height={40} name="mbZcd" value={item?.mbZcd} disabled={true} />
                <em className="mg4" />
                <Button size="big" background="gray" title="우편번호" width={140} height={40} buttonMarkup={true} onClick={(e) => openAddressPopup(e, 0)} />
              </span>
              <br />
              <span className="bridge2">
                <Input type="text" id="da-address1" width={258} height={40} name="mbAddrEnc" value={item?.mbAddrEnc} disabled={true} />
                <em className="mg4" />
                <Input type="text" id="da-address2" width={438} height={40} name="mbDtlAddrEnc" value={item?.mbDtlAddrEnc} disabled={true} />
              </span>
            </td>
          </tr>
          <tr>
            <th>휴대전화</th>
            <td colSpan="3">
              <SelectBox id="da-phone-number1" className="items-sbox" options={phoneNumOptions} width={125} height={40} value={seperatedHpPn?.[0]} name="mbHpPnEnc" onChange={handleSeperateChange} />
              <em className="mg8">-</em>
              <Input type="text" id="da-phone-number2" maxLength={4} width={125} height={40} value={seperatedHpPn?.[1]} name="mbHpPnEnc" onChange={handleSeperateChange} />
              <em className="mg8">-</em>
              <Input type="text" id="da-phone-number3" maxLength={4} width={125} height={40} value={seperatedHpPn?.[2]} name="mbHpPnEnc" onChange={handleSeperateChange} />
            </td>
          </tr>
          <tr>
            <th>계좌번호</th>
            <td colSpan="3">
              <span className="bridge2">
                <SelectBox
                  id="da-account-number1"
                  className="items-sbox"
                  options={bankOptions}
                  placeHolder="은행선택"
                  width={168}
                  height={40}
                  name="mbBankcd"
                  valueBy="value"
                  value={item?.mbBankcd}
                  onChange={selectItem}
                />
                <em className="mg8" />
                <Input type="text" id="da-account-number2" width={224} height={40} placeHolder="계좌번호입력" name="mbAcntnoEnc" value={item?.mbAcntnoEnc} onChange={onChange} />
              </span>
              <br />
              <span className="bridge2">
                입력하신 계좌는 환급계좌로 활용되며, 예금주는 가입자 본인이여야 합니다.
                <em className="mg8" />
                <CheckBox id="da-chk-me" title="확인" size="small" onChange={agree} />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress AddressEvent={handerlAddressEvent} />
      </RodalPopup>
    </>
  );
};

export default AuctionMemberInfo;
