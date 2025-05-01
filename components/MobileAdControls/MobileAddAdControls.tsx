// import { useToast } from "@chakra-ui/react";
// import { Input } from "antd";
// import axios from "axios";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { selectedProjects } from "../redux/actions";
// import styles from "./addadcontrols.module.scss";
// import type { MenuProps } from "antd";
// import { Dropdown } from "antd";

// const addAdsValidationSchema = Yup.object().shape({
//   adPublisherId: Yup.string().required("AD publisher Id is required"),
//   adDeviceType: Yup.string().required("Ad Type id is required"),
// });

// const MobileAddAdControls = () => {
//   const dispatch = useDispatch();
//   const toast = useToast();
//   const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
//   console.log(selectedAdsDetail, "selectedAdsDetail");
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [lastAdId, setLastAdId] = useState<string>("ENAD0000");
//   const [selectedDeviceType, setSelectedDeviceType] = useState("Android");
//   const [selectedADType, setSelectedADType] = useState("Google");
//   const [selectedType, setSelectedType] = useState("Banner");

//   const getDropdownItems = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "android",
//       label: "Android",
//       onClick: () => {
//         setSelected("Android");
//       },
//     },
//     {
//       key: "ios",
//       label: "iOS",
//       onClick: () => {
//         setSelected("iOS");
//       },
//     },
//   ];

//   const getDropdownTypes = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "banner",
//       label: "Banner",
//       onClick: () => {
//         setSelected("banner");
//       },
//     },
//     {
//       key: "interstitial",
//       label: "Interstitial",
//       onClick: () => {
//         setSelected("interstitial");
//       },
//     },
//   ];

//   const getDropdownADTypeItems = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "google",
//       label: "Google",
//       onClick: () => {
//         setSelected("google");
//       },
//     },
//     {
//       key: "facebook",
//       label: "Facebook",
//       onClick: () => {
//         setSelected("facebook");
//       },
//     },
//   ];

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
//         publisherId: selectedAdsDetail?.adPublisherId,
//         adDeviceType: selectedAdsDetail?.adDeviceType,
//         // adUrl: selectedAdsDetail?.adUrl,
//         adImageUrl: selectedAdsDetail?.adImageUrl || "",
//       };
//     }
//     return {
//       adPublisherId: "",
//       adDeviceType: "",
//       // adUrl: "",
//       adImageUrl: "",
//     };
//   }, [selectedAdsDetail]);

//   const handleSubmit = async (values: any, setSubmitting: any) => {
//     let tkn = localStorage.getItem("auth-token");

//     try {
//       const payload: any = {
//         // adId: selectedAdsDetail?._id ? selectedAdsDetail.adID : lastAdId,
//         adType: selectedADType,
//         adDeviceType: selectedDeviceType,
//         publisherID: values.adPublisherId,
//         bannerId: values.bannerId,
//         interstitialId: values.interstitialId,
//         // adUrl: values.adUrl,
//       };
//       console.log(payload, "payload");
//       if (selectedAdsDetail?._id) {
//         payload.adId = selectedAdsDetail._id;
//         const response = await axios.patch(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/update-ad`,
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
//           description: "Ad updated successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("mobilead_controls"));
//       } else {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/create-ad`,
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
//           description: "Ad added successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("mobilead_controls"));
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
//           onClick={() => dispatch(selectedProjects("mobilead_controls"))}
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
//                       <div className={styles.addAdSelectionDiv}>
//                         <h4 className={styles.detailHeading}>
//                           {selectedDeviceType} Ad
//                         </h4>
//                         <div className={styles.addAdSelection}>
//                           <Dropdown
//                             menu={{
//                               items: getDropdownItems(setSelectedDeviceType),
//                             }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedDeviceType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                           <Dropdown
//                             menu={{
//                               items: getDropdownADTypeItems(setSelectedADType),
//                             }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedADType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                         </div>
//                       </div>

