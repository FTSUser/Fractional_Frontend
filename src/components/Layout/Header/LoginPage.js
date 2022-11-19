import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as userUtil from "../../../Helpers/utils/user.util";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";

const LoginPage = (props) => {
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    props.getStatus(loginModalOpen);
    props.getStatusForSignUp(signupModalOpen);
  }, [loginModalOpen]);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!loginData.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }
    if (!loginData.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    setErrors(errors);
    return formIsValid;
  };

  const loginSuccess = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let data = {
        email: loginData.email,
        password: loginData.password,
      };
      await ApiPostNoAuth("admin/login", data)
        .then((res) => {
          setLoginModalOpen(false);
          toast.success("Login Successful");
          userUtil.setUserInfo(res.data.payload.admin);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="login-banner-blur">
        <div className="login-modal-design">
          <div
            className="modal-close-icon"
            onClick={() => setLoginModalOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                fill="#191C1F"
              ></path>
            </svg>
          </div>
          <div className="modal-body">
            <h2>Log into your account</h2>
            <div className="modal-left-right-align">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  className="login-name-field"
                  value={loginData.email}
                  onChange={(e) => onhandleChange(e)}
                />

                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["email"]}
                </span>

                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => onhandleChange(e)}
                />
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["password"]}
                </span>
              </div>
              <div className="login-div">
                <button className="log-btn" onClick={(e) => loginSuccess(e)}>
                  <div className="btn--main-login">Log In</div>
                </button>
              </div>

              <div className="modal-bottom-text">
                <p>
                  Already have not an account?{" "}
                  <button
                    className="btn-sign-up"
                    onClick={() => {
                      setSignupModalOpen(true);
                      setLoginModalOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
