import { useState, useCallback, useEffect } from 'react';
import { produce } from 'immer';
import PerformanceInsert from '@src/components/car/PerferenceCheck';
import AppLayout from '@src/components/layouts/AppLayout';
import { select1_list, color } from '@src/dummy';
import Steps from '@lib/share/items/Steps';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import MypageNavi from '@src/components/common/MypageNavi';
import Router from 'next/router';
import axios from 'axios';
import moment from 'moment';

import { useSelector } from 'react-redux';


const carPerformanceInfo = () => {
  const { carInfo } = useSelector((state) => state.dealerSell);
  const [formData, SetFormData] = useState({});
  const [modifyData, setModifyData]  = useState(null);


  useEffect(()=>{
    const info = {};
    if(!modifyData) {

      info.carName = carInfo.selectedCarName;
      info.carNum = carInfo.carNum;
      info.carYear =  carInfo.released;

      const date = carInfo.regDate.split("-");
      const registered = date[0]+"년 " + date[1] +"월";

      info.regDate = registered;
      info.firstReg = Number(date[2])+'';
      info.gearType = carInfo.gearType;
      info.fuel = carInfo.fuelType;
      info.warranty = Number(carInfo.warranty);
      info.price = carInfo.carPrice;
      info.vin = carInfo.vin;

      const temp ={};
      temp.infoData = info;
      temp.perferenceData ={};
      temp.statusData ={};
      temp.historyData = {};
      temp.detailData= {};
      temp.pictureData = {};
      temp.signData = {};

      console.log(temp);
      setModifyData(temp);

    }


  },[carInfo]);



  const changeHandler = (perferenceData, infoData, statusData, historyData, detailData, pictureData, signData) => {
    console.log('changeHandler');
    SetFormData(
      produce((draft) => {
        draft.perferenceData = perferenceData;
        draft.infoData = infoData;
        draft.statusData = statusData;
        draft.historyData = historyData;
        draft.detailData = detailData;
        draft.pictureData = pictureData;
        draft.signData = signData;
      })
    );
  };

  const goNext = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if(modifyData) {
    return (
      <AppLayout>
        <div className="content-wrap register-wrap">
          <MypageNavi/>

          <div className="mypage-state-sec">
            <h3>차량등록</h3>
            <div className="mb80 dealer-register-step">
              <Steps type={2} contents={['차량정보조회/입력', '가격 및 차량소개', '성능점검', '차량사진 등록', '결제', '등록완료']} active={3}/>
            </div>
            <PerformanceInsert modifyData={modifyData} onChange={changeHandler}/>
            <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big"
                      background="gray"
                      title="이전"
                      width={150}
                      height={60}
                      buttonMarkup={true}
                      onClick={(e) => {
                        Router.push('/mypage/dealer/sellcar/registerBasicCarInfo').then(() => {
                          window.scrollTo(0, 0)
                        })
                      }}
              />
            </span>
              <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음"
                      width={150} height={60} buttonMarkup={true}
                      onClick={goNext}/>
            </span>
            </Buttons>
          </div>
        </div>
      </AppLayout>
    );
  }else{
    return (
      <AppLayout></AppLayout>
    )
  }
};




export default carPerformanceInfo;
