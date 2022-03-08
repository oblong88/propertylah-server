const express = require("express");

const PropertyController = require("../controllers/propertyController");

const propertyController = new PropertyController();

const router = express.Router();

router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);
router
  .route("/")
  .post(propertyController.createProperty)
  .get(propertyController.getAllProperties);


module.exports = router;
