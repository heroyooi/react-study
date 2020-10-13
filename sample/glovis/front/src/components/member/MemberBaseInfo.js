/**
 * 설명 : 회원 기본 정보
 * @fileoverview 기본 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import Certification from '@src/components/common/Certification';
import CertificationMod from '@src/components/common/CertificationMod';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import { setHpPnFormat } from '@src/utils/MemberUtil';

import FindAddress from '@src/components/common/popup/FindAddress';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_MYPAGE, MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

/**
 * 회원 기본 정보
 * @param {object} 회원 정보
 * @return {MemberBaseInfo}
 */
const MemberBaseInfo = ({ memberInfoPwd, onChange, msgObj, sendData = [], handleFullpage }) => {
  console.log('MemberBaseInfo:', memberInfoPwd);
  const dispatch = useDispatch();

  const { showAlert } = useContext(SystemContext);
  // eslint-disable-next-line no-unused-vars
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);
  // eslint-disable-next-line no-unused-vars
  const [certData, setCertData] = useState({}); //휴대폰본인인증
  const [certShow, setCertShow] = useState(false); //본인인증
  const necessMsg = memberInfoPwd.mbTpcd === '0010' ? '(선택)' : '';
  const viewFlag = ['0010', '0020'].includes(memberInfoPwd.mbTpcd); //mbTpcd 별 분기

  const [inputs, setInputs] = useState({
    mbZcd: memberInfoPwd.mbZcd,
    mbAddrEnc: memberInfoPwd.mbAddrEnc,
    mbDtlAddrEnc: memberInfoPwd.mbDtlAddrEnc,
    mbNm: memberInfoPwd.mbNm,
    mbHpPnEnc: memberInfoPwd.mbHpPnEnc
  });
  const { mbZcd, mbAddrEnc, mbDtlAddrEnc, mbNm, mbHpPnEnc } = inputs; // 비구조화 할당을 통해 값 추출
  const hasMobile = useSelector((state) => state.common.hasMobile);

  //본인인증 click
  const onHandleCertClick = (e) => {
    if (e) e.preventDefault();
    setCertShow(true);
  };

  const certCallback = useCallback((e) => {
    setCertShow(false);
    // 모바일인 경우, 본인 인증팝업창 닫기
    if (hasMobile) {
      dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
    }

    if (e.RETURN_CD === '0000') {
      const mbCi = e.LGD_AUTHSUB_CI;
      const mbNm = e.LGD_MOBILE_SUBAUTH_NAME;
      const mbHpPnEnc = e.LGD_MOBILENUM;

      //본인폰인지 체크
      axiosPost('/api/member/selectMbByCi.do', { mbCi: mbCi }).then(({ data }) => {
        console.log('data:', data);
        if (data.data === 1) {
          setInputs({
            ...inputs,
            mbNm: mbNm,
            mbHpPnEnc: mbHpPnEnc
          });
          const objNew = {
            mbCi: mbCi,
            mbNm: mbNm,
            mbHpPnEnc: mbHpPnEnc
          };
          onChange(objNew);
        } else {
          showAlert('[본인명의의 휴대폰만 변경가능합니다.]');
        }
      });
    }
  }, []);

  // 주소컴포넌트에 AddressEvent를 props로 보냄
  const AddressEvent = useCallback(
    (e) => {
      setInputs(
        produce((draft) => {
          draft.mbZcd = e.postCode;
          draft.mbAddrEnc = e.addData;
          draft.mbDtlAddrEnc = e.detailText;
          draft.locCd = e.locCd;
          draft.ctyCd = e.ctyCd;
        })
      );

      const objNew = {
        mbZcd: e.postCode,
        mbAddrEnc: e.addData,
        mbDtlAddrEnc: e.detailText,
        locCd: e.locCd,
        ctyCd: e.ctyCd
      };

      onChange(objNew);
      closeAddressPopup();
    },
    [onChange, closeAddressPopup]
  );

  //포커스아웃 처리
  const onBlurAll = () => {
    /*
    if(e.target.name === 'mbEmlAddrEnc') {
      setChkEmlMsg(chkEmlAddr(e.target.value))

    }*/
  };

  const onHandleChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  //모바일용
  useEffect(() => {
    if (sendData.length > 0) {
      AddressEvent(sendData[0], sendData[1]);
    }
  }, [sendData]);

  if (hasMobile) {
    const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);
    const handleCertpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'cert') {
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '휴대폰번호 변경',
              options: ['close']
            }
          });
          setCertShow(true);
        }
      },
      []
    );

    return (
      <>
        <table className="table-tp2 th-none" summary="회원정보 수정 내용">
          <caption className="away">회원정보 수정</caption>
          <tbody>
            <tr>
              <td>
                <p className="tx-tit">아이디</p>
                <Input type="text" id="member-id" height={40} value={memberInfoPwd.mbId} disabled={true} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="tx-tit">이름</p>
                <Input type="text" id="member-name" height={40} value={mbNm} disabled={true} />
              </td>
            </tr>
            {viewFlag && (
              <>
                <tr>
                  <td>
                    <p className="tx-tit">휴대폰번호</p>
                    <span className="bridge2">
                      <Input type="text" height={40} value={setHpPnFormat(mbHpPnEnc)} width="73%" disabled={true} />
                      <Button size="mid" background="blue80" radius={true} title="변경" measure={'%'} width={24.5} onClick={handleCertpagePopup('cert', 1)} />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">이메일</p>
                    <Input type="text" name="mbEmlAddrEnc" height={40} onChange={onHandleChange} value={memberInfoPwd.mbEmlAddrEnc} />
                    <p className="tx-sub tx-red80">{msgObj.chkEmlMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">
                      주소<em>(선택)</em>
                    </p>
                    <span className="bridge2">
                      <Input type="text" height={40} id="m-post" name="mbZcd" width="73%" disabled={true} value={mbZcd} onChange={onHandleChange} />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpage} />
                    </span>
                    <span className="bridge2">
                      <Input type="text" height={40} disabled={true} id="m-address" name="mbAddrEnc" value={mbAddrEnc} onChange={onHandleChange} />
                    </span>
                    <span className="bridge2">
                      <Input type="text" height={40} disabled={false} id="m-address2" name="mbDtlAddrEnc" value={mbDtlAddrEnc} onChange={onHandleChange} />
                      <p className="tx-sub tx-red80">{msgObj.chkAddrMsg}</p>
                    </span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <MobFullpagePopup active={mFullpageCPopup} cPop={true}>
          <CertificationMod show={certShow} callback={certCallback} />
        </MobFullpagePopup>
      </>
    );
  }
  return (
    <>
      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress AddressEvent={AddressEvent} />
      </RodalPopup>
      <table className="table-tp1 input" summary="회원정보 수정 내용">
        <caption className="away">회원정보 수정</caption>
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>{memberInfoPwd.mbId}</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>{mbNm}</td>
          </tr>
          {viewFlag && (
            <>
              <tr>
                <th>휴대폰 번호</th>
                <td>
                  {setHpPnFormat(mbHpPnEnc)}
                  <Button size="mid" background="gray" title="휴대폰번호 변경 (본인명의만 가능)" width={260} height={48} marginLeft={20} onClick={onHandleCertClick} buttonMarkup={true} />
                  <Certification data={certData} show={certShow} callback={certCallback} />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <Input type="text" width={548} name="mbEmlAddrEnc" onChange={onHandleChange} value={memberInfoPwd.mbEmlAddrEnc} onBlur={onBlurAll} maxLength={100} />
                  <p className="tx-sub tx-red80">{msgObj.chkEmlMsg}</p>
                </td>
              </tr>
              <tr className="address">
                <th>
                  주소<em> {necessMsg}</em>
                </th>
                <td className="address">
                  <span className="bridge2">
                    <Input type="text" disabled={true} width={378} name="mbZcd" onChange={onHandleChange} value={mbZcd} />
                    <Button size="mid" background="gray" title="우편번호" width={160} height={48} onClick={(e) => openAddressPopup(e, 0)} buttonMarkup={true} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" disabled={true} width={548} name="mbAddrEnc" onChange={onHandleChange} value={mbAddrEnc} />
                    <Input type="text" placeHolder="상세주소" width={548} marginTop={10} name="mbDtlAddrEnc" onChange={onHandleChange} value={mbDtlAddrEnc} maxLength={100} />
                    <p className="tx-sub tx-red80">{msgObj.chkAddrMsg}</p>
                  </span>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

MemberBaseInfo.propTypes = {
  memberInfoPwd: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  sendData: PropTypes.array,
  handleFullpage: PropTypes.func
};

export default MemberBaseInfo;
