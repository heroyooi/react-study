import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import SelectBox from '@lib/share/items/SelectBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { getLocationList, getDetailLocationList } from '@src/actions/sellcar/locationAction';
import { updateVisitDateAction } from '@src/actions/sellcar/compareEstmAction';

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

const VisitPop2 = ({ slReqId, hh24AuctId, dlrBiddNo }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(moment());
  const [hh, setHH] = useState('');
  const [mm, setMm] = useState('');
  const [vstLocNm, setVstLocNm] = useState('');
  const [vstLocDtlNm, setVstLocDtlNm] = useState('');
  const locationList = useSelector((state) => state.sellcarLocation.locationList, []);
  const detailLocationList = useSelector((state) => state.sellcarLocation.detailLocationList, []);

  const onSubmit = async (e) => {
    const formatedDate = date.format('YYYY-MM-DD');
    const vstDt = moment(`${formatedDate} ${hh}:${mm}`).format('YYYY-MM-DD hh:mm');
    e.preventDefault();
    const param = {
      slReqId,
      hh24AuctId,
      dlrBiddNo,
      vstDt,
      vstLocNm,
      vstLocDtlNm
    };
    const success = await dispatch(updateVisitDateAction(param));
    console.log('success:', success);
    console.log('Param:', param);
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
  return (
    <div className="con-wrap popup-tender">
      <form className="register-form">
        <fieldset>
          <legend className="away">방문일자 수정</legend>
          <ul className="form-list">
            <li>
              <span className="tit">방문일자 선택</span>
              <DatePicker
                defaultValue={date}
                inputWidth={276}
                inputHeight={40}
                onChange={(value) => {
                  setDate(value);
                }}
              />
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
                width={134}
                height={40}
                placeHolder="구/군"
                onChange={(e) => {
                  setVstLocDtlNm(e.value);
                }}
              />
            </li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="입력" width={127} onClick={onSubmit} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

export default VisitPop2;
