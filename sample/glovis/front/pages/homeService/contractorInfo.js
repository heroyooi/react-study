/**
 * 설명 : 계약자정보 입력
 * @fileoverview 홈서비스>홈서비스>계약자정보 입력
 * @author 박진하
 */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import { produce } from 'immer';
import { ClipLoader } from 'react-spinners';

import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';

import AppLayout from '@src/components/layouts/AppLayout';
import FindAddress from '@src/components/common/popup/FindAddress';
import PolicyCheckBoxGroup from '@src/components/common/PolicyCheckBoxGroup';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost, apiUrl } from '@src/utils/HttpUtils';
import { getCommonCodeList, getPolicy, setInputInfo, getMbInfo } from '@src/actions/homeservice/homeserviceAction';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

const globalThis = require('globalthis')();

/**
 * 설명 : 홈서비스 신청 계약자정보 입력을 수행한다.
 */
const ContractorInfo = ({ query }) => {
  const { dlrPrdId, cntrctrTp } = query;
  const dispatch = useDispatch();
  const { showAlert, Alert, initAlert } = useContext(SystemContext);
  const [rodalShow, setRodalShow, openSearchAddr, closeSearchAddr] = useRodal(false, true);
  const { inputInfo, bankCdList, policyList, txivPblcList, hpPnCdList, mbInfo } = useSelector((state) => state.home);
  const [formData, setFormData] = useState({ ...inputInfo, dlrPrdId: dlrPrdId });
  const [flag, setFlag] = useState(0);
  const [addrCopy1, setAddrCopy1] = useState(false);
  const [addrCopy2, setAddrCopy2] = useState(false);
  const [policyCheckList, setPolicyCheckList] = useState([]);
  const [policyCntn, setPolicyCntn] = useState([]);
  const [tmsCnsn, setTmsCnsn] = useState([]);
  const [addrTarget, setAddrTarget] = useState('');
  const [authenticationNumber1, setAuthenticationNumber1] = useState('');
  const [authenticationNumber2, setAuthenticationNumber2] = useState('');
  const [verification1, setVerification1] = useState('');
  const [verification2, setVerification2] = useState('');
  const [hpPnEnc1Chk, setHpPnEnc1Chk] = useState(false);
  const [hpPnEnc2Chk, setHpPnEnc2Chk] = useState(false);
  const [accountChk, setAccountChk] = useState(false);
  const [timer, setTimer] = useState();
  const [timerFlag1, setTimerFlag1] = useState(true);
  const [timeView1, setTimeView1] = useState();
  const [timerFlag2, setTimerFlag2] = useState(true);
  const [timeView2, setTimeView2] = useState();
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('홈서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login';
      });
    }
  }, []);

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
          showAlert('인증번호가 만료 되었습니다.', 'error');
        }
      }, 1000)
    );
  };

  const { homeServiceOnGoing } = useSelector((state) => state.home);
  useDetectPageRefresh(homeServiceOnGoing, '/homeService/homeService');

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

  const onlyNumber = /[0-9\b]+$/;
  const onlyEng = /[a-zA-Z\b]+$/;
  const onlyKor = /[ㄱ-ㅎㅏ-ㅣ가-힣\b]+$/;
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
      if (target.includes('hpPn') || target.includes('acntno') || target.includes('brn') || target.includes('corpReg')) {
        if (val !== '' && !onlyNumber.test(val)) {
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

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setFormData(
      produce((draft) => {
        draft[id] = value;
      })
    );
  };

  const onChangeSelect = (e, target) => {
    const { value } = e;
    setFormData(
      produce((draft) => {
        draft[target] = value;
      })
    );
  };

  const onChangeCheck = (e) => {
    const { checked } = e.target;
    const id = e.target.id.split('chk-')[1];

    if (!id.includes('Copy')) {
      setFormData(
        produce((draft) => {
          draft[id] = checked === true ? 'Y' : 'N';
        })
      );
    } else {
      if (cntrctrTp !== '0030') {
        if (checked && (formData.zcd1 === '' || formData.addr1 === '' || formData.addr2 === '')) {
          setAddrCopy1(!checked);
          return showAlert('배송지주소를 입력해주세요.', 'error');
        }
      } else {
        if (checked && (formData.corpZcd === '' || formData.corpAddr1 === '' || formData.corpAddr2 === '')) {
          setAddrCopy2(!checked);
          return showAlert('법인주소를 입력해주세요.', 'error');
        }
      }
      setFormData(
        produce((draft) => {
          if (cntrctrTp !== '0030') {
            draft[id.includes('1') ? 'plbzAddrZcd1' : 'plbzAddrZcd2'] = checked === true ? formData.zcd1 : '';
            draft[id.includes('1') ? 'plbzAddr1' : 'plbzAddrSec1'] = checked === true ? formData.addr1 : '';
            draft[id.includes('1') ? 'plbzAddr2' : 'plbzAddrSec2'] = checked === true ? formData.addr2 : '';
            draft[id.includes('1') ? 'plbzLocCd1' : 'plbzLocCd2'] = checked === true ? formData.locCd : '';
            draft[id.includes('1') ? 'plbzCtyCd1' : 'plbzCtyCd2'] = checked === true ? formData.ctyCd : '';
          } else {
            draft.zcd1 = checked === true ? formData.corpZcd : '';
            draft.addr1 = checked === true ? formData.corpAddr1 : '';
            draft.addr2 = checked === true ? formData.corpAddr2 : '';
            draft.locCd = checked === true ? formData.corpLocCd : '';
            draft.ctyCd = checked === true ? formData.corpCtyCd : '';
          }
        })
      );
      if (id.includes('1')) setAddrCopy1(checked);
      if (id.includes('2')) setAddrCopy2(checked);
    }
  };

  const onChangeRadio = (e, target) => {
    const { value } = e.target;
    setFormData(
      produce((draft) => {
        draft[target] = target !== 'txivPblcYn' ? value : value === '0010' ? 'Y' : value === '0020' ? 'N' : '';
      })
    );
  };

  const onChangePolicy = (e, index) => {
    const { checked } = e.target;
    const allYn = e.target.id.includes('all');

    if (allYn) {
      if (checked) {
        setTmsCnsn(
          policyList.map((v) => {
            return { tmsId: v.tmsId, cnsnYn: 'Y' };
          })
        );
      } else setTmsCnsn([]);
    } else {
      if (checked) setTmsCnsn([...tmsCnsn, { tmsId: policyList[index].tmsId, cnsnYn: 'Y' }]);
      else setTmsCnsn(tmsCnsn.filter((el) => el.tmsId !== policyList[index].tmsId));
    }
  };

  const validationChk = () => {
    if (cntrctrTp !== '0030') {
      if (formData.nom1 === '') {
        showAlert('명의자 이름을 입력하세요.', 'error');
        return false;
      }
      if (cntrctrTp === '0020') {
        if (formData.plbzNm1 === '') {
          showAlert('사업자명을 입력하세요.', 'error');
          return false;
        } else if (formData.plbzAddrZcd1 === '' || formData.plbzAddr1 === '' || formData.plbzAddr2 === '') {
          showAlert('사업장 주소를 입력하세요.', 'error');
          return false;
        }
      }
    } else {
      if (formData.corpNm === '') {
        showAlert('법인명을 입력하세요.', 'error');
        return false;
      } else if (formData.corpRegNo1 === '' || formData.corpRegNo2 === '') {
        showAlert('법인등록번호를 입력하세요.', 'error');
        return false;
      } else if (formData.corpZcd === '' || formData.corpAddr1 === '' || formData.corpAddr2 === '') {
        showAlert('법인주소를 입력하세요.', 'error');
        return false;
      }
    }

    if (cntrctrTp !== '0010') {
      if (formData.brn1_1 === '' || formData.brn1_2 === '' || formData.brn1_3 === '') {
        showAlert('사업자등록번호를 입력하세요.', 'error');
        return false;
      } else if (formData.txivPblcYn === '') {
        showAlert('세금계산서 발행 여부를 선택하세요.', 'error');
        return false;
      }
    }

    if (formData.hpPn1_1 === '' || formData.hpPn1_2 === '' || formData.hpPn1_3 === '') {
      showAlert('휴대폰 번호를 입력하세요.', 'error');
      return false;
    } else if (formData.zcd1 === '' || formData.addr1 === '' || formData.addr2 === '') {
      showAlert('배송지 주소를 입력하세요.', 'error');
      return false;
    } else if (formData.bankDvcd === '') {
      showAlert('은행을 선택하세요.', 'error');
      return false;
    } else if (formData.acntNoEnc === '') {
      showAlert('계좌번호를 입력하세요.', 'error');
      return false;
    } else if (formData.dpstNm === '') {
      showAlert('예금주를 입력하세요.', 'error');
      return false;
    } else if (formData.emlAddr === '') {
      showAlert('이메일을 입력하세요.', 'error');
      return false;
    } else if (formData.cntrSignTpcd === '') {
      showAlert('차량양도 계약서 서명방식을 선택하세요.', 'error');
      return false;
    }

    if (cntrctrTp !== '0030') {
      if (!checkKor.test(formData.nom1)) {
        showAlert('명의자 이름을 올바르게 입력하세요.', 'error');
        return false;
      }
    }
    if (!checkKor.test(formData.dpstNm)) {
      showAlert('예금주 이름을 올바르게 입력하세요.', 'error');
      return false;
    }
    if (!checkEmail.test(formData.emlAddr)) {
      showAlert('이메일 형식이 올바르지 않습니다.', 'error');
      return false;
    }

    if (hpPnEnc1Chk === false) {
      showAlert('휴대폰 번호 인증을 진행해 주세요.', 'error');
      return false;
    }

    if (accountChk === false) {
      showAlert('계좌번호 인증을 진행해 주세요.', 'error');
      return false;
    }

    if (formData.shrNomYn === 'Y') {
      if (formData.cntrctrTp2 === '') {
        showAlert('공동 명의자 유형을 선택하세요.', 'error');
        return false;
      } else if (formData.nom2 === '') {
        showAlert('공동 명의자 이름을 입력하세요.', 'error');
        return false;
      } else if (formData.hpPn2_1 === '' || formData.hpPn2_2 === '' || formData.hpPn2_3 === '') {
        showAlert('공동 명의자 휴대폰 번호를 입력하세요.', 'error');
        return false;
      }
      if (formData.cntrctrTp2 === '0020') {
        if (formData.plbzNm2 === '') {
          showAlert('사업자명을 입력하세요.', 'error');
          return false;
        } else if (formData.brn2_1 === '' || formData.brn2_2 === '' || formData.brn2_3 === '') {
          showAlert('사업자등록번호를 입력하세요.', 'error');
          return false;
        } else if (formData.plbzAddrZcd2 === '' || formData.plbzAddrSec1 === '' || formData.plbzAddrSec2 === '') {
          showAlert('사업장 주소를 입력하세요.', 'error');
          return false;
        }
      }
      if (!checkKor.test(formData.nom2)) {
        showAlert('공동 명의자 이름을 올바르게 입력하세요.', 'error');
        return false;
      }
      if (hpPnEnc2Chk === false) {
        showAlert('공동 명의자 휴대폰 번호 인증을 진행해 주세요.', 'error');
        return false;
      }
    }

    for (const idx in policyCheckList) {
      if (document.getElementById(policyCheckList[idx].id).checked === false) {
        showAlert(policyCheckList[idx].title + ' 동의를 해주세요.', 'error');
        return false;
      }
    }

    return true;
  };

  const prevStep = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Router.push(`/homeService/choiceContractor?dlrPrdId=${dlrPrdId}&cntrctrTp=${cntrctrTp}`).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setFlag(1);
    if (validationChk()) {
      setFlag(2);
      setIsLoading(true);
      dispatch(setInputInfo(formData));
      Router.push(`/homeService/estimatedAmount?dlrPrdId=${dlrPrdId}&cntrctrTp=${cntrctrTp}`).then(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      });
    }
  };

  const onSearchAddr = (e, target) => {
    e.preventDefault();
    setAddrTarget(target);
    setRodalShow(true);
  };

  const addrEvent = (e, target) => {
    console.log(e);

    let postTarget = '';
    let addr1Target = '';
    let addr2Target = '';
    let locCdTarget = '';
    let ctyCdTarget = '';

    if (target === 'addr') {
      postTarget = 'zcd1';
      addr1Target = 'addr1';
      addr2Target = 'addr2';
      locCdTarget = 'locCd';
      ctyCdTarget = 'ctyCd';
    } else if (target === 'plbzAddr1') {
      postTarget = 'plbzAddrZcd1';
      addr1Target = 'plbzAddr1';
      addr2Target = 'plbzAddr2';
      locCdTarget = 'plbzLocCd1';
      ctyCdTarget = 'plbzCtyCd1';
    } else if (target === 'plbzAddr2') {
      postTarget = 'plbzAddrZcd2';
      addr1Target = 'plbzAddrSec1';
      addr2Target = 'plbzAddrSec2';
      locCdTarget = 'plbzLocCd2';
      ctyCdTarget = 'plbzCtyCd2';
    } else if (target === 'corpAddr') {
      postTarget = 'corpZcd';
      addr1Target = 'corpAddr1';
      addr2Target = 'corpAddr2';
      locCdTarget = 'corpLocCd';
      ctyCdTarget = 'corpCtyCd';
    }
    setFormData(
      produce((draft) => {
        draft[postTarget] = e.postCode;
        draft[addr1Target] = e.addData;
        draft[addr2Target] = e.detailText;
        draft[locCdTarget] = e.locCd;
        draft[ctyCdTarget] = e.ctyCd;
      })
    );
    closeSearchAddr();
  };

  const onClickBtn = (e, target) => {
    e.preventDefault();
    if (target === 'hpNoEnc1') {
      if (formData.hpNoEnc1) {
        setIsLoading(true);
        axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.hpNoEnc1 }).then(({ data }) => {
          setIsLoading(false);
          if (data.statusinfo.returncd === '000') {
            showAlert(data.statusinfo.returnmsg, 'ok');
            setAuthenticationNumber1(data.authenticationNumber);
            clearInterval(timer);
            startTimer(180, target);
          } else if (data.statusinfo.returncd === 'MBR4005') {
            // showAlert('로그인세션이 만료되었습니다.<br/>로그인페이지로 이동합니다.', () => {
            //   Router.push('/login');
            // });
            globalThis.window.location.href = '/login';
          } else {
            showAlert(data.statusinfo.returnmsg, 'error');
          }
        });
      } else {
        showAlert('휴대폰 번호를 입력해주세요.', 'error');
      }
    } else if (target === 'hpNoEnc2') {
      if (formData.hpNoEnc2) {
        setIsLoading(true);
        axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.hpNoEnc2 }).then(({ data }) => {
          setIsLoading(false);
          if (data.statusinfo.returncd === '000') {
            showAlert(data.statusinfo.returnmsg, 'ok');
            setAuthenticationNumber2(data.authenticationNumber);
            clearInterval(timer);
            startTimer(180, target);
          } else if (data.statusinfo.returncd === 'MBR4005') {
            // showAlert('로그인세션이 만료되었습니다.<br/>로그인페이지로 이동합니다.', () => {
            //   Router.push('/login');
            // });
            globalThis.window.location.href = '/login';
          } else {
            showAlert(data.statusinfo.returnmsg, 'error');
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
      if (formData.bankDvcd === '' || formData.bankDvcd === undefined) return showAlert('은행을 선택해주세요.', 'error');
      if (formData.acntNoEnc === '' || formData.acntNoEnc === undefined) return showAlert('계좌번호를 입력해주세요.', 'error');
      if (formData.dpstNm === '' || formData.dpstNm === undefined) return showAlert('예금주명을 입력해주세요.', 'error');
      if (formData?.bankDvcd && formData?.acntNoEnc && formData?.dpstNm) {
        const accountChkData = {
          banksett: formData.bankDvcd,
          noacct: formData.acntNoEnc,
          nmcomp: formData.dpstNm,
          rltURL: `${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`
        };
        console.log('accountChkData >>>', accountChkData);
        setIsLoading(true);
        axiosPost('/api/admin/homeservice/callUrlConnection.do', accountChkData).then(({ data }) => {
          console.log(`accountChk Return URL >>> ${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`);
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
    const { value } = e.target;
    if (target === 'verification1') setVerification1(value);
    else if (target === 'verification2') setVerification2(value);
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
          draft.hpPn1_2 = formData?.hpPn1_2 ? formData?.hpPn1_2 : mbInfo.mbHpPn.substr(3, 4);
          draft.hpPn1_3 = formData?.hpPn1_3 ? formData?.hpPn1_3 : mbInfo.mbHpPn.substr(7, 4);
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
        arr1.push({ id: 'chk-agree-' + (index + 1), title: policy.tmsNm, checked: false, indYn: policy.indYn });
        //arr2.push({ id: index + 1, value: ReactHtmlParser(policy.tmsCntn) });
        arr2.push({ id: index + 1, value: policy.tmsCntn });
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
          draft.hpPn2_3 = '';
          draft.brn2_1 = '';
          draft.brn2_2 = '';
          draft.brn2_3 = '';
        })
      );
    }
  }, [formData.shrNomYn]);

  useEffect(() => {
    if (formData.ccntrctrTp2 !== '0020') {
      setFormData(
        produce((draft) => {
          draft.plbzNm2 = '';
          draft.brn2 = '';
          draft.plbzAddrZcd2 = '';
          draft.plbzAddrSec1 = '';
          draft.plbzAddrSec2 = '';
          draft.plbzLocCd2 = '';
          draft.plbzCtyCd2 = '';
          draft.brn2_1 = '';
          draft.brn2_2 = '';
          draft.brn2_3 = '';
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
        draft.hpNoEnc1 = formData.hpPn1_1 + formData.hpPn1_2 + formData.hpPn1_3;
        draft.brn1 = formData.brn1_1 + formData.brn1_2 + formData.brn1_3;
        draft.corpRegNo = formData.corpRegNo1 + formData.corpRegNo2;
        draft.hpNoEnc2 = formData.hpPn2_1 + formData.hpPn2_2 + formData.hpPn2_3;
        draft.brn2 = formData.brn2_1 + formData.brn2_2 + formData.brn2_3;
      })
    );
  }, [formData]);

  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{ paddingTop: 103 }}>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={3} />
      </div>
      <div className="content-sec">
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4>
              <em>{cntrctrTp === '0010' ? '개인' : cntrctrTp === '0020' ? '개인사업자' : '법인사업자'}</em> 계약자정보 입력
            </h4>
          </div>
          <form className="service-form">
            <fieldset>
              <legend className="away">계약자 정보</legend>
              {cntrctrTp !== '0030' && (
                <table summary="계약자 정보에 대한 내용" className="table-tp2 row1">
                  <caption className="away">계약자 정보</caption>
                  <colgroup>
                    <col width="12.58%" />
                    <col width="*" />
                  </colgroup>

                  <tbody>
                    <tr>
                      <th>공동명의 여부</th>
                      <td>
                        <CheckBox id="chk-shrNomYn" title="공동명의" checked={formData.shrNomYn === 'Y' ? true : false} onChange={(e) => onChangeCheck(e)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              <table summary="개인 계약자 정보에 대한 내용" className="table-tp2">
                <caption className="away">개인 계약자 정보</caption>
                <colgroup>
                  {cntrctrTp !== '0010' ? (
                    <>
                      <col width="12.58%" />
                      <col width="37.78%" />
                      <col width="12.58%" />
                      <col width="*" />
                    </>
                  ) : (
                    <>
                      <col width="12.58%" />
                      <col width="*" />
                    </>
                  )}
                </colgroup>
                <tbody>
                  {cntrctrTp !== '0030' ? (
                    <>
                      <tr>
                        <th>명의자</th>
                        <td colSpan={cntrctrTp === '0010' ? '1' : '3'}>
                          <Input type="text" placeHolder="실명입력" value={formData.nom1} id="nom1" width={272} onKeyUp={(e) => handleOnKeyUp(e, 'nom1')} onChange={onChangeInput} maxLength={20} />
                        </td>
                      </tr>
                      <tr>
                        <th>휴대폰 번호</th>
                        <td colSpan={cntrctrTp === '0010' ? '1' : '3'}>
                          <span className="bridge">
                            <SelectBox
                              id="hpPn1_1"
                              className="items-sbox"
                              options={hpPnCdList ? hpPnCdList : []}
                              value={formData.hpPn1_1 ? formData.hpPn1_1 : '000'}
                              width={131}
                              height={48}
                              onChange={(e) => onChangeSelect(e, 'hpPn1_1')}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              type="text"
                              value={formData.hpPn1_2 ? formData.hpPn1_2 : ''}
                              id="hpPn1_2"
                              width={131}
                              onKeyUp={(e) => handleOnKeyUp(e, 'hpPn1_2')}
                              onChange={onChangeInput}
                              maxLength={4}
                              placeType={4}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              type="text"
                              value={formData.hpPn1_3 ? formData.hpPn1_3 : ''}
                              id="hpPn1_3"
                              width={131}
                              onKeyUp={(e) => handleOnKeyUp(e, 'hpPn1_3')}
                              onChange={onChangeInput}
                              maxLength={4}
                              placeType={4}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          {hpPnEnc1Chk === false ? (
                            <>
                              <span className="bridge">
                                <Button size="mid" background="gray" title="인증번호 받기" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc1')} />
                              </span>
                              <span className="bridge">
                                <Input
                                  type="text"
                                  placeHolder="인증번호 입력"
                                  value={verification1}
                                  id="verification1"
                                  width={170}
                                  onChange={(e) => onChangeVerification(e, 'verification1')}
                                  maxLength={6}
                                />
                              </span>
                              <Button size="mid" background="gray" title="인증확인" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc1Chk')} />
                              <em>
                                <p className="p-feedback">{timeView1}</p>
                              </em>
                            </>
                          ) : (
                            <Button size="mid" background="blue80" title="인증완료" width={131} height={48} disabled={true} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>배송지 주소</th>
                        <td colSpan={cntrctrTp === '0010' ? '1' : '3'}>
                          <span className="bridge2">
                            <Input id="zcd" type="text" placeHolder="우편번호" disabled={true} width={272} value={formData.zcd1 ? formData.zcd1 : ''} onChange={onChangeInput} />
                            &nbsp;&nbsp;
                            <Button size="mid" background="gray" title="우편번호" width={131} height={48} onClick={(e) => onSearchAddr(e, 'addr')} />
                          </span>
                          <br />
                          <span className="bridge">
                            <Input id="addr1" type="text" placeHolder="주소" disabled={true} width={413} value={formData.addr1 ? formData.addr1 : ''} onChange={onChangeInput} />
                          </span>
                          <Input id="addr2" type="text" placeHolder="상세주소" width={555} value={formData.addr2 ? formData.addr2 : ''} onChange={onChangeInput} />
                          {flag === 1 && isEmpty(formData.addr2) && <p className="p-feedback">상세주소를 입력해주세요.</p>}
                        </td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td colSpan={cntrctrTp === '0010' ? '1' : '3'}>
                          <p className="ment-tit">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                          <span className="bridge">
                            <SelectBox
                              id="bankDvcd"
                              className="items-sbox"
                              placeHolder="은행명"
                              options={bankCdList ? bankCdList : []}
                              value={formData.bankDvcd ? formData.bankDvcd : ''}
                              onChange={(e) => onChangeSelect(e, 'bankDvcd')}
                              width={272}
                              height={48}
                              disabled={accountChk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="acntNoEnc"
                              type="text"
                              placeHolder="계좌번호( ‘ - ‘ 제외 입력)"
                              value={formData.acntNoEnc ? formData.acntNoEnc : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'acntNoEnc')}
                              onChange={onChangeInput}
                              width={273}
                              disabled={accountChk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="dpstNm"
                              type="text"
                              placeHolder="예금주"
                              value={formData.dpstNm ? formData.dpstNm : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'dpstNm')}
                              onChange={onChangeInput}
                              width={272}
                              maxLength={20}
                              disabled={accountChk}
                            />
                          </span>
                          {accountChk === false ? (
                            <Button size="mid" background="gray" title="계좌인증" width={131} height={48} onClick={(e) => onClickBtn(e, 'account')} />
                          ) : (
                            <Button size="mid" background="blue80" title="인증완료" width={131} height={48} disabled={true} />
                          )}
                        </td>
                      </tr>
                      {cntrctrTp === '0020' ? (
                        <>
                          <tr>
                            <th>사업자명</th>
                            <td>
                              <Input id="plbzNm1" type="text" width={272} value={formData.plbzNm1 ? formData.plbzNm1 : ''} onChange={onChangeInput} />
                            </td>
                            <th>사업자등록번호</th>
                            <td>
                              <span className="bridge">
                                <Input
                                  id="brn1_1"
                                  type="text"
                                  width={131}
                                  value={formData.brn1_1 ? formData.brn1_1 : ''}
                                  onKeyUp={(e) => handleOnKeyUp(e, 'brn1_1')}
                                  onChange={onChangeInput}
                                  placeType={4}
                                  maxLength={3}
                                />
                              </span>
                              <span className="bridge">
                                <Input
                                  id="brn1_2"
                                  type="text"
                                  width={131}
                                  value={formData.brn1_2 ? formData.brn1_2 : ''}
                                  onKeyUp={(e) => handleOnKeyUp(e, 'brn1_2')}
                                  onChange={onChangeInput}
                                  placeType={4}
                                  maxLength={2}
                                />
                              </span>
                              <Input
                                id="brn1_3"
                                type="text"
                                width={131}
                                value={formData.brn1_3 ? formData.brn1_3 : ''}
                                onKeyUp={(e) => handleOnKeyUp(e, 'brn1_3')}
                                onChange={onChangeInput}
                                placeType={4}
                                maxLength={5}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>사업장 주소</th>
                            <td colSpan="3">
                              <span className="bridge2">
                                <Input
                                  id="plbzAddrZcd1"
                                  type="text"
                                  placeHolder="우편번호"
                                  disabled={true}
                                  width={272}
                                  value={formData.plbzAddrZcd1 ? formData.plbzAddrZcd1 : ''}
                                  onChange={onChangeInput}
                                />
                                &nbsp;&nbsp;
                                {addrCopy1 ? <></> : <Button size="mid" background="gray" title="우편번호" width={131} height={48} onClick={(e) => onSearchAddr(e, 'plbzAddr1')} />}
                                &nbsp;&nbsp;
                                <CheckBox id="chk-addrCopy1" title="개인주소와 동일" value={addrCopy1} checked={addrCopy1} onChange={(e) => onChangeCheck(e)} />
                              </span>
                              <br />
                              <span className="bridge">
                                <Input id="plbzAddr1" type="text" placeHolder="주소" disabled={true} width={413} value={formData.plbzAddr1 ? formData.plbzAddr1 : ''} onChange={onChangeInput} />
                              </span>
                              <Input id="plbzAddr2" type="text" placeHolder="상세주소" disabled={addrCopy1} width={555} value={formData.plbzAddr2 ? formData.plbzAddr2 : ''} onChange={onChangeInput} />
                            </td>
                          </tr>
                          <tr>
                            <th>세금계산서</th>
                            <td>
                              <RadioGroup
                                dataList={txivPblcList}
                                defaultValue={formData.txivPblcYn === 'Y' ? '0010' : formData.txivPblcYn === 'N' ? '0020' : '0000'}
                                onChange={(e) => onChangeRadio(e, 'txivPblcYn')}
                              />
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>법인명</th>
                        <td colSpan="3">
                          <Input type="text" value={formData.corpNm} id="corpNm" width={272} onKeyUp={(e) => handleOnKeyUp(e, 'corpNm')} onChange={onChangeInput} maxLength={20} />
                        </td>
                      </tr>
                      <tr>
                        <th>법인등록번호</th>
                        <td>
                          <span className="bridge">
                            <Input
                              id="corpRegNo1"
                              type="text"
                              width={131}
                              value={formData.corpRegNo1 ? formData.corpRegNo1 : ''}
                              onChange={onChangeInput}
                              onKeyUp={(e) => handleOnKeyUp(e, 'corpRegNo1')}
                              placeType={4}
                              maxLength={6}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="corpRegNo2"
                              type="text"
                              width={131}
                              value={formData.corpRegNo2 ? formData.corpRegNo2 : ''}
                              onChange={onChangeInput}
                              onKeyUp={(e) => handleOnKeyUp(e, 'corpRegNo2')}
                              placeType={4}
                              maxLength={7}
                            />
                          </span>
                        </td>
                        <th>사업자등록번호</th>
                        <td>
                          <span className="bridge">
                            <Input
                              id="brn1_1"
                              type="text"
                              width={131}
                              value={formData.brn1_1 ? formData.brn1_1 : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'brn1_1')}
                              onChange={onChangeInput}
                              placeType={4}
                              maxLength={3}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="brn1_2"
                              type="text"
                              width={131}
                              value={formData.brn1_2 ? formData.brn1_2 : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'brn1_2')}
                              onChange={onChangeInput}
                              placeType={4}
                              maxLength={2}
                            />
                          </span>
                          <Input
                            id="brn1_3"
                            type="text"
                            width={131}
                            value={formData.brn1_3 ? formData.brn1_3 : ''}
                            onKeyUp={(e) => handleOnKeyUp(e, 'brn1_3')}
                            onChange={onChangeInput}
                            placeType={4}
                            maxLength={5}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>법인주소</th>
                        <td colSpan="3">
                          <span className="bridge2">
                            <Input id="corpZcd" type="text" placeHolder="우편번호" disabled={true} width={272} value={formData.corpZcd ? formData.corpZcd : ''} onChange={onChangeInput} />
                            &nbsp;&nbsp;
                            <Button size="mid" background="gray" title="우편번호" width={131} height={48} onClick={(e) => onSearchAddr(e, 'corpAddr')} />
                          </span>
                          <br />
                          <span className="bridge">
                            <Input id="corpAddr1" type="text" placeHolder="주소" disabled={true} width={413} value={formData.corpAddr1 ? formData.corpAddr1 : ''} onChange={onChangeInput} />
                          </span>
                          <Input id="corpAddr2" type="text" placeHolder="상세주소" width={555} value={formData.corpAddr2 ? formData.corpAddr2 : ''} onChange={onChangeInput} />
                        </td>
                      </tr>
                      <tr>
                        <th>휴대폰 번호</th>
                        <td colSpan="3">
                          <span className="bridge">
                            <SelectBox
                              id="hpPn1_1"
                              className="items-sbox"
                              options={hpPnCdList ? hpPnCdList : []}
                              value={formData.hpPn1_1 ? formData.hpPn1_1 : '000'}
                              width={131}
                              height={48}
                              onChange={(e) => onChangeSelect(e, 'hpPn1_1')}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              type="text"
                              value={formData.hpPn1_2 ? formData.hpPn1_2 : ''}
                              id="hpPn1_2"
                              width={131}
                              onKeyUp={(e) => handleOnKeyUp(e, 'hpPn1_2')}
                              onChange={onChangeInput}
                              maxLength={4}
                              placeType={4}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              type="text"
                              value={formData.hpPn1_3 ? formData.hpPn1_3 : ''}
                              id="hpPn1_3"
                              width={131}
                              onKeyUp={(e) => handleOnKeyUp(e, 'hpPn1_3')}
                              onChange={onChangeInput}
                              maxLength={4}
                              placeType={4}
                              disabled={hpPnEnc1Chk}
                            />
                          </span>
                          {hpPnEnc1Chk === false ? (
                            <>
                              <span className="bridge">
                                <Button size="mid" background="gray" title="인증번호 받기" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc1')} />
                              </span>
                              <span className="bridge">
                                <Input
                                  type="text"
                                  placeHolder="인증번호 입력"
                                  value={verification1}
                                  id="verification1"
                                  width={170}
                                  onChange={(e) => onChangeVerification(e, 'verification1')}
                                  maxLength={6}
                                />
                              </span>
                              <Button size="mid" background="gray" title="인증확인" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc1Chk')} />
                              <em>
                                <p className="p-feedback">{timeView1}</p>
                              </em>
                            </>
                          ) : (
                            <Button size="mid" background="blue80" title="인증완료" width={131} height={48} disabled={true} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td colSpan="3">
                          <p className="ment-tit">차액 이전비 또는 차량대금 환불받을 때 필요한 계좌를 입력해주세요.</p>
                          <span className="bridge">
                            <SelectBox
                              id="bankDvcd"
                              className="items-sbox"
                              placeHolder="은행명"
                              options={bankCdList ? bankCdList : []}
                              value={formData.bankDvcd ? formData.bankDvcd : ''}
                              onChange={(e) => onChangeSelect(e, 'bankDvcd')}
                              width={272}
                              height={48}
                              disabled={accountChk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="acntNoEnc"
                              type="text"
                              placeHolder="계좌번호( ‘ - ‘ 제외 입력)"
                              value={formData.acntNoEnc ? formData.acntNoEnc : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'acntNoEnc')}
                              onChange={onChangeInput}
                              width={273}
                              disabled={accountChk}
                            />
                          </span>
                          <span className="bridge">
                            <Input
                              id="dpstNm"
                              type="text"
                              placeHolder="예금주"
                              value={formData.dpstNm ? formData.dpstNm : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'dpstNm')}
                              onChange={onChangeInput}
                              width={272}
                              maxLength={20}
                              disabled={accountChk}
                            />
                          </span>
                          {accountChk === false ? (
                            <Button size="mid" background="gray" title="계좌인증" width={131} height={48} onClick={(e) => onClickBtn(e, 'account')} />
                          ) : (
                            <Button size="mid" background="blue80" title="인증완료" width={131} height={48} disabled={true} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>세금계산서</th>
                        <td>
                          <RadioGroup
                            dataList={txivPblcList}
                            defaultValue={formData.txivPblcYn === 'Y' ? '0010' : formData.txivPblcYn === 'N' ? '0020' : '0000'}
                            onChange={(e) => onChangeRadio(e, 'txivPblcYn')}
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              {formData.shrNomYn === 'Y' && (
                <table summary="계약자 정보에 대한 내용" className="table-tp2">
                  <caption className="away">계약자 정보</caption>
                  <colgroup>
                    <col width="12.68%" />
                    <col width="37.77%" />
                    <col width="12.68%" />
                    <col width="37.77%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>명의자2</th>
                      <td colSpan="3">
                        <span className="bridge">
                          <Input
                            type="text"
                            placeHolder="실명입력"
                            value={formData.nom2 ? formData.nom2 : ''}
                            id="nom2"
                            width={272}
                            onKeyUp={(e) => handleOnKeyUp(e, 'nom2')}
                            onChange={onChangeInput}
                            maxLength={20}
                          />
                        </span>
                        <SelectBox
                          id="cntrctrTp2"
                          className="items-sbox"
                          options={[
                            { value: '', label: '선택' },
                            { value: '0010', label: '개인' },
                            { value: '0020', label: '개인사업자' }
                          ]}
                          value={formData.cntrctrTp2 ? formData.cntrctrTp2 : ''}
                          onChange={(e) => onChangeSelect(e, 'cntrctrTp2')}
                          width={131}
                          height={48}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td colSpan="3">
                        <span className="bridge">
                          <SelectBox
                            id="hpPn2_1"
                            className="items-sbox"
                            options={hpPnCdList ? hpPnCdList : []}
                            value={formData.hpPn2_1 ? formData.hpPn2_1 : '000'}
                            width={131}
                            height={48}
                            onChange={(e) => onChangeSelect(e, 'hpPn2_1')}
                            disabled={hpPnEnc2Chk}
                          />
                        </span>
                        <span className="bridge">
                          <Input
                            type="text"
                            value={formData.hpPn2_2 ? formData.hpPn2_2 : ''}
                            id="hpPn2_2"
                            width={131}
                            onKeyUp={(e) => handleOnKeyUp(e, 'hpPn2_2')}
                            onChange={onChangeInput}
                            maxLength={4}
                            placeType={4}
                            disabled={hpPnEnc2Chk}
                          />
                        </span>
                        <span className="bridge">
                          <Input
                            type="text"
                            value={formData.hpPn2_3 ? formData.hpPn2_3 : ''}
                            id="hpPn2_3"
                            width={131}
                            onKeyUp={(e) => handleOnKeyUp(e, 'hpPn2_3')}
                            onChange={onChangeInput}
                            maxLength={4}
                            placeType={4}
                            disabled={hpPnEnc2Chk}
                          />
                        </span>
                        {hpPnEnc2Chk === false ? (
                          <>
                            <span className="bridge">
                              <Button size="mid" background="gray" title="인증번호 받기" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc2')} />
                            </span>
                            <span className="bridge">
                              <Input
                                type="text"
                                placeHolder="인증번호 입력"
                                value={verification2}
                                id="verification2"
                                width={170}
                                onChange={(e) => onChangeVerification(e, 'verification2')}
                                maxLength={6}
                              />
                            </span>
                            <Button size="mid" background="gray" title="인증확인" width={131} height={48} onClick={(e) => onClickBtn(e, 'hpNoEnc2Chk')} />
                            <em>
                              <p className="p-feedback">{timeView2}</p>
                            </em>
                          </>
                        ) : (
                          <Button size="mid" background="blue80" title="인증완료" width={131} height={48} disabled={true} />
                        )}
                      </td>
                    </tr>
                    {formData.cntrctrTp2 === '0020' ? (
                      <>
                        <tr>
                          <th>사업자명</th>
                          <td>
                            <Input id="plbzNm2" type="text" width={272} value={formData.plbzNm2 ? formData.plbzNm2 : ''} onChange={onChangeInput} />
                          </td>
                          <th>사업자등록번호</th>
                          <td>
                            <span className="bridge">
                              <Input
                                id="brn2_1"
                                type="text"
                                width={131}
                                value={formData.brn2_1 ? formData.brn2_1 : ''}
                                onKeyUp={(e) => handleOnKeyUp(e, 'brn2_1')}
                                onChange={onChangeInput}
                                placeType={4}
                                maxLength={3}
                              />
                            </span>
                            <span className="bridge">
                              <Input
                                id="brn2_2"
                                type="text"
                                width={131}
                                value={formData.brn2_2 ? formData.brn2_2 : ''}
                                onKeyUp={(e) => handleOnKeyUp(e, 'brn2_2')}
                                onChange={onChangeInput}
                                placeType={4}
                                maxLength={2}
                              />
                            </span>
                            <Input
                              id="brn2_3"
                              type="text"
                              width={131}
                              value={formData.brn2_3 ? formData.brn2_3 : ''}
                              onKeyUp={(e) => handleOnKeyUp(e, 'brn2_3')}
                              onChange={onChangeInput}
                              placeType={4}
                              maxLength={5}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>사업장 주소</th>
                          <td colSpan="3">
                            <span className="bridge2">
                              <Input
                                id="plbzAddrZcd2"
                                type="text"
                                placeHolder="우편번호"
                                disabled={true}
                                width={272}
                                value={formData.plbzAddrZcd2 ? formData.plbzAddrZcd2 : ''}
                                onChange={onChangeInput}
                              />
                              &nbsp;&nbsp;
                              {addrCopy2 ? <></> : <Button size="mid" background="gray" title="우편번호" width={131} height={48} onClick={(e) => onSearchAddr(e, 'plbzAddr2')} />}
                              &nbsp;&nbsp;
                              <CheckBox id="chk-addrCopy2" title="개인주소와 동일" value={addrCopy2} checked={addrCopy2} onChange={(e) => onChangeCheck(e)} />
                            </span>
                            <br />
                            <span className="bridge">
                              <Input id="plbzAddrSec1" type="text" placeHolder="주소" disabled={true} width={413} value={formData.plbzAddrSec1 ? formData.plbzAddrSec1 : ''} onChange={onChangeInput} />
                            </span>
                            <Input
                              id="plbzAddrSec2"
                              type="text"
                              placeHolder="상세주소"
                              disabled={addrCopy2}
                              width={555}
                              value={formData.plbzAddrSec2 ? formData.plbzAddrSec2 : ''}
                              onChange={onChangeInput}
                            />
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              )}

              <table summary="계약자 정보에 대한 내용" className="table-tp2">
                <caption className="away">계약자 정보</caption>
                <colgroup>
                  <col width="12.58%" />
                  <col width="37.78%" />
                  <col width="12.58%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  {cntrctrTp === '0030' ? (
                    <>
                      <tr>
                        <th>배송지 주소</th>
                        <td colSpan="3">
                          <span className="bridge2">
                            <Input id="zcd1" type="text" placeHolder="우편번호" disabled={true} width={272} value={formData.zcd1 ? formData.zcd1 : ''} onChange={onChangeInput} />
                            &nbsp;&nbsp;
                            {addrCopy1 ? <></> : <Button size="mid" background="gray" title="우편번호" width={131} height={48} disabled={addrCopy1} onClick={(e) => onSearchAddr(e, 'addr')} />}
                            &nbsp;&nbsp;
                            <CheckBox id="chk-addrCopy1" title="법인주소와 동일" value={addrCopy1} checked={addrCopy1} onChange={(e) => onChangeCheck(e)} />
                          </span>
                          <br />
                          <span className="bridge">
                            <Input id="addr1" type="text" placeHolder="주소" disabled={true} width={413} value={formData.addr1 ? formData.addr1 : ''} onChange={onChangeInput} />
                          </span>
                          <Input id="addr2" type="text" placeHolder="상세주소" width={555} value={formData.addr2 ? formData.addr2 : ''} onChange={onChangeInput} />
                          {flag === 1 && isEmpty(formData.addr2) && <p className="p-feedback">상세주소를 입력해주세요.</p>}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                  <tr>
                    <th>이메일</th>
                    <td colSpan="3">
                      <p className="ment-tit">차량 계약시 계약서 수신 이메일 주소를 입력해주세요.</p>
                      <Input id="emlAddr" type="text" placeHolder="example@hyundaiautobell.com" width={413} value={formData.emlAddr ? formData.emlAddr : ''} onChange={onChangeInput} />
                      {flag === 1 && isEmpty(formData.emlAddr) && <p className="p-feedback">이메일을 입력해주세요.</p>}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      차량양도 계약서
                      <br />
                      서명방식
                    </th>
                    <td colSpan="3" className="radio-sign">
                      <RadioGroup
                        dataList={[{ id: 'radio_signature', value: '0010', checked: false, disabled: false, title: '직접서명' }]}
                        defaultValue={formData.cntrSignTpcd !== '' ? formData.cntrSignTpcd : '0010'}
                        onChange={(e) => onChangeRadio(e, 'cntrSignTpcd')}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table summary="홈서비스 약관" className="table-tp2">
                <caption className="away">홈서비스 약관</caption>
                <colgroup>
                  <col width="100%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <PolicyCheckBoxGroup title="전체 동의" id="chk-agree-all" type="terms" agreeList={policyCheckList} agreeTerm={policyCntn} onChange={onChangePolicy} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
          <Buttons align="center" marginTop={60}>
            <span className="fl">
              <Button size="big" background="gray" title="이전 단계로" sub="(계약자 유형 선택)" className="ws1" width={240} height={72} onClick={(e) => prevStep(e)} />
            </span>
            <span className="fr">
              <Button size="big" background="blue80" title="다음 단계로" sub="(예상결제금액 확인)" className="ws1" width={240} height={72} onClick={(e) => nextStep(e)} />
            </span>
          </Buttons>
        </div>
        <RodalPopup show={rodalShow} type={'fade'} closedHandler={closeSearchAddr} title="주소 검색" mode="normal" size="large">
          <FindAddress AddressEvent={addrEvent} target={addrTarget} />
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

ContractorInfo.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getPolicy({ tmsTp: '0400', tmsSbj: '0020' }));
  await reduxStore.dispatch(getCommonCodeList('FM053'));
  await reduxStore.dispatch(getCommonCodeList('FM005'));
  if (query.cntrctrTp !== '0010') await reduxStore.dispatch(getCommonCodeList('FM020'));

  return {
    query
  };
};

export default withRouter(ContractorInfo);
