import React from "react";
import styles from "./enassist.module.scss";

const EnAssist = () => {
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>En Assist</p>
        </div>

        <div className={styles.dashboardScroll}></div>
      </div>
    </>
  );
};

export default EnAssist;
