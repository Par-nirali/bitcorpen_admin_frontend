// import { useToast } from "@chakra-ui/react";
// import { Input } from "antd";
// import axios from "axios";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { selectedProjects } from "../redux/actions";
// import styles from "./addadcontrols.module.scss";
// import Select from "react-select";

// const customStyles = {
//   control: (base: any) => ({
//     ...base,
//     backgroundColor: "#fff",
//     color: "black",
//     padding: 0,
//     border: "none",
//     outline: "none",
//     boxShadow: "none !important",
//     "&:hover": {
//       border: "none",
//       outline: "none",
//     },
//     borderRadius: "5px",

//     cursor: "pointer",
//   }),
//   placeholder: (base: any) => ({
//     ...base,
//     color: "#b5b5b5",
//     width: "100%",
//   }),
//   singleValue: (base: any) => ({
//     ...base,
//     color: "#1c4728",
//     fontSize: "16px",
//   }),
//   input: (base: any) => ({
//     ...base,
//     color: "#000",
//     border: "none",
//     outline: "none",
//   }),
//   dropdownIndicator: (base: any) => ({
//     ...base,
//     color: "black",
//     background: "#F5F5F5",
//     padding: 9,
//     margin: 4,
//     alignSelf: "flex-end",
//   }),
//   indicatorSeparator: () => ({
//     display: "none",
//   }),
//   menu: (base: any) => ({
//     ...base,
//     backgroundColor: "#fff",
//     border: "none",
//     marginTop: "4px",
//     fontSize: "16px",
//     zIndex: 9999,
//     width: "400px",
//     color: "black",
//     maxHeight: "240px",
//     overflowY: "hidden",
//   }),
//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isFocused ? "#f1f1f1" : "#fff",
//     color: "black",
//     cursor: "pointer",
//   }),
// };

// const addAdsValidationSchema = Yup.object().shape({
//   adTitle: Yup.string().required("AD Title is required"),
//   adType: Yup.string().required("Ad Type is required"),
//   adUrl: Yup.string()
//     .url("Please enter a valid URL")
//     .nullable()
//     .transform((value) => (value === "" ? null : value)),
// });

// const AddAdControls = () => {
//   const dispatch = useDispatch();
//   const toast = useToast();
//   const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
//   console.log(selectedAdsDetail, "selectedAdsDetail");
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [lastAdId, setLastAdId] = useState<string>("ENAD0000");

//   const generateNextAdId = (currentAdIds: string[]) => {
//     if (currentAdIds.length === 0) return "ENAD0001";

//     const sortedIds = currentAdIds.sort((a, b) => {
//       const numA = parseInt(a.replace("ENAD", ""));
//       const numB = parseInt(b.replace("ENAD", ""));
//       return numB - numA;
//     });

//     const highestNum = parseInt(sortedIds[0].replace("ENAD", ""));
//     const nextNum = highestNum + 1;

//     return `ENAD${nextNum.toString().padStart(4, "0")}`;
//   };

//   useEffect(() => {
//     const fetchExistingAdIds = async () => {
//       let token = localStorage.getItem("auth-token");

//       try {
//         const response = await axios({
//           method: "get",
//           url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/get-ad?filter=All`,
//           headers: { Authorization: `${token}` },
//         });

//         const existingAdIds = response.data.data.map((ad: any) => ad.adID);

//         const nextAdId = generateNextAdId(existingAdIds);
//         setLastAdId(nextAdId);
//       } catch (error) {
//         console.error("Error fetching existing ad IDs:", error);
//         setLastAdId("ENAD0001");
//       }
//     };

//     if (!selectedAdsDetail?._id) {
//       fetchExistingAdIds();
//     }
//   }, [selectedAdsDetail]);

//   const initialValue = useMemo(() => {
//     if (selectedAdsDetail) {
//       if (selectedAdsDetail?.adImageUrl) {
//         setPreviewImage(
//           `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedAdsDetail?.adImageUrl}`
//         );
//       }
//       return {
//         adTitle: selectedAdsDetail?.adTitle,
//         adType: selectedAdsDetail?.adType,
//         adUrl: selectedAdsDetail?.adUrl,
//         adImageUrl: selectedAdsDetail?.adImageUrl || "",
//       };
//     }
//     return {
//       adTitle: "",
//       adType: "",
//       adUrl: "",
//       adImageUrl: "",
//     };
//   }, [selectedAdsDetail]);

