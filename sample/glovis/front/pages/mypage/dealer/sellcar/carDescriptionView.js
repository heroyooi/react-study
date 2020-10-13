import React, { memo, useState, useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { getMyComment, updateMyComment, setMyComment } from '@src/actions/mypage/dealer/carDescriptionAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

/**
 * 설명 : 나의 설명글 수정페이지를 호출한다.
 * @param {state.carComment.myCommentList} 나의 설명글 수정
 * @returns {carDescription} 나의 설명글 수정
 */
const CarDescriptionView = memo(({ query }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '설명글 수정',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pageNo = 1, prdCmntSno } = query;
  const { myComment } = useSelector((state) => state.carComment);
  const [tmpMyComment, setTmpMyComments] = useState({});
  const { showAlert, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);

  const [inputTitle, setInputTitle] = useState(myComment.ttlCntn);

  const [textareaDisabled1, setTextareaDisabled1] = useState(true);
  const [textareaDisabled2, setTextareaDisabled2] = useState(true);
  const [textareaDisabled3, setTextareaDisabled3] = useState(true);
  const [textareaDisabled4, setTextareaDisabled4] = useState(true);
  const [textareaDisabled5, setTextareaDisabled5] = useState(true);

  const [textareaData1, setTextareaData1] = useState('');
  const [textareaData2, setTextareaData2] = useState('');
  const [textareaData3, setTextareaData3] = useState('');
  const [textareaData4, setTextareaData4] = useState('');
  const [textareaData5, setTextareaData5] = useState('');

  const [textarea1Checked, setTextarea1Checked] = useState(isEmpty(textareaData1) ? false : true);
  const [textarea2Checked, setTextarea2Checked] = useState(isEmpty(textareaData2) ? false : true);
  const [textarea3Checked, setTextarea3Checked] = useState(isEmpty(textareaData3) ? false : true);
  const [textarea4Checked, setTextarea4Checked] = useState(isEmpty(textareaData4) ? false : true);
  const [textarea5Checked, setTextarea5Checked] = useState(isEmpty(textareaData5) ? false : true);

  const [resetPop, setResetPop, openResetPop, closeDimmResetPop] = useRodal(false);

  const onChangeInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const onChangeTextarea1 = (e) => {
    setTextareaData1(e.target.value);
  };
  const onChangeTextarea2 = (e) => {
    setTextareaData2(e.target.value);
  };
  const onChangeTextarea3 = (e) => {
    setTextareaData3(e.target.value);
  };
  const onChangeTextarea4 = (e) => {
    setTextareaData4(e.target.value);
  };
  const onChangeTextarea5 = (e) => {
    setTextareaData5(e.target.value);
  };

  const handleResetPopClose = useCallback(
    (e) => {
      e.preventDefault();
      setResetPop(false);
    },
    [setResetPop]
  );

  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      setInputTitle('');
      setTextarea1Checked(false);
      setTextareaDisabled1(true);
      setTextareaData1('');
      setTextarea2Checked(false);
      setTextareaDisabled2(true);
      setTextareaData2('');
      setTextarea3Checked(false);
      setTextareaDisabled3(true);
      setTextareaData3('');
      setTextarea4Checked(false);
      setTextareaDisabled4(true);
      setTextareaData4('');
      setTextarea5Checked(false);
      setTextareaDisabled5(true);
      setTextareaData5('');
      setResetPop(false);
    },
    [setResetPop]
  );

  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1);
    setTextarea1Checked(!textarea1Checked);
  }, [textarea1Checked, textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2);
    setTextarea2Checked(!textarea2Checked);
  }, [textareaDisabled2, textarea2Checked]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3);
    setTextarea3Checked(!textarea3Checked);
  }, [textareaDisabled3, textarea3Checked]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4);
    setTextarea4Checked(!textarea4Checked);
  }, [textareaDisabled4, textarea4Checked]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5);
    setTextarea5Checked(!textarea5Checked);
  }, [textareaDisabled5, textarea5Checked]);

  const handleSave = () => {
    tmpMyComment.ttlCntn = inputTitle;
    tmpMyComment.prdCmntSno = prdCmntSno;
    tmpMyComment.kpntCntn = textareaData1;
    tmpMyComment.scrcCntn = textareaData2;
    tmpMyComment.hstCntn = textareaData3;
    tmpMyComment.opnCntn = textareaData4;
    tmpMyComment.etcCntn = textareaData5;
    tmpMyComment.kpntYn = textarea1Checked === true ? 'Y' : 'N';
    tmpMyComment.scrcYn = textarea2Checked === true ? 'Y' : 'N';
    tmpMyComment.hstYn = textarea3Checked === true ? 'Y' : 'N';
    tmpMyComment.opnYn = textarea4Checked === true ? 'Y' : 'N';
    tmpMyComment.etcYn = textarea5Checked === true ? 'Y' : 'N';
    dispatch(updateMyComment(tmpMyComment));
    setTmpMyComments({});
    showAlert('저장이 완료되었습니다.', 'carDescription_edited');
  };

  const handleOtherSave = () => {
    if (myComment.ttlCntn === inputTitle) {
      showAlert('제목이 동일합니다');
      return;
    }
    console.log('myComment => ', myComment);
    if (inputTitle === '') {
      const param = {
        ttlCntn: '제목없음',
        kpntCntn: textareaData1,
        scrcCntn: textareaData2,
        hstCntn: textareaData3,
        opnCntn: textareaData4,
        etcCntn: textareaData5,
        kpntYn: textarea1Checked === true ? 'Y' : 'N',
        scrcYn: textarea2Checked === true ? 'Y' : 'N',
        hstYn: textarea3Checked === true ? 'Y' : 'N',
        opnYn: textarea4Checked === true ? 'Y' : 'N',
        etcYn: textarea5Checked === true ? 'Y' : 'N'
      };
      console.log(param);

      dispatch(setMyComment(param));
      showAlert('저장이 완료되었습니다.', 'carDescription_edited');
    } else {
      const param = {
        ttlCntn: inputTitle,
        kpntCntn: textareaData1,
        scrcCntn: textareaData2,
        hstCntn: textareaData3,
        opnCntn: textareaData4,
        etcCntn: textareaData5,
        kpntYn: textarea1Checked === true ? 'Y' : 'N',
        scrcYn: textarea2Checked === true ? 'Y' : 'N',
        hstYn: textarea3Checked === true ? 'Y' : 'N',
        opnYn: textarea4Checked === true ? 'Y' : 'N',
        etcYn: textarea5Checked === true ? 'Y' : 'N'
      };
      console.log(param);

      dispatch(setMyComment(param));
      showAlert('저장이 완료되었습니다.', 'carDescription_edited');
    }
  };

  const onCancel = () => {
    Router.push(`/mypage/dealer/sellcar/carDescription?pageNo=${pageNo}`).then(() => {
      window.scrollTo(0, 0);
    });
  };

  useEffect(() => {
    if (prdCmntSno) {
      dispatch(getMyComment(prdCmntSno));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prdCmntSno]);

  useEffect(() => {
    if (!isEmpty(myComment)) {
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

      setTextareaData1(myComment.kpntCntn);
      setTextareaData2(myComment.hstCntn);
      setTextareaData3(myComment.scrcCntn);
      setTextareaData4(myComment.opnCntn);
      setTextareaData5(myComment.etcCntn);
    }
  }, [myComment]);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    [initAlert, initConfirm]
  );

  useEffect(() => {
    if (Alert.state !== 'show' && Alert.callback === 'carDescription_edited') {
      const returnUrl = `/mypage/dealer/sellcar/carDescription?pageNo=${pageNo}`;
      Router.push(returnUrl).then(() => {
        window.location.reload();
        window.scrollTo(0, 0);
      });
    }
  }, [Alert, Confirm, pageNo]);

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

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="register-car-ex">
          <Buttons align="right">
            <Button size="sml" background="blue20" color="blue80" radius={true} title="전체 초기화" width={65} height={24} fontSize={10} fontWeight={500} onClick={(e) => openResetPop(e, 'fade')} />
          </Buttons>

          <div className="ex-option-wrap">
            <div className="ex-direct-wrap">
              <label htmlFor="car-exp">제목</label>
              <Input name="ttlCntn" type="text" placeHolder="설명글 제목 입력" id="car-exp" width="85%" height={40} value={inputTitle} onChange={onChangeInputTitle} />
            </div>
          </div>

          <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
            <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={4} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
              <TabPane tab="Key Point" data-extra="tabpane" key="1">
                <h4>차량설명글</h4>
                <CheckBox id="chk-key-point" onChange={handleTextarea1} checked={textarea1Checked} />
                <Textarea countLimit={50} type="tp1" height={96} disabled={textareaDisabled1} data={textareaData1} onChange={onChangeTextarea1} />
              </TabPane>
              <TabPane tab="Wear &amp; Tear" data-extra="tabpane" key="2">
                <h4>차량설명글</h4>
                <CheckBox id="chk-scratch-photo" onChange={handleTextarea2} checked={textarea2Checked} />
                <Textarea countLimit={50} type="tp1" height={96} disabled={textareaDisabled2} data={textareaData2} onChange={onChangeTextarea2} />
              </TabPane>
              <TabPane tab="이 차의 History" data-extra="tabpane" key="3">
                <h4>차량설명글</h4>
                <CheckBox id="chk-history" onChange={handleTextarea3} checked={textarea3Checked} />
                <Textarea countLimit={50} type="tp1" height={96} disabled={textareaDisabled3} data={textareaData3} onChange={onChangeTextarea3} />
              </TabPane>
              <TabPane tab="진단소견" data-extra="tabpane" key="4">
                <h4>차량설명글</h4>
                <CheckBox id="chk-diagnosis" onChange={handleTextarea4} checked={textarea4Checked} />
                <Textarea countLimit={50} type="tp1" height={96} disabled={textareaDisabled4} data={textareaData4} onChange={onChangeTextarea4} />
              </TabPane>
              <TabPane tab="기타" data-extra="tabpane" key="5">
                <h4>차량설명글</h4>
                <CheckBox id="chk-other" title="기타" onChange={handleTextarea5} checked={textarea5Checked} />
                <Textarea countLimit={50} type="tp1" height={96} disabled={textareaDisabled5} data={textareaData5} onChange={onChangeTextarea5} />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <Button className="fixed b56" size="full" background="blue20" color="blue80" title="다른 이름으로 저장" onClick={handleOtherSave} buttonMarkup={true} />
        <Buttons align="center" className="full fixed">
          <Button size="big" background="gray60" title="취소" onClick={onCancel} buttonMarkup={true} />
          <Button size="big" background="blue80" title="저장" onClick={handleSave} buttonMarkup={true} />
        </Buttons>

        <RodalPopup show={resetPop} type={'fade'} closedHandler={closeDimmResetPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              작성중인 내용이 초기화됩니다.
              <br />
              초기화하시겠습니까?
            </p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={handleResetPopClose} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={handleReset} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 수정</h3>
            <p>[차량상세&gt;판매자의 차량 가이드]에 노출됩니다.</p>
          </div>

          <div className="register-car-ex">
            <div className="ex-option-wrap">
              <div className="ex-direct-wrap">
                <label htmlFor="car-exp">제목</label>
                <Input name="ttlCntn" type="text" placeHolder="" id="car-exp" width={744} height={40} value={inputTitle} onChange={onChangeInputTitle} />
              </div>
            </div>
            <div className="key-point-wrap">
              <CheckBox id="chk-key-point" title="Key Point" onChange={handleTextarea1} checked={textarea1Checked} />
              <div className="area">
                <Textarea type="tp1" countLimit={50} disabled={textareaDisabled1} placeHolder="에디터 화면 노출 영역" data={textareaData1} onChange={onChangeTextarea1} />
              </div>
            </div>
            <div className="scratch-photo-wrap">
              <CheckBox id="chk-scratch-photo" title="Wear&Tear" onChange={handleTextarea2} checked={textarea2Checked} />
              <div className="area">
                <Textarea type="tp1" countLimit={50} disabled={textareaDisabled2} placeHolder="에디터 화면 노출 영역" data={textareaData2} onChange={onChangeTextarea2} />
              </div>
            </div>
            <div className="history-wrap">
              <CheckBox id="chk-history" title="이 차의 History" onChange={handleTextarea3} checked={textarea3Checked} />
              <div className="area">
                <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled3} placeHolder="에디터 화면 노출 영역" data={textareaData3} onChange={onChangeTextarea3} />
              </div>
            </div>
            <div className="diagnosis-wrap">
              <CheckBox id="chk-diagnosis" title="진단소견" onChange={handleTextarea4} checked={textarea4Checked} />
              <div className="area">
                <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled4} placeHolder="에디터 화면 노출 영역" data={textareaData4} onChange={onChangeTextarea4} />
              </div>
            </div>
            <div className="other-wrap">
              <CheckBox id="chk-other" title="기타" onChange={handleTextarea5} checked={textarea5Checked} />
              <div className="area">
                <Textarea type="tp1" countLimit={1000} disabled={textareaDisabled5} placeHolder="에디터 화면 노출 영역" data={textareaData5} onChange={onChangeTextarea5} />
              </div>
            </div>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} buttonMarkup={true} onClick={onCancel} />
            <Button size="big" background="blue80" title="저장" width={127} onClick={handleSave} buttonMarkup={true} />
            <Button size="big" background="gray" title="다른 이름으로 저장" width={200} onClick={handleOtherSave} buttonMarkup={true} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
});

CarDescriptionView.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';

  return {
    query
  };
};

CarDescriptionView.propTypes = {
  query: PropTypes.object
};

CarDescriptionView.displayName = 'CarDescriptionView';
export default CarDescriptionView;
