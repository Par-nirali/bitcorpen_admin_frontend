import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./editsubadminprofile.module.scss";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useRouter } from "next/router";

const addSubAdminValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    // .matches(/^[0-9]+$/, "Please enter valid phone number")
    // .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  // roles: Yup.array()
  //   .min(1, "At least one role must be selected")
  //   .required("Role selection is required"),
  // roles: Yup.string().required("Role selection is required"),
});

const EditSubAdminProfile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  // const selectedSubAdminDetail = useSelector(
  //   (state: any) => state.selectedDetails
  // );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userDetail, setUserDetail] = useState<any>("");
  const [subAdminData, setSubAdminData] = useState<any>("");
  const [rolesData, setRolesData] = useState<any>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
        console.log(userDetail, "userDetail");
      }
    };

    fetchUserData();
  }, []);

  const getUserDetailForEdit = async () => {
    let tkn = localStorage.getItem("auth-token");

    // if (userDetail._id) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/admin-subadmin-profile`,
        {
          headers: {
            Authorization: `${tkn}`,
          },
        }
      );
      console.log("API Response get:", response.data.data);
      setSubAdminData(response.data.data);
      toast({
        title: "Success",
        description: "admin fetched successfully",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    // }
  };

  useEffect(() => {
    const fetchSubadminRoles = async () => {
      if (typeof window !== "undefined") {
        const rolesLocal = JSON.parse(
          localStorage.getItem("subadminroles") || "{}"
        );
        setRolesData(rolesLocal);
        console.log(rolesData, "rolesData");
      }
    };

    fetchSubadminRoles();
  }, []);

  const userRole = [
    "User",
    "Dashboard",
    "Credit logs",
    "Help & Support",
    "Affiliation",
    "EN Assist",
    "Partners Collaboration",
    "Ad Controls",
    "Leader Board",
    "Flag User",
    "Content Moderation",
    "News",
  ];

  const transformResourceToOriginal = (resource: string) => {
    return (
      userRole.find(
        (role) => role.toLowerCase().replace(/\s/g, "") === resource
      ) || ""
    );
  };

  const transformedResources = rolesData
    ? rolesData.map(transformResourceToOriginal).filter(Boolean)
    : [];

  const initialValue = useMemo(() => {
    if (subAdminData) {
      if (subAdminData?.profileImage) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${subAdminData?.profileImage?.url}`
        );
      }

      console.log(transformedResources, "transformedResources");

      return {
        firstName: subAdminData?.firstName || "",
        lastName: subAdminData?.lastName || "",
        email: subAdminData?.email || "",
        phone: subAdminData?.phoneNumber || "",
        // roles: transformedResources,
        // profileImage: null,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // roles: "",
      // profileImage: null,
    };
  }, [subAdminData]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/admin-subadmin-profile/profile`,
        formData,
        {
          headers: {
            Authorization: `${tkn}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data._id;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("values", values);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phone,
      profileImage: values.profileImage,
    };

    console.log("payload", payload);

    try {
      setSubmitting(true);
      let tkn = localStorage.getItem("auth-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/admin-subadmin-profile/update-details`,
        payload,
        {
          headers: {
            Authorization: `${tkn}`,
          },
        }
      );
      getUserDetailForEdit();
      router.push("/");
      toast({
        title: "Success",
        description: "Admin Profile updated successfully",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // if (userDetail?._id) {
    getUserDetailForEdit();
    // }
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          // onClick={() => dispatch(selectedProjects("sub_admins"))}
        >
          {/* <img src="/icons/back.svg" alt="back" /> */}

          <p>Sub Admin Profile</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                isSubmitting,
                touched,
                errors,
                setFieldValue,
                values,
                setFieldTouched,
              }) => (
                <Form className={styles.addMemForm}>
                  <div className={styles.addMemberDiv}>
                    <div
                      className={styles.addMemLeft}
                      onClick={() =>
                        document.getElementById("profile-upload")?.click()
                      }
                    >
                      {/* {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Company Logo"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "42px",
                          }}
                        />
                      ) : ( */}
                      <img src="/icons/add.svg" alt="add" />
                      {/* )} */}
                      {/* {previewImage && (
                        <img
                          src={previewImage}
                          alt="Company Logo"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            objectFit: "cover",
                            borderRadius: "42px",
                          }}
                        />
                      )} */}
                    </div>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const imageId = await handleImageUpload(file);
                            setFieldValue("profileImage", imageId);
                            setPreviewImage(URL.createObjectURL(file));
                          } catch (error) {
                            e.target.value = "";
                            setFieldValue("profileImage", "");
                          }
                        }
                      }}
                    />
                    <p>Sub Admin Profile Image</p>
                  </div>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Company Logo"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "cover",
                        // borderRadius: "42px",
                      }}
                    />
                  )}
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>
                        Sub Admin Details
                      </h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="firstName" className={styles.text}>
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Type first name"
                            className={`${styles.input} ${
                              touched.firstName && errors.firstName
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="lastName" className={styles.text}>
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Type last name"
                            className={`${styles.input} ${
                              touched.lastName && errors.lastName
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="email" className={styles.text}>
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.email && errors.email
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="phone" className={styles.text}>
                            Phone
                          </label>
                          {/* <Field
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.phone && errors.phone
                                ? styles.inputError
                                : ""
                            }`}
                          /> */}
                          <PhoneInput
                            defaultCountry="us"
                            value={values.phone || ""}
                            onChange={(value: string) => {
                              if (
                                !value ||
                                value.trim() === "" ||
                                value === "+"
                              ) {
                                setFieldValue("phone", "");
                                setFieldTouched("phone", true);
                              } else {
                                setFieldValue("phone", value);
                                setFieldTouched("phone", false);
                              }
                            }}
                            className={styles.input}
                            inputClassName={styles.phoneInnerInput}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      {/* <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="password" className={styles.text}>
                            Password
                          </label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.password && errors.password
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        {!selectedSubAdminDetail?.password ? (
                          <div className={styles.inputDiv}>
                            <label
                              htmlFor="confirmPassword"
                              className={styles.text}
                            >
                              Confirm Password
                            </label>
                            <Field
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              placeholder="Type partner type"
                              className={`${styles.input} ${
                                touched.confirmPassword &&
                                errors.confirmPassword
                                  ? styles.inputError
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className={styles.errMes}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div> */}
                      <div className={styles.roleSection}>
                        <h4 className={styles.detailHeading}>Sub Admin Role</h4>
                        <div className={styles.rolesGrid}>
                          {transformedResources?.map((role: any) => (
                            <p className={styles.selectedRole} key={role}>
                              {role}
                            </p>
                          ))}
                        </div>
                        {/* <p className={styles.selectedRole}>
                          {userDetail?.roles}
                        </p> */}
                        {/* <Radio.Group
                          name="roles"
                          value={values.roles}
                          onChange={(e) =>
                            setFieldValue("roles", e.target.value)
                          }
                          className={styles.rolesGrid}
                        >
                          {roles.map((role) => (
                            <Radio
                              key={role}
                              value={role}
                              className={styles.roleRadio}
                            >
                              <span>{role}</span>
                            </Radio>
                          ))}
                        </Radio.Group>
                        <ErrorMessage
                          name="roles"
                          component="div"
                          className={styles.errMes}
                        /> */}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Adding..."
                        : userDetail
                        ? "Edit Sub Admin"
                        : "Add Sub Admin"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubAdminProfile;
