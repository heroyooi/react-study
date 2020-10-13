import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { isEmpty, orderBy } from 'lodash';
import Button from '@lib/share/items/Button';
import MenuCont from '@lib/share/menu/MenuCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectList from '@lib/share/items/MobSelectList';
import PricingAuctionTableList from './pricingAuctionTableList';

class PricingBidSucessList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMoreClick = this.onHandleMoreClick.bind(this);
    this.onSortChange = this.onHandleSortChange.bind(this);
    this.onDetailView = this.onHandleDetailView.bind(this);

    this.sortOption = [
      { id: 'sort-carnm', value: 'carnm', orders: 'asc', label: '모델명 순' },
      { id: 'sort-date', value: 'succymd', orders: 'desc', label: '최근 경매일순' },
      { id: 'sort-price', value: 'succpricNum', orders: 'desc', label: '높은 낙찰가순' },
      { id: 'sort-eval', value: 'evalpointNum', orders: 'desc', label: '높은 평가순' }
    ];
    this.state = {
      currentPage: 1,
      pageLimit: 10,
      sortKey: 'carnm',
      sortOrder: 'asc',
      selectItem: { ...this.sortOption[0] }
    };
  }

  componentDidMount() {
    this.props.router.prefetch('/pricingSystem/pricingauction');
  }

  onHandleMoreClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  onHandleDetailView(e, deps) {
    e.preventDefault();
    e.stopPropagation();
    Router.push({ pathname: '/pricingSystem/pricingauction', query: { auctionInfo: JSON.stringify(deps) } }, '/pricingSystem/pricingauction');
  }

  onHandleSortChange(e, deps) {
    if (this.props.isMobile) {
      this.setState({ sortKey: deps.value, sortOrder: deps.orders, selectItem: { ...deps } });
    } else {
      this.setState({ sortKey: e.value, sortOrder: e.orders });
    }
  }

  render() {
    const tableClass = isEmpty(this.props.bidList) ? 'table-tp1 input th-c td-c isLoading bid-list' : 'table-tp1 input th-c td-c bid-list';
    const floatWrapClass = this.props.isMode === null ? 'float-wrap bn' : 'float-wrap';

    let bindList = [];
    if (this.props.isMobile === false && isEmpty(this.props.bidList)) {
      for (let i = 0; i < 4; i++) {
        bindList.push({});
      }
    } else {
      bindList = orderBy(this.props.bidList, [this.state.sortKey], [this.state.sortOrder]).slice(0, this.state.currentPage * this.state.pageLimit);
    }

    if (this.props.isMobile) {
      return (
        <div className="content-wrap pricing-view-sec">
          <ul className="tit-wrap mt20">
            <h4 className="fl">차량 기본 정보</h4>
            <div className="fr">
              <MobSelectList
                displayMemberPath={'label'}
                selectedValuePath={'value'}
                selectedItem={this.state.selectItem}
                onClick={this.onSortChange}
                width={152}
                zid={101}
                itemsSource={this.sortOption}
              />
            </div>
          </ul>
          <ul className="m-toggle-list up-blue table">
            {bindList &&
              bindList.map((v, i) => {
                return (
                  <MenuItem key={i}>
                    <MenuTitle tagName={'em'}>
                      <div className="float-wrap">
                        <h4>{v.carnm}</h4>
                        <Button className="fl" size="sml" line="gray" radius={true} title="상세보기" dataContext={v} width={58} height={24} fontSize={10} marginLeft={5} onClick={this.onDetailView} />
                      </div>
                      <div className="summary">
                        <div className="info">
                          <span>{v.year}</span>
                          <span>{v.travdist}km</span>
                        </div>
                        <ul className="float-wrap">
                          <li>
                            평가 : <span className="tx-blue80">{v.evalpoint}</span>
                          </li>
                          <li>
                            <p className="price-tp4">
                              {v.succpric}
                              <span className="won">만원</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </MenuTitle>
                    <MenuCont>
                      <PricingAuctionTableList dataContext={v} isMobile={this.props.isMobile} />
                    </MenuCont>
                  </MenuItem>
                );
              })}
          </ul>
          {!isEmpty(this.props.bidList) && this.props.bidList.length > bindList.length && (
            <Button size="full" line="gray" radius={true} title="더보기" height={38} fontSize={12} marginTop={8} iconType="arrow-bottom-gray" onClick={this.onMoreClick} />
          )}
        </div>
      );
    }

    return (
      <React.Fragment>
        <ul className={floatWrapClass}>
          <li>
            <h4>동급 차량 실제 낙찰 정보입니다.</h4>
            <p className="mt8 tx-gray">평가점을 클릭하여 상세 경매정보를 확인하세요</p>
          </li>
          <li>
            <SelectBox id="select1" className="items-sbox" isValue={0} width={148} height={36} onChange={this.onSortChange} options={this.sortOption} />
          </li>
        </ul>
        <table summary="동급 차량 실제 낙찰 정보에 대한 내용" className={tableClass}>
          <caption className="away">동급 차량 실제 낙찰 정보입니다.</caption>
          <colgroup>
            <col width="6%" />
            <col width="9%" />
            <col width="13%" />
            <col width="9%" />
            <col width="7%" />
            <col width="9%" />
            <col width="9%" />
            <col width="8%" />
            <col width="7%" />
            <col width="*" />
            <col width="12%" />
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
              <th>용도</th>
              <th rowSpan="2">신차가격</th>
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
  isMobile: PropTypes.bool,
  router: PropTypes.object,
  onAuctionClick: PropTypes.func
};

PricingBidSucessList.defaultProps = {
  bidList: [],
  isMobile: false
};

export default withRouter(PricingBidSucessList);
