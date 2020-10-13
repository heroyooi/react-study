import React from 'react';
import PropTypes from 'prop-types';

class PricingAuctionTableList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onHandleClick.bind(this);
  }

  onHandleClick(e) {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(e, this.props.dataContext);
    }
  }

  transformDesc = (str) => {
    const stringArr = [];
    const _string = str.split('<br />');
    if (_string.length > 1) {
      _string.map((v, i) => {
        if (i < _string.length - 1) {
          stringArr.push(
            <span key={i}>
              {v}
              <br />
            </span>
          );
        } else {
          stringArr.push(<span key={i}>{v}</span>);
        }
      });
      return stringArr;
    }
    return str;
  };

  render() {
    if (!this.props.dataContext) {
      return null;
    }

    const { location, date, name, year, fuel, km, color, exhaust, purpose, carNumber, grade, initialRegist, mission, options, price } = this.props.dataContext;

    return (
      <>
        <tr>
          <td rowSpan="2">{location}</td>
          <td rowSpan="2">{date}</td>
          <td rowSpan="2" className="name">
            <a href="#" onClick={this.onClick}>
              {this.transformDesc(name)}
            </a>
          </td>
          <td>{year}</td>
          <td>{fuel}</td>
          <td>{km}</td>
          <td>{this.transformDesc(color)}</td>
          <td>{exhaust}</td>
          <td>{this.transformDesc(purpose)}</td>
          <td rowSpan="2">{this.transformDesc(carNumber)}</td>
          <td>{grade}</td>
        </tr>
        <tr>
          <td>{initialRegist}</td>
          <td>{mission}</td>
          <td colSpan="4">{options}</td>
          <td>{price}</td>
        </tr>
      </>
    );
  }
}

PricingAuctionTableList.propTypes = {
  dataContext: PropTypes.object,
  onClick: PropTypes.func
};

export default PricingAuctionTableList;
