import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSearchCarColors,
  getSearchCarDefaultOptions,
  getSearchCarDisplacement,
  getSearchCarFuels,
  getSearchCarNumberOfYears,
  getSearchCarTranmission,
  setToggleCarSelectionPopUp
} from '@src/actions/pricing/pricingSystemActions';

const withSearchCar = (WrappedComponent) => {
  const withSearchCarWrappedComponent = class extends React.PureComponent {
    displayName = 'withSearchCar';
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.onGetSearchCarColors();
      this.props.onGetSearchCarDefaultOptions();
      this.props.onGetSearchCarDisplacement();
      this.props.onGetSearchCarFuels();
      this.props.onGetSearchCarNumberOfYears();
      this.props.onGetSearchCarTranmission();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapStateToProps = (state) => {
    return {
      hasMobile: state.common.hasMobile,
      clrOptions: state.pricing.searchCarColors,
      carCondOptions: state.pricing.searchCarDefaultOptions,
      dsplOptions: state.pricing.searchCarDsplOptions,
      fuelOptions: state.pricing.searchCarFuelOptions,
      mssOptions: state.pricing.searchCarMssOptions,
      noyOptions: state.pricing.searchCarNoyOptions,
      isCarSelectionPopUp: state.pricing.isCarSelectionPopUp
    };
  };

  const mapDispatchProps = (dispatch) => {
    return {
      onGetSearchCarColors: () => {
        dispatch(getSearchCarColors());
      },
      onGetSearchCarDefaultOptions: () => {
        dispatch(getSearchCarDefaultOptions());
      },
      onGetSearchCarDisplacement: () => {
        dispatch(getSearchCarDisplacement());
      },
      onGetSearchCarFuels: () => {
        dispatch(getSearchCarFuels());
      },
      onGetSearchCarNumberOfYears: () => {
        dispatch(getSearchCarNumberOfYears());
      },
      onGetSearchCarTranmission: () => {
        dispatch(getSearchCarTranmission());
      },
      onSetToggleCarSelectionPopUp: () => {
        dispatch(setToggleCarSelectionPopUp());
      }
    };
  };

  withSearchCarWrappedComponent.propTypes = {
    clrOptions: PropTypes.array,
    carCondOptions: PropTypes.array,
    dsplOptions: PropTypes.array,
    hasPricing: PropTypes.array,
    fuelOptions: PropTypes.array,
    mssOptions: PropTypes.array,
    noyOptions: PropTypes.array,
    isCarSelectionPopUp: PropTypes.bool,
    onGetSearchCarColors: PropTypes.func,
    onGetSearchCarDefaultOptions: PropTypes.func,
    onGetSearchCarDisplacement: PropTypes.func,
    onGetSearchCarFuels: PropTypes.func,
    onGetSearchCarNumberOfYears: PropTypes.func,
    onGetSearchCarTranmission: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchProps)(withSearchCarWrappedComponent);
};

export default withSearchCar;
