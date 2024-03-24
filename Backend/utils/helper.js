const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const User = require("../models/user-auth");
const otp = require("otp-generator");
const nodemailer = require("nodemailer");
const { jwtDecode } = require("jwt-decode");
// const twilio = require("twilio")
const hasPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log
  return hashedPassword;
};

const comparePassword = async (password,hash) => {
 const result = await  bcrypt.compare(password,hash )
 console.log(result,"password")
  return result;
};
const generateOtp = async () => {
  const otps = await otp.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otps, "otp");
  return otps;
};

const sendMail = async (requestMail, mailOtp) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    servive: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.NODEMAILERUSER,
      pass: process.env.USERPASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Abinash Tripathy" <abinash@1998>', // sender address
    to: `${requestMail}`, // list of receivers
    subject: "otp", // Subject line
    text: "this is an otp mail", // plain text body
    html: `<b>otp is ${mailOtp}  </b>`, // html body
  });
};

const sendOtpToNumber = async (otp) => {
  console.log(otp, "send");
  const accountSid = process.env.TWILIOACCOUNTSID;
  const authToken = process.env.TWILIOAUTHTOKEN;
  const verifySid = process.env.TWILIOVERIFYSID;
  const client = require("twilio")(accountSid, authToken);
  // client.verify.v2
  //   .services(verifySid)
  //   .verifications.create({ to: "+917008852343", channel: "sms" })
  //   .then((verification) => console.log(verification.status))
  //   .then(() => {
  //     const readline = require("readline").createInterface({
  //       input: process.stdin,
  //       output: process.stdout,
  //     });
  //     readline.question("Please enter the OTP:", (otp) => {
  //       client.verify.v2
  //         .services(verifySid)
  //         .verificationChecks.create({ to: "+917008852343", code: otp })
  //         .then((verification_check) => console.log(verification_check.status))
  //         .then(() => readline.close());
  //     });
  //   });
  // let messageOption = {
  //   body: 'You have an appointment with Owl, Inc. on Friday, November 3 at 4:00 PM. Reply C to confirm.',
  //   messagingServiceSid: verifySid,
  //   to: '+ 91 9538263753'
  // }
  client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: "+917008852343",
      channel: "sms",
      message: `${otp}`,
    })
    .then((verification) => console.log(verification.status));
};

const generateToken = async (
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  isAdmin
) => {
  return await  jwt.sign(
    {
      email: email,
      password: password,
      isAdmin: isAdmin,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken =  ()=>{
  try {
    // console.log(this, "this");
   return jwt.sign(
      { id: this._id, email: this.email },
      process.env.REFRESH_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error, "generateRefreshToken");
  }
}

const verifyToken = async (token) => {
  try {
    console.log(token,"token")
    const decrypt = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decrypt;
    // jwt.verify(token,process.env.JWT_PRIVATE_KEY , function(err, decoded) {
    //   console.log(decoded,"decoded") // bar
    // });
  } catch (error) {
    console.log(error);
  }
};
const decodeJwt = async (token) => {
  const decode = await jwtDecode(token);
  return decode;
};
// const refreshToken = async ()
module.exports = {
  hasPassword,
  comparePassword,
  generateOtp,
  sendMail,
  sendOtpToNumber,
  generateToken,
  verifyToken,
  decodeJwt,
  generateRefreshToken
};
