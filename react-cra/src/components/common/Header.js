// src/components/Header.js
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

const NavLinks = styled.div`
  & > a {
    margin: 0 10px;
    color: white;
    text-decoration: none;
  }
`;

const Header = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const storedUserLoggedInData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (storedUserLoggedInData && storedUserLoggedInData.user) {
      login();
    } else {
      console.error("User data not found or userId is null");
      logout();
    }
  }, []);

  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        시바견운세사이트
      </Link>
      <NavLinks>
        <Link to="/board" style={{ textDecoration: "none" }}>
          다른사람 운세 보러가기
        </Link>
        {isAuthenticated ? (
          <Link to="/mypage" style={{ textDecoration: "none" }}>
            내정보
          </Link>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            로그인
          </Link>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
