const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  //console.log(req.body);
  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(422).json({ message: "Please fill all input fields" });
  }
  if (password != cpassword) {
    res.status(422).json({ message: "password do not match" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    //console.log(userExist);
    if (userExist) {
      res.status(422).json({ message: "User already registered" });
      return;
    }
    const user = new User({ name, email, phone, work, password, cpassword });
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ userRegister });
      return;
    } else {
      res.status(422).json({ message: "failed to register" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Please fill all fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await userLogin.generateAuthToken();
    console.log("Generated token:", token);

    // Set the secure flag for the cookie in production over HTTPS
    if (process.env.NODE_ENV === "production" && req.secure) {
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), // Expiration date
        httpOnly: true,
        secure: true, // Set to true in production over HTTPS
        sameSite: "None", // Required for cross-site cookies
      });
    } else {
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), // Expiration date
        httpOnly: true,
      });
    }

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", authenticate, (req, res) => {
  res.status(200).json(req.rootUser);
});
router.get("/contactdata", authenticate, (req, res) => {
  res.status(200).json(req.rootUser);
});
router.get("/home", authenticate, (req, res) => {
  res.status(200).json(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    //console.log(req.body);
    if (!name || !email || !phone || !message) {
      res.status(400).json({ message: "Please write message" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(200).json({ status: 200, message: "message sent" });
    }
  } catch (error) {
    res.status(400).json("unable to pocess");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json({ status: "200", message: "logout successfully" });
});

router.get("/getData", async (req, res) => {
  //const { id } = req.params;
  try {
    const data = await User.find();
    res.status(200).json({ status: 200, data });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/getData/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.find({ _id: id });
    res.status(200).json({ status: 200, data });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
