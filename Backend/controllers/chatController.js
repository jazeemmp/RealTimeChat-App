const ChatModel = require("../Model/chatModel");
const UserDB = require("../Model/userModel");

// @desc create new chat
// @route POST /api/chat/create
// @access Private
const createChat = async (req, res) => {
  try {
    //if the user existing retuning that doc
    const isExisting = await ChatModel.findOne({
      members: { $all: [req.body.senderId, req.body.receverId] },
    });
    if (isExisting) {
      return res.status(200).json(isExisting);
    }
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receverId],
    });
    //saving new chat in db
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// @desc get all chats off specific user
// @route POST /api/chat/
// @access Private
const userChats = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    // Querying the collection to find all chats where the user is a member
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// @desc get one chat of specified users
// @route POST /api/chat/find/:firstId/:secondId
// @access Private
const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
// @desc  get all users for user search
// @route GET /api/chat/get-users
//@access Private
const getUsers = async (req, res) => {
  const userSearchQuery = req.query.query;
  if (!userSearchQuery || userSearchQuery.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }
  try {
    const users = await UserDB.find({
      name: { $regex: userSearchQuery, $options: "i" },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

module.exports = {
  createChat,
  userChats,
  findChat,
  getUsers,
};
