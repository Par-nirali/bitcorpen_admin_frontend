import React, { useState } from "react";
import styles from "./deletearticlepopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { selectedProjects } from "../redux/actions";

interface DeleteArticleProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashboardData?: any;
}
const DeleteArticlePopup: React.FC<DeleteArticleProps> = ({
  onClose,
  refreshData,
  refreshDashboardData,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedArticleDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log("selectedArticleDetails", selectedArticleDetails);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/article/delete/${selectedArticleDetails._id}`,
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
      onClose();
      if (response.data.success === true) {
        dispatch(selectedProjects("articles"));
        router.push("/articles");
      }
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

  if (showSuccessPopup) {
    // const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Article is Deleted</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>Article</span> Published by{" "}
                <span>
                  {selectedArticleDetails?.name}{" "}
                  {selectedArticleDetails?.lastName}
                </span>
                on{""}
                {selectedArticleDetails?.expiryDate} is Deleted.
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(false);
                dispatch(selectedProjects("articles"));
                router.push("/articles");
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
              <h4>Delete Articles</h4>
              <p>
                Are you sure do you want to Delete <span>Article </span>
                Published by{" "}
                <span>
                  {selectedArticleDetails?.userId?.firstName}{" "}
                  {selectedArticleDetails?.userId?.lastName}
                </span>
                on {formattedDate(selectedArticleDetails?.createdAt)}?
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

export default DeleteArticlePopup;
