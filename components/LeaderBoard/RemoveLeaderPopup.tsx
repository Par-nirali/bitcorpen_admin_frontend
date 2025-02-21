import React, { useState } from "react";
import styles from "./removeleaderpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";

interface RemoveLeaderProps {
  onClose: () => void;
}
const RemoveLeaderPopup: React.FC<RemoveLeaderProps> = ({ onClose }) => {
  const selectedLeaderDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);

  const handleSubmit = () => {
    setShowReasonPopup(true);
  };
  if (showReasonPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubReasonDiv}>
            <div className={styles1.modifyClose} onClick={onClose}>
              <img src="/icons/close.svg" alt="close" />
            </div>
            <div className={styles1.modifyReasonHead}>
              <h5>Reason for Removing from Leader Board</h5>
              <textarea rows={15} placeholder="Write message here" />
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(true);
                setShowReasonPopup(false);
              }}
              style={{ alignSelf: "flex-end" }}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead} style={{ maxWidth: "327px" }}>
              <h5>Removed from Leader Board</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedLeaderDetail?.enid}
                </span>{" "}
                is removed from leaderboard user will receive this message in
                notification
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
              <h4>Remove from Leader Board</h4>
              <p>
                Are you sure do you want to Remove{" "}
                <span>{selectedLeaderDetail?.enid}</span> from Leader Board?
              </p>
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
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveLeaderPopup;
