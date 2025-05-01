import React, { useState } from "react";
import styles from "./plandecisionpopup.module.scss";
import styles1 from "./planconfimation.module.scss";
import styles2 from "../AccountVerification/validationpopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

interface PlanDecisionPopupProps {
  onClose: () => void;
  refreshData?: any;
  // currentStatus: "Active" | "Inactivated";
}

const PlanDecisionPopup: React.FC<PlanDecisionPopupProps> = ({
  onClose,
  refreshData,
  // currentStatus,
}) => {
  const selctedSubscriberData = useSelector(
    (state: any) => state.selectedDetails
  );
  const isDeactivating = !selctedSubscriberData?.isDeactive;
  const actionText = isDeactivating ? "Inactivate" : "Activate";
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeactivateMsgPopup, setShowDeactivateMsgPopup] = useState(false);
  const [reasonMessage, setReasonMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  console.log("selctedSubscriberData", selctedSubscriberData);

  const handleReasonSubmit = () => {
    if (!reasonMessage.trim()) {
      setValidationError("Please provide a reason for rejection");
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    let token = localStorage.getItem("auth-token");

    if (isDeactivating && !showDeactivateMsgPopup) {
      setShowDeactivateMsgPopup(true);
      return;
    }
    if (isDeactivating && !reasonMessage.trim()) {
      setValidationError("Please provide a reason for rejection");
      return false;
    }

    try {
      const payload: any = {
        subscriptionId: selctedSubscriberData._id,
        status: isDeactivating ? "deactivate" : "activate",
      };

      if (isDeactivating) {
        payload.reason = reasonMessage;
      }
      const response = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subscription/change-status`,
        data: payload,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data, "responseresponseresponseresponse");
      setShowSuccessPopup(true);
      if (showDeactivateMsgPopup) {
        setShowDeactivateMsgPopup(false);
      }
      refreshData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (showSuccessPopup) {
    const statusText = isDeactivating ? "Inactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Plan {statusText}</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selctedSubscriberData?.userId?.firstName}{" "}
                  {selctedSubscriberData?.userId?.lastName}
                </span>{" "}
                Current Plan {statusText}
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

  if (showDeactivateMsgPopup) {
    return (
      <div className={styles2.connectMainDiv}>
        <div className={styles2.connectContainer}>
          <div className={styles2.connectSubDiv1}>
            <div className={styles2.connectClose} onClick={onClose}>
              <img src="/icons/close.svg" alt="close" />
            </div>

            <div className={styles2.connectContent}>
              <div className={styles2.connectHeadDiv}>
                <h4>
                  Give a Reason to Deactivate{" "}
                  {/* {selectedQuestion?.userId?.userName || "UserName"} */}
                </h4>
                <div className={styles2.connectReqBody1}>
                  <textarea
                    rows={14}
                    placeholder="Write reason here"
                    value={reasonMessage}
                    onChange={(e) => {
                      setReasonMessage(e.target.value);
                      setValidationError("");
                    }}
                  />
                  {validationError && (
                    <p
                      className={styles2.errorText}
                      style={{ color: "red", marginTop: "8px" }}
                    >
                      {validationError}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles2.connectBtns1}>
                <button
                  className={styles2.cancelBtn}
                  onClick={() => {
                    setShowDeactivateMsgPopup(false);
                  }}
                  // onClick={onClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles2.submitBtn}
                  // onClick={handleSubmit}
                  onClick={handleReasonSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
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
              <h4>{actionText} Plan</h4>
              <p>
                Are you sure do you want to {actionText.toLowerCase()}{" "}
                <span>
                  {" "}
                  {selctedSubscriberData?.userId?.firstName}{" "}
                  {selctedSubscriberData?.userId?.lastName}{" "}
                </span>
                {!isDeactivating ? "Inactivated" : "Active"} Plan ?
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

export default PlanDecisionPopup;
