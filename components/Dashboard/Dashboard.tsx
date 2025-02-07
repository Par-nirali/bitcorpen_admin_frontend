import React, { useState, useEffect, useRef } from "react";
import styles from "./dashboard.module.scss";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
// import DatePicker from "react-datepicker";
import { Console } from "console";
// import useCloseOnClickOutside from "../../../hooks/useCloseOnClickOutside";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { selectedProjects } from "../../redux/actions";
// import { addYears } from "date-fns";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiDownload, FiCheck } from "react-icons/fi";
import * as XLSX from "xlsx";
import RecentJoin from "./RecentJoinTable";
import RecentSubscribed from "./RecentSubscribedTable";
import { ConfigProvider } from "antd";
// import NotificationHandler from "../../NotificationInbox/NotificationInbox";

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
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>("");
  const [ceodepartments, setCeoDepartments] = useState<any>([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [departmentdata, setDepartmentData] = useState<any>([]);
  const [yearlygraph, setYearlyGraph] = useState([]);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [thismonthrevenue, setThismonthrevenue] = useState("");
  const [prevmonthrevenue, setPrevmonthrevenue] = useState("");

  const [loading, setLoading] = useState(true);
  const [showValue, setShowValue] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);
  const [selectedview, setSelectedView] = useState("table");
  const timerRef: any = useRef(null);
  const closeDropDown = useRef<HTMLDivElement>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
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

  const togglePasswordVisibility = () => {
    if (showValue) {
      setShowValue(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      setShowValue(true);
      timerRef.current = setTimeout(() => {
        setShowValue(false);
      }, 10000);
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
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("prsuserData") || "{}"
        );
        setUserDetail(userData);
      }
    };

    fetchUserData();
  }, []);

  const today = new Date();

  const datePickerRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const options = [
    { value: "staticValue1", label: "Static Label 1" },
    { value: "staticValue2", label: "Static Label 2" },
    { value: "staticValue3", label: "Static Label 3" },
  ];

  const handleOptionClick = (option: any) => {
    if (option.departmentName === "All") {
      setSelectedOption("All");
      setSelectedStatus("All");
    } else {
      setSelectedOption(option._id);
      setSelectedStatus(option.departmentName);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const ceoDepartments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/department/getDepartment`
        );
        setCeoDepartments(res.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    ceoDepartments();
  }, [userDetail]);

  useEffect(() => {
    if (ceodepartments.length > 0) {
      setSelectedOption(ceodepartments[0]._id);
      setSelectedStatus(ceodepartments[0].departmentName);
    }
  }, [ceodepartments]);

  useEffect(() => {
    const getDepartmentData = async () => {
      let tkn = localStorage.getItem("auth-token");
      setLoading(true);

      const selectedMonth = selectedDate
        ? selectedDate.getMonth() + 1
        : new Date().getMonth() + 1;
      const selectedYear = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      let data;

      if (selectedOption === "All") {
        data = {
          month: selectedMonth,
          year: selectedYear,
        };
      } else {
        data = {
          month: selectedMonth,
          year: selectedYear,
          departmentId: selectedOption,
        };
      }

      if (selectedOption) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/sales/getTotalSales`,
            data,
            {
              headers: {
                Authorization: `Bearer ${tkn}`,
              },
            }
          );
          setDepartmentData(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    };
    getDepartmentData();
  }, [selectedOption, selectedDate]);

  useEffect(() => {
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

    const emptyGraphData = monthNames.map((month) => ({
      name: month,
      thismonthrevenue: 0,
      prevmonthrevenue: 0,
      totalsales: 0,
    }));

    setGraphData(emptyGraphData);

    const getYearlyGraph = async () => {
      const tkn = localStorage.getItem("auth-token");
      const selectedYear = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();

      const data =
        selectedOption === "All"
          ? { year: selectedYear }
          : { year: selectedYear, departmentId: selectedOption };

      if (selectedOption) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/sales/getYearlySales`,
            data,
            {
              headers: { Authorization: `Bearer ${tkn}` },
            }
          );

          if (res.data && res.data.length > 0) {
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

            const initialGraphData = monthNames.map((month) => ({
              name: month,
              thisMonthRevenue: 0,
              prevMonthRevenue: 0,
              totalSales: 0,
            }));

            res.data.forEach((monthData: any) => {
              const monthIndex = monthData.month - 1;
              if (monthIndex >= 0 && monthIndex < 12) {
                initialGraphData[monthIndex] = {
                  name: monthNames[monthIndex],
                  thisMonthRevenue: parseFloat(
                    monthData.total_thisMonthRevenue
                  ),
                  prevMonthRevenue: parseFloat(monthData.total_preMonthRevenue),
                  totalSales:
                    parseFloat(monthData.total_thisMonthRevenue) +
                    parseFloat(monthData.total_preMonthRevenue),
                };
              }
            });

            const processedData = initialGraphData.map((item) => ({
              name: item.name,
              totalsales: item.totalSales,
              thismonthrevenue: item.thisMonthRevenue,
              prevmonthrevenue: item.prevMonthRevenue,
            }));

            setGraphData(processedData);
            setYearlyData(res.data);

            const latestMonth = res.data.reduce((latest: any, current: any) =>
              current.month > latest.month ? current : latest
            );
            setPrevmonthrevenue(latestMonth.total_preMonthRevenue);
            setThismonthrevenue(latestMonth.total_thisMonthRevenue);
          } else {
            console.log("no data found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getYearlyGraph();
  }, [selectedOption, selectedDate]);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      yearlyData.map((item: any) => ({
        Month: item.month,
        Target: item.total_target_amount,
        "Remaining Targets": `${
          (item?.total_target_amount ?? 0) - (item?.total_thisMonthRevenue ?? 0)
        }`,
        "Revenue Received": item.total_thisMonthRevenue || "0",
        "Revenue Received (Remaining)": item.total_preMonthRevenue || "0",
        "Sales (So Far)": item.total_Sales || "0",
      }))
    );

    XLSX.utils.book_append_sheet(wb, ws, "Dashboard Data");

    XLSX.writeFile(wb, "dashboard_data.xlsx");
    setIsDownloaded(true);
    setTimeout(() => {
      setIsDownloaded(false);
    }, 3000);
  };

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
