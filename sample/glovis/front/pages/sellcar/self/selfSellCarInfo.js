/**
 * 설명 : 셀프 판매 서비스 차량 정보
 * @fileoverview 셀프 판매 서비스 차량 정보 화면
 * @author 최승희
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 * @requires CarAddOptionsEditor
 * @requires CarDetailInfoEditor
 * @requires CarSellerInfoEditor
 * @requires CarAgreeBox
 */

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { createValidator } from '@lib/share/validator';
import carSchema from '@lib/share/validator/sellcar/Car';
import sellerSchema from '@lib/share/validator/sellcar/Seller';
import RenderHelper from '@lib/share/render/helper';

import AppLayout from '@src/components/layouts/AppLayout';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
import CarDetailInfoEditor from '@src/components/sellcar/self/CarDetailInfoEditor.js';
import CarSellerInfoEditor from '@src/components/sellcar/self/CarSellerInfoEditor.js';
import CarAgreeBox from '@src/components/sellcar/self/CarAgreeBox.js';
import { isLogin, gInfoLive, UserType } from '@src/utils/LoginUtils';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
import * as sellcarApi from '@src/api/sellcar/CommonSellcarApi';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import qs from 'qs';
import { SystemContext } from '@src/provider/SystemProvider';
import { insertReqAction, updateReqAction } from '@src/actions/sellcar/SelfSellCarAction';
import { restValidAction, insertValidAction } from '@src/actions/sellcar/ValidAction';
import { getCarMartInfoAction, getReqAction, inputPropAction, copyUserInfoAction } from '@src/actions/sellcar/sellCarAction';

const nextPage = `/sellcar/self/selfSellCarPicture`;
const prevPage = `/sellcar/self/selfSellCarSearch`;

const insertValidator = createValidator(
  {
    ...carSchema,
    ...sellerSchema
  },
  {
    required: [
      'crNo',
      'crMnfcCd',
      'crMdlCd',
      'crDtlMdlCd',
      'crClsCd',
      'crDtlClsCd',
      'crClrCd',
      'dspl',
      'crTypeCd',
      'crUseDvcd',
      'crRlsPrc',
      'mssDvcd',
      'drvDist',
      'spExchYn',
      'frmYyyy',
      'hpPn',
      'rgstRsdcAddrCd',
      'rgstRsdcDtlAddrCd',
      'collectAgree'
    ]
  }
);

const updateValidator = createValidator(
  {
    ...carSchema,
    ...sellerSchema
  },
  {
    required: [
      'slReqId',
      'crNo',
      'crMnfcCd',
      'crMdlCd',
      'crDtlMdlCd',
      'crClsCd',
      'crDtlClsCd',
      'crClrCd',
      'dspl',
      'crTypeCd',
      'crUseDvcd',
      'mssDvcd',
      'drvDist',
      'spExchYn',
      'frmYyyy',
      'hpPn',
      'rgstRsdcAddrCd',
      'rgstRsdcDtlAddrCd',
      'collectAgree'
    ]
  }
);

const INSERT = 'insert';
const UPDATE = 'update';

const SAVEACTION = {
  insert: insertReqAction,
  update: updateReqAction
};

/**
 * 셀프 판매 서비스 차량 정보 확인
 * @returns {selfSellCarInfo}
 */
