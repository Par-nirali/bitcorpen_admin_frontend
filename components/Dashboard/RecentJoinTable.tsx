import React, { useEffect } from "react";
import { Table } from "antd";
import styles from "./dashboard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import axios from "axios";

const RecentJoin = () => {
  const dispatch = useDispatch();

  const getRecentJoinUser = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/recentSubscribedUser`,
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching manager notifications:", error);
    }
  };

  const columns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: () => <p className={styles.enidTag}>ENID5666959</p>,
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
      render: () => <p className={styles.statusTag}>Active</p>,
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
    getRecentJoinUser();
  }, []);

  return (
    <>
      <div className={styles.graphTableDiv}>
        <div className={styles.dropdownsSection}>
          <p className={styles.dollarsTitle}>Recent Subscribed</p>
          <button
            className={styles.viewAllBtn}
            onClick={() => dispatch(selectedProjects("recenetalljoin"))}
          >
            View All
          </button>
        </div>

        <div className={styles.graphDivtable}>
          <Table
            bordered={true}
            columns={columns}
            dataSource={data}
            pagination={false}
            className={styles.recentJoinTable}
          />
        </div>
      </div>
    </>
  );
};

export default RecentJoin;
