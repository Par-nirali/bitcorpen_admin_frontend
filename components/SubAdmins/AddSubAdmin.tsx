import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./addsubadmin.module.scss";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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
  phoneNumber: Yup.string()
    // .matches(/^[0-9]+$/, "Please enter valid phoneNumber number")
    // .min(10, "phoneNumber number must be at least 10 digits")
    .required("phoneNumber number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  userRole: Yup.string().required("Role selection is required"),
});

const AddSubAdmin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedSubAdminDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedSubAdminDetail, "selectedSubAdminDetail");

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

  const initialValue = useMemo(() => {
    if (selectedSubAdminDetail) {
      return {
        firstName: selectedSubAdminDetail?.firstName || "",
        lastName: selectedSubAdminDetail?.lastName || "",
        email: selectedSubAdminDetail?.email || "",
        phoneNumber: selectedSubAdminDetail?.phoneNumber || "",
        password: "",
        confirmPassword: "",
        userRole: selectedSubAdminDetail?.userRole || "",
        profileImage: null,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userRole: "",
      profileImage: null,
    };
  }, [selectedSubAdminDetail]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/profile`,
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

  const handleSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    let tkn = localStorage.getItem("auth-token");
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      userRole: values.userRole.toLowerCase().replace(/\s/g, ""),
      profileImage: values.profileImage,
    };
    try {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subAdmin/create`,
        data: payload,

        headers: {
          Authorization: `${tkn}`,
        },
      })
        .then((res) => {
          console.log("Complete profile response:", res.data);

          toast({
            title: "Success",
            description: "Profile completed successfully",
            status: "success",
            position: "top-right",
            isClosable: true,
          });
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to complete profile",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
    }
  };

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("sub_admins"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>{selectedSubAdminDetail ? "Edit" : "Add"} Sub Admin</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
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
                      {previewImage ? (
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
                      ) : (
                        <img src="/icons/add.svg" alt="add" />
                      )}
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
                          <label htmlFor="phoneNumber" className={styles.text}>
                            phoneNumber
                          </label>
                          {/*<Field
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.phoneNumber && errors.phoneNumber
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          */}
                          <PhoneInput
                            defaultCountry="us"
                            value={values.phoneNumber || ""}
                            onChange={(value: string) => {
                              if (
                                !value ||
                                value.trim() === "" ||
                                value === "+"
                              ) {
                                setFieldValue("phoneNumber", "");
                                setFieldTouched("phoneNumber", true);
                              } else {
                                setFieldValue("phoneNumber", value);
                                setFieldTouched("phoneNumber", false);
                              }
                            }}
                            className={styles.input}
                            inputClassName={styles.phoneInnerInput}
                          />

                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
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
                      </div>
                      <div className={styles.roleSection}>
                        <h4 className={styles.detailHeading}>Sub Admin Role</h4>
                        {/* <div className={styles.rolesGrid}>
                          {userRole.map((role) => (
                            <label key={role} className={styles.roleLabel}>
                              <Field
                                type="checkbox"
                                name="userRole"
                                value={role}
                                className={styles.roleCheckbox}
                              />
                              {role}
                            </label>
                          ))}
                        </div> */}
                        <Radio.Group
                          name="userRole"
                          value={values.userRole}
                          onChange={(e) =>
                            setFieldValue("userRole", e.target.value)
                          }
                          className={styles.rolesGrid}
                        >
                          {userRole.map((role) => (
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
                          name="userRole"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Adding..."
                        : selectedSubAdminDetail
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

export default AddSubAdmin;
