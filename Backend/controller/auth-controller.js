const User = require("../models/user-auth");
const hasPassword = require("../utils/helper");
const {
  generateOtp,
  sendMail,
  sendOtpToNumber,
  generateToken,
  comparePassword,
  generateLoginToken
} = require("../utils/helper");
const bcrypt = require("bcrypt");
const Otp = require("../models/user-verification");
const accountSid = process.env.TWILIOACCOUNTSID;
const authToken = process.env.TWILIOAUTHTOKEN;
const verifySid = process.env.TWILIOVERIFYSID;
const client = require("twilio")(accountSid, authToken);

const home = async (req, res) => {
  try {
    res.status(200).send("controller");
  } catch (err) {
    console.log(err, "error");
  }
};

const userRegister = async (req, res) => {
  try {
    const { email, firstName, lastName, password, phoneNumber, isAdmin } =
      req.body;
    // console.log(req.body, "req.body");

    const isPresent = await User.findOne({ email: email });
    // console.log(isPresent, "isPresent");
    if (isPresent) {
      res.send("user already present");
    } else {
      // const hashedPassword = await hasPassword(password)
      // const userCreated = await User.create({
      //   firstName: firstName,
      //   lastName: lastName,
      //   email: email,
      //   phoneNumber: phoneNumber,
      //   password: password,
      //   isAdmin: isAdmin,
      // });
      // console.log(userCreated, "created");
      // console.log(isPresent, "isPresent");
      const myOtp = await generateOtp();
      const storeOtp = await Otp.findOneAndUpdate(
        { email: email },
        { otp: myOtp },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      const storedOtp = await Otp.create({ email: email, otp: myOtp });
      const token = await generateToken(
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        isAdmin
      );
      // console.log(storeOtp, "storeOtp");
      // const mail = await sendMail(email, myOtp);
      // sendOtpToNumber(myOtp)
      // const msg = await client.verify.v2
      //   .services(verifySid)
      //   .verifications.create({
      //     to: "+917008852343",
      //     channel: "sms",
      //     message: `${myOtp}`,
      //   });
      // const msg = await client.messages.create({
      //   body:`${myOtp}`,
      //   to:process.env.TWILIOTRGETNUMBER,
      //   from:process.env.TWILIOPHONENUMBER
      // })
      // console.log(msg, "msg");
      // console.log(token, "token");

      res.status(201).send({
        message: "otp sent to your email and phone number",
        otp: myOtp,
        token: token,
        // refreshToken: await User.refreshToken(),
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      res.status(400).send({ message: "Invalid credentials" });
    }
    const isPresent = await User.findOne({ email: email });
    // console.log(isPresent,"ispresent")
    if (isPresent) {
      const decryptPassword = await comparePassword(password,isPresent.password);
      if (decryptPassword == true) {
        const myOtp = await generateOtp();
        const storeOtp = await Otp.findOneAndUpdate(
          { email: email },
          { otp: myOtp },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        const resOtp = myOtp
        const mail = await sendMail(email, myOtp);
        const token = await generateLoginToken(email,isPresent._id);
        res
          .status(200)
          .send({ message: "otp send to your email or  phone ", token: token ,otp:resOtp});
        // console.log(passwordmatched, "matched");
      }else{
        res.status(400).send({message:"Invalid email or password"})
      }
    }

    // console.log(storeOtp, "storeOtp");
    // console.log(password, "password");
    // const hashedPassword = await hasPassword(password)
    // console.log(hashedPassword,"hashedPassword")
    // const passwordmatched = await comparePassword(password, userExist.password);
    // if (passwordmatched) {
    //   res.status(200).send({
    //     message: "login successfully",
    //     token: await userExist.generateToken(),
    //     id: userExist._id.toString(),
    //   });
    // }
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { home, userRegister, userLogin };