//                       <div className={styles.inputDiv}>
//                         <label htmlFor="adPublisherId" className={styles.text}>
//                           AdMob Publisher ID
//                         </label>
//                         <Field
//                           type="text"
//                           name="adPublisherId"
//                           id="adPublisherId"
//                           placeholder="Enter Ad publisher Id"
//                           className={`${styles.input} ${
//                             touched.adPublisherId && errors.adPublisherId
//                               ? styles.inputError
//                               : ""
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="adPublisherId"
//                           component="div"
//                           className={styles.errMes}
//                         />
//                       </div>
//                       <div className={styles.inputDiv}>
//                         <label htmlFor="adDeviceType" className={styles.text}>
//                           <Dropdown
//                             menu={{ items: getDropdownTypes(setSelectedType) }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                         </label>
//                         <Field
//                           type="adDeviceType"
//                           name="adDeviceType"
//                           id="adDeviceType"
//                           placeholder={`Enter ${selectedType} Ad type id`}
//                           className={`${styles.input} ${
//                             touched.adDeviceType && errors.adDeviceType
//                               ? styles.inputError
//                               : ""
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="adDeviceType"
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

// export default MobileAddAdControls;

// import { useToast } from "@chakra-ui/react";
// import { Input } from "antd";
// import axios from "axios";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { selectedProjects } from "../redux/actions";
// import styles from "./addadcontrols.module.scss";
// import type { MenuProps } from "antd";
// import { Dropdown } from "antd";

// // Updated validation schema with bannerId and interstitialId fields
// const addAdsValidationSchema = Yup.object().shape({
//   adPublisherId: Yup.string().required("AD publisher Id is required"),
//   bannerId: Yup.string().when("selectedType", {
//     is: "Banner",
//     then: () => Yup.string().required("Banner ID is required"),
//     otherwise: () => Yup.string(),
//   }),
//   interstitialId: Yup.string().when("selectedType", {
//     is: "Interstitial",
//     then: () => Yup.string().required("Interstitial ID is required"),
//     otherwise: () => Yup.string(),
//   }),
// });

// const MobileAddAdControls = () => {
//   const dispatch = useDispatch();
//   const toast = useToast();
//   const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
//   console.log(selectedAdsDetail, "selectedAdsDetail");
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [lastAdId, setLastAdId] = useState<string>("ENAD0000");
//   const [selectedDeviceType, setSelectedDeviceType] = useState("Android");
//   const [selectedADType, setSelectedADType] = useState("Google");
//   const [selectedType, setSelectedType] = useState("Banner");

//   const getDropdownItems = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "android",
//       label: "Android",
//       onClick: () => {
//         setSelected("Android");
//       },
//     },
//     {
//       key: "ios",
//       label: "iOS",
//       onClick: () => {
//         setSelected("iOS");
//       },
//     },
//   ];

//   const getDropdownTypes = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "banner",
//       label: "Banner",
//       onClick: () => {
//         setSelected("Banner");
//       },
//     },
//     {
//       key: "interstitial",
//       label: "Interstitial",
//       onClick: () => {
//         setSelected("Interstitial");
//       },
//     },
//   ];

//   const getDropdownADTypeItems = (
//     setSelected: (value: string) => void
//   ): MenuProps["items"] => [
//     {
//       key: "google",
//       label: "Google",
//       onClick: () => {
//         setSelected("Google");
//       },
//     },
//     {
//       key: "facebook",
//       label: "Facebook",
//       onClick: () => {
//         setSelected("Facebook");
//       },
//     },
//   ];

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

//       // Set the ad type based on what fields exist in the selected ad
//       if (selectedAdsDetail?.bannerId) {
//         setSelectedType("Banner");
//       } else if (selectedAdsDetail?.interstitialId) {
//         setSelectedType("Interstitial");
//       }

