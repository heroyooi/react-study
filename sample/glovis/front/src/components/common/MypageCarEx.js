import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
import CheckBox from '@lib/share/items/CheckBox'
import InputFile from '@lib/share/items/InputFile';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MypageCarEx = ({ buttonType, radioGroup = false, title = false, isButtonReset = false, activeTextarea = false }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);

  const [textareaData1, setTextareaData1] = useState("");
  const [textareaData2, setTextareaData2] = useState("");
  const [textareaData3, setTextareaData3] = useState("");
  const [textareaData4, setTextareaData4] = useState("");
  const [textareaData5, setTextareaData5] = useState("");
  const [textareaDisabled1, setTextareaDisabled1] = useState(activeTextarea);
  const [textareaDisabled2, setTextareaDisabled2] = useState(activeTextarea);
  const [textareaDisabled3, setTextareaDisabled3] = useState(activeTextarea);
  const [textareaDisabled4, setTextareaDisabled4] = useState(activeTextarea);
  const [textareaDisabled5, setTextareaDisabled5] = useState(activeTextarea);

  // 팝업 내부 - 체크박스 텍스트어리어 활성
  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1)
  }, [textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2)
  }, [textareaDisabled2]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3)
  }, [textareaDisabled3]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4)
  }, [textareaDisabled4]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5)
  }, [textareaDisabled5]);

  const textareaChange1 = (e) => {
    setTextareaData1(e.target.value);
  }
  const textareaChange2 = (e) => {
    setTextareaData2(e.target.value);
  }
  const textareaChange3 = (e) => {
    setTextareaData3(e.target.value);
  }
  const textareaChange4 = (e) => {
    setTextareaData4(e.target.value);
  }
  const textareaChange5 = (e) => {
    setTextareaData5(e.target.value);
  }
  const handleTextareaReset = (e) => {
    e.preventDefault();
    setTextareaData1("");
    setTextareaData2("");
    setTextareaData3("");
    setTextareaData4("");
    setTextareaData5("");
    setRodalShow3(false);
  }

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  const [activeSelect, setActiveSelect] = useState(false);
  const handleChange = (e) => setActiveSelect(+e.target.value === 3 ? true : false);

  if (hasMobile) {
    // 슬라이드 탭
    const [tabKey, setTabKey] = useState(1);
    const tabCallback = useCallback(key => {
      if (+key < 2) {
        setTabKey('first');
      } else if (+key >= 2 && +key < 5) {
        setTabKey(key);
      } else {
        setTabKey('last');
      }
    }, []);

    return (
      <div className="register-car-ex">
        <TabMenu type="type2" defaultTab={0} mount={false}>
          <TabCont tabTitle="직접입력" id="tab2-1" index={0}>
            <div className="btn-wrap">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} />
            </div>

            <div className="ex-option-wrap">
              <div className="ex-direct-wrap">
                <label htmlFor="car-exp">제목</label>
                <Input type="text" placeHolder="그랜저 설명글" id="car-exp" width='85%' height={40} />
              </div>
            </div>

            <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
              <Tabs
                renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
                renderTabContent={() => <TabContent />}
                defaultActiveKey="1"
                onChange={tabCallback}
              >
                <TabPane tab="Key Point" data-extra="tabpane" key="1" className="content-border">
                  <h4>차량 설명글</h4>
                  <CheckBox id='chk-on-off' checked={true} />
                  <Textarea countLimit={50} type="tp1" height={96} />
                  <InputFile uploadList={uploadList1} resVertical={true} type="special" />
                  <p className="tx-exp-tp5 tx-gray">&#8251; 첨부가능 : JPG,JPEG,PNG</p>
                </TabPane>
                <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">

                </TabPane>
                <TabPane tab="이 차의 History" data-extra="tabpane" key="3">

                </TabPane>
                <TabPane tab="진단소견" data-extra="tabpane" key="4">

                </TabPane>
                <TabPane tab="기타" data-extra="tabpane" key="5">

                </TabPane>
              </Tabs>
            </div>
          </TabCont>
          <TabCont tabTitle="샘플보기" id="tab2-2" index={1}>
            <div className="btn-wrap">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} />
            </div>

            <div className="ex-option-wrap">
              <div className="ex-direct-wrap">
                <label htmlFor="car-exp">제목</label>
                <Input type="text" placeHolder="그랜저 설명글" id="car-exp" width='85%' height={40} />
              </div>
            </div>

            <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
              <Tabs
                renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
                renderTabContent={() => <TabContent />}
                defaultActiveKey="1"
                onChange={tabCallback}
              >
                <TabPane tab="Key Point" data-extra="tabpane" key="1" className="content-border">
                  <h4>차량 설명글</h4>
                  <CheckBox id='chk-on-off' />
                  <Textarea countLimit={50} type="tp1" height={96} />
                </TabPane>
                <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">

                </TabPane>
                <TabPane tab="이 차의 History" data-extra="tabpane" key="3">

                </TabPane>
                <TabPane tab="진단소견" data-extra="tabpane" key="4">

                </TabPane>
                <TabPane tab="기타" data-extra="tabpane" key="5">

                </TabPane>
              </Tabs>
            </div>
          </TabCont>
          <TabCont tabTitle="나의설명글" id="tab2-3" index={2}>
            <Buttons align="right">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="나의 설명글 선택" width={85} height={24} fontSize={10} fontWeight={500} />
              <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} />
            </Buttons>

            <div className="ex-option-wrap">
              <div className="ex-direct-wrap">
                <label htmlFor="car-exp">제목</label>
                <Input type="text" placeHolder="그랜저 설명글" id="car-exp" width='85%' height={40} />
              </div>
            </div>

            <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
              <Tabs
                renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
                renderTabContent={() => <TabContent />}
                defaultActiveKey="1"
                onChange={tabCallback}
              >
                <TabPane tab="Key Point" data-extra="tabpane" key="1" className="content-border">
                  <h4>차량 설명글</h4>
                  <CheckBox id='chk-on-off' checked={true} />
                  <Textarea countLimit={50} type="tp1" height={96} />
                  <InputFile uploadList={uploadList1} resVertical={true} type="special" />
                  <p className="tx-exp-tp5 tx-gray">&#8251; 첨부가능 : JPG,JPEG,PNG</p>
                </TabPane>
                <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">

                </TabPane>
                <TabPane tab="이 차의 History" data-extra="tabpane" key="3">

                </TabPane>
                <TabPane tab="진단소견" data-extra="tabpane" key="4">

                </TabPane>
                <TabPane tab="기타" data-extra="tabpane" key="5">

                </TabPane>
              </Tabs>
            </div>
          </TabCont>
        </TabMenu>
      </div>
    );
  }
  return (
    <>
      <fieldset>
        <legend className="away">차량 설명글 입력</legend>
        <div className="register-car-ex">
          {
            radioGroup && (
              <>
                <h4>차량 설명글 입력</h4>
                <div className="ex-option-wrap">
                  <RadioGroup dataList={[
                    { id: 'car_ex1', value: 1, checked: true, disabled: false, title: '직접입력' },
                    { id: 'car_ex3', value: 3, checked: false, disabled: false, title: '나의 설명글 사용' }
                  ]} mode="vertical" onChange={handleChange} />
                  {
                    activeSelect && (
                      <SelectBox id="mortgage3" className="items-sbox" placeHolder="선택하세요"
                        options={[
                          { value: '소형차 설명글', label: '소형차 설명글' },
                          { value: '신차 설명글', label: '신차 설명글' }
                        ]} width={190} height={40} />
                    )
                  }
                </div>
              </>
            )
          }
          {
            title && (
              <div className="ex-option-wrap">
                <div className="ex-direct-wrap">
                  <label htmlFor="car-exp">제목</label>
                  <Input type="text" placeHolder="그랜저 설명글" id="car-exp" width={744} height={40} />
                </div>
              </div>
            )
          }
          {
            isButtonReset && (
              <div className="btn-wrap">
                <Button size="sml" line="gray" color="gray" radius={true} title="내용초기화" width={99} height={24} onClick={(e) => rodalPopupHandler3(e, "fade")} />
              </div>
            )
          }

          <div className="key-point-wrap">
            <CheckBox id='chk-key-point' title='Key Point' checked={!activeTextarea} onChange={handleTextarea1} />
            <div className="area">
              <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled1} placeHolder="에디터 화면 노출 영역" data={textareaData1} onChange={textareaChange1} isSelf={false} />
            </div>
            <InputFile uploadList={uploadList1} />
          </div>
          <div className="scratch-photo-wrap">
            <CheckBox id='chk-scratch-photo' title='Wear &amp; Tear' checked={!activeTextarea} onChange={handleTextarea2} />
            <div className="area">
              <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled2} placeHolder="에디터 화면 노출 영역" data={textareaData2} onChange={textareaChange2} isSelf={false} />
            </div>
            <InputFile uploadList={uploadList1} />
          </div>
          <div className="history-wrap">
            <CheckBox id='chk-history' title='이 차의 History' checked={!activeTextarea} onChange={handleTextarea3} />
            <div className="area">
              <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled3} placeHolder="에디터 화면 노출 영역" data={textareaData3} onChange={textareaChange3} isSelf={false} />
            </div>
          </div>
          <div className="diagnosis-wrap">
            <CheckBox id='chk-diagnosis' title='진단소견' checked={!activeTextarea} onChange={handleTextarea4} />
            <div className="area">
              <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled4} placeHolder="에디터 화면 노출 영역" data={textareaData4} onChange={textareaChange4} isSelf={false} />
            </div>
          </div>
          <div className="other-wrap">
            <CheckBox id='chk-other' title='기타' checked={!activeTextarea} onChange={handleTextarea5} />
            <div className="area">
              <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled5} placeHolder="에디터 화면 노출 영역" data={textareaData5} onChange={textareaChange5} isSelf={false} />
            </div>
          </div>
        </div>
      </fieldset>

      {
        buttonType === 1 && (
          <Buttons align="right" marginTop={32}>
            <Button size="big" background="blue80" title="설명글 저장하기" width={155} onClick={(e) => rodalPopupHandler(e, "fade")} />
          </Buttons>
        )
      }
      {
        buttonType === 2 && (
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="저장" width={127} onClick={(e) => rodalPopupHandler2(e, "fade")} />
          </Buttons>
        )
      }
      {
        buttonType === 3 && (
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="저장" width={127} onClick={(e) => rodalPopupHandler2(e, "fade")} />
            <Button size="big" background="gray" title="다른 이름으로 저장" width={200} onClick={(e) => rodalPopupHandler2(e, "fade")} />
          </Buttons>
        )
      }

      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} title="나의 설명글 관리" mode="normal" size="small">
        <div className="con-wrap popup-my-ex">
          <p>설명글 제목을 입력하세요.</p>
          <Input type="text" height={48} />
          <div className="input-limit">0/12</div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler2(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'slideUp'} closedHandler={modalCloseHandler2} mode="normal" size="xs">
        <div className="con-wrap popup-my-ex">
          <p>설명글 저장이 완료되었습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow3} type={'slideUp'} closedHandler={modalCloseHandler3} mode="normal" size="xs">
        <div className="con-wrap popup-my-ex">
          <p>작성중인 내용이 초기화됩니다.<br />초기화 하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={handleTextareaReset} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )
}

export default MypageCarEx;