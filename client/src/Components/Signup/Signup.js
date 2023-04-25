import React, { useState, useContext} from "react";
import { StateContext } from "../../context/StateContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const {user,setUser} = useContext(StateContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
     const dataObj = {
      username,
      password
     };
     console.log(dataObj);
     axios.post('http://localhost:8080/user/signup', dataObj)
       .then(response => {
        console.log(response)
        setUser(response.data);
        navigate('/home')
       })
       .catch((err) => console.log(err))
   
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
          <h1 className="text-center">Signup</h1>
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

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
