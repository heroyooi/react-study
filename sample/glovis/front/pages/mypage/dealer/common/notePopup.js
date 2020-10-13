/**
 * 설명 : 쪽지 상담 내용보기
 * @fileoverview 딜러마이페이지>쪽지상담 내역
 * @requires [counselCarAction,counselCar]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, map, groupBy } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import { produce } from 'immer';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { gInfoLive } from '@src/utils/LoginUtils';
/**
 * 설명 : 쪽지 상담 내용을 조회 하고 등록한다.
 * @param {state.counselCar.counselCarList} 쪽지 상담내용
 * @returns {NotePopup} 쪽지 상담내용 조회/등록
 */
const NotePopup = ({ show = false, onChange, value = {} }) => {
  moment.locale('ko');
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [counselCar, SetCounselCar] = useState({});
  const [counselCarGrp, setCounselCarGrp] = useState({});
  const { dlrPrdId, mbId } = value;

  const endRef = useRef(null);

  const [popupShow, setPopupShow] = useRodal(show);
  const [noteText, setNoteText] = useState('');
  const [calcH, setCalcH] = useState(60);
  const [triggerFocus, setTriggerFocus] = useState(false);

  const scrollToBottom = () => {
    // endRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const modalClose = useCallback(
    (e) => {
      setNoteText('');
      //setPopupShow(false);
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
      axiosPost(`/api/mypage/dealer/saveMyCounselCar.do`, params).then((payload) => {
        if (payload.data.statusinfo.returncd === '000') {
          SetCounselCar(
            produce((draft) => {
              draft.noteCnslLstIng.push({
                rgstId: gInfoLive().id ? gInfoLive().id : 'test',
                regDt: moment().format('YYYYMMDDHHmmss'),
                noteCntn: noteText
              });
            })
          );
        }
      });
      setNoteText('');
      setCalcH(60);
      setTriggerFocus(prev => !prev);
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

  useEffect(() => {
    axiosGet(`/api/mypage/dealer/selectMyCounselCarDetail.do?dlrPrdId=${dlrPrdId}&mbId=${mbId}&type=dealer`).then((payload) => {
      SetCounselCar(payload.data.data);
    });
  }, [dlrPrdId, mbId]);

  useEffect(() => {
    if (!isEmpty(counselCar) && !isEmpty(counselCar.noteCnslLstIng)) {
      console.log('::: counselCar', counselCar);
      setCounselCarGrp(
        groupBy(counselCar.noteCnslLstIng, function(o) {
          return o.regDt.substring(0, 8);
        })
      );
    }
  }, [counselCar]);

  useEffect(() => {
    setPopupShow(show);
  }, [setPopupShow, show]);

  useEffect(scrollToBottom, [counselCar]);

  useEffect(() => {
    if (hasMobile) {
      setTimeout(() => {
        document.querySelector('.fp-wrap .fp-content').scrollTo(
          0,
          document.querySelector('.fp-wrap .dealer-chat-wrap').clientHeight
        );
      }, 400);
    }
  }, [dlrPrdId, mbId, noteText])

  
  const onKeyUpTextarea = useCallback(
    (e) => {
      const row = e.target.textContent.split("\n").length;
      setCalcH(row <= 3 ? 40 + 20*row : 100);
    },
    []
  );

  if (hasMobile) {
    return (
      <>
        <div className="content-sec dealer-chat-wrap">
          {!isEmpty(counselCar) && (
            <div className="bg-blue80">
              <p>
                {counselCar.crNm}
                <span>{counselCar.crNo}</span>
              </p>
            </div>
          )}
          <div className="chat-list-wrap time">
            {!isEmpty(counselCarGrp) &&
              map(counselCarGrp, function(v, i) {
                return (
                  <React.Fragment key={i}>
                    <div className="center" key={i + '_'}>
                      <span>{moment(i, 'YYYYMMDD').format('YYYY년 MM월 DD일')}</span>
                    </div>
                    {map(counselCarGrp[i], function(note, j) {
                      return (
                        <div key={i + '_' + j} className={note.rgstId === gInfoLive().id ? 'right' : 'left'}>
                          <p>
                            {note.noteCntn.split('\n').map((item, k) => {
                              return (
                                <span key={i + '_' + j + '_' + k}>
                                  {item}
                                  <br />
                                </span>
                              );
                            })}
                            <span className="time">{moment(note.regDt, 'YYYYMMDDHHmmss').format('A hh:mm')}</span>
                          </p>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
        <MobBottomArea isFix={true} isSimple={true}>
          <div className="chat">
            <Textarea type="tp1" height={60} mode="chat" data={noteText} onChange={noteTextChange} onKeyPress={onKeyEvnent} countLimit={400} height={calcH} onKeyUp={onKeyUpTextarea} triggerFocus={triggerFocus} />
            <Buttons align="right">
              <Button size="sml" background="blue80" radius={true} title="전송" width={88} height={30} onClick={sentNote} />
            </Buttons>
          </div>
        </MobBottomArea>
      </>
    );
  }

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
          {!isEmpty(counselCarGrp) &&
            map(counselCarGrp, function(v, i) {
              return (
                <React.Fragment key={i}>
                  <div className="center" key={i + '_'}>
                    <span>{moment(i, 'YYYYMMDD').format('YYYY년 MM월 DD일')}</span>
                  </div>
                  {map(counselCarGrp[i], function(note, j) {
                    return (
                      <div key={i + '_' + j} className={note.rgstId !== mbId ? 'right' : 'left'}>
                        <div className="chat-cont" style={note.rgstId !== mbId ? { paddingLeft: '100px', float: 'none' } : { paddingRight: '100px', float: 'none' }}>
                          <span className="time">{moment(note.regDt, 'YYYYMMDDHHmmss').format('A hh:mm')}</span>
                          <p>
                            {note.noteCntn.split('\n').map((item, k) => {
                              return (
                                <span key={i + '_' + j + '_' + k} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all', marginBottom: 0 }}>
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
                </React.Fragment>
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
