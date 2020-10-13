import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from "next/link";
import AppLayout from '@src/components/layouts/AppLayout';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SlideBanner from '@src/components/common/banner/SlideBanner'
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingViewNum = ({ router }) => {
  const { result, report } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '조회결과',
        options: ['back', 'voucher', 'gnb'],
        events: [null, ()=>{alert('이용 구매 페이지로 이동합니다.')}, null]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    useEffect(() => {
      if (Boolean(report) === true) {
        setActive1(true);
        setDimm1(true);
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 120,
          }
        });
      }
    }, []);
    const [isActive, setIsActive] = useState(false);
    const handleActive = useCallback((e) => {
      e.preventDefault();
      setIsActive(prevActive => !prevActive)
    }, [isActive]);

    // bottom sheet button select
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }, []);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      document.getElementsByTagName('html')[0].style.overflow = "auto";
    }, []);

    return (
      <AppLayout>
        <div className="content-wrap market-view-sec pt14">
          {withoutList === true
            ? (
              <>
                <div className="search-none">
                  <h3>검색결과가 없습니다.</h3>
                  <p>
                    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                  </p>
                  <p className="tx-disabled">
                    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                  </p>
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
                    <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} href="pricingSearchFilter01" />
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
                    {
                      isActive && (
                        <>
                          <tr>
                            <th>차량번호</th>
                            <td colSpan="4">12가 3456</td>
                          </tr>
                          <tr>
                            <th>주행거리</th>
                            <td>4,591Km</td>
                            <th>연식</th>
                            <td>1,999cc</td>
                          </tr>
                          <tr>
                            <th>최초등록일</th>
                            <td colSpan="4">2016년 4월 18일</td>
                          </tr>
                        </>
                      )
                    }

                  </tbody>
                </table>
                {isActive && <Button className="fr" size="sml" line="gray" radius={true} title="차량정보 수정" width={96} marginTop={8} href="/pricingSystem/pricingInfo" />}

                <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} />

                <MarketPriceGraph />

                <div className="bid-info-wrap">
                  <h3 className="tit2">동급차량 실제 낙찰 정보</h3>
                  <ul className="goods-list tx-list">
                    <SlideBanner touch={true} dots={false} autoplay={false} customArrow={true} multiNum={1} infinite={false} markupAll={true} variableWidth={true}>
                      <li>
                        <p className="tit" onClick={handleOpenPop}>그랜저(IG) IG220 디젤 프리미엄</p>
                        <div className="cont">
                          <ul>
                            <li>2017년식</li>
                            <li>42,330km</li>
                            <li>경매일 : 2019.11</li>
                          </ul>
                          <div className="float-wrap">
                            <p className="fl">평가 : <span className="tx-blue80">A6</span></p>
                            <p className="price-tp8 fr">2,240<span className="won">만원</span></p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <p className="tit" onClick={handleOpenPop}>그랜저(IG) IG220 디젤 프리미엄</p>
                        <div className="cont">
                          <ul>
                            <li>2017년식</li>
                            <li>42,330km</li>
                            <li>경매일 : 2019.11</li>
                          </ul>
                          <div className="float-wrap">
                            <p className="fl">평가 : <span className="tx-blue80">A6</span></p>
                            <p className="price-tp8 fr">2,240<span>만원</span></p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <p className="tit" onClick={handleOpenPop}>그랜저(IG) IG220 디젤 프리미엄</p>
                        <div className="cont">
                          <ul>
                            <li>2017년식</li>
                            <li>42,330km</li>
                            <li>경매일 : 2019.11</li>
                          </ul>
                          <div className="float-wrap">
                            <p className="fl">평가 : <span className="tx-blue80">A6</span></p>
                            <p className="price-tp8 fr">2,240<span>만원</span></p>
                          </div>
                        </div>
                      </li>
                    </SlideBanner>
                  </ul>
                  <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
                  <MobBottomArea active={active} isFixButton={true}>
                    <div className="inner">
                      <div className="float-wrap btn-s mb20">
                        <h3 className="tit1 fl">그랜저(IG) IG220 디젤 프리미엄</h3>
                        <Button className="fr" size="sml" line="gray" radius={true} title="상세보기" width={50} href="/pricingsystem/PricingAuctionInfo" />
                      </div>
                      <table summary="낙찰정보에 대한 내용" className="table-tp1">
                        <caption className="away">낙찰정보 상세입니다.</caption>
                        <colgroup>
                          <col width="30%" />
                          <col width="70%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>경매일</th>
                            <td>2019.11.23</td>
                          </tr>
                          <tr>
                            <th>거점</th>
                            <td>분당</td>
                          </tr>
                          <tr>
                            <th>연식</th>
                            <td>2016년</td>
                          </tr>
                          <tr>
                            <th>최초등록일</th>
                            <td>2018-03-30</td>
                          </tr>
                          <tr>
                            <th>연료</th>
                            <td>디젤</td>
                          </tr>
                          <tr>
                            <th>미션</th>
                            <td>A/T</td>
                          </tr>
                          <tr>
                            <th>주행거리</th>
                            <td>52,333 km</td>
                          </tr>
                          <tr>
                            <th>옵션</th>
                            <td>ABS VDC 스마트키 내비(일반)</td>
                          </tr>
                          <tr>
                            <th>색상</th>
                            <td>NU9)그랑블루</td>
                          </tr>
                          <tr>
                            <th>배기량</th>
                            <td>2,199 cc</td>
                          </tr>
                          <tr>
                            <th>용도/소유</th>
                            <td>법인/법인상품</td>
                          </tr>
                          <tr>
                            <th>차대번호</th>
                            <td>KMHF14RBJA160647</td>
                          </tr>
                          <tr>
                            <th>평가</th>
                            <td className="tx-blue80 tx-b">A6</td>
                          </tr>
                          <tr>
                            <th>낙찰가</th>
                            <td className="tx-blue80 tx-b">2,240 만원</td>
                          </tr>
                        </tbody>
                      </table>
                      <Button className="fixed" size="full" background="blue80" title="확인" />
                    </div>
                  </MobBottomArea>
                </div>
                <Buttons align="center">
                  <Button size="mid" background="blue80" radius={true} title="낙찰정보 더보기" width={126} href="/pricingSystem/pricingBidInfo" />
                </Buttons>
              </>
            )}
        </div>

        <MobBottomArea isFix={true} isSimple={true}>
          {withoutList && <Link href="/sell/sellHome"><a><div className="bn-wrap mt48"><p>현대 오토벨에서<span>내차팔기</span></p></div></a></Link>}
        </MobBottomArea>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(PricingViewNum);
