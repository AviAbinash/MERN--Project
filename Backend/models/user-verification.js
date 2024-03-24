const  mongoose = require("mongoose")

const verificationScema  = mongoose.Schema({
email:{
    type:String,
    require : true
},
otp :{
    type:String,
    require:true
}
})

const otp = new mongoose.model("Otp",verificationScema)
module.exports  = otp