const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Działa!");
});

module.exports = {
  homeRouter,
};
