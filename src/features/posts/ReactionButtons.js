import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
};

export const ReactionButons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
        key={name} 
        type="button" 
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{ ReactionButons }</div>
}