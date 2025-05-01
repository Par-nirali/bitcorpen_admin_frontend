import React, { useState } from "react";
import styles from "./removesubadminpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface RemoveSubAdminProps {
  onClose: () => void;
  refreshData: () => void;
}
const RemoveSubAdminPopup: React.FC<RemoveSubAdminProps> = ({
  onClose,
  refreshData,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedSubAdminDetail = useSelector(
    (state: any) => state.selectedDetails
  );

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subAdmin/delete/${selectedSubAdminDetail._id}`,
        // data: {
        //   enAssistId: selectedReqDetail._id,
        // },
        headers: {
          Authorization: `${tkn}`,
        },
      });
      console.log("API Response:", response.data);
      setShowSuccessPopup(true);
      refreshData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Sub Admin Removed</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedSubAdminDetail?.roles}
                </span>{" "}
                has removed from sub admin list
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
              <h4>Remove from Sub Admin</h4>
              <p>
                Are you sure do you want to Remove{" "}
                <span>{selectedSubAdminDetail?.roles}? </span>
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

export default RemoveSubAdminPopup;
