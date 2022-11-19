import React from "react";
import "./Example.scss";


class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="print-table-design">
        <table
          className="table-spacing"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            <td>
              <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div className="invoice-title">
                      <h5>{this.props.receiptData.status} </h5>
                    </div>
                    <div className="parlour-details" align="right">
                      {/* <h4>{this.state.SaloonDetail?.businessName}</h4>
                    <p>{this.state.SaloonDetail?.address}</p>
                    <p>{this.state.SaloonDetail?.city}</p>
                    <p>{this.state.SaloonDetail?.mobileNumber}</p>
                    {this.state.gstCharge ? (
                      <p>GSTIN : {this.state.gstNumber}</p>
                    ) : null} */}
                    </div>
                  </td>
                </tr>
                <tr className="bottom-border" style={{ borderBottom: "none" }}>
                  <td>
                    <div className="align-items">
                      <div className="left-side">
                        <p style={{ fontWeight: "600" }}>Bill To</p>
                        <p>
                          {this.props.receiptData.Username}
                          { }
                        </p>
                        {/* <p>{959595959}</p> */}
                      </div>
                      <div className="right-side" align="right">
                        {/* <div>
                          <p className="first-child-align">Invoice No.</p>
                          <span>
                            {" "}
                            {"  "} {50}
                          </span>
                        </div> */}
                        <div>
                          <p>Invoice Date.</p>
                          <span>
                            {this.props.receiptData?.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <>
                  <tr>
                    <td>
                      <p
                        className="service-text"
                        style={{ padding: "1rem 0 0 0" }}
                      >
                        Property
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-space-remove">
                      <table className="new-table-design">
                        <thead>
                          <tr>
                            <th align="center" width="8%">
                              #
                            </th>
                            <th align="center" width="30%">
                              Property Name
                            </th>
                            <th align="center" width="11.5%">
                              Price
                            </th>
                            <th align="center" width="11.5%">
                              Payment Id
                            </th>
                          </tr>
                        </thead>
                        <>
                          <tr>
                            <td align="center">{1}</td>
                            <td>{this.props.receiptData.PropertyName}</td>
                            <td align="center">{this.props.receiptData?.price}</td>
                            <td align="center">
                              {this.props.receiptData?.paymentId}
                            </td>
                          </tr>
                        </>
                      </table>
                    </td>
                  </tr>
                </>

                {/* <tr>
                  <td>
                    <div className="final-bill">
                      <div>
                        <div className="alignment-text">
                          <div className="first-child">
                            <span>Gross Total </span>
                          </div>
                          <div className="sec-child" align="right">
                            <span> {this?.props?.data?.grossTotal}</span>
                          </div>
                        </div>
                        <div className="alignment-text">
                          <div className="first-child">
                            <span>Discount (%) </span>
                          </div>
                          <div className="sec-child" align="right">
                            <span>
                              6546
                            </span>
                          </div>
                        </div>
                        <div className="alignment-text">
                          <div className="first-child">
                            <span>Discounted Price</span>
                          </div>
                          <div className="sec-child" align="right">
                            <span>
                              6546
                            </span>
                          </div>
                        </div>
                        <div className="alignment-text">
                          <div className="first-child">
                            <span>GST (%) </span>
                          </div>
                          <div className="sec-child" align="right">
                            <span>
                             6546
                            </span>
                          </div>
                        </div>
                        <div className="alignment-text">
                          <div className="first-child">
                            <span
                            // style={{ fontWeight: "600", fontSize: "13px" }}
                            >
                              Net Total Price
                            </span>
                          </div>
                          <div className="sec-child" align="right">
                            <span
                              style={{ fontWeight: "600", fontSize: "13px" }}
                            >
                              {this?.props?.data?.totalAmount}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="thanks-message">
                      <p>
                        Amount in words:{" "}
                        {amountToWords(
                          Math.round(6544.00)
                        )}{" "}
                        Rupees Only
                      </p>
                      <span>
                        Due Amount:{" "}
                        6546456 due amount has been
                        recorded to this invoice
                      </span>
                      <span>
                        Balance Amount:{" "}
                        5646 advance amount
                        has been added to your wallet
                      </span>
                      <span>
                        Paid by{" "}
                      </span>
                      <span>
                        {" "}
                        <i>Thanks for your visit</i>{" "}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="terms">
                      <p>Terms and Conditions</p>
                      <ul>
                        <li>Material once sold will not be returned.</li>
                        <li>
                          All disputes are subjected to local jurisdiction.
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr> */}
              </table>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default ComponentToPrint;
