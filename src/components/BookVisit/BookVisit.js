import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import "./BookVisit.scss";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { ApiGet, ApiPost } from '../../Helpers/Api/ApiData';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment'
import subDays from "date-fns/subDays";
import { BookingCancelModal } from './BookingCancelModal';

export default function BookVisit() {

    const now = useRef(new Date());
    let userDetails = JSON.parse(localStorage.getItem("userinfo"));
    const location = useLocation();
    const propertyDetails = location.state.item;
    const [bookStartDay, setBookStartDay] = useState();
    const [remainingDays, setRemainingDays] = useState(0);
    const [upcomingBooking, setUpcomingBooking] = useState([]);
    const [disabledDays, setDisabledDays] = useState([]);
    const [startDate, setStartDate] = useState(now?.current);
    const [endDate, setEndDate] = useState(subDays(now?.current, 0))
    const [bookingDateAvailable, setBookingDateAvailable] = useState(false);
    const [untilDate, setUntilDate] = useState();
    const [bookingModal, setBookingModal] = useState(false);
    const [bookingId, setBookingId] = useState("");
    const history = useHistory()
    const [loading, setLoading] = useState(false);

    const ranges = useMemo(() => {
        return [
            {
                startDate: startDate,
                endDate: endDate,
                key: "selection"
            }
        ];
    }, [startDate, endDate]);

    const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {

        setStartDate(startDate);
        setEndDate(endDate);

        const startDates = moment(startDate);
        const endDates = moment(endDate);
        const duration = moment.duration(endDates.diff(startDates));
        const days = duration.asDays();
        setBookStartDay(days + 1);

        var daysOfYear = [];
        for (var d = new Date(startDates); d <= endDates; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }

        let dateConvert = [];
        daysOfYear.map((item) => {
            dateConvert.push(moment(item).format("YYYY-MM-DD"));
        });

        let disabledDaysConvert = [];
        disabledDays.map((item) => {
            disabledDaysConvert.push(moment(item).format("YYYY-MM-DD"));
        });

        let getData = dateConvert?.filter((rec1) => disabledDaysConvert?.some((rec2) => rec1 === rec2));
        setBookingDateAvailable(getData?.length > 0 ? true : false);

    });

    useEffect(() => {
        var daysOfYear = [];
        setDisabledDays(daysOfYear);
        for (let i = 0; i < upcomingBooking?.length; i++) {
            var startDate = moment(upcomingBooking[i].sdate).add(-1, 'days')
            var endDate = moment(upcomingBooking[i].edate).add(-1, 'days')
            for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                daysOfYear.push(new Date(d));
            }
        }
    }, [upcomingBooking])

    useEffect(() => {
        handleGetBookingRemaniningDays()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleGetBookingRemaniningDays();
        }, 4000);
        return () => clearTimeout(timer);
    }, [])

    const handleGetBookingRemaniningDays = () => {
        ApiGet(`book/getAllBook?uid=${userDetails.id}&pid=${propertyDetails._id}`)
            .then((res) => {
                let totalDays = res?.data?.message === "No data found" ? res?.data?.payload?.totalDays : (res?.data?.payload?.TotalDays - res?.data?.payload?.days[0]?.total) ? (res?.data?.payload?.TotalDays - res?.data?.payload?.days[0]?.total) : res?.data?.payload?.TotalDays;
                setUntilDate(res?.data?.payload?.untilDate);
                setRemainingDays(totalDays);
                setUpcomingBooking(res?.data?.payload?.nearestBook);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
            });
    }

    const handleBookVisitValidate = () => {
        if (bookStartDay === undefined) {
            toast.error("Please select start date");
            return false;
        }
        if (bookStartDay > remainingDays) {
            toast.error("You can book only " + remainingDays + " days");
            return false;
        }
        if (bookStartDay < 1) {
            toast.error("Please select start date");
            return false;
        }
        if (endDate === null) {
            toast.error("Please select end date");
            return false;
        }
        if (endDate < startDate) {
            toast.error("End date should be greater than start date");
            return false;
        }
        if (bookingDateAvailable === true) {
            toast.error("You can not book on this date");
            return false;
        }
        if (moment(startDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD")) {
            toast.error("You can not book on past date");
            return false;
        }
        if (moment(startDate).format("YYYY-MM-DD") > moment(untilDate).format("YYYY-MM-DD")) {
            toast.error(`You can not book after ${moment(untilDate).format("DD MMM YYYY")}`);
            return false;
        }
        return true;
    }

    const handleBookProperty = () => {
        let sDate = moment(startDate).add(1, 'days')
        let eDate = moment(endDate).add(1, 'days')
        if (handleBookVisitValidate()) {
            setLoading(true);

            let data = {
                uid: userDetails.id,
                pid: propertyDetails._id,
                sdate: sDate,
                edate: eDate,
                daysNumber: bookStartDay,
            }
            ApiPost('book/addBook', data)
                .then((res) => {
                    setLoading(false);
                    if (res.data.result === 0) {
                        toast.success(res.data.message);
                        handleGetBookingRemaniningDays()
                        setBookingDateAvailable(false);
                        history.push("/myaccount")
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    toast.error(err.response.data.message);
                });
        }
    }

    const handleBookingCancleModalOpen = (id) => {
        setBookingModal(true);
        setBookingId(id);
    }

    const handleBookingCancleMOdalClose = () => {
        setBookingModal(false);
        setBookingId("")
    }

    return (
        <>
            <div className="BookVisit-section-alignment">
                <div className="container">
                    <div className="bookvisit-alignment">
                        <div className="bookvisit-heading">
                            <span>Book A Visit</span>
                        </div>
                        <div className="bookvisit-grid">
                            <div className="bookvisit-calendar">
                                <div className="bookvisit-calendar-alignment">
                                    <h2>Calender</h2>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={handleSelect}
                                        moveRangeOnFirstSelection={false}
                                        ranges={ranges}
                                        disabledDates={disabledDays}
                                        rangeColors={['#E83B3B', '#E83B3B', '#E83B3B']}
                                    />
                                </div>
                                {!loading && <div className="bookvisit-button-alignment">
                                    <button onClick={() => handleBookProperty()}>Book Now</button>
                                </div>}
                                {loading && (
                                    <div className="bookvisit-button-alignment">
                                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    </div>
                                )}
                            </div>
                            <div className="bookvisit-upcoming">
                                <div className="days-left-box">
                                    <span className="redtext">{remainingDays?.toFixed()}</span>
                                    <span>Days Left</span>
                                    <p className='until-date'>Until Date : {moment(untilDate).format('DD MMM YYYY')}</p>
                                </div>
                                <div className="bookvisit-upcoming-heading">
                                    <span>Upcoming</span>
                                </div>
                                {upcomingBooking && upcomingBooking?.map((item, index) => {
                                    let startDateToEndDate = moment(item?.sdate).add('days', -1).format("DD MMM YYYY") + " - " + moment(item?.edate).add('days', -1).format("DD MMM YYYY");
                                    let startDateToTodayCount = moment(item?.sdate).diff(moment(), 'days');
                                    return (<div className="bookvisit-upcoming-details">
                                        <div className="bookvisit-upcoming-details-grid">
                                            <div className="bookvisit-upcoming-details-alignment">
                                                <span>{item?.uid?.fullName}</span>
                                                <p>Booking Date: <span>{startDateToEndDate}</span></p>
                                                {item?.uid?._id === userDetails.id && (
                                                    <div className='booking-calcel-btn' >
                                                        <button onClick={() => handleBookingCancleModalOpen(item?._id)} >Cancel Booking</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="bookvisit-days-left-box">
                                                <span>{startDateToTodayCount}
                                                    <p>Days Left</p></span>
                                            </div>
                                        </div>
                                    </div>)
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <BookingCancelModal
                    bookingModal={bookingModal}
                    bookingId={bookingId}
                    handleBookingCancleMOdalClose={handleBookingCancleMOdalClose}
                    handleGetBookingRemaniningDays={handleGetBookingRemaniningDays}
                />
            </div>
        </>
    )
}
