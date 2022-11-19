import React, { useState } from 'react'
import { useLocation , useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiPost } from '../../Helpers/Api/ApiData';

import "./SellNow.scss";

export default function SellNow() {
    let userDetails = JSON.parse(localStorage.getItem("userinfo"));
    const location = useLocation();
    const propertyDetails = location.state.item;
    const propertyId = location?.state?.item?._id;
    const [onChangeAdd, setOnChangeAdd] = useState({});
    const [error, setError] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            let price = value.replace(/[^0-9]/g, "");
            setOnChangeAdd({ ...onChangeAdd, [name]: price });
        } else {
            setOnChangeAdd({ ...onChangeAdd, [name]: value });
        }
        setError({ ...error, [name]: "" });
    }

    const handleFormValidation = () => {
        let error = {};
        let isValid = true;
        if (!onChangeAdd.price) {
            error["price"] = "Price is required";
            isValid = false;
        }
        if (!onChangeAdd.description) {
            error["description"] = "Description is required";
            isValid = false;
        }
        setError(error);
        return isValid;
    }

    const handleSellProperty = () => {
        if (handleFormValidation()) {
            let data = {
                uid: userDetails.id,
                pid: propertyId,
                price: onChangeAdd.price,
                description: onChangeAdd.description,
            }
            ApiPost("sell/createSell", data)
                .then((res) => {
                    if (res.data.result === 0) {
                        toast.success(res.data.message);
                        history.push("/myaccount")
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
        }
    }

    return (
        <div className="sellnow-section-alignment">
            <div className="container">
                <div className="sellnow-alignment">
                    <div className="sellnow-heading-alignment">
                        <span>Sell Now</span>
                    </div>
                    <div className="sellnow-price-alignment">
                        <div className="price-label">
                            <label>Price</label>
                        </div>
                        <div className="sellnow-price-input-alignmnet">
                            <div className="small-input-alignment">
                                <input type="text" placeholder="₹" />
                            </div>
                            <div className="price-input-alignment">
                                <input type="text" placeholder="Price" name="price" value={onChangeAdd?.price} onChange={(e) => handleChange(e)} />
                                <span className="error">{error['price']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="sellnow-reason-alignment">
                        <div className="label-alignment">
                            <label>Reason for Sell </label>
                        </div>
                        <div className="sellnow-reason-details-alignment">
                            <textarea rows={6} placeholder="Type here" name="description" value={onChangeAdd?.description} onChange={(e) => handleChange(e)}></textarea>
                            <span className="error">{error['description']}</span>
                        </div>
                    </div>
                    <div className="sellnow-button-alignment">
                        <button onClick={() => handleSellProperty()}>Sell</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
