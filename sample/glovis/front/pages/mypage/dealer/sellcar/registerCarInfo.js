const globalThis = require('globalthis')();
import { useState, useEffect, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import { produce } from 'immer';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
// import * as http from '@src/utils/HttpUtils'

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor';
import MobCarBasicInfoEditor from '@src/components/sellcar/self/MobCarBasicInfoEditor';

import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';

import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';

import { createValidator } from '@lib/share/validator';
import carSchema from '@lib/share/validator/sellcar/Car';
import RenderHelper from '@lib/share/render/helper';

import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'
import { selectMbInfo } from '@src/api/common/memberApi';
const prevPage = '/mypage/dealer/sellcar/registerCarSearch';
const nextPage = '/mypage/dealer/sellcar/registerCarPerformance';

const validator = createValidator(carSchema, {
  required: [
    'crRlsPrc', 'dspl', 'drvDist', 'crNo', 'crUseDvcd', 'crClrCd', 'fuelDvcd',
    'crTypeCd', 'crMnfcCd', 'crMdlCd', 'crDtlMdlCd', 'frstRegDt', 'mssDvcd', 
  ]
});

const registerCarInfo = ({ query, statusinfo, prodItem = {} }) => {
  console.log("registerCarInfo -> prodItem", prodItem)

  const dispatch = useDispatch();
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
          bottom: 80,
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

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const { dlrPrdId } = query;
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);
  const [prod, setProd] = useState({
    ...prodItem,
    car: prodItem?.car ?? {}
  });

  useEffect(() => {
    return () => {
      initAlert();
      initConfirm();
    }
  }, []);

  const inputCarProp = (e) => {
    console.log('inputCarProp >>>>>>>>>>>>>>>>>>>>>>>', e.target);
    const { name, value } = e.target;
    console.log("inputCarProp -> name", name)
    console.log("inputCarProp -> value", value)

    setProd(produce(prod, draft => {
      draft['car'][name] = value
    }))
  };

  const selectCar = (items, price) => {
    console.log('items : ', items)
    console.log('price : ', price)

    setProd(produce(prod, draft => {
      let crNm = ''
      items.forEach((item) => {
        console.log("selectCar -> item", item)
        const { column, code, text } = item
        draft['car'][column] = code
        draft['car'][`${column}Nm`] = text
        if(item?.column !== 'crMdlCd' && text){
          crNm+=`${text} `
        }
      })
      console.log("selectCar -> crNm", crNm)
      draft['car']['crNm'] = crNm
    }))
  };

  const checkOption = (e, item) => {
    const { car: { optionList } } = prod
    const isExist = optionList.find(option => option.optCd == item.optCd)
    console.log('checkOption clicked >>>>>>>>>>>>>>>>>> item', item);
    console.log('checkOption clicked >>>>>>>>>>>>>>>>>> isExist', isExist);

    if (isExist) {
      setProd(produce(prod, draft => {
        draft['car']['optionList'] = optionList.filter(option => option.optCd != item.optCd)
      }))
    } else {
      setProd(produce(prod, draft => {
        draft['car']['optionList'].push(item)
      }))
    }
  };

  const validateData = (e) => {
    e && e.preventDefault();
    console.log('prod?.car : ', prod?.car);
    const valid = validator.validate({
      ...prod?.car,
    });
    const { error } = valid;
    console.log('valid : ', valid);

    if (error) {
      showAlert(`[${error?.[0]?.label}] ` + error?.[0]?.messages?.[0] || '에러가 발생했습니다', () => window.scrollTo(0, 350));
      return;
    }

    // if (!hasMobile) {
    showConfirm('저장 후, 다음단계로 이동하시겠습니까?', async (e) => {
      showLoader()
      const { data, statusinfo } = await dealerProdApi.updateNewProdCarInfo(prod).then(res => res?.data)
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
            validateData()
          } else {
            showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
          }
        })
      } else {
        hideLoader()
        showAlert(statusinfo?.returnmsg)
      }
    });
  };

  const [fpFilter01, setFpFilter01] = useState(false);
  const [fpFilter01Result, setFpFilter01Result] = useState('yes');
  const [fpFilter01Kind, setFpFilter01Kind] = useState(null);
  const [fpFilter01Research, setFpFilter01Research] = useState('no');

  const handleFullpagePopup = useCallback(
    (name, query) => (e) => {
      e.preventDefault();
      if (name === 'f1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['close']
          }
        });
        query.split('&').map((v) => {
          const val = v.split('=');
          if (val[0] === 'result') {
            setFpFilter01Result(val[1]);
            if (val[1] === 'no') setFpFilter01Kind(null);
          } else if (val[0] === 'kind') {
            setFpFilter01Kind(val[1]);
          } else if (val[0] === 'research') {
            setFpFilter01Research(val[1]);
          }
        });
        setFpFilter01(true);
      }
    },
    [dispatch]
  );

  const handleFullPageClose = useCallback(() => {
    setFpFilter01(false);
  }, []);

  const handleCarModelSelect = useCallback((e, deps) => {
    console.log(deps)
    setFpFilter01(false);
    dispatch({
      type: MOBILE_FULLPAGE_POPUP_CLOSE
    });
  }, []);

  console.log('prod.car', prod.car);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={1} />
          <form className="register-form">
            <p className="car-name" onClick={handleFullpagePopup('f1', 'result=yes&kind=manufacturer')}>
              {prod?.car?.crNo}<span>{prod?.car?.crNm}</span>
            </p>
            <fieldset className="pdside20">
              <legend className="away">차량 정보 조회</legend>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>차량 기본정보</MenuTitle>
                  <MenuCont>
                    <MobCarBasicInfoEditor item={prod?.car} isEditing={true} onChange={inputCarProp} />
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>차량 옵션정보</MenuTitle>
                  <MenuCont>
                    <CarOptionsEditor items={prod?.car?.optionList} isEditing={true} onCheck={checkOption} addOptions={true} className="mt32" />
                  </MenuCont>
                </MenuItem>
              </ul>
            </fieldset>
          </form>
        </div>
        <Button className="fixed" size="full" background="blue80" title="다음" buttonMarkup={true} onClick={validateData} />

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpFilter01 && (
            <MobFilterModel
              selectedDepth={3}
              isMultiSelect={false}
              result={fpFilter01Result}
              kind={fpFilter01Kind}
              research={fpFilter01Research}
              onCarModelSelect={handleCarModelSelect}
            />
          )}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={1} />
          </div>
          <form className="register-form">
            <fieldset>
              <legend className="away">차량 정보 조회</legend>
              <CarBasicInfoEditor item={prod?.car} isEditing={true} onInput={inputCarProp} onSelectCar={selectCar} className="mt80" showDrvDist={true} />
              <CarOptionsEditor items={prod?.car?.optionList} isEditing={true} onCheck={checkOption} addOptions={true} className="mt80 pt0" />
              <CarAddOptionsEditor items={prod?.car?.optionList} item={prod?.car} isEditing={true} onCheck={checkOption} onInput={inputCarProp} />
            </fieldset>
          </form>
          <Buttons align="right" marginTop={48}>
            <Button size="big" background="blue80" title="다음" width={127} height={60} buttonMarkup={true} onClick={validateData} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

registerCarInfo.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, isServer, url, accessToken } = helper;
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
  console.log("registerCarInfo.getInitialProps -> data", data)

  if (!data) {
    helper.error({ code: 204, message: '상품이 없습니다' })
  }

  return {
    query,
    prodItem: data,
    memberInfo: helper.memberInfo
  };
};

export default registerCarInfo;
