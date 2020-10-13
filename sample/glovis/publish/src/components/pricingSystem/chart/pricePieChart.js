import React from 'react';
import PropTypes from 'prop-types';
import { getAngle, getCoordinates, getNumberWithCommas, onDrawArrow, getPriceToAngle, getRedius } from './priceCommon';

class PricePieChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.recommandY = 10;
    this.logoRedius = 45;

    this.font = '맑은 고딕';
    this.state = {
      bottomBaseOffset: this.logoRedius + 10,
      leftBaseOffset: 60,
      rightBaseOffseet: 60,
      topBaseOffset: 0
    };
  }

  componentDidMount() {
    this.ctx = this.chartRef.current.getContext('2d', { alpha: false });

    this.ctx.canvas.width = this.props.width;
    this.ctx.canvas.height = this.props.height;
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = this.props.data.backgroundColor || '#ffffff';
    this.ctx.strokeStyle = this.props.data.backgroundColor;
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
    this.ctx.translate(this.props.data.lineTension, this.props.data.lineTension);

    const minPrice = this.getMinPrice();
    const degrees = 180 / (this.props.data.maxPrice - minPrice);
    const minAngle = getPriceToAngle(degrees, minPrice, this.props.data.marketMinPrice);
    const maxAngle = getPriceToAngle(degrees, minPrice, this.props.data.marketMaxPrice);
    const arrowAngle = getPriceToAngle(degrees, minPrice, this.props.data.price);

    const length = 20;
    const arrowHeight = 8;

    const x = this.props.width / 2;
    const y = this.props.height - this.state.bottomBaseOffset;
    const r = getRedius(this.props.width, this.state.leftBaseOffset, this.state.rightBaseOffseet) + this.recommandY;

    const r2 = getRedius(this.props.width, this.state.leftBaseOffset, this.state.rightBaseOffseet) + this.recommandY + 10;

    const angleAd = 3;

    const arrowOffset = getCoordinates(x, y, r2, arrowAngle + angleAd);
    const minArrowOffset = getCoordinates(x, y, r2, minAngle + angleAd);
    const maxArrowOffset = getCoordinates(x, y, r2, maxAngle + angleAd);

    this.onDrawBackgroundArc();
    this.onDrawRecommandArc(minAngle, maxAngle);

    const gr = this.ctx.createLinearGradient(30, 0, 4, 0);
    gr.addColorStop(0, 'rgba(254,179,147,1)');
    gr.addColorStop(1, 'rgba(255,95,24,1)');

    const gr2 = this.ctx.createLinearGradient(30, 0, 4, 0);
    gr2.addColorStop(0, 'rgba(255,216,116,1)');
    gr2.addColorStop(1, 'rgba(255,186,6,1)');

    onDrawArrow(this.ctx, arrowOffset.x, arrowOffset.y, length, 8, arrowHeight, 15, gr, arrowAngle + 180);
    onDrawArrow(this.ctx, minArrowOffset.x, minArrowOffset.y, length, 8, arrowHeight, 15, gr2, minAngle + 180);
    onDrawArrow(this.ctx, maxArrowOffset.x, maxArrowOffset.y, length, 8, arrowHeight, 15, gr2, maxAngle + 180);

    this.onDrawLogo();

    this.onFillRecommandText(x, y, r, degrees);
    this.onFillPriceText(x, y, r, arrowAngle, minAngle, maxAngle);
  }

  onFillRecommandText(x, y, redius, degrees) {
    const avgPrice = this.props.data.marketMinPrice + (this.props.data.marketMaxPrice - this.props.data.marketMinPrice) / 2;
    const angle = getPriceToAngle(degrees, this.getMinPrice(), avgPrice);
    const min = getCoordinates(x, y, redius, angle);

    this.ctx.beginPath();
    this.ctx.font = '12px 맑은 고딕';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('적정시세범위', min.x - 33, y - this.logoRedius - 30);
    this.ctx.closePath();
  }

  onFillPriceText(x, y, redius, myAnge, minAngle, maxAngle) {
    const my = getCoordinates(x, y, redius, myAnge);
    const min = getCoordinates(x, y, redius, minAngle);
    const max = getCoordinates(x, y, redius, maxAngle);

    this.ctx.font = '300 12px 맑은 고딕';
    this.ctx.fillStyle = 'rgba(62, 99, 195, 1)';
    this.ctx.fillText('최저적정시세', min.x - 80, min.y - 22);
    this.ctx.fillText(getNumberWithCommas(this.props.data.marketMinPrice), min.x - 30, min.y - 10);

    this.ctx.fillText('최고적정시세', max.x, max.y - 22);
    this.ctx.fillText(getNumberWithCommas(this.props.data.marketMaxPrice), max.x, max.y - 10);

    this.ctx.font = '500 14px 맑은 고딕';
    this.ctx.fillText('현재내차시세', my.x - 40, my.y - 30);

    this.ctx.font = '800 20px 맑은 고딕';
    this.ctx.fillText(getNumberWithCommas(this.props.data.price), my.x - 20, my.y - 13);
  }

  getMinPrice() {
    let price = this.props.data.minPrice;

    if (this.props.data.marketMinPrice < this.props.data.minPrice) {
      price = this.props.data.marketMinPrice - 100;
    }

    return price < 0 ? 0 : price;
  }

  onDrawLogo() {
    const x = this.props.width / 2;
    const y = this.props.height - this.state.bottomBaseOffset;
    const imgClo = new Image();

    imgClo.addEventListener('load', (e) => {
      this.ctx.drawImage(imgClo, x - 50, y - 50, 100, 100);
      console.log(e);
    });
    imgClo.src = '/images/contents/pricingChart/chart-auto.png';

    // const r = this.logoRedius;
    // const angle = getAngle(0, 360);
    // const gr = this.ctx.createLinearGradient(50, 0, 350, 0);
    // gr.addColorStop(0, 'gray');
    // gr.addColorStop(0.5, 'white');
    // gr.addColorStop(1, 'gray');

    // this.ctx.beginPath();
    // this.ctx.strokeStyle = 'rgba(82, 105, 255, 0.8)';
    // this.ctx.fillStyle = gr;
    // this.ctx.lineWidth = 3;
    // this.ctx.arc(x, y, r, angle.sAngle, angle.eAngel, false);
    // this.ctx.closePath();
    // this.ctx.fill();
    // this.ctx.stroke();

    // this.ctx.beginPath();
    // this.ctx.font = '80px French Script MT';
    // this.ctx.fillStyle = this.props.data.pieBackgroundColor || 'rgba(82, 105, 255, 1)';
    // this.ctx.fillText('A', x - r / 2, y + 25);
    // this.ctx.closePath();
  }

  onDrawRecommandArc(min, max) {
    const x = this.props.width / 2;
    const y = this.props.height - this.state.bottomBaseOffset;
    const r = getRedius(this.props.width, this.state.leftBaseOffset, this.state.rightBaseOffseet) + this.recommandY;
    const angle = getAngle(min, max);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.props.data.pieRecommandBackgroundColor || 'rgba(82, 105, 255, 0.8)';
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, r, angle.sAngle, angle.eAngel, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  onDrawBackgroundArc() {
    const x = this.props.width / 2;
    const y = this.props.height - this.state.bottomBaseOffset;
    const r = getRedius(this.props.width, this.state.leftBaseOffset, this.state.rightBaseOffseet);
    const angle = getAngle(0, 180);

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.props.data.pieBorderColor || 'rgba(179, 180, 181, 1)';
    this.ctx.fillStyle = this.props.data.pieBackgroundColor || 'rgba(222, 224, 228, 1)';

    this.ctx.arc(x, y, r, angle.sAngle, angle.eAngel, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(x - r, y);
    this.ctx.lineTo(x + r, y);
    this.ctx.lineWidth = 0.5;
    this.ctx.closePath();
    this.ctx.strokeStyle = this.props.data.pieBorderColor || 'rgba(179, 180, 181, 1)';
    this.ctx.stroke();
  }

  render() {
    return (
      <div id="pricing-chart-forecast" style={{ padding: '3px', backgroundColor: '#fff' }}>
        <div id="chart-wrapper">
          <canvas id="chart" ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

PricePieChart.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

PricePieChart.defaultProps = {
  height: 300,
  lineHeight: 30,
  width: 600
};

export default PricePieChart;
