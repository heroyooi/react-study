import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, isUndefined } from 'lodash';
import { produce } from 'immer';
import Router from 'next/router';
import Cookies from 'js-cookie';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import Textarea from '@lib/share/items/Textarea';
import InputFile from '@lib/share/items/InputFile';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { aixosUpFile, axiosGet } from '@src/utils/HttpUtils';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { getCounselOpt } from '@src/actions/cscenter/cscenterAction';
import { console } from 'globalthis/implementation';
//import { SystemContext } from '@src/provider/SystemProvider';

const DirectConsult = (query ) => {
  const dispatch = useDispatch();
  const {userEmail, emailText} = query;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const optList = useSelector((state) => state.cscenter.optList);

  //const [formData, SetFormData] = useState({ quesTtlNm: '', quesCntn: '', cnslTpcd: '0010', fileList1: null, fileList2: null, eMail: 'N' });
  const [formData, SetFormData] = useState({ quesTtlNm: '', quesCntn: '', cnslTpcd: '0010', fileList1: null, fileList2: null, fileList3: null, fileList4: null, fileList5: null, eMail: 'N' });
  const [quesTtlNmError, setQuesTtlNmError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [emailChk, setEmailChk] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  // const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  //const { showAlert } = useContext(SystemContext);

  const tabLink = [
    { index: 0, url: '/cscenter/noticeList' },
    { index: 1, url: '/cscenter/directConsultGuide' },
    { index: 2, url: '/cscenter/faq' }
  ];

  const HandlerChange = (value, name) => {
    // console.log('::: HandlerChange -> value[' + value + '] name[' + name + ']');
    let newValue = '';

    if (name === 'cnslTpcd') {
      newValue = value;
    } else if (name === 'eMail') {
      setEmailChk(value);

      if (value) {
        newValue = 'Y';
      } else {
        newValue = 'N';
      }
    } else {
      newValue = value;
    }

    SetFormData(
      produce((draft) => {
        draft[name] = newValue;
      })
    );
  };

  const textareaChange = (e, name) => {
    console.log('::: textareaChange -> value[' + e.target.value + '] name[' + name + ']');
  };

  const uploadList1 = useCallback((files) => {
      SetFormData(
        produce((draft) => {
         draft.fileList1 = files[0];
         draft.fileList2 = files[1];
         draft.fileList3 = files[2];
         draft.fileList4 = files[3];
         draft.fileList5 = files[4];
        })
      );
  }, []);

  const validateTextArea = () => {
    if (formData.quesTtlNm.length === 0) {
      setQuesTtlNmError(true);
      return false;
    }
    setQuesTtlNmError(false);

    if (formData.quesCntn.length === 0) {
      setContentError(true);
      return false;
    }
    setContentError(false);

    return true;
  };

  const saveQuestion = async (e) => {
    e.preventDefault();

    if (validateTextArea()) {
      const formDatas = new FormData();
      const files1 = formData.fileList1;
      const files2 = formData.fileList2;
      const files3 = formData.fileList3;
      const files4 = formData.fileList4;
      const files5 = formData.fileList5;

      if (typeof formData.fileList1 !== 'undefined' && formData.fileList1 !== null) {
        formDatas.append('files1', formData.fileList1);
      }
      if (typeof formData.fileList2 !== 'undefined' && formData.fileList2 !== null) {
        formDatas.append('files2', formData.fileList2);
      }
      if (typeof formData.fileList3 !== 'undefined' && formData.fileList3 !== null) {
        formDatas.append('files3', formData.fileList3);
      }
      if (typeof formData.fileList4 !== 'undefined' && formData.fileList4 !== null) {
        formDatas.append('files4', formData.fileList4);
      }
      if (typeof formData.fileList5 !== 'undefined' && formData.fileList5 !== null) {
        formDatas.append('files5', formData.fileList5);
      }

      formDatas.append('cnslTpcd', formData.cnslTpcd);
      formDatas.append('quesTtlNm', formData.quesTtlNm);
      formDatas.append('quesCntn', formData.quesCntn)
      const data = await aixosUpFile('/api/bbsMgnt/insertQuestion.do', formDatas);

      if (data.status === 200) {
        if (hasMobile) {
          handleComplete(e);
        } else {
          setRodalShow1(true);
        }
      } else {
        rodalShow2(true);
      }
    }
  };

  const cancleInsert = (e) => {

    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setRodalShow1(false);
    Router.push('/cscenter/directConsultGuide');
  };

  const closePop = (e) => {
    e.preventDefault();
    modalCloseHandler2();
  };

  const handleComplete = useCallback((e) => {
    e.preventDefault();
    setIsComplete(true);
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#f6f7f8'
      }
    });
  }, []);

  // const closeMpop = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     setMpop(false);
  //   },
  //   [setMpop]
  // );

  useEffect(() => {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '1:1 상담',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#ffffff'
      }
    });
  }, []);

  useEffect(() => {
    const userId = Cookies.get('id');
    if (isUndefined(userId) || isEmpty(userId)) {
      Router.push('/cscenter/directConsultGuide');
      return;
    }
    dispatch(getCounselOpt());
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        {!isComplete ? (
          <>
            <div className="content-wrap help-inquiry-wrap">
              <table summary="1:1 상담 문의에 대한 내용" className="table-tp2 pd20">
                <colgroup>
                  <col width="79px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th className="ver-t">유형</th>
                    <td>
                      {optList && <RadioGroup onChange={(e) => HandlerChange(e.target.value, 'cnslTpcd')} name="cnslTpcd" defaultValue={formData.cnslTpcd} dataList={optList} disabledLabel={true} />}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <Textarea
                        name="quesTtlNm"
                        countLimit={50}
                        type="tp1"
                        height={50}
                        disabledEnter={true}
                        onChange={(e) => textareaChange(e, 'quesTtlNm')}
                        onBlur={(e) => HandlerChange(e.target.value, 'quesTtlNm')}
                        placeHolder="제목을 입력해주세요."
                      />
                      {quesTtlNmError === true && (
                        <p className="tx-exp-tp4 tx-red80" style={{ marginTop: '10px' }}>
                          제목을 입력해주세요
                        </p>
                      )}
                      <Textarea
                        name="quesCntn"
                        className="mt16"
                        countLimit={1000}
                        type="tp1"
                        height={280}
                        disabledEnter={true}
                        onChange={(e) => textareaChange(e, 'quesCntn')}
                        onBlur={(e) => HandlerChange(e.target.value, 'quesCntn')}
                        placeHolder="문의내용을 입력해주세요."
                      />
                      {contentError === true && (
                        <p className="tx-exp-tp4 tx-red80" style={{ marginTop: '10px' }}>
                          문의내용을 입력해주세요.
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <InputFile uploadList={uploadList1} resVertical={true} isMultiple={false} type="special" accept="image/jpg, image/jpeg, image/png" />
                      <p className="tx-exp-tp6">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <CheckBox
                        id="chk-answer"
                        name="eMail"
                        title="답변이 등록되면 이메일로 알려드릴까요?"
                        size="small"
                        onChange={(e) => HandlerChange(e.target.checked, e.target.name)}
                        isSelf={false}
                        checked={emailChk}
                      />
                      <span className="sm-info">이메일 : {userEmail}</span>
                      <p className="tx-exp-tp6 mt16">&#8251; 문의내역 및 답변내용은 [마이페이지 &gt; 1:1상담]에서 확인하실 수 있습니다.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <MobBottomArea isFix={true} isSimple={true}>
                <Buttons align="center" className="full">
                  <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={cancleInsert} />
                  <Button size="big" background="blue80" title="등록" height={56} onClick={saveQuestion} />
                </Buttons>
              </MobBottomArea>
            </div>

            {/* <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
              <div className="con-wrap">
                <p className="tit1" />
                <p>문의유형을 선택해주세요</p>
                <Buttons align="right" marginTop={24}>
                  <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
                </Buttons>
              </div>
            </RodalPopup> */}
          </>
        ) : (
          <div className="content-sec f-h1">
            <div className="help-inquiry-wrap pd20">
              <div className="inquiry-cont bg-white tx-c">
                <div className="tit">
                  <h4>등록이 완료되었습니다.</h4>
                  <p>
                    문의 내역은 [마이페이지 &gt; 1:1상담]에서
                    <br />
                    확인하실 수 있습니다.
                  </p>
                </div>
                <div className="step-btn center">
                  <Buttons align="center" marginTop={20}>
                    <Button size="mid" line="gray" color="darkgray" radius={true} title="메인" width={49} measure="%" href="/main" nextLink={true} />
                    <Button size="mid" background="blue80" radius={true} title="마이페이지" width={49} measure="%" marginLeft={2} mgMeasure="%" href="/mypage/personal/info/inquire" />
                  </Buttons>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap help-inquiry-wrap">
        <h3>고객센터</h3>
        <TabMenu type="type1" defaultTab={1} tabLink={tabLink}>
          <TabCont tabTitle="공지사항" id="tab1-1" index={0} />
          <TabCont tabTitle="1:1상담" id="tab1-2" index={1}>
            <table summary="1:1 상담 문의에 대한 내용" className="table-tp2">
              <caption className="away">1:1 상담 문의하기</caption>
              <colgroup>
                <col width="25%" />
                <col width="75%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>유형</th>
                  <td>
                    <RadioGroup onChange={(e) => HandlerChange(e.target.value, 'cnslTpcd')} name="cnslTpcd" defaultValue={formData.cnslTpcd} dataList={optList} />
                  </td>
                </tr>
                <tr>
                  <th>제목</th>
                  <td>
                    <Textarea
                      name="quesTtlNm"
                      countLimit={50}
                      type="tp2"
                      onChange={(e) => textareaChange(e, 'quesTtlNm')}
                      onBlur={(e) => HandlerChange(e.target.value, 'quesTtlNm')}
                      height={48}
                      placeHolder="제목을 입력해주세요."
                    />
                    {quesTtlNmError === true && (
                      <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                        제목을 입력해주세요
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td>
                    <Textarea
                      name="quesCntn"
                      countLimit={1000}
                      type="tp2"
                      onChange={(e) => textareaChange(e, 'quesCntn')}
                      onBlur={(e) => HandlerChange(e.target.value, 'quesCntn')}
                      height={280}
                      placeHolder="문의내용을 입력해주세요."
                    />
                    {contentError === true && (
                      <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                        문의내용을 입력해주세요.
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    첨부파일<em>(선택)</em>
                  </th>
                  <td>
                    <InputFile uploadList={uploadList1} resVertical={true} isMultiple={true} accept="image/jpg, image/jpeg, image/png" />
                    <p className="tx-exp-tp6">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    <p className="tx-exp-tp6">&#8251; 파일은 5개까지 첨부 가능합니다.</p>
                  </td>
                </tr>

                <tr>
                  <th>
                    답변알림<em>(선택)</em>
                  </th>
                  <td>
                    <CheckBox
                      id="chk-answer"
                      name="eMail"
                      title= {emailText}
                      onChange={(e) => HandlerChange(e.target.checked, e.target.name)}
                      isSelf={false}
                      checked={emailChk}
                    />
                    <p className="tx-exp-tp6">&#8251; 문의내역 및 답변내용은 [마이페이지&gt;1:1상담]에서 확인하실 수 있습니다.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </TabCont>
          <TabCont tabTitle="FAQ" id="tab1-3" index={2} />
        </TabMenu>
        <Buttons align="center">
          <Button size="big" background="gray" title="취소" width={180} height={60} onClick={cancleInsert} buttonMarkup={true} />
          <Button size="big" background="blue80" title="문의 등록" width={180} height={60} onClick={(e) => saveQuestion(e)} />
        </Buttons>
      </div>

      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={cancleInsert} mode="normal" size="xs">
        <div className="con-wrap popup-inquiry">
          <p>
            고객님께서 문의하신 내용이 정상적으로 접수되었습니다
            <br />
            문의내역은, [마이페이지 &gt; 1:1상담]에서 확인하실 수 있습니다.
          </p>
          <Buttons align="center" className="w-line" marginTop={40}>
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={cancleInsert} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2} type={'slideUp'} closedHandler={modalCloseHandler2} mode="normal" size="xs">
        <div className="con-wrap popup-inquiry">
          <p>
            {' '}
            답변 등록에 실패하였습니다. <br /> 잠시 후 다시 시도해주시기 바랍니다.{' '}
          </p>
          <Buttons align="center" className="w-line" marginTop={40}>
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={(e) => closePop(e)} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

DirectConsult.getInitialProps = async http => {
  const { reduxStore, req } = http
  const query = req?.query || http?.query || '';
  const data = await axiosGet('/api/bbsMgnt/getUserEmail.do', null);

  const str = `답변이 등록되면 이메일로 알려드릴까요? (이메일: ${data.data.email})`;

  return {
       userEmail : data.data.email,
       emailText:str
    }
}

export default DirectConsult;
