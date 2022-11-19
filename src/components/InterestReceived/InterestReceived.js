import React, { useEffect, useRef, useState } from "react";
import "./InterestReceived.scss";
import DownloadArrow from "../../Assets/Images/downloadArrow.png";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import moment from "moment";
import {
  handleGetPropertyHistoryCommonAPI,
  handleGetPropertyHistoryByUidAndPid,
  handleGetTokenPrice,
} from "../../Helpers/CommonAPI/CommonAPI";
import ComponentToPrint from "./Example";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
import FullPaymentInvoice from "../../Helpers/FullPaymentInvoice/FullPaymentInvoice";

export default function InterestReceived(props) {
  const history = useHistory();
  const propertyData = props?.history?.location?.state?.item;
  let userinfo = JSON.parse(localStorage.getItem("userinfo"));
  let printData = [];
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const propertydatils = props?.history?.location?.state?.item?.userDeatils;
  const propertyName = props?.history?.location?.state?.item?.oneProperties;
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenPrice, setTokenPrice] = useState();

  useEffect(() => {
    handleGetPropertyHistory();
    getHistoryByUid();
    handleGetPoprtyData();
    getTokenPrice();
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

  const handleGetPoprtyData = () => {
    ApiGet(
      `property/getPropertyByUid?pid=${propertyData._id}&uid=${userinfo.id}`
    )
      .then((res) => {
        if (res.data.result === 0) {
          setPropertyDetails(res.data.payload?.history[0]);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getHistoryByUid = () => {
    handleGetPropertyHistoryByUidAndPid(propertyData, userinfo.id)
      .then((res) => {
        setUserHistory(res?.findOrder[0]);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleGetPropertyHistory = async () => {
    setLoading(true);
    await handleGetPropertyHistoryCommonAPI(propertyData)
      .then((res) => {
        setPropertyHistory(res);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const interestReceivedData = {
    PropertyName: propertyName?.name,
    Username: propertydatils.fullName,
    status: "Interest Received",
    date: moment(userHistory?.createdAt).format("DD-MM-YYYY"),
    price: userHistory?.price,
    paymentId: userHistory?.paymentId,
  };

  const ClickPdf = useReactToPrint({
    content: () => wrapperRefs.current,
  });
  const wrapperRefs = useRef();

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
    const price = item?.wholeHomePrice / item?.ownership - tokenPrice;

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
          uid: userinfo?.id,
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
            // handleGetPropertyDetails();
            history.push("/myaccount");
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          toast.error(err.message);
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
    <>
      <div>
        <div className="interestReceived-section-alignment">
          <div className="container">
            <div className="interest-Received-Receipt-alignment">
              <div className="interestReceived-Heading">
                <h1>Interest Received Receipt</h1>
              </div>
              <div className="interestReceived-Details-alignment">
                <div className="interestReceived-Details-box-border">
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
                      {propertyHistory &&
                        propertyHistory?.map((item, index) => {
                          printData?.push({
                            name: item?.uid?.fullName,
                            date: moment(item?.createdAt).format(
                              "h:mm, MMMM Do YYYY"
                            ),
                          });
                          return (
                            <div className="interestReceived-Details-box-design white">
                              <div className="interestReceived-Details-flex white-padding">
                                <div className="interestReceived-Details-name">
                                  <span>{item?.uid?.fullName}</span>
                                </div>
                                <div className="interestReceived-Details-date">
                                  <span>
                                    On{" "}
                                    {moment(item?.createdAt).format(
                                      "h:mm, MMMM Do YYYY"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <div className="interestReceived-Details-box-design white">
                        <div className="interestReceived-Details-flex white-padding">
                          <div className="interestReceived-Details-name">
                            <span>Interest Received Receipt:</span>
                          </div>

                          <div
                            className="interestReceived-Details-date"
                            onClick={() => ClickPdf()}
                          >
                            <div className="Details-flex-button">
                              <div>
                                <img src={DownloadArrow} alt="DownloadArrow" />
                              </div>
                              <div>
                                <span>Download</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "none" }}>
                <FullPaymentInvoice
                  receiptData={propertyDetails}
                  ref={wrapperRefs}
                  userDetails={userinfo}
                />
              </div>
              {/* <div style={{ display: "none" }}>
                <ComponentToPrint
                  receiptData={interestReceivedData}
                  ref={wrapperRefs}
                />
              </div> */}

              {propertyDetails?.order === propertyDetails?.pid?.ownership &&
                propertyDetails?.status === "Interest Received" && (
                  <div className="pay-Remaining-button">
                    <button
                      onClick={() => handleBuyProperty(propertyDetails?.pid)}
                    >
                      Pay Remaining Amount
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
