import React from 'react'
import { Modal, Button, Spinner } from "react-bootstrap";
import { toast } from 'react-toastify';
import { ApiPut } from '../../Helpers/Api/ApiData';


export const BookingCancelModal = ({
    handleBookingCancleMOdalClose,
    bookingModal,
    bookingId,
    handleGetBookingRemaniningDays
}) => {

    const handleCancelBooking = (id) => {
        ApiPut(`book/updateBook/${bookingId}`, {
            "isCanceled": true
        })
            .then(res => {
                handleBookingCancleMOdalClose();
                handleGetBookingRemaniningDays();
                toast.success("Booking canceled successfully");
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <Modal
                show={bookingModal}
                onHide={() => { }}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Booking Cancelled
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <h5> Are you sure you want to cancel this booking?</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleCancelBooking() }}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={() => { handleBookingCancleMOdalClose() }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
