// import "./App.css";
import Home from "./components/home/Home";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./styles/mixins/global.scss";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqPage from "./components/FaqPage/FaqPage";
import PropertiesPage from "./components/PropertiesPage/PropertiesPage";
import About from "./components/About/About";
import PropertiesDetails from "./components/PropertiesDetails/PropertiesDetails";
import KnowMore from "./components/PrivacyPolicy/PrivacyPolicy";
import LearnPage from "./components/LearnPage/LearnPage";
import MarketingModal from "./components/MarketingModal/MarketingModal";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Sitemap from "./components/Sitemap/Sitemap";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/SignUp";
import ForgetPassword from "./components/fortgetPassword/forgetPassword";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";
import NewPassword from "./components/NewPassword/NewPassword";
import Auth from "./Helpers/auth";
import CompareProperties from "./components/CompareProperties/CompareProperties";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import VerifyOtpForLogin from "./components/VerifyOtpForLogin/VerifyOtpForLogin";
import ProductDisclaimer from "./components/BuyProperty/ProductDisclaimer";
import { ToastContainer } from "react-toastify";
import InterestReceived from "./components/InterestReceived/InterestReceived";
import RemainingAmount from "./components/RemainingAmount/RemainingAmount";
import RefundProcessed from "./components/RefundProcessed/RefundProcessed";
import ExitRequest from "./components/ExitRequest/ExitRequest";
import ExitApproved from "./components/ExitApproved/ExitApproved";
import PropertyResold from "./components/PropertyResold/PropertyResold";
import NotificationsDetails from "./components/NotificationsDetails/NotificationsDetails";
import MyAccount from "./components/MyAccount/MyAccount";
import ViewProperties from "./components/ViewProperties/ViewProperties";
import SellNow from "./components/SellNow/SellNow";
import BookVisit from "./components/BookVisit/BookVisit";

// import 'react-toastify/dist/ReactToastify.min.css' s
function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      {/* <MarketingModal /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/faq" component={FaqPage} />
      <Route exact path="/properties" component={PropertiesPage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/sitemap" component={Sitemap} />
      <Route exact path="/interestreceived" component={InterestReceived} />
      <Route exact path="/refundprocessed" component={RefundProcessed} />
      <Route exact path="/remainingamount" component={RemainingAmount} />
      <Route exact path="/exitrequest" component={ExitRequest} />
      <Route exact path="/exitapproved" component={ExitApproved} />
      
      <Route exact path="/propertyresold" component={PropertyResold} />
      <Route exact path="/notification" component={NotificationsDetails} />
      <Route exact path="/myaccount" component={MyAccount} />
      <Route exact path="/viewproperties/:id" component={ViewProperties} />
      
      <Route exact path="/sellnow" component={SellNow} />
      <Route exact path="/bookvisit" component={BookVisit} />
      <Route
        exact
        path="/propertiesdetails/:id"
        component={PropertiesDetails}
      />
      {/* <Route exact path="/knowmore/:id" component={KnowMore} /> */}
      <Route exact path="/privacypolicy" component={KnowMore} />
      <Route exact path="/termsofservice" component={KnowMore} />
      <Route exact path="/companynews" component={KnowMore} />
      <Route exact path="/Press" component={KnowMore} />
      <Route exact path="/Careers" component={KnowMore} />
      <Route exact path="/learnpage" component={LearnPage} />
      <Route exact path="/disclaimer" component={Disclaimer} />

      {/* -----------------------Auth----------------------- */}
      <RouteWrapperAuth exact path="/profilepage" component={ProfilePage} />
      <RouteWrapperAuth
        exact
        path="/productdisclaimer"
        component={ProductDisclaimer}
      />
      <RouteWrapperAuth
        exact
        path="/compareproperties"
        component={CompareProperties}
      />

      {/* --------------------------- sign up / log in -------------------------- */}
      <RouteWrapper exact path="/login" component={Login} />
      <RouteWrapper exact path="/forgetpassword" component={ForgetPassword} />
      <RouteWrapper exact path="/verifyotp" component={VerifyOtp} />
      <RouteWrapper
        exact
        path="/verifyotpforlogin"
        component={VerifyOtpForLogin}
      />
      <RouteWrapper exact path="/newpassword" component={NewPassword} />
      <RouteWrapper exact path="/signup" component={SignUp} />
      <Footer />
    </Router>
  );
}

function RouteWrapper({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isUserAuthenticated() === false ? (
          // <Layout {...props}>
          <Component {...props} />
        ) : (
          // </Layout>
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function RouteWrapperAuth({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isUserAuthenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;
