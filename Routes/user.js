const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const {
  handleSignupUser,
  handlePostSignupUser,
  handleLoginUser,
  handlePostLoginUser,
  handleLogoutUser,
} = require("../controllers/user.js");

router.get("/signup", wrapAsync(handleSignupUser));

router.post("/signup", wrapAsync(handlePostSignupUser));

router.get("/login", wrapAsync(handleLoginUser));

router.post(
  "/login",
  saveRedirectUrl, //middleware to authenticate login
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(handlePostLoginUser)
);

router.get("/logout", handleLogoutUser);

module.exports = router;
