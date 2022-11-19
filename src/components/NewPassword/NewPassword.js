import React, { useState, useEffect } from "react";
import './NewPassword.scss';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ApiPost } from '../../Helpers/Api/ApiData'

export default function NewPassword(props) {
    const history = useHistory();
    const [loginData, setLoginData] = useState({});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState(false)

    const onhandleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            if (value === loginData.password) {
                setLoginData({ ...loginData, [name]: value })
                setErrors({ ...errors, [name]: "" })
            } else {
                setLoginData({ ...loginData, [name]: value })
                setErrors({ ...errors, [name]: "password not match" })
            }
        } else {
            setLoginData({ ...loginData, [name]: value })
            setErrors({ ...errors, [name]: "" })
        }
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        // if (!loginData.email) {
        //     formIsValid = false;
        //     errors["email"] = "*Please enter your email.";
        // }
        if (!loginData.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        if (!loginData.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "*Please enter your confirm password.";
        }
        if (loginData.confirmPassword !== loginData.password) {
            formIsValid = false;
            errors["confirmPassword"] = "*password not match.";
        }
        setErrors(errors)
        return formIsValid;
    }

    const handleNewPassword = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let data = {
                email: localStorage.getItem('email'),
                password: loginData.password,
                token: localStorage.getItem("tokenforverify")
            }
            await ApiPost('admin/forgot', data)
                .then((res) => {
                    toast.success("set password successfully")
                    localStorage.removeItem("tokenforverify")
                    localStorage.removeItem("email")
                    setShowPassword(!showPassword)
                    history.push("/login")
                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })
        }
    }
    const showHidePassword = () => {
        setShowPassword(!showPassword)
    }
    const confirmPasswordShow = () =>{
        setConfirmPassword(!confirmPassword)

    }

    return (
        <div>
            <div className='new-login-banner'>
                <div className='container'>
                    <div className='login-box-center'>
                        <div className='loin-box'>
                            <h1>New Password</h1>
                            <p>Welcome To <span>Our Leisure Home</span></p>
                            {/* <div className='cus-input'>
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
                            </div> */}
                            <div className='cus-input'>
                                <label>Password</label>
                                <div className="icon">
                                    <input type={showPassword ? "text" : "password"} placeholder="Enter new password" name="password" value={loginData.password} onChange={(e) => onhandleChange(e)} />
                                    {showPassword ? <i class="fa-solid fa-eye" onClick={showHidePassword}></i> : <i class="fa-solid fa-eye-slash" onClick={() => showHidePassword(showPassword)}></i>}
                                    <span
                                        style={{
                                            color: "red",
                                            top: "5px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors["password"]}
                                    </span>
                                </div>

                            </div>
                            <div className='cus-input'>
                                <label>Confirm Password</label>
                                <div className="icon">
                                    <input type={confirmPassword ? "text" : "password"} placeholder="Enter Confirm password" name="confirmPassword" value={loginData.confirmPassword} onChange={(e) => onhandleChange(e)} />
                                    {confirmPassword ? <i class="fa-solid fa-eye" onClick={confirmPasswordShow}></i> : <i class="fa-solid fa-eye-slash" onClick={() => confirmPasswordShow(confirmPassword)}></i>}
                                    <span
                                        style={{
                                            color: "red",
                                            top: "5px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors["confirmPassword"]}
                                    </span>
                                </div>

                            </div>
                            <div className='all-ready-account'>
                                <span>Don't have an account ? <a onClick={() => history.push("/SignUp")} >Sign Up</a></span>
                            </div>
                            <div className='login-button'>
                                <button onClick={(e) => handleNewPassword(e)}>Set New Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
