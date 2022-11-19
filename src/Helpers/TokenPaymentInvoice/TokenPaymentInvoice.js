import React, { forwardRef } from "react";
import "./TokenPaymentInvoice.scss";

class TokenPaymentInvoice extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { receiptData, userDetails } = this.props;
    console.log("receiptData", receiptData);
    return (
      <>
        <div className="body">
          <div style={{ margin: 0, padding: 0 }}>
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
                        <div
                          style={{
                            borderCollapse: "collapse",
                            width: "715px",
                            margin: "20px 0",
                          }}
                        >
                          <div>
                            <img
                              style={{
                                width: "100%",
                                height: "320px",
                                objectPosition: "center",
                                objectFit: "cover",
                              }}
                              src={receiptData?.pid?.photos[0]?.imgPath}
                            />
                          </div>
                          <div style={{ padding: "20px 0" }}>
                            <p
                              style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#010101",
                                fontWeight: 400,
                                margin: "0 0 10px 0",
                              }}
                            >
                              Dear Mr./Ms. {userDetails?.fullName}
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#010101",
                                fontWeight: 400,
                                margin: "0 0 10px 0",
                              }}
                            >
                              Thanks for choosing to invest in the
                              <span
                                style={{
                                  textDecorationLine: "underline",
                                  padding: "0 2px",
                                }}
                              >
                                {receiptData?.pid?.address?.name}
                              </span>
                              (Name of property with location) Oppotrunity
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#010101",
                                fontWeight: 400,
                              }}
                            >
                              Please note, we acknowledge the receipt of Balance
                              Amount of INR{" "}
                              <span
                                style={{
                                  textDecorationLine: "underline",
                                  padding: "0 2px",
                                }}
                              >
                                {receiptData?.pid?.investmentRange}
                              </span>
                              as per below details.
                            </p>
                          </div>
                          <div style={{ padding: "0 40px" }}>
                            <div
                              style={{
                                backgroundColor: "#e83b3b",
                                padding: "10px",
                                textAlign: "center",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                  margin: 0,
                                  fontWeight: 500,
                                  color: "#fff",
                                }}
                              >
                                Our Leisure Home - Receipt
                              </p>
                            </div>
                            <div>
                              <div class="group">
                                <div
                                  style={{
                                    width: "50%",
                                    float: "left",
                                    padding: "15px 5px",
                                    backgroundColor: "#cccccc",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "block",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "#000",
                                      textAlign: "center",
                                    }}
                                  >
                                    Description of the Property
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    float: "right",
                                    padding: "15px 5px",
                                    backgroundColor: "#e7e7e7",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "block",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "#000",
                                      textAlign: "center",
                                    }}
                                  >
                                    {`${receiptData?.pid?.address?.street}, ${receiptData?.pid?.address?.city}, ${receiptData?.pid?.address?.state}, ${receiptData?.pid?.address?.country} - ${receiptData?.pid?.address?.pincode}`}
                                  </span>
                                </div>
                              </div>
                              <div
                                class="group"
                                style={{
                                  borderBottom: "1px solid #d0d0d0",
                                  borderRight: "1px solid #d0d0d0",
                                }}
                              >
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                   Total Asset Value(INR)
                                  </span>
                                </div>
                                <div className="blank-box-span">
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
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Total No, of Share for the Asset
                                  </span>
                                </div>
                                <div className="blank-box-span">
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
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                   Your investment in the Asset(INR)
                                  </span>
                                </div>
                                <div className="blank-box-span">
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
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                     No of Share that you have shown intrest in
                                  </span>
                                </div>
                                <div className="blank-box-span">
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
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Token Amount Received(INR)
                                  </span>
                                </div>
                                <div className="blank-box-span">
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
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Balance Amount Received (INR)
                                  </span>
                                </div>
                                <div className="blank-box-span">
                                  <span></span>
                                </div>
                              </div>
                              {/* <div
                                class="group"
                                style={{
                                  borderBottom: "1px solid #d0d0d0",
                                  borderRight: "1px solid #d0d0d0",
                                }}
                              >
                                <div
                                  style={{
                                    width: "80%",
                                    padding: "8px",
                                    borderRight: "1px solid #d0d0d0",
                                    borderLeft: "1px solid #d0d0d0",
                                    float: "left",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Total No, of Share for the Asset
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: "20%",
                                    padding: "8px",
                                    float: "right",
                                    textAlign: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "#000",
                                      fontWeight: 500,
                                      textAlign: "center",
                                    }}
                                  >
                                    Yes
                                  </span>
                                </div>
                              </div> */}
                            </div>
                            <div>
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 400,
                                  color: "#010101",
                                  display: "block",
                                  padding: "3px 10px 0 10px",
                                }}
                              >
                                The Amount mentioned abover are inclusive of the
                                Applicable Taxes.
                              </span>
                            </div>
                            <div style={{ padding: "20px 0 0 0" }}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 400,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Nam fugiat, dolorum tempora
                                officia incidunt facilis eum iste porro magnam
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 400,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                We understand that by depositing this token
                                amount, you are aware of
                              </p>
                              <ul
                                style={{
                                  listStyle: "devanagari",
                                  margin: "10px 0 0 0",
                                  padding: 0,
                                  paddingLeft: "1.25rem",
                                }}
                              >
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  This is only expression of interset in the
                                  peoperty and not a binfing offer:
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  Prperty size, location. build quality etc. and
                                  the property is available on "as is, where is
                                  and whatsever us" basis
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  Yout will be the part-owner of the property
                                  oin a pro-rata basis of your share to the
                                  Total Asset Value if the property
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  Your will get usage rights on a pro-rata basis
                                  of your share to the Total Asset Value of the
                                  property
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  Other documents related to Shareholders
                                  Agreement, Article of Association, Memorandum
                                  of Association, Asset Management Agreement
                                  witll be shared at the time of balance
                                  payment.
                                </li>
                              </ul>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 500,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                Meanwhile, yout may please note the following
                                points, for your information:
                              </p>
                              <div>
                                <button
                                  style={{
                                    padding: "5px 18px",
                                    fontSize: "13px",
                                    lineHeight: "20px",
                                    color: "#fff",
                                    border: "none",
                                    backgroundColor: "#e83b3b",
                                    cursor: "pointer",
                                  }}
                                >
                                  In the event:
                                </button>
                              </div>
                              <ul
                                style={{
                                  listStyle: "devanagari",
                                  margin: "10px 0 0 0",
                                  padding: 0,
                                  paddingLeft: "1.25rem",
                                }}
                              >
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  OurLeisureHome is unable to complete the
                                  intended fund-raise to cinsummate the proposed
                                  transaction by{" "}
                                  <span style={{ textDecoration: "underline" }}>
                                   {userDetails?.fullName}
                                  </span>{" "}
                                  or
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  You register the interset and want to cancel
                                  your commitment in this Oppotrunity within 10
                                  working/ business days
                                </li>
                              </ul>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 500,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                On the occurrence of above events, the upfront
                                token amount will be reimbursed to you in
                                complete.
                              </p>
                              <div>
                                <button
                                  style={{
                                    padding: "5px 18px",
                                    fontSize: "13px",
                                    lineHeight: "20px",
                                    color: "#fff",
                                    border: "none",
                                    backgroundColor: "#e83b3b",
                                    cursor: "pointer",
                                  }}
                                >
                                  In the event:
                                </button>
                              </div>
                              <ul
                                style={{
                                  listStyle: "devanagari",
                                  margin: "10px 0 0 0",
                                  padding: 0,
                                  paddingLeft: "1.25rem",
                                }}
                              >
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  OutLeisureHome makes an offer, and you have
                                  not responded to the offer within the outlined
                                  time period or
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  OurLeisureHome males an offer, and you have
                                  acknowledge the offer but have not completed
                                  the trabsfer of the balance amount within the
                                  outlined time period or
                                </li>
                                <li
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    fontWeight: 500,
                                    padding: "0 0 15px 0",
                                  }}
                                >
                                  You register the inteerst and want to cancel
                                  you commitment in this Oppotrunity after 10
                                  working / business days
                                </li>
                              </ul>
                              <div
                                style={{
                                  padding: "0 0 10px 0",
                                  borderBottom: "10px solid #e83b3b",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#010101",
                                    fontWeight: 500,
                                    margin: "0 0 10px 0",
                                  }}
                                >
                                  On the occurrence of above events, a
                                  termination fee (" Termination Fee ") will be
                                  applicable amounting to 50% (fifty percent )
                                  of your intial token amount. it is to be
                                  understood and agreed that the Termination fee
                                  is to compensate OurLeisureHome for the
                                  estimated efforts, loss and damages arising
                                  from aforesaid events. The Parites agree that
                                  the said Termination Fee is a genuine
                                  pre-estimate and are fair abd reasonable and
                                  are not in the from of penalites, In this
                                  case, the Termination Fee shall be adjusted
                                  from the token amount and the balance amount
                                  will be reumbursed to you within 72 working
                                  hours...
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#010101",
                                    fontWeight: 500,
                                    margin: "0 0 10px 0",
                                  }}
                                >
                                  If such an event is to occur, once the amount
                                  is reimbursed, as applicable, you agree that
                                  OurLeisureHome shall have no further
                                  liabilties towards you & you shall have no
                                  claim or right or obilgation on OurLeisureHome
                                  or this Oppotrunity.
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#010101",
                                    fontWeight: 500,
                                    margin: "0 0 10px 0",
                                  }}
                                >
                                  Thanks.
                                </p>
                              </div>
                            </div>

                            <div
                              style={{
                                padding: "20px 0 10px 0",
                                borderBottom: "10px solid #e83b3b",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 500,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                Our team will connect with you within 48 working
                                hours, to discuss the further process & steps to
                                complete your aspirational purchase
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#010101",
                                  fontWeight: 500,
                                  margin: "0 0 10px 0",
                                }}
                              >
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
        </div>
      </>
    );
  }
}

export default TokenPaymentInvoice;
