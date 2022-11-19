import React from 'react'
import "./RefundProcessed.scss";

export default function RefundProcessed(props) {
    return (
        <div className="refundProcessed-section-alignment">
            <div className="container">
                <div className="refundProcessed-alignment">
                    <div className="refundProcessed-Heading">
                        <h1>Refund Processed</h1>
                    </div>

                    <div className="refundProcessed-Details-alignment">
                        <div className="refundProcessed-Details-box-border">
                            <div className="refundProcessed-Display-flex">
                                <div className="refundProcessed-Details-Id">
                                    <span>Your Refund ID is :</span>
                                </div>
                                <div className="refundProcessed-refund-number">
                                    <span>xxx xxxx xxx98</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
