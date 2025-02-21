import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./writenews.module.scss";

const addSubAdminValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters"),
});

const WriteNews = () => {
  const dispatch = useDispatch();
  const [showEmbed, setShowEmbed] = useState(false);
  const selectedSubAdminDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedSubAdminDetail, "selectedSubAdminDetail");
  const handleCloseEmbed = () => {
    setShowEmbed(false);
  };
  const initialValue = useMemo(() => {
    if (selectedSubAdminDetail) {
      return {
        title: selectedSubAdminDetail?.title || "",
        description: selectedSubAdminDetail?.description || "",
        profileImage: null,
      };
    }
    return {
      title: "",
      description: "",
      profileImage: null,
    };
  }, [selectedSubAdminDetail]);
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
          onClick={() => dispatch(selectedProjects("news"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>Write News</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                <Form className={styles.addNewsForm}>
                  <div className={styles.addNewsUpDiv}>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Company Logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "500px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <div className={styles.addNewsImgUp}>
                        <img
                          src="/icons/galleryupload.png"
                          alt="galleryupload"
                        />
                      </div>
                    )}
                    <p>
                      We Recommend Uploading or Dragging in a Video or Image
                    </p>
                    <div
                      className={styles.addNewsLeft}
                      onClick={() =>
                        document.getElementById("profile-upload")?.click()
                      }
                    >
                      <img src="/icons/docupload.svg" alt="docupload" /> Upload
                      from Computer
                    </div>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                    {/* {previewImage && (
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
                    )} */}
                  </div>
                  <div className={styles.addNewsFieldsMain}>
                    <div className={styles.addNewsLastDiv}>
                      <div className={styles.addNews2GridDiv}>
                        <div className={styles.inputDiv}>
                          {/* <label htmlFor="title" className={styles.text}>
                            Subject name
                          </label> */}
                          <Field
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Subject Name"
                            className={`${styles.inputTitle} ${
                              touched.title && errors.title
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.descEditingIcons}>
                          {/* <p>
                            Style <img src="/icons/link.svg" />
                          </p> */}
                          <span>B</span>
                          <img
                            src="/icons/pharagraphspacing.svg"
                            alt="pharagraphspacing"
                          />
                          <img src="/icons/link.svg" alt="link" />
                          <img
                            src="/icons/code.svg"
                            alt="code"
                            onClick={() => setShowEmbed(true)}
                          />
                          <img src="/icons/image.svg" alt="image" />
                        </div>
                      </div>
                      <div className={styles.inputDiv}>
                        {/* <label htmlFor="description" className={styles.text}>
                           Description
                          </label> */}
                        <Field
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Write here"
                          className={`${styles.inputDesc} ${
                            touched.description && errors.description
                              ? styles.inputError
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addNewsBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create News"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {showEmbed && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p>Add Embed</p>
            </div>
            <div className={styles.modalBody}>
              <label>Embed Link</label>
            </div>
            <input
              type="text"
              placeholder="Paste embed link here"
              className={styles.embedInput}
              value={""}
            />
          </div>
          <button className={styles.closeButton} onClick={handleCloseEmbed}>
            <img src="/icons/close.svg" alt="Close" />
          </button>
        </div>
      )}
    </>
  );
};
export default WriteNews;
