import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import produce from 'immer';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { isEmpty } from 'lodash';
// import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';

import MypageSeizure from '@src/components/mypage/dealer/DealerProdOption/MypageSeizure';
import MypageAccident from '@src/components/mypage/dealer/DealerProdOption/MypageAccident';
import MypageCarMovie from '@src/components/mypage/dealer/DealerProdOption/MypageCarMovie';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import MobSellRegister from '@src/components/common/MobSellRegister';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { preventScroll } from '@src/utils/CommonUtil';
import { getSellCarTermData, getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, getShootingPartList, carHistoryAuthSucc } from '@src/actions/sellcar/sellCarAction';

import MypageSellPrice from '@src/components/mypage/dealer/DealerProdOption/MypageSellPrice';
import MypageExposureType from '@src/components/mypage/dealer/DealerProdOption/MypageExposureType';
import { SystemContext } from '@src/provider/SystemProvider';
import dealerProdSchema from '@lib/share/validator/mypage/dealer/dealerProd';
import { createValidator } from '@lib/share/validator';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import carSchema from '@lib/share/validator/sellcar/Car';
import { validatePicture, carInfoNullCheck, carOptionNullCheck, checkRegistPeriodAllowed, photoCountCheck, getSellCarImgList } from '@src/components/sellcar/self/MobSellcarUtil';
import { getHpPn, uploadCarPhoto, validReqIdAndRgstIdCheck, deleteCarPhotos } from '@src/api/sellcar/CommonSellcarApi';
import { setComma, removeComma, getLabelFromArray } from '@src/utils/StringUtil';
import { MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import MobLogin from '@src/components/common/MobLogin';
import { selectSaleCarPic, insertSaleCarPic } from '@src/api/mypage/dealer/dealerProdApi';
import RenderHelper from '@lib/share/render/helper';
import { setTimeout } from 'globalthis/implementation';

//import { mainPhotoList, subPhotoList } from '@src/dummy/sellcar/carPhotoOptions';

const MobCarModify = ({ callback, prodItemFun, memberInfo = {}, changingEvent, firstStep, reloadEvent }) => {
  const dispatch = useDispatch();
  const [prodItem, setProdItem] = useState(prodItemFun());
  const { showAlert, showConfirm, showLoader, hideLoader } = useContext(SystemContext);
  const { marketPrice } = useSelector((state) => ({
    hasMobile: state.common.hasMobile,
    marketPrice: state.buyCarDetail.marketPrice ?? {}
  }));
  const { dlrPrdId } = prodItem;

  const { mainPhotoList, subPhotoList } = useSelector((state) => state.sellCarStore);

  const handleCancel = (e) => {
    if (callback) callback(e);
  };

  const [titleCarName, setTitleCarName] = useState(prodItem.car.crNm);
  const [titleCarNo, setTitleCarNo] = useState(prodItem.car.crNo);
  const [carPhotoList, setCarPhotoList] = useState(prodItem.car.photoList);

  // 차량 기본정보 - 달력
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);
  const [isDate1, setIsDate1] = useState(moment());
  const [isDate2, setIsDate2] = useState(moment());
  const [tabValue, setTabValue] = useState(0);

  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    setIsDate1(date);
    setCalPop1(false);
    preventScroll(false);
  };
  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    setIsDate2(date);
    setCalPop2(false);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    preventScroll(false);
  };
  const handleSave = (e) => {
    if (e) e.preventDefault();
    handleCancel(e);
  };
  // bottom
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const handleOpenFilter = useCallback(
    (e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      preventScroll(true);
    },
    [active, dimm]
  );
  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    preventScroll(false);
  }, [active, dimm]);

  const onCarModelSelect = useCallback(
    (e, selectedCarInfo) => {
      e.preventDefault();
      const { modelId: crMdlCd, modelNm: crMdlCdNm, name: crNm, manufactureId: crMnfcCd, manufactureNm: crMnfcCdNm } = selectedCarInfo;
      console.log('selectedCarInfo rename ::: ', crMdlCd, crMdlCdNm, crNm, crMnfcCd, crMnfcCdNm);
      setTitleCarName(crNm);
      const convertedCarInfo = { crMdlCd: crMdlCd, crMdlCdNm: crMdlCdNm, crNm: crNm, crMnfcCd: crMnfcCd, crMnfcCdNm: crMnfcCdNm };
      setProdItem(
        produce(prodItem, (draft) => {
          Object.keys(convertedCarInfo).forEach((key) => {
            draft.car[key] = convertedCarInfo[key];
          });
        })
      );
      handleCloseDimm();
    },
    [handleCloseDimm, prodItem]
  );

  /////////////// popModifyPrice.js
  const onChangePrice = (e) => {
    const { value } = e.target;
    setProdItem(
      produce(prodItem, (draft) => {
        draft.slAmt = parseInt(value);
      })
    );
  };

  ////////////// popModifyCarInfo.js
  const inputCarProp = (e) => {
    const { name, value } = e.target;
    setProdItem(
      produce(prodItem, (draft) => {
        draft.car[name] = value;
      })
    );
  };

  const inputCarProps = (values) => {
    setProdItem(
      produce(prodItem, (draft) => {
        Object.keys(values).forEach((key) => {
          draft.car[key] = values[key];
        });
      })
    );
  };

  /////////////////
  const inputProdItemProp = (e) => {
    const { name, value } = e.target;
    setProdItem(
      produce(prodItem, (draft) => {
        draft[name] = value;
      })
    );
  };

  // 옵션 선택
  const checkOption = (e, item) => {
    const {
      car: { optionList }
    } = prodItem;
    const isExist = optionList.find((option) => option.optCd === item.optCd);

    if (isExist) {
      setProdItem(
        produce(prodItem, (draft) => {
          draft.car.optionList = optionList.filter((option) => option.optCd !== item.optCd);
        })
      );
    } else {
      setProdItem(
        produce(prodItem, (draft) => {
          draft.car.optionList.push(item);
        })
      );
    }
  };

  // 선택옵션 체크
  const selectCheck = (checked, item) => {
    if (checked) {
      if (prodItem?.car?.addOptCntn?.includes(item)) {
        // if exist , do nothing
      } else {
        // if not exist append
        if (prodItem?.car?.addOptCntn) {
          setProdItem(
            produce(prodItem, (draft) => {
              draft.car.addOptCntn = prodItem.car.addOptCntn + ',' + item;
            })
          );
        } else {
          setProdItem(
            produce(prodItem, (draft) => {
              draft.car.addOptCntn = item;
            })
          );
        }
      }
    } else {
      if (prodItem?.car?.addOptCntn?.includes(item)) {
        // delete item from addOptCntn
        const tempList = prodItem.car.addOptCntn.split(',');
        const targetList = [];
        for (const element of tempList) {
          if (element !== item) {
            targetList.push(element);
          }
        }
        setProdItem(
          produce(prodItem, (draft) => {
            draft.car.addOptCntn = targetList.toString();
          })
        );
      } else {
        // if no exist , do nothing
      }
    }
  };

  ////////////// freeStep01 / popModifyCarPhoto / MobSellRegister
  ////////////// registerCarPhoto / popModifyCarPhoto / CarPictureApply
  // TODO 사진 촬영 팝업
  const [isLoading, setIsLoading] = useState(false); //페이지 딤처리
  const formRef = useRef(null); // For new

  // const applyPictureRegist = async (e, addedList, deletedList) => {
  //   if (e) e.preventDefault();
  //   const validSuccess = await validatePicture(formRef, prodItem.car.photoList, addedList, deletedList);
  //   if (!validSuccess) {
  //     showAlert(`대표사진을 등록해주세요.`);
  //   } else {
  //     if (deletedList?.length > 0) {
  //       const _photoList = [];
  //       deletedList.forEach((item) => {
  //         _photoList.push({ sortNo: item });
  //       });
  //       const CarMstVO = Object.assign({}, { crId: prodItem.car.crId }, { photoList: _photoList });
  //       const result = await deleteCarPhotos(CarMstVO);
  //       if (result && !addedList?.length > 0) {
  //         handleCarPictureReload();
  //       }
  //     }
  //     if (addedList?.length > 0) {
  //       const result = await sendPictureData(addedList);
  //       setIsLoading(false);
  //       if (result) {
  //         // 다음 페이지로
  //         setTabValue(3);
  //       } else {
  //         showAlert(`사진 저장에 실패 하였습니다.`);
  //       }
  //     } else {
  //       if (isLoading) setIsLoading(false);
  //     }
  //   }
  // };

  const sendPictureData = async (e) => {
    const formData = new FormData(); // multipart/form-data로 보낼 파일 생성
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'));
    formData.append('crId', prodItem.car.crId);
    formData.append('crNo', prodItem.car.crNo);
    formData.append('picType', 'carPic');

    fileInputs
      .filter((input) => !!input.files[0])
      .forEach((input, i) => {
        console.log('i : ', i);
        const file = input.files[0];

        formData.append('files', file, input.dataset.sortNo);
      });

    const orgFiles = formData.get('files');

    if (orgFiles) {
      const result = await changingEvent(formData, 'updateCarPhoto');
      if (result === true) {
        setTabValue(3);
      }
    } else {
      showConfirm(
        '업로드 한 이미지가 없습니다.<br>다음단계로 넘어가시겠습니까?',
        () => {
          setTabValue(3);
        },
        () => {
          setTabValue(2);
        }
      );
    }
    return false;
  };

  // 데이터 reload. App에서 동작 완료 후 다시 조회하는 용도.
  // seller 정보가 아닌 차량 정보를 통해 사진 조회 필요.
  // const handleCarPictureReload = useCallback(
  //   (e, params) => {
  //     console.log('TEST503 PHOTO RELOAD ::: START');
  //     showLoader();
  //     const { crId } = prodItem;
  //     console.log('TEST503 PHOTO RELOAD ::: CRID ::: ', crId);
  //     console.log('TEST503 PHOTO RELOAD crTypeCd ', prodItem.car.crTypeCd);

  //     if (prodItem.car.photoList) {
  //       setProdItem(
  //         produce(prodItem, (draft) => {
  //           draft.car.photoList = null;
  //         })
  //       );
  //     } else {
  //       Promise.all([selectSaleCarPic(crId).then((res) => res?.data)])
  //         .then(([res]) => {
  //           const { data, statusinfo } = res;
  //           console.log('registerCarPhoto -> data ', data);
  //           if (statusinfo?.returncd === '000') {
  //             //debugger
  //             //setCarPhotoList(data);

  //             // dispatch(
  //             //   inputPropAction({
  //             //     state: 'car',
  //             //     prop: 'photoList',
  //             //     value: data
  //             //   })
  //             // );

  //             setProdItem(
  //               produce(prodItem, (draft) => {
  //                 draft.car.photoList = data;
  //               })
  //             );
  //           }
  //         })
  //         .finally(() => {
  //           hideLoader();
  //         });
  //     }
  //   },
  //   [dispatch, hideLoader, prodItem, showLoader]
  // );

  ////////////// 차량성능기록 registerCarPerformance
  const [isAllow, setIsAllow] = useState(false);
  const inputSignature = (e) => {
    const { name, checked, value } = e.target;
    console.log('inputSignature called');
    console.log('name', name, 'checked', checked, 'value', value);
    switch (name) {
      case 'isAllow':
        setIsAllow(checked);
        break;
      default:
        inputRecord(e);
    }
  };

  const inputProd = (e) => {
    const { name, value } = e.target;
    setProdItem(
      produce(prodItem, (draft) => {
        draft[name] = value;
      })
    );
  };

  const inputRecord = (e) => {
    const { name, value } = e.target;
    setProdItem(
      produce(prodItem, (draft) => {
        draft.perfInspRecVO[name] = value;
      })
    );
  };

  const inputRecordValues = (items) => {
    setProdItem(
      produce(prodItem, (draft) => {
        // eslint-disable-next-line no-unused-expressions
        items?.forEach((item) => {
          draft.perfInspRecVO[item?.name] = items[item?.value];
        });
      })
    );
  };

  const inputSkin = (v, target, name) => {
    const currentSkinStt = v;

    const map = Object.keys(currentSkinStt).reduce((map, item) => {
      const value = currentSkinStt[item];
      const type = stt[item];

      if (value === 3) {
        map.set(type, (map.get(type) ?? 0) + 1);
      } else if (value === 2) {
        if (type === 'frame') {
          map.set('accident', (map.get('accident') ?? 0) + 1);
        } else {
          map.set('repair', (map.get('repair') ?? 0) + 1);
        }
      } else if (value == 1) {
        if (type === 'frame') {
          map.set('accident', (map.get('accident') ?? 0) + 1);
        } else {
          map.set('repair', (map.get('repair') ?? 0) + 1);
        }
      }
      return map;
    }, new Map());

    setProdItem(
      produce(prodItem, (draft) => {
        draft.perfInspRecVO.skinStt = currentSkinStt;
        draft.perfInspRecVO.acdtHstYn = map.get('accident') ? 'Y' : 'N';
        draft.perfInspRecVO.smplRprYn = map.get('repair') ? 'Y' : 'N';
        draft.perfInspRecVO.partsOutPanelFRankYn = map.get('skinRank1') ? 'Y' : 'N';
        draft.perfInspRecVO.partsOutPanelSRankYn = map.get('skinRank2') ? 'Y' : 'N';
        draft.perfInspRecVO.partsMainSkltYn = map.get('frame') ? 'Y' : 'N';
      })
    );
  };

  const inputMainDevice = (e, deps) => {
    setProdItem(
      produce(prodItem, (draft) => {
        draft.perfInspRecVO.mainDevice = deps;
      })
    );
  };

  ////////////// COMMON PART
  useEffect(() => {
    if (tabValue === 0) {
      showLoader();
      dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => {
        const { data: prodItem, statusinfo } = res?.data;

        console.log('modifyPricePop ::::::: prodItem', prodItem);

        if (statusinfo.returncd === '000') {
          console.log('modifyPricePop ::::::: 정상 prodItem', prodItem);
          setProdItem({
            ...prodItem,
            cmnt: prodItem?.cmnt ?? {}
          });
        }
      });
    }
  }, []);

  const handlePrevStep = (e, stepNo) => {
    e.preventDefault();
    if (stepNo !== 0) setTabValue(stepNo - 1);
  };

  // 로그인 팝업
  const [fpLogin, setFpLogin] = useState(false);
  const handleFpLoginClose = useCallback(
    (e) => {
      if (e !== undefined) e.preventDefault();
      setFpLogin(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  const [photoStepDoneFlag, setPhotoStepDoneFlag] = useState(false);
  const [carPerfChkStepDoneFlag, setCarPerfChkStepDoneFlag] = useState(false);

  const saveAndNextStep = (e, stepNo) => {
    if (e) e.preventDefault();

    // 로그인 체크
    // if (!isLoginLiveCheck()) setFpLogin(true);

    if (stepNo === 0) {
      // 차량 가격 저장
      const validator = createValidator(dealerProdSchema, {
        required: ['slAmt']
      });

      let param = { ...prodItem };
      if (marketPrice?.appPrice > 0) {
        param = { ...param, ...marketPrice };
      }
      const valid = validator.validate(param);
      const { error } = valid;
      if (error) {
        const { messages, field, label } = error[0];
        const message = `[${label}] ${messages[0]}`;
        showAlert(message);
      } else {
        showConfirm('저장하시겠습니까?', () => {
          changingEvent(param, 'updateProdPrice');
          setTabValue(stepNo + 1);
        });
      }
    } else if (stepNo === 1) {
      // 차량 정보 저장
      console.log('sendData -> prodItem ', prodItem);
      const validator = createValidator({ ...carSchema }, { required: ['crRlsPrc', 'dspl', 'drvDist', 'crNo', 'crUseDvcd', 'crClrCd', 'crTypeCd', 'crMnfcCd', 'crMdlCd', 'crDtlMdlCd'] });
      const valid = validator.validate({ ...prodItem?.car });
      const { error } = valid;
      console.log('valid : ', valid);

      if (error) {
        showAlert(`[${error?.[0]?.label}] ` + error?.[0]?.messages?.[0] || '에러가 발생했습니다');
      } else {
        showConfirm('저장하시겠습니까?', () => {
          showLoader();

          dealerProdApi.updateProdCarInfo(prodItem).then((res) => {
            setTabValue(stepNo + 1);
          });
          hideLoader();
          setTabValue(stepNo + 1);
        });
      }
    } else if (stepNo === 2) {
      // 차량 사진 등록
      // changingEvent(formData, 'updateCarPhoto'); // popModifyCarPhoto

      if (photoStepDoneFlag) {
        setPhotoStepDoneFlag(false);
        showConfirm(
          '다시 등록하시겠습니까?',
          () => {
            setPhotoStepDoneFlag(true);
          },
          () => {
            setTabValue(stepNo + 1);
          }
        );
      } else {
        setPhotoStepDoneFlag(true); // trigger ON and callback
      }
    } else if (stepNo === 3) {
      // 차량 성능 기록
      if (carPerfChkStepDoneFlag) {
        setCarPerfChkStepDoneFlag(false);
        showConfirm(
          '저장하시겠습니까?',
          () => {
            setCarPerfChkStepDoneFlag(true);
            setTimeout(() => {
              handleCancel();
              setCarPerfChkStepDoneFlag(false);
              reloadEvent('0');
            }, 1500);
          },
          () => {
            handleCancel();
          }
        );
      } else {
        setCarPerfChkStepDoneFlag(true);
      }
    }
  };

  //////////////////////////////////

  return (
    <>
      <div className="info-modify">
        {/* <TabMenu type="type2" mount={false} disabled={[0, 1, 2, 3]} defaultTab={tabValue}> */}
        <TabMenu type="type2" mount={false} disabled={[0, 1, 2, 3]} defaultTab={tabValue}>
          <TabCont tabTitle="가격" id="tab1-1" index={0}>
            <div className="market-price-graph pd20">
              <span className="tit">
                이 차량의 현재 시세<span>(단위: 만원)</span>
              </span>
              {/* <img src="/images/mobile/dummy/graph1.png" alt="현재시세 그래프" /> */}
            </div>
            <form className="register-form pdside20">
              <MypageSellPrice mode="sell-price" value={prodItem?.slAmt} item={prodItem} onChange={onChangePrice} />
              <MypageExposureType item={prodItem} onChangeValues={inputCarProps} value={memberInfo?.data?.authCd} />
            </form>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCancel} />
              <Button
                size="big"
                background="blue80"
                title="다음"
                onClick={(e) => {
                  saveAndNextStep(e, tabValue);
                }}
              />
            </Buttons>
          </TabCont>
          <TabCont tabTitle="차량정보" id="tab1-2" index={1}>
            <form className="register-form">
              <p className="car-name" onClick={handleOpenFilter}>
                {titleCarNo}
                <span>{titleCarName}</span>
              </p>
              <fieldset className="pdside20">
                <legend className="away">차량 정보 조회</legend>
                <ul className="m-toggle-list up-blue">
                  <MenuItem>
                    <MenuTitle tagName={'span'}>차량 기본정보</MenuTitle>
                    <MenuCont>
                      <MobCarBasicInfoEditor onInput={inputCarProp} item={prodItem?.car} isEditing={true} onChange={inputCarProp} onChangeValues={inputCarProps} type={'modifyCar'} />
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle tagName={'span'}>차량 옵션정보</MenuTitle>
                    <MenuCont>
                      <CarOptionsEditor
                        items={prodItem?.car?.optionList}
                        isEditing={true}
                        onCheck={checkOption}
                        addOptions={prodItem?.car?.optionList}
                        onInput={inputCarProp}
                        selectOption={prodItem?.car?.addOptCntn}
                        onSelectCheck={selectCheck}
                      />
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle tagName={'span'}>압류/저당 입력</MenuTitle>
                    <MenuCont>
                      <MypageSeizure value={prodItem?.szrMorCnt} onChange={inputProdItemProp} />
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle tagName={'span'}>사고이력 정보</MenuTitle>
                    <MenuCont>
                      <MypageAccident item={prodItem} onChange={inputCarProp} />
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle tagName={'span'}>동영상</MenuTitle>
                    <MenuCont>
                      <MypageCarMovie value={prodItem?.crMvUrl} onChange={inputProdItemProp} />
                    </MenuCont>
                  </MenuItem>
                </ul>
              </fieldset>
            </form>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="이전" onClick={(e) => handlePrevStep(e, tabValue)} />
              <Button size="big" background="blue80" title="다음" onClick={(e) => saveAndNextStep(e, tabValue)} />
            </Buttons>
          </TabCont>
          <TabCont tabTitle="차량사진" id="tab1-3" index={2}>
            <form ref={formRef}>
              <MobSellRegister
                photoList={carPhotoList}
                mode={'sellcar'}
                onPrev={() => {}}
                callback={sendPictureData}
                //onChangePhoto={updatePicture}
                mainSlotOptions={mainPhotoList}
                subSlotOptions={subPhotoList}
                carObj={prodItem.car}
                userType={1}
                trigger={photoStepDoneFlag}
                shottingComplete={() => {}} // 콤포넌트 안에서 처리
                reloadProcess={'self'}
              />
            </form>
            {/* <CarPictureApply photoList={prodItem.car.photoList} mainSlotOptions={mainPhotoList} subSlotOptions={subPhotoList} mode="dealer" isButton={false} /> */}
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="이전" onClick={(e) => handlePrevStep(e, tabValue)} />
              <Button size="big" background="blue80" title="다음" onClick={(e) => saveAndNextStep(e, tabValue)} />
            </Buttons>
          </TabCont>
          <TabCont tabTitle="성능기록" id="tab1-4" index={3}>
            <CarPerformanceCheck
              mode="apply"
              perfData={prodItem?.perfInspRecVO}
              crPrsnNum={prodItem?.crPrsnNum}
              perfInspId={prodItem?.perfInspRecVO?.perfInspId}
              historyData={prodItem?.perfInspRecVO?.skinStt}
              isAllow={isAllow}
              onSignatureChange={inputSignature}
              onChangePrsNum={inputProd}
              onInputChange={inputRecord}
              onChangeValues={inputRecordValues}
              onSkinChange={inputSkin}
              onChangeMainDeviceState={inputMainDevice}
              prodItem={prodItem}
              onSaveDone={handleSave}
              trigger={carPerfChkStepDoneFlag}
            />
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="이전" onClick={(e) => handlePrevStep(e, tabValue)} />
              <Button size="big" background="blue80" title="저장" onClick={(e) => saveAndNextStep(e, tabValue)} />
            </Buttons>
          </TabCont>
        </TabMenu>
      </div>

      <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm} />
      <MobBottomArea active={active} className="v-fp" zid={101}>
        <MobFilterModel selectedDepth={3} isMultiSelect={false} onCarModelSelect={onCarModelSelect} />
      </MobBottomArea>
      {
        <>
          <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
          <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
            <MobCalendar date={isDate1} callback={calendarCallback1} />
          </MobBottomArea>
          <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
            <MobCalendar date={isDate2} callback={calendarCallback2} />
          </MobBottomArea>
        </>
      }
      {fpLogin && (
        <MobBottomArea active={active} className="v-fp" zid={101}>
          <div className="content-wrap">
            <div className="login-wrap">
              <MobLogin mode="popup" errorPw={false} noMemArea={false} url="/mypage/dealer/sellcar/carManagement" callback={handleFpLoginClose} />
            </div>
          </div>
        </MobBottomArea>
      )}
      {/* <MobFullpagePopup active={mFullpageCPopup} paddingBottom={56} onClose={handleFullPageClose} cPop={true}>
        {fpFilter01 && (
          <MobFilterModel
            selectedDepth={5}
            isMultiSelect={false}
          />
        )}
      </MobFullpagePopup> */}
    </>
  );
};

