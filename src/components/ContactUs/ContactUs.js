import React, { useEffect, useState } from "react";
import { ApiPost, ApiGet } from "../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.scss";
import useSWR from "swr";
import AboutImage1 from "../../Assets/Images/why.jpg";

export default function ContactUs() {
  const { data, error } = useSWR("companyDetails/getCompanyDetails", ApiGet);
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const [inputValue, setInputValue] = useState({
    fname: userDetails?.fullName,
    email: userDetails?.email,
    phone: userDetails?.phone === "undefined" ? "" : userDetails?.phone ? userDetails?.phone : "",
  });
  const [errors, setErrors] = useState({});
  const [companyDetail, setCompanyDetail] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    setCompanyDetail(data?.data?.payload?.companyDetails);
    if (error) {
      toast.error(error);
    }
  }, [data]);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (inputValue && !inputValue.phone) {
      formIsValid = false;
      errors["phone"] = "*Please Enter Phone Number";
    } else if (inputValue.phone && !inputValue.phone.match(/^\d{10}$/)) {
      formIsValid = false;
      errors["phone"] = "*Please Enter valid contact number";
    }
    // if (inputValue && !inputValue.lname) {
    //   formIsValid = false;
    //   errors["lname"] = "*Please Enter last name";
    // }
    if (inputValue && !inputValue.fname) {
      formIsValid = false;
      errors["fname"] = "*Please Enter full name";
    }
    if (inputValue && !inputValue.email) {
      formIsValid = true;
      errors["email"] = "*Please Enter Email!";
    } else if (
      inputValue.email &&
      !inputValue.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["email"] = "*Please Enter valid Email";
    }
    if (inputValue && !inputValue.message) {
      formIsValid = false;
      errors["message"] = "*Please Enter your query";
    }
    if (inputValue && !inputValue.type) {
      formIsValid = false;
      errors["type"] = "*Please select one option";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleOnChnage = (e) => {
    const { name } = e.target;
    if (e.target.name === "phone") {
      let val = e.target.value.replace(/\D/g, "");
      setInputValue({ ...inputValue, [name]: val });
      setErrors({ ...errors, [name]: "" });
    } else if (e.target.name === "fname") {
      let val = e.target.value.replace(/[^\w\s]/gi, "");
      setInputValue({ ...inputValue, [name]: val });
      setErrors({ ...errors, [name]: "" });
    } else if (e.target.name === "lname") {
      let val = e.target.value.replace(/[^\w\s]/gi, "");
      setInputValue({ ...inputValue, [name]: val });
      setErrors({ ...errors, [name]: "" });
    } else {
      const { name, value } = e.target;
      setInputValue({ ...inputValue, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handelCMS = (e) => {
    if (validateForm()) {
      if (inputValue?.email?.length > 0) {

        let Data = {
          fname: inputValue?.fname,
          // lname: inputValue?.lname,
          message: inputValue?.message,
          phone: inputValue?.phone,
          email: inputValue?.email,
          type: inputValue?.type,
        };
        ApiPost(`contactus/addContactusadmin`, Data)
          .then((res) => {
            if (res?.status === 200) {
              toast.success(res?.data?.message);
              setInputValue({
                fname: "",
                lname: "",
                message: "",
                phone: "",
                email: "",
                type: "",
              });
            }
          })
          .catch((err) => {
            console.log(err?.response?.data?.message);
          });
      } else {

        let Data = {
          fname: inputValue?.fname,
          // lname: inputValue?.lname,
          message: inputValue?.message,
          phone: inputValue?.phone,
          // email: inputValue?.email,
          type: inputValue?.type,
        };
        ApiPost(`contactus/addContactusadmin`, Data)
          .then((res) => {
            if (res?.status === 200) {
              toast.success(res?.data?.message);
              setInputValue({
                fname: "",
                lname: "",
                message: "",
                phone: "",
                email: "",
                type: "",
              });
            }
          })
          .catch((err) => {
            console.log(err?.response?.data?.message);
          });

      }

    }
  };
  return (
    <div>
      <div className="contact-section-alignment">
        <div className="contact-banner">
          <div className="container">
            <div>
              <h1>Contact Us</h1>
              <div className="child-text-center-align-contact">
                <p>
                  If you have any questions or would like to speak to us, please
                  contact us. We are ready for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="tell-us-section-alignment">
        <div className="container">
          <div className="contact-page-align">
            <h2>Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-grid-items">
                <div className="form-control">
                  <label>
                    Full Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    id="fname"
                    name="fname"
                    value={inputValue?.fname}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />
                  <span style={{ color: "red" }}>{errors["fname"]}</span>
                </div>
              </div>
              {/* <div className="contact-grid-items">
                <div className="form-control">
                  <label>
                    Last Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    id="lname"
                    name="lname"
                    value={inputValue?.lname}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />

                  <span style={{ color: "red" }}>{errors["lname"]}</span>
                </div>
              </div> */}
              <div className="contact-grid-items">
                <div className="form-control">
                  <label>Email ID<span>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Email ID"
                    id="email"
                    name="email"
                    value={inputValue?.email}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />
                  <span style={{ color: "red" }}>{errors["email"]}</span>
                </div>
              </div>
            </div>
            <div className="form-control contact-form-bottom-align">
              <label>
                Contact Number<span>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                id="phone"
                name="phone"
                value={inputValue?.phone}
                onChange={(e) => {
                  handleOnChnage(e);
                }}
              />
              <span style={{ color: "red" }}>{errors["phone"]}</span>
            </div>

            <div className="form-control contact-form-bottom-align">
              <label>
                Your Query<span>*</span>
              </label>
              <textarea
                placeholder="Enter Your Query"
                id="message"
                name="message"
                value={inputValue?.message}
                onChange={(e) => {
                  handleOnChnage(e);
                }}
              ></textarea>
              <span style={{ color: "red" }}>{errors["message"]}</span>
            </div>
            <div className="following-radio-button-alignment contact-form-bottom-align">
              <label>
                Select one of the following
                <span style={{ color: "red" }}>*</span>
              </label>
              <div className="all-radio-button-alignment">
                <div className="radio-button-design">
                  <input
                    type="radio"
                    name="type"
                    value="I am buyer"
                    checked={inputValue?.type === "I am buyer"}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />
                  <label for="type">I am buyer</label>
                </div>
                <div className="radio-button-design">
                  <input
                    type="radio"
                    name="type"
                    value="I am Seller"
                    checked={inputValue?.type === "I am Seller"}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />
                  <label for="type">I am Seller</label>
                </div>
                <div className="radio-button-design">
                  <input
                    type="radio"
                    name="type"
                    value="I am an agent or broker"
                    checked={inputValue?.type === "I am an agent or broker"}
                    onChange={(e) => {
                      handleOnChnage(e);
                    }}
                  />
                  <label for="type">I am an agent or broker</label>
                </div>

                <div className="radio-button-design"></div>
                <div className="radio-button-design"></div>
              </div>
              <span style={{ color: "red" }}>{errors["type"]}</span>
            </div>
            <div className="details-submit-button">
              <button
                onClick={() => {
                  handelCMS();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="about-grid-alignment">
        <div className="container">
          <div className="about-grid">
            <div className="about-grid-items">
              <img src={AboutImage1} alt="AboutImage1" />
            </div>
            <div className="about-grid-items">
              <h2>Our Office</h2>
              <p>
                <br /> {companyDetail?.address} <br />
                <span> Contact No</span> : {companyDetail?.phone}
                <br /> <span>Contact Email</span> : {companyDetail?.email}
                <br />
                <span>Hours of Operation</span> : {companyDetail?.hours}
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
