/**
 * 설명 : 회원 딜러 정보 수정
 * @fileoverview 딜러 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import _, { isEmpty } from 'lodash';

import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import DatePicker from '@src/components/common/calendar/DatePicker';
import InputFile from '@lib/share/items/InputFile';
import MobInputFile from '@lib/share/items/MobInputFile';
import Button from '@lib/share/items/Button';

import { getLocationList } from '@src/actions/sellcar/locationAction';
import { getMrktCmplxList, getDetailLocationList } from '@src/actions/mypage/member/memberMngAction';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

//mobile
import { SECTION_MYPAGE } from '@src/actions/types';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * 회원 딜러 정보
 * @param {object} 회원 딜러 정보
 * @return {MemberDealerInfo}
 */
const MemberDealerInfo = ({ memberInfoPwd, onChange, msgObj, onClick }) => {
  const dispatch = useDispatch();
  const [mbBankcd, setMbBankcd] = useState(memberInfoPwd.mbBankcd); //은행코드
  const [locCd, setLocCd] = useState(memberInfoPwd.locCd); //시
  const [ctyCd, setCtyCd] = useState(memberInfoPwd.ctyCd); //군구
  const [seqNo, setSeqNo] = useState(memberInfoPwd.seqNo); //매매단지
  const [enVldStrtDt, setEnVldStrtDt] = useState(memberInfoPwd.enVldStrtDt); //종사시작
  const [mbEnEprYmd, setMbEnEprYmd] = useState(memberInfoPwd.mbEnEprYmd); //종사만료

  const objBase = [{ label: '선택', value: '' }];
  //지역, 매매단지, 거주군구, 은행
  const { locationList, mrktList, detailLocationList, FM053List } = useSelector((state) => ({
    locationList: state.sellcarLocation.locationList ? state.sellcarLocation.locationList : [],
    mrktList: state.memberMng.mrktList ? state.memberMng.mrktList : [],
    detailLocationList: state.memberMng.detailLocationList ? state.memberMng.detailLocationList : [],
    FM053List: state.commonCode.commonCodeList.FM053 ? objBase.concat(state.commonCode.commonCodeList.FM053) : objBase
  }));

  //common fileUpload
  const comFileUpload = (files, target) => {
    //console.log('===> comFileUpload files', files);
    const objNew = { [target]: files[0] };
    onChange(objNew);
  };

  //날짜변경
  const onHandleChangeYmd = (e, target) => {
    if (target === 'enVldStrtDt') {
      setEnVldStrtDt(e);
    } else {
      setMbEnEprYmd(e);
    }

    const objNew = {
      [target]: e.format('YYYYMMDD')
    };
    onChange(objNew);
  };

  const onHandleRadio = (value, target) => {
    const objNew = {
      [target]: value
    };
    onChange(objNew);
  };

  const onHandleChange = (e) => {
    onChange(e);
  };

  const onHandleClick = (e) => {
    onClick(e);
  };

  // 거주지역 군 선택
  useEffect(() => {
    if (!isEmpty(locCd)) {
      //  setCtyCd('')
      //  setSeqNo('')
      dispatch(getDetailLocationList(locCd));
    }
  }, [locCd]);

  //매매단지
  useEffect(() => {
    const obj = { locCd: locCd, ctyCd: ctyCd };
    dispatch(getMrktCmplxList(obj));
  }, [ctyCd]);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    //시(default)
    if (isEmpty(locationList)) {
      dispatch(getLocationList());
    }
    dispatch(getCommonCodeList('FM053')); //은행
  }, []);

  //mobile
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);
  //const [isDate1, setIsDate1] = useState(moment());
  //const [isDate2, setIsDate2] = useState(moment());
  const handleCalendarPop1 = (e) => {
    e.preventDefault();
    setCalPop1(true);
    preventScroll(true);
  };
  const handleCalendarPop2 = (e) => {
    e.preventDefault();
    setCalPop2(true);
    preventScroll(true);
  };
  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    setCalPop1(false);
    onHandleChangeYmd(date, 'enVldStrtDt');
    preventScroll(false);
  };
  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    setCalPop2(false);
    onHandleChangeYmd(date, 'mbEnEprYmd');
    preventScroll(false);
  };
  const calendarClose = (e) => {
    setCalPop1(false);
    setCalPop2(false);
    preventScroll(false);
  };
  const hasMobile = useSelector((state) => state.common.hasMobile);
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
    //const uploadList1 = (files) => {
    //   const _files = Object.values(files);
    //   _files.map(v => console.log(v));
    //};

    const [mobLocationList, setMobLocationList] = useState([]); //광역시도
    const [mobDetailLocationList, setMobDetailLocationList] = useState([]); // 시군구
    const [mobMrktList, setMobMrktList] = useState([]); // 매매단지
    const [mobFM053List, setMobFM053List] = useState([]); // 은행코드

    // MobSelectBox 값선택 이벤트 처리
    const onChangeSelect = (e, target) => {
      if (target === 'locCd') {
        setLocCd(mobLocationList[e.target.value - 1].codeValue);
        setCtyCd('');
        setSeqNo('');
      } else if (target === 'ctyCd') {
        setCtyCd(mobDetailLocationList[e.target.value - 1].codeValue);
        setSeqNo('');
      } else if (target === 'seqNo') {
        const value = mobMrktList[e.target.value - 1].codeValue;
        setSeqNo(value);
        onHandleRadio(value, target);
      } else if (target === 'mbBankcd') {
        const value = mobFM053List[e.target.value - 1].codeValue;
        setMbBankcd(value);
        onHandleRadio(value, target);
      }
    };

    // 모바일용 소속단지 코드표 생성 1
    useEffect(() => {
      const tmpArr = locationList.map((el, i) => {
        return { codeValue: el.value, id: `locCd_${i + 1}`, label: el.label, value: i + 1, checked: locCd === el.value ? true : false };
      });
      setMobLocationList(tmpArr);
    }, [locationList]);

    // 모바일용 소속단지 코드표 생성 2
    useEffect(() => {
      const tmpArr = detailLocationList.map((el, i) => {
        return { codeValue: el.value, id: `ctyCd_${i + 1}`, label: el.label, value: i + 1, checked: ctyCd === el.value ? true : false };
      });
      setMobDetailLocationList(tmpArr);
    }, [detailLocationList]);

    // 모바일용 소속단지 코드표 생성 3
    useEffect(() => {
      const tmpArr = mrktList.map((el, i) => {
        return { codeValue: el.value, id: `seqNo_${i + 1}`, label: el.label, value: i + 1, checked: seqNo == el.value ? true : false };
      });
      setMobMrktList(tmpArr);
      console.log('tmpArr 1: ', tmpArr);
    }, [mrktList]);

    // 모바일용 은행 코드표 생성 3
    const mountMobFM053 = useRef(false);
    useEffect(() => {
      if (!mountMobFM053.current && FM053List.length && FM053List.length > 1) {
        const tmpArr = FM053List.map((el, i) => {
          return { codeValue: el.value, id: `seqNo_${i + 1}`, label: el.label, value: i + 1, checked: mbBankcd === el.value ? true : false };
        });
        setMobFM053List(tmpArr);
        mountMobFM053.current = true;
      }
    }, [FM053List]);

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
                <p className="tx-tit">소속단지</p>
                <div className="select-wrap col3">
                  {/* <span className="halfselect">
                    <Input type="text" placeHolder="지역" id="m-member-modify9" />
                  </span>
                  <span className="halfselect">
                    <Input type="text" placeHolder="단지" id="m-member-modify10" />
                  </span> */}
                  <MobSelectBox options={mobLocationList} width="32%" onChange={(e) => onChangeSelect(e, 'locCd')} />
                  <MobSelectBox options={mobDetailLocationList} width="32%" onChange={(e) => onChangeSelect(e, 'ctyCd')} />
                  <MobSelectBox options={mobMrktList} width="32%" onChange={(e) => onChangeSelect(e, 'seqNo')} />
                  <p className="tx-sub tx-red80">{msgObj.chkCmplxMsg}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">소속상사명/대표자명</p>
                <Input
                  type="text"
                  placeHolder="소속상사명을 입력하세요."
                  id="m-member-modify7"
                  name="entrCorpNm"
                  height={40}
                  value={memberInfoPwd.entrCorpNm}
                  onChange={onHandleChange}
                  maxLength={30}
                />
                <Input
                  type="text"
                  placeHolder="소속상사 대표자명을 입력하세요."
                  id="m-member-modify8"
                  name="reprNm"
                  height={40}
                  marginTop={8}
                  value={memberInfoPwd.reprNm}
                  onChange={onHandleChange}
                  maxLength={30}
                />
                <p className="tx-sub tx-red80">{msgObj.chkEntrMsg}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">소속/사업자등록 번호</p>
                <Input
                  type="text"
                  placeHolder="사업자등록 번호를 입력하세요."
                  id="m-member-modify9"
                  name="mbBrn"
                  height={40}
                  value={memberInfoPwd.mbBrn}
                  onChange={onHandleChange}
                  maxLength={10}
                  numberOnly={true}
                />
                <p className="tx-sub tx-red80">{msgObj.chkMbBrnMsg}</p>
              </td>
            </tr>
            {/* <tr>
              <td colSpan="2">
                <p className="tx-tit">사업자번호</p>
                <Input type="text" placeHolder="사업자번호를 입력하세요." name="mbBrn" height={40} value={memberInfoPwd.mbBrn} onChange={onHandleChange} maxLength={10} numberOnly={true} />
              </td>
            </tr> */}
            <tr>
              <td colSpan="2">
                <p className="tx-tit">종사원증번호/유효기간</p>
                <Input type="text" placeHolder="사원증번호를 입력하세요." id="m-member-modify11" name="mbEn" height={40} value={memberInfoPwd.mbEn} onChange={onHandleChange} />
                <div className="mt8">
                  <DatePicker defaultValue={enVldStrtDt} width="46%" onClick={handleCalendarPop1} />
                  <em className="from">~</em>
                  <DatePicker defaultValue={mbEnEprYmd} width="46%" onClick={handleCalendarPop2} />
                  <p className="tx-sub tx-red80">{msgObj.chkMbEnMsg}</p>
                </div>
                {/* <DatePicker placeHolder="유효기간을 선택하세요." marginTop={8} disabled={true} onClick={handleDatepicker('/member/calendar')} /> */}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">종사원증 이미지</p>
                <div className="file-wrap">
                  <p className="tx-tit">앞면</p>
                  <MobInputFile uploadList={(e) => comFileUpload(e, 'mbEnFrnFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                </div>
                <div className="tx-sub">{memberInfoPwd.mbEnFrnFileNm}</div>
                <div className="file-wrap mt8">
                  <p className="tx-tit">뒷면</p>
                  <MobInputFile uploadList={(e) => comFileUpload(e, 'mbEnBckFileIdList')} accept="image/jpg, image/jpeg, image/png" />
                </div>
                <div className="tx-sub">{memberInfoPwd.mbEnBckFileNm}</div>
                <dl className="tx-sm-info mt10">
                  <dd>종사원증 이미지는 앞뒤면을 모두 등록해주세요</dd>
                </dl>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="tx-tit">
                  계좌번호 <em>(선택)</em>
                </p>
                <span className="bridge2">
                  <MobSelectBox options={mobFM053List} width="30%" onChange={(e) => onChangeSelect(e, 'mbBankcd')} />
                  <Input
                    type="text"
                    height={40}
                    placeHolder="계좌번호( ' - ' 제외 입력)"
                    //isSelf={false}
                    numberOnly={true}
                    maxLength={30}
                    value={memberInfoPwd?.mbAcntnoEnc}
                    onChange={(e) => {
                      onHandleRadio(e.target.value, 'mbAcntnoEnc');
                    }}
                    width="67.5%"
                  />
                </span>
                <span className="bridge2">
                  <Input
                    type="text"
                    height={40}
                    placeHolder="예금주"
                    value={memberInfoPwd?.mbDpstNm}
                    onChange={(e) => {
                      onHandleRadio(e.target.value, 'mbDpstNm');
                    }}
                    maxLength={20}
                    width="73%"
                  />
                  <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={24.5} onClick={onHandleClick} buttonMarkup={true} />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
        <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
          <MobCalendar date={moment(enVldStrtDt, 'YYYYMMDD').format('YYYY-MM-DD')} callback={calendarCallback1} />
        </MobBottomArea>
        <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
          <MobCalendar date={moment(mbEnEprYmd, 'YYYYMMDD').format('YYYY-MM-DD')} callback={calendarCallback2} />
        </MobBottomArea>
      </>
    );
  }
  return (
    <>
      <table className="table-tp1 input" summary="회원정보 수정 내용">
        <caption className="away">회원정보 수정</caption>
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          <tr>
            <th>소속단지</th>
            <td>
              <SelectBox
                id="agency-area"
                className="items-sbox"
                options={locationList}
                value={locCd}
                //   isValue={memberInfoPwd.locCd}
                onChange={(e) => {
                  setCtyCd('');
                  setSeqNo('');
                  setLocCd(e.value);
                }}
                placeHolder="시/도 선택"
                width={176}
              />
              <SelectBox
                id="member-area2"
                className="items-sbox ml10"
                value={ctyCd}
                //  isValue={ctyCd}
                options={detailLocationList}
                onChange={(e) => {
                  setSeqNo('');
                  setCtyCd(e.value);
                }}
                placeHolder="군구 선택"
                width={176}
              />
              <SelectBox
                id="member-area3"
                className="items-sbox ml10"
                value={seqNo}
                // isValue={seqNo}
                options={mrktList}
                onChange={(e) => {
                  setSeqNo(e.value);
                  onHandleRadio(e.value, 'seqNo');
                }}
                placeHolder="매매단지 선택"
                width={176}
              />
              <p className="tx-sub tx-red80">{msgObj.chkCmplxMsg}</p>
            </td>
          </tr>
          <tr>
            <th>소속상사명/대표자명</th>
            <td>
              <Input type="text" id="member-modify8" name="entrCorpNm" width={223} height={40} value={memberInfoPwd.entrCorpNm} onChange={onHandleChange} maxLength={30} />
              <em />
              <Input type="text" id="member-modify9" name="reprNm" width={223} height={40} value={memberInfoPwd.reprNm} onChange={(e, value) => onHandleRadio(value, 'reprNm')} maxLength={30} nonNumber={true} />
              <p className="tx-sub tx-red80">{msgObj.chkEntrMsg}</p>
            </td>
          </tr>
          <tr>
            <th>소속/사업자등록 번호</th>
            <td>
              <Input type="text" name="mbBrn" width={223} height={40} value={memberInfoPwd.mbBrn} onChange={onHandleChange} maxLength={10} numberOnly={true} />
              <em />
              <p className="tx-sub tx-red80">{msgObj.chkMbBrnMsg}</p>
            </td>
          </tr>
          <tr className="worker-num">
            <th>종사원번호/유효기간</th>
            <td>
              <Input type="text" placeHolder="사원증을 입력하세요" name="mbEn" width={224} height={40} value={memberInfoPwd.mbEn} onChange={onHandleChange} />
              <div className="mt10">
                <DatePicker inputHeight={40} inputWidth={200} onChange={(e) => onHandleChangeYmd(e, 'enVldStrtDt')} name="enVldStrtDt" defaultValue={enVldStrtDt} />
                <em className="mg8">~</em>
                <DatePicker inputHeight={40} inputWidth={200} onChange={(e) => onHandleChangeYmd(e, 'mbEnEprYmd')} name="mbEnEprYmd" defaultValue={mbEnEprYmd} />
                <p className="tx-exp-tp5 mt20 mb8">* 종사원증 정보 수정시, 미승인 상태가 되며, 관리자 수정 후 이용 가능 합니다.</p>
                <p className="tx-sub tx-red80">{msgObj.chkMbEnMsg}</p>
              </div>
            </td>
          </tr>
          <tr>
            <th>종사원증 이미지</th>
            <td>
              <span className="bridge2">
                <em className="mr16">앞면</em>
              </span>
              <InputFile uploadList={(e) => comFileUpload(e, 'mbEnFrnFileIdList')} resVertical={true} height={40} accept="image/jpg, image/jpeg, image/png" />
              <p>{memberInfoPwd.mbEnFrnFileNm}</p>
              <span className="bridge2">
                <em className="mr16">뒷면</em>
              </span>
              <InputFile uploadList={(e) => comFileUpload(e, 'mbEnBckFileIdList')} resVertical={true} height={40} accept="image/jpg, image/jpeg, image/png" />
              <p>{memberInfoPwd.mbEnBckFileNm}</p>
              <p className="tx-exp-tp5 mt20 mb8">* 종사원증 이미지는 앞뒤면을 모두 등록해주세요.</p>
            </td>
          </tr>
          {memberInfoPwd.mbTpcd === '0020' && (
            <tr>
              <th>
                계좌번호<em>(선택)</em>
              </th>
              <td>
                <span className="bridge">
                  <SelectBox
                    id="mbBankcd"
                    className="items-sbox"
                    placeHolder="은행명"
                    name="mbBankcd"
                    options={FM053List ? FM053List : []}
                    value={mbBankcd}
                    onChange={(e) => {
                      setMbBankcd(e.valule);
                      onHandleRadio(e.value, 'mbBankcd');
                    }}
                    width={255}
                    height={48}
                  />
                </span>
                <span className="bridge">
                  <Input
                    id="mbAcntnoEnc"
                    type="text"
                    placeHolder="계좌번호( ‘ - ‘ 제외 입력)"
                    numberOnly={true}
                    maxLength={30}
                    value={memberInfoPwd?.mbAcntnoEnc}
                    onChange={(e) => {
                      onHandleRadio(e.target.value, 'mbAcntnoEnc');
                    }}
                    width={255}
                  />
                </span>
                <br />
                <span className="bridge">
                  <Input
                    id="mbDpstNm"
                    type="text"
                    placeHolder="예금주"
                    value={memberInfoPwd?.mbDpstNm}
                    onChange={(e) => {
                      onHandleRadio(e.target.value, 'mbDpstNm');
                    }}
                    width={255}
                    maxLength={20}
                  />
                </span>
                <Button size="mid" background="gray" title="계좌인증" width={131} height={48} onClick={onHandleClick} buttonMarkup={true} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

MemberDealerInfo.propTypes = {
  memberInfoPwd: PropTypes.object,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  onClick: PropTypes.func
};

export default MemberDealerInfo;
