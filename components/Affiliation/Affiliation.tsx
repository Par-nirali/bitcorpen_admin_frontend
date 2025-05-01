import React, { useEffect, useMemo, useState } from "react";
import styles from "./affiliation.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import ValidationPopup from "./ValidationPopup";
import axios from "axios";
import { get } from "lodash";
import Pagination from "../Pagination/Pagination";

const Affiliation = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [scoreData, setScoreData] = useState<any>("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [affiliateTableData, setAffiliateTableData] = useState<any>("");
  const [currentFilter, setCurrentFilter] = useState<string>("Month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const [loading, setLoading] = useState(true);
  const searchColumns = useMemo(() => ["userName", "status"], []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const search = (restaurant: Record<string, any>) => {
    return searchColumns.some((column) => {
      return (
        get(restaurant, column, "")
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1
      );
    });
  };

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "7 Days",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("7 Days");
        getAffiliateTableData("7 Days");
      },
    },
    {
      key: "10 Days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("10 Days");
        getAffiliateTableData("10 Days");
      },
    },
    {
      key: "Month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getAffiliateTableData("Month");
      },
    },
  ];

  const getAffiliateHeadData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/affiliate/getAllTotal`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setScoreData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAffiliateTableData = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/affiliate/getUser?filter=${selectedFilter}&filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      // setAffiliateTableData(response.data.data);
      const selectAllAffiliateData = response.data;
      if (selectAllAffiliateData && selectAllAffiliateData.data) {
        const formattedData = selectAllAffiliateData.data
          .filter(search)
          .map((affiliate: any, index: number) => ({
            _id: affiliate._id || index.toString(),
            enid: affiliate.ENID || "ENID{NUMBER}",
            userName: affiliate.userName || "-",
            name: `${affiliate.firstName || "Test"} ${
              affiliate.lastName || "User"
            }`.trim(),
            joinedDate: new Date(affiliate.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            referralenid: affiliate.refferalBy.ENID || "-",
            referrallink: affiliate.refferalBy.refferalLink || "-",
            status: affiliate.validation || "-",
            originalData: affiliate,
          }));
        setAffiliateTableData(formattedData);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getValidationItem = (record: any): MenuProps["items"] => [
    {
      key: "givevalidation",
      label: "Give Validation",
      onClick: () => {
        setShowPopup(true);
        dispatch(selectedDetails(record));
      },
    },
  ];

  const columns = [
    // {
    //   title: "Nos.",
    //   dataIndex: "index",
    //   width: 80,
    //   render: (_: any, __: any, index: number) => `#${index + 1}`,
    // },
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Referral ENID",
      dataIndex: "referralenid",
      key: "referralenid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Referral Link",
      dataIndex: "referrallink",
      key: "referrallink",
      width: 350,
      render: (text: any) => (
        <a
          style={{ color: "#00A3B1", textDecoration: "underline" }}
          href={text}
          target="_blank"
          rel="noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor:
              status === "validated"
                ? "#E8F7F7"
                : status === "under_validation"
                ? "#ffe10033"
                : "#FFE9E9",
            color:
              status === "validated"
                ? "#00A3B1"
                : status === "under_validation"
                ? "#968612"
                : "#FF4D4F",
          }}
        >
          {status === "validated"
            ? "Validated"
            : status === "under_validation"
            ? "Under Validation"
            : "Invalid"}
        </span>
      ),
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("affiliateuserdetail"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
          {record.status === "under_validation" ? (
            <Dropdown
              menu={{ items: getValidationItem(record) }}
              trigger={["hover"]}
              placement="bottomRight"
              // style={{ width: "100%" }}
            >
              <a style={{ width: "24px", height: "24px" }}>
                <img src="/icons/more.svg" alt="edit" />
              </a>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAffiliateHeadData();
  }, []);

  useEffect(() => {
    getAffiliateTableData("Month");
    setDropdownLabel("Month");
  }, [selectedFilter, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return affiliateTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [affiliateTableData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Affiliation</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Affiliates</h3>

              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalAffilates}</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Under Validation</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalUnderValidAffilates}</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Validated</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalValidAffilate}</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Affiliates Invalid</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalInvalidAffilate}</p>
                <span className={styles.userTitle}>Affiliates</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p>
              <p
                className={
                  selectedFilter === "under_validation"
                    ? styles.activeFilter
                    : ""
                }
                onClick={() => handleFilterSelect("under_validation")}
              >
                Under Validation
              </p>
              <p
                className={
                  selectedFilter === "validated" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("validated")}
              >
                Validated
              </p>
              <p
                className={
                  selectedFilter === "invalid" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("invalid")}
              >
                Invalid
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>
                <img src={"/icons/searchnormal.svg"} alt="search" />
              </p>
              <div className={styles.inputDiv}>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Here"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
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
                    <img src="/icons/dashdownarrow.svg" alt="dropdownarrow" />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                rowSelection={rowSelection}
                rowKey="_id"
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={affiliateTableData}
                loading={loading}
                // dataSource={filteredData}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={affiliateTableData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {showPopup &&
        createPortal(
          <ValidationPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAffiliateTableData}
            refreshDashData={getAffiliateHeadData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Affiliation;
