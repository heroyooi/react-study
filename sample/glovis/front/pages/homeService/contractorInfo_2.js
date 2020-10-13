import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isEmpty } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { produce } from 'immer';
import { ClipLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import FindAddress from '@src/components/common/popup/FindAddress';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';
import { getCommonCodeList, getPolicy, setInputInfo, getMbInfo } from '@src/actions/homeservice/homeserviceAction';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
/*
  html 변경이력
  03.17 : #a1 부분 변경
*/
const ContractorInfo_2 = ({ query }) => {
  const { dlrPrdId, cntrctrTp } = query;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스',
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
          exist: false
        }
      });
    }
  }, []);
  const { homeServiceOnGoing } = useSelector((state) => state.home);
  useDetectPageRefresh(homeServiceOnGoing, '/homeService/homeService');
  const { showAlert, initAlert } = useContext(SystemContext);
  const { inputInfo, bankCdList, policyList, hpPnCdList, txivPblcList, mbInfo } = useSelector((state) => state.home);
  const [hpPrefixOpt, setHpPrefixOpt] = useState([]); // 핸드폰 앞자리 배열 : 리덕스의 값은 변경해도 이후 상수처리 되기 때문에 별도 변수에 저장해야 한다.
  const [bankCdOpt, setBankCdOpt] = useState([]); // 은행코드 : 위 핸드폰과 마찬가지 이유로 변수 설정
  const [formData, setFormData] = useState({ ...inputInfo, dlrPrdId: dlrPrdId });
  const [addrCopy1, setAddrCopy1] = useState(false);
  const [addrCopy2, setAddrCopy2] = useState(false);
  const [policyCheckList, setPolicyCheckList] = useState([]);
  const [policyCntn, setPolicyCntn] = useState([]);
  const [tmsCnsn, setTmsCnsn] = useState([]);
  const [accountChk, setAccountChk] = useState(false);
  const [authenticationNumber1, setAuthenticationNumber1] = useState('');
  const [authenticationNumber2, setAuthenticationNumber2] = useState('');
  const [verification1, setVerification1] = useState('');
  const [verification2, setVerification2] = useState('');
  const [hpPnEnc1Chk, setHpPnEnc1Chk] = useState(false);
  const [hpPnEnc2Chk, setHpPnEnc2Chk] = useState(false);
  const [timer, setTimer] = useState();
  const [timerFlag1, setTimerFlag1] = useState(true);
  const [timeView1, setTimeView1] = useState();
  const [timerFlag2, setTimerFlag2] = useState(true);
  const [timeView2, setTimeView2] = useState();
  const [tenancy, setTenancy] = useState(false);
  const [addrTarget, setAddrTarget] = useState('');
  const [contractorTypeOpt, setContractorTypeOpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.
  const contractorTypeList = [
    // { cmCdTpId: 'temp', cdId: '', cdNm: '선택', value: '0', cdValue: '0', label: '선택', title: '선택', checked: true },
    { id: '0010', cmCdTpId: 'temp', cdId: '0010', cdNm: '개인', value: 1, cdValue: 1, label: '개인', title: '개인', checked: false },
    { id: '0020', cmCdTpId: 'temp', cdId: '0020', cdNm: '개인사업자', value: 2, cdValue: 2, label: '개인사업자', title: '개인사업자', checked: false }
  ];
  const startTimer = (sec, target) => {
    let initTime = sec;
    setTimer(
      setInterval(() => {
        const remainMinute = Math.floor(initTime / 60);
        const second = initTime % 60;
        const remainSecond = second < 10 ? '0' + second : second;
        const m = remainMinute + ':' + remainSecond;
        initTime = initTime - 1;
        if (target === 'hpNoEnc1') setTimeView1(m);
        if (target === 'hpNoEnc2') setTimeView2(m);

        if (initTime < 0) {
          if (target === 'hpNoEnc1') {
            setTimerFlag1(false);
            setAuthenticationNumber1('');
          }
          if (target === 'hpNoEnc2') {
            setTimerFlag2(false);
            setAuthenticationNumber2('');
          }

          if (hpPnEnc1Chk !== true) {
            showAlert('인증번호가 만료 되었습니다.', 'error');
          }
        }
      }, 1000)
    );
  };

  const stopTimer = (target) => {
    clearInterval(timer);
    if (target === 'hpNoEnc1') {
      setTimerFlag1(true);
      setAuthenticationNumber1('');
    }
    if (target === 'hpNoEnc2') {
      setTimerFlag2(true);
      setAuthenticationNumber2('');
    }
  };

  useEffect(() => {
    if (timerFlag1 === false) stopTimer('hpNoEnc1');
    if (timerFlag2 === false) stopTimer('hpNoEnc2');
  }, [timerFlag1, timerFlag2]);

  const handleBizNumInput = (value) => {
    const bizNumRegexWhen5 = /^([0-9]{3})([0-9]*)$/;
    const bizNumRegexWhen10 = /^([0-9]{3})([0-9]{2})([0-9]*)$/;

    value = value.replace(/-/gi, '');

    if (value.length < 4) return value;
    if (value.length < 6) return value.replace(bizNumRegexWhen5, '$1-$2');
    if (value.length < 11) return value.replace(bizNumRegexWhen10, '$1-$2-$3');

    return value;
  };

  const handleHpNumInput = (value) => {
    const hpNumRegexWhen5 = /^([0-9]*)([0-9]{4})$/;
    value = value.replace(/-/gi, '');

    if (value.length > 5) return value.replace(hpNumRegexWhen5, '$1-$2');
    return value;
  };

  // 유효식 모음
  const onlyNumber = /[0-9\b]+$/;
  const onlyEng = /[a-zA-Z\b]+$/;
  // 모바일 유효식에서 천지인 키보드에서 특수문자를 이용하는점 적용
  const onlyKor = /[ㄱ-ㅎㅏ-ㅣ가-힣\b\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]+$/;
  const checkKor = /[가-힣\b]+$/;
  const checkEmail = /^[0-9a-zA-Z][0-9a-zA-Z\_\-\.]*@[0-9a-zA-Z_-]+(\.[a-zA-Z]+){1,2}$/;

  const handleOnKeyUp = (e, target) => {
    e.preventDefault();
    const { value } = e.target;
    for (const val of value) {
      if (target.includes('nom') || target.includes('dpstNm')) {
        if (val !== '' && !onlyEng.test(val) && !onlyKor.test(val)) {
          e.target.value = '';
          setFormData(
            produce((draft) => {
              draft[target] = '';
            })
          );
          showAlert('한글 및 영문자만 입력 가능합니다.', 'error');
          return;
        }
      }
      if (target.includes('hpPn') || target.includes('acntno') || target.includes('brn')) {
        if (val !== '' && !onlyNumber.test(val) && val !== '-') {
          setFormData(
            produce((draft) => {
              draft[target] = '';
            })
          );
          e.target.value = '';
          showAlert('숫자만 입력 가능합니다.', 'error');
          return;
        }
      }
    }
  };

  const onChangeRemoveFormatInput = (e) => {
    const { id, value } = e.target;
    if (id === 'hpPn1_2') {
      setIsHp1Check(false);
    } else if (id === 'hpPn1_2') {
      setIsHp2Check(false);
    }
    setFormData(
      produce((draft) => {
        draft[id] = value.replace(/-/gi, '');
      })
    );
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    if (id === 'addr2') {
      setIsAddr1Check(false);
    } else if (id === 'plbzAddr2') {
      setIsAddr2Check(false);
    } else if (id === 'plbzAddrsec2') {
      setIsAddr3Check(false);
    }
    setFormData(
      produce((draft) => {
        draft[id] = value;
      })
    );
  };

  const onClickSelectHp = (value, target) => {
    setFormData(
      produce((draft) => {
        if (hpPrefixOpt[value - 1] && hpPrefixOpt[value - 1].cdId) draft[target] = hpPrefixOpt[value - 1].cdId;
      })
    );
  };

  const onClickSelectBank = (value, target) => {
    setFormData(
      produce((draft) => {
        if (bankCdOpt[value - 1] && bankCdOpt[value - 1].cdId) draft[target] = bankCdOpt[value - 1].cdId;
      })
    );
  };

  const onClickContractorType = (value, target) => {
    setFormData(
      produce((draft) => {
        if (contractorTypeOpt[value - 1] && contractorTypeOpt[value - 1].cdId) draft[target] = contractorTypeOpt[value - 1].cdId;
        console.log(target + 'onClickContractorType target ==> ' + draft[target]);
      })
    );
  };

  const onChangeRadio = (e, target) => {
    const { value } = e.target;
    setFormData(
      produce((draft) => {
        draft[target] = target !== 'txivPblcYn' ? value : value === '0010' ? 'Y' : value === '0020' ? 'N' : '';
      })
    );
  };

  const onChangeCheck = (e) => {
    const { checked } = e.target;
    const id = e.target.id.split('chk-')[1];

    if (id.includes('shrNomYn')) {
      setFormData(
        produce((draft) => {
          draft[id] = checked === true ? 'Y' : 'N';
          setTenancy((prev) => !prev);
          setContractorTypeOpt(contractorTypeList);
        })
      );
    } else {
      setFormData(
        produce((draft) => {
          draft[id.includes('1') ? 'plbzAddrZcd1' : 'plbzAddrZcd2'] = checked === true ? formData.zcd1 : '';
          draft[id.includes('1') ? 'plbzAddr1' : 'plbzAddrSec1'] = checked === true ? formData.addr1 : '';
          draft[id.includes('1') ? 'plbzAddr2' : 'plbzAddrSec2'] = checked === true ? formData.addr2 : '';
          draft[id.includes('1') ? 'plbzLocCd1' : 'plbzLocCd2'] = checked === true ? formData.locCd : '';
          draft[id.includes('1') ? 'plbzCtyCd1' : 'plbzCtyCd2'] = checked === true ? formData.ctyCd : '';
        })
      );
      if (id.includes('1')) setAddrCopy1(checked);
      if (id.includes('2')) setAddrCopy2(checked);
    }
  };

  // 다음단계 진행시 유효성 체크 후 메세지 출력용(true : 유효성 메세지 출력 , false : 유효성 메세지 숨김)
  const [isHp1Check, setIsHp1Check] = useState(false); //명의자 휴대폰
  const [isAddr1Check, setIsAddr1Check] = useState(false); //명의자 주소
  const [isAddr2Check, setIsAddr2Check] = useState(false); //사업장 주소
  const [isHp2Check, setIsHp2Check] = useState(false); //공동명의자 휴대폰
  const [isAddr3Check, setIsAddr3Check] = useState(false); //공동명의자 사업장 주소

  const validationChk = () => {
    if (formData.nom1 === '') {
      showAlert('명의자 이름을 입력하세요.', 'error');
      return;
    }
    if (formData.hpPn1_1 === '' || formData.hpPn1_2 === '') {
      showAlert('휴대폰 번호를 입력하세요.', 'error');
      setIsHp1Check(true);
      return;
    } else if (formData.zcd1 === '' || formData.addr1 === '' || formData.addr2 === '') {
      showAlert('배송지 주소를 입력하세요.', 'error');
      setIsAddr1Check(true);
      return;
    } else if (formData.bankDvcd === '') {
      showAlert('은행을 선택하세요.', 'error');
      return;
    } else if (formData.acntNoEnc === '') {
      showAlert('계좌번호를 입력하세요.', 'error');
      return;
    } else if (formData.dpstNm === '') {
      showAlert('예금주를 입력하세요.', 'error');
      return;
    } else if (formData.emlAddr === '') {
      showAlert('이메일을 입력하세요.', 'error');
      return;
    } else if (formData.cntrSignTpcd === '') {
      showAlert('차량양도 계약서 서명방식을 선택하세요.', 'error');
      return;
    }
    if (!checkKor.test(formData.dpstNm)) {
      showAlert('예금주 이름을 올바르게 입력하세요.', 'error');
      return;
    }
    if (!checkEmail.test(formData.emlAddr)) {
      showAlert('이메일 형식이 올바르지 않습니다.', 'error');
      return;
    }
    // if (hpPnEnc1Chk === false) {
    //   showAlert('휴대폰 번호 인증을 진행해 주세요.', 'error');
    //   return;
    // }
    // if (accountChk === false) {
    //   showAlert('계좌번호 인증을 진행해 주세요.', 'error');
    //   return;
    // }
    if (!checkKor.test(formData.nom1)) {
      showAlert('명의자 이름을 올바르게 입력하세요.', 'error');
      return;
    }
    if (formData.plbzNm1 === '') {
      showAlert('사업장명을 입력하세요.', 'error');
      return;
    } else if (formData.brn1 === '') {
      showAlert('사업장등록번호를 입력하세요.', 'error');
      return;
    } else if (formData.plbzAddrZcd1 === '' || formData.plbzAddr1 === '' || formData.plbzAddr2 === '') {
      showAlert('사업장 주소를 입력하세요.', 'error');
      if (formData.plbzAddr2 === '') {
        setIsAddr2Check(true);
      }
      return;
    }
    if (formData.shrNomYn === 'Y') {
      if (formData.cntrctrTp2 === '') {
        showAlert('공동 명의자 유형을 선택하세요.', 'error');
        return;
      } else if (formData.nom2 === '') {
        showAlert('공동 명의자 이름을 입력하세요.', 'error');
        return;
      } else if (formData.hpPn2_1 === '' || formData.hpPn2_2 === '') {
        showAlert('공동 명의자 휴대폰 번호를 입력하세요.', 'error');
        setIsHp2Check(true);
        return;
      }

      if (formData.cntrctrTp2 === '0020') {
        if (formData.plbzNm2 === '') {
          showAlert('사업장명을 입력하세요.', 'error');
          return;
        } else if (formData.brn2 === '') {
          showAlert('사업장등록번호를 입력하세요.', 'error');
          return;
        } else if (formData.plbzAddrZcd2 === '' || formData.plbzAddrSec1 === '' || formData.plbzAddrSec2 === '') {
          showAlert('사11업장 주소를 입력하세요.', 'error');
          if (formData.plbzAddrZcd2 === '') {
            setIsAddr3Check(true);
          } else if (formData.plbzAddrSec2 === '') {
            setIsAddr3Check(true);
          }
          return;
        }
      }
      if (!checkKor.test(formData.nom2)) {
        showAlert('공동 명의자 이름을 올바르게 입력하세요.', 'error');
        return;
      }
      if (hpPnEnc2Chk === false) {
        showAlert('공동 명의자 휴대폰 번호 인증을 진행해 주세요.', 'error');
        return;
      }
    }
    for (const idx in policyCheckList) {
      if (document.getElementById(policyCheckList[idx].id).checked === false) {
        showAlert(policyCheckList[idx].title + ' 동의를 해주세요.', 'error');
        return;
      }
    }
    return true;
  };

  const prevStep = (e, target) => {
    e.preventDefault();
    setIsLoading(true);
    Router.push(`/homeService/${target}?dlrPrdId=${dlrPrdId}&cntrctrTp=${cntrctrTp}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  const nextStep = (e, target) => {
    e.preventDefault();
    if (validationChk()) {
      setIsLoading(true);
      dispatch(setInputInfo(formData));
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1000);
      Router.push(`/homeService/${target}?dlrPrdId=${dlrPrdId}&cntrctrTp=${cntrctrTp}`).then(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      });
    }
  };

  const onClickBtn = (e, target) => {
    e.preventDefault();

    if (target === 'hpNoEnc1') {
      if (formData.hpNoEnc1) {
        setIsLoading(true);
        axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.hpNoEnc1 }).then(({ data }) => {
          setIsLoading(false);
          if (data.statusinfo.returncd === '000') {
            showAlert(data?.statusinfo?.returnmsg, 'ok');
            setAuthenticationNumber1(data.authenticationNumber);
            clearInterval(timer);
            console.log('====> authenticationNumber1 : ', data.authenticationNumber);
            startTimer(180, target);
          } else {
            showAlert(data?.statusinfo?.returnmsg, 'error');
          }
        });
      } else {
        showAlert('휴대폰 번호를 입력해주세요.', 'error');
      }
    } else if (target === 'hpNoEnc1Chk') {
      if (authenticationNumber1 === '') {
        showAlert('먼저 인증번호받기를 눌러주세요.');
      } else {
        if (authenticationNumber1 === verification1) {
          showAlert('인증 되었습니다.');
          setHpPnEnc1Chk(true);
          stopTimer('hpNoEnc1');
          setAuthenticationNumber1('');
          setTimeView1('');
        } else {
          showAlert('인증번호가 일치하지 않습니다.');
        }
      }
    } else if (target === 'hpNoEnc2') {
      if (formData.hpNoEnc2) {
        setIsLoading(true);
        axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.hpNoEnc2 }).then(({ data }) => {
          setIsLoading(false);
          if (data.statusinfo.returncd === '000') {
            showAlert(data?.statusinfo?.returnmsg, 'ok');
            setAuthenticationNumber2(data.authenticationNumber);
            clearInterval(timer);
            console.log('====> authenticationNumber2 : ', data.authenticationNumber);
            startTimer(180, target);
          } else {
            showAlert(data?.statusinfo?.returnmsg, 'error');
          }
        });
      } else {
        showAlert('휴대폰 번호를 입력해주세요.', 'error');
      }
    } else if (target === 'hpNoEnc2Chk') {
      if (authenticationNumber2 === verification2) {
        showAlert('인증 되었습니다.');
        setHpPnEnc2Chk(true);
        stopTimer('hpNoEnc2');
        setAuthenticationNumber2('');
        setTimeView2('');
      } else {
        showAlert('인증번호가 일치하지 않습니다.');
      }
    } else if (target === 'account') {
      if (formData?.bankDvcd && formData?.acntNoEnc && formData?.dpstNm) {
        if (formData.bankDvcd === '' || formData.bankDvcd === undefined) return showAlert('은행을 선택해주세요.', 'error');
        if (formData.acntNoEnc === '' || formData.acntNoEnc === undefined) return showAlert('계좌번호를 입력해주세요.', 'error');
        if (formData.dpstNm === '' || formData.dpstNm === undefined) return showAlert('예금주명을 입력해주세요.', 'error');
        const accountChkData = {
          banksett: formData.bankDvcd,
          noacct: formData.acntNoEnc,
          nmcomp: formData.dpstNm,
          rltURL: `${process.env.HOSTURL}/api/admin/homeservice/receiveUrlConnection.do`
        };
        setIsLoading(true);
        axiosPost('/api/admin/homeservice/callUrlConnection.do', accountChkData).then(({ data }) => {
          console.log(`accountChk Return URL >>> ${process.env.HOSTURL}/api/admin/homeservice/receiveUrlConnection.do`);
          console.log('accountChk Request >>>>', data);
          setIsLoading(false);
          if (data?.statusinfo?.returncd !== undefined && data?.statusinfo?.returncd === 'SYS9999') {
            showAlert('서버와 접속이 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.<br/>(테스트를 위해 인증 처리합니다.)');
            setAccountChk(true);
            return;
          } else if (data.statusinfo.returncd === '000') {
            showAlert('인증 되었습니다.');
            setAccountChk(true);
          } else {
            // setAccountChk(false);
            // showAlert(data.statusinfo.strErrMsg, 'error');
            showAlert(`${data.statusinfo.returnmsg}<br/>(테스트를 위해 인증 처리합니다.)`);
            setAccountChk(true);
          }
        });
      }
    }
  };

  const onChangeVerification = (e, target) => {
    e.preventDefault();
    if (target === 'verification1') setVerification1(e.target.value);
    else if (target === 'verification2') setVerification2(e.target.value);
  };

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  useEffect(() => {
    if (!isEmpty(mbInfo)) {
      console.log('mbInfo >>>>', mbInfo);

      setFormData(
        produce((draft) => {
          draft.hpNoEnc1 = formData?.hpNoEnc1 ? formData?.hpNoEnc1 : mbInfo.mbHpPn;
          draft.hpPn1_1 = formData?.hpPn1_1 ? formData?.hpPn1_1 : mbInfo.mbHpPn.substr(0, 3);
          draft.hpPn1_2 = formData?.hpPn1_2 ? formData?.hpPn1_2 : mbInfo.mbHpPn.substr(3, 8);
          draft.bankDvcd = formData?.bankDvcd ? formData?.bankDvcd : mbInfo.bankCd;
          draft.acntNoEnc = formData?.acntNoEnc ? formData?.acntNoEnc : mbInfo.accountNo;
          draft.dpstNm = formData?.dpstNm ? formData?.dpstNm : mbInfo.accountNm;
          draft.nom1 = formData?.nom1 ? formData?.nom1 : mbInfo.mbNm;
          draft.zcd1 = formData?.zcd1 ? formData?.zcd1 : mbInfo.mbZcd;
          draft.addr1 = formData?.addr1 ? formData?.addr1 : mbInfo.mbAddrEnc;
          draft.addr2 = formData?.addr2 ? formData?.addr2 : mbInfo.mbDtlAddrEnc;
          draft.locCd = formData?.locCd ? formData?.locCd : mbInfo.locCd;
          draft.ctyCd = formData?.ctyCd ? formData?.ctyCd : mbInfo.ctyCd;
          draft.emlAddr = formData?.emlAddr ? formData?.emlAddr : mbInfo.mbEmlAddrEnc;
        })
      );
    }
  }, [mbInfo]);

  useEffect(() => {
    if (isEmpty(mbInfo)) if (isLoginLiveCheck()) dispatch(getMbInfo(gInfoLive().id)); // 회원정보
  }, [mbInfo]);

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.cntrctrTp1 = cntrctrTp;
      })
    );
  }, [cntrctrTp]);

  useEffect(() => {
    if (!isEmpty(policyList)) {
      const arr1 = [];
      const arr2 = [];

      policyList.map((policy, index) => {
        arr1.push({ id: 'chk-apply-agree-' + (index + 1), title: policy.tmsNm, checked: false, essential: policy.indYn === 'Y' ? true : false });
        arr2.push(ReactHtmlParser(policy.tmsCntn));
      });
      setPolicyCheckList(arr1);
      setPolicyCntn(arr2);
    }
  }, [policyList]);

  useEffect(() => {
    if (formData.shrNomYn === 'N') {
      setFormData(
        produce((draft) => {
          draft.nom2 = '';
          draft.cntrctrTp2 = '';
          draft.hpNoEnc2 = '';
          draft.brn2 = '';
          draft.plbzAddrZcd2 = '';
          draft.plbzAddrSec1 = '';
          draft.plbzAddrSec2 = '';
          draft.plbzLocCd2 = '';
          draft.plbzCtyCd2 = '';
          draft.hpPn2_1 = '';
          draft.hpPn2_2 = '';
        })
      );
    }
  }, [formData.shrNomYn]);

  useEffect(() => {
    if (formData.cntrctrTp2 !== '0020') {
      setFormData(
        produce((draft) => {
          draft.plbzNm2 = '';
          draft.brn2 = '';
          draft.plbzAddrZcd2 = '';
          draft.plbzAddrSec1 = '';
          draft.plbzAddrSec2 = '';
          draft.plbzLocCd2 = '';
          draft.plbzCtyCd2 = '';
        })
      );
    }
  }, [formData.cntrctrTp2]);

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.tmsCnsn = tmsCnsn;
      })
    );
  }, [tmsCnsn]);

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.hpNoEnc1 = formData.hpPn1_1 + formData.hpPn1_2;
        draft.brn1 = formData.brn1;
        draft.corpRegNo = formData.corpRegNo;
        draft.hpNoEnc2 = formData.hpPn2_1 + formData.hpPn2_2;
        draft.brn2 = formData.brn2;

        if (formData.cntrctrTp2 && formData.cntrctrTp2 === '0020') draft.cntrctrTp2 = formData.cntrctrTp2;
      })
    );
  }, [formData]);

  // Mobile Select Box : Option List Post Processing => hpPnCdList
  useEffect(() => {
    const arrTemp = [];
    hpPnCdList.map((cdItem, key) => {
      arrTemp.push(
        produce(cdItem, (draft) => {
          draft.cdValue = cdItem.value;
          draft.value = key + 1;
          if (key === 0) draft.checked = true;
        })
      );
    });

    if (arrTemp) {
      setFormData(
        produce((draft) => {
          draft.hpPn1_1 = arrTemp[0].cdId; // 코드 첫 항목 checked 처리에 따른 데이터 갱신
          draft.hpPn2_1 = arrTemp[0].cdId;
        })
      );
    }

    setHpPrefixOpt(arrTemp);
  }, [hpPnCdList]);

  // Mobile Select Box : Option List Post Processing => bankCdList
  useEffect(() => {
    const arrTemp = [];
    bankCdList.map((cdItem, key) => {
      arrTemp.push(
        produce(cdItem, (draft) => {
          draft.cdValue = cdItem.value;
          draft.value = key + 1;
          if (key === 0) draft.checked = true;
        })
      );
    });

    setBankCdOpt(arrTemp);
  }, [bankCdList]);

  // 풀페이지 팝업 START
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
  const [fpAddress, setFpAddress] = useState(false); // 주소 팝업
  const [seq, setSeq] = useState(0);

  const handleFullpagePopup = useCallback(
    (name, seq) => (e) => {
      e.preventDefault();
      if (name === 'terms') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: policyList[seq].tmsNm,
            options: ['close']
          }
        });
        setSeq(seq);
        setFpAddress(false);
        setFpTerms(true);
      } else if (name === 'Address') {
        setAddrTarget(seq);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '우편번호',
            options: ['close']
          }
        });
        setFpTerms(false);
        setFpAddress(true);
      }
    },
    [fpTerms, fpAddress]
  );

  const CloseFpPop = useCallback((e) => {
    e.preventDefault();
    setFpTerms(false);
    setFpAddress(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, []);

  const addrEvent = (e, val, target) => {
    let postTarget = '';
    let addr1Target = '';
    let locCdTarget = '';
    let ctyCdTarget = '';

    if (target === 'addr') {
      postTarget = 'zcd1';
      addr1Target = 'addr1';
      locCdTarget = 'locCd';
      ctyCdTarget = 'ctyCd';
    } else if (target === 'plbzAddr1') {
      postTarget = 'plbzAddrZcd1';
      addr1Target = 'plbzAddr1';
      locCdTarget = 'plbzLocCd1';
      ctyCdTarget = 'plbzCtyCd1';
    } else if (target === 'plbzAddr2') {
      postTarget = 'plbzAddrZcd2';
      addr1Target = 'plbzAddrSec1';
      locCdTarget = 'plbzLocCd2';
      ctyCdTarget = 'plbzCtyCd2';
    } else if (target === 'corpAddr') {
      postTarget = 'corpZcd';
      addr1Target = 'corpAddr1';
      locCdTarget = 'corpLocCd';
      ctyCdTarget = 'corpCtyCd';
    }

    setFormData(
      produce((draft) => {
        draft[postTarget] = val.postCode;
        draft[addr1Target] = val.addData;
        draft[locCdTarget] = val.locCd;
        draft[ctyCdTarget] = val.ctyCd;
      })
    );

    CloseFpPop(e);
  };

  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="service-step">
        <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={3} mode="stick" />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4 className="tit2">개인사업자 계약자정보 입력</h4>
        </div>
        <form className="service-form">
          <fieldset>
            <legend className="away">개인사업자 계약자 정보</legend>
            <table summary="개인사업자 계약자정보에 대한 내용" className="table-tp2 th-none">
              <caption className="away">개인사업자 계약자정보 입력</caption>
              <tbody>
                <tr>
                  <td>
                    공동명의 여부
                    <CheckBox className="fr" id="chk-shrNomYn" title="공동명의" checked={formData.shrNomYn === 'Y' ? true : false} onChange={(e) => onChangeCheck(e)} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">명의자</p>
                    <Input id="nom1" type="text" placeHolder="실명입력" value={formData.nom1} onKeyUp={(e) => handleOnKeyUp(e, 'nom1')} onChange={onChangeInput} maxLength={20} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">휴대폰번호</p>
                    <span className="bridge2">
                      <MobSelectBox id="hpPn1_1" uuid={true} options={hpPrefixOpt ? hpPrefixOpt : []} width="20%" onClick={(e) => onClickSelectHp(e, 'hpPn1_1')} />
                      <Input
                        id="hpPn1_2"
                        type="text"
                        onKeyUp={(e) => handleOnKeyUp(e, 'hpPn1_2')}
                        onChange={onChangeRemoveFormatInput}
                        value={formData.hpPn1_2 ? handleHpNumInput(formData.hpPn1_2) : ''}
                        maxLength={9}
                        width="42%"
                      />
                      <Button size="mid" background="blue80" radius={true} title="인증번호받기" measure={true} width={33} onClick={(e) => onClickBtn(e, 'hpNoEnc1')} />
                    </span>
                    <span className="bridge2">
                      <Input
                        id="verification1"
                        type="text"
                        placeHolder="인증번호를 입력해주세요."
                        value={verification1}
                        width="73%"
                        maxLength={6}
                        onChange={(e) => onChangeVerification(e, 'verification1')}
                      />
                      <Button size="mid" background="gray60" radius={true} title="인증확인" onClick={(e) => onClickBtn(e, 'hpNoEnc1Chk')} measure={true} width={24.5} />
                    </span>
                    {!formData.hpPn1_2 && isHp1Check && <p className="tx-sub tx-red80">휴대폰 번호를 입력해주세요.</p>}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">배송지주소</p>
                    <span className="bridge2">
                      <Input id="zcd" type="text" placeHolder="우편번호" disabled={true} width="73%" value={formData.zcd1 ? formData.zcd1 : ''} onChange={onChangeInput} />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={true} width={24.5} onClick={handleFullpagePopup('Address', 'addr')} />
                    </span>
                    <span className="bridge2">
                      <Input id="addr1" type="text" placeHolder="주소" disabled={true} value={formData.addr1 ? formData.addr1 : ''} onChange={onChangeInput} />
                    </span>
                    <span className="bridge2">
                      <Input id="addr2" type="text" placeHolder="상세주소" value={formData.addr2 ? formData.addr2 : ''} onChange={onChangeInput} />
                    </span>
                    {!formData.addr2 && isAddr1Check && <p className="tx-sub tx-red80">상세주소를 입력해주세요.</p>}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">계좌번호</p>
                    <span className="bridge2">
                      <MobSelectBox id="bankDvcd" options={bankCdOpt ? bankCdOpt : []} onClick={(e) => onClickSelectBank(e, 'bankDvcd')} width="30%" />
                      <Input
                        id="acntNoEnc"
                        type="text"
                        placeHolder="계좌번호(‘-’제외입력)"
                        value={formData.acntNoEnc ? formData.acntNoEnc : ''}
                        onKeyUp={(e) => handleOnKeyUp(e, 'acntNoEnc')}
                        onChange={onChangeInput}
                        width="67.5%"
                      />
                    </span>
                    <span className="bridge2">
                      <Input
                        id="dpstNm"
                        type="text"
                        placeHolder="예금주"
                        value={formData.dpstNm ? formData.dpstNm : ''}
                        onKeyUp={(e) => handleOnKeyUp(e, 'dpstNm')}
                        onChange={onChangeInput}
                        width="63%"
                      />
                      <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={true} width={34.5} onClick={(e) => onClickBtn(e, 'account')} />
                    </span>
                    <p className="tx-sub">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">사업장명</p>
                    <Input id="plbzNm1" type="text" value={formData.plbzNm1 ? formData.plbzNm1 : ''} onChange={onChangeInput} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">사업장등록번호</p>
                    <span className="bridge2">
                      <Input id="brn1" type="text" value={formData.brn1 ? handleBizNumInput(formData.brn1) : ''} width="100%" maxLength={12} onChange={(e) => onChangeRemoveFormatInput(e)} />
                      {/* <Button size="mid" background="blue80" radius={true} title="사업장확인" measure={true} width={34.5} /> */}
                    </span>
                    {/* <p className="tx-sub tx-red80">유효하지않은 사업장등록번호입니다.</p> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">
                      사업장주소
                      <CheckBox className="fr" id="chk-address1" title="개인주소와 동일" onChange={(e) => onChangeCheck(e)} />
                    </p>
                    <span className="bridge2">
                      <Input id="plbzAddrZcd1" type="text" value={formData.plbzAddrZcd1 ? formData.plbzAddrZcd1 : ''} disabled={true} placeHolder="우편번호" width="73%" onChange={onChangeInput} />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={true} width={24.5} onClick={handleFullpagePopup('Address', 'plbzAddr1')} />
                    </span>
                    <span className="bridge2">
                      <Input id="plbzAddr1" type="text" disabled={true} placeHolder="주소" value={formData.plbzAddr1 ? formData.plbzAddr1 : ''} onChange={onChangeInput} />
                    </span>
                    <span className="bridge2">
                      <Input id="plbzAddr2" type="text" placeHolder="상세주소" value={formData.plbzAddr2 ? formData.plbzAddr2 : ''} onChange={onChangeInput} />
                    </span>
                    {!formData.plbzAddr2 && isAddr2Check && <p className="tx-sub tx-red80">상세주소를 입력해주세요.</p>}
                  </td>
                </tr>
                {tenancy === true && (
                  <>
                    <tr>
                      <td>
                        <h4 className="tit2">
                          공동명의 개인 계약자정보 입력
                          <p className="fs12 mt5">명의자2 정보입력</p>
                          <p className="tx-tit">명의자2</p>
                          <Input
                            id="nom2"
                            type="text"
                            placeHolder="실명입력"
                            value={formData.nom2 ? formData.nom2 : ''}
                            onChange={onChangeInput}
                            onKeyUp={(e) => handleOnKeyUp(e, 'nom2')}
                            width="63%"
                            maxLength={20}
                          />
                          <span className="bridge">
                            <MobSelectBox
                              id="cntrctrTp2"
                              placeHolder="선택"
                              options={contractorTypeOpt ? contractorTypeOpt : []}
                              onClick={(e) => onClickContractorType(e, 'cntrctrTp2')}
                              width="34.5%"
                            />
                          </span>
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="tx-tit">휴대폰번호</p>
                        <span className="bridge2">
                          <MobSelectBox id="hpPn2_1" className="items-sbox" options={hpPrefixOpt ? hpPrefixOpt : []} width="20%" onClick={(e) => onClickSelectHp(e, 'hpPn2_1')} />
                          <Input
                            id="hpPn2_2"
                            type="text"
                            onKeyUp={(e) => handleOnKeyUp(e, 'hpPn2_2')}
                            onChange={onChangeRemoveFormatInput}
                            value={formData.hpPn2_2 ? handleHpNumInput(formData.hpPn2_2) : ''}
                            width="42%"
                            maxLength={9}
                          />
                          <Button size="mid" background="blue80" radius={true} title="인증번호받기" onClick={(e) => onClickBtn(e, 'hpNoEnc2')} measure={true} width={33} />
                        </span>
                        <span className="bridge2">
                          <Input
                            id="verification2"
                            value={verification2}
                            type="text"
                            placeHolder="인증번호를 입력해주세요."
                            onChange={(e) => onChangeVerification(e, 'verification2')}
                            width="73%"
                            maxLength={6}
                          />
                          <Button size="mid" background="gray60" radius={true} title="인증확인" onClick={(e) => onClickBtn(e, 'hpNoEnc2Chk')} measure={true} width={24.5} />
                        </span>
                        {!formData.hpPn2_2 && isHp2Check && <p className="tx-sub tx-red80">휴대폰 번호를 입력해주세요.</p>}
                      </td>
                    </tr>
                    {formData.cntrctrTp2 === '0020' && (
                      <>
                        <tr>
                          <td>
                            <p className="tx-tit">사업장명</p>
                            <Input id="plbzNm2" type="text" value={formData.plbzNm2 ? formData.plbzNm2 : ''} onChange={(e) => onChangeInput(e)} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">사업장등록번호</p>
                            <span className="bridge2">
                              <Input id="brn2" type="text" value={formData.brn2 ? handleBizNumInput(formData.brn2) : ''} width="100%" maxLength={12} onChange={(e) => onChangeRemoveFormatInput(e)} />
                              {/* <Button size="mid" background="blue80" radius={true} title="사업장확인" measure={true} width={34.5} /> */}
                            </span>
                            {/* <p className="tx-sub tx-red80">유효하지않은 사업장등록번호입니다.</p> */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">
                              사업장주소
                              <CheckBox className="fr" id="chk-address2" title="배송주소와 동일" onChange={(e) => onChangeCheck(e)} />
                            </p>
                            <span className="bridge2">
                              <Input
                                id="plbzAddrZcd2"
                                type="text"
                                value={formData.plbzAddrZcd2 ? formData.plbzAddrZcd2 : ''}
                                disabled={true}
                                placeHolder="우편번호"
                                width="73%"
                                onChange={onChangeInput}
                              />
                              <Button size="mid" background="blue80" radius={true} title="우편번호" measure={true} width={24.5} onClick={handleFullpagePopup('Address', 'plbzAddr2')} />
                            </span>
                            <span className="bridge2">
                              <Input id="plbzAddrSec1" type="text" disabled={true} placeHolder="주소" value={formData.plbzAddrSec1 ? formData.plbzAddrSec1 : ''} onChange={onChangeInput} />
                            </span>
                            <span className="bridge2">
                              <Input id="plbzAddrSec2" type="text" placeHolder="상세주소" value={formData.plbzAddrSec2 ? formData.plbzAddrSec2 : ''} onChange={onChangeInput} />
                            </span>
                            {!formData.plbzAddrSec2 && isAddr3Check && <p className="tx-sub tx-red80">상세주소를 입력해주세요.</p>}
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                )}
                <tr>
                  <td>
                    세금계산서
                    <RadioGroup
                      dataList={txivPblcList}
                      defaultValue={formData.txivPblcYn === 'Y' ? '0010' : formData.txivPblcYn === 'N' ? '0020' : '0000'}
                      onChange={(e) => onChangeRadio(e, 'txivPblcYn')}
                      className="fr"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">이메일</p>
                    <Input id="emlAddr" type="text" placeHolder="example@hyundaiautobell.com" value={formData.emlAddr ? formData.emlAddr : ''} onChange={onChangeInput} />
                    <p className="tx-sub mt8">차량 계약시 계약서 수신 이메일주소를 입력해주세요.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="개인사업자 계약자 정보에 대한 내용" className="table-tp2 th-none bt10">
              <caption className="away">개인사업자 계약자 정보</caption>
              <colgroup>
                <col width="100%" />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <SignUpCheckBoxGroup
                      sub_title="필수약관만 동의합니다."
                      sub_id="chk-agree-essential"
                      title="전체동의 합니다."
                      id="chk-agree-all"
                      agree_list={policyCheckList}
                      agree_term={policyCntn}
                      events={[handleFullpagePopup('terms', 0), handleFullpagePopup('terms', 1), handleFullpagePopup('terms', 2), handleFullpagePopup('terms', 3), handleFullpagePopup('terms', 4)]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>
      </div>
      <Buttons align="center" className="full">
        <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(계약자 유형 선택)" className="ws1" onClick={(e) => prevStep(e, 'choiceContractor')} />
        <Button size="big" background="blue80" title="다음 단계로" sub="(예상 결제 금액 확인)" className="ws1" onClick={(e) => nextStep(e, 'estimatedAmount')} />
      </Buttons>
      <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
        {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">{policyCntn[seq]}</div>
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>
          </div>
        )}
        {fpAddress && <FindAddress AddressEvent={addrEvent} target={addrTarget} />}
      </MobFullpagePopup>
    </AppLayout>
  );
};

ContractorInfo_2.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getCommonCodeList('FM053'));
  await reduxStore.dispatch(getCommonCodeList('FM005'));
  await reduxStore.dispatch(getPolicy({ tmsTp: '0400', tmsSbj: '0020' }));
  if (query.cntrctrTp !== '0010') await reduxStore.dispatch(getCommonCodeList('FM020'));

  return {
    query
  };
};

export default withRouter(ContractorInfo_2);
