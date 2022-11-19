import React, { useEffect, useState } from "react";
import "./ViewProperties.scss";
import { useLocation, useHistory } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import { toast } from "react-toastify";
import SharePopertyModal from "../SharePopertyModal/SharePopertyModal";
import StatusTable from "./StatusTable";
import {
  handleGetMyProperty,
  handleGetPropertyHistoryByPropertyIdUserId,
  handleGetTokenPrice,
} from "../../Helpers/CommonAPI/CommonAPI";
import { ApiPost } from "../../Helpers/Api/ApiData";

export default function ViewProperties() {
  const history = useHistory();
  const [oneProperties, setOneProperties] = useState([]);
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [propImage] = useState([]);
  const location = useLocation();
  const propertyId = location.state._id;
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const [myOrderDetails, setMyOrderDetails] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const [statusDetails, setStatusDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     window.scrollTo({
  //       top: 0,
  //     });
  //   }, []);

  useEffect(() => {
    getOneProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOneProperty = async (e) => {
    setLoading(true);
    await handleGetPropertyHistoryByPropertyIdUserId(propertyId, userDetails)
      .then((res) => {
        setStatusDetails(res?.history);
        setOneProperties(res?.property);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setLoading(false);
        res?.property?.photos?.map((item) => {
          propImage.push({
            original: item?.imgPath,
            thumbnail: item?.imgPath,
          });
        });
      })
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const handleBookProperty = (e) => {
    history.push({
      pathname: "/bookvisit",
      state: {
        item: oneProperties,
      },
    });
  };

  const handleBookVisit = (item, type) => {
    if (type === "bookProperty") {
      history.push({
        pathname: "/bookvisit",
        state: {
          item: item,
        },
      });
    } else {
      history.push({
        pathname: "/sellnow",
        state: {
          item: item,
        },
      });
    }
  };

  useEffect(() => {
    handleGetPropertyDetails();
    getTokenPrice();
    handleGetTokenPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTokenPrice = () => {
    handleGetTokenPrice()
      .then((res) => {
        setTokenPrice(res?.token?.amount);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleBuyProperty = () => {
    const item = oneProperties;
    const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // const result = await axios.post('/payment/orders');
    const result = "data";
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { id: order_id } = result;
    const price = item?.wholeHomePrice / item?.ownership - tokenPrice;
    const options = {
      //   key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      key: "rzp_test_zxRbsLCk9aPfJK", // Enter the Key ID generated from the Dashboard
      // key: "rzp_test_dJBRjzn98dm5w7", // Enter the Key ID generated from the Dashboard

      amount: price * 10000000, // Amount is in currency subunits. Default currency is INR. Hence, 10000000 refers to 100000 INR or 1 Lac
      currency: "INR",
      name: "Our Leisure Home",
      description: "Our Leisure Home Transaction",
      order_id: order_id,
      handler: async function (response) {
        let data = {
          uid: userDetails?.id,
          pid: item?._id,
          aid: item?.adminid,
          paymentId: response?.razorpay_payment_id,
          price: price * 100000, // token price in lacs so multiply by 100000
          type: "emi",
        };
        const result = await ApiPost("order/addOrder", data);

        try {
          if (result?.data?.result === 0) {
            toast.success(result.data.message);
            handleGetPropertyDetails();
            // props.history.push("/myaccount");
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          toast.error(err.message);
        }

        if (result.data.message) {
          // props.hhhhh(true);
          // props.paymentId(response.razorpay_payment_id);
        }
      },
      prefill: {
        name: "Our Leisure Home",
        email: "example@example.com",
        contact: "9662169628",
      },
      notes: {
        address: "Example Corporate Office",
      },
      theme: {
        color: "#cc0001",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleGetPropertyDetails = () => {
    handleGetMyProperty(userDetails)
      .then((res) => {
        let filteredProperty = res?.history?.filter((item) => {
          return item?._id === propertyId;
        });
        setMyOrderDetails(filteredProperty[0]);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <section className="properties-details-title-banner">
            <div className="container">
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
                    <span>Share</span>
                  </div>
                </div>
                <div>
                  <p class="Owners">
                    <div className="right-divider-align">
                      <div>
                        <span>
                          ₹ {oneProperties?.wholeHomePrice}
                          {"  "}
                          {oneProperties?.priceType}
                        </span>
                      </div>
                      <span className="span-second">Asset Value</span>
                    </div>
                    <div className="right-divider-align-left">
                      <div>
                        {/* <span>{oneProperties?.ownership}</span> */}
                        <span>1</span>
                      </div>
                      <span className="span-second">My Share</span>
                    </div>
                  </p>
                </div>
              </div>

              <div className="button-alignment">
                {myOrderDetails?.status === "Remaining Amount Received" && (
                  <>
                    <div className="book-visit-button">
                      <div>
                        <button onClick={() => handleBookProperty()}>
                          Book A Visit
                        </button>
                      </div>
                    </div>
                    <div className="sell-book-button">
                      <button
                        onClick={() =>
                          handleBookVisit(oneProperties, "sellProperty")
                        }
                      >
                        Sell Now
                      </button>
                    </div>
                  </>
                )}
                {myOrderDetails?.status === "Exit Request Received" && (
                  <div className="book-visit-button">
                    <div>
                      <button onClick={() => handleBookProperty()}>
                        Book A Visit
                      </button>
                    </div>
                  </div>
                )}
                {myOrderDetails?.pid?.isFull === true &&
                  myOrderDetails?.status === "Interest Received" && (
                    <div
                      className="book-visit-button"
                      onClick={() => handleBuyProperty()}
                    >
                      <button>Pay Remaining Amount</button>
                    </div>
                  )}
                {/* {myOrderDetails?.order === myOrderDetails?.pid?.ownership && myOrderDetails?.status === "Interest Received" &&
                                    <div
                                        className="book-visit-button"
                                        onClick={() => handleBuyProperty()}
                                    >
                                        <button>Pay Remaining Amount</button>
                                    </div>
                                } */}
              </div>
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
          {/* <section>
            <div className="container">
              {oneProperties?.isMapDisplay && (
                <div className="booking-video">
                  <h1>Map</h1>
                  <iframe
                    width="100%"
                    height="450px"
                    title="Locatio of property"
                    src={`https://maps.google.com/maps?q=${oneProperties?.location?.coordinates[1]},${oneProperties?.location?.coordinates[0]}&output=embed`}
                  ></iframe>
                </div>
              )}
            </div>
          </section> */}

          <StatusTable statusDetails={statusDetails} loading={loading} />
        </>
      )}

      {modalShow && (
        <SharePopertyModal setmodalShow={setmodalShow} modalShow={modalShow} />
      )}
    </div>
  );
}
