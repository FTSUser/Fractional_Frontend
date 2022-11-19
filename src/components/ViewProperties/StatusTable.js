import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { handleGetPropertyStatus } from '../../Helpers/CommonAPI/CommonAPI';
import { ApiGet } from '../../Helpers/Api/ApiData';

function StatusTable(props) {
    const { statusDetails } = props;
    const history = useHistory();
    const [filteredStatus, setFilteredStatus] = useState([]);
    const [oneProperties, setOneProperties] = useState([]);
    const [propertyId, setPropertyId] = useState("");
    // const [loading, setLoading] = useState(false);

    let location = typeof window !== "undefined" ? window.location.pathname : "";
    useEffect(() => {
        const pName = typeof window !== "undefined" ? location.split("/") : "";
        setPropertyId(pName[pName?.length - 1]);
        getOneProperty(pName[pName?.length - 1])
    }, [location]);

    const getOneProperty = async (id) => {
        await ApiGet("property/getOneProperty/" + id)
            .then((res) => {
                setOneProperties(res?.data?.payload?.Property);
            })
            .catch((err) => {
                toast.error(err?.message);
            });
    };

    const handleGetStatus = async () => {
        await handleGetPropertyStatus()
            .then(res => {
                setFilteredStatus(res.data.payload?.status);
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }

    const handleStatusProperty = (item, status) => {
        let data = {
            _id: item?.pid,
            statusOfProperty: status,
            userDeatils: item?.uid,
            oneProperties: oneProperties?.address
        }
        if (status === "Interest Received") {
            history.push({
                pathname: "/interestReceived",
                state: { item: data }
            });
        } else if (status === "Remaining Amount Received") {
            history.push({
                pathname: "/remainingAmount",
                state: { item: data }
            });
        } else if (status === "Exit Request Received") {
            history.push({
                pathname: "/exitrequest",
                state: { item: data }
            });
        } else if (status === "Exit Approved") {
            history.push({
                pathname: '/exitapproved',
                state: {
                    item: data
                }
            });
        } else if (status === "Refund Processed") {
            history.push({
                pathname: '/refundprocessed',
                state: {
                    item: data
                }
            });
        } else if (status === "Property Resold") {
            history.push({
                pathname: '/propertyresold',
                state: {
                    item: data
                }
            });
        }
    }

    useEffect(() => {
        handleGetStatus();
    }, []);

    return (
        <>
            <section className="status-table-section-alignment-page">
                <div className="container">
                    <div className="status-heading">
                        <h3>Status Table</h3>
                    </div>

                    <div className="status-details-table">
                        <div className="status-table">
                            <table>
                                <thead>
                                    <tr className="heading-design">
                                        <th>No.</th>
                                        <th>Status</th>
                                        <th>Last updated </th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statusDetails.map((item, index) => {
                                            let count = index + 1
                                            return (
                                                <tr className="Details-design">
                                                    <td><span className="number-style-alignment">{count}</span></td>
                                                    <td><span className={item?.statusName === "Interest Received" ? "status-label lightgreen-label" :
                                                        item?.statusName === "Remaining Amount Received" ? "status-label yellow-label" :
                                                            item?.statusName === "Refund Processed" ? "status-label orange-label" :
                                                                item?.statusName === "Exit Request Received" ? "status-label blue-label" :
                                                                    item?.statusName === "Exit Approved" ? "status-label red-label" :
                                                                        "status-label green-label"}>{item?.statusName === "Exit Request Received" ? "Exit Request Sent" : item?.statusName}</span></td>
                                                    <td><span className="last-update-days">{moment(item?.updatedAt).fromNow()}</span></td>
                                                    <td><span className="view-button" onClick={() => handleStatusProperty(item, item?.statusName)} >View</span></td>
                                                </tr>
                                            )
                                        }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StatusTable