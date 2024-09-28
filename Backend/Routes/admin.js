const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const {authorizeToken} = require('../Utiils/jwt')

router.post('/login',adminController.postLogin)

router.use(authorizeToken)
router.get("/all-users",adminController.getAllUsers);
router.delete('/delete-user/:id',adminController.deleteUser)
router.put('/block-user/:id', adminController.blockUser)
router.put('/edit-user',adminController.editUser)
module.exports = router;
