/**
 * 설명 : 회원 딜러 정보
 * @fileoverview 딜러 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import InputFile from '@lib/share/items/InputFile';
import RadioGroup from '@lib/share/items/RadioGroup';
import FindAddress from '@src/components/common/popup/FindAddress';
import { setHpPnFormat, setDateFormat } from '@src/utils/MemberUtil';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

//mobile
// eslint-disable-next-line no-unused-vars
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
/**
 * 회원 딜러 정보
 * @param {object} 회원 딜러 정보
 * @return {JoinSocietyInfo}
 */
const JoinSocietyInfo = ({ mbInfo, onChange, msgObj, onBlur, mbTpcd }) => {
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);
  const { FM025List, FM054List, FM056List } = useSelector((state) => ({
    FM025List: state.commonCode.commonCodeList.FM025 ? state.commonCode.commonCodeList.FM025 : [], //가입구분 형태
    FM054List: state.commonCode.commonCodeList.FM054 ? state.commonCode.commonCodeList.FM054 : [], //사업자 형태
    FM056List: state.commonCode.commonCodeList.FM056 ? state.commonCode.commonCodeList.FM056 : [] //프로필 이미지 형태
  }));

  // eslint-disable-next-line no-unused-vars
  const [addressPopup1, setAddressPopup1, openAddressPopup1, closeAddressPopup1] = useRodal(false);

  //  console.log("msgObj2:", msgObj)
  console.log('JoinSocietyInfo:', mbInfo);
  const dispatch = useDispatch();
  const viewFlag = ['0040'].includes(mbTpcd); //mbTpcd 별 분기
  const [viewNo, setViewNo] = useState(true);

  const [inputs, setInputs] = useState({
    entrZcd: '',
    entrAddrEnc: '',
    entrDtlAddrEnc: ''
  });
  const { entrZcd, entrAddrEnc, entrDtlAddrEnc } = inputs; // 비구조화 할당을 통해 값 추출

  // 주소컴포넌트에 AddressEvent를 props로 보냄
  const AddressEvent1 = useCallback(
    (e) => {
      setInputs({
        entrZcd: e.postCode,
        entrAddrEnc: e.addData,
        entrDtlAddrEnc: e.detailText
      });
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

  const onHandleBlur = (e) => {
    onBlur(e);
  };

  //radio change
  const onHandleRadio = (e, target) => {
    let objNew = {
      [target]: e.target.value
    };
    if (e.target.value === '0020') {
      setViewNo(false);
      objNew = {
        [target]: e.target.value,
        admnEntrRegNo: ''
      };
    } else {
      setViewNo(true);
    }

    onChange(objNew);
  };

  //공통코드
  useEffect(() => {
    dispatch(getCommonCodeList('FM025')); //제휴 가입구분
    dispatch(getCommonCodeList('FM054')); //사업자 형태
    dispatch(getCommonCodeList('FM056')); //프로필 사진
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){

    // InputFile & InputPicture
    const uploadList1 = (files) => {
      //  const _files = Object.values(files);
      //  _files.map(v => console.log(v));
    };

     // 풀페이지 팝업 START
     const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
     const [fpAddress, setFpAddress] = useState(false); // 주소 팝업
     
     const handleFullpagePopup = useCallback((name,seq) => e => {
        e.preventDefault();
        if (name === "Address") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '우편번호',
              options: ['back', 'close'],
            }
          });
          setFpTerms(false);
          setFpAddress(true);
        }
      }, [fpAddress]);
  
      const addressCallback = useCallback((e, result, target) => {
        e.preventDefault();
        setFpTerms(false);
        setFpAddress(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      }, [])
      // 풀페이지 팝업 END
  return (
    <>
    <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
        {fpAddress && <FindAddress AddressEvent={addressCallback}/>}
    </MobFullpagePopup>   
    <table summary="가입정보입력에 대한 내용" className="table-tp2 th-none">
        <caption className="away">가입정보입력</caption>
        <colgroup>
            <col width="33%" />
            <col width="67%" />
        </colgroup>
        <tbody>  
            {viewFlag &&         
            <tr>
                <th className="ver-t">제휴구분</th>
                <td>
                <RadioGroup dataList={[
                    { id: 'ally-sort1', value: '1', checked: true, disabled: false, label: '수입인증 중고차' },
                    { id: 'ally-sort2', value: '2', checked: false, disabled: false, label: '금융사인증 중고차' },
                    { id: 'ally-sort3', value: '3', checked: false, disabled: false, label: '프랜차이즈' }
                ]} className="v-3"/>
                </td>
            </tr> 
            }
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">{mbTpcd ==='0030' ? '소속상사명' : '제휴법인명'}</p>
                    <Input type="text" value="현대모터스" disabled={true} id="m-agency-name" height={40} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">대표자명</p>
                    <Input type="text" value="김현대" disabled={true} id="m-ceo-name" height={40} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">휴대폰번호</p>
                    <span className="bridge2">                  
                    <Input type="text" value="1234-5678" disabled={true} id="m-ceo-phone" height={40} width='67.5%' />                          
                    </span>
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">사업자등록번호</p>
                    <Input type="text" value="123-12-12345" disabled={true} id="m-agency-num" height={40} />                        
                </td>
            </tr>                    
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">사업자주소</p>
                    <span className="bridge2">
                    <Input type="text" height={40} value="12345" id="m-agency-post" width='73%' />
                    <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpagePopup("Address")} />
                    </span>
                    <span className="bridge2">
                    <Input type="text" height={40} value="서울특별시 강남구 테헤란로 301" id="m-agency-address" />
                    </span>
                    <span className="bridge2">
                    <Input type="text" height={40} value="현대글로비스(주)" id="m-agency-address2" />
                    </span>
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">소속단지</p>
                    <div className="halfselec-wrap">
                    <span className="halfselect">
                        <Input type="text" value="지역" disabled={true} id="m-agency-area" />
                    </span>
                    <span className="halfselect">
                        <Input type="text" value="단지" disabled={true} id="m-agency-area2" />
                    </span>
                    </div>
                </td>                       
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">이름(담당자명)</p>
                    <Input type="text" value="김현대" id="m-user-name" height={40} />                        
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">이메일</p>
                    <Input type="text" value="hyundai123@glovis.net" id="m-user-email" />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">사업자등록증 이미지</p>
                    <InputFile uploadList={uploadList1} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">관리사업자등록증 이미지</p>
                    <InputFile uploadList={uploadList1} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">법인인감증명서 이미지</p>
                    <InputFile uploadList={uploadList1} />
                </td>
            </tr>
            {viewFlag &&
            <tr>
                <td colSpan="2">
                <p className="tx-tit">업무제휴계약서</p>
                <InputFile uploadList={uploadList1} />
                {/*<Button size="full" line="gray" radius={true} title="업무제휴계약서 다운로드" height={40} marginTop={8} fontSize={14}/>*/}
                </td>
            </tr>
            }
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">위임장 이미지<em>(선택)</em></p>
                    <InputFile uploadList={uploadList1} />
                    <dl className="tx-sm-info">
                    <dd>대표자 대신 가입 시 위임장 이미지를 넣어주세요.</dd>
                    </dl>
                </td>
            </tr>                    
            <tr>
                <td colSpan="2">
                    <p className="tx-tit">프로필 사진<em>(선택)</em></p>
                    <RadioGroup dataList={[
                    { id: 'm-open', value: '1', checked: false, disabled: false, label: '공개' },
                    { id: 'm-non-open', value: '2', checked: true, disabled: false, label: '비공개' }
                    ]} className="v-2"/>
                    <InputFile uploadList={uploadList1} />
                    <dl className="tx-sm-info">
                    <dd>이미지 등록기준 : 80X100 사이즈 / JPG 파일</dd>
                    <dd>본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제 될 수도 있습니다.</dd>
                    </dl>
                </td>
            </tr>
            <tr>                      
                <td colSpan="2">
                    <p className="tx-tit">소속딜러 정보</p>
                    <dl className="tx-sm-info">
                    <dd>동일 소속의 딜러목록이 자동으로 노출됩니다.</dd>
                    <dd>마이페이지에서도 쉽게 소속딜러 관리를 하실 수 있습니다.</dd>
                    </dl>
                    <table summary="소속딜러 정보에 대한 내용" className="table-tp1 mt8">
                    <caption className="away">소속딜러 정보</caption>
                    <colgroup>
                        <col width="50px" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                        <th>대표</th>
                        <td>
                            김현대<br />
                            010-1234-5678
                        </td>
                        <td>
                            GG19-01865<br />
                            ( ~ YYYY.MM.DD)
                        </td>
                        </tr>
                        <tr>
                        <th>딜러</th>
                        <td>
                            김현대<br />
                            010-1234-5678
                        </td>
                        <td>
                            종사원증번호<br />
                            ( ~ 유효기간 만료일자)
                        </td>
                        </tr>
                    </tbody>
                    </table>
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
      <table summary="가입정보입력에 대한 내용" className="table-tp2">
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          {viewFlag && (
            <tr>
              <th>제휴구분</th>
              <td>
                <RadioGroup
                  onChange={(e) => onHandleRadio(e, 'mbPrtnDvcd')}
                  name="mbPrtnDvcd"
                  defaultValue={'0010'}
                  dataList={!isEmpty(FM025List) ? FM025List : [{ id: 'prtn_ex1', value: '', label: '' }]}
                  /* 
                    dataList={[
                    { id: 'prtn_ex1', name: 'mbPrtnDvcd', value: '0010',  disabled: false, title: '수입인증 중고차' },
                    { id: 'prtn_ex2', name: 'mbPrtnDvcd', value: '0020',  disabled: false, title: '금융사 인증 중고차' }
                    ]}    */
                />
              </td>
            </tr>
          )}
          <tr>
            <th>
              <label htmlFor="ally-name">{mbTpcd === '0030' ? '소속상사명' : '제휴법인명'}</label>
            </th>
            <td>
              <Input type="text" value={mbInfo.rtnMbInfo.entrCorpNm} disabled={true} id="ally-name" width={548} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="ceo-name">대표자명</label>
            </th>
            <td>
              <Input type="text" value={mbInfo.rtnMbInfo.reprNm} disabled={true} id="ceo-name" width={548} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="ceo-phone">대표자 휴대폰번호</label>
            </th>
            <td>
              <Input type="text" value={setHpPnFormat(mbInfo.rtnMbInfo.reprHpnoEnc)} disabled={true} id="ceo-phone" width={548} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="agency-num">사업자 등록번호</label>
            </th>
            <td>
              <Input type="text" value={mbInfo.rtnMbInfo.brn} disabled={true} id="agency-num" width={548} />
            </td>
          </tr>
          <tr>
            <th>사업자형태</th>
            <td>
              <span className="bridge2">
                <RadioGroup
                  onChange={(e) => onHandleRadio(e, 'entrTpCd')}
                  defaultValue="0010"
                  name="entrTpCd"
                  dataList={!isEmpty(FM054List) ? FM054List : [{ id: 'entrTpCd_ex1', value: '', label: '' }]}
                />
              </span>
            </td>
          </tr>
          {viewNo && (
            <tr>
              <th>
                <label htmlFor="manager-no">관리자 사업자번호</label>
              </th>
              <td>
                <Input type="text" value="" id="manager-no" width={548} name="admnEntrRegNo" onChange={onHandleChange} maxLength={13} numberOnly={true} />
                <p className="tx-sub">{msgObj.chkAdmnEntrMsg}</p>
              </td>
            </tr>
          )}
          <tr>
            <th>
              <label htmlFor="manager-type">업종</label>
            </th>
            <td>
              <Input type="text" value="" id="managerr-type" width={548} name="sctrsNm" onChange={onHandleChange} maxLength={100} />
              <p className="tx-sub">{msgObj.chkSctrsNmMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="agency-address">사업자 주소</label>
            </th>
            <td>
              <span className="bridge2">
                <Input type="text" disabled={true} id="post" width={120} name="entrZcd" onChange={onHandleChange} value={entrZcd} />
                <Button size="mid" background="gray" title="우편번호" width={160} height={48} marginLeft={10} buttonMarkup={true} onClick={(e) => openAddressPopup1(e, 0)} />
              </span>
              <span className="bridge2">
                <Input type="text" disabled={true} id="address" width={548} name="entrAddrEnc" onChange={onHandleChange} value={entrAddrEnc} />
              </span>
              <span className="bridge2">
                <Input type="text" placeHolder="상세주소" id="address2" width={548} value={entrDtlAddrEnc} name="entrDtlAddrEnc" onChange={onHandleChange} maxLength={100} />
              </span>
              <p className="tx-sub">{msgObj.chkEntrAddrMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="agency-area">소속단지</label>
            </th>
            <td>
              <Input type="text" value={mbInfo.rtnMbInfo.locCd} disabled={true} width={170} />
              &nbsp;
              <Input type="text" value={mbInfo.rtnMbInfo.ctyCd} disabled={true} width={170} />
              &nbsp;
              <Input type="text" value={mbInfo.rtnMbInfo.mrktCmplxNm} disabled={true} width={170} />
              <p className="tx-sub">{msgObj.chkCmplxMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="user-name">이름(담당자명)</label>
            </th>
            <td>
              <Input type="text" id="user-name" width={548} name="mbNm" onChange={onHandleChange} maxLength={100} />
              <p className="tx-sub">{msgObj.chkNmMsg}</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="user-email">이메일</label>
            </th>
            <td>
              <Input type="text" id="user-email" width={548} name="mbEmlAddrEnc" onChange={onHandleChange} onBlur={onHandleBlur} maxLength={200} />
              <p className="tx-sub">{msgObj.chkEmlMsg}</p>
            </td>
          </tr>
          <tr>
            <th>사업자등록증 이미지</th>
            <td>
              <InputFile uploadList={(e) => comFileUpload(e, 'blFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
              <p className="tx-sub">{msgObj.chkBlFileMsg}</p>
            </td>
          </tr>
          <tr>
            <th>관리사업자등록증 이미지</th>
            <td>
              <InputFile uploadList={(e) => comFileUpload(e, 'mgmtBlFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
              <p className="tx-sub">{msgObj.chkMgmtBlFileMsg}</p>
            </td>
          </tr>
          <tr>
            <th>법인인감증명서 이미지</th>
            <td>
              <InputFile uploadList={(e) => comFileUpload(e, 'corpcertFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
              <p className="tx-sub">{msgObj.chkCorpcertFileMsg}</p>
            </td>
          </tr>
          {viewFlag && (
            <tr>
              <th>업무제휴계약서</th>
              <td>
                <InputFile uploadList={(e) => comFileUpload(e, 'mbWrkPrtnCntrFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
                {/*<Button size="mid" background="gray" title="업무제휴계약서 다운로드" width={180} height={48} 
                    marginTop={10} Link="/images/dummy/graph1.jpg" buttonMarkup={true} />*/}
                <p className="tx-sub">{msgObj.chkMbWrkPrtnCntrFileMsg}</p>
              </td>
            </tr>
          )}
          <tr>
            <th>
              위임장 이미지<em>(선택)</em>
            </th>
            <td>
              <InputFile uploadList={(e) => comFileUpload(e, 'mbPoaFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
              <p className="tx-exp-tp6 line1">· 대표자 대신 가입 시 위임장 이미지를 넣어주세요.</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="profile-img">
                프로필 사진<em>(선택)</em>
              </label>
            </th>
            <td>
              <span className="bridge2">
                <RadioGroup
                  onChange={(e) => onHandleRadio(e, 'mbProfFileOpYn')}
                  defaultValue="Y"
                  name="mbProfFileOpYn"
                  dataList={!isEmpty(FM056List) ? FM056List : [{ id: 'prof_ex1', value: '', label: '' }]}
                  /*
                    dataList={[
                    { id: 'prof_ex1', name: 'mbProfFileOpYn', value: 'Y',  disabled: false, title: '공개' },
                    { id: 'prof_ex2', name: 'mbProfFileOpYn', value: 'N',  disabled: false, title: '비공개' }
                    ]}*/
                />
              </span>
              <InputFile uploadList={(e) => comFileUpload(e, 'mbProfFileIdList')} resVertical={true} accept="image/jpg" />
              <p className="tx-exp-tp6">· 이미지 등록기준 : 80X100 사이즈 / JPG 파일 · 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.</p>
            </td>
          </tr>
          <tr>
            <th>소속딜러 정보</th>
            <td>
              <table summary="소속딜러 정보에 대한 내용" className="table-tp1 th-c">
                <caption className="away">소속딜러 정보</caption>
                <colgroup>
                  <col width="26%" />
                  <col width="38%" />
                  <col width="38%" />
                </colgroup>
                <tbody>
                  {!isEmpty(mbInfo.dealerList) &&
                    mbInfo.dealerList.map((lists, index) => {
                      return (
                        <tr key={index}>
                          <th>{lists.mbJoinDvcd === '0020' ? '대표' : '딜러'}</th>
                          <td>
                            {lists.mbNm}
                            <br />
                            {setHpPnFormat(lists.mbHpPnEnc)}
                          </td>
                          <td>
                            {lists.mbEn}( ~ {setDateFormat(lists.mbEnEprYmd, '.')})
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <p className="tx-exp-tp6">· 동일 소속의 딜러목록이 자동으로 노출됩니다. · 마이페이지에서도 쉽게 소속딜러 관리를 하실 수 있습니다.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

JoinSocietyInfo.propTypes = {
  mbInfo: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  onBlur: PropTypes.func,
  mbTpcd: PropTypes.string
};

export default JoinSocietyInfo;
