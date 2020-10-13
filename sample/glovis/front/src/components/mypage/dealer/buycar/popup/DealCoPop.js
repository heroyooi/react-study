import React, { useState, useContext, useCallback,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';
import Radio from '@lib/share/items/Radio';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import Textarea from '@lib/share/items/Textarea';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from "@lib/share/items/MobCalendar";
import { SystemContext } from '@src/provider/SystemProvider';
import { updateCompleteFileAction } from '@src/actions/sellcar/compareEstmAction';
import { preventScroll } from '@src/utils/CommonUtil';

const reduItmTpcdList = ['R001', 'R002', 'R003', 'R004'];

const idxToTpcd = (idx) => {
  return reduItmTpcdList[idx];
};

// const tpcdToIdx = (tpcd) => {
//   return failRsnTpcdList.findIndex((v) => v === tpcd);
// };

const DealCoPop = ({ data, closedHandler }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null); // For new
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [lastBsYmd, setLastBsYmd] = useState(moment());
  const [isValue, setIsValue] = useState(0);
  const [reduItmRsnCntn, setReduItmRsnCntn] = useState(0);
  const [lastPrchAmt, setLastPrchAmt] = useState(0);
  const { showAlert } = useContext(SystemContext);
  const [etcDisabled, setEtcDisabled] = useState(true);
  const [rsnFiles, setRsnFiles] = useState([]);
  const [registFile, setRegistFile] = useState({});
  const [performChkFile, setPerformChkFile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const chkEtcArea = useCallback((e) => {
    setEtcDisabled(e.target.checked ? false : true);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setIsValue(Number(e.target.value));
    setEtcDisabled(Number(e.target.value) === 4 ? false : true);
    console.log(e.target.value);
  };

  const rsnFilesHandler = (files) => {
    const _files = Object.values(files);
    setRsnFiles(_files);
  };

  const registFileHandler = (file) => {
    const _files = Object.values(file);
    setRegistFile(_files[0]);
  };

  const performChkFileHandler = (file) => {
    const _files = Object.values(file);
    setPerformChkFile(_files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (isValue === 0) {
    //   showAlert(`감가항목 선택`);
    //   return false;
    // }

    if (isValue === 4 && isEmpty(reduItmRsnCntn)) {
      showAlert(`감가항목 사유 입력`);
      return false;
    }

    if (isEmpty(lastPrchAmt) || lastPrchAmt === 0) {
      showAlert(`최종 매입가를 입력해주세요.`);
      return false;
    }

    if (registFile === undefined) {
      showAlert(`이전 등록이미지를 첨부해주세요.`);
      return false;
    }

    if (performChkFile === undefined) {
      showAlert(`성능점검기록부를 첨부해주세요.`);
      return false;
    }

    const formData = new FormData(); // multipart/form-data로 보낼 파일 생성
    formData.append('slReqId',data.slReqId);
    formData.append('hh24AuctId',data.hh24AuctId);
    formData.append('dlrBiddNo',data.dlrBiddNo);
    formData.append('lastBsYmd',lastBsYmd.format('YYYYMMDD'));
    formData.append('reduItmTpcd',idxToTpcd(isValue - 1));
    formData.append('reduItmRsnCntn',reduItmRsnCntn);
    formData.append('lastPrchAmt',lastPrchAmt);
    rsnFiles.map( f => formData.append('rsnFiles',f));
    formData.append('registFile',registFile);
    formData.append('performChkFile',performChkFile);
    // closedHandler(false);

    setIsLoading(true);
    const success = await dispatch(updateCompleteFileAction(formData));
    if (success) {
      setIsLoading(false);
      showAlert(`저장 되었습니다.`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    } else {
      setIsLoading(false);
      showAlert(`에러가 발생했습니다..`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    }
  };

  // 모바일
  // 차량 기본정보 - 달력
  const [calPop1, setCalPop1] = useState(false);
  const [isDate1, setIsDate1] = useState(moment());
  const handleCalendarPop1 = (e) => {
    e.preventDefault();
    setCalPop1(true);
    preventScroll(true);
  };
  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    setIsDate1(date);
    setLastBsYmd(date);
    setCalPop1(false);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    preventScroll(false);
  };

  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }

  if (hasMobile) {
    return (
      <>
        {isLoading === true && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="content-wrap pt20">
          <div className="inner popup-tender">
            <form className="register-form">
              <fieldset>
                <ul className="form-list">
                  <li>
                    <h3 className="tit2">최종 거래일자(필수)</h3>
                    <DatePicker defaultValue={isDate1} width="90%" onClick={handleCalendarPop1} />
                  </li>
                  <li>
                    <h3 className="tit2 mb8">감가사유(선택)</h3>
                    <ul className="radio-list tp2">
                      <li>
                        <Radio className="simple" id="deal-redu-1" title="외판 이상 (수리필요)" value={1} checked={isValue} onChange={handleChange} />
                      </li>
                      <li>
                        <Radio className="simple" id="deal-redu-2" title="사고 이력 (패널 교횐 등)" value={2} checked={isValue} onChange={handleChange} />
                      </li>
                      <li>
                        <Radio className="simple" id="deal-redu-3" title="차량정보 불일치 (옵션, 등급정보 등)" value={3} checked={isValue} onChange={handleChange} />
                      </li>
                      <li>
                        <Radio className="simple" id="deal-redu-4" title="기타 (텍스트 입력)" value={4} checked={isValue} onChange={handleChange} />
                      </li>
                    </ul>
                    <p className="mb8 mt24">기타사유</p>
                    <Textarea
                      countLimit={500}
                      type="tp1"
                      height={133}
                      className="mb8"
                      width="90%"
                      placeHolder="기타 사유를 작성해주세요."
                      onBlur={(e) => {
                        setReduItmRsnCntn(e.target.value);
                      }}
                      disabled={etcDisabled}
                    />
                    <InputFile uploadList={rsnFilesHandler} name="rsnFiles" resVertical={true} isMultiple={true} type="special" />
                  </li>
                  {/* <li>
                    <h3 className="tit2">입찰금액</h3>
                    <label className="hide" htmlFor="biddingPrice">입찰 금액</label>
                    <Input type="text" id="biddingPrice" placeHolder="4,480 만원" disabled={true} />
                  </li> */}
                  <li>
                    <h3 className="tit2">최종매입가(필수)</h3>
                    <label className="hide" htmlFor="price">최종 매입가</label>
                    <Input
                      type="number"
                      id="price"
                      placeHolder="입력하세요."
                      width="85%"
                      onBlur={(e) => {
                        e.preventDefault();
                        setLastPrchAmt(e.target.value);
                      }}
                    />
                    <em className="mg8">만원</em>
                  </li>
                  <li>
                    <h3 className="tit2">이전 등록이미지(필수)</h3>
                    <InputFile width="90%" uploadList={registFileHandler} name="registFile" resVertical={true} type="special" />
                  </li>
                  <li>
                    <h3 className="tit2">성능점검기록부(필수)</h3>
                    <InputFile width="90%" uploadList={performChkFileHandler} name="performChkFile" resVertical={true} type="special" />
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" fontWeight="500" onClick={closedHandler} />
          <Button size="big" background="blue80" title="입력" fontWeight="500" onClick={onSubmit} />
        </Buttons>
        {
          <>
            <div className={calPop1 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
              <MobCalendar date={isDate1} callback={calendarCallback1} />
            </MobBottomArea>
          </>
        }
      </>
    )
  }
  return (
    <div className="con-wrap popup-tender">
      <form className="register-form" ref={formRef}>
        <fieldset>
          <ul className="form-list line">
            <li>
              <span className="tit">최종 거래일자 선택(필수)</span>
              <DatePicker defaultValue={lastBsYmd} inputWidth={276} inputHeight={40} onChange={(value) => setLastBsYmd(value)} />
            </li>
            <li>
              <span className="tit v-top">감가 항목 입력(선택)</span>
              <ul className="radio-list">
                <li>
                  <Radio className="simple" id="deal-redu-1" title="외판 이상 (수리필요)" value={1} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio className="simple" id="deal-redu-2" title="사고 이력 (패널 교횐 등)" value={2} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio className="simple" id="deal-redu-3" title="차량정보 불일치 (옵션, 등급정보 등)" value={3} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio className="simple" id="deal-redu-4" title="기타 (텍스트 입력)" value={4} checked={isValue} onChange={handleChange} />
                  <Textarea
                    countLimit={500}
                    type="tp1"
                    onBlur={(e) => {
                      setReduItmRsnCntn(e.target.value);
                    }}
                    placeHolder="사유를 입력하세요."
                  />
                </li>
                <li>
                  <InputFile uploadList={rsnFilesHandler} resVertical={true} />
                </li>
              </ul>
            </li>
            <li>
              <ul className="form-list">
                <li>
                  <span className="tit">최종 매입가(필수)</span>
                  <label className="hide" htmlFor="price">
                    최종 매입가
                  </label>
                  <Input
                    type="number"
                    id="price"
                    placeHolder="입력하세요."
                    width={276}
                    height={40}
                    onBlur={(e) => {
                      e.preventDefault();
                      setLastPrchAmt(e.target.value);
                    }}
                  />
                  <em className="mg8">만원</em>
                </li>
                <li>
                  <span className="tit v-top mt8">이전 등록이미지(필수)</span>
                  <InputFile uploadList={registFileHandler} resVertical={true} />
                </li>
                <li>
                  <span className="tit v-top mt8">성능점검기록부(필수)</span>
                  <InputFile uploadList={performChkFileHandler} resVertical={true} />
                </li>
              </ul>
            </li>
          </ul>
          <Buttons align="center" marginTop={56}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={127}
              onClick={(e) => {
                e.preventDefault();
                closedHandler(false);
              }}
            />
            <Button size="big" background="blue80" title="입력" width={127} onClick={onSubmit} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

export default DealCoPop;
