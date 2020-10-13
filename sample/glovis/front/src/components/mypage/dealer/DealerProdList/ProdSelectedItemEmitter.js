import React, { useState, createContext, useMemo, memo, useCallback, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
//import { FilterSelectorContext } from '@src/components/mypage/dealer/DealerProdList/ProdFilterSelector';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';

import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';

import UpdateProdPop from '@src/components/mypage/dealer/DealerProdList/prodPopup/UpdateProdPop';
import DeleteProdPop from '@src/components/mypage/dealer/DealerProdList/prodPopup/DeleteProdPop';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateProdCarDelete } from '@src/api/mypage/dealer/dealerProdApi';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { preventScroll } from '@src/utils/CommonUtil';

const ProdSelectedItemEmitter = ({ checkAll, params, eventHandler, updatePass, items = [], popupHandler }) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [displayDeletePop, setDisplayDeletePop, showDeletePop, hideDeletePop] = useRodal(false, true);
  const [displayUpdatePop, setDisplayUpdatePop, showUpdatePop, hideUpdatePop] = useRodal(false, true);
  const [movePop, setMovePop, openMovePop, closeDimmMovePop] = useRodal(false);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  //const { handleFullpagePopup } = useContext(DealerContext); // popupHandler
  //const { openMovePop, handleDeletePop } = useContext(FilterSelectorContext);

  const createBodyPortal = useCreatePortalInBody(null, 'wrap');

  const emitWithSelectedItem = (e) => {
    let { name, tagName, children } = e.target;

    if (tagName === 'SPAN') {
      name = Array.from(children).find((target) => target.name)?.name ?? '';
    }

    console.log('emitWithSelectedItem -> name', name);

    if (name === 'update') {
      showUpdatePop(e, 'slideUp');
    } else {
      if (items.length > 0) {
        if (name === 'delete') {
          if (hasMobile) handleDeletePop(e);
          else showDeletePop(e, 'slideUp');
        } else if (name === 'waiting') {
	        showLoader();
          const filtered = items.filter(
            (item) =>
              !!item?.dlrPrdAdLstList?.find(({ prdMgrpCd, prdSgrpCd }) => {
                return (prdMgrpCd === 'B' || prdMgrpCd === 'C') && prdSgrpCd === '05';
              })
          );
          if (filtered?.length > 0) {
            if (!hasMobile) {
              showConfirm(
                `자유이용권으로 등록한 차량만 이동 가능합니다.<br/>
              다음 차량을 등록대기차량으로 이동하시겠습니까?<br/><br/>
              ${filtered.map(
                (item) => `<p><strong style="
                width:100%;
                display:block;
                overflow:hidden;
                text-overflow: ellipsis;
                word-break:break-all;
                white-space:nowrap;
              ">* ${item?.car?.crNm}</strong></p>`
              )}`,
                async () => {
                  eventHandler({
                    action: name,
                    data: filtered
                  });
                }
              );
            } else {
              openMovePop(e, 'fade');
            }
          } else {
            showAlert('자유이용권으로 등록한 차량만 이동 가능합니다.');
          }
          hideLoader();
        }
      } else {
        showAlert('차량을 선택하세요');
      }
    }
  };

  const eventCallback = async (eventData) => {
    console.log('eventData : ', eventData);
    const { name } = eventData;
    const data = [];

    if (name === 'delete') {
      const { slDelRsnCd, slDelRsn } = eventData;
      items.forEach((item) => {
        data.push({
          dlrPrdId: item?.dlrPrdId,
          slDelRsnCd,
          slDelRsn
        });
      });
    }

    if (!hasMobile) hideDeletePop(false);

    if (name === 'delete') {
      eventHandler({
        action: name,
        data
      });
    } else if (name === 'waiting') {
      eventHandler({
        action: name,
        items
      });
    }
  };

  const btnsEl = useRef(null);
  const [btnsClass, setBtnsClass] = useState('btn-wrap');
  useEffect(() => {
    if (hasMobile) {
      if (btnsEl.current.children.length > 2) {
        setBtnsClass('btn-wrap lt3');
      } else {
        setBtnsClass('btn-wrap');
      }
    }
  }, []);

  // 모바일 화면 콘트롤
  const [dimmDelete, setDimmDelete] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false);
  const [reasonCd, setReasonCd] = useState('');
  const [reason, setReason] = useState('');

  const handleDeletePop = (e) => {
    e.preventDefault();
    setActiveDelete(true);
    setDimmDelete(true);
    preventScroll(true);
  };

  const handleCloseDimmDelete = () => {
    setActiveDelete(false);
    setDimmDelete(false);
    preventScroll(false);
  };

  const handleClose = useCallback(() => {
    //e.preventDefault();
    handleCloseDimmDelete();
  }, []);

  const onCheckDelRsn = (e) => {
    const { value, checked } = e.target;
    console.log('onCheck -> value', value);
    console.log('onCheck -> checked', checked);
    setReasonCd(value);
  };

  // Textarea
  const textareaChange = (e) => {
    const { value } = e.target;
    setReason(value);
  };
  const handleConfirmDelete = (e) => {
    e.preventDefault();
    eventCallback(
      {
        name: 'delete',
        slDelRsnCd: reasonCd,
        slDelRsn: reason
      },
      e
    );
    handleClose(e);
  };
  const handleConfirmWaiting = (e) => {
    e.preventDefault();
    eventCallback(
      {
        name: 'waiting'
      },
      e
    );
    closeMovePop(e);
  };

  const closeMovePop = useCallback(
    (e) => {
      e.preventDefault();
      setMovePop(false);
    },
    [setMovePop]
  );

  if (hasMobile) {
    const { handleFullpagePopup } = useContext(DealerContext);
    return (
      <>
        <div className="float-wrap btn-xs mb20">
          <CheckBox id="chk-all" title="전체선택" onChange={checkAll} />
          <div className={btnsClass} ref={btnsEl}>
            <Button
              size="sml"
              line="gray"
              color="gray"
              radius={true}
              buttonMarkup={true}
              title="선택차량 삭제"
              width={74}
              height={24}
              fontSize={10}
              fontWeight={500}
              name="delete"
              onClick={emitWithSelectedItem}
            />
            {['0010'].includes(params?.sttDvcd) ? (
              <>
                <Button
                  size="sml"
                  line="gray"
                  color="gray"
                  radius={true}
                  buttonMarkup={true}
                  title="대기차량 이동"
                  width={74}
                  height={24}
                  fontSize={10}
                  fontWeight={500}
                  marginLeft={8}
                  name="waiting"
                  onClick={emitWithSelectedItem}
                />
                <Button
                  size="sml"
                  line="gray"
                  color="gray"
                  radius={true}
                  buttonMarkup={true}
                  title="업데이트 자유권 관리"
                  width={92}
                  height={24}
                  fontSize={10}
                  fontWeight={500}
                  marginLeft={8}
                  name="update"
                  onClick={handleFullpagePopup('ticket', updatePass)}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {createBodyPortal(
          <>
            <div className={dimmDelete ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimmDelete} />
            <MobBottomArea active={activeDelete} zid={101}>
              <div className="inner">
                <h3 className="tit1 mb8">차량삭제</h3>
                <ul className="radio-group vertical border">
                  <li>
                    <Radio id="chk-reason1" value="0010" name="slDelRsnCd" checked={reasonCd} title="실차주 요청으로 인한 삭제" onChange={onCheckDelRsn} />
                  </li>
                  <li>
                    <Radio id="chk-reason2" value="0020" name="slDelRsnCd" checked={reasonCd} title="차량 소속 변경" onChange={onCheckDelRsn} />
                  </li>
                  <li>
                    <Radio id="chk-reason3" value="0030" name="slDelRsnCd" checked={reasonCd} title="오프라인 채널 통한 판매" onChange={onCheckDelRsn} />
                  </li>
                  <li>
                    <Radio id="chk-reason4" value="0040" name="slDelRsnCd" checked={reasonCd} title="타 사이트를 통한 판매" onChange={onCheckDelRsn} />
                  </li>
                  <li>
                    <Radio id="chk-reason5" value="0050" name="slDelRsnCd" checked={reasonCd} title="기타" onChange={onCheckDelRsn} />
                  </li>
                </ul>
                <Textarea
                  id="car-reason6"
                  name="slDelRsn"
                  countLimit={30}
                  type="tp1"
                  height={50}
                  placeHolder="기타 사유 입력"
                  disabledEnter={true}
                  disabled={reasonCd !== '0050'}
                  onChange={textareaChange}
                />
                <div className="essential-point fs12 tx-red80 mt16">
                  <ul>
                    <li>&#8251; 삭제 시 복구 및 환불이 불가하며, 판매 수수료는 환불이 불가하오니 주의하시기 바랍니다.</li>
                    <li>&#8251; 타사 판매 시 판매 완료를 알려드립니다.</li>
                  </ul>
                </div>
              </div>
              <Buttons align="center" className="full">
                <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleClose} />
                <Button size="big" background="blue80" title="확인" onClick={(e) => handleConfirmDelete(e)} />
              </Buttons>
            </MobBottomArea>

            <RodalPopup show={movePop} type={'fade'} closedHandler={closeDimmMovePop} isMask={true} isButton={false} subPop={false}>
              <div className="con-wrap">
                <p>해당 차량을 대기차량으로 변경하시겠습니까?</p>
                <Buttons align="right" marginTop={24}>
                  <Button fontSize={14} title="취소" color="blue80" onClick={closeMovePop} />
                  <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={(e) => handleConfirmWaiting(e)} />
                </Buttons>
              </div>
            </RodalPopup>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="register-state-modify">
        <CheckBox id="chk-all" title="전체선택" onChange={checkAll} />
        <div className="btn-wrap">
          {
            params?.sttDvcd == '0010' && updatePass &&
            <Button size="mid" line="gray" buttonMarkup={true} color="black" radius={true} title="업데이트 자유권 관리" width={133} name="update" onClick={emitWithSelectedItem} />
          }
          {
            params?.sttDvcd == '0010' &&
            <Button size="mid" line="gray" buttonMarkup={true} color="black" radius={true} title="등록대기차량으로 이동" width={160} name="waiting" marginLeft={8} onClick={emitWithSelectedItem} />
          }
          <Button size="mid" line="gray" buttonMarkup={true} color="black" radius={true} title="선택차량 삭제" width={109} name="delete" marginLeft={8} onClick={emitWithSelectedItem} />
        </div>
      </div>
      {displayUpdatePop && (
        <RodalPopup
          show={displayUpdatePop}
          type={'fade'}
          closedHandler={hideUpdatePop}
          title="업데이트 자유권 관리"
          subTitle={`이용권 : ${updatePass?.regMm}개월 ${updatePass?.crSlot}대(D-${updatePass?.retentionperiod ?? 0}, ${updatePass?.prdUseCnt}대/${updatePass?.crSlot}대)`}
          mode="normal"
          size="large"
        >
          <UpdateProdPop eventHandler={eventCallback} onClose={setDisplayUpdatePop} updatePass={updatePass} />
        </RodalPopup>
      )}

      {displayDeletePop && (
        <RodalPopup show={displayDeletePop} type={'fade'} closedHandler={hideDeletePop} title="차량 삭제" size="medium" mode="normal">
          <DeleteProdPop eventHandler={eventCallback} onClose={hideDeletePop} items={items} />
        </RodalPopup>
      )}
    </>
  );
};

export default ProdSelectedItemEmitter;
