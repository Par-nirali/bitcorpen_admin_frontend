import React, { useEffect, useMemo, useState } from "react";
import styles from "./affiliationuserdetail.module.scss";
import styles1 from "./finalvalidationpopup.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { Dropdown, Table } from "antd";
import type { MenuProps } from "antd";
import { createPortal } from "react-dom";
import { Radio } from "antd";
import axios from "axios";
import ValidationPopup from "./ValidationPopup";
// import UpdateUserPopup from "./UpdateUserPopup";

const AffiliationUserDetail = ({
  setSelectedProject,
  warningpopup,
  onClose,
}: any) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState<any>("validated");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const selectedAffiliateDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>("");
  const [userTableData, setUserTableData] = useState<any>([]);
  console.log(selectedAffiliateDetails, "selectedAffiliateDetails");

  const isUnderValidation =
    selectedAffiliateDetails?.status === "Under Validation";
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    setShowSuccessPopup(true);
  };
  const getUserByIdData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/affiliate/getUserDetails/${selectedAffiliateDetails._id}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data, "response.data.data----by useriddddddddddd");

      setUserInfo(response.data.data);
      const selectAllUserData = [response.data.data];
      if (selectAllUserData && selectAllUserData) {
        const formattedData = selectAllUserData.map(
          (affiliate: any, index: number) => ({
            _id: affiliate._id || index.toString(),
            enid: affiliate.userId.ENID || "",
            userName: affiliate.userId.userName || "-",
            name: `${affiliate.userId.firstName || "Test"} ${
              affiliate.userId.lastName || "User"
            }`.trim(),
            joinedDate: new Date(affiliate.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            referralenid: affiliate.refferalBy.ENID || "-",
            referrallink: affiliate.link || "-",
            status: affiliate.validation || "-",
            originalData: affiliate,
          })
        );
        setUserTableData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getValidationItem = (record: any): MenuProps["items"] => [
    {
      key: "givevalidation",
      label: "Give Validation",
      onClick: () => {
        setShowPopup(true);
        dispatch(selectedDetails(record));
      },
    },
  ];

  const usercolumns = [
    // {
    //   title: "Nos.",
    //   dataIndex: "index",
    //   width: 80,
    //   render: (_: any, __: any, index: number) => `#${index + 1}`,
    // },
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Referral ENID",
      dataIndex: "referralenid",
      key: "referralenid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Referral Link",
      dataIndex: "referrallink",
      key: "referrallink",
      width: 350,
      render: (text: any) => (
        <a
          style={{ color: "#00A3B1", textDecoration: "underline" }}
          href={text}
          target="_blank"
          rel="noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor:
              status === "validated"
                ? "#E8F7F7"
                : status === "under_validation"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "validated"
                ? "#00A3B1"
                : status === "under_validation"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status === "validated"
            ? "Validated"
            : status === "under_validation"
            ? "Under Validation"
            : "Invalid"}
        </span>
      ),
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("affiliateuserdetail"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
          {record.status === "under_validation" ? (
            <Dropdown
              menu={{ items: getValidationItem(record) }}
              trigger={["hover"]}
              placement="bottomRight"
              // style={{ width: "100%" }}
            >
              <a style={{ width: "24px", height: "24px" }}>
                <img src="/icons/more.svg" alt="edit" />
              </a>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUserByIdData();
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          // onClick={() => setSelectedProject("sales projects")}
          onClick={() => dispatch(selectedProjects("affiliation"))}
        >
          {/* <div className={styles.backArrow}> */}
          <img src="/icons/back.svg" alt="back" />
          {/* </div> */}
          <p>Affiliates Validation Details</p>
        </button>

        {/* <div className={styles.pHeadingDiv}>
              <h3>Add Project</h3>
            </div> */}

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            {/* <div className={styles.dropdownsSection}>
                  <p className={styles.dollarsTitle}>Recent Subscribed</p>
                  <button
                    className={styles.viewAllBtn}
                    onClick={() => dispatch(selectedProjects("recenetalljoin"))}
                  >
                    View All
                  </button>
                </div> */}

            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                // border={"1px solid #000"}
                columns={usercolumns}
                dataSource={userTableData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
            <div className={styles.userInfoMainDiv}>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Name</span>
                  <p>
                    {userInfo?.userId?.firstName || "-"}{" "}
                    {userInfo?.userId?.lastName}
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>User Name</span>
                  <p>{userInfo?.userId?.userName || "-"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Referral ENID</span>
                  <p style={{ color: "#009883" }}>
                    {userInfo?.refferalBy?.ENID || "-"}
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Referral Link</span>
                  <a
                    style={{ color: "#009883" }}
                    href={userInfo?.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userInfo?.link || "-"}
                  </a>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Subscription</span>
                  <p>{userInfo?.userId?.userType || "-"}</p>
                </div>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Total Affiliates</span>
                  <p>{userInfo?.totalAffiliate || 0} Members</p>
                </div>
                {/* <div className={styles.pointsDiv}>
                  <span>Members Under </span>
                  <p>{userInfo?.totalAffiliate || 0} Members</p>
                </div> */}
                <div className={styles.pointsDiv}>
                  <span>Validated members</span>
                  <p>{userInfo?.totalValidMembers || 0} Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Invalid members</span>
                  <p>{userInfo?.totalInvalidMembers || 0} Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Under Validation</span>
                  <p>{userInfo?.totalUndervalidMembers || 0} Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Reward Lost</span>
                  <p>${userInfo?.totalAffiliate > 16 ? "0" : "1"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Status </span>
                  <p
                    className={`${styles.statusDiv} ${
                      userInfo?.totalAffiliate > 16 ? "" : styles.noteligible
                    }`}
                  >
                    {userInfo?.totalAffiliate > 16
                      ? "Eligible"
                      : "Not Eligible"}
                  </p>
                </div>
              </div>
            </div>
            {/* {isUnderValidation && (
              <>
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
                <button
                  className={styles.messageBtn}
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit
                </button>
              </>
            )} */}
            {/* {isUnderValidation && ( */}
            {/* )} */}
          </div>
        </div>
      </div>
      {/* {showSuccessPopup &&
        createPortal(
          <>
            <div className={styles1.modifyMainDiv}>
              <div className={styles1.modifyContainer}>
                <div className={styles1.modifySubDiv}>
                  <div className={styles1.modifyHead}>
                    <h5>Validation Submited </h5>
                    <p className={styles1.modifyLinkDiv}>
                      {/* <span className={styles1.enid}>ENID5666959</span> User Account */}
      {/* {status === "Validate" ? " Activated" : " Invalid"} 
                      user will receive this message in notification
                    </p>
                  </div>
                  <button
                    className={styles1.closeButton}
                    onClick={() => {
                      setShowSuccessPopup(false);
                      // onClose();
                      dispatch(selectedProjects("affiliation"));
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.getElementById("modals")!
        )} */}
      {showPopup &&
        createPortal(
          <ValidationPopup
            onClose={() => setShowPopup(false)}
            refreshData={getUserByIdData}
            // refreshDashData={getAffiliateHeadData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};
export default AffiliationUserDetail;
