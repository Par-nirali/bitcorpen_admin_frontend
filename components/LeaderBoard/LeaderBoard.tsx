import React, { useMemo, useState } from "react";
import styles from "./affiliation.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
// import ValidationPopup from "./ValidationPopup";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handle7days = async (requestId: string) => {
    try {
      console.log("Connection removed:", requestId);
      // setSelectedUserId(requestId);
      // setShowRemovePopup(true);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  const handle10days = async (requestId: string) => {
    try {
      console.log("User blocked:", requestId);
      // setSelectedUserId(requestId);
      // setShowBlockPopup(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  const handleMonth = async (requestId: string) => {
    try {
      console.log("User blocked:", requestId);
      // setSelectedUserId(requestId);
      // setShowBlockPopup(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const getDropdownItems = (userId: string): MenuProps["items"] => [
    {
      key: "7days",
      label: "7 Days",
      onClick: () => {
        handle7days(userId);
      },
    },
    {
      key: "10days",
      label: "10 Days",
      onClick: () => {
        handle10days(userId);
      },
    },
    {
      key: "month",
      label: "Month",
      onClick: () => {
        handleMonth(userId);
      },
    },
  ];
  const getValidationItem = (record: any): MenuProps["items"] => [
    {
      key: "givevalidation",
      label: "Give Validation",
      onClick: () => {
        selectedDetails(record);
        setShowPopup(true);
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
      render: (text: any) => (
        <a style={{ color: "#00A3B1", textDecoration: "underline" }}>{text}</a>
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
              status === "Validated"
                ? "#E8F7F7"
                : status === "Under Validation"
                ? "#FFF7E6"
                : "#FFE9E9",
            color:
              status === "Validated"
                ? "#00A3B1"
                : status === "Under Validation"
                ? "#D48806"
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
          {record.status === "Under Validation" ? (
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

  const data = [
    {
      key: "1",
      rank: "000000001",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Validated",
      enrpoints: "50000",
      lastrank: "000000020",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
    },
    {
      key: "2",
      rank: "000000002",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Invalid",
      enrpoints: "50000",
      lastrank: "000000020",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "recruiter",
    },
    {
      key: "3",
      rank: "000000003",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Under Validation",
      enrpoints: "50000",
      lastrank: "000000020",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
    },
    {
      key: "4",
      rank: "000000004",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Fraud",
      enrpoints: "50000",
      lastrank: "000000020",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
    },
  ];

  const filteredData = useMemo(() => {
    if (activeFilter === "All") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Leader Board</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p>21000 Total This Learders</p>
            </div>

            <div className={styles.monthsDropdown}>
              <Dropdown
                menu={{ items: getDropdownItems("") }}
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
                rowKey="key"
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
      {/* {showPopup &&
        createPortal(
          <ValidationPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )} */}
    </>
  );
};

export default LeaderBoard;
