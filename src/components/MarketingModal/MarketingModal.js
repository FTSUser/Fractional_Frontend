import React, { useState, useEffect } from "react";
import "./MarketingModal.scss";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LogoImage from "../../Assets/Images/Logo111.png";

export default function MarketingModal() {
  const [modalOpen, setModalOpen] = useState(true);
  const [popup, setPopup] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getPopup();
  }, []);

  const getPopup = async (e) => {
    await ApiGet(`popup/getAllPopup`)
      .then((res) => {
        setPopup(res?.data?.payload?.popup);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      {
        modalOpen && (
          <div className="marketing-modal-design">
            <div className="marketing-modal">
              <div className="modal-header">
                <div>
                  <img src={LogoImage} alt="LogoImage"/>
                </div>
                <div onClick={() => setModalOpen(!modalOpen)}>
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon text-primary-light stroke-current w-1-1/2"
                  >
                    <path fill="none" d="M1 1l12 12M13 1L1 13"></path>
                  </svg>
                </div>
              </div>
              <div className="modal-body">
                <Carousel responsive={responsive}>
                  {popup?.length > 0 &&
                    popup.map((pop) => {
                      return (
                        <>
                          <div className="marketing-title">
                            <h2>{pop?.title}</h2>
                            <p dangerouslySetInnerHTML={{
                              __html: pop?.description,
                            }}
                              className="">
                            </p>
                          </div>
                          <div className="marketing-image-alignment">
                            <img src={pop?.photo != null ? pop?.photo : ""} alt="photo" />
                          </div>
                        </>
                      )
                    })}
                </Carousel>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}