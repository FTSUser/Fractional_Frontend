import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { toast } from "react-toastify";
import axios from "axios";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "react-multi-carousel/lib/styles.css";
import { useAtom } from "jotai";
import { ApiPost, ApiGet } from "../../Helpers/Api/ApiData";
import NearbyProperites from "./NearbyProperites";
import "./PropertiesDetails.scss";
import RequestForChatModal from "../RequestForChatModal/RequestForChatModal";
import { compareProperty } from "../../atom/compareProperty";
import SharePopertyModal from "../SharePopertyModal/SharePopertyModal";

export default function PropertiesDetails(props) {
  const propertyData = props?.location?.state?.data;
  const history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const [latestPropeties, setLatestPropeties] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [inputValue, setInputValue] = useState({
    fname: userDetails?.fullName,
    email: userDetails?.email,
    phone: userDetails?.phone === "undefined" ? "" : userDetails?.phone ? userDetails?.phone : "",
  });
  const [errors, setErrors] = useState({});
  const [modalShow, setmodalShow] = useState(false);
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [oneProperties, setOneProperties] = useState([]);
  const [nearByProperty, setNearByProperty] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [cityName, setCityName] = useState();
  const [propImage, setPropImage] = useState([]);
  const [allProperty, setAllProperty] = useState([]);
  // const [comparePropertyData, setComparePropertyData] = useState([]);
  const [idForCompare, setIdForCompare] = useAtom(compareProperty);
  const [requestForChatModal, setRequestForChatModal] = useState(false);
  const [propertyOrders, setPropertyOrders] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [propertyId]);
  // const location = useLocation();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 8,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
    },
  };

  useEffect(() => {
    // getAllProperty();
    getUserData();
  }, []);

  useEffect(() => {
    if (propertyId) {
      getOneProperty();
      // handleGetPropertyByUid();
    }
  }, [propertyId]);

  let location = typeof window !== "undefined" ? window.location.pathname : "";
  useEffect(() => {
    const pName = typeof window !== "undefined" ? location.split("/") : "";
    setPropertyId(pName[pName?.length - 1]);
  }, [location]);

  const getUserData = async () => {
    await ApiGet(`admin/get-admin/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.payload?.admin[0]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // const getAllProperty = async () => {
  //   await ApiPost("property/getPropertys?isUser=true")
  //     .then((res) => {
  //       setAllProperty(res.data.payload?.Propertys);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleGetPropertyByUid = async () => {
  //   setLoading(true);
  //   await ApiGet(`property/getPropertyByUid?pid=${propertyId}`)
  //     .then((res) => {
  //       setLoading(false);
  //       // setPropertyOrders(res.data.payload?.history[0]?.order);
  //       // setOneProperties(res.data.payload?.history[0]?.pid);
  //       // setOnePropertiesstatus(true);
  //       // res?.data?.payload?.history[0]?.pid?.photos?.map((item) => {
  //       //   propImage.push({
  //       //     original: item?.imgPath,
  //       //     thumbnail: item?.imgPath,
  //       //   });
  //       // });
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toast.error(err.response.data.message);
  //     });
  // }

  const getOneProperty = async (e) => {
    setLoading(true);
    await ApiGet(`property/getOneProperty/${propertyId}`)
      .then((res) => {
        setNearByProperty(res?.data?.payload?.nearProperty);
        setLoading(false);
        if (res.data.payload?.history.length > 0) {
          setPropertyOrders(res.data.payload?.history[0]?.order);
          setOneProperties(res.data.payload?.history[0]?.pid);
          res?.data?.payload?.history[0]?.pid?.photos?.map((item) => {
            propImage.push({
              original: item?.imgPath,
              thumbnail: item?.imgPath,
            });
          });
        } else {
          setPropertyOrders(0);
          setOneProperties(res.data.payload?.Property);
          res?.data?.payload?.Property?.photos?.map((item) => {
            propImage.push({
              original: item?.imgPath,
              thumbnail: item?.imgPath,
            });
          });
        }
      })
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  useEffect(
    () => {
      if (oneProperties?.address?.city) {
        getWeatherData();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [oneProperties]
  );

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (inputValue && !inputValue.phone) {
      formIsValid = false;
      errors["phone"] = "*Please Enter Contact Number";
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
      errors["email"] = "*Please Enter Email";
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

  useEffect(() => {
    const dateSort = nearByProperty?.sort(function (a, b) {
      return new Date(b.creationDate) - new Date(a.creationDate);
    });
    setLatestPropeties(dateSort.slice(0, 3));
  }, [nearByProperty]);

  const getWeatherData = async () => {
    let cityName = "Sahibzada Ajit Singh Nagar";
    if (oneProperties?.address?.city.toLowerCase() === cityName.toLowerCase()) {
      cityName = "Chandigarh";
      setCityName("Sahibzada Ajit Singh Nagar");
    } else {
      cityName = oneProperties?.address?.city;
      setCityName(oneProperties?.address?.city);
    }
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f8f44840e33e10934dc508ccc4df7d61`
      )
      .then((res) => {
        setWeatherData(res?.data);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
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
    } else if (e.target.name === "isInterested") {
      setInputValue({ ...inputValue, [name]: e.target.checked });
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
        isInterested: inputValue?.isInterested,
        pid: propertyId,
        aid: oneProperties?.adminid,
      };
      ApiPost(`contactus/addContactus`, Data)
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
              isInterested: false,
            });
            setErrors({});
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    }
  };

  const handleCompere = async (e) => {
    const { value } = e.target;
    setIdForCompare(idForCompare.concat(value));
    history.push({
      pathname: "/compareproperties",
      // state: { data: [id] },
    });
  };

  const showRequestChatModal = () => {
    setRequestForChatModal(true);
  };

  const hideRequestChatModal = () => {
    setRequestForChatModal(false);
  };

  const handleBuyPropertyPage = (oneProperties) => {
    history.push({
      pathname: "/productdisclaimer",
      state: { data: oneProperties },
    });
  };

  let propertyPrice = oneProperties?.wholeHomePrice / oneProperties?.ownership
  return (
    <>
      <div>
        {loading ? (
          <div className="loader-container">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        ) : (
          <>
            <section className="properties-details-title-banner">
              <div className="container">
                <div className="button-main-div">
                  <div className="request-property-button">
                    <button className="compare"
                      value={oneProperties?._id}
                      onClick={(e) => handleCompere(e)}
                    >
                      {idForCompare?.includes(oneProperties?._id)
                        ? "Already Added"
                        : "Compare Property"}
                    </button>
                  </div>

                  <div
                    className="request-property-button"
                    onClick={showRequestChatModal}
                  >
                    <button className="requestchat">Request For Chat</button>
                  </div>
                  {/* <div
                className="request-property-button"
                onClick={() => handleBuyPropertyPage()}
              >
                <button>Buy</button>
              </div> */}
                </div>
                <div className="properties-details-alignment">
                  <div>
                    <h1>{oneProperties?.address?.name}</h1>
                    <div className="location-icon-text-alignment">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                        {oneProperties?.address?.city}
                        {", "}
                        {oneProperties?.address?.state}
                        {", "}
                        {oneProperties?.address?.country}
                      </span>
                    </div>

                    <div
                      className="share-button-text"
                      onClick={() => setmodalShow(true)}
                    >
                      <i className="fas fa-share-alt"></i>
                      <span>
                        Share
                      </span>
                    </div>
                  </div>
                  <div>
                    <p class="Owners">
                      <div className="right-divider-align">
                        <div>
                          <span>
                            ₹{" "}
                            {propertyPrice.toFixed(2)}
                            {"  "}
                            {oneProperties?.priceType}
                          </span>
                        </div>
                        <span className="span-second">
                          Minimum investment
                        </span>
                      </div>

                      {/* ₹ {oneProperties?.wholeHomePrice} {oneProperties?.priceType}{" "} */}
                      <div className="right-divider-align-left">
                        <div>
                          <span>
                            {oneProperties?.ownership} Owners
                          </span>
                        </div>
                        <span className="span-second">
                          Remaining
                        </span>
                      </div>
                    </p>
                    {/* <div className="property-details-child-text-alignment">
                  <span>₹ {(oneProperties?.wholeHotoastmePrice) / (oneProperties?.ownership)}{"  "}{oneProperties?.priceType}</span>
                </div> */}
                  </div>
                </div>
                {userData?.isActive === true && oneProperties?.isFull === false ? (

                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => handleBuyPropertyPage(oneProperties)}
                    >
                      <button>Buy Now</button>
                    </div>
                  </div>
                ) : userData?.isActive === false && oneProperties?.isFull === true ? (
                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => history.push("/profilepage")}
                    >
                      <button>Sold Out</button>
                    </div>
                  </div>

                ) : oneProperties?.isFull === true ? (
                  <div className="buy-now-div-alignment">
                    <div>
                      <button>Sold Out</button>
                    </div>
                  </div>
                ) : (
                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => history.push("/profilepage")}
                    >
                      <button>Buy Now</button>
                    </div>
                  </div>
                )}
                {/* {userData?.isActive === true && propertyOrders < oneProperties?.ownership ? (

                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => handleBuyPropertyPage(oneProperties)}
                    >
                      <button>Buy Now</button>
                    </div>
                  </div>
                ) : userData?.isActive === false && propertyOrders === oneProperties?.ownership ? (
                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => history.push("/profilepage")}
                    >
                      <button>Sold Out</button>
                    </div>
                  </div>

                ) : propertyOrders === oneProperties?.ownership ? (
                  <div className="buy-now-div-alignment">
                    <div>
                      <button>Sold Out</button>
                    </div>
                  </div>
                ) : (
                  <div className="buy-now-div-alignment">
                    <div
                      onClick={() => history.push("/profilepage")}
                    >
                      <button>Buy Now</button>
                    </div>
                  </div>
                )} */}

              </div>
            </section>
            <section className="properties-section-alignment-page">
              <div className="container">
                <div className="farm-image-grid">
                  <div className="farm-image-grid-items">
                    <div className="main-farm-image">
                      <AwesomeSlider
                        autoPlay={true}
                        play={true}
                        cancelOnInteraction={false}
                        interval={1000}
                        showTimer={true}
                        bullets={false}
                        cssModule={AwesomeSliderStyles}
                      >
                        {oneProperties?.photos?.length > 0 &&
                          oneProperties?.photos?.map((photo, i) => {
                            return (
                              <div
                                className="full-height-image-alignment"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={photo?.imgPath}
                                  alt="FarmImage"
                                  onClick={() =>
                                    setSliderModalOpen(!sliderModalOpen)
                                  }
                                />
                              </div>
                            );
                          })}
                      </AwesomeSlider>
                    </div>
                  </div>
                  <div className="farm-image-grid-items">
                    <div className="farm-child-grid">
                      {oneProperties?.photos?.length > 0 &&
                        oneProperties?.photos?.slice(0, 3).map((photo, i) => {
                          return (
                            <div className="farm-child-grid-items">
                              <img src={photo?.imgPath} alt="FarmChildImage" />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="new-farm-image-grid">
                  {oneProperties?.photos?.length > 0 &&
                    oneProperties?.photos?.slice(4, 7).map((photo, i) => {
                      return (
                        <div className="new-farm-image-grid-items">
                          <img src={photo?.imgPath} alt="FarmChildImage" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
            <section>
              <div className="container">
                <div className="properties-box-grid">
                  <div className="properties-box-grid-items">
                    <h1>About Property</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: oneProperties?.aboutHome,
                      }}
                      className=""
                    />
                    <div className="floor-plan">
                      <h2>Property Features</h2>
                      <div className="property-features-grid">
                        <div className="property-features-grid-items">
                          <div className="child-grid">
                            <div className="child-grid-items">
                              <div className="empty-round">
                                <i class="fa-solid fa-bed"></i>
                              </div>
                            </div>
                            <div className="child-grid-items">
                              <span>{oneProperties?.beds} Beds</span>
                            </div>
                          </div>
                        </div>
                        <div className="property-features-grid-items">
                          <div className="child-grid">
                            <div className="child-grid-items">
                              <div className="empty-round">
                                <i class="fa-solid fa-bath"></i>
                              </div>
                            </div>
                            <div className="child-grid-items">
                              <span>{oneProperties?.baths} Baths</span>
                            </div>
                          </div>
                        </div>
                        <div className="property-features-grid-items">
                          <div className="child-grid">
                            <div className="child-grid-items">
                              <div className="empty-round">
                                <i class="fa-solid fa-building"></i>
                              </div>
                            </div>
                            <div className="child-grid-items">
                              <span>{oneProperties?.sqft} sqft</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="disincitive-title">
                      <h2>Distinctive Amenities</h2>
                      <div className="property-features-grid">
                        {oneProperties?.amenities?.length > 0 &&
                          oneProperties?.amenities?.map((amenity, i) => {
                            return (
                              <div className="property-features-grid-items">
                                <div className="child-grid">
                                  <div className="child-grid-items">
                                    <div className="empty-round">
                                      <img src={amenity?.icon} />
                                    </div>
                                  </div>
                                  <div className="child-grid-items">
                                    <span>{amenity?.name}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="properties-box-grid-items">
                    <div className="main-child-banner">
                      <div className="information-box">
                        <h1>{oneProperties?.rentalYield}%</h1>
                        <p>Rental Yield</p>
                      </div>
                      {/* <div className="information-box">
                        <h1>{oneProperties?.targetIRR}%</h1>
                        <p>Target IRR</p>
                      </div> */}
                      <div className="information-box">
                        <h1>
                          ₹ {oneProperties?.wholeHomePrice}{" "}
                          {oneProperties?.priceType}
                        </h1>

                        <p>Total Asset Value</p>
                      </div>
                      <div className="information-box">
                        <span>Weather</span>
                        <div className="weather-grid">
                          <div className="weather-grid-items">
                            <h6>{weatherData?.main?.temp}°C</h6>  
                            <h5>{cityName && cityName}</h5>
                          </div>
                          <div className="weather-grid-items">
                            <div className="cloud-icon-center">
                              <i className="fas fa-cloud"></i>
                            </div>
                            <h5>
                              {weatherData?.weather?.length > 0 &&
                                weatherData?.weather[0]?.description}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <section>
                  <div className="booking-video">
                    {oneProperties?.propertyVideo?.length > 0 ? <h1>Video</h1> : ""}
                    <ReactPlayer
                      url={
                        oneProperties?.propertyVideo?.length > 0
                          ? oneProperties?.propertyVideo[0]?.videoPath
                          : ""
                      }
                      playing={false}
                      controls={true}
                      width="100%"
                      height="450"
                    />
                  </div>

                  {/* {oneProperties?.isMapDisplay && (
                    <div className="booking-video">
                      <h1>Map</h1>
                      <iframe
                        width="100%"
                        height="450px"
                        title="Locatio of property"
                        src={`https://maps.google.com/maps?q=${oneProperties?.location?.coordinates[1]},${oneProperties?.location?.coordinates[0]}&output=embed`}
                      ></iframe>
                    </div>
                  )} */}

                  {/* {oneProperties?.legalDocuments?.length > 0 ?
                <div className="booking-video">
                  <h1>Legal Documents</h1>
                  <div className="legal-grid">
                    {oneProperties?.legalDocuments?.length > 0 &&
                      oneProperties?.legalDocuments?.map((document) => {
                        return (
                          <div className="legal-grid-items">
                            <div className="file-box">
                              <iframe src={document?.pdfPath} scroll="no" />
                            </div>
                            <div className="title-report-align">
                              <p>Title Report</p>
                              <a href={document?.pdfPath} target="_blank">
                                <i className="far fa-file-pdf"></i>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div> : ""} */}

                  <div className="booking-video">
                    <h1>Contact Us</h1>
                    <div className="contact-form-grid">
                      <div className="contact-form-grid-items">
                        <div className="form-control">
                          <label>
                            Full Name<span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Full name"
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
                      {/* <div className="contact-form-grid-items">
                        <div className="form-control">
                          <label>
                            Last Name<span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Last name"
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
                      <div className="contact-form-grid-items">
                        <div className="form-control">
                          <label>Email ID<span>*</span></label>
                          <input
                            type="text"
                            placeholder="Enter Your Email ID"
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
                      {/* <div className="contact-form-grid-items"> */}
                    </div>
                        <div className="form-control">
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
                        {/* </div> */}
                      </div>
                    <div className="form-control">
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
                    <div className="following-radio-button-alignment">
                      <span>
                        Select one of the following
                        <span style={{ color: "red" }}>*</span>
                      </span>
                      <div className="all-radio-button-alignment">
                        <div className="radio-button-design">
                          <input
                            type="radio"
                            name="type"
                            value="I am buyer"
                            onChange={(e) => {
                              handleOnChnage(e);
                            }}
                            checked={inputValue?.type === "I am buyer"}
                          />
                          <label for="html">I am buyer</label>
                        </div>
                        <div className="radio-button-design">
                          <input
                            type="radio"
                            name="type"
                            value="I am Seller"
                            onChange={(e) => {
                              handleOnChnage(e);
                            }}
                            checked={inputValue?.type === "I am Seller"}
                          />
                          <label for="html">I am Seller</label>
                        </div>
                        <div className="radio-button-design">
                          <input
                            type="radio"
                            name="type"
                            value="I am an agent or broker"
                            onChange={(e) => {
                              handleOnChnage(e);
                            }}
                            checked={inputValue?.type === "I am an agent or broker"}
                          />
                          <label for="html">I am an agent or broker</label>
                        </div>
                        <div className="radio-button-design"></div>
                        <div className="radio-button-design"></div>
                      </div>
                      <span style={{ color: "red" }}>{errors["type"]}</span>
                    </div>
                    {userDetails && (
                      <div className="following-radio-button-alignment">
                        <span>Are you interested in this property ?</span>
                        <div className="all-radio-button-alignment">
                          <div className="radio-button-design">
                            <input
                              type="checkbox"
                              name="isInterested"
                              checked={inputValue?.isInterested}
                              onChange={(e) => {
                                handleOnChnage(e);
                              }}
                            // checked={inputValue?.isInterested === "true"}
                            />
                            <label for="html">Yes, I am interested</label>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="send-email">
                      <button
                        className="send-email-button"
                        onClick={() => {
                          handelCMS();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </>
        )}
        <NearbyProperites latestPropeties={latestPropeties} />
      </div>

      {sliderModalOpen && (
        <div className="slider-modal">
          <>
            <div style={{ position: "relative" }}>
              <div
                className="modal-close-alignment"
                onClick={() => setSliderModalOpen(false)}
              >
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current w-1-1/4 h-1-1/4 sm:w-2 sm:h-2"
                >
                  <path fill="none" d="M1 1l12 12M13 1L1 13"></path>
                </svg>
              </div>
              <ImageGallery items={propImage} />
            </div>
          </>
        </div>
      )}

      {requestForChatModal && (
        <RequestForChatModal
          handleClose={hideRequestChatModal}
          oneProperties={oneProperties}
          requestForChatModal={requestForChatModal}
        />
      )}

      {modalShow && (
        <SharePopertyModal
          setmodalShow={setmodalShow}
          modalShow={modalShow}
        />
      )}


    </>
  );
}
