import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { selectManufacturerList, selectModelList } from '@src/api/common/CarInfoApi';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import useRodal from '@lib/share/custom/useRodal';
import SelectBox from '@lib/share/items/SelectBox';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';

import Input from '@lib/share/items/Input';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobCalendar from '@lib/share/items/MobCalendar';
import DatePicker from '@src/components/common/calendar/DatePicker';
import { preventScroll } from '@src/utils/CommonUtil';

//export const FilterSelectorContext = createContext();

const getDataProp = (prm) => prm?.data?.data;

const ProdFilterSelector = ({
  eventHandler,
  params,
  popupHandler,
  type // progressing , waiting , history
}) => {
  const { sttDvcd, crMnfcCd, crMdlCd, sortValue, period } = params;
  const [manufactureList, setManufactureList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [searchSortValue, setSearchSortValue] = useState('');
  const [searchStartDt, setSearchStartDt] = useState(moment());
  const [searchEndDt, setSearchEndDt] = useState(moment());
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);

  useEffect(() => {
    const getManufactures = async () => {
      selectManufacturerList(0)
        .then((res) => res?.data?.data || [])
        .then((items) =>
          setManufactureList([
            { value: '', label: '모든 제조사' },
            ...items?.map((item) => ({
              value: item.id.toString(),
              label: item.name
            }))
          ])
        );
      setManufactureList();
    };
    getManufactures();
    getCommonCodeAsync('AM032').then((codeList) => setStatusList(codeList.slice(1)));
  }, []);

  useEffect(() => {
    const getModels = async () => {
      const list = await selectModelList(crMnfcCd).then(getDataProp);

      setModelList([
        { value: '', label: '모든 모델' },
        ...list?.map((model) => ({
          value: model.id.toString(),
          label: model.name
        }))
      ]);
    };
    if (crMnfcCd) {
      getModels();
    }
  }, [crMnfcCd]);

  const selectOption = (item, e) => {
    const { value, label } = item;
    const { name } = e;
    const params = {
      [name]: value,
      currentPage: 1
    };

    if (name === 'sttDvcd') {
      params.watingSortType = null;
      params.endDt = moment(new Date()).format('YYYY-MM-DD');
      params.startDt = moment(new Date())
        // .subtract(1, 'week')
        .subtract(1, 'months')
        .format('YYYY-MM-DD');
      // params.period = '1week';
      params.period = '1month';
    }

    if (name === 'crMnfcCd') {
      params.crMdlCd = null;
    }

    eventHandler(params);
  };

  const createBodyPortal = useCreatePortalInBody(null, 'wrap');
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [dimm3, setDimm3] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const periodList = [
    { title: '3개월', code: '3month', id: '3month', checked: period === '3month' },
    { title: '1개월', code: '1month', id: '1month', checked: period === '1month' },
    { title: '15일', code: '15days', id: '15days', checked: period === '15days' },
    { title: '1주일', code: '1week', id: '1week', checked: period === '1week' },
    { title: '오늘', code: 'today', id: 'today', checked: period === 'today' }
  ];

  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    if (type === 'progressing') {
      setActive1(true);
      setDimm1(true);
    } else if (type === 'history') {
      setActive3(true);
      setDimm3(true);
    }

    preventScroll(true);
  }, []);
  const handleDeletePop = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);
  const handleCompletePop = useCallback((e) => {
    e.preventDefault();
    setActive3(true);
    setDimm3(true);
    preventScroll(true);
  }, []);
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm3 = useCallback(() => {
    setActive3(false);
    setDimm3(false);
    preventScroll(false);
  }, []);

  const handleClose = useCallback((e) => {
    e.preventDefault();
    handleCloseDimm1();
    handleCloseDimm2();
    handleCloseDimm3();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (type === 'progressing') {
      eventHandler('0'); // no tab change. just search
    } else if (type === 'history') {
      eventHandler({ startDt: searchStartDt, endDt: searchEndDt, sortValue: searchSortValue });
    }
    handleClose(e);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    handleClose(e);
  };

  useEffect(() => {
    if (sttDvcd === '0060') {
      //return '판매완료';
      setSearchSortValue('SL_CMPL_DT');
    }
    if (sttDvcd === '0070') {
      // return '삭제';
      setSearchSortValue('PRD_DEL_DT');
    }
    if (sttDvcd === '0090') {
      //return '보류';
      setSearchSortValue('UPD_DT');
    }
  }, []);

  const [viewFilter, setViewFilter] = useState(1);
  const handleFilter = useCallback(
    (filter) => (e) => {
      e.preventDefault();
      if (type === 'progressing') {
        setViewFilter(filter === 'register' ? 1 : 2);
        eventHandler(filter === 'register' ? 'REG_DT' : 'UPD_DT');
      } else if (type === 'history') {
        if (sttDvcd === '0060') setViewFilter(filter === 'SL_CMPL_DT' ? 1 : 2);
        else if (sttDvcd === '0070') setViewFilter(filter === 'PRD_DEL_DT' ? 1 : 2);
        else if (sttDvcd === '0090') setViewFilter(filter === 'UPD_DT' ? 1 : 2);
        setSearchSortValue(filter);
      }
    },
    [eventHandler, sttDvcd, type]
  );

  const [movePop, setMovePop, openMovePop, closeDimmMovePop] = useRodal(false);
  const closeMovePop = useCallback((e) => {
    e.preventDefault();
    setMovePop(false);
  }, []);

  // 버튼식 라디오
  const [reasonCd, setReasonCd] = useState('');
  const [reason, setReason] = useState('');
  const [isValue1_1, setIsValue1_1] = useState(0);
  const [isValue1_2, setIsValue1_2] = useState(0);
  const [textDisabled, setTextDisabled] = useState(true);

  const onCheck = (e) => {
    const { value, checked } = e.target;
    console.log('onCheck -> value', value);
    console.log('onCheck -> checked', checked);
    setReasonCd(value);
  };
  const handleChange1_2 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue1_2(Number(e.target.value));
    },
    [isValue1_2]
  );

  // Textarea
  const textareaChange = (e) => {
    const { value } = e.target;
    console.log('inputReason -> value', value);
    setReason(value);
  };
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  };
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  };

  const makeSubTitle = (sttDvcd) => {
    if (sttDvcd === '0010') return '판매차량';
    if (sttDvcd === '0020') return '관리필요차량';
    if (sttDvcd === '0030') return '판단보류차량';
    if (sttDvcd === '0050') return '대기';
    if (sttDvcd === '0060') return '판매완료';
    if (sttDvcd === '0070') return '삭제';
    if (sttDvcd === '0090') return '보류';

    return '차량';
  };

  const clickPeriod = (e, selectedCheckItem, selectedCheckItemId) => {
    e.preventDefault();
    const newToday = new Date();
    const startMt = moment(newToday);
    const endMt = moment(newToday);

    switch (selectedCheckItemId) {
      case '3month':
        startMt.add(-3, 'months');
        break;
      case '1month':
        startMt.add(-1, 'months');
        break;
      case '15days':
        startMt.add(-15, 'days');
        break;
      case '1week':
        startMt.add(-7, 'days');
        break;
    }

    setSearchStartDt(startMt.format('YYYY-MM-DD'));
    setSearchEndDt(endMt.format('YYYY-MM-DD'));
  };

  // useEffect(() => {
  //   setSearchStartDt(searchStartDt ? moment(searchStartDt).toDate() : new Date());
  //   setSearchEndDt(searchEndDt ? moment(searchEndDt).toDate() : new Date());
  // }, [searchStartDt, searchEndDt]);

  // 모바일 달력 팝업 제어
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
    setSearchStartDt(date.format('YYYY-MM-DD'));
    setCalPop1(false);
    preventScroll(false);
  };

  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    setSearchEndDt(date.format('YYYY-MM-DD'));
    setCalPop2(false);
    preventScroll(false);
  };

  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    preventScroll(false);
  };

  // 차량 기본정보 - 달력
  // const [isDate1, setIsDate1] = useState(moment());
  // const [isDate2, setIsDate2] = useState(moment());

  return (
    <>
      {!hasMobile ? (
        <ul className="float-wrap">
          <li>
            <SelectBox id="select1" className="items-sbox" options={statusList} width={176} height={40} onChange={selectOption} value={sttDvcd} valueBy="value" name="sttDvcd" />
          </li>
          <li>
            <SelectBox
              id="select2"
              className="items-sbox"
              options={manufactureList}
              width={176}
              height={40}
              placeHolder="제조사"
              onChange={selectOption}
              value={crMnfcCd}
              valueBy="value"
              name="crMnfcCd"
            />
          </li>
          <li>
            <SelectBox
              id="select3"
              className="items-sbox"
              options={modelList}
              width={176}
              height={40}
              placeHolder="모델"
              onChange={selectOption}
              value={crMdlCd}
              valueBy="value"
              name="crMdlCd"
              disabled={!crMnfcCd}
            />
          </li>
          <li>
            <SelectBox
              id="select4"
              className="items-sbox"
              options={[
                { value: 'UPD_DT', label: '업데이트순' },
                { value: 'REG_DT', label: '등록순' },
              ]}
              width={176}
              height={40}
              value={sortValue}
              valueBy="value"
              name="sortValue"
              onChange={selectOption}
              customOptionsScroll={false}
            />
          </li>
        </ul>
      ) : (
        <>
          <div className="float-wrap btn-s">
            <h3 className="tit2">{makeSubTitle(sttDvcd)} 목록</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
          </div>
          {type === 'progressing' &&
            createBodyPortal(
              <>
                <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
                <MobBottomArea active={active1} isFixButton={true} zid={101}>
                  <div className="inner pb7">
                    <h3 className="tit1 pb7">상세조회</h3>
                    <ul className="m-menu-list tp1">
                      <li onClick={popupHandler('f1')}>
                        <div className="sel-wrap">
                          <span className="tit">제조사/모델</span>
                        </div>
                      </li>
                      <li className="btn-wrap">
                        <span className="tit">정렬</span>
                        <Buttons align="center">
                          <Button
                            size="mid"
                            background={viewFilter === 1 ? 'blue80' : null}
                            line={viewFilter === 2 ? 'gray' : null}
                            color={viewFilter === 2 ? 'gray' : null}
                            radius={true}
                            title="등록순"
                            width={48}
                            height={38}
                            measure={'%'}
                            onClick={handleFilter('register')}
                          />
                          <Button
                            size="mid"
                            background={viewFilter === 2 ? 'blue80' : null}
                            line={viewFilter === 1 ? 'gray' : null}
                            color={viewFilter === 1 ? 'gray' : null}
                            radius={true}
                            title="업데이트순"
                            width={48}
                            height={38}
                            marginLeft={4}
                            measure={'%'}
                            mgMeasure={'%'}
                            onClick={handleFilter('update')}
                          />
                        </Buttons>
                      </li>
                    </ul>
                  </div>
                  <Button className="fixed" size="full" background="blue80" title="조회" onClick={handleSearch} />
                </MobBottomArea>
              </>
            )}
          {type === 'history' &&
            createBodyPortal(
              <>
                <div className={dimm3 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm3} />
                <MobBottomArea active={active3} isFixButton={true} zid={101}>
                  <div className="inner pb7">
                    <h3 className="tit1 pb7">상세조회</h3>
                    <ul className="m-menu-list tp1">
                      <li onClick={popupHandler('f1')}>
                        <div className="sel-wrap">
                          <span className="tit">제조사/모델</span>
                        </div>
                      </li>
                      <li className="btn-wrap">
                        <span className="tit">구분</span>
                        <Buttons align="center" marginBottom={8}>
                          {sttDvcd === '0060' && (
                            <Button
                              size="mid"
                              background={viewFilter === 1 ? 'blue80' : null}
                              line={viewFilter === 2 ? 'gray' : null}
                              color={viewFilter === 2 ? 'gray' : null}
                              radius={true}
                              title="판매완료신고일순"
                              width={48}
                              height={38}
                              measure={'%'}
                              onClick={handleFilter('SL_CMPL_DT')}
                            />
                          )}
                          {sttDvcd === '0070' && (
                            <Button
                              size="mid"
                              background={viewFilter === 1 ? 'blue80' : null}
                              line={viewFilter === 2 ? 'gray' : null}
                              color={viewFilter === 2 ? 'gray' : null}
                              radius={true}
                              title="삭제일순"
                              width={48}
                              height={38}
                              measure={'%'}
                              onClick={handleFilter('PRD_DEL_DT')}
                            />
                          )}
                          {sttDvcd === '0090' && (
                            <Button
                              size="mid"
                              background={viewFilter === 1 ? 'blue80' : null}
                              line={viewFilter === 2 ? 'gray' : null}
                              color={viewFilter === 2 ? 'gray' : null}
                              radius={true}
                              title="보류일순"
                              width={48}
                              height={38}
                              measure={'%'}
                              onClick={handleFilter('UPD_DT')}
                            />
                          )}

                          <Button
                            size="mid"
                            background={viewFilter === 2 ? 'blue80' : null}
                            line={viewFilter === 1 ? 'gray' : null}
                            color={viewFilter === 1 ? 'gray' : null}
                            radius={true}
                            title="등록일순"
                            width={48}
                            height={38}
                            marginLeft={4}
                            measure={'%'}
                            mgMeasure={'%'}
                            onClick={handleFilter('REG_DT')}
                          />
                        </Buttons>
                        <span className="birdge2">
                          <MobButtonFilter checkList={periodList} onClick={clickPeriod} />
                        </span>
                        <div className="step-btn mt8">
                          <DatePicker defaultValue={searchStartDt} width="46%" onClick={handleCalendarPop1} />
                          <em className="from">~</em>
                          <DatePicker defaultValue={searchEndDt} width="46%" onClick={handleCalendarPop2} />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <Button className="fixed" size="full" background="blue80" title="조회" onClick={handleSearch} />
                </MobBottomArea>
                <div className={calPop1 || calPop2 ? `modal-bg v-3 active` : `modal-bg v-3`} onClick={calendarClose} />
                <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
                  <MobCalendar date={searchStartDt} callback={calendarCallback1} />
                </MobBottomArea>
                <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
                  <MobCalendar date={searchEndDt} callback={calendarCallback2} />
                </MobBottomArea>
              </>
            )}
        </>
      )}
    </>
  );
};

export default ProdFilterSelector;
