import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';

import { selectCommonCodeList } from '@src/api/common/CommonCodeApi';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { waitingCarList } from '@src/dummy/carTypeCd';
import { preventScroll } from '@src/utils/CommonUtil';

const ProdWaitingCarFilter = ({ eventHandler, params, goWaitingCar, removeSelectedCar, popupHandler }) => {
  const [waitingFilterList, setWaitingFilterList] = useState([]);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const createBodyPortal = useCreatePortalInBody(null, 'wrap');

  const { sttDvcd, crMnfcCd, crMdlCd, sortValue } = params;

  const click = (e, item) => {
    console.log('click -> e', e);
    console.log('click -> item', item);

    e.preventDefault();
    eventHandler && eventHandler({
      sttDvcd: '0050',
      watingSortType: item.value,
      currentPage: 1
    });
  };

  useEffect(() => {
    const getWatingFilterList = async () => {
      const codelist = await getCommonCodeAsync('FM050');
      codelist[0].label = '전체';
      if (hasMobile) {
        codelist[0].cdId = '00';
        codelist[0].value = '00';
      }

      setWaitingFilterList(codelist);
      console.log('setWaitingFilterList : ', codelist);
    };
    getWatingFilterList();
  }, []);

  const [dimm1, setDimm1] = useState(false);
  const [active1, setActive1] = useState(false);

  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, []);

  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);

  // 버튼식 라디오
  const [radioCheckVal, setRadioCheckVal] = useState('00');
  const handleChangeRadio = useCallback((e, item) => {
    setRadioCheckVal(item.value);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    eventHandler({ sttDvcd: '0050', watingSortType: radioCheckVal, currentPage: 1 });
    handleCloseDimm1();
  };

  const makeSubTitle = (sttDvcd) => {
    if (sttDvcd === '0010') return '판매차량';
    if (sttDvcd === '0020') return '관리필요차량';
    if (sttDvcd === '0030') return '판단보류차량';
    if (sttDvcd === '0050') return '대기';
    if (sttDvcd === '0060') return '판매완료';
    if (sttDvcd === '0070') return '삭제';
    if (sttDvcd === '0090') return '보류';

    return '차량';
  };

  return (
    <>
      {!hasMobile ? (
        <>
          <div className="tabmenu tp9">
            <ul className="ui-tab">
              {waitingFilterList.map((waitingFilter, i) => (
                <li key={i} onClick={(e) => click(e, waitingFilter)} className={`${params?.watingSortType === waitingFilter?.value && 'on'}`}>
                  <a href="#">{waitingFilter?.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="float-wrap btn-s">
            <h3 className="tit2">{makeSubTitle(sttDvcd)} 목록</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
          </div>
          {createBodyPortal(
            <>
              <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
              <MobBottomArea active={active1} isFixButton={true} zid={101}>
                <div className="inner pb7">
                  <h3 className="tit1 pb7">상세조회</h3>
                  <ul className="m-menu-list tp1">
                    <li onClick={popupHandler('f1')}>
                      <div className="sel-wrap">
                        <span className="tit">제조사/모델</span>
                      </div>
                    </li>
                    <li className="btn-wrap">
                      <span className="tit">정렬</span>
                      <ul className="radio-block small col3">
                        {waitingFilterList.map((waitingFilter, i) => (
                          <li key={i}>
                            <Radio className="txt" label={waitingFilter?.label} value={waitingFilter?.cdId} checked={radioCheckVal} onClick={(e) => handleChangeRadio(e, waitingFilter)} />
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
                <Button className="fixed" size="full" background="blue80" title="조회" onClick={handleSearch} />
              </MobBottomArea>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProdWaitingCarFilter;
