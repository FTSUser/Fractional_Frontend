import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import LogoImage from "../../../Assets/Images/Logo111.png";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import "./Footer.scss";
import { toast } from "react-toastify";
export default function Footer() {
  const [knowMoreData, setKnowMoreData] = useState({});
  const [menu, setMenu] = useState([]);
  const [companyDetail, setCompanyDetail] = useState({});
  const [socialMedia, setSocialMedia] = useState({});
  const [content, setContent] = useState(false);
  const [footerDescription , setFooterDescription] = useState('');
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    getMenu();
    getKnowMore();
    getCompanyDetail();
    getSocialMedia();
    handleGetDescription();
  }, []);

  const getSocialMedia = async (e) => {
    await ApiGet(`social/getAllSocial`)
      .then((res) => {
        setSocialMedia(res?.data?.payload?.social);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getKnowMore = async () => {
    await ApiGet(`know/getKnow`)
      .then((res) => {
        setKnowMoreData(res?.data?.payload?.know);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  

  const handleGetDescription = () => {
    ApiGet('description/getDescription')
      .then((res) => {
        setFooterDescription(res?.data?.payload?.token[0]?.description);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getMenu = async (e) => {
    await ApiGet(`menu/getMenus`)
      .then((res) => {
        setMenu(res?.data?.payload?.menu);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getCompanyDetail = async (e) => {
    await ApiGet(`companyDetails/getCompanyDetails`)
      .then((res) => {
        setCompanyDetail(res?.data?.payload?.companyDetails);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-main-grid">
            <div className="footer-main-grid-items">
              <div className="footer-logo">
                <img src={LogoImage} alt="LogoImage" />
                <p className={""} >
                  {footerDescription}
                  {/* With decades of experience, we are an established
                  enterprise in the realty and urban infrastructure sector.
                  On this foundation, we are now set to create new milestones
                  in an industry that impacts the lives of millions.  When you do
                  business with us, you have only to gain and nothing to lose! */}
                </p>
              </div>
            </div>
            <div className="footer-main-grid-items">
              <div className="footer-grid">
                <div className="footer-grid-items">
                  <h2>Quick links</h2>
                  {menu?.length > 0 &&
                    menu?.map((men) => {
                      if (men?.isActive) {
                        return (
                          <ul>
                            <NavLink
                              to={`/${men?.name === "home" ? "" : men?.name}`}
                            >
                              <li>
                                {men?.name === "learnpage"
                                  ? "Learn"
                                  : men?.name === "home"
                                    ? "Home"
                                    : men?.name === "about"
                                      ? "About"
                                      : men?.name === "properties"
                                        ? "Properties"
                                        : men?.name === "faq"
                                          ? "FAQs"
                                          : men?.name === "contact-us"
                                            ? "Contact Us"
                                            : men?.name}
                              </li>
                            </NavLink>
                          </ul>
                        );
                      }
                    })}
                  <ul>
                    <li>
                      <NavLink to="/disclaimer">
                        <a>Disclaimer</a>
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="footer-grid-items">
                  <h2>Know More</h2>
                  <ul>
                    {knowMoreData?.length > 0 &&
                      knowMoreData?.map((men, key) => {
                        if (men?.isActive) {
                          return (
                            <ul>
                              <NavLink
                                target={men?.name === "Sitemap" ? "_blank" : ""}
                                to={{
                                  pathname:
                                    men?.name === "Sitemap"
                                      ? "/sitemap"
                                      : `/${men?.name === "Privacy Policy"
                                        ? "privacypolicy"
                                        : men?.name === "Terms of Service"
                                          ? "termsofservice"
                                          : men?.name === "Company News"
                                            ? "companynews"
                                            : men?.name
                                      }`,
                                }}
                              >
                                <li>{men?.name}</li>
                              </NavLink>
                            </ul>
                          );
                        }
                      })}

                  </ul>
                </div>
                <div className="footer-grid-items">
                  <h2>Contact Us</h2>

                  <span>{companyDetail?.address}</span>
                  <div className="footer-text-grid">
                    <div className="footer-text-grid-items">
                      <p>
                        <b>Phone:</b>
                      </p>
                    </div>
                    <div className="footer-text-grid-items">
                      <p>{companyDetail?.phone}</p>
                    </div>
                  </div>
                  <div className="footer-text-grid">
                    <div className="footer-text-grid-items">
                      <p>
                        <b>Email:</b>
                      </p>
                    </div>
                    <div className="footer-text-grid-items">
                      <p> {companyDetail?.email}</p>
                    </div>
                  </div>
                  <div className="footer-text-grid">
                    <div className="footer-text-grid-items">
                      <p>
                        <b>Hours:</b>
                      </p>
                    </div>
                    <div className="footer-text-grid-items">
                      <p>{companyDetail?.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-child">
        <div className="container">
          <div className="footer-child-alignment">
            <p>(C) 2022, OUR LEISURE HOME All Rights Reserved.</p>

            <div className="social-icon-alignment">
              {socialMedia?.length > 0 &&
                socialMedia.map((social, index) => {
                  if (social?.isActive) {
                    return (
                      <div className="bg-footer">
                        {social?.title === "Facebook" ? (
                          <a
                            className="footer-icon fab fa-facebook-f"
                            href={social?.link}
                            target="_blank"
                          ></a>
                        ) : social?.title === "Google" ? (
                          <a
                            className="footer-icon fab fa-google"
                            href={social?.link}
                            target="_blank"
                          ></a>
                        ) : social?.title === "Globe Europe" ? (
                          <a
                            className="footer-icon fas fa-globe-europe"
                            href={social?.link}
                            target="_blank"
                          ></a>
                        ) : social?.title === "Instagram" ? (
                          <a
                            className="footer-icon fab fa-instagram"
                            href={social?.link}
                            target="_blank"
                          ></a>
                        ) : social?.title === "Twitter" ? (
                          <a
                            className="footer-icon fab fa-twitter"
                            href={social?.link}
                            target="_blank"
                          ></a>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
