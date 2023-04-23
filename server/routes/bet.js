const express = require("express");

const betsController = require("../controllers/betsController");

const router = express.Router();

router.get("/:id", betsController.getAllUserBets, (req, res) => {
  return res.status(200).json(res.locals.ArrOfUserBets);
});

module.exports = router;
