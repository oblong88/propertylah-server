const express = require("express");

const PropertyController = require("../controllers/propertyController");

const propertyController = new PropertyController();

const router = express.Router();

router
  .route("/")
  .post(propertyController.createProperty)
  .get(propertyController.getAllProperties);

router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
