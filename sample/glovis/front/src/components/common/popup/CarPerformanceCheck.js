import React, { memo, useCallback, useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';
import PricingToPrintButton from '@src/components/pricingSystem/pricingToPrintButton';
import CarPictureApply from '@src/components/common/CarPictureApply';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { MOBILE_FULLPAGE_CPOPUP, MOBILE_FULLPAGE_CPOPUP_CLOSE } from '@src/actions/types';
import useSeperator from '@lib/share/custom/useSeperator';
import { combineValues } from '@src/utils/DataUtils';
import { preventScroll } from '@src/utils/CommonUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { createValidator } from '@lib/share/validator';
import perfInspSchema from '@lib/share/validator/mypage/dealer/perfInsp';
import { selectSaleCarPerf, updateSaleCarPerf } from '@src/api/mypage/dealer/CarPerfInspApi';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import MobBottomArea from '@lib/share/items/MobBottomArea';

const CarPerformanceCheck = memo(
  ({
    crPrsnNum = '',
    historyData,
    isAllow = false,
    mode = 'viewer',
    perfData,
    perfInspId = '',
    onChange,
    onInputChange,
    onChangeValues,
    onChangeMainDeviceState,
    onChangePrsNum,
    onSignatureChange,
    onSkinChange,
    prodItem,
    onSaveDone,
    trigger
  }) => {
    const dispatch = useDispatch();
    const [seperatedPerfInspId, setSeperatedPerfInspId] = useSeperator(perfInspId);

    const eventCarBoolean = () => {
      if (perfData.crNo === '23호2709') return true;
      else if (perfData.crNo === '81너4566') return true;
      else if (perfData.crNo === '128누5261') return true;
      else if (perfData.crNo === '25마4054') return true;
      else if (perfData.crNo === '62버9470') return true;
      else if (perfData.crNo === '03다6078') return true;
      else if (perfData.crNo === '07루7858') return true;
      else if (perfData.crNo === '49저1718') return true;
      else if (perfData.crNo === '308마9721') return true;
      else if (perfData.crNo === '25저1019') return true;
      return false;
    };

    const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);
    const dlrPrdId = prodItem?.dlrPrdId || '';
    const crId = prodItem?.crId || '';

    useEffect(() => {
      setSeperatedPerfInspId(perfInspId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perfInspId]);

    // viewer(보기), apply(등록)
    let printRef = React.createRef();

    const onClickBtn = (e) => {
      if (onChange) onChange(e);
    };

    const hasMobile = useSelector((state) => state.common.hasMobile);
    const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);

    const [fpHistory, setFpHistory] = useState(false);
    const [fpDetails, setFpDetails] = useState(false);

    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);

    const onClickDetail1 = useCallback((e) => {
      e.preventDefault();
      setDimm(true);
      setActive(true);
      setFpHistory(true);
    }, []);

    const onClickDetail2 = useCallback((e) => {
      e.preventDefault();
      setDimm(true);
      setActive(true);
      setFpDetails(true);
    }, []);

    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      setFpHistory(false);
      setFpDetails(false);
      preventScroll(false);
    }, []);

    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'history') {
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '사고 •교환 •수리 등 이력',
              options: ['close']
            }
          });
          setFpDetails(false);
          setFpHistory(true);
        } else if (name === 'details') {
          dispatch({
            type: MOBILE_FULLPAGE_CPOPUP,
            data: {
              isPopup: true,
              title: '자동차 세부사항',
              options: ['close']
            }
          });
          setFpHistory(false);
          setFpDetails(true);
        }
        preventScroll(true);
      },
      [dispatch]
    );

    const historyCallback = (e, deps) => {
      e.preventDefault();
      setFpHistory(false);
      console.log('carperformanceCallback', deps);
      if (onSkinChange) {
        onSkinChange(deps);
      }
      setDimm(false);
      setActive(false);
    };

    const detailsCallback = (e, deps) => {
      console.log('detailCallback =>>>>>', e);
      console.log('detailCallback =>>>>>', deps);
      e.preventDefault();
      setFpDetails(false);
      if (onChangeMainDeviceState) {
        onChangeMainDeviceState(e, deps);
      }
      setDimm(false);
      setActive(false);
    };

    const handleSeperateChange = (e) => {
      const value = combineValues(e);

      onInputChange({
        target: {
          value,
          name: e.target.name
        }
      });
    };

    /////////// 차량 성능 평가 저장 popModifyPerfInsp.js
    const validator = createValidator(
      {
        crPrsnNum: {
          type: 'string',
          label: '차량제시번호'
        },
        ...perfInspSchema
      },
      {
        required: ['crPrsnNum', 'perfInspId', 'vin', 'mortorFrm', 'frstRegDt', 'inspStrtVldty', 'inspEndVldty', 'prsnDrvDist', 'ehstGas1', 'ehstGas2', 'sttChckr', 'sttNtc', 'uniqChkrOpn']
      }
    );

    const prodRef = useRef(null);
    useEffect(() => {
      if (trigger) {
        sendData();
      }
    }, [trigger]);

    const sendData = async () => {
      if (!isAllow) {
        showAlert('서명란에 중고자동차성능 상태 점검을 체크해주세요');
        return;
      }
      // 모바일 화면에서는 확인 안됨.
      // if (!isConfirm) {
      //   showAlert('매물등록 규정을 확인해주세요');
      //   return;
      // }

      const valid = validator.validate({
        crPrsnNum,
        ...perfData
      });
      const { error } = valid;
      console.log('TCL: goNextStep -> valid : ', valid);

      if (error) {
        const { messages, field, label } = error[0];
        const message = `[${label}] ${messages[0]}`;
        showAlert(message);
      } else {
        //showConfirm('저장하시겠습니까?', async () => {
        showLoader();

        if (!perfData?.mainDevice?.perfInspId) {
          perfData.mainDevice.perfInspId = perfData.perfInspId;
        }

        if (!perfData?.skinStt?.perfInspId) {
          perfData.skinStt.perfInspId = perfData.perfInspId;
        }

        const {
          data: { data, statusinfo }
        } = await updateSaleCarPerf({
          crPrsnNum,
          dlrPrdId,
          crId,
          perfInspRecVO: perfData
        });

        if (statusinfo?.returncd === '000') {
          //이미지 업로드
          const formData = new FormData();
          console.log('prodRef : ', prodRef);
          const fileInputs = Array.from(prodRef.current.querySelectorAll('input[type=file]'));

          formData.append('dlrPrdId', dlrPrdId);
          formData.append('perfInspId', perfData?.perfInspId);

          fileInputs
            .filter((input) => !!input.files[0])
            .forEach((input) => {
              const file = input.files[0];
              formData.append('files', file, input.dataset.columnName);
            });

          const orgFiles = formData.get('files');
          console.log('orgFiles : ', orgFiles);

          if (orgFiles) {
            console.log('업로드');
            const result = await dealerProdApi.updatePerfInspRecPic(formData);
            console.log('goNextStep -> result', result);
          }

          console.log('저장완료');
          hideLoader();
          if (onSaveDone) onSaveDone();
        } else if (statusinfo?.returncd === 'MBR4005') {
          hideLoader();
          // 모바일 로그인 처리로?
          // showLoginForm(Router.router.asPath, (data) => {
          //   console.log('loginCallback data ::::: ', data);
          //   if (data?.isLogin) {
          //     sendData();
          //   } else {
          //     showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
          //   }
          // });
        } else {
          hideLoader();
          showAlert('에러가 발생했습니다');
        }
        //});
      }
    };
    
    //////////////////////////////////////////////////

    if (hasMobile) {
      return (
        <>
          {mode === 'viewer' ? (
            <div className="used-car-summary">
              <h2>
                {perfData?.crNm}
                <br />[{perfData?.crNo}]
              </h2>
              <p className="info">제 {perfInspId} 호</p>
            </div>
          ) : (
            <div className="used-car-summary-apply">
              <table summary="자동차 종합상태에 대한 내용" className="table-tp2 th-none">
                <colgroup>
                  <col width="37%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="float-wrap">
                      <p className="tit2">제시번호</p>
                      <Input type="text" id="Propose01" width="63%" onBlur={onChangePrsNum} name="crPrsnNum" value={crPrsnNum === null ? '' : crPrsnNum} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="tx-tp4">
                        매매회원이 중요정보(제시번호,성능점점기록부,조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에 관한 법률(20조 제1항 제1호)에 의해1억원이하의 과태료가부과될 수 있습니다.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-gray20">
                      <p className="tx-tp4">자동차관리법 시행규칙 개정(적용일 : 2018.07.01)에 따라 [자동차 성능과 상태, 가격정보]를 함께 제공하도록 개선되었습니다.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pt32">
                      <p className="tit2 mb16">중고자동차 성능 · 상태 점검기록부 입력</p>

                      <em className="mr8">제</em>
                      <Input type="text" id="record01" width="15%" onBlur={handleSeperateChange} name="perfInspId" value={seperatedPerfInspId?.[0] ?? ''} />
                      <em className="ml8 mr8">-</em>
                      <Input type="text" id="record02" width="15%" onBlur={handleSeperateChange} name="perfInspId" value={seperatedPerfInspId?.[1] ?? ''} />
                      <em className="ml8 mr8">-</em>
                      <Input type="text" id="record03" width={110} onBlur={handleSeperateChange} name="perfInspId" value={seperatedPerfInspId?.[2] ?? ''} />
                      <em className="ml8">호</em>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="content-wrap">
            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>자동차 기본정보</MenuTitle>
                <MenuCont>
                  <CarInfo perfData={perfData} onChange={onInputChange} mode={mode} />
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>자동차 종합상태</MenuTitle>
                <MenuCont>
                  <CarStatus perfData={perfData} onChange={onInputChange} onInputChangeValues={onChangeValues} mode={mode} />
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>사고 •교환 •수리 등 이력</MenuTitle>
                <MenuCont>
                  {mode === 'apply' ? (
                    <div className="accident-history-cont">
                      <div className="float-wrap">
                        <li>
                          &apos;상세&apos;버튼을 터치하시면 조회 및 <br />
                          등록하실 수 있습니다
                        </li>
                        <li>
                          <Button size="mid" line="gray" color="gray" radius={true} title="상세" width={58} height={40} onClick={onClickDetail1} />
                        </li>
                      </div>
                    </div>
                  ) : (
                    <CarHistory perfData={perfData} mode={mode} />
                  )}
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>자동차 세부사항</MenuTitle>
                <MenuCont>
                  {mode === 'apply' ? (
                    <div className="accident-history-cont">
                      <div className="float-wrap">
                        <li>
                          &apos;상세&apos;버튼을 터치하시면 조회 및 <br />
                          등록하실 수 있습니다
                        </li>
                        <li>
                          <Button size="mid" line="gray" color="gray" radius={true} title="상세" width={58} height={40} onClick={onClickDetail2} />
                        </li>
                      </div>
                    </div>
                  ) : (
                    <CarDetails perfData={perfData} mode={mode} />
                  )}
                </MenuCont>
              </MenuItem>
              {mode !== 'viewer' && (
                <MenuItem>
                  <MenuTitle>특이사항 및 점검자의 의견</MenuTitle>
                  <MenuCont>
                    <div className="accident-history-cont">
                      {/* <p className="intro">{perfData?.uniqChkrOpn}</p> */}
                      <table summary="특이사항 및 점검자의 의견" className="table-tp1">
                        <caption className="away">윈도우 모터 작동</caption>
                        <colgroup>
                          <col width="40%" />
                          <col width="60%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>성능 · 상태 점검자</th>
                            <td>
                              <Input type="text" id="expert-opinion" onBlur={onInputChange} name="uniqChkrOpn" value={perfData?.uniqChkrOpn || ''} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </MenuCont>
                </MenuItem>
              )}
              <MenuItem>
                <MenuTitle>{mode === 'viewer' ? `점검장면 촬영 사진` : '점검 장면 촬영사진 등록'}</MenuTitle>
                <MenuCont>
                  <form className="register-form history-form" ref={prodRef}>
                    {mode === 'viewer' ? <CarPicture perfData={perfData} mode={mode} /> : <CarPictureApply mode="dealer_photo" />}
                  </form>
                </MenuCont>
              </MenuItem>
              {mode === 'viewer' && (
                <>
                  <MenuItem>
                    <MenuTitle>특이사항 및 점검자의 의견</MenuTitle>
                    <MenuCont>
                      <div className="accident-history-cont">
                        <p className="intro">{perfData?.uniqChkrOpn}</p>
                        <table summary="특이사항 및 점검자의 의견" className="table-tp1">
                          <caption className="away">윈도우 모터 작동</caption>
                          <colgroup>
                            <col width="40%" />
                            <col width="60%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>성능 · 상태 점검자</th>
                              <td>{perfData?.sttChckr}</td>
                            </tr>
                            <tr>
                              <th>성능 · 상태 고지자</th>
                              <td>{perfData?.sttNtc}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>성능 · 상태 점검의 보증에 관한 사항 등</MenuTitle>
                    <MenuCont>
                      <div className="accident-history-cont">
                        <p className="intro">
                          1.성능 · 상태점검자 및 매매업자는 아래의 보증기간 또는 보증거리 이내에 중고자동차성능 · 상태점검기록부에 기재된 내용과 자동차의 실제 성능 · 상태가 다른 경우 계약 또는
                          관계법령에 따라 매수인에 대하여 책임을 집니다. · 자동차인도일부터 보증기간은 (30)일, 보증거리는 (2000)킬로미터로 합니다. (보증기간은 30일 이내, 보증거리는 2천 킬로미터
                          이내이어야 하며, 그 중 먼저 도래한 것을 적용합니다.
                        </p>
                        <p className="intro">
                          2.중고자동차의 구조 · 장치 등의 성능 · 상태를 허위로 기재하거나 고지한 자는 「자동차관리법」 제80조제6호 내지 제80조제7호에 따라 2년 이하의 징역 또는 500만원 이하의 벌금에
                          처합니다.
                        </p>
                        <p className="intro">
                          3.성능 · 상태점검자가 성능점검에 중대한 과실이 있는 경우 자동차관리법 제21조제2항의 규정에 의한 행정처분의 기준과 절차에 관한 규칙 제5조 제1항에 따라 1차 사업정지 30일, 2차
                          사업정지 90일, 3차 사업취소 등의 행정처분을 받습니다.
                        </p>
                        <p className="intro">
                          4.사고/침수유무(단순수리 제외)는 사고로 자동차 주요골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단, 루프패널, 쿼터패널, 사이드실패널 부위는 절단, 용접시에만
                          사고로 표기합니다.(후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                        </p>
                        <p className="intro">
                          5.자기진단사항의 경우 중고자동차성능 · 상태점검기록부에 기록하는 것 외에 자기진단기로 측정한 내역을 매수인에게 고지하고 그 내역을 점검일부터 120일간 보관하여야
                          합니다.(전산정보처리조직에 의하여 보관할 수도 있습니다.)
                        </p>
                        <p className="intro">6.성능점검 방법은 자동차검사방법을 준용하여 점검합니다.</p>
                        <p className="intro">7.체크항목 판단기준</p>
                        <ul className="matters-list fs14">
                          <li>미세누유(미세누수) : 해당부위에 비치는 정도로 운행에 지장이 없다고 인정되는 부품 노후로 인환 현상</li>
                          <li>누유(누수) : 해당부위에서 오일(냉각수)이 맺혀서 떨어지는 상태</li>
                          <li>소음/유격 : 부품 노후에 인한 현상으로 결정하기에는 정도가 큰 소음 및 유격</li>
                          <li>정비요 : 현재 상태로 운행시 해당 부품의 고장으로 운행에 지장을 받을 정도로 수리가 필요한 상태</li>
                        </ul>
                      </div>
                    </MenuCont>
                  </MenuItem>
                </>
              )}
            </ul>
            <CarSignature perfData={perfData} isAllow={isAllow} onSignatureChange={onSignatureChange} mode={mode} />
          </div>
          {/* <MobFullpagePopup active={mFullpageCPopup} paddingBottom={56} cPop={true}>
              {fpHistory && <CarHistory perfData={historyData} mode={mode} callback={historyCallback} />}
              {fpDetails && <CarDetails perfData={perfData} mode={mode} callback={detailsCallback} />}
            </MobFullpagePopup> */}
          {mode === 'apply' && (
            <>
              <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm} />
              <MobBottomArea active={active} className="v-fp cpb-80" zid={105}>
                {fpHistory && <CarHistory perfData={historyData} mode={mode} callback={historyCallback} />}
                {fpDetails && <CarDetails perfData={perfData} mode={mode} callback={detailsCallback} />}
              </MobBottomArea>
            </>
          )}
        </>
      );
    }
    return (
      <div className="con-wrap">
        <Buttons align="right" marginBottom={30}>
          <span className="btn-base bg-blue80 mid" style={{ width: '100px', height: '32px', lineHeight: '32px' }}>
            <PricingToPrintButton trigger={() => <a>인쇄하기</a>} content={() => printRef} pageStyle="" />
          </span>
          <Button size="mid" background="blue80" title="확인" width={100} height={32} onClick={(e) => onClickBtn(e)} buttonMarkup={true} />
        </Buttons>
        <div ref={(el) => (printRef = el)} id={'printDiv'}>
          <div className="popup-performance">
            <ul className="tx-wrap">
              <li>본 차량의 성능기록부는 판매자가 직접 입력한 내용으로 모든 책임은 판매자에게 있습니다.</li>
              <li>성능점검기록부를 교부 받은 차량은 인수일 기준 30일 또는 2천km 이내 하자 발생 시 무상수리 및 보상이 가능합니다.</li>
              <li>유효기간은 점검일로부터 120일 이내이며, 유효기간이 지난 경우 재점검 후 교부를 요청하셔야 합니다.</li>
              <li>계약 시 보증수리 주체가 판매자(고지자)인지 점검자인지 확실하지 않다면 매매계약서 약관에 보증수리 주체를 표기한 뒤 유효한 날인을 받으셔야 합니다.</li>
            </ul>
            <form className="register-form">
              <CarInfo perfData={perfData} mode={mode} />
              <CarStatus perfData={perfData} mode={mode} />
              <CarHistory perfData={perfData} mode={mode} event={eventCarBoolean()} />
              <CarDetails perfData={perfData} mode={mode} />
              <CarPicture perfData={perfData} mode={mode} />
              <fieldset className="car-expert viewer">
                <div>
                  <h4>특이사항 및 점검자의 의견</h4>
                  <p>{perfData?.uniqChkrOpn}</p>
                </div>
              </fieldset>
              <CarSignature perfData={perfData} mode={mode} />
            </form>
            <ul className="tx-wrap tit">
              <li>성능 · 상태 점검의 보증에 관한 사항 등</li>
              <li>
                1. 성능 · 상태점검자 및 매매업자는 아래의 보증기간 또는 보증거리 이내에 중고자동차성능 · 상태점검기록부에 기재된 내용과 자동차의 실제 성능 · 상태가 다른 경우 계약 또는 관계법령에 따라
                매수인에 대하여 책임을 집니다. · 자동차인도일부터 보증기간은 (30)일, 보증거리는 (2000)킬로미터로 합니다. (보증기간은 30일 이내, 보증거리는 2천 킬로미터 이내이어야 하며, 그 중 먼저
                도래한 것을 적용합니다.
              </li>
              <li>
                2. 중고자동차의 구조 · 장치 등의 성능 · 상태를 허위로 기재하거나 고지한 자는 「자동차관리법」 제80조제6호 내지 제80조제7호에 따라 2년 이하의 징역 또는 500만원 이하의 벌금에 처합니다.
              </li>
              <li>
                3. 성능 · 상태점검자가 성능점검에 중대한 과실이 있는 경우 자동차관리법 제21조제2항의 규정에 의한 행정처분의 기준과 절차에 관한 규칙 제5조 제1항에 따라 1차 사업정지 30일, 2차 사업정지
                90일, 3차 사업취소 등의 행정처분을 받습니다.
              </li>
              <li>
                4. 사고/침수유무(단순수리 제외)는 사고로 자동차 주요골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단, 루프패널, 쿼터패널, 사이드실패널 부위는 절단, 용접시에만 사고로
                표기합니다.(후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
              </li>
              <li>
                5. 자기진단사항의 경우 중고자동차성능 · 상태점검기록부에 기록하는 것 외에 자기진단기로 측정한 내역을 매수인에게 고지하고 그 내역을 점검일부터 120일간 보관하여야
                합니다.(전산정보처리조직에 의하여 보관할 수도 있습니다.)
              </li>
              <li>6. 성능점검 방법은 자동차검사방법을 준용하여 점검합니다.</li>
              <li>
                7. 체크항목 판단기준ㆍ미세누유(미세누수) : 해당부위에 비치는 정도로 운행에 지장이 없다고 인정되는 부품 노후로 인환 현상
                <br />
                <span>ㆍ미세누유(미세누수) : 해당부위에 비치는 정도로 운행에 지장이 없다고 인정되는 부품 노후로 인환 현상</span>
                <span>ㆍ누유(누수) : 해당부위에서 오일(냉각수)이 맺혀서 떨어지는 상태</span>
                <span>ㆍ소음/유격 : 부품 노후에 인한 현상으로 결정하기에는 정도가 큰 소음 및 유격</span>
                <span>ㆍ정비요 : 현재 상태로 운행시 해당 부품의 고장으로 운행에 지장을 받을 정도로 수리가 필요한 상태</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

CarPerformanceCheck.propTypes = {
  crPrsnNum: PropTypes.string,
  historyData: PropTypes.object,
  isAllow: PropTypes.bool,
  mode: PropTypes.string,
  perfData: PropTypes.object,
  perfInspId: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onChangeValues: PropTypes.func,
  onChangeMainDeviceState: PropTypes.func,
  onChangePrsNum: PropTypes.func,
  onSignatureChange: PropTypes.func,
  onSkinChange: PropTypes.func,
  prodItem: PropTypes.object,
  onSaveDone: PropTypes.func,
  trigger: PropTypes.bool
};

CarPerformanceCheck.displayName = 'CarPerformanceCheck';
export default CarPerformanceCheck;
