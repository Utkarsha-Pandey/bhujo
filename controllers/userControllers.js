const userModels = require("../models/userModels");

const loginController = async (req, res) => {
  try {
    //destructure email and password
    const { email, password } = req.body;
    const user = await userModels.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//register Callback
const registerController = async (req, res) => {
  try {
    const { name, email, password, googleId } = req.body;

    // Check if the user already exists
    const userExists = await userModels.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Prepare the user object, excluding googleId if it's null or undefined
    const userData = {
      name,
      email,
      password,
    };
    if (googleId) {
      userData.googleId = googleId;
    }

    const newUser = new userModels(userData);
    await newUser.save();
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

//Dashboard
const dashboardController = async (req, res) => {
  try {
    //destructure email and password
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//test


//get user controller
const profileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await userModels.findById(userId);
    if (!profile) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//uploader controllers
const uploadProfilePicController = async (req, res) => {
  try {
    const { userId } = req.params;
    const profilePic = req.file.path;
    const updatedUser = await userModels.findByIdAndUpdate(userId, { profilePic }, { new: true });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json(error);
  }
};



module.exports = { loginController, registerController, dashboardController, profileController , uploadProfilePicController};
