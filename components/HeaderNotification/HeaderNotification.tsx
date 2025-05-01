import React, { useEffect, useState } from "react";
import styles from "./headernotification.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import axios from "axios";
import { getSocket } from "../Login/Login";
import { log } from "console";

const HeaderNotification = () => {
  const dispatch = useDispatch();
  const socket = getSocket();
  const [showPopup, setShowPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState<any>("All");
  const [loading, setLoading] = useState(true);
  const [headNotifData, setHeadNotifData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  console.log("socket--------", socket);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getHeadNotificationData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/notification/get`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setHeadNotifData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const initializeNotifications = async () => {
  //     console.log("socketiiiii", socket);

  //     if (socket) {
  //       socket.on("notification", (data: any) => {
  //         console.log(data, "data");
  //       });
  //     }
  //   };
  //   initializeNotifications();
  // }, []);

  const handleNewNotification = async (message: string) => {
    console.log("messageupside", message);
    const newNotification = {
      id: Date.now().toString(),
      message,
      timestamp: Date.now(),
      read: false,
      type: "DEFAULT",
    };
    // await notificationDB.saveNotification(newNotification);
    setHeadNotifData((prev: any) => [newNotification, ...prev]);
    // dispatch(setNotificationStatus(true));
    console.log("messagedown", message);
    // toast.info(message || "New notification received", {
    //   position: "top-right",
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // });
  };

  const handleReadNotification = async (notificationId: any) => {
    console.log("notificationId", socket);
    if (socket) {
      socket.emit("read-notification", { notificationId });
      console.log("notificationIdffffffffffffffff", notificationId);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("notification", (message: any) => {
        console.log("message", message);
        handleNewNotification(message);
      });

      // return () => {
      //   socket.off("notification");
      // };
    }
  }, [socket]);

  const filteredNotifications = headNotifData?.filter((item: any) => {
    if (selectedFilter === "All") {
      return true;
    } else if (selectedFilter === "Read") {
      return item.isRead === true;
    } else if (selectedFilter === "Un Read") {
      return item.isRead === false;
    }
    return true;
  });

  useEffect(() => {
    getHeadNotificationData();
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Notifications</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.selected : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p>
              <p
                className={selectedFilter === "Un Read" ? styles.selected : ""}
                onClick={() => handleFilterSelect("Un Read")}
              >
                Un Read
              </p>
              <p
                className={selectedFilter === "Read" ? styles.selected : ""}
                onClick={() => handleFilterSelect("Read")}
              >
                Read
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>{filteredNotifications?.length} Questions</p>
            </div>
          </div>
          <div
            className={styles.graphUserTableDiv}
            // onClick={() => dispatch(selectedProjects("issuehelpdetails"))}
          >
            <div className={styles.questionsContainer}>
              {filteredNotifications?.length > 0 ? (
                filteredNotifications?.map((item: any) => (
                  <div
                    key={item._id}
                    className={`
                ${styles.questionItem} ${
                      item?.isRead ? "" : styles.unresolvedQueItem
                    }`}
                    onClick={() => {
                      dispatch(selectedDetails(item));
                      dispatch(selectedProjects("headernotifhelpdetail"));
                      handleReadNotification(item._id);
                    }}
                  >
                    <div className={styles.questionContent}>
                      {item?.isRead ? (
                        <div
                          className={styles.userDot}
                          style={{ backgroundColor: "transparent" }}
                        ></div>
                      ) : (
                        <div className={styles.userDot}></div>
                      )}
                      <div className={styles.userInfo}>
                        <span className={styles.username}>
                          {item?.title || "title"}
                        </span>
                        <div className={styles.questionText}>
                          {item?.message}
                        </div>
                        <div className={styles.date}>
                          {item?.createdAt
                            ? new Date(item?.createdAt)
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")
                            : "DD-MM-YYYY"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`${styles.status} ${
                        item?.isRead ? "" : styles.unresolvedStatus
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.noData}>No Data Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNotification;
