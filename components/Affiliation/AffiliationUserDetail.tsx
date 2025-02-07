import React, { useState } from "react";
import styles from "./affiliationuserdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import { Radio } from "antd";
// import UpdateUserPopup from "./UpdateUserPopup";

const AffiliationUserDetail = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState<
    "Validate" | "Invalid" | "Invalide & Fraud"
  >("Validate");
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const usercolumns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: () => (
        <img
          src="/profile.png"
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
      ),
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            backgroundColor: status === "Active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "Active" ? "#00A3B1" : "#FF4D4F",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
  ];
  const userdata = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
    },
  ];

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          // onClick={() => setSelectedProject("sales projects")}
          onClick={() => dispatch(selectedProjects("users"))}
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
                dataSource={userdata}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
            <div className={styles.userInfoMainDiv}>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Name</span>
                  <p>Dummy name</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>User Name</span>
                  <p>Dummy_name</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Referral ENID</span>
                  <p style={{ color: "#009883" }}>ENID5666959</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Referral Link</span>
                  <a style={{ color: "#009883" }} href=" ">
                    encolunyty/dummy-referral-spam.html
                  </a>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Subscription</span>
                  <p>Proffetional</p>
                </div>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Total Affiliates</span>
                  <p>32 Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Members Under </span>
                  <p>20 Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Validated members</span>
                  <p>16 Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Invalid members</span>
                  <p>4 Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Under Validation</span>
                  <p>12 Members</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Reward Lost</span>
                  <p>$1</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Status </span>
                  <p className={styles.statusDiv}>Not Eligible </p>
                </div>
              </div>
            </div>
            <div className={styles.statusOptions}>
              <Radio.Group onChange={handleStatusChange}>
                <div className={styles.connectBtns}>
                  <button
                    type="button"
                    className={`${styles.activeBtn} ${
                      status === "Validate" ? styles.active : ""
                    }`}
                    onClick={() => setStatus("Validate")}
                  >
                    <Radio
                      value="Validate"
                      className={status === "Validate" ? "valid-radio" : ""}
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
                      status === "Invalid" ? styles.deactivated : ""
                    }`}
                    onClick={() => setStatus("Invalid")}
                  >
                    <Radio
                      value="Invalid"
                      className={status === "Invalid" ? "invalid-radio" : ""}
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
                      status === "Invalide & Fraud" ? styles.deactivated : ""
                    }`}
                    onClick={() => setStatus("Invalide & Fraud")}
                  >
                    <Radio
                      value="Invalid & Fraud"
                      className={
                        status === "Invalide & Fraud"
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
              onClick={() => setShowPopup(true)}
              type="button"
            >
              Send a Message
            </button>
          </div>
        </div>
      </div>
      {/* {showPopup &&
        createPortal(
          <SendMsgUser onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )} */}
    </>
  );
};
export default AffiliationUserDetail;
