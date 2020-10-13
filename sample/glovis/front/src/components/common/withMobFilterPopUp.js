import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

const withMobFilterPopUp = (WrappedComponent) => {
  const MobFilterPopUpWrappedComponent = class extends React.PureComponent {
    displayName = 'MobFilterPopUp';
    constructor(props) {
      super(props);

      this.handleChange = this.onHandleChange.bind(this);
      this.handleClick = this.onHandleClick.bind(this);
      this.handleClose = this.onHandleClose.bind(this);

      this.state = {
        internalSelectedItems: this.props.selectedItems || []
      };
    }

    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.selectedItems, this.props.selectedItems)) {
        this.setState({ internalSelectedItems: this.props.selectedItems });
      }
    }
    onHandleChange(e, deps) {
      let tmp = [...this.state.internalSelectedItems];

      if (this.props.isMultiSelect === true) {
        if (tmp.includes(deps[this.props.selectedValuePath])) {
          tmp.splice(tmp.indexOf(deps[this.props.selectedValuePath]), 1);
        } else {
          tmp.push(deps[this.props.selectedValuePath]);
        }
      } else {
        tmp = [deps[this.props.selectedValuePath]];
      }

      this.setState({ internalSelectedItems: tmp });
    }

    onHandleClick(e) {
      if (this.props.callback) {
        this.props.callback(e, this.state.internalSelectedItems);
      }
    }

    onHandleClose(e, deps) {
      if (deps) {
        this.setState({ internalSelectedItems: deps }, () => {
          if (this.props.callback) {
            this.props.callback(e, this.state.internalSelectedItems);
          }
        });
      } else {
        this.props.callback(e, this.state.internalSelectedItems);
      }
    }

    render() {
      return <WrappedComponent {...this.props} internalSelectedItems={this.state.internalSelectedItems} onChange={this.handleChange} onSelect={this.handleClick} onClose={this.handleClose} />;
    }
  };

  MobFilterPopUpWrappedComponent.propTypes = {
    contentWrapClass: PropTypes.string,
    displayMemberPath: PropTypes.string,
    isAddOptions: PropTypes.bool,
    isMultiSelect: PropTypes.bool,
    itemsSource: PropTypes.array,
    mode: PropTypes.string,
    selectedValuePath: PropTypes.string,
    selectedItems: PropTypes.array,
    type: PropTypes.string,
    callback: PropTypes.func
  };
  return MobFilterPopUpWrappedComponent;
};
export default withMobFilterPopUp;
