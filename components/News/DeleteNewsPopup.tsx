import React, { useState } from "react";
import styles from "./deletenewspopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectedProjects } from "../redux/actions";

interface DeleteNewsProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashboardData?: any;
}
const DeleteNewsPopup: React.FC<DeleteNewsProps> = ({
  onClose,
  refreshData,
  refreshDashboardData,
}) => {
  const dispatch = useDispatch();
  const selectedNewsDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/delete/${selectedNewsDetails._id}`,
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
      refreshDashboardData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formattedDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleClose = () => {
    dispatch(selectedProjects("news"));
    setShowSuccessPopup(false);
    onClose();
  };

  if (showSuccessPopup) {
    // const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>News Deleted</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedNewsDetails.enid}news
                </span>{" "}
                Published on{" "}
                {Math.floor(
                  (new Date().getTime() -
                    new Date(
                      selectedNewsDetails?.createdAt as string
                    ).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                is Deleted
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                handleClose();
                // dispatch(selectedProjects("news"));
                // setShowSuccessPopup(false);
                // onClose();
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
              <h4>Delete News</h4>
              <p>
                Are you sure do you want to Delete News
                <span>{selectedNewsDetails.enid} </span>Published on{" "}
                {formattedDate(selectedNewsDetails?.createdAt)}?
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
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteNewsPopup;
