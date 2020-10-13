const globalThis = require('globalthis')();
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import { produce } from 'immer';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
// import * as http from '@src/utils/HttpUtils'

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MypageExposureType from '@src/components/mypage/dealer/DealerProdOption/MypageExposureType';
import MypageSellPrice from '@src/components/mypage/dealer/DealerProdOption/MypageSellPrice';
import MypageSeizure from '@src/components/mypage/dealer/DealerProdOption/MypageSeizure';
import MypageAccident from '@src/components/mypage/dealer/DealerProdOption/MypageAccident';
import MypageCarMovie from '@src/components/mypage/dealer/DealerProdOption/MypageCarMovie';
import DealerProdOptionDetail from '@src/components/mypage/dealer/DealerProdOptionDetail';

import { createValidator } from '@lib/share/validator';
import dealerProdSchema from '@lib/share/validator/mypage/dealer/dealerProd';

import { SystemContext } from '@src/provider/SystemProvider';
import RenderHelper from '@lib/share/render/helper';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'
import * as memberApi from '@src/api/common/memberApi';
import * as dataUtils from '@src/utils/DataUtils'
import * as MemberUtil from '@src/utils/MemberUtil'
import MobSelectList from '@lib/share/items/MobSelectList';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';
import _ from 'lodash';
// import RodalPopup from '@lib/share/popup/RodalPopup';
// import useRodal from '@lib/share/custom/useRodal';
import { fetchMarketPriceAction } from '@src/actions/buycar/buyCarDetailActions';
import { console } from 'globalthis/implementation';

const prevPage = `/mypage/dealer/sellcar/registerCarPerformance`;
const nextPage = `/mypage/dealer/sellcar/registerCarPhoto`;

const validator = createValidator(dealerProdSchema, {
  required: [
    'assgnDlrTelEnc', 'assgnDlrId', 'szrMorCnt', 'slAmt',
  ]
});

