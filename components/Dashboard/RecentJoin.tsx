import React from "react";
import styles from "./dashboard.module.scss";

const RecentJoin = () => {
  return (
    <>
      <div className={styles.graphTableDiv}>
        <div className={styles.dropdownsSection}>
          {/* <div className={styles.amountsDropdown}> */}
          {/* <div className={styles.dollarsLabel}> */}
          <p className={styles.dollarsTitle}>Recent Joined</p>
          {/* <div className={styles.dropdownArrow}>
                    <img src="/icons/dashddarrow.svg" alt="dropdownarrow" />
                  </div> */}
          {/* </div> */}
          {/* </div> */}

          <button className={styles.viewAllBtn}>View All</button>
        </div>

        <div className={styles.graphDiv}></div>
      </div>
    </>
  );
};

export default RecentJoin;
