import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import {
  getPricingCarInfo,
  getPricingMarketPrice,
  getPricingMarketPriceRest,
  getPricingTicketInfo,
  getPricingViewableCount,
  getPricingCarBidList,
  getSearchCarDefaultOptions,
  setPricingCarInfo,
  setPricingCarInfoClear,
  setPricingCarInfoName,
  setPricingCarInfoPrice,
  setPricingReset
} from '@src/actions/pricing/pricingSystemActions';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getPageName } from '@src/components/pricingSystem/pricingUtil';
import { gInfoLive, getMemberPhoto } from '@src/utils/LoginUtils';

const withPricing = (WrappedComponent) => {
  const withPricingWrappedComponent = class extends React.PureComponent {
    displayName = 'withPricing';
    constructor(props) {
      super(props);

      this.cancel = null;
      this.onGetPricing = this.onHandleGetPricing.bind(this);
      this.onSearchResult = this.onHandleSearchResult.bind(this);
      this.onSearchCarNo = this.onHandleSearchCarNo.bind(this);
      this.onSearchCarCond = this.onHandleSearchCarCond.bind(this);
      this.onSearchCarTabChanged = this.onHandleSearchCarTabChanged.bind(this);
      this.onUpdateCarInfo = this.onHandleUpdateCarInfo.bind(this);
      this.onUpdateSearchMode = this.onHandleUpdateSearchMode.bind(this);
      this.onToggleMobileCarNoInput = this.onHandleToggleMobileCarNoInput.bind(this);
      this.onToggleCarNamePopUp = this.onHandleToggleCarNamePopUp.bind(this);
      this.onToggleReportPopUp = this.onHandleTogleReportPopUp.bind(this);
      this.onTsCancel = this.onHandleTsCancel.bind(this);
      this.onSellCar = this.onHandleSellCar.bind(this);
      this.onLoadingToggle = this.onHandleLoadingToggle.bind(this);
      this.pageName = getPageName(this.props.router.pathname);
      this.state = {
        calH: 408,
        isCarNamePopUp: false,
        isMobileCarNumInput: false,
        isReportPopUp: false,
        isMode: 'CarCondition',
        searchMode: false,
        withoutGrade: false,
        isLoading: false,
        userInfo: null
      };
      this.targetEl = React.createRef();
    }

    componentDidMount() {
      this.props.onGetSearchCarDefaultOptions();

      const gInfo = gInfoLive();

      if (this.pageName === 'pricingSystem' && !objIsEmpty(gInfo.id)) {
        this.props.onGetPricingViewableCount(gInfo.id || '');
        this.props.onGetPricingTicketInfo(gInfo.id || '');
      }

      if (this.targetEl && this.targetEl.current) {
        setTimeout(() => {
          this.setState({ calH: this.targetEl.current.clientHeight });
        });
      }

      getMemberPhoto(gInfo.id).then((url) => {
        this.setState({ userInfo: Object.assign({ ...gInfo }, { photoUrl: url || '' }) });
      });
    }

    componentDidUpdate(prevProps) {
      if (this.state.isLoading === true && prevProps.hasPricing === false && this.props.hasPricing === true) {
        this.props.onGetPricingTicketInfo(gInfoLive().id || '');
        this.setState({ isLoading: false });
      } else if (this.state.isLoading === true && prevProps.hasCarInfo === false && this.props.hasCarInfo === true) {
        this.setState({ isLoading: false });
      }

      if (!objIsEmpty(prevProps.pricingCarInfo) && !objIsEmpty(this.props.pricingCarInfo)) {
        if (prevProps.pricingCarInfo.crNo !== this.props.pricingCarInfo.crNo) {
          this.props.onSetPricingCarInfoClear();
        }
      }
    }

    componentWillUnmount() {
      if (this.cancel) {
        this.cancel();
      }
    }

    onHandleLoadingToggle() {
      this.setState({ isLoading: !this.state.isLoading });
    }

    onHandleGetPricing(e, deps) {
      if (e) {
        e.preventDefault();
      }
      this.setState({ isLoading: true });
      if (this.cancel) {
        this.cancel();
      }

      const cancelToken = new axios.CancelToken((c) => {
        this.cancel = c;
      });

      let selectedOptions = [];
      let carInfo = null;
      if (deps) {
        if (deps.carOptions) {
          selectedOptions = deps.carOptions
            .filter((x) => x.yn === 'Y')
            .map((i) => {
              return i.value;
            });
        }
        this.props.onSetPricingCarInfo(deps);
        carInfo = deps;
      } else {
        if (this.props.pricingCarInfo.carOptions) {
          selectedOptions = this.props.pricingCarInfo.carOptions
            .filter((x) => x.yn === 'Y')
            .map((i) => {
              return i.value;
            });
        }
        carInfo = this.props.pricingCarInfo;
      }

      this.props.onGetPricingMarketPriceRest();
      this.props.onGetPricingMarketPrice(carInfo, selectedOptions, null, this.pageName, this.props.pricingTicketInfo?.odrNum || null, this.props.pricingTicketInfo?.odrDtlSeq || null);

      if (this.pageName === 'pricingSystem') {
        this.props.onGetPricingCarBidList(carInfo?.modelInfo?.crClsCd || '', carInfo?.modelInfo?.crDtlClsCd, cancelToken);
      }
    }

    onHandleSearchCarCond(e, deps) {
      e.preventDefault();

      if (this.cancel) {
        this.cancel();
      }

      if (this.props.hasMobile === true) {
        if (this.pageName === 'pricingSystem') {
          Router.push({ pathname: '/pricingSystem/pricingsearch' });
        } else {
          Router.push({ pathname: '/marketPrice/marketsearch', query: { hyundai: this.pageName === 'pricingHyundai' ? 'Y' : 'N' } });
        }
        return false;
      }
      this.setState({ isMode: 'CarCondition', withoutGrade: false, isLoading: true });
      this.onHandleGetPricing(e, deps);
      return true;
    }

    onHandleSearchCarNo(e, deps) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.cancel) {
        this.cancel();
      }

      const crNo = deps ? deps.crNo || '' : '';
      if (objIsEmpty(crNo)) {
        // eslint-disable-next-line no-alert
        alert('차량 번호가 비어 있습니다.');
        return;
      }

      this.setState({ isMode: 'CarNumber', withoutGrade: true });
      this.props.onGetPricingCarInfo(crNo, deps);

      if (this.props.hasMobile === true) {
        if (this.pageName === 'pricingSystem') {
          Router.push({ pathname: '/pricingSystem/pricingview', query: { search: 'number', crNo: crNo, carInfo: JSON.stringify(deps) } }, '/pricingSystem/pricingview');
        } else {
          Router.push({ pathname: '/marketPrice/marketview', query: { search: 'number', crNo: crNo, hyundai: this.pageName === 'pricingHyundai' ? 'Y' : 'N' } });
        }
      }
    }

    onHandleSearchResult(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      if (this.cancel) {
        this.cancel();
      }

      const carInfo = this.props.pricingCarInfo;
      if ((carInfo && objIsEmpty(carInfo.drvDist)) || isNaN(carInfo.drvDist) || parseInt(carInfo.drvDist) < 1) {
        alert('주행거리를 입력해주세요.');
        return;
      } else if (parseInt(carInfo.drvDist) > 400000) {
        alert('주행거리는 최대거리는 400,000 Km 입니다.');
        return;
      } else if (carInfo && objIsEmpty(carInfo.clr)) {
        alert('색상을 선택해주세요.');
        return;
      } else if (objIsEmpty(carInfo.rlsPrc) || isNaN(carInfo.rlsPrc) || parseInt(carInfo.rlsPrc) < 1) {
        alert('신차가격을 입력해주세요.');
        return;
      } else if (carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2') {
        if (objIsEmpty(carInfo.seriesNo)) {
          alert('차량 등급을 선택하여 주시기 바랍니다.');
          return;
        }
        this.onSearchCarNo(e, carInfo);
      } else if (carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '1') {
        this.onGetPricing(e);
      }

      this.setState({ isLoading: true });

      if (this.pageName === 'pricingHyundai') {
        setTimeout(() => {
          this.onToggleReportPopUp();
        }, 10);
      }
    }

    onHandleSellCar(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      if (this.props.pricingCarInfo.crNo) {
        Router.push(
          { pathname: '/sellcar/sellCar', query: { crNo: this.props.pricingCarInfo.crNo, carInfo: JSON.stringify(this.props.pricingCarInfo) } },
          `/sellcar/sellCar?crNo=${this.props.pricingCarInfo.crNo}`
        );
      } else {
        Router.push({ pathname: '/sellcar/sellCar' });
      }
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

    onHandleToggleMobileCarNoInput(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.props.hasMobile === true) {
        this.setState({ isMobileCarNumInput: !this.state.isMobileCarNumInput });
      }
    }

    onHandleToggleCarNamePopUp(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      this.setState({ isCarNamePopUp: !this.state.isCarNamePopUp });
    }

    onHandleTogleReportPopUp(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      this.setState({ isReportPopUp: !this.state.isReportPopUp });
    }

    onHandleTsCancel() {
      this.setState({ isMobileCarNumInput: !this.state.isMobileCarNumInput });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          calH={this.state.calH}
          isMobileCarNumInput={this.state.isMobileCarNumInput}
          isCarNamePopUp={this.state.isCarNamePopUp}
          isCertPopUp={this.state.isCertPopUp}
          isLoading={this.state.isLoading}
          isMode={this.state.isMode}
          isReportPopUp={this.state.isReportPopUp}
          withoutGrade={this.state.withoutGrade}
          searchMode={this.state.searchMode}
          targetEl={this.targetEl}
          userInfo={this.state.userInfo}
          onGetPricing={this.onGetPricing}
          onLoadingToggle={this.onLoadingToggle}
          onSearchCarNo={this.onSearchCarNo}
          onSearchCarCond={this.onSearchCarCond}
          onSearchResult={this.onSearchResult}
          onSellCar={this.onSellCar}
          onTabChanged={this.onSearchCarTabChanged}
          onTsCancel={this.onTsCancel}
          onToggleCarNamePopUp={this.onToggleCarNamePopUp}
          onToggleMobileCarNoInput={this.onToggleMobileCarNoInput}
          onToggleReportPopUp={this.onToggleReportPopUp}
          onUpdateCarInfo={this.onUpdateCarInfo}
          onUpdateSearchMode={this.onUpdateSearchMode}
        />
      );
    }
  };

  const mapStateToProps = (state) => {
    return {
      bidList: state.pricing.bidList,
      hasCarInfo: state.pricing.hasCarInfo,
      hasMobile: state.common.hasMobile,
      hasPricing: state.pricing.hasPricing,
      marketPrice: state.pricing.marketPrice,
      viewableCnt: state.pricing.viewableCnt,
      pricingTicketInfo: state.pricing.prcingTicketInfo,
      pricingCarInfo: state.pricing.pricingCarInfo,
      searchCarColors: state.pricing.searchCarColors,
      searchCarDefaultOptions: state.pricing.searchCarDefaultOptions
    };
  };

  const mapDispatchProps = (dispatch) => {
    return {
      onGetPricingCarInfo: (carNo, second, cancelToken = null) => {
        dispatch(getPricingCarInfo(carNo, second, cancelToken));
      },
      onGetPricingCarBidList: (carInfo, cancelToken = null) => {
        dispatch(getPricingCarBidList(carInfo, cancelToken));
      },
      onGetPricingMarketPrice: (carInfo, carOptions, cancelToken = null, reqType = '', odrNum = 0, odrDtlSeq = 0) => {
        dispatch(getPricingMarketPrice(carInfo, carOptions, cancelToken, reqType, odrNum, odrDtlSeq));
      },
      onGetPricingMarketPriceRest: () => {
        dispatch(getPricingMarketPriceRest());
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
      onSetPricingCarInfoName: (crNm, carInfo) => {
        dispatch(setPricingCarInfoName(crNm, carInfo));
      },
      onSetPricingCarInfoPrice: (carInfo, marketPrice) => {
        dispatch(setPricingCarInfoPrice(carInfo, marketPrice));
      },
      onSetPricingReset: () => {
        dispatch(setPricingReset());
      }
    };
  };

  withPricingWrappedComponent.propTypes = {
    bidList: PropTypes.array,
    hasMobile: PropTypes.bool,
    hasCarInfo: PropTypes.bool,
    hasPricing: PropTypes.bool,
    marketPrice: PropTypes.object,
    pricingTicketInfo: PropTypes.object,
    pricingCarInfo: PropTypes.object,
    router: PropTypes.object,
    searchCarColors: PropTypes.array,
    searchCarDefaultOptions: PropTypes.array,
    viewableCnt: PropTypes.number,
    onGetPricingCarInfo: PropTypes.func,
    onGetPricingCarBidList: PropTypes.func,
    onGetPricingMarketPrice: PropTypes.func,
    onGetPricingMarketPriceRest: PropTypes.func,
    onGetPricingTicketInfo: PropTypes.func,
    onGetPricingViewableCount: PropTypes.func,
    onGetSearchCarDefaultOptions: PropTypes.func,
    onSetPricingCarInfo: PropTypes.func,
    onSetPricingCarInfoClear: PropTypes.func,
    onSetPricingCarInfoName: PropTypes.func,
    onSetPricingCarInfoPrice: PropTypes.func,
    onSetPricingReset: PropTypes.func
  };

  return withRouter(connect(mapStateToProps, mapDispatchProps)(withPricingWrappedComponent));
};

export default withPricing;
