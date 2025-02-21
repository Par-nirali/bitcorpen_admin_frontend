import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./admineditprofile.module.scss";

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
    .matches(/^[0-9]+$/, "Please enter valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  oldpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
const AdminEditProfile = () => {
  const dispatch = useDispatch();
  const selectedEditAdminDetail = useSelector(
    (state: any) => state.selectedDetails
  );

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedEditAdminDetail, "selectedEditAdminDetail");

  const initialValue = useMemo(() => {
    if (selectedEditAdminDetail) {
      return {
        firstName: selectedEditAdminDetail?.firstName || "",
        lastName: selectedEditAdminDetail?.lastName || "",
        email: selectedEditAdminDetail?.email || "",
        phone: selectedEditAdminDetail?.phone || "",
        password: "",
        confirmPassword: "",
        profileImage: null,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
    };
  }, [selectedEditAdminDetail]);
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFieldValue("profileImage", file);
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          //   onClick={() => dispatch(selectedProjects("sub_admins"))}
        >
          {/* <img src="/icons/back.svg" alt="back" /> */}

          <p>Edit Profile</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
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
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                    <p>Sub Admin Profile Image</p>
                  </div>
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>
                        Edit Profile Details
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
                            placeholder="Enter Email"
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
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Enter Phone number"
                            className={`${styles.input} ${
                              touched.phone && errors.phone
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>Change Password</h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="oldpassword" className={styles.text}>
                            Old Password
                          </label>
                          <Field
                            type="password"
                            name="oldpassword"
                            id="oldpassword"
                            placeholder="Enter your old password"
                            className={`${styles.input} ${
                              touched.password && errors.password
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="oldpassword"
                            component="div"
                            className={styles.errMes}
                          />
                          <p className={styles.foregtPswdText}>
                            Forgot Password?
                          </p>
                        </div>
                      </div>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="password" className={styles.text}>
                            New Password
                          </label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your new password"
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
                        {!selectedEditAdminDetail?.password ? (
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
                              placeholder="Enter confirm password"
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
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Save"}
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

export default AdminEditProfile;
