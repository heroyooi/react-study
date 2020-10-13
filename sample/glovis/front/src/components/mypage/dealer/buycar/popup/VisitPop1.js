import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import SelectBox from '@lib/share/items/SelectBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobSelectList from '@lib/share/items/MobSelectList';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from "@lib/share/items/MobCalendar";
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import { SystemContext } from '@src/provider/SystemProvider';
import { createValidator } from '@lib/share/validator';
import { getLocationList, getDetailLocationList } from '@src/actions/sellcar/locationAction';
import { updateVisitDateAction } from '@src/actions/sellcar/compareEstmAction';
import VisitSchema from '@lib/share/validator/mypage/dealer/buycar/VisitSchema';
import { preventScroll } from '@src/utils/CommonUtil';
import { stringify } from 'qs';
import { console } from 'globalthis/implementation';

const validator = createValidator(VisitSchema,
  {
    required: [
      "slReqId",
      "hh24AuctId",
      "dlrBiddNo",
      "vstDt",
      "vstLocNm",
      "vstLocDtlNm",
      "hh",
      "mm"
    ]
  }
);

const getHh = () => {
  const data = [];
  for (let h = 0; h <= 23; h++) {
    data.push({
      label: `${h}시`,
      value: h
    });
  }
  return data;
};

const getMm = () => {
  const data = [];
  for (let m = 0; m <= 50; m += 10) {
    data.push({
      label: `${m}분`,
      value: m
    });
  }
  return data;
};

const VisitPop1 = ({ data, closedHandler, title="방문일자 입력" }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  // const [date, setDate] = useState(moment());
  const [date, setDate] = useState({});
  const [hh, setHH] = useState();
  const [mm, setMm] = useState();
  const [vstLocNm, setVstLocNm] = useState('');
  const [vstLocDtlNm, setVstLocDtlNm] = useState('');
  const locationList = useSelector((state) => state.sellcarLocation.locationList, []);
  const detailLocationList = useSelector((state) => state.sellcarLocation.detailLocationList, []);
  const { showAlert } = useContext(SystemContext);

  const [mobHH, setMobHH] = useState();
  const [mobMM, setMobMM] = useState();
  const [mobVstLocNm, setMobVstLocNm] = useState();
  const [mobVstDtlLocNm, setMobVstDtlLocNm] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if( date === undefined || date === '' ) return false;
    const formatedDate = date.format('YYYY-MM-DD');
    const vstDt = moment(`${formatedDate} ${hh}:${mm}`).format('YYYY-MM-DD HH:mm');
    const param = {
      slReqId: data.slReqId,
      hh24AuctId: data.hh24AuctId,
      dlrBiddNo: data.dlrBiddNo,
      vstDt,
      vstLocNm,
      vstLocDtlNm
    };

    const valid = validator.validate({...param, 'hh':hh, 'mm':mm});

    if( valid.success ){
      const success = await dispatch(updateVisitDateAction(param));
      if (success) {
        showAlert(`저장 되었습니다.`);
        if (hasMobile) return closedHandler(e);
        closedHandler(false);
      } else {
        showAlert(`에러가 발생했습니다..`);
        if (hasMobile) return closedHandler(e);
        closedHandler(false);
      }
    } else {
      showAlert(`${valid.error[0].label}을/를 선택해주세요.`);
    }
  };

  useEffect(() => {
    if (isEmpty(locationList)) {
      dispatch(getLocationList());
    }
  }, [dispatch, locationList]);

  // 거주지역 시도 선택
  useEffect(() => {
    if (!isEmpty(vstLocNm)) {
      dispatch(getDetailLocationList(vstLocNm));
    }
  }, [vstLocNm]);

  useEffect(() => {
    let date;
    if (data !== null && data.bsSttDvcd === '02') {
      date = moment(data.vstDt);
      const splitedVstDt = data.vstDt.split(' ');
      const time = splitedVstDt[1];
      if (time !== undefined) {
        const splitedTime = time.split(':');
        const hh = splitedTime[0];
        const mm = splitedTime[1];
        if (hh !== undefined) {
          setHH(hh);
          setMobHH({ value: hh, label: `${hh}시` });
        }
        if (mm !== undefined) {
          setMm(mm);
          setMobMM({ value: mm, label: `${mm}분` });
        }
      }
      setVstLocNm(data.vstLocNm);
      setVstLocDtlNm(data.vstLocDtlNm);
      setMobVstLocNm(locationList.filter((x) => x.value === data.vstLocNm)[0]);
      setMobVstDtlLocNm(detailLocationList.filter((x) => x.value === data.vstLocDtlNm)[0]);
    } else {
      //date = moment();
    }
    setDate(date);
  }, [data]);
