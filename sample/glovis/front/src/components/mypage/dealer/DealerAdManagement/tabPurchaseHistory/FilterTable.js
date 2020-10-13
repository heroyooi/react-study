import React, { useState, useEffect, createElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';
import { produce } from 'immer';

import CheckBox from '@lib/share/items/CheckBox';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Radio from '@lib/share/items/Radio';

import MobSelectBox from '@lib/share/items/MobSelectBox';

import HistoryFilter from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/HistoryFilter';
import ColGroup from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/ColGroup';
import PageNavigator from '@src/components/common/PageNavigator';
import { setComma } from '@src/utils/StringUtil';
import { getPaymentAction, getEvidenceAction } from '@src/actions/mypage/dealer/dealerAdverAction';
import MobSelectList from '@lib/share/items/MobSelectList';

// const paymentOptions = [
//   { id: '01', value: 1, checked: true, disabled: false, label: '신용카드(ISP)' },
//   { id: '02', value: 2, checked: false, disabled: false, label: '신용카드(안심클릭)' },
//   { id: '03', value: 3, checked: false, disabled: false, label: '실시간계좌이체(K계좌이체)' },
//   { id: '04', value: 4, checked: false, disabled: false, label: '실시간계좌이체(I계좌이체)' },
//   { id: '05', value: 5, checked: false, disabled: false, label: '휴대폰' },
//   { id: '06', value: 6, checked: false, disabled: false, label: '무통장입금(가상계좌)' },
//   { id: '07', value: 7, checked: false, disabled: false, label: '폰빌전화결제' },
//   { id: '08', value: 8, checked: false, disabled: false, label: '옐로페이' },
//   { id: '09', value: 9, checked: false, disabled: false, label: '빌립키발급' }
// ];

const globalThis = require('globalthis')();

const paymentMethods = [
  { code: '01', label: '신용카드' },
  { code: '02', label: '휴대전화' },
  { code: '03', label: '무통장입금' },
  { code: '04', label: '쿠폰/포인트' },
  { code: '05', label: '간편결제' }
];

const services = [
  { code: '01', label: '서비스1' },
  { code: '02', label: '서비스2' },
  { code: '03', label: '서비스3' },
  { code: '04', label: '서비스4' },
  { code: '05', label: '서비스5' }
];

const evidences = [
  { code: '01', label: '현금영수증' },
  { code: '02', label: '세금계산서' }
];

const FilterTable = ({ params = {}, onSubmit, children, text, cols = [], totalCnt, limitationYear = 1 }) => {
  const [newParams, setNewParams] = useState(params);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const pushState = (e) => {
    if (e !== undefined) e.preventDefault();
    onSubmit && onSubmit(newParams);
  };

  const onChangeDate = (values) => {
    console.log('onChangeDate -> values', values);
    setNewParams(
      produce(newParams, (draft) => {
        Object.keys(values).forEach((key) => {
          draft[key] = values[key];
        });
      })
    );
  };

  // const [selectedPayment, setSelectedPayment] = useState(null);

  //결제 타입 지정
  // const onClickSearchType = (e, values) => {
  //   console.log(e, values);
  //   if (adv === true) {
  //     if (values === 0) {
  //       setSelectedPayment(undefined);
  //     } else {
  //       setSelectedPayment(values);
  //       setNewParams(
  //         produce(newParams, (draft) => {
  //           draft.payMthdCd = values.id;
  //         })
  //       );
  //     }
  //     console.log('searchType : ', values.id);
  //   }
  // };

  useEffect(() => {
    setNewParams(params ?? {});
  }, [params]);

  if (hasMobile) {
    return (
      <>
        {/* {adv === true && (
          <div className="float-wrap mb16">
            <p className="movie-link-wrap">결제수단</p>
            <MobSelectList itemsSource={paymentOptions} selectedItem={selectedPayment} displayMemberPath={'label'} selectedValuePath={'value'} placeHolder="결제수단" onClick={onClickSearchType} />
          </div>
        )} */}
        {/* <div className="float-wrap mb12">
          <p className="movie-link-wrap">결제수단</p>
          <MobSelectBox
            placeHolder="전체"
            options={[
              { id: 'payment1', value: 1, checked: false, disabled: false, label: '신용카드' },
              { id: 'payment2', value: 2, checked: false, disabled: false, label: '휴대전화' },
              { id: 'payment3', value: 3, checked: false, disabled: false, label: '무통장입금' },
              { id: 'payment4', value: 4, checked: false, disabled: false, label: '쿠폰/포인트' },
              { id: 'payment5', value: 5, checked: false, disabled: false, label: '간편결제' }
            ]}
            width="70%"
          />
        </div>
        <div className="float-wrap mb16">
          <p className="movie-link-wrap">상태</p>
          <MobSelectBox
            placeHolder="전체"
            options={[
              { id: 'goods1', value: 1, checked: false, disabled: false, label: '경매 낙찰 이용권' },
              { id: 'goods2', value: 2, checked: false, disabled: false, label: '대당이용권' },
              { id: 'goods3', value: 3, checked: false, disabled: false, label: '자유이용권' },
              { id: 'goods4', value: 4, checked: false, disabled: false, label: '데이트 20 대당' },
              { id: 'goods5', value: 5, checked: false, disabled: false, label: '업데이트 20 자유' },
              { id: 'goods6', value: 6, checked: false, disabled: false, label: 'Live Studio' },
              { id: 'goods7', value: 7, checked: false, disabled: false, label: 'Live Shot' },
              { id: 'goods5', value: 5, checked: false, disabled: false, label: '프라이싱 조회권' }
            ]}
            width="70%"
          />
        </div> */}
        <HistoryFilter limitationYear={limitationYear} params={newParams} onChangeDate={onChangeDate} />
        <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} onClick={pushState} />
      </>
    );
  }

  return (
    <>
      <table className="table-tp1 input search" summary="조회 영역">
        <caption className="away">조회 영역</caption>
        <ColGroup cols={cols} />
        <tbody>
          {children}
          <tr>
            <th>기간</th>
            <td colSpan={cols?.length ?? 0}>
              <HistoryFilter limitationYear={limitationYear} params={newParams} onChangeDate={onChangeDate} />
              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} buttonMarkup={true} onClick={pushState} />
            </td>
          </tr>
          {text && (
            <tr>
              <th></th>
              <td colSpan={cols?.length ?? 0}>
                <p className="tx-exp-tp6">{text}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default FilterTable;
