/* eslint-disable no-unused-vars */
/**
 * 내차팔기 방문평가 신청 화면
 * @fileOverview 내차팔기 방문평가 신청 화면
 * @requires locationAction
 * @requires visitValuationAction
 * @author 김민철
 */
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { getLocationList, getDetailLocationList } from '@src/actions/sellcar/locationAction';
import { insertSellcarAction } from '@src/actions/sellcar/VisitSellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectSellcarTerms, selectMemberInfo } from '@src/api/sellcar/AllSellcarSearchApi';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';

/**
 * 내차팔기 방문평가 신청 화면
 * @returns {visitValuationRequest}
 */
const VisitValuationRequest = () => {
  const dispatch = useDispatch();

  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    if (hasMobile) {
      Router.replace('/sell/visitApply'); //모바일로 이동
    }
  }, [hasMobile]);

  const [hpPn01List, setHpPn01List] = useState([]);

  // Pattern - Phone
  const phonePattern = /^[0-9]{3,4}[-]+[0-9]{4}$/;
  const crNoPattern = /^([가-힣]{2})?[0-9]{2,3}[가-힣]{1}[0-9]{4}$/;

  const [userNameError, setUserNameError] = useState(false);
  const [userCarNumberError, setUserCarNumberError] = useState(false);
  const [userCarNumberError2, setUserCarNumberError2] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCarNumber, setUserCarNumber] = useState('');
  const [hpPnError, setHpPnError] = useState(false);
  const [hpPn2Error, setHpPn2Error] = useState(false);
  const [hpPn01, setHpPn01] = useState('');
  const [hpPn02, setHpPn02] = useState('');
  const [rgstRsdcAddrNmmError, setRgstRsdcAddrNmmError] = useState(false);
  const [rgstRsdcAddrCd, setRgstRsdcAddrCd] = useState('');
  const [rgstRsdcAddrNm, setRgstRsdcAddrNm] = useState('');
  const [rgstRsdcDtlAddrCd, setRgstRsdcDtlAddrCd] = useState('');
  const [rgstRsdcDtlAddrNm, setRgstRsdcDtlAddrNm] = useState('');
  const [termsError1, setTermsError1] = useState(false);
  const [termsError2, setTermsError2] = useState(false);
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false);
  const { showAlert } = useContext(SystemContext);
  const locationList = useSelector((state) => state.sellcarLocation.locationList, []);
  const detailLocationList = useSelector((state) => state.sellcarLocation.detailLocationList, []);
  const [terms, setTerms] = useState(''); // 방문평가 이용 약관
  const [privacyTerms, setPrivacyTerms] = useState(''); // 개인정보 처리방침 약관
  const [mbInfo, setMbInfo] = useState(null);

  const onChangeHpPn = (e) => {
    const { value } = e.target;
    let flag = false;
    let valueTemp = value;
    const valueLength = value.length;
    if (phonePattern.test(valueTemp)) flag = true;
    if (flag === false && (valueLength === 7 || valueLength === 8)) {
      if (valueLength !== 8) valueTemp = valueTemp.slice(0, 3) + '-' + valueTemp.slice(3, 7);
      else valueTemp = valueTemp.slice(0, 4) + '-' + valueTemp.slice(4, 8);
    }
    setHpPn02(valueTemp);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let validNameSuccess = false;
    let validHpPnSuccess = false;
    let validResdcSuccess = false;
    let validCarNoSuccess = false;
    let validTerms1Success = false;
    let validTerms2Success = false;

    // 이름 체크
    if (userName === '') {
      setUserNameError(true);
      validNameSuccess = false;
    } else {
      setUserNameError(false);
      validNameSuccess = true;
    }

    // 휴대전화번호 체크
    if (hpPn01 === '' || hpPn02 === '') {
      setHpPnError(true);
      validHpPnSuccess = false;
    } else {
      setHpPnError(false);
      validHpPnSuccess = true;
    }
    // 거주지역 체크
    if (rgstRsdcAddrNm === '' || rgstRsdcDtlAddrNm === '') {
      setRgstRsdcAddrNmmError(true);
      validResdcSuccess = false;
    } else {
      setRgstRsdcAddrNmmError(false);
      validResdcSuccess = true;
    }

    // 차량번호 체크
    if (inputCarNumber === false) {
      if (userCarNumber === '') {
        setUserCarNumberError(true);
        validCarNoSuccess = false;
      } else {
        if (!crNoPattern.test(userCarNumber)) {
          setUserCarNumberError2(true);
          validCarNoSuccess = false;
        } else {
          setUserCarNumberError2(false);
          validCarNoSuccess = true;
        }
      }
    } else {
      setUserCarNumberError(false);
      validCarNoSuccess = true;
    }

    // 약관 체크
    if (term1 === false) {
      setTermsError1(true);
      validTerms1Success = false;
    } else {
      setTermsError1(false);
      validTerms1Success = true;
    }

    if (term2 === false) {
      setTermsError2(true);
      validTerms2Success = false;
    } else {
      setTermsError2(false);
      validTerms2Success = true;
    }

    if (validNameSuccess && validHpPnSuccess && validResdcSuccess && validCarNoSuccess && validTerms1Success && validTerms2Success) {
      rodalPopupHandler4(e, 'fade');
    }
  };

  const onConfirmHandler = async (e) => {
    e.preventDefault();
    const params = {
      hasMobile: false,
      nmbNm: userName,
      hpPn: `${hpPn01}-${hpPn02}`,
      rgstRsdcAddrCd: rgstRsdcAddrCd,
      rgstRsdcAddrCdNm: rgstRsdcAddrNm,
      rgstRsdcDtlAddrCd: rgstRsdcDtlAddrCd,
      rgstRsdcDtlAddrCdNm: rgstRsdcDtlAddrNm,
      car: {
        crNo: userCarNumber
      }
    };
    const success = await dispatch(insertSellcarAction(params));
    console.log('success', success);
    if (success) {
      modalCloseHandler4();
      Router.push('/sellcar/visit/visitValuationComplete');
    } else {
      showAlert('신청에 실패했음');
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    modalCloseHandler4();
  };

  const handleTermPopup = useCallback(
    (e) => {
      rodalPopupHandler1(e, 'fade');
    },
    [rodalPopupHandler1]
  );

  const handleTermPopup2 = useCallback(
    (e) => {
      rodalPopupHandler2(e, 'fade');
    },
    [rodalPopupHandler2]
  );

  useEffect(() => {
    if (isEmpty(locationList)) {
      dispatch(getLocationList());
    }
  }, [dispatch, locationList]);

  // 휴대전화번호 뒷자리 변경
  useEffect(() => {
    if (hpPn02 !== '') {
      console.log(hpPn02);
      if (hpPn02.match(phonePattern) === null) {
        setHpPn02('');
        setHpPn2Error(true);
      } else {
        setHpPn2Error(false);
      }
    }
  }, [hpPn02]);

  // 거주지역 시도 선택
  useEffect(() => {
    if (!isEmpty(rgstRsdcAddrCd)) {
      dispatch(getDetailLocationList(rgstRsdcAddrCd));
    }
  }, [rgstRsdcAddrCd]);

  useEffect(() => {
    // 로그인한 회원 중에서 허가되지 않은 회원타입이면
    if (isLogin()) {
      if (!isAllowedUserType()) {
        showAlert('일반 회원만 이용 가능합니다.', () => {
          location.href = '/main';
        });
      }
      selectMemberInfo({ mbId: gInfoLive().id }).then((data) => {
        console.log('memberInfo >>>>', data.data.data);
        if (data.data.statusinfo.returncd === '000') setMbInfo(data.data.data);
      });
    }
    // 휴대전화번호 앞번호
    getCommonCodeAsync('FM005').then((codeList) => setHpPn01List(codeList));
  }, []);

  // 약관 조회
  useEffect(() => {
    selectSellcarTerms({ tmsTp: '0500', tmsDiv: '0510' })
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

  useEffect(() => {
    if (mbInfo !== null) {
      setUserName(mbInfo.mbNm);
      setHpPn01(mbInfo.mbHpPn.substr(0, 3));
      setHpPn02(`${mbInfo.mbHpPn.substr(3, 4)}-${mbInfo.mbHpPn.substr(7, 4)}`);
      setRgstRsdcAddrCd(mbInfo.locCd);
      setRgstRsdcAddrNm(mbInfo.locNm);
      setRgstRsdcDtlAddrCd(mbInfo.ctyCd);
      setRgstRsdcDtlAddrNm(mbInfo.ctyNm);
    }
  }, [mbInfo]);

  // const handleChangeTerm1 = useCallback(
  //   (e) => {
  //     console.log("handleChangeTerm1",e.target.checked);
  //     setTerm1((prevTerm) => !prevTerm);
  //     if (term1 === false) {
  //       rodalPopupHandler1(e, 'fade');
  //     }
  //   },
  //   [term1]
  // );

  /**
   * POLD0SS000-132 건 처리
   */
  const handleChangeTerm1 = (e) => {
    console.log('handleChangeTerm1', e.target.checked);
    setTerm1((prevTerm) => !prevTerm);
    // if (term1 === false) {
    //   rodalPopupHandler1(e, 'fade');
    // }
  };

  const handleChangeTerm2 = (e) => {
    setTerm2((prevTerm) => !prevTerm);
  };

  const [inputCarNumber, setInputCarNumber] = useState(false);
  const onChangeInputCarNumber = useCallback(() => {
    setInputCarNumber((prev) => !prev);
  }, []);

  if (hasMobile) {
    return <AppLayout />;
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-service-wrap">
        <h3>
          <span>
            <b>방문평가</b>로
          </span>
          <br />
          쉽고 편리하게 판매하세요!
        </h3>
        <p>전담 차량 평가사에게 차량 평가에서 매각까지 믿고 맡기는 내 차 팔기</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="sell-visit-intro-01" />
            <p className="tit">쉽고 빠른 신청</p>
            <p className="exp">
              이름, 연락처, 평가사 방문지역만 <br />
              남기면 끝!
            </p>
          </li>
          <li>
            <i className="sell-visit-intro-02" />
            <p className="tit">집 앞에서 편리하게</p>
            <p className="exp">
              전국 어디든 차량 평가사가 <br />
              고객님이 편리한 장소로 찾아갑니다.
            </p>
          </li>
          <li>
            <i className="sell-visit-intro-03" />
            <p className="tit">복잡한 과정 없이</p>
            <p className="exp">
              상담에서 매각, 명의 이전까지 <br />
              모든 서비스를 빠르게 제공합니다.
            </p>
          </li>
        </ul>
      </div>
      <div className="visit-apply-wrap sub-main">
        <div className="visit-apply-sec">
          <form className="apply-form">
            <fieldset>
              <legend className="away">방문 신청</legend>
              {/* <h4>방문 신청</h4> */}
              <ul className="register-tp1">
                <li>
                  <label htmlFor="userName">이름</label>
                  <Input type="text" placeHolder="" value={userName} id="userName" onBlur={(e) => setUserName(e.target.value)} />
                  {userNameError && <p className="tx-exp-tp4">이름을 입력해주세요</p>}
                </li>
                <li>
                  <label htmlFor="user-phone">휴대 전화 번호</label>
                  <span className="bridge">
                    <SelectBox id="user-phone" className="items-sbox" options={hpPn01List} value={hpPn01} name="hpPn01" width={157} height={48} onChange={(e) => setHpPn01(e.value)} />
                  </span>
                  <Input type="text" placeHolder="0000-0000" value={hpPn02} id="user-phone-visit2" name="hpPn02" width={373} onBlur={onChangeHpPn} />
                  {hpPnError && <p className="tx-exp-tp4">휴대 전화 번호를 입력해주세요</p>}
                  {hpPn2Error && <p className="tx-exp-tp4">휴대전화 포맷이 잘못되었습니다.(예시:0000-0000)</p>}
                </li>
                <li>
                  <label htmlFor="address">평가사 방문 지역</label>
                  <span className="bridge">
                    <SelectBox
                      id="address"
                      className="items-sbox"
                      placeHolder="시/도 선택"
                      options={locationList}
                      value={rgstRsdcAddrCd}
                      width={265}
                      height={48}
                      onChange={(e) => {
                        setRgstRsdcAddrNm(e.label);
                        setRgstRsdcAddrCd(e.value);
                      }}
                    />
                  </span>
                  <SelectBox
                    id="address2"
                    className="items-sbox"
                    placeHolder="시군구 선택"
                    options={detailLocationList}
                    value={rgstRsdcDtlAddrCd}
                    width={265}
                    height={48}
                    onChange={(e) => {
                      setRgstRsdcDtlAddrNm(e.label);
                      setRgstRsdcDtlAddrCd(e.value);
                    }}
                  />
                  {rgstRsdcAddrNmmError && <p className="tx-exp-tp4">거주 지역을 선택해주세요</p>}
                </li>
                <li>
                  <label htmlFor="car-number">차량번호</label>
                  <Input type="text" value={userCarNumber} id="userCarNumber" onBlur={(e) => setUserCarNumber(e.target.value)} disabled={inputCarNumber} />
                  {userCarNumberError && <p className="tx-exp-tp4">차량번호를 입력해주세요</p>}
                  {userCarNumberError2 && <p className="tx-exp-tp4">차량번호를 올바르게 입력해주세요</p>}
                  <div className="mp-chk-sec">
                    <CheckBox id="chk-car-number" title="차량번호 불명" isSelf={false} checked={inputCarNumber} onChange={onChangeInputCarNumber} />
                  </div>
                </li>
              </ul>
              <div className="register-agree mt40">
                <div className="agree-obj">
                  <CheckBox id="chk-visit" title="방문평가 이용 약관" sub="(필수)" isSelf={false} checked={term1} termPop={true} onChange={handleChangeTerm1} termPopHandle={handleTermPopup} />
                  {termsError1 && <p className="tx-exp-tp4">위 항목에 동의해주세요.</p>}
                </div>
                <div className="agree-obj">
                  <CheckBox id="chk-privacy" title="개인정보 처리방침" sub="(필수)" isSelf={false} checked={term2} termPop={true} onChange={handleChangeTerm2} termPopHandle={handleTermPopup2} />
                  {termsError2 && <p className="tx-exp-tp4">위 항목에 동의해주세요.</p>}
                </div>
              </div>
            </fieldset>
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="방문평가 판매 신청하기" width={245} height={60} onClick={(e) => onSubmitHandler(e)} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="방문평가 이용 약관(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: terms.tmsCntn }} />
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="개인정보 처리방침(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: privacyTerms.tmsCntn }} />
      </RodalPopup>

      <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} mode="normal" size="xs">
        <div className="con-wrap">
          <p className="mb33">입력하신 내용으로 방문평가 판매를 신청하시겠습니까?</p>
          <table summary="방문평가 신청에 대한 내용" className="table-tp1">
            <caption className="away">방문평가</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{userName}</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>
                  {hpPn01}-{hpPn02}
                </td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>
                  {rgstRsdcAddrNm} {rgstRsdcDtlAddrNm}
                </td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>{userCarNumber === '' ? '차량번호불명' : userCarNumber}</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={109} onClick={(e) => onCancelHandler(e)} />
            <Button size="big" background="blue80" title="확인" width={109} onClick={(e) => onConfirmHandler(e)} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};
export default VisitValuationRequest;
