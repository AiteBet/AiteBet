import React, { useEffect, useContext } from "react";
import axios from "axios";
import { StateContext } from "../context/StateContext";
import { Container, Row, Col } from "react-bootstrap";
import BetsContainer from "./Containers/BetsContainer";

const Home = () => {
  const { user, setUsersBets } = useContext(StateContext);
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
          <Col md={10}>
            <BetsContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
