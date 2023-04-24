import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../context/StateContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import BetsContainer from "./Containers/BetsContainer";

const Home = () => {
  const { user, setUsersBets } = useContext(StateContext);
  const navigate = useNavigate();
  console.log("user from state", user);

  useEffect(() => {
    axios.get("http://localhost:8080/bets" + user.id).then((result) => {
      setUsersBets(result);
    });
  }, []);

  return (
    <div className="main">
      <Container>
        <Row>
          <h4>
            Welcome: <strong>{user.username}</strong>
          </h4>
        </Row>
        <Row>
          <Col className="col-2">
            <Button variant="primary" onClick={() => navigate("/bets/create")}>
              Create New Bet
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <BetsContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
