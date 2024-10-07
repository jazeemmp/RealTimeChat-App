const express = require("express");
const router = express.Router();
const {
  postSignup,
  postLogin,
  getProfile,
  getDetails,
  getEditProfile,
  postEditProfile,
} = require("../controllers/userController.js");
const upload = require("../Config/multer");
const { authorizeToken } = require("../Utiils/jwt");

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.get("/my-profile", authorizeToken, getProfile);
router.get("/get-user/:userId", getDetails);
router
  .route("/edit-profile")
  .get(authorizeToken, getEditProfile)
  .post(authorizeToken, upload.single("profile"), postEditProfile);

module.exports = router;
