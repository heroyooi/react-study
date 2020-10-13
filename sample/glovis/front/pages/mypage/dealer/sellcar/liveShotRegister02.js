import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeout } from 'globalthis/implementation';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobLiveShot from '@src/components/common/MobLiveShot';
import { SECTION_MYPAGE, MOBILE_FULLPAGE_POPUP, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { setLiveShotCarInfo } from '@src/actions/dealer/sellcar/liveShotAction';
import { getRegStates, getStepUrl, getBuyCarSelectAtbInstp, getLiveShotCarImgList } from '@src/utils/LiveShotUtil';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getMemberType, isLogin } from '@src/utils/LoginUtils';
import { firstOrDefault } from '@src/utils/ArrayUtil';
import { axiosPost } from '@src/utils/HttpUtils';

const globalThis = require('globalthis')();

const LiveShotRegister02 = memo(({ router }) => {
  const dispatch = useDispatch();
  const liveShotCarInfo = useSelector((state) => state.liveShot.liveShotCarInfo);
  const [isEmptyPopUp, setIsEmptyPopUp] = useRodal(false);
  const [is360Pop, setIs360Pop, openIs360Pop, closeIs360Pop] = useRodal(false);
  // const [is360Pop2, setIs360Pop2] = useState(false);
  const [is360Pop2, setIs360Pop2, openIs360Pop2, closeIs360Pop2] = useRodal(false);
  const [isPreview, setIsPreview] = useState(false);
  const [livePhotos, setLivePhtos] = useState([]);
  const [isLiveShot, setIsLiveShot] = useState(false);
  const prefetchUrl = getStepUrl(2);
  const [isReset, setIsReset] = useState(false);
  const [pictureCount, setPictureCount] = useState(0);

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();
      const query = router.query;

      const data = {};

      liveShotCarInfo.itnspItems.forEach((category) => {
        category.items.forEach((item) => {
          if (item.useYn !== 'N') {
            data[item.key] = item.value;
            if (!objIsEmpty(item.memoKey)) {
              data[item.memoKey] = item.memo;
            }
          }
        });
      });
      axiosPost('/api/admin/buycar/insertAtbInspCmpl.do', data)
        .then((res) => {
          if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
            Router.push({ pathname: prefetchUrl, query: { crId: query.crId, crNo: query.crNo, crType: query.crType, reqId: query.reqId } });
          } else if (res && res.data && res.data.statusinfo && res.data.statusinfo.returnmsg) {
            alert(`[${res.data.statusinfo.returncd}]${res.data.statusinfo.returnmsg}`);
          }
        })
        .catch(() => {
          alert('오류');
        });
    },
    [liveShotCarInfo, prefetchUrl, router.query]
  );

  const handlePreviewToggle = useCallback(
    (e) => {
      e.preventDefault();
      if (isPreview === true || isEmptyPopUp === true) {
        setIsPreview(false);
        setIsEmptyPopUp(false);
        return;
      }

      if (objIsEmpty(livePhotos)) {
        setIsEmptyPopUp(true);
        return;
      }

      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '미리보기',
          options: ['close']
        }
      });
      setIsPreview(true);
    },
    [dispatch, isEmptyPopUp, isPreview, livePhotos, setIsEmptyPopUp]
  );

  const handleShottingComplete = useCallback(
    (e, deps) => {
      e.preventDefault();
      setLivePhtos([]);
      setPictureCount(0);
      setTimeout(() => {
        getLiveShotCarImgList(router.query.reqId).then((payload) => {
          console.log('liveShotRegister02.handleShottingComplete', deps, payload);
          setLivePhtos(payload);
          setPictureCount(payload?.length);
        });
        setIsLiveShot(true);
        setIsReset(true);
      }, 1500);
      if (is360Pop2) closeIs360Pop2(false);
    },
    [closeIs360Pop2, is360Pop2, router.query.reqId]
  );

  const handleGoBack = useCallback((e) => {
    e.preventDefault();
    Router.back();
  }, []);

  const open360Pop2 = useCallback((e) => {
    e.preventDefault();
    closeIs360Pop(false);
    openIs360Pop2(e, 'fade');
  }, []);

  const handleMoveApp = useCallback((e) => {
    e.preventDefault();
    setIs360Pop(false);
    setIs360Pop2(false);
  }, []);

  useEffect(() => {
    if (!objIsEmpty(livePhotos)) {
      setPictureCount(livePhotos.length);
    }
  }, [livePhotos]);

  useEffect(() => {
    const { crNo, crId, crType, reqId, carInfo } = router.query;

    if (isLogin() !== true) {
      Router.push('/login');

      return;
    }

    if (objIsEmpty(crNo) || objIsEmpty(crId) || objIsEmpty(crType) || objIsEmpty(reqId)) {
      alert('잘못된 요청 입니다.');
      Router.back();
      return;
    }

    if (objIsEmpty(carInfo)) {
      getBuyCarSelectAtbInstp(reqId).then((payload) => {
        dispatch(setLiveShotCarInfo(crId, crNo, crType, payload));
      });
    } else {
      setLiveShotCarInfo(JSON.parse(carInfo));
    }

    getLiveShotCarImgList(reqId).then((payload) => {
      if (payload && payload.length > 0) {
        setIsLiveShot(true);
        setLivePhtos(payload);
      }
    });

    if (livePhotos?.phtUrl?.length > 0) setIsReset(true);

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
        <Steps type={1} contents={getRegStates()} active={2} mode="stick" />
        <div className="content-wrap">
          {isLiveShot ? (
            isReset ? (
              <div className="photo-area">
                <p className="tit2">촬영하신 사진을 확인해보세요</p>
                <ul className="float-wrap">
                  <li>사진촬영 ({(livePhotos || []).filter((x) => !objIsEmpty(x.phtUrl)).length}/20)</li>
                  <li onClick={handlePreviewToggle}>미리보기</li>
                </ul>
                <div className="photo-wrap">
                  <img src={firstOrDefault(livePhotos).phtUrl || ''} />
                </div>
                <MobLiveShot
                  crId={router.query.crId}
                  crNo={router.query.crNo}
                  crType={router.query.crType}
                  isPreview={isPreview}
                  isReShot={isReset}
                  livePhotos={livePhotos}
                  memberType={getMemberType()}
                  shotType={0}
                  onLiveShotClose={handleShottingComplete}
                  onPreViewClose={handlePreviewToggle}
                  pictureCount={pictureCount}
                />
              </div>
            ) : (
              <MobLiveShot
                crId={router.query.crId}
                crNo={router.query.crNo}
                crType={router.query.crType}
                isPreview={isPreview}
                isReShot={false}
                livePhotos={livePhotos}
                memberType={getMemberType()}
                shotType={0}
                onLiveShotClose={handleShottingComplete}
                onPreViewClose={handlePreviewToggle}
                pictureCount={pictureCount}
              />
            )
          ) : (
            <MobLiveShot
              crId={router.query.crId}
              crNo={router.query.crNo}
              crType={router.query.crType}
              isPreview={isPreview}
              livePhotos={livePhotos}
              memberType={getMemberType()}
              shotType={0}
              onLiveShotClose={handleShottingComplete}
              onPreViewClose={handlePreviewToggle}
              pictureCount={pictureCount}
            />
          )}
        </div>
      </div>

      <Buttons align="center" className="fixed">
        <Button size="big" background="blue20" color="blue80" radius={true} title="이전 단계로" width={48} measure={'%'} height={48} fontWeight={500} onClick={handleGoBack} />
        <Button
          size="big"
          background={isLiveShot ? 'blue20' : 'gray60'}
          color={isLiveShot ? 'blue80' : null}
          radius={true}
          disabled={!isLiveShot}
          title="다음 단계로"
          width={48}
          measure={'%'}
          height={48}
          marginLeft={4}
          mgMeasure={'%'}
          // onClick={handleNext}
          onClick={(e) => openIs360Pop(e, 'fade')}
        />
      </Buttons>

      <RodalPopup show={isEmptyPopUp} type={'fade'} closedHandler={handlePreviewToggle} isMask={true} isButton={false} subPop={false}>
        {isEmptyPopUp === true && (
          <div className="con-wrap">
            <p>촬영된 이미지가 없습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={handlePreviewToggle} />
            </Buttons>
          </div>
        )}
      </RodalPopup>
      <RodalPopup show={is360Pop} type={'fade'} closedHandler={closeIs360Pop} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          <>
            <p>360도 촬영을 진행하시겠습니까?</p>
            <p className="mt8 tx-blue80 fs12">취소버튼 클릭 시 광고 등록이 완료됩니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={handleNext} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={open360Pop2} />
            </Buttons>
          </>
        </div>
      </RodalPopup>
      <RodalPopup show={is360Pop2} type={'fade'} closedHandler={closeIs360Pop2} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          <>
            <p>360도 촬영을 진행합니다.</p>
            {/* <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={handleMoveApp} />
            </Buttons> */}
            <MobLiveShot
              crId={router.query.crId}
              crNo={router.query.crNo}
              crType={router.query.crType}
              isPreview={isPreview}
              livePhotos={livePhotos}
              memberType={getMemberType()}
              shotType={3}
              onLiveShotClose={handleShottingComplete}
              onPreViewClose={handlePreviewToggle}
            />
          </>
        </div>
      </RodalPopup>
    </AppLayout>
  );
});

LiveShotRegister02.propTypes = {
  router: PropTypes.object
};

LiveShotRegister02.displayName = 'LiveShotRegister02';

export default withRouter(LiveShotRegister02);
