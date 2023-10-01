const express = require("express");

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  res.send("Działa!");
});

module.exports = {
  clientRouter,
};
