import React, { useState } from "react";
import styles from "./news.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DeleteNewsPopup from "./DeleteNewsPopup";
// import RemoveAdPopup from "./RemoveAdPopup";
// import StatusChangePopup from "./StatusChangePopup";

const adsData = [
  {
    id: 1,
    enid: "ENID5666959",
    adImage: "/newsimg.png",
    name: "John Doe",
    position: "CEO",
    title: "How to Build a Strong Professional Network in 2024",
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
    adType: "Banner",
    adUrl: "encolunyty/dummy-referral-spam.html",
    time: "2 days ago",
    companyName: "Bitcorpon LLC",
    description:
      "Professionals seeking jobs that align with their passions and financial goals find a refreshing alternative here. ",
  },
  {
    id: 2,
    enid: "ENID5666959",
    adImage: "/newsimg.png",
    name: "Sarah Johnson",
    position: "Founder",
    title: "How to Build a Strong Professional Network in 2024",
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
    adType: "Stripe",
    adUrl: "encolunyty/dummy-referral-spam.html",
    time: "5 minutes ago",
    companyName: "Bitcorpon LLC",
    description:
      "With their passions and financial goals find a refreshing alternative here. ",
  },
  {
    id: 3,
    enid: "ENID5666959",
    adImage: "/newsimg.png",
    name: "Michael Brown",
    position: "Product Manager",
    title: "How to Build a Strong Professional Network in 2024",
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
    adType: "Paypal",
    adUrl: "encolunyty/dummy-referral-spam.html",
    time: "1 day ago",
    companyName: "Bitcorpon LLC",
    description: "Professionals seeking jobs that align with their passions.",
  },
  {
    id: 4,
    enid: "ENID5666959",
    adImage: "/newsimg.png",
    name: "Michael Brown",
    position: "Product Manager",
    title: "How to Build a Strong Professional Network in 2024",
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
    adType: "Paypal",
    adUrl: "encolunyty/dummy-referral-spam.html",
    time: "1 day ago",
    companyName: "Bitcorpon LLC",
    description: "Professionals seeking jobs that align with their passions.",
  },
];
const News = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();
  const [teamMembers, setTeamMembers] = useState(adsData);
  const [activeFilter, setActiveFilter] = useState<any>("All News");

  const handleFilterClick = (filter: any) => {
    setActiveFilter(filter);
  };

  const filteredTeamMembers = teamMembers.filter((members) => {
    if (activeFilter === "All News") return true;
    if (activeFilter === "Latest") return members.status === "Active";
    return true;
  });

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>News</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => {
              dispatch(selectedDetails(""));
              dispatch(selectedProjects("writenews"));
            }}
          >
            Add New
          </button>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total News Published</h3>
              <div className={styles.leftPercentScore}>
                <p>50</p>
                <span className={styles.userTitle}>News</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Latest News</h3>
              <div className={styles.leftPercentScore}>
                <p>88</p>
                <span className={styles.userTitle}>News</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["All News", "Latest"].map((filter) => (
                <p
                  key={filter}
                  className={activeFilter === filter ? styles.selected : ""}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {filteredTeamMembers?.map((news) => (
                  <div
                    className={styles.cardContainer}
                    key={news.id}
                    // onClick={() => {
                    //   dispatch(selectedDetails(news));
                    //   dispatch(selectedProjects("news_details"));
                    // }}
                  >
                    <div
                      className={styles.cardUpDiv}
                      onClick={() => {
                        dispatch(selectedDetails(news));
                        dispatch(selectedProjects("news_details"));
                      }}
                    >
                      <div className={styles.rankAdImg}>
                        <img src="/newsimg.png" alt="profile" />
                        {/* <img src={news?.adImage} alt="profile" /> */}
                      </div>
                      <div className={styles.cardDetailsDiv}>
                        <h4 className={styles.cardTitle}>{news?.title}</h4>
                        <p className={styles.cardSubTitle}>
                          {news?.companyName} <span>{news?.time}</span>
                        </p>
                        <p className={styles.cardDesc}>{news?.description}</p>
                      </div>
                    </div>
                    {/* <div> */}
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        dispatch(selectedDetails(news));
                        setShowPopup(true);
                      }}
                    >
                      <img src="/icons/delete.svg" alt="delete" /> Delete
                    </button>
                    {/* </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <DeleteNewsPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
      {/*  {showStatusPopup &&
          createPortal(
            <StatusChangePopup
              onClose={() => {
                setShowStatusPopup(false);
                setSelectedStatus(undefined);
              }}
            />,
            document.getElementById("modals")!
          )} */}
    </>
  );
};

export default News;
