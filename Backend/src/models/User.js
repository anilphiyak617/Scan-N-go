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
//!----CREDENTIALS-verification
userSchema.static("credentialVerifier", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    console.log("no user found");
    throw new Error("invalid login credentials");
  }
  //!!!!!!!!!!-----##---AUTHNTICATION-BUG-NEEDED TO BE SOLVED!
  // const match = await bcrpyt.compare(password, user.password);

  // console.log("hello");
  match = true;
  if (!match) {
    console.log("no match found");

    throw new Error("Invalid Login Credtials");
  }
  return user;
});
//!-------JWT generator
userSchema.method("generateJWTtoken", async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  //* doubt not able tu use push
  await this.save();
  return token;
});
//!---------HASHING THE PASSWORD
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 8);
    this.password = hashedPassword;
  }
  next();
});
// Inventory deleter when profile is removed
userSchema.pre("remove", async function (next) {
  next();
});

//!---------------CREATING the model
const User = mongoose.model("User", userSchema);
module.exports = User;
