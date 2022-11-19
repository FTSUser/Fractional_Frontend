import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import "./Header.scss";
import LogoImage from "../../../Assets/Images/Logo111.png";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import LoginPage from "./LoginPage";
import Auth from "../../../Helpers/auth";
import SignUp from "./SignUp";
import { loginFlagAtom, profileMenuAtom } from "../../../atom/loginFlagAtom";

import NotificationIcon from "../../../Assets/Images/notification.svg"

export default function Header() {
  const answerMenuRef = useRef();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [sidebrOpen, setSidebrOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [menu, setMenu] = useState([]);
  const [prizeMenu, setPrizeMenu] = useState(false);
  const [userData, setUserData] = useState({});
  const [loginFlag, setLoginFlag] = useAtom(loginFlagAtom);
  const [profileMenu, setProfileMenu] = useState(false)
  const [activeTab, setActiveTab] = useAtom(profileMenuAtom);
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const finalMenu = menu.filter((obj) => {
    return obj.name !== 'faq';
  });

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getUserData();
  }, [loginFlag]);

  const Logout = async () => {
    await Auth.deauthenticateUser();
    history.push("/");
    setActiveTab(1)
    toast.success("Logout Successful");
  };

  const getMenu = async (e) => {
    await ApiGet(`menu/getMenus`)
      .then((res) => {
        setMenu(res?.data?.payload?.menu);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getUserData = async () => {
    await ApiGet(`admin/get-admin/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.payload?.admin[0]);
        setLoginFlag(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const showKYCheader =
    userDetails &&
    (!userData?.isBankVerified ||
      !userData?.isPassportVerified ||
      !userData?.personalInfo) &&
    !userData.locked;

  //outside popup close
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (prizeMenu) {
        if (
          prizeMenu &&
          answerMenuRef.current &&
          !answerMenuRef.current.contains(e.target)
        ) {
          setPrizeMenu(false);
          setProfileMenu(false);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [prizeMenu]);

  return (
    <>
      {showKYCheader ? (
        <div className="kyc">
          <marquee>
            Welcome, First you have to complete the KYC Process.
          </marquee>
        </div>
      ) : (
        ""
      )}
      <div className="header-sticky">
        <header >
          <div className="container">
            <div className="header-alignment">
              <div className="logo">
                <NavLink to="/">
                  <img src={LogoImage} alt="LogoImage" />
                </NavLink>
              </div>
              <div className="menu">
                <nav>
                  <ul>
                    {finalMenu?.length > 0 &&
                      finalMenu?.map((men) => {
                        if (men?.isActive) {
                          return (
                            <>
                              <NavLink
                                to={`/${men?.name === "home" ? "" : men?.name}`}
                                onClick={() => setProfileMenu(false)}
                              >
                                <li
                                  className={
                                    men?.name === "home" &&
                                      location.pathname === "/"
                                      ? "login"
                                      : men?.name === "about" &&
                                        location.pathname === "/about"
                                        ? "login"
                                        : men?.name === "learnpage" &&
                                          location.pathname === "/learnpage"
                                          ? "login"
                                          : men?.name === "properties" &&
                                            location.pathname === "/properties"
                                            ? "login"
                                            : men?.name === "contact-us" &&
                                              location.pathname === "/contact-us"
                                              ? "login"
                                              : ""
                                  }
                                >
                                  {men?.name === "home"
                                    ? "Home"
                                    : men?.name === "about"
                                      ? "About"
                                      : men?.name === "learnpage"
                                        ? "Learn"
                                        : men?.name === "properties"
                                          ? "Properties"
                                          // : men?.name === "faq"
                                          //   ? "FAQ"
                                          : men?.name === "contact-us"
                                            ? "Contact Us"
                                            : ""}
                                </li>
                              </NavLink>
                            </>
                          );
                        }
                      })}
                    {userDetails?.id ?
                      (
                        <div className="price-select-dropdown">
                          <div
                            className={location?.pathname === "/profilepage" ? "Select-text-alignment-profile" : "Select-text-alignment"}
                            onClick={() => setProfileMenu(!profileMenu)}
                          >
                            <span> My Account </span>
                            <i className="fas fa-chevron-down"></i>
                          </div>
                          <div
                            className={
                              profileMenu
                                ? "price-menu-show price-select-menu"
                                : "price-menu-hidden price-select-menu"
                            }
                            ref={answerMenuRef}
                          >
                            <div className="select-amount-design">
                              <span onClick={() => { history.push("/profilepage"); setProfileMenu(false); setActiveTab(1) }}>Profile Details</span>
                              <span onClick={() => { history.push("/profilepage"); setProfileMenu(false); setActiveTab(2) }}> KYC Information</span>
                              <span onClick={() => { history.push("/myaccount"); setProfileMenu(false) }}> My Properties</span>
                              {/* <span > Reports</span> */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <NavLink to="/login">
                          <li
                            className={
                              location?.pathname === "/login" ? "login" : ""
                            }
                          >
                            Log In
                          </li>
                        </NavLink>
                      )}
                    {userDetails?.id ? (
                      <>
                        <div >
                          <img onClick={() => history.push("/notification")} src={NotificationIcon} alt="NotificationIcon" />
                        </div>
                        <div className="btn-logout">
                          <li onClick={Logout}>Logout</li>
                        </div>
                      </>
                      // ) : (
                      //   <NavLink to="/SignUp">
                      //     <li
                      //       className={
                      //         location?.pathname === "/SignUp" ? "login" : ""
                      //       }
                      //     >
                      //       Sign Up
                      //     </li>
                      //   </NavLink>
                    ) : ""}
                  </ul>
                  <div className="price-select-dropdown">
                    <div
                      className="Select-text-alignment"
                      onClick={() => setPrizeMenu(!prizeMenu)}
                    >
                      <span>INR </span>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                    <div
                      className={
                        prizeMenu
                          ? "price-menu-show price-select-menu"
                          : "price-menu-hidden price-select-menu"
                      }
                      ref={answerMenuRef}
                    >
                      <div className="select-amount-design">
                        <span>Pound</span>
                        <span>USD</span>
                        <span>EURO</span>
                      </div>
                    </div>
                  </div>
                  <ul></ul>
                </nav>
              </div>
              <div
                className="mobile-menu"
                onClick={() => setSidebrOpen(!sidebrOpen)}
              >
                <i class="fas fa-bars"></i>
              </div>
            </div>
          </div>
        </header>
      </div>
      {loginModalOpen && (
        <LoginPage
          getStatus={(data) => {
            setLoginModalOpen(data);
          }}
          getStatusForSignUp={(data) => setSignupModalOpen(data)}
        />
      )}
      {signupModalOpen && (
        <SignUp
          getStatusData={(data) => {
            setSignupModalOpen(data);
          }}
          getStatusDataForLogin={(data) => setLoginModalOpen(data)}
        />
      )}
      <div
        className={
          sidebrOpen
            ? "mobile-sidebar sidebar-open"
            : "mobile-sidebar sidebar-close"
        }
      >
        <div className="sidebar-all-content-alignment">
          <div className="sidebar-header">
            <div>
              <img src={LogoImage} alt="LogoImage" />
            </div>
            <div onClick={() => setSidebrOpen(false)}>
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul>
              <NavLink to="/" onClick={() => setSidebrOpen(false)}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/learnpage" onClick={() => setSidebrOpen(false)}>
                <li>Learn</li>
              </NavLink>
              <NavLink to="/about" onClick={() => setSidebrOpen(false)}>
                <li>About Us</li>
              </NavLink>
              <NavLink to="/properties" onClick={() => setSidebrOpen(false)}>
                <li>Properties</li>
              </NavLink>
              <NavLink to="/contact-us" onClick={() => setSidebrOpen(false)}>
                <li>Contact</li>
              </NavLink>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
