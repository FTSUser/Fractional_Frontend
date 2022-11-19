import React, { useEffect, useRef, useState } from "react";
import "./ExitApproved.scss";
import DownloadArrow from "../../Assets/Images/downloadArrow.png";
import ComponentToPrint from "../../Helpers/Print/Example";
import { handleGetPropertyHistoryByUidAndPid } from "../../Helpers/CommonAPI/CommonAPI";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { ApiGet } from "../../Helpers/Api/ApiData";
import TokenPaymentInvoice from "../../Helpers/TokenPaymentInvoice/TokenPaymentInvoice";
import FullPaymentInvoice from "../../Helpers/FullPaymentInvoice/FullPaymentInvoice";

export default function ExitApproved(props) {
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const propertyData = props?.history?.location?.state?.item;
  const [interestReceivedData, setInterestReceivedData] = useState({});
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);


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


  const ClickPdf = useReactToPrint({
    content: () => wrapperRefs.current,
  });
  const wrapperRefs = useRef();
  const wrapperRefsFullPayment = useRef();

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

  const ClickPdfFullPayment = useReactToPrint({
    content: () => wrapperRefsFullPayment.current,
  });

  const ClickPdfRemingAmount = useReactToPrint({
    content: () => wrapperRefs.current,
  });

  useEffect(() => {
    handleExitRequestDetails();
  }, []);

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
        toast.error(err);
      });
  };

  return (
    <div className="exitApproved-section-alignment">
      <div className="container">
        <div className="exitApproved-alignment">
          <div className="exitApproved-Heading">
            <h1>Exit Approved</h1>
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
            <div className="exitApproved-Details-alignment">
              <div className="exitApproved-Details-box-border">
                <div className="exitApproved-Details-box-design white">
                  <div className="exitApproved-alignment-flex big-padding">
                    <div className="exitApproved-value">
                      <span>Value</span>
                    </div>
                    <div className="exitApproved-value-Details">
                      <span>₹ {propertyHistory?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="exitApproved-Details-box-design grey">
                  <div className="exitApproved-alignment-flex small-padding">
                    <div className="exitApproved-Date">
                      <span>Date</span>
                    </div>

                    <div className="exitApproved-Date-Details">
                      <span>
                        {moment(propertyHistory?.updatedAt).format(
                          "DD MMMM, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="exitApproved-Details-box-design white">
                  <div className="exitApproved-alignment-flex big-padding">
                    <div className="exitApproved-Status">
                      <span>Status</span>
                    </div>
                    <div className="exitApproved-Status-button">
                      <button>
                        {propertyHistory?.isApproved === "true"
                          ? "Approved"
                          : "Rejected"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="exitApproved-Details-box-design grey">
                  <div className="exitApproved-alignment-flex small-padding"></div>
                </div>

                <div className="exitApproved-Details-box-design white">
                  <div
                    className="exitApproved-alignment-flex"
                    style={{ padding: "11px 24px" }}
                  >
                    <div className="exitApproved-Remaining-Amount">
                      <span>Remaining Amount Receipt:</span>
                    </div>
                    <div
                      className="exitApproved-Remaining-Amount-download"
                      onClick={() =>
                        getHistoryByUid("Remaining Amount Received")
                      }
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

                <div className="exitApproved-Details-box-design grey">
                  <div className="exitApproved-alignment-flex small-padding">
                    <div className="exitApproved-interest-received">
                      <span>Interest Received Receipt:</span>
                    </div>

                    <div
                      className="exitApproved-interest-received-download"
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

                {/* <div style={{ display: "none" }}>
                  <ComponentToPrint
                    receiptData={interestReceivedData}
                    ref={wrapperRefs}
                  />
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
