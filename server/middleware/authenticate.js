const jwt = require("jsonwebtoken");
//const dotenv = require("dotenv");
const User = require("../model/userSchema");
//dotenv.config({ path: "../config.env" });

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    //console.log(`getting the token from cookies ${token}`);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(`verifying the token from cookies ${verifyToken}`);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      res.status(404).send({ status: 404, message: "User not found" });
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    //console.log("i am trying to authenticate, uff catch block entered");
    res
      .status(401)
      .json({ status: 401, message: "unauthorized token provided" });
    //console.log(error);
  }
};

module.exports = Authenticate;
