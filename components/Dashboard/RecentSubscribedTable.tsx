import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";

const RecentSubscribed = () => {
  const dispatch = useDispatch();
  const selectRecSubscribedUserData = useSelector(
    (state: any) => state.selectedRecSubscribedUserDetails
  );
  console.log(selectRecSubscribedUserData, "selectRecSubscribedUserData");
  const [showRecSubscribedUser, setShowRecSubscribedUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecentSubscribedUser = async () => {
    // setLoading(false);
    if (selectRecSubscribedUserData && selectRecSubscribedUserData.data) {
      const formattedData = selectRecSubscribedUserData.data.map(
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
          planexpires: new Date(user.expireTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          // joinedThrough: user.userIS || "-",
        })
      );
      setShowRecSubscribedUser(formattedData);
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
      title: "Plan Expires",
      dataIndex: "planexpires",
      key: "planexpires",
      // render: (text: any) =>
      //   text === "ORGANIC"
      //     ? "Organic"
      //     : text === "AD"
      //     ? "Ad"
      //     : text === "AFFILIATES"
      //     ? "Affiliates"
      //     : text,
    },
  ];

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      status: "Actcdive",
      joinedDate: "Jan, 10 2025",
      planExpires: "Ad",
    },
  ];

  useEffect(() => {
    if (selectRecSubscribedUserData) {
      getRecentSubscribedUser();
    }
  }, [selectRecSubscribedUserData]);

  return (
    <>
      <div className={styles.graphTableDiv}>
        <div className={styles.dropdownsSection}>
          <p className={styles.dollarsTitle}>Recent Subscribed</p>
          <button
            className={styles.viewAllBtn}
            onClick={() => dispatch(selectedProjects("recenetallsubscribed"))}
          >
            View All
          </button>
        </div>

        <div className={styles.graphDivtable}>
          {/* {loading ? (
            <Spin size="large" />
          ) : ( */}
          <Table
            bordered={true}
            columns={columns}
            dataSource={showRecSubscribedUser}
            pagination={false}
            className={styles.recentJoinTable}
            loading={showRecSubscribedUser.length === 0}
          />
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default RecentSubscribed;
