import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import BtnShare from '@src/components/common/BtnShare';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCarInfoModify from '@src/components/common/MobCarInfoModify';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const MarketView = ({ router }) => {
  const { result, report, search } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const hasHyundai = useSelector((state) => state.common.hasHyundai);

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // bottom sheet popup
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);
  const [isActive, setIsActive] = useState(false);
  // 팝업
  const [reportPopupShow, setReportPopupShow, openReportPopup, closeReportPopup] = useRodal(false, true);
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);

  useEffect(() => {
    if (hasMobile) {
      if (Boolean(report) === true) {
        //setActive(true);
        //setDimm(true);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 120,
          color: '#fff'
        }
      });
      if (search === 'number') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 120,
            color: '#fff'
          }
        });
      }
      if (search === 'condition') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 48,
            color: '#fff'
          }
        });
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 0,
            color: '#fff'
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
    },
    [isActive]
  );

  // 풀페이지 팝업
  const [fpFilter01, setFpFilter01] = useState(false); // 제조사,모델,등급 팝업
  const [fpFilter01Result, setFpFilter01Result] = useState('yes'); // 제조사,모델,등급 팝업 (전달 소품1)
  const [fpFilter01Kind, setFpFilter01Kind] = useState(null); // 제조사,모델,등급 팝업 (전달 소품2)
  const [fpFilter01Research, setFpFilter01Research] = useState('no'); // 제조사,모델,등급 팝업 (전달 소품3)
  const [fpCarModify, setFpCarModify] = useState(false); // 차량정보수정 팝업

  const handleFullpagePopup = useCallback(
    (name, query) => (e) => {
      e.preventDefault();
      if (name === 'f1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '그랜저',
            options: ['back', 'reset']
          }
        });
        query.split('&').map((v) => {
          const val = v.split('=');
          if (val[0] === 'result') {
            setFpFilter01Result(val[1]);
            if (val[1] === 'no') setFpFilter01Kind(null);
          } else if (val[0] === 'kind') {
            setFpFilter01Kind(val[1]);
          } else if (val[0] === 'research') {
            setFpFilter01Research(val[1]);
          }
        });
        setFpCarModify(false);
        setFpFilter01(true);
      } else if (name === 'car_modify') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['back', 'close']
          }
        });
        setFpFilter01(false);
        setFpCarModify(true);
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    },
    [fpFilter01, fpCarModify]
  );
  const modelCallback = useCallback(
    (e) => {
      e.preventDefault();
      setFpFilter01(false)
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [dispatch]
  );
  const modCallback = useCallback(
    (e) => {
      e.preventDefault();
      setFpCarModify(false)
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [dispatch]
  );
  const handleOpenReport = useCallback((e) => {
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handleOpenShare = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);
  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);

  const closeMPop = useCallback(
    (e) => {
      e.preventDefault();
      setMPop(false);
    },
    [setMPop]
  );

  const handleReportPrint = useCallback(
    (e) => {
      openReportPopup(e, 'fade');
    },
    [openReportPopup]
  );

  const handleCertLink = (e) => {
    e.preventDefault();
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
    Router.push('/marketPrice/marketSearch');
  };

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
        bottom: search === 'number' ? (hasHyundai ? 0 : 56) : 0
      }
    });

    return (
      <AppLayout>
        <div className="content-wrap market-view-sec pt14">
          {withoutList === true ? (
            <>
              <div className="search-none">
                <h3>검색결과가 없습니다.</h3>
                <p>
                  1. 검색 옵션을 변경해서 다시 검색해 보세요.
                  <br />
                  2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                </p>
                <p className="tx-disabled">* 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.</p>
              </div>
            </>
          ) : (
            <>
              <div className="tit-wrap">
                <h4 className="fl">{search === 'number' ? '차량 기본 정보' : '차량 정보'}</h4>
                {search === 'number' && (
                  <div className="btn-wrap fr">
                    <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} href="marketSearchFilter01" onClick={handleFullpagePopup('f1', 'research=yes')} />
                    {!hasHyundai && <Button size="sml" line="gray" radius={true} title="시세리포트 출력" width={96} marginLeft={8} onClick={handleOpenReport} />}
                  </div>
                )}
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 정보</caption>
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
                  {search === 'number' && (
                    <>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="4">12가 3456</td>
                      </tr>
                      <tr>
                        <th>차량연식</th>
                        <td>2016</td>
                        <th>배기량</th>
                        <td>1,999cc</td>
                      </tr>
                      <tr>
                        <th>신차출고가</th>
                        <td>3,380km</td>
                        <th>연료</th>
                        <td>가솔린+전기</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>4,380km</td>
                        <th>색상</th>
                        <td>쥐색</td>
                      </tr>
                      <tr>
                        <th>차량옵션</th>
                        <td colSpan="4">-</td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td colSpan="4">2016년 4월 18일</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              {search === 'number' && (
                <>
                  <Button
                    className="fr"
                    size="sml"
                    line="gray"
                    radius={true}
                    title="차량정보 수정"
                    width={96}
                    marginTop={8}
                    href="/marketPrice/marketInfo"
                    onClick={handleFullpagePopup('car_modify')}
                  />
                  {hasHyundai ? (
                    <Button className="fixed" size="full" background="blue80" title={'결과보기'} height={56} onClick={handleOpenReport} />
                  ) : (
                    <Button size="full" background="blue80" radius={true} title={'결과보기'} height={38} fontSize={14} marginTop={16} onClick={handleActive} />
                  )}
                </>
              )}

              {/* {search === "number" && <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} />} */}

              {isActive && <MarketPriceGraph />}
            </>
          )}

          {(search === 'condition' || withoutList) && (
            <div className="re-price">
              <h3 className="tit2">시세 재검색</h3>
              <Buttons align="center" marginTop={16}>
                <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건 검색" width={46} measure={'%'} height={56} href="marketSearch" />
                <Button
                  size="big"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="차량번호로 조회"
                  width={46}
                  measure={'%'}
                  height={56}
                  marginLeft={2}
                  mgMeasure={'%'}
                  onClick={(e) => openMPop(e, 'fade')}
                />
              </Buttons>
            </div>
          )}
        </div>

        {withoutList && !hasHyundai && (
          <Link href="/sell/sellHome">
            <a>
              <div className="bn-wrap mt48">
                <p>
                  현대 오토벨에서<span>내차팔기</span>
                </p>
              </div>
            </a>
          </Link>
        )}

        {search === 'number' && !hasHyundai && (
          <MobBottomArea isFix={true} isSimple={true}>
            {!withoutList && <Button size="full" background="blue80" title="조회차량 판매하기" height={56} href="/sell/sellHome" />}
            {withoutList && (
              <Link href="/sell/sellHome">
                <a>
                  <div className="bn-wrap mt48">
                    <p>
                      현대 오토벨에서<span>내차팔기</span>
                    </p>
                  </div>
                </a>
              </Link>
            )}
          </MobBottomArea>
        )}

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">인증진행</p>
            <p>
              본인 차량만 시세조회가 가능하며
              <br />
              본인확인을 위한 인증절차가 필요합니다.
            </p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeMPop} />
              <Button fontSize={14} title="인증진행" color="blue80" marginLeft={16} fontWeight={500} onClick={handleCertLink} />
            </Buttons>
          </div>
        </RodalPopup>

        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1}>
          <PricingReport handleOpenShare={handleOpenShare} />
        </MobBottomArea>
        <div className={dimm2 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm2} />
        <MobBottomArea active={active2}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            <BtnShare />
          </div>
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup}>
          {fpFilter01 && <MobFilterModel result={fpFilter01Result} kind={fpFilter01Kind} research={fpFilter01Research} callback={modelCallback} />}
          {fpCarModify && <MobCarInfoModify callback={modCallback} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

MarketView.propTypes = {
  router: PropTypes.object
};

export default withRouter(MarketView);
