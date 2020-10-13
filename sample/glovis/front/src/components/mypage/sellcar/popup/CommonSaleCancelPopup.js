/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/**
 * 내차팔기 공통 판매 취소 처리 팝업
 * @fileoverview 내차팔기 공통 판매 취소 처리
 * @author 김민철
 */
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import Textarea from '@lib/share/items/Textarea';
import { SystemContext } from '@src/provider/SystemProvider';
import * as SelfApi from '../../../../api/sellcar/SelfSellcarApi';
import * as NonevalApi from '../../../../api/sellcar/NonevalSellcarApi';
import { getReqAction, updateReqSttTpcd } from '../../../../actions/sellcar/sellCarAction';
import { REQ_TPCD, REQ_TPCD_NM } from '../../../../constant/mbSlReqStt';
/**
 * 내차팔기 공통 판매 취소 처리 팝업
 * @fileoverview 내차팔기 판매 취소 처리
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {Object} reqInfo 신청서 정보
 * @returns {SelfReqCancel}
 */

const actionMap = {};
actionMap[REQ_TPCD.SELF] = SelfApi.updateForSaleCancel;
actionMap[REQ_TPCD.NONEVAL] = NonevalApi.updateSaleCancel;

const cancelReasons = [
  {
    id: 'cnclRsnTpcd1',
    value: 1,
    title: '단순변심'
  },
  {
    id: 'cnclRsnTpcd2',
    value: 2,
    title: '정보수정필요/재판매예정'
  },
  {
    id: 'cnclRsnTpcd3',
    value: 3,
    title: '견적불만/입찰자없음'
  },
  {
    id: 'cnclRsnTpcd4',
    value: 4,
    title: '기타'
  }
];
const SelfReqCancel = ({ seller, closedHandler }) => {
  const dispatch = useDispatch();
  const [cnclRsnTpcd, setCnclRsnTpcd] = useState(1);
  const [cnclRsnTpcdNm, setCnclRsnTpcdNm] = useState('');

  const { showAlert } = useContext(SystemContext);

  // 판매 취소 버튼 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    const apiMethod = actionMap[seller.reqTpcd];
    // console.log('apiMethod', seller, apiMethod);
    if (apiMethod) {
      const params = {
        slReqId: seller.slReqId,
        cnclRsnTpcd,
        cnclRsnTpcdNm
      };
      apiMethod(params)
        .then((res) => {
          if (res.data.statusinfo.returncd === '000') {
            dispatch(getReqAction(params.slReqId));
            // dispatch(
            //   updateReqSttTpcd({
            //     slReqId: seller.slReqId,
            //     reqSttTpcd: res.data.data.reqSttTpcd,
            //     reqSttTpcdNm: res.data.data.reqSttTpcdNm
            //   })
            // );
            showAlert('취소 신청이 완료되었습니다.', () => {
              closedHandler(false);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="con-wrap popup-cancel">
      <p>취소 사유를 선택해주세요.</p>
      <ul>
        <li>
          <Radio
            className="txt"
            id="cancel1"
            title="단순 변심"
            value={1}
            checked={cnclRsnTpcd}
            onChange={(e) => {
              setCnclRsnTpcd(parseInt(e.target.value));
            }}
          />
        </li>
        <li>
          <Radio
            className="txt"
            id="cancel2"
            title="정보 수정 필요/재 판매 예정"
            value={2}
            checked={cnclRsnTpcd}
            onChange={(e) => {
              setCnclRsnTpcd(parseInt(e.target.value));
            }}
          />
        </li>
        <li>
          <Radio
            className="txt"
            id="cancel3"
            title="견적 불만/입찰자 없음"
            value={3}
            checked={cnclRsnTpcd}
            onChange={(e) => {
              setCnclRsnTpcd(parseInt(e.target.value));
            }}
          />
        </li>
        <li>
          <Radio
            className="txt"
            id="cancel4"
            title="기타"
            value={4}
            checked={cnclRsnTpcd}
            onChange={(e) => {
              setCnclRsnTpcd(parseInt(e.target.value));
            }}
          />
        </li>
      </ul>
      <Textarea
        countLimit={200}
        type="tp1"
        onBlur={(e) => {
          setCnclRsnTpcdNm(e.target.value);
        }}
        placeHolder="기타 사유를 작성해주세요."
      />
      <Buttons align="center" marginTop={48}>
        <Button size="big" background="blue80" title="판매취소" width={180} height={60} onClick={submitHandler} />
      </Buttons>
    </div>
  );
};

SelfReqCancel.propTypes = {
  seller: PropTypes.object,
  closedHandler: PropTypes.func
};

export default SelfReqCancel;
