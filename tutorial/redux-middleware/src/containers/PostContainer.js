import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, goToHome, clearPost } from '../modules/posts';
import Post from '../components/Post';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    // return () => {

    //   dispatch(clearPost());
    //   // 페이지를 떠날때마다 포스트를 비우게 되므로, 다른 포스트를 읽을 때 이전 포스트가 보여지는 문제가 해결되어진다.
    //   // 아쉬운 점은 이미 읽었던 포스트를 불러오려고 할 경우에도 새로 요청을 한다

    // };
  }, [dispatch, postId]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이고 데이터 없을때만
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;