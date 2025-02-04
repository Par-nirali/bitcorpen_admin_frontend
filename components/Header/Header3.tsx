import React, { useEffect, useRef, useState } from "react";
import style from "./header3.module.scss";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  CEO_DEPARTMENT,
  setSearchTerm,
  setSelectedEmpl,
  setShowEmp,
} from "../redux/actions";
import axios from "axios";

const Header3 = () => {
  const [userDetail, setUserDetail] = useState<any>("");
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

  // console.log("header name is", userDetail);
  const dispatch = useDispatch();
  const selectedproject = useSelector((state: any) => state.selectedproject);
  const allprojects = useSelector((state: any) => state.allprojects);
  const selectedemp = useSelector((state: any) => state.selectedemp);
  const searchTerm = useSelector((state: any) => state.searchTerm);
  const ceodepartmentid = useSelector((state: any) => state.ceodepartmentid);
  const [ceodepartments, setCeoDepartments] = useState([]);
  const selectedtab = useSelector((state: any) => state.selectedtab);
  const [submanager, setSubManager] = useState([]);
  const [empsearch, setEmpSearch] = useState("");
  const [empdetails, setEmpDetails] = useState([]);
  const [show, setShow] = useState(false);

  // console.log("seletedemplength s", selectedemp.length, selectedemp);
  let popupRef: any = useRef();

  useEffect(() => {
    let handler = (e: any) => {
      if (!popupRef?.current?.contains(e.target)) {
        setShow(false);
        setEmpSearch("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // console.log("reduxemp is", selectedemp);
  useEffect(() => {
    const ceoDepartments = async () => {
      if (userDetail?.designation?.name === "CEO") {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/department/getDepartment`
          );
          setCeoDepartments(res.data);
        } catch (error) {
          console.error("Error fetching managers:", error);
        }
      }
    };
    ceoDepartments();
  }, [userDetail]);

  useEffect(() => {
    let debounceTimer: any;

    const fetchempDetails = async () => {
      let tkn = localStorage.getItem("auth-token");

      const data = {
        name: empsearch,
      };
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/search`,
          data,
          {
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
          }
        );

        setEmpDetails(res.data);
      } catch (error) {
        console.error("Error fetching submanager:", error);
      }
    };

    if (empsearch !== "") {
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        fetchempDetails();
      }, 1000);
    } else {
      setShow(false);
      setEmpDetails([]);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [empsearch]);

  // console.log("employee data is", empdetails);

  const handleSearchChange = (e: any) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleempSearchChange = (e: any) => {
    setEmpSearch(e.target.value);
    setShow(true);
  };

  useEffect(() => {
    const subManagerDepart = async () => {
      if (userDetail && userDetail._id) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/getChildUser/${userDetail._id}`
          );
          // console.log(res.data, "Employees Data");
          setSubManager(res.data);
        } catch (error) {
          console.error("Error fetching submanager:", error);
        }
      }
    };
    subManagerDepart();
  }, [userDetail]);

  // console.log("selectedprojects11111", selectedproject);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [selectedproject]);

  return (
    <div className={style.headerMainDiv}>
      <div className={style.headerSubDiv}>
        <nav className={style.nav}>
          <Link href="/">
            <div className={style.headingDivImg}>
              <img src="/logo.svg" alt="Logo" />
            </div>
          </Link>
          {/* {(selectedproject === "my projects" ||
            selectedproject === "all projects" ||
            selectedproject === "reviewed projects" ||
            selectedproject === "cancel projects" ||
            selectedproject === "topmanager projects" ||
            selectedproject === "perin" ||
            selectedproject === "my targets" ||
            selectedproject === "sales projects" ||
            selectedproject === "manager my projects" ||
            selectedproject === ceodepartmentid ||
            (selectedtab === "projectmanager" &&
              ceodepartments.find(
                (dept: any) => dept._id === selectedproject
              ))) && (
            <div className={style.inputMainDiv}>
              <p>
                <CiSearch />
              </p>
              <div className={style.inputDiv}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          )} */}

          <div
            className={style.inputMainDiv}
            style={{
              visibility:
                selectedproject === "my projects" ||
                selectedproject === "all projects" ||
                selectedproject === "reviewed projects" ||
                selectedproject === "cancel projects" ||
                selectedproject === "topmanager projects" ||
                // selectedproject === "perin" ||
                submanager.find(
                  (subman: any) => subman._id === selectedproject
                ) ||
                selectedproject === "my targets" ||
                selectedproject === "sales projects" ||
                selectedproject === "manager my projects" ||
                selectedproject === ceodepartmentid ||
                (selectedtab === "projectmanager" &&
                  ceodepartments.find(
                    (dept: any) => dept._id === selectedproject
                  ))
                  ? "visible"
                  : "hidden",

              display:
                selectedproject === "ceo dashboard" ||
                selectedproject === "ceoempreview" ||
                selectedproject === "ceoempprojects"
                  ? "none"
                  : "",
            }}
          >
            <p>
              <CiSearch />
            </p>
            <div className={style.inputDiv}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div
            className={style.inputMainDiv}
            style={{
              display:
                selectedproject === "ceo dashboard" ||
                selectedproject === "ceoempreview" ||
                selectedproject === "ceoempprojects"
                  ? ""
                  : "none",
            }}
          >
            <p>
              <CiSearch />
            </p>
            <div className={style.inputDiv}>
              <input
                type="text"
                placeholder="Search Employee"
                value={empsearch}
                onChange={handleempSearchChange}
              />
            </div>
          </div>

          <div className={style.upgradeMainDiv}>
            <div className={style.profileDiv}>
              <div className={style.headNotifImg}>
                <img
                  src={"/icons/notificationheader.svg"}
                  alt="notificationheader"
                />
              </div>
              <div className={style.headProDetailImg}>
                <img src={"/userprofile.svg"} alt="profile" />
              </div>
              <div>
                {userDetail && (
                  <p>
                    {userDetail?.firstName} {userDetail?.lastName}
                  </p>
                )}
                {userDetail && <p>{userDetail?.designation?.name}</p>}
              </div>
              {/* <div className={style.arrow}>
                <RiArrowDropDownLine />
              </div> */}
            </div>
          </div>
        </nav>

        {show && (
          <div className={style.headProMainDiv}>
            <div className={style.headProContainer}>
              <div className={style.headProSubDiv} ref={popupRef}>
                <div className={style.headDiv}>
                  <h2>Top Employees</h2>
                </div>
                <div className={style.profileMainDiv}>
                  {/* <div className={style.empProfileDiv}>
                  <img src="/usercirclepro.png" alt="profile" />
                  <p>punit vadhwani</p>
                </div> */}

                  {empdetails.length > 0 ? (
                    empdetails.map((data: any) => (
                      <div
                        key={data._id}
                        className={style.empProfileDiv}
                        onClick={() => {
                          // dispatch(setSelectedEmpl(data));
                          dispatch(setSelectedEmpl([data]));

                          setShow(false);
                          setEmpSearch("");
                          dispatch(setShowEmp(true));
                        }}
                      >
                        <img src="/userprofile.svg" alt="profile" />
                        <p>
                          {data?.firstName} {data?.lastName}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className={style.noResults}>No Results Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header3;
