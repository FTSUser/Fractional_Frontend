import React from "react";
import moment from "moment";
import "./ProfilePage.scss";

function IndianUserDocument(props) {
  const {
    documentType,
    handleUserDocumentAdd,
    handleSubmitDocument,
    handleSetDocumentDetails,
    errors,
    handleSetDocymentType,
    inputElement,
    handleIfscVerify,
    documentDetails,
    personalInfoDisable,
    passportDetailsDisable,
    bankDetailsDisabled,
    loading,
  } = props;

  var date = new Date();
  let minDateTodayToOneDayAfter = moment(date).add(1, "days").format("YYYY-MM-DD");

  return (
    <>
      <div className="new-input-grid">
        <div className="kyc-info-alignment">
          <div className="new-input-grid-items">
            <label>
              Category
              {/* <span>*</span> */}
            </label>
            <input
              value={documentDetails?.nationality === "nri" ? "Non-Indian" : "Indian"}
              type="text"
              disabled
            />
          </div>
        </div>
        <div className="new-input-grid-items">
          <label>
            {/* Full Name<span>*</span> */}
            Full Name
          </label>
          <input
            // disabled={personalInfoDisable}
            disabled
            name="fullName"
            value={documentDetails?.fullName}
            onChange={(e) => handleSetDocumentDetails(e)}
            type=" text"
          />
          <span className="errors">{errors["fullName"]}</span>
        </div>
        <div className="new-input-grid-items">
          <label>
            {/* Date of Birth<span>*</span> */}
            Date of Birth
          </label>
          <input
            placeholder="DD/MM/YYYY"
            // disabled
            disabled={personalInfoDisable}
            name="dob"
            type="date"
            value={
              documentDetails?.dob
                ? moment(documentDetails?.dob).format("YYYY-MM-DD")
                : ""
            }
            max={moment().subtract(18, "years").format("YYYY-MM-DD")}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["dob"]}</span>
        </div>
      </div>
      <br />
      <div className="info-text-design-sec">
        <p style={{ color: "red" }}>Please fill your details here </p>
      </div>
      <div className="new-input-grid">
        <div className="new-input-grid-items-pancard">
          <label>
            Choose Document Type
            {/* <span>*</span> */}
          </label>
          <select
            disabled={passportDetailsDisable}
            value={documentType}
            onChange={(e) => handleSetDocymentType(e)}
          >
            <option value="adharCard">Aadhaar Card</option>
            <option value="passport">Passport</option>
            <option value="drivingLicense">Driving License</option>
          </select>
        </div>
        <div className="new-input-grid-items-pancard">
          <label>
            {documentType === "adharCard"
              ? "Aadhaar Card"
              : documentType === "passport"
                ? "Passport"
                : "Driving License"}{" "}
            (Pdf or JPG format - Max 4 MB)<span>*</span>
          </label>
          <input
            disabled={passportDetailsDisable}
            name="passport"
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => handleSetDocumentDetails(e)}
            // value={documentDetails?.passport}
            multiple={
              documentType === "passport" || documentType === "adharCard"
                ? true
                : false
            }
            ref={inputElement}
          />
          <span className="errors"> {errors["passport"]} </span>
        </div>
        <div className="new-input-grid-items-pancard">
          <label>
            {documentType === "adharCard"
              ? "Aadhaar"
              : documentType === "passport"
                ? "Passport"
                : "Driving License"}{" "}
            No.<span>*</span>
          </label>
          <div className="relative-input-div-verify">
            <input
              disabled={passportDetailsDisable}
              placeholder={
                documentType === "adharCard"
                  ? "Aadhaar Card No."
                  : documentType === "passport"
                    ? "Passport No."
                    : "Driving License No."
              }
              value={documentDetails?.number}
              type="text"
              name="number"
              maxLength={documentType === "adharCard" ? 12 : documentType === "passport" ? 20 : 12}
              onChange={(e) => handleSetDocumentDetails(e)}
            />
          </div>
          <span className="errors"> {errors["number"]}</span>
        </div>
        {documentType === "passport" || documentType === "drivingLicense" ? (
          <>
            <div className="new-input-grid-items-pancard">
              <label>
                {documentType === "adharCard"
                  ? "Aadhaar Card"
                  : documentType === "passport"
                    ? "Passport"
                    : "Driving License"}{" "}
                Issue Date<span>*</span>
              </label>
              <input
                disabled={passportDetailsDisable}
                type="date"
                value={
                  documentDetails?.issueDate
                    ? moment(documentDetails?.issueDate).format("YYYY-MM-DD")
                    : ""
                }
                name="issueDate"
                onChange={(e) => handleSetDocumentDetails(e)}
                max={moment().format("YYYY-MM-DD")}
              />
              <span className="errors">{errors["issueDate"]}</span>
            </div>
          </>
        ) : (
          ""
        )}
        {documentType === "passport" && (
          <>
            <div className="new-input-grid-items-pancard">
              <label>
                Place of Issue<span>*</span>
              </label>
              <input
                disabled={passportDetailsDisable}
                placeholder="Place of issue"
                type=" text"
                name="placeOfIssue"
                value={documentDetails?.placeOfIssue}
                onChange={(e) => handleSetDocumentDetails(e)}
              />
              <span className="errors">{errors["placeOfIssue"]} </span>
            </div>
            <div className="new-input-grid-items-pancard">
              <label>
                Passport Expiry Date <span>*</span>
              </label>
              <input
                disabled={passportDetailsDisable}
                type="date"
                name="expiryDate"
                value={
                  documentDetails?.expiryDate
                    ? moment(documentDetails?.expiryDate).format("YYYY-MM-DD")
                    : ""
                }
                min={minDateTodayToOneDayAfter}
                onChange={(e) => handleSetDocumentDetails(e)}
              />
              <span className="errors">{errors["expiryDate"]}</span>
            </div>
          </>
        )}
        {documentType === "drivingLicense" && (
          <>
            <div className="new-input-grid-items-pancard">
              <label>
                Driving License Expiry Date <span>*</span>
              </label>
              <input
                disabled={passportDetailsDisable}
                type="date"
                name="expiryDate"
                value={
                  documentDetails?.expiryDate
                    ? moment(documentDetails?.expiryDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => handleSetDocumentDetails(e)}
                min={moment().format("YYYY-MM-DD")}
              />
              <span className="errors">{errors["expiryDate"]}</span>
            </div>
          </>
        )}
      </div>
      <br />
      <div className="new-input-grid">
        <div className="new-input-grid-items-pancard">
          <label>
            {" "}
            PAN Card No.<span>*</span>
          </label>
          <div className="relative-input-div-verify">
            <input
              disabled={passportDetailsDisable}
              placeholder="PAN Card No."
              value={documentDetails?.PANnumber}
              type="text"
              maxLength={10}
              name="PANnumber"
              onChange={(e) => handleSetDocumentDetails(e)}
            />
          </div>
          <span className="errors"> {errors["PANnumber"]}</span>
        </div>
        <div className="new-input-grid-items-pancard">
          <label>
            PAN card (Pdf or JPG format - Max 4 MB)<span>*</span>
          </label>
          <input
            disabled={passportDetailsDisable}
            name="PANcard"
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["PANcard"]}</span>
        </div>
      </div>
      <br />
      <div className="info-text-design-sec info-text-design-sec-1">
        <p style={{ color: "red" }}>Please fill your Bank details here </p>
      </div>
      <div className="new-input-grid">
        <div className="new-input-grid-items">
          <label>
            Bank Name<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Enter Bank Name"
            type=" text"
            name="bankName"
            value={documentDetails?.bankName}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["bankName"]}</span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Bank Account no<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Bank account No."
            type=" text"
            name="bankAccountNumber"
            maxLength={16}
            value={documentDetails?.bankAccountNumber}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["bankAccountNumber"]} </span>
        </div>
        <div className="new-input-grid-items">
          <label>
            IFSC Code<span>*</span>
          </label>
          <div className="relative-input-div-verify">
            <input
              disabled={bankDetailsDisabled}
              placeholder="IFSC Code"
              type=" text"
              name="bankIfscCode"
              value={documentDetails?.bankIfscCode}
              onChange={(e) => handleSetDocumentDetails(e)}
            />
            <div className="text-right-alignment">
              <span onClick={() => handleIfscVerify()}>Verify</span>
            </div>
          </div>
          <span className="errors">{errors["bankIfscCode"]}</span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Bank Address<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Address"
            type="text"
            name="bankAddress"
            value={documentDetails?.bankAddress}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["bankAddress"]} </span>
        </div>
        <div className="new-input-grid-items">
          <label>
            {/* Upload PDF of Bank Passbook */}
            Upload Cancelled Cheque (Pdf or JPG format)
            <span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            name="bank"
            onChange={(e) => handleSetDocumentDetails(e)}
          ></input>
          <span className="errors"> {errors["bank"]}</span>
        </div>
      </div>
      {documentDetails?.isActive === false && bankDetailsDisabled && personalInfoDisable && passportDetailsDisable ? (
        <div className="profile-lock-message">
          <span>Your KYC is under review, so you cannot edit it.</span>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div className="loader-container-profile">
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="all-button-alignmen-profile-page">
          <div className="save-button-align">
            <button disabled={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable} style={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable ? { border: "1px solid #ca9a9a" } : { border: "1px solid #e83b3b" }} className="save-button" onClick={handleUserDocumentAdd}>Save</button>
          </div>
          <div className="save-button-align">
            <button disabled={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable} style={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable ? { backgroundColor: "#ca9a9a" } : { backgroundColor: "#e83b3b" }} onClick={handleSubmitDocument}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default IndianUserDocument;