const stt = {
  frtPnst: 'frame',
  crossMem: 'frame',
  insdPnstLeft: 'frame',
  insdPnstRight: 'frame',
  rearPnst: 'frame',
  trunkFloor: 'frame',
  frtSideMemLeft: 'frame',
  frtSideMemRight: 'frame',
  rearSideMemLeft: 'frame',
  rearSideMemRight: 'frame',
  frtWhlHouseLeft: 'frame',
  frtWhlHouseRight: 'frame',
  rearWhlHouseLeft: 'frame',
  rearWhlHouseRight: 'frame',
  pilrPnstFrtLeft: 'frame',
  pilrPnstFrtRight: 'frame',
  pilrPnstMedmLeft: 'frame',
  pilrPnstMedmRight: 'frame',
  pilrPnstRearLeft: 'frame',
  pilrPnstRearRight: 'frame',
  pckgTray: 'frame',
  frtDashPnst: 'frame',
  floorPnst: 'frame',

  hood: 'skinRank1',
  frontFenderLeft: 'skinRank1',
  frontFenderRight: 'skinRank1',
  frontDoorLeft: 'skinRank1',
  frontDoorRight: 'skinRank1',
  rearDoorLeft: 'skinRank1',
  rearDoorRight: 'skinRank1',
  trunklid: 'skinRank1',
  rdarSpt: 'skinRank1',

  roofPnst: 'skinRank2',
  qrtrPnstLeft: 'skinRank2',
  qrtrPnstRight: 'skinRank2',
  sideSealPnstLeft: 'skinRank2',
  sideSealPnstRight: 'skinRank2'
};

MobCarModify.getInitialProps = async (http) => {
  const { reduxStore } = http;
  const helper = new RenderHelper(http);
  const { query } = helper;

  await reduxStore.dispatch(getShootingPartList('dealer')); // 사진 목록 리스트

  return { query };
};

MobCarModify.propTypes = {
  //query: PropTypes.object
  callback: PropTypes.func,
  prodItemFun: PropTypes.func,
  memberInfo: PropTypes.object,
  changingEvent: PropTypes.func,
  firstStep: PropTypes.object,
  reloadEvent: PropTypes.func
};

export default withRouter(MobCarModify);