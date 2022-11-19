import React, { useEffect, useState } from "react";
import "./EasyScheduling.scss";
import { ApiPost, ApiGet } from "../../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";

export default function EasyScheduling() {
  //contact us functions
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [aboutus, setAboutus] = useState([]);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (inputValue && !inputValue.phone) {
      formIsValid = false;
      errors["phone"] = "*Please Enter Phone Number!";
    } else if (inputValue.phone && !inputValue.phone.match(/^\d{10}$/)) {
      formIsValid = false;
      errors["phone"] = "*Please Enter valid contact number!";
    }
    // if (inputValue && !inputValue.lname) {
    //   formIsValid = false;
    //   errors["lname"] = "*Please Enter last name!";
    // }
    if (inputValue && !inputValue.fname) {
      formIsValid = false;
      errors["fname"] = "*Please Enter full name!";
    }
    if (inputValue && !inputValue.email) {
      formIsValid = false;
      errors["email"] = "*Please Enter Email!";
    } else if (
      inputValue.email &&
      !inputValue.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["email"] = "*Please Enter valid Email!";
    }
    if (inputValue && !inputValue.message) {
      formIsValid = false;
      errors["message"] = "*Please Enter your query!";
    }
    if (inputValue && !inputValue.type) {
      formIsValid = false;
      errors["type"] = "*Please select one option!";
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
    // } else if (e.target.name === "message") {
    //   let val = e.target.value.replace(/[^\w\s]/gi, "");
    //   setInputValue({ ...inputValue, [name]: val });
    //   setErrors({ ...errors, [name]: "" });
    } else {
      const { name, value } = e.target;
      setInputValue({ ...inputValue, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handelCMS = (e) => {
    if (validateForm()) {
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
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    getLearn();
  }, []);

  const getLearn = async (e) => {
    await ApiGet(
      `aboutus/getAllAboutus?page=1&limit=10&type=populardestination`
    )
      .then((res) => {
        setAboutus(res?.data?.payload?.aboutus);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <section className="easy-scheduling-section-alignment">
        <div className="container">
          {/* <ToastContainer /> */}
          {aboutus?.length > 0 &&
            aboutus?.slice(2, 3).map((photo) => {
              return (
                <div className="easy-grid">
                  <div className="easy-grid-items">
                    <img src={photo?.photo} alt="CalenderImage" />
                  </div>
                  <div className="easy-grid-items">
                    <h1>{photo?.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: photo?.description,
                      }}
                      className=""
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className="contact-section-alignment1">
        <div className="container">
          <div className="contact-left-right-align">
            <div className="page-title">
              <h1>CONNECT WITH US</h1>
            </div>
            <div className="contact-details-group">
              <div className="form-grid">
                <div className="form-grid-items">
                  <div className="form-control">
                    <label>
                      Full Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
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
                {/* <div className="form-grid-items">
                  <div className="form-control">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
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
                <div className="form-grid-items">
                  <div className="form-control">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Enter Email"
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
              <div className="form-control Query-top-align">
                {/* <div className="form-grid-items">
                  <div className="form-control"> */}
                    <label>
                      Contact Number<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      id="phone"
                      name="phone"
                      maxLength={15}
                      value={inputValue?.phone}
                      onChange={(e) => {
                        handleOnChnage(e);
                      }}
                    />
                    <span style={{ color: "red" }}>{errors["phone"]}</span>
                  {/* </div>
                </div> */}
              </div>
              <div className="form-control Query-top-align">
                <label>Your Query</label>
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
              <div className="following-radio-button-alignment">
                <span>Select one of the following</span>
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
                    <label for="html">I am buyer</label>
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
                    <label for="html">I am Seller</label>
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
                    <label for="html">I am an agent or broker</label>
                  </div>
                  <div className="radio-button-design"></div>
                  <div className="radio-button-design"></div>
                </div>
                <span style={{ color: "red" }}>{errors["type"]}</span>
              </div>

              <div className="form-button-center-align">
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
        </div>
      </section>
    </div>
  );
}
