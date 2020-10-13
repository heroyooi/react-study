/* eslint-disable react-hooks/rules-of-hooks */
/**
 * 회원 마이페이지 내차팔기 신청정보 디테일
 * @fileOverview 회원 마이페이지 내차팔기 신청정보 디테일
 * @requires VisitDetail
 * @requires SelfDetail
 * @requires NonevalDetail
 * @Author 김민철
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes, { number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import Router from 'next/router';
import CarSpecificsEditor from '@src/components/sellcar/self/CarSpecificsEditor.js';
import AppLayout from '@src/components/layouts/AppLayout';
import CarPictureApply from '@src/components/common/CarPictureApply';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input'; //#a2
import Textarea from '@lib/share/items/Textarea'; //#a2
import Radio from '@lib/share/items/Radio';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { selectSellcarAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';
// import * as nonevalUtil from '@src/utils/sellcar/NonevalUtil';
import { selectSellcar } from '@src/api/sellcar/AllSellcarSearchApi';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';

import { setComma, getLabelFromArray } from '@src/utils/StringUtil';
import { selectAllCarTypeList } from '@src/api/common/CarInfoApi';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { carFrmYyyyList, carUseDvcdList } from '@src/constant/carTypeCd';
import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateCancel, insertAbleRequestConsign, updateSaleProcDecide, selectNonevalCnsg, selectNonevalCnclCnsg } from '@src/actions/sellcar/NonevalSellCarAction';

// import { updateSaleCancel, updateSaleProcDecide } from '@src/api/sellcar/NonevalSellcarApi';
import { isLogin } from '@src/utils/LoginUtils';
import { preventScroll } from '@src/utils/CommonUtil';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import CarOptionsEditor from '../../../../src/components/sellcar/self/CarOptionsEditor';

/**
 * 마이페이지 내차팔기 신청정보 디테일
 * @param {Object} props
 * @param {Object} props - props object
 * @param {String} props.slReqId - 판매 신청서 아이디
 * @returns {SellCarView}
 */

