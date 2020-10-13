import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { ClipLoader } from 'react-spinners';
import { isEmpty } from 'lodash';
import RenderHelper from '@lib/share/render/helper';
import { aixosUpFile, axiosPost, imgUrl } from '@src/utils/HttpUtils';
import { createValidator } from '@lib/share/validator';
import changeAddress from '@lib/share/validator/mypage/personal/changeAddress';
import { setComma } from '@src/utils/StringUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
// import Certification from '@src/components/common/Certification';
import FindAddress from '@src/components/common/popup/FindAddress';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import MypageNavi from '@src/components/common/MypageNavi';
import Radio from '@lib/share/items/Radio'; //#a1 참고
import RodalPopup from '@lib/share/popup/RodalPopup';
import SelectBox from '@lib/share/items/SelectBox';
import Textarea from '@lib/share/items/Textarea'; //#a1 참고
import useRodal from '@lib/share/custom/useRodal';
import PopupReceipt from 'src/components/mypage/common/PopupReceipt';

import { getCommonCodeList } from '@src/actions/common/commonCodeAction';
import {
  ITEMS_PER_PAGE,
  getHomeServiceList,
  getHomeServiceDetail,
  confirmPurchase,
  cancelPurchase,
  requestReceipt,
  setLoadingImageMobile
} from '@src/actions/mypage/personal/buycar/homeService/homeServiceAction';

// 모바일 추가분
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const addrRequired = ['hsvcId', 'reciNm', 'zcd', 'addr1', 'addr2', 'pn1', 'pn2', 'pn3', 'locCd', 'ctyCd', 'certNum1'];
const addrValidator = createValidator(changeAddress, { required: addrRequired });
const hpnValidator = createValidator({ pn2: changeAddress.pn2, pn3: changeAddress.pn3 }, { required: ['pn2', 'pn3'] });

function setStyleByCode(dataCode, ...liCode) {
  const styleObj = { background: '#0080ff', color: '#fff' };
  return liCode.some((e) => e === dataCode) ? styleObj : {};
}

// 배송지 변경 버튼 show/hide
export function showChgAddrBtn({ sttDvcd, cnsgStatCd }) {
  return STATUS_ARRS.SHOW_ADDR_BTN_S.some((e) => e === sttDvcd) && STATUS_ARRS.SHOW_ADDR_BTN_C.some((e) => e === cnsgStatCd);
}
// 배송지 변경 가능 여부
export function setChgAddrRodal({ sttDvcd, cnsgStatCd }) {
  return STATUS_ARRS.CAN_ADDR_S.some((e) => e === sttDvcd) && STATUS_ARRS.CAN_ADDR_C.some((e) => e === cnsgStatCd) ? 'possible' : 'impossible';
}

// 취소신청 버튼 show/hide
export function showCnclBtn({ sttDvcd, cnsgStatCd }) {
  return STATUS_ARRS.SHOW_CNCL_BTN_S.some((e) => e === sttDvcd) && STATUS_ARRS.SHOW_CNCL_BTN_C.some((e) => e === cnsgStatCd);
}
// 취소신청 가능 여부
export function setCancelRodal({ sttDvcd, cnsgStatCd }) {
  if (STATUS_ARRS.CAN_CNCL_S.some((e) => e === sttDvcd) && STATUS_ARRS.CAN_CNCL_C.some((e) => e === cnsgStatCd)) return 'possible'; //취소 가능
  if (STATUS_ARRS.CAN_CNSG_FEE_S.some((e) => e === sttDvcd) && STATUS_ARRS.CAN_CNSG_FEE_C.some((e) => e === cnsgStatCd)) return 'cnsgFee'; //취소 가능(탁송수수료 발생)
  if (STATUS_ARRS.CAN_CNCL_FEE_S.some((e) => e === sttDvcd) && STATUS_ARRS.CAN_CNCL_FEE_C.some((e) => e === cnsgStatCd)) return 'cnclFee'; //취소 가능(취소수수료 발생)
  // if (CANNOT_CNCL_S.some((e) => e === sttDvcd) && CANNOT_CNCL_C.some((e) => e === cnsgStatCd)) return 'impossible'; //취소 불가능
  return 'impossible'; //취소 불가능
}

// 구매확정 버튼 show/hide
export function showCnfmBtn({ sttDvcd, cnsgStatCd }) {
  return STATUS_ARRS.SHOW_CNFM_BTN_S.some((e) => e === sttDvcd) && STATUS_ARRS.SHOW_CNFM_BTN_C.some((e) => e === cnsgStatCd);
}

// 증빙요청 버튼 show/hide
export function showRcptBtn({ sttDvcd, cnsgStatCd, athMthdDvcd }) {
  return STATUS_ARRS.SHOW_RCPT_BTN_P.some((e) => e === athMthdDvcd) && STATUS_ARRS.SHOW_RCPT_BTN_S.some((e) => e === sttDvcd) && STATUS_ARRS.SHOW_RCPT_BTN_C.some((e) => e === cnsgStatCd);
}

// *_S : 신청상태코드
// *_C : 탁송상태코드
export const STATUS_ARRS = {
  SHOW_CNCL_BTN_S: ['0010', '0020', '0030', '0040', '0050', '0070'], // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 배송중, 배송완료, 결제완료
  SHOW_CNCL_BTN_C: [undefined, null, '', '0010', '0020', '0030', '0040'], // 탁송상태 : undefined, 입금, 배차, 배송중, 배송완료
  CAN_CNCL_S: ['0010', '0020', '0030', '0070'], // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 결제완료
  CAN_CNCL_C: [undefined, null, '', '0010'], // 탁송상태 : undefined, 입금
  CAN_CNSG_FEE_S: ['0030', '0070'], // 신청상태 : 배송 준비중, 결제완료
  CAN_CNSG_FEE_C: ['0020'], // 탁송상태 : 배차
  CAN_CNCL_FEE_S: ['0050'], // 신청상태 : 배송완료
  CAN_CNCL_FEE_C: ['0040'], // 탁송상태 : 배송완료
  CANNOT_CNCL_S: ['0040'], // 신청상태 : 배송중
  CANNOT_CNCL_C: ['0020', '0030', '0040'], // 탁송상태 : 배차, 배송중, 배송완료
  SHOW_ADDR_BTN_S: ['0010', '0020', '0030', '0040', '0070'], // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 배송중, 결제완료
  SHOW_ADDR_BTN_C: [undefined, null, '', '0010', '0020', '0030', '0040'], // 탁송상태 : undefined, 입금, 배차, 배송중, 배송완료
  CAN_ADDR_S: ['0010', '0020', '0030', '0070'], // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 결제완료
  CAN_ADDR_C: [undefined, null, '', '0010'], // 탁송상태 : undefined, 입금
  CANNOT_ADDR_S: ['0030', '0040', '0070'], // 신청상태 : 배송 준비중, 배송중, 결제완료
  CANNOT_ADDR_C: ['0020', '0030', '0040'], // 탁송상태 : 배차, 배송중, 배송완료
  SHOW_CNFM_BTN_S: ['0050'], // 신청상태 : 배송완료
  SHOW_CNFM_BTN_C: ['0040'], // 탁송상태 : 배송완료
  SHOW_RCPT_BTN_S: ['0060'], // 신청상태 : 구매확정
  SHOW_RCPT_BTN_C: ['0040'], // 탁송상태 : 배송완료
  SHOW_RCPT_BTN_P: ['0010', '0030'], // 결제방식 : 할부, 할부+계좌이체
  CNCL_STT_800: ['0810', '0820', '0830'],
  CNCL_STT_900: ['0910', '0920'],
  SHOW_INSU_FILE_BTN: ['0020', '0070'], // 신청상태: 결제대기중, 결제완료
  SHOW_PAY_CMPL: ['0030', '0040', '0050', '0060', '0070'] // 신청상태 : 결제완료 표시용
};

