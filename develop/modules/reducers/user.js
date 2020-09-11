import produce from '../utils/produce';
import { ADD_USER } from '../actions/user';

const initialState = {
  users: [
    {
      id: 1,
      name: '연욱',
      createdAt: '2019-02-10',
    },
    {
      id: 2,
      name: '보미',
      createdAt: '2019-02-14',
    },
    {
      id: 3,
      name: '소예',
      createdAt: '2019-02-16',
    }
  ]
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_USER:
      console.log(action.data);
      draft.users.push(action.data);
    default:
      break;
  }
});

export default reducer;