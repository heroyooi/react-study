/**
 * 설명 : 회원 추가 정보
 * @fileoverview 추가 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import { isEmpty } from 'lodash';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import InputFile from '@lib/share/items/InputFile';
import MobInputFile from '@lib/share/items/MobInputFile';
import Textarea from '@lib/share/items/Textarea';
import { getSplitObj } from '@src/utils/MemberUtil';

import FindAddress from '@src/components/common/popup/FindAddress';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

//mobile
import { SECTION_MYPAGE } from '@src/actions/types';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { m_mobile_number_list } from '@src/dummy';
import CheckBox from '@lib/share/items/CheckBox';

/**
 * 회원 추가 정보
 * @param {object} 회원 추가 정보
 * @return {MemberAddInfo}
 */
const MemberAddInfo = ({ memberInfoPwd, onChange, msgObj, sendData = [], handleFullpage }) => {
  const dispatch = useDispatch();
  const { FM056List } = useSelector((state) => ({
    FM056List: state.commonCode.commonCodeList.FM056 ? state.commonCode.commonCodeList.FM056 : [] //프로필 이미지 형태
  }));

  // eslint-disable-next-line no-unused-vars
  const [addressPopup1, setAddressPopup1, openAddressPopup1, closeAddressPopup1] = useRodal(false);

  const [inputs, setInputs] = useState({
    mbStrZcd: memberInfoPwd.mbStrZcd,
    mbStrAddr: memberInfoPwd.mbStrAddr,
    mbStrDtlAddr: memberInfoPwd.mbStrDtlAddr
  });
  const { mbStrZcd, mbStrAddr, mbStrDtlAddr } = inputs; // 비구조화 할당을 통해 값 추출

  // 주소컴포넌트에 AddressEvent를 props로 보냄
  const AddressEvent1 = useCallback(
    (e) => {
      setInputs(
        produce((draft) => {
          draft.mbStrZcd = e.postCode;
          draft.mbStrAddr = e.addData;
          draft.mbStrDtlAddr = e.detailText;
        })
      );

      const objNew = {
        mbStrZcd: e.postCode,
        mbStrAddr: e.addData,
        mbStrDtlAddr: e.detailText
      };

      onChange(objNew);
      closeAddressPopup1();
    },
    [mbStrZcd, mbStrAddr, mbStrDtlAddr, closeAddressPopup1]
  );

  //common fileUpload
  const comFileUpload = (files, target) => {
    const objNew = { [target]: files[0] };
    onChange(objNew);
  };

  const onHandleChange = (e) => {
    onChange(e);
  };

  //radio change
  const onHandleRadio = (e, target) => {
    const objNew = { [target]: e.target.value };
    onChange(objNew);
  };

  //공통코드
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch(getCommonCodeList('FM025')); //제휴 가입구분
    dispatch(getCommonCodeList('FM054')); //사업자 형태
    dispatch(getCommonCodeList('FM056')); //프로필 형태
  }, []);

  //mobile
  const hasMobile = useSelector((state) => state.common.hasMobile);
  //모바일용
  useEffect(() => {
    if (sendData.length > 0) {
      AddressEvent1(sendData[0], sendData[1]);
    }
  }, [sendData]);

  if (hasMobile) {
    // const [busiNum, setBusiNum] = useState('12345');
    // const [busiAddr, setBusiAddr] = useState('서울 서초구 신반포로');
    // const [busiAddrDetail, setBusiAddrDetail] = useState('');
    // const handleChangeNum = (e) => setBusiNum(e.target.value);
    // const handleChangeAddr = (e) => setBusiAddr(e.target.value);
    // const handleChangeAddrDetail = (e) => setBusiAddrDetail(e.target.value);

    // const [copyNum, setCopyNum] = useState('');
    // const [copyAddr, setCopyAddr] = useState('');
    // const [copyAddrDetail, setCopyDetail] = useState('');

    // const handleBusiness = (e) => {
    //   if (e.target.checked) {
    //     setCopyNum(busiNum);
    //     setCopyAddr(busiAddr);
    //     setCopyDetail(busiAddrDetail);
    //   } else {
    //     setCopyNum('');
    //     setCopyAddr('');
    //     setCopyDetail('');
    //   }
    // };

    // const handleDatepicker = (href) => (e) => {
    //   e.preventDefault();
    //   Router.push(href);
    // };

    // InputFile & InputPicture
    const uploadList1 = (files) => {
      //   const _files = Object.values(files);
      //   _files.map(v => console.log(v));
    };

    const textareaChange = (e) => {
      console.log('textareaChange');
      console.log(e);
    };
    const textareaBlur = (e) => {
      console.log('textareaBlur');
      console.log(e);
    };
    const textareaFocus = (e) => {
      console.log('textareaFocus');
      console.log(e);
    };

    // const [isMarketing, setIsMarketing] = useState(false);
    // const handleTermsChange = (e) => {
    //   setIsMarketing((prevMarketing) => !prevMarketing);
    // };
    // const handleTermsView = (href) => () => {
    //   Router.push(href);
    // };

    return (
      <>
        <table summary="가입정보입력에 대한 내용" className="table-tp2 th-none">
          <caption className="away">가입정보입력</caption>
          <colgroup>
            <col width="33%" />
            <col width="67%" />
          </colgroup>
          <tbody>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">
                  프로필 사진 <em>(선택)</em>
                </p>
                <RadioGroup
                  onChange={(e) => onHandleRadio(e, 'mbProfFileOpYn')}
                  defaultValue={memberInfoPwd.mbProfFileOpYn}
                  name="mbProfFileOpYn"
                  dataList={!isEmpty(FM056List) ? FM056List : [{ id: 'prof_ex1', value: '', label: '' }]}
                  className="v-2 multi mb10"
                />
                {/*}<RadioGroup
                  dataList={[
                    { id: 'mo-open', value: 1, checked: false, disabled: false, label: '공개' },
                    { id: 'mo-non-open', value: 2, checked: true, disabled: false, label: '비공개' }
                  ]}
                  className="v-2 multi mb10"
                />{*/}
                <MobInputFile uploadList={(e) => comFileUpload(e, 'mbProfFileIdList')} accept="image/jpg" />
                <div className="tx-sub">{memberInfoPwd.mbProfFileNm}</div>
                <dl className="tx-sm-info mt10">
                  <dd>이미지 등록기준 : 80X100 사이즈 / JPG 파일</dd>
                  <dd>본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제 될 수도 있습니다.</dd>
                </dl>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">판매점 주소</p>
                {/* <div className="m-chk-wrap">
                  <CheckBox id="chk-basic-sml" title="사업자주소 동일" size="small" onChange={handleBusiness} />
                </div> */}
                <span className="bridge2">
                  <Input type="text" height={40} id="m-member-modify2-11" width="73%" disabled={true} name="mbStrZcd" value={mbStrZcd} />
                  <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpage} />
                </span>
                <span className="bridge2">
                  <Input type="text" height={40} id="m-member-modify2-12" disabled={true} name="mbStrAddr" value={mbStrAddr} />
                </span>
                <span className="bridge2">
                  <Input type="text" height={40} id="m-member-modify2-13" name="mbStrDtlAddr" value={mbStrDtlAddr} onChange={onHandleChange} maxLength={100} />
                </span>
                <p className="tx-sub tx-red80">{msgObj.chkStrAddrMsg}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">판매점 연락처</p>
                <span className="bridge2">
                  {/*}<MobSelectBox options={m_mobile_number_list} width="30%" />
                  <Input type="text" value="1234-5678" id="m-member-modify15" height={40} width="67.5%" />{*/}
                  <Input
                    type="text"
                    id="member-modify17"
                    width="22%"
                    height={40}
                    maxLength={3}
                    name="mbStrPn1"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrPn, '-')[0]}
                  />
                  <em className="mg8">-</em>
                  <Input
                    type="text"
                    id="member-modify17"
                    width="32%"
                    height={40}
                    maxLength={4}
                    name="mbStrPn2"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrPn, '-')[1]}
                  />
                  <em className="mg8">-</em>
                  <Input
                    type="text"
                    id="member-modify18"
                    width="32%"
                    height={40}
                    maxLength={4}
                    name="mbStrPn3"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrPn, '-')[2]}
                  />
                  <p className="tx-sub tx-red80">{msgObj.chkStrPnMsg}</p>
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">팩스</p>
                <span className="bridge2">
                  {/*}<MobSelectBox options={m_mobile_number_list} width="30%" />
                  <Input type="text" value="1234-5678" id="m-member-modify16" height={40} width="67.5%" />{*/}
                  <Input
                    type="text"
                    id="member-modify19"
                    width="22%"
                    height={40}
                    maxLength={3}
                    name="mbStrFaxno1"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[0]}
                  />
                  <em className="mg8">-</em>
                  <Input
                    type="text"
                    id="member-modify19"
                    width="32%"
                    height={40}
                    maxLength={4}
                    name="mbStrFaxno2"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[1]}
                  />
                  <em className="mg8">-</em>
                  <Input
                    type="text"
                    id="member-modify20"
                    width="32%"
                    height={40}
                    maxLength={4}
                    name="mbStrFaxno3"
                    numberOnly={true}
                    onChange={onHandleChange}
                    value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[2]}
                  />
                  <p className="tx-sub tx-red80">{msgObj.chkStrFaxnoMsg}</p>
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">영업시간</p>
                <Textarea type="tp1" name="mbStrSlHmCntn" placeHolder="입력해주세요." onChange={onHandleChange} data={memberInfoPwd.mbStrSlHmCntn} onBlur={textareaBlur} onFocus={textareaFocus} />
                <p className="tx-sub tx-red80">{msgObj.chkStrSlHmCntnMsg}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <RodalPopup show={addressPopup1} type={'slideUp'} closedHandler={closeAddressPopup1} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress AddressEvent={AddressEvent1} />
      </RodalPopup>
      <table className="table-tp1 input" summary="회원정보 수정 내용">
        <caption className="away">회원정보 수정</caption>
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              프로필 사진<em>(선택)</em>
            </th>
            <td>
              <RadioGroup
                onChange={(e) => onHandleRadio(e, 'mbProfFileOpYn')}
                defaultValue={memberInfoPwd.mbProfFileOpYn}
                name="mbProfFileOpYn"
                dataList={!isEmpty(FM056List) ? FM056List : [{ id: 'prof_ex1', value: '', label: '' }]}
                /*  
                dataList={[
                  { id: 'prof_ex1', name: 'mbProfFileOpYn', value: 'Y',  disabled: false, title: '공개' },
                  { id: 'prof_ex2', name: 'mbProfFileOpYn', value: 'N',  disabled: false, title: '비공개' }
                ]} */
                size="small"
              />
              {memberInfoPwd.mbProfFileNm}
              <br />
              <InputFile uploadList={(e) => comFileUpload(e, 'mbProfFileIdList')} resVertical={true} accept="image/jpg" />
              <p className="tx-exp-tp5 mt20">* 이미지 등록기준 : 80X100 사이즈 / JPG 파일</p>
              <p className="tx-exp-tp5 mb8">* 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.</p>
            </td>
          </tr>
          <tr className="address">
            <th>판매점 주소</th>
            <td className="address">
              <span className="bridge2">
                <Input type="text" disabled={true} id="member-modify15" width={110} height={40} name="mbStrZcd" value={mbStrZcd} />
                <Button size="big" background="gray" title="우편번호" width={140} height={40} onClick={(e) => openAddressPopup1(e, 0)} buttonMarkup={true} />
                <br />
              </span>
              <span className="bridge2">
                <Input type="text" disabled={true} id="member-modify9" width={258} height={40} name="mbStrAddr" value={mbStrAddr} />
                <Input type="text" id="member-modify10" width={258} height={40} name="mbStrDtlAddr" value={mbStrDtlAddr} onChange={onHandleChange} maxLength={100} />
              </span>
              <p className="tx-sub tx-red80">{msgObj.chkStrAddrMsg}</p>
            </td>
          </tr>
          <tr>
            <th>판매점 연락처</th>
            <td>
              <Input
                type="text"
                id="member-modify17"
                width={125}
                height={40}
                maxLength={3}
                name="mbStrPn1"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrPn, '-')[0]}
              />
              <em className="mg8">-</em>
              <Input
                type="text"
                id="member-modify17"
                width={125}
                height={40}
                maxLength={4}
                name="mbStrPn2"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrPn, '-')[1]}
              />
              <em className="mg8">-</em>
              <Input
                type="text"
                id="member-modify18"
                width={125}
                height={40}
                maxLength={4}
                name="mbStrPn3"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrPn, '-')[2]}
              />
              <p className="tx-sub tx-red80">{msgObj.chkStrPnMsg}</p>
            </td>
          </tr>
          <tr>
            <th>팩스</th>
            <td>
              {/*
                <SelectBox id="member-modify13" placeHolder="02" className="items-sbox" options={select1_list} width={125} 
              name="mbStrFaxno1" onChange={onHandleChange} /> */}
              <Input
                type="text"
                id="member-modify19"
                width={125}
                height={40}
                maxLength={3}
                name="mbStrFaxno1"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[0]}
              />
              <em className="mg8">-</em>
              <Input
                type="text"
                id="member-modify19"
                width={125}
                height={40}
                maxLength={4}
                name="mbStrFaxno2"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[1]}
              />
              <em className="mg8">-</em>
              <Input
                type="text"
                id="member-modify20"
                width={125}
                height={40}
                maxLength={4}
                name="mbStrFaxno3"
                onChange={onHandleChange}
                numberOnly={true}
                value={getSplitObj(memberInfoPwd.mbStrFaxno, '-')[2]}
              />
              <p className="tx-sub tx-red80">{msgObj.chkStrFaxnoMsg}</p>
            </td>
          </tr>
          <tr>
            <th>영업시간</th>
            <td>
              <Textarea height={160} type="tp1" name="mbStrSlHmCntn" onChange={onHandleChange} data={memberInfoPwd.mbStrSlHmCntn} />
              <p className="tx-sub tx-red80">{msgObj.chkStrSlHmCntnMsg}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

MemberAddInfo.propTypes = {
  memberInfoPwd: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  sendData: PropTypes.array,
  handleFullpage: PropTypes.func
};

export default MemberAddInfo;
