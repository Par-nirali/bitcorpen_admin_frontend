import React, { useState } from "react";
import styles from "./deletearticlepopup.module.scss";
import styles1 from "./finalremovepopup.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";

interface DeleteArticleProps {
  onClose: () => void;
}
const DeleteArticlePopup: React.FC<DeleteArticleProps> = ({ onClose }) => {
  const selectedArticleDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = () => {
    setShowSuccessPopup(true);
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
                  {selectedArticleDetails?.firstName}{" "}
                  {selectedArticleDetails?.lastName}
                </span>
                {selectedArticleDetails?.expiryDate}?
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
