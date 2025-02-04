import React from "react";
import styles from "./webpopup.module.scss";

const Webpopup = () => {
  return (
    <>
      <div className={styles.resPageMainDiv}>
        <div className={styles.resPageContainer}>
          <div className={styles.resPageSubDiv}>
            <div className={styles.resPageImg}>
              <img src="/responsive.svg" loading="lazy" alt="images" />
            </div>
            <div className={styles.resPageText}>
              <h3>only web view Available</h3>
              <p>
                This feature is available only on the web version. Please switch
                to a web browser to access it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Webpopup;
