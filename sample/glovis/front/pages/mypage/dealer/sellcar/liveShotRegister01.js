import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ClipLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Steps from '@lib/share/items/Steps';
import UseRadioTx from '@lib/share/custom/useRadioTx';
import PricingCheckColors from '@src/components/pricingSystem/pricingCheckColors';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { setLiveShotCarInfo } from '@src/actions/dealer/sellcar/liveShotAction';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { getRegStates, getStepUrl, getBuyCarSelectAtbInstp, isLiveShotValidItems } from '@src/utils/LiveShotUtil';
import { axiosPost } from '@src/utils/HttpUtils';
import { gInfoLive, isLogin } from '@src/utils/LoginUtils';

const LiveShotRegister01 = memo(({ router }) => {
  const dispatch = useDispatch();
  const storeCarInfo = useSelector((state) => state.liveShot.liveShotCarInfo);
  const [buttonActive, setButtonActive] = useState(false);
  const [carInfo, setCarInfo] = useState([]);
  const [isCarlendarPopUp, setIsCarlendarPopUp] = useState(false);
  const [isColorPopUp, setIsColorPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userId] = useState(gInfoLive().id);

  const prefetchUrl = getStepUrl(1);

  const handleChange = useCallback(
    (e, deps) => {
      const shadowCarInfo = cloneDeep(carInfo);
      const category = shadowCarInfo.find((x) => x.category === deps.category);

      category.items.forEach((item) => {
        if (item.key === deps.key) {
          Object.assign(item, deps);
        }
      });
      setCarInfo(shadowCarInfo);

      const hasNotValidation = isLiveShotValidItems(shadowCarInfo);

      setButtonActive(!hasNotValidation);
    },
    [carInfo]
  );

  const handleUpload = useCallback(
    (e) => {
      e.preventDefault();
      if (buttonActive) {
        setIsLoading(true);
        const query = router.query;

        const data = {};

        carInfo.forEach((category) => {
          category.items.forEach((item) => {
            if (item.useYn !== 'N') {
              data[item.key] = item.value;
              if (!objIsEmpty(item.memoKey)) {
                data[item.memoKey] = item.memo;
              }
              if (!objIsEmpty(item.countKey)) {
                data[item.countKey] = Number(item.cnt);
              }
            }
          });
        });

        axiosPost('/api/liveShot/admin/insertAtbInspTemp.do', data)
          .then((res) => {
            if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
              dispatch(setLiveShotCarInfo(query.crId, query.crNo, query.crType, carInfo));
              Router.push(
                { pathname: prefetchUrl, query: { crId: query.crId, crNo: query.crNo, crType: query.crType, reqId: query.reqId, carInfo: JSON.stringify(carInfo) } },
                `${prefetchUrl}?crId=${query.crId}&crNo=${query.crNo}&crType=${query.crType}&reqId=${query.reqId}`
              ).then(() => {
                setIsLoading(false);
              });
            } else if (res && res.data && res.data.statusinfo && res.data.statusinfo.returnmsg) {
              setIsLoading(false);
              alert(`[${res.data.statusinfo.returncd}]${res.data.statusinfo.returnmsg}`);
            }
          })
          .catch(() => {
            alert('오류');
            setIsLoading(false);
          });
      } else {
        return false;
      }
    },
    [buttonActive, carInfo, dispatch, prefetchUrl, router.query]
  );

  const handleCalendarPopUpToggle = useCallback(
    (e, deps) => {
      e.preventDefault();
      const nextState = !isCarlendarPopUp;
      if (nextState === true) {
        setPopUpData(deps);
      } else {
        handleChange(e, Object.assign({ ...popUpData }, { value: deps.format('YYYY-MM-DD') }));
        setPopUpData(null);
      }
      setIsCarlendarPopUp(nextState);
      preventScroll(nextState);
    },
    [handleChange, isCarlendarPopUp, popUpData]
  );

  const handleColorPopUpToggle = useCallback(
    (e, deps) => {
      e.preventDefault();
      const nextState = !isColorPopUp;
      if (nextState === true) {
        setPopUpData(deps);
      } else {
        handleChange(e, Object.assign({ ...popUpData }, { text: deps, value: deps.selectColor }));
        setPopUpData(null);
      }
      setIsColorPopUp(nextState);
      preventScroll(nextState);
    },
    [handleChange, isColorPopUp, popUpData]
  );

  const handleCloseDimm = useCallback(() => {
    setIsCarlendarPopUp(false);
    setIsColorPopUp(false);
    preventScroll(false);
  }, []);

  useEffect(() => {
    const { crNo, crId, crType, reqId } = router.query;

    if (isLogin() !== true) {
      //Router.push('/login');
      return;
    }

    if (objIsEmpty(crNo) || objIsEmpty(crId) || objIsEmpty(crType) || objIsEmpty(reqId)) {
      alert(`잘못된 접근 입니다. 필수 정보가 비어 있습니다.(crNo 또는 crId 또는 crType 또는 reqId)`);
      return;
    }

    if (!objIsEmpty(storeCarInfo) && (storeCarInfo.crId !== crId || storeCarInfo.crNo !== crNo)) {
      dispatch(setLiveShotCarInfo(crId, crNo, crType, null));
    } else if (!objIsEmpty(storeCarInfo) && storeCarInfo.crId === crId && storeCarInfo.crNo === crNo) {
      setCarInfo(storeCarInfo.itnspItems);
      return;
    }

    getBuyCarSelectAtbInstp(reqId, crId, crNo, userId).then((payload) => {
      setCarInfo(payload);
      setButtonActive(!isLiveShotValidItems(payload));
    });

    router.prefetch(prefetchUrl);

    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Shot 광고 등록',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    dispatch({
      type: MOBILE_QUICK_EXIST,
      data: {
        exist: false
      }
    });
    dispatch({
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <div className="live-shot-sec">
        <Steps type={1} contents={getRegStates()} active={1} mode="stick" />
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            {(carInfo || []).map((menu, idx) => {
              return (
                <MenuItem isValue={true} key={idx}>
                  <MenuTitle>{menu.title}</MenuTitle>
                  <MenuCont>
                    <table className="table-tp3">
                      <colgroup>
                        <col width="45%" />
                        <col width="*" />
                      </colgroup>
                      <tbody>
                        {menu.items.map((item, itemIndex) => {
                          return <UseRadioTx dataContext={item} key={itemIndex} onChange={handleChange} onOpenCarlendar={handleCalendarPopUpToggle} onOpenColorPicker={handleColorPopUpToggle} />;
                        })}
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              );
            })}
          </ul>
        </div>
      </div>
      <Button className="fixed" size="full" background={buttonActive ? 'blue80' : 'gray60'} title="등록" onClick={handleUpload} />
      {<div className={isCarlendarPopUp || isColorPopUp ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCloseDimm} />}
      <MobBottomArea active={isCarlendarPopUp || isColorPopUp} isFixButton={true} zid={102}>
        {isCarlendarPopUp === true && <MobCalendar date={new Date()} callback={handleCalendarPopUpToggle} />}
        {isColorPopUp === true && (
          <div className="inner filter-list-wrap pt0">
            <PricingCheckColors mode="radio" selectedColor={popUpData?.text || ''} onClick={handleColorPopUpToggle} />
          </div>
        )}
      </MobBottomArea>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={40} color={'#fff'} loading={true} />
        </div>
      )}
    </AppLayout>
  );
});

LiveShotRegister01.propTypes = {
  router: PropTypes.object
};

LiveShotRegister01.displayName = 'LiveShotRegister01';

export default withRouter(LiveShotRegister01);
