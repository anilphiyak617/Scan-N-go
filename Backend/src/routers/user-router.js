const express = require("express");
const User = require("../models/User");
const auth = require("../middlewares/authentication");
// const mongoose = require("mongoose");
//!------ROUTER
const router = new express.Router();
//!--------NEW-USER-SIGN-UP
router.post("/signup", async (req, res) => {
  const newUser = User(req.body);
  try {
    await newUser.save();
    const token = await newUser.generateJWTtoken();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send();
  }
});
//!------USER-PROFILE
router.get("/users/me", async (req, res) => {
  try {
    res.send("MY profile");
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
