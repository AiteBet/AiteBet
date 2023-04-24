import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { StateContext } from "../../context/StateContext";
import { Container, Row, Col } from "react-bootstrap";
import BetItem from "../BetItem";

const BetsContainer = () => {
  const {usersBets, setUsersBets, user} = useContext(StateContext) 


  useEffect(() => {
    try {
      const fetchUserBets = async () => {
        const result = await axios.get(`http://localhost:8080/bets/${user.id}`)
        console.log(setUsersBets(result.data));
      }
      fetchUserBets();
    } catch(err) {
      console.log(err)
    }
  },[])
  return (
    <Container fluid>
      <Row>
        <Col className="col-2">
          <strong>Opponent</strong>
        </Col>
        <Col className="col-2">
          <strong>Category</strong>
        </Col>
        <Col className="col-2">
          <strong>Amount</strong>
        </Col>
        <Col className="col-2">
          <strong>Your Team</strong>
        </Col>
        <Col className="col-3">
          <strong>Bet Status</strong>
        </Col>
        <Col className="col-1">
          <strong>Odds</strong>
        </Col>
      </Row>

      {usersBets.length > 0 && usersBets.map((bet, index) => {
        return (
          <Row key={index} className="justify-content-center">
            <BetItem
              opponent={bet.opponent}
              category={bet.category}
              team ={bet.team}
              amount={bet.user_wager}
              status={bet.status}
            />
          </Row>
        );
      })}
    </Container>
  );
};

export default BetsContainer;
