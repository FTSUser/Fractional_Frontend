import React, { useEffect, useRef, useState } from "react";
import "./ExitRequest.scss";
import DownloadArrow from "../../Assets/Images/downloadArrow.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { handleGetPropertyHistoryByUidAndPid } from "../../Helpers/CommonAPI/CommonAPI";
import { toast } from "react-toastify";
import ComponentToPrint from "../../Helpers/Print/Example";
import FullPaymentInvoice from "../../Helpers/FullPaymentInvoice/FullPaymentInvoice";
import TokenPaymentInvoice from "../../Helpers/TokenPaymentInvoice/TokenPaymentInvoice";

export default function ExitRequest(props) {
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const propertyData = props?.history?.location?.state?.item;
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleExitRequestDetails();
  }, []);

  const ClickPdf = useReactToPrint({
    content: () => wrapperRefs.current,
  });

  const ClickPdfFullPayment = useReactToPrint({
    content: () => wrapperRefsFullPayment.current,
  });

  const ClickPdfRemingAmount = useReactToPrint({
    content: () => wrapperRefs.current,
  });
  const wrapperRefs = useRef();
  const wrapperRefsFullPayment = useRef();

  useEffect(() => {
    handleGetPoprtyData();
  }, []);

  const handleGetPoprtyData = () => {
    ApiGet(
      `property/getPropertyByUid?pid=${propertyData._id}&uid=${userDetails.id}`
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

  const getHistoryByUid = (status) => {
    let data = {
      _id: propertyData?._id,
      statusOfProperty: status,
      userDeatils: propertyData?.uid,
      oneProperties: propertyData?.address,
    };
    handleGetPropertyHistoryByUidAndPid(data, userDetails.id)
      .then((res) => {
        let info = res?.findOrder[0];
        setInterestReceivedData({
          PropertyName: propertyData?.oneProperties?.name,
          Username: userDetails.fullName,
          status: status,
          date: moment(info?.createdAt).format("DD-MM-YYYY"),
          price: info?.price,
          paymentId: info?.paymentId,
        });
        if (status === "Interest Received") {
          ClickPdfFullPayment();
        } else if (status === "Remaining Amount Received") {
          ClickPdfRemingAmount();
        } else {
          ClickPdf();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleExitRequestDetails = () => {
    setLoading(true);
    ApiGet(`sell/getAllSell?pid=${propertyData?._id}&uid=${userDetails?.id}`)
      .then((res) => {
        if (res.data.result === 0) {
          setPropertyHistory(res.data.payload?.status[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <div className="exitRequest-section-alignment">
      <div className="container">
        <div className="exitRequest-alignment">
          <div className="exitRequest-Heading">
            {/* <h1>Exit Request Received</h1> */}
            <h1>Exit Request Sent</h1>
          </div>

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
            <div className="exitRequest-Details-alignment">
              <div className="exitRequest-Details-box-border">
                <div className="exitRequest-Details-grid">
                  <div className="exitRequest-reselling">
                    <span>Reason of selling :</span>
                  </div>
                  <div className="exitRequest-reselling-Details">
                    <p>{propertyHistory?.description}</p>
                  </div>
                </div>

                <div className="exitRequest-Selling-flex">
                  <div className="exitRequest-Selling-Heading">
                    <span>Selling Value</span>
                  </div>
                  <div className="exitRequest-Selling-Value">
                    <span>₹ {propertyHistory?.price}</span>
                  </div>
                </div>

                <div className="exitRequest-Selling-flex">
                  <div className="exitRequest-Date-Heading">
                    <span>Date</span>
                  </div>
                  <div className="exitRequest-Date-Value">
                    <span>
                      {moment(propertyHistory?.createdAt).format(
                        "DD MMMM, YYYY"
                      )}
                    </span>
                  </div>
                </div>

                <div className="exitRequest-Satus-flex">
                  <div className="exitRequest-Satus-Heading">
                    <span>Status</span>
                  </div>
                  <div className="exitRequest-Satus-button">
                    <span>
                      <button>
                        {propertyHistory?.isApproved === true
                          ? "Approved"
                          : "In Process"}
                      </button>
                    </span>
                  </div>
                </div>

                <div className="exitRequest-Remaining-flex">
                  <div className="exitRequest-Remaining-Heading">
                    <span>Remaining Amount Receipt:</span>
                  </div>

                  <div
                    className="exitRequest-Remaining-Download"
                    onClick={() => getHistoryByUid("Remaining Amount Received")}
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

                <div className="exitRequest-Remaining-flex">
                  <div className="exitRequest-Remaining-Heading">
                    <span>Interest Received Receipt:</span>
                  </div>

                  <div
                    className="exitRequest-Remaining-Download"
                    onClick={() => getHistoryByUid("Interest Received")}
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
              {/* <div style={{ display: "none" }}>
                                <ComponentToPrint
                                    receiptData={interestReceivedData}
                                    ref={wrapperRefs}
                                />
                            </div> */}

              <div style={{ display: "none" }}>
                <FullPaymentInvoice
                  ref={wrapperRefsFullPayment}
                  receiptData={propertyDetails}
                  userDetails={userDetails}
                />
              </div>

              <div style={{ display: "none" }}>
                <TokenPaymentInvoice
                  ref={wrapperRefs}
                  receiptData={propertyDetails}
                  userDetails={userDetails}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
