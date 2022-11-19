import React, { useEffect, useRef, useState } from "react";
import "./RemainingAmount.scss";
import DownloadArrow from "../../Assets/Images/downloadArrow.png";
import {
  handleGetPropertyHistoryByUidAndPid,
  handleGetPropertyHistoryCommonAPI,
} from "../../Helpers/CommonAPI/CommonAPI";
import { toast } from "react-toastify";
import ComponentToPrint from "../../Helpers/Print/Example";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import FullPaymentInvoice from "../../Helpers/FullPaymentInvoice/FullPaymentInvoice";
import TokenPaymentInvoice from "../../Helpers/TokenPaymentInvoice/TokenPaymentInvoice";
import { ApiGet } from "../../Helpers/Api/ApiData";

export default function RemainingAmount(props) {
  let userinfo = JSON.parse(localStorage.getItem("userinfo"));

  const propertyData = props?.history?.location?.state?.item;
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState({});
  const wrapperRefs = useRef();
  const wrapperRefsFullPayment = useRef();

  useEffect(() => {
    handleGetPoprtyData();
  }, []);

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

  const getHistoryByUid = (status) => {
    let data = {
      _id: propertyData?._id,
      statusOfProperty: status,
      userDeatils: propertyData?.uid,
      oneProperties: propertyData?.address,
    };
    handleGetPropertyHistoryByUidAndPid(data, userinfo.id)
      .then((res) => {
        let info = res?.findOrder[0];
        setInterestReceivedData({
          PropertyName: propertyData?.oneProperties?.name,
          Username: userinfo.fullName,
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

  const ClickPdf = useReactToPrint({
    content: () => wrapperRefs.current,
  });

  const ClickPdfFullPayment = useReactToPrint({
    content: () => wrapperRefsFullPayment.current,
  });

  const ClickPdfRemingAmount = useReactToPrint({
    content: () => wrapperRefs.current,
  });

  return (
    <div className="remainingAmount-section-alignment">
      <div className="container">
        <div className="remainingAmount-Received-alignment">
          <div className="remainingAmount-Received-Heading">
            <h1>Remaining Amount Received</h1>
          </div>

          <div className="remainingAmount-Received-Details-Alignment">
            <div className="remainingAmount-Received-Box-border">
              <div className="remainingAmount-Received-Details-box-design white">
                <div className="remainingAmount-Received-Display-flex white-padding">
                  <div className="remainingAmount-Received-Details-name">
                    <span>Remaining Amount Receipt:</span>
                  </div>
                  <div
                    className="remainingAmount-Received-Details-download-button"
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
              </div>

              <div className="remainingAmount-Received-Details-box-design grey">
                <div className="remainingAmount-Received-Display-flex grey-padding">
                  <div className="remainingAmount-Received-Details-name">
                    <span>Payment Successful Receipt:</span>
                  </div>
                  <div
                    className="remainingAmount-Received-Details-download-button"
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
              </div>

              <div className="remainingAmount-Received-Details-box-design grey">
                <div className="remainingAmount-Received-Display-flex grey-padding">
                  <div className="remainingAmount-Received-Details-name">
                    <span>Interest Received Receipt:</span>
                  </div>
                  <div
                    className="remainingAmount-Received-Details-download-button"
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
          userDetails={userinfo}
        />
      </div>

      <div style={{ display: "none" }}>
        <TokenPaymentInvoice
          ref={wrapperRefs}
          receiptData={propertyDetails}
          userDetails={userinfo}
        />
      </div>
    </div>
  );
}
