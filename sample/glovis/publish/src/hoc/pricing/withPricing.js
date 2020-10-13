import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import {
  getPricingCarInfo,
  getAuctionDetailInfo,
  getPricingMarketPrice,
  getPricingTicketInfo,
  getPricingViewableCount,
  getPricingCarBidList,
  getSearchCarDefaultOptions,
  setPricingCarInfo,
  setPricingCarInfoClear,
  setPricingCarInfoName
} from '@src/actions/pricing/pricingSystemActions';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { isPricingTicket, getPageName } from '@src/components/pricingSystem/pricingUtil';

const withPricing = (WrappedComponent) => {
  const withPricingWrappedComponent = class extends React.PureComponent {
    displayName = 'withPricing';
    constructor(props) {
      super(props);

      this.onGetPricing = this.onHandleGetPricing.bind(this);
      this.onSearchCarNo = this.onHandleSearchCarNo.bind(this);
      this.onSearchCarCond = this.onHandleSearchCarCond.bind(this);
      this.onSearchCarTabChanged = this.onHandleSearchCarTabChanged.bind(this);
      this.onUpdateCarInfo = this.onHandleUpdateCarInfo.bind(this);
      this.onUpdateSearchMode = this.onHandleUpdateSearchMode.bind(this);
      this.pageName = getPageName(this.props.router.pathname);
      this.state = {
        isMode: 'CarCondition',
        searchMode: false,
        withoutGrade: false
      };
    }

    componentDidMount() {
      console.log('withPricing', this.props.router.pathname);
      this.props.onGetSearchCarDefaultOptions();
      if (this.pageName === 'pricingSystem') {
        this.props.onGetPricingViewableCount(this.props.userInfo.userId);
        this.props.onGetPricingTicketInfo(this.props.userInfo.userId);
      }
    }

    onHandleGetPricing(e, deps) {
      if (e) {
        e.preventDefault();
      }

      const viewableCnt = this.pageName === 'pricingHyundai' ? -1 : this.props.viewableCnt;
      const hasPricingTicket = this.pageName === 'pricingHyundai' ? false : isPricingTicket(this.props.pricingTicketInfo);

      if (this.pageName !== 'pricingHyundai' && this.isPricingTicketValidation() === false) {
        return;
      }

      let selectedOptions = [];
      let carInfo = null;
      if (deps) {
        if (deps.carOptions) {
          selectedOptions = deps.carOptions.map((i) => {
            return i.mappingName;
          });
        }
        this.props.onSetPricingCarInfo(deps);
        carInfo = deps;
      } else {
        if (this.props.pricingCarInfo.carOptions) {
          selectedOptions = this.props.pricingCarInfo.carOptions
            .filter((x) => x.yn === 'Y')
            .map((i) => {
              return i.mappingName;
            });
        }
        carInfo = this.props.pricingCarInfo;
      }

      this.props.onGetPricingMarketPrice(carInfo, selectedOptions, viewableCnt, hasPricingTicket);

      if (this.pageName === 'pricingSystem') {
        this.props.onGetPricingCarBidList(carInfo);
      }
    }

    onHandleSearchCarCond(e, deps) {
      e.preventDefault();

      if (this.props.hasMobile === true) {
        Router.push('/marketprice/marketSearch');
        return;
      }
      this.setState({ isMode: 'CarCondition', withoutGrade: false });
      this.onHandleGetPricing(e, deps);
    }

    onHandleSearchCarNo(e, deps) {
      e.preventDefault();
      const crNo = deps ? deps.crNo || '' : '';
      if (objIsEmpty(crNo)) {
        // eslint-disable-next-line no-alert
        alert('차량 번호가 비어 있습니다.');
        return;
      }

      if (this.props.hasMobile === true) {
        Router.push('/marketprice/marketView');
      }

      this.setState({ isMode: 'CarNumber', withoutGrade: true });

      this.props.onGetPricingCarInfo(crNo, deps);
    }

    onHandleUpdateCarInfo(e, carinfo) {
      this.props.onSetPricingCarInfo(carinfo);
    }

    onHandleUpdateSearchMode() {
      this.setState({ searchMode: !this.state.searchMode });
    }

    onHandleSearchCarTabChanged(e, deps) {
      this.setState({ isMode: deps.tabName });
      this.props.onSetPricingCarInfoClear();
    }

    isPricingTicketValidation() {
      const hasPricingTicket = isPricingTicket(this.props.pricingTicketInfo);
      if (this.props.viewableCnt === 0 && !hasPricingTicket) {
        // eslint-disable-next-line no-alert
        alert('조회가능 횟수를 초과 했습니다.');
        return false;
      }

      return true;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isMode={this.state.isMode}
          withoutGrade={this.state.withoutGrade}
          searchMode={this.state.searchMode}
          onGetPricing={this.onGetPricing}
          onSearchCarNo={this.onSearchCarNo}
          onSearchCarCond={this.onSearchCarCond}
          onTabChanged={this.onSearchCarTabChanged}
          onUpdateCarInfo={this.onUpdateCarInfo}
          onUpdateSearchMode={this.onUpdateSearchMode}
        />
      );
    }
  };

  const mapStateToProps = (state) => {
    return {
      auctionDetailInfo: state.pricing.auctionInfo,
      bidList: state.pricing.bidList,
      hasMobile: state.common.hasMobile,
      hasPricing: state.pricing.hasPricing,
      userInfo: state.login.userInfo,
      marketPrice: state.pricing.marketPrice,
      viewableCnt: state.pricing.viewableCnt,
      pricingTicketInfo: state.pricing.prcingTicketInfo,
      pricingCarInfo: state.pricing.pricingCarInfo
    };
  };

  const mapDispatchProps = (dispatch) => {
    return {
      onGetAuctionDetailInfo: (carCond, cancelToken = null) => {
        dispatch(getAuctionDetailInfo(carCond, cancelToken));
      },
      onGetPricingCarInfo: (carNo, second, cancelToken = null) => {
        dispatch(getPricingCarInfo(carNo, second, cancelToken));
      },
      onGetPricingCarBidList: (carInfo, cancelToken = null) => {
        dispatch(getPricingCarBidList(carInfo, cancelToken));
      },
      onGetPricingMarketPrice: (carInfo, carOptions, viewableCnt, hasPricingTicket, cancelToken = null) => {
        dispatch(getPricingMarketPrice(carInfo, carOptions, viewableCnt, hasPricingTicket, cancelToken));
      },
      onGetPricingTicketInfo: (userId) => {
        dispatch(getPricingTicketInfo(userId));
      },
      onGetPricingViewableCount: (userId) => {
        dispatch(getPricingViewableCount(userId));
      },
      onGetSearchCarDefaultOptions: () => {
        dispatch(getSearchCarDefaultOptions);
      },
      onSetPricingCarInfo: (carinfo) => {
        dispatch(setPricingCarInfo(carinfo));
      },
      onSetPricingCarInfoClear: () => {
        dispatch(setPricingCarInfoClear());
      },
      onSetPricingCarInfoName: (crNm) => {
        dispatch(setPricingCarInfoName(crNm));
      }
    };
  };

  withPricingWrappedComponent.propTypes = {
    auctionDetailInfo: PropTypes.object,
    bidList: PropTypes.array,
    hasMobile: PropTypes.bool,
    hasPricing: PropTypes.bool,
    marketPrice: PropTypes.object,
    pricingTicketInfo: PropTypes.object,
    pricingCarInfo: PropTypes.object,
    router: PropTypes.object,
    userInfo: PropTypes.object,
    viewableCnt: PropTypes.number,
    onGetAuctionDetailInfo: PropTypes.func,
    onGetPricingCarInfo: PropTypes.func,
    onGetPricingCarBidList: PropTypes.func,
    onGetPricingMarketPrice: PropTypes.func,
    onGetPricingTicketInfo: PropTypes.func,
    onGetPricingViewableCount: PropTypes.func,
    onGetSearchCarDefaultOptions: PropTypes.func,
    onSetPricingCarInfo: PropTypes.func,
    onSetPricingCarInfoClear: PropTypes.func,
    onSetPricingCarInfoName: PropTypes.func
  };

  return withRouter(connect(mapStateToProps, mapDispatchProps)(withPricingWrappedComponent));
};

export default withPricing;
