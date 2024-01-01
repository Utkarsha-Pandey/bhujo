const express = require("express");
const {
  loginController,
  registerController,
  dashboardController,
  testController,
} = require("../controllers/userControllers");


//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/signin", loginController);

//POST || REGISTER USER
router.post("/signup", registerController);

//POST || REGISTER USER
router.post("/dashboard", dashboardController);

//POST || Test page
router.post("/test", testController);

module.exports = router;
