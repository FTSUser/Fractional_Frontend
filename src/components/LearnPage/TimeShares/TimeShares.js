import React, { useState, useEffect } from "react";
import "./TimeShares.scss";
import { toast } from "react-toastify";
import { ApiGet } from "../../../Helpers/Api/ApiData";

export default function TimeShares() {
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    getLearn();
  }, []);

  const getLearn = async (e) => {
    await ApiGet(`aboutus/getAllAboutus?page=1&limit=10&type=returns`)
      .then((res) => {
        setAboutus(res?.data?.payload?.aboutus);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <section className="time-shares-section-alginment">
        <div className="container">
          <div className="time-grid">
            <div className="time-grid-items">
              <div className="table-header-grid">
                <div className="table-header-grid-items"></div>
                <div className="table-header-grid-items">
                 <div>HOME</div>
                </div>
                <div className="table-header-grid-items">
                  <div>RESORT TIMESHARE</div>
                </div>
              </div>
              <div className="table-body-border">
                <div className="table-body">
                  <div className="table-body-items">
                    <span>PROPERTY TYPE </span>
                  </div>
                  <div className="table-body-items">
                    <span>Single-family residence </span>
                  </div>
                  <div className="table-body-items">
                    <span>Hotel/Condo</span>
                  </div>
                </div>
                <div className="table-body">
                  <div className="table-body-items">
                    <span>TRUE OWNERSHIP</span>
                  </div>
                  <div className="table-body-items">
                    <span>Yes, real property</span>
                  </div>
                  <div className="table-body-items">
                    <span>No, right-to-use time</span>
                  </div>
                </div>
                <div className="table-body">
                  <div className="table-body-items">
                    <span>USAGE </span>
                  </div>
                  <div className="table-body-items">
                    <span>Ongoing access</span>
                  </div>
                  <div className="table-body-items">
                    <span>Fixed week(s)</span>
                  </div>
                </div>
                <div className="table-body">
                  <div className="table-body-items">
                    <span>RESALE APPROACH</span>
                  </div>
                  <div className="table-body-items">
                    <span>Market pricing; sell on your terms</span>
                  </div>
                  <div className="table-body-items">
                    <span>Set pricing; sell with resort</span>
                  </div>
                </div>
              </div>
            </div>
            {aboutus?.length > 0 &&
              aboutus?.slice(0, 1).map((photo) => {
                return (
                  <div className="time-grid-items">
                    <h1>{photo?.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: photo?.description,
                      }}
                      className=""
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
