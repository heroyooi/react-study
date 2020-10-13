import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import { objIsEmpty } from '@src/utils/CommonUtil';
import BannerItem2 from '@src/components/common/banner/BannerItem2';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import SearchForm2 from '@src/components/mypage/dealer/buycar/SearchForm2';
import { selectSelfListAction } from '@src/actions/sellcar/compareEstmAction';
import { isBidding } from '@src/utils/sellcar/CmprEstmUtil';
import { isEmpty } from 'lodash';
import BiddPopup from './popup/biddPop';

const SelfList = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { selfList } = useSelector((store) => store.compareEstm);
  const [selfList2, setSelfList2] = useState({});
  const [cmprEstm, setCmprEstm] = useState({});
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
  const [formParam, setFormParam] = useState({});

  const handlePopupOpen = useCallback(
    (e, v) => {
      e.preventDefault();
      setTenderPop(true);
      setCmprEstm(v);
    },
    [setTenderPop]
  );

  const searchHandler = (param) => {
    setFormParam(param);
    dispatch(selectSelfListAction(param));
  };

  useEffect(() => {
    setSelfList2(selfList);
  }, [selfList]);

  if (hasMobile) {
    return (
      <>
        <SearchForm2 withOutList={objIsEmpty(selfList)} searchHandler={searchHandler}>
          <ul>
            {!isEmpty(selfList2) ? (
              selfList2.map((v, i) => {
                return <BannerItem2 isMobile={true} v={v} handlePopup={handlePopupOpen} key={i} />;
              })
            ) : (
              <p>진행중인 비교견적 차량이 없습니다. </p>
            )}
          </ul>
        </SearchForm2>
      </>
    );
  }
  return (
    <>
      <SearchForm2 searchHandler={searchHandler} />
      <ul className="goods-list auction">
        {!isEmpty(selfList2) ? (
          selfList2.map((v, i) => {
            return <BannerItem2 v={v} handlePopup={handlePopupOpen} key={i} />;
          })
        ) : (
          <p>진행중인 비교견적 차량이 없습니다. </p>
        )}
      </ul>
      <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding(cmprEstm) === false ? '입찰하기' : '입찰가격 수정'} mode="normal" size="small">
        <BiddPopup cmprEstm={cmprEstm} formParam={formParam} closedHandler={closeTenderPop} />
      </RodalPopup>
    </>
  );
};

SelfList.displayName = 'SelfList';
export default withRouter(SelfList);
