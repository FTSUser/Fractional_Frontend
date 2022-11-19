import React, { useEffect, useState } from "react";
import "../home/home.scss";
import AboutUsSection from "./AboutUsSection/AboutUsSection";
import AvailableProperties from "./AvailableProperties/AvailableProperties";
import ContactSection from "./ContactSection/ContactSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurPartners from "./OurPartners/OurPartners";
import { NavLink } from "react-router-dom";
import { FinalCookie } from "./FinalCookie";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";


export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    getAllBannerImage();
  }, []);

  const getAllBannerImage = async () => {
    await ApiGet(`banner/getBanner`)
      .then((res) => {
        if (res?.status === 200) {
          setBannerImage(res?.data?.payload?.banner);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
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
        {bannerImage?.length > 0 &&
          bannerImage?.map((image, i) => {
            return (
              <div className="image-slide-align">
                <img src={image?.photo} alt="HeroBannerImage" />
                <div className="image-blur"></div>
                <div className="container">
                  <div className="button-center-align-home">
                    <NavLink to="/properties">
                      <button>VIEW PROPERTIES</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
      </AwesomeSlider>
      <>
        <AboutUsSection />
      </>
      <>
        <HowItWorks />
      </>
      <>
        <AvailableProperties />
      </>

      <>
        <OurPartners />
      </>
      <>
        <ContactSection />
      </>
      <>
        <div>
          <FinalCookie />
        </div>
      </>
      {modalOpen && (
        <div className="subscribe-banner-blur">
          <div className="subscribe-modal">
            <div
              className="modal-close-icon"
              onClick={() => setModalOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                  fill="#191C1F"
                ></path>
              </svg>
            </div>
            <div className="modal-body">
              <h1>Subscribe to our newsletter</h1>
              <p>
                is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
              </p>
              <div className="form-control">
                <label>Email ID</label>
                <input type="email" placeholder="Enter Email Id" />
              </div>
              <div className="button-center-align">
                <button>SIGNUP FOR NEWSLETTER NOW</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
