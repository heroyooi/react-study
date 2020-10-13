/**
 * 설명 : 성능점검 입력/수정 컴포넌트
 * @fileoverview 내차팔기>성능정검 수정
 * @requires [CarInfo,CarStatus,CarHistory,CarDetails,CarPicture,CarSignature]
 * @author 김지훈
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import { select1_list } from '@src/dummy';
/**
 * 설명 : 성능점검정보 입력/수정한다
 * @param {modifyData} 차량정보, 수정정보
 * @param {onChange} 값이 변경될시 부모로 넘겨주는 handler
 * @returns {PerfomanceInsert} 성능점검 입력/수정 컴포넌트
 */
const PerfomanceInsert = ({ modifyData, onChange }) => {
  const [perferenceData, SetPerferenceData] = useState(modifyData ? modifyData.perferenceData : {});
  const [infoData, setInfoData] = useState(modifyData ? modifyData.infoData : {});
  const [statusData, setStatusData] = useState(modifyData ? modifyData.statusData : {});
  const [historyData, setHistoryData] = useState(modifyData ? modifyData.historyData : {});
  const [detailData, setDetailData] = useState(modifyData ? modifyData.detailData : {});
  const [pictureData, setPictureData] = useState(modifyData ? modifyData.pictureData : {});
  const [signData, setSignData] = useState(modifyData ? modifyData.signData : {});

  useEffect(() => {
    console.log('useEffect');
    onChange(perferenceData, infoData, statusData, historyData, detailData, pictureData, signData);
  }, [perferenceData, infoData, statusData, historyData, detailData, pictureData, signData]);

  /*
  useEffect(() =>{
    console.log('start');
    if(modifyData) {
      const tempObj = _.cloneDeep(modifyData);
      setInfoData(tempObj.infoData);
      SetPerferenceData(tempObj.perferenceData);
      SetStatusData(tempObj.statusData);
      SetHistoryData(tempObj.historyData );
      SetDetailData( tempObj.detailData );
      SetPictureData(tempObj.pictureData );
      SetSignData(tempObj.signData);
    }
  },[modifyData]);
*/

  const InputChangeHandler = (e) => {
    SetPerferenceData(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const HandlerBlur = (e, target) => {
    switch (target) {
      case 'info':
        setInfoData(
          produce((draft) => {
            draft[e.target.name] = e.target.value;
          })
        );
        break;
      case 'status':
        SetStatusData(
          produce((draft) => {
            draft[e.target.name] = e.target.value;
          })
        );
        break;
    }
  };

  const HandlerChange = (e, target, name) => {
    const v = e;
    console.log(e + target + name);
    switch (target) {
      case 'status': {
        console.log('status');
        setStatusData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        break;
      }
      case 'info': {
        setInfoData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        console.log(infoData);
        break;
      }
      case 'history': {
        setHistoryData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        console.log(historyData);
        break;
      }
      case 'detail': {
        setDetailData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        console.log(detailData);
        break;
      }
      case 'picture': {
        setPictureData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        console.log(pictureData);
        break;
      }
      case 'sign': {
        setSignData(
          produce((draft) => {
            draft[name] = v;
          })
        );
        console.log(signData);
        break;
      }
    }
  };

  return (
    <>
      <form className="register-form" id="form">
        <div className="performance-chk">
          <ul className="pt-number">
            <li>제시번호 {infoData.carNum}</li>
            <li>
              <Input type="text" id="Propose01" width={262} onBlur={InputChangeHandler} name="perferNumber" value={perferenceData.perferNumber} />
            </li>
            <li className="em">예)202020</li>
            <li>매매회원이 중요정보(제시번호,성능점검기록부,조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에 관한 법률(20조 제1항 제1호)에 의해1억원이하의 과태료가부과될 수 있습니다.</li>
          </ul>
          <div className="management-law">
            <p>자동차관리법 시행규칙 개정(적용일 : 2018.07.01)에 따라 [자동차 성능과 상태, 가격정보]를 함께 제공하도록 개선되었습니다.</p>
          </div>
          <div className="record">
            <ul>
              <li>
                중고자동차 성능 <i className="ico-dot mid"></i> 상태 점검기록부
                <SelectBox id="select1" className="items-sbox" placeHolder="기존 입력 정보 수정" width={246} hieght={40} options={select1_list} />
              </li>
              <li className="number">
                <em className="mr8">제</em>
                <Input type="text" id="record01" width={60} height={40} onBlur={InputChangeHandler} name="perferSubNumber1" value={perferenceData.perferSubNumber1} />
                <em className="mg8">-</em>
                <Input type="text" id="record02" width={60} height={40} onBlur={InputChangeHandler} name="perferSubNumber2" value={perferenceData.perferSubNumber2} />
                <em className="mg8">-</em>
                <Input type="text" id="record03" width={150} height={40} onBlur={InputChangeHandler} name="perferSubNumber3" value={perferenceData.perferSubNumber3} />
                <em className="ml8">호</em>
              </li>
            </ul>
            <div className="align-wrap">
              <p>
                *해당 매물은 제휴성능 데이터가 없습니다.
                <br />
                제휴 성능장을 이용하시면 불러오기를 통해 간편하게 등록하실 수 있습니다.
              </p>
              <Button size="big" background="blue80" title="제휴 성능장 전체 보기" width={273} />
            </div>
          </div>
          <div className="price-survey">
            <CheckBox id="chk-price-survey" title="자동차가격조사 산정 · 선택 (자동차가격조사 산정은 매수인이 원하는 경우 제공하는 서비스입니다.)" />
          </div>
        </div>
        <CarInfo onBlur={HandlerBlur} onChange={HandlerChange} infoData={infoData} target="info" />
        <CarStatus onBlur={HandlerBlur} onChange={HandlerChange} statusData={statusData} target="status" />
        <CarHistory onBlur={HandlerBlur} onChange={HandlerChange} historyData={historyData} target="history" />
        <CarDetails onBlur={HandlerBlur} onChange={HandlerChange} detailData={detailData} target="detail" />
        <CarPicture onChange={HandlerChange} pictureData={pictureData} target="picture" />
        <CarSignature onChange={HandlerChange} signData={signData} target="sign" />
      </form>
    </>
  );
};

PerfomanceInsert.propTypes = {
  modifyData: PropTypes.object,
  onChange: PropTypes.func
};

export default PerfomanceInsert;
