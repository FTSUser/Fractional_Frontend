import React, { useEffect, useState } from 'react'
import "./NotificationsDetails.scss";
import { toast } from 'react-toastify';
import NotificationIcon from "../../Assets/Images/notificarionRed.svg";
import { ApiGet } from '../../Helpers/Api/ApiData';
import moment from 'moment';

export default function NotificationsDetails() {
    const userDetails = JSON.parse(localStorage.getItem('userinfo'));
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = () => {
        setLoading(true)
        ApiGet(`notification/getNotification/${userDetails.id}`)
            .then(res => {
                setNotifications(res.data.payload.notification);
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.response.data.message);
                setLoading(false)
            })
    }
    return (
        <div className="notification-section-alignment">
            <div className="container">
                <div className="notification-alignment">
                    <div className="notification-heading">
                        Notifications
                    </div>

                    <div className="notification-details-box-border">
                        <div className="notification-box-padding">
                            {loading && (
                                <div className="loader-container">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>
                            )}
                            {notifications && notifications.map((notification, index) => {
                                return (
                                    <div className="notification-flex">
                                        <div>
                                            <img src={NotificationIcon} alt="NotificationIcon" />
                                        </div>
                                        <div className="notification-width">
                                            <span>{notification?.description}</span>
                                            <div>
                                                <span className="hours-design">{moment(notification?.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
