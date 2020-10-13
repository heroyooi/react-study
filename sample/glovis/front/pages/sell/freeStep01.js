/**
 * 설명 : 내차팔기 무평가판매 등록 모바일 화면
 * @fileoverview 내차팔기 무평가판매 등록 모바일 화면
 * @author 송재영
 */

import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';
import MobLogin from '@src/components/common/MobLogin';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobSellRegister from '@src/components/common/MobSellRegister';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';
import FindAddress from '@src/components/common/popup/FindAddress';
import { axiosPost } from '@src/utils/HttpUtils';
// import CheckColors from '@src/components/common/CheckColors';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCalendar from '@lib/share/items/MobCalendar';
import PricingTsConfirm from '@src/components/pricingSystem/pricingTsConfirm';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { numberFormat, transformText, objIsEmpty } from '@src/utils/CommonUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { insertReqAction, updateReqAction } from '@src/actions/sellcar/NonevalSellCarAction';
import { getSellCarTermData, getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, getShootingPartList, carHistoryAuthSucc } from '@src/actions/sellcar/sellCarAction';
import { selectSellcarTerms } from '@src/api/sellcar/AllSellcarSearchApi';
import { selectSellcar, selectSellcarReqCarUseCheck } from '@src/api/sellcar/AllSellcarSearchApi';
import { updateRequestComplete } from '@src/api/sellcar/NonevalSellcarApi';
import { getHpPn, uploadCarPhoto, validReqIdAndRgstIdCheck, deleteCarPhotos } from '@src/api/sellcar/CommonSellcarApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { isLogin, gInfoLive, UserType, isLoginLiveCheck, nonmemberlogin } from '@src/utils/LoginUtils';
import RenderHelper from '@lib/share/render/helper';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';
import { NONEVAL_STT, REQ_TPCD, REQ_TPCD_NM } from '@src/constant/mbSlReqStt';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';
// import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';
import { getCommonCodeList } from '@src/actions/homeservice/homeserviceAction';
import CertificationMod from '@src/components/common/CertificationMod';
import { validatePicture, carInfoNullCheck, carOptionNullCheck, checkRegistPeriodAllowed, photoCountCheck, getSellCarImgList } from '@src/components/sellcar/self/MobSellcarUtil';
import { preventScroll } from '@src/utils/CommonUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { console, setTimeout } from 'globalthis/implementation';
import produce from 'immer';

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
const MSG_07 = '차량설명 내역을 입력해주세요.';
const MSG_08 = '특이사항 내역이나 특이사항 여부를 선택 해주세요.';
const MSG_09A = '방문 지역을 선택해주세요.';
const MSG_09B = '계좌를 입력해주세요.';
const MSG_10 = '필수 이용 약관에 동의해주세요.';
const MSG_11 = '필수 사진을 등록해주세요.';

