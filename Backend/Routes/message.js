const express = require("express");
const { addMessage, getMessage } = require("../Controllers/messageController");
const router = express.Router();

router.post("/", addMessage);
router.get("/:chatId", getMessage);

module.exports = router;
