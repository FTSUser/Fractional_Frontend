import React, { useState, useEffect } from "react";
import "./Header.scss";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";

const SignUp = (props) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(true);
  const [dataSubmit, setDataSubmit] = useState({});
  const [document, setDocument] = useState();
  const [errors, setErrors] = useState({});
  const [uploadFile, setUploadFile] = useState();

  useEffect(() => {
    props.getStatusData(signupModalOpen);
    props.getStatusDataForLogin(loginModalOpen);
  }, [signupModalOpen]);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setDataSubmit({ ...dataSubmit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddDocument = (e) => {
    const fileToUpload = e?.target?.files[0];
    // setUploadFile(fileToUpload)
    const data = new FormData();
    data.append("image", fileToUpload);
    data.append("fname", dataSubmit.fname);
    data.append("lname", dataSubmit.lname);
    data.append("email", dataSubmit.email);
    data.append("password", dataSubmit.password);
    data.append("phone", dataSubmit.phone);
    data.append("role", "61aa0389803e260c3821ad14");
    data.append("dType", dataSubmit.type);
    setDocument(data);
  };

  const FormValidation = () => {
    let errors = {};
    let valiedForm = true;
    if (!dataSubmit.fname) {
      valiedForm = false;
      errors["fname"] = "*Please enter first name";
    }
    if (!dataSubmit.lname) {
      valiedForm = false;
      errors["lname"] = "*Please enter last name";
    }
    if (!dataSubmit.email) {
      valiedForm = false;
      errors["email"] = "*Please enter email";
    }
    if (!dataSubmit.password) {
      valiedForm = false;
      errors["password"] = "*Plesae enter password";
    }
    if (!dataSubmit.phone) {
      valiedForm = false;
      errors["phone"] = "*Please enter mobile number";
    }
    if (!dataSubmit.type) {
      valiedForm = false;
      errors["type"] = "*Please select  type";
    }

    setErrors(errors);
    return valiedForm;
  };

  const SubmitForm = async (e) => {
    if (FormValidation()) {
      await ApiPostNoAuth("admin/signup", document)
        .then((res) => {
          if (res.status === 200) {
            toast.success("signup Successful");
            setSignupModalOpen(false);
          }
        })
        .catch((err) => {
          toast.error(err.respoance.data.message);
        });
    }
  };

  return (
    <>
      <div className="login-banner-blur">
        <div className="login-modal-design">
          <div
            className="modal-close-icon"
            onClick={() => setSignupModalOpen(false)}
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
            <h2>Create an Account</h2>
            <div className="modal-left-right-align">
              <div className="modal-form-grid ">
                <div className="modal-form-grid-items">
                  <div className="form-control">
                    <label className="form-lable">Enter FName</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="fname"
                      className="fname-field"
                      value={dataSubmit.fname}
                      onChange={(e) => onhandleChange(e)}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "14px",
                      }}
                    >
                      {errors["fname"]}
                    </span>
                  </div>
                  <div className="form-control bottom-align">
                    <label className="form-lable">Enter lname</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      name="lname"
                      value={dataSubmit.lname}
                      onChange={(e) => onhandleChange(e)}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "14px",
                      }}
                    >
                      {errors["lname"]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-control bottom-align">
                <label className="form-lable">Email Id</label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  name="email"
                  value={dataSubmit.email}
                  onChange={(e) => onhandleChange(e)}
                />
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors["email"]}
                </span>
              </div>

              <div className="form-control bottom-align-first">
                <label className="form-lable">Password</label>
                <input
                  type="password"
                  placeholder="Enter email password"
                  name="password"
                  value={dataSubmit.password}
                  onChange={(e) => onhandleChange(e)}
                />
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors["password"]}
                </span>
              </div>

              <div className="form-control bottom-align-first">
                <label className="form-lable">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="phone"
                  value={dataSubmit.mobile}
                  onChange={(e) => onhandleChange(e)}
                />
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors["phone"]}
                </span>
              </div>

              <div className="form-control bottom-align-first">
                <label className="form-lable">KYC document</label>
                <lable className="drop-type">type:</lable>
                <div className="drop-select">
                  <select
                    name="type"
                    value={dataSubmit.type}
                    onChange={(e) => onhandleChange(e)}
                  >
                    <option>Aadhaar Card</option>
                    <option>PAN Card</option>
                  </select>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "14px",
                    }}
                  >
                    {errors["type"]}
                  </span>
                  <div>
                    <input
                      type="file"
                      className="kyc-document"
                      name="img"
                      onChange={(e) => handleAddDocument(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="sign-up-div">
                <button
                  className="sign-up-btn"
                  onClick={(e) => {
                    SubmitForm(e);
                  }}
                >
                  Sign up
                </button>
              </div>

              <div className="modal-bottom-text">
                <p>
                  Already have not an account?{" "}
                  <button
                    className="btn-sign-in"
                    onClick={() => {
                      setSignupModalOpen(false);
                      setLoginModalOpen(true);
                    }}
                  >
                    Log in
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
export default SignUp;
