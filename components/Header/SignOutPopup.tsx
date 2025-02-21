import React, { useState } from "react";
import styles from "./signoutpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface SignOutProps {
  onClose: () => void;
}
const SignOutPopup: React.FC<SignOutProps> = ({ onClose }) => {
  const router = useRouter();
  const handleSubmit = async () => {
    localStorage.clear();
    onClose();
    Cookies.remove("isLoggedIn");
    console.log("Remove Report");
    await router.push("/login");
  };

  return (
    <div className={styles.connectMainDiv}>
      <div className={styles.connectContainer}>
        <div className={styles.connectSubDiv}>
          <div className={styles.connectClose} onClick={onClose}>
            <img src="/icons/close.svg" alt="close" />
          </div>

          <div className={styles.connectContent}>
            <div className={styles.connectHeadDiv}>
              <h4>Sign out session</h4>
              <p>Are you sure do you want to sign out global admin</p>
            </div>
            <div className={styles.connectBtns}>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                type="submit"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutPopup;
