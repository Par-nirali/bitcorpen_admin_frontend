import React, { useState } from "react";
import styles from "./removeflaguserpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface SuspendFlagUserProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}
const SuspendFlagUserPopup: React.FC<SuspendFlagUserProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedFlagUserDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log("selectedFlagUserDetail", selectedFlagUserDetail);

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/flagged/suspend`,
        data: {
          flaggedId: selectedFlagUserDetail._id,
        },
        headers: {
          Authorization: `${tkn}`,
        },
      });
      console.log("API Response:", response.data);
      setShowSuccessPopup(true);
      refreshData();
      refreshDashData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  if (showSuccessPopup) {
    // const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Flag User Suspended</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedFlagUserDetail?.enid}
                </span>{" "}
                Flag User is Suspended
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
              <h4>Suspend Flag User</h4>
              <p>
                Are you sure do you want to Suspend{" "}
                <span>{selectedFlagUserDetail?.enid} </span>Flag User?
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

export default SuspendFlagUserPopup;
