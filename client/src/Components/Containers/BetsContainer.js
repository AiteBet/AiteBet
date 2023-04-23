import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BetItem from "../BetItem";
import { Container } from "react-bootstrap";

const BetsContainer = () => {
  const bets = [
    { opponent: "Ryan", category: "NBA", amount: "10", status: "open" },
    { opponent: "Tejash", category: "NBA", amount: "10", status: "open" },
    { opponent: "Jonathan", category: "NBA", amount: "10", status: "open" },
  ];
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

      {bets.map((bet) => {
        return (
          <Row className="justify-content-center">
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
