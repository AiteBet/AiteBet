const db = require("../models/poolsModel");

const betsController = {};

// middleware to display all bets that this user is a part of
// user id is coming in from front end
betsController.getAllUserBets = (req, res, next) => {
  // destructure id from req body
  const { id } = req.params;
  console.log(id);

  // joining all 3 of our db tables specifying the user from our req.params
  // displays all results from the first line of the query
  //this should display: Opponent username[users], category(NBA)[bets], wager_amount[bets_detail], finsihed status(boolean)[bets], odds for this game (from API)
  queryString = `SELECT 
                u.id as opponent_id, 
                u.username as opponent, 
                bd.user_wager, 
                b.id as bet_id, 
                b.game_id,
                b.category,
                b.status,
                b.total_pot,
                b.created_at,
                bd_selected.team as team
                FROM public.users u
                INNER JOIN public.bets_detail bd ON u.id = bd.user_id
                JOIN bets b ON bd.bets_id = b.id
                JOIN public.bets_detail bd_selected ON bd.bets_id = bd_selected.bets_id AND bd_selected.user_id = $1
                WHERE bd.user_id != $1;`;

                    

  const value = [id];

  db.query(queryString, value)
    .then((ArrOfUserBets) => {
      console.log(ArrOfUserBets.rows);
      res.locals.ArrOfUserBets = ArrOfUserBets.rows;
      return next();
    })
    .catch((err) => {
      return next({
        err: "Error is in middleware betsController.getAllUserBets",
      });
    });
};


betsController.createBet = (req,res,next) => {
  //should expect userID, opponentID, wager_amount, game_id, selected_team, opponent_team
  // create bet with  id ,game_id, category (always 'NBA'), status (true), totalPot (wager_amt*2), created at (default)
  // create bets_detail with user_id, bets_id
  const {id, opponentId, wagerAmount, gameId, selectedTeam, completed, opponentTeam} = req.body;
  console.log(id, opponentId, wagerAmount, gameId, selectedTeam, completed, opponentTeam)


  //QUERY SRTING TO INSERT INTO BETS TABLE
  const queryString = ` 
        INSERT INTO bets(game_id, category, status, total_pot)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `;

  // VALUES TO INSERT
  const bets_values = [gameId, 'NBA', completed, wagerAmount*2]

  // INSERT INTO BET TABLE DB ASYNC
  db.query(queryString, bets_values).then(results => {
    // GRAB ID OF BET JUST INSERTED
    const returnedID = results.rows[0].id;
    console.log('returned id',returnedID);
    

    const bd_values = [
      [id, returnedID, selectedTeam, wagerAmount],
      [opponentId, returnedID, opponentTeam, wagerAmount]
    ];
    // VALUES TO BE INSERTED

    // QUERY STRING TO INSERT INTO BETS_DETAILS 2 ROWS
    const bd_queryString = `
    INSERT INTO public.bets_detail(user_id, bets_id, team, user_wager) 
    VALUES ($1,$2,$3,$4);`;

    bd_values.forEach(async (row) => {
      const result = await db.query(bd_queryString, row);
      console.log(result)
    })

   // INSERT INTO BET DETAIL TABLE DB 2 ROWS ASYNC
  //  db.query(bd_queryString, bd_values).then(bd_results => {
  //   console.log(bd_results.rows)
  //  })
  })
}

module.exports = betsController;
