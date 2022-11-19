import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import FilterPanel from "./FilterPanel";
import "./PropertiesPage.scss";
import CardImage from "../../Assets/Images/11.png";
import SearchIcon from "../../Assets/Images/s.svg";
import MenuIcon from "../../Assets/Images/menu.png";
import GridIcon from "../../Assets/Images/new-icon.png";
import { ApiPost, ApiGet, ApiPostNoAuth } from "../../Helpers/Api/ApiData";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { compareProperty } from "../../atom/compareProperty";
export default function PropertiesPage() {
  const wrapperRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState(false);
  const [amenitiesFilterFilters, setAmenitiesFilterFilters] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [typeValue, setTypeValue] = useState([]);
  const [stateShow, setStateShow] = useState([]);
  const [streetShow, setStreetShow] = useState([]);
  const [countryShow, setCountryShow] = useState([]);
  const [amenityShow, setAmenityShow] = useState([]);
  const [cityShow, setCityShow] = useState([]);
  const [displayType, setDisplayType] = useState("grid");
  const [dataLowOrHigh, setDataLowOrHigh] = useState("");
  const [isSort, setIsSort] = useState("false");
  const [limit, setLimit] = useState(4);
  const [count, setCount] = useState();
  const [sortByProp, setSortByProp] = useState("");
  const [search, setSearch] = useState("");
  const [idForCompare, setIdForCompare] = useAtom(compareProperty);
  const [propertyList, setPropertyList] = useState("available");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  let userDetails = JSON.parse(localStorage.getItem("userinfo"));

  // useEffect(() => {
  //   getFilters();
  // }, []);

  const getFilters = async (e) => {
    if ( propertyList === "available") {
    await ApiGet(`property/getLocationFilter?isFresh=true`)
      .then((res) => {
        setAmenitiesFilterFilters(res?.data?.payload?.amenitiesFilter);
        setLocationFilter(res?.data?.payload?.locationFilter[0]);
        setSelectedPrice(
          res?.data?.payload?.locationFilter[0]?.maxPrice?.investmentRange
        );
        setSelectedSize(res?.data?.payload?.locationFilter[0]?.maxsqft?.sqft);
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      });
    } else {
      await ApiGet(`property/getLocationFilter?isSelling=true`)
      .then((res) => {
        setAmenitiesFilterFilters(res?.data?.payload?.amenitiesFilter);
        setLocationFilter(res?.data?.payload?.locationFilter[0]);
        setSelectedPrice(
          res?.data?.payload?.locationFilter[0]?.maxPrice?.investmentRange
        );
        setSelectedSize(res?.data?.payload?.locationFilter[0]?.maxsqft?.sqft);
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      });
    }
  };

  useEffect(
    () => {
      const timer = setTimeout(() => {
        getFilterData();
        getFilters();
      }, 500);
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedPrice,
      selectedSize,
      countryShow,
      stateShow,
      amenityShow,
      typeValue,
      cityShow,
      streetShow,
      dataLowOrHigh,
      limit,
      sortByProp,
      propertyList,
      search]
  );

  const getFilterData = async (e) => {
    setLoading(true);
    let Data = {
      isFilter: selectedPrice
        ? "true"
        : selectedSize
          ? "true"
          : sortByProp
            ? "true"
            : "false",
      price: selectedPrice,
      sqft: selectedSize,
      country: countryShow,
      state: stateShow,
      amenities: amenityShow,
      status: typeValue,
      city: cityShow,
      street: streetShow,
      sort: dataLowOrHigh,
      isSort: isSort,
      sortBy: sortByProp,
    };
    if (userDetails?.id) {
      if (!search) {
        if (propertyList === "available") {
          await ApiPost(`property/getPropertys?isFresh=true&uid=${userDetails.id}&limit=${limit}&isUser=true`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        } else {
          await ApiPost(`property/getPropertys?isSelling=true&uid=${userDetails.id}&limit=${limit}&isUser=true`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);

            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        }
      } else {
        if (propertyList === "available") {
          await ApiPost(`property/getPropertys?isFresh=true&uid=${userDetails.id}&limit=${limit}&isUser=true&search=${search}`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        } else {

          await ApiPost(`property/getPropertys?isSelling=true&uid=${userDetails.id}&limit=${limit}&isUser=true&search=${search}`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        }
      }
    } else {
      if (!search) {
        if (propertyList === "available") {
          await ApiPostNoAuth(`property/getPropertys?isFresh=true&limit=${limit}&isUser=true`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        } else {
          await ApiPostNoAuth(`property/getPropertys?isSelling=true&limit=${limit}&isUser=true`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              toast.error(err?.message);
              setSortBy(false);
              setLoading(false);
            });
        }
      } else {
        if (propertyList === "available") {
          await ApiPostNoAuth(`property/getPropertys?isFresh=true&limit=${limit}&isUser=true&search=${search}`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err?.message);
              setSortBy(false);
            });
        } else {
          await ApiPostNoAuth(`property/getPropertys?isSelling=true&limit=${limit}&isUser=true&search=${search}`, Data)
            .then((res) => {
              setLoading(false);
              setCount(res?.data?.payload?.dataCount);
              setSortBy(false);
              setProperties(res?.data?.payload?.data);
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err?.message);
              setSortBy(false);
            });
        }

      }
    };
  }


  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSortBy(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  //for search data

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCompareProperty = (e) => {
    const { value } = e.target;
    setIdForCompare(idForCompare?.concat(value));
    history.push({
      pathname: "/compareproperties",
      // state: { data: [value] },
    });
  };

  const debouncedSearchTerm = useDebounce(search, 500);

  // Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      getFilterData();
    } else {
      getFilterData();
    }
  }, [debouncedSearchTerm]);

  const handleSetPropertyData = (property) => {
    if (property?.orderStatus === "1") {
      history.push({
        pathname: `/viewproperties/${property?._id}`,
        state: property,
      });
    } else {
      history.push({
        pathname: `/propertiesdetails/${property?._id}`,
        state: property,
      });
    }
  };

  return (
    <div>
      <section className="properties-section-alignment">
        <div className="container">
          {/* <ToastContainer /> */}
          <div className="properties-grid">
            <div className="properties-grid-items">
              <>
                <FilterPanel
                  amenitiesFilterFilters={amenitiesFilterFilters}
                  locationFilter={locationFilter}
                  selectedSize={selectedSize}
                  selectedPrice={selectedPrice}
                  typeValue={typeValue}
                  stateShow={stateShow}
                  countryShow={countryShow}
                  amenityShow={amenityShow}
                  setAmenitiesFilterFilters={setAmenitiesFilterFilters}
                  setLocationFilter={setLocationFilter}
                  setSelectedSize={setSelectedSize}
                  setSelectedPrice={setSelectedPrice}
                  setTypeValue={setTypeValue}
                  setStateShow={setStateShow}
                  setCountryShow={setCountryShow}
                  setAmenityShow={setAmenityShow}
                  setCityShow={setCityShow}
                  cityShow={cityShow}
                  setStreetShow={setStreetShow}
                  streetShow={streetShow}
                />
              </>
            </div>
            <div className="properties-grid-items">
              <div className="sub-page-title">
                <h3>Properties List</h3>
              </div>

              <div className="propertiesList-tab-section">
                <div className={propertyList === "available" ? "tab-section active" : "tab-section"}>
                  <span onClick={() => setPropertyList("available")}>Available Properties</span>
                </div>
                <div className={propertyList === "reselling" ? "tab-section active" : "tab-section"}>
                  <span onClick={() => setPropertyList("reselling")}>Reselling Properties</span>
                </div>
              </div>

              <div className="sub-filter-long">
                <div>
                  <div className="search-relative">
                    <input
                      type="text"
                      placeholder="Search"
                      name="title"
                      onChange={(e) => handleSearch(e)}
                    />
                    <div className="search-in">
                      <img
                        style={{ width: "12px" }}
                        src={SearchIcon}
                        alt="SearchIcon"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sort-by-relative">
                    <div
                      className="sort-by-relative-right-alignment"
                      onClick={() => setSortBy(!sortBy)}
                    >
                      <p>Sort By</p>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                    <div
                      className={
                        sortBy
                          ? "sort-by-dropdown sort-show"
                          : "sort-by-dropdown sort-hidden"
                      }
                      ref={wrapperRef}
                    >
                      <div className="sort-design">
                        <ul>
                          <li
                            onClick={() => {
                              setSortByProp("wholeHomePrice");
                              setDataLowOrHigh("low");
                              setIsSort("true");
                            }}
                          >
                            Asset Value/Price (Lowest to Highest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("wholeHomePrice");
                              setDataLowOrHigh("high");
                              setIsSort("true");
                            }}
                          >
                            Asset Value/Price (Highest to Lowest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("rentalYield");
                              setDataLowOrHigh("low");
                              setIsSort("true");
                            }}
                          >
                            Rental Yield (Lowest to Highest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("rentalYield");
                              setDataLowOrHigh("high");
                              setIsSort("true");
                            }}
                          >
                            Rental Yield (Highest to Lowest)
                          </li>
                          {/* <li
                            onClick={() => {
                              setSortByProp("targetIRR");
                              setDataLowOrHigh("low");
                              setIsSort("true");
                            }}
                          >
                            Target IRR (Lowest to Highest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("targetIRR");
                              setDataLowOrHigh("high");
                              setIsSort("true");
                            }}
                          >
                            Target IRR (Highest to Lowest)
                          </li> */}
                          <li
                            onClick={() => {
                              setSortByProp("sqft");
                              setDataLowOrHigh("low");
                              setIsSort("true");
                            }}
                          >
                            Property Size (Lowest to Highest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("sqft");
                              setDataLowOrHigh("high");
                              setIsSort("true");
                            }}
                          >
                            Property Size (Highest to Lowest)
                          </li>
                          <li
                            onClick={() => {
                              setSortByProp("address.street");
                              setDataLowOrHigh("low");
                              setIsSort("true");
                            }}
                          >
                            Property Name (Alphabetical order)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <img
                    src={GridIcon}
                    alt="GridIcon"
                    onClick={() => {
                      setDisplayType("list");
                    }}
                  />
                  <img
                    src={MenuIcon}
                    alt="MenuIcon"
                    onClick={() => {
                      setDisplayType("grid");
                    }}
                  />
                </div>
              </div>
              {displayType === "grid" && (
                <div className="properties-main-card-details">
                  {loading ? (
                    <div className="loader-container-property-list">
                      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>) :
                    (<div className="card-grid">
                      {properties.length > 0
                        ? properties?.map((property) => {
                          if (property?.isDisplay) {
                            let propertyPrice = property?.wholeHomePrice / property?.ownership
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
                                >
                                  {property?.photos?.length > 0 &&
                                    property?.photos?.map((photo, i) => {
                                      return (
                                        <div className="card-images">
                                          <img
                                            src={
                                              photo?.imgPath
                                                ? photo?.imgPath
                                                : { CardImage }
                                            }
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
                                      <h5>{propertyPrice.toFixed(2)} Lakh</h5>
                                      <span>Minimum Investment </span>
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
                                {property?.orderStatus === "1" ? (
                                  <div>
                                    <div className="button-style">
                                      <button
                                        onClick={() =>
                                          handleSetPropertyData(property)
                                        }
                                      >
                                        My Property
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="button-style">
                                      <button
                                        onClick={() =>
                                          handleSetPropertyData(property)
                                        }
                                      >
                                        View Property
                                      </button>
                                      <button
                                        value={property?._id}
                                        onClick={handleCompareProperty}
                                        style={{
                                          marginBottom: "10px",
                                        }}
                                      >
                                        {idForCompare?.includes(property?._id)
                                          ? "Already Added"
                                          : "Compare Property"}
                                      </button>
                                    </div>
                                  </div>)
                                }
                              </div>
                            );
                          }
                        })
                        : "No results available"}
                    </div>)}
                  {limit >= count ? (
                    ""
                  ) : (!loading &&
                    <div className="load-more-button">
                      <button onClick={() => setLimit(limit + 3)}>
                        Load More Listings
                      </button>
                    </div>
                  )}
                </div>
              )}

              {displayType === "list" && (
                <div className="properties-main-card-details1">
                  <div className="card-grid">
                    {properties.length > 0
                      ? properties.map((property, index) => {
                        let propertyPrice = property?.wholeHomePrice / property?.ownership

                        if (property?.isDisplay) {
                          return (
                            <div className="card-grid-items">
                              <div className="card-images">
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
                                            src={
                                              photo?.imgPath
                                                ? photo?.imgPath
                                                : { CardImage }
                                            }
                                            alt="HeroBannerImage"
                                          />
                                        </div>
                                      );
                                    })}
                                </AwesomeSlider>
                              </div>
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
                                <div className="row-grid">
                                  <div>
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
                                  </div>
                                  <div>
                                    <div className="button-style" >
                                      <button
                                        style={{ marginBottom: "5px" }}
                                        onClick={() =>
                                          handleSetPropertyData(property)
                                        }
                                      >
                                        View Property
                                      </button>
                                      <button
                                        value={property?._id}
                                        onClick={handleCompareProperty}
                                        style={{
                                          marginBottom: "10px",
                                        }}
                                      >
                                        {idForCompare.includes(property?._id)
                                          ? "Already Added"
                                          : "Compare Property"}
                                      </button>
                                    </div>
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
                                    <h5>{propertyPrice.toFixed(2)} Lakh</h5>
                                    <span>Minimum Investment </span>
                                  </div>
                                  <div className="child-grid-items">
                                    <h5>{property?.ownership}</h5>
                                    <span>No. of Ownership</span>
                                  </div>
                                  <div className="child-grid-items">
                                    <h5>{property?.rentalYield}%</h5>
                                    <span>Rental Yield</span>
                                  </div>
                                  {/* <div className="child-grid-items">
                                    <h5>
                                      ₹ {property?.wholeHomePrice}{" "}
                                      {property?.priceType}
                                    </h5>
                                    <span>Asset Value</span>
                                  </div>
                                  <div className="child-grid-items">
                                    <h5>{property?.rentalYield}%</h5>
                                    <span>Rental Yield</span>
                                  </div>
                                  <div className="child-grid-items">
                                    <h5>{property?.targetIRR}%</h5>
                                    <span>Target IRR</span>
                                  </div>
                                  <div className="child-grid-items">
                                    <h5>{property?.ownership}</h5>
                                    <span>Ownership</span>
                                  </div> */}
                                </div>
                              </div>
                              <div></div>
                            </div>
                          );
                        }
                      })
                      : "No results available"}
                  </div>
                  {limit >= count ? (
                    ""
                  ) : (
                    <div className="load-more-button">
                      <button onClick={() => setLimit(limit + 4)}>
                        Load More Listings
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}
