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
    //console.log(req.body);
    if (!email || !password) {
      res.status(422).json("please fill all fields");
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        const token = await userLogin.generateAuthToken();
        console.log("my generated token is ", token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure: true,
        });
        const result = {
          userLogin,
          token,
        };
        console.log("login successfully");
        return res.status(200).json({ status: 200, result });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } else {
      res
        .status(401)
        .json({ message: "user does not exist : invalid credentials" });
    }
  } catch (error) {
    console.log(error);
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
