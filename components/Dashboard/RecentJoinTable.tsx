import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import styles from "./dashboard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProjects,
  selectedRecSubscribedUserDetails,
} from "../redux/actions";
import axios from "axios";

const RecentJoin = () => {
  const dispatch = useDispatch();
  const selectRecJoinUserData = useSelector(
    (state: any) => state.selectedRecJoinUserDetails
  );
  const selectedproject = useSelector((state: any) => state.selectedproject);
  console.log(selectRecJoinUserData, "selectRecJoinUserData");
  const [showRecJoinUser, setShowRecJoinUser] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("selectedproject", selectedproject);
  const getRecentJoinUser = async () => {
    if (selectRecJoinUserData && selectRecJoinUserData.recentJoined) {
      const formattedData = selectRecJoinUserData.recentJoined.map(
        (user: any, index: number) => ({
          key: user._id || index.toString(),
          enid: user.ENID || "ENID{NUMBER}",
          userName: user.userName || "-",
          name: `${user.firstName || "Test"} ${user.lastName || "User"}`.trim(),
          plan: user.userType || "-",
          status: user.status || "-",
          joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          joinedThrough: user.userIS || "-",
        })
      );
      setShowRecJoinUser(formattedData);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <p className={styles.enidTag}>{text}</p>,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <p className={styles.statusTag}>
          {text === "active" ? "Active" : text}
        </p>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Joined Through ",
      dataIndex: "joinedThrough",
      key: "joinedThrough",
      render: (text: any) =>
        text === "ORGANIC"
          ? "Organic"
          : text === "AD"
          ? "Ad"
          : text === "AFFILIATES"
          ? "Affiliates"
          : text,
    },
  ];

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      status: "Active",
      joinedDate: "Jan, 10 2025",
      joinedThrough: "Ad",
    },
  ];

  useEffect(() => {
    if (selectRecJoinUserData) {
      getRecentJoinUser();
    }
  }, [selectRecJoinUserData]);

  return (
    <>
      <div className={styles.graphTableDiv}>
        <div className={styles.dropdownsSection}>
          <p className={styles.dollarsTitle}>Recent Join</p>
          <button
            className={styles.viewAllBtn}
            onClick={() => {
              dispatch(selectedRecSubscribedUserDetails(selectRecJoinUserData));
              dispatch(selectedProjects("recenetalljoin"));
            }}
          >
            View All
          </button>
        </div>

        <div className={styles.graphDivtable}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table
              bordered={true}
              columns={columns}
              dataSource={showRecJoinUser}
              pagination={false}
              className={styles.recentJoinTable}
              loading={showRecJoinUser.length === 0}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecentJoin;
