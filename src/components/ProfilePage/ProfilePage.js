import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "./ProfilePage.scss";
import Auth from "../../Helpers/auth";
import UserDocument from "./UserDocument";
import { countryList } from "../../Helpers/utils/countryList";
import { ApiDelete, ApiGet, ApiPut } from "../../Helpers/Api/ApiData";
import { countryCodes } from "../../Helpers/utils/countryCode";
import { useAtom } from "jotai";
import { loginFlagAtom, profileMenuAtom } from "../../atom/loginFlagAtom";

export default function ProfilePage() {
  const [userDataFind, setUserDataFind] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const userId = JSON.parse(localStorage.getItem("userinfo"));
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [activeTab, setActiveTab] = useAtom(profileMenuAtom);
  const [loginFlag, setLoginFlag] = useAtom(loginFlagAtom);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCountryCode, setUserCountryCode] = useState("");
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, [userDataFind]);



  const Logout = async () => {
    await Auth.deauthenticateUser();
    history.push("/");
  };

  const handleAddProfileDetails = (e) => {
    const { name, value } = e.target;
    if (name === "profilePhoto") {
      let fileType = e.target.files[0].type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setUserData({ ...userData, [name]: e.target.files[0] });
        setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        toast.error("Please upload jpg or png file");
      }
    } else if (name === "pincode") {
      let val = e.target.value.replace(/\D/g, "");
      setUserData({ ...userData, [name]: val });
    } else {
      setUserData({ ...userData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
    setDisableSaveButton(false);
  };

  useEffect(() => {
    if (userData?.email === "null") {
      setUserData({ ...userData, email: "" });
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.phone === "null") {
      setUserData({ ...userData, phone: "" });
    }
  }, [userData]);

  const FormValidationForProfile = () => {
    let errors = {};
    let formIsValid = true;
    // if (!userData.profilePhoto) {
    //     formIsValid = false;
    //     errors["profilePhoto"] = "*Upload your profile Photo.";
    // }
    if (!userData.fullName) {
      formIsValid = false;
      errors["fullName"] = "*Please enter your full name";
    }
    // if (!userData.country) {
    //   formIsValid = false;
    //   errors["country"] = "*Please select country.";
    // }
    if (!userData.address1) {
      formIsValid = false;
      errors["address1"] = "*Please enter your address.";
    }
    // if (!userData.address2) {
    //     formIsValid = false;
    //     errors["address2"] = "*Please enter your address.";
    // }
    // if (!userData.address3) {
    //     formIsValid = false;
    //     errors["address3"] = "*Please enter your address.";
    // }
    // if (!userData.dob) {
    //   formIsValid = false;
    //   errors["dob"] = "*Please enter your date of birth.";
    // }
    if (userEmail !== "" && typeof userEmail !== "undefined") {
      let lastAtPos = userEmail?.lastIndexOf("@");
      let lastDotPos = userEmail?.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          userEmail.indexOf("@@") === -1 &&
          userEmail.indexOf("..") === -1 &&
          lastDotPos > 2 &&
          userEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "*Please enter a valid email";
      }
    }
    if (!userData.state) {
      formIsValid = false;
      errors["state"] = "*Please enter your state";
    }
    if (!userData.city) {
      formIsValid = false;
      errors["city"] = "*Please enter your city";
    }
    if (!userData.pincode) {
      formIsValid = false;
      errors["pincode"] = "*Please enter your pin code";
    }
    if (!userData.pincode) {
      formIsValid = false;
      errors["pincode"] = "*Please enter your pin code";
    }
    setErrors(errors);
    return formIsValid;
  };

  const getUserData = async () => {
    await ApiGet(`admin/get-admin/${userId.id}`)
      .then((res) => {
        setUserData(res.data.payload?.admin[0]);
        setLoginFlag(true);
        setUserDataFind(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleUserDataUpdate = async (e) => {
    if (FormValidationForProfile()) {
      setLoading(true);
      const data = new FormData();
      data.append("profilePhoto", userData?.profilePhoto);
      data.append("fullName", userData.fullName);
      data.append("address1", userData.address1 ? userData.address1 : "undefined");
      if (userData?.dob) {
        data.append("dob", userData?.dob);
      }
      data.append(
        "address2",
        userData?.address2 ? userData?.address2 : "undefined"
      );
      data.append(
        "address3",
        userData?.address3 ? userData?.address3 : "undefined"
      );
      data.append("email", userEmail ? userEmail : userData.email);
      data.append("phone", userPhone ? userPhone : userData.phone);
      data.append("countryCode", userCountryCode ? userCountryCode : userData.countryCode);
      data.append("nationality", userData.nationality);
      data.append("state", userData?.state);
      data.append("country", userData?.country);
      data.append("pincode", userData?.pincode);
      data.append("city", userData.city);
      ApiPut(`admin/updateAdmin/${userId.id}`, data)
        .then((res) => {
          toast.success("Profile updated successfully");
          setDisableSaveButton(true);
          getUserData();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    }
  };

  const handleDeleteImage = () => {
    ApiPut(`admin/deleteImage/${userId.id}`)
      .then((res) => {
        setUserData({ ...userData, profilePhoto: "" })
        setProfileImagePreview()
        setDisableSaveButton(false);
      })
      .catch((err) => {
        console.log("err", err);
      })

  }

  return (
    <div>
      <div className="new-profile-page-banner">
        {/* <ToastContainer /> */}
        <div className="container">
          <div className="profile-page-left-right-alignment">
            <div className="page-title">
              {/* <h1>My Profile</h1> */}
              <h1>{activeTab === 1 ? "Profile Details" : activeTab === 2 ? "KYC Information" : ""}</h1>

            </div>
            {activeTab === 1 && (
              <>
                <div className="profile-image-upload">
                  <div className="remove-icon" onClick={() => handleDeleteImage()}>
                    <i class="fa-solid fa-close"></i>
                  </div>
                  <div className="profile-image-size">
                    {profileImagePreview ? <img
                      src={
                        profileImagePreview
                      }
                    /> : userData?.profilePhoto ? <img src={userData?.profilePhoto} /> : null}
                    <div className="upload-input-align">
                      <i class="fa-solid fa-camera"></i>

                      <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={(e) => handleAddProfileDetails(e)}
                      />
                    </div>
                    <span className="errors">{errors["profilePhoto"]}</span>
                  </div>
                </div>
                {/* <div
                  className="profile-imag-input"
                  style={{ alignItems: "center" }}
                >
                  <div className="new-input-grid-items">
                    <label className="profile-Image">Profile Image</label>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                  </div>
                </div> */}

                <div className="info-text-design">
                  <p style={{ color: "red" }}>Fill your Personal Information</p>
                </div>
                <div className="new-input-grid">
                  <div className="new-input-grid-items-disable">
                    <label>
                      Full Name<span>*</span>
                    </label>
                    <input
                      // disabled={
                      //   userData?.locked === false &&
                      //     userData?.personalInfo === true
                      //     ? true
                      //     : userData?.locked === true &&
                      //       userData?.personalInfo === false
                      //       ? true
                      //       : userData?.locked === true
                      //         ? true
                      //         : false
                      // }
                      disabled
                      name="fullName"
                      value={userData?.fullName}
                      onChange={(e) => handleAddProfileDetails(e)}
                      type=" text"
                    />
                    <span className="errors">{errors["fullName"]}</span>
                  </div>
                  {userData?.nationality === "nri" ? (
                    <div className="new-input-grid-items-disable">
                      <label>
                        E-Mail id<span>*</span>
                      </label>
                      <input
                        name="email"
                        // disabled={userData?.email}
                        value={
                          userEmail
                            ? userEmail
                            : userData?.email === "undefined"
                              ? ""
                              : userData?.email
                        }
                        type=" text"
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled
                      />
                      <span className="errors">{errors["email"]}</span>
                    </div>
                  ) : (
                    <div className="new-input-grid-items-disable">
                      <label>E-Mail id<span>*</span></label>
                      <input
                        name="email"
                        // disabled={userData?.email}
                        value={
                          userEmail
                            ? userEmail
                            : userData?.email === "undefined"
                              ? ""
                              : userData?.email
                        }
                        type=" text"
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled
                      />
                      <span className="errors">{errors["email"]}</span>
                    </div>
                  )}

                  {userData?.nationality === "nri" ? (
                    <div className={userData?.phone === "undefined" ? "new-input-grid-items" : userData?.phone ? "new-input-grid-items-disable" : "new-input-grid-items"}>
                      <label>
                        Mobile Number
                        {/* <span>*</span> */}
                      </label>
                      <div style={{ display: "flex" }}>
                        <select
                          name="countryCode"
                          value={userCountryCode ? userCountryCode : userData.countryCode}
                          onChange={(e) => setUserCountryCode(e.target.value)}
                          style={userData?.phone ? { backgroundColor: "#c6c6c6", width: "35%", marginRight: "10px", opacity: "1" } : { width: "35%", marginRight: "10px" }}
                          disabled={userData?.phone === "undefined" ? false : userData?.phone ? true : false}
                        >
                          <option value="">Select</option>
                          {countryCodes?.map((item, index) => {
                            return (
                              <option
                                value={item?.code}
                                selected={item?.code === userData?.countryCode}
                              >
                                {item?.country}
                              </option>
                            );
                          })}
                        </select>

                        <input
                          // disabled={userData?.phone}
                          value={
                            userPhone
                              ? userPhone
                              : userData?.phone === "undefined"
                                ? ""
                                : userData?.phone}
                          name="phone"
                          type=" text"
                          // disabled={userData?.nationality === "indian"}
                          disabled={userData?.phone === "undefined" ? false : userData?.phone ? true : false}

                          onChange={(e) => setUserPhone(e.target.value)}
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="new-input-grid-items-disable">
                      <label>
                        Mobile Number
                        <span>*</span>
                      </label>
                      <div style={{ display: "flex" }}>
                        <select
                          name="countryCode"

                          // value={dataSubmit.countryCode}
                          // onChange={(e) => onhandleChange(e)}
                          style={{ width: "35%", marginRight: "10px", backgroundColor: "#c6c6c6", opacity: "1" }}
                          disabled={userData?.phone}
                        >
                          <option value="">Select</option>
                          {countryCodes?.map((item, index) => {
                            return (
                              <option
                                value={item?.code}
                                selected={item?.code === userData?.countryCode}
                              >
                                {item?.country}
                              </option>
                            );
                          })}
                        </select>

                        <input
                          // disabled={userData?.phone}
                          value={
                            userPhone
                              ? userPhone
                              : userData?.phone === "undefined"
                                ? ""
                                : userData?.phone}
                          name="phone"
                          type=" text"
                          disabled={userData?.nationality === "indian"}
                          onChange={(e) => setUserPhone(e.target.value)}
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* <div className="new-input-grid-items"></div> */}

                  <div className="new-input-grid-items">
                    <label>
                      Date of Birth
                      {/* <span>*</span> */}
                    </label>
                    <input
                      name="dob"
                      type="date"
                      value={
                        userData?.dob
                          ? moment(userData?.dob).format("YYYY-MM-DD")
                          : ""
                      }
                      max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["dob"]}</span>
                  </div>
                  {/* {userData?.nationality === "nri" && */}
                  <div className="kyc-info-alignment">
                    <div className="new-input-grid-items">
                      <label>
                        Category<span>*</span>
                      </label>
                      <input
                        style={{ backgroundColor: "#c6c6c6" }}
                        value={
                          userData?.nationality === "nri" ? "Non-Indian" : "Indian"
                        }
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="new-input-grid-items">
                    {userData?.nationality === "nri" && (
                      <>
                        <label>
                          Nationality
                          {/* <span>*</span> */}
                        </label>
                        <select
                          name="country"
                          value={userData?.country}
                          onChange={(e) => handleAddProfileDetails(e)}
                        >
                          <option value="">Select country</option>
                          {countryList?.map((country) => {
                            return (
                              <option value={country.country}>
                                {country.country}
                              </option>
                            );
                          })}
                        </select>
                        <span className="errors">{errors["country"]}</span>
                      </>
                    )}
                  </div>
                  {/* } */}
                  <div className="new-input-grid-items">
                    <label>
                      Address<span>*</span>
                    </label>
                    <input
                      placeholder="Line 1"
                      type="text"
                      name="address1"
                      value={userData?.address1 === "undefined" ? "" : userData?.address1}
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["address1"]}</span>
                  </div>
                  <div
                    className="new-input-grid-items"
                    style={{ margin: "2px 0 0 0" }}
                  >
                    <input
                      placeholder="Line 2 (Optional)"
                      type=" text"
                      name="address2"
                      style={{ marginTop: "30px" }}
                      value={
                        userData?.address2 === "undefined"
                          ? ""
                          : userData?.address2
                      }
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["address2"]}</span>
                  </div>
                  <div className="new-input-grid-items">
                    <input
                      placeholder="Line 3 (Optional)"
                      type=" text"
                      name="address3"
                      value={
                        userData?.address3 === "undefined"
                          ? ""
                          : userData?.address3
                      }
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["address3"]}</span>
                  </div>
                </div>
                <div className="three-input-grid">
                  <div className="new-input-grid-items">
                    <label>
                      State<span>*</span>
                    </label>
                    <input
                      placeholder="State"
                      name="state"
                      type=" text"
                      onChange={(e) => handleAddProfileDetails(e)}
                      value={userData?.state}
                    />
                    <span className="errors">{errors["state"]}</span>
                  </div>
                  <div className="new-input-grid-items">
                    <label>
                      City<span>*</span>
                    </label>
                    <input
                      placeholder="City"
                      name="city"
                      value={userData?.city}
                      type="text"
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["city"]}</span>
                  </div>
                  <div className="new-input-grid-items">
                    <label>
                      Pincode<span>*</span>
                    </label>
                    <input
                      placeholder="Pincode"
                      name="pincode"
                      maxLength={userData?.nationality === "indian" ? 6 : null}
                      type="text"
                      value={userData?.pincode}
                      onChange={(e) => handleAddProfileDetails(e)}
                    />
                    <span className="errors">{errors["pincode"]}</span>
                  </div>

                </div>
                {!loading && <div className="save-button-align">
                  <button disabled={disableSaveButton} style={disableSaveButton ? { backgroundColor: "#ca9a9a" } : { backgroundColor: "#e83b3b" }} onClick={handleUserDataUpdate}>Save</button>
                </div>}
                {loading && (
                  <div className="save-button-align">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  </div>
                )}
              </>
            )}
            {activeTab === 2 && (
              <UserDocument
                userData={userData}
                getUserData={(data) => setUserDataFind(data)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
