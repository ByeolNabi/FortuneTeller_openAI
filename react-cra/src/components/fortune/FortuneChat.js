import React from "react";
import styles from "../layout/FortuneLayout.module.css";
import StyledButtonFrame from "../style/ButtonStyle";
import ChatBox from "../common/ChatBox";

const FortuneChat = () => {
  return (
    <div className={styles.left}>
      <div className={styles.top}>
        <StyledButtonFrame to="/">🧚🏻무엇이든 물어보세요🧚🏻</StyledButtonFrame>
      </div>
      <div className={styles.bottom}>
        <ChatBox />
      </div>
    </div>
  );
};

export default FortuneChat;
