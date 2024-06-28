const express = require("express");
const {
  loginController,
  registerController,
  dashboardController,
  testController,
  dashboardController,
  testController,
} = require("../controllers/userControllers");
const {googleLoginController} = require("../controllers/gControl");



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


//POST || GOOGLE LOGIN
router.post('/google-signin', googleLoginController);


module.exports = router;
