const globalThis = require('globalthis')();
import React, { useEffect, useState, useRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarPictureApplyPc from '@src/components/common/CarPictureApplyPc';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

// import { mainPhotoList, subPhotoList } from '@src/dummy/sellcar/carPhotoOptions';
import RenderHelper from '@lib/share/render/helper';
import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'
import * as memberApi from '@src/api/common/memberApi';
import MobSellRegister from '@src/components/common/MobSellRegister';
import CarPictureApply from '@src/components/common/CarPictureApply';
import { getShootingPartList } from '@src/actions/sellcar/sellCarAction';


const nextPage = `/mypage/dealer/sellcar/registerCarProdSelection`;
const prevPage = `/mypage/dealer/sellcar/registerCarIntroducing`;

const registerCarPhoto = ({ query, prodItem = { cmnt: {}, car: { optionList: [] } }, photoList = [] }) => {
  console.log("registerCarIntroducing -> prodItem", prodItem)
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { mainPhotoList, subPhotoList } = useSelector((store) => store.sellCarStore);
  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  
  console.log("registerCarPhoto -> mainPhotoList", mainPhotoList)
  console.log("registerCarPhoto -> subPhotoList", subPhotoList)

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
  const formRef = useRef(null)
  const { dlrPrdId } = query;
  const { crId } = prodItem
  console.log("registerCarPhoto -> prodItem", prodItem)
  const { showAlert, showConfirm, showLoader, showLoginForm, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    []
  );

  // useEffect(() => {
  //   showLoader()
  //   dealerProdApi.selectSaleCarPic(crId)
  //     .then(res => res?.data)
  //     .then(res => {
  //       const { data, statusinfo } = res;
  //       console.log("registerCarPhoto -> data", data);
  //       if (statusinfo?.returncd === '000') {
  //         setCarPhotoList(data)
  //       }
  //     })
  //     .finally(() => {
  //       hideLoader()
  //     })
  // }, [])

  // for mobile...
  const goPrevStep = async (e) => {
    e.preventDefault();

    showConfirm('이전 단계로 이동합니다. 현재 내용을 임시저장 하시겠습니까?', async () => {
      showLoader()
      const formData = new FormData()
      const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]')).filter(input => !!input.files[0])
  
      formData.append('crId', crId)
      formData.append('picType', 'carPic')
  
      fileInputs
        .forEach((input, i) => {
          console.log('i : ', i)
          const file = input.files[0]
  
          formData.append('files', file, input.dataset.sortNo)
        })
      const orgFiles = formData.get('files')
      const imgValid = [
        ...photoList.map(photo => photo.sortNo),
        ...fileInputs.map(input => parseInt(input.dataset.sortNo))
      ]
      console.log("goNextStep -> imgValid", imgValid)
  
      if (orgFiles) {
        await dealerProdApi.insertSaleCarPic(formData).then(res => res?.data)
      }
      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    }, async () => {
      showLoader()
      await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }))
      hideLoader()
    });
  }

  const goNextStep = (e) => {
    debugger
    if (e) e.preventDefault();
    const formData = new FormData()
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]')).filter(input => !!input.files[0])

    formData.append('crId', crId)
    formData.append('picType', 'carPic')

    fileInputs
      .forEach((input, i) => {
        console.log('i : ', i)
        const file = input.files[0]

        formData.append('files', file, input.dataset.sortNo)
      })


    const orgFiles = formData.get('files')
    console.log("orgFiles : ", orgFiles)
    console.log("photoList : ", photoList)

    const imgValid = [
      ...photoList.map(photo => photo.sortNo),
      ...fileInputs.map(input => parseInt(input.dataset.sortNo))
    ]
    console.log("goNextStep -> imgValid", imgValid)

    if ([1, 2, 3, 4, 5].some((num) => !imgValid.includes(num))) {
      showAlert('대표사진 5개는 필수 이미지입니다')
      return
    }


    if (orgFiles) {
      showConfirm('저장 후, 다음단계로 이동하시겠습니까?', async () => {
        showLoader()
        const { data, statusinfo } = await dealerProdApi.insertSaleCarPic(formData).then(res => res?.data)
        console.log("goNextStep -> data", data)
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
          showAlert('차량사진 수정 실패했습니다')
        }
      })
    } else {
      showConfirm('업로드 한 이미지가 없습니다. 계속 진행하시겠습니까?', async () => {
        showLoader()
        await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId }))
        hideLoader()
      })
    }
  };

  console.log('main photo list >>>>>>>>>>>>>>>>>>', mainPhotoList);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={5} />
          <form className="register-form" ref={formRef}>
            <fieldset>
              <legend className="away">차량 사진 등록</legend>
              {/* <CarPictureApply photoList={photoList} mainSlotOptions={mainPhotoList} subSlotOptions={subPhotoList} mode="dealer" isButton={false} /> */}
              <MobSellRegister
                photoList={photoList}
                mode={'sellcar'}
                onPrev={() => {}}
                //callback={sendPictureData}
                //onChangePhoto={updatePicture}
                mainSlotOptions={mainPhotoList}
                subSlotOptions={subPhotoList}
                carObj={prodItem.car}
                userType={1}
                //trigger={photoStepDoneFlag} // 외부에서 저장처리할 때 호출
                shottingComplete={() => {}} // 콤포넌트 안에서 처리
                reloadProcess={'self'}
              />
            </fieldset>
          </form>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="이전" onClick={goPrevStep} />
          {/* goNextStep */}
          <Button size="big" background="blue80" title="다음" onClick={goNextStep} />
        </Buttons>
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
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={4} />
          </div>

          <form ref={formRef}>
            <div className="mt64">
              <div className="img-upload-wrap">
                <div className="img-upload main mt0">
                  <h4 className="mb33">대표 사진</h4>
                  <div className="app-down">
                    <i className="ico-app-blue"></i>
                    <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => showAppDownPop(e, 'fade')} />
                  </div>
                  <CarPictureApplyPc options={mainPhotoList} items={photoList} />
                  <p className="sub">* 첫번째 사진은 판매차량 상세페이지의 첫 이미지로 보여집니다.</p>
                </div>
              </div>
              <div className="img-upload detail">
                <h4 className="mb33">상세 사진</h4>
                <p>(최대 15개)</p>
                <CarPictureApplyPc options={subPhotoList} items={photoList} />
              </div>
            </div>
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
                onClick={goPrevStep}
              />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={127} height={60} buttonMarkup={true} onClick={goNextStep} />
            </span>
          </Buttons>
        </div>
      </div>
      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup>
    </AppLayout>
  );
};

registerCarPhoto.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, reduxStore } = helper;
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

  const [ saleResult ] = await Promise.all([
    dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => res?.data),
    reduxStore.dispatch(getShootingPartList('dealer')),
  ])
  const { data, statusinfo } = saleResult

  console.log("registerCarPhoto.getInitialProps -> data", data)

  if (!data) {
    helper.error({ code: 204, message: '상품이 없습니다' })
  }

  const { crId } = data

  const { data:photoList = [], statusinfo:picStatusinfo} = await dealerProdApi.selectSaleCarPic(crId).then(res => res?.data)
  console.log("registerCarPhoto.getInitialProps -> photoList", photoList)
  console.log("registerCarPhoto.getInitialProps -> picStatusinfo", picStatusinfo)

  return {
    query,
    prodItem: data,
    memberInfo: helper.memberInfo,
    photoList,
  };
};

export default registerCarPhoto;
