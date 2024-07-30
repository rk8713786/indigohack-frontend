import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useFlight } from "../Contexts/Flights";
import { useHistory } from "react-router-dom";
import SelectedCard from "./SelectedCard";

function BookingCard(props) {
  console.log(props.stops);
  const { currentUser, handleClick, getCancelled } = useFlight();
  const [cancel, setCancel] = useState(false);
  const history = useHistory();
  var array = currentUser.MyBookings[props.nData];

  return (
    <div>
      <div className="component-flight-card mb-3 w-100 shadow rounded">
        <div className="row m-0 w-100">
          <div className="col">
            <p className="flight-card-company">
              <h5>{props.name}</h5>
            </p>
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.origin}</h6>
          </div>
          <div className="col">
            <h6 className="flight-card-slength mb-1">
              - {props.stops > 0 ? props.via : null} -
            </h6>
          </div>
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.destination}</h6>
          </div>
        </div>
        <div className="row  mb-3 mt-3">
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.time}</h6>
          </div>
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.length}</h6>
          </div>
          <div className="col ">
            <h6 className="flight-card-slength mb-1">{props.aTime}</h6>
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.date}</h6>
          </div>
          <div className="col "></div>
          <div className="col">
            <h6 className="flight-card-slength mb-1">{props.aDate}</h6>
          </div>
        </div>

        <div className="row "></div>
        <h5 className="flight-card-price">&#8377; {props.price}</h5>
        <Button
          variant="secondary"
          onClick={() => {
            setCancel(true);
          }}
          className="m-3"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClick(props.nData);
            history.push("/Checkin");
          }}
        >
          Check In
        </Button>
      </div>
      {cancel ? (
        <>
          <Modal
            show={cancel}
            onHide={cancel}
            backdrop="static"
            keyboard={false}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-90w"
          >
            <Modal.Header closeButton>
              <Modal.Title>Review Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SelectedCard
                depart={props.origin}
                arrive={props.destination}
                length={props.length}
                price={props.price}
                dTime={props.time}
                aTime={props.aTime}
                dDate={props.date}
                aDate={props.aDate}
              />

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {array[1].passengerDetails.map((passenger, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{passenger.tName}</td>
                      <td>{passenger.tGender}</td>
                      <td>{passenger.tAge}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setCancel(false)}>
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  getCancelled(props.nData);

                  history.push("/Cancelled");
                }}
              >
                Confirm Cancellation
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </div>
  );
}

export default BookingCard;
