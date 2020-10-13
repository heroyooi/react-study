import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

// Components (Only Mobile)
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCarInfoModify from '@src/components/common/MobCarInfoModify';

const MarketViewGrade = ({ router }) => {
  const { result, report } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // bottom sheet popup
  const createBodyPortal = useCreatePortalInBody(null, 'wrap');
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);
  const [isActive, setIsActive] = useState(false);
  const [fpCarModify, setFpCarModify] = useState(false); // 차량정보수정 팝업

  useEffect(() => {
    if (hasMobile) {
      if (Boolean(report) === true) {
        setActive(true);
        setDimm(true);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 120
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = useCallback((e) => {
    e.preventDefault();
    setActive(true);
    setDimm(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);

  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);

  const handleConfirm = useCallback((e) => {
    console.log(e);
  }, []);

  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
    },
    [isActive]
  );

  // 풀페이지 팝업 Start
  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      e.preventDefault();
      if (name === 'car_modify') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['back', 'close']
          }
        });
        setFpCarModify(true);
      }
    },
    [fpCarModify]
  );

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '조회결과',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });

    // 풀페이지 팝업 End

    return (
      <AppLayout>
        <div className="content-wrap market-view-sec grade pt14">
          <div className="tit-wrap">
            <h4 className="fl">차량 기본 정보</h4>
          </div>
          <table summary="차량 정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본 정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="25%" />
              <col width="20%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량명</th>
                <td colSpan="4">현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td colSpan="4">12가 3456</td>
              </tr>
              <tr>
                <th>차량연식</th>
                <td>2016</td>
                <th>색상</th>
                <td>쥐색</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td colSpan="4">4,380km</td>
              </tr>
            </tbody>
          </table>
          <Button
            className="fr"
            size="sml"
            line="gray"
            radius={true}
            title="차량정보 수정"
            width={96}
            marginTop={8}
            marginBottom={32}
            href="/marketPrice/marketInfo"
            onClick={handleFullpagePopup('car_modify')}
          />

          <MobSelectBox
            options={[
              { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '스마트', hasDetail: '/marketPrice/MarketSpecify' },
              { id: 'm-radio2', value: 2, checked: false, disabled: false, label: '모던', hasDetail: '/marketPrice/MarketSpecify' },
              { id: 'm-radio3', value: 3, checked: false, disabled: false, label: '프리미엄', hasDetail: '/marketPrice/MarketSpecify' },
              { id: 'm-radio4', value: 4, checked: false, disabled: false, label: '모던 스페셜', hasDetail: '/marketPrice/MarketSpecify' },
              { id: 'm-radio5', value: 5, checked: false, disabled: false, label: '프리미엄 스페셜', hasDetail: '/marketPrice/MarketSpecify' }
            ]}
            customButton={true}
            customButtonName="해당등급을 선택하세요"
            customButtonHeight={56}
            areaClass="btn-v"
            onClick={handleConfirm}
          />
        </div>
        {/* <Button className="fixed" size="full" background="blue80" title="확인" height={56} /> */}
        <MobFullpagePopup active={mFullpagePopup}>{fpCarModify && <MobCarInfoModify />}</MobFullpagePopup>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

export default withRouter(MarketViewGrade);
