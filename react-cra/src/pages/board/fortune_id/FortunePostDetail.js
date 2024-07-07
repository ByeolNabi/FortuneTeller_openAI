// src/components/Post.js
import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #333;
`;

const PostContent = styled.p`
  margin: 10px 0 0;
  font-size: 1em;
  color: #666;
`;

const Post = ({ title, content }) => {
  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostContent>{content}</PostContent>
    </PostContainer>
  );
};

export default Post;
