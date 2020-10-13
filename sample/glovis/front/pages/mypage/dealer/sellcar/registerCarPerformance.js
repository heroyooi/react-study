const globalThis = require('globalthis')();
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import produce from 'immer'

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
// import * as http from '@src/utils/HttpUtils'

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';

import DealerCarSuggest from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarSuggest';
import DealerCarInfo from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarInfo';
import DealerCarTotalStatus from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarTotalStatus';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import DealerCarDetailStatus from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarDetailStatus';
import DealerCarPhoto from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarPhoto';
import DealerCarSignature from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarSignature';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import { createValidator } from '@lib/share/validator'; //createPropValidator는 삭제되었습니다.
import perfInspSchema from '@lib/share/validator/mypage/dealer/perfInsp';
import RenderHelper from '@lib/share/render/helper';

import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';

import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'
import * as memberApi from '@src/api/common/memberApi';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { window } from 'globalthis/implementation';

const prevPage = `/mypage/dealer/sellcar/registerCarInfo`;
const nextPage = `/mypage/dealer/sellcar/registerCarIntroducing`;

const validator = createValidator({
  crPrsnNum: {
    type:'string',
    pattern: '[a-zA-Z0-9]',
    maxLength:20,
    label:'차량제시번호',
  },
  ...perfInspSchema
}, {
  required: [
    'crPrsnNum', 'perfInspId', 'vin', 'mortorFrm', 'frstRegDt',
    'inspStrtVldty', 'inspEndVldty', 'prsnDrvDist', 
    'sttChckr', 'sttNtc', 'uniqChkrOpn'
  ]
});

