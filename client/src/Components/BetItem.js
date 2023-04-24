import React from "react";
import Col from "react-bootstrap/Col";

const BetItem = ({ opponent, category, amount, team, status }) => {
  return (
    <>
      <Col className="col-2">{opponent}</Col>
      <Col className="col-2">{category}</Col>
      <Col className="col-2">{amount}</Col>
      <Col className="col-2">{team}</Col>
      <Col className="col-3">{status ? 'active' : 'closed'}</Col>
      <Col className="col-1">Odds</Col>
    </>
  );
};

export default BetItem;
