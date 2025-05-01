import React, { useEffect, useState } from "react";
import styles from "./removeflaguserpopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { getSocket } from "../Login/Login";

interface SendAlertProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}
const SendContentAlertPopup: React.FC<SendAlertProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const socket = getSocket();
  const selectedContentDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log("selectedContentDetail", selectedContentDetail);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async () => {
    console.log("selectedContentDetail");

    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/content-moderation/alertMsg`,
        data: {
          reportId: selectedContentDetail?._id,
          userId: selectedContentDetail.originalData?.postId
            ? selectedContentDetail.originalData?.postId?.userId?._id
            : selectedContentDetail.originalData?.messageId
            ? selectedContentDetail.originalData?.messageId?.userId?._id
            : "",
          message: alertMessage,
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

  useEffect(() => {
    const initializeNotifications = async () => {
      console.log("socketiiiii", socket);

      if (socket) {
        socket.on("notification", (data: any) => {
          console.log(data, "data");
        });
      }
    };
    initializeNotifications();
  }, []);

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead} style={{ maxWidth: "327px" }}>
              <h5>Alert Sent</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedContentDetail?.originalData?.reportedBy?.ENID}
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

export default SendContentAlertPopup;
