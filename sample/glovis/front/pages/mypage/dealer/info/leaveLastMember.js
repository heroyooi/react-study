/**
 * 설명 : 회원탈퇴
 * @fileoverview 마이페이지(딜러)>회원정보관리>회원탈퇴
 * @requires leaveMember
 * @author 김지현
 */
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import { produce } from 'immer';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTermsView from '@src/components/common/MobTermsView';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { axiosPost } from '@src/utils/HttpUtils';
import { gInfoLive } from '@src/utils/LoginUtils';
import Certification from '@src/components/common/Certification';
import CertificationMod from '@src/components/common/CertificationMod';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { setCommaString } from '@src/utils/StringUtil';
import { selectPolicyEfrcDtList, selectPolicyInfo } from '@src/actions/footer/policyAction';

const leaveLastMember = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  const [userId, setUserId] = useState('');
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const policyEfrcDtList = useSelector((state) => state.policy.policyEfrcDtList); //조회결과
  
  const [rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6] = useRodal(false, true); // 이용중인 서비스
  const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, false);
  const [rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8] = useRodal(false, false);
  const [msg, setMsg] = useRodal('');
  const [service, setService] = useState({});
  const [policyEfrcDtListTemp, setPolicyEfrcDtListTemp] = useState([]); //시행일 리스트
  const [policyOptionList, setPolicyOptionList] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const policyInfo = useSelector((state) => state.policy.policyInfo); //조회결과

  // bottom : 이용중인 서비스 없을 시 아래 state 2개 false로 변경 필요
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const [fpTerms, setFpTerms] = useState(false);
  const [fpPolicy, setFpPolicy] = useState(false); // 개인정보처리방침

  // 탈퇴 사유 코드/ 이유
  const [leaveReason, setLeaveReason] = useState('');
  const [inputs, setInputs] = useState({
    idChk1: '',
    idChk2: '',
    idChk3: '',
    idChk4: '',
    idChk5: '',
    idChk6: ''
  });

  const { idChk1, idChk2, idChk3, idChk4, idChk5, idChk6 } = inputs;

  // 본인인증
  const [certShow, setCertShow] = useState(false);
  const [certShowMod, setCertShowMod] = useState(false);

  const setOptionData = (policyEfrcDtList, initYn, idx) => {
    let idxData = 0;
    if (initYn !== 'Y') {
      idxData = idx - 1;
    }
    const param = { tmsId: policyEfrcDtList[idxData].tmsId };
    const optionListTemp = [];
    policyEfrcDtList.map((v, index) => {
      optionListTemp.push(
        produce(v, (draft) => {
          draft.id = index;
          draft.tmsId = v.value;
          draft.value = index + 1;
          draft.label = v.label;
          if (initYn === 'Y') {
            if (index === 0) draft.checked = true;
          } else {
            if (index === idxData) draft.checked = true;
          }
        })
      );
    });    
    dispatch(selectPolicyInfo(param)); //시행일 조회
    setPolicyOptionList(optionListTemp);
  };

  useEffect(() => {
    // const optionListTemp = [];
    if (policyEfrcDtList.length > 0) {
      setPolicyEfrcDtListTemp(policyEfrcDtList);
      setOptionData(policyEfrcDtList, 'Y', 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyEfrcDtList]);

  useEffect(() => {
    setPolicyData(policyInfo.tmsCntn);
  }, [policyInfo]);

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow7(false);
    if (msg === '탈퇴가 완료되었습니다.') {
      Router.push('/main');
    }
  }, []);

  const modalConfirmPopup = (e) => {
    e.preventDefault();
    setRodalShow8(false);

    /* 탈퇴 가능 여부 확인 */
    console.log('탈퇴가능여부 확인 == 이용중인 서비스 조회');
    axiosPost('/api/member/selectChkWthdAvail.do', { mbId: userId, mbTpcd: '0020' })
      .then(({ data }) => {
        setService(data.data);
        if (data.statusinfo.returncd === '000') {
          // 이용중인 서비스가 있는 경우
          if (hasMobile) {
            setDimm(true);
            setActive(true);
          } else {
            setRodalShow6(true);
          }
        } else {
          alert('query error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalCertPopup = (e) => {
    e.preventDefault();
    setRodalShow6(false);
    setRodalShow8(false);
    setCertShow(true);
  };

  const onHandlerChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'leaveReason') {
      setLeaveReason(e.target.value);
    }
  };

  const onChangeCheckBox = (e, target) => {
    e.preventDefault();
    let tmp = e.target.id.substring(3, 7);
    if (e.target.checked) {
      setInputs({
        ...inputs,
        [target]: tmp
      });
    } else {
      setInputs({
        ...inputs,
        [target]: ''
      });
    }
  };

  useEffect(() => {
    console.log('gInfoLive().id=%o', gInfoLive().id);
    setUserId(gInfoLive().id);
  }, []);

  const onCancelHandler = (e) => {
    e.preventDefault();
    setRodalShow6(false);
  };

  const onConfirmHandler = (e, chkAaIdCnt, chkDlrPrdCnt, chkDlrAdPrdCnt, point, self1) => {
    e.preventDefault();
    if (chkAaIdCnt == 'N' && chkDlrPrdCnt == 'N' && chkDlrAdPrdCnt == 'N' && point == 'N' && self1 == 'N') {
      if (hasMobile) {
        setDimm(false);
        setActive(false);
        setFpTerms(false);
        setFpPolicy(false);
        setCertShowMod(true);

        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '회원탈퇴 본인인증',
            options: ['close']
          }
        });
      } else {
        setRodalShow6(false);
        setCertShow(true);
      }
    } else {
      alert('탈퇴불가');
    }
  };

  const certCallback = (e) => {

    if (e.RETURN_CD === '0000') {
      if (hasMobile) {
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        setCertShowMod(false);
      } else {
        setCertShow(false);
      }
      let rsnCd = idChk1 + idChk2 + idChk3 + idChk4 + idChk5 + idChk6;

      if (isEmpty(rsnCd)) {
        setMsg('탈퇴사유를 선택하세요.');
        setRodalShow7(true);
        return;
      }
      if (isEmpty(leaveReason)) {
        setMsg('탈퇴사유를 입력하세요.');
        setRodalShow7(true);
        return;
      }

      let data = {
        mbId: userId,
        mbWthdRsnCd: setCommaString(rsnCd), // 탈퇴 사유코드
        mbWthdRsnCntn: leaveReason // 탈퇴 사유 내용
      };

      axiosPost('/api/member/updateWthd.do', data)
        .then(({ data }) => {
          console.log('=========================================');
          console.log('최종 탈퇴 >data=' + JSON.stringify(data));
          if (data.result.returncd === '000') {
            // 바로 탈퇴
            setMsg('탈퇴심사후 탈퇴처리됩니다.');
            setRodalShow7(true);
          } else {
            // update 오류
            setMsg('탈퇴중 오류가 발생했습니다.');
            setRodalShow7(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  const termsOpen = (e) => {
    handleFullpagePopup(e);
  };
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '환불약관',
          options: ['close']
        }
      });
      setFpTerms(true);
      setFpPolicy(false);
      setCertShowMod(false);
    },
    [dispatch]
  );

  const handleFullpagePopup2 = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(selectPolicyEfrcDtList({ tmsTp: '0800', tmsSbj: '0010', tmsDiv: '0820' }));
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '개인정보처리방침',
          options: ['close']
        }
      });
      setTimeout(() => {
        setFpTerms(false);
        setFpPolicy(true);
        setCertShowMod(false);
      }, 750);
    },
    [dispatch]
  );
  const closeFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms(false);
      setFpPolicy(false);
      setCertShowMod(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  const onCloseHandler = (e) => {
    e.preventDefault();
    if (hasMobile) {
      setDimm(false);
      setActive(false);
    } else {
      setRodalShow6(false);
    }
  };

  // 약관
  const onHandlerTmsTp = (e) => {
    e.preventDefault();
    window.open('https://testautobell.glovis.net/common/policy?tmsTp=0800', 'tmp', 'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes');
  };
  /*
  // 모바일 약관
  const onHandlerTmsTpMod = (e) => {
    e.preventDefault();
    handleFullpagePopup2(e);
    dispatch(selectPolicyEfrcDtList({ tmsTp: '0100' }));
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '오토벨 이용약관',
              options: ['back', 'close']
            }
          });
  };*/

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원탈퇴',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap pd0">
          <div className="mypage-state-sec member-info-pw withdrawal">
            <div className="mypage-admin-title v-2 bg-gray20 pd20">
              <p className="b-tit">
                그동안 현대 글로비스 오토벨을 이용해주신
                <br />
                고객님께 감사드립니다.
              </p>
              <p className="s-tit mt8">
                탈퇴 사유를 알려주시면
                <br /> 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.
              </p>
            </div>

            <div className="withdrawal-reason pdside20 mt24">
              <p>
                탈퇴 사유 선택<span>(중복 선택 가능)</span>
              </p>
              <ul className="mt8">
                <li>
                  <CheckBox id="chk0010" title="서비스 기능 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk1')} />
                </li>
                <li>
                  <CheckBox id="chk0020" title="서비스 정책 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk2')} />
                </li>
                <li>
                  <CheckBox id="chk0030" title="개인정보 및 보안우려" onChange={(e) => onChangeCheckBox(e, 'idChk3')} />
                </li>
                <li>
                  <CheckBox id="chk0040" title="고객 응대에 대한 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk4')} />
                </li>
                <li>
                  <CheckBox id="chk0050" title="타사 서비스 이용" onChange={(e) => onChangeCheckBox(e, 'idChk5')} />
                </li>
                <li>
                  <CheckBox id="chk0060" title="이용 빈도 낮음" onChange={(e) => onChangeCheckBox(e, 'idChk6')} />
                </li>
              </ul>
              <p className="mt24">기타사유</p>
              <div className="mt8">
                <Textarea height={133} countLimit={200} type="tp1" name="leaveReason" data={leaveReason} onBlur={onHandlerChange} placeHolder="기타 의견을 자유롭게 작성해주세요." />
              </div>
            </div>
            <MobBottomArea isFix={true} isSimple={true}>
              <Buttons align="center" className="full">
                <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/mypage/dealer/sellcar/carManagement" nextLink={true} />
                <Button size="big" background="blue80" title="탈퇴" height={56} onClick={(e) => modalConfirmPopup(e, 'fade')} />
              </Buttons>
            </MobBottomArea>            
            <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} />
            <RodalPopup show={rodalShow7} type={'fade'} width={380} closedHandler={modalCloseHandler7} isMask={true} isButton={false} subPop={false}>
              <div className="con-wrap">
                <p className="tit1" />
                <p>{msg}</p>
                <Buttons align="right" marginTop={24}>
                  <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeAlertPopup} />
                </Buttons>
              </div>
            </RodalPopup>
            <MobBottomArea active={active} isFixButton={true} zid={101}>
              <div className="inner pb0">
                <p className="tit1 mb8">이용중인 서비스</p>
                <p className="tx-tit tx-gray">고객님의 서비스 이용 현황입니다.</p>
                {/* 딜러회원 탈퇴 시 */}
                <ul className="notice">
                  {!isEmpty(service.chkAaIdCnt) && service.chkAaIdCnt == 'Y' ? (
                    <li>
                      <p>
                        경매회원
                        <span>
                          <i className="ico-dot" />
                          오토벨을 탈퇴하시더라도 경매장은 계속 이용하실 수 있습니다.
                        </span>
                        <span className="tx-red80">
                          <i className="ico-dot bg-red80" />
                          경매회원 탈퇴는 경매장에 문의해주세요.
                        </span>
                      </p>
                    </li>
                  ) : null}
                  {!isEmpty(service.chkDlrPrdCn) && service.chkDlrPrdCn == 'Y' ? (
                    <li>
                      <p>
                        경매낙찰 차량 보내기
                        <span>
                          <i className="ico-dot" />
                          광고대기 상태의 경매장 낙찰 차량은 발송자의 경우 대표자 딜러계정으로 변경되며, 수신인의 경우 발송자의 ID로 변경됩니다.
                        </span>
                      </p>
                    </li>
                  ) : null }
                  {!isEmpty(service.chkDlrAdPrdCnt) && service.chkDlrAdPrdCnt == 'Y' ? (
                    <li>
                      <p>
                        이용중인 광고 상품
                        <span>
                          <i className="ico-dot" />
                          환불 정책에 의거하여 환불가능 상품에 한해 환불처리를 진행합니다.
                        </span>
                        <span>
                          <i className="ico-dot" />
                          자세한 사항은 환불정책을 확이하여 주시기 바랍니다.
                          <span className="tx-gray" onClick={termsOpen}>
                            환불정책 자세히보기
                          </span>
                        </span>
                      </p>
                    </li>
                  ) : null }
                  {!isEmpty(service.point) && service.point == 'Y' ? (
                    <li>
                      <p>
                        포인트
                        <span>
                          <i className="ico-dot" />
                          보유 포인트는 <em className="tx-blue80">{service.pointAmt}</em>P 이며, 회원탈퇴시 보유 포인트는 소멸됩니다.
                        </span>
                      </p>
                    </li>
                  ) : null }
                  {!isEmpty(service.self1) && !isEmpty(service.self2) && (service.self1 == 'Y' || service.self2 == 'Y') ? (
                    <li>
                      <p>
                        셀프평가 진행 및 수수료 안내
                        <span>
                          <i className="ico-dot" />
                          고객과 셀프평가 거래가 진행 중입니다. 완료 후 탈퇴가 가능합니다.
                        </span>
                        <span>
                          <i className="ico-dot" />
                          셀프평가 미정산 수수료는 <em className="tx-blue80">{service.selfAmt}</em>원 이며, 납부 이후 탈퇴처리가 완료됩니다.
                        </span>
                      </p>
                    </li>
                  ) : null }
                </ul>
              </div>
              <div className="inner pt0">
                <p className="exp">
                  회원 탈퇴 시 <span className="tx-red80">30일 이내 재가입 불가</span>하며, 이용내역은 일정기간 보관 이후 삭제됩니다.<br />
                  <span className="tx-gray" onClick={handleFullpagePopup2} >개인정보처리방침 자세히보기</span>
                </p>
                <p className="exp mt8">
                  본인 인증 후 탈퇴신청이 완료되며, <span className="tx-blue80">관리자 확인 후 탈퇴처리가 완료</span>됩니다.
                </p>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={(e) => onConfirmHandler(e, service.chkAaIdCnt, service.chkDlrPrdCnt, service.chkDlrAdPrdCnt, service.point, service.self1)}
                />
              </div>
            </MobBottomArea>

            <MobFullpagePopup active={mFullpagePopup}>
              {fpTerms && <MobTermsView callback={closeFullpagePopup} />}
              {fpPolicy && (
                <MobTermsView agree_term={policyData} selectDate={true} selectOptions={policyOptionList} callback={closeFullpagePopup} onClick={(num) => setOptionData(policyEfrcDtList, 'N', num)} />
              )}
              {<CertificationMod show={certShowMod} callback={certCallback} />}
            </MobFullpagePopup>
          </div>
        </div>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1" />
            <p>정말 탈퇴하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-info-pw withdrawal">
          <div className="mypage-admin-title">
            <h3>회원탈퇴</h3>
            <p className="tx-exp-tp5">&#8251; 그동안 현대 글로비스 오토벨을 이용해주신 고객님께 감사드립니다.</p>
            <p className="tx-exp-tp5">&#8251; 탈퇴 사유를 알려주시면 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.</p>
          </div>

          <div className="withdrawal-reason">
            <p>
              탈퇴 사유 선택
              <br />
              (중복 선택 가능)
            </p>
            <ul>
              <li>
                <CheckBox id="chk0010" title="서비스 기능 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk1')} />
              </li>
              <li>
                <CheckBox id="chk0020" title="서비스 정책 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk2')} />
              </li>
              <li>
                <CheckBox id="chk0030" title="개인정보 및 보안우려" onChange={(e) => onChangeCheckBox(e, 'idChk3')} />
              </li>
              <li>
                <CheckBox id="chk0040" title="고객 응대에 대한 불만족" onChange={(e) => onChangeCheckBox(e, 'idChk4')} />
              </li>
              <li>
                <CheckBox id="chk0050" title="타사 서비스 이용" onChange={(e) => onChangeCheckBox(e, 'idChk5')} />
              </li>
              <li>
                <CheckBox id="chk0060" title="이용 빈도 낮음" onChange={(e) => onChangeCheckBox(e, 'idChk6')} />
              </li>
            </ul>
            <Textarea countLimit={500} type="tp2" onChange={onHandlerChange} data={leaveReason} name="leaveReason" />
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="탈퇴취소" width={127} height={48} href="/mypage/dealer/sellcar/carManagement" />
            <Button size="big" background="blue80" title="탈퇴하기" width={127} height={48} onClick={(e) => modalConfirmPopup(e, 'fade')} />
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow6} type={'slideUp'} closedHandler={modalCloseHandler6} title="이용중인 서비스" mode="normal" size="small">
        <div className="con-wrap popup-use-service">
          {service.chkAaIdCnt == 'N' && service.chkDlrPrdCnt == 'N' && service.chkDlrAdPrdCnt == 'N' && service.point == 'N' && service.self1 == 'N' ? null : (
            <>
              {' '}
              <p className="service-tit">고객님의 서비스 이용 현황입니다.</p>
            </>
          )}
          {!isEmpty(service.chkAaIdCnt) && service.chkAaIdCnt == 'Y' ? (
            <>
              <p className="name">경매회원</p>
              <div className="cont">
                <p>
                  <i className="ico-dot mid" />오토벨을 탈퇴하시더라도 경매장은 계속 이용하실 수 있습니다.
                </p>
                <p>
                  <i className="ico-dot mid" />경매회원 탈퇴는 경매장에 문의해주세요.
                </p>
              </div>
            </>
          ) : null}

          {!isEmpty(service.chkDlrPrdCn) && service.chkDlrPrdCn == 'Y' ? (
            <>
              <p className="name">경매낙찰 차량 보내기</p>
              <div className="cont">
                <p>
                  <i className="ico-dot mid" />광고대기 상태의 경매장 낙찰 차량은 발송자의 경우 대표자 딜러계정으로 변경되며, 수신인의 경우 발송자의 ID로 귀속됩니다.
                </p>
                {/* #a1 문구변경 */}
              </div>
            </>
          ) : null}

          {!isEmpty(service.chkDlrAdPrdCnt) && service.chkDlrAdPrdCnt == 'Y' ? (
            <>
              <p className="name">이용중인 광고상품</p>
              <div className="cont">
                <p>
                  <i className="ico-dot mid" />환불 정책에 의거하여 환불가능 상품에 한해 환불처리를 진행합니다. 자세한 사항은 환불정책을 확인하여 주시기 바랍니다.
                  <Button size="sml" line="gray" radius={true} title="환불정책 자세히보기" width={120} height={24} />
                </p>
              </div>
            </>
          ) : null}

          {!isEmpty(service.point) && service.point == 'Y' ? (
            <>
              <p className="name">포인트</p>
              <div className="cont">
                <p>
                  <i className="ico-dot mid" />보유 포인트는 <span className="tx-blue80">{service.pointAmt}</span> P 이며, 회원탈퇴 시 보유 포인트는 소멸됩니다.
                </p>
              </div>
            </>
          ) : null}

          {!isEmpty(service.self1) && !isEmpty(service.self2) && (service.self1 == 'Y' || service.self2 == 'Y') ? (
            <>
              <p className="name">셀프평가 진행 및 수수료 안내</p> {/* #a2 문구 수정 */}
              <div className="cont">
                <p>
                  <i className="ico-dot mid" />고객과 셀프평가 거래가 진행 중입니다. 완료 후 탈퇴가 가능합니다.
                </p>{' '}
                {/* #a2 문구 추가 */}
                <p>
                  <i className="ico-dot mid" />셀프평가 미정산 수수료는 <span className="tx-blue80">{service.selfAmt}</span> 원 이며, 납부 이후 탈퇴처리가 완료됩니다.
                </p>
              </div>
            </>
          ) : null}

          <p className="ex">
            회원 탈퇴 시<span className="tx-red80"> 30일 이내 재가입 불가</span>하며, 이용내역은 일정기간 보관 이후 삭제됩니다.
            <br />
            <Button size="sml" line="gray" radius={true} title="개인정보처리방침 자세히보기" width={175} height={24} onClick={onHandlerTmsTp} />
            <br />
            본인 인증 후 탈퇴신청이 완료되며,<span className="tx-blue80"> 관리자 확인 후 탈퇴처리가 완료</span>됩니다.
          </p>

          <p className="next">계속 진행하시겠습니까?</p>

          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={onCancelHandler} />
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={130}
              height={48}
              onClick={(e) => onConfirmHandler(e, service.chkAaIdCnt, service.chkDlrPrdCnt, service.chkDlrAdPrdCnt, service.point, service.self1)}
            />
          </Buttons>
        </div>
      </RodalPopup>
      {<Certification show={certShow} callback={certCallback} />}
      <RodalPopup show={rodalShow7} type={'fade'} width={375} closedHandler={modalCloseHandler7} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>{msg}</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default leaveLastMember;
