import React, { memo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import { selectSuccBiddListAction, selectCompBiddListAction } from '@src/actions/sellcar/compareEstmAction';
import { preventScroll } from '@src/utils/CommonUtil';

const checkedbtnArray = [
  {
    clicked: true,
    line: 'gray',
    color: 'black',
    title: '1개월',
    type: '1m',
    unit: 'months',
    value: 1
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '3개월',
    type: '3m',
    unit: 'months',
    value: 3
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '6개월',
    type: '6m',
    unit: 'months',
    value: 6
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '12개월',
    type: '1y',
    unit: 'years',
    value: 1
  }
];

const SearchForm = memo(({ compBidd = false, succBidd = false, title }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [clickedBtnIdx, setClickedBtnIdx] = useState(1);
  const [fromDate, setFromDate] = useState(moment().subtract('1', 'month'));
  const [endDate, setEndDate] = useState(moment());
  const [beforeDate] = useState(moment());
  const [checkedBtns, setCheckedBtns] = useState(checkedbtnArray);
  const { recordCount, succBiddCount, compBiddCount } = useSelector((store) => store.compareEstm);
  const [isFromCalPopOpen, setIsFromCalPopOpen] = useState(false);
  const [isToCalPopOpen, setIsToCalPopOpen] = useState(false);
  const chk_idx = (compBidd) ? 'C' : 'S';

  const searchBtnHandler = (e) => {
    e.preventDefault();
    const param = {
      fromDate: fromDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    };
    if (succBidd) {
      dispatch(selectSuccBiddListAction(param));
    } else if (compBidd) {
      dispatch(selectCompBiddListAction(param));
    }
  };

  /**
   * 관심차량만 체크박스 핸들러
   * @param {} e 
   */
  const handleChkItrt = (e) => {
    let param = {
      fromDate: fromDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    };
    if( e.target.checked ){
      param = { ...param, interest: 'YES' };
    } else {
      param = { ...param, interest: 'NO' };
    }
    if (succBidd) {
      dispatch(selectSuccBiddListAction(param));
    } else if (compBidd) {
      dispatch(selectCompBiddListAction(param));
    }
  };

  const changeFromDatePickerHandler = (value) => {
    setFromDate(value);
  };

  const changeEndDatePickerHandler = (value) => {
    setEndDate(value);
  };

  const changeDatePickersValue = ({ unit, value }) => {
    setFromDate(moment().subtract(value, unit));
    setEndDate(moment());
  };

  const clickDateRangeBtnHandler = (e, val, idx) => {
    e.preventDefault();
    setCheckedBtns(
      produce((draft) => {
        draft[clickedBtnIdx].clicked = false;
        draft[clickedBtnIdx].line = 'gray';
        draft[clickedBtnIdx].color = 'gray';
        draft[idx].clicked = true;
        draft[idx].line = 'blue80';
        draft[idx].color = 'blue80';
        setClickedBtnIdx(idx);
      })
    );
    changeDatePickersValue(checkedBtns[idx]);
  };

  const handlePeriodBtnClick = useCallback((e, deps) => {
    setFromDate(moment().add(deps.value * -1, 'M'));
    setEndDate(moment());
  }, []);

  const handleCalendarClose = useCallback(() => {
    setIsFromCalPopOpen(false);
    setIsToCalPopOpen(false);
  }, []);

  const handleCalendarFromToggle = useCallback(
    (e, date) => {
      e.preventDefault();
      const nextIsOpen = !isFromCalPopOpen;
      setIsFromCalPopOpen(nextIsOpen);
      if (date) {
        setFromDate(date);
      }
      preventScroll(nextIsOpen);
    },
    [isFromCalPopOpen]
  );

  const handleCalendarToToggle = useCallback(
    (e, date) => {
      e.preventDefault();
      const nextIsOpen = !isToCalPopOpen;
      setIsToCalPopOpen(nextIsOpen);
      if (date) {
        setEndDate(date);
      }
      preventScroll(nextIsOpen);
    },
    [isToCalPopOpen]
  );

  // 처음 진입시 디폴드 날짜로 한번 검색 실행
  useEffect(() => {
    const param = {
      fromDate: fromDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    };
    if (succBidd) {
      dispatch(selectSuccBiddListAction(param));
    } else if (compBidd) {
      dispatch(selectCompBiddListAction(param));
    }
  }, []);

  if (hasMobile) {
    return (
      <>
        <ul className="m-toggle-list search">
          <MenuItem>
            <MenuTitle>
              <p className="tit2">{title}</p>
              <span>상세조회</span>
            </MenuTitle>
            <MenuCont>
              <MobButtonFilter
                checkList={[
                  { title: '1개월', checked: true, value: 1 },
                  { title: '3개월', checked: false, value: 3 },
                  { title: '6개월', checked: false, value: 6 },
                  { title: '1년', checked: false, value: 12 }
                ]}
                onClick={handlePeriodBtnClick}
              />
              <div className="mt8">
                <DatePicker defaultValue={fromDate} width="46%" onClick={handleCalendarFromToggle} />
                <em className="from">~</em>
                <DatePicker defaultValue={endDate} width="46%" onClick={handleCalendarToToggle} />
              </div>
              <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} onClick={searchBtnHandler} />
            </MenuCont>
          </MenuItem>
          <li>
            <div className="float-wrap">
              <p>
                {fromDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
              </p>
              {succBidd && (
                <p>
                  총 <span className="tx-blue80">{succBiddCount}</span>건
                </p>
              )}
              {compBidd && (
                <p>
                  총 <span className="tx-blue80">{compBiddCount}</span>건
                </p>
              )}
            </div>
          </li>
        </ul>
        {
          <>
            <div className={isFromCalPopOpen || isToCalPopOpen ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCalendarClose} />
            <MobBottomArea active={isFromCalPopOpen} isFixButton={true} zid={102}>
              <MobCalendar date={fromDate} callback={handleCalendarFromToggle} />
            </MobBottomArea>
            <MobBottomArea active={isToCalPopOpen} isFixButton={true} zid={102}>
              <MobCalendar date={endDate} callback={handleCalendarToToggle} />
            </MobBottomArea>
          </>
        }
      </>
    );
  }
  return (
    <>
      <table className="table-tp1 input search" summary="조회 영역">
        <caption className="away">조회 영역</caption>
        <colgroup>
          <col width="8.8%" />
          <col width="91.2%" />
        </colgroup>
        <tbody>
          <tr>
            <th>기간</th>
            <td>
              {/* <DatePicker defaultValue={fromDate} inputWidth={160} inputHeight={40} onChange={changeFromDatePickerHandler} disableDayBefore={beforeDate?.toDate()} /> */}
              <DatePicker defaultValue={fromDate} inputWidth={160} max={endDate} inputHeight={40} onChange={changeFromDatePickerHandler} disableDayAfter={endDate?.toDate()} />
              <em className="mg8">~</em>
              <DatePicker defaultValue={endDate} inputWidth={160} min={fromDate} max={moment().add(1, 'days')} inputHeight={40} onChange={changeEndDatePickerHandler} disableDayAfter={moment().toDate()} />
              {checkedBtns.map((v, idx) => (
                <Button size="mid" line={v.line} color={v.color} title={v.title} width={50} height={40} marginLeft={8} onClick={(e) => clickDateRangeBtnHandler(e, v.value, idx)} key={idx} />
              ))}
              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} onClick={searchBtnHandler} />
            </td>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <td>
              <p className="tx-exp-tp6">(* 최대 6개월까지 조회 가능합니다.)</p>
            </td>
          </tr>
        </tbody>
      </table>
      <ul className="float-wrap">
        <li>
            {succBidd && 
              <p>총 {succBiddCount} 대</p>
            }
            {compBidd && 
              <p>총 {compBiddCount} 대</p>
            }
        </li>
        <li>
          <CheckBox id={`chk-interest-car-2-1_${chk_idx}`} title="관심차량만" onChange={handleChkItrt} />
        </li>
      </ul>
    </>
  );
});

SearchForm.propTypes = {
  compBidd: PropTypes.bool,
  succBidd: PropTypes.bool,
  title: PropTypes.string
};

SearchForm.displayName = 'SearchForm';
export default SearchForm;
