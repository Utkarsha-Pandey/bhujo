const express = require("express");
const {
  loginController,
  registerController,
  dashboardController,
  profileController,
  uploadProfilePicController
} = require("../controllers/userControllers");
const {googleLoginController} = require("../controllers/gControl");
const multer = require("multer");


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
router.get("/profile/:userId", profileController);


//POST || GOOGLE LOGIN
router.post('/google-signin', googleLoginController);


//uploader route
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

const upload = multer({ storage: storage });

router.post("/profile/upload/:userId", upload.single('profilePic'), uploadProfilePicController);


module.exports = router;
