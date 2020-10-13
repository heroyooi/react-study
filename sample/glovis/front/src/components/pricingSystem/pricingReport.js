import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { isEqual } from 'lodash';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import QRCode from '@src/components/common/QrCode';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import { toDay } from '@src/utils/DateUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { dateFormat, numberWithCommas, getSharedUrl } from './pricingUtil';
import PricingToPrintButton from './pricingToPrintButton';

class PricingReport extends React.Component {
  constructor(props) {
    super(props);

    this.OnOpenShare = this.onHandleOpenShare.bind(this);
    this.onSellClick = this.onHandleSellClick.bind(this);
    this.today = toDay();
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.dataContext, this.props.dataContext) || !isEqual(nextProps.marketPrice, this.props.marketPrice)) {
      return true;
    }

    return false;
  }

  onHandleOpenShare(e) {
    if (this.props.onOpenShare) {
      this.props.onOpenShare(e);
    }
  }

  onHandleSellClick(e) {
    if (this.props.onSellClick) {
      this.props.onSellClick(e);
    }
  }

  render() {
    const carInfo = this.props.dataContext;
    if (objIsEmpty(carInfo)) {
      return null;
    }
    if (this.props.hasMobile) {
      return (
        <>
          <div className="inner">
            <div className="report-wrap">
              <div className="report-tit">
                <div className="img-wrap">
                  <img src="/images/mobile/common/ico-certification.svg" alt="오토벨 인증마크" />
                </div>
                <div className="tit-wrap">
                  <span className="num">NO.{this.props.marketPrice ? this.props.marketPrice.reportId : ''}</span>
                  <span className="date">발급일 {toDay()}</span>
                  <h5 className="tit">
                    AUTOBELL PRICING REPORT<em>오토벨에서 제공하는 내차판매 시, 시세정보입니다.</em>
                  </h5>
                </div>
              </div>
              
              <div className="report-info">
                <div className="img-wrap">{carInfo.defaultImg ? <img src={carInfo.defaultImg} alt="내 차량 이미지" /> : <img src={'/images/dummy/market-car-no-img.jpg'} alt="내 차량 이미지" />}</div>
                <div className="car-info">
                  <div className="clear">
                    <p className="car-name" style={{ paddingRight: '5px' }}>
                      {carInfo.crNm}
                    </p>
                    {this.props.hasShare === false && (
                      <div className="sharing-wrap" style={{ width: '10%' }}>
                        <i className="ico-sharing" onClick={this.OnOpenShare} />
                      </div>
                    )}
                  </div>
                  <table summary="차량 정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      {carInfo && carInfo.crNo ? (
                        <tr>
                          <th>차량번호</th>
                          <td>{carInfo.crNo}</td>
                        </tr>
                      ) : null}
                      {carInfo && !objIsEmpty(carInfo.drvDist) && !isNaN(carInfo.drvDist) && parseInt(carInfo.drvDist) > 0 ? (
                        <tr>
                          <th>주행거리</th>
                          <td>{numberWithCommas(carInfo.drvDist, ' km')}</td>
                        </tr>
                      ) : null}
                      <tr>
                        <th>차량연식</th>
                        <td>{carInfo.noy}년</td>
                      </tr>
                      {carInfo && !objIsEmpty(carInfo.clr) ? (
                        <tr>
                          <th>색상</th>
                          <td>{carInfo.clr}</td>
                        </tr>
                      ) : null}
                      <tr>
                        <th>연료</th>
                        <td>{carInfo.fuel}</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>
                          {numberWithCommas(
                            (carInfo.dspl || '')
                              .toString()
                              .toLowerCase()
                              .replace(/cc/g, '')
                              .replace(/,/g, ''),
                            ' cc'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td>{dateFormat(carInfo.frstRegDt)}</td>
                      </tr>
                      {carInfo && carInfo.rlsPrc ? (
                        <tr>
                          <th>신차출고가</th>
                          <td>{numberWithCommas(carInfo.rlsPrc / 10000, ' 만원')}</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
                <ul className="car-option">
                  {carInfo && carInfo.carOptions
                    ? carInfo.carOptions
                        .filter((x) => x.displayYn === 'Y' && x.yn === 'Y')
                        .map((v, i) => (
                          <li className={'on'} key={i}>
                            <i className={v.icon} />
                            <span dangerouslySetInnerHTML={{ __html: v.displayName || v.label }} />
                          </li>
                        ))
                    : null}
                </ul>
              </div>
              <PriceChart marketPrice={this.props.marketPrice} hasMobile={true} />
              {(objIsEmpty(this.props.marketPrice) || objIsEmpty(this.props.marketPrice.reportId)) && (
                <div className="page-loading">
                  <span className="dim" />
                  <ClipLoader size={40} color={'#fff'} loading={true} />
                </div>
              )}
              <br />
              <br />
            </div>
          </div>
          {this.props.hasShare === false && (
            <MobBottomArea isFix={true} isSimple={true}>
              <Button size="full" background="blue80" title={this.props.hasHyundai ? '확인' : '내 차 팔기 접수하기'} height={56} onClick={this.onSellClick} />
            </MobBottomArea>
          )}
        </>
      );
    }

    return (
      <div className="popup-report" style={{ minHeight: '778px' }} ref={(el) => (this.componentRef = el)}>
        <div className="report-wrap">
          <div className="report-tit">
            <div className="img-wrap">
              <img src="/images/common/ico-certification.svg" alt="오토벨 인증마크" />
            </div>
            <div className="tit-wrap">
              <span className="num">NO.{this.props.marketPrice ? this.props.marketPrice.reportId : ''}</span>
              <span className="date">발급일 {toDay()}</span>
              <h5 className="tit">
                AUTOBELL PRICING REPORT<em>오토벨에서 제공하는 내차판매 시, 시세정보입니다.</em>
                <span className="btn-base line-darkgray sml">
                  <PricingToPrintButton
                    trigger={() => <a className="hyundai-pricing-print-button">출력하기</a>}
                    content={() => this.componentRef}
                    pageStyle="@page { size: landscape;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
                  />
                </span>
                {this.props.marketPrice?.reportId && carInfo.resStatus.uid ? (
                  <span style={{ float: 'right' }}>
                    <div
                      className="qr-wrap hyundai-pricing-print-show"
                      style={{ left: '0px', pointerEvents: 'none' }}
                      data-url={getSharedUrl(this.props.marketPrice?.reportId, carInfo?.resStatus?.uid)}
                    >
                      <QRCode url={getSharedUrl(this.props.marketPrice?.reportId, carInfo?.resStatus?.uid)} size={80} />
                    </div>
                  </span>
                ) : null}
              </h5>
            </div>
          </div>

          <div className="report-info">
            <div className="img-wrap">
              <img src={carInfo.defaultImg || '/images/dummy/market-car-no-img.jpg'} alt="내 차량 이미지" />
            </div>
            <div className="car-info">
              <p className="car-name">{carInfo.crNm}</p>
              <table summary="차량 정보에 대한 내용" className="table-report">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="20%" />
                  <col width="40%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>{carInfo.crNo ? '차량번호' : ''}</th>
                    <td>{carInfo.crNo}</td>
                    <th>주행거리</th>
                    <td>{numberWithCommas(carInfo.drvDist, ' km')}</td>
                  </tr>
                  <tr>
                    <th>차량연식</th>
                    <td>{carInfo.noy}년</td>
                    <th>색상</th>
                    <td>{carInfo.clr}</td>
                  </tr>
                  <tr>
                    <th>연료</th>
                    <td>{carInfo.fuel}</td>
                    <th>배기량</th>
                    <td>
                      {numberWithCommas(
                        (carInfo.dspl || '')
                          .toString()
                          .toLowerCase()
                          .replace(/cc/g, '')
                          .replace(/,/g, ''),
                        ' cc'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>{dateFormat(carInfo.frstRegDt)}</td>
                    <th>신차출고가</th>
                    <td>{numberWithCommas(carInfo.rlsPrc / 10000, ' 만원')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="car-option">
              {carInfo && carInfo.carOptions
                ? carInfo.carOptions
                    .filter((x) => x.displayYn === 'Y' && x.yn === 'Y')
                    .map((v, i) => (
                      <li className={'on'} key={i}>
                        <i className={v.icon}>
                          <img src={v.imgUrl} />
                        </i>
                        <span dangerouslySetInnerHTML={{ __html: v.displayName || v.label }} />
                      </li>
                    ))
                : null}
            </ul>
          </div>
          <p className="report-txt">가격단위: 만원</p>
          <PriceChart containerClassName={'report-price'} marketPrice={this.props.marketPrice} isPrintReport={true} />
          {objIsEmpty(this.props.marketPrice) || objIsEmpty(this.props.marketPrice.reportId) ? (
            <div className="page-loading">
              <span className="dim" />
              <ClipLoader size={40} color={'#fff'} loading={true} />
            </div>
          ) : (
            <div className="report-msg">
              <p>“본 Report견적은 무사고 기준이며, 1주일간 유효합니다.”</p>
            </div>
          )}
        </div>
        {this.props.isSellReceipt === true && (
          <Buttons align="center" className="w-line">
            <Button size="mid" background="blue80" title="내 차 팔기 접수하기" width={170} marginTop={35} onClick={this.onSellClick} nextLink={true} />
          </Buttons>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  hasMobile: state.common.hasMobile
});

PricingReport.getInitialProps = ({ reduxStore }) => {
  const state = reduxStore.getState();
  console.log(state);
  return {};
};

PricingReport.propTypes = {
  hasMobile: PropTypes.bool,
  hasShare: PropTypes.bool,
  hasHyundai: PropTypes.bool,
  dataContext: PropTypes.object,
  marketPrice: PropTypes.object,
  isSellReceipt: PropTypes.bool,
  onOpenShare: PropTypes.func,
  onSellClick: PropTypes.func
};

PricingReport.defaultProps = {
  hasNoEdit: false
};

export default connect(mapStateToProps)(PricingReport);
