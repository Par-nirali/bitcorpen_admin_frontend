import React, { useState } from "react";
import styles from "./team.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
// import PlanDecisionPopup from "./PlanDecisionPopup";

const teamData = [
  {
    id: 1,
    profileImage: "/profile.png",
    name: "John Doe",
    position: "CEO",
    accountType: "Professional",
    email: "john@gmail.com",
    phone: "+1 3656 5566 55",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    platforms: ["Facebook", "Instagram", "Twitter"],
    status: "Active",
    subscriptionDate: "Jan, 08, 2025",
    expiryDate: "Jan, 08, 2026",
    paymentGateway: "Paypal",
  },
  {
    id: 2,
    profileImage: "/profile.png",
    name: "Sarah Johnson",
    position: "Founder",
    accountType: "Professional",
    email: "sarah@gmail.com",
    phone: "+1 3656 5566 55",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    platforms: ["Facebook", "Instagram", "Twitter"],
    status: "Deactivated",
    subscriptionDate: "Dec, 15, 2024",
    expiryDate: "Dec, 15, 2025",
    paymentGateway: "Stripe",
  },
  {
    id: 3,
    profileImage: "/profile.png",
    name: "Michael Brown",
    position: "Product Manager",
    accountType: "Professional",
    email: "michel@gmail.com",
    phone: "+1 3656 5566 55",
    plan: {
      name: "Professional Plan",
      price: "$24.99 / Month",
    },
    platforms: ["Facebook", "Instagram", "Twitter"],
    status: "Active",
    subscriptionDate: "Jan, 01, 2025",
    expiryDate: "Jan, 01, 2026",
    paymentGateway: "Paypal",
  },
];
const Team = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<any>("All");
  const [teamMembers, setTeamMembers] = useState(teamData);
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

  const filteredTeamMembers = teamMembers.filter((members) => {
    if (activeFilter === "All") return true;
    return members.status === activeFilter;
  });
  const getMoreItems = (userId: string): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        setShowPopup(true);
      },
    },
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        setShowPopup(true);
      },
    },
  ];

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Team</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.inputMainDiv}>
              <p>{teamMembers.length} Subscribers</p>
            </div>
            <div className={styles.userFilter}>
              <p>Add Member</p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {filteredTeamMembers?.map((subscriber) => (
                  <div className={styles.candCardMain} key={subscriber.id}>
                    <div className={styles.cardContainer}>
                      <div className={styles.rankMianDiv}>
                        <div className={styles.rankBadge}>
                          <div className={styles.rankProfileImg}>
                            <img src={subscriber.profileImage} alt="profile" />
                          </div>
                          <div className={styles.rankBadgeText}>
                            <p>{subscriber.name}</p>
                            <span>{subscriber.position}</span>
                            {/* <span>{subscriber.accountType}</span> */}
                          </div>
                        </div>
                        <Dropdown
                          menu={{ items: getMoreItems("") }}
                          trigger={["hover"]}
                          placement="bottomRight"
                          // style={{ width: "100%" }}
                        >
                          <div className={styles.rankBadgeMore}>
                            <img src="/icons/more.svg" alt="more" />
                          </div>
                        </Dropdown>
                      </div>

                      <div className={styles.profileSection}>
                        <p>{subscriber.email}</p>
                        <p>{subscriber.phone}</p>
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
                        {subscriber.platforms.map((platform, index) => (
                          <p key={index}>{platform}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {showPopup &&
          createPortal(
            <PlanDecisionPopup
              currentStatus={selectedStatus!}
              onClose={() => {
                setShowPopup(false);
                setSelectedStatus(undefined);
              }}
            />,
            document.getElementById("modals")!
          )} */}
    </>
  );
};

export default Team;
