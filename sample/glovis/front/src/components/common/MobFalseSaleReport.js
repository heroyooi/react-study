import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosPost } from '@src/utils/HttpUtils';
import { isEmpty } from 'lodash';
import { isEmail } from '@src/utils/ValidationUtils';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';
import moment from 'moment';
import RadioGroup from '@lib/share/items/RadioGroup';
import CheckBox from '@lib/share/items/CheckBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MobFalseSaleReport = ({ falseInfo, callback }) => {
  console.log('MobFalseSaleReport falseInfo', falseInfo);
  const dispatch = useDispatch();
  const now = moment();
  const FM007 = 'FM007';
  const FM007List = useSelector((state) => state.commonCode.commonCodeList[FM007]);

  useEffect(() => {
    dispatch(getCommonCodeList(FM007)); //정보허위차량 체크박스 리스트
  }, [dispatch, FM007]);

  const checkArrRef = useRef([]);
  const [notifyMode, setNotifyMode] = useState('0010');
  const [notifyModeText, setNotifyModeText] = useState('팔린 매물');
  const [defaultVal, setDefaultVal] = useState(2);
  const [confirmTitle, setConfirmTitle] = useState();
  const [confirmContent, setConfirmContent] = useState();
  const [errAlert, setAlertText] = useState();
  const [isNotify, setIsNotify] = useState(false);
  const [formData, setFormData] = useState({
    dlrPrdId: falseInfo.dlrPrdId,   // 딜러상품ID
    rptrId: '',                     // 신고자ID -- 서버단에서 자동입력
    slrId: falseInfo.slrId,         // 판매자ID -- 상품 판매자 ID
    falsSogRptTpcd: notifyMode,     // 신고구분코드
    answRcvYn: 'N',                 // ?신고답변수신여부
    rcvEmlAddrEnc: '',              // ?신고답변받을 이메일
    falsSogTpcdList: [],            // ?신고허위항목(체크박스 목록)
    rptTtlNm: '',                   // ?신고제목
    rptCntn: '',                    // ?신고내용
    falsSogTpcd: ''
  });
  // const [dep2Panel, setDep2Panel] = useState(0);
  const handleTitle = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, rptTtlNm: value }));
  }, []);
  const handleContents = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, rptCntn: value }));
  }, []);
  const tabDep1Click = useCallback((e, idx) => {
    const confirmId = "00" + (idx + 1).toString() + "0";
    setNotifyMode(confirmId);
    switch (idx) {
      case 0: // 팔린매물
        checkArrRef.current = [];
        setNotifyModeText('팔린매물');
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: confirmId, rptTtlNm: '', rptCntn: '', falsSogTpcdList: [] }));
        break;

      case 1: // 정보허위
        setNotifyModeText('정보허위차량');
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: confirmId, rptTtlNm: '', rptCntn: '' }));
        break;

      case 2: // 자동차세
        checkArrRef.current = [];
        setNotifyModeText('자동차세');
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: confirmId, falsSogTpcdList: [] }));
        break;
    }
  }, [notifyMode]);
  // const tabDep2Click = useCallback((e, idx) => {
  //   setDep2Panel(idx);
  // }, []);
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);
  const handleNotify = useCallback(
    (e) => {
      e.preventDefault();

      if (!isValidFormData(formData)) {
        setMpop(true);
        return;
      }

      axiosPost(`/api/api/buycar/insertReportFakeCar.do`, formData)
        .then((res) => {
          setIsNotify(true); // 신고 완료 팝업
          setMpop(true);
        })
        .catch(() => {
          setConfirmTitle('신고 에러');
          setConfirmContent('일시적인 에러입니다. 잠시후 다시하여 주십시오.');
          setMpop(true);
        });
    },
    [formData, errAlert]
  );

  const isValidFormData = (fd) => {
    let flag = true;
    if (!fd.answRcvYn) {
      flag = false;
      setConfirmTitle('동의 여부체크');
      setConfirmContent('동의/미동의 여부를 체크해야합니다.');
    }
    if (fd.answRcvYn === 'Y' && !isEmail(fd.rcvEmlAddrEnc)) {
      flag = false;
      setConfirmTitle('유효하지 않은 이메일');
      setConfirmContent('유효하지 않은 이메일양식 입니다.');
    }
    if (fd.falsSogRptTpcd === '0020') {
      if (fd.falsSogTpcdList.length === 0) {
        flag = false;
        setConfirmTitle('항목선택');
        setConfirmContent('최소한 한 개의 항목을 선택해주세요.');
      }
    } else if (fd.falsSogRptTpcd === '0030') {
      if (!fd.rptTtlNm) {
        flag = false;
        setConfirmTitle('제목입력');
        setConfirmContent('제목을 입력하세요.');
      }
      if (!fd.rptCntn) {
        flag = false;
        setConfirmTitle('내용입력');
        setConfirmContent('내용을 입력하세요.');
      }
      if (fd.rptTtlNm.length > 30) {
        flag = false;
        setConfirmTitle('입력제한');
        setConfirmContent('제목은 30자까지 입력가능합니다.');
      }
      if (fd.rptCntn.length > 200) {
        flag = false;
        setConfirmTitle('입력제한');
        setConfirmContent('내용은 200자까지 입력가능합니다.');
      }
    }
    return flag;
  };

  const handleCheck = useCallback((e, isChecked) => {
    //클릭된 체크박스 아이디를 배열에 입력/삭제
    const checkBoxName = e.target.name;

    checkArrRef.current = checkArrRef.current.includes(checkBoxName) ? checkArrRef.current.filter((e) => e !== checkBoxName) : [...checkArrRef.current, checkBoxName];
    setFormData((prev) => ({ ...prev, falsSogTpcdList: [...checkArrRef.current] }));
  }, []);

  const handleEmail = useCallback((e) => {
    const value = e.target.value;
    console.log(value);
    setFormData((prev) => ({ ...prev, rcvEmlAddrEnc: value }));
  }, []);

  const [agreeReply, setAgreeReply] = useState(false);
  const handleAgreeChange = useCallback((e) => {
    setDefaultVal(Number(e.target.value));
    const isAgree = Number(e.target.value) === 1;
    setAgreeReply(isAgree);
    setFormData((prev) => ({ ...prev, answRcvYn: isAgree ? 'Y' : 'N', rcvEmlAddrEnc: isAgree ? prev.rcvEmlAddrEnc : '' }));
  }, []);

  const handleErrorClick = (e) => {
    e.preventDefault();
    setMpop(false);
  }

  const handleCompleteClick = (e) => {
    e.preventDefault();
    setMpop(false);
    if (callback) {
      callback('ok', e);
    }
  }

  console.log('FM007List >', FM007List);
  console.log('default value', defaultVal);

  return (
    <>
      <div className="content-wrap false-report-car">
        <h3>신고차량</h3>
        <table summary="1년분" className="table-tp1">
          <caption className="away">신고차량</caption>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <tbody>
            <tr>
              <th>등록번호</th>
              <td>{falseInfo.slrId}</td>
            </tr>
            <tr>
              <th>신고차량번호</th>
              <td>{falseInfo.rptCarNo}</td>
            </tr>
            <tr>
              <th>차량정보</th>
              <td>{falseInfo.rptCarNm}</td>
            </tr>
          </tbody>
        </table>
        <ul className="desc-list">
          <li>
            고객님께서 허위매물로 인한 피해를 신고해주세요.<br />
          (신고내용은 비공개입니다.)
          </li>
        </ul>
      </div>
      <div className="content-wrap false-report-sale">
        <h3>신고매물</h3>
        <TabMenu type="type1" mount={false} callBack={tabDep1Click} isFix={false} defaultTab={0}>
          <TabCont tabTitle="팔린매물" id="tab1-1" index={0}>
          </TabCont>
          <TabCont tabTitle="정보허위차량" id="tab1-2" index={1}>
            <p className="tx-tp2 mt16 mb16">정보 허위 유형을 선택해주세요 (복수 선택 가능)</p>
            <ul className="false-chk-list">
              {!isEmpty(FM007List) &&
                FM007List.map((chkBox, i) => (
                  <li key={i}><CheckBox id={`ss-chk${i + 1}`} title={chkBox.cdNm} name={chkBox.cdId} checked={false} onChange={handleCheck} /></li>
                ))
              }

            </ul>
          </TabCont>
          <TabCont tabTitle="기타신고" id="tab1-3" index={2}>
            <fieldset className="write-form">
              <legend>기타신고</legend>
              <div className="field-group">
                <div className="category mt16"><label htmlFor="etc-report-subject">제목</label></div>
                <div className="field">
                  <Input type="text" countLimit={30} id="etc-report-subject" placeHolder="제목을 입력해주세요.(최대30자)" height={38} onChange={handleTitle} />
                </div>
              </div>
              <div className="field-group">
                <div className="category"><label htmlFor="etc-report-content">내용</label></div>
                <div className="field">
                  <Textarea countLimit={200} type="tp1" placeHolder="신고사유를 입력해주세요. (최대200자)" onChange={handleContents} />
                </div>
              </div>
            </fieldset>
          </TabCont>
        </TabMenu>
        <div className="false-report-reply">
          <p className="user-agree">
            신고 내용에 대한 답변을 받으시겠습니까??<br />
            (마이페이지 &gt; 허위매물 신고에서 확인)
          </p>
          <RadioGroup
            defaultValue={defaultVal}
            dataList={[
              { id: 'chk-areee', value: 1, checked: false, disabled: false, label: '동의' },
              { id: 'chk-disagree', value: 2, checked: false, disabled: false, label: '미동의' }
            ]}
            className="chk"
            onChange={handleAgreeChange}
          ></RadioGroup>
          {
            agreeReply === true &&
            <>
              <p className="user-email-address"><Input type="text" id="report-user-email" placeHolder="이메일 주소를 입력해주세요." height={38} onChange={handleEmail} /></p>
            </>
          }
        </div>
      </div>
      <Button size="full" background="blue80" className="fixed" title="신고하기" onClick={handleNotify} />

      {
        isNotify == false && (
          <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="tit1">{confirmTitle}</p>
              <p>{confirmContent}</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleErrorClick} />
              </Buttons>
            </div>
          </RodalPopup>
        )
      }
      {
        isNotify == true && (
          <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="tit1">허위매물 신고가 접수되었습니다</p>
              <p>(신고내용 : {notifyModeText})</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleCompleteClick} />
              </Buttons>
            </div>
          </RodalPopup>
        )
      }
    </>
  )
}

export default MobFalseSaleReport;