import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { numberFormat, objIsEmpty } from '@src/utils/CommonUtil';
import FilterRange from '@lib/share/items/FilterRange';
import PriceLineChart from './priceLineChart';
class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.lineChartRef = React.createRef();
    this.state = {
      windowWidth: null
    };
  }

  componentDidMount() {
    if (this.lineChartRef && this.lineChartRef.current) {
      const rect = this.lineChartRef.current.getBoundingClientRect();
      if (rect && rect.width) {
        setTimeout(() => {
          this.setState({ windowWidth: rect.width || 325 });
        }, 1);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.marketPrice, this.props.marketPrice) || nextState.windowWidth !== this.state.windowWidth) {
      return true;
    }

    return false;
  }

  render() {
    if (objIsEmpty(this.props.marketPrice)) {
      return null;
    }

    const monthlyChart = {
      labels: ['현재', '3개월', '6개월', '9개월', '12개월'],
      lineTension: 0.1,
      lineWidth: 5,
      lineBorderColor: 'rgba(62, 99, 195, 1)',
      backgroundColor: '#ffffff',
      borderColor: 'rgba(113,113,113,1)',
      recommandBackgroundColor: 'rgba(121, 147, 213, 1)',
      notRecommandBackgroundColor: 'rgba(255, 110, 76, 1)',
      horizontalLineFontColor: 'red',
      horizontalLineBorderColor: '#d9dada',
      verticalLineFontColor: 'rgba(113,113,113,1)',
      verticalLineBorderColor: '#d9dada',
      pointFillColor: '#fff',
      pointStrokeColor: 'rgba(60,97,194,1)',
      pointRedius: 8,
      pointLineWidth: 5,
      values: this.props.marketPrice.monthlyPrice,
      valueToolTipFillColor: 'rgba(113,113,113,1)',
      valueToolTipStrokeColor: 'rgba(113,113,113,1)',
      font: 'normal 14px 맑은고딕, Malgun Gothic, dotum, gulim, sans-seri',
      labelFontColor: 'rgba(113,113,113,1)',
      yStep: 150,
      xStep: this.props.hasMobile === true ? 63 : 85,
      showYLable: false
    };

    return (
      <ul className={this.props.containerClassName}>
        <li>
          {this.props.hasMobile === true ? null : (
            <span className="tit" style={{ textAlign: 'center' }}>
              현재 차량시세
            </span>
          )}

          {this.props.hasPricingSystem === false ? (
            <span className="con" style={{ height: this.props.height }} ref={this.lineChartRef}>
              <div className="market-graph-box" style={{ width: this.props.width, marginTop: '20px' }}>
                <div className="market-graph-view">
                  <img className="graph-bg" src="/images/contents/market-price-range.png" alt="" style={{ width: '94%', marginLeft: '3%' }} />
                  <p className="price-tit">적정시세범위</p>
                  <dl className="price-box price-current">
                    <dt>현재내차시세</dt>
                    <dd>{numberFormat(this.props.marketPrice.currentPrice.price)}</dd>
                  </dl>
                  <dl className="price-box price-min">
                    <dt>최저적정시세</dt>
                    <dd>{numberFormat(this.props.marketPrice.currentPrice.marketMinPrice)}</dd>
                  </dl>
                  <dl className="price-box price-max">
                    <dt>최고적정시세</dt>
                    <dd>{numberFormat(this.props.marketPrice.currentPrice.marketMaxPrice)}</dd>
                  </dl>
                </div>
              </div>
            </span>
          ) : (
            <span className="con search-pricing tit-none">
              <div>
                <p className="tit">도매 시세</p>
                <div className="price-grade-tp1">
                  <div className="cur-price">
                    <div className="proper-price">
                      <FilterRange
                        displayTitle={false}
                        rangeUnit="현재시세"
                        initMin={this.props.marketPrice.currentPrice.marketMinPrice === 0 ? 0 : this.props.marketPrice.currentPrice.marketMinPrice}
                        initMax={this.props.marketPrice.currentPrice.marketMaxPrice === 0 ? 1 : this.props.marketPrice.currentPrice.marketMaxPrice}
                        rangeMin={this.props.marketPrice.currentPrice.marketMinPrice === 0 ? 0 : this.props.marketPrice.currentPrice.marketMinPrice}
                        rangeMax={this.props.marketPrice.currentPrice.marketMaxPrice === 0 ? 1 : this.props.marketPrice.currentPrice.marketMaxPrice}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <p className="price">
                  {numberFormat(this.props.marketPrice.currentPrice.price)}
                  <span className="won">만원</span>
                </p>
              </div>

              <div>
                <p className="tit">소매 시세</p>
                <div className="price-grade-tp1">
                  <div className="cur-price">
                    <div className="proper-price">
                      <FilterRange
                        displayTitle={false}
                        rangeUnit="현재시세"
                        initMin={this.props.marketPrice.retailPrice.marketMinPrice === 0 ? 0 : this.props.marketPrice.retailPrice.marketMinPrice}
                        initMax={this.props.marketPrice.retailPrice.marketMaxPrice === 0 ? 1 : this.props.marketPrice.retailPrice.marketMaxPrice}
                        rangeMin={this.props.marketPrice.retailPrice.marketMinPrice === 0 ? 0 : this.props.marketPrice.retailPrice.marketMinPrice}
                        rangeMax={this.props.marketPrice.retailPrice.marketMaxPrice === 0 ? 1 : this.props.marketPrice.retailPrice.marketMaxPrice}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <p className="price">
                  {numberFormat(this.props.marketPrice.retailPrice.price)}
                  <span className="won">만원</span>
                </p>
              </div>
            </span>
          )}
        </li>
        <li className="forecast">
          <span className="tit" style={{ textAlign: 'center' }}>
            미래시세
            {this.props.isPrintReport === true ? null : (
              <>
                <span>가격단위: 만원</span>
              </>
            )}
          </span>
          <span className="con" style={{ height: this.props.height, padding: '25px' }}>
            {objIsEmpty(this.props.marketPrice.monthlyPrice) ? null : (
              <PriceLineChart hasMobile={this.props.hasMobile} width={this.props.hasMobile === true ? this.state.windowWidth || 325 : 408} height={293} lineHeight={40} data={monthlyChart} />
            )}
          </span>
        </li>
      </ul>
    );
  }
}

PriceChart.propTypes = {
  containerClassName: PropTypes.string,
  hasMobile: PropTypes.bool,
  hasPricingSystem: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPrintReport: PropTypes.bool,
  marketPrice: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

PriceChart.defaultProps = {
  containerClassName: 'market-price-graph',
  hasDynamicChart: false,
  hasPricingSystem: false,
  hasMobile: false,
  isPrintReport: false,
  height: '299px',
  width: null
};

export default PriceChart;
