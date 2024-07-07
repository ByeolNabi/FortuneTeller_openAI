import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledButton = styled(Link)`
  background-color: #ffffff;
  color: #000000;
  border: solid 1px #9276b5;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: inline-block; /* Link 컴포넌트를 블록 요소로 만들어 클릭 영역을 넓힘 */

  &:hover {
    background-color: #ddc2ff;
  }

  &:disabled {
    background-color: #ffffff;
    cursor: not-allowed;
  }

  .type {
    text-decoration: none; /* 링크의 기본 텍스트 데코레이션을 제거 */
    color: inherit; /* 부모 요소의 텍스트 색상을 상속 */
  }
`;

const StyledButtonFrame = ({ children, to }) => {
  return <StyledButton to={to}>{children}</StyledButton>;
};

export default StyledButtonFrame;
