import React from "react";
import Col from "react-bootstrap/Col";

const BetItem = ({ opponent, category, amount, team, status, oddsDecimal }) => {
  return (
    <>
      <Col className="col-2">{opponent}</Col>
      <Col className="col-2">{category}</Col>
      <Col className="col-1">{amount}</Col>
      <Col className="col-2">{status ? "active" : "closed/not started"}</Col>
      <Col className="col-2">{team}</Col>
      <Col className="col-3">
        {`${parseFloat((1 / oddsDecimal) * 100).toFixed(2)}% of winning`}
      </Col>
    </>
  );
};

export default BetItem;
