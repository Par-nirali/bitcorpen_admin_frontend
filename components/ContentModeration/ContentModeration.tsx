import React, { useEffect, useMemo, useState } from "react";
import styles from "./contentmoderation.module.scss";
import { message, Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveContentPopup from "./RemoveContentPopup";
import SendContentAlertPopup from "./SendContentAlertPopup";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const ContentModeration = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All content Reported");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [contentDashboard, setContentDashboard] = useState<any>("");
  const [contentModData, setContentModData] = useState<any[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("Month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "7 Days",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("7 Days");
        getAllContentMod("7 Days");
      },
    },
    {
      key: "10 Days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("10 Days");
        setCurrentFilter("10 Days");
        getAllContentMod("10 Days");
      },
    },
    {
      key: "Month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getAllContentMod("Month");
      },
    },
  ];

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
  ];

  const getContentDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/content-moderation/getTotalUser`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setContentDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllContentMod = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/content-moderation/getReporteddetail?filter=${selectedFilter}&filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });
      const selectAllContentMod = response.data;
      if (selectAllContentMod && selectAllContentMod.data) {
        const formattedData = selectAllContentMod.data.map(
          (content: any, index: number) => ({
            _id: content._id || index.toString(),
            enid: content?.postId
              ? content?.postId?.userId?.ENID
              : content?.messageId
              ? content?.messageId?.userId?.ENID
              : "ENID{NUMBER}",
            // enid: content?.ENID || "ENID{NUMBER}",
            userName: content?.reportedBy?.userName || "-",
            name: `${content?.reportedBy?.firstName || "Test"} ${
              content?.reportedBy?.lastName || "User"
            }`.trim(),
            status: content?.status || "-",
            reportedUserENId: content?.postId
              ? content?.postId?.userId?.ENID
              : content?.messageId
              ? content?.messageId?.userId?.ENID
              : content?.reportedUserId
              ? content?.reportedUserId?.ENID
              : "-",
            message: content?.reason || "-",
            originalData: content,
          })
        );
        setContentModData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor:
              status === "resolved"
                ? "#E8F7F7"
                : status === "under_review"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "resolved"
                ? "#00A3B1"
                : status === "under_review"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Reporte BY",
      dataIndex: "reportedUserENId",
      key: "reportedUserENId",
      render: (text: any, record: any) => (
        <>
          <span style={{ color: "#00A3B1" }}>{text}</span>
          <br />
          <span>
            {record?.originalData?.postId
              ? "Post Report"
              : record?.originalData?.messageId
              ? "Message Report"
              : record?.originalData?.reportedUserId
              ? "User Report"
              : ""}
          </span>
        </>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 350,
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

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  useEffect(() => {
    getContentDashboard();
  }, []);

  useEffect(() => {
    getAllContentMod("Month");
    setDropdownLabel("Month");
  }, [selectedFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return contentModData.slice(startIndex, startIndex + itemsPerPage);
  }, [contentModData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Content Moderation</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Users Reported</h3>
              <div className={styles.leftPercentScore}>
                <p>{contentDashboard?.totalReported}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Under Review</h3>
              <div className={styles.leftPercentScore}>
                <p>{contentDashboard?.totalUnderReviewReported}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Resolved</h3>
              <div className={styles.leftPercentScore}>
                <p>{contentDashboard?.totalResolvedReported}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Removed</h3>
              <div className={styles.leftPercentScore}>
                <p>{contentDashboard?.totalRemovedReported}</p>
                <span className={styles.userTitle}>Reports</span>
              </div>
            </div>
          </div>

          <div className={styles.tableFilterMainDiv}>
            <div className={styles.inputMainDiv}>
              <p>{contentDashboard?.totalReported} Total Reports</p>
            </div>
            <div className={styles.monthsDropdown}>
              <Dropdown
                menu={{ items: getDropdownItems() }}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <div className={styles.dollarsLabel}>
                  <p>{dropdownLabel}</p>
                  <div className={styles.dropdownArrow}>
                    <img src="/icons/dashdownarrow.svg" alt="dropdownarrow" />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          {/* <div className={styles.userFilter}>
            {["All content Reported", "Under Review", "Resolved"].map(
              (filter) => (
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
              )
            )}
          </div> */}
          <div className={styles.userFilter}>
            <p
              className={selectedFilter === "All" ? styles.activeFilter : ""}
              onClick={() => handleFilterSelect("All")}
            >
              All content Reported
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
                selectedFilter === "resolved" ? styles.activeFilter : ""
              }
              onClick={() => handleFilterSelect("resolved")}
            >
              Resolved
            </p>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                // rowSelection={rowSelection}
                // rowKey="key"
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={contentModData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={contentModData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {showPopup &&
        createPortal(
          <RemoveContentPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllContentMod}
            refreshDashData={getContentDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showAlertPopup &&
        createPortal(
          <SendContentAlertPopup
            onClose={() => setShowAlertPopup(false)}
            refreshData={getAllContentMod}
            refreshDashData={getContentDashboard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ContentModeration;
