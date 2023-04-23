import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
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
          <Form onSubmit={handleSubmit}>
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
