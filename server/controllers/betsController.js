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
  queryString = `SELECT u.id, b.category, bd.team, bd.user_wager, b.status
                  FROM public.bets_detail bd
                  JOIN public.users u ON u.id = bd.user_id
                  JOIN public.bets b ON b.id = bd.bets_id
                  WHERE u.id = $1
                  AND b.status = TRUE;`;

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
