import React from 'react';
import { PostButton } from './PostButton';
import { heartIconFilled } from '../assets/icons';
import { heartIcon } from '../assets/icons';

export const LikeButton = ({onPress, liked, count}) => {

  return (
    <PostButton onPress={onPress} 
        icon={liked ? heartIconFilled : heartIcon}
        text={count}>
    </PostButton>
  );
}
