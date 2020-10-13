import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '@src/actions/counterActions';

const ReduxSample = memo(() => {
  const { isLogin, isIE } = useSelector(state => state.common);
  const { number } = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onDecrement = useCallback(() => {
    dispatch(decrement());
  }, []);
  const onIncrement = useCallback(() => {
    dispatch(increment());
  }, []);
  const onReset = useCallback(() => {
    dispatch(reset());
  }, []);

  return (
    <div>
      <p>isLogin: {isLogin ? 'Y' : 'N'}</p>
      <p>isIE: {isIE ? 'Y' : 'N'}</p>
      <p>number: {number}</p>
      <button onClick={onIncrement}>INCREMENT</button>

      <button onClick={onDecrement}>DECREMENT</button>

      <button onClick={onReset}>RESET</button>
    </div>
  )
});

ReduxSample.propTypes = {
  isLogin: PropTypes.bool,
  isIE: PropTypes.bool,
  number: PropTypes.number,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  onReset: PropTypes.func
};

export default ReduxSample;
