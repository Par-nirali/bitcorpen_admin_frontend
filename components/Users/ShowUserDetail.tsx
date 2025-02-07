import React, { useState } from "react";
import styles from "./showuserdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import UpdateUserPopup from "./UpdateUserPopup";
import SendMsgUser from "./SendMsgUser";

const ShowUserDetail = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
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
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: () => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a onClick={() => setShowPopup(true)}>
            <img src="/icons/edit.svg" alt="edit" />
          </a>
          {/* <a onClick={() => dispatch(selectedProjects("userdetails"))}>
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
        </div>
      ),
    },
  ];
  const invoicecolumns = [
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      //   render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Billing date",
      dataIndex: "billingdate",
      key: "billingdate",
    },
    {
      title: "Expire date",
      dataIndex: "expiredate",
      key: "expiredate",
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
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: () => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a style={{ display: "flex", gap: "8px" }}>
            <img src="/icons/edit.svg" alt="edit" />
            <p>Download</p>
          </a>
          {/* <a onClick={() => dispatch(selectedProjects("userdetails"))}>
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
        </div>
      ),
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
  const invoicedata = [
    {
      key: "1",
      plan: "Influencer",
      price: "$78.90",
      billingdate: "Jan, 07, 2025",
      expiredate: "Jan, 07, 2025",
      status: "Active",
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
          <p>Users Details </p>
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
              <h3>Users More info</h3>
              <div className={styles.userDetailsDiv}>
                <div className={styles.badgeDiv}>
                  <div className={styles.pointsDiv}>
                    <span>Badge</span>
                    <p>Member</p>
                  </div>
                  <div className={styles.downloadDiv}>
                    <img src="/icons/download.svg" alt="download" />
                    <p>Download</p>
                  </div>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Next Rank to Reach</span>
                  <p className={styles.numberPoints}>
                    500<span> Points</span>
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Current ENR Points</span>
                  <p className={styles.numberPoints}>
                    500<span> Points</span>
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Paid Affiliates</span>
                  <p className={styles.numberPoints}>4568</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Unpaid Affilates</span>
                  <p className={styles.numberPoints}>5233</p>
                </div>
              </div>
              <div className={styles.pointsDiv}>
                <span>Bio</span>
                <p>
                  Accomplished business strategist and entrepreneur known for
                  his innovative approach to sustainable development and
                  environmental stewardship. With over two decades of
                  experience, Pit has built a reputation for combining
                  profitability with social responsibility, paving the way for a
                  new era of conscious business practices.
                </p>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Country</span>
                  <p>USA</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>City</span>
                  <p>Springfield</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Address Line 1</span>
                  <p>123 Main Street</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Address Line 2</span>
                  <p>Springfield, IL 62701</p>
                </div>
              </div>
            </div>
            <div className={styles.profInfoMainDiv}>
              <h3>Professional Information</h3>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Job Title</span>
                  <p>Business Development Exclusive </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Employed at</span>
                  <p>Company name</p>
                </div>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Industry </span>
                  <p className={styles.skillPoint}>Aerospace</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Skills</span>
                  <div className={styles.skillsDiv}>
                    <p className={styles.skillPoint}>Aerodynamics</p>
                    <p className={styles.skillPoint}>Avionics</p>
                    <p className={styles.skillPoint}>CAD</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={styles.messageBtn}
              onClick={() => setShowPopup(true)}
              type="button"
            >
              Send a Message
            </button>
            <div className={styles.graphDivtable}>
              <h3>Invoice History</h3>
              <Table
                bordered={true}
                // border={"1px solid #000"}
                columns={invoicecolumns}
                dataSource={invoicedata}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <SendMsgUser onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowUserDetail;
