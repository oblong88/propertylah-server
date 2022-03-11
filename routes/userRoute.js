const express = require("express");

const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");

const userController = new UserController();
const authController = new AuthController();

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router
  .route("/")
  .post(userController.createUser)
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

// Get all admin route - PROTECT for demo
// .get(authController.protect, userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
