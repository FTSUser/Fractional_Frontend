import React, { useState, useEffect } from "react";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import "./ProductDisclaimer.scss";
import { handleGetTokenPrice } from "../../Helpers/CommonAPI/CommonAPI";
import { compareProperty } from "../../atom/compareProperty";
import { useAtom } from "jotai";
export default function ProductDisclaimer(props) {
  const propertyData = props?.location?.state?.data;
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));

  const [tokenPrice, setTokenPrice] = useState();
  const [idForCompare, setIdForCompare] = useAtom(compareProperty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    setLoading(true);
    handleGetTokenPrice()
      .then((res) => {
        setLoading(false);
        setTokenPrice(res?.token.amount); // token price is in lacs
      })
      .catch((err) => {
        setLoading(false);
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

  const handleBuyProperty = () => {
    const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = "data";
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amt, id: order_id } = result;
    const price = tokenPrice;

    const options = {
      key: "rzp_test_zxRbsLCk9aPfJK", // Enter the Key ID generated from the Dashboard
      // key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: price * 10000000, // Amount is in currency subunits. Default currency is INR. Hence, 10000000 refers to 100000 INR or 1 Lac
      // amount: 0.15 * 10000000,
      currency: "INR",
      name: "Our Leisure Home",
      description: "Our Leisure Home Transaction",
      order_id: order_id,
      handler: async function (response) {
        let data = {
          uid: userDetails?.id,
          pid: propertyData?._id,
          aid: propertyData?.adminid,
          paymentId: response.razorpay_payment_id,
          price: price * 100000, // token price in lacs so multiply by 100000
          type: "token",
        };
        const result = await ApiPost("order/addOrder", data);

        try {
          if (result?.data?.result === 0) {
            toast.success(result.data.message);
            setIdForCompare();
            props.history.push("/myaccount");
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
    <div>
      {/* <ToastContainer /> */}
      <div className="product-disclaimer-section">
        <div className="container">
          <h1>Summary</h1>
          <div className="cus-table-responsive">
            <table>
              <tr>
                <th>Description</th>
                <th>BHK</th>
                <th>Sqft</th>
                <th>Distinctive Amenities</th>
                <th>Owner</th>
              </tr>
              <tr>
                <td>
                  <div className="flex-box">
                    <div>
                      <img src={propertyData?.photos[0]?.imgPath} />
                    </div>
                    <div>
                      <p>{propertyData?.address?.name}</p>
                      <p>{propertyData?.address?.city},</p>
                      <p>
                        {propertyData?.address?.state}
                        {", "}
                        {propertyData?.address?.country}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{propertyData?.beds} Beds</span>
                </td>
                <td>
                  <span>{propertyData?.sqft} sqft</span>
                </td>
                <td>
                  <span>
                    {propertyData?.amenities?.length > 0
                      ? propertyData?.amenities
                          ?.map((amenities) => amenities?.name)
                          .join(", ")
                      : "No Amenities"}
                  </span>
                </td>
                <td>
                  <span>{propertyData?.ownership} Owner</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="tokenmainsection">
            <div></div>
            <div className="tokensection">
              <div className="token">
                <div className="tokentext">
                  <span>Token Price</span>
                </div>

                <div className="price">
                  <span>₹{tokenPrice}Lakh</span>
                </div>
              </div>
              <div className="token token1">
                <div className="tokentext">
                  <span>Total Price</span>
                </div>
                <div className="price">
                  <span>₹{propertyData?.wholeHomePrice}Lakh</span>
                </div>
              </div>

              <button onClick={() => handleBuyProperty()} className="buybtn">
                Buy Now
              </button>
              <div className="TnC-div">
                <p>T & C Apply*</p>
              </div>
            </div>
            <div></div>
          </div>

          <div className="termsText">
            <hr />
            <h2>Terms & Conditions</h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32. The
              standard chunk of Lorem Ipsum used since the 1500s is reproduced
              below for those interested. Sections 1.10.32 and 1.10.33 from "de
              Finibus Bonorum et Malorum" by Cicero are also reproduced in their
              exact original form, accompanied by English versions from the 1914
              translation by H. Rackham.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
