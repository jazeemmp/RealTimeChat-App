const UserDB = require("../Model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utiils/jwt");

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isExisting = await UserDB.findOne({ email: email });
    if (isExisting) {
      res.json({ userExiting: true });
      return;
    } else {
      const HashedPassword = await bcrypt.hash(password, 10);
      const user = new UserDB({
        name: name,
        email: email,
        password: HashedPassword,
        registered: Date.now(),
      });
      await user.save();
      return res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserDB.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked. Please contact the admin." });
    }
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = generateToken(user._id);
    res.status(200).json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const userDetails = await UserDB.findOne({ _id: req.userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ userDetails });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const getEditProfile = async (req, res) => {
  try {
    const userDetails = await UserDB.findOne({ _id: req.userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ userDetails });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const postEditProfile = async (req, res) => {
  const { name, age, job, address, about } = req.body;
  try {
    const user = await UserDB.findById(req.userId);
    const profileUrl = req.file ? req.file.filename : user.profileUrl;
    await UserDB.updateOne(
      { _id: req.userId },
      {
        name: name,
        age: age,
        job: job,
        address: address,
        about: about,
        profileUrl: profileUrl,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
module.exports = {
  postSignup,
  postLogin,
  getProfile,
  getEditProfile,
  postEditProfile,
};
