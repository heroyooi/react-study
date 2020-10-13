import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea.js';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SystemContext } from '@src/provider/SystemProvider';
import { createValidator } from '@lib/share/validator';
import { insertPartnerQuest } from '@src/actions/main/mainAction';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTermsView from '@src/components/common/MobTermsView';
import { MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { SET_PC_PARTNER_REQUEST_POPUP } from '@src/actions/main/mainTypes';
import { selectPolicyEfrcDtList, selectPolicyInfo } from '@src/actions/footer/policyAction';

const Footer = () => {
  const dispatch = useDispatch();
  // #a1 추가 start
  //  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  // const [storePopupShow, setStorePopupShow, openStorePopup, closeStorePopup] = useRodal(false); //제휴문의 팝업-redux제어로 변경
  const [isCertify, setIsCertify] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const { isPartnerQuestInsert, isPartnerReqPopupShow } = useSelector((state) => state.main);
  const { showAlert, showConfirm, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [fpBottom, setFpBottom] = useState(0);

  //제휴문의 팝업 오픈
  const openStorePopup = useCallback((e) => {
    e && typeof e.preventDefault === 'function' && e.preventDefault();
    console.log('SET_PC_PARTNER_REQUEST_POPUP 제휴문의 팝업 오픈 openStorePopup ');

    dispatch({
      type: SET_PC_PARTNER_REQUEST_POPUP,
      data: { isPopup: true }
    });
  }, []);

  //제휴문의 팝업 닫기
  const closeStorePopup = useCallback((e) => {
    e && typeof e.preventDefault === 'function' && e.preventDefault();
    console.log('SET_PC_PARTNER_REQUEST_POPUP 제휴문의 팝업 닫기 closeStorePopup ');

    dispatch({
      type: SET_PC_PARTNER_REQUEST_POPUP,
      data: { isPopup: false }
    });
  }, []);

  const [inputs, setInputs] = useState({
    cmpyNm: '',
    mngrNm: '',
    telNo: '',
    telNo1: '',
    telNo2: '',
    telNo3: '',
    emlAddr: '',
    emlAddr1: '',
    emlAddr2: '',
    ttl: '',
    quesCntn: '',
    prgrSttCd: '0010'
  });

  const { cmpyNm, mngrNm, telNo, telNo1, telNo2, telNo3, emlAddr, emlAddr1, emlAddr2, ttl, quesCntn, prgrSttCd } = inputs;
  /*
dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '제휴문의',
              options: ['close']
            }
          });
  */
  //pc 제휴문의
  const handleCertify = useCallback(
    (e) => {
      e.preventDefault();
      console.log('보내기(handleCertify) inputs=%o', inputs);

      if (isEmpty(cmpyNm)) {
        showAlert('회사명을 입력하세요');
        return;
      }
      if (isEmpty(mngrNm)) {
        showAlert('담당자 성함 입력하세요');
        return;
      }
      if (isEmpty(telNo1) || isEmpty(telNo2) || isEmpty(telNo3)) {
        showAlert('전화번호를 입력하세요');
        return;
      }
      if (isEmpty(emlAddr1) || isEmpty(emlAddr2)) {
        showAlert('이메일주소를 입력하세요');
        return;
      }
      if (isEmpty(ttl)) {
        showAlert('제목을 입력하세요');
        return;
      }
      if (isEmpty(quesCntn)) {
        showAlert('문의내용 입력하세요');
        return;
      }

      // setIsCertify(true);//isPartnerQuestInsert
      dispatch(insertPartnerQuest(inputs));
    },
    [cmpyNm, dispatch, emlAddr, inputs, mngrNm, quesCntn, showAlert, telNo, ttl]
  );

  // 컨펌&얼럿 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);

  const handleMobCertify = useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(cmpyNm)) {
        showAlert('회사명을 입력하세요');
        return;
      }
      if (isEmpty(mngrNm)) {
        showAlert('담당자 성함 입력하세요');
        return;
      }
      if (isEmpty(telNo)) {
        showAlert('전화번호를 입력하세요');
        return;
      }
      if (isEmpty(emlAddr)) {
        showAlert('이메일주소를 입력하세요');
        return;
      }
      if (isEmpty(ttl)) {
        showAlert('제목을 입력하세요');
        return;
      }
      if (isEmpty(quesCntn)) {
        showAlert('문의내용 입력하세요');
        return;
      }

      dispatch(insertPartnerQuest(inputs));
      setMpop(true);
    },
    [cmpyNm, dispatch, emlAddr, inputs, mngrNm, quesCntn, setMpop, showAlert, telNo, ttl]
  );

  //텍스트값 변경시
  const onChangeText = useCallback((e, target) => {
    e.preventDefault();
    const value = e.target.value;

    setInputs(
      produce((draft) => {
        draft[target] = value;
      })
    );
    console.log('onChangeText target = %s, value = %s , inputs = %o ', target, value, inputs);
  }); //

  useEffect(() => {
    console.log('useEffect>isPartnerReqPopupShow=%', isPartnerReqPopupShow);
    if (!isPartnerReqPopupShow) {
      setInputs({
        cmpyNm: '',
        mngrNm: '',
        telNo: '',
        telNo1: '',
        telNo2: '',
        telNo3: '',
        emlAddr: '',
        emlAddr1: '',
        emlAddr2: '',
        ttl: '',
        quesCntn: '',
        prgrSttCd: '0010'
      });
    }
  }, [isPartnerReqPopupShow]);

  useEffect(() => {
    console.log('useEffect>isPartnerQuestInsert=%o', isPartnerQuestInsert);
    if (isPartnerQuestInsert) setIsCertify(true);
  }, [isPartnerQuestInsert]);

  //  #a1 추가 end
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);
  const mPdBottom = useSelector((state) => state.common.mPdBottom);
  const [fpInquire, setFpInquire] = useState(false); // 제휴문의팝업
  const [fpAterms, setFpAterms] = useState(false); // 이용/환불약관
  const [fpPolicy, setFpPolicy] = useState(false); // 개인정보처리방침

  const policyEfrcDtList = useSelector((state) => state.policy.policyEfrcDtList); //조회결과
  const [policyEfrcDtListTemp, setPolicyEfrcDtListTemp] = useState([]); //시행일 리스트
  const [policyOptionList, setPolicyOptionList] = useState([]);
  const policyInfo = useSelector((state) => state.policy.policyInfo); //조회결과
  const [policyData, setPolicyData] = useState([]);
  // useEffect(() => {
  //   dispatch(selectPolicyEfrcDtList({ tmsTp: '0020' })); //시행일 조회
  // }, []);
  useEffect(() => {
    // const optionListTemp = [];
    if (policyEfrcDtList.length > 0) {
      setPolicyEfrcDtListTemp(policyEfrcDtList);
      setOptionData(policyEfrcDtList, 'Y', 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyEfrcDtList]);

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
    setPolicyData(policyInfo.tmsCntn);
  }, [policyInfo]);

  if (hasMobile) {
    // 풀페이지 팝업 START

    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'Inquire') {
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '제휴문의',
              options: ['close']
            }
          });
          setFpBottom(0);
          setFpInquire(true);
          setFpAterms(false);
          setFpPolicy(false);
        } else if (name === 'Aterms') {
          dispatch(selectPolicyEfrcDtList({ tmsTp: '0100' }));
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '오토벨 이용약관',
              options: ['back', 'close']
            }
          });
          setFpBottom(56);
          setFpInquire(false);
          setTimeout(() => setFpAterms(true), 750);
          setFpPolicy(false);
        } else if (name === 'Policy') {
          dispatch(selectPolicyEfrcDtList({ tmsTp: '0800', tmsSbj: '0010', tmsDiv: '0820' }));
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '개인정보처리방침',
              options: ['back', 'close']
            }
          });
          setFpBottom(56);
          setFpInquire(false);
          setFpAterms(false);
          setTimeout(() => setFpPolicy(true), 750);
        }
      },
      [dispatch]
    );

    const closeFullpagePopup = useCallback(
      (e) => {
        e.preventDefault();
        setFpAterms(false);
        setFpPolicy(false);
        setFpInquire(false);
        dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
      },
      [dispatch]
    );
    // 풀페이지 팝업 END

    const onSelectTerms = useCallback(
      (num, e) => {
        e.preventDefault();
        // console.log('policyEfrcDtListTemp', policyEfrcDtListTemp);
        setOptionData(policyEfrcDtListTemp, 'N', num);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [policyEfrcDtListTemp, policyOptionList]
    );

    return (
      <>
        <footer id="footer-sec" style={{ paddingBottom: mPdBottom }}>
          <div className="sec-top">
            <div className="inner">
              <h3 className="hide">하단 메뉴</h3>
              <ul className="ft-menu">
                <li>
                  <a href="https://www.glovis.net/Kor/company/contentsid/228/index.do" target="_blank">
                    회사소개
                  </a>
                </li>
                {/* #a1 */}
                <li onClick={handleFullpagePopup('Inquire')}>제휴문의</li>
                <li onClick={handleFullpagePopup('Aterms')}>이용약관</li>
                <li onClick={handleFullpagePopup('Policy')}>개인정보처리방침</li>
              </ul>
            </div>
          </div>
          <div className="sec-bottom">
            <div className="inner">
              <h2 className="ft-logo">
                <Link href="/main">
                  <a>하단 로고</a>
                </Link>
              </h2>
              <div className="copyright">
                <p>
                  <span>현대글로비스㈜ 서울특별시 강남구 테헤란로 301</span>
                  <span>사업자등록번호 : 106-81-97118</span>
                  <span>개인정보보호책임자 : 정봉영(국내오토비즈사업실)</span>
                  <span>통신판매업신고 : 강남-13399</span>
                  <span>현대글로비스(주)는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보제공 및 거래에 관한 의무와 책임은
  판매자에게 있습니다.</span>
                </p>
                
                <p>
                  <span>Copyright (c) HYUNDAI GLOVIS Co., Ltd.</span>
                  <span>All Rights Reserved.</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* #a1 제휴문의 팝업추가 start */}
        <MobFullpagePopup active={mFullpageCPopup} cPop={true} paddingBottom={fpBottom}>
          {fpInquire && (
            <>
              <div className="live-tit">
                <p>
                  제휴문의에 관하여 궁금한 사항을 보내주시면
                  <br />
                  담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.
                </p>
              </div>
              <div className="content-wrap inquire-wrap v-2">
                <form>
                  <fieldset>
                    <legend className="away">제휴문의</legend>
                    <table summary="제휴문의에 대한 내용" className="table-tp2">
                      <caption className="away">제휴문의</caption>
                      <colgroup>
                        <col width="24%" />
                        <col width="76%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>회사명</th>
                          <td>
                            <Input type="text" name="cmpyNm" value={cmpyNm} maxLength={50} id="f-agency-name" onChange={(e) => onChangeText(e, 'cmpyNm')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="m-user-name">담당자 성함</label>
                          </th>
                          <td>
                            <Input type="text" name="mngrNm" value={mngrNm} maxLength={50} id="f-user-name" onChange={(e) => onChangeText(e, 'mngrNm')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="m-user-phone">전화번호</label>
                          </th>
                          <td>
                            <Input type="text" name="telNo" numberOnly={true} value={telNo} maxLength={11} id="f-user-phone" onChange={(e) => onChangeText(e, 'telNo')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="m-email">이메일 주소</label>
                          </th>
                          <td>
                            <Input type="text" name="emlAddr" value={emlAddr} maxLength={50} id="f-email" onChange={(e) => onChangeText(e, 'emlAddr')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="m-partner-name">제목</label>
                          </th>
                          <td>
                            <Input type="text" name="ttl" value={ttl} maxLength={50} id="f-name" onChange={(e) => onChangeText(e, 'ttl')} />
                          </td>
                        </tr>
                        <tr>
                          <th>문의내용</th>
                          <td>
                            <Textarea name="quesCntn" data={quesCntn} maxLength={200} countLimit={400} type="tp1" height={176} onChange={(e) => onChangeText(e, 'quesCntn')} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>
                <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={(e) => handleMobCertify(e)} />
                {/* <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={(e) => openMpop(e, 'fade')} /> */}
              </div>

              <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
                <div className="con-wrap">
                  <p className="tit1">제휴문의가 접수되었습니다.</p>
                  <p>빠른 시일안에 담당자가 연락드리겠습니다.</p>
                  <Buttons align="right" marginTop={16}>
                    <Button fontSize={14} title="확인" color="blue80" fontWeight={500} href="/main" />
                  </Buttons>
                </div>
              </RodalPopup>
            </>
          )}
          {fpAterms && <MobTermsView agree_term={policyData} selectDate={true} selectOptions={policyOptionList} callback={closeFullpagePopup} onClick={onSelectTerms} />}
          {fpPolicy && <MobTermsView agree_term={policyData} selectDate={true} selectOptions={policyOptionList} callback={closeFullpagePopup} onClick={onSelectTerms} />}
        </MobFullpagePopup>
      </>
    );
  }
  return (
    <>
      <footer id="footer-sec">
        <div className="sec-top">
          <div className="inner">
            <h3 className="hide">하단 메뉴</h3>
            <ul className="ft-menu">
              <li>
                <a href="https://www.glovis.net/Kor/company/contentsid/228/index.do" target="_blank">
                  회사소개
                </a>
              </li>
              <li>
                <Link href="#">
                  <a onClick={(e) => openStorePopup(e, 'fade')}>제휴문의</a>
                </Link>
              </li>
              <li>
                <Link href="/common/policy?tmsTp=0100">
                  <a>이용약관</a>
                </Link>
              </li>
              <li>
                <Link href="/common/policy?tmsTp=0800">
                  <a>개인정보처리방침</a>
                </Link>
              </li>
              {/**
               * <li><Link href=""><a>영상정보처리방침</a></Link></li>
               */}
            </ul>
          </div>
        </div>
        <div className="sec-bottom">
          <div className="inner">
            <h2 className="ft-logo">
              <a href="http://www.glovis.net/Kor/main/index.do" target="_blank">
                하단 로고
              </a>
            </h2>
            <div className="copyright">
              <p>
                <span>현대글로비스㈜ 서울특별시 강남구 테헤란로 301</span>
                <i className="line"></i>
                <span>사업자등록번호 : 106-81-97118</span>
              </p>
              <p>
                <span>개인정보보호책임자 : 정봉영(국내오토비즈사업실)</span>
                <i className="line"></i>
                <span>통신판매업신고 : 강남-13399</span>
              </p>
              <p>현대글로비스(주)는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.</p>
              <p>상품, 상품정보제공 및 거래에 관한 의무와 책임은 판매자에게 있습니다.</p>
              <p>
                <span>COPYRIGHT (C) HYUNDAI GLOVIS CO., LTD. ALL RIGHTS RESERVED.</span>
              </p>
            </div>
            <div className="sec-inquiry">
              <h4>오토벨 고객센터</h4>
              <ul className="inquiry">
                <li className="time">평일 9시~18시</li>
                <li className="ars">1600-0080</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <RodalPopup show={isPartnerReqPopupShow} type={'fade'} closedHandler={closeStorePopup} mode="normal" title="제휴문의" size="small">
        <div className="popup-inquire">
          <div className="inquire-wrap">
            {isCertify === false && (
              <>
                <p className="tx-tit">
                  제휴문의에 관하여 궁금한 사항을 보내주시면
                  <br />
                  담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.
                </p>
                <form>
                  <fieldset>
                    <legend className="away">제휴문의</legend>
                    <table summary="제휴문의에 대한 내용" className="table-tp2">
                      <caption className="away">제휴문의</caption>
                      <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <label htmlFor="f-agency-name">회사명</label>
                          </th>
                          <td>
                            <Input type="text" name="cmpyNm" value={cmpyNm} maxLength={50} id="f-agency-name" onBlur={(e) => onChangeText(e, 'cmpyNm')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="f-user-name">담당자 성함</label>
                          </th>
                          <td>
                            <Input type="text" name="mngrNm" value={mngrNm} maxLength={50} id="f-user-name" onBlur={(e) => onChangeText(e, 'mngrNm')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="f-user-phone">전화번호</label>
                          </th>
                          <td>
                            <span className="bridge">
                              <Input type="text" name="telNo1" numberOnly={true} value={telNo1} maxLength={4} id="f-user-phone" width={119} onBlur={(e) => onChangeText(e, 'telNo1')} />
                            </span>
                            <span className="bridge">
                              <Input type="text" name="telNo2" numberOnly={true} value={telNo2} maxLength={4} id="f-user-phone2" width={119} onBlur={(e) => onChangeText(e, 'telNo2')} />
                            </span>
                            <Input type="text" name="telNo3" numberOnly={true} value={telNo3} maxLength={4} id="f-user-phone3" width={108} onBlur={(e) => onChangeText(e, 'telNo3')} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="f-email">이메일 주소</label>
                          </th>
                          <td>
                            <span className="bridge2">
                              <Input type="text" name="emlAddr1" value={emlAddr1} maxLength={50} id="f-email" onBlur={(e) => onChangeText(e, 'emlAddr1')} width={168} />
                              <em className="mg8">@</em>
                              <Input type="text" name="emlAddr2" value={emlAddr2} maxLength={50} id="f-email2" onBlur={(e) => onChangeText(e, 'emlAddr2')} width={169} />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>제목</th>
                          <td>
                            <Input type="text" name="ttl" value={ttl} maxLength={50} id="f-name" onBlur={(e) => onChangeText(e, 'ttl')} />
                          </td>
                        </tr>
                        <tr>
                          <th>문의내용</th>
                          <td>
                            <Textarea name="quesCntn" data={quesCntn} maxLength={200} countLimit={400} type="tp1" height={218} onBlur={(e) => onChangeText(e, 'quesCntn')} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>
                <Buttons align="center" marginTop={20} className="w-line">
                  <Button size="big" background="gray" title="취소" width={180} height={60} onClick={closeStorePopup} />
                  <Button size="big" background="blue80" title="보내기" width={180} height={60} onClick={(e) => handleCertify(e)} />
                </Buttons>
              </>
            )}
            {isCertify === true && (
              <>
                <div className="co-wrap">
                  <p>
                    <span className="ico-wrap">
                      <i className="ico-document"></i>
                    </span>
                    제휴문의가
                    <br />
                    접수되었습니다.
                  </p>
                </div>
                <p className="tx-sub">* 빠른 시일안에 담당자가 연락드리겠습니다.</p>
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="blue80" title="확인" width={180} height={60} />
                </Buttons>
              </>
            )}
          </div>
        </div>
      </RodalPopup>
    </>
  );
};

export default Footer;
