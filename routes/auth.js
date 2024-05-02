const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", (req, res) => {
  //check to make sure the email provided not register
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({ email: "A user is already registered with us" });
    } else {
      // Otherwise Create a new User
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
      newUser
        .save()
        .then(() => {
          console.log("User saved successfully");
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
      return res.status(200).json({ msg: newUser });
    }
  });
});


// Login route

router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
      const user = await User.findOne({ userName: userName });
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, userName: user.userName },
        process.env.SECRET_KEY
      );
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports = router;