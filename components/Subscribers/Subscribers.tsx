import React, { useState } from "react";
import styles from "./subscribers.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import PlanDecisionPopup from "./PlanDecisionPopup";

const subscribersData = [
  {
    id: 1,
    profileImage: "/profile.png",
    name: "John Doe",
    username: "John_Doe",
    accountType: "Professional",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    status: "Active",
    subscriptionDate: "Jan, 08, 2025",
    expiryDate: "Jan, 08, 2026",
    paymentGateway: "Paypal",
  },
  {
    id: 2,
    profileImage: "/profile.png",
    name: "Sarah Johnson",
    username: "Sarah_J",
    accountType: "Professional",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    status: "Deactivated",
    subscriptionDate: "Dec, 15, 2024",
    expiryDate: "Dec, 15, 2025",
    paymentGateway: "Stripe",
  },
  {
    id: 3,
    profileImage: "/profile.png",
    name: "Michael Brown",
    username: "Mike_Brown",
    accountType: "Professional",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    status: "Active",
    subscriptionDate: "Jan, 01, 2025",
    expiryDate: "Jan, 01, 2026",
    paymentGateway: "Paypal",
  },
];

const Subscribers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<any>("All");
  const [subscribers, setSubscribers] = useState(subscribersData);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();

  const handlePlanStatusClick = (status: "Active" | "Deactivated") => {
    setSelectedStatus(status);
    setShowPopup(true);
  };

  const handleFilterClick = (filter: any) => {
    setActiveFilter(filter);
  };

  const filteredSubscribers = subscribers.filter((subscriber) => {
    if (activeFilter === "All") return true;
    return subscriber.status === activeFilter;
  });

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Subscribers, Payment Gateways</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["All", "Active", "Deactivated"].map((filter) => (
                <p
                  key={filter}
                  className={activeFilter === filter ? styles.selected : ""}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </p>
              ))}
            </div>
            <div className={styles.inputMainDiv}>
              <p>{subscribers.length} Subscribers</p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {filteredSubscribers?.map((subscriber) => (
                  <div className={styles.candCardMain} key={subscriber.id}>
                    <div className={styles.cardContainer}>
                      <div className={styles.rankBadge}>
                        <div className={styles.rankProfileImg}>
                          <img src={subscriber.profileImage} alt="profile" />
                        </div>
                        <div className={styles.rankBadgeText}>
                          <p>{subscriber.name}</p>
                          <span>{subscriber.username}</span>
                          <span>{subscriber.accountType}</span>
                        </div>
                      </div>

                      <div className={styles.profileSection}>
                        <p>{subscriber.plan.name}</p>
                        <p>{subscriber.plan.price}</p>
                        <div
                          className={`${styles.statusDiv} ${
                            subscriber.status === "Active"
                              ? ""
                              : styles.deactivated
                          }
                          }`}
                        >
                          {subscriber.status}
                        </div>
                        <p>
                          Plan Subscribed on ({subscriber.subscriptionDate})
                        </p>
                        <p>Plan Expire Date ({subscriber.expiryDate})</p>
                        <p>
                          Payment Gateway:{" "}
                          <span>{subscriber.paymentGateway}</span>
                        </p>
                      </div>
                      <button
                        className={styles.cardBtn}
                        onClick={() =>
                          handlePlanStatusClick(
                            subscriber.status as "Active" | "Deactivated"
                          )
                        }
                      >
                        {subscriber.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <PlanDecisionPopup
            currentStatus={selectedStatus!}
            onClose={() => {
              setShowPopup(false);
              setSelectedStatus(undefined);
            }}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Subscribers;
