import React, { useState } from "react";
import './forgetPassword.scss';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ApiPostNoAuth } from '../../Helpers/Api/ApiData'

export default function ForgetPassword() {
    const history = useHistory();
    const [loginData, setLoginData] = useState({});
    const [errors, setErrors] = useState({});

    const onhandleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
        setErrors({ ...errors, [name]: "" })
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (!loginData.email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }
        setErrors(errors)
        return formIsValid;
    }

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let data = {
                email: loginData.email
            }
            await ApiPostNoAuth('admin/verify-email', data)
                .then((res) => {
                    toast.success("OTP send successfully")
                    localStorage.setItem('email', res?.data?.payload?.email)
                    history.push("/verifyotp")
                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })
        }
    }
    return (
        <div>
            <div className='new-login-banner'>
                <div className='container'>
                    <div className='login-box-center'>
                        <div className='loin-box'>
                            <h1>Forgot Password</h1>
                            <p>Welcome to <span>Our Leisure Home</span></p>
                            <div className='cus-input'>
                                <label>Email</label>
                                <input type="text" placeholder="Enter Email" name="email" value={loginData.email} onChange={(e) => onhandleChange(e)} />
                                <span
                                    style={{
                                        color: "red",
                                        top: "5px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {errors["email"]}
                                </span>
                            </div>
                            <div className='all-ready-account'>
                                <span>Don't have an account ? <a onClick={() => history.push("/login")} >Log In</a></span>
                            </div>
                            <div className='login-button'>
                                <button onClick={(e) => handleForgetPassword(e)}>Verify Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
