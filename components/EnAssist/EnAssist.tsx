import React, { useEffect, useMemo, useState } from "react";
import styles from "./enassist.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import ShowAssistDetails from "./ShowAssistDetails";
import axios from "axios";
import { get } from "lodash";
import RemoveAssistPopup from "./RemoveAssistPopup";
import Pagination from "../Pagination/Pagination";

const EnAssist = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [scoreData, setScoreData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [enassistTableData, setEnAssistTableData] = useState<any>("");
  const [activeFilter, setActiveFilter] = useState("On Going");
  const [currentFilter, setCurrentFilter] = useState<string>("Month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const [selectedFilter, setSelectedFilter] = useState("On Going");
  const searchColumns = useMemo(() => ["userName", "question"], []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const search = (restaurant: Record<string, any>) => {
    return searchColumns.some((column) => {
      return (
        get(restaurant, column, "")
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1
      );
    });
  };
  const getEnAssistHeadData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/ENAssist/get`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setScoreData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEnAssistTableData = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        // url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/ENAssist/getAll`,
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/ENAssist/getAll?filter=${selectedFilter}&filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      // setEnAssistTableData(response.data.data);
      const selectAllEnAssistData = response.data;
      if (selectAllEnAssistData && selectAllEnAssistData.data) {
        const formattedData = selectAllEnAssistData.data
          .filter(search)
          .map((enassist: any, index: number) => ({
            _id: enassist._id || index.toString(),
            enid: enassist.userId.ENID || "ENID{NUMBER}",
            userName: enassist.userId.userName || "-",
            name: `${enassist.userId.firstName || "Test"} ${
              enassist.userId.lastName || "User"
            }`.trim(),
            question: enassist.question || "-",
            anscount: enassist.answere.length || 0,
            // quecount: enassist.questionCount || 0,
            status: enassist.status || "-",
            originalData: enassist,
          }));
        setEnAssistTableData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "7 Days",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("7 Days");
        getEnAssistTableData("7 Days");
      },
    },
    {
      key: "10 Days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("10 Days");
        getEnAssistTableData("10 Days");
      },
    },
    {
      key: "Month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getEnAssistTableData("Month");
      },
    },
  ];

  const getMoreItem = (record: any): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowRemovePopup(true);
      },
    },
  ];

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
      title: "Questions",
      dataIndex: "question",
      key: "question",
      width: 500,
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
              status === "RESOLVED"
                ? "#E8F7F7"
                : status === "PENDING"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "RESOLVED"
                ? "#00A3B1"
                : status === "PENDING"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status === "RESOLVED"
            ? "Resolved"
            : status === "PENDING"
            ? "On Going"
            : "Re Questioned"}
        </span>
      ),
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {record.status === "RESOLVED" ? (
            <a
              onClick={() => {
                dispatch(selectedDetails(record));
                setShowPopup(true);
              }}
              className={styles.eyeIcon}
            >
              <img src="/icons/eye.svg" alt="eye" />
            </a>
          ) : (
            ""
          )}
          {record.status === "PENDING" ? (
            <Dropdown
              menu={{ items: getMoreItem(record) }}
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

  const reQuestionedColumns = [
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
    // {
    //   title: "Question Count",
    //   dataIndex: "quecount",
    //   key: "quecount",
    //   render: (_: any, record: any, count: number) => (
    //     <p
    //       className={styles.countDiv}
    //       onClick={() => {
    //         dispatch(selectedDetails(record));
    //         setShowPopup(true);
    //       }}
    //     >{`0${count} Question`}</p>
    //   ),
    // },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: 450,
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
              status === "RESOLVED"
                ? "#E8F7F7"
                : status === "PENDING"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "RESOLVED"
                ? "#00A3B1"
                : status === "PENDING"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status === "RESOLVED"
            ? "Resolved"
            : status === "PENDING"
            ? "On Going"
            : "Invalid"}
        </span>
      ),
    },
    {
      title: "Answer Count",
      dataIndex: "anscount",
      key: "anscount",
      render: (_: any, record: any, count: number) => (
        <p
          className={styles.countDiv}
          onClick={() => {
            dispatch(selectedDetails(record));
            setShowPopup(true);
          }}
        >{`0${record.anscount} Answer`}</p>
      ),
    },
  ];

  useEffect(() => {
    getEnAssistHeadData();
  }, []);

  useEffect(() => {
    getEnAssistTableData("Month");
  }, [selectedFilter, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return enassistTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [enassistTableData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>EN Assist</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>On Going</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalPendingENAssist || 0}</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Resolved</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalResolvedENAssist || 0}</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Re Questioned</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalReQuestionENAssist || 0}</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* {["On Going", "Resolved", "Re Questioned"].map((filter) => (
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
              {/* <p
                className={selectedFilter === "All" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p> */}
              <p
                className={
                  selectedFilter === "On Going" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("On Going")}
              >
                On Going
              </p>
              <p
                className={
                  selectedFilter === "RESOLVED" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("RESOLVED")}
              >
                Resolved
              </p>
              <p
                className={
                  selectedFilter === "Re-Questioned" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("Re-Questioned")}
              >
                Re Questioned
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>
                <img src={"/icons/searchnormal.svg"} alt="search" />
              </p>
              <div className={styles.inputDiv}>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Here"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.monthsDropdown}>
              <Dropdown
                menu={{ items: getDropdownItems() }}
                trigger={["hover"]}
                placement="bottomRight"
                // style={{ width: "100%" }}
              >
                <div className={styles.dollarsLabel}>
                  <p>Month</p>
                  <div className={styles.dropdownArrow}>
                    <img src="/icons/dashdownarrow.svg" alt="dropdownarrow" />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                rowSelection={rowSelection}
                rowKey="_id"
                bordered={true}
                columns={
                  selectedFilter === "Re-Questioned"
                    ? reQuestionedColumns
                    : columns
                }
                dataSource={paginatedData}
                // dataSource={enassistTableData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={enassistTableData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {showPopup &&
        createPortal(
          <ShowAssistDetails
            onClose={() => setShowPopup(false)}
            refreshData={getEnAssistTableData}
            refreshDashData={getEnAssistHeadData}
          />,
          document.getElementById("modals")!
        )}
      {showRemovePopup &&
        createPortal(
          <RemoveAssistPopup
            onClose={() => setShowRemovePopup(false)}
            refreshData={getEnAssistTableData}
            refreshDashData={getEnAssistHeadData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default EnAssist;
