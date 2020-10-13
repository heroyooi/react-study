import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import KakaoMap from '@src/components/common/KakaoMap';
import Button from '@lib/share/items/Button';
import { imgUrl } from '@src/utils/HttpUtils';
import { setComma, telToStrFormat } from '@src/utils/StringUtil';
import { objIsEmpty } from '@src/utils/CommonUtil';

const BuyCarDetailSellerTab = memo(({ carInfo, dealerInfo, bannerInfo, equivalentList, isMobile, smartList, onCounselPopUpOpen, onClickSeller }) => {
  if (isMobile) {
    const onClickSellerInfo = (e) => {
      e.preventDefault();
      if (onClickSeller) onClickSeller(e);
    };

    return (
      <>
        <div className="seller-wrap">
          <div className="profile">
            <div className="img-wrap">
              <img src={dealerInfo.dlrProfFileUrl ? `${imgUrl}${dealerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-big.png'} alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              <Button size="sml" background="blue20" color="blue80" radius={true} title="판매자정보" fontSize={10} width={63} height={24} onClick={onClickSellerInfo} />
              <h2>{dealerInfo.dlrNm}</h2>
              <p>{dealerInfo.omcTelNo ? telToStrFormat(dealerInfo.omcTelNo) : ''}</p>
              <ul className="employee-card">
                <li>종사원증 : {dealerInfo.dlrEntrCorpNm}</li>
                <li>종사원증번호: {dealerInfo.dlrEn}</li>
              </ul>
            </div>
          </div>
          {dealerInfo && dealerInfo.onSaleCarCnt !== null && (
            <ul>
              <li>
                판매중
                <span>{setComma(dealerInfo.onSaleCarCnt)} 대</span>
              </li>
              <li>
                판매완료
                <span>{setComma(dealerInfo.cmplSaleCarCnt)} 대</span>
              </li>
            </ul>
          )}

          <div className="map-sec">
            <table summary="판매자 기본정보에 대한 내용" className="table-tp1">
              <caption className="away">판매자 정보</caption>
              <colgroup>
                <col width="26.5%" />
                <col width="73.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>판매점</th>
                  <td>{dealerInfo.dlrEntrCorpNm}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  {/* <td>{dealerInfo.dlrStrAddr}</td> */}
                  <td>
                    <a href={`https://map.kakao.com/link/search/${dealerInfo.dlrStrAddr}`}>{dealerInfo.dlrStrAddr}</a>
                  </td>
                </tr>
                <tr>
                  <th>전화</th>
                  <td>{dealerInfo.dlrStrPn}</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>{dealerInfo.dlrStrFaxno}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>{dealerInfo.dlrStrSlHmCntn}</td>
                </tr>
              </tbody>
            </table>
            <div className="map-wrap">
              <KakaoMap id="map-buycar-mob" style={{ width: '100%', height: '150px', frameBorder: '0' }} mode="mobile" addr={dealerInfo.dlrStrAddr} />
            </div>
          </div>

          {!objIsEmpty(bannerInfo) && (
            <div className="goods-banner">
              <div className="img-wrap">
                <a href={bannerInfo?.mblLinkAddr} target={bannerInfo?.mblNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                  <img src={`${imgUrl}${bannerInfo?.mblFileUrl}`} alt={bannerInfo?.mblAlt} />
                </a>
              </div>
            </div>
          )}

          {!isEmpty(smartList) && (
            <div className="list-wrap">
              <h3 className="mt32 mb16">오토벨스마트 추천</h3>
              <ul className="goods-list list-type">
                {smartList.map((car, i) => {
                  if (i < 4) {
                    return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                  }
                })}
              </ul>
            </div>
          )}
          {equivalentList && !isEmpty(equivalentList) && (
            <div className="list-wrap">
              <h3 className="mt32 mb16">동급차량</h3>
              <ul className="goods-list list-type">
                {equivalentList.map((car, i) => {
                  if (i < 4) {
                    return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="content-wrap seller-wrap">
      <div className="seller-info-tp1">
        <div className="img-wrap">
          <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
            <a>
              <img src={`${imgUrl}${dealerInfo.dlrProfFileUrl}`} alt="판매자 이미지" />
            </a>
          </Link>
          <span onClick={onCounselPopUpOpen} />
        </div>
        <div className="tx-wrap">
          <ul>
            <li>
              판매자
              <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                <a>
                  <span>{dealerInfo.dlrNm}</span>
                </a>
              </Link>
              <em>({dealerInfo.dlrEntrCorpNm})</em>
            </li>
            <li>
              종사원증 번호
              <span>{dealerInfo.dlrEn}</span>
            </li>
            <li>
              연락처
              <span>{dealerInfo.omcTelNo ? telToStrFormat(dealerInfo.omcTelNo) : ''}</span>
            </li>
            <li>
              판매중
              <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                <span className="tx-blue60">{setComma(dealerInfo.onSaleCarCnt)} 대</span>
              </Link>
            </li>
            <li>
              판매완료
              <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=2`}>
                <span className="tx-blue60">{setComma(dealerInfo.cmplSaleCarCnt)} 대</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <KakaoMap id="map-buycar-pc" style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={dealerInfo.dlrStrAddr} />
      <table summary="판매자 기본정보에 대한 내용" className="table-tp3">
        <caption className="away">판매자 정보</caption>
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="10%" />
          <col width="40%" />
        </colgroup>
        <tbody>
          <tr>
            <th>판매점</th>
            <td>{dealerInfo.dlrEntrCorpNm}</td>
            <th>전화</th>
            <td>{dealerInfo.dlrStrPn}</td>
          </tr>
          <tr>
            <th rowSpan="2">영업시간</th>
            <td rowSpan="2" className="time">
              {dealerInfo.dlrStrSlHmCntn}
            </td>
            <th>팩스</th>
            <td>{dealerInfo.dlrStrFaxno}</td>
          </tr>
          <tr>
            <th>주소</th>
            {/* <td>{dealerInfo.dlrStrAddr}</td> */}
            <td>
              <a href={`https://map.kakao.com/link/search/${dealerInfo.dlrStrAddr}`}>{dealerInfo.dlrStrAddr}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

BuyCarDetailSellerTab.propTypes = {
  carInfo: PropTypes.object,
  dealerInfo: PropTypes.object,
  bannerInfo: PropTypes.object,
  equivalentList: PropTypes.array,
  isMobile: PropTypes.bool,
  smartList: PropTypes.array,
  onCounselPopUpOpen: PropTypes.func,
  onClickSeller: PropTypes.func
};
BuyCarDetailSellerTab.displayName = 'BuyCarDetailSellerTab';
export default BuyCarDetailSellerTab;
