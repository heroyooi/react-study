import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { produce } from 'immer';

import { axiosPost } from '@src/utils/HttpUtils';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * @module CounselMessage
 * @desc 1:1 쪽지상담 팝업
 * @author 왕태식
 * @param  {Boolean} props.counselPopupShow - RodalPopup의 활성화 여부
 * @param  {Function} props.setCounselPopupShow - 버튼으로 RodalPopup 닫는 콜백함수
 * @param  {Function} props.closeCounselPopup - RodalPopup의 closedHandler prop 에 적용되어 RodalPopup 닫는 콜백함수
 * @param  {Object} props.CounselInfo - { dlrPrdId: 딜러상품ID, recipientId: 딜러명(딜러소속회사명) }
 */
const CounselMessage = ({ counselPopupShow, setCounselPopupShow, closeCounselPopup, CounselInfo }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isLoading, setIsLoading] = useState(false); // 로딩 Spinner show/hide 여부
  const [sendMsg, setSendMsg] = useState(false);
  const [errorPopupShow, setErrorPopupShow, openErrorPopup, closeErrorPopup] = useRodal(false, true);
  const [rodalText, setRodalText] = useState('');
  console.log('CounselInfo::::::::::::::::::::::::::::::::::::::', CounselInfo);
  const [formData, setFormData] = useState({
    mbId: CounselInfo.dlrId,
    dlrPrdId: CounselInfo.dlrPrdId, // 딜러상품ID
    recipientId: CounselInfo.recipientId, //딜러명(딜러소속회사명)
    noteCntn: '' // 쪽지내용
  });

  const handleContents = (e) => {
    const value = e.target.value;
    // setFormData((prev) => ({ ...prev, noteCntn: value }));
    setFormData(
      produce((draft) => {
        draft.noteCntn = value;
        draft.mbId = CounselInfo.dlrId;
        draft.recipientId = CounselInfo.recipientId;
      })
    );
  };

  useEffect(() => {
    console.log('formData:::::::::::::::::::::', formData);
  }, [formData]);

  const handleCloseCounsel = useCallback((e) => {
    e.preventDefault();
    setCounselPopupShow(false);
    setTimeout(() => {
      setSendMsg(false); // 쪽지상담 여러 번 입력 가능하도록
    }, 1000);
    preventScroll(false);
  }, []);

  const handleMsg = useCallback(
    (e) => {
      e.preventDefault();
      console.log('formData', formData);
      if (!isValidFormData(formData)) {
        return openErrorPopup(e, 'fade');
      }
      setIsLoading(true);
      axiosPost(`/api/api/buycar/insertMemo.do`, formData)
        .then((res) => {
          setIsLoading(false);
          setSendMsg(true); // 쪽지상담 완료 팝업
        })
        .catch(() => {
          console.log('전송 실패!');
        });
    },
    [formData]
  );

  const isValidFormData = (fd) => {
    let flag = true;
    if (fd.noteCntn.length <= 0) {
      flag = false;
      setRodalText('내용을 입력해주세요.');
    }
    if (fd.noteCntn.length > 400) {
      flag = false;
      setRodalText('내용은 400자까지 입력가능합니다.');
    }
    console.log('is Valid Form Data? = ', flag);
    return flag;
  };

  if (hasMobile) {
    return (
      <RodalPopup show={counselPopupShow} type={'fade'} closedHandler={closeCounselPopup} mode="normal" title="1:1 쪽지 상담" size="small">
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
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
          <div className="inquire-wrap">
            {sendMsg === false ? (
              <>
                <p className="tx-tit">
                  받는 사람<span className="ml20">{CounselInfo.recipientId}</span>
                </p>
                <Textarea countLimit={400} type="tp1" height={320} onChange={handleContents} />
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseCounsel} />
                  <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleMsg} />
                </Buttons>
              </>
            ) : (
              <>
                <div className="co-wrap">
                  <p>
                    <span className="ico-wrap">
                      <i className="ico-counsel" />
                    </span>
                    쪽지가 성공적으로
                    <br />
                    발송되었습니다.
                  </p>
                </div>
                <p className="tx-sub">* 답변은 마이페이지 > 쪽지함 > 받은 쪽지함에서 확인하실 수 있습니다.</p>
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseCounsel} />
                </Buttons>
              </>
            )}
          </div>
        </div>
      </RodalPopup>
    );
  }

  return (
    <RodalPopup show={counselPopupShow} type={'fade'} closedHandler={closeCounselPopup} mode="normal" title="1:1 쪽지 상담" size="small">
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
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
        <div className="inquire-wrap">
          {sendMsg === false ? (
            <>
              <p className="tx-tit">
                받는 사람<span className="ml20">{CounselInfo.recipientId}</span>
              </p>
              <Textarea countLimit={400} type="tp1" height={320} onChange={handleContents} />
              <Buttons align="center" marginTop={40} className="w-line">
                <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseCounsel} />
                <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleMsg} />
              </Buttons>
            </>
          ) : (
            <>
              <div className="co-wrap">
                <p>
                  <span className="ico-wrap">
                    <i className="ico-counsel" />
                  </span>
                  쪽지가 성공적으로
                  <br />
                  발송되었습니다.
                </p>
              </div>
              <p className="tx-sub">* 답변은 마이페이지 > 쪽지함 > 받은 쪽지함에서 확인하실 수 있습니다.</p>
              <Buttons align="center" marginTop={40} className="w-line">
                <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseCounsel} />
              </Buttons>
            </>
          )}
        </div>
      </div>
    </RodalPopup>
  );
};
export default CounselMessage;

CounselMessage.propTypes = {
  counselPopupShow: PropTypes.bool,
  setCounselPopupShow: PropTypes.func,
  closeCounselPopup: PropTypes.func,
  CounselInfo: PropTypes.object
};
