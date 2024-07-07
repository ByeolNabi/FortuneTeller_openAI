import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Board from "../board/Board";
import styled from "styled-components";
import { userGet } from "../../api/userService";
import StyledButtonFrame from "../../components/style/ButtonStyle";

const MypageContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function MyPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    이름: "로딩중...",
    email: "로딩중...",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userid = JSON.parse(localStorage.getItem("userData")).user;
    const response = await userGet({ userid: userid });
    setUserInfo(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div>
      <div className="top">
        <MypageContainer>
          <h2>내 정보</h2>
          이름 : {userInfo.name}
          <br />
          email : {userInfo.email}
          <br />
          <button onClick={handleLogout}>로그아웃</button>
        </MypageContainer>
      </div>
      <div className="bottom">
        <Board userFilter={true}/>
      </div>
      <Outlet />
    </div>
  );
}

export default MyPage;
