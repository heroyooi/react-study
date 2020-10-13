import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from "next/link";
import AppLayout from '@src/components/layouts/AppLayout';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingView = ({ router }) => {
  const { result, report } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // bottom sheet popup
  const createBodyPortal = useCreatePortalInBody(null, "wrap");
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const handleOpen = useCallback((e) => {
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
        bottom: 0,
        color: '#fff'
      }
    });
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    useEffect(() => {
      if (Boolean(report) === true) {
        setActive(true);
        setDimm(true);
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 0,
          }
        });
      }
    }, []);
    const [isActive, setIsActive] = useState(false);
    const handleActive = useCallback((e) => {
      e.preventDefault();
      setIsActive(prevActive => !prevActive)
    }, [isActive]);

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
              </>
            ) : (
              <>
                <div className="tit-wrap">
                  <h4 className="fl">차량 정보</h4>
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
                  </tbody>
                </table>

                <MarketPriceGraph />
              </>
            )}
          <div className="re-price">
            <h3 className="tit2">시세 재검색</h3>
            <Buttons align="center" marginTop={16}>
              <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건 검색" width={46} measure={'%'} height={56} href="pricingSearch" />
              <Button size="big" background="blue20" color="blue80" radius={true} title="차량번호로 조회" width={46} measure={'%'} height={56} marginLeft={2} mgMeasure={'%'} href="pricingSearchNum" />
            </Buttons>
          </div>
        </div>

        {!withoutList && <Link href="/sell/sellHome"><a><div className="bn-wrap mt48"><p>현대 오토벨에서<span>내차팔기</span></p></div></a></Link>}

        {/* <MobBottomArea isFix={true} isSimple={true}>
          {withoutList && <Link href="/sell/sellHome"><a><div className="bn-wrap mt48"><p>현대 오토벨에서<span>내차팔기</span></p></div></a></Link>}
        </MobBottomArea>  */}

      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(PricingView);
