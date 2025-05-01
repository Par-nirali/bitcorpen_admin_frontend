import React, { useState } from "react";
import styles from "./sendmsguser.module.scss";
import styles1 from "./finalupdatepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface SendMsgUserProps {
  onClose: () => void;
}

const SendMsgUser: React.FC<SendMsgUserProps> = ({ onClose }) => {
  const selectedUserDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedUserDetails, selectedUserDetails);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/user/send-alert`,
        data: {
          userId: [selectedUserDetails?._id],
          message: message,
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
            <div
              className={styles1.modifyHead}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <h5>Message Sent</h5>
              <p
                className={styles1.modifyLinkDiv}
                style={{
                  textAlign: "center",
                  color: "#8E8E8E",
                  fontWeight: "400",
                }}
              >
                {selectedUserDetails?.firstName} {selectedUserDetails?.lastName}{" "}
                will recive this message in notifications
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(false);
                onClose();
              }}
              style={{ alignSelf: "center" }}
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
              <h4>
                Sending Message to {selectedUserDetails?.firstName}{" "}
                {selectedUserDetails?.lastName}
              </h4>
              <div className={styles.connectReqBody}>
                <textarea
                  rows={14}
                  placeholder="Write message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMsgUser;
