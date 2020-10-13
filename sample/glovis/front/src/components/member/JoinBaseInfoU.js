/* eslint-disable prettier/prettier */
/**
 * 설명 : 회원 기본 정보
 * @fileoverview 기본 회원정보
 * @requires :
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { produce } from 'immer';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import FindAddress from '@src/components/common/popup/FindAddress';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import SelectBox from '@lib/share/items/SelectBox';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

//mobile
import { SECTION_MEMBER, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobSelectList from '@lib/share/items/MobSelectList';
/**
 * 회원 기본 정보
 * @param {object} 회원 정보
 * @return {JoinBaseInfoU}
 */
const JoinBaseInfoU = ({ mbInfo, onChange, msgObj, onBlur, mbTpcd, onClick, resetFlag }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { FM004List } = useSelector((state) => ({
    FM004List: state.commonCode.commonCodeList.FM004 ? state.commonCode.commonCodeList.FM004 : [] //이메일
  }));
  const [mbPwdEnc, setMbPwdEnc] = useState('');
  const [mbPwdEncChk, setMbPwdEncChk] = useState('');
  const [emlDomain, setEmlDomain] = useState('0000');
  const [emlReadOnly, setReadOnly] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false);
  const necessMsg = mbTpcd === '0010' ? '(선택)' : '';
  const viewFlag = ['0010', '0020'].includes(mbTpcd); //mbTpcd 별 분기

  const [inputs, setInputs] = useState({
    mbZcd: '',
    mbAddrEnc: '',
    mbDtlAddrEnc: '',
    mbEmlAddrDomain: ''
  });
  const { mbZcd, mbAddrEnc, mbDtlAddrEnc, mbEmlAddrDomain } = inputs; // 비구조화 할당을 통해 값 추출

  const comSetAddress = (data) => {
    setInputs(
      produce((draft) => {
        draft.mbZcd = data.postCode;
        draft.mbAddrEnc = data.addData;
        draft.mbDtlAddrEnc = data.detailText;
        draft.locCd = data.locCd;
        draft.ctyCd = data.ctyCd;
      })
    );
    const objNew = {
      mbZcd: data.postCode,
      mbAddrEnc: data.addData,
      mbDtlAddrEnc: data.detailText,
      locCd: data.locCd,
      ctyCd: data.ctyCd
    };

    onChange(objNew);
  };

  // 주소컴포넌트에 AddressEvent를 props로 보냄
  const AddressEvent = useCallback(
    (e) => {
      /* 
      setInputs({
        mbZcd: e.postCode,
        mbAddrEnc: e.addData,
        mbDtlAddrEnc: e.detailText,
        locCd: e.locCd,
        ctyCd: e.ctyCd
      });
      const objNew = {
        mbZcd: e.postCode,
        mbAddrEnc: e.addData,
        mbDtlAddrEnc: e.detailText,
        locCd: e.locCd,
        ctyCd: e.ctyCd
      };
      onChange(objNew);
      */
      comSetAddress(e);
      closeAddressPopup();
    },
    [mbZcd, mbAddrEnc, mbDtlAddrEnc, closeAddressPopup]
  );

  //select changeemlDomain
  const onHandleSelect = (e, target) => {
    let value = '';

    if (hasMobile) {
      setEmlDomain(e.target.dataset.label);
      if (e.target.value !== '0000') {
        value = e.target.dataset.label;
      }
    } else {
      setEmlDomain(e.cdNm);
      if (e.value !== '0000') {
        value = e.cdNm;
        setReadOnly(true);
      } else {
        //  value = inputs.mbEmlAddrDomain;
        value = '';
        setReadOnly(false);
      }
    }

    setInputs(
      produce((draft) => {
        draft[target] = value;
      })
    );
    onChange({ [target]: value });
  };

  const onHandleIdDup = (e) => {
    onClick(e);
  };

  const onHandleBlur = (e) => {
    onBlur(e);
  };

  const onHandleChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    dispatch(getCommonCodeList('FM004')); //이메일
  }, []);

  useEffect(() => {
    if (resetFlag) {
      setMbPwdEnc('');
      setMbPwdEncChk('');
      const objNew = {
        mbPwdEnc: '',
        mbPwdEncChk: ''
      };
      onChange(objNew);
    }
  }, [resetFlag]);

  if (hasMobile) {
    // 풀페이지 팝업 START
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [fpAddress, setFpAddress] = useState(false); // 달력 팝업

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'Address') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '우편번호',
              options: ['back', 'close']
            }
          });
          setFpAddress(true);
        }
      },
      [fpAddress]
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const AddressCallback = useCallback(
      (e, result, target) => {
        console.log(target);
        e.preventDefault();
        comSetAddress(result);
        setFpAddress(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      },
      [fpAddress]
    );
    // 풀페이지 팝업 END

    return (
      <>
        <MobFullpagePopup active={mFullpagePopup}>{fpAddress && <FindAddress AddressEvent={AddressCallback} />}</MobFullpagePopup>
        <table summary="가입정보입력에 대한 내용" className="table-tp2 th-none">
          <caption className="away">가입정보입력</caption>
          <tbody>
            <tr>
              <td>
                <p className="tx-tit">아이디</p>
                <Input
                  type="text"
                  placeHolder="영문 숫자 포함 5~15자로 입력해주세요"
                  id="m-user-id"
                  height={40}
                  width="73%"
                  name="mbId"
                  onChange={onHandleChange}
                  onKeyUp={onHandleBlur}
                  maxLength={15}
                />
                <Button size="mid" background="blue80" radius={true} title="중복확인" measure={'%'} width={24.5} mgMeasure={'%'} marginLeft={2.5} buttonMarkup={true} onClick={onHandleIdDup} />
                <p className="tx-sub tx-red80 mt8">{msgObj.chkIdMsg}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="tx-tit">비밀번호</p>
                <Input
                  type="password"
                  placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                  id="m-user-pw"
                  height={40}
                  maxLength={15}
                  name="mbPwdEnc"
                  onChange={(e) => {
                    setMbPwdEnc(e.target.value);
                    onHandleChange(e);
                  }}
                  onBlur={(e) => {
                    setMbPwdEnc(e.target.value);
                    onHandleBlur(e);
                  }}
                  value={mbPwdEnc}
                />
                <p className="tx-sub tx-red80 mt8">{msgObj.chkPwdMsg}</p>
                <p className="tx-tit mt16">비밀번호 확인</p>
                <Input
                  type="password"
                  placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                  id="m-pw-chk"
                  height={40}
                  maxLength={15}
                  name="mbPwdEncChk"
                  onChange={(e) => {
                    setMbPwdEncChk(e.target.value);
                    onHandleChange(e);
                  }}
                  onBlur={(e) => {
                    setMbPwdEncChk(e.target.value);
                    onHandleBlur(e);
                  }}
                  value={mbPwdEncChk}
                />
              </td>
            </tr>
            {viewFlag && (
              <>
                <tr>
                  <td>
                    <p className="tx-tit">이름</p>
                    <Input type="text" id="m-user-name" height={40} name="mbNm" onChange={onHandleChange} maxLength={50} />
                    <p className="tx-sub tx-red80">{msgObj.chkNmMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">휴대폰번호</p>
                    <span className="bridge2">
                      <Input type="text" id="m-user-phone" height={40} name="mbHpPnEnc" onChange={onHandleChange} maxLength={11} numberOnly={true} />
                    </span>
                    <p className="tx-sub tx-red80">{msgObj.chkHpMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">이메일</p>
                    <span className="bridge2">
                      <Input type="text" id="m-user-email1" height={40} width="43%" maxLength={50} name="mbEmlAddr" onChange={onHandleChange} onBlur={onHandleBlur} />
                      @
                      <Input type="text" id="m-user-email2" height={40} width="43%" maxLength={50} name="mbEmlAddrDomain" onChange={onHandleChange} onBlur={onHandleBlur} value={mbEmlAddrDomain} />
                      <MobSelectList
                        itemsSource={FM004List}
                        selectedItem={(FM004List || []).find((x) => x.value === (inputs || emlDomain))}
                        //selectedItem={(FM004List || []).find((x) => x.value === (inputs || {}).emlDomain)}
                        //selectedItem={find(FM004List, ['value', emlDomain])}
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        placeHolder={'직접입력'}
                        width="70%"
                        onChange={(e) => onHandleSelect(e, 'mbEmlAddrDomain')}
                      />
                    </span>
                    <p className="tx-sub tx-red80">{msgObj.chkEmlMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">
                      주소<em>{necessMsg}</em>
                    </p>
                    <span className="bridge2">
                      <Input type="text" height={40} disabled={true} id="m-post" width="73%" value={mbZcd} name="mbZcd" onChange={onHandleChange} />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpagePopup('Address')} />
                    </span>
                    <span className="bridge2">
                      <Input type="text" height={40} disabled={true} id="m-address" value={mbAddrEnc} name="mbAddrEnc" onChange={onHandleChange} />
                    </span>
                    <span className="bridge2">
                      <Input
                        type="text"
                        height={40}
                        id="m-address2"
                        value={mbDtlAddrEnc}
                        maxLength={100}
                        name="mbDtlAddrEnc"
                        onChange={onHandleChange}
                        placeHolder={mbTpcd === '0010' ? '회사주소와 팀명 입력해주세요' : '상세주소'}
                      />
                    </span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </>
    );
  }
  //pc
  return (
    <>
      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
        <FindAddress AddressEvent={AddressEvent} />
      </RodalPopup>
      <table summary="가입정보입력에 대한 내용" className="table-tp2">
        <caption className="away">가입정보입력</caption>
        <colgroup>
          <col width="32%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <label htmlFor="user-id-join">아이디</label>
            </th>
            <td>
              <span className="bridge">
                <Input type="text" placeHolder="영문 숫자 포함 5~15자로 입력해주세요" id="user-id-join" width={308} name="mbId" onChange={onHandleChange} onKeyUp={onHandleBlur} maxLength={15} />
              </span>
              <Button size="mid" background="gray" title="중복확인" width={160} height={48} buttonMarkup={true} onClick={onHandleIdDup} />
              <p className="tx-sub">{msgObj.chkIdMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="user-pw">비밀번호</label>
            </th>
            <td>
              <Input
                type="password"
                placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                id="user-pw"
                width={548}
                maxLength={15}
                name="mbPwdEnc"
                onChange={(e) => {
                  setMbPwdEnc(e.target.value);
                  onHandleChange(e);
                }}
                onBlur={(e) => {
                  setMbPwdEnc(e.target.value);
                  onHandleBlur(e);
                }}
                value={mbPwdEnc}
              />
              <p className="tx-sub">{msgObj.chkPwdMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="pw-chk">비밀번호 확인</label>
            </th>
            <td>
              <Input
                type="password"
                placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                id="pw-chk"
                width={548}
                maxLength={15}
                name="mbPwdEncChk"
                onChange={(e) => {
                  setMbPwdEncChk(e.target.value);
                  onHandleChange(e);
                }}
                onBlur={(e) => {
                  setMbPwdEncChk(e.target.value);
                  onHandleBlur(e);
                }}
                value={mbPwdEncChk}
              />
            </td>
          </tr>
          {viewFlag && (
            <>
              <tr>
                <th>
                  <label htmlFor="user-name">이름</label>
                </th>
                <td>
                  <Input type="text" id="user-mbNm-join" width={308} name="mbNm" onChange={onHandleChange} maxLength={50} />
                  <p className="tx-sub">{msgObj.chkNmMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user-phone">휴대폰 번호</label>
                </th>
                <td>
                  <Input type="text" id="user-mbHpPnEnc-join" width={308} name="mbHpPnEnc" onChange={onHandleChange} maxLength={11} numberOnly={true} />
                  <p className="tx-sub">{msgObj.chkHpMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user-email">이메일</label>
                </th>
                <td>
                  <Input type="text" id="user-email" width={140} maxLength={50} name="mbEmlAddr" onChange={onHandleChange} onBlur={onHandleBlur} />
                  <em className="mg8">@</em>
                  <Input
                    type="text"
                    id="user-emai3"
                    width={173}
                    maxLength={50}
                    name="mbEmlAddrDomain"
                    onChange={(e) => {
                      setInputs(
                        produce((draft) => {
                          draft.mbEmlAddrDomain = e.target.value;
                        })
                      );
                      onHandleChange(e);
                    }}
                    onBlur={(e) => {
                      setInputs(
                        produce((draft) => {
                          draft.mbEmlAddrDomain = e.target.value;
                        })
                      );
                      onHandleBlur(e);
                    }}
                    value={mbEmlAddrDomain}
                    readOnly={emlReadOnly}
                  />
                  <SelectBox
                    id="user-email2"
                    className="items-sbox"
                    name="emlDomain"
                    options={FM004List}
                    width={200}
                    height={48}
                    placeHolder="선택해주세요."
                    value={emlDomain}
                    onChange={(e) => onHandleSelect(e, 'mbEmlAddrDomain')}
                  />
                  <p className="tx-sub">{msgObj.chkEmlMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="address">
                    주소<em>{necessMsg}</em>
                  </label>
                </th>
                <td>
                  <span className="bridge2">
                    <Input type="text" disabled={true} id="post" width={308} value={mbZcd} name="mbZcd" onChange={onHandleChange} />
                    <Button size="mid" background="gray" title="우편번호" width={160} height={48} marginLeft={10} onClick={(e) => openAddressPopup(e, 0)} buttonMarkup={true} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" disabled={true} id="address" width={548} value={mbAddrEnc} name="mbAddrEnc" onChange={onHandleChange} />
                  </span>
                  <span className="bridge2">
                    <Input
                      type="text"
                      id="address2"
                      width={548}
                      value={mbDtlAddrEnc}
                      maxLength={100}
                      name="mbDtlAddrEnc"
                      onChange={onHandleChange}
                      placeHolder={mbTpcd === '0010' ? '회사주소와 팀명 입력해주세요' : '상세주소'}
                    />
                  </span>
                  <p className="tx-sub">{msgObj.chkAddrMsg}</p>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

JoinBaseInfoU.propTypes = {
  mbInfo: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  onBlur: PropTypes.func,
  mbTpcd: PropTypes.string,
  onClick: PropTypes.func,
  resetFlag: PropTypes.any
};

export default JoinBaseInfoU;
