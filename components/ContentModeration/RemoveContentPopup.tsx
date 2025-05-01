import React, { useState } from "react";
import styles from "./removecontentpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface RemoveContentProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData: () => void;
}
const RemoveContentPopup: React.FC<RemoveContentProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedContentDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log("selectedContentDetail", selectedContentDetail);

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/content-moderation/removeReport`,
        data: {
          reportId: selectedContentDetail._id,
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
              <h5>Report Removed</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedContentDetail?.originalData?.reportedBy?.ENID}
                </span>{" "}
                Report is removed
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
              <h4>Remove Report</h4>
              <p>
                Are you sure do you want to Remove{" "}
                <span>
                  {" "}
                  {selectedContentDetail?.originalData?.reportedBy?.ENID}{" "}
                </span>
                report?
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

export default RemoveContentPopup;
