import React, { useState } from "react";
import styles from "./removeflaguserpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";

interface SendAlertProps {
  onClose: () => void;
}
const SendContentAlertPopup: React.FC<SendAlertProps> = ({ onClose }) => {
  const selectedLeaderDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead} style={{ maxWidth: "327px" }}>
              <h5>Alert Sent</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedLeaderDetail?.enid}
                </span>{" "}
                will receive this alert message in notification
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
    <>
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubReasonDiv}>
            <div className={styles1.modifyClose} onClick={onClose}>
              <img src="/icons/close.svg" alt="close" />
            </div>
            <div className={styles1.modifyReasonHead}>
              <h5>Send Alert for Reported Post</h5>
              <textarea rows={15} placeholder="Write message here" />
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(true);
              }}
              style={{ alignSelf: "flex-end" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendContentAlertPopup;
