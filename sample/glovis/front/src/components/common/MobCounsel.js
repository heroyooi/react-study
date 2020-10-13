import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { produce } from 'immer';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

import { objIsEmpty } from '@src/utils/CommonUtil';
import { gInfoLive } from '@src/utils/LoginUtils';

const MobCounsel = ({ value = {} }) => {
  const [counselCar, setCounselCar] = useState({});
  const { dlrPrdId, mbId, rgstId } = value;
  const [noteText, setNoteText] = useState('');

  const dispatch = useDispatch();
  const calcH = useState(60);

  useEffect(() => {
    // dlrPrdId = 'DP20022000001';
    // mbId = 'DDDDDD2';

    axiosGet(`/api/mypage/dealer/selectMyCounselCarDetail.do?dlrPrdId=${dlrPrdId}&mbId=${mbId}&rgstId=${rgstId}&type=member`).then((payload) => {
      setCounselCar(payload.data.data);
    });
  }, [value]);

  const noteTextChange = useCallback((e) => {
    setNoteText(e.target.value);
  }, []);

  const sentNote = useCallback(
    (e) => {
      e.preventDefault();
      const params = {
        dlrPrdId,
        mbId,
        noteCntn: noteText
      };
      console.log('params');
      console.log(params);
      axiosPost(`/api/mypage/dealer/saveMyCounselCar.do`, params).then((payload) => {
        if (payload.data.statusinfo.returncd === '000') {
          setCounselCar(
            produce((draft) => {
              draft.noteCnslLstIng.push({
                rgstId: gInfoLive().id ? gInfoLive().id : 'test',
                regDt: moment().format('YYYY-MM-DD A hh:mm'),
                noteCntn: noteText
              });
            })
          );
        }
      });
      setNoteText('');
    },
    [dlrPrdId, mbId, noteText]
  );

  const onKeyEvnent = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return '\n';
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value !== '') {
        sentNote(e);
      }
    }
  };
  return (
    <>
      <div className="content-sec dealer-chat-wrap">
        {!objIsEmpty(counselCar) && (
          <div className="bg-blue80">
            <p>
              {counselCar.crNm}
              <span>{counselCar.crNo}</span>
            </p>
          </div>
        )}
        <div className="chat-list-wrap time">
          {!objIsEmpty(counselCar) &&
            counselCar.noteCnslLstIng.map((note, index) => {
              return (
                <div className={note.rgstId === gInfoLive().id ? 'right' : 'left'} key={index}>
                  <p>
                    {note.noteCntn.split('\n').map((item, i) => {
                      return (
                        <span key={i}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                    <span className="time">{moment(note.regDt, 'YYYYMMDDHHmmss').format('MM월DD일 A hh:mm')}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <MobBottomArea isFix={true} isSimple={true}>
        <div className="chat">
          <Textarea type="tp1" placeHolder="답변을 입력해주세요." height="60" mode="chat" data={noteText} onChange={noteTextChange} onKeyPress={onKeyEvnent} countLimit={400} />
          <Buttons align="right">
            <Button size="sml" background="blue80" radius={true} title="입력" width={88} height={30} onClick={sentNote} />
          </Buttons>
        </div>
      </MobBottomArea>
    </>
  );
};

MobCounsel.prototype = {
  value: PropTypes.object
};

export default MobCounsel;
