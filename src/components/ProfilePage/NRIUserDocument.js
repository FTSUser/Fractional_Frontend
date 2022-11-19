import React from "react";
import moment from "moment";
import "./ProfilePage.scss";

function NRIUserDocument(props) {
  const {
    errors,
    handleUserDocumentAdd,
    handleSubmitDocument,
    handleSetDocumentDetails,
    bankDetailsDisabled,
    passportDetailsDisable,
    personalInfoDisable,
    documentDetails,
    loading,
  } = props;

  var date = new Date();
  let minDateTodayToOneDayAfter = moment(date).add(1, "days").format("YYYY-MM-DD");

  return (
    <>
      <div className="new-input-grid">
        <div className="kyc-info-alignment">
          <div className="new-input-grid-items">
            <label>Category</label>
            <input
              value={documentDetails?.nationality === "nri" ? "Non-Indian" : "Indian"}
              type="text"
              disabled
            />
          </div>
        </div>
        <div className="new-input-grid-items">
          <label>
            Full Name<span>*</span>
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
            Date of Birth
            <span>*</span>
          </label>
          <input
            disabled={personalInfoDisable}
            // disabled
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
        <div className="new-input-grid-items">
          <label>Choose Document Type</label>
          <input value="Passport" type="text" disabled />
        </div>
        <div className="new-input-grid-items">
          <label>
            Passport (Pdf or JPG format - Max 4 MB)<span>*</span>
          </label>
          <input
            disabled={passportDetailsDisable}
            name="passport"
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["passport"]}</span>
        </div>
        <div className="new-input-grid-items">
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
          <span className="errors"> {errors["placeOfIssue"]} </span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Passsport No.<span>*</span>
          </label>
          <input
            disabled={passportDetailsDisable}
            placeholder="Passsport No."
            type="text"
            name="number"
            maxLength={14}
            value={documentDetails?.number}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["number"]} </span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Passport Issue Date<span>*</span>
          </label>
          <input
            disabled={passportDetailsDisable}
            type="date"
            name="issueDate"
            value={
              documentDetails?.issueDate
                ? moment(documentDetails?.issueDate).format("YYYY-MM-DD")
                : ""
            }
            max={moment().format("YYYY-MM-DD")}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors"> {errors["issueDate"]}</span>
        </div>
        <div className="new-input-grid-items">
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
      </div>
      <br />
      <div className="info-text-design-sec info-text-design-sec-1">
        <p style={{ color: "red" }}>Please fill your Bank details here </p>
      </div>
      <div className="new-input-grid">
        <div className="new-input-grid-items">
          <label>
            Local Bank Name<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Enter bank name"
            type="text"
            name="bankName"
            value={documentDetails?.bankName}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["bankName"]}</span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Local Bank Account no<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Bank account No."
            type="text"
            maxLength={16}
            name="bankAccountNumber"
            value={documentDetails?.bankAccountNumber}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors">{errors["bankAccountNumber"]} </span>
        </div>
        <div className="new-input-grid-items">
          <label>
            Swift Code<span>*</span>
          </label>
          <input
            disabled={bankDetailsDisabled}
            placeholder="Swift Code"
            type="text"
            name="bankIfscCode"
            value={documentDetails?.bankIfscCode}
            onChange={(e) => handleSetDocumentDetails(e)}
          />
          <span className="errors"> {errors["bankIfscCode"]} </span>
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
          <span className="errors"> {errors["bank"]} </span>
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
            <button disabled={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable} onClick={handleUserDocumentAdd} style={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable ? { backgroundColor: "#ca9a9a" } : { backgroundColor: "#e83b3b" }}>Save</button>
          </div>
          <div className="save-button-align">
            <button disabled={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable} onClick={handleSubmitDocument} style={bankDetailsDisabled && personalInfoDisable && passportDetailsDisable ? { backgroundColor: "#ca9a9a" } : { backgroundColor: "#e83b3b" }}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default NRIUserDocument;
