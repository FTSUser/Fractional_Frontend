import React, { useState, useEffect } from "react";
import './VerifyOtp.scss';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as userUtil from '../../Helpers/utils/user.util'
import * as authUtil from '../../Helpers/utils/auth.util'
import { ApiPostNoAuth } from '../../Helpers/Api/ApiData'

export default function VerifyOtp(props) {

    const dataSubmit = props?.location?.state?.data
    const history = useHistory();
    const [loginData, setLoginData] = useState({});
    const [errors, setErrors] = useState({});
    const [loginOtp, setLoginOtp] = useState("");

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (!loginOtp) {
            formIsValid = false;
            errors["code"] = "*Please enter your OTP";
        }
        setErrors(errors)
        return formIsValid;
    }

    const handleNewPassword = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userDetails = JSON.parse(localStorage.getItem("uName"))

            if (userDetails?.email) {
                let data = {
                    email: userDetails.email,
                    nationality: userDetails?.nationality,
                    code: loginOtp
                }
                await ApiPostNoAuth('admin/login', data)
                    .then((res) => {
                        toast.success("login successfull")
                        history.push("/profilepage")
                        userUtil.setUserInfo(res.data.payload.admin)
                        authUtil.setToken(res.data.payload.token)
                        // window.location.reload();
                        localStorage.removeItem("uName")
                    })
                    .catch((err) => {
                        toast.error("OTP verification failed")
                    })
            } else {
                let data = {
                    phone: userDetails.phone,
                    nationality: userDetails?.nationality,
                    code: loginOtp
                }
                await ApiPostNoAuth('admin/login', data)
                    .then((res) => {
                        toast.success("login successfull")
                        history.push("/profilepage")
                        userUtil.setUserInfo(res.data.payload.admin)
                        authUtil.setToken(res.data.payload.token)
                        localStorage.removeItem("uName")
                        // window.location.reload();

                    })
                    .catch((err) => {
                        toast.error("OTP verification failed")
                    })
            }
        }
    }

    const handleSignUp = async () => {
        const data = new FormData();
        data.append('fullName', dataSubmit.fullName);
        data.append('nationality', dataSubmit?.residenceData);
        data.append('email', dataSubmit.email);
        data.append('phone', dataSubmit.phone);
        data.append('code', loginOtp)
        data.append('role', "61aa0389803e260c3821ad14",);
        await ApiPostNoAuth('admin/signup', data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("signup successfully")
                    userUtil.setUserInfo(res.data.payload.admin)
                    authUtil.setToken(res.data.payload.token)
                    history.push("/")
                }
            })
            .catch((err) => {
                toast.error(err.respoance.data.message)
            })
    }
    return (
        <div>
            <div className='new-login-banner'>
                <div className='container'>
                    <div className='login-box-center'>
                        <div className='loin-box'>
                            <h1>Verify OTP</h1>
                            <p>Welcome to <span>Our Leisure Home</span></p>
                            <div className='cus-input'>
                                <label>OTP<span>*</span></label>
                                <input type="text" placeholder="Enter OTP" name="code" maxLength={6} value={loginOtp} onChange={(e) => setLoginOtp(e.target.value)} />

                                <span
                                    style={{
                                        color: "red",
                                        top: "5px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {errors["code"]}
                                </span>
                            </div>
                            <div className='all-ready-account'>
                                <span>Don't have an account ? <a onClick={() => history.push("/SignUp")} >Sign Up</a></span>
                            </div>
                            <div className='login-button'>
                                <button onClick={(e) => handleSignUp(e)}>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
