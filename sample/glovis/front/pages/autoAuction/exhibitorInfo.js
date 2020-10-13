/**
 * 설명 : 스마트옥션 회원정보 입력
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction,LatestAccount,carInfo]
 * @author 박진하
 */
import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import produce from 'immer';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import useRodal from '@lib/share/custom/useRodal';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';

import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobAccountNum from '@src/components/common/MobAccountNum';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';
import { getAuctionHouseInfo, getAuctionNoList, getMbInfo, setMbInfo, setInputInfo, getCommonCodeList } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import LatestAccount from './latestAccount';

const globalThis = require('globalthis')();

/**
 * 설명 : 스마트옥션 출품 회원정보를 입력하고 차량정보 페이지를 호출한다.
 * @param {state.autoAuction.auctionHouse} 출품 경매장 정보 (거점, 경매일)
 * @returns {exhibitorInfo} 회원정보 등록
 */
const ExhibitorInfo = () => {
  //console.log('*** exhibitorInfo > isLoginLiveCheck', isLoginLiveCheck());
  const dispatch = useDispatch();
  const { showAlert, initAlert } = useContext(SystemContext);

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('스마트옥션 출품 서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });
  }, []);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { inputInfo, mbInfo, auctionNoList, mobAuctionNoList, auctionHouse, hpPnCdList, mobHpPnCdList, telCdList, mobTelCdList, bankCdList, mobBankCdList, auctionOngoing } = useSelector(
    (state) => state.autoAuction
  );

  const [formData, setFormData] = useState(inputInfo);
  const [rodalShow, setRodalShow, openAccountPopup, closeAccountPopup] = useRodal(false, true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.
  const [flag, setFlag] = useState(0);

  const numberCheck = /^[0-9\b]+$/;
  const korCheck = /[ㄱ-ㅎㅏ-ㅣ가-힣\b]+$/;

  // 화면 Refresh 여부 감지 (진행상태, Refresh 이후 Redirect URL)
  useDetectPageRefresh(auctionOngoing, '/autoAuction/autoAuctionMain');

  const handleOnKeyUp = (e) => {
    e.preventDefault();
    for (const val of e.target.value) {
      if (korCheck.test(val)) {
        e.target.value = '';
      }
    }
  };

  const inNumber = (e) => {
    if (!numberCheck.test(e.key)) {
      e.preventDefault();
    }
  };

  const onChangeSelect = (e, target) => {
    const { value, label } = e;
    setFormData(
      produce((draft) => {
        draft[target] = value;
        if (target === 'auctNoYmd') draft.auctDt = label;
      })
    );
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    // 모바일의 휴대폰 번호와 일반전화 번호는 1개의 입력창으로부터 번호를 추출
    if (hasMobile && (id === 'mbHpPnUnion' || id === 'telNoUnion')) {
      const numRegexWhen5 = /^([0-9]*)([0-9]{4})$/;
      const tmpNum = value.replace(/-/gi, '');
      setFormData(
        produce((draft) => {
          const num2 = tmpNum.replace(numRegexWhen5, '$1');
          const num3 = tmpNum.replace(numRegexWhen5, '$2');
          if (num3.length < 4) {
            if (id === 'mbHpPnUnion') draft.mbHpPn2 = '';
            if (id === 'mbHpPnUnion') draft.mbHpPn3 = num3;
            if (id === 'telNoUnion') draft.telNo2 = '';
            if (id === 'telNoUnion') draft.telNo3 = num3;
          } else {
            if (id === 'mbHpPnUnion') draft.mbHpPn2 = num2;
            if (id === 'mbHpPnUnion') draft.mbHpPn3 = num3;
            if (id === 'telNoUnion') draft.telNo2 = num2;
            if (id === 'telNoUnion') draft.telNo3 = num3;
          }
        })
      );
    } else {
      setFormData(
        produce((draft) => {
          draft[id] = value;
        })
      );
    }
  };

  const modalShow = useCallback(
    (e) => {
      e.preventDefault();
      setRodalShow(!rodalShow);
      openAccountPopup(e, 'fade');
    },
    [openAccountPopup, rodalShow, setRodalShow]
  );

  // const accountNum = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   Router.push('/autoAuction/accountNum').then(() => {
  //     window.scrollTo(0, 0);
  //     setIsLoading(false);
  //   });
  // };

  const onChangePopup = useCallback((e, accountData) => {
    if (!isEmpty(accountData)) {
      setFormData(
        produce((draft) => {
          draft.bankCd = accountData.bankCd;
          draft.accountNo = accountData.accountNo.replace(/-/gi, '');
          draft.accountNm = accountData.accountNm;
        })
      );
    }

    // PC인 경우에만 팝업 종료 후처리 (모바일은 자체처리함)
    if (!hasMobile) {
      setRodalShow(false);
      closeAccountPopup();
    }
  }, []);

  const onClickHandler = (e, url) => {
    e.preventDefault();
    setFlag(1);
    if (isEmpty(formData.auctNoYmd)) {
      showAlert('경매 희망일을 선택해주세요.', 'error');
      return;
    } else if (isEmpty(formData.mbHpPn1) || isEmpty(formData.mbHpPn2) || isEmpty(formData.mbHpPn3)) {
      showAlert('휴대폰 번호를 입력해주세요.', 'error');
      return;
    } else if (!isEmpty(formData.telNo1) || !isEmpty(formData.telNo2) || !isEmpty(formData.telNo3)) {
      if (isEmpty(formData.telNo1) || isEmpty(formData.telNo2) || isEmpty(formData.telNo3)) {
        showAlert('일반전화를 올바르게 입력해주세요.', 'error');
        return;
      }
    } else if (isEmpty(formData.bankCd)) {
      showAlert('은행을 선택해주세요.', 'error');
      return;
    } else if (isEmpty(formData.accountNo)) {
      showAlert('계좌번호를 입력해주세요.', 'error');
      return;
    } else if (isEmpty(formData.accountNm)) {
      showAlert('예금주명을 입력해주세요.', 'error');
      return;
    }

    // if (formData.auctPrstlsNrmlMb === '' || formData.auctPrstlsNrmlMb === undefined || formData.auctPrstlsNrmlMb === null) {
    //   if (formData.auctPrstlsMb === '' || formData.auctPrstlsMb === undefined || formData.auctPrstlsMb === null) {
    //     showAlert('경매회원이 아닙니다.<br/>경매회원가입 후 진행해주세요.', 'error');
    //     return;
    //   }
    // }

    setFlag(2);
    setIsLoading(true);
    axiosPost('/api/autoauction/insertMemberInfo.do', JSON.stringify(formData)).then(({ data }) => {
      setIsLoading(false);
      if (data.statusinfo.returncd === '000') {
        setIsLoading(true);
        dispatch(setMbInfo(formData));
        dispatch(setInputInfo(formData));
        Router.push(url).then(() => {
          window.scrollTo(0, 0);
          setIsLoading(false);
        });
      } else {
        console.log('errorCd >>', data.statusinfo.returncd);
        console.log('errorMsg >>', data.statusinfo.returnmsg);
        showAlert('회원정보 저장 실패', 'error');
      }
    });
  };

  useEffect(() => {
    if (!isEmpty(mbInfo)) {
      setFormData(
        produce((draft) => {
          draft.mbHpPn = mbInfo.mbHpPn;
          draft.mbHpPn1 = mbInfo.mbHpPn.substr(0, 3);
          draft.mbHpPn2 = mbInfo.mbHpPn.substr(3, 4);
          draft.mbHpPn3 = mbInfo.mbHpPn.substr(7, 4);
          draft.bankCd = formData.bankCd ? formData.bankCd : '';
          draft.accountNo = formData.accountNo ? formData.accountNo : '';
          draft.accountNm = formData.accountNm ? formData.accountNm : '';
          draft.mbId = mbInfo.mbId;
          draft.auctPrstlsNrmlMb = mbInfo.auctPrstlsNrmlMb; // 경매 일반회원 ID
          draft.auctPrstlsMb = mbInfo.auctPrstlsMb; // 경매 유료회원 ID
          draft.regDt = moment().format('YYYY-MM-DD HH:mm:ss');
          draft.rgstId = mbInfo.mbId;
          draft.updDt = moment().format('YYYY-MM-DD HH:mm:ss');
          draft.updtId = mbInfo.mbId;
        })
      );
    }
  }, [mbInfo]);

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.exhiPathClasCd = hasMobile ? '04' : '02'; // 출품신청 경로 구분 (pc:02, mobile:04)
        draft.mbHpPn = formData.mbHpPn1 + formData.mbHpPn2 + formData.mbHpPn3;
        draft.mbTelNo = formData.telNo1 + formData.telNo2 + formData.telNo3;
      })
    );
  }, [formData]);

  useEffect(() => {
    if (isEmpty(mbInfo)) if (isLoginLiveCheck()) dispatch(getMbInfo(gInfoLive().id)); // 회원정보
  }, [mbInfo]);

  if (hasMobile) {
    const [mbAuctionNoList, setMbAuctionNoList] = useState(mobAuctionNoList); // 경매 희망일
    const [mbHpPnCdList, setMbHpPnCdList] = useState(mobHpPnCdList); // 휴대폰번호 코드
    const [mbTelCdList, setMbTelCdList] = useState(mobTelCdList); // 전화번호 코드
    const [mbAccountBankCdList, setMbAccountBankCdList] = useState(mobBankCdList); // 은행코드

    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내 차 출품하기',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 74,
          color: '#fff'
        }
      });

      // 모바일 기입력 경매희망일 설정
      setMbAuctionNoList(
        mbAuctionNoList.map((el) => {
          const data = { ...el };
          data.checked = el.codeValue === formData.auctNoYmd ? true : false;
          return data;
        })
      );

      // 모바일 기입력 휴대전화코드 설정
      setMbHpPnCdList(
        mbHpPnCdList.map((el) => {
          const data = { ...el };
          data.checked = el.codeValue === formData.mbHpPn1 ? true : false;
          return data;
        })
      );

      // 모바일 기입력 전화번호코드 설정
      setMbTelCdList(
        mbTelCdList.map((el) => {
          const data = { ...el };
          data.checked = el.codeValue === formData.telNo1 ? true : false;
          return data;
        })
      );

      // 모바일 기입력 은행코드 설정
      setMbAccountBankCdList(
        mbAccountBankCdList.map((el) => {
          const data = { ...el };
          data.checked = el.codeValue === formData.bankCd ? true : false;
          return data;
        })
      );
    }, []);

    const onChangeMobSelect = (e, target) => {
      const value = e.target.value;
      const label = e.target.dataset.label;

      setFormData(
        produce((draft) => {
          if (target === 'auctNoYmd') {
            draft[target] = mbAuctionNoList[Number(value) - 1].codeValue;
            draft.auctDt = label;
          } else if (target === 'mbHpPn1') {
            draft[target] = mbHpPnCdList[Number(value) - 1].codeValue;
          } else if (target === 'telNo1') {
            draft[target] = mbTelCdList[Number(value) - 1].codeValue;
          } else if (target === 'bankCd') {
            draft[target] = mobBankCdList[Number(value) - 1].codeValue;
          }
        })
      );
    };

    const accountOpen = (e) => {
      handleFullpagePopup(e);
    };
    const [fpAccount, setFpAccount] = useState(false);
    const handleFullpagePopup = useCallback(
      (e) => {
        e.preventDefault();
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '최근계좌번호',
            options: ['close']
          }
        });
        setFpAccount(true);
      },
      [dispatch]
    );

    const handleFullpagePopupClose = useCallback(
      (e, accountData) => {
        e.preventDefault();
        onChangePopup(e, accountData);
        const refreshBankCdList = mbAccountBankCdList.map((el) => {
          const refreshBankCd = Object.assign({}, el);
          if (refreshBankCd.codeValue === accountData.bankCd) {
            refreshBankCd.checked = true;
          } else {
            refreshBankCd.checked = false;
          }
          return refreshBankCd;
        });
        setMbAccountBankCdList(refreshBankCdList);

        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        setFpAccount(false);
      },
      [dispatch]
    );
    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={3} mode="stick" />
        </div>
        <div className="auction-sec">
          <div className="content-wrap">
            <form className="auction-form">
              <fieldset>
                <legend className="away">회원정보 등록</legend>
                <table summary="회원정보 등록에 대한 내용" className="table-tp3">
                  <caption className="away">회원정보 등록</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>거점(경매장)</th>
                      <td>
                        <Input type="text" id="auctNm" disabled={true} value={isEmpty(auctionHouse.auctNm) ? '' : auctionHouse.auctNm} />
                      </td>
                    </tr>
                    <tr>
                      <th>경매희망일</th>
                      <td>
                        <MobSelectBox id="auctNoYmd" options={mbAuctionNoList} width="100%" onChange={(e) => onChangeMobSelect(e, 'auctNoYmd')} />
                        {flag === 1 && isEmpty(formData.auctNoYmd) && <p className="tx-sub tx-red80">경매 희망일을 선택해주세요.</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td>
                        <Input type="text" id="mbNm" disabled={true} value={isEmpty(mbInfo) || isEmpty(mbInfo.mbNm) ? '' : mbInfo.mbNm} />
                      </td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td>
                        <label htmlFor="user-phone" className="hide">
                          휴대전화번호
                        </label>
                        <span className="bridge2">
                          <MobSelectBox id="mbHpPn1" options={mbHpPnCdList} width="35%" onChange={(e) => onChangeMobSelect(e, 'mbHpPn1')} />

                          <Input
                            type="text"
                            id="mbHpPnUnion"
                            height={40}
                            placeHolder="- 제외입력"
                            width="62.5%"
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={9}
                            value={formData.mbHpPn2.length > 0 && formData.mbHpPn3.length === 4 ? formData.mbHpPn2 + '-' + formData.mbHpPn3 : formData.mbHpPn3}
                          />
                          {/*}
                          <Input
                            type="text"
                            id="mbHpPn2"
                            value={isEmpty(formData.mbHpPn2) ? '' : formData.mbHpPn2}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={4}
                            height={40}
                            width="30%"
                          />

                          <Input
                            type="text"
                            id="mbHpPn3"
                            value={isEmpty(formData.mbHpPn3) ? '' : formData.mbHpPn3}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={4}
                            height={40}
                            width="30%"
                          />
                          {*/}
                        </span>
                        {flag === 1 && (isEmpty(formData.mbHpPn1) || isEmpty(formData.mbHpPn2) || isEmpty(formData.mbHpPn3)) && <p className="tx-sub tx-red80">휴대폰 번호를 입력해주세요</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        일반전화<em>(선택)</em>
                      </th>
                      <td>
                        <label htmlFor="user-phone" className="hide">
                          일반전화
                        </label>
                        <span className="bridge2">
                          <MobSelectBox id="telNo1" options={mbTelCdList} width="35%" onChange={(e) => onChangeMobSelect(e, 'telNo1')} />
                          <Input
                            type="text"
                            id="telNoUnion"
                            height={40}
                            placeHolder="- 제외입력"
                            width="62.5%"
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={9}
                            value={formData.telNo2.length > 0 && formData.telNo3.length === 4 ? formData.telNo2 + '-' + formData.telNo3 : formData.telNo3}
                          />
                          {/*}
                          <Input
                            type="text"
                            id="telNo2"
                            value={isEmpty(formData.telNo2) ? '' : formData.telNo2}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={4}
                            height={40}
                            width="30%"
                          />
                          <Input
                            type="text"
                            id="telNo3"
                            value={isEmpty(formData.telNo3) ? '' : formData.telNo3}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                            maxLength={4}
                            height={40}
                            width="30%"
                          />
                        {*/}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>계좌번호</th>
                      <td>
                        <label htmlFor="account-num" className="hide">
                          계좌 번호
                        </label>
                        <span className="bridge2">
                          <MobSelectBox id="bankCd" placeHolder="은행명" options={mbAccountBankCdList} width="55.5%" value={formData?.bankCd} onChange={(e) => onChangeMobSelect(e, 'bankCd')} />
                          <Button size="mid" background="blue20" color="blue80" fontWeight={500} radius={true} title="최근계좌" measure={'%'} width={42} onClick={accountOpen} />
                        </span>
                        <span className="bridge2">
                          <Input
                            type="text"
                            placeHolder="- 제외 입력"
                            id="accountNo"
                            value={isEmpty(formData.accountNo) ? '' : formData.accountNo}
                            onKeyPress={inNumber}
                            onKeyUp={handleOnKeyUp}
                            placeType={4}
                            onChange={onChangeInput}
                          />
                        </span>
                        {flag === 1 && (isEmpty(formData.bankCd) || isEmpty(formData.accountNo)) && <p className="tx-sub tx-red80">계좌정보를 입력해주세요</p>}
                      </td>
                    </tr>
                    <tr>
                      <th>예금주</th>
                      <td>
                        <span className="bridge2">
                          <Input type="text" id="accountNm" value={isEmpty(formData.accountNm) ? '' : formData.accountNm} onChange={onChangeInput} />
                        </span>
                        {flag === 1 && isEmpty(formData.accountNm) && <p className="tx-sub tx-red80">예금주를 입력해주세요</p>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </form>
            <Button className="fixed" size="full" background="blue80" title="다음" onClick={(e) => onClickHandler(e, '/autoAuction/autoAuctionCarInfo')} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup}>{fpAccount && <MobAccountNum mbId={mbInfo?.mbId} onChange={handleFullpagePopupClose} />} </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 스마트옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={2} />
      </div>
      <div className="content-sec auction-sec">
        <div className="content-wrap">
          <div className="auction-tit">
            <h4>회원정보</h4>
            <h5>회원정보 등록</h5>
          </div>
          <form className="auction-form">
            <fieldset>
              <legend className="away">회원정보 등록</legend>
              <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                <caption className="away">회원정보 등록</caption>
                <colgroup>
                  <col width="12.68%" />
                  <col width="37.77%" />
                  <col width="12.68%" />
                  <col width="37.77%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>거점(경매장)</th>
                    <td>{auctionHouse?.auctNm}</td>
                    <th>경매 희망일</th>
                    <td>
                      <span className="bridge">
                        <SelectBox id="auctNoYmd" className="items-sbox" options={auctionNoList} width={180} height={48} value={formData?.auctNoYmd} onChange={(e) => onChangeSelect(e, 'auctNoYmd')} />
                      </span>
                      {flag === 1 && isEmpty(formData.auctNoYmd) && <p className="p-feedback">경매 희망일을 선택해주세요.</p>}
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td colSpan="3">{mbInfo?.mbNm}</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>
                      <label htmlFor="user-phone" className="hide">
                        휴대전화번호
                      </label>
                      <span className="bridge">
                        <SelectBox id="mbHpPn1" className="items-sbox" options={hpPnCdList} width={124} height={48} value={formData?.mbHpPn1} onChange={(e) => onChangeSelect(e, 'mbHpPn1')} />
                      </span>
                      <span className="bridge">
                        <Input type="text" id="mbHpPn2" width={124} value={formData?.mbHpPn2} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} maxLength={4} />
                      </span>
                      <span className="bridge">
                        <Input type="text" id="mbHpPn3" width={124} value={formData?.mbHpPn3} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} maxLength={4} />
                      </span>
                      {flag === 1 && (isEmpty(formData.mbHpPn1) || isEmpty(formData.mbHpPn2) || isEmpty(formData.mbHpPn3)) && <p className="p-feedback">휴대전화번호를 입력해주세요.</p>}
                    </td>
                    <th>
                      일반전화<em>(선택)</em>
                    </th>
                    <td>
                      <label htmlFor="user-tel" className="hide">
                        일반전화
                      </label>
                      <span className="bridge">
                        <SelectBox id="telNo1" className="items-sbox" options={telCdList} width={124} height={48} value={formData?.telNo1} onChange={(e) => onChangeSelect(e, 'telNo1')} />
                      </span>
                      <span className="bridge">
                        <Input type="text" id="telNo2" width={124} value={formData?.telNo2} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} maxLength={4} />
                      </span>
                      <span className="bridge">
                        <Input type="text" id="telNo3" width={124} value={formData?.telNo3} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} maxLength={4} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td colSpan="3">
                      <label htmlFor="account-num" className="hide">
                        계좌 번호
                      </label>
                      <span className="bridge">
                        <SelectBox
                          id="bankCd"
                          placeHolder="은행명"
                          className="items-sbox"
                          value={formData?.bankCd}
                          options={bankCdList}
                          width={272}
                          height={48}
                          onChange={(e) => onChangeSelect(e, 'bankCd')}
                        />
                      </span>
                      <span className="bridge">
                        <Input
                          type="text"
                          placeHolder="계좌번호( ' - ' 제외 입력)"
                          id="accountNo"
                          width={273}
                          value={formData?.accountNo}
                          onKeyPress={inNumber}
                          onKeyUp={handleOnKeyUp}
                          placeType={4}
                          onChange={onChangeInput}
                        />
                      </span>
                      <Button size="mid" background="gray" title="최근 계좌" width={131} height={48} onClick={modalShow} />
                      {flag === 1 &&
                        (isEmpty(formData.bankCd) ? <p className="p-feedback">은행명을 선택해주세요.</p> : isEmpty(formData.accountNo) ? <p className="p-feedback">계좌번호를 입력해주세요.</p> : '')}
                    </td>
                  </tr>
                  <tr>
                    <th>예금주</th>
                    <td colSpan="3">
                      <Input id="accountNm" type="text" width={555} value={formData?.accountNm} onChange={onChangeInput} />
                      {flag === 1 && isEmpty(formData.accountNm) && <p className="p-feedback">예금주를 입력해주세요.</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="tail-info">
                <span>※</span>계좌 정보는 차량 낙찰 시 대금 송금을 위해 필요합니다.
              </p>
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="blue80" title="다음 단계로" width={240} height={72} onClick={(e) => onClickHandler(e, '/autoAuction/autoAuctionCarInfo')} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </div>
      <LatestAccount show={rodalShow} mbId={mbInfo?.mbId} onChange={onChangePopup} />
    </AppLayout>
  );
};

ExhibitorInfo.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const auctId = reduxStore.getState().autoAuction.inputInfo.auctId;
  await reduxStore.dispatch(getAuctionHouseInfo(auctId)); // 선택 경매장 정보
  await reduxStore.dispatch(getAuctionNoList(auctId)); // 경매 회차 목록 조회
  await reduxStore.dispatch(getCommonCodeList('FM053')); // 은행 리스트
  await reduxStore.dispatch(getCommonCodeList('FM005')); // 휴대폰번호 앞자리 리스트
  await reduxStore.dispatch(getCommonCodeList('FM014')); // 일반전화번호 앞자리 리스트

  return { query };
};

export default withRouter(ExhibitorInfo);
