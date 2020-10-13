import { INCREMENT, DECREMENT, RESET } from "../actions/types";

const initialState = { number: 0 };

export default function countrReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 };
    case DECREMENT:
      return { number: state.number - 1 };
    case RESET:
      return { number: 0 };
    default:
      return state;
  }
}
