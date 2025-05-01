import React, { useEffect, useState } from "react";
import styles from "./subscribers.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import PlanDecisionPopup from "./PlanDecisionPopup";
import axios from "axios";

const Subscribers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [subscribers, setSubscribers] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handlePlanStatusClick = (subscriber: any) => {
    // setSelectedStatus(status);
    dispatch(selectedDetails(subscriber));
    setShowPopup(true);
  };

  const [loading, setLoading] = useState(true);

  const getAllSubscribers = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subscription/All?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setSubscribers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    getAllSubscribers();
  }, [selectedFilter]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Subscribers, Payment Gateways</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* {["All", "Active", "Deactivated"].map((filter) => (
                <p
                  key={filter}
                  className={activeFilter === filter ? styles.selected : ""}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </p>
              ))} */}
              <p
                className={selectedFilter === "all" ? styles.selected : ""}
                onClick={() => handleFilterSelect("all")}
              >
                All
              </p>
              <p
                className={selectedFilter === "active" ? styles.selected : ""}
                onClick={() => handleFilterSelect("active")}
              >
                Active
              </p>
              <p
                className={selectedFilter === "inactive" ? styles.selected : ""}
                onClick={() => handleFilterSelect("inactive")}
              >
                Inactivated
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>{subscribers.length} Subscribers</p>
            </div>
          </div>
          {loading ? (
            <div className={styles.loadingContainer}>
              Loading subscribers...
            </div>
          ) : (
            <div className={styles.graphUserTableDiv}>
              <div className={styles.candMainDiv}>
                <div className={styles.cardsGrid}>
                  {subscribers.length > 0 ? (
                    subscribers?.map((subscriber: any) => (
                      <div className={styles.candCardMain} key={subscriber._id}>
                        <div className={styles.cardContainer}>
                          <div className={styles.rankBadge}>
                            <div className={styles.rankProfileImg}>
                              <img
                                src={
                                  subscriber?.userId?.profileImage
                                    ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${subscriber?.userId?.profileImage?.url}`
                                    : "/profile.png"
                                }
                                alt="profile"
                              />
                            </div>
                            <div className={styles.rankBadgeText}>
                              <p>
                                {subscriber?.userId?.firstName}{" "}
                                {subscriber?.userId?.lastName}
                              </p>
                              <span>{subscriber?.userId?.userName}</span>
                              <span>{subscriber?.subscriptionType}</span>
                            </div>
                          </div>

                          <div className={styles.profileSection}>
                            <p>{subscriber?.subscriptionType} plan</p>
                            <p>{subscriber?.price}</p>
                            <div
                              className={`${styles.statusDiv} ${
                                subscriber?.isDeactive ? styles.deactivated : ""
                              }
                          }`}
                            >
                              {subscriber?.isDeactive
                                ? "Deactivated"
                                : "Active"}
                            </div>
                            <p>
                              Plan Subscribed on (
                              {formatDate(subscriber?.updatedAt)})
                            </p>
                            <p>
                              Plan Expire Date (
                              {formatDate(subscriber?.expiredTime)})
                            </p>
                            <p>
                              Payment Gateway: <span>stripe</span>
                              {/* <span>{subscriber?.paymentGateway}</span> */}
                            </p>
                          </div>
                          <button
                            className={styles.cardBtn}
                            onClick={() => handlePlanStatusClick(subscriber)}
                          >
                            {subscriber?.isDeactive ? "Activate" : "Inactivate"}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noSubscribersMessage}>
                      No subscribers found for the selected filter.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showPopup &&
        createPortal(
          <PlanDecisionPopup
            refreshData={getAllSubscribers}
            onClose={() => {
              setShowPopup(false);
            }}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Subscribers;
