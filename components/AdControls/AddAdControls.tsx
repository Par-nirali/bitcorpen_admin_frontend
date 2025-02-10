import React, { useMemo, useState } from "react";
import styles from "./addadcontrols.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { Button, Input, Table } from "antd";
import { createPortal } from "react-dom";

const addAdsValidationSchema = Yup.object().shape({
  adTitle: Yup.string().required("Title is required"),

  adType: Yup.string().required("Ad Type is required"),

  adUrl: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

const AddAdControls = () => {
  const dispatch = useDispatch();
  const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
  console.log(selectedAdsDetail, "selectedAdsDetail");

  const initialValue = useMemo(() => {
    if (selectedAdsDetail) {
      return {
        adTitle: selectedAdsDetail?.title,
        adType: selectedAdsDetail?.adType,
        adUrl: selectedAdsDetail?.adUrl,
      };
    }
    return {
      adTitle: "",
      adType: "",
      adUrl: "",
    };
  }, [selectedAdsDetail]);

  const handleSubmit = () => {
    console.log("clicked");
  };
  // if (!selectedAdsDetail) {
  //   return "";
  // }
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("ad_controls"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>Add New AD</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addAdsValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue }) => (
                <Form className={styles.addAdsForm}>
                  <div className={styles.addAdsFieldsMain}>
                    <div className={styles.addAdsLastDiv}>
                      <h4 className={styles.detailHeading}>Ad Details</h4>

                      <div className={styles.addAdsFlexDiv}>
                        <div className={styles.adsPointDiv}>
                          <p>Ad ID</p>
                          <span className={styles.adsSpanDiv}>ENAD0001</span>
                        </div>
                        {selectedAdsDetail?.status ? (
                          <div className={styles.adsPointDiv}>
                            <p>Ad ID</p>
                            <span
                              className={`${
                                selectedAdsDetail?.status === "Active"
                                  ? styles.activateDiv
                                  : styles.deactivateDiv
                              }`}
                            >
                              {selectedAdsDetail?.status}{" "}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={styles.addAds2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="adTitle" className={styles.text}>
                            Ad Title
                          </label>
                          <Field
                            type="text"
                            name="adTitle"
                            id="adTitle"
                            placeholder="Enter Ad Title"
                            className={`${styles.input} ${
                              touched.adTitle && errors.adTitle
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="adTitle"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="adType" className={styles.text}>
                            Ad Type
                          </label>
                          <Field
                            type="adType"
                            name="adType"
                            id="adType"
                            placeholder="Past Twitter account link here"
                            className={`${styles.input} ${
                              touched.adType && errors.adType
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="adType"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>
                      <div className={styles.inputDiv}>
                        <label htmlFor="adUrl" className={styles.text}>
                          Ad URL
                        </label>
                        <Field
                          type="text"
                          name="adUrl"
                          id="adUrl"
                          placeholder="Past adUrl account link here"
                          className={`${styles.input} ${
                            touched.adUrl && errors.adUrl
                              ? styles.inputError
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="adUrl"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addAdsBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add Partner"}
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

export default AddAdControls;
