const express = require("express");
const router = express.Router();
const {
  createChat,
  userChats,
  findChat,
  getUsers,
} = require("../controllers/chatController");
const { authorizeToken } = require("../Utiils/jwt");

router.use(authorizeToken)
router.get("/", userChats);
router.post("/create", createChat);
router.get("/find/:firstId/:secondId", findChat);
router.get('/get-users',getUsers)

module.exports = router;
