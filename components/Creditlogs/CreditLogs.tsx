import React, { useMemo, useState } from "react";
import styles from "./creditlogs.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";

const CreditLogs = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      price: 349.9,
      status: "Completed",
      gateway: "Paypal",
      invoice: "Invoice-001",
      joinedDate: "Jan,07 2025",
      expireDate: "Jan,07 2026",
    },
    {
      key: "2",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      price: 349.9,
      status: "Pending",
      gateway: "Paypal",
      invoice: "Invoice-002",
      joinedDate: "Jan,07 2025",
      expireDate: "Jan,07 2026",
    },
    {
      key: "3",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      price: 349.9,
      status: "Completed",
      gateway: "Paypal",
      invoice: "Invoice-003",
      joinedDate: "Jan,07 2025",
      expireDate: "Jan,07 2026",
    },
    {
      key: "4",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      price: 349.9,
      status: "Failed",
      gateway: "Paypal",
      invoice: "Invoice-004",
      joinedDate: "Jan,07 2025",
      expireDate: "Jan,07 2026",
    },
  ];

  const filteredData = useMemo(() => {
    if (activeFilter === "All") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

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
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
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
              status === "Completed"
                ? "#E8F7F7"
                : status === "Pending"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "Completed"
                ? "#00A3B1"
                : status === "Pending"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Gateway",
      dataIndex: "gateway",
      key: "gateway",
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: (text: string) => (
        <span style={{ color: "#00A3B1", textDecoration: "underline" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Expire date",
      dataIndex: "expireDate",
      key: "expireDate",
    },
  ];

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Credit Logs</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total sales</h3>

              <div className={styles.leftPercentScore}>
                <p>$000</p>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Deactivated Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p style={{ color: "#FF4B4E" }}>754684</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["All", "Completed", "Pending", "Failed"].map((filter) => (
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
    </>
  );
};
export default CreditLogs;
