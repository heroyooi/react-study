/**
 * 설명 : 내차팔기 셀프판매 등록 모바일 화면
 * @fileoverview 내차팔기 셀프판매 등록 모바일 화면
 * @author 송재영
 */

import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { isEmpty, stubTrue } from 'lodash';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';
import MobLogin from '@src/components/common/MobLogin';
import MobSelectLocal from '@src/components/common/MobSelectLocal';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobSellRegister from '@src/components/common/MobSellRegister';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';
// import CheckColors from '@src/components/common/CheckColors';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import PricingTsConfirm from '@src/components/pricingSystem/pricingTsConfirm';
import { getSearchCarSpecInfo } from '@src/actions/pricing/pricingSystemActions';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { numberFormat, transformText, objIsEmpty } from '@src/utils/CommonUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { insertReqAction, updateReqAction } from '@src/actions/sellcar/SelfSellCarAction';
import {
  getSellCarMobileOption,
  getSellCarTermData,
  getCarMartInfoAction,
  getReqAction,
  inputStateAction,
  inputPropAction,
  pushObjectAction,
  removeObjectByKeyAction,
  getShootingPartList,
  carHistoryAuthSucc,
  carHistoryAuthFail
} from '@src/actions/sellcar/sellCarAction';
import { selectSellcar, selectSellcarReqCarUseCheck } from '@src/api/sellcar/AllSellcarSearchApi';
import { updateRequestComplete } from '@src/api/sellcar/SelfSellcarApi';
import { getHpPn, uploadCarPhoto, validReqIdAndRgstIdCheck, deleteCarPhotos } from '@src/api/sellcar/CommonSellcarApi';
import { axiosGet } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { isLogin, membertype, gInfoLive, UserType, isLoginLiveCheck, nonmemberlogin } from '@src/utils/LoginUtils';
import RenderHelper from '@lib/share/render/helper';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';
import { SELF_STT, REQ_TPCD, REQ_TPCD_NM } from '@src/constant/mbSlReqStt';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';
// import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';
import CertificationMod from '@src/components/common/CertificationMod';
import { validatePicture, carInfoNullCheck, carOptionNullCheck, checkRegistPeriodAllowed, photoCountCheck, getSellCarImgList } from '@src/components/sellcar/self/MobSellcarUtil';
import { preventScroll } from '@src/utils/CommonUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

const INSERT = 'insert';
const UPDATE = 'update';
const PRICING = 'pricing';

const SAVEACTION = {
  insert: insertReqAction,
  update: updateReqAction
};

const MSG_04 = '차량 기본 정보를 확인해주세요.';
const MSG_05 = '차량 옵션을 선택해주세요.';
const MSG_06 = '주행거리(6자리 숫자)를 입력해주세요.';
const MSG_07 = '판금/교환 부위나 판금/교환 여부를 선택 해주세요.';
const MSG_08 = '특이사항 내역이나 특이사항 여부를 선택 해주세요.';
const MSG_09 = '지역을 선택해주세요.';
const MSG_10 = '필수 이용 약관에 동의해주세요.';
const MSG_11 = '필수 사진을 등록해주세요.';

