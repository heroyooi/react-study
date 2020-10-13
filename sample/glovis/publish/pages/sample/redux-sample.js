import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '@src/actions/counterActions';

class ReduxSample extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.number !== this.props.number) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <p>isLogin: {this.props.isLogin ? 'Y' : 'N'}</p>
        <p>isIE: {this.props.isIE ? 'Y' : 'N'}</p>
        <p>number: {this.props.number}</p>
        <button onClick={this.props.onIncrement}>INCREMENT</button>

        <button onClick={this.props.onDecrement}>DECREMENT</button>

        <button onClick={this.props.onReset}>RESET</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.common.isLogin,
  isIE: state.common.isIE,
  number: state.counter.number
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDecrement: () => dispatch(decrement()),
    onIncrement: () => dispatch(increment()),
    onReset: () => dispatch(reset())
  };
};

ReduxSample.getInitialProps = ({ reduxStore }) => {
  const state = reduxStore.getState();

  console.log(state);

  return {};
};

ReduxSample.propTypes = {
  isLogin: PropTypes.bool,
  isIE: PropTypes.bool,
  number: PropTypes.number,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  onReset: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSample);
