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



const addFriendController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req.body;

    // Find the target user and the current user
    const user = await userModels.findById(userId);
    const currentUser = await userModels.findById(currentUserId);

    if (!user || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if a friend request has already been sent
    if (user.friendRequests.includes(currentUserId)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add the current user ID to the friend requests array of the target user
    user.friendRequests.push(currentUserId);
    await user.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const checkFriendRequestsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModels.findById(userId).populate('friendRequests', 'name email profilePic');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ friendRequests: user.friendRequests });
  } catch (error) {
    console.error('Error checking friend requests:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const acceptFriendRequestController = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await userModels.findById(userId);
    const friend = await userModels.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ error: "Friend request not found" });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    user.friends.push(friendId);
    await user.save();

    friend.friends.push(userId);
    await friend.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllFriendsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModels.findById(userId).populate('friends', 'name email profilePic');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { 
  loginController, 
  registerController, 
  dashboardController, 
  profileController, 
  uploadProfilePicController, 
  addFriendController,
  checkFriendRequestsController,
  acceptFriendRequestController,
  getAllFriendsController,
};
