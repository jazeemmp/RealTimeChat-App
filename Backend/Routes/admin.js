const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {authorizeToken} = require('../Utiils/jwt')

router.post('/login',adminController.postLogin)

// router.use(authorizeToken)
router.get("/all-users", authorizeToken ,adminController.getAllUsers);
router.delete('/delete-user/:id', authorizeToken ,adminController.deleteUser)
router.put('/block-user/:id',authorizeToken, adminController.blockUser)


module.exports = router;
