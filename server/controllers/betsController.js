const db = require("../models/poolsModel");

const betsController = {};

// middleware to display all bets that this user is a part of
// user id is coming in from front end
betsController.getAllUserBets = (req, res, next) => {
  // destructure id from req body
  const { id } = req.params;
  console.log(id);
  queryString = `SELECT bd.*
                   FROM public.bets_detail bd
                   JOIN public.bets b ON bd.bets_id = b.id
                   WHERE bd.user_id = $1
                   AND b.status = true`;
  // currently our queryString finds all betDetail instances where the user_id = req.params.id
  // we want it to do a subQuery that takes this bet_id from betDetail and displays bet
  // Grab all bets from bets table where bet_details.bet_id = bets.bet_id

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

module.exports = betsController;