const SelfStep01 = ({ query }) => {
  const dispatch = useDispatch();

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [appDownloadUrl, setAppDownloadUrl] = useState('');
  const { showAlert, showConfirm } = useContext(SystemContext);

  const [loginCallbackDone, setLoginCallbackDone] = useState(false); //로그인 팝업이 호출 되고 난 뒤, 로그인 질문 UI 유지 용
  const [loginAskNeed, setLoginAskNeed] = useState(!loginCallbackDone && !isLogin() ? true : false); //로그인 정보가 없는상태로 현재 페이지 최초 입장시 로그인 하라는 질문해야함
  const [isLoading, setIsLoading] = useState(false); //페이지 딤처리
  const [isLoadComplete, setIsLoadComplete] = useState(false); //화면 렌더링X, 신청번호에 대한 데이터 로딩
  const [isSaveAble, setIsSaveAble] = useState(false); //PC와 동일한 신청번호 생성 가능한 단계 도달 여부(본인인증, 로그인, 차량 최초 선택)
  const [isReloadDenied, setIsReloadDenied] = useState(false); //동일한 차량번호 등록건 이어하겠냐는 질문의 거절 여부
  const [isPictureAutoSaveNeed, setIsPictureAutoSaveNeed] = useState(true); // 촬영 화면 처음으로 진입시 강제 임시저장 - PC 로직 및 앱 연동시 필수
  const [isApplyTempCert, setIsApplyTempCert] = useState(false); //비회원 본인인증 여부(로그인 체크와 같이 사용.. 본인인증만을 이용한 상태(신청번호 로그인X))
  const [pictureCount, setPictureCount] = useState(0); //사진 카운트
  const [ownerName, setOwnerName] = useState(''); //본인인증 시 소유자명
  const [crNo, setCrNo] = useState(!isEmpty(query?.crNo) && !isEmpty(query?.carInfo) ? query?.crNo : ''); //본인인증 시 차량번호
  const [pricingInfo, setPricingInfo] = useState(!isEmpty(query?.crNo) && !isEmpty(query?.carInfo) ? JSON.stringify(JSON.parse(query?.carInfo)) : {}); //현재 미사용, 프라이스 연동용?
  const [pageMode, setPageMode] = useState(!isEmpty(query?.crNo) && !isEmpty(query?.carInfo) ? PRICING : isEmpty(query?.slReqId) ? INSERT : UPDATE); //페이지 진입시 최초등록/임시저장/프라이싱 인지 판단
  const [instUpdtMode, setInstUpdtMode] = useState(isEmpty(query?.slReqId) ? INSERT : UPDATE); //저장 API 사용시 등록/수정 판단
  const { seller, car, collectAgree, carHistory } = useSelector((store) => store.sellCarStore); // 조회되어 스토어에 등록되는 차량, 판매자 정보!!!
  const { photoList } = car;
  const crId = seller?.crId || seller?.car?.crId;
  const [originalCrId, setOriginalCrId] = useState('');
  const [slReqId, setSlReqId] = useState(!isEmpty(query?.slReqId) ? query?.slReqId : !isEmpty(seller.slReqId) ? seller.slReqId : '');
  const { mainPhotoList, subPhotoList } = useSelector((state) => state.sellCarStore);
  // 앱, 웹 브라우저에 따른 버튼 출력 여부 확인 객체
  const [appCheck, setAppCheck] = useState(false);

  const createBodyPortal = useCreatePortalInBody(null, 'wrap');

  useEffect(() => {
    console.log('앱설치여부 확인중');
    console.log(window.navigator.userAgent);
    const MobUA = window.navigator.userAgent;
    // 앱일경우
    if (MobUA.includes('AUTOBELL_Android') || MobUA.includes('AUTOBELL_iOS')) {
      setAppCheck(false);
    } else {
      setAppCheck(true);
    }
  }, []);
  // 저장 동작 실행
  const save = async () => {
    console.warn('SAVE SELLER >>>', seller);
    console.warn('SAVE CAR >>>', car);
    const params = {
      ...seller,
      car
    };
    return await dispatch(SAVEACTION[instUpdtMode](params));
  };

  // 차량 사진 등록 버튼 클릭시 임시저장 및 팝업 열기
  const tempSaveBeforPicture = async (e) => {
    if (e !== undefined) e.preventDefault();
    if (!sellcarInputValidationCheck()) return;
    if (isPictureAutoSaveNeed) {
      setIsPictureAutoSaveNeed(false);
      const res = await tempSave();
      if (res) {
        handleFullpagePopup('register')();
      }
    } else {
      handleFullpagePopup('register')();
    }
    if (isLoading) setIsLoading(false);
  };

  // 임시 저장을 실행
  const tempSave = async (e) => {
    if (e !== undefined) e.preventDefault();
    if (!isLoginLiveCheck() && !isApplyTempCert) {
      showAlert(`임시저장에 실패했습니다.<br>세션종료. 로그인을 다시 해주세요.`);
      return;
    }
    const data = await save();
    console.warn('TEMPSAVE >>>', data);
    if (data) {
      closeMpop();
      showAlert(`임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.`);
      setInstUpdtMode(UPDATE);
      return true;
    }
    closeMpop();
    showAlert(`임시저장에 실패했습니다.`);
    return false;
  };

  const tempSaveAndExit = async (e) => {
    if (e !== undefined) e.preventDefault();
    // if (!isLoginLiveCheck() && !isApplyTempCert) {
    //   showAlert(`임시저장에 실패했습니다.<br>세션종료. 로그인을 다시 해주세요.`);
    //   return;
    // }
    const data = await save();
    if (data) {
      closeMpop();
      if (isEmpty(query?.slReqId)) {
        showAlert(`임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.`, () => {
          Router.replace('/sellcar/sellCar');
        });
      } else {
        showAlert(`임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.`, () => {
          Router.replace('/mypage/personal/sellcar/sellCar');
        });
      }
    } else {
      closeMpop();
      if (isEmpty(query?.slReqId)) {
        showAlert(`임시저장에 실패했습니다.`, () => {
          Router.replace('/sellcar/sellCar');
        });
      } else {
        showAlert(`임시저장에 실패했습니다.`, () => {
          Router.replace('/mypage/personal/sellcar/sellCar');
        });
      }
    }
  };

  // 페이지 상단 나가기 버튼 임시저장 기능 호출
  const handleSaveButton = (e) => {
    if (e !== undefined) e.preventDefault();
    if (isMemberType === 'nonmember') {
      showConfirm(
        '비회원으로 신청도중 나가게 될 경우 <br/> 작성한 정보들은 모두 사라지게 됩니다.',
        (e) => {
          if (e !== undefined) e.preventDefault();
          Router.replace('/sell/selfHome');
        },
        (e) => {
          if (e !== undefined) e.preventDefault();
          closeMpop();
          return false;
        }
      );
    }
    if (isSaveAble) {
      tempSaveAndExit(); //저장 가능한 시점에 도달했으면 저장기능 실행
    } else {
      if (isEmpty(query?.slReqId)) {
        Router.replace('/sellcar/sellCar');
      } else {
        Router.replace('/mypage/personal/sellcar/sellCar');
      }
    }
  };

  // TODO 작업중 로그인 세션 나감 감지
  useEffect(() => {
    if (isSaveAble && !isLoginLiveCheck()) {
      console.log('세션 종료 튕겨내기 로직');
    }
  });

  // 최초 UI 모양 구성
  useEffect(() => {
    dispatch({ type: SECTION_SELL });

    if (hasMobile) {
      setAppDownloadUrl(getAppDownloadUrl());
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비교견적 판매',
          options: ['back'],
          events: [(e) => openMpop(e, 'fade')]
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      Router.replace('/sellcar/self/selfSellCarGuide'); //PC용 화면
    }
  }, []);

  // 임시 - 확인용
  useEffect(() => {
    console.warn('QUERY >>>', query);
    console.warn('STORE seller >>>', seller);
    console.warn('STORE car >>>', car);
    console.warn('STORE carHistory >>>', carHistory);
  }, [seller, car, carHistory]);

  // 사용자 정보 & 주문번호 가져오기
  useEffect(() => {
    const _type = gInfoLive()?.membertype;
    if (_type === '0020' || _type === '0030' || _type === '0040') {
      alert('내차팔기 서비스는 일반 회원만 이용 가능합니다.');
      Router.replace('/cscenter/faq');
      return;
    }
    if (seller.slReqId !== undefined) {
      setInstUpdtMode(UPDATE);
      if (slReqId === undefined || slReqId === '') {
        setSlReqId(seller.slReqId);
      }
    } else {
      if (_type === UserType.MEMBER) {
        if (seller.nmbNm === undefined) {
          dispatch(inputPropAction({ state: 'seller', prop: 'nmbNm', value: gInfoLive().name })); // 회원 이름
        }
        if (seller.hpPn === undefined) {
          getHpPn({ mbId: gInfoLive().id }).then((res) => {
            const { statusinfo, hpPn } = res.data;
            if (statusinfo.returncd === '000') {
              dispatch(inputPropAction({ state: 'seller', prop: 'hpPn', value: setHpPnFormat(hpPn) })); // 회원 휴대전화
            }
          });
        }
      }
    }
  }, [seller]);

  // 동일 번호로 등록 신청서 있는지 체크 - > 신청 접수 이후 상태가 있는 경우 접수 못하게 변경
  const UPDATE_AVAIL = [SELF_STT.PUBLIC_TEMP, SELF_STT.PUBLIC_FORM_COMPLETE];
  const COMPARE_ING = [SELF_STT.SELFSALE_COMPARE_APPROVE, SELF_STT.SELFSALE_CHECK_ESTIMATES];
  const COMPARE_END = [SELF_STT.SELFSALE_DECIDED_TO_SALE];
  const OFF_DEAL_ING = [SELF_STT.SELFSALE_CONSIGNMENT];
  const OFF_DEAL_END = [SELF_STT.PUBLIC_FINAL];
  const NO_EXIST_APP = 'noExist';
  const EXIST_APP = 'exist';
  const [needProcessStopped, setNeedProcessStopped] = useState(false); // 얼럿 창 강제로 꺼버려도 진행 안되게 진행 버튼들 비활성화
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkApplication = useCallback((e) => {
    if (e !== undefined) e.preventDefault();
    let slReqId;
    let reqTpcd;
    let reqSttTpcd;
    let prevAppData;
    if (!isLoginLiveCheck() && !isApplyTempCert) return;
    //거절한적이 없다면 신청서 조회
    if (!isReloadDenied) {
      if (isEmpty(crNo)) return;
      const param = {
        crNo
      };
      // 신청서 중복 체크
      // selectSellcarReqCarUseCheck(param).then((res) => {
      //   const { data, statusinfo } = res.data;
      //   // 임시저장한 신청서가 있고 => Y/N 확인
      //   if (statusinfo.returncd === '000') {
      //     if (UPDATE_AVAIL.some((stt) => (stt = data?.reqSttTpcd))) {
      //       showConfirm(
      //         '<p>진행중인 신청정보가 있습니다. <br/> 이어서 작성하시겠습니까?(마이페이지로 이동)</p>',
      //         (e) => {
      //           e.preventDefault();
      //           // setIsLoading(true);
      //           Router.replace('/mypage/personal/sellcar/sellCar');
      //         },
      //         (e) => {
      //           if (e !== undefined) e.preventDefault();
      //           setIsReloadDenied(true);
      //         }
      //       );
      //     }
      //   }
      // });
      selectSellcarReqCarUseCheck(param)
        .then((res) => {
          const { data, statusinfo } = res.data;
          // 임시저장한 신청서가 있고 => Y/N 확인
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
        .then((result) => {
          if (NO_EXIST_APP === result) {
            //분기 >> 완전 신규 신청건
            setIsReloadDenied(true);
          } else if (EXIST_APP === result) {
            //분기 >> 기존 접수건 존재
            let _myPageUrl = '';
            let _stepUrl = '';
            switch (reqTpcd) {
              case REQ_TPCD.VISIT:
                _myPageUrl = '/mypage/personal/sellcar/visitSellCarView';
                _stepUrl = '/sell/visitApply';
                break;
              case REQ_TPCD.SELF:
                _myPageUrl = '/mypage/personal/sellcar/selfSellCarView';
                _stepUrl = '/sell/selfStep01';
                break;
              case REQ_TPCD.NONEVAL:
                _myPageUrl = '/mypage/personal/sellcar/nonevalSellCarView';
                _stepUrl = '/sell/freeStep01';
                break;
            }
            if (REQ_TPCD.SELF === reqTpcd) {
              //분기 >> 접수건이 셀프 판매인경우
              if (prevAppData.availNewApp) {
                //분기 >> 신규 접수가 가능(최종 임시)
                showConfirm(
                  '<p>기존 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? <br/>이어서 하시겠습니까[취소]?</p>',
                  (e) => {
                    if (e !== undefined) e.preventDefault();
                    setIsReloadDenied(true);
                  },
                  (e) => {
                    if (e !== undefined) e.preventDefault();
                    setIsLoading(true);
                    Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                  }
                );
              } else {
                if (COMPARE_ING.includes(reqSttTpcd)) {
                  showAlert('<p>해당 차량은 비교견적이 진행중입니다.</p>', () => {
                    setIsLoading(true);
                    Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                  });
                  setNeedProcessStopped(true);
                } else if (COMPARE_END.includes(reqSttTpcd)) {
                  showAlert('<p>해당 차량은 비교견적이 완료되었습니다.</p>', () => {
                    setIsLoading(true);
                    Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                  });
                  setNeedProcessStopped(true);
                } else {
                  showAlert('<p>해당 차량은 진행 중인 신청정보가 있습니다.</p>', () => {
                    setIsLoading(true);
                    Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                  });
                  setNeedProcessStopped(true);
                }
              }
            } else {
              const reqTpcdNm = REQ_TPCD_NM[prevAppData.sellcar.reqTpcd];
              if (prevAppData.availNewApp) {
                showConfirm(
                  `<p>${reqTpcdNm}로 신청한 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? <br/>이어서 하시겠습니까[취소]?</p>`,
                  (e) => {
                    if (e !== undefined) e.preventDefault();
                    setIsReloadDenied(true);
                  },
                  (e) => {
                    if (e !== undefined) e.preventDefault();
                    setIsLoading(true);
                    Router.replace(`${_stepUrl}?slReqId=${slReqId}`);
                  }
                );
              } else {
                showAlert(`<p>해당 차량은 ${reqTpcdNm}로 판매진행중에 있습니다.</p>`, () => {
                  setIsLoading(true);
                  Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                });
                setNeedProcessStopped(true);
              }
            }
          }
        })
        .catch((err) => {
          setNeedProcessStopped(true);
          showAlert('기존 정보를 찾는 과정에서 에러가 발생했습니다.');
        });
    }
  });

  // 진행 불가 팝업 10초 뒤 마이페이지로 보냄
  useEffect(() => {
    if (needProcessStopped) {
      setTimeout(() => {
        showAlert(`<p>해당 차량은 진행 중인 신청정보가 있습니다. <br/>마이페이지로 이동합니다.</p>`, () => {
          setIsLoading(true);
          Router.replace(`/mypage/personal/sellcar/sellCar`);
        });
      }, 10000);
    }
  }, [needProcessStopped]);

  const getReqInfo = () => {
    if (!isLoginLiveCheck() && !isApplyTempCert) {
      alert(`정상적인 접근이 아닙니다.\n\n에러메세지 : 임시저장 조회시 로그인이 필요합니다.`);
      Router.replace('/sellcar/sellCar');
    } else {
      const _slReqId = query?.slReqId || seller.slReqId || slReqId;
      if (_slReqId !== undefined) {
        validReqIdAndRgstIdCheck({ rgstId: gInfoLive().id, slReqId: _slReqId, reqTpcd: REQ_TPCD.SELF }).then((res) => {
          const _rtnCd = res?.data?.statusinfo?.returncd;
          const _rtnMsg = res?.data?.statusinfo?.returnmsg;
          if (_rtnCd === '000') {
            // setIsLoading(true);
            dispatch(getReqAction(_slReqId));
            if (query?.slReqId !== undefined) {
              setIsLoadComplete(true);
            }
          } else {
            alert(`정상적인 접근이 아닙니다.\n\n에러코드 : ${_rtnCd}\n에러메세지 : ${_rtnMsg}\n로그인 사용자와 일치하는 신청정보가 없습니다.`);
            Router.replace('/sellcar/sellCar');
          }
        });
      }
    }
    setIsSaveAble(true);
  };

  // 촬영 후 사진 리로드
  const handleReloadReqInfo = () => {
    if (!isEmpty(seller.slReqId) && !isEmpty(seller.rgstId)) {
      getSellCarImgList(seller.slReqId, seller.rgstId).then((photoList) => {
        if (photoList) {
          dispatch(
            inputPropAction({
              state: 'car',
              prop: 'photoList',
              value: photoList
            })
          );
        }
      });
    }
    // const _slReqId = !isEmpty(slReqId) ? slReqId : seller.slReqId;
    // if (!isEmpty(_slReqId)) {
    //   dispatch(getReqAction(_slReqId));
    // }
  };

  // 페이지 분기처리 => 신규입력, 불러오기, 시세전달 3가지 루트
  useEffect(() => {
    switch (pageMode) {
      case INSERT:
        // 정상 진행 루트
        break;
      case UPDATE:
        getReqInfo();
        break;
      case PRICING:
        // 기본 입력 부분 무시하는 로직, 전달받은 정보로 세팅
        dispatch(getCarMartInfoAction(crNo));
        setIsSaveAble(true);
        break;
      default:
        break;
    }
  }, [pageMode]);

  // 채팅화면 디자인 제어
  const timeouts = useRef([]);
  const duration = 500;

  // 최초 진입시 채팅 디자인 제어
  useEffect(() => {
    if (pageMode === INSERT) {
      timeouts.current[0] = setTimeout(() => {
        setQGreet(true);
        timeouts.current[1] = setTimeout(() => {
          ///////////////////////////////////////////////////////////////////////////////////////////////////////    임시
          setQOwner(true); //인증부터 시작
          setApplyOwner(true);

          // dispatch({
          //   type: sellCarTypes.INIT_CAR_STATE,
          //   payload: {}
          // });
          // // setQAutobellMember(true); //로그인부터 시작
          // if (!isLoginLiveCheck()) {
          //   setApplyAutobellMember(true);
          // } else {
          // setApplyCarRegistration(true); //촬영 시작
          // }

          // setQAutobellMember(true); //로그인부터 시작
          // setApplyAutobellMember(true);

          // setQSellCarConfirm(true);  // 차량선택부터 시작
          // setApplySellCarConfirm(true);

          ///////////////////////////////////////////////////////////////////////////////////////////////////////   임시
        }, duration);
      }, duration);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeouts.current.forEach((v) => {
          clearTimeout(v);
        });
      };
    }

    setQGreet(true);

    if (pageMode === UPDATE) {
      // setIsOwner(true);
      // setApplyOwner(false);
    }
    if (loginAskNeed) {
      setQAutobellMember(true);
      setApplyAutobellMember(true);
    }
  }, []);

  // 임시저장 로드시 채팅 목록 UI 재구현
  const continueAnswerArr = [];
  const handleChattingAnswers = () => {
    setQCarSearch(true); // [3-1] 판매를 원하시는 차량명과 등급을 알려주세요.
    setIsSellCarSearch(true); // 현대 그랜저 IG 프리미엄 입니다.

    setQCarBasicInfo(true); // [4] 차량의 기본정보를 확인해주세요.
    setIsCarBasicInfo(true); //차량 기본정보 확인했습니다.
    // carInfoNullCheck()
    // isCarBasicInfoEmpty

    setQCarOptions(true); // [5] 차량의 옵션정보를 확인해주세요.
    setIsCarOptions(true); //차량 옵션정보 확인 했습니다.
    //carOptionNullCheck()
    //isCarOptionsEmpty

    setQDistance(true); // [6] 주행거리(Km)는 얼마인가요?
    if (!objIsEmpty(car.drvDist) && car.drvDist !== 0) {
      setIsDistance(car.drvDist); //5000 km 입니다.
    } else {
      setIsDistanceEmpty(true);
      setApplyDistance(true);
      continueAnswerArr.push(6);
      return false;
    }

    setQMetalExchange(true); // [7] 판금 및 교환하신 부위가 있으신가요?
    if (!objIsEmpty(car.spExchYn)) {
      let _spExch = '';
      switch (car.spExchYn) {
        case '0010':
          _spExch = car.spExchCntn === null ? 'TODO 정상데이터가 아닙니다' : car.spExchCntn;
          break;
        case '0020':
          _spExch = 'metalexchangeno';
          break;
        case '0030':
        default:
          _spExch = 'metalexchangedontknow';
          break;
      }
      setIsMetalExchange(_spExch); // 판금 교환 답변
    } else {
      setIsMetalExchangeEmpty(true);
      setApplyMetalExchange(true);
      continueAnswerArr.push(7);
      return false;
    }

    setQSpecial(true); //[8] 차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요.
    if (car.crCmnt !== null && car.crCmnt !== ' ') {
      setIsSpecial(car.crCmnt);
    } else if (car.crCmnt === ' ') {
      setIsSpecial(false);
    } else {
      setIsSpecialEmpty(true);
      setApplySpecial(true);
      continueAnswerArr.push(8);
      return false;
    }

    setQLocal(true); // [9] 방문지역을 선택해주세요.
    if (!objIsEmpty(seller.rgstRsdcAddrCd) && !objIsEmpty(seller.rgstRsdcDtlAddrCd)) {
      setIsLocal(`${seller.rgstRsdcAddrCdNm} ${seller.rgstRsdcDtlAddrCdNm}`); // 서울 강남구입니다.
      setQTerms(true);
      // setApplyTerms(true);
      setIsTerms(true);
    } else {
      setIsLocalEmpty(true);
      setApplyLocal(true);
      continueAnswerArr.push(9);
      return false;
    }

    // 동의
    // setQTerms(true);
    // setApplyTerms(true);

    // 사진
    // if (photoCountCheck()) {
    // } else {
    //   continueAnswerArr.push(11);
    // }
    setQCarRegist(true);
    setApplyCarRegistration(true);

    // 우선 순위 미응답 질문 부터 질의 재시작
    if (continueAnswerArr.length > 0) {
      continueAnswerArr.sort();
      handleQuestionShow(continueAnswerArr[0]);
    } else {
      handleQuestionShow(0);
    }
  };

  // 약관 조회
  useEffect(() => {
    const termCodes = { tmsTp: '0600', tmsDiv: '0610' };
    dispatch(getSellCarTermData(termCodes));
  }, []);

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    if (e !== undefined) e.preventDefault();
    setMpop(false);
  }, []);

  // 질문
  const [qGreet, setQGreet] = useState(false);
  const [qOwner, setQOwner] = useState(false);
  const [qAutobellMember, setQAutobellMember] = useState(false);
  const [qSellCarConfirm, setQSellCarConfirm] = useState(false);
  const [qCarSearch, setQCarSearch] = useState(false);
  const [qCarBasicInfo, setQCarBasicInfo] = useState(false);
  const [qCarOptions, setQCarOptions] = useState(false);
  const [qDistance, setQDistance] = useState(false);
  const [qMetalExchange, setQMetalExchange] = useState(false);
  const [qSpecial, setQSpecial] = useState(false);
  const [qLocal, setQLocal] = useState(false);
  const [qTerms, setQTerms] = useState(false);
  const [qCarRegist, setQCarRegist] = useState(false);

  // 더보기, change되는 값
  const [moreActive, setMoreActive] = useState(false);

  // 결과 값
  const [isOwner, setIsOwner] = useState(false);
  const [isMemberType, setIsMemberType] = useState(null);
  const [isSellCar, setIsSellCar] = useState(null);
  const [isSellCarSearch, setIsSellCarSearch] = useState(null);
  const [isCarBasicInfo, setIsCarBasicInfo] = useState(false);
  const [isCarOptions, setIsCarOptions] = useState(false);
  const [isDistance, setIsDistance] = useState('');
  const [isMetalExchange, setIsMetalExchange] = useState('');
  const [isSpecial, setIsSpecial] = useState('');
  const [isLocal, setIsLocal] = useState(null);
  const [isTerms, setIsTerms] = useState(false);
  const [isCarRegist, setIsCarRegist] = useState(false);

  // 미응답 UI 구현용
  const [isCarBasicInfoEmpty, setIsCarBasicInfoEmpty] = useState(false);
  const [isCarOptionsEmpty, setIsCarOptionsEmpty] = useState(false);
  const [isDistanceEmpty, setIsDistanceEmpty] = useState(false);
  const [isMetalExchangeEmpty, setIsMetalExchangeEmpty] = useState(false);
  const [isSpecialEmpty, setIsSpecialEmpty] = useState(false);
  const [isLocalEmpty, setIsLocalEmpty] = useState(false);

  // 팝업
  const [applyOwner, setApplyOwner] = useState(false);
  const [applyCarInfo, setApplyCarInfo] = useState(false);
  const [applyAutobellMember, setApplyAutobellMember] = useState(false);
  const [applySellCarConfirm, setApplySellCarConfirm] = useState(false);
  const [applyCarSearch, setApplyCarSearch] = useState(false);
  const [applyCarBasicInfo, setApplyCarBasicInfo] = useState(false);
  const [applyCarBasicInfoInner, setApplyCarBasicInfoInner] = useState(false);
  const [applyCarOptions, setApplyCarOptions] = useState(false);
  const [applyCarOptionsInner, setApplyCarOptionsInner] = useState(false);
  const [applyDistance, setApplyDistance] = useState(false);
  const [applyMetalExchange, setApplyMetalExchange] = useState(false);
  const [applySpecial, setApplySpecial] = useState(false);
  const [applyLocal, setApplyLocal] = useState(false);
  const [applyTerms, setApplyTerms] = useState(false);
  const [applyCarRegistration, setApplyCarRegistration] = useState(false);
  const [applyConfirm, setApplyConfirm] = useState(false);

  // 풀페이지 팝업
  const [fpCarSearch, setFpCarSearch] = useState(false);
  const [fpTerms, setFpTerms] = useState(false);
  const [fpLogin, setFpLogin] = useState(false);
  const [fpFilter, setFpFilter] = useState(false);
  const [fpRegist, setFpRegist] = useState(false);
  const [fpNomemberCert, setFpNomemberCert] = useState(false);
  const termList = useSelector((state) => state.sellCarStore.sellCarTermList);
  const [termCheck, setTermCheck] = useState([{ id: 'chk1', title: '비교견적 판매 이용약관 (필수)', checked: collectAgree }]);

  const [locationList, setLocationList] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({ value: '', label: '', citys: [] });
  const [selectedCity, setSeletedCity] = useState({});

  // 인풋, 텍스트에리어 값 컨트롤
  const [distanceValue, setDistanceValue] = useState('');
  const [textareaValue1, setTextareaValue1] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');

  const [calcH1, setCalcH1] = useState(80);
  const [calcH2, setCalcH2] = useState(80);

  // 비회원인증 Bottom UP
  const [dimm2, setDimm2] = useState(false);
  const [active2, setActive2] = useState(false);
  const handleNonmemberCheck = useCallback((e) => {
    console.log('비회원 체크');
    e.preventDefault();
    setFpNomemberCert(true);
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  });
  // 비회원인증 close
  const handleCloseDimm2 = useCallback((e) => {
    console.log('비회원 인증 out');
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);

  // 주행거리 응답 출력
  const handleDistance = useCallback(
    (e) => {
      // if (e.target.value !== 0 && /^[1-9][0-9]/.test(e.target.value)) {
      // }
      setDistanceValue(e.target.value);
    },
    [distanceValue]
  );
  // 판금 교환 부위 출력
  const handleTextareaChange1 = useCallback(
    (e) => {
      const targetH = e.target.scrollHeight;
      setCalcH1(targetH <= 60 ? targetH + 40 : 100);
      setTextareaValue1(e.target.value);
    },
    [textareaValue1]
  );
  // 특이사항 응답 출력
  const handleTextareaChange2 = useCallback(
    (e) => {
      const targetH = e.target.scrollHeight;
      setCalcH2(targetH <= 60 ? targetH + 40 : 100);
      setTextareaValue2(e.target.value);
    },
    [textareaValue2]
  );
  // 판금/교환 부위 출력
  const createMetalExchange = (cond) => {
    if (cond === 'metalexchangeno') {
      return <p>없습니다.</p>;
    } else if (cond === 'metalexchangedontknow') {
      return <p>잘 몰라요.</p>;
    }
    return <p>{transformText(cond)}</p>;
  };

  // 더보기 클릭 시, 방문지역 선택 크기 확장
  const handleLocalMore = useCallback((e) => {
    e.preventDefault();
    setMoreActive((prevActive) => !prevActive);
  }, []);
  const onHandleChangedCity = useCallback((e) => {
    setSeletedCity(e);
  }, []);

  // 방문 지역 변경 ============================================================================================================
  useEffect(() => {
    axiosGet(`/api/pricing/getLocation.do`).then((res) => {
      const { data, statusinfo } = res.data;
      if (statusinfo?.returncd === 'SUCCESS') {
        data.forEach((item) => {
          item.value = item.locCd;
          item.label = item.locNm;
          item.citys = [];
        });
      }
      setLocationList(data);
    });
  }, []);

  const onHandleChangedLocationList = useCallback(
    (e) => {
      if (e.citys.length === 0) {
        axiosGet(`/api/pricing/getLocationCity.do?locCd=${e.value}`).then((res) => {
          const { data, statusinfo } = res.data;
          if (statusinfo?.returncd === 'SUCCESS') {
            data.forEach((item) => {
              item.value = item.ctyCd;
              item.label = item.ctyNm;
            });
            e.citys = data;
            setSelectedLocation(e);
            setLocationList(locationList);
          }
        });
      } else {
        setSelectedLocation(e);
      }
    },
    [locationList]
  );
  // 방문 지역 변경 끝 ============================================================================================================

  // 질문의 답변창에 대한 UI 제어 ====================================================================================================
  useEffect(() => {
    if (applyOwner) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarInfo) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyAutobellMember) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applySellCarConfirm) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarSearch) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarBasicInfo) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarBasicInfoInner) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarOptions) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarOptionsInner) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyDistance) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyMetalExchange) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 126,
          color: '#f6f7f8'
        }
      });
    }
    if (applySpecial) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 126,
          color: '#f6f7f8'
        }
      });
    }
    if (applyLocal) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 268,
          color: '#f6f7f8'
        }
      });
    }
    if (applyTerms) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 160,
          color: '#f6f7f8'
        }
      });
    }
    if (applyCarRegistration) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 140,
          color: '#f6f7f8'
        }
      });
    }
    if (applyConfirm) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 297,
          color: '#f6f7f8'
        }
      });
    }
    setTimeout(() => {
      document.querySelector('#wrap').scrollTo(0, document.querySelector('.chat-list-wrap').clientHeight);
    }, 100);
  }, [
    applyCarInfo,
    applyAutobellMember,
    applySellCarConfirm,
    applyCarSearch,
    applyCarBasicInfo,
    applyCarBasicInfoInner,
    applyCarOptions,
    applyCarOptionsInner,
    applyDistance,
    applyMetalExchange,
    applySpecial,
    applyLocal,
    applyTerms,
    applyCarRegistration,
    applyConfirm,
    applyOwner,
    dispatch
  ]);
  // 질문의 답변창에 대한 UI 제어 끝 ==================================================================================================

  // 전송 클릭 시
  // [1] 차량 소유자 인증 선택시
  const handleOwnerApply = useCallback((e) => {
    e.preventDefault();
    setIsOwner(true);
    setApplyOwner(false);
    setApplyCarInfo(false);
    if (loginAskNeed) {
      timeouts.current[2] = setTimeout(() => {
        setQAutobellMember(true);
        setApplyAutobellMember(true);
      }, duration);
    } else {
      timeouts.current[3] = setTimeout(() => {
        setQSellCarConfirm(true);
        setApplySellCarConfirm(true);
      }, duration);
    }
  }, []);

  // [2-1, 2-2] 오토벨 멤버 여부 선택시
  const handleMemberApply = useCallback(
    (type) => (e) => {
      setIsMemberType(type);
      setApplyAutobellMember(false);
      timeouts.current[3] = setTimeout(() => {
        setQSellCarConfirm(true);
        setApplySellCarConfirm(true);
      }, duration);
      setLoginCallbackDone(true);
    },
    []
  );

  // [3] 카마트 차량 정보 검색
  const handleSellCarApply = useCallback(
    (answer) => (e) => {
      e.preventDefault();
      setApplySellCarConfirm(false);
      if (typeof answer !== 'boolean') {
        console.log('카마트 차량 아니오 -> ', answer);
        setIsSellCarSearch(answer);
      } else {
        console.log('카마트 차량 예 ->', answer);
        setIsSellCar(answer);
        setIsSaveAble(true); //차량 확정 이후 부터 임시 저장 가능 - PC 신청번호 발급가능 조건
      }
      if (answer) {
        timeouts.current[4] = setTimeout(() => {
          setQCarBasicInfo(true);
          setApplyCarBasicInfo(true);
        }, duration);
      } else {
        setQCarSearch(true);
        timeouts.current[4] = setTimeout(() => {
          setApplyCarSearch(true);
        }, duration);
      }
    },
    []
  );

  const handleApplyCarBasicInfoInner = useCallback((e) => {
    e.preventDefault();
    setApplyCarBasicInfoInner(true);
  }, []);

  const applyBasicCarInfoCheck = (e) => {
    e.preventDefault();
    if (!carInfoNullCheck(car)) {
      handleCarBasicInfoApply(e);
    } else {
      showAlert(MSG_04);
    }
  };

  // 작성된 정보가 있을시 다음 step으로 넘어가는것 방지
  const [nextEdit, setNextEdit] = useState(true);

  // 임시저장 상태거나 신청 도중 앞부분 정보를 수정하고 나면 사용할 수정 핸들러
  // 수정된 답변들은 건너뛰고 수정안된부분으로 바로 이동하게 함
  const editHandler = (edtMenu, value) => {
    if (isCarOptions !== false) {
      setQCarOptions(true);
      setIsCarOptions(isCarOptions);
      setIsCarOptionsEmpty(false);
      setApplyCarOptions(false);
    } else {
      if (edtMenu === 'options') {
        setIsCarOptions(edtMenu === 'options' ? value : isCarOptions);
      } else {
        // setIsCarOptionsEmpty(true);
        timeouts.current[5] = setTimeout(() => {
          setApplyCarOptions(true);
        }, duration);
        return false;
      }
    }

    if (edtMenu === 'options') {
      setIsCarOptions(edtMenu === 'options' ? value : isCarOptions);
    }

    if (isDistance !== '') {
      setQDistance(true); // [6] 주행거리(Km)는 얼마인가요?
      setIsDistance(isDistance);
      setIsDistanceEmpty(false);
      setApplyDistance(false);
    } else {
      if (edtMenu === 'dist') {
        setNextEdit(true);
        setIsDistance(edtMenu === 'dist' ? value : distanceValue); //5000 km 입니다.
      } else {
        timeouts.current[6] = setTimeout(() => {
          setIsDistanceEmpty(true);
          setApplyDistance(true);
        }, duration);
        // continueAnswerArr.push(6);
        return false;
      }
    }

    if (edtMenu === 'dist') {
      setNextEdit(true);
      setIsDistance(edtMenu === 'dist' ? value : distanceValue); //5000 km 입니다.
    }

    if (isMetalExchange !== '') {
      setQMetalExchange(true); // [7] 판금 및 교환하신 부위가 있으신가요?
      setIsMetalExchange(isMetalExchange);
      setIsMetalExchangeEmpty(false);
      setApplyMetalExchange(false);
    } else {
      if (edtMenu === 'excgYn' || edtMenu === 'excg') {
        setNextEdit(true);
        setIsMetalExchange(edtMenu === 'excgYn' ? value : edtMenu === 'excg' ? value : isMetalExchange); // 판금 교환 답변
      } else {
        timeouts.current[7] = setTimeout(() => {
          setIsMetalExchangeEmpty(true);
          setApplyMetalExchange(true);
        }, duration);
        return false;
      }
    }

    if (edtMenu === 'excgYn' || edtMenu === 'excg') {
      setNextEdit(true);
      setIsMetalExchange(edtMenu === 'excgYn' ? value : edtMenu === 'excg' ? value : isMetalExchange); // 판금 교환 답변
      setIsMetalExchangeEmpty(false);
    }

    if (isSpecial !== '') {
      setQSpecial(true); //[8] 차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요.
      setIsSpecial(isSpecial);
      setApplySpecial(false);
      setIsSpecialEmpty(false);
    } else {
      if (edtMenu === 'special') {
        setNextEdit(true);
        setIsSpecial(edtMenu === 'special' ? (value === '' ? false : value) : isSpecial);
      } else {
        timeouts.current[8] = setTimeout(() => {
          setIsSpecialEmpty(true);
          setApplySpecial(true);
        }, duration);
        return false;
      }
    }

    if (edtMenu === 'special') {
      setNextEdit(true);
      setIsSpecial(edtMenu === 'special' ? (value === '' ? false : value) : isSpecial);
    }

    if (isLocal !== null) {
      setQLocal(true); // [9] 방문지역을 선택해주세요.
      setIsLocal(isLocal);
      setApplyLocal(false);
      setIsLocalEmpty(false);
    } else {
      if (edtMenu === 'local') {
        setNextEdit(true);
        setIsLocal(edtMenu === 'local' ? value : isLocal);
      } else {
        timeouts.current[9] = setTimeout(() => {
          setIsLocalEmpty(true);
          setApplyLocal(true);
        }, duration);
        return false;
      }
    }

    if (edtMenu === 'local') {
      setNextEdit(true);
      setIsLocal(edtMenu === 'local' ? value : isLocal);
    }

    if (isTerms !== false) {
      setQTerms(true);
      setIsTerms(true);
      setApplyTerms(false);
    } else {
      if (edtMenu === 'terms') {
        setIsTerms(value);
      } else {
        timeouts.current[10] = setTimeout(() => {
          setApplyTerms(true);
        }, duration);
        return false;
      }
    }

    setQCarRegist(true);
    setApplyCarRegistration(true);
  };

  // [4] 차량 기본 정보 선택시
  const handleCarBasicInfoApply = useCallback(
    (e) => {
      e.preventDefault();
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setIsCarBasicInfo(true);
      editHandler('basic', true);
      if (isCarOptions !== false) return false;
      // setIsCarBasicInfoEmpty(false);
      timeouts.current[5] = setTimeout(() => {
        setQCarOptions(true);
        setApplyCarOptions(true);
      }, duration);
    },
    [isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [5] 차량 옵션 정보 선택시
  const handleCarOptionsApply = useCallback(
    (e) => {
      e.preventDefault();
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setIsCarOptions(true);
      editHandler('options', true);
      if (isDistance !== '') return false;
      // setIsCarOptionsEmpty(false);
      timeouts.current[6] = setTimeout(() => {
        setQDistance(true);
        setApplyDistance(true);
      }, duration);
    },
    [isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  const handleApplyCarOptionsInner = useCallback((e) => {
    e.preventDefault();
    setApplyCarOptionsInner(true);
  }, []);

  // [6] 차량 주행거리 선택시
  const handleDistanceApply = useCallback(
    (e) => {
      e.preventDefault();
      // TODO 카마트 정보와 주행거리 비교
      if (objIsEmpty(distanceValue) || distanceValue.length > 6) {
        showAlert(MSG_06);
        return;
      }
      setIsDistance(parseInt(distanceValue, 10));
      setApplyDistance(false);
      handleDrvDist(distanceValue);
      setIsDistanceEmpty(false);

      editHandler('dist', distanceValue);
      if (!objIsEmpty(car.spExchYn)) return false;
      timeouts.current[7] = setTimeout(() => {
        setQMetalExchange(true);
        setApplyMetalExchange(true);
      }, duration);
    },
    [distanceValue, isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [7-1] 판금/교환 아니오, 몰라요 입력시
  const handleMetalExchangeApply = useCallback(
    (cond) => (e) => {
      e.preventDefault();
      setIsMetalExchange(cond);
      setIsMetalExchangeEmpty(false);
      setApplyMetalExchange(false);
      handleSpExchYn(cond === 'metalexchangeno' ? '0020' : '0030');
      handleSpExchCntn('');
      editHandler('excgYn', cond);
      if (isSpecial !== '') return false;
      timeouts.current[8] = setTimeout(() => {
        setQSpecial(true);
        setApplySpecial(true);
      }, duration);
    },
    [isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [7-2] 판금/교환 부위 입력시
  const handleMetalExchangePartApply = useCallback(
    (cond) => (e) => {
      e.preventDefault();
      if (objIsEmpty(cond)) {
        showAlert(MSG_07);
        return;
      }
      setIsMetalExchange(cond);
      editHandler('excg', textareaValue1);
      setApplyMetalExchange(false);
      handleSpExchYn('0010'); //교환 - 예
      handleSpExchCntn(cond);
      setIsMetalExchangeEmpty(false);
      if (isSpecial !== '') return false;
      timeouts.current[8] = setTimeout(() => {
        setQSpecial(true);
        setApplySpecial(true);
      }, duration);
    },
    [textareaValue1, isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [8] 특이사항 입력시
  const handleSpecialApply = useCallback(
    (cond) => (e) => {
      e.preventDefault();
      if (cond && !objIsEmpty(textareaValue2)) {
        handleCrCmnt(textareaValue2);
        setIsSpecial(textareaValue2);
      } else {
        handleCrCmnt(' ');
        setIsSpecial(false);
      }
      editHandler('special', textareaValue2);
      setApplySpecial(false);
      setIsSpecialEmpty(false);
      if (isLocal !== null) return false;
      if (objIsEmpty(isLocal)) {
        timeouts.current[9] = setTimeout(() => {
          setQLocal(true);
          setApplyLocal(true);
        }, duration);
      }
    },
    [textareaValue2, isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [9] 방문 지역 선택시
  const handleLocalApply = useCallback(
    (e) => {
      e.preventDefault();
      const location = selectedLocation && selectedLocation.label ? selectedLocation.label : '';
      const city = selectedCity && selectedCity.label ? selectedCity.label : '';
      if (!objIsEmpty(location) && !objIsEmpty(city)) {
        setIsLocal(`${location} ${city}`);
        setApplyLocal(false);
        handleRgstRsdcAddrCd(selectedLocation.locCd);
        handleRgstRsdcDtlAddrCd(selectedCity.ctyCd);
        setIsLocalEmpty(false);
        editHandler('local', `${location} ${city}`);
        if (isTerms !== false) return false;
        timeouts.current[10] = setTimeout(() => {
          setQTerms(true);
          setApplyTerms(true);
        }, duration);
      } else {
        showAlert(MSG_09);
      }
    },
    [selectedCity, selectedLocation, isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [10] 약관 선택시
  const handleTermsApply = useCallback(
    (e) => {
      e.preventDefault();
      if (termCheck[0].checked) {
        setIsTerms(true);
        setApplyTerms(false);
        editHandler('terms', true);
        timeouts.current[11] = setTimeout(() => {
          setQCarRegist(true);
          setApplyCarRegistration(true);
        });
      } else {
        showAlert(MSG_10);
      }
    },
    [isCarBasicInfo, isCarOptions, isLocal, isSpecial, isDistance, isMetalExchange]
  );

  // [11] 촬영

  // [12] 저장, 최종 전송
  const handleFinalApply = (e) => {
    e.preventDefault();
    // if (!sellcarInputValidationCheck()) return;
    if (!isLoginLiveCheck() && !isApplyTempCert) {
      showAlert(`신청에 실패했습니다.<br>세션종료. 로그인을 다시 해주세요.`);
      return;
    }
    updateRequestComplete(seller).then((res) => {
      if (res) {
        // if (res?.data.statusinfo.returncd === '000') { // updateRequestComplete.do
        // Router.replace('/sell/selfStep05');
        Router.push({
          pathname: '/sell/selfStep05',
          query: {
            name: seller.nmbNm,
            mobile: seller.hpPn,
            location: isLocal
          }
        });
      } else {
        showAlert(`신청에 실패했습니다.`);
      }
    });
  };

  // TODO 미응답 질문 체크 및 화면 제어 보완 필요
  const sellcarInputValidationCheck = () => {
    let _errStep = 0;
    if (carInfoNullCheck(car)) {
      _errStep = 4; // [4] 차량의 기본정보
    } else if (carOptionNullCheck(car)) {
      _errStep = 5; // [5] 차량의 옵션정보
    } else if (objIsEmpty(car.drvDist)) {
      _errStep = 6; // [6] 주행거리
    } else if (objIsEmpty(car.spExchYn)) {
      _errStep = 7; // [7] 판금 및 교환
    } else if (car.crCmnt === null && car.crCmnt !== ' ') {
      _errStep = 8; // [8] 차량에 관한 기타 설명
    } else if (objIsEmpty(seller.rgstRsdcAddrCd) || objIsEmpty(seller.rgstRsdcDtlAddrCd)) {
      _errStep = 9; // [9] 방문지역
    }
    // else if (false) {
    //   _errStep = 10; // [10] 동의 - 패스
    // } else if (photoCountCheck()) {
    //   _errStep = 11; // [11] 사진
    // }
    return handleQuestionShow(_errStep, true);
  };

  // alert은 밸리데이션 체크시
  const handleQuestionShow = (step, alert = false) => {
    switch (step) {
      case 4: // [4] 차량의 기본정보
        // setApplyCarBasicInfo(true);
        handleCarBasicInfoModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_04);
        break;
      case 5: // [5] 차량의 옵션정보
        // setApplyCarOptions(true);
        handleCarOptionsModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_05);
        break;
      case 6: // [6] 주행거리
        setQDistance(true); // [6] 주행거리(Km)는 얼마인가요?
        // setApplyDistance(true);
        handleDistanceModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_06);
        break;
      case 7: // [7] 판금 및 교환
        setQMetalExchange(true); // [7] 판금 및 교환하신 부위가 있으신가요?
        //setApplyMetalExchange(true);
        handleMetalExchangeModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_07);
        break;
      case 8: // [8] 차량에 관한 기타 설명
        setQSpecial(true); //[8] 차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요.
        // setApplySpecial(true);
        handleSpecialModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_08);
        break;
      case 9: // [9] 방문지역
        setQLocal(true); // [9] 방문지역을 선택해주세요.
        handleLocalModify();
        //setApplyLocal(true);
        setNextEdit(false);
        if (alert) showAlert(MSG_09);
        break;
      // case 10: // [10] 동의 - 패스
      //   setQTerms(true);
      //   setIsTerms(true);
      //   if (alert) showAlert(MSG_10);
      //   break;
      // case 11: // [11] 사진
      //   setQCarRegist(true);
      //   setApplyCarRegistration(true);
      //   if (alert) showAlert(MSG_11);
      //   break;
      default:
        setQTerms(true);
        setIsTerms(true);
        return true;
    }
    return false;
  };

  // 수정 클릭 시 답변창 제어==================================================================================================
  const handleSellCarConfirmModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(true);
  }, []);

  const handleCarBasicInfoModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyCarBasicInfo(true);
  }, []);

  const handleCarOptionsModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyCarOptions(true);
  }, []);

  const handleDistanceModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyDistance(true);
  }, []);

  const handleMetalExchangeModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplySpecial(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    console.warn('applymetalExchange modify');
    setApplyMetalExchange(true);
  }, []);

  const handleSpecialModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyMetalExchange(false);
    setApplyDistance(false);
    setApplyLocal(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplySpecial(true);
  }, []);

  const handleLocalModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyLocal(true);
  }, []);
  const handleTermsModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyDistance(false);
    setApplyMetalExchange(false);
    setApplySpecial(false);
    setApplyCarRegistration(false);
    setApplyLocal(false);
    setApplyConfirm(false);
    setApplyTerms(true);
  }, []);
  // 수정 클릭 시 답변창 제어 끝 ==================================================================================================

  const [fpPB, setFpPB] = useState(80);
  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      if (e !== undefined) e.preventDefault();
      if (name === 'car_search') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 소유자 확인',
            options: ['close']
          }
        });
        setFpTerms(false);
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpNomemberCert(false);
        setFpCarSearch(true);
        setFpPB(80);
      } else if (name === 'terms') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '비교견적 판매 이용약관',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpNomemberCert(false);
        setFpTerms(true);
        setFpPB(80);
      } else if (name === 'login') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '로그인',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpTerms(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpNomemberCert(false);
        setFpLogin(true);
        setFpPB(80);
      } else if (name === 'nonmember') {
        console.log('fullpage => Bottom UP');
        // dispatch({
        //   type: MOBILE_FULLPAGE_POPUP,
        //   data: {
        //     isPopup: true,
        //     title: '로그인',
        //     options: ['close']
        //   }
        // });
        // setFpCarSearch(false);
        // setFpTerms(false);
        // setFpRegist(false);
        // setFpFilter(false);
        // setFpLogin(false);
        // setFpNomemberCert(true);
        // setFpPB(80);
      } else if (name === 'filter') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 검색',
            options: ['back', 'reset']
          }
        });
        setFpCarSearch(false);
        setFpTerms(false);
        setFpRegist(false);
        setFpLogin(false);
        setFpNomemberCert(false);
        setFpFilter(true);
        setFpPB(80);
      } else if (name === 'register') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 사진 등록',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpLogin(false);
        setFpTerms(false);
        setFpFilter(false);
        setFpNomemberCert(false);
        setFpRegist(true);
        setFpPB(0);
      }
    },
    []
  );

  // 약관 체크
  const handleTermChange = () => {
    dispatch(
      inputStateAction({
        state: 'collectAgree',
        value: termCheck[0].checked
      })
    );
  };

  // 인증 팝업
  const handleFpCarSearchClose = useCallback(() => {
    setFpCarSearch(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    setApplyCarInfo(true);
  }, [fpCarSearch]);

  const handleFpTermsClose = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [fpTerms]
  );

  // 로그인 팝업
  const handleFpLoginClose = useCallback(
    (e) => {
      if (e !== undefined) e.preventDefault();
      setFpLogin(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      handleMemberApply('member')(e);
    },
    [setFpLogin]
  );

  // 비회원 본인인증 처리후
  const handleFpNomemberCertClose = useCallback((e) => {
    setFpNomemberCert(false);
    handleCloseDimm2();
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    if (e?.RETURN_CD === '0000') {
      const _userName = e.LGD_MOBILE_SUBAUTH_NAME;
      const _mobileNumber = e.LGD_MOBILENUM;
      dispatch(inputPropAction({ state: 'seller', prop: 'nmbNm', value: _userName }));
      dispatch(inputPropAction({ state: 'seller', prop: 'hpPn', value: setHpPnFormat(_mobileNumber) }));
      (async () => {
        // 비회원 토큰 생성
        const _result = await nonmemberlogin(_mobileNumber, _userName);
        if (_result === 'SUCCESS') {
          setIsApplyTempCert(true);
          handleMemberApply('nonmember')(e);
        } else {
          showAlert('본인 인증이 정상적으로 처리 되지 않았습니다.');
        }
      })();
    } else {
      showAlert('본인 인증이 정상적으로 처리 되지 않았습니다.');
    }
  }, []);

  // 차량검색 - 제조사·모델·등급 선택
  const filterCallback = useCallback((e) => {
    e.preventDefault();
    setApplyCarSearch(false);
    setFpFilter(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    handleSellCarApply('finish')(e);
  }, []);

  // 차량사진 등록 팝업 닫기
  const fpRegistClose = useCallback((e) => {
    if (e !== undefined) e.preventDefault();
    setFpRegist(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, []);

  // 차량 검색 옵션을 통한 차량 선택시 차량 정보 업데이트
  const handleCarModelSelect = useCallback(
    (e, deps) => {
      console.warn('차량옵션 선택 >>>', deps);
      const newCar = Object.assign(
        {},
        {
          crNm: `${deps.detailModelNm || ''} ${deps.classNm || ''} ${deps.name || ''}`,
          crMnfcCd: deps.manufactureId,
          crMdlCd: deps.modelId,
          crDtlMdlCd: deps.detailModelId,
          crClsCd: deps.classId || deps.id,
          crDtlClsCd: deps.classId ? deps.id : '',
          crMnfcCdNm: deps.manufactureNm,
          crMdlCdNm: deps.modelNm,
          crDtlMdlCdNm: deps.detailModelNm,
          crClsCdNm: deps.classNm || deps.name,
          crDtlClsCdNm: deps.classNm ? deps.name : '',
          frmYyyy: new Date().getFullYear(),
          optionList: []
        }
      );
      dispatch(
        inputStateAction({
          state: 'car',
          value: newCar
        })
      );
      setIsSellCar(false); // 차량명 xxx가 맞습니다 (카마트 정보)
      setQCarSearch(true); // 판매하려는 차량이 뭔가요? 검색용 질문
      setIsDate(car.frstRegDt || moment());
      setIsSaveAble(true); //차량 확정 이후 부터 임시 저장 가능 - PC 신청번호 발급가능 조건
      filterCallback(e);
    },
    [dispatch, filterCallback]
  );

  // 로그인 후 회원 정보가 변경되면 임시저장건 체크
  useEffect(() => {
    if (isMemberType !== null) {
      checkApplication();
    }
  }, [isMemberType]);

  const formRef = useRef(null); // For new
  // addedList 수정 된 파일
  const sendPictureData = async (addedList) => {
    const formData = new FormData(); // multipart/form-data로 보낼 파일 생성
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'));
    formData.append('crId', crId);
    formData.append('crNo', car.crNo);
    formData.append('slReqId', slReqId);
    let uploadSize = 0;
    fileInputs.forEach((input) => {
      if (addedList.includes(Number(input.dataset.sortNo))) {
        const file = input.files[0];
        if (file) {
          uploadSize++;
          formData.append('files', file, input.dataset.sortNo);
        }
      }
    });
    if (uploadSize > 0) {
      setIsLoading(true);
      return await uploadCarPhoto(formData)
        .then((res) => res?.data)
        .then((res) => {
          console.warn('RESULT', res);
          const { statusinfo } = res;
          if (statusinfo?.returncd === '000') {
            return true;
          }
          return false;
        })
        .catch(() => {
          return false;
        });
    } else {
      return true;
    }
  };

  // TODO 사진 촬영 팝업
  const applyPictureRegist = async (e, addedList, deletedList) => {
    e.preventDefault();
    const validSuccess = await validatePicture(formRef, photoList, addedList, deletedList);
    if (!validSuccess) {
      showAlert(`대표사진을 등록해주세요.`);
    } else {
      if (deletedList?.length > 0) {
        const _photoList = [];
        deletedList.forEach((item) => {
          _photoList.push({ sortNo: item });
        });
        const CarMstVO = Object.assign({}, { crId: crId }, { photoList: _photoList });
        const result = await deleteCarPhotos(CarMstVO);
        if (result && !addedList?.length > 0) {
          handleReloadReqInfo();
        }
      }
      if (addedList?.length > 0) {
        const result = await sendPictureData(addedList);
        setIsLoading(false);
        if (result) {
          showAlert(`사진이 임시저장 되었습니다.`);
          fpRegistClose();
          setIsCarRegist(true);
          setApplyCarRegistration(false);
          setApplyConfirm(true);
          handleReloadReqInfo();
          // dispatch(getReqAction(query?.slReqId || seller.slReqId));
        } else {
          showAlert(`사진 임시저장에 실패 하였습니다.`);
          fpRegistClose();
          setApplyCarRegistration(false);
        }
      } else {
        setIsLoading(false);
        fpRegistClose();
        setApplyCarRegistration(false);
        setApplyConfirm(true);
      }
    }
  };

  // 차량 옵션정보 - 옵션선택
  const [carOptionsSelect, setCarOptionsSelect] = useState(false);
  const [dimm, setDimm] = useState(false);
  const handleOptionClick = useCallback(() => {
    setCarOptionsSelect(true);
    setDimm(true);
    preventScroll(true);
  }, []);
  const handleCloseDimm = useCallback(() => {
    setCarOptionsSelect(false);
    setDimm(false);
    preventScroll(false);
  }, []);

  // 차량 기본정보 - 달력
  const [calPop, setCalPop] = useState(false);
  const [isDate, setIsDate] = useState(moment());
  const handleCalendarPop = (e) => {
    e.preventDefault();
    setCalPop(true);
    preventScroll(true);
  };
  const calendarCallback = (e, date) => {
    e.preventDefault();
    if (checkRegistPeriodAllowed(date)) {
      showAlert('기준년도(당해년도)보다 미래는 선택 불가능 합니다.');
      return;
    }
    setIsDate(date);
    setCalPop(false);
    handleFrstRegDt(date);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop(false);
    preventScroll(false);
  };

  // 인증시 입력 설정 이름 , 차량번호
  const handleCarNoChanged = useCallback((e) => {
    setCrNo(e.target.value);
  }, []);
  const handleOwnerNameChange = useCallback((e) => {
    setOwnerName(e.target.value);
  }, []);

  // 본인 인증 검색
  const handleSearchCarNo = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (objIsEmpty(crNo)) {
        showAlert('차량번호를 입력해주세요.');
        return;
      }
      setIsLoading(true);
      dispatch(
        carHistoryAuthSucc({
          crNo: e.crNo,
          hashCode: e.hashValue
        })
      );
      dispatch(
        getCarMartInfoAction({
          crNo: e.crNo || crNo
        })
      ); // 카마트 조회
    },
    [crNo]
  );

  // TODO 본인 인증 취소
  const onTsCancel = () => {
    // this.setState({ isMobileCarNumInput: !this.state.isMobileCarNumInput });
    dispatch(carHistoryAuthFail());
    console.warn('인증 취소 로직');
  };

  const [searchCarName, setSearchCarName] = useState('');
  //  차량 옵션 데이터 가쟈오기
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      if (fpCarSearch) handleFpCarSearchClose();
    }
    setSearchCarName(`${car?.crMnfcCdNm || ''} ${car?.crMdlCdNm || ''} ${car?.crDtlMdlCdNm || ''} ${car?.crClsCdNm || ''} ${car?.crDtlClsCdNm || ''}`);
    setPictureCount(car?.photoList?.length > 0 ? car.photoList.length : 0);

    if (crNo !== null && !isReloadDenied) checkApplication();
    if (originalCrId !== car.crId) {
      if (isLoadComplete) handleChattingAnswers();
      setOriginalCrId(car.crId);
    }
  }, [car]);

  // TODO 공통으로 통합
  // 최초등록일 업데이트
  const handleFrstRegDt = (date) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'frstRegDt',
        value: date.format('YYYY-MM-DD')
      })
    );
  };

  // 주행거리 업데이트
  const handleDrvDist = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'drvDist',
        value
      })
    );
  };

  // 판금 교환 여부 업데이트
  const handleSpExchYn = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'spExchYn',
        value
      })
    );
  };

  // 판금 교환 부위 업데이트
  const handleSpExchCntn = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'spExchCntn',
        value
      })
    );
  };

  // 특이사항 입력 업데이트
  const handleCrCmnt = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'crCmnt',
        value
      })
    );
  };

  // 도시 선택 업데이트
  const handleRgstRsdcAddrCd = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'rgstRsdcAddrCd',
        value
      })
    );
  };

  // 상세도시 선택 업데이트
  const handleRgstRsdcDtlAddrCd = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'rgstRsdcDtlAddrCd',
        value
      })
    );
  };

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-sec sell-register-wrap">
          <div className="chat-list-wrap">
            <div className="left">
              {qGreet && (
                <p>
                  안녕하세요! 오토벨입니다.
                  <br />
                  내가 찍은 사진으로 24시간 견적을 받는 <strong>비교견적으로 내 차 팔기</strong>를 시작합니다.
                </p>
              )}
              {qOwner && (
                <p>
                  판매하시려는 차량을 조회하기 위해, <strong>소유자 이름</strong>과 <strong>차량번호</strong>를 입력합니다.
                  <br />
                  (차량번호와 소유자가 일치해야 시작할 수 있습니다.)
                </p>
              )}
            </div>
            {isOwner && (
              <div className="right">
                <p>차량 소유자를 확인했습니다.</p>
              </div>
            )}
            {qAutobellMember && loginAskNeed && (
              <div className="left">
                <p>
                  아직 오토벨 회원이 아니신가요?
                  <br />
                  로그인하시면 비교견적 서비스를 더욱 편리하게 이용하실 수 있어요.
                </p>
                <p>비회원으로 신청 시, 휴대폰 본인 인증을 진행해야 합니다.</p>
              </div>
            )}
            {isMemberType !== null && (
              <div className="right">
                {isMemberType === 'member' && <p>로그인 했어요.</p>}
                {isMemberType === 'nonmember' && <p>비회원으로 진행할래요.</p>}
                {/* <span className="edit" onClick={handleAutobellMemberModify}>
                  수정
                </span> */}
              </div>
            )}
            {qSellCarConfirm && (
              <div className="left">
                <p>
                  판매하시려는 차량이 <strong>{searchCarName}</strong> 맞으세요?
                </p>
              </div>
            )}
            {isSellCar === false && (
              <div className="right">
                <p>아니오.</p>
              </div>
            )}
            {qCarSearch && (
              <div className="left">
                <p>
                  판매를 원하시는 <strong>차량정보(제조사, 모델, 등급)</strong>를 직접 선택해주세요.
                </p>
              </div>
            )}
            {isSellCarSearch && (
              <div className="right">
                <p>{`${car?.crMnfcCdNm || ''} ${car?.crMdlCdNm || ''} ${car?.crDtlMdlCdNm || ''} ${car?.crClsCdNm || ''} ${car?.crDtlClsCdNm || ''} 입니다.`}</p>
                <span className="edit" onClick={handleSellCarConfirmModify}>
                  수정
                </span>
              </div>
            )}
            {isSellCar && (
              <div className="right">
                <p>
                  <span>{searchCarName}</span>이/가 맞습니다.
                </p>
                <span className="edit" onClick={handleSellCarConfirmModify}>
                  수정
                </span>
              </div>
            )}
            {qCarBasicInfo && (
              <div className="left">
                <p>
                  색상, 연료 등 차량의 <strong>기본정보</strong>를 확인해주세요.
                </p>
              </div>
            )}
            {isCarBasicInfo && (
              <div className="right">
                <p>차량 기본정보를 확인했습니다.</p>
                <span className="edit" onClick={handleCarBasicInfoModify}>
                  수정
                </span>
              </div>
            )}
            {isCarBasicInfoEmpty && (
              <div className="right">
                <p>차량 기본정보 확인해주세요.</p>
                <span className="edit" onClick={handleCarBasicInfoModify}>
                  입력
                </span>
              </div>
            )}
            {qCarOptions && (
              <div className="left">
                <p>
                  기본옵션과 추가된 옵션 등 차량의 <strong>옵션정보</strong>를 확인해주세요.
                </p>
              </div>
            )}
            {isCarOptions && (
              <div className="right">
                <p>차량 옵션정보를 확인했습니다.</p>
                <span className="edit" onClick={handleCarOptionsModify}>
                  수정
                </span>
              </div>
            )}
            {isCarOptionsEmpty && (
              <div className="right">
                <p>차량 옵션정보를 확인해 주세요.</p>
                <span className="edit" onClick={handleCarOptionsModify}>
                  입력
                </span>
              </div>
            )}
            {qDistance && (
              <div className="left">
                <p>주행거리(km)는 얼마인가요?</p>
              </div>
            )}
            {isDistance !== '' && (
              <div className="right">
                <p>
                  <span>{numberFormat(isDistance)}km</span> 입니다.
                </p>
                <span className="edit" onClick={handleDistanceModify}>
                  수정
                </span>
              </div>
            )}
            {isDistanceEmpty && (
              <div className="right">
                <p>주행거리를 입력해주세요.</p>
                <span className="edit" onClick={handleDistanceModify}>
                  입력
                </span>
              </div>
            )}
            {qMetalExchange && (
              <div className="left">
                <p>
                  <strong>판금 및 교환</strong>하신 부위가 있으신가요?
                </p>
              </div>
            )}
            {isMetalExchange !== '' && (
              <div className="right">
                {createMetalExchange(isMetalExchange)}
                <span className="edit" onClick={handleMetalExchangeModify}>
                  수정
                </span>
              </div>
            )}
            {isMetalExchangeEmpty && (
              <div className="right">
                <p>판금/교환 부위를 입력해주세요.</p>
                <span className="edit" onClick={handleMetalExchangeModify}>
                  입력
                </span>
              </div>
            )}
            {qSpecial && (
              <div className="left">
                <p>
                  <strong>사고 이력, 스크래치, 기타 장점</strong> 등 더 알리고 싶은 내용을 입력해주세요.
                </p>
              </div>
            )}
            {isSpecial !== '' && (
              <div className="right">
                <p>{isSpecial === false ? '특이사항 없습니다.' : transformText(isSpecial)}</p>
                <span className="edit" onClick={handleSpecialModify}>
                  수정
                </span>
              </div>
            )}
            {isSpecialEmpty && (
              <div className="right">
                <p>차량 특이사항을 입력해주세요.</p>
                <span className="edit" onClick={handleSpecialModify}>
                  입력
                </span>
              </div>
            )}
            {qLocal && (
              <div className="left">
                <p>
                  견적 선택 후, 딜러가 <strong>방문할 지역</strong>을 선택해주세요.
                  <br />
                  (견적은 방문지역과 상관없이 전국딜러에게 보여집니다.)
                </p>
              </div>
            )}
            {!objIsEmpty(isLocal) && (
              <div className="right">
                <p>
                  <span>{isLocal}</span> 입니다.
                </p>
                <span className="edit" onClick={handleLocalModify}>
                  수정
                </span>
              </div>
            )}
            {isLocalEmpty && (
              <div className="right">
                <p>방문지역을 입력해주세요.</p>
                <span className="edit" onClick={handleLocalModify}>
                  입력
                </span>
              </div>
            )}
            {qTerms && (
              <div className="left">
                <p>비교견적 판매를 위해서는 서비스 이용동의가 필요해요</p>
              </div>
            )}
            {isTerms !== false && (
              <div className="right">
                <p>비교견적 판매 이용에 동의합니다.</p>
                <span className="edit" onClick={handleTermsModify}>
                  수정
                </span>
              </div>
            )}
            {qCarRegist && (
              <div className="left">
                <p>
                  마지막으로 <strong>차량사진</strong>을 등록해주세요.(필수 5장)
                  <br />
                  오토벨 App을 이용하시면 쉽고 간편하게 촬영할 수 있어요!
                </p>
              </div>
            )}
            {isCarRegist && (
              <>
                <div className="right">
                  <p>사진을 모두 등록했습니다.</p>
                </div>
                <div className="left">
                  <p>모든 입력이 끝났습니다!</p>
                </div>
              </>
            )}
          </div>

          {/* 채팅창 로딩중 */}
          <MobBottomArea active={true} isSimple={true}>
            <div className="inner">
              <div className="loading-wrap" />
            </div>
          </MobBottomArea>

          {/* step01 : 소유자 확인 */}
          <MobBottomArea active={applyOwner} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 소유자 확인"
                iconType="next-black"
                height={48}
                onClick={handleFullpagePopup('car_search')}
              />
            </div>
          </MobBottomArea>

          {/* step02 : 차량정보 조회 */}
          <MobBottomArea active={applyCarInfo} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <p className="tit1">
                아래 차량정보가 맞나요?
                <br />
                <span>정보가 달라도 괜찮아요! 잠시 후 수정할 수 있습니다.</span>
              </p>
              <table className="table-tp1" summary="차량정보 조회에 대한 내용">
                <caption className="away">차량정보 조회</caption>
                <colgroup>
                  <col width="34%" />
                  <col width="66%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>{car?.crNo}</td>
                  </tr>
                  <tr>
                    <th>차량명</th>
                    <td>
                      {car?.crMnfcCdNm} {car?.crDtlMdlCdNm} {car?.crClsCdNm} {car?.crDtlClsCdNm}
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>{car?.frstRegDt}</td>
                  </tr>
                  <tr>
                    <th>형식년도</th>
                    <td>{car?.frmYyyy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button size="full" background="blue80" title="확인" onClick={handleOwnerApply} disabled={needProcessStopped} />
          </MobBottomArea>

          {/* step03 : 오토벨 회원여부 확인 */}
          <MobBottomArea active={applyAutobellMember} isSimple={true} mode="fade">
            <div className="inner">
              <Buttons align="center">
                <Button
                  size="big"
                  background="blue20"
                  radius={true}
                  title="비회원으로 신청"
                  width={48}
                  measure={'%'}
                  height={48}
                  color="blue80"
                  // onClick={handleFullpagePopup('nonmember')}
                  onClick={handleNonmemberCheck}
                />
                <Button size="big" background="blue80" radius={true} title="로그인" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleFullpagePopup('login')} />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step05 : 판매차량 확인 */}
          <MobBottomArea active={applySellCarConfirm} isSimple={true} mode="fade">
            <div className="inner">
              <Buttons align="center">
                <Button
                  size="big"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="아니오"
                  width={48}
                  measure={'%'}
                  height={48}
                  onClick={handleSellCarApply(false)}
                  disabled={needProcessStopped}
                />
                <Button
                  size="big"
                  background="blue80"
                  radius={true}
                  title="예"
                  width={48}
                  measure={'%'}
                  height={48}
                  marginLeft={4}
                  mgMeasure={'%'}
                  onClick={handleSellCarApply(true)}
                  disabled={needProcessStopped}
                />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step06 : 차량검색(아니오 버튼 클릭시) */}
          <MobBottomArea active={applyCarSearch} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 검색"
                iconType="next-black"
                height={48}
                onClick={handleFullpagePopup('filter')}
              />
            </div>
          </MobBottomArea>

          {/* step07 : 차량기본정보 */}
          <MobBottomArea active={applyCarBasicInfo} isSimple={true} className="min" mode="fade">
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 기본정보 확인"
                iconType="next-black"
                height={48}
                onClick={handleApplyCarBasicInfoInner}
              />
              <MobBottomArea active={applyCarBasicInfoInner} isSimple={true} className="min" mode="fade" isFixButton={true}>
                <MobCarBasicInfoEditor item={car} isEditing={true} handleCalendarPop={handleCalendarPop} type={'sellcar'} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={applyBasicCarInfoCheck} />
              </MobBottomArea>
            </div>
          </MobBottomArea>

          {calPop
            ? createBodyPortal(
                <>
                  <div className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
                  <MobBottomArea active={calPop} isFixButton={true} zid={102}>
                    <MobCalendar date={moment(car.frstRegDt) || moment()} callback={calendarCallback} />
                  </MobBottomArea>
                </>
              )
            : null}

          {/* step08 : 차량옵션정보 */}
          <MobBottomArea active={applyCarOptions} isSimple={true} className="min" mode="fade">
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 옵션정보 확인"
                iconType="next-black"
                height={48}
                onClick={handleApplyCarOptionsInner}
              />
              <MobBottomArea active={applyCarOptionsInner} isSimple={true} className="min" mode="fade" isFixButton={true}>
                <div className="inner bottom-write-area m-options">
                  <CarOptionsEditor items={car?.optionList} isEditing={true} addOptions={false} className="mt32" resetFn={true} selectOptFlag={true} />
                  {/* <CarOptions type={1} mode="check" isValue={false} optionList={car.optionList} />
                  <CarAddOption onClick={handleOptionClick} /> */}
                  {/* <MobCarOptionsEditor items={car.optionList} isEditing={true} onClose={true} />
                  <CarAddOptionsEditor items={car.optionList} item={car} isEditing={true} /> */}
                </div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCarOptionsApply} />
              </MobBottomArea>
            </div>
          </MobBottomArea>

          <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
          <MobBottomArea active={carOptionsSelect} isFixButton={true} className="min" mode="fade">
            <div className="inner filter-list-wrap pb0">
              <p className="tit1">추가옵션</p>
              <ul className="float-wrap col2">
                <li>
                  <CheckBox id="chk-optiton-1" title="가솔린 24 엔진" name="가솔린 24 엔진" />
                  <CheckBox id="chk-optiton-2" title="패키지1" name="패키지1" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-3" title="패키지2" name="패키지2" />
                  <CheckBox id="chk-optiton-4" title="패키지3" name="패키지3" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-5" title="패키지4" name="패키지4" />
                  <CheckBox id="chk-optiton-6" title="패키지5" name="패키지5" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-7" title="패키지6" name="패키지6" />
                  <CheckBox id="chk-optiton-8" title="패키지7" name="패키지7" />
                </li>
              </ul>
              <Button className="fixed" size="full" background="blue80" title="확인" />
            </div>
          </MobBottomArea>

          {/* step09 : 주행거리 */}
          <MobBottomArea active={applyDistance} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="distance" className="hide">
                  주행거리
                </label>
                <Input placeHolder="예:13,000" type="number" id="distance" uiType={2} width={160} height={32} onChange={handleDistance} value={isDistance !== '' && isDistance} />
                <em className="input-tx">km 입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleDistanceApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step10 : 판금교환 여부 */}
          <MobBottomArea active={applyMetalExchange} isSimple={true} mode="fade">
            <div className="chat">
              <Textarea type="tp1" placeHolder="여기에 차량의 판금/교환 부위를 자세히 입력해주세요. (예: 본넷 교환, 앞휀다 판금 등)" height={calcH1} mode="chat" onChange={handleTextareaChange1} />
              <Buttons>
                <span className="step-btn-l">
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="없습니다" width={61} height={30} onClick={handleMetalExchangeApply('metalexchangeno')} />
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="잘 몰라요" width={61} height={30} onClick={handleMetalExchangeApply('metalexchangedontknow')} />
                </span>
                <span className="step-btn-r">
                  <Button
                    size="sml"
                    background={textareaValue1.trim() !== '' ? 'blue80' : 'gray60'}
                    radius={true}
                    title="입력"
                    width={88}
                    height={30}
                    onClick={handleMetalExchangePartApply(textareaValue1)}
                  />
                </span>
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step11 : 특이사항 */}
          <MobBottomArea active={applySpecial} isSimple={true} mode="fade">
            <div className="chat">
              <Textarea type="tp1" placeHolder="여기에 차량의 사고 이력, 스크래치, 타이어 상태, 기타 장점을 입력해주세요." height={calcH2} mode="chat" onChange={handleTextareaChange2} />
              <Buttons>
                <span className="step-btn-l">
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="특이사항 없습니다" width={105} height={30} onClick={handleSpecialApply(false)} />
                </span>
                <span className="step-btn-r">
                  <Button size="sml" background={textareaValue2.trim() !== '' ? 'blue80' : 'gray60'} radius={true} title="입력" width={88} height={30} onClick={handleSpecialApply(true)} />
                </span>
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step12 : 방문지역 선택 */}
          <MobBottomArea active={applyLocal} isSimple={true} mode="fade" className={moreActive ? '' : 'half'} isFixButton={true}>
            <MobSelectLocal
              active={moreActive}
              dataContext={locationList}
              selectedValue={selectedCity ? selectedCity.value : -1}
              onMore={handleLocalMore}
              onChange={onHandleChangedCity}
              onClick={handleLocalApply}
              onMenuClick={onHandleChangedLocationList}
            />
          </MobBottomArea>

          {/* step13 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms onTermsClick={handleFullpagePopup('terms')} onClick={handleTermsApply} termsData={termCheck} onChange={handleTermChange} btnName="동의" />
          </MobBottomArea>

          {/* step14 : 차량사진등록 */}
          <MobBottomArea active={applyCarRegistration} isSimple={true} mode="fade">
            <div className="inner bottom-write-area app-down-wrap">
              {appCheck && (
                <div className="float-wrap">
                  <div className="app-down fr">
                    <i className="ico-app" />
                    <Button color="blue80" title="오토벨앱 다운로드" href={appDownloadUrl} />
                  </div>
                </div>
              )}
              {/* <Button size="full" background="blue80" radius={true} title="차량 사진 등록" height={48} marginTop={27} onClick={tempSaveBeforPicture} /> */}
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 사진 등록"
                iconType="next-black"
                height={48}
                marginTop={20}
                onClick={tempSaveBeforPicture}
              />
            </div>
          </MobBottomArea>

          {/* step15 : 신청팝업 */}
          <MobBottomArea active={applyConfirm} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <p className="tit1">
                입력하신 내용으로
                <br />
                비교견적 판매를 신청하시겠습니까?
              </p>
            </div>
            <Button size="full" background="blue80" radius={true} title="신청" onClick={handleFinalApply} />
          </MobBottomArea>
        </div>

        {/* 비회원 인증 풀페이지 -> bottom UP */}
        <div className={dimm2 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm2}></div>
        <MobBottomArea active={active2} className="v-fp" isSimple={true} zid={101} subPop={true}>
          <div className="content-wrap">
            <div className="login-wrap">
              <CertificationMod show={fpNomemberCert} callback={handleFpNomemberCertClose} />
            </div>
          </div>
        </MobBottomArea>

        {/* 풀페이지 팝업 모음 */}
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpPB}>
          {fpCarSearch && (
            <PricingTsConfirm
              hasMobile={true}
              designMode={'selfStep'}
              crNo={crNo}
              ownerName={ownerName}
              onNameChanged={handleOwnerNameChange}
              onCrNoChanged={handleCarNoChanged}
              onCertComplete={handleSearchCarNo}
              onCancel={onTsCancel}
            />
          )}
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: termList }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin mode="popup" errorPw={false} noMemArea={false} url="/sell/selfStep01" callback={handleFpLoginClose} />
              </div>
            </div>
          )}
          {/* {applyAutobellMember && ( //해당 단계에서만 비회원 인증 마운트
            <div className="content-wrap">
              <div className="login-wrap">
                <CertificationMod show={fpNomemberCert} callback={handleFpNomemberCertClose} />
              </div>
            </div>
          )} */}
          {fpFilter && <MobFilterModel callback={filterCallback} onCarModelSelect={handleCarModelSelect} />}
          {fpRegist && (
            <form ref={formRef}>
              <MobSellRegister
                photoList={photoList}
                mode={'sellcar'}
                onPrev={fpRegistClose}
                callback={applyPictureRegist}
                mainSlotOptions={mainPhotoList}
                subSlotOptions={subPhotoList}
                carObj={car}
                userType={0}
                // shottingComplete={handleReloadReqInfo}
                shottingComplete={() => {}} // 콤포넌트 안에서 처리
                reloadProcess={'self'}
              />
            </form>
          )}
        </MobFullpagePopup>

        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={true} />
          </div>
        )}

        <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isButton={false} subPop={false} closeMaskOnClick={true}>
          <div className="con-wrap">
            <p className="tit1">정말 나가시겠습니까?</p>
            {isSaveAble && <p>작성한 내용은 임시저장 됩니다.</p>}
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
              <Button fontSize={14} title="나가기" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleSaveButton} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }

  return <AppLayout>모바일 전용 페이지입니다.</AppLayout>;
};

SelfStep01.getInitialProps = async (http) => {
  const { reduxStore } = http;
  const helper = new RenderHelper(http);
  const { query } = helper;
  await reduxStore.dispatch(getShootingPartList('seller')); // 사진 리스트

  return { query };
};

SelfStep01.propTypes = {
  query: PropTypes.object
};

export default withRouter(SelfStep01);