const STT_STYLE = { width: '100%', textAlign: 'center' };

/**
 * [홈서비스진행상태(sttDvcd) 공통코드 유형 : AM061]
 * 0010 :	신청완료
 * 0020 :	결제대기중
 * 0030 :	배송 준비중
 * 0040 :	배송중
 * 0050 :	배송완료
 * 0060 :	구매확정
 * 0070 :	결제완료
 *
 * [홈서비스취소상태(cnclSttDvcd) 공통코드 유형 : AM120]
 * 0810 :	취소신청
 * 0820 :	취소완료
 * 0830 :	취소처리중(탁송)
 * 0910 :	환불진행중
 * 0920 :	환불완료
 *
 * [탁송상태(cnsgStatCd) 공통코드 유형 : AM068]
 * 0010 : 입금
 * 0020 : 배차
 * 0030 : 배송중
 * 0040 : 배송완료
 * 0050 : 취소
 *
 * [결제방식() 공통코드 유형 : AM062]
 * 0010 : 할부
 * 0020 : 계좌이체
 * 0030 : 할부+계좌이체
 */

//마이페이지(개인) > 내차사기 > 홈서비스 내역
const MyHomeService = ({ query }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);

  const [payDetailShow, setPayDetailShow, payDetailPopupHandler, payDetailCloseHandler] = useRodal(false, true); // 홈서비스 상세
  const [payDetailShow2, setPayDetailShow2, payDetailPopupHandler2, payDetailCloseHandler2] = useRodal(false, true); //     보험증서 업로드
  const [payDetailShow21, setPayDetailShow21, payDetailPopupHandler21, payDetailCloseHandler21] = useRodal(false, true); // 보험증서 업로드 완료
  const [payDetailShow3, setPayDetailShow3, payDetailPopupHandler3, payDetailCloseHandler3] = useRodal(false, true); //     구매확정
  const [payDetailShow4, setPayDetailShow4, payDetailPopupHandler4, payDetailCloseHandler4] = useRodal(false, true); //     구매확정 완료
  const [shippingShow, setShippingShow, shippingPopupHandler, shippingCloseHandler] = useRodal(false, true); //             배송지 변경
  const [cancelShow, setCancelShow, cancelPopupHandler, cancelCloseHandler] = useRodal(false, true); //                     구매취소
  const [cancelRsnShow, setCancelRsnShow, cancelRsnPopupHandler, cancelRsnCloseHandler] = useRodal(false); //               취소사유
  const [cancelChkShow, setCancelChkShow, cancelChkPopupHandler, cancelChkCloseHandler] = useRodal(false); //#a1 참고:      취소완료
  const [receiptShow, setReceiptShow, receiptPopupHandler, receiptCloseHandler] = useRodal(false); //#a2 참고:              영수증/(현금영수증 또는 세금계산서)
  const [addressPopup, setAddressPopup, openAddressPopup, closeAddressPopup] = useRodal(false); //                          우편번호 검색

  const FM005List = useSelector((state) => state.commonCode.commonCodeList.FM005, []);
  const { homeServiceList, homeServiceDetail, addrData, receiptData } = useSelector((store) => store.myHomeServiceNormal);
  const currentPage = useRef(1);

  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [cancelRsnText, setCancelRsnText] = useState(''); //  취소사유 내용
  const [isLoading, setIsLoading] = useState(false); // 로딩 Spinner show/hide 여부
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    hsvcId: '',
    reciNm: '',
    zcd: '',
    addr1: '',
    addr2: '',
    pn1: '',
    pn2: '',
    pn3: '',
    locCd: '',
    ctyCd: '',
    certNum1: '',
    certNum2: ''
  });

  const handleListMore = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if ((currentPage.current - 1) * ITEMS_PER_PAGE > homeServiceList.length) return;
      currentPage.current++;
      dispatch(getHomeServiceList(currentPage.current));
    },
    [dispatch, homeServiceList]
  );

  const handleShowDetail = useCallback(
    (e, hsvcId) => {
      e && e.preventDefault();
      dispatch(getHomeServiceDetail(hsvcId));
      payDetailPopupHandler(e, 'fade');
    },
    [dispatch, payDetailPopupHandler]
  );

  const handleMobShowDetail = (e, v) => {
    e.preventDefault();
    Router.push('/mypage/personal/buycar/homeServiceDetail?hsvcId=' + v.hsvcId);
  };

  //보험서류 파일 선택
  // InputFile & InputPicture
  const uploadList1 = useCallback((files) => {
    const _files = Object.values(files);
    // _files.map((v) => console.log(v));
    setFile(_files[0]);
  }, []);

  //보험서류 업로드
  const handleFileUpload = useCallback(
    (e, hsvcId) => {
      e.preventDefault();
      if (!file) return showAlert('보험증서 파일을 선택해주세요.');
      setIsLoading(true);
      const formDatas = new FormData();
      formDatas.append('hsvcId', hsvcId);
      formDatas.append('insuFiles', file);
      aixosUpFile(`/api/mypage/user/uploadInsuFile.do`, formDatas)
        .then(({ data }) => {
          setPayDetailShow21(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    },
    [file]
  );

  //구매확정
  const handleConfirm = useCallback(
    (e, hsvcId) => {
      e && e.preventDefault();
      setPayDetailShow3(false);
      setPayDetailShow4(false);
      dispatch(confirmPurchase(hsvcId, currentPage.current));
    },
    [setPayDetailShow3, setPayDetailShow4, dispatch]
  );

  const handleChangeForm = (e) => {
    let { name, value, label, cmCdTpId } = e?.target || e;
    if (cmCdTpId && cmCdTpId === 'FM005') name = 'pn1';
    setFormData((prev) => ({ ...prev, [name]: label || value }));
  };

  //배송연락처 입력시 type:number, maxLength 적용하기 위한 이벤트
  const handleOnInput = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  //우편번호 검색 api 연결
  const AddressEvent = useCallback(
    (e) => {
      setFormData((prev) => ({ ...prev, zcd: e.postCode, addr1: e.addData, addr2: e.detailText, locCd: e.locCd, ctyCd: e.ctyCd }));
      closeAddressPopup();
    },
    [closeAddressPopup]
  );

  // ====== 본인인증 ==================================================================
  const [isCert, setIsCert] = useState(false);
  const [timer, setTimer] = useState();
  const [timerFlag, setTimerFlag] = useState(true);
  const [timeView, setTimeView] = useState('인증번호를 입력해주세요.');
  const startTimer = (sec) => {
    let initTime = sec;
    setTimer(
      setInterval(() => {
        const remainMinute = Math.floor(initTime / 60);
        const second = initTime % 60;
        const remainSecond = second < 10 ? '0' + second : second;
        const m = remainMinute + ':' + remainSecond;
        initTime = initTime - 1;
        setTimeView(m);

        if (initTime < 0) {
          setIsCert(false);
          setTimerFlag(false);
          setFormData((prev) => ({ ...prev, certNum2: '' }));
          showAlert('인증번호가 만료 되었습니다.', 'error');
          setTimeView('인증번호를 입력해주세요.');
        }
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimerFlag(true);
    setFormData((prev) => ({ ...prev, certNum2: '' }));
  };

  useEffect(() => {
    if (timerFlag === false) stopTimer();
  }, [timerFlag]);

  useEffect(() => {
    if (query?.hsvcId) {
      handleShowDetail(null, query?.hsvcId);
    }
  }, [query]);

  const handleGetCertNum = (e) => {
    e.preventDefault();
    const tempData = { pn2: formData.pn2, pn3: formData.pn3 };
    const valid = hpnValidator.validate(tempData);
    if (valid.error) {
      const msg = valid?.error[0]?.messages[0] || '';
      const field = valid?.error[0]?.label || '';
      return showAlert(`${field} : ${msg}`);
    }

    axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.pn1.concat(formData.pn2, formData.pn3) }).then(({ data }) => {
      if (data.statusinfo.returncd === '000') {
        showAlert('인증번호를 SMS로 발송했습니다. <br/>제한시간 내에 인증을 진행해주세요.');
        setFormData((prev) => ({ ...prev, certNum2: data.authenticationNumber }));
        startTimer(180);
      } else {
        showAlert('인증번호 전송 실패', 'error');
      }
    });
  };

  const handleConfirmCert = (e) => {
    e.preventDefault();
    if (formData.certNum1 && formData.certNum2 && formData.certNum1 === formData.certNum2) {
      stopTimer();
      showAlert('인증되었습니다.');
      return setIsCert(true);
    }
    showAlert('인증번호가 일치하지 않습니다.');
    setIsCert(false);
  };

  //변경한 주소 등록
  const handleAddrSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
      const tempData = { ...formData };
      delete tempData.certNum2;
      const valid = addrValidator.validate(tempData);
      if (valid.error) {
        const msg = valid?.error[0]?.messages[0] || '';
        const field = valid?.error[0]?.label || '';
        return showAlert(`${field} : ${msg}`);
      }

      if (!isCert) return showAlert('인증되지 않았습니다.<br/>휴대폰 인증을 진행해주세요.');

      const submitData = { ...formData, reciHpPnEnc: formData.pn1.concat(formData.pn2, formData.pn3) };
      // console.log('submitData : ', submitData);
      setIsLoading(true);
      axiosPost(`/api/mypage/user/updateDestAddrInfo.do`, submitData)
        .then((res) => {
          setIsLoading(false);
          setIsCert(false);
          setTimeView('인증번호를 입력해주세요.');
          if (res?.data?.statusinfo?.returncd !== '000' && res?.data?.statusinfo?.returncd !== 'SUCCESS') {
            showAlert('주소변경 실패');
            return false; // 주소변경 등록 실패
          }
          showAlert('주소변경이 완료되었습니다.');
          dispatch(getHomeServiceDetail(homeServiceDetail.hsvcId));
          setShippingShow(false);
          // setFormData(initFormData); // 입력데이터 초기화
        })
        .catch(() => {
          setIsLoading(false);
          setIsCert(false);
          setTimeView('인증번호를 입력해주세요.');
          console.log('전송 실패!');
        });
    },
    [formData, showAlert, dispatch, homeServiceDetail.hsvcId, setShippingShow]
  );

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(1);
  const handleChange1 = (e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  };

  // 취소사유 Textarea
  const textareaBlur = (e) => {
    setCancelRsnText(e.target.value);
  };
  const textareaFocus = (e) => {
    setCancelRsnText(e.target.value);
  };

  //구매취소 확인버튼
  const handleCancelRsn = async () => {
    if ((isValue1 === 4) & !cancelRsnText) return showAlert('기타 취소 사유를 입력해주세요.');
    let cnclRsnCd; // FM044
    switch (isValue1) {
      case 1:
        cnclRsnCd = '0010'; //단순변심
        break;
      case 2:
        cnclRsnCd = '0020'; //차량이상
        break;
      case 3:
        cnclRsnCd = '0030'; //차량정보오류
        break;
      case 4:
        cnclRsnCd = '0090'; //기타
        break;
      default:
        cnclRsnCd = '0010';
        break;
    }
    setIsLoading(true);
    await dispatch(cancelPurchase(currentPage.current, homeServiceDetail.hsvcId, cnclRsnCd, cancelRsnText, hasMobile)).then((returncd) => {
      if (returncd === 'SUCCESS') {
        //Rodal 닫기 및 취소사유 초기화
        setIsValue1(1);
        setCancelRsnText('');
        dispatch(getHomeServiceList(currentPage.current));
        showAlert('취소신청이 완료되었습니다.');
      } else {
        console.log('취소 중 오류 발생');
      }
      setCancelShow(false);
      setCancelRsnShow(false);
    });
    setIsLoading(false);
  };

  const handleRequestReceipt = useCallback(
    (e) => {
      e && e.preventDefault();
      dispatch(requestReceipt(homeServiceDetail.hsvcId));
      receiptPopupHandler(e, 'fade');
    },
    [dispatch, receiptPopupHandler, homeServiceDetail.hsvcId]
  );

  useEffect(() => {
    setFormData((prev) => ({ ...addrData }));
  }, [addrData]);

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((currentPage.current - 1) * ITEMS_PER_PAGE > homeServiceList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      currentPage.current++;
      dispatch(getHomeServiceList(currentPage.current));
    }
  }, [loadingFlag, homeServiceList, dispatch, currentPage]);

  useEffect(() => {
    setLoadingFlag(true);
  }, [homeServiceList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, homeServiceList]);

  // ================================================================================
  //        모바일 시작
  // ================================================================================
  useEffect(() => {
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스 내역',
          options: ['back', 'gnb']
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
          exist: true
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, [dispatch, hasMobile]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="general-buy-sec">
          <div className="mypage-admin-title pd20">
            <p className="tx-exp-tp5">&#8251; 최근 1년 이내 홈서비스를 신청하신 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 홈서비스로 구매하신 차량정보는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            {Array.isArray(homeServiceList) && homeServiceList.length > 0 ? (
              <div className="content-wrap">
                <div className="goods-list admin-list tp2">
                  <ul>
                    {homeServiceList.map((v, i) => {
                      return (
                        <li key={i} onClick={(e) => handleMobShowDetail(e, v)}>
                          <div className="img-cover">
                            <img src={`${imgUrl}${v.carPhotoURL}`} alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>
                                {v.reqDay}
                                <span className="time">{v.reqTime}</span>
                                {/* {v.firstRegDt.slice(0, 9)}
                                <span className="time">{v.firstRegDt.slice(11, 15)}</span> */}
                              </li>
                              <li className="state tx-blue80">{v.cnclSttDvcd ? v.cnclSttNm : v.sttNm}</li>
                            </ul>
                            <h5 className="subject">{v.carNm}</h5>
                            <div className="info-wrap">
                              <p className="name">
                                {v.dlrNm}({v.entrCorpNm})
                              </p>
                              <div className="price-wrap">
                                <div className="price-left">
                                  <p className="price-tp2">
                                    {setComma(v.carAmt)}
                                    <span className="won">만원</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="list-none-wrap tp2">
                <div className="list-none">
                  <p>홈서비스로 신청하신 차량이 없습니다.</p>
                </div>
                <Buttons align="center" marginTop={16}>
                  <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/homeservice/homeService" />
                </Buttons>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    );
  } // 모바일 끝

  // ================================================================================
  //        PC 시작
  // ================================================================================

  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>홈서비스 내역</h3>
            <p className="tx-exp-tp5">&#8251; 최근 1년이내 홈서비스를 신청하신 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 홈서비스로 구매하신 차량정보는 1년까지 조회하실 수 있으며 1년이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            <div className="list-tit">
              <Button className="fr" size="big" background="blue80" title="홈서비스 대상차량보기" width={204} height={48} marginBottom={23} href="/homeService/homeService" />
            </div>
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="12%" />
                    <col width="52%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>신청차량</th>
                      <th>가격</th>
                      <th>판매자</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  {Array.isArray(homeServiceList) && homeServiceList.length > 0 ? (
                    <tbody>
                      {homeServiceList.map((v, i) => {
                        return (
                          <tr key={`${i}-${v.reqDt}`}>
                            <td>
                              {v.reqDay}
                              <br />
                              {v.reqTime}
                            </td>
                            <td>
                              <div>
                                <div className="img-cover">
                                  <img src={v.carPhotoURL ? `${imgUrl}${v.carPhotoURL}` : '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                                </div>
                                <div className="summary" style={{ position: 'relative', top: '50%', marginRight: '15px', transform: 'none', float: 'none' }}>
                                  <h4 className="subject" style={{ wordBreak: 'keep-all' }}>
                                    {v.carNm}
                                  </h4>
                                  <ul className="info">
                                    <li>{v.carNo}</li>
                                    <li>{v.firstRegDt}</li>
                                    <li>{setComma(v.drvDist)}km</li>
                                    <li>{v.mssNm}</li>
                                    <li>{v.carFuelNm}</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="price-tp6">
                                {setComma(v.carAmt)}
                                <span className="won">만원</span>
                              </p>
                            </td>
                            <td className="seller">
                              {v.dlrNm}
                              <br />
                              {setHpPnFormat(v.dlrHpno)}
                            </td>
                            <td>
                              {v.cnclSttDvcd ? v.cnclSttNm : v.sttNm}
                              <br />
                              {v.cnclSttDvcd !== '0820' && (
                                <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} onClick={(e) => handleShowDetail(e, v.hsvcId)} />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {currentPage.current * ITEMS_PER_PAGE <= homeServiceList.length && (
                        <tr className="more">
                          <td colSpan="6" className="more">
                            <div className="cate-list-btn2">
                              <button onClick={handleListMore}>더보기</button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="list-none">
                        <td colSpan="6">
                          홈서비스로 신청하신 차량이 없습니다.
                          {/* <br />
                          <Button size="big" background="blue80" title="홈서비스 대상 차량보기" width={245} height={60} marginTop={16} href="/homeService/homeService" /> */}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============= 홈서비스 상세 내역 팝업 =================================================== */}
      <RodalPopup show={payDetailShow} type={'slideUp'} closedHandler={payDetailCloseHandler} mode="normal" width={894}>
        {isEmpty(homeServiceDetail) ? (
          <div className="con-wrap compact">
            <h4>상세 데이터가 없습니다.</h4>
            <Buttons align="center" marginTop={40} className="w-line">
              <Button
                size="big"
                background="blue80"
                title="확인"
                width={180}
                height={60}
                onClick={(e) => {
                  e.preventDefault();
                  payDetailCloseHandler();
                }}
              />
            </Buttons>
          </div>
        ) : (
          <div className="popup-pay-detail">
            {/* {homeServiceDetail.cnclSttDvcd && STATUS_ARRS.CNCL_STT_900.some((e) => e === homeServiceDetail.cnclSttDvcd) && (
              <ul>
                <li>
                  <span className="title" style={setStyleByCode(homeServiceDetail.cnclSttDvcd, '0910')}>
                    1. 환불신청
                  </span>
                  <span className="sub">
                    접수가 완료되었습니다.
                    <br />
                    상담사가 곧 연락드릴
                    <br />
                    예정입니다.
                  </span>
                </li>
                <li>
                  <span className="title" style={setStyleByCode(homeServiceDetail.cnclSttDvcd, '0920')}>
                    2. 환불완료
                  </span>
                  <span className="sub">환불이 완료되었습니다.</span>
                </li>
              </ul>
            )}
            {homeServiceDetail.cnclSttDvcd && STATUS_ARRS.CNCL_STT_800.some((e) => e === homeServiceDetail.cnclSttDvcd) && (
              <ul>
                <li>
                  <span className="title" style={setStyleByCode(homeServiceDetail.cnclSttDvcd, '0810')}>
                    1. 취소신청
                  </span>
                  <span className="sub">
                    접수가 완료되었습니다.
                    <br />
                    상담사가 곧 연락드릴
                    <br />
                    예정입니다.
                  </span>
                </li>
                <li>
                  <span className="title" style={setStyleByCode(homeServiceDetail.cnclSttDvcd, '0820')}>
                    2. 취소완료
                  </span>
                  <span className="sub">취소가 완료되었습니다.</span>
                </li>
              </ul>
            )} */}
            {!homeServiceDetail.cnclSttDvcd &&
              (homeServiceDetail.sttDvcd === '0060' ? (
                ''
              ) : (
                <ul>
                  <li>
                    <span className="title" style={{ ...setStyleByCode(homeServiceDetail.sttDvcd, '0010'), width: '134px' }}>
                      1. 신청완료
                    </span>
                    <span className="sub" style={STT_STYLE}>
                      접수가 완료되었습니다.
                      <br />
                      상담사가 곧 연락드릴
                      <br />
                      예정입니다.
                    </span>
                  </li>
                  <li>
                    <span className="title" style={setStyleByCode(homeServiceDetail.sttDvcd, '0020')}>
                      2. 결제대기중
                    </span>
                    <span className="sub" style={STT_STYLE}>
                      결제내역을
                      <br />
                      확인하고 있습니다.
                    </span>
                  </li>
                  <li>
                    <span className="title" style={setStyleByCode(homeServiceDetail.sttDvcd, '0030', '0070')}>
                      3. 결제완료&amp;배송준비중
                    </span>
                    <span className="sub" style={STT_STYLE}>
                      결제완료 후
                      <br />
                      고객님에게 배송하기 위해
                      <br />
                      준비중입니다.
                    </span>
                  </li>
                  <li>
                    <span className="title" style={{ ...setStyleByCode(homeServiceDetail.sttDvcd, '0040'), width: '134px' }}>
                      4. 배송 중
                    </span>
                    <span className="sub" style={STT_STYLE}>
                      고객님이 원하는 시간,
                      <br />
                      장소로 배송이 출발되며
                      <br />
                      진행상황이 안내됩니다.
                    </span>
                  </li>
                  <li>
                    <span className="title" style={{ ...setStyleByCode(homeServiceDetail.sttDvcd, '0050'), width: '134px' }}>
                      5. 배송 완료
                    </span>
                    <span className="sub" style={STT_STYLE}>
                      차량 인수 후, 3일 이내
                      <br />
                      최종 구매 확정해주세요.
                      <br />
                      (3일 이후 자동확정)
                    </span>
                  </li>
                </ul>
              ))}

            <div className="table-area">
              <div className="table-wrap-left">
                <ul className="float-wrap">
                  <li>
                    <h4 className="mb33">결제 정보</h4>
                  </li>
                  {!homeServiceDetail.cnclSttDvcd &&
                  homeServiceDetail.sttDvcd &&
                  showCnclBtn(homeServiceDetail) && ( //신청완료 ~ 배송완료
                      <li>
                        <Button size="mid" line="gray" color="black" radius={true} title="취소신청" width={100} height={32} onClick={(e) => cancelPopupHandler(e, 'fade')} />
                      </li>
                    )}
                </ul>
                <table summary="결제정보에 대한 내용" className="table-tp1">
                  <caption className="away">결제 정보</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차량가격</th>
                      <td>{setComma(homeServiceDetail.crAmt)}원</td>
                    </tr>
                    <tr>
                      <th>이전관리비</th>
                      <td>{setComma(homeServiceDetail.rdpmMgmtAmt)}원</td>
                    </tr>
                    <tr>
                      <th>EW가입비</th>
                      <td>{setComma(homeServiceDetail.atbWrntAmt)}원</td>
                    </tr>
                    <tr>
                      <th>탁송비</th>
                      <td>{setComma(homeServiceDetail.deliAmt)}원</td>
                    </tr>
                    <tr>
                      <th>총 결제금액</th>
                      <td>{setComma(homeServiceDetail.hsvcUseAmt)}원</td>
                    </tr>
                    <tr>
                      <th>결제방식</th>
                      <td>
                        {/* 할부 + 계좌이체 */}
                        {homeServiceDetail.athMthdNm}
                        <br />
                        (이체금액 {setComma(homeServiceDetail.trnsAmt)}원)
                        <br />
                        {!homeServiceDetail.cnclSttDvcd && homeServiceDetail.sttDvcd === '0020' && STATUS_ARRS.SHOW_RCPT_BTN_P.some((e) => e === homeServiceDetail.athMthdDvcd) && (
                          <span className="tx-blue80">
                            {/* 입금계좌 : 하나은행 */}
                            입금계좌: {homeServiceDetail.vactBankCd}
                            <br />
                            {/* 454564456123 */}
                            {homeServiceDetail.vactNum}
                            <br />
                            (예금주 : {homeServiceDetail.vactName})
                          </span>
                        )}
                        {STATUS_ARRS.SHOW_PAY_CMPL.some((e) => e === homeServiceDetail.sttDvcd) && <span className="tx-blue80">결제완료</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* 결제방식:(할부[0010] 또는 할부+계좌이체[0030]) 이고 신청상태:(구매확정[0060] 또는 배송완료[0050]+3일 이후 ) */}
                {showRcptBtn(homeServiceDetail) && (
                  <Buttons align="right" marginTop={17}>
                    <Button size="mid" line="gray" radius={true} title="증빙요청" width={91} height={32} buttonMarkup onClick={handleRequestReceipt} />
                  </Buttons>
                )}
              </div>

              <div className="table-wrap-right">
                <ul className="float-wrap">
                  <li>
                    <h4 className="mb33">계약자/배송 정보</h4>
                  </li>
                  <li>
                    {!homeServiceDetail.cnclSttDvcd &&
                    homeServiceDetail.sttDvcd &&
                    showCnfmBtn(homeServiceDetail) && ( //배송완료
                        <Button size="mid" line="gray" color="black" radius={true} title="구매확정" width={100} height={32} onClick={(e) => payDetailPopupHandler3(e, 'fade')} />
                      )}
                    {!homeServiceDetail.cnclSttDvcd &&
                    homeServiceDetail.sttDvcd &&
                    showChgAddrBtn(homeServiceDetail) && ( //신청완료 ~ 배송중
                        <Button size="mid" line="gray" color="black" radius={true} title="배송지 변경" width={100} height={32} marginLeft={8} onClick={(e) => shippingPopupHandler(e, 'fade')} />
                      )}
                  </li>
                </ul>
                <table summary="계약자/배송 정보에 대한 내용" className="table-tp1">
                  <caption className="away">계약자/배송 정보</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="37.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>명의자</th>
                      <td>{homeServiceDetail.nom}</td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td>{setHpPnFormat(homeServiceDetail.hpNoEnc)}</td>
                    </tr>
                    <tr>
                      <th>주민등록상 주소</th>
                      <td>{homeServiceDetail.addr}</td>
                    </tr>
                    <tr>
                      <th>환불 계좌번호</th>
                      {/* <td>국민은행 김현대 221112254789</td> */}
                      <td>
                        {homeServiceDetail.bankNm} {homeServiceDetail.dpstNm} {homeServiceDetail.acntNoEnc}
                      </td>
                    </tr>
                    <tr>
                      <th>배송지 주소</th>
                      <td>{homeServiceDetail.destAddr}</td>
                    </tr>
                    <tr>
                      <th>수령인</th>
                      <td>{homeServiceDetail.reciNm}</td>
                    </tr>
                    <tr>
                      <th>배송지 연락처</th>
                      <td>{setHpPnFormat(homeServiceDetail.reciHpPnEnc)}</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>{homeServiceDetail.email}</td>
                    </tr>
                    <tr>
                      <th>보험증서</th>
                      <td>
                        {homeServiceDetail.insuBillFileId || '미첨부 '}
                        {!homeServiceDetail.cnclSttDvcd && homeServiceDetail.sttDvcd && STATUS_ARRS.SHOW_INSU_FILE_BTN.some((e) => e === homeServiceDetail.sttDvcd) && (
                          <Button
                            size="mid"
                            line="gray"
                            color="black"
                            radius={true}
                            title={homeServiceDetail.insuBillFileId ? '수정' : '보험증서 첨부'}
                            width={113}
                            height={28}
                            marginLeft={32}
                            onClick={(e) => payDetailPopupHandler2(e, 'fade')}
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </RodalPopup>

      <RodalPopup show={payDetailShow2} type={'slideUp'} closedHandler={payDetailCloseHandler2} mode="normal" title="보험증서" size="medium">
        <div className="con-wrap popup-insurance">
          <p>보험 가입 및 첨부를 해주셔야 차량 배송이 진행됩니다.</p>
          <InputFile uploadList={uploadList1} resVertical={true} height={48} />
          <Buttons align="center" marginTop={49}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={130}
              height={48}
              onClick={(e) => {
                e.preventDefault();
                setPayDetailShow2(false);
              }}
            />
            <Button size="big" background="blue80" title="등록" width={130} height={48} onClick={(e) => handleFileUpload(e, homeServiceDetail.hsvcId)} />
          </Buttons>
        </div>
      </RodalPopup>

      {/* 증빙요청(영수증) 팝업 */}
      <RodalPopup show={receiptShow} type={'slideUp'} closedHandler={receiptCloseHandler} mode="normal" title="영수증/증빙" size="medium">
        <PopupReceipt data={receiptData} closedHandler={receiptCloseHandler} />
      </RodalPopup>

      <RodalPopup show={payDetailShow21} type={'slideUp'} closedHandler={payDetailCloseHandler21} mode="normal" title="보험증서 업로드" size="medium">
        <div className="con-wrap popup-insurance">
          <p>보험증서가 업로드 되었습니다.</p>
          <Buttons align="center" marginTop={49}>
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={130}
              height={48}
              onClick={(e) => {
                e.preventDefault();
                setPayDetailShow2(false);
                setPayDetailShow21(false);
                dispatch(getHomeServiceDetail(homeServiceDetail.hsvcId));
              }}
            />
            {/* <Button size="big" background="blue80" title="등록" width={130} height={48} onClick={(e) => handleFileUpload(e, homeServiceDetail.hsvcId)} /> */}
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={payDetailShow3} type={'slideUp'} closedHandler={payDetailCloseHandler3} mode="normal" size="xs">
        <div className="con-wrap">
          <p>
            해당 차량을 구매확정 하시겠습니가?
            <br />
            (구매확정 시, 차량 명의이전이 진행됩니다.)
          </p>
          <Buttons align="center" marginTop={55}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={130}
              height={48}
              onClick={(e) => {
                e.preventDefault();
                setPayDetailShow3(false);
              }}
            />
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={130}
              height={48}
              onClick={(e) => {
                payDetailPopupHandler4(e, 'fade');
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>

      {/* <RodalPopup show={payDetailShow4} type={'slideUp'} closedHandler={payDetailCloseHandler4} mode="normal" size="xs"> */}
      <RodalPopup show={payDetailShow4} type={'slideUp'} closedHandler={() => console.log('확인버튼을 눌러주세요')} mode="normal" size="xs">
        <div className="con-wrap">
          <p>
            구매확정이 완료되었습니다.
            <br />
            오토벨 홈서비스를 이용해주셔서 감사합니다.
          </p>
          <Buttons align="center" marginTop={55}>
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={130}
              height={48}
              onClick={(e) => {
                handleConfirm(e, homeServiceDetail.hsvcId);
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>

      {/* sttDvcd    cnsgStatCd      */}
      {!homeServiceDetail.cnclSttDvcd && (
        <RodalPopup show={cancelShow} type={'slideUp'} closedHandler={cancelCloseHandler} mode="normal" size="xs">
          {setCancelRodal(homeServiceDetail) === 'possible' && (
            <div className="con-wrap">
              <p>홈서비스 신청을 취소하시겠습니까?</p>
              <Buttons align="center" marginTop={48}>
                <Button
                  size="big"
                  background="gray"
                  title="취소"
                  width={130}
                  height={48}
                  onClick={(e) => {
                    e.preventDefault();
                    setCancelShow(false);
                  }}
                />
                <Button
                  size="big"
                  background="blue80"
                  title="확인"
                  onClick={(e) => {
                    cancelRsnPopupHandler(e, 'fade');
                    setCancelShow(false);
                  }}
                  width={130}
                  height={48}
                />
              </Buttons>
            </div>
          )}
          {setCancelRodal(homeServiceDetail) === 'cnsgFee' && (
            <div className="con-wrap">
              <p>
                해당차량은 배차가 완료되어
                <br />
                취소 시 편도 탁송비가 수수료로 발생합니다.
                <br />
                그래도 취소 신청하시겠습니까?
              </p>
              <Buttons align="center" marginTop={48}>
                <Button
                  size="big"
                  background="gray"
                  title="취소"
                  width={130}
                  height={48}
                  onClick={(e) => {
                    e.preventDefault();
                    setCancelShow(false);
                  }}
                />
                <Button
                  size="big"
                  background="blue80"
                  title="확인"
                  onClick={(e) => {
                    cancelRsnPopupHandler(e, 'fade');
                    setCancelShow(false);
                  }}
                  width={130}
                  height={48}
                />
              </Buttons>
            </div>
          )}
          {setCancelRodal(homeServiceDetail) === 'impossible' && (
            <div className="con-wrap">
              <p>
                해당차량은 배차가 완료되어
                <br />
                취소신청이 불가합니다.
                <br />
                고객센터(1600-0080)로 문의주세요.
              </p>
              <Buttons align="center" marginTop={48}>
                <Button
                  size="big"
                  background="blue80"
                  title="확인"
                  width={130}
                  height={48}
                  onClick={(e) => {
                    e.preventDefault();
                    setCancelShow(false);
                  }}
                />
              </Buttons>
            </div>
          )}
          {setCancelRodal(homeServiceDetail) === 'cnclFee' && (
            <div className="con-wrap">
              <p>
                취소시 취소수수료가 발생합니다.
                <br />
                그래도 취소하시겠습니까?
              </p>
              <Buttons align="center" marginTop={48}>
                <Button
                  size="big"
                  background="gray"
                  title="취소"
                  width={130}
                  height={48}
                  onClick={(e) => {
                    e.preventDefault();
                    setCancelShow(false);
                  }}
                />
                <Button
                  size="big"
                  background="blue80"
                  title="확인"
                  onClick={(e) => {
                    cancelRsnPopupHandler(e, 'fade');
                    setCancelShow(false);
                  }}
                  width={130}
                  height={48}
                />
              </Buttons>
            </div>
          )}
        </RodalPopup>
      )}

      <RodalPopup
        show={cancelRsnShow}
        type={'slideUp'}
        closedHandler={(e) => {
          cancelRsnCloseHandler(e, 'fade');
          setCancelRsnText('');
        }}
        mode="normal"
        size="small"
        subPop={true}
      >
        {/* #a3 */}
        <div className="con-wrap popup-cancel">
          <p>취소사유</p>
          <ul>
            <li>
              <Radio className="txt" id="cancel1" title="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
            </li>
            {setCancelRodal(homeServiceDetail) === 'cnclFee' && (
              <>
                <li>
                  <Radio className="txt" id="cancel2" title={`차량 이상`} value={2} checked={isValue1} onChange={handleChange1} />
                </li>
                <li>
                  <Radio className="txt" id="cancel3" title="차량 정보 오류" value={3} checked={isValue1} onChange={handleChange1} />
                </li>
              </>
            )}
            <li>
              <Radio className="txt" id="cancel4" title="기타" value={4} checked={isValue1} onChange={handleChange1} />
            </li>
          </ul>
          <Textarea countLimit={200} type="tp1" data={cancelRsnText} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 사유를 작성해주세요." />
          <p className="tx-sinfo">※ 환불 시, 반송에 따른 탁송비 및 인수 당시 상태와 다를 경우 추가 금액이 발생할 수 있습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={180}
              height={60}
              onClick={(e) => {
                e.preventDefault();
                setCancelRsnText('');
                setCancelShow(false);
                setCancelRsnShow(false);
              }}
            />
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={180}
              height={60}
              onClick={(e) => {
                e.preventDefault();
                handleCancelRsn();
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>

      {/* 신청완료 ~ 배송중 mode="normal" size="xs" */}
      <RodalPopup
        show={shippingShow}
        type={'slideUp'}
        closedHandler={(e) => {
          shippingCloseHandler(e, 'fade');
          setFormData(addrData);
        }}
        mode="normal"
        size={setChgAddrRodal(homeServiceDetail) === 'impossible' ? 'xs' : 'medium'}
        title="배송지 변경하기"
      >
        {setChgAddrRodal(homeServiceDetail) === 'impossible' && (
          <div className="con-wrap">
            <p>
              해당차량은 배차가 완료되어
              <br />
              배송지 변경이 불가합니다.
              <br />
              고객센터(1600-0080)로 문의주세요.
            </p>
            <Buttons align="center" marginTop={48}>
              <Button
                size="big"
                background="blue80"
                title="확인"
                width={130}
                height={48}
                onClick={(e) => {
                  e.preventDefault();
                  setShippingShow(false);
                }}
              />
            </Buttons>
          </div>
        )}
        {setChgAddrRodal(homeServiceDetail) === 'possible' && (
          <div className="con-wrap">
            <table summary="배송지 변경에 대한 내용" className="table-tp1 input">
              <caption className="away">배송지 변경하기</caption>
              <colgroup>
                <col width="25%" />
                <col width="75%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>수령인</th>
                  <td>
                    <Input readOnly={isCert} type="text" name={'reciNm'} value={formData.reciNm} onChange={handleChangeForm} width={200} height={40} placeHolder="수령인을 입력해주세요." />
                  </td>
                </tr>
                <tr>
                  <th>배송지 주소</th>
                  <td>
                    <span className="bridge2">
                      <Input readOnly={isCert} type="text" name={'zcd'} value={formData.zcd} onChange={handleChangeForm} width={200} height={40} />
                      {!isCert && <Button size="mid" background="gray" title="우편번호" width={100} height={40} marginLeft={8} onClick={(e) => openAddressPopup(e, 0)} />}
                      <RodalPopup show={addressPopup} type={'slideUp'} closedHandler={closeAddressPopup} title="우편번호 검색" mode="normal" size="medium">
                        <FindAddress AddressEvent={AddressEvent} />
                      </RodalPopup>
                    </span>
                    <span className="bridge2">
                      <Input readOnly={isCert} type="text" name={'addr1'} value={formData.addr1} onChange={handleChangeForm} width={200} height={40} />
                      <em />
                      <Input readOnly={isCert} type="text" name={'addr2'} value={formData.addr2} onChange={handleChangeForm} width={200} height={40} placeHolder="상세주소를 입력해주세요." />
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>배송지 연락처</th>
                  <td>
                    <span className="bridge2">
                      <SelectBox
                        disabled={isCert}
                        id="from-year"
                        className="items-sbox"
                        options={FM005List}
                        name={'pn1'}
                        value={formData.pn1}
                        onChange={handleChangeForm}
                        width={91}
                        height={40}
                        placeHolder="010"
                      />
                      <em className="mg8">-</em>
                      <Input readOnly={isCert} type="number" maxLength={4} onInput={handleOnInput} name={'pn2'} value={formData.pn2} onChange={handleChangeForm} width={90} height={40} />
                      <em className="mg8">-</em>
                      <Input readOnly={isCert} type="number" maxLength={4} onInput={handleOnInput} name={'pn3'} value={formData.pn3} onChange={handleChangeForm} width={90} height={40} />
                      {!isCert && <Button size="mid" background="gray" title="인증번호받기" width={120} height={40} marginLeft={8} onClick={handleGetCertNum} />}
                    </span>
                    <span className="bridge2">
                      {!isCert ? (
                        <>
                          <Input
                            type="text"
                            maxLength={6}
                            name={'certNum1'}
                            value={formData.certNum1}
                            onChange={handleChangeForm}
                            width={200}
                            height={40}
                            placeHolder={timeView || '인증번호를 입력해주세요.'}
                          />
                          <Button size="mid" background="gray" title="인증확인" width={100} height={40} marginLeft={8} onClick={handleConfirmCert} />
                        </>
                      ) : (
                        <Button size="mid" background="blue80" title="인증완료" width={100} height={40} marginLeft={8} disabled={isCert} onClick={(e) => e.preventDefault()} />
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <Buttons align="center" marginTop={49}>
              <Button
                size="big"
                background="gray"
                title="취소"
                width={130}
                height={48}
                onClick={(e) => {
                  e.preventDefault();
                  setFormData(addrData);
                  setShippingShow(false);
                }}
              />
              <Button size="big" background="blue80" title="변경완료" width={130} height={48} onClick={handleAddrSubmit} />
            </Buttons>
          </div>
        )}
      </RodalPopup>
    </AppLayout>
  );
};

MyHomeService.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { dispatch } = http.reduxStore;

  helper.accessControl();

  await dispatch(getHomeServiceList());
  await dispatch(getCommonCodeList('FM005'));
  //모바일?
  await dispatch({ type: SECTION_MYPAGE });

  return { query };
};

export default MyHomeService;

// //취소신청 버튼 show
// export const SHOW_CNCL_BTN_S = ['0010', '0020', '0030', '0040', '0050', '0070']; // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 배송중, 배송완료, 결제완료
// export const SHOW_CNCL_BTN_C = [undefined, '0010', '0020', '0030', '0040']; // 탁송상태 : undefined, 입금, 배차, 배송중, 배송완료

// //취소가능
// export const CAN_CNCL_S = ['0010', '0020', '0030', '0070']; // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 결제완료
// export const CAN_CNCL_C = [undefined, '0010']; // 탁송상태 : undefined, 입금

// //취소가능(탁송비)
// export const CAN_CNSG_FEE_S = ['0030', '0070']; // 신청상태 : 배송 준비중, 결제완료
// export const CAN_CNSG_FEE_C = ['0020']; // 탁송상태 : 배차

// //취소가능(수수료)
// export const CAN_CNCL_FEE_S = ['0050']; // 신청상태 : 배송완료
// export const CAN_CNCL_FEE_C = ['0040']; // 탁송상태 : 배송완료

// //취소불가능
// export const CANNOT_CNCL_S = ['0040']; // 신청상태 : 배송중
// export const CANNOT_CNCL_C = ['0020', '0030', '0040']; // 탁송상태 : 배차, 배송중, 배송완료

// //배송지변경 버튼 show
// export const SHOW_ADDR_BTN_S = ['0010', '0020', '0030', '0040', '0070']; // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 배송중, 결제완료
// export const SHOW_ADDR_BTN_C = [undefined, '0010', '0020', '0030', '0040']; // 탁송상태 : undefined, 입금, 배차, 배송중, 배송완료

// //배송지변경 가능
// export const CAN_ADDR_S = ['0010', '0020', '0030', '0070']; // 신청상태 : 신청완료, 결제대기중, 배송 준비중, 결제완료
// export const CAN_ADDR_C = [undefined, '0010']; // 탁송상태 : undefined, 입금

// //배송지변경 불가능
// export const CANNOT_ADDR_S = ['0030', '0040', '0070']; // 신청상태 : 배송 준비중, 배송중, 결제완료
// export const CANNOT_ADDR_C = ['0020', '0030', '0040']; // 탁송상태 : 배차, 배송중, 배송완료

// //구매확정 버튼 show
// export const SHOW_CNFM_BTN_S = ['0050']; // 신청상태 : 배송완료
// export const SHOW_CNFM_BTN_C = ['0040']; // 탁송상태 : 배송완료

// //증빙요청 버튼 show
// export const SHOW_RCPT_BTN_S = ['0060']; // 신청상태 : 구매확정
// export const SHOW_RCPT_BTN_C = ['0040']; // 탁송상태 : 배송완료
// export const SHOW_RCPT_BTN_P = ['0010', '0030']; // 결제방식 : 할부, 할부+계좌이체

// export const CNCL_STT_800 = ['0810', '0820', '0830'];
// export const CNCL_STT_900 = ['0910', '0920'];

// //보험증서 첨부가능 상태
// export const SHOW_INSU_FILE_BTN = ['0020', '0070']; // 신청상태: 결제대기중, 결제완료
