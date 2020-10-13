import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import BtnShare from '@src/components/common/BtnShare';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MarketViewNum = ({ router }) => {
  const { result, report } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // bottom sheet popup
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  useEffect(() => {
    if (hasMobile) {
      if (Boolean(report) === true) {
        setActive1(true);
        setDimm1(true);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 120,
            color: '#fff'
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isActive, setIsActive] = useState(false);
  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
    },
    [isActive]
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
        bottom: 56
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

              <div className="re-price">
                <h3 className="tit2">시세 재검색</h3>
                <Buttons align="center" marginTop={16}>
                  <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건 검색" width={163} height={56} href="marketSearch" />
                  <Button size="big" background="blue20" color="blue80" radius={true} title="차량번호로 조회" width={163} height={56} />
                </Buttons>
              </div>
            </>
          ) : (
            <>
              <div className="tit-wrap">
                <h4 className="fl">차량 기본 정보</h4>
                <div className="btn-wrap fr">
                  <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} href="marketSearchFilter03" />
                  <Button size="sml" line="gray" radius={true} title="시세리포트 출력" width={96} marginLeft={8} onClick={handleOpenReport} />
                </div>
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="27%" />
                  <col width="25%" />
                  <col width="20%" />
                  <col width="28%" />
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
                </tbody>
              </table>
              <Buttons align="right">
                <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={96} marginTop={8} marginBottom={16} href="/marketPrice/marketInfo" />
              </Buttons>
              {!isActive && <Button size="full" background="blue80" radius={true} title={'결과보기'} height={38} fontSize={14} onClick={handleActive} />}
              {/* <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} /> */}
              {isActive && <MarketPriceGraph />}
            </>
          )}
        </div>
        {!withoutList && (
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

        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1}>
          <div className="inner">
            <div className="report-wrap">
              <div className="report-tit">
                <div className="img-wrap">
                  <img src="/images/mobile/common/ico-certification.svg" alt="오토벨 인증마크" />
                </div>
                <div className="tit-wrap">
                  <span className="num">NO.1029-018279</span>
                  <span className="date">발급일 2019.10.10</span>
                  <h5 className="tit">
                    AUTOBELL PRICING REPORT<em>오토벨에서 제공하는 내차판매 시, 시세정보입니다.</em>
                  </h5>
                </div>
              </div>

              <div className="report-info">
                <div className="img-wrap">
                  <img src="/images/mobile/dummy/market-car-img.png" alt="내 차량 이미지" />
                </div>
                <div className="car-info">
                  <p className="car-name">제네시스 G80 3.3 GDI AWD 프레스티지</p>
                  <div className="sharing-wrap">
                    <i className="ico-sharing" onClick={handleOpenShare} />
                    <i className="ico-download" />
                  </div>
                  <table summary="차량 정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>차량번호</th>
                        <td>09소0119</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>62,180km</td>
                      </tr>
                      <tr>
                        <th>차량연식</th>
                        <td>2016년</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>흰색</td>
                      </tr>
                      <tr>
                        <th>연료</th>
                        <td>전기 + 가솔린</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>1,999 cc</td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td>2016년 4월 18일</td>
                      </tr>
                      <tr>
                        <th>신차출고가</th>
                        <td>3,851 만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="car-option">
                  <li className="on">
                    <i className="ico-sunroof" />
                    <span>썬루프</span>
                  </li>
                  <li className="on">
                    <i className="ico-navigation" />
                    <span>네비게이션</span>
                  </li>
                  <li className="on">
                    <i className="ico-smartcruze" />
                    <span>크루즈컨트롤</span>
                  </li>
                  <li className="on">
                    <i className="ico-hud" />
                    <span>HUD</span>
                  </li>
                  <li className="on">
                    <i className="ico-around-view" />
                    <span>어라운드뷰</span>
                  </li>
                  <li className="on">
                    <i className="ico-smart-key" />
                    <span>스마트키</span>
                  </li>
                </ul>
              </div>

              <MarketPriceGraph />
            </div>
          </div>
        </MobBottomArea>
        <div className={dimm2 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm2} />
        <MobBottomArea active={active2}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            <BtnShare />
          </div>
        </MobBottomArea>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

MarketViewNum.propTypes = {
  router: PropTypes.object
};

export default withRouter(MarketViewNum);
