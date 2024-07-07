import React from "react";
import { useLocation } from "react-router-dom";
import FortuneSelector from "../fortune/FortuneSelector";
import styles from "./FortuneLayout.module.css";
import FortuneChat from "../fortune/FortuneChat";

const FortuneLayout = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      {location.pathname === "/" && <FortuneSelector />}
      {location.pathname === "/teller" && <FortuneChat />}
      <div className={styles.right}>
        <img className={styles.sival} alt="시바점술사" src="https://s3-alpha-sig.figma.com/img/348d/333c/281eb2fc43f3e2ed11e7be1e41244570?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=izdQv3Z0xIKSJReLtrDb5TxdOXm5P3nn0z8QzjwIo2yFNdQeZWfmAMhTJx5aX5DWM4pEpX50Rq4aJamU8bauoCuzceIdkqUu25EfAWPclKXVxAk4uh5tD2cu4Tk7WeYcYOpMWieQ4bjEc7gLULVz~VxOZuDzQcqhmzDSrsHkhC2GaYsXrkh2bslQoIXh9Td6p9Kp5cXSZzffxoQdAdpePcbnZooo0oOast-LmiVI7la9VynQVXfG-WzN1MKjY3KoujJ66jifgtRX0B1nqNcCLBFpbt~x3EnNTJIaSYQNDRBKVA3a0SWEqSridWupEO7YVqV~1blB7tst5woKI9k2Bg__"></img>
      </div>
    </div>
  );
};

export default FortuneLayout;
