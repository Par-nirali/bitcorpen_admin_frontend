import React, { useState } from "react";
import styles from "./removeadpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";

interface StatusChangeProps {
  onClose: () => void;
  // currentStatus: "Active" | "Deactivated";
}
const StatusChangePopup: React.FC<StatusChangeProps> = ({ onClose }) => {
  const selectedAdDetails = useSelector((state: any) => state.selectedDetails);
  console.log(selectedAdDetails, selectedAdDetails);

  const isDeactivating = selectedAdDetails.status === "Active";
  const actionText = isDeactivating ? "Deactivate" : "Activate";
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = () => {
    setShowSuccessPopup(true);
  };

  if (showSuccessPopup) {
    const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>AD {statusText}</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>{selectedAdDetails.enid}</span>{" "}
                AD {statusText}
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
              <h4>{actionText} AD</h4>
              <p>
                Are you sure do you want to {actionText.toLowerCase()} of{" "}
                <span>{selectedAdDetails.enid}</span>
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
                {actionText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusChangePopup;
