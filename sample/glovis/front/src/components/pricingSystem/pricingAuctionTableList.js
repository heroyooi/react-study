import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '@src/utils/CommonUtil';

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
    const _string = (str || '').split('<br />');
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

    const data = this.props.dataContext;
    if (this.props.isMobile) {
      return (
        <table summary="낙찰정보에 대한 내용" className="table-tp1">
          <caption className="away">낙찰정보 상세입니다.</caption>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <tbody>
            <tr>
              <th>경매일</th>
              <td>{data.succymd}</td>
            </tr>
            <tr>
              <th>거점</th>
              <td>{data.auctroomnm}</td>
            </tr>
            <tr>
              <th>연식</th>
              <td>{data.year}</td>
            </tr>
            <tr>
              <th>최초등록일</th>
              <td>{data.carregiymd}</td>
            </tr>
            <tr>
              <th>연료</th>
              <td>{data.fuelnm}</td>
            </tr>
            <tr>
              <th>미션</th>
              <td>{data.missnm}</td>
            </tr>
            <tr>
              <th>주행거리</th>
              <td>{data.travdist}km</td>
            </tr>
            <tr>
              <th>옵션</th>
              <td>{data.caropnm}</td>
            </tr>
            <tr>
              <th>색상</th>
              <td>{data.coloetcnm}</td>
            </tr>
            <tr>
              <th>배기량</th>
              <td>{data.exha}cc</td>
            </tr>
            <tr>
              <th>용도</th>
              <td>{data.useusenm}</td>
            </tr>
            <tr>
              <th>평가</th>
              <td className="tx-blue80 tx-b">{data.evalpoint}</td>
            </tr>
            <tr>
              <th>신차가격</th>
              <td className="tx-blue80 tx-b">{numberFormat(data.newcarpric)}원</td>
            </tr>
            <tr>
              <th>낙찰가</th>
              <td className="tx-blue80 tx-b">{data.succpric}원</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return (
      <>
        <tr>
          <td rowSpan="2">{data.auctroomnm}</td>
          <td rowSpan="2">{data.succymd}</td>
          <td rowSpan="2">{data.carnm}</td>
          <td>{data.year}</td>
          <td>{data.fuelnm}</td>
          <td>{data.travdist}km</td>
          <td>{data.coloetcnm}</td>
          <td>{data.exha}cc</td>
          <td>{data.useusenm}</td>
          <td rowSpan="2">{numberFormat(data.newcarpric)}</td>
          <td className="name">
            <a onClick={this.onClick}>{data.evalpoint}</a>
          </td>
        </tr>
        <tr>
          <td>{data.carregiymd}</td>
          <td>{data.missnm}</td>
          <td colSpan="4">{data.caropnm}</td>
          <td>{data.succpric}원</td>
        </tr>
      </>
    );
  }
}

PricingAuctionTableList.propTypes = {
  dataContext: PropTypes.object,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func
};

PricingAuctionTableList.defaultProps = {
  isMobile: false
};

export default PricingAuctionTableList;
