/* eslint-disable no-alert */
/**
 * 설명 : 쿠폰등록
 * @fileoverview 내차팔기>딜러마이페이지>포인트/쿠폰
 * @requires [pointCuponHistoryAction,pointCuponHistory]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _, { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

import * as DateUtils from '@src/utils/DateUtils';
import { getCouponHistoryList, setCouponHistory, getCoupon, setCoupon } from '@src/actions/mypage/dealer/pointCuponHistoryAction';

/**
 * 설명 : 쿠폰번호의 사용 가능 여부를 조회하고 등록한다.
 * @param {state.pointCupon.couponData} 조회한 쿠폰 정보
 * @param {state.pointCupon.useCouponList} 사용가능 쿠폰 목록
 * @returns {registerCupon} 쿠폰 조회/등록
 */
const RegisterCupon = ({ show = false, onChange }) => {
  const dispatch = useDispatch();
  const couponData = useSelector((state) => state.pointCupon.couponData);
  const useCouponList = useSelector((state) => state.pointCupon.useCouponList);

  const [rodalShow, setRodalShow] = useRodal(show);
  const [coupData, setCoupData] = useState('');
  const [flag, setFlag] = useState('');
  const [couponNo, setCouponNo] = useState('');
  const [couponNo1, setCouponNo1] = useState('');
  const [couponNo2, setCouponNo2] = useState('');
  const [couponNo3, setCouponNo3] = useState('');

  useEffect(() => {
    setRodalShow(show);
  }, [setRodalShow, show]);

  useEffect(() => {
    console.log(couponData);
    setCoupData(couponData);
  }, [couponData]);
  console.log(coupData);

  useEffect(() => {
    setCoupData('');
  }, [flag]);

  const onChangeHandler1 = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCouponNo1(e.target.value);
    setCouponNo(couponNo1 + couponNo2 + couponNo3);
  };

  const onChangeHandler2 = (e) => {
    e.preventDefault();
    setCouponNo2(e.target.value);
    setCouponNo(couponNo1 + couponNo2 + couponNo3);
  };

  const onChangeHandler3 = (e) => {
    e.preventDefault();
    setCouponNo3(e.target.value);
    setCouponNo(couponNo1 + couponNo2 + couponNo3);
  };

  const searchCoupon = useCallback(
    (e) => {
      e.preventDefault();

      console.log(couponNo1);
      console.log(couponNo2);
      console.log(couponNo3);
      //setCoupData(couponNo1+couponNo2+couponNo3);

      if (isEmpty(couponNo1) || isEmpty(couponNo2) || isEmpty(couponNo3)) {
        alert('쿠폰번호를 입력하세요.');
        return;
      }

      setCouponNo(couponNo1 + couponNo2 + couponNo3);
      //setFlag('search');
      dispatch(getCoupon(couponNo1 + couponNo2 + couponNo3));
    },
    [couponNo, dispatch]
  );

  const modalClose = useCallback(
    (e) => {
      setCouponNo('');
      setCoupData('');
      setFlag('');
      if (onChange) onChange(e);
    },
    [onChange]
  );

  const rodalHandler = useCallback(
    (e, rodalFlag) => {
      e.preventDefault();

      if (rodalFlag === 'reg') {
        const data = {
          coupId: couponNo,
          // mbId: 'abc123',
          coupUseYmd: null
        };
        dispatch(setCoupon(data));
      } else if (rodalFlag === 'reset') {
        console.log('reset');
        setCouponNo('');
        setCouponNo1('');
        setCouponNo2('');
        setCouponNo3('');
        setCoupData('');
        setFlag('');
        return;
      }
      modalClose();
    },
    [coupData, dispatch, modalClose, useCouponList]
  );

  return (
    <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalClose} title="쿠폰등록" mode="normal" size="small">
      <div className="con-wrap popup-coupon">
        {isEmpty(coupData) && (
          <span>
            <label htmlFor="coupon-num">쿠폰번호</label>
            <span className="bridge">
              {/*
                <Input type="text" placeHolder="예) 030480293-2348" id="coupon-num" width={259} height={48} value={couponNo} onChange={onChangeHandler} />
                */}
              <Input type="text" placeHolder="" id="coupon-num1" width={120} height={48}  value={couponNo1} onChange={onChangeHandler1} maxLength="6" />
              <span className="ml8 mr8">-</span>
              <Input type="text" placeHolder="" id="coupon-num2" width={80} height={48} value={couponNo2} onChange={onChangeHandler2} maxLength="4" />
              <span className="ml8 mr8">-</span>
              <Input type="text" placeHolder="" id="coupon-num3" width={60} height={48} value={couponNo3} onChange={onChangeHandler3} maxLength="2" />
            </span>
            <Button size="big" background="blue80" title="조회" width="119" onClick={searchCoupon} />
          </span>
        )}
        {!isEmpty(coupData) &&
          (coupData.cnt != 0 && coupData.regCnt == 0 ? (
            <span>
              <div className="have-coupon">
                쿠폰명: {coupData.coupNm}
                <br />
                유효기간: ~ {coupData.regDt} 까지
              </div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} onClick={(e) => rodalHandler(e)} />
                <Button size="big" background="blue80" title="등록" width={127} onClick={(e) => rodalHandler(e, 'reg')} />
              </Buttons>
            </span>
          ) : coupData.cnt == 0 && coupData.regCnt != 0 ? (
            <span>
              <div className="none-coupon">이미 등록된 쿠폰입니다.</div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} onClick={(e) => rodalHandler(e)} />
              </Buttons>
            </span>
          ) : coupData.cnt == 0 && coupData.regCnt == 0 ? (
            <span>
              <div className="none-coupon">조회되는 쿠폰이 없습니다.</div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} onClick={(e) => rodalHandler(e)} />
                <Button size="big" background="light-gray" title="등록" width={127} onClick={(e) => rodalHandler(e, 'reset')} />
              </Buttons>
            </span>
          ) : (
            <span>
              <div className="none-coupon">이미 등록된 쿠폰입니다.</div>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} onClick={(e) => rodalHandler(e)} />
              </Buttons>
            </span>
          ))}
      </div>
    </RodalPopup>
  );
};

RegisterCupon.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func
  // mbId: PropTypes.string
};

export default RegisterCupon;
