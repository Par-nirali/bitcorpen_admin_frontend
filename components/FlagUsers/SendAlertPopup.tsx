import React, { useState } from "react";
import styles from "./removeflaguserpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface SendAlertProps {
  onClose: () => void;
}
const SendAlertPopup: React.FC<SendAlertProps> = ({ onClose }) => {
  const selectedFlagUserDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  console.log("selectedFlagUserDetail", selectedFlagUserDetail);

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/flagged/alertMsg`,
        data: {
          userId: selectedFlagUserDetail?.originalData?.flaggedUser?._id,
          reportId: selectedFlagUserDetail?._id,
          message: alertMessage,
        },
        headers: {
          Authorization: `${tkn}`,
        },
      });
      console.log("API Response:", response.data);
      setShowSuccessPopup(true);
      // refreshData();
      // refreshDashData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead} style={{ maxWidth: "327px" }}>
              <h5>Alert Sent</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedFlagUserDetail?.enid}
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
              <textarea
                rows={15}
                placeholder="Write message here"
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
              />
            </div>
            <button
              className={styles1.closeButton}
              onClick={handleSubmit}
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

export default SendAlertPopup;
