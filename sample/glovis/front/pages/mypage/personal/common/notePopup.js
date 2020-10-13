/**
 * 설명 : 쪽지 상담 내용보기
 * @fileoverview 딜러마이페이지>쪽지상담 내역
 * @requires [counselCarAction,counselCar]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import { produce } from 'immer';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';
import { gInfoLive } from '@src/utils/LoginUtils';

/**
 * 설명 : 쪽지 상담 내용을 조회 하고 등록한다.
 * @param {state.counselCar.counselCarList} 쪽지 상담내용
 * @returns {NotePopup} 쪽지 상담내용 조회/등록
 */
const NotePopup = ({ show = false, onChange, value = {} }) => {
  const [counselCar, SetCounselCar] = useState({});
  const { dlrPrdId, mbId, rgstId } = value;
  useEffect(() => {
    // dlrPrdId = 'DP20022000001';
    // mbId = 'DDDDDD2';
    axiosGet(`/api/mypage/dealer/selectMyCounselCarDetail.do?dlrPrdId=${dlrPrdId}&mbId=${mbId}&rgstId=${rgstId}&type=member`).then((payload) => {
      SetCounselCar(payload.data.data);
    });
  }, [value]);

  const dispatch = useDispatch();
  const endRef = useRef(null);

  //const counselCarList = useSelector((state) => state.counselCar.counselCarList);
  //const counselCar = _.find(counselCarList, ['counselId', value]);

  const [popupShow, setPopupShow] = useRodal(show);
  const [noteText, setNoteText] = useState('');

  const scrollToBottom = () => {
    //endRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const modalClose = useCallback(
    (e) => {
      setNoteText('');
      if (onChange) onChange(e);
    },
    [onChange]
  );

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
          SetCounselCar(
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

      // dispatch(
      //   setNote({
      //     counselId: value,
      //     noteNo: null,
      //     senderId: userId,
      //     noteCntn: noteText,
      //     recipientId: 'memberId',
      //     sentDt: moment().format('YYYY-MM-DD HH:mm')
      //   })
      // );
      setNoteText('');
    },
    [dispatch, noteText, value]
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

  useEffect(() => {
    setPopupShow(show);
  }, [setPopupShow, show]);

  useEffect(scrollToBottom, [counselCar]);

  return (
    <RodalPopup show={popupShow} type={'slideUp'} closedHandler={modalClose} mode="normal" width={400}>
      <div className="popup-chat">
        <div className="chat-tit">
          <i className="ico-chat" />
          {!isEmpty(counselCar) && (
            <>
              <p>{counselCar.crNm}</p>
              <br />
              <p style={{ paddingLeft: 'inherit' }}>&nbsp;{counselCar.crNo}</p>
            </>
          )}
          <button className="ico-close-white" onClick={modalClose} />
        </div>
        <div className="chat-list-wrap" style={{ height: '560px', overflowY: 'auto' }}>
          {!isEmpty(counselCar) &&
            counselCar.noteCnslLstIng.map((note, index) => {
              return (
                <div className={note.rgstId === gInfoLive().id ? 'right' : 'left'} key={index}>
                  <div className="chat-cont" style={note.rgstId === gInfoLive().id ? { paddingLeft: '100px', float: 'none' } : { paddingRight: '100px', float: 'none' }}>
                    <span>{moment(note.regDt, 'YYYYMMDDHHmmss').format('MM월DD일 A hh:mm')}</span>
                    <p>
                      {note.noteCntn.split('\n').map((item, index) => {
                        return (
                          <span key={index} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all' }}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          <div ref={endRef} />
        </div>
        <div className="chat-input">
          <Textarea type="tp1" height={96} data={noteText} onChange={noteTextChange} onKeyPress={onKeyEvnent} countLimit={400} />
          <Button size="big" background="blue80" radius={true} title="전송" width={68} height={68} onClick={sentNote} />
        </div>
      </div>
    </RodalPopup>
  );
};

NotePopup.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.object
};

export default NotePopup;
