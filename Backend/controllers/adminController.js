const UserDB = require("../Model/userModel");
const AdminDB = require('../Model/adminModel')
const bcrypt = require("bcrypt");
const { generateToken, generateAdminToken } = require("../Utiils/jwt");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserDB.find();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await UserDB.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
const blockUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserDB.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.isBlocked = !user.isBlocked;
      await user.save(); 
      const message = user.isBlocked ? "User has been blocked" : "User has been unblocked";
      res.status(200).json({ message, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred", error });
    }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminDB.findOne({ email: email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(admin._id);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const editUser = async (req, res) => {
  const { name, email, id } = req.body;
  if (!name || !email || !id) {
    return res.status(400).json({ message: "Name, email, and ID are required." });
  }
  try {
    const result = await UserDB.updateOne({ _id: id }, { name, email });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or no changes made." });
    }
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the user." });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  blockUser,
  postLogin,
  editUser
};
