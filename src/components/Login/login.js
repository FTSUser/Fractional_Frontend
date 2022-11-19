import React, { useState, useEffect } from "react";
import "./login.scss";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ApiPostNoAuth } from "../../Helpers/Api/ApiData";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Login(props) {
  const history = useHistory();
  const [loginData, setLoginData] = useState({ countryCode: "+91" });
  const [errors, setErrors] = useState({});
  const [nationality, setNationality] = useState("indian");
  const [counter, setCounter] = useState("00");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  const onhandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let val = e.target.value.replace(/\D/g, "");
      setLoginData({ ...loginData, [name]: val });
    } else if (name === " email") {
      let val = e.target.value.replace(/\D/g, "");
      setLoginData({ ...loginData, [name]: val });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (nationality === "indian" && !loginData?.phone) {
      formIsValid = false;
      errors["phone"] = "*Please enter your mobile number";
    }
    if (nationality === "indian" && !loginData?.countryCode) {
      formIsValid = false;
      errors["countryCode"] = "*Please select your country Code";
    }
    if (nationality === "nri" && !loginData?.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your valid email id";
    }
    if (nationality === "nri" && typeof loginData?.email !== "undefined") {
      let lastAtPos = loginData.email.lastIndexOf("@");
      let lastDotPos = loginData.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          loginData.email.indexOf("@@") === -1 &&
          loginData.email.indexOf("..") === -1 &&
          lastDotPos > 2 &&
          loginData.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "*Please enter a valid email.";
      }
    }
    if (
      nationality === "indian" &&
      loginData?.email !== "" &&
      typeof loginData?.email !== "undefined"
    ) {
      let lastAtPos = loginData?.email?.lastIndexOf("@");
      let lastDotPos = loginData?.email?.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          loginData?.email.indexOf("@@") === -1 &&
          loginData?.email.indexOf("..") === -1 &&
          lastDotPos > 2 &&
          loginData?.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "*Please enter a valid email.";
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const loginSuccess = async (e) => {
    if (validateForm()) {
      setLoading(true)
      if (nationality === "indian") {
        let data = {
          phone: loginData.phone,
          countryCode: loginData?.countryCode,
          nationality: nationality,
          email: loginData.email,
        };
        await ApiPostNoAuth(`admin/checkEmail?phone=${loginData.phone}`)
          .then((res) => {
            localStorage.setItem("uName", JSON.stringify(data));
            ApiPostNoAuth("admin/verify-phone", data)
              .then((res) => {
                toast.success("OTP sent Successful");
                history.push("/verifyotpforlogin");
                setLoading(false)
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
                setLoading(false)
              });
          })
          .catch((err) => {
            // toast.error(err?.response?.data?.message);
            toast.error("This Mobile no or Email doesn’t exist");
            setLoading(false)
          });
      } else {
        let data = {
          email: loginData.email,
          nationality: nationality,
        };
        await ApiPostNoAuth(`admin/checkEmail?email=${loginData.email}`)
          .then((res) => {
            localStorage.setItem("uName", JSON.stringify(data));
            ApiPostNoAuth("admin/verify-email", data)
              .then((res) => {
                toast.success("OTP sent Successful");
                setLoading(false)
                history.push("/verifyotpforlogin");
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
                setLoading(false)
              });
          })
          .catch((err) => {
            // toast.error(err?.response?.data?.message);
            toast.error("This Mobile no or Email doesn’t exist");
            setLoading(false)
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
              <h1>Log In</h1>
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
                      checked={nationality === "indian"}
                      name="indian"
                      value="indian"
                      onChange={(e) => setNationality(e.target.value)}
                      onClick={() => setErrors({ ...errors, email: "" })}
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
                      checked={nationality === "nri"}
                      name="nri"
                      value="nri"
                      onChange={(e) => setNationality(e.target.value)}
                      onClick={() => setErrors({ ...errors, phone: "" })}
                    />
                  </div>
                  <div>
                    <label>Non-Indian</label>
                  </div>
                </div>
              </div>

              <label>
                Mobile No.{nationality === "indian" && <span>*</span>}
              </label>
              <div className="displaylogin">
                <div className="cus-input">
                  <PhoneInput
                    onChange={(e) => setLoginData({ ...loginData, countryCode: "+" + e })}
                    value={loginData.countryCode}
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
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="phone"
                    value={loginData.phone}
                    onChange={(e) => onhandleChange(e)}
                    maxLength={nationality === "indian" ? 10 : 15}
                  />
                  <span className="errors">{errors["phone"]}</span>
                </div>
              </div>
              <div className="cus-input">
                <label>Email ID{nationality === "nri" && <span>*</span>}</label>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => onhandleChange(e)}
                />
                <span className="errors">{errors["email"]}</span>
              </div>
              <div className="all-ready-account">
                <span>
                  Don't have an account ?{" "}
                  <a onClick={() => history.push("/SignUp")}>Sign Up</a>
                </span>
              </div>
              {!loading && <div className="login-button">
                <button onClick={(e) => loginSuccess(e)}>Log In</button>
              </div>}
              {loading && (
                <div className="login-button">
                  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
