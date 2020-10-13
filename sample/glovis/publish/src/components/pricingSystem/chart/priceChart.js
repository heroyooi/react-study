import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { objIsEmpty } from '@src/utils/CommonUtil';
import PricePieChart from './pricePieChart';
import PriceLineChart from './priceLineChart';

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.marketPrice, this.props.marketPrice)) {
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
      font: '12px magenta',
      labelFontColor: 'rgba(113,113,113,1)',
      yStep: 100,
      xStep: 80,
      showYLable: false
    };

    return (
      <ul className={this.props.containerClassName}>
        <li>
          <span className="tit">
            현재시세<span>가격단위: 만원</span>
          </span>
          <span className="con">
            <PricePieChart width={406} height={294} lineHeight={40} data={this.props.marketPrice.currentPrice} />
          </span>
        </li>
        <li>
          <span className="tit">
            미래시세<span>가격단위: 만원</span>
          </span>
          <span className="con">
            <PriceLineChart width={405} height={293} lineHeight={40} data={monthlyChart} />
          </span>
        </li>
      </ul>
    );
  }
}

PriceChart.propTypes = {
  marketPrice: PropTypes.object,
  containerClassName: PropTypes.string
};

PriceChart.defaultProps = {
  containerClassName: 'market-price-graph'
};

export default PriceChart;
