import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CompareProperties.scss";
import Slider from "react-slick";
import { ApiPost, ApiGet } from "../../Helpers/Api/ApiData";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { compareProperty } from "../../atom/compareProperty";
import { PriceFormet } from "./PriceFormet";

function SampleArrow(props) {
  const { type, onClick } = props;
  return (
    <div
      className={`arrow-slide-design ${type}-arrow-alignment`}
      onClick={onClick}
    >
      <i class={`fa-solid fa-${type}-long`}></i>
    </div>
  );
}

export default function CompareProperties(props) {
  const history = useHistory();
  const [allProperty, setAllProperty] = useState([]);
  const [compareDropdown, setCompareDropdown] = useState(false);
  const [comparePropertyData, setComparePropertyData] = useState([]);
  const [idForCompare, setIdForCompare] = useAtom(compareProperty);

  useEffect(() => {
    handleCompere();
    getAllProperty();
  }, [idForCompare]);

  const getAllProperty = async () => {
    await ApiPost("property/getPropertys?isUser=true")
      .then((res) => {
        if (idForCompare && idForCompare.length > 0) {
          let data = res.data.payload?.Propertys.filter((item) => {
            return !idForCompare.includes(item._id);
          });
          setAllProperty(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSetComapreProperty = (e) => {
    setCompareDropdown(!compareDropdown);
    let propertyId = e;
    if (idForCompare.length < 5) {
      setIdForCompare([...idForCompare, propertyId]);
    } else {
      toast.error("You can't compare more than 5 properties");
    }
  };

  const handleRemoveCompareProperty = (e) => {
    let propertyId = e;
    let newId = idForCompare.filter((item) => item !== propertyId);
    setIdForCompare(newId);
  };

  const handleCompere = async (e) => {
    let data = {
      compareId: idForCompare,
    };
    await ApiPost("property/compareProperty", data)
      .then((res) => {
        if (res?.status === 200) {
          setComparePropertyData(res?.data?.payload?.Property);
        } else {
          console.log(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleArrow type="right" />,
    prevArrow: <SampleArrow type="left" />,
  };

  const handleBuyPropertyPage = (properties) => {
    history.push({
      pathname: "/productdisclaimer",
      state: { data: properties },
    });
  };
  const handleAddMoreProperty = () => {
    history.push("/properties");
  };

  return (
    <div>
      <section className="comparepropertie-section">
        <div className="container">
          <div className="page-title">
            <h1>Compare Properties</h1>
          </div>
          <div className="flex-box">
            <div className="flex-box-items">
              <div className="compare-slider-menu">
                <div className="add-prop-div">
                  <button
                    onClick={handleAddMoreProperty}
                    className="cusPointer"
                  >
                    Add More Property
                  </button>
                </div>
                <div
                  className={
                    compareDropdown
                      ? "compare-dropdown compare-dropdown-show"
                      : "compare-dropdown compare-dropdown-hideen"
                  }
                >
                  <div className="compare-dropdown-design">
                    <ul>
                      {allProperty?.map((item, index) => {
                        return (
                          <li
                            onClick={(e) => handleSetComapreProperty(item?._id)}
                          >
                            {item?.address?.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="compare-details-title">
                <ul>
                  <li>Property Name</li>
                  <li>Address</li>
                  <li>Size in BHK</li>
                  <li>Size in Sqft.</li>
                  <li>Distinctive Amenities</li>
                  <li>Total Asset Value</li>
                  <li>Expected ROI</li>
                  <li>Expected Rental Per year</li>
                  <li>Expected Exit Value</li>
                </ul>
              </div>
            </div>

            {comparePropertyData.map((property, i) => {
              let expectedIOR = PriceFormet(property?.expectedIOR)
              let expectedRentalPerYear = PriceFormet(property?.expectedRentalPerYear)
              let expectedExitValue = PriceFormet(property?.expectedExitValue)
              return (
                <>
                  <div className="flex-box-items">
                    <div className="compare-slider ">
                      <div
                        className="close-icon-compare-card"
                        onClick={(e) =>
                          handleRemoveCompareProperty(property?._id)
                        }
                      >
                        <i
                          className="fa fa-times"
                          style={{ color: "#E83B3B" }}
                        ></i>
                      </div>
                      <Slider {...settings}>
                        {property?.photos?.map((item, index) => {
                          return (
                            <div>
                              <img src={item?.imgPath} alt="" />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="compare-details">
                      <ul>
                        <li>{property?.address?.name}</li>
                        <li>
                          <span>{property?.address?.city}</span>
                        </li>
                        <li>{property?.baths} Beds</li>
                        <li>{property?.sqft} sqft</li>
                        <li>
                          {property?.amenities.map((amenitie) => {
                            return <>{amenitie?.name} </>;
                          })}
                        </li>
                        <li>₹ {property?.wholeHomePrice} Lakh</li>
                        <li>₹ {expectedIOR}</li>
                        <li>₹ {expectedRentalPerYear}</li>
                        <li>₹ {expectedExitValue}</li>
                      </ul>
                    </div>
                    {property?.orderStatus === "false" && (
                      <div className="buy-button">
                        <button
                          onClick={() => {
                            handleBuyPropertyPage(property);
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
            {[...Array(5 - comparePropertyData.length)].map((item, i) => {
              return (
                <div className="flex-box-items">
                  <div className="compare-slider compare-slider-gray-background">
                    <div className="relative-map-icon"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
