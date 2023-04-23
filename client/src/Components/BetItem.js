import React from "react";
import Col from "react-bootstrap/Col";

const BetItem = ({ opponent, category, amount, status }) => {
  return (
    <>
      <Col className="col-2">{opponent}</Col>
      <Col className="col-2">NBA</Col>
      <Col className="col-2">$10.00</Col>
      <Col className="col-5">active</Col>
      <Col className="col-1">Odds</Col>
    </>
  );
};

export default BetItem;
