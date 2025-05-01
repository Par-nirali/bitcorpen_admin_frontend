import React, { useEffect, useMemo, useState } from "react";
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
import axios from "axios";
import SuspendFlagUserPopup from "./SuspendFlagUserPopup";
import Pagination from "../Pagination/Pagination";

const FlagUser = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuspendPopup, setShowSuspendPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [flagUserDashboard, setFlagUserDashboard] = useState<any>("");
  const [flagUserData, setFlagUserData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

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
        setShowSuspendPopup(true);
      },
    },
  ];

  const getFlagUserDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/flagged/getTotal`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setFlagUserDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllFlagUser = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/flagged/getUser?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      const selectAllContentMod = response.data;

      if (selectAllContentMod && selectAllContentMod.data) {
        const formattedData = selectAllContentMod.data.map(
          (content: any, index: number) => ({
            _id: content._id || index.toString(),
            enid: content?.postId?.userId?.ENID || "ENID{NUMBER}",
            userName: content?.postId?.userId?.userName || "-",
            name: `${content?.postId?.userId?.firstName || "Test"} ${
              content?.postId?.userId?.lastName || "User"
            }`.trim(),
            reportedTimes: content?.postId?.reportCount || "-",
            status: content?.status || "-",
            reportedEnIds: content?.userId?.map((user: any) => user.ENID) || [],
            message: content?.reason || "-",
            originalData: content,
          })
        );
        setFlagUserData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const filteredData = useMemo(() => {
  //   if (activeFilter === "All Flagged Users") return data;
  //   return data.filter((item) => item.status === activeFilter);
  // }, [activeFilter]);

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
              {enid} {index === enids.length - 1 ? "" : "| "}
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
                : status === "under_review"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "Resolved"
                ? "#00A3B1"
                : status === "under_review"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status === "resolved"
            ? "Resolved"
            : status === "under_review"
            ? "Under review"
            : "Suspended"}
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
          {record.status === "under_review" ? (
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

  useEffect(() => {
    getFlagUserDashboard();
  }, []);

  useEffect(() => {
    getAllFlagUser();
  }, [selectedFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return flagUserData.slice(startIndex, startIndex + itemsPerPage);
  }, [flagUserData, currentPage, itemsPerPage]);

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
                <p>{flagUserDashboard?.totalFlagged}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Under Review</h3>
              <div className={styles.leftPercentScore}>
                <p>{flagUserDashboard?.totalUnderReviewFlagged}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Resolved</h3>
              <div className={styles.leftPercentScore}>
                <p>{flagUserDashboard?.totalResolvedFlagged}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Suspended Users</h3>
              <div className={styles.leftPercentScore}>
                <p>{flagUserDashboard?.totalSuspendedFlagged}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* {[
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
              ))} */}
              <p
                className={selectedFilter === "All" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All Flagged Users
              </p>
              <p
                className={
                  selectedFilter === "resolved" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("resolved")}
              >
                Resolved
              </p>
              <p
                className={
                  selectedFilter === "under_review" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("under_review")}
              >
                Under Review
              </p>
              <p
                className={
                  selectedFilter === "suspended" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("suspended")}
              >
                Suspended
              </p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                columns={columns}
                dataSource={flagUserData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={flagUserData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {showPopup &&
        createPortal(
          <RemoveFlagUserPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllFlagUser}
            refreshDashData={getFlagUserDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showSuspendPopup &&
        createPortal(
          <SuspendFlagUserPopup
            onClose={() => setShowSuspendPopup(false)}
            refreshData={getAllFlagUser}
            refreshDashData={getFlagUserDashboard}
          />,
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