const registerCarPerformance = ({ query, prodItem = {} }) => {
  console.log("registerCarIntroducing -> prodItem", prodItem)
  const dispatch = useDispatch();
  const [ isConfirm, setIsConfirm ] = useState(false);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '차량등록',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 60,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  // mobile show dialog
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const [errPop, setErrorPop, openErrorPopup] = useRodal(false);
  const [informText, setInformText] = useState('');
  const [errorText, setErrorText] = useState('');
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  // end mobile
  
  const prodRef = useRef(null)
  const { dlrPrdId } = query
  const { showAlert, showConfirm, showLoader, showLoginForm, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [isAllow, setIsAllow] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [prod, setProd] = useState({
    ...prodItem,
    perfInspRecVO: {
      ...prodItem?.perfInspRecVO,
      mainDevice: prodItem?.perfInspRecVO?.mainDevice,
      skinStt: prodItem?.perfInspRecVO?.skinStt,
    },
  });
  console.log("registerCarIntroducing -> prod", prod)

  const inputProd = (e) => {
    const { name, value } = e.target
    setProd(produce(prod, draft => {
      draft[name] = value
    }))
  };

  const inputMainDevice = (e, deps) => {
    const { name, value } = e.target
    console.log('input main device deps', deps);

    if (hasMobile) {
      setProd(produce(prod, draft => {
        draft['perfInspRecVO']['mainDevice'] = deps;
      }));
    } else {
      setProd(produce(prod, draft => {
        draft['perfInspRecVO']['mainDevice'][name] = parseInt(value)
      }));
    }
  }

  const inputRecord = (e) => {
    const { name, value } = e.target;
    console.log("inputRecord -> value", value)
    console.log("inputRecord -> name", name)

    setProd(produce(prod, draft => {
      draft['perfInspRecVO'][name] = value
    }))
  };

  const inputRecordValues = (items) => {
    setProd(produce(prod, draft => {
      items?.forEach(item => {
        draft['perfInspRecVO'][item?.name] = items[item?.value]
      })
    }))
  }

  const inputSkin = (v, target, name) => {
    const value = parseInt(v)
    let currentSkinStt = {};

    // 모바일 한번에 모두 넘어옴.
    if (hasMobile) {
      currentSkinStt = v;
    } else {
      currentSkinStt = {
        ...prod?.perfInspRecVO?.skinStt,
        [name]: value,
      };
    }

    const map = Object.keys(currentSkinStt).reduce((map, item) => {
      const value = currentSkinStt[item]
      const type = stt[item]

      if (value == 3) {
        map.set(type, (map.get(type) ?? 0) + 1)
      } else if (value == 2) {
        if (type == 'frame') {
          map.set('accident', (map.get('accident') ?? 0) + 1)
        } else {
          map.set('repair', (map.get('repair') ?? 0) + 1)
        }
      } else if (value == 1) {
        if (type == 'frame') {
          map.set('accident', (map.get('accident') ?? 0) + 1)
        } else {
          map.set('repair', (map.get('repair') ?? 0) + 1)
        }
      }
      return map
    }, new Map());

    if (!hasMobile) {
      setProd(produce(prod, draft => {
        draft['perfInspRecVO']['skinStt'][name] = value
        draft['perfInspRecVO']['acdtHstYn'] = map.get('accident') ? 'Y' : 'N';
        draft['perfInspRecVO']['smplRprYn'] = map.get('repair') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsOutPanelFRankYn'] = map.get('skinRank1') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsOutPanelSRankYn'] = map.get('skinRank2') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsMainSkltYn'] = map.get('frame') ? 'Y' : 'N';
      }));
    } else {
      setProd(produce(prod, draft => {
        draft['perfInspRecVO']['skinStt'] = currentSkinStt;
        draft['perfInspRecVO']['acdtHstYn'] = map.get('accident') ? 'Y' : 'N';
        draft['perfInspRecVO']['smplRprYn'] = map.get('repair') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsOutPanelFRankYn'] = map.get('skinRank1') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsOutPanelSRankYn'] = map.get('skinRank2') ? 'Y' : 'N';
        draft['perfInspRecVO']['partsMainSkltYn'] = map.get('frame') ? 'Y' : 'N';
      }));
    }
  };

  const handleCancelClick = (e) => {
    console.log('cancel clicked');
    e.preventDefault();
    setMPop(false);
    setErrorPop(false);
  }

  const goPrevStep = async (e) => {
    // for mobile version
    e.preventDefault();
    showConfirm('이전 단계로 이동합니다. 현재 내용을 임시저장 하시겠습니까?', async () => {
      showLoader()
      console.log('prevPage : ', prevPage + '?' + qs.stringify({ dlrPrdId }))

      const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(prod).then(res => res?.data)
      const formData = new FormData()
      const fileInputs = Array.from(prodRef.current.querySelectorAll('input[type=file]'))

      formData.append('dlrPrdId', dlrPrdId)
      formData.append('perfInspId', prod?.perfInspRecVO?.perfInspId)

      fileInputs
        .filter(input => !!input.files[0])
        .forEach(input => {
          const file = input.files[0]
          formData.append('files', file, input.dataset.columnName)
        })

      const orgFiles = formData.get('files')
      console.log("orgFiles : ", orgFiles)

      if (orgFiles) {
        console.log('업로드')
        const result = await dealerProdApi.updatePerfInspRecPic(formData)
        console.log("goNextStep -> result", result)
      }

      console.log('페이지이동')

      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    }, async () => {
      showLoader()
      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    });
  }

  // const handleErrorClick = (e) => {
  //   e.preventDefault();
  //   console.log('prevPage : ', prevPage + '?' + qs.stringify({ dlrPrdId }))
  //   Router.push(prevPage + '?' + qs.stringify({ dlrPrdId })).then(() => {
  //     window.scrollTo(0, 0)
  //   });
  // }

  // const handleOkClick = async (e) => {
  //   e.preventDefault();
  //   setMPop(false);

  //   showLoader();
  //   console.log('새로등록');
  //   console.log('TCL: registerCarPerformance -> prod', prod);
  //   const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(prod).then(res => res?.data);
  //   if (statusinfo?.returncd == '000') {
  //     //이미지 업로드
  //     const formData = new FormData()
  //     const fileInputs = Array.from(prodRef.current.querySelectorAll('input[type=file]'))

  //     formData.append('dlrPrdId', dlrPrdId)
  //     formData.append('perfInspId', prod?.perfInspRecVO?.perfInspId)

  //     fileInputs
  //       .filter(input => !!input.files[0])
  //       .forEach(input => {
  //         const file = input.files[0]
  //         formData.append('files', file, input.dataset.columnName)
  //       })

  //     const orgFiles = formData.get('files')
  //     console.log("orgFiles : ", orgFiles)

  //     if (orgFiles) {
  //       console.log('업로드')
  //       const result = await dealerProdApi.updatePerfInspRecPic(formData)
  //       console.log("goNextStep -> result", result)
  //     }

  //     console.log('페이지이동')

  //     await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId })).then(() => {
  //       window.scrollTo(0, 0);
  //     });
  //     hideLoader();
  //   } else if (statusinfo?.returncd === 'MBR4005') {
  //     hideLoader();
  //     showLoginForm(Router.router.asPath, (data) => {
  //       console.log('loginCallback data ::::: ', data)
  //       if (data?.isLogin) {
  //         goNextStep()
  //       } else {
  //         showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
  //       }
  //     })
  //   } else {
  //     hideLoader();
  //     showAlert("에러가 발생했습니다")
  //   }

  //   console.log('data : ', data)
  //   console.log('statusinfo : ', statusinfo)
  // }

  const goNextStep = (e) => {
    e.preventDefault();
    console.log('TCL: goNextStep -> e', e);

    if(!isAllow){
      showAlert('서명 란에서 중고자동차 성능 상태점검을<br />체크하세요');
      return;
    }
    if(!isConfirm){
      showAlert('매물등록 규정을 확인해주세요')
      return
    }

    console.log("goNextStep -> prod?.perfInspRecVO", prod?.perfInspRecVO)
    const valid = validator.validate({
      crPrsnNum: prod?.crPrsnNum,
      ...prod?.perfInspRecVO,
    });
    const { error } = valid;
    console.log('TCL: goNextStep -> valid : ', valid);

    if (error) {
      const { messages, field, label, top } = error[0]
      let message = `[${label}] ${messages[0]}`
      
      console.log("validate -> field", field)
      
      if(field === 'perfInspId' || field === 'crPrsnNum'){
        message += ' 영문 및 숫자만 입력가능합니다. (20자 이내)'
      }
      
      console.log("validate -> top", top)
      console.log("validate -> window.scrollY", window.scrollY)
      //마지막 선물
      //현재 스크롤 위치 + input 상대위치 - 100 만큼 스크롤 내린 위치로 이동
      //포커싱은 스크립트로 강제로 주거나 컴포넌트로 상태값 넘겨서 구현해야 할듯
      //나머지는 맡깁니다...

      window.scrollTo(0, window.scrollY + top - 100)
      showAlert(message);
    } else {
      // if (!hasMobile) {
      showConfirm('저장 후, 다음단계로 이동하시겠습니까?', async () => {
        showLoader();
        console.log('새로등록');
        console.log('TCL: registerCarPerformance -> prod', prod);
        
        globalThis.window.localStorage.setItem(dlrPrdId, dlrPrdId)

        const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(prod).then(res => res?.data)
        if (statusinfo?.returncd == '000') {

          //이미지 업로드
          const formData = new FormData()
          const fileInputs = Array.from(prodRef.current.querySelectorAll('input[type=file]'))

          formData.append('dlrPrdId', dlrPrdId)
          formData.append('perfInspId', prod?.perfInspRecVO?.perfInspId)

          fileInputs
            .filter(input => !!input.files[0])
            .forEach(input => {
              const file = input.files[0]
              formData.append('files', file, input.dataset.columnName)
            })

          const orgFiles = formData.get('files')
          console.log("orgFiles : ", orgFiles)

          if (orgFiles) {
            console.log('업로드')
            const result = await dealerProdApi.updatePerfInspRecPic(formData)
            console.log("goNextStep -> result", result)
          }

          console.log('페이지이동')

          await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId }))
          hideLoader();
        } else if (statusinfo?.returncd === 'MBR4005') {
          hideLoader();
          showLoginForm(Router.router.asPath, (data) => {
            console.log('loginCallback data ::::: ', data)
            if (data?.isLogin) {
              goNextStep()
            } else {
              showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
            }
          })
        } else {
          hideLoader();
          showAlert("에러가 발생했습니다")
        }

        console.log('data : ', data)
        console.log('statusinfo : ', statusinfo)
      });
      // } else {
      // const [informText, setInformText] = useState('');
      // const [errorText, setErrorText] = useState('');
      // setInformText('저장 후 다음단계로 이동하시겠습니까?');
      // openMPop(true);
      // }
    }
  };

  const inputSignature = (e) => {
    const { name, checked, value } = e.target
    console.log('inputSignature called');
    console.log('name', name, 'checked', checked, 'value', value);
    switch (name) {
      case 'isAllow':
        setIsAllow(checked);
        break;
      default:
        inputRecord(e)
    }
  };

  useEffect(() => {
    if (prod?.perfInspRecVO?.perfInspId) {
      setIsEditing(false)
    }

    const storedDlrPrdId  =globalThis.window.localStorage.getItem(dlrPrdId)

    console.log("storedDlrPrdId", storedDlrPrdId)

    if(storedDlrPrdId){
      setIsConfirm(true)
      setIsAllow(true)
    }

    return () => {
      initAlert();
      initConfirm();
    }
  }, []);

  console.log('prod?.perfInspRecVO', prod?.perfInspRecVO);
  const [fpTerms1, setFpTerms1] = useState(false);
  const openFpTerms = useCallback(
    (e, v) => {
      e.preventDefault();
      if (v.name === 'terms1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '매물 등록 규정 확인',
            options: ['close']
          }
        });
        setFpTerms1(true);
      }
    },
    [dispatch]
  );

  const handleTermsApply = useCallback((e, value) => {
    console.log('terms value ::::::::::::::', value, 'e ::::::::: ', e);
    setIsConfirm(value);
  },[]);

  const handleFpTermsChange = useCallback((e) => {
    closeFpTerms(e);
  }, []);

  const closeFpTerms = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={2} />
          <form className="register-form" ref={prodRef}>
            <fieldset>
              <legend className="away">차량 정보 조회</legend>
              <CarPerformanceCheck
                mode="apply"
                perfData={prod?.perfInspRecVO}
                crPrsnNum={prod?.crPrsnNum}
                perfInspId={prod?.perfInspRecVO?.perfInspId}
                historyData={prod?.perfInspRecVO?.skinStt}
                isAllow={isAllow}
                onSignatureChange={inputSignature}
                onChangePrsNum={inputProd}
                onInputChange={inputRecord}
                onChangeValues={inputRecordValues}
                onSkinChange={inputSkin}
                onChangeMainDeviceState={inputMainDevice}
              />
            </fieldset>
          </form>
          <div className="m-terms-sec">
            <MobSelectTerms
              termsData={[
                { id: 'chk-agree1', title: '매물 등록 규정 확인', checked: false, name: 'terms1' }
              ]}
              onTermsClick={openFpTerms}
              onChange={handleTermsApply}
              allAgree={false}
            />
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button
            size="big"
            background="blue20"
            color="blue80"
            title="이전"
            buttonMarkup={true}
            onClick={goPrevStep}
          />
          <Button size="big" background="blue80" title="다음" buttonMarkup={true} onClick={goNextStep} />
        </Buttons>
        {/* <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={true}>
          <div className="con-wrap">
            <p>{informText}</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" onClick={handleCancelClick} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={handleOkClick} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={errPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={true}>
          <div className="con-wrap">
            <p>{errorText}</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" onClick={handleCancelClick} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={handleErrorClick} />
            </Buttons>
          </div>
        </RodalPopup> */}

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">매물 등록 규정 확인</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFpTerms} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap register-wrap">
        <MypageNavi />
        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={2} />
          </div>

          <DealerCarSuggest
            crPrsnNum={prod?.crPrsnNum}
            perfInspId={prod?.perfInspRecVO?.perfInspId}
            onChangePrsNum={inputProd}
            onChange={inputRecord}
            isEditing={isEditing}
          />

          <form className="register-form history-form" ref={prodRef}>
            <DealerCarInfo item={prod?.perfInspRecVO} onChange={inputRecord} />
            <DealerCarTotalStatus item={prod?.perfInspRecVO} onChange={inputRecord} onChangeValues={inputRecordValues} />
            <DealerCarHistory historyData={prod?.perfInspRecVO?.skinStt} onChange={inputSkin} sttArray={
              [
                prod?.perfInspRecVO['acdtHstYn'] ?? 'N',
                prod?.perfInspRecVO['smplRprYn'] ?? 'N',
                prod?.perfInspRecVO['partsOutPanelFRankYn'] ?? 'N',
                prod?.perfInspRecVO['partsOutPanelSRankYn'] ?? 'N',
                prod?.perfInspRecVO['partsMainSkltYn'] ?? 'N',
              ]
            } />
            <DealerCarDetailStatus item={prod?.perfInspRecVO?.mainDevice} onChange={inputMainDevice} />

            <fieldset className="car-expert">
              <legend className="away">특기사항 및 점검자의 의견</legend>
              <table summary="특기사항 및 점검자의 의견에 대한 내용" className="table-tp1 input">
                <caption className="away">특기사항 및 점검자의 의견</caption>
                <colgroup>
                  <col width="24%" />
                  <col width="24%" />
                  <col width="52%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>특기사항 및 점검자의 의견 <span style={{ color: 'red' }}>*</span></th>
                    <td>성능•상태 점검자</td>
                    <td>
                      <Input
                        type="text"
                        id="expert-opinion"
                        onBlur={inputRecord}
                        name="uniqChkrOpn"
                        disabled={!isEditing}
                        value={prod?.perfInspRecVO?.uniqChkrOpn || ''}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <DealerCarPhoto
              frontImgUrl={prod?.perfInspRecVO?.insShotPhtUrl1}
              backImgUrl={prod?.perfInspRecVO?.insShotPhtUrl2}
            />
            <DealerCarSignature signData={prod?.perfInspRecVO} isAllow={isAllow} onChange={inputSignature} />
            <div className="agree-terms-wrap mt40">
              <CheckBox
                id='chk-agree'
                title='매물등록 규정 확인'
                checked={isConfirm}
                onChange={(e)=>{ setIsConfirm(e.target.checked)}}
              />
              <div className="terms-wrap">
                내용
              </div>
            </div>
          </form>

          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button
                size="big"
                background="gray"
                title="이전"
                width={150}
                height={60}
                buttonMarkup={true}
                onClick={goPrevStep}
              />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={150} height={60} buttonMarkup={true} onClick={goNextStep} />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

