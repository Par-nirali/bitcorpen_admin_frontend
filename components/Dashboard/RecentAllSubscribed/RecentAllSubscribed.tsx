import React from "react";
import styles from "./recentallsubscribed.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../../redux/actions";
import { Table } from "antd";

const RecentAllSubscribed = ({
  setSelectedProject,
  warningpopup,
  setWarningPopup,
  errorpopup,
  setErrorPopup,
  stopwarninpopup,
  setStopWarningpopup,
}: any) => {
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

  return (
    <div className={styles.pSubRightDiv}>
      <button
        className={styles.backMainDiv}
        // onClick={() => setSelectedProject("sales projects")}
        onClick={() => dispatch(selectedProjects("dashboard"))}
      >
        {/* <div className={styles.backArrow}> */}
        <img src="/icons/back.svg" alt="back" />
        {/* </div> */}
        <p>Recent Subscribed </p>
      </button>

      {/* <div className={styles.pHeadingDiv}>
          <h3>Add Project</h3>
        </div> */}

      <div className={styles.dashboardScroll}>
        <div className={styles.pScoreDiv}>
          <div className={styles.pScoreLeftinnerDiv}>
            {/* <div className={styles.pleftHead}> */}
            <h3>Organic Joiners</h3>
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
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Joined Through AD</h3>
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
              <p>999</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Affiliate Joiners</h3>
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
              <p>8758</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>
        </div>
        <div className={styles.graphTableDiv}>
          {/* <div className={styles.dropdownsSection}>
              <p className={styles.dollarsTitle}>Recent Subscribed</p>
              <button
                className={styles.viewAllBtn}
                onClick={() => dispatch(selectedProjects("recenetalljoin"))}
              >
                View All
              </button>
            </div> */}

          <div className={styles.graphDivtable}>
            <Table
              bordered={true}
              // border={"1px solid #000"}
              columns={columns}
              dataSource={data}
              pagination={false}
              className={styles.recentJoinTable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAllSubscribed;
