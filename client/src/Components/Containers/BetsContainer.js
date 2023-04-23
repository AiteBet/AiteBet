import React, { useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { Container, Row, Col } from "react-bootstrap";
import BetItem from "../BetItem";

const BetsContainer = () => {
  const {usersBets} = useContext(StateContext) 
  return (
    <Container fluid>
      <Row>
        <Col className="col-2">
          <strong>Oppoonent</strong>
        </Col>
        <Col className="col-2">
          <strong>Category</strong>
        </Col>
        <Col className="col-2">
          <strong>Amount</strong>
        </Col>
        <Col className="col-5">
          <strong>Status</strong>
        </Col>
        <Col className="col-1">
          <strong>Odds</strong>
        </Col>
      </Row>

      {usersBets.map((bet, index) => {
        return (
          <Row key={index} className="justify-content-center">
            <BetItem
              opponent={bet.opponent}
              category={bet.category}
              amount={bet.amount}
              status={bet.status}
            />
          </Row>
        );
      })}
    </Container>
  );
};

export default BetsContainer;