registerCarPerformance.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, url, accessToken } = helper;
  const { dlrPrdId } = query;

  await helper
    .setRedirectUrl(prevPage)
    .requiredQuery('dlrPrdId')
    .accessControl()
    .memberAccessControlAsync()
    .then(() => {
      helper.error()
    })
  // .dispatch(getDealerProdAction(dlrPrdId));

  const { data, statusinfo } = await dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => res?.data)
  console.log("registerCarPerformance.getInitialProps -> data", data)

  if (!data) {
    helper.error({ code: 204, message: '상품이 없습니다' })
  }

  return {
    query,
    prodItem: data,
    memberInfo: helper.memberInfo
  };
};

const stt = {
  'frtPnst': 'frame',
  'crossMem': 'frame',
  'insdPnstLeft': 'frame',
  'insdPnstRight': 'frame',
  'rearPnst': 'frame',
  'trunkFloor': 'frame',
  'frtSideMemLeft': 'frame',
  'frtSideMemRight': 'frame',
  'rearSideMemLeft': 'frame',
  'rearSideMemRight': 'frame',
  'frtWhlHouseLeft': 'frame',
  'frtWhlHouseRight': 'frame',
  'rearWhlHouseLeft': 'frame',
  'rearWhlHouseRight': 'frame',
  'pilrPnstFrtLeft': 'frame',
  'pilrPnstFrtRight': 'frame',
  'pilrPnstMedmLeft': 'frame',
  'pilrPnstMedmRight': 'frame',
  'pilrPnstRearLeft': 'frame',
  'pilrPnstRearRight': 'frame',
  'pckgTray': 'frame',
  'frtDashPnst': 'frame',
  'floorPnst': 'frame',

  'hood': 'skinRank1',
  'frontFenderLeft': 'skinRank1',
  'frontFenderRight': 'skinRank1',
  'frontDoorLeft': 'skinRank1',
  'frontDoorRight': 'skinRank1',
  'rearDoorLeft': 'skinRank1',
  'rearDoorRight': 'skinRank1',
  'trunklid': 'skinRank1',
  'rdarSpt': 'skinRank1',

  'roofPnst': 'skinRank2',
  'qrtrPnstLeft': 'skinRank2',
  'qrtrPnstRight': 'skinRank2',
  'sideSealPnstLeft': 'skinRank2',
  'sideSealPnstRight': 'skinRank2',

}

export default registerCarPerformance;
