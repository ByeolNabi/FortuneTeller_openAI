// src/components/Post.js
import React from "react";
import styled from "styled-components";
import { postDelete } from "../../api/boardService";

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

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 20%;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Post = (props) => {
  let { refresher, postId, title, content, isOwner } = props;
  const postDeleteHandler = async () => {
    console.log(postId);
    const resData = await postDelete({ postId: postId });
    alert(resData.message);
    refresher();
  };

  return (
    <PostContainer>
      <div className="top">
        <PostTitle>{title}</PostTitle>
        <PostContent>{content}</PostContent>
      </div>
      <BottomContainer>
        {isOwner && (
          <DeleteButton onClick={postDeleteHandler}>삭제</DeleteButton>
        )}
      </BottomContainer>
    </PostContainer>
  );
};

export default Post;
