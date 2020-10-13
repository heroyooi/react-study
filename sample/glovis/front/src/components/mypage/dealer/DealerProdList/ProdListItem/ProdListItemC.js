import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import qs from 'qs';

import className from 'classnames/bind';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

import { imgUrl, frontUrl } from '@src/utils/HttpUtils';
import { setComma } from '@src/utils/StringUtil';
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary';

const ProdListItemC = ({ item, mss, fuel, reason, checked, checkItem, showPopEventHandler, extendPeriod, reloadListHandler }) => {
  console.log('ProdListItemC item : ', item);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const {
    dlrPrdId,
    auctSbidCrYn,
    sbidCrYn,
    car,
    lvstdCrYn,
    lvshotCrYn,
    frnchsCrYn,
    sttDvcd,
    dlrPrdAdLstList,
    updatePassInfoList
  } = item;
  const { phtUrl = '' } = car?.photoList[0];
  const adTitle = useMemo(() => dlrPrdAdLstList?.map((ad) => ad?.prdNm).join(', ') ?? '', [item?.dlrPrdAdLstList]);

  return (
    <>
      {!hasMobile ? (
        <>
          <div className="admin-list tp2">
            <div className="content-top">
              <div className="img-cover">
                <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
              </div>

              <ProdCarSummary item={car} mss={mss} fuel={fuel}>
                {
                  sttDvcd === '0060' &&
                  <p className="product-name">{adTitle}</p>
                }
              </ProdCarSummary>

              {/* <div className="summary">
                    <h4 className="subject">{item?.crNm ?? `${item?.crMnfcCdNm} ${item?.crMdlCdNm} ${item?.crClsCdNm}`}</h4>
                    <ul className="info">
                        <li>{item?.crNo}</li>
                        <li>{item?.frmYyyy}년형</li>
                        <li>{setComma(item?.drvDist)}km</li>
                        <li>{mss}</li>
                        <li>{fuel}</li>
                    </ul>
                    <p className="product-name">대당이용권, 자동업데이트</p>
                </div> */}
              {
                sttDvcd === '0060' &&
                <p className="price-tp7">
                  <em>낙찰금액</em>
                  {setComma(item?.slAmt)}
                  <span className="won">만원</span>
                </p>
              }

              <ul className="numerical">
                <li>
                  <i className="ico-dot sml" />
                  등록일<span>{moment(item?.regDt || new Date()).format('YYYY-MM-DD')}</span>
                </li>
                {
                  sttDvcd === '0060' &&
                  <>
                    <li>
                      <i className="ico-dot sml" />
                      판매일 <span>{moment(item?.updDt || new Date()).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <i className="ico-dot sml" />
                      소요일 <span>{moment(item?.updDt || new Date()).diff(moment(item?.regDt || new Date()), 'days') ?? 0}일</span>
                    </li>
                  </>
                }
                {
                  sttDvcd === '0090' &&
                  <>
                    <li>
                      <i className="ico-dot sml" />
                      보류일<span>{moment(item?.regDt || new Date()).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <i className="ico-dot sml" />
                      보류사유<span>{item?.holdRsn}</span>
                    </li>
                  </>
                }
                {
                  sttDvcd === '0070' &&
                  <>
                    <li>
                      <i className="ico-dot sml" />
                      삭제일<span>{moment(item?.updDt || new Date()).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <i className="ico-dot sml" />
                      삭제사유<span>{reason}</span>
                    </li>
                  </>
                }
              </ul>

            </div>
          </div>
        </>
      ) : (
        <>
          <span>
            <div className="img-cover">
              <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
            </div>
            <div className="summary">
              <Link href={`/buycar/buyCarDetailType?${qs.stringify({ dlrPrdId })}`}>
                <a>
                  <h5 className="subject">{item?.car?.crNm ?? `${item?.car?.crMnfcCdNm || ''} ${item?.car?.crMdlCdNm || ''} ${item?.car?.crClsCdNm || ''}`}</h5>
                </a>
              </Link>
              <div className="info-wrap">
                <div className="info">
                  <span>{item?.car?.crNo}</span>
                  <span>{item?.car?.frmYyyy}년형</span>
                  <span>{setComma(item?.car?.drvDist)}km</span>
                </div>
                <div className="price-wrap">
                  <div className="price-left">
                    <p className="price-tp2">
                      {setComma(item?.slAmt)}
                      <span className="won">만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <ul className="car-date-wrap">
            <li>등록일 : {item?.regDt || moment(new Date()).format('YYYY-MM-DD')}</li>
            {sttDvcd === '0060' ? ( // 판매완료
              <>
                <li>판매일 : {item?.slCmplDt || moment(new Date()).format('YYYY-MM-DD')}</li>
                <li>
                  소요일 : <span className="tx-blue80">{moment(item?.slCmplDt || new Date()).diff(moment(item?.regDt || new Date(), 'day'))}</span>
                </li>
              </>
            ) : sttDvcd === '0070' ? ( // 삭제완료
              <>
                <li>삭제일 : {item?.prdDelDt || moment(new Date()).format('YYYY-MM-DD')}</li>
                <li>
                  <span className="tx-blue80">{item?.slDelRsn}</span>
                </li>
              </>
            ) : sttDvcd === '0090' ? ( // 보류차량
              <>
                <li>보류일? : {item?.updDt || moment(new Date()).format('YYYY-MM-DD')}</li>
              </>
            ) : (
              ''
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default ProdListItemC;
