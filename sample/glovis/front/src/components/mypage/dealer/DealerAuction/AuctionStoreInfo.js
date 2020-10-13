import { useState, useEffect } from 'react';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import Radio from '@lib/share/items/Radio';
import useSeperator from '@lib/share/custom/useSeperator';
import useSeperatorDigit from '@lib/share/custom/useSeperatorDigit';
import useRodal from '@lib/share/custom/useRodal'; //#a
import RodalPopup from '@lib/share/popup/RodalPopup';

import FindAddress from '@src/components/common/popup/FindAddress';

import { combineValues, getCommonCodeAsync } from '@src/utils/DataUtils';

const faxNumOptions = [
  { value: '', label: '선택' },
  { value: '02', label: '02' },
  { value: '031', label: '031' }
];

const emailList = [
  { value: '', label: '직접입력' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' }
];

const AuctionStoreInfo = ({ item, onChange, getAddress }) => {
  console.log('AuctionStoreInfo -> item', item);
  const [seperatedStoreNo, setTextDigit, setSeratedStoreNo] = useSeperatorDigit(item?.brn, [3, 5, 10]);
  const [seperatedCorpNo, setTextRegDigit, setSeratedRegStoreNo] = useSeperatorDigit(item?.corpRegNo, [5, 10]);
  const [seperatedFaxNo, seperateFaxNo] = useSeperator(item?.corpFaxNo);
  const [seperatedHpPn, seperateHpPn] = useSeperator(item?.corpTelNo);
  const [seperatedEmail, setText, setSeperator] = useSeperator(item?.emailAddr, '@');
  // const [seperatedCorpNo] = useSeperator(item?.corpRegNo);

  const [bankOptions, setBankOptions] = useState([]);
  const [phoneNumOptions, setPhoneNumOptions] = useState([]);
  const [emailOptions, setEmailOptions] = useState([]);
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);

  const selectItem = (data, e) => {
    const { name } = e;
    onChange({
      target: {
        name,
        value: data.value
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

  const handleSeperateDigitChange = (e, i) => {
    const { name } = e.target ?? i;
    const value = combineValues(e, i, '');

    onChange({
      target: {
        value,
        name
      }
    });
  };

  const handleSeperateChangeEmail = (e, i) => {
    const { name } = e.target ?? i;
    const value = combineValues(e, i, '@');

    onChange({
      target: {
        value,
        name
      }
    });
  };

  const selectEmail = (e, i) => {
    console.log('selectEmail -> e', e);
    const { cdNm } = e;
    const value = `${item?.emailAddr.split('@')[0]}@${cdNm}`;

    setText(value);
    onChange({
      target: {
        value,
        name: 'emailAddr'
      }
    });
  };

  const handerlAddressEvent = (result, target) => {
    closeAddressPopup(false);
    getAddress({
      name: 'auctMbCorpInfo',
      values: result
    });
  };

  useEffect(() => {
    seperateHpPn(item?.corpTelNo);
    seperateFaxNo(item?.corpFaxNo);
    item?.brn && setTextDigit(item?.brn);
    item?.corpRegNo && setTextRegDigit(item?.corpRegNo);
  }, [item?.corpTelNo, item?.corpFaxNo, item?.brn, item?.corpRegNo]);

  useEffect(() => {
    if (item?.entrDivCd) {
      setTextDigit('');
      setTextRegDigit('');
      if (item?.entrDivCd !== '01') {
        onChange({
          target: {
            name: 'corpRegNo',
            value: ''
          }
        });
      } else if (item?.entrDivCd !== '02') {
        onChange({
          target: {
            name: 'brn',
            value: ''
          }
        });
      }
    }
  }, [item?.entrDivCd]);

  useEffect(() => {
    getCommonCodeAsync('FM053').then(setBankOptions);
    getCommonCodeAsync('FM005').then((codeList) => setPhoneNumOptions([{ value: '', label: '선택' }, ...codeList.slice(1)]));
    getCommonCodeAsync('FM004').then((codeList) => setEmailOptions(codeList.slice(1)));
  }, []);

  return (
    <>
      <table summary="경매회원 업체정보 입력" className="table-tp1 input">
        <caption className="away">경매회원 업체정보</caption>
        <colgroup>
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              가입자, 대표자 동일
              <br />
              <em>(선택)</em>
            </th>
            <td>
              <div className="radio-group">
                <Radio id="joinReprSmYn-1" value="Y" checked={item?.joinReprSmYn} title="예" onChange={onChange} name="joinReprSmYn" />
                <Radio id="joinReprSmYn-2" value="N" checked={item?.joinReprSmYn} title="아니오" onChange={onChange} name="joinReprSmYn" />
              </div>
            </td>
            <th>방문거점</th>
            <td>
              <div className="radio-group">
                <Radio id="vstLocCd-1" value="01" checked={item?.vstLocCd} title="분당" onChange={onChange} name="vstLocCd" />
                <Radio id="vstLocCd-2" value="02" checked={item.vstLocCd} title="시화" onChange={onChange} name="vstLocCd" />
                <Radio id="vstLocCd-3" value="03" checked={item.vstLocCd} title="양산" onChange={onChange} name="vstLocCd" />
              </div>
            </td>
          </tr>
          <tr>
            <th>업체명</th>
            <td>
              <Input type="text" id="da-company-name" width={260} height={40} onBlur={onChange} name="corpNm" value={item?.corpNm} />
            </td>
            <th>업체 대표자</th>
            <td>
              <Input type="text" id="da-company-ceo" width={170} height={40} onBlur={onChange} name="corpReprNm" value={item?.corpReprNm} />
            </td>
          </tr>
          <tr>
            <th>사업자 구분</th>
            <td>
              <div className="radio-group">
                <Radio id="store-1" value="01" checked={item?.entrDivCd} title="법인" onChange={onChange} name="entrDivCd" />
                <Radio id="store-2" value="02" checked={item.entrDivCd} title="일반" onChange={onChange} name="entrDivCd" />
              </div>
            </td>
            <th>거래유형</th>
            <td>
              <div className="radio-group">
                <Radio id="bstpCd-1" value="01" checked={item?.bstpCd} title="내수" onChange={onChange} name="bstpCd" />
                <Radio id="bstpCd-2" value="02" checked={item.bstpCd} title="수출" onChange={onChange} name="bstpCd" />
                <Radio id="bstpCd-3" value="03" checked={item.bstpCd} title="내수+수출" onChange={onChange} name="bstpCd" />
              </div>
            </td>
          </tr>
          <tr>
            <th>사업자 번호</th>
            <td>
              {/* disabled={item?.entrDivCd !== '02'} */}
              <Input type="text" id="da-business-license1" width={66} height={40} disabled={false} onBlur={handleSeperateDigitChange} value={seperatedStoreNo?.[0]} name="brn" maxLength="3" />
              <em className="mg8">-</em>
              <Input type="text" id="da-business-license2" width={60} height={40} disabled={false} onBlur={handleSeperateDigitChange} value={seperatedStoreNo?.[1]} name="brn" maxLength="2" />
              <em className="mg8">-</em>
              <Input type="text" id="da-business-license3" width={100} height={40} disabled={false} onBlur={handleSeperateDigitChange} value={seperatedStoreNo?.[2]} name="brn" maxLength="5" />
            </td>
            <th>
              법인 등록 번호
              <br />
              <em>(선택)</em>
            </th>
            <td>
              <Input
                type="text"
                id="da-corporate-number1"
                width={100}
                height={40}
                disabled={item?.entrDivCd !== '01'}
                onBlur={handleSeperateDigitChange}
                value={seperatedCorpNo?.[0]}
                name="corpRegNo"
              />
              <em className="mg8">-</em>
              <Input
                type="text"
                id="da-corporate-number2"
                width={100}
                height={40}
                disabled={item?.entrDivCd !== '01'}
                onBlur={handleSeperateDigitChange}
                value={seperatedCorpNo?.[1]}
                name="corpRegNo"
              />
            </td>
          </tr>
          <tr>
            <th>업체 계좌 번호</th>
            <td>
              <SelectBox
                id="da-company-account1"
                className="items-sbox"
                options={bankOptions}
                placeHolder="은행선택"
                width={113}
                height={40}
                name="bankCd"
                valueBy="value"
                value={item?.bankCd}
                onChange={selectItem}
              />
              <em className="mg8"></em>
              <Input type="text" id="da-company-account2" width={135} height={40} placeHolder="계좌번호입력" onBlur={onChange} name="corpAccNoEnc" />
            </td>
            <th>예금주</th>
            <td>
              <Input type="text" id="da-depositary-stock" width={162} height={40} onBlur={onChange} name="dpst" />
            </td>
          </tr>
          <tr>
            <th>업체 주소</th>
            <td colSpan="3">
              <span className="bridge2">
                <Input type="text" id="da-company-post" width={110} height={40} value={item?.zcd} name="zcd" disabled={true} />
                <em className="mg4"></em>
                <Button size="big" background="gray" title="우편번호" width={140} height={40} buttonMarkup={true} onClick={(e) => openAddressPopup(e, 0)} />
              </span>
              <br />
              <span className="bridge2">
                <Input type="text" id="da-company-address1" width={258} height={40} value={item?.addrEnc} name="addrEnc" disabled={true} />
                <em className="mg4"></em>
                <Input type="text" id="da-company-address2" width={438} height={40} value={item?.dtlAddrEnc} name="dtlAddrEnc" disabled={true} />
              </span>
            </td>
          </tr>
          <tr>
            <th>업체 전화</th>
            <td>
              <SelectBox
                id="da-company-tel1"
                className="items-sbox"
                options={phoneNumOptions}
                placeHolder="010"
                width={80}
                height={40}
                value={seperatedHpPn?.[0]}
                name="corpTelNo"
                onChange={handleSeperateChange}
              />
              <em className="mg8">-</em>
              <Input type="text" id="da-company-tel2" maxLength={4} width={75} height={40} value={seperatedHpPn?.[1]} name="corpTelNo" onBlur={handleSeperateChange} />
              <em className="mg8">-</em>
              <Input type="text" id="da-company-tel3" maxLength={4} width={75} height={40} value={seperatedHpPn?.[2]} name="corpTelNo" onBlur={handleSeperateChange} />
            </td>
            <th>업체 팩스</th>
            <td>
              <SelectBox
                id="da-company-fax1"
                className="items-sbox"
                options={faxNumOptions}
                placeHolder="02"
                width={80}
                height={40}
                value={seperatedFaxNo?.[0]}
                name="corpFaxNo"
                onChange={handleSeperateChange}
              />
              <em className="mg8">-</em>
              <Input type="text" id="da-company-fax2" width={75} height={40} value={seperatedFaxNo?.[1]} name="corpFaxNo" onBlur={handleSeperateChange} />
              <em className="mg8">-</em>
              <Input type="text" id="da-company-fax3" width={75} height={40} value={seperatedFaxNo?.[2]} name="corpFaxNo" onBlur={handleSeperateChange} />
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td colSpan="3">
              <span className="bridge2">
                <Input type="text" id="da-company-email1" width={168} height={40} name="emailAddr" value={seperatedEmail[0]} onBlur={handleSeperateChangeEmail} />
                <em className="mg8">@</em>
                <Input type="text" id="da-company-email2" width={224} height={40} name="emailAddr" value={seperatedEmail[1]} onBlur={handleSeperateChangeEmail} />
                <em className="mg8"></em>
                <SelectBox id="da-company-email3" className="items-sbox" options={emailOptions} placeHolder="직접입력" width={168} height={40} onChange={selectEmail} />
              </span>
              <br />
              <span className="bridge2">
                메일링 서비스<em className="mg8"></em>
                <div style={{ display: 'inline-block' }}>
                  <div className="radio-group">
                    <Radio id="mailing-1" value="Y" checked={item?.mailing} title="수신" onChange={onChange} name="mailing" />
                    <Radio id="mailing-2" value="N" checked={item.mailing} title="비수신" onChange={onChange} name="mailing" />
                  </div>
                </div>
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

export default AuctionStoreInfo;
