const db = require("../models/poolsModel");

const usersController = {};

usersController.getAllUsers = (req,res,next) => {
  const { id } = req.params; 
  const queryString = `SELECT users.id, users.username, users.account_balance FROM users WHERE users.id <> $1`;
  db.query(queryString, [id]).then(results => {
      console.log(results.rows)
      res.locals.allUsers = results.rows
      return next();
  })
}

// create functionality for user table
usersController.signUp = (req, res, next) => {
    // in req.body we have username and password money is fixed amt
    // desanitize data from req.body
    const { username, password } = req.body;

    // query string with SQL query of creating a new row for users table and returning that value in the promise
    const queryString = `INSERT INTO users (username, password, account_balance) VALUES ($1, $2, $3) RETURNING *`;
    
    // values we are going to insert into database
    const values = [username, password, 1000];

    //sends SQL query and values to be passed into SQL user table
    db.query(queryString, values)
        // promise chaining query -> results are the return value of SQL query string
        .then(results => {
            console.log('Here is the newUser: ', results.rows[0]);
            // saving user to locals.newUser so we can output in user's route
            res.locals.newUser = results.rows[0];
            // return next middleware
            return next();
        })
        // error catching
        .catch((err) => next({
          log: 'Error in signup middleware',
          message: {err},
        }));
};


// read functionality for user table
usersController.login = (req, res, next) => {

  const { username, password } = req.body;
  
  const queryString = `SELECT * FROM users WHERE username = $1`;
    // values we are going to insert into database
  const values = [username];
  
  db.query(queryString, values)
    .then(results => {
      //we check for correct passwords and they will continue
      // results.rows accesses an array of user objects
      // we use 0th index since there is only going to be one unique match
      // this object has properties of id, money, username, password
      if(results.rows[0].password === password){
        res.locals.currUser = results.rows[0];
        return next();
      }
      else{
        // this is the case where username is a match but password is not
        // not a server error but user error so thinking we redirect to same page
        // with an error message 
        // for now we are going to send 406 status code
        res.status(406).json();
      }
    })
    .catch((err) => {
        return next(err)
    });
};

usersController.addFunds = (req, res, next) => {

  

};


module.exports = usersController;
