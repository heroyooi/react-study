import React from 'react';
import PropTypes from 'prop-types';
import { getMinMaxValue, getNumberWithCommas, getNumberCutting, onDragRoundRect } from './priceCommon';

class PriceLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.state = {
      leftBaseOffset: 40,
      topBaseOffset: 30,
      bottomBaseOffset: 50
    };
  }

  componentDidMount() {
    this.ctx = this.chartRef.current.getContext('2d', { alpha: false });

    this.ctx.canvas.width = this.props.width;
    this.ctx.canvas.height = this.props.height;
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = this.props.data.backgroundColor;
    this.ctx.strokeStyle = this.props.data.backgroundColor;
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
    this.ctx.translate(this.props.data.lineTension, this.props.data.lineTension);

    const minMax = getMinMaxValue(this.props.data.values);
    const maxBaseValue = getNumberCutting(minMax.maxNum, 'C', 1000);
    const minBaseValue = getNumberCutting(minMax.minNum, 'F', 100) - 100;

    const horizontalLine = this.getHorizontalLine(minBaseValue, maxBaseValue);
    const verticalLine = this.getVerticalLine();
    const pixelToNumber = horizontalLine.lineHeight / this.props.data.yStep;

    this.onDragBorder();
    this.onDrawXLabels();

    this.onDrawRecommandFill(maxBaseValue, pixelToNumber);
    this.onDrawNotRecommandFill(maxBaseValue, pixelToNumber);
    this.onDrawHorizontalLine(horizontalLine.lines);
    this.onDrawVerticalLine(verticalLine.lines);
    this.onDrawRecommandText(maxBaseValue, pixelToNumber, horizontalLine.lines);

    this.onDrawLine(maxBaseValue, pixelToNumber);
    this.onDrawPoint(maxBaseValue, pixelToNumber, true);
  }

  getHorizontalLine(min, max) {
    const minMaxDiff = max - min;

    const lineCount = minMaxDiff / this.props.data.yStep;
    const lineHeight = (this.props.height - this.state.topBaseOffset - this.state.bottomBaseOffset) / lineCount;

    const lines = [];
    const horizontalineTick = this.props.data.yStep;

    let hly = this.props.height - this.state.bottomBaseOffset;

    for (let i = 0; i < lineCount; i++) {
      hly = hly - lineHeight;

      if (hly > 0) {
        lines.push({ y: hly, label: min + horizontalineTick * (i + 1) });
      }
    }

    return {
      lineCount,
      lineHeight,
      lines
    };
  }

  getVerticalLine() {
    const lines = [];

    this.props.data.values.forEach((value, index) => {
      lines.push({ x: this.state.leftBaseOffset + index * this.props.data.xStep });
    });

    return {
      y0: this.state.topBaseOffset,
      y1: this.props.height - this.state.bottomBaseOffset,
      lines
    };
  }

  onDrawPoint(max, pixelToNumber) {
    this.props.data.values.forEach((value, index) => {
      const y = this.getYOffset(max, value, pixelToNumber);
      const x = this.getXOffset(index);
      const width = 50;
      const height = 14;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.props.data.pointFillColor;
      this.ctx.lineWidth = this.props.data.pointLineWidth;
      this.ctx.strokeStyle = this.props.data.pointStrokeColor;
      this.ctx.arc(x, y, this.props.data.pointRedius, 0, (Math.PI / 180) * 360, true);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();

      let toolTipFillColor = this.props.data.valueToolTipFillColor;
      let tooltipStrokeColor = this.props.data.valueToolTipStrokeColor;
      const tooltipWidth = width;
      const tooltipHeight = height;
      if (index === 1) {
        toolTipFillColor = 'rgba(63, 100, 195, 1)';
        tooltipStrokeColor = 'rgba(63, 100, 195, 1)';
      } else if (index === 3) {
        toolTipFillColor = 'rgba(255, 48, 0, 1)';
        tooltipStrokeColor = 'rgba(255, 48, 0, 1)';
      }

      onDragRoundRect(this.ctx, x - width / 2, y - this.state.topBaseOffset - 2, tooltipWidth, tooltipHeight, 3, toolTipFillColor, tooltipStrokeColor);

      const trangleY = y - this.state.topBaseOffset + tooltipHeight;
      const trangleX = x - 2;
      this.ctx.beginPath();
      this.ctx.moveTo(trangleX, trangleY);
      this.ctx.lineTo(trangleX + 5, trangleY);
      this.ctx.lineTo(trangleX + (trangleX + 5 - trangleX) / 2, trangleY + 5);
      this.ctx.fillStyle = toolTipFillColor;
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.fillStyle = '#fff';
      this.ctx.font = this.props.data.font;
      this.ctx.fillText(getNumberWithCommas(value), x - width / 2 + 10, y - 20);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  onDrawLine(max, pixelToNumber) {
    const line = [];

    this.props.data.values.forEach((value, index) => {
      const y = this.getYOffset(max, value, pixelToNumber);
      const x = this.getXOffset(index);
      line.push({ x, y });
    });

    this.ctx.beginPath();
    this.ctx.lineCap = this.props.data.lineCap || 'butt';
    this.ctx.lineJoin = this.props.data.lineJoin || 'miter';

    line.forEach((item, index) => {
      if (index === 0) {
        this.ctx.moveTo(item.x, item.y);
      } else {
        this.ctx.lineTo(item.x, item.y);
      }
    });

    this.ctx.lineWidth = this.props.data.lineWidth;
    this.ctx.strokeStyle = this.props.data.lineBorderColor;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  onDrawRecommandFill(maxBaseValue, pixelToNumber) {
    const recommandFrom = this.props.data.values[0];
    const recommandTo = this.props.data.values[1];

    this.ctx.beginPath();
    this.ctx.lineCap = 'butt';
    this.ctx.lineJoin = 'miter';

    const x1 = {
      x: this.getXOffset(0),
      y: this.getYOffset(maxBaseValue, recommandFrom, pixelToNumber)
    };
    const x2 = {
      x: this.getXOffset(1),
      y: this.getYOffset(maxBaseValue, recommandTo, pixelToNumber)
    };

    this.ctx.moveTo(x1.x, x1.y);
    this.ctx.lineTo(x2.x, x2.y);
    this.ctx.lineTo(x2.x, this.props.height - this.state.bottomBaseOffset);
    this.ctx.lineTo(x1.x, this.props.height - this.state.bottomBaseOffset);
    this.ctx.lineTo(x1.x, x1.y);
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = this.props.data.recommandBackgroundColor;
    this.ctx.fillStyle = this.props.data.recommandBackgroundColor;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  onDrawRecommandText(maxBaseValue, pixelToNumber, lines) {
    const recommandFrom = this.props.data.values[0];
    const x1 = {
      x: this.getXOffset(0),
      y: this.getYOffset(maxBaseValue, recommandFrom, pixelToNumber)
    };

    let yCenter = (this.props.height - this.state.bottomBaseOffset) / 2 + x1.y;
    let yHeight = 0;

    for (let index = lines.length - 1; index >= 0; index--) {
      const element = lines[index];
      if (element.y > yCenter) {
        yCenter = element.y;
        yHeight = element.y - lines[index + 1].y;
        break;
      }
    }

    this.ctx.beginPath();
    this.ctx.font = this.props.data.font;
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('매각권장기간', x1.x + 5, yCenter - yHeight / 2 + 5);
    this.ctx.closePath();
  }

  onDrawNotRecommandFill(maxBaseValue, pixelToNumber) {
    const recommandFrom = this.props.data.values[2];
    const recommandTo = this.props.data.values[3];

    this.ctx.beginPath();
    this.ctx.lineCap = 'butt';
    this.ctx.lineJoin = 'miter';

    const x1 = {
      x: this.getXOffset(2),
      y: this.getYOffset(maxBaseValue, recommandFrom, pixelToNumber)
    };
    const x2 = {
      x: this.getXOffset(3),
      y: this.getYOffset(maxBaseValue, recommandTo, pixelToNumber)
    };

    this.ctx.moveTo(x1.x, x1.y);
    this.ctx.lineTo(x2.x, x2.y);
    this.ctx.lineTo(x2.x, this.props.height - this.state.bottomBaseOffset);
    this.ctx.lineTo(x1.x, this.props.height - this.state.bottomBaseOffset);
    this.ctx.lineTo(x1.x, x1.y);
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = this.props.data.notRecommandBackgroundColor;
    this.ctx.fillStyle = this.props.data.notRecommandBackgroundColor;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  getYOffset(max, value, pixelToNumber) {
    return (max - value) * pixelToNumber + this.state.topBaseOffset;
  }

  getXOffset(col) {
    return this.state.leftBaseOffset + col * this.props.data.xStep;
  }

  onDrawVerticalLine(lines) {
    const y0 = this.state.topBaseOffset - this.state.topBaseOffset / 2;
    const y1 = this.props.height - this.state.bottomBaseOffset;

    this.ctx.beginPath();
    lines.forEach((line, index) => {
      if (index > 0) {
        this.ctx.strokeStyle = this.props.data.verticalLineBorderColor;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(line.x, y0);
        this.ctx.lineTo(line.x, y1);
      }
    });
    this.ctx.closePath();
    this.ctx.stroke();
  }

  onDrawHorizontalLine(lines) {
    this.ctx.beginPath();
    this.ctx.font = this.props.data.font;
    this.ctx.fillStyle = this.props.data.horizontalLineFontColor;
    lines.forEach((line) => {
      this.ctx.strokeStyle = this.props.data.horizontalLineBorderColor;
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(this.state.leftBaseOffset, line.y);
      this.ctx.lineTo(this.props.width, line.y);

      if (this.props.data.showYLable === true) {
        this.ctx.fillText(line.label, 0, line.y + 4);
      }
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

  onDragBorder() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.props.data.borderColor;
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(this.state.leftBaseOffset, 0);
    this.ctx.lineTo(this.state.leftBaseOffset, this.props.height - this.state.bottomBaseOffset);
    this.ctx.lineTo(this.props.width, this.props.height - this.state.bottomBaseOffset);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  onDrawXLabels() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.props.data.verticalLineFontColor;
    this.ctx.strokeStyle = this.props.data.borderColor;
    this.ctx.lineWidth = 1;
    this.ctx.font = this.props.data.font;

    let xOffset = 0;
    this.props.data.labels.forEach((label, index) => {
      const margin = label.length * -5;
      this.ctx.moveTo(this.state.leftBaseOffset + xOffset, this.props.height - this.state.bottomBaseOffset);
      this.ctx.lineTo(this.state.leftBaseOffset + xOffset, this.props.height - this.state.bottomBaseOffset + 10);

      if (index === 0) {
        this.ctx.fillText(label, this.state.leftBaseOffset + margin, this.props.height - this.state.bottomBaseOffset + 25);
      } else {
        this.ctx.fillText(label, this.state.leftBaseOffset + xOffset + margin, this.props.height - this.state.bottomBaseOffset + 25);
      }

      xOffset += this.props.data.xStep;
    });

    this.ctx.stroke();
    this.ctx.closePath();
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

PriceLineChart.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

PriceLineChart.defaultProps = {
  height: 300,
  lineHeight: 30,
  width: 600
};

export default PriceLineChart;
