import React, { useState } from "react";
import styles from "./showassistdetails.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import { useSelector } from "react-redux";

interface ValidationPopupProps {
  onClose: () => void;
  refreshData?: any;
  refreshDashData?: any;
}

const ShowAssistDetails: React.FC<ValidationPopupProps> = ({
  onClose,
  refreshData,
  refreshDashData,
}) => {
  const selectedAssistDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedAssistDetail, "selectedAssistDetail");
  if (!selectedAssistDetail) {
    return null;
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
              <h4>{selectedAssistDetail?.question}</h4>
              <div className={styles.connectReqBody}>
                <textarea
                  rows={10}
                  placeholder="Enter answer"
                  value={
                    selectedAssistDetail?.originalData?.answere[0]?.answere
                  }
                  className={styles.AssistInputAnswer}
                  readOnly
                />
                <div className={styles.connectFlag}>
                  <p>Helpful</p>
                  <img src="/icons/gflag.svg" alt="gflag" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAssistDetails;
