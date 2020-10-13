import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { getCommonCodeList } from '@src/actions/common/commonCodeAction';

import { axiosPost } from '@src/utils/HttpUtils';
import { isEmail } from '@src/utils/ValidationUtils';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import SelectBox from '@lib/share/items/SelectBox';
import Textarea from '@lib/share/items/Textarea';
import useRodal from '@lib/share/custom/useRodal';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * @module FalseForSaleReport
 * @desc 허위매물신고 팝업
 * @author 한관영
 * @param  {Boolean} props.notifyPopupShow - RodalPopup의 활성화 여부
 * @param  {Function} props.setNotifyPopupShow - 버튼으로 RodalPopup 닫는 콜백함수
 * @param  {Function} props.closeNotifyPopup - RodalPopup의 closedHandler prop 에 적용되어 RodalPopup 닫는 콜백함수
 * @param  {Object} props.falseInfo - { rptCarNo: 차량번호, rptCarNm: 차량정보 풀네임(제조사 모델명 등등) }
 */
const FalseForSaleReport = ({ notifyPopupShow, setNotifyPopupShow, closeNotifyPopup, falseInfo }) => {
  const dispatch = useDispatch();
  const FM006 = 'FM006';
  const FM007 = 'FM007';
  const FM006List = useSelector((state) => state.commonCode.commonCodeList[FM006]);
  const FM007List = useSelector((state) => state.commonCode.commonCodeList[FM007]);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch(getCommonCodeList(FM006)); //허위매물신고 분류 : [팔린매물, 정보허위처량, 기타]
    dispatch(getCommonCodeList(FM007)); //정보허위차량 체크박스 리스트
    // [
    //   {"0030" : 차량정보허위},
    //   {"0080" : 차량정보오류},
    //   {"0060" : 차량실명허위},
    //   {"0020" : 주행거리허위},
    //   {"0070" : 옵션정보허위},
    //   {"0040" : 사고유무오류},
    //   {"0050" : 미끼매물},
    //   {"0010" : 가격허위}
    // ]
  }, [dispatch, FM006, FM007]);
  const checkArrRef = useRef([]);
  const [errorPopupShow, setErrorPopupShow, openErrorPopup, closeErrorPopup] = useRodal(false, true);
  const [rodalText, setRodalText] = useState('');
  const [notifyMode, setNotifyMode] = useState('0010');
  const [notifyModeText, setNotifyModeText] = useState('팔린 매물');
  const [agreeReply, setAgreeReply] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [defaultVal, setDefaultVal] = useState(2);
  const [formData, setFormData] = useState({
    dlrPrdId: falseInfo.dlrPrdId, // 딜러상품ID
    rptrId: '', //신고자ID -- 서버단에서 자동입력
    slrId: falseInfo.slrId, //판매자ID -- 상품 판매자 ID
    falsSogRptTpcd: notifyMode, //신고구분코드
    answRcvYn: 'N', // ?신고답변수신여부
    rcvEmlAddrEnc: '', // ?신고답변받을 이메일
    falsSogTpcdList: [], // ?신고허위항목(체크박스 목록)
    rptTtlNm: '', // ?신고제목
    rptCntn: '', // ?신고내용
    falsSogTpcd: ''
  });
  const handleSelect = useCallback((e) => {
    setNotifyMode(e.value);
    // setFormData((prev) => ({ ...prev, falsSogRptTpcd: Number(e.value) }));
    switch (e.value) {
      case '0010': //팔린 매물
        checkArrRef.current = [];
        setNotifyModeText(e.label);
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: e.value, rptTtlNm: '', rptCntn: '', falsSogTpcdList: [] }));
        break;
      case '0020': //정보 허위: 체크박스 id 배열
        setNotifyModeText(e.label);
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: e.value, rptTtlNm: '', rptCntn: '' }));
        break;
      case '0030': //기타: input * 2
        checkArrRef.current = [];
        setNotifyModeText(e.label);
        setFormData((prev) => ({ ...prev, falsSogRptTpcd: e.value, falsSogTpcdList: [] }));
        break;
      default:
        break;
    }
  }, []);

  const handleTitle = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, rptTtlNm: value }));
  }, []);
  const handleContents = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, rptCntn: value }));
  }, []);
  const handleEmail = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, rcvEmlAddrEnc: value }));
  }, []);
  const handleCheck = useCallback((checkBoxId, checkBoxName) => {
    //클릭된 체크박스 아이디를 배열에 입력/삭제
    console.log('checkBoxName', checkBoxName);

    checkArrRef.current = checkArrRef.current.includes(checkBoxName) ? checkArrRef.current.filter((e) => e !== checkBoxName) : [...checkArrRef.current, checkBoxName];
    setFormData((prev) => ({ ...prev, falsSogTpcdList: [...checkArrRef.current] }));
  }, []);

  const handleAgreeChange = useCallback((e) => {
    setDefaultVal(Number(e.target.value));
    const isAgree = Number(e.target.value) === 1;
    setAgreeReply(isAgree);
    setFormData((prev) => ({ ...prev, answRcvYn: isAgree ? 'Y' : 'N', rcvEmlAddrEnc: isAgree ? prev.rcvEmlAddrEnc : '' }));
  }, []);

  const handleCloseNotify = useCallback((e) => {
    e.preventDefault();
    setNotifyPopupShow(false);
    preventScroll(false);
  }, []);

  const handleNotify = useCallback(
    (e) => {
      e.preventDefault();
      if (!isValidFormData(formData)) {
        return openErrorPopup(e, 'fade');
      }
      axiosPost(`/api/api/buycar/insertReportFakeCar.do`, formData)
        .then((res) => {
          console.log('전송 데이터 : ', formData);
          console.log('받아온 결과 : ', res);
          setIsNotify(true); // 신고 완료 팝업
        })
        .catch(() => {
          console.log('전송 실패!');
        });
    },
    [formData]
  );

  const isValidFormData = (fd) => {
    let flag = true;
    if (!fd.answRcvYn) {
      flag = false;
      setRodalText('동의/미동의 여부를 체크해야합니다.');
    }
    if (fd.answRcvYn === 'Y' && !isEmail(fd.rcvEmlAddrEnc)) {
      flag = false;
      setRodalText('유효하지 않은 이메일양식 입니다.');
    }
    if (fd.falsSogRptTpcd === '0020') {
      if (fd.falsSogTpcdList.length === 0) {
        flag = false;
        setRodalText('최소한 한 개의 항목을 선택해주세요.');
      }
    } else if (fd.falsSogRptTpcd === '0030') {
      if (!fd.rptTtlNm) {
        flag = false;
        setRodalText('제목을 입력하세요.');
      }
      if (!fd.rptCntn) {
        flag = false;
        setRodalText('내용을 입력하세요.');
      }
      if (fd.rptTtlNm.length > 30) {
        flag = false;
        setRodalText('제목은 30자까지 입력가능합니다.');
      }
      if (fd.rptCntn.length > 200) {
        flag = false;
        setRodalText('내용은 200자까지 입력가능합니다.');
      }
    }
    return flag;
  };

  if (hasMobile) {
    return (
      <RodalPopup show={notifyPopupShow} type={'fade'} closedHandler={closeNotifyPopup} mode="normal" title="허위 매물 신고" size="small">
        <RodalPopup show={errorPopupShow} type={'fade'} closedHandler={closeErrorPopup} mode="normal" title="유효하지 않은 입력입니다." size="small">
          <div className="con-wrap compact">
            <h4>{rodalText}</h4>
            <Buttons align="center" marginTop={40} className="w-line">
              <Button
                size="big"
                background="blue80"
                title="확인"
                width={180}
                height={60}
                onClick={(e) => {
                  e.preventDefault();
                  setErrorPopupShow(false);
                }}
              />
            </Buttons>
          </div>
        </RodalPopup>
        <div className="popup-inquire">
          {isNotify === false && (
            <>
              <div className="inquire-wrap top">
                <table summary="허위 매물 신고 차량 정보에 대한 내용" className="table-tp1">
                  <caption className="away">허위 매물 신고 차량</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="72%" />
                  </colgroup>
                  <tbody>
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
                <p className="tx-sub">
                  고객님께서 허위매물로 인한 피해를 신고해주세요.
                  <br />
                  (신고내용은 비공개입니다.)
                </p>
              </div>
              <div className="popup-bg">
                <div className="tit">
                  <label htmlFor="notify">신고내용</label>
                  {!isEmpty(FM006List) && <SelectBox id="notify" className="items-sbox" value={notifyMode} options={FM006List} width="100%" height={48} onChange={handleSelect} />}
                </div>
                {notifyMode === '0020' && (
                  <div className="con chk">
                    <p>항목 (다중 선택 가능)</p>
                    <ul className="chk-info-wrap">
                      {!isEmpty(FM007List) &&
                        FM007List.map((chkBox, i) => (
                          <CheckBoxItem key={i * 9} id="chk-price" name={chkBox.value} checked={false} onChange={handleCheck}>
                            <p>{chkBox.label}</p>
                          </CheckBoxItem>
                        ))}
                    </ul>
                  </div>
                )}
                {notifyMode === '0030' && (
                  <div className="con text">
                    <Input type="text" id="title" placeHolder="제목을 입력하세요" onChange={handleTitle} />
                    <Textarea countLimit={200} type="tp1" height={140} onChange={handleContents} />
                  </div>
                )}
              </div>
              <div className="inquire-wrap bottom">
                <ul className="float-wrap">
                  <li>
                    <p>신고 내용에 대한 답변을 받으시겠습니까?</p>
                  </li>
                  <li>
                    <RadioGroup
                      defaultValue={defaultVal}
                      dataList={[
                        { id: 'chk-agree', value: 1, checked: false, disabled: false, title: '동의' },
                        { id: 'chk-disagree', value: 2, checked: false, disabled: false, title: '미동의' }
                      ]}
                      onChange={handleAgreeChange}
                    />
                  </li>
                </ul>
                {agreeReply === true && (
                  <>
                    <label htmlFor="email" className="hide">
                      이메일
                    </label>
                    <Input type="text" id="email" placeHolder="이메일을 입력해주세요." onChange={handleEmail} />
                  </>
                )}
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseNotify} />
                  <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleNotify} />
                </Buttons>
              </div>
            </>
          )}
          {isNotify === true && (
            <div className="inquire-wrap">
              <p className="tx-co">
                허위매물 신고가 접수되었습니다
                <br />
                <span>(신고내용 : {notifyModeText})</span>
              </p>
              <Buttons align="center" marginTop={40} className="w-line">
                <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseNotify} />
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>
    );
  }

  return (
    <RodalPopup show={notifyPopupShow} type={'fade'} closedHandler={closeNotifyPopup} mode="normal" title="허위 매물 신고" size="small">
      <RodalPopup show={errorPopupShow} type={'fade'} closedHandler={closeErrorPopup} mode="normal" title="유효하지 않은 입력입니다." size="small">
        <div className="con-wrap compact">
          <h4>{rodalText}</h4>
          <Buttons align="center" marginTop={40} className="w-line">
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={180}
              height={60}
              onClick={(e) => {
                e.preventDefault();
                setErrorPopupShow(false);
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>
      <div className="popup-inquire">
        {isNotify === false && (
          <>
            <div className="inquire-wrap top">
              <table summary="허위 매물 신고 차량 정보에 대한 내용" className="table-tp1">
                <caption className="away">허위 매물 신고 차량</caption>
                <colgroup>
                  <col width="28%" />
                  <col width="72%" />
                </colgroup>
                <tbody>
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
              <p className="tx-sub">
                고객님께서 허위매물로 인한 피해를 신고해주세요.
                <br />
                (신고내용은 비공개입니다.)
              </p>
            </div>
            <div className="popup-bg">
              <div className="tit">
                <label htmlFor="notify">신고내용</label>
                {!isEmpty(FM006List) && <SelectBox id="notify" className="items-sbox" value={notifyMode} options={FM006List} width="100%" height={48} onChange={handleSelect} />}
              </div>
              {notifyMode === '0020' && (
                <div className="con chk">
                  <p>항목 (다중 선택 가능)</p>
                  <ul className="chk-info-wrap">
                    {!isEmpty(FM007List) &&
                      FM007List.map((chkBox, i) => (
                        <CheckBoxItem key={i * 9} id="chk-price" name={chkBox.value} checked={false} onChange={handleCheck}>
                          <p>{chkBox.label}</p>
                        </CheckBoxItem>
                      ))}
                  </ul>
                </div>
              )}
              {notifyMode === '0030' && (
                <div className="con text">
                  <Input type="text" id="title" placeHolder="제목을 입력하세요" onChange={handleTitle} maxLength={30} />
                  <Textarea countLimit={200} type="tp1" height={140} onChange={handleContents} />
                </div>
              )}
            </div>
            <div className="inquire-wrap bottom">
              <ul className="float-wrap">
                <li>
                  <p>신고 내용에 대한 답변을 받으시겠습니까?</p>
                </li>
                <li>
                  <RadioGroup
                    defaultValue={defaultVal}
                    dataList={[
                      { id: 'chk-agree', value: 1, checked: false, disabled: false, title: '동의' },
                      { id: 'chk-disagree', value: 2, checked: false, disabled: false, title: '미동의' }
                    ]}
                    onChange={handleAgreeChange}
                  />
                </li>
              </ul>
              {agreeReply === true && (
                <>
                  <label htmlFor="email" className="hide">
                    이메일
                  </label>
                  <Input type="text" id="email" placeHolder="이메일을 입력해주세요." onChange={handleEmail} />
                </>
              )}
              <Buttons align="center" marginTop={40} className="w-line">
                <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseNotify} />
                <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleNotify} />
              </Buttons>
            </div>
          </>
        )}
        {isNotify === true && (
          <div className="inquire-wrap">
            <p className="tx-co">
              허위매물 신고가 접수되었습니다
              <br />
              <span>(신고내용 : {notifyModeText})</span>
            </p>
            <Buttons align="center" marginTop={40} className="w-line">
              <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseNotify} />
            </Buttons>
          </div>
        )}
      </div>
    </RodalPopup>
  );
};

FalseForSaleReport.propTypes = {
  notifyPopupShow: PropTypes.bool,
  setNotifyPopupShow: PropTypes.func,
  closeNotifyPopup: PropTypes.func,
  falseInfo: PropTypes.object
};

export default FalseForSaleReport;
