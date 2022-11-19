import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./BuyersSection.scss";
import { ApiGet } from "../../../Helpers/Api/ApiData";
export default function BuyersSection() {

  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    getLearn();
  }, []);

  const getLearn = async (e) => {
    await ApiGet(`aboutus/getAllAboutus?page=1&limit=10&type=populardestination`)
      .then((res) => {
        setAboutus(res?.data?.payload?.aboutus);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <div className="buyers-section-alignment">
        <div className="container">
          {aboutus?.length > 0 &&
            aboutus?.slice(0, 1).map((photo) => {
              return (
                <div className="buyers-grid">
                  <div className="buyers-grid-items">
                    <img src={photo?.photo} alt="BuyersImage" />
                  </div>
                  <div className="buyers-grid-items">
                    <h2>{photo?.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: photo?.description,
                      }}
                      className=""
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <section>
        <div className="light-banner">
          <div className="container">
            {aboutus?.length > 0 &&
              aboutus?.slice(1, 2).map((photo) => {
                return (
                  <div className="buyers-grid">
                    <div className="buyers-grid-items">
                      <h2>{photo?.title}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: photo?.description,
                        }}
                        className=""
                      />
                    </div>
                    <div className="buyers-grid-items">
                      <img src={photo?.photo} alt="BuyersSecImage" />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
