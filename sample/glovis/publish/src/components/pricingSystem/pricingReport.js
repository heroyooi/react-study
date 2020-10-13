import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import MarketPriceGraph from '@src/components/common/MarketPriceGraph';
import { toDay } from '@src/utils/DateUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { dateToString, numberWithCommas } from './pricingUtil';
import PricingToPrintButton from './pricingToPrintButton';

class PricingReport extends React.PureComponent {
  constructor(props) {
    super(props);

    this.today = toDay();
  }

  render() {
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
                    <i className="ico-sharing" onClick={this.props.handleOpenShare} />
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
          {this.props.hasHyundai && (
            <MobBottomArea isFix={true} isSimple={true}>
              <Button size="full" background="blue80" title="내 차 팔기 접수하기" height={56} href="/sell/visitApplyHyundai" nextLink={true} />
            </MobBottomArea>
          )}
        </>
      );
    }
    const carInfo = this.props.dataContext;
    if (objIsEmpty(carInfo)) {
      return null;
    }

    return (
      <div className="popup-report" ref={(el) => (this.componentRef = el)}>
        <div className="report-wrap">
          <div className="report-tit">
            <div className="img-wrap">
              <img src="/images/common/ico-certification.svg" alt="오토벨 인증마크" />
            </div>
            <div className="tit-wrap">
              <span className="num">NO.1029-018279</span>
              <span className="date">발급일 {toDay()}</span>
              <h5 className="tit">
                AUTOBELL PRICING REPORT<em>오토벨에서 제공하는 내차판매 시, 시세정보입니다.</em>
              </h5>
              <div className="qr-wrap">
                <span>QR코드인증</span>
                <div className="img-wrap">
                  <img src="/images/dummy/qr-code.png" alt="qr코드" />
                </div>
              </div>
            </div>
          </div>

          <div className="report-info">
            <div className="img-wrap">
              <img src={carInfo.defaultImg || '/images/dummy/market-car-img.png'} alt="내 차량 이미지" />
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
                    <th>차량번호</th>
                    <td>{carInfo.carNo}</td>
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
                    <td>{numberWithCommas(carInfo.dspl, ' cc')}</td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>{dateToString(carInfo.frstRegDt)}</td>
                    <th>신차출고가</th>
                    <td>{numberWithCommas(carInfo.rlsPrc, ' 만원')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="car-option">
              {carInfo && carInfo.carOptions
                ? carInfo.carOptions
                    .filter((x) => x.isDiaplay === true && x.yn === 'Y')
                    .map((v, i) => (
                      <li className={'on'} key={i}>
                        <i className={v.icon} />
                        <span>{v.name}</span>
                      </li>
                    ))
                : null}
            </ul>
          </div>

          <PriceChart containerClassName={'report-price'} marketPrice={this.props.marketPrice} />

          <div className="report-msg">
            <p>“본 Report견적은 무사고 기준이며, 1주일간 유효합니다.”</p>
          </div>
        </div>
        <Buttons align="center" className="w-line">
          <span className="btn-base bg-blue80 mid" style={{ marginTop: '35px', width: '170px' }}>
            <PricingToPrintButton trigger={() => <a>시세리포트 출력하기</a>} content={() => this.componentRef} pageStyle="" />
          </span>
          {this.props.isSellReceipt === true && <Button size="mid" background="blue80" title="내 차 팔기 접수하기" width={170} marginTop={35} href="/sell/visitApplyHyundai" nextLink={true} />}
        </Buttons>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  hasMobile: state.common.hasMobile,
  hasHyundai: state.common.hasHyundai
});

PricingReport.getInitialProps = ({ reduxStore }) => {
  const state = reduxStore.getState();
  console.log(state);
  return {};
};

PricingReport.propTypes = {
  hasMobile: PropTypes.bool,
  hasHyundai: PropTypes.bool,
  dataContext: PropTypes.object,
  marketPrice: PropTypes.object,
  isSellReceipt: PropTypes.bool,
  handleOpenShare: PropTypes.func
};

export default connect(mapStateToProps)(PricingReport);
