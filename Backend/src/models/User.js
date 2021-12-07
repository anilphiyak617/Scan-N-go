const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//!-------Schema
const userSchema = new mongoose.Schema({
  shopname: {
    type: String,
    //  required: true,
  },
  password: {
    type: String,
    //  required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Not a strong Password");
        return;
      }
    },
  },
  email: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a Email");
        return;
      }
    },
    //  required: true,
  },
  //*#--Array of token objects
  tokens: [
    {
      token: "string",
      // require: true,
    },
  ],
});
//!-------JWT generator
userSchema.method("generateJWTtoken", async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "SECRETMESSAGE");
  this.tokens = this.tokens.concat({ token });
  //* doubt not able tu use push
  await this.save();
  return token;
});

//!---------------CREATING the model
const User = mongoose.model("User", userSchema);
module.exports = User;
