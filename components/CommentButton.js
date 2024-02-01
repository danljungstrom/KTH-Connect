import React from 'react';
import { PostButton } from './PostButton';
import { commentIcon } from '../assets/icons';

export const CommentButton = ({onPress, count}) => {

  return (
    <PostButton onPress={onPress}
        icon={commentIcon}
        text={count}>
    </PostButton>
  );
}
