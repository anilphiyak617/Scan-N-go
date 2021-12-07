const express = require("express");
const User = require("../models/User");
const auth = require("../middlewares/authentication");
// const mongoose = require("mongoose");
//!------ROUTES
const router = new express.Router();
//!--------NEW-USER-SIGN-UP
router.post("/signup", async (req, res) => {
  const newUser = User(req.body);
  try {
    await newUser.save();
    const token = await newUser.generateJWTtoken();
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send();
  }
});
//!------LOGIN-USER-PROFILE

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //*---- User credentials verification
    const user = await User.credentialVerifier(email, password);
    const token = await user.generateJWTtoken();
    res.send({ user: user, token: token });
  } catch (e) {
    res.status(401).send();
  }
});
//!------USER-PROFILE
router.get("/myprofile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(404).send();
  }
});
//!------ LOGOUT-USER-PROFILE
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      if (token.token !== req.token) {
        return true;
      }
    });
    await req.user.save();
    res.send("LOGOUT");
  } catch (e) {
    res.status(500).send();
  }
});
//!------LOGOUT from All accounts
//?----------logout from all accounts
router.post("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.send("logged out from all devices");
  } catch (error) {
    res.status(500).send();
  }
});
//!-----------------UPDATING
router.patch("/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  //***Allowed updates checker */
  //
  //
  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//!------------DELETING
router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    console.log("user deleted");
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
