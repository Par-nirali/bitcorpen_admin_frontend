import React, { useMemo, useState } from "react";
import styles from "./affiliation.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import ValidationPopup from "./ValidationPopup";

const Affiliation = () => {
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
  const getValidationItem = (userId: string): MenuProps["items"] => [
    {
      key: "givevalidation",
      label: "Give Validation",
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
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "Validated"
                ? "#00A3B1"
                : status === "Under Validation"
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
              dispatch(selectedProjects("affiliateuserdetail"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
          {record.status === "Under Validation" ? (
            <Dropdown
              menu={{ items: getValidationItem("") }}
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
      status: "Validated",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
    },
    {
      key: "2",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Invalid",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "recruiter",
    },
    {
      key: "3",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Under Validation",
      joinedDate: "Jan, 07, 2025",
      referrallink: "encolunyty/dummy-referral-spam.html",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      subscription: "Influencer",
    },
    {
      key: "4",
      enid: "ENID5666959",
      referralenid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      status: "Fraud",
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
          <p className={styles.tabTitle}>Affiliation</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              {/* <div className={styles.pleftHead}> */}
              <h3>Total Affiliates</h3>
              {/* </div> */}

              <div className={styles.leftPercentScore}>
                {/* <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_target_amount?.toFixed(0) ?? 0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_target_amount ?? 0)

                        .toFixed(0)
                        .toString().length || 0
                    )
                  )}
                </p> */}
                <p>$000</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Under Validation</h3>
              <div className={styles.leftPercentScore}>
                {/* <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${(
                      (departmentdata?.[0]?.total_target_amount ?? 0) -
                      (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                    ).toFixed(0)}`
                  ) : (
                    "*".repeat(
                      (
                        (departmentdata?.[0]?.total_target_amount ?? 0) -
                        (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                      )
                        .toFixed(0)
                        .toString().length || 0
                    )
                  )}
                </p> */}
                <p>7888</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Validated</h3>
              <div className={styles.leftPercentScore}>
                {/* <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_thisMonthRevenue.toFixed(2) ??
                      0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p> */}
                <p>756</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Invalid</h3>
              <div className={styles.leftPercentScore}>
                {/* <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_preMonthRevenue.toFixed(2) ?? 0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_preMonthRevenue ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p> */}
                <p>754684</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* <p>All</p>
              <p>Under Validation</p>
              <p>Validated</p>
              <p>Invalid</p> */}
              {["All", "Under Validation", "Validated", "Invalid"].map(
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
            <div className={styles.inputMainDiv}>
              <p>
                {/* <CiSearch /> */}
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
          <ValidationPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Affiliation;