const SelfSellCarInfo = ({ query }) => {
  const dispatch = useDispatch();
  const [instUpdtMode, setMode] = useState(isEmpty(query.slReqId) ? INSERT : UPDATE);  
  const { seller, car, collectAgree } = useSelector((rootStore) => rootStore.sellCarStore);
  const { showAlert, showConfirm } = useContext(SystemContext);

  const saveType = isEmpty(query.slReqId) ? 'insert' : 'update';

  /*************************************** COMMON FUNCTION **********************************************/
  const checkAccessAllowed = async () => {
    const noSellerInfo = (seller.nmbNm === undefined || seller.nmbNm === '' || seller.hpPn === undefined);
    if (noSellerInfo) {
      let alertMsg = '';
      if (isLogin()) {
        alertMsg = '이전 단계에서 다시 진행요청드립니다.';
      } else {
        alertMsg = '비회원 인증을 다시 요청드립니다.';
      }
      showAlert(alertMsg, () => {        
        location.href = `selfSellCarSearch?${qs.stringify(query)}`;
      });
    }
  };

  const save = async () => {
    const params = {
      ...seller,
      car
    };
    return await dispatch(SAVEACTION[instUpdtMode](params));
  };

  const tempSave = async () => {
    const data = await save();
    if (data) {
      showAlert(`임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.`);
      setMode(UPDATE);
    } else {
      showAlert(`임시저장에 실패했습니다.`);
    }
  };

  const goNextStep = (e) => {
    e.preventDefault();

    const {drvDist, tsDrvDist} = car;
    if (drvDist < tsDrvDist) {
      showAlert('주행거리 입력확인<br/>TS에서 제공한 주행거리 보다 입력하신 주행거리가 짧습니다.<br/>입력하신 주행거리가 맞는지 확인해 주시기 바랍니다.');
      return false;
    }

    const validator = saveType === 'insert' ? insertValidator : updateValidator;
    const valid = validator.validate({
      ...car,
      ...seller
    });
    console.log("goNextStep -> valid", valid)
    console.log("goNextStep::", car);
    if (valid.success) {
      dispatch(restValidAction());
      showConfirm('저장 후, 다음단계로 이동하시겠습니까?', () => {
        save().then((data) => {
          console.log("goNextStep::", data);
          if (data?.slReqId !== undefined) {
            console.log("goNextStep::", data?.slReqId);
            Router.push(`${nextPage}?slReqId=${data.slReqId}`).then(() => {
              window.scrollTo(0, 0);
            });
          } else {
            showAlert('저장에 실패했습니다.');
          }
        });
      });
    } else {
      dispatch(insertValidAction(valid.error));
    }
  };

  /************************************* USE EFFECT ****************************************************/

  useEffect(() => {
    if (seller.slReqId !== undefined) {
      setMode(UPDATE);
    } else {
      // dispatch(inputPropAction({ state: 'seller', prop: 'nmbNm', value: gInfoLive().name }));
      // if (gInfoLive().membertype === UserType.MEMBER) {
      //   sellcarApi.getHpPn({ mbId: gInfoLive().id }).then((res) => {
      //     const { statusinfo, hpPn } = res.data;
      //     if (statusinfo.returncd === '000') {
      //       dispatch(inputPropAction({ state: 'seller', prop: 'hpPn', value: setHpPnFormat(hpPn) }));
      //     }
      //   });
      // }
      dispatch(copyUserInfoAction());
    }
  }, [seller]);

  useEffect(() => {
    checkAccessAllowed();
    if (query.slReqId !== undefined) {
      dispatch(getReqAction(query.slReqId));
    } else if (query.crNo !== undefined) {
      dispatch(getCarMartInfoAction({
        crNo : query.crNo,
        tsKey : query.tsKey,
        seriesno : query.seriesno,
      }));
    }
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3><span className="stp"><b>비교견적</b>으로 내 차 팔기</span>Step 2</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={2} />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <CarBasicInfoEditor item={car} isEditing={true} />
            <CarOptionsEditor items={car.optionList} isEditing={true} />
            <CarAddOptionsEditor items={car.optionList} item={car} isEditing={true} />
            <CarDetailInfoEditor item={car} isEditing={true} />
            <CarSellerInfoEditor className="mt64" item={seller} isEditing={true} nameEdit={false} viewAddress={false} viewAccountNo={false} />
            <CarAgreeBox collectAgree={collectAgree} type="self" />
          </fieldset>
        </form>
        <Buttons align="right" marginTop={78}>
          <Button size="big" background="gray" title="임시 저장" width={125} height={60} onClick={tempSave} buttonMarkup={true} />
          <Button size="big" background="blue80" title="다음 단계(차량 사진 등록)" width={239} height={60} onClick={goNextStep} buttonMarkup={true} />
        </Buttons>
      </div>
    </AppLayout>
  );
};

/**
 * @memberof module:selfSellCarInfo
 * @desc scheme object를 조합해서 데이터검증을 할 수 있게 도와주는 인스턴스 객체
 */
SelfSellCarInfo.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, isServer } = helper;
  const { crNo, slReqId, tsKey, seriesno } = query;
  return {
    query: {
      crNo,
      slReqId,
      tsKey,
      seriesno,
    }
  };
};

SelfSellCarInfo.propTypes = {
  query: PropTypes.object
};

export default SelfSellCarInfo;
