import React, { useState } from "react";
import styles from "./answermsguser.module.scss";
import styles1 from "./finalmsgpopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import axios from "axios";

interface SendMsgUserProps {
  onClose: () => void;
}

const AnswerMsgUser: React.FC<SendMsgUserProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedQuestion = useSelector((state: any) => state.selectedDetails);
  console.log(selectedQuestion, "selectedQuestion");
  const [answerMessage, setAnswerMessage] = useState("");

  const handleSubmit = async () => {
    console.log("selectedContentDetail");

    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/helpAndSupport/resolveRequest`,
        data: {
          supportId: selectedQuestion._id,
          answere: answerMessage,
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
                {selectedQuestion?.userId?.userName || "UserName"} will recive
                this message in notifications
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(false);
                dispatch(selectedProjects("help_support_admin"));
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
                Answering to {selectedQuestion?.userId?.userName || "UserName"}
              </h4>
              <div className={styles.connectReqBody}>
                <textarea
                  rows={14}
                  placeholder="Write message here"
                  value={answerMessage}
                  onChange={(e) => setAnswerMessage(e.target.value)}
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

export default AnswerMsgUser;
