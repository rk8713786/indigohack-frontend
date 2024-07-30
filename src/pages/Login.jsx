import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useFlight } from "../Contexts/Flights";
import "./css/Login.css";
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signIn } = useFlight();
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="Container">
        <Container className=" d-flex justify-content-center align-items-center ">
          <div className="Contain w-100" style={{ maxWidth: "400px" }}>
            <div className="Logo">
              <Link to="/">
                <img src="./images/Folleague-logo.svg" alt="follegue"></img>
              </Link>
            </div>
            <Card className="mt-5">
              <Card.Body>
                <h2 className="text-center mb-4">Sign in</h2>

                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    signIn(email, password)
                      .then((response) => {
                        console.log(response);
                        history.push("/Profile");
                      })
                      .catch((error) => {
                        console.log(error.message);
                      });
                  }}
                >
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

                  <Button
                    className="w-100 mt-4"
                    type="submit"
                    disabled={loading}
                  >
                    Sign in
                  </Button>

                  <GoogleButton
                    className="w-100 mt-3 btn-md"
                    style={{ borderRadius: "4px", height: "5vh" }}
                    onClick={() =>
                      signInWithGoogle().then((response) => {
                        history.goBack();
                      })
                    }
                    disabled={loading}
                  />
                </Form>
              </Card.Body>
            </Card>
            <div
              className="w-100 text-center mt-2 text-white"
              variant="primary"
            >
              Want to create an account?
              <Link className="text-primary text-md" to="/Signup">
                Sign Up
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
