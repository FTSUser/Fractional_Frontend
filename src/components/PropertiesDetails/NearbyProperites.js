import React from 'react'
import "./PropertiesDetails.scss";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import { useHistory } from "react-router-dom";

function NearbyProperites(props) {
    const { latestPropeties } = props;
    const history = useHistory();

    const handleSetPropertyData = (property) => {
        history.push({
            pathname: `/propertiesdetails/${property?._id}`,
            state: property,
        })
    }

    return (
        <section className="near-by-properties">
            <div className="container">
                <div className="near-by-title">
                    <h2>Nearby Properties</h2>
                </div>
                <div className="card-grid">

                    {latestPropeties?.length > 0 &&
                        latestPropeties?.map((property, index) => {
                            let PropertyPrice = property.wholeHomePrice / property.ownership
                            const propertyPriceFixed = PropertyPrice.toFixed(2);
                            return (
                                <div className="card-grid-items">

                                    <AwesomeSlider
                                        autoPlay={true}
                                        play={true}
                                        cancelOnInteraction={false}
                                        interval={1000}
                                        cssModule={AwesomeSliderStyles}
                                        showTimer={true}
                                        bullets={false}
                                    // cssModule={AwesomeSliderStyles}
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
                                                    ₹ {property?.wholeHomePrice}{" "}
                                                    {property?.priceType}
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
                                    <div onClick={() => handleSetPropertyData(property)}>
                                        <div className="button-style">
                                            <button>View Properties</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    )
}

export default NearbyProperites