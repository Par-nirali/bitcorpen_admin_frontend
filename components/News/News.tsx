import React, { useEffect, useState } from "react";
import styles from "./news.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DeleteNewsPopup from "./DeleteNewsPopup";
import axios from "axios";
import moment from "moment";
import Link from "next/link";

const News = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [newsData, setNewsData] = useState<any>([]);
  const [newsDashboardData, setNewsDashboardData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getNewsDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/dashbord`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setNewsDashboardData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllNewsData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/getAll?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setNewsData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeDifference = (createdAt: any) => {
    const currentTime = moment();
    const imageCreatedTime = moment(createdAt);
    const diffInHours = currentTime.diff(imageCreatedTime, "hours");

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = currentTime.diff(imageCreatedTime, "days");
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    getNewsDashboard();
  }, []);

  useEffect(() => {
    getAllNewsData();
  }, [selectedFilter]);

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
                <p>{newsDashboardData?.totalNews || 0}</p>
                <span className={styles.userTitle}>News</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Latest News</h3>
              <div className={styles.leftPercentScore}>
                <p>{newsDashboardData?.latestTotalNews || 0}</p>
                <span className={styles.userTitle}>News</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* {["All News", "Latest"].map((filter) => (
                <p
                  key={filter}
                  className={activeFilter === filter ? styles.selected : ""}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </p>
              ))} */}
              <p
                className={selectedFilter === "All" ? styles.selected : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All News
              </p>
              <p
                className={selectedFilter === "Latest" ? styles.selected : ""}
                onClick={() => handleFilterSelect("Latest")}
              >
                Latest
              </p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {newsData?.length > 0 ? (
                  newsData?.map((news: any) => (
                    <Link href={`/news/${news._id}`} key={news._id}>
                      <div
                        className={styles.cardContainer}
                        key={news._id}
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
                            <img
                              src={
                                news?.mediaUrl
                                  ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${news?.mediaUrl}`
                                  : "/profile.svg"
                              }
                              alt="profile"
                            />
                            {/* <img src={news?.adImage} alt="profile" /> */}
                          </div>
                          <div className={styles.cardDetailsDiv}>
                            <h4 className={styles.cardTitle}>{news?.title}</h4>
                            <p className={styles.cardSubTitle}>
                              {news?.companyName}{" "}
                              <span>
                                {/* {Math.floor(
                                (new Date().getTime() -
                                  new Date(
                                    news?.createdAt as string
                                  ).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              Days ago */}
                                {getTimeDifference(news?.createdAt)}
                              </span>
                            </p>
                            <p className={styles.cardDesc}>
                              {news?.subTitle}
                              {/* {news?.description?.slice(0, 100)} */}
                            </p>
                          </div>
                        </div>
                        {/* <div> */}
                        <button
                          className={styles.deleteBtn}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(selectedDetails(news));
                            setShowPopup(true);
                          }}
                        >
                          <img src="/icons/delete.svg" alt="delete" /> Delete
                        </button>
                        {/* </div> */}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className={styles.noDataDiv}>
                    <p>No News Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <DeleteNewsPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllNewsData}
            refreshDashboardData={getNewsDashboard}
          />,
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
