import React, { memo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { getRegStates, getStepUrl, getLiveShotCarImgList } from '@src/utils/LiveShotUtil';
import { objIsEmpty } from '@src/utils/CommonUtil';

const LiveShotRegister03 = memo(({ router }) => {
  const dispatch = useDispatch();
  const storeCarInfo = useSelector((state) => state.liveShot.liveShotCarInfo);
  const [livePhotos, setLivePhtos] = useState([]);
  const prefetchUrl = getStepUrl(3);

  const getPerformaceCheckItemCount = () => {
    let i = 0;
    if (storeCarInfo) {
      storeCarInfo.itnspItems.forEach((category) => {
        category.items.forEach((item) => {
          if (item.isRadio === true) {
            i++;
          }
        });
      });
    }

    return i;
  };

  const handleRouter = useCallback(
    (e) => {
      e.preventDefault();
      Router.push(prefetchUrl);
    },
    [prefetchUrl]
  );

  useEffect(() => {
    const { crNo, crId, crType, reqId } = router.query;

    if (objIsEmpty(crNo) || objIsEmpty(crId) || objIsEmpty(crType) || objIsEmpty(reqId)) {
      alert('잘못된 요청 입니다.');
      Router.back();
      return;
    }

    if (!objIsEmpty(storeCarInfo) && (storeCarInfo.crId !== crId || storeCarInfo.crNo !== crNo)) {
      alert('잘못된 요청 입니다.');
      Router.back();
    }

    getLiveShotCarImgList(reqId).then((payload) => {
      setLivePhtos(payload);
    });

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
        <Steps type={1} contents={getRegStates()} active={3} mode="stick" />
        <div className="content-wrap">
          <div className="photo-area">
            <p className="tit2">Live Shot 차량 등록이 완료되었습니다</p>
            <ul className="photo-complete">
              <li>
                <p>성능점검</p>
                <div className="photo-wrap" />
                <span>{getPerformaceCheckItemCount(storeCarInfo)}개 점검항목</span>
              </li>
              <li>
                <p>사진촬영</p>
                <div className="photo-wrap" />
                <span>{(livePhotos || []).filter((x) => !objIsEmpty(x.phtUrl)).length}개 차량사진</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleRouter} />
    </AppLayout>
  );
});

LiveShotRegister03.propTypes = {
  router: PropTypes.object
};

LiveShotRegister03.displayName = 'LiveShotRegister03';

export default withRouter(LiveShotRegister03);
