import React, { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import "./ProfilePage.scss";
import { ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { loginFlagAtom } from "../../atom/loginFlagAtom";
import IndianUserDocument from "./IndianUserDocument";
import NRIUserDocument from "./NRIUserDocument";

function UserDocument(props) {

  const inputElement = useRef();
  const { userData } = props;

  const [errors, setErrors] = useState({});
  const [documentType, setDocumentType] = useState(
    userData?.dType ? userData?.dType : "passport"
  );
  const [documentDetails, setDocumentDetails] = useState();
  const [isIfscTrue, setIsIfscTrue] = useState(false);
  const [loginFlag, setLoginFlag] = useAtom(loginFlagAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDocumentDetails(userData);
  }, [userData]);

  const handleSetDocymentType = (e) => {
    inputElement.current.value = "";
    setDocumentType(e.target.value);
    setDocumentDetails({
      ...documentDetails,
      number: "",
      issueDate: "",
      expiryDate: "",
      placeOfIssue: "",
      passport: "",
    });
  };

  const handleSetDocumentDetails = (e) => {
    const { name, value } = e.target;
    if (name === "bank") {
      let fileType = e.target.files[0].type;
      if (fileType === "application/pdf" || fileType === "image/jpeg" || fileType === "image/png") {
        setDocumentDetails({ ...documentDetails, [name]: e.target.files[0] });
      } else {
        toast.error("Please upload only pdf file");
      }
    } else if (name === "passport" && documentType === "drivingLicense") {
      if (e.target.files[0].size > 4000000) {
        toast.error("File size should be less than 4MB");
      } else {
        setDocumentDetails({ ...documentDetails, [name]: e.target.files[0] });
      }
    } else if (name === "passport" && documentType !== "drivingLicense") {
      // if (e.target.files[0].size > 2000000) {
      //   toast.error("File size should be less than 2MB");
      // } else {
      //   setDocumentDetails({ ...documentDetails, [name]: e.target.files });
      // }
      if (e.target.files.length > 2) {
        setDocumentDetails({ ...documentDetails, [name]: [] });
        return toast.error("Please Select only 2 images");
      } else {
        setDocumentDetails({ ...documentDetails, [name]: e.target.files });
      }
    } else if (name === "PANcard") {
      if (e.target.files[0].size > 4000000) {
        toast.error("File size should be less than 4MB");
      } else {
        setDocumentDetails({ ...documentDetails, [name]: e.target.files[0] });
      }
    } else if (name === "issueDate" || name === "expiryDate") {
      setDocumentDetails({ ...documentDetails, [name]: value });
    } else if (name === "dob") {
      setDocumentDetails({ ...documentDetails, [name]: value });
    } else if (name === "bankAccountNumber") {
      let val = value.replace(/[^0-9]/g, "");
      setDocumentDetails({ ...documentDetails, [name]: val });
    } else {
      let val = value.replace(/[^\w\s]/gi, "");
      setDocumentDetails({ ...documentDetails, [name]: val });
    }
    setErrors({ ...errors, [name]: "" });
  };


  const handleFormValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!documentDetails.bank) {
      formIsValid = false;
      errors["bank"] = "Please upload bank statement";
    }
    if (documentType === "passport" && documentDetails.passport.length === 0) {
      formIsValid = false;
      errors["passport"] = "Please upload your passport";
    }
    if (documentType === "adharCard" && documentDetails.passport.length === 0) {
      formIsValid = false;
      errors["passport"] = "Please upload your aadhaar card";
    }
    if (documentType === "drivingLicense" && !documentDetails.passport) {
      formIsValid = false;
      errors["passport"] = "Please upload your driving license";
    }
    if (documentDetails?.nationality === "indian" && !documentDetails.PANcard) {
      formIsValid = false;
      errors["PANcard"] = "Please upload your PAN card";
    }
    if (!documentDetails.dob) {
      formIsValid = false;
      errors["dob"] = "Please enter your date of birth";
    }
    if (documentType === "drivingLicense" && !documentDetails.number) {
      formIsValid = false;
      errors["number"] = "Please enter your driving license number";
    }
    if (documentType === "passport" && !documentDetails.number) {
      formIsValid = false;
      errors["number"] = "Please enter your passport number";
    }
    if (documentType === "adharCard" && !documentDetails.number) {
      formIsValid = false;
      errors["number"] = "Please enter your aadhaar number";
    }
    if (documentType === "passport" && !documentDetails.issueDate) {
      formIsValid = false;
      errors["issueDate"] = "Please enter your passport issue date";
    }
    if (documentType === "drivingLicense" && !documentDetails.issueDate) {
      formIsValid = false;
      errors["issueDate"] = "Please enter your driving license issue date";
    }
    if (documentType === "drivingLicense" && !documentDetails.expiryDate) {
      formIsValid = false;
      errors["expiryDate"] = "Please enter your driving license expiry date";
    }
    if (documentType === "passport" && !documentDetails.expiryDate) {
      formIsValid = false;
      errors["expiryDate"] = "Please enter passport expiry date";
    }
    if (documentType === "passport" && !documentDetails.placeOfIssue) {
      formIsValid = false;
      errors["placeOfIssue"] = "Please enter your place of issue";
    }
    if (!documentDetails.bankName) {
      formIsValid = false;
      errors["bankName"] = "Please enter your bank name";
    }
    if (!documentDetails.bankAccountNumber) {
      formIsValid = false;
      errors["bankAccountNumber"] = "Please enter your bank account number";
    }
    if (!documentDetails.bankIfscCode) {
      formIsValid = false;
      errors["bankIfscCode"] = "Please enter your bank IFSC code";
    }
    if (
      documentDetails?.nationality === "nri" &&
      !documentDetails.bankIfscCode
    ) {
      formIsValid = false;
      errors["bankIfscCode"] = "Please enter your swift code";
    }
    if (!documentDetails.bankAddress) {
      formIsValid = false;
      errors["bankAddress"] = "Please enter your bank address";
    }
    if (
      documentDetails?.nationality === "indian" &&
      !documentDetails.PANnumber
    ) {
      formIsValid = false;
      errors["PANnumber"] = "Please enter your PAN number";
    }
    // if (!documentDetails.fullName) {
    //   formIsValid = false;
    //   errors["fullName"] = "Please enter full Name";
    // }
    if (documentDetails?.nationality === "indian" && documentDetails?.isBankVerified === false && !isIfscTrue) {
      formIsValid = false;
      errors["bankIfscCode"] = "Please verify your IFSC code";
      // toast.error("Please verify your IFSC code");
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleIfscFormValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!documentDetails.bankIfscCode) {
      formIsValid = false;
      errors["bankIfscCode"] = "Please enter your bank IFSC code";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleIfscVerify = async () => {
    if (!bankDetailsDisabled) {
      if (handleIfscFormValidation()) {
        let data = {
          bankIfscCode: documentDetails.bankIfscCode,
        };
        await ApiPost("admin/checkIfscCode", data)
          .then((res) => {
            // if (res.data.message === "Success") {
            toast.success("IFSC code verified successfully");
            setDocumentDetails({
              ...documentDetails,
              bankIfscCode: res.data.payload.bank.IFSC,
              bankAddress: res.data.payload.bank.ADDRESS,
              bankName: res.data.payload.bank.BANK,
            });
            setIsIfscTrue(true);
            // }
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setIsIfscTrue(false);
          });
      }
    };
  }

  const handleUserDocumentAdd = async (e) => {
    if (handleFormValidation()) {
      setLoading(true);
      if (documentType === "passport") {
        if (documentDetails?.nationality === "indian") {
          const data = new FormData();
          data.append("dType", documentType);
          data.append("number", documentDetails?.number);
          data.append("fullName", documentDetails.fullName);
          for (let i = 0; i < documentDetails?.passport.length; i++) {
            data.append("passport", documentDetails?.passport[i]);
          }
          data.append("issueDate", documentDetails?.issueDate);
          data.append("expiryDate", documentDetails?.expiryDate);
          data.append("placeOfIssue", documentDetails?.placeOfIssue);
          data.append("bankName", documentDetails?.bankName);
          data.append("PANcard", documentDetails?.PANcard);
          data.append("PANnumber", documentDetails?.PANnumber);
          data.append("dob", documentDetails.dob);
          data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
          data.append("bankIfscCode", documentDetails?.bankIfscCode);
          data.append("bankAddress", documentDetails?.bankAddress);
          data.append("bank", documentDetails?.bank);
          await ApiPut(`admin/updateAdmin/${userData._id}`, data)
            .then((res) => {
              props.getUserData(true);
              toast.success("Document updated successfully");
              setLoading(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setLoading(false);
            });
        } else {
          const data = new FormData();
          data.append("dType", documentType);
          data.append("number", documentDetails?.number);
          data.append("fullName", documentDetails.fullName);
          for (let i = 0; i < documentDetails?.passport.length; i++) {
            data.append("passport", documentDetails?.passport[i]);
          }
          // data.append("passport", documentDetails?.passport);
          data.append("issueDate", documentDetails?.issueDate);
          data.append("expiryDate", documentDetails?.expiryDate);
          data.append("placeOfIssue", documentDetails?.placeOfIssue);
          data.append("bankName", documentDetails?.bankName);
          // data.append("PANcard", documentDetails?.PANcard)
          // data.append("PANnumber", documentDetails?.PANnumber)
          data.append("dob", documentDetails.dob);
          data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
          data.append("bankIfscCode", documentDetails?.bankIfscCode);
          data.append("bankAddress", documentDetails?.bankAddress);
          data.append("bank", documentDetails?.bank);
          await ApiPut(`admin/updateAdmin/${userData._id}`, data)
            .then((res) => {
              props.getUserData(true);
              setLoading(false);
              toast.success("Document updated successfully");
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setLoading(false);
            });
        }
      } else if (documentType === "drivingLicense") {
        const data = new FormData();
        data.append("dType", documentType);
        data.append("number", documentDetails?.number);
        data.append("passport", documentDetails?.passport);
        data.append("dob", documentDetails.dob);
        data.append("expiryDate", documentDetails?.expiryDate);
        data.append("issueDate", documentDetails?.issueDate);
        data.append("bankName", documentDetails?.bankName);
        data.append("PANcard", documentDetails?.PANcard);
        data.append("fullName", documentDetails.fullName);
        data.append("PANnumber", documentDetails?.PANnumber);
        data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
        data.append("bankIfscCode", documentDetails?.bankIfscCode);
        data.append("bankAddress", documentDetails?.bankAddress);
        data.append("bank", documentDetails?.bank);
        await ApiPut(`admin/updateAdmin/${userData._id}`, data)
          .then((res) => {
            props.getUserData(true);
            setLoading(false);
            toast.success("Document updated successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
          });
      } else {
        const data = new FormData();
        data.append("dType", documentType);
        data.append("number", documentDetails?.number);
        for (let i = 0; i < documentDetails?.passport.length; i++) {
          data.append("passport", documentDetails?.passport[i]);
        }
        // data.append("issueDate", documentDetails?.issueDate)
        data.append("fullName", documentDetails.fullName);
        data.append("bankName", documentDetails?.bankName);
        data.append("PANcard", documentDetails?.PANcard);
        data.append("PANnumber", documentDetails?.PANnumber);
        data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
        data.append("bankIfscCode", documentDetails?.bankIfscCode);
        data.append("bankAddress", documentDetails?.bankAddress);
        data.append("dob", documentDetails.dob);
        data.append("bank", documentDetails?.bank);
        await ApiPut(`admin/updateAdmin/${userData._id}`, data)
          .then((res) => {
            props.getUserData(true);
            setLoading(false);
            toast.success("Document updated successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
          });
      }
    }
  };

  const handleSubmitDocument = async (e) => {
    if (handleFormValidation()) {
      setLoading(true);
      if (documentType === "passport") {
        const data = new FormData();
        data.append("dType", documentType);
        data.append("number", documentDetails?.number);
        data.append("fullName", documentDetails.fullName);
        for (let i = 0; i < documentDetails?.passport.length; i++) {
          data.append("passport", documentDetails?.passport[i]);
        }
        data.append("issueDate", documentDetails?.issueDate);
        data.append("expiryDate", documentDetails?.expiryDate);
        data.append("placeOfIssue", documentDetails?.placeOfIssue);
        data.append("bankName", documentDetails?.bankName);
        data.append("PANcard", documentDetails?.PANcard);
        data.append("PANnumber", documentDetails?.PANnumber);
        data.append("dob", documentDetails.dob);
        data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
        data.append("bankIfscCode", documentDetails?.bankIfscCode);
        data.append("bankAddress", documentDetails?.bankAddress);
        data.append("bank", documentDetails?.bank);
        data.append("locked", true);
        await ApiPut(`admin/updateAdmin/${userData._id}`, data)
          .then((res) => {
            props.getUserData(true);
            setLoginFlag(true);
            setLoading(false);
            toast.success("Document Submitted successfully");
            // window.location.reload();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
          });
      } else if (documentType === "drivingLicense") {
        const data = new FormData();
        data.append("dType", documentType);
        data.append("number", documentDetails?.number);
        data.append("dob", documentDetails.dob);
        data.append("passport", documentDetails?.passport);
        data.append("fullName", documentDetails.fullName);
        data.append("expiryDate", documentDetails?.expiryDate);
        data.append("issueDate", documentDetails?.issueDate);
        data.append("bankName", documentDetails?.bankName);
        data.append("PANcard", documentDetails?.PANcard);
        data.append("PANnumber", documentDetails?.PANnumber);
        data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
        data.append("bankIfscCode", documentDetails?.bankIfscCode);
        data.append("bankAddress", documentDetails?.bankAddress);
        data.append("bank", documentDetails?.bank);
        data.append("locked", true);
        await ApiPut(`admin/updateAdmin/${userData._id}`, data)
          .then((res) => {
            props.getUserData(true);
            setLoginFlag(true);
            setLoading(false);
            // window.location.reload();

            toast.success("Document Submitted successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
          });
      } else {
        const data = new FormData();
        data.append("dType", documentType);
        data.append("number", documentDetails?.number);
        data.append("fullName", documentDetails.fullName);
        data.append("dob", documentDetails.dob);
        for (let i = 0; i < documentDetails?.passport.length; i++) {
          data.append("passport", documentDetails?.passport[i]);
        }
        // data.append("issueDate", documentDetails?.issueDate)
        data.append("bankName", documentDetails?.bankName);
        data.append("PANcard", documentDetails?.PANcard);
        data.append("PANnumber", documentDetails?.PANnumber);
        data.append("bankAccountNumber", documentDetails?.bankAccountNumber);
        data.append("bankIfscCode", documentDetails?.bankIfscCode);
        data.append("bankAddress", documentDetails?.bankAddress);
        data.append("bank", documentDetails?.bank);
        data.append("locked", true);
        await ApiPut(`admin/updateAdmin/${userData._id}`, data)
          .then((res) => {
            props.getUserData(true);
            setLoginFlag(true);
            setLoading(false);
            // window.location.reload();

            toast.success("Document Submitted successfully");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.response.data.message);
          });
      }
    }
  };

  const personalInfoDisable =
    documentDetails?.locked === false && documentDetails?.personalInfo === true
      ? true
      : documentDetails?.locked === true &&
        documentDetails?.personalInfo === false
        ? true
        : documentDetails?.locked === true
          ? true
          : false;
  const bankDetailsDisabled =
    documentDetails?.locked === false &&
      documentDetails?.isBankVerified === true
      ? true
      : documentDetails?.locked === true &&
        documentDetails?.isBankVerified === false
        ? true
        : documentDetails?.locked === true
          ? true
          : false;
  const passportDetailsDisable =
    documentDetails?.locked === false &&
      documentDetails?.isPassportVerified === true
      ? true
      : documentDetails?.locked === true &&
        documentDetails?.isPassportVerified === false
        ? true
        : documentDetails?.locked === true
          ? true
          : false;

  return (
    <>
      {userData?.nationality === "nri" ? (
        <>
          {" "}
          <NRIUserDocument
            errors={errors}
            handleUserDocumentAdd={handleUserDocumentAdd}
            handleSubmitDocument={handleSubmitDocument}
            handleSetDocumentDetails={handleSetDocumentDetails}
            bankDetailsDisabled={bankDetailsDisabled}
            documentDetails={documentDetails}
            passportDetailsDisable={passportDetailsDisable}
            personalInfoDisable={personalInfoDisable}
            loading={loading}
          />
        </>
      ) : (
        <>
          <IndianUserDocument
            passportDetailsDisable={passportDetailsDisable}
            bankDetailsDisabled={bankDetailsDisabled}
            personalInfoDisable={personalInfoDisable}
            documentDetails={documentDetails}
            handleIfscVerify={handleIfscVerify}
            inputElement={inputElement}
            handleUserDocumentAdd={handleUserDocumentAdd}
            handleSubmitDocument={handleSubmitDocument}
            documentType={documentType}
            handleSetDocymentType={handleSetDocymentType}
            userData={userData}
            errors={errors}
            loading={loading}
            handleSetDocumentDetails={handleSetDocumentDetails}
          />
        </>
      )}
    </>
  );
}

export default UserDocument;
