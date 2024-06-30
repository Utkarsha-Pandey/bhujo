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
    const newUser = new userModels(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
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



module.exports = { loginController, registerController, dashboardController, profileController};
