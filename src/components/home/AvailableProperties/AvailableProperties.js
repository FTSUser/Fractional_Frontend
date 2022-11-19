import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import "./AvailableProperties.scss";
import { ApiPost } from "../../../Helpers/Api/ApiData";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";

export default function AvailableProperties() {
  const [properties, setProperties] = useState([]);
  const [latestPropeties, setLatestPropeties] = useState([]);
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProperty = async (e) => {
    if (userDetails?.id) {
      await ApiPost(`property/getPropertys?isFresh=true&uid=${userDetails.id}&isUser=true`)
        .then((res) => {
          setProperties(res?.data?.payload?.data);
        })
        .catch((err) => {
          toast.error(err?.message);
        });

    } else {
      await ApiPost(`property/getPropertys?isFresh=true&isUser=true`)
        .then((res) => {
          setProperties(res?.data?.payload?.data);
        })
        .catch((err) => {
          toast.error(err?.message);
        });

    }
  };

  useEffect(() => {
    const dateSort = properties?.sort(function (a, b) {
      return new Date(b.creationDate) - new Date(a.creationDate);
    });
    setLatestPropeties(dateSort?.slice(0, 3));
  }, [properties]);
  return (
    <div>
      <section>
        <div className="available-properties-section-alignment">
          {/* <ToastContainer /> */}
          <div className="container">
            <div className="page-title-alignment">
              <h1>Available Properties</h1>
              <NavLink to="/properties">
                <span>Explore All</span>
              </NavLink>
            </div>
            <div className="card-grid">
              {latestPropeties?.length > 0 &&
                latestPropeties.map((property, id) => {
                  let PropertyPrice = property.wholeHomePrice / property.ownership
                  const propertyPriceFixed = PropertyPrice.toFixed(2);
                  return (
                    <div className="card-grid-items">
                      <div>
                        <AwesomeSlider
                          autoPlay={true}
                          play={true}
                          cancelOnInteraction={false}
                          interval={1000}
                          cssModule={AwesomeSliderStyles}
                          showTimer={true}
                          bullets={false}
                        >
                          {property?.photos?.length > 0 &&
                            property?.photos?.map((photo, i) => {
                              return (
                                <div className="card-images">
                                  <img
                                    src={photo?.imgPath}
                                    alt="HeroBannerImage"
                                  />
                                </div>
                              );
                            })}
                        </AwesomeSlider>
                        <div className="card-details">
                          <div className="location-text-alignment">
                            <div>
                              <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                              <span>
                                {property?.address?.city}
                                {", "}
                                {property?.address?.state}
                                {", "}
                                {property?.address?.country}
                              </span>
                            </div>
                          </div>
                          <h2>
                            {property?.address?.street}
                            {", "}
                            {property?.address?.city}
                            {", "}
                            {property?.address?.state}
                            {", "}
                            {property?.address?.country}
                          </h2>
                          <div className="assets-value-alignment">
                            <div className="assets-value-show">
                              <p>{property?.beds} Beds</p>
                            </div>
                            <div className="assets-value-show">
                              <p>{property?.baths} Baths</p>
                            </div>
                            <div className="assets-value-show">
                              <p>{property?.sqft} sqft</p>
                            </div>
                          </div>
                          <div className="child-grid">
                            <div className="child-grid-items">
                              <h5>
                                ₹ {property?.wholeHomePrice} {property?.priceType}
                              </h5>
                              <span>Asset Value</span>
                            </div>
                            <div className="child-grid-items">
                              <h5>{propertyPriceFixed.includes(".00") ? PropertyPrice.toFixed(1) : PropertyPrice.toFixed(2)} Lakh</h5>
                              <span>Minimum Investment</span>
                            </div>
                            <div className="child-grid-items">
                              <h5>{property?.ownership}</h5>
                              <span>No. of Ownership</span>
                            </div>
                            <div className="child-grid-items">
                              <h5>{property?.rentalYield}%</h5>
                              <span>Rental Yield</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="button-Alignment">
                        <div className="button-style">
                          <NavLink
                            to={{
                              pathname: `/propertiesdetails/${property?._id}`,
                              state: { property: property },
                            }}
                          >
                            <button>View Property</button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
