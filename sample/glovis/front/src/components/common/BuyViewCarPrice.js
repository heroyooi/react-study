import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { imgUrl } from '@src/utils/HttpUtils';
import FilterRange from '@lib/share/items/FilterRange';
import Button from '@lib/share/items/Button';
import { setComma, telToStrFormat } from '@src/utils/StringUtil';

/*
 * 04.01 _BuyViewCarPrice 와 통합
 *
 * html 변경이력
 * 03.13 : className="dealerNum" <span> 추가
 */

const BuyViewCarPrice = ({ dlrPrdId, carInfo = {}, carBaseInfo = {}, dealerInfo = {}, buttonType = 'N', openCounselPopup, openCostPopup, onClickOnlineBuy }) => {
  // if ((carInfo?.hsvcYn || 'N') === 'Y') buttonType = 2;
  buttonType = carInfo?.hsvcYn || 'N';
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const setTags = useCallback(() => {
    const tags = [];
    if (carInfo?.ewYn === 'Y') tags.push({ color: 'blue60', value: 'EW' });
    if (carInfo?.hsvcYn === 'Y') tags.push({ color: 'purple', value: '홈서비스' });
    if (carInfo?.icmAcrtCrYn === 'Y') tags.push({ color: 'sky', value: '수입인증' });
    if (carInfo?.frnchsYn === 'Y') tags.push({ color: 'gold', value: '프랜차이즈' });
    if (carInfo?.capMallYn === 'Y') tags.push({ color: 'green', value: '금융인증' });

    const arr = [];
    tags.map((v, i) => {
      arr.push(
        <em key={i} className={`tag-tp2 tx-${v.color}`}>
          {v.value}
        </em>
      );
    });
    return arr;
  }, []);

  if (hasMobile) {
    // console.log('carBaseInfo ->', carBaseInfo);
    // console.log('carInfo -> ::::', carInfo);
    return (
      /*
      carBaseInfo.frmYyyy, `${setComma(carBaseInfo.drvDist)}km`, carBaseInfo.fuelNm, carInfo.locNm, `${setComma(carInfo.slAmt)}만원`]);
      */
      <>
        <div className="view-car-point">
          <div className="tag-wrap">
            {/* <em className="tag-tp1 tx-blue60">EW</em>
            <em className="tag-tp1 tx-purple">홈서비스</em>
            <em className="tag-tp1 tx-sky">수입인증</em> */}
            <span className="list-tag2">{setTags()}</span>
          </div>
          <h3>{carInfo.crNm}</h3>
          <div className="point-info-set">
            <span>{carBaseInfo.frmYyyy}</span>
            <span>{carBaseInfo.fuelNm}</span>
            <span>{carBaseInfo.drvDist === 0 ? `0 ` : setComma(carBaseInfo.drvDist) + ` `}km</span>
            <span>{carInfo.locNm}</span>
          </div>
          <p className="price-tp1">
            {setComma(carInfo.slAmt)}
            <span className="won">만원</span>
          </p>
        </div>
        {hasMobile && (
          <div className="market-price-graph v-buy">
            <div className="market-graph-box" style={{}}>
              <div className="market-graph-view">
                <img className="graph-bg" src="/images/contents/market-price-range.png" alt="" />
                <p className="price-tit">적정시세범위</p>
                <dl className="price-box price-current">
                  <dt>현재내차시세</dt>
                  <dd>{setComma(carBaseInfo?.appPrice || 2)}</dd>
                </dl>
                <dl className="price-box price-min">
                  <dt>최저적정시세</dt>
                  <dd>{setComma(carBaseInfo?.minPrice || 1)}</dd>
                </dl>
                <dl className="price-box price-max">
                  <dt>최고적정시세</dt>
                  <dd>{setComma(carBaseInfo?.maxPrice || 3)}</dd>
                </dl>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="view-car-point">
      <div className="car-point-info">
        <div className="point-info-price">
          <p className="price-tp1">
            {setComma(carInfo?.slAmt || 0)}
            <span className="won">만원</span>
          </p>
        </div>
        <div className="point-info-set">
          <span>{carBaseInfo?.carNo || ''}</span>
          <span>{carBaseInfo?.frstRegDt || ''}</span>
          <span>{setComma(carBaseInfo?.drvDist || 0)}km</span>
          <span>{carBaseInfo?.mssNm || ''}</span>
          <span>{carBaseInfo?.fuelNm || ''}</span>
        </div>
        <div className="price-grade-tp1">
          <div className="cur-price">
            <p className="veiw-point-tit">
              이 차량의 현재 시세<span> (단위:만원)</span>
            </p>
            <div className="proper-price">
              <FilterRange
                rangeUnit="적정시세"
                initMin={Number(carBaseInfo?.minPrice || 0)}
                initMax={Number(carBaseInfo?.maxPrice || 1)}
                appPrice={Number(carBaseInfo?.appPrice || 0)}
                priceSolo={true}
                disabled={true}
              />
            </div>
          </div>
        </div>
        {!isEmpty(dealerInfo) && (carInfo?.lvstdYn || 'N') === 'N' && (
          <div className="point-info-seller">
            <div className="seller-info-tp3">
              <div className="img-wrap">
                <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                  <a>
                    <img src={dealerInfo.dlrProfFileUrl ? `${imgUrl}${dealerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-mid.png'} alt="판매자 이미지" />
                  </a>
                </Link>
                <span onClick={(e) => openCounselPopup(e, 'fade')} />
              </div>
              <div className="tx-wrap">
                <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                  <a className="veiw-point-tit">{`${dealerInfo?.dlrNm || ''}(${dealerInfo?.dlrEntrCorpNm || ''})`}</a>
                </Link>
                <span className="dealerNum">종사원증번호 : {dealerInfo?.dlrEn || ''}</span>
                <span>전화번호 : {dealerInfo.omcTelNo ? telToStrFormat(dealerInfo.omcTelNo) : ''}</span>
                <ul>
                  <li>
                    판매중 :&nbsp;
                    <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                      <strong>{setComma(dealerInfo?.onSaleCarCnt || 0)} 대</strong>
                    </Link>
                  </li>
                  <li>
                    판매완료 :&nbsp;
                    <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=2`}>
                      <strong>{setComma(dealerInfo?.cmplSaleCarCnt || 0)} 대</strong>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="car-point-btn">
        {buttonType === 'N' ? (
          <Button size="full" background="gray" title="총비용 계산" height={60} onClick={openCostPopup} buttonMarkup={true} />
        ) : (
          <ul>
            <li>
              <Button size="full" background="gray" title="총비용 계산" height={60} onClick={openCostPopup} buttonMarkup={true} />
            </li>
            {carInfo.hsvcYn === 'Y' && (
              <li>
                <Button size="full" background="red60" title="온라인 구매하기" height={60} onClick={onClickOnlineBuy} buttonMarkup={true} />
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

BuyViewCarPrice.propTypes = {
  dlrPrdId: PropTypes.string,
  carInfo: PropTypes.object,
  carBaseInfo: PropTypes.object,
  dealerInfo: PropTypes.object,
  buttonType: PropTypes.number,
  openCounselPopup: PropTypes.func,
  openCostPopup: PropTypes.func,
  onClickOnlineBuy: PropTypes.func
};

export default BuyViewCarPrice;
