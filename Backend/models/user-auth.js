const mongoose = require("mongoose");
const hasPassword = require("../utils/helper");
const jwt = require("jsonwebtoken");
const userScema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userScema.pre("save", async function (next) {
//   console.log(this, "this");
//   const user = this;
//   if (!user.isModified("password")) {
//     console.log("here>>>>>>>>>>>>>>");
//     next();
//   } else {
//     try {
//       const hashedPassword = await hasPassword(user.password);
//       console.log(hashedPassword, "scema");
//       user.password = hashedPassword;
//     } catch (error) {
//       next(error, "scema Error");
//     }
//   }
// });

userScema.methods.generateToken = async function () {
  try {
    // console.log(
    //   jwt.sign(
    //     {
    //       userId: this._id.toString(),
    //       email: this.email,
    //       isAdmin: this.isAdmin,
    //     },
    //     process.env.JWT_PRIVATE_KEY
    //   ),
    //   { expiresIn: "1d" },
    //   "this2"
    // );
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log(error);
  }
};

userScema.methods.refreshToken = async function () {
  try {
    // console.log(this, "this");
   return jwt.sign(
      { id: this._id, email: this.email },
      process.env.REFRESH_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error, "error");
  }
};

userScema.methods.verifyToken = async function (){
  console.log(this,"verify")
}

const User = new mongoose.model("User", userScema);

module.exports = User;
