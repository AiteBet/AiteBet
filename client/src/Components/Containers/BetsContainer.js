import React, { useContext, useEffect } from "react";
import axios from "axios";
import { StateContext } from "../../context/StateContext";
import { Container, Row, Col } from "react-bootstrap";
import BetItem from "../BetItem";

const BetsContainer = () => {
  const { usersBets, setUsersBets, user } = useContext(StateContext);
  console.log(usersBets);

  //gameid : a3f1b181c86371af3213af6fe1da023b
  useEffect(() => {
    try {
      const fetchUserBets = () => {
        axios.get(`http://localhost:8080/bets/${user.id}`).then((result) => {
          console.log("should see all usersBets", usersBets);
          const returnedUsersBets = result.data;
          axios
            .get(
              `https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us`
            )
            .then((results) => {
              const newUsersBets = [...returnedUsersBets];
              returnedUsersBets.forEach((obj1, index) => {
                const obj2 = results.data.find(
                  (obj) => obj.id === obj1.game_id
                );
                if (obj2) {
                  console.log(obj2);
                  console.log("obj1", obj1);
                  const team = obj2.bookmakers[1].markets[0].outcomes.filter(
                    (team) => team.name === obj1.team
                  );
                  console.log(team);
                  const updatedUserBet = {
                    ...obj1,
                    price: team[0].price,
                  };

                  newUsersBets[index] = updatedUserBet;
                }
              });

              setUsersBets(newUsersBets);
            });
        });
      };
      fetchUserBets();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Container>
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
        <Col className="col-1">
          <strong>Bet Status</strong>
        </Col>
        <Col className="col-3">
          <strong>Odds</strong>
        </Col>
      </Row>

      {usersBets.length > 0 &&
        usersBets.map((bet, index) => {
          return (
            <Row key={index} className="justify-content-center">
              <BetItem
                opponent={bet.opponent}
                category={bet.category}
                team={bet.team}
                amount={bet.user_wager}
                status={bet.status}
                oddsDecimal={bet.price}
              />
            </Row>
          );
        })}
    </Container>
  );
};

export default BetsContainer;
