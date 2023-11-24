import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { reactionAdded } from './postsSlice';

interface reactionss {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}


interface Post {
  id: number | string;
  title: string;
  content: string;
  userId?: string;
  date: string;
  reactions: reactionss
}

const reactionEmoji:{ [key: string]: string } = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

interface ReactionButtonProps {
  post: Post;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ post }) => {
  const dispatch: AppDispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name as keyof reactionss }))}
      >
        {emoji} {post.reactions[name as keyof reactionss ]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;