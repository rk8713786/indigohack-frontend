import React, { useState } from "react";
import { useFlight } from "../Contexts/Flights";
import { Button, Card, Modal, Breadcrumb, Table, Form } from "react-bootstrap";
import SelectedCard from "../components/SelectedCard";
import "./css/FlightList.css";
import PayByRazorPay from "../components/Payment";
import CalculateAge from "../components/CalculateAge";

function FlightCheckin(props) {
  const {
    avlbls,
    info,
    index,
    airline,
    passengers,
    setPassengers,
    paymentDone,
  } = useFlight();
  const [traveller, setTraveller] = useState({
    tName: "",
    tBirthday: "",
    tAge: "",
    tGender: "",
    tMobile: "",
    tPassport: "",
    tIDNo: "",
  });

  console.log(avlbls[index].travelerPricings);
  const [showForm, setShowForm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  function submitHandler() {
    setPassengers(passengers.concat(traveller));
    setShowForm(false);

    console.log(passengers);
  }
  console.log(avlbls);
  console.log(paymentDone);
  if (paymentDone) {
  }

  function getStops(a) {
    if (a > 1) {
      return a;
    } else {
      return "Nonstop";
    }
  }

  return (
    <div className="component-filght-list">
      <div className="main-slist mt-5">
        <div className="flight-list-header rounded ">
        
          <SelectedCard
            depart={info.Origin}
            via={avlbls[index].itineraries[0].segments[0].arrival.iataCode}
            arrive={info.Destination}
            length={avlbls[index].itineraries[0].duration.substring(2, 8)}
            stops={getStops(avlbls[index].itineraries[0].segments.length)}
            company={airline}
            price={avlbls[index].price.base}
            dTime={avlbls[
              index
            ].itineraries[0].segments[0].departure.at.substring(11, 16)}
            aTime={avlbls[index].itineraries[0].segments[
              avlbls[index].itineraries[0].segments.length - 1
            ].arrival.at.substring(11, 16)}
            dDate={avlbls[
              index
            ].itineraries[0].segments[0].departure.at.substring(0, 10)}
            aDate={avlbls[index].itineraries[0].segments[
              avlbls[index].itineraries[0].segments.length - 1
            ].arrival.at.substring(0, 10)}
          />
          <h5>BOOK FLIGHT FOR</h5>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {passengers
                ? passengers.map((passenger, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{passenger.tName}</td>
                      <td>{passenger.tGender}</td>
                      <td>{passenger.tAge}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
          <Button
            className="w-100 mt-5"
            type="submit"
            onClick={() => setShowForm(true)}
          >
            Add Travellers
          </Button>
          {showForm ? (
            <>
              <Card>
                <Card.Body>
                  <Form onSubmit={submitHandler}>
                    <Form.Group id="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setTraveller({ ...traveller, tName: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Label>Gender</Form.Label>

                    <Form.Select
                      value={traveller.tGender}
                      aria-label="Default select example"
                      onChange={(e) =>
                        setTraveller({
                          ...traveller,
                          tGender: e.target.value,
                        })
                      }
                    >
                      <option disabled value="">
                        Select Gender
                      </option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </Form.Select>
                    <Form.Group id="DateOfBirth">
                      <Form.Label>Date Of Birth</Form.Label>
                     <Form.Control
  type="date"
  onChange={(e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      setTraveller({ ...traveller, tBirthday: e.target.value,
        tAge: CalculateAge(e.target.value), });
    } else {
      alert("Date of Birth cannot be in the future");
    }
  }}
  required
/>
                    </Form.Group>
                    <Form.Group id="Age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        value={traveller.tAge}
                        readOnly={true}
                      />
                    </Form.Group>
                    <Form.Group id="Mobile">
                      <Form.Label>Mobile No.</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setTraveller({
                            ...traveller,
                            tMobile: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group id="Passport">
                      <Form.Label>Passport No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Not Necessary For Domestic Flights"
                        onChange={(e) =>
                          setTraveller({
                            ...traveller,
                            tPassport: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group id="IDNo">
                      <Form.Label>ID No.</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setTraveller({ ...traveller, tIDNo: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                    <Button className="w-50 mt-5" type="submit">
                      Submit
                    </Button>
                    <Button className="w-50 mt-5" variant="secondary" type="submit" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </>
          ) : null}

          <Button
            className="w-100 mt-5"
            type="submit"
            onClick={() => (passengers.length!==0)?setConfirm(true):
              alert("Add Travellers First")}
          >
            Book Flight
          </Button>

          
          {confirm ? (
            <>
              <Modal
                show={confirm}
                onHide={confirm}
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
                    depart={info.Origin}
                    via={
                      avlbls[index].itineraries[0].segments[0].arrival.iataCode
                    }
                    arrive={info.Destination}
                    length={avlbls[index].itineraries[0].duration.substring(
                      2,
                      8
                    )}
                    stops={getStops(
                      avlbls[index].itineraries[0].segments.length
                    )}
                    price={avlbls[index].price.base}
                    dTime={avlbls[
                      index
                    ].itineraries[0].segments[0].departure.at.substring(11, 16)}
                    aTime={avlbls[index].itineraries[0].segments[
                      avlbls[index].itineraries[0].segments.length - 1
                    ].arrival.at.substring(11, 16)}
                    company={airline}
                    dDate={avlbls[
                      index
                    ].itineraries[0].segments[0].departure.at.substring(0, 10)}
                    aDate={avlbls[index].itineraries[0].segments[
                      avlbls[index].itineraries[0].segments.length - 1
                    ].arrival.at.substring(0, 10)}
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
                      {passengers
                        ? passengers.map((passenger, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{passenger.tName}</td>
                              <td>{passenger.tGender}</td>
                              <td>{passenger.tAge}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button  variant="secondary" onClick={() => setConfirm(false)}>
                    Cancel
                  </Button>

                  <PayByRazorPay />
                </Modal.Footer>
              </Modal>
            </>
          ) : null}

          {/* <div >
      {avlbls[index].travelerPricings.map((travelerPricing,key)=> (
        <div className="mt-5">
          <h4>For Traveller {key+1}</h4>
          <TravellerForm />
        </div>

      ))}
    </div> */}
        </div>
      </div>
    </div>
  );
}
export default FlightCheckin;
