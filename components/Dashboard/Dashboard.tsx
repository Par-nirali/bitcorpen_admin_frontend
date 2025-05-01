import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./dashboard.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as XLSX from "xlsx";
import RecentJoin from "./RecentJoinTable";
import RecentSubscribed from "./RecentSubscribedTable";
import axios from "axios";
import {
  selectedDetails,
  selectedRecJoinUserDetails,
  selectedRecSubscribedUserDetails,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

const CustomTooltip = ({
  active,
  payload,
  label,
  coordinate,
  selectedDate,
}: any) => {
  if (active && payload && payload.length) {
    const selectedYear = selectedDate.getFullYear();
    const month = payload[0].payload.name;

    const thisMonthRevenue =
      payload[0].payload.thismonthrevenue?.toFixed(2) || "0.00";
    const prevMonthRevenue =
      payload[0].payload.prevmonthrevenue?.toFixed(2) || "0.00";
    const totalSales = payload[0].payload.totalsales?.toFixed(2) || "0.00";

    const isNearRightEdge = coordinate.x > window.innerWidth - 350;

    return (
      <div
        style={{
          backgroundColor: "#000",
          padding: "10px",
          borderRadius: "8px",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          fontSize: "13px",
          lineHeight: "1.5",
          position: "absolute",
          left: isNearRightEdge
            ? `${coordinate.x - 70}px`
            : `${coordinate.x}px`,
          top: `${coordinate.y - 60}px`,
          transform: "translateX(-50%)",
          width: "180px",
          zIndex: 10,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          display: thisMonthRevenue == 0 ? "none" : "",
        }}
      >
        <p
          style={{
            margin: "0 0 5px",
            fontWeight: "bold",
            borderBottom: "1px solid #333",
            paddingBottom: "5px",
          }}
        >
          {month} {selectedYear}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <TooltipRow
            color="#037BD6"
            label="This Month"
            value={thisMonthRevenue}
          />
          <TooltipRow
            color="#0C8CE9"
            label="Previous Month"
            value={prevMonthRevenue}
          />
          <TooltipRow color="#76B0F1" label="Total Sales" value={totalSales} />
        </div>
      </div>
    );
  }
  return null;
};
const TooltipRow = ({ color, label, value }: any) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: color,
          borderRadius: "50%",
          marginRight: "5px",
        }}
      />
      <span>{label}:</span>
    </div>
    <span>${value}</span>
  </div>
);

const CustomCursor = ({ points, payload }: any) => {
  if (!points || points.length === 0 || !payload || payload.length === 0) {
    return null;
  }

  const thisMonthRevenue = payload[0]?.payload?.thismonthrevenue || 0;

  if (thisMonthRevenue === 0) {
    return null;
  }

  return (
    <line
      x1={points[0].x}
      y1={0}
      x2={points[0].x}
      y2={400}
      stroke="#BBE2FF"
      strokeWidth={2}
      strokeDasharray="5 5"
    />
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<any>("");
  const [adminGraphData, setAdminGraphData] = useState<any[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const timerRef: any = useRef(null);
  const closeDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
      }
    };

    fetchUserData();
  }, []);

  const getAdminData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/admin`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "week",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("week");
        getDashboradGraph("week");
      },
    },
    {
      key: "month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("month");
        getDashboradGraph("month");
      },
    },
  ];

  const getDashboradGraph = async (filter: string) => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/graphOfUser?filter=${filter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(`graph response of ${filter}`, response.data.data);
      // setAdminGraphData(response.data.data);

      if (filter === "month") {
        const transformedData = response.data.data.map((item: any) => ({
          name: item.month.substring(0, 3),
          value: item.count,
        }));
        setAdminGraphData(transformedData);
      } else if (filter === "week") {
        const transformedData = response.data.data.map((item: any) => ({
          name: item.day.substring(0, 3),
          value: item.count,
        }));
        setAdminGraphData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const getRecentUser = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const joinedResponse = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/recentJoinedUser`,
        headers: { Authorization: `${token}` },
      });
      dispatch(selectedRecJoinUserDetails(joinedResponse.data.data));

      const subscribedResponse = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/recentsubscribeduser`,
        headers: { Authorization: `${token}` },
      });
      dispatch(selectedRecSubscribedUserDetails(subscribedResponse.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        closeDropDown.current &&
        !closeDropDown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getRecentUser();
    getAdminData();
    getDashboradGraph("month");
    setDropdownLabel("Month");
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Dashboard</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Users Joined</h3>

              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Users</h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalActiveUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Users </h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalInactiveUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Partners Collaborated </h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalPartnerCollaborator}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total sales</h3>
              <div className={styles.leftPercentScore}>
                <p>${adminData?.totalSales}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Subscribers </h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalSubscribers}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalActiveSubscribers}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliate Joiners</h3>
              <div className={styles.leftPercentScore}>
                <p>{adminData?.totalAffilatesUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.graphMainDiv}>
            <div className={styles.graphSectionMain}>
              <div className={styles.dropdownsSection}>
                <p className={styles.dollarsTitle}>Users Overview</p>

                <div className={styles.monthsDropdown}>
                  <Dropdown
                    menu={{ items: getDropdownItems() }}
                    trigger={["hover"]}
                    placement="bottomRight"
                    // style={{ width: "100%" }}
                  >
                    <div className={styles.dollarsLabel}>
                      <p>{dropdownLabel}</p>
                      <div className={styles.dropdownArrow}>
                        <img
                          src="/icons/dashdownarrow.svg"
                          alt="dropdownarrow"
                        />
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </div>

              <div className={styles.graphDiv}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adminGraphData}>
                    <CartesianGrid strokeDasharray=" 0 0" strokeWidth={1.24} />
                    <XAxis
                      axisLine={{ stroke: "#ccc" }}
                      stroke="#000"
                      // dataKey="month"
                      dataKey="name"
                      tick={{
                        fill: "#7F7E7E",
                        fontFamily: "Inter",
                        fontSize: 15,
                        fontWeight: 400,
                        textAnchor: "middle",
                        fontStyle: "normal",
                      }}
                      tickSize={7.4}
                      tickMargin={10}
                    />
                    <YAxis
                      axisLine={{ stroke: "#ccc" }}
                      stroke="#000"
                      // tickFormatter={(value) => `${value}`}
                      tick={{
                        fill: "#008774",
                        fontFamily: "Inter",
                        fontSize: 15,
                        fontWeight: 400,
                        textAnchor: "end",
                        fontStyle: "normal",
                      }}
                      tickSize={7.4}
                      tickMargin={7}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `${value}`,
                        currentFilter === "month"
                          ? "Users per Month"
                          : "Users per Day",
                      ]}
                    />
                    {/* <Tooltip formatter={(value) => [`$${value}`, "Value"]} /> */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22761F"
                      strokeWidth={1.24}
                      dot={{ fill: "#fff", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={styles.graphMonthsDiv}>
              {currentFilter === "month"
                ? adminGraphData?.map((item: any, index: number) => (
                    <p key={index}>
                      {item.name}- {item.value}
                    </p>
                  ))
                : adminGraphData?.map((item: any, index: number) => (
                    <p key={index}>
                      {item.name}- {item.value}
                    </p>
                  ))}
            </div>
          </div>

          <RecentJoin />

          <RecentSubscribed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
