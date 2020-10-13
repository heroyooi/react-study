import React from 'react';
import PropTypes from 'prop-types';
import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';

const PerfomanceInsert = ({ modifyData }) => {
  return (
    <>
      <form className="register-form" id="form">
        <h3>차량등록</h3>
        <div className="mb80 dealer-register-step">
          <Steps type={2} contents={['차량정보조회/입력', '가격 및 차량소개', '성능점검', '차량사진 등록', '결제', '등록완료']} active={3} />
        </div>

        <div className="performance-chk">
          <ul className="pt-number">
            <li>제시번호</li>
            <li>
              <Input type="text" id="Propose01" width={262} />
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
                <Input type="text" id="record01" width={60} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record02" width={60} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record03" width={150} height={40} />
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

        <CarInfo />
        <CarStatus />
        <CarHistory />
        <CarDetails />
        <CarPicture />
        <CarSignature />
      </form>
    </>
  );
};

PerfomanceInsert.propTypes = {
  modifyData: PropTypes.object
};

export default PerfomanceInsert;
