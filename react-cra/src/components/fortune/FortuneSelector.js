import React from "react";
import styles from "../layout/FortuneLayout.module.css";
import StyledButtonFrame from "../style/ButtonStyle";

const FortuneSelector = () => {
  return (
    <div className={styles.left}>
      <div className={styles.top}>
        <StyledButtonFrame to="/">
          <div className="mainboard">🧚🏻무엇이든 물어보세요🧚🏻</div>
        </StyledButtonFrame>
      </div>
      <div className={styles.bottom}>
        <StyledButtonFrame to="/teller?t=relationship">
          <div className="type">연애운</div>
        </StyledButtonFrame>

        <StyledButtonFrame to="/teller?t=today">
          <div className="type">오늘의 운세</div>
        </StyledButtonFrame>

        <StyledButtonFrame to="/teller?t=gold">
          <div className="type">재물운</div>
        </StyledButtonFrame>

        <StyledButtonFrame to="/teller?t=job">
          <div className="type">취업운</div>
        </StyledButtonFrame>
      </div>
    </div>
  );
};

export default FortuneSelector;
