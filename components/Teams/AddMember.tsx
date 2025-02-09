import React, { useState } from "react";
import styles from "./addmembers.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
// import SendMsgUser from "./SendMsgUser";

const addMemValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First name should only contain letters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  role: Yup.string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role cannot exceed 100 characters")
    .required("Role is required"),

  facebook: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  twitter: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  linkedin: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  instagram: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

const AddMember = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("team"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>Add Member</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={{
                email: "",
                phone: "",
                firstName: "",
                lastName: "",
                role: "",
                facebook: "",
                twitter: "",
                linkedin: "",
                instagram: "",
              }}
              // initialValues={initialValues}
              validationSchema={addMemValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className={styles.addMemForm}>
                  <div className={styles.addMemberDiv}>
                    <div className={styles.addMemLeft}>
                      <img src="/icons/add.svg" alt="add" />
                    </div>
                    <p>Add Profile Photo</p>
                  </div>
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemFirstDiv}>
                      <div className={styles.addMemPersonalDiv}>
                        <h4 className={styles.detailHeading}>
                          Personal Details
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
                              //   className={styles.input}
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
                              //   className={styles.input}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className={styles.errMes}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.addMemPersonalDiv}>
                        <h4 className={styles.detailHeading}>
                          Contact Details
                        </h4>
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
                              phone
                            </label>
                            <Field
                              type="number"
                              name="phone"
                              id="phone"
                              placeholder="Enter your phone"
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
                    </div>
                    <div className={styles.addMemProfDiv}>
                      <h4 className={styles.detailHeading}>
                        Professional Details
                      </h4>
                      <div className={styles.inputDiv}>
                        <label htmlFor="role" className={styles.text}>
                          Role
                        </label>
                        <Field
                          type="role"
                          name="role"
                          id="role"
                          placeholder="Type here role"
                          className={`${styles.input} ${
                            touched.role && errors.role ? styles.inputError : ""
                          }`}
                        />
                        <ErrorMessage
                          name="role"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>
                        Social Media Details
                      </h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="facebook" className={styles.text}>
                            Facebook
                          </label>
                          <Field
                            type="text"
                            name="facebook"
                            id="facebook"
                            placeholder="Past Facebook account link here"
                            className={`${styles.input} ${
                              touched.facebook && errors.facebook
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="facebook"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="twitter" className={styles.text}>
                            Twitter
                          </label>
                          <Field
                            type="twitter"
                            name="twitter"
                            id="twitter"
                            placeholder="Past Twitter account link here"
                            className={`${styles.input} ${
                              touched.twitter && errors.twitter
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="twitter"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="linkedin" className={styles.text}>
                            LinkedIn
                          </label>
                          <Field
                            type="text"
                            name="linkedin"
                            id="linkedin"
                            placeholder="Past LinkedIn account link here"
                            className={`${styles.input} ${
                              touched.linkedin && errors.linkedin
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="linkedin"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="instagram" className={styles.text}>
                            Instagram
                          </label>
                          <Field
                            type="instagram"
                            name="instagram"
                            id="instagram"
                            placeholder="Past Instagram account link here"
                            className={`${styles.input} ${
                              touched.instagram && errors.instagram
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="instagram"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing in..." : "Add Member"}
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
export default AddMember;