const NonevalSellCarView = ({ slReqId, reqTpcd }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  //carBasicInfoEditor에서 가져옴
  const parseResults = (result) => {
    const { data } = result?.data;
    if (data?.every((res) => !!res)) {
      return data?.map(({ id, name, bsno }) => ({
        value: id.toString(),
        label: name,
        bsno
      }));
    }
  };

  //취소신청 완료 핸들러
  const [cancelChkShow, setCancelChkShow, cancelChkPopupHandler, cancelChkCloseHandler] = useRodal(false, true);
  //취소확인 핸들러
  const [cancelShow2, setCancelShow2, cancelPopupHandler2, cancelCloseHandler2] = useRodal(false, true);
  //예상견적 확인팝업 핸들러
  const [exRodal, setExRodal, cancelExRodal, cancelCloseExRodal] = useRodal(false, true);
  //예상견적 판매진행 핸들러
  const [exRodalConfirm, setExRodalConfirm, cancelExRodalConfirm, cancelCloseExRodalConfirm] = useRodal(false, true);
  //차량 탁송중 예상견적, 탁송정보 핸들러
  const [consignRodal, setConsignRodal, cancelConsignRodal, cancelCloseConsignRodal] = useRodal(false, true);
  //차량 최종견적 확인팝업 핸들러
  const [priceRodal, setPriceRodal, cancelPriceRodal, cancelClosePriceRodal] = useRodal(false, true);
  //최종견적 팝업에서 판매진행 누르면 나오는 팝업 핸들러
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false, true);
  const { showAlert, showConfirm } = useContext(SystemContext);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '무평가 신청 내역',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isLogin()) {
      location.href = '/login';
    }
    //dispatch(getReqAction(slReqId));
    selectSellcar({ slReqId })
      .then((res) => {
        const {
          data: seller,
          statusinfo: { returncd }
        } = res.data;
        if (returncd === '000') {
          const car = seller?.car;
          dispatch({
            type: sellCarTypes.INIT_CAR_STATE,
            payload: { seller, car } || {}
          });
        } else if (returncd === '999') {
          showAlert('진입 불가', () => {
            Router.back();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (hasMobile) {
    //뿌려줄 차량 정보의 데이터, 무평가, 탁송정보(saleMethod) 가져옴
    const { seller, car, saleMethod, nonevalCnsgInfo, nonevalCnclCnsgInfo } = useSelector((state) => state.sellCarStore, []);
    const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);
    const [carColors, setCarColors] = useState([]);
    const [callReq, setCallReq] = useState(false);
    const [isValue, setIsValue] = useState(false);
    // const [state, setState] = useState(nonevalUtil.defaultState);
    const [stepState, setStepState] = useState({ code: '0001', stepNo: 1, stepNm: '차령정보등록', codeNm: '임시저장' });

    //날짜 폼 변경함수
    const getDate = (dateTime) => {
      if (dateTime === undefined || dateTime === null) {
        return '';
      }
      return dateTime.split(' ')[0];
    };

    // 신청서 정보 변화 감지
    useEffect(() => {
      if (!isEmpty(seller)) {
        // setState(nonevalUtil.getState(seller));
        dispatch(selectNonevalCnsg(seller)); // 탁송 정보
        dispatch(selectNonevalCnclCnsg(seller)); // 취소 탁송 정보
        setStepState(
          produce((draft) => {
            draft.code = seller.detailcd;
            draft.stepNo = seller.detailcdStep;
            draft.stepNm = seller.detailcdNm;
            draft.codeNm = seller.detailcdNm2;
          })
        );
      }
    }, [seller]);

    const [detailStatus, setDetailStatus] = useState([
      '임시저장', // 차량정보등록 단계
      '신청완료', // 신청완료 단계 (1차견적완료, 고객매각신청, 탁송배차, 고객취소)
      '예상견적 확인', // 예상견적 확인 단계 (입고완료, 고객취소)
      '점검완료', // 차량상태점검 단계 (점검완료)
      '최종견적완료', // 견적 완료 및 판매결정 단계 (최종견적완료, 판매결정완료)
      '매입완료' // 매입완료 및 명의이전 단계 (매입완료, 명의이전완료)
    ]);

    useEffect(() => {
      if (stepState) {
        const num = stepState.stepNo;
        const idx = num - 1;
        setDetailStatus(
          produce((draft) => {
            draft[idx] = stepState.codeNm;
          })
        );
      }
    }, [stepState]);

    //차량의 기본정보에 뿌려줄정보들의 타입데이터
    const [carTypes, setCarTypes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);

    const setCommaCallback = useCallback(setComma, [car?.drvDist]);

    // 판매자 정보 출력용
    const [bankOptions, setBankOptions] = useState([]);

    //carBasicInfoEditor에서 차량데이터 띄워주는 폼을 가져옴
    useEffect(() => {
      Promise.all([selectAllCarTypeList()]).then((results) => {
        const [carTypes] = results;
        if (carTypes) setCarTypes(parseResults(carTypes));
      });
      getCommonCodeAsync('FM048').then(setFuelTypes);
      getCommonCodeAsync('AM104').then(setCarColors);
      getCommonCodeAsync('FM053').then((codeList) => setBankOptions(codeList));
    }, []);

    const getLabel = useCallback(getLabelFromArray, [car]);

    /**
     * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
     */
    useEffect(() => {
      // if (isEmpty(reqList)) {
      //   Router.back();
      // }

      if (!callReq) {
        setCallReq(true);
        const params = {
          slReqId
        };

        dispatch(selectSellcarAction(params));
      }
    }, [callReq, dispatch, slReqId]);

    //전체보기 리스트 오픈
    const handleOpenList = useCallback((e) => {
      e.preventDefault();
      setIsValue(true);
    }, []);
    //전체 항목보기 리스트 닫기
    const handleCloseList = useCallback((e) => {
      e.preventDefault();
      setIsValue(false);
    }, []);

    // 모바일 풀페이지 팝업 닫기 핸들러
    const handleFpClose = useCallback(
      (e) => {
        e.preventDefault();
        dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
        setExRodal(false);
        setPriceRodal(false);
        setConsignRodal(false);
        preventScroll(false);
      },
      [dispatch, setConsignRodal, setExRodal, setPriceRodal]
    );

    //1차 예상견적 오픈 팝업 펑션
    const setExRodalPopup = (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '견적확인',
          options: ['back', 'close']
        }
      });
      setExRodal(true);
    };

    //1차 예상견적 판매진행 오픈 팝업 펑션
    const setExRodalConfirmPopup = (e) => {
      e.preventDefault();
      setExRodalConfirm(true);
    };

    //1차 예상견적 판매 진행 확인버튼 (탁송신청)
    const exConfirmlHandler = (e) => {
      e.preventDefault();
      console.log('차량 탁송 및 점검 진행 Process');
      insertAbleRequestConsign(seller).then((res) => {
        if (res.data.statusinfo.returncd === '000') {
          showAlert('판매진행 신청이 완료 되었습니다.');
          selectSellcar({ slReqId: seller.slReqId }).then((res) => {
            if (res.data.statusinfo.returncd === '000') {
              const data = res.data.data;
              const car = res.data.data.car;
              dispatch({
                type: sellCarTypes.INIT_CAR_STATE,
                payload: { seller: data, car } || {}
              });
            }
          });
          setExRodalConfirm(false);
          cancelCloseExRodal(false);
        } else {
          showAlert(res.data.statusinfo.returnmsg);
        }
      });
    };

    //탁송정보 bottom 오픈 팝업
    const [nonedimm, setnoneDimm] = useState(false);
    const [noneactive, setnoneActive] = useState(false);

    // 취소 탁송정보 bottom 오픈 팝업
    const [noneCncldimm, setnoneCnclDimm] = useState(false);
    const [noneCnclactive, setnoneCnclActive] = useState(false);

    //탁송정보 bottom 팝업 오픈
    const handleNoneOpenPop = useCallback((e) => {
      e.preventDefault();
      setnoneActive(true);
      setnoneDimm(true);
      preventScroll(true);
    }, []);

    //탁송정보 bottom 팝업 클로징
    const handleNoneCloseDimm = useCallback((e) => {
      e.preventDefault();
      setnoneActive(false);
      setnoneDimm(false);
      preventScroll(false);
    }, []);

    // 취소 탁송정보 bottom 팝업 오픈
    const handleNoneCnclOpenPop = useCallback((e) => {
      e.preventDefault();
      setnoneCnclActive(true);
      setnoneCnclDimm(true);
      preventScroll(true);
    }, []);

    // 취소 탁송정보 bottom 팝업 클로징
    const handleNoneCnclCloseDimm = useCallback((e) => {
      e.preventDefault();
      setnoneCnclActive(false);
      setnoneCnclDimm(false);
      preventScroll(false);
    }, []);

    //최종견적 팝업 오픈 펑션
    const setPriceRodalPopup = (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_CPOPUP,
        data: {
          isPopup: true,
          title: '견적확인',
          options: ['back', 'close']
        }
      });
      setPriceRodal(true);
    };
    // console.log('fpPop : ', exRodal, consignRodal, priceRodal);
    //최종견적 산정이유 bottom 오픈 팝업
    const [reasondimm, setReasonDimm] = useState(false);
    const [reasonactive, setReasonActive] = useState(false);

    //차량 견적 사유 bottom 오픈 팝업
    const handleOpenReason = useCallback((e) => {
      e.preventDefault();
      setReasonActive(true);
      setReasonDimm(true);
      preventScroll(true);
    }, []);

    //차량견적사유 bottom 클로징
    const handleCloseReason = useCallback((e) => {
      e.preventDefault();
      setReasonActive(false);
      setReasonDimm(false);
      preventScroll(false);
    }, []);

    // 판매진행 팝업 오픈
    const openMPopHandler = useCallback((e) => {
      e.preventDefault();
      openMPop(true);
    }, []);

    //2차견적 확인시 판매진행 핸들러
    const saleConfirmHandler = (e) => {
      e.preventDefault();
      updateSaleProcDecide(seller).then((res) => {
        if (res.data.statusinfo.returncd === '000') {
          showAlert('판매진행 신청이 완료 되었습니다.');
          selectSellcar({ slReqId: seller.slReqId }).then((res) => {
            if (res.data.statusinfo.returncd === '000') {
              const data = res.data.data;
              const car = res.data.data.car;
              dispatch({
                type: sellCarTypes.INIT_CAR_STATE,
                payload: { seller: data, car } || {}
              });
            }
          });
          closeDimmMPop(false);
        } else {
          showAlert(res.data.statusinfo.returnmsg);
        }
      });
    };

    //판매진행상태 취소버튼 눌렀을시 팝업 클로징
    const closeMPop = useCallback((e) => {
      e.preventDefault();
      closeDimmMPop(false);
    }, []);

    //거래완료시 대금 입금내역출력부
    const [depositdimm, setDepositDimm] = useState(false);
    const [depositactive, setDepositActive] = useState(false);

    //거래완료 대금 bottom 오픈 팝업
    const handleOpenDeposit = useCallback((e) => {
      e.preventDefault();
      setDepositActive(true);
      setDepositDimm(true);
      preventScroll(true);
    }, []);

    //거래완료 대금 bottom 클로징
    const handleCloseDeposit = useCallback((e) => {
      e.preventDefault();
      setDepositActive(false);
      setDepositDimm(false);
      preventScroll(false);
    }, []);

    // 판매취소 bottom 팝업부
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);

    const { showAlert } = useContext(SystemContext);

    //판매취소버튼을 눌렀을때 bottom부분 팝업이 열리는 부분
    const handleSaleCancelOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      preventScroll(true);
    }, []);

    //bottom 부분 판매취소팝업닫기
    const handleCloseDimm = useCallback((e) => {
      e.preventDefault();
      setActive(false);
      setDimm(false);
      preventScroll(false);
    }, []);

    //신청취소 팝업 띄우기
    const cancelHandlePop = useCallback((e) => {
      e.preventDefault();
      setCancelShow2(true);
    }, []);

    // 판매취소 라디오 정보입력
    const [isValue1, setIsValue1] = useState(1);
    const [isTextArea, setIsTextArea] = useState(isValue1 === 4 ? true : false);
    const handleChange1 = useCallback(
      (e) => {
        e.preventDefault();
        setIsValue1(Number(e.target.value));
        setIsTextArea(Number(e.target.value) === 4 ? true : false);
      },
      [isValue1, isTextArea]
    );

    //판매취소 기타 사유 저장
    const [cnclRsnTpcdNm, setCnclRsnTpcdNm] = useState('');

    //취소 확인 처리 버튼 핸들러
    const cancelConfirmHandler = (e) => {
      // actionMap[REQ_TPCD.NONEVAL] = updateSaleCancel;
      cancelCloseHandler2(false);
      e.preventDefault();

      updateCancel({ reqTpcd: seller.reqTpcd, slReqId: seller.slReqId }).then((res) => {
        if (res.data.statusinfo.returncd === '000') {
          setDimm(false);
          setActive(false);
          setCancelChkShow(true);
        } else {
          showAlert(res.data.statusinfo.returnmsg);
        }
      });
    };

    // 신청취소
    // 차량정보등록, 신청완료시 취소신청 하는 부분
    // const NonevalReqCancelHandler = (e) => {
    //   cancelCloseHandler2(false);
    //   e.preventDefault();

    //   updateCancel({ reqTpcd: seller.reqTpcd, slReqId: seller.slReqId }).then((res) => {
    //     if (res.data.statusinfo.returncd === '000') {
    //       setCancelChkShow(true);
    //     } else {
    //       showAlert(res.data.statusinfo.returnmsg);
    //     }
    //   });
    // };

    // BLUEPOP
    //현재 신청현황에 따라 bluePop띄워주도록 하는 객체
    const [bluePop, setBluePop] = useState(true);

    //bluepop 팝업닫기
    const closeBluePop = (e) => {
      e.preventDefault();
      setBluePop(false);
    };

    return (
      <AppLayout>
        <div className="general-sell-sec">
          {/* 간단한 차량정보 */}
          <ul className="admin-list-wrap">
            <li>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].phtUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                      <div className="summary">
                        <h5 className="subject">
                          {car?.crMnfcCdNm} {car?.crDtlMdlCdNm} {car?.crClsCdNm} {car?.crDtlClsCdNm}
                        </h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{car?.crNo}</span>
                            <span>{car?.frmYyyy}</span>
                            <span>
                              {setCommaCallback(car?.drvDist)} <em>km</em>
                            </span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <div className="table-area content-border">
            <ul className="m-toggle-list up-blue fs16 none-eval">
              <MenuItem>
                <MenuTitle>
                  진행현황<span>{detailStatus[stepState.stepNo - 1]}</span>
                </MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li className={stepState.stepNo === 1 ? 'tx-blue80' : ''}>
                      <span className="title">1.임시저장</span>
                      <span className="sub">
                        차량정보를
                        <br />
                        등록해주세요.
                      </span>
                    </li>
                    <li className={stepState.stepNo === 2 ? 'tx-blue80' : ''}>
                      <span className="title">2. 신청완료</span>
                      <span className="sub">
                        신청이 완료되었습니다.
                        <br />
                        현대 글로비스 오토벨 의 예상견적이 곧 제공됩니다.
                      </span>
                    </li>
                    <li className={stepState.stepNo === 3 ? 'tx-blue80' : ''}>
                      <span className="title">3. 예상견적 확인</span>
                      <span className="sub">
                        현대 글로비스 오토벨 의 예상 견적 산정이 완료되었습니다.
                        <br />
                        차량 판매여부를 결정해주세요.
                      </span>
                    </li>
                    <li className={stepState.stepNo === 4 ? 'tx-blue80' : ''}>
                      <span className="title">4. 차량 상태 점검</span>
                      <span className="sub">
                        차량의 점검을 위해 탁송절차가 진행되며,
                        <br />
                        입고된 차량은 전문화된 시스템을 통해
                        <br />
                        성능점검이 진행됩니다.
                      </span>
                    </li>
                    <li className={stepState.stepNo === 5 ? 'tx-blue80' : ''}>
                      <span className="title">5. 견적 완료 및 판매결정</span>
                      <span className="sub">
                        최종 견적 산정이 완료되었습니다.
                        <br />
                        차량 판매 여부를 결정해주세요.
                      </span>
                    </li>

                    {/* 추가 */}
                    <li className={stepState.stepNo >= 6 ? 'tx-blue80' : ''}>
                      <span className="title">6. 매입완료 및 명의이전</span>
                      <span className="sub">
                        매입 완료로 명의이전 진행 중입니다.
                        <br />
                        명의이전 완료 후 MMS로 등록증 발급
                      </span>
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
              <li className="pt20 pb8">
                <div className="float-wrap btn-s">
                  {/* 펼쳐보기 버튼 활성화 여부  */}
                  {isValue === true ? (
                    <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목닫기" width={85} onClick={handleCloseList} />
                  ) : (
                    <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목보기" width={85} onClick={handleOpenList} />
                  )}
                  {stepState.stepNo === 2 && stepState.code === '0002' && <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} onClick={cancelHandlePop} />}
                </div>
              </li>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 기본 정보</MenuTitle>
                <MenuCont>
                  <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 기본 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>최초등록일</th>
                        <td>{getDate(car.frstRegDt)}</td>
                        {/* <td>{car.frstRegDt}</td> */}
                      </tr>
                      <tr>
                        <th>형식년도</th>
                        <td>{getLabelFromArray(carFrmYyyyList, car.frmYyyy)}</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>{getLabelFromArray(carColors, car.crClrCd) || car.crClrCdNm}</td>
                      </tr>
                      <tr>
                        <th>연료</th>
                        <td>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>{setComma(car.dspl)} cc</td>
                      </tr>
                      <tr>
                        <th>차종</th>
                        <td>{getLabelFromArray(carTypes, car.crTypeCd)}</td>
                      </tr>
                      <tr>
                        <th>용도</th>
                        <td>{getLabelFromArray(carUseDvcdList, car.crUseDvcd) || car.crUseDvcd}</td>
                      </tr>
                      <tr>
                        <th>출고가격</th>
                        <td>{setComma(car.crRlsPrc) + ' 원'}</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>{setComma(car.drvDist) + 'km'}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>옵션정보</MenuTitle>
                <MenuCont>
                  <CarOptionsEditor items={car?.optionList} isEditing={false} addOptions={false} selectOptFlag={true} />
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>특이사항</MenuTitle>
                <MenuCont>
                  <CarSpecificsEditor isMobile={hasMobile} item={seller.car} isEditing={false} />
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>판매자 정보</MenuTitle>
                <MenuCont>
                  <table summary="판매자 정보에 대한 내용" className="table-tp1">
                    <caption className="away">판매자 정보</caption>
                    <colgroup>
                      <col width="32%" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>{seller.nmbNm}</td>
                      </tr>
                      <tr>
                        <th>휴대전화번호</th>
                        <td>{seller.hpPn}</td>
                      </tr>
                      <tr>
                        <th>거주지역</th>
                        <td>
                          {seller.rgstRsdcAddrCdNm} {seller.rgstRsdcDtlAddrCdNm} {seller.applcntRsdcAddAddr}
                        </td>
                      </tr>
                      <tr>
                        <th>접수일시</th>
                        <td>{seller?.requestDt}</td>
                      </tr>
                      <tr>
                        <th>계좌 번호</th>
                        <td>{seller.accountNo !== null && `${getLabel(bankOptions, seller?.bankCd)} ${seller?.accountNo} (예금주:${seller?.accountNm})`}</td>
                      </tr>
                      <tr>
                        <th>개인사업자 유무</th>
                        <td>
                          {seller?.bizYn === 'Y'
                            ? seller?.bizTpcd === '1001'
                              ? '일반 사업자'
                              : seller?.bizTpcd === '1002'
                              ? '면세 사업자'
                              : seller?.bizTpcd === '1003'
                              ? '간이 사업자'
                              : ''
                            : '개인사업자 없음'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 사진</MenuTitle>
                <MenuCont>
                  {/* 차량 사진 띄우기 */}
                  <CarPictureApply mainSlotOptions={mainPhotoList} subSlotOptions={subPhotoList} photoList={car.photoList} isButton={false} fileDisabled={true} mode="sellcar" />
                  {/* 어두운부분은 차량등록이 안됐을때만 나오도록 */}
                  {stepState.activeNo === 1 && (
                    <div className="dim-wrap">
                      <p>
                        입력이 완료되지 않았습니다.
                        <br /> [이어하기]를 통해 정보를 입력해주세요.
                      </p>
                    </div>
                  )}
                </MenuCont>
              </MenuItem>
            </ul>
          </div>
        </div>
        {/* =============================본문 끝=========================== */}

        {/* 1. 차량등록 미완료시 출력 bluepop */}
        {stepState.stepNo === 1 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              등록이 완료되지 않았습니다.
              <br />
              계속 등록하시겠습니까?
            </p>
            <Buttons align="center" marginTop={12}>
              <Button
                size="sml"
                line="gray"
                radius={true}
                title="이어하기"
                width={88}
                height={30}
                href={'/sell/freeStep01?slReqId=' + seller.slReqId}
                // nextLink={true}
              />
              {/* <Button size="sml" line="gray" radius={true} title="1차 예상견적확인" width={88} height={30} onClick={setExRodalPopup} />
              <Button size="sml" line="gray" radius={true} title="탁송정보 견적확인" width={88} height={30} onClick={setConsignRodalPopup} />
              <Button size="sml" line="gray" radius={true} title="견적완료 견적확인" width={88} height={30} onClick={setPriceRodalPopup} />
              <Button size="sml" line="gray" radius={true} title="입금확인" width={88} height={30} onClick={handleOpenDeposit} /> */}
            </Buttons>
          </div>
        )}

        {/* 2. 신청완료시 출력 bluepop */}
        {/* 신청완료 상태에서 1차견적, 고객탁송신청, 탁송배차 들어감 */}
        {stepState.stepNo === 2 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              신청이 완료되었습니다.
              <br />
              현대 글로비스 오토벨의 예상견적이 곧 제공됩니다.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="예상견적확인" width={88} height={30} onClick={setExRodalPopup} />
            </Buttons>
          </div>
        )}

        {/* 3. 예상견적 산출시 출력 bluepop */}
        {/* 예상견적 step에서는 입고완료 확인, 판매취소 가능 */}
        {stepState.stepNo === 3 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              현대 글로비스 오토벨의 예상 견적 산정이 완료되었습니다.
              {/* <br />
              차량 판매여부를 결정해주세요 */}
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="예상견적확인" width={88} height={30} onClick={setExRodalPopup} />
            </Buttons>
          </div>
        )}

        {/* 4. 차량상태점검 bluepop */}
        {stepState.stepNo === 4 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              차량의 점검을 위해
              <br />
              성능점검이 진행됩니다.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="예상견적확인" width={88} height={30} onClick={setExRodalPopup} />
            </Buttons>
          </div>
        )}

        {/* 5. 견적완료 및 판매결정 bluepop */}
        {stepState.stepNo === 5 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              최종 견적 신청이 완료되었습니다.
              <br />
              차량 판매 여부를 결정해주세요.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="최종견적확인" width={88} height={30} onClick={setPriceRodalPopup} />
            </Buttons>
          </div>
        )}

        {/* 6. 판매결정해서 거래완료가 됐을때의 bluepop */}
        {stepState.stepNo === 6 && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              거래가 완료되었습니다.
              <br />
              차량 대금 입금내역을 확인해보세요.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="입금확인" width={88} height={30} onClick={handleOpenDeposit} />
            </Buttons>
          </div>
        )}

        {/* 취소신청중 반송탁송비 안내 출력 bluepop */}
        {/* 취소탁송정보는 취소처리 견적확인창 팝업 안에 추가 */}
        {stepState.activeNo === 5 && stepState.code === '0014' && bluePop && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              반송 탁송비 입금이후
              <br />
              차량 반출이 완료됩니다.
            </p>
            <ul className="float-tx">
              <li>
                <em>반송탁송비</em>
                <span>{seller.saleMethod.retnCnsgFee}</span>
              </li>
              <li>
                <em>입금계좌</em>
                <span>
                  {/* 반송탁송 계좌 */}
                  하나은행 12312312312321
                  <br />
                  ㈜현대글로비스
                </span>
              </li>
            </ul>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="견적확인" width={88} height={30} onClick={setPriceRodalPopup} />
            </Buttons>
          </div>
        )}

        <MobFullpagePopup active={mFullpageCPopup} paddingBottom={80} cPop={true} subPop={true} onClose={handleFpClose}>
          {/* 1차견적 확인 팝업 */}
          {/* stepNo 2 ~ 4 까지의 견적확인페이지 통합 */}
          {exRodal && (
            <>
              <div className="general-sell-sec check">
                <ul className="admin-list-wrap">
                  <li>
                    <div className="goods-list admin-list tp4">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                            <div className="summary">
                              <h5 className="subject">
                                {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
                              </h5>
                              <div className="info-wrap">
                                <div className="info">
                                  <span>{car.crNo}</span>
                                  <span>{car.frmYyyy}</span>
                                  <span>
                                    {setCommaCallback(car?.drvDist)} <em>km</em>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <div className="bidding-inquiry content-border">
                  <ul>
                    <li>
                      1차 견적
                      {stepState.stepNo > 1 && stepState.code !== '0002' ? (
                        <p className="price-tp7">
                          {setComma(seller.evlnPurcpric > 0 ? seller.evlnPurcpric / 10000 : 0)}
                          <span className="won">만원</span>
                        </p>
                      ) : (
                        <p className="price-tp7">
                          -<span className="won">만원</span>
                        </p>
                      )}
                    </li>
                    {/* 2차 견적금액이 있으면 출력 아니면 '-' */}
                    {stepState.stepNo > 4 ? (
                      <li>
                        2차 견적
                        <p className="price-tp7">
                          {setComma(seller.purcpric > 0 ? seller.purcpric / 10000 : 0)}
                          <span className="won">만원</span>
                        </p>
                      </li>
                    ) : (
                      <li>
                        2차 견적
                        <p className="price-tp7">
                          -<span className="won">만원</span>
                        </p>
                      </li>
                    )}
                  </ul>
                  <p className="tx-exp-tp3 tx-red80">* 차량 탁송 후 2차 견적 진행 시,1차 견적 금액과 차이가 발생할 수 있습니다.</p>
                </div>

                <div className="list-none-wrap tp2">
                  <p className="list-none">견적 산정 기준 안내 텍스트</p>
                </div>
              </div>

              {/* step 3,4에서는 하는거 없음 */}
              <Buttons align="center" className="full fixed">
                {stepState.stepNo === 2 && stepState.code === '0002' && <Button size="big" background="gray" title="신청취소" width={180} marginTop={8} onClick={cancelHandlePop} />}
                {stepState.stepNo === 2 && stepState.code === '0003' && (
                  <>
                    <Button size="big" background="blue20" color="blue80" title="판매취소" onClick={handleSaleCancelOpenPop} />
                    <Button size="big" background="blue80" title="판매진행" onClick={setExRodalConfirmPopup} />
                  </>
                )}
                {stepState.stepNo === 2 && stepState.code === '0005' && <Button className="fixed" size="full" background="blue80" title="탁송정보" onClick={handleNoneOpenPop} />}
              </Buttons>

              {/* 1차견적 확인후 판매진행 팝업 */}
              <RodalPopup show={exRodalConfirm} type={'fade'} width={380} closedHandler={cancelCloseExRodal} isMask={true} isButton={false} subPop={false}>
                <div className="con-wrap">
                  <p className="exp">
                    차량 탁송 이후 더욱 자세한 견적 산정이 진행됩니다.
                    <br />
                    탁송 진행 이후 취소하시면 발생되는 탁송비는 고객부담으로 처리됩니다.
                    <br />
                    계속 진행하시겠습니까?
                  </p>
                  <Buttons align="right" marginTop={16}>
                    <Button fontSize={10} title="판매진행(탁송 신청)" color="blue80" marginLeft={16} fontWeight={500} onClick={exConfirmlHandler} />
                  </Buttons>
                </div>
              </RodalPopup>

              {/* 탁송 진행상황 팝업 */}
              <div className={nonedimm ? 'modal-bg active' : 'modal-bg'} onClick={handleNoneCloseDimm} />
              <MobBottomArea active={noneactive} isFixButton={true}>
                <div className="inner">
                  <p className="tit1 mb20">탁송정보</p>
                  {/* PC의 탁송정보 가져옴 */}
                  {nonevalCnsgInfo !== null ? (
                    <table summary="탁송 정보에 대한 내용" className="table-tp1">
                      <caption className="away">탁송 정보</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>시간(탁송일시)</th>
                          <td>{nonevalCnsgInfo?.delidt}</td>
                        </tr>
                        <tr>
                          <th>지역</th>
                          <td>{nonevalCnsgInfo?.areadomanm}</td>
                        </tr>
                        <tr>
                          <th>탁송기사</th>
                          <td>{nonevalCnsgInfo?.ridenm}</td>
                        </tr>
                        <tr>
                          <th>연락처</th>
                          <td>연락처 ??</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <h2>조회가능한 탁송정보가 없습니다.</h2>
                  )}
                </div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleNoneCloseDimm} />
              </MobBottomArea>
            </>
          )}

          {/* 최종견적 확인후 팝업 */}
          {/* <RodalPopup show={priceRodal} type={'slideUp'} closedHandler={cancelClosePriceRodal} mode="normal" title="견적확인"> */}
          {priceRodal && (
            <>
              <div className="general-sell-sec check">
                <ul className="admin-list-wrap">
                  <li>
                    <div className="goods-list admin-list tp4">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">{!isEmpty(car?.photoList) ? <img src={car?.photoList[0].imgUrl} alt="차량 이미지" /> : <i className="ico-car" />}</div>
                            <div className="summary">
                              <h5 className="subject">
                                {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
                              </h5>
                              <div className="info-wrap">
                                <div className="info">
                                  <span>{car.crNo}</span>
                                  <span>{car.frmYyyy}</span>
                                  <span>
                                    {setCommaCallback(car?.drvDist)} <em>km</em>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <div className="bidding-inquiry content-border">
                  <ul>
                    <li>
                      1차 견적
                      <p className="price-tp7">
                        {setComma(seller.evlnPurcpric > 0 ? seller.evlnPurcpric / 10000 : 0)}
                        <span className="won">만원</span>
                      </p>
                    </li>
                    <li>
                      2차 견적
                      <p className="price-tp7">
                        {setComma(seller.purcpric > 0 ? seller.purcpric / 10000 : 0)}
                        <span className="won">만원</span>
                      </p>
                      <Button
                        size="mid"
                        line="gray"
                        color="gray"
                        radius={true}
                        title="견적 산정 사유 확인"
                        width={97}
                        height={24}
                        fontSize={10}
                        fontWeight={500}
                        marginTop={8}
                        onClick={handleOpenReason}
                      />
                    </li>
                  </ul>
                  <p className="tx-exp-tp3 tx-red80">* 차량 탁송 후 2차 견적 진행 시,1차 견적 금액과 차이가 발생할 수 있습니다.</p>
                </div>

                <div className="list-none-wrap tp2">
                  <p className="list-none">견적 산정 기준 안내 텍스트</p>
                </div>
              </div>
              {/* 6/5 무평가 수정 */}
              <p className="tx-exp-tp3 tx-red80 reqCncl">* 신청취소시에는 콜센터(1600-0000)으로 연락 부탁드립니다.</p>

              {/* 취소신청 상태에서 버튼 달라지는 부분 */}
              {(stepState.code === '0014' || stepState.code === '0015') && (
                <Buttons className="pdside20">
                  <Button size="full" background="blue20" color="blue80" radius={true} title="취소 처리 중" disabled={true} />
                  {/* 기획서에는 없지만 PC추가된것 참고해서 넣어둠 */}
                  {stepState.code === '0015' && <Button size="full" background="blue20" color="blue80" radius={true} title="취소 탁송 정보" onClick={handleNoneCnclOpenPop} />}
                </Buttons>
              )}
              {stepState.stepNo === 5 && stepState.code === '0011' && <Button className="fixed" size="full" background="blue80" title="판매진행" onClick={openMPopHandler} />}

              {/* 견적산정이유 확인 bottom 팝업부 */}
              {/* EstmCalcRsnCd = 견적사유 */}
              <div className={reasondimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseReason} />
              <MobBottomArea active={reasonactive} isFixButton={true}>
                <div className="inner">
                  <p className="tit1 mb24">견적 산정 사유 확인</p>
                  <p className="tx-tit">사유</p>
                  <Input placeHolder="사고이력" id="car-num" height={38} disabled={true} value={seller.mathdeta !== undefined && seller.mathdeta} />
                  <p className="tx-tit mb16 mt24">상세내용</p>
                  <Textarea placeHolder="상세내용" countLimit={500} type="tp1" disabled={true} height={128} data={seller.mathdeta !== undefined && seller.mathdeta} />
                </div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseReason} />
              </MobBottomArea>

              {/* 판매진행 누르면 나오는 팝업부 */}
              <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
                <div className="con-wrap">
                  <p className="exp">판매를 진행하시겠습니까?</p>
                  <Buttons align="right" marginTop={16}>
                    <Button fontSize={14} title="취소" color="blue80" onClick={closeMPop} />
                    <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={saleConfirmHandler} />
                  </Buttons>
                </div>
              </RodalPopup>

              {/* 취소 탁송정보 => 기획서에는 없지만 PC추가된것 참고해서 넣어둠 */}
              <div className={noneCncldimm ? 'modal-bg active' : 'modal-bg'} onClick={handleNoneCnclCloseDimm} />
              <MobBottomArea active={noneCnclactive} isFixButton={true}>
                <div className="inner">
                  <p className="tit1 mb20">탁송정보</p>
                  {/* PC의 취소탁송정보 가져옴 */}
                  {nonevalCnclCnsgInfo !== null ? (
                    <table summary="탁송 정보에 대한 내용" className="table-tp1">
                      <caption className="away">탁송 정보</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>시간(탁송일시)</th>
                          <td>{nonevalCnclCnsgInfo?.delidt}</td>
                        </tr>
                        <tr>
                          <th>지역</th>
                          <td>{nonevalCnclCnsgInfo?.areadomanm}</td>
                        </tr>
                        <tr>
                          <th>탁송기사</th>
                          <td>{nonevalCnclCnsgInfo?.ridenm}</td>
                        </tr>
                        <tr>
                          <th>연락처</th>
                          <td>연락처 ??</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <h2>조회가능한 탁송정보가 없습니다.</h2>
                  )}
                </div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleNoneCnclCloseDimm} />
              </MobBottomArea>
            </>
          )}
          {/* </RodalPopup> */}

          {/* 거래 입금내역 bottom 팝업부 */}
          <div className={depositdimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDeposit} />
          <MobBottomArea active={depositactive} isFixButton={true}>
            <div className="inner">
              {seller.deposit > 0 && (
                <>
                  <p className="tit1 mb8">입금확인</p>
                  <p className="tx-gray mb16">입금 처리가 완료되었습니다.</p>
                  <table summary="입금 내역에 대한 내용" className="table-tp1">
                    <caption className="away">입금 내역</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>은행명</th>
                        <td>{seller.bankCdNm}</td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td>{seller.accountNo}</td>
                      </tr>
                      <tr>
                        <th>차량 판매 금액</th>
                        <td>{setComma(saleMethod.scdrEstmAmt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
              {(seller.deposit === undefined || seller === 0) && <p>현재 입금정보가 확인되지 않습니다.</p>}
            </div>
            <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseDeposit} />
          </MobBottomArea>

          {/* 취소 팝업부 */}
          {/* 판매취소 bottom팝업 */}
          <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
          <MobBottomArea active={active}>
            <div className="inner">
              <p className="tit1 mb24">판매취소</p>
              <p className="tx-tit">취소사유</p>
              <ul className="radio-block tp3">
                <li>
                  <Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
                </li>
                <li>
                  <Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} />
                </li>
                <li>
                  <Radio className="txt" id="cancel3" label="견적 불만" value={3} checked={isValue1} onChange={handleChange1} />
                </li>
                <li>
                  <Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} />
                </li>
              </ul>
              {isTextArea && (
                <>
                  <p className="tx-tit mt24 mb8">
                    기타사유<em>(선택)</em>
                  </p>
                  <Textarea
                    countLimit={200}
                    type="tp1"
                    onChange={(e) => {
                      setCnclRsnTpcdNm(e.target.value);
                    }}
                    height={133}
                    placeHolder="기타 사유를 작성해주세요."
                  />
                </>
              )}
              {/* 2차견적 산출후 취소했을시 나오는 안내문 */}
              {stepState.stepNo === 5 && (
                <div className="mypage-admin-title mt8">
                  <p className="tx-exp-tp5">&#8251; 관리자 확인 후 반송 탁송비 처리를 위한 가상계좌 발급이 진행됩니다.</p>
                  <p className="tx-exp-tp5">&#8251; 반송 탁송비 입금이후 차량 반출이 완료됩니다.</p>
                </div>
              )}
            </div>
            <Buttons align="center" className="full">
              <Button size="mid" background="blue20" color="blue80" title="취소" onClick={handleCloseDimm} />
              <Button size="mid" background="blue80" title="확인" onClick={cancelConfirmHandler} />
            </Buttons>
          </MobBottomArea>

          {/* 판매취소 확인 팝업 */}
          <RodalPopup show={cancelChkShow} type={'fade'} closedHandler={cancelChkCloseHandler} mode="normal" size="xs">
            <div className="con-wrap">
              {/* <p>무평가 신청이 완료되었습니다.</p> */}
              <p>무평가 판매 취소가 완료되었습니다.</p>
              <Buttons align="center" marginTop={56}>
                <Button
                  fontSize={14}
                  title="확인"
                  color="blue80"
                  fontWeight="bold"
                  //확인버튼 누르면 팝업창 닫음
                  onClick={(e) => {
                    e.preventDefault();
                    cancelChkCloseHandler(false);
                  }}
                />
              </Buttons>
            </div>
          </RodalPopup>

          {/* 신청취소 확인 팝업 */}
          {/* <RodalPopup show={cancelShow2} type={'fade'} closedHandler={cancelCloseHandler2} mode="normal" size="xs">
            <div className="con-wrap popup-cancel">
              <p>무평가 신청을 취소하시겠습니까?</p>
              <Buttons align="right" marginTop={24}>
                <Button
                  fontSize={14}
                  title="취소"
                  color="blue80"
                  //팝업창 닫음
                  onClick={(e) => {
                    e.preventDefault();
                    cancelCloseHandler2(false);
                  }}
                />
                <Button
                  fontSize={14}
                  marginLeft={16}
                  title="확인"
                  color="blue80"
                  fontWeight="bold"
                  onClick={(e) => {
                    e.preventDefault();
                    NonevalReqCancelHandler(e);
                  }}
                />
              </Buttons>
            </div>
          </RodalPopup> */}
        </MobFullpagePopup>

        {/* 신청취소 확인 팝업 */}
        <RodalPopup show={cancelShow2} type={'fade'} closedHandler={cancelCloseHandler2} mode="normal" size="xs">
          <div className="con-wrap popup-cancel">
            <p>무평가 신청을 취소하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button
                fontSize={14}
                title="취소"
                color="blue80"
                //팝업창 닫음
                onClick={(e) => {
                  e.preventDefault();
                  cancelCloseHandler2(false);
                }}
              />
              <Button
                fontSize={14}
                marginLeft={16}
                title="확인"
                color="blue80"
                fontWeight="bold"
                onClick={(e) => {
                  e.preventDefault();
                  cancelConfirmHandler(e);
                }}
              />
            </Buttons>
          </div>
        </RodalPopup>

        {/* 거래 입금내역 bottom 팝업부 */}
        <div className={depositdimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDeposit} />
        <MobBottomArea active={depositactive} isFixButton={true}>
          <div className="inner">
            {seller.deposit > 0 && (
              <>
                <p className="tit1 mb8">입금확인</p>
                <p className="tx-gray mb16">입금 처리가 완료되었습니다.</p>
                <table summary="입금 내역에 대한 내용" className="table-tp1">
                  <caption className="away">입금 내역</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>은행명</th>
                      <td>{seller.bankCdNm}</td>
                    </tr>
                    <tr>
                      <th>계좌번호</th>
                      <td>{seller.accountNo}</td>
                    </tr>
                    <tr>
                      <th>차량 판매 금액</th>
                      <td>{setComma(saleMethod.scdrEstmAmt)}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {(seller.deposit === undefined || seller === 0) && <p>현재 입금정보가 확인되지 않습니다.</p>}
          </div>
          <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseDeposit} />
        </MobBottomArea>
      </AppLayout>
    );
  }
  //==============================모바일 끝=================================

  return <AppLayout>모바일 화면만 존재합니다.</AppLayout>;
};

/**
 * 설명 : 페이지 렌더링 하기전에 url query로 넘어오는 값을 추출
 * @return {String} slReqId : 판매 신청서 아이디
 */
NonevalSellCarView.getInitialProps = async (http) => {
  const { req, query } = http;
  const slReqId = req ? req.query.slReqId : query.slReqId;
  const reqTpcd = req ? req.query.type : query.type;
  return {
    slReqId,
    reqTpcd
  };
  // return {};
};

NonevalSellCarView.propTypes = {
  slReqId: PropTypes.string,
  reqTpcd: PropTypes.string
};

export default NonevalSellCarView;
