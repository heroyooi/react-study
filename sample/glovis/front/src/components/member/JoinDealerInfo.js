/**
 * 설명 : 회원 딜러 정보
 * @fileoverview 딜러 회원정보
 * @requires
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import _, { isEmpty } from 'lodash';
import moment from 'moment';

import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import DatePicker from '@src/components/common/calendar/DatePicker';
import InputFile from '@lib/share/items/InputFile';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

import { getLocationList } from '@src/actions/sellcar/locationAction';
import { getMrktCmplxList, getDetailLocationList } from '@src/actions/mypage/member/memberMngAction';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AuctLinked from '@src/components/member/AuctLinked';

//mobile
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCalendar from '@lib/share/items/MobCalendar';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import { mobile_select_area } from '@src/dummy';
import { preventScroll } from '@src/utils/CommonUtil';
// eslint-disable-next-line no-unused-vars
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { console } from 'globalthis/implementation';

/**
 * 회원 딜러 정보
 * @param {object} 회원 딜러 정보
 * @return {JoinDealerInfo}
 */
const JoinDealerInfo = ({ mbInfo, mbTpcd, onChange, msgObj, onBlur }) => {
  const dispatch = useDispatch();
  const now = moment();
  const { FM022List, FM056List } = useSelector((state) => ({
    FM022List: state.commonCode.commonCodeList.FM022 ? state.commonCode.commonCodeList.FM022 : [], //가입구분
    FM056List: state.commonCode.commonCodeList.FM056 ? state.commonCode.commonCodeList.FM056 : [] //프로필 공개 여부
  }));

  //소속단지 위한 지역
  const { locationList } = useSelector((state) => ({
    locationList: state.sellcarLocation.locationList ? state.sellcarLocation.locationList : []
  }));
  const [locCd, setLocCd] = useState(''); //시
  const [ctyCd, setCtyCd] = useState(''); //군구
  const [seqNo, setSeqNo] = useState(''); //매매단지
  const [enVldStrtDt, setEnVldStrtDt] = useState(now); //종사시작
  const [mbEnEprYmd, setMbEnEprYmd] = useState(now); //종사만료

  //오토옥션
  const [busimanno, setBusimanno] = useState(''); //사업자등록번호
  const [auctMsg, setAuctMsg] = useState('');
  const [auctMbId, setAuctMbId] = useState(''); //스마트옥션ID
  const [auctPwd, setAuctPwd] = useState(''); //스마트옥션 pwd
  const [auctType, setAuctType] = useState('0010'); //스마트옥션 TYPE
  const [auctPopup, setAuctPopup, openAuctPopup, closeAuctPopup] = useRodal(false, true);

  // mobile
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup2 = useSelector((state) => state.common.mFullpagePopup);

  //매매단지
  const { mrktList, detailLocationList } = useSelector((state) => ({
    mrktList: state.memberMng.mrktList ? state.memberMng.mrktList : [],
    detailLocationList: state.memberMng.detailLocationList ? state.memberMng.detailLocationList : []
  }));

  //common fileUpload
  const comFileUpload = (files, target) => {
    const objNew = { [target]: files[0] };
    onChange(objNew);
  };

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

  const onHandleBlur = (e) => {
    onBlur(e);
  };

  //radio change --> 매매단지 위해 e.target -> value 바꿈
  const onHandleRadio = (value, target) => {
    const objNew = {
      [target]: value
    };
    onChange(objNew);
  };

  const onHandleChange = (e) => {
    onChange(e);
  };

  //스마트옥션 선택
  const onLinkedAuction = (e) => {
    const param = { auctMbId: '', auctPwd: '' };
    onChange(param);
    console.log(e.target.value);
    setAuctType(e.target.value);
    if (e.target.value === '0010') {
      setAuctMsg('');
      setAuctMbId('');
      setAuctPwd('');
    } else {
      /*
      if (mbTpcd === '0020' && isEmpty(busimanno)) {
        setAuctMsg('사업자등록번호를 입력하세요');
        setAuctType('0010');
        return;
      }*/

      if (hasMobile) {
        setAuctPopup(true);
        preventScroll(true);
      } else {
        setAuctPopup(true);
      }
    }
  };

  //스마트옥션 취소
  const onCancleAuct = (type) => {
    if (type === 'cancle') {
      setAuctMbId('');
      setAuctPwd('');
      setAuctType('0010');
    }
    closeAuctPopup();
    if (hasMobile) {
      preventScroll(false);
    }
  };

  //오토옥션 연동 return
  const auctClick = (type, data) => {
    console.log("auctClick data:", data)
    console.log("auctClick: type :::", type)

    if (type === 'search') {
      onChange(data);
      setAuctMbId(data.auctMbId);
    }
    onCancleAuct(type);
  };

  //공통코드
  useEffect(() => {
    dispatch(getCommonCodeList('FM022')); //가입구분
    dispatch(getCommonCodeList('FM056')); //프로필 공개여부
    dispatch({ type: SECTION_MEMBER });
  }, []);

  //시(default)
  useEffect(() => {
    if (isEmpty(locationList)) {
      dispatch(getLocationList());
    }
  }, [locationList]);

  // 거주지역 군 선택
  useEffect(() => {
    if (!isEmpty(locCd)) {
      setCtyCd('');
      setSeqNo('');
      dispatch(getDetailLocationList(locCd));
    }
  }, [locCd]);

  //매매단지
  useEffect(() => {
    if (!isEmpty(ctyCd)) {
      setSeqNo('');
      const obj = { locCd: locCd, ctyCd: ctyCd };
      dispatch(getMrktCmplxList(obj));
    }
  }, [ctyCd]);

  if (hasMobile) {
    // InputFile & InputPicture
    const uploadList1 = (files) => {
      // const _files = Object.values(files);
      // _files.map(v => console.log(v));
    };

    const [mobLocationList, setMobLocationList] = useState([]); //광역시도
    const [mobDetailLocationList, setMobDetailLocationList] = useState([]); // 시군구
    const [mobMrktList, setMobMrktList] = useState([]); // 매매단지

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

    // 풀페이지 팝업 START
    const [fpCalendar, setFpCalendar] = useState(false); // 달력 팝업

    const handleFullpagePopup = useCallback(name => e => {
        e.preventDefault();
        if (name === 'calendar') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '날짜선택',
              options: ['back']
            }
          });
          setFpCalendar(true);
        }
      },
      [fpCalendar]
    );

    const closeFullpagePopup = useCallback((e) => {
        e.preventDefault();
        setFpCalendar(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      },
      [fpCalendar]
    );
    // 풀페이지 팝업 END

    return (
      <>
        <MobFullpagePopup active={mFullpagePopup2}>{fpCalendar && <MobCalendar callback={closeFullpagePopup} />}</MobFullpagePopup>
        <table summary="가입정보입력에 대한 내용" className="table-tp2 th-none">
          <caption className="away">가입정보입력</caption>
          <colgroup>
            <col width="33%" />
            <col width="67%" />
          </colgroup>
          <tbody>
            {mbTpcd === '0020' && (
              <>
                <tr>
                  <th>가입구분</th>
                  <td>
                    <RadioGroup
                      onChange={(e) => onHandleRadio(e.target.value, 'mbJoinDvcd')}
                      name="mbJoinDvcd"
                      defaultValue="0010"
                      dataList={!isEmpty(FM022List) ? FM022List : [{ id: 'join_ex1', value: '', label: '' }]}
                      className="fr"
                    />
                    <Tooltip placement="topRight" width={234}>
                      <TooltipItem>
                        <i className="ico-question" />
                      </TooltipItem>
                      <TooltipCont>
                        <p>대표로 가입하신 경우 소속딜러 관리를 위한 [단체회원] ID 발급신청을 하실 수 있습니다.</p>
                      </TooltipCont>
                    </Tooltip>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">소속단지</p>
                    <div className="select-wrap col3">
                      <MobSelectBox id="m-agency-area" width="32%" options={mobLocationList} onChange={(e) => onChangeSelect(e, 'locCd')} placeHolder="시/도 선택" />
                      <MobSelectBox id="m-agency-area2" width="32%" value={ctyCd} options={mobDetailLocationList} onChange={(e) => onChangeSelect(e, 'ctyCd')} placeHolder="시/군/구 선택" />
                      <MobSelectBox id="m-agency-area3" width="32%" value={ctyCd} options={mobMrktList} onChange={(e) => onChangeSelect(e, 'seqNo')} placeHolder="시/군/구 선택" />
                    </div>
                    <p className="tx-sub tx-red80">{msgObj.chkCmplxMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">소속상사명/대표자명</p>
                    <Input type="text" placeHolder="소속 상사명을 입력하세요." id="m-agency-name" height={40} maxLength={30} name="entrCorpNm" onChange={onHandleChange} />
                    <Input
                      type="text"
                      placeHolder="소속 상사 대표자명을 입력하세요."
                      id="m-agency-ceo"
                      height={40}
                      marginTop={8}
                      maxLength={30}
                      name="reprNm"
                      onChange={onHandleChange}
                      onBlur={onHandleBlur}
                    />
                    <p className="tx-sub tx-red80">{msgObj.chkEntrMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">소속/대표 사업자 등록번호</p>
                    <span className="bridge2">
                      <Input
                        type="text"
                        height={40}
                        placeHolder="사업자 등록번호를 입력하세요."
                        id="m-agency-num"
                        maxLength={10}
                        name="mbBrn"
                        onChange={(e) => {
                          onHandleChange(e);
                          setBusimanno(e.target.value);
                          setAuctMsg(' ');
                        }}
                        onBlur={onHandleBlur}
                        numberOnly={true}
                      />
                      {/*<Button size="mid" background="blue20" color="blue80" fontWeight={500} radius={true} title="조회" measure={'%'} width={24.5} />*/}
                    </span>
                    <p className="tx-sub tx-red80">{msgObj.chkMbBrnMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">소속 사업자등록증</p>
                    <InputFile uploadList={uploadList1} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">종사원증번호/유효기간</p>
                    <Input type="text" placeHolder="사원증번호를 입력하세요." id="m-employee-num" height={40} maxLength={20} name="mbEn" onChange={onHandleChange} />
                    <DatePicker defaultValue={now} inputWidth="100" inputMeasure="%" placeHolder="유효기간을 선택하세요." marginTop={8} name="enVldStrtDt" onClick={handleFullpagePopup('calendar')} />
                    <DatePicker defaultValue={now} inputWidth="100" inputMeasure="%" placeHolder="유효기간을 선택하세요." marginTop={8} name="mbEnEprYmd" onClick={handleFullpagePopup('calendar')} />
                    <p className="tx-sub tx-red80">{msgObj.chkMbEnMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">종사원증 이미지</p>
                    <div className="file-wrap">
                      <p className="tx-tit">앞면</p>
                      <InputFile uploadList={uploadList1} />
                    </div>
                    <div className="file-wrap mt8">
                      <p className="tx-tit">뒷면</p>
                      <InputFile uploadList={uploadList1} />
                    </div>
                    <dl className="tx-sm-info">
                      <dd>종사원증 이미지는 앞뒤면을 모두 등록해주세요</dd>
                    </dl>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="tx-tit">프로필 사진</p>
                    <RadioGroup
                      dataList={[
                        { id: 'mo-open', value: '1', checked: false, disabled: false, label: '공개' },
                        { id: 'mo-non-open', value: '2', checked: true, disabled: false, label: '비공개' }
                      ]}
                      className="v-2"
                    />
                    <InputFile uploadList={uploadList1} />
                    <dl className="tx-sm-info">
                      <dd>이미지 등록기준 : 80X100 사이즈 / JPG 파일</dd>
                      <dd>본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제 될 수도 있습니다.</dd>
                    </dl>
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan="2">
                <p className="tx-tit">오토옥션 경매회원 번호 연동</p>
                <div className="clear m-auto-radio">
                  <div className="fl mt16">
                    <RadioGroup
                      onChange={(e) => onLinkedAuction(e)}
                      name="auctType"
                      defaultValue={auctType}
                      dataList={[
                        { id: 'radio_ex1', name: 'auctType', value: '0010', disabled: false, title: '계정 없음' },
                        { id: 'radio_ex2', name: 'auctType', value: '0020', disabled: false, title: '기존 회원' }
                      ]}
                    />
                  </div>
                  <div className="fr">
                    <Input type="text" value={auctMbId} disabled={true} width="100%" />
                  </div>
                </div>
                <dl className="tx-sm-info">
                  <dd>기존 오토옥션(www.glovisaa.com) 경매회원은 ID/PASS 인증으로 계정 연동이 가능합니다.</dd>
                </dl>
              </td>
            </tr>
          </tbody>
        </table>

        <RodalPopup show={auctPopup} type={'fade'} closedHandler={closeAuctPopup} mode="normal" size="small" isButton={false} isMask={false}>
          <AuctLinked mbTpcd={mbTpcd} busimanno={busimanno} onClick={auctClick} />
        </RodalPopup>
      </>
    );
  }
  return (
    <>
      <RodalPopup show={auctPopup} type={'fade'} closedHandler={closeAuctPopup} mode="normal" size="small" isButton={false} isMask={false}>
        <AuctLinked mbTpcd={mbTpcd} busimanno={busimanno} onClick={auctClick} />
      </RodalPopup>

      <table summary="가입정보입력에 대한 내용" className="table-tp2">
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          {mbTpcd === '0020' && (
            <>
              <tr>
                <th>가입구분</th>
                <td>
                  <RadioGroup
                    onChange={(e) => onHandleRadio(e.target.value, 'mbJoinDvcd')}
                    name="mbJoinDvcd"
                    defaultValue="0010"
                    dataList={!isEmpty(FM022List) ? FM022List : [{ id: 'join_ex1', value: '', label: '' }]}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="agency-area">소속단지</label>
                </th>
                <td>
                  <span className="bridge">
                    <SelectBox
                      id="agency-area"
                      className="items-sbox"
                      options={locationList}
                      onChange={(e) => {
                        setLocCd(e.value);
                      }}
                      placeHolder="시/도 선택"
                      width={166}
                      height={48}
                    />
                  </span>
                  <span className="bridge">
                    <SelectBox
                      id="member-area2"
                      className="items-sbox"
                      value={ctyCd}
                      options={detailLocationList}
                      onChange={(e) => {
                        setCtyCd(e.value);
                      }}
                      placeHolder="군구 선택"
                      width={166}
                      height={48}
                    />
                  </span>
                  <SelectBox
                    id="member-area3"
                    className="items-sbox mr8"
                    value={seqNo}
                    options={mrktList}
                    onChange={(e) => {
                      setSeqNo(e.value);
                      onHandleRadio(e.value, 'seqNo');
                    }}
                    placeHolder="매매단지 선택"
                    width={166}
                    height={48}
                  />
                  <p className="tx-sub">{msgObj.chkCmplxMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="agency-name">소속상사명 / 대표자명</label>
                </th>
                <td>
                  <span className="bridge">
                    <Input type="text" placeHolder="소속 상사명을 입력하세요." id="agency-name" width={259} maxLength={30} name="entrCorpNm" onChange={onHandleChange} />
                  </span>
                    <Input type="text" placeHolder="소속 상사 대표자명을 입력하세요." id="agency-ceo" width={259} maxLength={30} name="reprNm" onChange={(e, value) => onHandleRadio(value, 'reprNm')} onBlur={onHandleBlur} nonNumber={true} />
                  <p className="tx-sub">{msgObj.chkEntrMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="agency-num">소속/대표사업자 등록번호</label>
                </th>
                <td>
                  <span className="bridge">
                    <Input
                      type="text"
                      placeHolder="사업자 등록번호를 입력하세요."
                      id="agency-num"
                      width={368}
                      maxLength={10}
                      name="mbBrn"
                      onChange={(e) => {
                        onHandleChange(e);
                        setBusimanno(e.target.value);
                        setAuctMsg(' ');
                      }}
                      onBlur={onHandleBlur}
                      numberOnly={true}
                    />
                  </span>
                  <p className="tx-sub">{msgObj.chkMbBrnMsg}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="profile-img" >소속 사업자등록증</label>
                </th>
                <td>
                  <span className="bridge2" id="agency-Registration">
                    <InputFile uploadList={(e) => comFileUpload(e, 'mbCertFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
                    <p className="tx-sub">{msgObj.chkMbCertFileMsg}</p>
                  </span>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="employee-num">종사원증번호/유효기간</label>
                </th>
                <td>
                  <span className="bridge">
                    <Input type="text" placeHolder="사원증번호를 입력하세요." id="employee-num" width={259} maxLength={20} name="mbEn" onChange={onHandleChange} />
                  </span>
                  <div className="mt8">
                    <DatePicker inputHeight={48} inputWidth={180} onChange={(e) => onHandleChangeYmd(e, 'enVldStrtDt')} name="enVldStrtDt" defaultValue={enVldStrtDt} />
                    <em className="mg8">~</em>
                    <DatePicker inputHeight={48} inputWidth={180} onChange={(e) => onHandleChangeYmd(e, 'mbEnEprYmd')} name="mbEnEprYmd" defaultValue={mbEnEprYmd} />
                    <p className="tx-sub">{msgObj.chkMbEnMsg}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="employee-img">종사원증 이미지</label>
                </th>
                <td>
                  <span className="bridge2">
                    <p className="tx-tit front" id="employee-img-front">앞면</p>
                    <InputFile uploadList={(e) => comFileUpload(e, 'mbEnFrnFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
                  </span>
                  <span className="bridge2">
                    <p className="tx-tit front" id="employee-img-back">뒷면</p>
                    <InputFile uploadList={(e) => comFileUpload(e, 'mbEnBckFileIdList')} resVertical={true} accept="image/jpg, image/jpeg, image/png" />
                  </span>
                  <p className="tx-exp-tp6">
                    · 종사원증 이미지는 앞뒤면을 모두 등록해주세요.
                    <br />
                    <span>{msgObj.chkMbEnFileMsg}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="profile-img" id="employee-profile-img">
                    프로필 사진<em>(선택)</em>
                  </label>
                </th>
                <td>
                  <span className="bridge2">
                    <RadioGroup
                      onChange={(e) => onHandleRadio(e.target.value, 'mbProfFileOpYn')}
                      name="mbProfFileOpYn"
                      defaultValue="Y"
                      dataList={!isEmpty(FM056List) ? FM056List : [{ id: 'prof_ex1', value: 'Y', label: '' }]}
                    />
                  </span>
                  <InputFile uploadList={(e) => comFileUpload(e, 'mbProfFileIdList')} resVertical={true} accept="image/jpg" />
                  <p className="tx-sub">{msgObj.chkMbProFileMsg}</p>
                  <p className="tx-exp-tp6">
                    · 이미지 등록기준 : 80X100 사이즈 / JPG 파일 <br />· 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.
                  </p>
                </td>
              </tr>
            </>
          )}
          <tr>
            <th>오토옥션 경매회원 번호 연동</th>
            <td>
              <div className="clear">
                <div className="fl mt16">
                  <RadioGroup
                    onChange={(e) => onLinkedAuction(e)}
                    name="auctType"
                    defaultValue={auctType}
                    dataList={[
                      { id: 'radio_ex1', name: 'auctType', value: '0010', disabled: false, title: '계정 없음' },
                      { id: 'radio_ex2', name: 'auctType', value: '0020', disabled: false, title: '기존 회원' }
                    ]}
                  />
                </div>
                <div className="fl">
                  <Input type="text" value={auctMbId} disabled={true} width={200} />
                </div>
              </div>
              <p className="tx-sub">{auctMsg}</p>
              <p className="mt8">기존 오토옥션(www.glovisaa.com) 경매회원은 ID/PASS 인증으로 계정 연동이 가능합니다.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

JoinDealerInfo.propTypes = {
  mbInfo: PropTypes.object,
  mbTpcd: PropTypes.string,
  onChange: PropTypes.func,
  msgObj: PropTypes.object,
  onBlur: PropTypes.func
};

export default JoinDealerInfo;
