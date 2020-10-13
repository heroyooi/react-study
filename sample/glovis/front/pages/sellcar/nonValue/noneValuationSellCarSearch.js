/**
 * 설명 : 셀프 판매 서비스 차량 조회
 * @fileoverview 셀프 판매 서비스 차량 조회 화면
 * @author 최승희
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 */

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import { isEmpty } from 'lodash';
import moment from 'moment';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import RenderHelper from '@lib/share/render/helper';
import AppLayout from '@src/components/layouts/AppLayout';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import { SystemContext } from '@src/provider/SystemProvider';
import { selectSellcarReqCarUseCheck } from '@src/api/sellcar/AllSellcarSearchApi';
// import { selectCarMart } from '@src/api/common/CarInfoApi';
import { getCarMartInfoAction, userInfoAction } from '@src/actions/sellcar/sellCarAction';
import Login from '@src/components/common/popup/LoginPop';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';
import { isAllowedUserType } from "@src/utils/sellcar/AuthUtil";
import { NONEVAL_STT } from '@src/constant/mbSlReqStt';
import { SELF_STT, REQ_TPCD, REQ_TPCD_NM } from '@src/constant/mbSlReqStt';

const prevPage = '/sellcar/nonValue/noneValuationCertify';
const nextPage = `/sellcar/nonValue/noneValuationSellCarInfo`;
const loginCallBackUrl = '/sellcar/nonValue/noneValuationSellCarSearch';
const UPDATE_AVAIL = [NONEVAL_STT.PUBLIC_TEMP, NONEVAL_STT.PUBLIC_FORM_COMPLETE];
const NO_EXIST_APP = "noExist";
const EXIST_APP    = "exist";

/**
 * 무 판매 서비스 차량 조회
 * @returns {NoneValuationSellCarSearch}
 */
const NoneValuationSellCarSearch = ({ crNo, tsKey, seriesno, }) => {
  const dispatch = useDispatch();  
  const [ applyBtnDisabled, setApplyBtnDisabled ] = useState( true );
  const [ logined, setLogined ] = useState(isLogin());
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  // const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const { car, userInfo, carSise  } = useSelector((rootStore) => rootStore.sellCarStore);
  const { showAlert, showConfirm } = useContext(SystemContext);

  /************************************* COMMON FUNCTION ****************************************************/

  /**
   * 신규 신청서 페이지로 이동
   */
  const goNewPage = useCallback(() => {
    const param = { crNo, tsKey, seriesno };
    Router.push(`${nextPage}?${qs.stringify(param)}`).then(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const goMyPage = useCallback((slReqId) => {
    location.href = `/mypage/personal/sellcar/sellCarView?slReqId=${slReqId}`;
  }, []);

  // 신청서 체크
  const duplicateCheckApplication = () => {
    const param = { crNo: car.crNo, ...userInfo };
    console.log("duplicateCheckApplication::", param, userInfo);
    let slReqId;
    let reqTpcd;
    let reqSttTpcd;
    let prevAppData;
    selectSellcarReqCarUseCheck(param)
      .then (res => {
        const { data, statusinfo } = res.data;
        if (statusinfo.returncd === '000') {
          return NO_EXIST_APP;
        } else if (statusinfo.returncd === '009') {
          prevAppData = data;
          slReqId = data?.sellcar?.slReqId;
          reqTpcd = data.reqTpcd;
          reqSttTpcd = data?.reqSttTpcd;
          return EXIST_APP;
        }
        return '';
      })
      .then( exist => {
        console.log("exist::", exist);
        if (NO_EXIST_APP === exist) {
          goNewPage();
        } else if ( EXIST_APP === exist ) {
          if( REQ_TPCD.NONEVAL === reqTpcd && prevAppData.availNewApp ) {            
            showConfirm('<p>기존 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? 이어서 하시겠습니까[취소]?</p>', () => {
              goNewPage();
            }, () => {
              goMyPage(slReqId);
            });
          } else {
            showAlert("<p>해당 차량에 대한 신청정보가 있습니다.</p>", () => {
              goMyPage(slReqId);
            });
          }
        }
      })
      .catch( err => {
        showAlert("기존 정보를 찾는 과정에서 에러가 발생했습니다.");
      });
  };

  /**
   * '신청 합니다.'버튼 핸들러
   * @param {*} e
   */
  const applyBtnHandler = (e) => {
    e.preventDefault();
    if (!logined) {
      rodalPopupHandler1(e);
    } else {
      duplicateCheckApplication();
    }
  };

  /**
   * 로그인 콜백 핸들러
   */
  const loginReturnCallback = async (loginCallback) => {
    const { isLogin } = loginCallback;
    if (isLogin) {
      await dispatch(userInfoAction({ ...loginCallback, type: loginCallback?.loginType }));
      modalCloseHandler1(false);
      duplicateCheckApplication();
      setLogined(isLogin);
    }
  };

  useEffect(() => {
    if (logined) {
      dispatch(userInfoAction(gInfoLive()));
    }
    if (!isEmpty(car)) {
      setApplyBtnDisabled(false);
    } else {
      Router.back();
    }
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매 Step1</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={1} />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <CarBasicInfoEditor item={car} isEditing={false} noneValuaction={true} dpDrvDist={false} />{/* 수정 */}
            <CarOptionsEditor
              items={car?.optionList}
              isEditing={false}
              test="dfsdfsdfvwertvkuhmdfiukhmviosuehmgoviushdmrilgch dfsdfsdfvwertvkuhmdfiukhmviosuehmgoviushdmrilgch dfsdfsdfvwertvkuhmdfiukhmviosuehmgoviushdmrilgch dfsdfsdfvwertvkuhmdfiukhmviosuehmgoviushdmrilgch smeigh,c"
            />
          </fieldset>
        </form>
        <p className="guide-ment">
          해당 정보는 실제 정보와 상이할 수 있습니다.
          <br />
          다음 단계에서 차량정보를 수정하세요.
          <br />
          해당 차량을 판매 차량으로 신청하시겠습니까?
        </p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="아니오, 새로 조회합니다." width={230} height={60} buttonMarkup={false} href={prevPage} />
          <Button size="big" background={applyBtnDisabled?"gray":"blue80"} title="예, 신청합니다." width={230} height={60} buttonMarkup={true} disabled={applyBtnDisabled} onClick={(e) => applyBtnHandler(e, 'fade')} />
        </Buttons>
      </div>
      {
        rodalShow1
        ?
        <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
          <Login url={`${loginCallBackUrl}?crNo=${crNo}`} type="sellcar" successCallback={loginReturnCallback} />
        </RodalPopup>
        :
        null
      }
    </AppLayout>
  );
};

NoneValuationSellCarSearch.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { crNo, tsKey, seriesno } = query;
  // 카마트에서 정보를 조회한다.
  // await helper.dispatch(getCarMartInfoAction({crNo, tsKey, seriesno,}));

  return { crNo, tsKey, seriesno };
};

export default NoneValuationSellCarSearch;
