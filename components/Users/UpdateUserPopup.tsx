import { Radio } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles1 from "./finalupdatepopup.module.scss";
import styles from "./updateuserpopup.module.scss";

interface UpdateUserPopupProps {
  onClose: () => void;
  refreshData?: any;
  userIds?: string[];
  isMultipleEdit?: boolean;
}

const UpdateUserPopup: React.FC<UpdateUserPopupProps> = ({
  onClose,
  refreshData,
  userIds = [],
  isMultipleEdit = false,
}) => {
  const selectedUserDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedUserDetails, selectedUserDetails);
  const [status, setStatus] = useState<"Active" | "Inactivate">("Active");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  console.log(userIds, "userIds");

  const handleSubmit = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      // const payload = {
      //   userId: selectedUserDetails._id,
      //   status: status.toLocaleLowerCase(),
      // };
      const payload = {
        userId: isMultipleEdit ? userIds : [selectedUserDetails._id],
        status: status.toLocaleLowerCase(),
      };
      const joinedResponse = await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/user/update`,
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
              <h5>
                {isMultipleEdit ? "Users" : "User"}{" "}
                {status === "Active" ? " Activated" : " Inactivate"}{" "}
              </h5>
              <p className={styles1.modifyLinkDiv}>
                {/* <span className={styles1.enid}>ENID5666959</span> User Account
                {status === "Active" ? " Activated" : " Inactivate"} */}
                {isMultipleEdit ? (
                  `${userIds?.length} User Accounts ${
                    status === "Active" ? "Activated" : "Inactivated"
                  }`
                ) : (
                  <>
                    <span className={styles1.enid}>
                      {selectedUserDetails?.enid}
                    </span>{" "}
                    User Account{" "}
                    {status === "Active" ? "Activated" : "Inactivated"}
                  </>
                )}
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
              <h4>
                Update {isMultipleEdit ? `${userIds.length} Users` : "User"}{" "}
                Status
              </h4>
              <div className={styles.connectReqBody}>
                <div className={styles.statusOptions}>
                  <label className={styles.statusLable}>Status:</label>
                  <Radio.Group onChange={handleStatusChange}>
                    <div className={styles.connectBtns}>
                      <button
                        type="button"
                        className={`${styles.activeBtn} ${
                          status === "Active" ? styles.active : ""
                        }`}
                        onClick={() => setStatus("Active")}
                      >
                        <Radio
                          value="Active"
                          className={status === "Active" ? "active-radio" : ""}
                        >
                          <span
                            style={{
                              color: "#009883",
                            }}
                          >
                            Active
                          </span>
                        </Radio>
                      </button>
                      <button
                        type="button"
                        className={`${styles.deactiveBtn} ${
                          status === "Inactivate" ? styles.deactivated : ""
                        }`}
                        onClick={() => setStatus("Inactivate")}
                      >
                        <Radio
                          value="Inactivate"
                          className={
                            status === "Inactivate" ? "deactivated-radio" : ""
                          }
                        >
                          <span
                            style={{
                              color: "#FF4B4E",
                            }}
                          >
                            Inactivate
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

export default UpdateUserPopup;
