import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, orderBy } from 'lodash';
import SelectBox from '@lib/share/items/SelectBox';
import PricingAuctionTableList from './pricingAuctionTableList';

class PricingBidSucessList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMoreClick = this.onHandleMoreClick.bind(this);
    this.onSortChange = this.onHandleSortChange.bind(this);
    this.state = {
      currentPage: 1,
      pageLimit: 10,
      sortKey: 'date',
      sortOrder: 'desc'
    };
  }

  onHandleMoreClick() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  onHandleSortChange(e) {
    this.setState({ sortKey: e.value, sortOrder: e.orders });
  }

  render() {
    const tableClass = isEmpty(this.props.bidList) ? 'table-tp1 input th-c td-c isLoading' : 'table-tp1 input th-c td-c';
    const floatWrapClass = this.props.isMode === null ? 'float-wrap bn' : 'float-wrap';

    let bindList = [];
    if (isEmpty(this.props.bidList)) {
      for (let i = 0; i < 4; i++) {
        bindList.push({
          location: '',
          date: '',
          name: '',
          year: null,
          fuel: '',
          km: '',
          color: '',
          exhaust: '',
          purpose: '',
          carNumber: '',
          grade: '',
          initialRegist: '',
          mission: '',
          options: '',
          price: ''
        });
      }
    } else {
      bindList = orderBy(this.props.bidList, [this.state.sortKey], [this.state.sortOrder]).slice(0, this.state.currentPage * this.state.pageLimit);
    }

    return (
      <React.Fragment>
        <ul className={floatWrapClass}>
          <li>
            <h4>동급 차량 실제 낙찰 정보입니다.</h4>
          </li>
          <li>
            <SelectBox
              id="select1"
              className="items-sbox"
              isValue={0}
              width={148}
              height={36}
              onChange={this.onSortChange}
              options={[
                { value: 'date', label: '최근 경매일순', orders: 'desc' },
                { value: 'price', label: '높은 낙찰가순', orders: 'desc' },
                { value: 'price', label: '높은 평가순', orders: 'desc' }
              ]}
            />
          </li>
        </ul>
        <table summary="동급 차량 실제 낙찰 정보에 대한 내용" className={tableClass}>
          <caption className="away">동급 차량 실제 낙찰 정보입니다.</caption>
          <colgroup>
            <col width="8%" />
            <col width="8%" />
            <col width="14%" />
            <col width="10%" />
            <col width="7%" />
            <col width="9%" />
            <col width="9%" />
            <col width="9%" />
            <col width="9%" />
            <col width="10%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan="2">거점</th>
              <th rowSpan="2">경매일</th>
              <th rowSpan="2">모델명</th>
              <th>년식</th>
              <th>연료</th>
              <th>주행거리</th>
              <th>색상</th>
              <th>배기량</th>
              <th>용도/소유</th>
              <th rowSpan="2">차대번호</th>
              <th>평가</th>
            </tr>
            <tr>
              <th>최초등록</th>
              <th>미션</th>
              <th colSpan="4">옵션</th>
              <th>낙찰가</th>
            </tr>
          </thead>
          <tbody>{bindList && bindList.map((v, i) => <PricingAuctionTableList key={i} dataContext={v} onClick={this.props.onAuctionClick} />)}</tbody>
        </table>
        {!isEmpty(this.props.bidList) && this.props.bidList.length > bindList.length && (
          <div className="cate-list-btn2">
            <button onClick={this.onMoreClick}>더보기</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

PricingBidSucessList.propTypes = {
  bidList: PropTypes.array,
  isMode: PropTypes.string,
  onAuctionClick: PropTypes.func
};

PricingBidSucessList.defaultProps = {
  bidList: []
};

export default PricingBidSucessList;
