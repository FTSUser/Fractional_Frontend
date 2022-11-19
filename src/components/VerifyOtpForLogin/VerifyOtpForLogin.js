import React, { useState, useEffect } from "react";
import "./VerifyOtp.scss";
import { useAtom } from "jotai";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as userUtil from "../../Helpers/utils/user.util";
import * as authUtil from "../../Helpers/utils/auth.util";
import { ApiPostNoAuth } from "../../Helpers/Api/ApiData";
import { loginFlagAtom } from "../../atom/loginFlagAtom";

export default function VerifyOtpForLogin(props) {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loginOtp, setLoginOtp] = useState("");
  const [counter, setCounter] = useState(59);
  const [loginFlag, setLoginFlag] = useAtom(loginFlagAtom);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!loginOtp) {
      formIsValid = false;
      errors["code"] = "*Please enter OTP";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const userDetails = JSON.parse(localStorage.getItem("uName"));

      if (userDetails?.email) {
        let data = {
          email: userDetails.email,
          phone: userDetails.phone,
          nationality: userDetails?.nationality,
          countryCode: userDetails?.countryCode,
          code: loginOtp,
        };
        await ApiPostNoAuth("admin/login", data)
          .then((res) => {
            toast.success("Login Successful");
            userUtil.setUserInfo(res.data.payload.admin);
            authUtil.setToken(res.data.payload.token);
            setLoginFlag(true);
            localStorage.removeItem("uName");
            history.push("/profilepage");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error("OTP verification failed");
          });
      } else {
        let data = {
          phone: userDetails.phone,
          email: userDetails.email,
          nationality: userDetails?.nationality,
          countryCode: userDetails?.countryCode,
          code: loginOtp,
        };
        await ApiPostNoAuth("admin/login", data)
          .then((res) => {
            toast.success("Login Successful");
            userUtil.setUserInfo(res.data.payload.admin);
            authUtil.setToken(res.data.payload.token);
            localStorage.removeItem("uName");
            setLoginFlag(true);
            history.push("/profilepage");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error("OTP verification failed");
          });
      }
    }
  };

  const loginSuccess = async () => {
    const userDetails = JSON.parse(localStorage.getItem("uName"));
    // if (validateForm()) {
    if (userDetails?.nationality === "indian") {
      let data = {
        phone: userDetails.phone,
        nationality: userDetails?.nationality,
        countryCode: userDetails?.countryCode,
      };
      await ApiPostNoAuth("admin/verify-phone", data)
        .then((res) => {
          toast.success("OTP re-sent Successful");
          setCounter(59);
          // history.push("/verifyotpforlogin")
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      let data = {
        email: userDetails.email,
        nationality: userDetails?.nationality,
        countryCode: userDetails?.countryCode,
      };
      await ApiPostNoAuth("admin/verify-email", data)
        .then((res) => {
          setCounter(59);
          toast.success("OTP re-sent Successful");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      // }
    }
  };

  return (
    <div>
      <div className="new-login-banner">
        {/* <ToastContainer /> */}
        <div className="container">
          <div className="login-box-center">
            <div className="loin-box">
              <h1>Verify OTP</h1>
              <p>
                Welcome to <span>Our Leisure Home</span>
              </p>
              <div className="cus-input">
                <label>
                  OTP<span>*</span>
                </label>
                <div className="relative-verify">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="code"
                    maxLength={6}
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value)}
                  />
                  <div className="verify-text-alignment-input">
                    {counter > 0 ? (
                      <a>00:{counter}</a>
                    ) : (
                      <a onClick={() => loginSuccess()}>Resend OTP</a>
                    )}
                  </div>
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors["code"]}
                </span>
              </div>
              <div className="all-ready-account">
                <span>
                  Don't have an account ?{" "}
                  <a onClick={() => history.push("/SignUp")}>Sign Up</a>
                </span>
              </div>
              {!loading &&<div className="login-button">
                <button onClick={(e) => handleNewPassword(e)}>Verify</button>
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
