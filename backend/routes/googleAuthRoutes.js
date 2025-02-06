const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("google auth callback");
    const token = req.user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
    });

    res.redirect("http://localhost:5173");
  }
);

module.exports = router;
