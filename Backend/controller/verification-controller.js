const Otp = require("../models/user-verification");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  decodeJwt,
  hasPassword,
  generateRefreshToken,
} = require("../utils/helper");
const User = require("../models/user-auth");

const verifyUser = async (req, res) => {
  try {
    // console.log(req, "header");
    const { otp, email, isLogin, isRegister } = req.body;
    const authorization = req.headers["authorization"];
    const splitToken = authorization.split(" ");
    const token = splitToken[1];
    if (isRegister) {
      if (!otp || !email || !authorization) {
        res.status(400).send({ message: "Required field are missing" });
      } else {
        const myOtp = await Otp.findOne({ email: email });
        console.log(token, "token");
        if ((myOtp.otp = otp)) {
          const data = await verifyToken(token);
          const decode = await decodeJwt(token);
          console.log(data, "data");
          console.log(decode, "decode");
          const hashedPassword = await hasPassword(data.password);
          const userCreated = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: hashedPassword,
            isAdmin: data.isAdmin,
          });
          console.log(userCreated, "created");
          const myRefreshToken = await generateRefreshToken(
            userCreated._id,
            userCreated.email
          );
          res
            .status(200)
            .send({
              message: "user created successfully",
              token: token,
              refreshToken: myRefreshToken,
            });
          // console.log(isPresent, "isPresent");
          // const token = await userCreated.generateToken();
          // console.log(token, "token");
        }
      }
    }else{
      
    }
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { verifyUser };
