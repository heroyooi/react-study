const globalThis = require('globalthis')();
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import Cookies from 'js-cookie';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import RenderHelper from '@lib/share/render/helper';
import carSchema from '@lib/share/validator/sellcar/Car';
import { createValidator } from '@lib/share/validator';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor';
import MobCarOptionsEditor from '@src/components/sellcar/self/MobCarOptionsEditor';

import CarSeriesSelection from '@src/components/car/CarSeriesSelection';

import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import { SystemContext } from '@src/provider/SystemProvider';
import * as carInfoApi from '@src/api/common/CarInfoApi';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';

const nextPage = `/mypage/dealer/sellcar/registerCarInfo`;
const crNoValidator = createValidator({ crNo: carSchema.crNo });

const registerCarSearch = ({ query, memberInfo = {}, allowedData = {} }) => {
  console.log("registerCarSearch -> query", query)
  console.log('memberInfo :::::::::::::: ', memberInfo)
  console.log('allowedData :::::::::::::: ', allowedData)
  const { auctSbidCrYn, sbidDt, sbidAmt } = query
  const { mbStrZcd, mbStrAddr, mbStrDtlAddr, mbStrPn, mbStrFaxno, mbStrSlHmCntn } = memberInfo

  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [ displaySeriesPop, setDisplaySeriesPop, showSeriesPop, hideSeriesPop] = useRodal(false);
  const [ carSeriesList, setCarSeriesList] = useState()
  const [ selectedSeries, setSelectedSeries] = useState()

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

  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);

  const [car, setCar] = useState({});
  const [crNo, setCrNo] = useState(query?.crNo ?? '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [crActive, setCrActive] = useState('');

  console.log('registerCarSearch -> Router', Router);
  useEffect(() => {
    const { code, message } = allowedData
    if (code) {
      showAlert(message, () => {
        Router.push('/main')
      })
    }

    if (query?.crNo) {
      searchCar();
    }

    return () => {
      initAlert();
      initConfirm();
    };
  }, []);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchCar();
    }
  };

  const inputCrNo = (e) => {
    const crNo = e.target.value;
    const valid = crNoValidator.validate({ crNo });
    console.log("inputCrNo -> valid", valid)

    if (valid.error) {
      const { details } = valid.error;
      // details 속성에 따라 메세지를 다르게 셋팅 가능
      setErrorMsg('올바른 차량 번호를 입력해주세요(예 12가1234)');
      setCrActive(false);
    } else {
      setErrorMsg('');
      setCrActive(true);
    }
    setCrNo(crNo);
  };

  const searchCar = async (e) => {
    e && e.preventDefault();
    const { code, message } = allowedData;
    if (code) {
      showAlert(message, () => {
        Router.push('/main')
      })
    }

    const valid = crNoValidator.validate({ crNo });
    if (valid.error) {
      const msg = `올바른 차량 번호를 입력해주세요(예 12가1234)`;
      setErrorMsg(msg);
      // showAlert(msg);
    } else if (!mbStrZcd || !mbStrAddr || !mbStrDtlAddr || !mbStrPn || !mbStrFaxno || !mbStrSlHmCntn) {
      showConfirm('판매점 정보가 등록되어야 차량등록이 가능합니다.<br/>판매점 정보를등록하시겠습까?', () => {
        Router.push('/mypage/dealer/info/changeMember?'+ qs.stringify({backUrl:'/mypage/dealer/sellcar/registerCarSearch'}))
      })
    } else {
      showLoader();
      // const result = await dealerProdApi.selectCarInfoByCrNo(crNo)
      const { tsKey, seriesno } = selectedSeries ?? {}
      let params = {
        crNo,
        tsKey, //시리즈목록이 있을 경우 시리즈 선택
        seriesno, //시리즈목록이 있을 경우 시리즈 선택
      }

      const result = await carInfoApi.selectCarMart(params).then((res) => res?.data);
      hideLoader();
      setSelectedSeries(null)
      const { data, statusinfo } = result;

      if (statusinfo?.returncd === '000') {
        const { seriesList = null, crMnfcCd, crMdlCd, crDtlMdlCd } = data;

        setCarSeriesList(seriesList)

        if(seriesList){
          showSeriesPop(true)
        } else if(crMnfcCd && crMdlCd && crDtlMdlCd){
          setCar(data);
          setIsSearched(true);
        } else {
          showConfirm('해당 차량번호로 조회된 차량정보가 없습니다.<b/>차량정보를 직접 등록하시겠습니까?', () => {
            setCar(data);
            setIsSearched(true);
          })
        }
      } else if (statusinfo?.returncd === '009') {
        showAlert('이미 판매등록 중인 차량입니다.<br/>다른 차량을 조회해 주세요.');
      } else if (statusinfo?.returncd === 'MBR4005') {
        showLoginForm(Router.router.asPath, searchCar);
      } else {
        showAlert(statusinfo?.returncd);
      }
    }
  };

  const onResetCarInfo = (e) => {
    setCrNo('');
    setIsSearched(false);
    setCar({});
    globalThis?.window && window.scrollTo(0, 0);
  };

  const onSubmit = async (e) => {
    showLoader();
    const { crMnfcCdNm, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm } = car;
    console.log("onSubmit -> car", car)
    car.crNm = [crMnfcCdNm, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm].filter(name => !!name).join(' ')

    const { data, statusinfo } = await dealerProdApi.insertDealerProd({ car, auctSbidCrYn, sbidDt, sbidAmt, }).then((res) => res?.data);

    if (statusinfo?.returncd === '000') {
      const { dlrPrdId } = data;
      if(auctSbidCrYn === 'Y'){
        await Router.push('/mypage/dealer/sellcar/carManagement?management=prodCar&sub=0&sttDvcd=0050&watingSortType=01')
      } else {
        await Router.push(nextPage + '?' + qs.stringify({ dlrPrdId }))
      }
    } else if (statusinfo?.returncd === '001') {
      showAlert('실패하였습니다.');
    } else if (statusinfo?.returncd === 'MBR4005') {
      showLoginForm(Router.router.asPath, (data) => {
        console.log('loginCallback data ::::: ', data);
        if (data?.isLogin) {
          onSubmit();
        } else {
          showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
        }
      });
    } else {
      showAlert(statusinfo?.returnmsg);
    }
    hideLoader();
  };

  if (hasMobile) {
    return (
      <AppLayout>
        {isSearched ? (
          <div className className="dealer-register-form">
            <form className="register-form">
              <fieldset className="pd20">
                <legend className="away">차량 정보 조회</legend>
                <CarBasicInfoEditor item={car} isEditing={false} />
                <CarOptionsEditor items={car?.optionList} isEditing={false} addOptions={true} className="mt32" />
              </fieldset>
            </form>
            <p className="ask-tx">
              해당 정보는 실제 정보와 상이할 수 있습니다.
              <br />
              다음 단계에서 차량정보를 수정하세요.
              <br />
              해당 차량을 판매 차량으로 신청하시겠습니까?
            </p>
            <Button className="fixed" size="full" background="blue80" title="신청하기" buttonMarkup={true} onClick={onSubmit} />
          </div>
        ) : (
            <>
              <div className="car-inquire-sec">
                <p>차량조회 후 신청하실 수 있습니다.</p>
                <div className="car-inquire-wrap">
                  <label htmlFor="car-num">차량번호</label>
                  <Input type="text" id="car-num" placeHolder="차량번호를 입력해주세요. (예: 12가1234)" height={48} onChange={inputCrNo} value={crNo} onKeyPress={onKeyPress} />
                  {errorMsg != '' && <p className="tx-sub tx-red80">{errorMsg}</p>}
                </div>
              </div>
              <Button className="fixed" size="full" background={crActive ? 'blue80' : 'gray60'} title="차량 조회하기" buttonMarkup={true} onClick={searchCar} />
            </>
          )}
        <RodalPopup
          show={displaySeriesPop}
          type={'fade'}
          closedHandler={hideSeriesPop}
          title="상세모델을 선택하세요"
          mode="normal"
          width={750}
          size="small"
        > 
          <CarSeriesSelection
            items={carSeriesList}
            onSelect={setSelectedSeries}
            selectedSeries={selectedSeries}
            onClose={hideSeriesPop}
            onSubmit={() => {
              hideSeriesPop(false)
              searchCar()
            }}
          />
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>
              {
                auctSbidCrYn == 'Y' ?
                '차량대기등록' : '차량등록'
              }
            </h3>
          </div>
          {isSearched ? (
            <div>
              <form className="register-form">
                <fieldset>
                  <legend className="away">차량 정보 조회</legend>
                  <CarBasicInfoEditor item={car} isEditing={false} />

                  {/* 뷰어 모드 */}
                  <CarOptionsEditor items={car?.optionList} isEditing={false} addOptions={true} className="mt80 pt0" />

                  {/* 체크 모드 */}
                  {/* <CarOptionsEditor items={car?.optionList} isEditing={true} addOptions={true} className="mt80 pt0" /> */}
                </fieldset>
              </form>
              {
                auctSbidCrYn === 'Y' ?
                    <p className="guide-ment">
                      해당 정보는 실제 정보와 상이할 수 있습니다.
                      <br />
                      낙찰차량을 등록대기 상태로 신청하시면 광고를 등록하실 수 있습니다.
                      <br />
                      해당 차량을 등록대기 상태로 신청하시겠습니까?
                    </p>
                  :
                    <p className="guide-ment">
                      해당 정보는 실제 정보와 상이할 수 있습니다.
                      <br />
                      다음 단계에서 차량정보를 수정하세요.
                      <br />
                      해당 차량을 판매 차량으로 신청하시겠습니까?
                    </p>
              }
              <Buttons align="center" marginTop={48}>
                {
                  auctSbidCrYn === 'Y' ?
                      <Button size="big" background="gray" title="아니오" width={230} height={60} onClick={() => Router.back()} buttonMarkup={true} />
                    :
                      <Button size="big" background="gray" title="아니오, 새로 조회합니다." width={230} height={60} onClick={onResetCarInfo} buttonMarkup={true} />
                }
                <Button size="big" background="blue80" title="예, 신청합니다." width={230} height={60} buttonMarkup={true} onClick={onSubmit} />
              </Buttons>
            </div>
          ) : (
              <div className="car-inquire-sec">
                <p>차량조회 후 신청하실 수 있습니다.</p>
                <div className="car-inquire-wrap">
                  <label htmlFor="car-num">차량번호</label>
                  <Input type="text" id="car-num" placeHolder="차량번호를 입력해주세요. (예: 12가1234)" onChange={inputCrNo} width={323} height={51} value={crNo} onKeyPress={onKeyPress} />
                  {errorMsg != '' && <p className="tx-exp-tp3">{errorMsg}</p>}
                  <Buttons align="center" marginTop={48}>
                    <Button size="big" background="blue80" title="차량 조회하기" width={244} height={60} buttonMarkup={true} onClick={searchCar} />
                  </Buttons>
                </div>
              </div>
            )}
        </div>
      </div>
      <RodalPopup
        show={displaySeriesPop}
        type={'fade'}
        closedHandler={hideSeriesPop}
        title="상세모델을 선택하세요"
        mode="normal"
        width={750}
        size="small"
      > 
        <CarSeriesSelection
          items={carSeriesList}
          onSelect={setSelectedSeries}
          selectedSeries={selectedSeries}
          onClose={hideSeriesPop}
          onSubmit={() => {
            hideSeriesPop(false)
            searchCar()
          }}
        />
      </RodalPopup>
    </AppLayout>
  );
};

registerCarSearch.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper

  await helper
    .accessControl()
    .memberAccessControlAsync()
    .then(() => {
      helper.error()
    })

  const { memberInfo, code, message } = helper

  return {
    query,
    memberInfo,
    allowedData: {
      code,
      message,
    },
  };
};

export default registerCarSearch;
