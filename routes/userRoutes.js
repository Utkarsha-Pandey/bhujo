const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userControllers");


//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/signin", loginController);

//POST || REGISTER USER
router.post("/signup", registerController);

module.exports = router;
