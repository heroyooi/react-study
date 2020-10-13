/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { isEmpty, omit, chunk, sortBy } from 'lodash';

import { axiosPost } from '@src/utils/HttpUtils';
import { isLoginLiveCheck } from '@src/utils/LoginUtils';
import { createValidator } from '@lib/share/validator';

import entryQuestionSchema from '@lib/share/validator/buycar/certificationmall/entryQuestion';
import entryQuestionMobileSchema from '@lib/share/validator/buycar/certificationmall/entryQuestionMobile';
import { getBrandListByCode, codeParam } from '@src/actions/buycar/certificationmall/certiMallMainAction';
import { selectCommonCode } from '@src/api/buycar/buyCarCommonApi';

import AppLayout from '@src/components/layouts/AppLayout';
import BuyCarNav from '@src/components/buycar/BuyCarNav';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import SlideBanner from '@src/components/common/banner/SlideBanner';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

// 모바일 추가분
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

function showErrorMsg(propNmArr, errorProps) {
  if ((propNmArr?.length || 0) === 0) return false;
  if (!Array.isArray(errorProps)) return false;
  const testArr = errorProps.filter((error) => propNmArr.some((n) => error.field === n));
  if (testArr.length === 0) return;
  return (
    <p className="tx-exp-tp4 tx-red80" style={{ height: 0 }}>
      {testArr[0].label + ' ' + testArr[0].messages[0]}
    </p>
  );
}

const ITEMS_PER_PAGE = 4;

