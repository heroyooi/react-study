import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById
} from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// createPromiseThunk 유틸 사용 안했을 경우
// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS }); // 요청이 시작됨
//   try {
//     const posts = await postsAPI.getPosts(); // API 호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
//   }
// };
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST }); // 요청이 시작됨
//   try {
//     const post = await postsAPI.getPostById(id); // API 호출
//     dispatch({ type: GET_POST_SUCCESS, post }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e }); // 실패
//   }
// };

// createPromiseThunk 유틸 사용 했을 경우
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
};

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  // posts: {
  //   loading: false,
  //   data: null,
  //   error: null
  // },
  posts: reducerUtils.initial(),

  // post: {
  //   loading: false,
  //   data: null,
  //   error: null
  // }
  post: reducerUtils.initial()
};

// handleAsyncActions 유틸을 사용 했을 경우
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post', true)(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial()
      };
    default:
      return state;
  }
}


// handleAsyncActions 유틸을 사용 안했을 경우
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         // posts: {
//         //   loading: true,
//         //   data: null,
//         //   error: null
//         // }
//         posts: reducerUtils.loading()
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         // posts: {
//         //   loading: true,
//         //   data: action.posts,
//         //   error: null
//         // }
//         posts: reducerUtils.success(action.payload) // action.posts -> action.payload 로 변경
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         // posts: {
//         //   loading: true,
//         //   data: null,
//         //   error: action.error
//         // }
//         posts: reducerUtils.error(action.error)
//       };
//     case GET_POST:
//       return {
//         ...state,
//         // post: {
//         //   loading: true,
//         //   data: null,
//         //   error: null
//         // }
//         post: reducerUtils.loading()
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         // post: {
//         //   loading: true,
//         //   data: action.post,
//         //   error: null
//         // }
//         post: reducerUtils.success(action.payload) // action.post -> action.payload 로 변경
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         // post: {
//         //   loading: true,
//         //   data: null,
//         //   error: action.error
//         // }
//         post: reducerUtils.error(action.error)
//       };
//     default:
//       return state;
//   }
// }