import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

function TravellerForm(props) {
  const [traveller, setTraveller] = useState({
    tName: "",
    tBirthday: "",
    tAge: "",
    tMobile: "",
    tPassport: "",
    tIDNo: "",
  });

  return (
    <div>
      <Card>
        <Card.Body>
          <Form>
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
            <Form.Group id="DateOfBirth">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const currentDate = new Date();
                  if (selectedDate <= currentDate) {
                    setTraveller({ ...traveller, tBirthday: e.target.value });
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
                type="number"
                onChange={(e) =>
                  setTraveller({ ...traveller, tAge: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group id="Mobile">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setTraveller({ ...traveller, tMobile: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group id="Passport">
              <Form.Label>Passport No.</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setTraveller({ ...traveller, tPassport: e.target.value })
                }
                required
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
            <Button className="w-100 mt-5" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default TravellerForm;