//       return {
//         adPublisherId: selectedAdsDetail?.publisherID || "",
//         bannerId: selectedAdsDetail?.bannerId || "",
//         interstitialId: selectedAdsDetail?.interstitialId || "",
//         adImageUrl: selectedAdsDetail?.adImageUrl || "",
//       };
//     }
//     return {
//       adPublisherId: "",
//       bannerId: "",
//       interstitialId: "",
//       adImageUrl: "",
//     };
//   }, [selectedAdsDetail]);

//   const handleSubmit = async (values: any, { setSubmitting }: any) => {
//     let tkn = localStorage.getItem("auth-token");

//     try {
//       const payload: any = {
//         adType: selectedADType,
//         deviceType: selectedDeviceType,
//         publisherID: values.adPublisherId,
//         // selectedType: selectedType,
//       };

//       if (selectedType === "Banner") {
//         payload.bannerId = values.bannerId;
//       } else if (selectedType === "Interstitial") {
//         payload.interstitialId = values.interstitialId;
//       }

//       console.log(payload, "payload");

//       if (selectedAdsDetail?._id) {
//         payload.adId = selectedAdsDetail._id;
//         const response = await axios.patch(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/update-ad`,
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
//           description: "Ad updated successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("mobilead_controls"));
//       } else {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/create-ad`,
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
//           description: "Ad added successfully",
//           status: "success",
//           position: "top-right",
//           isClosable: true,
//         });
//         dispatch(selectedProjects("mobilead_controls"));
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast({
//         title: "Error",
//         description: "Failed to save ad. Please try again.",
//         status: "error",
//         position: "top-right",
//         isClosable: true,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className={styles.pSubRightDiv}>
//         <button
//           className={styles.backMainDiv}
//           onClick={() => dispatch(selectedProjects("mobilead_controls"))}
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
//               enableReinitialize={true}
//             >
//               {({ isSubmitting, touched, errors, setFieldValue }) => (
//                 <Form className={styles.addAdsForm}>
//                   <div className={styles.addAdsFieldsMain}>
//                     <div className={styles.addAdsLastDiv}>
//                       <div className={styles.addAdSelectionDiv}>
//                         <h4 className={styles.detailHeading}>
//                           {selectedDeviceType} Ad
//                         </h4>
//                         <div className={styles.addAdSelection}>
//                           <Dropdown
//                             menu={{
//                               items: getDropdownItems(setSelectedDeviceType),
//                             }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedDeviceType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                           <Dropdown
//                             menu={{
//                               items: getDropdownADTypeItems(setSelectedADType),
//                             }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedADType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                         </div>
//                       </div>

//                       <div className={styles.inputDiv}>
//                         <label htmlFor="adPublisherId" className={styles.text}>
//                           AdMob Publisher ID
//                         </label>
//                         <Field
//                           type="text"
//                           name="adPublisherId"
//                           id="adPublisherId"
//                           placeholder="Enter Ad publisher Id"
//                           className={`${styles.input} ${
//                             touched.adPublisherId && errors.adPublisherId
//                               ? styles.inputError
//                               : ""
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="adPublisherId"
//                           component="div"
//                           className={styles.errMes}
//                         />
//                       </div>

//                       {/* <div className={styles.inputDiv}>
//                         <label htmlFor="adType" className={styles.text}>
//                           {/* Ad Type
//                           <Dropdown
//                             menu={{ items: getDropdownTypes(setSelectedType) }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                         </label>
//                       </div> */}

//                       {/* {selectedType === "Banner" && ( */}
//                       <div className={styles.inputDiv}>
//                         <label htmlFor="bannerId" className={styles.text}>
//                           <Dropdown
//                             menu={{ items: getDropdownTypes(setSelectedType) }}
//                             trigger={["hover"]}
//                             placement="bottomRight"
//                           >
//                             <div className={styles.monthsDropdown}>
//                               <div className={styles.monthsLabel}>
//                                 <p>{selectedType}</p>
//                                 <div className={styles.dropdownArrow}>
//                                   <img
//                                     src="/icons/dashdownarrow.svg"
//                                     alt="dropdownarrow"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </Dropdown>
//                         </label>
//                         <Field
//                           type="text"
//                           name="bannerId"
//                           id="bannerId"
//                           placeholder="Enter Banner Ad ID"
//                           className={`${styles.input} ${
//                             touched.bannerId && errors.bannerId
//                               ? styles.inputError
//                               : ""
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="bannerId"
//                           component="div"
//                           className={styles.errMes}
//                         />
//                       </div>
//                       {/* )} */}

//                       {/* {selectedType === "Interstitial" && (
//                         <div className={styles.inputDiv}>
//                           <label
//                             htmlFor="interstitialId"
//                             className={styles.text}
//                           >
//                             Interstitial Ad ID
//                           </label>
//                           <Field
//                             type="text"
//                             name="interstitialId"
//                             id="interstitialId"
//                             placeholder="Enter Interstitial Ad ID"
//                             className={`${styles.input} ${
//                               touched.interstitialId && errors.interstitialId
//                                 ? styles.inputError
//                                 : ""
//                             }`}
//                           />
//                           <ErrorMessage
//                             name="interstitialId"
//                             component="div"
//                             className={styles.errMes}
//                           />
//                         </div>
//                       )} */}
//                     </div>

//                     <button
//                       type="submit"
//                       className={styles.addAdsBtn}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting
//                         ? "Submitting..."
//                         : selectedAdsDetail
//                         ? "Update AD"
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

// export default MobileAddAdControls;

import { useToast } from "@chakra-ui/react";
import { Input } from "antd";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./addadcontrols.module.scss";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

// Updated validation schema with dynamic adId field
const addAdsValidationSchema = Yup.object().shape({
  adPublisherId: Yup.string().required("AD publisher Id is required"),
  adId: Yup.string().required("Ad ID is required"),
});

const MobileAddAdControls = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedAdsDetail = useSelector((state: any) => state.selectedDetails);
  console.log(selectedAdsDetail, "selectedAdsDetail");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lastAdId, setLastAdId] = useState<string>("ENAD0000");
  const [selectedDeviceType, setSelectedDeviceType] = useState("Android");
  const [selectedADType, setSelectedADType] = useState("Google");
  const [selectedType, setSelectedType] = useState("Banner");

  const getDropdownItems = (
    setSelected: (value: string) => void
  ): MenuProps["items"] => [
    {
      key: "android",
      label: "Android",
      onClick: () => {
        setSelected("Android");
      },
    },
    {
      key: "ios",
      label: "iOS",
      onClick: () => {
        setSelected("iOS");
      },
    },
  ];

  const getDropdownTypes = (
    setSelected: (value: string) => void
  ): MenuProps["items"] => [
    {
      key: "banner",
      label: "Banner",
      onClick: () => {
        setSelected("Banner");
      },
    },
    {
      key: "interstitial",
      label: "Interstitial",
      onClick: () => {
        setSelected("Interstitial");
      },
    },
  ];

  const getDropdownADTypeItems = (
    setSelected: (value: string) => void
  ): MenuProps["items"] => [
    {
      key: "google",
      label: "Google",
      onClick: () => {
        setSelected("Google");
      },
    },
    {
      key: "facebook",
      label: "Facebook",
      onClick: () => {
        setSelected("Facebook");
      },
    },
  ];

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

      // Set the ad type based on what fields exist in the selected ad
      if (selectedAdsDetail?.bannerId) {
        setSelectedType("Banner");
        return {
          adPublisherId: selectedAdsDetail?.publisherID || "",
          adId: selectedAdsDetail?.bannerId || "",
          adImageUrl: selectedAdsDetail?.adImageUrl || "",
        };
      } else if (selectedAdsDetail?.interstitialId) {
        setSelectedType("Interstitial");
        return {
          adPublisherId: selectedAdsDetail?.publisherID || "",
          adId: selectedAdsDetail?.interstitialId || "",
          adImageUrl: selectedAdsDetail?.adImageUrl || "",
        };
      }

      return {
        adPublisherId: selectedAdsDetail?.publisherID || "",
        adId: "",
        adImageUrl: selectedAdsDetail?.adImageUrl || "",
      };
    }
    return {
      adPublisherId: "",
      adId: "",
      adImageUrl: "",
    };
  }, [selectedAdsDetail]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    let tkn = localStorage.getItem("auth-token");

    try {
      const payload: any = {
        adType: selectedADType.toLocaleLowerCase(),
        deviceType: selectedDeviceType.toLocaleLowerCase(),
        publisherID: values.adPublisherId,
      };

      if (selectedType === "Banner") {
        payload.bannerId = values.adId;
      } else if (selectedType === "Interstitial") {
        payload.interstitialId = values.adId;
      }

      console.log(payload, "payload");

      if (selectedAdsDetail?._id) {
        payload.adId = selectedAdsDetail._id;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/update-ad`,
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
          description: "Ad updated successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("mobilead_controls"));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/adControlsForApp/create-ad`,
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
          description: "Ad added successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("mobilead_controls"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save ad. Please try again.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("mobilead_controls"))}
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
              enableReinitialize={true}
            >
              {({ isSubmitting, touched, errors, setFieldValue }) => (
                <Form className={styles.addAdsForm}>
                  <div className={styles.addAdsFieldsMain}>
                    <div className={styles.addAdsLastDiv}>
                      <div className={styles.addAdSelectionDiv}>
                        <h4 className={styles.detailHeading}>
                          {selectedDeviceType} Ad
                        </h4>
                        <div className={styles.addAdSelection}>
                          <Dropdown
                            menu={{
                              items: getDropdownItems(setSelectedDeviceType),
                            }}
                            trigger={["hover"]}
                            placement="bottomRight"
                          >
                            <div className={styles.monthsDropdown}>
                              <div className={styles.monthsLabel}>
                                <p>{selectedDeviceType}</p>
                                <div className={styles.dropdownArrow}>
                                  <img
                                    src="/icons/dashdownarrow.svg"
                                    alt="dropdownarrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </Dropdown>
                          <Dropdown
                            menu={{
                              items: getDropdownADTypeItems(setSelectedADType),
                            }}
                            trigger={["hover"]}
                            placement="bottomRight"
                          >
                            <div className={styles.monthsDropdown}>
                              <div className={styles.monthsLabel}>
                                <p>{selectedADType}</p>
                                <div className={styles.dropdownArrow}>
                                  <img
                                    src="/icons/dashdownarrow.svg"
                                    alt="dropdownarrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </Dropdown>
                        </div>
                      </div>

                      <div className={styles.inputDiv}>
                        <label htmlFor="adPublisherId" className={styles.text}>
                          AdMob Publisher ID
                        </label>
                        <Field
                          type="text"
                          name="adPublisherId"
                          id="adPublisherId"
                          placeholder="Enter Ad publisher Id"
                          className={`${styles.input} ${
                            touched.adPublisherId && errors.adPublisherId
                              ? styles.inputError
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="adPublisherId"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>

                      <div className={styles.inputDiv}>
                        <label htmlFor="adDeviceType" className={styles.text}>
                          <Dropdown
                            menu={{ items: getDropdownTypes(setSelectedType) }}
                            trigger={["hover"]}
                            placement="bottomRight"
                          >
                            <div className={styles.monthsDropdown}>
                              <div className={styles.monthsLabel}>
                                <p>{selectedType}</p>
                                <div className={styles.dropdownArrow}>
                                  <img
                                    src="/icons/dashdownarrow.svg"
                                    alt="dropdownarrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </Dropdown>
                        </label>
                        <Field
                          type="text"
                          name="adId"
                          id="adId"
                          placeholder={`Enter ${selectedType} ID`}
                          className={`${styles.input} ${
                            touched.adId && errors.adId ? styles.inputError : ""
                          }`}
                        />
                        <ErrorMessage
                          name="adId"
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

export default MobileAddAdControls;
