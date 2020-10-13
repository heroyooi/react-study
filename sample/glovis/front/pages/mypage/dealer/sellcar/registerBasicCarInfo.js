import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import Textarea from '@lib/share/items/Textarea';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageSellPrice from '@src/components/sellcar/dealer/MypageSellPrice';
import MypageMortgage from '@src/components/sellcar/dealer/MypageMortgage';
import MypageAcidentRecord from '@src/components/sellcar/dealer/MypageAcidentRecord';
import MypageMovieUrl from '@src/components/sellcar/dealer/MypageMovieUrl';
import { INPUT_REGI_CAR } from '@src/actions/dealer/sellcar/registerCarInfoAction';

const registerBasicCarInfo = ({ props }) => {
  const [textareaDisabled1, setTextareaDisabled1] = useState(true);
  const [textareaDisabled2, setTextareaDisabled2] = useState(true);
  const [textareaDisabled3, setTextareaDisabled3] = useState(true);
  const [textareaDisabled4, setTextareaDisabled4] = useState(true);
  const [textareaDisabled5, setTextareaDisabled5] = useState(true);

  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [contract, setContract] = useState({});
  const [asccidents, setAsccidents] = useState(props.asccidents);
  const [carPricing, setCarPricing] = useState(props.carPricing);
  const [isShow, setIsShow] = useState(false);
  const [typeList, setTypeList] = useState([]);

  const dispatch = useDispatch();
  const { registerInfo } = useSelector((state) => state.regiCarInfo);

  //노출유형때문에 사용자 정보 받아오기.
  useEffect(() => {
    init();
    console.log(registerInfo);
  }, [init, registerInfo]);

  const init = () => {
    if (userInfo.corpType === '1') {
      setIsShow(true);
      const data = [
        { id: 'type1', value: 1, checked: true, disabled: false, title: '프렌차이즈' },
        { id: 'type2', value: 2, checked: false, disabled: false, title: '일반' }
      ];
      setTypeList(data);
    } else if (userInfo.corpType === '2' && userInfo.confirmType === '1') {
      setIsShow(true);
      const data = [
        { id: 'type1', value: 1, checked: true, disabled: false, title: '인증회원' },
        { id: 'type2', value: 2, checked: false, disabled: false, title: '일반' }
      ];
      setTypeList(data);
    } else {
      setIsShow(false);
    }
  };

  const inputProp = (e, target) => {
    console.log(e);
    const { value } = e.target;
    dispatch(
      INPUT_REGI_CAR({
        target: 'registerInfo',
        prop: target,
        value
      })
    );

    console.log(registerInfo);
  };

  const onChangeExpType = (e) => {
    const value = e.target.value;
    dispatch(
      INPUT_REGI_CAR({
        target: 'registerInfo',
        prop: 'userType',
        value
      })
    );
    console.log(registerInfo);
  };

  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1);
  }, [textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2);
  }, [textareaDisabled2]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3);
  }, [textareaDisabled3]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4);
  }, [textareaDisabled4]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5);
  }, [textareaDisabled5]);

  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  };
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  };
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  };

  return (
    <AppLayout>
      <div className="content-wrap register-wrap price-introduce">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="mb80 dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '가격 및 차량소개', '성능점검', '차량사진 등록', '결제', '등록완료']} active={2} />
          </div>

          <div className="register-number">
            <h4>연락처</h4>
            <SelectBox
              id="register-number"
              className="items-sbox"
              options={userInfo.contract}
              value={registerInfo.contract == 'undefined' ? '' : registerInfo.contract}
              onChange={(e) => inputProp({ target: { value: e.value } }, 'contract')}
              width={359}
              height={56}
            />
          </div>
          <div className="register-exposure" style={isShow ? { display: 'block' } : { display: 'none' }}>
            <h4>노출유형</h4>
            <RadioGroup dataList={typeList} defaultValue={registerInfo.userType == 'undefined' ? 1 : registerInfo.userType} onChange={onChangeExpType} mode="vertical" />
          </div>

          {/* 판매가격 */}
          <MypageSellPrice data={carPricing} userData={registerInfo} onInput={inputProp} />

          {/* 압류/저당 입력 */}
          <MypageMortgage userData={registerInfo} onInput={inputProp} />

          {/* 사고이력정보 */}
          <MypageAcidentRecord data={asccidents} onInput={inputProp} userData={registerInfo} />

          {/* 동영상 */}
          <MypageMovieUrl data={asccidents} userData={registerInfo} onInput={inputProp} />

          <div className="register-car-ex">
            <h4>차량 설명글 입력</h4>
            <div className="ex-option-wrap">
              <RadioGroup
                dataList={[
                  { id: 'car_ex1', value: 1, checked: true, disabled: false, title: '직접입력' },
                  { id: 'car_ex3', value: 3, checked: false, disabled: false, title: '나의 설명글 사용' }
                ]}
                mode="vertical"
              />
              <SelectBox
                id="mortgage3"
                className="items-sbox"
                placeHolder="선택하세요"
                options={[
                  { value: '소형차 설명글', label: '소형차 설명글' },
                  { value: '신차 설명글', label: '신차 설명글' }
                ]}
                width={190}
                height={40}
              />
            </div>
            <div className="btn-wrap">
              <Button size="sml" line="gray" color="gray" radius={true} title="내용초기화" width={99} height={24} />
            </div>
            <div className="key-point-wrap">
              <CheckBox id="chk-key-point" title="Key Point" onChange={handleTextarea1} />
              <div className="area">
                <Textarea type="tp1" disabled={textareaDisabled1} placeHolder="에디터 화면 노출 영역" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
            </div>
            <div className="scratch-photo-wrap">
              <CheckBox id="chk-scratch-photo" title="흠집사진" onChange={handleTextarea2} />
              <div className="area">
                <Textarea type="tp1" disabled={textareaDisabled2} placeHolder="에디터 화면 노출 영역" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
            </div>
            <div className="history-wrap">
              <CheckBox id="chk-history" title="이 차의 History" onChange={handleTextarea3} />
              <div className="area">
                <Textarea type="tp1" disabled={textareaDisabled3} placeHolder="에디터 화면 노출 영역" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
            </div>
            <div className="diagnosis-wrap">
              <CheckBox id="chk-diagnosis" title="진단소견" onChange={handleTextarea4} />
              <div className="area">
                <Textarea type="tp1" disabled={textareaDisabled4} placeHolder="에디터 화면 노출 영역" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
            </div>
            <div className="other-wrap">
              <CheckBox id="chk-other" title="기타" onChange={handleTextarea5} />
              <div className="area">
                <Textarea type="tp1" disabled={textareaDisabled5} placeHolder="에디터 화면 노출 영역" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
            </div>
          </div>

          <Buttons align="right">
            <Button size="big" background="blue80" title="설명글 저장하기" width={155} />
          </Buttons>

          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button
                size="big"
                background="gray"
                title="이전"
                width={150}
                height={60}
                buttonMarkup={true}
                onClick={(e) => {
                  Router.push('/mypage/dealer/sellcar/registerCarInfo').then(() => {
                    window.scrollTo(0, 0);
                  });
                }}
              />
            </span>
            <span className="step-btn-r">
              <Button
                size="big"
                background="blue80"
                title="다음"
                width={150}
                height={60}
                mode="normal"
                buttonMarkup={true}
                onClick={(e) => {
                  Router.push('/mypage/dealer/sellcar/carPerformanceInfo').then(() => {
                    window.scrollTo(0, 0);
                  });
                }}
              />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

registerBasicCarInfo.getInitialProps = async (http) => {
  const { reduxStore, req } = http;

  const res = await axios.get(`/mock/dealer/selcar/baiscCarInfo.json`);

  if (req) {
    console.log('server');
    const { query } = req;
    console.log('query : ', query);
  } else {
    console.log('prefetched');
    const { query } = http;
    console.log('query : ', query);
  }
  console.log(res.data);
  return { props: res.data };
};

export default registerBasicCarInfo;
