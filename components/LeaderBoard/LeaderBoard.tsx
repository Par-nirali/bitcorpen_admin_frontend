import React, { useEffect, useMemo, useState } from "react";
import styles from "./leaderboard.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveLeaderPopup from "./RemoveLeaderPopup";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
// import ValidationPopup from "./ValidationPopup";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>("Month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "7days",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("7 Days");
        getAllLeaderBoard("7 Days");
      },
    },
    {
      key: "10days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("10 Days");
        setCurrentFilter("10 Days");
        getAllLeaderBoard("10 Days");
      },
    },
    {
      key: "month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getAllLeaderBoard("Month");
      },
    },
  ];
  const getMoreItem = (record: any): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
  ];

  const getAllLeaderBoard = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/leaderBoard/get?filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });
      const selectAllLeaderboard = response.data;
      if (selectAllLeaderboard && selectAllLeaderboard.data) {
        const formattedData = selectAllLeaderboard.data.map(
          (leader: any, index: number) => ({
            _id: leader._id,
            rank: leader?.globalRank || "-",
            enid: leader?.userId?.ENID || "ENID{NUMBER}",
            userName: leader?.userId?.userName || "-",
            name: `${leader?.userId?.firstName || "Test"} ${
              leader?.userId?.lastName || "User"
            }`.trim(),
            enrpoints: leader?.points?.enrPoints || "-",
            originalData: leader,
          })
        );
        setLeaderboardData(formattedData);
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
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
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
      title: "ENR Points",
      dataIndex: "enrpoints",
      key: "enrpoints",
    },
    {
      title: "Last Rank",
      dataIndex: "lastrank",
      key: "lastrank",
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            // width: "100%",
          }}
        >
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
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllLeaderBoard("Month");
    setDropdownLabel("Month");
    // setCurrentFilter("Month");
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return leaderboardData.slice(startIndex, startIndex + itemsPerPage);
  }, [leaderboardData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Leader Board</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p>{leaderboardData?.length} Total This Learders</p>
            </div>

            <div className={styles.monthsDropdown}>
              <Dropdown
                menu={{ items: getDropdownItems() }}
                trigger={["hover"]}
                placement="bottomRight"
                // style={{ width: "100%" }}
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
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                rowSelection={rowSelection}
                rowKey="key"
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={leaderboardData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={leaderboardData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {showPopup &&
        createPortal(
          <RemoveLeaderPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllLeaderBoard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default LeaderBoard;