const registerCarIntroducing = ({ query, prodItem = {}, memberInfo = {} }) => {
  const dispatch = useDispatch();
  console.log("registerCarIntroducing -> prodItem", prodItem);
  const { hasMobile, marketPrice } = useSelector((state) => ({
    hasMobile: state.common.hasMobile,
    marketPrice: state.buyCarDetail.marketPrice ?? {},
  }));

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
          bottom: 56,
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

  console.log('prod >>>>>>>>>>>>>>>>>', prodItem);
  // // mobile show dialog
  // const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  // const [errPop, setErrorPop, openErrorPopup] = useRodal(false);
  // const [informText, setInformText] = useState('');
  // const [errorText, setErrorText] = useState('');
  // // end mobile

  const formRef = useRef()
  const { dlrPrdId } = query;
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);
  const [phoneList, setPhoneList] = useState([])
  const [prod, setProd] = useState({
    ...prodItem,
    cmnt: prodItem?.cmnt ?? {}
  });

  // useEffect(() => {
  //   console.log('prodItem?.assgnDlrTelEnc', prodItem?.assgnDlrTelEnc);
  //   console.log('prodItem?.assgnDlrId', prodItem?.assgnDlrId);
  //   setProd(produce(prod, draft => {
  //     draft['assgnDlrTelEnc'] = prodItem?.assgnDlrTelEnc;
  //     draft['assgnDlrId'] = prodItem?.assgnDlrId;
  //   }));
  // }, [ phoneList ]);

  useEffect(() => {
    const { car = {} } = prod
    console.log("registerCarIntroducing -> car", car)

    memberApi.selectMbByEntrList(memberInfo)
      .then(res => res?.data)
      .then(res => {
        const { data = [], statusinfo } = res;
        const defaultOption = [{ label: '선택하세요', id: '0', value: '0' }]

        const memberList = _.uniqBy([memberInfo, ...data].map(item => {
          const { mbHpPnEnc, mbNm, mbId } = item;
          const hp = MemberUtil.setHpPnFormat(mbHpPnEnc);

          return {
            value: mbId,
            id: mbId,
            label: `${mbNm} (${hp})`,
            mbNm,
            mbId,
            hp,
          }
        }), function (e) {
          return e.value;
        });

        console.log('temp member info >>>', memberList);

        if (hasMobile) {
          setPhoneList(memberList);
          const hp = _.result(_.find(memberList, function (obj) {
            return obj.mbId === prodItem?.assgnDlrId;
          }), 'hp');

          console.log('hp>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', hp);
          setProd(produce(prod, draft => {
            draft['assgnDlrTelEnc'] = hp;
            draft['assgnDlrId'] = prodItem?.assgnDlrId;
          }));
        } else {
          setPhoneList(
            defaultOption
              .concat(
                memberList
              )
          );
          
          const { assgnDlrId, assgnDlrTelEnc } = prod
          if(assgnDlrId && !assgnDlrTelEnc){//id만 있고 연락처가 없는 경우 수동으로 넣어주기...
            console.log('set : ', memberList)
            setProd(produce(prod, draft => {
              console.log('hp ::::: ', memberList.find(phone => phone?.value === assgnDlrId)?.hp)
              draft['assgnDlrTelEnc'] = memberList.find(phone => phone?.value === assgnDlrId)?.hp;
            }));
          }
        }
      });

    return () => {
      initAlert();
      initConfirm();
    }
  }, []);

  const onChangeProd = (e) => {
    const { name, value } = e.target
    console.log("onChangeProd -> name", name)
    console.log("onChangeProd -> value", value)
    console.log("onChangeProd -> value", typeof value)

    setProd(produce(prod, draft => {
      draft[name] = value
    }))
  }

  const onChangeProdValues = (values) => {
    console.log("onChangeProdValues -> values", values)
    setProd(produce(prod, draft => {
      Object.keys(values).forEach((key) => {
        draft[key] = values[key]
      })
    }))
  }

  const onCheckProdCmnt = (e) => {
    const { name, value, checked } = e.target

    setProd(produce(prod, draft => {
      draft['cmnt'][name] = checked ? 'Y' : 'N'
    }))
  }

  const onChangeCmntValues = (item) => {
    setProd(produce(prod, draft => {
      Object.keys(item).forEach(name => {
        draft['cmnt'][name] = item[name]
      })
    }))
  }

  const onMobSelect = (e, deps) => {
    console.log('selected mob list', deps);
    const { value, id, label, mbId, hp } = deps;

    setProd(produce(prod, draft => {
      draft['assgnDlrTelEnc'] = hp
      draft['assgnDlrId'] = mbId
    }));
  };

  const onSelect = (item, e) => {
    console.log("onSelect -> item", item)
    console.log("onSelect -> e", e)
    const { value, mbNm, mbId, hp } = item

    setProd(produce(prod, draft => {
      draft['assgnDlrTelEnc'] = hp
      draft['assgnDlrId'] = mbId
    }))
  }

  const uploadImagesAsync = async () => {
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file][name]')).filter(input => !!input.files[0])
    console.log('formRef fileInputs : ', fileInputs)
    if (fileInputs === 0) {
      resolve(true);
      return;
    };

    return new Promise((resolve) => {
      if (fileInputs.length > 0) {
        const formData = new FormData() // 0010_소트번호 //kpntCntn scrcYn

        fileInputs.forEach((input) => {
          const { name } = input
          console.log("uploadImagesAsync -> name", name)

          if (input.files.length > 4) {
            resolve(false)
            return
          }

          input.files.forEach((file, i) => {
            formData.append('files', file, `${name}_${i + 1}%&${file.name}`)
          })
        })

        formData.append('dlrPrdId', dlrPrdId)
        formData.append('picType', 'carCmntPic')
        dealerProdApi.insertSaleCarPic(formData)
          .then(res => res?.data)
          .then(({ data, statusinfo }) => {
            resolve(statusinfo?.returncd === '000')
          })
          .catch(() => {
            resolve(false)
          })
      } else {
        resolve(true)
      }
    })
  }

  // const handleCancelClick = (e) => {
  //   console.log('cancel clicked');
  //   e.preventDefault();
  //   setMPop(false);
  //   setErrorPop(false);
  // }

  // const handlePrevClick = (e) => {
  //   console.log('prev clicked');
  //   e.preventDefault();
  //   setErrorPop(true);
  //   setErrorText('이전 단계로 이동하시겠습니까?');
  // };

  const goPrevStep = (e) => {
    e.preventDefault();
    Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
  }

  // const handleOkClick = async (e) => {
  //   e.preventDefault();
  //   console.log('next page open clicked');
  //   showLoader()

  //   const result = await uploadImagesAsync()
  //   console.log("goNextStep -> result", result)
  //   if (!result) {
  //     hideLoader()
  //     showAlert('업로드에 실패했습니다')
  //     return
  //   }

  //   let newParam = {
  //     tempSaveYn: 'N',
  //     ...prod,
  //   }

  //   if (marketPrice?.appPrice > 0) {
  //     newParam = { ...newParam, ...marketPrice }
  //   }
  //   hideLoader();

  //   const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(newParam).then(res => res?.data);
  //   console.log("sendData -> data", data)
  //   console.log("sendData -> statusinfo", statusinfo)

  //   if (statusinfo?.returncd == '000') {
  //     await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId })).then(() => {
  //       window.scrollTo(0, 0);
  //     });
  //     hideLoader()
  //   } else if (statusinfo?.returncd === 'MBR4005') {
  //     hideLoader()
  //     showLoginForm(Router.router.asPath, (data) => {
  //       console.log('loginCallback data ::::: ', data)
  //       if (data?.isLogin) {
  //         goNextStep()
  //       } else {
  //         showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
  //       }
  //     })
  //   } else {
  //     hideLoader()
  //     showAlert(statusinfo?.returnmsg)
  //   }
  // }

  const goNextStep = (e) => {
    e && e.preventDefault();
    console.log("goNextStep -> prod", prod)

    const valid = validator.validate(prod);
    const { error } = valid;
    console.log('TCL: goNextStep -> valid : ', valid);
    console.log('TCL: goNextStep -> marketPrice : ', marketPrice);

    if (error) {
      const { messages, field, label } = error[0]
      let message = `[${label}] ${messages[0]}`
      showAlert(message);
    } else {
      // if (hasMobile) {
      showConfirm('저장 후, 다음단계로 이동하시겠습니까?', async () => {
        showLoader()

        const result = await uploadImagesAsync()
        console.log("goNextStep -> result", result)

        if (!result) {
          hideLoader()
          showAlert('업로드에 실패했습니다')
          return
        }

        let newParam = {
          // tempSaveYn: 'N',
          ...prod,
        }

        if (marketPrice?.appPrice > 0) {
          newParam = { ...newParam, ...marketPrice }
        }

        const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(newParam).then(res => res?.data)
        console.log("sendData -> data", data)
        console.log("sendData -> statusinfo", statusinfo)

        if (statusinfo?.returncd == '000') {
          await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId }))
          hideLoader()
        } else if (statusinfo?.returncd === 'MBR4005') {
          hideLoader()
          showLoginForm(Router.router.asPath, (data) => {
            console.log('loginCallback data ::::: ', data)
            if (data?.isLogin) {
              goNextStep()
            } else {
              showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
            }
          })
        } else {
          hideLoader()
          showAlert(statusinfo?.returnmsg)
        }
      });
      // } else {
      // 음..
      // setInformText('저장 후, 다음단계로 이동하시겠습니까?');
      // openMPop(true);
      // }
    }
  };

  const beforeGoPrev = async () => {
    showConfirm('이전 단계로 이동합니다. 현재 내용을 임시저장 하시겠습니까?', async () => {
      showLoader()
      const result = await uploadImagesAsync()
      console.log("goNextStep -> result", result)

      if (!result) {
        hideLoader()
        showAlert('업로드에 실패했습니다')
        return
      }

      let newParam = {
        // tempSaveYn: 'N',
        ...prod,
      }

      if (marketPrice?.appPrice > 0) {
        newParam = { ...newParam, ...marketPrice }
      }

      const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(newParam).then(res => res?.data)
      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    }, async () => {
      showLoader()
      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    });
  }

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form steps-pb">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={3} />
          <form className="register-form" ref={formRef}>
            <fieldset className="pdside20">
              <legend className="away">차량 정보 조회</legend>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>판매정보</MenuTitle>
                  <MenuCont>
                    <div className="register-number">
                      <h4>연락처</h4>
                      <MobSelectList
                        width='68%'
                        itemsSource={phoneList}
                        selectedItem={findLabelValue(phoneList, prod?.assgnDlrId)}
                        displayMemberPath={'label'}
                        selectedValuePath={'value'}
                        subPop={true}
                        onClick={onMobSelect}
                      />
                    </div>
                    <MypageExposureType item={prod} onChangeValues={onChangeProdValues} value={memberInfo?.data?.authCd} />
                    <MypageSellPrice value={prod?.slAmt} item={prod} onChange={onChangeProd} />
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>압류/저당 입력</MenuTitle>
                  <MenuCont>
                    <MypageSeizure value={prod?.szrMorCnt} onChange={onChangeProd} />
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>사고이력 정보</MenuTitle>
                  <MenuCont>
                    <MypageAccident item={prod} onChange={onChangeProd} />
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>동영상</MenuTitle>
                  <MenuCont>
                    <MypageCarMovie value={prod?.crMvUrl} onChange={onChangeProd} />
                  </MenuCont>
                </MenuItem>
              </ul>
            </fieldset>
          </form>
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
          {/* <Button size="big" background="blue80" title="다음" href='/mypage/dealer/sellcar/registerCarIntroducingNext' nextLink={true} /> */}
          {/* <Button size="big" background="blue80" title="다음" href='/mypage/dealer/sellcar/registerCarIntroducingNext' nextLink={true} /> */}
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
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap register-wrap price-introduce">
        <MypageNavi />
        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={3} />
          </div>
          <form className="register-form" ref={formRef}>
            <fieldset>
              <legend className="away">연락처</legend>
              <div className="register-number">
                <h4>연락처 <span style={{ color: 'red' }}>*</span></h4>
                <SelectBox
                  id="register-number"
                  className="items-sbox"
                  options={phoneList}
                  width={200}
                  height={40}
                  name='assgnDlrId'
                  onChange={onSelect}
                  value={prod?.assgnDlrId}
                />
              </div>
            </fieldset>

            {/* 노출유형 입력 */}
            <MypageExposureType item={prod} onChangeValues={onChangeProdValues} value={memberInfo?.data?.authCd} memberInfo={memberInfo} />

            {/* 판매가격 입력 */}
            <MypageSellPrice value={prod?.slAmt} item={prod} onChange={onChangeProd} />

            {/* 압류/저당 입력 */}
            <MypageSeizure value={prod?.szrMorCnt} onChange={onChangeProd} />

            {/* 사고이력정보 */}
            <MypageAccident item={prod} onChange={onChangeProd} />

            {/* 동영상 */}
            <MypageCarMovie value={prod?.crMvUrl} onChange={onChangeProd} />

            {/* 나의설명글 */}
            <DealerProdOptionDetail onCheck={onCheckProdCmnt} onChangeValues={onChangeCmntValues} item={prod?.cmnt} />

          </form>
          <Buttons align="right" marginTop={48}>
            <span className="step-btn-l">
              <Button
                size="big"
                background="gray"
                title="이전"
                width={150}
                height={60}
                buttonMarkup={true}
                onClick={beforeGoPrev}
              />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={127} height={60} buttonMarkup={true} onClick={goNextStep} />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

registerCarIntroducing.getInitialProps = async (http) => {
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

  if (!data) {
    helper.error({ code: 204, message: '상품이 없습니다' })
  }

  return {
    query,
    prodItem: data,
    memberInfo: helper.memberInfo
  };
};

export default registerCarIntroducing
