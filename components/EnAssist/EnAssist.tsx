import React, { useMemo, useState } from "react";
import styles from "./enassist.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import ShowAssistDetails from "./ShowAssistDetails";

const EnAssist = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState("On Going");
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleTimeDuration = async (requestId: string) => {
    try {
      console.log("Connection removed:", requestId);
      // setSelectedUserId(requestId);
      // setShowRemovePopup(true);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  const getDropdownItems = (userId: string): MenuProps["items"] => [
    {
      key: "7days",
      label: "7 Days",
      onClick: () => {
        handleTimeDuration(userId);
      },
    },
    {
      key: "10days",
      label: "10 Days",
      onClick: () => {
        handleTimeDuration(userId);
      },
    },
    {
      key: "month",
      label: "Month",
      onClick: () => {
        handleTimeDuration(userId);
      },
    },
  ];
  const getMoreItem = (userId: string): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
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
      title: "Questions",
      dataIndex: "question",
      key: "question",
      width: 600,
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
            backgroundColor: status === "Resolved" ? "#E8F7F7" : "#FFF7E6",
            color: status === "Resolved" ? "#00A3B1" : "#968612",
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
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {record.status === "Resolved" ? (
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
          {record.status === "On Going" ? (
            <Dropdown
              menu={{ items: getMoreItem("") }}
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
    {
      title: "Question Count",
      dataIndex: "quecount",
      key: "quecount",
      render: (_: any, record: any, count: number) => (
        <p
          className={styles.countDiv}
          onClick={() => {
            dispatch(selectedDetails(record));
            setShowPopup(true);
          }}
        >{`0${count} Question`}</p>
      ),
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: 600,
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
            backgroundColor: "#FFF7E6",
            color: "#968612",
          }}
        >
          {status}
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
        >{`0${count} Answer`}</p>
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
      quecount: 1,
      anscount: 2,
      question: "Lorem Ipsu book?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lopublishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      key: "2",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Re Questioned",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "recruiter",
      quecount: 1,
      anscount: 2,
      question: "Lorem Ipsum isk?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has be",
    },
    {
      key: "3",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "On Going",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
      quecount: 1,
      anscount: 2,
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
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
          <p className={styles.tabTitle}>EN Assist</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>On Going</h3>
              <div className={styles.leftPercentScore}>
                <p>000</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Resolved</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Re Questioned</h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
                <span className={styles.userTitle}>Assists</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["On Going", "Resolved", "Re Questioned"].map((filter) => (
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
            <div className={styles.inputMainDiv}>
              <p>
                <img src={"/icons/searchnormal.svg"} alt="search" />
              </p>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="Search Here"
                  //   value={empsearch}
                  //   onChange={handleempSearchChange}
                />
              </div>
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
                columns={
                  activeFilter === "Re Questioned"
                    ? reQuestionedColumns
                    : columns
                }
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
          <ShowAssistDetails onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default EnAssist;
