import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ApiPostNoAuth } from "../../Helpers/Api/ApiData";
import "./SignUp.scss";
import * as userUtil from "../../Helpers/utils/user.util";
import * as authUtil from "../../Helpers/utils/auth.util";
import { countryCodes } from "../../../src/Helpers/utils/countryCode";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SignUp() {
  const history = useHistory();
  const [dataSubmit, setDataSubmit] = useState({ countryCode: "+91" });
  const [errors, setErrors] = useState({});
  const [residenceData, setResidenceData] = useState("indian");
  const [verifyInput, setVerifyInput] = useState(false);
  const [signUpOtp, setSignUpOtp] = useState("");
  const [counter, setCounter] = useState("00");
  const [counterForEmail, setCounterEmail] = useState("00");
  const [resendOTP, setResendOTP] = useState(false);
  const [aggreeTerms, setAggreeTerms] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  useEffect(() => {
    const timer =
      counterForEmail > 0 &&
      setInterval(() => setCounterEmail(counterForEmail - 1), 1000);
    return () => clearInterval(timer);
  }, [counterForEmail]);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let val = e.target.value.replace(/\D/g, "");
      setErrors({ ...errors, [name]: "" });
      setDataSubmit({ ...dataSubmit, [name]: val });
    } else {
      setDataSubmit({ ...dataSubmit, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
    setErrors({ ...errors, ["phone"]: "" });
  }, [residenceData]);

  const FormValidation = () => {
    let errors = {};
    let valiedForm = true;
    if (!dataSubmit.fname) {
      valiedForm = false;
      errors["fname"] = "*Please enter your full name";
    }
    if (residenceData === "indian" && !dataSubmit.countryCode) {
      valiedForm = false;
      errors["countryCode"] = "*Please select your country code";
    }
    if (!dataSubmit.email) {
      valiedForm = false;
      errors["email"] = "*Please enter your valid email id";
    }
    if (residenceData === "nri" && typeof dataSubmit?.email !== "undefined") {
      let lastAtPos = dataSubmit?.email.lastIndexOf("@");
      let lastDotPos = dataSubmit?.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          dataSubmit?.email.indexOf("@@") === -1 &&
          dataSubmit?.email.indexOf("..") === -1 &&
          lastDotPos > 2 &&
          dataSubmit?.email.length - lastDotPos > 2
        )
      ) {
        valiedForm = false;
        errors["email"] = "*Please enter your valid email id";
      }
    }
    if (
      residenceData === "indian" &&
      dataSubmit?.email !== "" &&
      typeof dataSubmit?.email !== "undefined"
    ) {
      let lastAtPos = dataSubmit?.email?.lastIndexOf("@");
      let lastDotPos = dataSubmit?.email?.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          dataSubmit?.email.indexOf("@@") === -1 &&
          dataSubmit?.email.indexOf("..") === -1 &&
          lastDotPos > 2 &&
          dataSubmit?.email.length - lastDotPos > 2
        )
      ) {
        valiedForm = false;
        errors["email"] = "*Please enter your valid email id";
      }
    }
    if (residenceData === "indian" && !dataSubmit.phone) {
      valiedForm = false;
      errors["phone"] = "*Please enter your mobile number";
    }
    // if (resendOtpFlag && verifyInput && !signUpOtp) {
    //   valiedForm = false;
    //   errors["signUpOtp"] = "*Please enter OTP";
    // }
    if (!aggreeTerms) {
      valiedForm = false;
      errors["aggreeTerms"] = "*Please agree to terms and conditions";
    }
    setErrors(errors);
    return valiedForm;
  };

  const handleOTPvalidation = () => {
    let errors = {};
    let valiedForm = true;
    if (verifyInput && !signUpOtp) {
      valiedForm = false;
      errors["signUpOtp"] = "*Please enter OTP";
    }
    setErrors(errors);
    return valiedForm;
  };

  const SubmitForm = async (e) => {
    if (FormValidation()) {
      if (residenceData === "indian") {
        let data = {
          phone: dataSubmit.phone,
          nationality: residenceData,
          countryCode: dataSubmit?.countryCode,
        };
        await ApiPostNoAuth("admin/verify-phone", data)
          .then((res) => {
            toast.success("OTP sent Successful");
            setCounter(59);
            setCounterEmail("00");
            setResendOTP(true);
            setVerifyInput(true);
          })
          .catch((err) => {
            toast.error("OTP verification failed");
          });
      } else {
        let data = {
          email: dataSubmit.email,
          nationality: residenceData,
        };
        await ApiPostNoAuth("admin/verify-email", data)
          .then((res) => {
            toast.success("OTP sent Successful");
            setCounterEmail(59);
            setCounter("00");
            setResendOTP(true);
            setVerifyInput(true);
          })
          .catch((err) => {
            toast.error("OTP verification failed");
          });
      }
    }
  };
  const handleSignUp = async () => {
    if (FormValidation() && handleOTPvalidation()) {
      // if user hit submit without verifying phone or email
      if (!verifyInput)
        return toast.error("Please verify your mobile no or Email");
      if (dataSubmit?.phone && dataSubmit?.email) {
        const data = new FormData();
        data.append("fullName", dataSubmit.fname);
        data.append("nationality", residenceData);
        data.append("email", dataSubmit.email ? dataSubmit.email : null);
        data.append("phone", dataSubmit.phone ? dataSubmit.phone : null);
        data.append("code", signUpOtp);
        data.append("countryCode", dataSubmit.countryCode);
        data.append("role", "61aa0389803e260c3821ad14");
        await ApiPostNoAuth("admin/signup", data)
          .then((res) => {
            if (res?.data?.result === 0) {
              toast.success("Sign up Successful done");
              userUtil.setUserInfo(res.data.payload.admin);
              authUtil.setToken(res.data.payload.token);
              history.push("/profilepage");
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else if (dataSubmit?.email) {
        const data = new FormData();
        data.append("fullName", dataSubmit.fname);
        data.append("nationality", residenceData);
        data.append("email", dataSubmit.email ? dataSubmit.email : null);
        data.append("code", signUpOtp);
        // data.append("countryCode", dataSubmit.countryCode);
        data.append("role", "61aa0389803e260c3821ad14");
        await ApiPostNoAuth("admin/signup", data)
          .then((res) => {
            if (res?.data?.result === 0) {
              toast.success("Sign up Successful done");
              userUtil.setUserInfo(res.data.payload.admin);
              authUtil.setToken(res.data.payload.token);
              history.push("/profilepage");
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else if (dataSubmit?.phone) {
        const data = new FormData();
        data.append("fullName", dataSubmit.fname);
        data.append("nationality", residenceData);
        data.append("phone", dataSubmit.phone ? dataSubmit.phone : null);

        data.append("code", signUpOtp);
        data.append("countryCode", dataSubmit.countryCode);
        data.append("role", "61aa0389803e260c3821ad14");
        await ApiPostNoAuth("admin/signup", data)
          .then((res) => {
            if (res?.data?.result === 0) {
              toast.success("Sign up Successful done");
              userUtil.setUserInfo(res.data.payload.admin);
              authUtil.setToken(res.data.payload.token);
              history.push("/profilepage");
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

  return (
    <div>
      <div className="new-login-banner">
        {/* <ToastContainer /> */}
        <div className="container">
          <div className="login-box-center">
            <div className="loin-box">
              <h1>Sign Up</h1>
              <p>
                Welcome to <span>Our Leisure Home</span>
              </p>
              <label className="form-lable">
                Category<span>*</span>
              </label>
              <div className="radio-alignment-login-page">
                <div className="cus-input-radio-alignment">
                  <div>
                    <input
                      type="radio"
                      id="indian"
                      checked={residenceData === "indian"}
                      name="indian"
                      value="indian"
                      onChange={(e) => {
                        setResidenceData(e.target.value);
                        setDataSubmit({ fname: "", email: "", phone: "", countryCode: "+91" });
                      }}
                    />
                  </div>
                  <div>
                    <label>Indian</label>
                  </div>
                </div>
                <div className="cus-input-radio-alignment">
                  <div>
                    <input
                      type="radio"
                      id="nri"
                      checked={residenceData === "nri"}
                      name="nri"
                      value="nri"
                      onChange={(e) => {
                        setResidenceData(e.target.value);
                        setDataSubmit({ fname: "", email: "", phone: "", countryCode: "+1" });
                      }}
                    />
                  </div>
                  <div>
                    <label>Non-Indian</label>
                  </div>
                </div>
              </div>
              <div className="cus-input">
                <label>
                  Full Name<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="fname"
                  value={dataSubmit.fname}
                  onChange={(e) => onhandleChange(e)}
                />
                <span className="errors">{errors["fname"]}</span>
              </div>
              <div className="">
                <div className="cus-input">
                  <label>
                    Email ID<span>*</span>
                  </label>
                  <div className="relative-verify">
                    <input
                      type="text"
                      placeholder="Enter Email ID"
                      name="email"
                      value={dataSubmit.email}
                      onChange={(e) => onhandleChange(e)}
                    />
                    {residenceData === "nri" && !resendOTP ? (
                      <div className="verify-text-alignment-input">
                        <a onClick={() => SubmitForm()}>Verify</a>
                      </div>
                    ) : (
                      residenceData === "nri" && (
                        <div className="verify-text-alignment-input">
                          {counterForEmail > 0 ? (
                            // <a onClick={() => SubmitForm()}>
                            <a>00:{counterForEmail}</a>
                          ) : (
                            // </a>
                            <a
                              onClick={() => {
                                SubmitForm();
                              }}
                            >
                              Resend OTP
                            </a>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <span className="errors">{errors["email"]}</span>
                </div>
              </div>
              {residenceData === "nri" && verifyInput && (
                <div className="cus-input">
                  <label>
                    OTP<span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="code"
                    maxLength={6}
                    value={signUpOtp}
                    onChange={(e) => setSignUpOtp(e.target.value)}
                  />
                  <span className="errors">{errors["signUpOtp"]}</span>
                </div>
              )}
              <label className="mobile-display">
                Mobile No.{residenceData === "indian" && <span>*</span>}
              </label>
              <div className="displaylogin">
                <div className="cus-input">
                  <PhoneInput
                    onChange={(e) => setDataSubmit({ ...dataSubmit, countryCode: "+" + e })}
                    value={dataSubmit.countryCode}
                    inputProps={{
                      name: 'countryCode',
                      required: false,
                      autoFocus: false,
                      disabled: true,

                    }}
                    enableSearch={true}
                    disableSearchIcon={true}
                  />
                  <span className="errors">{errors["countryCode"]}</span>
                </div>
                <div className="cus-input">
                  <div className="relative-verify">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      name="phone"
                      disabled={resendOTP}
                      maxLength={residenceData === "indian" ? 10 : 15}
                      value={dataSubmit.phone}
                      onChange={(e) => onhandleChange(e)}
                    />

                    {residenceData === "indian" && !resendOTP ? (
                      <div className="verify-text-alignment-input">
                        <a onClick={() => SubmitForm()}>Verify</a>
                      </div>
                    ) : (
                      residenceData === "indian" && (
                        <div className="verify-text-alignment-input">
                          {counter > 0 ? (
                            <a>00:{counter}</a>
                          ) : (
                            <a
                              onClick={() => {
                                SubmitForm();
                              }}
                            >
                              Resend OTP
                            </a>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <span className="errors">{errors["phone"]}</span>
                </div>
              </div>
              {residenceData === "indian" && verifyInput && (
                <div className="cus-input">
                  <label>
                    OTP<span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="code"
                    maxLength={6}
                    value={signUpOtp}
                    onChange={(e) => setSignUpOtp(e.target.value)}
                  />
                  <span className="errors">{errors["signUpOtp"]}</span>
                </div>
              )}
              <div
                className={
                  !verifyInput ? "error-all-ready-account" : "all-ready-account"
                }
              >
                <span>
                  Already have an account ?{" "}
                  <a onClick={() => history.push("/Login")}>Log In</a>
                </span>
              </div>

              <div className="policy-confirm-alignment">
                <div className="input-design">
                  <input type="checkbox" onClick={() => { setAggreeTerms(!aggreeTerms); setErrors({ ...errors, ["aggreeTerms"]: "" }) }} />
                </div>
                <span>By clicking Sign Up, you agree to our <a className="blue-color" href="/termsofservice">Terms of Services</a> and confirm thay you habe read, understood, and agreed to our <a className="blue-color" href="/privacypolicy">Privacy Policy.</a></span>
              </div>
              <span className="errors">{errors["aggreeTerms"]}</span>

              <div className="login-button">
                <button
                  onClick={(e) => {
                    handleSignUp(e);
                  }}
                >
                  {" "}
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
