import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { imgUrl } from '@src/utils/HttpUtils';
import BiddPopup from './popup/biddPop';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import PageNavigator from '@src/components/common/PageNavigator';
// import MypageTender from '@src/components/common/popup/MypageTender';
import { isBidding } from '@src/utils/sellcar/CmprEstmUtil';
import { HH24_STT } from '@src/constant/mbSlReqStt';
import { setComma } from '@src/utils/StringUtil';

const BiddCompList = memo(() => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [page] = useState(1);
  const [pageQtt] = useState(10);

  const { compBiddList, recordCount } = useSelector((store) => store.compareEstm);
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
  const [compBidd, setCompBidd] = useState({});
  //const [isBidding, setIsBidding] = useState(true);
  const [cmprEstm, setCmprEstm] = useState({});

  const [isDimm, setIsDimm] = useState(false);
  const [isTender, setIsTender] = useState(false);

  const handleTenderPopupOpen = useCallback(
    (e, deps) => {
      e.preventDefault();
      console.log("deps::",deps);
      setCompBidd(deps);
      setCmprEstm(deps);
      if (hasMobile) {
        setIsTender(true);
        setIsDimm(true);
      } else {
        setTenderPop(true);
      }
      // setIsBidding(true);
    },
    [setTenderPop]
  );

  const handleClose = useCallback((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsDimm(false);
    setIsTender(false);
  }, []);

  const handleTenderPopupClose = useCallback(
    (e) => {
      e.preventDefault();
      setTenderPop(false);
    },
    [setTenderPop]
  );

  const goDetail = (o) => {
    Router.push(`/mypage/dealer/buycar/detail?slReqId=${o.slReqId}`).then(() => {
      window.scrollTo(0, 0);
    });
  };

  if (hasMobile) {
    return (
      <>
        {isEmpty(compBiddList) === true ? (
          <div className="list-none-wrap">
            <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
          </div>
        ) : (
          <>
            <ul className="admin-list-wrap">
              <li>
                <div className="goods-list admin-list tp4">
                  <ul>
                    {compBiddList.map((o, idx) => {
                      return (
                        <li key={idx}>
                          <span>
                            <div className="img-cover">
                              <p className="state normal">
                                <>
                                  {(o.hh24AuctSttDvcd === '02' && (o.auctSttDtlDvcd === '000'||o.auctSttDtlDvcd === '001'||o.auctSttDtlDvcd === '002')) && <Button size="mid" background="blue80" title="입찰가격 수정" width={160} dataContext={o} onClick={handleTenderPopupOpen} />}
                                  {(o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '003') && <span className="tender-end">입찰 종료</span>}
                                  {o.hh24AuctSttDvcd === '03' && <span className="tender-co">낙찰되었습니다</span>}
                                  {(o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '004') && <span className="tender-end">유찰되었습니다.</span>}
                                </>
                              </p>
                              <img src={`${imgUrl}${o.phtUrl}`} alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <Link href={`/mypage/dealer/buycar/detail?slReqId=${o.slReqId}`}>
                                <a>
                                  <h5 className="subject">
                                    {o.crMnfcCdNm} {o.crMdlCdNm} {o.crClsCdNm} {o.crDtlClsCdNm}
                                  </h5>
                                </a>
                              </Link>
                              <div className="info-wrap">
                                <div className="info">
                                  <span>{o.frmYyyy}식</span>
                                  <span>{o.crNo}</span>
                                  <span>{o.drvDist}km</span>
                                  <span>{o.fuel}</span>
                                </div>
                              </div>
                              <div className="bidding-wrap tp2">
                                <span>
                                  관심<em>{o.itrtDrlCnt}</em>명
                                </span>
                                <span>
                                  입찰<em>{o.biddDrlCnt}</em>명
                                </span>
                              </div>
                            </div>
                          </span>
                          <ul className="car-date-wrap tp3">
                            <li>
                              선택가 : <span className="tx-blue80">{o.sbidAmt}</span>만원
                            </li>
                            <li>
                              최고가 : <span className="tx-blue80">{o.maxAmt}</span>만원
                            </li>
                            <li>
                              내견적 : <span className="tx-blue80">{o.biddAmt}</span>만원
                            </li>
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          </>
        )}
        <div className={isDimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleClose} />
        <MobBottomArea active={isTender} isFixButton={true} zid={101}>
          <BiddPopup isMobile={true} cmprEstm={cmprEstm} closedHandler={handleClose} mobIsBidding={isBidding(cmprEstm)} />
        </MobBottomArea>
      </>
    );
  }

  return (
    <>
      <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
        <caption className="away">결제내역</caption>
        <colgroup>
          <col width="59%" />
          <col width="7%" />
          <col width="7%" />
          <col width="7%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>차량정보</th>
            <th>선택가</th>
            <th>최고가</th>
            <th>내견적</th>
            <th>진행상태</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(compBiddList) &&
            compBiddList.map((o, idx) => (
              <tr key={idx}>
                <td>
                  <div className="img-cover">
                    <img src={`${imgUrl}${o.phtUrl}`} alt="차량 이미지" />
                  </div>
                  <div className="summary" onClick={() => goDetail(o)}>
                    <h4 className="subject ellipsis bidd-subject">
                      {o.crMnfcCdNm} {o.crMdlCdNm} {o.crClsCdNm} {o.crDtlClsCdNm}
                    </h4>
                    <ul className="info">
                      <li>{o.crNo}</li>
                      <li>{o.frmYyyy}식</li>
                      <li>{o.drvDist}km</li>
                      <li>{o.fuel}</li>
                    </ul>
                  </div>
                </td>
                <td>
                  {o.hh24AuctSttDvcd === '03' && <><span>{setComma(o.sbidAmt)}</span>만원</>}&nbsp;
                </td>
                <td>
                  {((o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '003') ||
                    (o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '004') ||
                    (o.hh24AuctSttDvcd === '03'))
                    && <><span>{setComma(o.maxAmt)}</span>만원</>}&nbsp;
                </td>
                <td>
                  <span>{setComma(o.biddAmt)}</span>만원
                </td>
                <td>
                  <>
                    {(o.hh24AuctSttDvcd === '02' && (o.auctSttDtlDvcd === '000'||o.auctSttDtlDvcd === '001'||o.auctSttDtlDvcd === '002')) && <Button size="mid" background="blue80" title="입찰가격 수정" width={160} dataContext={o} onClick={handleTenderPopupOpen} />}
                    {(o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '003') && <span className="tender-end">입찰 종료</span>}
                    {o.hh24AuctSttDvcd === '03' && <span className="tender-co">낙찰되었습니다</span>}
                    {(o.hh24AuctSttDvcd === '02' && o.auctSttDtlDvcd === '004') && <span className="tender-end">유찰되었습니다.</span>}
                    <br />( 관심 {o.itrtDrlCnt} 명 | 입찰 {o.biddDrlCnt} 명 )
                  </>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PageNavigator recordCount={recordCount} currentPage={page} recordSize={pageQtt} className="mt32" />
      {/* <RodalPopup show={tenderPop} type={'fade'} closedHandler={handleTenderPopupClose} title={isBidding === false ? '입찰하기' : '입찰가격 수정'} mode="normal" size="small"> */}
      <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding(cmprEstm) === false ? '입찰하기' : '입찰가격 수정'} mode="normal" size="small">
        {/* <MypageTender
          isBidding={true}
          id={{ slReqId: compBidd.slReqId, hh24AuctId: compBidd.hh24AuctId, dlrBiddNo: compBidd.dlrBiddNo }}
          defaultValue={compBidd.biddAmt}
          listType="compBiddList"
          closedHandler={handleTenderPopupClose}
        /> */}
        {/* <BiddPopup cmprEstm={cmprEstm} formParam={formParam} closedHandler={handleTenderPopupClose} /> */}
        <BiddPopup cmprEstm={cmprEstm} closedHandler={closeTenderPop} />
      </RodalPopup>
    </>
  );
});

BiddCompList.displayName = 'BiddCompList';
export default withRouter(BiddCompList);
