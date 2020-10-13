/**
 * 설명 : 회원 딜러 정보
 * @fileoverview 딜러 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import Router from 'next/router';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import InputFile from '@lib/share/items/InputFile';
import MobInputFile from '@lib/share/items/MobInputFile';
import { setHpPnFormat } from '@src/utils/MemberUtil';

import FindAddress from '@src/components/common/popup/FindAddress';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

//mobile
import { SECTION_MYPAGE } from '@src/actions/types';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { m_mobile_number_list } from '@src/dummy';

/**
 * 회원 딜러 정보
 * @param {object} 회원 딜러 정보
 * @return {MemberSocietyInfo}
 */
const MemberSocietyInfo = ({ memberInfoPwd, onChange, msgObj, sendData = [], handleFullpage }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [addressPopup1, setAddressPopup1, openAddressPopup1, closeAddressPopup1] = useRodal(false);

  // console.log("MemberSocietyInfo:", memberInfoPwd)
  const [inputs, setInputs] = useState({
    entrZcd: memberInfoPwd.entrZcd,
    entrAddrEnc: memberInfoPwd.entrAddrEnc,
    entrDtlAddrEnc: memberInfoPwd.entrDtlAddrEnc
  });
  const { entrZcd, entrAddrEnc, entrDtlAddrEnc } = inputs; // 비구조화 할당을 통해 값 추출

  // 주소컴포넌트에 AddressEvent를 props로 보냄
  const AddressEvent1 = useCallback(
    (e) => {
      setInputs(
        produce((draft) => {
          draft.entrZcd = e.postCode;
          draft.entrAddrEnc = e.addData;
          draft.entrDtlAddrEnc = e.detailText;
        })
      );

      const objNew = {
        entrZcd: e.postCode,
        entrAddrEnc: e.addData,
        entrDtlAddrEnc: e.detailText
      };

      onChange(objNew);
      closeAddressPopup1();
    },
    [entrZcd, entrAddrEnc, entrDtlAddrEnc, closeAddressPopup1]
  );

  //common fileUpload
  const comFileUpload = (files, target) => {
    const objNew = { [target]: files[0] };
    onChange(objNew);
  };

  const onHandleChange = (e) => {
    onChange(e);
  };
  //mbPrtnDvcd

  //모바일용
  useEffect(() => {
    if (sendData.length > 0) {
      AddressEvent1(sendData[0], sendData[1]);
    }
  }, [sendData]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  if (hasMobile) {
    // InputFile & InputPicture
    const uploadList1 = (files) => {
      //   const _files = Object.values(files);
      //   _files.map(v => console.log(v));
    };

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
                <p className="tx-tit">{memberInfoPwd.mbTpcd === '0030' ? '소속상사명' : '제휴법인명'}</p>
                <Input type="text" id="member-id" height={40} value={memberInfoPwd.entrCorpNm} disabled={true} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">대표자명</p>
                <Input type="text" id="m-member-modify2-2" height={40} value={memberInfoPwd.reprNm} disabled={true} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">대표자 휴대폰번호</p>
                <Input type="text" id="m-member-modify2-2" height={40} value={setHpPnFormat(memberInfoPwd.reprHpnoEnc)} disabled={true} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">사업자 등록번호</p>
                <Input type="text" id="m-member-modify2-2" height={40} value={memberInfoPwd.mbBrn} disabled={true} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">사업자 주소</p>
                <span className="bridge2">
                  <Input type="text" name="entrZcd" disabled={true} height={40} width="73%" value={entrZcd} onChange={onHandleChange} />
                  <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpage} />
                </span>
                <span className="bridge2">
                  <Input type="text" name="entrAddrEnc" disabled={true} height={40} value={entrAddrEnc} onChange={onHandleChange} />
                </span>
                <span className="bridge2">
                  <Input type="text" name="entrDtlAddrEnc" height={40} placeHolder="상세주소" value={entrDtlAddrEnc} onChange={onHandleChange} />
                </span>
                <p className="tx-sub tx-red80">{msgObj.chkEntrAddrMsg}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">소속단지</p>
                <div className="select-wrap col3">
                  <Input type="text" value={memberInfoPwd.mrktCmplxNm} disabled={true} width="27%" />
                  <Input type="text" value={memberInfoPwd.mrktCmplxNm} disabled={true} width="28%" />
                  <Input type="text" value={memberInfoPwd.mrktCmplxNm} disabled={true} width="38%" />
                </div>
                <p className="tx-sub tx-red80">{msgObj.chkCmplxMsg}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">이메일</p>
                <span className="bridge2">
                  <Input type="text" name="mbEmlAddrEnc" height={40} onChange={onHandleChange} value={memberInfoPwd.mbEmlAddrEnc} />
                </span>
                <p className="tx-sub tx-red80">{msgObj.chkEmlMsg}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">사업자등록증 이미지</p>
                <MobInputFile uploadList={(e) => comFileUpload(e, 'blFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                <div className="tx-sub">{memberInfoPwd.blFileNm}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">관리사업자등록증 이미지</p>
                <MobInputFile uploadList={(e) => comFileUpload(e, 'mgmtBlFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                <div className="tx-sub">{memberInfoPwd.mgmtBlFileNm}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">법인인감증명서 이미지</p>
                <MobInputFile uploadList={(e) => comFileUpload(e, 'corpcertFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                <div className="tx-sub">{memberInfoPwd.corpcertFileNm}</div>
              </td>
            </tr>
            {memberInfoPwd.mbTpcd === '0040' && (
              <tr>
                <td colSpan="2">
                  <p className="tx-tit">업무제휴계약서 이미지</p>
                  <MobInputFile uploadList={(e) => comFileUpload(e, 'mbWrkPrtnCntrFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                  <div className="tx-sub">{memberInfoPwd.mbWrkPrtnCntrFileNm}</div>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="2">
                <p className="tx-tit">
                  위임장 이미지<em>(선택)</em>
                </p>
                <MobInputFile uploadList={(e) => comFileUpload(e, 'mbPoaFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                <div className="tx-sub">{memberInfoPwd.mbPoaFileNm}</div>
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
            <th>{memberInfoPwd.mbTpcd === '0030' ? '소속상사명' : '제휴법인명'}</th>
            <td>{memberInfoPwd.entrCorpNm}</td>
          </tr>
          <tr>
            <th>대표자명</th>
            <td>{memberInfoPwd.reprNm} </td>
          </tr>
          <tr>
            <th>대표자 휴대폰번호</th>
            <td>{setHpPnFormat(memberInfoPwd.reprHpnoEnc)}</td>
          </tr>
          <tr>
            <th>사업자등록번호</th>
            <td>{memberInfoPwd.mbBrn}</td>
          </tr>
          <tr className="address">
            <th>사업자 주소</th>
            <td className="address">
              <span className="bridge2">
                <Input type="text" disabled={true} width={110} name="entrZcd" onChange={onHandleChange} value={entrZcd} />
                <Button size="big" background="gray" title="우편번호" width={140} height={40} onClick={(e) => openAddressPopup1(e, 0)} buttonMarkup={true} />
                <br />
              </span>
              <span className="bridge2">
                <Input type="text" disabled={true} id="member-modify2-6" width={258} height={40} name="entrAddrEnc" onChange={onHandleChange} value={entrAddrEnc} />
                <Input type="text" id="member-modify2-17" width={258} height={40} name="entrDtlAddrEnc" onChange={onHandleChange} value={entrDtlAddrEnc} />
              </span>
              <p className="tx-sub tx-red80">{msgObj.chkEntrAddrMsg}</p>
            </td>
          </tr>
          <tr>
            <th>소속단지</th>
            <td>
              <Input type="text" value={memberInfoPwd.locCdNm} disabled={true} width={170} />
              &nbsp;
              <Input type="text" value={memberInfoPwd.ctyCdNm} disabled={true} width={170} />
              &nbsp;
              <Input type="text" value={memberInfoPwd.mrktCmplxNm} disabled={true} width={170} />
              <p className="tx-sub tx-red80">{msgObj.chkCmplxMsg}</p>
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <Input type="text" width={548} height={40} name="mbEmlAddrEnc" onChange={onHandleChange} value={memberInfoPwd.mbEmlAddrEnc} />
              <p className="tx-sub tx-red80">{msgObj.chkEmlMsg}</p>
            </td>
          </tr>
          <tr>
            <th>사업자등록증 이미지</th>
            <td>
              {memberInfoPwd.blFileNm}
              <InputFile uploadList={(e) => comFileUpload(e, 'blFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
            </td>
          </tr>
          <tr>
            <th>관리자사업등록증 이미지</th>
            <td>
              {memberInfoPwd.mgmtBlFileNm}
              <InputFile uploadList={(e) => comFileUpload(e, 'mgmtBlFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
            </td>
          </tr>
          <tr>
            <th>법인인감증명서 이미지</th>
            <td>
              {memberInfoPwd.corpcertFileNm}
              <InputFile uploadList={(e) => comFileUpload(e, 'corpcertFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
            </td>
          </tr>
          {memberInfoPwd.mbTpcd === '0040' && (
            <tr>
              <th>업무제휴계약서 이미지</th>
              <td>
                {memberInfoPwd.mbWrkPrtnCntrFileNm}
                <InputFile uploadList={(e) => comFileUpload(e, 'mbWrkPrtnCntrFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
              </td>
            </tr>
          )}
          <tr>
            <th>
              위임장 이미지<em>(선택)</em>
            </th>
            <td>
              {memberInfoPwd.mbPoaFileNm}
              <InputFile uploadList={(e) => comFileUpload(e, 'mbPoaFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

MemberSocietyInfo.propTypes = {
  memberInfoPwd: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  handleFullpage: PropTypes.func
};

export default MemberSocietyInfo;
