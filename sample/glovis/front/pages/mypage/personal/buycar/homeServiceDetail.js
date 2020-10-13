import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { ClipLoader, PulseLoader } from 'react-spinners';
import RenderHelper from '@lib/share/render/helper';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import FindAddress from '@src/components/common/popup/FindAddress';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

import { confirmPurchase, cancelPurchase, getHomeServiceMobDetail } from '@src/actions/mypage/personal/buycar/homeService/homeServiceAction';
import { setComma } from '@src/utils/StringUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { aixosUpFile, axiosPost, imgUrl } from '@src/utils/HttpUtils';
import { createValidator } from '@lib/share/validator';
import changeAddress from '@lib/share/validator/mypage/personal/changeAddress';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea'; //#a1 참고
import { preventScroll } from '@src/utils/CommonUtil';
import { STATUS_ARRS, showChgAddrBtn, setChgAddrRodal, showCnclBtn, setCancelRodal, showCnfmBtn, showRcptBtn } from '../buycar/homeService';

function setStyleByCode(dataCode, ...liCode) {
  return liCode.some((e) => e === dataCode) ? 'tx-blue80' : '';
}

const HomeServiceDetail = memo(() => {
  const dispatch = useDispatch();

  // 모바일 팝업
  const [canclePop, setCanclePop, openCanclePop, closeDimmCanclePop] = useRodal(false); // 구매취소
  const [changePop, setChangePop, openChangePop, closeDimmChangePop] = useRodal(false);
  const [uploadMsg, setUploadMsg] = useState(false);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert } = useContext(SystemContext);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const addrData = useSelector((store) => store.myHomeServiceNormal.addrData, {});
  const listDetail = useSelector((store) => store.myHomeServiceNormal.homeServiceMobileDetail, {});
  const [cancelRsnText, setCancelRsnText] = useState(''); //  취소사유 내용
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false); // 로딩 Spinner show/hide 여부
  // 번호 리스트
  // const FM005List = useSelector((state) => state.commonCode.commonCodeList.FM005, []);

  //validation
  const addrValidator = createValidator(changeAddress);
  const hpnValidator = createValidator({ pn2: changeAddress.pn2, pn3: changeAddress.pn3 });

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
    await dispatch(cancelPurchase('', listDetail.hsvcId, cnclRsnCd, cancelRsnText, hasMobile)).then((returncd) => {
      if (returncd === 'SUCCESS') {
        //Rodal 닫기 및 취소사유 초기화
        setActive1(false);
        setDimm1(false);
        setIsValue1(1);
        setCancelRsnText('');
      } else {
        console.log('취소 중 오류 발생');
      }
    });
  };

  // bottom
  const [dimm, setDimm] = useState(false);
  const [dimm1, setDimm1] = useState(false);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [phoneNumList, setPhoneNumList] = useState([]);
  const handleOpenAddress = useCallback(
    (e) => {
      e.preventDefault();

      if (setChgAddrRodal(listDetail) === 'impossible') {
        setChangePop(true);
      } else {
        // addrData.formData.pn1

        const mobileOptions = [
          { id: 'radio_phone_1', value: 1, checked: true, disabled: false, label: '010', name: 'pn1' },
          { id: 'radio_phone_2', value: 2, checked: false, disabled: false, label: '011', name: 'pn1' },
          { id: 'radio_phone_7', value: 3, checked: false, disabled: false, label: '016', name: 'pn1' },
          { id: 'radio_phone_8', value: 4, checked: false, disabled: false, label: '017', name: 'pn1' },
          { id: 'radio_phone_9', value: 5, checked: false, disabled: false, label: '018', name: 'pn1' },
          { id: 'radio_phone_10', value: 6, checked: false, disabled: false, label: '019', name: 'pn1' }
        ];

        mobileOptions.map((v) => {
          console.log(v);
          if (v.label === addrData.pn1) {
            v.checked = true;
          } else {
            v.checked = false;
          }
          return v;
        });
        setPhoneNumList(mobileOptions);
        setFormData(addrData);
        setActive(true);
        setDimm(true);
        preventScroll(true);
      }
    },
    [addrData, listDetail.cnsgStatCd, listDetail.sttDvcd, setChangePop, setPhoneNumList]
  );
  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);
  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseDimm();
    },
    [handleCloseDimm]
  );
  const handleOpenCancle = useCallback(() => {
    setCanclePop(false);
    setCancelRsnText('');
    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, [setCanclePop]);

  // 풀페이지 팝업 START
  const addressOpen = (e) => {
    handleFullpagePopup(e);
  };
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fpAddress, setFpAddress] = useState(false);
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '우편번호',
          options: ['close']
        }
      });
      setFpAddress(true);
      // eslint-disable-next-line no-return-assign
    },
    [dispatch]
  );

  const AddressEvent = useCallback(
    (e, result) => {
      setFormData((prev) => ({ ...prev, zcd: result.postCode, addr1: result.addData, addr2: result.detailText, locCd: result.locCd, ctyCd: result.ctyCd }));
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
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

  const stopTimer = useCallback(() => {
    clearInterval(timer);
    setTimerFlag(true);
    setFormData((prev) => ({ ...prev, certNum2: '' }));
  });

  useEffect(() => {
    if (timerFlag === false) stopTimer();
  }, [stopTimer, timerFlag]);

  const handleGetCertNum = useCallback(
    (e) => {
      e.preventDefault();
      const tempData = { pn2: formData.pn2, pn3: formData.pn3 };
      const valid = hpnValidator.validate(tempData);
      if (valid.error) {
        return showAlert(valid.error.message);
      }
      setIsLoading(true);
      axiosPost('/api/homeservice/sendAuthenticationNumber.do', { mbHpNo: formData.pn1.concat(formData.pn2, formData.pn3) }).then(({ data }) => {
        setIsLoading(false);
        if (data.statusinfo.returncd === '000') {
          showAlert('인증번호를 SMS로 발송했습니다. <br/>제한시간 내에 인증을 진행해주세요.');
          setFormData((prev) => ({ ...prev, certNum2: data.authenticationNumber }));
          startTimer(180);
        } else {
          showAlert('인증번호 전송 실패', 'error');
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.pn1, formData.pn2, formData.pn3, hpnValidator, showAlert]
  );

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
      const tempData = { ...formData };
      delete tempData.certNum2;
      const valid = addrValidator.validate(tempData);
      if (valid.error) {
        showAlert(valid.error.message);
        return false;
      }

      if (!isCert) return showAlert('인증되지 않았습니다.<br/>휴대폰 인증을 진행해주세요.');

      const submitData = { ...formData, reciHpPnEnc: formData.pn1.concat(formData.pn2, formData.pn3) };
      // console.log('submitData : ', submitData);
      setIsLoading(true);
      axiosPost('/api/mypage/user/updateDestAddrInfo.do', submitData)
        .then((res) => {
          setIsLoading(false);
          setIsCert(false);
          setTimeView('인증번호를 입력해주세요.');
          if (res?.data?.statusinfo?.returncd !== '000' && res?.data?.statusinfo?.returncd !== 'SUCCESS') {
            showAlert('주소변경 실패');
            return false; // 주소변경 등록 실패
          }
          showAlert('주소변경이 완료되었습니다.');
          dispatch(getHomeServiceMobDetail(listDetail.hsvcId));
          // setShippingShow(false);
          setDimm(false);
          setActive(false);
          // setFormData(initFormData); // 입력데이터 초기화
        })
        .catch((err) => {
          setIsLoading(false);
          setIsCert(false);
          setTimeView('인증번호를 입력해주세요.');
          console.log('전송 실패! ', err);
        });
    },
    [formData, addrValidator, isCert, showAlert, dispatch, listDetail.hsvcId]
  );

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(1);
  const [isTextArea, setIsTextArea] = useState(isValue1 === 4 ? true : false);
  const handleChange1 = (e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
    setIsTextArea(Number(e.target.value) === 4 ? true : false);
  };

  //취소사유 Textarea
  const textareaBlur = (e) => {
    setCancelRsnText(e.target.value);
  };
  const textareaFocus = (e) => {
    setCancelRsnText(e.target.value);
  };

  // 보험증서 인풋
  // InputFile & InputPicture
  const uploadList1 = (files) => {
    if (files && (typeof files === 'object' || Array.isArray(files))) {
      setFile(files[0]);
    }
  };

  //보험서류 업로드
  const handleFileUpload = useCallback(
    (e, hsvcId) => {
      e.preventDefault();
      setIsLoading(true);
      const formDatas = new FormData();
      formDatas.append('hsvcId', hsvcId);
      formDatas.append('insuFiles', file);
      // TODO: 추후 url 변경필
      aixosUpFile('/api/mypage/user/uploadInsuFile.do', formDatas)
        .then(({ data }) => {
          setIsLoading(false);
          setUploadMsg(true);
          dispatch(getHomeServiceMobDetail(listDetail.hsvcId));
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setUploadMsg(false);
        });
    },
    [dispatch, file, listDetail.hsvcId]
  );

  const handleChangeForm = (e) => {
    // eslint-disable-next-line prefer-const
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

  useEffect(() => {
    setFormData(() => ({ ...addrData }));
  }, [addrData]);

  if (hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스 신청 내역',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 8,
          color: '#fff'
        }
      });

      // dispatch(getHomeServiceDetail(listDetail.hsvcId));
    }, [dispatch]);

    // 모바일 팝업
    const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);

    //구매확정
    const handleConfirm = useCallback(
      (e, hsvcId) => {
        e && e.preventDefault();
        setMpop(false);
        dispatch(confirmPurchase(hsvcId, '', hasMobile));
      },
      [dispatch, hasMobile, setMpop]
    );

    useEffect(() => {
      if (!listDetail.hsvcId) {
        showAlert('홈서비스 내역이 존재하지 않습니다.', () => Router.push('/mypage/personal/buycar/homeService'));
      }
    }, []);

    return (
      <AppLayout>
        <div className="general-sell-sec">
          <ul className="admin-list-wrap">
            <li>
              <ul className="date mb8">
                <li>신청일 : {listDetail.reqDt}</li>
              </ul>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src={`${imgUrl}${listDetail.carPhotoUrl}`} alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">{listDetail.carNm}</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>{listDetail.carNo}</span>
                            <span>{listDetail.firstRegDt}</span>
                            <span>{`${setComma(listDetail.drvDist)}km`}</span>
                            <span>{listDetail.mssNm}</span>
                            <span>{listDetail.carFuelNm}</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">
                                {setComma(listDetail.carAmt)} <span className="won">만원</span>
                              </p>
                            </div>
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
            <ul className="m-toggle-list up-blue fs16">
              <MenuItem>
                <MenuTitle>
                  진행현황
                  <span style={{ color: listDetail.cnclSttDvcd ? 'red' : '' }}>{listDetail.cnclSttDvcd ? listDetail.cnclSttNm : listDetail.sttNm}</span>
                </MenuTitle>
                <MenuCont>
                  {!listDetail.cnclSttDvcd && (
                    <ul className="pay-detail">
                      <li className={setStyleByCode(listDetail.sttDvcd, '0010')}>
                        <span className="title">1.신청완료</span>
                        <span className="sub">
                          접수가 완료되었습니다. <br /> 상담사가 곧 연락드릴 예정입니다.
                        </span>
                      </li>
                      <li className={setStyleByCode(listDetail.sttDvcd, '0020')}>
                        <span className="title">2.결제대기 중</span>
                        <span className="sub">결제내역을 확인하고 있습니다.</span>
                      </li>
                      <li className={setStyleByCode(listDetail.sttDvcd, '0030', '0070')}>
                        <span className="title">3.배송준비 중</span>
                        <span className="sub">
                          결제 완료 후 고객님께 <br /> 배송하기 위해 준비중입니다.
                        </span>
                      </li>
                      <li className={setStyleByCode(listDetail.sttDvcd, '0040')}>
                        <span className="title">4.배송중</span>
                        <span className="sub">
                          고객님이 원하는 시간, 장소로 배송이 출발되며 <br /> 진행상황이 안내됩니다.
                        </span>
                      </li>
                      <li className={setStyleByCode(listDetail.sttDvcd, '0050')}>
                        <span className="title">5.배송 완료</span>
                        <span className="sub">
                          차량 인수 후, 3일 이내 최종구매를
                          <br />
                          확정해주세요.(8일 이후 자동 확정)
                        </span>
                      </li>
                    </ul>
                  )}
                </MenuCont>
              </MenuItem>
            </ul>
            {!listDetail.cnclSttDvcd && listDetail.sttDvcd && showCnfmBtn(listDetail) && (
              <div className="progress-wrap">
                <p className="tit">최종 구매 확인</p>
                <p>
                  차량은 잘 받으셨나요? 3일 이내에 최종 구매 확정해주세요. <br /> (3일 이후 자동으로 구매확정 처리 됩니다.)
                </p>
                <Buttons align="center" marginTop={19}>
                  <Button size="sml" line="gray" radius={true} title="구매확정" width={61} fontWeight={500} onClick={(e) => openMpop(e, 'fade')} />
                  {!listDetail.cnclSttDvcd && listDetail.sttDvcd && showCnclBtn(listDetail) && (
                    <Button size="sml" line="gray" radius={true} title="취소신청" width={61} fontWeight={500} onClick={(e) => openCanclePop(e, 'fade')} />
                  )}
                </Buttons>
              </div>
            )}

            <div className="progress-wrap">
              <p className="tit">보험증서</p>
              {listDetail.insuBillFileId || '미첨부 '}
              {!listDetail.cnclSttDvcd && listDetail.sttDvcd && STATUS_ARRS.SHOW_INSU_FILE_BTN.some((e) => e === listDetail.sttDvcd) && (
                <>
                  <p>보험 가입 및 첨부를 해주셔야 차량 배송이 진행됩니다.</p>
                  <InputFile uploadList={uploadList1} defaultFilePath={listDetail.insuBillFileId && listDetail.insuBillFileNm} placeHolder="보험증서를 첨부해주세요." />
                  <Button
                    size="mid"
                    background="blue80"
                    radius={true}
                    fontWeight={500}
                    width={19.5}
                    measure={'%'}
                    marginLeft={5}
                    title="업로드"
                    onClick={(e) => handleFileUpload(e, listDetail.hsvcId)}
                  />
                  {!listDetail.insuBillFileId && (
                    <>
                      <p className="tx-sub tx-red80 mt8">보험증서 이미지를 첨부해주세요.</p>
                      {/* <p className="tx-sub tx-blue80 mt8">보험증서 첨부가 완료되었습니다.</p> */}
                    </>
                  )}
                  {listDetail.insuBillFileId && uploadMsg && (
                    <>
                      <p className="tx-sub tx-blue80 mt8">보험증서 첨부가 완료되었습니다.</p>
                    </>
                  )}
                </>
              )}
            </div>

            <ul className="pay-detail">
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2">결제 정보</h4>
                  {!listDetail.cnclSttDvcd && parseInt(listDetail?.sttDvcd || 0) <= 50 && (
                    //신청완료 ~ 배송완료
                    <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} onClick={(e) => openCanclePop(e, 'fade')} />
                  )}
                </div>
                <table summary="결제정보에 대한 내용" className="table-tp1 td-r">
                  <caption className="away">결제 정보</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차량가격</th>
                      <td>{setComma(listDetail.crAmt)}원</td>
                    </tr>
                    <tr>
                      <th>이전관리비</th>
                      <td>{setComma(listDetail.rdpmMgmtAmt)}원</td>
                    </tr>
                    <tr>
                      <th>EW가입비</th>
                      <td>{setComma(listDetail.atbWrntAmt)}원</td>
                    </tr>
                    <tr>
                      <th>탁송비</th>
                      <td>{setComma(listDetail.deliAmt)}원</td>
                    </tr>
                    <tr>
                      <th className="tx-b">총 결제금액</th>
                      <td className="tx-b">{setComma(listDetail.hsvcUseAmt)}원</td>
                    </tr>
                    <tr>
                      <th className="tx-b">결제방식</th>
                      <td>
                        {listDetail.athMthdNm}
                        <span>(이체금액 {setComma(listDetail.trnsAmt)}원)</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="tx-c tx-blue80 pd14">
                        {STATUS_ARRS.SHOW_PAY_CMPL.some((e) => e === listDetail.sttDvcd) && '결제완료'}
                        {!listDetail.cnclSttDvcd && listDetail.sttDvcd === '0020' && STATUS_ARRS.SHOW_RCPT_BTN_P.some((e) => e === listDetail.athMthdDvcd) && (
                          <>
                            입금계좌 : {listDetail.vactBankCd} {listDetail.vactNum} <br /> 예금주 : {listDetail.vactName}
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2">계약자/배송 정보</h4>
                  {!listDetail.cnclSttDvcd && listDetail.sttDvcd && showChgAddrBtn(listDetail) && (
                    <Button size="sml" line="gray" color="gray" radius={true} title="배송지변경" width={72} onClick={handleOpenAddress} />
                  )}
                </div>
                <table summary="계약자/배송 정보에 대한 내용" className="table-tp1">
                  <caption className="away">계약자/배송 정보</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>명의자</th>
                      <td>{listDetail.nom}</td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td>{setHpPnFormat(listDetail.hpNoEnc)}</td>
                    </tr>
                    <tr>
                      <th>주민등록상 주소</th>
                      {console.log('listDetail : ', listDetail)}
                      <td>{listDetail.addr}</td>
                    </tr>
                    <tr>
                      <th>환불 계좌번호</th>
                      <td>
                        {listDetail.bankNm} {listDetail.dpstNm} {listDetail.acntNoEnc}
                      </td>
                    </tr>
                    <tr>
                      <th>배송지 주소</th>
                      <td>{listDetail.destAddr}</td>
                    </tr>
                    <tr>
                      <th>수령인</th>
                      <td>{listDetail.reciNm}</td>
                    </tr>
                    <tr>
                      <th>배송지 연락처</th>
                      <td>{setHpPnFormat(listDetail.reciHpPnEnc)}</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>{listDetail.email}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2">판매자 정보</h4>
                  <Button size="sml" line="gray" color="gray" radius={true} title="전화하기" width={61} href={'tel:' + listDetail.dlrHpno} />
                </div>
                <table summary="판매자 정보에 대한 내용" className="table-tp1">
                  <caption className="away">판매자 정보</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>판매자명</th>
                      <td>{listDetail.dlrNm}</td>
                    </tr>
                    <tr>
                      <th>소속</th>
                      <td>{listDetail.entrCorpNm}</td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>{setHpPnFormat(listDetail.dlrHpno)}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
        <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1} zid={101}>
          <div className="inner">
            <p className="tit1 mb24">판매취소</p>
            <p className="tx-tit">취소사유</p>
            <ul className="radio-block tp3">
              <li>
                <Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} />
              </li>
              {setCancelRodal(listDetail) === 'cnclFee' && (
                <>
                  <li>
                    <Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} />
                  </li>
                  <li>
                    <Radio className="txt" id="cancel3" label="견적 불만 / 입찰자 없음" value={3} checked={isValue1} onChange={handleChange1} />
                  </li>
                </>
              )}
              <li>
                <Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} />
              </li>
            </ul>
            {isTextArea && (
              <>
                <p className="tx-tit mt24 mb8">
                  기타사유<em>(선택)</em>
                </p>
                <Textarea countLimit={200} type="tp1" height={133} data={cancelRsnText} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 사유를 작성해주세요." />
              </>
            )}
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleClose} />
            <Button
              size="big"
              background="blue80"
              title="확인"
              onClick={(e) => {
                e.preventDefault();
                handleCancelRsn();
              }}
            />
          </Buttons>
        </MobBottomArea>

        <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm} />
        <MobBottomArea active={active} isFixButton={true} zid={101}>
          <div className="inner">
            <p className="tit1 mb12">배송지 변경</p>
            <table summary="배송지 변경에 대한 내용" className="table-tp2 th-none">
              <caption className="away">배송지 변경</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">수령인</p>
                    <Input type="text" name={'reciNm'} value={formData.reciNm} onChange={(e) => handleChangeForm(e)} placeHolder="수령인을 입력해주세요." />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">배송지주소</p>
                    <span className="bridge2">
                      <Input readOnly={isCert} type="text" name={'zcd'} value={formData.zcd} onChange={(e) => handleChangeForm(e)} width="73%" />
                      <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={(e) => addressOpen(e, 0)} />
                    </span>
                    <span className="bridge2">
                      {/* <Input type="text" value="서울특별시 강남구 테헤란로 301" /> */}
                      <Input
                        readOnly={isCert}
                        type="text"
                        name={'addr1'}
                        value={formData.addr1}
                        onClick={(e) => {
                          handleChangeForm(e);
                        }}
                      />
                    </span>
                    <span className="bridge2">
                      {/* <Input type="text" value="현대글로비스(주)" /> */}
                      <Input type="text" name={'addr2'} value={formData.addr2} onChange={(e) => handleChangeForm(e)} placeHolder="상세주소를 입력해주세요." />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">배송지 연락처</p>
                    <span className="bridge2">
                      <MobSelectBox disabled={isCert} options={phoneNumList} value={formData.pn1} width="23.5%" onChange={(e) => handleChangeForm(e)} />
                      <Input readOnly={isCert} type="number" maxLength={4} onInput={handleOnInput} name={'pn2'} value={formData.pn2} onChange={(e) => handleChangeForm(e)} width="20%" />
                      <Input readOnly={isCert} type="number" maxLength={4} onInput={handleOnInput} name={'pn3'} value={formData.pn3} onChange={(e) => handleChangeForm(e)} width="20%" />
                      {!isCert ? (
                        <Button size="mid" background="blue80" radius={true} title="인증번호받기" width={29} measure={'%'} onClick={handleGetCertNum} />
                      ) : (
                        <Button size="mid" background="gray" radius={true} title="인증완료" width={29} measure={'%'} buttonMarkup />
                      )}
                    </span>
                    <span className="bridge2">
                      {!isCert && (
                        <>
                          <Input
                            type="text"
                            maxLength={6}
                            name={'certNum1'}
                            value={formData.certNum1}
                            onChange={(e) => handleChangeForm(e)}
                            width="68.5%"
                            placeHolder={timeView || '인증번호를 입력해주세요.'}
                          />
                          <Button size="mid" background="gray" radius={true} title="확인" width={29} measure={'%'} onClick={handleConfirmCert} />
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {isCert && <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleAddrSubmit} />}
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpAddress && <FindAddress AddressEvent={AddressEvent} />}
        </MobFullpagePopup>

        {!listDetail.cnclSttDvcd && (
          <RodalPopup show={canclePop} type={'fade'} closedHandler={closeDimmCanclePop} isMask={true} isButton={false} subPop={false}>
            {setCancelRodal(listDetail) === 'possible' && (
              <div className="con-wrap">
                <p>홈서비스 신청을 취소하시겠습니까?</p>
                <Buttons align="right" marginTop={24}>
                  <Button
                    fontSize={14}
                    title="취소"
                    color="blue80"
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                  <Button
                    fontSize={14}
                    title="확인"
                    color="blue80"
                    fontWeight="bold"
                    marginLeft={16}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenCancle();
                      setCanclePop(false);
                    }}
                  />
                </Buttons>
              </div>
            )}
            {setCancelRodal(listDetail) === 'cnsgFee' && (
              <div className="con-wrap">
                <p className="exp">
                  해당차량은 배차가 완료되어 <br /> 취소 시 편도 탁송비가 수수료로 발생합니다. <br /> 그래도 취소신청하시겠습니까?
                </p>
                <Buttons align="right" marginTop={24}>
                  <Button
                    fontSize={14}
                    title="취소"
                    color="blue80"
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                  <Button
                    fontSize={14}
                    title="확인"
                    color="blue80"
                    fontWeight="bold"
                    marginLeft={16}
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                </Buttons>
              </div>
            )}
            {setCancelRodal(listDetail) === 'impossible' && (
              <div className="con-wrap">
                <p className="exp">
                  해당차량은 배차가 완료되어 <br /> 취소신청이 불가합니다. <br /> 고객센터(1600-0080)로 문의주세요.
                </p>
                <Buttons align="right" marginTop={24}>
                  <Button
                    fontSize={14}
                    title="확인"
                    color="blue80"
                    fontWeight="bold"
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                </Buttons>
              </div>
            )}
            {setCancelRodal(listDetail) === 'cnclFee' && (
              <div className="con-wrap">
                <p className="exp">
                  취소시 취소수수료가 발생합니다. <br /> 그래도 취소하시겠습니까?
                </p>
                <Buttons align="right" marginTop={24}>
                  <Button
                    fontSize={14}
                    title="취소"
                    color="blue80"
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                  <Button
                    fontSize={14}
                    title="확인"
                    color="blue80"
                    fontWeight="bold"
                    marginLeft={16}
                    onClick={(e) => {
                      e.preventDefault();
                      setCanclePop(false);
                    }}
                  />
                </Buttons>
              </div>
            )}
          </RodalPopup>
        )}

        {setChgAddrRodal(listDetail) === 'impossible' && ( //신청완료 ~ 배송중 mode="normal" size="xs"
          <RodalPopup show={changePop} type={'fade'} closeHandler={closeDimmChangePop} isMask={true} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="exp">
                해당차량은 배차가 완료되어 배송지 변경이 불가합니다. <br /> 고객센터(1600-0080)로 문의주세요.
              </p>
              <Buttons align="right" marginTop={24}>
                <Button
                  fontSize={14}
                  title="확인"
                  color="blue80"
                  fontWeight="bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setChangePop(false);
                  }}
                />
              </Buttons>
            </div>
          </RodalPopup>
        )}
        <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>해당 차량을 구매확정 하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button
                fontSize={14}
                title="취소"
                color="blue80"
                onClick={(e) => {
                  e.preventDefault();
                  setMpop(false);
                }}
              />
              <Button
                fontSize={14}
                title="확인"
                color="blue80"
                fontWeight="bold"
                marginLeft={16}
                onclick={(e) => {
                  handleConfirm(e, listDetail.hsvcId);
                }}
              />
            </Buttons>
          </div>
        </RodalPopup>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
      </AppLayout>
    );
  }
  return <AppLayout>모바일 전용 페이지입니다.</AppLayout>;
});

HomeServiceDetail.displayName = 'HomeServiceDetail';

HomeServiceDetail.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { dispatch } = http.reduxStore;

  helper.accessControl();
  await helper.setRedirectUrl('/mypage/personal/buycar/homeService').requiredQuery('hsvcId');
  await dispatch(getHomeServiceMobDetail(query.hsvcId));

  return { query };
};
export default HomeServiceDetail;
