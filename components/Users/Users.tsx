import React, { useState } from "react";
import styles from "./users.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import UpdateUserPopup from "./UpdateUserPopup";

interface ModifyPopupProps {
  setModifyPopup: (show: boolean) => void;
  setShowSuccessModify: (show: boolean) => void;
  setCurrentView: React.Dispatch<any>;
}

const Users = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const columns = [
    {
      title: "Nos.",
      dataIndex: "index",
      width: 80,
      render: (_: any, __: any, index: number) => `#${index + 1}`,
    },
    // {
    //   title: "",
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   render: () => <input type="checkbox" />,
    // },
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: () => (
        <img
          src="/profile.png"
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
      ),
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            backgroundColor: status === "Active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "Active" ? "#00A3B1" : "#FF4D4F",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a onClick={() => setShowPopup(true)} className={styles.editIcon}>
            <img src="/icons/edit.svg" alt="edit" />
          </a>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("userdetails"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
    },
    {
      key: "2",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
    },
    {
      key: "3",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Deactivated",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
    },
    // ... Add more rows as needed
  ];
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Users</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Users Joined</h3>

              <div className={styles.leftPercentScore}>
                <p>$000</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Users</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Users </h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Suspended </h3>
              <div className={styles.leftPercentScore}>
                <p>754684</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p>All Users</p>
              <p>Active Users</p>
              <p>Inactive Users</p>
              <p>Suspended Users</p>
            </div>
            <div
              className={styles.inputMainDiv}
              // style={{
              //   display:
              //     selectedproject === "ceo dashboard" ||
              //     selectedproject === "ceoempreview" ||
              //     selectedproject === "ceoempprojects"
              //       ? ""
              //       : "none",
              // }}
            >
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
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.dropdownsSection}>
              <p className={styles.dollarsTitle}>Users Details</p>
              <div className={styles.editUserDiv}>
                <p>Edit Multiple</p>
                <a className={styles.editIcon}>
                  <img src={"/icons/edit.svg"} alt="edit" />
                </a>
              </div>
            </div>

            <div className={styles.graphDivtable}>
              <Table
                rowSelection={rowSelection}
                rowKey="key"
                bordered={true}
                columns={columns}
                dataSource={data}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <UpdateUserPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Users;
