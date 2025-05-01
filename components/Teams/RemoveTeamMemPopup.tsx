import React, { useState } from "react";
import styles from "./removeteammempopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

interface RemoveTeamMemProps {
  onClose: () => void;
  refreshData: () => void;
}
const RemoveTeamMemPopup: React.FC<RemoveTeamMemProps> = ({
  onClose,
  refreshData,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedMemberDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedMemberDetail, "selectedMemberDetail");

  // const handleSubmit = () => {};
  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/team/delete?teamId=${selectedMemberDetail._id}`,
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
    // const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Team Member Removed</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedMemberDetail?.firstName}{" "}
                  {selectedMemberDetail?.lastName} Ortiz
                </span>{" "}
                as Founder & Ceoremoved as team member
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
              <h4>Remove Team Member </h4>
              <p>
                Are you sure do you want to remove{" "}
                <span>
                  {" "}
                  {selectedMemberDetail?.firstName}{" "}
                  {selectedMemberDetail?.lastName}
                </span>{" "}
                as Founder & Ceo
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

export default RemoveTeamMemPopup;
