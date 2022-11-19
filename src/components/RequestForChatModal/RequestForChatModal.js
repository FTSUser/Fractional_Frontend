import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import "./RequestForChatModal.scss";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { countryCodes } from "../../../src/Helpers/utils/countryCode";

const RequestForChatModal = (props) => {
  const userDetails = JSON.parse(localStorage.getItem("userinfo"));
  const { oneProperties, handleClose, requestForChatModal } = props;
  const [type, setType] = useState("");
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const [inputValueForAdd, setInputValueForAdd] = useState({
    countryCode: "+91",
  })
  const [errosForAdd, setErrosForAdd] = useState({})



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let val = value.replace(/[^0-9]/g, "");
      setInputValueForAdd({ ...inputValueForAdd, [name]: val });
    } else {
      setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    }
    setErrosForAdd({ ...errosForAdd, [name]: "" });
  }


  const handleValidateForm = () => {
    let formIsValid = true;
    const errors = {};
    if (!inputValueForAdd.name) {
      formIsValid = false;
      errors["name"] = "Name is required.";
    }
    if (!inputValueForAdd.email || !inputValueForAdd.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      formIsValid = false;
      errors["email"] = "Email is required.";
    }
    if (!inputValueForAdd.phone) {
      formIsValid = false;
      errors["phone"] = "Mobile number is required.";
    }
    if (!inputValueForAdd.call) {
      formIsValid = false;
      errors["call"] = "Call is required.";
    }
    if (!inputValueForAdd.countryCode) {
      formIsValid = false;
      errors["countryCode"] = "Country Code is required.";
    }
    setErrosForAdd(errors);
    return formIsValid;
  }

  const handleSubmit = () => {
    if (handleValidateForm()) {
      setIsLoading(true)
      const data = {
        name: inputValueForAdd.name,
        email: inputValueForAdd.email,
        phone: inputValueForAdd.phone,
        requestType: inputValueForAdd.call,
        pid: oneProperties._id,
        aid: oneProperties.adminid,
        countryCode: inputValueForAdd.countryCode,
      }
      ApiPost("callRequest/addCallRequest", data)
        .then((res) => {
          setIsLoading(false)
          toast.success(res.data.message);
          handleClose();
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error(err.response.data.message);
        })
    }
  }

  const handleClick = (e) => {
    const { value } = e.target;
    setType(value);
  };

  useEffect(() => {
    getUserData()
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    await ApiGet(`admin/get-admin/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.payload?.admin[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleRequestChat = async () => {
    if (!type) return toast.error("Please Select one of the type");
    let data = {
      uid: userDetails?.id,
      pid: oneProperties?._id,
      aid: oneProperties?.adminid,
      phone: userDetails?.phone,
      countryCode: userDetails?.countryCode,
      email: userDetails?.email,
      name: userDetails?.fullName,
      requestType: type,

    };
    await ApiPost("callRequest/addCallRequest", data)
      .then((res) => {
        if (res?.data?.result === 0) {
          toast.success("Request sent successfully");
          handleClose();
        } else {
          toast.error(res?.data?.message);
          handleClose();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        handleClose();
      });
  };

  return (
    <>
      {userDetails && (
        <Modal
          show={true}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              {userData
                ? "Please select one of the option"
                : "Please Complete KYC"}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (<>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>) : (
              <>

                {userData && (
                  <div>
                    <Button
                      style={{ "margin-right": "10px" }}
                      value="Audio"
                      onClick={handleClick}
                      selected={type === "Audio"}
                      variant={type === "Audio" ? "danger" : "outline-danger"}
                    >
                      Audio
                    </Button>
                    <Button
                      style={{ "margin-right": "10px" }}
                      value="Video"
                      onClick={handleClick}
                      selected={type === "Video"}
                      variant={type === "Video" ? "danger" : "outline-danger"}
                    >
                      Video
                    </Button>
                    <Button
                      style={{ "margin-right": "10px" }}
                      value="Chat"
                      onClick={handleClick}
                      selected={type === "Chat"}
                      variant={type === "Chat" ? "danger" : "outline-danger"}
                    >
                      Chat
                    </Button>
                  </div>
                )}
                {/* {!userData.isActive && (
                  <>
                    Please complete KYC. &nbsp;
                    <Link to="/profilepage" style={{ color: "red" }}>
                      Click here to complete KYC
                    </Link>
                  </>
                )} */}
              </>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {userData && (
              <Button variant="danger" onClick={handleRequestChat}>
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}

      {!userDetails && requestForChatModal && (
        <div className="request-modal-chat-blur">
          <div className="request-modal-chat">
            <div className="request-modal-header">
              <p>Request chat</p>
              <i class="fa-solid fa-xmark" onClick={() => handleClose()}></i>
            </div>
            <div className="request-modal-body">
              <div className="request-input">
                <label>Full Name</label>
                <input value={inputValueForAdd?.name} type="text" placeholder="Enter Full Name" name="name" onChange={(e) => handleOnChange(e)} />
                <span className="errors">{errosForAdd["name"]}</span>
              </div>
              <div className="request-input">
                <label>Email Id</label>
                <input type="text" name="email" value={inputValueForAdd?.email} placeholder="Enter Email Id" onChange={(e) => handleOnChange(e)} />
                <span className="errors">{errosForAdd["email"]}</span>
              </div>
              <div className="MainGridOne">
                <div className="SubGridOne" >
                  <div className="request-input">
                    <label>Country code</label>
                    <div className="cus-input">
                      <PhoneInput
                        onChange={(e) => setInputValueForAdd({ ...inputValueForAdd, countryCode: "+" + e })}
                        value={inputValueForAdd.countryCode}
                        inputProps={{
                          name: 'countryCode',
                          required: false,
                          autoFocus: false,
                          disabled: true,

                        }}
                        enableSearch={true}
                        disableSearchIcon={true}
                      />
                    </div>
                    {/* <select name="countryCode" value={inputValueForAdd?.countryCode} onChange={(e) => handleOnChange(e)}>
                      <option value="">Select</option>
                      {countryCodes.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.code}
                        </option>
                      ))}
                    </select> */}
                    <span className="errors">{errosForAdd["countryCode"]}</span>
                  </div>
                </div>
                <div className="SubGridOne">
                  <div className="request-input ">
                    <label>Mobile Number</label>
                    <input type="text" maxLength={15} placeholder="Enter Mobile Number" name="phone" value={inputValueForAdd?.phone} onChange={(e) => handleOnChange(e)} />
                    <span className="errors">{errosForAdd["phone"]}</span>
                  </div>
                </div>
              </div>
              <div className="request-input">
                <label>Call</label>
                <select name="call" value={inputValueForAdd?.cell} onChange={(e) => handleOnChange(e)}>
                  <option value="">Select</option>
                  <option value="Audio">Audio</option>
                  <option value="Video">Video</option>
                  <option value="Chat">Chat</option>
                </select>
                <span className="errors">{errosForAdd["call"]}</span>
              </div>

              <div className="send-button">
                <button onClick={() => handleSubmit()}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestForChatModal;
