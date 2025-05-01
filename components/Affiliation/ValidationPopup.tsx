import React, { useState } from "react";
import styles from "./validationpopup.module.scss";
import styles1 from "./finalvalidationpopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

interface ValidationPopupProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}

const ValidationPopup: React.FC<ValidationPopupProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const [status, setStatus] = useState<any>("validated");
  const selectedAffiliateDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedAffiliateDetails, selectedAffiliateDetails);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      // const payload = {
      //   userId: selectedAffiliateDetails._id,
      //   status: status.toLocaleLowerCase(),
      // };
      const payload = {
        affiliateId: selectedAffiliateDetails._id,
        validation: status.toLocaleLowerCase(),
      };
      const joinedResponse = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/affiliate/update-status`,
        data: payload,
        headers: { Authorization: `${token}` },
      });
      console.log(joinedResponse, "joinedResponse");
      setShowSuccessPopup(true);
      refreshData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (showSuccessPopup) {
    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Validation Submited </h5>
              <p className={styles1.modifyLinkDiv}>
                {/* <span className={styles1.enid}>ENID5666959</span> User Account */}
                {status === "validated"
                  ? "Validated"
                  : status === "under_validation"
                  ? "Under Validation"
                  : "Invalid"}{" "}
                user will receive this message in notification
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
              <h4>Update User Status</h4>
              <div className={styles.connectReqBody}>
                <div className={styles.statusOptions}>
                  <Radio.Group onChange={handleStatusChange}>
                    <div className={styles.connectBtns}>
                      <button
                        type="button"
                        className={`${styles.activeBtn} ${
                          status === "validated" ? styles.active : ""
                        }`}
                        onClick={() => setStatus("validated")}
                      >
                        <Radio
                          value="validated"
                          className={
                            status === "validated" ? "valid-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#009883",
                            }}
                          >
                            Validate
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "invalid" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("invalid")}
                      >
                        <Radio
                          value="invalid"
                          className={
                            status === "invalid" ? "invalid-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Invalid
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "invalid & fraud" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("invalid & fraud")}
                      >
                        <Radio
                          value="invalid & fraud"
                          className={
                            status === "invalid & fraud"
                              ? "invalidandfraud-radio"
                              : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Invalid & Fraud
                          </span>
                        </Radio>
                      </button>
                    </div>
                  </Radio.Group>
                </div>
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

export default ValidationPopup;
