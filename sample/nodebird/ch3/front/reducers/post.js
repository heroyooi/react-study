export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '히어로',
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://via.placeholder.com/600/000000/ffffff'
    }, {
      src: 'https://via.placeholder.com/600/666666/ffffff'
    }, {
      src: 'https://via.placeholder.com/600/999999/ffffff'
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  }],
  imagePaths: [],
  postAdded: false,
};

export const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};
const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '히어로',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
}

export default reducer;