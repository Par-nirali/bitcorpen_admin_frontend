import React, { useMemo, useState } from "react";
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
// import ValidationPopup from "./ValidationPopup";
const ContentModeration = () => {
  const dispatch = useDispatch();
  //   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All content Reported");
  //   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //   };

  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: onSelectChange,
  //   };
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
      title: "Reported",
      dataIndex: "referralenid",
      key: "referralenid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
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
          {record.status === "Under Review" ? (
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

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Resolved",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      key: "2",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Under Review",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "recruiter",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      key: "3",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Under Review",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      key: "4",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Resolved",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    },
  ];

  const filteredData = useMemo(() => {
    if (activeFilter === "All content Reported") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

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
              <h3>Removed</h3>
              <div className={styles.leftPercentScore}>
                <p>754684</p>
                <span className={styles.userTitle}>Reports</span>
              </div>
            </div>
          </div>

          <div className={styles.tableFilterMainDiv}>
            <div className={styles.inputMainDiv}>
              <p>500 Total Reports</p>
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
          <div className={styles.userFilter}>
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
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                // rowSelection={rowSelection}
                // rowKey="key"
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
          <RemoveContentPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
      {showAlertPopup &&
        createPortal(
          <SendContentAlertPopup onClose={() => setShowAlertPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ContentModeration;
