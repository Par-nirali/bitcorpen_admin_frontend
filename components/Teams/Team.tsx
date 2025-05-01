import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveTeamMemPopup from "./RemoveTeamMemPopup";
import axios from "axios";
import Link from "next/link";
// import PlanDecisionPopup from "./PlanDecisionPopup";

const Team = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<any>("All");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();
  const [allTeamData, setAllTeamData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllTeamData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/team/AllMember`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setAllTeamData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreItems = (member: any): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        dispatch(selectedDetails(member));
        dispatch(selectedProjects("addmember"));
      },
    },
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(member));
        setShowPopup(true);
      },
    },
  ];

  useEffect(() => {
    getAllTeamData();
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Team</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.inputMainDiv}>
              <p>{allTeamData.length} Subscribers</p>
            </div>
            <div
              className={styles.userFilter}
              onClick={() => {
                dispatch(selectedDetails(""));
                dispatch(selectedProjects("addmember"));
              }}
            >
              <p>Add Member</p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {allTeamData?.map((member) => (
                  <div className={styles.candCardMain} key={member.id}>
                    <div className={styles.cardContainer}>
                      <div className={styles.rankMianDiv}>
                        <div className={styles.rankBadge}>
                          <div className={styles.rankProfileImg}>
                            <img
                              src={
                                member?.profileUrl
                                  ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${member?.profileUrl}`
                                  : "/profile.svg"
                              }
                              alt="profile"
                            />
                          </div>
                          <div className={styles.rankBadgeText}>
                            <p>
                              {member?.firstName} {member?.lastName}
                            </p>
                            <span>{member?.role}</span>
                            {/* <span>{member.accountType}</span> */}
                          </div>
                        </div>
                        <Dropdown
                          menu={{ items: getMoreItems(member) }}
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
                        <p>{member?.email}</p>
                        <p>{member?.phone}</p>
                        <div
                          className={`${styles.statusDiv} ${
                            member?.status === "active"
                              ? ""
                              : styles.deactivated
                          }
                            }`}
                        >
                          {member.status}
                        </div>
                        {/* {member?.socialMedia?.length > 0 ? (
                          member?.socialMedia?.map(
                            (platform: any, index: number) => (
                              <p key={index}>{platform}</p>
                            )
                          )
                        ) : (
                          <p>No platforms</p>
                        )} */}
                        {member?.facebookUrl && (
                          <Link href={member?.facebookUrl}>
                            <a target="_blank">
                              <p>{member?.facebookUrl}</p>
                            </a>
                          </Link>
                        )}
                        {member?.twitterUrl && (
                          <Link href={member?.twitterUrl}>
                            <a target="_blank">
                              <p>{member?.twitterUrl}</p>
                            </a>
                          </Link>
                        )}
                        {member?.instagramUrl && (
                          <Link href={member?.instagramUrl}>
                            <a target="_blank">
                              <p>{member?.instagramUrl}</p>
                            </a>
                          </Link>
                        )}
                        {member?.linkedinUrl && (
                          <Link href={member?.linkedinUrl}>
                            <a target="_blank">
                              <p>{member?.linkedinUrl}</p>
                            </a>
                          </Link>
                        )}
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
          <RemoveTeamMemPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllTeamData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Team;
