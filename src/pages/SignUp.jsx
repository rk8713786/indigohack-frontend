import React, { useState } from "react";
import {useHistory, Link } from "react-router-dom";
import { Alert, Card, Form, Button, Container } from "react-bootstrap";
import { useFlight } from "../Contexts/Flights";
import "./css/Login.css";

function SignUp() {
  const { signUp } = useFlight();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone,setPhone]=useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="Container">
        <Container className="d-flex justify-content-center align-items-center ">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="Logo">
              <Link to="/">
                <img src="./images/Folleague-logo.svg" alt="follegue"></img>
              </Link>
            </div>
            <Card className="mt-5">
              <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (password !== confPassword) {
                      return setError("Password Do not Match");
                    }
                    setError("");

                    signUp(email, password, birthday, name,phone,gender)
                      .then((response) => history.push("/Profile"))
                      .catch((error) => {
                        setError(error.message);

                        
                      });
                     
                  }
                     }
                >
                  <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Label>Gender</Form.Label>

                    <Form.Select
                      value={gender}
                      aria-label="Default select example"
                      onChange={(e) =>
                        setGender(e.target.value)
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
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="confPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setConfPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button className="w-100 mt-4" type="submit" disabled={loading}>
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div
              className="w-100 text-center mt-2 text-white"
              variant="primary"
            >
              Already Have an acoount ?{" "}
              <Link className="text-primary text-md" to="/Login">
                Login
              </Link>
            </div>

            <button></button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
