import React, { useState } from "react";
import styles from "./adcontrols.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveAdPopup from "./RemoveAdPopup";
import StatusChangePopup from "./StatusChangePopup";

const adsData = [
  {
    id: 1,
    enid: "ENID5666959",
    adImage: "/adimage.png",
    name: "John Doe",
    position: "CEO",
    title: "Professional",
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
  },
  {
    id: 2,
    enid: "ENID5666959",
    adImage: "/adimage.png",
    name: "Sarah Johnson",
    position: "Founder",
    title: "Professional",
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
  },
  {
    id: 3,
    enid: "ENID5666959",
    adImage: "/adimage.png",
    name: "Michael Brown",
    position: "Product Manager",
    title: "Professional",
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
  },
];

const AdControls = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();
  const [teamMembers, setTeamMembers] = useState(adsData);
  const [activeFilter, setActiveFilter] = useState<any>("All AD's");

  const handleFilterClick = (filter: any) => {
    setActiveFilter(filter);
  };

  const getMoreItems = (ads: any): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        dispatch(selectedDetails(ads));
        dispatch(selectedProjects("addadcontrols"));
      },
    },
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(ads));
        setShowPopup(true);
      },
    },
    {
      key: "status",
      label: ads.status === "Active" ? "Deactivate" : "Activate",
      onClick: () => {
        dispatch(selectedDetails(ads));
        setShowStatusPopup(true);
      },
    },
  ];
  const filteredTeamMembers = teamMembers.filter((members) => {
    if (activeFilter === "All AD's") return true;
    if (activeFilter === "Active AD's") return members.status === "Active";
    if (activeFilter === "Deactivated AD's")
      return members.status === "Deactivated";
    return true;
  });

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Ad Controls</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => {
              dispatch(selectedDetails(""));
              dispatch(selectedProjects("addadcontrols"));
            }}
          >
            Add New AD
          </button>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Totals AD’s</h3>
              <div className={styles.leftPercentScore}>
                <p>500</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active AD’s</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Removed AD’s</h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["All AD's", "Active AD's", "Deactivated AD's"].map((filter) => (
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
                {filteredTeamMembers?.map((ads) => (
                  <div className={styles.candCardMain} key={ads.id}>
                    <div className={styles.cardContainer}>
                      <div className={styles.rankMainDiv}>
                        <div className={styles.rankBadge}>
                          <p>{ads.name}</p>
                        </div>
                        <Dropdown
                          menu={{ items: getMoreItems(ads) }}
                          trigger={["hover"]}
                          placement="bottomRight"
                          // style={{ width: "100%" }}
                        >
                          <div className={styles.rankBadgeMore}>
                            <img src="/icons/more.svg" alt="more" />
                          </div>
                        </Dropdown>
                      </div>
                      <div className={styles.rankAdImg}>
                        <img src="/profile.png" alt="profile" />
                        {/* <img src={subscriber.adImage} alt="profile" /> */}
                      </div>
                      <div className={styles.adsSection}>
                        <div className={styles.adsPointDiv}>
                          <p>AD ID</p>
                          <span>{ads.enid}</span>
                        </div>
                        <div className={styles.adsPointDiv}>
                          <p>AD Type</p>
                          <span>{ads.adType}</span>
                        </div>
                        <div className={styles.adsPointDiv}>
                          <p>AD Link</p>
                          <a>{ads.adUrl}</a>
                        </div>
                        <div className={styles.adsPointDiv}>
                          <p>AD Status</p>
                          <div
                            className={`${styles.statusDiv} ${
                              ads.status === "Active" ? "" : styles.deactivated
                            }
                            }`}
                          >
                            {ads.status}
                          </div>
                        </div>
                      </div>
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
          <RemoveAdPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
      {showStatusPopup &&
        createPortal(
          <StatusChangePopup
            onClose={() => {
              setShowStatusPopup(false);
              setSelectedStatus(undefined);
            }}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default AdControls;
