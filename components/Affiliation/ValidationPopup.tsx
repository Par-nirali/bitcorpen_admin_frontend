import React, { useState } from "react";
import styles from "./validationpopup.module.scss";
import styles1 from "./finalvalidationpopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";

interface ValidationPopupProps {
  onClose: () => void;
}

const ValidationPopup: React.FC<ValidationPopupProps> = ({ onClose }) => {
  const [status, setStatus] = useState<
    "Validate" | "Invalid" | "Invalide & Fraud"
  >("Validate");
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
              <h5>Validation Submited </h5>
              <p className={styles1.modifyLinkDiv}>
                {/* <span className={styles1.enid}>ENID5666959</span> User Account */}
                {/* {status === "Validate" ? " Activated" : " Invalid"} */}
                user will receive this message in notification
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
                  <Radio.Group onChange={handleStatusChange}>
                    <div className={styles.connectBtns}>
                      <button
                        type="button"
                        className={`${styles.activeBtn} ${
                          status === "Validate" ? styles.active : ""
                        }`}
                        onClick={() => setStatus("Validate")}
                      >
                        <Radio
                          value="Validate"
                          className={status === "Validate" ? "valid-radio" : ""}
                        >
                          <span
                            style={{
                              color: "#009883",
                            }}
                          >
                            Validate
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "Invalid" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("Invalid")}
                      >
                        <Radio
                          value="Invalid"
                          className={
                            status === "Invalid" ? "invalid-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Invalid
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "Invalide & Fraud"
                            ? styles.deactivated
                            : ""
                        }`}
                        onClick={() => setStatus("Invalide & Fraud")}
                      >
                        <Radio
                          value="Invalid & Fraud"
                          className={
                            status === "Invalide & Fraud"
                              ? "invalidandfraud-radio"
                              : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Invalid & Fraud
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

export default ValidationPopup;
