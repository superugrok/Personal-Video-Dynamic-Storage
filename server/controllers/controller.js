const db = require("../models");
const Model = db.library;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const item = new Model();
  const itemData = req.query;
  item.name = itemData.name;
  item.owner = itemData.owner;
  item.url = itemData.url;
  item.type = itemData.type;
  item.save().then(() => res.send("Item created successfully!"));
};

// Delete specified item
exports.delete = (req, res) => {
  const itemId = req.query.id;
  Model.findByIdAndRemove(itemId, () => res.send("Item deleted successfully!"));
};

// Get all items
exports.selectAll = (req, res) => {
  Model.find().then((data) => res.send(data));
};
