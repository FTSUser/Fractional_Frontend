import React, { useEffect, useRef, useState } from "react";
import "./PropertyResold.scss";
import DownloadArrow from "../../Assets/Images/downloadArrow.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import moment from "moment";
import { handleGetPropertyHistoryByUidAndPid } from "../../Helpers/CommonAPI/CommonAPI";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../../Helpers/Print/Example";
import FullPaymentInvoice from "../../Helpers/FullPaymentInvoice/FullPaymentInvoice";
import TokenPaymentInvoice from "../../Helpers/TokenPaymentInvoice/TokenPaymentInvoice";

export default function PropertyResold(props) {
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const propertyData = props?.history?.location?.state?.item;
  const [loading, setLoading] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState({});
  const [propertyHistory, setPropertyHistory] = useState([]);

  const ClickPdf = useReactToPrint({
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

  const ClickPdfFullPayment = useReactToPrint({
    content: () => wrapperRefsFullPayment.current,
  });

  const ClickPdfRemingAmount = useReactToPrint({
    content: () => wrapperRefs.current,
  });

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

  return (
    <div className="PropertyResold-section-alignment">
      <div className="container">
        <div className="PropertyResold-alignment">
          <div className="PropertyResold-Heading">
            <h1>Property Resold</h1>
          </div>

          <div className="PropertyResold-cong-flex">
            <span>Congratulations</span>
          </div>

          <div className="PropertyResold-cong-details">
            <div className="PropertyResold-cong-details-flex">
              <div className="PropertyResold-cong-details-width">
                <p>
                  your property has been resold.Please reach out to
                  xx-xxxxxx-xxxx for further information
                </p>
              </div>
            </div>
          </div>

          <div className="PropertyResold-details-box-border">
            <div className="PropertyResold-details-box-padding">
              <div className="PropertyResold-details-grid">
                <div>
                  <span>Reason of selling :</span>
                </div>
                <div>
                  <p>{propertyHistory?.description}</p>
                </div>
              </div>

              <div className="PropertyResold-selling-flex">
                <div className="PropertyResold-selling-heading">
                  <span>Selling Value</span>
                </div>
                <div className="PropertyResold-selling-value">
                  <p>₹ {propertyHistory?.price}</p>
                </div>
              </div>

              <div className="PropertyResold-date-flex">
                <div className="PropertyResold-date-heading">
                  <span>Date</span>
                </div>
                <div className="PropertyResold-data-value">
                  <p>
                    {moment(propertyHistory?.createdAt).format("DD MMMM, YYYY")}
                  </p>
                </div>
              </div>

              <div className="PropertyResold-status-flex">
                <div className="PropertyResold-status-heading">
                  <span>Status</span>
                </div>
                <div className="PropertyResold-status-value">
                  <button>Resold</button>
                </div>
              </div>

              <div className="PropertyResold-remaining-amount-flex">
                <div className="PropertyResold-remaining-header">
                  <span>Remaining Amount Receipt:</span>
                </div>
                <div
                  className="PropertyResold-remaining-download"
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

              <div className="PropertyResold-remaining-amount-flex">
                <div className="PropertyResold-remaining-header">
                  <span>Interest Received Receipt:</span>
                </div>
                <div
                  className="PropertyResold-remaining-download"
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
    </div>
  );
}
