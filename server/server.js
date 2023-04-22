const path = require("path");
// const cookieParser = require("cookie-parser")
const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const userRouter = require('./routes/user')
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

//all incoming routes will be sent to the userRoute for CRUD handling
app.use('/user', userRouter);

//local error handler
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: err.message },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("ERROR: ", errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;