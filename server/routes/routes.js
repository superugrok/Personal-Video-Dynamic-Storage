module.exports = (app) => {
  const actions = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create item
  router.post("/create", (req, res) => actions.create(req, res));

  // Delete item
  router.post("/delete", (req, res) => actions.delete(req, res));

  // Get all items
  router.post("/selectAll", (req, res) => actions.selectAll(req, res));

  // Edit item
  router.post("/edit", (req, res) => actions.edit(req, res));

  app.use("/", router);
};