//   const handleImageUpload = async (file: File) => {
//     const tkn = localStorage.getItem("auth-token");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/image`,
//         formData,
//         {
//           headers: {
//             Authorization: `${tkn}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("API Response ACCEPT:", response.data);

//       return response.data.data;
//     } catch (error) {
//       throw new Error("Failed to upload image");
//     }
//   };

//   const handleSubmit = async (values: any, setSubmitting: any) => {
//     let tkn = localStorage.getItem("auth-token");

//     try {
//       const payload: any = {
//         // adID: selectedAdsDetail?._id ? selectedAdsDetail.adID : lastAdId,
//         adTitle: values.adTitle,
//         adType: values.adType,
//         adUrl: values.adUrl,
//         adImageUrl: values.adImageUrl,
//       };
//       console.log(payload, "payload");
//       if (selectedAdsDetail?._id) {
//         payload.adId = selectedAdsDetail._id;
//         const response = await axios.patch(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/update-ad`,
//           payload,
//           {
//             headers: {
//               Authorization: `${tkn}`,
//             },
//           }
//         );
//         console.log("API Response ACCEPT:", response.data);
//         toast({
//           title: "Success",
//           description: "Partner updated successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("ad_controls"));
//       } else {
//         payload.adID = selectedAdsDetail?._id
//           ? selectedAdsDetail.adID
//           : lastAdId;
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/create-ad`,
//           payload,
//           {
//             headers: {
//               Authorization: `${tkn}`,
//             },
//           }
//         );
//         console.log("API Response ACCEPT:", response.data);
//         toast({
//           title: "Success",
//           description: "Partner added successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("ad_controls"));
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitting(false);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className={styles.pSubRightDiv}>
//         <button
//           className={styles.backMainDiv}
//           onClick={() => dispatch(selectedProjects("ad_controls"))}
//         >
//           <img src="/icons/back.svg" alt="back" />

//           <p>{selectedAdsDetail ? "Update" : "Add"} New AD</p>
//         </button>

//         <div className={styles.dashboardScroll}>
//           <div className={styles.graphTableDivMain}>
//             <Formik
//               initialValues={initialValue}
//               validationSchema={addAdsValidationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting, touched, errors, setFieldValue }) => (
//                 <Form className={styles.addAdsForm}>
//                   <div className={styles.addAdsFieldsMain}>
//                     <div className={styles.addAdsLastDiv}>
//                       <h4 className={styles.detailHeading}>Ad Details</h4>
//                       <div className={styles.addMemberDiv}>
//                         <div
//                           className={styles.addMemLeft}
//                           onClick={() =>
//                             document.getElementById("ad-upload")?.click()
//                           }
//                         >
//                           <img src="/icons/add.svg" alt="add" />
//                         </div>
//                         <Input
//                           id="ad-upload"
//                           type="file"
//                           accept="image/*"
//                           style={{ display: "none" }}
//                           onChange={async (e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               try {
//                                 const imageId = await handleImageUpload(file);
//                                 setFieldValue("adImageUrl", imageId);
//                                 setPreviewImage(URL.createObjectURL(file));
//                               } catch (error) {
//                                 e.target.value = "";
//                                 setFieldValue("adImageUrl", "");
//                               }
//                             }
//                           }}
//                         />
//                         <p>{previewImage ? "Change" : "Add"} AD Image</p>
//                       </div>
//                       {previewImage && (
//                         <div>
//                           <img
//                             src={previewImage}
//                             alt="Preview"
//                             style={{
//                               maxWidth: "100px",
//                               maxHeight: "100px",
//                             }}
//                           />
//                         </div>
//                       )}
//                       <div className={styles.addAdsFlexDiv}>
//                         {/* {selectedAdsDetail?._id ? } */}
//                         <div className={styles.adsPointDiv}>
//                           <p>Ad ID</p>
//                           <span className={styles.adsSpanDiv}>
//                             {selectedAdsDetail?._id
//                               ? selectedAdsDetail.adID
//                               : lastAdId}
//                           </span>
//                         </div>
//                         {selectedAdsDetail?.status ? (
//                           <div className={styles.adsPointDiv}>
//                             <p>Ad ID</p>
//                             <span
//                               className={`${
//                                 selectedAdsDetail?.status === "Active"
//                                   ? styles.activateDiv
//                                   : styles.deactivateDiv
//                               }`}
//                             >
//                               {selectedAdsDetail?.status}{" "}
//                             </span>
//                           </div>
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                       <div className={styles.addAds2GridDiv}>
//                         <div className={styles.inputDiv}>
//                           <label htmlFor="adTitle" className={styles.text}>
//                             Ad Title
//                           </label>
//                           <Field
//                             type="text"
//                             name="adTitle"
//                             id="adTitle"
//                             placeholder="Enter Ad Title"
//                             className={`${styles.input} ${
//                               touched.adTitle && errors.adTitle
//                                 ? styles.inputError
//                                 : ""
//                             }`}
//                           />
//                           <ErrorMessage
//                             name="adTitle"
//                             component="div"
//                             className={styles.errMes}
//                           />
//                         </div>
//                         <div className={styles.inputDiv}>
//                           <label htmlFor="adType" className={styles.text}>
//                             Ad Type
//                           </label>
//                           <div className={styles.dropdownSelectDiv}>
//                             <Select
//                               name="adType"
//                               // options={adTypeOptions}
//                               placeholder="Select Visibility"
//                               styles={customStyles}
//                               // value={findSelectedOption(
//                               //   adTypeOptions},
//                               //   formValues.ENRscore
//                               // )}
//                               // onChange={(option: any) =>
//                               //   handleSelectChange("ENRscore", option)
//                               // }
//                             />
//                           </div>
//                           <ErrorMessage
//                             name="adType"
//                             component="div"
//                             className={styles.errMes}
//                           />
//                         </div>
//                       </div>
//                       <div className={styles.inputDiv}>
//                         <label htmlFor="adUrl" className={styles.text}>
//                           Ad URL
//                         </label>
//                         <Field
//                           type="text"
//                           name="adUrl"
//                           id="adUrl"
//                           placeholder="Past adUrl account link here"
//                           className={`${styles.input} ${
//                             touched.adUrl && errors.adUrl
//                               ? styles.inputError
//                               : ""
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="adUrl"
//                           component="div"
//                           className={styles.errMes}
//                         />
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       className={styles.addAdsBtn}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting
//                         ? "Submitting..."
//                         : selectedAdsDetail
//                         ? "Upadte AD"
//                         : "Add AD"}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddAdControls;
import { useToast } from "@chakra-ui/react";
import { Input } from "antd";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./addadcontrols.module.scss";
import Select from "react-select";

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#fff",
    color: "black",
    padding: 0,
    border: "none",
    outline: "none",
    boxShadow: "none !important",
    "&:hover": {
      border: "none",
      outline: "none",
    },
    borderRadius: "5px",

    cursor: "pointer",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#b5b5b5",
    width: "100%",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#1c4728",
    fontSize: "16px",
  }),
  input: (base: any) => ({
    ...base,
    color: "#000",
    border: "none",
    outline: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "black",
    background: "#F5F5F5",
    padding: 9,
    margin: 4,
    alignSelf: "flex-end",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#fff",
    border: "none",
    marginTop: "4px",
    fontSize: "16px",
    zIndex: 9999,
    width: "400px",
    color: "black",
    maxHeight: "240px",
    overflowY: "hidden",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f1f1f1" : "#fff",
    color: "black",
    cursor: "pointer",
  }),
};

