const MessageModel = require("../Model/messageModel");

// @desc create a new message
// @route POST /api/message
// @access Private
const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const newMessage = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const data = await newMessage.save();
    console.log(data);
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// @desc get all message by specfic chat
// @route GET /api/message/:chatId
// @access Private
const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({chatId});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:error.message});
  }
};

module.exports = {
  addMessage,
  getMessage,
};
