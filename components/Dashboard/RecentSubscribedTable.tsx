import React from "react";
import styles from "./dashboard.module.scss";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";

const RecentSubscribed = () => {
  const dispatch = useDispatch();

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
      title: "Plan Expires",
      dataIndex: "planExpires",
      key: "planExpires",
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

export default RecentSubscribed;
