import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import Picker from 'react-mobile-datepicker';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { selectMyUpdateTicketList, selectUpdateBoxList, insertUpdateBox, updateMyUpdateTicketLocker, deleteMyUpdateTicketLocker, insertUpdatePassTime } from '@src/api/mypage/dealer/dealerTicketApi';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { preventScroll } from '@src/utils/CommonUtil';
import { selectAdverProductList, selectMyAdProdList } from '@src/api/mypage/dealer/dealerAdverApi';
import IniPayButton from '@lib/share/inipay/IniPayButton';
import { commonPaymentMethodList } from '@src/constant/payment';
// import MobIniPayMod from '@src/components/common/MobIniPayMod';
import { frontUrl } from '@src/utils/HttpUtils';

const MobTimeChange = ({ callback, prodItemFun, dlrPrdId, returnQueryInfo }) => {
  console.log('MobTimeChange -> prodItem ', prodItemFun());
  const [fuelTypes, setFuelTypes] = useState([]);
  const [carMssList, setCarMssList] = useState([]);
  const { showAlert, showConfirm, Confirm, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);
  const [myUpdateTicketList, setMyUpdateTicketList] = useState([]);
  const [advProdList, setAdvProdList] = useState([]);
  const [selectedPayment, selectPayment] = useState({ id: 'Card' });
  const [selectedAdv, selectAdv] = useState([]);

  const dispatch = useDispatch();

  const handleCancel = (e) => {
    if (callback) callback(e);
  };
  const handleCancelInner = (e) => {
    // if (callback) callback(e);
    e.preventDefault();
    dispatch({type: MOBILE_FULLPAGE_POPUP_CLOSE});
  };
  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      showConfirm('저장하시겠습니까?', async () => {
        showLoader();
        const { dlrPrdId } = prodItemFun();

        const params = myUpdateTicketList?.map((ticket) => {
          const { time } = ticket;
          return {
            dlrPrdId,
            updatePassType: 'custom',
            updHm: parseMinToToTime(time)
              .split(':')
              .join('')
          };
        });

        console.log('myUpdateTicketList params : ', params);
        const { data, statusinfo } = await insertUpdatePassTime(params).then((res) => res.data);
        hideLoader();
        console.log('saveUpdateTime -> data', data);
        console.log('saveUpdateTime -> statusinfo', statusinfo);

        if (statusinfo?.returncd === '000') {
          showAlert('저장되었습니다');
        } else {
          showAlert('실패했습니다');
        }
      });
    },
    [myUpdateTicketList]
  );

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // bottom sheet
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  const handleOpenStorage = useCallback(async (e) => {
    e.preventDefault();

    const { data } = await selectUpdateBoxList().then((res) => res?.data);

    if (typeof data === 'object') {
      console.log('showUpdateLocker -> data', data);
      setMyUpdateTicketLockerList(
        Object.keys(data).map((key) => {
          const timeInfo = data[key];
          return {
            id: timeInfo[0]?.boxId,
            boxNm: timeInfo[0]?.boxNm,
            list: timeInfo
          };
        })
      );
    }

    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, []);
  const handleOpenSave = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);
  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);
  const handleClose = useCallback((e) => {
    e.preventDefault();
    handleCloseDimm1();
    handleCloseDimm2();
  }, []);

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    },
    [isValue1]
  );

  // 모바일 팝업
  const [applyPop, setApplyPop, openApplyPop, closeDimmApplyPop] = useRodal(false);
  const closeApplyPop = useCallback((e) => {
    e.preventDefault();
    setApplyPop(false);
  }, []);

  const paymentOpen = async () => {
    // Origin
    console.log('getTicketPriceAndShowPop -> getTicketPriceAndShowPop');
    const [perCarUpdate = {}, updatefreepass = []] = await Promise.all([
      selectAdverProductList().then((res) => res?.data?.perCarUpdate),
      selectMyAdProdList().then((res) => res?.data?.updatefreepass)
    ]);
    console.log('getTicketPriceAndShowPop -> perCarUpdate', perCarUpdate);
    console.log('getTicketPriceAndShowPop -> updatefreepass', updatefreepass);

    setAdvProdList([...perCarUpdate, ...updatefreepass]);

    // default select
    selectAdv(perCarUpdate ? perCarUpdate[0] : updatefreepass[0]);

    handleFullpagePopup();
  };

  const checkPayment = (e) => {
    const { id } = e;
    console.log('checkPayment -> id', id);

    selectPayment(commonPaymentMethodList.find((tempPaymentMethod) => tempPaymentMethod.id === id));
  };

  const beforeRequest = () => {
    return new Promise((resolve, reject) => {
      if (!selectedAdv) {
        showAlert('상품을 선택하세요');
        reject();
      } else if (!selectedPayment) {
        showAlert('결제방법을 선택하세요');
        reject();
      } else {
        resolve();
      }
    });
  };

  const [fpPayment, setFpPayment] = useState(false);
  const handleFullpagePopup = useCallback(() => {
    //e.preventDefault();
    dispatch({
      type: MOBILE_FULLPAGE_POPUP,
      data: {
        isPopup: true,
        title: '이용권 결제',
        options: ['close']
      }
    });
    setFpPayment(true);
  }, [dispatch, returnQueryInfo]);

  const dateConfig = {
    hour: {
      format: 'hh',
      caption: 'Hour',
      step: 1
    },
    minute: {
      format: 'mm',
      caption: 'Min',
      step: 1
    }
  };

  useEffect(() => {
    selectMyUpdateTicketList(dlrPrdId || prodItemFun().dlrPrdId)
      .then((res) => res?.data?.data)
      .then((list) => {
        console.log('MobTimeChange -> select from DB list', list);
        setMyUpdateTicketList(
          list?.map((item) => ({
            ...item,
            time: parseTimeToMin(item.updHm)
          }))
        );
      });

    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);

    initAlert();
    initConfirm();
  }, []);
  //}, [dlrPrdId]);   // 한페이지가 아닌 레이어 팝업이기 때문에 MOUNT 될때마다 데이터 신규 호출 필요함.

  // useEffect(() => {
  //   console.log('===> 컴포넌트 나타나짐');
  //   return () => {
  //     console.log('===> 컴포넌트 사라짐');
  //     dlrPrdId
  //   }
  // }, [])

  const [newLockerName, setNewLockerName] = useState('');
  const inputLockerName = (e) => {
    const { value } = e.target;
    setNewLockerName(value);
  };

  const [selectedLocker, setSelectedLocker] = useState();
  const [myUpdateTicketLockerList, setMyUpdateTicketLockerList] = useState([]);

  const saveLockerMod = async (e) => {
    e.preventDefault();

    console.log('saveLockerMod : ', e);
    console.log('saveLockerMod selectedLocker : ', selectedLocker);
    console.log('saveLockerMod newLockerName : ', newLockerName);
    console.log('saveLockerMod myUpdateTicketList : ', myUpdateTicketList);
    console.log('saveLockerMod myUpdateTicketLockerList : ', myUpdateTicketLockerList);
    // // console.log("saveLockerMod boxNm : ", boxNm)
    const newUpdateMyUpdateTicketLocker = myUpdateTicketList?.map((item) => ({
      updHhId: item.updHhId,
      boxNm: newLockerName,
      updHm: parseMinToToTime(item.time) ?? item.updHm
    }));
    console.log('saveLockerMod -> newUpdateMyUpdateTicketLocker', newUpdateMyUpdateTicketLocker);

    if (selectedLocker) {
      await updateMyUpdateTicketLocker({
        boxId: selectedLocker.id,
        boxNm: newLockerName
      })
        .then((res) => res?.data?.data)
        .then((res) => {
          console.log('saveLockerMod res : ', res);
          setMyUpdateTicketLockerList(
            produce(myUpdateTicketLockerList, (draft) => {
              const target = draft.find((item) => item.id === selectedLocker.id);
              target.boxNm = newLockerName;
              target.list.forEach((item) => (item.boxNm = newLockerName));
            })
          );
        });
    } else {
      await insertUpdateBox(newUpdateMyUpdateTicketLocker).then((res) => {
        const status = res?.data?.statusinfo?.returncd;
        if (status === '000') {
          showAlert('보관되었습니다.');
          // 보관함 재조회
        } else showAlert('실패했습니다.');
      });
    }

    handleClose(e);
    setSelectedLocker(null);
    setNewLockerName('');
  };

  //시간 변경
  const handleTimeChange = useCallback(
    (time, i) => {
      const tempTime = [...myUpdateTicketList];
      tempTime[i].time = time;
      setMyUpdateTicketList(tempTime);
    },
    [myUpdateTicketList]
  );

  //자동세팅 적용
  const autoChange = useCallback((e) => {
    e.preventDefault();
    setMyUpdateTicketList([{ time: parseTimeToMin('08:00:00') }, { time: parseTimeToMin('12:00:00') }, { time: parseTimeToMin('16:00:00') }, { time: parseTimeToMin('20:00:00') }]);
    closeApplyPop(e);
  }, []);
  //db에서 조회시 data -> time
  const parseTimeToMin = useCallback((HHmm) => {
    if (HHmm) {
      const parsedTime = HHmm.split(':');
      const tempTime = new Date();
      tempTime.setHours(parsedTime[0]);
      tempTime.setMinutes(parsedTime[1]);
      return tempTime;
    }
  }, []);

  //db에 저장 시 time -> data
  const parseMinToToTime = useCallback((min) => {
    if (min) {
      const HH = `${min.getHours()}`.padStart(2, '0');
      const mm = `${min.getMinutes()}`.padStart(2, '0');
      return `${HH}:${mm}:00`;
    }
  }, []);

  const changeItemOption = useCallback(
    (e) => {
      selectAdv(advProdList[e.target.value]);
    },
    [advProdList]
  );

  const removeMyUpdateTicketLocker = async (e) => {
    e.preventDefault();
    console.log('selectedLocker : ', selectedLocker);
    console.log('myUpdateTicketLockerList : ', myUpdateTicketLockerList);
    if (!selectedLocker) {
      showAlert('선택된 보관함이 없습니다');
      return;
    }

    showConfirm('정말 삭제하시겠습니까?', async () => {
      showLoader();
      await deleteMyUpdateTicketLocker({ boxId: selectedLocker.id })
        .then((res) => res?.data?.data)
        .then((res) => {
          hideLoader();
          console.log('deleteMyUpdateTicketLocker res : ', res);
          if (res) {
            setMyUpdateTicketLockerList(
              myUpdateTicketLockerList.filter((myUpdateTicketLocker) => myUpdateTicketLocker.id !== selectedLocker.id)?.map((myUpdateTicketLocker) => ({ ...myUpdateTicketLocker }))
            );
            handleCloseDimm1();
            setSelectedLocker(null);
          }
        });
      showAlert('삭제되었습니다');
    });
  };

  const applyUpdateTimeLocker = (e) => {
    e.preventDefault();
    console.log('applyUpdateTimeLocker selectedLocker : ', selectedLocker);

    if (selectedLocker) {
      const { list } = selectedLocker;

      setMyUpdateTicketList(
        myUpdateTicketList?.map((item, i) => ({
          ...item,
          time: parseTimeToMin(list[i].updHm) ?? item.updHm
        }))
      );
      handleCloseDimm1();
      setSelectedLocker(null);
    } else {
      showAlert('보관함을 선택하세요');
    }
  };

  return (
    <>
      <div className="time-update">
        <Buttons align="right">
          <Button size="sml" line="gray" color="gray" radius={true} title="자동세팅 적용" width={85} onClick={(e) => openApplyPop(e, 'fade')} />
          <Button size="sml" line="gray" color="gray" radius={true} title="업데이트 시간 보관함" width={121} onClick={(e) => handleOpenStorage(e)} />
        </Buttons>
      </div>
      <div className="time-picker-area">
        <p className="time-picker-msg">최초 등록 시간 : 08:30:25</p>
        <p className="time-picker-msg">업데이트 회수 : {myUpdateTicketList?.length ?? 0}회</p>
        <Buttons align="center" marginTop={16}>
          <Button size="sml" line="blue80" color="blue80" radius={true} title="보관함에 저장" width={85} onClick={handleOpenSave} />
          <Button size="sml" background="blue80" radius={true} title="추가업데이트 구매" width={108} buttonMarkup={true} onClick={paymentOpen} />
        </Buttons>

        <ul className="m-toggle-list time-picker">
          {myUpdateTicketList?.map((updateTicketList, i) => {
            return (
              <MenuItem key={i}>
                <MenuTitle>
                  <span>
                    {`${updateTicketList.time.getHours()}`.padStart(2, '0')} : {`${updateTicketList.time.getMinutes()}`.padStart(2, '0')}
                  </span>
                </MenuTitle>
                <MenuCont mount={true}>
                  <div className="m-picker">
                    <Picker
                      isPopup={false}
                      value={updateTicketList.time}
                      dateConfig={dateConfig}
                      theme={'ios'}
                      showHeader={false}
                      showFooter={false}
                      confirmText={'저장'}
                      cancelText={'취소'}
                      onChange={(time) => handleTimeChange(time, i)}
                    />
                  </div>
                </MenuCont>
              </MenuItem>
            );
          })}
        </ul>
      </div>
      <Buttons align="center" className="full fixed">
        <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCancel} />
        <Button size="big" background="blue80" title="저장" onClick={handleSave} />
      </Buttons>

      {/* 업데이트 시간 보관함 */}
      <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
      <MobBottomArea active={active1} isFixButton={true} zid={101}>
        <div className="inner search-cover">
          <h3 className="tit1">업데이트 시간 보관함</h3>
          <div className="save-box-pop">
            <ul className="radio-group chk">
              {myUpdateTicketLockerList?.map((myUpdateTicketLocker, i) => {
                return (
                  <>
                    <li key={i}>
                      <Radio
                        id={`chk-box-item-${i}`}
                        label={myUpdateTicketLocker?.boxNm}
                        value={myUpdateTicketLocker?.id}
                        checked={selectedLocker?.id}
                        onChange={() => {
                          console.log(myUpdateTicketLocker);
                          setSelectedLocker(myUpdateTicketLocker);
                        }}
                      />
                      <div className="box-item">
                        {myUpdateTicketLocker?.list?.map((times, j) => {
                          return (
                            <>
                              <span key={j} className="time-info">
                                {times.updHm.substring(0, 5)}
                              </span>
                            </>
                          );
                        })}
                      </div>
                    </li>
                  </>
                );
              })}
              {/* <li>
                <Radio id="update1" label="소나타1 업데이트" value={1} checked={isValue1} onChange={handleChange1} />
                <div className="box-item">
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>

                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                  <span className="time-info">01:00</span>
                </div>
              </li> */}
            </ul>

            {/* 등록내역이 없을 시 */}
            {/* <div className="list-none-wrap">
            <p className="list-none">등록된 내역이 없습니다.</p>
          </div> */}
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="삭제" measure="%" width={50} height={56} onClick={removeMyUpdateTicketLocker} />
          <Button size="big" background="blue80" title="적용" measure="%" width={50} height={56} onClick={applyUpdateTimeLocker} />
        </Buttons>
      </MobBottomArea>

      <div className={dimm2 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm2} />
      <MobBottomArea active={active2} isFixButton={true} zid={101}>
        <div className="inner search-cover">
          <h3 className="tit1">업데이트 보관함</h3>
          <p className="mt24 mb8">보관함 저장 이름</p>
          <Input type="text" placeHolder="보관명을 입력하세요." value={newLockerName} width="100%" height={50} maxLength={11} onChange={inputLockerName} />
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" measure="%" width={50} height={56} onClick={handleClose} />
          <Button size="big" background="blue80" title="확인" measure="%" width={50} height={56} onClick={(e) => saveLockerMod(e)} />
        </Buttons>
      </MobBottomArea>

      <RodalPopup show={applyPop} type={'fade'} width={380} closedHandler={closeDimmApplyPop} isMask={true} isButton={false} subPop={false}>
        {/* 무료 이용시 */}
        <div className="con-wrap">
          <p className="exp">
            이 차량의 최초 등록 분/초를 기준으로
            <br />
            08시/12/16시/20시에 자동 업데이트 됩니다.
            <br />
            적용하시겠습니까?
          </p>
          <Buttons align="right" marginTop={24}>
            <Button fontSize={14} title="취소" color="blue80" onClick={closeApplyPop} />
            <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={autoChange} />
          </Buttons>
        </div>

        {/* 유료 이용시 */}
        {/* <div className="con-wrap">
        <p className="exp">이 차량의 최초 등록 분/초를 기준으로<br />00시~ 23시 사이에 1시간 단위로<br />자동 배치 됩니다. 적용하시겠습니까?</p>
        <Buttons align="right" marginTop={24}>
          <Button fontSize={14} title="취소" color="blue80" onClick={closeApplyPop} />
          <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
        </Buttons>
      </div> */}

        {/* 완료 */}
        {/* <div className="con-wrap">
        <p>업데이트 시간 저장이 완료되었습니다.</p>
        <Buttons align="right" marginTop={24}>
          <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" />
        </Buttons>
      </div> */}
      </RodalPopup>

      <MobFullpagePopup active={mFullpagePopup} paddingBottom={56} subPop={true}>
        {fpPayment && (
          <>
            <h3 className="tit2 pd20">결제정보</h3>
            <MobPaymentInfo
              title={'업데이트권 구매'}
              payment={prodItemFun()}
              paymentMethodList={commonPaymentMethodList}
              itemOptions={advProdList}
              onChangeItem={changeItemOption}
              selectedPayment={selectedPayment}
              onPaymentMethodChanged={(e) => checkPayment(e)}
              selectedCoupon={null}
              onCouponChange={() => {}}
            />
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleCancelInner} />
              {/* <Button size="big" background="blue80" title="결제" onClick={openMobIniPayPop} /> */}
              <IniPayButton
                directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/carManagement?${returnQueryInfo}`)}
                // failUrl={`${frontUrl}/mypage/dealer/sellcar/liveShotAppointment`}
                isMobile={true}
                size="big"
                background="blue80"
                title="결제"
                width={172}
                height={60}
                mode="normal"
                beforeRequestAsync={beforeRequest}
                paymethod={selectedPayment?.id}
                dlrPrdId={prodItemFun().dlrPrdId}
                // point={usingPoint}
                // coupon={selectedCoupon?.id}
                items={[selectedAdv]}
                prodType="pass"
                // type={selectedEvidence?.id}
                mobPayMethod={selectedPayment?.id}
              />
            </Buttons>
            {/* <MobIniPayMod
              show={iniPopShow}
              callback={iniPopCallback}
              directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/liveShotAppointment?type=reg&`)}
              failUrl={`${frontUrl}/mypage/dealer/sellcar/liveShotAppointment`}
              isMobile={true}
              size="big"
              background="blue80"
              title="결제"
              width={172}
              height={60}
              mode="normal"
              beforeRequestAsync={beforeRequest}
              paymethod={selectedPayment?.id}
              dlrPrdId={prodItemFun().dlrPrdId}
              // point={usingPoint}
              // coupon={selectedCoupon?.id}
              items={[selectedAdv]}
              prodType="pass"
              // type={selectedEvidence?.id}
              mobPayMethod={selectedPayment?.id}
            /> */}
          </>
        )}
      </MobFullpagePopup>
    </>
  );
};

export default MobTimeChange;
