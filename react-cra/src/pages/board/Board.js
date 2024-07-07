// src/components/Board.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import { boardGet } from "../../api/boardService";
import { useAuth } from "../../context/AuthContext";

const BoardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto; /* 스크롤바 표시 */
  max-height: 70vh; /* 최대 높이 설정 (화면 크기에 따라 조절 가능) */
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 10px;
    border: none;
    background-color: #ddd;
    cursor: pointer;

    &:hover {
      background-color: #bbb;
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;

const Board = ({ userFilter }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    movePage(currentPage);
  }, []);

  const movePage = async (page) => {
    let response;
    if (userFilter) {
      const userId = JSON.parse(localStorage.getItem("userData")).user;
      response = await boardGet({ p: page, u: userId });
    } else {
      response = await boardGet({ p: page });
    }
    setPosts(response.pageData);
    // setTotalPages(response.totalPages);
    setCurrentPage(page);
  };

  return (
    <BoardContainer>
      {userFilter ? <h1>내가 쓴 글</h1> : <h1>게시판</h1>}
      {posts.map((post) => (
        <Post
          key={post.fortune_id}
          postId={post.fortune_id}
          title={post.name}
          content={post.fortune_data}
          isOwner={userFilter}
          refresher={movePage}
        />
      ))}
      <Pagination>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            disabled={currentPage === num + 1}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
      </Pagination>
    </BoardContainer>
  );
};

export default Board;
