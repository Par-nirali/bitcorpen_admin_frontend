import React, { useState } from "react";
import styles from "./validationpopup.module.scss";
import styles1 from "./finalvalidationpopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

interface AccountVerificationPopupProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}

const AccountVerificationPopup: React.FC<AccountVerificationPopupProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const [status, setStatus] = useState<any>("Validate");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showRejectionMsgPopup, setShowRejectionMsgPopup] = useState(false);
  const [reasonMessage, setReasonMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const selectedAccountDetails = useSelector(
    (state: any) => state.selectedDetails
  );

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
    setValidationError("");
  };

  const validateForm = () => {
    if (!status || status === "Validate") {
      setValidationError("Please select a status (Verify or Reject)");
      return false;
    }

    if (status === "REJECTED" && !showRejectionMsgPopup) {
      return false;
    }

    if (status === "REJECTED" && !reasonMessage.trim()) {
      setValidationError("Please provide a reason for rejection");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setValidationError("");

    // Show rejection popup if status is Reject
    if (status === "REJECTED" && !showRejectionMsgPopup) {
      setShowRejectionMsgPopup(true);
      return;
    }

    // Validate the form
    if (!validateForm()) {
      return;
    }

    let tkn = localStorage.getItem("auth-token");
    try {
      const payload: any = {
        accountVerificationId: selectedAccountDetails._id,
        status: status.toLowerCase(),
        // reason: reasonMessage,
      };
      if (status === "REJECTED") {
        payload.reason = reasonMessage;
      }
      const response = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/account-verification/changeStatus`,
        data: payload,
        headers: {
          Authorization: `${tkn}`,
        },
      });
      console.log("API Response:", response.data);
      setShowSuccessPopup(true);
      if (showRejectionMsgPopup) {
        setShowRejectionMsgPopup(false);
      }
      // setShowRejectionMsgPopup(true);
      // setShowSuccessPopup(true);
      refreshData();
      refreshDashData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleReasonSubmit = () => {
    if (!reasonMessage.trim()) {
      setValidationError("Please provide a reason for rejection");
      return;
    }
    handleSubmit();
  };

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>
                {status === "VERIFIED"
                  ? "Account Verified"
                  : "Account Rejected"}
              </h5>
              <p className={styles1.modifyLinkDiv}>
                {selectedAccountDetails?.userName || "User"} account
                successfully {status === "VERIFIED" ? "Verified" : "Rejected"}
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

  if (showRejectionMsgPopup) {
    return (
      <div className={styles.connectMainDiv}>
        <div className={styles.connectContainer}>
          <div className={styles.connectSubDiv1}>
            <div className={styles.connectClose} onClick={onClose}>
              <img src="/icons/close.svg" alt="close" />
            </div>

            <div className={styles.connectContent}>
              <div className={styles.connectHeadDiv}>
                <h4>
                  Give a Reason to Rejection{" "}
                  {/* {selectedQuestion?.userId?.userName || "UserName"} */}
                </h4>
                <div className={styles.connectReqBody1}>
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
                      className={styles.errorText}
                      style={{ color: "red", marginTop: "8px" }}
                    >
                      {validationError}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.connectBtns1}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowRejectionMsgPopup(false);
                  }}
                  // onClick={onClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles.submitBtn}
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
              <h4>Account Verification</h4>
              <div className={styles.connectReqBody}>
                <div className={styles.statusOptions}>
                  <Radio.Group onChange={handleStatusChange}>
                    <div className={styles.connectBtns}>
                      <button
                        type="button"
                        className={`${styles.activeBtn} ${
                          status === "VERIFIED" ? styles.active : ""
                        }`}
                        onClick={() => setStatus("VERIFIED")}
                      >
                        <Radio
                          value="VERIFIED"
                          className={status === "VERIFIED" ? "valid-radio" : ""}
                        >
                          <span
                            style={{
                              color: "#009883",
                            }}
                          >
                            Verify
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "REJECTED" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("REJECTED")}
                      >
                        <Radio
                          value="REJECTED"
                          className={
                            status === "REJECTED" ? "invalid-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Reject
                          </span>
                        </Radio>
                      </button>
                    </div>
                  </Radio.Group>
                </div>
                {validationError && (
                  <p
                    className={styles.errorText}
                    style={{ color: "red", marginTop: "8px" }}
                  >
                    {validationError}
                  </p>
                )}
              </div>
            </div>

            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationPopup;
