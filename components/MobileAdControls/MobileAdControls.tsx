import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import styles from "./adcontrols.module.scss";
import RemoveAdPopup from "./MobileRemoveAdPopup";
import StatusChangePopup from "./MobileStatusChangePopup";

const MobileAdControls = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [adData, setAdData] = useState<any[]>([]);
  const [adDashboard, setAdDashboard] = useState<any>("");
  const [loading, setLoading] = useState(true);

  const handleFilterSelect = (filter: any) => {
    setSelectedFilter(filter);
  };

  const getMoreItems = (ads: any): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        dispatch(selectedDetails(ads));
        dispatch(selectedProjects("mobileaddadcontrols"));
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
      label: ads.adStatus === "active" ? "Deactivate" : "Activate",
      onClick: () => {
        dispatch(selectedDetails(ads));
        setShowStatusPopup(true);
      },
    },
  ];
  const getADsDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/getTotal-ad`,
        headers: { Authorization: `${token}` },
      });

      setAdDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getADsDashboard();
  }, []);

  const getAllADs = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/get-ad?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      setAdData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllADs();
  }, [selectedFilter]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Mobile Ad Controls</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => {
              dispatch(selectedDetails(""));
              dispatch(selectedProjects("mobileaddadcontrols"));
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
                <p>{adDashboard?.totalAdControls || 0}</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active AD’s</h3>
              <div className={styles.leftPercentScore}>
                <p>{adDashboard?.totalActiveAdControls || 0}</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive AD’s</h3>
              <div className={styles.leftPercentScore}>
                <p>{adDashboard?.totalInactiveAdControls || 0}</p>
                <span className={styles.userTitle}>AD&apos;s</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.selected : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All AD&apos;s
              </p>
              <p
                className={selectedFilter === "active" ? styles.selected : ""}
                onClick={() => handleFilterSelect("active")}
              >
                Active AD&apos;s
              </p>
              <p
                className={selectedFilter === "inactive" ? styles.selected : ""}
                onClick={() => handleFilterSelect("inactive")}
              >
                Inactivate AD&apos;s
              </p>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.candMainDiv}>
              <div className={styles.cardsGrid}>
                {adData?.length > 0 ? (
                  adData?.map((ads, index) => (
                    <div className={styles.candCardMain} key={ads.id}>
                      <div className={styles.cardContainer}>
                        <div className={styles.rankMainDiv}>
                          <div className={styles.rankBadge}>
                            <p>{ads.adTitle}</p>
                          </div>
                          <Dropdown
                            menu={{ items: getMoreItems(ads) }}
                            trigger={["hover"]}
                            placement="bottomRight"
                          >
                            <div className={styles.rankBadgeMore}>
                              <img src="/icons/more.svg" alt="more" />
                            </div>
                          </Dropdown>
                        </div>
                        <div className={styles.rankAdImg}>
                          <img
                            src={
                              ads?.adImageUrl
                                ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${ads?.adImageUrl}`
                                : "/profile.png"
                            }
                            alt="profile"
                          />
                        </div>
                        <div className={styles.adsSection}>
                          {/* <div className={styles.adsPointDiv}>
                            <p>AD Number</p>
                            <span>{ads?.adID}</span>
                          </div> */}
                          <div className={styles.adsPointDiv}>
                            <p>AD Type</p>
                            <span>{ads?.adType}</span>
                          </div>
                          <div className={styles.adsPointDiv}>
                            <p>Android AD</p>
                            {/* <a>{ads?.adUrl}</a> */}
                          </div>
                          <div className={styles.adsPointDiv}>
                            <p>AD Status</p>
                            <div
                              className={`${styles.statusDiv} ${
                                ads?.adStatus === "active"
                                  ? ""
                                  : styles.deactivated
                              }
                            }`}
                            >
                              {ads?.adStatus === "active"
                                ? "Active"
                                : "Inactive"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noData}>
                    <p>No data found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <RemoveAdPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllADs}
            refreshDashData={getADsDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showStatusPopup &&
        createPortal(
          <StatusChangePopup
            onClose={() => {
              setShowStatusPopup(false);
            }}
            refreshData={getAllADs}
            refreshDashData={getADsDashboard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default MobileAdControls;