const FreeStep01 = ({ query }) => {
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
  const { seller, car, nonevalAgree1, nonevalAgree2, userInfo } = useSelector((store) => store.sellCarStore); // 조회되어 스토어에 등록되는 차량, 판매자 정보!!!
  const { photoList } = car;
  const crId = seller?.crId || seller?.car?.crId;
  const [originalCrId, setOriginalCrId] = useState('');
  const [slReqId, setSlReqId] = useState(!isEmpty(query?.slReqId) ? query?.slReqId : !isEmpty(seller.slReqId) ? seller.slReqId : '');
  // const mobBankCdList = useSelector((store) => store.commonCode.commonCodeList.FM053); // 은행 리스트
  const { bankCdList } = useSelector((state) => state.home);
  const [needAccountValidCheck, setNeedAccountValidCheck] = useState(true); // 은행 계좌 검증 전까지 확인 비활성
  const [mobBankCdList, setMobBankCdList] = useState([]);
  const { mainPhotoList, subPhotoList } = useSelector((state) => state.sellCarStore);
  const [terms, setTerms] = useState(''); // 방문평가 이용 약관
  const [privacyTerms, setPrivacyTerms] = useState(''); // 개인정보 처리방침 약관

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

  // FM053 은행코드중 '선택' 항목 제거
  useEffect(() => {
    setMobBankCdList(bankCdList?.filter((item) => item.label !== '선택') || []);
  }, [bankCdList]);

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
    if (!isLoginLiveCheck()) {
      showAlert(`임시저장에 실패했습니다.<br>세션종료. 로그인을 다시 해주세요.`);
      return;
    }
    const data = await save();
    // console.warn('TEMPSAVE >>>', data);
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
          title: '무평가 판매',
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
      Router.replace('/sellcar/nonValue/noneValuationGuide'); //PC용 화면
    }

    // 약관 조회
    selectSellcarTerms({ tmsTp: '0700', tmsDiv: '0710' })
      .then((res) => {
        console.log(res);
        const { data: _terms } = res.data;
        setTerms(_terms ? _terms : {});
      })
      .catch((err) => console.log(err));

    selectSellcarTerms({ tmsTp: '0800', tmsDiv: '0820', tmsSbj: '0010' })
      .then((res) => {
        const { data: _terms } = res.data;
        setPrivacyTerms(_terms ? _terms : {});
      })
      .catch((err) => console.error(err));
  }, []);

  // 임시 - 확인용
  useEffect(() => {
    console.warn('QUERY >>>', query);
    console.warn('STORE seller >>>', seller);
    console.warn('STORE car >>>', car);
  }, [seller, car]);

  // 추가수정
  // const [formData, setFormData] = useState(seller);
  // useEffect(() => {
  //   setFormData(
  //     produce((draft) => {
  //       draft.bizYn = 'Y';
  //       draft.bizTpcd = '1002';
  //       draft.bizTpCdNm = '면세사업자';
  //     })
  //   );
  // }, [formData]);

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
    if (accountName === '' && !isEmpty(seller.nmbNm)) {
      setAccountName(seller.nmbNm);
    }
  }, [seller]);

  const [needProcessStopped, setNeedProcessStopped] = useState(false);
  // 동일 번호로 등록 신청서 있는지 체크
  const UPDATE_AVAIL = [NONEVAL_STT.PUBLIC_TEMP, NONEVAL_STT.PUBLIC_FORM_COMPLETE];
  const NO_EXIST_APP = 'noExist';
  const EXIST_APP = 'exist';
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
            if (REQ_TPCD.NONEVAL === reqTpcd) {
              //분기 >> 접수건이 무평가 판매인경우
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
                showAlert('<p>해당 차량은 진행 중인 신청정보가 있습니다.</p>', () => {
                  setIsLoading(true);
                  Router.replace(`${_myPageUrl}?slReqId=${slReqId}`);
                });
                setNeedProcessStopped(true);
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
  }, []);

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
      const _slReqId = query?.slReqId || seller.slReqId;
      if (_slReqId !== undefined) {
        validReqIdAndRgstIdCheck({ rgstId: gInfoLive().id, slReqId: _slReqId, reqTpcd: REQ_TPCD.NONEVAL }).then((res) => {
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

  // 최초 진입시 채팅 UI 제어
  useEffect(() => {
    if (pageMode === INSERT) {
      timeouts.current[0] = setTimeout(() => {
        setQGreet(true);
        timeouts.current[1] = setTimeout(() => {
          setQIntro(true);
          timeouts.current[2] = setTimeout(() => {
            ///////////////////////////////////////////////////////////////////////////////////////////////////////    임시
            setQOwner(true); //인증부터 시작
            setApplyOwner(true);

            // setQRemark(true);
            // setApplyRemark(true);

            // setQAccount(true);
            // setApplyAccount(true);

            // setQTerms(true);
            // setApplyTerms(true);

            // dispatch({
            //   type: sellCarTypes.INIT_CAR_STATE,
            //   payload: {}
            // });
            // // setQAutobellMember(true); //로그인부터 시작
            // if (!isLoginLiveCheck()) {
            //   setApplyAutobellMember(true);
            // } else {
            //   setApplyCarRegistration(true); //촬영 시작
            // }

            // setApplyConsign(true);
            // setApplyConsign(true);

            // setApplyAccount(true);
            // setQAccount(true);

            // setQAutobellMember(true); //로그인부터 시작
            // setApplyAutobellMember(true);

            // setQSellCarConfirm(true);  // 차량선택부터 시작
            // setApplySellCarConfirm(true);

            ///////////////////////////////////////////////////////////////////////////////////////////////////////   임시
          }, duration);
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
    setQIntro(true);

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

    //setQCarOptions(true); // [5] 차량의 옵션정보를 확인해주세요.
    //setIsCarOptions(true); //차량 옵션정보 확인 했습니다.
    //carOptionNullCheck()
    //isCarOptionsEmpty
    setQDistance(true); // [6] 주행거리(Km)는 얼마인가요?
    if (!objIsEmpty(car.drvDist)) {
      setIsDistance(car.drvDist); //5000 km 입니다.
    } else {
      setIsDistanceEmpty(true);
      continueAnswerArr.push(6);
      return false;
    }

    setQCarComment(true); // [7] 차량 설명을 부탁 드려요.-> 특이사항으로 변경
    if (!objIsEmpty(car.crCmnt)) {
      setIsCarComment(car.crCmnt); // 없습니다. 잘몰라요. 그동안 잔고장없이 잘 썼습니다.
    } else {
      setIsCarCommentEmpty(true);
      continueAnswerArr.push(7);
      return false;
    }

    // setQRemark(true); //[7] 차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요. ==> remark
    // if (car.remark !== null && car.remark !== ' ') {
    //   setIsRemark(car.remark);
    // } else if (car.remark === ' ') {
    //   setIsRemark(false);
    // } else {
    //   setIsRemarkEmpty(true);
    //   continueAnswerArr.push(7);
    // }

    setQConsign(true); // [8] 방문지역을 선택해주세요.
    if (!objIsEmpty(seller.zcd) && !objIsEmpty(seller.addr) && !objIsEmpty(seller.dtlAddr)) {
      setIsLocal(`${seller.zcd} ${seller.addr} ${seller.dtlAddr || ''}`);
    } else {
      setIsLocalEmpty(true);
      continueAnswerArr.push(8);
      return false;
    }

    setQAccount(true); // [9] 계좌를 입력해주세요.
    if (!objIsEmpty(seller.accountNm) && !objIsEmpty(seller.accountNo) && !objIsEmpty(seller.bankCd)) {
      const _bank = mobBankCdList.find((x) => x.cdId == seller.bankCd);
      setIsAccount(`${_bank?.cdNm || ''} ${seller.accountNo}`); //TODO 은행 코드 -> 이름
      setQTerms(true);
      setIsTerms(true);
    } else {
      setIsAccountEmpty(true);
      continueAnswerArr.push(9);
      return false;
    }

    setQIndividual(true); // [10] 개인사업자 유무 및 타입을 입력해주세요.
    if (!objIsEmpty(seller.bizYn)) {
      if (seller.bizYn === 'N') {
        setIsIndividual(`${seller.bizYn}`);
        setBizTypeCode('');
        setBizTypeCdNm('');
      } else {
        setIsIndividual(`${seller.bizYn}`);
        setBizTypeCode(`${seller.bizTpcd}`);
        setBizTypeCdNm(`${seller.bizTpcdNm}`);
      }
      setBizTypeCode(`${seller.bizTpcd}`);
      setBizTypeCdNm(`${seller.bizTpcdNm}`);
    } else {
      setIsIndividual('');
      continueAnswerArr.push(10);
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

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    if (e !== undefined) e.preventDefault();
    setMpop(false);
  }, []);

  // 질문
  const [qGreet, setQGreet] = useState(false); // 안녕하세요 오토벨입니다.~
  const [qIntro, setQIntro] = useState(false); // 차량 출시 기준 33개월 이하~
  const [qOwner, setQOwner] = useState(false); // 차량 조회를 위해 소유자 정보를 확인~
  const [qVisitApply, setQVisitApply] = useState(false);
  const [qAutobellMember, setQAutobellMember] = useState(false);
  const [qSellCarConfirm, setQSellCarConfirm] = useState(false);
  const [qCarSearch, setQCarSearch] = useState(false);
  const [qCarBasicInfo, setQCarBasicInfo] = useState(false);
  const [qCarOptions, setQCarOptions] = useState(false);
  const [qDistance, setQDistance] = useState(false);
  const [qCarComment, setQCarComment] = useState(false);
  const [qRemark, setQRemark] = useState(false);
  const [qConsign, setQConsign] = useState(false);
  const [qAccount, setQAccount] = useState(false);
  const [qIndividual, setQIndividual] = useState(false); /* 추가수정 */

  const [qTerms, setQTerms] = useState(false);
  const [qCarRegist, setQCarRegist] = useState(false);

  // 더보기, change되는 값
  const [isAccountNum, setIsAccountNum] = useState(0);
  const [accountValue, setAccountValue] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bizTypeCode, setBizTypeCode] = useState(''); // 1001:일반사업자, 1002:면세사업자, 1003:간이사업자
  const [bizTypeCdNm, setBizTypeCdNm] = useState('');

  // 결과 값
  const [isOwner, setIsOwner] = useState(false);
  const [isMemberType, setIsMemberType] = useState(null);
  const [isSellCar, setIsSellCar] = useState(null);
  const [isSellCarSearch, setIsSellCarSearch] = useState(null);
  const [isCarBasicInfo, setIsCarBasicInfo] = useState(false);
  const [isCarOptions, setIsCarOptions] = useState(false);
  const [isDistance, setIsDistance] = useState('');
  const [isCarComment, setIsCarComment] = useState('');
  const [isRemark, setIsRemark] = useState('');
  const [isAccount, setIsAccount] = useState('');
  const [isLocal, setIsLocal] = useState(null);
  const [isTerms, setIsTerms] = useState(false);
  const [isCarRegist, setIsCarRegist] = useState(false);
  const [isIndividual, setIsIndividual] = useState(''); /* 추가수정 */

  //const [notIndividual, setNotIndividual] = useState(false); /* 추가수정 */

  // 미응답 UI 구현용
  const [isCarBasicInfoEmpty, setIsCarBasicInfoEmpty] = useState(false);
  const [isCarOptionsEmpty, setIsCarOptionsEmpty] = useState(false);
  const [isDistanceEmpty, setIsDistanceEmpty] = useState(false);
  const [isCarCommentEmpty, setIsCarCommentEmpty] = useState(false);
  const [isRemarkEmpty, setIsRemarkEmpty] = useState(false);
  const [isLocalEmpty, setIsLocalEmpty] = useState(false);
  const [isAccountEmpty, setIsAccountEmpty] = useState(false);

  // 팝업
  const [applyOwner, setApplyOwner] = useState(false);
  const [applyCarInfo, setApplyCarInfo] = useState(false);
  const [applyVisitConfirm, setApplyVisitConfirm] = useState(false);
  const [applyAutobellMember, setApplyAutobellMember] = useState(false);
  const [applySellCarConfirm, setApplySellCarConfirm] = useState(false);
  const [applyCarSearch, setApplyCarSearch] = useState(false);
  const [applyCarBasicInfo, setApplyCarBasicInfo] = useState(false);
  const [applyCarBasicInfoInner, setApplyCarBasicInfoInner] = useState(false);
  const [applyCarOptions, setApplyCarOptions] = useState(false);
  const [applyCarOptionsInner, setApplyCarOptionsInner] = useState(false);
  const [applyDistance, setApplyDistance] = useState(false);
  const [applyCarComment, setApplyCarComment] = useState(false);
  const [applyRemark, setApplyRemark] = useState(false);
  const [applyConsign, setApplyConsign] = useState(false);
  const [applyAccount, setApplyAccount] = useState(false);
  const [applyIndividual, setApplyIndividual] = useState(false); // 추가수정
  const [applyBusiness, setApplyBusiness] = useState(false); // 추가수정
  const [applyTerms, setApplyTerms] = useState(false);
  const [applyCarRegistration, setApplyCarRegistration] = useState(false);
  const [applyConfirm, setApplyConfirm] = useState(false);

  // 풀페이지 팝업
  const [fpCarSearch, setFpCarSearch] = useState(false);
  const [fpTerms1, setFpTerms1] = useState(false);
  const [fpTerms2, setFpTerms2] = useState(false);
  const [fpLogin, setFpLogin] = useState(false);
  const [fpFilter, setFpFilter] = useState(false);
  const [fpAddress, setFpAddress] = useState(false);
  const [fpRegist, setFpRegist] = useState(false);
  const [fpNomemberCert, setFpNomemberCert] = useState(false);
  //const [termCont, setTermCont] = useState('');
  //const termList = useSelector((state) => state.sellCarStore.sellCarTermList);
  //const [termData, setTermData] = useState([]);
  const [termCheck, setTermCheck] = useState([
    { id: 'chk1', title: '무평가 이용약관 (필수)', checked: nonevalAgree1 },
    { id: 'chk2', title: '개인정보처리방침 (필수)', checked: nonevalAgree2 }
  ]);

  // 인풋, 텍스트에리어 값 컨트롤
  const [distanceValue, setDistanceValue] = useState('');
  const [textareaValue1, setTextareaValue1] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');

  const [calcH1, setCalcH1] = useState(80);
  const [calcH2, setCalcH2] = useState(80);

  const [accountBank, setAccountBank] = useState('은행명');
  const [isChangeBank, setIsChangeBank] = useState(false);

  // 작성된 정보가 있을시 다음 step으로 넘어가는것 방지
  const [nextEdit, setNextEdit] = useState(false);

  // 은행명 선택
  const handleBankValue = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setIsAccountNum(value);
    setAccountBank(e.currentTarget.dataset.label);
    setNeedAccountValidCheck(true);
  };
  const handleSelectBank = (e) => {
    e.preventDefault();
    setIsChangeBank((prevChange) => !prevChange);
  };

  // 계좌 번호
  const handleAccountValue = useCallback((e) => {
    setAccountValue(e.target.value);
    setNeedAccountValidCheck(true);
  }, []);

  // 은행 검증 contractorinfo 홈서비스 기능
  const handleAccountValid = (e) => {
    e.preventDefault();
    if (isAccountNum === 0 || isAccountNum === undefined) return showAlert('은행을 선택해주세요.', 'error');
    if (accountValue === '' || accountValue === undefined) return showAlert('계좌번호를 입력해주세요.', 'error');
    if (accountName === '' || accountName === undefined) return showAlert('예금주명을 입력해주세요.', 'error');
    const accountChkData = {
      banksett: isAccountNum,
      noacct: accountValue,
      nmcomp: accountName,
      rltURL: `${process.env.HOSTURL}/api/admin/homeservice/receiveUrlConnection.do`
    };
    setIsLoading(true);
    axiosPost('/api/admin/homeservice/callUrlConnection.do', accountChkData).then(({ data }) => {
      if (data?.statusinfo?.returncd !== undefined && data?.statusinfo?.returncd === 'SYS9999') {
        showAlert('서버와 접속이 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.');
        setNeedAccountValidCheck(true);
      } else if (data.statusinfo?.returncd === '000') {
        showAlert('인증 되었습니다.');
        setNeedAccountValidCheck(false);
      } else if (data.statusinfo?.returncd === '103') {
        setNeedAccountValidCheck(true);
        showAlert('계좌번호 또는 예금주명이 불일치 합니다.', 'error');
      } else {
        setNeedAccountValidCheck(true);
        showAlert(`${data.statusinfo?.returnmsg}`, 'error');
      }
      setIsLoading(false);
    });
    // }
  };

  // 주행거리 응답 출력
  const handleDistance = useCallback(
    (e) => {
      setDistanceValue(e.target.value);
    },
    [distanceValue]
  );
  // 차량설명 : textareaValue1
  const handleTextareaChange1 = useCallback(
    (e) => {
      const targetH = e.target.scrollHeight;
      setCalcH1(targetH <= 60 ? targetH + 40 : 100);
      setTextareaValue1(e.target.value);
    },
    [textareaValue1]
  );
  // 특이사항 응답 출력 : textareaValue2
  const handleTextareaChange2 = useCallback(
    (e) => {
      const targetH = e.target.scrollHeight;
      setCalcH2(targetH <= 60 ? targetH + 40 : 100);
      setTextareaValue2(e.target.value);
    },
    [textareaValue2]
  );
  // 판금/교환 부위 출력
  const createCarComment = (cond) => {
    if (cond === 'carcommentno') {
      return <p>없습니다.</p>;
    } else if (cond === 'carcommentdontknow') {
      return <p>잘 몰라요.</p>;
    }
    return <p>{transformText(cond)}</p>;
  };

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
    if (applyCarComment) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 126,
          color: '#f6f7f8'
        }
      });
    }
    if (applyRemark) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 126,
          color: '#f6f7f8'
        }
      });
    }
    if (applyConsign) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyAccount) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 282,
          color: '#f6f7f8'
        }
      });
    }
    if (applyTerms) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 260,
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
    if (applyIndividual) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    setTimeout(() => {
      document.querySelector('#wrap').scrollTo(0, document.querySelector('.chat-list-wrap').clientHeight);
    }, 10);
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
    applyCarComment,
    applyRemark,
    applyConsign,
    applyAccount,
    applyTerms,
    applyCarRegistration,
    applyConfirm,
    applyOwner,
    applyIndividual,
    applyBusiness,
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

    // 무평가 판매 대상차량 체크 로직 -> checkAvailForSale
    // if (instUpdtMode === INSERT && checkAvailForSale(car)) {
    if (instUpdtMode === INSERT && true) {
      // timeouts.current[3] = setTimeout(() => {
      //   setQVisitApply(true);
      //   setApplyVisitConfirm(true);
      // }, duration);
      // return;
      // showAlert('TODO 무평가 대상 체크 로직'); //TODO 보험개발원 주행거리 3만키로 체크 가능하면 로직 추가 필요
    }

    if (loginAskNeed) {
      timeouts.current[3] = setTimeout(() => {
        setQAutobellMember(true);
        setApplyAutobellMember(true);
      }, duration);
    } else {
      timeouts.current[4] = setTimeout(() => {
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
      timeouts.current[4] = setTimeout(() => {
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
        timeouts.current[5] = setTimeout(() => {
          setQCarBasicInfo(true);
          setApplyCarBasicInfo(true);
        }, duration);
      } else {
        setQCarSearch(true);
        timeouts.current[5] = setTimeout(() => {
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

  // 임시저장 상태거나 신청 도중 앞부분 정보를 수정하고 나면 사용할 수정 핸들러
  // 수정된 답변들은 건너뛰고 수정안된부분으로 바로 이동하게 함
  const editHandler = (edtMenu, value) => {
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

    if (isCarComment !== '') {
      setQCarComment(true); // [7] 차량 설명을 부탁 드려요.-> 특이사항으로 변경
      setIsCarComment(isCarComment);
      setIsCarCommentEmpty(false);
      setApplyCarComment(false);
    } else {
      if (edtMenu === 'cmnt') {
        setIsCarComment(edtMenu === 'cmnt' ? value : isCarComment); // 없습니다. 잘몰라요. 그동안 잔고장없이 잘 썼습니다.
      } else {
        timeouts.current[7] = setTimeout(() => {
          setIsCarCommentEmpty(true);
          setApplyCarComment(true);
        }, duration);
        // continueAnswerArr.push(7);
        return false;
      }
    }

    if (isCarComment !== '') {
      setIsCarComment(edtMenu === 'cmnt' ? value : isCarComment); // 없습니다. 잘몰라요. 그동안 잔고장없이 잘 썼습니다.
    }

    if (isLocal !== null) {
      setQConsign(true); // [9] 방문지역을 선택해주세요.
      setIsLocal(isLocal);
      setApplyConsign(false);
      setIsLocalEmpty(false);
    } else {
      if (edtMenu === 'local') {
        setNextEdit(true);
        setIsLocal(edtMenu === 'local' ? value : isLocal);
      } else {
        timeouts.current[9] = setTimeout(() => {
          setIsLocalEmpty(true);
          setApplyConsign(true);
        }, duration);
        return false;
      }
    }

    if (edtMenu === 'local') {
      setNextEdit(true);
      setIsLocal(edtMenu === 'local' ? value : isLocal);
    }

    if (isAccount !== '') {
      setQAccount(true); // [9] 계좌를 입력해주세요.
      setIsAccount(isAccount);
      setApplyAccount(false);
      setIsAccountEmpty(false);
    } else {
      if (edtMenu === 'account') {
        setIsAccount(edtMenu === 'account' ? value : isAccount);
      } else {
        timeouts.current[11] = setTimeout(() => {
          setIsAccountEmpty(true);
          setApplyAccount(true);
        }, duration);
        // continueAnswerArr.push(9);
        return false;
      }
    }

    if (edtMenu === 'account') {
      setIsAccount(edtMenu === 'account' ? value : isAccount);
    }

    if (isIndividual !== '') {
      setQIndividual(true); // [10] 개인사업자 유무 및 타입을 입력해주세요.
      if (isIndividual === 'N') {
        setIsIndividual(isIndividual);
        setBizTypeCode('');
        setBizTypeCdNm('');
      } else {
        setIsIndividual(isIndividual);
        setBizTypeCode(bizTypeCode);
        setBizTypeCdNm(bizTypeCdNm);
      }
      setApplyIndividual(false);
    } else {
      if (edtMenu === 'individual') {
        if (value === 'N') {
          setIsIndividual('N');
          setBizTypeCode('');
          setBizTypeCdNm('');
        } else {
          setIsIndividual('Y');
          setBizTypeCode(edtMenu === 'individual' ? value[1] : bizTypeCode);
          setBizTypeCdNm(edtMenu === 'individual' ? value[0] : bizTypeCdNm);
        }
      } else {
        timeouts.current[12] = setTimeout(() => {
          setIsIndividual('');
          setApplyIndividual(true);
        }, duration);
        // continueAnswerArr.push(10);
        return false;
      }
    }

    if (edtMenu === 'individual') {
      if (value === 'N') {
        setIsIndividual(value);
        setBizTypeCode('');
        setBizTypeCdNm('');
      } else {
        setIsIndividual('Y');
        setBizTypeCode(edtMenu === 'individual' ? value[1] : bizTypeCode);
        setBizTypeCdNm(edtMenu === 'individual' ? value[0] : bizTypeCdNm);
      }
    }

    if (isTerms !== false) {
      setQTerms(true);
      setIsTerms(true);
      setApplyTerms(false);
    } else {
      if (edtMenu === 'terms') {
        setIsTerms(value);
      } else {
        timeouts.current[13] = setTimeout(() => {
          setApplyTerms(true);
        }, duration);
        return false;
      }
    }

    setQCarRegist(true);
    setApplyCarRegistration(true);

    // 우선 순위 미응답 질문 부터 질의 재시작
    if (continueAnswerArr.length > 0) {
      setNextEdit(true);
      continueAnswerArr.sort();
      handleQuestionShow(continueAnswerArr);
    } else {
      handleQuestionShow(0);
    }
  };

  // [4] 차량 기본 정보 선택시
  const handleCarBasicInfoApply = useCallback(
    (e) => {
      e.preventDefault();
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setIsCarBasicInfo(true);
      // setIsCarBasicInfoEmpty(false);
      editHandler();
      if (isDistance !== '') return false;
      timeouts.current[6] = setTimeout(() => {
        // setQCarOptions(true);
        // setApplyCarOptions(true);
        setQDistance(true);
        setApplyDistance(true);
      }, duration);
    },
    [isCarBasicInfo, isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [5] 차량 옵션 정보 선택시
  const handleCarOptionsApply = useCallback((e) => {
    e.preventDefault();
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setIsCarOptions(true);
    // setIsCarOptionsEmpty(false);
    timeouts.current[7] = setTimeout(() => {
      setQDistance(true);
      setApplyDistance(true);
    }, duration);
  }, []);

  const handleApplyCarOptionsInner = useCallback((e) => {
    e.preventDefault();
    setApplyCarOptionsInner(true);
  }, []);

  // [6] 차량 주행거리 선택시
  const handleDistanceApply = useCallback(
    (e) => {
      if (e !== undefined) e.preventDefault();
      // TODO 카마트 정보와 주행거리 비교
      if (distanceValue > 30000) {
        showConfirm(
          '<p>주행거리 3만km 이상은 무평가 판매 대상이 아닙니다. <br/> 방문 판매로 신청 하시겠습니까?</p>',
          (e) => {
            if (e !== undefined) e.preventDefault();
            Router.replace('/sell/visitApply');
          },
          (e) => {
            if (e !== undefined) e.preventDefault();
            Router.replace('/sellcar/sellCar');
          }
        );
        return;
      }
      if (objIsEmpty(distanceValue) || distanceValue.length > 6) {
        showAlert(MSG_06);
        return;
      }
      setIsDistance(parseInt(distanceValue, 10));
      setApplyDistance(false);
      handleDrvDist(distanceValue);
      setIsDistanceEmpty(false);
      editHandler('dist', distanceValue);
      if (!objIsEmpty(car.crCmnt)) return false;
      timeouts.current[8] = setTimeout(() => {
        setQCarComment(true);
        setApplyCarComment(true);
      }, duration);
    },
    [distanceValue, isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [7-1] 판금/교환 아니오, 몰라요 입력시
  // const handleCarCommentApply = useCallback(
  //   (cond) => (e) => {
  //     e.preventDefault();
  //     setIsCarComment(cond);
  //     setApplyCarComment(false);
  //     handleSpExchYn(cond === 'carcommentno' ? '0020' : '0030');
  //     handleSpExchCntn('');
  //     setIsCarCommentEmpty(false);
  //     timeouts.current[9] = setTimeout(() => {
  //       setQRemark(true);
  //       setApplyRemark(true);
  //     }, duration);
  //   },
  //   []
  // );

  // [7-2] 차량설명 입력시 -> 차량 특이사항으로 수정
  const handleCarCommentApply = useCallback(
    (text) => (e) => {
      e.preventDefault();
      if (!objIsEmpty(text)) {
        handleCrCmnt(text);
        setIsCarComment(text);
      } else {
        handleCrCmnt(' ');
        setIsCarComment(false);
      }

      setApplyCarComment(false);
      setIsCarCommentEmpty('');
      editHandler('cmnt', textareaValue1);
      // timeouts.current[9] = setTimeout(() => {
      //   setQRemark(true);
      //   setApplyRemark(true);
      // }, duration);
      if (objIsEmpty(isLocal)) {
        timeouts.current[9] = setTimeout(() => {
          setQConsign(true);
          setApplyConsign(true);
        }, duration);
      }
    },
    [textareaValue1, isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [8] 특이사항 입력시
  // const handleRemarkApply = useCallback(
  //   (cond) => (e) => {
  //     e.preventDefault();
  //     if (cond && !objIsEmpty(textareaValue2)) {
  //       handleRemark(textareaValue2);
  //       setIsRemark(textareaValue2);
  //     } else {
  //       handleRemark('특이사항 없음'); // 빈값처리를 이렇게??
  //       setIsRemark(false);
  //     }
  //     setApplyRemark(false);
  //     setIsRemarkEmpty('');
  //     if (objIsEmpty(isLocal)) {
  //       timeouts.current[10] = setTimeout(() => {
  //         setQConsign(true);
  //         setApplyConsign(true);
  //       }, duration);
  //     } else {
  //       timeouts.current[11] = setTimeout(() => {
  //         setQAccount(true);
  //         setApplyAccount(true);
  //         // setQTerms(true);
  //         // setApplyTerms(true);
  //       }, 0);
  //     }
  //   },
  //   [textareaValue2]
  // );

  // [9a] 방문 지역 선택시
  const handleConsignApply = useCallback(
    (result) => (e) => {
      if (e !== undefined) e.preventDefault();
      setApplyConsign(false);
      handleZcd(result.postCode);
      handleAddr(result.addData);
      handleDtlAddr(result.detailText);
      setIsLocal(`${result.postCode} ${result.addData} ${result.detailText || ''}`);
      setIsLocalEmpty(false);
      editHandler('local', `${result.postCode} ${result.addData} ${result.detailText || ''}`);
      if (isAccount !== '') return false;
      timeouts.current[11] = setTimeout(() => {
        setQAccount(true);
        setApplyAccount(true);
      }, duration);
    },
    [isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [9b] 은행 계좌 선택시
  const handleAccountApply = useCallback(
    (e) => {
      e.preventDefault();
      if (needAccountValidCheck) {
        alert('먼저 계좌인증을 진행해주세요.');
        return false;
      }
      setApplyAccount(false);
      setIsAccount(`${accountBank} ${accountValue}`);
      setIsAccountEmpty(false);

      handleAccountNm(accountName);
      handleAccountNo(accountValue);
      handleBankCd(isAccountNum);
      editHandler('account', `${accountBank} ${accountValue}`);
      if (accountValue !== '' && isIndividual === '') {
        timeouts.current[12] = setTimeout(() => {
          // setQTerms(true);
          // setApplyTerms(true);
          setQIndividual(true);
          setApplyIndividual(true);
        }, duration);
      }
    },
    [isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // 추가수정 - 개인사업자 유무 선택
  const handleIndividual = useCallback(
    (cond) => (e) => {
      e.preventDefault();
      setApplyIndividual(false);
      if (cond) {
        // 개인사업자 있음 선택
        timeouts.current[13] = setTimeout(() => {
          setIsIndividual('Y');
          handleBizYn('Y');
          setApplyBusiness(true);
          setApplyIndividual(false);
        }, duration);
      } else {
        // 개인사업자 없음 선택
        setIsIndividual('N');
        handleBizYn('N');
        setBizTypeCode('');
        editHandler('individual', 'N');
        if (isTerms === true) return false;
        timeouts.current[13] = setTimeout(() => {
          setQTerms(true);
          setApplyTerms(true);
        }, duration);
      }
    },
    [isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );
  // 추가수정 - 사업자 종류(일반·면세·간이) 선택
  const handleIndividualApply = useCallback(
    (num) => (e) => {
      e.preventDefault();
      setApplyBusiness(false);
      if (num === 1) {
        setBizTypeCdNm('일반사업자');
        setBizTypeCode('1001');
        handleBizTpCd('1001');
        editHandler('individual', ['일반사업자', '1001']);
      } else if (num === 2) {
        setBizTypeCdNm('면세사업자');
        setBizTypeCode('1002');
        handleBizTpCd('1002');
        editHandler('individual', ['면세사업자', '1002']);
      } else if (num === 3) {
        setBizTypeCdNm('간이사업자');
        setBizTypeCode('1003');
        handleBizTpCd('1003');
        editHandler('individual', ['간이사업자', '1003']);
      }
      if (isTerms === true) return false;
      timeouts.current[13] = setTimeout(() => {
        setQTerms(true);
        setApplyTerms(true);
      }, duration);
    },
    [isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [10] 약관 선택시
  const handleTermsApply = useCallback(
    (e) => {
      e.preventDefault();
      if (termCheck[0].checked && termCheck[1].checked) {
        setIsTerms(true);
        setApplyTerms(false);
        editHandler('terms', true);
        timeouts.current[14] = setTimeout(() => {
          setQCarRegist(true);
          setApplyCarRegistration(true);
        });
      } else {
        showAlert(MSG_10);
      }
    },
    [isIndividual, isDistance, isCarComment, isAccount, isLocal, isTerms, bizTypeCode, bizTypeCdNm]
  );

  // [11] 촬영2

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
        // Router.replace('/sell/freeStep05');
        Router.push({
          pathname: '/sell/freeStep05',
          query: {
            name: seller.nmbNm,
            mobile: seller.hpPn,
            location: isLocal,
            bank: isAccount
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
    } else if (car.crCmnt === null && car.crCmnt !== ' ') {
      _errStep = 7; // [7] 차량설명
      // } else if (car.remark === null && car.remark !== ' ') {
      //   _errStep = 8; // [8] 차량에 관한 기타 설명
    } else if (objIsEmpty(seller.zcd) || objIsEmpty(seller.addr) || objIsEmpty(seller.dtlAddr)) {
      _errStep = 8; // [9] 방문지역 -> 8
    } else if (objIsEmpty(seller.accountNo) || objIsEmpty(seller.accountNm)) {
      _errStep = 9; // [9] 계좌
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
      case 7: // [7] 판금 및 교환 ==> (변경) 차량 설명 -> (변경) 특이사항
        setQCarComment(true); // [7] 판금 및 교환하신 부위가 있으신가요? ==> (변경) 차량 설명을 부탁 드려요
        //setApplyMetalExchange(true);
        handleCarCommentModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_07);
        break;
      // case 8: // [8] 차량에 관한 기타 설명
      //   setQRemark(true); //[8] 차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요.
      //   // setApplyRemark(true);
      //   handleRemarkModify();
      //   if (alert) showAlert(MSG_08);
      //   break;
      case 8: // [9] 방문지역 -> 8
        setQConsign(true); // [9] 방문지역을 선택해주세요.
        // setApplyConsign(true);
        handleConsignModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_09A);
        break;
      case 9: // [10] 계좌 -> 9
        setQAccount(true); // [10] 계좌 선택해주세요.
        // setApplyAccount(true);
        handleAccountModify();
        setNextEdit(false);
        if (alert) showAlert(MSG_09B);
        break;
      // case 11: // [11] 동의 - 패스
      //   setQTerms(true);
      //   setIsTerms(true);
      //   if (alert) showAlert(MSG_10);
      //   break;
      // case 12: // [12] 사진
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplySellCarConfirm(false);
    setApplyIndividual(false);
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyDistance(true);
  }, []);

  const handleCarCommentModify = useCallback(() => {
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
    setApplyRemark(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyCarComment(true);
  }, []);

  const handleRemarkModify = useCallback(() => {
    setApplyOwner(false);
    setApplyCarInfo(false);
    setApplyAutobellMember(false);
    setApplySellCarConfirm(false);
    setApplyCarSearch(false);
    setApplyCarBasicInfo(false);
    setApplyCarBasicInfoInner(false);
    setApplyCarOptions(false);
    setApplyCarOptionsInner(false);
    setApplyCarComment(false);
    setApplyDistance(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyRemark(true);
  }, []);

  const handleConsignModify = useCallback(() => {
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
    setApplyAccount(false);
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyConsign(true);
  }, []);

  const handleAccountModify = useCallback(() => {
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
    setApplyConsign(false);
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyTerms(false);
    setApplyCarRegistration(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyAccount(true);
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyCarRegistration(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyConfirm(false);
    setApplyIndividual(false);
    setApplyTerms(true);
  }, []);

  /*추가코드 사업자여부 */
  const handleIndividualModify = useCallback(() => {
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
    setApplyCarComment(false);
    setApplyRemark(false);
    setApplyCarRegistration(false);
    setApplyConsign(false);
    setApplyAccount(false);
    setApplyConfirm(false);
    setApplyTerms(false);
    setApplyIndividual(true);
    // 사업자여부 남기고 모두 false;
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
            title: '차량 소유자 정보 확인',
            options: ['close']
          }
        });
        setFpTerms1(false);
        setFpTerms2(false);
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpNomemberCert(false);
        setFpCarSearch(true);
        setFpPB(80);
      } else if (name === 'terms1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '무평가 이용약관',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpNomemberCert(false);
        setFpTerms2(false);
        setFpTerms1(true);
        setFpPB(80);
      } else if (name === 'terms2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '개인정보처리방침',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpNomemberCert(false);
        setFpTerms1(false);
        setFpTerms2(true);
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
        setFpTerms1(false);
        setFpTerms2(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpNomemberCert(false);
        setFpLogin(true);
        setFpPB(80);
      } else if (name === 'nonmember') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '로그인',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpTerms1(false);
        setFpTerms2(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpLogin(false);
        setFpNomemberCert(true);
        setFpPB(80);
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
        setFpTerms1(false);
        setFpTerms2(false);
        setFpRegist(false);
        setFpAddress(false);
        setFpLogin(false);
        setFpNomemberCert(false);
        setFpFilter(true);
        setFpPB(80);
      } else if (name === 'address') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '주소지 입력',
            options: ['close']
          }
        });
        setFpCarSearch(false);
        setFpTerms1(false);
        setFpTerms2(false);
        setFpRegist(false);
        setFpLogin(false);
        setFpNomemberCert(false);
        setFpFilter(false);
        setFpAddress(true);
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
        setFpTerms1(false);
        setFpTerms2(false);
        setFpFilter(false);
        setFpAddress(false);
        setFpNomemberCert(false);
        setFpRegist(true);
        setFpPB(0);
      }
    },
    []
  );

  const handleTermsPopup = useCallback((e, v) => {
    e.preventDefault();
    console.warn(v);
    if (v.id === 'chk1') {
      handleFullpagePopup('terms1')(e);
    } else if (v.id === 'chk2') {
      handleFullpagePopup('terms2')(e);
    }
  }, []);

  // 약관 체크
  const handleTermChange = () => {
    dispatch(
      inputStateAction({
        state: 'nonevalAgree1',
        value: termCheck[0].checked
      })
    );
    dispatch(
      inputStateAction({
        state: 'nonevalAgree2',
        value: termCheck[1].checked
      })
    );
  };

  // 인증 팝업
  const handleFpCarSearchClose = useCallback(() => {
    setFpCarSearch(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    setApplyCarInfo(true);
  }, [fpCarSearch]);

  const handleFpTermsClose = useCallback((e) => {
    e.preventDefault();
    setFpTerms1(false);
    setFpTerms2(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, []);

  // 로그인 팝업
  const handleFpLoginClose = useCallback(
    (e) => {
      if (e !== undefined) e.preventDefault();
      setFpLogin(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      handleMemberApply('member')(e);
      checkApplication();
    },
    [setFpLogin]
  );

  // 비회원 본인인증 처리후
  const handleFpNomemberCertClose = useCallback((e) => {
    setFpNomemberCert(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    if (e?.RETURN_CD === '0000') {
      const _userName = e.LGD_MOBILE_SUBAUTH_NAME;
      const _mobileNumber = e.LGD_MOBILENUM;
      dispatch(inputPropAction({ state: 'seller', prop: 'nmbNm', value: _userName }));
      dispatch(inputPropAction({ state: 'seller', prop: 'hpPn', value: setHpPnFormat(_mobileNumber) }));

      setIsApplyTempCert(true);
      handleMemberApply('nonmember')(e);
    } else {
      showAlert('본인 인증이 정상적으로 처리 되지 않았습니다.');
    }
  }, []);

  // 주소 선택
  const addressCallback = useCallback(
    (result) => {
      setFpAddress(false);
      handleConsignApply(result)();
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [isLocal]
  );

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
      console.log('newCar >>>>', newCar);
      //  setCarCond(newCarCond);
      setIsSellCar(false); // 차량명 xxx가 맞습니다 (카마트 정보)
      setQCarSearch(true); // 판매하려는 차량이 뭔가요? 검색용 질문
      setIsDate(moment(car.frstRegDt) || moment());
      setIsSaveAble(true); //차량 확정 이후 부터 임시 저장 가능 - PC 신청번호 발급가능 조건
      //setFpFilterModel(false);
      //  getCarBasicInfo(newCarCond?.modelInfo?.crMdlCd);
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
          const { statusinfo } = res;
          if (statusinfo?.returncd === '000') {
            return true;
          }
          return false;
        })
        .catch(() => {
          return false;
        });
    }
    return true;
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
        if (isLoading) setIsLoading(false);
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
  const [isDate, setIsDate] = useState(moment(car.frstRegDt));
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
    console.warn('인증 취소 로직');
  };

  const [isAvailChecked, setIsAvailChecked] = useState(false);
  const [searchCarName, setSearchCarName] = useState('');
  //  차량 데이터 가져오기
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
    if (!isEmpty(crNo) && !isAvailChecked) {
      // 무평가 판매 대상 차량 체크
      handleAvailCheckResult(checkAvailForSale(car));
    }
  }, [car]);

  // seller정보 -> 은행정보 가져오기 -> 은행명 셀렉트박스만 체크되있게 하기
  useEffect(() => {
    if (seller.bankCd && seller.accountNo && seller.accountNm) {
      setAccountBank(mobBankCdList?.filter((id) => id.cdId === seller.bankCd)[0].cdNm);
      setIsAccountNum(seller.bankCd);
      setAccountValue(seller.accountNo);
      setAccountName(seller.accountNm);
    }
  }, [seller]);

  // 이미 작성되어있는 정보를 수정하면 바뀐정보를 출력하도록 렌더링
  useEffect(() => {
    console.log('다시 렌더링 작업 진행');
    setIsDistance(isDistance);
    setIsCarComment(isCarComment);
    setIsLocal(isLocal);
    setIsAccount(isAccount);
  }, [isDistance, isCarComment, isLocal, isAccount]);

  // 무평가 판매 가능 체크
  const checkAvailForSale = (car) => {
    setIsAvailChecked(true);
    if (car.drvDist === undefined || car.drvDist === 0 || car.frstRegDt === undefined || isEmpty(car.frstRegDt)) {
      return undefined;
    }
    const now = moment();
    const frstRegDt = moment(car.frstRegDt, 'YYYY-MM-DD');
    const diff = now.diff(frstRegDt, 'months', true);
    if (car.drvDist > 30000 || diff > 33) {
      return false;
    }
    return true;
  };

  // 무평가 판매가능 체크 메세지
  const handleAvailCheckResult = (checkResult) => {
    if (checkResult === undefined) {
      showAlert('평가할 수 있는 정보가 없어서 신청이 불가능 합니다.', () => {
        Router.replace('/sell/freeHome');
      });
      setNeedProcessStopped(true);
    } else if (!checkResult) {
      showConfirm(
        '연식 또는 주행거리가 무평가 판매 조건(33개월 미만, 3만Km <br/>미만) 에 맞지 않습니다.<br/>방문평가 판매를 신청하시겠습니까?',
        () => {
          Router.replace('/sell/visitApply');
        },
        () => {
          Router.replace('/sell/freeHome');
        }
      );
      setNeedProcessStopped(true);
    }
  };

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

  // // 판금 교환 여부 업데이트
  // const handleSpExchYn = (value) => {
  //   dispatch(
  //     inputPropAction({
  //       state: 'car',
  //       prop: 'spExchYn',
  //       value
  //     })
  //   );
  // };

  // // 판금 교환 부위 업데이트
  // const handleSpExchCntn = (value) => {
  //   dispatch(
  //     inputPropAction({
  //       state: 'car',
  //       prop: 'spExchCntn',
  //       value
  //     })
  //   );
  // };

  // 차량설명 입력 업데이트 -> 특이사항
  const handleCrCmnt = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'crCmnt',
        value
      })
    );
  };

  // 특이사항 입력 업데이트 -> 삭제
  const handleRemark = (value) => {
    dispatch(
      inputPropAction({
        state: 'car',
        prop: 'remark',
        value
      })
    );
  };

  // 우편번호 업데이트
  const handleZcd = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'zcd',
        value
      })
    );
  };

  // 주소 업데이트
  const handleAddr = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'addr',
        value
      })
    );
  };

  // 상세주소 업데이트
  const handleDtlAddr = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'dtlAddr',
        value
      })
    );
  };

  // 은행 계좌주
  const handleAccountNm = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'accountNm',
        value
      })
    );
  };

  // 은행 계좌번호
  const handleAccountNo = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'accountNo',
        value
      })
    );
  };

  // 은행 코드
  const handleBankCd = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'bankCd',
        value
      })
    );
  };

  // 추가수정 - 개인사업자 여부
  const handleBizYn = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'bizYn',
        value
      })
    );
  };
  // 추가수정 - 개인사업자 타입
  const handleBizTpCd = (value) => {
    dispatch(
      inputPropAction({
        state: 'seller',
        prop: 'bizTpcd',
        value
      })
    );
  };

  // 추가수정 - 임시코드
  // useEffect(() => {
  //   setQIndividual(true);
  //   setTimeout(() => {
  //     setApplyIndividual(true);
  //   }, 1000);
  // }, []);
  // 추가수정 - 임시코드 END

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
                  복잡한 과정없이 비대면으로 편하게 판매하는 <strong>무평가로 내 차 팔기</strong>를 시작합니다.
                </p>
              )}
              {qIntro && <p>차량 출시 기준 33개월 이하, 주행거리 3만 km이하의 차량이라면 무평가 판매 신청이 가능합니다.</p>}
              {qOwner && <p>차량 조회를 위해 소유자 정보를 확인합니다. 차량번호와 소유자가 일치해야 진행하실 수 있어요.</p>}
            </div>
            {isOwner && (
              <div className="right">
                <p>차량 소유자를 확인했습니다.</p>
              </div>
            )}

            {/* 컷오프 기준 미달 시 - 내차팔기_v1.6_PPT 38 참조 */}
            {qVisitApply && (
              <div className="left">
                <p>조회하신 차량은 무평가 판매 가능 차량이 아닙니다. (차량 출시 기준 33개월 이하, 주행거리 3만 km이하의 차량) 방문평가 판매로 신청하시겠어요?</p>
              </div>
            )}

            {qAutobellMember && loginAskNeed && (
              <div className="left">
                <p>
                  아직 오토벨 회원이 아니신가요?
                  <br />
                  로그인하시면 무평가 서비스를 더욱 편리하게 이용하실 수 있어요.
                </p>
                <p>비회원으로 신청 시, 휴대폰 본인 인증을 진행해야 합니다.</p>
              </div>
            )}
            {isMemberType !== null && (
              <div className="right">
                {isMemberType === 'member' && <p>로그인 했어요.</p>}
                {isMemberType === 'nonmember' && <p>비회원으로 진행할래요.</p>}
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

            {/* {qCarOptions && (
              <div className="left">
                <p>기본옵션과 추가된 옵션 등 차량의 <strong>옵션정보</strong>를 확인해주세요.</p>
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
            )} */}

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

            {qCarComment && (
              <div className="left">
                <p>차량설명, 판금/교환 수리정보, 추가옵션정보 를 입력해 주세요.</p>
              </div>
            )}
            {isCarComment !== '' && (
              <div className="right">
                <p>{transformText(isCarComment)}</p>
                <span className="edit" onClick={handleCarCommentModify}>
                  수정
                </span>
              </div>
            )}
            {isCarCommentEmpty && (
              <div className="right">
                <p>차량 설명을 입력해주세요.</p>
                <span className="edit" onClick={handleCarCommentModify}>
                  입력
                </span>
              </div>
            )}
            {/* {qRemark && (
              <div className="left">
                <p>
                  <strong>사고 이력, 스크래치, 기타 장점</strong> 등 더 알리고 싶은 내용을 입력해주세요.
                </p>
              </div>
            )} */}

            {/* {isRemark !== '' && (
              <div className="right">
                <p>{isRemark === false ? '특이사항 없습니다.' : transformText(isRemark)}</p>
                <span className="edit" onClick={handleRemarkModify}>
                  수정
                </span>
              </div>
            )} */}
            {/* {isRemarkEmpty && (
              <div className="right">
                <p>차량 특이사항을 입력해주세요.</p>
                <span className="edit" onClick={handleRemarkModify}>
                  입력
                </span>
              </div>
            )} */}

            {qConsign && (
              <div className="left">
                <p>
                  상담 후, 배송기사님이 차량이 있는 <strong>주소</strong>로 방문합니다. 주소를 입력해주세요.
                </p>
              </div>
            )}
            {!objIsEmpty(isLocal) && (
              <div className="right">
                <p>
                  <span>{isLocal}</span> 입니다.
                </p>
                <span className="edit" onClick={handleConsignModify}>
                  수정
                </span>
              </div>
            )}
            {isLocalEmpty && (
              <div className="right">
                <p>방문지역을 입력해주세요.</p>
                <span className="edit" onClick={handleConsignModify}>
                  입력
                </span>
              </div>
            )}

            {qAccount && (
              <div className="left">
                <p>
                  차량 입고 후 판매가 최종 확정되면 고객님께 바로 차량금액을 보내드립니다. <br />
                  계좌번호를 입력해주세요.(본인계좌만 이용할 수 있어요.)
                </p>
              </div>
            )}
            {isAccount !== '' && (
              <div className="right">
                <p>{isAccount}</p>
                <span className="edit" onClick={handleAccountModify}>
                  수정
                </span>
              </div>
            )}
            {isAccountEmpty && (
              <div className="right">
                <p>계좌번호를 입력해주세요.</p>
                <span className="edit" onClick={handleConsignModify}>
                  입력
                </span>
              </div>
            )}

            {/* 추가수정 - 질문 */}
            {qIndividual && (
              <div className="left">
                <p>개인사업자 유무를 선택해 주세요.</p>
              </div>
            )}

            {/* 추가수정 - 대답(개인사업자 있음 선택 시) */}
            {isIndividual === 'Y' && bizTypeCode ? (
              <div className="right">
                <p>
                  <span>{bizTypeCdNm}</span> 입니다.
                </p>
                <span className="edit" onClick={handleIndividualModify}>
                  수정
                </span>
              </div>
            ) : isIndividual === 'N' ? (
              <div className="right">
                <p>개인사업자가 아닙니다.</p>
                <span className="edit" onClick={handleIndividualModify}>
                  수정
                </span>
              </div>
            ) : (
              <></>
            )}
            {qTerms && (
              <div className="left">
                <p>무평가 판매를 위해서는 서비스 이용동의가 필요해요</p>
              </div>
            )}
            {isTerms !== false && (
              <div className="right">
                <p>무평가 판매 이용에 동의합니다.</p>
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
                차량정보 조회
                <br />
                <span>차량 정보는 실제 정보와 다를 수 있으나, 수정하실 수 있습니다.</span>
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

          {/* 무평가 판매 차량이 아닐 시 */}
          <MobBottomArea isFix={applyVisitConfirm} isSimple={true}>
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="다음에 진행" width={48} measure={'%'} height={48} href="/sell/freeHome" />
                <Button size="big" background="blue80" radius={true} title="방문평가로 진행" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} href="/sell/visitApply" />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step03 : 오토벨 회원여부 확인 */}
          <MobBottomArea active={applyAutobellMember} isSimple={true} mode="fade">
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" radius={true} title="비회원으로 신청" width={48} measure={'%'} height={48} color="blue80" onClick={handleFullpagePopup('nonmember')} />
                <Button size="big" background="blue80" radius={true} title="로그인" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleFullpagePopup('login')} />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step05 : 판매차량 확인 */}
          <MobBottomArea active={applySellCarConfirm} isSimple={true} mode="fade">
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="아니오" width={48} measure={'%'} height={48} onClick={handleSellCarApply(false)} />
                <Button size="big" background="blue80" radius={true} title="예" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleSellCarApply(true)} />
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
                  <CarOptionsEditor items={car?.optionList} isEditing={true} addOptions={true} className="mt32" resetFn={true} />
                  {/* <CarOptions type={1} mode="check" isValue={false} />
                  <CarAddOption onClick={handleOptionClick} /> */}
                  {/* <MobCarOptionsEditor items={car.optionList} isEditing={true} />
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
                <Input
                  placeHolder="예:13,000"
                  type="number"
                  id="distance"
                  uiType={2}
                  width={160}
                  height={32}
                  onChange={handleDistance}
                  value={isDistance !== '' ? isDistance : car.drvDist !== 0 ? car.drvDist : undefined}
                />
                <em className="input-tx">km 입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleDistanceApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step10 : 차량 설명 여부 -> 특이사항*/}
          <MobBottomArea active={applyCarComment} isSimple={true} mode="fade">
            <div className="chat">
              <Textarea type="tp1" placeHolder="" height={calcH1} mode="chat" onChange={handleTextareaChange1} data={isCarComment !== '' ? isCarComment : car.crCmnt} />
              <Buttons>
                {/* <span className="step-btn-l">
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="없습니다" width={61} height={30} onClick={handleCarCommentApply('carcommentno')} />
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="잘 몰라요" width={61} height={30} onClick={handleCarCommentApply('carcommentdontknow')} />
                </span> */}
                <span className="step-btn-r">
                  <Button
                    size="sml"
                    background={textareaValue1.trim() !== '' ? 'blue80' : 'gray60'}
                    radius={true}
                    title="입력"
                    width={88}
                    height={30}
                    onClick={handleCarCommentApply(textareaValue1)}
                  />
                </span>
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step11 : 특이사항 */}
          {/* <MobBottomArea active={applyRemark} isSimple={true} mode="fade">
            <div className="chat">
              <Textarea type="tp1" placeHolder="여기에 차량의 사고 이력, 스크래치, 타이어 상태, 기타 장점을 입력해주세요." height={calcH2} mode="chat" onChange={handleTextareaChange2} />
              <Buttons>
                <span className="step-btn-l">
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="특이사항 없습니다" width={105} height={30} onClick={handleRemarkApply(false)} />
                </span>
                <span className="step-btn-r">
                  <Button size="sml" background={textareaValue2.trim() !== '' ? 'blue80' : 'gray60'} radius={true} title="입력" width={88} height={30} onClick={handleRemarkApply(true)} />
                </span>
              </Buttons>
            </div>
          </MobBottomArea> */}

          {/* step12 : 주소입력 */}
          <MobBottomArea active={applyConsign} isSimple={true}>
            {/* <div className="inner">
              <Buttons align="center">
                <Button size="full" background="blue80" radius={true} title="주소지 입력" onClick={handleFullpagePopup('address')} />
              </Buttons>
            </div> */}
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="주소지 입력"
                iconType="next-black"
                height={48}
                onClick={handleFullpagePopup('address')}
              />
            </div>
          </MobBottomArea>

          {/* step12 : 계좌입력 */}
          <MobBottomArea active={applyAccount} isSimple={true}>
            <div className="inner bottom-write-area bank-wrap">
              <MobSelectBox customMode={true} isDimm={true} isSimple={true} height={48} customName={accountBank} isClose={isChangeBank}>
                <div className="inner bottom-write-area filter-list-wrap pb0">
                  <h3 className="tit2">은행선택</h3>
                  <ul className="float-wrap">
                    {mobBankCdList &&
                      mobBankCdList.map((item, i) => (
                        <li key={i}>
                          <Radio className="simple checkbox" id={`bank-${i}`} value={item.cdId} checked={isAccountNum} disabled={false} onChange={handleBankValue} label={item.cdNm} />
                        </li>
                      ))}
                  </ul>
                  <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleSelectBank} />
                </div>
              </MobSelectBox>
              <label htmlFor="u-bank-num" className="hide">
                계좌번호
              </label>
              <span className="w-input">
                <Input type="number" placeHolder="계좌번호(' - ' 없이 숫자만 입력)" id="u-bank-num" uiType={2} height={32} value={accountValue} onChange={handleAccountValue} />
                <em className="input-tx">입니다.</em>
              </span>
              <span className="w-input w-owner">
                <Input type="text" placeHolder="계좌주 본인 성명" id="u-name" uiType={2} width={140} height={32} value={accountName} disabled={true} />
                <em className="input-tx tp2">입니다.</em>
              </span>
              <Buttons align="center" marginTop={30}>
                <Button size="big" background="blue20" radius={true} title="계좌 인증" width={48} measure={'%'} height={48} color="blue80" onClick={handleAccountValid} />
                <Button size="big" background="blue80" radius={true} title="입력" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleAccountApply} />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* 추가수정 */}
          <MobBottomArea active={applyIndividual} isSimple={true}>
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="개인사업자 없음" width={48} measure={'%'} height={48} onClick={handleIndividual(false)} />
                <Button size="big" background="blue80" radius={true} title="개인사업자 있음" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleIndividual(true)} />
              </Buttons>
            </div>
          </MobBottomArea>
          <MobBottomArea active={applyBusiness} isSimple={true}>
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="일반사업자" width={32} measure={'%'} height={48} onClick={handleIndividualApply(1)} />
                <Button size="big" background="blue60" radius={true} title="면제사업자" width={32} measure={'%'} height={48} marginLeft={2} mgMeasure={'%'} onClick={handleIndividualApply(2)} />
                <Button size="big" background="blue80" radius={true} title="간이사업자" width={32} measure={'%'} height={48} marginLeft={2} mgMeasure={'%'} onClick={handleIndividualApply(3)} />
              </Buttons>
            </div>
          </MobBottomArea>
          {/* 추가수정 END */}

          {/* step13 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms onTermsClick={handleTermsPopup} onClick={handleTermsApply} termsData={termCheck} onChange={handleTermChange} btnName="동의" />
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
                신청완료 후에는 수정이 불가능 합니다.
                <br />
                입력하신 내용으로
                <br />
                무평가 판매를 신청하시겠습니까?
              </p>
            </div>
            <Button size="full" background="blue80" radius={true} title="신청" onClick={handleFinalApply} />
          </MobBottomArea>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpPB}>
          {fpCarSearch && (
            <PricingTsConfirm
              hasMobile={true}
              designMode={'freeStep'}
              crNo={crNo}
              ownerName={ownerName}
              onNameChanged={handleOwnerNameChange}
              onCrNoChanged={handleCarNoChanged}
              onCertComplete={handleSearchCarNo}
              onCancel={onTsCancel}
            />
          )}
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: terms.tmsCntn }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: privacyTerms.tmsCntn }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin mode="popup" errorPw={false} noMemArea={false} url="/sell/freeStep01" callback={handleFpLoginClose} />
              </div>
            </div>
          )}
          {applyAutobellMember && ( //해당 단계에서만 비회원 인증 마운트
            <div className="content-wrap">
              <div className="login-wrap">
                <CertificationMod show={fpNomemberCert} callback={handleFpNomemberCertClose} />
              </div>
            </div>
          )}
          {fpFilter && <MobFilterModel callback={filterCallback} onCarModelSelect={handleCarModelSelect} />}
          {fpAddress && <FindAddress AddressEvent={addressCallback} mode="detail" />}
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

FreeStep01.getInitialProps = async (http) => {
  const { reduxStore } = http;
  const helper = new RenderHelper(http);
  const { query } = helper;
  await reduxStore.dispatch(getCommonCodeList('FM053')); // 은행 리스트
  await reduxStore.dispatch(getShootingPartList('seller')); // 사진 리스트

  return { query };
};

FreeStep01.propTypes = {
  query: PropTypes.object
};

export default withRouter(FreeStep01);
