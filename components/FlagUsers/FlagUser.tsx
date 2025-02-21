import React, { useMemo, useState } from "react";
import styles from "./flaguser.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveFlagUserPopup from "./RemoveFlagUserPopup";
import SendAlertPopup from "./SendAlertPopup";

const data = [
  {
    key: "1",
    enid: "ENID5666979",
    userName: "John#_Doe",
    name: "John Doe",
    plan: "Recruiter",
    price: 349.9,
    status: "Under Review",
    gateway: "Paypal",
    invoice: "Invoice-001",
    joinedDate: "Jan,07 2025",
    expireDate: "Jan,07 2026",
    reportedTimes: 5,
    reportedEnIds: ["ENID5666959", "ENID5666959", "ENID5666959"],
  },
  {
    key: "2",
    enid: "ENID5666989",
    userName: "John#_Doe",
    name: "John Doe",
    plan: "Recruiter",
    price: 349.9,
    status: "Suspended",
    gateway: "Paypal",
    invoice: "Invoice-002",
    joinedDate: "Jan,07 2025",
    expireDate: "Jan,07 2026",
    reportedTimes: 5,
    reportedEnIds: ["ENID5666959", "ENID5666969", "ENID5666959"],
  },
  {
    key: "3",
    enid: "ENID5666959",
    userName: "John#_Doe",
    name: "John Doe",
    plan: "Recruiter",
    price: 349.9,
    status: "Resolved",
    gateway: "Paypal",
    invoice: "Invoice-003",
    joinedDate: "Jan,07 2025",
    expireDate: "Jan,07 2026",
    reportedTimes: 4,
    reportedEnIds: ["ENID5666959", "ENID5666950", "ENID5666959"],
  },
  {
    key: "4",
    enid: "ENID5666949",
    userName: "John#_Doe",
    name: "John Doe",
    plan: "Recruiter",
    price: 349.9,
    status: "Suspended",
    gateway: "Paypal",
    invoice: "Invoice-004",
    joinedDate: "Jan,07 2025",
    expireDate: "Jan,07 2026",
    reportedTimes: 51,
    reportedEnIds: ["ENID5666959", "ENID5666959", "ENID5666959"],
  },
];

const FlagUser = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Flagged Users");
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  const filteredData = useMemo(() => {
    if (activeFilter === "All Flagged Users") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const getMoreItems = (record: any): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
    {
      key: "sendalert",
      label: "Send Alert",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowAlertPopup(true);
      },
    },
    {
      key: "suspend",
      label: "Suspend",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
  ];

  const columns = [
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
      title: "Reported Times",
      dataIndex: "reportedTimes",
      key: "reportedTimes",
      render: (number: any) => <span>{number} times</span>,
    },
    {
      title: "Reporting ENID’s",
      dataIndex: "reportedEnIds",
      key: "reportedEnIds",
      render: (enids: any) => (
        <div>
          {enids.map((enid: any, index: number) => (
            <span style={{ color: "#00A3B1" }} key={index}>
              {enid} | {index === enids.length - 1 ? "" : " "}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor:
              status === "Resolved"
                ? "#E8F7F7"
                : status === "Under Review"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "Resolved"
                ? "#00A3B1"
                : status === "Under Review"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("usercontentposts"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
          {record.status === "Under Review" ? (
            <Dropdown
              menu={{ items: getMoreItems(record) }}
              trigger={["hover"]}
              placement="bottomRight"
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

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Flag User</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Users Reported</h3>

              <div className={styles.leftPercentScore}>
                <p>55</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Under Review</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Resolved</h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Suspended Accounts</h3>
              <div className={styles.leftPercentScore}>
                <p>754684</p>
                <span className={styles.userTitle}>Accounts</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {[
                "All Flagged Users",
                "Resolved",
                "Under Review",
                "Suspended",
              ].map((filter) => (
                <p
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  // style={{
                  //   cursor: "pointer",
                  //   fontWeight: activeFilter === filter ? "bold" : "normal",
                  //   color: activeFilter === filter ? "#00A3B1" : "inherit",
                  // }}
                  className={`${styles.userFilterP} ${
                    activeFilter === filter ? styles.activeFilter : ""
                  }`}
                >
                  {filter}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <RemoveFlagUserPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
      {showAlertPopup &&
        createPortal(
          <SendAlertPopup onClose={() => setShowAlertPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default FlagUser;
