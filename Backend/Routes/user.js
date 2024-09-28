const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const upload = require('../Config/multer')
const { authorizeToken } = require("../Utiils/jwt");

router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);
router.get("/my-profile", authorizeToken, userController.getProfile);
router
  .route("/edit-profile")
  .get(authorizeToken, userController.getEditProfile)
  .post(authorizeToken, upload.single('profile'), userController.postEditProfile);

module.exports = router;
