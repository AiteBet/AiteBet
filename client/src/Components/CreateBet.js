import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../context/StateContext";
import { Container, Row, Form, Col, Button, Dropdown } from "react-bootstrap";
import AutoComplete from "./AutoComplete";

const CreateBet = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [wagerAmount, setWagerAmount] = useState(null);
  const { games, setGames, user } = useContext(StateContext);
  const [createdBet, setCreatedBet] = useState(false);
  const sport = "basketball_nba";
  console.log("wagerAmount:", wagerAmount);
  console.log("process env api key", process.env.ODDS_API_KEY);
  console.log("selected a user", selectedUser);
  console.log("all users", allUsers);
  console.log("all games", games);
  console.log("selected game", selectedGame);
  console.log("selected team", selectedTeam);
  useEffect(() => {
    try {
      const getAllUsers = async () => {
        const users = await axios.get(`http://localhost:8080/user/${user.id}`);
        setAllUsers(users.data);
      };
      getAllUsers();
      const fetchGames = async () => {
        // result is going to have a key of data that has the information we are interested in
        // it is an array of game objects
        // we want to have a drop down menu that will have n options depending on size of array
        // we want to retrieve
        // away team key; home_team key; commence_time key;
        const result = await axios.get(
          `https://api.the-odds-api.com/v4/sports/basketball_nba/scores/?&apiKey=${process.env.ODDS_API_KEY}`
        );
        setGames(result.data);
      };
      // example of what is fetched from axios.get
      //   {
      //     "id": "0b3130f7cc981cc4b1711993884a3a0c",
      //     "sport_key": "basketball_nba",
      //     "sport_title": "NBA",
      //     "commence_time": "2023-04-23T19:45:55Z",
      //     "completed": false,
      //     "home_team": "Golden State Warriors",
      //     "away_team": "Sacramento Kings",
      //     "scores": [
      //         {
      //             "name": "Golden State Warriors",
      //             "score": "110"
      //         },
      //         {
      //             "name": "Sacramento Kings",
      //             "score": "107"
      //         }
      //     ],
      //     "last_update": "2023-04-23T21:51:22Z"
      // },
      // {
      //     "id": "9697320281cf5ee5feea95264a80201f",
      //     "sport_key": "basketball_nba",
      //     "sport_title": "NBA",
      //     "commence_time": "2023-04-23T23:00:00Z",
      //     "completed": false,
      //     "home_team": "Atlanta Hawks",
      //     "away_team": "Boston Celtics",
      //     "scores": null,
      //     "last_update": "2023-04-23T17:16:34Z"
      // },
      // {
      //     "id": "5d84689c18f6922fbf08f0a1cc69de50",
      //     "sport_key": "basketball_nba",
      //     "sport_title": "NBA",
      //     "commence_time": "2023-04-24T01:30:00Z",
      //     "completed": false,
      //     "home_team": "Minnesota Timberwolves",
      //     "away_team": "Denver Nuggets",
      //     "scores": null,
      //     "last_update": "2023-04-23T17:16:34Z"
      // },

      //UNCOMMENT THIS TO TO GET CURRENT AND UPCOMING GAMES
      fetchGames();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HEREEEEEE");
    // we are getting id from user.id (stateContext)
    // we are getting opponentId from selectedUser.id (local state)
    // we are getting wagerAmount from (local state)
    // we are getting gameId from selectedGame.id (local state)
    // we are getting selectedTeam from selectedTeam (local state)

    // we do logic checking keys (home_team && away_team) of selectedGame compare to selectedTeam; the one that is not a match is opponentTeam
    let opponentTeam = "";
    const teamArr = [selectedGame.home_team, selectedGame.away_team];
    if (selectedTeam === teamArr[0]) {
      opponentTeam = teamArr[1];
    } else {
      opponentTeam = teamArr[0];
    }
    //const {id, opponentId, wagerAmount, gameId, selectedTeam, completed, opponentTeam} = req.body;
    // axios post request
    const dataObj = {
      id: user.id,
      opponentId: selectedUser.id,
      wagerAmount: wagerAmount,
      gameId: selectedGame.id,
      selectedTeam: selectedTeam,
      completed: selectedGame.completed,
      opponentTeam: opponentTeam,
    };
    axios
      .post("http://localhost:8080/bets/create_bet", dataObj)
      .then((response) => {
        if (response) {
          setCreatedBet(true);

          setTimeout(() => {
            setCreatedBet(false);
            navigate("/home");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="my-5">
            <h1 className="text-center">Create New Bet</h1>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <AutoComplete
              options={allUsers}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
            <Form.Group controlId="formBasicEmail">
              {/* // here we probably want as inputs user_wager and opponent/s */}
              {/* // eventually this form should account for negative wagers */}
              <Form.Label>Amount to wager:</Form.Label>
              <Form.Control
                type="number"
                placeholder="$100"
                required
                value={wagerAmount}
                onChange={(e) => {
                  setWagerAmount(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ongoing and Upcoming Games</Form.Label>
              {/* // drop down menu that will display all the live/upcoming games */}
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {selectedGame === null
                    ? "Select a Game"
                    : `${selectedGame.away_team} @ ${selectedGame.home_team}`}
                </Dropdown.Toggle>
                {/* // current displaying all games but not saving
                // thinking about creating local state that we can assign to the
                // game that the user chooses
                // on submit button, we send that specific game to backend */}
                <Dropdown.Menu>
                  {games.length > 0 &&
                    games.map((game, index) => {
                      const date = new Date(game.commence_time);
                      const dateStr = `${
                        date.getMonth() + 1
                      }/${date.getDate()}/${date.getFullYear()}`;
                      return (
                        <Dropdown.Item
                          eventKey={game.id}
                          onClick={() => setSelectedGame(game)}
                        >
                          {`${game.away_team} @ ${game.home_team} - ${dateStr}`}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {selectedGame && (
              <Form.Group>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {selectedTeam === null ? "Select a Team" : selectedTeam}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey={selectedGame.home_team}
                      onClick={() => setSelectedTeam(selectedGame.home_team)}
                    >
                      {selectedGame.home_team}
                    </Dropdown.Item>

                    <Dropdown.Item
                      eventKey={selectedGame.away_team}
                      onClick={() => setSelectedTeam(selectedGame.away_team)}
                    >
                      {selectedGame.away_team}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="mr-2">
              Create Bet
            </Button>
          </Form>
          {createdBet && <h4>Successfully created bet!</h4>}
        </Col>
      </Row>

    </Container>
  );
};

export default CreateBet;
