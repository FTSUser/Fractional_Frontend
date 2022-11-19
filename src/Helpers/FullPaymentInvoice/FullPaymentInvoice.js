import React, { forwardRef } from "react";
import "./FullPaymentInvoice.scss";

class FullPaymentInvoice extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { receiptData, userDetails } = this.props;
    return (
      <>
        <div className="main-body">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <table
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  class="full-width"
                >
                  <tr>
                    <td>
                      <div className="table-alignment">
                        <div>
                          <img
                            className="table-image"
                            src={receiptData?.pid?.photos[0]?.imgPath}
                          />
                        </div>
                        <div className="owner-title-alignment">
                          <div className="owner-detail">
                            <p>Dear Mr./Ms. {userDetails?.fullName}</p>
                            <p>
                              Thanks for choosing to invest in the
                              <span>{receiptData?.pid?.address?.name}</span>
                              (Name of property with location) Oppotrunity
                            </p>
                          </div>
                          <p>
                            Please note, we acknowledge the receipt og Balabce
                            Amount of INR <span>50000/-</span>
                            as per below details.
                          </p>
                        </div>
                        <div className="description-alignment ">
                          <div className="company-title">
                            <p>Our Leisure Home - Receipt</p>
                          </div>
                          <div>
                            <div classNamw="group">
                              <div className="description-table-title">
                                <span>Description of the Property</span>
                              </div>
                              <div className="description-table-title-2">
                                <span>{`${receiptData?.pid?.address?.street}, ${receiptData?.pid?.address?.city}, ${receiptData?.pid?.address?.state}, ${receiptData?.pid?.address?.country} - ${receiptData?.pid?.address?.pincode}`}</span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>Total Asset Value(INR)</span>
                              </div>
                              <div className="details-cell">
                                <span>{receiptData?.pid?.wholeHomePrice}</span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>Total No, of Share for the Asset</span>
                              </div>
                              <div className="details-cell">
                                <span>{receiptData?.pid?.ownership}</span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>Your investment in the Asset(INR)</span>
                              </div>
                              <div className="details-cell">
                                <span>{receiptData?.pid?.investmentRange}</span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>
                                  No of Share that you have shown intrest in
                                </span>
                              </div>
                              <div className="details-cell">
                                <span></span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>Token Amount Received(INR)</span>
                              </div>
                              <div className="details-cell">
                                <span>50000</span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>Balance Amount Received (INR)</span>
                              </div>
                              <div className="details-cell">
                                <span></span>
                              </div>
                            </div>
                            <div
                              class="group"
                              style={{
                                borderBottom: "1px solid #d0d0d0",
                                borderRight: "1px solid #d0d0d0",
                              }}
                            >
                              <div className="description-cell">
                                <span>
                                  Status of Payments (Total Investment Amount
                                  recived)
                                </span>
                              </div>
                              <div className="details-cell">
                                <span> No</span>
                              </div>
                            </div>
                          </div>

                          <div className="policy-alignment">
                            <p>
                              Our team will connect with you within 48 working
                              hours, to discuss the further process & steps to
                              complete your aspirational purchase
                            </p>
                            <p>
                              Wishing you a wonderful experience with
                              eisureHome.
                            </p>
                            <p className="thanks-message">Thanks</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </>
    );
  }
}

export default FullPaymentInvoice;
