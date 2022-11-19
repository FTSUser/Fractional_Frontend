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
                      <h5>Interest Received Receipt </h5>
                    </div>
                    <div className="parlour-details" align="right">
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
                      </div>
                      <div className="right-side" align="right">
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
              </table>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default ComponentToPrint;