// Define the ad type options
const adTypeOptions = [
  { value: "Google", label: "Google" },
  { value: "Facebook", label: "Facebook" },
];

// Helper function to find selected option
const findSelectedOption = (options: any[], value: string) => {
  return options.find((option) => option.value === value) || null;
};

const addAdsValidationSchema = Yup.object().shape({
  adTitle: Yup.string().required("AD Title is required"),
  adType: Yup.string().required("Ad Type is required"),
  adUrl: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

const AddAdControls = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
  console.log(selectedAdsDetail, "selectedAdsDetail");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lastAdId, setLastAdId] = useState<string>("ENAD0000");

  const generateNextAdId = (currentAdIds: string[]) => {
    if (currentAdIds.length === 0) return "ENAD0001";

    const sortedIds = currentAdIds.sort((a, b) => {
      const numA = parseInt(a.replace("ENAD", ""));
      const numB = parseInt(b.replace("ENAD", ""));
      return numB - numA;
    });

    const highestNum = parseInt(sortedIds[0].replace("ENAD", ""));
    const nextNum = highestNum + 1;

    return `ENAD${nextNum.toString().padStart(4, "0")}`;
  };

  useEffect(() => {
    const fetchExistingAdIds = async () => {
      let token = localStorage.getItem("auth-token");

      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/get-ad?filter=All`,
          headers: { Authorization: `${token}` },
        });

        const existingAdIds = response.data.data.map((ad: any) => ad.adID);

        const nextAdId = generateNextAdId(existingAdIds);
        setLastAdId(nextAdId);
      } catch (error) {
        console.error("Error fetching existing ad IDs:", error);
        setLastAdId("ENAD0001");
      }
    };

    if (!selectedAdsDetail?._id) {
      fetchExistingAdIds();
    }
  }, [selectedAdsDetail]);

  const initialValue = useMemo(() => {
    if (selectedAdsDetail) {
      if (selectedAdsDetail?.adImageUrl) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedAdsDetail?.adImageUrl}`
        );
      }
      return {
        adTitle: selectedAdsDetail?.adTitle,
        adType: selectedAdsDetail?.adType,
        adUrl: selectedAdsDetail?.adUrl,
        adImageUrl: selectedAdsDetail?.adImageUrl || "",
      };
    }
    return {
      adTitle: "",
      adType: "",
      adUrl: "",
      adImageUrl: "",
    };
  }, [selectedAdsDetail]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/image`,
        formData,
        {
          headers: {
            Authorization: `${tkn}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response ACCEPT:", response.data);

      return response.data.data;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (values: any, setSubmitting: any) => {
    let tkn = localStorage.getItem("auth-token");

    try {
      const payload: any = {
        adTitle: values.adTitle,
        adType: values.adType,
        adUrl: values.adUrl,
        adImageUrl: values.adImageUrl,
      };
      console.log(payload, "payload");
      if (selectedAdsDetail?._id) {
        payload.adId = selectedAdsDetail._id;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/update-ad`,
          payload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        toast({
          title: "Success",
          description: "Partner updated successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("ad_controls"));
      } else {
        payload.adID = selectedAdsDetail?._id
          ? selectedAdsDetail.adID
          : lastAdId;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControls/create-ad`,
          payload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        toast({
          title: "Success",
          description: "Partner added successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("ad_controls"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("ad_controls"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>{selectedAdsDetail ? "Update" : "Add"} New AD</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addAdsValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                <Form className={styles.addAdsForm}>
                  <div className={styles.addAdsFieldsMain}>
                    <div className={styles.addAdsLastDiv}>
                      <h4 className={styles.detailHeading}>Ad Details</h4>
                      <div className={styles.addMemberDiv}>
                        <div
                          className={styles.addMemLeft}
                          onClick={() =>
                            document.getElementById("ad-upload")?.click()
                          }
                        >
                          <img src="/icons/add.svg" alt="add" />
                        </div>
                        <Input
                          id="ad-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const imageId = await handleImageUpload(file);
                                setFieldValue("adImageUrl", imageId);
                                setPreviewImage(URL.createObjectURL(file));
                              } catch (error) {
                                e.target.value = "";
                                setFieldValue("adImageUrl", "");
                              }
                            }
                          }}
                        />
                        <p>{previewImage ? "Change" : "Add"} AD Image</p>
                      </div>
                      {previewImage && (
                        <div>
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        </div>
                      )}
                      <div className={styles.addAdsFlexDiv}>
                        <div className={styles.adsPointDiv}>
                          <p>Ad ID</p>
                          <span className={styles.adsSpanDiv}>
                            {selectedAdsDetail?._id
                              ? selectedAdsDetail.adID
                              : lastAdId}
                          </span>
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
                          <div className={styles.dropdownSelectDiv}>
                            <Select
                              name="adType"
                              options={adTypeOptions}
                              placeholder="Select Ad Type"
                              styles={customStyles}
                              value={findSelectedOption(
                                adTypeOptions,
                                values.adType
                              )}
                              onChange={(option: any) =>
                                setFieldValue("adType", option.value)
                              }
                            />
                          </div>
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
                      {isSubmitting
                        ? "Submitting..."
                        : selectedAdsDetail
                        ? "Update AD"
                        : "Add AD"}
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