// 모바일
  // 달력 기간 선택
  const now = moment();
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }

  // 차량 기본정보 - 달력
  const [calPop1, setCalPop1] = useState(false);
  const [isDate1, setIsDate1] = useState(moment());
  const handleCalendarPop1 = e => {
    e.preventDefault();
    setCalPop1(true);
    preventScroll(true);
  };
  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    setIsDate1(date);
    setDate(date);
    setCalPop1(false);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    preventScroll(false);
  };

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender pb8">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1 mb12">{title}</h3>
              <table summary="방문일자 입력" className="table-tp2 th-none">
                <caption className="away">방문일자 입력</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <p className="tx-tit">방문일자 선택</p>
                      <DatePicker defaultValue={isDate1} width="100%" onClick={handleCalendarPop1} min={moment().add(1, 'days')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">방문시간 선택</p>
                      <MobSelectList
                        displayMemberPath={'label'}
                        itemsSource={getHh()}
                        selectedItem={mobHH}
                        width="48.5%"
                        placeHolder="00"
                        selectedValuePath={'value'}
                        onClick={(e, value) => {
                          setHH(value.value);
                          setMobHH(value);
                        }}
                      />
                      {/* <MobSelectBox
                        id="select1"
                        className="items-sbox"
                        options={getHh()}
                        value={hh}
                        width="48.5%"
                        placeHolder="00"
                        onClick={(e) => {
                          setHH(e.value);
                        }}
                      /> */}
                      <span className="bridge">
                        <MobSelectList
                          displayMemberPath={'label'}
                          itemsSource={getMm()}
                          width="48.5%"
                          selectedItem={mobMM}
                          placeHolder="00"
                          selectedValuePath={'value'}
                          onClick={(e, value) => {
                            setMm(value.value);
                            setMobMM(value);
                          }}
                        />
                        {/* <MobSelectBox
                          id="select1"
                          className="items-sbox"
                          options={getMm()}
                          width="48.5%"
                          value={mm}
                          placeHolder="00"
                          onClick={(e) => {
                            setMm(e.value);
                          }}
                        /> */}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tit">지역 선택</p>
                      <MobSelectList
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        itemsSource={locationList}
                        width="48.5%"
                        selectedItem={mobVstLocNm}
                        placeHolder="시/도"
                        onClick={(e, value) => {
                          setVstLocNm(value.value);
                          setMobVstLocNm(value);
                        }}
                      />
                      {/* <MobSelectBox
                        id="select1"
                        className="items-sbox"
                        options={locationList}
                        width="48.5%"
                        value={vstLocNm}
                        placeHolder="시/도"
                        onClick={(e) => {
                          setVstLocNm(e.value);
                        }}
                      /> */}
                      <span className="bridge">
                        <MobSelectList
                          displayMemberPath={'label'}
                          selectedValuePath={'value'}
                          itemsSource={detailLocationList}
                          width="48.5%"
                          selectedItem={mobVstDtlLocNm}
                          placeHolder="구/군"
                          onClick={(e, value) => {
                            setVstLocDtlNm(value.value);
                            setMobVstDtlLocNm(value);
                          }}
                        />
                        {/* <MobSelectBox
                          id="select1"
                          className="items-sbox"
                          options={detailLocationList}
                          width="48.5%"
                          value={vstLocDtlNm}
                          placeHolder="구/군"
                          onClick={(e) => {
                            setVstLocDtlNm(e.value);
                          }}
                        /> */}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" fontWeight="500" onClick={closedHandler} />
          <Button size="big" background="blue80" title={title === '방문일자 입력' ? '입력' : '수정'} fontWeight="500" onClick={onSubmit} />
        </Buttons>
        {
          <>
            <div className={calPop1 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
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
      <form className="register-form">
        <fieldset>
          <legend className="away">방문일자 입력</legend>
          <ul className="form-list">
            <li>
              <span className="tit">방문일자 선택</span>
              {/* <DatePicker defaultValue={date} inputWidth={276} inputHeight={40} disableDayBefore={new Date()} onChange={(value) => {setDate(value); }} /> */}
              <DatePicker defaultValue={date} inputWidth={276} inputHeight={40} onChange={(value) => {setDate(value); }} />
            </li>
            <li>
              <span className="tit">방문시간 선택</span>
              <span className="bridge">
                <SelectBox
                  id="select1"
                  className="items-sbox"
                  options={getHh()}
                  width={134}
                  height={40}
                  value={hh}
                  placeHolder="00"
                  onChange={(e) => {
                    setHH(e.value);
                  }}
                />
              </span>
              <SelectBox
                id="select1"
                className="items-sbox"
                options={getMm()}
                width={134}
                height={40}
                value={mm}
                placeHolder="00"
                onChange={(e) => {
                  setMm(e.value);
                }}
              />
            </li>
            <li>
              <span className="tit">지역 선택</span>
              <span className="bridge">
                <SelectBox
                  id="select1"
                  className="items-sbox"
                  options={locationList}
                  width={134}
                  height={40}
                  value={vstLocNm}
                  placeHolder="시/도"
                  onChange={(e) => {
                    setVstLocNm(e.value);
                  }}
                />
              </span>
              <SelectBox
                id="select1"
                className="items-sbox"
                options={detailLocationList}
                width={234}
                height={40}
                value={vstLocDtlNm}
                placeHolder="구/군"
                onChange={(e) => {
                  setVstLocDtlNm(e.value);
                }}
              />
            </li>
          </ul>
          <Buttons align="center" marginTop={48}>
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

export default VisitPop1;
