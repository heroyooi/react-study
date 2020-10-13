import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import qs from 'qs';
import { produce } from 'immer';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import { axiosPost } from '@src/utils/HttpUtils';
import { getMyComment, getMyCommentSelList } from '@src/actions/mypage/dealer/carDescriptionAction';

import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

/**
 * 설명 : 나의 설명글을 등록/수정하고 나의 설명글 페이지를 호출한다.
 * @param {state.carComment.myCommentList} 나의 설명글 목록
 * @returns {registerCarDescription} 나의 설명글 등록/수정
 */
const RegisterCarDescription = memo(({ query }) => {
  const { pageNo = 1 } = query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, [dispatch]);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '설명글 등록',
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
  }, [dispatch]);

  const { myComment, myCommentSelList } = useSelector((state) => state.carComment);
  const [formData, setFormData] = useState(
    !isEmpty(myComment)
      ? myComment
      : {
        ttlCntn: '제목없음',
        kpntCntn: '',
        scrcCntn: '',
        hstCntn: '',
        opnCntn: '',
        etcCntn: '',
        kpntYn: 'N',
        scrcYn: 'N',
        hstYn: 'N',
        opnYn: 'N',
        etcYn: 'N'
      }
  );
  const [radioVal, setRadioVal] = useState(1);
  const [activeSelect, setActiveSelect] = useState(false);
  const [selectCode, setSelectCode] = useState('');

  const pageData = {
    pageNo: 1,
    recordSize: 15
  };

  const radioList = [
    { id: 'car_ex1', value: 1, checked: true, disabled: false, title: '직접입력' },
    { id: 'car_ex3', value: 3, checked: false, disabled: false, title: '나의 설명글 사용' }
  ];

  const [textareaDisabled1, setTextareaDisabled1] = useState(true);
  const [textareaDisabled2, setTextareaDisabled2] = useState(true);
  const [textareaDisabled3, setTextareaDisabled3] = useState(true);
  const [textareaDisabled4, setTextareaDisabled4] = useState(true);
  const [textareaDisabled5, setTextareaDisabled5] = useState(true);

  const [inputTitle, setInputTitle] = useState('');
  const [textarea1, setTextarea1] = useState('');
  const [textarea2, setTextarea2] = useState('');
  const [textarea3, setTextarea3] = useState('');
  const [textarea4, setTextarea4] = useState('');
  const [textarea5, setTextarea5] = useState('');

  const [textarea1Checked, setTextarea1Checked] = useState(false);
  const [textarea2Checked, setTextarea2Checked] = useState(false);
  const [textarea3Checked, setTextarea3Checked] = useState(false);
  const [textarea4Checked, setTextarea4Checked] = useState(false);
  const [textarea5Checked, setTextarea5Checked] = useState(false);
  console.log('formData => ', formData);

  const onInput = (e) => {
    const { name, value } = e.target;
    console.log('name, value =>> ', name, value);
    if (name === 'kpntCntn') {
      setTextarea1(value);
    }
    if (name === 'scrcCntn') {
      setTextarea2(value);
    }
    if (name === 'hstCntn') {
      setTextarea3(value);
    }
    if (name === 'opnCntn') {
      setTextarea4(value);
    }
    if (name === 'etcCntn') {
      setTextarea5(value);
    }
    if (name === 'ttlCntn') {
      setInputTitle(value);
      if (value === '') {
        setFormData(
          produce((draft) => {
            draft[name] = '제목없음';
          })
        );
      } else {
        setFormData(
          produce((draft) => {
            draft[name] = value;
          })
        );
      }
    } else {
      setFormData(
        produce((draft) => {
          draft[name] = value;
        })
      );
    }
  };

  // 라디오버튼
  const onChangeRadio = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value === '3') {
      setActiveSelect(true);
    } else {
      setActiveSelect(false);
    }
    setFormData({});
    setInputTitle('');
    setTextarea1('');
    setTextarea2('');
    setTextarea3('');
    setTextarea4('');
    setTextarea5('');
    setTextareaDisabled1(true);
    setTextarea1Checked(false);
    setTextareaDisabled2(true);
    setTextarea2Checked(false);
    setTextareaDisabled3(true);
    setTextarea3Checked(false);
    setTextareaDisabled4(true);
    setTextarea4Checked(false);
    setTextareaDisabled5(true);
    setTextarea5Checked(false);
    setRadioVal(value);
  };

  const onSelectChange = (e) => {
    setFormData({});
    setInputTitle('');
    setTextarea1('');
    setTextarea2('');
    setTextarea3('');
    setTextarea4('');
    setTextarea5('');
    setTextareaDisabled1(true);
    setTextarea1Checked(false);
    setTextareaDisabled2(true);
    setTextarea2Checked(false);
    setTextareaDisabled3(true);
    setTextarea3Checked(false);
    setTextareaDisabled4(true);
    setTextarea4Checked(false);
    setTextareaDisabled5(true);
    setTextarea5Checked(false);
    setSelectCode(e.value);
    dispatch(getMyComment(e.value));
  };

  const handleTextarea1 = () => {
    setTextareaDisabled1(!textareaDisabled1);
    setTextarea1Checked(!textarea1Checked);
  };

  const handleTextarea2 = () => {
    setTextareaDisabled2(!textareaDisabled2);
    setTextarea2Checked(!textarea2Checked);
  };

  const handleTextarea3 = () => {
    setTextareaDisabled3(!textareaDisabled3);
    setTextarea3Checked(!textarea3Checked);
  };

  const handleTextarea4 = () => {
    setTextareaDisabled4(!textareaDisabled4);
    setTextarea4Checked(!textarea4Checked);
  };

  const handleTextarea5 = () => {
    setTextareaDisabled5(!textareaDisabled5);
    setTextarea5Checked(!textarea5Checked);
  };

  const sendEmail = () => {
    console.log('sendEmail formData => ', formData);
    const urlParam = `/api/autobell/mypage/dealer/insertMyCarComment.do`;
    axiosPost(urlParam, formData)
      .then(({ data }) => {
        if (data.statusinfo.returncd === '000') {
          Router.push('/mypage/dealer/sellcar/carDescription').then(() => {
            window.scrollTo(0, 0);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerReset = (e) => {
    e.preventDefault();
    setFormData({});
    setInputTitle('');
    setTextarea1('');
    setTextarea2('');
    setTextarea3('');
    setTextarea4('');
    setTextarea5('');
    setTextareaDisabled1(true);
    setTextarea1Checked(false);
    setTextareaDisabled2(true);
    setTextarea2Checked(false);
    setTextareaDisabled3(true);
    setTextarea3Checked(false);
    setTextareaDisabled4(true);
    setTextarea4Checked(false);
    setTextareaDisabled5(true);
    setTextarea5Checked(false);
  };

  useEffect(() => {
    dispatch(getMyCommentSelList(pageData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(myComment)) {
      setFormData(myComment);
      setInputTitle(myComment.ttlCntn);

      setTextarea1Checked(!isEmpty(myComment.kpntYn) ? (myComment.kpntYn === 'Y' ? true : false) : false);
      setTextarea2Checked(!isEmpty(myComment.hstYn) ? (myComment.hstYn === 'Y' ? true : false) : false);
      setTextarea3Checked(!isEmpty(myComment.scrcYn) ? (myComment.scrcYn === 'Y' ? true : false) : false);
      setTextarea4Checked(!isEmpty(myComment.opnYn) ? (myComment.opnYn === 'Y' ? true : false) : false);
      setTextarea5Checked(!isEmpty(myComment.etcYn) ? (myComment.etcYn === 'Y' ? true : false) : false);

      setTextareaDisabled1(!isEmpty(myComment.kpntYn) ? (myComment.kpntYn === 'Y' ? false : true) : true);
      setTextareaDisabled2(!isEmpty(myComment.hstYn) ? (myComment.hstYn === 'Y' ? false : true) : true);
      setTextareaDisabled3(!isEmpty(myComment.scrcYn) ? (myComment.scrcYn === 'Y' ? false : true) : true);
      setTextareaDisabled4(!isEmpty(myComment.opnYn) ? (myComment.opnYn === 'Y' ? false : true) : true);
      setTextareaDisabled5(!isEmpty(myComment.etcYn) ? (myComment.etcYn === 'Y' ? false : true) : true);

      setTextarea1(myComment.kpntCntn);
      setTextarea2(myComment.hstCntn);
      setTextarea3(myComment.scrcCntn);
      setTextarea4(myComment.opnCntn);
      setTextarea5(myComment.etcCntn);
    }
  }, [myComment]);

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.kpntYn = textarea1Checked === false ? 'N' : 'Y';
        draft.scrcYn = textarea2Checked === false ? 'N' : 'Y';
        draft.hstYn = textarea3Checked === false ? 'N' : 'Y';
        draft.opnYn = textarea4Checked === false ? 'N' : 'Y';
        draft.etcYn = textarea5Checked === false ? 'N' : 'Y';
      })
    );
  }, [textarea1Checked, textarea2Checked, textarea3Checked, textarea4Checked, textarea5Checked]);

  // 슬라이드 탭
  const [tabKey, setTabKey] = useState(1);
  const tabCallback = useCallback((key) => {
    if (Number(key) < 2) {
      setTabKey('first');
    } else if (Number(key) >= 2 && Number(key) < 5) {
      setTabKey(key);
    } else {
      setTabKey('last');
    }
  }, []);

  const [isValue, setIsValue] = useState(1);
  const [activeBtn, setActiveBtn] = useState(false);
  const handleChange = useCallback((e) => {
    e.preventDefault();
    const index = Number(e.target.value);
    setIsValue(index);
    setActiveBtn(index === 3 ? true : false);
  }, []);

  const [resetPop, setResetPop, openResetPop, closeDimmResetPop] = useRodal(false);
  const closeResetPop = useCallback(
    (e) => {
      e.preventDefault();
      setResetPop(false);
    },
    [setResetPop]
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="register-car-ex">
          <ul className="radio-block tp5">
            <li>
              <Radio className="txt" id="block1-1" label="직접입력" value={1} checked={isValue} onChange={handleChange} />
            </li>
            <li>
              <Radio className="txt" id="block1-2" label="샘플보기" value={2} checked={isValue} onChange={handleChange} />
            </li>
            <li>
              <Radio className="txt" id="block1-3" label="나의설명글" value={3} checked={isValue} onChange={handleChange} />
            </li>
          </ul>

          <Buttons align="right">
            {activeBtn && (
              <MobSelectBox
                options={[
                  { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '내용1' },
                  { id: 'm-radio2', value: 2, checked: false, disabled: false, label: '내용2' },
                  { id: 'm-radio3', value: 3, checked: false, disabled: false, label: '내용3' }
                ]}
                customButton={true}
                customButtonName="나의 설명글 선택"
                customButtonSize="sml"
                customButtonWidth={85}
                customButtonHeight={24}
                customButtonFontSize={10}
              />
            )}
            <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} onClick={(e) => openResetPop(e, 'fade')} />
          </Buttons>

          <div className="ex-option-wrap">
            <div className="ex-direct-wrap">
              <label htmlFor="car-exp">제목</label>
              <Input name="ttlCntn" type="text" placeHolder="설명글 제목 입력" id="car-exp" width="85%" height={40} value={inputTitle} onChange={onInput} />
            </div>
          </div>

          <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
            <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={4} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
              <TabPane tab="Key Point" data-extra="tabpane" key="1">
                <h4>차량설명글</h4>
                <CheckBox id="chk-key-point" checked={textarea1Checked} onChange={handleTextarea1} />
                <Textarea countLimit={50} name="kpntCntn" type="tp1" height={96} disabled={textareaDisabled1} data={textarea1} onChange={onInput} />
              </TabPane>
              <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">
                <h4>차량설명글</h4>
                <CheckBox id="chk-scratch-photo" checked={textarea2Checked} onChange={handleTextarea2} />
                <Textarea countLimit={50} name="scrcCntn" type="tp1" height={96} disabled={textareaDisabled2} data={textarea2} onChange={onInput} />
              </TabPane>
              <TabPane tab="이 차의 History" data-extra="tabpane" key="3">
                <h4>차량설명글</h4>
                <CheckBox id="chk-history" checked={textarea3Checked} onChange={handleTextarea3} />
                <Textarea countLimit={50} name="hstCntn" type="tp1" height={96} disabled={textareaDisabled3} data={textarea3} onChange={onInput} />
              </TabPane>
              <TabPane tab="진단소견" data-extra="tabpane" key="4">
                <h4>차량설명글</h4>
                <CheckBox id="chk-diagnosis" checked={textarea4Checked} onChange={handleTextarea4} />
                <Textarea countLimit={50} name="opnCntn" type="tp1" height={96} disabled={textareaDisabled4} data={textarea4} onChange={onInput} />
              </TabPane>
              <TabPane tab="기타" data-extra="tabpane" key="5">
                <h4>차량설명글</h4>
                <CheckBox id="chk-other" checked={textarea5Checked} onChange={handleTextarea5} />
                <Textarea countLimit={50} name="etcCntn" type="tp1" height={96} disabled={textareaDisabled5} data={textarea5} onChange={onInput} />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button
            size="big"
            background="blue20"
            color="blue80"
            title="취소"
            href={
              `/mypage/dealer/sellcar/carDescription?` +
              qs.stringify({
                pageNo
              })
            }
          />
          <Button size="big" background="blue80" title="저장" buttonMarkup={true} onClick={sendEmail} />
        </Buttons>

        <RodalPopup show={resetPop} type={'fade'} closedHandler={closeDimmResetPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              작성중인 내용이 초기화됩니다.
              <br />
              초기화하시겠습니까?
            </p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeResetPop} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} buttonMarkup={true} onClick={handlerReset} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 등록</h3>
            <p>[차량상세&gt;판매자의 차량 가이드]에 노출됩니다.</p>
          </div>

          <div className="register-car-ex">
            <h4>차량 설명글 입력</h4>
            <div className="ex-option-wrap">
              <RadioGroup dataList={radioList} defaultValue={Number(radioVal)} onChange={onChangeRadio} mode="vertical" />
              &nbsp;&nbsp;
              {activeSelect && (
                <SelectBox id="mortgage3" className="items-sbox" placeHolder="선택하세요" options={myCommentSelList} width={318} height={40} value={selectCode} onChange={onSelectChange} />
              )}
            </div>

            <div className="ex-option-wrap">
              <div className="ex-direct-wrap">
                <label htmlFor="car-exp">제목</label>
                <Input name="ttlCntn" type="text" placeHolder="설명글 제목" id="car-exp" value={inputTitle} onChange={onInput} width={744} height={40} />
              </div>

              <div className="btn-wrap" style={{ marginTop: '20px' }}>
                <Button size="sml" line="gray" color="gray" title="내용 초기화" width={99} height={30} buttonMarkup={true} onClick={handlerReset} />
              </div>
            </div>
            <div className="key-point-wrap">
              <CheckBox id="chk-key-point" title="Key Point" checked={textarea1Checked} onChange={handleTextarea1} />
              <div className="area">
                <Textarea name="kpntCntn" type="tp1" disabled={textareaDisabled1} placeHolder="에디터 화면 노출 영역" data={textarea1} onChange={onInput} countLimit={1000} />
              </div>
            </div>
            <div className="scratch-photo-wrap">
              <CheckBox id="chk-scratch-photo" title="Wear&Tear" checked={textarea2Checked} onChange={handleTextarea2} />
              <div className="area">
                <Textarea name="scrcCntn" type="tp1" disabled={textareaDisabled2} placeHolder="에디터 화면 노출 영역" data={textarea2} onChange={onInput} countLimit={1000} />
              </div>
            </div>
            <div className="history-wrap">
              <CheckBox id="chk-history" title="이 차의 History" checked={textarea3Checked} onChange={handleTextarea3} />
              <div className="area">
                <Textarea name="hstCntn" type="tp1" disabled={textareaDisabled3} placeHolder="에디터 화면 노출 영역" data={textarea3} onChange={onInput} countLimit={1000} />
              </div>
            </div>
            <div className="diagnosis-wrap">
              <CheckBox id="chk-diagnosis" title="진단소견" checked={textarea4Checked} onChange={handleTextarea4} />
              <div className="area">
                <Textarea name="opnCntn" type="tp1" disabled={textareaDisabled4} placeHolder="에디터 화면 노출 영역" data={textarea4} onChange={onInput} countLimit={1000} />
              </div>
            </div>
            <div className="other-wrap">
              <CheckBox id="chk-other" title="기타" checked={textarea5Checked} onChange={handleTextarea5} />
              <div className="area">
                <Textarea name="etcCntn" type="tp1" disabled={textareaDisabled5} placeHolder="에디터 화면 노출 영역" data={textarea5} onChange={onInput} countLimit={1000} />
              </div>
            </div>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={127}
              href={
                `/mypage/dealer/sellcar/carDescription?` +
                qs.stringify({
                  pageNo
                })
              }
            />
            <Button size="big" background="blue80" title="저장" width={127} onClick={sendEmail} buttonMarkup={true} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
});

RegisterCarDescription.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

RegisterCarDescription.propTypes = {
  query: PropTypes.object
};
RegisterCarDescription.displayName = 'RegisterCarDescription';
export default RegisterCarDescription;
