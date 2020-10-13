/**
 * 설명 : 셀프 판매 서비스 차량 조회
 * @fileoverview 셀프 판매 서비스 차량 조회 화면
 * @author 최승희
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 */

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
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
import { getCarMartInfoAction, userInfoAction } from '@src/actions/sellcar/sellCarAction';
import Login from '@src/components/common/popup/LoginPop';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';
import { SELF_STT, REQ_TPCD, REQ_TPCD_NM } from '@src/constant/mbSlReqStt';

const prevPage = `/sellcar/self/selfCertify`;
const nextPage = `/sellcar/self/selfSellCarInfo`;
const loginCallBackUrl = '/sellcar/self/selfSellCarSearch';
const UPDATE_AVAIL = [SELF_STT.PUBLIC_TEMP, SELF_STT.PUBLIC_FORM_COMPLETE];
const COMPARE_ING  = [SELF_STT.SELFSALE_COMPARE_APPROVE, SELF_STT.SELFSALE_CHECK_ESTIMATES ];
const COMPARE_END  = [SELF_STT.SELFSALE_DECIDED_TO_SALE];
const OFF_DEAL_ING = [SELF_STT.SELFSALE_CONSIGNMENT];
const OFF_DEAL_END = [SELF_STT.PUBLIC_FINAL];
const NO_EXIST_APP = "noExist";
const EXIST_APP    = "exist";

/**
 * 셀프 판매 서비스 차량 조회
 * @returns {SelfSellCarSearch}
 */
const selfSellCarSearch = ({crNo, tsKey, seriesno, loginCallback, data}) => {
  const dispatch = useDispatch();
  const { showAlert, showConfirm } = useContext(SystemContext);
  const { car, carHistory, userInfo, carSise } = useSelector((rootStore) => rootStore.sellCarStore);
  const [logined, setLogined] = useState(isLogin());
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);

  /************************************* COMMON FUNCTION ****************************************************/

  /**
   * 신규 신청서 페이지로 이동
   */
  const goNewPage = useCallback(() => {
    const param = carSise.type === 'sise' ? carSise : carHistory;
    Router.push(`${nextPage}?${qs.stringify(param)}`).then(() => {
      window.scrollTo(0, 0);
    });
  }, [carHistory, carSise]);

  /**
   * 마이페이지로 이동
   */
  const goMyPage = useCallback((slReqId) => {
    location.href = `/mypage/personal/sellcar/sellCarView?slReqId=${slReqId}`;
  }, []);

  /**
   * 카마트에서 차량 정보 가져오기
   */
  const getCarInfoFromCarmart = useCallback(() => {
    dispatch(getCarMartInfoAction({
      crNo, tsKey, seriesno,
    }));
  }, []);

  /**
   * TS 인증받았는지 여부 확인
   */
  const checkTsAuthorized = useCallback(() => {
    // console.info("checkTsAuthorized::",carHistory);
    const success = !carHistory.authorized || carHistory.crNo === undefined ? false : true;
    if (!success) {
      showAlert('TS인증이 완료되지 않았습니다.', () => {
        location.href = `${prevPage}`;
      });
    }
  }, []);

  /**
   * 중복 신청서가 있는지 체크한다.
   */
  const duplicateCheckApplication = useCallback(() => {
    const param = { crNo: carHistory.crNo, ...userInfo };
    // console.log("checkApplication::", param, userInfo);
    let slReqId;
    let reqTpcd;
    let reqSttTpcd;
    let prevAppData;
    selectSellcarReqCarUseCheck(param)
      .then((res) => {
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
        if (NO_EXIST_APP === exist) {
          goNewPage();
        } else if ( EXIST_APP === exist ) {
          if( REQ_TPCD.SELF === reqTpcd  ) {
            if( prevAppData.availNewApp ) {
              showConfirm('<p>기존 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? 이어서 하시겠습니까[취소]?</p>', () => {
                goNewPage();
              }, () => {
                goMyPage(slReqId);
              });
            } else {
              if ( COMPARE_ING.includes(reqSttTpcd) ){
                showAlert("<p>해당 차량은 비교견적이 진행중입니다.</p>", () => {
                  goMyPage(slReqId);
                });
              } else if ( COMPARE_END.includes(reqSttTpcd)){
                showAlert("<p>해당 차량은 비교견적이 완료되었습니다.</p>", () => {
                  goMyPage( slReqId );
                });
              } else {
                showAlert("<p>해당 차량에 대한 신청정보가 있습니다.</p>", () => {
                  goMyPage( slReqId );
                });
              }
            }
          } else {
            const reqTpcdNm = REQ_TPCD_NM[prevAppData.sellcar.reqTpcd];
            if (prevAppData.availNewApp) {
              showConfirm(`<p>${reqTpcdNm}로 신청한 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? 이어서 하시겠습니까[취소]?</p>`, 
                () => {
                  goNewPage();
                },
                () => {
                  goMyPage(slReqId);
                }
              );
            } else {
              showAlert(`<p>해당 차량은 ${reqTpcdNm}로 판매진행중에 있습니다.</p>`, () => {
                goMyPage(slReqId);
              });
            }
          }
        }
      })
      .catch( err => {
        showAlert("기존 정보를 찾는 과정에서 에러가 발생했습니다.");
      });
  }, []);

  /************************************* EVENT HANDLER ****************************************************/

  /**
   * '신청 합니다.'버튼 핸들러
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
    // console.log("loginReturnCallback::",loginCallback);
    const { isLogin } = loginCallback;
    if (isLogin) {
      await dispatch(userInfoAction({...loginCallback, type:loginCallback?.loginType}));
      modalCloseHandler1(false);
      duplicateCheckApplication();
      setLogined(isLogin);
    }
  };

  /************************************* USE EFFECT ****************************************************/

  useEffect(() => {
    // TS 인증후에 해당 페이지로 넘어왔는지 확인
    checkTsAuthorized();
    // Car History에서 차량 정보를 조회한다.
    // getCarInfoFromCarmart();
    // 로그인 회원이라면 회원정보를 가져온다.
    if (logined) {
      // 로그인 회원의 정보를 리듀서에 담는다.
      dispatch(userInfoAction(gInfoLive()));
    }
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3><span className="stp"><b>비교견적</b>으로 내 차 팔기</span>Step 1</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={1} />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <legend className="away">차량 정보 조회 </legend>
            <CarBasicInfoEditor item={car} isEditing={false} />
            <CarOptionsEditor items={car?.optionList} isEditing={false} />
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
          <Button size="big" background="gray" title="아니오, 새로 조회합니다." width={230} height={60} href={prevPage} />
          <Button size="big" background="blue80" title="예, 신청합니다." width={230} height={60} buttonMarkup={true} onClick={(e) => applyBtnHandler(e)} />
        </Buttons>
      </div>
      {rodalShow1 
        ?
        <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
          <Login url={`${loginCallBackUrl}?crNo=${carHistory.crNo}`} type="sellcar" successCallback={loginReturnCallback}/>
        </RodalPopup>
        :
        null}
       
    </AppLayout>
  );
};

selfSellCarSearch.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { crNo, tsKey, seriesno, loginCallback, data } = query;
  // 카마트에서 정보를 조회한다.
  await helper.dispatch(getCarMartInfoAction({ crNo, tsKey, seriesno }));

  return { crNo, tsKey, seriesno, loginCallback, data };
};

export default selfSellCarSearch;