const buyCarCertiMall = ({ prtnSelectList, telSelectList, emailSelectList }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const impCertiMallList = useSelector((state) => state.certiMallMain.impCertiMallList, []); // 0010
  const finCertiMallList = useSelector((state) => state.certiMallMain.finCertiMallList, []); // 0020
  // const frchCertiMallList = useSelector((state) => state.certiMallMain.frchCertiMallList, []); // 0030
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [isLoading, setIsLoading] = useState(false); // 로딩 Spinner show/hide 여부
  const [isCertify, setIsCertify] = useState(false);
  const [layer, setLayer] = useState(false); // 입점문의 팝업
  const [storePopupShow, setStorePopupShow, openStorePopup, closeStorePopup] = useRodal(false, true);
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);

  //======== 인증몰 입점문의(pc) 관련 시작 ============
  const initFormData = {
    charger: '', // 담당자
    cmpnNm: '', // 회사명
    emlAddr: '', // 이메일
    emlType: emailSelectList ? emailSelectList[0].value : '', // 이메일 입력방식 value: ['0000', '0001', ...], label: ['직접입력', 'daum.net', 'naver.com', ...] 'FM004'
    emlAddr1: emailSelectList ? (emailSelectList[0].label === '직접입력' ? '' : emailSelectList[0].label) : '', // 이메일주소 @ 앞부분
    emlAddr2: '', // 이메일주소 @ 뒷부분
    pnType: telSelectList ? telSelectList[0].value : '', //일반전화 앞자리 구분코드
    pn: '', // 전화번호 전체
    pn1: telSelectList ? telSelectList[0].label : '', // 전화번호 지역번호
    pn2: '', //전화번호 앞자리
    pn3: '', //전화번호 뒷자리
    prtnDvcd: prtnSelectList ? prtnSelectList[0].value : '', // 인증몰 제휴 종류코드
    quesCntn: '' // 문의내용
  };

  const [errorProp, setErrorProp] = useState([]); //에러속성
  const [formData, setFormData] = useState(initFormData);

  const listWithCode = {
    '0010': impCertiMallList,
    '0020': finCertiMallList
    // ,'0030' : frchCertiMallList
  };
  const mallTypes = sortBy(prtnSelectList, 'sortNo').map((mallType) => ({ ...mallType, mallList: listWithCode[mallType.cdId] }));

  const handleCloseRodal = useCallback(() => {
    setStorePopupShow(false);
    setTimeout(() => {
      setIsCertify(false); //입점문의 등록 후 재입력 가능하도록
    }, 1000);
  }, [setStorePopupShow]);

  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '인증몰 입점문의',
          options: ['close']
        }
      });
      setLayer(true);
    },
    [dispatch]
  );

  const closeFullpagePopup = useCallback(() => {
    setLayer(false);
    dispatch({
      type: MOBILE_FULLPAGE_POPUP_CLOSE
    });
    setMPop(false);
  }, [dispatch, setMPop]);

  const handleSelectPrtnDvcd = useCallback((e) => {
    setFormData((prev) => ({ ...prev, prtnDvcd: e.value }));
  }, []);

  const handleInputCharger = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, charger: e.target.value }));
  }, []);

  const handleInputCmpnNm = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, cmpnNm: e.target.value }));
  }, []);

  const handleSelectEmlType = useCallback((e) => {
    const value = e.value;
    const label = value === '0000' ? '' : e.label;
    setFormData((prev) => ({ ...prev, emlType: value, emlAddr2: label }));
  }, []);

  const handleInputEmlAddr1 = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, emlAddr1: e.target.value }));
  }, []);

  const handleInputEmlAddr2 = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, emlAddr2: e.target.value }));
  }, []);

  const handleSelectPnType = useCallback((e) => {
    setFormData((prev) => ({ ...prev, pnType: e.value, pn1: e.label }));
  }, []);

  const handleInputPn2 = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, pn2: e.target.value }));
  }, []);

  const handleInputPn3 = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, pn3: e.target.value }));
  }, []);

  const handleInputContents = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, quesCntn: e.target.value }));
  }, []);

  const handleRadioPrtnDvcd = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, prtnDvcd: e.target.value }));
  }, []);

  const handleInputPnMobile = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, pn: e.target.value }));
  }, []);

  const handleInputEmlAddr = useCallback((e) => {
    console.log('e.target.name ::::::::::::::: ', e.target.name);
    setFormData((prev) => ({ ...prev, emlAddr: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      let data = {
        prtnDvcd: formData.prtnDvcd, // 인증몰 제휴 구분
        cmpnNm: formData.cmpnNm, // 회사명
        charger: formData.charger, // 담당자
        pn1: formData.pn1, //전화번호 지역번호
        pn2: formData.pn2, //전화번호 앞자리
        pn3: formData.pn3, //전화번호 뒷자리
        emlAddr1: formData.emlAddr1, //이메일 앞자리
        emlAddr2: formData.emlAddr2, //이메일 뒷자리
        quesCntn: formData.quesCntn // 문의내용
      };

      if (hasMobile) {
        data = omit(data, ['pn1', 'pn2', 'pn3', 'emlAddr1', 'emlAddr2']);
        data.pn = formData.pn;
        data.emlAddr = formData.emlAddr;
      }
      const required = hasMobile ? ['prtnDvcd', 'cmpnNm', 'charger', 'pn', 'emlAddr', 'quesCntn'] : ['prtnDvcd', 'cmpnNm', 'charger', 'pn1', 'pn2', 'pn3', 'emlAddr1', 'emlAddr2', 'quesCntn'];
      const valid = createValidator(hasMobile ? entryQuestionMobileSchema : entryQuestionSchema, { required, additionalProperties: true }).validate(data);

      if (valid.error) {
        console.log('valid.error = ', valid.error);
        setErrorProp(valid.error);
        return false;
      }

      const submitData = {
        ...data,
        pn: hasMobile ? data.pn.replace(/-/g, '') : data.pn1.concat(data.pn2, data.pn3),
        emlAddr: hasMobile ? data.emlAddr : data.emlAddr1.concat('@', data.emlAddr2)
      };

      setErrorProp('');
      setIsLoading(true);
      axiosPost(`/api/buycar/insertCertifiedMallQuestion${isLoginLiveCheck() ? 'Jwt' : ''}.do`, submitData)
        .then((res) => {
          setIsLoading(false);
          if (res?.data?.statusinfo?.returncd !== '000' && res?.data?.statusinfo?.returncd !== 'SUCCESS') {
            // setStorePopupShow(false); 실패 후 창 닫기
            return false; // 입점문의 등록 실패
          }
          if (hasMobile) {
            openMPop(e, 'fade');
          } else {
            setIsCertify(true); // 팝업모드 : 입점문의 성공으로 전환
          }
          setFormData(initFormData); // 입력데이터 초기화
        })
        .catch(() => {
          setIsLoading(false);
          console.log('전송 실패!');
        });
    },
    [formData, hasMobile, initFormData, openMPop]
  );
  //======== 인증몰 입점문의(pc) 관련 종료 ============

  // ================================================================================
  //        모바일 시작
  // ================================================================================
  useEffect(() => {
    if (hasMobile) {
      dispatch({ type: SECTION_BUY });
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '인증몰',
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
  }, [dispatch, hasMobile]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          {mallTypes.map((mallType, i) => (
            <div key={mallType.id} className={`list-wrap${i === 0 ? '  mt20' : ''}`}>
              <div className="list-tit">
                <h4>
                  {mallType.cdNm}
                  <span>{mallType.cdCmnt}</span>
                </h4>
              </div>
              <ul className="goods-list brand slider">
                <Slider slidesToShow={3} slidesToScroll={1}>
                  {mallType.mallList.map((v, i) => {
                    return <BannerItemBuyCar key={i} bannerType="brand" data={v} />;
                  })}
                </Slider>
              </ul>
            </div>
          ))}
        </div>
        <div className="certify-banner">
          <div className="content-wrap">
            <p>오토벨 인증몰 파트너사가 되어보세요</p>
            <Button size="mid" background="blue80" radius={true} title="입점문의" width={61} height={30} fontSize={12} marginTop={14} onClick={handleFullpagePopup} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {layer && (
            <>
              <div className="live-tit">
                <p>
                  인증몰 입점에 관하여 궁금한 사항을 보내주시면
                  <br />
                  담당자 확인 후 보다 자세한 상담을 드릴 수 있도록
                  <br />
                  하겠습니다.
                </p>
              </div>
              <div className="content-wrap inquire-wrap">
                <form>
                  <fieldset>
                    <legend className="away">인증몰 입점문의</legend>
                    <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                      <caption className="away">인증몰 입점문의</caption>
                      <colgroup>
                        <col width="28%" />
                        <col width="72%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>구분</th>
                          <td>
                            <ul className="radio-block small">
                              {prtnSelectList.map((v, i) => {
                                return (
                                  <li key={i}>
                                    <Radio className="txt" id={'certify' + i} label={v.label} value={v.value} checked={formData.prtnDvcd} onChange={handleRadioPrtnDvcd} />
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <th>회사명</th>
                          <td>
                            <Input type="text" id="agency-name" onChange={handleInputCmpnNm} maxLength={16} />
                            {showErrorMsg(['cmpnNm'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="user-name">담당자 성함</label>
                          </th>
                          <td>
                            <Input type="text" id="user-name" onChange={handleInputCharger} maxLength={33} />
                            {showErrorMsg(['charger'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="user-phone">휴대폰번호</label>
                          </th>
                          <td>
                            <Input type="text" id="user-phone" onChange={handleInputPnMobile} maxLength={13} />
                            {showErrorMsg(['pn'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="email">이메일 주소</label>
                          </th>
                          <td>
                            <Input type="text" id="email" onChange={handleInputEmlAddr} maxLength={50} />
                            {showErrorMsg(['emlAddr'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>문의내용</th>
                          <td>
                            <Textarea countLimit={400} type="tp1" height={176} onChange={handleInputContents} />
                            {showErrorMsg(['quesCntn'], errorProp)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tx-sub">
                      메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.
                      <br />
                      담당자 전화문의 : 1600-0080
                    </p>
                  </fieldset>
                </form>
                <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={handleSubmit} buttonMarkup={true} />
              </div>

              <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
                <div className="con-wrap">
                  <p className="tit1">인증몰 입점 문의가 접수되었습니다.</p>
                  <p>빠른 시일안에 담당자가 연락드리겠습니다.</p>
                  <Buttons align="right" marginTop={16}>
                    <Button fontSize={14} title="확인" color="blue80" fontWeight={500} href="/buy/certifyMall" onClick={closeFullpagePopup} buttonMarkup={true} />
                  </Buttons>
                </div>
              </RodalPopup>
            </>
          )}
        </MobFullpagePopup>
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
      <BuyCarNav nowPage={'certificationmall'} />
      <div className="content-wrap buy-wrap cert">
        <div className="list-sec">
          <p className="bg-cert">
            <img src="/images/contents/bg-certification.png" alt="오토벨 인증몰" />
          </p>
          {mallTypes.map((mallType) => (
            <div key={mallType.id} className={`list-wrap${mallType.cdId === '0020' ? ' finance' : ''}`}>
              <div className="list-tit">
                <h4>
                  {mallType.cdNm}
                  <span>{mallType.cdCmnt}</span>
                </h4>
              </div>
              {!isEmpty(mallType.mallList) && (
                <SlideBanner slideType="banner-single" carList={mallType.mallList} touch={false} autoplay={true} pagination={true} withCounter={true}>
                  {chunk(mallType.mallList, ITEMS_PER_PAGE).map((arr, i) => {
                    return (
                      <div key={i}>
                        <ul className="goods-list brand">
                          {arr.map((v, j) => (
                            <BannerItemBuyCar key={j} bannerType="brand" data={v} />
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </SlideBanner>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="certify-banner">
        <div className="content-wrap">
          <p>
            오토벨 인증몰 <span>파트너사</span>가 되어보세요
          </p>
          <Button size="mid" background="blue80" title="입점문의" width={140} marginTop={16} onClick={(e) => openStorePopup(e, 'fade')} buttonMarkup={true} />
        </div>
      </div>

      {/* 입점문의 팝업 */}
      <RodalPopup show={storePopupShow} type={'fade'} closedHandler={closeStorePopup} mode="normal" title="인증몰 입점문의" size="small">
        <div className="popup-inquire">
          <div className="inquire-wrap">
            {isCertify === false && (
              <>
                <p className="tx-tit">
                  인증몰 입점에 관하여 궁금한 사항을 보내주시면
                  <br />
                  담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.
                </p>
                <form>
                  <fieldset>
                    <legend className="away">인증몰 입점문의</legend>
                    <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                      <caption className="away">인증몰 입점문의</caption>
                      <colgroup>
                        <col width="27.5%" />
                        <col width="72.5%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <label htmlFor="certify">구분</label>
                          </th>
                          <td>
                            <SelectBox id="certify" className="items-sbox" value={formData.prtnDvcd} options={prtnSelectList} onChange={handleSelectPrtnDvcd} width="100%" height={48} />
                            {showErrorMsg(['prtnDvcd'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="agency-name">회사명</label>
                          </th>
                          <td>
                            <Input type="text" id="agency-name" onChange={handleInputCmpnNm} maxLength={16} />
                            {showErrorMsg(['cmpnNm'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="user-name">담당자 성함</label>
                          </th>
                          <td>
                            <Input type="text" id="user-name" onChange={handleInputCharger} maxLength={33} />
                            {showErrorMsg(['charger'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="user-phone">전화번호</label>
                          </th>
                          <td>
                            <span className="bridge">
                              <SelectBox id="user-phone" className="items-sbox" value={formData.pnType} options={telSelectList} onChange={handleSelectPnType} width={119} height={48} />
                            </span>
                            <span className="bridge">
                              <Input type="number" id="user-phone-buycar2" width={119} onChange={handleInputPn2} maxLength={4} />
                            </span>
                            <Input type="number" id="user-phone-buycar3" width={108} onChange={handleInputPn3} maxLength={4} />
                            {showErrorMsg(['pn2', 'pn3'], errorProp)}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <label htmlFor="email">이메일 주소</label>
                          </th>
                          <td>
                            <span className="bridge2">
                              <Input type="text" id="email_buycar_certimall" width={168} onChange={handleInputEmlAddr1} maxLength={24} />
                              <em className="mg8">@</em>
                              <Input
                                type="text"
                                id="email_buycar_certimall2"
                                value={formData.emlAddr2}
                                width={169}
                                onClick={(e) => {
                                  console.log(e);
                                  setFormData((prev) => ({ ...prev, emlType: '0000' }));
                                }}
                                onChange={handleInputEmlAddr2}
                                maxLength={24}
                              />
                            </span>
                            <span className="bridge2">
                              <SelectBox
                                id="email3"
                                className="items-sbox"
                                value={formData.emlType}
                                options={emailSelectList}
                                onChange={handleSelectEmlType}
                                placeHolder="직접입력"
                                width="100%"
                                height={48}
                              />
                              {showErrorMsg(['emlAddr1', 'emlAddr2'], errorProp)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>문의내용</th>
                          <td>
                            <Textarea countLimit={400} type="tp1" height={218} onChange={handleInputContents} />
                            {showErrorMsg(['quesCntn'], errorProp)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>
                <Buttons align="center" marginTop={20} className="w-line">
                  <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseRodal} buttonMarkup={true} />
                  <Button size="big" background="blue80" title="보내기" width={180} height={60} onClick={handleSubmit} buttonMarkup={true} />
                </Buttons>
              </>
            )}
            {isCertify === true && (
              <>
                <div className="co-wrap">
                  <p>
                    <span className="ico-wrap">
                      <i className="ico-document" />
                    </span>
                    인증몰 입점 문의가
                    <br />
                    접수되었습니다.
                  </p>
                </div>
                <p className="tx-sub">* 빠른 시일안에 담당자가 연락드리겠습니다.</p>
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseRodal} buttonMarkup={true} />
                </Buttons>
              </>
            )}
          </div>
          {isCertify === false && (
            <div className="popup-bg bottom">
              <p className="tx">
                메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.
                <br />
                담당자 전화문의 : <span>1600-0080</span>
              </p>
            </div>
          )}
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

buyCarCertiMall.getInitialProps = async (http) => {
  const { dispatch } = http.reduxStore;
  const selectParamArr = ['AM037', 'FM014', 'FM004']; // 인증몰 구분, 일반전화 앞자리, 이메일 구분(순서 지켜야 함)
  const [prtnSelectList, telSelectList, emailSelectList] = await Promise.all(
    selectParamArr.map(async (code) => {
      return await selectCommonCode(code);
    })
  ).then((res) => {
    return res;
  });

  //certiMallMainAction 에 codeParam 정의
  const brandParamArr = Object.keys(codeParam); // AM037 ['0010', '0020', '0030']; // 수입인증, 금융사인증, 프랜차이즈인증
  await Promise.all(
    brandParamArr.map(async (code) => {
      return await dispatch(getBrandListByCode(code));
    })
  );

  //입점문의 내 셀렉트박스 공통코드목록
  return { prtnSelectList, telSelectList, emailSelectList };
};

export default buyCarCertiMall;

buyCarCertiMall.propTypes = {
  prtnSelectList: PropTypes.array,
  telSelectList: PropTypes.array,
  emailSelectList: PropTypes.array
};
