import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import styles from "./articles.module.scss";
import DeleteArticlePopup from "./DeleteArticlePopup";

const Articles = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [articlesData, setArticlesData] = useState<any>([]);
  const [articlesDashboardData, setArticlesDashboardData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getArticlesDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/article/dashboard`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setArticlesDashboardData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllArticlesData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/article/getAll?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setArticlesData(response.data.data);
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
    getArticlesDashboard();
  }, []);

  useEffect(() => {
    getAllArticlesData();
  }, [selectedFilter]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Articles</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Published Articles </h3>
              <div className={styles.leftPercentScore}>
                <p>{articlesDashboardData?.totalArticles || 0}</p>
                <span className={styles.userTitle}>Articles</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Latest Articles</h3>
              <div className={styles.leftPercentScore}>
                <p>{articlesDashboardData?.totalLatestArticles || 0}</p>
                <span className={styles.userTitle}>Articles</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.selected : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All Articles
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
                {articlesData?.length > 0 ? (
                  articlesData?.map((article: any) => (
                    // <Link
                    //   href={`/articles?id=${article._id}`}
                    //   key={article._id}
                    // >
                    <Link href={`/articles/${article._id}`} key={article._id}>
                      <div className={styles.cardContainer} key={article._id}>
                        <div
                          className={styles.cardUpDiv}
                          onClick={() => {
                            dispatch(selectedDetails(article));
                            dispatch(selectedProjects("article_details"));
                          }}
                        >
                          <div className={styles.rankAdImg}>
                            <img
                              src={
                                article?.mediaUrl
                                  ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${article?.mediaUrl}`
                                  : "/profile.svg"
                              }
                              alt="profile"
                            />
                          </div>
                          <div className={styles.cardDetailsDiv}>
                            <h4 className={styles.cardTitle}>
                              {article?.title}
                            </h4>
                            <p className={styles.cardSubTitle}>
                              {article?.companyName}{" "}
                              <span>
                                {" "}
                                {getTimeDifference(article?.createdAt)}
                              </span>
                            </p>
                            <p className={styles.cardDesc}>
                              {article?.description?.slice(0, 100)}
                            </p>
                          </div>
                        </div>

                        <button
                          className={styles.deleteBtn}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(selectedDetails(article));
                            setShowPopup(true);
                          }}
                        >
                          <img src="/icons/delete.svg" alt="delete" /> Delete
                        </button>
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
          <DeleteArticlePopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllArticlesData}
            refreshDashboardData={getArticlesDashboard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Articles;
