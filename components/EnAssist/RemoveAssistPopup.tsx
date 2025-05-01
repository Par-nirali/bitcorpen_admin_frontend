import React, { useState } from "react";
import styles from "./removeleaderpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface RemoveAssistProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}
const RemoveAssistPopup: React.FC<RemoveAssistProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const selectedAssistDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log("selectedAssistDetail", selectedAssistDetail);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [reasonMsg, setReasonMsg] = useState("");

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/ENAssist/remove/${selectedAssistDetail?._id}`,
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

  if (showReasonPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubReasonDiv}>
            <div className={styles1.modifyClose} onClick={onClose}>
              <img src="/icons/close.svg" alt="close" />
            </div>
            <div className={styles1.modifyReasonHead}>
              <h5>Reason for Removing Assist Question</h5>
              <textarea
                rows={15}
                placeholder="Write message here"
                value={reasonMsg}
                onChange={(e) => {
                  setReasonMsg(e.target.value);
                }}
              />
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
              <h5>Assist Question Removed </h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedAssistDetail?.userName}
                </span>{" "}
                will receive removed reason in notifications
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
              <h4>Remove Assist Question</h4>
              <p>
                Are you sure do you want to Remove{" "}
                <span>{selectedAssistDetail?.userName}</span> Assist Question?
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

export default RemoveAssistPopup;
