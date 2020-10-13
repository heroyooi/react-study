import React, { useState, useCallback } from 'react';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { axiosPost } from '@src/utils/HttpUtils';

const MobInquire = ({ CounselInfo, callback }) => {
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const [errPop, openErrorPopup] = useRodal(false, true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 Spinner show/hide 여부
  const [sendMsg, setSendMsg] = useState(false);
  const [errorText, setRodalErrorText] = useState('');
  const [formData, setFormData] = useState({
    dlrPrdId: CounselInfo.dlrPrdId, // 딜러상품ID
    recipientId: CounselInfo.recipientId, //딜러명(딜러소속회사명)
    noteCntn: '' // 쪽지내용
  });

  const closeMPop = useCallback(
    (e) => {
      e.preventDefault();
      setMPop(false);
    },
    [setMPop]
  );

  const handleErrorClick = (e) => {
    e.preventDefault();
    openErrorPopup(false);
    if (callback) callback('ng', e);
  };

  const handleClick = (e) => {
    e.preventDefault();
    openMPop(false);
    if (callback) callback('ok', e);
  };

  const handleContents = useCallback(
    (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        dlrPrdId: prev.dlrPrdId,
        recipientId: prev.recipientId,
        noteCntn: value
      }));
      console.log('formData', formData);
    },
    [formData]
  );

  const handleMsg = useCallback(
    (e) => {
      e.preventDefault();
      console.log('formData', formData);
      if (!isValidFormData(formData)) {
        // return openErrorPopup(e, 'fade');
        return openErrorPopup(true);
      }

      setIsLoading(true);
      axiosPost(`/api/api/buycar/insertMemo.do`, formData)
        .then((res) => {
          setIsLoading(false);
          openMPop(true);
        })
        .catch(() => {
          console.log('전송 실패!');
          setRodalErrorText('전송 실패!');
          return openErrorPopup(true);
        });
    },
    [formData]
  );

  const isValidFormData = (fd) => {
    let flag = true;
    console.log('isValidfromdata fd.noteCntn.length', fd.noteCntn.length);
    if (fd.noteCntn.length <= 0 || fd.noteCntn === '') {
      flag = false;
      setRodalErrorText('공백으로는 1:1 쪽지 상담을 전송할 수 없습니다');
    }
    if (fd.noteCntn.length > 400) {
      flag = false;
      setRodalErrorText('내용은 400자까지 입력가능합니다.');
    }
    console.log('is Valid Form Data? = ', flag);
    return flag;
  };

  return (
    <>
      <div className="content-wrap inquire-wrap">
        <p className="tit2">
          받는사람
          <span>{CounselInfo.recipientId}</span>
        </p>
        <p className="tit2 mt24 mb16">문의사항</p>
        <Textarea countLimit={400} type="tp1" height={349} onChange={handleContents} placeHolder="문의사항을 입력해주세요." />
      </div>
      {/* <Button className="fixed" size="full" background="blue80" title="보내기" onClick={(e) => openMPop(e, 'fade')} /> */}
      <Button className="fixed" size="full" background="blue80" title="보내기" onClick={handleMsg} />

      <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isMaskAction={false} isButton={false} subPop={true}>
        <div className="con-wrap">
          <p className="tit1">쪽지가 성공적으로 발송되었습니다.</p>
          <p>답변은 마이페이지 &gt; 쪽지상담 내역에서 확인하실 수 있습니다.</p>
          <Buttons align="right" marginTop={16}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight={500} onClick={handleClick} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={errPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isMaskAction={false} isButton={false} subPop={true}>
        <div className="con-wrap">
          <p className="tit1">[ 오류 내용 ]</p>
          <p>{errorText}</p>
          <Buttons align="right" marginTop={16}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight={500} onClick={handleErrorClick} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

export default MobInquire;
