import React, { useState, useEffect } from "react";
import { ApiGet } from "../../Helpers/Api/ApiData";
import {  toast } from "react-toastify";
import "./About.scss";
import useSWR from "swr";

import ProfileImage from "../../Assets/Images/linkdin-profile.jfif";
import ArunGupta from "../../Assets/Images/ArunGupta.jfif";
import AnujSuri from "../../Assets/Images/AnujSuri.jfif";
import DEEPAKYADAV from "../../Assets/Images/DEEPAKYADAV.jfif";
import RajeshImage from "../../Assets/Images/rajesh.jpg";

export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const { data, error } = useSWR("aboutus/getAllAboutus", ApiGet);
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    setAboutus(data?.data?.payload?.aboutus);
    if (error) {
      toast.error(error);
    }
  }, [data]);


  return (
    <div>
      <div className="about-page-alignment">
        <div className="about-banner">
          <div className="container">
            <h1>Indulge in a better lifestyle</h1>
          </div>
        </div>
      </div>
      <section className="about-grid-alignment">
        <div className="container">
          {aboutus?.length > 0 &&
            aboutus.map((about, index) => {
              return index % 2 === 0 ? (
                <div className="about-grid" key={index}>
                  <div className="about-grid-items">
                    <img src={about?.photo} alt="img" />
                  </div>
                  <div className="about-grid-items">
                    <h2>{about?.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: about?.description,
                      }}
                      className=""
                    />
                  </div>
                </div>
              ) : (
                <div className="about-grid" key={index}>
                  <div className="about-grid-items">
                    <h2>{about?.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: about?.description,
                      }}
                      className=""
                    />
                  </div>
                  <div className="about-grid-items">
                    <img
                      src={about?.photo != null ? about?.photo : ""}
                      alt="img"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <section className="people-behind-section">
        <div className="container">
          <div className="title">
            <h1>People Behind OLH</h1>
          </div>
          <div className="grid">
            <div className="grid-items">
              <a
                href="https://www.linkedin.com/in/a-david-rebello-14a6b210a"
                target="_blank"
              >
                <div className="card-design">
                  <img src={ProfileImage} alt="ProfileImage" />
                </div>
                <p>A David Rebello</p>
              </a>
            </div>
            <div className="grid-items">
              <a
                href="https://www.linkedin.com/in/arun-gupta-9b3295112/"
                target="_blank"
              >
                <div className="card-design">
                  <img src={ArunGupta} alt="ArunGupta" />
                </div>
                <p>Arun Gupta</p>
              </a>
            </div>{" "}
            <div className="grid-items">
              <a href="https://www.linkedin.com/in/surianuj/" target="_blank">
                <div className="card-design">
                  <img src={AnujSuri} alt="AnujSuri" />
                </div>
                <p>Anuj Suri</p>
              </a>
            </div>{" "}
            <div className="grid-items">
              <a href="https://www.linkedin.com/in/rajeshtebak/" target="_blank">
                <div className="card-design">
                  <img src={RajeshImage} alt="RajeshImage" />
                </div>
                <p> Rajesh Kumar</p>
              </a>
            </div>
            <div className="grid-items">
              <a
                href="https://www.linkedin.com/in/deepak-yadav-913a14104/"
                target="_blank"
              >
                <div className="card-design">
                  <img src={DEEPAKYADAV} alt="DEEPAKYADAV" />
                </div>
                <p>Deepak Yadav</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
