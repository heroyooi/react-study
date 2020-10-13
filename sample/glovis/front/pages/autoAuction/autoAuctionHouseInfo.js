import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { produce } from 'immer';
import { ClipLoader } from 'react-spinners';
//import Link from 'next/link';

import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Button from '@lib/share/items/Button';

import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobViewMap from '@src/components/common/MobViewMap';
import { getAuctionHouseList, setInputInfo } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck } from '@src/utils/LoginUtils';
import { SystemContext } from '@src/provider/SystemProvider';
//import { radio_auction_house, auction_check_list } from '@src/dummy';
const globalThis = require('globalthis')();

const AutoAuctionHouseInfo = () => {
  //console.log('*** autoAuctionHouseInfo > isLoginLiveCheck', isLoginLiveCheck());
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내 차 출품하기',
          options: ['back', 'gnb']
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
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const { inputInfo, auctionHouseRadio, auctionOngoing } = useSelector((state) => state.autoAuction);
  const [formData, setFormData] = useState(inputInfo);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  // 화면 Refresh 여부 감지 (진행상태, Refresh 이후 Redirect URL)
  useDetectPageRefresh(auctionOngoing, '/autoAuction/autoAuctionMain');

  const onChangeAuctHouse = (e, value) => {
    setFormData(
      produce((draft) => {
        draft.auctId = value;
      })
    );
  };

  const nextStep = (e, url) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setInputInfo(formData));
    Router.push(url).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  if (hasMobile) {
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpMap, setFpMap] = useState(false);
    const [seq, setSeq] = useState(0);

    const handleFullpagePopup = useCallback(
      (name, seq) => (e) => {
        e.preventDefault();
        if (name === 'map') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '경매장 위치 안내',
              options: ['close']
            }
          });
          setSeq(seq);
          setFpMap(true);
        }
      },
      [fpMap]
    );
    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={2} mode="stick" />
        </div>

        <div className="content-wrap radio-auction-chk">
          <RadioGroup
            dataList={auctionHouseRadio}
            defaultValue={formData.auctId}
            boxType={true}
            disabledLabel={true}
            onChange={(e) => onChangeAuctHouse(e, e.currentTarget.getElementsByTagName('input')[0].value)}
          >
            <RadioItem>
              <p className="tit4">분당 경매장</p>
              <p className="con">
                서울 중앙/동부/남부/동북부, 경기 남부지역에서
                <br />
                이용하시면 편리합니다.
              </p>
              {/* <Link href="viewMap?seq=1">
                <a>위치보기</a>
              </Link> */}
              <Button size="sml" color="blue80" title="위치보기" onClick={handleFullpagePopup('map', 1)} />
            </RadioItem>
            <RadioItem>
              <p className="tit4">시화 경매장</p>
              <p className="con">
                서울 서부/서북부, 인천, 경기 서부지역에서
                <br />
                이용하시면 편리합니다.
              </p>
              {/* <Link href="viewMap?seq=3">
                <a>위치보기</a>
              </Link> */}
              <Button size="sml" color="blue80" title="위치보기" onClick={handleFullpagePopup('map', 2)} />
            </RadioItem>
            <RadioItem>
              <p className="tit4">양산 경매장</p>
              <p className="con">
                부산, 울산, 대구, 경상도 지역에서
                <br />
                이용하시면 편리합니다.
              </p>
              {/* <Link href="viewMap?seq=2">
                <a>위치보기</a>
              </Link> */}
              <Button size="sml" color="blue80" title="위치보기" onClick={handleFullpagePopup('map', 3)} />
            </RadioItem>
          </RadioGroup>
          <Button className="fixed" size="full" background="blue80" title="다음" onClick={(e) => nextStep(e, '/autoAuction/exhibitorInfo')} />
        </div>
        <MobFullpagePopup active={mFullpagePopup}>{fpMap && <MobViewMap seq={seq} />}</MobFullpagePopup>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

AutoAuctionHouseInfo.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getAuctionHouseList());

  return {
    query
  };
};

export default AutoAuctionHouseInfo;
