import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice';

const PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId));

  return (
    <article className="post-excerpt" key={postId}>
      <h3>{ post.title }</h3>
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{ post.content.substring(0, 100) }</p>
      <PostAuthor userId={ post.user } />
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  let content;
  if (postStatus === 'loading') {
    content = <div className='loader'>Loading ...</div>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId} />);
  } else if (postStatus === 'failed') {
    content = <div>{ error }</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      { content }
    </section>
  );
}