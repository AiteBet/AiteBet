import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BetsContainer from "./Containers/BetsContainer";

const Home = () => {
  return (
    <div className="main">
      <Container>
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
