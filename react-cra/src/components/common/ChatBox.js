import React, { useState,useContext } from "react";
import styles from "./ChatBox.module.css";
import { fetchFortune } from "../../api/gptService";
import { fortuneSave } from "../../api/boardService";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ChatBox() {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fortune_type = queryParams.get("t");

  const [inputValue, setInputValue] = useState(""); // input 필드의 상태 관리
  const [chatHistory, setChatHistory] = useState([]); // 채팅 기록 관리

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // input 필드의 값 업데이트
  };

  const handleSendClick = async () => {
    if (inputValue.trim()) {
      setInputValue(""); // input 필드 초기화
      setChatHistory((prev) => [...prev, inputValue]); // 채팅 기록에 추가
      let assistant = await fetchFortune({
        fortune_type: fortune_type,
        user_message: inputValue,
      });
      console.log(assistant);
      setChatHistory((prev) => [...prev, assistant.message]); // 채팅 기록에 추가
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendClick(); // Enter 키가 눌렸을 때 메시지 전송
    }
  };

  const handleSaveFortune = async () => {
    if (isAuthenticated) {
      let token = JSON.parse(localStorage.getItem("userData"));
      const data = {
        email: token.user,
        fortune_data: chatHistory[1],
        show: true,
      };
      const response = await fortuneSave(data);
      alert("저장되었습니다!");
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.top}>
        <div className={styles.chatHistory}>
          {chatHistory.map((message, index) => (
            <div key={index} className={styles.message}>
              {message}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        {chatHistory.length === 0 ? (
          <>
            {" "}
            <input
              className={styles.chatInput}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="생년월일을 입력하세요."
            />
            <button className={styles.sendButton} onClick={handleSendClick}>
              전송
            </button>
          </>
        ) : (
          <button className={styles.sendButton} onClick={handleSaveFortune}>
            저장하기
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
