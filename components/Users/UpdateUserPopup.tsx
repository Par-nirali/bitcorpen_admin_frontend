import React, { useState } from "react";
import styles from "./updateuserpopup.module.scss";
import styles1 from "./finalupdatepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";

interface UpdateUserPopupProps {
  onClose: () => void;
}

const UpdateUserPopup: React.FC<UpdateUserPopupProps> = ({ onClose }) => {
  const [status, setStatus] = useState<"Active" | "Deactivated">("Active");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    setShowSuccessPopup(true);
  };

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>
                User {status === "Active" ? " Activated" : " Deactivated"}{" "}
              </h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>ENID5666959</span> User Account
                {status === "Active" ? " Activated" : " Deactivated"}
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(false);
                onClose();
              }}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.connectMainDiv}>
      <div className={styles.connectContainer}>
        <div className={styles.connectSubDiv}>
          <div className={styles.connectClose} onClick={onClose}>
            <img src="/icons/close.svg" alt="close" />
          </div>

          <div className={styles.connectContent}>
            <div className={styles.connectHeadDiv}>
              <h4>Update User Status</h4>
              <div className={styles.connectReqBody}>
                <div className={styles.statusOptions}>
                  <label className={styles.statusLable}>Status:</label>
                  <Radio.Group onChange={handleStatusChange}>
                    <div className={styles.connectBtns}>
                      <button
                        type="button"
                        className={`${styles.activeBtn} ${
                          status === "Active" ? styles.active : ""
                        }`}
                        onClick={() => setStatus("Active")}
                      >
                        <Radio
                          value="Active"
                          className={status === "Active" ? "active-radio" : ""}
                        >
                          <span
                            style={{
                              color: "#009883",
                            }}
                          >
                            Active
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "Deactivated" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("Deactivated")}
                      >
                        <Radio
                          value="Deactivated"
                          className={
                            status === "Deactivated" ? "deactivated-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Deactivated
                          </span>
                        </Radio>
                      </button>
                    </div>
                  </Radio.Group>
                </div>
              </div>
            </div>

            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPopup;
