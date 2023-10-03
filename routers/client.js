const express = require("express");
const { db } = require("../utils/db");
const { NotFoundError } = require("../utils/errors");

const clientRouter = express.Router();

clientRouter
  .get("/", (req, res) => {
    res.render("client/list-all", {
      clients: db.getAll(),
    });
  })

  .get("/:id", (req, res) => {
    const client = db.getOne(req.params.id);

    if (!client) {
      throw new NotFoundError();
    }

    res.render("client/one", {
      clients: db.getOne(req.params.id),
    });
  })

  .post("/", (req, res) => {
    const id = db.create(req.body);

    res.status(201).render("client/added", {
      name: req.body.name,
      id,
    });
  })

  .put("/:id", (req, res) => {
    const client = db.getOne(req.params.id);

    if (!client) {
      throw new NotFoundError();
    }

    db.update(req.params.id, req.body);
    res.render("client/modified", {
      name: req.body.name,
      id: req.body.id,
    });
  })

  .delete("/:id", (req, res) => {
    const client = db.getOne(req.params.id);

    if (!client) {
      throw new NotFoundError();
    }

    db.delete(req.params.id);
    res.render("client/deleted");
  })

  .get("/form/add", (req, res) => {
    res.render("client/forms/add");
  })

  .get("/form/edit/:id", (req, res) => {
    const client = db.getOne(req.params.id);

    if (!client) {
      throw new NotFoundError();
    }

    res.render("client/forms/add", {
      client: db.getOne(req.params.id),
    });
  });

module.exports = {
  clientRouter,
};
