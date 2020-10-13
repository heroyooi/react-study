import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';

import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import Textarea from '@lib/share/items/Textarea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const registerCarIntroducingNext = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
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
  }, []);

  // 슬라이드 탭
  const [tabKey, setTabKey] = useState(1);
  const tabCallback = useCallback((key) => {
    if (+key < 2) {
      setTabKey('first');
    } else if (+key >= 2 && +key < 5) {
      setTabKey(key);
    } else {
      setTabKey('last');
    }
  }, []);

  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map((v) => console.log(v));
  };

  const [isValue, setIsValue] = useState(1);
  const [isTxtDisabled, setIsTxtDisabled] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [activeAdd, setActiveAdd] = useState(false);
  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      const index = +e.target.value;
      setIsValue(index);
      setIsTxtDisabled(index === 2 ? true : false);
      setActiveBtn(index === 3 ? true : false);
      setActiveAdd(index === 2 ? false : true);
    },
    [isValue]
  );

  const [resetPop, setResetPop, openResetPop, closeDimmResetPop] = useRodal(false);
  const closeResetPop = useCallback((e) => {
    e.preventDefault();
    setResetPop(false);
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={4} />
          <form className="register-form">
            <fieldset>
              <legend className="away">차량 설명글 입력</legend>
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
                    <MobSelectBox options={[
                      { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '내용1' },
                      { id: 'm-radio2', value: 2, checked: false, disabled: false, label: '내용2' },
                      { id: 'm-radio3', value: 3, checked: false, disabled: false, label: '내용3' }
                    ]} customButton={true} customButtonName="나의 설명글 선택" customButtonSize="sml" customButtonWidth={85} customButtonHeight={24} customButtonFontSize={10} />
                  )}
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} onClick={(e) => openResetPop(e, "fade")} />
                </Buttons>

                <div className="ex-option-wrap">
                  <div className="ex-direct-wrap">
                    <label htmlFor="car-exp">제목</label>
                    <Input name="ttlCntn" type="text" placeHolder="설명글 제목 입력" id="car-exp" width="85%" height={40} />
                  </div>
                </div>

                <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
                  <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={4} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
                    <TabPane tab="Key Point" data-extra="tabpane" key="1">
                      <h4>차량설명글</h4>
                      <CheckBox id="chk-on-off" checked={!isTxtDisabled} />
                      <Textarea countLimit={50} type="tp1" height={96} disabled={isTxtDisabled} />
                      {activeAdd && (
                        <>
                          <InputFile uploadList={uploadList1} resVertical={true} type="special" />
                          <p className="tx-exp-tp5 tx-gray">&#8251; 첨부가능 : JPG,JPEG,PNG</p>
                        </>
                      )}
                    </TabPane>
                    <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">
                      <h4>차량설명글</h4>
                      <CheckBox id="chk-on-off" checked={!isTxtDisabled} />
                      <Textarea countLimit={50} type="tp1" height={96} disabled={isTxtDisabled} />
                      {activeAdd && (
                        <>
                          <InputFile uploadList={uploadList1} resVertical={true} type="special" />
                          <p className="tx-exp-tp5 tx-gray">&#8251; 첨부가능 : JPG,JPEG,PNG</p>
                        </>
                      )}
                    </TabPane>
                    <TabPane tab="이 차의 History" data-extra="tabpane" key="3">
                      <h4>차량설명글</h4>
                      <CheckBox id="chk-on-off" checked={!isTxtDisabled} />
                      <Textarea countLimit={50} type="tp1" height={96} disabled={isTxtDisabled} />
                    </TabPane>
                    <TabPane tab="진단소견" data-extra="tabpane" key="4">
                      <h4>차량설명글</h4>
                      <CheckBox id="chk-on-off" checked={!isTxtDisabled} />
                      <Textarea countLimit={50} type="tp1" height={96} disabled={isTxtDisabled} />
                    </TabPane>
                    <TabPane tab="기타" data-extra="tabpane" key="5">
                      <h4>차량설명글</h4>
                      <CheckBox id="chk-on-off" checked={!isTxtDisabled} />
                      <Textarea countLimit={50} type="tp1" height={96} disabled={isTxtDisabled} />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="이전" href="/mypage/dealer/sellcar/registerCarIntroducing" nextLink={true} />
          <Button size="big" background="blue80" title="다음" href="/mypage/dealer/sellcar/registerCarPhoto" nextLink={true} />
        </Buttons>
        
        <RodalPopup show={resetPop} type={'fade'} closedHandler={closeDimmResetPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">     
            <p className="exp">작성중인 내용이 초기화됩니다.<br />초기화하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeResetPop} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
}

export default registerCarIntroducingNext;
