const jwt = require("jsonwebtoken");
const User = require("../models/User");
//!----TOKEN Authenticator
const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").slice(7);

    const verified = jwt.verify(token, "SECRETMESSAGE");
    const user = await User.findOne({
      _id: verified._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send();
  }
};

module.exports = auth;
