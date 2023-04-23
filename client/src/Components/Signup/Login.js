import React, { useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../../context/StateContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });
      if (result) {
        setUser(result.data);
        navigate("/home");
      }
    } catch (err) {
      if (err) setIncorrectCredentials(true);
      setTimeout(() => {
        setIncorrectCredentials(false);
      }, 3000);
    }

    // submit a get request to data base looking for
    // use navigate to navigate to the bet stats page
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="my-5">
            <h1 className="text-center">Login</h1>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={onChangeUsername}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mr-2">
              Login
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Sign up
            </Button>
            {incorrectCredentials && <div>Incorrect credentials</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
