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

const CustomTooltip = ({
  active,
  payload,
  label,
  coordinate,
  selectedDate,
}: any) => {
  if (active && payload && payload.length) {
    const selectedYear = selectedDate.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

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
  const [userDetail, setUserDetail] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [departmentdata, setDepartmentData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showValue, setShowValue] = useState(false);
  const [showRecUser, setShowRecUser] = useState([]);
  const timerRef: any = useRef(null);
  const closeDropDown = useRef<HTMLDivElement>(null);
  const data = [
    { month: "Mar", value: 0 },
    { month: "Apr", value: 5 },
    { month: "May", value: 8 },
    { month: "Jun", value: 10 },
    { month: "Jul", value: 15 },
    { month: "Aug", value: 20 },
    { month: "Sep", value: 15 },
    { month: "Oct", value: 10 },
    { month: "Nov", value: 20 },
    { month: "Dec", value: 40 },
  ];

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

  const getRecentJoinUser = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/dashboard/recentSubscribedUser`,
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("Recent Subscribed User:", response.data);
      // setShowRecUser(response.data);
      if (
        response.data &&
        response.data.success &&
        response.data.data.recentJoined
      ) {
        const formattedData = response.data.data.recentJoined.map(
          (user: any, index: number) => ({
            key: user._id || index.toString(),
            enid: user.ENID || "ENID{NUMBER}",
            userName: user.userName || "",
            name: `${user.firstName || "Test"} ${
              user.lastName || "User"
            }`.trim(),
            plan: user.userType || "",
            status: user.status || "",
            joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            joinedThrough: user.userIS || "",
          })
        );
        setShowRecUser(formattedData);
      }
    } catch (error) {
      console.error("Error fetching manager notifications:", error);
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
    getRecentJoinUser();
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        {/* <NotificationHandler  /> */}
        {/* <NotificationHandler selectedOption={selectedOption} /> */}

        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Dashboard</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              {/* <div className={styles.pleftHead}> */}
              <h3>Total Users Joined</h3>
              {/* </div> */}

              <div className={styles.leftPercentScore}>
                {/* <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_target_amount?.toFixed(0) ?? 0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_target_amount ?? 0)

                        .toFixed(0)
                        .toString().length || 0
                    )
                  )}
                </p> */}
                <p>$000</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Users</h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${(
                      (departmentdata?.[0]?.total_target_amount ?? 0) -
                      (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                    ).toFixed(0)}`
                  ) : (
                    "*".repeat(
                      (
                        (departmentdata?.[0]?.total_target_amount ?? 0) -
                        (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                      )
                        .toFixed(0)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Users </h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_thisMonthRevenue.toFixed(2) ??
                      0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_thisMonthRevenue ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Partners Collaborated </h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${
                      departmentdata?.[0]?.total_preMonthRevenue.toFixed(2) ?? 0
                    }`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_preMonthRevenue ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total sales</h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${departmentdata?.[0]?.total_Sales.toFixed(2) ?? 0}`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_Sales ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Subscribers </h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${departmentdata?.[0]?.total_Sales.toFixed(2) ?? 0}`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_Sales ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Subscribers</h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${departmentdata?.[0]?.total_Sales.toFixed(2) ?? 0}`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_Sales ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliate Joiners</h3>
              <div className={styles.leftPercentScore}>
                <p>
                  $
                  {loading ? (
                    <>
                      <Skeleton
                        height={20}
                        width={100}
                        className={styles.skelMargin}
                      />
                    </>
                  ) : showValue ? (
                    `${departmentdata?.[0]?.total_Sales.toFixed(2) ?? 0}`
                  ) : (
                    "*".repeat(
                      (departmentdata?.[0]?.total_Sales ?? 0)
                        .toFixed(2)
                        .toString().length || 0
                    )
                  )}
                </p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.graphMainDiv}>
            <div className={styles.graphSectionMain}>
              <div className={styles.dropdownsSection}>
                {/* <div className={styles.amountsDropdown}> */}
                {/* <div className={styles.dollarsLabel}> */}
                <p className={styles.dollarsTitle}>Users Overview</p>
                {/* <div className={styles.dropdownArrow}>
                    <img src="/icons/dashddarrow.svg" alt="dropdownarrow" />
                  </div> */}
                {/* </div> */}
                {/* </div> */}

                <div className={styles.monthsDropdown}>
                  <div className={styles.dollarsLabel}>
                    <p>Month</p>
                    <div className={styles.dropdownArrow}>
                      <img src="/icons/dashdownarrow.svg" alt="dropdownarrow" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.graphDiv}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray=" 0 0" strokeWidth={1.24} />
                    <XAxis
                      axisLine={{ stroke: "#ccc" }}
                      stroke="#000"
                      dataKey="month"
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
                      tickFormatter={(value) => `$${value}`}
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
                    <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
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
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
              <p>Jan- 400</p>
            </div>
          </div>
          {/* <div className={styles.graphMainDiv}> */}

          <RecentJoin />
          {/* </div> */}
          <RecentSubscribed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
