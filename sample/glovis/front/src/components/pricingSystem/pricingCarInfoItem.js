import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Input from '@lib/share/items/Input';
import DatePicker from '@src/components/common/calendar/DatePicker';
import InputNumber from '@lib/share/items/InputNumber';
import { numberWithCommas } from './pricingUtil';

class PricingCarInfoItem extends React.Component {
  constructor(props) {
    super(props);

    this.onisInEditModeToggle = this.onHandleIsInEditModeToggle.bind(this);
    this.onOpenPopUp = this.onHandleOpenPopUp.bind(this);
    this.onInputChange = this.onHandleInputChange.bind(this);
    this.onDateChange = this.onHandleDateChange.bind(this);
    this.state = {
      isInEditMode: true,
      value: this.props.value,
      now: moment()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isEditingState !== nextProps.isEditingState || this.props.value !== nextProps.value || this.state.value !== nextState.value || this.state.isInEditMode !== nextState.isInEditMode) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    this.setState({ value: this.props.value });
  }

  onHandleDateChange(e) {
    this.props.onValueChange(e, {
      name: this.props.name,
      value: e.toDate()
    });
  }

  onHandleInputChange(e) {
    this.props.onValueChange(e, {
      name: this.props.name,
      value: e.target.value
    });
  }

  onHandleOpenPopUp(e) {
    this.props.onOpenPopUp(e, this.props.value);
  }

  onHandleIsInEditModeToggle() {
    this.setState({ isInEditMode: !this.state.isInEditMode });
  }

  parseObjectToText(obj){
    return Object.keys(obj).reduce((str, key) => {
      if(!/Code/.test(key)){
        str += `${obj[key]} `
      }
      return str
    }, '')
  }

  render() {
    if (this.state.value === null || this.state.value === undefined) {
      return null;
    }

    if (this.props.isEdit === false) {
      const { value } = this.state

      return (
        <>
          <span>{
            this.props.hasNumberWithComma === true ?
                numberWithCommas(value)
              :
                typeof value === 'object' ? this.parseObjectToText(value): value
          }</span>
          {this.props.onOpenPopUp && <i className="ico-pencil" onClick={this.onOpenPopUp} />}
        </>
      );
    }

    if (this.state.isInEditMode === true) {
      if (this.props.type === 'date') {
        return (
          <>
            <DatePicker defaultValue={this.state.value || this.state.now} inputWidth={160} inputHeight={40} onChange={this.onDateChange} />
            {this.props.unit ? <em>{this.props.unit}</em> : null}
          </>
        );
      }

      if (this.props.type === 'number') {
        return (
          <>
            <InputNumber value={this.state.value} width={162} height={38} maxLength={this.props.maxLength || 9} onChange={this.onInputChange} textAlign={'left'} />
            {this.props.unit ? <em>{this.props.unit}</em> : null}
          </>
        );
      }
      return (
        <>
          <Input type="text" value={this.state.value} width={162} height={38} maxLength={this.props.maxLength || 100} onChange={this.onInputChange} />
          {this.props.unit ? <em>{this.props.unit}</em> : null}
        </>
      );
    }

    return (
      <span>
        {this.props.value instanceof Date ? moment(this.props.value).format('YYYY.MM.DD') : this.props.hasNumberWithComma === true ? numberWithCommas(this.props.value) : this.props.value}
        <i className="ico-pencil" onClick={this.onisInEditModeToggle} />
      </span>
    );
  }
}

PricingCarInfoItem.propTypes = {
  hasNumberWithComma: PropTypes.bool,
  isEditingState: PropTypes.bool,
  isEdit: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.instanceOf(Date)]),
  onOpenPopUp: PropTypes.func,
  onValueChange: PropTypes.func
};

PricingCarInfoItem.defaultProps = {
  hasNumberWithComma: false,
  isEdit: false
};

export default PricingCarInfoItem;
