import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./MyAccount.scss";
import LocationIcon from "../../Assets/Images/locationIcon.svg";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import {
  handleGetMyProperty,
  handleGetTokenPrice,
} from "../../Helpers/CommonAPI/CommonAPI";

export default function MyAccount() {
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const history = useHistory();
  const [myOrderDetails, setMyOrderDetails] = useState([]);
  const [tokenPrice, setTokenPrice] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetPropertyDetails();
    getTokenPrice();
  }, []);

  const handleGetPropertyDetails = async () => {
    setLoading(true);
    await handleGetMyProperty(userDetails)
      .then((res) => setMyOrderDetails(res?.history), setLoading(false))
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const getTokenPrice = () => {
    handleGetTokenPrice()
      .then((res) => {
        setTokenPrice(res?.token?.amount);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleStatusProperty = (item, status) => {
    let data = {
      _id: item?.pid?._id,
      statusOfProperty: status,
      userDeatils: userDetails?.id,
      oneProperties: item?.pid?.address,
    };
    if (status === "Interest Received") {
      history.push({
        pathname: "/interestReceived",
        state: { item: data },
      });
    } else if (status === "Remaining Amount Received") {
      history.push({
        pathname: "/remainingAmount",
        state: { item: data },
      });
    } else if (status === "Exit Request Received") {
      history.push({
        pathname: "/exitrequest",
        state: { item: data },
      });
    } else if (status === "Exit Approved") {
      history.push({
        pathname: "/exitapproved",
        state: {
          item: data,
        },
      });
    } else if (status === "Refund Processed") {
      history.push({
        pathname: "/refundprocessed",
        state: {
          item: data,
        },
      });
    } else if (status === "Property Resold") {
      history.push({
        pathname: "/propertyresold",
        state: {
          item: data,
        },
      });
    }
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

  const handleSetPropertyData = (property) => {
    history.push({
      pathname: `/viewproperties/${property?._id}`,
      state: property,
    });
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

  const handleBuyProperty = (item) => {
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

    const { amt, id: order_id } = result;
    const price = item?.pid?.wholeHomePrice / item?.pid?.ownership - tokenPrice;

    let finalPrice = price?.toFixed(2);

    const options = {
      // key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      key: "rzp_test_zxRbsLCk9aPfJK", // Enter the Key ID generated from the Dashboard
      // key: "rzp_test_dJBRjzn98dm5w7", // Enter the Key ID generated from the Dashboard

      //   amount: "100",
      amount: finalPrice * 10000000, // Amount is in currency subunits. Default currency is INR. Hence, 10000000 refers to 100000 INR or 1 Lac
      currency: "INR",
      name: "Our Leisure Home",
      description: "Our Leisure Home Transaction",
      order_id: order_id,
      handler: async function (response) {
        let data = {
          uid: userDetails?.id,
          pid: item?.pid?._id,
          aid: item?.pid?.adminid,
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

  return (
    <div className="myAccount-section-alignment">
      <div className="container">
        <div className="myAccount-alignment">
          <div className="myAccount-header-text-design">My Properties</div>
          {loading && (
            <div className="loader-container">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {myOrderDetails &&
            myOrderDetails?.map((item, index) => {
              let count = index + 1;
              let investmentValue =
                item?.pid?.wholeHomePrice / item?.pid?.ownership;
              return (
                <div className="myAccount-details-box-border">
                  <div onClick={() => handleSetPropertyData(item)}>
                    <div className="myAccount-details-relative">
                      <img
                        src={item?.pid?.photos[0]?.imgPath}
                        alt="HomeImage"
                      />
                      <div className="myAccount-number-details-position">
                        <div className="new-counter-design-alignment">
                          {count}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="MyAccount-Details-padding">
                    <div className="myAccount-Details-Location-alignment">
                      <div
                        className="myAccount-Details-Location-flex"
                        onClick={() => handleSetPropertyData(item)}
                      >
                        <div>
                          <img src={LocationIcon} alt="LocationIcon" />
                        </div>
                        <div className="myAccount-Details-Location-Name">
                          <span>
                            {item.pid?.address?.city},{" "}
                            {item.pid?.address?.state},{" "}
                            {item.pid?.address?.country}.
                          </span>
                        </div>
                      </div>
                      <div className="MyAccount-Details-Date-Display">
                        <span>
                          {moment(item?.pid?.createdAt).format("DD MMMM, YYYY")}
                        </span>
                      </div>
                    </div>
                    <div
                      className="myAccount-Details-Address"
                      onClick={() => handleSetPropertyData(item)}
                    >
                      <span>{item.pid?.address?.street}</span>
                    </div>
                    <div
                      className={
                        item?.status === "Remaining Amount Received"
                          ? "myAccount-Remaining-amount-Received"
                          : item?.status === "Interest Received"
                          ? "myAccount-Interest-Received"
                          : item?.status === "Exit Approved"
                          ? "myAccount-Exit-Approved"
                          : item?.status === "Property Resold"
                          ? "myAccount-Resold"
                          : item?.status === "Refund Processed"
                          ? "myAccount-Refund-Processed"
                          : "myAccount-Exit-Request-Received"
                      }
                    >
                      <span
                        onClick={() => handleStatusProperty(item, item?.status)}
                      >
                        {item?.status === "Exit Request Received"
                          ? "Exit Request Sent"
                          : item?.status}
                      </span>
                    </div>
                    <div className="myAccount-Details-button-grid">
                      <div>
                        <div className="myAccount-Details-flex-alignment">
                          <div className="myAccount-Details-3Beds">
                            <span>{item?.pid?.beds} Beds</span>
                          </div>
                          <div className="myAccount-Details-Baths">
                            <span>{item?.pid?.baths} Baths</span>
                          </div>
                          <div className="myAccount-Details-Size">
                            <span>{item?.pid?.sqft} sqft</span>
                          </div>
                        </div>
                        <div className="myAccount-Details-Assets-flex-alignment">
                          <div className="myAccount-Details-Assets-Value">
                            <div className="myAccount-Details-Assets-Padding">
                              <h5>₹ {item?.pid?.wholeHomePrice} Lakh</h5>
                              <span>Asset Value</span>
                            </div>
                          </div>
                          <div className="myAccount-Details-Assets-Value">
                            <div className="myAccount-Details-Assets-Padding">
                              <h5>₹ {investmentValue.toFixed(2)} Lakh</h5>
                              <span>Investment value</span>
                            </div>
                          </div>
                          <div className="myAccount-Details-Assets-Value">
                            <div className="myAccount-Details-Assets-Padding">
                              <h5>1</h5>
                              <span>My Share</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* {item?.order === item?.pid?.ownership && item?.status === "Interest Received" &&
                            <div className="myAccount-remaining-BookVisit">
                              <button onClick={() => handleBuyProperty(item)}>Remaining Amount</button>
                            </div>
                          } */}
                        {item?.pid?.isFull === true &&
                          item?.status === "Interest Received" && (
                            <div className="myAccount-remaining-BookVisit">
                              <button onClick={() => handleBuyProperty(item)}>
                                Remaining Amount
                              </button>
                            </div>
                          )}
                        {item?.status === "Remaining Amount Received" && (
                          <>
                            <div className="myAccount-remaining-BookVisit">
                              <button
                                onClick={() =>
                                  handleBookVisit(item, "bookProperty")
                                }
                              >
                                Book A Visit
                              </button>
                            </div>
                            <div className="myAccount-Details-SellNow">
                              <button
                                onClick={() =>
                                  handleBookVisit(item, "sellProperty")
                                }
                              >
                                Sell Now
                              </button>
                            </div>
                          </>
                        )}
                        {item?.status === "Exit Request Received" && (
                          <>
                            <div className="myAccount-remaining-BookVisit">
                              <button
                                onClick={() =>
                                  handleBookVisit(item, "bookProperty")
                                }
                              >
                                Book A Visit
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {!loading && myOrderDetails?.length === 0 && (
            <>
              <p className="property-message">
                You don’t own any holiday home yet,
                <a href="/properties"> click here </a> to own your first
                property.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
