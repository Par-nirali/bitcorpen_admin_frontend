import React, { useEffect, useMemo, useState } from "react";
import styles from "./creditlogs.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const CreditLogs = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [creditLogsDashboard, setCreditLogsDashboard] = useState<any>("");
  const [creditLogData, setCreditLogData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const getCreditLogsDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subscription/AllCredits`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setCreditLogsDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCreditLogsAll = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subscription/AllUser?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      if (response.data && response.data.data) {
        const formattedData = response.data.data.map(
          (credits: any, index: number) => ({
            key: credits._id || index.toString(),
            enid: credits.userId?.ENID || "ENID{NUMBER}",
            userName: credits.userId?.userName || "-",
            name: `${credits.userId?.firstName || "Test"} ${
              credits.userId?.lastName || "User"
            }`.trim(),
            plan: credits.subscriptionType || "-",
            price: credits.price || "-",
            status: credits.status || "-",
            invoice: credits.invoice || "-",
            joinedDate: new Date(credits.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            expireDate: credits?.expiredTime
              ? new Date(credits?.expiredTime).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-",
            originalData: credits,
          })
        );
        setCreditLogData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      // width: 100,
      render: (status: string) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor:
              status === "active"
                ? "#E8F7F7"
                : status === "incomplete"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "active"
                ? "#00A3B1"
                : status === "incomplete"
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
      width: 380,
      render: (text: string) => (
        <a
          style={{
            color: "#00A3B1",
            textDecoration: "underline",
            wordBreak: "break-all",
          }}
          href={text}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
      // width: 120,
    },
    {
      title: "Expire date",
      dataIndex: "expireDate",
      key: "expireDate",
      // width: 120,
    },
  ];

  useEffect(() => {
    getCreditLogsDashboard();
  }, []);

  useEffect(() => {
    getCreditLogsAll();
  }, [selectedFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return creditLogData.slice(startIndex, startIndex + itemsPerPage);
  }, [creditLogData, currentPage, itemsPerPage]);

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
                <p>${creditLogsDashboard?.totalSale?.toFixed(2)}</p>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>{creditLogsDashboard?.totalUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>{creditLogsDashboard?.totalActiveSubscriber}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Deactivated Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p style={{ color: "#FF4B4E" }}>
                  {creditLogsDashboard?.totalDeactiveSubscriber}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p>
              <p
                className={
                  selectedFilter === "Active" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("Active")}
              >
                Active
              </p>
              <p
                className={
                  selectedFilter === "Pending" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("Pending")}
              >
                Pending
              </p>
              <p
                className={
                  selectedFilter === "Failed" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("Failed")}
              >
                Failed
              </p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={creditLogData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={creditLogData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </>
  );
};
export default CreditLogs;
