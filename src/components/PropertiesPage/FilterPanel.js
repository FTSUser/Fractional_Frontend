import React, { useState } from "react";
import "./PropertiesPage.scss";
export default function FilterPanel(props) {
  const {
    amenitiesFilterFilters,
    locationFilter,
    selectedSize,
    selectedPrice,
    typeValue,
    stateShow,
    amenityShow,
    setStreetShow,
    streetShow,
    cityShow,
    countryShow,
    setCityShow,
    setSelectedSize,
    setSelectedPrice,
    setTypeValue,
    setStateShow,
    setCountryShow,
    setAmenityShow,
  } = props;
  const [filterMenu, setFilterMenu] = useState(false);
  const [filterMenu1, setFilterMenu1] = useState(false);
  const [filterMenu2, setFilterMenu2] = useState(false);
  const [filterMenu4, setFilterMenu4] = useState(false);
  const [filterMenu5, setFilterMenu5] = useState(false);
  const [filterMenu6, setFilterMenu6] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);

  return (
    <>
      <div className="filter-panel-sticky filter-panel-sticky-none">
        <div className="filter-panel-box">
          <div className="filter-title">
            <p>Filter</p>
          </div>
          <div className="filter-bottom-align">
            <div
              className="filter-menu-design"
              onClick={() => setFilterMenu(!filterMenu)}
            >
              <p>Type</p>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={filterMenu ? "filter-menu-show" : "filter-menu-hidden"}
            >
              <div className="filter-submenu-alignment">
                <input
                  type="checkbox"
                  value="Villa"
                  onClick={() => {
                    if (typeValue?.includes("Villa")) {
                      setTypeValue((crr) =>
                        crr.filter((crr1) => crr1 !== "Villa")
                      );
                    } else {
                      setTypeValue((crr) => [...crr, "Villa"]);
                    }
                  }}
                />
                <span>Villa</span>
              </div>
              <div className="filter-submenu-alignment">
                <input
                  type="checkbox"
                  value="Apartment"
                  onClick={() => {
                    if (typeValue?.includes("Apartment")) {
                      setTypeValue((crr) =>
                        crr.filter((crr1) => crr1 !== "Apartment")
                      );
                    } else {
                      setTypeValue((crr) => [...crr, "Apartment"]);
                    }
                  }}
                />
                <span>Apartment</span>
              </div>
            </div>
          </div>
          <div className="filter-bottom-align">
            <div
              className="filter-menu-design"
              onClick={() => setFilterMenu6(!filterMenu6)}
            >
              <p>Country</p>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={filterMenu6 ? "filter-menu-show" : "filter-menu-hidden"}
            >
              {locationFilter?.country?.length > 0 &&
                locationFilter?.country?.map((country, i) => {
                  return (
                    <div className="filter-submenu-alignment">
                      <div>
                        <input
                          type="checkbox"
                          value={country?._id}
                          onClick={() => {
                            if (countryShow.includes(country?._id)) {
                              setCountryShow((crr) =>
                                crr.filter((crr1) => crr1 !== country?._id)
                              );
                            } else {
                              setCountryShow((crr) => [...crr, country?._id]);
                            }
                          }}
                        />
                      </div>
                      <div>
                        <span>{country?._id}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="filter-bottom-align">
            <div
              className="filter-menu-design"
              onClick={() => setFilterMenu2(!filterMenu2)}
            >
              <p>State</p>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={filterMenu2 ? "filter-menu-show" : "filter-menu-hidden"}
            >
              {locationFilter?.state?.length > 0 &&
                locationFilter?.state?.map((state, i) => {
                  return (
                    <div className="filter-submenu-alignment">
                      <div>
                        <input
                          type="checkbox"
                          value={state?._id}
                          onClick={() => {
                            if (stateShow.includes(state?._id)) {
                              setStateShow((crr) =>
                                crr.filter((crr1) => crr1 !== state?._id)
                              );
                            } else {
                              setStateShow((crr) => [...crr, state?._id]);
                            }
                          }}
                        />
                      </div>
                      <div>
                        <span>{state?._id}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="range-first-text">
            <p>
              Investment Range:<span>₹ 0 to ₹ {Math.ceil(selectedPrice)} Lakh</span>
            </p>
          </div>
          <div className="range-style">
            <input
              type="range"
              className="slider"
              min="0"
              max={Math.ceil(locationFilter?.maxPrice?.investmentRange)}
              // value={selectedPrice}
              value={Math.ceil(selectedPrice)}

              onChange={(e) => {
                setSelectedPrice(e.target.value);
              }}
            />
          </div>
          <div className="last-range-alignment">
            <div className="range-first-text">
              <p>
                Size:
                <span>
                  0 sqft to {selectedSize} sqft{" "}
                </span>
              </p>
            </div>
            <div className="range-style">
              <input
                type="range"
                className="slider"
                min="0"
                max={locationFilter?.maxsqft?.sqft}
                value={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="filter-bottom-align  filter-top-align-last-child">
            <div
              className="filter-menu-design"
              onClick={() => setFilterMenu4(!filterMenu4)}
            >
              <p>Amenities</p>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={filterMenu4 ? "filter-menu-show" : "filter-menu-hidden"}
            >
              {amenitiesFilterFilters?.length > 0 &&
                amenitiesFilterFilters.map((amenity, i) => {
                  return (
                    <div className="filter-submenu-alignment">
                      <input
                        type="checkbox"
                        value={amenity?._id}
                        onClick={() => {
                          if (amenityShow.includes(amenity?._id)) {
                            setAmenityShow((crr) =>
                              crr.filter((crr1) => crr1 !== amenity?._id)
                            );
                          } else {
                            setAmenityShow((crr) => [...crr, amenity?._id]);
                          }
                        }}
                      />
                      <span>{amenity?.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-filter-show">
        <div className="filter-view-mobile">
          <button onClick={() => setMobileFilter(!mobileFilter)}>Filter</button>
        </div>
      </div>
      <div className={mobileFilter ? "mobile-filter-design mobile-filter-open" : "mobile-filter-design mobile-filter-close"}>
        <div className="mobile-filter-panel">
          <div className="filter-panel-sticky">
            <div className="filter-panel-box">
              <div className="filter-title mobile-filter-title">
                <p>Filter</p>
                <i onClick={() => setMobileFilter(false)} class="fas fa-times"></i>
              </div>
              <div className="filter-botttom-mobile-align"></div>
              <div className="filter-bottom-align">
                <div
                  className="filter-menu-design"
                  onClick={() => setFilterMenu(!filterMenu)}
                >
                  <p>Type</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div
                  className={filterMenu ? "filter-menu-show" : "filter-menu-hidden"}
                >
                  <div className="filter-submenu-alignment">
                    <input
                      type="checkbox"
                      value="Available Now"
                      onClick={() => {
                        if (typeValue?.includes("Available Now")) {
                          setTypeValue((crr) =>
                            crr.filter((crr1) => crr1 !== "Available Now")
                          );
                        } else {
                          setTypeValue((crr) => [...crr, "Available Now"]);
                        }
                      }}
                    />
                    <span>Available Now</span>
                  </div>
                  <div className="filter-submenu-alignment">
                    <input
                      type="checkbox"
                      value="Prospect"
                      onClick={() => {
                        if (typeValue?.includes("Prospect")) {
                          setTypeValue((crr) =>
                            crr.filter((crr1) => crr1 !== "Prospect")
                          );
                        } else {
                          setTypeValue((crr) => [...crr, "Prospect"]);
                        }
                      }}
                    />
                    <span>Prospect</span>
                  </div>
                </div>
              </div>
              <div className="filter-bottom-align">
                <div
                  className="filter-menu-design"
                  onClick={() => setFilterMenu2(!filterMenu2)}
                >
                  <p>State</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div
                  className={filterMenu2 ? "filter-menu-show" : "filter-menu-hidden"}
                >
                  {locationFilter?.state?.length > 0 &&
                    locationFilter?.state?.map((state, i) => {
                      return (
                        <div className="filter-submenu-alignment">
                          <div>
                            <input
                              type="checkbox"
                              value={state?._id}
                              onClick={() => {
                                if (stateShow.includes(state?._id)) {
                                  setStateShow((crr) =>
                                    crr.filter((crr1) => crr1 !== state?._id)
                                  );
                                } else {
                                  setStateShow((crr) => [...crr, state?._id]);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <span>{state?._id}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="filter-bottom-align">
                <div
                  className="filter-menu-design"
                  onClick={() => setFilterMenu1(!filterMenu1)}
                >
                  <p>City</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div
                  className={filterMenu1 ? "filter-menu-show" : "filter-menu-hidden"}
                >
                  {locationFilter?.city?.length > 0 &&
                    locationFilter?.city?.map((city, i) => {
                      return (
                        <div className="filter-submenu-alignment">
                          <input
                            type="checkbox"
                            value={city?._id}
                            onClick={() => {
                              if (cityShow.includes(city?._id)) {
                                setCityShow((crr) =>
                                  crr.filter((crr1) => crr1 !== city?._id)
                                );
                              } else {
                                setCityShow((crr) => [...crr, city?._id]);
                              }
                            }}
                          />
                          <span>{city?._id}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="filter-bottom-align">
                <div
                  className="filter-menu-design"
                  onClick={() => setFilterMenu5(!filterMenu5)}
                >
                  <p>Location</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div
                  className={filterMenu5 ? "filter-menu-show" : "filter-menu-hidden"}
                >
                  {locationFilter?.street?.length > 0 &&
                    locationFilter?.street?.map((street, i) => {
                      return (
                        <div className="filter-submenu-alignment">
                          <div className="checkbox-center-align">
                            <input
                              type="checkbox"
                              value={street?._id}
                              onClick={() => {
                                if (streetShow.includes(street?._id)) {
                                  setStreetShow((crr) =>
                                    crr.filter((crr1) => crr1 !== street?._id)
                                  );
                                } else {
                                  setStreetShow((crr) => [...crr, street?._id]);
                                }
                              }}
                            />
                          </div>
                          <div className="location-text-alignment">
                            <span>{street?._id}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="range-first-text">
                <p>
                  Investment Range:<span>₹ 0 to ₹ {Math.ceil(selectedPrice)} Lakh</span>
                </p>
              </div>
              <div className="range-style">
                <input
                  type="range"
                  className="slider"
                  min="0"
                  max={Math.ceil(locationFilter?.maxPrice?.wholeHomePrice)}
                  // value={selectedPrice}
                  value={Math.ceil(selectedPrice)}
                  onChange={(e) => {
                    setSelectedPrice(e.target.value);
                  }}
                />
              </div>
              <div className="last-range-alignment">
                <div className="range-first-text">
                  <p>
                    Size:
                    <span>
                      0 m<sup>2</sup> to {selectedSize} m<sup>2</sup>{" "}
                    </span>
                  </p>
                </div>
                <div className="range-style">
                  <input
                    type="range"
                    className="slider"
                    min="0"
                    max={locationFilter?.maxsqft?.sqft}
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="filter-bottom-align  filter-top-align-last-child">
                <div
                  className="filter-menu-design"
                  onClick={() => setFilterMenu4(!filterMenu4)}
                >
                  <p>Amenities</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div
                  className={filterMenu4 ? "filter-menu-show" : "filter-menu-hidden"}
                >
                  {amenitiesFilterFilters?.length > 0 &&
                    amenitiesFilterFilters.map((amenity, i) => {
                      return (
                        <div className="filter-submenu-alignment">
                          <input
                            type="checkbox"
                            value={amenity?._id}
                            onClick={() => {
                              if (amenityShow.includes(amenity?._id)) {
                                setAmenityShow((crr) =>
                                  crr.filter((crr1) => crr1 !== amenity?._id)
                                );
                              } else {
                                setAmenityShow((crr) => [...crr, amenity?._id]);
                              }
                            }}
                          />
                          <span>{amenity?.name}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={mobileFilter && "mobile-filter-blur"}>

      </div>
    </>
  );
}
